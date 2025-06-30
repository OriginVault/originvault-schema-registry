import { SchemaMigrator } from './migrate-schemas';

async function runTests() {
  let passed = 0, failed = 0;

  // Test 1: Check if SchemaMigrator class can be instantiated
  try {
    const migrator = new SchemaMigrator();
    console.log('Test 1 passed: SchemaMigrator can be instantiated');
    passed++;
  } catch (error) {
    console.error('Test 1 failed: SchemaMigrator instantiation failed', error);
    failed++;
  }

  // Test 2: Check generateProductionFilename method
  try {
    const migrator = new SchemaMigrator();
    const result1 = migrator.generateProductionFilename('TrustedIssuer.json');
    if (result1 === 'TrustedIssuerCredential.schema.json') {
      console.log('Test 2 passed: generateProductionFilename works for credential schemas');
      passed++;
    } else {
      console.error('Test 2 failed: generateProductionFilename returned wrong result for TrustedIssuer.json');
      failed++;
    }
  } catch (error) {
    console.error('Test 2 failed: generateProductionFilename threw error', error);
    failed++;
  }

  // Test 3: Check generateProductionFilename for non-credential schemas
  try {
    const migrator = new SchemaMigrator();
    const result2 = migrator.generateProductionFilename('PackageJson.json');
    if (result2 === 'PackageManifest.schema.json') {
      console.log('Test 3 passed: generateProductionFilename works for special cases');
      passed++;
    } else {
      console.error('Test 3 failed: generateProductionFilename returned wrong result for PackageJson.json');
      failed++;
    }
  } catch (error) {
    console.error('Test 3 failed: generateProductionFilename threw error', error);
    failed++;
  }

  // Test 4: Check isCredentialSchema method
  try {
    const migrator = new SchemaMigrator();
    const isAdmin = migrator.isCredentialSchema('Admin');
    const isRandom = migrator.isCredentialSchema('RandomName');
    
    if (isAdmin === true && isRandom === false) {
      console.log('Test 4 passed: isCredentialSchema correctly identifies credential schemas');
      passed++;
    } else {
      console.error('Test 4 failed: isCredentialSchema returned wrong results');
      failed++;
    }
  } catch (error) {
    console.error('Test 4 failed: isCredentialSchema threw error', error);
    failed++;
  }

  // Test 5: Check generateTitle method
  try {
    const migrator = new SchemaMigrator();
    const title = migrator.generateTitle('TrustedIssuerCredential.schema.json');
    if (title === 'Trusted Issuer Credential') {
      console.log('Test 5 passed: generateTitle correctly formats titles');
      passed++;
    } else {
      console.error('Test 5 failed: generateTitle returned wrong result');
      failed++;
    }
  } catch (error) {
    console.error('Test 5 failed: generateTitle threw error', error);
    failed++;
  }

  // Test 6: Check validateSchema method with valid schema
  try {
    const migrator = new SchemaMigrator();
    const validSchema = {
      $id: 'https://schemas.originvault.box/v1/TestCredential.schema.json',
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Test Credential',
      type: 'object',
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      properties: {
        credentialSubject: { type: 'object' }
      }
    };
    
    const validation = migrator.validateSchema(validSchema);
    if (validation.valid === true && validation.errors.length === 0) {
      console.log('Test 6 passed: validateSchema correctly validates valid schemas');
      passed++;
    } else {
      console.error('Test 6 failed: validateSchema incorrectly rejected valid schema');
      failed++;
    }
  } catch (error) {
    console.error('Test 6 failed: validateSchema threw error', error);
    failed++;
  }

  // Test 7: Check validateSchema method with invalid schema
  try {
    const migrator = new SchemaMigrator();
    const invalidSchema = {
      // Missing required fields
    };
    
    const validation = migrator.validateSchema(invalidSchema);
    if (validation.valid === false && validation.errors.length > 0) {
      console.log('Test 7 passed: validateSchema correctly identifies invalid schemas');
      passed++;
    } else {
      console.error('Test 7 failed: validateSchema incorrectly accepted invalid schema');
      failed++;
    }
  } catch (error) {
    console.error('Test 7 failed: validateSchema threw error', error);
    failed++;
  }

  // Test 8: Check transformSchema method
  try {
    const migrator = new SchemaMigrator();
    const originalSchema = {
      title: 'Test Schema',
      type: 'object'
    };
    
    const transformed = migrator.transformSchema(originalSchema, 'TestCredential.json');
    
    if (transformed.$schema === 'https://json-schema.org/draft/2020-12/schema' &&
        transformed.$id?.startsWith('https://schemas.originvault.box/v1/') &&
        transformed.title === 'Test Schema') {
      console.log('Test 8 passed: transformSchema correctly transforms schemas');
      passed++;
    } else {
      console.error('Test 8 failed: transformSchema did not transform schema correctly');
      failed++;
    }
  } catch (error) {
    console.error('Test 8 failed: transformSchema threw error', error);
    failed++;
  }

  console.log(`\nTest summary: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

if (require.main === module) {
  runTests();
} 