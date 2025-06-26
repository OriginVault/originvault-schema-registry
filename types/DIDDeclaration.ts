/**
 * Generated from DIDDeclaration.json
 * Schema: https://schemas.originvault.box/DIDDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the role and permissions of a DID in an OV Cluster within a multi-root trust architecture.
 */
export interface DIDDeclaration {
  /**
   * JSON-LD context for interoperability with verifiable credentials and linked data ecosystems
   */
  "@context": string[];
  /**
   * The DID of the entity declaring itself
   */
  id: string;
  /**
   * The type of DID declaration
   */
  type:
    | "NamespaceDeclaration"
    | "NodeClusterDeclaration"
    | "NodeDeclaration"
    | "VaultDeclaration"
    | "IdentityNodeDeclaration"
    | "StorageNodeDeclaration"
    | "VaultOwnerDeclaration"
    | "ComputeNodeDeclaration"
    | "VerificationNodeDeclaration";
  /**
   * The DID of the parent entity (e.g., a Cluster under a Namespace, or a Node under a Cluster)
   */
  parent?: string;
  /**
   * The roles assigned to this DID (e.g., IdentityNode, StorageNode, VaultOwner)
   *
   * @minItems 1
   * @maxItems 10
   */
  roles?:
    | [
        | "IdentityNode"
        | "StorageNode"
        | "VaultOwner"
        | "ContentCreator"
        | "TrustDelegate"
        | "VerificationService"
        | "ComputeNode"
        | "GovernanceParticipant"
        | "DataProcessor"
        | "NetworkValidator"
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ]
    | [
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        ),
        (
          | "IdentityNode"
          | "StorageNode"
          | "VaultOwner"
          | "ContentCreator"
          | "TrustDelegate"
          | "VerificationService"
          | "ComputeNode"
          | "GovernanceParticipant"
          | "DataProcessor"
          | "NetworkValidator"
        )
      ];
  /**
   * Governance settings for this DID
   */
  governance?: {
    /**
     * List of DIDs that govern this entity
     *
     * @minItems 1
     * @maxItems 20
     */
    managedBy:
      | [string]
      | [string, string]
      | [string, string, string]
      | [string, string, string, string]
      | [string, string, string, string, string]
      | [string, string, string, string, string, string]
      | [string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ];
    /**
     * A reference to governance policies (e.g., Ceramic document, IPFS hash, or governance description)
     */
    rules: string;
  };
  /**
   * Multi-root trust pattern type
   */
  rootType?: "self-sovereign" | "delegated" | "federated" | "hybrid";
  governanceModel?: {
    /**
     * Governance model for this DID entity
     */
    type?: "self-governed" | "dao" | "committee" | "hierarchical" | "consensus";
    /**
     * DIDs of governance participants
     */
    participants?: string[];
  };
  /**
   * Chain of trust delegation from root authority to this DID
   *
   * @minItems 1
   * @maxItems 10
   */
  delegationChain?:
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string];
  /**
   * Contextual information about the DID's role in the trust chain
   */
  trustChainContext?: string;
  metadata?: {
    /**
     * Schema version for tracking evolution
     */
    version?: string;
    /**
     * Schema type identifier for BFF integration
     */
    schemaType?: "DIDDeclaration";
    /**
     * Indicates if schema supports BFF integration patterns
     */
    bffIntegration?: boolean;
  };
  /**
   * Timestamp when the DID declaration was created
   */
  createdAt?: string;
  /**
   * Timestamp when the DID declaration was last updated
   */
  updatedAt?: string;
  blockchainSync?: {
    /**
     * Blockchain transaction hash for this DID declaration
     */
    transactionHash?: string;
    /**
     * Block number where transaction was confirmed
     */
    blockNumber?: number;
    /**
     * Blockchain network identifier
     */
    networkId?: "cheqd:mainnet" | "cheqd:testnet" | "ethereum:mainnet" | "ethereum:sepolia";
    /**
     * Last blockchain synchronization timestamp
     */
    lastSynced?: string;
  };
}
