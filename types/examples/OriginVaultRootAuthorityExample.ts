/**
 * Example usage of OriginVaultRootAuthority TypeScript types
 * This demonstrates the practical application of the generated types
 */

import {
  OriginVaultRootAuthority,
  OriginVaultRootAuthorityUtils,
  OriginVaultRootAuthorityExamples,
  OriginVaultRootAuthorityTypeGuards,
  GovernanceType,
  RootType,
  IssuerType,
  DEFAULT_CONTEXT
} from '../OriginVaultRootAuthority';

/**
 * Example 1: Creating a minimal root authority
 */
export function createBasicRootAuthority(): OriginVaultRootAuthority {
  return OriginVaultRootAuthorityUtils.createMinimal({
    id: "did:cheqd:testnet:example-root-authority",
    issuerDid: "did:cheqd:testnet:example-root-authority",
    issuerName: "Example Content Authority",
    issuerType: "Organization" as IssuerType,
    rootType: "namespace" as RootType,
    scope: "digital-content-verification",
    trustChainPurpose: "Establishing trust for digital content verification in educational institutions",
    governanceType: "committee" as GovernanceType,
    participants: [
      "did:cheqd:testnet:education-board",
      "did:cheqd:testnet:academic-council"
    ],
    recognizedRoots: [
      "did:web:w3.org",
      "did:web:schema.org"
    ],
    governanceFramework: "https://example.edu/governance/root-authority-policy"
  });
}

/**
 * Example 2: Using the canonical OriginVault root authority
 */
export function getCanonicalRootAuthority(): OriginVaultRootAuthority {
  return OriginVaultRootAuthorityExamples.createCanonical();
}

/**
 * Example 3: Validating a root authority credential
 */
export function validateRootAuthority(credential: unknown): boolean {
  // Type guard check
  if (!OriginVaultRootAuthorityTypeGuards.isOriginVaultRootAuthority(credential)) {
    console.error("Invalid root authority credential structure");
    return false;
  }

  // Validate DID format
  if (!OriginVaultRootAuthorityUtils.validateDID(credential.id)) {
    console.error("Invalid DID format");
    return false;
  }

  // Check if it's actually a root authority declaration
  if (!OriginVaultRootAuthorityUtils.isRootAuthorityDeclaration(credential.type)) {
    console.error("Credential is not a RootAuthorityDeclaration");
    return false;
  }

  // Validate credential subject
  if (!OriginVaultRootAuthorityUtils.validateCredentialSubject(credential.credentialSubject)) {
    console.error("Invalid credential subject");
    return false;
  }

  return true;
}

/**
 * Example 4: Working with accreditation standards
 */
export function checkAccreditationSupport(
  credential: OriginVaultRootAuthority,
  schemaType: string
): boolean {
  return OriginVaultRootAuthorityUtils.supportsSchemaType(credential, schemaType);
}

/**
 * Example 5: Getting trust levels from a root authority
 */
export function extractTrustLevels(credential: OriginVaultRootAuthority): string[] {
  return OriginVaultRootAuthorityUtils.getTrustLevels(credential);
}

/**
 * Example 6: Custom root authority for a specific use case
 */
export function createEducationalRootAuthority(): OriginVaultRootAuthority {
  const credential: OriginVaultRootAuthority = {
    "@context": [...DEFAULT_CONTEXT],
    type: ["VerifiableCredential", "RootAuthorityDeclaration"],
    id: "did:cheqd:mainnet:global-education-authority",
    issuer: {
      id: "did:cheqd:mainnet:global-education-authority",
      name: "Global Education Authority",
      type: "Foundation"
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: "did:cheqd:mainnet:global-education-authority",
      rootType: "federation",
      scope: "educational-content-verification-ecosystem",
      trustChainPurpose: "Establishing verifiable credentials for educational content, certificates, and academic achievements",
      governanceModel: {
        type: "consortium",
        participants: [
          "did:cheqd:mainnet:unesco-education-board",
          "did:cheqd:mainnet:international-academic-council",
          "did:cheqd:mainnet:global-university-alliance"
        ],
        policyDocument: "https://education.authority.org/governance/policy-v2"
      },
      delegationPolicy: {
        allowsSubRoots: true,
        maxChainDepth: 4,
        accreditationRequired: true
      },
      accreditationStandards: [
        {
          standardId: "educational-credential-issuer-v1",
          schemaTypes: ["AcademicCredential", "CertificationCredential", "CourseCompletionCredential"],
          trustLevels: ["basic", "accredited", "university-grade", "international"]
        },
        {
          standardId: "content-authenticity-education-v1",
          schemaTypes: ["EducationalContentCredential", "PeerReviewCredential"],
          trustLevels: ["reviewed", "expert-verified", "institution-endorsed"]
        }
      ],
      interoperability: {
        recognizedRoots: [
          "did:web:w3.org",
          "did:web:schema.org",
          "did:web:unesco.org",
          "did:cheqd:mainnet:originvault-root-authority"
        ],
        crossChainValidation: true,
        federationMember: "global-education-trust-federation",
        standardsCompliance: {
          w3c: ["DID-Core", "VerifiableCredentials", "CredentialStatusList"],
          schemaOrg: ["EducationalOrganization", "Course", "Credential"],
          dif: ["PresentationExchange-v2", "CredentialManifest-v1"]
        }
      },
      blockchainAnchoring: {
        blockchainNetwork: "cheqd:mainnet",
        resourceId: "did:cheqd:mainnet:global-education-authority/resources/root-declaration",
        registrationProof: {
          type: "Ed25519Signature2020",
          verificationMethod: "did:cheqd:mainnet:global-education-authority#key-1"
        }
      }
    },
    termsOfUse: {
      type: "RootAuthorityPolicy",
      governanceFramework: "https://education.authority.org/governance/policy-v2",
      delegationScope: "educational-verification-ecosystem",
      interoperabilityCommitment: "Full interoperability with global education standards and W3C specifications"
    },
    credentialStatus: {
      id: "https://education.authority.org/v1/status-lists/root-authority#0",
      type: "StatusList2021Entry",
      statusPurpose: "revocation",
      statusListIndex: "0",
      statusListCredential: "https://education.authority.org/v1/status-lists/root-authority"
    }
  };

  return credential;
}

/**
 * Example 7: Error handling and type safety demonstration
 */
export function processRootAuthorityData(data: unknown): {
  success: boolean;
  credential?: OriginVaultRootAuthority;
  error?: string;
} {
  try {
    // Type guard check
    if (!OriginVaultRootAuthorityTypeGuards.isOriginVaultRootAuthority(data)) {
      return {
        success: false,
        error: "Data is not a valid OriginVaultRootAuthority credential"
      };
    }

    // Additional validation
    if (!validateRootAuthority(data)) {
      return {
        success: false,
        error: "Root authority credential failed validation checks"
      };
    }

    // TypeScript now knows `data` is OriginVaultRootAuthority
    const trustLevels = OriginVaultRootAuthorityUtils.getTrustLevels(data);
    console.log(`Root authority supports trust levels: ${trustLevels.join(', ')}`);

    const supportsContentAuth = OriginVaultRootAuthorityUtils.supportsSchemaType(
      data, 
      "ContentAuthenticityCredential"
    );
    console.log(`Supports content authenticity: ${supportsContentAuth}`);

    return {
      success: true,
      credential: data
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

/**
 * Example 8: Integration with existing systems
 */
export interface TrustChainValidationResult {
  valid: boolean;
  rootAuthority?: OriginVaultRootAuthority;
  trustLevel?: string;
  chainDepth: number;
  issues: string[];
}

export function validateTrustChain(
  rootCredential: OriginVaultRootAuthority,
  delegationChain: string[]
): TrustChainValidationResult {
  const result: TrustChainValidationResult = {
    valid: true,
    rootAuthority: rootCredential,
    chainDepth: delegationChain.length,
    issues: []
  };

  // Check max chain depth
  const maxDepth = rootCredential.credentialSubject.delegationPolicy.maxChainDepth;
  if (delegationChain.length > maxDepth) {
    result.valid = false;
    result.issues.push(`Chain depth ${delegationChain.length} exceeds maximum ${maxDepth}`);
  }

  // Check if sub-roots are allowed
  if (delegationChain.length > 0 && !rootCredential.credentialSubject.delegationPolicy.allowsSubRoots) {
    result.valid = false;
    result.issues.push("Root authority does not allow sub-root delegation");
  }

  // Extract trust level from accreditation standards
  const trustLevels = OriginVaultRootAuthorityUtils.getTrustLevels(rootCredential);
  if (trustLevels.length > 0) {
    result.trustLevel = trustLevels[0]; // Use the first trust level as default
  }

  return result;
}

// Export all examples for easy testing
export const examples = {
  createBasicRootAuthority,
  getCanonicalRootAuthority,
  validateRootAuthority,
  checkAccreditationSupport,
  extractTrustLevels,
  createEducationalRootAuthority,
  processRootAuthorityData,
  validateTrustChain
}; 