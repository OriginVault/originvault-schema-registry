/**
 * Generated from NamespaceGovernance.json
 * Schema: https://schemas.originvault.box/NamespaceGovernance
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines governance rules for an OV Namespace.
 */
export interface NamespaceGovernance {
    /**
     * The DID of the namespace governance document.
     */
    id: string;
    /**
     * The DID of the namespace this governance applies to.
     */
    namespace: string;
    /**
     * The governance model used to manage this namespace.
     */
    governanceModel: "AdminControlled" | "TokenVoting" | "MultiSig";
    /**
     * List of governing entities managing this namespace.
     */
    governanceBodies: {
        /**
         * DID of a governance body (e.g., DAO, committee, council).
         */
        id?: string;
        /**
         * The role of this body (e.g., Validator, Arbiter).
         */
        role?: string;
    }[];
    /**
     * Rules for decision-making in the namespace.
     */
    decisionMaking?: {
        /**
         * Percentage required for approval in voting-based governance.
         */
        votingThreshold?: number;
        /**
         * Reference to a Ceramic document explaining the proposal submission process.
         */
        proposalProcess?: string;
    };
    /**
     * How governance disputes are resolved.
     */
    disputeResolution?: {
        /**
         * Method used to resolve disputes.
         */
        resolutionMethod?: "Arbitration" | "GovernanceVote" | "SmartContract";
        /**
         * The DID of a dispute resolution service or contract.
         */
        resolutionService?: string;
    };
    /**
     * Timestamp of when this governance document was issued.
     */
    timestamp: string;
}
//# sourceMappingURL=NamespaceGovernance.d.ts.map