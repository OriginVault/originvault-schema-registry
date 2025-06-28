import fs from 'fs';
import path from 'path';

// Helper function to determine VC category
function determineVCCategory(filename) {
  const name = filename.toLowerCase();
  
  if (name.includes('person') || name.includes('identity') || name.includes('developer') || name.includes('member') || name.includes('did')) {
    return 'Identity';
  }
  if (name.includes('contract') || name.includes('payment') || name.includes('workflow') || name.includes('agreement') || name.includes('governance') || name.includes('admin')) {
    return 'Business';
  }
  if (name.includes('content') || name.includes('creative') || name.includes('provenance') || name.includes('ai') || name.includes('licensing')) {
    return 'Content';
  }
  if (name.includes('trust') || name.includes('endorsement') || name.includes('reputation') || name.includes('verification') || name.includes('gem')) {
    return 'Trust';
  }
  if (name.includes('vault') || name.includes('plugin') || name.includes('api') || name.includes('node') || name.includes('config')) {
    return 'Platform';
  }
  
  return 'Other';
}

// Helper function to extract contexts
function extractContexts(schema) {
  const contexts = [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/ns/credentials/v2'
  ];
  
  // Check if schema suggests additional contexts
  if (schema.properties && schema.properties['@context']) {
    if (schema.properties['@context'].items && Array.isArray(schema.properties['@context'].items.enum)) {
      // Add any additional contexts from the schema
      contexts.push(...schema.properties['@context'].items.enum.filter(ctx => 
        !contexts.includes(ctx)
      ));
    }
  }
  
  // Add OriginVault context
  contexts.push('https://schemas.originvault.box/contexts/trust-chain-core.jsonld');
  
  return contexts;
}

// Helper function to get schema base name for deduplication
function getSchemaBaseName(title) {
  return title
    .replace(/\s*Assertion\s*Credential$/i, '')
    .replace(/\s*Credential$/i, '')
    .replace(/\s*Schema$/i, '')
    .replace(/\s*Declaration$/i, '')
    .replace(/\s*Agreement$/i, '')
    .replace(/\s*Record$/i, '')
    .replace(/\s*Registry$/i, '')
    .replace(/\s*Metadata$/i, '')
    .trim();
}

// Helper function to select preferred schema from duplicates
function selectPreferredSchema(schemas) {
  return schemas.reduce((preferred, current) => {
    // Prefer Assertion credentials
    const preferredHasAssertion = preferred.title.includes('Assertion');
    const currentHasAssertion = current.title.includes('Assertion');
    
    if (currentHasAssertion && !preferredHasAssertion) {
      return current;
    }
    if (preferredHasAssertion && !currentHasAssertion) {
      return preferred;
    }

    // Prefer schemas with "Credential" suffix
    const preferredHasCredential = preferred.title.includes('Credential');
    const currentHasCredential = current.title.includes('Credential');
    
    if (currentHasCredential && !preferredHasCredential) {
      return current;
    }
    if (preferredHasCredential && !currentHasCredential) {
      return preferred;
    }

    // Prefer longer, more descriptive names
    if (current.title.length > preferred.title.length) {
      return current;
    }
    if (preferred.title.length > current.title.length) {
      return preferred;
    }

    // Prefer alphabetically later names
    return current.title.localeCompare(preferred.title) > 0 ? current : preferred;
  });
}

// Helper function to deduplicate schemas
function deduplicateSchemas(schemas) {
  const schemaMap = new Map();

  // Group schemas by their base name
  for (const schema of schemas) {
    const baseName = getSchemaBaseName(schema.title);
    if (!schemaMap.has(baseName)) {
      schemaMap.set(baseName, []);
    }
    schemaMap.get(baseName).push(schema);
  }

  const deduplicatedSchemas = [];

  // For each group, select the preferred version
  for (const [baseName, schemaGroup] of schemaMap.entries()) {
    if (schemaGroup.length === 1) {
      deduplicatedSchemas.push(schemaGroup[0]);
    } else {
      const preferredSchema = selectPreferredSchema(schemaGroup);
      deduplicatedSchemas.push(preferredSchema);
      console.log(`📋 Deduplicated ${baseName}: Selected "${preferredSchema.title}" from ${schemaGroup.length} variants`);
    }
  }

  return deduplicatedSchemas;
}

// Main handler function
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Try to load the pre-built index.json file
    const possibleIndexPaths = [
      path.join(process.cwd(), 'public', 'schemas', 'v1', 'index.json'),
      path.join(process.cwd(), 'schemas', 'v1', 'index.json'),
      path.join(process.cwd(), '..', 'schemas', 'v1', 'index.json')
    ];
    
    let indexData = null;
    for (const indexPath of possibleIndexPaths) {
      if (fs.existsSync(indexPath)) {
        console.log('Found index.json at:', indexPath);
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        indexData = JSON.parse(indexContent);
        break;
      }
    }
    
    if (indexData) {
      // Convert index.json format to our API format
      const schemas = [];
      
      for (const [categoryKey, categoryData] of Object.entries(indexData.categories)) {
        if (categoryData.schemas) {
          for (const schemaInfo of categoryData.schemas) {
            const schema = {
              id: schemaInfo.name,
              title: schemaInfo.name.replace(/([A-Z])/g, ' $1').trim(),
              description: schemaInfo.description || 'No description available',
              category: categoryData.name,
              version: '1.0.0',
              schema: null, // We don't include full schema in listing
              contexts: extractContexts({}),
              examples: schemaInfo.example ? [schemaInfo.example] : []
            };
            schemas.push(schema);
          }
        }
      }
      
      // Sort schemas by title
      schemas.sort((a, b) => a.title.localeCompare(b.title));
      
      res.status(200).json({
        schemas: schemas,
        count: schemas.length
      });
      return;
    }
    
    // Fallback: Return a minimal response if index.json is not found
    console.warn('index.json not found, returning hardcoded schemas');
    const fallbackSchemas = [
      {
        id: 'PersonCredential',
        title: 'Person Credential',
        description: 'Individual identity verification and management',
        category: 'Identity',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'OrganizationCredential',
        title: 'Organization Credential', 
        description: 'Business entity verification and authority delegation',
        category: 'Identity',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'ContractCredential',
        title: 'Contract Credential',
        description: 'Legal contract execution and tracking',
        category: 'Business',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      }
    ];
    
    res.status(200).json({
      schemas: fallbackSchemas,
      count: fallbackSchemas.length
    });

  } catch (error) {
    console.error('Error loading schemas:', error);
    res.status(500).json({ 
      error: 'Failed to fetch schemas',
      details: error?.message || 'Unknown error',
      schemas: [],
      count: 0
    });
  }
} 