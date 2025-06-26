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
  private cache: Map<string, QuickTypeResult> = new Map()

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
        console.log('Loaded schema registry from GitHub:', registry)
        return registry
      } else {
        console.warn('Failed to load from GitHub, using fallback registry')
        return this.getActualRegistry()
      }
    } catch (error) {
      console.error('Error loading schemas from GitHub:', error)
      console.log('Using fallback registry')
      return this.getActualRegistry()
    }
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
      // For now, use fallback code since QuickType browser integration needs more setup
      // TODO: Implement proper QuickType browser integration
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