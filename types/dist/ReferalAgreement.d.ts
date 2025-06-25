/**
 * Generated from ReferalAgreement.json
 * Schema: https://schemas.originvault.box/ReferalAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the rules for trust-based referrals and reputation scoring within the OV ecosystem.
 */
export interface ReferalAgreement {
    /**
     * Schema.org type
     */
    "@type"?: "License" | "CreativeWork";
    /**
     * DID of the agreement.
     */
    agreementId: string;
    /**
     * DID of the entity providing the referral.
     */
    referrerId: string;
    /**
     * DID of the entity receiving the referral.
     */
    referredEntityId: string;
    trustScoreImpact: {
        /**
         * Trust score increase from referral.
         */
        initialBoost?: number;
        /**
         * Conditions under which the referral can be revoked or slashed.
         */
        slashingConditions?: string;
    };
    /**
     * How referrers are rewarded if the referred entity performs well.
     */
    reputationRewards: string;
    /**
     * Whether both parties accepted the agreement.
     */
    agreementSigned: boolean;
    /**
     * Time of agreement acceptance.
     */
    timestamp: string;
}
//# sourceMappingURL=ReferalAgreement.d.ts.map