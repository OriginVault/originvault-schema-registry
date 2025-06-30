import SchemaValidationFramework, { JSONSchema } from './validation-framework';

const framework = new SchemaValidationFramework();

async function runTests() {
  let passed = 0, failed = 0;

  // Test 1: validateW3CCredential detects missing required VC properties
  const schema1: JSONSchema = {
    title: 'TestCredential',
    required: ['@context', 'type', 'issuer'],
    properties: {
      '@context': { type: 'array' },
      type: { type: 'string' },
      issuer: { type: 'string' },
      credentialSubject: { type: 'object' }
    }
  };
  const result1 = await framework.validateW3CCredential(schema1, 'TestCredential.json');
  if (!result1.valid && result1.errors?.includes('Missing required W3C VC property: credentialSubject')) {
    console.log('Test 1 passed');
    passed++;
  } else {
    console.error('Test 1 failed', result1);
    failed++;
  }

  // Test 2: validateSchemaOrgCompliance suggests missing Schema.org context
  const schema2: JSONSchema = { properties: {} };
  const result2 = await framework.validateSchemaOrgCompliance(schema2, 'Test.json');
  if (result2.suggestions?.includes('Consider adding Schema.org context for better interoperability')) {
    console.log('Test 2 passed');
    passed++;
  } else {
    console.error('Test 2 failed', result2);
    failed++;
  }

  // Test 3: validateCrossRegistryCompatibility detects missing $id and $schema
  const schema3: JSONSchema = {};
  const result3 = await framework.validateCrossRegistryCompatibility(schema3, 'Test.json');
  if (result3.errors?.includes('Missing $id - required for cross-registry resolution') && result3.warnings?.includes('Missing $schema - recommend JSON Schema Draft 2020-12')) {
    console.log('Test 3 passed');
    passed++;
  } else {
    console.error('Test 3 failed', result3);
    failed++;
  }

  // Test 4: validateProductionReadiness checks for required fields
  const schema4: JSONSchema = {
    $id: 'https://schemas.originvault.box/test/v1',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Test',
    description: 'A test schema',
    version: '1.0.0',
    properties: {},
    required: [],
    examples: []
  };
  const result4 = await framework.validateProductionReadiness(schema4, 'Test.json');
  if (result4.valid && result4.productionReady) {
    console.log('Test 4 passed');
    passed++;
  } else {
    console.error('Test 4 failed', result4);
    failed++;
  }

  console.log(`\nTest summary: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

if (require.main === module) {
  runTests();
} 