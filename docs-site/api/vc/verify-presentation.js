// Helper function to validate basic VP structure
function validateBasicVPStructure(presentation) {
  const errors = [];
  const warnings = [];

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
    const { presentation } = req.body;

    if (!presentation) {
      return res.status(400).json({
        error: 'Missing presentation in request body'
      });
    }

    // Parse presentation if it's a string
    let parsedPresentation;
    try {
      parsedPresentation = typeof presentation === 'string' ? JSON.parse(presentation) : presentation;
    } catch (parseError) {
      return res.status(400).json({
        error: 'Invalid JSON format',
        details: parseError?.message || 'JSON parsing failed'
      });
    }

    // Basic presentation validation
    const result = validateBasicVPStructure(parsedPresentation);

    res.status(200).json({
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      presentation: parsedPresentation
    });

  } catch (error) {
    console.error('Presentation verification error:', error);
    res.status(500).json({
      error: 'Presentation verification failed',
      details: error?.message || 'Unknown error'
    });
  }
} 