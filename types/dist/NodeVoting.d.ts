/**
 * Generated from NodeVoting.json
 * Schema: https://schemas.originvault.io/NodeVotingConsensusAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines voting mechanisms for governance decisions in OriginVault clusters.
 */
export interface NodeVotingConsensusAgreement {
    /**
     * DID of the agreement.
     */
    agreementId: string;
    /**
     * DID of the Cluster where voting occurs.
     */
    clusterId: string;
    /**
     * DID of the participating node.
     */
    nodeId: string;
    /**
     * The type of vote being cast.
     */
    voteType: "Governance Policy" | "New Namespace Approval" | "Node Sanctions";
    /**
     * Defines how voting power is determined.
     */
    votingMethod: "One Node, One Vote" | "Stake-Weighted" | "Reputation-Based";
    /**
     * The minimum percentage of nodes required for the vote to be valid.
     */
    minimumQuorum: number;
    /**
     * The percentage required to approve a decision.
     */
    decisionThreshold: number;
    /**
     * Under what conditions a vote result can be invalidated.
     */
    revocationPolicy: string;
    /**
     * Whether the node has agreed to the governance process.
     */
    agreementSigned: boolean;
}
//# sourceMappingURL=NodeVoting.d.ts.map