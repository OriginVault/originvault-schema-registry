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
     * Schema.org type
     */
    "@type"?: "Person" | "Organization";
    /**
     * DID of the admin.
     */
    adminId: string;
    governsVaults: string[];
    managesNodes: string[];
    policyApprovals: string[];
    /**
     * Records enforcement actions taken by the admin.
     */
    enforcementActions?: {
        /**
         * DID of the action taken.
         */
        actionId?: string;
        /**
         * DID of the entity affected by the action.
         */
        targetEntity?: string;
        /**
         * Reason for enforcement.
         */
        reason?: string;
        /**
         * Time of enforcement action.
         */
        timestamp?: string;
    }[];
    trustedByNamespaces?: string[];
    /**
     * Level of security clearance granted to the admin.
     */
    securityClearanceLevel?: "low" | "medium" | "high";
}
//# sourceMappingURL=Admin.d.ts.map