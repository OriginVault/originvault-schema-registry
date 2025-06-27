"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const quicktype_1 = __importDefault(require("./routes/quicktype"));
const verifiable_credentials_1 = __importDefault(require("./routes/verifiable-credentials"));
const c2pa_1 = __importDefault(require("./routes/c2pa"));
const trust_registry_1 = __importDefault(require("./routes/trust-registry"));
const quicktype_2 = require("./api/quicktype");
const graphql_1 = require("./api/graphql");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use((0, body_parser_1.json)({ limit: '10mb' })); // Allow larger payloads for file uploads
app.use((0, body_parser_1.urlencoded)({ extended: true, limit: '10mb' }));
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API Routes
app.use('/api/quicktype', quicktype_1.default);
app.use('/api/vc', verifiable_credentials_1.default);
app.use('/api/c2pa', c2pa_1.default);
app.use('/api/trust', trust_registry_1.default);
// GraphQL endpoint
app.post('/api/graphql', graphql_1.graphqlHandler);
app.get('/api/graphql/schema', graphql_1.graphqlSchema);
// Direct endpoints for backward compatibility
app.post('/api/quicktype/generate-from-files', quicktype_2.generateFromFiles);
app.post('/api/quicktype/download-zip', quicktype_2.downloadZip);
app.post('/api/quicktype/validate-schema', quicktype_2.validateSchema);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
// Start server
app.listen(PORT, () => {
    console.log(`OriginVault Schema Registry API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`QuickType API: http://localhost:${PORT}/api/quicktype`);
});
exports.default = app;
