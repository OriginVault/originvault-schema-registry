/**
 * Generated from RootAuthority.json
 * Schema: https://schemas.originvault.box/RootAuthority
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Declaration of a root authority establishing a trust chain for any namespace, platform, user, organization, community, or concept in a multi-root architecture.
 */
export interface RootAuthorityDeclaration {
  /**
   * JSON-LD context for interoperability with verifiable credentials and linked data ecosystems
   */
  "@context": string[];
  /**
   * Credential types following W3C Verifiable Credentials specification
   */
  type: string[];
  issuer: {
    /**
     * DID of the entity declaring itself as a root authority
     */
    id: string;
    /**
     * Name of the root authority
     */
    name?: string;
  };
  /**
   * When the root authority declaration was issued
   */
  issuanceDate: string;
  credentialSubject: {
    /**
     * DID of the root authority (same as issuer for self-declaration)
     */
    id: string;
    /**
     * Type of root authority being declared
     */
    rootType: "namespace" | "platform" | "user" | "organization" | "community" | "concept";
    /**
     * Scope or domain of authority
     */
    scope: string;
    /**
     * Purpose and goals of this trust chain
     */
    trustChainPurpose: string;
    governanceModel: {
      /**
       * Governance model for this root authority
       */
      type: "self-governed" | "dao" | "multisig" | "committee" | "democratic" | "consortium";
      /**
       * DIDs of governance participants (if applicable)
       */
      participants?: string[];
      /**
       * Reference to governance policies and procedures
       */
      policyDocument?: string;
    };
    delegationPolicy?: {
      /**
       * Whether this root authority can delegate to sub-roots
       */
      allowsSubRoots?: boolean;
      /**
       * Maximum depth of trust chain delegation
       */
      maxChainDepth?: number;
      /**
       * Criteria for delegating authority to trusted issuers
       */
      delegationCriteria?: string;
    };
    /**
     * Accreditation standards this root authority supports
     *
     * @minItems 1
     * @maxItems 20
     */
    accreditationStandards?:
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ]
      | [
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          },
          {
            /**
             * Identifier for the accreditation standard
             */
            standardId: string;
            /**
             * Credential types this root can accredit issuers for
             *
             * @minItems 1
             * @maxItems 10
             */
            schemaTypes:
              | [string]
              | [string, string]
              | [string, string, string]
              | [string, string, string, string]
              | [string, string, string, string, string]
              | [string, string, string, string, string, string]
              | [string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string]
              | [string, string, string, string, string, string, string, string, string, string];
            /**
             * Trust levels this root authority recognizes
             */
            trustLevels?: string[];
          }
        ];
    interoperability?: {
      /**
       * DIDs of other root authorities this root recognizes
       */
      recognizedRoots?: string[];
      /**
       * Whether this root supports cross-chain credential validation
       */
      crossChainValidation?: boolean;
      /**
       * Federation or consortium this root belongs to (optional)
       */
      federationMember?: string;
    };
    blockchainAnchoring?: {
      /**
       * Blockchain network where this root is anchored
       */
      blockchainNetwork?:
        | "cheqd-mainnet"
        | "cheqd-testnet"
        | "ethereum"
        | "polygon"
        | "hyperledger-indy";
      /**
       * Blockchain resource ID for this root authority
       */
      resourceId?: string;
      /**
       * Cryptographic proof of blockchain registration
       */
      registrationProof?: string;
    };
  };
  /**
   * Cryptographic proof of the root authority declaration
   */
  proof?: {};
  /**
   * Multi-root trust pattern type
   */
  rootType?: "self-sovereign" | "delegated" | "federated" | "hybrid";
  governanceModel?: {
    /**
     * Governance model for this root authority
     */
    type?: "dao" | "committee" | "consensus" | "hierarchical";
    /**
     * DIDs of governance participants
     */
    participants?: string[];
  };
  /**
   * Chain of trust delegation (for root authority, typically just itself)
   */
  delegationChain?: string[];
  /**
   * Contextual information about the trust chain purpose and scope
   */
  trustChainContext?: string;
  metadata?: {
    /**
     * Schema version for tracking evolution
     */
    version?: string;
    /**
     * Schema type identifier for BFF integration
     */
    schemaType?: "RootAuthority";
    /**
     * Indicates if schema supports BFF integration patterns
     */
    bffIntegration?: boolean;
  };
  /**
   * Timestamp when the root authority declaration was created
   */
  createdAt?: string;
  /**
   * Timestamp when the root authority declaration was last updated
   */
  updatedAt?: string;
  blockchainSync?: {
    /**
     * Blockchain transaction hash for this root authority declaration
     */
    transactionHash?: string;
    /**
     * Block number where transaction was confirmed
     */
    blockNumber?: number;
    /**
     * Blockchain network identifier
     */
    networkId?: "cheqd:mainnet" | "cheqd:testnet" | "ethereum:mainnet" | "ethereum:sepolia";
    /**
     * Last blockchain synchronization timestamp
     */
    lastSynced?: string;
  };
}
