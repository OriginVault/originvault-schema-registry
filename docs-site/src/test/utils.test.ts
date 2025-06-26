import { describe, it, expect } from 'vitest'

// Utility functions for testing
const formatSchemaName = (name: string): string => {
  return name.replace(/([A-Z])/g, ' $1').trim()
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

describe('Utility Functions', () => {
  describe('formatSchemaName', () => {
    it('should format camelCase to space-separated words', () => {
      expect(formatSchemaName('PersonCredential')).toBe('Person Credential')
      expect(formatSchemaName('BusinessWorkflow')).toBe('Business Workflow')
      expect(formatSchemaName('ContractCredential')).toBe('Contract Credential')
    })

    it('should handle single words', () => {
      expect(formatSchemaName('Person')).toBe('Person')
      expect(formatSchemaName('Contract')).toBe('Contract')
    })

    it('should handle empty strings', () => {
      expect(formatSchemaName('')).toBe('')
    })

    it('should handle multiple consecutive capitals', () => {
      expect(formatSchemaName('XMLHttpRequest')).toBe('X M L Http Request')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('test+tag@example.org')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('test@example')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(validateEmail('test@example.')).toBe(false)
      expect(validateEmail('test @example.com')).toBe(false)
      expect(validateEmail('test@ex ample.com')).toBe(false)
    })
  })

  describe('debounce', () => {
    it('should delay function execution', (done) => {
      let called = false
      const debouncedFn = debounce(() => {
        called = true
      }, 100)

      debouncedFn()
      expect(called).toBe(false)

      setTimeout(() => {
        expect(called).toBe(true)
        done()
      }, 150)
    })

    it('should cancel previous calls', (done) => {
      let callCount = 0
      const debouncedFn = debounce(() => {
        callCount++
      }, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      setTimeout(() => {
        expect(callCount).toBe(1)
        done()
      }, 150)
    })

    it('should pass arguments correctly', (done) => {
      let receivedArgs: any[] = []
      const debouncedFn = debounce((...args: any[]) => {
        receivedArgs = args
      }, 50)

      debouncedFn('test', 123, { key: 'value' })

      setTimeout(() => {
        expect(receivedArgs).toEqual(['test', 123, { key: 'value' }])
        done()
      }, 100)
    })
  })

  describe('capitalizeFirst', () => {
    it('should capitalize the first letter', () => {
      expect(capitalizeFirst('hello')).toBe('Hello')
      expect(capitalizeFirst('world')).toBe('World')
      expect(capitalizeFirst('test')).toBe('Test')
    })

    it('should handle single characters', () => {
      expect(capitalizeFirst('a')).toBe('A')
      expect(capitalizeFirst('z')).toBe('Z')
    })

    it('should handle empty strings', () => {
      expect(capitalizeFirst('')).toBe('')
    })

    it('should not change already capitalized strings', () => {
      expect(capitalizeFirst('Hello')).toBe('Hello')
      expect(capitalizeFirst('HELLO')).toBe('HELLO')
    })

    it('should handle numbers and special characters', () => {
      expect(capitalizeFirst('123test')).toBe('123test')
      expect(capitalizeFirst('!hello')).toBe('!hello')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 20)).toBe('This is a very long ...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 20)).toBe('Short text')
    })

    it('should handle exact length match', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe('Exactly twenty chars')
    })

    it('should handle empty strings', () => {
      expect(truncateText('', 10)).toBe('')
    })

    it('should handle zero length', () => {
      expect(truncateText('test', 0)).toBe('...')
    })

    it('should handle negative length', () => {
      expect(truncateText('test', -5)).toBe('...')
    })
  })

  describe('Error Handling', () => {
    it('should handle null inputs gracefully', () => {
      expect(() => formatSchemaName(null as any)).not.toThrow()
      expect(() => validateEmail(null as any)).not.toThrow()
      expect(() => capitalizeFirst(null as any)).not.toThrow()
      expect(() => truncateText(null as any, 10)).not.toThrow()
    })

    it('should handle undefined inputs gracefully', () => {
      expect(() => formatSchemaName(undefined as any)).not.toThrow()
      expect(() => validateEmail(undefined as any)).not.toThrow()
      expect(() => capitalizeFirst(undefined as any)).not.toThrow()
      expect(() => truncateText(undefined as any, 10)).not.toThrow()
    })
  })
}) 