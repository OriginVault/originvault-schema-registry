/**
 * Generated from NodeClusterDeclaration.json
 * Schema: https://schemas.originvault.box/NodeClusterDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines an OV Cluster's structure, governance, and node configuration.
 */
export interface NodeClusterDeclaration {
    /**
     * The DID of the OV Cluster.
     */
    id: string;
    /**
     * Indicates that this is a Cluster DID declaration.
     */
    type?: "ClusterDeclaration";
    /**
     * The DID of the namespace this cluster belongs to.
     */
    namespace: string;
    /**
     * Governance policies for this cluster.
     */
    governance?: {
        /**
         * DIDs of entities responsible for managing this cluster.
         */
        managedBy?: string[];
        /**
         * A reference to governance rules stored in Ceramic or DID-Linked Resources.
         */
        rules?: string;
        /**
         * A DID reference to a dispute resolution service.
         */
        disputeResolution?: string;
    };
    /**
     * List of nodes in this cluster.
     */
    nodes: {
        /**
         * The Node DID.
         */
        id: string;
        /**
         * The functional role of this node.
         */
        role: "NamespaceNode" | "IdentityNode" | "StorageNode" | "ComputeNode" | "VerificationNode";
    }[];
    /**
     * Services available in this cluster.
     */
    services: {
        /**
         * The DID of the verification service.
         */
        verification?: string;
        /**
         * The DID of the storage service.
         */
        storage?: string;
        /**
         * The DID of the payment processing service.
         */
        payment?: string;
    };
    /**
     * Linked resources associated with this cluster.
     */
    linkedResources?: {
        /**
         * The id of the linked resource.
         */
        id: string;
        /**
         * The name of the linked resource.
         */
        name?: string;
        /**
         * The description of the linked resource.
         */
        description?: string;
        /**
         * The uri of the linked resource.
         */
        uri?: string;
        /**
         * The type of resource (e.g., governance, metadata, event log).
         */
        type: string;
    }[];
    /**
     * Verification and security policies for the cluster.
     */
    verificationPolicies: {
        /**
         * Defines how new nodes are verified.
         */
        nodeVerification?: "Open" | "Permissioned" | "Staked";
        /**
         * Conditions under which a node or vault can be revoked from the cluster.
         */
        revocationPolicy?: string;
    };
    /**
     * Timestamp of when this cluster declaration was issued.
     */
    timestamp: string;
}
//# sourceMappingURL=NodeClusterDeclaration.d.ts.map