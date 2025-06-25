# OriginVault Schema Registry: Cleanup & Migration Plan

## 🎯 Executive Summary

Based on analysis of the BFF requirements and current schema registry state, here's a comprehensive plan to optimize our schema collection for production readiness.

## ✅ **Current Production Schemas (Keep & Enhance)**

### **Core Identity & Access** ✅
- `OriginVaultRootAuthority.schema.json` - Root of trust
- `PersonCredential.schema.json` - Individual identity
- `OrganizationCredential.schema.json` - Business entity
- `VaultAccessCredential.schema.json` - Access control (NEW)
- `CreativeWorkCredential.schema.json` - Content credentials (NEW)
- `PaymentCredential.schema.json` - Payment verification (NEW)

## 🔄 **Schemas to MIGRATE from Drafts → Production**

### **High Priority - Move Immediately**
```bash
# Core trust infrastructure
cp drafts/TrustedIssuer.json schemas/v1/TrustedIssuerCredential.schema.json
cp drafts/Admin.json schemas/v1/AdminCredential.schema.json

# Content authenticity
cp drafts/ContentAuthenticityAssertionCredential.json schemas/v1/ContentAuthenticityCredential.schema.json
cp drafts/ContentAIPermissionAssertionCredential.json schemas/v1/ContentAIPermissionCredential.schema.json

# Reputation system
cp drafts/GemDeclaration.json schemas/v1/GemCredential.schema.json
```

### **Medium Priority - Evaluate & Migrate**
```bash
# Trust and verification
drafts/TrustScore.json → schemas/v1/TrustScoreCredential.schema.json
drafts/EndorsementRecord.json → schemas/v1/EndorsementCredential.schema.json

# Plugin system
drafts/PluginDeclaration.json → schemas/v1/PluginCredential.schema.json

# Licensing
drafts/ContentLicensingTerms.json → schemas/v1/ContentLicenseCredential.schema.json
```

## 🗑️ **Schemas to REMOVE (Overly Granular/Redundant)**

### **Individual Role Schemas** (Replace with PersonCredential + role property)
- `Creator.json` ❌ → Use PersonCredential with role="creator"
- `Owner.json` ❌ → Use PersonCredential with role="owner"  
- `Developer.json` ❌ → Use PersonCredential with role="developer"
- `Verifier.json` ❌ → Use PersonCredential with role="verifier"
- `VaultOperator.json` ❌ → Use PersonCredential with role="operator"
- `CommunityMember.json` ❌ → Use PersonCredential with role="member"

### **Infrastructure Schemas** (Internal platform concerns)
- `ComputeNode.json` ❌ → Internal infrastructure
- `NodeDeclaration.json` ❌ → Internal infrastructure
- `StorageNodeDeclaration.json` ❌ → Internal infrastructure
- `VerificationNode.json` ❌ → Internal infrastructure
- `IdentityNodeDeclaration.json` ❌ → Internal infrastructure
- `ClusterRegistration.json` ❌ → Internal infrastructure
- `ClusterGovernance.json` ❌ → Internal infrastructure
- `NodeClusterDeclaration.json` ❌ → Internal infrastructure

### **Agreement Schemas** (Legal documents, not credentials)
- `VaultUserAgreement.json` ❌ → Legal document
- `NodeOperatorAgreement.json` ❌ → Legal document
- `DataChamberContributionAgreement.json` ❌ → Legal document
- `ExternalBuyerAgreement.json` ❌ → Legal document
- `VaultAdminAgreement.json` ❌ → Legal document
- `PluginIntegrationAgreement.json` ❌ → Legal document
- `NamespaceParticipationAgreement.json` ❌ → Legal document
- `ReferalAgreement.json` ❌ → Legal document
- `PluginDeveloperAgreement.json` ❌ → Legal document
- `AIModelTrainingAgreement.json` ❌ → Legal document
- `ServiceLevelAgreement.json` ❌ → Legal document

### **Overly Granular Gem System**
- `GemIssuanceRecord.json` ❌ → Merge into GemCredential
- `GemRevocationRecord.json` ❌ → Use standard revocation
- `GemReputationScore.json` ❌ → Part of TrustScore
- `GemTrustRegistry.json` ❌ → Part of TrustedIssuer

### **Redundant Trust Schemas**
- `TrustDelegation.json` ❌ → Part of TrustChainDelegation
- `TrustGate.json` ❌ → Too granular

### **Vault Chamber Schemas** (Unclear purpose)
- `VaultChamberTransaction.json` ❌ → Use PaymentCredential
- `VaultChamberGovernance.json` ❌ → Use VaultAccessCredential
- `VaultChamberPlugin.json` ❌ → Use PluginCredential
- `VaultChamberTagging.json` ❌ → Metadata, not credential

### **Data Chamber Schemas** (Better handled by APIs)
- `DataChamberEnrollment.json` ❌ → API registration
- `ExternalDataAccess.json` ❌ → Use VaultAccessCredential
- `RevenuDistribution.json` ❌ → Use PaymentCredential

### **Miscellaneous Cleanup**
- `PackageJson.json` ❌ → Not a credential
- `TsconfigJson.json` ❌ → Not a credential
- `AIConfig.json` ❌ → Configuration, not credential
- `LanguageConfiguration.json` ❌ → Configuration, not credential
- `DevelopmentEnvironmentMetadata.json` ❌ → Not a credential
- `GlobalPrivacyControl.json` ❌ → Policy, not credential

## 🆕 **Missing Schemas to CREATE**

### **High Priority - BFF Integration**
1. **APIAccessCredential.schema.json**
   - API subscription verification
   - Rate limiting and entitlements
   - Integration with ADR 0074

2. **PluginEndorsementCredential.schema.json**
   - Plugin developer verification
   - Plugin marketplace approval
   - Security attestation

3. **StorageCredential.schema.json**
   - Storage quota verification
   - Usage tracking
   - Integration with ADR 0075

4. **ServiceConnectionCredential.schema.json**
   - Cross-vault service connections
   - Developer-creator relationships
   - Service authorization

### **Medium Priority - Feature Completion**
5. **ReputationCredential.schema.json**
   - User/creator reputation
   - Trust scoring
   - Community verification

6. **SubscriptionCredential.schema.json**
   - Subscription verification
   - Service access rights
   - Renewal tracking

## 📂 **Final Production Schema Structure**

```
schemas/v1/
├── Identity & Access
│   ├── OriginVaultRootAuthority.schema.json ✅
│   ├── PersonCredential.schema.json ✅
│   ├── OrganizationCredential.schema.json ✅
│   ├── VaultAccessCredential.schema.json ✅
│   ├── AdminCredential.schema.json (migrate)
│   └── APIAccessCredential.schema.json (create)
├── Content & Creation
│   ├── CreativeWorkCredential.schema.json ✅
│   ├── ContentAuthenticityCredential.schema.json (migrate)
│   ├── ContentAIPermissionCredential.schema.json (migrate)
│   └── ContentLicenseCredential.schema.json (migrate)
├── Trust & Verification
│   ├── TrustedIssuerCredential.schema.json (migrate)
│   ├── TrustScoreCredential.schema.json (migrate)
│   ├── EndorsementCredential.schema.json (migrate)
│   └── ReputationCredential.schema.json (create)
├── Payments & Economics
│   ├── PaymentCredential.schema.json ✅
│   ├── SubscriptionCredential.schema.json (create)
│   └── StorageCredential.schema.json (create)
├── Platform & Services
│   ├── PluginCredential.schema.json (migrate)
│   ├── PluginEndorsementCredential.schema.json (create)
│   ├── ServiceConnectionCredential.schema.json (create)
│   └── GemCredential.schema.json (migrate)
```

## 🎯 **Implementation Priority**

### **Week 1: Core Migration**
1. Migrate TrustedIssuer, Admin, ContentAuthenticity schemas
2. Remove all redundant role and agreement schemas
3. Remove infrastructure schemas

### **Week 2: Feature Completion**
1. Create missing API and plugin schemas
2. Migrate reputation and licensing schemas
3. Test all schemas with BFF integration

### **Week 3: Cleanup & Optimization**
1. Remove remaining granular/redundant schemas
2. Optimize schema relationships
3. Update context files

## 📊 **Impact Summary**

### **Before**: 80+ schemas (many redundant/experimental)
### **After**: 20 core schemas (focused on actual BFF needs)

### **Benefits**:
- ✅ Reduced complexity and maintenance overhead
- ✅ Clear schema hierarchy aligned with BFF architecture
- ✅ Eliminates redundancy and overlapping concerns
- ✅ Focused on actual business requirements
- ✅ Easier for developers to understand and implement

### **Schema Count Reduction**:
- **Remove**: ~60 schemas (75% reduction)
- **Migrate**: ~10 schemas from drafts
- **Create**: ~6 new schemas for missing functionality
- **Final**: ~20 production schemas

This cleanup transforms the schema registry from an experimental collection into a focused, production-ready system that directly supports the BFF's requirements while maintaining W3C compliance and interoperability. 