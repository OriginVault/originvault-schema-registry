import { TAgent, IKeyManager, IDIDManager, ICredentialIssuer, ICredentialVerifier, ICredentialPlugin, IDataStore, ICheqd, IResolver } from '@openverifiable/open-verifiable-types';
export { DIDDocument, DIDResolver, DIDResolutionResult, ServiceEndpoint, PublicKey, Authentication, APPLICATION_BASE_URL, API_KEY_PREFIX, API_SECRET_KEY_LENGTH, API_KEY_EXPIRATION, CORS_ALLOWED_ORIGINS, CORS_ERROR_MSG, DEFAULT_DENOM_EXPONENT, FAUCET_URI, LOG_LEVEL, LOGTO_MANAGEMENT_API, MINIMAL_DENOM, TESTNET_MINIMUM_BALANCE, VC_CONTEXT, VC_PROOF_FORMAT, VC_REMOVE_ORIGINAL_FIELDS, IResolver, IDataStore, IKeyManager, TAgent, IAgentPlugin, IAgentBase, IAgentContext, IAgentOptions, ICheckCredentialStatusArgs, ICreateVerifiableCredentialArgs, ICreateVerifiablePresentationArgs, ICredentialIssuer, IDIDManager, IAgent, IAgentPluginSchema, IPluginMethodMap, RemoveContext, VerifiableCredential, UniqueVerifiableCredential, UniqueVerifiablePresentation, UnsignedCredential, UnsignedPresentation, UsingResolutionOptions, IDIDManagerUpdateArgs, ICredentialPlugin, ICredentialStatusManager, ICredentialStatus, ICredentialStatusVerifier, ICredentialVerifier, IDIDManagerAddKeyArgs, IDIDManagerAddServiceArgs, IDIDManagerCreateArgs, IDIDManagerDeleteArgs, IDIDManagerFindArgs, IDIDManagerGetArgs, IDIDManagerGetByAliasArgs, IDIDManagerGetOrCreateArgs, IDIDManagerRemoveKeyArgs, IDIDManagerRemoveServiceArgs, IDIDManagerSetAliasArgs, IDataStoreDeleteMessageArgs, IDataStoreDeleteVerifiableCredentialArgs, IMessage, IDataStoreORM, IDataStoreGetMessageArgs, IHandleMessageArgs, KeyMetadata, FindMessagesArgs, ManagedKeyInfo, IDataStoreSaveMessageArgs, IKeyManagerSharedSecretArgs, IKeyManagerSignArgs, DIDDocComponent, TClaimsColumns, TMessageColumns, CompactJWT, ContextType, TCredentialColumns, CredentialStatus, CredentialPayload, CredentialStatusGenerateArgs, CredentialStatusReference, CredentialStatusUpdateArgs, CredentialSubject, FindCredentialsArgs, IVerifyCredentialArgs, W3CVerifiablePresentation, W3CVerifiableCredential, IKeyManagerCreateArgs, FindClaimsArgs, IDataStoreGetVerifiableCredentialArgs, IDataStoreSaveVerifiableCredentialArgs, IKeyManagerEncryptJWEArgs, IDataStoreGetVerifiablePresentationArgs, IDataStoreSaveVerifiablePresentationArgs, IKeyManagerDecryptJWEArgs, IKey, IIdentifier, IMessageAttachment, IMessageAttachmentData, IMessageHandler, IMetaData, IEventListener, IError, IssuerAgentContext, IssuerType, IVerifyResult, IVerifyPresentationArgs, IServiceEndpoint, IService, IPluginMethod, IKeyManagerSignJWTArgs, IKeyManagerDeleteArgs, IKeyManagerGetArgs, IKeyManagerSignEthTXArgs, PartialIdentifier, MinimalImportableKey, MinimalImportableIdentifier, ICheqdSDKOptions, IContext, IKeyPair, IKeyValuePair, IModuleMethod, IModuleMethodMap, ISignInputs, IVerificationKeys, TVerificationKey, TImportableEd25519Key, TMethodSpecificId, TSignerAlgo, TVerificationKeyPrefix, DIDAccreditationTypes, AccreditationRequestType, DIDAccreditationRequestBody, DIDAccreditationRequestParams, DIDUrlParams, VerifyAccreditationRequestBody, VerifyAccreditationRequest, isDidUrl, isDidAndResourceId, isDidAndResourceName, VerfifiableAccreditation, RevokeAccreditationRequestBody, SuspendAccreditationRequestBody, UnsuspendAccreditationRequestBody, RevokeAccreditationResponseBody, SuspendAccreditationResponseBody, UnsuspendAccreditationResponseBody, RevokeAccreditationRequestQuery, SuspendAccreditationRequestQuery, UnsuspendAccreditationRequestQuery, CreateResourceRequestParams, CreateResourceRequestBody, SearchResourceRequestParams, CreateResourceResponseBody, QueryResourceResponseBody, UnsuccessfulCreateResourceResponseBody, CreateDidRequestBody, DeactivateDIDRequestBody, DeactivateDIDRequestParams, GetDIDRequestParams, ResolveDIDRequestParams, CreateDidResponseBody, UpdateDidRequestBody, UpdateDidResponseBody, DeactivateDidResponseBody, ResolveDidResponseBody, UnsuccessfulCreateDidResponseBody, UnsuccessfulUpdateDidResponseBody, UnsuccessfulDeactivateDidResponseBody, UnsuccessfulGetDidResponseBody, UnsuccessfulResolveDidResponseBody, QueryCustomerResponseBody, UpdateCustomerEntity, QueryIdTokenResponseBody, UnsuccessfulQueryCustomerResponseBody, UnsuccessfulQueryIdTokenResponseBody, IFeePaymentOptions, IResourceTrack, ICredentialStatusTrack, ICredentialTrack, IDIDTrack, IPresentationTrack, IKeyTrack, ITrackOperation, ITrackResult, INotifyMessage, CredentialConnectors, CredentialRequest, CredentialRequestBody, IssueCredentialRequestBody, VerifyCredentialRequestBody, VerifyCredentialRequestQuery, RevokeCredentialRequestBody, RevokeCredentialRequestQuery, SuspendCredentialRequestBody, SuspendCredentialRequestQuery, UnsuspendCredentialRequestBody, UnsuspendCredentialRequestQuery, IssueCredentialResponseBody, VerifyCredentialResponseBody, RevokeCredentialResponseBody, SuspendCredentialResponseBody, UnsuspendCredentialResponseBody, UnsuccesfulIssueCredentialResponseBody, UnsuccesfulRevokeredentialResponseBody, UnsuccesfulReinstateCredentialResponseBody, UnsuccesfulVerifyCredentialResponseBody, UnsuccesfulRevokeCredentialResponseBody, UnsuccesfulSuspendCredentialResponseBody, UnsuccesfulUnsuspendCredentialResponseBody, KeyImport, ImportKeyRequestBody, GetKeyRequestBody, CreateKeyResponseBody, ImportKeyResponseBody, QueryKeyResponseBody, UnsuccessfulCreateKeyResponseBody, UnsuccessfulImportKeyResponseBody, UnsuccessfulQueryKeyResponseBody, CreatePresentationRequestBody, VerifyPresentationRequestBody, CreatePresentationResponseBody, VerifyPresentationResponseQuery, VerifyPresentationResponseBody, UnsuccessfulVerifyCredentialResponseBody, UnsuccessfulCreatePresentationResponseBody, VeramoAgent, CreateAgentRequest, IErrorResponse, IReturn, SpecValidationResult, ValidationErrorResponseBody, VerificationOptions, IBooleanResponse, LinkedResource, LinkedResourceMetadataResolutionResult, ICheqdCreateLinkedResourceResponse, ICheqdCreateLinkedResourceArgs, ICheqd, ICheqdBroadcastStatusList2021Args, ICheqdCheckCredentialStatusWithStatusList2021Args, ICheqdCheckCredentialWithStatusList2021StatusOptions, ICheqdCreateIdentifierArgs, ICheqdCreateStatusList2021Args, ICheqdCreateUnencryptedStatusList2021Args, ICheqdDeactivateIdentifierArgs, ICheqdDelegateCapacityCreditArgs, ICheqdGenerateDidDocArgs, ICheqdGenerateDidDocWithLinkedResourceArgs, ICheqdGenerateKeyPairArgs, ICheqdGenerateStatusList2021Args, ICheqdGenerateVersionIdArgs, ICheqdIDentifier, ICheqdIssueRevocableCredentialWithStatusList2021Args, ICheqdIssueSuspendableCredentialWithStatusList2021Args, ICheqdMintCapacityCreditArgs, ICheqdObservePaymentConditionArgs, ICheqdRevokeBulkCredentialsWithStatusList2021Args, ICheqdRevokeBulkCredentialsWithStatusList2021Options, ICheqdRevokeCredentialWithStatusList2021Args, ICheqdRevokeCredentialWithStatusList2021Options, ICheqdStatusList2021Options, ICheqdSuspendBulkCredentialsWithStatusList2021Args, ICheqdSuspendBulkCredentialsWithStatusList2021Options, ICheqdSuspendCredentialWithStatusList2021Args, ICheqdSuspendCredentialWithStatusList2021Options, ICheqdTransactSendTokensArgs, ICheqdUnsuspendBulkCredentialsWithStatusList2021Args, ICheqdUnsuspendBulkCredentialsWithStatusList2021Options, ICheqdUnsuspendCredentialWithStatusList2021Args, ICheqdUnsuspendCredentialWithStatusList2021Options, ICheqdUpdateIdentifierArgs, ICheqdVerifyCredentialWithStatusList2021Args, ICheqdVerifyPresentationWithStatusList2021Args, IContext as ICheqdContext, IKeyWithController, APISuccessResponse, APIErrorResponse, SafeAPIResponse, AlternativeUri, CreateUnencryptedStatusListRequestBody, CreateUnencryptedStatusListRequestQuery, CreateUnencryptedStatusListSuccessfulResponseBody, CreateUnencryptedStatusListUnsuccessfulResponseBody, CreateEncryptedStatusListRequestBody, CreateEncryptedStatusListRequestQuery, CreateEncryptedStatusListSuccessfulResponseBody, CreateEncryptedStatusListUnsuccessfulResponseBody, UpdateUnencryptedStatusListRequestBody, UpdateUnencryptedStatusListRequestQuery, UpdateUnencryptedStatusListSuccessfulResponseBody, UpdateUnencryptedStatusListUnsuccessfulResponseBody, UpdateEncryptedStatusListRequestBody, UpdateEncryptedStatusListRequestQuery, UpdateEncryptedStatusListSuccessfulResponseBody, UpdateEncryptedStatusListUnsuccessfulResponseBody, CheckStatusListRequestBody, CheckStatusListRequestQuery, CheckStatusListSuccessfulResponseBody, CheckStatusListUnsuccessfulResponseBody, SearchStatusListQuery, SearchStatusListSuccessfulResponseBody, SearchStatusListUnsuccessfulResponseBody, CreateUnencryptedStatusListOptions, CreateEncryptedStatusListOptions, UpdateUnencryptedStatusListOptions, UpdateEncryptedStatusListOptions, SearchStatusListResult, BroadcastStatusListOptions, StatusOptions, RevocationStatusOptions, SuspensionStatusOptions, CheckStatusListOptions, DataRecord, CredentialDataRecord, AuthRule, ICommonErrorResponse, AuthRuleOptions, ProductWithPrices, APIServiceOptions, ProductListUnsuccessfulResponseBody, ProductGetUnsuccessfulResponseBody, ProductListResponseBody, ProductGetResponseBody, PriceListResponseBody, PriceListUnsuccessfulResponseBody, SubscriptionCreateRequestBody, SubscriptionCreateResponseBody, SubscriptionUpdateResponseBody, SubscriptionUpdateRequestBody, SubscriptionGetRequestBody, SubscriptionGetResponseBody, SubscriptionListResponseBody, SubscriptionCancelRequestBody, SubscriptionCancelResponseBody, SubscriptionResumeRequestBody, SubscriptionResumeResponseBody, CheckoutSessionGetResponseBody, SubscriptionCreateUnsuccessfulResponseBody, SubscriptionListUnsuccessfulResponseBody, SubscriptionGetUnsuccessfulResponseBody, SubscriptionUpdateUnsuccessfulResponseBody, SubscriptionCancelUnsuccessfulResponseBody, SubscriptionResumeUnsuccessfulResponseBody, CheckoutSessionGetUnsuccessfulResponseBody, PortalCustomerGetUnsuccessfulResponseBody, APIKeyResponseBody, APIKeyCreateRequestBody, APIKeyCreateResponseBody, APIKeyCreateUnsuccessfulResponseBody, APIKeyUpdateRequestBody, APIKeyUpdateResponseBody, APIKeyUpdateUnsuccessfulResponseBody, APIKeyRevokeRequestBody, APIKeyRevokeResponseBody, APIKeyRevokeUnsuccessfulResponseBody, APIKeyListResponseBody, APIKeyListUnsuccessfulResponseBody, APIKeyGetRequestBody, APIKeyGetResponseBody, APIKeyGetUnsuccessfulResponseBody, AdminOrganisationResponseBody, AdminOrganisationGetResponseBody, AdminOrganisationGetUnsuccessfulResponseBody, AdminOrganisationUpdateRequestBody, AdminOrganisationUpdateResponseBody, AdminOrganisationUpdateUnsuccessfulResponseBody, PaymentBehavior, SupportedPlanTypes, CreateDIDService, JwtProof2020, JSONLDProofType, CheqdCredentialStatus, ResourcePayload, StatusList2021Revocation, StatusCheckResult, StatusList2021ResourcePayload, StatusList2021RevocationNonMigrated, StatusList2021Suspension, StatusList2021SuspensionNonMigrated, CreateStatusList2021MethodName, CreateStatusList2021Result, DefaultStatusList2021Encoding, DefaultStatusList2021Encodings, DefaultStatusList2021ResourceType, DefaultStatusList2021ResourceTypes, DefaultStatusList2021StatusPurposeType, DefaultStatusList2021StatusPurposeTypes, GenerateStatusList2021MethodName, SaveEncryptionKeyArgs, LastCommit, Header, Evidence, Block, BlockID, BlockResponse, BroadcastStatusList2021MethodName, LitNetwork, LitCompatibleCosmosChain, LitProtocolOptions, LitContractsOptions, LitContractsMintCapacityCreditsOptions, LitContractsCreateCapacityDelegationAuthSignatureOptions, MintCapacityCreditsResult, CreateCapacityDelegationAuthSignatureResult, TxNonceFormat, PrivateKeyLiteral, LitProtocol, ShallowTypedTx, TxNonceFormats, TExportedDIDDocWithKeys, TPublicKeyEd25519, TExportedDIDDocWithLinkedResourceWithKeys, TSupportedKeyType, ThresholdEncryptionCipherText, TransactionResult, ThresholdEncryptionResult, TransactSendTokensMethodName, ShallowTypedTxTxResponses, ShallowTypedTxsResponse, SymmetricEncryptionCipherText, Stripe, CreateAction, CreationDate, CreativeWork, CreativeWorkSeason, CreativeWorkSeries, Creator, Claim, ClaimData, ClaimReview, ArtGallery, CoverArt, ArtistCreator, Credential, CredentialData, CredentialSchema, Certification, CertificationStatusEnumeration, School, Sculpture, Drawing, Painting, DigitalDocument, DigitalDocumentPermission, DigitalDocumentPermissionType, TextDigitalDocument, FileDataID, DigitalPlatformEnumeration, VisualArtsEvent, VisualArtwork, QualitativeValue, QuantitativeValue, QuantitativeValueDistribution, Quantity, TypeAndQuantityNode, ComicCoverArt, PerformingArtsTheater, AvatarURL, Rating, Review, ReviewAction, UserReview, MediaGallery, MediaObject, MediaReview, MediaSubscription, MediaEnumeration, MediaManipulationRatingEnumeration, DIDAddress, DID, DIDJWTVerifiableCredential, DIDOfTheSubject, DIDThatOwnsTheDatabase, ExternalDID, DownloadAction, DataDownload, File, AudioObject, AudioObjectSnapshot, Audience, AIAssistant, Value, ValidUntil, VirtualLocation, Person, PeopleAudience, AdultOrientedEnumeration, ParentAudience, EducationalAudience, BusinessAudience, BusinessEntityType, BusinessEvent, BusinessFunction, LocalBusiness, OnlineBusiness, OnlineStore, Organization, OpenSeaMetadata, OrganizationRole, ArchiveOrganization, SoftwareApplication, SoftwareSourceCode, PriceSpecification, PriceComponentTypeEnumeration, PriceTypeEnumeration, UnitPriceSpecification, CompoundPriceSpecification, ProductCollection, Process, Profile, } from '@openverifiable/open-verifiable-types';
export type IOVAgent = TAgent<IKeyManager & IDIDManager & ICredentialIssuer & ICredentialVerifier & ICredentialPlugin & IDataStore & ICheqd & IResolver>;
export interface DIDAssertionCredential {
  /**
   * The unique identifier for the credential.
   */
  id: string;
  /**
   * The type of the credential, typically including 'VerifiableCredential'.
   */
  type: string[];
  /**
   * The entity that issued the credential.
   */
  issuer: {
    /**
     * The unique identifier for the issuer.
     */
    id: string;
    [k: string]: unknown;
  };
  /**
   * The subject of the credential.
   */
  credentialSubject: {
    /**
     * The DID that this credential is asserting information about.
     */
    id?: string;
    /**
     * The type of assertion this credential makes about the DID.
     */
    assertionType?: string;
    /**
     * Flexible metadata about the assertion, allowing any key-value pairs for extensibility.
     */
    assertionDetails?: {
      [k: string]: unknown;
    };
    verificationSteps?: {
      /**
       * The verification step performed.
       */
      step: string;
      result: "Passed" | "Failed";
      timestamp: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  /**
   * The context of the credential.
   */
  "@context": string[];
  /**
   * The expiration date of the credential.
   */
  expirationDate: string;
  [k: string]: unknown;
}

export interface DevelopmentEnvironmentMetadata {
  /**
   * The development environment or platform used (e.g., 'Node.js v14.17.0').
   */
  environment: string;
  packageJson: {
    name: string;
    version: string;
    organization: string;
    description?: string;
    main?: string;
    type?: string;
    files?: string[];
    scripts?: {
      [k: string]: string;
    };
    repository?: {
      type: string;
      url: string;
      [k: string]: unknown;
    };
    license?: string;
    engines?: {
      [k: string]: string;
    };
    keywords?: string[];
    homepage?: string;
    dependencies?: {
      [k: string]: string;
    };
    devDependencies?: {
      [k: string]: string;
    };
    "lint-staged"?: {
      [k: string]: string;
    };
    _id?: string;
    [k: string]: unknown;
  };
  /**
   * The tool used for building or compiling the project (e.g., 'webpack v5.38.1').
   */
  buildTool?: string;
  /**
   * The Git commit hash corresponding to the codebase at the time of credential issuance.
   */
  commitHash?: string;
  /**
   * The date and time when the credential was generated.
   */
  timestamp: string;
  /**
   * A generic description of the operating system used in the development environment (e.g., 'Linux-based OS').
   */
  operatingSystem?: string;
  /**
   * The hashed hostname of the machine running the development environment.
   */
  hostname?: string;
  /**
   * The hashed IP address of the machine running the development environment.
   */
  ipAddress?: string;
  [k: string]: unknown;
}

/**
 * A non-empty URI string
 */
export type NonEmptyUri = string;
/**
 * A non-empty string
 */
export type NonEmptyString = string;
export type VerifiedIdentity = {
  type: NonEmptyString;
  username?: string;
  uri?: NonEmptyUri;
  provider?: IdentifiableObject;
  /**
   * A non-empty string
   */
  verifiedAt: string;
  name?: NonEmptyString;
  method?: NonEmptyString;
  address?: string;
  [k: string]: unknown;
} & VerifiedIdentity1 & {
    type: NonEmptyString;
    username?: string;
    uri?: NonEmptyUri;
    provider?: IdentifiableObject;
    /**
     * A non-empty string
     */
    verifiedAt: string;
    name?: NonEmptyString;
    method?: NonEmptyString;
    address?: string;
    [k: string]: unknown;
  } & VerifiedIdentity1;
export type VerifiedIdentity1 =
  | {
      type?: "cawg.social_media";
      [k: string]: unknown;
    }
  | {
      type?: "cawg.crypto_wallet";
      [k: string]: unknown;
    }
  | {
      type?: "cawg.document_verification";
      [k: string]: unknown;
    }
  | {
      type?: "cawg.affiliation";
      [k: string]: unknown;
    }
  | {
      type?: "cawg.web_site";
      [k: string]: unknown;
    };

/**
 * Creator Identity Assertion Credential Schema for usage in JsonSchema
 */
export interface IdentityClaimsAggregationCredential {
  /**
   * @minItems 2
   */
  type: {
    [k: string]: unknown;
  } & [string, string, ...string[]];
  issuer:
    | NonEmptyUri
    | {
        id: NonEmptyUri;
        name?: NonEmptyString;
        [k: string]: unknown;
      };
  validFrom: string;
  expiresAt?: string;
  credentialSubject: {
    id: NonEmptyUri;
    /**
     * @minItems 1
     */
    verifiedIdentities: [VerifiedIdentity, ...VerifiedIdentity[]];
    c2paAsset: {
      /**
       * @minItems 1
       */
      referenced_assertions: [
        {
          url?: NonEmptyString;
          hash: NonEmptyString;
          alg?: NonEmptyString;
          [k: string]: unknown;
        },
        ...{
          url?: NonEmptyString;
          hash: NonEmptyString;
          alg?: NonEmptyString;
          [k: string]: unknown;
        }[]
      ];
      sig_type: string;
      role?:
        | "cawg.creator"
        | "cawg.contributor"
        | "cawg.editor"
        | "cawg.producer"
        | "cawg.publisher"
        | "cawg.sponsor"
        | "cawg.translator";
      expected_partial_claim?: string;
      expected_claim_generator?: string;
      expected_countersigners?: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * An object with an identifiable URI and name
 */
export interface IdentifiableObject {
  /**
   * A non-empty URI string
   */
  id: string;
  /**
   * A non-empty string
   */
  name: string;
  [k: string]: unknown;
}

