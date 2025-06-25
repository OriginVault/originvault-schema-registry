/**
 * Generated from TrustScore.json
 * Schema: https://schemas.originvault.box/TrustScore
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Represents a calculated trust score for a DID based on blockchain accreditations and local endorsements.
 */
export interface TrustScore {
    /**
     * DID of the entity being scored
     */
    did: string;
    /**
     * Overall trust score (0-100)
     */
    score: number;
    /**
     * Breakdown of trust score factors
     */
    factors: {
        /**
         * Score contribution from blockchain accreditations
         */
        accreditations: number;
        /**
         * Score contribution from local endorsements
         */
        endorsements: number;
        /**
         * Score contribution from recent activity
         */
        timeWeighted: number;
        /**
         * Score contribution from network diversity
         */
        networkEffects: number;
        /**
         * Score contribution from blockchain-based trust indicators
         */
        blockchainTrust: number;
    };
    /**
     * When the score was last calculated
     */
    lastCalculated: string;
    /**
     * Score decay factor (0 = no decay, 1 = full decay)
     */
    decay: number;
    /**
     * Blockchain synchronization status
     */
    blockchainSync?: {
        /**
         * Last time score was synced with blockchain
         */
        lastSynced?: string;
        /**
         * Whether there are local changes not yet pushed to blockchain
         */
        pendingChanges?: boolean;
        /**
         * Resource ID on blockchain for this trust score
         */
        blockchainResourceId?: string;
    };
    /**
     * Additional metadata for the trust score
     */
    metadata?: {};
}
//# sourceMappingURL=TrustScore.d.ts.map