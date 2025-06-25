/**
 * Generated from Persona.json
 * Schema: https://schemas.originvault.box/Persona
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a persona in the OriginVault ecosystem.
 */
export interface Persona {
    /**
     * Schema.org type
     */
    "@type"?: string;
    /**
     * DID of the persona.
     */
    personaId: string;
    /**
     * User's display name or pseudonym.
     */
    displayName?: string;
    /**
     * The primary DID associated with this persona.
     */
    associatedDID: string;
    /**
     * Role of the user within the OV ecosystem.
     */
    personaType: "Creator" | "Verifier" | "Vault Operator" | "Community Member" | "AI Trainer";
    /**
     * Date of persona creation.
     */
    joinedDate: string;
    /**
     * Tracks the persona's trust and reputation.
     */
    reputationScore?: {
        /**
         * A calculated trust score based on activity and endorsements.
         */
        trustLevel?: number;
        endorsements?: string[];
    };
    badges?: string[];
    /**
     * Logs important persona actions within OV.
     */
    activityLog?: {
        /**
         * Type of activity performed.
         */
        activityType?: string;
        /**
         * Timestamp of activity.
         */
        timestamp?: string;
    }[];
    linkedSocials?: string[];
}
//# sourceMappingURL=Persona.d.ts.map