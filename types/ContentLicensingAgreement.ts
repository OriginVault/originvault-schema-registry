/**
 * Generated from ContentLicensingAgreement.json
 * Schema: https://schemas.originvault.box/ContentLicensingAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines licensing terms for content distributed through OriginVault.
 */
export interface ContentLicensingAgreement {
  /**
   * Schema.org type
   */
  "@type"?: "License" | "CreativeWork";
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the licensed content.
   */
  contentId: string;
  /**
   * DID of the content creator.
   */
  creatorId: string;
  /**
   * DID of the entity purchasing the license.
   */
  licenseeId: string;
  /**
   * Represents the act of accepting this license.
   */
  agreeAction: {
    /**
     * Schema.org type
     */
    "@type"?: "AgreeAction";
    /**
     * DID of the licensee accepting the agreement.
     */
    agent?: string;
    /**
     * DID of this licensing agreement.
     */
    object?: string;
    /**
     * DIDs of all involved parties (creator, licensee, etc.).
     */
    participant?: string[];
    /**
     * Agreement completion status.
     */
    actionStatus?: "CompletedActionStatus";
    /**
     * Timestamp when the agreement was signed.
     */
    startTime?: string;
    /**
     * Expiration timestamp of the agreement.
     */
    endTime?: string;
  };
  /**
   * Represents a claim related to the agreement (e.g., ownership, dispute).
   */
  claim?: {
    /**
     * Schema.org type
     */
    "@type"?: "Claim";
    /**
     * Claim being made (e.g., 'Properly Licensed').
     */
    claimReviewed?: string;
    /**
     * DID of the entity making the claim.
     */
    author?: string;
    /**
     * DID of the validating entity (e.g., OV verification node).
     */
    claimInterpreter?: string;
    /**
     * Which aspect of the license is under review (e.g., royalty terms).
     */
    reviewAspect?: string;
    /**
     * Timestamp of the first assertion of the claim.
     */
    firstAppearance?: string;
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
   * Defines whether the license is exclusive to the licensee or shared.
   */
  licenseType: "Exclusive" | "Non-Exclusive" | "Time-Limited" | "One-Time Use";
  /**
   * Defines the specific use cases allowed for the licensee.
   */
  permittedUses: (
    | "Personal Use"
    | "Commercial Use"
    | "AI Training"
    | "Resale"
    | "Public Display"
  )[];
  paymentTerms: {
    /**
     * Fixed price of the license in USD or crypto equivalent.
     */
    licenseFee?: number;
    /**
     * Whether the license requires ongoing payments.
     */
    recurringFee?: boolean;
    /**
     * Schedule for payments (e.g., one-time, monthly, annually).
     */
    paymentSchedule?: string;
  };
  royaltyTerms: {
    /**
     * Percentage of revenue owed to the creator.
     */
    royaltyPercentage?: number;
    /**
     * How frequently royalties are paid.
     */
    paymentSchedule?: string;
  };
  revocationPolicy: {
    /**
     * Conditions under which the license is revoked.
     */
    misuseConditions?: string[];
    /**
     * Whether failure to pay results in automatic revocation.
     */
    nonPaymentPenalty?: boolean;
  };
  auditAndCompliance: {
    /**
     * How license compliance is tracked.
     */
    trackingMechanism?: "DID-Linked Resource" | "Verifiable Credential" | "On-Chain";
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
