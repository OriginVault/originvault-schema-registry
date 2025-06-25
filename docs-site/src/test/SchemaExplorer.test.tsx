import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SchemaExplorer from '../pages/SchemaExplorer'

// Mock QuickType
const mockQuicktype = vi.fn()

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => ({
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
    
    // Mock successful schema loading
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        schemas: [
          { name: 'TestSchema', category: 'test', path: '/test/schema.json' }
        ]
      }),
      text: async () => global.testUtils.mockSchemaContent
    })

    // Mock successful type generation
    mockQuicktype.mockResolvedValue({
      lines: ['export interface TestSchema {', '  id: string;', '  name: string;', '}']
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Check main heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Schema Explorer')).toBeInTheDocument()
      
      // Check search input
      const searchInput = screen.getByLabelText('Search schemas')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('placeholder', 'Search schemas...')
      
      // Check language selector
      const languageSelect = screen.getByLabelText('Select programming language')
      expect(languageSelect).toBeInTheDocument()
      
      // Check generate button
      const generateButton = screen.getByLabelText('Generate types')
      expect(generateButton).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Tab through interactive elements
      const searchInput = screen.getByLabelText('Search schemas')
      const languageSelect = screen.getByLabelText('Select programming language')
      const generateButton = screen.getByLabelText('Generate types')
      
      searchInput.focus()
      expect(searchInput).toHaveFocus()
      
      fireEvent.keyDown(searchInput, { key: 'Tab' })
      expect(languageSelect).toHaveFocus()
      
      fireEvent.keyDown(languageSelect, { key: 'Tab' })
      expect(generateButton).toHaveFocus()
    })

    it('should announce loading states', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Mock loading state
      mockQuicktype.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      const generateButton = screen.getByLabelText('Generate types')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument()
      })
    })
  })

  describe('Schema Loading', () => {
    it('should load schemas on mount', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/schemas')
      })
    })

    it('should handle schema loading errors gracefully', async () => {
      ;(global.fetch as any).mockRejectedValue(new Error('Network error'))
      
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
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
        expect(global.fetch).toHaveBeenCalledWith('/test/schema.json')
      })
    })

    it('should handle schema content loading errors', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Schema not found'))
      
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Failed to load schema/)).toBeInTheDocument()
      })
    })
  })

  describe('Type Generation', () => {
    it('should generate types when language is changed', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema first
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('monaco-editor')).toBeInTheDocument()
      })
      
      // Change language
      const languageSelect = screen.getByLabelText('Select programming language')
      fireEvent.change(languageSelect, { target: { value: 'python' } })
      
      await waitFor(() => {
        expect(mockQuicktype).toHaveBeenCalledWith(
          expect.objectContaining({
            lang: 'python'
          })
        )
      })
    })

    it('should handle type generation errors', async () => {
      mockQuicktype.mockRejectedValue(new Error('Invalid schema'))
      
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema first
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Type generation failed/)).toBeInTheDocument()
      })
    })

    it('should show loading state during generation', async () => {
      mockQuicktype.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema first
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument()
      })
    })
  })

  describe('User Interactions', () => {
    it('should filter schemas by search term', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const searchInput = screen.getByLabelText('Search schemas')
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
      
      await waitFor(() => {
        expect(screen.queryByText('TestSchema')).not.toBeInTheDocument()
      })
    })

    it('should copy generated code to clipboard', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema and generate types
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText('Copy generated code to clipboard')).toBeInTheDocument()
      })
      
      const copyButton = screen.getByLabelText('Copy generated code to clipboard')
      fireEvent.click(copyButton)
      
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })

    it('should download generated code', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema and generate types
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText('Download generated code')).toBeInTheDocument()
      })
      
      const downloadButton = screen.getByLabelText('Download generated code')
      fireEvent.click(downloadButton)
      
      expect(global.URL.createObjectURL).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should display error messages in accessible format', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Schema not found'))
      
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        const errorAlert = screen.getByRole('alert')
        expect(errorAlert).toBeInTheDocument()
        expect(errorAlert).toHaveTextContent(/Failed to load schema/)
      })
    })

    it('should clear errors when new schema is loaded', async () => {
      // First load fails
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Schema not found'))
      
      renderWithRouter(<SchemaExplorer />)
      
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
      
      // Second load succeeds
      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        text: async () => global.testUtils.mockSchemaContent
      })
      
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('should debounce search input', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      const searchInput = screen.getByLabelText('Search schemas')
      
      // Rapid typing
      fireEvent.change(searchInput, { target: { value: 't' } })
      fireEvent.change(searchInput, { target: { value: 'te' } })
      fireEvent.change(searchInput, { target: { value: 'tes' } })
      fireEvent.change(searchInput, { target: { value: 'test' } })
      
      await waitFor(() => {
        expect(searchInput).toHaveValue('test')
      })
    })

    it('should not regenerate types unnecessarily', async () => {
      renderWithRouter(<SchemaExplorer />)
      
      // Load a schema
      await waitFor(() => {
        expect(screen.getByText('TestSchema')).toBeInTheDocument()
      })
      
      const schemaButton = screen.getByText('TestSchema')
      fireEvent.click(schemaButton)
      
      await waitFor(() => {
        expect(mockQuicktype).toHaveBeenCalledTimes(1)
      })
      
      // Click generate button again
      const generateButton = screen.getByLabelText('Generate types')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        expect(mockQuicktype).toHaveBeenCalledTimes(2)
      })
    })
  })
}) 