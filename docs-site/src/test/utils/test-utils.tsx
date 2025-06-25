import React from 'react'
import { render, RenderOptions, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Custom render function with router
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Accessibility testing utilities
export const accessibilityTestUtils = {
  // Check if element is focusable
  isFocusable: (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex')
    return tabIndex !== '-1' && !(element as any).disabled
  },

  // Check if element has proper ARIA attributes
  hasAriaAttributes: (element: HTMLElement): boolean => {
    const ariaAttributes = [
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'aria-controls',
      'aria-expanded',
      'aria-current',
      'role'
    ]
    return ariaAttributes.some(attr => element.hasAttribute(attr))
  },

  // Check if element is accessible to screen readers
  isScreenReaderAccessible: (element: HTMLElement): boolean => {
    const computedStyle = window.getComputedStyle(element)
    return computedStyle.display !== 'none' && 
           computedStyle.visibility !== 'hidden' &&
           element.getAttribute('aria-hidden') !== 'true'
  },

  // Validate color contrast (basic check)
  hasGoodContrast: (element: HTMLElement): boolean => {
    const computedStyle = window.getComputedStyle(element)
    const backgroundColor = computedStyle.backgroundColor
    const color = computedStyle.color
    
    // Basic contrast check - in real implementation, you'd use a proper contrast library
    return backgroundColor !== color
  }
}

// Mock data utilities
export const mockData = {
  schemas: [
    {
      name: 'ContractCredential',
      category: 'business',
      path: '/schemas/v1/business/ContractCredential.schema.json'
    },
    {
      name: 'OrganizationCredential',
      category: 'identity',
      path: '/schemas/v1/identity/OrganizationCredential.schema.json'
    },
    {
      name: 'PersonCredential',
      category: 'identity',
      path: '/schemas/v1/identity/PersonCredential.schema.json'
    }
  ],

  schemaContent: JSON.stringify({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' }
    },
    required: ['id', 'name']
  }),

  generatedTypeScript: `export interface TestSchema {
  id: string;
  name: string;
  email?: string;
}`,

  generatedPython: `from typing import Optional

class TestSchema:
    def __init__(self, id: str, name: str, email: Optional[str] = None):
        self.id = id
        self.name = name
        self.email = email`
}

// Mock API responses
export const mockApiResponses = {
  schemas: {
    ok: true,
    json: async () => ({ schemas: mockData.schemas })
  },
  
  schemaContent: {
    ok: true,
    text: async () => mockData.schemaContent
  },
  
  error: {
    ok: false,
    statusText: 'Not Found'
  }
}

// Test setup utilities
export const setupTestEnvironment = () => {
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
  
  // Mock window.matchMedia for responsive testing
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Custom matchers
export const customMatchers = {
  toBeAccessible: (received: HTMLElement) => {
    const pass = accessibilityTestUtils.hasAriaAttributes(received) &&
                 accessibilityTestUtils.isScreenReaderAccessible(received)
    return {
      pass,
      message: () => `expected element to be accessible with proper ARIA attributes and screen reader support`
    }
  },

  toBeFocusable: (received: HTMLElement) => {
    const pass = accessibilityTestUtils.isFocusable(received)
    return {
      pass,
      message: () => `expected element to be focusable`
    }
  },

  toHaveGoodContrast: (received: HTMLElement) => {
    const pass = accessibilityTestUtils.hasGoodContrast(received)
    return {
      pass,
      message: () => `expected element to have good color contrast`
    }
  }
}

// Test helpers
export const testHelpers = {
  // Wait for element to be removed
  waitForElementToBeRemoved: async (element: HTMLElement) => {
    return new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        if (!document.contains(element)) {
          observer.disconnect()
          resolve()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    })
  },

  // Simulate user typing
  typeInElement: (element: HTMLElement, text: string) => {
    fireEvent.focus(element)
    fireEvent.change(element, { target: { value: text } })
    fireEvent.blur(element)
  },

  // Simulate keyboard navigation
  navigateWithKeyboard: (elements: HTMLElement[]) => {
    elements.forEach((element, index) => {
      if (index === 0) {
        element.focus()
      } else {
        fireEvent.keyDown(elements[index - 1], { key: 'Tab' })
        expect(element).toHaveFocus()
      }
    })
  },

  // Mock QuickType response
  mockQuickTypeResponse: (_: string, code: string) => {
    return {
      lines: code.split('\n')
    }
  }
}

// Re-export everything from testing library
export * from '@testing-library/react'
export { customRender as render } 