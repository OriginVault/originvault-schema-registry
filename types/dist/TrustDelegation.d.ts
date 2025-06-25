/**
 * Generated from TrustDelegation.json
 * Schema: https://schemas.originvault.box/TrustEndorsement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Allows trusted users to endorse others, strengthening the trust economy.
 */
export interface TrustDelegation {
    /**
     * DID of the user endorsing another user.
     */
    endorser: string;
    /**
     * DID of the endorsed user.
     */
    recipient: string;
    /**
     * Why the user is being endorsed.
     */
    endorsementReason: string;
    /**
     * Category of the endorsement.
     */
    endorsementType: "verification" | "governance" | "community" | "development";
    /**
     * Time when the endorsement was given.
     */
    timestamp: string;
    /**
     * The Gem that qualifies the endorser to give this endorsement.
     */
    linkedGem: string;
    /**
     * DID-Linked Resource to a Verifiable Credential supporting the endorsement.
     */
    linkedCredential: string;
}
//# sourceMappingURL=TrustDelegation.d.ts.map