/**
 * Generated from VaultUserAgreement.json
 * Schema: https://schemas.originvault.box/VaultUserAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the terms for users accessing content within a Vault.
 */
export interface VaultUserAgreement {
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the Vault being accessed.
   */
  vaultId: string;
  /**
   * DID of the user.
   */
  userId: string;
  accessPermissions: {
    /**
     * Whether the user can view content.
     */
    read?: boolean;
    /**
     * Whether the user can contribute content.
     */
    write?: boolean;
    /**
     * Whether the user can buy content.
     */
    purchase?: boolean;
  };
  /**
   * Restrictions on how the user can use the content.
   */
  usageRestrictions: ("No Redistribution" | "No AI Training" | "No Commercial Use")[];
  /**
   * Conditions under which access can be revoked.
   */
  revocationPolicy: string;
  /**
   * Whether the user has accepted the agreement.
   */
  agreementSigned: boolean;
  /**
   * Time of agreement acceptance.
   */
  timestamp: string;
}
