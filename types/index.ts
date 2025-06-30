/**
 * OriginVault Schema Registry - Type Exports
 * Auto-generated from JSON schemas
 */

export * from './AIConfig';
export * from './AIModelTrainingAgreement';
export * from './Admin';
export * from './ClaimVerification';
export * from './ClusterGovernance';
export * from './ClusterRegistration';
export * from './CommunityMember';
export * from './ComputeNode';
export * from './ContentAIPermissionAssertionCredential';
export * from './ContentAuthenticityAssertionCredential';
export * from './ContentExtendedMetadata';
export * from './ContentLegalAccountability';
export * from './ContentLicensingAgreement';
export * from './ContentLicensingTerms';
export * from './Creator';
export * from './DIDAssertionCredential';
export * from './DIDDeclaration';
export * from './DataChamberContributionAgreement';
export * from './DataChamberEnrollment';
export * from './Developer';
export * from './DevelopmentEnvironmentMetadata';
export * from './DigitalDocument';
export * from './EndorsementRecord';
export * from './ExternalBuyerAgreement';
export * from './ExternalDataAccess';
export * from './GemDeclaration';
export * from './GemIssuanceRecord';
export * from './GemReputationScore';
export * from './GemRevocationRecord';
export * from './GemTrustRegistry';
export * from './GlobalPrivacyControl';
export * from './GovernanceProposal';
export * from './IdentityClaimsAggregationCredential';
export * from './IdentityNodeDeclaration';
export * from './LanguageConfiguration';
export * from './NamespaceDeclaration';
export * from './NamespaceGovernance';
export * from './NamespaceParticipationAgreement';
export * from './NamespacePluginDeclaration';
export * from './NamespaceProposal';
export * from './NamespaceRecognitionCertificate';
export * from './NamespaceReputationRecord';
export * from './NodeClusterDeclaration';
export * from './NodeDeclaration';
export * from './NodeOperatorAgreement';
export * from './NodeVoting';
export * from './Owner';
export * from './PackageJson';
export * from './Persona';
export * from './PluginDeclaration';
export * from './PluginDeveloperAgreement';
export * from './PluginExectutionRequest';
export * from './PluginIntegrationAgreement';
export * from './ReferalAgreement';
export * from './RevenuDistribution';
export * from './Revocation';
export * from './RootAuthority';
export * from './ServiceLevelAgreement';
export * from './StorageNodeDeclaration';
export * from './TrustChainDelegation';
export * from './TrustDelegation';
export * from './TrustGate';
export * from './TrustScore';
export * from './TrustedIssuer';
export * from './TsconfigJson';
export * from './VaultAdminAgreement';
export * from './VaultChamberGovernance';
export * from './VaultChamberPlugin';
export * from './VaultChamberTagging';
export * from './VaultChamberTransaction';
export * from './VaultDeclaration';
export * from './VaultOperator';
export * from './VaultPluginInstallationLog';
export * from './VaultUserAgreement';
export * from './VerificationLog';
export * from './VerificationNode';
export * from './Verifier';
export * from './VotingSchema';

// Re-export common interfaces
export interface SchemaMetadata {
  name: string;
  id: string;
  hash: string;
  version: string;
}

export interface MultiRootTrustContext {
  rootType: 'namespace' | 'platform' | 'user' | 'organization' | 'community' | 'concept';
  rootDID: string;
  delegationChain?: string[];
  governanceModel: 'self-governed' | 'dao' | 'committee' | 'consortium';
}
