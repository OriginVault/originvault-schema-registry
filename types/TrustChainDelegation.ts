/**
 * Generated from TrustChainDelegation.json
 * Schema: https://schemas.originvault.box/TrustChainDelegation
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Verifiable delegation of trust authority from any root or trusted issuer to another entity in a trust chain.
 */
export interface TrustChainDelegation {
  "@context": string[];
  type: string[];
  issuer: {
    /**
     * DID of the delegating authority (root or trusted issuer)
     */
    id: string;
    /**
     * Name of the delegating authority
     */
    name?: string;
    /**
     * Type of authority making the delegation
     */
    authorityType: "root" | "trusted-issuer" | "delegated-authority";
  };
  /**
   * When the delegation was issued
   */
  issuanceDate: string;
  /**
   * When the delegation expires (optional)
   */
  expirationDate?: string;
  credentialSubject: {
    /**
     * DID of the entity receiving delegation
     */
    id: string;
    /**
     * Type of delegation being granted
     */
    delegationType: "trusted-issuer" | "sub-root" | "verifier" | "validator";
    trustChainContext: {
      /**
       * DID of the ultimate root authority in this chain
       */
      rootAuthority: string;
      /**
       * DID of the immediate parent in delegation chain
       */
      parentAuthority: string;
      /**
       * Depth in the trust chain (1 = direct from root)
       */
      chainDepth: number;
      /**
       * Namespace or domain scope of this delegation
       */
      namespace?: string;
    };
    /**
     * Specific authorities being delegated
     */
    delegatedAuthorities: {
      /**
       * Specific authority being delegated
       */
      authority:
        | "issue-credentials"
        | "verify-credentials"
        | "revoke-credentials"
        | "delegate-authority"
        | "update-schemas"
        | "manage-trust-lists";
      /**
       * Credential types or schemas this authority applies to
       */
      scope?: string[];
      /**
       * Conditions or limitations on this authority
       */
      conditions?: string;
    }[];
    constraints?: {
      /**
       * Maximum number of sub-delegations allowed
       */
      maxSubDelegations?: number;
      /**
       * Types of delegations this entity can make
       */
      allowedDelegationTypes?: string[];
      /**
       * Geographic limitations on delegation scope
       */
      geographicScope?: string[];
      /**
       * Industry or domain limitations
       */
      industryScope?: string[];
    };
    operationalRequirements?: {
      /**
       * Technical standards the delegate must follow
       */
      technicalStandards?: string[];
      /**
       * Audit and compliance requirements
       */
      auditRequirements?: string;
      /**
       * Reporting obligations to delegating authority
       */
      reportingRequirements?: string;
      /**
       * Insurance or bonding requirements
       */
      insuranceRequirements?: string;
    };
    revocationConditions?: {
      /**
       * DIDs of entities that can revoke this delegation
       */
      revocableBy?: string[];
      /**
       * Conditions under which delegation can be revoked
       */
      revocationCriteria?: string[];
      /**
       * Process for appealing revocation decisions
       */
      appealProcess?: string;
    };
  };
  termsOfUse?: {
    /**
     * Reference to the delegation agreement document
     */
    delegationAgreement?: string;
    /**
     * Legal jurisdiction governing this delegation
     */
    governingLaw?: string;
  };
  /**
   * Cryptographic proof of the delegation
   */
  proof?: {};
}
