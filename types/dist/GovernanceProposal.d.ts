/**
 * Generated from GovernanceProposal.json
 * Schema: https://schemas.originvault.box/GovernanceProposal
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a governance proposal for namespaces and clusters.
 */
export interface GovernanceProposalSchema {
    /**
     * The DID of the proposal.
     */
    id: string;
    /**
     * DID of the entity submitting the proposal.
     */
    proposer: string;
    /**
     * DID of the namespace affected (if applicable).
     */
    namespace?: string;
    /**
     * DID of the cluster affected (if applicable).
     */
    cluster?: string;
    /**
     * Type of governance action requested.
     */
    proposalType: "AddNode" | "RemoveNode" | "UpdateGovernance" | "MonetizationPolicyChange";
    /**
     * A description of the proposal, including motivations and expected impact.
     */
    details: string;
    /**
     * References to supporting documents or governance rules.
     */
    linkedResources?: string[];
    /**
     * Current status of the proposal.
     */
    status: "Pending" | "Active" | "Accepted" | "Rejected" | "Executed";
    /**
     * Timestamp of proposal submission.
     */
    timestamp: string;
}
//# sourceMappingURL=GovernanceProposal.d.ts.map