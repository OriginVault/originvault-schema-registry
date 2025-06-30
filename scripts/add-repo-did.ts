import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to automatically add repository DID to commits and build metadata
 * Reads DID from .public/did-configuration.json and adds it to various places
 */

const DID_CONFIG_PATH = '.public/did-configuration.json';
const PACKAGE_JSON_PATH = 'package.json';

interface DIDConfig {
  didDocument?: {
    id?: string;
  };
  didResolutionMetadata?: {
    did?: {
      didString?: string;
    };
  };
}

interface PackageJson {
  repository?: Record<string, any>;
  keywords?: string[];
  buildMetadata?: Record<string, any>;
  [key: string]: any;
}

interface DIDMetadata {
  repository: {
    did: string;
    name: string;
    url: string;
    didResolutionUrl: string;
    wellKnownDID: string;
  };
  build: {
    timestamp: string;
    gitCommit: string;
    gitRef: string;
    nodeVersion: string;
    buildEnvironment: string;
  };
  verification: {
    publicKey: string;
    verificationMethod: string;
    serviceEndpoint: string;
  };
}

// Extract repo DID from configuration
function getRepoDID(): string | null {
  try {
    const configPath = path.resolve(DID_CONFIG_PATH);
    if (!fs.existsSync(configPath)) {
      console.warn('⚠️  DID configuration not found at:', configPath);
      return null;
    }

    const config: DIDConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const did = config.didDocument?.id || config.didResolutionMetadata?.did?.didString;
    
    if (!did) {
      console.warn('⚠️  No DID found in configuration file');
      return null;
    }

    return did;
  } catch (error: any) {
    console.error('❌ Failed to extract repo DID:', error.message);
    return null;
  }
}

// Add DID to package.json metadata
function addBuildMetadataToPackageJson(repoDID: string): boolean {
  try {
    const packagePath = path.resolve(PACKAGE_JSON_PATH);
    const packageJson: PackageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    
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
    return true;
  } catch (error: any) {
    console.error('❌ Failed to update package.json:', error.message);
    return false;
  }
}

// Generate commit message footer with DID
function generateCommitFooter(repoDID: string): string {
  const timestamp = new Date().toISOString();
  const commit = process.env.GITHUB_SHA || 'local-commit';
  
  return `

Repository-DID: ${repoDID}
Build-Timestamp: ${timestamp}
Git-Commit: ${commit}`;
}

// Create commit message template
function createCommitTemplate(repoDID: string): boolean {
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
    return true;
  } catch (error: any) {
    console.error('❌ Failed to create commit template:', error.message);
    return false;
  }
}

// Generate DID metadata for build artifacts
function generateDIDMetadata(repoDID: string): DIDMetadata | null {
  const metadata: DIDMetadata = {
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
    return metadata;
  } catch (error: any) {
    console.error('❌ Failed to generate DID metadata:', error.message);
    return null;
  }
}

// Main function
function main(): void {
  const repoDID = getRepoDID();
  if (!repoDID) {
    console.error('❌ Cannot proceed without repository DID');
    process.exit(1);
  }

  // Add DID to various places
  const results = [
    addBuildMetadataToPackageJson(repoDID),
    createCommitTemplate(repoDID),
    generateDIDMetadata(repoDID)
  ];

  if (results.every(Boolean)) {
    process.exit(0);
  } else {
    console.error('⚠️  Some operations failed. Please check the logs above.');
    process.exit(1);
  }
}

export { 
  getRepoDID, 
  addBuildMetadataToPackageJson, 
  generateCommitFooter, 
  createCommitTemplate, 
  generateDIDMetadata, 
  main 
}; 