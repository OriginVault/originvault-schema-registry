import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CodeEditor from '../components/CodeEditor'

// Mock Monaco Editor with a more realistic mock
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ value, onChange, language, options, height }) => (
    <div data-testid="monaco-editor">
      <div data-testid="editor-language">{language}</div>
      <div data-testid="editor-readonly">{options?.readOnly ? 'readonly' : 'editable'}</div>
      <div data-testid="editor-height">{height}</div>
      {!options?.readOnly ? (
        <textarea
          data-testid="editor-textarea"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={options?.readOnly}
        />
      ) : (
        <pre data-testid="editor-content">{value}</pre>
      )}
    </div>
  ))
}))

describe('CodeEditor', () => {
  it('should render with default props', () => {
    render(<CodeEditor value="console.log('hello')" language="typescript" />)
    
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument()
    expect(screen.getByTestId('editor-language')).toHaveTextContent('typescript')
    expect(screen.getByTestId('editor-readonly')).toHaveTextContent('editable')
  })

  it('should render with custom language', () => {
    render(<CodeEditor value="print('hello')" language="python" />)
    
    expect(screen.getByTestId('editor-language')).toHaveTextContent('python')
  })

  it('should render as readonly', () => {
    render(<CodeEditor value="const x = 1" language="typescript" readonly />)
    
    // In readonly mode, it should render a simple pre element instead of Monaco
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
    expect(screen.queryByTestId('editor-textarea')).not.toBeInTheDocument()
  })

  it('should render with custom height', () => {
    render(<CodeEditor value="const x = 1" language="typescript" height="500px" />)
    
    // The height gets passed to Monaco which shows the actual height value
    expect(screen.getByTestId('editor-height')).toHaveTextContent('500px')
  })

  it('should call onChange when value changes', () => {
    const mockOnChange = vi.fn()
    render(<CodeEditor value="const x = 1" language="typescript" onChange={mockOnChange} />)
    
    const textarea = screen.getByTestId('editor-textarea')
    fireEvent.change(textarea, { target: { value: 'const y = 2' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('const y = 2')
  })

  it('should not call onChange when readonly', () => {
    const mockOnChange = vi.fn()
    render(<CodeEditor value="const x = 1" language="typescript" onChange={mockOnChange} readonly />)
    
    // Should use pre element, not textarea in readonly mode
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
    expect(screen.queryByTestId('editor-textarea')).not.toBeInTheDocument()
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should handle JSON language', () => {
    render(<CodeEditor value='{"test": true}' language="json" />)
    
    expect(screen.getByTestId('editor-language')).toHaveTextContent('json')
  })

  it('should handle empty value', () => {
    render(<CodeEditor value="" language="typescript" />)
    
    expect(screen.getByTestId('editor-textarea')).toHaveValue('')
  })

  it('should handle all supported languages', () => {
    const languages = ['typescript', 'python', 'go', 'csharp', 'java', 'rust']
    
    languages.forEach((lang) => {
      const { unmount } = render(<CodeEditor value="test" language={lang} />)
      expect(screen.getByTestId('editor-language')).toHaveTextContent(lang)
      unmount() // Clean up before next iteration
    })
  })

  it('should show loading state', () => {
    render(<CodeEditor value="test" language="typescript" loading />)
    
    // Look for CircularProgress instead of text
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should show title when provided', () => {
    render(<CodeEditor value="test" language="typescript" title="My Code" />)
    
    expect(screen.getByText('My Code')).toBeInTheDocument()
  })
}) 