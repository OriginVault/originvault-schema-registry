/**
 * Generated from IdentityNodeDeclaration.json
 * Schema: https://schemas.originvault.box/IdentityNodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines an Identity Node in an OV Cluster.
 */
export interface IdentityNodeDeclaration {
    /**
     * The DID of the Identity Node.
     */
    id: string;
    /**
     * Node type.
     */
    type?: "IdentityNode";
    /**
     * The DID of the cluster this node belongs to.
     */
    cluster: string;
    /**
     * DID of the entity operating this node.
     */
    operator: string;
    /**
     * List of services managed by this Identity Node (e.g., DID Resolution, Verification).
     */
    services: string[];
    /**
     * Reference to identity verification policies.
     */
    verificationPolicies?: string;
    /**
     * References to identity verification policies.
     */
    linkedResources?: {
        /**
         * The DID of the linked resource.
         */
        id: string;
        /**
         * The type of resource (e.g., GovernancePolicy, VerificationLog).
         */
        type: string;
        /**
         * The name of the linked resource.
         */
        name: string;
        /**
         * The description of the linked resource.
         */
        description: string;
        /**
         * The uri of the linked resource.
         */
        uri: string;
    }[];
    /**
     * Operational status of the node.
     */
    status: "active" | "suspended" | "revoked";
    /**
     * Timestamp of node declaration.
     */
    timestamp: string;
}
//# sourceMappingURL=IdentityNodeDeclaration.d.ts.map