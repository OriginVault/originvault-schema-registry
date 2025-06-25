/**
 * Generated from Developer.json
 * Schema: https://schemas.originvault.box/Developer
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines a developer's identity, contributions, and repositories in OriginVault.
 */
export interface Developer {
  /**
   * Schema.org type
   */
  "@type"?: "Person";
  /**
   * DID of the developer.
   */
  developerId: string;
  /**
   * Developer's GitHub or GitLab profile.
   */
  githubProfile?: string;
  /**
   * List of plugins or software developed.
   */
  publishedPlugins: string[];
  /**
   * List of cryptographically signed commits by the developer.
   */
  signedCommits: string[];
  trustedBy?: string[];
  /**
   * Reputation score based on trust metrics.
   */
  reputationScore?: number;
  certifications?: string[];
}
