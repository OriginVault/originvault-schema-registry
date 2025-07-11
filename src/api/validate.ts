import { Request, Response } from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

interface ValidationRequest {
  schema: any;
  data: any;
}

interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    message: string;
    instancePath?: string;
    schemaPath?: string;
  }>;
}

// POST /api/validate
export const validateData = async (req: Request, res: Response) => {
  try {
    const { schema, data }: ValidationRequest = req.body;

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
    } catch (error) {
      return res.status(400).json({
        valid: false,
        errors: [{ message: `Invalid schema: ${(error as Error).message}` }]
      });
    }

    // Validate the data
    const isValid = validate(data);
    
    const result: ValidationResult = {
      valid: isValid,
      errors: isValid ? undefined : validate.errors?.map(error => ({
        message: error.message || 'Validation error',
        instancePath: error.instancePath,
        schemaPath: error.schemaPath
      }))
    };

    res.json(result);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      valid: false,
      errors: [{ message: 'Internal server error during validation' }]
    });
  }
};

// Validate against specific schema by ID
export const validateAgainstSchema = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({
      valid: false,
      errors: [{ message: 'Schema validation error' }]
    });
  }
}; 