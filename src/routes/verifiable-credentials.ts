import express from 'express';
import {
  getVCSchemas,
  getVCSchema,
  validateVC,
  createVCTemplate,
  verifyPresentation,
  getContexts
} from '../api/verifiable-credentials';

const router = express.Router();

// GET /api/vc/schemas - List all VC schemas
router.get('/schemas', getVCSchemas);

// GET /api/vc/schemas/:id - Get specific VC schema
router.get('/schemas/:id', getVCSchema);

// POST /api/vc/validate - Validate a Verifiable Credential
router.post('/validate', validateVC);

// POST /api/vc/create-template - Create VC template
router.post('/create-template', createVCTemplate);

// POST /api/vc/verify-presentation - Verify a Verifiable Presentation
router.post('/verify-presentation', verifyPresentation);

// GET /api/vc/contexts - Get JSON-LD contexts
router.get('/contexts', getContexts);

export default router; 