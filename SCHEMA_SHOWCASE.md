# 🎯 OriginVault Schema Showcase

<div align="center">

**Production-ready verifiable credential schemas with instant QuickType integration**

[![Schema Count](https://img.shields.io/badge/schemas-22%20production-blue.svg)](https://schemas.originvault.box)
[![QuickType Ready](https://img.shields.io/badge/QuickType-Ready-green.svg)](https://quicktype.io)
[![W3C VC 2.0](https://img.shields.io/badge/W3C%20VC-2.0%20Compliant-orange.svg)](https://www.w3.org/TR/vc-data-model-2.0/)
[![Languages](https://img.shields.io/badge/Languages-10%2B%20Supported-purple.svg)](https://quicktype.io/docs/languages)

</div>

---

## 🚀 **Instant Type Generation**

### **One Command, Any Language**
```bash
# Install QuickType
npm install -g quicktype

# Generate TypeScript types
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang typescript

# Generate Python classes  
quicktype --src schemas/v1/identity/OrganizationCredential.schema.json --lang python

# Generate Go structs
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang go

# Generate C# classes
quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json --lang csharp

# Generate Java POJOs
quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang java

# Generate Rust structs
quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json --lang rust
```

### **Batch Generation for All Schemas**
```bash
# Generate TypeScript for all schemas
quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts

# Generate Python for all schemas
quicktype --src schemas/v1/ --lang python --out types/all-schemas.py

# Generate Go for all schemas
quicktype --src schemas/v1/ --lang go --out types/all-schemas.go
```

---

## 📋 **Schema Categories Showcase**

### 🔐 **Identity & Access Management** (6 schemas)

#### **OrganizationCredential** - Business Entity Verification
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "OrganizationCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": "2025-01-14T10:00:00Z",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:acme-corp",
    "legalName": "Acme Corporation",
    "registrationNumber": "123456789",
    "taxId": "12-3456789",
    "address": {
      "street": "123 Business Ave",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94105",
      "country": "US"
    }
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/identity/OrganizationCredential.schema.json --lang typescript
```

**Generated TypeScript:**
```typescript
export interface OrganizationCredential {
    "@context": string[];
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: OrganizationCredentialSubject;
    proof?: Proof;
}

export interface OrganizationCredentialSubject {
    id: string;
    legalName: string;
    registrationNumber: string;
    taxId?: string;
    address?: Address;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
```

#### **PersonCredential** - Individual Identity
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "PersonCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:person-123",
    "givenName": "John",
    "familyName": "Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "nationality": "US"
  }
}
```

### 📋 **Business Workflow Automation** (7 schemas)

#### **ContractCredential** - Legal Contract Execution
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ContractCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:contract-456",
    "contractType": "ContentCreation",
    "parties": [
      "did:cheqd:mainnet:acme-corp",
      "did:cheqd:mainnet:creator-789"
    ],
    "terms": "Exclusive content creation agreement...",
    "effectiveDate": "2025-01-14T00:00:00Z",
    "expirationDate": "2025-12-31T23:59:59Z",
    "compensation": {
      "amount": 5000,
      "currency": "USD",
      "paymentSchedule": "monthly"
    }
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang python
```

**Generated Python:**
```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class ContractCredential:
    context: List[str]
    type: List[str]
    issuer: str
    issuance_date: str
    credential_subject: 'ContractCredentialSubject'
    proof: Optional['Proof'] = None

@dataclass
class ContractCredentialSubject:
    id: str
    contract_type: str
    parties: List[str]
    terms: str
    effective_date: str
    expiration_date: Optional[str] = None
    compensation: Optional['Compensation'] = None

@dataclass
class Compensation:
    amount: float
    currency: str
    payment_schedule: str
```

#### **EquityGrantCredential** - Equity Compensation
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "EquityGrantCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:equity-grant-789",
    "grantee": "did:cheqd:mainnet:creator-123",
    "grantor": "did:cheqd:mainnet:acme-corp",
    "equityType": "RestrictedMembershipUnits",
    "totalUnits": 2100,
    "vestingSchedule": {
      "type": "cliff",
      "cliffPeriod": "12 months",
      "vestingPeriod": "48 months"
    },
    "grantDate": "2025-01-14T00:00:00Z"
  }
}
```

#### **WorkflowExecutionCredential** - Multi-Step Workflow Tracking
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "WorkflowExecutionCredential"],
  "credentialSubject": {
    "id": "did:cheqd:mainnet:workflow-456",
    "workflowType": "ContractIssuance",
    "status": "completed",
    "initiatedBy": "did:cheqd:mainnet:admin-123",
    "steps": [
      {
        "step": "organization_verification",
        "status": "completed",
        "timestamp": "2025-01-14T10:00:00Z",
        "executedBy": "did:cheqd:mainnet:verifier-456"
      },
      {
        "step": "contract_issuance",
        "status": "completed", 
        "timestamp": "2025-01-14T10:30:00Z",
        "executedBy": "did:cheqd:mainnet:issuer-789"
      }
    ]
  }
}
```

### 🎨 **Content & Creation Management** (3 schemas)

#### **CreativeWorkCredential** - Content Ownership
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "CreativeWorkCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:content-123",
    "title": "Amazing Creative Work",
    "creator": "did:cheqd:mainnet:creator-456",
    "contentType": "video",
    "license": "exclusive",
    "metadata": {
      "duration": "00:05:30",
      "resolution": "4K",
      "format": "MP4",
      "fileSize": "2.5GB"
    },
    "createdAt": "2025-01-14T09:00:00Z"
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang go
```

**Generated Go:**
```go
package types

import (
    "time"
)

type CreativeWorkCredential struct {
    Context           []string                `json:"@context"`
    Type              []string                `json:"type"`
    Issuer            string                  `json:"issuer"`
    IssuanceDate      time.Time               `json:"issuanceDate"`
    CredentialSubject CreativeWorkSubject     `json:"credentialSubject"`
    Proof             *Proof                  `json:"proof,omitempty"`
}

type CreativeWorkSubject struct {
    ID          string            `json:"id"`
    Title       string            `json:"title"`
    Creator     string            `json:"creator"`
    ContentType string            `json:"contentType"`
    License     string            `json:"license"`
    Metadata    map[string]string `json:"metadata,omitempty"`
    CreatedAt   time.Time         `json:"createdAt"`
}
```

#### **ContentAuthenticityCredential** - Content Integrity
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ContentAuthenticityCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:authenticity-456",
    "contentId": "did:cheqd:mainnet:content-123",
    "hashAlgorithm": "SHA-256",
    "contentHash": "a1b2c3d4e5f6...",
    "signatureAlgorithm": "Ed25519",
    "signature": "sig123...",
    "verifiedAt": "2025-01-14T10:00:00Z"
  }
}
```

### 🤝 **Trust & Verification Systems** (2 schemas)

#### **TrustedIssuerCredential** - Trust Network Management
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "TrustedIssuerCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:issuer-123",
    "issuerName": "Trusted Verification Corp",
    "issuerType": "KYCProvider",
    "accreditationLevel": "Level2",
    "accreditationBody": "DIF",
    "accreditationDate": "2024-06-01T00:00:00Z",
    "expirationDate": "2025-06-01T00:00:00Z",
    "trustScore": 95
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json --lang csharp
```

**Generated C#:**
```csharp
using System;
using System.Collections.Generic;

namespace OriginVault.Types
{
    public class TrustedIssuerCredential
    {
        public List<string> Context { get; set; }
        public List<string> Type { get; set; }
        public string Issuer { get; set; }
        public DateTime IssuanceDate { get; set; }
        public TrustedIssuerSubject CredentialSubject { get; set; }
        public Proof Proof { get; set; }
    }

    public class TrustedIssuerSubject
    {
        public string Id { get; set; }
        public string IssuerName { get; set; }
        public string IssuerType { get; set; }
        public string AccreditationLevel { get; set; }
        public string AccreditationBody { get; set; }
        public DateTime AccreditationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int TrustScore { get; set; }
    }
}
```

### 💰 **Payments & Economics** (2 schemas)

#### **PaymentCredential** - Payment Verification
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "PaymentCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:payment-789",
    "payer": "did:cheqd:mainnet:acme-corp",
    "payee": "did:cheqd:mainnet:creator-456",
    "amount": 5000.00,
    "currency": "USD",
    "paymentMethod": "bank_transfer",
    "transactionId": "txn_123456789",
    "status": "completed",
    "processedAt": "2025-01-14T15:30:00Z"
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang java
```

**Generated Java:**
```java
package com.originvault.types;

import java.time.OffsetDateTime;
import java.util.List;

public class PaymentCredential {
    private List<String> context;
    private List<String> type;
    private String issuer;
    private OffsetDateTime issuanceDate;
    private PaymentSubject credentialSubject;
    private Proof proof;

    // Getters and setters
    public List<String> getContext() { return context; }
    public void setContext(List<String> context) { this.context = context; }
    
    public List<String> getType() { return type; }
    public void setType(List<String> type) { this.type = type; }
    
    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }
    
    public OffsetDateTime getIssuanceDate() { return issuanceDate; }
    public void setIssuanceDate(OffsetDateTime issuanceDate) { this.issuanceDate = issuanceDate; }
    
    public PaymentSubject getCredentialSubject() { return credentialSubject; }
    public void setCredentialSubject(PaymentSubject credentialSubject) { this.credentialSubject = credentialSubject; }
    
    public Proof getProof() { return proof; }
    public void setProof(Proof proof) { this.proof = proof; }
}

public class PaymentSubject {
    private String id;
    private String payer;
    private String payee;
    private double amount;
    private String currency;
    private String paymentMethod;
    private String transactionId;
    private String status;
    private OffsetDateTime processedAt;

    // Getters and setters
    // ... (similar pattern for all fields)
}
```

### 🔌 **Platform & Services** (2 schemas)

#### **PluginEndorsementCredential** - Plugin Verification
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "PluginEndorsementCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:plugin-endorsement-123",
    "pluginId": "did:cheqd:mainnet:plugin-456",
    "pluginName": "Advanced Content Editor",
    "developer": "did:cheqd:mainnet:developer-789",
    "endorsementLevel": "verified",
    "securityScore": 92,
    "performanceScore": 88,
    "endorsedAt": "2025-01-14T12:00:00Z",
    "expiresAt": "2026-01-14T12:00:00Z"
  }
}
```

**QuickType Generation:**
```bash
quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json --lang rust
```

**Generated Rust:**
```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginEndorsementCredential {
    #[serde(rename = "@context")]
    pub context: Vec<String>,
    #[serde(rename = "type")]
    pub type_field: Vec<String>,
    pub issuer: String,
    pub issuance_date: DateTime<Utc>,
    pub credential_subject: PluginEndorsementSubject,
    pub proof: Option<Proof>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginEndorsementSubject {
    pub id: String,
    pub plugin_id: String,
    pub plugin_name: String,
    pub developer: String,
    pub endorsement_level: String,
    pub security_score: i64,
    pub performance_score: i64,
    pub endorsed_at: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
}
```

---

## 🌟 **Complete Workflow Example**

### **Business Contract Workflow with Type Safety**

#### **1. Generate All Types**
```bash
# Generate TypeScript types for business workflow
quicktype --src schemas/v1/business/ --lang typescript --out types/business-workflow.ts

# Generate Python types
quicktype --src schemas/v1/business/ --lang python --out types/business_workflow.py

# Generate Go types
quicktype --src schemas/v1/business/ --lang go --out types/business_workflow.go
```

#### **2. TypeScript Implementation**
```typescript
import { 
  OrganizationCredential, 
  ContractCredential, 
  WorkflowExecutionCredential,
  EquityGrantCredential 
} from './types/business-workflow';

// Step 1: Create organization
const createOrganization = (): OrganizationCredential => ({
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "OrganizationCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": "did:cheqd:mainnet:acme-corp",
    "legalName": "Acme Corporation",
    "registrationNumber": "123456789",
    "taxId": "12-3456789"
  }
});

// Step 2: Issue contract
const createContract = (orgId: string, creatorId: string): ContractCredential => ({
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ContractCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": `did:cheqd:mainnet:contract-${Date.now()}`,
    "contractType": "ContentCreation",
    "parties": [orgId, creatorId],
    "terms": "Exclusive content creation agreement...",
    "effectiveDate": new Date().toISOString(),
    "compensation": {
      "amount": 5000,
      "currency": "USD",
      "paymentSchedule": "monthly"
    }
  }
});

// Step 3: Grant equity
const grantEquity = (creatorId: string, orgId: string): EquityGrantCredential => ({
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "EquityGrantCredential"],
  "issuer": "did:cheqd:mainnet:originvault",
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": `did:cheqd:mainnet:equity-grant-${Date.now()}`,
    "grantee": creatorId,
    "grantor": orgId,
    "equityType": "RestrictedMembershipUnits",
    "totalUnits": 2100,
    "vestingSchedule": {
      "type": "cliff",
      "cliffPeriod": "12 months",
      "vestingPeriod": "48 months"
    },
    "grantDate": new Date().toISOString()
  }
});

// Step 4: Track workflow
const trackWorkflow = (steps: string[]): WorkflowExecutionCredential => ({
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "WorkflowExecutionCredential"],
  "credentialSubject": {
    "id": `did:cheqd:mainnet:workflow-${Date.now()}`,
    "workflowType": "ContractIssuance",
    "status": "completed",
    "initiatedBy": "did:cheqd:mainnet:admin-123",
    "steps": steps.map((step, index) => ({
      "step": step,
      "status": "completed",
      "timestamp": new Date().toISOString(),
      "executedBy": "did:cheqd:mainnet:system"
    }))
  }
});

// Execute complete workflow
const executeBusinessWorkflow = () => {
  const orgCredential = createOrganization();
  const contractCredential = createContract(orgCredential.credentialSubject.id, "did:cheqd:mainnet:creator-789");
  const equityCredential = grantEquity("did:cheqd:mainnet:creator-789", orgCredential.credentialSubject.id);
  const workflowCredential = trackWorkflow([
    "organization_verification",
    "contract_issuance", 
    "equity_grant"
  ]);

  return {
    organization: orgCredential,
    contract: contractCredential,
    equity: equityCredential,
    workflow: workflowCredential
  };
};
```

#### **3. Python Implementation**
```python
from business_workflow import (
    OrganizationCredential, 
    ContractCredential, 
    WorkflowExecutionCredential,
    EquityGrantCredential
)
from datetime import datetime
from typing import List

def create_organization() -> OrganizationCredential:
    return OrganizationCredential(
        context=["https://www.w3.org/2018/credentials/v1"],
        type=["VerifiableCredential", "OrganizationCredential"],
        issuer="did:cheqd:mainnet:originvault",
        issuance_date=datetime.now().isoformat(),
        credential_subject=OrganizationCredentialSubject(
            id="did:cheqd:mainnet:acme-corp",
            legal_name="Acme Corporation",
            registration_number="123456789",
            tax_id="12-3456789"
        )
    )

def create_contract(org_id: str, creator_id: str) -> ContractCredential:
    return ContractCredential(
        context=["https://www.w3.org/2018/credentials/v1"],
        type=["VerifiableCredential", "ContractCredential"],
        issuer="did:cheqd:mainnet:originvault",
        issuance_date=datetime.now().isoformat(),
        credential_subject=ContractCredentialSubject(
            id=f"did:cheqd:mainnet:contract-{int(datetime.now().timestamp())}",
            contract_type="ContentCreation",
            parties=[org_id, creator_id],
            terms="Exclusive content creation agreement...",
            effective_date=datetime.now().isoformat(),
            compensation=Compensation(
                amount=5000.0,
                currency="USD",
                payment_schedule="monthly"
            )
        )
    )

def execute_business_workflow():
    org_credential = create_organization()
    contract_credential = create_contract(
        org_credential.credential_subject.id, 
        "did:cheqd:mainnet:creator-789"
    )
    
    return {
        "organization": org_credential,
        "contract": contract_credential
    }
```

#### **4. Go Implementation**
```go
package main

import (
    "time"
    "./types"
)

func createOrganization() types.OrganizationCredential {
    return types.OrganizationCredential{
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
}

func createContract(orgID, creatorID string) types.ContractCredential {
    return types.ContractCredential{
        Context: []string{"https://www.w3.org/2018/credentials/v1"},
        Type:    []string{"VerifiableCredential", "ContractCredential"},
        Issuer:  "did:cheqd:mainnet:originvault",
        IssuanceDate: time.Now(),
        CredentialSubject: types.ContractCredentialSubject{
            ID:           "did:cheqd:mainnet:contract-123",
            ContractType: "ContentCreation",
            Parties: []string{orgID, creatorID},
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

func executeBusinessWorkflow() map[string]interface{} {
    orgCredential := createOrganization()
    contractCredential := createContract(
        orgCredential.CredentialSubject.ID,
        "did:cheqd:mainnet:creator-789",
    )

    return map[string]interface{}{
        "organization": orgCredential,
        "contract":     contractCredential,
    }
}
```

---

## 🔧 **Advanced QuickType Features**

### **Custom Type Names**
```bash
# Generate with custom type names
quicktype \
  --src schemas/v1/business/ContractCredential.schema.json \
  --lang typescript \
  --out types/Contract.ts \
  --type-name Contract
```

### **Union Types for All Credentials**
```bash
# Generate union type for all credentials
quicktype \
  --src schemas/v1/ \
  --lang typescript \
  --out types/AllCredentials.ts \
  --prefer-unions \
  --union-type-name Credential
```

### **Date Handling Options**
```bash
# Use strings for dates (default)
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

### **Generate from URLs**
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

## 🎯 **Why OriginVault Schemas?**

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

<div align="center">

**Ready to build type-safe verifiable business processes?**

[**🚀 Generate Types Now**](#instant-type-generation) • [**📖 View Examples**](#complete-workflow-example) • [**🔧 Advanced Features**](#advanced-quicktype-features)

</div>
