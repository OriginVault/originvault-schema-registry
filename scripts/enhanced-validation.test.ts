import { describe, it, expect } from 'vitest';
import { EnhancedSchemaValidator } from './enhanced-validation';

describe('EnhancedSchemaValidator', () => {
  it('should instantiate correctly', () => {
    const validator = new EnhancedSchemaValidator();
    expect(validator).toBeInstanceOf(EnhancedSchemaValidator);
  });

  it('should validate W3C compliance correctly', () => {
    const validator = new EnhancedSchemaValidator();
    const validSchema = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential"],
      "issuer": "did:example:123",
      "issuanceDate": "2023-01-01T00:00:00Z",
      "credentialSubject": {
        "id": "did:example:456"
      }
    };
    
    const result = validator.validateW3CCompliance(validSchema);
    expect(result.isValid).toBe(true);
  });

  it('should identify non-compliant schemas', () => {
    const validator = new EnhancedSchemaValidator();
    const invalidSchema = {
      "type": "Credential",
      "issuer": "example.com"
    };
    
    const result = validator.validateW3CCompliance(invalidSchema);
    expect(result.isValid).toBe(false);
  });

  it('should validate Schema.org alignment', () => {
    const validator = new EnhancedSchemaValidator();
    const alignedSchema = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://schema.org/"
      ],
      "type": ["VerifiableCredential", "Person"],
      "credentialSubject": {
        "type": "Person",
        "name": "John Doe"
      }
    };
    
    const result = validator.validateSchemaOrgAlignment(alignedSchema);
    expect(result.isValid).toBe(true);
  });

  it('should validate cross-registry compatibility', () => {
    const validator = new EnhancedSchemaValidator();
    const compatibleSchema = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential"],
      "issuer": "did:example:123",
      "credentialSubject": {
        "id": "did:example:456"
      }
    };
    
    const result = validator.validateCrossRegistryCompatibility(compatibleSchema);
    expect(result.isValid).toBe(true);
  });

  it('should validate production readiness', () => {
    const validator = new EnhancedSchemaValidator();
    const productionSchema = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential"],
      "issuer": "did:example:123",
      "issuanceDate": "2023-01-01T00:00:00Z",
      "credentialSubject": {
        "id": "did:example:456"
      }
    };
    
    const result = validator.validateProductionReadiness(productionSchema);
    expect(result.isValid).toBe(true);
  });

  it('should validate security compliance', () => {
    const validator = new EnhancedSchemaValidator();
    const secureSchema = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential"],
      "issuer": "did:example:123",
      "credentialSubject": {
        "id": "did:example:456"
      }
    };
    
    const result = validator.validateSecurityCompliance(secureSchema);
    expect(result.isValid).toBe(true);
  });

  it('should generate reports correctly', () => {
    const validator = new EnhancedSchemaValidator();
    const schemas = [
      {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        "type": ["VerifiableCredential"],
        "issuer": "did:example:123",
        "credentialSubject": { "id": "did:example:456" }
      }
    ];
    
    const report = validator.generateReport(schemas);
    expect(report).toHaveProperty('summary');
    expect(report).toHaveProperty('details');
  });

  it('should generate recommendations', () => {
    const validator = new EnhancedSchemaValidator();
    const schemas = [
      {
        "type": "Credential",
        "issuer": "example.com"
      }
    ];
    
    const recommendations = validator.generateRecommendations(schemas);
    expect(Array.isArray(recommendations)).toBe(true);
  });
}); 