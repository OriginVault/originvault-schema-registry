/**
 * Generated from TrustGate.json
 * Schema: https://schemas.originvault.io/TrustGate
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines access rules based on Gems and Verifiable Credentials.
 */
export interface TrustGate {
  /**
   * The DID or URL of the resource being accessed.
   */
  resource: string;
  /**
   * Minimum trust score required for access.
   */
  requiredTrustLevel: number;
  /**
   * List of required Gems for access.
   */
  requiredGems: string[];
  /**
   * List of required Verifiable Credentials for access.
   */
  requiredCredentials: string[];
  /**
   * Whether access is open, trust-restricted, or fully private.
   */
  accessPolicy: "public" | "restricted" | "private";
}
