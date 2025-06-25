/**
 * Generated from GemReputationScore.json
 * Schema: https://schemas.originvault.box/GemReputation
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines how a recipient's reputation is influenced by their Gems.
 */
export interface GemReputationScore {
  /**
   * DID of the user holding the Gem.
   */
  recipient: string;
  /**
   * The category of the Gem.
   */
  gemType: string;
  /**
   * Numerical reputation score associated with the Gem.
   */
  reputationScore: number;
  /**
   * Date when the reputation score was last updated.
   */
  scoreLastUpdated: string;
  /**
   * List of associated Verifiable Credentials that contribute to this reputation score.
   */
  linkedCredentials: string[];
}
