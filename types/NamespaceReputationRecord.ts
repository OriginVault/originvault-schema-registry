/**
 * Generated from NamespaceReputationRecord.json
 * Schema: https://schemas.originvault.box/NamespaceReputationRecord
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Verifiable record of an entity's reputation within a namespace, including trust scores and endorsements.
 */
export interface NamespaceReputationRecord {
  /**
   * DID of the Reputation Record.
   */
  id: string;
  /**
   * DID of the namespace issuing the reputation record.
   */
  namespace: string;
  /**
   * DID of the entity whose reputation is being recorded.
   */
  entity: string;
  /**
   * Numerical representation of the entity’s reputation within the namespace.
   */
  trustScore: number;
  /**
   * List of contributions made by the entity.
   */
  contributions: {
    /**
     * Nature of contribution (e.g., governance vote, data contribution, content verification).
     */
    type: string;
    /**
     * Date of contribution.
     */
    date: string;
    /**
     * DID of entity that verified this contribution.
     */
    verifiedBy: string;
  }[];
  /**
   * Endorsements received from other trusted entities.
   */
  endorsements: {
    /**
     * DID of the entity giving the endorsement.
     */
    from: string;
    /**
     * Optional endorsement message.
     */
    message?: string;
    /**
     * Date of endorsement.
     */
    date: string;
  }[];
  /**
   * Cryptographic proof for this reputation record.
   */
  proof: {
    /**
     * Proof type (e.g., JSON-LD Signature, EdDSA Signature, zk-SNARK Proof).
     */
    type: string;
    /**
     * Timestamp of proof creation.
     */
    created: string;
    /**
     * DID or method used to verify this proof.
     */
    verificationMethod: string;
    /**
     * Base64 or hex-encoded signature.
     */
    signatureValue: string;
  };
}
