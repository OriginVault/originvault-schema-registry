// Generate schema-specific credential subject templates
function generateCredentialSubject(schemaId) {
  const schemaTemplates = {
    // Identity Schemas
    'PersonCredential': {
      id: 'did:example:person:123',
      givenName: 'John',
      familyName: 'Doe',
      email: 'john.doe@example.com',
      telephone: '+1-555-123-4567',
      address: {
        streetAddress: '123 Main St',
        addressLocality: 'Anytown',
        addressRegion: 'CA',
        postalCode: '12345',
        addressCountry: 'US'
      },
      birthDate: '1990-01-01',
      nationality: 'US'
    },
    
    'OrganizationCredential': {
      id: 'did:example:organization:456',
      legalName: 'Acme Corporation',
      alternateName: 'Acme Corp',
      taxID: '12-3456789',
      registrationNumber: 'REG-123456',
      address: {
        streetAddress: '456 Business Ave',
        addressLocality: 'Business City',
        addressRegion: 'CA',
        postalCode: '54321',
        addressCountry: 'US'
      },
      url: 'https://acme-corp.example.com',
      email: 'contact@acme-corp.example.com',
      telephone: '+1-555-987-6543',
      foundingDate: '2020-01-01',
      industry: 'Technology'
    },
    
    'AdminCredential': {
      id: 'did:example:admin:789',
      adminType: 'SystemAdmin',
      permissions: ['user_management', 'system_config', 'audit_access'],
      clearanceLevel: 'Level3',
      department: 'IT Operations',
      startDate: '2024-01-01',
      supervisor: 'did:example:manager:456'
    },
    
    'VaultAccessCredential': {
      id: 'did:example:access:321',
      vaultId: 'did:example:vault:vault-456',
      userId: 'did:example:user:user-789',
      permissions: ['read', 'write', 'execute'],
      accessLevel: 'Standard',
      grantedBy: 'did:example:admin:admin-123',
      grantDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    
    'APIAccessCredential': {
      id: 'did:example:api-access:654',
      apiKey: 'api_key_abc123def456',
      userId: 'did:example:user:user-789',
      rateLimit: 1000,
      requestsPerMinute: 100,
      endpoints: ['/v1/content', '/v1/credentials', '/v1/schemas'],
      scope: ['read:schemas', 'write:credentials'],
      environment: 'production'
    },
    
    'OriginVaultRootAuthority': {
      id: 'did:example:root-authority:root-001',
      authorityType: 'PlatformRoot',
      governanceScope: 'global',
      jurisdiction: 'US',
      establishedDate: '2024-01-01',
      publicKey: 'did:example:root-authority:root-001#key-1',
      trustLevel: 'Ultimate'
    },
    
    // Business Schemas
    'ContractCredential': {
      id: 'did:example:contract:contract-456',
      contractType: 'ContentCreation',
      parties: ['did:example:acme-corp', 'did:example:creator-789'],
      title: 'Exclusive Video Content Creation Agreement',
      terms: 'Creator agrees to produce 12 exclusive video content pieces per month for Acme Corp...',
      compensation: {
        amount: 5000,
        currency: 'USD',
        paymentSchedule: 'monthly',
        paymentMethod: 'bank_transfer'
      },
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      governingLaw: 'California, US'
    },
    
    'EquityGrantCredential': {
      id: 'did:example:equity-grant:grant-789',
      grantee: 'did:example:creator:creator-123',
      grantor: 'did:example:organization:acme-corp',
      equityType: 'RestrictedMembershipUnits',
      totalUnits: 2100,
      vestedUnits: 0,
      grantDate: new Date().toISOString().split('T')[0],
      vestingSchedule: {
        type: 'cliff',
        cliffPeriod: '12 months',
        vestingPeriod: '48 months',
        accelerationTriggers: ['change_of_control', 'involuntary_termination']
      },
      exercisePrice: 0.01,
      valuationDate: new Date().toISOString().split('T')[0]
    },
    
    'WorkflowExecutionCredential': {
      id: 'did:example:workflow:workflow-789',
      workflowType: 'ContractIssuance',
      status: 'in_progress',
      initiator: 'did:example:user:user-123',
      steps: [
        {
          step: 'organization_verification',
          status: 'completed',
          assignee: 'did:example:verifier:verifier-456',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          result: 'verified'
        },
        {
          step: 'contract_review',
          status: 'in_progress',
          assignee: 'did:example:legal:legal-789',
          timestamp: new Date().toISOString(),
          result: null
        }
      ],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high'
    },
    
    // Content Schemas
    'CreativeWorkCredential': {
      id: 'did:example:content:content-123',
      title: 'Amazing Creative Video Content',
      creator: 'did:example:creator:creator-456',
      contentType: 'video',
      genre: 'educational',
      description: 'An engaging educational video about blockchain technology',
      duration: 'PT10M30S',
      license: 'exclusive',
      creationDate: new Date().toISOString().split('T')[0],
      contentHash: 'sha256:a1b2c3d4e5f6789abcdef1234567890',
      fileSize: 157286400,
      resolution: '1920x1080',
      frameRate: 30
    },
    
    'ContentAuthenticityCredential': {
      id: 'did:example:authenticity:auth-456',
      contentId: 'did:example:content:content-123',
      hashAlgorithm: 'SHA-256',
      contentHash: 'a1b2c3d4e5f6789abcdef1234567890abcdef123456',
      originalCreator: 'did:example:creator:creator-456',
      creationTimestamp: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      verificationMethod: 'cryptographic_signature',
      integrityStatus: 'verified',
      c2paManifest: 'included'
    },
    
    'ContentAIPermissionCredential': {
      id: 'did:example:ai-permission:perm-789',
      contentId: 'did:example:content:content-123',
      contentOwner: 'did:example:creator:creator-456',
      aiUsageType: 'training',
      permissionLevel: 'exclusive',
      aiProvider: 'did:example:ai-company:ai-corp-789',
      usageScope: ['model_training', 'fine_tuning'],
      restrictions: ['no_redistribution', 'attribution_required'],
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      compensationTerms: 'Revenue sharing: 15% of AI model licensing revenue'
    },
    
    // Trust Schemas
    'TrustedIssuerCredential': {
      id: 'did:example:issuer:issuer-123',
      issuerName: 'Trusted Verification Corporation',
      issuerType: 'KYCProvider',
      accreditationLevel: 'Level2',
      trustScore: 95,
      certifications: ['ISO27001', 'SOC2Type2'],
      auditDate: new Date().toISOString().split('T')[0],
      auditor: 'did:example:auditor:auditor-456',
      serviceOfferings: ['identity_verification', 'document_authentication', 'background_checks'],
      jurisdiction: 'US',
      regulatoryCompliance: ['GDPR', 'CCPA', 'KYC_AML']
    },
    
    'ReputationCredential': {
      id: 'did:example:reputation:rep-456',
      entityId: 'did:example:creator:creator-789',
      reputationScore: 85,
      trustLevel: 'verified',
      category: 'content_creator',
      metrics: {
        completedProjects: 47,
        clientSatisfaction: 4.8,
        onTimeDelivery: 96,
        responseTime: '2h average'
      },
      lastUpdated: new Date().toISOString(),
      calculationMethod: 'weighted_average',
      endorsements: 23
    },
    
    // Payment Schemas
    'PaymentCredential': {
      id: 'did:example:payment:payment-789',
      payer: 'did:example:acme-corp',
      payee: 'did:example:creator:creator-456',
      amount: 5000.00,
      currency: 'USD',
      paymentMethod: 'bank_transfer',
      transactionId: 'txn_abc123def456',
      status: 'completed',
      paymentDate: new Date().toISOString(),
      description: 'Monthly content creation payment',
      reference: 'CONTRACT-456-MONTH-01'
    },
    
    'StorageCredential': {
      id: 'did:example:storage:storage-123',
      vaultId: 'did:example:vault:vault-456',
      userId: 'did:example:user:user-789',
      storageUsed: 1024,
      storageUnit: 'GB',
      storageType: 'encrypted_cloud',
      billingPeriod: '2025-01',
      cost: 25.50,
      currency: 'USD',
      dataTypes: ['videos', 'documents', 'credentials'],
      backupStatus: 'enabled',
      encryptionLevel: 'AES256'
    },
    
    // Platform Schemas
    'PluginEndorsementCredential': {
      id: 'did:example:plugin-endorsement:endorsement-123',
      pluginId: 'did:example:plugin:plugin-456',
      pluginName: 'Advanced Content Editor',
      developer: 'did:example:developer:dev-789',
      endorsementLevel: 'verified',
      securityScore: 92,
      auditDate: new Date().toISOString().split('T')[0],
      auditedBy: 'did:example:security-firm:sec-123',
      permissions: ['file_access', 'network_access'],
      compatibilityVersion: '1.2.0',
      downloadCount: 15420
    },
    
    'GemCredential': {
      id: 'did:example:gem:gem-789',
      userId: 'did:example:user:user-123',
      gemType: 'ContentCreator',
      achievement: 'First Video Published',
      level: 'Bronze',
      points: 100,
      earnedAt: new Date().toISOString(),
      requirements: ['Upload first video', 'Complete profile'],
      nextLevel: {
        name: 'Silver',
        pointsRequired: 500,
        additionalRequirements: ['10 videos published', '100+ views']
      },
      category: 'creation_milestone'
    }
  };
  
  return schemaTemplates[schemaId] || {
    id: 'did:example:subject',
    type: schemaId || 'BasicCredential',
    name: 'Example Subject',
    description: 'Please customize this credential subject for your specific use case'
  };
}

// Main handler function
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { schemaId, issuer, subject } = req.body;
    
    // Generate schema-specific credential subject if not provided
    const credentialSubject = subject || generateCredentialSubject(schemaId);
    
    const template = {
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
      credentialSubject: credentialSubject
    };

    console.log(`Generated template for schema: ${schemaId}`);
    console.log(`Credential subject fields: ${Object.keys(credentialSubject).join(', ')}`);

    res.status(200).json({
      template,
      schemaId: schemaId || 'BasicCredential'
    });

  } catch (error) {
    console.error('Template generation error:', error);
    res.status(500).json({
      error: 'Failed to generate template',
      details: error?.message || 'Unknown error'
    });
  }
} 