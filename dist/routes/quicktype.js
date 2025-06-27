"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quicktype_1 = require("../api/quicktype");
const router = express_1.default.Router();
// POST /api/quicktype/generate-from-files
router.post('/generate-from-files', quicktype_1.generateFromFiles);
// POST /api/quicktype/download-zip  
router.post('/download-zip', quicktype_1.downloadZip);
// POST /api/quicktype/validate-schema
router.post('/validate-schema', quicktype_1.validateSchema);
exports.default = router;
