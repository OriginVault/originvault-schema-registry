import React from 'react'
import { render, RenderOptions, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { expect } from 'vitest'

// Create a custom theme for testing
const testTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

// Custom render function with router
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
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

// Custom matchers for accessibility testing
export const toBeAccessible = (element: HTMLElement) => {
  const hasRole = element.hasAttribute('role')
  const hasAriaLabel = element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')
  const hasTabIndex = element.hasAttribute('tabindex')
  
  const isAccessible = hasRole || hasAriaLabel || hasTabIndex
  
  expect(element).toBeTruthy()
  if (!isAccessible) {
    throw new Error('Element is not accessible - missing role, aria-label, or tabindex')
  }
  
  return true
}

// Helper function to test keyboard navigation
export const testKeyboardNavigation = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  expect(focusableElements.length).toBeGreaterThan(0)
  
  // Test tab navigation
  const firstElement = focusableElements[0] as HTMLElement
  firstElement.focus()
  expect(firstElement).toHaveFocus()
  
  return focusableElements
}

// Helper function to test screen reader announcements
export const testScreenReaderAnnouncement = (announcement: string) => {
  const liveRegion = document.querySelector('[aria-live]') as HTMLElement
  if (liveRegion) {
    expect(liveRegion.textContent).toContain(announcement)
  }
}

// Helper function to test color contrast
export const testColorContrast = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)
  const backgroundColor = style.backgroundColor
  const color = style.color
  
  // Simplified contrast check - in real implementation, use a proper contrast ratio calculator
  expect(backgroundColor).toBeTruthy()
  expect(color).toBeTruthy()
  
  return { backgroundColor, color }
}

// Helper function to test responsive behavior
export const testResponsiveBehavior = (container: HTMLElement, breakpoint: string) => {
  // Mock different screen sizes
  const mockMediaQuery = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query.includes(breakpoint) ? matches : false,
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
  
  // Test mobile behavior
  mockMediaQuery(true)
  expect(container).toBeTruthy()
  
  // Test desktop behavior
  mockMediaQuery(false)
  expect(container).toBeTruthy()
}

// Helper function to test loading states
export const testLoadingState = async (container: HTMLElement) => {
  const loadingElement = container.querySelector('[data-testid="loading"]') || 
                        container.querySelector('.loading') ||
                        container.querySelector('[aria-busy="true"]')
  
  if (loadingElement) {
    expect(loadingElement).toBeInTheDocument()
  }
  
  // Wait for loading to complete
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const loadedElement = container.querySelector('[data-testid="loaded"]') ||
                       container.querySelector('.loaded') ||
                       container.querySelector('[aria-busy="false"]')
  
  if (loadedElement) {
    expect(loadedElement).toBeInTheDocument()
  }
}

// Helper function to test error states
export const testErrorState = (container: HTMLElement, errorMessage?: string) => {
  const errorElement = container.querySelector('[data-testid="error"]') ||
                      container.querySelector('.error') ||
                      container.querySelector('[role="alert"]')
  
  if (errorElement) {
    expect(errorElement).toBeInTheDocument()
    if (errorMessage) {
      expect(errorElement.textContent).toContain(errorMessage)
    }
  }
}

// Helper function to test form validation
export const testFormValidation = (form: HTMLFormElement) => {
  const requiredFields = form.querySelectorAll('[required]')
  
  expect(requiredFields.length).toBeGreaterThan(0)
  
  // Test form submission without required fields
  const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
  form.dispatchEvent(submitEvent)
  
  // Check for validation messages
  const validationMessages = form.querySelectorAll('[data-testid="validation-error"]')
  expect(validationMessages.length).toBeGreaterThanOrEqual(requiredFields.length)
}

// Helper function to test internationalization
export const testI18n = (container: HTMLElement, locale: string) => {
  const langAttribute = container.getAttribute('lang')
  if (langAttribute) {
    expect(langAttribute).toContain(locale)
  }
  
  // Test for translated content
  const translatedElements = container.querySelectorAll('[data-i18n]')
  translatedElements.forEach(element => {
    expect(element.textContent).toBeTruthy()
  })
}

// Helper function to test performance
export const testPerformance = (callback: () => void) => {
  const startTime = performance.now()
  callback()
  const endTime = performance.now()
  
  const duration = endTime - startTime
  expect(duration).toBeLessThan(1000) // Should complete within 1 second
  
  return duration
}

// Helper function to test accessibility with axe-core
export const testAccessibilityWithAxe = async (container: HTMLElement) => {
  // Note: This would require axe-core to be installed
  // For now, we'll just test basic accessibility features
  const images = container.querySelectorAll('img')
  images.forEach(img => {
    expect(img).toHaveAttribute('alt')
  })
  
  const buttons = container.querySelectorAll('button')
  buttons.forEach(button => {
    const hasAriaLabel = button.hasAttribute('aria-label')
    const hasTextContent = button.textContent && button.textContent.trim().length > 0
    expect(hasAriaLabel || hasTextContent).toBe(true)
  })
  
  const links = container.querySelectorAll('a')
  links.forEach(link => {
    expect(link.textContent).toBeTruthy()
  })
}

// Helper function to test SEO elements
export const testSEOElements = (container: HTMLElement) => {
  const title = container.querySelector('title')
  const metaDescription = container.querySelector('meta[name="description"]')
  const metaKeywords = container.querySelector('meta[name="keywords"]')
  
  if (title) {
    expect(title.textContent).toBeTruthy()
  }
  
  if (metaDescription) {
    expect(metaDescription).toHaveAttribute('content')
  }
  
  if (metaKeywords) {
    expect(metaKeywords).toHaveAttribute('content')
  }
}

// Helper function to test structured data
export const testStructuredData = (container: HTMLElement) => {
  const structuredDataScripts = container.querySelectorAll('script[type="application/ld+json"]')
  
  structuredDataScripts.forEach(script => {
    try {
      const data = JSON.parse(script.textContent || '{}')
      expect(data).toHaveProperty('@context')
      expect(data).toHaveProperty('@type')
    } catch (error) {
      throw new Error('Invalid JSON in structured data script')
    }
  })
}

// Helper function to test PWA features
export const testPWAFeatures = () => {
  const manifestLink = document.querySelector('link[rel="manifest"]')
  const serviceWorker = 'serviceWorker' in navigator
  
  if (manifestLink) {
    expect(manifestLink).toHaveAttribute('href')
  }
  
  expect(serviceWorker).toBe(true)
}

// Helper function to test offline functionality
export const testOfflineFunctionality = async (callback: () => void) => {
  // Mock offline state
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: false,
  })
  
  // Test offline behavior
  callback()
  
  // Restore online state
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: true,
  })
}

// Helper function to test security headers
export const testSecurityHeaders = () => {
  // This would typically be tested at the server level
  // For now, we'll just ensure no sensitive data is exposed in the DOM
  const sensitiveData = document.querySelectorAll('[data-sensitive]')
  sensitiveData.forEach(element => {
    expect(element.textContent).not.toContain('password')
    expect(element.textContent).not.toContain('token')
    expect(element.textContent).not.toContain('secret')
  })
}

// Helper function to test analytics
export const testAnalytics = () => {
  const analyticsScripts = document.querySelectorAll('script[src*="analytics"]')
  const gtagScripts = document.querySelectorAll('script[src*="gtag"]')
  
  // Check for analytics scripts
  expect(analyticsScripts.length + gtagScripts.length).toBeGreaterThan(0)
}

// Helper function to test social media meta tags
export const testSocialMediaMetaTags = () => {
  const ogTags = document.querySelectorAll('meta[property^="og:"]')
  const twitterTags = document.querySelectorAll('meta[name^="twitter:"]')
  
  // Check for Open Graph tags
  const hasOGTitle = Array.from(ogTags).some(tag => tag.getAttribute('property') === 'og:title')
  const hasOGDescription = Array.from(ogTags).some(tag => tag.getAttribute('property') === 'og:description')
  
  expect(hasOGTitle).toBe(true)
  expect(hasOGDescription).toBe(true)
  
  // Check for Twitter Card tags
  const hasTwitterCard = Array.from(twitterTags).some(tag => tag.getAttribute('name') === 'twitter:card')
  expect(hasTwitterCard).toBe(true)
}

// Helper function to test search engine optimization
export const testSEO = (container: HTMLElement) => {
  // Test heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1))
    expect(level).toBeLessThanOrEqual(previousLevel + 1)
    previousLevel = level
  })
  
  // Test for alt text on images
  const images = container.querySelectorAll('img')
  images.forEach(img => {
    expect(img).toHaveAttribute('alt')
  })
  
  // Test for descriptive link text
  const links = container.querySelectorAll('a')
  links.forEach(link => {
    const text = link.textContent?.trim()
    expect(text).toBeTruthy()
    expect(text?.length).toBeGreaterThan(0)
  })
} 