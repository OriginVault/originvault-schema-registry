/**
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
