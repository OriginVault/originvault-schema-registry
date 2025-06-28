// Vercel serverless function for QuickType code generation
// This fixes the 405 Method Not Allowed error when generating Go code from TypeScript

// For now, we'll create a simplified version that handles the basic conversion
// A full QuickType integration would require the quicktype-core package

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { files, targetLanguage, options } = req.body;

    console.log(`QuickType API called: ${files?.length || 0} files, target: ${targetLanguage}`);

    // Validate request
    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ 
        error: 'No files provided',
        message: 'Please upload at least one schema or type file to generate code.'
      });
    }

    if (!targetLanguage) {
      return res.status(400).json({ error: 'Target language is required' });
    }

    // Supported languages
    const supportedLanguages = ['typescript', 'python', 'go', 'csharp', 'java', 'rust', 'swift', 'kotlin', 'php', 'ruby', 'javascript'];
    if (!supportedLanguages.includes(targetLanguage.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Unsupported target language',
        supportedLanguages 
      });
    }

    // Process each file
    const results = files.map(file => {
      try {
        const code = generateCodeFromFile(file, targetLanguage, options);
        const filename = `${getFileNameWithoutExtension(file.name)}.${getFileExtension(targetLanguage)}`;
        
        return {
          language: targetLanguage,
          code,
          filename
        };
      } catch (error) {
        console.error(`Failed to process file ${file.name}:`, error);
        return {
          language: targetLanguage,
          code: `// Error processing ${file.name}: ${error.message}\n// Please check your file format and try again.`,
          filename: `error-${file.name}.txt`
        };
      }
    });

    res.json({
      success: true,
      results,
      totalFiles: files.length,
      successCount: results.filter(r => !r.filename.startsWith('error-')).length,
      errorCount: results.filter(r => r.filename.startsWith('error-')).length
    });

  } catch (error) {
    console.error('QuickType generation failed:', error);
    res.status(500).json({ 
      error: 'Code generation failed',
      message: error.message || 'Internal server error'
    });
  }
}

function generateCodeFromFile(file, targetLanguage, options = {}) {
  const typeName = getFileNameWithoutExtension(file.name);
  
  // For TypeScript files, convert based on the content
  if (file.type === 'typescript' || file.content.includes('interface') || file.content.includes('type')) {
    return convertTypeScriptToTarget(file.content, targetLanguage, typeName, options);
  }
  
  // For JSON Schema files
  if (file.type === 'json-schema' || isJsonSchema(file.content)) {
    return convertJsonSchemaToTarget(file.content, targetLanguage, typeName, options);
  }
  
  // For JSON files
  try {
    JSON.parse(file.content);
    return convertJsonToTarget(file.content, targetLanguage, typeName, options);
  } catch {
    throw new Error('Unable to parse file content');
  }
}

function convertTypeScriptToTarget(content, targetLanguage, typeName, options) {
  // Parse TypeScript interfaces and types
  const interfaces = extractTypeScriptInterfaces(content);
  const types = extractTypeScriptTypes(content);
  
  switch (targetLanguage.toLowerCase()) {
    case 'go':
      return convertTypeScriptToGo(interfaces, types, typeName, options);
    case 'python':
      return convertTypeScriptToPython(interfaces, types, typeName, options);
    case 'java':
      return convertTypeScriptToJava(interfaces, types, typeName, options);
    case 'csharp':
      return convertTypeScriptToCSharp(interfaces, types, typeName, options);
    case 'rust':
      return convertTypeScriptToRust(interfaces, types, typeName, options);
    default:
      return `// ${targetLanguage} conversion not yet implemented\n// Original TypeScript:\n${content}`;
  }
}

function convertTypeScriptToGo(interfaces, types, typeName, options) {
  let goCode = `package main\n\nimport (\n\t"encoding/json"\n\t"time"\n)\n\n`;
  
  // Convert type aliases first
  types.forEach(typeInfo => {
    if (typeInfo.isUnion) {
      goCode += `// ${typeInfo.name} represents a union type\ntype ${typeInfo.name} string\n\nconst (\n`;
      typeInfo.values.forEach((value, index) => {
        const constName = `${typeInfo.name}${value.replace(/[^a-zA-Z0-9]/g, '')}`;
        goCode += `\t${constName} ${typeInfo.name} = "${value}"\n`;
      });
      goCode += `)\n\n`;
    }
  });
  
  // Convert interfaces to structs
  interfaces.forEach(interfaceInfo => {
    goCode += `type ${interfaceInfo.name} struct {\n`;
    
    interfaceInfo.fields.forEach(field => {
      const goType = convertTypeToGo(field.type);
      const jsonTag = `\`json:"${field.name}"\``;
      const fieldName = capitalizeFirst(field.name);
      goCode += `\t${fieldName} ${goType} ${jsonTag}\n`;
    });
    
    goCode += `}\n\n`;
  });
  
  return goCode;
}

function convertTypeScriptToPython(interfaces, types, typeName, options) {
  let pythonCode = `from typing import Union, Optional, List, Dict, Any\nfrom dataclasses import dataclass\nfrom enum import Enum\nimport json\n\n`;
  
  // Convert type aliases to enums
  types.forEach(typeInfo => {
    if (typeInfo.isUnion) {
      pythonCode += `class ${typeInfo.name}(Enum):\n`;
      typeInfo.values.forEach(value => {
        const enumName = value.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
        pythonCode += `    ${enumName} = "${value}"\n`;
      });
      pythonCode += `\n`;
    }
  });
  
  // Convert interfaces to dataclasses
  interfaces.forEach(interfaceInfo => {
    pythonCode += `@dataclass\nclass ${interfaceInfo.name}:\n`;
    
    interfaceInfo.fields.forEach(field => {
      const pythonType = convertTypeToPython(field.type);
      pythonCode += `    ${field.name}: ${pythonType}\n`;
    });
    
    pythonCode += `\n`;
  });
  
  return pythonCode;
}

function convertTypeScriptToJava(interfaces, types, typeName, options) {
  const packageName = options.packageName || 'com.example';
  let javaCode = `package ${packageName};\n\nimport com.fasterxml.jackson.annotation.JsonProperty;\nimport java.time.OffsetDateTime;\nimport java.util.List;\n\n`;
  
  // Convert type aliases to enums
  types.forEach(typeInfo => {
    if (typeInfo.isUnion) {
      javaCode += `public enum ${typeInfo.name} {\n`;
      typeInfo.values.forEach((value, index) => {
        const enumName = value.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
        javaCode += `    @JsonProperty("${value}")\n    ${enumName}("${value}")`;
        javaCode += index < typeInfo.values.length - 1 ? ',\n' : ';\n';
      });
      javaCode += `\n    private final String value;\n\n    ${typeInfo.name}(String value) {\n        this.value = value;\n    }\n\n    public String getValue() {\n        return value;\n    }\n}\n\n`;
    }
  });
  
  // Convert interfaces to classes
  interfaces.forEach(interfaceInfo => {
    javaCode += `public class ${interfaceInfo.name} {\n`;
    
    interfaceInfo.fields.forEach(field => {
      const javaType = convertTypeToJava(field.type);
      javaCode += `    @JsonProperty("${field.name}")\n`;
      javaCode += `    private ${javaType} ${field.name};\n\n`;
    });
    
    // Generate getters and setters
    interfaceInfo.fields.forEach(field => {
      const javaType = convertTypeToJava(field.type);
      const methodName = capitalizeFirst(field.name);
      javaCode += `    public ${javaType} get${methodName}() {\n        return ${field.name};\n    }\n\n`;
      javaCode += `    public void set${methodName}(${javaType} ${field.name}) {\n        this.${field.name} = ${field.name};\n    }\n\n`;
    });
    
    javaCode += `}\n\n`;
  });
  
  return javaCode;
}

function convertTypeScriptToCSharp(interfaces, types, typeName, options) {
  const namespace = options.namespace || 'Generated';
  let csharpCode = `using System;\nusing System.Collections.Generic;\nusing Newtonsoft.Json;\n\nnamespace ${namespace}\n{\n`;
  
  // Convert type aliases to enums
  types.forEach(typeInfo => {
    if (typeInfo.isUnion) {
      csharpCode += `    public enum ${typeInfo.name}\n    {\n`;
      typeInfo.values.forEach((value, index) => {
        const enumName = value.replace(/[^a-zA-Z0-9]/g, '');
        csharpCode += `        [JsonProperty("${value}")]\n        ${enumName}`;
        csharpCode += index < typeInfo.values.length - 1 ? ',\n' : '\n';
      });
      csharpCode += `    }\n\n`;
    }
  });
  
  // Convert interfaces to classes
  interfaces.forEach(interfaceInfo => {
    csharpCode += `    public class ${interfaceInfo.name}\n    {\n`;
    
    interfaceInfo.fields.forEach(field => {
      const csharpType = convertTypeToCSharp(field.type);
      const propertyName = capitalizeFirst(field.name);
      csharpCode += `        [JsonProperty("${field.name}")]\n`;
      csharpCode += `        public ${csharpType} ${propertyName} { get; set; }\n\n`;
    });
    
    csharpCode += `    }\n\n`;
  });
  
  csharpCode += `}\n`;
  return csharpCode;
}

function convertTypeScriptToRust(interfaces, types, typeName, options) {
  let rustCode = `use serde::{Deserialize, Serialize};\nuse std::collections::HashMap;\n\n`;
  
  // Convert type aliases to enums
  types.forEach(typeInfo => {
    if (typeInfo.isUnion) {
      rustCode += `#[derive(Debug, Clone, Serialize, Deserialize)]\n#[serde(rename_all = "PascalCase")]\npub enum ${typeInfo.name} {\n`;
      typeInfo.values.forEach(value => {
        const enumName = value.replace(/[^a-zA-Z0-9]/g, '');
        rustCode += `    #[serde(rename = "${value}")]\n    ${enumName},\n`;
      });
      rustCode += `}\n\n`;
    }
  });
  
  // Convert interfaces to structs
  interfaces.forEach(interfaceInfo => {
    rustCode += `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${interfaceInfo.name} {\n`;
    
    interfaceInfo.fields.forEach(field => {
      const rustType = convertTypeToRust(field.type);
      rustCode += `    #[serde(rename = "${field.name}")]\n`;
      rustCode += `    pub ${field.name}: ${rustType},\n`;
    });
    
    rustCode += `}\n\n`;
  });
  
  return rustCode;
}

// Helper functions for parsing TypeScript
function extractTypeScriptInterfaces(content) {
  const interfaces = [];
  const interfaceRegex = /interface\s+(\w+)\s*{([^}]*)}/g;
  let match;
  
  while ((match = interfaceRegex.exec(content)) !== null) {
    const [, name, body] = match;
    const fields = parseInterfaceFields(body);
    interfaces.push({ name, fields });
  }
  
  return interfaces;
}

function extractTypeScriptTypes(content) {
  const types = [];
  const typeRegex = /export\s+type\s+(\w+)\s*=\s*([^;]+);/g;
  let match;
  
  while ((match = typeRegex.exec(content)) !== null) {
    const [, name, definition] = match;
    const isUnion = definition.includes('|');
    
    if (isUnion) {
      const values = definition.split('|').map(v => v.trim().replace(/['"]/g, ''));
      types.push({ name, isUnion: true, values });
    }
  }
  
  return types;
}

function parseInterfaceFields(body) {
  const fields = [];
  const lines = body.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));
  
  lines.forEach(line => {
    const match = line.match(/(\w+):\s*([^;]+);?/);
    if (match) {
      const [, name, type] = match;
      fields.push({ name, type: type.trim() });
    }
  });
  
  return fields;
}

// Type conversion functions
function convertTypeToGo(tsType) {
  if (tsType.includes('|')) return 'interface{}'; // Union types
  if (tsType.includes('[]')) return `[]${convertTypeToGo(tsType.replace('[]', ''))}`;
  if (tsType.includes('Array<')) return `[]${convertTypeToGo(tsType.match(/Array<(.+)>/)?.[1] || 'interface{}')}`;
  
  switch (tsType.toLowerCase()) {
    case 'string': return 'string';
    case 'number': return 'float64';
    case 'boolean': return 'bool';
    case 'date': return 'time.Time';
    case 'object': return 'map[string]interface{}';
    default: return tsType; // Assume it's a custom type
  }
}

function convertTypeToPython(tsType) {
  if (tsType.includes('|')) {
    const types = tsType.split('|').map(t => convertTypeToPython(t.trim()));
    return `Union[${types.join(', ')}]`;
  }
  if (tsType.includes('[]')) return `List[${convertTypeToPython(tsType.replace('[]', ''))}]`;
  if (tsType.includes('Array<')) return `List[${convertTypeToPython(tsType.match(/Array<(.+)>/)?.[1] || 'Any')}]`;
  
  switch (tsType.toLowerCase()) {
    case 'string': return 'str';
    case 'number': return 'float';
    case 'boolean': return 'bool';
    case 'date': return 'str';  // ISO date string
    case 'object': return 'Dict[str, Any]';
    default: return tsType;
  }
}

function convertTypeToJava(tsType) {
  if (tsType.includes('[]')) return `List<${convertTypeToJava(tsType.replace('[]', ''))}>`;
  if (tsType.includes('Array<')) return `List<${convertTypeToJava(tsType.match(/Array<(.+)>/)?.[1] || 'Object')}>`;
  
  switch (tsType.toLowerCase()) {
    case 'string': return 'String';
    case 'number': return 'Double';
    case 'boolean': return 'Boolean';
    case 'date': return 'OffsetDateTime';
    case 'object': return 'Object';
    default: return tsType;
  }
}

function convertTypeToCSharp(tsType) {
  if (tsType.includes('[]')) return `List<${convertTypeToCSharp(tsType.replace('[]', ''))}>`;
  if (tsType.includes('Array<')) return `List<${convertTypeToCSharp(tsType.match(/Array<(.+)>/)?.[1] || 'object')}>`;
  
  switch (tsType.toLowerCase()) {
    case 'string': return 'string';
    case 'number': return 'double';
    case 'boolean': return 'bool';
    case 'date': return 'DateTime';
    case 'object': return 'object';
    default: return tsType;
  }
}

function convertTypeToRust(tsType) {
  if (tsType.includes('[]')) return `Vec<${convertTypeToRust(tsType.replace('[]', ''))}>`;
  if (tsType.includes('Array<')) return `Vec<${convertTypeToRust(tsType.match(/Array<(.+)>/)?.[1] || 'serde_json::Value')}>`;
  
  switch (tsType.toLowerCase()) {
    case 'string': return 'String';
    case 'number': return 'f64';
    case 'boolean': return 'bool';
    case 'date': return 'String';  // ISO date string
    case 'object': return 'HashMap<String, serde_json::Value>';
    default: return tsType;
  }
}

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

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isJsonSchema(content) {
  try {
    const parsed = JSON.parse(content);
    return parsed.$schema || parsed.type || parsed.properties;
  } catch {
    return false;
  }
}

function convertJsonSchemaToTarget(content, targetLanguage, typeName, options) {
  // Basic JSON Schema to target language conversion
  // This is a simplified version - full implementation would be more complex
  return `// JSON Schema conversion for ${targetLanguage} not fully implemented yet\n// Schema: ${typeName}\n// Content: ${content.substring(0, 200)}...`;
}

function convertJsonToTarget(content, targetLanguage, typeName, options) {
  // Basic JSON to target language conversion
  return `// JSON to ${targetLanguage} conversion not fully implemented yet\n// Type: ${typeName}\n// Sample data: ${content.substring(0, 200)}...`;
} 