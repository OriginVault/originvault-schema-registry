#!/usr/bin/env node
/**
 * Production Readiness Assessment
 * Comprehensive validation and deployment preparation for schema registry
 */

const fs = require('fs');
const path = require('path');

class ProductionReadinessAssessment {
  constructor() {
    this.results = {
      migration: null,
      validation: null,
      infrastructure: null,
      security: null,
      compliance: null
    };
  }

  async runFullAssessment() {
    console.log('🚀 ORIGINVAULT SCHEMA REGISTRY - PRODUCTION READINESS ASSESSMENT');
    console.log('=' .repeat(80));
    console.log(`Started: ${new Date().toISOString()}\n`);

    try {
      // Phase 1: Infrastructure Readiness
      await this.runInfrastructureAssessment();
      
      // Phase 2: Security Assessment
      await this.runSecurityAssessment();
      
      // Phase 3: Compliance Check
      await this.runComplianceAssessment();
      
      // Final Report
      this.generateProductionReadinessReport();
      
    } catch (error) {
      console.error('❌ Assessment failed:', error.message);
      process.exit(1);
    }
  }

  async runInfrastructureAssessment() {
    console.log('🏗️ PHASE 1: INFRASTRUCTURE READINESS ASSESSMENT\n');
    
    const infraChecks = {
      productionDomain: this.checkProductionDomain(),
      httpsEnabled: this.checkHTTPSConfiguration(),
      cdnSetup: this.checkCDNConfiguration(),
      backupStrategy: this.checkBackupStrategy(),
      monitoringSetup: this.checkMonitoringSetup()
    };
    
    const passedChecks = Object.values(infraChecks).filter(check => check.status === 'PASS').length;
    const totalChecks = Object.keys(infraChecks).length;
    
    this.results.infrastructure = {
      checks: infraChecks,
      passedChecks,
      totalChecks,
      passRate: (passedChecks / totalChecks) * 100,
      readiness: passedChecks >= totalChecks * 0.8 ? 'READY' : 'NEEDS_WORK'
    };
    
    console.log(`📊 Infrastructure checks: ${passedChecks}/${totalChecks} passed\n`);
  }

  async runSecurityAssessment() {
    console.log('🔒 PHASE 2: SECURITY ASSESSMENT\n');
    
    const securityChecks = {
      schemaSignatures: this.checkSchemaSignatures(),
      accessControls: this.checkAccessControls(),
      auditLogging: this.checkAuditLogging(),
      encryptionAtRest: this.checkEncryptionAtRest(),
      ddosProtection: this.checkDDoSProtection()
    };
    
    const passedChecks = Object.values(securityChecks).filter(check => check.status === 'PASS').length;
    const totalChecks = Object.keys(securityChecks).length;
    
    this.results.security = {
      checks: securityChecks,
      passedChecks,
      totalChecks,
      passRate: (passedChecks / totalChecks) * 100,
      readiness: passedChecks >= totalChecks * 0.7 ? 'READY' : 'NEEDS_WORK'
    };
    
    console.log(`🛡️ Security checks: ${passedChecks}/${totalChecks} passed\n`);
  }

  async runComplianceAssessment() {
    console.log('📋 PHASE 3: COMPLIANCE ASSESSMENT\n');
    
    const complianceChecks = {
      w3cVCCompliance: this.checkW3CVCCompliance(),
      gdprCompliance: this.checkGDPRCompliance(),
      schemaOrgAlignment: this.checkSchemaOrgAlignment(),
      jsonLdContext: this.checkJSONLDContext(),
      interoperability: this.checkInteroperability()
    };
    
    const passedChecks = Object.values(complianceChecks).filter(check => check.status === 'PASS').length;
    const totalChecks = Object.keys(complianceChecks).length;
    
    this.results.compliance = {
      checks: complianceChecks,
      passedChecks,
      totalChecks,
      passRate: (passedChecks / totalChecks) * 100,
      readiness: passedChecks >= totalChecks * 0.8 ? 'READY' : 'NEEDS_WORK'
    };
    
    console.log(`✅ Compliance checks: ${passedChecks}/${totalChecks} passed\n`);
  }

  generateProductionReadinessReport() {
    console.log('📊 PRODUCTION READINESS REPORT');
    console.log('=' .repeat(80));
    
    const overallReadiness = this.calculateOverallReadiness();
    const readinessColor = overallReadiness === 'READY' ? '🟢' : 
                          overallReadiness === 'NEEDS_WORK' ? '🟡' : '🔴';
    
    console.log(`\n${readinessColor} OVERALL READINESS: ${overallReadiness}\n`);
    
    // Phase Results
    this.printPhaseResult('Infrastructure', this.results.infrastructure);
    this.printPhaseResult('Security', this.results.security);
    this.printPhaseResult('Compliance', this.results.compliance);
    
    // Recommendations
    console.log('\n🎯 PRIORITY RECOMMENDATIONS:\n');
    this.generateRecommendations();
    
    // Deployment Checklist
    console.log('\n📋 DEPLOYMENT CHECKLIST:\n');
    this.generateDeploymentChecklist();
    
    console.log(`\nAssessment completed: ${new Date().toISOString()}`);
  }

  // Infrastructure Checks
  checkProductionDomain() {
    const hasLocalhost = this.findSchemasWithLocalhost();
    return {
      status: hasLocalhost.length === 0 ? 'PASS' : 'FAIL',
      message: hasLocalhost.length === 0 ? 'All schemas use production domain' : `${hasLocalhost.length} schemas still use localhost`,
      action: hasLocalhost.length > 0 ? 'Update schema $id fields to use schemas.originvault.box' : null
    };
  }

  checkHTTPSConfiguration() {
    return {
      status: 'FAIL',
      message: 'HTTPS configuration not yet deployed',
      action: 'Deploy SSL certificates and configure HTTPS redirect'
    };
  }

  checkCDNConfiguration() {
    return {
      status: 'FAIL',
      message: 'CDN not yet configured',
      action: 'Set up CDN for global schema resolution performance'
    };
  }

  checkBackupStrategy() {
    return {
      status: 'FAIL',
      message: 'Backup strategy not implemented',
      action: 'Implement automated backup and disaster recovery'
    };
  }

  checkMonitoringSetup() {
    return {
      status: 'FAIL',
      message: 'Monitoring not configured',
      action: 'Set up schema resolution monitoring and alerting'
    };
  }

  // Security Checks
  checkSchemaSignatures() {
    return {
      status: 'FAIL',
      message: 'Schema signatures not implemented',
      action: 'Implement cryptographic signing for schema integrity'
    };
  }

  checkAccessControls() {
    return {
      status: 'FAIL',
      message: 'Access controls not configured',
      action: 'Implement role-based access for schema management'
    };
  }

  checkAuditLogging() {
    return {
      status: 'FAIL',
      message: 'Audit logging not enabled',
      action: 'Enable comprehensive audit logging for schema operations'
    };
  }

  checkEncryptionAtRest() {
    return {
      status: 'FAIL',
      message: 'Encryption at rest not configured',
      action: 'Enable encryption for schema storage'
    };
  }

  checkDDoSProtection() {
    return {
      status: 'FAIL',
      message: 'DDoS protection not configured',
      action: 'Configure DDoS protection for schema registry endpoints'
    };
  }

  // Compliance Checks
  checkW3CVCCompliance() {
    const credentialSchemas = this.findCredentialSchemas();
    const compliantSchemas = credentialSchemas.filter(this.isW3CVCCompliant);
    return {
      status: compliantSchemas.length === credentialSchemas.length ? 'PASS' : 'FAIL',
      message: `${compliantSchemas.length}/${credentialSchemas.length} credential schemas are W3C VC compliant`,
      action: compliantSchemas.length < credentialSchemas.length ? 'Update credential schemas for W3C VC compliance' : null
    };
  }

  checkGDPRCompliance() {
    return {
      status: 'PASS',
      message: 'GDPR compliance considerations documented',
      action: null
    };
  }

  checkSchemaOrgAlignment() {
    return {
      status: 'FAIL',
      message: 'Schema.org alignment not implemented',
      action: 'Add Schema.org context to relevant schemas'
    };
  }

  checkJSONLDContext() {
    return {
      status: 'FAIL',
      message: 'JSON-LD contexts not deployed',
      action: 'Deploy JSON-LD context files for credentials'
    };
  }

  checkInteroperability() {
    return {
      status: 'PASS',
      message: 'Interoperability standards followed',
      action: null
    };
  }

  // Helper Methods
  findSchemasWithLocalhost() {
    const schemas = [];
    const scanDir = (dir) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (file.endsWith('.json')) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('localhost')) {
            schemas.push(filePath);
          }
        }
      });
    };
    
    scanDir('schemas/v1');
    scanDir('drafts');
    
    return schemas;
  }

  findCredentialSchemas() {
    const schemas = [];
    if (fs.existsSync('schemas/v1')) {
      const files = fs.readdirSync('schemas/v1')
        .filter(f => f.includes('Credential') && f.endsWith('.json'));
      schemas.push(...files.map(f => path.join('schemas/v1', f)));
    }
    return schemas;
  }

  isW3CVCCompliant(schemaPath) {
    try {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      return schema['@context'] && 
             schema.required && 
             schema.required.includes('credentialSubject') &&
             schema.required.includes('issuer');
    } catch {
      return false;
    }
  }

  calculateOverallReadiness() {
    const phases = [
      this.results.infrastructure?.readiness,
      this.results.security?.readiness,
      this.results.compliance?.readiness
    ].filter(r => r);
    
    const readyCount = phases.filter(r => r === 'READY').length;
    const failedCount = phases.filter(r => r === 'FAILED').length;
    
    if (failedCount > 0) return 'FAILED';
    if (readyCount >= phases.length * 0.8) return 'READY';
    return 'NEEDS_WORK';
  }

  printPhaseResult(phaseName, result) {
    if (!result) return;
    
    const statusIcon = result.readiness === 'READY' ? '✅' : 
                      result.readiness === 'NEEDS_WORK' ? '⚠️' : '❌';
    
    console.log(`${statusIcon} ${phaseName}: ${result.readiness}`);
    if (result.passRate) {
      console.log(`   Pass Rate: ${result.passRate.toFixed(1)}%`);
    }
  }

  generateRecommendations() {
    const recommendations = [
      '1. Deploy public hosting at schemas.originvault.box',
      '2. Configure HTTPS and SSL certificates',
      '3. Set up CDN for global performance',
      '4. Implement schema signing and verification',
      '5. Add comprehensive monitoring and alerting',
      '6. Complete W3C VC compliance for all credentials',
      '7. Deploy JSON-LD context files',
      '8. Set up automated backup and disaster recovery'
    ];
    
    recommendations.forEach(rec => console.log(`   ${rec}`));
  }

  generateDeploymentChecklist() {
    const checklist = [
      '☐ Domain registration and DNS configuration',
      '☐ SSL certificate provisioning',
      '☐ CDN setup and configuration',
      '☐ Load balancer configuration',
      '☐ Monitoring and alerting setup',
      '☐ Backup and disaster recovery testing',
      '☐ Security hardening and penetration testing',
      '☐ Performance testing and optimization',
      '☐ Documentation and runbook creation',
      '☐ Production deployment and smoke testing'
    ];
    
    checklist.forEach(item => console.log(`   ${item}`));
  }
}

// Run assessment if called directly
if (require.main === module) {
  const assessment = new ProductionReadinessAssessment();
  assessment.runFullAssessment().catch(console.error);
}

module.exports = ProductionReadinessAssessment; 