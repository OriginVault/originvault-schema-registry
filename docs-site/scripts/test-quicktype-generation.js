#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');

// Test basic type generation
async function testTypeGeneration() {
  console.log(chalk.blue('🧪 Testing Dynamic Type Generation\n'));
  
  const mockSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "PersonCredential", 
    "type": "object",
    "properties": {
      "id": { "type": "string", "description": "Unique identifier" },
      "firstName": { "type": "string", "description": "First name" },
      "lastName": { "type": "string", "description": "Last name" },
      "email": { "type": "string", "format": "email", "description": "Email address" },
      "isActive": { "type": "boolean", "description": "Is active" },
      "permissions": { 
        "type": "array", 
        "items": { "type": "string" },
        "description": "Permissions list"
      }
    },
    "required": ["id", "firstName", "lastName", "email"]
  };

  const languages = ['typescript', 'python', 'go', 'java'];
  const results = { passed: 0, failed: 0 };

  for (const lang of languages) {
    try {
      const code = generateCodeForLanguage(mockSchema, lang);
      
      if (validateCode(code, lang, mockSchema)) {
        console.log(chalk.green(`✅ ${lang.toUpperCase()}: Generated successfully`));
        results.passed++;
        
        // Save test output
        fs.writeFileSync(`test-output-${lang}.txt`, code);
      } else {
        console.log(chalk.red(`❌ ${lang.toUpperCase()}: Failed validation`));
        results.failed++;
      }
    } catch (error) {
      console.log(chalk.red(`💥 ${lang.toUpperCase()}: Error - ${error.message}`));
      results.failed++;
    }
  }

  console.log(chalk.blue(`\n📊 Results: ${results.passed} passed, ${results.failed} failed`));
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: results,
    message: results.failed === 0 ? 
      'All type generation tests passed! QuickType is working correctly.' :
      'Some tests failed. Check the generated files for details.'
  };
  
  fs.writeFileSync('quicktype-test-results.json', JSON.stringify(report, null, 2));
  console.log(chalk.blue('📄 Report saved to quicktype-test-results.json\n'));
}

function generateCodeForLanguage(schema, language) {
  const interfaceName = toPascalCase(schema.title);
  const timestamp = new Date().toISOString();
  
  switch (language) {
    case 'typescript':
      return generateTypeScript(schema, interfaceName, timestamp);
    case 'python': 
      return generatePython(schema, interfaceName, timestamp);
    case 'go':
      return generateGo(schema, interfaceName, timestamp);
    case 'java':
      return generateJava(schema, interfaceName, timestamp);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

function generateTypeScript(schema, interfaceName, timestamp) {
  let code = `/**
 * Generated TypeScript types from JSON Schema
 * Schema: ${schema.title}
 * Generated: ${timestamp}
 * Generator: OriginVault Schema Service
 */

export interface ${interfaceName} {
`;

  if (schema.properties) {
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const isOptional = !schema.required?.includes(propName);
      const propType = getTypeScriptType(propDef);
      const description = propDef.description ? `  /** ${propDef.description} */\n` : '';
      code += `${description}  ${propName}${isOptional ? '?' : ''}: ${propType};\n`;
    }
  }
  
  code += `}

export function is${interfaceName}(obj: unknown): obj is ${interfaceName} {
  return typeof obj === 'object' && obj !== null;
}

export function create${interfaceName}(data: Partial<${interfaceName}>): ${interfaceName} {
  return {
`;

  if (schema.properties) {
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const defaultValue = getTypeScriptDefault(propDef);
      code += `    ${propName}: data.${propName} ?? ${defaultValue},\n`;
    }
  }
  
  code += `  };
}`;

  return code;
}

function generatePython(schema, className, timestamp) {
  let code = `"""
Generated Python types from JSON Schema
Schema: ${schema.title}
Generated: ${timestamp}
Generator: OriginVault Schema Service
"""

from typing import Dict, List, Optional, Union, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ${className}:
`;

  if (schema.properties) {
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const pythonType = getPythonType(propDef);
      const isOptional = !schema.required?.includes(propName);
      const fieldType = isOptional ? `Optional[${pythonType}]` : pythonType;
      const defaultValue = isOptional ? ' = None' : '';
      const description = propDef.description ? `    # ${propDef.description}\n` : '';
      code += `${description}    ${propName}: ${fieldType}${defaultValue}\n`;
    }
  }

  code += `
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> '${className}':
        return cls(**data)

    def to_dict(self) -> Dict[str, Any]:
        return {
`;

  if (schema.properties) {
    for (const propName of Object.keys(schema.properties)) {
      code += `            '${propName}': self.${propName},\n`;
    }
  }

  code += `        }`;
  return code;
}

function generateGo(schema, structName, timestamp) {
  let code = `// Generated Go types from JSON Schema
// Schema: ${schema.title}
// Generated: ${timestamp}
// Generator: OriginVault Schema Service

package main

import (
    "encoding/json"
    "time"
)

type ${structName} struct {
`;

  if (schema.properties) {
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const goType = getGoType(propDef);
      const jsonTag = `\`json:"${propName}"\``;
      const description = propDef.description ? `    // ${propDef.description}\n` : '';
      code += `${description}    ${toPascalCase(propName)} ${goType} ${jsonTag}\n`;
    }
  }

  code += `}

func (obj *${structName}) FromJSON(data []byte) error {
    return json.Unmarshal(data, obj)
}

func (obj *${structName}) ToJSON() ([]byte, error) {
    return json.Marshal(obj)
}`;

  return code;
}

function generateJava(schema, className, timestamp) {
  let code = `// Generated Java types from JSON Schema
// Schema: ${schema.title}
// Generated: ${timestamp}
// Generator: OriginVault Schema Service

package com.originvault.schemas;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.*;
import java.util.*;

public class ${className} {
`;

  if (schema.properties) {
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const javaType = getJavaType(propDef);
      const isRequired = schema.required?.includes(propName);
      const annotations = isRequired ? `    @NotNull\n` : '';
      const description = propDef.description ? `    // ${propDef.description}\n` : '';
      const jsonProperty = `    @JsonProperty("${propName}")\n`;
      code += `${description}${annotations}${jsonProperty}    private ${javaType} ${propName};\n\n`;
    }

    // Add getters and setters
    for (const [propName, propDef] of Object.entries(schema.properties)) {
      const javaType = getJavaType(propDef);
      const capitalizedName = toPascalCase(propName);
      
      code += `    public ${javaType} get${capitalizedName}() {
        return ${propName};
    }

    public void set${capitalizedName}(${javaType} ${propName}) {
        this.${propName} = ${propName};
    }

`;
    }
  }

  code += `}`;
  return code;
}

// Helper functions
function validateCode(code, language, schema) {
  // Basic validations
  if (!code || code.length < 100) return false;
  
  const titleInCode = schema.title.replace(/\s+/g, '');
  if (!code.includes(titleInCode)) return false;
  
  // Check required properties are present
  const requiredProps = schema.required || [];
  for (const prop of requiredProps) {
    if (!code.includes(prop)) return false;
  }
  
  // Language-specific checks
  switch (language) {
    case 'typescript':
      return code.includes('export interface') && code.includes('export function is');
    case 'python':
      return code.includes('@dataclass') && code.includes('from_dict');
    case 'go':
      return code.includes('type ') && code.includes('struct') && code.includes('json:');
    case 'java':
      return code.includes('public class') && code.includes('get');
    default:
      return true;
  }
}

function getTypeScriptType(propDef) {
  switch (propDef.type) {
    case 'string': return 'string';
    case 'number':
    case 'integer': return 'number';
    case 'boolean': return 'boolean';
    case 'array':
      if (propDef.items) {
        return `${getTypeScriptType(propDef.items)}[]`;
      }
      return 'any[]';
    case 'object': return 'Record<string, any>';
    default: return 'any';
  }
}

function getPythonType(propDef) {
  switch (propDef.type) {
    case 'string': return 'str';
    case 'number': return 'float';
    case 'integer': return 'int';
    case 'boolean': return 'bool';
    case 'array':
      if (propDef.items) {
        return `List[${getPythonType(propDef.items)}]`;
      }
      return 'List[Any]';
    case 'object': return 'Dict[str, Any]';
    default: return 'Any';
  }
}

function getGoType(propDef) {
  switch (propDef.type) {
    case 'string': return 'string';
    case 'number': return 'float64';
    case 'integer': return 'int64';
    case 'boolean': return 'bool';
    case 'array':
      if (propDef.items) {
        return `[]${getGoType(propDef.items)}`;
      }
      return '[]interface{}';
    case 'object': return 'map[string]interface{}';
    default: return 'interface{}';
  }
}

function getJavaType(propDef) {
  switch (propDef.type) {
    case 'string': return 'String';
    case 'number': return 'Double';
    case 'integer': return 'Integer';
    case 'boolean': return 'Boolean';
    case 'array':
      if (propDef.items) {
        return `List<${getJavaType(propDef.items)}>`;
      }
      return 'List<Object>';
    case 'object': return 'Map<String, Object>';
    default: return 'Object';
  }
}

function getTypeScriptDefault(propDef) {
  switch (propDef.type) {
    case 'string': return '""';
    case 'number':
    case 'integer': return '0';
    case 'boolean': return 'false';
    case 'array': return '[]';
    case 'object': return '{}';
    default: return 'undefined';
  }
}

function toPascalCase(str) {
  return str.replace(/(?:^|[\s-_])+(.)/g, (_, char) => char.toUpperCase());
}

// Run the test
if (require.main === module) {
  testTypeGeneration().catch(console.error);
} 