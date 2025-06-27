import express from 'express';
import {
  registerTrustEntity,
  createEndorsement,
  revokeTrust,
  getTrustEntity,
  searchTrust,
  getTrustChain,
  verifyTrust
} from '../api/trust-registry';

const router = express.Router();

// Register a new trust entity
router.post('/entities/register', registerTrustEntity);

// Create an endorsement
router.post('/entities/endorse', createEndorsement);

// Revoke trust
router.post('/entities/revoke', revokeTrust);

// Get trust entity
router.get('/entities/:did', getTrustEntity);

// Search trust entities
router.get('/entities/search', searchTrust);

// Get trust chain for an entity
router.get('/entities/:did/chain', getTrustChain);

// Verify trust relationship
router.post('/entities/verify', verifyTrust);

export default router; 