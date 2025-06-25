# 🏛️ OriginVault Schema Registry

<div align="center">

![OriginVault Logo](https://gray-objective-tiglon-784.mypinata.cloud/ipfs/Qma7EjPPPfomzEKkYcJa2ctEFPUhHaMwiojTR1wTQPg2x8)

**Type-safe, verifiable credential schemas for the decentralized creator economy**

[![Schema Count](https://img.shields.io/badge/schemas-22%20production-blue.svg)](https://schemas.originvault.box)
[![QuickType Ready](https://img.shields.io/badge/QuickType-Ready-green.svg)](https://quicktype.io)
[![W3C VC 2.0](https://img.shields.io/badge/W3C%20VC-2.0%20Compliant-orange.svg)](https://www.w3.org/TR/vc-data-model-2.0/)
[![DIF Standards](https://img.shields.io/badge/DIF-Standards%20Compliant-purple.svg)](https://identity.foundation/)

[**📖 Documentation**](#documentation) • [**🚀 Quick Start**](#quick-start) • [**🔧 QuickType Integration**](#quicktype-integration) • [**📋 Schema Categories**](#schema-categories)

</div>

---

## 🚀 **Quick Start with QuickType**

### **Generate Types in Any Language**
```bash
# Install QuickType
npm install -g quicktype

# Generate TypeScript for all schemas
quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts

# Generate Python for business workflows
quicktype --src schemas/v1/business/ --lang python --out types/business.py

# Generate Go for identity management
quicktype --src schemas/v1/identity/ --lang go --out types/identity.go

# Generate C# for trust systems
quicktype --src schemas/v1/trust/ --lang csharp --out types/Trust.cs

# Generate Java for payments
quicktype --src schemas/v1/payments/ --lang java --out types/Payments.java

# Generate Rust for platform services
quicktype --src schemas/v1/platform/ --lang rust --out types/platform.rs
```

### **Direct from OriginVault Registry**
```bash
# Generate from hosted schemas
quicktype --src https://schemas.originvault.box/v1/business/ContractCredential.schema.json --lang typescript

# Generate entire category
quicktype --src https://schemas.originvault.box/v1/business/ --lang python --out business_types.py
```

---

## 📋 **Schema Categories**

### 🔐 **Identity & Access Management** (6 schemas)
*Core identity and permission management*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `OriginVaultRootAuthority` | Platform root authority | `quicktype --src schemas/v1/identity/OriginVaultRootAuthority.schema.json --lang typescript` |
| `PersonCredential` | Individual identity verification | `quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang python` |
| `OrganizationCredential` | Business entity verification | `quicktype --src schemas/v1/identity/OrganizationCredential.schema.json --lang go` |
| `VaultAccessCredential` | Vault permission management | `quicktype --src schemas/v1/identity/VaultAccessCredential.schema.json --lang csharp` |
| `AdminCredential` | Administrative privileges | `quicktype --src schemas/v1/identity/AdminCredential.schema.json --lang java` |
| `APIAccessCredential` | API access control | `quicktype --src schemas/v1/identity/APIAccessCredential.schema.json --lang rust` |

### 📋 **Business Workflow Automation** (7 schemas)
*Complete business process automation*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `ContractCredential` | Legal contract execution | `quicktype --src schemas/v1/business/ContractCredential.schema.json --lang typescript` |
| `EquityGrantCredential` | Equity compensation management | `quicktype --src schemas/v1/business/EquityGrantCredential.schema.json --lang python` |
| `WorkflowExecutionCredential` | Multi-step workflow tracking | `quicktype --src schemas/v1/business/WorkflowExecutionCredential.schema.json --lang go` |
| `VerificationReportCredential` | Third-party verification | `quicktype --src schemas/v1/business/VerificationReportCredential.schema.json --lang csharp` |
| `CustomerOnboardingCredential` | Customer setup automation | `quicktype --src schemas/v1/business/CustomerOnboardingCredential.schema.json --lang java` |
| `SustainabilityCredential` | Environmental impact tracking | `quicktype --src schemas/v1/business/SustainabilityCredential.schema.json --lang rust` |
| `RevocationService` | Credential revocation management | `quicktype --src schemas/v1/business/RevocationService.schema.json --lang typescript` |

### 🎨 **Content & Creation Management** (3 schemas)
*Content authenticity and creation workflows*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `CreativeWorkCredential` | Content ownership and metadata | `quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang typescript` |
| `ContentAuthenticityCredential` | Content integrity verification | `quicktype --src schemas/v1/content/ContentAuthenticityCredential.schema.json --lang python` |
| `ContentAIPermissionCredential` | AI usage permissions | `quicktype --src schemas/v1/content/ContentAIPermissionCredential.schema.json --lang go` |

### 🤝 **Trust & Verification Systems** (2 schemas)
*Trust networks and reputation systems*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `TrustedIssuerCredential` | Trusted credential issuers | `quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json --lang csharp` |
| `ReputationCredential` | Reputation scoring and history | `quicktype --src schemas/v1/trust/ReputationCredential.schema.json --lang java` |

### 💰 **Payments & Economics** (2 schemas)
*Financial and economic interactions*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `PaymentCredential` | Payment verification and tracking | `quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang rust` |
| `StorageCredential` | Storage usage and billing | `quicktype --src schemas/v1/payments/StorageCredential.schema.json --lang typescript` |

### 🔌 **Platform & Services** (2 schemas)
*Platform services and integrations*

| Schema | Description | QuickType Command |
|--------|-------------|-------------------|
| `PluginEndorsementCredential` | Plugin verification and trust | `quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json --lang python` |
| `GemCredential` | Platform reward and achievement system | `quicktype --src schemas/v1/platform/GemCredential.schema.json --lang go` |

---

## 💡 **Quick Examples**

### **Business Contract Workflow**
```typescript
// Generate types: quicktype --src schemas/v1/business/ --lang typescript --out types/business.ts

import { 
  OrganizationCredential, 
  ContractCredential, 
  WorkflowExecutionCredential 
} from './types/business';

// Create organization
const orgCredential: OrganizationCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "OrganizationCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": "did:cheqd:mainnet:acme-corp",
    "legalName": "Acme Corporation",
    "registrationNumber": "123456789"
  }
};

// Issue contract
const contractCredential: ContractCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ContractCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": "did:cheqd:mainnet:contract-456",
    "contractType": "ContentCreation",
    "parties": [orgCredential.credentialSubject.id, "did:cheqd:mainnet:creator-789"],
    "terms": "Exclusive content creation agreement...",
    "effectiveDate": new Date().toISOString(),
    "compensation": {
      "amount": 5000,
      "currency": "USD",
      "paymentSchedule": "monthly"
    }
  }
};
```

### **Python Implementation**
```python
# Generate types: quicktype --src schemas/v1/business/ --lang python --out types/business.py

from business_types import OrganizationCredential, ContractCredential
from datetime import datetime

# Create organization credential
org_credential = OrganizationCredential(
    context=["https://www.w3.org/2018/credentials/v1"],
    type=["VerifiableCredential", "OrganizationCredential"],
    issuer="did:cheqd:mainnet:originvault",
    issuance_date=datetime.now().isoformat(),
    credential_subject=OrganizationCredentialSubject(
        id="did:cheqd:mainnet:acme-corp",
        legal_name="Acme Corporation",
        registration_number="123456789"
    )
)

# Create contract credential
contract_credential = ContractCredential(
    context=["https://www.w3.org/2018/credentials/v1"],
    type=["VerifiableCredential", "ContractCredential"],
    issuer="did:cheqd:mainnet:originvault",
    issuance_date=datetime.now().isoformat(),
    credential_subject=ContractCredentialSubject(
        id="did:cheqd:mainnet:contract-456",
        contract_type="ContentCreation",
        parties=[org_credential.credential_subject.id, "did:cheqd:mainnet:creator-789"],
        terms="Exclusive content creation agreement...",
        effective_date=datetime.now().isoformat(),
        compensation=Compensation(
            amount=5000.0,
            currency="USD",
            payment_schedule="monthly"
        )
    )
)
```

### **Go Implementation**
```go
// Generate types: quicktype --src schemas/v1/business/ --lang go --out types/business.go

package main

import (
    "time"
    "./types"
)

func main() {
    // Create organization credential
    orgCredential := types.OrganizationCredential{
        Context: []string{"https://www.w3.org/2018/credentials/v1"},
        Type:    []string{"VerifiableCredential", "OrganizationCredential"},
        Issuer:  "did:cheqd:mainnet:originvault",
        IssuanceDate: time.Now(),
        CredentialSubject: types.OrganizationCredentialSubject{
            ID:                "did:cheqd:mainnet:acme-corp",
            LegalName:         "Acme Corporation",
            RegistrationNumber: "123456789",
        },
    }

    // Create contract credential
    contractCredential := types.ContractCredential{
        Context: []string{"https://www.w3.org/2018/credentials/v1"},
        Type:    []string{"VerifiableCredential", "ContractCredential"},
        Issuer:  "did:cheqd:mainnet:originvault",
        IssuanceDate: time.Now(),
        CredentialSubject: types.ContractCredentialSubject{
            ID:           "did:cheqd:mainnet:contract-456",
            ContractType: "ContentCreation",
            Parties: []string{
                orgCredential.CredentialSubject.ID,
                "did:cheqd:mainnet:creator-789",
            },
            Terms:        "Exclusive content creation agreement...",
            EffectiveDate: time.Now().Format(time.RFC3339),
            Compensation: &types.Compensation{
                Amount:          5000,
                Currency:        "USD",
                PaymentSchedule: "monthly",
            },
        },
    }
}
```

---

## 🔧 **Advanced QuickType Features**

### **Batch Generation**
```bash
# Generate types for all schemas
quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts

# Generate for specific categories
quicktype --src schemas/v1/business/ --lang python --out types/business.py
quicktype --src schemas/v1/identity/ --lang go --out types/identity.go
```

### **Custom Options**
```bash
# Generate with custom type names
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --out types/Contract.ts \
  --type-name Contract

# Generate union types
quicktype \
  --src schemas/v1/ \
  --lang typescript \
  --out types/AllCredentials.ts \
  --prefer-unions \
  --union-type-name Credential
```

### **URL Generation**
```bash
# Generate directly from OriginVault schema registry
quicktype \
  --src https://schemas.originvault.box/v1/business/ContractCredential.schema.json \
  --lang typescript

# Generate entire category from URL
quicktype \
  --src https://schemas.originvault.box/v1/business/ \
  --lang python \
  --out business_types.py
```

---

## 📚 **Documentation**

### **Implementation Guides**
- **[QuickType Integration Guide](docs/guides/QUICKTYPE_INTEGRATION_GUIDE.md)** - Complete QuickType integration with examples
- **[Business Identity Implementation Guide](docs/guides/BUSINESS_IDENTITY_IMPLEMENTATION_GUIDE.md)** - Business identity and contract workflows
- **[Enhanced Integration Guide](docs/guides/ENHANCED_INTEGRATION_GUIDE.md)** - Advanced integration patterns
- **[Performance Optimization Guide](docs/guides/PERFORMANCE_OPTIMIZATION_GUIDE.md)** - Schema performance best practices

### **Architecture Documentation**
- **[Multi-Root Trust Architecture](docs/architecture/MULTI-ROOT-TRUST-ARCHITECTURE.md)** - Trust framework design and implementation

### **Governance & Standards**
- **[BFF Schema Alignment Actions](docs/governance/BFF_SCHEMA_ALIGNMENT_ACTIONS.md)** - Backend-for-Frontend integration strategy
- **[Schema Cleanup Plan](docs/governance/SCHEMA_CLEANUP_PLAN.md)** - Schema maintenance and cleanup procedures
- **[Schema Decisions Summary](docs/governance/SCHEMA_DECISIONS_SUMMARY.md)** - Key schema design decisions

### **Migration & Standards**
- **[Schema Migration Summary](docs/migration/SCHEMA_MIGRATION_SUMMARY.md)** - Version migration procedures
- **[DIF Basic Person Adoption](docs/migration/DIF_BASIC_PERSON_ADOPTION.md)** - DIF standards compliance

---

## 🌟 **Why OriginVault Schemas?**

### **✅ Production Ready**
- **22 production schemas** powering real business workflows
- **W3C VC 2.0 compliant** for maximum interoperability
- **Real-world examples** tested with actual data

### **✅ Developer Friendly**
- **QuickType optimized** for instant type generation
- **Multi-language support** for any tech stack
- **Comprehensive documentation** with examples

### **✅ Business Focused**
- **Complete workflows** from identity to payment
- **Legal compliance** built into schemas
- **Scalable architecture** for enterprise adoption

### **✅ Future Proof**
- **Open standards** for long-term compatibility
- **Extensible design** for custom requirements
- **Active development** with regular updates

---

## 📚 **Additional Resources**

### **External Documentation**
- **[OriginVault Schema Registry](https://schemas.originvault.box)** - Hosted schema registry
- **[QuickType Documentation](https://quicktype.io/docs)** - Complete QuickType guide
- **[W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model-2.0/)** - VC 2.0 specification
- **[DIF Credential Schemas](https://identity.foundation/credential-manifest/)** - DIF standards

### **Community & Support**
- **[GitHub Repository](https://github.com/originvault/originvault-schema-registry)** - Source code and issues
- **[Discord Community](https://discord.gg/originvault)** - Developer discussions
- **[Documentation Issues](https://github.com/originvault/originvault-schema-registry/issues)** - Report documentation problems

---

<div align="center">

**Ready to build type-safe verifiable business processes?**

[**🚀 QuickType Integration Guide**](docs/guides/QUICKTYPE_INTEGRATION_GUIDE.md) • [**📋 Business Implementation**](docs/guides/BUSINESS_IDENTITY_IMPLEMENTATION_GUIDE.md) • [**🏗️ Architecture**](docs/architecture/MULTI-ROOT-TRUST-ARCHITECTURE.md)

</div>
