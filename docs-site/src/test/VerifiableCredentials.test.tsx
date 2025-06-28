import React from 'react'
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import VerifiableCredentials from '../pages/VerifiableCredentials'

const theme = createTheme()

// Mock the fetch function
const mockFetch = vi.fn() as MockedFunction<typeof fetch>
global.fetch = mockFetch

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('VerifiableCredentials Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock schemas response
    mockFetch.mockImplementation((url) => {
      if (url === '/api/vc/schemas') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            schemas: [
              {
                id: 'PersonCredential',
                title: 'Person Credential',
                description: 'A credential for person identity',
                category: 'Identity',
                contexts: ['https://www.w3.org/ns/credentials/v2']
              },
              {
                id: 'ContentAuthenticityCredential',
                title: 'Content Authenticity Credential',
                description: 'A credential for content authenticity',
                category: 'Content',
                contexts: ['https://www.w3.org/ns/credentials/v2']
              }
            ],
            count: 2
          })
        } as Response)
      }
      return Promise.reject(new Error('Unknown URL'))
    })
  })

  describe('Template Creation', () => {
    it('should generate template with empty subject field', async () => {
      const user = userEvent.setup()
      
      // Mock create-template response
      mockFetch.mockImplementation((url) => {
        if (url === '/api/vc/schemas') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              schemas: [
                {
                  id: 'PersonCredential',
                  title: 'Person Credential',
                  description: 'A credential for person identity',
                  category: 'Identity',
                  contexts: ['https://www.w3.org/ns/credentials/v2']
                }
              ],
              count: 1
            })
          } as Response)
        }
        
        if (url === '/api/vc/create-template') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              template: {
                "@context": [
                  "https://www.w3.org/ns/credentials/v2",
                  "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
                ],
                "type": ["VerifiableCredential", "PersonCredential"],
                "issuer": "did:example:issuer123",
                "validFrom": "2025-06-28T03:34:36.007Z",
                "validUntil": "2026-06-28T03:34:36.010Z",
                "credentialSubject": {
                  "id": "did:example:subject456",
                  "name": "John Doe",
                  "birthDate": "1990-01-01",
                  "email": "john@example.com"
                }
              },
              schemaId: "PersonCredential"
            })
          } as Response)
        }
        
        return Promise.reject(new Error('Unknown URL'))
      })

      renderWithProviders(<VerifiableCredentials />)
      
      // Wait for component to load and navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Create Template'))
      
      // Fill in required fields
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Person Credential'))
      
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      // Leave subject field empty/default and generate template
      const generateButton = screen.getByText('Generate Template')
      await user.click(generateButton)
      
      // Verify API call was made correctly
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/vc/create-template', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schemaId: 'PersonCredential',
            issuer: 'did:example:issuer123',
            subject: undefined
          })
        })
      })
    })

    it('should generate template when subject field contains only "{}"', async () => {
      const user = userEvent.setup()
      
      // Mock create-template response
      mockFetch.mockImplementation((url) => {
        if (url === '/api/vc/schemas') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              schemas: [
                {
                  id: 'ContentAuthenticityCredential',
                  title: 'Content Authenticity Credential',
                  description: 'A credential for content authenticity',
                  category: 'Content',
                  contexts: ['https://www.w3.org/ns/credentials/v2']
                }
              ],
              count: 1
            })
          } as Response)
        }
        
        if (url === '/api/vc/create-template') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              template: {
                "@context": [
                  "https://www.w3.org/ns/credentials/v2",
                  "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
                ],
                "type": ["VerifiableCredential", "ContentAuthenticityCredential"],
                "issuer": "did:example:issuer123",
                "validFrom": "2025-06-28T03:34:36.007Z",
                "validUntil": "2026-06-28T03:34:36.010Z",
                "credentialSubject": {
                  "id": "did:example:subject456",
                  "contentHash": "sha256:abc123",
                  "contentUrl": "https://example.com/content.jpg",
                  "contentType": "image/jpeg"
                }
              },
              schemaId: "ContentAuthenticityCredential"
            })
          } as Response)
        }
        
        return Promise.reject(new Error('Unknown URL'))
      })

      renderWithProviders(<VerifiableCredentials />)
      
      // Navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Create Template'))
      
      // Fill in required fields
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Content Authenticity Credential'))
      
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      // Enter "{}" in subject field
      const subjectInput = screen.getByLabelText('Credential Subject (JSON)')
      await user.clear(subjectInput)
      await user.type(subjectInput, '{}')
      
      // Generate template
      const generateButton = screen.getByText('Generate Template')
      await user.click(generateButton)
      
      // Verify API call was made without subject (frontend should detect empty object)
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/vc/create-template', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schemaId: 'ContentAuthenticityCredential',
            issuer: 'did:example:issuer123',
            subject: undefined
          })
        })
      })
    })

    it('should populate subject field after template generation', async () => {
      const user = userEvent.setup()
      
      const generatedCredentialSubject = {
        id: "did:example:subject456",
        name: "John Doe",
        birthDate: "1990-01-01",
        email: "john@example.com"
      }
      
      // Mock create-template response
      mockFetch.mockImplementation((url) => {
        if (url === '/api/vc/schemas') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              schemas: [
                {
                  id: 'PersonCredential',
                  title: 'Person Credential',
                  description: 'A credential for person identity',
                  category: 'Identity',
                  contexts: ['https://www.w3.org/ns/credentials/v2']
                }
              ],
              count: 1
            })
          } as Response)
        }
        
        if (url === '/api/vc/create-template') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              template: {
                "@context": [
                  "https://www.w3.org/ns/credentials/v2",
                  "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
                ],
                "type": ["VerifiableCredential", "PersonCredential"],
                "issuer": "did:example:issuer123",
                "validFrom": "2025-06-28T03:34:36.007Z",
                "validUntil": "2026-06-28T03:34:36.010Z",
                "credentialSubject": generatedCredentialSubject
              },
              schemaId: "PersonCredential"
            })
          } as Response)
        }
        
        return Promise.reject(new Error('Unknown URL'))
      })

      renderWithProviders(<VerifiableCredentials />)
      
      // Navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Create Template'))
      
      // Fill in required fields
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Person Credential'))
      
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      // Generate template
      const generateButton = screen.getByText('Generate Template')
      await user.click(generateButton)
      
      // Verify that the subject field gets populated with the generated credential subject
      await waitFor(() => {
        const subjectInput = screen.getByLabelText('Credential Subject (JSON)') as HTMLTextAreaElement
        const expectedSubjectText = JSON.stringify(generatedCredentialSubject, null, 2)
        expect(subjectInput.value).toBe(expectedSubjectText)
      })
    })

    it('should handle invalid JSON in subject field gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock console.warn to verify it's called
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      // Mock create-template response
      mockFetch.mockImplementation((url) => {
        if (url === '/api/vc/schemas') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              schemas: [
                {
                  id: 'PersonCredential',
                  title: 'Person Credential',
                  description: 'A credential for person identity',
                  category: 'Identity',
                  contexts: ['https://www.w3.org/ns/credentials/v2']
                }
              ],
              count: 1
            })
          } as Response)
        }
        
        if (url === '/api/vc/create-template') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              template: {
                "@context": [
                  "https://www.w3.org/ns/credentials/v2",
                  "https://schemas.originvault.box/contexts/trust-chain-core.jsonld"
                ],
                "type": ["VerifiableCredential", "PersonCredential"],
                "issuer": "did:example:issuer123",
                "validFrom": "2025-06-28T03:34:36.007Z",
                "validUntil": "2026-06-28T03:34:36.010Z",
                "credentialSubject": {
                  "id": "did:example:subject456",
                  "name": "John Doe"
                }
              },
              schemaId: "PersonCredential"
            })
          } as Response)
        }
        
        return Promise.reject(new Error('Unknown URL'))
      })

      renderWithProviders(<VerifiableCredentials />)
      
      // Navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Create Template'))
      
      // Fill in required fields
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Person Credential'))
      
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      // Enter invalid JSON in subject field
      const subjectInput = screen.getByLabelText('Credential Subject (JSON)')
      await user.clear(subjectInput)
      await user.type(subjectInput, '{ invalid json }')
      
      // Generate template
      const generateButton = screen.getByText('Generate Template')
      await user.click(generateButton)
      
      // Verify that invalid JSON is handled gracefully (no subject sent to API)
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/vc/create-template', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schemaId: 'PersonCredential',
            issuer: 'did:example:issuer123',
            subject: undefined
          })
        })
      })
      
      // Verify console.warn was called
      expect(consoleSpy).toHaveBeenCalledWith('Invalid JSON in subject field, using generated template instead')
      
      consoleSpy.mockRestore()
    })
  })

  describe('UI State Management', () => {
    it('should disable generate button when required fields are missing', async () => {
      renderWithProviders(<VerifiableCredentials />)
      
      // Navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      const user = userEvent.setup()
      await user.click(screen.getByText('Create Template'))
      
      // Initially, generate button should be disabled
      const generateButton = screen.getByText('Generate Template')
      expect(generateButton).toBeDisabled()
      
      // Fill only schema, button should still be disabled
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Person Credential'))
      
      expect(generateButton).toBeDisabled()
      
      // Fill issuer, button should now be enabled
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      expect(generateButton).not.toBeDisabled()
    })

    it('should show loading state during template generation', async () => {
      const user = userEvent.setup()
      
      // Mock a delayed response
      mockFetch.mockImplementation((url) => {
        if (url === '/api/vc/schemas') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              schemas: [
                {
                  id: 'PersonCredential',
                  title: 'Person Credential',
                  description: 'A credential for person identity',
                  category: 'Identity',
                  contexts: ['https://www.w3.org/ns/credentials/v2']
                }
              ],
              count: 1
            })
          } as Response)
        }
        
        if (url === '/api/vc/create-template') {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => Promise.resolve({
                  template: {
                    "@context": ["https://www.w3.org/ns/credentials/v2"],
                    "type": ["VerifiableCredential", "PersonCredential"],
                    "issuer": "did:example:issuer123",
                    "credentialSubject": { "id": "did:example:subject456" }
                  },
                  schemaId: "PersonCredential"
                })
              } as Response)
            }, 100)
          })
        }
        
        return Promise.reject(new Error('Unknown URL'))
      })

      renderWithProviders(<VerifiableCredentials />)
      
      // Navigate to create template tab
      await waitFor(() => {
        expect(screen.getByText('Create Template')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Create Template'))
      
      // Fill in required fields
      const schemaSelect = screen.getByLabelText('Credential Schema *')
      await user.click(schemaSelect)
      await user.click(screen.getByText('Person Credential'))
      
      const issuerInput = screen.getByLabelText('Issuer DID *')
      await user.type(issuerInput, 'did:example:issuer123')
      
      // Click generate button
      const generateButton = screen.getByText('Generate Template')
      await user.click(generateButton)
      
      // Should show loading state (button disabled)
      expect(generateButton).toBeDisabled()
      
      // Wait for template generation to complete
      await waitFor(() => {
        expect(generateButton).not.toBeDisabled()
      }, { timeout: 200 })
    })
  })
}) 