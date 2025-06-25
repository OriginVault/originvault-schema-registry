/**
 * Generated from VaultChamberTagging.json
 * Schema: https://schemas.originvault.box/VaultChamberTagging
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the tagging system within a Vault, including permissions, allowed tags, and Data Chambers.
 */
export interface VaultChamberTagging {
    /**
     * DID of the Vault.
     */
    vaultId: string;
    /**
     * DID of the Vault administrator.
     */
    admin: string;
    /**
     * List of supported tags and their access control settings.
     */
    allowedTags: {
        /**
         * The supported tag.
         */
        tag?: string;
        /**
         * Whether this tag requires admin approval.
         */
        restricted?: boolean;
        /**
         * DID of a Data Chamber if this tag represents a data pool.
         */
        linkedChamber?: string;
    }[];
    /**
     * Defines user permissions for tagging.
     */
    userTaggingPermissions: {
        /**
         * Whether users can add their own tags.
         */
        allowUserTagging?: boolean;
        /**
         * Whether admin approval is required for new user tags.
         */
        moderationRequired?: boolean;
    };
}
//# sourceMappingURL=VaultChamberTagging.d.ts.map