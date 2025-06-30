// VC API types and interfaces
export interface VCSchema {
  id: string;
  title: string;
  description?: string;
  category?: string;
  schema: any;
  contexts: string[];
}

export interface VCCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: any;
  proof?: any;
}

export interface VCVerificationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

// Mock VC API service
export const vcApi = {
  getSchemas: async (): Promise<VCSchema[]> => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: 'basic-person',
        title: 'Basic Person',
        description: 'A basic person credential schema',
        category: 'identity',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        contexts: ['https://www.w3.org/2018/credentials/v1']
      }
    ];
  },

  issueCredential: async (schemaId: string, data: any): Promise<VCCredential> => {
    // Mock implementation
    return {
      id: `urn:uuid:${Date.now()}`,
      type: ['VerifiableCredential', schemaId],
      issuer: 'did:example:issuer',
      issuanceDate: new Date().toISOString(),
      credentialSubject: data
    };
  },

  verifyCredential: async (credential: VCCredential): Promise<VCVerificationResult> => {
    // Mock implementation
    return {
      valid: true
    };
  }
}; 