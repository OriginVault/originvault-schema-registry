/**
 * Generated from VaultDeclaration.json
 * Schema: https://schemas.originvault.io/VaultDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an OV Vault's ownership, governance, and access policies.
 */
export interface VaultDIDDeclaration {
  /**
   * The DID of the vault.
   */
  id: string;
  /**
   * Indicates this is a Vault DID declaration.
   */
  type?: "VaultDID";
  /**
   * The DID of the user or organization that owns this vault.
   */
  owner: string;
  /**
   * The DID of the OV cluster managing this vault.
   */
  cluster: string;
  /**
   * List of Storage Node DIDs storing this vault's data.
   */
  storageNodes: string[];
  /**
   * References to vault metadata, manifests, and access logs.
   */
  linkedResources?: {
    /**
     * The DID of the linked resource.
     */
    id: string;
    /**
     * The type of resource (e.g., Metadata, AccessLog, ContentManifest).
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
   * Defines who can access and modify the vault.
   */
  accessPolicies?: {
    /**
     * List of DIDs that can read from this vault.
     */
    readAccess?: string[];
    /**
     * List of DIDs that can write to this vault.
     */
    writeAccess?: string[];
    /**
     * Whether the vault is publicly accessible.
     */
    publicAccess?: boolean;
  };
  /**
   * Governance and compliance policies for the vault.
   */
  governance?: {
    /**
     * DID of the governance body managing vault policies (e.g., a DAO or admin).
     */
    governedBy?: string;
    /**
     * DID reference to a dispute resolution service.
     */
    disputeResolution?: string;
  };
  /**
   * Timestamp of when this vault declaration was issued.
   */
  timestamp: string;
}
