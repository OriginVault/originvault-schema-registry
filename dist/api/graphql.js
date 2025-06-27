"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = exports.graphqlHandler = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// GraphQL Schema Definition
const typeDefs = `
  type Schema {
    id: ID!
    title: String!
    description: String
    category: String!
    version: String!
    content: JSON!
    tags: [String!]!
    created: String
    updated: String
  }
  
  type SchemaCategory {
    name: String!
    description: String!
    count: Int!
    schemas: [Schema!]!
  }
  
  type VerifiableCredential {
    context: [String!]!
    type: [String!]!
    id: String
    issuer: String!
    issuanceDate: String!
    expirationDate: String
    credentialSubject: JSON!
    proof: JSON
  }
  
  type ValidationResult {
    valid: Boolean!
    errors: [ValidationError!]!
    warnings: [ValidationWarning!]!
  }
  
  type ValidationError {
    message: String!
    path: String
    value: String
  }
  
  type ValidationWarning {
    message: String!
  }
  
  type TrustRecord {
    id: ID!
    subject: String!
    trustScore: Float!
    endorsements: Int!
    status: String!
    created: String!
    updated: String!
  }
  
  type C2PAManifest {
    format: String!
    title: String
    claimGenerator: String!
    assertions: [JSON!]!
    manifestHash: String!
  }
  
  type Query {
    # Schema Queries
    schemas(category: String, search: String, limit: Int): [Schema!]!
    schema(id: ID!): Schema
    schemaCategories: [SchemaCategory!]!
    
    # Verifiable Credentials Queries
    vcSchemas: [Schema!]!
    vcSchema(id: ID!): Schema
    validateCredential(credential: JSON!, schemaId: String): ValidationResult!
    
    # Trust Registry Queries
    trustEntity(did: String!): TrustRecord
    searchTrust(query: String, minScore: Float, maxScore: Float): [TrustRecord!]!
    
    # C2PA Queries
    provenance(contentHash: String!): JSON
    verifyManifest(manifest: JSON!, contentHash: String): ValidationResult!
  }
  
  type Mutation {
    # Verifiable Credentials Mutations
    createVCTemplate(schemaId: String!, issuer: String!, subject: JSON): VerifiableCredential!
    
    # Trust Registry Mutations
    registerTrustEntity(issuer: String!, subject: String!, initialScore: Float): TrustRecord!
    endorseEntity(endorser: String!, subject: String!, trustLevel: Float!, evidence: String): JSON!
    
    # C2PA Mutations
    createC2PAManifest(contentHash: String!, title: String, creator: String!, tool: String): C2PAManifest!
    addProvenance(contentHash: String!, action: String!, actor: String!, tool: String, parameters: JSON): JSON!
  }
  
  scalar JSON
`;
// GraphQL Resolvers
const resolvers = {
    Query: {
        schemas: async (_, args) => {
            const { category, search, limit = 100 } = args;
            return await loadSchemas(category, search, limit);
        },
        schema: async (_, args) => {
            const { id } = args;
            return await loadSchema(id);
        },
        schemaCategories: async () => {
            return await getSchemaCategories();
        },
        vcSchemas: async () => {
            return await loadVCSchemas();
        },
        vcSchema: async (_, args) => {
            const { id } = args;
            return await loadSchema(id);
        },
        validateCredential: async (_, args) => {
            const { credential, schemaId } = args;
            return await validateCredentialGraphQL(credential, schemaId);
        },
        trustEntity: async (_, args) => {
            const { did } = args;
            return await getTrustEntityGraphQL(did);
        },
        searchTrust: async (_, args) => {
            const { query, minScore = 0, maxScore = 100 } = args;
            return await searchTrustGraphQL(query, minScore, maxScore);
        },
        provenance: async (_, args) => {
            const { contentHash } = args;
            return await getProvenanceGraphQL(contentHash);
        },
        verifyManifest: async (_, args) => {
            const { manifest, contentHash } = args;
            return await verifyManifestGraphQL(manifest, contentHash);
        }
    },
    Mutation: {
        createVCTemplate: async (_, args) => {
            const { schemaId, issuer, subject } = args;
            return await createVCTemplateGraphQL(schemaId, issuer, subject);
        },
        registerTrustEntity: async (_, args) => {
            const { issuer, subject, initialScore = 0 } = args;
            return await registerTrustEntityGraphQL(issuer, subject, initialScore);
        },
        endorseEntity: async (_, args) => {
            const { endorser, subject, trustLevel, evidence } = args;
            return await endorseEntityGraphQL(endorser, subject, trustLevel, evidence);
        },
        createC2PAManifest: async (_, args) => {
            const { contentHash, title, creator, tool } = args;
            return await createC2PAManifestGraphQL(contentHash, title, creator, tool);
        },
        addProvenance: async (_, args) => {
            const { contentHash, action, actor, tool, parameters } = args;
            return await addProvenanceGraphQL(contentHash, action, actor, tool, parameters);
        }
    }
};
// Main GraphQL endpoint
const graphqlHandler = async (req, res) => {
    try {
        const { query, variables, operationName } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }
        // Simple query parsing and execution
        const result = await executeGraphQLQuery(query, variables);
        res.json({
            data: result,
            errors: null
        });
    }
    catch (error) {
        console.error('GraphQL execution error:', error);
        res.status(500).json({
            data: null,
            errors: [{ message: error.message || 'GraphQL execution failed' }]
        });
    }
};
exports.graphqlHandler = graphqlHandler;
// GraphQL Schema introspection endpoint
const graphqlSchema = async (req, res) => {
    res.json({
        schema: typeDefs,
        resolvers: Object.keys(resolvers),
        endpoints: {
            query: '/api/graphql',
            playground: '/api/graphql/playground'
        }
    });
};
exports.graphqlSchema = graphqlSchema;
// Helper functions for GraphQL resolvers
async function loadSchemas(category, search, limit = 100) {
    try {
        const schemaDir = path_1.default.join(process.cwd(), 'schemas', 'v1');
        const files = await promises_1.default.readdir(schemaDir);
        const schemas = [];
        for (const file of files.slice(0, limit)) {
            if (!file.endsWith('.schema.json'))
                continue;
            const schemaPath = path_1.default.join(schemaDir, file);
            const content = await promises_1.default.readFile(schemaPath, 'utf-8');
            const schema = JSON.parse(content);
            const schemaObj = {
                id: file.replace('.schema.json', ''),
                title: schema.title || file.replace('.schema.json', ''),
                description: schema.description,
                category: determineCategory(file),
                version: schema.version || '1.0.0',
                content: schema,
                tags: schema.tags || []
            };
            // Apply filters
            if (category && schemaObj.category !== category)
                continue;
            if (search && !schemaObj.title.toLowerCase().includes(search.toLowerCase()))
                continue;
            schemas.push(schemaObj);
        }
        return schemas;
    }
    catch (error) {
        console.error('Error loading schemas:', error);
        return [];
    }
}
async function loadSchema(id) {
    try {
        const schemaPath = path_1.default.join(process.cwd(), 'schemas', 'v1', `${id}.schema.json`);
        const content = await promises_1.default.readFile(schemaPath, 'utf-8');
        const schema = JSON.parse(content);
        return {
            id,
            title: schema.title || id,
            description: schema.description,
            category: determineCategory(id),
            version: schema.version || '1.0.0',
            content: schema,
            tags: schema.tags || []
        };
    }
    catch (error) {
        return null;
    }
}
async function loadVCSchemas() {
    const allSchemas = await loadSchemas();
    return allSchemas.filter(schema => schema.id.includes('Credential'));
}
async function getSchemaCategories() {
    const schemas = await loadSchemas();
    const categoryMap = new Map();
    schemas.forEach(schema => {
        if (!categoryMap.has(schema.category)) {
            categoryMap.set(schema.category, {
                name: schema.category,
                description: getCategoryDescription(schema.category),
                count: 0,
                schemas: []
            });
        }
        const category = categoryMap.get(schema.category);
        category.count++;
        category.schemas.push(schema);
    });
    return Array.from(categoryMap.values());
}
function determineCategory(filename) {
    const name = filename.toLowerCase();
    if (name.includes('person') || name.includes('identity') || name.includes('did')) {
        return 'identity';
    }
    if (name.includes('contract') || name.includes('payment') || name.includes('workflow')) {
        return 'business';
    }
    if (name.includes('content') || name.includes('creative') || name.includes('c2pa')) {
        return 'content';
    }
    if (name.includes('trust') || name.includes('endorsement') || name.includes('reputation')) {
        return 'trust';
    }
    if (name.includes('vault') || name.includes('plugin') || name.includes('api') || name.includes('node')) {
        return 'platform';
    }
    return 'other';
}
function getCategoryDescription(category) {
    const descriptions = {
        identity: 'Person, organization, and entity schemas for decentralized identity',
        business: 'Business processes, contracts, and workflow schemas',
        content: 'Content metadata, authenticity, and provenance schemas',
        trust: 'Trust relationships, attestations, and verification schemas',
        platform: 'Platform infrastructure, configuration, and management schemas',
        other: 'Miscellaneous schemas'
    };
    return descriptions[category] || 'Schema category';
}
// Placeholder resolver functions
async function validateCredentialGraphQL(credential, schemaId) {
    return { valid: true, errors: [], warnings: [] };
}
async function getTrustEntityGraphQL(did) {
    return null;
}
async function searchTrustGraphQL(query, minScore = 0, maxScore = 100) {
    return [];
}
async function getProvenanceGraphQL(contentHash) {
    return null;
}
async function verifyManifestGraphQL(manifest, contentHash) {
    return { valid: true, errors: [], warnings: [] };
}
async function createVCTemplateGraphQL(schemaId, issuer, subject) {
    return {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        issuer,
        issuanceDate: new Date().toISOString(),
        credentialSubject: subject || {}
    };
}
async function registerTrustEntityGraphQL(issuer, subject, initialScore) {
    return {
        id: '123',
        subject,
        trustScore: initialScore,
        endorsements: 0,
        status: 'active',
        created: new Date().toISOString(),
        updated: new Date().toISOString()
    };
}
async function endorseEntityGraphQL(endorser, subject, trustLevel, evidence) {
    return {
        endorsement_id: '456',
        subject,
        endorser,
        trust_level: trustLevel,
        timestamp: new Date().toISOString()
    };
}
async function createC2PAManifestGraphQL(contentHash, title, creator, tool) {
    return {
        format: 'application/c2pa',
        title: title || 'Untitled',
        claimGenerator: tool || 'OriginVault',
        assertions: [],
        manifestHash: 'abc123'
    };
}
async function addProvenanceGraphQL(contentHash, action, actor, tool, parameters) {
    return {
        provenance_id: '789',
        content_hash: contentHash,
        action,
        actor,
        timestamp: new Date().toISOString()
    };
}
// Simple GraphQL query executor (placeholder)
async function executeGraphQLQuery(query, variables) {
    // This is a simplified implementation
    // In a real application, you would use a proper GraphQL executor
    if (query.includes('schemas')) {
        return await loadSchemas();
    }
    if (query.includes('schemaCategories')) {
        return await getSchemaCategories();
    }
    return null;
}
