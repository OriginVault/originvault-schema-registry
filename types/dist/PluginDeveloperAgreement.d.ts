/**
 * Generated from PluginDeveloperAgreement.json
 * Schema: https://schemas.originvault.box/PluginDeveloperAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the terms for publishing a plugin in the OV ecosystem.
 */
export interface PluginDeveloperAgreement {
    /**
     * Schema.org type
     */
    "@type"?: "License" | "CreativeWork" | "SoftwareApplication";
    /**
     * DID of the agreement.
     */
    agreementId: string;
    /**
     * DID of the plugin.
     */
    pluginId: string;
    /**
     * DID of the developer.
     */
    developerId: string;
    /**
     * The security audit requirements for publishing a plugin.
     */
    securityRequirements: string;
    /**
     * How the plugin is monetized.
     */
    monetizationModel: "Free" | "Subscription" | "One-time Purchase";
    /**
     * Plugin compliance rules and enforcement.
     */
    compliancePolicy: string;
    /**
     * Conditions for plugin removal from the OV ecosystem.
     */
    revocationPolicy: string;
    /**
     * Whether the developer has accepted the agreement.
     */
    agreementSigned: boolean;
}
//# sourceMappingURL=PluginDeveloperAgreement.d.ts.map