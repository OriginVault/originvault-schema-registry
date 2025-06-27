"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifiable_credentials_1 = require("../api/verifiable-credentials");
const router = express_1.default.Router();
// GET /api/vc/schemas - List all VC schemas
router.get('/schemas', verifiable_credentials_1.getVCSchemas);
// GET /api/vc/schemas/:id - Get specific VC schema
router.get('/schemas/:id', verifiable_credentials_1.getVCSchema);
// POST /api/vc/validate - Validate a Verifiable Credential
router.post('/validate', verifiable_credentials_1.validateVC);
// POST /api/vc/create-template - Create VC template
router.post('/create-template', verifiable_credentials_1.createVCTemplate);
// POST /api/vc/verify-presentation - Verify a Verifiable Presentation
router.post('/verify-presentation', verifiable_credentials_1.verifyPresentation);
// GET /api/vc/contexts - Get JSON-LD contexts
router.get('/contexts', verifiable_credentials_1.getContexts);
exports.default = router;
