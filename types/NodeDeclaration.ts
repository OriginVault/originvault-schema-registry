/**
 * Generated from NodeDeclaration.json
 * Schema: https://schemas.originvault.box/NodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an OV Node within a cluster.
 */
export interface NodeDeclaration {
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
