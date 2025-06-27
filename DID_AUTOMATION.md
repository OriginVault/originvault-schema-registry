# Repository DID Automation

This document describes the automated DID (Decentralized Identifier) integration system for the OriginVault Schema Registry.

## Overview

Every commit and build automatically includes the repository DID (`did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55`) for:
- ✅ **Provenance tracking** - Know exactly which repo version produced artifacts
- ✅ **Verifiable builds** - Cryptographically link builds to repo identity
- ✅ **Trust chain** - Connect artifacts back to the verified repository
- ✅ **Compliance** - Meet DID requirements for verifiable credential systems

## Repository DID

**DID**: `did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55`  
**Resolution URL**: https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55  
**Well-Known**: https://schemas.originvault.box/.well-known/did-configuration.json

## Automation Scripts

### 1. Core DID Script
```bash
npm run add-repo-did
```
- Reads DID from `.public/did-configuration.json`
- Updates `package.json` with DID metadata
- Generates build artifacts with DID information
- Creates commit message templates

### 2. Commit with DID (PowerShell)
```powershell
.\commit-with-did.ps1 "your commit message"
```
- Runs pre-push checks
- Adds DID metadata to all build artifacts
- Commits with DID information included
- Shows verification links

**Options:**
- `-DryRun` - Preview what would be committed
- `-Help` - Show detailed usage

### 3. Individual DID Operations
```bash
npm run did:footer      # Generate commit message footer with DID
npm run did:metadata    # Generate DID metadata file only  
npm run did:template    # Create git commit message template
```

## Automated Integration Points

### 📦 Build Process
Every `npm run build` automatically:
1. ✅ Adds repository DID to `package.json`
2. ✅ Generates `dist/did-metadata.json` with full metadata
3. ✅ Updates build timestamp and commit information
4. ✅ Includes verification endpoints

### 🔍 Pre-Push Checks
The `pre-push-check.ps1` script runs:
1. ✅ TypeScript type checking
2. ✅ Full build verification
3. ✅ DID metadata generation
4. ✅ Build artifact validation

### 🚀 GitHub Actions
CI automatically:
1. ✅ Generates DID metadata with proper environment variables
2. ✅ Verifies DID format and resolution
3. ✅ Uploads DID metadata as artifacts
4. ✅ Includes DID in build summaries

## Generated Files

### `dist/did-metadata.json`
Complete DID and build metadata:
```json
{
  "repository": {
    "did": "did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55",
    "name": "OriginVault Schema Registry",
    "url": "https://github.com/OriginVault/originvault-schema-registry",
    "didResolutionUrl": "https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55"
  },
  "build": {
    "timestamp": "2025-06-27T22:34:22.587Z",
    "gitCommit": "8bb2c30",
    "gitRef": "refs/heads/main",
    "nodeVersion": "v18.x.x"
  },
  "verification": {
    "publicKey": "z6MkfgB9i7NePws73LrLpyYJbeKB896t1gNJdiF4pqgRYvn6",
    "verificationMethod": "did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55#key-1"
  }
}
```

### Updated `package.json`
Adds DID metadata to npm package:
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/originvault/originvault-schema-registry",
    "did": "did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55",
    "didResolutionUrl": "https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55"
  },
  "buildMetadata": {
    "repoDID": "did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55",
    "buildTimestamp": "2025-06-27T22:34:22.587Z",
    "gitCommit": "8bb2c30"
  }
}
```

## Usage Examples

### Standard Commit with DID
```powershell
# Commit with automatic DID inclusion
.\commit-with-did.ps1 "feat: add schema validation endpoint"

# Preview what would be committed
.\commit-with-did.ps1 "fix: update trust registry" -DryRun
```

### Manual DID Operations
```bash
# Just generate DID metadata
npm run did:metadata

# Get DID footer for manual commits
npm run did:footer

# Check what DID is configured
node scripts/add-repo-did.js --help
```

### Verification
```bash
# Verify DID resolution
curl "https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55"

# Check build artifacts include DID
cat dist/did-metadata.json | jq '.repository.did'
```

## Integration with Vercel

The DID automation is integrated with the build verification system:
1. ✅ **Prevents broken builds** - Pre-push checks ensure everything works
2. ✅ **Vercel compatibility** - Build includes all necessary metadata
3. ✅ **Deployment tracking** - Each deployment linked to specific repo DID
4. ✅ **Artifact verification** - All build outputs include provenance info

## Best Practices

1. **Use the PowerShell script**: `.\commit-with-did.ps1 "message"` for automatic DID inclusion
2. **Always run pre-push checks**: Prevents deployment failures
3. **Include DID in important commits**: Especially releases and schema updates
4. **Verify DID resolution**: Check the resolution URL works before major pushes
5. **Keep DID config updated**: Update `.public/did-configuration.json` if DID changes

## Troubleshooting

### DID Not Found
```
⚠️ DID configuration not found at: .public/did-configuration.json
```
**Solution**: Ensure the DID configuration file exists with valid JSON

### Build Failures
```
❌ Failed to generate DID metadata
```
**Solution**: Check `dist/` directory permissions and Node.js version

### Invalid DID Format
```
❌ Invalid DID format: did:example:invalid
```
**Solution**: Verify the DID in `.public/did-configuration.json` follows cheqd format

### Resolution Issues
```
🔗 Verify DID: https://resolver.cheqd.net/1.0/identifiers/[DID]
```
**Solution**: Test the resolution URL manually and check network connectivity

## Security Notes

- ✅ DID private keys are NOT included in builds or commits
- ✅ Only public DID information and verification methods are embedded
- ✅ Build artifacts can be verified against the public DID document
- ✅ No sensitive cryptographic material is exposed

---

🔗 **Verify Repository DID**: https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:2b950252-b9cd-493f-98b8-fe417c466d55 