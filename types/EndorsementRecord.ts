/**
 * Generated from EndorsementRecord.json
 * Schema: https://schemas.originvault.box/EndorsementRecord
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Represents an endorsement given by one DID to another, contributing to trust scoring.
 */
export interface EndorsementRecord {
  /**
   * Unique identifier for the endorsement record
   */
  id: string;
  /**
   * DID of the user giving the endorsement
   */
  endorserDid: string;
  /**
   * DID of the user receiving the endorsement
   */
  endorsedDid: string;
  /**
   * Type of credential being endorsed
   */
  credentialType: string;
  /**
   * Weight/strength of the endorsement (0-10)
   */
  weight: number;
  /**
   * When the endorsement was given
   */
  timestamp: string;
  /**
   * Reason for the endorsement
   */
  endorsementReason?: string;
  /**
   * Category of the endorsement
   */
  endorsementType?: "verification" | "governance" | "community" | "development" | "trust";
  /**
   * Gem that qualifies the endorser to give this endorsement
   */
  linkedGem?: string;
  /**
   * DID-Linked Resource to a Verifiable Credential supporting the endorsement
   */
  linkedCredential?: string;
  /**
   * Blockchain synchronization status
   */
  blockchainSync?: {
    /**
     * Last time endorsement was synced with blockchain
     */
    lastSynced?: string;
    /**
     * Whether there are local changes not yet pushed to blockchain
     */
    pendingChanges?: boolean;
    /**
     * Resource ID on blockchain for this endorsement
     */
    blockchainResourceId?: string;
  };
  /**
   * Additional metadata for the endorsement
   */
  metadata?: {};
}
