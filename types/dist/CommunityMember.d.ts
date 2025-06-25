/**
 * Generated from CommunityMember.json
 * Schema: https://schemas.originvault.box/CommunityMemberPersona
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a general community member in the OriginVault ecosystem.
 */
export interface CommunityMemberPersona {
    /**
     * Tracks engagement in OV-related activities.
     */
    participationHistory: {
        /**
         * Type of participation (e.g., event, discussion, content rating).
         */
        activity?: string;
        /**
         * Date of participation.
         */
        timestamp?: string;
    }[];
    referredUsers?: string[];
}
//# sourceMappingURL=CommunityMember.d.ts.map