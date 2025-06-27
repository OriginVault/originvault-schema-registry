"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const c2pa_1 = require("../api/c2pa");
const router = express_1.default.Router();
// Create C2PA manifest for content
router.post('/manifest/create', c2pa_1.createManifest);
// Verify C2PA manifest
router.post('/manifest/verify', c2pa_1.verifyManifest);
// Add provenance to existing content
router.post('/provenance/add', c2pa_1.addProvenance);
// Get provenance for specific content
router.get('/provenance/:hash', c2pa_1.getProvenance);
// Get full provenance chain for content
router.get('/chain/:hash', c2pa_1.getProvenanceChain);
// Create derivative content record
router.post('/derivative/create', c2pa_1.createDerivative);
exports.default = router;
