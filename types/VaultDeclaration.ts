/**
 * Generated from VaultDeclaration.json
 * Schema: https://schemas.originvault.io/VaultDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an OV Vault's ownership, governance, and access policies with multi-root trust and BFF integration support.
 */
export interface VaultDIDDeclaration {
  /**
   * JSON-LD type identifier for semantic interoperability.
   */
  "@type": "VaultDeclaration";
  /**
   * The DID of the vault.
   */
  id: string;
  /**
   * Indicates this is a Vault DID declaration.
   */
  type: "VaultDID";
  /**
   * Multi-root trust pattern: how this vault establishes its root of trust.
   */
  rootType: "self-sovereign" | "delegated" | "federated" | "hybrid";
  /**
   * Multi-root trust pattern: governance model for trust decisions.
   */
  governanceModel: "hierarchical" | "democratic" | "consensus" | "autonomous";
  /**
   * Multi-root trust pattern: chain of authority delegation from root to this vault.
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
    category: "vault-infrastructure" | "vault-content" | "vault-governance";
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
   * The DID of the user or organization that owns this vault.
   */
  owner: string;
  /**
   * The DID of the OV cluster managing this vault.
   */
  cluster: string;
  /**
   * List of Storage Node DIDs storing this vault's data.
   *
   * @minItems 1
   * @maxItems 100
   */
  storageNodes: [string, ...string[]];
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
