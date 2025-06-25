/**
 * Generated from NamespaceProposal.json
 * Schema: https://schemas.originvault.box/NamespaceProposal
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a proposal for governance, updates, or policy changes in an OV namespace.
 */
export interface NamespaceProposal {
    /**
     * DID of the proposal.
     */
    id: string;
    /**
     * DID of the namespace where the proposal is made.
     */
    namespace: string;
    /**
     * DID of the entity making the proposal.
     */
    proposer: string;
    /**
     * Type of proposal.
     */
    proposalType: "governance-change" | "policy-update" | "feature-addition" | "plugin-approval" | "other";
    /**
     * Detailed explanation of the proposal.
     */
    description: string;
    /**
     * Current status of the proposal.
     */
    status: "pending" | "approved" | "rejected" | "executed";
    /**
     * Voting results for the proposal.
     */
    votes: {
        /**
         * Number of votes in favor.
         */
        yes?: number;
        /**
         * Number of votes against.
         */
        no?: number;
        /**
         * Number of abstentions.
         */
        abstain?: number;
    };
    /**
     * Timestamp when the proposal was created.
     */
    createdAt: string;
    /**
     * Expiration date for voting on the proposal.
     */
    expiresAt: string;
    /**
     * Cryptographic proof for the proposal.
     */
    proof: {
        /**
         * Proof type (e.g., EdDSA Signature, zk-SNARK Proof).
         */
        type?: string;
        /**
         * Timestamp of proof creation.
         */
        created?: string;
        /**
         * DID or method used to verify this proof.
         */
        verificationMethod?: string;
        /**
         * Base64 or hex-encoded signature.
         */
        signatureValue?: string;
    };
}
//# sourceMappingURL=NamespaceProposal.d.ts.map