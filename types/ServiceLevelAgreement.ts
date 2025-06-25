/**
 * Generated from ServiceLevelAgreement.json
 * Schema: https://schemas.originvault.io/ServiceLevelAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines minimum performance guarantees for nodes in the OV ecosystem.
 */
export interface ServiceLevelAgreementSLAForOVNodes {
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the Node.
   */
  nodeId: string;
  /**
   * DID of the Namespace the node belongs to.
   */
  namespaceId: string;
  /**
   * The type of node operating under this SLA.
   */
  nodeType: "Identity" | "Storage" | "Compute" | "Verification";
  expectedUptime: {
    /**
     * Minimum required uptime percentage (e.g., 99.9%).
     */
    minPercentage?: number;
    /**
     * Time period over which uptime is measured (e.g., 30 days).
     */
    measurementPeriod?: string;
  };
  latencyThresholds: {
    /**
     * Maximum allowed response time (in milliseconds).
     */
    maxResponseTime?: number;
    /**
     * Maximum allowed compute processing time (in milliseconds).
     */
    maxProcessingTime?: number;
  };
  /**
   * Defines penalties and consequences for failing to meet SLA obligations.
   */
  failureCompensation: {
    /**
     * Penalty applied if the Node fails SLA requirements (e.g., reduced staking rewards, service fees).
     */
    financialPenalty?: string;
    /**
     * Negative impact on the Node’s trust score if SLA terms are violated.
     */
    trustScoreImpact?: number;
    /**
     * Whether the Node can be downgraded to a lower-tier role upon SLA violations.
     */
    downgradeStatus?: boolean;
  };
  /**
   * Defines incentive mechanisms for high-performance Nodes.
   */
  compensationIncentives?: {
    /**
     * Whether nodes get rewards for exceeding SLA targets.
     */
    bonusForHighUptime?: boolean;
    /**
     * Whether nodes can receive reduced operational fees for high performance.
     */
    feeReductions?: boolean;
  };
  /**
   * Specifies how SLA compliance is monitored and enforced.
   */
  complianceMonitoring: {
    /**
     * DID of the entity monitoring SLA compliance.
     */
    monitoringEntity?: string;
    /**
     * How often the node is audited for SLA compliance (e.g., monthly, quarterly).
     */
    auditFrequency?: string;
    /**
     * Whether compliance logs are recorded on-chain for transparency.
     */
    onChainLogging?: boolean;
  };
  /**
   * Defines staking and collateral mechanisms for Nodes.
   */
  stakingRequirements: {
    /**
     * Minimum amount of tokens staked to participate as a Node.
     */
    requiredStakeAmount?: number;
    /**
     * Conditions under which staked tokens can be slashed (e.g., repeated SLA violations).
     */
    slashingConditions?: string[];
  };
  /**
   * Defines rules for Node removal due to SLA non-compliance.
   */
  revocationPolicy: {
    /**
     * Conditions under which a Node is removed from the Cluster.
     */
    conditionsForRemoval?: string;
    /**
     * Amount of time the Node has to fix compliance issues before removal.
     */
    gracePeriod?: number;
    /**
     * Procedure for a Node to challenge its removal from the Cluster.
     */
    appealProcess?: string;
  };
  /**
   * Whether the Node operator has accepted the SLA.
   */
  agreementSigned: boolean;
  /**
   * Time of agreement acceptance.
   */
  timestamp: string;
}
