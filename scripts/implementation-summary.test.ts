import { ImplementationSummary } from './implementation-summary';
import fs from 'fs';

// Mock fs module
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn()
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('ImplementationSummary', () => {
  let summary: ImplementationSummary;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    summary = new ImplementationSummary();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('reportSchemaStatistics calls countFiles with correct parameters', () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(['schema1.json', 'schema2.json', 'other.txt']);

    summary.generateSummary();

    expect(mockFs.existsSync).toHaveBeenCalledWith('drafts');
    expect(mockFs.existsSync).toHaveBeenCalledWith('schemas/v1');
    expect(mockFs.readdirSync).toHaveBeenCalledWith('drafts');
    expect(mockFs.readdirSync).toHaveBeenCalledWith('schemas/v1');
  });

  test('reportNewSchemas outputs all expected schemas', () => {
    summary.generateSummary();

    const output = consoleSpy.mock.calls.join('\n');
    expect(output).toContain('ContributorEndorsementCredential');
    expect(output).toContain('CarbonOffsetCredential');
    expect(output).toContain('VaultRoleCredential');
    expect(output).toContain('PluginManifest');
    expect(output).toContain('WorkflowDefinition');
  });

  test('reportInfrastructureImplementations outputs all expected components', () => {
    summary.generateSummary();

    const output = consoleSpy.mock.calls.join('\n');
    expect(output).toContain('Schema Migration Tool');
    expect(output).toContain('Enhanced Validation Framework');
    expect(output).toContain('Production Readiness Assessment');
  });

  test('reportValidationFrameworks outputs all expected frameworks', () => {
    summary.generateSummary();

    const output = consoleSpy.mock.calls.join('\n');
    expect(output).toContain('W3C Verifiable Credentials Validation');
    expect(output).toContain('Schema.org Compliance Assessment');
    expect(output).toContain('Cross-Registry Compatibility');
    expect(output).toContain('Production Readiness Validation');
  });

  test('reportProductionReadiness outputs all expected areas', () => {
    summary.generateSummary();

    const output = consoleSpy.mock.calls.join('\n');
    expect(output).toContain('Schema Development');
    expect(output).toContain('Validation Infrastructure');
    expect(output).toContain('Documentation');
    expect(output).toContain('Testing & Quality');
    expect(output).toContain('Deployment Pipeline');
  });

  test('reportNextSteps outputs all expected steps', () => {
    summary.generateSummary();

    const output = consoleSpy.mock.calls.join('\n');
    expect(output).toContain('Deploy to Production');
    expect(output).toContain('Integrate with BFF');
    expect(output).toContain('Community Adoption');
    expect(output).toContain('Continuous Improvement');
  });
});

// Minimal test runner for Node.js (if not using Jest)
if (require.main === module) {
  (async () => {
    let passed = 0, failed = 0;

    // Test 1: Check if summary generates output
    const summary = new ImplementationSummary();
    const originalLog = console.log;
    let output = '';
    console.log = (msg: string) => { output += msg + '\n'; };

    summary.generateSummary();
    console.log = originalLog;

    if (output.includes('ORIGINVAULT SCHEMA REGISTRY - IMPLEMENTATION SUMMARY')) {
      console.log('Test 1 passed: Summary generates output');
      passed++;
    } else {
      console.error('Test 1 failed: No summary output generated');
      failed++;
    }

    // Test 2: Check if new schemas are included
    if (output.includes('ContributorEndorsementCredential') && 
        output.includes('CarbonOffsetCredential') && 
        output.includes('VaultRoleCredential')) {
      console.log('Test 2 passed: New schemas are included');
      passed++;
    } else {
      console.error('Test 2 failed: New schemas not found in output');
      failed++;
    }

    // Test 3: Check if infrastructure implementations are included
    if (output.includes('Schema Migration Tool') && 
        output.includes('Enhanced Validation Framework')) {
      console.log('Test 3 passed: Infrastructure implementations are included');
      passed++;
    } else {
      console.error('Test 3 failed: Infrastructure implementations not found');
      failed++;
    }

    // Test 4: Check if validation frameworks are included
    if (output.includes('W3C Verifiable Credentials Validation') && 
        output.includes('Schema.org Compliance Assessment')) {
      console.log('Test 4 passed: Validation frameworks are included');
      passed++;
    } else {
      console.error('Test 4 failed: Validation frameworks not found');
      failed++;
    }

    console.log(`\nTest summary: ${passed} passed, ${failed} failed.`);
    process.exit(failed > 0 ? 1 : 0);
  })();
} 