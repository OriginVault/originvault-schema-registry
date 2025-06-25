import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => ({
  Editor: vi.fn(() => null)
}))

// Mock QuickType
vi.mock('quicktype-core', () => ({
  quicktype: vi.fn(),
  InputData: vi.fn(),
  JSONSchemaInput: vi.fn(),
  TypeScriptTargetLanguage: vi.fn()
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

// Custom matchers
expect.extend({
  toBeAccessible(received) {
    const pass = received && typeof received === 'object' && 'role' in received
    return {
      pass,
      message: () => `expected element to be accessible with ARIA attributes`
    }
  }
})

export {};

declare global {
  // eslint-disable-next-line no-var
  var testUtils: {
    mockSchema: any;
    mockSchemaContent: string;
    mockGeneratedCode: string;
  };
}

// Global test utilities
global.testUtils = {
  mockSchema: {
    name: 'TestSchema',
    category: 'test',
    path: '/test/schema.json'
  },
  mockSchemaContent: JSON.stringify({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' }
    },
    required: ['id', 'name']
  }),
  mockGeneratedCode: `export interface TestSchema {
  id: string;
  name: string;
}`
} 