# 🔄 QuickType Integration Guide

<div align="center">

**Generate type-safe code from OriginVault schemas in any programming language**

[![QuickType Ready](https://img.shields.io/badge/QuickType-Ready-green.svg)](https://quicktype.io)
[![Languages](https://img.shields.io/badge/Languages-10%2B-blue.svg)](https://quicktype.io/docs/languages)
[![Schema Count](https://img.shields.io/badge/Schemas-22%20Available-orange.svg)](https://schemas.originvault.box)

</div>

---

## 🚀 **Why QuickType + OriginVault?**

### **Instant Type Safety**
Transform JSON schemas into fully-typed code in seconds:
- **Zero manual work** - No hand-coding types
- **Perfect accuracy** - Generated from source schemas
- **Always up-to-date** - Regenerate when schemas change

### **Multi-Language Support**
Generate types for **any programming language**:
- **TypeScript/JavaScript** - Full type safety with interfaces
- **Python** - Dataclasses with validation
- **Go** - Structs with JSON tags
- **C#** - Classes with attributes
- **Java** - POJOs with annotations
- **Rust** - Structs with serde
- **Swift** - Codable structs
- **Kotlin** - Data classes
- **PHP** - Classes with validation
- **Ruby** - Classes with JSON parsing

### **Production-Ready Schemas**
All OriginVault schemas are **QuickType-optimized**:
- **W3C VC 2.0 compliant** - Industry standard format
- **Real-world examples** - Tested with actual data
- **Comprehensive validation** - Built-in constraints and rules

---

## 📦 **Installation**

### **Global Installation**
```bash
npm install -g quicktype
```

### **Project Installation**
```bash
npm install --save-dev quicktype
```

### **Verify Installation**
```bash
quicktype --version
# Should output: quicktype 23.2.6
```

---

## 🎯 **Quick Start Examples**

### **1. Generate TypeScript Types**
```bash
# Single schema
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --out types/ContractCredential.ts \
  --lang typescript

# Multiple schemas
quicktype \
  --src schemas/v1/business/ \
  --out types/business.ts \
  --lang typescript
```

**Generated TypeScript:**
```typescript
export interface ContractCredential {
    "@context": string[];
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: CredentialSubject;
    proof?: Proof;
}

export interface CredentialSubject {
    id: string;
    contractType: ContractType;
    parties: string[];
    terms: string;
    effectiveDate: string;
    expirationDate?: string;
    compensation?: Compensation;
}

export enum ContractType {
    ContentCreation = "ContentCreation",
    Licensing = "Licensing",
    Partnership = "Partnership"
}

export interface Compensation {
    amount: number;
    currency: string;
    paymentSchedule: PaymentSchedule;
}

export enum PaymentSchedule {
    Monthly = "monthly",
    Quarterly = "quarterly",
    Annually = "annually"
}
```

### **2. Generate Python Classes**
```bash
quicktype \
  --src schemas/v1/identity/OrganizationCredential.schema.json \
  --out types/OrganizationCredential.py \
  --lang python
```

**Generated Python:**
```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class OrganizationCredential:
    context: List[str]
    type: List[str]
    issuer: str
    issuance_date: str
    credential_subject: 'CredentialSubject'
    proof: Optional['Proof'] = None

@dataclass
class CredentialSubject:
    id: str
    legal_name: str
    registration_number: str
    tax_id: Optional[str] = None
    address: Optional['Address'] = None

@dataclass
class Address:
    street: str
    city: str
    state: str
    postal_code: str
    country: str
```

### **3. Generate Go Structs**
```bash
quicktype \
  --src schemas/v1/content/CreativeWorkCredential.schema.json \
  --out types/CreativeWorkCredential.go \
  --lang go
```

**Generated Go:**
```go
package types

import (
    "time"
)

type CreativeWorkCredential struct {
    Context           []string         `json:"@context"`
    Type              []string         `json:"type"`
    Issuer            string           `json:"issuer"`
    IssuanceDate      time.Time        `json:"issuanceDate"`
    CredentialSubject CredentialSubject `json:"credentialSubject"`
    Proof             *Proof           `json:"proof,omitempty"`
}

type CredentialSubject struct {
    ID          string            `json:"id"`
    Title       string            `json:"title"`
    Creator     string            `json:"creator"`
    ContentType string            `json:"contentType"`
    License     string            `json:"license"`
    Metadata    map[string]string `json:"metadata,omitempty"`
}
```

---

## 🔧 **Advanced Usage**

### **Generate from URLs**
```bash
# Direct from OriginVault schema registry
quicktype \
  --src https://schemas.originvault.box/v1/business/ContractCredential.schema.json \
  --lang typescript

# Generate types for entire category
quicktype \
  --src https://schemas.originvault.box/v1/business/ \
  --lang python \
  --out business_types.py
```

### **Custom Options**
```bash
# Generate with specific options
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --out types/ContractCredential.ts \
  --just-types \
  --prefer-unions \
  --no-date-times \
  --acronym-style original
```

### **Batch Generation**
```bash
# Generate types for all schemas
for schema in schemas/v1/**/*.schema.json; do
    filename=$(basename "$schema" .schema.json)
    quicktype \
      --src "$schema" \
      --lang typescript \
      --out "types/${filename}.ts"
done
```

---

## 📁 **Schema Categories & Examples**

### **🔐 Identity & Access Schemas**
```bash
# Generate identity types
quicktype \
  --src schemas/v1/identity/ \
  --lang typescript \
  --out types/identity.ts

# Individual schemas
quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang python
quicktype --src schemas/v1/identity/OrganizationCredential.schema.json --lang go
quicktype --src schemas/v1/identity/VaultAccessCredential.schema.json --lang csharp
```

### **🎨 Content & Creation Schemas**
```bash
# Generate content types
quicktype \
  --src schemas/v1/content/ \
  --lang typescript \
  --out types/content.ts

# Individual schemas
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang python
quicktype --src schemas/v1/content/ContentAuthenticityCredential.schema.json --lang go
```

### **📋 Business Workflow Schemas**
```bash
# Generate business workflow types
quicktype \
  --src schemas/v1/business/ \
  --lang typescript \
  --out types/business.ts

# Individual schemas
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang python
quicktype --src schemas/v1/business/EquityGrantCredential.schema.json --lang go
quicktype --src schemas/v1/business/WorkflowExecutionCredential.schema.json --lang csharp
```

---

## 💡 **Real-World Examples**

### **Complete Business Workflow**
```typescript
// 1. Generate types
// quicktype --src schemas/v1/business/ --lang typescript --out types/business.ts

import { 
  OrganizationCredential, 
  ContractCredential, 
  WorkflowExecutionCredential 
} from './types/business';

// 2. Create organization
const orgCredential: OrganizationCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "OrganizationCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": "2025-01-14T10:00:00Z",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:acme-corp",
    "legalName": "Acme Corporation",
    "registrationNumber": "123456789",
    "taxId": "12-3456789"
  }
};

// 3. Issue contract
const contractCredential: ContractCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ContractCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": "2025-01-14T10:30:00Z",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:contract-456",
    "contractType": "ContentCreation",
    "parties": [
      "did:cheqd:mainnet:acme-corp",
      "did:cheqd:mainnet:creator-789"
    ],
    "terms": "Exclusive content creation agreement...",
    "effectiveDate": "2025-01-14T00:00:00Z",
    "compensation": {
      "amount": 5000,
      "currency": "USD",
      "paymentSchedule": "monthly"
    }
  }
};

// 4. Track workflow
const workflowCredential: WorkflowExecutionCredential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "WorkflowExecutionCredential"],
  "credentialSubject": {
    "id": "did:cheqd:mainnet:workflow-789",
    "workflowType": "ContractIssuance",
    "status": "completed",
    "steps": [
      {
        "step": "organization_verification",
        "status": "completed",
        "timestamp": "2025-01-14T10:00:00Z"
      },
      {
        "step": "contract_issuance",
        "status": "completed",
        "timestamp": "2025-01-14T10:30:00Z"
      }
    ]
  }
};
```

### **Python Implementation**
```python
# Generate types: quicktype --src schemas/v1/business/ --lang python --out business_types.py

from business_types import OrganizationCredential, ContractCredential, WorkflowExecutionCredential
from datetime import datetime
from typing import List

# Create organization credential
org_credential = OrganizationCredential(
    context=["https://www.w3.org/2018/credentials/v1"],
    type=["VerifiableCredential", "OrganizationCredential"],
    issuer="did:cheqd:mainnet:originvault",
    issuance_date=datetime.now().isoformat(),
    credential_subject=CredentialSubject(
        id="did:cheqd:mainnet:acme-corp",
        legal_name="Acme Corporation",
        registration_number="123456789",
        tax_id="12-3456789"
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
        parties=[
            "did:cheqd:mainnet:acme-corp",
            "did:cheqd:mainnet:creator-789"
        ],
        terms="Exclusive content creation agreement...",
        effective_date=datetime.now().isoformat(),
        compensation=Compensation(
            amount=5000,
            currency="USD",
            payment_schedule="monthly"
        )
    )
)
```

### **Go Implementation**
```go
// Generate types: quicktype --src schemas/v1/business/ --lang go --out business_types.go

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
            TaxID:             "12-3456789",
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
                "did:cheqd:mainnet:acme-corp",
                "did:cheqd:mainnet:creator-789",
            },
            Terms:        "Exclusive content creation agreement...",
            EffectiveDate: "2025-01-14T00:00:00Z",
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

## 🔧 **Integration Patterns**

### **CI/CD Pipeline Integration**
```yaml
# .github/workflows/generate-types.yml
name: Generate Types

on:
  push:
    paths: ['schemas/**/*.schema.json']

jobs:
  generate-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install QuickType
        run: npm install -g quicktype
        
      - name: Generate TypeScript Types
        run: |
          quicktype \
            --src schemas/v1/ \
            --lang typescript \
            --out types/generated.ts
            
      - name: Generate Python Types
        run: |
          quicktype \
            --src schemas/v1/ \
            --lang python \
            --out types/generated.py
            
      - name: Commit Generated Types
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add types/
          git commit -m "chore: regenerate types from schemas" || exit 0
          git push
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "generate-types": "quicktype --src schemas/v1/ --lang typescript --out types/generated.ts",
    "generate-types:python": "quicktype --src schemas/v1/ --lang python --out types/generated.py",
    "generate-types:go": "quicktype --src schemas/v1/ --lang go --out types/generated.go",
    "generate-types:all": "npm run generate-types && npm run generate-types:python && npm run generate-types:go"
  }
}
```

### **IDE Integration**
```json
// .vscode/settings.json
{
  "quicktype.autoGenerate": true,
  "quicktype.languages": ["typescript", "python", "go"],
  "quicktype.outputDirectory": "./types",
  "quicktype.sourceDirectory": "./schemas"
}
```

---

## 🎯 **Best Practices**

### **1. Version Control**
- **Commit generated types** to version control
- **Regenerate on schema changes** via CI/CD
- **Use consistent naming** conventions

### **2. Type Organization**
```bash
# Organize by category
types/
├── identity/
│   ├── PersonCredential.ts
│   ├── OrganizationCredential.ts
│   └── VaultAccessCredential.ts
├── business/
│   ├── ContractCredential.ts
│   ├── EquityGrantCredential.ts
│   └── WorkflowExecutionCredential.ts
└── content/
    ├── CreativeWorkCredential.ts
    └── ContentAuthenticityCredential.ts
```

### **3. Import Strategies**
```typescript
// Import individual types
import { ContractCredential } from './types/business/ContractCredential';

// Import category bundles
import * as BusinessTypes from './types/business';

// Import all types
import * as AllTypes from './types/generated';
```

### **4. Validation Integration**
```typescript
// Use generated types with validation libraries
import { ContractCredential } from './types/ContractCredential';
import { validate } from 'jsonschema';

const schema = require('./schemas/v1/business/ContractCredential.schema.json');

function validateContract(data: any): ContractCredential {
  const result = validate(data, schema);
  if (result.valid) {
    return data as ContractCredential;
  }
  throw new Error(`Invalid contract: ${result.errors.join(', ')}`);
}
```

---

## 🚀 **Advanced Features**

### **Custom Type Names**
```bash
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --out types/Contract.ts \
  --type-name Contract
```

### **Union Types**
```bash
quicktype \
  --src schemas/v1/ \
  --lang typescript \
  --out types/AllCredentials.ts \
  --prefer-unions \
  --union-type-name Credential
```

### **Date Handling**
```bash
# Use strings for dates
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --no-date-times

# Use native date types
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --date-times
```

---

## 📚 **Language-Specific Guides**

### **TypeScript/JavaScript**
- [TypeScript Guide](https://quicktype.io/docs/typescript)
- [JavaScript Guide](https://quicktype.io/docs/javascript)

### **Python**
- [Python Guide](https://quicktype.io/docs/python)
- [Dataclasses Guide](https://quicktype.io/docs/python-dataclasses)

### **Go**
- [Go Guide](https://quicktype.io/docs/go)
- [Structs Guide](https://quicktype.io/docs/go-structs)

### **C#**
- [C# Guide](https://quicktype.io/docs/csharp)
- [Classes Guide](https://quicktype.io/docs/csharp-classes)

### **Java**
- [Java Guide](https://quicktype.io/docs/java)
- [POJOs Guide](https://quicktype.io/docs/java-pojos)

---

## 🤝 **Support & Community**

### **QuickType Resources**
- **[QuickType Website](https://quicktype.io)** - Online type generator
- **[QuickType Docs](https://quicktype.io/docs)** - Complete documentation
- **[QuickType GitHub](https://github.com/quicktype/quicktype)** - Source code

### **OriginVault Resources**
- **[Schema Registry](https://schemas.originvault.box)** - All schemas
- **[Documentation](https://docs.originvault.box)** - Complete guides
- **[GitHub Issues](https://github.com/originvault/originvault-schema-registry/issues)** - Report problems

### **Community**
- **[Discord](https://discord.gg/originvault)** - Chat with developers
- **[Twitter](https://twitter.com/originvault)** - Latest updates
- **[Blog](https://blog.originvault.box)** - Tutorials and insights

---

<div align="center">

**Ready to generate type-safe code from OriginVault schemas?**

[**🚀 Get Started**](#quick-start) • [**📖 View Examples**](#real-world-examples) • [**🔧 Advanced Usage**](#advanced-usage)

</div>
