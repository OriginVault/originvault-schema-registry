/**
 * Schema Registry for BFF Integration
 * Aligns with ADR 0008: Schema-Driven API Architecture
 * Supports multi-root trust architecture
 */
export declare const SCHEMA_REGISTRY: {
    readonly Admin: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/Admin";
        readonly title: "Admin";
        readonly description: "Defines an administrator role within OriginVault, including governance and permissions.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["Person", "Organization"];
                readonly description: "Schema.org type";
            };
            readonly adminId: {
                readonly type: "string";
                readonly description: "DID of the admin.";
            };
            readonly governsVaults: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of vaults managed by this admin.";
                };
            };
            readonly managesNodes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of nodes managed by this admin.";
                };
            };
            readonly policyApprovals: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of approved governance policies.";
                };
            };
            readonly enforcementActions: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly actionId: {
                            readonly type: "string";
                            readonly description: "DID of the action taken.";
                        };
                        readonly targetEntity: {
                            readonly type: "string";
                            readonly description: "DID of the entity affected by the action.";
                        };
                        readonly reason: {
                            readonly type: "string";
                            readonly description: "Reason for enforcement.";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Time of enforcement action.";
                        };
                    };
                };
                readonly description: "Records enforcement actions taken by the admin.";
            };
            readonly trustedByNamespaces: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of namespaces that trust this admin.";
                };
            };
            readonly securityClearanceLevel: {
                readonly type: "string";
                readonly enum: readonly ["low", "medium", "high"];
                readonly description: "Level of security clearance granted to the admin.";
            };
        };
        readonly required: readonly ["adminId", "governsVaults", "managesNodes", "policyApprovals"];
    };
    readonly AIConfig: {
        readonly $schema: "http://json-schema.org/draft-07/schema#";
        readonly $id: "https://json.schemastore.org/aiconfig-1.0.json";
        readonly additionalProperties: {};
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly description: "Friendly name descriptor for the AIConfig. Could default to the filename if not specified.";
                readonly type: "string";
            };
            readonly description: {
                readonly description: "Description of the AIConfig.\nIf you have a collection of different AIConfigs, this may be used for dynamic prompt routing.";
                readonly type: "string";
            };
            readonly schema_version: {
                readonly $ref: "#/definitions/SchemaVersion";
                readonly description: "The version of the AIConfig schema.";
            };
            readonly metadata: {
                readonly description: "Root-level metadata that applies to the entire AIConfig.";
                readonly type: "object";
                readonly additionalProperties: {};
                readonly properties: {
                    readonly parameters: {
                        readonly description: "Parameter definitions that are accessible to all prompts in this AIConfig.\nThese parameters can be referenced in the prompts using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.";
                        readonly type: "object";
                        readonly additionalProperties: {};
                    };
                    readonly models: {
                        readonly description: "Globally defined model settings. Any prompts that use these models will have these settings applied by default,\nunless they override them with their own model settings.";
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "object";
                            readonly additionalProperties: {};
                        };
                    };
                    readonly default_model: {
                        readonly description: "Default model to use for prompts that do not specify a model.";
                        readonly type: "string";
                    };
                    readonly model_parsers: {
                        readonly description: "Model ID to ModelParser ID mapping.\nThis is useful if you want to use a custom ModelParser for a model, or if a single ModelParser can handle multiple models.";
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly prompts: {
                readonly description: "Array of prompts that make up the AIConfig.";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly description: "A unique identifier for the prompt. This is used to reference the prompt in other parts of the AIConfig (such as other prompts)";
                            readonly type: "string";
                        };
                        readonly input: {
                            readonly $ref: "#/definitions/PromptInput";
                            readonly description: "The prompt string, or a more complex prompt object.";
                        };
                        readonly metadata: {
                            readonly type: "object";
                            readonly additionalProperties: {};
                            readonly properties: {
                                readonly parameters: {
                                    readonly description: "Parameter definitions that are accessible to this prompt.\nThese parameters can be referenced in the prompt using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.";
                                    readonly type: "object";
                                    readonly additionalProperties: {};
                                };
                                readonly model: {
                                    readonly description: "Model name/settings that apply to this prompt.\nThese settings override any global model settings that may have been defined in the AIConfig metadata.\nIf this is a string, it is assumed to be the model name.\nIf this is undefined, the default model specified in the default_model property will be used for this Prompt.";
                                    readonly anyOf: readonly [{
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly name: {
                                                readonly description: "The ID of the model to use.";
                                                readonly type: "string";
                                            };
                                            readonly settings: {
                                                readonly description: "Model inference settings that apply to this prompt.";
                                                readonly type: "object";
                                                readonly additionalProperties: {};
                                            };
                                        };
                                        readonly required: readonly ["name"];
                                    }, {
                                        readonly type: "string";
                                    }];
                                };
                                readonly tags: {
                                    readonly description: "Tags for this prompt. Tags must be unique, and must not contain commas.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly outputs: {
                            readonly description: "Execution, display, or stream outputs.";
                            readonly type: "array";
                            readonly items: {
                                readonly $ref: "#/definitions/Output";
                            };
                        };
                    };
                    readonly required: readonly ["input", "name"];
                };
            };
        };
        readonly required: readonly ["metadata", "name", "prompts", "schema_version"];
        readonly definitions: {
            readonly SchemaVersion: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly properties: {
                        readonly major: {
                            readonly type: "number";
                        };
                        readonly minor: {
                            readonly type: "number";
                        };
                    };
                    readonly required: readonly ["major", "minor"];
                }, {
                    readonly enum: readonly ["latest", "v1"];
                    readonly type: "string";
                }];
            };
            readonly PromptInput: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly additionalProperties: {};
                    readonly properties: {
                        readonly data: {
                            readonly description: "Input to the model. This can represent a single input, or multiple inputs.\nThe structure of the data object is up to the ModelParser. Attachments field should be leveraged for non-text inputs (e.g. image, audio).";
                        };
                        readonly attachments: {
                            readonly description: "Used to include non-text inputs (e.g. image, audio) of specified MIME types in the prompt";
                            readonly type: "array";
                            readonly items: {
                                readonly $ref: "#/definitions/Attachment";
                            };
                        };
                    };
                }, {
                    readonly type: "string";
                }];
            };
            readonly Attachment: {
                readonly description: "Data of specified MIME type to attach to a prompt";
                readonly type: "object";
                readonly required: readonly ["data"];
                readonly properties: {
                    readonly mime_type: {
                        readonly description: "MIME type of the attachment. If not specified, the MIME type will be assumed to be text/plain.";
                        readonly type: "string";
                    };
                    readonly data: {
                        readonly description: "Data representing the attachment";
                    };
                    readonly metadata: {
                        readonly description: "Attachment metadata.";
                        readonly type: "object";
                        readonly additionalProperties: {};
                    };
                };
            };
            readonly Output: {
                readonly description: "Model inference result.";
                readonly anyOf: readonly [{
                    readonly description: "Result of executing a prompt.";
                    readonly type: "object";
                    readonly properties: {
                        readonly output_type: {
                            readonly description: "Type of output.";
                            readonly type: "string";
                            readonly const: "execute_result";
                        };
                        readonly execution_count: {
                            readonly description: "A result's prompt number.";
                            readonly type: "number";
                        };
                        readonly data: {
                            readonly description: "The result of executing the prompt.";
                        };
                        readonly mime_type: {
                            readonly description: "The MIME type of the result. If not specified, the MIME type will be assumed to be plain text.";
                            readonly type: "string";
                        };
                        readonly metadata: {
                            readonly description: "Output metadata.";
                            readonly type: "object";
                            readonly additionalProperties: {};
                        };
                    };
                    readonly required: readonly ["data", "output_type"];
                }, {
                    readonly description: "Output of an error that occurred during inference.";
                    readonly type: "object";
                    readonly properties: {
                        readonly output_type: {
                            readonly description: "Type of output.";
                            readonly type: "string";
                            readonly const: "error";
                        };
                        readonly ename: {
                            readonly description: "The name of the error.";
                            readonly type: "string";
                        };
                        readonly evalue: {
                            readonly description: "The value, or message, of the error.";
                            readonly type: "string";
                        };
                        readonly traceback: {
                            readonly description: "The error's traceback, represented as an array of strings.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly required: readonly ["ename", "evalue", "output_type", "traceback"];
                }];
            };
        };
    };
    readonly AIModelTrainingAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/AITrainingAgreement";
        readonly title: "AI Model Training Agreement";
        readonly description: "Defines terms for AI companies training models on data within OV Vaults.";
        readonly type: "object";
        readonly properties: {
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly buyerId: {
                readonly type: "string";
                readonly description: "DID of the AI company.";
            };
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Vault Chamber providing data.";
            };
            readonly licenseTerms: {
                readonly type: "object";
                readonly properties: {
                    readonly licenseType: {
                        readonly type: "string";
                        readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited"];
                    };
                    readonly dataAnonymization: {
                        readonly type: "boolean";
                        readonly description: "Whether the data must be anonymized.";
                    };
                };
            };
            readonly usageScope: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["Training Only", "Commercial Model Deployment", "Open-Source Research"];
                };
            };
            readonly complianceRequirements: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "Legal compliance and privacy requirements.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions under which access can be revoked.";
            };
            readonly paymentProof: {
                readonly type: "string";
                readonly description: "Verifiable Credential proving payment.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the AI company has accepted the agreement.";
            };
        };
        readonly required: readonly ["agreementId", "buyerId", "chamberId", "licenseTerms", "usageScope", "complianceRequirements", "revocationPolicy", "paymentProof", "agreementSigned"];
    };
    readonly ClaimVerification: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/ClaimVerification";
        readonly title: "Claim Verification";
        readonly type: "object";
        readonly properties: {
            readonly identifier: {
                readonly type: "string";
                readonly description: "DID of the claim.";
            };
            readonly interpretedAsClaim: {
                readonly type: "string";
                readonly description: "The assertion made by this content (e.g., 'This image was created by AI').";
            };
            readonly claimInterpreter: {
                readonly type: "object";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "DID of the verifying entity.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the interpreter (e.g., OriginVault AI Trust Validator).";
                    };
                };
            };
        };
        readonly required: readonly ["identifier", "interpretedAsClaim", "claimInterpreter"];
    };
    readonly ClusterGovernance: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ClusterGovernance";
        readonly title: "Cluster Governance Schema";
        readonly description: "Defines governance rules for an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the cluster governance document.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster this governance applies to.";
            };
            readonly nodeManagement: {
                readonly type: "object";
                readonly properties: {
                    readonly verificationMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["Open", "Permissioned", "Staked"];
                        readonly description: "The method used to verify new nodes joining the cluster.";
                    };
                    readonly removalPolicy: {
                        readonly type: "string";
                        readonly description: "Conditions under which nodes can be removed from the cluster.";
                    };
                };
                readonly description: "Rules for adding and removing nodes in the cluster.";
            };
            readonly serviceManagement: {
                readonly type: "object";
                readonly properties: {
                    readonly allowedServices: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of service types permitted in this cluster (e.g., Storage, Verification, Payment).";
                    };
                    readonly serviceVerification: {
                        readonly type: "string";
                        readonly description: "Reference to a DID-Linked Resource explaining service verification requirements.";
                    };
                };
                readonly description: "Governance rules for services running in the cluster.";
            };
            readonly securityPolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly auditFrequency: {
                        readonly type: "string";
                        readonly enum: readonly ["Daily", "Weekly", "Monthly"];
                        readonly description: "How frequently the cluster undergoes audits.";
                    };
                    readonly complianceChecks: {
                        readonly type: "string";
                        readonly description: "Reference to a DID-Linked Resource detailing compliance requirements.";
                    };
                };
                readonly description: "Security and compliance policies for the cluster.";
            };
            readonly governanceModel: {
                readonly type: "string";
                readonly enum: readonly ["AdminControlled", "MultiSig", "TokenVoting"];
                readonly description: "The governance model used to manage this cluster.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this governance document was issued.";
            };
        };
        readonly required: readonly ["id", "cluster", "nodeManagement", "serviceManagement", "securityPolicies", "timestamp"];
    };
    readonly ClusterRegistration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ClusterRegistration";
        readonly title: "Cluster Registration";
        readonly description: "Defines the registration details of an OV cluster within a namespace.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "DID of the cluster registration document.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "DID of the namespace this cluster belongs to.";
            };
            readonly clusterDID: {
                readonly type: "string";
                readonly description: "DID of the cluster.";
            };
            readonly governanceModel: {
                readonly type: "string";
                readonly enum: readonly ["centralized", "decentralized", "DAO-based"];
                readonly description: "Governance model of the cluster.";
            };
            readonly supportedPlugins: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of plugin DIDs this cluster supports.";
            };
            readonly nodeOperators: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of DIDs of node operators in this cluster.";
            };
            readonly createdAt: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp when the cluster was registered.";
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof of the cluster registration.";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly description: "Proof type.";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of proof creation.";
                    };
                    readonly verificationMethod: {
                        readonly type: "string";
                        readonly description: "DID or method used to verify this proof.";
                    };
                    readonly signatureValue: {
                        readonly type: "string";
                        readonly description: "Base64 or hex-encoded signature.";
                    };
                };
            };
        };
        readonly required: readonly ["id", "namespace", "clusterDID", "governanceModel", "supportedPlugins", "nodeOperators", "createdAt", "proof"];
    };
    readonly CommunityMember: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/CommunityMemberPersona";
        readonly title: "Community Member Persona";
        readonly description: "Defines a general community member in the OriginVault ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly participationHistory: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly activity: {
                            readonly type: "string";
                            readonly description: "Type of participation (e.g., event, discussion, content rating).";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Date of participation.";
                        };
                    };
                };
                readonly description: "Tracks engagement in OV-related activities.";
            };
            readonly referredUsers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of users referred to OV.";
                };
            };
        };
        readonly required: readonly ["participationHistory"];
    };
    readonly ComputeNode: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/ComputeNodeDeclaration";
        readonly title: "Compute Node Declaration";
        readonly description: "Defines a Compute Node in an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the Compute Node.";
            };
            readonly type: {
                readonly const: "ComputeNode";
                readonly description: "Node type.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster this node belongs to.";
            };
            readonly operator: {
                readonly type: "string";
                readonly description: "DID of the entity operating this node.";
            };
            readonly computeResources: {
                readonly type: "object";
                readonly properties: {
                    readonly cpu: {
                        readonly type: "string";
                        readonly description: "CPU specifications (e.g., 8 cores, 3.2GHz).";
                    };
                    readonly ram: {
                        readonly type: "string";
                        readonly description: "RAM available (e.g., 32GB, 64GB).";
                    };
                    readonly gpu: {
                        readonly type: "string";
                        readonly description: "GPU specifications (if applicable).";
                    };
                };
                readonly description: "Hardware specifications of the compute node.";
            };
            readonly supportedTasks: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of supported compute tasks (e.g., AI Training, Data Transformation, Encryption).";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., Data, ProcessingLogs, ModelOutputs).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "References to compute tasks and results.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "suspended", "revoked"];
                readonly description: "Operational status of the node.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of node declaration.";
            };
        };
        readonly required: readonly ["id", "cluster", "operator", "computeResources", "supportedTasks", "status", "timestamp"];
    };
    readonly ContentAIPermissionAssertionCredential: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ContentAIPermissionAssertionCredential";
        readonly title: "Content AI Permission Assertion Credential";
        readonly description: "Verifiable Credential asserting AI usage permissions and restrictions for digital content.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "The unique identifier for the credential.";
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
            };
            readonly issuer: {
                readonly type: "object";
                readonly description: "The entity that issued the credential.";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The unique identifier for the issuer.";
                    };
                };
                readonly required: readonly ["id"];
            };
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The context of the credential.";
            };
            readonly expirationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The expiration date of the credential.";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly "@type": {
                        readonly type: "string";
                        readonly enum: readonly ["DigitalDocument", "License"];
                        readonly description: "Schema.org type";
                    };
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The unique identifier for the content.";
                    };
                    readonly license: {
                        readonly type: "object";
                        readonly properties: {
                            readonly contentId: {
                                readonly type: "string";
                                readonly description: "DID of the content associated with this AI permission credential.";
                            };
                            readonly owner: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "DID of the content owner.";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Owners name or organization.";
                                    };
                                };
                            };
                            readonly permissions: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly allowDataMining: {
                                        readonly type: "boolean";
                                        readonly title: "Allow Data Mining?";
                                    };
                                    readonly allowAITraining: {
                                        readonly type: "boolean";
                                        readonly title: "Allow AI/ML Training?";
                                    };
                                    readonly allowAIInference: {
                                        readonly type: "boolean";
                                        readonly title: "Allow AI/ML Inference?";
                                    };
                                    readonly allowGenerativeAI: {
                                        readonly type: "boolean";
                                        readonly title: "Allow Generative AI (Image/Video/Text Generation)?";
                                    };
                                };
                            };
                            readonly prohibitedUses: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Resale", "Commercial AI Training", "Facial Recognition", "Military Use"];
                                    readonly description: "Explicitly prohibited use cases.";
                                };
                            };
                        };
                        readonly required: readonly ["contentId", "owner", "permissions"];
                    };
                    readonly monetization: {
                        readonly type: "object";
                        readonly properties: {
                            readonly licensingRequired: {
                                readonly type: "boolean";
                                readonly description: "Whether AI-related use requires a license.";
                            };
                            readonly paymentModel: {
                                readonly type: "string";
                                readonly enum: readonly ["One-Time Fee", "Subscription", "Per API Call"];
                                readonly description: "The payment model for AI permissions.";
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly description: "Price in USD or equivalent crypto.";
                            };
                            readonly royaltyPercentage: {
                                readonly type: "number";
                                readonly description: "Percentage of revenue owed to the content owner if used in AI applications.";
                            };
                        };
                        readonly description: "Defines AI licensing and monetization terms.";
                    };
                    readonly verification: {
                        readonly type: "object";
                        readonly properties: {
                            readonly complianceTracking: {
                                readonly type: "string";
                                readonly enum: readonly ["DID-Linked Resource", "On-Chain Record", "Verifiable Credential"];
                                readonly description: "Method used to track AI compliance.";
                            };
                            readonly auditFrequency: {
                                readonly type: "string";
                                readonly description: "How often compliance is reviewed (e.g., monthly, annually).";
                            };
                        };
                        readonly description: "Defines AI licensing enforcement and compliance tracking.";
                    };
                    readonly revocationPolicy: {
                        readonly type: "object";
                        readonly properties: {
                            readonly misuseConditions: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Conditions under which the AI permission is revoked.";
                            };
                            readonly expirationDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "The date when AI permissions expire.";
                            };
                        };
                        readonly description: "Defines when and why AI permissions may be revoked.";
                    };
                    readonly agreementSigned: {
                        readonly type: "boolean";
                        readonly description: "Whether both parties have accepted the AI permission terms.";
                    };
                    readonly issuedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of issuance.";
                    };
                };
            };
        };
        readonly required: readonly ["id", "issuer", "credentialSubject", "permissions", "verification", "revocationPolicy", "proof", "agreementSigned", "timestamp"];
    };
    readonly ContentAuthenticityAssertionCredential: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ContentAuthenticityAssertionCredential";
        readonly title: "Content Authenticity Assertion Credential";
        readonly description: "A Verifiable Credential that aggregates multiple content-related credentials into a single authenticity record.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "The unique identifier for the credential.";
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
            };
            readonly issuer: {
                readonly type: "object";
                readonly description: "The entity that issued the credential.";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The unique identifier for the issuer.";
                    };
                };
                readonly required: readonly ["id"];
            };
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The context of the credential.";
            };
            readonly expirationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The expiration date of the credential.";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly contentId: {
                        readonly type: "string";
                        readonly description: "Unique ID of the associated content.";
                    };
                    readonly includedCredentials: {
                        readonly type: "object";
                        readonly description: "DID references to modular Verifiable Credentials included in this authenticity record.";
                        readonly properties: {
                            readonly contentDetails: {
                                readonly type: "string";
                                readonly description: "DID DLR URI of the Content Details VC.";
                            };
                            readonly identityClaims: {
                                readonly type: "string";
                                readonly description: "DID DLR URI of the Identity Claims VC.";
                            };
                            readonly extendedMetadata: {
                                readonly type: "string";
                                readonly description: "DID DLR URI of the Extended Metadata VC.";
                            };
                            readonly aiPermissions: {
                                readonly type: "string";
                                readonly description: "DID DLR URI of the AI Permissions VC.";
                            };
                            readonly contentSigning: {
                                readonly type: "string";
                                readonly description: "DID DLR URI of the Content Signing VC.";
                            };
                        };
                    };
                };
                readonly required: readonly ["contentDetails", "identityClaims", "extendedMetadata", "aiPermissions", "contentSigning"];
            };
        };
        readonly required: readonly ["id", "issuer", "credentialSubject", "expirationDate"];
    };
    readonly ContentExtendedMetadata: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential";
        readonly title: "Content Extended Metadata Assertion Credential";
        readonly description: "Verifiable Credential containing metadata such as licensing and usage restrictions.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "The unique identifier for the credential.";
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
            };
            readonly issuer: {
                readonly type: "object";
                readonly description: "The entity that issued the credential.";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The unique identifier for the issuer.";
                    };
                };
                readonly required: readonly ["id"];
            };
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The context of the credential.";
            };
            readonly expirationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The expiration date of the credential.";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly contentReference: {
                        readonly type: "object";
                        readonly description: "References to the content’s integrity details.";
                        readonly properties: {
                            readonly identifier: {
                                readonly type: "string";
                                readonly description: "DID of the content being referenced.";
                            };
                            readonly contentHash: {
                                readonly type: "string";
                                readonly description: "SHA-256 or IPFS CID hash of the content.";
                            };
                            readonly perceptualHash: {
                                readonly type: "string";
                                readonly description: "Perceptual hash for similarity detection.";
                            };
                        };
                    };
                    readonly tags: {
                        readonly type: "string";
                        readonly title: "Tags (Comma-Separated)";
                    };
                    readonly licensing: {
                        readonly type: "string";
                        readonly title: "License Type";
                        readonly enum: readonly ["All Rights Reserved", "Creative Commons", "Public Domain"];
                    };
                    readonly usageRestrictions: {
                        readonly type: "array";
                        readonly title: "Usage Restrictions";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
                        };
                    };
                };
                readonly required: readonly ["contentReference", "tags", "licensing", "usageRestrictions"];
            };
        };
        readonly required: readonly ["id", "issuer", "credentialSubject", "expirationDate"];
    };
    readonly ContentLegalAccountability: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/ContentLegalAccountability";
        readonly title: "Content Legal Accountability";
        readonly type: "object";
        readonly properties: {
            readonly identifier: {
                readonly type: "string";
                readonly description: "DID of the content.";
            };
            readonly accountablePerson: {
                readonly type: "object";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "DID of the responsible entity.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the accountable entity.";
                    };
                };
            };
            readonly publisher: {
                readonly type: "object";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "DID of the publisher.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Publisher name.";
                    };
                };
            };
            readonly legalJurisdiction: {
                readonly type: "string";
                readonly description: "Defines which legal system applies to the content.";
            };
            readonly disputeResolution: {
                readonly type: "string";
                readonly description: "URL or DID for dispute resolution policies.";
            };
        };
        readonly required: readonly ["identifier", "accountablePerson", "legalJurisdiction"];
    };
    readonly ContentLicensingAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.io"];
        readonly $id: "https://schemas.originvault.box/ContentLicensingAgreement";
        readonly title: "Content Licensing Agreement";
        readonly description: "Defines licensing terms for content distributed through OriginVault.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly contentId: {
                readonly type: "string";
                readonly description: "DID of the licensed content.";
            };
            readonly creatorId: {
                readonly type: "string";
                readonly description: "DID of the content creator.";
            };
            readonly licenseeId: {
                readonly type: "string";
                readonly description: "DID of the entity purchasing the license.";
            };
            readonly agreeAction: {
                readonly type: "object";
                readonly description: "Represents the act of accepting this license.";
                readonly properties: {
                    readonly "@type": {
                        readonly type: "string";
                        readonly enum: readonly ["AgreeAction"];
                        readonly description: "Schema.org type";
                    };
                    readonly agent: {
                        readonly type: "string";
                        readonly description: "DID of the licensee accepting the agreement.";
                    };
                    readonly object: {
                        readonly type: "string";
                        readonly description: "DID of this licensing agreement.";
                    };
                    readonly participant: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "DIDs of all involved parties (creator, licensee, etc.).";
                    };
                    readonly actionStatus: {
                        readonly type: "string";
                        readonly enum: readonly ["CompletedActionStatus"];
                        readonly description: "Agreement completion status.";
                    };
                    readonly startTime: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp when the agreement was signed.";
                    };
                    readonly endTime: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Expiration timestamp of the agreement.";
                    };
                };
            };
            readonly claim: {
                readonly type: "object";
                readonly description: "Represents a claim related to the agreement (e.g., ownership, dispute).";
                readonly properties: {
                    readonly "@type": {
                        readonly type: "string";
                        readonly enum: readonly ["Claim"];
                        readonly description: "Schema.org type";
                    };
                    readonly claimReviewed: {
                        readonly type: "string";
                        readonly description: "Claim being made (e.g., 'Properly Licensed').";
                    };
                    readonly author: {
                        readonly type: "string";
                        readonly description: "DID of the entity making the claim.";
                    };
                    readonly claimInterpreter: {
                        readonly type: "string";
                        readonly description: "DID of the validating entity (e.g., OV verification node).";
                    };
                    readonly reviewAspect: {
                        readonly type: "string";
                        readonly description: "Which aspect of the license is under review (e.g., royalty terms).";
                    };
                    readonly firstAppearance: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of the first assertion of the claim.";
                    };
                    readonly appearance: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly timestamp: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Revalidation timestamp.";
                                };
                                readonly reviewStatus: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Verified", "Disputed", "Revoked"];
                                    readonly description: "Status of the claim.";
                                };
                            };
                        };
                    };
                };
            };
            readonly licenseType: {
                readonly type: "string";
                readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited", "One-Time Use"];
                readonly description: "Defines whether the license is exclusive to the licensee or shared.";
            };
            readonly permittedUses: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["Personal Use", "Commercial Use", "AI Training", "Resale", "Public Display"];
                };
                readonly description: "Defines the specific use cases allowed for the licensee.";
            };
            readonly paymentTerms: {
                readonly type: "object";
                readonly properties: {
                    readonly licenseFee: {
                        readonly type: "number";
                        readonly description: "Fixed price of the license in USD or crypto equivalent.";
                    };
                    readonly recurringFee: {
                        readonly type: "boolean";
                        readonly description: "Whether the license requires ongoing payments.";
                    };
                    readonly paymentSchedule: {
                        readonly type: "string";
                        readonly description: "Schedule for payments (e.g., one-time, monthly, annually).";
                    };
                };
            };
            readonly royaltyTerms: {
                readonly type: "object";
                readonly properties: {
                    readonly royaltyPercentage: {
                        readonly type: "number";
                        readonly description: "Percentage of revenue owed to the creator.";
                    };
                    readonly paymentSchedule: {
                        readonly type: "string";
                        readonly description: "How frequently royalties are paid.";
                    };
                };
            };
            readonly revocationPolicy: {
                readonly type: "object";
                readonly properties: {
                    readonly misuseConditions: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "Conditions under which the license is revoked.";
                    };
                    readonly nonPaymentPenalty: {
                        readonly type: "boolean";
                        readonly description: "Whether failure to pay results in automatic revocation.";
                    };
                };
            };
            readonly auditAndCompliance: {
                readonly type: "object";
                readonly properties: {
                    readonly trackingMechanism: {
                        readonly type: "string";
                        readonly enum: readonly ["DID-Linked Resource", "Verifiable Credential", "On-Chain"];
                        readonly description: "How license compliance is tracked.";
                    };
                };
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether both parties have accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "contentId", "creatorId", "licenseeId", "agreeAction", "licenseType", "permittedUses", "paymentTerms", "royaltyTerms", "revocationPolicy", "auditAndCompliance", "agreementSigned", "timestamp"];
    };
    readonly ContentLicensingTerms: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/ContentLicensingTerms";
        readonly title: "Content Licensing Terms";
        readonly description: "Defines licensing conditions and monetization models for digital content in OriginVault.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["CreativeWork", "MediaObject", "DigitalDocument", "SoftwareApplication", "License", "Agreement"];
                readonly description: "Defines the type of digital asset or contract.";
            };
            readonly identifier: {
                readonly type: "string";
                readonly description: "DID of the licensed content.";
            };
            readonly creator: {
                readonly type: "object";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "DID of the creator.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Creator name.";
                    };
                };
                readonly required: readonly ["identifier"];
            };
            readonly acquireLicensePage: {
                readonly type: "string";
                readonly description: "URL where the license can be obtained (e.g., smart contract, marketplace link).";
            };
            readonly licenseType: {
                readonly type: "string";
                readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited", "One-Time Use"];
                readonly description: "Defines if the license is shared or restricted.";
            };
            readonly licenseScope: {
                readonly type: "object";
                readonly properties: {
                    readonly geographicRestrictions: {
                        readonly type: "string";
                        readonly enum: readonly ["Global", "Region-Specific", "Country-Specific"];
                        readonly description: "Where the licensee is permitted to use the content.";
                    };
                    readonly modificationRights: {
                        readonly type: "boolean";
                        readonly description: "Whether the licensee can modify or adapt the content.";
                    };
                    readonly sublicensingAllowed: {
                        readonly type: "boolean";
                        readonly description: "Whether the licensee can sublicense the content.";
                    };
                    readonly duration: {
                        readonly type: "string";
                        readonly description: "License duration (e.g., perpetual, 1 year, until 2030).";
                    };
                };
            };
            readonly usageInfo: {
                readonly type: "string";
                readonly description: "URL linking to license terms & permitted uses.";
            };
            readonly permittedUses: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["Personal Use", "Commercial Use", "AI Training", "Resale", "Public Display"];
                };
                readonly description: "Defines permitted usage rights.";
            };
            readonly prohibitedUses: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
                };
                readonly description: "Explicitly states forbidden use cases.";
            };
            readonly monetizationModel: {
                readonly type: "object";
                readonly properties: {
                    readonly price: {
                        readonly type: "number";
                        readonly description: "Price in USD or crypto equivalent.";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["Stripe", "Crypto", "NFT"];
                    };
                    readonly recurringFee: {
                        readonly type: "boolean";
                        readonly description: "Whether ongoing payments are required.";
                    };
                    readonly paymentSchedule: {
                        readonly type: "string";
                        readonly description: "Schedule for payments (one-time, monthly, annually).";
                    };
                    readonly royaltyTerms: {
                        readonly type: "object";
                        readonly properties: {
                            readonly royaltyPercentage: {
                                readonly type: "number";
                                readonly description: "Percentage paid to the creator.";
                            };
                            readonly paymentSchedule: {
                                readonly type: "string";
                                readonly description: "Schedule for royalty payments.";
                            };
                            readonly distributionMethod: {
                                readonly type: "string";
                                readonly enum: readonly ["Stripe Connect", "Crypto Split", "Manual Payout"];
                                readonly description: "How royalties are distributed.";
                            };
                        };
                    };
                };
                readonly description: "Defines how the license is monetized.";
            };
            readonly verification: {
                readonly type: "object";
                readonly properties: {
                    readonly complianceTracking: {
                        readonly type: "string";
                        readonly enum: readonly ["DID-Linked Resource", "On-Chain Record", "Verifiable Credential"];
                        readonly description: "Method used to track compliance with licensing terms.";
                    };
                    readonly verificationAuthority: {
                        readonly type: "string";
                        readonly description: "DID of the entity responsible for verifying compliance.";
                    };
                    readonly auditFrequency: {
                        readonly type: "string";
                        readonly description: "How often compliance checks are conducted (e.g., quarterly, annually).";
                    };
                };
                readonly description: "Defines how licensing compliance is tracked and enforced.";
            };
            readonly verifiableCredential: {
                readonly type: "object";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "URI to the VC.";
                    };
                    readonly issuer: {
                        readonly type: "object";
                        readonly properties: {
                            readonly identifier: {
                                readonly type: "string";
                                readonly description: "DID of the issuer.";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Issuer name.";
                            };
                        };
                    };
                };
            };
            readonly revocationPolicy: {
                readonly type: "object";
                readonly properties: {
                    readonly misuseConditions: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "Conditions under which the license is revoked.";
                    };
                    readonly nonPaymentPenalty: {
                        readonly type: "boolean";
                        readonly description: "Whether failure to pay results in automatic revocation.";
                    };
                };
            };
            readonly disputeResolution: {
                readonly type: "object";
                readonly properties: {
                    readonly arbitrationMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["DAO Voting", "Legal Arbitration", "Multi-Sig Review"];
                        readonly description: "How disputes over the license are handled.";
                    };
                    readonly appealProcess: {
                        readonly type: "string";
                        readonly description: "How a licensee can challenge revocation or penalty.";
                    };
                };
                readonly description: "Defines mechanisms for resolving disputes related to the agreement.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether both parties have accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["identifier", "creator", "licenseType", "licenseScope", "permittedUses", "monetizationModel", "verification", "agreementSigned", "timestamp"];
    };
    readonly Creator: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/Creator";
        readonly title: "Creator";
        readonly description: "Defines a content creator in the OriginVault ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly totalPublishedContent: {
                readonly type: "number";
                readonly description: "Total number of published pieces.";
            };
            readonly licenseAgreements: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of content licensing agreements.";
                };
            };
            readonly aiUsagePolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly allowsAITraining: {
                        readonly type: "boolean";
                        readonly description: "Whether AI companies can train on this creator's content.";
                    };
                    readonly allowsAIInference: {
                        readonly type: "boolean";
                        readonly description: "Whether AI can use content for inference.";
                    };
                };
                readonly description: "Defines AI usage restrictions for the creator's content.";
            };
            readonly earningsHistory: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly transactionId: {
                            readonly type: "string";
                            readonly description: "Transaction ID for a sale.";
                        };
                        readonly amount: {
                            readonly type: "number";
                            readonly description: "Earnings from the transaction.";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Date of transaction.";
                        };
                    };
                };
                readonly description: "Tracks revenue earned by the creator.";
            };
        };
        readonly required: readonly ["totalPublishedContent", "licenseAgreements", "aiUsagePolicies"];
    };
    readonly DataChamberContributionAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/DataChamberContributorAgreement";
        readonly title: "Data Chamber Contributor Agreement";
        readonly description: "Defines the terms under which a user contributes data to a Vault Chamber for potential monetization.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Data Chamber.";
            };
            readonly userId: {
                readonly type: "string";
                readonly description: "DID of the contributor.";
            };
            readonly dataUsageTerms: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["AI Training", "Research", "Commercial Use", "Limited Redistribution"];
                    readonly description: "List of allowed uses for contributed data.";
                };
            };
            readonly optOutPolicy: {
                readonly type: "object";
                readonly properties: {
                    readonly optOutAllowed: {
                        readonly type: "boolean";
                        readonly description: "Whether users can opt out after contribution.";
                    };
                    readonly dataRetentionPeriod: {
                        readonly type: "string";
                        readonly description: "How long data is stored after opt-out.";
                    };
                };
            };
            readonly compensationModel: {
                readonly type: "object";
                readonly properties: {
                    readonly revenueShare: {
                        readonly type: "number";
                        readonly description: "Percentage of revenue given to contributors.";
                    };
                    readonly rewardMechanism: {
                        readonly type: "string";
                        readonly enum: readonly ["Fiat Payout", "Gems", "Tokens"];
                        readonly description: "How users are rewarded for their data.";
                    };
                };
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the user has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "chamberId", "userId", "dataUsageTerms", "optOutPolicy", "compensationModel", "agreementSigned", "timestamp"];
    };
    readonly DataChamberEnrollment: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/DataChamberEnrollment";
        readonly title: "Data Chamber Enrollment";
        readonly description: "Defines how users enroll in data pools within Vault Chambers and the terms of participation.";
        readonly type: "object";
        readonly properties: {
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Data Chamber.";
            };
            readonly userId: {
                readonly type: "string";
                readonly description: "DID of the user enrolling in the chamber.";
            };
            readonly contributedData: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly dataId: {
                            readonly type: "string";
                            readonly description: "DID of the data contribution.";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "When the data was added.";
                        };
                    };
                };
                readonly description: "List of data contributions by this user.";
            };
            readonly termsAccepted: {
                readonly type: "boolean";
                readonly description: "Whether the user has accepted the data-sharing terms.";
            };
            readonly rewardEligibility: {
                readonly type: "object";
                readonly properties: {
                    readonly revenueSharePercentage: {
                        readonly type: "number";
                        readonly description: "The percentage of sales the user is eligible for.";
                    };
                    readonly rewardMechanism: {
                        readonly type: "string";
                        readonly enum: readonly ["Gems", "Tokens", "Fiat Payout"];
                        readonly description: "How users are rewarded.";
                    };
                };
                readonly description: "Defines how rewards are distributed.";
            };
        };
        readonly required: readonly ["chamberId", "userId", "contributedData", "termsAccepted", "rewardEligibility"];
    };
    readonly Developer: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/Developer";
        readonly title: "Developer";
        readonly description: "Defines a developer's identity, contributions, and repositories in OriginVault.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["Person"];
                readonly description: "Schema.org type";
            };
            readonly developerId: {
                readonly type: "string";
                readonly description: "DID of the developer.";
            };
            readonly githubProfile: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "Developer's GitHub or GitLab profile.";
            };
            readonly publishedPlugins: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of plugins created by the developer.";
                };
                readonly description: "List of plugins or software developed.";
            };
            readonly signedCommits: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of cryptographically signed commits by the developer.";
            };
            readonly trustedBy: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of other developers or organizations that trust this developer.";
                };
            };
            readonly reputationScore: {
                readonly type: "number";
                readonly description: "Reputation score based on trust metrics.";
            };
            readonly certifications: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of certifications proving expertise.";
                };
            };
        };
        readonly required: readonly ["developerId", "publishedPlugins", "signedCommits"];
    };
    readonly DevelopmentEnvironmentMetadata: {
        readonly $schema: "https://json-schema.org/draft-07/schema";
        readonly $id: "https://schemas.originvault.box/DevelopmentEnvironmentMetadata.schema.json";
        readonly title: "Development Environment Metadata";
        readonly type: "object";
        readonly properties: {
            readonly environment: {
                readonly type: "string";
                readonly description: "The development environment or platform used (e.g., 'Node.js v14.17.0').";
            };
            readonly packageJson: {
                readonly $ref: "https://json.schemastore.org/package.json";
            };
            readonly buildTool: {
                readonly type: "string";
                readonly description: "The tool used for building or compiling the project (e.g., 'webpack v5.38.1').";
            };
            readonly commitHash: {
                readonly type: "string";
                readonly description: "The Git commit hash corresponding to the codebase at the time of credential issuance.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The date and time when the credential was generated.";
            };
            readonly operatingSystem: {
                readonly type: "string";
                readonly description: "A generic description of the operating system used in the development environment (e.g., 'Linux-based OS').";
            };
            readonly hostname: {
                readonly type: "string";
                readonly description: "The hashed hostname of the machine running the development environment.";
            };
            readonly ipAddress: {
                readonly type: "string";
                readonly description: "The hashed IP address of the machine running the development environment.";
            };
        };
        readonly required: readonly ["environment", "packageJson", "timestamp"];
    };
    readonly DIDAssertionCredential: {
        readonly $schema: "https://json-schema.org/draft-07/schema";
        readonly $id: "https://schemas.originvault.box/DIDAssertionCredential.schema.json";
        readonly title: "DID Assertion Credential";
        readonly version: "0.0.1";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "The unique identifier for the credential.";
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
            };
            readonly credentialSubject: {
                readonly description: "The subject of the credential.";
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The DID that this credential is asserting information about.";
                    };
                    readonly claimReviewed: {
                        readonly type: "string";
                        readonly description: "The specific claim made about this DID (e.g., 'Trusted Creator').";
                    };
                    readonly author: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "DID of the entity making this claim (same as issuer).";
                    };
                    readonly claimInterpreter: {
                        readonly type: "string";
                        readonly description: "The entity validating the claim (e.g., an OV verification node).";
                    };
                    readonly reviewAspect: {
                        readonly type: "string";
                        readonly description: "Specific characteristic being reviewed (e.g., 'Content Authenticity').";
                    };
                    readonly firstAppearance: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp when this claim was first issued.";
                    };
                    readonly appearance: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly timestamp: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Revalidation timestamp.";
                                };
                                readonly reviewStatus: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Verified", "Disputed", "Revoked"];
                                    readonly description: "Status of the claim.";
                                };
                            };
                        };
                        readonly description: "History of appearances or updates to the claim.";
                    };
                };
            };
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The context of the credential.";
            };
        };
        readonly required: readonly ["id", "type", "credentialSubject", "@context"];
    };
    readonly DIDDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/DIDDeclaration";
        readonly title: "DID Declaration";
        readonly description: "Defines the role and permissions of a DID in an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the entity declaring itself.";
            };
            readonly type: {
                readonly type: "string";
                readonly enum: readonly ["NamespaceDeclaration", "NodeClusterDeclaration", "NodeDeclaration", "VaultDeclaration", "IdentityNodeDeclaration", "StorageNodeDeclaration", "VaultOwnerDeclaration"];
                readonly description: "The type of DID declaration.";
            };
            readonly parent: {
                readonly type: "string";
                readonly description: "The DID of the parent entity (e.g., a Cluster under a Namespace, or a Node under a Cluster).";
            };
            readonly roles: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "The roles assigned to this DID (e.g., IdentityNode, StorageNode, VaultOwner).";
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly managedBy: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of DIDs that govern this entity.";
                    };
                    readonly rules: {
                        readonly type: "string";
                        readonly description: "A reference to governance policies (e.g., Ceramic document).";
                    };
                };
                readonly description: "Governance settings for this DID.";
            };
        };
        readonly required: readonly ["id", "type"];
    };
    readonly DigitalDocument: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/DigitalDocument";
        readonly title: "Digital Document";
        readonly description: "Verifiable digital document metadata for OriginVault content.";
        readonly type: "object";
        readonly properties: {
            readonly identifier: {
                readonly type: "string";
                readonly description: "DID of the content.";
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Name or title of the document.";
            };
            readonly author: {
                readonly type: "string";
                readonly description: "DID of the creator or owner.";
            };
            readonly encodingFormat: {
                readonly type: "string";
                readonly description: "MIME type of the file (e.g., image/png, video/mp4).";
            };
            readonly publisher: {
                readonly type: "string";
                readonly description: "DID of the publisher.";
            };
            readonly publication: {
                readonly type: "string";
                readonly description: "Verifiable Credential URI of the publication.";
            };
            readonly contentSize: {
                readonly type: "number";
                readonly description: "Size of the document in bytes.";
            };
            readonly isBasedOn: {
                readonly type: "string";
                readonly description: "DID of the source if derived from another work.";
            };
            readonly dateCreated: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp when the document was created.";
            };
            readonly dateModified: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of the last modification.";
            };
            readonly license: {
                readonly type: "string";
                readonly description: "DID reference to the licensing agreement.";
            };
            readonly acquireLicensePage: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "URL where licenses can be purchased.";
            };
            readonly usageRestrictions: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
                };
                readonly description: "Usage restrictions for the document.";
            };
            readonly C2PAManifest: {
                readonly type: "object";
                readonly description: "C2PA content authenticity proof.";
                readonly properties: {
                    readonly identifier: {
                        readonly type: "string";
                        readonly description: "Verifiable Credential URI of the C2PA manifest.";
                    };
                    readonly contentSigner: {
                        readonly type: "string";
                        readonly description: "DID of the signing entity.";
                    };
                    readonly signatureValue: {
                        readonly type: "string";
                        readonly description: "Cryptographic signature of the content.";
                    };
                };
            };
            readonly thumbnailUrl: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "URL to a thumbnail preview of the document.";
            };
            readonly associatedMedia: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly description: "Media files linked to this document (e.g., video sources, image formats).";
            };
            readonly sameAs: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly description: "External references (e.g., OpenSea, IPFS, Arweave).";
            };
        };
        readonly required: readonly ["identifier", "name", "author", "encodingFormat", "contentSize", "dateCreated", "license"];
    };
    readonly EndorsementRecord: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/EndorsementRecord";
        readonly title: "Endorsement Record";
        readonly description: "Represents an endorsement given by one DID to another, contributing to trust scoring.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "Unique identifier for the endorsement record";
            };
            readonly endorserDid: {
                readonly type: "string";
                readonly description: "DID of the user giving the endorsement";
                readonly pattern: "^did:";
            };
            readonly endorsedDid: {
                readonly type: "string";
                readonly description: "DID of the user receiving the endorsement";
                readonly pattern: "^did:";
            };
            readonly credentialType: {
                readonly type: "string";
                readonly description: "Type of credential being endorsed";
            };
            readonly weight: {
                readonly type: "number";
                readonly minimum: 0;
                readonly maximum: 10;
                readonly description: "Weight/strength of the endorsement (0-10)";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the endorsement was given";
            };
            readonly endorsementReason: {
                readonly type: "string";
                readonly description: "Reason for the endorsement";
            };
            readonly endorsementType: {
                readonly type: "string";
                readonly enum: readonly ["verification", "governance", "community", "development", "trust"];
                readonly description: "Category of the endorsement";
            };
            readonly linkedGem: {
                readonly type: "string";
                readonly description: "Gem that qualifies the endorser to give this endorsement";
            };
            readonly linkedCredential: {
                readonly type: "string";
                readonly description: "DID-Linked Resource to a Verifiable Credential supporting the endorsement";
            };
            readonly blockchainSync: {
                readonly type: "object";
                readonly properties: {
                    readonly lastSynced: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Last time endorsement was synced with blockchain";
                    };
                    readonly pendingChanges: {
                        readonly type: "boolean";
                        readonly description: "Whether there are local changes not yet pushed to blockchain";
                    };
                    readonly blockchainResourceId: {
                        readonly type: "string";
                        readonly description: "Resource ID on blockchain for this endorsement";
                    };
                };
                readonly description: "Blockchain synchronization status";
            };
            readonly metadata: {
                readonly type: "object";
                readonly description: "Additional metadata for the endorsement";
            };
        };
        readonly required: readonly ["id", "endorserDid", "endorsedDid", "credentialType", "weight", "timestamp"];
    };
    readonly ExternalBuyerAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ExternalDataBuyerAgreement";
        readonly title: "External Data Buyer Agreement";
        readonly description: "Defines the terms under which an external stakeholder purchases access to a Vault Chamber’s data.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Data Chamber being accessed.";
            };
            readonly buyerId: {
                readonly type: "string";
                readonly description: "DID of the external entity purchasing access.";
            };
            readonly accessTerms: {
                readonly type: "object";
                readonly properties: {
                    readonly price: {
                        readonly type: "number";
                        readonly description: "Price paid for access.";
                    };
                    readonly licenseDuration: {
                        readonly type: "string";
                        readonly description: "How long the data is accessible.";
                    };
                    readonly usageRestrictions: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["No AI Training", "No Redistribution", "Limited Commercial Use"];
                            readonly description: "Restrictions on how the data can be used.";
                        };
                    };
                    readonly revocationPolicy: {
                        readonly type: "string";
                        readonly description: "Conditions under which access may be revoked.";
                    };
                };
            };
            readonly paymentProof: {
                readonly type: "string";
                readonly description: "Verifiable Credential proving payment.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the buyer has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "chamberId", "buyerId", "accessTerms", "paymentProof", "agreementSigned", "timestamp"];
    };
    readonly ExternalDataAccess: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ExternalDataAccess";
        readonly title: "External Data Access";
        readonly description: "Defines how external stakeholders can purchase access to data in Vault Chambers.";
        readonly type: "object";
        readonly properties: {
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Data Chamber.";
            };
            readonly buyer: {
                readonly type: "string";
                readonly description: "DID of the external entity purchasing access.";
            };
            readonly accessTerms: {
                readonly type: "object";
                readonly properties: {
                    readonly price: {
                        readonly type: "number";
                        readonly description: "Price of access.";
                    };
                    readonly licenseDuration: {
                        readonly type: "string";
                        readonly description: "How long the data is accessible.";
                    };
                    readonly usageRestrictions: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["No AI Training", "No Redistribution", "Limited Commercial Use"];
                        };
                        readonly description: "Restrictions on how the data can be used.";
                    };
                };
                readonly description: "Defines access pricing and restrictions.";
            };
            readonly paymentProof: {
                readonly type: "string";
                readonly description: "Verifiable Credential proving payment.";
            };
        };
        readonly required: readonly ["chamberId", "buyer", "accessTerms", "paymentProof"];
    };
    readonly GemDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GemDeclaration";
        readonly title: "Gem Declaration";
        readonly description: "Defines an OriginVault Gem awarded to users for contributions.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The unique DID of the Gem.";
            };
            readonly type: {
                readonly type: "string";
                readonly enum: readonly ["Founder's Gem", "Verifier's Gem", "Marker's Gem", "Advocate's Gem", "Builder's Gem", "Curator's Gem", "Trailblazer's Gem", "Luminary's Gem"];
                readonly description: "The category of the gem.";
            };
            readonly recipient: {
                readonly type: "string";
                readonly description: "DID of the user receiving the Gem.";
            };
            readonly issuer: {
                readonly type: "string";
                readonly description: "DID of the entity awarding the Gem.";
            };
            readonly dateIssued: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Date the Gem was issued.";
            };
            readonly metadata: {
                readonly type: "object";
                readonly description: "Additional metadata related to the Gem.";
                readonly properties: {
                    readonly video: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "URL to the Gem's animated artwork.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "Description of why the Gem was awarded.";
                    };
                };
            };
            readonly verifiableCredential: {
                readonly type: "string";
                readonly description: "DID-Linked Resource (DLR) to the Verifiable Credential proving eligibility for the Gem.";
            };
            readonly revocationStatus: {
                readonly type: "string";
                readonly enum: readonly ["valid", "revoked"];
                readonly description: "Whether the Gem is still recognized as valid.";
            };
        };
        readonly required: readonly ["id", "type", "recipient", "issuer", "dateIssued", "metadata", "verifiableCredential", "revocationStatus"];
    };
    readonly GemIssuanceRecord: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GemIssuance";
        readonly title: "Gem Issuance Record";
        readonly description: "Tracks the issuance of a Gem, including verification of eligibility.";
        readonly type: "object";
        readonly properties: {
            readonly gemId: {
                readonly type: "string";
                readonly description: "DID of the issued Gem.";
            };
            readonly issuer: {
                readonly type: "string";
                readonly description: "DID of the entity awarding the Gem.";
            };
            readonly recipient: {
                readonly type: "string";
                readonly description: "DID of the recipient of the Gem.";
            };
            readonly justification: {
                readonly type: "string";
                readonly description: "Why the Gem was awarded.";
            };
            readonly supportingEvidence: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly description: "Links to content proving the recipient earned the Gem.";
            };
            readonly dateIssued: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Date the Gem was issued.";
            };
            readonly verifiableCredential: {
                readonly type: "string";
                readonly description: "DID-Linked Resource (DLR) containing the VC proving eligibility.";
            };
        };
        readonly required: readonly ["gemId", "issuer", "recipient", "justification", "supportingEvidence", "dateIssued", "verifiableCredential"];
    };
    readonly GemReputationScore: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GemReputation";
        readonly title: "Gem Reputation Score";
        readonly description: "Defines how a recipient's reputation is influenced by their Gems.";
        readonly type: "object";
        readonly properties: {
            readonly recipient: {
                readonly type: "string";
                readonly description: "DID of the user holding the Gem.";
            };
            readonly gemType: {
                readonly type: "string";
                readonly description: "The category of the Gem.";
            };
            readonly reputationScore: {
                readonly type: "number";
                readonly minimum: 0;
                readonly description: "Numerical reputation score associated with the Gem.";
            };
            readonly scoreLastUpdated: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Date when the reputation score was last updated.";
            };
            readonly linkedCredentials: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of associated Verifiable Credentials that contribute to this reputation score.";
            };
        };
        readonly required: readonly ["recipient", "gemType", "reputationScore", "scoreLastUpdated", "linkedCredentials"];
    };
    readonly GemRevocationRecord: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GemRevocation";
        readonly title: "Gem Revocation Record";
        readonly description: "Defines how a previously awarded Gem can be revoked if necessary.";
        readonly type: "object";
        readonly properties: {
            readonly gemId: {
                readonly type: "string";
                readonly description: "DID of the revoked Gem.";
            };
            readonly issuer: {
                readonly type: "string";
                readonly description: "DID of the entity revoking the Gem.";
            };
            readonly revocationReason: {
                readonly type: "string";
                readonly description: "The reason for revocation.";
            };
            readonly revokedOn: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Date the Gem was revoked.";
            };
            readonly verifiableCredentialRevoked: {
                readonly type: "string";
                readonly description: "DID-Linked Resource (DLR) referencing the revoked Verifiable Credential.";
            };
        };
        readonly required: readonly ["gemId", "issuer", "revocationReason", "revokedOn", "verifiableCredentialRevoked"];
    };
    readonly GemTrustRegistry: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GemTrustRegistry";
        readonly title: "Gem Trust Registry";
        readonly description: "Tracks trust and reputation levels based on earned Gems.";
        readonly type: "object";
        readonly properties: {
            readonly holder: {
                readonly type: "string";
                readonly description: "DID of the Gem holder.";
            };
            readonly gemTypes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of Gems that the user holds.";
            };
            readonly trustScore: {
                readonly type: "object";
                readonly properties: {
                    readonly verificationScore: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score based on verification actions.";
                    };
                    readonly governanceScore: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score based on governance participation.";
                    };
                    readonly contributionScore: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score based on active contributions.";
                    };
                    readonly communityScore: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score based on social/community engagement.";
                    };
                };
                readonly description: "Trust score based on various aspects of participation.";
            };
            readonly linkedCredentials: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "Verifiable Credentials contributing to this reputation.";
            };
            readonly lastUpdated: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Last update timestamp.";
            };
        };
        readonly required: readonly ["holder", "gemTypes", "trustScore", "linkedCredentials", "lastUpdated"];
    };
    readonly GlobalPrivacyControl: {
        readonly $schema: "http://json-schema.org/draft-04/schema#";
        readonly $comment: "https://globalprivacycontrol.github.io/gpc-spec/";
        readonly description: "Configuration for GPC, so a site can convey its support for the Global Privacy Control.";
        readonly id: "https://json.schemastore.org/gpc.json";
        readonly properties: {
            readonly gpc: {
                readonly title: "Global Privacy Control";
                readonly description: "Indicates that the server intends to abide by GPC requests.";
                readonly type: "boolean";
            };
            readonly version: {
                readonly title: "Version";
                readonly type: "integer";
                readonly default: 1;
            };
            readonly lastUpdate: {
                readonly title: "Last Update";
                readonly description: "This indicates the time at which the statement of support was made, such that later changes to the meaning of the GPC standard should not affect the interpretation of the resource for legal purposes. If the member is not in a valid ISO 8601 format, the last update date and time is unknown.";
                readonly type: "string";
            };
        };
        readonly required: readonly ["gpc"];
        readonly title: "Global Privacy Control";
        readonly type: "object";
    };
    readonly GovernanceProposal: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/GovernanceProposal";
        readonly title: "Governance Proposal Schema";
        readonly description: "Defines a governance proposal for namespaces and clusters.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the proposal.";
            };
            readonly proposer: {
                readonly type: "string";
                readonly description: "DID of the entity submitting the proposal.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "DID of the namespace affected (if applicable).";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "DID of the cluster affected (if applicable).";
            };
            readonly proposalType: {
                readonly type: "string";
                readonly enum: readonly ["AddNode", "RemoveNode", "UpdateGovernance", "MonetizationPolicyChange"];
                readonly description: "Type of governance action requested.";
            };
            readonly details: {
                readonly type: "string";
                readonly description: "A description of the proposal, including motivations and expected impact.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "References to supporting documents or governance rules.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["Pending", "Active", "Accepted", "Rejected", "Executed"];
                readonly description: "Current status of the proposal.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of proposal submission.";
            };
        };
        readonly required: readonly ["id", "proposer", "proposalType", "details", "status", "timestamp"];
    };
    readonly IdentityClaimsAggregationCredential: {
        readonly $schema: "https://json-schema.org/draft-07/schema";
        readonly $id: "https://cawg.io/schemas/v1/creator-identity-assertion.json";
        readonly title: "IdentityClaimsAggregationCredential";
        readonly description: "Creator Identity Assertion Credential Schema for usage in JsonSchema";
        readonly type: "object";
        readonly properties: {
            readonly type: {
                readonly type: "array";
                readonly minItems: 2;
                readonly items: {
                    readonly type: "string";
                };
                readonly allOf: readonly [{
                    readonly contains: {
                        readonly const: "VerifiableCredential";
                    };
                }, {
                    readonly contains: {
                        readonly const: "IdentityClaimsAggregationCredential";
                    };
                }];
            };
            readonly issuer: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/$defs/nonEmptyUri";
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly $ref: "#/$defs/nonEmptyUri";
                        };
                        readonly name: {
                            readonly $ref: "#/$defs/nonEmptyString";
                        };
                    };
                    readonly required: readonly ["id"];
                }];
            };
            readonly validFrom: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly expiresAt: {
                readonly type: "string";
                readonly format: "date-time";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly $ref: "#/$defs/nonEmptyUri";
                    };
                    readonly verifiedIdentities: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly $ref: "#/$defs/verifiedIdentity";
                        };
                    };
                    readonly c2paAsset: {
                        readonly type: "object";
                        readonly minProperties: 1;
                        readonly properties: {
                            readonly referenced_assertions: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly url: {
                                            readonly $ref: "#/$defs/nonEmptyString";
                                        };
                                        readonly hash: {
                                            readonly $ref: "#/$defs/nonEmptyString";
                                        };
                                        readonly alg: {
                                            readonly $ref: "#/$defs/nonEmptyString";
                                        };
                                    };
                                    readonly required: readonly ["hash"];
                                };
                            };
                            readonly sig_type: {
                                readonly type: "string";
                            };
                            readonly role: {
                                readonly type: "string";
                                readonly enum: readonly ["cawg.creator", "cawg.contributor", "cawg.editor", "cawg.producer", "cawg.producer", "cawg.publisher", "cawg.sponsor", "cawg.translator"];
                            };
                            readonly expected_partial_claim: {
                                readonly type: "string";
                            };
                            readonly expected_claim_generator: {
                                readonly type: "string";
                            };
                            readonly expected_countersigners: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["referenced_assertions", "sig_type"];
                    };
                };
                readonly required: readonly ["id", "verifiedIdentities", "c2paAsset"];
            };
        };
        readonly required: readonly ["type", "issuer", "validFrom", "credentialSubject"];
        readonly $defs: {
            readonly nonEmptyString: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "A non-empty string";
            };
            readonly nonEmptyUri: {
                readonly type: "string";
                readonly minLength: 1;
                readonly format: "uri";
                readonly description: "A non-empty URI string";
            };
            readonly identifiableObject: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly $ref: "#/$defs/nonEmptyUri";
                        readonly description: "The unique identifier URI";
                    };
                    readonly name: {
                        readonly $ref: "#/$defs/nonEmptyString";
                        readonly description: "The name of the object";
                    };
                };
                readonly required: readonly ["id", "name"];
                readonly description: "An object with an identifiable URI and name";
            };
            readonly verifiedIdentity: {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly $ref: "#/$defs/nonEmptyString";
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly uri: {
                        readonly $ref: "#/$defs/nonEmptyUri";
                    };
                    readonly provider: {
                        readonly $ref: "#/$defs/identifiableObject";
                    };
                    readonly verifiedAt: {
                        readonly $ref: "#/$defs/nonEmptyString";
                        readonly format: "date-time";
                    };
                    readonly name: {
                        readonly $ref: "#/$defs/nonEmptyString";
                    };
                    readonly method: {
                        readonly $ref: "#/$defs/nonEmptyString";
                    };
                    readonly address: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                };
                readonly required: readonly ["type", "verifiedAt"];
                readonly oneOf: readonly [{
                    readonly properties: {
                        readonly type: {
                            readonly const: "cawg.social_media";
                        };
                    };
                    readonly required: readonly ["username", "uri", "provider", "verifiedAt"];
                }, {
                    readonly properties: {
                        readonly type: {
                            readonly const: "cawg.crypto_wallet";
                        };
                    };
                    readonly required: readonly ["address", "provider", "verifiedAt"];
                }, {
                    readonly properties: {
                        readonly type: {
                            readonly const: "cawg.document_verification";
                        };
                    };
                    readonly required: readonly ["name", "provider", "verifiedAt"];
                }, {
                    readonly properties: {
                        readonly type: {
                            readonly const: "cawg.affiliation";
                        };
                    };
                    readonly required: readonly ["provider", "verifiedAt"];
                }, {
                    readonly properties: {
                        readonly type: {
                            readonly const: "cawg.web_site";
                        };
                    };
                    readonly required: readonly ["uri", "verifiedAt"];
                }];
            };
        };
    };
    readonly IdentityNodeDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/IdentityNodeDeclaration";
        readonly title: "Identity Node Declaration";
        readonly description: "Defines an Identity Node in an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the Identity Node.";
            };
            readonly type: {
                readonly const: "IdentityNode";
                readonly description: "Node type.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster this node belongs to.";
            };
            readonly operator: {
                readonly type: "string";
                readonly description: "DID of the entity operating this node.";
            };
            readonly services: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of services managed by this Identity Node (e.g., DID Resolution, Verification).";
            };
            readonly verificationPolicies: {
                readonly type: "string";
                readonly description: "Reference to identity verification policies.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., GovernancePolicy, VerificationLog).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "References to identity verification policies.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "suspended", "revoked"];
                readonly description: "Operational status of the node.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of node declaration.";
            };
        };
        readonly required: readonly ["id", "cluster", "operator", "services", "status", "timestamp"];
    };
    readonly LanguageConfiguration: {
        readonly $schema: "http://json-schema.org/draft-07/schema#";
        readonly $id: "https://json.schemastore.org/language-configuration.json";
        readonly additionalProperties: true;
        readonly definitions: {
            readonly regexp: {
                readonly type: "object";
                readonly properties: {
                    readonly pattern: {
                        readonly type: "string";
                    };
                    readonly flags: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["pattern"];
            };
            readonly charPair: {
                readonly type: "array";
                readonly items: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "string";
                }];
                readonly minItems: 2;
                readonly additionalItems: false;
            };
        };
        readonly properties: {
            readonly comments: {
                readonly description: "The language's comment settings.";
                readonly type: "object";
                readonly properties: {
                    readonly lineComment: {
                        readonly description: "The line comment token, like `// this is a comment`.";
                        readonly type: "string";
                    };
                    readonly blockComment: {
                        readonly $ref: "#/definitions/charPair";
                        readonly description: "The block comment character pair, like `/* block comment *&#47;`";
                    };
                };
            };
            readonly brackets: {
                readonly description: "The language's brackets.";
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/definitions/charPair";
                };
            };
            readonly autoClosingPairs: {
                readonly description: "The language's auto closing pairs. The 'close' character is automatically inserted with the 'open' character is typed.";
                readonly type: "array";
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly $ref: "#/definitions/charPair";
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly open: {
                                readonly type: "string";
                            };
                            readonly close: {
                                readonly type: "string";
                            };
                            readonly notIn: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly required: readonly ["open", "close"];
                    }];
                };
            };
            readonly autoCloseBefore: {
                readonly description: "What characters must be after the cursor for bracket or quote autoclosing to occur.";
                readonly type: "string";
            };
            readonly surroundingPairs: {
                readonly description: "The language's surrounding pairs. When the 'open' character is typed on a selection, the selected string is surrounded by the open and close characters.";
                readonly type: "array";
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly $ref: "#/definitions/charPair";
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly open: {
                                readonly type: "string";
                            };
                            readonly close: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["open", "close"];
                    }];
                };
            };
            readonly folding: {
                readonly description: "The language's folding rules.";
                readonly type: "object";
                readonly properties: {
                    readonly markers: {
                        readonly description: "Region markers used by the language.";
                        readonly type: "object";
                        readonly properties: {
                            readonly start: {
                                readonly anyOf: readonly [{
                                    readonly type: "string";
                                }, {
                                    readonly $ref: "#/definitions/regexp";
                                }];
                            };
                            readonly end: {
                                readonly anyOf: readonly [{
                                    readonly type: "string";
                                }, {
                                    readonly $ref: "#/definitions/regexp";
                                }];
                            };
                        };
                    };
                };
            };
            readonly wordPattern: {
                readonly description: "The language's word definition.";
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly $ref: "#/definitions/regexp";
                }];
            };
            readonly indentationRules: {
                readonly description: "The language's indentation settings.";
                readonly type: "object";
                readonly properties: {
                    readonly decreaseIndentPattern: {
                        readonly description: "If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).";
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly increaseIndentPattern: {
                        readonly description: "If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).";
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly indentNextLinePattern: {
                        readonly description: "If a line matches this pattern, then only the next line after it should be indented once.";
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly unIndentedLinePattern: {
                        readonly description: "If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.";
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                };
                readonly required: readonly ["decreaseIndentPattern", "increaseIndentPattern"];
            };
            readonly onEnterRules: {
                readonly description: "The language's rules to be evaluated when pressing Enter.";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly beforeText: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                            }, {
                                readonly $ref: "#/definitions/regexp";
                            }];
                        };
                        readonly afterText: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                            }, {
                                readonly $ref: "#/definitions/regexp";
                            }];
                        };
                        readonly previousLineText: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                            }, {
                                readonly $ref: "#/definitions/regexp";
                            }];
                        };
                        readonly action: {
                            readonly type: "object";
                            readonly properties: {
                                readonly indent: {
                                    readonly type: "string";
                                    readonly enum: readonly ["none", "indent", "indentOutdent", "outdent"];
                                };
                                readonly appendText: {
                                    readonly type: "string";
                                };
                                readonly removeText: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                };
                            };
                            readonly required: readonly ["indent"];
                        };
                    };
                    readonly required: readonly ["beforeText", "action"];
                };
            };
        };
        readonly type: "object";
        readonly title: "Language configuration";
        readonly description: "Configuration file for language features in VS Code and Visual Studio.";
    };
    readonly NamespaceDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceDeclaration";
        readonly title: "Namespace Declaration";
        readonly description: "Defines a namespace as a root authority that can establish trust chains and governance rules for its domain.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the namespace acting as a root authority.";
            };
            readonly type: {
                readonly const: "NamespaceDeclaration";
                readonly description: "Indicates this is a Namespace DID declaration.";
            };
            readonly namespaceScope: {
                readonly type: "string";
                readonly description: "The domain or scope of this namespace";
                readonly examples: readonly ["originvault.box", "content-authenticity.org", "academic-credentials.edu", "supply-chain.industry"];
            };
            readonly rootAuthority: {
                readonly type: "object";
                readonly properties: {
                    readonly rootType: {
                        readonly type: "string";
                        readonly const: "namespace";
                        readonly description: "This namespace acts as a root authority";
                    };
                    readonly trustChainPurpose: {
                        readonly type: "string";
                        readonly description: "Primary purpose of trust chains in this namespace";
                        readonly examples: readonly ["Content authenticity and provenance", "User reputation and verification", "Academic credential verification", "Supply chain transparency"];
                    };
                    readonly delegationPolicy: {
                        readonly type: "object";
                        readonly properties: {
                            readonly allowsTrustedIssuers: {
                                readonly type: "boolean";
                                readonly description: "Whether this namespace delegates to trusted issuers";
                            };
                            readonly requiresAccreditation: {
                                readonly type: "boolean";
                                readonly description: "Whether issuers must be accredited by this namespace";
                            };
                            readonly maxDelegationDepth: {
                                readonly type: "integer";
                                readonly minimum: 1;
                                readonly description: "Maximum depth of delegation chains";
                            };
                        };
                    };
                };
                readonly required: readonly ["rootType", "trustChainPurpose"];
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly governanceModel: {
                        readonly type: "string";
                        readonly enum: readonly ["self-governed", "dao", "multisig", "committee", "democratic", "consortium"];
                        readonly description: "How this namespace makes governance decisions";
                    };
                    readonly governingParties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "DIDs of entities involved in namespace governance";
                    };
                    readonly policyFramework: {
                        readonly type: "string";
                        readonly description: "Reference to namespace governance policies and procedures";
                    };
                };
                readonly required: readonly ["governanceModel"];
            };
            readonly interoperability: {
                readonly type: "object";
                readonly properties: {
                    readonly recognizedNamespaces: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "DIDs of other namespaces this namespace recognizes or federates with";
                    };
                    readonly crossNamespaceValidation: {
                        readonly type: "boolean";
                        readonly description: "Whether credentials from other namespaces are accepted";
                    };
                    readonly federationMember: {
                        readonly type: "string";
                        readonly description: "Namespace federation or consortium membership (optional)";
                    };
                };
            };
            readonly termsOfUse: {
                readonly type: "object";
                readonly properties: {
                    readonly trustFramework: {
                        readonly type: "string";
                        readonly description: "The trust framework for the namespace.";
                    };
                    readonly trustFrameworkId: {
                        readonly type: "string";
                        readonly description: "The ID of the trust framework for the namespace.";
                    };
                    readonly trustFrameworkVersion: {
                        readonly type: "string";
                        readonly description: "The version of the trust framework for the namespace.";
                    };
                    readonly trustFrameworkUrl: {
                        readonly type: "string";
                        readonly description: "The URL of the trust framework for the namespace.";
                    };
                    readonly trustFrameworkTerms: {
                        readonly type: "string";
                        readonly description: "The terms of use for the namespace.";
                    };
                };
                readonly required: readonly ["trustFramework", "trustFrameworkId", "trustFrameworkVersion", "trustFrameworkUrl", "trustFrameworkTerms"];
            };
            readonly blockchainAnchoring: {
                readonly type: "object";
                readonly properties: {
                    readonly blockchainNetwork: {
                        readonly type: "string";
                        readonly examples: readonly ["cheqd-mainnet", "ethereum", "polygon"];
                        readonly description: "Blockchain network where this namespace is anchored";
                    };
                    readonly resourceId: {
                        readonly type: "string";
                        readonly description: "Blockchain resource ID for this namespace";
                    };
                };
            };
        };
        readonly required: readonly ["id", "namespaceScope", "rootAuthority", "governance", "termsOfUse"];
    };
    readonly NamespaceGovernance: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceGovernance";
        readonly title: "Namespace Governance";
        readonly description: "Defines governance rules for an OV Namespace.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the namespace governance document.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "The DID of the namespace this governance applies to.";
            };
            readonly governanceModel: {
                readonly type: "string";
                readonly enum: readonly ["AdminControlled", "TokenVoting", "MultiSig"];
                readonly description: "The governance model used to manage this namespace.";
            };
            readonly governanceBodies: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "DID of a governance body (e.g., DAO, committee, council).";
                        };
                        readonly role: {
                            readonly type: "string";
                            readonly description: "The role of this body (e.g., Validator, Arbiter).";
                        };
                    };
                };
                readonly description: "List of governing entities managing this namespace.";
            };
            readonly decisionMaking: {
                readonly type: "object";
                readonly properties: {
                    readonly votingThreshold: {
                        readonly type: "number";
                        readonly description: "Percentage required for approval in voting-based governance.";
                    };
                    readonly proposalProcess: {
                        readonly type: "string";
                        readonly description: "Reference to a Ceramic document explaining the proposal submission process.";
                    };
                };
                readonly description: "Rules for decision-making in the namespace.";
            };
            readonly disputeResolution: {
                readonly type: "object";
                readonly properties: {
                    readonly resolutionMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["Arbitration", "GovernanceVote", "SmartContract"];
                        readonly description: "Method used to resolve disputes.";
                    };
                    readonly resolutionService: {
                        readonly type: "string";
                        readonly description: "The DID of a dispute resolution service or contract.";
                    };
                };
                readonly description: "How governance disputes are resolved.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this governance document was issued.";
            };
        };
        readonly required: readonly ["id", "namespace", "governanceModel", "governanceBodies", "timestamp"];
    };
    readonly NamespaceParticipationAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceParticipationAgreement";
        readonly title: "Namespace Participation Agreement";
        readonly description: "Defines the terms for joining a namespace in the OV ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly namespaceId: {
                readonly type: "string";
                readonly description: "DID of the namespace being joined.";
            };
            readonly participantId: {
                readonly type: "string";
                readonly description: "DID of the participant (Vault, Node, or Cluster).";
            };
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["Vault", "Node", "Cluster"];
                readonly description: "The role of the participant within the namespace.";
            };
            readonly complianceRequirements: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of governance and verification requirements for participation.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions under which a participant can be removed from the namespace.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the participant has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "namespaceId", "participantId", "role", "complianceRequirements", "revocationPolicy", "agreementSigned", "timestamp"];
    };
    readonly NamespacePluginDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespacePluginDeclaration";
        readonly title: "Namespace Plugin Declaration";
        readonly description: "Declares a plugin registered under a namespace.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the namespace plugin.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "The DID of the namespace that owns this plugin.";
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Name of the plugin.";
            };
            readonly version: {
                readonly type: "string";
                readonly description: "Semantic versioning (e.g., 1.0.0).";
            };
            readonly author: {
                readonly type: "string";
                readonly description: "DID of the entity or user who created the plugin.";
            };
            readonly compatibleNodes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
                readonly description: "The node types this plugin is designed to run on.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the linked resource.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., governance, metadata, event log).";
                        };
                    };
                    readonly required: readonly ["id", "type"];
                };
                readonly description: "References to plugin documentation, code, or policies.";
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly approvedBy: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of governance bodies or validators that approved the plugin.";
                    };
                    readonly complianceRules: {
                        readonly type: "string";
                        readonly description: "Reference to compliance policies stored in Ceramic.";
                    };
                };
                readonly description: "Governance and compliance information for the plugin.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "deprecated", "revoked"];
                readonly description: "Current status of the plugin.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this plugin declaration was issued.";
            };
        };
        readonly required: readonly ["id", "namespace", "name", "version", "author", "compatibleNodes", "status", "timestamp"];
    };
    readonly NamespaceProposal: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceProposal";
        readonly title: "Namespace Proposal";
        readonly description: "Defines a proposal for governance, updates, or policy changes in an OV namespace.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "DID of the proposal.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "DID of the namespace where the proposal is made.";
            };
            readonly proposer: {
                readonly type: "string";
                readonly description: "DID of the entity making the proposal.";
            };
            readonly proposalType: {
                readonly type: "string";
                readonly enum: readonly ["governance-change", "policy-update", "feature-addition", "plugin-approval", "other"];
                readonly description: "Type of proposal.";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Detailed explanation of the proposal.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["pending", "approved", "rejected", "executed"];
                readonly description: "Current status of the proposal.";
            };
            readonly votes: {
                readonly type: "object";
                readonly properties: {
                    readonly yes: {
                        readonly type: "number";
                        readonly description: "Number of votes in favor.";
                    };
                    readonly no: {
                        readonly type: "number";
                        readonly description: "Number of votes against.";
                    };
                    readonly abstain: {
                        readonly type: "number";
                        readonly description: "Number of abstentions.";
                    };
                };
                readonly description: "Voting results for the proposal.";
            };
            readonly createdAt: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp when the proposal was created.";
            };
            readonly expiresAt: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Expiration date for voting on the proposal.";
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof for the proposal.";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly description: "Proof type (e.g., EdDSA Signature, zk-SNARK Proof).";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of proof creation.";
                    };
                    readonly verificationMethod: {
                        readonly type: "string";
                        readonly description: "DID or method used to verify this proof.";
                    };
                    readonly signatureValue: {
                        readonly type: "string";
                        readonly description: "Base64 or hex-encoded signature.";
                    };
                };
            };
        };
        readonly required: readonly ["id", "namespace", "proposer", "proposalType", "description", "status", "votes", "createdAt", "expiresAt", "proof"];
    };
    readonly NamespaceRecognitionCertificate: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceRecognitionCertificate";
        readonly title: "Namespace Recognition Certificate";
        readonly description: "A verifiable certificate that recognizes an entity’s role or contribution within a namespace.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "DID of the Recognition Certificate.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "DID of the namespace issuing the certificate.";
            };
            readonly recipient: {
                readonly type: "string";
                readonly description: "DID of the recognized entity.";
            };
            readonly recognitionType: {
                readonly type: "string";
                readonly enum: readonly ["trusted-verifier", "major-contributor", "governance-member", "partner"];
                readonly description: "Type of recognition granted.";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Additional details on why this recognition was granted.";
            };
            readonly validUntil: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Optional expiration date of the recognition certificate.";
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof for the certificate.";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly description: "Proof type.";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of proof creation.";
                    };
                    readonly verificationMethod: {
                        readonly type: "string";
                        readonly description: "DID or method used to verify this proof.";
                    };
                    readonly signatureValue: {
                        readonly type: "string";
                        readonly description: "Base64 or hex-encoded signature.";
                    };
                };
            };
        };
        readonly required: readonly ["id", "namespace", "recipient", "recognitionType", "proof"];
    };
    readonly NamespaceReputationRecord: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NamespaceReputationRecord";
        readonly title: "Namespace Reputation Record";
        readonly description: "Verifiable record of an entity's reputation within a namespace, including trust scores and endorsements.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "DID of the Reputation Record.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "DID of the namespace issuing the reputation record.";
            };
            readonly entity: {
                readonly type: "string";
                readonly description: "DID of the entity whose reputation is being recorded.";
            };
            readonly trustScore: {
                readonly type: "number";
                readonly minimum: 0;
                readonly maximum: 100;
                readonly description: "Numerical representation of the entity’s reputation within the namespace.";
            };
            readonly contributions: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Nature of contribution (e.g., governance vote, data contribution, content verification).";
                        };
                        readonly date: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Date of contribution.";
                        };
                        readonly verifiedBy: {
                            readonly type: "string";
                            readonly description: "DID of entity that verified this contribution.";
                        };
                    };
                    readonly required: readonly ["type", "date", "verifiedBy"];
                };
                readonly description: "List of contributions made by the entity.";
            };
            readonly endorsements: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly from: {
                            readonly type: "string";
                            readonly description: "DID of the entity giving the endorsement.";
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Optional endorsement message.";
                        };
                        readonly date: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Date of endorsement.";
                        };
                    };
                    readonly required: readonly ["from", "date"];
                };
                readonly description: "Endorsements received from other trusted entities.";
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof for this reputation record.";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly description: "Proof type (e.g., JSON-LD Signature, EdDSA Signature, zk-SNARK Proof).";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of proof creation.";
                    };
                    readonly verificationMethod: {
                        readonly type: "string";
                        readonly description: "DID or method used to verify this proof.";
                    };
                    readonly signatureValue: {
                        readonly type: "string";
                        readonly description: "Base64 or hex-encoded signature.";
                    };
                };
                readonly required: readonly ["type", "created", "verificationMethod", "signatureValue"];
            };
        };
        readonly required: readonly ["id", "namespace", "entity", "trustScore", "contributions", "endorsements", "proof"];
    };
    readonly NodeClusterDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NodeClusterDeclaration";
        readonly title: "Node Cluster Declaration";
        readonly description: "Defines an OV Cluster's structure, governance, and node configuration.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the OV Cluster.";
            };
            readonly type: {
                readonly const: "ClusterDeclaration";
                readonly description: "Indicates that this is a Cluster DID declaration.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "The DID of the namespace this cluster belongs to.";
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly managedBy: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "DIDs of entities responsible for managing this cluster.";
                    };
                    readonly rules: {
                        readonly type: "string";
                        readonly description: "A reference to governance rules stored in Ceramic or DID-Linked Resources.";
                    };
                    readonly disputeResolution: {
                        readonly type: "string";
                        readonly description: "A DID reference to a dispute resolution service.";
                    };
                };
                readonly description: "Governance policies for this cluster.";
            };
            readonly nodes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The Node DID.";
                        };
                        readonly role: {
                            readonly type: "string";
                            readonly enum: readonly ["NamespaceNode", "IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
                            readonly description: "The functional role of this node.";
                        };
                    };
                    readonly required: readonly ["id", "role"];
                };
                readonly description: "List of nodes in this cluster.";
            };
            readonly services: {
                readonly type: "object";
                readonly properties: {
                    readonly verification: {
                        readonly type: "string";
                        readonly description: "The DID of the verification service.";
                    };
                    readonly storage: {
                        readonly type: "string";
                        readonly description: "The DID of the storage service.";
                    };
                    readonly payment: {
                        readonly type: "string";
                        readonly description: "The DID of the payment processing service.";
                    };
                };
                readonly description: "Services available in this cluster.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the linked resource.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., governance, metadata, event log).";
                        };
                    };
                    readonly required: readonly ["id", "type"];
                };
                readonly description: "Linked resources associated with this cluster.";
            };
            readonly verificationPolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly nodeVerification: {
                        readonly type: "string";
                        readonly enum: readonly ["Open", "Permissioned", "Staked"];
                        readonly description: "Defines how new nodes are verified.";
                    };
                    readonly revocationPolicy: {
                        readonly type: "string";
                        readonly description: "Conditions under which a node or vault can be revoked from the cluster.";
                    };
                };
                readonly description: "Verification and security policies for the cluster.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this cluster declaration was issued.";
            };
        };
        readonly required: readonly ["id", "namespace", "nodes", "services", "verificationPolicies", "timestamp"];
    };
    readonly NodeDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NodeDeclaration";
        readonly title: "Node Declaration";
        readonly description: "Defines an OV Node within a cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the node.";
            };
            readonly type: {
                readonly const: "NodeDeclaration";
                readonly description: "Indicates this is a Node DID declaration.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The Cluster DID this node belongs to.";
            };
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
                readonly description: "The functional role of this node.";
            };
            readonly operator: {
                readonly type: "string";
                readonly description: "The DID of the entity that operates this node.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "suspended", "revoked"];
                readonly description: "The operational status of the node.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., GovernancePolicy, VerificationLog).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "Linked resources associated with this node.";
            };
            readonly verificationPolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly assignedBy: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of validators who approved this node.";
                    };
                    readonly verificationRules: {
                        readonly type: "string";
                        readonly description: "Reference to verification policies in Ceramic.";
                    };
                };
                readonly description: "Verification details for this node.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this node declaration was issued.";
            };
        };
        readonly required: readonly ["id", "type", "cluster", "role", "operator", "status", "timestamp"];
    };
    readonly NodeOperatorAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/NodeOperatorAgreement";
        readonly title: "Node Operator Agreement";
        readonly description: "Defines the responsibilities of an OV Node operator within a Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly nodeId: {
                readonly type: "string";
                readonly description: "DID of the Node.";
            };
            readonly clusterId: {
                readonly type: "string";
                readonly description: "DID of the Cluster the Node is part of.";
            };
            readonly nodeType: {
                readonly type: "string";
                readonly enum: readonly ["Identity", "Storage", "Compute", "Verification"];
                readonly description: "The role of the Node within the Cluster.";
            };
            readonly performanceRequirements: {
                readonly type: "object";
                readonly properties: {
                    readonly uptime: {
                        readonly type: "number";
                        readonly description: "Minimum required uptime percentage.";
                    };
                    readonly latency: {
                        readonly type: "number";
                        readonly description: "Maximum response latency allowed.";
                    };
                };
            };
            readonly dataHandlingRules: {
                readonly type: "string";
                readonly description: "Compliance requirements for handling data within the node.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions under which the node can be removed from the Cluster.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the Node Operator has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "nodeId", "clusterId", "nodeType", "performanceRequirements", "dataHandlingRules", "revocationPolicy", "agreementSigned", "timestamp"];
    };
    readonly NodeVoting: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/NodeVotingConsensusAgreement";
        readonly title: "Node Voting & Consensus Agreement";
        readonly description: "Defines voting mechanisms for governance decisions in OriginVault clusters.";
        readonly type: "object";
        readonly properties: {
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly clusterId: {
                readonly type: "string";
                readonly description: "DID of the Cluster where voting occurs.";
            };
            readonly nodeId: {
                readonly type: "string";
                readonly description: "DID of the participating node.";
            };
            readonly voteType: {
                readonly type: "string";
                readonly enum: readonly ["Governance Policy", "New Namespace Approval", "Node Sanctions"];
                readonly description: "The type of vote being cast.";
            };
            readonly votingMethod: {
                readonly type: "string";
                readonly enum: readonly ["One Node, One Vote", "Stake-Weighted", "Reputation-Based"];
                readonly description: "Defines how voting power is determined.";
            };
            readonly minimumQuorum: {
                readonly type: "number";
                readonly description: "The minimum percentage of nodes required for the vote to be valid.";
            };
            readonly decisionThreshold: {
                readonly type: "number";
                readonly description: "The percentage required to approve a decision.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Under what conditions a vote result can be invalidated.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the node has agreed to the governance process.";
            };
        };
        readonly required: readonly ["agreementId", "clusterId", "nodeId", "voteType", "votingMethod", "minimumQuorum", "decisionThreshold", "revocationPolicy", "agreementSigned"];
    };
    readonly Owner: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
        readonly $id: "https://schemas.originvault.box/Owner";
        readonly title: "Owner";
        readonly description: "Defines an owner role for vaults, plugins, and namespaces.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["Person", "Organization"];
                readonly description: "Schema.org type";
            };
            readonly ownerId: {
                readonly type: "string";
                readonly description: "DID of the owner.";
            };
            readonly ownsVaults: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of vaults owned by this persona.";
                };
            };
            readonly ownsPlugins: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of plugins owned by this persona.";
                };
            };
            readonly ownsNamespaces: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of namespaces owned by this persona.";
                };
            };
            readonly delegatedAdmins: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of admins granted management permissions.";
                };
            };
            readonly monetizationModel: {
                readonly type: "object";
                readonly properties: {
                    readonly revenueStreams: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly description: "Types of revenue models (e.g., subscription, licensing fees, transaction fees).";
                        };
                    };
                    readonly payoutSchedule: {
                        readonly type: "string";
                        readonly description: "Schedule for revenue payouts.";
                    };
                };
            };
            readonly disputeResolutionMethod: {
                readonly type: "string";
                readonly enum: readonly ["DAO Governance", "Legal Arbitration", "Community Voting"];
                readonly description: "Method for resolving ownership disputes.";
            };
            readonly transferPolicy: {
                readonly type: "string";
                readonly description: "Rules governing how ownership can be transferred.";
            };
        };
        readonly required: readonly ["ownerId", "ownsVaults", "ownsPlugins", "ownsNamespaces"];
    };
    readonly PackageJson: {
        readonly $schema: "http://json-schema.org/draft-07/schema#";
        readonly $id: "https://json.schemastore.org/package.json";
        readonly title: "PackageJson";
        readonly definitions: {
            readonly person: {
                readonly description: "A person who has been involved in creating or maintaining this package.";
                readonly type: readonly ["object", "string"];
                readonly required: readonly ["name"];
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly url: {
                        readonly type: "string";
                        readonly format: "uri";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                    };
                };
            };
            readonly dependency: {
                readonly description: "Dependencies are specified with a simple hash of package name to version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly devDependency: {
                readonly description: "Specifies dependencies that are required for the development and testing of the project. These dependencies are not needed in the production environment.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly optionalDependency: {
                readonly description: "Specifies dependencies that are optional for your project. These dependencies are attempted to be installed during the npm install process, but if they fail to install, the installation process will not fail.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly peerDependency: {
                readonly description: "Specifies dependencies that are required by the package but are expected to be provided by the consumer of the package.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly peerDependencyMeta: {
                readonly description: "When a user installs your package, warnings are emitted if packages specified in \"peerDependencies\" are not already installed. The \"peerDependenciesMeta\" field serves to provide more information on how your peer dependencies are utilized. Most commonly, it allows peer dependencies to be marked as optional. Metadata for this field is specified with a simple hash of the package name to a metadata object.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                    readonly properties: {
                        readonly optional: {
                            readonly description: "Specifies that this peer dependency is optional and should not be installed automatically.";
                            readonly type: "boolean";
                        };
                    };
                };
            };
            readonly license: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly enum: readonly ["AGPL-3.0-only", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "BSL-1.0", "CC0-1.0", "CDDL-1.0", "CDDL-1.1", "EPL-1.0", "EPL-2.0", "GPL-2.0-only", "GPL-3.0-only", "ISC", "LGPL-2.0-only", "LGPL-2.1-only", "LGPL-2.1-or-later", "LGPL-3.0-only", "LGPL-3.0-or-later", "MIT", "MPL-2.0", "MS-PL", "UNLICENSED"];
                }];
            };
            readonly scriptsInstallAfter: {
                readonly description: "Run AFTER the package is installed.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsPublishAfter: {
                readonly description: "Run AFTER the package is published.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsRestart: {
                readonly description: "Run by the 'npm restart' command. Note: 'npm restart' will run the stop and start scripts if no restart script is provided.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsStart: {
                readonly description: "Run by the 'npm start' command.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsStop: {
                readonly description: "Run by the 'npm stop' command.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsTest: {
                readonly description: "Run by the 'npm test' command.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsUninstallBefore: {
                readonly description: "Run BEFORE the package is uninstalled.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly scriptsVersionBefore: {
                readonly description: "Run BEFORE bump the package version.";
                readonly type: "string";
                readonly "x-intellij-language-injection": "Shell Script";
            };
            readonly packageExportsEntryPath: {
                readonly type: readonly ["string", "null"];
                readonly description: "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.";
                readonly pattern: "^\\./";
            };
            readonly packageExportsEntryObject: {
                readonly type: "object";
                readonly description: "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.";
                readonly properties: {
                    readonly require: {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function.";
                    };
                    readonly import: {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function.";
                    };
                    readonly node: {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this environment is Node.js.";
                    };
                    readonly default: {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when no other export type matches.";
                    };
                    readonly types: {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                    };
                };
                readonly patternProperties: {
                    readonly "^[^.0-9]+$": {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this environment matches the property name.";
                    };
                    readonly "^types@.+$": {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                    };
                };
                readonly additionalProperties: false;
            };
            readonly packageExportsEntry: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/packageExportsEntryPath";
                }, {
                    readonly $ref: "#/definitions/packageExportsEntryObject";
                }];
            };
            readonly packageExportsFallback: {
                readonly type: "array";
                readonly description: "Used to allow fallbacks in case this environment doesn't support the preceding entries.";
                readonly items: {
                    readonly $ref: "#/definitions/packageExportsEntry";
                };
            };
            readonly packageExportsEntryOrFallback: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/packageExportsEntry";
                }, {
                    readonly $ref: "#/definitions/packageExportsFallback";
                }];
            };
            readonly packageImportsEntryPath: {
                readonly type: readonly ["string", "null"];
                readonly description: "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.";
            };
            readonly packageImportsEntryObject: {
                readonly type: "object";
                readonly description: "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.";
                readonly properties: {
                    readonly require: {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function.";
                    };
                    readonly import: {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function.";
                    };
                    readonly node: {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this environment is Node.js.";
                    };
                    readonly default: {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when no other export type matches.";
                    };
                    readonly types: {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                    };
                };
                readonly patternProperties: {
                    readonly "^[^.0-9]+$": {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this environment matches the property name.";
                    };
                    readonly "^types@.+$": {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                    };
                };
                readonly additionalProperties: false;
            };
            readonly packageImportsEntry: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/packageImportsEntryPath";
                }, {
                    readonly $ref: "#/definitions/packageImportsEntryObject";
                }];
            };
            readonly packageImportsFallback: {
                readonly type: "array";
                readonly description: "Used to allow fallbacks in case this environment doesn't support the preceding entries.";
                readonly items: {
                    readonly $ref: "#/definitions/packageImportsEntry";
                };
            };
            readonly packageImportsEntryOrFallback: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/packageImportsEntry";
                }, {
                    readonly $ref: "#/definitions/packageImportsFallback";
                }];
            };
            readonly fundingUrl: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "URL to a website with details about how to fund the package.";
            };
            readonly fundingWay: {
                readonly type: "object";
                readonly description: "Used to inform about ways to help fund development of the package.";
                readonly properties: {
                    readonly url: {
                        readonly $ref: "#/definitions/fundingUrl";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of funding or the platform through which funding can be provided, e.g. patreon, opencollective, tidelift or github.";
                    };
                };
                readonly additionalProperties: false;
                readonly required: readonly ["url"];
            };
        };
        readonly type: "object";
        readonly patternProperties: {
            readonly "^_": {
                readonly description: "Any property starting with _ is valid.";
                readonly tsType: "any";
            };
        };
        readonly properties: {
            readonly name: {
                readonly description: "The name of the package.";
                readonly type: "string";
                readonly maxLength: 214;
                readonly minLength: 1;
                readonly pattern: "^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$";
            };
            readonly version: {
                readonly description: "Version must be parsable by node-semver, which is bundled with npm as a dependency.";
                readonly type: "string";
            };
            readonly description: {
                readonly description: "This helps people discover your package, as it's listed in 'npm search'.";
                readonly type: "string";
            };
            readonly keywords: {
                readonly description: "This helps people discover your package as it's listed in 'npm search'.";
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly homepage: {
                readonly description: "The url to the project homepage.";
                readonly type: "string";
            };
            readonly bugs: {
                readonly description: "The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.";
                readonly type: readonly ["object", "string"];
                readonly properties: {
                    readonly url: {
                        readonly type: "string";
                        readonly description: "The url to your project's issue tracker.";
                        readonly format: "uri";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "The email address to which issues should be reported.";
                        readonly format: "email";
                    };
                };
            };
            readonly license: {
                readonly $ref: "#/definitions/license";
                readonly description: "You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.";
            };
            readonly licenses: {
                readonly description: "DEPRECATED: Instead, use SPDX expressions, like this: { \"license\": \"ISC\" } or { \"license\": \"(MIT OR Apache-2.0)\" } see: 'https://docs.npmjs.com/files/package.json#license'.";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly $ref: "#/definitions/license";
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly format: "uri";
                        };
                    };
                };
            };
            readonly author: {
                readonly $ref: "#/definitions/person";
            };
            readonly contributors: {
                readonly description: "A list of people who contributed to this package.";
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/definitions/person";
                };
            };
            readonly maintainers: {
                readonly description: "A list of people who maintains this package.";
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/definitions/person";
                };
            };
            readonly files: {
                readonly description: "The 'files' field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder.";
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly main: {
                readonly description: "The main field is a module ID that is the primary entry point to your program.";
                readonly type: "string";
            };
            readonly exports: {
                readonly description: "The \"exports\" field is used to restrict external access to non-exported module files, also enables a module to import itself using \"name\".";
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/packageExportsEntryPath";
                    readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly ".": {
                            readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                            readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
                        };
                    };
                    readonly patternProperties: {
                        readonly "^\\./.+": {
                            readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                            readonly description: "The module path prefix that is resolved when the module specifier starts with \"name/\", set to \"./*\" to allow external modules to import any subpath.";
                        };
                    };
                    readonly additionalProperties: false;
                }, {
                    readonly $ref: "#/definitions/packageExportsEntryObject";
                    readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
                }, {
                    readonly $ref: "#/definitions/packageExportsFallback";
                    readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
                }];
            };
            readonly imports: {
                readonly description: "The \"imports\" field is used to create private mappings that only apply to import specifiers from within the package itself.";
                readonly type: "object";
                readonly patternProperties: {
                    readonly "^#.+$": {
                        readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                        readonly description: "The module path that is resolved when this environment matches the property name.";
                    };
                };
                readonly additionalProperties: false;
            };
            readonly bin: {
                readonly type: readonly ["string", "object"];
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly type: {
                readonly description: "When set to \"module\", the type field allows a package to specify all .js files within are ES modules. If the \"type\" field is omitted or set to \"commonjs\", all .js files are treated as CommonJS.";
                readonly type: "string";
                readonly enum: readonly ["commonjs", "module"];
                readonly default: "commonjs";
            };
            readonly types: {
                readonly description: "Set the types property to point to your bundled declaration file.";
                readonly type: "string";
            };
            readonly typings: {
                readonly description: "Note that the \"typings\" field is synonymous with \"types\", and could be used as well.";
                readonly type: "string";
            };
            readonly typesVersions: {
                readonly description: "The \"typesVersions\" field is used since TypeScript 3.1 to support features that were only made available in newer TypeScript versions.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly description: "Contains overrides for the TypeScript version that matches the version range matching the property key.";
                    readonly type: "object";
                    readonly properties: {
                        readonly "*": {
                            readonly description: "Maps all file paths to the file paths specified in the array.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly pattern: "^[^*]*(?:\\*[^*]*)?$";
                            };
                        };
                    };
                    readonly patternProperties: {
                        readonly "^[^*]+$": {
                            readonly description: "Maps the file path matching the property key to the file paths specified in the array.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly "^[^*]*\\*[^*]*$": {
                            readonly description: "Maps file paths matching the pattern specified in property key to file paths specified in the array.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly pattern: "^[^*]*(?:\\*[^*]*)?$";
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly man: {
                readonly type: readonly ["array", "string"];
                readonly description: "Specify either a single file or an array of filenames to put in place for the man program to find.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly directories: {
                readonly type: "object";
                readonly properties: {
                    readonly bin: {
                        readonly description: "If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash.";
                        readonly type: "string";
                    };
                    readonly doc: {
                        readonly description: "Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.";
                        readonly type: "string";
                    };
                    readonly example: {
                        readonly description: "Put example scripts in here. Someday, it might be exposed in some clever way.";
                        readonly type: "string";
                    };
                    readonly lib: {
                        readonly description: "Tell people where the bulk of your library is. Nothing special is done with the lib folder in any way, but it's useful meta info.";
                        readonly type: "string";
                    };
                    readonly man: {
                        readonly description: "A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.";
                        readonly type: "string";
                    };
                    readonly test: {
                        readonly type: "string";
                    };
                };
            };
            readonly repository: {
                readonly description: "Specify the place where your code lives. This is helpful for people who want to contribute.";
                readonly type: readonly ["object", "string"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                    };
                    readonly url: {
                        readonly type: "string";
                    };
                    readonly directory: {
                        readonly type: "string";
                    };
                };
            };
            readonly funding: {
                readonly oneOf: readonly [{
                    readonly $ref: "#/definitions/fundingUrl";
                }, {
                    readonly $ref: "#/definitions/fundingWay";
                }, {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly $ref: "#/definitions/fundingUrl";
                        }, {
                            readonly $ref: "#/definitions/fundingWay";
                        }];
                    };
                    readonly minItems: 1;
                    readonly uniqueItems: true;
                }];
            };
            readonly scripts: {
                readonly description: "The 'scripts' member is an object hash of script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.";
                readonly type: "object";
                readonly properties: {
                    readonly lint: {
                        readonly type: "string";
                        readonly description: "Run code quality tools, e.g. ESLint, TSLint, etc.";
                    };
                    readonly prepublish: {
                        readonly type: "string";
                        readonly description: "Run BEFORE the package is published (Also run on local npm install without any arguments).";
                    };
                    readonly prepare: {
                        readonly type: "string";
                        readonly description: "Runs BEFORE the package is packed, i.e. during \"npm publish\" and \"npm pack\", and on local \"npm install\" without any arguments. This is run AFTER \"prepublish\", but BEFORE \"prepublishOnly\".";
                    };
                    readonly prepublishOnly: {
                        readonly type: "string";
                        readonly description: "Run BEFORE the package is prepared and packed, ONLY on npm publish.";
                    };
                    readonly prepack: {
                        readonly type: "string";
                        readonly description: "run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies).";
                    };
                    readonly postpack: {
                        readonly type: "string";
                        readonly description: "Run AFTER the tarball has been generated and moved to its final destination.";
                    };
                    readonly publish: {
                        readonly type: "string";
                        readonly description: "Publishes a package to the registry so that it can be installed by name. See https://docs.npmjs.com/cli/v8/commands/npm-publish";
                    };
                    readonly postpublish: {
                        readonly $ref: "#/definitions/scriptsPublishAfter";
                    };
                    readonly preinstall: {
                        readonly type: "string";
                        readonly description: "Run BEFORE the package is installed.";
                    };
                    readonly install: {
                        readonly $ref: "#/definitions/scriptsInstallAfter";
                    };
                    readonly postinstall: {
                        readonly $ref: "#/definitions/scriptsInstallAfter";
                    };
                    readonly preuninstall: {
                        readonly $ref: "#/definitions/scriptsUninstallBefore";
                    };
                    readonly uninstall: {
                        readonly $ref: "#/definitions/scriptsUninstallBefore";
                    };
                    readonly postuninstall: {
                        readonly type: "string";
                        readonly description: "Run AFTER the package is uninstalled.";
                    };
                    readonly preversion: {
                        readonly $ref: "#/definitions/scriptsVersionBefore";
                    };
                    readonly version: {
                        readonly $ref: "#/definitions/scriptsVersionBefore";
                    };
                    readonly postversion: {
                        readonly type: "string";
                        readonly description: "Run AFTER bump the package version.";
                    };
                    readonly pretest: {
                        readonly $ref: "#/definitions/scriptsTest";
                    };
                    readonly test: {
                        readonly $ref: "#/definitions/scriptsTest";
                    };
                    readonly posttest: {
                        readonly $ref: "#/definitions/scriptsTest";
                    };
                    readonly prestop: {
                        readonly $ref: "#/definitions/scriptsStop";
                    };
                    readonly stop: {
                        readonly $ref: "#/definitions/scriptsStop";
                    };
                    readonly poststop: {
                        readonly $ref: "#/definitions/scriptsStop";
                    };
                    readonly prestart: {
                        readonly $ref: "#/definitions/scriptsStart";
                    };
                    readonly start: {
                        readonly $ref: "#/definitions/scriptsStart";
                    };
                    readonly poststart: {
                        readonly $ref: "#/definitions/scriptsStart";
                    };
                    readonly prerestart: {
                        readonly $ref: "#/definitions/scriptsRestart";
                    };
                    readonly restart: {
                        readonly $ref: "#/definitions/scriptsRestart";
                    };
                    readonly postrestart: {
                        readonly $ref: "#/definitions/scriptsRestart";
                    };
                    readonly serve: {
                        readonly type: "string";
                        readonly description: "Start dev server to serve application files";
                    };
                };
                readonly additionalProperties: {
                    readonly type: "string";
                    readonly tsType: "string | undefined";
                    readonly "x-intellij-language-injection": "Shell Script";
                };
            };
            readonly config: {
                readonly description: "A 'config' hash can be used to set configuration parameters used in package scripts that persist across upgrades.";
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly dependencies: {
                readonly $ref: "#/definitions/dependency";
            };
            readonly devDependencies: {
                readonly $ref: "#/definitions/devDependency";
            };
            readonly optionalDependencies: {
                readonly $ref: "#/definitions/optionalDependency";
            };
            readonly peerDependencies: {
                readonly $ref: "#/definitions/peerDependency";
            };
            readonly peerDependenciesMeta: {
                readonly $ref: "#/definitions/peerDependencyMeta";
            };
            readonly bundleDependencies: {
                readonly description: "Array of package names that will be bundled when publishing the package.";
                readonly oneOf: readonly [{
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                }, {
                    readonly type: "boolean";
                }];
            };
            readonly bundledDependencies: {
                readonly description: "DEPRECATED: This field is honored, but \"bundleDependencies\" is the correct field name.";
                readonly oneOf: readonly [{
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                }, {
                    readonly type: "boolean";
                }];
            };
            readonly resolutions: {
                readonly description: "Resolutions is used to support selective version resolutions using yarn, which lets you define custom package versions or ranges inside your dependencies. For npm, use overrides instead. See: https://classic.yarnpkg.com/en/docs/selective-version-resolutions";
                readonly type: "object";
            };
            readonly overrides: {
                readonly description: "Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies. For yarn, use resolutions instead. See: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides";
                readonly type: "object";
            };
            readonly packageManager: {
                readonly description: "Defines which package manager is expected to be used when working on the current project. This field is currently experimental and needs to be opted-in; see https://nodejs.org/api/corepack.html";
                readonly type: "string";
                readonly pattern: "(npm|pnpm|yarn|bun)@\\d+\\.\\d+\\.\\d+(-.+)?";
            };
            readonly engines: {
                readonly type: "object";
                readonly properties: {
                    readonly node: {
                        readonly type: "string";
                    };
                };
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly volta: {
                readonly description: "Defines which tools and versions are expected to be used when Volta is installed.";
                readonly type: "object";
                readonly properties: {
                    readonly extends: {
                        readonly description: "The value of that entry should be a path to another JSON file which also has a \"volta\" section";
                        readonly type: "string";
                    };
                };
                readonly patternProperties: {
                    readonly "(node|npm|pnpm|yarn)": {
                        readonly type: "string";
                    };
                };
            };
            readonly engineStrict: {
                readonly type: "boolean";
            };
            readonly os: {
                readonly description: "Specify which operating systems your module will run on.";
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly cpu: {
                readonly description: "Specify that your code only runs on certain cpu architectures.";
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly preferGlobal: {
                readonly type: "boolean";
                readonly description: "DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is purely there for informational purposes. It is now recommended that you install any binaries as local devDependencies wherever possible.";
            };
            readonly private: {
                readonly description: "If set to true, then npm will refuse to publish it.";
                readonly oneOf: readonly [{
                    readonly type: "boolean";
                }, {
                    readonly enum: readonly ["false", "true"];
                }];
            };
            readonly publishConfig: {
                readonly type: "object";
                readonly properties: {
                    readonly access: {
                        readonly type: "string";
                        readonly enum: readonly ["public", "restricted"];
                    };
                    readonly tag: {
                        readonly type: "string";
                    };
                    readonly registry: {
                        readonly type: "string";
                        readonly format: "uri";
                    };
                    readonly provenance: {
                        readonly type: "boolean";
                    };
                };
                readonly additionalProperties: true;
            };
            readonly dist: {
                readonly type: "object";
                readonly properties: {
                    readonly shasum: {
                        readonly type: "string";
                    };
                    readonly tarball: {
                        readonly type: "string";
                    };
                };
            };
            readonly readme: {
                readonly type: "string";
            };
            readonly module: {
                readonly description: "An ECMAScript module ID that is the primary entry point to your program.";
                readonly type: "string";
            };
            readonly esnext: {
                readonly description: "A module ID with untranspiled code that is the primary entry point to your program.";
                readonly type: readonly ["string", "object"];
                readonly properties: {
                    readonly main: {
                        readonly type: "string";
                    };
                    readonly browser: {
                        readonly type: "string";
                    };
                };
                readonly additionalProperties: {
                    readonly type: "string";
                };
            };
            readonly workspaces: {
                readonly description: "Allows packages within a directory to depend on one another using direct linking of local files. Additionally, dependencies within a workspace are hoisted to the workspace root when possible to reduce duplication. Note: It's also a good idea to set \"private\" to true when using this feature.";
                readonly anyOf: readonly [{
                    readonly type: "array";
                    readonly description: "Workspace package paths. Glob patterns are supported.";
                    readonly items: {
                        readonly type: "string";
                    };
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly packages: {
                            readonly type: "array";
                            readonly description: "Workspace package paths. Glob patterns are supported.";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly nohoist: {
                            readonly type: "array";
                            readonly description: "Packages to block from hoisting to the workspace root. Currently only supported in Yarn only.";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                }];
            };
            readonly jspm: {
                readonly $ref: "#";
            };
            readonly eslintConfig: {
                readonly $ref: "https://json.schemastore.org/eslintrc.json";
            };
            readonly prettier: {
                readonly $ref: "https://json.schemastore.org/prettierrc.json";
            };
            readonly stylelint: {
                readonly $ref: "https://json.schemastore.org/stylelintrc.json";
            };
            readonly ava: {
                readonly $ref: "https://json.schemastore.org/ava.json";
            };
            readonly release: {
                readonly $ref: "https://json.schemastore.org/semantic-release.json";
            };
            readonly jscpd: {
                readonly $ref: "https://json.schemastore.org/jscpd.json";
            };
            readonly pnpm: {
                readonly description: "Defines pnpm specific configuration.";
                readonly type: "object";
                readonly properties: {
                    readonly overrides: {
                        readonly description: "Used to override any dependency in the dependency graph.";
                        readonly type: "object";
                    };
                    readonly packageExtensions: {
                        readonly description: "Used to extend the existing package definitions with additional information.";
                        readonly type: "object";
                        readonly patternProperties: {
                            readonly "^.+$": {
                                readonly type: "object";
                                readonly properties: {
                                    readonly dependencies: {
                                        readonly $ref: "#/definitions/dependency";
                                    };
                                    readonly optionalDependencies: {
                                        readonly $ref: "#/definitions/optionalDependency";
                                    };
                                    readonly peerDependencies: {
                                        readonly $ref: "#/definitions/peerDependency";
                                    };
                                    readonly peerDependenciesMeta: {
                                        readonly $ref: "#/definitions/peerDependencyMeta";
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly peerDependencyRules: {
                        readonly type: "object";
                        readonly properties: {
                            readonly ignoreMissing: {
                                readonly description: "pnpm will not print warnings about missing peer dependencies from this list.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly allowedVersions: {
                                readonly description: "Unmet peer dependency warnings will not be printed for peer dependencies of the specified range.";
                                readonly type: "object";
                            };
                            readonly allowAny: {
                                readonly description: "Any peer dependency matching the pattern will be resolved from any version, regardless of the range specified in \"peerDependencies\".";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly neverBuiltDependencies: {
                        readonly description: "A list of dependencies to run builds for.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly onlyBuiltDependencies: {
                        readonly description: "A list of package names that are allowed to be executed during installation.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly onlyBuiltDependenciesFile: {
                        readonly description: "Specifies a JSON file that lists the only packages permitted to run installation scripts during the pnpm install process.";
                        readonly type: "string";
                    };
                    readonly ignoredBuiltDependencies: {
                        readonly description: "A list of package names that should not be built during installation.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly allowedDeprecatedVersions: {
                        readonly description: "A list of deprecated versions that the warnings are suppressed.";
                        readonly type: "object";
                    };
                    readonly patchedDependencies: {
                        readonly description: "A list of dependencies that are patched.";
                        readonly type: "object";
                    };
                    readonly allowNonAppliedPatches: {
                        readonly description: "When true, installation won't fail if some of the patches from the \"patchedDependencies\" field were not applied.";
                        readonly type: "boolean";
                    };
                    readonly updateConfig: {
                        readonly type: "object";
                        readonly properties: {
                            readonly ignoreDependencies: {
                                readonly description: "A list of packages that should be ignored when running \"pnpm outdated\" or \"pnpm update --latest\".";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly configDependencies: {
                        readonly type: "object";
                        readonly description: "Configurational dependencies are installed before all the other types of dependencies (before 'dependencies', 'devDependencies', 'optionalDependencies').";
                    };
                    readonly auditConfig: {
                        readonly type: "object";
                        readonly properties: {
                            readonly ignoreCves: {
                                readonly description: "A list of CVE IDs that will be ignored by \"pnpm audit\".";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly pattern: "^CVE-\\d{4}-\\d{4,7}$";
                                };
                            };
                            readonly ignoreGhsas: {
                                readonly description: "A list of GHSA Codes that will be ignored by \"pnpm audit\".";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly pattern: "^GHSA(-[23456789cfghjmpqrvwx]{4}){3}$";
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly requiredScripts: {
                        readonly description: "A list of scripts that must exist in each project.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly supportedArchitectures: {
                        readonly description: "Specifies architectures for which you'd like to install optional dependencies, even if they don't match the architecture of the system running the install.";
                        readonly type: "object";
                        readonly properties: {
                            readonly os: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly cpu: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly libc: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly ignoredOptionalDependencies: {
                        readonly description: "A list of optional dependencies that the install should be skipped.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly executionEnv: {
                        readonly type: "object";
                        readonly properties: {
                            readonly nodeVersion: {
                                readonly description: "Specifies which exact Node.js version should be used for the project's runtime.";
                                readonly type: "string";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly anyOf: readonly [{
            readonly type: "object";
            readonly not: {
                readonly required: readonly ["bundledDependencies", "bundleDependencies"];
            };
        }, {
            readonly type: "object";
            readonly not: {
                readonly required: readonly ["bundleDependencies"];
            };
            readonly required: readonly ["bundledDependencies"];
        }, {
            readonly type: "object";
            readonly not: {
                readonly required: readonly ["bundledDependencies"];
            };
            readonly required: readonly ["bundleDependencies"];
        }];
    };
    readonly Persona: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/Persona";
        readonly title: "Persona";
        readonly description: "Defines a persona in the OriginVault ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly description: "Schema.org type";
            };
            readonly personaId: {
                readonly type: "string";
                readonly description: "DID of the persona.";
            };
            readonly displayName: {
                readonly type: "string";
                readonly description: "User's display name or pseudonym.";
            };
            readonly associatedDID: {
                readonly type: "string";
                readonly description: "The primary DID associated with this persona.";
            };
            readonly personaType: {
                readonly type: "string";
                readonly enum: readonly ["Creator", "Verifier", "Vault Operator", "Community Member", "AI Trainer"];
                readonly description: "Role of the user within the OV ecosystem.";
            };
            readonly joinedDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Date of persona creation.";
            };
            readonly reputationScore: {
                readonly type: "object";
                readonly properties: {
                    readonly trustLevel: {
                        readonly type: "number";
                        readonly description: "A calculated trust score based on activity and endorsements.";
                    };
                    readonly endorsements: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly description: "DIDs of other users who have endorsed this persona.";
                        };
                    };
                };
                readonly description: "Tracks the persona's trust and reputation.";
            };
            readonly badges: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "List of awarded badges or recognitions.";
                };
            };
            readonly activityLog: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly activityType: {
                            readonly type: "string";
                            readonly description: "Type of activity performed.";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "Timestamp of activity.";
                        };
                    };
                };
                readonly description: "Logs important persona actions within OV.";
            };
            readonly linkedSocials: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "List of linked social media or web3 identities.";
                };
            };
        };
        readonly required: readonly ["personaId", "associatedDID", "personaType", "joinedDate"];
    };
    readonly PluginDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.io"];
        readonly $id: "https://schemas.originvault.io/PluginDeclaration";
        readonly title: "Plugin Declaration";
        readonly description: "Defines a plugin registered in an OV Namespace, including governance, versioning, and compatibility.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["SoftwareApplication", "WebApplication", "Extension", "Protocol"];
                readonly description: "Schema.org type defining the plugin category.";
            };
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the plugin.";
            };
            readonly namespace: {
                readonly type: "string";
                readonly description: "The DID of the namespace this plugin belongs to.";
            };
            readonly vault: {
                readonly type: "string";
                readonly description: "The DID of the vault that owns this plugin.";
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Name of the plugin.";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Detailed description of the plugin’s functionality.";
            };
            readonly version: {
                readonly type: "string";
                readonly description: "Semantic versioning (e.g., 1.0.0).";
            };
            readonly author: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "DID of the entity or user who created the plugin.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Author's name or organization.";
                    };
                    readonly url: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "Website or documentation link.";
                    };
                };
            };
            readonly compatibleNodes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
                readonly description: "The node types this plugin is designed to run on.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the linked resource.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly format: "uri";
                            readonly description: "The URI of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., governance, metadata, event log).";
                        };
                    };
                    readonly required: readonly ["id", "type"];
                };
                readonly description: "References to plugin documentation, code, or policies.";
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly approvedBy: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of governance bodies or validators that approved the plugin.";
                    };
                    readonly complianceRules: {
                        readonly type: "string";
                        readonly description: "Reference to compliance policies stored in Ceramic.";
                    };
                };
                readonly description: "Governance and compliance information for the plugin.";
            };
            readonly installation: {
                readonly type: "object";
                readonly properties: {
                    readonly installMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["VaultInstallation", "NodeInstallation", "GlobalInstallation"];
                        readonly description: "Defines where the plugin can be installed.";
                    };
                    readonly dependencies: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of other required plugins or services.";
                    };
                    readonly configurationSchema: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "Link to a schema defining plugin-specific configuration options.";
                    };
                };
                readonly description: "Defines how the plugin is installed and configured.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "deprecated", "revoked"];
                readonly description: "The current status of the plugin.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this plugin declaration was issued.";
            };
        };
        readonly required: readonly ["@type", "id", "namespace", "name", "version", "author", "compatibleNodes", "status", "timestamp"];
    };
    readonly PluginDeveloperAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/PluginDeveloperAgreement";
        readonly title: "Plugin Developer Agreement";
        readonly description: "Defines the terms for publishing a plugin in the OV ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork", "SoftwareApplication"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly pluginId: {
                readonly type: "string";
                readonly description: "DID of the plugin.";
            };
            readonly developerId: {
                readonly type: "string";
                readonly description: "DID of the developer.";
            };
            readonly securityRequirements: {
                readonly type: "string";
                readonly description: "The security audit requirements for publishing a plugin.";
            };
            readonly monetizationModel: {
                readonly type: "string";
                readonly enum: readonly ["Free", "Subscription", "One-time Purchase"];
                readonly description: "How the plugin is monetized.";
            };
            readonly compliancePolicy: {
                readonly type: "string";
                readonly description: "Plugin compliance rules and enforcement.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions for plugin removal from the OV ecosystem.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the developer has accepted the agreement.";
            };
        };
        readonly required: readonly ["agreementId", "pluginId", "developerId", "securityRequirements", "monetizationModel", "compliancePolicy", "revocationPolicy", "agreementSigned"];
    };
    readonly PluginExectutionRequest: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/PluginExecutionRequest";
        readonly title: "Plugin Execution Request";
        readonly description: "Defines a request from a plugin running in a vault to interact with an OV node.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the execution request.";
            };
            readonly vault: {
                readonly type: "string";
                readonly description: "The DID of the vault running the plugin.";
            };
            readonly plugin: {
                readonly type: "string";
                readonly description: "The DID of the plugin making the request.";
            };
            readonly node: {
                readonly type: "string";
                readonly description: "The DID of the node handling the request.";
            };
            readonly requestType: {
                readonly type: "string";
                readonly enum: readonly ["ComputeTask", "DataRead", "DataWrite", "IdentityLookup", "VerificationCheck"];
                readonly description: "Type of request being made.";
            };
            readonly parameters: {
                readonly type: "object";
                readonly description: "Additional parameters required for processing the request.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["pending", "processing", "completed", "failed"];
                readonly description: "Current status of the request.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of request submission.";
            };
        };
        readonly required: readonly ["id", "vault", "plugin", "node", "requestType", "status", "timestamp"];
    };
    readonly PluginIntegrationAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/PluginIntegrationAgreement";
        readonly title: "Plugin Integration Agreement";
        readonly description: "Defines the permissions and restrictions for a plugin installed in a Vault.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly pluginId: {
                readonly type: "string";
                readonly description: "DID of the installed plugin.";
            };
            readonly vaultId: {
                readonly type: "string";
                readonly description: "DID of the Vault where the plugin is installed.";
            };
            readonly permissions: {
                readonly type: "object";
                readonly properties: {
                    readonly storageAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the plugin access storage?";
                    };
                    readonly computeAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the plugin perform computations?";
                    };
                };
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions under which the plugin may be removed.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the plugin provider has accepted the agreement.";
            };
        };
        readonly required: readonly ["agreementId", "pluginId", "vaultId", "permissions", "revocationPolicy", "agreementSigned"];
    };
    readonly ReferalAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/ReferalAgreement";
        readonly title: "Referal Agreement";
        readonly description: "Defines the rules for trust-based referrals and reputation scoring within the OV ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly referrerId: {
                readonly type: "string";
                readonly description: "DID of the entity providing the referral.";
            };
            readonly referredEntityId: {
                readonly type: "string";
                readonly description: "DID of the entity receiving the referral.";
            };
            readonly trustScoreImpact: {
                readonly type: "object";
                readonly properties: {
                    readonly initialBoost: {
                        readonly type: "number";
                        readonly description: "Trust score increase from referral.";
                    };
                    readonly slashingConditions: {
                        readonly type: "string";
                        readonly description: "Conditions under which the referral can be revoked or slashed.";
                    };
                };
            };
            readonly reputationRewards: {
                readonly type: "string";
                readonly description: "How referrers are rewarded if the referred entity performs well.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether both parties accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "referrerId", "referredEntityId", "trustScoreImpact", "reputationRewards", "agreementSigned", "timestamp"];
    };
    readonly RevenuDistribution: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/RevenueDistribution";
        readonly title: "Revenue Distribution";
        readonly description: "Defines how revenue from data sales is distributed to Data Chamber contributors.";
        readonly type: "object";
        readonly properties: {
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Data Chamber.";
            };
            readonly totalRevenue: {
                readonly type: "number";
                readonly description: "Total revenue generated by data sales.";
            };
            readonly distribution: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly recipientId: {
                            readonly type: "string";
                            readonly description: "DID of the user receiving a payout.";
                        };
                        readonly amount: {
                            readonly type: "number";
                            readonly description: "Payout amount.";
                        };
                    };
                };
                readonly description: "List of users and their payouts.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the revenue was distributed.";
            };
        };
        readonly required: readonly ["chamberId", "totalRevenue", "distribution", "timestamp"];
    };
    readonly Revocation: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/Revocation";
        readonly title: "Revocation Schema";
        readonly description: "Defines the revocation process for nodes, clusters, or users.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the revocation record.";
            };
            readonly entity: {
                readonly type: "string";
                readonly description: "The DID of the revoked entity (Node, Cluster, User).";
            };
            readonly revokedBy: {
                readonly type: "string";
                readonly description: "The DID of the authority that revoked the entity.";
            };
            readonly reason: {
                readonly type: "string";
                readonly description: "Explanation for the revocation.";
            };
            readonly linkedEvidence: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "References to evidence supporting revocation (e.g., governance vote logs).";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of the revocation.";
            };
        };
        readonly required: readonly ["id", "entity", "revokedBy", "reason", "timestamp"];
    };
    readonly RootAuthority: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/RootAuthority";
        readonly title: "Root Authority Declaration";
        readonly description: "Declaration of a root authority establishing a trust chain for any namespace, platform, user, organization, community, or concept.";
        readonly type: "object";
        readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject"];
        readonly properties: {
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["VerifiableCredential", "RootAuthorityDeclaration"];
            };
            readonly issuer: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the entity declaring itself as a root authority";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the root authority";
                    };
                };
                readonly required: readonly ["id"];
            };
            readonly issuanceDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the root authority declaration was issued";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the root authority (same as issuer for self-declaration)";
                    };
                    readonly rootType: {
                        readonly type: "string";
                        readonly enum: readonly ["namespace", "platform", "user", "organization", "community", "concept"];
                        readonly description: "Type of root authority being declared";
                    };
                    readonly scope: {
                        readonly type: "string";
                        readonly description: "Scope or domain of authority";
                        readonly examples: readonly ["originvault.box", "content-authenticity", "user-reputation", "platform-governance", "community-standards", "data-provenance", "academic-credentials", "supply-chain"];
                    };
                    readonly trustChainPurpose: {
                        readonly type: "string";
                        readonly description: "Purpose and goals of this trust chain";
                        readonly examples: readonly ["Verify content authenticity and provenance", "Establish user reputation across platforms", "Govern platform operations and policies", "Certify academic achievements", "Track supply chain provenance"];
                    };
                    readonly governanceModel: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["self-governed", "dao", "multisig", "committee", "democratic", "consortium"];
                                readonly description: "Governance model for this root authority";
                            };
                            readonly participants: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "DIDs of governance participants (if applicable)";
                            };
                            readonly policyDocument: {
                                readonly type: "string";
                                readonly description: "Reference to governance policies and procedures";
                            };
                        };
                        readonly required: readonly ["type"];
                    };
                    readonly delegationPolicy: {
                        readonly type: "object";
                        readonly properties: {
                            readonly allowsSubRoots: {
                                readonly type: "boolean";
                                readonly description: "Whether this root authority can delegate to sub-roots";
                            };
                            readonly maxChainDepth: {
                                readonly type: "integer";
                                readonly minimum: 1;
                                readonly description: "Maximum depth of trust chain delegation";
                            };
                            readonly delegationCriteria: {
                                readonly type: "string";
                                readonly description: "Criteria for delegating authority to trusted issuers";
                            };
                        };
                    };
                    readonly accreditationStandards: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly standardId: {
                                    readonly type: "string";
                                    readonly description: "Identifier for the accreditation standard";
                                };
                                readonly schemaTypes: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly description: "Credential types this root can accredit issuers for";
                                };
                                readonly trustLevels: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly description: "Trust levels this root authority recognizes";
                                };
                            };
                            readonly required: readonly ["standardId", "schemaTypes"];
                        };
                        readonly description: "Accreditation standards this root authority supports";
                    };
                    readonly interoperability: {
                        readonly type: "object";
                        readonly properties: {
                            readonly recognizedRoots: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "DIDs of other root authorities this root recognizes";
                            };
                            readonly crossChainValidation: {
                                readonly type: "boolean";
                                readonly description: "Whether this root supports cross-chain credential validation";
                            };
                            readonly federationMember: {
                                readonly type: "string";
                                readonly description: "Federation or consortium this root belongs to (optional)";
                            };
                        };
                    };
                    readonly blockchainAnchoring: {
                        readonly type: "object";
                        readonly properties: {
                            readonly blockchainNetwork: {
                                readonly type: "string";
                                readonly examples: readonly ["cheqd-mainnet", "ethereum", "polygon", "hyperledger-indy"];
                                readonly description: "Blockchain network where this root is anchored";
                            };
                            readonly resourceId: {
                                readonly type: "string";
                                readonly description: "Blockchain resource ID for this root authority";
                            };
                            readonly registrationProof: {
                                readonly type: "string";
                                readonly description: "Cryptographic proof of blockchain registration";
                            };
                        };
                    };
                };
                readonly required: readonly ["id", "rootType", "scope", "trustChainPurpose", "governanceModel"];
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof of the root authority declaration";
            };
        };
    };
    readonly ServiceLevelAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/ServiceLevelAgreement";
        readonly title: "Service-Level Agreement (SLA) for OV Nodes";
        readonly description: "Defines minimum performance guarantees for nodes in the OV ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly nodeId: {
                readonly type: "string";
                readonly description: "DID of the Node.";
            };
            readonly namespaceId: {
                readonly type: "string";
                readonly description: "DID of the Namespace the node belongs to.";
            };
            readonly nodeType: {
                readonly type: "string";
                readonly enum: readonly ["Identity", "Storage", "Compute", "Verification"];
                readonly description: "The type of node operating under this SLA.";
            };
            readonly expectedUptime: {
                readonly type: "object";
                readonly properties: {
                    readonly minPercentage: {
                        readonly type: "number";
                        readonly description: "Minimum required uptime percentage (e.g., 99.9%).";
                    };
                    readonly measurementPeriod: {
                        readonly type: "string";
                        readonly description: "Time period over which uptime is measured (e.g., 30 days).";
                    };
                };
            };
            readonly latencyThresholds: {
                readonly type: "object";
                readonly properties: {
                    readonly maxResponseTime: {
                        readonly type: "number";
                        readonly description: "Maximum allowed response time (in milliseconds).";
                    };
                    readonly maxProcessingTime: {
                        readonly type: "number";
                        readonly description: "Maximum allowed compute processing time (in milliseconds).";
                    };
                };
            };
            readonly failureCompensation: {
                readonly type: "object";
                readonly properties: {
                    readonly financialPenalty: {
                        readonly type: "string";
                        readonly description: "Penalty applied if the Node fails SLA requirements (e.g., reduced staking rewards, service fees).";
                    };
                    readonly trustScoreImpact: {
                        readonly type: "number";
                        readonly description: "Negative impact on the Node’s trust score if SLA terms are violated.";
                    };
                    readonly downgradeStatus: {
                        readonly type: "boolean";
                        readonly description: "Whether the Node can be downgraded to a lower-tier role upon SLA violations.";
                    };
                };
                readonly description: "Defines penalties and consequences for failing to meet SLA obligations.";
            };
            readonly compensationIncentives: {
                readonly type: "object";
                readonly properties: {
                    readonly bonusForHighUptime: {
                        readonly type: "boolean";
                        readonly description: "Whether nodes get rewards for exceeding SLA targets.";
                    };
                    readonly feeReductions: {
                        readonly type: "boolean";
                        readonly description: "Whether nodes can receive reduced operational fees for high performance.";
                    };
                };
                readonly description: "Defines incentive mechanisms for high-performance Nodes.";
            };
            readonly complianceMonitoring: {
                readonly type: "object";
                readonly properties: {
                    readonly monitoringEntity: {
                        readonly type: "string";
                        readonly description: "DID of the entity monitoring SLA compliance.";
                    };
                    readonly auditFrequency: {
                        readonly type: "string";
                        readonly description: "How often the node is audited for SLA compliance (e.g., monthly, quarterly).";
                    };
                    readonly onChainLogging: {
                        readonly type: "boolean";
                        readonly description: "Whether compliance logs are recorded on-chain for transparency.";
                    };
                };
                readonly description: "Specifies how SLA compliance is monitored and enforced.";
            };
            readonly stakingRequirements: {
                readonly type: "object";
                readonly properties: {
                    readonly requiredStakeAmount: {
                        readonly type: "number";
                        readonly description: "Minimum amount of tokens staked to participate as a Node.";
                    };
                    readonly slashingConditions: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "Conditions under which staked tokens can be slashed (e.g., repeated SLA violations).";
                    };
                };
                readonly description: "Defines staking and collateral mechanisms for Nodes.";
            };
            readonly revocationPolicy: {
                readonly type: "object";
                readonly properties: {
                    readonly conditionsForRemoval: {
                        readonly type: "string";
                        readonly description: "Conditions under which a Node is removed from the Cluster.";
                    };
                    readonly gracePeriod: {
                        readonly type: "number";
                        readonly description: "Amount of time the Node has to fix compliance issues before removal.";
                    };
                    readonly appealProcess: {
                        readonly type: "string";
                        readonly description: "Procedure for a Node to challenge its removal from the Cluster.";
                    };
                };
                readonly description: "Defines rules for Node removal due to SLA non-compliance.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the Node operator has accepted the SLA.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "nodeId", "namespaceId", "nodeType", "expectedUptime", "latencyThresholds", "failureCompensation", "complianceMonitoring", "stakingRequirements", "revocationPolicy", "agreementSigned", "timestamp"];
    };
    readonly StorageNodeDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/StorageNodeDeclaration";
        readonly title: "Storage Node Declaration";
        readonly description: "Defines a Storage Node in an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the Storage Node.";
            };
            readonly type: {
                readonly const: "StorageNode";
                readonly description: "Node type.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster this node belongs to.";
            };
            readonly operator: {
                readonly type: "string";
                readonly description: "DID of the entity operating this node.";
            };
            readonly storageType: {
                readonly type: "string";
                readonly enum: readonly ["MinIO", "IPFS", "Arweave", "Verida"];
                readonly description: "Type of storage system used.";
            };
            readonly storageCapacity: {
                readonly type: "string";
                readonly description: "Storage capacity available (e.g., 1TB, 100GB).";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., Data, Metadata, ContentManifest).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "References to stored resources.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "suspended", "revoked"];
                readonly description: "Operational status of the node.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of node declaration.";
            };
        };
        readonly required: readonly ["id", "cluster", "operator", "storageType", "storageCapacity", "status", "timestamp"];
    };
    readonly TrustChainDelegation: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/TrustChainDelegation";
        readonly title: "Trust Chain Delegation";
        readonly description: "Verifiable delegation of trust authority from any root or trusted issuer to another entity in a trust chain.";
        readonly type: "object";
        readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject"];
        readonly properties: {
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["VerifiableCredential", "TrustChainDelegation"];
            };
            readonly issuer: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the delegating authority (root or trusted issuer)";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the delegating authority";
                    };
                    readonly authorityType: {
                        readonly type: "string";
                        readonly enum: readonly ["root", "trusted-issuer", "delegated-authority"];
                        readonly description: "Type of authority making the delegation";
                    };
                };
                readonly required: readonly ["id", "authorityType"];
            };
            readonly issuanceDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the delegation was issued";
            };
            readonly expirationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the delegation expires (optional)";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the entity receiving delegation";
                    };
                    readonly delegationType: {
                        readonly type: "string";
                        readonly enum: readonly ["trusted-issuer", "sub-root", "verifier", "validator"];
                        readonly description: "Type of delegation being granted";
                    };
                    readonly trustChainContext: {
                        readonly type: "object";
                        readonly properties: {
                            readonly rootAuthority: {
                                readonly type: "string";
                                readonly pattern: "^did:";
                                readonly description: "DID of the ultimate root authority in this chain";
                            };
                            readonly parentAuthority: {
                                readonly type: "string";
                                readonly pattern: "^did:";
                                readonly description: "DID of the immediate parent in delegation chain";
                            };
                            readonly chainDepth: {
                                readonly type: "integer";
                                readonly minimum: 1;
                                readonly description: "Depth in the trust chain (1 = direct from root)";
                            };
                            readonly namespace: {
                                readonly type: "string";
                                readonly description: "Namespace or domain scope of this delegation";
                            };
                        };
                        readonly required: readonly ["rootAuthority", "parentAuthority", "chainDepth"];
                    };
                    readonly delegatedAuthorities: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly authority: {
                                    readonly type: "string";
                                    readonly enum: readonly ["issue-credentials", "verify-credentials", "revoke-credentials", "delegate-authority", "update-schemas", "manage-trust-lists"];
                                    readonly description: "Specific authority being delegated";
                                };
                                readonly scope: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly description: "Credential types or schemas this authority applies to";
                                };
                                readonly conditions: {
                                    readonly type: "string";
                                    readonly description: "Conditions or limitations on this authority";
                                };
                            };
                            readonly required: readonly ["authority"];
                        };
                        readonly description: "Specific authorities being delegated";
                    };
                    readonly constraints: {
                        readonly type: "object";
                        readonly properties: {
                            readonly maxSubDelegations: {
                                readonly type: "integer";
                                readonly minimum: 0;
                                readonly description: "Maximum number of sub-delegations allowed";
                            };
                            readonly allowedDelegationTypes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Types of delegations this entity can make";
                            };
                            readonly geographicScope: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Geographic limitations on delegation scope";
                            };
                            readonly industryScope: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Industry or domain limitations";
                            };
                        };
                    };
                    readonly operationalRequirements: {
                        readonly type: "object";
                        readonly properties: {
                            readonly technicalStandards: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Technical standards the delegate must follow";
                            };
                            readonly auditRequirements: {
                                readonly type: "string";
                                readonly description: "Audit and compliance requirements";
                            };
                            readonly reportingRequirements: {
                                readonly type: "string";
                                readonly description: "Reporting obligations to delegating authority";
                            };
                            readonly insuranceRequirements: {
                                readonly type: "string";
                                readonly description: "Insurance or bonding requirements";
                            };
                        };
                    };
                    readonly revocationConditions: {
                        readonly type: "object";
                        readonly properties: {
                            readonly revocableBy: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "DIDs of entities that can revoke this delegation";
                            };
                            readonly revocationCriteria: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Conditions under which delegation can be revoked";
                            };
                            readonly appealProcess: {
                                readonly type: "string";
                                readonly description: "Process for appealing revocation decisions";
                            };
                        };
                    };
                };
                readonly required: readonly ["id", "delegationType", "trustChainContext", "delegatedAuthorities"];
            };
            readonly termsOfUse: {
                readonly type: "object";
                readonly properties: {
                    readonly delegationAgreement: {
                        readonly type: "string";
                        readonly description: "Reference to the delegation agreement document";
                    };
                    readonly governingLaw: {
                        readonly type: "string";
                        readonly description: "Legal jurisdiction governing this delegation";
                    };
                };
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof of the delegation";
            };
        };
    };
    readonly TrustDelegation: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/TrustEndorsement";
        readonly title: "Trust Delegation";
        readonly description: "Allows trusted users to endorse others, strengthening the trust economy.";
        readonly type: "object";
        readonly properties: {
            readonly endorser: {
                readonly type: "string";
                readonly description: "DID of the user endorsing another user.";
            };
            readonly recipient: {
                readonly type: "string";
                readonly description: "DID of the endorsed user.";
            };
            readonly endorsementReason: {
                readonly type: "string";
                readonly description: "Why the user is being endorsed.";
            };
            readonly endorsementType: {
                readonly type: "string";
                readonly enum: readonly ["verification", "governance", "community", "development"];
                readonly description: "Category of the endorsement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time when the endorsement was given.";
            };
            readonly linkedGem: {
                readonly type: "string";
                readonly description: "The Gem that qualifies the endorser to give this endorsement.";
            };
            readonly linkedCredential: {
                readonly type: "string";
                readonly description: "DID-Linked Resource to a Verifiable Credential supporting the endorsement.";
            };
        };
        readonly required: readonly ["endorser", "recipient", "endorsementReason", "endorsementType", "timestamp", "linkedGem", "linkedCredential"];
    };
    readonly TrustedIssuer: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/TrustedIssuer";
        readonly title: "Trusted Issuer Accreditation";
        readonly description: "Verifiable Accreditation for trusted issuers within any trust chain, following cheqd DTC patterns for namespace-based trust hierarchies.";
        readonly type: "object";
        readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject", "termsOfUse"];
        readonly properties: {
            readonly "@context": {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
            };
            readonly type: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["VerifiableCredential", "VerifiableAccreditation", "TrustedIssuerAccreditation"];
            };
            readonly issuer: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the issuing authority - could be any namespace root, platform root, or user root";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the issuing authority";
                    };
                    readonly rootType: {
                        readonly type: "string";
                        readonly enum: readonly ["namespace", "platform", "user", "organization", "community", "concept"];
                        readonly description: "Type of root authority issuing this accreditation";
                    };
                };
                readonly required: readonly ["id"];
            };
            readonly issuanceDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the accreditation was issued";
            };
            readonly expirationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the accreditation expires";
            };
            readonly credentialSubject: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly pattern: "^did:";
                        readonly description: "DID of the accredited trusted issuer";
                    };
                    readonly accreditedFor: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly namespaceId: {
                                    readonly type: "string";
                                    readonly description: "Namespace or domain for which the issuer is accredited";
                                    readonly examples: readonly ["originvault.box", "content-authenticity", "user-reputation", "platform-governance"];
                                };
                                readonly schemaId: {
                                    readonly type: "string";
                                    readonly description: "Schema ID for which the issuer is accredited";
                                    readonly examples: readonly ["did:cheqd:testnet:8ea036da-f340-480d-8952-f5561ea1763c/resources/b10146d7-0d0f-41e0-8ee3-c76db64890be", "https://schemas.originvault.box/ContentAuthenticityCredential"];
                                };
                                readonly types: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly description: "Credential types the issuer can issue";
                                    readonly examples: readonly [readonly ["VerifiableCredential", "VerifiableAccreditation"], readonly ["VerifiableCredential", "ContentAuthenticityCredential"]];
                                };
                                readonly limitJurisdiction: {
                                    readonly type: "string";
                                    readonly description: "Geographic or regulatory restriction (optional)";
                                    readonly examples: readonly ["https://publications.europa.eu/resource/authority/atu/FIN", "https://publications.europa.eu/resource/authority/atu/USA"];
                                };
                                readonly validUntil: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Expiration date of this specific accreditation";
                                };
                            };
                            readonly required: readonly ["namespaceId", "schemaId", "types"];
                        };
                        readonly description: "List of accreditations granted to this issuer";
                    };
                    readonly trustLevel: {
                        readonly type: "string";
                        readonly enum: readonly ["bronze", "silver", "gold", "platinum"];
                        readonly description: "Trust level assigned within this trust chain";
                    };
                    readonly blockchainResourceId: {
                        readonly type: "string";
                        readonly description: "DID-Linked Resource ID on blockchain (cheqd, ethereum, etc.)";
                    };
                };
                readonly required: readonly ["id", "accreditedFor"];
            };
            readonly termsOfUse: {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly const: "AccreditationPolicy";
                        readonly description: "Must be AccreditationPolicy per cheqd DTC spec";
                    };
                    readonly parentAccreditation: {
                        readonly type: "string";
                        readonly description: "DID URL of the parent accreditation in the trust chain (if not a root)";
                        readonly examples: readonly ["did:cheqd:mainnet:namespace-root/resources/18de60ec-bed1-42e5-980c-601c432bc60b", "did:ethr:platform-authority/resources/platform-root-authorization"];
                    };
                    readonly rootAuthorisation: {
                        readonly type: "string";
                        readonly description: "DID URL of the root authority for this trust chain";
                        readonly examples: readonly ["did:ov:namespace-root/resources/originvault-namespace-authorization", "did:cheqd:community-root/resources/community-governance-authorization", "did:ethr:platform-root/resources/platform-authority-authorization"];
                    };
                    readonly trustChainScope: {
                        readonly type: "string";
                        readonly description: "Scope or purpose of this trust chain";
                        readonly examples: readonly ["content-authenticity", "user-reputation", "platform-governance", "community-trust", "data-provenance"];
                    };
                    readonly governanceFramework: {
                        readonly type: "string";
                        readonly description: "Reference to governance policies for this trust chain";
                    };
                };
                readonly required: readonly ["type", "rootAuthorisation", "trustChainScope"];
            };
            readonly proof: {
                readonly type: "object";
                readonly description: "Cryptographic proof of the accreditation";
            };
        };
    };
    readonly TrustGate: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/TrustGate";
        readonly title: "Trust Gate";
        readonly description: "Defines access rules based on Gems and Verifiable Credentials.";
        readonly type: "object";
        readonly properties: {
            readonly resource: {
                readonly type: "string";
                readonly description: "The DID or URL of the resource being accessed.";
            };
            readonly requiredTrustLevel: {
                readonly type: "number";
                readonly minimum: 0;
                readonly description: "Minimum trust score required for access.";
            };
            readonly requiredGems: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of required Gems for access.";
            };
            readonly requiredCredentials: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of required Verifiable Credentials for access.";
            };
            readonly accessPolicy: {
                readonly type: "string";
                readonly enum: readonly ["public", "restricted", "private"];
                readonly description: "Whether access is open, trust-restricted, or fully private.";
            };
        };
        readonly required: readonly ["resource", "requiredTrustLevel", "requiredGems", "requiredCredentials", "accessPolicy"];
    };
    readonly TrustScore: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/TrustScore";
        readonly title: "Trust Score";
        readonly description: "Represents a calculated trust score for a DID based on blockchain accreditations and local endorsements.";
        readonly type: "object";
        readonly properties: {
            readonly did: {
                readonly type: "string";
                readonly description: "DID of the entity being scored";
                readonly pattern: "^did:";
            };
            readonly score: {
                readonly type: "number";
                readonly minimum: 0;
                readonly maximum: 100;
                readonly description: "Overall trust score (0-100)";
            };
            readonly factors: {
                readonly type: "object";
                readonly properties: {
                    readonly accreditations: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score contribution from blockchain accreditations";
                    };
                    readonly endorsements: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score contribution from local endorsements";
                    };
                    readonly timeWeighted: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score contribution from recent activity";
                    };
                    readonly networkEffects: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score contribution from network diversity";
                    };
                    readonly blockchainTrust: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly description: "Score contribution from blockchain-based trust indicators";
                    };
                };
                readonly required: readonly ["accreditations", "endorsements", "timeWeighted", "networkEffects", "blockchainTrust"];
                readonly description: "Breakdown of trust score factors";
            };
            readonly lastCalculated: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "When the score was last calculated";
            };
            readonly decay: {
                readonly type: "number";
                readonly minimum: 0;
                readonly maximum: 1;
                readonly description: "Score decay factor (0 = no decay, 1 = full decay)";
            };
            readonly blockchainSync: {
                readonly type: "object";
                readonly properties: {
                    readonly lastSynced: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Last time score was synced with blockchain";
                    };
                    readonly pendingChanges: {
                        readonly type: "boolean";
                        readonly description: "Whether there are local changes not yet pushed to blockchain";
                    };
                    readonly blockchainResourceId: {
                        readonly type: "string";
                        readonly description: "Resource ID on blockchain for this trust score";
                    };
                };
                readonly description: "Blockchain synchronization status";
            };
            readonly metadata: {
                readonly type: "object";
                readonly description: "Additional metadata for the trust score";
            };
        };
        readonly required: readonly ["did", "score", "factors", "lastCalculated", "decay"];
    };
    readonly TsconfigJson: {
        readonly $schema: "http://json-schema.org/draft-04/schema#";
        readonly allowTrailingCommas: true;
        readonly allOf: readonly [{
            readonly $ref: "#/definitions/compilerOptionsDefinition";
        }, {
            readonly $ref: "#/definitions/compileOnSaveDefinition";
        }, {
            readonly $ref: "#/definitions/typeAcquisitionDefinition";
        }, {
            readonly $ref: "#/definitions/extendsDefinition";
        }, {
            readonly $ref: "#/definitions/watchOptionsDefinition";
        }, {
            readonly $ref: "#/definitions/buildOptionsDefinition";
        }, {
            readonly $ref: "#/definitions/tsNodeDefinition";
        }, {
            readonly anyOf: readonly [{
                readonly $ref: "#/definitions/filesDefinition";
            }, {
                readonly $ref: "#/definitions/excludeDefinition";
            }, {
                readonly $ref: "#/definitions/includeDefinition";
            }, {
                readonly $ref: "#/definitions/referencesDefinition";
            }];
        }];
        readonly definitions: {
            readonly "//": {
                readonly explainer: "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#overview";
                readonly reference: "https://www.typescriptlang.org/tsconfig";
                readonly "reference metadata": "https://github.com/microsoft/TypeScript-Website/blob/v2/packages/tsconfig-reference/scripts/tsconfigRules.ts";
            };
            readonly filesDefinition: {
                readonly properties: {
                    readonly files: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly description: "If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.";
                        readonly type: readonly ["array", "null"];
                        readonly uniqueItems: true;
                        readonly items: {
                            readonly type: readonly ["string", "null"];
                        };
                    };
                };
            };
            readonly excludeDefinition: {
                readonly properties: {
                    readonly exclude: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly description: "Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.";
                        readonly type: readonly ["array", "null"];
                        readonly uniqueItems: true;
                        readonly items: {
                            readonly type: readonly ["string", "null"];
                        };
                    };
                };
            };
            readonly includeDefinition: {
                readonly properties: {
                    readonly include: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly description: "Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.";
                        readonly type: readonly ["array", "null"];
                        readonly uniqueItems: true;
                        readonly items: {
                            readonly type: readonly ["string", "null"];
                        };
                    };
                };
            };
            readonly compileOnSaveDefinition: {
                readonly properties: {
                    readonly compileOnSave: {
                        readonly description: "Enable Compile-on-Save for this project.";
                        readonly type: readonly ["boolean", "null"];
                    };
                };
            };
            readonly extendsDefinition: {
                readonly properties: {
                    readonly extends: {
                        readonly description: "Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).";
                        readonly oneOf: readonly [{
                            readonly default: "";
                            readonly type: "string";
                        }, {
                            readonly default: readonly [];
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly type: "array";
                        }];
                    };
                };
            };
            readonly buildOptionsDefinition: {
                readonly properties: {
                    readonly buildOptions: {
                        readonly properties: {
                            readonly dry: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "~";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                            };
                            readonly force: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Build all projects, including those that appear to be up to date";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Build all projects, including those that appear to be up to date\n\nSee more: https://www.typescriptlang.org/tsconfig#force";
                            };
                            readonly verbose: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable verbose logging";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable verbose logging\n\nSee more: https://www.typescriptlang.org/tsconfig#verbose";
                            };
                            readonly incremental: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Save .tsbuildinfo files to allow for incremental compilation of projects.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Save .tsbuildinfo files to allow for incremental compilation of projects.\n\nSee more: https://www.typescriptlang.org/tsconfig#incremental";
                            };
                            readonly assumeChangesOnlyAffectDirectDependencies: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.\n\nSee more: https://www.typescriptlang.org/tsconfig#assumeChangesOnlyAffectDirectDependencies";
                            };
                            readonly traceResolution: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Log paths used during the `moduleResolution` process.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Log paths used during the `moduleResolution` process.\n\nSee more: https://www.typescriptlang.org/tsconfig#traceResolution";
                            };
                        };
                    };
                };
            };
            readonly watchOptionsDefinition: {
                readonly properties: {
                    readonly watchOptions: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly type: readonly ["object", "null"];
                        readonly description: "Settings for the watch mode in TypeScript.";
                        readonly properties: {
                            readonly force: {
                                readonly description: "~";
                                readonly type: readonly ["string", "null"];
                            };
                            readonly watchFile: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify how the TypeScript watch mode works.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify how the TypeScript watch mode works.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchFile";
                            };
                            readonly watchDirectory: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify how directories are watched on systems that lack recursive file-watching functionality.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify how directories are watched on systems that lack recursive file-watching functionality.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchDirectory";
                            };
                            readonly fallbackPolling: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify what approach the watcher should use if the system runs out of native file watchers.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify what approach the watcher should use if the system runs out of native file watchers.\n\nSee more: https://www.typescriptlang.org/tsconfig#fallbackPolling";
                            };
                            readonly synchronousWatchDirectory: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.\n\nSee more: https://www.typescriptlang.org/tsconfig#synchronousWatchDirectory";
                            };
                            readonly excludeFiles: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Remove a list of files from the watch mode's processing.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Remove a list of files from the watch mode's processing.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeFiles";
                            };
                            readonly excludeDirectories: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Remove a list of directories from the watch process.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Remove a list of directories from the watch process.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeDirectories";
                            };
                        };
                    };
                };
            };
            readonly compilerOptionsDefinition: {
                readonly properties: {
                    readonly compilerOptions: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly type: readonly ["object", "null"];
                        readonly description: "Instructs the TypeScript compiler how to compile .ts files.";
                        readonly properties: {
                            readonly allowArbitraryExtensions: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable importing files with any extension, provided a declaration file is present.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Enable importing files with any extension, provided a declaration file is present.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowArbitraryExtensions";
                            };
                            readonly allowImportingTsExtensions: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions";
                            };
                            readonly charset: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "No longer supported. In early versions, manually set the text encoding for reading files.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "No longer supported. In early versions, manually set the text encoding for reading files.\n\nSee more: https://www.typescriptlang.org/tsconfig#charset";
                            };
                            readonly composite: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable constraints that allow a TypeScript project to be used with project references.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: true;
                                readonly markdownDescription: "Enable constraints that allow a TypeScript project to be used with project references.\n\nSee more: https://www.typescriptlang.org/tsconfig#composite";
                            };
                            readonly customConditions: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Conditions to set in addition to the resolver-specific defaults when resolving imports.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Conditions to set in addition to the resolver-specific defaults when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#customConditions";
                            };
                            readonly declaration: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Generate .d.ts files from TypeScript and JavaScript files in your project.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Generate .d.ts files from TypeScript and JavaScript files in your project.\n\nSee more: https://www.typescriptlang.org/tsconfig#declaration";
                            };
                            readonly declarationDir: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the output directory for generated declaration files.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the output directory for generated declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationDir";
                            };
                            readonly diagnostics: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Output compiler performance information after building.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Output compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#diagnostics";
                            };
                            readonly disableReferencedProjectLoad: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Reduce the number of projects loaded automatically by TypeScript.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Reduce the number of projects loaded automatically by TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableReferencedProjectLoad";
                            };
                            readonly noPropertyAccessFromIndexSignature: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enforces using indexed accessors for keys declared using an indexed type";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Enforces using indexed accessors for keys declared using an indexed type\n\nSee more: https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature";
                            };
                            readonly emitBOM: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitBOM";
                            };
                            readonly emitDeclarationOnly: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Only output d.ts files and not JavaScript files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Only output d.ts files and not JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDeclarationOnly";
                            };
                            readonly erasableSyntaxOnly: {
                                readonly description: "Do not allow runtime constructs that are not part of ECMAScript.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Do not allow runtime constructs that are not part of ECMAScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly";
                            };
                            readonly exactOptionalPropertyTypes: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Differentiate between undefined and not present when type checking";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Differentiate between undefined and not present when type checking\n\nSee more: https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes";
                            };
                            readonly incremental: {
                                readonly description: "Enable incremental compilation. Requires TypeScript version 3.4 or later.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly tsBuildInfoFile: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the folder for .tsbuildinfo incremental compilation files.";
                                readonly default: ".tsbuildinfo";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the folder for .tsbuildinfo incremental compilation files.\n\nSee more: https://www.typescriptlang.org/tsconfig#tsBuildInfoFile";
                            };
                            readonly inlineSourceMap: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Include sourcemap files inside the emitted JavaScript.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Include sourcemap files inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSourceMap";
                            };
                            readonly inlineSources: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Include source code in the sourcemaps inside the emitted JavaScript.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Include source code in the sourcemaps inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSources";
                            };
                            readonly jsx: {
                                readonly description: "Specify what JSX code is generated.";
                                readonly enum: readonly ["preserve", "react", "react-jsx", "react-jsxdev", "react-native"];
                            };
                            readonly reactNamespace: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "React";
                                readonly markdownDescription: "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.\n\nSee more: https://www.typescriptlang.org/tsconfig#reactNamespace";
                            };
                            readonly jsxFactory: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'";
                                readonly type: readonly ["string", "null"];
                                readonly default: "React.createElement";
                                readonly markdownDescription: "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFactory";
                            };
                            readonly jsxFragmentFactory: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "React.Fragment";
                                readonly markdownDescription: "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFragmentFactory";
                            };
                            readonly jsxImportSource: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "react";
                                readonly markdownDescription: "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxImportSource";
                            };
                            readonly listFiles: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Print all of the files read during the compilation.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Print all of the files read during the compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listFiles";
                            };
                            readonly mapRoot: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the location where debugger should locate map files instead of generated locations.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the location where debugger should locate map files instead of generated locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#mapRoot";
                            };
                            readonly module: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify what module code is generated.";
                                readonly type: readonly ["string", "null"];
                                readonly anyOf: readonly [{
                                    readonly enum: readonly ["CommonJS", "AMD", "System", "UMD", "ES6", "ES2015", "ES2020", "ESNext", "None", "ES2022", "Node16", "Node18", "NodeNext", "Preserve"];
                                }, {
                                    readonly pattern: "^([Cc][Oo][Mm][Mm][Oo][Nn][Jj][Ss]|[AaUu][Mm][Dd]|[Ss][Yy][Ss][Tt][Ee][Mm]|[Ee][Ss]([356]|20(1[567]|2[02])|[Nn][Ee][Xx][Tt])|[Nn][Oo][dD][Ee]1[68]|[Nn][Oo][Dd][Ee][Nn][Ee][Xx][Tt]|[Nn][Oo][Nn][Ee]|[Pp][Rr][Ee][Ss][Ee][Rr][Vv][Ee])$";
                                }];
                                readonly markdownDescription: "Specify what module code is generated.\n\nSee more: https://www.typescriptlang.org/tsconfig#module";
                            };
                            readonly moduleResolution: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify how TypeScript looks up a file from a given module specifier.";
                                readonly type: readonly ["string", "null"];
                                readonly anyOf: readonly [{
                                    readonly enum: readonly ["classic", "node", "node10", "node16", "nodenext", "bundler"];
                                    readonly markdownEnumDescriptions: readonly ["It’s recommended to use `\"node16\"` instead", "Deprecated, use `\"node10\"` in TypeScript 5.0+ instead", "It’s recommended to use `\"node16\"` instead", "This is the recommended setting for libraries and Node.js applications", "This is the recommended setting for libraries and Node.js applications", "This is the recommended setting in TypeScript 5.0+ for applications that use a bundler"];
                                }, {
                                    readonly pattern: "^(([Nn]ode)|([Nn]ode1[06])|([Nn]ode[Nn]ext)|([Cc]lassic)|([Bb]undler))$";
                                }];
                                readonly markdownDescription: "Specify how TypeScript looks up a file from a given module specifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#moduleResolution";
                            };
                            readonly newLine: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Set the newline character for emitting files.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "lf";
                                readonly anyOf: readonly [{
                                    readonly enum: readonly ["crlf", "lf"];
                                }, {
                                    readonly pattern: "^(CRLF|LF|crlf|lf)$";
                                }];
                                readonly markdownDescription: "Set the newline character for emitting files.\n\nSee more: https://www.typescriptlang.org/tsconfig#newLine";
                            };
                            readonly noEmit: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable emitting file from a compilation.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable emitting file from a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmit";
                            };
                            readonly noEmitHelpers: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable generating custom helper functions like `__extends` in compiled output.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable generating custom helper functions like `__extends` in compiled output.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitHelpers";
                            };
                            readonly noEmitOnError: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable emitting files if any type checking errors are reported.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable emitting files if any type checking errors are reported.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitOnError";
                            };
                            readonly noImplicitAny: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting for expressions and declarations with an implied `any` type..";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Enable error reporting for expressions and declarations with an implied `any` type..\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitAny";
                            };
                            readonly noImplicitThis: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting when `this` is given the type `any`.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Enable error reporting when `this` is given the type `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitThis";
                            };
                            readonly noUnusedLocals: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting when a local variable isn't read.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable error reporting when a local variable isn't read.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedLocals";
                            };
                            readonly noUnusedParameters: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Raise an error when a function parameter isn't read";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Raise an error when a function parameter isn't read\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedParameters";
                            };
                            readonly noLib: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable including any library files, including the default lib.d.ts.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable including any library files, including the default lib.d.ts.\n\nSee more: https://www.typescriptlang.org/tsconfig#noLib";
                            };
                            readonly noResolve: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.\n\nSee more: https://www.typescriptlang.org/tsconfig#noResolve";
                            };
                            readonly noStrictGenericChecks: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable strict checking of generic signatures in function types.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable strict checking of generic signatures in function types.\n\nSee more: https://www.typescriptlang.org/tsconfig#noStrictGenericChecks";
                            };
                            readonly skipDefaultLibCheck: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Skip type checking .d.ts files that are included with TypeScript.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Skip type checking .d.ts files that are included with TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipDefaultLibCheck";
                            };
                            readonly skipLibCheck: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Skip type checking all .d.ts files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Skip type checking all .d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipLibCheck";
                            };
                            readonly outFile: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.\n\nSee more: https://www.typescriptlang.org/tsconfig#outFile";
                            };
                            readonly outDir: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify an output folder for all emitted files.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify an output folder for all emitted files.\n\nSee more: https://www.typescriptlang.org/tsconfig#outDir";
                            };
                            readonly preserveConstEnums: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable erasing `const enum` declarations in generated code.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable erasing `const enum` declarations in generated code.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveConstEnums";
                            };
                            readonly preserveSymlinks: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable resolving symlinks to their realpath. This correlates to the same flag in node.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable resolving symlinks to their realpath. This correlates to the same flag in node.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveSymlinks";
                            };
                            readonly preserveValueImports: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Preserve unused imported values in the JavaScript output that would otherwise be removed";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Preserve unused imported values in the JavaScript output that would otherwise be removed\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveValueImports";
                            };
                            readonly preserveWatchOutput: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable wiping the console in watch mode";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Disable wiping the console in watch mode\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveWatchOutput";
                            };
                            readonly pretty: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable color and formatting in output to make compiler errors easier to read";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: true;
                                readonly markdownDescription: "Enable color and formatting in output to make compiler errors easier to read\n\nSee more: https://www.typescriptlang.org/tsconfig#pretty";
                            };
                            readonly removeComments: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable emitting comments.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable emitting comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#removeComments";
                            };
                            readonly rewriteRelativeImportExtensions: {
                                readonly description: "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rewriteRelativeImportExtensions";
                            };
                            readonly rootDir: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the root folder within your source files.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the root folder within your source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDir";
                            };
                            readonly isolatedModules: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Ensure that each file can be safely transpiled without relying on other imports.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Ensure that each file can be safely transpiled without relying on other imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedModules";
                            };
                            readonly sourceMap: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Create source map files for emitted JavaScript files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Create source map files for emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceMap";
                            };
                            readonly sourceRoot: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the root path for debuggers to find the reference source code.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the root path for debuggers to find the reference source code.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceRoot";
                            };
                            readonly suppressExcessPropertyErrors: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable reporting of excess property errors during the creation of object literals.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable reporting of excess property errors during the creation of object literals.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressExcessPropertyErrors";
                            };
                            readonly suppressImplicitAnyIndexErrors: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors";
                            };
                            readonly stripInternal: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable emitting declarations that have `@internal` in their JSDoc comments.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Disable emitting declarations that have `@internal` in their JSDoc comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#stripInternal";
                            };
                            readonly target: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "ES3";
                                readonly anyOf: readonly [{
                                    readonly enum: readonly ["ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ES2023", "ES2024", "ESNext"];
                                }, {
                                    readonly pattern: "^([Ee][Ss]([356]|(20(1[56789]|2[01234]))|[Nn][Ee][Xx][Tt]))$";
                                }];
                                readonly markdownDescription: "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.\n\nSee more: https://www.typescriptlang.org/tsconfig#target";
                            };
                            readonly useUnknownInCatchVariables: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Default catch clause variables as `unknown` instead of `any`.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Default catch clause variables as `unknown` instead of `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables";
                            };
                            readonly watch: {
                                readonly description: "Watch input files.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly fallbackPolling: {
                                readonly description: "Specify the polling strategy to use when the system runs out of or doesn't support native file watchers. Requires TypeScript version 3.8 or later.";
                                readonly enum: readonly ["fixedPollingInterval", "priorityPollingInterval", "dynamicPriorityPolling", "fixedInterval", "priorityInterval", "dynamicPriority", "fixedChunkSize"];
                            };
                            readonly watchDirectory: {
                                readonly description: "Specify the strategy for watching directories under systems that lack recursive file-watching functionality. Requires TypeScript version 3.8 or later.";
                                readonly enum: readonly ["useFsEvents", "fixedPollingInterval", "dynamicPriorityPolling", "fixedChunkSizePolling"];
                                readonly default: "useFsEvents";
                            };
                            readonly watchFile: {
                                readonly description: "Specify the strategy for watching individual files. Requires TypeScript version 3.8 or later.";
                                readonly enum: readonly ["fixedPollingInterval", "priorityPollingInterval", "dynamicPriorityPolling", "useFsEvents", "useFsEventsOnParentDirectory", "fixedChunkSizePolling"];
                                readonly default: "useFsEvents";
                            };
                            readonly experimentalDecorators: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable experimental support for TC39 stage 2 draft decorators.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Enable experimental support for TC39 stage 2 draft decorators.\n\nSee more: https://www.typescriptlang.org/tsconfig#experimentalDecorators";
                            };
                            readonly emitDecoratorMetadata: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit design-type metadata for decorated declarations in source files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Emit design-type metadata for decorated declarations in source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata";
                            };
                            readonly allowUnusedLabels: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable error reporting for unused labels.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Disable error reporting for unused labels.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnusedLabels";
                            };
                            readonly noImplicitReturns: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting for codepaths that do not explicitly return in a function.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable error reporting for codepaths that do not explicitly return in a function.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitReturns";
                            };
                            readonly noUncheckedIndexedAccess: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Add `undefined` to a type when accessed using an index.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Add `undefined` to a type when accessed using an index.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess";
                            };
                            readonly noFallthroughCasesInSwitch: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting for fallthrough cases in switch statements.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable error reporting for fallthrough cases in switch statements.\n\nSee more: https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch";
                            };
                            readonly noImplicitOverride: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Ensure overriding members in derived classes are marked with an override modifier.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Ensure overriding members in derived classes are marked with an override modifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitOverride";
                            };
                            readonly allowUnreachableCode: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable error reporting for unreachable code.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Disable error reporting for unreachable code.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnreachableCode";
                            };
                            readonly forceConsistentCasingInFileNames: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Ensure that casing is correct in imports.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: true;
                                readonly markdownDescription: "Ensure that casing is correct in imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames";
                            };
                            readonly generateCpuProfile: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit a v8 CPU profile of the compiler run for debugging.";
                                readonly type: readonly ["string", "null"];
                                readonly default: "profile.cpuprofile";
                                readonly markdownDescription: "Emit a v8 CPU profile of the compiler run for debugging.\n\nSee more: https://www.typescriptlang.org/tsconfig#generateCpuProfile";
                            };
                            readonly baseUrl: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the base directory to resolve non-relative module names.";
                                readonly type: readonly ["string", "null"];
                                readonly markdownDescription: "Specify the base directory to resolve non-relative module names.\n\nSee more: https://www.typescriptlang.org/tsconfig#baseUrl";
                            };
                            readonly paths: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify a set of entries that re-map imports to additional lookup locations.";
                                readonly type: readonly ["object", "null"];
                                readonly additionalProperties: {
                                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                    readonly type: readonly ["array", "null"];
                                    readonly uniqueItems: true;
                                    readonly items: {
                                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Path mapping to be computed relative to baseUrl option.";
                                    };
                                };
                                readonly markdownDescription: "Specify a set of entries that re-map imports to additional lookup locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#paths";
                            };
                            readonly plugins: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify a list of language service plugins to include.";
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                    readonly type: readonly ["object", "null"];
                                    readonly properties: {
                                        readonly name: {
                                            readonly description: "Plugin name.";
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                };
                                readonly markdownDescription: "Specify a list of language service plugins to include.\n\nSee more: https://www.typescriptlang.org/tsconfig#plugins";
                            };
                            readonly rootDirs: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow multiple folders to be treated as one when resolving modules.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Allow multiple folders to be treated as one when resolving modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDirs";
                            };
                            readonly typeRoots: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify multiple folders that act like `./node_modules/@types`.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Specify multiple folders that act like `./node_modules/@types`.\n\nSee more: https://www.typescriptlang.org/tsconfig#typeRoots";
                            };
                            readonly types: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify type package names to be included without being referenced in a source file.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly markdownDescription: "Specify type package names to be included without being referenced in a source file.\n\nSee more: https://www.typescriptlang.org/tsconfig#types";
                            };
                            readonly traceResolution: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable tracing of the name resolution process. Requires TypeScript version 2.0 or later.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                            };
                            readonly allowJs: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowJs";
                            };
                            readonly noErrorTruncation: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable truncating types in error messages.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable truncating types in error messages.\n\nSee more: https://www.typescriptlang.org/tsconfig#noErrorTruncation";
                            };
                            readonly allowSyntheticDefaultImports: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow 'import x from y' when a module doesn't have a default export.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Allow 'import x from y' when a module doesn't have a default export.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports";
                            };
                            readonly noImplicitUseStrict: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable adding 'use strict' directives in emitted JavaScript files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable adding 'use strict' directives in emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitUseStrict";
                            };
                            readonly listEmittedFiles: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Print the names of emitted files after a compilation.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Print the names of emitted files after a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listEmittedFiles";
                            };
                            readonly disableSizeLimit: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSizeLimit";
                            };
                            readonly lib: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify a set of bundled library declaration files that describe the target runtime environment.";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                    readonly type: readonly ["string", "null"];
                                    readonly anyOf: readonly [{
                                        readonly enum: readonly ["ES5", "ES6", "ES2015", "ES2015.Collection", "ES2015.Core", "ES2015.Generator", "ES2015.Iterable", "ES2015.Promise", "ES2015.Proxy", "ES2015.Reflect", "ES2015.Symbol.WellKnown", "ES2015.Symbol", "ES2016", "ES2016.Array.Include", "ES2017", "ES2017.Intl", "ES2017.Object", "ES2017.SharedMemory", "ES2017.String", "ES2017.TypedArrays", "ES2017.ArrayBuffer", "ES2018", "ES2018.AsyncGenerator", "ES2018.AsyncIterable", "ES2018.Intl", "ES2018.Promise", "ES2018.Regexp", "ES2019", "ES2019.Array", "ES2019.Intl", "ES2019.Object", "ES2019.String", "ES2019.Symbol", "ES2020", "ES2020.BigInt", "ES2020.Promise", "ES2020.String", "ES2020.Symbol.WellKnown", "ESNext", "ESNext.Array", "ESNext.AsyncIterable", "ESNext.BigInt", "ESNext.Collection", "ESNext.Intl", "ESNext.Object", "ESNext.Promise", "ESNext.Regexp", "ESNext.String", "ESNext.Symbol", "DOM", "DOM.AsyncIterable", "DOM.Iterable", "ScriptHost", "WebWorker", "WebWorker.AsyncIterable", "WebWorker.ImportScripts", "Webworker.Iterable", "ES7", "ES2021", "ES2020.SharedMemory", "ES2020.Intl", "ES2020.Date", "ES2020.Number", "ES2021.Promise", "ES2021.String", "ES2021.WeakRef", "ESNext.WeakRef", "ES2021.Intl", "ES2022", "ES2022.Array", "ES2022.Error", "ES2022.Intl", "ES2022.Object", "ES2022.String", "ES2022.SharedMemory", "ES2022.RegExp", "ES2023", "ES2023.Array", "ES2024", "ES2024.ArrayBuffer", "ES2024.Collection", "ES2024.Object", "ES2024.Promise", "ES2024.Regexp", "ES2024.SharedMemory", "ES2024.String", "Decorators", "Decorators.Legacy", "ES2017.Date", "ES2023.Collection", "ESNext.Decorators", "ESNext.Disposable"];
                                    }, {
                                        readonly pattern: "^[Ee][Ss]5|[Ee][Ss]6|[Ee][Ss]7$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2015(\\.([Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Oo][Rr][Ee]|[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Pp][Rr][Oo][Xx][Yy]|[Rr][Ee][Ff][Ll][Ee][Cc][Tt]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2016(\\.[Aa][Rr][Rr][Aa][Yy]\\.[Ii][Nn][Cc][Ll][Uu][Dd][Ee])?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2017(\\.([Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Tt][Yy][Pp][Ee][Dd][Aa][Rr][Rr][Aa][Yy][Ss]|[Dd][Aa][Tt][Ee]|[Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2018(\\.([Aa][Ss][Yy][Nn][Cc][Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2019(\\.([Aa][Rr][Rr][Aa][Yy]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2020(\\.([Bb][Ii][Gg][Ii][Nn][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ii][Nn][Tt][Ll]|[Dd][Aa][Tt][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2021(\\.([Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2022(\\.([Aa][Rr][Rr][Aa][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2023(\\.([Aa][Rr][Rr][Aa][Yy]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss]2024(\\.([Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]))?$";
                                    }, {
                                        readonly pattern: "^[Ee][Ss][Nn][Ee][Xx][Tt](\\.([Aa][Rr][Rr][Aa][Yy]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Bb][Ii][Gg][Ii][Nn][Tt]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]|[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss]|[Dd][Ii][Ss][Pp][Oo][Ss][Aa][Bb][Ll][Ee]))?$";
                                    }, {
                                        readonly pattern: "^[Dd][Oo][Mm](\\.([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee])?$";
                                    }, {
                                        readonly pattern: "^[Ss][Cc][Rr][Ii][Pp][Tt][Hh][Oo][Ss][Tt]$";
                                    }, {
                                        readonly pattern: "^[Ww][Ee][Bb][Ww][Oo][Rr][Kk][Ee][Rr](\\.([Ii][Mm][Pp][Oo][Rr][Tt][Ss][Cc][Rr][Ii][Pp][Tt][Ss]|([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]))?$";
                                    }, {
                                        readonly pattern: "^[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss](\\.([Ll][Ee][Gg][Aa][Cc][Yy]))?$";
                                    }];
                                };
                                readonly markdownDescription: "Specify a set of bundled library declaration files that describe the target runtime environment.\n\nSee more: https://www.typescriptlang.org/tsconfig#lib";
                            };
                            readonly libReplacement: {
                                readonly description: "Enable lib replacement.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: true;
                                readonly markdownDescription: "Enable lib replacement.\n\nSee more: https://www.typescriptlang.org/tsconfig#libReplacement";
                            };
                            readonly moduleDetection: {
                                readonly description: "Specify how TypeScript determine a file as module.";
                                readonly enum: readonly ["auto", "legacy", "force"];
                            };
                            readonly strictNullChecks: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "When type checking, take into account `null` and `undefined`.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "When type checking, take into account `null` and `undefined`.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictNullChecks";
                            };
                            readonly maxNodeModuleJsDepth: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.";
                                readonly type: readonly ["number", "null"];
                                readonly default: 0;
                                readonly markdownDescription: "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.\n\nSee more: https://www.typescriptlang.org/tsconfig#maxNodeModuleJsDepth";
                            };
                            readonly importHelpers: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow importing helper functions from tslib once per project, instead of including them per-file.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Allow importing helper functions from tslib once per project, instead of including them per-file.\n\nSee more: https://www.typescriptlang.org/tsconfig#importHelpers";
                            };
                            readonly importsNotUsedAsValues: {
                                readonly description: "Specify emit/checking behavior for imports that are only used for types.";
                                readonly default: "remove";
                                readonly enum: readonly ["remove", "preserve", "error"];
                            };
                            readonly alwaysStrict: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Ensure 'use strict' is always emitted.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Ensure 'use strict' is always emitted.\n\nSee more: https://www.typescriptlang.org/tsconfig#alwaysStrict";
                            };
                            readonly strict: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable all strict type checking options.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable all strict type checking options.\n\nSee more: https://www.typescriptlang.org/tsconfig#strict";
                            };
                            readonly strictBindCallApply: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBindCallApply";
                            };
                            readonly downlevelIteration: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit more compliant, but verbose and less performant JavaScript for iteration.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Emit more compliant, but verbose and less performant JavaScript for iteration.\n\nSee more: https://www.typescriptlang.org/tsconfig#downlevelIteration";
                            };
                            readonly checkJs: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable error reporting in type-checked JavaScript files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable error reporting in type-checked JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#checkJs";
                            };
                            readonly strictFunctionTypes: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "When assigning functions, check to ensure parameters and the return values are subtype-compatible.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "When assigning functions, check to ensure parameters and the return values are subtype-compatible.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictFunctionTypes";
                            };
                            readonly strictPropertyInitialization: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Check for class properties that are declared but not set in the constructor.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Check for class properties that are declared but not set in the constructor.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictPropertyInitialization";
                            };
                            readonly esModuleInterop: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.\n\nSee more: https://www.typescriptlang.org/tsconfig#esModuleInterop";
                            };
                            readonly allowUmdGlobalAccess: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Allow accessing UMD globals from modules.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Allow accessing UMD globals from modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUmdGlobalAccess";
                            };
                            readonly keyofStringsOnly: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Make keyof only return strings instead of string, numbers or symbols. Legacy option.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Make keyof only return strings instead of string, numbers or symbols. Legacy option.\n\nSee more: https://www.typescriptlang.org/tsconfig#keyofStringsOnly";
                            };
                            readonly useDefineForClassFields: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Emit ECMAScript-standard-compliant class fields.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Emit ECMAScript-standard-compliant class fields.\n\nSee more: https://www.typescriptlang.org/tsconfig#useDefineForClassFields";
                            };
                            readonly declarationMap: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Create sourcemaps for d.ts files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Create sourcemaps for d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationMap";
                            };
                            readonly resolveJsonModule: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable importing .json files";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Enable importing .json files\n\nSee more: https://www.typescriptlang.org/tsconfig#resolveJsonModule";
                            };
                            readonly resolvePackageJsonExports: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Use the package.json 'exports' field when resolving package imports.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Use the package.json 'exports' field when resolving package imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonExports";
                            };
                            readonly resolvePackageJsonImports: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Use the package.json 'imports' field when resolving imports.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Use the package.json 'imports' field when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonImports";
                            };
                            readonly assumeChangesOnlyAffectDirectDependencies: {
                                readonly description: "Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it. Requires TypeScript version 3.8 or later.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly extendedDiagnostics: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Output more detailed compiler performance information after building.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Output more detailed compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#extendedDiagnostics";
                            };
                            readonly listFilesOnly: {
                                readonly description: "Print names of files that are part of the compilation and then stop processing.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly disableSourceOfProjectReferenceRedirect: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable preferring source files instead of declaration files when referencing composite projects";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Disable preferring source files instead of declaration files when referencing composite projects\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSourceOfProjectReferenceRedirect";
                            };
                            readonly disableSolutionSearching: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Opt a project out of multi-project reference checking when editing.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Opt a project out of multi-project reference checking when editing.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSolutionSearching";
                            };
                            readonly verbatimModuleSyntax: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.";
                                readonly type: readonly ["boolean", "null"];
                                readonly markdownDescription: "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.\n\nSee more: https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax";
                            };
                            readonly noCheck: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Disable full type checking (only critical parse and emit errors will be reported)";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Disable full type checking (only critical parse and emit errors will be reported)\n\nSee more: https://www.typescriptlang.org/tsconfig#noCheck";
                            };
                            readonly isolatedDeclarations: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Require sufficient annotation on exports so other tools can trivially generate declaration files.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Require sufficient annotation on exports so other tools can trivially generate declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedDeclarations";
                            };
                            readonly noUncheckedSideEffectImports: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Check side effect imports.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Check side effect imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports";
                            };
                            readonly strictBuiltinIteratorReturn: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                                readonly markdownDescription: "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBuiltinIteratorReturn";
                            };
                        };
                    };
                };
            };
            readonly typeAcquisitionDefinition: {
                readonly properties: {
                    readonly typeAcquisition: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly type: readonly ["object", "null"];
                        readonly description: "Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.";
                        readonly properties: {
                            readonly enable: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Enable auto type acquisition";
                                readonly type: readonly ["boolean", "null"];
                                readonly default: false;
                            };
                            readonly include: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specifies a list of type declarations to be included in auto type acquisition. Ex. [\"jquery\", \"lodash\"]";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly exclude: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly description: "Specifies a list of type declarations to be excluded from auto type acquisition. Ex. [\"jquery\", \"lodash\"]";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                        };
                    };
                };
            };
            readonly referencesDefinition: {
                readonly properties: {
                    readonly references: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly type: readonly ["array", "null"];
                        readonly uniqueItems: true;
                        readonly description: "Referenced projects. Requires TypeScript version 3.0 or later.";
                        readonly items: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly type: readonly ["object", "null"];
                            readonly description: "Project reference.";
                            readonly properties: {
                                readonly path: {
                                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                    readonly type: readonly ["string", "null"];
                                    readonly description: "Path to referenced tsconfig or to folder containing tsconfig.";
                                };
                            };
                        };
                    };
                };
            };
            readonly tsNodeModuleTypes: {
                readonly type: readonly ["object", "null"];
            };
            readonly tsNodeDefinition: {
                readonly properties: {
                    readonly "ts-node": {
                        readonly description: "ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration\n\nts-node offers TypeScript execution and REPL for node.js, with source map support.";
                        readonly properties: {
                            readonly compiler: {
                                readonly default: "typescript";
                                readonly description: "Specify a custom TypeScript compiler.";
                                readonly type: readonly ["string", "null"];
                            };
                            readonly compilerHost: {
                                readonly default: false;
                                readonly description: "Use TypeScript's compiler host API instead of the language service API.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly compilerOptions: {
                                readonly additionalProperties: true;
                                readonly allOf: readonly [{
                                    readonly $ref: "#/definitions/compilerOptionsDefinition/properties/compilerOptions";
                                }];
                                readonly description: "JSON object to merge with TypeScript `compilerOptions`.";
                                readonly properties: {};
                                readonly type: readonly ["object", "null"];
                            };
                            readonly emit: {
                                readonly default: false;
                                readonly description: "Emit output files into `.ts-node` directory.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly esm: {
                                readonly description: "Enable native ESM support.\n\nFor details, see https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly experimentalReplAwait: {
                                readonly description: "Allows the usage of top level await in REPL.\n\nUses node's implementation which accomplishes this with an AST syntax transformation.\n\nEnabled by default when tsconfig target is es2018 or above. Set to false to disable.\n\n**Note**: setting to `true` when tsconfig target is too low will throw an Error.  Leave as `undefined`\nto get default, automatic behavior.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly experimentalResolver: {
                                readonly description: "Enable experimental features that re-map imports and require calls to support:\n`baseUrl`, `paths`, `rootDirs`, `.js` to `.ts` file extension mappings,\n`outDir` to `rootDir` mappings for composite projects and monorepos.\n\nFor details, see https://github.com/TypeStrong/ts-node/issues/1514";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly experimentalSpecifierResolution: {
                                readonly description: "Like node's `--experimental-specifier-resolution`, , but can also be set in your `tsconfig.json` for convenience.\n\nFor details, see https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm";
                                readonly enum: readonly ["explicit", "node"];
                                readonly type: readonly ["string", "null"];
                            };
                            readonly files: {
                                readonly default: false;
                                readonly description: "Load \"files\" and \"include\" from `tsconfig.json` on startup.\n\nDefault is to override `tsconfig.json` \"files\" and \"include\" to only include the entrypoint script.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly ignore: {
                                readonly default: readonly ["(?:^|/)node_modules/"];
                                readonly description: "Paths which should not be compiled.\n\nEach string in the array is converted to a regular expression via `new RegExp()` and tested against source paths prior to compilation.\n\nSource paths are normalized to posix-style separators, relative to the directory containing `tsconfig.json` or to cwd if no `tsconfig.json` is loaded.\n\nDefault is to ignore all node_modules subdirectories.";
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly type: readonly ["array", "null"];
                            };
                            readonly ignoreDiagnostics: {
                                readonly description: "Ignore TypeScript warnings by diagnostic code.";
                                readonly items: {
                                    readonly type: readonly ["string", "number"];
                                };
                                readonly type: readonly ["array", "null"];
                            };
                            readonly logError: {
                                readonly default: false;
                                readonly description: "Logs TypeScript errors to stderr instead of throwing exceptions.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly moduleTypes: {
                                readonly $ref: "#/definitions/tsNodeModuleTypes";
                                readonly description: "Override certain paths to be compiled and executed as CommonJS or ECMAScript modules.\nWhen overridden, the tsconfig \"module\" and package.json \"type\" fields are overridden, and\nthe file extension is ignored.\nThis is useful if you cannot use .mts, .cts, .mjs, or .cjs file extensions;\nit achieves the same effect.\n\nEach key is a glob pattern following the same rules as tsconfig's \"include\" array.\nWhen multiple patterns match the same file, the last pattern takes precedence.\n\n`cjs` overrides matches files to compile and execute as CommonJS.\n`esm` overrides matches files to compile and execute as native ECMAScript modules.\n`package` overrides either of the above to default behavior, which obeys package.json \"type\" and\ntsconfig.json \"module\" options.";
                            };
                            readonly preferTsExts: {
                                readonly default: false;
                                readonly description: "Re-order file extensions so that TypeScript imports are preferred.\n\nFor example, when both `index.js` and `index.ts` exist, enabling this option causes `require('./index')` to resolve to `index.ts` instead of `index.js`";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly pretty: {
                                readonly default: false;
                                readonly description: "Use pretty diagnostic formatter.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly require: {
                                readonly description: "Modules to require, like node's `--require` flag.\n\nIf specified in `tsconfig.json`, the modules will be resolved relative to the `tsconfig.json` file.\n\nIf specified programmatically, each input string should be pre-resolved to an absolute path for\nbest results.";
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly type: readonly ["array", "null"];
                            };
                            readonly scope: {
                                readonly default: false;
                                readonly description: "Scope compiler to files within `scopeDir`.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly scopeDir: {
                                readonly default: "First of: `tsconfig.json` \"rootDir\" if specified, directory containing `tsconfig.json`, or cwd if no `tsconfig.json` is loaded.";
                                readonly type: readonly ["string", "null"];
                            };
                            readonly skipIgnore: {
                                readonly default: false;
                                readonly description: "Skip ignore check, so that compilation will be attempted for all files with matching extensions.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly swc: {
                                readonly description: "Transpile with swc instead of the TypeScript compiler, and skip typechecking.\n\nEquivalent to setting both `transpileOnly: true` and `transpiler: 'ts-node/transpilers/swc'`\n\nFor complete instructions: https://typestrong.org/ts-node/docs/transpilers";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly transpileOnly: {
                                readonly default: false;
                                readonly description: "Use TypeScript's faster `transpileModule`.";
                                readonly type: readonly ["boolean", "null"];
                            };
                            readonly transpiler: {
                                readonly anyOf: readonly [{
                                    readonly items: readonly [{
                                        readonly type: readonly ["string", "null"];
                                    }, {
                                        readonly additionalProperties: true;
                                        readonly properties: {};
                                        readonly type: readonly ["object", "null"];
                                    }];
                                    readonly maxItems: 2;
                                    readonly minItems: 2;
                                    readonly type: readonly ["array", "null"];
                                }, {
                                    readonly type: readonly ["string", "null"];
                                }];
                                readonly description: "Specify a custom transpiler for use with transpileOnly";
                            };
                            readonly typeCheck: {
                                readonly default: true;
                                readonly description: "**DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).";
                                readonly type: readonly ["boolean", "null"];
                            };
                        };
                        readonly type: readonly ["object", "null"];
                    };
                };
            };
        };
        readonly id: "https://json.schemastore.org/tsconfig";
        readonly title: "JSON schema for the TypeScript compiler's configuration file";
        readonly type: "object";
    };
    readonly VaultAdminAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultAdminAgreement";
        readonly title: "Vault Administrator Agreement";
        readonly description: "Defines the responsibilities and permissions of a Vault administrator.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly enum: readonly ["License", "CreativeWork"];
                readonly description: "Schema.org type";
            };
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly vaultId: {
                readonly type: "string";
                readonly description: "DID of the Vault.";
            };
            readonly adminId: {
                readonly type: "string";
                readonly description: "DID of the administrator.";
            };
            readonly permissions: {
                readonly type: "object";
                readonly properties: {
                    readonly manageTags: {
                        readonly type: "boolean";
                        readonly description: "Can the admin control tagging policies?";
                    };
                    readonly approvePlugins: {
                        readonly type: "boolean";
                        readonly description: "Can the admin approve plugin installations?";
                    };
                    readonly controlAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the admin manage user access?";
                    };
                };
            };
            readonly governanceRules: {
                readonly type: "string";
                readonly description: "Link to the governance framework this admin follows.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Under what conditions an admin's privileges can be revoked.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the admin has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "vaultId", "adminId", "permissions", "governanceRules", "revocationPolicy", "agreementSigned", "timestamp"];
    };
    readonly VaultChamberGovernance: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultChamberGovernance";
        readonly title: "Vault Chamber Governance";
        readonly description: "Defines governance processes for a Governance Chamber, including proposals and voting.";
        readonly type: "object";
        readonly properties: {
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Governance Chamber.";
            };
            readonly governanceType: {
                readonly type: "string";
                readonly enum: readonly ["vote", "multi-sig", "admin"];
                readonly description: "How governance decisions are made.";
            };
            readonly allowedParticipants: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of DIDs allowed to participate in governance.";
            };
            readonly proposalProcess: {
                readonly type: "object";
                readonly properties: {
                    readonly minTrustScore: {
                        readonly type: "number";
                        readonly description: "Minimum trust score to submit proposals.";
                    };
                    readonly proposalApproval: {
                        readonly type: "string";
                        readonly enum: readonly ["simple-majority", "supermajority", "consensus"];
                        readonly description: "Approval threshold.";
                    };
                };
            };
            readonly votingProcess: {
                readonly type: "object";
                readonly properties: {
                    readonly votingPeriod: {
                        readonly type: "string";
                        readonly description: "Duration of voting.";
                    };
                    readonly requiredParticipation: {
                        readonly type: "number";
                        readonly description: "Minimum % of eligible voters to pass.";
                    };
                };
            };
        };
        readonly required: readonly ["chamberId", "governanceType", "allowedParticipants", "proposalProcess", "votingProcess"];
    };
    readonly VaultChamberPlugin: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultChamberPlugin";
        readonly title: "Vault Chamber Plugin";
        readonly description: "Tracks plugins installed within a Vault Chamber and their permissions.";
        readonly type: "object";
        readonly properties: {
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Vault Chamber.";
            };
            readonly pluginId: {
                readonly type: "string";
                readonly description: "DID of the installed plugin.";
            };
            readonly installedBy: {
                readonly type: "string";
                readonly description: "DID of the user who installed the plugin.";
            };
            readonly permissions: {
                readonly type: "object";
                readonly properties: {
                    readonly storageAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the plugin access storage?";
                    };
                    readonly computeAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the plugin use compute resources?";
                    };
                    readonly identityAccess: {
                        readonly type: "boolean";
                        readonly description: "Can the plugin interact with identity data?";
                    };
                };
            };
            readonly installationDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp when the plugin was installed.";
            };
        };
        readonly required: readonly ["chamberId", "pluginId", "installedBy", "permissions", "installationDate"];
    };
    readonly VaultChamberTagging: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultChamberTagging";
        readonly title: "Vault Chamber Tagging";
        readonly description: "Defines the tagging system within a Vault, including permissions, allowed tags, and Data Chambers.";
        readonly type: "object";
        readonly properties: {
            readonly vaultId: {
                readonly type: "string";
                readonly description: "DID of the Vault.";
            };
            readonly admin: {
                readonly type: "string";
                readonly description: "DID of the Vault administrator.";
            };
            readonly allowedTags: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly tag: {
                            readonly type: "string";
                            readonly description: "The supported tag.";
                        };
                        readonly restricted: {
                            readonly type: "boolean";
                            readonly description: "Whether this tag requires admin approval.";
                        };
                        readonly linkedChamber: {
                            readonly type: "string";
                            readonly description: "DID of a Data Chamber if this tag represents a data pool.";
                        };
                    };
                };
                readonly description: "List of supported tags and their access control settings.";
            };
            readonly userTaggingPermissions: {
                readonly type: "object";
                readonly properties: {
                    readonly allowUserTagging: {
                        readonly type: "boolean";
                        readonly description: "Whether users can add their own tags.";
                    };
                    readonly moderationRequired: {
                        readonly type: "boolean";
                        readonly description: "Whether admin approval is required for new user tags.";
                    };
                };
                readonly description: "Defines user permissions for tagging.";
            };
        };
        readonly required: readonly ["vaultId", "admin", "allowedTags", "userTaggingPermissions"];
    };
    readonly VaultChamberTransaction: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultChamberTransaction";
        readonly title: "Vault Chamber Transaction";
        readonly description: "Records payment-based access events for transactional Vault Chambers.";
        readonly type: "object";
        readonly properties: {
            readonly transactionId: {
                readonly type: "string";
                readonly description: "Unique ID of the transaction.";
            };
            readonly chamberId: {
                readonly type: "string";
                readonly description: "DID of the Vault Chamber.";
            };
            readonly buyer: {
                readonly type: "string";
                readonly description: "DID of the user who paid for access.";
            };
            readonly amountPaid: {
                readonly type: "number";
                readonly description: "Amount paid for access.";
            };
            readonly currency: {
                readonly type: "string";
                readonly description: "Currency used (e.g., USD, CHEQ, ETH).";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of transaction.";
            };
            readonly accessDuration: {
                readonly type: "string";
                readonly description: "How long the user can access the Chamber.";
            };
        };
        readonly required: readonly ["transactionId", "chamberId", "buyer", "amountPaid", "currency", "timestamp", "accessDuration"];
    };
    readonly VaultDeclaration: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.io/VaultDeclaration";
        readonly title: "Vault DID Declaration";
        readonly description: "Defines an OV Vault's ownership, governance, and access policies.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the vault.";
            };
            readonly type: {
                readonly const: "VaultDID";
                readonly description: "Indicates this is a Vault DID declaration.";
            };
            readonly owner: {
                readonly type: "string";
                readonly description: "The DID of the user or organization that owns this vault.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the OV cluster managing this vault.";
            };
            readonly storageNodes: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of Storage Node DIDs storing this vault's data.";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., Metadata, AccessLog, ContentManifest).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "References to vault metadata, manifests, and access logs.";
            };
            readonly accessPolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly readAccess: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of DIDs that can read from this vault.";
                    };
                    readonly writeAccess: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of DIDs that can write to this vault.";
                    };
                    readonly publicAccess: {
                        readonly type: "boolean";
                        readonly description: "Whether the vault is publicly accessible.";
                    };
                };
                readonly description: "Defines who can access and modify the vault.";
            };
            readonly governance: {
                readonly type: "object";
                readonly properties: {
                    readonly governedBy: {
                        readonly type: "string";
                        readonly description: "DID of the governance body managing vault policies (e.g., a DAO or admin).";
                    };
                    readonly disputeResolution: {
                        readonly type: "string";
                        readonly description: "DID reference to a dispute resolution service.";
                    };
                };
                readonly description: "Governance and compliance policies for the vault.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of when this vault declaration was issued.";
            };
        };
        readonly required: readonly ["id", "owner", "cluster", "storageNodes", "timestamp"];
    };
    readonly VaultOperator: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultOperatorPersona";
        readonly title: "Vault Operator Persona";
        readonly description: "Defines a vault operator in the OriginVault ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly managedVaults: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of vaults managed by this operator.";
                };
            };
            readonly governanceModel: {
                readonly type: "string";
                readonly enum: readonly ["Admin-Controlled", "DAO-Based", "Token-Weighted"];
                readonly description: "Defines how the vault is governed.";
            };
            readonly vaultAccessPolicies: {
                readonly type: "object";
                readonly properties: {
                    readonly allowsPublicContributions: {
                        readonly type: "boolean";
                        readonly description: "Whether non-members can contribute to the vault.";
                    };
                    readonly monetizationModel: {
                        readonly type: "string";
                        readonly enum: readonly ["Subscription", "Pay-per-View", "One-Time Purchase"];
                        readonly description: "Defines the revenue model for content access.";
                    };
                };
                readonly description: "Defines policies for managing vault access and revenue.";
            };
        };
        readonly required: readonly ["managedVaults", "governanceModel", "vaultAccessPolicies"];
    };
    readonly VaultPluginInstallationLog: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/PluginInstallationLog";
        readonly title: "Plugin Installation Log";
        readonly description: "Tracks the installation of plugins within an OV Vault, ensuring compliance with cluster policies.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the vault plugin installation.";
            };
            readonly vault: {
                readonly type: "string";
                readonly description: "The DID of the vault where the plugin is installed.";
            };
            readonly plugin: {
                readonly type: "string";
                readonly description: "The DID of the installed plugin.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster the vault belongs to.";
            };
            readonly installedBy: {
                readonly type: "string";
                readonly description: "DID of the entity that installed the plugin.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["installed", "active", "suspended", "removed"];
                readonly description: "The status of the plugin installation.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of installation.";
            };
        };
        readonly required: readonly ["id", "vault", "plugin", "cluster", "installedBy", "status", "timestamp"];
    };
    readonly VaultUserAgreement: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VaultUserAgreement";
        readonly title: "Vault User Agreement";
        readonly description: "Defines the terms for users accessing content within a Vault.";
        readonly type: "object";
        readonly properties: {
            readonly agreementId: {
                readonly type: "string";
                readonly description: "DID of the agreement.";
            };
            readonly vaultId: {
                readonly type: "string";
                readonly description: "DID of the Vault being accessed.";
            };
            readonly userId: {
                readonly type: "string";
                readonly description: "DID of the user.";
            };
            readonly accessPermissions: {
                readonly type: "object";
                readonly properties: {
                    readonly read: {
                        readonly type: "boolean";
                        readonly description: "Whether the user can view content.";
                    };
                    readonly write: {
                        readonly type: "boolean";
                        readonly description: "Whether the user can contribute content.";
                    };
                    readonly purchase: {
                        readonly type: "boolean";
                        readonly description: "Whether the user can buy content.";
                    };
                };
            };
            readonly usageRestrictions: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["No Redistribution", "No AI Training", "No Commercial Use"];
                };
                readonly description: "Restrictions on how the user can use the content.";
            };
            readonly revocationPolicy: {
                readonly type: "string";
                readonly description: "Conditions under which access can be revoked.";
            };
            readonly agreementSigned: {
                readonly type: "boolean";
                readonly description: "Whether the user has accepted the agreement.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time of agreement acceptance.";
            };
        };
        readonly required: readonly ["agreementId", "vaultId", "userId", "accessPermissions", "usageRestrictions", "revocationPolicy", "agreementSigned", "timestamp"];
    };
    readonly VerificationLog: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VerificationLog";
        readonly title: "Verification Log Schema";
        readonly description: "Tracks verifications, compliance audits, and trust decisions.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the verification log.";
            };
            readonly entity: {
                readonly type: "string";
                readonly description: "The DID of the verified entity.";
            };
            readonly verifiedBy: {
                readonly type: "string";
                readonly description: "The DID of the authority performing verification.";
            };
            readonly verificationType: {
                readonly type: "string";
                readonly enum: readonly ["IdentityCheck", "SecurityAudit", "PerformanceTest"];
                readonly description: "Type of verification performed.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["Passed", "Failed", "Pending"];
                readonly description: "Outcome of the verification.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of verification.";
            };
        };
        readonly required: readonly ["id", "entity", "verifiedBy", "verificationType", "status", "timestamp"];
    };
    readonly VerificationNode: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VerificationNodeDeclaration";
        readonly title: "Verification Node Declaration";
        readonly description: "Defines a Verification Node in an OV Cluster.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the Verification Node.";
            };
            readonly type: {
                readonly const: "VerificationNode";
                readonly description: "Node type.";
            };
            readonly cluster: {
                readonly type: "string";
                readonly description: "The DID of the cluster this node belongs to.";
            };
            readonly operator: {
                readonly type: "string";
                readonly description: "DID of the entity operating this node.";
            };
            readonly verificationTasks: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "List of supported verification tasks (e.g., DID Validation, Signature Verification, Compliance Checks).";
            };
            readonly linkedResources: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The DID of the linked resource.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "The type of resource (e.g., Data, Metadata, ContentManifest).";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name of the linked resource.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the linked resource.";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly description: "The uri of the linked resource.";
                        };
                    };
                    readonly required: readonly ["id", "type", "name", "description", "uri"];
                };
                readonly description: "References to stored resources.";
            };
            readonly trustLevel: {
                readonly type: "string";
                readonly enum: readonly ["Low", "Medium", "High"];
                readonly description: "Trust level assigned to this node based on verification authority.";
            };
            readonly verificationLogs: {
                readonly type: "string";
                readonly description: "Reference to a log of verification checks performed.";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["active", "suspended", "revoked"];
                readonly description: "Operational status of the node.";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of node declaration.";
            };
        };
        readonly required: readonly ["id", "cluster", "operator", "verificationTasks", "trustLevel", "status", "timestamp"];
    };
    readonly Verifier: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/VerifierPersona";
        readonly title: "Verifier Persona";
        readonly description: "Defines a verifier in the OriginVault ecosystem.";
        readonly type: "object";
        readonly properties: {
            readonly "@type": {
                readonly type: "string";
                readonly description: "Schema.org type";
            };
            readonly verificationsPerformed: {
                readonly type: "number";
                readonly description: "Total number of verification actions performed.";
            };
            readonly approvedNamespaces: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly description: "DIDs of namespaces the verifier is trusted in.";
                };
            };
            readonly trustScoreImpact: {
                readonly type: "number";
                readonly description: "Modifier applied to their reputation based on accuracy.";
            };
            readonly disputedVerifications: {
                readonly type: "number";
                readonly description: "Count of verification decisions that were disputed or reversed.";
            };
        };
        readonly required: readonly ["verificationsPerformed", "approvedNamespaces", "trustScoreImpact"];
    };
    readonly VotingSchema: {
        readonly $schema: "https://json-schema.org/draft/2020-12/schema";
        readonly $id: "https://schemas.originvault.box/Voting";
        readonly title: "Governance Voting Schema";
        readonly description: "Tracks voting activity on governance proposals.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "The DID of the voting record.";
            };
            readonly proposal: {
                readonly type: "string";
                readonly description: "DID of the proposal being voted on.";
            };
            readonly voter: {
                readonly type: "string";
                readonly description: "DID of the voter.";
            };
            readonly vote: {
                readonly type: "string";
                readonly enum: readonly ["Yes", "No", "Abstain"];
                readonly description: "Vote cast by the participant.";
            };
            readonly weight: {
                readonly type: "number";
                readonly description: "Weight of the voter's vote (e.g., based on staked tokens).";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Timestamp of the vote submission.";
            };
        };
        readonly required: readonly ["id", "proposal", "voter", "vote", "weight", "timestamp"];
    };
};
export declare const SCHEMA_HASHES: {
    readonly Admin: "dbecfc2f9ba4ddee";
    readonly AIConfig: "5ef397ced24cdca3";
    readonly AIModelTrainingAgreement: "d70d5e16308ccf8d";
    readonly ClaimVerification: "8c058d044fcd001f";
    readonly ClusterGovernance: "62c5014d52f68559";
    readonly ClusterRegistration: "5d8c277223ead6d4";
    readonly CommunityMember: "f31f34eeef429802";
    readonly ComputeNode: "0d8cdc9aea4d8d5f";
    readonly ContentAIPermissionAssertionCredential: "ed866ace505ab926";
    readonly ContentAuthenticityAssertionCredential: "50dd17007a5a6a78";
    readonly ContentExtendedMetadata: "b49f9344bdb80aa5";
    readonly ContentLegalAccountability: "205f57d8584cd931";
    readonly ContentLicensingAgreement: "488f3d178eac7df7";
    readonly ContentLicensingTerms: "9e765f16cf7aa92a";
    readonly Creator: "d1006cf7865ede74";
    readonly DataChamberContributionAgreement: "a69e4e5a827fc3c9";
    readonly DataChamberEnrollment: "23f6d0638d0c8ac8";
    readonly Developer: "02974c14c63e11ad";
    readonly DevelopmentEnvironmentMetadata: "be04335e0377a54e";
    readonly DIDAssertionCredential: "cff1c6c01b61ed5d";
    readonly DIDDeclaration: "c230e82498e5853b";
    readonly DigitalDocument: "ff51dfc7f5be546d";
    readonly EndorsementRecord: "61a979e8f740da6d";
    readonly ExternalBuyerAgreement: "bcfdf4e67f303575";
    readonly ExternalDataAccess: "8c3f1348f12c54e0";
    readonly GemDeclaration: "d18f185813d1f74d";
    readonly GemIssuanceRecord: "4ce38cdb71fafad0";
    readonly GemReputationScore: "ea1355ba16f9824b";
    readonly GemRevocationRecord: "ac64a6580d028546";
    readonly GemTrustRegistry: "01e87b3a528fd618";
    readonly GlobalPrivacyControl: "7a1c074846a3db7b";
    readonly GovernanceProposal: "9b1c13090402b37c";
    readonly IdentityClaimsAggregationCredential: "aecfb058814aabc9";
    readonly IdentityNodeDeclaration: "48d1ac51963b218d";
    readonly LanguageConfiguration: "eb5fa9b073bc5550";
    readonly NamespaceDeclaration: "c0c169189def2988";
    readonly NamespaceGovernance: "96031fb8a9d0998d";
    readonly NamespaceParticipationAgreement: "d5acef2e23cae53e";
    readonly NamespacePluginDeclaration: "ebad72472aa2b5c9";
    readonly NamespaceProposal: "488511ffe42afff3";
    readonly NamespaceRecognitionCertificate: "e8ff57e3052fd0e6";
    readonly NamespaceReputationRecord: "79733616a7048087";
    readonly NodeClusterDeclaration: "cbf8c467730fccf5";
    readonly NodeDeclaration: "e299dd1da080f30b";
    readonly NodeOperatorAgreement: "c7da31c251c984dc";
    readonly NodeVoting: "298dc987d9f9115b";
    readonly Owner: "a267eaf3ac918228";
    readonly PackageJson: "a4102bab35450ceb";
    readonly Persona: "3e128855d187b848";
    readonly PluginDeclaration: "a177673149fe1f76";
    readonly PluginDeveloperAgreement: "65f245a2f1288471";
    readonly PluginExectutionRequest: "0db1a11e95836735";
    readonly PluginIntegrationAgreement: "08eb685f9b55d33a";
    readonly ReferalAgreement: "0eb171e3b32e2df9";
    readonly RevenuDistribution: "d011f25e3f3c234b";
    readonly Revocation: "e156647323933e43";
    readonly RootAuthority: "2afafb69b1bd0ef0";
    readonly ServiceLevelAgreement: "3a5f60ecb841038c";
    readonly StorageNodeDeclaration: "34956500c4e271f2";
    readonly TrustChainDelegation: "e9c92577cc2f726b";
    readonly TrustDelegation: "92e63377410eda91";
    readonly TrustedIssuer: "46e5a8521671b570";
    readonly TrustGate: "a98178988d66deb1";
    readonly TrustScore: "d7935044851cb392";
    readonly TsconfigJson: "e9adda821c2f0a17";
    readonly VaultAdminAgreement: "e5eae1428ba46fd5";
    readonly VaultChamberGovernance: "7cbdb4325892710d";
    readonly VaultChamberPlugin: "b796b46d45134305";
    readonly VaultChamberTagging: "15f98337ae4033ed";
    readonly VaultChamberTransaction: "05c23d7c23b61867";
    readonly VaultDeclaration: "feaabcf9d6884d81";
    readonly VaultOperator: "54302395c476c1f9";
    readonly VaultPluginInstallationLog: "33dc13f5855a4643";
    readonly VaultUserAgreement: "11f58cac111cfe05";
    readonly VerificationLog: "d64f99385e997ecf";
    readonly VerificationNode: "fc7f00266e5fb58d";
    readonly Verifier: "846df176af70066d";
    readonly VotingSchema: "a76b926ba474ef2c";
};
export declare const SCHEMA_METADATA: {
    readonly Admin: {
        readonly name: "Admin";
        readonly id: "https://schemas.originvault.box/Admin";
        readonly hash: "dbecfc2f9ba4ddee";
        readonly version: "1.0.0";
    };
    readonly AIConfig: {
        readonly name: "AIConfig";
        readonly id: "https://json.schemastore.org/aiconfig-1.0.json";
        readonly hash: "5ef397ced24cdca3";
        readonly version: "1.0.0";
    };
    readonly AIModelTrainingAgreement: {
        readonly name: "AIModelTrainingAgreement";
        readonly id: "https://schemas.originvault.io/AITrainingAgreement";
        readonly hash: "d70d5e16308ccf8d";
        readonly version: "1.0.0";
    };
    readonly ClaimVerification: {
        readonly name: "ClaimVerification";
        readonly id: "https://schemas.originvault.box/ClaimVerification";
        readonly hash: "8c058d044fcd001f";
        readonly version: "1.0.0";
    };
    readonly ClusterGovernance: {
        readonly name: "ClusterGovernance";
        readonly id: "https://schemas.originvault.box/ClusterGovernance";
        readonly hash: "62c5014d52f68559";
        readonly version: "1.0.0";
    };
    readonly ClusterRegistration: {
        readonly name: "ClusterRegistration";
        readonly id: "https://schemas.originvault.box/ClusterRegistration";
        readonly hash: "5d8c277223ead6d4";
        readonly version: "1.0.0";
    };
    readonly CommunityMember: {
        readonly name: "CommunityMember";
        readonly id: "https://schemas.originvault.box/CommunityMemberPersona";
        readonly hash: "f31f34eeef429802";
        readonly version: "1.0.0";
    };
    readonly ComputeNode: {
        readonly name: "ComputeNode";
        readonly id: "https://schemas.originvault.io/ComputeNodeDeclaration";
        readonly hash: "0d8cdc9aea4d8d5f";
        readonly version: "1.0.0";
    };
    readonly ContentAIPermissionAssertionCredential: {
        readonly name: "ContentAIPermissionAssertionCredential";
        readonly id: "https://schemas.originvault.box/ContentAIPermissionAssertionCredential";
        readonly hash: "ed866ace505ab926";
        readonly version: "1.0.0";
    };
    readonly ContentAuthenticityAssertionCredential: {
        readonly name: "ContentAuthenticityAssertionCredential";
        readonly id: "https://schemas.originvault.box/ContentAuthenticityAssertionCredential";
        readonly hash: "50dd17007a5a6a78";
        readonly version: "1.0.0";
    };
    readonly ContentExtendedMetadata: {
        readonly name: "ContentExtendedMetadata";
        readonly id: "https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential";
        readonly hash: "b49f9344bdb80aa5";
        readonly version: "1.0.0";
    };
    readonly ContentLegalAccountability: {
        readonly name: "ContentLegalAccountability";
        readonly id: "https://schemas.originvault.box/ContentLegalAccountability";
        readonly hash: "205f57d8584cd931";
        readonly version: "1.0.0";
    };
    readonly ContentLicensingAgreement: {
        readonly name: "ContentLicensingAgreement";
        readonly id: "https://schemas.originvault.box/ContentLicensingAgreement";
        readonly hash: "488f3d178eac7df7";
        readonly version: "1.0.0";
    };
    readonly ContentLicensingTerms: {
        readonly name: "ContentLicensingTerms";
        readonly id: "https://schemas.originvault.box/ContentLicensingTerms";
        readonly hash: "9e765f16cf7aa92a";
        readonly version: "1.0.0";
    };
    readonly Creator: {
        readonly name: "Creator";
        readonly id: "https://schemas.originvault.io/Creator";
        readonly hash: "d1006cf7865ede74";
        readonly version: "1.0.0";
    };
    readonly DataChamberContributionAgreement: {
        readonly name: "DataChamberContributionAgreement";
        readonly id: "https://schemas.originvault.box/DataChamberContributorAgreement";
        readonly hash: "a69e4e5a827fc3c9";
        readonly version: "1.0.0";
    };
    readonly DataChamberEnrollment: {
        readonly name: "DataChamberEnrollment";
        readonly id: "https://schemas.originvault.box/DataChamberEnrollment";
        readonly hash: "23f6d0638d0c8ac8";
        readonly version: "1.0.0";
    };
    readonly Developer: {
        readonly name: "Developer";
        readonly id: "https://schemas.originvault.box/Developer";
        readonly hash: "02974c14c63e11ad";
        readonly version: "1.0.0";
    };
    readonly DevelopmentEnvironmentMetadata: {
        readonly name: "DevelopmentEnvironmentMetadata";
        readonly id: "https://schemas.originvault.box/DevelopmentEnvironmentMetadata.schema.json";
        readonly hash: "be04335e0377a54e";
        readonly version: "1.0.0";
    };
    readonly DIDAssertionCredential: {
        readonly name: "DIDAssertionCredential";
        readonly id: "https://schemas.originvault.box/DIDAssertionCredential.schema.json";
        readonly hash: "cff1c6c01b61ed5d";
        readonly version: "1.0.0";
    };
    readonly DIDDeclaration: {
        readonly name: "DIDDeclaration";
        readonly id: "https://schemas.originvault.box/DIDDeclaration";
        readonly hash: "c230e82498e5853b";
        readonly version: "1.0.0";
    };
    readonly DigitalDocument: {
        readonly name: "DigitalDocument";
        readonly id: "https://schemas.originvault.box/DigitalDocument";
        readonly hash: "ff51dfc7f5be546d";
        readonly version: "1.0.0";
    };
    readonly EndorsementRecord: {
        readonly name: "EndorsementRecord";
        readonly id: "https://schemas.originvault.box/EndorsementRecord";
        readonly hash: "61a979e8f740da6d";
        readonly version: "1.0.0";
    };
    readonly ExternalBuyerAgreement: {
        readonly name: "ExternalBuyerAgreement";
        readonly id: "https://schemas.originvault.box/ExternalDataBuyerAgreement";
        readonly hash: "bcfdf4e67f303575";
        readonly version: "1.0.0";
    };
    readonly ExternalDataAccess: {
        readonly name: "ExternalDataAccess";
        readonly id: "https://schemas.originvault.box/ExternalDataAccess";
        readonly hash: "8c3f1348f12c54e0";
        readonly version: "1.0.0";
    };
    readonly GemDeclaration: {
        readonly name: "GemDeclaration";
        readonly id: "https://schemas.originvault.box/GemDeclaration";
        readonly hash: "d18f185813d1f74d";
        readonly version: "1.0.0";
    };
    readonly GemIssuanceRecord: {
        readonly name: "GemIssuanceRecord";
        readonly id: "https://schemas.originvault.box/GemIssuance";
        readonly hash: "4ce38cdb71fafad0";
        readonly version: "1.0.0";
    };
    readonly GemReputationScore: {
        readonly name: "GemReputationScore";
        readonly id: "https://schemas.originvault.box/GemReputation";
        readonly hash: "ea1355ba16f9824b";
        readonly version: "1.0.0";
    };
    readonly GemRevocationRecord: {
        readonly name: "GemRevocationRecord";
        readonly id: "https://schemas.originvault.box/GemRevocation";
        readonly hash: "ac64a6580d028546";
        readonly version: "1.0.0";
    };
    readonly GemTrustRegistry: {
        readonly name: "GemTrustRegistry";
        readonly id: "https://schemas.originvault.box/GemTrustRegistry";
        readonly hash: "01e87b3a528fd618";
        readonly version: "1.0.0";
    };
    readonly GlobalPrivacyControl: {
        readonly name: "GlobalPrivacyControl";
        readonly id: "GlobalPrivacyControl";
        readonly hash: "7a1c074846a3db7b";
        readonly version: "1.0.0";
    };
    readonly GovernanceProposal: {
        readonly name: "GovernanceProposal";
        readonly id: "https://schemas.originvault.box/GovernanceProposal";
        readonly hash: "9b1c13090402b37c";
        readonly version: "1.0.0";
    };
    readonly IdentityClaimsAggregationCredential: {
        readonly name: "IdentityClaimsAggregationCredential";
        readonly id: "https://cawg.io/schemas/v1/creator-identity-assertion.json";
        readonly hash: "aecfb058814aabc9";
        readonly version: "1.0.0";
    };
    readonly IdentityNodeDeclaration: {
        readonly name: "IdentityNodeDeclaration";
        readonly id: "https://schemas.originvault.box/IdentityNodeDeclaration";
        readonly hash: "48d1ac51963b218d";
        readonly version: "1.0.0";
    };
    readonly LanguageConfiguration: {
        readonly name: "LanguageConfiguration";
        readonly id: "https://json.schemastore.org/language-configuration.json";
        readonly hash: "eb5fa9b073bc5550";
        readonly version: "1.0.0";
    };
    readonly NamespaceDeclaration: {
        readonly name: "NamespaceDeclaration";
        readonly id: "https://schemas.originvault.box/NamespaceDeclaration";
        readonly hash: "c0c169189def2988";
        readonly version: "1.0.0";
    };
    readonly NamespaceGovernance: {
        readonly name: "NamespaceGovernance";
        readonly id: "https://schemas.originvault.box/NamespaceGovernance";
        readonly hash: "96031fb8a9d0998d";
        readonly version: "1.0.0";
    };
    readonly NamespaceParticipationAgreement: {
        readonly name: "NamespaceParticipationAgreement";
        readonly id: "https://schemas.originvault.box/NamespaceParticipationAgreement";
        readonly hash: "d5acef2e23cae53e";
        readonly version: "1.0.0";
    };
    readonly NamespacePluginDeclaration: {
        readonly name: "NamespacePluginDeclaration";
        readonly id: "https://schemas.originvault.box/NamespacePluginDeclaration";
        readonly hash: "ebad72472aa2b5c9";
        readonly version: "1.0.0";
    };
    readonly NamespaceProposal: {
        readonly name: "NamespaceProposal";
        readonly id: "https://schemas.originvault.box/NamespaceProposal";
        readonly hash: "488511ffe42afff3";
        readonly version: "1.0.0";
    };
    readonly NamespaceRecognitionCertificate: {
        readonly name: "NamespaceRecognitionCertificate";
        readonly id: "https://schemas.originvault.box/NamespaceRecognitionCertificate";
        readonly hash: "e8ff57e3052fd0e6";
        readonly version: "1.0.0";
    };
    readonly NamespaceReputationRecord: {
        readonly name: "NamespaceReputationRecord";
        readonly id: "https://schemas.originvault.box/NamespaceReputationRecord";
        readonly hash: "79733616a7048087";
        readonly version: "1.0.0";
    };
    readonly NodeClusterDeclaration: {
        readonly name: "NodeClusterDeclaration";
        readonly id: "https://schemas.originvault.box/NodeClusterDeclaration";
        readonly hash: "cbf8c467730fccf5";
        readonly version: "1.0.0";
    };
    readonly NodeDeclaration: {
        readonly name: "NodeDeclaration";
        readonly id: "https://schemas.originvault.box/NodeDeclaration";
        readonly hash: "e299dd1da080f30b";
        readonly version: "1.0.0";
    };
    readonly NodeOperatorAgreement: {
        readonly name: "NodeOperatorAgreement";
        readonly id: "https://schemas.originvault.box/NodeOperatorAgreement";
        readonly hash: "c7da31c251c984dc";
        readonly version: "1.0.0";
    };
    readonly NodeVoting: {
        readonly name: "NodeVoting";
        readonly id: "https://schemas.originvault.io/NodeVotingConsensusAgreement";
        readonly hash: "298dc987d9f9115b";
        readonly version: "1.0.0";
    };
    readonly Owner: {
        readonly name: "Owner";
        readonly id: "https://schemas.originvault.box/Owner";
        readonly hash: "a267eaf3ac918228";
        readonly version: "1.0.0";
    };
    readonly PackageJson: {
        readonly name: "PackageJson";
        readonly id: "https://json.schemastore.org/package.json";
        readonly hash: "a4102bab35450ceb";
        readonly version: "1.0.0";
    };
    readonly Persona: {
        readonly name: "Persona";
        readonly id: "https://schemas.originvault.box/Persona";
        readonly hash: "3e128855d187b848";
        readonly version: "1.0.0";
    };
    readonly PluginDeclaration: {
        readonly name: "PluginDeclaration";
        readonly id: "https://schemas.originvault.io/PluginDeclaration";
        readonly hash: "a177673149fe1f76";
        readonly version: "1.0.0";
    };
    readonly PluginDeveloperAgreement: {
        readonly name: "PluginDeveloperAgreement";
        readonly id: "https://schemas.originvault.box/PluginDeveloperAgreement";
        readonly hash: "65f245a2f1288471";
        readonly version: "1.0.0";
    };
    readonly PluginExectutionRequest: {
        readonly name: "PluginExectutionRequest";
        readonly id: "https://schemas.originvault.box/PluginExecutionRequest";
        readonly hash: "0db1a11e95836735";
        readonly version: "1.0.0";
    };
    readonly PluginIntegrationAgreement: {
        readonly name: "PluginIntegrationAgreement";
        readonly id: "https://schemas.originvault.box/PluginIntegrationAgreement";
        readonly hash: "08eb685f9b55d33a";
        readonly version: "1.0.0";
    };
    readonly ReferalAgreement: {
        readonly name: "ReferalAgreement";
        readonly id: "https://schemas.originvault.box/ReferalAgreement";
        readonly hash: "0eb171e3b32e2df9";
        readonly version: "1.0.0";
    };
    readonly RevenuDistribution: {
        readonly name: "RevenuDistribution";
        readonly id: "https://schemas.originvault.box/RevenueDistribution";
        readonly hash: "d011f25e3f3c234b";
        readonly version: "1.0.0";
    };
    readonly Revocation: {
        readonly name: "Revocation";
        readonly id: "https://schemas.originvault.box/Revocation";
        readonly hash: "e156647323933e43";
        readonly version: "1.0.0";
    };
    readonly RootAuthority: {
        readonly name: "RootAuthority";
        readonly id: "https://schemas.originvault.box/RootAuthority";
        readonly hash: "2afafb69b1bd0ef0";
        readonly version: "1.0.0";
    };
    readonly ServiceLevelAgreement: {
        readonly name: "ServiceLevelAgreement";
        readonly id: "https://schemas.originvault.io/ServiceLevelAgreement";
        readonly hash: "3a5f60ecb841038c";
        readonly version: "1.0.0";
    };
    readonly StorageNodeDeclaration: {
        readonly name: "StorageNodeDeclaration";
        readonly id: "https://schemas.originvault.box/StorageNodeDeclaration";
        readonly hash: "34956500c4e271f2";
        readonly version: "1.0.0";
    };
    readonly TrustChainDelegation: {
        readonly name: "TrustChainDelegation";
        readonly id: "https://schemas.originvault.box/TrustChainDelegation";
        readonly hash: "e9c92577cc2f726b";
        readonly version: "1.0.0";
    };
    readonly TrustDelegation: {
        readonly name: "TrustDelegation";
        readonly id: "https://schemas.originvault.box/TrustEndorsement";
        readonly hash: "92e63377410eda91";
        readonly version: "1.0.0";
    };
    readonly TrustedIssuer: {
        readonly name: "TrustedIssuer";
        readonly id: "https://schemas.originvault.box/TrustedIssuer";
        readonly hash: "46e5a8521671b570";
        readonly version: "1.0.0";
    };
    readonly TrustGate: {
        readonly name: "TrustGate";
        readonly id: "https://schemas.originvault.io/TrustGate";
        readonly hash: "a98178988d66deb1";
        readonly version: "1.0.0";
    };
    readonly TrustScore: {
        readonly name: "TrustScore";
        readonly id: "https://schemas.originvault.box/TrustScore";
        readonly hash: "d7935044851cb392";
        readonly version: "1.0.0";
    };
    readonly TsconfigJson: {
        readonly name: "TsconfigJson";
        readonly id: "TsconfigJson";
        readonly hash: "e9adda821c2f0a17";
        readonly version: "1.0.0";
    };
    readonly VaultAdminAgreement: {
        readonly name: "VaultAdminAgreement";
        readonly id: "https://schemas.originvault.box/VaultAdminAgreement";
        readonly hash: "e5eae1428ba46fd5";
        readonly version: "1.0.0";
    };
    readonly VaultChamberGovernance: {
        readonly name: "VaultChamberGovernance";
        readonly id: "https://schemas.originvault.box/VaultChamberGovernance";
        readonly hash: "7cbdb4325892710d";
        readonly version: "1.0.0";
    };
    readonly VaultChamberPlugin: {
        readonly name: "VaultChamberPlugin";
        readonly id: "https://schemas.originvault.box/VaultChamberPlugin";
        readonly hash: "b796b46d45134305";
        readonly version: "1.0.0";
    };
    readonly VaultChamberTagging: {
        readonly name: "VaultChamberTagging";
        readonly id: "https://schemas.originvault.box/VaultChamberTagging";
        readonly hash: "15f98337ae4033ed";
        readonly version: "1.0.0";
    };
    readonly VaultChamberTransaction: {
        readonly name: "VaultChamberTransaction";
        readonly id: "https://schemas.originvault.box/VaultChamberTransaction";
        readonly hash: "05c23d7c23b61867";
        readonly version: "1.0.0";
    };
    readonly VaultDeclaration: {
        readonly name: "VaultDeclaration";
        readonly id: "https://schemas.originvault.io/VaultDeclaration";
        readonly hash: "feaabcf9d6884d81";
        readonly version: "1.0.0";
    };
    readonly VaultOperator: {
        readonly name: "VaultOperator";
        readonly id: "https://schemas.originvault.box/VaultOperatorPersona";
        readonly hash: "54302395c476c1f9";
        readonly version: "1.0.0";
    };
    readonly VaultPluginInstallationLog: {
        readonly name: "VaultPluginInstallationLog";
        readonly id: "https://schemas.originvault.box/PluginInstallationLog";
        readonly hash: "33dc13f5855a4643";
        readonly version: "1.0.0";
    };
    readonly VaultUserAgreement: {
        readonly name: "VaultUserAgreement";
        readonly id: "https://schemas.originvault.box/VaultUserAgreement";
        readonly hash: "11f58cac111cfe05";
        readonly version: "1.0.0";
    };
    readonly VerificationLog: {
        readonly name: "VerificationLog";
        readonly id: "https://schemas.originvault.box/VerificationLog";
        readonly hash: "d64f99385e997ecf";
        readonly version: "1.0.0";
    };
    readonly VerificationNode: {
        readonly name: "VerificationNode";
        readonly id: "https://schemas.originvault.box/VerificationNodeDeclaration";
        readonly hash: "fc7f00266e5fb58d";
        readonly version: "1.0.0";
    };
    readonly Verifier: {
        readonly name: "Verifier";
        readonly id: "https://schemas.originvault.box/VerifierPersona";
        readonly hash: "846df176af70066d";
        readonly version: "1.0.0";
    };
    readonly VotingSchema: {
        readonly name: "VotingSchema";
        readonly id: "https://schemas.originvault.box/Voting";
        readonly hash: "a76b926ba474ef2c";
        readonly version: "1.0.0";
    };
};
export type SchemaName = keyof typeof SCHEMA_REGISTRY;
export type SchemaHash = typeof SCHEMA_HASHES[SchemaName];
export declare function getSchemaByName(name: SchemaName): {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/Admin";
    readonly title: "Admin";
    readonly description: "Defines an administrator role within OriginVault, including governance and permissions.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["Person", "Organization"];
            readonly description: "Schema.org type";
        };
        readonly adminId: {
            readonly type: "string";
            readonly description: "DID of the admin.";
        };
        readonly governsVaults: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of vaults managed by this admin.";
            };
        };
        readonly managesNodes: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of nodes managed by this admin.";
            };
        };
        readonly policyApprovals: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of approved governance policies.";
            };
        };
        readonly enforcementActions: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly actionId: {
                        readonly type: "string";
                        readonly description: "DID of the action taken.";
                    };
                    readonly targetEntity: {
                        readonly type: "string";
                        readonly description: "DID of the entity affected by the action.";
                    };
                    readonly reason: {
                        readonly type: "string";
                        readonly description: "Reason for enforcement.";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Time of enforcement action.";
                    };
                };
            };
            readonly description: "Records enforcement actions taken by the admin.";
        };
        readonly trustedByNamespaces: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of namespaces that trust this admin.";
            };
        };
        readonly securityClearanceLevel: {
            readonly type: "string";
            readonly enum: readonly ["low", "medium", "high"];
            readonly description: "Level of security clearance granted to the admin.";
        };
    };
    readonly required: readonly ["adminId", "governsVaults", "managesNodes", "policyApprovals"];
} | {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly $id: "https://json.schemastore.org/aiconfig-1.0.json";
    readonly additionalProperties: {};
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly description: "Friendly name descriptor for the AIConfig. Could default to the filename if not specified.";
            readonly type: "string";
        };
        readonly description: {
            readonly description: "Description of the AIConfig.\nIf you have a collection of different AIConfigs, this may be used for dynamic prompt routing.";
            readonly type: "string";
        };
        readonly schema_version: {
            readonly $ref: "#/definitions/SchemaVersion";
            readonly description: "The version of the AIConfig schema.";
        };
        readonly metadata: {
            readonly description: "Root-level metadata that applies to the entire AIConfig.";
            readonly type: "object";
            readonly additionalProperties: {};
            readonly properties: {
                readonly parameters: {
                    readonly description: "Parameter definitions that are accessible to all prompts in this AIConfig.\nThese parameters can be referenced in the prompts using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.";
                    readonly type: "object";
                    readonly additionalProperties: {};
                };
                readonly models: {
                    readonly description: "Globally defined model settings. Any prompts that use these models will have these settings applied by default,\nunless they override them with their own model settings.";
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: {};
                    };
                };
                readonly default_model: {
                    readonly description: "Default model to use for prompts that do not specify a model.";
                    readonly type: "string";
                };
                readonly model_parsers: {
                    readonly description: "Model ID to ModelParser ID mapping.\nThis is useful if you want to use a custom ModelParser for a model, or if a single ModelParser can handle multiple models.";
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "string";
                    };
                };
            };
        };
        readonly prompts: {
            readonly description: "Array of prompts that make up the AIConfig.";
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly name: {
                        readonly description: "A unique identifier for the prompt. This is used to reference the prompt in other parts of the AIConfig (such as other prompts)";
                        readonly type: "string";
                    };
                    readonly input: {
                        readonly $ref: "#/definitions/PromptInput";
                        readonly description: "The prompt string, or a more complex prompt object.";
                    };
                    readonly metadata: {
                        readonly type: "object";
                        readonly additionalProperties: {};
                        readonly properties: {
                            readonly parameters: {
                                readonly description: "Parameter definitions that are accessible to this prompt.\nThese parameters can be referenced in the prompt using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.";
                                readonly type: "object";
                                readonly additionalProperties: {};
                            };
                            readonly model: {
                                readonly description: "Model name/settings that apply to this prompt.\nThese settings override any global model settings that may have been defined in the AIConfig metadata.\nIf this is a string, it is assumed to be the model name.\nIf this is undefined, the default model specified in the default_model property will be used for this Prompt.";
                                readonly anyOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly description: "The ID of the model to use.";
                                            readonly type: "string";
                                        };
                                        readonly settings: {
                                            readonly description: "Model inference settings that apply to this prompt.";
                                            readonly type: "object";
                                            readonly additionalProperties: {};
                                        };
                                    };
                                    readonly required: readonly ["name"];
                                }, {
                                    readonly type: "string";
                                }];
                            };
                            readonly tags: {
                                readonly description: "Tags for this prompt. Tags must be unique, and must not contain commas.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                    readonly outputs: {
                        readonly description: "Execution, display, or stream outputs.";
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/definitions/Output";
                        };
                    };
                };
                readonly required: readonly ["input", "name"];
            };
        };
    };
    readonly required: readonly ["metadata", "name", "prompts", "schema_version"];
    readonly definitions: {
        readonly SchemaVersion: {
            readonly anyOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly major: {
                        readonly type: "number";
                    };
                    readonly minor: {
                        readonly type: "number";
                    };
                };
                readonly required: readonly ["major", "minor"];
            }, {
                readonly enum: readonly ["latest", "v1"];
                readonly type: "string";
            }];
        };
        readonly PromptInput: {
            readonly anyOf: readonly [{
                readonly type: "object";
                readonly additionalProperties: {};
                readonly properties: {
                    readonly data: {
                        readonly description: "Input to the model. This can represent a single input, or multiple inputs.\nThe structure of the data object is up to the ModelParser. Attachments field should be leveraged for non-text inputs (e.g. image, audio).";
                    };
                    readonly attachments: {
                        readonly description: "Used to include non-text inputs (e.g. image, audio) of specified MIME types in the prompt";
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/definitions/Attachment";
                        };
                    };
                };
            }, {
                readonly type: "string";
            }];
        };
        readonly Attachment: {
            readonly description: "Data of specified MIME type to attach to a prompt";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly mime_type: {
                    readonly description: "MIME type of the attachment. If not specified, the MIME type will be assumed to be text/plain.";
                    readonly type: "string";
                };
                readonly data: {
                    readonly description: "Data representing the attachment";
                };
                readonly metadata: {
                    readonly description: "Attachment metadata.";
                    readonly type: "object";
                    readonly additionalProperties: {};
                };
            };
        };
        readonly Output: {
            readonly description: "Model inference result.";
            readonly anyOf: readonly [{
                readonly description: "Result of executing a prompt.";
                readonly type: "object";
                readonly properties: {
                    readonly output_type: {
                        readonly description: "Type of output.";
                        readonly type: "string";
                        readonly const: "execute_result";
                    };
                    readonly execution_count: {
                        readonly description: "A result's prompt number.";
                        readonly type: "number";
                    };
                    readonly data: {
                        readonly description: "The result of executing the prompt.";
                    };
                    readonly mime_type: {
                        readonly description: "The MIME type of the result. If not specified, the MIME type will be assumed to be plain text.";
                        readonly type: "string";
                    };
                    readonly metadata: {
                        readonly description: "Output metadata.";
                        readonly type: "object";
                        readonly additionalProperties: {};
                    };
                };
                readonly required: readonly ["data", "output_type"];
            }, {
                readonly description: "Output of an error that occurred during inference.";
                readonly type: "object";
                readonly properties: {
                    readonly output_type: {
                        readonly description: "Type of output.";
                        readonly type: "string";
                        readonly const: "error";
                    };
                    readonly ename: {
                        readonly description: "The name of the error.";
                        readonly type: "string";
                    };
                    readonly evalue: {
                        readonly description: "The value, or message, of the error.";
                        readonly type: "string";
                    };
                    readonly traceback: {
                        readonly description: "The error's traceback, represented as an array of strings.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
                readonly required: readonly ["ename", "evalue", "output_type", "traceback"];
            }];
        };
    };
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/AITrainingAgreement";
    readonly title: "AI Model Training Agreement";
    readonly description: "Defines terms for AI companies training models on data within OV Vaults.";
    readonly type: "object";
    readonly properties: {
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly buyerId: {
            readonly type: "string";
            readonly description: "DID of the AI company.";
        };
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Vault Chamber providing data.";
        };
        readonly licenseTerms: {
            readonly type: "object";
            readonly properties: {
                readonly licenseType: {
                    readonly type: "string";
                    readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited"];
                };
                readonly dataAnonymization: {
                    readonly type: "boolean";
                    readonly description: "Whether the data must be anonymized.";
                };
            };
        };
        readonly usageScope: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["Training Only", "Commercial Model Deployment", "Open-Source Research"];
            };
        };
        readonly complianceRequirements: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "Legal compliance and privacy requirements.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions under which access can be revoked.";
        };
        readonly paymentProof: {
            readonly type: "string";
            readonly description: "Verifiable Credential proving payment.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the AI company has accepted the agreement.";
        };
    };
    readonly required: readonly ["agreementId", "buyerId", "chamberId", "licenseTerms", "usageScope", "complianceRequirements", "revocationPolicy", "paymentProof", "agreementSigned"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/ClaimVerification";
    readonly title: "Claim Verification";
    readonly type: "object";
    readonly properties: {
        readonly identifier: {
            readonly type: "string";
            readonly description: "DID of the claim.";
        };
        readonly interpretedAsClaim: {
            readonly type: "string";
            readonly description: "The assertion made by this content (e.g., 'This image was created by AI').";
        };
        readonly claimInterpreter: {
            readonly type: "object";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "DID of the verifying entity.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the interpreter (e.g., OriginVault AI Trust Validator).";
                };
            };
        };
    };
    readonly required: readonly ["identifier", "interpretedAsClaim", "claimInterpreter"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ClusterGovernance";
    readonly title: "Cluster Governance Schema";
    readonly description: "Defines governance rules for an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the cluster governance document.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster this governance applies to.";
        };
        readonly nodeManagement: {
            readonly type: "object";
            readonly properties: {
                readonly verificationMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["Open", "Permissioned", "Staked"];
                    readonly description: "The method used to verify new nodes joining the cluster.";
                };
                readonly removalPolicy: {
                    readonly type: "string";
                    readonly description: "Conditions under which nodes can be removed from the cluster.";
                };
            };
            readonly description: "Rules for adding and removing nodes in the cluster.";
        };
        readonly serviceManagement: {
            readonly type: "object";
            readonly properties: {
                readonly allowedServices: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of service types permitted in this cluster (e.g., Storage, Verification, Payment).";
                };
                readonly serviceVerification: {
                    readonly type: "string";
                    readonly description: "Reference to a DID-Linked Resource explaining service verification requirements.";
                };
            };
            readonly description: "Governance rules for services running in the cluster.";
        };
        readonly securityPolicies: {
            readonly type: "object";
            readonly properties: {
                readonly auditFrequency: {
                    readonly type: "string";
                    readonly enum: readonly ["Daily", "Weekly", "Monthly"];
                    readonly description: "How frequently the cluster undergoes audits.";
                };
                readonly complianceChecks: {
                    readonly type: "string";
                    readonly description: "Reference to a DID-Linked Resource detailing compliance requirements.";
                };
            };
            readonly description: "Security and compliance policies for the cluster.";
        };
        readonly governanceModel: {
            readonly type: "string";
            readonly enum: readonly ["AdminControlled", "MultiSig", "TokenVoting"];
            readonly description: "The governance model used to manage this cluster.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this governance document was issued.";
        };
    };
    readonly required: readonly ["id", "cluster", "nodeManagement", "serviceManagement", "securityPolicies", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ClusterRegistration";
    readonly title: "Cluster Registration";
    readonly description: "Defines the registration details of an OV cluster within a namespace.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "DID of the cluster registration document.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "DID of the namespace this cluster belongs to.";
        };
        readonly clusterDID: {
            readonly type: "string";
            readonly description: "DID of the cluster.";
        };
        readonly governanceModel: {
            readonly type: "string";
            readonly enum: readonly ["centralized", "decentralized", "DAO-based"];
            readonly description: "Governance model of the cluster.";
        };
        readonly supportedPlugins: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of plugin DIDs this cluster supports.";
        };
        readonly nodeOperators: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of DIDs of node operators in this cluster.";
        };
        readonly createdAt: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp when the cluster was registered.";
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof of the cluster registration.";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly description: "Proof type.";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of proof creation.";
                };
                readonly verificationMethod: {
                    readonly type: "string";
                    readonly description: "DID or method used to verify this proof.";
                };
                readonly signatureValue: {
                    readonly type: "string";
                    readonly description: "Base64 or hex-encoded signature.";
                };
            };
        };
    };
    readonly required: readonly ["id", "namespace", "clusterDID", "governanceModel", "supportedPlugins", "nodeOperators", "createdAt", "proof"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/CommunityMemberPersona";
    readonly title: "Community Member Persona";
    readonly description: "Defines a general community member in the OriginVault ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly participationHistory: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly activity: {
                        readonly type: "string";
                        readonly description: "Type of participation (e.g., event, discussion, content rating).";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date of participation.";
                    };
                };
            };
            readonly description: "Tracks engagement in OV-related activities.";
        };
        readonly referredUsers: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of users referred to OV.";
            };
        };
    };
    readonly required: readonly ["participationHistory"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/ComputeNodeDeclaration";
    readonly title: "Compute Node Declaration";
    readonly description: "Defines a Compute Node in an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the Compute Node.";
        };
        readonly type: {
            readonly const: "ComputeNode";
            readonly description: "Node type.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster this node belongs to.";
        };
        readonly operator: {
            readonly type: "string";
            readonly description: "DID of the entity operating this node.";
        };
        readonly computeResources: {
            readonly type: "object";
            readonly properties: {
                readonly cpu: {
                    readonly type: "string";
                    readonly description: "CPU specifications (e.g., 8 cores, 3.2GHz).";
                };
                readonly ram: {
                    readonly type: "string";
                    readonly description: "RAM available (e.g., 32GB, 64GB).";
                };
                readonly gpu: {
                    readonly type: "string";
                    readonly description: "GPU specifications (if applicable).";
                };
            };
            readonly description: "Hardware specifications of the compute node.";
        };
        readonly supportedTasks: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of supported compute tasks (e.g., AI Training, Data Transformation, Encryption).";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., Data, ProcessingLogs, ModelOutputs).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "References to compute tasks and results.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "suspended", "revoked"];
            readonly description: "Operational status of the node.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of node declaration.";
        };
    };
    readonly required: readonly ["id", "cluster", "operator", "computeResources", "supportedTasks", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ContentAIPermissionAssertionCredential";
    readonly title: "Content AI Permission Assertion Credential";
    readonly description: "Verifiable Credential asserting AI usage permissions and restrictions for digital content.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "The unique identifier for the credential.";
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
        };
        readonly issuer: {
            readonly type: "object";
            readonly description: "The entity that issued the credential.";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "The unique identifier for the issuer.";
                };
            };
            readonly required: readonly ["id"];
        };
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The context of the credential.";
        };
        readonly expirationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "The expiration date of the credential.";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly "@type": {
                    readonly type: "string";
                    readonly enum: readonly ["DigitalDocument", "License"];
                    readonly description: "Schema.org type";
                };
                readonly id: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "The unique identifier for the content.";
                };
                readonly license: {
                    readonly type: "object";
                    readonly properties: {
                        readonly contentId: {
                            readonly type: "string";
                            readonly description: "DID of the content associated with this AI permission credential.";
                        };
                        readonly owner: {
                            readonly type: "object";
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly description: "DID of the content owner.";
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Owners name or organization.";
                                };
                            };
                        };
                        readonly permissions: {
                            readonly type: "object";
                            readonly properties: {
                                readonly allowDataMining: {
                                    readonly type: "boolean";
                                    readonly title: "Allow Data Mining?";
                                };
                                readonly allowAITraining: {
                                    readonly type: "boolean";
                                    readonly title: "Allow AI/ML Training?";
                                };
                                readonly allowAIInference: {
                                    readonly type: "boolean";
                                    readonly title: "Allow AI/ML Inference?";
                                };
                                readonly allowGenerativeAI: {
                                    readonly type: "boolean";
                                    readonly title: "Allow Generative AI (Image/Video/Text Generation)?";
                                };
                            };
                        };
                        readonly prohibitedUses: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["Resale", "Commercial AI Training", "Facial Recognition", "Military Use"];
                                readonly description: "Explicitly prohibited use cases.";
                            };
                        };
                    };
                    readonly required: readonly ["contentId", "owner", "permissions"];
                };
                readonly monetization: {
                    readonly type: "object";
                    readonly properties: {
                        readonly licensingRequired: {
                            readonly type: "boolean";
                            readonly description: "Whether AI-related use requires a license.";
                        };
                        readonly paymentModel: {
                            readonly type: "string";
                            readonly enum: readonly ["One-Time Fee", "Subscription", "Per API Call"];
                            readonly description: "The payment model for AI permissions.";
                        };
                        readonly price: {
                            readonly type: "number";
                            readonly description: "Price in USD or equivalent crypto.";
                        };
                        readonly royaltyPercentage: {
                            readonly type: "number";
                            readonly description: "Percentage of revenue owed to the content owner if used in AI applications.";
                        };
                    };
                    readonly description: "Defines AI licensing and monetization terms.";
                };
                readonly verification: {
                    readonly type: "object";
                    readonly properties: {
                        readonly complianceTracking: {
                            readonly type: "string";
                            readonly enum: readonly ["DID-Linked Resource", "On-Chain Record", "Verifiable Credential"];
                            readonly description: "Method used to track AI compliance.";
                        };
                        readonly auditFrequency: {
                            readonly type: "string";
                            readonly description: "How often compliance is reviewed (e.g., monthly, annually).";
                        };
                    };
                    readonly description: "Defines AI licensing enforcement and compliance tracking.";
                };
                readonly revocationPolicy: {
                    readonly type: "object";
                    readonly properties: {
                        readonly misuseConditions: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Conditions under which the AI permission is revoked.";
                        };
                        readonly expirationDate: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "The date when AI permissions expire.";
                        };
                    };
                    readonly description: "Defines when and why AI permissions may be revoked.";
                };
                readonly agreementSigned: {
                    readonly type: "boolean";
                    readonly description: "Whether both parties have accepted the AI permission terms.";
                };
                readonly issuedAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of issuance.";
                };
            };
        };
    };
    readonly required: readonly ["id", "issuer", "credentialSubject", "permissions", "verification", "revocationPolicy", "proof", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ContentAuthenticityAssertionCredential";
    readonly title: "Content Authenticity Assertion Credential";
    readonly description: "A Verifiable Credential that aggregates multiple content-related credentials into a single authenticity record.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "The unique identifier for the credential.";
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
        };
        readonly issuer: {
            readonly type: "object";
            readonly description: "The entity that issued the credential.";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "The unique identifier for the issuer.";
                };
            };
            readonly required: readonly ["id"];
        };
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The context of the credential.";
        };
        readonly expirationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "The expiration date of the credential.";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly contentId: {
                    readonly type: "string";
                    readonly description: "Unique ID of the associated content.";
                };
                readonly includedCredentials: {
                    readonly type: "object";
                    readonly description: "DID references to modular Verifiable Credentials included in this authenticity record.";
                    readonly properties: {
                        readonly contentDetails: {
                            readonly type: "string";
                            readonly description: "DID DLR URI of the Content Details VC.";
                        };
                        readonly identityClaims: {
                            readonly type: "string";
                            readonly description: "DID DLR URI of the Identity Claims VC.";
                        };
                        readonly extendedMetadata: {
                            readonly type: "string";
                            readonly description: "DID DLR URI of the Extended Metadata VC.";
                        };
                        readonly aiPermissions: {
                            readonly type: "string";
                            readonly description: "DID DLR URI of the AI Permissions VC.";
                        };
                        readonly contentSigning: {
                            readonly type: "string";
                            readonly description: "DID DLR URI of the Content Signing VC.";
                        };
                    };
                };
            };
            readonly required: readonly ["contentDetails", "identityClaims", "extendedMetadata", "aiPermissions", "contentSigning"];
        };
    };
    readonly required: readonly ["id", "issuer", "credentialSubject", "expirationDate"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential";
    readonly title: "Content Extended Metadata Assertion Credential";
    readonly description: "Verifiable Credential containing metadata such as licensing and usage restrictions.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "The unique identifier for the credential.";
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
        };
        readonly issuer: {
            readonly type: "object";
            readonly description: "The entity that issued the credential.";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "The unique identifier for the issuer.";
                };
            };
            readonly required: readonly ["id"];
        };
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The context of the credential.";
        };
        readonly expirationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "The expiration date of the credential.";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly contentReference: {
                    readonly type: "object";
                    readonly description: "References to the content’s integrity details.";
                    readonly properties: {
                        readonly identifier: {
                            readonly type: "string";
                            readonly description: "DID of the content being referenced.";
                        };
                        readonly contentHash: {
                            readonly type: "string";
                            readonly description: "SHA-256 or IPFS CID hash of the content.";
                        };
                        readonly perceptualHash: {
                            readonly type: "string";
                            readonly description: "Perceptual hash for similarity detection.";
                        };
                    };
                };
                readonly tags: {
                    readonly type: "string";
                    readonly title: "Tags (Comma-Separated)";
                };
                readonly licensing: {
                    readonly type: "string";
                    readonly title: "License Type";
                    readonly enum: readonly ["All Rights Reserved", "Creative Commons", "Public Domain"];
                };
                readonly usageRestrictions: {
                    readonly type: "array";
                    readonly title: "Usage Restrictions";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
                    };
                };
            };
            readonly required: readonly ["contentReference", "tags", "licensing", "usageRestrictions"];
        };
    };
    readonly required: readonly ["id", "issuer", "credentialSubject", "expirationDate"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/ContentLegalAccountability";
    readonly title: "Content Legal Accountability";
    readonly type: "object";
    readonly properties: {
        readonly identifier: {
            readonly type: "string";
            readonly description: "DID of the content.";
        };
        readonly accountablePerson: {
            readonly type: "object";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "DID of the responsible entity.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the accountable entity.";
                };
            };
        };
        readonly publisher: {
            readonly type: "object";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "DID of the publisher.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Publisher name.";
                };
            };
        };
        readonly legalJurisdiction: {
            readonly type: "string";
            readonly description: "Defines which legal system applies to the content.";
        };
        readonly disputeResolution: {
            readonly type: "string";
            readonly description: "URL or DID for dispute resolution policies.";
        };
    };
    readonly required: readonly ["identifier", "accountablePerson", "legalJurisdiction"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.io"];
    readonly $id: "https://schemas.originvault.box/ContentLicensingAgreement";
    readonly title: "Content Licensing Agreement";
    readonly description: "Defines licensing terms for content distributed through OriginVault.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly contentId: {
            readonly type: "string";
            readonly description: "DID of the licensed content.";
        };
        readonly creatorId: {
            readonly type: "string";
            readonly description: "DID of the content creator.";
        };
        readonly licenseeId: {
            readonly type: "string";
            readonly description: "DID of the entity purchasing the license.";
        };
        readonly agreeAction: {
            readonly type: "object";
            readonly description: "Represents the act of accepting this license.";
            readonly properties: {
                readonly "@type": {
                    readonly type: "string";
                    readonly enum: readonly ["AgreeAction"];
                    readonly description: "Schema.org type";
                };
                readonly agent: {
                    readonly type: "string";
                    readonly description: "DID of the licensee accepting the agreement.";
                };
                readonly object: {
                    readonly type: "string";
                    readonly description: "DID of this licensing agreement.";
                };
                readonly participant: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "DIDs of all involved parties (creator, licensee, etc.).";
                };
                readonly actionStatus: {
                    readonly type: "string";
                    readonly enum: readonly ["CompletedActionStatus"];
                    readonly description: "Agreement completion status.";
                };
                readonly startTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp when the agreement was signed.";
                };
                readonly endTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Expiration timestamp of the agreement.";
                };
            };
        };
        readonly claim: {
            readonly type: "object";
            readonly description: "Represents a claim related to the agreement (e.g., ownership, dispute).";
            readonly properties: {
                readonly "@type": {
                    readonly type: "string";
                    readonly enum: readonly ["Claim"];
                    readonly description: "Schema.org type";
                };
                readonly claimReviewed: {
                    readonly type: "string";
                    readonly description: "Claim being made (e.g., 'Properly Licensed').";
                };
                readonly author: {
                    readonly type: "string";
                    readonly description: "DID of the entity making the claim.";
                };
                readonly claimInterpreter: {
                    readonly type: "string";
                    readonly description: "DID of the validating entity (e.g., OV verification node).";
                };
                readonly reviewAspect: {
                    readonly type: "string";
                    readonly description: "Which aspect of the license is under review (e.g., royalty terms).";
                };
                readonly firstAppearance: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of the first assertion of the claim.";
                };
                readonly appearance: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Revalidation timestamp.";
                            };
                            readonly reviewStatus: {
                                readonly type: "string";
                                readonly enum: readonly ["Verified", "Disputed", "Revoked"];
                                readonly description: "Status of the claim.";
                            };
                        };
                    };
                };
            };
        };
        readonly licenseType: {
            readonly type: "string";
            readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited", "One-Time Use"];
            readonly description: "Defines whether the license is exclusive to the licensee or shared.";
        };
        readonly permittedUses: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["Personal Use", "Commercial Use", "AI Training", "Resale", "Public Display"];
            };
            readonly description: "Defines the specific use cases allowed for the licensee.";
        };
        readonly paymentTerms: {
            readonly type: "object";
            readonly properties: {
                readonly licenseFee: {
                    readonly type: "number";
                    readonly description: "Fixed price of the license in USD or crypto equivalent.";
                };
                readonly recurringFee: {
                    readonly type: "boolean";
                    readonly description: "Whether the license requires ongoing payments.";
                };
                readonly paymentSchedule: {
                    readonly type: "string";
                    readonly description: "Schedule for payments (e.g., one-time, monthly, annually).";
                };
            };
        };
        readonly royaltyTerms: {
            readonly type: "object";
            readonly properties: {
                readonly royaltyPercentage: {
                    readonly type: "number";
                    readonly description: "Percentage of revenue owed to the creator.";
                };
                readonly paymentSchedule: {
                    readonly type: "string";
                    readonly description: "How frequently royalties are paid.";
                };
            };
        };
        readonly revocationPolicy: {
            readonly type: "object";
            readonly properties: {
                readonly misuseConditions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "Conditions under which the license is revoked.";
                };
                readonly nonPaymentPenalty: {
                    readonly type: "boolean";
                    readonly description: "Whether failure to pay results in automatic revocation.";
                };
            };
        };
        readonly auditAndCompliance: {
            readonly type: "object";
            readonly properties: {
                readonly trackingMechanism: {
                    readonly type: "string";
                    readonly enum: readonly ["DID-Linked Resource", "Verifiable Credential", "On-Chain"];
                    readonly description: "How license compliance is tracked.";
                };
            };
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether both parties have accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "contentId", "creatorId", "licenseeId", "agreeAction", "licenseType", "permittedUses", "paymentTerms", "royaltyTerms", "revocationPolicy", "auditAndCompliance", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/ContentLicensingTerms";
    readonly title: "Content Licensing Terms";
    readonly description: "Defines licensing conditions and monetization models for digital content in OriginVault.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["CreativeWork", "MediaObject", "DigitalDocument", "SoftwareApplication", "License", "Agreement"];
            readonly description: "Defines the type of digital asset or contract.";
        };
        readonly identifier: {
            readonly type: "string";
            readonly description: "DID of the licensed content.";
        };
        readonly creator: {
            readonly type: "object";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "DID of the creator.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Creator name.";
                };
            };
            readonly required: readonly ["identifier"];
        };
        readonly acquireLicensePage: {
            readonly type: "string";
            readonly description: "URL where the license can be obtained (e.g., smart contract, marketplace link).";
        };
        readonly licenseType: {
            readonly type: "string";
            readonly enum: readonly ["Exclusive", "Non-Exclusive", "Time-Limited", "One-Time Use"];
            readonly description: "Defines if the license is shared or restricted.";
        };
        readonly licenseScope: {
            readonly type: "object";
            readonly properties: {
                readonly geographicRestrictions: {
                    readonly type: "string";
                    readonly enum: readonly ["Global", "Region-Specific", "Country-Specific"];
                    readonly description: "Where the licensee is permitted to use the content.";
                };
                readonly modificationRights: {
                    readonly type: "boolean";
                    readonly description: "Whether the licensee can modify or adapt the content.";
                };
                readonly sublicensingAllowed: {
                    readonly type: "boolean";
                    readonly description: "Whether the licensee can sublicense the content.";
                };
                readonly duration: {
                    readonly type: "string";
                    readonly description: "License duration (e.g., perpetual, 1 year, until 2030).";
                };
            };
        };
        readonly usageInfo: {
            readonly type: "string";
            readonly description: "URL linking to license terms & permitted uses.";
        };
        readonly permittedUses: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["Personal Use", "Commercial Use", "AI Training", "Resale", "Public Display"];
            };
            readonly description: "Defines permitted usage rights.";
        };
        readonly prohibitedUses: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
            };
            readonly description: "Explicitly states forbidden use cases.";
        };
        readonly monetizationModel: {
            readonly type: "object";
            readonly properties: {
                readonly price: {
                    readonly type: "number";
                    readonly description: "Price in USD or crypto equivalent.";
                };
                readonly paymentMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["Stripe", "Crypto", "NFT"];
                };
                readonly recurringFee: {
                    readonly type: "boolean";
                    readonly description: "Whether ongoing payments are required.";
                };
                readonly paymentSchedule: {
                    readonly type: "string";
                    readonly description: "Schedule for payments (one-time, monthly, annually).";
                };
                readonly royaltyTerms: {
                    readonly type: "object";
                    readonly properties: {
                        readonly royaltyPercentage: {
                            readonly type: "number";
                            readonly description: "Percentage paid to the creator.";
                        };
                        readonly paymentSchedule: {
                            readonly type: "string";
                            readonly description: "Schedule for royalty payments.";
                        };
                        readonly distributionMethod: {
                            readonly type: "string";
                            readonly enum: readonly ["Stripe Connect", "Crypto Split", "Manual Payout"];
                            readonly description: "How royalties are distributed.";
                        };
                    };
                };
            };
            readonly description: "Defines how the license is monetized.";
        };
        readonly verification: {
            readonly type: "object";
            readonly properties: {
                readonly complianceTracking: {
                    readonly type: "string";
                    readonly enum: readonly ["DID-Linked Resource", "On-Chain Record", "Verifiable Credential"];
                    readonly description: "Method used to track compliance with licensing terms.";
                };
                readonly verificationAuthority: {
                    readonly type: "string";
                    readonly description: "DID of the entity responsible for verifying compliance.";
                };
                readonly auditFrequency: {
                    readonly type: "string";
                    readonly description: "How often compliance checks are conducted (e.g., quarterly, annually).";
                };
            };
            readonly description: "Defines how licensing compliance is tracked and enforced.";
        };
        readonly verifiableCredential: {
            readonly type: "object";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "URI to the VC.";
                };
                readonly issuer: {
                    readonly type: "object";
                    readonly properties: {
                        readonly identifier: {
                            readonly type: "string";
                            readonly description: "DID of the issuer.";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Issuer name.";
                        };
                    };
                };
            };
        };
        readonly revocationPolicy: {
            readonly type: "object";
            readonly properties: {
                readonly misuseConditions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "Conditions under which the license is revoked.";
                };
                readonly nonPaymentPenalty: {
                    readonly type: "boolean";
                    readonly description: "Whether failure to pay results in automatic revocation.";
                };
            };
        };
        readonly disputeResolution: {
            readonly type: "object";
            readonly properties: {
                readonly arbitrationMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["DAO Voting", "Legal Arbitration", "Multi-Sig Review"];
                    readonly description: "How disputes over the license are handled.";
                };
                readonly appealProcess: {
                    readonly type: "string";
                    readonly description: "How a licensee can challenge revocation or penalty.";
                };
            };
            readonly description: "Defines mechanisms for resolving disputes related to the agreement.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether both parties have accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["identifier", "creator", "licenseType", "licenseScope", "permittedUses", "monetizationModel", "verification", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/Creator";
    readonly title: "Creator";
    readonly description: "Defines a content creator in the OriginVault ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly totalPublishedContent: {
            readonly type: "number";
            readonly description: "Total number of published pieces.";
        };
        readonly licenseAgreements: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of content licensing agreements.";
            };
        };
        readonly aiUsagePolicies: {
            readonly type: "object";
            readonly properties: {
                readonly allowsAITraining: {
                    readonly type: "boolean";
                    readonly description: "Whether AI companies can train on this creator's content.";
                };
                readonly allowsAIInference: {
                    readonly type: "boolean";
                    readonly description: "Whether AI can use content for inference.";
                };
            };
            readonly description: "Defines AI usage restrictions for the creator's content.";
        };
        readonly earningsHistory: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly transactionId: {
                        readonly type: "string";
                        readonly description: "Transaction ID for a sale.";
                    };
                    readonly amount: {
                        readonly type: "number";
                        readonly description: "Earnings from the transaction.";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date of transaction.";
                    };
                };
            };
            readonly description: "Tracks revenue earned by the creator.";
        };
    };
    readonly required: readonly ["totalPublishedContent", "licenseAgreements", "aiUsagePolicies"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/DataChamberContributorAgreement";
    readonly title: "Data Chamber Contributor Agreement";
    readonly description: "Defines the terms under which a user contributes data to a Vault Chamber for potential monetization.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Data Chamber.";
        };
        readonly userId: {
            readonly type: "string";
            readonly description: "DID of the contributor.";
        };
        readonly dataUsageTerms: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["AI Training", "Research", "Commercial Use", "Limited Redistribution"];
                readonly description: "List of allowed uses for contributed data.";
            };
        };
        readonly optOutPolicy: {
            readonly type: "object";
            readonly properties: {
                readonly optOutAllowed: {
                    readonly type: "boolean";
                    readonly description: "Whether users can opt out after contribution.";
                };
                readonly dataRetentionPeriod: {
                    readonly type: "string";
                    readonly description: "How long data is stored after opt-out.";
                };
            };
        };
        readonly compensationModel: {
            readonly type: "object";
            readonly properties: {
                readonly revenueShare: {
                    readonly type: "number";
                    readonly description: "Percentage of revenue given to contributors.";
                };
                readonly rewardMechanism: {
                    readonly type: "string";
                    readonly enum: readonly ["Fiat Payout", "Gems", "Tokens"];
                    readonly description: "How users are rewarded for their data.";
                };
            };
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the user has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "chamberId", "userId", "dataUsageTerms", "optOutPolicy", "compensationModel", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/DataChamberEnrollment";
    readonly title: "Data Chamber Enrollment";
    readonly description: "Defines how users enroll in data pools within Vault Chambers and the terms of participation.";
    readonly type: "object";
    readonly properties: {
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Data Chamber.";
        };
        readonly userId: {
            readonly type: "string";
            readonly description: "DID of the user enrolling in the chamber.";
        };
        readonly contributedData: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly dataId: {
                        readonly type: "string";
                        readonly description: "DID of the data contribution.";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "When the data was added.";
                    };
                };
            };
            readonly description: "List of data contributions by this user.";
        };
        readonly termsAccepted: {
            readonly type: "boolean";
            readonly description: "Whether the user has accepted the data-sharing terms.";
        };
        readonly rewardEligibility: {
            readonly type: "object";
            readonly properties: {
                readonly revenueSharePercentage: {
                    readonly type: "number";
                    readonly description: "The percentage of sales the user is eligible for.";
                };
                readonly rewardMechanism: {
                    readonly type: "string";
                    readonly enum: readonly ["Gems", "Tokens", "Fiat Payout"];
                    readonly description: "How users are rewarded.";
                };
            };
            readonly description: "Defines how rewards are distributed.";
        };
    };
    readonly required: readonly ["chamberId", "userId", "contributedData", "termsAccepted", "rewardEligibility"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/Developer";
    readonly title: "Developer";
    readonly description: "Defines a developer's identity, contributions, and repositories in OriginVault.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["Person"];
            readonly description: "Schema.org type";
        };
        readonly developerId: {
            readonly type: "string";
            readonly description: "DID of the developer.";
        };
        readonly githubProfile: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "Developer's GitHub or GitLab profile.";
        };
        readonly publishedPlugins: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of plugins created by the developer.";
            };
            readonly description: "List of plugins or software developed.";
        };
        readonly signedCommits: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of cryptographically signed commits by the developer.";
        };
        readonly trustedBy: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of other developers or organizations that trust this developer.";
            };
        };
        readonly reputationScore: {
            readonly type: "number";
            readonly description: "Reputation score based on trust metrics.";
        };
        readonly certifications: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of certifications proving expertise.";
            };
        };
    };
    readonly required: readonly ["developerId", "publishedPlugins", "signedCommits"];
} | {
    readonly $schema: "https://json-schema.org/draft-07/schema";
    readonly $id: "https://schemas.originvault.box/DevelopmentEnvironmentMetadata.schema.json";
    readonly title: "Development Environment Metadata";
    readonly type: "object";
    readonly properties: {
        readonly environment: {
            readonly type: "string";
            readonly description: "The development environment or platform used (e.g., 'Node.js v14.17.0').";
        };
        readonly packageJson: {
            readonly $ref: "https://json.schemastore.org/package.json";
        };
        readonly buildTool: {
            readonly type: "string";
            readonly description: "The tool used for building or compiling the project (e.g., 'webpack v5.38.1').";
        };
        readonly commitHash: {
            readonly type: "string";
            readonly description: "The Git commit hash corresponding to the codebase at the time of credential issuance.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "The date and time when the credential was generated.";
        };
        readonly operatingSystem: {
            readonly type: "string";
            readonly description: "A generic description of the operating system used in the development environment (e.g., 'Linux-based OS').";
        };
        readonly hostname: {
            readonly type: "string";
            readonly description: "The hashed hostname of the machine running the development environment.";
        };
        readonly ipAddress: {
            readonly type: "string";
            readonly description: "The hashed IP address of the machine running the development environment.";
        };
    };
    readonly required: readonly ["environment", "packageJson", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft-07/schema";
    readonly $id: "https://schemas.originvault.box/DIDAssertionCredential.schema.json";
    readonly title: "DID Assertion Credential";
    readonly version: "0.0.1";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "The unique identifier for the credential.";
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The type of the credential, typically including 'VerifiableCredential'.";
        };
        readonly credentialSubject: {
            readonly description: "The subject of the credential.";
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "The DID that this credential is asserting information about.";
                };
                readonly claimReviewed: {
                    readonly type: "string";
                    readonly description: "The specific claim made about this DID (e.g., 'Trusted Creator').";
                };
                readonly author: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "DID of the entity making this claim (same as issuer).";
                };
                readonly claimInterpreter: {
                    readonly type: "string";
                    readonly description: "The entity validating the claim (e.g., an OV verification node).";
                };
                readonly reviewAspect: {
                    readonly type: "string";
                    readonly description: "Specific characteristic being reviewed (e.g., 'Content Authenticity').";
                };
                readonly firstAppearance: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp when this claim was first issued.";
                };
                readonly appearance: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Revalidation timestamp.";
                            };
                            readonly reviewStatus: {
                                readonly type: "string";
                                readonly enum: readonly ["Verified", "Disputed", "Revoked"];
                                readonly description: "Status of the claim.";
                            };
                        };
                    };
                    readonly description: "History of appearances or updates to the claim.";
                };
            };
        };
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The context of the credential.";
        };
    };
    readonly required: readonly ["id", "type", "credentialSubject", "@context"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/DIDDeclaration";
    readonly title: "DID Declaration";
    readonly description: "Defines the role and permissions of a DID in an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the entity declaring itself.";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["NamespaceDeclaration", "NodeClusterDeclaration", "NodeDeclaration", "VaultDeclaration", "IdentityNodeDeclaration", "StorageNodeDeclaration", "VaultOwnerDeclaration"];
            readonly description: "The type of DID declaration.";
        };
        readonly parent: {
            readonly type: "string";
            readonly description: "The DID of the parent entity (e.g., a Cluster under a Namespace, or a Node under a Cluster).";
        };
        readonly roles: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "The roles assigned to this DID (e.g., IdentityNode, StorageNode, VaultOwner).";
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly managedBy: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of DIDs that govern this entity.";
                };
                readonly rules: {
                    readonly type: "string";
                    readonly description: "A reference to governance policies (e.g., Ceramic document).";
                };
            };
            readonly description: "Governance settings for this DID.";
        };
    };
    readonly required: readonly ["id", "type"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/DigitalDocument";
    readonly title: "Digital Document";
    readonly description: "Verifiable digital document metadata for OriginVault content.";
    readonly type: "object";
    readonly properties: {
        readonly identifier: {
            readonly type: "string";
            readonly description: "DID of the content.";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name or title of the document.";
        };
        readonly author: {
            readonly type: "string";
            readonly description: "DID of the creator or owner.";
        };
        readonly encodingFormat: {
            readonly type: "string";
            readonly description: "MIME type of the file (e.g., image/png, video/mp4).";
        };
        readonly publisher: {
            readonly type: "string";
            readonly description: "DID of the publisher.";
        };
        readonly publication: {
            readonly type: "string";
            readonly description: "Verifiable Credential URI of the publication.";
        };
        readonly contentSize: {
            readonly type: "number";
            readonly description: "Size of the document in bytes.";
        };
        readonly isBasedOn: {
            readonly type: "string";
            readonly description: "DID of the source if derived from another work.";
        };
        readonly dateCreated: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp when the document was created.";
        };
        readonly dateModified: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of the last modification.";
        };
        readonly license: {
            readonly type: "string";
            readonly description: "DID reference to the licensing agreement.";
        };
        readonly acquireLicensePage: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "URL where licenses can be purchased.";
        };
        readonly usageRestrictions: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["No AI Training", "No Redistribution", "No Commercial Use"];
            };
            readonly description: "Usage restrictions for the document.";
        };
        readonly C2PAManifest: {
            readonly type: "object";
            readonly description: "C2PA content authenticity proof.";
            readonly properties: {
                readonly identifier: {
                    readonly type: "string";
                    readonly description: "Verifiable Credential URI of the C2PA manifest.";
                };
                readonly contentSigner: {
                    readonly type: "string";
                    readonly description: "DID of the signing entity.";
                };
                readonly signatureValue: {
                    readonly type: "string";
                    readonly description: "Cryptographic signature of the content.";
                };
            };
        };
        readonly thumbnailUrl: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "URL to a thumbnail preview of the document.";
        };
        readonly associatedMedia: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly format: "uri";
            };
            readonly description: "Media files linked to this document (e.g., video sources, image formats).";
        };
        readonly sameAs: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly format: "uri";
            };
            readonly description: "External references (e.g., OpenSea, IPFS, Arweave).";
        };
    };
    readonly required: readonly ["identifier", "name", "author", "encodingFormat", "contentSize", "dateCreated", "license"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/EndorsementRecord";
    readonly title: "Endorsement Record";
    readonly description: "Represents an endorsement given by one DID to another, contributing to trust scoring.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "Unique identifier for the endorsement record";
        };
        readonly endorserDid: {
            readonly type: "string";
            readonly description: "DID of the user giving the endorsement";
            readonly pattern: "^did:";
        };
        readonly endorsedDid: {
            readonly type: "string";
            readonly description: "DID of the user receiving the endorsement";
            readonly pattern: "^did:";
        };
        readonly credentialType: {
            readonly type: "string";
            readonly description: "Type of credential being endorsed";
        };
        readonly weight: {
            readonly type: "number";
            readonly minimum: 0;
            readonly maximum: 10;
            readonly description: "Weight/strength of the endorsement (0-10)";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the endorsement was given";
        };
        readonly endorsementReason: {
            readonly type: "string";
            readonly description: "Reason for the endorsement";
        };
        readonly endorsementType: {
            readonly type: "string";
            readonly enum: readonly ["verification", "governance", "community", "development", "trust"];
            readonly description: "Category of the endorsement";
        };
        readonly linkedGem: {
            readonly type: "string";
            readonly description: "Gem that qualifies the endorser to give this endorsement";
        };
        readonly linkedCredential: {
            readonly type: "string";
            readonly description: "DID-Linked Resource to a Verifiable Credential supporting the endorsement";
        };
        readonly blockchainSync: {
            readonly type: "object";
            readonly properties: {
                readonly lastSynced: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Last time endorsement was synced with blockchain";
                };
                readonly pendingChanges: {
                    readonly type: "boolean";
                    readonly description: "Whether there are local changes not yet pushed to blockchain";
                };
                readonly blockchainResourceId: {
                    readonly type: "string";
                    readonly description: "Resource ID on blockchain for this endorsement";
                };
            };
            readonly description: "Blockchain synchronization status";
        };
        readonly metadata: {
            readonly type: "object";
            readonly description: "Additional metadata for the endorsement";
        };
    };
    readonly required: readonly ["id", "endorserDid", "endorsedDid", "credentialType", "weight", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ExternalDataBuyerAgreement";
    readonly title: "External Data Buyer Agreement";
    readonly description: "Defines the terms under which an external stakeholder purchases access to a Vault Chamber’s data.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Data Chamber being accessed.";
        };
        readonly buyerId: {
            readonly type: "string";
            readonly description: "DID of the external entity purchasing access.";
        };
        readonly accessTerms: {
            readonly type: "object";
            readonly properties: {
                readonly price: {
                    readonly type: "number";
                    readonly description: "Price paid for access.";
                };
                readonly licenseDuration: {
                    readonly type: "string";
                    readonly description: "How long the data is accessible.";
                };
                readonly usageRestrictions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["No AI Training", "No Redistribution", "Limited Commercial Use"];
                        readonly description: "Restrictions on how the data can be used.";
                    };
                };
                readonly revocationPolicy: {
                    readonly type: "string";
                    readonly description: "Conditions under which access may be revoked.";
                };
            };
        };
        readonly paymentProof: {
            readonly type: "string";
            readonly description: "Verifiable Credential proving payment.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the buyer has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "chamberId", "buyerId", "accessTerms", "paymentProof", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ExternalDataAccess";
    readonly title: "External Data Access";
    readonly description: "Defines how external stakeholders can purchase access to data in Vault Chambers.";
    readonly type: "object";
    readonly properties: {
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Data Chamber.";
        };
        readonly buyer: {
            readonly type: "string";
            readonly description: "DID of the external entity purchasing access.";
        };
        readonly accessTerms: {
            readonly type: "object";
            readonly properties: {
                readonly price: {
                    readonly type: "number";
                    readonly description: "Price of access.";
                };
                readonly licenseDuration: {
                    readonly type: "string";
                    readonly description: "How long the data is accessible.";
                };
                readonly usageRestrictions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["No AI Training", "No Redistribution", "Limited Commercial Use"];
                    };
                    readonly description: "Restrictions on how the data can be used.";
                };
            };
            readonly description: "Defines access pricing and restrictions.";
        };
        readonly paymentProof: {
            readonly type: "string";
            readonly description: "Verifiable Credential proving payment.";
        };
    };
    readonly required: readonly ["chamberId", "buyer", "accessTerms", "paymentProof"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GemDeclaration";
    readonly title: "Gem Declaration";
    readonly description: "Defines an OriginVault Gem awarded to users for contributions.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The unique DID of the Gem.";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["Founder's Gem", "Verifier's Gem", "Marker's Gem", "Advocate's Gem", "Builder's Gem", "Curator's Gem", "Trailblazer's Gem", "Luminary's Gem"];
            readonly description: "The category of the gem.";
        };
        readonly recipient: {
            readonly type: "string";
            readonly description: "DID of the user receiving the Gem.";
        };
        readonly issuer: {
            readonly type: "string";
            readonly description: "DID of the entity awarding the Gem.";
        };
        readonly dateIssued: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Date the Gem was issued.";
        };
        readonly metadata: {
            readonly type: "object";
            readonly description: "Additional metadata related to the Gem.";
            readonly properties: {
                readonly video: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "URL to the Gem's animated artwork.";
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "Description of why the Gem was awarded.";
                };
            };
        };
        readonly verifiableCredential: {
            readonly type: "string";
            readonly description: "DID-Linked Resource (DLR) to the Verifiable Credential proving eligibility for the Gem.";
        };
        readonly revocationStatus: {
            readonly type: "string";
            readonly enum: readonly ["valid", "revoked"];
            readonly description: "Whether the Gem is still recognized as valid.";
        };
    };
    readonly required: readonly ["id", "type", "recipient", "issuer", "dateIssued", "metadata", "verifiableCredential", "revocationStatus"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GemIssuance";
    readonly title: "Gem Issuance Record";
    readonly description: "Tracks the issuance of a Gem, including verification of eligibility.";
    readonly type: "object";
    readonly properties: {
        readonly gemId: {
            readonly type: "string";
            readonly description: "DID of the issued Gem.";
        };
        readonly issuer: {
            readonly type: "string";
            readonly description: "DID of the entity awarding the Gem.";
        };
        readonly recipient: {
            readonly type: "string";
            readonly description: "DID of the recipient of the Gem.";
        };
        readonly justification: {
            readonly type: "string";
            readonly description: "Why the Gem was awarded.";
        };
        readonly supportingEvidence: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly format: "uri";
            };
            readonly description: "Links to content proving the recipient earned the Gem.";
        };
        readonly dateIssued: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Date the Gem was issued.";
        };
        readonly verifiableCredential: {
            readonly type: "string";
            readonly description: "DID-Linked Resource (DLR) containing the VC proving eligibility.";
        };
    };
    readonly required: readonly ["gemId", "issuer", "recipient", "justification", "supportingEvidence", "dateIssued", "verifiableCredential"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GemReputation";
    readonly title: "Gem Reputation Score";
    readonly description: "Defines how a recipient's reputation is influenced by their Gems.";
    readonly type: "object";
    readonly properties: {
        readonly recipient: {
            readonly type: "string";
            readonly description: "DID of the user holding the Gem.";
        };
        readonly gemType: {
            readonly type: "string";
            readonly description: "The category of the Gem.";
        };
        readonly reputationScore: {
            readonly type: "number";
            readonly minimum: 0;
            readonly description: "Numerical reputation score associated with the Gem.";
        };
        readonly scoreLastUpdated: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Date when the reputation score was last updated.";
        };
        readonly linkedCredentials: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of associated Verifiable Credentials that contribute to this reputation score.";
        };
    };
    readonly required: readonly ["recipient", "gemType", "reputationScore", "scoreLastUpdated", "linkedCredentials"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GemRevocation";
    readonly title: "Gem Revocation Record";
    readonly description: "Defines how a previously awarded Gem can be revoked if necessary.";
    readonly type: "object";
    readonly properties: {
        readonly gemId: {
            readonly type: "string";
            readonly description: "DID of the revoked Gem.";
        };
        readonly issuer: {
            readonly type: "string";
            readonly description: "DID of the entity revoking the Gem.";
        };
        readonly revocationReason: {
            readonly type: "string";
            readonly description: "The reason for revocation.";
        };
        readonly revokedOn: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Date the Gem was revoked.";
        };
        readonly verifiableCredentialRevoked: {
            readonly type: "string";
            readonly description: "DID-Linked Resource (DLR) referencing the revoked Verifiable Credential.";
        };
    };
    readonly required: readonly ["gemId", "issuer", "revocationReason", "revokedOn", "verifiableCredentialRevoked"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GemTrustRegistry";
    readonly title: "Gem Trust Registry";
    readonly description: "Tracks trust and reputation levels based on earned Gems.";
    readonly type: "object";
    readonly properties: {
        readonly holder: {
            readonly type: "string";
            readonly description: "DID of the Gem holder.";
        };
        readonly gemTypes: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of Gems that the user holds.";
        };
        readonly trustScore: {
            readonly type: "object";
            readonly properties: {
                readonly verificationScore: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score based on verification actions.";
                };
                readonly governanceScore: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score based on governance participation.";
                };
                readonly contributionScore: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score based on active contributions.";
                };
                readonly communityScore: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score based on social/community engagement.";
                };
            };
            readonly description: "Trust score based on various aspects of participation.";
        };
        readonly linkedCredentials: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "Verifiable Credentials contributing to this reputation.";
        };
        readonly lastUpdated: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Last update timestamp.";
        };
    };
    readonly required: readonly ["holder", "gemTypes", "trustScore", "linkedCredentials", "lastUpdated"];
} | {
    readonly $schema: "http://json-schema.org/draft-04/schema#";
    readonly $comment: "https://globalprivacycontrol.github.io/gpc-spec/";
    readonly description: "Configuration for GPC, so a site can convey its support for the Global Privacy Control.";
    readonly id: "https://json.schemastore.org/gpc.json";
    readonly properties: {
        readonly gpc: {
            readonly title: "Global Privacy Control";
            readonly description: "Indicates that the server intends to abide by GPC requests.";
            readonly type: "boolean";
        };
        readonly version: {
            readonly title: "Version";
            readonly type: "integer";
            readonly default: 1;
        };
        readonly lastUpdate: {
            readonly title: "Last Update";
            readonly description: "This indicates the time at which the statement of support was made, such that later changes to the meaning of the GPC standard should not affect the interpretation of the resource for legal purposes. If the member is not in a valid ISO 8601 format, the last update date and time is unknown.";
            readonly type: "string";
        };
    };
    readonly required: readonly ["gpc"];
    readonly title: "Global Privacy Control";
    readonly type: "object";
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/GovernanceProposal";
    readonly title: "Governance Proposal Schema";
    readonly description: "Defines a governance proposal for namespaces and clusters.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the proposal.";
        };
        readonly proposer: {
            readonly type: "string";
            readonly description: "DID of the entity submitting the proposal.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "DID of the namespace affected (if applicable).";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "DID of the cluster affected (if applicable).";
        };
        readonly proposalType: {
            readonly type: "string";
            readonly enum: readonly ["AddNode", "RemoveNode", "UpdateGovernance", "MonetizationPolicyChange"];
            readonly description: "Type of governance action requested.";
        };
        readonly details: {
            readonly type: "string";
            readonly description: "A description of the proposal, including motivations and expected impact.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "References to supporting documents or governance rules.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["Pending", "Active", "Accepted", "Rejected", "Executed"];
            readonly description: "Current status of the proposal.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of proposal submission.";
        };
    };
    readonly required: readonly ["id", "proposer", "proposalType", "details", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft-07/schema";
    readonly $id: "https://cawg.io/schemas/v1/creator-identity-assertion.json";
    readonly title: "IdentityClaimsAggregationCredential";
    readonly description: "Creator Identity Assertion Credential Schema for usage in JsonSchema";
    readonly type: "object";
    readonly properties: {
        readonly type: {
            readonly type: "array";
            readonly minItems: 2;
            readonly items: {
                readonly type: "string";
            };
            readonly allOf: readonly [{
                readonly contains: {
                    readonly const: "VerifiableCredential";
                };
            }, {
                readonly contains: {
                    readonly const: "IdentityClaimsAggregationCredential";
                };
            }];
        };
        readonly issuer: {
            readonly oneOf: readonly [{
                readonly $ref: "#/$defs/nonEmptyUri";
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly $ref: "#/$defs/nonEmptyUri";
                    };
                    readonly name: {
                        readonly $ref: "#/$defs/nonEmptyString";
                    };
                };
                readonly required: readonly ["id"];
            }];
        };
        readonly validFrom: {
            readonly type: "string";
            readonly format: "date-time";
        };
        readonly expiresAt: {
            readonly type: "string";
            readonly format: "date-time";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $ref: "#/$defs/nonEmptyUri";
                };
                readonly verifiedIdentities: {
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly items: {
                        readonly $ref: "#/$defs/verifiedIdentity";
                    };
                };
                readonly c2paAsset: {
                    readonly type: "object";
                    readonly minProperties: 1;
                    readonly properties: {
                        readonly referenced_assertions: {
                            readonly type: "array";
                            readonly minItems: 1;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly url: {
                                        readonly $ref: "#/$defs/nonEmptyString";
                                    };
                                    readonly hash: {
                                        readonly $ref: "#/$defs/nonEmptyString";
                                    };
                                    readonly alg: {
                                        readonly $ref: "#/$defs/nonEmptyString";
                                    };
                                };
                                readonly required: readonly ["hash"];
                            };
                        };
                        readonly sig_type: {
                            readonly type: "string";
                        };
                        readonly role: {
                            readonly type: "string";
                            readonly enum: readonly ["cawg.creator", "cawg.contributor", "cawg.editor", "cawg.producer", "cawg.producer", "cawg.publisher", "cawg.sponsor", "cawg.translator"];
                        };
                        readonly expected_partial_claim: {
                            readonly type: "string";
                        };
                        readonly expected_claim_generator: {
                            readonly type: "string";
                        };
                        readonly expected_countersigners: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["referenced_assertions", "sig_type"];
                };
            };
            readonly required: readonly ["id", "verifiedIdentities", "c2paAsset"];
        };
    };
    readonly required: readonly ["type", "issuer", "validFrom", "credentialSubject"];
    readonly $defs: {
        readonly nonEmptyString: {
            readonly type: "string";
            readonly minLength: 1;
            readonly description: "A non-empty string";
        };
        readonly nonEmptyUri: {
            readonly type: "string";
            readonly minLength: 1;
            readonly format: "uri";
            readonly description: "A non-empty URI string";
        };
        readonly identifiableObject: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $ref: "#/$defs/nonEmptyUri";
                    readonly description: "The unique identifier URI";
                };
                readonly name: {
                    readonly $ref: "#/$defs/nonEmptyString";
                    readonly description: "The name of the object";
                };
            };
            readonly required: readonly ["id", "name"];
            readonly description: "An object with an identifiable URI and name";
        };
        readonly verifiedIdentity: {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly $ref: "#/$defs/nonEmptyString";
                };
                readonly username: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly uri: {
                    readonly $ref: "#/$defs/nonEmptyUri";
                };
                readonly provider: {
                    readonly $ref: "#/$defs/identifiableObject";
                };
                readonly verifiedAt: {
                    readonly $ref: "#/$defs/nonEmptyString";
                    readonly format: "date-time";
                };
                readonly name: {
                    readonly $ref: "#/$defs/nonEmptyString";
                };
                readonly method: {
                    readonly $ref: "#/$defs/nonEmptyString";
                };
                readonly address: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["type", "verifiedAt"];
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly type: {
                        readonly const: "cawg.social_media";
                    };
                };
                readonly required: readonly ["username", "uri", "provider", "verifiedAt"];
            }, {
                readonly properties: {
                    readonly type: {
                        readonly const: "cawg.crypto_wallet";
                    };
                };
                readonly required: readonly ["address", "provider", "verifiedAt"];
            }, {
                readonly properties: {
                    readonly type: {
                        readonly const: "cawg.document_verification";
                    };
                };
                readonly required: readonly ["name", "provider", "verifiedAt"];
            }, {
                readonly properties: {
                    readonly type: {
                        readonly const: "cawg.affiliation";
                    };
                };
                readonly required: readonly ["provider", "verifiedAt"];
            }, {
                readonly properties: {
                    readonly type: {
                        readonly const: "cawg.web_site";
                    };
                };
                readonly required: readonly ["uri", "verifiedAt"];
            }];
        };
    };
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/IdentityNodeDeclaration";
    readonly title: "Identity Node Declaration";
    readonly description: "Defines an Identity Node in an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the Identity Node.";
        };
        readonly type: {
            readonly const: "IdentityNode";
            readonly description: "Node type.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster this node belongs to.";
        };
        readonly operator: {
            readonly type: "string";
            readonly description: "DID of the entity operating this node.";
        };
        readonly services: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of services managed by this Identity Node (e.g., DID Resolution, Verification).";
        };
        readonly verificationPolicies: {
            readonly type: "string";
            readonly description: "Reference to identity verification policies.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., GovernancePolicy, VerificationLog).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "References to identity verification policies.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "suspended", "revoked"];
            readonly description: "Operational status of the node.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of node declaration.";
        };
    };
    readonly required: readonly ["id", "cluster", "operator", "services", "status", "timestamp"];
} | {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly $id: "https://json.schemastore.org/language-configuration.json";
    readonly additionalProperties: true;
    readonly definitions: {
        readonly regexp: {
            readonly type: "object";
            readonly properties: {
                readonly pattern: {
                    readonly type: "string";
                };
                readonly flags: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["pattern"];
        };
        readonly charPair: {
            readonly type: "array";
            readonly items: readonly [{
                readonly type: "string";
            }, {
                readonly type: "string";
            }];
            readonly minItems: 2;
            readonly additionalItems: false;
        };
    };
    readonly properties: {
        readonly comments: {
            readonly description: "The language's comment settings.";
            readonly type: "object";
            readonly properties: {
                readonly lineComment: {
                    readonly description: "The line comment token, like `// this is a comment`.";
                    readonly type: "string";
                };
                readonly blockComment: {
                    readonly $ref: "#/definitions/charPair";
                    readonly description: "The block comment character pair, like `/* block comment *&#47;`";
                };
            };
        };
        readonly brackets: {
            readonly description: "The language's brackets.";
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/definitions/charPair";
            };
        };
        readonly autoClosingPairs: {
            readonly description: "The language's auto closing pairs. The 'close' character is automatically inserted with the 'open' character is typed.";
            readonly type: "array";
            readonly items: {
                readonly anyOf: readonly [{
                    readonly $ref: "#/definitions/charPair";
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly open: {
                            readonly type: "string";
                        };
                        readonly close: {
                            readonly type: "string";
                        };
                        readonly notIn: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly required: readonly ["open", "close"];
                }];
            };
        };
        readonly autoCloseBefore: {
            readonly description: "What characters must be after the cursor for bracket or quote autoclosing to occur.";
            readonly type: "string";
        };
        readonly surroundingPairs: {
            readonly description: "The language's surrounding pairs. When the 'open' character is typed on a selection, the selected string is surrounded by the open and close characters.";
            readonly type: "array";
            readonly items: {
                readonly anyOf: readonly [{
                    readonly $ref: "#/definitions/charPair";
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly open: {
                            readonly type: "string";
                        };
                        readonly close: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["open", "close"];
                }];
            };
        };
        readonly folding: {
            readonly description: "The language's folding rules.";
            readonly type: "object";
            readonly properties: {
                readonly markers: {
                    readonly description: "Region markers used by the language.";
                    readonly type: "object";
                    readonly properties: {
                        readonly start: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                            }, {
                                readonly $ref: "#/definitions/regexp";
                            }];
                        };
                        readonly end: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                            }, {
                                readonly $ref: "#/definitions/regexp";
                            }];
                        };
                    };
                };
            };
        };
        readonly wordPattern: {
            readonly description: "The language's word definition.";
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly $ref: "#/definitions/regexp";
            }];
        };
        readonly indentationRules: {
            readonly description: "The language's indentation settings.";
            readonly type: "object";
            readonly properties: {
                readonly decreaseIndentPattern: {
                    readonly description: "If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly $ref: "#/definitions/regexp";
                    }];
                };
                readonly increaseIndentPattern: {
                    readonly description: "If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly $ref: "#/definitions/regexp";
                    }];
                };
                readonly indentNextLinePattern: {
                    readonly description: "If a line matches this pattern, then only the next line after it should be indented once.";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly $ref: "#/definitions/regexp";
                    }];
                };
                readonly unIndentedLinePattern: {
                    readonly description: "If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly $ref: "#/definitions/regexp";
                    }];
                };
            };
            readonly required: readonly ["decreaseIndentPattern", "increaseIndentPattern"];
        };
        readonly onEnterRules: {
            readonly description: "The language's rules to be evaluated when pressing Enter.";
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly beforeText: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly afterText: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly previousLineText: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                        }, {
                            readonly $ref: "#/definitions/regexp";
                        }];
                    };
                    readonly action: {
                        readonly type: "object";
                        readonly properties: {
                            readonly indent: {
                                readonly type: "string";
                                readonly enum: readonly ["none", "indent", "indentOutdent", "outdent"];
                            };
                            readonly appendText: {
                                readonly type: "string";
                            };
                            readonly removeText: {
                                readonly type: "integer";
                                readonly minimum: 1;
                            };
                        };
                        readonly required: readonly ["indent"];
                    };
                };
                readonly required: readonly ["beforeText", "action"];
            };
        };
    };
    readonly type: "object";
    readonly title: "Language configuration";
    readonly description: "Configuration file for language features in VS Code and Visual Studio.";
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceDeclaration";
    readonly title: "Namespace Declaration";
    readonly description: "Defines a namespace as a root authority that can establish trust chains and governance rules for its domain.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the namespace acting as a root authority.";
        };
        readonly type: {
            readonly const: "NamespaceDeclaration";
            readonly description: "Indicates this is a Namespace DID declaration.";
        };
        readonly namespaceScope: {
            readonly type: "string";
            readonly description: "The domain or scope of this namespace";
            readonly examples: readonly ["originvault.box", "content-authenticity.org", "academic-credentials.edu", "supply-chain.industry"];
        };
        readonly rootAuthority: {
            readonly type: "object";
            readonly properties: {
                readonly rootType: {
                    readonly type: "string";
                    readonly const: "namespace";
                    readonly description: "This namespace acts as a root authority";
                };
                readonly trustChainPurpose: {
                    readonly type: "string";
                    readonly description: "Primary purpose of trust chains in this namespace";
                    readonly examples: readonly ["Content authenticity and provenance", "User reputation and verification", "Academic credential verification", "Supply chain transparency"];
                };
                readonly delegationPolicy: {
                    readonly type: "object";
                    readonly properties: {
                        readonly allowsTrustedIssuers: {
                            readonly type: "boolean";
                            readonly description: "Whether this namespace delegates to trusted issuers";
                        };
                        readonly requiresAccreditation: {
                            readonly type: "boolean";
                            readonly description: "Whether issuers must be accredited by this namespace";
                        };
                        readonly maxDelegationDepth: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Maximum depth of delegation chains";
                        };
                    };
                };
            };
            readonly required: readonly ["rootType", "trustChainPurpose"];
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly governanceModel: {
                    readonly type: "string";
                    readonly enum: readonly ["self-governed", "dao", "multisig", "committee", "democratic", "consortium"];
                    readonly description: "How this namespace makes governance decisions";
                };
                readonly governingParties: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "DIDs of entities involved in namespace governance";
                };
                readonly policyFramework: {
                    readonly type: "string";
                    readonly description: "Reference to namespace governance policies and procedures";
                };
            };
            readonly required: readonly ["governanceModel"];
        };
        readonly interoperability: {
            readonly type: "object";
            readonly properties: {
                readonly recognizedNamespaces: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "DIDs of other namespaces this namespace recognizes or federates with";
                };
                readonly crossNamespaceValidation: {
                    readonly type: "boolean";
                    readonly description: "Whether credentials from other namespaces are accepted";
                };
                readonly federationMember: {
                    readonly type: "string";
                    readonly description: "Namespace federation or consortium membership (optional)";
                };
            };
        };
        readonly termsOfUse: {
            readonly type: "object";
            readonly properties: {
                readonly trustFramework: {
                    readonly type: "string";
                    readonly description: "The trust framework for the namespace.";
                };
                readonly trustFrameworkId: {
                    readonly type: "string";
                    readonly description: "The ID of the trust framework for the namespace.";
                };
                readonly trustFrameworkVersion: {
                    readonly type: "string";
                    readonly description: "The version of the trust framework for the namespace.";
                };
                readonly trustFrameworkUrl: {
                    readonly type: "string";
                    readonly description: "The URL of the trust framework for the namespace.";
                };
                readonly trustFrameworkTerms: {
                    readonly type: "string";
                    readonly description: "The terms of use for the namespace.";
                };
            };
            readonly required: readonly ["trustFramework", "trustFrameworkId", "trustFrameworkVersion", "trustFrameworkUrl", "trustFrameworkTerms"];
        };
        readonly blockchainAnchoring: {
            readonly type: "object";
            readonly properties: {
                readonly blockchainNetwork: {
                    readonly type: "string";
                    readonly examples: readonly ["cheqd-mainnet", "ethereum", "polygon"];
                    readonly description: "Blockchain network where this namespace is anchored";
                };
                readonly resourceId: {
                    readonly type: "string";
                    readonly description: "Blockchain resource ID for this namespace";
                };
            };
        };
    };
    readonly required: readonly ["id", "namespaceScope", "rootAuthority", "governance", "termsOfUse"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceGovernance";
    readonly title: "Namespace Governance";
    readonly description: "Defines governance rules for an OV Namespace.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the namespace governance document.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "The DID of the namespace this governance applies to.";
        };
        readonly governanceModel: {
            readonly type: "string";
            readonly enum: readonly ["AdminControlled", "TokenVoting", "MultiSig"];
            readonly description: "The governance model used to manage this namespace.";
        };
        readonly governanceBodies: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "DID of a governance body (e.g., DAO, committee, council).";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly description: "The role of this body (e.g., Validator, Arbiter).";
                    };
                };
            };
            readonly description: "List of governing entities managing this namespace.";
        };
        readonly decisionMaking: {
            readonly type: "object";
            readonly properties: {
                readonly votingThreshold: {
                    readonly type: "number";
                    readonly description: "Percentage required for approval in voting-based governance.";
                };
                readonly proposalProcess: {
                    readonly type: "string";
                    readonly description: "Reference to a Ceramic document explaining the proposal submission process.";
                };
            };
            readonly description: "Rules for decision-making in the namespace.";
        };
        readonly disputeResolution: {
            readonly type: "object";
            readonly properties: {
                readonly resolutionMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["Arbitration", "GovernanceVote", "SmartContract"];
                    readonly description: "Method used to resolve disputes.";
                };
                readonly resolutionService: {
                    readonly type: "string";
                    readonly description: "The DID of a dispute resolution service or contract.";
                };
            };
            readonly description: "How governance disputes are resolved.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this governance document was issued.";
        };
    };
    readonly required: readonly ["id", "namespace", "governanceModel", "governanceBodies", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceParticipationAgreement";
    readonly title: "Namespace Participation Agreement";
    readonly description: "Defines the terms for joining a namespace in the OV ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly namespaceId: {
            readonly type: "string";
            readonly description: "DID of the namespace being joined.";
        };
        readonly participantId: {
            readonly type: "string";
            readonly description: "DID of the participant (Vault, Node, or Cluster).";
        };
        readonly role: {
            readonly type: "string";
            readonly enum: readonly ["Vault", "Node", "Cluster"];
            readonly description: "The role of the participant within the namespace.";
        };
        readonly complianceRequirements: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of governance and verification requirements for participation.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions under which a participant can be removed from the namespace.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the participant has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "namespaceId", "participantId", "role", "complianceRequirements", "revocationPolicy", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespacePluginDeclaration";
    readonly title: "Namespace Plugin Declaration";
    readonly description: "Declares a plugin registered under a namespace.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the namespace plugin.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "The DID of the namespace that owns this plugin.";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name of the plugin.";
        };
        readonly version: {
            readonly type: "string";
            readonly description: "Semantic versioning (e.g., 1.0.0).";
        };
        readonly author: {
            readonly type: "string";
            readonly description: "DID of the entity or user who created the plugin.";
        };
        readonly compatibleNodes: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
            readonly description: "The node types this plugin is designed to run on.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The id of the linked resource.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., governance, metadata, event log).";
                    };
                };
                readonly required: readonly ["id", "type"];
            };
            readonly description: "References to plugin documentation, code, or policies.";
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly approvedBy: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of governance bodies or validators that approved the plugin.";
                };
                readonly complianceRules: {
                    readonly type: "string";
                    readonly description: "Reference to compliance policies stored in Ceramic.";
                };
            };
            readonly description: "Governance and compliance information for the plugin.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "deprecated", "revoked"];
            readonly description: "Current status of the plugin.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this plugin declaration was issued.";
        };
    };
    readonly required: readonly ["id", "namespace", "name", "version", "author", "compatibleNodes", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceProposal";
    readonly title: "Namespace Proposal";
    readonly description: "Defines a proposal for governance, updates, or policy changes in an OV namespace.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "DID of the proposal.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "DID of the namespace where the proposal is made.";
        };
        readonly proposer: {
            readonly type: "string";
            readonly description: "DID of the entity making the proposal.";
        };
        readonly proposalType: {
            readonly type: "string";
            readonly enum: readonly ["governance-change", "policy-update", "feature-addition", "plugin-approval", "other"];
            readonly description: "Type of proposal.";
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Detailed explanation of the proposal.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["pending", "approved", "rejected", "executed"];
            readonly description: "Current status of the proposal.";
        };
        readonly votes: {
            readonly type: "object";
            readonly properties: {
                readonly yes: {
                    readonly type: "number";
                    readonly description: "Number of votes in favor.";
                };
                readonly no: {
                    readonly type: "number";
                    readonly description: "Number of votes against.";
                };
                readonly abstain: {
                    readonly type: "number";
                    readonly description: "Number of abstentions.";
                };
            };
            readonly description: "Voting results for the proposal.";
        };
        readonly createdAt: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp when the proposal was created.";
        };
        readonly expiresAt: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Expiration date for voting on the proposal.";
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof for the proposal.";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly description: "Proof type (e.g., EdDSA Signature, zk-SNARK Proof).";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of proof creation.";
                };
                readonly verificationMethod: {
                    readonly type: "string";
                    readonly description: "DID or method used to verify this proof.";
                };
                readonly signatureValue: {
                    readonly type: "string";
                    readonly description: "Base64 or hex-encoded signature.";
                };
            };
        };
    };
    readonly required: readonly ["id", "namespace", "proposer", "proposalType", "description", "status", "votes", "createdAt", "expiresAt", "proof"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceRecognitionCertificate";
    readonly title: "Namespace Recognition Certificate";
    readonly description: "A verifiable certificate that recognizes an entity’s role or contribution within a namespace.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "DID of the Recognition Certificate.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "DID of the namespace issuing the certificate.";
        };
        readonly recipient: {
            readonly type: "string";
            readonly description: "DID of the recognized entity.";
        };
        readonly recognitionType: {
            readonly type: "string";
            readonly enum: readonly ["trusted-verifier", "major-contributor", "governance-member", "partner"];
            readonly description: "Type of recognition granted.";
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Additional details on why this recognition was granted.";
        };
        readonly validUntil: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Optional expiration date of the recognition certificate.";
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof for the certificate.";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly description: "Proof type.";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of proof creation.";
                };
                readonly verificationMethod: {
                    readonly type: "string";
                    readonly description: "DID or method used to verify this proof.";
                };
                readonly signatureValue: {
                    readonly type: "string";
                    readonly description: "Base64 or hex-encoded signature.";
                };
            };
        };
    };
    readonly required: readonly ["id", "namespace", "recipient", "recognitionType", "proof"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NamespaceReputationRecord";
    readonly title: "Namespace Reputation Record";
    readonly description: "Verifiable record of an entity's reputation within a namespace, including trust scores and endorsements.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "DID of the Reputation Record.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "DID of the namespace issuing the reputation record.";
        };
        readonly entity: {
            readonly type: "string";
            readonly description: "DID of the entity whose reputation is being recorded.";
        };
        readonly trustScore: {
            readonly type: "number";
            readonly minimum: 0;
            readonly maximum: 100;
            readonly description: "Numerical representation of the entity’s reputation within the namespace.";
        };
        readonly contributions: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly description: "Nature of contribution (e.g., governance vote, data contribution, content verification).";
                    };
                    readonly date: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date of contribution.";
                    };
                    readonly verifiedBy: {
                        readonly type: "string";
                        readonly description: "DID of entity that verified this contribution.";
                    };
                };
                readonly required: readonly ["type", "date", "verifiedBy"];
            };
            readonly description: "List of contributions made by the entity.";
        };
        readonly endorsements: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly from: {
                        readonly type: "string";
                        readonly description: "DID of the entity giving the endorsement.";
                    };
                    readonly message: {
                        readonly type: "string";
                        readonly description: "Optional endorsement message.";
                    };
                    readonly date: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date of endorsement.";
                    };
                };
                readonly required: readonly ["from", "date"];
            };
            readonly description: "Endorsements received from other trusted entities.";
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof for this reputation record.";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly description: "Proof type (e.g., JSON-LD Signature, EdDSA Signature, zk-SNARK Proof).";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Timestamp of proof creation.";
                };
                readonly verificationMethod: {
                    readonly type: "string";
                    readonly description: "DID or method used to verify this proof.";
                };
                readonly signatureValue: {
                    readonly type: "string";
                    readonly description: "Base64 or hex-encoded signature.";
                };
            };
            readonly required: readonly ["type", "created", "verificationMethod", "signatureValue"];
        };
    };
    readonly required: readonly ["id", "namespace", "entity", "trustScore", "contributions", "endorsements", "proof"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NodeClusterDeclaration";
    readonly title: "Node Cluster Declaration";
    readonly description: "Defines an OV Cluster's structure, governance, and node configuration.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the OV Cluster.";
        };
        readonly type: {
            readonly const: "ClusterDeclaration";
            readonly description: "Indicates that this is a Cluster DID declaration.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "The DID of the namespace this cluster belongs to.";
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly managedBy: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "DIDs of entities responsible for managing this cluster.";
                };
                readonly rules: {
                    readonly type: "string";
                    readonly description: "A reference to governance rules stored in Ceramic or DID-Linked Resources.";
                };
                readonly disputeResolution: {
                    readonly type: "string";
                    readonly description: "A DID reference to a dispute resolution service.";
                };
            };
            readonly description: "Governance policies for this cluster.";
        };
        readonly nodes: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The Node DID.";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly enum: readonly ["NamespaceNode", "IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
                        readonly description: "The functional role of this node.";
                    };
                };
                readonly required: readonly ["id", "role"];
            };
            readonly description: "List of nodes in this cluster.";
        };
        readonly services: {
            readonly type: "object";
            readonly properties: {
                readonly verification: {
                    readonly type: "string";
                    readonly description: "The DID of the verification service.";
                };
                readonly storage: {
                    readonly type: "string";
                    readonly description: "The DID of the storage service.";
                };
                readonly payment: {
                    readonly type: "string";
                    readonly description: "The DID of the payment processing service.";
                };
            };
            readonly description: "Services available in this cluster.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The id of the linked resource.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., governance, metadata, event log).";
                    };
                };
                readonly required: readonly ["id", "type"];
            };
            readonly description: "Linked resources associated with this cluster.";
        };
        readonly verificationPolicies: {
            readonly type: "object";
            readonly properties: {
                readonly nodeVerification: {
                    readonly type: "string";
                    readonly enum: readonly ["Open", "Permissioned", "Staked"];
                    readonly description: "Defines how new nodes are verified.";
                };
                readonly revocationPolicy: {
                    readonly type: "string";
                    readonly description: "Conditions under which a node or vault can be revoked from the cluster.";
                };
            };
            readonly description: "Verification and security policies for the cluster.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this cluster declaration was issued.";
        };
    };
    readonly required: readonly ["id", "namespace", "nodes", "services", "verificationPolicies", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NodeDeclaration";
    readonly title: "Node Declaration";
    readonly description: "Defines an OV Node within a cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the node.";
        };
        readonly type: {
            readonly const: "NodeDeclaration";
            readonly description: "Indicates this is a Node DID declaration.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The Cluster DID this node belongs to.";
        };
        readonly role: {
            readonly type: "string";
            readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
            readonly description: "The functional role of this node.";
        };
        readonly operator: {
            readonly type: "string";
            readonly description: "The DID of the entity that operates this node.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "suspended", "revoked"];
            readonly description: "The operational status of the node.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., GovernancePolicy, VerificationLog).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "Linked resources associated with this node.";
        };
        readonly verificationPolicies: {
            readonly type: "object";
            readonly properties: {
                readonly assignedBy: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of validators who approved this node.";
                };
                readonly verificationRules: {
                    readonly type: "string";
                    readonly description: "Reference to verification policies in Ceramic.";
                };
            };
            readonly description: "Verification details for this node.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this node declaration was issued.";
        };
    };
    readonly required: readonly ["id", "type", "cluster", "role", "operator", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/NodeOperatorAgreement";
    readonly title: "Node Operator Agreement";
    readonly description: "Defines the responsibilities of an OV Node operator within a Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly nodeId: {
            readonly type: "string";
            readonly description: "DID of the Node.";
        };
        readonly clusterId: {
            readonly type: "string";
            readonly description: "DID of the Cluster the Node is part of.";
        };
        readonly nodeType: {
            readonly type: "string";
            readonly enum: readonly ["Identity", "Storage", "Compute", "Verification"];
            readonly description: "The role of the Node within the Cluster.";
        };
        readonly performanceRequirements: {
            readonly type: "object";
            readonly properties: {
                readonly uptime: {
                    readonly type: "number";
                    readonly description: "Minimum required uptime percentage.";
                };
                readonly latency: {
                    readonly type: "number";
                    readonly description: "Maximum response latency allowed.";
                };
            };
        };
        readonly dataHandlingRules: {
            readonly type: "string";
            readonly description: "Compliance requirements for handling data within the node.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions under which the node can be removed from the Cluster.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the Node Operator has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "nodeId", "clusterId", "nodeType", "performanceRequirements", "dataHandlingRules", "revocationPolicy", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/NodeVotingConsensusAgreement";
    readonly title: "Node Voting & Consensus Agreement";
    readonly description: "Defines voting mechanisms for governance decisions in OriginVault clusters.";
    readonly type: "object";
    readonly properties: {
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly clusterId: {
            readonly type: "string";
            readonly description: "DID of the Cluster where voting occurs.";
        };
        readonly nodeId: {
            readonly type: "string";
            readonly description: "DID of the participating node.";
        };
        readonly voteType: {
            readonly type: "string";
            readonly enum: readonly ["Governance Policy", "New Namespace Approval", "Node Sanctions"];
            readonly description: "The type of vote being cast.";
        };
        readonly votingMethod: {
            readonly type: "string";
            readonly enum: readonly ["One Node, One Vote", "Stake-Weighted", "Reputation-Based"];
            readonly description: "Defines how voting power is determined.";
        };
        readonly minimumQuorum: {
            readonly type: "number";
            readonly description: "The minimum percentage of nodes required for the vote to be valid.";
        };
        readonly decisionThreshold: {
            readonly type: "number";
            readonly description: "The percentage required to approve a decision.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Under what conditions a vote result can be invalidated.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the node has agreed to the governance process.";
        };
    };
    readonly required: readonly ["agreementId", "clusterId", "nodeId", "voteType", "votingMethod", "minimumQuorum", "decisionThreshold", "revocationPolicy", "agreementSigned"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.box"];
    readonly $id: "https://schemas.originvault.box/Owner";
    readonly title: "Owner";
    readonly description: "Defines an owner role for vaults, plugins, and namespaces.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["Person", "Organization"];
            readonly description: "Schema.org type";
        };
        readonly ownerId: {
            readonly type: "string";
            readonly description: "DID of the owner.";
        };
        readonly ownsVaults: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of vaults owned by this persona.";
            };
        };
        readonly ownsPlugins: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of plugins owned by this persona.";
            };
        };
        readonly ownsNamespaces: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of namespaces owned by this persona.";
            };
        };
        readonly delegatedAdmins: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of admins granted management permissions.";
            };
        };
        readonly monetizationModel: {
            readonly type: "object";
            readonly properties: {
                readonly revenueStreams: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Types of revenue models (e.g., subscription, licensing fees, transaction fees).";
                    };
                };
                readonly payoutSchedule: {
                    readonly type: "string";
                    readonly description: "Schedule for revenue payouts.";
                };
            };
        };
        readonly disputeResolutionMethod: {
            readonly type: "string";
            readonly enum: readonly ["DAO Governance", "Legal Arbitration", "Community Voting"];
            readonly description: "Method for resolving ownership disputes.";
        };
        readonly transferPolicy: {
            readonly type: "string";
            readonly description: "Rules governing how ownership can be transferred.";
        };
    };
    readonly required: readonly ["ownerId", "ownsVaults", "ownsPlugins", "ownsNamespaces"];
} | {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly $id: "https://json.schemastore.org/package.json";
    readonly title: "PackageJson";
    readonly definitions: {
        readonly person: {
            readonly description: "A person who has been involved in creating or maintaining this package.";
            readonly type: readonly ["object", "string"];
            readonly required: readonly ["name"];
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                };
                readonly url: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly email: {
                    readonly type: "string";
                    readonly format: "email";
                };
            };
        };
        readonly dependency: {
            readonly description: "Dependencies are specified with a simple hash of package name to version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly devDependency: {
            readonly description: "Specifies dependencies that are required for the development and testing of the project. These dependencies are not needed in the production environment.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly optionalDependency: {
            readonly description: "Specifies dependencies that are optional for your project. These dependencies are attempted to be installed during the npm install process, but if they fail to install, the installation process will not fail.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly peerDependency: {
            readonly description: "Specifies dependencies that are required by the package but are expected to be provided by the consumer of the package.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly peerDependencyMeta: {
            readonly description: "When a user installs your package, warnings are emitted if packages specified in \"peerDependencies\" are not already installed. The \"peerDependenciesMeta\" field serves to provide more information on how your peer dependencies are utilized. Most commonly, it allows peer dependencies to be marked as optional. Metadata for this field is specified with a simple hash of the package name to a metadata object.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "object";
                readonly additionalProperties: true;
                readonly properties: {
                    readonly optional: {
                        readonly description: "Specifies that this peer dependency is optional and should not be installed automatically.";
                        readonly type: "boolean";
                    };
                };
            };
        };
        readonly license: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly enum: readonly ["AGPL-3.0-only", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "BSL-1.0", "CC0-1.0", "CDDL-1.0", "CDDL-1.1", "EPL-1.0", "EPL-2.0", "GPL-2.0-only", "GPL-3.0-only", "ISC", "LGPL-2.0-only", "LGPL-2.1-only", "LGPL-2.1-or-later", "LGPL-3.0-only", "LGPL-3.0-or-later", "MIT", "MPL-2.0", "MS-PL", "UNLICENSED"];
            }];
        };
        readonly scriptsInstallAfter: {
            readonly description: "Run AFTER the package is installed.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsPublishAfter: {
            readonly description: "Run AFTER the package is published.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsRestart: {
            readonly description: "Run by the 'npm restart' command. Note: 'npm restart' will run the stop and start scripts if no restart script is provided.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsStart: {
            readonly description: "Run by the 'npm start' command.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsStop: {
            readonly description: "Run by the 'npm stop' command.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsTest: {
            readonly description: "Run by the 'npm test' command.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsUninstallBefore: {
            readonly description: "Run BEFORE the package is uninstalled.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly scriptsVersionBefore: {
            readonly description: "Run BEFORE bump the package version.";
            readonly type: "string";
            readonly "x-intellij-language-injection": "Shell Script";
        };
        readonly packageExportsEntryPath: {
            readonly type: readonly ["string", "null"];
            readonly description: "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.";
            readonly pattern: "^\\./";
        };
        readonly packageExportsEntryObject: {
            readonly type: "object";
            readonly description: "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.";
            readonly properties: {
                readonly require: {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function.";
                };
                readonly import: {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function.";
                };
                readonly node: {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this environment is Node.js.";
                };
                readonly default: {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved when no other export type matches.";
                };
                readonly types: {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                };
            };
            readonly patternProperties: {
                readonly "^[^.0-9]+$": {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this environment matches the property name.";
                };
                readonly "^types@.+$": {
                    readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                    readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                };
            };
            readonly additionalProperties: false;
        };
        readonly packageExportsEntry: {
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/packageExportsEntryPath";
            }, {
                readonly $ref: "#/definitions/packageExportsEntryObject";
            }];
        };
        readonly packageExportsFallback: {
            readonly type: "array";
            readonly description: "Used to allow fallbacks in case this environment doesn't support the preceding entries.";
            readonly items: {
                readonly $ref: "#/definitions/packageExportsEntry";
            };
        };
        readonly packageExportsEntryOrFallback: {
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/packageExportsEntry";
            }, {
                readonly $ref: "#/definitions/packageExportsFallback";
            }];
        };
        readonly packageImportsEntryPath: {
            readonly type: readonly ["string", "null"];
            readonly description: "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.";
        };
        readonly packageImportsEntryObject: {
            readonly type: "object";
            readonly description: "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.";
            readonly properties: {
                readonly require: {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function.";
                };
                readonly import: {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function.";
                };
                readonly node: {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this environment is Node.js.";
                };
                readonly default: {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when no other export type matches.";
                };
                readonly types: {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                };
            };
            readonly patternProperties: {
                readonly "^[^.0-9]+$": {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this environment matches the property name.";
                };
                readonly "^types@.+$": {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported.";
                };
            };
            readonly additionalProperties: false;
        };
        readonly packageImportsEntry: {
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/packageImportsEntryPath";
            }, {
                readonly $ref: "#/definitions/packageImportsEntryObject";
            }];
        };
        readonly packageImportsFallback: {
            readonly type: "array";
            readonly description: "Used to allow fallbacks in case this environment doesn't support the preceding entries.";
            readonly items: {
                readonly $ref: "#/definitions/packageImportsEntry";
            };
        };
        readonly packageImportsEntryOrFallback: {
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/packageImportsEntry";
            }, {
                readonly $ref: "#/definitions/packageImportsFallback";
            }];
        };
        readonly fundingUrl: {
            readonly type: "string";
            readonly format: "uri";
            readonly description: "URL to a website with details about how to fund the package.";
        };
        readonly fundingWay: {
            readonly type: "object";
            readonly description: "Used to inform about ways to help fund development of the package.";
            readonly properties: {
                readonly url: {
                    readonly $ref: "#/definitions/fundingUrl";
                };
                readonly type: {
                    readonly type: "string";
                    readonly description: "The type of funding or the platform through which funding can be provided, e.g. patreon, opencollective, tidelift or github.";
                };
            };
            readonly additionalProperties: false;
            readonly required: readonly ["url"];
        };
    };
    readonly type: "object";
    readonly patternProperties: {
        readonly "^_": {
            readonly description: "Any property starting with _ is valid.";
            readonly tsType: "any";
        };
    };
    readonly properties: {
        readonly name: {
            readonly description: "The name of the package.";
            readonly type: "string";
            readonly maxLength: 214;
            readonly minLength: 1;
            readonly pattern: "^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$";
        };
        readonly version: {
            readonly description: "Version must be parsable by node-semver, which is bundled with npm as a dependency.";
            readonly type: "string";
        };
        readonly description: {
            readonly description: "This helps people discover your package, as it's listed in 'npm search'.";
            readonly type: "string";
        };
        readonly keywords: {
            readonly description: "This helps people discover your package as it's listed in 'npm search'.";
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly homepage: {
            readonly description: "The url to the project homepage.";
            readonly type: "string";
        };
        readonly bugs: {
            readonly description: "The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.";
            readonly type: readonly ["object", "string"];
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly description: "The url to your project's issue tracker.";
                    readonly format: "uri";
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "The email address to which issues should be reported.";
                    readonly format: "email";
                };
            };
        };
        readonly license: {
            readonly $ref: "#/definitions/license";
            readonly description: "You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.";
        };
        readonly licenses: {
            readonly description: "DEPRECATED: Instead, use SPDX expressions, like this: { \"license\": \"ISC\" } or { \"license\": \"(MIT OR Apache-2.0)\" } see: 'https://docs.npmjs.com/files/package.json#license'.";
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly $ref: "#/definitions/license";
                    };
                    readonly url: {
                        readonly type: "string";
                        readonly format: "uri";
                    };
                };
            };
        };
        readonly author: {
            readonly $ref: "#/definitions/person";
        };
        readonly contributors: {
            readonly description: "A list of people who contributed to this package.";
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/definitions/person";
            };
        };
        readonly maintainers: {
            readonly description: "A list of people who maintains this package.";
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/definitions/person";
            };
        };
        readonly files: {
            readonly description: "The 'files' field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder.";
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly main: {
            readonly description: "The main field is a module ID that is the primary entry point to your program.";
            readonly type: "string";
        };
        readonly exports: {
            readonly description: "The \"exports\" field is used to restrict external access to non-exported module files, also enables a module to import itself using \"name\".";
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/packageExportsEntryPath";
                readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly ".": {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
                    };
                };
                readonly patternProperties: {
                    readonly "^\\./.+": {
                        readonly $ref: "#/definitions/packageExportsEntryOrFallback";
                        readonly description: "The module path prefix that is resolved when the module specifier starts with \"name/\", set to \"./*\" to allow external modules to import any subpath.";
                    };
                };
                readonly additionalProperties: false;
            }, {
                readonly $ref: "#/definitions/packageExportsEntryObject";
                readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
            }, {
                readonly $ref: "#/definitions/packageExportsFallback";
                readonly description: "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field.";
            }];
        };
        readonly imports: {
            readonly description: "The \"imports\" field is used to create private mappings that only apply to import specifiers from within the package itself.";
            readonly type: "object";
            readonly patternProperties: {
                readonly "^#.+$": {
                    readonly $ref: "#/definitions/packageImportsEntryOrFallback";
                    readonly description: "The module path that is resolved when this environment matches the property name.";
                };
            };
            readonly additionalProperties: false;
        };
        readonly bin: {
            readonly type: readonly ["string", "object"];
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly type: {
            readonly description: "When set to \"module\", the type field allows a package to specify all .js files within are ES modules. If the \"type\" field is omitted or set to \"commonjs\", all .js files are treated as CommonJS.";
            readonly type: "string";
            readonly enum: readonly ["commonjs", "module"];
            readonly default: "commonjs";
        };
        readonly types: {
            readonly description: "Set the types property to point to your bundled declaration file.";
            readonly type: "string";
        };
        readonly typings: {
            readonly description: "Note that the \"typings\" field is synonymous with \"types\", and could be used as well.";
            readonly type: "string";
        };
        readonly typesVersions: {
            readonly description: "The \"typesVersions\" field is used since TypeScript 3.1 to support features that were only made available in newer TypeScript versions.";
            readonly type: "object";
            readonly additionalProperties: {
                readonly description: "Contains overrides for the TypeScript version that matches the version range matching the property key.";
                readonly type: "object";
                readonly properties: {
                    readonly "*": {
                        readonly description: "Maps all file paths to the file paths specified in the array.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly pattern: "^[^*]*(?:\\*[^*]*)?$";
                        };
                    };
                };
                readonly patternProperties: {
                    readonly "^[^*]+$": {
                        readonly description: "Maps the file path matching the property key to the file paths specified in the array.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly "^[^*]*\\*[^*]*$": {
                        readonly description: "Maps file paths matching the pattern specified in property key to file paths specified in the array.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly pattern: "^[^*]*(?:\\*[^*]*)?$";
                        };
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly man: {
            readonly type: readonly ["array", "string"];
            readonly description: "Specify either a single file or an array of filenames to put in place for the man program to find.";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly directories: {
            readonly type: "object";
            readonly properties: {
                readonly bin: {
                    readonly description: "If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash.";
                    readonly type: "string";
                };
                readonly doc: {
                    readonly description: "Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.";
                    readonly type: "string";
                };
                readonly example: {
                    readonly description: "Put example scripts in here. Someday, it might be exposed in some clever way.";
                    readonly type: "string";
                };
                readonly lib: {
                    readonly description: "Tell people where the bulk of your library is. Nothing special is done with the lib folder in any way, but it's useful meta info.";
                    readonly type: "string";
                };
                readonly man: {
                    readonly description: "A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.";
                    readonly type: "string";
                };
                readonly test: {
                    readonly type: "string";
                };
            };
        };
        readonly repository: {
            readonly description: "Specify the place where your code lives. This is helpful for people who want to contribute.";
            readonly type: readonly ["object", "string"];
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                };
                readonly url: {
                    readonly type: "string";
                };
                readonly directory: {
                    readonly type: "string";
                };
            };
        };
        readonly funding: {
            readonly oneOf: readonly [{
                readonly $ref: "#/definitions/fundingUrl";
            }, {
                readonly $ref: "#/definitions/fundingWay";
            }, {
                readonly type: "array";
                readonly items: {
                    readonly oneOf: readonly [{
                        readonly $ref: "#/definitions/fundingUrl";
                    }, {
                        readonly $ref: "#/definitions/fundingWay";
                    }];
                };
                readonly minItems: 1;
                readonly uniqueItems: true;
            }];
        };
        readonly scripts: {
            readonly description: "The 'scripts' member is an object hash of script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.";
            readonly type: "object";
            readonly properties: {
                readonly lint: {
                    readonly type: "string";
                    readonly description: "Run code quality tools, e.g. ESLint, TSLint, etc.";
                };
                readonly prepublish: {
                    readonly type: "string";
                    readonly description: "Run BEFORE the package is published (Also run on local npm install without any arguments).";
                };
                readonly prepare: {
                    readonly type: "string";
                    readonly description: "Runs BEFORE the package is packed, i.e. during \"npm publish\" and \"npm pack\", and on local \"npm install\" without any arguments. This is run AFTER \"prepublish\", but BEFORE \"prepublishOnly\".";
                };
                readonly prepublishOnly: {
                    readonly type: "string";
                    readonly description: "Run BEFORE the package is prepared and packed, ONLY on npm publish.";
                };
                readonly prepack: {
                    readonly type: "string";
                    readonly description: "run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies).";
                };
                readonly postpack: {
                    readonly type: "string";
                    readonly description: "Run AFTER the tarball has been generated and moved to its final destination.";
                };
                readonly publish: {
                    readonly type: "string";
                    readonly description: "Publishes a package to the registry so that it can be installed by name. See https://docs.npmjs.com/cli/v8/commands/npm-publish";
                };
                readonly postpublish: {
                    readonly $ref: "#/definitions/scriptsPublishAfter";
                };
                readonly preinstall: {
                    readonly type: "string";
                    readonly description: "Run BEFORE the package is installed.";
                };
                readonly install: {
                    readonly $ref: "#/definitions/scriptsInstallAfter";
                };
                readonly postinstall: {
                    readonly $ref: "#/definitions/scriptsInstallAfter";
                };
                readonly preuninstall: {
                    readonly $ref: "#/definitions/scriptsUninstallBefore";
                };
                readonly uninstall: {
                    readonly $ref: "#/definitions/scriptsUninstallBefore";
                };
                readonly postuninstall: {
                    readonly type: "string";
                    readonly description: "Run AFTER the package is uninstalled.";
                };
                readonly preversion: {
                    readonly $ref: "#/definitions/scriptsVersionBefore";
                };
                readonly version: {
                    readonly $ref: "#/definitions/scriptsVersionBefore";
                };
                readonly postversion: {
                    readonly type: "string";
                    readonly description: "Run AFTER bump the package version.";
                };
                readonly pretest: {
                    readonly $ref: "#/definitions/scriptsTest";
                };
                readonly test: {
                    readonly $ref: "#/definitions/scriptsTest";
                };
                readonly posttest: {
                    readonly $ref: "#/definitions/scriptsTest";
                };
                readonly prestop: {
                    readonly $ref: "#/definitions/scriptsStop";
                };
                readonly stop: {
                    readonly $ref: "#/definitions/scriptsStop";
                };
                readonly poststop: {
                    readonly $ref: "#/definitions/scriptsStop";
                };
                readonly prestart: {
                    readonly $ref: "#/definitions/scriptsStart";
                };
                readonly start: {
                    readonly $ref: "#/definitions/scriptsStart";
                };
                readonly poststart: {
                    readonly $ref: "#/definitions/scriptsStart";
                };
                readonly prerestart: {
                    readonly $ref: "#/definitions/scriptsRestart";
                };
                readonly restart: {
                    readonly $ref: "#/definitions/scriptsRestart";
                };
                readonly postrestart: {
                    readonly $ref: "#/definitions/scriptsRestart";
                };
                readonly serve: {
                    readonly type: "string";
                    readonly description: "Start dev server to serve application files";
                };
            };
            readonly additionalProperties: {
                readonly type: "string";
                readonly tsType: "string | undefined";
                readonly "x-intellij-language-injection": "Shell Script";
            };
        };
        readonly config: {
            readonly description: "A 'config' hash can be used to set configuration parameters used in package scripts that persist across upgrades.";
            readonly type: "object";
            readonly additionalProperties: true;
        };
        readonly dependencies: {
            readonly $ref: "#/definitions/dependency";
        };
        readonly devDependencies: {
            readonly $ref: "#/definitions/devDependency";
        };
        readonly optionalDependencies: {
            readonly $ref: "#/definitions/optionalDependency";
        };
        readonly peerDependencies: {
            readonly $ref: "#/definitions/peerDependency";
        };
        readonly peerDependenciesMeta: {
            readonly $ref: "#/definitions/peerDependencyMeta";
        };
        readonly bundleDependencies: {
            readonly description: "Array of package names that will be bundled when publishing the package.";
            readonly oneOf: readonly [{
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            }, {
                readonly type: "boolean";
            }];
        };
        readonly bundledDependencies: {
            readonly description: "DEPRECATED: This field is honored, but \"bundleDependencies\" is the correct field name.";
            readonly oneOf: readonly [{
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            }, {
                readonly type: "boolean";
            }];
        };
        readonly resolutions: {
            readonly description: "Resolutions is used to support selective version resolutions using yarn, which lets you define custom package versions or ranges inside your dependencies. For npm, use overrides instead. See: https://classic.yarnpkg.com/en/docs/selective-version-resolutions";
            readonly type: "object";
        };
        readonly overrides: {
            readonly description: "Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies. For yarn, use resolutions instead. See: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides";
            readonly type: "object";
        };
        readonly packageManager: {
            readonly description: "Defines which package manager is expected to be used when working on the current project. This field is currently experimental and needs to be opted-in; see https://nodejs.org/api/corepack.html";
            readonly type: "string";
            readonly pattern: "(npm|pnpm|yarn|bun)@\\d+\\.\\d+\\.\\d+(-.+)?";
        };
        readonly engines: {
            readonly type: "object";
            readonly properties: {
                readonly node: {
                    readonly type: "string";
                };
            };
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly volta: {
            readonly description: "Defines which tools and versions are expected to be used when Volta is installed.";
            readonly type: "object";
            readonly properties: {
                readonly extends: {
                    readonly description: "The value of that entry should be a path to another JSON file which also has a \"volta\" section";
                    readonly type: "string";
                };
            };
            readonly patternProperties: {
                readonly "(node|npm|pnpm|yarn)": {
                    readonly type: "string";
                };
            };
        };
        readonly engineStrict: {
            readonly type: "boolean";
        };
        readonly os: {
            readonly description: "Specify which operating systems your module will run on.";
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly cpu: {
            readonly description: "Specify that your code only runs on certain cpu architectures.";
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly preferGlobal: {
            readonly type: "boolean";
            readonly description: "DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is purely there for informational purposes. It is now recommended that you install any binaries as local devDependencies wherever possible.";
        };
        readonly private: {
            readonly description: "If set to true, then npm will refuse to publish it.";
            readonly oneOf: readonly [{
                readonly type: "boolean";
            }, {
                readonly enum: readonly ["false", "true"];
            }];
        };
        readonly publishConfig: {
            readonly type: "object";
            readonly properties: {
                readonly access: {
                    readonly type: "string";
                    readonly enum: readonly ["public", "restricted"];
                };
                readonly tag: {
                    readonly type: "string";
                };
                readonly registry: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly provenance: {
                    readonly type: "boolean";
                };
            };
            readonly additionalProperties: true;
        };
        readonly dist: {
            readonly type: "object";
            readonly properties: {
                readonly shasum: {
                    readonly type: "string";
                };
                readonly tarball: {
                    readonly type: "string";
                };
            };
        };
        readonly readme: {
            readonly type: "string";
        };
        readonly module: {
            readonly description: "An ECMAScript module ID that is the primary entry point to your program.";
            readonly type: "string";
        };
        readonly esnext: {
            readonly description: "A module ID with untranspiled code that is the primary entry point to your program.";
            readonly type: readonly ["string", "object"];
            readonly properties: {
                readonly main: {
                    readonly type: "string";
                };
                readonly browser: {
                    readonly type: "string";
                };
            };
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly workspaces: {
            readonly description: "Allows packages within a directory to depend on one another using direct linking of local files. Additionally, dependencies within a workspace are hoisted to the workspace root when possible to reduce duplication. Note: It's also a good idea to set \"private\" to true when using this feature.";
            readonly anyOf: readonly [{
                readonly type: "array";
                readonly description: "Workspace package paths. Glob patterns are supported.";
                readonly items: {
                    readonly type: "string";
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly packages: {
                        readonly type: "array";
                        readonly description: "Workspace package paths. Glob patterns are supported.";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly nohoist: {
                        readonly type: "array";
                        readonly description: "Packages to block from hoisting to the workspace root. Currently only supported in Yarn only.";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
            }];
        };
        readonly jspm: {
            readonly $ref: "#";
        };
        readonly eslintConfig: {
            readonly $ref: "https://json.schemastore.org/eslintrc.json";
        };
        readonly prettier: {
            readonly $ref: "https://json.schemastore.org/prettierrc.json";
        };
        readonly stylelint: {
            readonly $ref: "https://json.schemastore.org/stylelintrc.json";
        };
        readonly ava: {
            readonly $ref: "https://json.schemastore.org/ava.json";
        };
        readonly release: {
            readonly $ref: "https://json.schemastore.org/semantic-release.json";
        };
        readonly jscpd: {
            readonly $ref: "https://json.schemastore.org/jscpd.json";
        };
        readonly pnpm: {
            readonly description: "Defines pnpm specific configuration.";
            readonly type: "object";
            readonly properties: {
                readonly overrides: {
                    readonly description: "Used to override any dependency in the dependency graph.";
                    readonly type: "object";
                };
                readonly packageExtensions: {
                    readonly description: "Used to extend the existing package definitions with additional information.";
                    readonly type: "object";
                    readonly patternProperties: {
                        readonly "^.+$": {
                            readonly type: "object";
                            readonly properties: {
                                readonly dependencies: {
                                    readonly $ref: "#/definitions/dependency";
                                };
                                readonly optionalDependencies: {
                                    readonly $ref: "#/definitions/optionalDependency";
                                };
                                readonly peerDependencies: {
                                    readonly $ref: "#/definitions/peerDependency";
                                };
                                readonly peerDependenciesMeta: {
                                    readonly $ref: "#/definitions/peerDependencyMeta";
                                };
                            };
                            readonly additionalProperties: false;
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly peerDependencyRules: {
                    readonly type: "object";
                    readonly properties: {
                        readonly ignoreMissing: {
                            readonly description: "pnpm will not print warnings about missing peer dependencies from this list.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly allowedVersions: {
                            readonly description: "Unmet peer dependency warnings will not be printed for peer dependencies of the specified range.";
                            readonly type: "object";
                        };
                        readonly allowAny: {
                            readonly description: "Any peer dependency matching the pattern will be resolved from any version, regardless of the range specified in \"peerDependencies\".";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly neverBuiltDependencies: {
                    readonly description: "A list of dependencies to run builds for.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly onlyBuiltDependencies: {
                    readonly description: "A list of package names that are allowed to be executed during installation.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly onlyBuiltDependenciesFile: {
                    readonly description: "Specifies a JSON file that lists the only packages permitted to run installation scripts during the pnpm install process.";
                    readonly type: "string";
                };
                readonly ignoredBuiltDependencies: {
                    readonly description: "A list of package names that should not be built during installation.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly allowedDeprecatedVersions: {
                    readonly description: "A list of deprecated versions that the warnings are suppressed.";
                    readonly type: "object";
                };
                readonly patchedDependencies: {
                    readonly description: "A list of dependencies that are patched.";
                    readonly type: "object";
                };
                readonly allowNonAppliedPatches: {
                    readonly description: "When true, installation won't fail if some of the patches from the \"patchedDependencies\" field were not applied.";
                    readonly type: "boolean";
                };
                readonly updateConfig: {
                    readonly type: "object";
                    readonly properties: {
                        readonly ignoreDependencies: {
                            readonly description: "A list of packages that should be ignored when running \"pnpm outdated\" or \"pnpm update --latest\".";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly configDependencies: {
                    readonly type: "object";
                    readonly description: "Configurational dependencies are installed before all the other types of dependencies (before 'dependencies', 'devDependencies', 'optionalDependencies').";
                };
                readonly auditConfig: {
                    readonly type: "object";
                    readonly properties: {
                        readonly ignoreCves: {
                            readonly description: "A list of CVE IDs that will be ignored by \"pnpm audit\".";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly pattern: "^CVE-\\d{4}-\\d{4,7}$";
                            };
                        };
                        readonly ignoreGhsas: {
                            readonly description: "A list of GHSA Codes that will be ignored by \"pnpm audit\".";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly pattern: "^GHSA(-[23456789cfghjmpqrvwx]{4}){3}$";
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly requiredScripts: {
                    readonly description: "A list of scripts that must exist in each project.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly supportedArchitectures: {
                    readonly description: "Specifies architectures for which you'd like to install optional dependencies, even if they don't match the architecture of the system running the install.";
                    readonly type: "object";
                    readonly properties: {
                        readonly os: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly cpu: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly libc: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly ignoredOptionalDependencies: {
                    readonly description: "A list of optional dependencies that the install should be skipped.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly executionEnv: {
                    readonly type: "object";
                    readonly properties: {
                        readonly nodeVersion: {
                            readonly description: "Specifies which exact Node.js version should be used for the project's runtime.";
                            readonly type: "string";
                        };
                    };
                    readonly additionalProperties: false;
                };
            };
            readonly additionalProperties: false;
        };
    };
    readonly anyOf: readonly [{
        readonly type: "object";
        readonly not: {
            readonly required: readonly ["bundledDependencies", "bundleDependencies"];
        };
    }, {
        readonly type: "object";
        readonly not: {
            readonly required: readonly ["bundleDependencies"];
        };
        readonly required: readonly ["bundledDependencies"];
    }, {
        readonly type: "object";
        readonly not: {
            readonly required: readonly ["bundledDependencies"];
        };
        readonly required: readonly ["bundleDependencies"];
    }];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/Persona";
    readonly title: "Persona";
    readonly description: "Defines a persona in the OriginVault ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly description: "Schema.org type";
        };
        readonly personaId: {
            readonly type: "string";
            readonly description: "DID of the persona.";
        };
        readonly displayName: {
            readonly type: "string";
            readonly description: "User's display name or pseudonym.";
        };
        readonly associatedDID: {
            readonly type: "string";
            readonly description: "The primary DID associated with this persona.";
        };
        readonly personaType: {
            readonly type: "string";
            readonly enum: readonly ["Creator", "Verifier", "Vault Operator", "Community Member", "AI Trainer"];
            readonly description: "Role of the user within the OV ecosystem.";
        };
        readonly joinedDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Date of persona creation.";
        };
        readonly reputationScore: {
            readonly type: "object";
            readonly properties: {
                readonly trustLevel: {
                    readonly type: "number";
                    readonly description: "A calculated trust score based on activity and endorsements.";
                };
                readonly endorsements: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "DIDs of other users who have endorsed this persona.";
                    };
                };
            };
            readonly description: "Tracks the persona's trust and reputation.";
        };
        readonly badges: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "List of awarded badges or recognitions.";
            };
        };
        readonly activityLog: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly activityType: {
                        readonly type: "string";
                        readonly description: "Type of activity performed.";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Timestamp of activity.";
                    };
                };
            };
            readonly description: "Logs important persona actions within OV.";
        };
        readonly linkedSocials: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "List of linked social media or web3 identities.";
            };
        };
    };
    readonly required: readonly ["personaId", "associatedDID", "personaType", "joinedDate"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly "@context": readonly ["https://schema.org", "https://schemas.originvault.io"];
    readonly $id: "https://schemas.originvault.io/PluginDeclaration";
    readonly title: "Plugin Declaration";
    readonly description: "Defines a plugin registered in an OV Namespace, including governance, versioning, and compatibility.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["SoftwareApplication", "WebApplication", "Extension", "Protocol"];
            readonly description: "Schema.org type defining the plugin category.";
        };
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the plugin.";
        };
        readonly namespace: {
            readonly type: "string";
            readonly description: "The DID of the namespace this plugin belongs to.";
        };
        readonly vault: {
            readonly type: "string";
            readonly description: "The DID of the vault that owns this plugin.";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name of the plugin.";
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Detailed description of the plugin’s functionality.";
        };
        readonly version: {
            readonly type: "string";
            readonly description: "Semantic versioning (e.g., 1.0.0).";
        };
        readonly author: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "DID of the entity or user who created the plugin.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Author's name or organization.";
                };
                readonly url: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Website or documentation link.";
                };
            };
        };
        readonly compatibleNodes: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly enum: readonly ["IdentityNode", "StorageNode", "ComputeNode", "VerificationNode"];
            readonly description: "The node types this plugin is designed to run on.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The id of the linked resource.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "The URI of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., governance, metadata, event log).";
                    };
                };
                readonly required: readonly ["id", "type"];
            };
            readonly description: "References to plugin documentation, code, or policies.";
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly approvedBy: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of governance bodies or validators that approved the plugin.";
                };
                readonly complianceRules: {
                    readonly type: "string";
                    readonly description: "Reference to compliance policies stored in Ceramic.";
                };
            };
            readonly description: "Governance and compliance information for the plugin.";
        };
        readonly installation: {
            readonly type: "object";
            readonly properties: {
                readonly installMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["VaultInstallation", "NodeInstallation", "GlobalInstallation"];
                    readonly description: "Defines where the plugin can be installed.";
                };
                readonly dependencies: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of other required plugins or services.";
                };
                readonly configurationSchema: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to a schema defining plugin-specific configuration options.";
                };
            };
            readonly description: "Defines how the plugin is installed and configured.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "deprecated", "revoked"];
            readonly description: "The current status of the plugin.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this plugin declaration was issued.";
        };
    };
    readonly required: readonly ["@type", "id", "namespace", "name", "version", "author", "compatibleNodes", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/PluginDeveloperAgreement";
    readonly title: "Plugin Developer Agreement";
    readonly description: "Defines the terms for publishing a plugin in the OV ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork", "SoftwareApplication"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly pluginId: {
            readonly type: "string";
            readonly description: "DID of the plugin.";
        };
        readonly developerId: {
            readonly type: "string";
            readonly description: "DID of the developer.";
        };
        readonly securityRequirements: {
            readonly type: "string";
            readonly description: "The security audit requirements for publishing a plugin.";
        };
        readonly monetizationModel: {
            readonly type: "string";
            readonly enum: readonly ["Free", "Subscription", "One-time Purchase"];
            readonly description: "How the plugin is monetized.";
        };
        readonly compliancePolicy: {
            readonly type: "string";
            readonly description: "Plugin compliance rules and enforcement.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions for plugin removal from the OV ecosystem.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the developer has accepted the agreement.";
        };
    };
    readonly required: readonly ["agreementId", "pluginId", "developerId", "securityRequirements", "monetizationModel", "compliancePolicy", "revocationPolicy", "agreementSigned"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/PluginExecutionRequest";
    readonly title: "Plugin Execution Request";
    readonly description: "Defines a request from a plugin running in a vault to interact with an OV node.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the execution request.";
        };
        readonly vault: {
            readonly type: "string";
            readonly description: "The DID of the vault running the plugin.";
        };
        readonly plugin: {
            readonly type: "string";
            readonly description: "The DID of the plugin making the request.";
        };
        readonly node: {
            readonly type: "string";
            readonly description: "The DID of the node handling the request.";
        };
        readonly requestType: {
            readonly type: "string";
            readonly enum: readonly ["ComputeTask", "DataRead", "DataWrite", "IdentityLookup", "VerificationCheck"];
            readonly description: "Type of request being made.";
        };
        readonly parameters: {
            readonly type: "object";
            readonly description: "Additional parameters required for processing the request.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["pending", "processing", "completed", "failed"];
            readonly description: "Current status of the request.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of request submission.";
        };
    };
    readonly required: readonly ["id", "vault", "plugin", "node", "requestType", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/PluginIntegrationAgreement";
    readonly title: "Plugin Integration Agreement";
    readonly description: "Defines the permissions and restrictions for a plugin installed in a Vault.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly pluginId: {
            readonly type: "string";
            readonly description: "DID of the installed plugin.";
        };
        readonly vaultId: {
            readonly type: "string";
            readonly description: "DID of the Vault where the plugin is installed.";
        };
        readonly permissions: {
            readonly type: "object";
            readonly properties: {
                readonly storageAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the plugin access storage?";
                };
                readonly computeAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the plugin perform computations?";
                };
            };
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions under which the plugin may be removed.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the plugin provider has accepted the agreement.";
        };
    };
    readonly required: readonly ["agreementId", "pluginId", "vaultId", "permissions", "revocationPolicy", "agreementSigned"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/ReferalAgreement";
    readonly title: "Referal Agreement";
    readonly description: "Defines the rules for trust-based referrals and reputation scoring within the OV ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly referrerId: {
            readonly type: "string";
            readonly description: "DID of the entity providing the referral.";
        };
        readonly referredEntityId: {
            readonly type: "string";
            readonly description: "DID of the entity receiving the referral.";
        };
        readonly trustScoreImpact: {
            readonly type: "object";
            readonly properties: {
                readonly initialBoost: {
                    readonly type: "number";
                    readonly description: "Trust score increase from referral.";
                };
                readonly slashingConditions: {
                    readonly type: "string";
                    readonly description: "Conditions under which the referral can be revoked or slashed.";
                };
            };
        };
        readonly reputationRewards: {
            readonly type: "string";
            readonly description: "How referrers are rewarded if the referred entity performs well.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether both parties accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "referrerId", "referredEntityId", "trustScoreImpact", "reputationRewards", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/RevenueDistribution";
    readonly title: "Revenue Distribution";
    readonly description: "Defines how revenue from data sales is distributed to Data Chamber contributors.";
    readonly type: "object";
    readonly properties: {
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Data Chamber.";
        };
        readonly totalRevenue: {
            readonly type: "number";
            readonly description: "Total revenue generated by data sales.";
        };
        readonly distribution: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly recipientId: {
                        readonly type: "string";
                        readonly description: "DID of the user receiving a payout.";
                    };
                    readonly amount: {
                        readonly type: "number";
                        readonly description: "Payout amount.";
                    };
                };
            };
            readonly description: "List of users and their payouts.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the revenue was distributed.";
        };
    };
    readonly required: readonly ["chamberId", "totalRevenue", "distribution", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/Revocation";
    readonly title: "Revocation Schema";
    readonly description: "Defines the revocation process for nodes, clusters, or users.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the revocation record.";
        };
        readonly entity: {
            readonly type: "string";
            readonly description: "The DID of the revoked entity (Node, Cluster, User).";
        };
        readonly revokedBy: {
            readonly type: "string";
            readonly description: "The DID of the authority that revoked the entity.";
        };
        readonly reason: {
            readonly type: "string";
            readonly description: "Explanation for the revocation.";
        };
        readonly linkedEvidence: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "References to evidence supporting revocation (e.g., governance vote logs).";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of the revocation.";
        };
    };
    readonly required: readonly ["id", "entity", "revokedBy", "reason", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/RootAuthority";
    readonly title: "Root Authority Declaration";
    readonly description: "Declaration of a root authority establishing a trust chain for any namespace, platform, user, organization, community, or concept.";
    readonly type: "object";
    readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject"];
    readonly properties: {
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["VerifiableCredential", "RootAuthorityDeclaration"];
        };
        readonly issuer: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the entity declaring itself as a root authority";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the root authority";
                };
            };
            readonly required: readonly ["id"];
        };
        readonly issuanceDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the root authority declaration was issued";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the root authority (same as issuer for self-declaration)";
                };
                readonly rootType: {
                    readonly type: "string";
                    readonly enum: readonly ["namespace", "platform", "user", "organization", "community", "concept"];
                    readonly description: "Type of root authority being declared";
                };
                readonly scope: {
                    readonly type: "string";
                    readonly description: "Scope or domain of authority";
                    readonly examples: readonly ["originvault.box", "content-authenticity", "user-reputation", "platform-governance", "community-standards", "data-provenance", "academic-credentials", "supply-chain"];
                };
                readonly trustChainPurpose: {
                    readonly type: "string";
                    readonly description: "Purpose and goals of this trust chain";
                    readonly examples: readonly ["Verify content authenticity and provenance", "Establish user reputation across platforms", "Govern platform operations and policies", "Certify academic achievements", "Track supply chain provenance"];
                };
                readonly governanceModel: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["self-governed", "dao", "multisig", "committee", "democratic", "consortium"];
                            readonly description: "Governance model for this root authority";
                        };
                        readonly participants: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "DIDs of governance participants (if applicable)";
                        };
                        readonly policyDocument: {
                            readonly type: "string";
                            readonly description: "Reference to governance policies and procedures";
                        };
                    };
                    readonly required: readonly ["type"];
                };
                readonly delegationPolicy: {
                    readonly type: "object";
                    readonly properties: {
                        readonly allowsSubRoots: {
                            readonly type: "boolean";
                            readonly description: "Whether this root authority can delegate to sub-roots";
                        };
                        readonly maxChainDepth: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Maximum depth of trust chain delegation";
                        };
                        readonly delegationCriteria: {
                            readonly type: "string";
                            readonly description: "Criteria for delegating authority to trusted issuers";
                        };
                    };
                };
                readonly accreditationStandards: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly standardId: {
                                readonly type: "string";
                                readonly description: "Identifier for the accreditation standard";
                            };
                            readonly schemaTypes: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Credential types this root can accredit issuers for";
                            };
                            readonly trustLevels: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Trust levels this root authority recognizes";
                            };
                        };
                        readonly required: readonly ["standardId", "schemaTypes"];
                    };
                    readonly description: "Accreditation standards this root authority supports";
                };
                readonly interoperability: {
                    readonly type: "object";
                    readonly properties: {
                        readonly recognizedRoots: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "DIDs of other root authorities this root recognizes";
                        };
                        readonly crossChainValidation: {
                            readonly type: "boolean";
                            readonly description: "Whether this root supports cross-chain credential validation";
                        };
                        readonly federationMember: {
                            readonly type: "string";
                            readonly description: "Federation or consortium this root belongs to (optional)";
                        };
                    };
                };
                readonly blockchainAnchoring: {
                    readonly type: "object";
                    readonly properties: {
                        readonly blockchainNetwork: {
                            readonly type: "string";
                            readonly examples: readonly ["cheqd-mainnet", "ethereum", "polygon", "hyperledger-indy"];
                            readonly description: "Blockchain network where this root is anchored";
                        };
                        readonly resourceId: {
                            readonly type: "string";
                            readonly description: "Blockchain resource ID for this root authority";
                        };
                        readonly registrationProof: {
                            readonly type: "string";
                            readonly description: "Cryptographic proof of blockchain registration";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "rootType", "scope", "trustChainPurpose", "governanceModel"];
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof of the root authority declaration";
        };
    };
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/ServiceLevelAgreement";
    readonly title: "Service-Level Agreement (SLA) for OV Nodes";
    readonly description: "Defines minimum performance guarantees for nodes in the OV ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly nodeId: {
            readonly type: "string";
            readonly description: "DID of the Node.";
        };
        readonly namespaceId: {
            readonly type: "string";
            readonly description: "DID of the Namespace the node belongs to.";
        };
        readonly nodeType: {
            readonly type: "string";
            readonly enum: readonly ["Identity", "Storage", "Compute", "Verification"];
            readonly description: "The type of node operating under this SLA.";
        };
        readonly expectedUptime: {
            readonly type: "object";
            readonly properties: {
                readonly minPercentage: {
                    readonly type: "number";
                    readonly description: "Minimum required uptime percentage (e.g., 99.9%).";
                };
                readonly measurementPeriod: {
                    readonly type: "string";
                    readonly description: "Time period over which uptime is measured (e.g., 30 days).";
                };
            };
        };
        readonly latencyThresholds: {
            readonly type: "object";
            readonly properties: {
                readonly maxResponseTime: {
                    readonly type: "number";
                    readonly description: "Maximum allowed response time (in milliseconds).";
                };
                readonly maxProcessingTime: {
                    readonly type: "number";
                    readonly description: "Maximum allowed compute processing time (in milliseconds).";
                };
            };
        };
        readonly failureCompensation: {
            readonly type: "object";
            readonly properties: {
                readonly financialPenalty: {
                    readonly type: "string";
                    readonly description: "Penalty applied if the Node fails SLA requirements (e.g., reduced staking rewards, service fees).";
                };
                readonly trustScoreImpact: {
                    readonly type: "number";
                    readonly description: "Negative impact on the Node’s trust score if SLA terms are violated.";
                };
                readonly downgradeStatus: {
                    readonly type: "boolean";
                    readonly description: "Whether the Node can be downgraded to a lower-tier role upon SLA violations.";
                };
            };
            readonly description: "Defines penalties and consequences for failing to meet SLA obligations.";
        };
        readonly compensationIncentives: {
            readonly type: "object";
            readonly properties: {
                readonly bonusForHighUptime: {
                    readonly type: "boolean";
                    readonly description: "Whether nodes get rewards for exceeding SLA targets.";
                };
                readonly feeReductions: {
                    readonly type: "boolean";
                    readonly description: "Whether nodes can receive reduced operational fees for high performance.";
                };
            };
            readonly description: "Defines incentive mechanisms for high-performance Nodes.";
        };
        readonly complianceMonitoring: {
            readonly type: "object";
            readonly properties: {
                readonly monitoringEntity: {
                    readonly type: "string";
                    readonly description: "DID of the entity monitoring SLA compliance.";
                };
                readonly auditFrequency: {
                    readonly type: "string";
                    readonly description: "How often the node is audited for SLA compliance (e.g., monthly, quarterly).";
                };
                readonly onChainLogging: {
                    readonly type: "boolean";
                    readonly description: "Whether compliance logs are recorded on-chain for transparency.";
                };
            };
            readonly description: "Specifies how SLA compliance is monitored and enforced.";
        };
        readonly stakingRequirements: {
            readonly type: "object";
            readonly properties: {
                readonly requiredStakeAmount: {
                    readonly type: "number";
                    readonly description: "Minimum amount of tokens staked to participate as a Node.";
                };
                readonly slashingConditions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "Conditions under which staked tokens can be slashed (e.g., repeated SLA violations).";
                };
            };
            readonly description: "Defines staking and collateral mechanisms for Nodes.";
        };
        readonly revocationPolicy: {
            readonly type: "object";
            readonly properties: {
                readonly conditionsForRemoval: {
                    readonly type: "string";
                    readonly description: "Conditions under which a Node is removed from the Cluster.";
                };
                readonly gracePeriod: {
                    readonly type: "number";
                    readonly description: "Amount of time the Node has to fix compliance issues before removal.";
                };
                readonly appealProcess: {
                    readonly type: "string";
                    readonly description: "Procedure for a Node to challenge its removal from the Cluster.";
                };
            };
            readonly description: "Defines rules for Node removal due to SLA non-compliance.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the Node operator has accepted the SLA.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "nodeId", "namespaceId", "nodeType", "expectedUptime", "latencyThresholds", "failureCompensation", "complianceMonitoring", "stakingRequirements", "revocationPolicy", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/StorageNodeDeclaration";
    readonly title: "Storage Node Declaration";
    readonly description: "Defines a Storage Node in an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the Storage Node.";
        };
        readonly type: {
            readonly const: "StorageNode";
            readonly description: "Node type.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster this node belongs to.";
        };
        readonly operator: {
            readonly type: "string";
            readonly description: "DID of the entity operating this node.";
        };
        readonly storageType: {
            readonly type: "string";
            readonly enum: readonly ["MinIO", "IPFS", "Arweave", "Verida"];
            readonly description: "Type of storage system used.";
        };
        readonly storageCapacity: {
            readonly type: "string";
            readonly description: "Storage capacity available (e.g., 1TB, 100GB).";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., Data, Metadata, ContentManifest).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "References to stored resources.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "suspended", "revoked"];
            readonly description: "Operational status of the node.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of node declaration.";
        };
    };
    readonly required: readonly ["id", "cluster", "operator", "storageType", "storageCapacity", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/TrustChainDelegation";
    readonly title: "Trust Chain Delegation";
    readonly description: "Verifiable delegation of trust authority from any root or trusted issuer to another entity in a trust chain.";
    readonly type: "object";
    readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject"];
    readonly properties: {
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["VerifiableCredential", "TrustChainDelegation"];
        };
        readonly issuer: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the delegating authority (root or trusted issuer)";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the delegating authority";
                };
                readonly authorityType: {
                    readonly type: "string";
                    readonly enum: readonly ["root", "trusted-issuer", "delegated-authority"];
                    readonly description: "Type of authority making the delegation";
                };
            };
            readonly required: readonly ["id", "authorityType"];
        };
        readonly issuanceDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the delegation was issued";
        };
        readonly expirationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the delegation expires (optional)";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the entity receiving delegation";
                };
                readonly delegationType: {
                    readonly type: "string";
                    readonly enum: readonly ["trusted-issuer", "sub-root", "verifier", "validator"];
                    readonly description: "Type of delegation being granted";
                };
                readonly trustChainContext: {
                    readonly type: "object";
                    readonly properties: {
                        readonly rootAuthority: {
                            readonly type: "string";
                            readonly pattern: "^did:";
                            readonly description: "DID of the ultimate root authority in this chain";
                        };
                        readonly parentAuthority: {
                            readonly type: "string";
                            readonly pattern: "^did:";
                            readonly description: "DID of the immediate parent in delegation chain";
                        };
                        readonly chainDepth: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Depth in the trust chain (1 = direct from root)";
                        };
                        readonly namespace: {
                            readonly type: "string";
                            readonly description: "Namespace or domain scope of this delegation";
                        };
                    };
                    readonly required: readonly ["rootAuthority", "parentAuthority", "chainDepth"];
                };
                readonly delegatedAuthorities: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly authority: {
                                readonly type: "string";
                                readonly enum: readonly ["issue-credentials", "verify-credentials", "revoke-credentials", "delegate-authority", "update-schemas", "manage-trust-lists"];
                                readonly description: "Specific authority being delegated";
                            };
                            readonly scope: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Credential types or schemas this authority applies to";
                            };
                            readonly conditions: {
                                readonly type: "string";
                                readonly description: "Conditions or limitations on this authority";
                            };
                        };
                        readonly required: readonly ["authority"];
                    };
                    readonly description: "Specific authorities being delegated";
                };
                readonly constraints: {
                    readonly type: "object";
                    readonly properties: {
                        readonly maxSubDelegations: {
                            readonly type: "integer";
                            readonly minimum: 0;
                            readonly description: "Maximum number of sub-delegations allowed";
                        };
                        readonly allowedDelegationTypes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Types of delegations this entity can make";
                        };
                        readonly geographicScope: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Geographic limitations on delegation scope";
                        };
                        readonly industryScope: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Industry or domain limitations";
                        };
                    };
                };
                readonly operationalRequirements: {
                    readonly type: "object";
                    readonly properties: {
                        readonly technicalStandards: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Technical standards the delegate must follow";
                        };
                        readonly auditRequirements: {
                            readonly type: "string";
                            readonly description: "Audit and compliance requirements";
                        };
                        readonly reportingRequirements: {
                            readonly type: "string";
                            readonly description: "Reporting obligations to delegating authority";
                        };
                        readonly insuranceRequirements: {
                            readonly type: "string";
                            readonly description: "Insurance or bonding requirements";
                        };
                    };
                };
                readonly revocationConditions: {
                    readonly type: "object";
                    readonly properties: {
                        readonly revocableBy: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "DIDs of entities that can revoke this delegation";
                        };
                        readonly revocationCriteria: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: "Conditions under which delegation can be revoked";
                        };
                        readonly appealProcess: {
                            readonly type: "string";
                            readonly description: "Process for appealing revocation decisions";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "delegationType", "trustChainContext", "delegatedAuthorities"];
        };
        readonly termsOfUse: {
            readonly type: "object";
            readonly properties: {
                readonly delegationAgreement: {
                    readonly type: "string";
                    readonly description: "Reference to the delegation agreement document";
                };
                readonly governingLaw: {
                    readonly type: "string";
                    readonly description: "Legal jurisdiction governing this delegation";
                };
            };
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof of the delegation";
        };
    };
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/TrustEndorsement";
    readonly title: "Trust Delegation";
    readonly description: "Allows trusted users to endorse others, strengthening the trust economy.";
    readonly type: "object";
    readonly properties: {
        readonly endorser: {
            readonly type: "string";
            readonly description: "DID of the user endorsing another user.";
        };
        readonly recipient: {
            readonly type: "string";
            readonly description: "DID of the endorsed user.";
        };
        readonly endorsementReason: {
            readonly type: "string";
            readonly description: "Why the user is being endorsed.";
        };
        readonly endorsementType: {
            readonly type: "string";
            readonly enum: readonly ["verification", "governance", "community", "development"];
            readonly description: "Category of the endorsement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time when the endorsement was given.";
        };
        readonly linkedGem: {
            readonly type: "string";
            readonly description: "The Gem that qualifies the endorser to give this endorsement.";
        };
        readonly linkedCredential: {
            readonly type: "string";
            readonly description: "DID-Linked Resource to a Verifiable Credential supporting the endorsement.";
        };
    };
    readonly required: readonly ["endorser", "recipient", "endorsementReason", "endorsementType", "timestamp", "linkedGem", "linkedCredential"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/TrustedIssuer";
    readonly title: "Trusted Issuer Accreditation";
    readonly description: "Verifiable Accreditation for trusted issuers within any trust chain, following cheqd DTC patterns for namespace-based trust hierarchies.";
    readonly type: "object";
    readonly required: readonly ["@context", "type", "issuer", "issuanceDate", "credentialSubject", "termsOfUse"];
    readonly properties: {
        readonly "@context": {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["https://www.w3.org/2018/credentials/v1", "https://schema.org", "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"];
        };
        readonly type: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly default: readonly ["VerifiableCredential", "VerifiableAccreditation", "TrustedIssuerAccreditation"];
        };
        readonly issuer: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the issuing authority - could be any namespace root, platform root, or user root";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the issuing authority";
                };
                readonly rootType: {
                    readonly type: "string";
                    readonly enum: readonly ["namespace", "platform", "user", "organization", "community", "concept"];
                    readonly description: "Type of root authority issuing this accreditation";
                };
            };
            readonly required: readonly ["id"];
        };
        readonly issuanceDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the accreditation was issued";
        };
        readonly expirationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the accreditation expires";
        };
        readonly credentialSubject: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly pattern: "^did:";
                    readonly description: "DID of the accredited trusted issuer";
                };
                readonly accreditedFor: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly namespaceId: {
                                readonly type: "string";
                                readonly description: "Namespace or domain for which the issuer is accredited";
                                readonly examples: readonly ["originvault.box", "content-authenticity", "user-reputation", "platform-governance"];
                            };
                            readonly schemaId: {
                                readonly type: "string";
                                readonly description: "Schema ID for which the issuer is accredited";
                                readonly examples: readonly ["did:cheqd:testnet:8ea036da-f340-480d-8952-f5561ea1763c/resources/b10146d7-0d0f-41e0-8ee3-c76db64890be", "https://schemas.originvault.box/ContentAuthenticityCredential"];
                            };
                            readonly types: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly description: "Credential types the issuer can issue";
                                readonly examples: readonly [readonly ["VerifiableCredential", "VerifiableAccreditation"], readonly ["VerifiableCredential", "ContentAuthenticityCredential"]];
                            };
                            readonly limitJurisdiction: {
                                readonly type: "string";
                                readonly description: "Geographic or regulatory restriction (optional)";
                                readonly examples: readonly ["https://publications.europa.eu/resource/authority/atu/FIN", "https://publications.europa.eu/resource/authority/atu/USA"];
                            };
                            readonly validUntil: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Expiration date of this specific accreditation";
                            };
                        };
                        readonly required: readonly ["namespaceId", "schemaId", "types"];
                    };
                    readonly description: "List of accreditations granted to this issuer";
                };
                readonly trustLevel: {
                    readonly type: "string";
                    readonly enum: readonly ["bronze", "silver", "gold", "platinum"];
                    readonly description: "Trust level assigned within this trust chain";
                };
                readonly blockchainResourceId: {
                    readonly type: "string";
                    readonly description: "DID-Linked Resource ID on blockchain (cheqd, ethereum, etc.)";
                };
            };
            readonly required: readonly ["id", "accreditedFor"];
        };
        readonly termsOfUse: {
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly const: "AccreditationPolicy";
                    readonly description: "Must be AccreditationPolicy per cheqd DTC spec";
                };
                readonly parentAccreditation: {
                    readonly type: "string";
                    readonly description: "DID URL of the parent accreditation in the trust chain (if not a root)";
                    readonly examples: readonly ["did:cheqd:mainnet:namespace-root/resources/18de60ec-bed1-42e5-980c-601c432bc60b", "did:ethr:platform-authority/resources/platform-root-authorization"];
                };
                readonly rootAuthorisation: {
                    readonly type: "string";
                    readonly description: "DID URL of the root authority for this trust chain";
                    readonly examples: readonly ["did:ov:namespace-root/resources/originvault-namespace-authorization", "did:cheqd:community-root/resources/community-governance-authorization", "did:ethr:platform-root/resources/platform-authority-authorization"];
                };
                readonly trustChainScope: {
                    readonly type: "string";
                    readonly description: "Scope or purpose of this trust chain";
                    readonly examples: readonly ["content-authenticity", "user-reputation", "platform-governance", "community-trust", "data-provenance"];
                };
                readonly governanceFramework: {
                    readonly type: "string";
                    readonly description: "Reference to governance policies for this trust chain";
                };
            };
            readonly required: readonly ["type", "rootAuthorisation", "trustChainScope"];
        };
        readonly proof: {
            readonly type: "object";
            readonly description: "Cryptographic proof of the accreditation";
        };
    };
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/TrustGate";
    readonly title: "Trust Gate";
    readonly description: "Defines access rules based on Gems and Verifiable Credentials.";
    readonly type: "object";
    readonly properties: {
        readonly resource: {
            readonly type: "string";
            readonly description: "The DID or URL of the resource being accessed.";
        };
        readonly requiredTrustLevel: {
            readonly type: "number";
            readonly minimum: 0;
            readonly description: "Minimum trust score required for access.";
        };
        readonly requiredGems: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of required Gems for access.";
        };
        readonly requiredCredentials: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of required Verifiable Credentials for access.";
        };
        readonly accessPolicy: {
            readonly type: "string";
            readonly enum: readonly ["public", "restricted", "private"];
            readonly description: "Whether access is open, trust-restricted, or fully private.";
        };
    };
    readonly required: readonly ["resource", "requiredTrustLevel", "requiredGems", "requiredCredentials", "accessPolicy"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/TrustScore";
    readonly title: "Trust Score";
    readonly description: "Represents a calculated trust score for a DID based on blockchain accreditations and local endorsements.";
    readonly type: "object";
    readonly properties: {
        readonly did: {
            readonly type: "string";
            readonly description: "DID of the entity being scored";
            readonly pattern: "^did:";
        };
        readonly score: {
            readonly type: "number";
            readonly minimum: 0;
            readonly maximum: 100;
            readonly description: "Overall trust score (0-100)";
        };
        readonly factors: {
            readonly type: "object";
            readonly properties: {
                readonly accreditations: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score contribution from blockchain accreditations";
                };
                readonly endorsements: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score contribution from local endorsements";
                };
                readonly timeWeighted: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score contribution from recent activity";
                };
                readonly networkEffects: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score contribution from network diversity";
                };
                readonly blockchainTrust: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Score contribution from blockchain-based trust indicators";
                };
            };
            readonly required: readonly ["accreditations", "endorsements", "timeWeighted", "networkEffects", "blockchainTrust"];
            readonly description: "Breakdown of trust score factors";
        };
        readonly lastCalculated: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "When the score was last calculated";
        };
        readonly decay: {
            readonly type: "number";
            readonly minimum: 0;
            readonly maximum: 1;
            readonly description: "Score decay factor (0 = no decay, 1 = full decay)";
        };
        readonly blockchainSync: {
            readonly type: "object";
            readonly properties: {
                readonly lastSynced: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Last time score was synced with blockchain";
                };
                readonly pendingChanges: {
                    readonly type: "boolean";
                    readonly description: "Whether there are local changes not yet pushed to blockchain";
                };
                readonly blockchainResourceId: {
                    readonly type: "string";
                    readonly description: "Resource ID on blockchain for this trust score";
                };
            };
            readonly description: "Blockchain synchronization status";
        };
        readonly metadata: {
            readonly type: "object";
            readonly description: "Additional metadata for the trust score";
        };
    };
    readonly required: readonly ["did", "score", "factors", "lastCalculated", "decay"];
} | {
    readonly $schema: "http://json-schema.org/draft-04/schema#";
    readonly allowTrailingCommas: true;
    readonly allOf: readonly [{
        readonly $ref: "#/definitions/compilerOptionsDefinition";
    }, {
        readonly $ref: "#/definitions/compileOnSaveDefinition";
    }, {
        readonly $ref: "#/definitions/typeAcquisitionDefinition";
    }, {
        readonly $ref: "#/definitions/extendsDefinition";
    }, {
        readonly $ref: "#/definitions/watchOptionsDefinition";
    }, {
        readonly $ref: "#/definitions/buildOptionsDefinition";
    }, {
        readonly $ref: "#/definitions/tsNodeDefinition";
    }, {
        readonly anyOf: readonly [{
            readonly $ref: "#/definitions/filesDefinition";
        }, {
            readonly $ref: "#/definitions/excludeDefinition";
        }, {
            readonly $ref: "#/definitions/includeDefinition";
        }, {
            readonly $ref: "#/definitions/referencesDefinition";
        }];
    }];
    readonly definitions: {
        readonly "//": {
            readonly explainer: "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#overview";
            readonly reference: "https://www.typescriptlang.org/tsconfig";
            readonly "reference metadata": "https://github.com/microsoft/TypeScript-Website/blob/v2/packages/tsconfig-reference/scripts/tsconfigRules.ts";
        };
        readonly filesDefinition: {
            readonly properties: {
                readonly files: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly description: "If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.";
                    readonly type: readonly ["array", "null"];
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: readonly ["string", "null"];
                    };
                };
            };
        };
        readonly excludeDefinition: {
            readonly properties: {
                readonly exclude: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly description: "Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.";
                    readonly type: readonly ["array", "null"];
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: readonly ["string", "null"];
                    };
                };
            };
        };
        readonly includeDefinition: {
            readonly properties: {
                readonly include: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly description: "Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.";
                    readonly type: readonly ["array", "null"];
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: readonly ["string", "null"];
                    };
                };
            };
        };
        readonly compileOnSaveDefinition: {
            readonly properties: {
                readonly compileOnSave: {
                    readonly description: "Enable Compile-on-Save for this project.";
                    readonly type: readonly ["boolean", "null"];
                };
            };
        };
        readonly extendsDefinition: {
            readonly properties: {
                readonly extends: {
                    readonly description: "Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).";
                    readonly oneOf: readonly [{
                        readonly default: "";
                        readonly type: "string";
                    }, {
                        readonly default: readonly [];
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly type: "array";
                    }];
                };
            };
        };
        readonly buildOptionsDefinition: {
            readonly properties: {
                readonly buildOptions: {
                    readonly properties: {
                        readonly dry: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "~";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                        };
                        readonly force: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Build all projects, including those that appear to be up to date";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Build all projects, including those that appear to be up to date\n\nSee more: https://www.typescriptlang.org/tsconfig#force";
                        };
                        readonly verbose: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable verbose logging";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable verbose logging\n\nSee more: https://www.typescriptlang.org/tsconfig#verbose";
                        };
                        readonly incremental: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Save .tsbuildinfo files to allow for incremental compilation of projects.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Save .tsbuildinfo files to allow for incremental compilation of projects.\n\nSee more: https://www.typescriptlang.org/tsconfig#incremental";
                        };
                        readonly assumeChangesOnlyAffectDirectDependencies: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.\n\nSee more: https://www.typescriptlang.org/tsconfig#assumeChangesOnlyAffectDirectDependencies";
                        };
                        readonly traceResolution: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Log paths used during the `moduleResolution` process.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Log paths used during the `moduleResolution` process.\n\nSee more: https://www.typescriptlang.org/tsconfig#traceResolution";
                        };
                    };
                };
            };
        };
        readonly watchOptionsDefinition: {
            readonly properties: {
                readonly watchOptions: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly type: readonly ["object", "null"];
                    readonly description: "Settings for the watch mode in TypeScript.";
                    readonly properties: {
                        readonly force: {
                            readonly description: "~";
                            readonly type: readonly ["string", "null"];
                        };
                        readonly watchFile: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify how the TypeScript watch mode works.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify how the TypeScript watch mode works.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchFile";
                        };
                        readonly watchDirectory: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify how directories are watched on systems that lack recursive file-watching functionality.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify how directories are watched on systems that lack recursive file-watching functionality.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchDirectory";
                        };
                        readonly fallbackPolling: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify what approach the watcher should use if the system runs out of native file watchers.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify what approach the watcher should use if the system runs out of native file watchers.\n\nSee more: https://www.typescriptlang.org/tsconfig#fallbackPolling";
                        };
                        readonly synchronousWatchDirectory: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.\n\nSee more: https://www.typescriptlang.org/tsconfig#synchronousWatchDirectory";
                        };
                        readonly excludeFiles: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Remove a list of files from the watch mode's processing.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Remove a list of files from the watch mode's processing.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeFiles";
                        };
                        readonly excludeDirectories: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Remove a list of directories from the watch process.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Remove a list of directories from the watch process.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeDirectories";
                        };
                    };
                };
            };
        };
        readonly compilerOptionsDefinition: {
            readonly properties: {
                readonly compilerOptions: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly type: readonly ["object", "null"];
                    readonly description: "Instructs the TypeScript compiler how to compile .ts files.";
                    readonly properties: {
                        readonly allowArbitraryExtensions: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable importing files with any extension, provided a declaration file is present.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Enable importing files with any extension, provided a declaration file is present.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowArbitraryExtensions";
                        };
                        readonly allowImportingTsExtensions: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions";
                        };
                        readonly charset: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "No longer supported. In early versions, manually set the text encoding for reading files.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "No longer supported. In early versions, manually set the text encoding for reading files.\n\nSee more: https://www.typescriptlang.org/tsconfig#charset";
                        };
                        readonly composite: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable constraints that allow a TypeScript project to be used with project references.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: true;
                            readonly markdownDescription: "Enable constraints that allow a TypeScript project to be used with project references.\n\nSee more: https://www.typescriptlang.org/tsconfig#composite";
                        };
                        readonly customConditions: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Conditions to set in addition to the resolver-specific defaults when resolving imports.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Conditions to set in addition to the resolver-specific defaults when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#customConditions";
                        };
                        readonly declaration: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Generate .d.ts files from TypeScript and JavaScript files in your project.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Generate .d.ts files from TypeScript and JavaScript files in your project.\n\nSee more: https://www.typescriptlang.org/tsconfig#declaration";
                        };
                        readonly declarationDir: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the output directory for generated declaration files.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the output directory for generated declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationDir";
                        };
                        readonly diagnostics: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Output compiler performance information after building.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Output compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#diagnostics";
                        };
                        readonly disableReferencedProjectLoad: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Reduce the number of projects loaded automatically by TypeScript.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Reduce the number of projects loaded automatically by TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableReferencedProjectLoad";
                        };
                        readonly noPropertyAccessFromIndexSignature: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enforces using indexed accessors for keys declared using an indexed type";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Enforces using indexed accessors for keys declared using an indexed type\n\nSee more: https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature";
                        };
                        readonly emitBOM: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitBOM";
                        };
                        readonly emitDeclarationOnly: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Only output d.ts files and not JavaScript files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Only output d.ts files and not JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDeclarationOnly";
                        };
                        readonly erasableSyntaxOnly: {
                            readonly description: "Do not allow runtime constructs that are not part of ECMAScript.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Do not allow runtime constructs that are not part of ECMAScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly";
                        };
                        readonly exactOptionalPropertyTypes: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Differentiate between undefined and not present when type checking";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Differentiate between undefined and not present when type checking\n\nSee more: https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes";
                        };
                        readonly incremental: {
                            readonly description: "Enable incremental compilation. Requires TypeScript version 3.4 or later.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly tsBuildInfoFile: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the folder for .tsbuildinfo incremental compilation files.";
                            readonly default: ".tsbuildinfo";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the folder for .tsbuildinfo incremental compilation files.\n\nSee more: https://www.typescriptlang.org/tsconfig#tsBuildInfoFile";
                        };
                        readonly inlineSourceMap: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Include sourcemap files inside the emitted JavaScript.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Include sourcemap files inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSourceMap";
                        };
                        readonly inlineSources: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Include source code in the sourcemaps inside the emitted JavaScript.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Include source code in the sourcemaps inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSources";
                        };
                        readonly jsx: {
                            readonly description: "Specify what JSX code is generated.";
                            readonly enum: readonly ["preserve", "react", "react-jsx", "react-jsxdev", "react-native"];
                        };
                        readonly reactNamespace: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "React";
                            readonly markdownDescription: "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.\n\nSee more: https://www.typescriptlang.org/tsconfig#reactNamespace";
                        };
                        readonly jsxFactory: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'";
                            readonly type: readonly ["string", "null"];
                            readonly default: "React.createElement";
                            readonly markdownDescription: "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFactory";
                        };
                        readonly jsxFragmentFactory: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "React.Fragment";
                            readonly markdownDescription: "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFragmentFactory";
                        };
                        readonly jsxImportSource: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "react";
                            readonly markdownDescription: "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxImportSource";
                        };
                        readonly listFiles: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Print all of the files read during the compilation.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Print all of the files read during the compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listFiles";
                        };
                        readonly mapRoot: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the location where debugger should locate map files instead of generated locations.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the location where debugger should locate map files instead of generated locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#mapRoot";
                        };
                        readonly module: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify what module code is generated.";
                            readonly type: readonly ["string", "null"];
                            readonly anyOf: readonly [{
                                readonly enum: readonly ["CommonJS", "AMD", "System", "UMD", "ES6", "ES2015", "ES2020", "ESNext", "None", "ES2022", "Node16", "Node18", "NodeNext", "Preserve"];
                            }, {
                                readonly pattern: "^([Cc][Oo][Mm][Mm][Oo][Nn][Jj][Ss]|[AaUu][Mm][Dd]|[Ss][Yy][Ss][Tt][Ee][Mm]|[Ee][Ss]([356]|20(1[567]|2[02])|[Nn][Ee][Xx][Tt])|[Nn][Oo][dD][Ee]1[68]|[Nn][Oo][Dd][Ee][Nn][Ee][Xx][Tt]|[Nn][Oo][Nn][Ee]|[Pp][Rr][Ee][Ss][Ee][Rr][Vv][Ee])$";
                            }];
                            readonly markdownDescription: "Specify what module code is generated.\n\nSee more: https://www.typescriptlang.org/tsconfig#module";
                        };
                        readonly moduleResolution: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify how TypeScript looks up a file from a given module specifier.";
                            readonly type: readonly ["string", "null"];
                            readonly anyOf: readonly [{
                                readonly enum: readonly ["classic", "node", "node10", "node16", "nodenext", "bundler"];
                                readonly markdownEnumDescriptions: readonly ["It’s recommended to use `\"node16\"` instead", "Deprecated, use `\"node10\"` in TypeScript 5.0+ instead", "It’s recommended to use `\"node16\"` instead", "This is the recommended setting for libraries and Node.js applications", "This is the recommended setting for libraries and Node.js applications", "This is the recommended setting in TypeScript 5.0+ for applications that use a bundler"];
                            }, {
                                readonly pattern: "^(([Nn]ode)|([Nn]ode1[06])|([Nn]ode[Nn]ext)|([Cc]lassic)|([Bb]undler))$";
                            }];
                            readonly markdownDescription: "Specify how TypeScript looks up a file from a given module specifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#moduleResolution";
                        };
                        readonly newLine: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Set the newline character for emitting files.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "lf";
                            readonly anyOf: readonly [{
                                readonly enum: readonly ["crlf", "lf"];
                            }, {
                                readonly pattern: "^(CRLF|LF|crlf|lf)$";
                            }];
                            readonly markdownDescription: "Set the newline character for emitting files.\n\nSee more: https://www.typescriptlang.org/tsconfig#newLine";
                        };
                        readonly noEmit: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable emitting file from a compilation.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable emitting file from a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmit";
                        };
                        readonly noEmitHelpers: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable generating custom helper functions like `__extends` in compiled output.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable generating custom helper functions like `__extends` in compiled output.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitHelpers";
                        };
                        readonly noEmitOnError: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable emitting files if any type checking errors are reported.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable emitting files if any type checking errors are reported.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitOnError";
                        };
                        readonly noImplicitAny: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting for expressions and declarations with an implied `any` type..";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Enable error reporting for expressions and declarations with an implied `any` type..\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitAny";
                        };
                        readonly noImplicitThis: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting when `this` is given the type `any`.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Enable error reporting when `this` is given the type `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitThis";
                        };
                        readonly noUnusedLocals: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting when a local variable isn't read.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable error reporting when a local variable isn't read.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedLocals";
                        };
                        readonly noUnusedParameters: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Raise an error when a function parameter isn't read";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Raise an error when a function parameter isn't read\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedParameters";
                        };
                        readonly noLib: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable including any library files, including the default lib.d.ts.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable including any library files, including the default lib.d.ts.\n\nSee more: https://www.typescriptlang.org/tsconfig#noLib";
                        };
                        readonly noResolve: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.\n\nSee more: https://www.typescriptlang.org/tsconfig#noResolve";
                        };
                        readonly noStrictGenericChecks: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable strict checking of generic signatures in function types.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable strict checking of generic signatures in function types.\n\nSee more: https://www.typescriptlang.org/tsconfig#noStrictGenericChecks";
                        };
                        readonly skipDefaultLibCheck: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Skip type checking .d.ts files that are included with TypeScript.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Skip type checking .d.ts files that are included with TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipDefaultLibCheck";
                        };
                        readonly skipLibCheck: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Skip type checking all .d.ts files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Skip type checking all .d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipLibCheck";
                        };
                        readonly outFile: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.\n\nSee more: https://www.typescriptlang.org/tsconfig#outFile";
                        };
                        readonly outDir: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify an output folder for all emitted files.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify an output folder for all emitted files.\n\nSee more: https://www.typescriptlang.org/tsconfig#outDir";
                        };
                        readonly preserveConstEnums: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable erasing `const enum` declarations in generated code.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable erasing `const enum` declarations in generated code.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveConstEnums";
                        };
                        readonly preserveSymlinks: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable resolving symlinks to their realpath. This correlates to the same flag in node.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable resolving symlinks to their realpath. This correlates to the same flag in node.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveSymlinks";
                        };
                        readonly preserveValueImports: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Preserve unused imported values in the JavaScript output that would otherwise be removed";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Preserve unused imported values in the JavaScript output that would otherwise be removed\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveValueImports";
                        };
                        readonly preserveWatchOutput: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable wiping the console in watch mode";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Disable wiping the console in watch mode\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveWatchOutput";
                        };
                        readonly pretty: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable color and formatting in output to make compiler errors easier to read";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: true;
                            readonly markdownDescription: "Enable color and formatting in output to make compiler errors easier to read\n\nSee more: https://www.typescriptlang.org/tsconfig#pretty";
                        };
                        readonly removeComments: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable emitting comments.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable emitting comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#removeComments";
                        };
                        readonly rewriteRelativeImportExtensions: {
                            readonly description: "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rewriteRelativeImportExtensions";
                        };
                        readonly rootDir: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the root folder within your source files.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the root folder within your source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDir";
                        };
                        readonly isolatedModules: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Ensure that each file can be safely transpiled without relying on other imports.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Ensure that each file can be safely transpiled without relying on other imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedModules";
                        };
                        readonly sourceMap: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Create source map files for emitted JavaScript files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Create source map files for emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceMap";
                        };
                        readonly sourceRoot: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the root path for debuggers to find the reference source code.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the root path for debuggers to find the reference source code.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceRoot";
                        };
                        readonly suppressExcessPropertyErrors: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable reporting of excess property errors during the creation of object literals.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable reporting of excess property errors during the creation of object literals.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressExcessPropertyErrors";
                        };
                        readonly suppressImplicitAnyIndexErrors: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors";
                        };
                        readonly stripInternal: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable emitting declarations that have `@internal` in their JSDoc comments.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Disable emitting declarations that have `@internal` in their JSDoc comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#stripInternal";
                        };
                        readonly target: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "ES3";
                            readonly anyOf: readonly [{
                                readonly enum: readonly ["ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ES2023", "ES2024", "ESNext"];
                            }, {
                                readonly pattern: "^([Ee][Ss]([356]|(20(1[56789]|2[01234]))|[Nn][Ee][Xx][Tt]))$";
                            }];
                            readonly markdownDescription: "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.\n\nSee more: https://www.typescriptlang.org/tsconfig#target";
                        };
                        readonly useUnknownInCatchVariables: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Default catch clause variables as `unknown` instead of `any`.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Default catch clause variables as `unknown` instead of `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables";
                        };
                        readonly watch: {
                            readonly description: "Watch input files.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly fallbackPolling: {
                            readonly description: "Specify the polling strategy to use when the system runs out of or doesn't support native file watchers. Requires TypeScript version 3.8 or later.";
                            readonly enum: readonly ["fixedPollingInterval", "priorityPollingInterval", "dynamicPriorityPolling", "fixedInterval", "priorityInterval", "dynamicPriority", "fixedChunkSize"];
                        };
                        readonly watchDirectory: {
                            readonly description: "Specify the strategy for watching directories under systems that lack recursive file-watching functionality. Requires TypeScript version 3.8 or later.";
                            readonly enum: readonly ["useFsEvents", "fixedPollingInterval", "dynamicPriorityPolling", "fixedChunkSizePolling"];
                            readonly default: "useFsEvents";
                        };
                        readonly watchFile: {
                            readonly description: "Specify the strategy for watching individual files. Requires TypeScript version 3.8 or later.";
                            readonly enum: readonly ["fixedPollingInterval", "priorityPollingInterval", "dynamicPriorityPolling", "useFsEvents", "useFsEventsOnParentDirectory", "fixedChunkSizePolling"];
                            readonly default: "useFsEvents";
                        };
                        readonly experimentalDecorators: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable experimental support for TC39 stage 2 draft decorators.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Enable experimental support for TC39 stage 2 draft decorators.\n\nSee more: https://www.typescriptlang.org/tsconfig#experimentalDecorators";
                        };
                        readonly emitDecoratorMetadata: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit design-type metadata for decorated declarations in source files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Emit design-type metadata for decorated declarations in source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata";
                        };
                        readonly allowUnusedLabels: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable error reporting for unused labels.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Disable error reporting for unused labels.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnusedLabels";
                        };
                        readonly noImplicitReturns: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting for codepaths that do not explicitly return in a function.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable error reporting for codepaths that do not explicitly return in a function.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitReturns";
                        };
                        readonly noUncheckedIndexedAccess: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Add `undefined` to a type when accessed using an index.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Add `undefined` to a type when accessed using an index.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess";
                        };
                        readonly noFallthroughCasesInSwitch: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting for fallthrough cases in switch statements.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable error reporting for fallthrough cases in switch statements.\n\nSee more: https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch";
                        };
                        readonly noImplicitOverride: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Ensure overriding members in derived classes are marked with an override modifier.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Ensure overriding members in derived classes are marked with an override modifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitOverride";
                        };
                        readonly allowUnreachableCode: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable error reporting for unreachable code.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Disable error reporting for unreachable code.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnreachableCode";
                        };
                        readonly forceConsistentCasingInFileNames: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Ensure that casing is correct in imports.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: true;
                            readonly markdownDescription: "Ensure that casing is correct in imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames";
                        };
                        readonly generateCpuProfile: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit a v8 CPU profile of the compiler run for debugging.";
                            readonly type: readonly ["string", "null"];
                            readonly default: "profile.cpuprofile";
                            readonly markdownDescription: "Emit a v8 CPU profile of the compiler run for debugging.\n\nSee more: https://www.typescriptlang.org/tsconfig#generateCpuProfile";
                        };
                        readonly baseUrl: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the base directory to resolve non-relative module names.";
                            readonly type: readonly ["string", "null"];
                            readonly markdownDescription: "Specify the base directory to resolve non-relative module names.\n\nSee more: https://www.typescriptlang.org/tsconfig#baseUrl";
                        };
                        readonly paths: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify a set of entries that re-map imports to additional lookup locations.";
                            readonly type: readonly ["object", "null"];
                            readonly additionalProperties: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly type: readonly ["array", "null"];
                                readonly uniqueItems: true;
                                readonly items: {
                                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                    readonly type: readonly ["string", "null"];
                                    readonly description: "Path mapping to be computed relative to baseUrl option.";
                                };
                            };
                            readonly markdownDescription: "Specify a set of entries that re-map imports to additional lookup locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#paths";
                        };
                        readonly plugins: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify a list of language service plugins to include.";
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly type: readonly ["object", "null"];
                                readonly properties: {
                                    readonly name: {
                                        readonly description: "Plugin name.";
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                            };
                            readonly markdownDescription: "Specify a list of language service plugins to include.\n\nSee more: https://www.typescriptlang.org/tsconfig#plugins";
                        };
                        readonly rootDirs: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow multiple folders to be treated as one when resolving modules.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Allow multiple folders to be treated as one when resolving modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDirs";
                        };
                        readonly typeRoots: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify multiple folders that act like `./node_modules/@types`.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Specify multiple folders that act like `./node_modules/@types`.\n\nSee more: https://www.typescriptlang.org/tsconfig#typeRoots";
                        };
                        readonly types: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify type package names to be included without being referenced in a source file.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly markdownDescription: "Specify type package names to be included without being referenced in a source file.\n\nSee more: https://www.typescriptlang.org/tsconfig#types";
                        };
                        readonly traceResolution: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable tracing of the name resolution process. Requires TypeScript version 2.0 or later.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                        };
                        readonly allowJs: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowJs";
                        };
                        readonly noErrorTruncation: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable truncating types in error messages.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable truncating types in error messages.\n\nSee more: https://www.typescriptlang.org/tsconfig#noErrorTruncation";
                        };
                        readonly allowSyntheticDefaultImports: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow 'import x from y' when a module doesn't have a default export.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Allow 'import x from y' when a module doesn't have a default export.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports";
                        };
                        readonly noImplicitUseStrict: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable adding 'use strict' directives in emitted JavaScript files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable adding 'use strict' directives in emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitUseStrict";
                        };
                        readonly listEmittedFiles: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Print the names of emitted files after a compilation.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Print the names of emitted files after a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listEmittedFiles";
                        };
                        readonly disableSizeLimit: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSizeLimit";
                        };
                        readonly lib: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify a set of bundled library declaration files that describe the target runtime environment.";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly type: readonly ["string", "null"];
                                readonly anyOf: readonly [{
                                    readonly enum: readonly ["ES5", "ES6", "ES2015", "ES2015.Collection", "ES2015.Core", "ES2015.Generator", "ES2015.Iterable", "ES2015.Promise", "ES2015.Proxy", "ES2015.Reflect", "ES2015.Symbol.WellKnown", "ES2015.Symbol", "ES2016", "ES2016.Array.Include", "ES2017", "ES2017.Intl", "ES2017.Object", "ES2017.SharedMemory", "ES2017.String", "ES2017.TypedArrays", "ES2017.ArrayBuffer", "ES2018", "ES2018.AsyncGenerator", "ES2018.AsyncIterable", "ES2018.Intl", "ES2018.Promise", "ES2018.Regexp", "ES2019", "ES2019.Array", "ES2019.Intl", "ES2019.Object", "ES2019.String", "ES2019.Symbol", "ES2020", "ES2020.BigInt", "ES2020.Promise", "ES2020.String", "ES2020.Symbol.WellKnown", "ESNext", "ESNext.Array", "ESNext.AsyncIterable", "ESNext.BigInt", "ESNext.Collection", "ESNext.Intl", "ESNext.Object", "ESNext.Promise", "ESNext.Regexp", "ESNext.String", "ESNext.Symbol", "DOM", "DOM.AsyncIterable", "DOM.Iterable", "ScriptHost", "WebWorker", "WebWorker.AsyncIterable", "WebWorker.ImportScripts", "Webworker.Iterable", "ES7", "ES2021", "ES2020.SharedMemory", "ES2020.Intl", "ES2020.Date", "ES2020.Number", "ES2021.Promise", "ES2021.String", "ES2021.WeakRef", "ESNext.WeakRef", "ES2021.Intl", "ES2022", "ES2022.Array", "ES2022.Error", "ES2022.Intl", "ES2022.Object", "ES2022.String", "ES2022.SharedMemory", "ES2022.RegExp", "ES2023", "ES2023.Array", "ES2024", "ES2024.ArrayBuffer", "ES2024.Collection", "ES2024.Object", "ES2024.Promise", "ES2024.Regexp", "ES2024.SharedMemory", "ES2024.String", "Decorators", "Decorators.Legacy", "ES2017.Date", "ES2023.Collection", "ESNext.Decorators", "ESNext.Disposable"];
                                }, {
                                    readonly pattern: "^[Ee][Ss]5|[Ee][Ss]6|[Ee][Ss]7$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2015(\\.([Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Oo][Rr][Ee]|[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Pp][Rr][Oo][Xx][Yy]|[Rr][Ee][Ff][Ll][Ee][Cc][Tt]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2016(\\.[Aa][Rr][Rr][Aa][Yy]\\.[Ii][Nn][Cc][Ll][Uu][Dd][Ee])?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2017(\\.([Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Tt][Yy][Pp][Ee][Dd][Aa][Rr][Rr][Aa][Yy][Ss]|[Dd][Aa][Tt][Ee]|[Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2018(\\.([Aa][Ss][Yy][Nn][Cc][Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2019(\\.([Aa][Rr][Rr][Aa][Yy]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2020(\\.([Bb][Ii][Gg][Ii][Nn][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ii][Nn][Tt][Ll]|[Dd][Aa][Tt][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2021(\\.([Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2022(\\.([Aa][Rr][Rr][Aa][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2023(\\.([Aa][Rr][Rr][Aa][Yy]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss]2024(\\.([Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]))?$";
                                }, {
                                    readonly pattern: "^[Ee][Ss][Nn][Ee][Xx][Tt](\\.([Aa][Rr][Rr][Aa][Yy]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Bb][Ii][Gg][Ii][Nn][Tt]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]|[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss]|[Dd][Ii][Ss][Pp][Oo][Ss][Aa][Bb][Ll][Ee]))?$";
                                }, {
                                    readonly pattern: "^[Dd][Oo][Mm](\\.([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee])?$";
                                }, {
                                    readonly pattern: "^[Ss][Cc][Rr][Ii][Pp][Tt][Hh][Oo][Ss][Tt]$";
                                }, {
                                    readonly pattern: "^[Ww][Ee][Bb][Ww][Oo][Rr][Kk][Ee][Rr](\\.([Ii][Mm][Pp][Oo][Rr][Tt][Ss][Cc][Rr][Ii][Pp][Tt][Ss]|([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]))?$";
                                }, {
                                    readonly pattern: "^[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss](\\.([Ll][Ee][Gg][Aa][Cc][Yy]))?$";
                                }];
                            };
                            readonly markdownDescription: "Specify a set of bundled library declaration files that describe the target runtime environment.\n\nSee more: https://www.typescriptlang.org/tsconfig#lib";
                        };
                        readonly libReplacement: {
                            readonly description: "Enable lib replacement.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: true;
                            readonly markdownDescription: "Enable lib replacement.\n\nSee more: https://www.typescriptlang.org/tsconfig#libReplacement";
                        };
                        readonly moduleDetection: {
                            readonly description: "Specify how TypeScript determine a file as module.";
                            readonly enum: readonly ["auto", "legacy", "force"];
                        };
                        readonly strictNullChecks: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "When type checking, take into account `null` and `undefined`.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "When type checking, take into account `null` and `undefined`.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictNullChecks";
                        };
                        readonly maxNodeModuleJsDepth: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.";
                            readonly type: readonly ["number", "null"];
                            readonly default: 0;
                            readonly markdownDescription: "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.\n\nSee more: https://www.typescriptlang.org/tsconfig#maxNodeModuleJsDepth";
                        };
                        readonly importHelpers: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow importing helper functions from tslib once per project, instead of including them per-file.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Allow importing helper functions from tslib once per project, instead of including them per-file.\n\nSee more: https://www.typescriptlang.org/tsconfig#importHelpers";
                        };
                        readonly importsNotUsedAsValues: {
                            readonly description: "Specify emit/checking behavior for imports that are only used for types.";
                            readonly default: "remove";
                            readonly enum: readonly ["remove", "preserve", "error"];
                        };
                        readonly alwaysStrict: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Ensure 'use strict' is always emitted.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Ensure 'use strict' is always emitted.\n\nSee more: https://www.typescriptlang.org/tsconfig#alwaysStrict";
                        };
                        readonly strict: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable all strict type checking options.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable all strict type checking options.\n\nSee more: https://www.typescriptlang.org/tsconfig#strict";
                        };
                        readonly strictBindCallApply: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBindCallApply";
                        };
                        readonly downlevelIteration: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit more compliant, but verbose and less performant JavaScript for iteration.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Emit more compliant, but verbose and less performant JavaScript for iteration.\n\nSee more: https://www.typescriptlang.org/tsconfig#downlevelIteration";
                        };
                        readonly checkJs: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable error reporting in type-checked JavaScript files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable error reporting in type-checked JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#checkJs";
                        };
                        readonly strictFunctionTypes: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "When assigning functions, check to ensure parameters and the return values are subtype-compatible.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "When assigning functions, check to ensure parameters and the return values are subtype-compatible.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictFunctionTypes";
                        };
                        readonly strictPropertyInitialization: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Check for class properties that are declared but not set in the constructor.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Check for class properties that are declared but not set in the constructor.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictPropertyInitialization";
                        };
                        readonly esModuleInterop: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.\n\nSee more: https://www.typescriptlang.org/tsconfig#esModuleInterop";
                        };
                        readonly allowUmdGlobalAccess: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Allow accessing UMD globals from modules.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Allow accessing UMD globals from modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUmdGlobalAccess";
                        };
                        readonly keyofStringsOnly: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Make keyof only return strings instead of string, numbers or symbols. Legacy option.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Make keyof only return strings instead of string, numbers or symbols. Legacy option.\n\nSee more: https://www.typescriptlang.org/tsconfig#keyofStringsOnly";
                        };
                        readonly useDefineForClassFields: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Emit ECMAScript-standard-compliant class fields.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Emit ECMAScript-standard-compliant class fields.\n\nSee more: https://www.typescriptlang.org/tsconfig#useDefineForClassFields";
                        };
                        readonly declarationMap: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Create sourcemaps for d.ts files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Create sourcemaps for d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationMap";
                        };
                        readonly resolveJsonModule: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable importing .json files";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Enable importing .json files\n\nSee more: https://www.typescriptlang.org/tsconfig#resolveJsonModule";
                        };
                        readonly resolvePackageJsonExports: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Use the package.json 'exports' field when resolving package imports.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Use the package.json 'exports' field when resolving package imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonExports";
                        };
                        readonly resolvePackageJsonImports: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Use the package.json 'imports' field when resolving imports.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Use the package.json 'imports' field when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonImports";
                        };
                        readonly assumeChangesOnlyAffectDirectDependencies: {
                            readonly description: "Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it. Requires TypeScript version 3.8 or later.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly extendedDiagnostics: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Output more detailed compiler performance information after building.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Output more detailed compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#extendedDiagnostics";
                        };
                        readonly listFilesOnly: {
                            readonly description: "Print names of files that are part of the compilation and then stop processing.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly disableSourceOfProjectReferenceRedirect: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable preferring source files instead of declaration files when referencing composite projects";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Disable preferring source files instead of declaration files when referencing composite projects\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSourceOfProjectReferenceRedirect";
                        };
                        readonly disableSolutionSearching: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Opt a project out of multi-project reference checking when editing.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Opt a project out of multi-project reference checking when editing.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSolutionSearching";
                        };
                        readonly verbatimModuleSyntax: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.";
                            readonly type: readonly ["boolean", "null"];
                            readonly markdownDescription: "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.\n\nSee more: https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax";
                        };
                        readonly noCheck: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Disable full type checking (only critical parse and emit errors will be reported)";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Disable full type checking (only critical parse and emit errors will be reported)\n\nSee more: https://www.typescriptlang.org/tsconfig#noCheck";
                        };
                        readonly isolatedDeclarations: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Require sufficient annotation on exports so other tools can trivially generate declaration files.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Require sufficient annotation on exports so other tools can trivially generate declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedDeclarations";
                        };
                        readonly noUncheckedSideEffectImports: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Check side effect imports.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Check side effect imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports";
                        };
                        readonly strictBuiltinIteratorReturn: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                            readonly markdownDescription: "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBuiltinIteratorReturn";
                        };
                    };
                };
            };
        };
        readonly typeAcquisitionDefinition: {
            readonly properties: {
                readonly typeAcquisition: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly type: readonly ["object", "null"];
                    readonly description: "Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.";
                    readonly properties: {
                        readonly enable: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Enable auto type acquisition";
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                        };
                        readonly include: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specifies a list of type declarations to be included in auto type acquisition. Ex. [\"jquery\", \"lodash\"]";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly exclude: {
                            readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                            readonly description: "Specifies a list of type declarations to be excluded from auto type acquisition. Ex. [\"jquery\", \"lodash\"]";
                            readonly type: readonly ["array", "null"];
                            readonly uniqueItems: true;
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                    };
                };
            };
        };
        readonly referencesDefinition: {
            readonly properties: {
                readonly references: {
                    readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                    readonly type: readonly ["array", "null"];
                    readonly uniqueItems: true;
                    readonly description: "Referenced projects. Requires TypeScript version 3.0 or later.";
                    readonly items: {
                        readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                        readonly type: readonly ["object", "null"];
                        readonly description: "Project reference.";
                        readonly properties: {
                            readonly path: {
                                readonly $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).";
                                readonly type: readonly ["string", "null"];
                                readonly description: "Path to referenced tsconfig or to folder containing tsconfig.";
                            };
                        };
                    };
                };
            };
        };
        readonly tsNodeModuleTypes: {
            readonly type: readonly ["object", "null"];
        };
        readonly tsNodeDefinition: {
            readonly properties: {
                readonly "ts-node": {
                    readonly description: "ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration\n\nts-node offers TypeScript execution and REPL for node.js, with source map support.";
                    readonly properties: {
                        readonly compiler: {
                            readonly default: "typescript";
                            readonly description: "Specify a custom TypeScript compiler.";
                            readonly type: readonly ["string", "null"];
                        };
                        readonly compilerHost: {
                            readonly default: false;
                            readonly description: "Use TypeScript's compiler host API instead of the language service API.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly compilerOptions: {
                            readonly additionalProperties: true;
                            readonly allOf: readonly [{
                                readonly $ref: "#/definitions/compilerOptionsDefinition/properties/compilerOptions";
                            }];
                            readonly description: "JSON object to merge with TypeScript `compilerOptions`.";
                            readonly properties: {};
                            readonly type: readonly ["object", "null"];
                        };
                        readonly emit: {
                            readonly default: false;
                            readonly description: "Emit output files into `.ts-node` directory.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly esm: {
                            readonly description: "Enable native ESM support.\n\nFor details, see https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly experimentalReplAwait: {
                            readonly description: "Allows the usage of top level await in REPL.\n\nUses node's implementation which accomplishes this with an AST syntax transformation.\n\nEnabled by default when tsconfig target is es2018 or above. Set to false to disable.\n\n**Note**: setting to `true` when tsconfig target is too low will throw an Error.  Leave as `undefined`\nto get default, automatic behavior.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly experimentalResolver: {
                            readonly description: "Enable experimental features that re-map imports and require calls to support:\n`baseUrl`, `paths`, `rootDirs`, `.js` to `.ts` file extension mappings,\n`outDir` to `rootDir` mappings for composite projects and monorepos.\n\nFor details, see https://github.com/TypeStrong/ts-node/issues/1514";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly experimentalSpecifierResolution: {
                            readonly description: "Like node's `--experimental-specifier-resolution`, , but can also be set in your `tsconfig.json` for convenience.\n\nFor details, see https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm";
                            readonly enum: readonly ["explicit", "node"];
                            readonly type: readonly ["string", "null"];
                        };
                        readonly files: {
                            readonly default: false;
                            readonly description: "Load \"files\" and \"include\" from `tsconfig.json` on startup.\n\nDefault is to override `tsconfig.json` \"files\" and \"include\" to only include the entrypoint script.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly ignore: {
                            readonly default: readonly ["(?:^|/)node_modules/"];
                            readonly description: "Paths which should not be compiled.\n\nEach string in the array is converted to a regular expression via `new RegExp()` and tested against source paths prior to compilation.\n\nSource paths are normalized to posix-style separators, relative to the directory containing `tsconfig.json` or to cwd if no `tsconfig.json` is loaded.\n\nDefault is to ignore all node_modules subdirectories.";
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly type: readonly ["array", "null"];
                        };
                        readonly ignoreDiagnostics: {
                            readonly description: "Ignore TypeScript warnings by diagnostic code.";
                            readonly items: {
                                readonly type: readonly ["string", "number"];
                            };
                            readonly type: readonly ["array", "null"];
                        };
                        readonly logError: {
                            readonly default: false;
                            readonly description: "Logs TypeScript errors to stderr instead of throwing exceptions.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly moduleTypes: {
                            readonly $ref: "#/definitions/tsNodeModuleTypes";
                            readonly description: "Override certain paths to be compiled and executed as CommonJS or ECMAScript modules.\nWhen overridden, the tsconfig \"module\" and package.json \"type\" fields are overridden, and\nthe file extension is ignored.\nThis is useful if you cannot use .mts, .cts, .mjs, or .cjs file extensions;\nit achieves the same effect.\n\nEach key is a glob pattern following the same rules as tsconfig's \"include\" array.\nWhen multiple patterns match the same file, the last pattern takes precedence.\n\n`cjs` overrides matches files to compile and execute as CommonJS.\n`esm` overrides matches files to compile and execute as native ECMAScript modules.\n`package` overrides either of the above to default behavior, which obeys package.json \"type\" and\ntsconfig.json \"module\" options.";
                        };
                        readonly preferTsExts: {
                            readonly default: false;
                            readonly description: "Re-order file extensions so that TypeScript imports are preferred.\n\nFor example, when both `index.js` and `index.ts` exist, enabling this option causes `require('./index')` to resolve to `index.ts` instead of `index.js`";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly pretty: {
                            readonly default: false;
                            readonly description: "Use pretty diagnostic formatter.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly require: {
                            readonly description: "Modules to require, like node's `--require` flag.\n\nIf specified in `tsconfig.json`, the modules will be resolved relative to the `tsconfig.json` file.\n\nIf specified programmatically, each input string should be pre-resolved to an absolute path for\nbest results.";
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly type: readonly ["array", "null"];
                        };
                        readonly scope: {
                            readonly default: false;
                            readonly description: "Scope compiler to files within `scopeDir`.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly scopeDir: {
                            readonly default: "First of: `tsconfig.json` \"rootDir\" if specified, directory containing `tsconfig.json`, or cwd if no `tsconfig.json` is loaded.";
                            readonly type: readonly ["string", "null"];
                        };
                        readonly skipIgnore: {
                            readonly default: false;
                            readonly description: "Skip ignore check, so that compilation will be attempted for all files with matching extensions.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly swc: {
                            readonly description: "Transpile with swc instead of the TypeScript compiler, and skip typechecking.\n\nEquivalent to setting both `transpileOnly: true` and `transpiler: 'ts-node/transpilers/swc'`\n\nFor complete instructions: https://typestrong.org/ts-node/docs/transpilers";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly transpileOnly: {
                            readonly default: false;
                            readonly description: "Use TypeScript's faster `transpileModule`.";
                            readonly type: readonly ["boolean", "null"];
                        };
                        readonly transpiler: {
                            readonly anyOf: readonly [{
                                readonly items: readonly [{
                                    readonly type: readonly ["string", "null"];
                                }, {
                                    readonly additionalProperties: true;
                                    readonly properties: {};
                                    readonly type: readonly ["object", "null"];
                                }];
                                readonly maxItems: 2;
                                readonly minItems: 2;
                                readonly type: readonly ["array", "null"];
                            }, {
                                readonly type: readonly ["string", "null"];
                            }];
                            readonly description: "Specify a custom transpiler for use with transpileOnly";
                        };
                        readonly typeCheck: {
                            readonly default: true;
                            readonly description: "**DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).";
                            readonly type: readonly ["boolean", "null"];
                        };
                    };
                    readonly type: readonly ["object", "null"];
                };
            };
        };
    };
    readonly id: "https://json.schemastore.org/tsconfig";
    readonly title: "JSON schema for the TypeScript compiler's configuration file";
    readonly type: "object";
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultAdminAgreement";
    readonly title: "Vault Administrator Agreement";
    readonly description: "Defines the responsibilities and permissions of a Vault administrator.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly enum: readonly ["License", "CreativeWork"];
            readonly description: "Schema.org type";
        };
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly vaultId: {
            readonly type: "string";
            readonly description: "DID of the Vault.";
        };
        readonly adminId: {
            readonly type: "string";
            readonly description: "DID of the administrator.";
        };
        readonly permissions: {
            readonly type: "object";
            readonly properties: {
                readonly manageTags: {
                    readonly type: "boolean";
                    readonly description: "Can the admin control tagging policies?";
                };
                readonly approvePlugins: {
                    readonly type: "boolean";
                    readonly description: "Can the admin approve plugin installations?";
                };
                readonly controlAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the admin manage user access?";
                };
            };
        };
        readonly governanceRules: {
            readonly type: "string";
            readonly description: "Link to the governance framework this admin follows.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Under what conditions an admin's privileges can be revoked.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the admin has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "vaultId", "adminId", "permissions", "governanceRules", "revocationPolicy", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultChamberGovernance";
    readonly title: "Vault Chamber Governance";
    readonly description: "Defines governance processes for a Governance Chamber, including proposals and voting.";
    readonly type: "object";
    readonly properties: {
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Governance Chamber.";
        };
        readonly governanceType: {
            readonly type: "string";
            readonly enum: readonly ["vote", "multi-sig", "admin"];
            readonly description: "How governance decisions are made.";
        };
        readonly allowedParticipants: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of DIDs allowed to participate in governance.";
        };
        readonly proposalProcess: {
            readonly type: "object";
            readonly properties: {
                readonly minTrustScore: {
                    readonly type: "number";
                    readonly description: "Minimum trust score to submit proposals.";
                };
                readonly proposalApproval: {
                    readonly type: "string";
                    readonly enum: readonly ["simple-majority", "supermajority", "consensus"];
                    readonly description: "Approval threshold.";
                };
            };
        };
        readonly votingProcess: {
            readonly type: "object";
            readonly properties: {
                readonly votingPeriod: {
                    readonly type: "string";
                    readonly description: "Duration of voting.";
                };
                readonly requiredParticipation: {
                    readonly type: "number";
                    readonly description: "Minimum % of eligible voters to pass.";
                };
            };
        };
    };
    readonly required: readonly ["chamberId", "governanceType", "allowedParticipants", "proposalProcess", "votingProcess"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultChamberPlugin";
    readonly title: "Vault Chamber Plugin";
    readonly description: "Tracks plugins installed within a Vault Chamber and their permissions.";
    readonly type: "object";
    readonly properties: {
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Vault Chamber.";
        };
        readonly pluginId: {
            readonly type: "string";
            readonly description: "DID of the installed plugin.";
        };
        readonly installedBy: {
            readonly type: "string";
            readonly description: "DID of the user who installed the plugin.";
        };
        readonly permissions: {
            readonly type: "object";
            readonly properties: {
                readonly storageAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the plugin access storage?";
                };
                readonly computeAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the plugin use compute resources?";
                };
                readonly identityAccess: {
                    readonly type: "boolean";
                    readonly description: "Can the plugin interact with identity data?";
                };
            };
        };
        readonly installationDate: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp when the plugin was installed.";
        };
    };
    readonly required: readonly ["chamberId", "pluginId", "installedBy", "permissions", "installationDate"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultChamberTagging";
    readonly title: "Vault Chamber Tagging";
    readonly description: "Defines the tagging system within a Vault, including permissions, allowed tags, and Data Chambers.";
    readonly type: "object";
    readonly properties: {
        readonly vaultId: {
            readonly type: "string";
            readonly description: "DID of the Vault.";
        };
        readonly admin: {
            readonly type: "string";
            readonly description: "DID of the Vault administrator.";
        };
        readonly allowedTags: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly tag: {
                        readonly type: "string";
                        readonly description: "The supported tag.";
                    };
                    readonly restricted: {
                        readonly type: "boolean";
                        readonly description: "Whether this tag requires admin approval.";
                    };
                    readonly linkedChamber: {
                        readonly type: "string";
                        readonly description: "DID of a Data Chamber if this tag represents a data pool.";
                    };
                };
            };
            readonly description: "List of supported tags and their access control settings.";
        };
        readonly userTaggingPermissions: {
            readonly type: "object";
            readonly properties: {
                readonly allowUserTagging: {
                    readonly type: "boolean";
                    readonly description: "Whether users can add their own tags.";
                };
                readonly moderationRequired: {
                    readonly type: "boolean";
                    readonly description: "Whether admin approval is required for new user tags.";
                };
            };
            readonly description: "Defines user permissions for tagging.";
        };
    };
    readonly required: readonly ["vaultId", "admin", "allowedTags", "userTaggingPermissions"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultChamberTransaction";
    readonly title: "Vault Chamber Transaction";
    readonly description: "Records payment-based access events for transactional Vault Chambers.";
    readonly type: "object";
    readonly properties: {
        readonly transactionId: {
            readonly type: "string";
            readonly description: "Unique ID of the transaction.";
        };
        readonly chamberId: {
            readonly type: "string";
            readonly description: "DID of the Vault Chamber.";
        };
        readonly buyer: {
            readonly type: "string";
            readonly description: "DID of the user who paid for access.";
        };
        readonly amountPaid: {
            readonly type: "number";
            readonly description: "Amount paid for access.";
        };
        readonly currency: {
            readonly type: "string";
            readonly description: "Currency used (e.g., USD, CHEQ, ETH).";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of transaction.";
        };
        readonly accessDuration: {
            readonly type: "string";
            readonly description: "How long the user can access the Chamber.";
        };
    };
    readonly required: readonly ["transactionId", "chamberId", "buyer", "amountPaid", "currency", "timestamp", "accessDuration"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.io/VaultDeclaration";
    readonly title: "Vault DID Declaration";
    readonly description: "Defines an OV Vault's ownership, governance, and access policies.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the vault.";
        };
        readonly type: {
            readonly const: "VaultDID";
            readonly description: "Indicates this is a Vault DID declaration.";
        };
        readonly owner: {
            readonly type: "string";
            readonly description: "The DID of the user or organization that owns this vault.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the OV cluster managing this vault.";
        };
        readonly storageNodes: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of Storage Node DIDs storing this vault's data.";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., Metadata, AccessLog, ContentManifest).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "References to vault metadata, manifests, and access logs.";
        };
        readonly accessPolicies: {
            readonly type: "object";
            readonly properties: {
                readonly readAccess: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of DIDs that can read from this vault.";
                };
                readonly writeAccess: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of DIDs that can write to this vault.";
                };
                readonly publicAccess: {
                    readonly type: "boolean";
                    readonly description: "Whether the vault is publicly accessible.";
                };
            };
            readonly description: "Defines who can access and modify the vault.";
        };
        readonly governance: {
            readonly type: "object";
            readonly properties: {
                readonly governedBy: {
                    readonly type: "string";
                    readonly description: "DID of the governance body managing vault policies (e.g., a DAO or admin).";
                };
                readonly disputeResolution: {
                    readonly type: "string";
                    readonly description: "DID reference to a dispute resolution service.";
                };
            };
            readonly description: "Governance and compliance policies for the vault.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of when this vault declaration was issued.";
        };
    };
    readonly required: readonly ["id", "owner", "cluster", "storageNodes", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultOperatorPersona";
    readonly title: "Vault Operator Persona";
    readonly description: "Defines a vault operator in the OriginVault ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly managedVaults: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of vaults managed by this operator.";
            };
        };
        readonly governanceModel: {
            readonly type: "string";
            readonly enum: readonly ["Admin-Controlled", "DAO-Based", "Token-Weighted"];
            readonly description: "Defines how the vault is governed.";
        };
        readonly vaultAccessPolicies: {
            readonly type: "object";
            readonly properties: {
                readonly allowsPublicContributions: {
                    readonly type: "boolean";
                    readonly description: "Whether non-members can contribute to the vault.";
                };
                readonly monetizationModel: {
                    readonly type: "string";
                    readonly enum: readonly ["Subscription", "Pay-per-View", "One-Time Purchase"];
                    readonly description: "Defines the revenue model for content access.";
                };
            };
            readonly description: "Defines policies for managing vault access and revenue.";
        };
    };
    readonly required: readonly ["managedVaults", "governanceModel", "vaultAccessPolicies"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/PluginInstallationLog";
    readonly title: "Plugin Installation Log";
    readonly description: "Tracks the installation of plugins within an OV Vault, ensuring compliance with cluster policies.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the vault plugin installation.";
        };
        readonly vault: {
            readonly type: "string";
            readonly description: "The DID of the vault where the plugin is installed.";
        };
        readonly plugin: {
            readonly type: "string";
            readonly description: "The DID of the installed plugin.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster the vault belongs to.";
        };
        readonly installedBy: {
            readonly type: "string";
            readonly description: "DID of the entity that installed the plugin.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["installed", "active", "suspended", "removed"];
            readonly description: "The status of the plugin installation.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of installation.";
        };
    };
    readonly required: readonly ["id", "vault", "plugin", "cluster", "installedBy", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VaultUserAgreement";
    readonly title: "Vault User Agreement";
    readonly description: "Defines the terms for users accessing content within a Vault.";
    readonly type: "object";
    readonly properties: {
        readonly agreementId: {
            readonly type: "string";
            readonly description: "DID of the agreement.";
        };
        readonly vaultId: {
            readonly type: "string";
            readonly description: "DID of the Vault being accessed.";
        };
        readonly userId: {
            readonly type: "string";
            readonly description: "DID of the user.";
        };
        readonly accessPermissions: {
            readonly type: "object";
            readonly properties: {
                readonly read: {
                    readonly type: "boolean";
                    readonly description: "Whether the user can view content.";
                };
                readonly write: {
                    readonly type: "boolean";
                    readonly description: "Whether the user can contribute content.";
                };
                readonly purchase: {
                    readonly type: "boolean";
                    readonly description: "Whether the user can buy content.";
                };
            };
        };
        readonly usageRestrictions: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["No Redistribution", "No AI Training", "No Commercial Use"];
            };
            readonly description: "Restrictions on how the user can use the content.";
        };
        readonly revocationPolicy: {
            readonly type: "string";
            readonly description: "Conditions under which access can be revoked.";
        };
        readonly agreementSigned: {
            readonly type: "boolean";
            readonly description: "Whether the user has accepted the agreement.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Time of agreement acceptance.";
        };
    };
    readonly required: readonly ["agreementId", "vaultId", "userId", "accessPermissions", "usageRestrictions", "revocationPolicy", "agreementSigned", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VerificationLog";
    readonly title: "Verification Log Schema";
    readonly description: "Tracks verifications, compliance audits, and trust decisions.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the verification log.";
        };
        readonly entity: {
            readonly type: "string";
            readonly description: "The DID of the verified entity.";
        };
        readonly verifiedBy: {
            readonly type: "string";
            readonly description: "The DID of the authority performing verification.";
        };
        readonly verificationType: {
            readonly type: "string";
            readonly enum: readonly ["IdentityCheck", "SecurityAudit", "PerformanceTest"];
            readonly description: "Type of verification performed.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["Passed", "Failed", "Pending"];
            readonly description: "Outcome of the verification.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of verification.";
        };
    };
    readonly required: readonly ["id", "entity", "verifiedBy", "verificationType", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VerificationNodeDeclaration";
    readonly title: "Verification Node Declaration";
    readonly description: "Defines a Verification Node in an OV Cluster.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the Verification Node.";
        };
        readonly type: {
            readonly const: "VerificationNode";
            readonly description: "Node type.";
        };
        readonly cluster: {
            readonly type: "string";
            readonly description: "The DID of the cluster this node belongs to.";
        };
        readonly operator: {
            readonly type: "string";
            readonly description: "DID of the entity operating this node.";
        };
        readonly verificationTasks: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of supported verification tasks (e.g., DID Validation, Signature Verification, Compliance Checks).";
        };
        readonly linkedResources: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "The DID of the linked resource.";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The type of resource (e.g., Data, Metadata, ContentManifest).";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the linked resource.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "The description of the linked resource.";
                    };
                    readonly uri: {
                        readonly type: "string";
                        readonly description: "The uri of the linked resource.";
                    };
                };
                readonly required: readonly ["id", "type", "name", "description", "uri"];
            };
            readonly description: "References to stored resources.";
        };
        readonly trustLevel: {
            readonly type: "string";
            readonly enum: readonly ["Low", "Medium", "High"];
            readonly description: "Trust level assigned to this node based on verification authority.";
        };
        readonly verificationLogs: {
            readonly type: "string";
            readonly description: "Reference to a log of verification checks performed.";
        };
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["active", "suspended", "revoked"];
            readonly description: "Operational status of the node.";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of node declaration.";
        };
    };
    readonly required: readonly ["id", "cluster", "operator", "verificationTasks", "trustLevel", "status", "timestamp"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/VerifierPersona";
    readonly title: "Verifier Persona";
    readonly description: "Defines a verifier in the OriginVault ecosystem.";
    readonly type: "object";
    readonly properties: {
        readonly "@type": {
            readonly type: "string";
            readonly description: "Schema.org type";
        };
        readonly verificationsPerformed: {
            readonly type: "number";
            readonly description: "Total number of verification actions performed.";
        };
        readonly approvedNamespaces: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly description: "DIDs of namespaces the verifier is trusted in.";
            };
        };
        readonly trustScoreImpact: {
            readonly type: "number";
            readonly description: "Modifier applied to their reputation based on accuracy.";
        };
        readonly disputedVerifications: {
            readonly type: "number";
            readonly description: "Count of verification decisions that were disputed or reversed.";
        };
    };
    readonly required: readonly ["verificationsPerformed", "approvedNamespaces", "trustScoreImpact"];
} | {
    readonly $schema: "https://json-schema.org/draft/2020-12/schema";
    readonly $id: "https://schemas.originvault.box/Voting";
    readonly title: "Governance Voting Schema";
    readonly description: "Tracks voting activity on governance proposals.";
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly description: "The DID of the voting record.";
        };
        readonly proposal: {
            readonly type: "string";
            readonly description: "DID of the proposal being voted on.";
        };
        readonly voter: {
            readonly type: "string";
            readonly description: "DID of the voter.";
        };
        readonly vote: {
            readonly type: "string";
            readonly enum: readonly ["Yes", "No", "Abstain"];
            readonly description: "Vote cast by the participant.";
        };
        readonly weight: {
            readonly type: "number";
            readonly description: "Weight of the voter's vote (e.g., based on staked tokens).";
        };
        readonly timestamp: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "Timestamp of the vote submission.";
        };
    };
    readonly required: readonly ["id", "proposal", "voter", "vote", "weight", "timestamp"];
};
export declare function getSchemaHash(name: SchemaName): string;
export declare function validateSchemaHash(name: SchemaName, hash: string): boolean;
//# sourceMappingURL=registry.d.ts.map