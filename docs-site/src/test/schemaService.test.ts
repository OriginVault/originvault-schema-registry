import { describe, it, expect, vi, beforeEach } from 'vitest'
import { schemaService } from '../services/schemaService'

// Mock fetch
global.fetch = vi.fn()

describe('SchemaService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    schemaService.clearCache()
  })

  describe('loadSchemas', () => {
    it('should load schemas from GitHub successfully', async () => {
      const mockRegistry = {
        version: "1.0.0",
        categories: {
          test: {
            name: "Test Category",
            description: "Test schemas",
            count: 1,
            schemas: [
              {
                name: 'TestSchema',
                file: 'test/TestSchema.schema.json',
                description: 'A test schema',
                quicktype: 'quicktype --src test/TestSchema.schema.json --lang typescript',
                example: { id: 'test' }
              }
            ]
          }
        }
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRegistry
      })

      const result = await schemaService.loadSchemas()
      expect(result).toEqual(mockRegistry)
      expect(global.fetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/index.json')
    })

    it('should fallback to actual registry when GitHub fails', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await schemaService.loadSchemas()
      expect(result).toBeDefined()
      expect(result.categories).toBeDefined()
      expect(result.categories.identity).toBeDefined()
    })

    it('should fallback to actual registry when response is not ok', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      const result = await schemaService.loadSchemas()
      expect(result).toBeDefined()
      expect(result.categories).toBeDefined()
    })
  })

  describe('loadSchemaFile', () => {
    it('should load schema file from GitHub', async () => {
      const mockSchema = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSchema
      })

      const result = await schemaService.loadSchemaFile('test/TestSchema.schema.json')
      expect(result).toEqual(mockSchema)
      expect(global.fetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/refs/heads/main/schemas/v1/test/TestSchema.schema.json')
    })

    it('should throw error when schema file load fails', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      await expect(schemaService.loadSchemaFile('nonexistent.json')).rejects.toThrow('Failed to load schema file: Not Found')
    })

    it('should throw error when network request fails', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      await expect(schemaService.loadSchemaFile('test.json')).rejects.toThrow('Network error')
    })
  })

  describe('generateQuickTypeCode', () => {
    it('should generate fallback code for TypeScript', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      const result = await schemaService.generateQuickTypeCode(mockSchema, 'typescript')
      expect(result).toContain('export interface TestSchema')
      expect(result).toContain('TestSchema.schema.json')
    })

    it('should generate fallback code for Python', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      const result = await schemaService.generateQuickTypeCode(mockSchema, 'python')
      expect(result).toContain('@dataclass')
      expect(result).toContain('class TestSchema:')
    })

    it('should generate fallback code for Go', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      const result = await schemaService.generateQuickTypeCode(mockSchema, 'go')
      expect(result).toContain('type TestSchema struct')
    })

    it('should use cache for repeated requests', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      const firstResult = await schemaService.generateQuickTypeCode(mockSchema, 'typescript')
      const secondResult = await schemaService.generateQuickTypeCode(mockSchema, 'typescript')
      
      expect(firstResult).toBe(secondResult)
    })

    it('should handle unknown languages', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      const result = await schemaService.generateQuickTypeCode(mockSchema, 'unknown-language')
      expect(result).toContain('Generated code for TestSchema in unknown-language')
    })
  })

  describe('getLanguages', () => {
    it('should return supported languages', () => {
      const languages = schemaService.getLanguages()
      expect(languages).toHaveLength(6)
      expect(languages).toContainEqual({ id: 'typescript', name: 'TypeScript' })
      expect(languages).toContainEqual({ id: 'python', name: 'Python' })
      expect(languages).toContainEqual({ id: 'go', name: 'Go' })
      expect(languages).toContainEqual({ id: 'csharp', name: 'C#' })
      expect(languages).toContainEqual({ id: 'java', name: 'Java' })
      expect(languages).toContainEqual({ id: 'rust', name: 'Rust' })
    })
  })

  describe('clearCache', () => {
    it('should clear the code generation cache', async () => {
      const mockSchema = {
        id: 'test-schema',
        title: 'TestSchema',
        description: 'A test schema',
        category: 'test',
        content: { type: 'object' },
        metadata: { 
          name: 'TestSchema',
          file: 'test/TestSchema.schema.json',
          description: 'A test schema',
          quicktype: '',
          example: {}
        },
        examples: []
      }

      // Generate code to populate cache
      await schemaService.generateQuickTypeCode(mockSchema, 'typescript')
      
      // Clear cache
      schemaService.clearCache()
      
      // Generate again - should work without errors
      const result = await schemaService.generateQuickTypeCode(mockSchema, 'typescript')
      expect(result).toContain('export interface TestSchema')
    })
  })
}) 