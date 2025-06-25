/**
 * Schema Registry for BFF Integration
 * Aligns with ADR 0008: Schema-Driven API Architecture
 * Supports multi-root trust architecture
 */

export const SCHEMA_REGISTRY = {
  "Admin": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/Admin",
    "title": "Admin",
    "description": "Defines an administrator role within OriginVault, including governance and permissions.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "Person",
                "Organization"
            ],
            "description": "Schema.org type"
        },
        "adminId": {
            "type": "string",
            "description": "DID of the admin."
        },
        "governsVaults": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of vaults managed by this admin."
            }
        },
        "managesNodes": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of nodes managed by this admin."
            }
        },
        "policyApprovals": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of approved governance policies."
            }
        },
        "enforcementActions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "actionId": {
                        "type": "string",
                        "description": "DID of the action taken."
                    },
                    "targetEntity": {
                        "type": "string",
                        "description": "DID of the entity affected by the action."
                    },
                    "reason": {
                        "type": "string",
                        "description": "Reason for enforcement."
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Time of enforcement action."
                    }
                }
            },
            "description": "Records enforcement actions taken by the admin."
        },
        "trustedByNamespaces": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of namespaces that trust this admin."
            }
        },
        "securityClearanceLevel": {
            "type": "string",
            "enum": [
                "low",
                "medium",
                "high"
            ],
            "description": "Level of security clearance granted to the admin."
        }
    },
    "required": [
        "adminId",
        "governsVaults",
        "managesNodes",
        "policyApprovals"
    ]
},
  "AIConfig": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://json.schemastore.org/aiconfig-1.0.json",
    "additionalProperties": {},
    "type": "object",
    "properties": {
        "name": {
            "description": "Friendly name descriptor for the AIConfig. Could default to the filename if not specified.",
            "type": "string"
        },
        "description": {
            "description": "Description of the AIConfig.\nIf you have a collection of different AIConfigs, this may be used for dynamic prompt routing.",
            "type": "string"
        },
        "schema_version": {
            "$ref": "#/definitions/SchemaVersion",
            "description": "The version of the AIConfig schema."
        },
        "metadata": {
            "description": "Root-level metadata that applies to the entire AIConfig.",
            "type": "object",
            "additionalProperties": {},
            "properties": {
                "parameters": {
                    "description": "Parameter definitions that are accessible to all prompts in this AIConfig.\nThese parameters can be referenced in the prompts using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.",
                    "type": "object",
                    "additionalProperties": {}
                },
                "models": {
                    "description": "Globally defined model settings. Any prompts that use these models will have these settings applied by default,\nunless they override them with their own model settings.",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "additionalProperties": {}
                    }
                },
                "default_model": {
                    "description": "Default model to use for prompts that do not specify a model.",
                    "type": "string"
                },
                "model_parsers": {
                    "description": "Model ID to ModelParser ID mapping.\nThis is useful if you want to use a custom ModelParser for a model, or if a single ModelParser can handle multiple models.",
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            }
        },
        "prompts": {
            "description": "Array of prompts that make up the AIConfig.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "description": "A unique identifier for the prompt. This is used to reference the prompt in other parts of the AIConfig (such as other prompts)",
                        "type": "string"
                    },
                    "input": {
                        "$ref": "#/definitions/PromptInput",
                        "description": "The prompt string, or a more complex prompt object."
                    },
                    "metadata": {
                        "type": "object",
                        "additionalProperties": {},
                        "properties": {
                            "parameters": {
                                "description": "Parameter definitions that are accessible to this prompt.\nThese parameters can be referenced in the prompt using {{param_name}} handlebars syntax.\nFor more information, see https://handlebarsjs.com/guide/#basic-usage.",
                                "type": "object",
                                "additionalProperties": {}
                            },
                            "model": {
                                "description": "Model name/settings that apply to this prompt.\nThese settings override any global model settings that may have been defined in the AIConfig metadata.\nIf this is a string, it is assumed to be the model name.\nIf this is undefined, the default model specified in the default_model property will be used for this Prompt.",
                                "anyOf": [
                                    {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "description": "The ID of the model to use.",
                                                "type": "string"
                                            },
                                            "settings": {
                                                "description": "Model inference settings that apply to this prompt.",
                                                "type": "object",
                                                "additionalProperties": {}
                                            }
                                        },
                                        "required": [
                                            "name"
                                        ]
                                    },
                                    {
                                        "type": "string"
                                    }
                                ]
                            },
                            "tags": {
                                "description": "Tags for this prompt. Tags must be unique, and must not contain commas.",
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "outputs": {
                        "description": "Execution, display, or stream outputs.",
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/Output"
                        }
                    }
                },
                "required": [
                    "input",
                    "name"
                ]
            }
        }
    },
    "required": [
        "metadata",
        "name",
        "prompts",
        "schema_version"
    ],
    "definitions": {
        "SchemaVersion": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "major": {
                            "type": "number"
                        },
                        "minor": {
                            "type": "number"
                        }
                    },
                    "required": [
                        "major",
                        "minor"
                    ]
                },
                {
                    "enum": [
                        "latest",
                        "v1"
                    ],
                    "type": "string"
                }
            ]
        },
        "PromptInput": {
            "anyOf": [
                {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "data": {
                            "description": "Input to the model. This can represent a single input, or multiple inputs.\nThe structure of the data object is up to the ModelParser. Attachments field should be leveraged for non-text inputs (e.g. image, audio)."
                        },
                        "attachments": {
                            "description": "Used to include non-text inputs (e.g. image, audio) of specified MIME types in the prompt",
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Attachment"
                            }
                        }
                    }
                },
                {
                    "type": "string"
                }
            ]
        },
        "Attachment": {
            "description": "Data of specified MIME type to attach to a prompt",
            "type": "object",
            "required": [
                "data"
            ],
            "properties": {
                "mime_type": {
                    "description": "MIME type of the attachment. If not specified, the MIME type will be assumed to be text/plain.",
                    "type": "string"
                },
                "data": {
                    "description": "Data representing the attachment"
                },
                "metadata": {
                    "description": "Attachment metadata.",
                    "type": "object",
                    "additionalProperties": {}
                }
            }
        },
        "Output": {
            "description": "Model inference result.",
            "anyOf": [
                {
                    "description": "Result of executing a prompt.",
                    "type": "object",
                    "properties": {
                        "output_type": {
                            "description": "Type of output.",
                            "type": "string",
                            "const": "execute_result"
                        },
                        "execution_count": {
                            "description": "A result's prompt number.",
                            "type": "number"
                        },
                        "data": {
                            "description": "The result of executing the prompt."
                        },
                        "mime_type": {
                            "description": "The MIME type of the result. If not specified, the MIME type will be assumed to be plain text.",
                            "type": "string"
                        },
                        "metadata": {
                            "description": "Output metadata.",
                            "type": "object",
                            "additionalProperties": {}
                        }
                    },
                    "required": [
                        "data",
                        "output_type"
                    ]
                },
                {
                    "description": "Output of an error that occurred during inference.",
                    "type": "object",
                    "properties": {
                        "output_type": {
                            "description": "Type of output.",
                            "type": "string",
                            "const": "error"
                        },
                        "ename": {
                            "description": "The name of the error.",
                            "type": "string"
                        },
                        "evalue": {
                            "description": "The value, or message, of the error.",
                            "type": "string"
                        },
                        "traceback": {
                            "description": "The error's traceback, represented as an array of strings.",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "ename",
                        "evalue",
                        "output_type",
                        "traceback"
                    ]
                }
            ]
        }
    }
},
  "AIModelTrainingAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/AITrainingAgreement",
    "title": "AI Model Training Agreement",
    "description": "Defines terms for AI companies training models on data within OV Vaults.",
    "type": "object",
    "properties": {
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "buyerId": {
            "type": "string",
            "description": "DID of the AI company."
        },
        "chamberId": {
            "type": "string",
            "description": "DID of the Vault Chamber providing data."
        },
        "licenseTerms": {
            "type": "object",
            "properties": {
                "licenseType": {
                    "type": "string",
                    "enum": [
                        "Exclusive",
                        "Non-Exclusive",
                        "Time-Limited"
                    ]
                },
                "dataAnonymization": {
                    "type": "boolean",
                    "description": "Whether the data must be anonymized."
                }
            }
        },
        "usageScope": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "Training Only",
                    "Commercial Model Deployment",
                    "Open-Source Research"
                ]
            }
        },
        "complianceRequirements": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Legal compliance and privacy requirements."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions under which access can be revoked."
        },
        "paymentProof": {
            "type": "string",
            "description": "Verifiable Credential proving payment."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the AI company has accepted the agreement."
        }
    },
    "required": [
        "agreementId",
        "buyerId",
        "chamberId",
        "licenseTerms",
        "usageScope",
        "complianceRequirements",
        "revocationPolicy",
        "paymentProof",
        "agreementSigned"
    ]
},
  "ClaimVerification": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/ClaimVerification",
    "title": "Claim Verification",
    "type": "object",
    "properties": {
        "identifier": {
            "type": "string",
            "description": "DID of the claim."
        },
        "interpretedAsClaim": {
            "type": "string",
            "description": "The assertion made by this content (e.g., 'This image was created by AI')."
        },
        "claimInterpreter": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "DID of the verifying entity."
                },
                "name": {
                    "type": "string",
                    "description": "Name of the interpreter (e.g., OriginVault AI Trust Validator)."
                }
            }
        }
    },
    "required": [
        "identifier",
        "interpretedAsClaim",
        "claimInterpreter"
    ]
},
  "ClusterGovernance": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ClusterGovernance",
    "title": "Cluster Governance Schema",
    "description": "Defines governance rules for an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the cluster governance document."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster this governance applies to."
        },
        "nodeManagement": {
            "type": "object",
            "properties": {
                "verificationMethod": {
                    "type": "string",
                    "enum": [
                        "Open",
                        "Permissioned",
                        "Staked"
                    ],
                    "description": "The method used to verify new nodes joining the cluster."
                },
                "removalPolicy": {
                    "type": "string",
                    "description": "Conditions under which nodes can be removed from the cluster."
                }
            },
            "description": "Rules for adding and removing nodes in the cluster."
        },
        "serviceManagement": {
            "type": "object",
            "properties": {
                "allowedServices": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of service types permitted in this cluster (e.g., Storage, Verification, Payment)."
                },
                "serviceVerification": {
                    "type": "string",
                    "description": "Reference to a DID-Linked Resource explaining service verification requirements."
                }
            },
            "description": "Governance rules for services running in the cluster."
        },
        "securityPolicies": {
            "type": "object",
            "properties": {
                "auditFrequency": {
                    "type": "string",
                    "enum": [
                        "Daily",
                        "Weekly",
                        "Monthly"
                    ],
                    "description": "How frequently the cluster undergoes audits."
                },
                "complianceChecks": {
                    "type": "string",
                    "description": "Reference to a DID-Linked Resource detailing compliance requirements."
                }
            },
            "description": "Security and compliance policies for the cluster."
        },
        "governanceModel": {
            "type": "string",
            "enum": [
                "AdminControlled",
                "MultiSig",
                "TokenVoting"
            ],
            "description": "The governance model used to manage this cluster."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this governance document was issued."
        }
    },
    "required": [
        "id",
        "cluster",
        "nodeManagement",
        "serviceManagement",
        "securityPolicies",
        "timestamp"
    ]
},
  "ClusterRegistration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ClusterRegistration",
    "title": "Cluster Registration",
    "description": "Defines the registration details of an OV cluster within a namespace.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "DID of the cluster registration document."
        },
        "namespace": {
            "type": "string",
            "description": "DID of the namespace this cluster belongs to."
        },
        "clusterDID": {
            "type": "string",
            "description": "DID of the cluster."
        },
        "governanceModel": {
            "type": "string",
            "enum": [
                "centralized",
                "decentralized",
                "DAO-based"
            ],
            "description": "Governance model of the cluster."
        },
        "supportedPlugins": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of plugin DIDs this cluster supports."
        },
        "nodeOperators": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of DIDs of node operators in this cluster."
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the cluster was registered."
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof of the cluster registration.",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Proof type."
                },
                "created": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of proof creation."
                },
                "verificationMethod": {
                    "type": "string",
                    "description": "DID or method used to verify this proof."
                },
                "signatureValue": {
                    "type": "string",
                    "description": "Base64 or hex-encoded signature."
                }
            }
        }
    },
    "required": [
        "id",
        "namespace",
        "clusterDID",
        "governanceModel",
        "supportedPlugins",
        "nodeOperators",
        "createdAt",
        "proof"
    ]
},
  "CommunityMember": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/CommunityMemberPersona",
    "title": "Community Member Persona",
    "description": "Defines a general community member in the OriginVault ecosystem.",
    "type": "object",
    "properties": {
        "participationHistory": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "activity": {
                        "type": "string",
                        "description": "Type of participation (e.g., event, discussion, content rating)."
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date of participation."
                    }
                }
            },
            "description": "Tracks engagement in OV-related activities."
        },
        "referredUsers": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of users referred to OV."
            }
        }
    },
    "required": [
        "participationHistory"
    ]
},
  "ComputeNode": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/ComputeNodeDeclaration",
    "title": "Compute Node Declaration",
    "description": "Defines a Compute Node in an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the Compute Node."
        },
        "type": {
            "const": "ComputeNode",
            "description": "Node type."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster this node belongs to."
        },
        "operator": {
            "type": "string",
            "description": "DID of the entity operating this node."
        },
        "computeResources": {
            "type": "object",
            "properties": {
                "cpu": {
                    "type": "string",
                    "description": "CPU specifications (e.g., 8 cores, 3.2GHz)."
                },
                "ram": {
                    "type": "string",
                    "description": "RAM available (e.g., 32GB, 64GB)."
                },
                "gpu": {
                    "type": "string",
                    "description": "GPU specifications (if applicable)."
                }
            },
            "description": "Hardware specifications of the compute node."
        },
        "supportedTasks": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of supported compute tasks (e.g., AI Training, Data Transformation, Encryption)."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., Data, ProcessingLogs, ModelOutputs)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "References to compute tasks and results."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "suspended",
                "revoked"
            ],
            "description": "Operational status of the node."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of node declaration."
        }
    },
    "required": [
        "id",
        "cluster",
        "operator",
        "computeResources",
        "supportedTasks",
        "status",
        "timestamp"
    ]
},
  "ContentAIPermissionAssertionCredential": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ContentAIPermissionAssertionCredential",
    "title": "Content AI Permission Assertion Credential",
    "description": "Verifiable Credential asserting AI usage permissions and restrictions for digital content.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri",
            "description": "The unique identifier for the credential."
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The type of the credential, typically including 'VerifiableCredential'."
        },
        "issuer": {
            "type": "object",
            "description": "The entity that issued the credential.",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uri",
                    "description": "The unique identifier for the issuer."
                }
            },
            "required": [
                "id"
            ]
        },
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The context of the credential."
        },
        "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "The expiration date of the credential."
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "@type": {
                    "type": "string",
                    "enum": [
                        "DigitalDocument",
                        "License"
                    ],
                    "description": "Schema.org type"
                },
                "id": {
                    "type": "string",
                    "format": "uri",
                    "description": "The unique identifier for the content."
                },
                "license": {
                    "type": "object",
                    "properties": {
                        "contentId": {
                            "type": "string",
                            "description": "DID of the content associated with this AI permission credential."
                        },
                        "owner": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "description": "DID of the content owner."
                                },
                                "name": {
                                    "type": "string",
                                    "description": "Owners name or organization."
                                }
                            }
                        },
                        "permissions": {
                            "type": "object",
                            "properties": {
                                "allowDataMining": {
                                    "type": "boolean",
                                    "title": "Allow Data Mining?"
                                },
                                "allowAITraining": {
                                    "type": "boolean",
                                    "title": "Allow AI/ML Training?"
                                },
                                "allowAIInference": {
                                    "type": "boolean",
                                    "title": "Allow AI/ML Inference?"
                                },
                                "allowGenerativeAI": {
                                    "type": "boolean",
                                    "title": "Allow Generative AI (Image/Video/Text Generation)?"
                                }
                            }
                        },
                        "prohibitedUses": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "Resale",
                                    "Commercial AI Training",
                                    "Facial Recognition",
                                    "Military Use"
                                ],
                                "description": "Explicitly prohibited use cases."
                            }
                        }
                    },
                    "required": [
                        "contentId",
                        "owner",
                        "permissions"
                    ]
                },
                "monetization": {
                    "type": "object",
                    "properties": {
                        "licensingRequired": {
                            "type": "boolean",
                            "description": "Whether AI-related use requires a license."
                        },
                        "paymentModel": {
                            "type": "string",
                            "enum": [
                                "One-Time Fee",
                                "Subscription",
                                "Per API Call"
                            ],
                            "description": "The payment model for AI permissions."
                        },
                        "price": {
                            "type": "number",
                            "description": "Price in USD or equivalent crypto."
                        },
                        "royaltyPercentage": {
                            "type": "number",
                            "description": "Percentage of revenue owed to the content owner if used in AI applications."
                        }
                    },
                    "description": "Defines AI licensing and monetization terms."
                },
                "verification": {
                    "type": "object",
                    "properties": {
                        "complianceTracking": {
                            "type": "string",
                            "enum": [
                                "DID-Linked Resource",
                                "On-Chain Record",
                                "Verifiable Credential"
                            ],
                            "description": "Method used to track AI compliance."
                        },
                        "auditFrequency": {
                            "type": "string",
                            "description": "How often compliance is reviewed (e.g., monthly, annually)."
                        }
                    },
                    "description": "Defines AI licensing enforcement and compliance tracking."
                },
                "revocationPolicy": {
                    "type": "object",
                    "properties": {
                        "misuseConditions": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Conditions under which the AI permission is revoked."
                        },
                        "expirationDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The date when AI permissions expire."
                        }
                    },
                    "description": "Defines when and why AI permissions may be revoked."
                },
                "agreementSigned": {
                    "type": "boolean",
                    "description": "Whether both parties have accepted the AI permission terms."
                },
                "issuedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of issuance."
                }
            }
        }
    },
    "required": [
        "id",
        "issuer",
        "credentialSubject",
        "permissions",
        "verification",
        "revocationPolicy",
        "proof",
        "agreementSigned",
        "timestamp"
    ]
},
  "ContentAuthenticityAssertionCredential": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ContentAuthenticityAssertionCredential",
    "title": "Content Authenticity Assertion Credential",
    "description": "A Verifiable Credential that aggregates multiple content-related credentials into a single authenticity record.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri",
            "description": "The unique identifier for the credential."
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The type of the credential, typically including 'VerifiableCredential'."
        },
        "issuer": {
            "type": "object",
            "description": "The entity that issued the credential.",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uri",
                    "description": "The unique identifier for the issuer."
                }
            },
            "required": [
                "id"
            ]
        },
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The context of the credential."
        },
        "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "The expiration date of the credential."
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "contentId": {
                    "type": "string",
                    "description": "Unique ID of the associated content."
                },
                "includedCredentials": {
                    "type": "object",
                    "description": "DID references to modular Verifiable Credentials included in this authenticity record.",
                    "properties": {
                        "contentDetails": {
                            "type": "string",
                            "description": "DID DLR URI of the Content Details VC."
                        },
                        "identityClaims": {
                            "type": "string",
                            "description": "DID DLR URI of the Identity Claims VC."
                        },
                        "extendedMetadata": {
                            "type": "string",
                            "description": "DID DLR URI of the Extended Metadata VC."
                        },
                        "aiPermissions": {
                            "type": "string",
                            "description": "DID DLR URI of the AI Permissions VC."
                        },
                        "contentSigning": {
                            "type": "string",
                            "description": "DID DLR URI of the Content Signing VC."
                        }
                    }
                }
            },
            "required": [
                "contentDetails",
                "identityClaims",
                "extendedMetadata",
                "aiPermissions",
                "contentSigning"
            ]
        }
    },
    "required": [
        "id",
        "issuer",
        "credentialSubject",
        "expirationDate"
    ]
},
  "ContentExtendedMetadata": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential",
    "title": "Content Extended Metadata Assertion Credential",
    "description": "Verifiable Credential containing metadata such as licensing and usage restrictions.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri",
            "description": "The unique identifier for the credential."
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The type of the credential, typically including 'VerifiableCredential'."
        },
        "issuer": {
            "type": "object",
            "description": "The entity that issued the credential.",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uri",
                    "description": "The unique identifier for the issuer."
                }
            },
            "required": [
                "id"
            ]
        },
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The context of the credential."
        },
        "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "The expiration date of the credential."
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "contentReference": {
                    "type": "object",
                    "description": "References to the content’s integrity details.",
                    "properties": {
                        "identifier": {
                            "type": "string",
                            "description": "DID of the content being referenced."
                        },
                        "contentHash": {
                            "type": "string",
                            "description": "SHA-256 or IPFS CID hash of the content."
                        },
                        "perceptualHash": {
                            "type": "string",
                            "description": "Perceptual hash for similarity detection."
                        }
                    }
                },
                "tags": {
                    "type": "string",
                    "title": "Tags (Comma-Separated)"
                },
                "licensing": {
                    "type": "string",
                    "title": "License Type",
                    "enum": [
                        "All Rights Reserved",
                        "Creative Commons",
                        "Public Domain"
                    ]
                },
                "usageRestrictions": {
                    "type": "array",
                    "title": "Usage Restrictions",
                    "items": {
                        "type": "string",
                        "enum": [
                            "No AI Training",
                            "No Redistribution",
                            "No Commercial Use"
                        ]
                    }
                }
            },
            "required": [
                "contentReference",
                "tags",
                "licensing",
                "usageRestrictions"
            ]
        }
    },
    "required": [
        "id",
        "issuer",
        "credentialSubject",
        "expirationDate"
    ]
},
  "ContentLegalAccountability": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/ContentLegalAccountability",
    "title": "Content Legal Accountability",
    "type": "object",
    "properties": {
        "identifier": {
            "type": "string",
            "description": "DID of the content."
        },
        "accountablePerson": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "DID of the responsible entity."
                },
                "name": {
                    "type": "string",
                    "description": "Name of the accountable entity."
                }
            }
        },
        "publisher": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "DID of the publisher."
                },
                "name": {
                    "type": "string",
                    "description": "Publisher name."
                }
            }
        },
        "legalJurisdiction": {
            "type": "string",
            "description": "Defines which legal system applies to the content."
        },
        "disputeResolution": {
            "type": "string",
            "description": "URL or DID for dispute resolution policies."
        }
    },
    "required": [
        "identifier",
        "accountablePerson",
        "legalJurisdiction"
    ]
},
  "ContentLicensingAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.io"
    ],
    "$id": "https://schemas.originvault.box/ContentLicensingAgreement",
    "title": "Content Licensing Agreement",
    "description": "Defines licensing terms for content distributed through OriginVault.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "contentId": {
            "type": "string",
            "description": "DID of the licensed content."
        },
        "creatorId": {
            "type": "string",
            "description": "DID of the content creator."
        },
        "licenseeId": {
            "type": "string",
            "description": "DID of the entity purchasing the license."
        },
        "agreeAction": {
            "type": "object",
            "description": "Represents the act of accepting this license.",
            "properties": {
                "@type": {
                    "type": "string",
                    "enum": [
                        "AgreeAction"
                    ],
                    "description": "Schema.org type"
                },
                "agent": {
                    "type": "string",
                    "description": "DID of the licensee accepting the agreement."
                },
                "object": {
                    "type": "string",
                    "description": "DID of this licensing agreement."
                },
                "participant": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "DIDs of all involved parties (creator, licensee, etc.)."
                },
                "actionStatus": {
                    "type": "string",
                    "enum": [
                        "CompletedActionStatus"
                    ],
                    "description": "Agreement completion status."
                },
                "startTime": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the agreement was signed."
                },
                "endTime": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Expiration timestamp of the agreement."
                }
            }
        },
        "claim": {
            "type": "object",
            "description": "Represents a claim related to the agreement (e.g., ownership, dispute).",
            "properties": {
                "@type": {
                    "type": "string",
                    "enum": [
                        "Claim"
                    ],
                    "description": "Schema.org type"
                },
                "claimReviewed": {
                    "type": "string",
                    "description": "Claim being made (e.g., 'Properly Licensed')."
                },
                "author": {
                    "type": "string",
                    "description": "DID of the entity making the claim."
                },
                "claimInterpreter": {
                    "type": "string",
                    "description": "DID of the validating entity (e.g., OV verification node)."
                },
                "reviewAspect": {
                    "type": "string",
                    "description": "Which aspect of the license is under review (e.g., royalty terms)."
                },
                "firstAppearance": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of the first assertion of the claim."
                },
                "appearance": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "timestamp": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Revalidation timestamp."
                            },
                            "reviewStatus": {
                                "type": "string",
                                "enum": [
                                    "Verified",
                                    "Disputed",
                                    "Revoked"
                                ],
                                "description": "Status of the claim."
                            }
                        }
                    }
                }
            }
        },
        "licenseType": {
            "type": "string",
            "enum": [
                "Exclusive",
                "Non-Exclusive",
                "Time-Limited",
                "One-Time Use"
            ],
            "description": "Defines whether the license is exclusive to the licensee or shared."
        },
        "permittedUses": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "Personal Use",
                    "Commercial Use",
                    "AI Training",
                    "Resale",
                    "Public Display"
                ]
            },
            "description": "Defines the specific use cases allowed for the licensee."
        },
        "paymentTerms": {
            "type": "object",
            "properties": {
                "licenseFee": {
                    "type": "number",
                    "description": "Fixed price of the license in USD or crypto equivalent."
                },
                "recurringFee": {
                    "type": "boolean",
                    "description": "Whether the license requires ongoing payments."
                },
                "paymentSchedule": {
                    "type": "string",
                    "description": "Schedule for payments (e.g., one-time, monthly, annually)."
                }
            }
        },
        "royaltyTerms": {
            "type": "object",
            "properties": {
                "royaltyPercentage": {
                    "type": "number",
                    "description": "Percentage of revenue owed to the creator."
                },
                "paymentSchedule": {
                    "type": "string",
                    "description": "How frequently royalties are paid."
                }
            }
        },
        "revocationPolicy": {
            "type": "object",
            "properties": {
                "misuseConditions": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "Conditions under which the license is revoked."
                },
                "nonPaymentPenalty": {
                    "type": "boolean",
                    "description": "Whether failure to pay results in automatic revocation."
                }
            }
        },
        "auditAndCompliance": {
            "type": "object",
            "properties": {
                "trackingMechanism": {
                    "type": "string",
                    "enum": [
                        "DID-Linked Resource",
                        "Verifiable Credential",
                        "On-Chain"
                    ],
                    "description": "How license compliance is tracked."
                }
            }
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether both parties have accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "contentId",
        "creatorId",
        "licenseeId",
        "agreeAction",
        "licenseType",
        "permittedUses",
        "paymentTerms",
        "royaltyTerms",
        "revocationPolicy",
        "auditAndCompliance",
        "agreementSigned",
        "timestamp"
    ]
},
  "ContentLicensingTerms": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/ContentLicensingTerms",
    "title": "Content Licensing Terms",
    "description": "Defines licensing conditions and monetization models for digital content in OriginVault.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "CreativeWork",
                "MediaObject",
                "DigitalDocument",
                "SoftwareApplication",
                "License",
                "Agreement"
            ],
            "description": "Defines the type of digital asset or contract."
        },
        "identifier": {
            "type": "string",
            "description": "DID of the licensed content."
        },
        "creator": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "DID of the creator."
                },
                "name": {
                    "type": "string",
                    "description": "Creator name."
                }
            },
            "required": [
                "identifier"
            ]
        },
        "acquireLicensePage": {
            "type": "string",
            "description": "URL where the license can be obtained (e.g., smart contract, marketplace link)."
        },
        "licenseType": {
            "type": "string",
            "enum": [
                "Exclusive",
                "Non-Exclusive",
                "Time-Limited",
                "One-Time Use"
            ],
            "description": "Defines if the license is shared or restricted."
        },
        "licenseScope": {
            "type": "object",
            "properties": {
                "geographicRestrictions": {
                    "type": "string",
                    "enum": [
                        "Global",
                        "Region-Specific",
                        "Country-Specific"
                    ],
                    "description": "Where the licensee is permitted to use the content."
                },
                "modificationRights": {
                    "type": "boolean",
                    "description": "Whether the licensee can modify or adapt the content."
                },
                "sublicensingAllowed": {
                    "type": "boolean",
                    "description": "Whether the licensee can sublicense the content."
                },
                "duration": {
                    "type": "string",
                    "description": "License duration (e.g., perpetual, 1 year, until 2030)."
                }
            }
        },
        "usageInfo": {
            "type": "string",
            "description": "URL linking to license terms & permitted uses."
        },
        "permittedUses": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "Personal Use",
                    "Commercial Use",
                    "AI Training",
                    "Resale",
                    "Public Display"
                ]
            },
            "description": "Defines permitted usage rights."
        },
        "prohibitedUses": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "No AI Training",
                    "No Redistribution",
                    "No Commercial Use"
                ]
            },
            "description": "Explicitly states forbidden use cases."
        },
        "monetizationModel": {
            "type": "object",
            "properties": {
                "price": {
                    "type": "number",
                    "description": "Price in USD or crypto equivalent."
                },
                "paymentMethod": {
                    "type": "string",
                    "enum": [
                        "Stripe",
                        "Crypto",
                        "NFT"
                    ]
                },
                "recurringFee": {
                    "type": "boolean",
                    "description": "Whether ongoing payments are required."
                },
                "paymentSchedule": {
                    "type": "string",
                    "description": "Schedule for payments (one-time, monthly, annually)."
                },
                "royaltyTerms": {
                    "type": "object",
                    "properties": {
                        "royaltyPercentage": {
                            "type": "number",
                            "description": "Percentage paid to the creator."
                        },
                        "paymentSchedule": {
                            "type": "string",
                            "description": "Schedule for royalty payments."
                        },
                        "distributionMethod": {
                            "type": "string",
                            "enum": [
                                "Stripe Connect",
                                "Crypto Split",
                                "Manual Payout"
                            ],
                            "description": "How royalties are distributed."
                        }
                    }
                }
            },
            "description": "Defines how the license is monetized."
        },
        "verification": {
            "type": "object",
            "properties": {
                "complianceTracking": {
                    "type": "string",
                    "enum": [
                        "DID-Linked Resource",
                        "On-Chain Record",
                        "Verifiable Credential"
                    ],
                    "description": "Method used to track compliance with licensing terms."
                },
                "verificationAuthority": {
                    "type": "string",
                    "description": "DID of the entity responsible for verifying compliance."
                },
                "auditFrequency": {
                    "type": "string",
                    "description": "How often compliance checks are conducted (e.g., quarterly, annually)."
                }
            },
            "description": "Defines how licensing compliance is tracked and enforced."
        },
        "verifiableCredential": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "URI to the VC."
                },
                "issuer": {
                    "type": "object",
                    "properties": {
                        "identifier": {
                            "type": "string",
                            "description": "DID of the issuer."
                        },
                        "name": {
                            "type": "string",
                            "description": "Issuer name."
                        }
                    }
                }
            }
        },
        "revocationPolicy": {
            "type": "object",
            "properties": {
                "misuseConditions": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "Conditions under which the license is revoked."
                },
                "nonPaymentPenalty": {
                    "type": "boolean",
                    "description": "Whether failure to pay results in automatic revocation."
                }
            }
        },
        "disputeResolution": {
            "type": "object",
            "properties": {
                "arbitrationMethod": {
                    "type": "string",
                    "enum": [
                        "DAO Voting",
                        "Legal Arbitration",
                        "Multi-Sig Review"
                    ],
                    "description": "How disputes over the license are handled."
                },
                "appealProcess": {
                    "type": "string",
                    "description": "How a licensee can challenge revocation or penalty."
                }
            },
            "description": "Defines mechanisms for resolving disputes related to the agreement."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether both parties have accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "identifier",
        "creator",
        "licenseType",
        "licenseScope",
        "permittedUses",
        "monetizationModel",
        "verification",
        "agreementSigned",
        "timestamp"
    ]
},
  "Creator": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/Creator",
    "title": "Creator",
    "description": "Defines a content creator in the OriginVault ecosystem.",
    "type": "object",
    "properties": {
        "totalPublishedContent": {
            "type": "number",
            "description": "Total number of published pieces."
        },
        "licenseAgreements": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of content licensing agreements."
            }
        },
        "aiUsagePolicies": {
            "type": "object",
            "properties": {
                "allowsAITraining": {
                    "type": "boolean",
                    "description": "Whether AI companies can train on this creator's content."
                },
                "allowsAIInference": {
                    "type": "boolean",
                    "description": "Whether AI can use content for inference."
                }
            },
            "description": "Defines AI usage restrictions for the creator's content."
        },
        "earningsHistory": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "transactionId": {
                        "type": "string",
                        "description": "Transaction ID for a sale."
                    },
                    "amount": {
                        "type": "number",
                        "description": "Earnings from the transaction."
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date of transaction."
                    }
                }
            },
            "description": "Tracks revenue earned by the creator."
        }
    },
    "required": [
        "totalPublishedContent",
        "licenseAgreements",
        "aiUsagePolicies"
    ]
},
  "DataChamberContributionAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/DataChamberContributorAgreement",
    "title": "Data Chamber Contributor Agreement",
    "description": "Defines the terms under which a user contributes data to a Vault Chamber for potential monetization.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "chamberId": {
            "type": "string",
            "description": "DID of the Data Chamber."
        },
        "userId": {
            "type": "string",
            "description": "DID of the contributor."
        },
        "dataUsageTerms": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "AI Training",
                    "Research",
                    "Commercial Use",
                    "Limited Redistribution"
                ],
                "description": "List of allowed uses for contributed data."
            }
        },
        "optOutPolicy": {
            "type": "object",
            "properties": {
                "optOutAllowed": {
                    "type": "boolean",
                    "description": "Whether users can opt out after contribution."
                },
                "dataRetentionPeriod": {
                    "type": "string",
                    "description": "How long data is stored after opt-out."
                }
            }
        },
        "compensationModel": {
            "type": "object",
            "properties": {
                "revenueShare": {
                    "type": "number",
                    "description": "Percentage of revenue given to contributors."
                },
                "rewardMechanism": {
                    "type": "string",
                    "enum": [
                        "Fiat Payout",
                        "Gems",
                        "Tokens"
                    ],
                    "description": "How users are rewarded for their data."
                }
            }
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the user has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "chamberId",
        "userId",
        "dataUsageTerms",
        "optOutPolicy",
        "compensationModel",
        "agreementSigned",
        "timestamp"
    ]
},
  "DataChamberEnrollment": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/DataChamberEnrollment",
    "title": "Data Chamber Enrollment",
    "description": "Defines how users enroll in data pools within Vault Chambers and the terms of participation.",
    "type": "object",
    "properties": {
        "chamberId": {
            "type": "string",
            "description": "DID of the Data Chamber."
        },
        "userId": {
            "type": "string",
            "description": "DID of the user enrolling in the chamber."
        },
        "contributedData": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "dataId": {
                        "type": "string",
                        "description": "DID of the data contribution."
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time",
                        "description": "When the data was added."
                    }
                }
            },
            "description": "List of data contributions by this user."
        },
        "termsAccepted": {
            "type": "boolean",
            "description": "Whether the user has accepted the data-sharing terms."
        },
        "rewardEligibility": {
            "type": "object",
            "properties": {
                "revenueSharePercentage": {
                    "type": "number",
                    "description": "The percentage of sales the user is eligible for."
                },
                "rewardMechanism": {
                    "type": "string",
                    "enum": [
                        "Gems",
                        "Tokens",
                        "Fiat Payout"
                    ],
                    "description": "How users are rewarded."
                }
            },
            "description": "Defines how rewards are distributed."
        }
    },
    "required": [
        "chamberId",
        "userId",
        "contributedData",
        "termsAccepted",
        "rewardEligibility"
    ]
},
  "Developer": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/Developer",
    "title": "Developer",
    "description": "Defines a developer's identity, contributions, and repositories in OriginVault.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "Person"
            ],
            "description": "Schema.org type"
        },
        "developerId": {
            "type": "string",
            "description": "DID of the developer."
        },
        "githubProfile": {
            "type": "string",
            "format": "uri",
            "description": "Developer's GitHub or GitLab profile."
        },
        "publishedPlugins": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of plugins created by the developer."
            },
            "description": "List of plugins or software developed."
        },
        "signedCommits": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of cryptographically signed commits by the developer."
        },
        "trustedBy": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of other developers or organizations that trust this developer."
            }
        },
        "reputationScore": {
            "type": "number",
            "description": "Reputation score based on trust metrics."
        },
        "certifications": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of certifications proving expertise."
            }
        }
    },
    "required": [
        "developerId",
        "publishedPlugins",
        "signedCommits"
    ]
},
  "DevelopmentEnvironmentMetadata": {
    "$schema": "https://json-schema.org/draft-07/schema",
    "$id": "https://schemas.originvault.box/DevelopmentEnvironmentMetadata.schema.json",
    "title": "Development Environment Metadata",
    "type": "object",
    "properties": {
        "environment": {
            "type": "string",
            "description": "The development environment or platform used (e.g., 'Node.js v14.17.0')."
        },
        "packageJson": {
            "$ref": "https://json.schemastore.org/package.json"
        },
        "buildTool": {
            "type": "string",
            "description": "The tool used for building or compiling the project (e.g., 'webpack v5.38.1')."
        },
        "commitHash": {
            "type": "string",
            "description": "The Git commit hash corresponding to the codebase at the time of credential issuance."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "The date and time when the credential was generated."
        },
        "operatingSystem": {
            "type": "string",
            "description": "A generic description of the operating system used in the development environment (e.g., 'Linux-based OS')."
        },
        "hostname": {
            "type": "string",
            "description": "The hashed hostname of the machine running the development environment."
        },
        "ipAddress": {
            "type": "string",
            "description": "The hashed IP address of the machine running the development environment."
        }
    },
    "required": [
        "environment",
        "packageJson",
        "timestamp"
    ]
},
  "DIDAssertionCredential": {
    "$schema": "https://json-schema.org/draft-07/schema",
    "$id": "https://schemas.originvault.box/DIDAssertionCredential.schema.json",
    "title": "DID Assertion Credential",
    "version": "0.0.1",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri",
            "description": "The unique identifier for the credential."
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The type of the credential, typically including 'VerifiableCredential'."
        },
        "credentialSubject": {
            "description": "The subject of the credential.",
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uri",
                    "description": "The DID that this credential is asserting information about."
                },
                "claimReviewed": {
                    "type": "string",
                    "description": "The specific claim made about this DID (e.g., 'Trusted Creator')."
                },
                "author": {
                    "type": "string",
                    "format": "uri",
                    "description": "DID of the entity making this claim (same as issuer)."
                },
                "claimInterpreter": {
                    "type": "string",
                    "description": "The entity validating the claim (e.g., an OV verification node)."
                },
                "reviewAspect": {
                    "type": "string",
                    "description": "Specific characteristic being reviewed (e.g., 'Content Authenticity')."
                },
                "firstAppearance": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when this claim was first issued."
                },
                "appearance": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "timestamp": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Revalidation timestamp."
                            },
                            "reviewStatus": {
                                "type": "string",
                                "enum": [
                                    "Verified",
                                    "Disputed",
                                    "Revoked"
                                ],
                                "description": "Status of the claim."
                            }
                        }
                    },
                    "description": "History of appearances or updates to the claim."
                }
            }
        },
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The context of the credential."
        }
    },
    "required": [
        "id",
        "type",
        "credentialSubject",
        "@context"
    ]
},
  "DIDDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/DIDDeclaration",
    "title": "DID Declaration",
    "description": "Defines the role and permissions of a DID in an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the entity declaring itself."
        },
        "type": {
            "type": "string",
            "enum": [
                "NamespaceDeclaration",
                "NodeClusterDeclaration",
                "NodeDeclaration",
                "VaultDeclaration",
                "IdentityNodeDeclaration",
                "StorageNodeDeclaration",
                "VaultOwnerDeclaration"
            ],
            "description": "The type of DID declaration."
        },
        "parent": {
            "type": "string",
            "description": "The DID of the parent entity (e.g., a Cluster under a Namespace, or a Node under a Cluster)."
        },
        "roles": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The roles assigned to this DID (e.g., IdentityNode, StorageNode, VaultOwner)."
        },
        "governance": {
            "type": "object",
            "properties": {
                "managedBy": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of DIDs that govern this entity."
                },
                "rules": {
                    "type": "string",
                    "description": "A reference to governance policies (e.g., Ceramic document)."
                }
            },
            "description": "Governance settings for this DID."
        }
    },
    "required": [
        "id",
        "type"
    ]
},
  "DigitalDocument": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/DigitalDocument",
    "title": "Digital Document",
    "description": "Verifiable digital document metadata for OriginVault content.",
    "type": "object",
    "properties": {
        "identifier": {
            "type": "string",
            "description": "DID of the content."
        },
        "name": {
            "type": "string",
            "description": "Name or title of the document."
        },
        "author": {
            "type": "string",
            "description": "DID of the creator or owner."
        },
        "encodingFormat": {
            "type": "string",
            "description": "MIME type of the file (e.g., image/png, video/mp4)."
        },
        "publisher": {
            "type": "string",
            "description": "DID of the publisher."
        },
        "publication": {
            "type": "string",
            "description": "Verifiable Credential URI of the publication."
        },
        "contentSize": {
            "type": "number",
            "description": "Size of the document in bytes."
        },
        "isBasedOn": {
            "type": "string",
            "description": "DID of the source if derived from another work."
        },
        "dateCreated": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the document was created."
        },
        "dateModified": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of the last modification."
        },
        "license": {
            "type": "string",
            "description": "DID reference to the licensing agreement."
        },
        "acquireLicensePage": {
            "type": "string",
            "format": "uri",
            "description": "URL where licenses can be purchased."
        },
        "usageRestrictions": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "No AI Training",
                    "No Redistribution",
                    "No Commercial Use"
                ]
            },
            "description": "Usage restrictions for the document."
        },
        "C2PAManifest": {
            "type": "object",
            "description": "C2PA content authenticity proof.",
            "properties": {
                "identifier": {
                    "type": "string",
                    "description": "Verifiable Credential URI of the C2PA manifest."
                },
                "contentSigner": {
                    "type": "string",
                    "description": "DID of the signing entity."
                },
                "signatureValue": {
                    "type": "string",
                    "description": "Cryptographic signature of the content."
                }
            }
        },
        "thumbnailUrl": {
            "type": "string",
            "format": "uri",
            "description": "URL to a thumbnail preview of the document."
        },
        "associatedMedia": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "uri"
            },
            "description": "Media files linked to this document (e.g., video sources, image formats)."
        },
        "sameAs": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "uri"
            },
            "description": "External references (e.g., OpenSea, IPFS, Arweave)."
        }
    },
    "required": [
        "identifier",
        "name",
        "author",
        "encodingFormat",
        "contentSize",
        "dateCreated",
        "license"
    ]
},
  "EndorsementRecord": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/EndorsementRecord",
    "title": "Endorsement Record",
    "description": "Represents an endorsement given by one DID to another, contributing to trust scoring.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "Unique identifier for the endorsement record"
        },
        "endorserDid": {
            "type": "string",
            "description": "DID of the user giving the endorsement",
            "pattern": "^did:"
        },
        "endorsedDid": {
            "type": "string",
            "description": "DID of the user receiving the endorsement",
            "pattern": "^did:"
        },
        "credentialType": {
            "type": "string",
            "description": "Type of credential being endorsed"
        },
        "weight": {
            "type": "number",
            "minimum": 0,
            "maximum": 10,
            "description": "Weight/strength of the endorsement (0-10)"
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "When the endorsement was given"
        },
        "endorsementReason": {
            "type": "string",
            "description": "Reason for the endorsement"
        },
        "endorsementType": {
            "type": "string",
            "enum": [
                "verification",
                "governance",
                "community",
                "development",
                "trust"
            ],
            "description": "Category of the endorsement"
        },
        "linkedGem": {
            "type": "string",
            "description": "Gem that qualifies the endorser to give this endorsement"
        },
        "linkedCredential": {
            "type": "string",
            "description": "DID-Linked Resource to a Verifiable Credential supporting the endorsement"
        },
        "blockchainSync": {
            "type": "object",
            "properties": {
                "lastSynced": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Last time endorsement was synced with blockchain"
                },
                "pendingChanges": {
                    "type": "boolean",
                    "description": "Whether there are local changes not yet pushed to blockchain"
                },
                "blockchainResourceId": {
                    "type": "string",
                    "description": "Resource ID on blockchain for this endorsement"
                }
            },
            "description": "Blockchain synchronization status"
        },
        "metadata": {
            "type": "object",
            "description": "Additional metadata for the endorsement"
        }
    },
    "required": [
        "id",
        "endorserDid",
        "endorsedDid",
        "credentialType",
        "weight",
        "timestamp"
    ]
},
  "ExternalBuyerAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ExternalDataBuyerAgreement",
    "title": "External Data Buyer Agreement",
    "description": "Defines the terms under which an external stakeholder purchases access to a Vault Chamber’s data.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "chamberId": {
            "type": "string",
            "description": "DID of the Data Chamber being accessed."
        },
        "buyerId": {
            "type": "string",
            "description": "DID of the external entity purchasing access."
        },
        "accessTerms": {
            "type": "object",
            "properties": {
                "price": {
                    "type": "number",
                    "description": "Price paid for access."
                },
                "licenseDuration": {
                    "type": "string",
                    "description": "How long the data is accessible."
                },
                "usageRestrictions": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": [
                            "No AI Training",
                            "No Redistribution",
                            "Limited Commercial Use"
                        ],
                        "description": "Restrictions on how the data can be used."
                    }
                },
                "revocationPolicy": {
                    "type": "string",
                    "description": "Conditions under which access may be revoked."
                }
            }
        },
        "paymentProof": {
            "type": "string",
            "description": "Verifiable Credential proving payment."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the buyer has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "chamberId",
        "buyerId",
        "accessTerms",
        "paymentProof",
        "agreementSigned",
        "timestamp"
    ]
},
  "ExternalDataAccess": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ExternalDataAccess",
    "title": "External Data Access",
    "description": "Defines how external stakeholders can purchase access to data in Vault Chambers.",
    "type": "object",
    "properties": {
        "chamberId": {
            "type": "string",
            "description": "DID of the Data Chamber."
        },
        "buyer": {
            "type": "string",
            "description": "DID of the external entity purchasing access."
        },
        "accessTerms": {
            "type": "object",
            "properties": {
                "price": {
                    "type": "number",
                    "description": "Price of access."
                },
                "licenseDuration": {
                    "type": "string",
                    "description": "How long the data is accessible."
                },
                "usageRestrictions": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": [
                            "No AI Training",
                            "No Redistribution",
                            "Limited Commercial Use"
                        ]
                    },
                    "description": "Restrictions on how the data can be used."
                }
            },
            "description": "Defines access pricing and restrictions."
        },
        "paymentProof": {
            "type": "string",
            "description": "Verifiable Credential proving payment."
        }
    },
    "required": [
        "chamberId",
        "buyer",
        "accessTerms",
        "paymentProof"
    ]
},
  "GemDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GemDeclaration",
    "title": "Gem Declaration",
    "description": "Defines an OriginVault Gem awarded to users for contributions.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The unique DID of the Gem."
        },
        "type": {
            "type": "string",
            "enum": [
                "Founder's Gem",
                "Verifier's Gem",
                "Marker's Gem",
                "Advocate's Gem",
                "Builder's Gem",
                "Curator's Gem",
                "Trailblazer's Gem",
                "Luminary's Gem"
            ],
            "description": "The category of the gem."
        },
        "recipient": {
            "type": "string",
            "description": "DID of the user receiving the Gem."
        },
        "issuer": {
            "type": "string",
            "description": "DID of the entity awarding the Gem."
        },
        "dateIssued": {
            "type": "string",
            "format": "date-time",
            "description": "Date the Gem was issued."
        },
        "metadata": {
            "type": "object",
            "description": "Additional metadata related to the Gem.",
            "properties": {
                "video": {
                    "type": "string",
                    "format": "uri",
                    "description": "URL to the Gem's animated artwork."
                },
                "description": {
                    "type": "string",
                    "description": "Description of why the Gem was awarded."
                }
            }
        },
        "verifiableCredential": {
            "type": "string",
            "description": "DID-Linked Resource (DLR) to the Verifiable Credential proving eligibility for the Gem."
        },
        "revocationStatus": {
            "type": "string",
            "enum": [
                "valid",
                "revoked"
            ],
            "description": "Whether the Gem is still recognized as valid."
        }
    },
    "required": [
        "id",
        "type",
        "recipient",
        "issuer",
        "dateIssued",
        "metadata",
        "verifiableCredential",
        "revocationStatus"
    ]
},
  "GemIssuanceRecord": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GemIssuance",
    "title": "Gem Issuance Record",
    "description": "Tracks the issuance of a Gem, including verification of eligibility.",
    "type": "object",
    "properties": {
        "gemId": {
            "type": "string",
            "description": "DID of the issued Gem."
        },
        "issuer": {
            "type": "string",
            "description": "DID of the entity awarding the Gem."
        },
        "recipient": {
            "type": "string",
            "description": "DID of the recipient of the Gem."
        },
        "justification": {
            "type": "string",
            "description": "Why the Gem was awarded."
        },
        "supportingEvidence": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "uri"
            },
            "description": "Links to content proving the recipient earned the Gem."
        },
        "dateIssued": {
            "type": "string",
            "format": "date-time",
            "description": "Date the Gem was issued."
        },
        "verifiableCredential": {
            "type": "string",
            "description": "DID-Linked Resource (DLR) containing the VC proving eligibility."
        }
    },
    "required": [
        "gemId",
        "issuer",
        "recipient",
        "justification",
        "supportingEvidence",
        "dateIssued",
        "verifiableCredential"
    ]
},
  "GemReputationScore": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GemReputation",
    "title": "Gem Reputation Score",
    "description": "Defines how a recipient's reputation is influenced by their Gems.",
    "type": "object",
    "properties": {
        "recipient": {
            "type": "string",
            "description": "DID of the user holding the Gem."
        },
        "gemType": {
            "type": "string",
            "description": "The category of the Gem."
        },
        "reputationScore": {
            "type": "number",
            "minimum": 0,
            "description": "Numerical reputation score associated with the Gem."
        },
        "scoreLastUpdated": {
            "type": "string",
            "format": "date-time",
            "description": "Date when the reputation score was last updated."
        },
        "linkedCredentials": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of associated Verifiable Credentials that contribute to this reputation score."
        }
    },
    "required": [
        "recipient",
        "gemType",
        "reputationScore",
        "scoreLastUpdated",
        "linkedCredentials"
    ]
},
  "GemRevocationRecord": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GemRevocation",
    "title": "Gem Revocation Record",
    "description": "Defines how a previously awarded Gem can be revoked if necessary.",
    "type": "object",
    "properties": {
        "gemId": {
            "type": "string",
            "description": "DID of the revoked Gem."
        },
        "issuer": {
            "type": "string",
            "description": "DID of the entity revoking the Gem."
        },
        "revocationReason": {
            "type": "string",
            "description": "The reason for revocation."
        },
        "revokedOn": {
            "type": "string",
            "format": "date-time",
            "description": "Date the Gem was revoked."
        },
        "verifiableCredentialRevoked": {
            "type": "string",
            "description": "DID-Linked Resource (DLR) referencing the revoked Verifiable Credential."
        }
    },
    "required": [
        "gemId",
        "issuer",
        "revocationReason",
        "revokedOn",
        "verifiableCredentialRevoked"
    ]
},
  "GemTrustRegistry": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GemTrustRegistry",
    "title": "Gem Trust Registry",
    "description": "Tracks trust and reputation levels based on earned Gems.",
    "type": "object",
    "properties": {
        "holder": {
            "type": "string",
            "description": "DID of the Gem holder."
        },
        "gemTypes": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of Gems that the user holds."
        },
        "trustScore": {
            "type": "object",
            "properties": {
                "verificationScore": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score based on verification actions."
                },
                "governanceScore": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score based on governance participation."
                },
                "contributionScore": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score based on active contributions."
                },
                "communityScore": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score based on social/community engagement."
                }
            },
            "description": "Trust score based on various aspects of participation."
        },
        "linkedCredentials": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Verifiable Credentials contributing to this reputation."
        },
        "lastUpdated": {
            "type": "string",
            "format": "date-time",
            "description": "Last update timestamp."
        }
    },
    "required": [
        "holder",
        "gemTypes",
        "trustScore",
        "linkedCredentials",
        "lastUpdated"
    ]
},
  "GlobalPrivacyControl": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "$comment": "https://globalprivacycontrol.github.io/gpc-spec/",
    "description": "Configuration for GPC, so a site can convey its support for the Global Privacy Control.",
    "id": "https://json.schemastore.org/gpc.json",
    "properties": {
        "gpc": {
            "title": "Global Privacy Control",
            "description": "Indicates that the server intends to abide by GPC requests.",
            "type": "boolean"
        },
        "version": {
            "title": "Version",
            "type": "integer",
            "default": 1
        },
        "lastUpdate": {
            "title": "Last Update",
            "description": "This indicates the time at which the statement of support was made, such that later changes to the meaning of the GPC standard should not affect the interpretation of the resource for legal purposes. If the member is not in a valid ISO 8601 format, the last update date and time is unknown.",
            "type": "string"
        }
    },
    "required": [
        "gpc"
    ],
    "title": "Global Privacy Control",
    "type": "object"
},
  "GovernanceProposal": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/GovernanceProposal",
    "title": "Governance Proposal Schema",
    "description": "Defines a governance proposal for namespaces and clusters.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the proposal."
        },
        "proposer": {
            "type": "string",
            "description": "DID of the entity submitting the proposal."
        },
        "namespace": {
            "type": "string",
            "description": "DID of the namespace affected (if applicable)."
        },
        "cluster": {
            "type": "string",
            "description": "DID of the cluster affected (if applicable)."
        },
        "proposalType": {
            "type": "string",
            "enum": [
                "AddNode",
                "RemoveNode",
                "UpdateGovernance",
                "MonetizationPolicyChange"
            ],
            "description": "Type of governance action requested."
        },
        "details": {
            "type": "string",
            "description": "A description of the proposal, including motivations and expected impact."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "References to supporting documents or governance rules."
        },
        "status": {
            "type": "string",
            "enum": [
                "Pending",
                "Active",
                "Accepted",
                "Rejected",
                "Executed"
            ],
            "description": "Current status of the proposal."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of proposal submission."
        }
    },
    "required": [
        "id",
        "proposer",
        "proposalType",
        "details",
        "status",
        "timestamp"
    ]
},
  "IdentityClaimsAggregationCredential": {
    "$schema": "https://json-schema.org/draft-07/schema",
    "$id": "https://cawg.io/schemas/v1/creator-identity-assertion.json",
    "title": "IdentityClaimsAggregationCredential",
    "description": "Creator Identity Assertion Credential Schema for usage in JsonSchema",
    "type": "object",
    "properties": {
        "type": {
            "type": "array",
            "minItems": 2,
            "items": {
                "type": "string"
            },
            "allOf": [
                {
                    "contains": {
                        "const": "VerifiableCredential"
                    }
                },
                {
                    "contains": {
                        "const": "IdentityClaimsAggregationCredential"
                    }
                }
            ]
        },
        "issuer": {
            "oneOf": [
                {
                    "$ref": "#/$defs/nonEmptyUri"
                },
                {
                    "type": "object",
                    "properties": {
                        "id": {
                            "$ref": "#/$defs/nonEmptyUri"
                        },
                        "name": {
                            "$ref": "#/$defs/nonEmptyString"
                        }
                    },
                    "required": [
                        "id"
                    ]
                }
            ]
        },
        "validFrom": {
            "type": "string",
            "format": "date-time"
        },
        "expiresAt": {
            "type": "string",
            "format": "date-time"
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "id": {
                    "$ref": "#/$defs/nonEmptyUri"
                },
                "verifiedIdentities": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "$ref": "#/$defs/verifiedIdentity"
                    }
                },
                "c2paAsset": {
                    "type": "object",
                    "minProperties": 1,
                    "properties": {
                        "referenced_assertions": {
                            "type": "array",
                            "minItems": 1,
                            "items": {
                                "type": "object",
                                "properties": {
                                    "url": {
                                        "$ref": "#/$defs/nonEmptyString"
                                    },
                                    "hash": {
                                        "$ref": "#/$defs/nonEmptyString"
                                    },
                                    "alg": {
                                        "$ref": "#/$defs/nonEmptyString"
                                    }
                                },
                                "required": [
                                    "hash"
                                ]
                            }
                        },
                        "sig_type": {
                            "type": "string"
                        },
                        "role": {
                            "type": "string",
                            "enum": [
                                "cawg.creator",
                                "cawg.contributor",
                                "cawg.editor",
                                "cawg.producer",
                                "cawg.producer",
                                "cawg.publisher",
                                "cawg.sponsor",
                                "cawg.translator"
                            ]
                        },
                        "expected_partial_claim": {
                            "type": "string"
                        },
                        "expected_claim_generator": {
                            "type": "string"
                        },
                        "expected_countersigners": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "referenced_assertions",
                        "sig_type"
                    ]
                }
            },
            "required": [
                "id",
                "verifiedIdentities",
                "c2paAsset"
            ]
        }
    },
    "required": [
        "type",
        "issuer",
        "validFrom",
        "credentialSubject"
    ],
    "$defs": {
        "nonEmptyString": {
            "type": "string",
            "minLength": 1,
            "description": "A non-empty string"
        },
        "nonEmptyUri": {
            "type": "string",
            "minLength": 1,
            "format": "uri",
            "description": "A non-empty URI string"
        },
        "identifiableObject": {
            "type": "object",
            "properties": {
                "id": {
                    "$ref": "#/$defs/nonEmptyUri",
                    "description": "The unique identifier URI"
                },
                "name": {
                    "$ref": "#/$defs/nonEmptyString",
                    "description": "The name of the object"
                }
            },
            "required": [
                "id",
                "name"
            ],
            "description": "An object with an identifiable URI and name"
        },
        "verifiedIdentity": {
            "type": "object",
            "properties": {
                "type": {
                    "$ref": "#/$defs/nonEmptyString"
                },
                "username": {
                    "type": "string",
                    "minLength": 1
                },
                "uri": {
                    "$ref": "#/$defs/nonEmptyUri"
                },
                "provider": {
                    "$ref": "#/$defs/identifiableObject"
                },
                "verifiedAt": {
                    "$ref": "#/$defs/nonEmptyString",
                    "format": "date-time"
                },
                "name": {
                    "$ref": "#/$defs/nonEmptyString"
                },
                "method": {
                    "$ref": "#/$defs/nonEmptyString"
                },
                "address": {
                    "type": "string",
                    "minLength": 1
                }
            },
            "required": [
                "type",
                "verifiedAt"
            ],
            "oneOf": [
                {
                    "properties": {
                        "type": {
                            "const": "cawg.social_media"
                        }
                    },
                    "required": [
                        "username",
                        "uri",
                        "provider",
                        "verifiedAt"
                    ]
                },
                {
                    "properties": {
                        "type": {
                            "const": "cawg.crypto_wallet"
                        }
                    },
                    "required": [
                        "address",
                        "provider",
                        "verifiedAt"
                    ]
                },
                {
                    "properties": {
                        "type": {
                            "const": "cawg.document_verification"
                        }
                    },
                    "required": [
                        "name",
                        "provider",
                        "verifiedAt"
                    ]
                },
                {
                    "properties": {
                        "type": {
                            "const": "cawg.affiliation"
                        }
                    },
                    "required": [
                        "provider",
                        "verifiedAt"
                    ]
                },
                {
                    "properties": {
                        "type": {
                            "const": "cawg.web_site"
                        }
                    },
                    "required": [
                        "uri",
                        "verifiedAt"
                    ]
                }
            ]
        }
    }
},
  "IdentityNodeDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/IdentityNodeDeclaration",
    "title": "Identity Node Declaration",
    "description": "Defines an Identity Node in an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the Identity Node."
        },
        "type": {
            "const": "IdentityNode",
            "description": "Node type."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster this node belongs to."
        },
        "operator": {
            "type": "string",
            "description": "DID of the entity operating this node."
        },
        "services": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of services managed by this Identity Node (e.g., DID Resolution, Verification)."
        },
        "verificationPolicies": {
            "type": "string",
            "description": "Reference to identity verification policies."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., GovernancePolicy, VerificationLog)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "References to identity verification policies."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "suspended",
                "revoked"
            ],
            "description": "Operational status of the node."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of node declaration."
        }
    },
    "required": [
        "id",
        "cluster",
        "operator",
        "services",
        "status",
        "timestamp"
    ]
},
  "LanguageConfiguration": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://json.schemastore.org/language-configuration.json",
    "additionalProperties": true,
    "definitions": {
        "regexp": {
            "type": "object",
            "properties": {
                "pattern": {
                    "type": "string"
                },
                "flags": {
                    "type": "string"
                }
            },
            "required": [
                "pattern"
            ]
        },
        "charPair": {
            "type": "array",
            "items": [
                {
                    "type": "string"
                },
                {
                    "type": "string"
                }
            ],
            "minItems": 2,
            "additionalItems": false
        }
    },
    "properties": {
        "comments": {
            "description": "The language's comment settings.",
            "type": "object",
            "properties": {
                "lineComment": {
                    "description": "The line comment token, like `// this is a comment`.",
                    "type": "string"
                },
                "blockComment": {
                    "$ref": "#/definitions/charPair",
                    "description": "The block comment character pair, like `/* block comment *&#47;`"
                }
            }
        },
        "brackets": {
            "description": "The language's brackets.",
            "type": "array",
            "items": {
                "$ref": "#/definitions/charPair"
            }
        },
        "autoClosingPairs": {
            "description": "The language's auto closing pairs. The 'close' character is automatically inserted with the 'open' character is typed.",
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "$ref": "#/definitions/charPair"
                    },
                    {
                        "type": "object",
                        "properties": {
                            "open": {
                                "type": "string"
                            },
                            "close": {
                                "type": "string"
                            },
                            "notIn": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        },
                        "required": [
                            "open",
                            "close"
                        ]
                    }
                ]
            }
        },
        "autoCloseBefore": {
            "description": "What characters must be after the cursor for bracket or quote autoclosing to occur.",
            "type": "string"
        },
        "surroundingPairs": {
            "description": "The language's surrounding pairs. When the 'open' character is typed on a selection, the selected string is surrounded by the open and close characters.",
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "$ref": "#/definitions/charPair"
                    },
                    {
                        "type": "object",
                        "properties": {
                            "open": {
                                "type": "string"
                            },
                            "close": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "open",
                            "close"
                        ]
                    }
                ]
            }
        },
        "folding": {
            "description": "The language's folding rules.",
            "type": "object",
            "properties": {
                "markers": {
                    "description": "Region markers used by the language.",
                    "type": "object",
                    "properties": {
                        "start": {
                            "anyOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "$ref": "#/definitions/regexp"
                                }
                            ]
                        },
                        "end": {
                            "anyOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "$ref": "#/definitions/regexp"
                                }
                            ]
                        }
                    }
                }
            }
        },
        "wordPattern": {
            "description": "The language's word definition.",
            "anyOf": [
                {
                    "type": "string"
                },
                {
                    "$ref": "#/definitions/regexp"
                }
            ]
        },
        "indentationRules": {
            "description": "The language's indentation settings.",
            "type": "object",
            "properties": {
                "decreaseIndentPattern": {
                    "description": "If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).",
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/regexp"
                        }
                    ]
                },
                "increaseIndentPattern": {
                    "description": "If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).",
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/regexp"
                        }
                    ]
                },
                "indentNextLinePattern": {
                    "description": "If a line matches this pattern, then only the next line after it should be indented once.",
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/regexp"
                        }
                    ]
                },
                "unIndentedLinePattern": {
                    "description": "If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.",
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/regexp"
                        }
                    ]
                }
            },
            "required": [
                "decreaseIndentPattern",
                "increaseIndentPattern"
            ]
        },
        "onEnterRules": {
            "description": "The language's rules to be evaluated when pressing Enter.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "beforeText": {
                        "anyOf": [
                            {
                                "type": "string"
                            },
                            {
                                "$ref": "#/definitions/regexp"
                            }
                        ]
                    },
                    "afterText": {
                        "anyOf": [
                            {
                                "type": "string"
                            },
                            {
                                "$ref": "#/definitions/regexp"
                            }
                        ]
                    },
                    "previousLineText": {
                        "anyOf": [
                            {
                                "type": "string"
                            },
                            {
                                "$ref": "#/definitions/regexp"
                            }
                        ]
                    },
                    "action": {
                        "type": "object",
                        "properties": {
                            "indent": {
                                "type": "string",
                                "enum": [
                                    "none",
                                    "indent",
                                    "indentOutdent",
                                    "outdent"
                                ]
                            },
                            "appendText": {
                                "type": "string"
                            },
                            "removeText": {
                                "type": "integer",
                                "minimum": 1
                            }
                        },
                        "required": [
                            "indent"
                        ]
                    }
                },
                "required": [
                    "beforeText",
                    "action"
                ]
            }
        }
    },
    "type": "object",
    "title": "Language configuration",
    "description": "Configuration file for language features in VS Code and Visual Studio."
},
  "NamespaceDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceDeclaration",
    "title": "Namespace Declaration",
    "description": "Defines a namespace as a root authority that can establish trust chains and governance rules for its domain.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the namespace acting as a root authority."
        },
        "type": {
            "const": "NamespaceDeclaration",
            "description": "Indicates this is a Namespace DID declaration."
        },
        "namespaceScope": {
            "type": "string",
            "description": "The domain or scope of this namespace",
            "examples": [
                "originvault.box",
                "content-authenticity.org",
                "academic-credentials.edu",
                "supply-chain.industry"
            ]
        },
        "rootAuthority": {
            "type": "object",
            "properties": {
                "rootType": {
                    "type": "string",
                    "const": "namespace",
                    "description": "This namespace acts as a root authority"
                },
                "trustChainPurpose": {
                    "type": "string",
                    "description": "Primary purpose of trust chains in this namespace",
                    "examples": [
                        "Content authenticity and provenance",
                        "User reputation and verification",
                        "Academic credential verification",
                        "Supply chain transparency"
                    ]
                },
                "delegationPolicy": {
                    "type": "object",
                    "properties": {
                        "allowsTrustedIssuers": {
                            "type": "boolean",
                            "description": "Whether this namespace delegates to trusted issuers"
                        },
                        "requiresAccreditation": {
                            "type": "boolean",
                            "description": "Whether issuers must be accredited by this namespace"
                        },
                        "maxDelegationDepth": {
                            "type": "integer",
                            "minimum": 1,
                            "description": "Maximum depth of delegation chains"
                        }
                    }
                }
            },
            "required": [
                "rootType",
                "trustChainPurpose"
            ]
        },
        "governance": {
            "type": "object",
            "properties": {
                "governanceModel": {
                    "type": "string",
                    "enum": [
                        "self-governed",
                        "dao",
                        "multisig",
                        "committee",
                        "democratic",
                        "consortium"
                    ],
                    "description": "How this namespace makes governance decisions"
                },
                "governingParties": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "DIDs of entities involved in namespace governance"
                },
                "policyFramework": {
                    "type": "string",
                    "description": "Reference to namespace governance policies and procedures"
                }
            },
            "required": [
                "governanceModel"
            ]
        },
        "interoperability": {
            "type": "object",
            "properties": {
                "recognizedNamespaces": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "DIDs of other namespaces this namespace recognizes or federates with"
                },
                "crossNamespaceValidation": {
                    "type": "boolean",
                    "description": "Whether credentials from other namespaces are accepted"
                },
                "federationMember": {
                    "type": "string",
                    "description": "Namespace federation or consortium membership (optional)"
                }
            }
        },
        "termsOfUse": {
            "type": "object",
            "properties": {
                "trustFramework": {
                    "type": "string",
                    "description": "The trust framework for the namespace."
                },
                "trustFrameworkId": {
                    "type": "string",
                    "description": "The ID of the trust framework for the namespace."
                },
                "trustFrameworkVersion": {
                    "type": "string",
                    "description": "The version of the trust framework for the namespace."
                },
                "trustFrameworkUrl": {
                    "type": "string",
                    "description": "The URL of the trust framework for the namespace."
                },
                "trustFrameworkTerms": {
                    "type": "string",
                    "description": "The terms of use for the namespace."
                }
            },
            "required": [
                "trustFramework",
                "trustFrameworkId",
                "trustFrameworkVersion",
                "trustFrameworkUrl",
                "trustFrameworkTerms"
            ]
        },
        "blockchainAnchoring": {
            "type": "object",
            "properties": {
                "blockchainNetwork": {
                    "type": "string",
                    "examples": [
                        "cheqd-mainnet",
                        "ethereum",
                        "polygon"
                    ],
                    "description": "Blockchain network where this namespace is anchored"
                },
                "resourceId": {
                    "type": "string",
                    "description": "Blockchain resource ID for this namespace"
                }
            }
        }
    },
    "required": [
        "id",
        "namespaceScope",
        "rootAuthority",
        "governance",
        "termsOfUse"
    ]
},
  "NamespaceGovernance": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceGovernance",
    "title": "Namespace Governance",
    "description": "Defines governance rules for an OV Namespace.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the namespace governance document."
        },
        "namespace": {
            "type": "string",
            "description": "The DID of the namespace this governance applies to."
        },
        "governanceModel": {
            "type": "string",
            "enum": [
                "AdminControlled",
                "TokenVoting",
                "MultiSig"
            ],
            "description": "The governance model used to manage this namespace."
        },
        "governanceBodies": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "DID of a governance body (e.g., DAO, committee, council)."
                    },
                    "role": {
                        "type": "string",
                        "description": "The role of this body (e.g., Validator, Arbiter)."
                    }
                }
            },
            "description": "List of governing entities managing this namespace."
        },
        "decisionMaking": {
            "type": "object",
            "properties": {
                "votingThreshold": {
                    "type": "number",
                    "description": "Percentage required for approval in voting-based governance."
                },
                "proposalProcess": {
                    "type": "string",
                    "description": "Reference to a Ceramic document explaining the proposal submission process."
                }
            },
            "description": "Rules for decision-making in the namespace."
        },
        "disputeResolution": {
            "type": "object",
            "properties": {
                "resolutionMethod": {
                    "type": "string",
                    "enum": [
                        "Arbitration",
                        "GovernanceVote",
                        "SmartContract"
                    ],
                    "description": "Method used to resolve disputes."
                },
                "resolutionService": {
                    "type": "string",
                    "description": "The DID of a dispute resolution service or contract."
                }
            },
            "description": "How governance disputes are resolved."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this governance document was issued."
        }
    },
    "required": [
        "id",
        "namespace",
        "governanceModel",
        "governanceBodies",
        "timestamp"
    ]
},
  "NamespaceParticipationAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceParticipationAgreement",
    "title": "Namespace Participation Agreement",
    "description": "Defines the terms for joining a namespace in the OV ecosystem.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "namespaceId": {
            "type": "string",
            "description": "DID of the namespace being joined."
        },
        "participantId": {
            "type": "string",
            "description": "DID of the participant (Vault, Node, or Cluster)."
        },
        "role": {
            "type": "string",
            "enum": [
                "Vault",
                "Node",
                "Cluster"
            ],
            "description": "The role of the participant within the namespace."
        },
        "complianceRequirements": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of governance and verification requirements for participation."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions under which a participant can be removed from the namespace."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the participant has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "namespaceId",
        "participantId",
        "role",
        "complianceRequirements",
        "revocationPolicy",
        "agreementSigned",
        "timestamp"
    ]
},
  "NamespacePluginDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespacePluginDeclaration",
    "title": "Namespace Plugin Declaration",
    "description": "Declares a plugin registered under a namespace.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the namespace plugin."
        },
        "namespace": {
            "type": "string",
            "description": "The DID of the namespace that owns this plugin."
        },
        "name": {
            "type": "string",
            "description": "Name of the plugin."
        },
        "version": {
            "type": "string",
            "description": "Semantic versioning (e.g., 1.0.0)."
        },
        "author": {
            "type": "string",
            "description": "DID of the entity or user who created the plugin."
        },
        "compatibleNodes": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "enum": [
                "IdentityNode",
                "StorageNode",
                "ComputeNode",
                "VerificationNode"
            ],
            "description": "The node types this plugin is designed to run on."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The id of the linked resource."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., governance, metadata, event log)."
                    }
                },
                "required": [
                    "id",
                    "type"
                ]
            },
            "description": "References to plugin documentation, code, or policies."
        },
        "governance": {
            "type": "object",
            "properties": {
                "approvedBy": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of governance bodies or validators that approved the plugin."
                },
                "complianceRules": {
                    "type": "string",
                    "description": "Reference to compliance policies stored in Ceramic."
                }
            },
            "description": "Governance and compliance information for the plugin."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "deprecated",
                "revoked"
            ],
            "description": "Current status of the plugin."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this plugin declaration was issued."
        }
    },
    "required": [
        "id",
        "namespace",
        "name",
        "version",
        "author",
        "compatibleNodes",
        "status",
        "timestamp"
    ]
},
  "NamespaceProposal": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceProposal",
    "title": "Namespace Proposal",
    "description": "Defines a proposal for governance, updates, or policy changes in an OV namespace.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "DID of the proposal."
        },
        "namespace": {
            "type": "string",
            "description": "DID of the namespace where the proposal is made."
        },
        "proposer": {
            "type": "string",
            "description": "DID of the entity making the proposal."
        },
        "proposalType": {
            "type": "string",
            "enum": [
                "governance-change",
                "policy-update",
                "feature-addition",
                "plugin-approval",
                "other"
            ],
            "description": "Type of proposal."
        },
        "description": {
            "type": "string",
            "description": "Detailed explanation of the proposal."
        },
        "status": {
            "type": "string",
            "enum": [
                "pending",
                "approved",
                "rejected",
                "executed"
            ],
            "description": "Current status of the proposal."
        },
        "votes": {
            "type": "object",
            "properties": {
                "yes": {
                    "type": "number",
                    "description": "Number of votes in favor."
                },
                "no": {
                    "type": "number",
                    "description": "Number of votes against."
                },
                "abstain": {
                    "type": "number",
                    "description": "Number of abstentions."
                }
            },
            "description": "Voting results for the proposal."
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the proposal was created."
        },
        "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "Expiration date for voting on the proposal."
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof for the proposal.",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Proof type (e.g., EdDSA Signature, zk-SNARK Proof)."
                },
                "created": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of proof creation."
                },
                "verificationMethod": {
                    "type": "string",
                    "description": "DID or method used to verify this proof."
                },
                "signatureValue": {
                    "type": "string",
                    "description": "Base64 or hex-encoded signature."
                }
            }
        }
    },
    "required": [
        "id",
        "namespace",
        "proposer",
        "proposalType",
        "description",
        "status",
        "votes",
        "createdAt",
        "expiresAt",
        "proof"
    ]
},
  "NamespaceRecognitionCertificate": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceRecognitionCertificate",
    "title": "Namespace Recognition Certificate",
    "description": "A verifiable certificate that recognizes an entity’s role or contribution within a namespace.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "DID of the Recognition Certificate."
        },
        "namespace": {
            "type": "string",
            "description": "DID of the namespace issuing the certificate."
        },
        "recipient": {
            "type": "string",
            "description": "DID of the recognized entity."
        },
        "recognitionType": {
            "type": "string",
            "enum": [
                "trusted-verifier",
                "major-contributor",
                "governance-member",
                "partner"
            ],
            "description": "Type of recognition granted."
        },
        "description": {
            "type": "string",
            "description": "Additional details on why this recognition was granted."
        },
        "validUntil": {
            "type": "string",
            "format": "date-time",
            "description": "Optional expiration date of the recognition certificate."
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof for the certificate.",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Proof type."
                },
                "created": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of proof creation."
                },
                "verificationMethod": {
                    "type": "string",
                    "description": "DID or method used to verify this proof."
                },
                "signatureValue": {
                    "type": "string",
                    "description": "Base64 or hex-encoded signature."
                }
            }
        }
    },
    "required": [
        "id",
        "namespace",
        "recipient",
        "recognitionType",
        "proof"
    ]
},
  "NamespaceReputationRecord": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NamespaceReputationRecord",
    "title": "Namespace Reputation Record",
    "description": "Verifiable record of an entity's reputation within a namespace, including trust scores and endorsements.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "DID of the Reputation Record."
        },
        "namespace": {
            "type": "string",
            "description": "DID of the namespace issuing the reputation record."
        },
        "entity": {
            "type": "string",
            "description": "DID of the entity whose reputation is being recorded."
        },
        "trustScore": {
            "type": "number",
            "minimum": 0,
            "maximum": 100,
            "description": "Numerical representation of the entity’s reputation within the namespace."
        },
        "contributions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "description": "Nature of contribution (e.g., governance vote, data contribution, content verification)."
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date of contribution."
                    },
                    "verifiedBy": {
                        "type": "string",
                        "description": "DID of entity that verified this contribution."
                    }
                },
                "required": [
                    "type",
                    "date",
                    "verifiedBy"
                ]
            },
            "description": "List of contributions made by the entity."
        },
        "endorsements": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "from": {
                        "type": "string",
                        "description": "DID of the entity giving the endorsement."
                    },
                    "message": {
                        "type": "string",
                        "description": "Optional endorsement message."
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date of endorsement."
                    }
                },
                "required": [
                    "from",
                    "date"
                ]
            },
            "description": "Endorsements received from other trusted entities."
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof for this reputation record.",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "Proof type (e.g., JSON-LD Signature, EdDSA Signature, zk-SNARK Proof)."
                },
                "created": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of proof creation."
                },
                "verificationMethod": {
                    "type": "string",
                    "description": "DID or method used to verify this proof."
                },
                "signatureValue": {
                    "type": "string",
                    "description": "Base64 or hex-encoded signature."
                }
            },
            "required": [
                "type",
                "created",
                "verificationMethod",
                "signatureValue"
            ]
        }
    },
    "required": [
        "id",
        "namespace",
        "entity",
        "trustScore",
        "contributions",
        "endorsements",
        "proof"
    ]
},
  "NodeClusterDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NodeClusterDeclaration",
    "title": "Node Cluster Declaration",
    "description": "Defines an OV Cluster's structure, governance, and node configuration.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the OV Cluster."
        },
        "type": {
            "const": "ClusterDeclaration",
            "description": "Indicates that this is a Cluster DID declaration."
        },
        "namespace": {
            "type": "string",
            "description": "The DID of the namespace this cluster belongs to."
        },
        "governance": {
            "type": "object",
            "properties": {
                "managedBy": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "DIDs of entities responsible for managing this cluster."
                },
                "rules": {
                    "type": "string",
                    "description": "A reference to governance rules stored in Ceramic or DID-Linked Resources."
                },
                "disputeResolution": {
                    "type": "string",
                    "description": "A DID reference to a dispute resolution service."
                }
            },
            "description": "Governance policies for this cluster."
        },
        "nodes": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The Node DID."
                    },
                    "role": {
                        "type": "string",
                        "enum": [
                            "NamespaceNode",
                            "IdentityNode",
                            "StorageNode",
                            "ComputeNode",
                            "VerificationNode"
                        ],
                        "description": "The functional role of this node."
                    }
                },
                "required": [
                    "id",
                    "role"
                ]
            },
            "description": "List of nodes in this cluster."
        },
        "services": {
            "type": "object",
            "properties": {
                "verification": {
                    "type": "string",
                    "description": "The DID of the verification service."
                },
                "storage": {
                    "type": "string",
                    "description": "The DID of the storage service."
                },
                "payment": {
                    "type": "string",
                    "description": "The DID of the payment processing service."
                }
            },
            "description": "Services available in this cluster."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The id of the linked resource."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., governance, metadata, event log)."
                    }
                },
                "required": [
                    "id",
                    "type"
                ]
            },
            "description": "Linked resources associated with this cluster."
        },
        "verificationPolicies": {
            "type": "object",
            "properties": {
                "nodeVerification": {
                    "type": "string",
                    "enum": [
                        "Open",
                        "Permissioned",
                        "Staked"
                    ],
                    "description": "Defines how new nodes are verified."
                },
                "revocationPolicy": {
                    "type": "string",
                    "description": "Conditions under which a node or vault can be revoked from the cluster."
                }
            },
            "description": "Verification and security policies for the cluster."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this cluster declaration was issued."
        }
    },
    "required": [
        "id",
        "namespace",
        "nodes",
        "services",
        "verificationPolicies",
        "timestamp"
    ]
},
  "NodeDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NodeDeclaration",
    "title": "Node Declaration",
    "description": "Defines an OV Node within a cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the node."
        },
        "type": {
            "const": "NodeDeclaration",
            "description": "Indicates this is a Node DID declaration."
        },
        "cluster": {
            "type": "string",
            "description": "The Cluster DID this node belongs to."
        },
        "role": {
            "type": "string",
            "enum": [
                "IdentityNode",
                "StorageNode",
                "ComputeNode",
                "VerificationNode"
            ],
            "description": "The functional role of this node."
        },
        "operator": {
            "type": "string",
            "description": "The DID of the entity that operates this node."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "suspended",
                "revoked"
            ],
            "description": "The operational status of the node."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., GovernancePolicy, VerificationLog)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "Linked resources associated with this node."
        },
        "verificationPolicies": {
            "type": "object",
            "properties": {
                "assignedBy": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of validators who approved this node."
                },
                "verificationRules": {
                    "type": "string",
                    "description": "Reference to verification policies in Ceramic."
                }
            },
            "description": "Verification details for this node."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this node declaration was issued."
        }
    },
    "required": [
        "id",
        "type",
        "cluster",
        "role",
        "operator",
        "status",
        "timestamp"
    ]
},
  "NodeOperatorAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/NodeOperatorAgreement",
    "title": "Node Operator Agreement",
    "description": "Defines the responsibilities of an OV Node operator within a Cluster.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "nodeId": {
            "type": "string",
            "description": "DID of the Node."
        },
        "clusterId": {
            "type": "string",
            "description": "DID of the Cluster the Node is part of."
        },
        "nodeType": {
            "type": "string",
            "enum": [
                "Identity",
                "Storage",
                "Compute",
                "Verification"
            ],
            "description": "The role of the Node within the Cluster."
        },
        "performanceRequirements": {
            "type": "object",
            "properties": {
                "uptime": {
                    "type": "number",
                    "description": "Minimum required uptime percentage."
                },
                "latency": {
                    "type": "number",
                    "description": "Maximum response latency allowed."
                }
            }
        },
        "dataHandlingRules": {
            "type": "string",
            "description": "Compliance requirements for handling data within the node."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions under which the node can be removed from the Cluster."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the Node Operator has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "nodeId",
        "clusterId",
        "nodeType",
        "performanceRequirements",
        "dataHandlingRules",
        "revocationPolicy",
        "agreementSigned",
        "timestamp"
    ]
},
  "NodeVoting": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/NodeVotingConsensusAgreement",
    "title": "Node Voting & Consensus Agreement",
    "description": "Defines voting mechanisms for governance decisions in OriginVault clusters.",
    "type": "object",
    "properties": {
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "clusterId": {
            "type": "string",
            "description": "DID of the Cluster where voting occurs."
        },
        "nodeId": {
            "type": "string",
            "description": "DID of the participating node."
        },
        "voteType": {
            "type": "string",
            "enum": [
                "Governance Policy",
                "New Namespace Approval",
                "Node Sanctions"
            ],
            "description": "The type of vote being cast."
        },
        "votingMethod": {
            "type": "string",
            "enum": [
                "One Node, One Vote",
                "Stake-Weighted",
                "Reputation-Based"
            ],
            "description": "Defines how voting power is determined."
        },
        "minimumQuorum": {
            "type": "number",
            "description": "The minimum percentage of nodes required for the vote to be valid."
        },
        "decisionThreshold": {
            "type": "number",
            "description": "The percentage required to approve a decision."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Under what conditions a vote result can be invalidated."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the node has agreed to the governance process."
        }
    },
    "required": [
        "agreementId",
        "clusterId",
        "nodeId",
        "voteType",
        "votingMethod",
        "minimumQuorum",
        "decisionThreshold",
        "revocationPolicy",
        "agreementSigned"
    ]
},
  "Owner": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.box"
    ],
    "$id": "https://schemas.originvault.box/Owner",
    "title": "Owner",
    "description": "Defines an owner role for vaults, plugins, and namespaces.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "Person",
                "Organization"
            ],
            "description": "Schema.org type"
        },
        "ownerId": {
            "type": "string",
            "description": "DID of the owner."
        },
        "ownsVaults": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of vaults owned by this persona."
            }
        },
        "ownsPlugins": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of plugins owned by this persona."
            }
        },
        "ownsNamespaces": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of namespaces owned by this persona."
            }
        },
        "delegatedAdmins": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of admins granted management permissions."
            }
        },
        "monetizationModel": {
            "type": "object",
            "properties": {
                "revenueStreams": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "description": "Types of revenue models (e.g., subscription, licensing fees, transaction fees)."
                    }
                },
                "payoutSchedule": {
                    "type": "string",
                    "description": "Schedule for revenue payouts."
                }
            }
        },
        "disputeResolutionMethod": {
            "type": "string",
            "enum": [
                "DAO Governance",
                "Legal Arbitration",
                "Community Voting"
            ],
            "description": "Method for resolving ownership disputes."
        },
        "transferPolicy": {
            "type": "string",
            "description": "Rules governing how ownership can be transferred."
        }
    },
    "required": [
        "ownerId",
        "ownsVaults",
        "ownsPlugins",
        "ownsNamespaces"
    ]
},
  "PackageJson": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://json.schemastore.org/package.json",
    "title": "PackageJson",
    "definitions": {
        "person": {
            "description": "A person who has been involved in creating or maintaining this package.",
            "type": [
                "object",
                "string"
            ],
            "required": [
                "name"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "url": {
                    "type": "string",
                    "format": "uri"
                },
                "email": {
                    "type": "string",
                    "format": "email"
                }
            }
        },
        "dependency": {
            "description": "Dependencies are specified with a simple hash of package name to version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.",
            "type": "object",
            "additionalProperties": {
                "type": "string"
            }
        },
        "devDependency": {
            "description": "Specifies dependencies that are required for the development and testing of the project. These dependencies are not needed in the production environment.",
            "type": "object",
            "additionalProperties": {
                "type": "string"
            }
        },
        "optionalDependency": {
            "description": "Specifies dependencies that are optional for your project. These dependencies are attempted to be installed during the npm install process, but if they fail to install, the installation process will not fail.",
            "type": "object",
            "additionalProperties": {
                "type": "string"
            }
        },
        "peerDependency": {
            "description": "Specifies dependencies that are required by the package but are expected to be provided by the consumer of the package.",
            "type": "object",
            "additionalProperties": {
                "type": "string"
            }
        },
        "peerDependencyMeta": {
            "description": "When a user installs your package, warnings are emitted if packages specified in \"peerDependencies\" are not already installed. The \"peerDependenciesMeta\" field serves to provide more information on how your peer dependencies are utilized. Most commonly, it allows peer dependencies to be marked as optional. Metadata for this field is specified with a simple hash of the package name to a metadata object.",
            "type": "object",
            "additionalProperties": {
                "type": "object",
                "additionalProperties": true,
                "properties": {
                    "optional": {
                        "description": "Specifies that this peer dependency is optional and should not be installed automatically.",
                        "type": "boolean"
                    }
                }
            }
        },
        "license": {
            "anyOf": [
                {
                    "type": "string"
                },
                {
                    "enum": [
                        "AGPL-3.0-only",
                        "Apache-2.0",
                        "BSD-2-Clause",
                        "BSD-3-Clause",
                        "BSL-1.0",
                        "CC0-1.0",
                        "CDDL-1.0",
                        "CDDL-1.1",
                        "EPL-1.0",
                        "EPL-2.0",
                        "GPL-2.0-only",
                        "GPL-3.0-only",
                        "ISC",
                        "LGPL-2.0-only",
                        "LGPL-2.1-only",
                        "LGPL-2.1-or-later",
                        "LGPL-3.0-only",
                        "LGPL-3.0-or-later",
                        "MIT",
                        "MPL-2.0",
                        "MS-PL",
                        "UNLICENSED"
                    ]
                }
            ]
        },
        "scriptsInstallAfter": {
            "description": "Run AFTER the package is installed.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsPublishAfter": {
            "description": "Run AFTER the package is published.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsRestart": {
            "description": "Run by the 'npm restart' command. Note: 'npm restart' will run the stop and start scripts if no restart script is provided.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsStart": {
            "description": "Run by the 'npm start' command.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsStop": {
            "description": "Run by the 'npm stop' command.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsTest": {
            "description": "Run by the 'npm test' command.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsUninstallBefore": {
            "description": "Run BEFORE the package is uninstalled.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "scriptsVersionBefore": {
            "description": "Run BEFORE bump the package version.",
            "type": "string",
            "x-intellij-language-injection": "Shell Script"
        },
        "packageExportsEntryPath": {
            "type": [
                "string",
                "null"
            ],
            "description": "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.",
            "pattern": "^\\./"
        },
        "packageExportsEntryObject": {
            "type": "object",
            "description": "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.",
            "properties": {
                "require": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function."
                },
                "import": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function."
                },
                "node": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved when this environment is Node.js."
                },
                "default": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved when no other export type matches."
                },
                "types": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported."
                }
            },
            "patternProperties": {
                "^[^.0-9]+$": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved when this environment matches the property name."
                },
                "^types@.+$": {
                    "$ref": "#/definitions/packageExportsEntryOrFallback",
                    "description": "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported."
                }
            },
            "additionalProperties": false
        },
        "packageExportsEntry": {
            "oneOf": [
                {
                    "$ref": "#/definitions/packageExportsEntryPath"
                },
                {
                    "$ref": "#/definitions/packageExportsEntryObject"
                }
            ]
        },
        "packageExportsFallback": {
            "type": "array",
            "description": "Used to allow fallbacks in case this environment doesn't support the preceding entries.",
            "items": {
                "$ref": "#/definitions/packageExportsEntry"
            }
        },
        "packageExportsEntryOrFallback": {
            "oneOf": [
                {
                    "$ref": "#/definitions/packageExportsEntry"
                },
                {
                    "$ref": "#/definitions/packageExportsFallback"
                }
            ]
        },
        "packageImportsEntryPath": {
            "type": [
                "string",
                "null"
            ],
            "description": "The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module."
        },
        "packageImportsEntryObject": {
            "type": "object",
            "description": "Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.",
            "properties": {
                "require": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function."
                },
                "import": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function."
                },
                "node": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when this environment is Node.js."
                },
                "default": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when no other export type matches."
                },
                "types": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported."
                }
            },
            "patternProperties": {
                "^[^.0-9]+$": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when this environment matches the property name."
                },
                "^types@.+$": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned \"types\" condition in the form \"types@{selector}\" are supported."
                }
            },
            "additionalProperties": false
        },
        "packageImportsEntry": {
            "oneOf": [
                {
                    "$ref": "#/definitions/packageImportsEntryPath"
                },
                {
                    "$ref": "#/definitions/packageImportsEntryObject"
                }
            ]
        },
        "packageImportsFallback": {
            "type": "array",
            "description": "Used to allow fallbacks in case this environment doesn't support the preceding entries.",
            "items": {
                "$ref": "#/definitions/packageImportsEntry"
            }
        },
        "packageImportsEntryOrFallback": {
            "oneOf": [
                {
                    "$ref": "#/definitions/packageImportsEntry"
                },
                {
                    "$ref": "#/definitions/packageImportsFallback"
                }
            ]
        },
        "fundingUrl": {
            "type": "string",
            "format": "uri",
            "description": "URL to a website with details about how to fund the package."
        },
        "fundingWay": {
            "type": "object",
            "description": "Used to inform about ways to help fund development of the package.",
            "properties": {
                "url": {
                    "$ref": "#/definitions/fundingUrl"
                },
                "type": {
                    "type": "string",
                    "description": "The type of funding or the platform through which funding can be provided, e.g. patreon, opencollective, tidelift or github."
                }
            },
            "additionalProperties": false,
            "required": [
                "url"
            ]
        }
    },
    "type": "object",
    "patternProperties": {
        "^_": {
            "description": "Any property starting with _ is valid.",
            "tsType": "any"
        }
    },
    "properties": {
        "name": {
            "description": "The name of the package.",
            "type": "string",
            "maxLength": 214,
            "minLength": 1,
            "pattern": "^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$"
        },
        "version": {
            "description": "Version must be parsable by node-semver, which is bundled with npm as a dependency.",
            "type": "string"
        },
        "description": {
            "description": "This helps people discover your package, as it's listed in 'npm search'.",
            "type": "string"
        },
        "keywords": {
            "description": "This helps people discover your package as it's listed in 'npm search'.",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "homepage": {
            "description": "The url to the project homepage.",
            "type": "string"
        },
        "bugs": {
            "description": "The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.",
            "type": [
                "object",
                "string"
            ],
            "properties": {
                "url": {
                    "type": "string",
                    "description": "The url to your project's issue tracker.",
                    "format": "uri"
                },
                "email": {
                    "type": "string",
                    "description": "The email address to which issues should be reported.",
                    "format": "email"
                }
            }
        },
        "license": {
            "$ref": "#/definitions/license",
            "description": "You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it."
        },
        "licenses": {
            "description": "DEPRECATED: Instead, use SPDX expressions, like this: { \"license\": \"ISC\" } or { \"license\": \"(MIT OR Apache-2.0)\" } see: 'https://docs.npmjs.com/files/package.json#license'.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {
                        "$ref": "#/definitions/license"
                    },
                    "url": {
                        "type": "string",
                        "format": "uri"
                    }
                }
            }
        },
        "author": {
            "$ref": "#/definitions/person"
        },
        "contributors": {
            "description": "A list of people who contributed to this package.",
            "type": "array",
            "items": {
                "$ref": "#/definitions/person"
            }
        },
        "maintainers": {
            "description": "A list of people who maintains this package.",
            "type": "array",
            "items": {
                "$ref": "#/definitions/person"
            }
        },
        "files": {
            "description": "The 'files' field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder.",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "main": {
            "description": "The main field is a module ID that is the primary entry point to your program.",
            "type": "string"
        },
        "exports": {
            "description": "The \"exports\" field is used to restrict external access to non-exported module files, also enables a module to import itself using \"name\".",
            "oneOf": [
                {
                    "$ref": "#/definitions/packageExportsEntryPath",
                    "description": "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field."
                },
                {
                    "type": "object",
                    "properties": {
                        ".": {
                            "$ref": "#/definitions/packageExportsEntryOrFallback",
                            "description": "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field."
                        }
                    },
                    "patternProperties": {
                        "^\\./.+": {
                            "$ref": "#/definitions/packageExportsEntryOrFallback",
                            "description": "The module path prefix that is resolved when the module specifier starts with \"name/\", set to \"./*\" to allow external modules to import any subpath."
                        }
                    },
                    "additionalProperties": false
                },
                {
                    "$ref": "#/definitions/packageExportsEntryObject",
                    "description": "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field."
                },
                {
                    "$ref": "#/definitions/packageExportsFallback",
                    "description": "The module path that is resolved when the module specifier matches \"name\", shadows the \"main\" field."
                }
            ]
        },
        "imports": {
            "description": "The \"imports\" field is used to create private mappings that only apply to import specifiers from within the package itself.",
            "type": "object",
            "patternProperties": {
                "^#.+$": {
                    "$ref": "#/definitions/packageImportsEntryOrFallback",
                    "description": "The module path that is resolved when this environment matches the property name."
                }
            },
            "additionalProperties": false
        },
        "bin": {
            "type": [
                "string",
                "object"
            ],
            "additionalProperties": {
                "type": "string"
            }
        },
        "type": {
            "description": "When set to \"module\", the type field allows a package to specify all .js files within are ES modules. If the \"type\" field is omitted or set to \"commonjs\", all .js files are treated as CommonJS.",
            "type": "string",
            "enum": [
                "commonjs",
                "module"
            ],
            "default": "commonjs"
        },
        "types": {
            "description": "Set the types property to point to your bundled declaration file.",
            "type": "string"
        },
        "typings": {
            "description": "Note that the \"typings\" field is synonymous with \"types\", and could be used as well.",
            "type": "string"
        },
        "typesVersions": {
            "description": "The \"typesVersions\" field is used since TypeScript 3.1 to support features that were only made available in newer TypeScript versions.",
            "type": "object",
            "additionalProperties": {
                "description": "Contains overrides for the TypeScript version that matches the version range matching the property key.",
                "type": "object",
                "properties": {
                    "*": {
                        "description": "Maps all file paths to the file paths specified in the array.",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "pattern": "^[^*]*(?:\\*[^*]*)?$"
                        }
                    }
                },
                "patternProperties": {
                    "^[^*]+$": {
                        "description": "Maps the file path matching the property key to the file paths specified in the array.",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "^[^*]*\\*[^*]*$": {
                        "description": "Maps file paths matching the pattern specified in property key to file paths specified in the array.",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "pattern": "^[^*]*(?:\\*[^*]*)?$"
                        }
                    }
                },
                "additionalProperties": false
            }
        },
        "man": {
            "type": [
                "array",
                "string"
            ],
            "description": "Specify either a single file or an array of filenames to put in place for the man program to find.",
            "items": {
                "type": "string"
            }
        },
        "directories": {
            "type": "object",
            "properties": {
                "bin": {
                    "description": "If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash.",
                    "type": "string"
                },
                "doc": {
                    "description": "Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.",
                    "type": "string"
                },
                "example": {
                    "description": "Put example scripts in here. Someday, it might be exposed in some clever way.",
                    "type": "string"
                },
                "lib": {
                    "description": "Tell people where the bulk of your library is. Nothing special is done with the lib folder in any way, but it's useful meta info.",
                    "type": "string"
                },
                "man": {
                    "description": "A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.",
                    "type": "string"
                },
                "test": {
                    "type": "string"
                }
            }
        },
        "repository": {
            "description": "Specify the place where your code lives. This is helpful for people who want to contribute.",
            "type": [
                "object",
                "string"
            ],
            "properties": {
                "type": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "directory": {
                    "type": "string"
                }
            }
        },
        "funding": {
            "oneOf": [
                {
                    "$ref": "#/definitions/fundingUrl"
                },
                {
                    "$ref": "#/definitions/fundingWay"
                },
                {
                    "type": "array",
                    "items": {
                        "oneOf": [
                            {
                                "$ref": "#/definitions/fundingUrl"
                            },
                            {
                                "$ref": "#/definitions/fundingWay"
                            }
                        ]
                    },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "scripts": {
            "description": "The 'scripts' member is an object hash of script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.",
            "type": "object",
            "properties": {
                "lint": {
                    "type": "string",
                    "description": "Run code quality tools, e.g. ESLint, TSLint, etc."
                },
                "prepublish": {
                    "type": "string",
                    "description": "Run BEFORE the package is published (Also run on local npm install without any arguments)."
                },
                "prepare": {
                    "type": "string",
                    "description": "Runs BEFORE the package is packed, i.e. during \"npm publish\" and \"npm pack\", and on local \"npm install\" without any arguments. This is run AFTER \"prepublish\", but BEFORE \"prepublishOnly\"."
                },
                "prepublishOnly": {
                    "type": "string",
                    "description": "Run BEFORE the package is prepared and packed, ONLY on npm publish."
                },
                "prepack": {
                    "type": "string",
                    "description": "run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies)."
                },
                "postpack": {
                    "type": "string",
                    "description": "Run AFTER the tarball has been generated and moved to its final destination."
                },
                "publish": {
                    "type": "string",
                    "description": "Publishes a package to the registry so that it can be installed by name. See https://docs.npmjs.com/cli/v8/commands/npm-publish"
                },
                "postpublish": {
                    "$ref": "#/definitions/scriptsPublishAfter"
                },
                "preinstall": {
                    "type": "string",
                    "description": "Run BEFORE the package is installed."
                },
                "install": {
                    "$ref": "#/definitions/scriptsInstallAfter"
                },
                "postinstall": {
                    "$ref": "#/definitions/scriptsInstallAfter"
                },
                "preuninstall": {
                    "$ref": "#/definitions/scriptsUninstallBefore"
                },
                "uninstall": {
                    "$ref": "#/definitions/scriptsUninstallBefore"
                },
                "postuninstall": {
                    "type": "string",
                    "description": "Run AFTER the package is uninstalled."
                },
                "preversion": {
                    "$ref": "#/definitions/scriptsVersionBefore"
                },
                "version": {
                    "$ref": "#/definitions/scriptsVersionBefore"
                },
                "postversion": {
                    "type": "string",
                    "description": "Run AFTER bump the package version."
                },
                "pretest": {
                    "$ref": "#/definitions/scriptsTest"
                },
                "test": {
                    "$ref": "#/definitions/scriptsTest"
                },
                "posttest": {
                    "$ref": "#/definitions/scriptsTest"
                },
                "prestop": {
                    "$ref": "#/definitions/scriptsStop"
                },
                "stop": {
                    "$ref": "#/definitions/scriptsStop"
                },
                "poststop": {
                    "$ref": "#/definitions/scriptsStop"
                },
                "prestart": {
                    "$ref": "#/definitions/scriptsStart"
                },
                "start": {
                    "$ref": "#/definitions/scriptsStart"
                },
                "poststart": {
                    "$ref": "#/definitions/scriptsStart"
                },
                "prerestart": {
                    "$ref": "#/definitions/scriptsRestart"
                },
                "restart": {
                    "$ref": "#/definitions/scriptsRestart"
                },
                "postrestart": {
                    "$ref": "#/definitions/scriptsRestart"
                },
                "serve": {
                    "type": "string",
                    "description": "Start dev server to serve application files"
                }
            },
            "additionalProperties": {
                "type": "string",
                "tsType": "string | undefined",
                "x-intellij-language-injection": "Shell Script"
            }
        },
        "config": {
            "description": "A 'config' hash can be used to set configuration parameters used in package scripts that persist across upgrades.",
            "type": "object",
            "additionalProperties": true
        },
        "dependencies": {
            "$ref": "#/definitions/dependency"
        },
        "devDependencies": {
            "$ref": "#/definitions/devDependency"
        },
        "optionalDependencies": {
            "$ref": "#/definitions/optionalDependency"
        },
        "peerDependencies": {
            "$ref": "#/definitions/peerDependency"
        },
        "peerDependenciesMeta": {
            "$ref": "#/definitions/peerDependencyMeta"
        },
        "bundleDependencies": {
            "description": "Array of package names that will be bundled when publishing the package.",
            "oneOf": [
                {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                {
                    "type": "boolean"
                }
            ]
        },
        "bundledDependencies": {
            "description": "DEPRECATED: This field is honored, but \"bundleDependencies\" is the correct field name.",
            "oneOf": [
                {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                {
                    "type": "boolean"
                }
            ]
        },
        "resolutions": {
            "description": "Resolutions is used to support selective version resolutions using yarn, which lets you define custom package versions or ranges inside your dependencies. For npm, use overrides instead. See: https://classic.yarnpkg.com/en/docs/selective-version-resolutions",
            "type": "object"
        },
        "overrides": {
            "description": "Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies. For yarn, use resolutions instead. See: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides",
            "type": "object"
        },
        "packageManager": {
            "description": "Defines which package manager is expected to be used when working on the current project. This field is currently experimental and needs to be opted-in; see https://nodejs.org/api/corepack.html",
            "type": "string",
            "pattern": "(npm|pnpm|yarn|bun)@\\d+\\.\\d+\\.\\d+(-.+)?"
        },
        "engines": {
            "type": "object",
            "properties": {
                "node": {
                    "type": "string"
                }
            },
            "additionalProperties": {
                "type": "string"
            }
        },
        "volta": {
            "description": "Defines which tools and versions are expected to be used when Volta is installed.",
            "type": "object",
            "properties": {
                "extends": {
                    "description": "The value of that entry should be a path to another JSON file which also has a \"volta\" section",
                    "type": "string"
                }
            },
            "patternProperties": {
                "(node|npm|pnpm|yarn)": {
                    "type": "string"
                }
            }
        },
        "engineStrict": {
            "type": "boolean"
        },
        "os": {
            "description": "Specify which operating systems your module will run on.",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "cpu": {
            "description": "Specify that your code only runs on certain cpu architectures.",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "preferGlobal": {
            "type": "boolean",
            "description": "DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is purely there for informational purposes. It is now recommended that you install any binaries as local devDependencies wherever possible."
        },
        "private": {
            "description": "If set to true, then npm will refuse to publish it.",
            "oneOf": [
                {
                    "type": "boolean"
                },
                {
                    "enum": [
                        "false",
                        "true"
                    ]
                }
            ]
        },
        "publishConfig": {
            "type": "object",
            "properties": {
                "access": {
                    "type": "string",
                    "enum": [
                        "public",
                        "restricted"
                    ]
                },
                "tag": {
                    "type": "string"
                },
                "registry": {
                    "type": "string",
                    "format": "uri"
                },
                "provenance": {
                    "type": "boolean"
                }
            },
            "additionalProperties": true
        },
        "dist": {
            "type": "object",
            "properties": {
                "shasum": {
                    "type": "string"
                },
                "tarball": {
                    "type": "string"
                }
            }
        },
        "readme": {
            "type": "string"
        },
        "module": {
            "description": "An ECMAScript module ID that is the primary entry point to your program.",
            "type": "string"
        },
        "esnext": {
            "description": "A module ID with untranspiled code that is the primary entry point to your program.",
            "type": [
                "string",
                "object"
            ],
            "properties": {
                "main": {
                    "type": "string"
                },
                "browser": {
                    "type": "string"
                }
            },
            "additionalProperties": {
                "type": "string"
            }
        },
        "workspaces": {
            "description": "Allows packages within a directory to depend on one another using direct linking of local files. Additionally, dependencies within a workspace are hoisted to the workspace root when possible to reduce duplication. Note: It's also a good idea to set \"private\" to true when using this feature.",
            "anyOf": [
                {
                    "type": "array",
                    "description": "Workspace package paths. Glob patterns are supported.",
                    "items": {
                        "type": "string"
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "packages": {
                            "type": "array",
                            "description": "Workspace package paths. Glob patterns are supported.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "nohoist": {
                            "type": "array",
                            "description": "Packages to block from hoisting to the workspace root. Currently only supported in Yarn only.",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                }
            ]
        },
        "jspm": {
            "$ref": "#"
        },
        "eslintConfig": {
            "$ref": "https://json.schemastore.org/eslintrc.json"
        },
        "prettier": {
            "$ref": "https://json.schemastore.org/prettierrc.json"
        },
        "stylelint": {
            "$ref": "https://json.schemastore.org/stylelintrc.json"
        },
        "ava": {
            "$ref": "https://json.schemastore.org/ava.json"
        },
        "release": {
            "$ref": "https://json.schemastore.org/semantic-release.json"
        },
        "jscpd": {
            "$ref": "https://json.schemastore.org/jscpd.json"
        },
        "pnpm": {
            "description": "Defines pnpm specific configuration.",
            "type": "object",
            "properties": {
                "overrides": {
                    "description": "Used to override any dependency in the dependency graph.",
                    "type": "object"
                },
                "packageExtensions": {
                    "description": "Used to extend the existing package definitions with additional information.",
                    "type": "object",
                    "patternProperties": {
                        "^.+$": {
                            "type": "object",
                            "properties": {
                                "dependencies": {
                                    "$ref": "#/definitions/dependency"
                                },
                                "optionalDependencies": {
                                    "$ref": "#/definitions/optionalDependency"
                                },
                                "peerDependencies": {
                                    "$ref": "#/definitions/peerDependency"
                                },
                                "peerDependenciesMeta": {
                                    "$ref": "#/definitions/peerDependencyMeta"
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    "additionalProperties": false
                },
                "peerDependencyRules": {
                    "type": "object",
                    "properties": {
                        "ignoreMissing": {
                            "description": "pnpm will not print warnings about missing peer dependencies from this list.",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "allowedVersions": {
                            "description": "Unmet peer dependency warnings will not be printed for peer dependencies of the specified range.",
                            "type": "object"
                        },
                        "allowAny": {
                            "description": "Any peer dependency matching the pattern will be resolved from any version, regardless of the range specified in \"peerDependencies\".",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "neverBuiltDependencies": {
                    "description": "A list of dependencies to run builds for.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "onlyBuiltDependencies": {
                    "description": "A list of package names that are allowed to be executed during installation.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "onlyBuiltDependenciesFile": {
                    "description": "Specifies a JSON file that lists the only packages permitted to run installation scripts during the pnpm install process.",
                    "type": "string"
                },
                "ignoredBuiltDependencies": {
                    "description": "A list of package names that should not be built during installation.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "allowedDeprecatedVersions": {
                    "description": "A list of deprecated versions that the warnings are suppressed.",
                    "type": "object"
                },
                "patchedDependencies": {
                    "description": "A list of dependencies that are patched.",
                    "type": "object"
                },
                "allowNonAppliedPatches": {
                    "description": "When true, installation won't fail if some of the patches from the \"patchedDependencies\" field were not applied.",
                    "type": "boolean"
                },
                "updateConfig": {
                    "type": "object",
                    "properties": {
                        "ignoreDependencies": {
                            "description": "A list of packages that should be ignored when running \"pnpm outdated\" or \"pnpm update --latest\".",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "configDependencies": {
                    "type": "object",
                    "description": "Configurational dependencies are installed before all the other types of dependencies (before 'dependencies', 'devDependencies', 'optionalDependencies')."
                },
                "auditConfig": {
                    "type": "object",
                    "properties": {
                        "ignoreCves": {
                            "description": "A list of CVE IDs that will be ignored by \"pnpm audit\".",
                            "type": "array",
                            "items": {
                                "type": "string",
                                "pattern": "^CVE-\\d{4}-\\d{4,7}$"
                            }
                        },
                        "ignoreGhsas": {
                            "description": "A list of GHSA Codes that will be ignored by \"pnpm audit\".",
                            "type": "array",
                            "items": {
                                "type": "string",
                                "pattern": "^GHSA(-[23456789cfghjmpqrvwx]{4}){3}$"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "requiredScripts": {
                    "description": "A list of scripts that must exist in each project.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "supportedArchitectures": {
                    "description": "Specifies architectures for which you'd like to install optional dependencies, even if they don't match the architecture of the system running the install.",
                    "type": "object",
                    "properties": {
                        "os": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "cpu": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "libc": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "ignoredOptionalDependencies": {
                    "description": "A list of optional dependencies that the install should be skipped.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "executionEnv": {
                    "type": "object",
                    "properties": {
                        "nodeVersion": {
                            "description": "Specifies which exact Node.js version should be used for the project's runtime.",
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }
    },
    "anyOf": [
        {
            "type": "object",
            "not": {
                "required": [
                    "bundledDependencies",
                    "bundleDependencies"
                ]
            }
        },
        {
            "type": "object",
            "not": {
                "required": [
                    "bundleDependencies"
                ]
            },
            "required": [
                "bundledDependencies"
            ]
        },
        {
            "type": "object",
            "not": {
                "required": [
                    "bundledDependencies"
                ]
            },
            "required": [
                "bundleDependencies"
            ]
        }
    ]
},
  "Persona": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/Persona",
    "title": "Persona",
    "description": "Defines a persona in the OriginVault ecosystem.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "description": "Schema.org type"
        },
        "personaId": {
            "type": "string",
            "description": "DID of the persona."
        },
        "displayName": {
            "type": "string",
            "description": "User's display name or pseudonym."
        },
        "associatedDID": {
            "type": "string",
            "description": "The primary DID associated with this persona."
        },
        "personaType": {
            "type": "string",
            "enum": [
                "Creator",
                "Verifier",
                "Vault Operator",
                "Community Member",
                "AI Trainer"
            ],
            "description": "Role of the user within the OV ecosystem."
        },
        "joinedDate": {
            "type": "string",
            "format": "date-time",
            "description": "Date of persona creation."
        },
        "reputationScore": {
            "type": "object",
            "properties": {
                "trustLevel": {
                    "type": "number",
                    "description": "A calculated trust score based on activity and endorsements."
                },
                "endorsements": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "description": "DIDs of other users who have endorsed this persona."
                    }
                }
            },
            "description": "Tracks the persona's trust and reputation."
        },
        "badges": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "List of awarded badges or recognitions."
            }
        },
        "activityLog": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "activityType": {
                        "type": "string",
                        "description": "Type of activity performed."
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Timestamp of activity."
                    }
                }
            },
            "description": "Logs important persona actions within OV."
        },
        "linkedSocials": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "List of linked social media or web3 identities."
            }
        }
    },
    "required": [
        "personaId",
        "associatedDID",
        "personaType",
        "joinedDate"
    ]
},
  "PluginDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "@context": [
        "https://schema.org",
        "https://schemas.originvault.io"
    ],
    "$id": "https://schemas.originvault.io/PluginDeclaration",
    "title": "Plugin Declaration",
    "description": "Defines a plugin registered in an OV Namespace, including governance, versioning, and compatibility.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "SoftwareApplication",
                "WebApplication",
                "Extension",
                "Protocol"
            ],
            "description": "Schema.org type defining the plugin category."
        },
        "id": {
            "type": "string",
            "description": "The DID of the plugin."
        },
        "namespace": {
            "type": "string",
            "description": "The DID of the namespace this plugin belongs to."
        },
        "vault": {
            "type": "string",
            "description": "The DID of the vault that owns this plugin."
        },
        "name": {
            "type": "string",
            "description": "Name of the plugin."
        },
        "description": {
            "type": "string",
            "description": "Detailed description of the plugin’s functionality."
        },
        "version": {
            "type": "string",
            "description": "Semantic versioning (e.g., 1.0.0)."
        },
        "author": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "DID of the entity or user who created the plugin."
                },
                "name": {
                    "type": "string",
                    "description": "Author's name or organization."
                },
                "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "Website or documentation link."
                }
            }
        },
        "compatibleNodes": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "enum": [
                "IdentityNode",
                "StorageNode",
                "ComputeNode",
                "VerificationNode"
            ],
            "description": "The node types this plugin is designed to run on."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The id of the linked resource."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "format": "uri",
                        "description": "The URI of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., governance, metadata, event log)."
                    }
                },
                "required": [
                    "id",
                    "type"
                ]
            },
            "description": "References to plugin documentation, code, or policies."
        },
        "governance": {
            "type": "object",
            "properties": {
                "approvedBy": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of governance bodies or validators that approved the plugin."
                },
                "complianceRules": {
                    "type": "string",
                    "description": "Reference to compliance policies stored in Ceramic."
                }
            },
            "description": "Governance and compliance information for the plugin."
        },
        "installation": {
            "type": "object",
            "properties": {
                "installMethod": {
                    "type": "string",
                    "enum": [
                        "VaultInstallation",
                        "NodeInstallation",
                        "GlobalInstallation"
                    ],
                    "description": "Defines where the plugin can be installed."
                },
                "dependencies": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of other required plugins or services."
                },
                "configurationSchema": {
                    "type": "string",
                    "format": "uri",
                    "description": "Link to a schema defining plugin-specific configuration options."
                }
            },
            "description": "Defines how the plugin is installed and configured."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "deprecated",
                "revoked"
            ],
            "description": "The current status of the plugin."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this plugin declaration was issued."
        }
    },
    "required": [
        "@type",
        "id",
        "namespace",
        "name",
        "version",
        "author",
        "compatibleNodes",
        "status",
        "timestamp"
    ]
},
  "PluginDeveloperAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/PluginDeveloperAgreement",
    "title": "Plugin Developer Agreement",
    "description": "Defines the terms for publishing a plugin in the OV ecosystem.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork",
                "SoftwareApplication"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "pluginId": {
            "type": "string",
            "description": "DID of the plugin."
        },
        "developerId": {
            "type": "string",
            "description": "DID of the developer."
        },
        "securityRequirements": {
            "type": "string",
            "description": "The security audit requirements for publishing a plugin."
        },
        "monetizationModel": {
            "type": "string",
            "enum": [
                "Free",
                "Subscription",
                "One-time Purchase"
            ],
            "description": "How the plugin is monetized."
        },
        "compliancePolicy": {
            "type": "string",
            "description": "Plugin compliance rules and enforcement."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions for plugin removal from the OV ecosystem."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the developer has accepted the agreement."
        }
    },
    "required": [
        "agreementId",
        "pluginId",
        "developerId",
        "securityRequirements",
        "monetizationModel",
        "compliancePolicy",
        "revocationPolicy",
        "agreementSigned"
    ]
},
  "PluginExectutionRequest": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/PluginExecutionRequest",
    "title": "Plugin Execution Request",
    "description": "Defines a request from a plugin running in a vault to interact with an OV node.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the execution request."
        },
        "vault": {
            "type": "string",
            "description": "The DID of the vault running the plugin."
        },
        "plugin": {
            "type": "string",
            "description": "The DID of the plugin making the request."
        },
        "node": {
            "type": "string",
            "description": "The DID of the node handling the request."
        },
        "requestType": {
            "type": "string",
            "enum": [
                "ComputeTask",
                "DataRead",
                "DataWrite",
                "IdentityLookup",
                "VerificationCheck"
            ],
            "description": "Type of request being made."
        },
        "parameters": {
            "type": "object",
            "description": "Additional parameters required for processing the request."
        },
        "status": {
            "type": "string",
            "enum": [
                "pending",
                "processing",
                "completed",
                "failed"
            ],
            "description": "Current status of the request."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of request submission."
        }
    },
    "required": [
        "id",
        "vault",
        "plugin",
        "node",
        "requestType",
        "status",
        "timestamp"
    ]
},
  "PluginIntegrationAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/PluginIntegrationAgreement",
    "title": "Plugin Integration Agreement",
    "description": "Defines the permissions and restrictions for a plugin installed in a Vault.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "pluginId": {
            "type": "string",
            "description": "DID of the installed plugin."
        },
        "vaultId": {
            "type": "string",
            "description": "DID of the Vault where the plugin is installed."
        },
        "permissions": {
            "type": "object",
            "properties": {
                "storageAccess": {
                    "type": "boolean",
                    "description": "Can the plugin access storage?"
                },
                "computeAccess": {
                    "type": "boolean",
                    "description": "Can the plugin perform computations?"
                }
            }
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions under which the plugin may be removed."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the plugin provider has accepted the agreement."
        }
    },
    "required": [
        "agreementId",
        "pluginId",
        "vaultId",
        "permissions",
        "revocationPolicy",
        "agreementSigned"
    ]
},
  "ReferalAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/ReferalAgreement",
    "title": "Referal Agreement",
    "description": "Defines the rules for trust-based referrals and reputation scoring within the OV ecosystem.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "referrerId": {
            "type": "string",
            "description": "DID of the entity providing the referral."
        },
        "referredEntityId": {
            "type": "string",
            "description": "DID of the entity receiving the referral."
        },
        "trustScoreImpact": {
            "type": "object",
            "properties": {
                "initialBoost": {
                    "type": "number",
                    "description": "Trust score increase from referral."
                },
                "slashingConditions": {
                    "type": "string",
                    "description": "Conditions under which the referral can be revoked or slashed."
                }
            }
        },
        "reputationRewards": {
            "type": "string",
            "description": "How referrers are rewarded if the referred entity performs well."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether both parties accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "referrerId",
        "referredEntityId",
        "trustScoreImpact",
        "reputationRewards",
        "agreementSigned",
        "timestamp"
    ]
},
  "RevenuDistribution": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/RevenueDistribution",
    "title": "Revenue Distribution",
    "description": "Defines how revenue from data sales is distributed to Data Chamber contributors.",
    "type": "object",
    "properties": {
        "chamberId": {
            "type": "string",
            "description": "DID of the Data Chamber."
        },
        "totalRevenue": {
            "type": "number",
            "description": "Total revenue generated by data sales."
        },
        "distribution": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "recipientId": {
                        "type": "string",
                        "description": "DID of the user receiving a payout."
                    },
                    "amount": {
                        "type": "number",
                        "description": "Payout amount."
                    }
                }
            },
            "description": "List of users and their payouts."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "When the revenue was distributed."
        }
    },
    "required": [
        "chamberId",
        "totalRevenue",
        "distribution",
        "timestamp"
    ]
},
  "Revocation": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/Revocation",
    "title": "Revocation Schema",
    "description": "Defines the revocation process for nodes, clusters, or users.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the revocation record."
        },
        "entity": {
            "type": "string",
            "description": "The DID of the revoked entity (Node, Cluster, User)."
        },
        "revokedBy": {
            "type": "string",
            "description": "The DID of the authority that revoked the entity."
        },
        "reason": {
            "type": "string",
            "description": "Explanation for the revocation."
        },
        "linkedEvidence": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "References to evidence supporting revocation (e.g., governance vote logs)."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of the revocation."
        }
    },
    "required": [
        "id",
        "entity",
        "revokedBy",
        "reason",
        "timestamp"
    ]
},
  "RootAuthority": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/RootAuthority",
    "title": "Root Authority Declaration",
    "description": "Declaration of a root authority establishing a trust chain for any namespace, platform, user, organization, community, or concept.",
    "type": "object",
    "required": [
        "@context",
        "type",
        "issuer",
        "issuanceDate",
        "credentialSubject"
    ],
    "properties": {
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "https://www.w3.org/2018/credentials/v1",
                "https://schema.org",
                "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
            ]
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "VerifiableCredential",
                "RootAuthorityDeclaration"
            ]
        },
        "issuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the entity declaring itself as a root authority"
                },
                "name": {
                    "type": "string",
                    "description": "Name of the root authority"
                }
            },
            "required": [
                "id"
            ]
        },
        "issuanceDate": {
            "type": "string",
            "format": "date-time",
            "description": "When the root authority declaration was issued"
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the root authority (same as issuer for self-declaration)"
                },
                "rootType": {
                    "type": "string",
                    "enum": [
                        "namespace",
                        "platform",
                        "user",
                        "organization",
                        "community",
                        "concept"
                    ],
                    "description": "Type of root authority being declared"
                },
                "scope": {
                    "type": "string",
                    "description": "Scope or domain of authority",
                    "examples": [
                        "originvault.box",
                        "content-authenticity",
                        "user-reputation",
                        "platform-governance",
                        "community-standards",
                        "data-provenance",
                        "academic-credentials",
                        "supply-chain"
                    ]
                },
                "trustChainPurpose": {
                    "type": "string",
                    "description": "Purpose and goals of this trust chain",
                    "examples": [
                        "Verify content authenticity and provenance",
                        "Establish user reputation across platforms",
                        "Govern platform operations and policies",
                        "Certify academic achievements",
                        "Track supply chain provenance"
                    ]
                },
                "governanceModel": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "self-governed",
                                "dao",
                                "multisig",
                                "committee",
                                "democratic",
                                "consortium"
                            ],
                            "description": "Governance model for this root authority"
                        },
                        "participants": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "DIDs of governance participants (if applicable)"
                        },
                        "policyDocument": {
                            "type": "string",
                            "description": "Reference to governance policies and procedures"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "delegationPolicy": {
                    "type": "object",
                    "properties": {
                        "allowsSubRoots": {
                            "type": "boolean",
                            "description": "Whether this root authority can delegate to sub-roots"
                        },
                        "maxChainDepth": {
                            "type": "integer",
                            "minimum": 1,
                            "description": "Maximum depth of trust chain delegation"
                        },
                        "delegationCriteria": {
                            "type": "string",
                            "description": "Criteria for delegating authority to trusted issuers"
                        }
                    }
                },
                "accreditationStandards": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "standardId": {
                                "type": "string",
                                "description": "Identifier for the accreditation standard"
                            },
                            "schemaTypes": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Credential types this root can accredit issuers for"
                            },
                            "trustLevels": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Trust levels this root authority recognizes"
                            }
                        },
                        "required": [
                            "standardId",
                            "schemaTypes"
                        ]
                    },
                    "description": "Accreditation standards this root authority supports"
                },
                "interoperability": {
                    "type": "object",
                    "properties": {
                        "recognizedRoots": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "DIDs of other root authorities this root recognizes"
                        },
                        "crossChainValidation": {
                            "type": "boolean",
                            "description": "Whether this root supports cross-chain credential validation"
                        },
                        "federationMember": {
                            "type": "string",
                            "description": "Federation or consortium this root belongs to (optional)"
                        }
                    }
                },
                "blockchainAnchoring": {
                    "type": "object",
                    "properties": {
                        "blockchainNetwork": {
                            "type": "string",
                            "examples": [
                                "cheqd-mainnet",
                                "ethereum",
                                "polygon",
                                "hyperledger-indy"
                            ],
                            "description": "Blockchain network where this root is anchored"
                        },
                        "resourceId": {
                            "type": "string",
                            "description": "Blockchain resource ID for this root authority"
                        },
                        "registrationProof": {
                            "type": "string",
                            "description": "Cryptographic proof of blockchain registration"
                        }
                    }
                }
            },
            "required": [
                "id",
                "rootType",
                "scope",
                "trustChainPurpose",
                "governanceModel"
            ]
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof of the root authority declaration"
        }
    }
},
  "ServiceLevelAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/ServiceLevelAgreement",
    "title": "Service-Level Agreement (SLA) for OV Nodes",
    "description": "Defines minimum performance guarantees for nodes in the OV ecosystem.",
    "type": "object",
    "properties": {
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "nodeId": {
            "type": "string",
            "description": "DID of the Node."
        },
        "namespaceId": {
            "type": "string",
            "description": "DID of the Namespace the node belongs to."
        },
        "nodeType": {
            "type": "string",
            "enum": [
                "Identity",
                "Storage",
                "Compute",
                "Verification"
            ],
            "description": "The type of node operating under this SLA."
        },
        "expectedUptime": {
            "type": "object",
            "properties": {
                "minPercentage": {
                    "type": "number",
                    "description": "Minimum required uptime percentage (e.g., 99.9%)."
                },
                "measurementPeriod": {
                    "type": "string",
                    "description": "Time period over which uptime is measured (e.g., 30 days)."
                }
            }
        },
        "latencyThresholds": {
            "type": "object",
            "properties": {
                "maxResponseTime": {
                    "type": "number",
                    "description": "Maximum allowed response time (in milliseconds)."
                },
                "maxProcessingTime": {
                    "type": "number",
                    "description": "Maximum allowed compute processing time (in milliseconds)."
                }
            }
        },
        "failureCompensation": {
            "type": "object",
            "properties": {
                "financialPenalty": {
                    "type": "string",
                    "description": "Penalty applied if the Node fails SLA requirements (e.g., reduced staking rewards, service fees)."
                },
                "trustScoreImpact": {
                    "type": "number",
                    "description": "Negative impact on the Node’s trust score if SLA terms are violated."
                },
                "downgradeStatus": {
                    "type": "boolean",
                    "description": "Whether the Node can be downgraded to a lower-tier role upon SLA violations."
                }
            },
            "description": "Defines penalties and consequences for failing to meet SLA obligations."
        },
        "compensationIncentives": {
            "type": "object",
            "properties": {
                "bonusForHighUptime": {
                    "type": "boolean",
                    "description": "Whether nodes get rewards for exceeding SLA targets."
                },
                "feeReductions": {
                    "type": "boolean",
                    "description": "Whether nodes can receive reduced operational fees for high performance."
                }
            },
            "description": "Defines incentive mechanisms for high-performance Nodes."
        },
        "complianceMonitoring": {
            "type": "object",
            "properties": {
                "monitoringEntity": {
                    "type": "string",
                    "description": "DID of the entity monitoring SLA compliance."
                },
                "auditFrequency": {
                    "type": "string",
                    "description": "How often the node is audited for SLA compliance (e.g., monthly, quarterly)."
                },
                "onChainLogging": {
                    "type": "boolean",
                    "description": "Whether compliance logs are recorded on-chain for transparency."
                }
            },
            "description": "Specifies how SLA compliance is monitored and enforced."
        },
        "stakingRequirements": {
            "type": "object",
            "properties": {
                "requiredStakeAmount": {
                    "type": "number",
                    "description": "Minimum amount of tokens staked to participate as a Node."
                },
                "slashingConditions": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "Conditions under which staked tokens can be slashed (e.g., repeated SLA violations)."
                }
            },
            "description": "Defines staking and collateral mechanisms for Nodes."
        },
        "revocationPolicy": {
            "type": "object",
            "properties": {
                "conditionsForRemoval": {
                    "type": "string",
                    "description": "Conditions under which a Node is removed from the Cluster."
                },
                "gracePeriod": {
                    "type": "number",
                    "description": "Amount of time the Node has to fix compliance issues before removal."
                },
                "appealProcess": {
                    "type": "string",
                    "description": "Procedure for a Node to challenge its removal from the Cluster."
                }
            },
            "description": "Defines rules for Node removal due to SLA non-compliance."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the Node operator has accepted the SLA."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "nodeId",
        "namespaceId",
        "nodeType",
        "expectedUptime",
        "latencyThresholds",
        "failureCompensation",
        "complianceMonitoring",
        "stakingRequirements",
        "revocationPolicy",
        "agreementSigned",
        "timestamp"
    ]
},
  "StorageNodeDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/StorageNodeDeclaration",
    "title": "Storage Node Declaration",
    "description": "Defines a Storage Node in an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the Storage Node."
        },
        "type": {
            "const": "StorageNode",
            "description": "Node type."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster this node belongs to."
        },
        "operator": {
            "type": "string",
            "description": "DID of the entity operating this node."
        },
        "storageType": {
            "type": "string",
            "enum": [
                "MinIO",
                "IPFS",
                "Arweave",
                "Verida"
            ],
            "description": "Type of storage system used."
        },
        "storageCapacity": {
            "type": "string",
            "description": "Storage capacity available (e.g., 1TB, 100GB)."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., Data, Metadata, ContentManifest)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "References to stored resources."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "suspended",
                "revoked"
            ],
            "description": "Operational status of the node."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of node declaration."
        }
    },
    "required": [
        "id",
        "cluster",
        "operator",
        "storageType",
        "storageCapacity",
        "status",
        "timestamp"
    ]
},
  "TrustChainDelegation": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/TrustChainDelegation",
    "title": "Trust Chain Delegation",
    "description": "Verifiable delegation of trust authority from any root or trusted issuer to another entity in a trust chain.",
    "type": "object",
    "required": [
        "@context",
        "type",
        "issuer",
        "issuanceDate",
        "credentialSubject"
    ],
    "properties": {
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "https://www.w3.org/2018/credentials/v1",
                "https://schema.org",
                "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
            ]
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "VerifiableCredential",
                "TrustChainDelegation"
            ]
        },
        "issuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the delegating authority (root or trusted issuer)"
                },
                "name": {
                    "type": "string",
                    "description": "Name of the delegating authority"
                },
                "authorityType": {
                    "type": "string",
                    "enum": [
                        "root",
                        "trusted-issuer",
                        "delegated-authority"
                    ],
                    "description": "Type of authority making the delegation"
                }
            },
            "required": [
                "id",
                "authorityType"
            ]
        },
        "issuanceDate": {
            "type": "string",
            "format": "date-time",
            "description": "When the delegation was issued"
        },
        "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "When the delegation expires (optional)"
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the entity receiving delegation"
                },
                "delegationType": {
                    "type": "string",
                    "enum": [
                        "trusted-issuer",
                        "sub-root",
                        "verifier",
                        "validator"
                    ],
                    "description": "Type of delegation being granted"
                },
                "trustChainContext": {
                    "type": "object",
                    "properties": {
                        "rootAuthority": {
                            "type": "string",
                            "pattern": "^did:",
                            "description": "DID of the ultimate root authority in this chain"
                        },
                        "parentAuthority": {
                            "type": "string",
                            "pattern": "^did:",
                            "description": "DID of the immediate parent in delegation chain"
                        },
                        "chainDepth": {
                            "type": "integer",
                            "minimum": 1,
                            "description": "Depth in the trust chain (1 = direct from root)"
                        },
                        "namespace": {
                            "type": "string",
                            "description": "Namespace or domain scope of this delegation"
                        }
                    },
                    "required": [
                        "rootAuthority",
                        "parentAuthority",
                        "chainDepth"
                    ]
                },
                "delegatedAuthorities": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "authority": {
                                "type": "string",
                                "enum": [
                                    "issue-credentials",
                                    "verify-credentials",
                                    "revoke-credentials",
                                    "delegate-authority",
                                    "update-schemas",
                                    "manage-trust-lists"
                                ],
                                "description": "Specific authority being delegated"
                            },
                            "scope": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Credential types or schemas this authority applies to"
                            },
                            "conditions": {
                                "type": "string",
                                "description": "Conditions or limitations on this authority"
                            }
                        },
                        "required": [
                            "authority"
                        ]
                    },
                    "description": "Specific authorities being delegated"
                },
                "constraints": {
                    "type": "object",
                    "properties": {
                        "maxSubDelegations": {
                            "type": "integer",
                            "minimum": 0,
                            "description": "Maximum number of sub-delegations allowed"
                        },
                        "allowedDelegationTypes": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Types of delegations this entity can make"
                        },
                        "geographicScope": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Geographic limitations on delegation scope"
                        },
                        "industryScope": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Industry or domain limitations"
                        }
                    }
                },
                "operationalRequirements": {
                    "type": "object",
                    "properties": {
                        "technicalStandards": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Technical standards the delegate must follow"
                        },
                        "auditRequirements": {
                            "type": "string",
                            "description": "Audit and compliance requirements"
                        },
                        "reportingRequirements": {
                            "type": "string",
                            "description": "Reporting obligations to delegating authority"
                        },
                        "insuranceRequirements": {
                            "type": "string",
                            "description": "Insurance or bonding requirements"
                        }
                    }
                },
                "revocationConditions": {
                    "type": "object",
                    "properties": {
                        "revocableBy": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "DIDs of entities that can revoke this delegation"
                        },
                        "revocationCriteria": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Conditions under which delegation can be revoked"
                        },
                        "appealProcess": {
                            "type": "string",
                            "description": "Process for appealing revocation decisions"
                        }
                    }
                }
            },
            "required": [
                "id",
                "delegationType",
                "trustChainContext",
                "delegatedAuthorities"
            ]
        },
        "termsOfUse": {
            "type": "object",
            "properties": {
                "delegationAgreement": {
                    "type": "string",
                    "description": "Reference to the delegation agreement document"
                },
                "governingLaw": {
                    "type": "string",
                    "description": "Legal jurisdiction governing this delegation"
                }
            }
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof of the delegation"
        }
    }
},
  "TrustDelegation": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/TrustEndorsement",
    "title": "Trust Delegation",
    "description": "Allows trusted users to endorse others, strengthening the trust economy.",
    "type": "object",
    "properties": {
        "endorser": {
            "type": "string",
            "description": "DID of the user endorsing another user."
        },
        "recipient": {
            "type": "string",
            "description": "DID of the endorsed user."
        },
        "endorsementReason": {
            "type": "string",
            "description": "Why the user is being endorsed."
        },
        "endorsementType": {
            "type": "string",
            "enum": [
                "verification",
                "governance",
                "community",
                "development"
            ],
            "description": "Category of the endorsement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time when the endorsement was given."
        },
        "linkedGem": {
            "type": "string",
            "description": "The Gem that qualifies the endorser to give this endorsement."
        },
        "linkedCredential": {
            "type": "string",
            "description": "DID-Linked Resource to a Verifiable Credential supporting the endorsement."
        }
    },
    "required": [
        "endorser",
        "recipient",
        "endorsementReason",
        "endorsementType",
        "timestamp",
        "linkedGem",
        "linkedCredential"
    ]
},
  "TrustedIssuer": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/TrustedIssuer",
    "title": "Trusted Issuer Accreditation",
    "description": "Verifiable Accreditation for trusted issuers within any trust chain, following cheqd DTC patterns for namespace-based trust hierarchies.",
    "type": "object",
    "required": [
        "@context",
        "type",
        "issuer",
        "issuanceDate",
        "credentialSubject",
        "termsOfUse"
    ],
    "properties": {
        "@context": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "https://www.w3.org/2018/credentials/v1",
                "https://schema.org",
                "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
            ]
        },
        "type": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "VerifiableCredential",
                "VerifiableAccreditation",
                "TrustedIssuerAccreditation"
            ]
        },
        "issuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the issuing authority - could be any namespace root, platform root, or user root"
                },
                "name": {
                    "type": "string",
                    "description": "Name of the issuing authority"
                },
                "rootType": {
                    "type": "string",
                    "enum": [
                        "namespace",
                        "platform",
                        "user",
                        "organization",
                        "community",
                        "concept"
                    ],
                    "description": "Type of root authority issuing this accreditation"
                }
            },
            "required": [
                "id"
            ]
        },
        "issuanceDate": {
            "type": "string",
            "format": "date-time",
            "description": "When the accreditation was issued"
        },
        "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "When the accreditation expires"
        },
        "credentialSubject": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "pattern": "^did:",
                    "description": "DID of the accredited trusted issuer"
                },
                "accreditedFor": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "namespaceId": {
                                "type": "string",
                                "description": "Namespace or domain for which the issuer is accredited",
                                "examples": [
                                    "originvault.box",
                                    "content-authenticity",
                                    "user-reputation",
                                    "platform-governance"
                                ]
                            },
                            "schemaId": {
                                "type": "string",
                                "description": "Schema ID for which the issuer is accredited",
                                "examples": [
                                    "did:cheqd:testnet:8ea036da-f340-480d-8952-f5561ea1763c/resources/b10146d7-0d0f-41e0-8ee3-c76db64890be",
                                    "https://schemas.originvault.box/ContentAuthenticityCredential"
                                ]
                            },
                            "types": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Credential types the issuer can issue",
                                "examples": [
                                    [
                                        "VerifiableCredential",
                                        "VerifiableAccreditation"
                                    ],
                                    [
                                        "VerifiableCredential",
                                        "ContentAuthenticityCredential"
                                    ]
                                ]
                            },
                            "limitJurisdiction": {
                                "type": "string",
                                "description": "Geographic or regulatory restriction (optional)",
                                "examples": [
                                    "https://publications.europa.eu/resource/authority/atu/FIN",
                                    "https://publications.europa.eu/resource/authority/atu/USA"
                                ]
                            },
                            "validUntil": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Expiration date of this specific accreditation"
                            }
                        },
                        "required": [
                            "namespaceId",
                            "schemaId",
                            "types"
                        ]
                    },
                    "description": "List of accreditations granted to this issuer"
                },
                "trustLevel": {
                    "type": "string",
                    "enum": [
                        "bronze",
                        "silver",
                        "gold",
                        "platinum"
                    ],
                    "description": "Trust level assigned within this trust chain"
                },
                "blockchainResourceId": {
                    "type": "string",
                    "description": "DID-Linked Resource ID on blockchain (cheqd, ethereum, etc.)"
                }
            },
            "required": [
                "id",
                "accreditedFor"
            ]
        },
        "termsOfUse": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "const": "AccreditationPolicy",
                    "description": "Must be AccreditationPolicy per cheqd DTC spec"
                },
                "parentAccreditation": {
                    "type": "string",
                    "description": "DID URL of the parent accreditation in the trust chain (if not a root)",
                    "examples": [
                        "did:cheqd:mainnet:namespace-root/resources/18de60ec-bed1-42e5-980c-601c432bc60b",
                        "did:ethr:platform-authority/resources/platform-root-authorization"
                    ]
                },
                "rootAuthorisation": {
                    "type": "string",
                    "description": "DID URL of the root authority for this trust chain",
                    "examples": [
                        "did:ov:namespace-root/resources/originvault-namespace-authorization",
                        "did:cheqd:community-root/resources/community-governance-authorization",
                        "did:ethr:platform-root/resources/platform-authority-authorization"
                    ]
                },
                "trustChainScope": {
                    "type": "string",
                    "description": "Scope or purpose of this trust chain",
                    "examples": [
                        "content-authenticity",
                        "user-reputation",
                        "platform-governance",
                        "community-trust",
                        "data-provenance"
                    ]
                },
                "governanceFramework": {
                    "type": "string",
                    "description": "Reference to governance policies for this trust chain"
                }
            },
            "required": [
                "type",
                "rootAuthorisation",
                "trustChainScope"
            ]
        },
        "proof": {
            "type": "object",
            "description": "Cryptographic proof of the accreditation"
        }
    }
},
  "TrustGate": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/TrustGate",
    "title": "Trust Gate",
    "description": "Defines access rules based on Gems and Verifiable Credentials.",
    "type": "object",
    "properties": {
        "resource": {
            "type": "string",
            "description": "The DID or URL of the resource being accessed."
        },
        "requiredTrustLevel": {
            "type": "number",
            "minimum": 0,
            "description": "Minimum trust score required for access."
        },
        "requiredGems": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of required Gems for access."
        },
        "requiredCredentials": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of required Verifiable Credentials for access."
        },
        "accessPolicy": {
            "type": "string",
            "enum": [
                "public",
                "restricted",
                "private"
            ],
            "description": "Whether access is open, trust-restricted, or fully private."
        }
    },
    "required": [
        "resource",
        "requiredTrustLevel",
        "requiredGems",
        "requiredCredentials",
        "accessPolicy"
    ]
},
  "TrustScore": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/TrustScore",
    "title": "Trust Score",
    "description": "Represents a calculated trust score for a DID based on blockchain accreditations and local endorsements.",
    "type": "object",
    "properties": {
        "did": {
            "type": "string",
            "description": "DID of the entity being scored",
            "pattern": "^did:"
        },
        "score": {
            "type": "number",
            "minimum": 0,
            "maximum": 100,
            "description": "Overall trust score (0-100)"
        },
        "factors": {
            "type": "object",
            "properties": {
                "accreditations": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score contribution from blockchain accreditations"
                },
                "endorsements": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score contribution from local endorsements"
                },
                "timeWeighted": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score contribution from recent activity"
                },
                "networkEffects": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score contribution from network diversity"
                },
                "blockchainTrust": {
                    "type": "number",
                    "minimum": 0,
                    "description": "Score contribution from blockchain-based trust indicators"
                }
            },
            "required": [
                "accreditations",
                "endorsements",
                "timeWeighted",
                "networkEffects",
                "blockchainTrust"
            ],
            "description": "Breakdown of trust score factors"
        },
        "lastCalculated": {
            "type": "string",
            "format": "date-time",
            "description": "When the score was last calculated"
        },
        "decay": {
            "type": "number",
            "minimum": 0,
            "maximum": 1,
            "description": "Score decay factor (0 = no decay, 1 = full decay)"
        },
        "blockchainSync": {
            "type": "object",
            "properties": {
                "lastSynced": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Last time score was synced with blockchain"
                },
                "pendingChanges": {
                    "type": "boolean",
                    "description": "Whether there are local changes not yet pushed to blockchain"
                },
                "blockchainResourceId": {
                    "type": "string",
                    "description": "Resource ID on blockchain for this trust score"
                }
            },
            "description": "Blockchain synchronization status"
        },
        "metadata": {
            "type": "object",
            "description": "Additional metadata for the trust score"
        }
    },
    "required": [
        "did",
        "score",
        "factors",
        "lastCalculated",
        "decay"
    ]
},
  "TsconfigJson": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "allowTrailingCommas": true,
    "allOf": [
        {
            "$ref": "#/definitions/compilerOptionsDefinition"
        },
        {
            "$ref": "#/definitions/compileOnSaveDefinition"
        },
        {
            "$ref": "#/definitions/typeAcquisitionDefinition"
        },
        {
            "$ref": "#/definitions/extendsDefinition"
        },
        {
            "$ref": "#/definitions/watchOptionsDefinition"
        },
        {
            "$ref": "#/definitions/buildOptionsDefinition"
        },
        {
            "$ref": "#/definitions/tsNodeDefinition"
        },
        {
            "anyOf": [
                {
                    "$ref": "#/definitions/filesDefinition"
                },
                {
                    "$ref": "#/definitions/excludeDefinition"
                },
                {
                    "$ref": "#/definitions/includeDefinition"
                },
                {
                    "$ref": "#/definitions/referencesDefinition"
                }
            ]
        }
    ],
    "definitions": {
        "//": {
            "explainer": "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#overview",
            "reference": "https://www.typescriptlang.org/tsconfig",
            "reference metadata": "https://github.com/microsoft/TypeScript-Website/blob/v2/packages/tsconfig-reference/scripts/tsconfigRules.ts"
        },
        "filesDefinition": {
            "properties": {
                "files": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "description": "If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.",
                    "type": [
                        "array",
                        "null"
                    ],
                    "uniqueItems": true,
                    "items": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                }
            }
        },
        "excludeDefinition": {
            "properties": {
                "exclude": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "description": "Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.",
                    "type": [
                        "array",
                        "null"
                    ],
                    "uniqueItems": true,
                    "items": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                }
            }
        },
        "includeDefinition": {
            "properties": {
                "include": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "description": "Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.",
                    "type": [
                        "array",
                        "null"
                    ],
                    "uniqueItems": true,
                    "items": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                }
            }
        },
        "compileOnSaveDefinition": {
            "properties": {
                "compileOnSave": {
                    "description": "Enable Compile-on-Save for this project.",
                    "type": [
                        "boolean",
                        "null"
                    ]
                }
            }
        },
        "extendsDefinition": {
            "properties": {
                "extends": {
                    "description": "Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).",
                    "oneOf": [
                        {
                            "default": "",
                            "type": "string"
                        },
                        {
                            "default": [],
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        }
                    ]
                }
            }
        },
        "buildOptionsDefinition": {
            "properties": {
                "buildOptions": {
                    "properties": {
                        "dry": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "~",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false
                        },
                        "force": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Build all projects, including those that appear to be up to date",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Build all projects, including those that appear to be up to date\n\nSee more: https://www.typescriptlang.org/tsconfig#force"
                        },
                        "verbose": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable verbose logging",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable verbose logging\n\nSee more: https://www.typescriptlang.org/tsconfig#verbose"
                        },
                        "incremental": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Save .tsbuildinfo files to allow for incremental compilation of projects.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Save .tsbuildinfo files to allow for incremental compilation of projects.\n\nSee more: https://www.typescriptlang.org/tsconfig#incremental"
                        },
                        "assumeChangesOnlyAffectDirectDependencies": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.\n\nSee more: https://www.typescriptlang.org/tsconfig#assumeChangesOnlyAffectDirectDependencies"
                        },
                        "traceResolution": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Log paths used during the `moduleResolution` process.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Log paths used during the `moduleResolution` process.\n\nSee more: https://www.typescriptlang.org/tsconfig#traceResolution"
                        }
                    }
                }
            }
        },
        "watchOptionsDefinition": {
            "properties": {
                "watchOptions": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "type": [
                        "object",
                        "null"
                    ],
                    "description": "Settings for the watch mode in TypeScript.",
                    "properties": {
                        "force": {
                            "description": "~",
                            "type": [
                                "string",
                                "null"
                            ]
                        },
                        "watchFile": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify how the TypeScript watch mode works.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify how the TypeScript watch mode works.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchFile"
                        },
                        "watchDirectory": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify how directories are watched on systems that lack recursive file-watching functionality.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify how directories are watched on systems that lack recursive file-watching functionality.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchDirectory"
                        },
                        "fallbackPolling": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify what approach the watcher should use if the system runs out of native file watchers.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify what approach the watcher should use if the system runs out of native file watchers.\n\nSee more: https://www.typescriptlang.org/tsconfig#fallbackPolling"
                        },
                        "synchronousWatchDirectory": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.\n\nSee more: https://www.typescriptlang.org/tsconfig#synchronousWatchDirectory"
                        },
                        "excludeFiles": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Remove a list of files from the watch mode's processing.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Remove a list of files from the watch mode's processing.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeFiles"
                        },
                        "excludeDirectories": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Remove a list of directories from the watch process.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Remove a list of directories from the watch process.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeDirectories"
                        }
                    }
                }
            }
        },
        "compilerOptionsDefinition": {
            "properties": {
                "compilerOptions": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "type": [
                        "object",
                        "null"
                    ],
                    "description": "Instructs the TypeScript compiler how to compile .ts files.",
                    "properties": {
                        "allowArbitraryExtensions": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable importing files with any extension, provided a declaration file is present.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Enable importing files with any extension, provided a declaration file is present.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowArbitraryExtensions"
                        },
                        "allowImportingTsExtensions": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions"
                        },
                        "charset": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "No longer supported. In early versions, manually set the text encoding for reading files.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "No longer supported. In early versions, manually set the text encoding for reading files.\n\nSee more: https://www.typescriptlang.org/tsconfig#charset"
                        },
                        "composite": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable constraints that allow a TypeScript project to be used with project references.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": true,
                            "markdownDescription": "Enable constraints that allow a TypeScript project to be used with project references.\n\nSee more: https://www.typescriptlang.org/tsconfig#composite"
                        },
                        "customConditions": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Conditions to set in addition to the resolver-specific defaults when resolving imports.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Conditions to set in addition to the resolver-specific defaults when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#customConditions"
                        },
                        "declaration": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Generate .d.ts files from TypeScript and JavaScript files in your project.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Generate .d.ts files from TypeScript and JavaScript files in your project.\n\nSee more: https://www.typescriptlang.org/tsconfig#declaration"
                        },
                        "declarationDir": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the output directory for generated declaration files.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the output directory for generated declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationDir"
                        },
                        "diagnostics": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Output compiler performance information after building.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Output compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#diagnostics"
                        },
                        "disableReferencedProjectLoad": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Reduce the number of projects loaded automatically by TypeScript.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Reduce the number of projects loaded automatically by TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableReferencedProjectLoad"
                        },
                        "noPropertyAccessFromIndexSignature": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enforces using indexed accessors for keys declared using an indexed type",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Enforces using indexed accessors for keys declared using an indexed type\n\nSee more: https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature"
                        },
                        "emitBOM": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitBOM"
                        },
                        "emitDeclarationOnly": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Only output d.ts files and not JavaScript files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Only output d.ts files and not JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDeclarationOnly"
                        },
                        "erasableSyntaxOnly": {
                            "description": "Do not allow runtime constructs that are not part of ECMAScript.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Do not allow runtime constructs that are not part of ECMAScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#erasableSyntaxOnly"
                        },
                        "exactOptionalPropertyTypes": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Differentiate between undefined and not present when type checking",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Differentiate between undefined and not present when type checking\n\nSee more: https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes"
                        },
                        "incremental": {
                            "description": "Enable incremental compilation. Requires TypeScript version 3.4 or later.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "tsBuildInfoFile": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the folder for .tsbuildinfo incremental compilation files.",
                            "default": ".tsbuildinfo",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the folder for .tsbuildinfo incremental compilation files.\n\nSee more: https://www.typescriptlang.org/tsconfig#tsBuildInfoFile"
                        },
                        "inlineSourceMap": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Include sourcemap files inside the emitted JavaScript.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Include sourcemap files inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSourceMap"
                        },
                        "inlineSources": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Include source code in the sourcemaps inside the emitted JavaScript.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Include source code in the sourcemaps inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSources"
                        },
                        "jsx": {
                            "description": "Specify what JSX code is generated.",
                            "enum": [
                                "preserve",
                                "react",
                                "react-jsx",
                                "react-jsxdev",
                                "react-native"
                            ]
                        },
                        "reactNamespace": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "React",
                            "markdownDescription": "Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.\n\nSee more: https://www.typescriptlang.org/tsconfig#reactNamespace"
                        },
                        "jsxFactory": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "React.createElement",
                            "markdownDescription": "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFactory"
                        },
                        "jsxFragmentFactory": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "React.Fragment",
                            "markdownDescription": "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFragmentFactory"
                        },
                        "jsxImportSource": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "react",
                            "markdownDescription": "Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxImportSource"
                        },
                        "listFiles": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Print all of the files read during the compilation.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Print all of the files read during the compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listFiles"
                        },
                        "mapRoot": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the location where debugger should locate map files instead of generated locations.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the location where debugger should locate map files instead of generated locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#mapRoot"
                        },
                        "module": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify what module code is generated.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "anyOf": [
                                {
                                    "enum": [
                                        "CommonJS",
                                        "AMD",
                                        "System",
                                        "UMD",
                                        "ES6",
                                        "ES2015",
                                        "ES2020",
                                        "ESNext",
                                        "None",
                                        "ES2022",
                                        "Node16",
                                        "Node18",
                                        "NodeNext",
                                        "Preserve"
                                    ]
                                },
                                {
                                    "pattern": "^([Cc][Oo][Mm][Mm][Oo][Nn][Jj][Ss]|[AaUu][Mm][Dd]|[Ss][Yy][Ss][Tt][Ee][Mm]|[Ee][Ss]([356]|20(1[567]|2[02])|[Nn][Ee][Xx][Tt])|[Nn][Oo][dD][Ee]1[68]|[Nn][Oo][Dd][Ee][Nn][Ee][Xx][Tt]|[Nn][Oo][Nn][Ee]|[Pp][Rr][Ee][Ss][Ee][Rr][Vv][Ee])$"
                                }
                            ],
                            "markdownDescription": "Specify what module code is generated.\n\nSee more: https://www.typescriptlang.org/tsconfig#module"
                        },
                        "moduleResolution": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify how TypeScript looks up a file from a given module specifier.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "anyOf": [
                                {
                                    "enum": [
                                        "classic",
                                        "node",
                                        "node10",
                                        "node16",
                                        "nodenext",
                                        "bundler"
                                    ],
                                    "markdownEnumDescriptions": [
                                        "It’s recommended to use `\"node16\"` instead",
                                        "Deprecated, use `\"node10\"` in TypeScript 5.0+ instead",
                                        "It’s recommended to use `\"node16\"` instead",
                                        "This is the recommended setting for libraries and Node.js applications",
                                        "This is the recommended setting for libraries and Node.js applications",
                                        "This is the recommended setting in TypeScript 5.0+ for applications that use a bundler"
                                    ]
                                },
                                {
                                    "pattern": "^(([Nn]ode)|([Nn]ode1[06])|([Nn]ode[Nn]ext)|([Cc]lassic)|([Bb]undler))$"
                                }
                            ],
                            "markdownDescription": "Specify how TypeScript looks up a file from a given module specifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#moduleResolution"
                        },
                        "newLine": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Set the newline character for emitting files.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "lf",
                            "anyOf": [
                                {
                                    "enum": [
                                        "crlf",
                                        "lf"
                                    ]
                                },
                                {
                                    "pattern": "^(CRLF|LF|crlf|lf)$"
                                }
                            ],
                            "markdownDescription": "Set the newline character for emitting files.\n\nSee more: https://www.typescriptlang.org/tsconfig#newLine"
                        },
                        "noEmit": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable emitting file from a compilation.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable emitting file from a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmit"
                        },
                        "noEmitHelpers": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable generating custom helper functions like `__extends` in compiled output.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable generating custom helper functions like `__extends` in compiled output.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitHelpers"
                        },
                        "noEmitOnError": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable emitting files if any type checking errors are reported.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable emitting files if any type checking errors are reported.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitOnError"
                        },
                        "noImplicitAny": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting for expressions and declarations with an implied `any` type..",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Enable error reporting for expressions and declarations with an implied `any` type..\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitAny"
                        },
                        "noImplicitThis": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting when `this` is given the type `any`.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Enable error reporting when `this` is given the type `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitThis"
                        },
                        "noUnusedLocals": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting when a local variable isn't read.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable error reporting when a local variable isn't read.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedLocals"
                        },
                        "noUnusedParameters": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Raise an error when a function parameter isn't read",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Raise an error when a function parameter isn't read\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedParameters"
                        },
                        "noLib": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable including any library files, including the default lib.d.ts.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable including any library files, including the default lib.d.ts.\n\nSee more: https://www.typescriptlang.org/tsconfig#noLib"
                        },
                        "noResolve": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.\n\nSee more: https://www.typescriptlang.org/tsconfig#noResolve"
                        },
                        "noStrictGenericChecks": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable strict checking of generic signatures in function types.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable strict checking of generic signatures in function types.\n\nSee more: https://www.typescriptlang.org/tsconfig#noStrictGenericChecks"
                        },
                        "skipDefaultLibCheck": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Skip type checking .d.ts files that are included with TypeScript.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Skip type checking .d.ts files that are included with TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipDefaultLibCheck"
                        },
                        "skipLibCheck": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Skip type checking all .d.ts files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Skip type checking all .d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipLibCheck"
                        },
                        "outFile": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.\n\nSee more: https://www.typescriptlang.org/tsconfig#outFile"
                        },
                        "outDir": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify an output folder for all emitted files.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify an output folder for all emitted files.\n\nSee more: https://www.typescriptlang.org/tsconfig#outDir"
                        },
                        "preserveConstEnums": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable erasing `const enum` declarations in generated code.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable erasing `const enum` declarations in generated code.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveConstEnums"
                        },
                        "preserveSymlinks": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable resolving symlinks to their realpath. This correlates to the same flag in node.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable resolving symlinks to their realpath. This correlates to the same flag in node.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveSymlinks"
                        },
                        "preserveValueImports": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Preserve unused imported values in the JavaScript output that would otherwise be removed",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Preserve unused imported values in the JavaScript output that would otherwise be removed\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveValueImports"
                        },
                        "preserveWatchOutput": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable wiping the console in watch mode",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Disable wiping the console in watch mode\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveWatchOutput"
                        },
                        "pretty": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable color and formatting in output to make compiler errors easier to read",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": true,
                            "markdownDescription": "Enable color and formatting in output to make compiler errors easier to read\n\nSee more: https://www.typescriptlang.org/tsconfig#pretty"
                        },
                        "removeComments": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable emitting comments.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable emitting comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#removeComments"
                        },
                        "rewriteRelativeImportExtensions": {
                            "description": "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rewriteRelativeImportExtensions"
                        },
                        "rootDir": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the root folder within your source files.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the root folder within your source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDir"
                        },
                        "isolatedModules": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Ensure that each file can be safely transpiled without relying on other imports.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Ensure that each file can be safely transpiled without relying on other imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedModules"
                        },
                        "sourceMap": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Create source map files for emitted JavaScript files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Create source map files for emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceMap"
                        },
                        "sourceRoot": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the root path for debuggers to find the reference source code.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the root path for debuggers to find the reference source code.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceRoot"
                        },
                        "suppressExcessPropertyErrors": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable reporting of excess property errors during the creation of object literals.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable reporting of excess property errors during the creation of object literals.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressExcessPropertyErrors"
                        },
                        "suppressImplicitAnyIndexErrors": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Suppress `noImplicitAny` errors when indexing objects that lack index signatures.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors"
                        },
                        "stripInternal": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable emitting declarations that have `@internal` in their JSDoc comments.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Disable emitting declarations that have `@internal` in their JSDoc comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#stripInternal"
                        },
                        "target": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "ES3",
                            "anyOf": [
                                {
                                    "enum": [
                                        "ES3",
                                        "ES5",
                                        "ES6",
                                        "ES2015",
                                        "ES2016",
                                        "ES2017",
                                        "ES2018",
                                        "ES2019",
                                        "ES2020",
                                        "ES2021",
                                        "ES2022",
                                        "ES2023",
                                        "ES2024",
                                        "ESNext"
                                    ]
                                },
                                {
                                    "pattern": "^([Ee][Ss]([356]|(20(1[56789]|2[01234]))|[Nn][Ee][Xx][Tt]))$"
                                }
                            ],
                            "markdownDescription": "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.\n\nSee more: https://www.typescriptlang.org/tsconfig#target"
                        },
                        "useUnknownInCatchVariables": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Default catch clause variables as `unknown` instead of `any`.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Default catch clause variables as `unknown` instead of `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables"
                        },
                        "watch": {
                            "description": "Watch input files.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "fallbackPolling": {
                            "description": "Specify the polling strategy to use when the system runs out of or doesn't support native file watchers. Requires TypeScript version 3.8 or later.",
                            "enum": [
                                "fixedPollingInterval",
                                "priorityPollingInterval",
                                "dynamicPriorityPolling",
                                "fixedInterval",
                                "priorityInterval",
                                "dynamicPriority",
                                "fixedChunkSize"
                            ]
                        },
                        "watchDirectory": {
                            "description": "Specify the strategy for watching directories under systems that lack recursive file-watching functionality. Requires TypeScript version 3.8 or later.",
                            "enum": [
                                "useFsEvents",
                                "fixedPollingInterval",
                                "dynamicPriorityPolling",
                                "fixedChunkSizePolling"
                            ],
                            "default": "useFsEvents"
                        },
                        "watchFile": {
                            "description": "Specify the strategy for watching individual files. Requires TypeScript version 3.8 or later.",
                            "enum": [
                                "fixedPollingInterval",
                                "priorityPollingInterval",
                                "dynamicPriorityPolling",
                                "useFsEvents",
                                "useFsEventsOnParentDirectory",
                                "fixedChunkSizePolling"
                            ],
                            "default": "useFsEvents"
                        },
                        "experimentalDecorators": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable experimental support for TC39 stage 2 draft decorators.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Enable experimental support for TC39 stage 2 draft decorators.\n\nSee more: https://www.typescriptlang.org/tsconfig#experimentalDecorators"
                        },
                        "emitDecoratorMetadata": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit design-type metadata for decorated declarations in source files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Emit design-type metadata for decorated declarations in source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata"
                        },
                        "allowUnusedLabels": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable error reporting for unused labels.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Disable error reporting for unused labels.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnusedLabels"
                        },
                        "noImplicitReturns": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting for codepaths that do not explicitly return in a function.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable error reporting for codepaths that do not explicitly return in a function.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitReturns"
                        },
                        "noUncheckedIndexedAccess": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Add `undefined` to a type when accessed using an index.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Add `undefined` to a type when accessed using an index.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess"
                        },
                        "noFallthroughCasesInSwitch": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting for fallthrough cases in switch statements.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable error reporting for fallthrough cases in switch statements.\n\nSee more: https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch"
                        },
                        "noImplicitOverride": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Ensure overriding members in derived classes are marked with an override modifier.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Ensure overriding members in derived classes are marked with an override modifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitOverride"
                        },
                        "allowUnreachableCode": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable error reporting for unreachable code.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Disable error reporting for unreachable code.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnreachableCode"
                        },
                        "forceConsistentCasingInFileNames": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Ensure that casing is correct in imports.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": true,
                            "markdownDescription": "Ensure that casing is correct in imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames"
                        },
                        "generateCpuProfile": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit a v8 CPU profile of the compiler run for debugging.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "default": "profile.cpuprofile",
                            "markdownDescription": "Emit a v8 CPU profile of the compiler run for debugging.\n\nSee more: https://www.typescriptlang.org/tsconfig#generateCpuProfile"
                        },
                        "baseUrl": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the base directory to resolve non-relative module names.",
                            "type": [
                                "string",
                                "null"
                            ],
                            "markdownDescription": "Specify the base directory to resolve non-relative module names.\n\nSee more: https://www.typescriptlang.org/tsconfig#baseUrl"
                        },
                        "paths": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify a set of entries that re-map imports to additional lookup locations.",
                            "type": [
                                "object",
                                "null"
                            ],
                            "additionalProperties": {
                                "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                                "type": [
                                    "array",
                                    "null"
                                ],
                                "uniqueItems": true,
                                "items": {
                                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "description": "Path mapping to be computed relative to baseUrl option."
                                }
                            },
                            "markdownDescription": "Specify a set of entries that re-map imports to additional lookup locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#paths"
                        },
                        "plugins": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify a list of language service plugins to include.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "items": {
                                "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                                "type": [
                                    "object",
                                    "null"
                                ],
                                "properties": {
                                    "name": {
                                        "description": "Plugin name.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    }
                                }
                            },
                            "markdownDescription": "Specify a list of language service plugins to include.\n\nSee more: https://www.typescriptlang.org/tsconfig#plugins"
                        },
                        "rootDirs": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow multiple folders to be treated as one when resolving modules.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Allow multiple folders to be treated as one when resolving modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDirs"
                        },
                        "typeRoots": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify multiple folders that act like `./node_modules/@types`.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Specify multiple folders that act like `./node_modules/@types`.\n\nSee more: https://www.typescriptlang.org/tsconfig#typeRoots"
                        },
                        "types": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify type package names to be included without being referenced in a source file.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "markdownDescription": "Specify type package names to be included without being referenced in a source file.\n\nSee more: https://www.typescriptlang.org/tsconfig#types"
                        },
                        "traceResolution": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable tracing of the name resolution process. Requires TypeScript version 2.0 or later.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false
                        },
                        "allowJs": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowJs"
                        },
                        "noErrorTruncation": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable truncating types in error messages.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable truncating types in error messages.\n\nSee more: https://www.typescriptlang.org/tsconfig#noErrorTruncation"
                        },
                        "allowSyntheticDefaultImports": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow 'import x from y' when a module doesn't have a default export.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Allow 'import x from y' when a module doesn't have a default export.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports"
                        },
                        "noImplicitUseStrict": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable adding 'use strict' directives in emitted JavaScript files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable adding 'use strict' directives in emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitUseStrict"
                        },
                        "listEmittedFiles": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Print the names of emitted files after a compilation.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Print the names of emitted files after a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listEmittedFiles"
                        },
                        "disableSizeLimit": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSizeLimit"
                        },
                        "lib": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify a set of bundled library declaration files that describe the target runtime environment.",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                                "type": [
                                    "string",
                                    "null"
                                ],
                                "anyOf": [
                                    {
                                        "enum": [
                                            "ES5",
                                            "ES6",
                                            "ES2015",
                                            "ES2015.Collection",
                                            "ES2015.Core",
                                            "ES2015.Generator",
                                            "ES2015.Iterable",
                                            "ES2015.Promise",
                                            "ES2015.Proxy",
                                            "ES2015.Reflect",
                                            "ES2015.Symbol.WellKnown",
                                            "ES2015.Symbol",
                                            "ES2016",
                                            "ES2016.Array.Include",
                                            "ES2017",
                                            "ES2017.Intl",
                                            "ES2017.Object",
                                            "ES2017.SharedMemory",
                                            "ES2017.String",
                                            "ES2017.TypedArrays",
                                            "ES2017.ArrayBuffer",
                                            "ES2018",
                                            "ES2018.AsyncGenerator",
                                            "ES2018.AsyncIterable",
                                            "ES2018.Intl",
                                            "ES2018.Promise",
                                            "ES2018.Regexp",
                                            "ES2019",
                                            "ES2019.Array",
                                            "ES2019.Intl",
                                            "ES2019.Object",
                                            "ES2019.String",
                                            "ES2019.Symbol",
                                            "ES2020",
                                            "ES2020.BigInt",
                                            "ES2020.Promise",
                                            "ES2020.String",
                                            "ES2020.Symbol.WellKnown",
                                            "ESNext",
                                            "ESNext.Array",
                                            "ESNext.AsyncIterable",
                                            "ESNext.BigInt",
                                            "ESNext.Collection",
                                            "ESNext.Intl",
                                            "ESNext.Object",
                                            "ESNext.Promise",
                                            "ESNext.Regexp",
                                            "ESNext.String",
                                            "ESNext.Symbol",
                                            "DOM",
                                            "DOM.AsyncIterable",
                                            "DOM.Iterable",
                                            "ScriptHost",
                                            "WebWorker",
                                            "WebWorker.AsyncIterable",
                                            "WebWorker.ImportScripts",
                                            "Webworker.Iterable",
                                            "ES7",
                                            "ES2021",
                                            "ES2020.SharedMemory",
                                            "ES2020.Intl",
                                            "ES2020.Date",
                                            "ES2020.Number",
                                            "ES2021.Promise",
                                            "ES2021.String",
                                            "ES2021.WeakRef",
                                            "ESNext.WeakRef",
                                            "ES2021.Intl",
                                            "ES2022",
                                            "ES2022.Array",
                                            "ES2022.Error",
                                            "ES2022.Intl",
                                            "ES2022.Object",
                                            "ES2022.String",
                                            "ES2022.SharedMemory",
                                            "ES2022.RegExp",
                                            "ES2023",
                                            "ES2023.Array",
                                            "ES2024",
                                            "ES2024.ArrayBuffer",
                                            "ES2024.Collection",
                                            "ES2024.Object",
                                            "ES2024.Promise",
                                            "ES2024.Regexp",
                                            "ES2024.SharedMemory",
                                            "ES2024.String",
                                            "Decorators",
                                            "Decorators.Legacy",
                                            "ES2017.Date",
                                            "ES2023.Collection",
                                            "ESNext.Decorators",
                                            "ESNext.Disposable"
                                        ]
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]5|[Ee][Ss]6|[Ee][Ss]7$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2015(\\.([Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Oo][Rr][Ee]|[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Pp][Rr][Oo][Xx][Yy]|[Rr][Ee][Ff][Ll][Ee][Cc][Tt]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2016(\\.[Aa][Rr][Rr][Aa][Yy]\\.[Ii][Nn][Cc][Ll][Uu][Dd][Ee])?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2017(\\.([Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Tt][Yy][Pp][Ee][Dd][Aa][Rr][Rr][Aa][Yy][Ss]|[Dd][Aa][Tt][Ee]|[Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2018(\\.([Aa][Ss][Yy][Nn][Cc][Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2019(\\.([Aa][Rr][Rr][Aa][Yy]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2020(\\.([Bb][Ii][Gg][Ii][Nn][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ii][Nn][Tt][Ll]|[Dd][Aa][Tt][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2021(\\.([Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2022(\\.([Aa][Rr][Rr][Aa][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2023(\\.([Aa][Rr][Rr][Aa][Yy]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss]2024(\\.([Aa][Rr][Rr][Aa][Yy][Bb][Uu][Ff][Ff][Ee][Rr]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]))?$"
                                    },
                                    {
                                        "pattern": "^[Ee][Ss][Nn][Ee][Xx][Tt](\\.([Aa][Rr][Rr][Aa][Yy]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Bb][Ii][Gg][Ii][Nn][Tt]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]|[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss]|[Dd][Ii][Ss][Pp][Oo][Ss][Aa][Bb][Ll][Ee]))?$"
                                    },
                                    {
                                        "pattern": "^[Dd][Oo][Mm](\\.([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee])?$"
                                    },
                                    {
                                        "pattern": "^[Ss][Cc][Rr][Ii][Pp][Tt][Hh][Oo][Ss][Tt]$"
                                    },
                                    {
                                        "pattern": "^[Ww][Ee][Bb][Ww][Oo][Rr][Kk][Ee][Rr](\\.([Ii][Mm][Pp][Oo][Rr][Tt][Ss][Cc][Rr][Ii][Pp][Tt][Ss]|([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]))?$"
                                    },
                                    {
                                        "pattern": "^[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss](\\.([Ll][Ee][Gg][Aa][Cc][Yy]))?$"
                                    }
                                ]
                            },
                            "markdownDescription": "Specify a set of bundled library declaration files that describe the target runtime environment.\n\nSee more: https://www.typescriptlang.org/tsconfig#lib"
                        },
                        "libReplacement": {
                            "description": "Enable lib replacement.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": true,
                            "markdownDescription": "Enable lib replacement.\n\nSee more: https://www.typescriptlang.org/tsconfig#libReplacement"
                        },
                        "moduleDetection": {
                            "description": "Specify how TypeScript determine a file as module.",
                            "enum": [
                                "auto",
                                "legacy",
                                "force"
                            ]
                        },
                        "strictNullChecks": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "When type checking, take into account `null` and `undefined`.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "When type checking, take into account `null` and `undefined`.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictNullChecks"
                        },
                        "maxNodeModuleJsDepth": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.",
                            "type": [
                                "number",
                                "null"
                            ],
                            "default": 0,
                            "markdownDescription": "Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.\n\nSee more: https://www.typescriptlang.org/tsconfig#maxNodeModuleJsDepth"
                        },
                        "importHelpers": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow importing helper functions from tslib once per project, instead of including them per-file.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Allow importing helper functions from tslib once per project, instead of including them per-file.\n\nSee more: https://www.typescriptlang.org/tsconfig#importHelpers"
                        },
                        "importsNotUsedAsValues": {
                            "description": "Specify emit/checking behavior for imports that are only used for types.",
                            "default": "remove",
                            "enum": [
                                "remove",
                                "preserve",
                                "error"
                            ]
                        },
                        "alwaysStrict": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Ensure 'use strict' is always emitted.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Ensure 'use strict' is always emitted.\n\nSee more: https://www.typescriptlang.org/tsconfig#alwaysStrict"
                        },
                        "strict": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable all strict type checking options.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable all strict type checking options.\n\nSee more: https://www.typescriptlang.org/tsconfig#strict"
                        },
                        "strictBindCallApply": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Check that the arguments for `bind`, `call`, and `apply` methods match the original function.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBindCallApply"
                        },
                        "downlevelIteration": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit more compliant, but verbose and less performant JavaScript for iteration.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Emit more compliant, but verbose and less performant JavaScript for iteration.\n\nSee more: https://www.typescriptlang.org/tsconfig#downlevelIteration"
                        },
                        "checkJs": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable error reporting in type-checked JavaScript files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable error reporting in type-checked JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#checkJs"
                        },
                        "strictFunctionTypes": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "When assigning functions, check to ensure parameters and the return values are subtype-compatible.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "When assigning functions, check to ensure parameters and the return values are subtype-compatible.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictFunctionTypes"
                        },
                        "strictPropertyInitialization": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Check for class properties that are declared but not set in the constructor.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Check for class properties that are declared but not set in the constructor.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictPropertyInitialization"
                        },
                        "esModuleInterop": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.\n\nSee more: https://www.typescriptlang.org/tsconfig#esModuleInterop"
                        },
                        "allowUmdGlobalAccess": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Allow accessing UMD globals from modules.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Allow accessing UMD globals from modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUmdGlobalAccess"
                        },
                        "keyofStringsOnly": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Make keyof only return strings instead of string, numbers or symbols. Legacy option.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Make keyof only return strings instead of string, numbers or symbols. Legacy option.\n\nSee more: https://www.typescriptlang.org/tsconfig#keyofStringsOnly"
                        },
                        "useDefineForClassFields": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Emit ECMAScript-standard-compliant class fields.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Emit ECMAScript-standard-compliant class fields.\n\nSee more: https://www.typescriptlang.org/tsconfig#useDefineForClassFields"
                        },
                        "declarationMap": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Create sourcemaps for d.ts files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Create sourcemaps for d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationMap"
                        },
                        "resolveJsonModule": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable importing .json files",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Enable importing .json files\n\nSee more: https://www.typescriptlang.org/tsconfig#resolveJsonModule"
                        },
                        "resolvePackageJsonExports": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Use the package.json 'exports' field when resolving package imports.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Use the package.json 'exports' field when resolving package imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonExports"
                        },
                        "resolvePackageJsonImports": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Use the package.json 'imports' field when resolving imports.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Use the package.json 'imports' field when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonImports"
                        },
                        "assumeChangesOnlyAffectDirectDependencies": {
                            "description": "Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it. Requires TypeScript version 3.8 or later.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "extendedDiagnostics": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Output more detailed compiler performance information after building.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Output more detailed compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#extendedDiagnostics"
                        },
                        "listFilesOnly": {
                            "description": "Print names of files that are part of the compilation and then stop processing.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "disableSourceOfProjectReferenceRedirect": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable preferring source files instead of declaration files when referencing composite projects",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Disable preferring source files instead of declaration files when referencing composite projects\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSourceOfProjectReferenceRedirect"
                        },
                        "disableSolutionSearching": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Opt a project out of multi-project reference checking when editing.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Opt a project out of multi-project reference checking when editing.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSolutionSearching"
                        },
                        "verbatimModuleSyntax": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "markdownDescription": "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.\n\nSee more: https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax"
                        },
                        "noCheck": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Disable full type checking (only critical parse and emit errors will be reported)",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Disable full type checking (only critical parse and emit errors will be reported)\n\nSee more: https://www.typescriptlang.org/tsconfig#noCheck"
                        },
                        "isolatedDeclarations": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Require sufficient annotation on exports so other tools can trivially generate declaration files.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Require sufficient annotation on exports so other tools can trivially generate declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedDeclarations"
                        },
                        "noUncheckedSideEffectImports": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Check side effect imports.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Check side effect imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports"
                        },
                        "strictBuiltinIteratorReturn": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false,
                            "markdownDescription": "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBuiltinIteratorReturn"
                        }
                    }
                }
            }
        },
        "typeAcquisitionDefinition": {
            "properties": {
                "typeAcquisition": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "type": [
                        "object",
                        "null"
                    ],
                    "description": "Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.",
                    "properties": {
                        "enable": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Enable auto type acquisition",
                            "type": [
                                "boolean",
                                "null"
                            ],
                            "default": false
                        },
                        "include": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specifies a list of type declarations to be included in auto type acquisition. Ex. [\"jquery\", \"lodash\"]",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            }
                        },
                        "exclude": {
                            "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                            "description": "Specifies a list of type declarations to be excluded from auto type acquisition. Ex. [\"jquery\", \"lodash\"]",
                            "type": [
                                "array",
                                "null"
                            ],
                            "uniqueItems": true,
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            }
                        }
                    }
                }
            }
        },
        "referencesDefinition": {
            "properties": {
                "references": {
                    "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    "type": [
                        "array",
                        "null"
                    ],
                    "uniqueItems": true,
                    "description": "Referenced projects. Requires TypeScript version 3.0 or later.",
                    "items": {
                        "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                        "type": [
                            "object",
                            "null"
                        ],
                        "description": "Project reference.",
                        "properties": {
                            "path": {
                                "$comment": "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                                "type": [
                                    "string",
                                    "null"
                                ],
                                "description": "Path to referenced tsconfig or to folder containing tsconfig."
                            }
                        }
                    }
                }
            }
        },
        "tsNodeModuleTypes": {
            "type": [
                "object",
                "null"
            ]
        },
        "tsNodeDefinition": {
            "properties": {
                "ts-node": {
                    "description": "ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration\n\nts-node offers TypeScript execution and REPL for node.js, with source map support.",
                    "properties": {
                        "compiler": {
                            "default": "typescript",
                            "description": "Specify a custom TypeScript compiler.",
                            "type": [
                                "string",
                                "null"
                            ]
                        },
                        "compilerHost": {
                            "default": false,
                            "description": "Use TypeScript's compiler host API instead of the language service API.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "compilerOptions": {
                            "additionalProperties": true,
                            "allOf": [
                                {
                                    "$ref": "#/definitions/compilerOptionsDefinition/properties/compilerOptions"
                                }
                            ],
                            "description": "JSON object to merge with TypeScript `compilerOptions`.",
                            "properties": {},
                            "type": [
                                "object",
                                "null"
                            ]
                        },
                        "emit": {
                            "default": false,
                            "description": "Emit output files into `.ts-node` directory.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "esm": {
                            "description": "Enable native ESM support.\n\nFor details, see https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "experimentalReplAwait": {
                            "description": "Allows the usage of top level await in REPL.\n\nUses node's implementation which accomplishes this with an AST syntax transformation.\n\nEnabled by default when tsconfig target is es2018 or above. Set to false to disable.\n\n**Note**: setting to `true` when tsconfig target is too low will throw an Error.  Leave as `undefined`\nto get default, automatic behavior.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "experimentalResolver": {
                            "description": "Enable experimental features that re-map imports and require calls to support:\n`baseUrl`, `paths`, `rootDirs`, `.js` to `.ts` file extension mappings,\n`outDir` to `rootDir` mappings for composite projects and monorepos.\n\nFor details, see https://github.com/TypeStrong/ts-node/issues/1514",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "experimentalSpecifierResolution": {
                            "description": "Like node's `--experimental-specifier-resolution`, , but can also be set in your `tsconfig.json` for convenience.\n\nFor details, see https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm",
                            "enum": [
                                "explicit",
                                "node"
                            ],
                            "type": [
                                "string",
                                "null"
                            ]
                        },
                        "files": {
                            "default": false,
                            "description": "Load \"files\" and \"include\" from `tsconfig.json` on startup.\n\nDefault is to override `tsconfig.json` \"files\" and \"include\" to only include the entrypoint script.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "ignore": {
                            "default": [
                                "(?:^|/)node_modules/"
                            ],
                            "description": "Paths which should not be compiled.\n\nEach string in the array is converted to a regular expression via `new RegExp()` and tested against source paths prior to compilation.\n\nSource paths are normalized to posix-style separators, relative to the directory containing `tsconfig.json` or to cwd if no `tsconfig.json` is loaded.\n\nDefault is to ignore all node_modules subdirectories.",
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "type": [
                                "array",
                                "null"
                            ]
                        },
                        "ignoreDiagnostics": {
                            "description": "Ignore TypeScript warnings by diagnostic code.",
                            "items": {
                                "type": [
                                    "string",
                                    "number"
                                ]
                            },
                            "type": [
                                "array",
                                "null"
                            ]
                        },
                        "logError": {
                            "default": false,
                            "description": "Logs TypeScript errors to stderr instead of throwing exceptions.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "moduleTypes": {
                            "$ref": "#/definitions/tsNodeModuleTypes",
                            "description": "Override certain paths to be compiled and executed as CommonJS or ECMAScript modules.\nWhen overridden, the tsconfig \"module\" and package.json \"type\" fields are overridden, and\nthe file extension is ignored.\nThis is useful if you cannot use .mts, .cts, .mjs, or .cjs file extensions;\nit achieves the same effect.\n\nEach key is a glob pattern following the same rules as tsconfig's \"include\" array.\nWhen multiple patterns match the same file, the last pattern takes precedence.\n\n`cjs` overrides matches files to compile and execute as CommonJS.\n`esm` overrides matches files to compile and execute as native ECMAScript modules.\n`package` overrides either of the above to default behavior, which obeys package.json \"type\" and\ntsconfig.json \"module\" options."
                        },
                        "preferTsExts": {
                            "default": false,
                            "description": "Re-order file extensions so that TypeScript imports are preferred.\n\nFor example, when both `index.js` and `index.ts` exist, enabling this option causes `require('./index')` to resolve to `index.ts` instead of `index.js`",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "pretty": {
                            "default": false,
                            "description": "Use pretty diagnostic formatter.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "require": {
                            "description": "Modules to require, like node's `--require` flag.\n\nIf specified in `tsconfig.json`, the modules will be resolved relative to the `tsconfig.json` file.\n\nIf specified programmatically, each input string should be pre-resolved to an absolute path for\nbest results.",
                            "items": {
                                "type": [
                                    "string",
                                    "null"
                                ]
                            },
                            "type": [
                                "array",
                                "null"
                            ]
                        },
                        "scope": {
                            "default": false,
                            "description": "Scope compiler to files within `scopeDir`.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "scopeDir": {
                            "default": "First of: `tsconfig.json` \"rootDir\" if specified, directory containing `tsconfig.json`, or cwd if no `tsconfig.json` is loaded.",
                            "type": [
                                "string",
                                "null"
                            ]
                        },
                        "skipIgnore": {
                            "default": false,
                            "description": "Skip ignore check, so that compilation will be attempted for all files with matching extensions.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "swc": {
                            "description": "Transpile with swc instead of the TypeScript compiler, and skip typechecking.\n\nEquivalent to setting both `transpileOnly: true` and `transpiler: 'ts-node/transpilers/swc'`\n\nFor complete instructions: https://typestrong.org/ts-node/docs/transpilers",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "transpileOnly": {
                            "default": false,
                            "description": "Use TypeScript's faster `transpileModule`.",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        },
                        "transpiler": {
                            "anyOf": [
                                {
                                    "items": [
                                        {
                                            "type": [
                                                "string",
                                                "null"
                                            ]
                                        },
                                        {
                                            "additionalProperties": true,
                                            "properties": {},
                                            "type": [
                                                "object",
                                                "null"
                                            ]
                                        }
                                    ],
                                    "maxItems": 2,
                                    "minItems": 2,
                                    "type": [
                                        "array",
                                        "null"
                                    ]
                                },
                                {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                }
                            ],
                            "description": "Specify a custom transpiler for use with transpileOnly"
                        },
                        "typeCheck": {
                            "default": true,
                            "description": "**DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).",
                            "type": [
                                "boolean",
                                "null"
                            ]
                        }
                    },
                    "type": [
                        "object",
                        "null"
                    ]
                }
            }
        }
    },
    "id": "https://json.schemastore.org/tsconfig",
    "title": "JSON schema for the TypeScript compiler's configuration file",
    "type": "object"
},
  "VaultAdminAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultAdminAgreement",
    "title": "Vault Administrator Agreement",
    "description": "Defines the responsibilities and permissions of a Vault administrator.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "enum": [
                "License",
                "CreativeWork"
            ],
            "description": "Schema.org type"
        },
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "vaultId": {
            "type": "string",
            "description": "DID of the Vault."
        },
        "adminId": {
            "type": "string",
            "description": "DID of the administrator."
        },
        "permissions": {
            "type": "object",
            "properties": {
                "manageTags": {
                    "type": "boolean",
                    "description": "Can the admin control tagging policies?"
                },
                "approvePlugins": {
                    "type": "boolean",
                    "description": "Can the admin approve plugin installations?"
                },
                "controlAccess": {
                    "type": "boolean",
                    "description": "Can the admin manage user access?"
                }
            }
        },
        "governanceRules": {
            "type": "string",
            "description": "Link to the governance framework this admin follows."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Under what conditions an admin's privileges can be revoked."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the admin has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "vaultId",
        "adminId",
        "permissions",
        "governanceRules",
        "revocationPolicy",
        "agreementSigned",
        "timestamp"
    ]
},
  "VaultChamberGovernance": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultChamberGovernance",
    "title": "Vault Chamber Governance",
    "description": "Defines governance processes for a Governance Chamber, including proposals and voting.",
    "type": "object",
    "properties": {
        "chamberId": {
            "type": "string",
            "description": "DID of the Governance Chamber."
        },
        "governanceType": {
            "type": "string",
            "enum": [
                "vote",
                "multi-sig",
                "admin"
            ],
            "description": "How governance decisions are made."
        },
        "allowedParticipants": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of DIDs allowed to participate in governance."
        },
        "proposalProcess": {
            "type": "object",
            "properties": {
                "minTrustScore": {
                    "type": "number",
                    "description": "Minimum trust score to submit proposals."
                },
                "proposalApproval": {
                    "type": "string",
                    "enum": [
                        "simple-majority",
                        "supermajority",
                        "consensus"
                    ],
                    "description": "Approval threshold."
                }
            }
        },
        "votingProcess": {
            "type": "object",
            "properties": {
                "votingPeriod": {
                    "type": "string",
                    "description": "Duration of voting."
                },
                "requiredParticipation": {
                    "type": "number",
                    "description": "Minimum % of eligible voters to pass."
                }
            }
        }
    },
    "required": [
        "chamberId",
        "governanceType",
        "allowedParticipants",
        "proposalProcess",
        "votingProcess"
    ]
},
  "VaultChamberPlugin": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultChamberPlugin",
    "title": "Vault Chamber Plugin",
    "description": "Tracks plugins installed within a Vault Chamber and their permissions.",
    "type": "object",
    "properties": {
        "chamberId": {
            "type": "string",
            "description": "DID of the Vault Chamber."
        },
        "pluginId": {
            "type": "string",
            "description": "DID of the installed plugin."
        },
        "installedBy": {
            "type": "string",
            "description": "DID of the user who installed the plugin."
        },
        "permissions": {
            "type": "object",
            "properties": {
                "storageAccess": {
                    "type": "boolean",
                    "description": "Can the plugin access storage?"
                },
                "computeAccess": {
                    "type": "boolean",
                    "description": "Can the plugin use compute resources?"
                },
                "identityAccess": {
                    "type": "boolean",
                    "description": "Can the plugin interact with identity data?"
                }
            }
        },
        "installationDate": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the plugin was installed."
        }
    },
    "required": [
        "chamberId",
        "pluginId",
        "installedBy",
        "permissions",
        "installationDate"
    ]
},
  "VaultChamberTagging": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultChamberTagging",
    "title": "Vault Chamber Tagging",
    "description": "Defines the tagging system within a Vault, including permissions, allowed tags, and Data Chambers.",
    "type": "object",
    "properties": {
        "vaultId": {
            "type": "string",
            "description": "DID of the Vault."
        },
        "admin": {
            "type": "string",
            "description": "DID of the Vault administrator."
        },
        "allowedTags": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "tag": {
                        "type": "string",
                        "description": "The supported tag."
                    },
                    "restricted": {
                        "type": "boolean",
                        "description": "Whether this tag requires admin approval."
                    },
                    "linkedChamber": {
                        "type": "string",
                        "description": "DID of a Data Chamber if this tag represents a data pool."
                    }
                }
            },
            "description": "List of supported tags and their access control settings."
        },
        "userTaggingPermissions": {
            "type": "object",
            "properties": {
                "allowUserTagging": {
                    "type": "boolean",
                    "description": "Whether users can add their own tags."
                },
                "moderationRequired": {
                    "type": "boolean",
                    "description": "Whether admin approval is required for new user tags."
                }
            },
            "description": "Defines user permissions for tagging."
        }
    },
    "required": [
        "vaultId",
        "admin",
        "allowedTags",
        "userTaggingPermissions"
    ]
},
  "VaultChamberTransaction": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultChamberTransaction",
    "title": "Vault Chamber Transaction",
    "description": "Records payment-based access events for transactional Vault Chambers.",
    "type": "object",
    "properties": {
        "transactionId": {
            "type": "string",
            "description": "Unique ID of the transaction."
        },
        "chamberId": {
            "type": "string",
            "description": "DID of the Vault Chamber."
        },
        "buyer": {
            "type": "string",
            "description": "DID of the user who paid for access."
        },
        "amountPaid": {
            "type": "number",
            "description": "Amount paid for access."
        },
        "currency": {
            "type": "string",
            "description": "Currency used (e.g., USD, CHEQ, ETH)."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of transaction."
        },
        "accessDuration": {
            "type": "string",
            "description": "How long the user can access the Chamber."
        }
    },
    "required": [
        "transactionId",
        "chamberId",
        "buyer",
        "amountPaid",
        "currency",
        "timestamp",
        "accessDuration"
    ]
},
  "VaultDeclaration": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.io/VaultDeclaration",
    "title": "Vault DID Declaration",
    "description": "Defines an OV Vault's ownership, governance, and access policies.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the vault."
        },
        "type": {
            "const": "VaultDID",
            "description": "Indicates this is a Vault DID declaration."
        },
        "owner": {
            "type": "string",
            "description": "The DID of the user or organization that owns this vault."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the OV cluster managing this vault."
        },
        "storageNodes": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of Storage Node DIDs storing this vault's data."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., Metadata, AccessLog, ContentManifest)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "References to vault metadata, manifests, and access logs."
        },
        "accessPolicies": {
            "type": "object",
            "properties": {
                "readAccess": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of DIDs that can read from this vault."
                },
                "writeAccess": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "description": "List of DIDs that can write to this vault."
                },
                "publicAccess": {
                    "type": "boolean",
                    "description": "Whether the vault is publicly accessible."
                }
            },
            "description": "Defines who can access and modify the vault."
        },
        "governance": {
            "type": "object",
            "properties": {
                "governedBy": {
                    "type": "string",
                    "description": "DID of the governance body managing vault policies (e.g., a DAO or admin)."
                },
                "disputeResolution": {
                    "type": "string",
                    "description": "DID reference to a dispute resolution service."
                }
            },
            "description": "Governance and compliance policies for the vault."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when this vault declaration was issued."
        }
    },
    "required": [
        "id",
        "owner",
        "cluster",
        "storageNodes",
        "timestamp"
    ]
},
  "VaultOperator": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultOperatorPersona",
    "title": "Vault Operator Persona",
    "description": "Defines a vault operator in the OriginVault ecosystem.",
    "type": "object",
    "properties": {
        "managedVaults": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of vaults managed by this operator."
            }
        },
        "governanceModel": {
            "type": "string",
            "enum": [
                "Admin-Controlled",
                "DAO-Based",
                "Token-Weighted"
            ],
            "description": "Defines how the vault is governed."
        },
        "vaultAccessPolicies": {
            "type": "object",
            "properties": {
                "allowsPublicContributions": {
                    "type": "boolean",
                    "description": "Whether non-members can contribute to the vault."
                },
                "monetizationModel": {
                    "type": "string",
                    "enum": [
                        "Subscription",
                        "Pay-per-View",
                        "One-Time Purchase"
                    ],
                    "description": "Defines the revenue model for content access."
                }
            },
            "description": "Defines policies for managing vault access and revenue."
        }
    },
    "required": [
        "managedVaults",
        "governanceModel",
        "vaultAccessPolicies"
    ]
},
  "VaultPluginInstallationLog": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/PluginInstallationLog",
    "title": "Plugin Installation Log",
    "description": "Tracks the installation of plugins within an OV Vault, ensuring compliance with cluster policies.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the vault plugin installation."
        },
        "vault": {
            "type": "string",
            "description": "The DID of the vault where the plugin is installed."
        },
        "plugin": {
            "type": "string",
            "description": "The DID of the installed plugin."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster the vault belongs to."
        },
        "installedBy": {
            "type": "string",
            "description": "DID of the entity that installed the plugin."
        },
        "status": {
            "type": "string",
            "enum": [
                "installed",
                "active",
                "suspended",
                "removed"
            ],
            "description": "The status of the plugin installation."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of installation."
        }
    },
    "required": [
        "id",
        "vault",
        "plugin",
        "cluster",
        "installedBy",
        "status",
        "timestamp"
    ]
},
  "VaultUserAgreement": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VaultUserAgreement",
    "title": "Vault User Agreement",
    "description": "Defines the terms for users accessing content within a Vault.",
    "type": "object",
    "properties": {
        "agreementId": {
            "type": "string",
            "description": "DID of the agreement."
        },
        "vaultId": {
            "type": "string",
            "description": "DID of the Vault being accessed."
        },
        "userId": {
            "type": "string",
            "description": "DID of the user."
        },
        "accessPermissions": {
            "type": "object",
            "properties": {
                "read": {
                    "type": "boolean",
                    "description": "Whether the user can view content."
                },
                "write": {
                    "type": "boolean",
                    "description": "Whether the user can contribute content."
                },
                "purchase": {
                    "type": "boolean",
                    "description": "Whether the user can buy content."
                }
            }
        },
        "usageRestrictions": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "No Redistribution",
                    "No AI Training",
                    "No Commercial Use"
                ]
            },
            "description": "Restrictions on how the user can use the content."
        },
        "revocationPolicy": {
            "type": "string",
            "description": "Conditions under which access can be revoked."
        },
        "agreementSigned": {
            "type": "boolean",
            "description": "Whether the user has accepted the agreement."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Time of agreement acceptance."
        }
    },
    "required": [
        "agreementId",
        "vaultId",
        "userId",
        "accessPermissions",
        "usageRestrictions",
        "revocationPolicy",
        "agreementSigned",
        "timestamp"
    ]
},
  "VerificationLog": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VerificationLog",
    "title": "Verification Log Schema",
    "description": "Tracks verifications, compliance audits, and trust decisions.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the verification log."
        },
        "entity": {
            "type": "string",
            "description": "The DID of the verified entity."
        },
        "verifiedBy": {
            "type": "string",
            "description": "The DID of the authority performing verification."
        },
        "verificationType": {
            "type": "string",
            "enum": [
                "IdentityCheck",
                "SecurityAudit",
                "PerformanceTest"
            ],
            "description": "Type of verification performed."
        },
        "status": {
            "type": "string",
            "enum": [
                "Passed",
                "Failed",
                "Pending"
            ],
            "description": "Outcome of the verification."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of verification."
        }
    },
    "required": [
        "id",
        "entity",
        "verifiedBy",
        "verificationType",
        "status",
        "timestamp"
    ]
},
  "VerificationNode": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VerificationNodeDeclaration",
    "title": "Verification Node Declaration",
    "description": "Defines a Verification Node in an OV Cluster.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the Verification Node."
        },
        "type": {
            "const": "VerificationNode",
            "description": "Node type."
        },
        "cluster": {
            "type": "string",
            "description": "The DID of the cluster this node belongs to."
        },
        "operator": {
            "type": "string",
            "description": "DID of the entity operating this node."
        },
        "verificationTasks": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of supported verification tasks (e.g., DID Validation, Signature Verification, Compliance Checks)."
        },
        "linkedResources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The DID of the linked resource."
                    },
                    "type": {
                        "type": "string",
                        "description": "The type of resource (e.g., Data, Metadata, ContentManifest)."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the linked resource."
                    },
                    "description": {
                        "type": "string",
                        "description": "The description of the linked resource."
                    },
                    "uri": {
                        "type": "string",
                        "description": "The uri of the linked resource."
                    }
                },
                "required": [
                    "id",
                    "type",
                    "name",
                    "description",
                    "uri"
                ]
            },
            "description": "References to stored resources."
        },
        "trustLevel": {
            "type": "string",
            "enum": [
                "Low",
                "Medium",
                "High"
            ],
            "description": "Trust level assigned to this node based on verification authority."
        },
        "verificationLogs": {
            "type": "string",
            "description": "Reference to a log of verification checks performed."
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "suspended",
                "revoked"
            ],
            "description": "Operational status of the node."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of node declaration."
        }
    },
    "required": [
        "id",
        "cluster",
        "operator",
        "verificationTasks",
        "trustLevel",
        "status",
        "timestamp"
    ]
},
  "Verifier": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/VerifierPersona",
    "title": "Verifier Persona",
    "description": "Defines a verifier in the OriginVault ecosystem.",
    "type": "object",
    "properties": {
        "@type": {
            "type": "string",
            "description": "Schema.org type"
        },
        "verificationsPerformed": {
            "type": "number",
            "description": "Total number of verification actions performed."
        },
        "approvedNamespaces": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "DIDs of namespaces the verifier is trusted in."
            }
        },
        "trustScoreImpact": {
            "type": "number",
            "description": "Modifier applied to their reputation based on accuracy."
        },
        "disputedVerifications": {
            "type": "number",
            "description": "Count of verification decisions that were disputed or reversed."
        }
    },
    "required": [
        "verificationsPerformed",
        "approvedNamespaces",
        "trustScoreImpact"
    ]
},
  "VotingSchema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.originvault.box/Voting",
    "title": "Governance Voting Schema",
    "description": "Tracks voting activity on governance proposals.",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "The DID of the voting record."
        },
        "proposal": {
            "type": "string",
            "description": "DID of the proposal being voted on."
        },
        "voter": {
            "type": "string",
            "description": "DID of the voter."
        },
        "vote": {
            "type": "string",
            "enum": [
                "Yes",
                "No",
                "Abstain"
            ],
            "description": "Vote cast by the participant."
        },
        "weight": {
            "type": "number",
            "description": "Weight of the voter's vote (e.g., based on staked tokens)."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of the vote submission."
        }
    },
    "required": [
        "id",
        "proposal",
        "voter",
        "vote",
        "weight",
        "timestamp"
    ]
}
} as const;

export const SCHEMA_HASHES = {
  "Admin": "dbecfc2f9ba4ddee",
  "AIConfig": "5ef397ced24cdca3",
  "AIModelTrainingAgreement": "d70d5e16308ccf8d",
  "ClaimVerification": "8c058d044fcd001f",
  "ClusterGovernance": "62c5014d52f68559",
  "ClusterRegistration": "5d8c277223ead6d4",
  "CommunityMember": "f31f34eeef429802",
  "ComputeNode": "0d8cdc9aea4d8d5f",
  "ContentAIPermissionAssertionCredential": "ed866ace505ab926",
  "ContentAuthenticityAssertionCredential": "50dd17007a5a6a78",
  "ContentExtendedMetadata": "b49f9344bdb80aa5",
  "ContentLegalAccountability": "205f57d8584cd931",
  "ContentLicensingAgreement": "488f3d178eac7df7",
  "ContentLicensingTerms": "9e765f16cf7aa92a",
  "Creator": "d1006cf7865ede74",
  "DataChamberContributionAgreement": "a69e4e5a827fc3c9",
  "DataChamberEnrollment": "23f6d0638d0c8ac8",
  "Developer": "02974c14c63e11ad",
  "DevelopmentEnvironmentMetadata": "be04335e0377a54e",
  "DIDAssertionCredential": "cff1c6c01b61ed5d",
  "DIDDeclaration": "c230e82498e5853b",
  "DigitalDocument": "ff51dfc7f5be546d",
  "EndorsementRecord": "61a979e8f740da6d",
  "ExternalBuyerAgreement": "bcfdf4e67f303575",
  "ExternalDataAccess": "8c3f1348f12c54e0",
  "GemDeclaration": "d18f185813d1f74d",
  "GemIssuanceRecord": "4ce38cdb71fafad0",
  "GemReputationScore": "ea1355ba16f9824b",
  "GemRevocationRecord": "ac64a6580d028546",
  "GemTrustRegistry": "01e87b3a528fd618",
  "GlobalPrivacyControl": "7a1c074846a3db7b",
  "GovernanceProposal": "9b1c13090402b37c",
  "IdentityClaimsAggregationCredential": "aecfb058814aabc9",
  "IdentityNodeDeclaration": "48d1ac51963b218d",
  "LanguageConfiguration": "eb5fa9b073bc5550",
  "NamespaceDeclaration": "c0c169189def2988",
  "NamespaceGovernance": "96031fb8a9d0998d",
  "NamespaceParticipationAgreement": "d5acef2e23cae53e",
  "NamespacePluginDeclaration": "ebad72472aa2b5c9",
  "NamespaceProposal": "488511ffe42afff3",
  "NamespaceRecognitionCertificate": "e8ff57e3052fd0e6",
  "NamespaceReputationRecord": "79733616a7048087",
  "NodeClusterDeclaration": "cbf8c467730fccf5",
  "NodeDeclaration": "e299dd1da080f30b",
  "NodeOperatorAgreement": "c7da31c251c984dc",
  "NodeVoting": "298dc987d9f9115b",
  "Owner": "a267eaf3ac918228",
  "PackageJson": "a4102bab35450ceb",
  "Persona": "3e128855d187b848",
  "PluginDeclaration": "a177673149fe1f76",
  "PluginDeveloperAgreement": "65f245a2f1288471",
  "PluginExectutionRequest": "0db1a11e95836735",
  "PluginIntegrationAgreement": "08eb685f9b55d33a",
  "ReferalAgreement": "0eb171e3b32e2df9",
  "RevenuDistribution": "d011f25e3f3c234b",
  "Revocation": "e156647323933e43",
  "RootAuthority": "2afafb69b1bd0ef0",
  "ServiceLevelAgreement": "3a5f60ecb841038c",
  "StorageNodeDeclaration": "34956500c4e271f2",
  "TrustChainDelegation": "e9c92577cc2f726b",
  "TrustDelegation": "92e63377410eda91",
  "TrustedIssuer": "46e5a8521671b570",
  "TrustGate": "a98178988d66deb1",
  "TrustScore": "d7935044851cb392",
  "TsconfigJson": "e9adda821c2f0a17",
  "VaultAdminAgreement": "e5eae1428ba46fd5",
  "VaultChamberGovernance": "7cbdb4325892710d",
  "VaultChamberPlugin": "b796b46d45134305",
  "VaultChamberTagging": "15f98337ae4033ed",
  "VaultChamberTransaction": "05c23d7c23b61867",
  "VaultDeclaration": "feaabcf9d6884d81",
  "VaultOperator": "54302395c476c1f9",
  "VaultPluginInstallationLog": "33dc13f5855a4643",
  "VaultUserAgreement": "11f58cac111cfe05",
  "VerificationLog": "d64f99385e997ecf",
  "VerificationNode": "fc7f00266e5fb58d",
  "Verifier": "846df176af70066d",
  "VotingSchema": "a76b926ba474ef2c"
} as const;

export const SCHEMA_METADATA = {
  "Admin": {
    name: "Admin",
    id: "https://schemas.originvault.box/Admin",
    hash: "dbecfc2f9ba4ddee",
    version: "1.0.0"
  },
  "AIConfig": {
    name: "AIConfig",
    id: "https://json.schemastore.org/aiconfig-1.0.json",
    hash: "5ef397ced24cdca3",
    version: "1.0.0"
  },
  "AIModelTrainingAgreement": {
    name: "AIModelTrainingAgreement",
    id: "https://schemas.originvault.io/AITrainingAgreement",
    hash: "d70d5e16308ccf8d",
    version: "1.0.0"
  },
  "ClaimVerification": {
    name: "ClaimVerification",
    id: "https://schemas.originvault.box/ClaimVerification",
    hash: "8c058d044fcd001f",
    version: "1.0.0"
  },
  "ClusterGovernance": {
    name: "ClusterGovernance",
    id: "https://schemas.originvault.box/ClusterGovernance",
    hash: "62c5014d52f68559",
    version: "1.0.0"
  },
  "ClusterRegistration": {
    name: "ClusterRegistration",
    id: "https://schemas.originvault.box/ClusterRegistration",
    hash: "5d8c277223ead6d4",
    version: "1.0.0"
  },
  "CommunityMember": {
    name: "CommunityMember",
    id: "https://schemas.originvault.box/CommunityMemberPersona",
    hash: "f31f34eeef429802",
    version: "1.0.0"
  },
  "ComputeNode": {
    name: "ComputeNode",
    id: "https://schemas.originvault.io/ComputeNodeDeclaration",
    hash: "0d8cdc9aea4d8d5f",
    version: "1.0.0"
  },
  "ContentAIPermissionAssertionCredential": {
    name: "ContentAIPermissionAssertionCredential",
    id: "https://schemas.originvault.box/ContentAIPermissionAssertionCredential",
    hash: "ed866ace505ab926",
    version: "1.0.0"
  },
  "ContentAuthenticityAssertionCredential": {
    name: "ContentAuthenticityAssertionCredential",
    id: "https://schemas.originvault.box/ContentAuthenticityAssertionCredential",
    hash: "50dd17007a5a6a78",
    version: "1.0.0"
  },
  "ContentExtendedMetadata": {
    name: "ContentExtendedMetadata",
    id: "https://schemas.originvault.box/ContentExtendedMetadataAssertionCredential",
    hash: "b49f9344bdb80aa5",
    version: "1.0.0"
  },
  "ContentLegalAccountability": {
    name: "ContentLegalAccountability",
    id: "https://schemas.originvault.box/ContentLegalAccountability",
    hash: "205f57d8584cd931",
    version: "1.0.0"
  },
  "ContentLicensingAgreement": {
    name: "ContentLicensingAgreement",
    id: "https://schemas.originvault.box/ContentLicensingAgreement",
    hash: "488f3d178eac7df7",
    version: "1.0.0"
  },
  "ContentLicensingTerms": {
    name: "ContentLicensingTerms",
    id: "https://schemas.originvault.box/ContentLicensingTerms",
    hash: "9e765f16cf7aa92a",
    version: "1.0.0"
  },
  "Creator": {
    name: "Creator",
    id: "https://schemas.originvault.io/Creator",
    hash: "d1006cf7865ede74",
    version: "1.0.0"
  },
  "DataChamberContributionAgreement": {
    name: "DataChamberContributionAgreement",
    id: "https://schemas.originvault.box/DataChamberContributorAgreement",
    hash: "a69e4e5a827fc3c9",
    version: "1.0.0"
  },
  "DataChamberEnrollment": {
    name: "DataChamberEnrollment",
    id: "https://schemas.originvault.box/DataChamberEnrollment",
    hash: "23f6d0638d0c8ac8",
    version: "1.0.0"
  },
  "Developer": {
    name: "Developer",
    id: "https://schemas.originvault.box/Developer",
    hash: "02974c14c63e11ad",
    version: "1.0.0"
  },
  "DevelopmentEnvironmentMetadata": {
    name: "DevelopmentEnvironmentMetadata",
    id: "https://schemas.originvault.box/DevelopmentEnvironmentMetadata.schema.json",
    hash: "be04335e0377a54e",
    version: "1.0.0"
  },
  "DIDAssertionCredential": {
    name: "DIDAssertionCredential",
    id: "https://schemas.originvault.box/DIDAssertionCredential.schema.json",
    hash: "cff1c6c01b61ed5d",
    version: "1.0.0"
  },
  "DIDDeclaration": {
    name: "DIDDeclaration",
    id: "https://schemas.originvault.box/DIDDeclaration",
    hash: "c230e82498e5853b",
    version: "1.0.0"
  },
  "DigitalDocument": {
    name: "DigitalDocument",
    id: "https://schemas.originvault.box/DigitalDocument",
    hash: "ff51dfc7f5be546d",
    version: "1.0.0"
  },
  "EndorsementRecord": {
    name: "EndorsementRecord",
    id: "https://schemas.originvault.box/EndorsementRecord",
    hash: "61a979e8f740da6d",
    version: "1.0.0"
  },
  "ExternalBuyerAgreement": {
    name: "ExternalBuyerAgreement",
    id: "https://schemas.originvault.box/ExternalDataBuyerAgreement",
    hash: "bcfdf4e67f303575",
    version: "1.0.0"
  },
  "ExternalDataAccess": {
    name: "ExternalDataAccess",
    id: "https://schemas.originvault.box/ExternalDataAccess",
    hash: "8c3f1348f12c54e0",
    version: "1.0.0"
  },
  "GemDeclaration": {
    name: "GemDeclaration",
    id: "https://schemas.originvault.box/GemDeclaration",
    hash: "d18f185813d1f74d",
    version: "1.0.0"
  },
  "GemIssuanceRecord": {
    name: "GemIssuanceRecord",
    id: "https://schemas.originvault.box/GemIssuance",
    hash: "4ce38cdb71fafad0",
    version: "1.0.0"
  },
  "GemReputationScore": {
    name: "GemReputationScore",
    id: "https://schemas.originvault.box/GemReputation",
    hash: "ea1355ba16f9824b",
    version: "1.0.0"
  },
  "GemRevocationRecord": {
    name: "GemRevocationRecord",
    id: "https://schemas.originvault.box/GemRevocation",
    hash: "ac64a6580d028546",
    version: "1.0.0"
  },
  "GemTrustRegistry": {
    name: "GemTrustRegistry",
    id: "https://schemas.originvault.box/GemTrustRegistry",
    hash: "01e87b3a528fd618",
    version: "1.0.0"
  },
  "GlobalPrivacyControl": {
    name: "GlobalPrivacyControl",
    id: "GlobalPrivacyControl",
    hash: "7a1c074846a3db7b",
    version: "1.0.0"
  },
  "GovernanceProposal": {
    name: "GovernanceProposal",
    id: "https://schemas.originvault.box/GovernanceProposal",
    hash: "9b1c13090402b37c",
    version: "1.0.0"
  },
  "IdentityClaimsAggregationCredential": {
    name: "IdentityClaimsAggregationCredential",
    id: "https://cawg.io/schemas/v1/creator-identity-assertion.json",
    hash: "aecfb058814aabc9",
    version: "1.0.0"
  },
  "IdentityNodeDeclaration": {
    name: "IdentityNodeDeclaration",
    id: "https://schemas.originvault.box/IdentityNodeDeclaration",
    hash: "48d1ac51963b218d",
    version: "1.0.0"
  },
  "LanguageConfiguration": {
    name: "LanguageConfiguration",
    id: "https://json.schemastore.org/language-configuration.json",
    hash: "eb5fa9b073bc5550",
    version: "1.0.0"
  },
  "NamespaceDeclaration": {
    name: "NamespaceDeclaration",
    id: "https://schemas.originvault.box/NamespaceDeclaration",
    hash: "c0c169189def2988",
    version: "1.0.0"
  },
  "NamespaceGovernance": {
    name: "NamespaceGovernance",
    id: "https://schemas.originvault.box/NamespaceGovernance",
    hash: "96031fb8a9d0998d",
    version: "1.0.0"
  },
  "NamespaceParticipationAgreement": {
    name: "NamespaceParticipationAgreement",
    id: "https://schemas.originvault.box/NamespaceParticipationAgreement",
    hash: "d5acef2e23cae53e",
    version: "1.0.0"
  },
  "NamespacePluginDeclaration": {
    name: "NamespacePluginDeclaration",
    id: "https://schemas.originvault.box/NamespacePluginDeclaration",
    hash: "ebad72472aa2b5c9",
    version: "1.0.0"
  },
  "NamespaceProposal": {
    name: "NamespaceProposal",
    id: "https://schemas.originvault.box/NamespaceProposal",
    hash: "488511ffe42afff3",
    version: "1.0.0"
  },
  "NamespaceRecognitionCertificate": {
    name: "NamespaceRecognitionCertificate",
    id: "https://schemas.originvault.box/NamespaceRecognitionCertificate",
    hash: "e8ff57e3052fd0e6",
    version: "1.0.0"
  },
  "NamespaceReputationRecord": {
    name: "NamespaceReputationRecord",
    id: "https://schemas.originvault.box/NamespaceReputationRecord",
    hash: "79733616a7048087",
    version: "1.0.0"
  },
  "NodeClusterDeclaration": {
    name: "NodeClusterDeclaration",
    id: "https://schemas.originvault.box/NodeClusterDeclaration",
    hash: "cbf8c467730fccf5",
    version: "1.0.0"
  },
  "NodeDeclaration": {
    name: "NodeDeclaration",
    id: "https://schemas.originvault.box/NodeDeclaration",
    hash: "e299dd1da080f30b",
    version: "1.0.0"
  },
  "NodeOperatorAgreement": {
    name: "NodeOperatorAgreement",
    id: "https://schemas.originvault.box/NodeOperatorAgreement",
    hash: "c7da31c251c984dc",
    version: "1.0.0"
  },
  "NodeVoting": {
    name: "NodeVoting",
    id: "https://schemas.originvault.io/NodeVotingConsensusAgreement",
    hash: "298dc987d9f9115b",
    version: "1.0.0"
  },
  "Owner": {
    name: "Owner",
    id: "https://schemas.originvault.box/Owner",
    hash: "a267eaf3ac918228",
    version: "1.0.0"
  },
  "PackageJson": {
    name: "PackageJson",
    id: "https://json.schemastore.org/package.json",
    hash: "a4102bab35450ceb",
    version: "1.0.0"
  },
  "Persona": {
    name: "Persona",
    id: "https://schemas.originvault.box/Persona",
    hash: "3e128855d187b848",
    version: "1.0.0"
  },
  "PluginDeclaration": {
    name: "PluginDeclaration",
    id: "https://schemas.originvault.io/PluginDeclaration",
    hash: "a177673149fe1f76",
    version: "1.0.0"
  },
  "PluginDeveloperAgreement": {
    name: "PluginDeveloperAgreement",
    id: "https://schemas.originvault.box/PluginDeveloperAgreement",
    hash: "65f245a2f1288471",
    version: "1.0.0"
  },
  "PluginExectutionRequest": {
    name: "PluginExectutionRequest",
    id: "https://schemas.originvault.box/PluginExecutionRequest",
    hash: "0db1a11e95836735",
    version: "1.0.0"
  },
  "PluginIntegrationAgreement": {
    name: "PluginIntegrationAgreement",
    id: "https://schemas.originvault.box/PluginIntegrationAgreement",
    hash: "08eb685f9b55d33a",
    version: "1.0.0"
  },
  "ReferalAgreement": {
    name: "ReferalAgreement",
    id: "https://schemas.originvault.box/ReferalAgreement",
    hash: "0eb171e3b32e2df9",
    version: "1.0.0"
  },
  "RevenuDistribution": {
    name: "RevenuDistribution",
    id: "https://schemas.originvault.box/RevenueDistribution",
    hash: "d011f25e3f3c234b",
    version: "1.0.0"
  },
  "Revocation": {
    name: "Revocation",
    id: "https://schemas.originvault.box/Revocation",
    hash: "e156647323933e43",
    version: "1.0.0"
  },
  "RootAuthority": {
    name: "RootAuthority",
    id: "https://schemas.originvault.box/RootAuthority",
    hash: "2afafb69b1bd0ef0",
    version: "1.0.0"
  },
  "ServiceLevelAgreement": {
    name: "ServiceLevelAgreement",
    id: "https://schemas.originvault.io/ServiceLevelAgreement",
    hash: "3a5f60ecb841038c",
    version: "1.0.0"
  },
  "StorageNodeDeclaration": {
    name: "StorageNodeDeclaration",
    id: "https://schemas.originvault.box/StorageNodeDeclaration",
    hash: "34956500c4e271f2",
    version: "1.0.0"
  },
  "TrustChainDelegation": {
    name: "TrustChainDelegation",
    id: "https://schemas.originvault.box/TrustChainDelegation",
    hash: "e9c92577cc2f726b",
    version: "1.0.0"
  },
  "TrustDelegation": {
    name: "TrustDelegation",
    id: "https://schemas.originvault.box/TrustEndorsement",
    hash: "92e63377410eda91",
    version: "1.0.0"
  },
  "TrustedIssuer": {
    name: "TrustedIssuer",
    id: "https://schemas.originvault.box/TrustedIssuer",
    hash: "46e5a8521671b570",
    version: "1.0.0"
  },
  "TrustGate": {
    name: "TrustGate",
    id: "https://schemas.originvault.io/TrustGate",
    hash: "a98178988d66deb1",
    version: "1.0.0"
  },
  "TrustScore": {
    name: "TrustScore",
    id: "https://schemas.originvault.box/TrustScore",
    hash: "d7935044851cb392",
    version: "1.0.0"
  },
  "TsconfigJson": {
    name: "TsconfigJson",
    id: "TsconfigJson",
    hash: "e9adda821c2f0a17",
    version: "1.0.0"
  },
  "VaultAdminAgreement": {
    name: "VaultAdminAgreement",
    id: "https://schemas.originvault.box/VaultAdminAgreement",
    hash: "e5eae1428ba46fd5",
    version: "1.0.0"
  },
  "VaultChamberGovernance": {
    name: "VaultChamberGovernance",
    id: "https://schemas.originvault.box/VaultChamberGovernance",
    hash: "7cbdb4325892710d",
    version: "1.0.0"
  },
  "VaultChamberPlugin": {
    name: "VaultChamberPlugin",
    id: "https://schemas.originvault.box/VaultChamberPlugin",
    hash: "b796b46d45134305",
    version: "1.0.0"
  },
  "VaultChamberTagging": {
    name: "VaultChamberTagging",
    id: "https://schemas.originvault.box/VaultChamberTagging",
    hash: "15f98337ae4033ed",
    version: "1.0.0"
  },
  "VaultChamberTransaction": {
    name: "VaultChamberTransaction",
    id: "https://schemas.originvault.box/VaultChamberTransaction",
    hash: "05c23d7c23b61867",
    version: "1.0.0"
  },
  "VaultDeclaration": {
    name: "VaultDeclaration",
    id: "https://schemas.originvault.io/VaultDeclaration",
    hash: "feaabcf9d6884d81",
    version: "1.0.0"
  },
  "VaultOperator": {
    name: "VaultOperator",
    id: "https://schemas.originvault.box/VaultOperatorPersona",
    hash: "54302395c476c1f9",
    version: "1.0.0"
  },
  "VaultPluginInstallationLog": {
    name: "VaultPluginInstallationLog",
    id: "https://schemas.originvault.box/PluginInstallationLog",
    hash: "33dc13f5855a4643",
    version: "1.0.0"
  },
  "VaultUserAgreement": {
    name: "VaultUserAgreement",
    id: "https://schemas.originvault.box/VaultUserAgreement",
    hash: "11f58cac111cfe05",
    version: "1.0.0"
  },
  "VerificationLog": {
    name: "VerificationLog",
    id: "https://schemas.originvault.box/VerificationLog",
    hash: "d64f99385e997ecf",
    version: "1.0.0"
  },
  "VerificationNode": {
    name: "VerificationNode",
    id: "https://schemas.originvault.box/VerificationNodeDeclaration",
    hash: "fc7f00266e5fb58d",
    version: "1.0.0"
  },
  "Verifier": {
    name: "Verifier",
    id: "https://schemas.originvault.box/VerifierPersona",
    hash: "846df176af70066d",
    version: "1.0.0"
  },
  "VotingSchema": {
    name: "VotingSchema",
    id: "https://schemas.originvault.box/Voting",
    hash: "a76b926ba474ef2c",
    version: "1.0.0"
  }
} as const;

export type SchemaName = keyof typeof SCHEMA_REGISTRY;
export type SchemaHash = typeof SCHEMA_HASHES[SchemaName];

// Helper functions for BFF integration
export function getSchemaByName(name: SchemaName) {
  return SCHEMA_REGISTRY[name];
}

export function getSchemaHash(name: SchemaName): string {
  return SCHEMA_HASHES[name];
}

export function validateSchemaHash(name: SchemaName, hash: string): boolean {
  return SCHEMA_HASHES[name] === hash;
}
