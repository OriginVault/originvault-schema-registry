import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MigrationLog {
  source: string;
  destination: string;
  originalId?: string;
  newId: string;
  status: 'success' | 'error';
}

interface MigrationError {
  file: string;
  error?: string;
  errors?: string[];
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface JSONSchema {
  $id?: string;
  $schema?: string;
  title?: string;
  description?: string;
  type?: string;
  required?: string[];
  properties?: Record<string, any>;
  '@context'?: string[];
  [key: string]: any;
}

class SchemaMigrator {
  private draftsDir: string;
  private productionDir: string;
  private migrationLog: MigrationLog[];
  public errors: MigrationError[];

  constructor() {
    this.draftsDir = 'drafts';
    this.productionDir = 'schemas/v1';
    this.migrationLog = [];
    this.errors = [];
  }

  async migrateAllSchemas(): Promise<MigrationLog[]> {
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

  async migrateSchema(filename: string): Promise<void> {
    const draftPath = path.join(this.draftsDir, filename);
    const productionFilename = this.generateProductionFilename(filename);
    const productionPath = path.join(this.productionDir, productionFilename);

    try {
      console.log(`🔄 Migrating: ${filename} → ${productionFilename}`);

      const schema: JSONSchema = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
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
        newId: migratedSchema.$id!,
        status: 'success'
      });

      console.log(`✅ Successfully migrated ${filename}`);

    } catch (error: any) {
      this.errors.push({
        file: filename,
        error: error.message
      });
      console.log(`❌ Failed to migrate ${filename}: ${error.message}`);
    }
  }

  generateProductionFilename(draftFilename: string): string {
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

  isCredentialSchema(baseName: string): boolean {
    const credentialIndicators = [
      'Admin', 'Creator', 'Developer', 'Owner', 'Verifier',
      'TrustedIssuer', 'CommunityMember', 'VaultOperator'
    ];
    
    return credentialIndicators.includes(baseName);
  }

  transformSchema(schema: JSONSchema, filename: string): JSONSchema {
    const transformed: JSONSchema = { ...schema };
    
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

  ensureCredentialStructure(schema: JSONSchema): void {
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
      if (!schema.required!.includes(field)) {
        schema.required!.push(field);
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

  updateInternalReferences(schema: JSONSchema): void {
    // Update any $ref references to use the new production URLs
    const schemaStr = JSON.stringify(schema);
    const updatedStr = schemaStr.replace(
      /"#\/definitions\/([^"]+)"/g,
      '"https://schemas.originvault.box/v1/$1.schema.json"'
    );
    
    if (schemaStr !== updatedStr) {
      Object.assign(schema, JSON.parse(updatedStr));
    }
  }

  generateTitle(filename: string): string {
    // Convert filename to title case
    return filename
      .replace('.schema.json', '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  validateSchema(schema: JSONSchema): ValidationResult {
    const errors: string[] = [];
    
    // Basic validation
    if (!schema.$id) {
      errors.push('Missing $id field');
    }
    
    if (!schema.$schema) {
      errors.push('Missing $schema field');
    }
    
    if (!schema.title) {
      errors.push('Missing title field');
    }
    
    if (!schema.type) {
      errors.push('Missing type field');
    }
    
    // Validate $id format
    if (schema.$id && !schema.$id.startsWith('https://schemas.originvault.box/')) {
      errors.push('$id must start with https://schemas.originvault.box/');
    }
    
    // Validate credential structure if it's a credential
    if (schema.$id && schema.$id.includes('Credential')) {
      if (!schema['@context']) {
        errors.push('Credential schemas must have @context field');
      }
      
      if (!schema.properties || !schema.properties.credentialSubject) {
        errors.push('Credential schemas must have credentialSubject property');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  generateMigrationReport(): void {
    console.log('\n📊 Migration Report:');
    console.log(`   Successfully migrated: ${this.migrationLog.length} schemas`);
    console.log(`   Errors: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Migration Errors:');
      this.errors.forEach(error => {
        console.log(`   ${error.file}: ${error.error || error.errors?.join(', ')}`);
      });
    }
    
    if (this.migrationLog.length > 0) {
      console.log('\n✅ Successfully Migrated:');
      this.migrationLog.forEach(log => {
        console.log(`   ${path.basename(log.source)} → ${path.basename(log.destination)}`);
      });
    }
  }
}

async function main(): Promise<void> {
  try {
    const migrator = new SchemaMigrator();
    await migrator.migrateAllSchemas();
    
    if (migrator.errors.length > 0) {
      console.log('\n⚠️  Migration completed with errors');
      process.exit(1);
    } else {
      console.log('\n🎉 Migration completed successfully!');
    }
  } catch (error: any) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  }
}

export { SchemaMigrator, main }; 