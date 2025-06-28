import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const router = express.Router();

// Schema sources configuration (following ADR 0086)
const SCHEMA_SOURCES = {
  originvault: './schemas/originvault',
  'open-verifiable': './schemas/open-verifiable', 
  dif: './schemas/dif'
} as const;

// Schema metadata schema
const SchemaMetadata = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  category: z.enum(['identity', 'business', 'content', 'trust', 'payments', 'platform']),
  tags: z.array(z.string()).optional(),
  version: z.string(),
  author: z.string().optional(),
  created: z.string().datetime().optional(),
  updated: z.string().datetime().optional()
});

// Load schemas from a directory
async function loadSchemasFromDirectory(dirPath: string): Promise<any[]> {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const schemas = [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.schema.json')) {
        const filePath = path.join(dirPath, file.name);
        const content = await fs.readFile(filePath, 'utf-8');
        const schema = JSON.parse(content);
        
        // Extract metadata from schema or separate metadata file
        const metadataPath = filePath.replace('.schema.json', '.metadata.json');
        let metadata = {};
        
        try {
          const metadataContent = await fs.readFile(metadataPath, 'utf-8');
          metadata = JSON.parse(metadataContent);
        } catch {
          // Use schema properties as fallback metadata
          metadata = {
            id: schema.$id || file.name.replace('.schema.json', ''),
            title: schema.title || file.name.replace('.schema.json', ''),
            description: schema.description,
            category: inferCategory(schema),
            tags: schema.tags || []
          };
        }

        schemas.push({
          ...metadata,
          schema,
          filename: file.name
        });
      }
    }

    return schemas;
  } catch (error) {
    console.error(`Failed to load schemas from ${dirPath}:`, error);
    return [];
  }
}

// Infer category from schema content
function inferCategory(schema: any): string {
  const title = (schema.title || '').toLowerCase();
  const description = (schema.description || '').toLowerCase();
  const content = title + ' ' + description;

  if (content.includes('person') || content.includes('identity') || content.includes('did')) {
    return 'identity';
  }
  if (content.includes('contract') || content.includes('business') || content.includes('organization')) {
    return 'business';
  }
  if (content.includes('content') || content.includes('media') || content.includes('c2pa')) {
    return 'content';
  }
  if (content.includes('trust') || content.includes('credential') || content.includes('verification')) {
    return 'trust';
  }
  if (content.includes('payment') || content.includes('billing') || content.includes('invoice')) {
    return 'payments';
  }
  
  return 'platform';
}

// GET /api/schemas/originvault
router.get('/originvault', async (req: Request, res: Response) => {
  try {
    const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES.originvault);
    res.json(schemas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load OriginVault schemas' });
  }
});

// GET /api/schemas/open-verifiable  
router.get('/open-verifiable', async (req: Request, res: Response) => {
  try {
    const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES['open-verifiable']);
    res.json(schemas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load Open Verifiable schemas' });
  }
});

// GET /api/schemas/dif
router.get('/dif', async (req: Request, res: Response) => {
  try {
    const schemas = await loadSchemasFromDirectory(SCHEMA_SOURCES.dif);
    res.json(schemas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load DIF schemas' });
  }
});

// GET /api/schemas/all - Unified endpoint
router.get('/all', async (req: Request, res: Response) => {
  try {
    const [originVaultSchemas, openVerifiableSchemas, difSchemas] = await Promise.all([
      loadSchemasFromDirectory(SCHEMA_SOURCES.originvault),
      loadSchemasFromDirectory(SCHEMA_SOURCES['open-verifiable']),
      loadSchemasFromDirectory(SCHEMA_SOURCES.dif)
    ]);

    const allSchemas = [
      ...originVaultSchemas.map(s => ({ ...s, source: 'OriginVault' })),
      ...openVerifiableSchemas.map(s => ({ ...s, source: 'Open Verifiable' })),
      ...difSchemas.map(s => ({ ...s, source: 'DIF' }))
    ];

    res.json(allSchemas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load schemas' });
  }
});

// GET /api/schemas/:source/:schemaId - Get specific schema
router.get('/:source/:schemaId', async (req: Request, res: Response) => {
  const { source, schemaId } = req.params;
  
  if (!(source in SCHEMA_SOURCES)) {
    return res.status(404).json({ error: 'Schema source not found' });
  }

  try {
    const sourcePath = SCHEMA_SOURCES[source as keyof typeof SCHEMA_SOURCES];
    const schemaPath = path.join(sourcePath, `${schemaId}.schema.json`);
    
    const content = await fs.readFile(schemaPath, 'utf-8');
    const schema = JSON.parse(content);
    
    res.json(schema);
  } catch (error) {
    res.status(404).json({ error: 'Schema not found' });
  }
});

export default router; 