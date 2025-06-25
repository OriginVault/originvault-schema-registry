/**
 * Generated from Revocation.json
 * Schema: https://schemas.originvault.box/Revocation
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the revocation process for nodes, clusters, or users.
 */
export interface RevocationSchema {
  /**
   * The DID of the revocation record.
   */
  id: string;
  /**
   * The DID of the revoked entity (Node, Cluster, User).
   */
  entity: string;
  /**
   * The DID of the authority that revoked the entity.
   */
  revokedBy: string;
  /**
   * Explanation for the revocation.
   */
  reason: string;
  /**
   * References to evidence supporting revocation (e.g., governance vote logs).
   */
  linkedEvidence?: string[];
  /**
   * Timestamp of the revocation.
   */
  timestamp: string;
}
