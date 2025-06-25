/**
 * Generated from VaultPluginInstallationLog.json
 * Schema: https://schemas.originvault.box/PluginInstallationLog
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Tracks the installation of plugins within an OV Vault, ensuring compliance with cluster policies.
 */
export interface PluginInstallationLog {
  /**
   * The DID of the vault plugin installation.
   */
  id: string;
  /**
   * The DID of the vault where the plugin is installed.
   */
  vault: string;
  /**
   * The DID of the installed plugin.
   */
  plugin: string;
  /**
   * The DID of the cluster the vault belongs to.
   */
  cluster: string;
  /**
   * DID of the entity that installed the plugin.
   */
  installedBy: string;
  /**
   * The status of the plugin installation.
   */
  status: "installed" | "active" | "suspended" | "removed";
  /**
   * Timestamp of installation.
   */
  timestamp: string;
}
