/**
 * Generated from NamespaceParticipationAgreement.json
 * Schema: https://schemas.originvault.box/NamespaceParticipationAgreement
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * Defines the terms for joining a namespace in the OV ecosystem.
 */
export interface NamespaceParticipationAgreement {
  /**
   * Schema.org type
   */
  "@type"?: "License" | "CreativeWork";
  /**
   * DID of the agreement.
   */
  agreementId: string;
  /**
   * DID of the namespace being joined.
   */
  namespaceId: string;
  /**
   * DID of the participant (Vault, Node, or Cluster).
   */
  participantId: string;
  /**
   * The role of the participant within the namespace.
   */
  role: "Vault" | "Node" | "Cluster";
  /**
   * List of governance and verification requirements for participation.
   */
  complianceRequirements: string[];
  /**
   * Conditions under which a participant can be removed from the namespace.
   */
  revocationPolicy: string;
  /**
   * Whether the participant has accepted the agreement.
   */
  agreementSigned: boolean;
  /**
   * Time of agreement acceptance.
   */
  timestamp: string;
}
