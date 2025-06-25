/**
 * Generated from DIDAssertionCredential.json
 * Schema: https://schemas.originvault.box/DIDAssertionCredential.schema.json
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
export interface DIDAssertionCredential {
    /**
     * The unique identifier for the credential.
     */
    id: string;
    /**
     * The type of the credential, typically including 'VerifiableCredential'.
     */
    type: string[];
    /**
     * The subject of the credential.
     */
    credentialSubject: {
        /**
         * The DID that this credential is asserting information about.
         */
        id?: string;
        /**
         * The specific claim made about this DID (e.g., 'Trusted Creator').
         */
        claimReviewed?: string;
        /**
         * DID of the entity making this claim (same as issuer).
         */
        author?: string;
        /**
         * The entity validating the claim (e.g., an OV verification node).
         */
        claimInterpreter?: string;
        /**
         * Specific characteristic being reviewed (e.g., 'Content Authenticity').
         */
        reviewAspect?: string;
        /**
         * Timestamp when this claim was first issued.
         */
        firstAppearance?: string;
        /**
         * History of appearances or updates to the claim.
         */
        appearance?: {
            /**
             * Revalidation timestamp.
             */
            timestamp?: string;
            /**
             * Status of the claim.
             */
            reviewStatus?: "Verified" | "Disputed" | "Revoked";
        }[];
    };
    /**
     * The context of the credential.
     */
    "@context": string[];
}
//# sourceMappingURL=DIDAssertionCredential.d.ts.map