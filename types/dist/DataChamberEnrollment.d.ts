/**
 * Generated from DataChamberEnrollment.json
 * Schema: https://schemas.originvault.box/DataChamberEnrollment
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines how users enroll in data pools within Vault Chambers and the terms of participation.
 */
export interface DataChamberEnrollment {
    /**
     * DID of the Data Chamber.
     */
    chamberId: string;
    /**
     * DID of the user enrolling in the chamber.
     */
    userId: string;
    /**
     * List of data contributions by this user.
     */
    contributedData: {
        /**
         * DID of the data contribution.
         */
        dataId?: string;
        /**
         * When the data was added.
         */
        timestamp?: string;
    }[];
    /**
     * Whether the user has accepted the data-sharing terms.
     */
    termsAccepted: boolean;
    /**
     * Defines how rewards are distributed.
     */
    rewardEligibility: {
        /**
         * The percentage of sales the user is eligible for.
         */
        revenueSharePercentage?: number;
        /**
         * How users are rewarded.
         */
        rewardMechanism?: "Gems" | "Tokens" | "Fiat Payout";
    };
}
//# sourceMappingURL=DataChamberEnrollment.d.ts.map