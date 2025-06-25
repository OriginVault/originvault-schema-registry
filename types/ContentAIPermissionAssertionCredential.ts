/**
 * Generated from ContentAIPermissionAssertionCredential.json
 * Schema: https://schemas.originvault.box/ContentAIPermissionAssertionCredential
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

export type AllowDataMining = boolean;
export type AllowAIMLTraining = boolean;
export type AllowAIMLInference = boolean;
export type AllowGenerativeAIImageVideoTextGeneration = boolean;

/**
 * Verifiable Credential asserting AI usage permissions and restrictions for digital content.
 */
export interface ContentAIPermissionAssertionCredential {
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
  expirationDate?: string;
  credentialSubject: {
    /**
     * Schema.org type
     */
    "@type"?: "DigitalDocument" | "License";
    /**
     * The unique identifier for the content.
     */
    id?: string;
    license?: {
      /**
       * DID of the content associated with this AI permission credential.
       */
      contentId: string;
      owner: {
        /**
         * DID of the content owner.
         */
        id?: string;
        /**
         * Owners name or organization.
         */
        name?: string;
      };
      permissions: {
        allowDataMining?: AllowDataMining;
        allowAITraining?: AllowAIMLTraining;
        allowAIInference?: AllowAIMLInference;
        allowGenerativeAI?: AllowGenerativeAIImageVideoTextGeneration;
      };
      prohibitedUses?: (
        | "Resale"
        | "Commercial AI Training"
        | "Facial Recognition"
        | "Military Use"
      )[];
    };
    /**
     * Defines AI licensing and monetization terms.
     */
    monetization?: {
      /**
       * Whether AI-related use requires a license.
       */
      licensingRequired?: boolean;
      /**
       * The payment model for AI permissions.
       */
      paymentModel?: "One-Time Fee" | "Subscription" | "Per API Call";
      /**
       * Price in USD or equivalent crypto.
       */
      price?: number;
      /**
       * Percentage of revenue owed to the content owner if used in AI applications.
       */
      royaltyPercentage?: number;
    };
    /**
     * Defines AI licensing enforcement and compliance tracking.
     */
    verification?: {
      /**
       * Method used to track AI compliance.
       */
      complianceTracking?: "DID-Linked Resource" | "On-Chain Record" | "Verifiable Credential";
      /**
       * How often compliance is reviewed (e.g., monthly, annually).
       */
      auditFrequency?: string;
    };
    /**
     * Defines when and why AI permissions may be revoked.
     */
    revocationPolicy?: {
      /**
       * Conditions under which the AI permission is revoked.
       */
      misuseConditions?: string[];
      /**
       * The date when AI permissions expire.
       */
      expirationDate?: string;
    };
    /**
     * Whether both parties have accepted the AI permission terms.
     */
    agreementSigned?: boolean;
    /**
     * Timestamp of issuance.
     */
    issuedAt?: string;
  };
}
