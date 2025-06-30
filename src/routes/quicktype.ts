import express from 'express';
import { 
  generateFromFiles, 
  downloadZip, 
  validateSchema,
  generateFromRegistry,
  generateFromUrl,
  getSupportedLanguages,
  getGenerationOptions,
  cacheGeneratedCode,
  getCachedCode,
  clearCache
} from '../api/quicktype.js';

const router = express.Router();

// Core generation endpoints
router.post('/generate-from-files', generateFromFiles);
router.post('/generate-from-registry', generateFromRegistry);
router.post('/generate-from-url', generateFromUrl);

// Download and packaging
router.post('/download-zip', downloadZip);

// Validation and analysis
router.post('/validate-schema', validateSchema);
router.post('/analyze-schema', validateSchema); // Alias for backward compatibility

// Metadata and configuration
router.get('/languages', getSupportedLanguages);
router.get('/options', getGenerationOptions);

// Caching endpoints
router.post('/cache', cacheGeneratedCode);
router.get('/cache/:key', getCachedCode);
router.delete('/cache/:key', clearCache);
router.delete('/cache', clearCache); // Clear all cache

// Health and status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok', 
    version: '1.0.0',
    features: ['file-generation', 'registry-generation', 'url-generation', 'caching', 'validation']
  });
});

export default router; 