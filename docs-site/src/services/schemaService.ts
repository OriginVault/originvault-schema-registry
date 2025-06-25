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
  categories: {
    [key: string]: SchemaCategory
  }
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
  private schemas: Schema[] = []
  private cache: Map<string, QuickTypeResult> = new Map()

  async loadSchemaRegistry(): Promise<SchemaRegistry> {
    if (this.schemaRegistry) {
      return this.schemaRegistry
    }

    try {
      const response = await fetch('/schemas/v1/index.json')
      if (!response.ok) {
        throw new Error(`Failed to load schema registry: ${response.statusText}`)
      }
      
      this.schemaRegistry = await response.json()
      return this.schemaRegistry!
    } catch (error) {
      console.error('Error loading schema registry:', error)
      // Fallback to mock data
      this.schemaRegistry = this.getMockRegistry()
      return this.schemaRegistry
    }
  }

  async loadSchemas(): Promise<Schema[]> {
    if (this.schemas.length > 0) {
      return this.schemas
    }

    const registry = await this.loadSchemaRegistry()
    const schemas: Schema[] = []

    for (const [categoryId, category] of Object.entries(registry.categories)) {
      for (const metadata of category.schemas) {
        try {
          const schemaContent = await this.loadSchemaFile(metadata.file)
          const schema: Schema = {
            id: metadata.name.toLowerCase().replace(/\s+/g, '-'),
            title: metadata.name,
            description: metadata.description,
            category: categoryId,
            content: schemaContent,
            metadata,
            examples: schemaContent.examples || []
          }
          schemas.push(schema)
        } catch (error) {
          console.warn(`Failed to load schema ${metadata.name}:`, error)
        }
      }
    }

    this.schemas = schemas
    return schemas
  }

  async loadSchemaFile(filePath: string): Promise<any> {
    try {
      const response = await fetch(`/schemas/v1/${filePath}`)
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
      // For now, return fallback code since QuickType integration needs more setup
      const code = this.getFallbackCode(schema, language)
      const quickTypeResult: QuickTypeResult = {
        code,
        language,
        schemaName: schema.title,
        timestamp: new Date().toISOString()
      }

      this.cache.set(cacheKey, quickTypeResult)
      return code
    } catch (error) {
      console.error(`Error generating QuickType code for ${schema.title}:`, error)
      return this.getFallbackCode(schema, language)
    }
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
    if (!this.schemaRegistry) {
      return []
    }

    return Object.entries(this.schemaRegistry.categories).map(([id, category]) => ({
      id,
      name: category.name,
      description: category.description,
      count: category.count
    }))
  }

  getLanguages(): { id: string; name: string }[] {
    return [
      { id: 'typescript', name: 'TypeScript' },
      { id: 'python', name: 'Python' },
      { id: 'go', name: 'Go' },
      { id: 'csharp', name: 'C#' },
      { id: 'java', name: 'Java' },
      { id: 'rust', name: 'Rust' }
    ]
  }

  private getMockRegistry(): SchemaRegistry {
    return {
      version: "1.0.0",
      lastUpdated: "2025-01-14T10:00:00Z",
      totalSchemas: 2,
      categories: {
        identity: {
          name: "Identity & Access Management",
          description: "Core identity and permission management schemas",
          count: 1,
          schemas: [
            {
              name: "PersonCredential",
              file: "identity/PersonCredential.schema.json",
              description: "Individual identity verification and management",
              quicktype: "quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang typescript",
              example: {
                issuer: "did:cheqd:mainnet:originvault",
                credentialSubject: {
                  id: "did:cheqd:mainnet:person-123",
                  givenName: "John",
                  familyName: "Doe",
                  email: "john.doe@example.com"
                }
              }
            }
          ]
        },
        business: {
          name: "Business Workflow Automation",
          description: "Complete business process automation schemas",
          count: 1,
          schemas: [
            {
              name: "ContractCredential",
              file: "business/ContractCredential.schema.json",
              description: "Legal contract execution and tracking",
              quicktype: "quicktype --src schemas/v1/business/ContractCredential.schema.json --lang typescript",
              example: {
                issuer: "did:cheqd:mainnet:originvault",
                credentialSubject: {
                  id: "did:cheqd:mainnet:contract-456",
                  contractType: "ContentCreation",
                  parties: ["did:cheqd:mainnet:acme-corp", "did:cheqd:mainnet:creator-789"],
                  terms: "Exclusive content creation agreement...",
                  compensation: {
                    amount: 5000,
                    currency: "USD",
                    paymentSchedule: "monthly"
                  }
                }
              }
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