/**
 * Generated from NamespacePluginDeclaration.json
 * Schema: https://schemas.originvault.box/NamespacePluginDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Declares a plugin registered under a namespace.
 */
export interface NamespacePluginDeclaration {
  /**
   * The DID of the namespace plugin.
   */
  id: string;
  /**
   * The DID of the namespace that owns this plugin.
   */
  namespace: string;
  /**
   * Name of the plugin.
   */
  name: string;
  /**
   * Semantic versioning (e.g., 1.0.0).
   */
  version: string;
  /**
   * DID of the entity or user who created the plugin.
   */
  author: string;
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
     * The uri of the linked resource.
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
   * Current status of the plugin.
   */
  status: "active" | "deprecated" | "revoked";
  /**
   * Timestamp of when this plugin declaration was issued.
   */
  timestamp: string;
}
