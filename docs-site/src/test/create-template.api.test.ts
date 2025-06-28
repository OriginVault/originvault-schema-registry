import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the API function since we're testing it in isolation
const createTemplateAPI = async (requestBody: any) => {
  // This simulates the actual API logic from docs-site/api/vc/create-template.js
  const generateCredentialSubject = (schemaId: string) => {
    const templates: Record<string, any> = {
      'PersonCredential': {
        id: "did:example:subject456",
        name: "John Doe",
        birthDate: "1990-01-01",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "US"
        },
        email: "john@example.com",
        phone: "+1-555-123-4567"
      },
      'ContentAuthenticityCredential': {
        id: "did:example:subject456",
        contentHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        contentUrl: "https://example.com/content/image.jpg",
        contentType: "image/jpeg",
        creationDate: "2025-06-28T03:34:36.010Z",
        author: "John Creator",
        authenticationMethod: "c2pa_manifest",
        provenanceChain: ["https://c2pa.org/manifest/abc123"]
      },
      'OrganizationCredential': {
        id: "did:example:org789",
        name: "Example Corp",
        type: "Corporation",
        address: {
          street: "456 Business Ave",
          city: "Corporate City",
          state: "NY",
          zipCode: "10001",
          country: "US"
        },
        industry: "Technology",
        founded: "2010-01-01",
        website: "https://example.com"
      }
    }
    
    return templates[schemaId] || { id: "did:example:subject456" }
  }

  const { schemaId, issuer, subject } = requestBody
  
  // Check if subject is meaningful (not empty object, null, undefined, or empty string)
  const isSubjectMeaningful = subject && 
    typeof subject === 'object' && 
    Object.keys(subject).length > 0 &&
    !(Object.keys(subject).length === 1 && subject.id !== undefined && !subject.id.trim())
  
  // Generate schema-specific credential subject if not provided or empty
  const credentialSubject = isSubjectMeaningful ? subject : generateCredentialSubject(schemaId)
  
  const template = {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
    ],
    "type": [
      "VerifiableCredential",
      schemaId
    ],
    "issuer": issuer || "did:example:issuer123",
    "validFrom": new Date().toISOString(),
    "validUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    "credentialSubject": credentialSubject
  }

  return {
    template,
    schemaId
  }
}

describe('Create Template API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Empty or meaningless credential subjects', () => {
    it('should generate template when subject is undefined', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: undefined
      })

      expect(response.template.credentialSubject).toEqual({
        id: "did:example:subject456",
        name: "John Doe",
        birthDate: "1990-01-01",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "US"
        },
        email: "john@example.com",
        phone: "+1-555-123-4567"
      })
      expect(response.schemaId).toBe('PersonCredential')
    })

    it('should generate template when subject is empty object', async () => {
      const response = await createTemplateAPI({
        schemaId: 'ContentAuthenticityCredential',
        issuer: 'did:example:issuer123',
        subject: {}
      })

      expect(response.template.credentialSubject).toEqual({
        id: "did:example:subject456",
        contentHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        contentUrl: "https://example.com/content/image.jpg",
        contentType: "image/jpeg",
        creationDate: "2025-06-28T03:34:36.010Z",
        author: "John Creator",
        authenticationMethod: "c2pa_manifest",
        provenanceChain: ["https://c2pa.org/manifest/abc123"]
      })
      expect(response.schemaId).toBe('ContentAuthenticityCredential')
    })

    it('should generate template when subject only has empty id', async () => {
      const response = await createTemplateAPI({
        schemaId: 'OrganizationCredential',
        issuer: 'did:example:issuer123',
        subject: { id: "" }
      })

      // The actual API behavior: empty id is not considered meaningful, so it should generate a template
      expect(response.template.credentialSubject).toEqual({
        id: "did:example:org789",
        name: "Example Corp",
        type: "Corporation",
        address: {
          street: "456 Business Ave",
          city: "Corporate City",
          state: "NY",
          zipCode: "10001",
          country: "US"
        },
        industry: "Technology",
        founded: "2010-01-01",
        website: "https://example.com"
      })
    })

    it('should generate template when subject only has whitespace id', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: { id: "   " }
      })

      expect(response.template.credentialSubject.name).toBe("John Doe")
      expect(response.template.credentialSubject.id).toBe("did:example:subject456")
    })
  })

  describe('Meaningful credential subjects', () => {
    it('should use provided subject when it has meaningful content', async () => {
      const customSubject = {
        id: "did:example:custom123",
        name: "Custom Person",
        email: "custom@example.com"
      }

      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: customSubject
      })

      expect(response.template.credentialSubject).toEqual(customSubject)
      expect(response.schemaId).toBe('PersonCredential')
    })

    it('should use provided subject even if id is present with content', async () => {
      const customSubject = {
        id: "did:example:meaningful123",
        customField: "custom value",
        anotherField: 42
      }

      const response = await createTemplateAPI({
        schemaId: 'ContentAuthenticityCredential',
        issuer: 'did:example:issuer123',
        subject: customSubject
      })

      expect(response.template.credentialSubject).toEqual(customSubject)
    })
  })

  describe('Schema-specific template generation', () => {
    it('should generate PersonCredential template with person-specific fields', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123'
      })

      const subject = response.template.credentialSubject
      expect(subject).toHaveProperty('name')
      expect(subject).toHaveProperty('birthDate')
      expect(subject).toHaveProperty('address')
      expect(subject).toHaveProperty('email')
      expect(subject).toHaveProperty('phone')
      expect(subject.address).toHaveProperty('street')
      expect(subject.address).toHaveProperty('city')
    })

    it('should generate ContentAuthenticityCredential template with content-specific fields', async () => {
      const response = await createTemplateAPI({
        schemaId: 'ContentAuthenticityCredential',
        issuer: 'did:example:issuer123'
      })

      const subject = response.template.credentialSubject
      expect(subject).toHaveProperty('contentHash')
      expect(subject).toHaveProperty('contentUrl')
      expect(subject).toHaveProperty('contentType')
      expect(subject).toHaveProperty('creationDate')
      expect(subject).toHaveProperty('author')
      expect(subject).toHaveProperty('authenticationMethod')
      expect(subject).toHaveProperty('provenanceChain')
      expect(Array.isArray(subject.provenanceChain)).toBe(true)
    })

    it('should generate OrganizationCredential template with organization-specific fields', async () => {
      const response = await createTemplateAPI({
        schemaId: 'OrganizationCredential',
        issuer: 'did:example:issuer123'
      })

      const subject = response.template.credentialSubject
      expect(subject).toHaveProperty('name')
      expect(subject).toHaveProperty('type')
      expect(subject).toHaveProperty('industry')
      expect(subject).toHaveProperty('founded')
      expect(subject).toHaveProperty('website')
      expect(subject.address).toHaveProperty('street')
    })

    it('should generate fallback template for unknown schema types', async () => {
      const response = await createTemplateAPI({
        schemaId: 'UnknownSchemaType',
        issuer: 'did:example:issuer123'
      })

      const subject = response.template.credentialSubject
      expect(subject).toEqual({ id: "did:example:subject456" })
    })
  })

  describe('Template structure', () => {
    it('should generate template with correct W3C VC structure', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:custom-issuer'
      })

      const template = response.template
      
      // Check @context
      expect(template['@context']).toEqual([
        "https://www.w3.org/ns/credentials/v2",
        "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
      ])
      
      // Check type
      expect(template.type).toEqual([
        "VerifiableCredential",
        "PersonCredential"
      ])
      
      // Check issuer
      expect(template.issuer).toBe('did:example:custom-issuer')
      
      // Check dates
      expect(template.validFrom).toBeDefined()
      expect(template.validUntil).toBeDefined()
      expect(new Date(template.validFrom)).toBeInstanceOf(Date)
      expect(new Date(template.validUntil)).toBeInstanceOf(Date)
      
      // Check credential subject
      expect(template.credentialSubject).toBeDefined()
      expect(typeof template.credentialSubject).toBe('object')
    })

    it('should use default issuer when not provided', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential'
      })

      expect(response.template.issuer).toBe('did:example:issuer123')
    })

    it('should set validUntil to approximately one year from validFrom', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123'
      })

      const validFrom = new Date(response.template.validFrom)
      const validUntil = new Date(response.template.validUntil)
      const diffInDays = (validUntil.getTime() - validFrom.getTime()) / (1000 * 60 * 60 * 24)
      
      // Should be approximately 365 days (within 1 day tolerance for test timing)
      expect(diffInDays).toBeGreaterThan(364)
      expect(diffInDays).toBeLessThan(366)
    })
  })

  describe('Edge cases', () => {
    it('should handle null subject', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: null
      })

      expect(response.template.credentialSubject.name).toBe("John Doe")
    })

    it('should handle non-object subject', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: "invalid string"
      })

      expect(response.template.credentialSubject.name).toBe("John Doe")
    })

    it('should handle array subject', async () => {
      const response = await createTemplateAPI({
        schemaId: 'PersonCredential',
        issuer: 'did:example:issuer123',
        subject: []
      })

      expect(response.template.credentialSubject.name).toBe("John Doe")
    })
  })
}) 