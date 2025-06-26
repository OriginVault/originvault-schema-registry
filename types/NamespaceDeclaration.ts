/**
 * Generated from NamespaceDeclaration.json
 * Schema: https://schemas.originvault.box/NamespaceDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a namespace as a root authority that can establish trust chains and governance rules for its domain in a multi-root architecture.
 */
export interface NamespaceDeclaration {
  /**
   * JSON-LD context for interoperability with verifiable credentials and linked data ecosystems
   */
  "@context": string[];
  /**
   * The DID of the namespace acting as a root authority
   */
  id: string;
  /**
   * Indicates this is a Namespace DID declaration
   */
  type?: "NamespaceDeclaration";
  /**
   * The domain or scope of this namespace
   */
  namespaceScope: string;
  rootAuthority: {
    /**
     * This namespace acts as a root authority
     */
    rootType: "namespace";
    /**
     * Primary purpose of trust chains in this namespace
     */
    trustChainPurpose: string;
    delegationPolicy?: {
      /**
       * Whether this namespace delegates to trusted issuers
       */
      allowsTrustedIssuers?: boolean;
      /**
       * Whether issuers must be accredited by this namespace
       */
      requiresAccreditation?: boolean;
      /**
       * Maximum depth of delegation chains
       */
      maxDelegationDepth?: number;
    };
  };
  governance: {
    /**
     * How this namespace makes governance decisions
     */
    governanceModel:
      | "self-governed"
      | "dao"
      | "multisig"
      | "committee"
      | "democratic"
      | "consortium";
    /**
     * DIDs of entities involved in namespace governance
     */
    governingParties?: string[];
    /**
     * Reference to namespace governance policies and procedures
     */
    policyFramework?: string;
  };
  interoperability?: {
    /**
     * DIDs of other namespaces this namespace recognizes or federates with
     */
    recognizedNamespaces?: string[];
    /**
     * Whether credentials from other namespaces are accepted
     */
    crossNamespaceValidation?: boolean;
    /**
     * Namespace federation or consortium membership (optional)
     */
    federationMember?: string;
  };
  termsOfUse: {
    /**
     * The trust framework for the namespace
     */
    trustFramework: string;
    /**
     * The ID of the trust framework for the namespace
     */
    trustFrameworkId: string;
    /**
     * The version of the trust framework for the namespace
     */
    trustFrameworkVersion: string;
    /**
     * The URL of the trust framework for the namespace
     */
    trustFrameworkUrl: string;
    /**
     * The terms of use for the namespace
     */
    trustFrameworkTerms: string;
  };
  blockchainAnchoring?: {
    /**
     * Blockchain network where this namespace is anchored
     */
    blockchainNetwork?:
      | "cheqd-mainnet"
      | "cheqd-testnet"
      | "ethereum"
      | "polygon"
      | "hyperledger-indy";
    /**
     * Blockchain resource ID for this namespace
     */
    resourceId?: string;
  };
  /**
   * Multi-root trust pattern type
   */
  rootType?: "self-sovereign" | "delegated" | "federated" | "hybrid";
  governanceModel?: {
    /**
     * Governance model for this namespace
     */
    type?: "dao" | "committee" | "consensus" | "hierarchical";
    /**
     * DIDs of governance participants
     */
    participants?: string[];
  };
  /**
   * Chain of trust delegation (for namespace authority, typically just itself)
   */
  delegationChain?: string[];
  /**
   * Contextual information about the namespace trust chain purpose and scope
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
    schemaType?: "NamespaceDeclaration";
    /**
     * Indicates if schema supports BFF integration patterns
     */
    bffIntegration?: boolean;
  };
  /**
   * Timestamp when the namespace declaration was created
   */
  createdAt?: string;
  /**
   * Timestamp when the namespace declaration was last updated
   */
  updatedAt?: string;
  blockchainSync?: {
    /**
     * Blockchain transaction hash for this namespace declaration
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
