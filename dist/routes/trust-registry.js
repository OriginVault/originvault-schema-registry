"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trust_registry_1 = require("../api/trust-registry");
const router = express_1.default.Router();
// Register a new trust entity
router.post('/entities/register', trust_registry_1.registerTrustEntity);
// Create an endorsement
router.post('/entities/endorse', trust_registry_1.createEndorsement);
// Revoke trust
router.post('/entities/revoke', trust_registry_1.revokeTrust);
// Get trust entity
router.get('/entities/:did', trust_registry_1.getTrustEntity);
// Search trust entities
router.get('/entities/search', trust_registry_1.searchTrust);
// Get trust chain for an entity
router.get('/entities/:did/chain', trust_registry_1.getTrustChain);
// Verify trust relationship
router.post('/entities/verify', trust_registry_1.verifyTrust);
exports.default = router;
