/**
 * Generated from VerificationNode.json
 * Schema: https://schemas.originvault.box/VerificationNodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a Verification Node in an OV Cluster.
 */
export interface VerificationNodeDeclaration {
  /**
   * The DID of the Verification Node.
   */
  id: string;
  /**
   * Node type.
   */
  type?: "VerificationNode";
  /**
   * The DID of the cluster this node belongs to.
   */
  cluster: string;
  /**
   * DID of the entity operating this node.
   */
  operator: string;
  /**
   * List of supported verification tasks (e.g., DID Validation, Signature Verification, Compliance Checks).
   */
  verificationTasks: string[];
  /**
   * References to stored resources.
   */
  linkedResources?: {
    /**
     * The DID of the linked resource.
     */
    id: string;
    /**
     * The type of resource (e.g., Data, Metadata, ContentManifest).
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
   * Trust level assigned to this node based on verification authority.
   */
  trustLevel: "Low" | "Medium" | "High";
  /**
   * Reference to a log of verification checks performed.
   */
  verificationLogs?: string;
  /**
   * Operational status of the node.
   */
  status: "active" | "suspended" | "revoked";
  /**
   * Timestamp of node declaration.
   */
  timestamp: string;
}
