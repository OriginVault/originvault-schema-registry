/**
 * Generated from GemRevocationRecord.json
 * Schema: https://schemas.originvault.box/GemRevocation
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines how a previously awarded Gem can be revoked if necessary.
 */
export interface GemRevocationRecord {
  /**
   * DID of the revoked Gem.
   */
  gemId: string;
  /**
   * DID of the entity revoking the Gem.
   */
  issuer: string;
  /**
   * The reason for revocation.
   */
  revocationReason: string;
  /**
   * Date the Gem was revoked.
   */
  revokedOn: string;
  /**
   * DID-Linked Resource (DLR) referencing the revoked Verifiable Credential.
   */
  verifiableCredentialRevoked: string;
}
