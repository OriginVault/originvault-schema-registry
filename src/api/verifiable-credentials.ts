import express from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

interface VerifiableCredential {
  '@context': string[];
  type: string[];
  id?: string;
  issuer: string | { id: string; name?: string };
  issuanceDate?: string;
  validFrom?: string;
  validUntil?: string;
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

interface CredentialSchema {
  id: string;
  name: string;
  description: string;
  version: string;
  schema: any;
  examples?: any[];
}

interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

// W3C VC Context URLs
const VALID_CONTEXTS = [
  'https://www.w3.org/2018/credentials/v1',
  'https://www.w3.org/ns/credentials/v2',
  'https://schema.org',
  'https://schemas.originvault.box/contexts/trust-chain-core.jsonld'
];

// Helper function to load schemas from filesystem
function loadSchemasFromFilesystem(): CredentialSchema[] {
  try {
    const schemasDir = path.join(process.cwd(), 'schemas', 'v1');
    
    if (!fs.existsSync(schemasDir)) {
      console.warn('Schemas directory not found:', schemasDir);
      return [];
    }

    const schemaFiles = fs.readdirSync(schemasDir)
      .filter(file => file.endsWith('.schema.json'));

    const schemas: CredentialSchema[] = [];

    for (const file of schemaFiles) {
      try {
        const filePath = path.join(schemasDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const schemaData = JSON.parse(content);

        // Extract relevant information from the schema
        const schema: CredentialSchema = {
          id: schemaData.$id || file.replace('.schema.json', ''),
          name: schemaData.title || file.replace('.schema.json', '').replace(/([A-Z])/g, ' $1').trim(),
          description: schemaData.description || 'No description available',
          version: '1.0.0',
          schema: schemaData,
          examples: schemaData.examples || []
        };

        schemas.push(schema);
      } catch (error: any) {
        console.error(`Error parsing schema file ${file}:`, error?.message || error);
        // Continue processing other files even if one fails
      }
    }

    // Sort schemas by name for better UX
    schemas.sort((a, b) => a.name.localeCompare(b.name));

    return schemas;
  } catch (error: any) {
    console.error('Error loading schemas:', error?.message || error);
    return [];
  }
}

// GET /api/vc/schemas - List all VC schemas
export const getVCSchemas = (req: Request, res: Response) => {
  try {
    const schemas = loadSchemasFromFilesystem();
    res.json({ 
      schemas: schemas,
      count: schemas.length 
    });
  } catch (error: any) {
    console.error('Error fetching schemas:', error);
    res.status(500).json({ 
      error: 'Failed to fetch schemas',
      details: error?.message || 'Unknown error'
    });
  }
};

// GET /api/vc/schemas/:id - Get specific VC schema
export const getVCSchema = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schemas = loadSchemasFromFilesystem();
    const schema = schemas.find(s => s.id.includes(id) || s.name.toLowerCase().includes(id.toLowerCase()));
    
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }
    
    res.json({ schema });
  } catch (error: any) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ 
      error: 'Failed to fetch schema',
      details: error?.message || 'Unknown error'
    });
  }
};

// POST /api/vc/validate - Validate a Verifiable Credential
export const validateVC = (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        error: 'Missing credential in request body'
      });
    }

    // Parse credential if it's a string
    let parsedCredential: any;
    try {
      parsedCredential = typeof credential === 'string' ? JSON.parse(credential) : credential;
    } catch (parseError: any) {
      return res.status(400).json({
        error: 'Invalid JSON format',
        details: parseError?.message || 'JSON parsing failed'
      });
    }

    // Validate basic VC structure
    const result = validateBasicVCStructure(parsedCredential);

    res.json({
      valid: result.valid,
      errors: result.errors || [],
      warnings: result.warnings || [],
      credential: parsedCredential
    });

  } catch (error: any) {
    console.error('Validation error:', error);
    res.status(500).json({
      error: 'Validation failed',
      details: error?.message || 'Unknown error'
    });
  }
};

// POST /api/vc/create-template - Create VC template
export const createVCTemplate = (req: Request, res: Response) => {
  try {
    const { schemaId, issuer, subject } = req.body;
    
    const template: VerifiableCredential = {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://schemas.originvault.box/contexts/trust-chain-core.jsonld'
      ],
      type: ['VerifiableCredential', schemaId || 'BasicCredential'],
      issuer: issuer || {
        id: 'did:example:issuer',
        name: 'Example Issuer'
      },
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      credentialSubject: subject || {
        id: 'did:example:subject',
        // Add schema-specific fields here based on schemaId
      }
    };

    res.json({
      template,
      schemaId: schemaId || 'BasicCredential'
    });

  } catch (error: any) {
    console.error('Template generation error:', error);
    res.status(500).json({
      error: 'Failed to generate template',
      details: error?.message || 'Unknown error'
    });
  }
};

// POST /api/vc/verify-presentation - Verify a Verifiable Presentation
export const verifyPresentation = (req: Request, res: Response) => {
  try {
    const { presentation } = req.body;

    if (!presentation) {
      return res.status(400).json({
        error: 'Missing presentation in request body'
      });
    }

    // Parse presentation if it's a string
    let parsedPresentation: any;
    try {
      parsedPresentation = typeof presentation === 'string' ? JSON.parse(presentation) : presentation;
    } catch (parseError: any) {
      return res.status(400).json({
        error: 'Invalid JSON format',
        details: parseError?.message || 'JSON parsing failed'
      });
    }

    // Basic presentation validation
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!parsedPresentation['@context']) {
      errors.push('Missing required @context field');
    }

    if (!parsedPresentation.type || !parsedPresentation.type.includes('VerifiablePresentation')) {
      errors.push('Missing or invalid type field');
    }

    if (!parsedPresentation.verifiableCredential) {
      errors.push('Missing verifiableCredential field');
    }

    const valid = errors.length === 0;

    res.json({
      valid,
      errors,
      warnings,
      presentation: parsedPresentation
    });

  } catch (error: any) {
    console.error('Presentation verification error:', error);
    res.status(500).json({
      error: 'Presentation verification failed',
      details: error?.message || 'Unknown error'
    });
  }
};

// GET /api/vc/contexts - Get JSON-LD contexts
export const getContexts = (req: Request, res: Response) => {
  try {
    const contexts = [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/ns/credentials/v2',
      'https://schema.org',
      'https://schemas.originvault.box/contexts/trust-chain-core.jsonld'
    ];

    res.json({ contexts });
  } catch (error: any) {
    console.error('Error fetching contexts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contexts',
      details: error?.message || 'Unknown error'
    });
  }
};

// Helper functions
function validateBasicVCStructure(credential: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!credential['@context']) {
    errors.push('Missing required @context field');
  } else if (!Array.isArray(credential['@context'])) {
    errors.push('@context must be an array');
  } else if (!credential['@context'].includes('https://www.w3.org/2018/credentials/v1') && 
            !credential['@context'].includes('https://www.w3.org/ns/credentials/v2')) {
    errors.push('Missing required W3C VC context');
  }

  if (!credential.type) {
    errors.push('Missing required type field');
  } else if (!Array.isArray(credential.type)) {
    errors.push('type must be an array');
  } else if (!credential.type.includes('VerifiableCredential')) {
    errors.push('type must include "VerifiableCredential"');
  }

  if (!credential.issuer) {
    errors.push('Missing required issuer field');
  }

  if (!credential.credentialSubject) {
    errors.push('Missing required credentialSubject field');
  }

  // Check for either issuanceDate or validFrom (both are valid in W3C VC spec)
  if (!credential.issuanceDate && !credential.validFrom) {
    warnings.push('Missing issuanceDate or validFrom field - this may be valid for some credential types');
  }

  // Check proof structure if present
  if (credential.proof) {
    if (typeof credential.proof === 'object' && credential.proof.type === 'JwtProof2020') {
      // JWT proof format - just warn that we can't fully validate JWT without keys
      warnings.push('JWT proof detected - full signature verification requires access to issuer keys');
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

function validateBasicVPStructure(presentation: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!presentation['@context']) {
    errors.push('Missing required @context field');
  }

  if (!presentation.type || !presentation.type.includes('VerifiablePresentation')) {
    errors.push('Missing or invalid type field');
  }

  if (!presentation.verifiableCredential || !Array.isArray(presentation.verifiableCredential)) {
    errors.push('Missing or invalid verifiableCredential field');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

function validateContexts(credential: any): ValidationResult {
  const warnings: string[] = [];
  
  if (credential['@context'] && Array.isArray(credential['@context'])) {
    const hasOriginVaultContext = credential['@context'].includes('https://schema.originvault.io/context/v1');
    if (!hasOriginVaultContext) {
      warnings.push('Consider including OriginVault context for enhanced compatibility');
    }
  }
  
  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
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
  const contexts = ['https://www.w3.org/2018/credentials/v1'];
  
  // Check if schema suggests additional contexts
  if (schema.properties && schema.properties['@context']) {
    // Extract from schema definition
  }
  
  contexts.push('https://schema.originvault.io/context/v1');
  return contexts;
}

function getAvailableSchemas(): CredentialSchema[] {
  try {
    const schemasDir = path.join(process.cwd(), 'schemas', 'v1');
    
    if (!fs.existsSync(schemasDir)) {
      console.warn('Schemas directory not found:', schemasDir);
      return [];
    }

    const schemaFiles = fs.readdirSync(schemasDir)
      .filter(file => file.endsWith('.schema.json'));

    const schemas: CredentialSchema[] = [];

    for (const file of schemaFiles) {
      try {
        const filePath = path.join(schemasDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const schemaData = JSON.parse(content);

        // Extract relevant information from the schema
        const schema: CredentialSchema = {
          id: schemaData.$id || file.replace('.schema.json', ''),
          name: schemaData.title || file.replace('.schema.json', '').replace(/([A-Z])/g, ' $1').trim(),
          description: schemaData.description || 'No description available',
          version: '1.0.0',
          schema: schemaData,
          examples: schemaData.examples || []
        };

        schemas.push(schema);
      } catch (error: any) {
        console.error(`Error parsing schema file ${file}:`, error.message);
        // Continue processing other files even if one fails
      }
    }

    // Sort schemas by name for better UX
    schemas.sort((a, b) => a.name.localeCompare(b.name));

    return schemas;
  } catch (error: any) {
    console.error('Error loading schemas:', error.message);
    return [];
  }
}

 