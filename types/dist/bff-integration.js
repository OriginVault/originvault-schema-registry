"use strict";
/**
 * BFF Integration Helpers
 * Supports ov-creator-BFF-vault-agent integration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRUST_REGISTRY_SCHEMAS = void 0;
exports.createTrustRegistryRecord = createTrustRegistryRecord;
exports.isMultiRootEnabled = isMultiRootEnabled;
exports.getRecordId = getRecordId;
const registry_1 = require("./registry");
// Trust Registry specific helpers
exports.TRUST_REGISTRY_SCHEMAS = {
    trustedIssuer: 'TrustedIssuer',
    rootAuthority: 'RootAuthority',
    namespaceDeclaration: 'NamespaceDeclaration',
    trustChainDelegation: 'TrustChainDelegation',
    admin: 'Admin'
};
function createTrustRegistryRecord(schemaName, recordId, data, createdBy) {
    return {
        schemaHash: registry_1.SCHEMA_HASHES[schemaName],
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
function isMultiRootEnabled(data) {
    return data.rootType !== undefined || data.namespaceRoot !== undefined;
}
// Helper to get the correct ID property for different schema types
function getRecordId(schemaName, data) {
    switch (schemaName) {
        case 'NamespaceDeclaration':
            return data.id; // NamespaceDeclaration uses 'id'
        case 'TrustChainDelegation':
            return data.credentialSubject?.id || data.id; // TrustChainDelegation uses credentialSubject.id
        case 'TrustedIssuer':
            return data.credentialSubject?.id || data.id; // TrustedIssuer uses credentialSubject.id
        case 'Admin':
            return data.adminId; // Admin uses 'adminId'
        default:
            return data.id || data.did || recordId; // fallback
    }
}
//# sourceMappingURL=bff-integration.js.map