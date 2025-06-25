/**
 * Generated from VaultOperator.json
 * Schema: https://schemas.originvault.box/VaultOperatorPersona
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a vault operator in the OriginVault ecosystem.
 */
export interface VaultOperatorPersona {
  managedVaults: string[];
  /**
   * Defines how the vault is governed.
   */
  governanceModel: "Admin-Controlled" | "DAO-Based" | "Token-Weighted";
  /**
   * Defines policies for managing vault access and revenue.
   */
  vaultAccessPolicies: {
    /**
     * Whether non-members can contribute to the vault.
     */
    allowsPublicContributions?: boolean;
    /**
     * Defines the revenue model for content access.
     */
    monetizationModel?: "Subscription" | "Pay-per-View" | "One-Time Purchase";
  };
}
