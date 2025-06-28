# Schema Cleanup & Migration Plan

## 🎯 Summary
Transform 80+ experimental schemas into 20 focused production schemas aligned with BFF requirements.

## ✅ Keep Current Production Schemas
- OriginVaultRootAuthority.schema.json
- PersonCredential.schema.json  
- OrganizationCredential.schema.json
- VaultAccessCredential.schema.json
- CreativeWorkCredential.schema.json
- PaymentCredential.schema.json

## 🔄 Migrate from Drafts (High Priority)
1. `TrustedIssuer.json` → `TrustedIssuerCredential.schema.json`
2. `Admin.json` → `AdminCredential.schema.json`
3. `ContentAuthenticityAssertionCredential.json` → `ContentAuthenticityCredential.schema.json`
4. `ContentAIPermissionAssertionCredential.json` → `ContentAIPermissionCredential.schema.json`
5. `GemDeclaration.json` → `GemCredential.schema.json`

## 🗑️ Remove (Redundant/Overly Granular)

### Individual Role Schemas (use PersonCredential with roles)
- Creator.json, Owner.json, Developer.json, Verifier.json, VaultOperator.json

### Infrastructure Schemas (internal platform concerns)
- ComputeNode.json, NodeDeclaration.json, ClusterRegistration.json, VerificationNode.json

### Agreement Schemas (legal documents, not credentials)  
- VaultUserAgreement.json, NodeOperatorAgreement.json, ServiceLevelAgreement.json

### Granular Gem/Vault Chamber Schemas
- GemIssuanceRecord.json, VaultChamberTransaction.json, VaultChamberGovernance.json

### Configuration Files (not credentials)
- PackageJson.json, TsconfigJson.json, AIConfig.json, LanguageConfiguration.json

## 🆕 Create Missing Schemas
1. APIAccessCredential.schema.json - API subscription verification
2. PluginEndorsementCredential.schema.json - Plugin marketplace approval
3. StorageCredential.schema.json - Storage quota verification
4. ServiceConnectionCredential.schema.json - Cross-vault connections
5. ReputationCredential.schema.json - User/creator reputation
6. SubscriptionCredential.schema.json - Service access rights

## 📊 Impact
- **Remove**: ~60 schemas (75% reduction)
- **Final**: ~20 focused production schemas
- **Benefit**: Reduced complexity, clearer hierarchy, BFF-aligned 