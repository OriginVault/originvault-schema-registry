/**
 * Generated from DigitalDocument.json
 * Schema: https://schemas.originvault.box/DigitalDocument
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Verifiable digital document metadata for OriginVault content.
 */
export interface DigitalDocument {
    /**
     * DID of the content.
     */
    identifier: string;
    /**
     * Name or title of the document.
     */
    name: string;
    /**
     * DID of the creator or owner.
     */
    author: string;
    /**
     * MIME type of the file (e.g., image/png, video/mp4).
     */
    encodingFormat: string;
    /**
     * DID of the publisher.
     */
    publisher?: string;
    /**
     * Verifiable Credential URI of the publication.
     */
    publication?: string;
    /**
     * Size of the document in bytes.
     */
    contentSize: number;
    /**
     * DID of the source if derived from another work.
     */
    isBasedOn?: string;
    /**
     * Timestamp when the document was created.
     */
    dateCreated: string;
    /**
     * Timestamp of the last modification.
     */
    dateModified?: string;
    /**
     * DID reference to the licensing agreement.
     */
    license: string;
    /**
     * URL where licenses can be purchased.
     */
    acquireLicensePage?: string;
    /**
     * Usage restrictions for the document.
     */
    usageRestrictions?: ("No AI Training" | "No Redistribution" | "No Commercial Use")[];
    /**
     * C2PA content authenticity proof.
     */
    C2PAManifest?: {
        /**
         * Verifiable Credential URI of the C2PA manifest.
         */
        identifier?: string;
        /**
         * DID of the signing entity.
         */
        contentSigner?: string;
        /**
         * Cryptographic signature of the content.
         */
        signatureValue?: string;
    };
    /**
     * URL to a thumbnail preview of the document.
     */
    thumbnailUrl?: string;
    /**
     * Media files linked to this document (e.g., video sources, image formats).
     */
    associatedMedia?: string[];
    /**
     * External references (e.g., OpenSea, IPFS, Arweave).
     */
    sameAs?: string[];
}
//# sourceMappingURL=DigitalDocument.d.ts.map