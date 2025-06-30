// Remove the local ImportMeta interface, use Vite's global type instead.

// Using QuickType API with custom parser fallback for browser compatibility

export interface SchemaMetadata {
  name: string
  file: string
  description: string
  quicktype: string
  example: any
}

export interface SchemaCategory {
  name: string
  description: string
  count: number
  schemas: SchemaMetadata[]
}

export interface SchemaRegistry {
  version: string
  lastUpdated: string
  totalSchemas: number
  categories?: {
    [key: string]: SchemaCategory
  }
  schemas?: SchemaMetadata[]
}

export interface Schema {
  id: string
  title: string
  description: string
  category: string
  content: any
  metadata: SchemaMetadata
  examples: any[]
}

export interface QuickTypeResult {
  code: string
  language: string
  schemaName: string
  timestamp: string
}

class SchemaService {
  private schemaRegistry: SchemaRegistry | null = null
  private cache: Map<string, QuickTypeResult> = new Map()
  private apiBaseUrl: string

  constructor() {
    // Use Vite environment variable or default to relative path for proxy
    this.apiBaseUrl = (import.meta as any).env.VITE_API_URL || '/api'

  }

  async loadSchemaRegistry(): Promise<SchemaRegistry> {
    if (this.schemaRegistry) {
      return this.schemaRegistry
    }

    try {
      // Try to load from the repository schemas directory via static file serving
      const response = await fetch('../../schemas/v1/index.json')
      if (!response.ok) {
        throw new Error(`Failed to load schema registry: ${response.statusText}`)
      }
      
      this.schemaRegistry = await response.json()
      return this.schemaRegistry!
    } catch (error) {
      console.error('Error loading schema registry:', error)
      // Load the actual registry data instead of mock data
      this.schemaRegistry = this.getActualRegistry()
      return this.schemaRegistry
    }
  }

  async loadSchemas(): Promise<SchemaRegistry> {
    try {
      // Try to load from GitHub repository
      const response = await fetch('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/index.json')
      
      if (response.ok) {
        const registry = await response.json()

        
        // Validate the registry structure
        if (this.isValidSchemaRegistry(registry)) {
          return registry
        } else {
          console.warn('Invalid schema registry structure from GitHub, using fallback registry')
          return this.getActualRegistry()
        }
      } else {
        console.warn('Failed to load from GitHub, using fallback registry')
        return this.getActualRegistry()
      }
    } catch (error) {
      console.error('Error loading schemas from GitHub:', error)

      return this.getActualRegistry()
    }
  }

  private isValidSchemaRegistry(registry: any): registry is SchemaRegistry {
    return registry && 
           typeof registry === 'object' &&
           typeof registry.version === 'string' &&
           typeof registry.lastUpdated === 'string' &&
           typeof registry.totalSchemas === 'number' &&
           (
             // Either has categories structure
             (registry.categories && typeof registry.categories === 'object' && !Array.isArray(registry.categories)) ||
             // Or has schemas array
             (registry.schemas && Array.isArray(registry.schemas))
           )
  }

  async loadSchemaFile(filePath: string): Promise<any> {
    try {
      // Load from GitHub repository with the full file path (includes directory)
      const response = await fetch(`https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/${filePath}`)
      if (!response.ok) {
        throw new Error(`Failed to load schema file: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error loading schema file ${filePath}:`, error)
      throw error
    }
  }

  async generateQuickTypeCode(schema: Schema, language: string): Promise<string> {
    const cacheKey = `${schema.id}-${language}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!.code
    }

    try {
      // First, try to use the QuickType API
      const code = await this.generateCodeFromQuickTypeAPI(schema, language)
      const quickTypeResult: QuickTypeResult = {
        code,
        language,
        schemaName: schema.title,
        timestamp: new Date().toISOString()
      }

      this.cache.set(cacheKey, quickTypeResult)
      return code
    } catch (error) {
      console.error(`Error generating code for ${schema.title}:`, error)

      
      // Fallback to custom parser
      const fallbackCode = await this.generateRealCodeFromSchema(schema, language)
      const quickTypeResult: QuickTypeResult = {
        code: fallbackCode,
        language,
        schemaName: schema.title,
        timestamp: new Date().toISOString()
      }

      this.cache.set(cacheKey, quickTypeResult)
      return fallbackCode
    }
  }

  private async generateCodeFromQuickTypeAPI(schema: Schema, language: string): Promise<string> {
    try {
      // Use the correct generate-from-registry endpoint
      const url = `${this.apiBaseUrl}/quicktype/generate-from-registry`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schemaId: schema.id,
          targetLanguage: language,
          options: {
            justTypes: true,
            acronymStyle: 'original',
            packageName: '',
            namespace: ''
          }
        })
      })

      if (!response.ok) {
        throw new Error(`QuickType API error: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'QuickType API generation failed')
      }

      return result.result.code
    } catch (error) {
      console.error('QuickType API call failed:', error)
      throw error
    }
  }

  async getSupportedLanguages(): Promise<{ id: string; name: string; description: string }[]> {
    try {
      const url = `${this.apiBaseUrl}/quicktype/languages`

      const response = await fetch(url)
      if (response.ok) {
        const result = await response.json()
        return result.languages || []
      }
    } catch (error) {
      console.error('Failed to fetch supported languages from API:', error)
    }

    // Fallback to hardcoded languages
    return [
      { id: 'typescript', name: 'TypeScript', description: 'TypeScript interfaces and types' },
      { id: 'python', name: 'Python', description: 'Python dataclasses and type hints' },
      { id: 'go', name: 'Go', description: 'Go structs and types' },
      { id: 'csharp', name: 'C#', description: 'C# classes and properties' },
      { id: 'java', name: 'Java', description: 'Java classes and annotations' },
      { id: 'rust', name: 'Rust', description: 'Rust structs and derives' }
    ]
  }

  async getGenerationOptions(): Promise<any> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/quicktype/options`)
      if (response.ok) {
        const result = await response.json()
        return result.options || {}
      }
    } catch (error) {
      console.error('Failed to fetch generation options from API:', error)
    }

    // Fallback to default options
    return {
      justTypes: { type: 'boolean', default: true, description: 'Generate only type definitions' },
      acronymStyle: { type: 'string', default: 'original', enum: ['original', 'pascal', 'camel', 'lower'] },
      packageName: { type: 'string', description: 'Package name for supported languages' },
      namespace: { type: 'string', description: 'Namespace for supported languages' }
    }
  }

  private async generateRealCodeFromSchema(schema: Schema, language: string): Promise<string> {
    try {
      if (!schema.content) {
        throw new Error('Schema content is required for code generation')
      }

      const timestamp = new Date().toISOString()
      const header = this.getCodeHeader(schema, language, timestamp)
      
      switch (language) {
        case 'typescript':
          return `${header}\n\n${this.generateTypeScriptFromSchema(schema.content, schema.title)}`
        case 'python':
          return `${header}\n\n${this.generatePythonFromSchema(schema.content, schema.title)}`
        case 'go':
          return `${header}\n\n${this.generateGoFromSchema(schema.content, schema.title)}`
        case 'csharp':
          return `${header}\n\n${this.generateCSharpFromSchema(schema.content, schema.title)}`
        case 'java':
          return `${header}\n\n${this.generateJavaFromSchema(schema.content, schema.title)}`
        case 'rust':
          return `${header}\n\n${this.generateRustFromSchema(schema.content, schema.title)}`
        default:
          throw new Error(`Unsupported language: ${language}`)
      }
    } catch (error) {
      console.error('Code generation failed:', error)
      throw error
    }
  }

  private generateTypeScriptFromSchema(schema: any, title: string): string {
    const interfaceName = this.toPascalCase(title)
    let code = `export interface ${interfaceName} {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const isOptional = !schema.required?.includes(propName)
        const propType = this.getTypeScriptType(propDef)
        const description = (propDef as any).description ? `  /** ${(propDef as any).description} */\n` : ''
        code += `${description}  ${propName}${isOptional ? '?' : ''}: ${propType};\n`
      }
    }
    
    code += `}\n\n`
    
    // Add type guards and utilities
    code += `export function is${interfaceName}(obj: unknown): obj is ${interfaceName} {\n`
    code += `  return typeof obj === 'object' && obj !== null;\n`
    code += `}\n\n`
    
    // Add example factory function
    code += `export function create${interfaceName}(data: Partial<${interfaceName}>): ${interfaceName} {\n`
    code += `  return {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const defaultValue = this.getTypeScriptDefault(propDef)
        code += `    ${propName}: data.${propName} ?? ${defaultValue},\n`
      }
    }
    
    code += `  };\n`
    code += `}\n`
    
    return code
  }

  private generatePythonFromSchema(schema: any, title: string): string {
    const className = this.toPascalCase(title)
    let code = `from typing import Dict, List, Optional, Union, Any\n`
    code += `from dataclasses import dataclass\nfrom datetime import datetime\n\n`
    
    code += `@dataclass\nclass ${className}:\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const pythonType = this.getPythonType(propDef)
        const isOptional = !schema.required?.includes(propName)
        const fieldType = isOptional ? `Optional[${pythonType}]` : pythonType
        const defaultValue = isOptional ? ' = None' : ''
        const description = (propDef as any).description ? `    # ${(propDef as any).description}\n` : ''
        code += `${description}    ${propName}: ${fieldType}${defaultValue}\n`
      }
    } else {
      code += `    pass\n`
    }
    
    code += `\n    @classmethod\n`
    code += `    def from_dict(cls, data: Dict[str, Any]) -> '${className}':\n`
    code += `        return cls(**data)\n\n`
    
    code += `    def to_dict(self) -> Dict[str, Any]:\n`
    code += `        return {\n`
    
    if (schema.properties) {
      for (const propName of Object.keys(schema.properties)) {
        code += `            '${propName}': self.${propName},\n`
      }
    }
    
    code += `        }\n`
    
    return code
  }

  private generateGoFromSchema(schema: any, title: string): string {
    const structName = this.toPascalCase(title)
    let code = `package main\n\nimport (\n    "encoding/json"\n    "time"\n)\n\n`
    
    code += `type ${structName} struct {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const goType = this.getGoType(propDef)
        const jsonTag = `\`json:"${propName}"\``
        const description = (propDef as any).description ? `    // ${(propDef as any).description}\n` : ''
        code += `${description}    ${this.toPascalCase(propName)} ${goType} ${jsonTag}\n`
      }
    }
    
    code += `}\n\n`
    
    // Add JSON methods
    code += `func (${structName.toLowerCase()} *${structName}) FromJSON(data []byte) error {\n`
    code += `    return json.Unmarshal(data, ${structName.toLowerCase()})\n`
    code += `}\n\n`
    
    code += `func (${structName.toLowerCase()} *${structName}) ToJSON() ([]byte, error) {\n`
    code += `    return json.Marshal(${structName.toLowerCase()})\n`
    code += `}\n`
    
    return code
  }

  private generateCSharpFromSchema(schema: any, title: string): string {
    const className = this.toPascalCase(title)
    let code = `using System;\nusing System.Collections.Generic;\nusing System.ComponentModel.DataAnnotations;\nusing Newtonsoft.Json;\n\n`
    
    code += `namespace OriginVault.Schemas\n{\n`
    code += `    public class ${className}\n    {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const csharpType = this.getCSharpType(propDef)
        const isRequired = schema.required?.includes(propName)
        const attributes = isRequired ? `        [Required]\n` : ''
        const description = (propDef as any).description ? `        /// <summary>${(propDef as any).description}</summary>\n` : ''
        const jsonProperty = `        [JsonProperty("${propName}")]\n`
        code += `${description}${attributes}${jsonProperty}        public ${csharpType} ${this.toPascalCase(propName)} { get; set; }\n\n`
      }
    }
    
    code += `    }\n}\n`
    
    return code
  }

  private generateJavaFromSchema(schema: any, title: string): string {
    const className = this.toPascalCase(title)
    let code = `package com.originvault.schemas;\n\n`
    code += `import com.fasterxml.jackson.annotation.JsonProperty;\nimport javax.validation.constraints.*;\nimport java.time.Instant;\nimport java.util.*;\n\n`
    
    code += `public class ${className} {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const javaType = this.getJavaType(propDef)
        const isRequired = schema.required?.includes(propName)
        const annotations = isRequired ? `    @NotNull\n` : ''
        const description = (propDef as any).description ? `    // ${(propDef as any).description}\n` : ''
        const jsonProperty = `    @JsonProperty("${propName}")\n`
        code += `${description}${annotations}${jsonProperty}    private ${javaType} ${propName};\n\n`
      }
      
      // Add getters and setters
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const javaType = this.getJavaType(propDef)
        const capitalizedName = this.toPascalCase(propName)
        
        code += `    public ${javaType} get${capitalizedName}() {\n`
        code += `        return ${propName};\n    }\n\n`
        
        code += `    public void set${capitalizedName}(${javaType} ${propName}) {\n`
        code += `        this.${propName} = ${propName};\n    }\n\n`
      }
    }
    
    code += `}\n`
    
    return code
  }

  private generateRustFromSchema(schema: any, title: string): string {
    const structName = this.toPascalCase(title)
    let code = `use serde::{Deserialize, Serialize};\nuse std::collections::HashMap;\nuse chrono::{DateTime, Utc};\n\n`
    
    code += `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${structName} {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const rustType = this.getRustType(propDef)
        const isOptional = !schema.required?.includes(propName)
        const fieldType = isOptional ? `Option<${rustType}>` : rustType
        const description = (propDef as any).description ? `    /// ${(propDef as any).description}\n` : ''
        const serdeRename = `    #[serde(rename = "${propName}")]\n`
        code += `${description}${serdeRename}    pub ${this.toSnakeCase(propName)}: ${fieldType},\n`
      }
    }
    
    code += `}\n\n`
    
    // Add implementation block
    code += `impl ${structName} {\n`
    code += `    pub fn new() -> Self {\n`
    code += `        Self {\n`
    
    if (schema.properties) {
      for (const [propName, propDef] of Object.entries(schema.properties as any)) {
        const isOptional = !schema.required?.includes(propName)
        const defaultValue = isOptional ? 'None' : this.getRustDefault(propDef)
        code += `            ${this.toSnakeCase(propName)}: ${defaultValue},\n`
      }
    }
    
    code += `        }\n    }\n}\n`
    
    return code
  }

  // Helper methods for type conversion
  private getTypeScriptType(propDef: any): string {
    if (propDef.enum) {
      return propDef.enum.map((e: any) => `"${e}"`).join(' | ')
    }
    
    switch (propDef.type) {
      case 'string':
        if (propDef.format === 'date-time') return 'string' // Could be Date for stricter typing
        return 'string'
      case 'number':
      case 'integer':
        return 'number'
      case 'boolean':
        return 'boolean'
      case 'array':
        if (propDef.items) {
          return `${this.getTypeScriptType(propDef.items)}[]`
        }
        return 'any[]'
      case 'object':
        return 'Record<string, any>' // Could be more specific
      case 'null':
        return 'null'
      default:
        return 'any'
    }
  }

  private getPythonType(propDef: any): string {
    if (propDef.enum) {
      return `Union[${propDef.enum.map((e: any) => `"${e}"`).join(', ')}]`
    }
    
    switch (propDef.type) {
      case 'string':
        return 'str'
      case 'number':
        return 'float'
      case 'integer':
        return 'int'
      case 'boolean':
        return 'bool'
      case 'array':
        if (propDef.items) {
          return `List[${this.getPythonType(propDef.items)}]`
        }
        return 'List[Any]'
      case 'object':
        return 'Dict[str, Any]'
      case 'null':
        return 'None'
      default:
        return 'Any'
    }
  }

  private getGoType(propDef: any): string {
    switch (propDef.type) {
      case 'string':
        return 'string'
      case 'number':
        return 'float64'
      case 'integer':
        return 'int64'
      case 'boolean':
        return 'bool'
      case 'array':
        if (propDef.items) {
          return `[]${this.getGoType(propDef.items)}`
        }
        return '[]interface{}'
      case 'object':
        return 'map[string]interface{}'
      default:
        return 'interface{}'
    }
  }

  private getCSharpType(propDef: any): string {
    const isOptional = true // We'll handle this in the calling function
    
    switch (propDef.type) {
      case 'string':
        return 'string'
      case 'number':
        return isOptional ? 'double?' : 'double'
      case 'integer':
        return isOptional ? 'int?' : 'int'
      case 'boolean':
        return isOptional ? 'bool?' : 'bool'
      case 'array':
        if (propDef.items) {
          return `List<${this.getCSharpType(propDef.items)}>`
        }
        return 'List<object>'
      case 'object':
        return 'Dictionary<string, object>'
      default:
        return 'object'
    }
  }

  private getJavaType(propDef: any): string {
    switch (propDef.type) {
      case 'string':
        return 'String'
      case 'number':
        return 'Double'
      case 'integer':
        return 'Integer'
      case 'boolean':
        return 'Boolean'
      case 'array':
        if (propDef.items) {
          return `List<${this.getJavaType(propDef.items)}>`
        }
        return 'List<Object>'
      case 'object':
        return 'Map<String, Object>'
      default:
        return 'Object'
    }
  }

  private getRustType(propDef: any): string {
    switch (propDef.type) {
      case 'string':
        return 'String'
      case 'number':
        return 'f64'
      case 'integer':
        return 'i64'
      case 'boolean':
        return 'bool'
      case 'array':
        if (propDef.items) {
          return `Vec<${this.getRustType(propDef.items)}>`
        }
        return 'Vec<serde_json::Value>'
      case 'object':
        return 'HashMap<String, serde_json::Value>'
      default:
        return 'serde_json::Value'
    }
  }

  // Helper methods for default values
  private getTypeScriptDefault(propDef: any): string {
    switch (propDef.type) {
      case 'string':
        return '""'
      case 'number':
      case 'integer':
        return '0'
      case 'boolean':
        return 'false'
      case 'array':
        return '[]'
      case 'object':
        return '{}'
      default:
        return 'undefined'
    }
  }

  private getRustDefault(propDef: any): string {
    switch (propDef.type) {
      case 'string':
        return 'String::new()'
      case 'number':
        return '0.0'
      case 'integer':
        return '0'
      case 'boolean':
        return 'false'
      case 'array':
        return 'Vec::new()'
      case 'object':
        return 'HashMap::new()'
      default:
        return 'Default::default()'
    }
  }

  // Helper methods for case conversion
  private toPascalCase(str: string): string {
    return str.replace(/(?:^|[\s-_])+(.)/g, (_, char) => char.toUpperCase())
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '')
  }

  getCodeHeader(schema: Schema, language: string, timestamp: string): string {
    const headers: { [key: string]: string } = {
      typescript: `/**
 * Generated TypeScript types from JSON Schema
 * Schema: ${schema.title} (${schema.metadata.file})
 * Generated: ${timestamp}
 * Generator: QuickType
 */`,
      
      python: `"""
Generated Python types from JSON Schema
Schema: ${schema.title} (${schema.metadata.file})
Generated: ${timestamp}
Generator: QuickType
"""`,
      
      go: `// Generated Go types from JSON Schema
// Schema: ${schema.title} (${schema.metadata.file})
// Generated: ${timestamp}
// Generator: QuickType`,
      
      csharp: `// Generated C# types from JSON Schema
// Schema: ${schema.title} (${schema.metadata.file})
// Generated: ${timestamp}
// Generator: QuickType`,
      
      java: `// Generated Java types from JSON Schema
// Schema: ${schema.title} (${schema.metadata.file})
// Generated: ${timestamp}
// Generator: QuickType`,
      
      rust: `// Generated Rust types from JSON Schema
// Schema: ${schema.title} (${schema.metadata.file})
// Generated: ${timestamp}
// Generator: QuickType`
    }
    
    return headers[language] || `// Generated ${language} types from JSON Schema
// Schema: ${schema.title} (${schema.metadata.file})
// Generated: ${timestamp}
// Generator: QuickType`
  }

  getFallbackCode(schema: Schema, language: string): string {
    const languageTemplates: { [key: string]: string } = {
      typescript: `// Generated TypeScript types for ${schema.title}
// Schema: ${schema.metadata.file}

export interface ${schema.title.replace(/\s+/g, '')} {
  // Auto-generated from JSON Schema
  // This is a fallback - use QuickType for full generation
}

export type ${schema.title.replace(/\s+/g, '')}Array = ${schema.title.replace(/\s+/g, '')}[]

// Example usage:
// const credential: ${schema.title.replace(/\s+/g, '')} = {
//   // Your data here
// }`,

      python: `# Generated Python types for ${schema.title}
# Schema: ${schema.metadata.file}

from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ${schema.title.replace(/\s+/g, '')}:
    # Auto-generated from JSON Schema
    # This is a fallback - use QuickType for full generation
    pass

# Example usage:
# credential = ${schema.title.replace(/\s+/g, '')}(
#     # Your data here
# )`,

      go: `// Generated Go types for ${schema.title}
// Schema: ${schema.metadata.file}

package main

import (
    "time"
)

type ${schema.title.replace(/\s+/g, '')} struct {
    // Auto-generated from JSON Schema
    // This is a fallback - use QuickType for full generation
}

// Example usage:
// credential := ${schema.title.replace(/\s+/g, '')}{
//     // Your data here
// }`,

      csharp: `// Generated C# types for ${schema.title}
// Schema: ${schema.metadata.file}

using System;
using System.Collections.Generic;

namespace OriginVault.Schemas
{
    public class ${schema.title.replace(/\s+/g, '')}
    {
        // Auto-generated from JSON Schema
        // This is a fallback - use QuickType for full generation
    }
}

// Example usage:
// var credential = new ${schema.title.replace(/\s+/g, '')}
// {
//     // Your data here
// };`,

      java: `// Generated Java types for ${schema.title}
// Schema: ${schema.metadata.file}

package com.originvault.schemas;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class ${schema.title.replace(/\s+/g, '')} {
    // Auto-generated from JSON Schema
    // This is a fallback - use QuickType for full generation
}

// Example usage:
// ${schema.title.replace(/\s+/g, '')} credential = new ${schema.title.replace(/\s+/g, '')}();
// // Set your data here`,

      rust: `// Generated Rust types for ${schema.title}
// Schema: ${schema.metadata.file}

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ${schema.title.replace(/\s+/g, '')} {
    // Auto-generated from JSON Schema
    // This is a fallback - use QuickType for full generation
}

// Example usage:
// let credential = ${schema.title.replace(/\s+/g, '')} {
//     // Your data here
// };`
    }

    return languageTemplates[language] || `// Generated code for ${schema.title} in ${language}
// Schema: ${schema.metadata.file}
// This is a fallback template`
  }

  getCategories(): { id: string; name: string; description: string; count: number }[] {
    if (!this.schemaRegistry || !this.schemaRegistry.categories) {
      return []
    }

    return Object.entries(this.schemaRegistry.categories).map(([id, category]) => ({
      id,
      name: category.name,
      description: category.description,
      count: category.count
    }))
  }

  async getLanguages(): Promise<{ id: string; name: string }[]> {
    try {
      const languages = await this.getSupportedLanguages()
      return languages.map(lang => ({ id: lang.id, name: lang.name }))
    } catch (error) {
      console.error('Failed to get languages from API, using fallback:', error)
      // Fallback to hardcoded languages
      return [
        { id: 'typescript', name: 'TypeScript' },
        { id: 'python', name: 'Python' },
        { id: 'go', name: 'Go' },
        { id: 'csharp', name: 'C#' },
        { id: 'java', name: 'Java' },
        { id: 'rust', name: 'Rust' }
      ]
    }
  }

  private getActualRegistry(): SchemaRegistry {
    return {
      version: "1.0.0",
      lastUpdated: "2025-01-14T10:00:00Z",
      totalSchemas: 22,
      categories: {
        identity: {
          name: "Identity & Access Management",
          description: "Core identity and permission management schemas",
          count: 6,
          schemas: [
            {
              name: "PersonCredential",
              file: "identity/PersonCredential.schema.json",
              description: "Individual identity verification and management",
              quicktype: "quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "OrganizationCredential",
              file: "identity/OrganizationCredential.schema.json",
              description: "Organization identity and verification",
              quicktype: "quicktype --src schemas/v1/identity/OrganizationCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "RoleCredential",
              file: "identity/RoleCredential.schema.json",
              description: "Role-based access control and permissions",
              quicktype: "quicktype --src schemas/v1/identity/RoleCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "PermissionCredential",
              file: "identity/PermissionCredential.schema.json",
              description: "Granular permission management",
              quicktype: "quicktype --src schemas/v1/identity/PermissionCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "AuthenticationCredential",
              file: "identity/AuthenticationCredential.schema.json",
              description: "Authentication method verification",
              quicktype: "quicktype --src schemas/v1/identity/AuthenticationCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "AccessControlCredential",
              file: "identity/AccessControlCredential.schema.json",
              description: "Access control and authorization",
              quicktype: "quicktype --src schemas/v1/identity/AccessControlCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        },
        business: {
          name: "Business Workflow Automation",
          description: "Complete business process automation schemas",
          count: 7,
          schemas: [
            {
              name: "ContractCredential",
              file: "business/ContractCredential.schema.json",
              description: "Legal contract execution and tracking",
              quicktype: "quicktype --src schemas/v1/business/ContractCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "InvoiceCredential",
              file: "business/InvoiceCredential.schema.json",
              description: "Invoice generation and payment tracking",
              quicktype: "quicktype --src schemas/v1/business/InvoiceCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "PurchaseOrderCredential",
              file: "business/PurchaseOrderCredential.schema.json",
              description: "Purchase order management and fulfillment",
              quicktype: "quicktype --src schemas/v1/business/PurchaseOrderCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "WorkflowCredential",
              file: "business/WorkflowCredential.schema.json",
              description: "Business process workflow automation",
              quicktype: "quicktype --src schemas/v1/business/WorkflowCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "ApprovalCredential",
              file: "business/ApprovalCredential.schema.json",
              description: "Multi-stage approval process management",
              quicktype: "quicktype --src schemas/v1/business/ApprovalCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "ComplianceCredential",
              file: "business/ComplianceCredential.schema.json",
              description: "Regulatory compliance verification",
              quicktype: "quicktype --src schemas/v1/business/ComplianceCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "AuditCredential",
              file: "business/AuditCredential.schema.json",
              description: "Audit trail and verification",
              quicktype: "quicktype --src schemas/v1/business/AuditCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        },
        content: {
          name: "Content & Creation Management",
          description: "Digital content creation and management schemas",
          count: 3,
          schemas: [
            {
              name: "ContentCredential",
              file: "content/ContentCredential.schema.json",
              description: "Digital content provenance and ownership",
              quicktype: "quicktype --src schemas/v1/content/ContentCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "CreatorCredential",
              file: "content/CreatorCredential.schema.json",
              description: "Content creator verification and attribution",
              quicktype: "quicktype --src schemas/v1/content/CreatorCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "LicenseCredential",
              file: "content/LicenseCredential.schema.json",
              description: "Content licensing and usage rights",
              quicktype: "quicktype --src schemas/v1/content/LicenseCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        },
        trust: {
          name: "Trust & Verification Systems",
          description: "Trust establishment and verification schemas",
          count: 2,
          schemas: [
            {
              name: "TrustCredential",
              file: "trust/TrustCredential.schema.json",
              description: "Trust relationship establishment",
              quicktype: "quicktype --src schemas/v1/trust/TrustCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "VerificationCredential",
              file: "trust/VerificationCredential.schema.json",
              description: "Third-party verification and attestation",
              quicktype: "quicktype --src schemas/v1/trust/VerificationCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        },
        payments: {
          name: "Payments & Economics",
          description: "Payment processing and economic transaction schemas",
          count: 2,
          schemas: [
            {
              name: "PaymentCredential",
              file: "payments/PaymentCredential.schema.json",
              description: "Payment processing and transaction records",
              quicktype: "quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "EconomicCredential",
              file: "payments/EconomicCredential.schema.json",
              description: "Economic value and transaction modeling",
              quicktype: "quicktype --src schemas/v1/payments/EconomicCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        },
        platform: {
          name: "Platform & Services",
          description: "Platform integration and service management schemas",
          count: 2,
          schemas: [
            {
              name: "ServiceCredential",
              file: "platform/ServiceCredential.schema.json",
              description: "Service registration and capability description",
              quicktype: "quicktype --src schemas/v1/platform/ServiceCredential.schema.json --lang typescript",
              example: {}
            },
            {
              name: "IntegrationCredential",
              file: "platform/IntegrationCredential.schema.json",
              description: "Third-party integration and API access",
              quicktype: "quicktype --src schemas/v1/platform/IntegrationCredential.schema.json --lang typescript",
              example: {}
            }
          ]
        }
      }
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const schemaService = new SchemaService() 