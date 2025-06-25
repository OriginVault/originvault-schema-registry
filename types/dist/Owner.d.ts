/**
 * Generated from Owner.json
 * Schema: https://schemas.originvault.box/Owner
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines an owner role for vaults, plugins, and namespaces.
 */
export interface Owner {
    /**
     * Schema.org type
     */
    "@type"?: "Person" | "Organization";
    /**
     * DID of the owner.
     */
    ownerId: string;
    ownsVaults: string[];
    ownsPlugins: string[];
    ownsNamespaces: string[];
    delegatedAdmins?: string[];
    monetizationModel?: {
        revenueStreams?: string[];
        /**
         * Schedule for revenue payouts.
         */
        payoutSchedule?: string;
    };
    /**
     * Method for resolving ownership disputes.
     */
    disputeResolutionMethod?: "DAO Governance" | "Legal Arbitration" | "Community Voting";
    /**
     * Rules governing how ownership can be transferred.
     */
    transferPolicy?: string;
}
//# sourceMappingURL=Owner.d.ts.map