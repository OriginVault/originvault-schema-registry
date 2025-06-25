/**
 * Generated from NamespaceDeclaration.json
 * Schema: https://schemas.originvault.box/NamespaceDeclaration
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */
/**
 * Defines a namespace as a root authority that can establish trust chains and governance rules for its domain.
 */
export interface NamespaceDeclaration {
    /**
     * The DID of the namespace acting as a root authority.
     */
    id: string;
    /**
     * Indicates this is a Namespace DID declaration.
     */
    type?: "NamespaceDeclaration";
    /**
     * The domain or scope of this namespace
     */
    namespaceScope: string;
    rootAuthority: {
        /**
         * This namespace acts as a root authority
         */
        rootType: "namespace";
        /**
         * Primary purpose of trust chains in this namespace
         */
        trustChainPurpose: string;
        delegationPolicy?: {
            /**
             * Whether this namespace delegates to trusted issuers
             */
            allowsTrustedIssuers?: boolean;
            /**
             * Whether issuers must be accredited by this namespace
             */
            requiresAccreditation?: boolean;
            /**
             * Maximum depth of delegation chains
             */
            maxDelegationDepth?: number;
        };
    };
    governance: {
        /**
         * How this namespace makes governance decisions
         */
        governanceModel: "self-governed" | "dao" | "multisig" | "committee" | "democratic" | "consortium";
        /**
         * DIDs of entities involved in namespace governance
         */
        governingParties?: string[];
        /**
         * Reference to namespace governance policies and procedures
         */
        policyFramework?: string;
    };
    interoperability?: {
        /**
         * DIDs of other namespaces this namespace recognizes or federates with
         */
        recognizedNamespaces?: string[];
        /**
         * Whether credentials from other namespaces are accepted
         */
        crossNamespaceValidation?: boolean;
        /**
         * Namespace federation or consortium membership (optional)
         */
        federationMember?: string;
    };
    termsOfUse: {
        /**
         * The trust framework for the namespace.
         */
        trustFramework: string;
        /**
         * The ID of the trust framework for the namespace.
         */
        trustFrameworkId: string;
        /**
         * The version of the trust framework for the namespace.
         */
        trustFrameworkVersion: string;
        /**
         * The URL of the trust framework for the namespace.
         */
        trustFrameworkUrl: string;
        /**
         * The terms of use for the namespace.
         */
        trustFrameworkTerms: string;
    };
    blockchainAnchoring?: {
        /**
         * Blockchain network where this namespace is anchored
         */
        blockchainNetwork?: string;
        /**
         * Blockchain resource ID for this namespace
         */
        resourceId?: string;
    };
}
//# sourceMappingURL=NamespaceDeclaration.d.ts.map