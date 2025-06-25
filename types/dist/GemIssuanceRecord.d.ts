/**
 * Generated from GemIssuanceRecord.json
 * Schema: https://schemas.originvault.box/GemIssuance
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Tracks the issuance of a Gem, including verification of eligibility.
 */
export interface GemIssuanceRecord {
    /**
     * DID of the issued Gem.
     */
    gemId: string;
    /**
     * DID of the entity awarding the Gem.
     */
    issuer: string;
    /**
     * DID of the recipient of the Gem.
     */
    recipient: string;
    /**
     * Why the Gem was awarded.
     */
    justification: string;
    /**
     * Links to content proving the recipient earned the Gem.
     */
    supportingEvidence: string[];
    /**
     * Date the Gem was issued.
     */
    dateIssued: string;
    /**
     * DID-Linked Resource (DLR) containing the VC proving eligibility.
     */
    verifiableCredential: string;
}
//# sourceMappingURL=GemIssuanceRecord.d.ts.map