#!/usr/bin/env node
/**
 * Enhanced Schema Validation Framework
 * W3C VC Compliance, Cross-Registry Testing, Production Readiness
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SchemaValidationFramework {
  constructor() {
    this.ajv = new Ajv({ 
      strict: false, 
      allErrors: true, 
      loadSchema: this.loadExternalSchema.bind(this)
    });
    addFormats(this.ajv);
    
    this.validationRules = {
      w3cVC: this.validateW3CCredential.bind(this),
      schemaOrg: this.validateSchemaOrgCompliance.bind(this),
      crossRegistry: this.validateCrossRegistryCompatibility.bind(this),
      productionReady: this.validateProductionReadiness.bind(this)
    };
    
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  async validateSchema(schemaPath) {
    console.log(`🔍 Validating: ${schemaPath}`);
    
    try {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const results = {};
      
      // Run all validation rules
      for (const [ruleName, ruleFunc] of Object.entries(this.validationRules)) {
        try {
          results[ruleName] = await ruleFunc(schema, schemaPath);
        } catch (error) {
          results[ruleName] = {
            valid: false,
            errors: [error.message]
          };
        }
      }
      
      return {
        schema: schemaPath,
        results,
        overall: this.calculateOverallScore(results)
      };
      
    } catch (error) {
      return {
        schema: schemaPath,
        error: error.message,
        overall: { valid: false, score: 0 }
      };
    }
  }

  async validateW3CCredential(schema, schemaPath) {
    const isCredential = schemaPath.includes('Credential') || 
                        schema.title?.includes('Credential');
    
    if (!isCredential) {
      return { valid: true, skipped: 'Not a credential schema' };
    }

    const errors = [];
    const warnings = [];

    // Check required W3C VC properties
    const requiredVCProps = ['@context', 'type', 'credentialSubject', 'issuer'];
    const requiredProps = schema.required || [];
    
    requiredVCProps.forEach(prop => {
      if (!requiredProps.includes(prop)) {
        errors.push(`Missing required W3C VC property: ${prop}`);
      }
    });

    // Check @context structure
    if (schema.properties?.['@context']) {
      const context = schema.properties['@context'];
      if (!context.type || context.type !== 'array') {
        warnings.push('@context should be an array for W3C VC v2.0');
      }
    }

    // Check for proof property
    if (!schema.properties?.proof) {
      warnings.push('Missing proof property - required for verifiable credentials');
    }

    // Check credentialSubject structure
    if (schema.properties?.credentialSubject) {
      const subject = schema.properties.credentialSubject;
      if (!subject.type || subject.type !== 'object') {
        errors.push('credentialSubject must be an object');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, 100 - (errors.length * 25) - (warnings.length * 10))
    };
  }

  async validateSchemaOrgCompliance(schema, schemaPath) {
    const warnings = [];
    const suggestions = [];

    // Check for Schema.org alignment
    const hasSchemaOrgContext = this.hasSchemaOrgContext(schema);
    const hasSchemaOrgTypes = this.hasSchemaOrgTypes(schema);

    if (!hasSchemaOrgContext && !hasSchemaOrgTypes) {
      suggestions.push('Consider adding Schema.org context for better interoperability');
    }

    // Check for common Schema.org patterns
    const schemaOrgProps = ['name', 'description', 'url', 'identifier'];
    const hasCommonProps = schemaOrgProps.some(prop => 
      schema.properties && schema.properties[prop]
    );

    if (!hasCommonProps) {
      suggestions.push('Consider adding common Schema.org properties (name, description, url)');
    }

    return {
      valid: true,
      warnings,
      suggestions,
      schemaOrgCompliant: hasSchemaOrgContext || hasSchemaOrgTypes,
      score: (hasSchemaOrgContext ? 50 : 0) + (hasCommonProps ? 30 : 0) + 20
    };
  }

  async validateCrossRegistryCompatibility(schema, schemaPath) {
    const errors = [];
    const warnings = [];

    // Check $id format
    if (!schema.$id) {
      errors.push('Missing $id - required for cross-registry resolution');
    } else if (!schema.$id.startsWith('https://')) {
      errors.push('$id must use HTTPS for secure resolution');
    }

    // Check $schema version
    if (!schema.$schema) {
      warnings.push('Missing $schema - recommend JSON Schema Draft 2020-12');
    } else if (!schema.$schema.includes('2020-12')) {
      warnings.push('Consider upgrading to JSON Schema Draft 2020-12');
    }

    // Check for external references
    const externalRefs = this.findExternalReferences(schema);
    externalRefs.forEach(ref => {
      if (!ref.startsWith('https://')) {
        warnings.push(`External reference should use HTTPS: ${ref}`);
      }
    });

    // Check for DIF/W3C standard compliance
    const isDIFCompliant = this.checkDIFCompliance(schema);
    if (!isDIFCompliant.valid) {
      warnings.push('Consider DIF standard alignment for better interoperability');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      crossRegistryReady: errors.length === 0 && warnings.length < 3,
      score: Math.max(0, 100 - (errors.length * 30) - (warnings.length * 10))
    };
  }

  async validateProductionReadiness(schema, schemaPath) {
    const errors = [];
    const warnings = [];
    const checklist = {};

    // Required fields for production
    checklist.hasId = !!schema.$id;
    checklist.hasSchema = !!schema.$schema;
    checklist.hasTitle = !!schema.title;
    checklist.hasDescription = !!schema.description;
    checklist.hasVersion = schema.$id?.includes('/v1/') || !!schema.version;

    // Schema structure checks
    checklist.hasProperties = !!schema.properties;
    checklist.hasRequired = !!schema.required;
    checklist.hasExamples = !!schema.examples;

    // Production URL check
    if (schema.$id && !schema.$id.includes('schemas.originvault.box')) {
      warnings.push('$id should use production domain: schemas.originvault.box');
    }

    // Validate schema itself
    try {
      this.ajv.compile(schema);
      checklist.validSchema = true;
    } catch (error) {
      errors.push(`Invalid schema structure: ${error.message}`);
      checklist.validSchema = false;
    }

    // Calculate readiness score
    const checklistScore = Object.values(checklist).filter(Boolean).length;
    const totalChecks = Object.keys(checklist).length;
    const readinessScore = (checklistScore / totalChecks) * 100;

    return {
      valid: errors.length === 0 && readinessScore >= 80,
      errors,
      warnings,
      checklist,
      readinessScore,
      productionReady: readinessScore >= 90 && errors.length === 0
    };
  }

  // Helper methods
  hasSchemaOrgContext(schema) {
    const context = schema['@context'] || schema.properties?.['@context'];
    if (!context) return false;
    
    const contextStr = JSON.stringify(context);
    return contextStr.includes('schema.org') || contextStr.includes('schema:');
  }

  hasSchemaOrgTypes(schema) {
    const typeStr = JSON.stringify(schema);
    return typeStr.includes('schema:') || 
           typeStr.includes('Person') || 
           typeStr.includes('Organization') ||
           typeStr.includes('CreativeWork');
  }

  findExternalReferences(schema) {
    const refs = [];
    const traverse = (obj) => {
      if (typeof obj !== 'object' || obj === null) return;
      
      if (obj.$ref && obj.$ref.startsWith('http')) {
        refs.push(obj.$ref);
      }
      
      Object.values(obj).forEach(traverse);
    };
    
    traverse(schema);
    return refs;
  }

  checkDIFCompliance(schema) {
    // Basic DIF Presentation Exchange checks
    const difPatterns = [
      'presentation_definition',
      'input_descriptors',
      'format',
      'constraints'
    ];
    
    const schemaStr = JSON.stringify(schema);
    const matches = difPatterns.filter(pattern => 
      schemaStr.includes(pattern)
    );
    
    return {
      valid: matches.length > 0,
      patterns: matches
    };
  }

  calculateOverallScore(results) {
    const scores = Object.values(results)
      .filter(r => r.score !== undefined)
      .map(r => r.score);
    
    if (scores.length === 0) return { valid: false, score: 0 };
    
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const hasErrors = Object.values(results).some(r => 
      r.errors && r.errors.length > 0
    );
    
    return {
      valid: !hasErrors && avgScore >= 70,
      score: Math.round(avgScore),
      grade: this.getGrade(avgScore)
    };
  }

  getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  async loadExternalSchema(uri) {
    // Mock external schema loading
    console.log(`Loading external schema: ${uri}`);
    return { type: 'object' };
  }

  async validateAllSchemas() {
    console.log('🚀 Running Enhanced Schema Validation Framework\n');
    
    const schemaDirs = ['drafts', 'schemas/v1'];
    const allResults = [];
    
    for (const dir of schemaDirs) {
      if (!fs.existsSync(dir)) continue;
      
      const schemas = fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .map(f => path.join(dir, f));
      
      for (const schema of schemas) {
        const result = await this.validateSchema(schema);
        allResults.push(result);
      }
    }
    
    this.generateValidationReport(allResults);
    return allResults;
  }

  generateValidationReport(results) {
    console.log('\n📊 ENHANCED VALIDATION REPORT\n');
    console.log('=' .repeat(60));
    
    const passed = results.filter(r => r.overall?.valid).length;
    const total = results.length;
    const avgScore = results
      .filter(r => r.overall?.score)
      .reduce((acc, r) => acc + r.overall.score, 0) / total;
    
    console.log(`📈 SUMMARY:`);
    console.log(`   Total Schemas: ${total}`);
    console.log(`   Passed: ${passed} (${((passed/total)*100).toFixed(1)}%)`);
    console.log(`   Average Score: ${avgScore.toFixed(1)}/100`);
    console.log(`   Grade: ${this.getGrade(avgScore)}\n`);
    
    // Grade distribution
    const grades = {};
    results.forEach(r => {
      const grade = r.overall?.grade || 'F';
      grades[grade] = (grades[grade] || 0) + 1;
    });
    
    console.log(`📊 GRADE DISTRIBUTION:`);
    Object.entries(grades).forEach(([grade, count]) => {
      console.log(`   ${grade}: ${count} schemas`);
    });
    
    // Top issues
    const allIssues = {};
    results.forEach(r => {
      if (r.results) {
        Object.values(r.results).forEach(rule => {
          if (rule.errors) {
            rule.errors.forEach(error => {
              allIssues[error] = (allIssues[error] || 0) + 1;
            });
          }
        });
      }
    });
    
    console.log(`\n🚨 TOP ISSUES:`);
    Object.entries(allIssues)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([issue, count]) => {
        console.log(`   ${count}x: ${issue}`);
      });
    
    // Recommendations
    console.log(`\n💡 PRIORITY ACTIONS:`);
    console.log(`1. Fix schemas with grade F (${grades.F || 0} schemas)`);
    console.log(`2. Deploy public hosting for schema resolution`);
    console.log(`3. Standardize W3C VC compliance across all credentials`);
    console.log(`4. Add Schema.org context for better interoperability`);
    console.log(`5. Implement automated validation in CI/CD`);
  }
}

// Run validation
if (require.main === module) {
  const framework = new SchemaValidationFramework();
  framework.validateAllSchemas().catch(console.error);
}

module.exports = SchemaValidationFramework; 