/**
 * Generated from GemTrustRegistry.json
 * Schema: https://schemas.originvault.box/GemTrustRegistry
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Tracks trust and reputation levels based on earned Gems.
 */
export interface GemTrustRegistry {
  /**
   * DID of the Gem holder.
   */
  holder: string;
  /**
   * List of Gems that the user holds.
   */
  gemTypes: string[];
  /**
   * Trust score based on various aspects of participation.
   */
  trustScore: {
    /**
     * Score based on verification actions.
     */
    verificationScore?: number;
    /**
     * Score based on governance participation.
     */
    governanceScore?: number;
    /**
     * Score based on active contributions.
     */
    contributionScore?: number;
    /**
     * Score based on social/community engagement.
     */
    communityScore?: number;
  };
  /**
   * Verifiable Credentials contributing to this reputation.
   */
  linkedCredentials: string[];
  /**
   * Last update timestamp.
   */
  lastUpdated: string;
}
