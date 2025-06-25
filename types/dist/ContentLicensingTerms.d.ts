/**
 * Generated from ContentLicensingTerms.json
 * Schema: https://schemas.originvault.box/ContentLicensingTerms
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines licensing conditions and monetization models for digital content in OriginVault.
 */
export interface ContentLicensingTerms {
    /**
     * Defines the type of digital asset or contract.
     */
    "@type"?: "CreativeWork" | "MediaObject" | "DigitalDocument" | "SoftwareApplication" | "License" | "Agreement";
    /**
     * DID of the licensed content.
     */
    identifier: string;
    creator: {
        /**
         * DID of the creator.
         */
        identifier: string;
        /**
         * Creator name.
         */
        name?: string;
    };
    /**
     * URL where the license can be obtained (e.g., smart contract, marketplace link).
     */
    acquireLicensePage?: string;
    /**
     * Defines if the license is shared or restricted.
     */
    licenseType: "Exclusive" | "Non-Exclusive" | "Time-Limited" | "One-Time Use";
    licenseScope: {
        /**
         * Where the licensee is permitted to use the content.
         */
        geographicRestrictions?: "Global" | "Region-Specific" | "Country-Specific";
        /**
         * Whether the licensee can modify or adapt the content.
         */
        modificationRights?: boolean;
        /**
         * Whether the licensee can sublicense the content.
         */
        sublicensingAllowed?: boolean;
        /**
         * License duration (e.g., perpetual, 1 year, until 2030).
         */
        duration?: string;
    };
    /**
     * URL linking to license terms & permitted uses.
     */
    usageInfo?: string;
    /**
     * Defines permitted usage rights.
     */
    permittedUses: ("Personal Use" | "Commercial Use" | "AI Training" | "Resale" | "Public Display")[];
    /**
     * Explicitly states forbidden use cases.
     */
    prohibitedUses?: ("No AI Training" | "No Redistribution" | "No Commercial Use")[];
    /**
     * Defines how the license is monetized.
     */
    monetizationModel: {
        /**
         * Price in USD or crypto equivalent.
         */
        price?: number;
        paymentMethod?: "Stripe" | "Crypto" | "NFT";
        /**
         * Whether ongoing payments are required.
         */
        recurringFee?: boolean;
        /**
         * Schedule for payments (one-time, monthly, annually).
         */
        paymentSchedule?: string;
        royaltyTerms?: {
            /**
             * Percentage paid to the creator.
             */
            royaltyPercentage?: number;
            /**
             * Schedule for royalty payments.
             */
            paymentSchedule?: string;
            /**
             * How royalties are distributed.
             */
            distributionMethod?: "Stripe Connect" | "Crypto Split" | "Manual Payout";
        };
    };
    /**
     * Defines how licensing compliance is tracked and enforced.
     */
    verification: {
        /**
         * Method used to track compliance with licensing terms.
         */
        complianceTracking?: "DID-Linked Resource" | "On-Chain Record" | "Verifiable Credential";
        /**
         * DID of the entity responsible for verifying compliance.
         */
        verificationAuthority?: string;
        /**
         * How often compliance checks are conducted (e.g., quarterly, annually).
         */
        auditFrequency?: string;
    };
    verifiableCredential?: {
        /**
         * URI to the VC.
         */
        identifier?: string;
        issuer?: {
            /**
             * DID of the issuer.
             */
            identifier?: string;
            /**
             * Issuer name.
             */
            name?: string;
        };
    };
    revocationPolicy?: {
        /**
         * Conditions under which the license is revoked.
         */
        misuseConditions?: string[];
        /**
         * Whether failure to pay results in automatic revocation.
         */
        nonPaymentPenalty?: boolean;
    };
    /**
     * Defines mechanisms for resolving disputes related to the agreement.
     */
    disputeResolution?: {
        /**
         * How disputes over the license are handled.
         */
        arbitrationMethod?: "DAO Voting" | "Legal Arbitration" | "Multi-Sig Review";
        /**
         * How a licensee can challenge revocation or penalty.
         */
        appealProcess?: string;
    };
    /**
     * Whether both parties have accepted the agreement.
     */
    agreementSigned: boolean;
    /**
     * Time of agreement acceptance.
     */
    timestamp: string;
}
//# sourceMappingURL=ContentLicensingTerms.d.ts.map