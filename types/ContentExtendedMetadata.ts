/**
 * Generated from ContentExtendedMetadata.json
 * Schema: https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

export type TagsCommaSeparated = string;
export type LicenseType = "All Rights Reserved" | "Creative Commons" | "Public Domain";
export type UsageRestrictions = ("No AI Training" | "No Redistribution" | "No Commercial Use")[];

/**
 * Verifiable Credential containing metadata such as licensing and usage restrictions.
 */
export interface ContentExtendedMetadataAssertionCredential {
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
     * References to the content’s integrity details.
     */
    contentReference: {
      /**
       * DID of the content being referenced.
       */
      identifier?: string;
      /**
       * SHA-256 or IPFS CID hash of the content.
       */
      contentHash?: string;
      /**
       * Perceptual hash for similarity detection.
       */
      perceptualHash?: string;
    };
    tags: TagsCommaSeparated;
    licensing: LicenseType;
    usageRestrictions: UsageRestrictions;
  };
}
