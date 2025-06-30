#!/usr/bin/env node
/**
 * Export TypeScript types from OriginVault Schema Registry
 * Aligns with ADR 0008: Schema-Driven API Architecture
 */
declare function exportSchemaTypes(): Promise<void>;
declare function generateSchemaHash(schema: any): string;
export { exportSchemaTypes, generateSchemaHash };
