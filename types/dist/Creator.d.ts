/**
 * Generated from Creator.json
 * Schema: https://schemas.originvault.io/Creator
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a content creator in the OriginVault ecosystem.
 */
export interface Creator {
    /**
     * Total number of published pieces.
     */
    totalPublishedContent: number;
    licenseAgreements: string[];
    /**
     * Defines AI usage restrictions for the creator's content.
     */
    aiUsagePolicies: {
        /**
         * Whether AI companies can train on this creator's content.
         */
        allowsAITraining?: boolean;
        /**
         * Whether AI can use content for inference.
         */
        allowsAIInference?: boolean;
    };
    /**
     * Tracks revenue earned by the creator.
     */
    earningsHistory?: {
        /**
         * Transaction ID for a sale.
         */
        transactionId?: string;
        /**
         * Earnings from the transaction.
         */
        amount?: number;
        /**
         * Date of transaction.
         */
        timestamp?: string;
    }[];
}
//# sourceMappingURL=Creator.d.ts.map