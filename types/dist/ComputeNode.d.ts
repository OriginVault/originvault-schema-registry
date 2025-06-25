/**
 * Generated from ComputeNode.json
 * Schema: https://schemas.originvault.io/ComputeNodeDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a Compute Node in an OV Cluster.
 */
export interface ComputeNodeDeclaration {
    /**
     * The DID of the Compute Node.
     */
    id: string;
    /**
     * Node type.
     */
    type?: "ComputeNode";
    /**
     * The DID of the cluster this node belongs to.
     */
    cluster: string;
    /**
     * DID of the entity operating this node.
     */
    operator: string;
    /**
     * Hardware specifications of the compute node.
     */
    computeResources: {
        /**
         * CPU specifications (e.g., 8 cores, 3.2GHz).
         */
        cpu?: string;
        /**
         * RAM available (e.g., 32GB, 64GB).
         */
        ram?: string;
        /**
         * GPU specifications (if applicable).
         */
        gpu?: string;
    };
    /**
     * List of supported compute tasks (e.g., AI Training, Data Transformation, Encryption).
     */
    supportedTasks: string[];
    /**
     * References to compute tasks and results.
     */
    linkedResources?: {
        /**
         * The DID of the linked resource.
         */
        id: string;
        /**
         * The type of resource (e.g., Data, ProcessingLogs, ModelOutputs).
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
//# sourceMappingURL=ComputeNode.d.ts.map