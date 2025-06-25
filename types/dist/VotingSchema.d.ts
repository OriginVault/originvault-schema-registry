/**
 * Generated from VotingSchema.json
 * Schema: https://schemas.originvault.box/Voting
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Tracks voting activity on governance proposals.
 */
export interface GovernanceVotingSchema {
    /**
     * The DID of the voting record.
     */
    id: string;
    /**
     * DID of the proposal being voted on.
     */
    proposal: string;
    /**
     * DID of the voter.
     */
    voter: string;
    /**
     * Vote cast by the participant.
     */
    vote: "Yes" | "No" | "Abstain";
    /**
     * Weight of the voter's vote (e.g., based on staked tokens).
     */
    weight: number;
    /**
     * Timestamp of the vote submission.
     */
    timestamp: string;
}
//# sourceMappingURL=VotingSchema.d.ts.map