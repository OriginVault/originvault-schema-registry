import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { lightTheme, darkTheme } from '../theme'
import App from '../App'
import SchemaExplorer from '../pages/SchemaExplorer'
import CodeEditor from '../components/CodeEditor'
import Footer from '../components/Footer'
import { vi, describe, test, expect, beforeEach } from 'vitest'

// Mock the schema service
vi.mock('../services/schemaService', () => ({
  schemaService: {
    getSchemas: vi.fn().mockResolvedValue([
      {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'identity',
        content: { type: 'object', properties: { name: { type: 'string' } } }
      }
    ]),
    generateTypes: vi.fn().mockResolvedValue('interface TestSchema { name: string; }')
  },
  Schema: vi.fn()
}))

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [new URLSearchParams(), vi.fn()]
  }
})

// Mock fullscreen API
Object.defineProperty(document, 'fullscreenElement', {
  writable: true,
  value: null
})

Object.defineProperty(document, 'exitFullscreen', {
  writable: true,
  value: vi.fn().mockResolvedValue(undefined)
})

Object.defineProperty(document.documentElement, 'requestFullscreen', {
  writable: true,
  value: vi.fn().mockResolvedValue(undefined)
})

const renderWithTheme = (component: React.ReactElement, theme = lightTheme) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  )
}

describe('Dark Mode Theme Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('App Component Theme Toggle', () => {
    test('should render with light theme by default', () => {
      renderWithTheme(<App />)
      
      // Check that the theme toggle shows moon icon (indicating light mode)
      const toggleButton = screen.getByLabelText('Switch to dark mode')
      expect(toggleButton).toBeInTheDocument()
    })

    test('should toggle between light and dark themes', async () => {
      renderWithTheme(<App />)
      
      const toggleButton = screen.getByLabelText('Switch to dark mode')
      
      // Click to switch to dark mode
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
      })
      
      // Verify localStorage was updated
      expect(JSON.parse(localStorage.getItem('darkMode') || 'false')).toBe(true)
    })

    test('should restore theme from localStorage', () => {
      localStorage.setItem('darkMode', 'true')
      renderWithTheme(<App />)
      
      // Should show sun icon (indicating dark mode)
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })
  })

  describe('SchemaExplorer Dark Mode Styling', () => {
    test('should apply dark theme colors to panels', async () => {
      renderWithTheme(<SchemaExplorer />, darkTheme)
      
      await waitFor(() => {
        // Check that schema library panel has dark background
        const schemaPanel = screen.getByText('Schema Library')
        const panelContainer = schemaPanel.closest('.MuiPaper-root')
        expect(panelContainer).toHaveStyle({ backgroundColor: 'rgb(26, 26, 26)' })
      })
    })

    test('should apply dark theme to search input', async () => {
      renderWithTheme(<SchemaExplorer />, darkTheme)
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search schemas...')
        const inputContainer = searchInput.closest('.MuiOutlinedInput-root')
        expect(inputContainer).toHaveStyle({ backgroundColor: 'rgb(42, 42, 42)' })
      })
    })

    test('should apply dark theme to chips', async () => {
      renderWithTheme(<SchemaExplorer />, darkTheme)
      
      await waitFor(() => {
        const allChip = screen.getByText('All')
        expect(allChip).toHaveStyle({ backgroundColor: 'rgb(42, 42, 42)' })
        expect(allChip).toHaveStyle({ color: 'rgb(255, 255, 255)' })
      })
    })

    test('should apply dark theme to tabs', async () => {
      renderWithTheme(<SchemaExplorer />, darkTheme)
      
      await waitFor(() => {
        // Select a schema to show tabs
        const schemaItem = screen.getByText('TestSchema')
        fireEvent.click(schemaItem)
        
        // Check tab styling
        const tabsContainer = screen.getByRole('tablist')
        expect(tabsContainer).toHaveStyle({ backgroundColor: 'rgb(26, 26, 26)' })
      })
    })
  })

  describe('CodeEditor Dark Mode', () => {
    test('should apply dark theme to Monaco editor', () => {
      renderWithTheme(
        <CodeEditor 
          value='{"test": "value"}' 
          language="json" 
          height="400px" 
        />, 
        darkTheme
      )
      
      // Check that the editor container has dark styling
      const editorContainer = screen.getByText('{"test": "value"}').closest('.monaco-editor')
      expect(editorContainer).toBeInTheDocument()
    })

    test('should show dark theme in loading state', () => {
      renderWithTheme(
        <CodeEditor 
          value="" 
          loading={true} 
          height="400px" 
        />, 
        darkTheme
      )
      
      const loadingContainer = screen.getByRole('progressbar').closest('.MuiBox-root')
      expect(loadingContainer).toHaveStyle({ backgroundColor: 'rgb(33, 33, 33)' })
    })

    test('should show dark theme in error state', () => {
      renderWithTheme(
        <CodeEditor 
          value="" 
          height="400px" 
        />, 
        darkTheme
      )
      
      // The error fallback should have dark styling
      const fallbackContainer = screen.getByText('Falling back to simple text display...')
      expect(fallbackContainer).toBeInTheDocument()
    })
  })

  describe('Footer Dark Mode', () => {
    test('should apply dark theme colors', () => {
      renderWithTheme(<Footer isDarkMode={true} />, darkTheme)
      
      const footer = screen.getByText('© 2025 OriginVault, LLC.').closest('.MuiBox-root')
      expect(footer).toHaveStyle({ backgroundColor: 'rgb(26, 26, 26)' })
    })

    test('should apply light theme colors', () => {
      renderWithTheme(<Footer isDarkMode={false} />, lightTheme)
      
      const footer = screen.getByText('© 2025 OriginVault, LLC.').closest('.MuiBox-root')
      expect(footer).toHaveStyle({ backgroundColor: 'rgb(245, 245, 245)' })
    })

    test('should use theme context when isDarkMode prop is not provided', () => {
      renderWithTheme(<Footer />, darkTheme)
      
      const footer = screen.getByText('© 2025 OriginVault, LLC.').closest('.MuiBox-root')
      expect(footer).toHaveStyle({ backgroundColor: 'rgb(26, 26, 26)' })
    })
  })

  describe('Fullscreen Mode with Dark Theme', () => {
    test('should hide header and footer in fullscreen mode', async () => {
      renderWithTheme(<App />, darkTheme)
      
      // Initially header and footer should be visible
      expect(screen.getByText('OriginVault Schema Registry')).toBeInTheDocument()
      expect(screen.getByText('© 2025 OriginVault, LLC.')).toBeInTheDocument()
      
      // Mock fullscreen state
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        value: document.documentElement
      })
      
      // Trigger fullscreen change event
      fireEvent(document, new Event('fullscreenchange'))
      
      await waitFor(() => {
        // Header and footer should be hidden in fullscreen
        expect(screen.queryByText('OriginVault Schema Registry')).not.toBeInTheDocument()
        expect(screen.queryByText('© 2025 OriginVault, LLC.')).not.toBeInTheDocument()
      })
    })

    test('should maintain dark theme in fullscreen mode', async () => {
      localStorage.setItem('darkMode', 'true')
      renderWithTheme(<App />)
      
      // Mock fullscreen state
      Object.defineProperty(document, 'fullscreenElement', {
        writable: true,
        value: document.documentElement
      })
      
      // Trigger fullscreen change event
      fireEvent(document, new Event('fullscreenchange'))
      
      await waitFor(() => {
        // Should still show sun icon (dark mode)
        expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
      })
    })
  })

  describe('Theme Persistence', () => {
    test('should persist theme preference across page reloads', () => {
      localStorage.setItem('darkMode', 'true')
      renderWithTheme(<App />)
      
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })

    test('should default to light mode when no preference is stored', () => {
      localStorage.clear()
      renderWithTheme(<App />)
      
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
    })
  })

  describe('Accessibility in Dark Mode', () => {
    test('should maintain proper contrast ratios', async () => {
      renderWithTheme(<SchemaExplorer />, darkTheme)
      
      await waitFor(() => {
        const title = screen.getByText('Schema Explorer & Type Generator')
        expect(title).toHaveStyle({ color: 'rgb(255, 255, 255)' })
        
        const subtitle = screen.getByText('Discover JSON Schemas and generate TypeScript types instantly')
        expect(subtitle).toHaveStyle({ color: 'rgb(176, 176, 176)' })
      })
    })

    test('should provide proper aria labels for theme toggle', () => {
      renderWithTheme(<App />, lightTheme)
      
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
      
      // Toggle to dark mode
      fireEvent.click(screen.getByLabelText('Switch to dark mode'))
      
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })
  })
}) 