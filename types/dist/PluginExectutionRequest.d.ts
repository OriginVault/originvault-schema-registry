/**
 * Generated from PluginExectutionRequest.json
 * Schema: https://schemas.originvault.box/PluginExecutionRequest
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a request from a plugin running in a vault to interact with an OV node.
 */
export interface PluginExecutionRequest {
    /**
     * The DID of the execution request.
     */
    id: string;
    /**
     * The DID of the vault running the plugin.
     */
    vault: string;
    /**
     * The DID of the plugin making the request.
     */
    plugin: string;
    /**
     * The DID of the node handling the request.
     */
    node: string;
    /**
     * Type of request being made.
     */
    requestType: "ComputeTask" | "DataRead" | "DataWrite" | "IdentityLookup" | "VerificationCheck";
    /**
     * Additional parameters required for processing the request.
     */
    parameters?: {};
    /**
     * Current status of the request.
     */
    status: "pending" | "processing" | "completed" | "failed";
    /**
     * Timestamp of request submission.
     */
    timestamp: string;
}
//# sourceMappingURL=PluginExectutionRequest.d.ts.map