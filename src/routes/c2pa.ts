import express from 'express';
import {
  createManifest,
  verifyManifest,
  addProvenance,
  getProvenanceChain,
  getProvenance,
  createDerivative
} from '../api/c2pa';

const router = express.Router();

// Create C2PA manifest for content
router.post('/manifest/create', createManifest);

// Verify C2PA manifest
router.post('/manifest/verify', verifyManifest);

// Add provenance to existing content
router.post('/provenance/add', addProvenance);

// Get provenance for specific content
router.get('/provenance/:hash', getProvenance);

// Get full provenance chain for content
router.get('/chain/:hash', getProvenanceChain);

// Create derivative content record
router.post('/derivative/create', createDerivative);

export default router; 