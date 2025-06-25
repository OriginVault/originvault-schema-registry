/**
 * Generated from DataChamberContributionAgreement.json
 * Schema: https://schemas.originvault.box/DataChamberContributorAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the terms under which a user contributes data to a Vault Chamber for potential monetization.
 */
export interface DataChamberContributorAgreement {
    /**
     * Schema.org type
     */
    "@type"?: "License" | "CreativeWork";
    /**
     * DID of the agreement.
     */
    agreementId: string;
    /**
     * DID of the Data Chamber.
     */
    chamberId: string;
    /**
     * DID of the contributor.
     */
    userId: string;
    dataUsageTerms: ("AI Training" | "Research" | "Commercial Use" | "Limited Redistribution")[];
    optOutPolicy: {
        /**
         * Whether users can opt out after contribution.
         */
        optOutAllowed?: boolean;
        /**
         * How long data is stored after opt-out.
         */
        dataRetentionPeriod?: string;
    };
    compensationModel: {
        /**
         * Percentage of revenue given to contributors.
         */
        revenueShare?: number;
        /**
         * How users are rewarded for their data.
         */
        rewardMechanism?: "Fiat Payout" | "Gems" | "Tokens";
    };
    /**
     * Whether the user has accepted the agreement.
     */
    agreementSigned: boolean;
    /**
     * Time of agreement acceptance.
     */
    timestamp: string;
}
//# sourceMappingURL=DataChamberContributionAgreement.d.ts.map