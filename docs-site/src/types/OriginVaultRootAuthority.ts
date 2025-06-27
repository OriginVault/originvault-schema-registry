/**
 * Generated TypeScript types for OriginVaultRootAuthority
 * Schema: https://schemas.originvault.box/v1/OriginVaultRootAuthority
 * 
 * DO NOT EDIT MANUALLY - this file is auto-generated
 * Generated on: 2025-06-27T15:35:19.601Z
 * 
 * To regenerate, run: npm run generate-types
 */

/**
 * Establishes OriginVault as a root authority in the multi-root trust architecture,
 * defining its scope, governance, and interoperability with other trust ecosystems
 * including OpenOwnership (UK), Schema.org, W3C, and DIF standards.
 */
export interface OriginVaultRootAuthority {
    context:           string[];
    credentialStatus?: CredentialStatus;
    credentialSubject: CredentialSubject;
    /**
     * DID of the OriginVault root authority
     */
    id:           string;
    issuanceDate: string;
    issuer:       Issuer;
    termsOfUse:   TermsOfUse;
    type:         string[];
}

export interface CredentialStatus {
    id:                   string;
    statusListCredential: string;
    statusListIndex:      string;
    statusPurpose:        StatusPurpose;
    type:                 CredentialStatusType;
    [property: string]: any;
}

export type StatusPurpose = "revocation" | "suspension";

export type CredentialStatusType = "StatusList2021Entry";

export interface CredentialSubject {
    accreditationStandards?: AccreditationStandard[];
    blockchainAnchoring?:    BlockchainAnchoring;
    delegationPolicy:        DelegationPolicy;
    governanceModel:         GovernanceModel;
    id:                      string;
    interoperability:        Interoperability;
    rootType:                RootType;
    scope:                   string;
    trustChainPurpose?:      string;
    [property: string]: any;
}

export interface AccreditationStandard {
    schemaTypes: string[];
    standardId:  string;
    trustLevels: string[];
    [property: string]: any;
}

export interface BlockchainAnchoring {
    blockchainNetwork:  BlockchainNetwork;
    registrationProof?: RegistrationProof;
    resourceId:         string;
    [property: string]: any;
}

export type BlockchainNetwork = "cheqd:mainnet" | "cheqd:testnet" | "ethereum:mainnet";

export interface RegistrationProof {
    type?:               string;
    verificationMethod?: string;
    [property: string]: any;
}

export interface DelegationPolicy {
    accreditationRequired?: boolean;
    allowsSubRoots:         boolean;
    maxChainDepth:          number;
    [property: string]: any;
}

export interface GovernanceModel {
    participants:    string[];
    policyDocument?: string;
    type:            GovernanceModelType;
    [property: string]: any;
}

export type GovernanceModelType = "dao" | "committee" | "foundation" | "consortium";

export interface Interoperability {
    crossChainValidation: boolean;
    federationMember?:    string;
    recognizedRoots:      string[];
    standardsCompliance?: StandardsCompliance;
    [property: string]: any;
}

export interface StandardsCompliance {
    dif?:           string[];
    openOwnership?: string[];
    schemaOrg?:     string[];
    w3C?:           string[];
    [property: string]: any;
}

export type RootType = "namespace" | "platform" | "federation" | "standard";

export interface Issuer {
    id:   string;
    name: string;
    type: IssuerType;
    [property: string]: any;
}

export type IssuerType = "Organization" | "Foundation" | "DAO";

export interface TermsOfUse {
    delegationScope?:            string;
    governanceFramework:         string;
    interoperabilityCommitment?: string;
    type:                        TermsOfUseType;
    [property: string]: any;
}

export type TermsOfUseType = "RootAuthorityPolicy";

// Example from schema:
export const OriginVaultRootAuthorityExample: OriginVaultRootAuthority = {
  "type": [
    "VerifiableCredential",
    "RootAuthorityDeclaration"
  ],
  "id": "did:cheqd:mainnet:originvault-root-authority",
  "issuer": {
    "id": "did:cheqd:mainnet:originvault-root-authority",
    "name": "OriginVault Foundation",
    "type": "Organization"
  },
  "issuanceDate": "2025-01-14T00:00:00Z",
  "credentialSubject": {
    "id": "did:cheqd:mainnet:originvault-root-authority",
    "rootType": "namespace",
    "scope": "content-authenticity-trust-ecosystem",
    "trustChainPurpose": "Establishing verifiable provenance and authenticity for digital content across decentralized systems",
    "governanceModel": {
      "type": "dao",
      "participants": [
        "did:cheqd:mainnet:originvault-governance-council",
        "did:cheqd:mainnet:creator-community-representatives"
      ],
      "policyDocument": "https://governance.originvault.box/root-authority-governance-v1"
    },
    "delegationPolicy": {
      "allowsSubRoots": true,
      "maxChainDepth": 5,
      "accreditationRequired": true
    },
    "accreditationStandards": [
      {
        "standardId": "content-authenticity-issuer-v1",
        "schemaTypes": [
          "ContentAuthenticityCredential",
          "CreatorVerificationCredential"
        ],
        "trustLevels": [
          "bronze",
          "silver",
          "gold",
          "platinum"
        ]
      },
      {
        "standardId": "trust-registry-issuer-v1",
        "schemaTypes": [
          "TrustedIssuerAccreditation",
          "NamespaceAuthorization"
        ],
        "trustLevels": [
          "verified",
          "accredited",
          "authoritative"
        ]
      }
    ],
    "interoperability": {
      "recognizedRoots": [
        "did:web:register.openownership.org",
        "did:web:schema.org",
        "did:web:w3.org",
        "did:web:identity.foundation"
      ],
      "crossChainValidation": true,
      "federationMember": "open-verifiable-trust-federation",
      "standardsCompliance": {
        "w3c": [
          "DID-Core",
          "VerifiableCredentials",
          "CredentialStatusList"
        ],
        "openOwnership": [
          "BODS-v1.0",
          "OwnershipCredential"
        ],
        "schemaOrg": [
          "Person",
          "Organization",
          "CreativeWork"
        ],
        "dif": [
          "PresentationExchange-v2",
          "CredentialManifest-v1"
        ]
      }
    },
    "blockchainAnchoring": {
      "blockchainNetwork": "cheqd:mainnet",
      "resourceId": "did:cheqd:mainnet:originvault-root-authority/resources/root-authority-declaration",
      "registrationProof": {
        "type": "Ed25519Signature2020",
        "verificationMethod": "did:cheqd:mainnet:originvault-root-authority#key-1"
      }
    }
  },
  "termsOfUse": {
    "type": "RootAuthorityPolicy",
    "governanceFramework": "https://governance.originvault.box/root-authority-governance-v1",
    "delegationScope": "content-authenticity-ecosystem",
    "interoperabilityCommitment": "Full interoperability with W3C, DIF, OpenOwnership, and Schema.org standards"
  },
  "credentialStatus": {
    "id": "https://schemas.originvault.box/v1/status-lists/root-authority#0",
    "type": "StatusList2021Entry",
    "statusPurpose": "revocation",
    "statusListIndex": "0",
    "statusListCredential": "https://schemas.originvault.box/v1/status-lists/root-authority"
  },
  "context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schema.org",
    "https://w3id.org/security/multikey/v1",
    "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
  ]
};
// Utility functions
export function isOriginVaultRootAuthority(data: unknown): data is OriginVaultRootAuthority {
  return typeof data === 'object' && 
         data !== null && 
         typeof (data as any).id === 'string' &&
         typeof (data as any).issuer === 'object' &&
         typeof (data as any).credentialSubject === 'object';
}

export function validateOriginVaultRootAuthority(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!isOriginVaultRootAuthority(data)) {
    errors.push('Invalid OriginVaultRootAuthority structure');
    return { valid: false, errors };
  }
  
  // Basic validation
  if (!data.id?.startsWith('did:')) {
    errors.push('Invalid DID format for id');
  }
  
  if (!data.issuer?.id?.startsWith('did:')) {
    errors.push('Invalid DID format for issuer.id');
  }
  
  if (!data.credentialSubject?.id?.startsWith('did:')) {
    errors.push('Invalid DID format for credentialSubject.id');
  }
  
  return { valid: errors.length === 0, errors };
}

export type OriginVaultRootAuthorityArray = OriginVaultRootAuthority[];
