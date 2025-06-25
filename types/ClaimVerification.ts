/**
 * Generated from ClaimVerification.json
 * Schema: https://schemas.originvault.box/ClaimVerification
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

export interface ClaimVerification {
  /**
   * DID of the claim.
   */
  identifier: string;
  /**
   * The assertion made by this content (e.g., 'This image was created by AI').
   */
  interpretedAsClaim: string;
  claimInterpreter: {
    /**
     * DID of the verifying entity.
     */
    identifier?: string;
    /**
     * Name of the interpreter (e.g., OriginVault AI Trust Validator).
     */
    name?: string;
  };
}
