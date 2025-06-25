import React, { useState, useEffect, useCallback } from 'react'
import { Editor } from '@monaco-editor/react'
import { 
  Play, 
  Download, 
  Copy, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  FileCode,
  Languages
} from 'lucide-react'
import { quicktype, InputData, JSONSchemaInput, TypeScriptTargetLanguage } from 'quicktype-core'

const SchemaExplorer = () => {
  const [selectedSchema, setSelectedSchema] = useState(null)
  const [schemaContent, setSchemaContent] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('typescript')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [schemas, setSchemas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const languages = [
    { id: 'typescript', name: 'TypeScript', extension: '.ts' },
    { id: 'python', name: 'Python', extension: '.py' },
    { id: 'go', name: 'Go', extension: '.go' },
    { id: 'csharp', name: 'C#', extension: '.cs' },
    { id: 'java', name: 'Java', extension: '.java' },
    { id: 'rust', name: 'Rust', extension: '.rs' },
    { id: 'swift', name: 'Swift', extension: '.swift' },
    { id: 'kotlin', name: 'Kotlin', extension: '.kt' },
    { id: 'php', name: 'PHP', extension: '.php' },
    { id: 'ruby', name: 'Ruby', extension: '.rb' }
  ]

  // Load schemas on component mount
  useEffect(() => {
    loadSchemas()
  }, [])

  const loadSchemas = async () => {
    try {
      // Load schema index
      const response = await fetch('/api/schemas')
      const schemaIndex = await response.json()
      setSchemas(schemaIndex.schemas || [])
    } catch (error) {
      console.error('Failed to load schemas:', error)
      // Fallback to static schema list
      setSchemas([
        { name: 'ContractCredential', category: 'business', path: '/schemas/v1/business/ContractCredential.schema.json' },
        { name: 'OrganizationCredential', category: 'identity', path: '/schemas/v1/identity/OrganizationCredential.schema.json' },
        { name: 'PersonCredential', category: 'identity', path: '/schemas/v1/identity/PersonCredential.schema.json' },
        { name: 'CreativeWorkCredential', category: 'content', path: '/schemas/v1/content/CreativeWorkCredential.schema.json' },
        { name: 'PaymentCredential', category: 'payments', path: '/schemas/v1/payments/PaymentCredential.schema.json' },
        { name: 'TrustedIssuerCredential', category: 'trust', path: '/schemas/v1/trust/TrustedIssuerCredential.schema.json' },
        { name: 'PluginEndorsementCredential', category: 'platform', path: '/schemas/v1/platform/PluginEndorsementCredential.schema.json' }
      ])
    }
  }

  const loadSchemaContent = async (schema) => {
    try {
      setSelectedSchema(schema)
      setError(null)
      
      // Load schema content
      const response = await fetch(schema.path)
      if (!response.ok) {
        throw new Error(`Failed to load schema: ${response.statusText}`)
      }
      
      const content = await response.text()
      setSchemaContent(content)
      
      // Auto-generate TypeScript types
      await generateTypes(content, 'typescript')
    } catch (error) {
      setError(`Failed to load schema: ${error.message}`)
      console.error('Schema loading error:', error)
    }
  }

  const generateTypes = async (schemaJson, language) => {
    try {
      setIsGenerating(true)
      setError(null)

      // Parse schema JSON
      const schema = JSON.parse(schemaJson)
      
      // Create QuickType input
      const inputData = new InputData()
      const source = { name: selectedSchema?.name || 'schema', schema: JSON.stringify(schema) }
      await inputData.addSource(source, () => new JSONSchemaInput(undefined))

      // Generate types
      const lang = languages.find(l => l.id === language)
      if (!lang) {
        throw new Error(`Unsupported language: ${language}`)
      }

      const result = await quicktype({
        inputData,
        lang: lang.id,
        rendererOptions: {
          'just-types': 'true',
          'prefer-unions': 'true',
          'explicit-unions': 'true'
        }
      })

      setGeneratedCode(result.lines.join('\n'))
    } catch (error) {
      setError(`Type generation failed: ${error.message}`)
      console.error('Type generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLanguageChange = useCallback(async (language) => {
    setSelectedLanguage(language)
    if (schemaContent) {
      await generateTypes(schemaContent, language)
    }
  }, [schemaContent])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show success feedback
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const downloadCode = () => {
    const lang = languages.find(l => l.id === selectedLanguage)
    const filename = `${selectedSchema?.name || 'schema'}${lang?.extension || '.ts'}`
    
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredSchemas = schemas.filter(schema =>
    schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schema.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(schemas.map(s => s.category))]

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schema Explorer</h1>
            <p className="text-gray-600">Interactive schema exploration and type generation</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-gray-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => generateTypes(schemaContent, selectedLanguage)}
              disabled={!schemaContent || isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Schema List */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search schemas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Schema Categories */}
          <div className="flex-1 overflow-y-auto">
            {categories.map(category => {
              const categorySchemas = filteredSchemas.filter(s => s.category === category)
              if (categorySchemas.length === 0) return null

              return (
                <div key={category} className="border-b border-gray-200">
                  <div className="px-4 py-2 bg-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      {category} ({categorySchemas.length})
                    </h3>
                  </div>
                  <div>
                    {categorySchemas.map(schema => (
                      <button
                        key={schema.name}
                        onClick={() => loadSchemaContent(schema)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                          selectedSchema?.name === schema.name ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <FileCode className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{schema.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{schema.category}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Schema Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            {/* Schema JSON */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-gray-200 px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  Schema JSON
                  {selectedSchema && (
                    <span className="ml-2 text-gray-500">- {selectedSchema.name}</span>
                  )}
                </h3>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={schemaContent}
                  onChange={setSchemaContent}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    readOnly: false,
                    automaticLayout: true
                  }}
                  theme="vs-light"
                />
              </div>
            </div>

            {/* Generated Code */}
            <div className="flex-1 flex flex-col border-l border-gray-200">
              <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  Generated {languages.find(l => l.id === selectedLanguage)?.name} Types
                </h3>
                <div className="flex items-center space-x-2">
                  {error && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">Error</span>
                    </div>
                  )}
                  {generatedCode && !error && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Ready</span>
                    </div>
                  )}
                  {generatedCode && (
                    <>
                      <button
                        onClick={() => copyToClipboard(generatedCode)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={downloadCode}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Download code"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={selectedLanguage}
                  value={generatedCode}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    readOnly: true,
                    automaticLayout: true
                  }}
                  theme="vs-light"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-6 py-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SchemaExplorer 