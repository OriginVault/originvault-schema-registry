/**
 * Generated from NodeDeclaration.json
 * Schema: https://schemas.originvault.box/NodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an OV Node within a cluster with multi-root trust and BFF integration support.
 */
export interface NodeDeclaration {
  /**
   * JSON-LD type identifier for semantic interoperability.
   */
  "@type": "NodeDeclaration";
  /**
   * The DID of the node.
   */
  id: string;
  /**
   * Indicates this is a Node DID declaration.
   */
  type: "NodeDeclaration";
  /**
   * The Cluster DID this node belongs to.
   */
  cluster: string;
  /**
   * The functional role of this node.
   */
  role: "IdentityNode" | "StorageNode" | "ComputeNode" | "VerificationNode";
  /**
   * The DID of the entity that operates this node.
   */
  operator: string;
  /**
   * The operational status of the node.
   */
  status: "active" | "suspended" | "revoked";
  /**
   * Multi-root trust pattern: how this node establishes its root of trust.
   */
  rootType: "self-sovereign" | "delegated" | "federated" | "hybrid";
  /**
   * Multi-root trust pattern: governance model for trust decisions.
   */
  governanceModel: "hierarchical" | "democratic" | "consensus" | "autonomous";
  /**
   * Multi-root trust pattern: chain of authority delegation from root to this node.
   *
   * @minItems 1
   * @maxItems 10
   */
  delegationChain:
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
   * Multi-root trust pattern: URI to the trust chain context document.
   */
  trustChainContext: string;
  /**
   * BFF Integration: Metadata for API integration and versioning.
   */
  metadata: {
    /**
     * BFF Integration: Schema version for API compatibility.
     */
    version: string;
    /**
     * BFF Integration: Schema release date for version tracking.
     */
    schemaVersion: string;
    /**
     * BFF Integration: Category for API routing and filtering.
     */
    category:
      | "node-infrastructure"
      | "node-compute"
      | "node-storage"
      | "node-identity"
      | "node-verification";
  };
  /**
   * BFF Integration: Creation timestamp for audit trails.
   */
  createdAt: string;
  /**
   * BFF Integration: Last update timestamp for change tracking.
   */
  updatedAt: string;
  /**
   * BFF Integration: Blockchain synchronization status for distributed systems.
   */
  blockchainSync: {
    /**
     * Last successful blockchain synchronization timestamp.
     */
    lastSyncAt: string;
    /**
     * Transaction hash of the last blockchain update.
     */
    txHash: string;
    /**
     * Block number of the last blockchain update.
     */
    blockNumber: number;
  };
  /**
   * Linked resources associated with this node.
   */
  linkedResources?: {
    /**
     * The DID of the linked resource.
     */
    id: string;
    /**
     * The type of resource (e.g., GovernancePolicy, VerificationLog).
     */
    type: string;
    /**
     * The name of the linked resource.
     */
    name: string;
    /**
     * The description of the linked resource.
     */
    description: string;
    /**
     * The uri of the linked resource.
     */
    uri: string;
  }[];
  /**
   * Verification details for this node.
   */
  verificationPolicies?: {
    /**
     * List of validators who approved this node.
     */
    assignedBy?: string[];
    /**
     * Reference to verification policies in Ceramic.
     */
    verificationRules?: string;
  };
  /**
   * Timestamp of when this node declaration was issued.
   */
  timestamp: string;
}
