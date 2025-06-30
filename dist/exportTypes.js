#!/usr/bin/env node
/**
 * Export TypeScript types from OriginVault Schema Registry
 * Aligns with ADR 0008: Schema-Driven API Architecture
 */
import fs from 'fs';
import path from 'path';
import { compile } from 'json-schema-to-typescript';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function exportSchemaTypes() {
    const draftsDir = path.join(__dirname, '..', 'drafts');
    const outputDir = path.join(__dirname, '..', 'types');
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const schemas = [];
    const files = fs.readdirSync(draftsDir).filter(f => f.endsWith('.json'));
    // Generate types for each schema
    for (const file of files) {
        const schemaPath = path.join(draftsDir, file);
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        const name = path.basename(file, '.json');
        const typeName = name.charAt(0).toUpperCase() + name.slice(1);
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
        }
        catch (error) {
            console.error(`❌ Error processing ${file}:`, error);
        }
    }
    // Generate index file with all exports
    const indexContent = `/**
 * OriginVault Schema Registry - Type Exports
 * Auto-generated from JSON schemas
 */

${schemas.map(s => `export * from './${s.name}';`).join('\n')}

// Re-export common interfaces
export interface SchemaMetadata {
  name: string;
  id: string;
  hash: string;
  version: string;
}

export interface MultiRootTrustContext {
  rootType: 'namespace' | 'platform' | 'user' | 'organization' | 'community' | 'concept';
  rootDID: string;
  delegationChain?: string[];
  governanceModel: 'self-governed' | 'dao' | 'committee' | 'consortium';
}
`;
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
    // Generate schema registry for BFF integration
    const registryContent = `/**
 * Schema Registry for BFF Integration
 * Aligns with ADR 0008: Schema-Driven API Architecture
 * Supports multi-root trust architecture
 */

export const SCHEMA_REGISTRY = {
${schemas.map(s => `  "${s.name}": ${JSON.stringify(s.schema, null, 4)}`).join(',\n')}
} as const;

export const SCHEMA_HASHES = {
${schemas.map(s => `  "${s.name}": "${generateSchemaHash(s.schema)}"`).join(',\n')}
} as const;

export const SCHEMA_METADATA = {
${schemas.map(s => `  "${s.name}": {
    name: "${s.name}",
    id: "${s.schema.$id || s.name}",
    hash: "${generateSchemaHash(s.schema)}",
    version: "1.0.0"
  }`).join(',\n')}
} as const;

export type SchemaName = keyof typeof SCHEMA_REGISTRY;
export type SchemaHash = typeof SCHEMA_HASHES[SchemaName];

// Helper functions for BFF integration
export function getSchemaByName(name: SchemaName) {
  return SCHEMA_REGISTRY[name];
}

export function getSchemaHash(name: SchemaName): string {
  return SCHEMA_HASHES[name];
}

export function validateSchemaHash(name: SchemaName, hash: string): boolean {
  return SCHEMA_HASHES[name] === hash;
}
`;
    fs.writeFileSync(path.join(outputDir, 'registry.ts'), registryContent);
    // Generate BFF integration helpers
    const bffIntegrationContent = `/**
 * BFF Integration Helpers
 * Supports ov-creator-BFF-vault-agent integration
 */

import { SCHEMA_REGISTRY, SCHEMA_HASHES, SchemaName } from './registry';

export interface BFFSchemaValidationConfig {
  schemaName: SchemaName;
  recordId: string;
  data: any;
  createdBy: string;
}

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

// Trust Registry specific helpers
export const TRUST_REGISTRY_SCHEMAS: Record<string, SchemaName> = {
  trustedIssuer: 'TrustedIssuer',
  rootAuthority: 'RootAuthority',
  namespaceDeclaration: 'NamespaceDeclaration',
  trustChainDelegation: 'TrustChainDelegation',
  admin: 'Admin'
};

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
        pendingChanges: true,
        lastSynced: undefined,
        blockchainResourceId: undefined,
        syncError: undefined
      }
    },
    metadata: {
      schemaName,
      createdBy,
      createdAt: new Date().toISOString()
    }
  };
}

export function isMultiRootEnabled(data: any): boolean {
  return data.rootType !== undefined || data.namespaceRoot !== undefined;
}
`;
    fs.writeFileSync(path.join(outputDir, 'bff-integration.ts'), bffIntegrationContent);
}
function generateSchemaHash(schema) {
    // Generate consistent hash for schema identification
    const normalizedSchema = JSON.stringify(schema, Object.keys(schema).sort());
    return crypto.createHash('sha256').update(normalizedSchema).digest('hex').substring(0, 16);
}
// ES module equivalent of require.main === module check
if (import.meta.url === `file://${process.argv[1]}`) {
    exportSchemaTypes().catch(console.error);
}
export { exportSchemaTypes, generateSchemaHash };
