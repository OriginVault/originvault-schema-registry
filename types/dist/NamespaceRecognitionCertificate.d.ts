/**
 * Generated from NamespaceRecognitionCertificate.json
 * Schema: https://schemas.originvault.box/NamespaceRecognitionCertificate
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * A verifiable certificate that recognizes an entity’s role or contribution within a namespace.
 */
export interface NamespaceRecognitionCertificate {
    /**
     * DID of the Recognition Certificate.
     */
    id: string;
    /**
     * DID of the namespace issuing the certificate.
     */
    namespace: string;
    /**
     * DID of the recognized entity.
     */
    recipient: string;
    /**
     * Type of recognition granted.
     */
    recognitionType: "trusted-verifier" | "major-contributor" | "governance-member" | "partner";
    /**
     * Additional details on why this recognition was granted.
     */
    description?: string;
    /**
     * Optional expiration date of the recognition certificate.
     */
    validUntil?: string;
    /**
     * Cryptographic proof for the certificate.
     */
    proof: {
        /**
         * Proof type.
         */
        type?: string;
        /**
         * Timestamp of proof creation.
         */
        created?: string;
        /**
         * DID or method used to verify this proof.
         */
        verificationMethod?: string;
        /**
         * Base64 or hex-encoded signature.
         */
        signatureValue?: string;
    };
}
//# sourceMappingURL=NamespaceRecognitionCertificate.d.ts.map