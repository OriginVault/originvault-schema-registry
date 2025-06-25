/**
 * Generated from Verifier.json
 * Schema: https://schemas.originvault.box/VerifierPersona
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a verifier in the OriginVault ecosystem.
 */
export interface VerifierPersona {
  /**
   * Schema.org type
   */
  "@type"?: string;
  /**
   * Total number of verification actions performed.
   */
  verificationsPerformed: number;
  approvedNamespaces: string[];
  /**
   * Modifier applied to their reputation based on accuracy.
   */
  trustScoreImpact: number;
  /**
   * Count of verification decisions that were disputed or reversed.
   */
  disputedVerifications?: number;
}
