/**
 * Type Generation Service using QuickType
 * Generates TypeScript interfaces from JSON Schema definitions
 */

import {
  quicktype,
  InputData,
  JSONSchemaInput,
  FetchingJSONSchemaStore
} from 'quicktype-core';

export interface TypeGenerationOptions {
  topLevelName?: string;
  packageName?: string;
  justTypes?: boolean;
  nicePropertyNames?: boolean;
  declareUnions?: boolean;
  preferUnions?: boolean;
  strictOptional?: boolean;
}

export interface GeneratedTypes {
  types: string;
  interfaces: string[];
  enums: string[];
  examples: string;
}

/**
 * Generate TypeScript types from JSON Schema
 */
export async function generateTypesFromSchema(
  schema: any,
  options: TypeGenerationOptions = {}
): Promise<GeneratedTypes> {
  try {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    
    // Add the schema to the input
    await schemaInput.addSource({
      name: options.topLevelName || 'GeneratedType',
      schema: JSON.stringify(schema)
    });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    // Configure QuickType options
    const quicktypeOptions = {
      lang: 'typescript' as const,
      inputData,
      rendererOptions: {
        'just-types': options.justTypes ?? true,
        'nice-property-names': options.nicePropertyNames ?? true,
        'declare-unions': options.declareUnions ?? true,
        'prefer-unions': options.preferUnions ?? true,
        'strict-optional': options.strictOptional ?? true,
        'acronym-style': 'camel',
        'converters': 'top-level',
        'runtime-typecheck': false
      }
    };

    const result = await quicktype(quicktypeOptions);

    // Parse the generated types to extract interfaces and enums
    const generatedCode = result.lines.join('\n');
    const interfaces = extractInterfaces(generatedCode);
    const enums = extractEnums(generatedCode);
    const examples = generateExampleUsage(schema, options.topLevelName || 'GeneratedType');

    return {
      types: generatedCode,
      interfaces,
      enums,
      examples
    };
  } catch (error) {
    console.error('Type generation failed:', error);
    throw new Error(`Failed to generate types: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract interface names from generated TypeScript code
 */
function extractInterfaces(code: string): string[] {
  const interfaceRegex = /export interface (\w+)/g;
  const interfaces: string[] = [];
  let match;
  
  while ((match = interfaceRegex.exec(code)) !== null) {
    interfaces.push(match[1]);
  }
  
  return interfaces;
}

/**
 * Extract enum names from generated TypeScript code
 */
function extractEnums(code: string): string[] {
  const enumRegex = /export enum (\w+)/g;
  const enums: string[] = [];
  let match;
  
  while ((match = enumRegex.exec(code)) !== null) {
    enums.push(match[1]);
  }
  
  return enums;
}

/**
 * Generate example usage code
 */
function generateExampleUsage(schema: any, typeName: string): string {
  const example = schema.examples?.[0];
  
  if (example) {
    return `// Example usage:
const ${typeName.toLowerCase()}Example: ${typeName} = ${JSON.stringify(example, null, 2)};

// Type validation example:
function validate${typeName}(data: unknown): data is ${typeName} {
  // Add your validation logic here
  return typeof data === 'object' && data !== null;
}

// Usage in application:
const credential: ${typeName} = {
  // Your data structure based on the generated interface
  ...${typeName.toLowerCase()}Example
};`;
  }

  return `// Example usage:
const ${typeName.toLowerCase()}: ${typeName} = {
  // Implement according to the generated interface
};

// Type validation helper:
function is${typeName}(data: unknown): data is ${typeName} {
  return typeof data === 'object' && data !== null;
}`;
}

/**
 * Generate types for OriginVaultRootAuthority specifically
 */
export async function generateOriginVaultRootAuthorityTypes(): Promise<GeneratedTypes> {
  // Load the schema (in a real app, this would come from your schema registry)
  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/v1/OriginVaultRootAuthority",
    "title": "OriginVault Root Authority",
    "description": "Establishes OriginVault as a root authority in the multi-root trust architecture",
    "type": "object",
    // ... we'll populate this with the actual schema
  };

  return generateTypesFromSchema(schema, {
    topLevelName: 'OriginVaultRootAuthority',
    justTypes: true,
    nicePropertyNames: true,
    declareUnions: true,
    preferUnions: true,
    strictOptional: true
  });
}

/**
 * Browser-compatible type generation (simplified)
 */
export function generateTypesClientSide(schema: any, typeName: string): string {
  // Simplified client-side generation for demo purposes
  // In production, you'd want to use the full QuickType in a web worker
  
  function generateInterface(obj: any, name: string, indent = 0): string {
    const indentStr = '  '.repeat(indent);
    let result = `${indentStr}export interface ${name} {\n`;
    
    if (obj.properties) {
      Object.entries(obj.properties).forEach(([key, prop]: [string, any]) => {
        const optional = !obj.required?.includes(key) ? '?' : '';
        const type = getTypeFromSchema(prop);
        const description = prop.description ? `  // ${prop.description}\n${indentStr}` : '';
        result += `${indentStr}  ${description}${key}${optional}: ${type};\n`;
      });
    }
    
    result += `${indentStr}}\n`;
    return result;
  }
  
  function getTypeFromSchema(prop: any): string {
    if (prop.type === 'string') {
      if (prop.enum) return prop.enum.map((e: string) => `"${e}"`).join(' | ');
      return 'string';
    }
    if (prop.type === 'number' || prop.type === 'integer') return 'number';
    if (prop.type === 'boolean') return 'boolean';
    if (prop.type === 'array') {
      const itemType = prop.items ? getTypeFromSchema(prop.items) : 'any';
      return `${itemType}[]`;
    }
    if (prop.type === 'object') return 'Record<string, any>'; // Simplified
    return 'any';
  }
  
  return generateInterface(schema, typeName);
} 