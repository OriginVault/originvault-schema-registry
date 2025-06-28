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
      credentialSubject: subject || {
        id: 'did:example:subject',
        // Add schema-specific fields here based on schemaId
      }
    };

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