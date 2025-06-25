# 🔄 OriginVault Schema Registry - QuickType Showcase

<div align="center">

**Generate type-safe code from OriginVault schemas in any programming language**

[![Schema Count](https://img.shields.io/badge/schemas-22%20production-blue.svg)](https://schemas.originvault.box)
[![QuickType Ready](https://img.shields.io/badge/QuickType-Ready-green.svg)](https://quicktype.io)
[![Languages](https://img.shields.io/badge/Languages-10%2B%20Supported-purple.svg)](https://quicktype.io/docs/languages)
[![W3C VC 2.0](https://img.shields.io/badge/W3C%20VC-2.0%20Compliant-orange.svg)](https://www.w3.org/TR/vc-data-model-2.0/)

</div>

---

## 🚀 **Quick Start**

### **Install QuickType**
```bash
npm install -g quicktype
```

### **Generate Types for Any Schema**
```bash
# Single schema
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang typescript

# All schemas in a category
quicktype --src schemas/v1/business/ --lang python --out types/business.py

# All schemas
quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts
```

---

## 📋 **Schema Categories & QuickType Examples**

### 🔐 **Identity & Access Management** (6 schemas)

#### **OrganizationCredential** - Business Entity Verification
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

**Usage Example:**
```typescript
const orgCredential: OrganizationCredential = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "OrganizationCredential"],
    "issuer": "did:cheqd:mainnet:originvault",
    "issuanceDate": new Date().toISOString(),
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
};
```

#### **PersonCredential** - Individual Identity
```bash
quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang python
```

**Generated Python:**
```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class PersonCredential:
    context: List[str]
    type: List[str]
    issuer: str
    issuance_date: str
    credential_subject: 'PersonCredentialSubject'
    proof: Optional['Proof'] = None

@dataclass
class PersonCredentialSubject:
    id: str
    given_name: str
    family_name: str
    email: str
    date_of_birth: Optional[str] = None
    nationality: Optional[str] = None
```

#### **VaultAccessCredential** - Access Control
```bash
quicktype --src schemas/v1/identity/VaultAccessCredential.schema.json --lang go
```

**Generated Go:**
```go
package types

import (
    "time"
)

type VaultAccessCredential struct {
    Context           []string                `json:"@context"`
    Type              []string                `json:"type"`
    Issuer            string                  `json:"issuer"`
    IssuanceDate      time.Time               `json:"issuanceDate"`
    CredentialSubject VaultAccessSubject      `json:"credentialSubject"`
    Proof             *Proof                  `json:"proof,omitempty"`
}

type VaultAccessSubject struct {
    ID          string   `json:"id"`
    VaultID     string   `json:"vaultId"`
    UserID      string   `json:"userId"`
    Permissions []string `json:"permissions"`
    ExpiresAt   *time.Time `json:"expiresAt,omitempty"`
}
```

### 📋 **Business Workflow Automation** (7 schemas)

#### **ContractCredential** - Legal Contract Execution
```bash
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang csharp
```

**Generated C#:**
```csharp
using System;
using System.Collections.Generic;

namespace OriginVault.Types
{
    public class ContractCredential
    {
        public List<string> Context { get; set; }
        public List<string> Type { get; set; }
        public string Issuer { get; set; }
        public DateTime IssuanceDate { get; set; }
        public ContractSubject CredentialSubject { get; set; }
        public Proof Proof { get; set; }
    }

    public class ContractSubject
    {
        public string Id { get; set; }
        public string ContractType { get; set; }
        public List<string> Parties { get; set; }
        public string Terms { get; set; }
        public DateTime EffectiveDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public Compensation Compensation { get; set; }
    }

    public class Compensation
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string PaymentSchedule { get; set; }
    }
}
```

#### **EquityGrantCredential** - Equity Compensation
```bash
quicktype --src schemas/v1/business/EquityGrantCredential.schema.json --lang java
```

**Generated Java:**
```java
package com.originvault.types;

import java.time.OffsetDateTime;
import java.util.List;

public class EquityGrantCredential {
    private List<String> context;
    private List<String> type;
    private String issuer;
    private OffsetDateTime issuanceDate;
    private EquityGrantSubject credentialSubject;
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
    
    public EquityGrantSubject getCredentialSubject() { return credentialSubject; }
    public void setCredentialSubject(EquityGrantSubject credentialSubject) { this.credentialSubject = credentialSubject; }
    
    public Proof getProof() { return proof; }
    public void setProof(Proof proof) { this.proof = proof; }
}

public class EquityGrantSubject {
    private String id;
    private String grantee;
    private String grantor;
    private String equityType;
    private int totalUnits;
    private VestingSchedule vestingSchedule;
    private OffsetDateTime grantDate;

    // Getters and setters
    // ... (similar pattern for all fields)
}
```

#### **WorkflowExecutionCredential** - Multi-Step Workflow Tracking
```bash
quicktype --src schemas/v1/business/WorkflowExecutionCredential.schema.json --lang rust
```

**Generated Rust:**
```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkflowExecutionCredential {
    #[serde(rename = "@context")]
    pub context: Vec<String>,
    #[serde(rename = "type")]
    pub type_field: Vec<String>,
    pub issuer: String,
    pub issuance_date: DateTime<Utc>,
    pub credential_subject: WorkflowExecutionSubject,
    pub proof: Option<Proof>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkflowExecutionSubject {
    pub id: String,
    pub workflow_type: String,
    pub status: String,
    pub initiated_by: String,
    pub steps: Vec<WorkflowStep>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkflowStep {
    pub step: String,
    pub status: String,
    pub timestamp: DateTime<Utc>,
    pub executed_by: String,
}
```

### 🎨 **Content & Creation Management** (3 schemas)

#### **CreativeWorkCredential** - Content Ownership
```bash
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang typescript
```

**Generated TypeScript:**
```typescript
export interface CreativeWorkCredential {
    "@context": string[];
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: CreativeWorkSubject;
    proof?: Proof;
}

export interface CreativeWorkSubject {
    id: string;
    title: string;
    creator: string;
    contentType: string;
    license: string;
    metadata?: { [key: string]: string };
    createdAt: string;
}
```

#### **ContentAuthenticityCredential** - Content Integrity
```bash
quicktype --src schemas/v1/content/ContentAuthenticityCredential.schema.json --lang python
```

**Generated Python:**
```python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class ContentAuthenticityCredential:
    context: List[str]
    type: List[str]
    issuer: str
    issuance_date: str
    credential_subject: 'ContentAuthenticitySubject'
    proof: Optional['Proof'] = None

@dataclass
class ContentAuthenticitySubject:
    id: str
    content_id: str
    hash_algorithm: str
    content_hash: str
    signature_algorithm: str
    signature: str
    verified_at: str
```

### 🤝 **Trust & Verification Systems** (2 schemas)

#### **TrustedIssuerCredential** - Trust Network Management
```bash
quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json --lang csharp
```

**Generated C#:**
```csharp
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
```

### 💰 **Payments & Economics** (2 schemas)

#### **PaymentCredential** - Payment Verification
```bash
quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang java
```

**Generated Java:**
```java
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
    private BigDecimal amount;
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
```bash
quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json --lang rust
```

**Generated Rust:**
```rust
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

## 🌟 **Complete Business Workflow Example**

### **Generate All Business Types**
```bash
# TypeScript
quicktype --src schemas/v1/business/ --lang typescript --out types/business-workflow.ts

# Python
quicktype --src schemas/v1/business/ --lang python --out types/business_workflow.py

# Go
quicktype --src schemas/v1/business/ --lang go --out types/business_workflow.go
```

### **TypeScript Implementation**
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

### **Python Implementation**
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

### **Go Implementation**
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

[**🚀 Generate Types Now**](#quick-start) • [**📖 View Examples**](#complete-business-workflow-example) • [**🔧 Advanced Features**](#advanced-quicktype-features)

</div> 