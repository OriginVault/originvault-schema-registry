# OriginVault Business Identity & Contract Implementation Guide

## Overview

This guide demonstrates how to implement verifiable business identity and contract issuance using OriginVault's credential schemas. The system enables legally binding contractor agreements with cryptographic proof of organizational authority and automated compliance checking.

## Architecture Components

### Core Credential Types
1. **OrganizationCredential** - Legal business entity verification
2. **ContractCredential** - Contractor agreements and service contracts  
3. **EquityGrantCredential** - Equity compensation and ownership
4. **PersonCredential** - Individual identity (DIF BasicPerson compliant)

### Identity Chain Verification
```
OriginVault DID (Root Trust)
    ↓
OrganizationCredential (Legal Authority)
    ↓
ContractCredential (Business Agreement)
    ↓
EquityGrantCredential (Ownership Stakes)
```

## Implementation Workflow

### Step 1: Establish Organizational Authority

**Issue OriginVault LLC OrganizationCredential**

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schema.org",
    "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
  ],
  "type": ["VerifiableCredential", "OrganizationCredential"],
  "issuer": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a",
  "validFrom": "2025-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "org:originvault-llc-2025",
    "type": "Organization",
    "legalName": "OriginVault, LLC",
    "alternateName": "OriginVault",
    "description": "Decentralized identity and verifiable credentials platform",
    "entityType": "LLC",
    "jurisdiction": "Delaware, United States",
    "incorporationDate": "2024-03-15",
    "businessRegistration": {
      "registrationNumber": "7891234",
      "issuingAuthority": "Delaware Division of Corporations",
      "registrationDate": "2024-03-15"
    },
    "addresses": [{
      "type": "registered",
      "streetAddress": "123 Innovation Drive",
      "addressLocality": "Wilmington",
      "addressRegion": "DE",
      "postalCode": "19801",
      "addressCountry": "US"
    }],
    "contactChannels": [{
      "type": "business-email",
      "identifier": "legal@originvault.io"
    }],
    "beneficialOwnership": [{
      "ownerDID": "did:cheqd:mainnet:luke-nispel-founder",
      "ownerName": "Luke Nispel",
      "ownershipPercentage": 100,
      "ownershipType": "direct",
      "roleType": "founder"
    }],
    "contractingAuthority": {
      "hasContractingPower": true,
      "authorizedSigners": [{
        "signerDID": "did:cheqd:mainnet:luke-nispel-founder",
        "name": "Luke Nispel",
        "title": "Founder",
        "authorizationScope": ["service-contracts", "equity-grants", "partnerships"],
        "maxContractValue": 1000000,
        "currency": "USD"
      }],
      "delegationPolicy": "founder-approval-required",
      "auditRequirements": ["quarterly-review", "legal-compliance-check"]
    },
    "complianceFramework": {
      "applicableRegulations": ["Delaware-LLC-Law", "US-Securities-Law"],
      "reportingRequirements": ["annual-filing", "beneficial-ownership-disclosure"],
      "lastComplianceReview": "2025-01-01"
    }
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2025-01-01T00:00:00Z",
    "verificationMethod": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a#key-1",
    "proofPurpose": "assertionMethod"
  }
}
```

### Step 2: Issue Service Contract

**Example Contractor Creative Work Contract**

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schema.org",
    "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
  ],
  "type": ["VerifiableCredential", "ContractCredential"],
  "issuer": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a",
  "validFrom": "2025-06-02T00:00:00Z",
  "validUntil": "2025-06-29T23:59:59Z",
  "credentialSubject": {
    "id": "contract:originvault:example-contractor-2025-001",
    "type": "Contract",
    "contractType": "creative-work",
    "title": "Creative Work Contract: Post-Launch Roadmap & Revenue Strategy",
    "description": "Strategic analysis and contributor workflow optimization for post-launch OriginVault growth",
    "parties": {
      "contractingOrganization": {
        "organizationDID": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a",
        "legalName": "OriginVault, LLC",
        "authorizedSigner": {
          "signerDID": "did:cheqd:mainnet:luke-nispel-founder",
          "name": "Luke Nispel",
          "title": "Founder",
          "signatureDate": "2025-06-02"
        }
      },
      "contractor": {
        "contractorDID": "did:cheqd:mainnet:example-contractor",
        "name": "Example Contractor",
        "type": "individual",
        "signatureDate": "2025-06-02"
      }
    },
    "terms": {
      "startDate": "2025-06-02",
      "endDate": "2025-06-29",
      "timeCommitment": "Up to 10 hours/week",
      "timezone": "Pacific Standard Time (PST)",
      "terminationNotice": "five (5) business days written notice"
    },
    "compensation": {
      "hourlyRate": 80,
      "totalAmount": 3200,
      "currency": "USD",
      "paymentSchedule": "Invoices submitted weekly, payment within 15 business days",
      "paymentMethod": "bank-transfer",
      "additionalBenefits": ["Equity compensation via RestrictedEquityGrantCredential"]
    },
    "deliverables": [
      {
        "deliverableId": "1",
        "title": "Strategic Roadmap Review",
        "description": "Provide critical analysis of upcoming post-launch product features",
        "format": "Annotated roadmap doc or written brief",
        "reviewDate": "2025-06-09",
        "status": "pending"
      },
      {
        "deliverableId": "2",
        "title": "Contributor Workflow Feedback",
        "description": "Evaluate and suggest improvements to the contributor bounty system",
        "format": "Written proposal or inline suggestions",
        "reviewDate": "2025-06-16",
        "status": "pending"
      },
      {
        "deliverableId": "3",
        "title": "Prioritization Framework",
        "description": "Develop a structured plan to guide post-launch feature growth",
        "format": "Strategic framework doc or slide deck",
        "reviewDate": "2025-06-27",
        "status": "pending"
      }
    ],
    "intellectualProperty": {
      "ownership": "shared",
      "workForHire": false,
      "licenseTerms": "Internal planning documents owned by Company. Public-facing materials co-owned with attribution rights."
    },
    "confidentiality": {
      "hasNDA": true,
      "confidentialityPeriod": "during and after the term of this contract",
      "exceptions": ["public information", "independently developed"]
    },
    "linkedCredentials": [
      {
        "credentialType": "EquityGrantCredential",
        "credentialId": "equity:originvault:example-contractor-2025-001",
        "relationship": "supplements"
      }
    ],
    "verificationRequirements": {
      "requiresOrganizationCredential": true,
      "requiresContractorIdentity": true,
      "minimumSignatureLevel": "advanced"
    },
    "status": "executed",
    "executionDate": "2025-06-02T00:00:00Z"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2025-06-02T00:00:00Z",
    "verificationMethod": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a#key-1",
    "proofPurpose": "assertionMethod"
  }
}
```

### Step 3: Issue Linked Equity Grant

**Restricted Membership Units for Example Contractor**

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schema.org",
    "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
  ],
  "type": ["VerifiableCredential", "EquityGrantCredential"],
  "issuer": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a",
  "validFrom": "2025-06-02T00:00:00Z",
  "credentialSubject": {
    "id": "equity:originvault:example-contractor-2025-001",
    "type": "EquityGrant",
    "grantType": "restricted-equity",
    "grantee": {
      "granteeDID": "did:cheqd:mainnet:example-contractor",
      "name": "Example Contractor",
      "type": "individual",
      "taxJurisdiction": "United States"
    },
    "grantingOrganization": {
      "organizationDID": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a",
      "legalName": "OriginVault, LLC",
      "entityType": "LLC",
      "jurisdiction": "Delaware, United States",
      "authorizedBy": {
        "signerDID": "did:cheqd:mainnet:luke-nispel-founder",
        "name": "Luke Nispel",
        "title": "Founder",
        "authorizationDate": "2025-06-02"
      }
    },
    "equityDetails": {
      "shareClass": "Membership Units",
      "shareType": "membership-units",
      "numberOfShares": 2100,
      "sharePrice": 0,
      "currency": "USD",
      "grantValue": 0,
      "ownershipPercentage": 0.05
    },
    "vestingSchedule": {
      "vestingType": "time-based",
      "vestingStartDate": "2025-06-02",
      "vestingCliff": {
        "duration": "12 months",
        "percentage": 25
      },
      "vestingPeriod": "4 years",
      "vestingFrequency": "monthly",
      "accelerationTriggers": ["change-of-control", "ipo"]
    },
    "transferRestrictions": {
      "transferable": false,
      "rightOfFirstRefusal": true,
      "approvalRequired": true,
      "allowedTransferees": ["immediate-family", "trusts", "with-company-approval"]
    },
    "votingRights": {
      "hasVotingRights": true,
      "votingMultiplier": 1,
      "votingRestrictions": ["major-decisions-require-founder-approval"]
    },
    "economicRights": {
      "dividendRights": false,
      "profitSharingRights": true,
      "distributionRights": true
    },
    "contractualProvisions": {
      "nonCompete": {
        "applicable": true,
        "duration": "2 years post-termination",
        "scope": "Direct competitors in decentralized identity space"
      },
      "nonSolicitation": {
        "applicable": true,
        "duration": "1 year post-termination",
        "scope": "OriginVault employees and contractors"
      },
      "confidentiality": {
        "applicable": true,
        "duration": "Indefinite"
      }
    },
    "linkedContracts": [
      {
        "contractId": "contract:originvault:example-contractor-2025-001",
        "contractType": "service",
        "linkage": "supplement"
      }
    ],
    "taxElections": {
      "section83bElection": {
        "elected": false
      },
      "qualifiedSmallBusinessStock": true,
      "issuanceDate": "2025-06-02"
    },
    "status": "granted",
    "grantDate": "2025-06-02"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2025-06-02T00:00:00Z",
    "verificationMethod": "did:cheqd:mainnet:53c6369f-e004-4fb9-8d89-dd31f8db566a#key-1",
    "proofPurpose": "assertionMethod"
  }
}
```

## Verification Workflow

### 1. Organization Authority Verification
```javascript
// Verify OriginVault has authority to issue contracts
const orgCredential = await verifyCredential(organizationCredentialJWT);
const hasContractingPower = orgCredential.credentialSubject.contractingAuthority.hasContractingPower;
const authorizedSigners = orgCredential.credentialSubject.contractingAuthority.authorizedSigners;
```

### 2. Contract Validity Verification  
```javascript
// Verify contract was signed by authorized parties
const contractCredential = await verifyCredential(contractCredentialJWT);
const orgSigner = contractCredential.credentialSubject.parties.contractingOrganization.authorizedSigner;
const contractorSigner = contractCredential.credentialSubject.parties.contractor;

// Check signer is authorized
const isAuthorizedSigner = authorizedSigners.some(signer => 
  signer.signerDID === orgSigner.signerDID
);
```

### 3. Cross-Credential Linkage Verification
```javascript
// Verify equity grant is properly linked to contract
const equityCredential = await verifyCredential(equityCredentialJWT);
const linkedContracts = equityCredential.credentialSubject.linkedContracts;
const contractLink = linkedContracts.find(link => 
  link.contractId === contractCredential.credentialSubject.id
);
```

## Implementation Best Practices

### Security
- **Multi-signature requirements** for high-value contracts
- **Time-locked credentials** for equity vesting schedules
- **Revocation mechanisms** for terminated contracts
- **Access control** based on credential verification

### Legal Compliance
- **Jurisdiction mapping** for applicable laws
- **Securities compliance** for equity grants
- **Tax election tracking** for equity recipients
- **Audit trail maintenance** for compliance reporting

### Operational Efficiency
- **Automated workflows** for standard contract types
- **Template-based generation** with variable substitution
- **Integration hooks** for payment and project management systems
- **Notification systems** for deliverable deadlines and vesting events

## Integration Points

### Payment Systems
```javascript
// Trigger payment when deliverable is marked complete
const deliverable = contract.credentialSubject.deliverables.find(d => d.deliverableId === '1');
if (deliverable.status === 'approved') {
  const payment = {
    amount: contract.credentialSubject.compensation.hourlyRate * hoursWorked,
    recipient: contract.credentialSubject.parties.contractor.contractorDID,
    reference: contract.credentialSubject.id
  };
  await processPayment(payment);
}
```

### Project Management
```javascript
// Create project tasks from contract deliverables
const tasks = contract.credentialSubject.deliverables.map(deliverable => ({
  title: deliverable.title,
  description: deliverable.description,
  dueDate: deliverable.reviewDate,
  assignee: contract.credentialSubject.parties.contractor.contractorDID
}));
await createProjectTasks(tasks);
```

### Equity Management
```javascript
// Track vesting progress
const equityGrant = await getEquityGrant(equityCredentialId);
const vestingSchedule = equityGrant.credentialSubject.vestingSchedule;
const currentlyVested = calculateVestedShares(vestingSchedule, new Date());
```

## Future Enhancements

### Phase 2 Features
- **Multi-party contracts** with complex approval workflows
- **Amendment credentials** for contract modifications  
- **Performance-based vesting** tied to deliverable completion
- **Cross-chain equity** for multi-jurisdiction operations

### Phase 3 Features
- **AI-powered contract generation** from natural language descriptions
- **Smart contract integration** for automated execution
- **Advanced analytics** for contractor performance and equity value
- **Marketplace integration** for credential-verified freelancer discovery

## Related Documentation

- [DIF Basic Person Adoption Guide](./DIF_BASIC_PERSON_ADOPTION.md)
- [Schema Migration Summary](./SCHEMA_MIGRATION_SUMMARY.md)
- [ADR 0089: Business Identity & Contract Issuance](../architecture-decision-records/adrs/0089-business-identity-contract-issuance.md)
- [OpenOwnership Standards](https://www.openownership.org/en/)

---

**Implementation Status:** Ready for deployment  
**Next Steps:** Issue OriginVault LLC OrganizationCredential and test with example contractor contract 