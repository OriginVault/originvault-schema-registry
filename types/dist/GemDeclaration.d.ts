/**
 * Generated from GemDeclaration.json
 * Schema: https://schemas.originvault.box/GemDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines an OriginVault Gem awarded to users for contributions.
 */
export interface GemDeclaration {
    /**
     * The unique DID of the Gem.
     */
    id: string;
    /**
     * The category of the gem.
     */
    type: "Founder's Gem" | "Verifier's Gem" | "Marker's Gem" | "Advocate's Gem" | "Builder's Gem" | "Curator's Gem" | "Trailblazer's Gem" | "Luminary's Gem";
    /**
     * DID of the user receiving the Gem.
     */
    recipient: string;
    /**
     * DID of the entity awarding the Gem.
     */
    issuer: string;
    /**
     * Date the Gem was issued.
     */
    dateIssued: string;
    /**
     * Additional metadata related to the Gem.
     */
    metadata: {
        /**
         * URL to the Gem's animated artwork.
         */
        video?: string;
        /**
         * Description of why the Gem was awarded.
         */
        description?: string;
    };
    /**
     * DID-Linked Resource (DLR) to the Verifiable Credential proving eligibility for the Gem.
     */
    verifiableCredential: string;
    /**
     * Whether the Gem is still recognized as valid.
     */
    revocationStatus: "valid" | "revoked";
}
//# sourceMappingURL=GemDeclaration.d.ts.map