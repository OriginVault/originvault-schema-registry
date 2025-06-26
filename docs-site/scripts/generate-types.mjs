#!/usr/bin/env node

/**
 * Build-time script to generate TypeScript types from JSON Schema
 * This script runs during the build process to generate real types
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { quicktype, InputData, JSONSchemaInput, FetchingJSONSchemaStore } from 'quicktype-core';

// Handle ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypes() {
  try {
    console.log('🚀 Generating TypeScript types from OriginVaultRootAuthority schema...');
    
    // Read the schema file
    const schemaPath = path.resolve(__dirname, '../../schemas/v1/identity/OriginVaultRootAuthority.schema.json');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);
    
    console.log('📖 Schema loaded successfully');
    
    // Set up QuickType
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    await schemaInput.addSource({
      name: 'OriginVaultRootAuthority',
      schema: schemaContent
    });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    // Generate TypeScript types
    const result = await quicktype({
      inputData,
      lang: 'typescript',
      rendererOptions: {
        'just-types': true,
        'nice-property-names': true,
        'declare-unions': true,
        'prefer-unions': true,
        'strict-optional': true,
        'acronym-style': 'camel',
        'converters': 'top-level',
        'runtime-typecheck': false
      }
    });

    // Generate the complete TypeScript file
    const generatedTypes = result.lines.join('\n')
      // Fix Date type issues - use string for date-time format
      .replace(/issuanceDate:\s+Date;/g, 'issuanceDate: string;');
    
    // Extract example from schema
    const example = schema.examples?.[0];
    let exampleCode = '';
    if (example) {
      // Fix property names to match TypeScript interface
      const fixedExample = { ...example };
      if (fixedExample['@context']) {
        fixedExample.context = fixedExample['@context'];
        delete fixedExample['@context'];
      }
      exampleCode = `\n// Example from schema:\nexport const OriginVaultRootAuthorityExample: OriginVaultRootAuthority = ${JSON.stringify(fixedExample, null, 2)};`;
    }

    // Create utility functions
    const utilityFunctions = `
// Utility functions
export function isOriginVaultRootAuthority(data: unknown): data is OriginVaultRootAuthority {
  return typeof data === 'object' && 
         data !== null && 
         typeof (data as any).id === 'string' &&
         typeof (data as any).issuer === 'object' &&
         typeof (data as any).credentialSubject === 'object';
}

export function validateOriginVaultRootAuthority(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!isOriginVaultRootAuthority(data)) {
    errors.push('Invalid OriginVaultRootAuthority structure');
    return { valid: false, errors };
  }
  
  // Basic validation
  if (!data.id?.startsWith('did:')) {
    errors.push('Invalid DID format for id');
  }
  
  if (!data.issuer?.id?.startsWith('did:')) {
    errors.push('Invalid DID format for issuer.id');
  }
  
  if (!data.credentialSubject?.id?.startsWith('did:')) {
    errors.push('Invalid DID format for credentialSubject.id');
  }
  
  return { valid: errors.length === 0, errors };
}

export type OriginVaultRootAuthorityArray = OriginVaultRootAuthority[];
`;

    // Create the complete file content
    const fileContent = `/**
 * Generated TypeScript types for OriginVaultRootAuthority
 * Schema: https://schemas.originvault.box/v1/OriginVaultRootAuthority
 * 
 * DO NOT EDIT MANUALLY - this file is auto-generated
 * Generated on: ${new Date().toISOString()}
 * 
 * To regenerate, run: npm run generate-types
 */

${generatedTypes}${exampleCode}${utilityFunctions}`;

    // Write the generated types to the file
    const outputPath = path.resolve(__dirname, '../src/types/OriginVaultRootAuthority.ts');
    fs.writeFileSync(outputPath, fileContent);
    
    console.log('✅ Successfully generated TypeScript types');
    console.log(`📝 Types written to: ${outputPath}`);
    
    // Also update the types in the parent directory for consistency
    const parentTypesPath = path.resolve(__dirname, '../../types/OriginVaultRootAuthority.ts');
    fs.writeFileSync(parentTypesPath, fileContent);
    console.log(`📝 Types also written to: ${parentTypesPath}`);
    
  } catch (error) {
    console.error('❌ Error generating types:', error);
    process.exit(1);
  }
}

// Run the generation
generateTypes(); 