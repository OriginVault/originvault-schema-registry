import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

interface C2PAManifest {
  format: string;
  title?: string;
  claim_generator: string;
  claim_generator_info?: any[];
  assertions: Assertion[];
  signature_info?: any;
}

interface Assertion {
  label: string;
  data?: any;
  hash?: string;
  url?: string;
}

interface ProvenanceRecord {
  id: string;
  contentHash: string;
  manifestHash: string;
  timestamp: string;
  provenance: ProvenanceEntry[];
  c2paManifest: C2PAManifest;
}

interface ProvenanceEntry {
  action: string;
  timestamp: string;
  actor: string;
  tool?: string;
  parameters?: any;
  input?: string[];
  output?: string[];
}

// In-memory store for demo purposes
const provenanceStore = new Map<string, ProvenanceRecord>();

// POST /api/c2pa/create-manifest - Create a C2PA manifest
export const createManifest = async (req: Request, res: Response) => {
  try {
    const { 
      content_hash, 
      title, 
      creator, 
      creation_tool, 
      creation_params,
      assertions = [] 
    } = req.body;
    
    if (!content_hash || !creator) {
      return res.status(400).json({ 
        error: 'content_hash and creator are required' 
      });
    }
    
    const manifest: C2PAManifest = {
      format: 'application/c2pa',
      title: title || 'Untitled Content',
      claim_generator: creation_tool || 'OriginVault Schema Registry',
      claim_generator_info: [
        {
          name: 'OriginVault',
          version: '1.0.0'
        }
      ],
      assertions: [
        // Core C2PA assertions
        {
          label: 'c2pa.hash.data',
          data: {
            name: 'sha256',
            value: content_hash
          }
        },
        {
          label: 'c2pa.actions',
          data: [
            {
              action: 'c2pa.created',
              timestamp: new Date().toISOString(),
              softwareAgent: creation_tool || 'OriginVault',
              parameters: creation_params || {}
            }
          ]
        },
        {
          label: 'stds.schema-org.CreativeWork',
          data: {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            'creator': creator,
            'dateCreated': new Date().toISOString(),
            'contentHash': content_hash
          }
        },
        // Custom assertions
        ...assertions
      ]
    };
    
    // Generate manifest hash
    const manifestHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(manifest))
      .digest('hex');
    
    res.json({
      manifest,
      manifest_hash: manifestHash,
      content_hash
    });
  } catch (error) {
    console.error('Manifest creation error:', error);
    res.status(500).json({ error: 'Failed to create manifest' });
  }
};

// POST /api/c2pa/add-provenance - Add provenance entry
export const addProvenance = async (req: Request, res: Response) => {
  try {
    const { 
      content_hash, 
      action, 
      actor, 
      tool, 
      parameters, 
      input_hashes, 
      output_hashes 
    } = req.body;
    
    if (!content_hash || !action || !actor) {
      return res.status(400).json({ 
        error: 'content_hash, action, and actor are required' 
      });
    }
    
    const timestamp = new Date().toISOString();
    const provenanceEntry: ProvenanceEntry = {
      action,
      timestamp,
      actor,
      tool,
      parameters,
      input: input_hashes,
      output: output_hashes
    };
    
    // Get existing record or create new one
    let record = provenanceStore.get(content_hash);
    if (!record) {
      // Create new provenance record
      const manifest: C2PAManifest = {
        format: 'application/c2pa',
        claim_generator: 'OriginVault Schema Registry',
        assertions: [
          {
            label: 'c2pa.hash.data',
            data: {
              name: 'sha256',
              value: content_hash
            }
          }
        ]
      };
      
      record = {
        id: crypto.randomUUID(),
        contentHash: content_hash,
        manifestHash: crypto.createHash('sha256').update(JSON.stringify(manifest)).digest('hex'),
        timestamp,
        provenance: [],
        c2paManifest: manifest
      };
    }
    
    // Add new provenance entry
    record.provenance.push(provenanceEntry);
    
    // Update C2PA manifest with new action
    const actionsAssertion = record.c2paManifest.assertions.find(a => a.label === 'c2pa.actions');
    if (actionsAssertion && actionsAssertion.data) {
      actionsAssertion.data.push({
        action: `c2pa.${action}`,
        timestamp,
        softwareAgent: tool || 'Unknown',
        parameters: parameters || {}
      });
    } else {
      record.c2paManifest.assertions.push({
        label: 'c2pa.actions',
        data: [{
          action: `c2pa.${action}`,
          timestamp,
          softwareAgent: tool || 'Unknown',
          parameters: parameters || {}
        }]
      });
    }
    
    // Update manifest hash
    record.manifestHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(record.c2paManifest))
      .digest('hex');
    
    // Store updated record
    provenanceStore.set(content_hash, record);
    
    res.json({
      provenance_id: record.id,
      content_hash,
      provenance_entry: provenanceEntry,
      manifest_hash: record.manifestHash
    });
  } catch (error) {
    console.error('Provenance addition error:', error);
    res.status(500).json({ error: 'Failed to add provenance' });
  }
};

// GET /api/c2pa/provenance/:hash - Get provenance history
export const getProvenance = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    
    const record = provenanceStore.get(hash);
    if (!record) {
      return res.status(404).json({ error: 'Provenance record not found' });
    }
    
    res.json({
      provenance_id: record.id,
      content_hash: record.contentHash,
      manifest_hash: record.manifestHash,
      created: record.timestamp,
      provenance_chain: record.provenance,
      c2pa_manifest: record.c2paManifest,
      verification_status: await verifyProvenance(record)
    });
  } catch (error) {
    console.error('Provenance retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve provenance' });
  }
};

// POST /api/c2pa/verify-manifest - Verify C2PA manifest
export const verifyManifest = async (req: Request, res: Response) => {
  try {
    const { manifest, content_hash } = req.body;
    
    if (!manifest) {
      return res.status(400).json({ 
        valid: false, 
        errors: [{ message: 'Manifest is required' }] 
      });
    }
    
    const verificationResult = {
      valid: true,
      errors: [] as any[],
      warnings: [] as any[],
      assertions_verified: 0,
      content_hash_verified: false,
      signature_verified: false
    };
    
    // Verify manifest structure
    if (!manifest.format || manifest.format !== 'application/c2pa') {
      verificationResult.errors.push({ 
        message: 'Invalid or missing C2PA format' 
      });
      verificationResult.valid = false;
    }
    
    if (!manifest.assertions || !Array.isArray(manifest.assertions)) {
      verificationResult.errors.push({ 
        message: 'Assertions array is required' 
      });
      verificationResult.valid = false;
    } else {
      // Verify each assertion
      for (const assertion of manifest.assertions) {
        if (assertion.label === 'c2pa.hash.data') {
          if (content_hash && assertion.data?.value !== content_hash) {
            verificationResult.errors.push({
              message: 'Content hash mismatch'
            });
            verificationResult.valid = false;
          } else {
            verificationResult.content_hash_verified = true;
          }
        }
        verificationResult.assertions_verified++;
      }
    }
    
    res.json(verificationResult);
  } catch (error) {
    console.error('Manifest verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
};

// GET /api/c2pa/chain/:hash - Get full provenance chain
export const getProvenanceChain = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    
    const chain = await buildProvenanceChain(hash);
    
    if (!chain || chain.length === 0) {
      return res.status(404).json({ error: 'Provenance chain not found' });
    }
    
    res.json({
      content_hash: hash,
      chain_length: chain.length,
      chain,
      verification_summary: await verifyProvenanceChain(chain)
    });
  } catch (error) {
    console.error('Chain retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve provenance chain' });
  }
};

// POST /api/c2pa/create-derivative - Create derivative content record
export const createDerivative = async (req: Request, res: Response) => {
  try {
    const { 
      source_hash, 
      derivative_hash, 
      transformation, 
      actor, 
      tool, 
      parameters 
    } = req.body;
    
    if (!source_hash || !derivative_hash || !transformation || !actor) {
      return res.status(400).json({ 
        error: 'source_hash, derivative_hash, transformation, and actor are required' 
      });
    }
    
    // Create provenance for derivative
    const timestamp = new Date().toISOString();
    const derivativeManifest: C2PAManifest = {
      format: 'application/c2pa',
      claim_generator: 'OriginVault Schema Registry',
      assertions: [
        {
          label: 'c2pa.hash.data',
          data: {
            name: 'sha256',
            value: derivative_hash
          }
        },
        {
          label: 'c2pa.actions',
          data: [{
            action: `c2pa.${transformation}`,
            timestamp,
            softwareAgent: tool || 'Unknown',
            parameters: parameters || {}
          }]
        },
        {
          label: 'c2pa.ingredient',
          data: {
            hash: source_hash,
            relationship: 'parentOf'
          }
        }
      ]
    };
    
    const manifestHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(derivativeManifest))
      .digest('hex');
    
    const derivativeRecord: ProvenanceRecord = {
      id: crypto.randomUUID(),
      contentHash: derivative_hash,
      manifestHash,
      timestamp,
      provenance: [{
        action: transformation,
        timestamp,
        actor,
        tool,
        parameters,
        input: [source_hash],
        output: [derivative_hash]
      }],
      c2paManifest: derivativeManifest
    };
    
    provenanceStore.set(derivative_hash, derivativeRecord);
    
    res.json({
      derivative_id: derivativeRecord.id,
      derivative_hash,
      source_hash,
      manifest_hash: manifestHash,
      transformation,
      created: timestamp
    });
  } catch (error) {
    console.error('Derivative creation error:', error);
    res.status(500).json({ error: 'Failed to create derivative record' });
  }
};

// Helper functions
async function verifyProvenance(record: ProvenanceRecord): Promise<any> {
  return {
    manifest_hash_valid: true,
    chain_integrity: true,
    timestamp_valid: true,
    warnings: ['Cryptographic verification not implemented in demo']
  };
}

async function buildProvenanceChain(hash: string): Promise<any[]> {
  const chain: any[] = [];
  const visited = new Set<string>();
  
  async function traverse(currentHash: string) {
    if (visited.has(currentHash)) return;
    visited.add(currentHash);
    
    const record = provenanceStore.get(currentHash);
    if (!record) return;
    
    chain.push({
      content_hash: currentHash,
      timestamp: record.timestamp,
      provenance: record.provenance,
      manifest_hash: record.manifestHash
    });
    
    // Look for parent ingredients
    const ingredientAssertion = record.c2paManifest.assertions.find(
      a => a.label === 'c2pa.ingredient'
    );
    
    if (ingredientAssertion && ingredientAssertion.data?.hash) {
      await traverse(ingredientAssertion.data.hash);
    }
    
    // Look for inputs in provenance entries
    for (const entry of record.provenance) {
      if (entry.input) {
        for (const inputHash of entry.input) {
          await traverse(inputHash);
        }
      }
    }
  }
  
  await traverse(hash);
  return chain.reverse(); // Return in chronological order
}

async function verifyProvenanceChain(chain: any[]): Promise<any> {
  return {
    valid: true,
    chain_length: chain.length,
    earliest_timestamp: chain[0]?.timestamp,
    latest_timestamp: chain[chain.length - 1]?.timestamp,
    broken_links: [],
    warnings: ['Full cryptographic verification not implemented in demo']
  };
} 