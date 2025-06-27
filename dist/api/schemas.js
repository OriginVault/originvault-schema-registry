"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
const router = express_1.default.Router();
// Schema sources configuration (following ADR 0086)
const SCHEMA_SOURCES = {
    originvault: './schemas/originvault',
    'open-verifiable': './schemas/open-verifiable',
    dif: './schemas/dif'
};
// Schema metadata schema
const SchemaMetadata = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.enum(['identity', 'business', 'content', 'trust', 'payments', 'platform']),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    version: zod_1.z.string(),
    author: zod_1.z.string().optional(),
    created: zod_1.z.string().datetime().optional(),
    updated: zod_1.z.string().datetime().optional()
});
// Load schemas from a directory
async function loadSchemasFromDirectory(dirPath) {
    try {
        const files = await promises_1.default.readdir(dirPath, { withFileTypes: true });
        const schemas = [];
        for (const file of files) {
            if (file.isFile() && file.name.endsWith('.schema.json')) {
                const filePath = path_1.default.join(dirPath, file.name);
                const content = await promises_1.default.readFile(filePath, 'utf-8');
                const schema = JSON.parse(content);
                // Extract metadata from schema or separate metadata file
                const metadataPath = filePath.replace('.schema.json', '.metadata.json');
                let metadata = {};
                try {
                    const metadataContent = await promises_1.default.readFile(metadataPath, 'utf-8');
                    metadata = JSON.parse(metadataContent);
                }
                catch {
                    // Use schema properties as fallback metadata
                    metadata = {
                        id: schema.$id || file.name.replace('.schema.json', ''),
                        title: schema.title || file.name.replace('.schema.json', ''),
                        description: schema.description,
                        category: inferCategory(schema),
                        tags: schema.tags || []
                    };
                }
                schemas.push({
                    ...metadata,
                    schema,
                    filename: file.name
                });
            }
        }
        return schemas;
    }
    catch (error) {
        console.error(`Failed to load schemas from ${dirPath}:`, error);
        return [];
    }
}
// Infer category from schema content
function inferCategory(schema) {
    const title = (schema.title || '').toLowerCase();
    const description = (schema.description || '').toLowerCase();
    const content = title + ' ' + description;
    if (content.includes('person') || content.includes('identity') || content.includes('did')) {
        return 'identity';
    }
    if (content.includes('contract') || content.includes('business') || content.includes('organization')) {
        return 'business';
    }
    if (content.includes('content') || content.includes('media') || content.includes('c2pa')) {
        return 'content';
    }
    if (content.includes('trust') || content.includes('credential') || content.includes('verification')) {
        return 'trust';
    }
    if (content.includes('payment') || content.includes('billing') || content.includes('invoice')) {
        return 'payments';
    }
    return 'platform';
}
// GET /api/schemas/originvault
router.get('/originvault', async (req, res) => {
    try {
        const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES.originvault);
        res.json(schemas);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load OriginVault schemas' });
    }
});
// GET /api/schemas/open-verifiable  
router.get('/open-verifiable', async (req, res) => {
    try {
        const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES['open-verifiable']);
        res.json(schemas);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load Open Verifiable schemas' });
    }
});
// GET /api/schemas/dif
router.get('/dif', async (req, res) => {
    try {
        const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES.dif);
        res.json(schemas);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load DIF schemas' });
    }
});
// GET /api/schemas/all - Unified endpoint
router.get('/all', async (req, res) => {
    try {
        const [originVaultSchemas, openVerifiableSchemas, difSchemas] = await Promise.all([
            loadSchemasFromDirectory(SCHEMA_SOURCES.originvault),
            loadSchemasFromDirectory(SCHEMA_SOURCES['open-verifiable']),
            loadSchemasFromDirectory(SCHEMA_SOURCES.dif)
        ]);
        const allSchemas = [
            ...originVaultSchemas.map(s => ({ ...s, source: 'OriginVault' })),
            ...openVerifiableSchemas.map(s => ({ ...s, source: 'Open Verifiable' })),
            ...difSchemas.map(s => ({ ...s, source: 'DIF' }))
        ];
        res.json(allSchemas);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load schemas' });
    }
});
// GET /api/schemas/:source/:schemaId - Get specific schema
router.get('/:source/:schemaId', async (req, res) => {
    const { source, schemaId } = req.params;
    if (!(source in SCHEMA_SOURCES)) {
        return res.status(404).json({ error: 'Schema source not found' });
    }
    try {
        const sourcePath = SCHEMA_SOURCES[source];
        const schemaPath = path_1.default.join(sourcePath, `${schemaId}.schema.json`);
        const content = await promises_1.default.readFile(schemaPath, 'utf-8');
        const schema = JSON.parse(content);
        res.json(schema);
    }
    catch (error) {
        res.status(404).json({ error: 'Schema not found' });
    }
});
exports.default = router;
