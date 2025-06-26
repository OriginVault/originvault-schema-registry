import { describe, it, expect } from 'vitest'

// Utility functions for testing
export const formatSchemaName = (name: string): string => {
  if (!name || typeof name !== 'string') return ''
  return name.replace(/([A-Z])/g, ' $1').trim()
}

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const debounce = (func: Function, wait: number) => {
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

export const capitalizeFirst = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || typeof text !== 'string') return ''
  if (typeof maxLength !== 'number' || maxLength <= 0) return '...'
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const getCodeExtension = (language: string): string => {
  if (!language || typeof language !== 'string') return 'txt'
  const extensions: { [key: string]: string } = {
    typescript: 'ts',
    javascript: 'js',
    python: 'py',
    go: 'go',
    csharp: 'cs',
    java: 'java',
    kotlin: 'kt',
    swift: 'swift',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    dart: 'dart',
    elm: 'elm',
    json: 'json',
    'json-schema': 'json'
  }
  return extensions[language.toLowerCase()] || 'txt'
}

export const validateJSONSchema = (schema: string): { valid: boolean; errors: string[] } => {
  if (!schema || typeof schema !== 'string') {
    return { valid: false, errors: ['Schema must be a valid string'] }
  }
  
  try {
    const parsed = JSON.parse(schema)
    const errors: string[] = []
    
    // Basic JSON Schema validation
    if (typeof parsed !== 'object' || parsed === null) {
      errors.push('Schema must be an object')
    }
    
    if (!parsed.$schema && !parsed.type && !parsed.properties) {
      errors.push('Schema should have $schema, type, or properties field')
    }
    
    return { valid: errors.length === 0, errors }
  } catch (error) {
    return { valid: false, errors: ['Invalid JSON syntax'] }
  }
}

export const formatSchema = (schema: any): string => {
  if (!schema) return ''
  if (typeof schema === 'string') return schema
  try {
    return JSON.stringify(schema, null, 2)
  } catch (error) {
    return ''
  }
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
    it('should delay function execution', () => {
      return new Promise<void>((resolve) => {
        let called = false
        const debouncedFn = debounce(() => {
          called = true
        }, 100)

        debouncedFn()
        expect(called).toBe(false)

        setTimeout(() => {
          expect(called).toBe(true)
          resolve()
        }, 150)
      })
    })

    it('should cancel previous calls', () => {
      return new Promise<void>((resolve) => {
        let callCount = 0
        const debouncedFn = debounce(() => {
          callCount++
        }, 100)

        debouncedFn()
        debouncedFn()
        debouncedFn()

        setTimeout(() => {
          expect(callCount).toBe(1)
          resolve()
        }, 150)
      })
    })

    it('should pass arguments correctly', () => {
      return new Promise<void>((resolve) => {
        let receivedArgs: any[] = []
        const debouncedFn = debounce((...args: any[]) => {
          receivedArgs = args
        }, 50)

        debouncedFn('test', 123, { key: 'value' })

        setTimeout(() => {
          expect(receivedArgs).toEqual(['test', 123, { key: 'value' }])
          resolve()
        }, 100)
      })
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