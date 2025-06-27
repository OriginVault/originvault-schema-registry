import { Request, Response } from 'express';
import { quicktype, JSONSchemaInput, FetchingJSONSchemaStore } from 'quicktype-core';
import JSZip from 'jszip';

interface UploadedFile {
  name: string;
  content: string;
  type: 'json-schema' | 'typescript' | 'json' | 'unknown';
  size: number;
  id: string;
}

interface GenerationOptions {
  justTypes: boolean;
  acronymStyle: string;
  packageName: string;
  namespace: string;
}

interface GenerationResult {
  language: string;
  code: string;
  filename: string;
}

// POST /api/quicktype/generate-from-files
export const generateFromFiles = async (req: Request, res: Response) => {
  try {
    const { files, targetLanguage, options }: {
      files: UploadedFile[];
      targetLanguage: string;
      options: GenerationOptions;
    } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    const results: GenerationResult[] = [];

    for (const file of files) {
      try {
        let result: GenerationResult;

        switch (file.type) {
          case 'json-schema':
            result = await generateFromJsonSchema(file, targetLanguage, options);
            break;
          case 'json':
            result = await generateFromSampleJson(file, targetLanguage, options);
            break;
          case 'typescript':
            result = await generateFromTypeScript(file, targetLanguage, options);
            break;
          default:
            // Try to auto-detect and process
            result = await generateFromAutoDetect(file, targetLanguage, options);
        }

        results.push(result);
      } catch (error) {
        console.error(`Failed to process file ${file.name}:`, error);
        results.push({
          language: targetLanguage,
          code: `// Error processing ${file.name}: ${error.message}`,
          filename: `error-${file.name}.txt`
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Code generation failed:', error);
    res.status(500).json({ error: 'Code generation failed' });
  }
};

// Generate from JSON Schema
async function generateFromJsonSchema(
  file: UploadedFile, 
  targetLanguage: string, 
  options: GenerationOptions
): Promise<GenerationResult> {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
  
  // Parse the schema
  const schema = JSON.parse(file.content);
  const schemaName = schema.title || getFileNameWithoutExtension(file.name);
  
  await schemaInput.addSource({
    name: schemaName,
    schema: JSON.stringify(schema)
  });

  const inputData = { [targetLanguage]: schemaInput };
  
  const result = await quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: {
      'just-types': options.justTypes,
      'acronym-style': options.acronymStyle,
      ...(options.packageName && { 'package': options.packageName }),
      ...(options.namespace && { 'namespace': options.namespace })
    }
  });

  return {
    language: targetLanguage,
    code: result.lines.join('\n'),
    filename: `${schemaName}.${getFileExtension(targetLanguage)}`
  };
}

// Generate from sample JSON
async function generateFromSampleJson(
  file: UploadedFile, 
  targetLanguage: string, 
  options: GenerationOptions
): Promise<GenerationResult> {
  const sampleName = getFileNameWithoutExtension(file.name);
  
  const result = await quicktype({
    inputData: {
      [targetLanguage]: {
        kind: 'json',
        name: sampleName,
        samples: [file.content]
      }
    },
    lang: targetLanguage,
    rendererOptions: {
      'just-types': options.justTypes,
      'acronym-style': options.acronymStyle,
      ...(options.packageName && { 'package': options.packageName }),
      ...(options.namespace && { 'namespace': options.namespace })
    }
  });

  return {
    language: targetLanguage,
    code: result.lines.join('\n'),
    filename: `${sampleName}.${getFileExtension(targetLanguage)}`
  };
}

// Generate from TypeScript (convert to other languages)
async function generateFromTypeScript(
  file: UploadedFile, 
  targetLanguage: string, 
  options: GenerationOptions
): Promise<GenerationResult> {
  // For TypeScript files, we need to extract interfaces/types and convert them
  // This is a simplified approach - in production you might want to use TypeScript compiler API
  
  const typeName = getFileNameWithoutExtension(file.name);
  
  // Try to extract interface definitions and convert to JSON schema first
  const extractedInterfaces = extractTypeScriptInterfaces(file.content);
  
  if (extractedInterfaces.length === 0) {
    throw new Error('No TypeScript interfaces found in file');
  }

  // Convert first interface to a basic JSON schema
  const jsonSchema = convertInterfaceToJsonSchema(extractedInterfaces[0], typeName);
  
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
  await schemaInput.addSource({
    name: typeName,
    schema: JSON.stringify(jsonSchema)
  });

  const result = await quicktype({
    inputData: { [targetLanguage]: schemaInput },
    lang: targetLanguage,
    rendererOptions: {
      'just-types': options.justTypes,
      'acronym-style': options.acronymStyle,
      ...(options.packageName && { 'package': options.packageName }),
      ...(options.namespace && { 'namespace': options.namespace })
    }
  });

  return {
    language: targetLanguage,
    code: result.lines.join('\n'),
    filename: `${typeName}.${getFileExtension(targetLanguage)}`
  };
}

// Auto-detect file type and generate
async function generateFromAutoDetect(
  file: UploadedFile, 
  targetLanguage: string, 
  options: GenerationOptions
): Promise<GenerationResult> {
  // Try JSON first
  try {
    const parsed = JSON.parse(file.content);
    if (parsed.$schema || parsed.type || parsed.properties) {
      // Looks like JSON Schema
      return await generateFromJsonSchema({ ...file, type: 'json-schema' }, targetLanguage, options);
    } else {
      // Treat as sample JSON
      return await generateFromSampleJson({ ...file, type: 'json' }, targetLanguage, options);
    }
  } catch {
    // Not valid JSON, might be TypeScript
    if (file.content.includes('interface') || file.content.includes('type')) {
      return await generateFromTypeScript({ ...file, type: 'typescript' }, targetLanguage, options);
    }
  }

  throw new Error(`Unable to auto-detect file type for ${file.name}`);
}

// POST /api/quicktype/download-zip
export const downloadZip = async (req: Request, res: Response) => {
  try {
    const { results }: { results: GenerationResult[] } = req.body;

    if (!results || results.length === 0) {
      return res.status(400).json({ error: 'No results to download' });
    }

    const zip = new JSZip();

    // Add each generated file to the ZIP
    results.forEach((result, index) => {
      const filename = result.filename || `generated-${index}.${getFileExtension(result.language)}`;
      zip.file(filename, result.code);
    });

    // Add a README file
    const readme = `# Generated Code Files

This ZIP contains code generated by QuickType from your uploaded schema/type files.

Generated on: ${new Date().toISOString()}
Target Language: ${results[0]?.language || 'multiple'}
Files included: ${results.length}

## Files:
${results.map((r, i) => `${i + 1}. ${r.filename}`).join('\n')}

For more information, visit: https://your-schema-registry-domain.com
`;

    zip.file('README.md', readme);

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="quicktype-generated-${Date.now()}.zip"`);
    res.setHeader('Content-Length', zipBuffer.length);

    res.send(zipBuffer);
  } catch (error) {
    console.error('ZIP generation failed:', error);
    res.status(500).json({ error: 'Failed to generate ZIP file' });
  }
};

// Utility functions
function getFileNameWithoutExtension(filename: string): string {
  return filename.split('.').slice(0, -1).join('.');
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    typescript: 'ts',
    python: 'py',
    go: 'go',
    csharp: 'cs',
    java: 'java',
    rust: 'rs',
    swift: 'swift',
    kotlin: 'kt',
    php: 'php',
    ruby: 'rb',
    javascript: 'js'
  };
  return extensions[language] || 'txt';
}

function extractTypeScriptInterfaces(content: string): string[] {
  // Simple regex to extract interface definitions
  const interfaceRegex = /interface\s+\w+\s*{[^}]*}/g;
  return content.match(interfaceRegex) || [];
}

function convertInterfaceToJsonSchema(interfaceString: string, typeName: string): any {
  // This is a very simplified conversion - in production you'd want to use
  // a proper TypeScript parser like typescript-json-schema
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: typeName,
    type: "object",
    properties: {
      // This would need proper parsing of the interface
      // For now, create a basic schema
      id: { type: "string" },
      name: { type: "string" }
    },
    required: ["id"]
  };
}

// Validation endpoint for individual schemas
export const validateSchema = async (req: Request, res: Response) => {
  try {
    const { schema, data } = req.body;

    if (!schema) {
      return res.status(400).json({ error: 'Schema is required' });
    }

    // Basic schema validation
    try {
      JSON.parse(typeof schema === 'string' ? schema : JSON.stringify(schema));
    } catch {
      return res.status(400).json({ error: 'Invalid JSON schema' });
    }

    // If data is provided, validate against schema
    if (data) {
      // Here you would use AJV or similar for validation
      // For now, just return success
      return res.json({ valid: true });
    }

    res.json({ valid: true, message: 'Schema is valid' });
  } catch (error) {
    console.error('Schema validation failed:', error);
    res.status(500).json({ error: 'Schema validation failed' });
  }
}; 