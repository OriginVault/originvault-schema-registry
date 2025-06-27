import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

interface VerifiableCredential {
  '@context': string[];
  type: string[];
  id?: string;
  issuer: string | { id: string; [key: string]: any };
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: any;
  proof?: any;
}

interface VerifiablePresentation {
  '@context': string[];
  type: string[];
  id?: string;
  holder?: string;
  verifiableCredential: VerifiableCredential[];
  proof?: any;
}

// W3C VC Context URLs
const W3C_VC_CONTEXT = 'https://www.w3.org/2018/credentials/v1';
const ORIGINVAULT_CONTEXT = 'https://schema.originvault.io/context/v1';

// GET /api/vc/schemas - List all VC schemas
export const getVCSchemas = async (req: Request, res: Response) => {
  try {
    const schemaDir = path.join(process.cwd(), 'schemas', 'v1');
    const files = await fs.readdir(schemaDir);
    
    const vcSchemas = [];
    
    for (const file of files) {
      if (file.endsWith('.schema.json') && file.includes('Credential')) {
        const schemaPath = path.join(schemaDir, file);
        const schemaContent = await fs.readFile(schemaPath, 'utf-8');
        const schema = JSON.parse(schemaContent);
        
        vcSchemas.push({
          id: file.replace('.schema.json', ''),
          title: schema.title || file.replace('.schema.json', ''),
          description: schema.description,
          schema: schema,
          category: determineVCCategory(file),
          contexts: extractContexts(schema)
        });
      }
    }
    
    res.json({
      count: vcSchemas.length,
      schemas: vcSchemas
    });
  } catch (error) {
    console.error('Error loading VC schemas:', error);
    res.status(500).json({ error: 'Failed to load VC schemas' });
  }
};

// GET /api/vc/schemas/:id - Get specific VC schema
export const getVCSchema = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schemaPath = path.join(process.cwd(), 'schemas', 'v1', `${id}.schema.json`);
    
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);
    
    res.json({
      id,
      schema,
      contexts: extractContexts(schema),
      category: determineVCCategory(id)
    });
  } catch (error) {
    res.status(404).json({ error: 'Schema not found' });
  }
};

// POST /api/vc/validate - Validate a Verifiable Credential
export const validateVC = async (req: Request, res: Response) => {
  try {
    const { credential, schemaId } = req.body;
    
    if (!credential) {
      return res.status(400).json({ 
        valid: false, 
        errors: [{ message: 'Credential is required' }] 
      });
    }
    
    const validationResult: any = {
      valid: true,
      errors: [],
      warnings: []
    };
    
    // Basic W3C VC structure validation
    const basicValidation = validateBasicVCStructure(credential);
    if (!basicValidation.valid) {
      validationResult.valid = false;
      validationResult.errors.push(...basicValidation.errors);
    }
    
    // Schema-specific validation if schemaId provided
    if (schemaId) {
      try {
        const schemaPath = path.join(process.cwd(), 'schemas', 'v1', `${schemaId}.schema.json`);
        const schemaContent = await fs.readFile(schemaPath, 'utf-8');
        const schema = JSON.parse(schemaContent);
        
        const validate = ajv.compile(schema);
        const schemaValid = validate(credential.credentialSubject);
        
        if (!schemaValid) {
          validationResult.valid = false;
          validationResult.errors.push(...(validate.errors || []).map(err => ({
            message: `credentialSubject${err.instancePath}: ${err.message}`,
            path: err.instancePath,
            value: err.data
          })));
        }
      } catch (schemaError) {
        validationResult.warnings.push({ 
          message: `Could not validate against schema ${schemaId}` 
        });
      }
    }
    
    // JSON-LD context validation
    const contextValidation = validateContexts(credential);
    if (!contextValidation.valid) {
      validationResult.warnings.push(...contextValidation.warnings);
    }
    
    res.json(validationResult);
  } catch (error) {
    console.error('VC validation error:', error);
    res.status(500).json({ error: 'Validation failed' });
  }
};

// POST /api/vc/create-template - Create VC template
export const createVCTemplate = async (req: Request, res: Response) => {
  try {
    const { schemaId, issuer, subject } = req.body;
    
    if (!schemaId || !issuer) {
      return res.status(400).json({ 
        error: 'schemaId and issuer are required' 
      });
    }
    
    const template: VerifiableCredential = {
      '@context': [
        W3C_VC_CONTEXT,
        ORIGINVAULT_CONTEXT
      ],
      type: ['VerifiableCredential', schemaId],
      issuer: issuer,
      issuanceDate: new Date().toISOString(),
      credentialSubject: subject || {
        id: 'did:example:subject123',
        // Add default fields based on schema
      }
    };
    
    // Load schema to provide better defaults
    try {
      const schemaPath = path.join(process.cwd(), 'schemas', 'v1', `${schemaId}.schema.json`);
      const schemaContent = await fs.readFile(schemaPath, 'utf-8');
      const schema = JSON.parse(schemaContent);
      
      if (schema.properties && !subject) {
        template.credentialSubject = generateDefaults(schema.properties);
      }
    } catch (schemaError) {
      // Continue with basic template
    }
    
    res.json(template);
  } catch (error) {
    console.error('Template creation error:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
};

// POST /api/vc/verify-presentation - Verify a Verifiable Presentation
export const verifyPresentation = async (req: Request, res: Response) => {
  try {
    const { presentation } = req.body;
    
    if (!presentation) {
      return res.status(400).json({ 
        valid: false, 
        errors: [{ message: 'Presentation is required' }] 
      });
    }
    
    const validationResult: any = {
      valid: true,
      errors: [],
      warnings: [],
      credentialResults: []
    };
    
    // Basic VP structure validation
    const basicValidation = validateBasicVPStructure(presentation);
    if (!basicValidation.valid) {
      validationResult.valid = false;
      validationResult.errors.push(...basicValidation.errors);
    }
    
    // Validate each credential in the presentation
    if (presentation.verifiableCredential && Array.isArray(presentation.verifiableCredential)) {
      for (let i = 0; i < presentation.verifiableCredential.length; i++) {
        const credential = presentation.verifiableCredential[i];
        const vcValidation = validateBasicVCStructure(credential);
        
        validationResult.credentialResults.push({
          index: i,
          valid: vcValidation.valid,
          errors: vcValidation.errors
        });
        
        if (!vcValidation.valid) {
          validationResult.valid = false;
        }
      }
    }
    
    res.json(validationResult);
  } catch (error) {
    console.error('VP verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
};

// GET /api/vc/contexts - Get JSON-LD contexts
export const getContexts = async (req: Request, res: Response) => {
  try {
    const contexts = {
      originvault: {
        '@context': {
          '@version': 1.1,
          '@protected': true,
          'ov': 'https://schema.originvault.io/',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          
          // Identity types
          'PersonCredential': 'ov:PersonCredential',
          'OrganizationCredential': 'ov:OrganizationCredential',
          'DeveloperCredential': 'ov:DeveloperCredential',
          
          // Business types
          'ContractCredential': 'ov:ContractCredential',
          'PaymentCredential': 'ov:PaymentCredential',
          'WorkflowCredential': 'ov:WorkflowCredential',
          
          // Trust types
          'EndorsementCredential': 'ov:EndorsementCredential',
          'ReputationCredential': 'ov:ReputationCredential',
          'VerificationCredential': 'ov:VerificationCredential',
          
          // Content types
          'ContentCredential': 'ov:ContentCredential',
          'ProvenanceCredential': 'ov:ProvenanceCredential',
          
          // Platform types
          'VaultCredential': 'ov:VaultCredential',
          'PluginCredential': 'ov:PluginCredential',
          'APICredential': 'ov:APICredential'
        }
      }
    };
    
    res.json(contexts);
  } catch (error) {
    console.error('Context loading error:', error);
    res.status(500).json({ error: 'Failed to load contexts' });
  }
};

// Helper functions
function validateBasicVCStructure(credential: any): { valid: boolean; errors: any[] } {
  const errors = [];
  
  if (!credential['@context']) {
    errors.push({ message: '@context is required' });
  } else if (!Array.isArray(credential['@context']) || !credential['@context'].includes(W3C_VC_CONTEXT)) {
    errors.push({ message: '@context must include W3C VC context' });
  }
  
  if (!credential.type) {
    errors.push({ message: 'type is required' });
  } else if (!Array.isArray(credential.type) || !credential.type.includes('VerifiableCredential')) {
    errors.push({ message: 'type must include VerifiableCredential' });
  }
  
  if (!credential.issuer) {
    errors.push({ message: 'issuer is required' });
  }
  
  if (!credential.issuanceDate) {
    errors.push({ message: 'issuanceDate is required' });
  }
  
  if (!credential.credentialSubject) {
    errors.push({ message: 'credentialSubject is required' });
  }
  
  return { valid: errors.length === 0, errors };
}

function validateBasicVPStructure(presentation: any): { valid: boolean; errors: any[] } {
  const errors = [];
  
  if (!presentation['@context']) {
    errors.push({ message: '@context is required' });
  }
  
  if (!presentation.type) {
    errors.push({ message: 'type is required' });
  } else if (!Array.isArray(presentation.type) || !presentation.type.includes('VerifiablePresentation')) {
    errors.push({ message: 'type must include VerifiablePresentation' });
  }
  
  if (!presentation.verifiableCredential || !Array.isArray(presentation.verifiableCredential)) {
    errors.push({ message: 'verifiableCredential array is required' });
  }
  
  return { valid: errors.length === 0, errors };
}

function validateContexts(credential: any): { valid: boolean; warnings: any[] } {
  const warnings = [];
  
  if (credential['@context'] && Array.isArray(credential['@context'])) {
    const hasOriginVaultContext = credential['@context'].includes(ORIGINVAULT_CONTEXT);
    if (!hasOriginVaultContext) {
      warnings.push({ 
        message: 'Consider including OriginVault context for enhanced compatibility' 
      });
    }
  }
  
  return { valid: true, warnings };
}

function determineVCCategory(filename: string): string {
  const name = filename.toLowerCase();
  
  if (name.includes('person') || name.includes('identity') || name.includes('developer')) {
    return 'identity';
  }
  if (name.includes('contract') || name.includes('payment') || name.includes('workflow')) {
    return 'business';
  }
  if (name.includes('content') || name.includes('provenance')) {
    return 'content';
  }
  if (name.includes('trust') || name.includes('endorsement') || name.includes('reputation')) {
    return 'trust';
  }
  if (name.includes('vault') || name.includes('plugin') || name.includes('api')) {
    return 'platform';
  }
  
  return 'other';
}

function extractContexts(schema: any): string[] {
  const contexts = [W3C_VC_CONTEXT];
  
  // Check if schema suggests additional contexts
  if (schema.properties && schema.properties['@context']) {
    // Extract from schema definition
  }
  
  contexts.push(ORIGINVAULT_CONTEXT);
  return contexts;
}

function generateDefaults(properties: any): any {
  const defaults: any = {};
  
  for (const [key, prop] of Object.entries(properties as any)) {
    if (prop.type === 'string') {
      defaults[key] = prop.example || `example-${key}`;
    } else if (prop.type === 'number') {
      defaults[key] = prop.example || 0;
    } else if (prop.type === 'boolean') {
      defaults[key] = prop.example || false;
    } else if (prop.type === 'array') {
      defaults[key] = [];
    } else if (prop.type === 'object') {
      defaults[key] = {};
    }
  }
  
  return defaults;
} 