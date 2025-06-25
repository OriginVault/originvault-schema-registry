#!/usr/bin/env node
/**
 * QuickType Multi-Language Type Generation
 * Implements ADR 0087: QuickType Integration for Multi-Language Schema Types
 * Replaces json-schema-to-typescript with comprehensive multi-language support
 */

import * as fs from 'fs';
import * as path from 'path';
import { quicktype, InputData, jsonInputForTargetLanguage } from "quicktype-core";
import * as crypto from 'crypto';

interface LanguageConfig {
  language: string;
  packageName: string;
  outputDir: string;
  rendererOptions: Record<string, any>;
  packageTemplate?: string;
  validationHelpers?: boolean;
}

interface SchemaLayer {
  name: string;
  source: string;
  package: string;
  inheritsFrom?: string;
}

const LANGUAGE_CONFIGS: LanguageConfig[] = [
  {
    language: "typescript",
    packageName: "@originvault/types",
    outputDir: "generated/typescript",
    rendererOptions: {
      "just-types": false,
      "runtime-typecheck": true,
      "nice-property-names": true,
      "prefer-unions": true,
      "prefer-const-values": true
    },
    validationHelpers: true
  },
  {
    language: "python", 
    packageName: "originvault_types",
    outputDir: "generated/python",
    rendererOptions: {
      "python-version": "3.8",
      "just-types": false,
      "use-nice-names": true,
      "nice-property-names": true
    },
    validationHelpers: true
  },
  {
    language: "rust",
    packageName: "originvault-types", 
    outputDir: "generated/rust",
    rendererOptions: {
      "derive-debug": true,
      "derive-clone": true,
      "derive-partial-eq": true,
      "derive-serialize": true,
      "derive-deserialize": true,
      "visibility": "public"
    },
    validationHelpers: true
  },
  {
    language: "go",
    packageName: "originvault-types",
    outputDir: "generated/go",
    rendererOptions: {
      "package": "originvault",
      "just-types": false,
      "nice-property-names": true
    },
    validationHelpers: false
  }
];

const SCHEMA_LAYERS: SchemaLayer[] = [
  {
    name: 'dif-schemas',
    source: 'https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main',
    package: '@openverifiable/dif-types'
  },
  {
    name: 'open-verifiable-schemas',
    source: '../open-verifiable-schema-registry/schemas',
    package: '@openverifiable/types'
  },
  {
    name: 'originvault-schemas',
    source: './drafts',
    package: '@originvault/types',
    inheritsFrom: '@openverifiable/types'
  }
];

async function loadSchemas(sourceDir: string): Promise<Map<string, any>> {
  const schemas = new Map<string, any>();
  
  if (sourceDir.startsWith('http')) {
    // TODO: Implement remote schema loading for DIF schemas
    console.log(`🌐 Remote schema loading not yet implemented for ${sourceDir}`);
    return schemas;
  }
  
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Source directory ${sourceDir} does not exist, skipping`);
    return schemas;
  }

  const files = fs.readdirSync(sourceDir).filter((f: string) => f.endsWith('.json'));
  
  for (const file of files) {
    const schemaPath = path.join(sourceDir, file);
    try {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const name = path.basename(file, '.json');
      schemas.set(name, schema);
    } catch (error) {
      console.error(`❌ Error loading schema ${file}:`, error);
    }
  }
  
  return schemas;
}

async function generateTypesForLanguage(
  config: LanguageConfig, 
  schemas: Map<string, any>,
  layerName: string
): Promise<void> {
  console.log(`🔨 Generating ${config.language} types for ${layerName}...`);
  
  if (schemas.size === 0) {
    console.log(`⚠️  No schemas found for ${layerName}, skipping ${config.language}`);
    return;
  }

  // Ensure output directory exists
  const outputPath = path.join(__dirname, '..', config.outputDir);
  fs.mkdirSync(outputPath, { recursive: true });

  try {
    // Create input data for QuickType
    const inputData = new InputData();
    
    for (const [name, schema] of schemas) {
      const input = jsonInputForTargetLanguage(config.language as any);
      await input.addSource({
        name,
        uris: [`${name}.schema.json`],
        schema: JSON.stringify(schema)
      });
      inputData.addInput(input);
    }

    // Generate types with QuickType
    const result = await quicktype({
      inputData,
      lang: config.language as any,
      rendererOptions: config.rendererOptions,
      leadingComments: [`Generated from ${layerName} schemas`, `Package: ${config.packageName}`, `DO NOT EDIT MANUALLY - regenerate with npm run generate-types`],
      outputFilename: `types.${getFileExtension(config.language)}`
    });

    // Write generated types
    const typeFile = path.join(outputPath, `types.${getFileExtension(config.language)}`);
    fs.writeFileSync(typeFile, result.lines.join('\n'));

    // Generate validation helpers if supported
    if (config.validationHelpers) {
      await generateValidationHelpers(config, schemas, outputPath);
    }

    // Generate package metadata
    await generatePackageMetadata(config, outputPath, layerName);

    console.log(`✅ Generated ${config.language} types: ${typeFile}`);
  } catch (error) {
    console.error(`❌ Error generating ${config.language} types:`, error);
  }
}

async function generateValidationHelpers(
  config: LanguageConfig,
  schemas: Map<string, any>,
  outputPath: string
): Promise<void> {
  if (config.language === 'typescript') {
    const validationContent = `/**
 * Runtime validation helpers for ${config.packageName}
 * Generated validation functions for type-safe runtime checking
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Schema registry
export const SCHEMAS = {
${Array.from(schemas.entries()).map(([name, schema]) => 
  `  "${name}": ${JSON.stringify(schema, null, 4)}`
).join(',\n')}
} as const;

// Hash registry for BFF integration
export const SCHEMA_HASHES = {
${Array.from(schemas.entries()).map(([name, schema]) => 
  `  "${name}": "${generateSchemaHash(schema)}"`
).join(',\n')}
} as const;

// Validation functions
${Array.from(schemas.keys()).map(name => {
  const typeName = name.charAt(0).toUpperCase() + name.slice(1);
  return `export function validate${typeName}(data: any): data is ${typeName} {
  const validate = ajv.compile(SCHEMAS["${name}"]);
  return validate(data) as boolean;
}

export function assert${typeName}(data: any): asserts data is ${typeName} {
  if (!validate${typeName}(data)) {
    throw new Error(\`Invalid ${typeName} data: \${JSON.stringify(ajv.errors)}\`);
  }
}`;
}).join('\n\n')}

export type SchemaName = keyof typeof SCHEMAS;
export type SchemaType<T extends SchemaName> = T extends "${Array.from(schemas.keys())[0]}" ? ${Array.from(schemas.keys()).map(name => name.charAt(0).toUpperCase() + name.slice(1))[0]} : never;
`;

    fs.writeFileSync(path.join(outputPath, 'validation.ts'), validationContent);
  }

  if (config.language === 'python') {
    const validationContent = `"""
Runtime validation helpers for ${config.packageName}
Generated validation functions for type-safe runtime checking
"""

import json
from typing import Any, Dict, Type, TypeVar
from jsonschema import validate, ValidationError
from .types import *

T = TypeVar('T')

# Schema registry
SCHEMAS = {
${Array.from(schemas.entries()).map(([name, schema]) => 
  `    "${name}": ${JSON.stringify(schema, null, 4).replace(/"/g, '"')}`
).join(',\n')}
}

def validate_schema(data: Any, schema_name: str) -> bool:
    """Validate data against named schema"""
    try:
        validate(data, SCHEMAS[schema_name])
        return True
    except (ValidationError, KeyError):
        return False

${Array.from(schemas.keys()).map(name => {
  const className = name.split(/[-_]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  return `def validate_${name.toLowerCase()}(data: Dict[str, Any]) -> bool:
    """Validate ${className} data"""
    return validate_schema(data, "${name}")`;
}).join('\n\n')}
`;

    fs.writeFileSync(path.join(outputPath, 'validation.py'), validationContent);
  }

  if (config.language === 'rust') {
    const validationContent = `//! Runtime validation helpers for ${config.packageName}
//! Generated validation functions for type-safe runtime checking

use serde_json::Value;
use jsonschema::{JSONSchema, ValidationError};
use std::collections::HashMap;
use lazy_static::lazy_static;

lazy_static! {
    static ref SCHEMAS: HashMap<&'static str, JSONSchema> = {
        let mut m = HashMap::new();
${Array.from(schemas.entries()).map(([name, schema]) => 
  `        let schema_${name} = serde_json::from_str(r#"${JSON.stringify(schema).replace(/"/g, '\\"')}"#).unwrap();
        m.insert("${name}", JSONSchema::compile(&schema_${name}).unwrap());`
).join('\n')}
        m
    };
}

pub fn validate_schema(data: &Value, schema_name: &str) -> Result<(), ValidationError<'_>> {
    if let Some(schema) = SCHEMAS.get(schema_name) {
        schema.validate(data).map_err(|errors| errors.into_iter().next().unwrap())
    } else {
        Err(ValidationError::format_error("Unknown schema"))
    }
}

${Array.from(schemas.keys()).map(name => {
  const struct_name = name.split(/[-_]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  return `pub fn validate_${name.toLowerCase()}(data: &Value) -> bool {
    validate_schema(data, "${name}").is_ok()
}`;
}).join('\n\n')}
`;

    fs.writeFileSync(path.join(outputPath, 'validation.rs'), validationContent);
  }
}

async function generatePackageMetadata(
  config: LanguageConfig,
  outputPath: string,
  layerName: string
): Promise<void> {
  if (config.language === 'typescript') {
    const packageJson = {
      name: config.packageName,
      version: "1.0.0",
      description: `Generated TypeScript types for ${layerName}`,
      main: "index.js",
      types: "index.d.ts",
      scripts: {
        build: "tsc",
        test: "jest"
      },
      dependencies: {
        ajv: "^8.12.0",
        "ajv-formats": "^2.1.1"
      },
      devDependencies: {
        typescript: "^5.0.0",
        "@types/node": "^20.0.0",
        jest: "^29.0.0"
      }
    };

    fs.writeFileSync(path.join(outputPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    const indexTs = `export * from './types';
export * from './validation';
export * from './bff-integration';
`;
    
    fs.writeFileSync(path.join(outputPath, 'index.ts'), indexTs);
  }

  if (config.language === 'python') {
    const setupPy = `from setuptools import setup, find_packages

setup(
    name="${config.packageName}",
    version="1.0.0",
    description="Generated Python types for ${layerName}",
    packages=find_packages(),
    install_requires=[
        "jsonschema>=4.17.0",
        "typing-extensions>=4.0.0"
    ],
    python_requires=">=3.8"
)
`;

    fs.writeFileSync(path.join(outputPath, 'setup.py'), setupPy);

    const initPy = `from .types import *
from .validation import *

__version__ = "1.0.0"
`;

    fs.writeFileSync(path.join(outputPath, '__init__.py'), initPy);
  }

  if (config.language === 'rust') {
    const cargoToml = `[package]
name = "${config.packageName}"
version = "1.0.0"
edition = "2021"
description = "Generated Rust types for ${layerName}"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
jsonschema = "0.17"
lazy_static = "1.4"
`;

    fs.writeFileSync(path.join(outputPath, 'Cargo.toml'), cargoToml);

    const libRs = `pub mod types;
pub mod validation;

pub use types::*;
pub use validation::*;
`;

    fs.writeFileSync(path.join(outputPath, 'lib.rs'), libRs);
  }
}

function generateSchemaHash(schema: any): string {
  const normalizedSchema = JSON.stringify(schema, Object.keys(schema).sort());
  return crypto.createHash('sha256').update(normalizedSchema).digest('hex').substring(0, 16);
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    typescript: 'ts',
    python: 'py',
    rust: 'rs',
    go: 'go',
    csharp: 'cs',
    java: 'java'
  };
  return extensions[language] || 'txt';
}

async function generateBFFIntegration(schemas: Map<string, any>): Promise<void> {
  console.log('🔗 Generating BFF integration helpers...');
  
  const bffIntegrationContent = `/**
 * OriginVault BFF Integration Helpers
 * Enhanced integration with ov-creator-BFF-vault-agent
 * Supports multi-root trust architecture and QuickType validation
 */

import { SCHEMAS, SCHEMA_HASHES, SchemaName } from './validation';

// Trust Registry specific schemas mapping
export const TRUST_REGISTRY_SCHEMAS: Record<string, SchemaName> = {
  trustedIssuer: 'TrustedIssuer',
  rootAuthority: 'RootAuthority', 
  namespaceDeclaration: 'NamespaceDeclaration',
  trustChainDelegation: 'TrustChainDelegation',
  admin: 'Admin',
  vaultDeclaration: 'VaultDeclaration',
  userProfile: 'UserProfile',
  didProgression: 'DIDProgression'
};

// Plugin System schemas (ADR 0065)
export const PLUGIN_SYSTEM_SCHEMAS: Record<string, SchemaName> = {
  pluginManifest: 'PluginManifest',
  developerEndorsement: 'DeveloperEndorsementVC',
  pluginInstallation: 'PluginInstallation'
};

// Application Development schemas (ADR 0070)
export const APPLICATION_SCHEMAS: Record<string, SchemaName> = {
  applicationVault: 'ApplicationVault',
  serviceConnection: 'ServiceConnection',
  tauriManifest: 'TauriManifest'
};

export interface BFFTrustRegistryRecord {
  schemaHash: string;
  recordId: string;
  data: any;
  metadata?: {
    schemaName: SchemaName;
    createdBy: string;
    createdAt: string;
    lastModified?: string;
  };
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

// Multi-root namespace support
export interface NamespaceContext {
  rootDID: string;
  namespaceType: 'content-authenticity' | 'identity' | 'marketplace' | 'custom';
  governanceModel: 'dao' | 'centralized' | 'federated';
  trustLevel: 'verified' | 'community' | 'experimental';
}

export function createNamespaceRecord(
  namespace: NamespaceContext,
  recordData: any,
  schemaName: SchemaName
): BFFTrustRegistryRecord {
  return createTrustRegistryRecord(
    schemaName,
    \`\${namespace.rootDID}:\${recordData.id || crypto.randomUUID()}\`,
    {
      ...recordData,
      namespace: namespace.rootDID,
      trustContext: {
        namespaceType: namespace.namespaceType,
        governanceModel: namespace.governanceModel,
        trustLevel: namespace.trustLevel
      }
    },
    'system'
  );
}

// Export for BFF usage
export { SCHEMAS, SCHEMA_HASHES };
export type { SchemaName };
`;

  const outputPath = path.join(__dirname, '..', 'generated/typescript');
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, 'bff-integration.ts'), bffIntegrationContent);
}

async function main() {
  const args = process.argv.slice(2);
  const languageFilter = args.find(arg => arg.startsWith('--lang='))?.split('=')[1]?.split(',') || [];
  const layerFilter = args.find(arg => arg.startsWith('--layer='))?.split('=')[1] || 'originvault-schemas';

  console.log('🚀 Starting QuickType multi-language type generation...');
  console.log(`📋 Target languages: ${languageFilter.length ? languageFilter.join(', ') : 'all'}`);
  console.log(`🏗️  Target layer: ${layerFilter}`);

  // Find target schema layer
  const targetLayer = SCHEMA_LAYERS.find(layer => layer.name === layerFilter);
  if (!targetLayer) {
    console.error(`❌ Unknown schema layer: ${layerFilter}`);
    process.exit(1);
  }

  // Load schemas from target layer
  const schemas = await loadSchemas(targetLayer.source);
  console.log(`📚 Loaded ${schemas.size} schemas from ${targetLayer.source}`);

  if (schemas.size === 0) {
    console.log('⚠️  No schemas found, exiting');
    return;
  }

  // Filter languages if specified
  const targetLanguages = languageFilter.length > 0 
    ? LANGUAGE_CONFIGS.filter(config => languageFilter.includes(config.language))
    : LANGUAGE_CONFIGS;

  // Generate types for each target language
  for (const config of targetLanguages) {
    await generateTypesForLanguage(config, schemas, targetLayer.name);
  }

  // Generate BFF integration helpers for TypeScript
  if (targetLanguages.some(config => config.language === 'typescript')) {
    await generateBFFIntegration(schemas);
  }

  console.log('✅ QuickType generation complete!');
  console.log(`📦 Generated packages: ${targetLanguages.map(c => c.packageName).join(', ')}`);
}

if (require.main === module) {
  main().catch(console.error);
} 