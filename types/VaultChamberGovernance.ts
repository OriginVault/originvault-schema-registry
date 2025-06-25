/**
 * Generated from VaultChamberGovernance.json
 * Schema: https://schemas.originvault.box/VaultChamberGovernance
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines governance processes for a Governance Chamber, including proposals and voting.
 */
export interface VaultChamberGovernance {
  /**
   * DID of the Governance Chamber.
   */
  chamberId: string;
  /**
   * How governance decisions are made.
   */
  governanceType: "vote" | "multi-sig" | "admin";
  /**
   * List of DIDs allowed to participate in governance.
   */
  allowedParticipants: string[];
  proposalProcess: {
    /**
     * Minimum trust score to submit proposals.
     */
    minTrustScore?: number;
    /**
     * Approval threshold.
     */
    proposalApproval?: "simple-majority" | "supermajority" | "consensus";
  };
  votingProcess: {
    /**
     * Duration of voting.
     */
    votingPeriod?: string;
    /**
     * Minimum % of eligible voters to pass.
     */
    requiredParticipation?: number;
  };
}
