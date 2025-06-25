/**
 * Generated from StorageNodeDeclaration.json
 * Schema: https://schemas.originvault.box/StorageNodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a Storage Node in an OV Cluster.
 */
export interface StorageNodeDeclaration {
  /**
   * The DID of the Storage Node.
   */
  id: string;
  /**
   * Node type.
   */
  type?: "StorageNode";
  /**
   * The DID of the cluster this node belongs to.
   */
  cluster: string;
  /**
   * DID of the entity operating this node.
   */
  operator: string;
  /**
   * Type of storage system used.
   */
  storageType: "MinIO" | "IPFS" | "Arweave" | "Verida";
  /**
   * Storage capacity available (e.g., 1TB, 100GB).
   */
  storageCapacity: string;
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
   * Operational status of the node.
   */
  status: "active" | "suspended" | "revoked";
  /**
   * Timestamp of node declaration.
   */
  timestamp: string;
}
