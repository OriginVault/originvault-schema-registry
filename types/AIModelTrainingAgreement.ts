/**
 * Generated from AIModelTrainingAgreement.json
 * Schema: https://schemas.originvault.io/AITrainingAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines terms for AI companies training models on data within OV Vaults.
 */
export interface AIModelTrainingAgreement {
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the AI company.
   */
  buyerId: string;
  /**
   * DID of the Vault Chamber providing data.
   */
  chamberId: string;
  licenseTerms: {
    licenseType?: "Exclusive" | "Non-Exclusive" | "Time-Limited";
    /**
     * Whether the data must be anonymized.
     */
    dataAnonymization?: boolean;
  };
  usageScope: ("Training Only" | "Commercial Model Deployment" | "Open-Source Research")[];
  /**
   * Legal compliance and privacy requirements.
   */
  complianceRequirements: string[];
  /**
   * Conditions under which access can be revoked.
   */
  revocationPolicy: string;
  /**
   * Verifiable Credential proving payment.
   */
  paymentProof: string;
  /**
   * Whether the AI company has accepted the agreement.
   */
  agreementSigned: boolean;
}
