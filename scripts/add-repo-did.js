#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to automatically add repository DID to commits and build metadata
 * Reads DID from .public/did-configuration.json and adds it to various places
 */

const DID_CONFIG_PATH = '.public/did-configuration.json';
const PACKAGE_JSON_PATH = 'package.json';

// Extract repo DID from configuration
function getRepoDID() {
  try {
    const configPath = path.resolve(DID_CONFIG_PATH);
    if (!fs.existsSync(configPath)) {
      console.warn('⚠️  DID configuration not found at:', configPath);
      return null;
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const did = config.didDocument?.id || config.didResolutionMetadata?.did?.didString;
    
    if (!did) {
      console.warn('⚠️  No DID found in configuration file');
      return null;
    }

    return did;
  } catch (error) {
    console.error('❌ Failed to extract repo DID:', error.message);
    return null;
  }
}

// Add DID to package.json metadata
function addBuildMetadataToPackageJson(repoDID) {
  try {
    const packagePath = path.resolve(PACKAGE_JSON_PATH);
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    
    // Add repository DID metadata
    packageJson.repository = {
      ...packageJson.repository,
      did: repoDID,
      didResolutionUrl: `https://resolver.cheqd.net/1.0/identifiers/${repoDID}`
    };

    // Add DID to keywords if not present
    if (!packageJson.keywords) {
      packageJson.keywords = [];
    }
    if (!packageJson.keywords.includes('did')) {
      packageJson.keywords.push('did');
    }
    if (!packageJson.keywords.includes('cheqd')) {
      packageJson.keywords.push('cheqd');
    }

    // Add build metadata
    packageJson.buildMetadata = {
      ...packageJson.did,
      buildTimestamp: new Date().toISOString(),
      gitCommit: process.env.GITHUB_SHA || 'local-build'
    };

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ Added repo DID to package.json');
    return true;
  } catch (error) {
    console.error('❌ Failed to update package.json:', error.message);
    return false;
  }
}

// Generate commit message footer with DID
function generateCommitFooter(repoDID) {
  const timestamp = new Date().toISOString();
  const commit = process.env.GITHUB_SHA || 'local-commit';
  
  return `

Repository-DID: ${repoDID}
Build-Timestamp: ${timestamp}
Git-Commit: ${commit}`;
}

// Create commit message template
function createCommitTemplate(repoDID) {
  const templatePath = '.gitmessage';
  const template = `# Commit message template
# 
# Format: <type>(<scope>): <description>
#
# Types: feat, fix, docs, style, refactor, test, chore
# Scope: api, ui, build, schema, types, etc.
#
# Example: feat(api): add verifiable credentials endpoint
#
# Repository DID: ${repoDID}
# 
# Detailed description (optional):
#


Repository-DID: ${repoDID}
Build-Timestamp: ${new Date().toISOString()}`;

  try {
    fs.writeFileSync(templatePath, template);
    console.log('✅ Created commit message template with repo DID');
    return true;
  } catch (error) {
    console.error('❌ Failed to create commit template:', error.message);
    return false;
  }
}

// Generate DID metadata for build artifacts
function generateDIDMetadata(repoDID) {
  const metadata = {
    repository: {
      did: repoDID,
      name: "OriginVault Schema Registry",
      url: "https://github.com/OriginVault/originvault-schema-registry",
      didResolutionUrl: `https://resolver.cheqd.net/1.0/identifiers/${repoDID}`,
      wellKnownDID: "https://schemas.originvault.box/.well-known/did-configuration.json"
    },
    build: {
      timestamp: new Date().toISOString(),
      gitCommit: process.env.GITHUB_SHA || 'local-build',
      gitRef: process.env.GITHUB_REF || 'refs/heads/main',
      nodeVersion: process.version,
      buildEnvironment: process.env.NODE_ENV || 'development'
    },
    verification: {
      publicKey: "z6MkfgB9i7NePws73LrLpyYJbeKB896t1gNJdiF4pqgRYvn6",
      verificationMethod: `${repoDID}#key-1`,
      serviceEndpoint: "https://schemas.originvault.box/.well-known/did-configuration.json"
    }
  };

  const metadataPath = 'dist/did-metadata.json';
  
  try {
    // Ensure dist directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }
    
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('✅ Generated DID metadata for build artifacts');
    return metadata;
  } catch (error) {
    console.error('❌ Failed to generate DID metadata:', error.message);
    return null;
  }
}

// Main function
function main() {
  console.log('🆔 Adding repository DID to build metadata...');
  
  const repoDID = getRepoDID();
  if (!repoDID) {
    console.error('❌ Cannot proceed without repository DID');
    process.exit(1);
  }

  console.log(`📝 Repository DID: ${repoDID}`);

  // Add DID to various places
  const results = [
    addBuildMetadataToPackageJson(repoDID),
    createCommitTemplate(repoDID),
    generateDIDMetadata(repoDID)
  ];

  if (results.every(Boolean)) {
    console.log('🎉 Successfully added repository DID to all metadata!');
    console.log(`🔗 Verify DID: https://resolver.cheqd.net/1.0/identifiers/${repoDID}`);
  } else {
    console.error('⚠️  Some operations failed. Please check the logs above.');
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Repository DID Management Script

Usage: node scripts/add-repo-did.js [options]

Options:
  --help, -h     Show this help message
  --footer       Generate commit message footer only
  --metadata     Generate DID metadata only
  --template     Generate commit template only

This script automatically adds the repository DID to:
- package.json metadata
- Git commit message template
- Build artifact metadata
- Distribution files

The DID is read from .public/did-configuration.json
`);
  process.exit(0);
}

// Handle specific operations
if (process.argv.includes('--footer')) {
  const repoDID = getRepoDID();
  if (repoDID) {
    console.log(generateCommitFooter(repoDID));
  }
  process.exit(0);
}

if (process.argv.includes('--metadata')) {
  const repoDID = getRepoDID();
  if (repoDID) {
    generateDIDMetadata(repoDID);
  }
  process.exit(0);
}

if (process.argv.includes('--template')) {
  const repoDID = getRepoDID();
  if (repoDID) {
    createCommitTemplate(repoDID);
  }
  process.exit(0);
}

// Run main function
if (require.main === module) {
  main();
}

module.exports = {
  getRepoDID,
  generateCommitFooter,
  generateDIDMetadata
}; 