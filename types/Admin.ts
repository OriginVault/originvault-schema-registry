/**
 * Generated from Admin.json
 * Schema: https://schemas.originvault.box/Admin
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines an administrator role within OriginVault, including governance and permissions.
 */
export interface Admin {
  /**
   * Schema.org type indicating whether this admin is a person or organization
   */
  "@type"?: "Person" | "Organization";
  /**
   * DID of the admin.
   */
  adminId: string;
  /**
   * Array of vault DIDs that this admin has governance authority over
   *
   * @minItems 1
   * @maxItems 100
   */
  governsVaults: [string, ...string[]];
  /**
   * Array of infrastructure node DIDs that this admin manages
   *
   * @minItems 0
   * @maxItems 50
   */
  managesNodes: string[];
  /**
   * Array of governance policy DIDs that this admin has approved
   *
   * @minItems 1
   * @maxItems 200
   */
  policyApprovals: [string, ...string[]];
  /**
   * Records enforcement actions taken by the admin
   *
   * @minItems 0
   * @maxItems 1000
   */
  enforcementActions?: {
    /**
     * DID of the action taken.
     */
    actionId: string;
    /**
     * DID of the entity affected by the action.
     */
    targetEntity: string;
    /**
     * Reason for enforcement action.
     */
    reason: string;
    /**
     * ISO 8601 timestamp of when the enforcement action was taken
     */
    timestamp: string;
  }[];
  /**
   * Array of namespace DIDs that have granted trust to this admin
   *
   * @minItems 0
   * @maxItems 50
   */
  trustedByNamespaces?: string[];
  /**
   * Level of security clearance granted to the admin
   */
  securityClearanceLevel?: "low" | "medium" | "high";
}
