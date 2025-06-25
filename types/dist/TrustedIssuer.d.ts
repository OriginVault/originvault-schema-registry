/**
 * Generated from TrustedIssuer.json
 * Schema: https://schemas.originvault.box/TrustedIssuer
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Verifiable Accreditation for trusted issuers within any trust chain, following cheqd DTC patterns for namespace-based trust hierarchies.
 */
export interface TrustedIssuerAccreditation {
    "@context": string[];
    type: string[];
    issuer: {
        /**
         * DID of the issuing authority - could be any namespace root, platform root, or user root
         */
        id: string;
        /**
         * Name of the issuing authority
         */
        name?: string;
        /**
         * Type of root authority issuing this accreditation
         */
        rootType?: "namespace" | "platform" | "user" | "organization" | "community" | "concept";
    };
    /**
     * When the accreditation was issued
     */
    issuanceDate: string;
    /**
     * When the accreditation expires
     */
    expirationDate?: string;
    credentialSubject: {
        /**
         * DID of the accredited trusted issuer
         */
        id: string;
        /**
         * List of accreditations granted to this issuer
         */
        accreditedFor: {
            /**
             * Namespace or domain for which the issuer is accredited
             */
            namespaceId: string;
            /**
             * Schema ID for which the issuer is accredited
             */
            schemaId: string;
            /**
             * Credential types the issuer can issue
             */
            types: string[];
            /**
             * Geographic or regulatory restriction (optional)
             */
            limitJurisdiction?: string;
            /**
             * Expiration date of this specific accreditation
             */
            validUntil?: string;
        }[];
        /**
         * Trust level assigned within this trust chain
         */
        trustLevel?: "bronze" | "silver" | "gold" | "platinum";
        /**
         * DID-Linked Resource ID on blockchain (cheqd, ethereum, etc.)
         */
        blockchainResourceId?: string;
    };
    termsOfUse: {
        /**
         * Must be AccreditationPolicy per cheqd DTC spec
         */
        type: "AccreditationPolicy";
        /**
         * DID URL of the parent accreditation in the trust chain (if not a root)
         */
        parentAccreditation?: string;
        /**
         * DID URL of the root authority for this trust chain
         */
        rootAuthorisation: string;
        /**
         * Scope or purpose of this trust chain
         */
        trustChainScope: string;
        /**
         * Reference to governance policies for this trust chain
         */
        governanceFramework?: string;
    };
    /**
     * Cryptographic proof of the accreditation
     */
    proof?: {};
}
//# sourceMappingURL=TrustedIssuer.d.ts.map