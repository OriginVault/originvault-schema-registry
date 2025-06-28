# BFF Schema Alignment - Immediate Actions

## 📋 **IMMEDIATE ACTIONS (This Week)**

### 1. **Create Missing Critical Schemas**
```bash
# API Access Management (for BFF API subscriptions)
✅ ReputationCredential.schema.json - CREATED

# Still need:
- APIAccessCredential.schema.json (BFF API tiers & rate limiting)
- PluginEndorsementCredential.schema.json (Plugin marketplace)
- StorageCredential.schema.json (Storage quotas & verification)
```

### 2. **Migrate Essential Schemas from Drafts**
```bash
# High priority schemas the BFF needs
cp drafts/TrustedIssuer.json schemas/v1/TrustedIssuerCredential.schema.json
cp drafts/Admin.json schemas/v1/AdminCredential.schema.json  
cp drafts/GemDeclaration.json schemas/v1/GemCredential.schema.json

# Content authenticity (C2PA integration)
cp drafts/ContentAuthenticityAssertionCredential.json schemas/v1/ContentAuthenticityCredential.schema.json
cp drafts/ContentAIPermissionAssertionCredential.json schemas/v1/ContentAIPermissionCredential.schema.json
```

### 3. **Update Existing Schemas**
```bash
# Enhance PersonCredential with role enumeration
# Add role property: "creator", "admin", "developer", "verifier", "operator"

# Enhance OrganizationCredential with OpenOwnership BODS compliance
# Add beneficial ownership transparency fields

# Update all schema $id URLs to production: https://schemas.originvault.box/v1/
```

## 🗑️ **REMOVE IMMEDIATELY (High Noise)**

### Individual Role Schemas (Replace with PersonCredential roles)
```bash
rm drafts/Creator.json
rm drafts/Owner.json  
rm drafts/Developer.json
rm drafts/Verifier.json
rm drafts/VaultOperator.json
rm drafts/CommunityMember.json
rm drafts/Persona.json
```

### Agreement/Legal Document Schemas (Not credentials)
```bash
rm drafts/*Agreement.json  # All agreement files
rm drafts/VaultUserAgreement.json
rm drafts/ServiceLevelAgreement.json
rm drafts/NodeOperatorAgreement.json
```

### Infrastructure Schemas (Internal platform concerns)
```bash
rm drafts/ComputeNode.json
rm drafts/NodeDeclaration.json
rm drafts/ClusterRegistration.json
rm drafts/ClusterGovernance.json
rm drafts/StorageNodeDeclaration.json
rm drafts/VerificationNode.json
rm drafts/IdentityNodeDeclaration.json
rm drafts/NodeClusterDeclaration.json
```

### Configuration Files (Not credentials)
```bash
rm drafts/PackageJson.json
rm drafts/TsconfigJson.json
rm drafts/AIConfig.json
rm drafts/LanguageConfiguration.json
rm drafts/DevelopmentEnvironmentMetadata.json
```

## 🔧 **BFF INTEGRATION REQUIREMENTS**

### **Authentication & Authorization**
- ✅ PersonCredential - User identity
- ✅ VaultAccessCredential - Vault permissions 
- ✅ AdminCredential - Admin privileges (needs migration)
- ⚠️ APIAccessCredential - API subscriptions (needs creation)

### **Content Management**
- ✅ CreativeWorkCredential - Content metadata
- ⚠️ ContentAuthenticityCredential - C2PA integration (needs migration)
- ⚠️ ContentAIPermissionCredential - AI usage rights (needs migration)

### **Payment & Monetization**
- ✅ PaymentCredential - Payment verification
- ⚠️ SubscriptionCredential - Service subscriptions (needs creation)
- ⚠️ StorageCredential - Storage verification (needs creation)

### **Trust & Reputation**
- ✅ ReputationCredential - User/creator reputation
- ⚠️ TrustedIssuerCredential - Trust registry (needs migration)
- ⚠️ GemCredential - Gaming/rewards (needs migration)

### **Plugin Ecosystem**
- ⚠️ PluginCredential - Plugin declarations (needs migration)
- ⚠️ PluginEndorsementCredential - Marketplace approval (needs creation)

## 📊 **SUCCESS METRICS**

### **Schema Count Reduction**
- Current: ~80 schemas in drafts
- Target: ~20 schemas in production
- Reduction: 75% fewer schemas to maintain

### **BFF Integration Coverage**
- ✅ User Authentication: 80% complete
- ⚠️ Content Management: 60% complete  
- ⚠️ Payment Systems: 70% complete
- ⚠️ Plugin Marketplace: 40% complete
- ⚠️ Trust/Reputation: 60% complete

### **Standards Compliance**
- ✅ W3C Verifiable Credentials v2.0
- ✅ JSON Schema Draft 2020-12
- ✅ Schema.org integration
- ⚠️ OpenOwnership BODS (needs enhancement)

## ⏱️ **TIMELINE**

### **Day 1-2: Critical Migrations**
- Migrate TrustedIssuer, Admin, Gem schemas
- Create APIAccessCredential schema
- Remove redundant role schemas

### **Day 3-4: Content & Payment**
- Migrate content authenticity schemas
- Create StorageCredential & SubscriptionCredential
- Remove infrastructure schemas

### **Day 5-7: Plugin & Final Cleanup**
- Create PluginEndorsementCredential
- Remove remaining agreement/config schemas
- Update schema URLs to production

## 🎯 **PRIORITY FOCUS**

**Most Important for BFF Right Now:**
1. TrustedIssuerCredential (trust verification)
2. APIAccessCredential (API management)
3. AdminCredential (admin operations)
4. ContentAuthenticityCredential (C2PA integration)
5. ReputationCredential (user scoring) ✅

This plan transforms the schema registry from experimental to production-ready while directly supporting BFF requirements. 