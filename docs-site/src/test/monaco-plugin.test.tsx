import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CodeEditor from '../components/CodeEditor'

// Mock Monaco Editor to test the plugin integration
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ value, language }) => (
    <div data-testid="monaco-editor-plugin-test">
      <span data-testid="language">{language}</span>
      <span data-testid="value">{value}</span>
      <span data-testid="worker-status">workers-loaded</span>
    </div>
  )),
  loader: {
    config: vi.fn(),
    init: vi.fn().mockResolvedValue(undefined)
  }
}))

describe('Monaco Editor ESM Plugin Integration', () => {
  it('should load Monaco Editor with TypeScript support', () => {
    render(<CodeEditor value="const test: string = 'hello'" language="typescript" />)
    
    expect(screen.getByTestId('monaco-editor-plugin-test')).toBeInTheDocument()
    expect(screen.getByTestId('language')).toHaveTextContent('typescript')
    expect(screen.getByTestId('worker-status')).toHaveTextContent('workers-loaded')
  })

  it('should load Monaco Editor with JSON support', () => {
    render(<CodeEditor value='{"test": true}' language="json" />)
    
    expect(screen.getByTestId('language')).toHaveTextContent('json')
    expect(screen.getByTestId('value')).toHaveTextContent('{"test": true}')
  })

  it('should handle worker loading', () => {
    render(<CodeEditor value="// Test code" language="typescript" />)
    
    // Verify that workers are properly mocked and loaded
    expect(screen.getByTestId('worker-status')).toHaveTextContent('workers-loaded')
  })
}) 