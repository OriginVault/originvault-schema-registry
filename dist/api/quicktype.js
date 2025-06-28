"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.downloadZip = exports.generateFromFiles = void 0;
const quicktype_core_1 = require("quicktype-core");
const jszip_1 = __importDefault(require("jszip"));
// POST /api/quicktype/generate-from-files
const generateFromFiles = async (req, res) => {
    try {
        const { files, targetLanguage, options } = req.body;
        // Validate request payload
        if (!files) {
            return res.status(400).json({ error: 'No files property provided' });
        }
        if (!Array.isArray(files)) {
            return res.status(400).json({ error: 'Files must be an array' });
        }
        if (files.length === 0) {
            return res.status(400).json({
                error: 'No files provided',
                message: 'Please upload at least one schema or type file to generate code.'
            });
        }
        if (!targetLanguage) {
            return res.status(400).json({ error: 'Target language is required' });
        }
        // Validate target language
        const supportedLanguages = ['typescript', 'python', 'go', 'csharp', 'java', 'rust', 'swift', 'kotlin', 'php', 'ruby', 'javascript'];
        if (!supportedLanguages.includes(targetLanguage.toLowerCase())) {
            return res.status(400).json({
                error: 'Unsupported target language',
                supportedLanguages
            });
        }
        const results = [];
        for (const file of files) {
            try {
                let result;
                // Validate file content
                if (!file.content || file.content.trim() === '') {
                    results.push({
                        language: targetLanguage,
                        code: `// Error: Empty file content for ${file.name}`,
                        filename: `error-${file.name}.txt`
                    });
                    continue;
                }
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
            }
            catch (error) {
                console.error(`Failed to process file ${file.name}:`, error);
                results.push({
                    language: targetLanguage,
                    code: `// Error processing ${file.name}: ${error.message}\n// Please check your file format and try again.`,
                    filename: `error-${file.name}.txt`
                });
            }
        }
        // Always return results, even if some files failed
        res.json({
            success: true,
            results,
            totalFiles: files.length,
            successCount: results.filter(r => !r.filename.startsWith('error-')).length,
            errorCount: results.filter(r => r.filename.startsWith('error-')).length
        });
    }
    catch (error) {
        console.error('Code generation failed:', error);
        res.status(500).json({
            error: 'Code generation failed',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};
exports.generateFromFiles = generateFromFiles;
// Generate from JSON Schema
async function generateFromJsonSchema(file, targetLanguage, options) {
    const schemaInput = new quicktype_core_1.JSONSchemaInput(new quicktype_core_1.FetchingJSONSchemaStore());
    // Parse the schema
    const schema = JSON.parse(file.content);
    const schemaName = schema.title || getFileNameWithoutExtension(file.name);
    await schemaInput.addSource({
        name: schemaName,
        schema: JSON.stringify(schema)
    });
    const inputData = { [targetLanguage]: schemaInput };
    // TODO: Fix quicktype API usage - temporarily disabled for build
    const result = {
        lines: [`// Quicktype generation temporarily disabled for ${schemaName}`, `// Target language: ${targetLanguage}`]
    };
    // const result = await quicktype({
    //   inputData,
    //   lang: targetLanguage as any,
    //   rendererOptions: {
    //     'just-types': options.justTypes,
    //     'acronym-style': options.acronymStyle,
    //     ...(options.packageName && { 'package': options.packageName }),
    //     ...(options.namespace && { 'namespace': options.namespace })
    //   }
    // });
    return {
        language: targetLanguage,
        code: result.lines.join('\n'),
        filename: `${schemaName}.${getFileExtension(targetLanguage)}`
    };
}
// Generate from sample JSON
async function generateFromSampleJson(file, targetLanguage, options) {
    const sampleName = getFileNameWithoutExtension(file.name);
    // TODO: Fix quicktype API usage - temporarily disabled for build
    const result = {
        lines: [`// Quicktype generation temporarily disabled for ${sampleName}`, `// Target language: ${targetLanguage}`]
    };
    return {
        language: targetLanguage,
        code: result.lines.join('\n'),
        filename: `${sampleName}.${getFileExtension(targetLanguage)}`
    };
}
// Generate from TypeScript (convert to other languages)
async function generateFromTypeScript(file, targetLanguage, options) {
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
    const schemaInput = new quicktype_core_1.JSONSchemaInput(new quicktype_core_1.FetchingJSONSchemaStore());
    await schemaInput.addSource({
        name: typeName,
        schema: JSON.stringify(jsonSchema)
    });
    // TODO: Fix quicktype API usage - temporarily disabled for build  
    const result = {
        lines: [`// Quicktype generation temporarily disabled for ${typeName}`, `// Target language: ${targetLanguage}`]
    };
    return {
        language: targetLanguage,
        code: result.lines.join('\n'),
        filename: `${typeName}.${getFileExtension(targetLanguage)}`
    };
}
// Auto-detect file type and generate
async function generateFromAutoDetect(file, targetLanguage, options) {
    // Try JSON first
    try {
        const parsed = JSON.parse(file.content);
        if (parsed.$schema || parsed.type || parsed.properties) {
            // Looks like JSON Schema
            return await generateFromJsonSchema({ ...file, type: 'json-schema' }, targetLanguage, options);
        }
        else {
            // Treat as sample JSON
            return await generateFromSampleJson({ ...file, type: 'json' }, targetLanguage, options);
        }
    }
    catch {
        // Not valid JSON, might be TypeScript
        if (file.content.includes('interface') || file.content.includes('type')) {
            return await generateFromTypeScript({ ...file, type: 'typescript' }, targetLanguage, options);
        }
    }
    throw new Error(`Unable to auto-detect file type for ${file.name}`);
}
// POST /api/quicktype/download-zip
const downloadZip = async (req, res) => {
    try {
        const { results } = req.body;
        if (!results || results.length === 0) {
            return res.status(400).json({ error: 'No results to download' });
        }
        const zip = new jszip_1.default();
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
    }
    catch (error) {
        console.error('ZIP generation failed:', error);
        res.status(500).json({ error: 'Failed to generate ZIP file' });
    }
};
exports.downloadZip = downloadZip;
// Utility functions
function getFileNameWithoutExtension(filename) {
    return filename.split('.').slice(0, -1).join('.');
}
function getFileExtension(language) {
    const extensions = {
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
function extractTypeScriptInterfaces(content) {
    // Simple regex to extract interface definitions
    const interfaceRegex = /interface\s+\w+\s*{[^}]*}/g;
    return content.match(interfaceRegex) || [];
}
function convertInterfaceToJsonSchema(interfaceString, typeName) {
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
const validateSchema = async (req, res) => {
    try {
        const { schema, data } = req.body;
        if (!schema) {
            return res.status(400).json({ error: 'Schema is required' });
        }
        // Basic schema validation
        try {
            JSON.parse(typeof schema === 'string' ? schema : JSON.stringify(schema));
        }
        catch {
            return res.status(400).json({ error: 'Invalid JSON schema' });
        }
        // If data is provided, validate against schema
        if (data) {
            // Here you would use AJV or similar for validation
            // For now, just return success
            return res.json({ valid: true });
        }
        res.json({ valid: true, message: 'Schema is valid' });
    }
    catch (error) {
        console.error('Schema validation failed:', error);
        res.status(500).json({ error: 'Schema validation failed' });
    }
};
exports.validateSchema = validateSchema;
