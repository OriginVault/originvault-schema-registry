#!/usr/bin/env node
/**
 * Export TypeScript types from OriginVault Schema Registry
 * Aligns with ADR 0008: Schema-Driven API Architecture
 */

import fs from 'fs';
import path from 'path';
import { compile } from 'json-schema-to-typescript';
import crypto from 'crypto';

interface SchemaExport {
  name: string;
  schema: any;
  typeName: string;
}

async function exportSchemaTypes() {
  const draftsDir = path.join(__dirname, 'drafts');
  const outputDir = path.join(__dirname, 'types');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const schemas: SchemaExport[] = [];
  const files = fs.readdirSync(draftsDir).filter(f => f.endsWith('.json'));

  console.log(`🔍 Found ${files.length} schema files in ${draftsDir}`);

  // Generate types for each schema
  for (const file of files) {
    const schemaPath = path.join(draftsDir, file);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const name = path.basename(file, '.json');
    const typeName = name.charAt(0).toUpperCase() + name.slice(1);

    console.log(`📝 Processing ${file} -> ${typeName}`);

    try {
      // Generate TypeScript interface
      const ts = await compile(schema, typeName, {
        bannerComment: `/**
 * Generated from ${file}
 * Schema: ${schema.$id || name}
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */`,
        additionalProperties: false,
        enableConstEnums: true,
        format: true,
        style: {
          printWidth: 100,
          useTabs: false,
          tabWidth: 2,
        }
      });

      // Write individual type file
      fs.writeFileSync(path.join(outputDir, `${name}.ts`), ts);
      
      schemas.push({ name, schema, typeName });
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
}

  // Generate BFF integration helpers
  const bffIntegrationContent = `/**
 * BFF Integration Helpers
 * Supports ov-creator-BFF-vault-agent integration
 */

export const SCHEMA_REGISTRY = {
${schemas.map(s => `  "${s.name}": ${JSON.stringify(s.schema, null, 4)}`).join(',\n')}
} as const;

export const SCHEMA_HASHES = {
${schemas.map(s => `  "${s.name}": "${generateSchemaHash(s.schema)}"`).join(',\n')}
} as const;

export type SchemaName = keyof typeof SCHEMA_REGISTRY;

// Trust Registry specific helpers
export const TRUST_REGISTRY_SCHEMAS: Record<string, SchemaName> = {
  trustedIssuer: 'TrustedIssuer',
  rootAuthority: 'RootAuthority', 
  namespaceDeclaration: 'NamespaceDeclaration',
  trustChainDelegation: 'TrustChainDelegation',
  admin: 'Admin'
};

export interface BFFTrustRegistryRecord {
  schemaHash: string;
  recordId: string;
  data: any;
  metadata?: any;
  blockchainSync?: {
    lastSynced?: Date;
    pendingChanges: boolean;
    blockchainResourceId?: string;
    syncError?: string;
  };
}

export function createTrustRegistryRecord(
  schemaName: SchemaName,
  recordId: string,
  data: any,
  createdBy: string
): BFFTrustRegistryRecord {
  return {
    schemaHash: SCHEMA_HASHES[schemaName],
    recordId,
    data: {
      ...data,
      blockchainSync: {
        pendingChanges: true
      }
    },
    metadata: {
      schemaName,
      createdBy,
      createdAt: new Date().toISOString()
    }
  };
}
`;

  fs.writeFileSync(path.join(outputDir, 'bff-integration.ts'), bffIntegrationContent);
  
  console.log(`✅ Exported ${schemas.length} schema types to ${outputDir}/`);
  console.log('🔗 Generated BFF integration helpers');
}

function generateSchemaHash(schema: any): string {
  const normalizedSchema = JSON.stringify(schema, Object.keys(schema).sort());
  return crypto.createHash('sha256').update(normalizedSchema).digest('hex').substring(0, 16);
        }

if (require.main === module) {
  exportSchemaTypes().catch(console.error);
}