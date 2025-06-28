// Helper function to validate basic VC structure
function validateBasicVCStructure(credential) {
  const errors = [];
  const warnings = [];

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
    errors: errors.length > 0 ? errors.map(msg => ({ message: msg })) : [],
    warnings: warnings.length > 0 ? warnings.map(msg => ({ message: msg })) : []
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
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        error: 'Missing credential in request body'
      });
    }

    // Parse credential if it's a string
    let parsedCredential;
    try {
      parsedCredential = typeof credential === 'string' ? JSON.parse(credential) : credential;
    } catch (parseError) {
      return res.status(400).json({
        error: 'Invalid JSON format',
        details: parseError?.message || 'JSON parsing failed'
      });
    }

    // Validate basic VC structure
    const result = validateBasicVCStructure(parsedCredential);

    res.status(200).json({
      valid: result.valid,
      errors: result.errors || [],
      warnings: result.warnings || [],
      credential: parsedCredential
    });

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      error: 'Validation failed',
      details: error?.message || 'Unknown error'
    });
  }
} 