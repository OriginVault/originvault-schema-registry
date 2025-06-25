/**
 * Generated from PluginDeclaration.json
 * Schema: https://schemas.originvault.io/PluginDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a plugin registered in an OV Namespace, including governance, versioning, and compatibility.
 */
export interface PluginDeclaration {
  /**
   * Schema.org type defining the plugin category.
   */
  "@type": "SoftwareApplication" | "WebApplication" | "Extension" | "Protocol";
  /**
   * The DID of the plugin.
   */
  id: string;
  /**
   * The DID of the namespace this plugin belongs to.
   */
  namespace: string;
  /**
   * The DID of the vault that owns this plugin.
   */
  vault?: string;
  /**
   * Name of the plugin.
   */
  name: string;
  /**
   * Detailed description of the plugin’s functionality.
   */
  description?: string;
  /**
   * Semantic versioning (e.g., 1.0.0).
   */
  version: string;
  author: {
    /**
     * DID of the entity or user who created the plugin.
     */
    id?: string;
    /**
     * Author's name or organization.
     */
    name?: string;
    /**
     * Website or documentation link.
     */
    url?: string;
  };
  /**
   * The node types this plugin is designed to run on.
   */
  compatibleNodes: string[];
  /**
   * References to plugin documentation, code, or policies.
   */
  linkedResources?: {
    /**
     * The id of the linked resource.
     */
    id: string;
    /**
     * The name of the linked resource.
     */
    name?: string;
    /**
     * The description of the linked resource.
     */
    description?: string;
    /**
     * The URI of the linked resource.
     */
    uri?: string;
    /**
     * The type of resource (e.g., governance, metadata, event log).
     */
    type: string;
  }[];
  /**
   * Governance and compliance information for the plugin.
   */
  governance?: {
    /**
     * List of governance bodies or validators that approved the plugin.
     */
    approvedBy?: string[];
    /**
     * Reference to compliance policies stored in Ceramic.
     */
    complianceRules?: string;
  };
  /**
   * Defines how the plugin is installed and configured.
   */
  installation?: {
    /**
     * Defines where the plugin can be installed.
     */
    installMethod?: "VaultInstallation" | "NodeInstallation" | "GlobalInstallation";
    /**
     * List of other required plugins or services.
     */
    dependencies?: string[];
    /**
     * Link to a schema defining plugin-specific configuration options.
     */
    configurationSchema?: string;
  };
  /**
   * The current status of the plugin.
   */
  status: "active" | "deprecated" | "revoked";
  /**
   * Timestamp of when this plugin declaration was issued.
   */
  timestamp: string;
}
