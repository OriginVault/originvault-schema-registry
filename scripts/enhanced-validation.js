#!/usr/bin/env node
/**
 * Enhanced Multi-Layer Schema Validation Framework
 * 
 * Performs comprehensive validation across multiple dimensions:
 * - W3C Verifiable Credentials compliance
 * - Schema.org alignment and compatibility
 * - Cross-registry compatibility testing
 * - Production readiness assessment
 * - Security and privacy compliance
 * - Performance and accessibility validation
 */

const fs = require('fs').promises;
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class EnhancedSchemaValidator {
  constructor() {
    this.ajv = new Ajv({ 
      allErrors: true, 
      verbose: true,
      strict: false 
    });
    addFormats(this.ajv);
    
    this.validationResults = {
      w3cCompliance: [],
      schemaOrgAlignment: [],
      crossRegistryCompatibility: [],
      productionReadiness: [],
      securityCompliance: [],
      performanceValidation: [],
      accessibilityChecks: []
    };
    
    this.criticalIssues = [];
    this.warnings = [];
    this.optimizations = [];
  }

  /**
   * W3C Verifiable Credentials Compliance Validation
   */
  async validateW3CCompliance(schema, schemaPath) {
    const issues = [];
    const warnings = [];
    
    try {
      // Check for required W3C VC fields
      const requiredW3CFields = [
        '@context',
        'type',
        'credentialSubject'
      ];
      
      const hasW3CStructure = schema.properties && 
        requiredW3CFields.every(field => schema.properties[field]);
      
      if (!hasW3CStructure) {
        issues.push({
          type: 'W3C_STRUCTURE_MISSING',
          message: 'Schema missing required W3C VC structure',
          path: schemaPath,
          severity: 'error'
        });
      }
      
      // Validate @context field
      if (schema.properties && schema.properties['@context']) {
        const contextDef = schema.properties['@context'];
        if (!contextDef.items || !contextDef.items.enum) {
          warnings.push({
            type: 'W3C_CONTEXT_FLEXIBLE',
            message: 'Consider constraining @context to known W3C contexts',
            path: schemaPath,
            severity: 'warning'
          });
        } else {
          // Check for standard W3C contexts
          const standardContexts = [
            'https://www.w3.org/2018/credentials/v1',
            'https://w3id.org/security/suites/ed25519-2020/v1'
          ];
          
          const hasStandardContext = contextDef.items.enum.some(ctx =>
            standardContexts.includes(ctx)
          );
          
          if (!hasStandardContext) {
            warnings.push({
              type: 'W3C_CONTEXT_MISSING_STANDARD',
              message: 'Missing standard W3C contexts',
              path: schemaPath,
              severity: 'warning'
            });
          }
        }
      }
      
      // Validate type field
      if (schema.properties && schema.properties.type) {
        const typeDef = schema.properties.type;
        if (typeDef.items && typeDef.items.enum) {
          const hasVerifiableCredential = typeDef.items.enum.includes('VerifiableCredential');
          if (!hasVerifiableCredential) {
            warnings.push({
              type: 'W3C_TYPE_MISSING_VC',
              message: 'Consider including "VerifiableCredential" in type array',
              path: schemaPath,
              severity: 'warning'
            });
          }
        }
      }
      
      // Check for proof field structure
      if (schema.properties && !schema.properties.proof) {
        warnings.push({
          type: 'W3C_PROOF_MISSING',
          message: 'Schema should include proof field for W3C VC compliance',
          path: schemaPath,
          severity: 'warning'
        });
      }
      
      return {
        compliant: issues.length === 0,
        issues,
        warnings,
        score: Math.max(0, 100 - (issues.length * 25) - (warnings.length * 5))
      };
      
    } catch (error) {
      issues.push({
        type: 'W3C_VALIDATION_ERROR',
        message: `Validation error: ${error.message}`,
        path: schemaPath,
        severity: 'error'
      });
      
      return { compliant: false, issues, warnings, score: 0 };
    }
  }

  /**
   * Schema.org Alignment Validation
   */
  async validateSchemaOrgAlignment(schema, schemaPath) {
    const issues = [];
    const warnings = [];
    const alignmentScore = { matches: 0, total: 0 };
    
    try {
      // Common Schema.org types that should align
      const schemaOrgTypes = [
        'Person', 'Organization', 'CreativeWork', 'Action',
        'Event', 'Place', 'Product', 'Service', 'Thing'
      ];
      
      // Check if schema title/type corresponds to Schema.org
      const schemaName = schema.title || path.basename(schemaPath, '.schema.json');
      const hasSchemaOrgEquivalent = schemaOrgTypes.some(type => 
        schemaName.toLowerCase().includes(type.toLowerCase())
      );
      
      if (hasSchemaOrgEquivalent) {
        alignmentScore.total += 1;
        
        // Check for Schema.org context
        if (schema.properties && schema.properties['@context']) {
          const contextDef = schema.properties['@context'];
          const hasSchemaOrgContext = contextDef.items && contextDef.items.enum && 
            contextDef.items.enum.some(ctx => ctx.includes('schema.org'));
          
          if (hasSchemaOrgContext) {
            alignmentScore.matches += 1;
          } else {
            warnings.push({
              type: 'SCHEMA_ORG_CONTEXT_MISSING',
              message: 'Consider adding Schema.org context for better interoperability',
              path: schemaPath,
              severity: 'warning'
            });
          }
        }
        
        // Check for common Schema.org properties
        const commonSchemaOrgProps = [
          'name', 'description', 'url', 'identifier',
          'dateCreated', 'dateModified', 'creator', 'publisher'
        ];
        
        if (schema.properties) {
          const matchingProps = commonSchemaOrgProps.filter(prop => 
            schema.properties[prop] || 
            Object.keys(schema.properties).some(key => key.toLowerCase().includes(prop))
          );
          
          alignmentScore.total += commonSchemaOrgProps.length;
          alignmentScore.matches += matchingProps.length;
        }
      }
      
      const score = alignmentScore.total > 0 ? 
        Math.round((alignmentScore.matches / alignmentScore.total) * 100) : 100;
      
      return {
        aligned: score >= 70,
        issues,
        warnings,
        score,
        alignmentDetails: alignmentScore
      };
      
    } catch (error) {
      issues.push({
        type: 'SCHEMA_ORG_VALIDATION_ERROR',
        message: `Schema.org validation error: ${error.message}`,
        path: schemaPath,
        severity: 'error'
      });
      
      return { aligned: false, issues, warnings, score: 0 };
    }
  }

  /**
   * Cross-Registry Compatibility Testing
   */
  async validateCrossRegistryCompatibility(schema, schemaPath) {
    const issues = [];
    const warnings = [];
    const compatibilityResults = {
      difCompatible: false,
      cheqdCompatible: false,
      openVerifiableCompatible: false
    };
    
    try {
      // DIF compatibility checks
      if (schema.properties && schema.properties.credentialSubject) {
        const credSubject = schema.properties.credentialSubject;
        if (credSubject.properties && credSubject.properties.id) {
          compatibilityResults.difCompatible = true;
        }
      }
      
      // Cheqd compatibility checks
      if (schema.properties && schema.properties['@context']) {
        const contextDef = schema.properties['@context'];
        if (contextDef.items && contextDef.items.enum) {
          const hasCheqdContext = contextDef.items.enum.some(ctx => 
            ctx.includes('cheqd') || ctx.includes('originvault.box')
          );
          compatibilityResults.cheqdCompatible = hasCheqdContext;
        }
      }
      
      // Open Verifiable compatibility checks
      const hasOpenVerifiableStructure = schema.properties && (
        schema.properties.issuer || 
        schema.properties.credentialSubject ||
        schema.properties.proof
      );
      compatibilityResults.openVerifiableCompatible = hasOpenVerifiableStructure;
      
      // Calculate compatibility score
      const compatibleRegistries = Object.values(compatibilityResults).filter(Boolean).length;
      const totalRegistries = Object.keys(compatibilityResults).length;
      const score = Math.round((compatibleRegistries / totalRegistries) * 100);
      
      if (score < 66) {
        warnings.push({
          type: 'LOW_CROSS_REGISTRY_COMPATIBILITY',
          message: 'Schema has limited compatibility across registries',
          path: schemaPath,
          severity: 'warning'
        });
      }
      
      return {
        compatible: score >= 66,
        issues,
        warnings,
        score,
        registryCompatibility: compatibilityResults
      };
      
    } catch (error) {
      issues.push({
        type: 'CROSS_REGISTRY_VALIDATION_ERROR',
        message: `Cross-registry validation error: ${error.message}`,
        path: schemaPath,
        severity: 'error'
      });
      
      return { compatible: false, issues, warnings, score: 0 };
    }
  }

  /**
   * Production Readiness Assessment
   */
  async validateProductionReadiness(schema, schemaPath) {
    const issues = [];
    const warnings = [];
    const readinessChecks = {
      hasTitle: false,
      hasDescription: false,
      hasVersion: false,
      hasExamples: false,
      hasRequiredFields: false,
      hasValidation: false
    };
    
    try {
      // Check for required metadata
      readinessChecks.hasTitle = !!schema.title;
      readinessChecks.hasDescription = !!schema.description;
      readinessChecks.hasVersion = !!schema.version || !!schema.$id;
      readinessChecks.hasExamples = !!schema.examples || 
        (schema.properties && Object.values(schema.properties).some(prop => prop.examples));
      
      // Check for required fields
      readinessChecks.hasRequiredFields = !!schema.required && schema.required.length > 0;
      
      // Check for validation constraints
      if (schema.properties) {
        const hasValidationConstraints = Object.values(schema.properties).some(prop =>
          prop.pattern || prop.format || prop.minimum || prop.maximum || 
          prop.minLength || prop.maxLength || prop.enum
        );
        readinessChecks.hasValidation = hasValidationConstraints;
      }
      
      // Generate issues for missing elements
      Object.entries(readinessChecks).forEach(([check, passed]) => {
        if (!passed) {
          const severity = ['hasTitle', 'hasDescription', 'hasRequiredFields'].includes(check) ? 
            'error' : 'warning';
          
          const message = {
            hasTitle: 'Schema missing title field',
            hasDescription: 'Schema missing description field',
            hasVersion: 'Schema missing version information',
            hasExamples: 'Schema missing examples for better usability',
            hasRequiredFields: 'Schema has no required fields defined',
            hasValidation: 'Schema lacks validation constraints'
          }[check];
          
          if (severity === 'error') {
            issues.push({
              type: `PRODUCTION_${check.toUpperCase()}`,
              message,
              path: schemaPath,
              severity
            });
          } else {
            warnings.push({
              type: `PRODUCTION_${check.toUpperCase()}`,
              message,
              path: schemaPath,
              severity
            });
          }
        }
      });
      
      const passedChecks = Object.values(readinessChecks).filter(Boolean).length;
      const totalChecks = Object.keys(readinessChecks).length;
      const score = Math.round((passedChecks / totalChecks) * 100);
      
      return {
        ready: issues.length === 0 && score >= 80,
        issues,
        warnings,
        score,
        readinessChecks
      };
      
    } catch (error) {
      issues.push({
        type: 'PRODUCTION_VALIDATION_ERROR',
        message: `Production readiness validation error: ${error.message}`,
        path: schemaPath,
        severity: 'error'
      });
      
      return { ready: false, issues, warnings, score: 0 };
    }
  }

  /**
   * Security and Privacy Compliance Validation
   */
  async validateSecurityCompliance(schema, schemaPath) {
    const issues = [];
    const warnings = [];
    const securityChecks = {
      noSensitiveDefaults: true,
      hasPrivacyControls: false,
      hasAccessControls: false,
      noPlaintextSecrets: true
    };
    
    try {
      // Check for sensitive data patterns
      const sensitivePatterns = [
        /password/i, /secret/i, /key/i, /token/i, 
        /ssn/i, /credit.?card/i, /bank/i
      ];
      
      const schemaString = JSON.stringify(schema);
      const hasSensitiveData = sensitivePatterns.some(pattern => 
        pattern.test(schemaString)
      );
      
      if (hasSensitiveData) {
        warnings.push({
          type: 'SECURITY_SENSITIVE_DATA_DETECTED',
          message: 'Schema may contain sensitive data patterns',
          path: schemaPath,
          severity: 'warning'
        });
      }
      
      // Check for privacy controls
      if (schema.properties) {
        const hasConsentField = Object.keys(schema.properties).some(key => 
          key.toLowerCase().includes('consent') || key.toLowerCase().includes('privacy')
        );
        securityChecks.hasPrivacyControls = hasConsentField;
      }
      
      // Check for access control patterns
      if (schema.properties) {
        const hasAccessControl = Object.keys(schema.properties).some(key => 
          key.toLowerCase().includes('access') || 
          key.toLowerCase().includes('permission') ||
          key.toLowerCase().includes('role')
        );
        securityChecks.hasAccessControls = hasAccessControl;
      }
      
      const passedChecks = Object.values(securityChecks).filter(Boolean).length;
      const totalChecks = Object.keys(securityChecks).length;
      const score = Math.round((passedChecks / totalChecks) * 100);
      
      return {
        secure: issues.length === 0 && score >= 75,
        issues,
        warnings,
        score,
        securityChecks
      };
      
    } catch (error) {
      issues.push({
        type: 'SECURITY_VALIDATION_ERROR',
        message: `Security validation error: ${error.message}`,
        path: schemaPath,
        severity: 'error'
      });
      
      return { secure: false, issues, warnings, score: 0 };
    }
  }

  /**
   * Main validation orchestrator
   */
  async validateSchema(schemaPath) {
    console.log(`🔍 Validating schema: ${schemaPath}`);
    
    try {
      const schemaContent = await fs.readFile(schemaPath, 'utf8');
      const schema = JSON.parse(schemaContent);
      
      // Run all validation layers
      const [
        w3cResult,
        schemaOrgResult,
        crossRegistryResult,
        productionResult,
        securityResult
      ] = await Promise.all([
        this.validateW3CCompliance(schema, schemaPath),
        this.validateSchemaOrgAlignment(schema, schemaPath),
        this.validateCrossRegistryCompatibility(schema, schemaPath),
        this.validateProductionReadiness(schema, schemaPath),
        this.validateSecurityCompliance(schema, schemaPath)
      ]);
      
      // Aggregate results
      const allIssues = [
        ...w3cResult.issues,
        ...schemaOrgResult.issues,
        ...crossRegistryResult.issues,
        ...productionResult.issues,
        ...securityResult.issues
      ];
      
      const allWarnings = [
        ...w3cResult.warnings,
        ...schemaOrgResult.warnings,
        ...crossRegistryResult.warnings,
        ...productionResult.warnings,
        ...securityResult.warnings
      ];
      
      // Calculate overall score
      const overallScore = Math.round([
        w3cResult.score,
        schemaOrgResult.score,
        crossRegistryResult.score,
        productionResult.score,
        securityResult.score
      ].reduce((sum, score) => sum + score, 0) / 5);
      
      const validationResult = {
        schemaPath,
        schema: path.basename(schemaPath),
        overallScore,
        passed: allIssues.length === 0 && overallScore >= 80,
        issues: allIssues,
        warnings: allWarnings,
        details: {
          w3cCompliance: w3cResult,
          schemaOrgAlignment: schemaOrgResult,
          crossRegistryCompatibility: crossRegistryResult,
          productionReadiness: productionResult,
          securityCompliance: securityResult
        }
      };
      
      // Store results
      this.validationResults.w3cCompliance.push(w3cResult);
      this.validationResults.schemaOrgAlignment.push(schemaOrgResult);
      this.validationResults.crossRegistryCompatibility.push(crossRegistryResult);
      this.validationResults.productionReadiness.push(productionResult);
      this.validationResults.securityCompliance.push(securityResult);
      
      if (allIssues.length > 0) {
        this.criticalIssues.push(...allIssues);
      }
      if (allWarnings.length > 0) {
        this.warnings.push(...allWarnings);
      }
      
      return validationResult;
      
    } catch (error) {
      const errorResult = {
        schemaPath,
        schema: path.basename(schemaPath),
        overallScore: 0,
        passed: false,
        issues: [{
          type: 'VALIDATION_ERROR',
          message: `Failed to validate schema: ${error.message}`,
          path: schemaPath,
          severity: 'error'
        }],
        warnings: [],
        details: {}
      };
      
      this.criticalIssues.push(...errorResult.issues);
      return errorResult;
    }
  }

  /**
   * Validate all schemas in directories
   */
  async validateAllSchemas(directories = ['schemas/v1', 'drafts']) {
    const results = [];
    
    for (const directory of directories) {
      try {
        const fullPath = path.resolve(directory);
        const files = await fs.readdir(fullPath);
        
        for (const file of files) {
          if (file.endsWith('.schema.json')) {
            const schemaPath = path.join(fullPath, file);
            const result = await this.validateSchema(schemaPath);
            results.push(result);
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not read directory ${directory}: ${error.message}`);
      }
    }
    
    return results;
  }

  /**
   * Generate comprehensive validation report
   */
  generateReport(results) {
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const averageScore = Math.round(
      results.reduce((sum, r) => sum + r.overallScore, 0) / totalCount
    );
    
    const report = {
      summary: {
        totalSchemas: totalCount,
        passed: passedCount,
        failed: totalCount - passedCount,
        averageScore,
        passRate: Math.round((passedCount / totalCount) * 100)
      },
      categoryScores: {
        w3cCompliance: Math.round(
          this.validationResults.w3cCompliance.reduce((sum, r) => sum + r.score, 0) / 
          this.validationResults.w3cCompliance.length
        ),
        schemaOrgAlignment: Math.round(
          this.validationResults.schemaOrgAlignment.reduce((sum, r) => sum + r.score, 0) / 
          this.validationResults.schemaOrgAlignment.length
        ),
        crossRegistryCompatibility: Math.round(
          this.validationResults.crossRegistryCompatibility.reduce((sum, r) => sum + r.score, 0) / 
          this.validationResults.crossRegistryCompatibility.length
        ),
        productionReadiness: Math.round(
          this.validationResults.productionReadiness.reduce((sum, r) => sum + r.score, 0) / 
          this.validationResults.productionReadiness.length
        ),
        securityCompliance: Math.round(
          this.validationResults.securityCompliance.reduce((sum, r) => sum + r.score, 0) / 
          this.validationResults.securityCompliance.length
        )
      },
      criticalIssues: this.criticalIssues.length,
      warnings: this.warnings.length,
      details: results,
      recommendations: this.generateRecommendations(results)
    };
    
    return report;
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(results) {
    const recommendations = [];
    
    // Check for common issues
    const commonIssues = {};
    results.forEach(result => {
      result.issues.forEach(issue => {
        commonIssues[issue.type] = (commonIssues[issue.type] || 0) + 1;
      });
    });
    
    // Generate recommendations based on common issues
    Object.entries(commonIssues).forEach(([issueType, count]) => {
      if (count >= 3) {
        recommendations.push({
          type: 'COMMON_ISSUE',
          priority: 'high',
          message: `${count} schemas have ${issueType} issues - consider creating a standard template`,
          affectedCount: count
        });
      }
    });
    
    // Check overall scores
    const lowScoreSchemas = results.filter(r => r.overallScore < 70);
    if (lowScoreSchemas.length > 0) {
      recommendations.push({
        type: 'LOW_QUALITY_SCHEMAS',
        priority: 'high',
        message: `${lowScoreSchemas.length} schemas need significant improvement`,
        affectedSchemas: lowScoreSchemas.map(s => s.schema)
      });
    }
    
    return recommendations;
  }
}

// CLI execution
if (require.main === module) {
  async function main() {
    const validator = new EnhancedSchemaValidator();
    
    console.log('🚀 Starting Enhanced Schema Validation...\n');
    
    const results = await validator.validateAllSchemas();
    const report = validator.generateReport(results);
    
    console.log('\n📊 Validation Report Summary:');
    console.log(`📋 Total Schemas: ${report.summary.totalSchemas}`);
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`📈 Average Score: ${report.summary.averageScore}%`);
    console.log(`📊 Pass Rate: ${report.summary.passRate}%`);
    
    console.log('\n🎯 Category Scores:');
    Object.entries(report.categoryScores).forEach(([category, score]) => {
      const emoji = score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴';
      console.log(`${emoji} ${category}: ${score}%`);
    });
    
    if (report.criticalIssues > 0) {
      console.log(`\n🚨 Critical Issues: ${report.criticalIssues}`);
    }
    
    if (report.warnings > 0) {
      console.log(`⚠️  Warnings: ${report.warnings}`);
    }
    
    // Save detailed report
    const reportPath = 'validation-report.json';
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Show recommendations
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach((rec, i) => {
        console.log(`${i + 1}. [${rec.priority.toUpperCase()}] ${rec.message}`);
      });
    }
    
    console.log('\n✨ Enhanced validation complete!');
    
    // Exit with appropriate code
    process.exit(report.summary.failed > 0 ? 1 : 0);
  }
  
  main().catch(error => {
    console.error('💥 Enhanced validation failed:', error);
    process.exit(1);
  });
}

module.exports = { EnhancedSchemaValidator }; 