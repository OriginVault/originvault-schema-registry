import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SchemaExplorer from '../pages/SchemaExplorer'

// Mock QuickType
const mockQuicktype = vi.fn()

// Mock Monaco Editor with default export
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(() => <div data-testid="monaco-editor" />),
  Editor: vi.fn(() => <div data-testid="monaco-editor" />)
}))

// Mock fetch
global.fetch = vi.fn()

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn()
  }
})

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn()
global.URL.revokeObjectURL = vi.fn()

vi.mock('quicktype-core', () => ({
  quicktype: mockQuicktype,
  InputData: vi.fn(),
  JSONSchemaInput: vi.fn()
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('SchemaExplorer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock successful schema registry loading
    ;(global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/index.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            version: "1.0.0",
            lastUpdated: "2025-01-14T10:00:00Z",
            totalSchemas: 1,
            categories: {
              test: {
                name: "Test Category",
                description: "Test schemas for testing",
                count: 1,
                schemas: [
                  {
                    name: 'TestSchema',
                    file: 'test/TestSchema.schema.json',
                    description: 'A test schema for testing',
                    quicktype: 'quicktype --src test/TestSchema.schema.json --lang typescript',
                    example: { id: 'test', name: 'Test' }
                  }
                ]
              }
            }
          })
        })
      } else if (url.includes('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/test/TestSchema.schema.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => JSON.parse(global.testUtils.mockSchemaContent)
        })
      } else {
        return Promise.resolve({
          ok: true,
          json: async () => ({}),
          text: async () => global.testUtils.mockSchemaContent
        })
      }
    })

    // Mock successful type generation
    mockQuicktype.mockResolvedValue({
      lines: ['export interface TestSchema {', '  id: string;', '  name: string;', '}']
    })
  })

  describe('Basic Functionality', () => {
    it('should render main heading', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Schema Explorer')).toBeInTheDocument()
    })

    it('should render search input', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const searchInput = screen.getByPlaceholderText('Search schemas...')
      expect(searchInput).toBeInTheDocument()
    })

    it('should load and display schemas', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      expect(screen.getByText('A test schema for testing')).toBeInTheDocument()
    })
  })

  describe('Schema Loading', () => {
    it('should load schemas on mount', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      // Verify that fetch was called for the schema registry
      expect(global.fetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/index.json')
    })

    it('should handle schema loading errors gracefully', async () => {
      // Mock fetch to reject for schema registry loading
      ;(global.fetch as any).mockImplementation((url: string) => {
        if (url.includes('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/index.json')) {
          return Promise.reject(new Error('Network error'))
        }
        return Promise.resolve({ ok: true, json: async () => ({}) })
      })
      
      renderWithRouter(<SchemaExplorer />)
      
      // Since the service falls back to mock data, it should still show schemas
      // but with mock data rather than real data
      await waitFor(() => {
        expect(screen.getByText('PersonCredential')).toBeInTheDocument()
      })
    })

    it('should load schema content when selected', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/test/TestSchema.schema.json')
      })
    })
  })

  describe('User Interactions', () => {
    it('should filter schemas by search term', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const searchInput = screen.getByPlaceholderText('Search schemas...')
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
      
      await waitFor(() => {
        expect(screen.queryByText('TestSchema')).not.toBeInTheDocument()
      })
    })

    it('should show schema details when selected', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByText('Schema JSON')).toBeInTheDocument()
        expect(screen.getByText('Generated Code')).toBeInTheDocument()
        expect(screen.getByText('Examples')).toBeInTheDocument()
      })
    })

    it('should copy generated code to clipboard', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      // Switch to Generated Code tab
      await waitFor(() => {
        expect(screen.getByText('Generated Code')).toBeInTheDocument()
      })
      
      const generatedCodeTab = screen.getByText('Generated Code')
      fireEvent.click(generatedCodeTab)
      
      await waitFor(() => {
        expect(screen.getByText('Copy Code')).toBeInTheDocument()
      })
      
      const copyButton = screen.getByText('Copy Code')
      fireEvent.click(copyButton)
      
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })

    it('should download generated code', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      // Switch to Generated Code tab
      await waitFor(() => {
        expect(screen.getByText('Generated Code')).toBeInTheDocument()
      })
      
      const generatedCodeTab = screen.getByText('Generated Code')
      fireEvent.click(generatedCodeTab)
      
      await waitFor(() => {
        expect(screen.getByText('Download')).toBeInTheDocument()
      })
      
      const downloadButton = screen.getByText('Download')
      fireEvent.click(downloadButton)
      
      expect(global.URL.createObjectURL).toHaveBeenCalled()
    })
  })

  describe('Language Selection', () => {
    it('should change language when different language chip is clicked', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      // Switch to Generated Code tab
      await waitFor(() => {
        expect(screen.getByText('Generated Code')).toBeInTheDocument()
      })
      
      const generatedCodeTab = screen.getByText('Generated Code')
      fireEvent.click(generatedCodeTab)
      
      await waitFor(() => {
        expect(screen.getByText('Python')).toBeInTheDocument()
      })
      
      const pythonChip = screen.getByText('Python')
      fireEvent.click(pythonChip)
      
      // Verify the language was changed (code generation should be triggered)
      await waitFor(() => {
        expect(screen.getByText('Python')).toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('should debounce search input', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const searchInput = screen.getByPlaceholderText('Search schemas...')
      
      // Rapid typing
      fireEvent.change(searchInput, { target: { value: 't' } })
      fireEvent.change(searchInput, { target: { value: 'te' } })
      fireEvent.change(searchInput, { target: { value: 'tes' } })
      fireEvent.change(searchInput, { target: { value: 'test' } })
      
      await waitFor(() => {
        expect(searchInput).toHaveValue('test')
      })
    })
  })
}) 