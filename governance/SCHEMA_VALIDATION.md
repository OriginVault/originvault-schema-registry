# OriginVault Schema Validation System

## Overview

The OriginVault Schema Validation System ensures all schemas in the registry adhere to our design principles, multi-root trust architecture requirements, and quality standards. This system provides automated validation through CI/CD and governance tools.

## 🎯 Design Principles Validated

### Core Principles
1. **Multi-Root Trust Architecture** - Schemas support decentralized trust models
2. **DID Integration** - Proper integration with Decentralized Identifiers
3. **Verifiable Credentials** - W3C compliance for credential schemas
4. **BFF Integration** - Compatibility with Backend-for-Frontend patterns
5. **Semantic Clarity** - Clear documentation and examples

### Extended Principles
6. **Cross-Platform Compatibility** - Schema portability across systems
7. **Extensibility** - Future-proof design patterns
8. **Privacy Preserving** - Privacy-by-design considerations
9. **Audit Trail** - Accountability and traceability
10. **Interoperability** - Standard compliance and integration

## 🔧 Validation Tools

### Schema Validator (`scripts/schema-validator.py`)

A comprehensive Python tool that analyzes schemas against all design principles:

```bash
# Run validation on all schemas
python scripts/schema-validator.py

# Output: Generates governance/schema-validation-report.md
```

#### Features
- **Quality Scoring**: 0.0-1.0 scale based on completeness and standards
- **Principle Coverage**: Tracks which design principles each schema implements
- **BFF Compatibility**: Checks backend integration readiness
- **Multi-Root Support**: Validates trust architecture compliance
- **Issue Detection**: Identifies syntax and structural problems

### GitHub Actions Validation

Automated validation runs on:
- **Push to main/develop**: Immediate feedback on schema changes
- **Pull Requests**: Pre-merge validation with PR comments
- **Weekly Schedule**: Regular health checks
- **Manual Trigger**: On-demand validation

## 📊 Quality Standards

### Minimum Requirements
- **Quality Score**: ≥ 0.65/1.0
- **BFF Compatibility**: ≥ 95% recommended
- **JSON Syntax**: Must be valid JSON
- **Schema Validation**: Must include proper JSON Schema metadata

### Quality Factors
1. **Required Fields**: `$schema`, `$id`, `title`, `description`, `type`, `properties`
2. **Property Descriptions**: All properties should have descriptions
3. **Examples**: Schema should include examples or property examples
4. **Validation Rules**: Proper constraints and validation patterns

## 🏗️ Schema Structure Guidelines

### Basic Schema Template
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.originvault.org/v1/SchemaName.json",
  "title": "Schema Name",
  "description": "Clear description of the schema purpose",
  "type": "object",
  "properties": {
    // Schema properties with descriptions
  },
  "required": ["essential", "properties"],
  "examples": [
    // Example instances
  ]
}
```

### Multi-Root Trust Schema Pattern
```json
{
  "properties": {
    "rootType": {
      "type": "string",
      "description": "Type of trust root (namespace, identity, etc.)"
    },
    "governanceModel": {
      "type": "string",
      "description": "Governance framework for this trust context"
    },
    "delegationChain": {
      "type": "array",
      "description": "Chain of trust delegations"
    },
    "trustChainContext": {
      "type": "object",
      "description": "Context for trust chain validation"
    }
  }
}
```

### BFF Integration Pattern
```json
{
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for database storage"
    },
    "metadata": {
      "type": "object",
      "description": "BFF-specific metadata for processing"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Creation timestamp"
    },
    "updatedAt": {
      "type": "string", 
      "format": "date-time",
      "description": "Last update timestamp"
    },
    "blockchainSync": {
      "type": "object",
      "description": "Blockchain synchronization status"
    }
  }
}
```

## 📋 Validation Report

The validation report provides comprehensive analysis including:

### Summary Statistics
- Total schemas analyzed
- Average quality score
- BFF compatibility percentage
- Multi-root support coverage

### Principle Coverage Analysis
- Percentage of schemas implementing each principle
- Identification of gaps in principle adoption

### Individual Schema Analysis
- Quality score for each schema
- Principle coverage details
- Specific issues and recommendations
- BFF and multi-root compatibility status

## 🔄 Integration with Development Workflow

### Pre-commit Validation
```bash
# Add to .git/hooks/pre-commit
python scripts/schema-validator.py
if [ $? -ne 0 ]; then
  echo "Schema validation failed. Please fix issues before committing."
  exit 1
fi
```

### CI/CD Integration
The GitHub Actions workflow:
1. Validates JSON syntax
2. Runs design principle analysis
3. Checks quality thresholds
4. Comments on PRs with results
5. Uploads detailed reports as artifacts

### Quality Gates
- **Merge Protection**: PRs must pass validation
- **Quality Threshold**: Minimum 0.65/1.0 average score
- **BFF Compatibility**: 95%+ recommended for production

## 🎯 Improving Schema Quality

### Common Issues and Solutions

#### Low Quality Score
- Add missing required fields (`$schema`, `$id`, `title`, `description`)
- Provide property descriptions
- Include examples
- Add proper validation constraints

#### Missing Multi-Root Support
- Add trust context properties
- Include governance model references
- Implement delegation chain support
- Add root authority declarations

#### BFF Integration Issues
- Include standard metadata properties
- Add timestamp fields
- Implement blockchain sync fields
- Ensure database-friendly structure

#### DID Integration Problems
- Use proper DID format patterns
- Include issuer/subject DID fields
- Add DID resolution context
- Follow W3C DID standards

## 📚 Resources

- [Multi-Root Trust Architecture](../MULTI-ROOT-TRUST-ARCHITECTURE.md)
- [Schema BFF ADR Alignment Plan](../../architecture-decision-records/SCHEMA_ADR_BFF_ALIGNMENT_PLAN.md)
- [ADR 0087: QuickType Schema Integration](../../architecture-decision-records/0087-quicktype-schema-integration.md)
- [JSON Schema Specification](https://json-schema.org/)
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)

## 🚀 Future Enhancements

### Planned Features
- **Custom Validation Rules**: Schema-specific validation plugins
- **Performance Analysis**: Schema processing performance metrics
- **Security Scanning**: Vulnerability assessment for schemas
- **Documentation Generation**: Auto-generated schema documentation
- **Version Compatibility**: Cross-version compatibility analysis

### Integration Roadmap
- **IDE Integration**: Real-time validation in development environments
- **Schema Registry API**: Programmatic access to validation results
- **Dashboard**: Web-based schema quality monitoring
- **Automated Fixes**: Suggested improvements and auto-corrections 