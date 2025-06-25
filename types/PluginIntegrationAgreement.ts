/**
 * Generated from PluginIntegrationAgreement.json
 * Schema: https://schemas.originvault.box/PluginIntegrationAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the permissions and restrictions for a plugin installed in a Vault.
 */
export interface PluginIntegrationAgreement {
  /**
   * Schema.org type
   */
  "@type"?: "License" | "CreativeWork";
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the installed plugin.
   */
  pluginId: string;
  /**
   * DID of the Vault where the plugin is installed.
   */
  vaultId: string;
  permissions: {
    /**
     * Can the plugin access storage?
     */
    storageAccess?: boolean;
    /**
     * Can the plugin perform computations?
     */
    computeAccess?: boolean;
  };
  /**
   * Conditions under which the plugin may be removed.
   */
  revocationPolicy: string;
  /**
   * Whether the plugin provider has accepted the agreement.
   */
  agreementSigned: boolean;
}
