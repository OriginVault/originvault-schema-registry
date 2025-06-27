import express from 'express';
import { generateFromFiles, downloadZip, validateSchema } from '../api/quicktype';

const router = express.Router();

// POST /api/quicktype/generate-from-files
router.post('/generate-from-files', generateFromFiles);

// POST /api/quicktype/download-zip  
router.post('/download-zip', downloadZip);

// POST /api/quicktype/validate-schema
router.post('/validate-schema', validateSchema);

export default router; 