/**
 * Generated from NodeOperatorAgreement.json
 * Schema: https://schemas.originvault.box/NodeOperatorAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the responsibilities of an OV Node operator within a Cluster.
 */
export interface NodeOperatorAgreement {
  /**
   * Schema.org type
   */
  "@type"?: "License" | "CreativeWork";
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the Node.
   */
  nodeId: string;
  /**
   * DID of the Cluster the Node is part of.
   */
  clusterId: string;
  /**
   * The role of the Node within the Cluster.
   */
  nodeType: "Identity" | "Storage" | "Compute" | "Verification";
  performanceRequirements: {
    /**
     * Minimum required uptime percentage.
     */
    uptime?: number;
    /**
     * Maximum response latency allowed.
     */
    latency?: number;
  };
  /**
   * Compliance requirements for handling data within the node.
   */
  dataHandlingRules: string;
  /**
   * Conditions under which the node can be removed from the Cluster.
   */
  revocationPolicy: string;
  /**
   * Whether the Node Operator has accepted the agreement.
   */
  agreementSigned: boolean;
  /**
   * Time of agreement acceptance.
   */
  timestamp: string;
}
