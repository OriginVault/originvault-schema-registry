/**
 * Generated TypeScript types for OriginVaultRootAuthority
 * Schema: https://schemas.originvault.box/v1/OriginVaultRootAuthority
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Root Types and Enums
 */
export type RootType = "namespace" | "platform" | "federation" | "standard";
export type GovernanceType = "dao" | "committee" | "foundation" | "consortium";
export type IssuerType = "Organization" | "Foundation" | "DAO";
export type BlockchainNetwork = "cheqd:mainnet" | "cheqd:testnet" | "ethereum:mainnet";
export type StatusPurpose = "revocation" | "suspension";

/**
 * Core Interfaces
 */
export interface OriginVaultRootAuthorityIssuer {
  id: string; // Pattern: ^did:(cheqd|web):[a-zA-Z0-9._:-]+$
  name: string; // 3-100 characters
  type: IssuerType;
}

export interface GovernanceModel {
  type: GovernanceType;
  participants: string[]; // Array of DIDs
  policyDocument?: string; // URI format
}

export interface DelegationPolicy {
  allowsSubRoots: boolean;
  maxChainDepth: number; // 1-10
  accreditationRequired?: boolean;
}

export interface AccreditationStandard {
  standardId: string;
  schemaTypes: string[];
  trustLevels: string[];
}

export interface StandardsCompliance {
  w3c?: string[];
  openOwnership?: string[];
  schemaOrg?: string[];
  dif?: string[];
}

export interface Interoperability {
  recognizedRoots: string[]; // Array of DIDs
  crossChainValidation: boolean;
  federationMember?: string;
  standardsCompliance?: StandardsCompliance;
}

export interface RegistrationProof {
  type: string;
  verificationMethod: string;
}

export interface BlockchainAnchoring {
  blockchainNetwork: BlockchainNetwork;
  resourceId: string;
  registrationProof?: RegistrationProof;
}

export interface CredentialSubject {
  id: string; // Pattern: ^did:(cheqd|web):[a-zA-Z0-9._:-]+$
  rootType: RootType;
  scope: string; // 10-200 characters
  trustChainPurpose: string; // 20-500 characters
  governanceModel: GovernanceModel;
  delegationPolicy: DelegationPolicy;
  accreditationStandards?: AccreditationStandard[];
  interoperability: Interoperability;
  blockchainAnchoring?: BlockchainAnchoring;
}

export interface TermsOfUse {
  type: "RootAuthorityPolicy";
  governanceFramework: string; // URI format
  delegationScope?: string;
  interoperabilityCommitment?: string;
}

export interface CredentialStatus {
  id: string; // URI format
  type: "StatusList2021Entry";
  statusPurpose: StatusPurpose;
  statusListIndex: string;
  statusListCredential: string; // URI format
}

/**
 * Main OriginVaultRootAuthority Interface
 */
export interface OriginVaultRootAuthority {
  "@context": string[];
  type: string[]; // Must contain "RootAuthorityDeclaration"
  id: string; // Pattern: ^did:(cheqd|web):[a-zA-Z0-9._:-]+$
  issuer: OriginVaultRootAuthorityIssuer;
  issuanceDate: string; // ISO 8601 date-time format
  credentialSubject: CredentialSubject;
  termsOfUse: TermsOfUse;
  credentialStatus?: CredentialStatus;
}

/**
 * Array type for multiple root authorities
 */
export type OriginVaultRootAuthorityArray = OriginVaultRootAuthority[];

/**
 * Default context for OriginVault Root Authority credentials
 */
export const DEFAULT_CONTEXT = [
  "https://www.w3.org/ns/credentials/v2",
  "https://schema.org",
  "https://w3id.org/security/multikey/v1",
  "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
] as const;

/**
 * Utility functions for working with OriginVaultRootAuthority
 */
export class OriginVaultRootAuthorityUtils {
  /**
   * Validates that a credential subject has all required fields
   */
  static validateCredentialSubject(subject: Partial<CredentialSubject>): subject is CredentialSubject {
    return !!(
      subject.id &&
      subject.rootType &&
      subject.scope &&
      subject.governanceModel &&
      subject.delegationPolicy &&
      subject.interoperability
    );
  }

  /**
   * Creates a minimal valid OriginVaultRootAuthority credential
   */
  static createMinimal(params: {
    id: string;
    issuerDid: string;
    issuerName: string;
    issuerType: IssuerType;
    rootType: RootType;
    scope: string;
    trustChainPurpose: string;
    governanceType: GovernanceType;
    participants: string[];
    recognizedRoots: string[];
    governanceFramework: string;
  }): OriginVaultRootAuthority {
    return {
      "@context": [...DEFAULT_CONTEXT],
      type: ["VerifiableCredential", "RootAuthorityDeclaration"],
      id: params.id,
      issuer: {
        id: params.issuerDid,
        name: params.issuerName,
        type: params.issuerType
      },
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: params.id,
        rootType: params.rootType,
        scope: params.scope,
        trustChainPurpose: params.trustChainPurpose,
        governanceModel: {
          type: params.governanceType,
          participants: params.participants
        },
        delegationPolicy: {
          allowsSubRoots: true,
          maxChainDepth: 5,
          accreditationRequired: true
        },
        interoperability: {
          recognizedRoots: params.recognizedRoots,
          crossChainValidation: true
        }
      },
      termsOfUse: {
        type: "RootAuthorityPolicy",
        governanceFramework: params.governanceFramework
      }
    };
  }

  /**
   * Validates DID format for OriginVault (cheqd or web)
   */
  static validateDID(did: string): boolean {
    const didPattern = /^did:(cheqd|web):[a-zA-Z0-9._:-]+$/;
    return didPattern.test(did);
  }

  /**
   * Checks if the credential type includes RootAuthorityDeclaration
   */
  static isRootAuthorityDeclaration(types: string[]): boolean {
    return types.includes("RootAuthorityDeclaration");
  }

  /**
   * Extracts the trust level from accreditation standards
   */
  static getTrustLevels(credential: OriginVaultRootAuthority): string[] {
    if (!credential.credentialSubject.accreditationStandards) {
      return [];
    }
    
    return credential.credentialSubject.accreditationStandards
      .flatMap(standard => standard.trustLevels)
      .filter(Boolean);
  }

  /**
   * Checks if the root authority supports a specific schema type
   */
  static supportsSchemaType(credential: OriginVaultRootAuthority, schemaType: string): boolean {
    if (!credential.credentialSubject.accreditationStandards) {
      return false;
    }
    
    return credential.credentialSubject.accreditationStandards
      .some(standard => standard.schemaTypes.includes(schemaType));
  }
}

/**
 * Example usage and factory functions
 */
export const OriginVaultRootAuthorityExamples = {
  /**
   * Creates the canonical OriginVault Root Authority
   */
  createCanonical(): OriginVaultRootAuthority {
    return {
      "@context": [...DEFAULT_CONTEXT],
      type: ["VerifiableCredential", "RootAuthorityDeclaration"],
      id: "did:cheqd:mainnet:originvault-root-authority",
      issuer: {
        id: "did:cheqd:mainnet:originvault-root-authority",
        name: "OriginVault Foundation",
        type: "Foundation"
      },
      issuanceDate: "2025-01-14T00:00:00Z",
      credentialSubject: {
        id: "did:cheqd:mainnet:originvault-root-authority",
        rootType: "namespace",
        scope: "content-authenticity-trust-ecosystem",
        trustChainPurpose: "Establishing verifiable provenance and authenticity for digital content across decentralized systems",
        governanceModel: {
          type: "dao",
          participants: [
            "did:cheqd:mainnet:originvault-governance-council",
            "did:cheqd:mainnet:creator-community-representatives"
          ],
          policyDocument: "https://governance.originvault.box/root-authority-governance-v1"
        },
        delegationPolicy: {
          allowsSubRoots: true,
          maxChainDepth: 5,
          accreditationRequired: true
        },
        accreditationStandards: [
          {
            standardId: "content-authenticity-issuer-v1",
            schemaTypes: ["ContentAuthenticityCredential", "CreatorVerificationCredential"],
            trustLevels: ["bronze", "silver", "gold", "platinum"]
          },
          {
            standardId: "trust-registry-issuer-v1",
            schemaTypes: ["TrustedIssuerAccreditation", "NamespaceAuthorization"],
            trustLevels: ["verified", "accredited", "authoritative"]
          }
        ],
        interoperability: {
          recognizedRoots: [
            "did:web:register.openownership.org",
            "did:web:schema.org",
            "did:web:w3.org",
            "did:web:identity.foundation"
          ],
          crossChainValidation: true,
          federationMember: "open-verifiable-trust-federation",
          standardsCompliance: {
            w3c: ["DID-Core", "VerifiableCredentials", "CredentialStatusList"],
            openOwnership: ["BODS-v1.0", "OwnershipCredential"],
            schemaOrg: ["Person", "Organization", "CreativeWork"],
            dif: ["PresentationExchange-v2", "CredentialManifest-v1"]
          }
        },
        blockchainAnchoring: {
          blockchainNetwork: "cheqd:mainnet",
          resourceId: "did:cheqd:mainnet:originvault-root-authority/resources/root-authority-declaration",
          registrationProof: {
            type: "Ed25519Signature2020",
            verificationMethod: "did:cheqd:mainnet:originvault-root-authority#key-1"
          }
        }
      },
      termsOfUse: {
        type: "RootAuthorityPolicy",
        governanceFramework: "https://governance.originvault.box/root-authority-governance-v1",
        delegationScope: "content-authenticity-ecosystem",
        interoperabilityCommitment: "Full interoperability with W3C, DIF, OpenOwnership, and Schema.org standards"
      },
      credentialStatus: {
        id: "https://schemas.originvault.box/v1/status-lists/root-authority#0",
        type: "StatusList2021Entry",
        statusPurpose: "revocation",
        statusListIndex: "0",
        statusListCredential: "https://schemas.originvault.box/v1/status-lists/root-authority"
      }
    };
  }
};

/**
 * Type guards for runtime type checking
 */
export const OriginVaultRootAuthorityTypeGuards = {
  isOriginVaultRootAuthority(obj: any): obj is OriginVaultRootAuthority {
    return (
      obj &&
      typeof obj === 'object' &&
      Array.isArray(obj['@context']) &&
      Array.isArray(obj.type) &&
      obj.type.includes('RootAuthorityDeclaration') &&
      typeof obj.id === 'string' &&
      OriginVaultRootAuthorityUtils.validateDID(obj.id) &&
      obj.issuer &&
      obj.credentialSubject &&
      obj.termsOfUse &&
      obj.termsOfUse.type === 'RootAuthorityPolicy'
    );
  },

  isGovernanceModel(obj: any): obj is GovernanceModel {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.type === 'string' &&
      ['dao', 'committee', 'foundation', 'consortium'].includes(obj.type) &&
      Array.isArray(obj.participants) &&
      obj.participants.every((p: any) => typeof p === 'string')
    );
  },

  isDelegationPolicy(obj: any): obj is DelegationPolicy {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.allowsSubRoots === 'boolean' &&
      typeof obj.maxChainDepth === 'number' &&
      obj.maxChainDepth >= 1 &&
      obj.maxChainDepth <= 10
    );
  }
};

export default OriginVaultRootAuthority; 