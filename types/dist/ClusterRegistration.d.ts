/**
 * Generated from ClusterRegistration.json
 * Schema: https://schemas.originvault.box/ClusterRegistration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines the registration details of an OV cluster within a namespace.
 */
export interface ClusterRegistration {
    /**
     * DID of the cluster registration document.
     */
    id: string;
    /**
     * DID of the namespace this cluster belongs to.
     */
    namespace: string;
    /**
     * DID of the cluster.
     */
    clusterDID: string;
    /**
     * Governance model of the cluster.
     */
    governanceModel: "centralized" | "decentralized" | "DAO-based";
    /**
     * List of plugin DIDs this cluster supports.
     */
    supportedPlugins: string[];
    /**
     * List of DIDs of node operators in this cluster.
     */
    nodeOperators: string[];
    /**
     * Timestamp when the cluster was registered.
     */
    createdAt: string;
    /**
     * Cryptographic proof of the cluster registration.
     */
    proof: {
        /**
         * Proof type.
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
//# sourceMappingURL=ClusterRegistration.d.ts.map