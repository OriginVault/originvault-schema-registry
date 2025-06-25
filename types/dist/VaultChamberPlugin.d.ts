/**
 * Generated from VaultChamberPlugin.json
 * Schema: https://schemas.originvault.box/VaultChamberPlugin
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Tracks plugins installed within a Vault Chamber and their permissions.
 */
export interface VaultChamberPlugin {
    /**
     * DID of the Vault Chamber.
     */
    chamberId: string;
    /**
     * DID of the installed plugin.
     */
    pluginId: string;
    /**
     * DID of the user who installed the plugin.
     */
    installedBy: string;
    permissions: {
        /**
         * Can the plugin access storage?
         */
        storageAccess?: boolean;
        /**
         * Can the plugin use compute resources?
         */
        computeAccess?: boolean;
        /**
         * Can the plugin interact with identity data?
         */
        identityAccess?: boolean;
    };
    /**
     * Timestamp when the plugin was installed.
     */
    installationDate: string;
}
//# sourceMappingURL=VaultChamberPlugin.d.ts.map