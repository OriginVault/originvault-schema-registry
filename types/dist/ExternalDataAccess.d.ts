/**
 * Generated from ExternalDataAccess.json
 * Schema: https://schemas.originvault.box/ExternalDataAccess
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines how external stakeholders can purchase access to data in Vault Chambers.
 */
export interface ExternalDataAccess {
    /**
     * DID of the Data Chamber.
     */
    chamberId: string;
    /**
     * DID of the external entity purchasing access.
     */
    buyer: string;
    /**
     * Defines access pricing and restrictions.
     */
    accessTerms: {
        /**
         * Price of access.
         */
        price?: number;
        /**
         * How long the data is accessible.
         */
        licenseDuration?: string;
        /**
         * Restrictions on how the data can be used.
         */
        usageRestrictions?: ("No AI Training" | "No Redistribution" | "Limited Commercial Use")[];
    };
    /**
     * Verifiable Credential proving payment.
     */
    paymentProof: string;
}
//# sourceMappingURL=ExternalDataAccess.d.ts.map