/**
 * BFF Integration Helpers
 * Supports ov-creator-BFF-vault-agent integration
 */
import { SchemaName } from './registry';
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
    metadata?: {
        schemaName?: string;
        createdBy: string;
        createdAt: string;
    };
    blockchainSync?: {
        lastSynced?: Date;
        pendingChanges: boolean;
        blockchainResourceId?: string;
        syncError?: string;
    };
}
export declare const TRUST_REGISTRY_SCHEMAS: Record<string, SchemaName>;
export declare function createTrustRegistryRecord(schemaName: SchemaName, recordId: string, data: any, createdBy: string): BFFTrustRegistryRecord;
export declare function isMultiRootEnabled(data: any): boolean;
export declare function getRecordId(schemaName: SchemaName, data: any): string;
//# sourceMappingURL=bff-integration.d.ts.map