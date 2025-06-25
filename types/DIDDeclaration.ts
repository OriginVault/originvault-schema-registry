/**
 * Generated from DIDDeclaration.json
 * Schema: https://schemas.originvault.box/DIDDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the role and permissions of a DID in an OV Cluster.
 */
export interface DIDDeclaration {
  /**
   * The DID of the entity declaring itself.
   */
  id: string;
  /**
   * The type of DID declaration.
   */
  type:
    | "NamespaceDeclaration"
    | "NodeClusterDeclaration"
    | "NodeDeclaration"
    | "VaultDeclaration"
    | "IdentityNodeDeclaration"
    | "StorageNodeDeclaration"
    | "VaultOwnerDeclaration";
  /**
   * The DID of the parent entity (e.g., a Cluster under a Namespace, or a Node under a Cluster).
   */
  parent?: string;
  /**
   * The roles assigned to this DID (e.g., IdentityNode, StorageNode, VaultOwner).
   */
  roles?: string[];
  /**
   * Governance settings for this DID.
   */
  governance?: {
    /**
     * List of DIDs that govern this entity.
     */
    managedBy?: string[];
    /**
     * A reference to governance policies (e.g., Ceramic document).
     */
    rules?: string;
  };
}
