"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAgainstSchema = exports.validateData = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
// POST /api/validate
const validateData = async (req, res) => {
    try {
        const { schema, data } = req.body;
        if (!schema || !data) {
            return res.status(400).json({
                valid: false,
                errors: [{ message: 'Schema and data are required' }]
            });
        }
        // Compile the schema
        let validate;
        try {
            validate = ajv.compile(schema);
        }
        catch (error) {
            return res.status(400).json({
                valid: false,
                errors: [{ message: `Invalid schema: ${error.message}` }]
            });
        }
        // Validate the data
        const isValid = validate(data);
        const result = {
            valid: isValid,
            errors: isValid ? undefined : validate.errors?.map(error => ({
                message: error.message || 'Validation error',
                instancePath: error.instancePath,
                schemaPath: error.schemaPath
            }))
        };
        res.json(result);
    }
    catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({
            valid: false,
            errors: [{ message: 'Internal server error during validation' }]
        });
    }
};
exports.validateData = validateData;
// Validate against specific schema by ID
const validateAgainstSchema = async (req, res) => {
    try {
        const { schemaId } = req.params;
        const { data, source = 'originvault' } = req.body;
        // Load schema from file system
        // This would integrate with the schemas API
        const schemaPath = `./schemas/${source}/${schemaId}.schema.json`;
        // For now, return a placeholder response
        res.json({
            valid: true,
            message: `Validation against ${schemaId} not yet implemented`
        });
    }
    catch (error) {
        res.status(500).json({
            valid: false,
            errors: [{ message: 'Schema validation error' }]
        });
    }
};
exports.validateAgainstSchema = validateAgainstSchema;
