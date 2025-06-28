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
    // Debug current working directory
    console.log('Current working directory:', process.cwd());
    
    // Try to load the pre-built index.json file
    const possibleIndexPaths = [
      path.join(process.cwd(), 'public', 'schemas', 'v1', 'index.json'),
      path.join(process.cwd(), 'schemas', 'v1', 'index.json'),
      path.join(process.cwd(), '..', 'schemas', 'v1', 'index.json')
    ];
    
    let indexData = null;
    for (const indexPath of possibleIndexPaths) {
      console.log('Checking index path:', indexPath);
      if (fs.existsSync(indexPath)) {
        console.log('Found index.json at:', indexPath);
        try {
          const indexContent = fs.readFileSync(indexPath, 'utf8');
          console.log('Index file content length:', indexContent.length);
          indexData = JSON.parse(indexContent);
          console.log('Successfully parsed index.json');
          break;
        } catch (parseError) {
          console.error('Error parsing index.json:', parseError.message);
          continue;
        }
      } else {
        console.log('Index file not found at:', indexPath);
      }
    }
    
    if (indexData) {
      console.log('Loaded index data, checking structure...');
      console.log('Has categories:', !!indexData.categories);
      console.log('Categories type:', typeof indexData.categories);
      
      // Convert index.json format to our API format
      const schemas = [];
      
      // Check if categories exist and is an object
      if (indexData.categories && typeof indexData.categories === 'object') {
        for (const [categoryKey, categoryData] of Object.entries(indexData.categories)) {
          console.log(`Processing category: ${categoryKey}`);
          
          if (categoryData && categoryData.schemas && Array.isArray(categoryData.schemas)) {
            console.log(`Found ${categoryData.schemas.length} schemas in ${categoryKey}`);
            for (const schemaInfo of categoryData.schemas) {
              const schema = {
                id: schemaInfo.name,
                title: schemaInfo.name.replace(/([A-Z])/g, ' $1').trim(),
                description: schemaInfo.description || 'No description available',
                category: categoryData.name || categoryKey,
                version: '1.0.0',
                schema: null, // We don't include full schema in listing
                contexts: extractContexts({}),
                examples: schemaInfo.example ? [schemaInfo.example] : []
              };
              schemas.push(schema);
            }
          } else {
            console.log(`No valid schemas found in category: ${categoryKey}`);
          }
        }
      } else {
        console.warn('No categories found in index data or categories is not an object');
      }
      
      console.log(`Processed ${schemas.length} schemas from index.json`);
      
      // If we successfully extracted schemas from index.json, return them
      if (schemas.length > 0) {
        // Sort schemas by title
        schemas.sort((a, b) => a.title.localeCompare(b.title));
        
        res.status(200).json({
          schemas: schemas,
          count: schemas.length
        });
        return;
      } else {
        console.warn('No schemas extracted from index.json, falling back to hardcoded schemas');
      }
    }
    
    // Fallback: Return a comprehensive response if index.json is not found or has no valid schemas
    console.warn('Using fallback schemas - either index.json not found or contains no valid schemas');
    const fallbackSchemas = [
      // Identity Schemas
      {
        id: 'PersonCredential',
        title: 'Person Credential',
        description: 'Individual identity verification and management',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'OrganizationCredential',
        title: 'Organization Credential', 
        description: 'Business entity verification and authority delegation',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'AdminCredential',
        title: 'Admin Credential',
        description: 'Administrative privileges and system access',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'VaultAccessCredential',
        title: 'Vault Access Credential',
        description: 'Vault permission and access control management',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'APIAccessCredential',
        title: 'API Access Credential',
        description: 'API access control and rate limiting',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'OriginVaultRootAuthority',
        title: 'Origin Vault Root Authority',
        description: 'Platform root authority and governance',
        category: 'Identity & Access Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      // Business Schemas
      {
        id: 'ContractCredential',
        title: 'Contract Credential',
        description: 'Legal contract execution and tracking',
        category: 'Business Workflow Automation',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'EquityGrantCredential',
        title: 'Equity Grant Credential',
        description: 'Equity compensation and vesting management',
        category: 'Business Workflow Automation',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'WorkflowExecutionCredential',
        title: 'Workflow Execution Credential',
        description: 'Multi-step workflow orchestration and audit trails',
        category: 'Business Workflow Automation',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      // Content Schemas
      {
        id: 'CreativeWorkCredential',
        title: 'Creative Work Credential',
        description: 'Content ownership and metadata management',
        category: 'Content & Creation Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'ContentAuthenticityCredential',
        title: 'Content Authenticity Credential',
        description: 'Content integrity verification and C2PA compliance',
        category: 'Content & Creation Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'ContentAIPermissionCredential',
        title: 'Content AI Permission Credential',
        description: 'AI usage permissions and licensing',
        category: 'Content & Creation Management',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      // Trust Schemas
      {
        id: 'TrustedIssuerCredential',
        title: 'Trusted Issuer Credential',
        description: 'Trusted credential issuers and accreditation',
        category: 'Trust & Verification Systems',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'ReputationCredential',
        title: 'Reputation Credential',
        description: 'Reputation scoring and trust history',
        category: 'Trust & Verification Systems',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      // Payment Schemas
      {
        id: 'PaymentCredential',
        title: 'Payment Credential',
        description: 'Payment verification and transaction tracking',
        category: 'Payments & Economics',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'StorageCredential',
        title: 'Storage Credential',
        description: 'Storage usage and billing verification',
        category: 'Payments & Economics',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      // Platform Schemas
      {
        id: 'PluginEndorsementCredential',
        title: 'Plugin Endorsement Credential',
        description: 'Plugin verification and trust management',
        category: 'Platform & Services',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      },
      {
        id: 'GemCredential',
        title: 'Gem Credential',
        description: 'Platform reward and achievement system',
        category: 'Platform & Services',
        version: '1.0.0',
        schema: null,
        contexts: extractContexts({}),
        examples: []
      }
    ];
    
    console.log(`Returning ${fallbackSchemas.length} fallback schemas`);
    
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