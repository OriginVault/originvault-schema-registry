/**
 * Generated from ExternalBuyerAgreement.json
 * Schema: https://schemas.originvault.box/ExternalDataBuyerAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the terms under which an external stakeholder purchases access to a Vault Chamber’s data.
 */
export interface ExternalDataBuyerAgreement {
    /**
     * Schema.org type
     */
    "@type"?: "License" | "CreativeWork";
    /**
     * DID of the agreement.
     */
    agreementId: string;
    /**
     * DID of the Data Chamber being accessed.
     */
    chamberId: string;
    /**
     * DID of the external entity purchasing access.
     */
    buyerId: string;
    accessTerms: {
        /**
         * Price paid for access.
         */
        price?: number;
        /**
         * How long the data is accessible.
         */
        licenseDuration?: string;
        usageRestrictions?: ("No AI Training" | "No Redistribution" | "Limited Commercial Use")[];
        /**
         * Conditions under which access may be revoked.
         */
        revocationPolicy?: string;
    };
    /**
     * Verifiable Credential proving payment.
     */
    paymentProof: string;
    /**
     * Whether the buyer has accepted the agreement.
     */
    agreementSigned: boolean;
    /**
     * Time of agreement acceptance.
     */
    timestamp: string;
}
//# sourceMappingURL=ExternalBuyerAgreement.d.ts.map