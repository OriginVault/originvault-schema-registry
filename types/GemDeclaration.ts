/**
 * Generated from GemDeclaration.json
 * Schema: https://schemas.originvault.box/GemDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an OriginVault Gem awarded to users for contributions with multi-root trust and BFF integration support.
 */
export interface GemDeclaration {
  /**
   * JSON-LD type identifier for semantic interoperability.
   */
  "@type": "GemDeclaration";
  /**
   * The unique DID of the Gem.
   */
  id: string;
  /**
   * The category of the gem.
   */
  type:
    | "Founder's Gem"
    | "Verifier's Gem"
    | "Marker's Gem"
    | "Advocate's Gem"
    | "Builder's Gem"
    | "Curator's Gem"
    | "Trailblazer's Gem"
    | "Luminary's Gem";
  /**
   * DID of the user receiving the Gem.
   */
  recipient: string;
  /**
   * DID of the entity awarding the Gem.
   */
  issuer: string;
  /**
   * Date the Gem was issued.
   */
  dateIssued: string;
  /**
   * Multi-root trust pattern: how this gem establishes its root of trust.
   */
  rootType: "self-sovereign" | "delegated" | "federated" | "hybrid";
  /**
   * Multi-root trust pattern: governance model for trust decisions.
   */
  governanceModel: "hierarchical" | "democratic" | "consensus" | "autonomous";
  /**
   * Multi-root trust pattern: chain of authority delegation from root to this gem.
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
   * BFF Integration and Gem metadata.
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
    category: "credential-gem" | "credential-badge" | "credential-achievement";
    /**
     * URL to the Gem's animated artwork.
     */
    video?: string;
    /**
     * Description of why the Gem was awarded.
     */
    description: string;
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
   * DID-Linked Resource (DLR) to the Verifiable Credential proving eligibility for the Gem.
   */
  verifiableCredential: string;
  /**
   * Whether the Gem is still recognized as valid.
   */
  revocationStatus: "valid" | "revoked";
}
