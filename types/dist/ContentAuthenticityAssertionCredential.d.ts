/**
 * Generated from ContentAuthenticityAssertionCredential.json
 * Schema: https://schemas.originvault.box/ContentAuthenticityAssertionCredential
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * A Verifiable Credential that aggregates multiple content-related credentials into a single authenticity record.
 */
export interface ContentAuthenticityAssertionCredential {
    /**
     * The unique identifier for the credential.
     */
    id: string;
    /**
     * The type of the credential, typically including 'VerifiableCredential'.
     */
    type?: string[];
    /**
     * The entity that issued the credential.
     */
    issuer: {
        /**
         * The unique identifier for the issuer.
         */
        id: string;
    };
    /**
     * The context of the credential.
     */
    "@context"?: string[];
    /**
     * The expiration date of the credential.
     */
    expirationDate: string;
    credentialSubject: {
        /**
         * Unique ID of the associated content.
         */
        contentId?: string;
        /**
         * DID references to modular Verifiable Credentials included in this authenticity record.
         */
        includedCredentials?: {
            /**
             * DID DLR URI of the Content Details VC.
             */
            contentDetails?: string;
            /**
             * DID DLR URI of the Identity Claims VC.
             */
            identityClaims?: string;
            /**
             * DID DLR URI of the Extended Metadata VC.
             */
            extendedMetadata?: string;
            /**
             * DID DLR URI of the AI Permissions VC.
             */
            aiPermissions?: string;
            /**
             * DID DLR URI of the Content Signing VC.
             */
            contentSigning?: string;
        };
    };
}
//# sourceMappingURL=ContentAuthenticityAssertionCredential.d.ts.map