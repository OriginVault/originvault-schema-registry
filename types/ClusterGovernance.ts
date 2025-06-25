/**
 * Generated from ClusterGovernance.json
 * Schema: https://schemas.originvault.box/ClusterGovernance
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines governance rules for an OV Cluster.
 */
export interface ClusterGovernanceSchema {
  /**
   * The DID of the cluster governance document.
   */
  id: string;
  /**
   * The DID of the cluster this governance applies to.
   */
  cluster: string;
  /**
   * Rules for adding and removing nodes in the cluster.
   */
  nodeManagement: {
    /**
     * The method used to verify new nodes joining the cluster.
     */
    verificationMethod?: "Open" | "Permissioned" | "Staked";
    /**
     * Conditions under which nodes can be removed from the cluster.
     */
    removalPolicy?: string;
  };
  /**
   * Governance rules for services running in the cluster.
   */
  serviceManagement: {
    /**
     * List of service types permitted in this cluster (e.g., Storage, Verification, Payment).
     */
    allowedServices?: string[];
    /**
     * Reference to a DID-Linked Resource explaining service verification requirements.
     */
    serviceVerification?: string;
  };
  /**
   * Security and compliance policies for the cluster.
   */
  securityPolicies: {
    /**
     * How frequently the cluster undergoes audits.
     */
    auditFrequency?: "Daily" | "Weekly" | "Monthly";
    /**
     * Reference to a DID-Linked Resource detailing compliance requirements.
     */
    complianceChecks?: string;
  };
  /**
   * The governance model used to manage this cluster.
   */
  governanceModel?: "AdminControlled" | "MultiSig" | "TokenVoting";
  /**
   * Timestamp of when this governance document was issued.
   */
  timestamp: string;
}
