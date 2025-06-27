#!/usr/bin/env node
/**
 * Schema Migration Tool
 * Migrates schemas from drafts to production with proper $id updates
 */

const fs = require('fs');
const path = require('path');

class SchemaMigrator {
  constructor() {
    this.draftsDir = 'drafts';
    this.productionDir = 'schemas/v1';
    this.migrationLog = [];
    this.errors = [];
  }

  async migrateAllSchemas() {
    console.log('🚀 Starting Schema Migration Process\n');
    
    if (!fs.existsSync(this.draftsDir)) {
      throw new Error('Drafts directory not found');
    }

    if (!fs.existsSync(this.productionDir)) {
      fs.mkdirSync(this.productionDir, { recursive: true });
    }

    const draftFiles = fs.readdirSync(this.draftsDir)
      .filter(f => f.endsWith('.json'));

    console.log(`📋 Found ${draftFiles.length} schemas in drafts/`);

    for (const file of draftFiles) {
      await this.migrateSchema(file);
    }

    this.generateMigrationReport();
    return this.migrationLog;
  }

  async migrateSchema(filename) {
    const draftPath = path.join(this.draftsDir, filename);
    const productionFilename = this.generateProductionFilename(filename);
    const productionPath = path.join(this.productionDir, productionFilename);

    try {
      console.log(`🔄 Migrating: ${filename} → ${productionFilename}`);

      const schema = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
      const migratedSchema = this.transformSchema(schema, filename);
      
      // Validate schema before writing
      const validation = this.validateSchema(migratedSchema);
      if (!validation.valid) {
        this.errors.push({
          file: filename,
          errors: validation.errors
        });
        console.log(`❌ Validation failed for ${filename}`);
        return;
      }

      fs.writeFileSync(productionPath, JSON.stringify(migratedSchema, null, 2));
      
      this.migrationLog.push({
        source: draftPath,
        destination: productionPath,
        originalId: schema.$id,
        newId: migratedSchema.$id,
        status: 'success'
      });

      console.log(`✅ Successfully migrated ${filename}`);

    } catch (error) {
      this.errors.push({
        file: filename,
        error: error.message
      });
      console.log(`❌ Failed to migrate ${filename}: ${error.message}`);
    }
  }

  generateProductionFilename(draftFilename) {
    // Convert draft filename to production format
    // Examples:
    // TrustedIssuer.json → TrustedIssuerCredential.schema.json
    // Admin.json → AdminCredential.schema.json
    
    const baseName = path.parse(draftFilename).name;
    
    // If it already ends with Credential, just add .schema.json
    if (baseName.endsWith('Credential')) {
      return `${baseName}.schema.json`;
    }
    
    // Special cases
    if (baseName === 'PackageJson') {
      return 'PackageManifest.schema.json';
    }
    
    if (baseName === 'TsconfigJson') {
      return 'TypeScriptConfig.schema.json';
    }

    // For most schemas, add Credential suffix if they don't have one
    if (this.isCredentialSchema(baseName)) {
      return `${baseName}Credential.schema.json`;
    }
    
    // For other schemas, just add .schema.json
    return `${baseName}.schema.json`;
  }

  isCredentialSchema(baseName) {
    const credentialIndicators = [
      'Admin', 'Creator', 'Developer', 'Owner', 'Verifier',
      'TrustedIssuer', 'CommunityMember', 'VaultOperator'
    ];
    
    return credentialIndicators.includes(baseName);
  }

  transformSchema(schema, filename) {
    const transformed = { ...schema };
    
    // Update $schema to latest draft
    transformed.$schema = 'https://json-schema.org/draft/2020-12/schema';
    
    // Generate production $id
    const baseName = this.generateProductionFilename(filename);
    transformed.$id = `https://schemas.originvault.box/v1/${baseName}`;
    
    // Ensure required W3C VC properties if this is a credential
    if (baseName.includes('Credential')) {
      this.ensureCredentialStructure(transformed);
    }
    
    // Update any internal $ref references
    this.updateInternalReferences(transformed);
    
    // Add metadata if missing
    if (!transformed.title) {
      transformed.title = this.generateTitle(baseName);
    }
    
    if (!transformed.description) {
      transformed.description = `Schema for ${transformed.title}`;
    }
    
    return transformed;
  }

  ensureCredentialStructure(schema) {
    // Ensure W3C VC required structure
    if (!schema['@context']) {
      schema['@context'] = [
        'https://www.w3.org/2018/credentials/v1',
        'https://schemas.originvault.box/contexts/trust-chain-core.jsonld'
      ];
    }
    
    const requiredVCFields = ['@context', 'type', 'credentialSubject', 'issuer', 'issuanceDate'];
    
    if (!schema.required) {
      schema.required = [];
    }
    
    requiredVCFields.forEach(field => {
      if (!schema.required.includes(field)) {
        schema.required.push(field);
      }
    });

    // Ensure properties exist for required fields
    if (!schema.properties) {
      schema.properties = {};
    }

    if (!schema.properties['@context']) {
      schema.properties['@context'] = {
        type: 'array',
        items: { type: 'string' },
        description: 'JSON-LD context for the credential'
      };
    }

    if (!schema.properties.type) {
      schema.properties.type = {
        type: 'array',
        items: { type: 'string' },
        description: 'Credential type array'
      };
    }

    if (!schema.properties.credentialSubject) {
      schema.properties.credentialSubject = {
        type: 'object',
        description: 'The subject of the credential'
      };
    }

    if (!schema.properties.issuer) {
      schema.properties.issuer = {
        type: 'string',
        format: 'uri',
        pattern: '^did:',
        description: 'DID of the credential issuer'
      };
    }

    if (!schema.properties.issuanceDate) {
      schema.properties.issuanceDate = {
        type: 'string',
        format: 'date-time',
        description: 'Date when the credential was issued'
      };
    }

    // Add optional common VC fields
    if (!schema.properties.proof) {
      schema.properties.proof = {
        type: 'object',
        description: 'Cryptographic proof of the credential'
      };
    }

    if (!schema.properties.credentialStatus) {
      schema.properties.credentialStatus = {
        type: 'object',
        description: 'Status information for credential revocation'
      };
    }
  }

  updateInternalReferences(schema) {
    const schemaStr = JSON.stringify(schema);
    const updatedStr = schemaStr.replace(
      /localhost:8080\/schemas/g,
      'https://schemas.originvault.box'
    );
    return JSON.parse(updatedStr);
  }

  generateTitle(filename) {
    const baseName = path.parse(filename).name;
    return baseName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  validateSchema(schema) {
    const errors = [];
    
    // Basic validation
    if (!schema.$schema) {
      errors.push('Missing $schema property');
    }
    
    if (!schema.$id) {
      errors.push('Missing $id property');
    }
    
    if (!schema.title) {
      errors.push('Missing title property');
    }
    
    if (!schema.type) {
      errors.push('Missing type property');
    }

    // W3C VC validation for credentials
    if (schema.$id && schema.$id.includes('Credential')) {
      if (!schema['@context']) {
        errors.push('Credential missing @context');
      }
      
      if (!schema.required || !schema.required.includes('credentialSubject')) {
        errors.push('Credential missing required credentialSubject');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  generateMigrationReport() {
    console.log('\n📊 MIGRATION REPORT');
    console.log('=' .repeat(50));
    
    const successful = this.migrationLog.filter(m => m.status === 'success').length;
    const failed = this.errors.length;
    
    console.log(`✅ Successful migrations: ${successful}`);
    console.log(`❌ Failed migrations: ${failed}`);
    console.log(`📊 Total processed: ${successful + failed}`);
    
    if (this.errors.length > 0) {
      console.log('\n🚨 MIGRATION ERRORS:');
      this.errors.forEach(error => {
        console.log(`   ${error.file}: ${error.error || error.errors?.join(', ')}`);
      });
    }
    
    console.log('\n✨ Migration Summary:');
    this.migrationLog.forEach(log => {
      console.log(`   ${path.basename(log.source)} → ${path.basename(log.destination)}`);
    });
  }
}

// Run migration if called directly
if (require.main === module) {
  const migrator = new SchemaMigrator();
  migrator.migrateAllSchemas().catch(console.error);
}

module.exports = SchemaMigrator; 