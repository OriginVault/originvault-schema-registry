import { ProductionReadinessAssessment } from './production-readiness';

async function runTests() {
  let passed = 0, failed = 0;

  // Test 1: Check if assessment generates output
  const assessment = new ProductionReadinessAssessment();
  const originalLog = console.log;
  let output = '';
  console.log = (msg: string) => { output += msg + '\n'; };

  try {
    await assessment.runFullAssessment();
    console.log = originalLog;

    if (output.includes('ORIGINVAULT SCHEMA REGISTRY - PRODUCTION READINESS ASSESSMENT')) {
      console.log('Test 1 passed: Assessment generates output');
      passed++;
    } else {
      console.error('Test 1 failed: No assessment output generated');
      failed++;
    }
  } catch (error) {
    console.log = originalLog;
    console.error('Test 1 failed: Assessment threw error', error);
    failed++;
  }

  // Test 2: Check if infrastructure assessment is included
  if (output.includes('INFRASTRUCTURE READINESS ASSESSMENT') && 
      output.includes('Infrastructure checks:')) {
    console.log('Test 2 passed: Infrastructure assessment is included');
    passed++;
  } else {
    console.error('Test 2 failed: Infrastructure assessment not found');
    failed++;
  }

  // Test 3: Check if security assessment is included
  if (output.includes('SECURITY ASSESSMENT') && 
      output.includes('Security checks:')) {
    console.log('Test 3 passed: Security assessment is included');
    passed++;
  } else {
    console.error('Test 3 failed: Security assessment not found');
    failed++;
  }

  // Test 4: Check if compliance assessment is included
  if (output.includes('COMPLIANCE ASSESSMENT') && 
      output.includes('Compliance checks:')) {
    console.log('Test 4 passed: Compliance assessment is included');
    passed++;
  } else {
    console.error('Test 4 failed: Compliance assessment not found');
    failed++;
  }

  // Test 5: Check if production readiness report is generated
  if (output.includes('PRODUCTION READINESS REPORT') && 
      output.includes('OVERALL READINESS:')) {
    console.log('Test 5 passed: Production readiness report is generated');
    passed++;
  } else {
    console.error('Test 5 failed: Production readiness report not found');
    failed++;
  }

  // Test 6: Check if recommendations are included
  if (output.includes('PRIORITY RECOMMENDATIONS:') && 
      output.includes('Deploy HTTPS and SSL certificates')) {
    console.log('Test 6 passed: Recommendations are included');
    passed++;
  } else {
    console.error('Test 6 failed: Recommendations not found');
    failed++;
  }

  // Test 7: Check if deployment checklist is included
  if (output.includes('DEPLOYMENT CHECKLIST:') && 
      output.includes('Schema validation completed')) {
    console.log('Test 7 passed: Deployment checklist is included');
    passed++;
  } else {
    console.error('Test 7 failed: Deployment checklist not found');
    failed++;
  }

  console.log(`\nTest summary: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

if (require.main === module) {
  runTests();
} 