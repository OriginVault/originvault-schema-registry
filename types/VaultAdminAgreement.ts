/**
 * Generated from VaultAdminAgreement.json
 * Schema: https://schemas.originvault.box/VaultAdminAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the responsibilities and permissions of a Vault administrator.
 */
export interface VaultAdministratorAgreement {
  /**
   * Schema.org type
   */
  "@type"?: "License" | "CreativeWork";
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the Vault.
   */
  vaultId: string;
  /**
   * DID of the administrator.
   */
  adminId: string;
  permissions: {
    /**
     * Can the admin control tagging policies?
     */
    manageTags?: boolean;
    /**
     * Can the admin approve plugin installations?
     */
    approvePlugins?: boolean;
    /**
     * Can the admin manage user access?
     */
    controlAccess?: boolean;
  };
  /**
   * Link to the governance framework this admin follows.
   */
  governanceRules: string;
  /**
   * Under what conditions an admin's privileges can be revoked.
   */
  revocationPolicy: string;
  /**
   * Whether the admin has accepted the agreement.
   */
  agreementSigned: boolean;
  /**
   * Time of agreement acceptance.
   */
  timestamp: string;
}
