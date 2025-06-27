import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Button,
  Stack,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material'
import {
  Search as SearchIcon,
  GetApp as DownloadIcon,
  Code as CodeIcon,
  Schema as SchemaIcon,
  PlayArrow as ValidateIcon,
  AutoFixHigh as GenerateIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Link as LinkIcon
} from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import SocialShare from '../components/SocialShare'
import { schemaService, Schema } from '../services/schemaService'
import { useFullscreen } from '../App'
import { generateSchemaResolverUrl } from '../utils/urlUtils'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`schema-tabpanel-${index}`}
      aria-labelledby={`schema-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>{children}</Box>}
    </div>
  )
}

const SchemaExplorer: React.FC = () => {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [filteredSchemas, setFilteredSchemas] = useState<Schema[]>([])
  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState('typescript')
  const [codeLoading, setCodeLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ id: string; name: string; description: string; count: number }[]>([])
  const [languages, setLanguages] = useState<{ id: string; name: string }[]>([])
  
  // Dynamic type generation state
  const [schemaInput, setSchemaInput] = useState<string>('{}')
  const [dynamicTypes, setDynamicTypes] = useState<string>('')
  const [dynamicLoading, setDynamicLoading] = useState(false)

  // Validation state
  const [jsonExample, setJsonExample] = useState('')
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null)
  const [showValidation, setShowValidation] = useState(false)

  // Fullscreen state from context
  const { isFullscreen, setIsFullscreen } = useFullscreen()
  const theme = useTheme()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Fullscreen toggle functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(err => {
        console.error('Error entering fullscreen:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch(err => {
        console.error('Error exiting fullscreen:', err)
      })
    }
  }

  // Initialize state from URL parameters
  const initializeFromURL = (schemasArray: Schema[]) => {
    const schemaId = searchParams.get('schema')
    const tab = parseInt(searchParams.get('tab') || '0')
    const lang = searchParams.get('language') || 'typescript'
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''
    const validation = searchParams.get('validation') === 'true'
    
    setTabValue(tab)
    setSelectedLanguage(lang)
    setSelectedCategory(category)
    setSearchTerm(search)
    setShowValidation(validation)
    
    // Find and select schema if specified in URL
    if (schemaId && schemasArray.length > 0) {
      const schema = schemasArray.find(s => s.id === schemaId)
      if (schema) {
        handleSchemaSelect(schema)
      }
    }
  }
  
  // Update URL when state changes
  const updateURL = (updates: Record<string, string | number | boolean | null>) => {
    const newParams = new URLSearchParams(searchParams)
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 0 || value === false || value === 'all' || value === 'typescript') {
        newParams.delete(key)
      } else {
        newParams.set(key, String(value))
      }
    })
    
    navigate(`?${newParams.toString()}`, { replace: true })
  }

  // Load schemas and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load the registry from GitHub
        const registry = await schemaService.loadSchemas()
        
        // Convert registry to schema array
        const schemasArray: Schema[] = []
        const categoriesArray: { id: string; name: string; description: string; count: number }[] = []
        
        // Validate that registry exists
        if (!registry) {
          throw new Error('Invalid schema registry: missing registry data')
        }
        
        // Handle both old categories structure and new flat schemas array
        if (registry.categories && typeof registry.categories === 'object') {
          // Process old categories structure
          for (const [categoryId, category] of Object.entries(registry.categories)) {
            // Validate category structure
            if (!category || typeof category !== 'object' || !Array.isArray(category.schemas)) {
              console.warn(`Invalid category structure for ${categoryId}:`, category)
              continue
            }
            
            categoriesArray.push({
              id: categoryId,
              name: category.name || categoryId,
              description: category.description || '',
              count: category.schemas.length
            })
            
            for (const schema of category.schemas) {
              // Validate schema structure
              if (!schema || typeof schema !== 'object' || !schema.name) {
                console.warn(`Invalid schema structure in category ${categoryId}:`, schema)
                continue
              }
              
              schemasArray.push({
                id: schema.name,
                title: schema.name,
                description: schema.description || '',
                category: categoryId,
                content: null,
                metadata: schema,
                examples: schema.example ? [schema.example] : []
              })
            }
          }
        } else if (registry.schemas && Array.isArray(registry.schemas)) {
          // Process new flat schemas array structure
          // Create a default category for all schemas
          categoriesArray.push({
            id: 'all',
            name: 'All Schemas',
            description: 'All available OriginVault schemas',
            count: registry.schemas.length
          })
          
          for (const schema of registry.schemas) {
            // Validate schema structure
            if (!schema || typeof schema !== 'object' || !schema.name) {
              console.warn(`Invalid schema structure:`, schema)
              continue
            }
            
            schemasArray.push({
              id: schema.name,
              title: schema.name,
              description: schema.description || '',
              category: 'all',
              content: null,
              metadata: schema,
              examples: schema.example ? [schema.example] : []
            })
          }
        } else {
          throw new Error('Invalid schema registry: missing both categories and schemas arrays')
        }
        
        setSchemas(schemasArray)
        setFilteredSchemas(schemasArray)
        setCategories(categoriesArray)
        setLanguages(schemaService.getLanguages())
        
        // If using flat structure, set default category to 'all'
        if (registry.schemas && Array.isArray(registry.schemas) && !registry.categories) {
          setSelectedCategory('all')
        }
        
        // Initialize from URL after schemas are loaded
        initializeFromURL(schemasArray)
      } catch (err) {
        setError('Failed to load schema data. Please try refreshing the page.')
        console.error('Error loading schemas:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter schemas based on search and category
  useEffect(() => {
    let filtered = schemas

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(schema => schema.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(schema =>
        schema.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schema.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredSchemas(filtered)
  }, [schemas, selectedCategory, searchTerm])

  // Generate code when schema or language changes
  useEffect(() => {
    if (selectedSchema && selectedLanguage) {
      generateCode(selectedSchema, selectedLanguage)
    }
  }, [selectedSchema, selectedLanguage])

  const generateCode = async (schema: Schema, language: string) => {
    try {
      setCodeLoading(true)
      const code = await schemaService.generateQuickTypeCode(schema, language)
      setGeneratedCode(code)
    } catch (err) {
      console.error('Error generating code:', err)
      setGeneratedCode(`// Error generating ${language} code for ${schema.title}\n// Please try again or contact support.`)
    } finally {
      setCodeLoading(false)
    }
  }

  const handleSchemaSelect = async (schema: Schema) => {
    try {
      setLoading(true)
      
      // Load the actual schema content if not already loaded
      if (!schema.content) {
        const schemaContent = await schemaService.loadSchemaFile(schema.metadata.file)
        schema.content = schemaContent
      }
      
      setSelectedSchema(schema)
      setTabValue(0)
      
      // Update URL with selected schema
      updateURL({ schema: schema.id, tab: 0 })
      
      // Also update the dynamic type generator with this schema
      if (schema.content) {
        setSchemaInput(JSON.stringify(schema.content, null, 2))
        await generateTypesFromSchema(schema.content)
      }
    } catch (error) {
      console.error('Error loading schema content:', error)
      setError('Failed to load schema content')
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setShowValidation(false) // Close validation when switching tabs
    updateURL({ tab: newValue, validation: false })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    updateURL({ search: value })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL({ category })
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    updateURL({ language })
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedSchema?.id}-${selectedLanguage}.${getFileExtension(selectedLanguage)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (language: string): string => {
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
    return extensions[language] || 'txt'
  }

  // Dynamic type generation functions
  const generateTypesFromSchema = async (schema: any) => {
    setDynamicLoading(true)
    try {
      const generatedTypes = generateBasicTypesFromSchema(schema)
      setDynamicTypes(generatedTypes)
    } catch (error) {
      console.error('Failed to generate types:', error)
      setDynamicTypes(`// Error generating types: ${(error as Error).message}\n\n// Please check your JSON Schema format.`)
    } finally {
      setDynamicLoading(false)
    }
  }

  const generateBasicTypesFromSchema = (schema: any): string => {
    if (!schema || typeof schema !== 'object') {
      return '// Invalid schema provided'
    }

    const typeName = schema.title || 'GeneratedType'
    const interfaceName = typeName.replace(/[^a-zA-Z0-9]/g, '')
    
    let types = `/**
 * Generated TypeScript types from JSON Schema
 * Generated on: ${new Date().toISOString()}
 * Schema: ${schema.$id || 'Unknown'}
 */

export interface ${interfaceName} {
`

    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties as any)) {
        const propType = getTypeScriptType(propSchema as any)
        const isRequired = schema.required?.includes(propName) ? '' : '?'
        types += `  ${propName}${isRequired}: ${propType};\n`
      }
    }

    types += `}

// Type guard function
export function is${interfaceName}(data: unknown): data is ${interfaceName} {
  return typeof data === 'object' && data !== null;
}

// Validation function
export function validate${interfaceName}(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!is${interfaceName}(data)) {
    errors.push('Invalid data structure');
    return { valid: false, errors };
  }
  
  // Add validation logic here based on your schema
  ${schema.required ? schema.required.map((req: string) => 
    `if (!data.${req}) errors.push('Missing required property: ${req}');`
  ).join('\n  ') : ''}
  
  return { valid: errors.length === 0, errors };
}
`

    return types
  }

  const getTypeScriptType = (propSchema: any): string => {
    if (!propSchema || typeof propSchema !== 'object') {
      return 'any'
    }

    const type = propSchema.type
    const format = propSchema.format
    const enumValues = propSchema.enum
    const items = propSchema.items

    if (enumValues && Array.isArray(enumValues)) {
      return enumValues.map((v: any) => `"${v}"`).join(' | ')
    }

    if (type === 'array' && items) {
      const itemType = getTypeScriptType(items)
      return `${itemType}[]`
    }

    if (type === 'object' && propSchema.properties) {
      return 'object' // Simplified for demo
    }

    switch (type) {
      case 'string':
        if (format === 'email') return 'string'
        if (format === 'date-time') return 'string'
        if (format === 'date') return 'string'
        return 'string'
      case 'number':
      case 'integer':
        return 'number'
      case 'boolean':
        return 'boolean'
      case 'null':
        return 'null'
      case 'array':
        return 'any[]'
      case 'object':
        return 'object'
      default:
        return 'any'
    }
  }

  const handleSchemaChange = async (newSchema: string) => {
    setSchemaInput(newSchema)
    try {
      const parsedSchema = JSON.parse(newSchema)
      await generateTypesFromSchema(parsedSchema)
    } catch (error) {
      setDynamicTypes('// Invalid JSON Schema\n// Please check your syntax.')
    }
  }

  const validateExample = () => {
    try {
      const example = JSON.parse(jsonExample)
      const schema = JSON.parse(schemaInput)
      // Simple validation - in a real app you'd use a proper JSON Schema validator
      const errors: string[] = []
      
      if (schema.required) {
        for (const req of schema.required) {
          if (!(req in example)) {
            errors.push(`Missing required property: ${req}`)
          }
        }
      }
      
      setValidationResult({ valid: errors.length === 0, errors })
    } catch (error) {
      setValidationResult({ 
        valid: false, 
        errors: ['Invalid JSON format or schema'] 
      })
    }
  }

  const generateExampleFromSchema = (schema: any): any => {
    if (!schema || typeof schema !== 'object') {
      return {}
    }

    // Handle different schema types
    if (schema.type === 'object' && schema.properties) {
      const example: any = {}
      
      // Generate examples for each property
      for (const [propName, propSchema] of Object.entries(schema.properties as any)) {
        example[propName] = generateValueFromProperty(propSchema as any)
      }
      
      return example
    }
    
    // If not an object schema, generate based on root type
    return generateValueFromProperty(schema)
  }

  const generateValueFromProperty = (propSchema: any): any => {
    if (!propSchema) return null

    // Handle enum values
    if (propSchema.enum && Array.isArray(propSchema.enum)) {
      return propSchema.enum[0]
    }

    // Handle examples if provided
    if (propSchema.example !== undefined) {
      return propSchema.example
    }

    // Generate based on type
    switch (propSchema.type) {
      case 'string':
        if (propSchema.format === 'email') return 'user@example.com'
        if (propSchema.format === 'date-time') return new Date().toISOString()
        if (propSchema.format === 'date') return new Date().toISOString().split('T')[0]
        if (propSchema.format === 'uri') return 'https://example.com'
        return propSchema.title ? `Example ${propSchema.title}` : 'example string'
        
      case 'number':
      case 'integer':
        return propSchema.minimum || 42
        
      case 'boolean':
        return true
        
      case 'array':
        if (propSchema.items) {
          return [generateValueFromProperty(propSchema.items)]
        }
        return []
        
      case 'object':
        if (propSchema.properties) {
          const nestedExample: any = {}
          for (const [key, value] of Object.entries(propSchema.properties as any)) {
            nestedExample[key] = generateValueFromProperty(value as any)
          }
          return nestedExample
        }
        return {}
        
      case 'null':
        return null
        
      default:
        return 'example value'
    }
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          {error}
          <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      </Container>
    )
  }

  const mainContent = (
    <Box sx={{ 
      ...(isFullscreen ? { 
        height: '100vh', 
        width: '100vw', 
        overflow: 'auto',
        bgcolor: 'background.default'
      } : { 
        py: 4 
      })
    }}>
      {/* Main App Header - Clean and separated */}
      <Box sx={{ mb: 4, ...(isFullscreen && { p: 2, mb: 2 }) }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              OriginVault Schema Explorer & Type Generator
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover JSON Schemas used in OV and generate TypeScript types instantly
            </Typography>
          </Box>
          
          {/* Social share and fullscreen controls in main header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {selectedSchema && (
              <SocialShare 
                title={`${selectedSchema.title} - OriginVault Schema Registry`}
                description={selectedSchema.description}
              />
            )}
            <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
              <IconButton onClick={toggleFullscreen} size="small">
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Global toolbar for validation and tools */}
        {selectedSchema && tabValue === 2 && (
          <Paper variant="outlined" sx={{ 
            p: 2, 
            mb: 2, 
            bgcolor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" component="h2" color="text.primary" fontFamily="Thiccboi">
                  Schema Testing Tools
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Button
                  variant={showValidation ? "contained" : "outlined"}
                  startIcon={<ValidateIcon />}
                  onClick={() => {
                    const newValue = !showValidation
                    setShowValidation(newValue)
                    updateURL({ validation: newValue })
                  }}
                  size="small"
                  sx={{ fontFamily: 'Thiccboi' }}
                >
                  Test Data Validation
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CodeIcon />}
                  onClick={() => navigator.clipboard.writeText(dynamicTypes)}
                  disabled={!dynamicTypes || dynamicTypes.includes('Error') || dynamicTypes.includes('Invalid')}
                  sx={{ fontFamily: 'Thiccboi' }}
                >
                  Copy Types
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(schemaInput);
                      setSchemaInput(JSON.stringify(parsed, null, 2));
                    } catch (e) {
                      // Format button does nothing if invalid JSON
                    }
                  }}
                  disabled={!schemaInput}
                  sx={{ fontFamily: 'Thiccboi' }}
                >
                  Format JSON
                </Button>
              </Stack>
            </Box>
          </Paper>
        )}
      </Box>
      
      <Grid container spacing={3} sx={{ 
        ...(isFullscreen && { 
          minHeight: 'calc(100vh - 200px)', 
          m: 0,
          p: 2
        })
      }}>
        {/* Schema List Panel - Fixed height with proper scrolling */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            height: isFullscreen ? '100%' : '700px', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            {/* Fixed header */}
            <Box sx={{ 
              p: 3, 
              borderBottom: 1, 
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.background.paper,
              flexShrink: 0,
              fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
            }}>
              <Typography variant="h6" fontWeight="medium" gutterBottom color="text.primary" fontFamily="Thiccboi">
                Schema Library
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Search schemas..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                size="small"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'Thiccboi',
                    bgcolor: theme.palette.background.default,
                  }
                }}
              />
              
              {/* Category chips properly constrained within panel */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="All"
                  color={selectedCategory === 'all' ? 'primary' : 'default'}
                  onClick={() => handleCategoryChange('all')}
                  size="small"
                  sx={{ fontFamily: 'Thiccboi' }}
                />
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={`${category.name} (${category.count})`}
                    color={selectedCategory === category.id ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange(category.id)}
                    size="small"
                    sx={{ fontFamily: 'Thiccboi' }}
                  />
                ))}
              </Box>
            </Box>
            
            {/* Scrollable list */}
            <List sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              p: 0,
              bgcolor: theme.palette.background.default,
            }}>
              {filteredSchemas.map((schema) => (
                <ListItem key={schema.id} disablePadding>
                  <ListItemButton
                    selected={selectedSchema?.id === schema.id}
                    onClick={() => handleSchemaSelect(schema)}
                    sx={{ 
                      px: 3, 
                      py: 2,
                      fontFamily: 'Thiccboi',
                      '&.Mui-selected': {
                        bgcolor: theme.palette.primary.main + '20',
                        '&:hover': {
                          bgcolor: theme.palette.primary.main + '30',
                        }
                      }
                    }}
                  >
                    <ListItemText
                      primary={schema.title}
                      secondary={schema.description}
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        fontWeight: 'medium',
                        fontFamily: 'Thiccboi',
                        color: 'text.primary'
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'caption',
                        fontFamily: 'Thiccboi',
                        color: 'text.secondary'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content Panel - Fixed height with proper structure */}
        <Grid item xs={12} lg={8}>
          {selectedSchema ? (
            <Paper sx={{ 
              height: isFullscreen ? '100%' : '700px', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              {/* Fixed header with schema info */}
              <Box sx={{ 
                p: 3, 
                borderBottom: 1, 
                borderColor: theme.palette.divider,
                bgcolor: theme.palette.background.paper,
                flexShrink: 0,
                fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
                      {selectedSchema.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontFamily="Thiccboi" sx={{ mb: 1 }}>
                      {selectedSchema.description}
                    </Typography>
                    
                    {/* Resolver URLs info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="text.secondary" fontFamily="Thiccboi">
                        Direct URLs:
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<LinkIcon />}
                        onClick={() => {
                          const resolverUrl = generateSchemaResolverUrl(selectedSchema.metadata.file)
                          navigator.clipboard.writeText(`${window.location.origin}${resolverUrl}`)
                        }}
                        sx={{ 
                          fontFamily: 'Thiccboi',
                          fontSize: '0.75rem',
                          minWidth: 'auto',
                          p: 0.5
                        }}
                      >
                        Copy Schema URL
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={selectedSchema.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ fontFamily: 'Thiccboi' }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Tab navigation */}
              <Box sx={{ 
                borderBottom: 1, 
                borderColor: theme.palette.divider, 
                flexShrink: 0,
                bgcolor: theme.palette.background.paper,
              }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 3 }}>
                  <Tab label="JSON Schema" sx={{ fontFamily: 'Thiccboi' }} />
                  <Tab label="Generated Code" sx={{ fontFamily: 'Thiccboi' }} />
                  <Tab label="Dynamic Generator" sx={{ fontFamily: 'Thiccboi' }} />
                </Tabs>
              </Box>

              {/* Tab content with fixed height and proper scrolling */}
              <Box sx={{ 
                flexGrow: 1, 
                overflow: isFullscreen ? 'auto' : 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                ...(isFullscreen && { maxHeight: 'calc(100vh - 300px)' })
              }}>
                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ flexGrow: 1, p: 3, minHeight: 0 }}>
                    <Paper variant="outlined" sx={{ 
                      height: '100%', 
                      overflow: isFullscreen ? 'auto' : 'hidden',
                      position: 'relative',
                      borderColor: theme.palette.divider,
                      '& > div': { height: '100% !important' }
                    }}>
                      <CodeEditor
                        value={selectedSchema?.content ? JSON.stringify(selectedSchema?.content, null, 2) : '{}'}
                        language="json"
                        readonly
                        height="100%"
                        title="JSON Schema Definition"
                      />
                    </Paper>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {/* Language selection toolbar */}
                  <Box sx={{ 
                    p: 3, 
                    pb: 2, 
                    borderBottom: 1, 
                    borderColor: theme.palette.divider, 
                    flexShrink: 0,
                    bgcolor: theme.palette.background.paper,
                  }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mr: 1 }} color="text.primary" fontFamily="Thiccboi">Language:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {languages.map((language) => (
                          <Chip
                            key={language.id}
                            label={language.name}
                            color={selectedLanguage === language.id ? 'primary' : 'default'}
                            onClick={() => handleLanguageChange(language.id)}
                            size="small"
                            sx={{ fontFamily: 'Thiccboi' }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CodeIcon />}
                        onClick={handleCopyCode}
                        sx={{ fontFamily: 'Thiccboi' }}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadCode}
                        sx={{ fontFamily: 'Thiccboi' }}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                  
                  {/* Code editor with proper height and scrolling */}
                  <Box sx={{ flexGrow: 1, p: 3, pt: 2, minHeight: 0 }}>
                    <Paper variant="outlined" sx={{ 
                      height: '100%', 
                      overflow: isFullscreen ? 'auto' : 'hidden',
                      position: 'relative',
                      borderColor: theme.palette.divider,
                      '& > div': { height: '100% !important' }
                    }}>
                      <CodeEditor
                        value={generatedCode}
                        language={selectedLanguage}
                        readonly
                        height="100%"
                        loading={codeLoading}
                        title={`Generated ${languages.find(l => l.id === selectedLanguage)?.name || 'Code'}`}
                      />
                    </Paper>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {/* Validation section - only shown when expanded */}
                    {showValidation && (
                      <Paper variant="outlined" sx={{ 
                        p: 2, 
                        mb: 2, 
                        bgcolor: theme.palette.background.paper,
                        borderColor: theme.palette.divider,
                        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
                      }}>
                        <Typography variant="h6" gutterBottom color="text.primary" fontFamily="Thiccboi">
                          Test Data Validation
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={8}>
                            <TextField
                              fullWidth
                              label="Test JSON Data"
                              multiline
                              rows={4}
                              placeholder='{"id": "test", "name": "Example", "email": "test@example.com"}'
                              value={jsonExample}
                              onChange={(e) => setJsonExample(e.target.value)}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                '& .MuiOutlinedInput-root': {
                                  fontFamily: 'Thiccboi',
                                  bgcolor: theme.palette.background.default,
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                              <Button 
                                variant="contained" 
                                fullWidth
                                size="small"
                                startIcon={<ValidateIcon />}
                                onClick={validateExample}
                                disabled={!schemaInput.trim() || !jsonExample.trim()}
                                sx={{ fontFamily: 'Thiccboi' }}
                              >
                                Validate Data
                              </Button>
                              <Button
                                variant="outlined"
                                fullWidth
                                size="small"
                                startIcon={<GenerateIcon />}
                                onClick={() => {
                                  try {
                                    const schema = JSON.parse(schemaInput);
                                    const example = generateExampleFromSchema(schema);
                                    setJsonExample(JSON.stringify(example, null, 2));
                                  } catch (e) {
                                    console.warn('Cannot generate example from invalid schema');
                                  }
                                }}
                                disabled={!schemaInput.trim()}
                                sx={{ fontFamily: 'Thiccboi' }}
                              >
                                Generate Example
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                        
                        {/* Validation results */}
                        {validationResult && (
                          <Box sx={{ mt: 2 }}>
                            {validationResult.valid ? (
                              <Alert severity="success" onClose={() => setValidationResult(null)}>
                                ✅ Valid JSON data for this schema
                              </Alert>
                            ) : (
                              <Alert severity="error" onClose={() => setValidationResult(null)}>
                                <Box>
                                  <Typography variant="subtitle2" fontFamily="Thiccboi">Validation Errors:</Typography>
                                  <ul style={{ margin: '8px 0', paddingLeft: '20px', fontFamily: 'Thiccboi' }}>
                                    {validationResult.errors.map((error, index) => (
                                      <li key={index}>{error}</li>
                                    ))}
                                  </ul>
                                </Box>
                              </Alert>
                            )}
                          </Box>
                        )}
                      </Paper>
                    )}
                    
                    {/* Main editor area with proper height calculations and scrolling */}
                    <Box sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      minHeight: 0,
                      height: showValidation ? 'calc(100% - 280px)' : '100%',
                      overflow: isFullscreen ? 'auto' : 'hidden'
                    }}>
                      <Grid container spacing={2} sx={{ 
                        height: '100%', 
                        overflow: isFullscreen ? 'visible' : 'hidden',
                        ...(isFullscreen && { minHeight: '600px' })
                      }}>
                        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Paper variant="outlined" sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            overflow: isFullscreen ? 'auto' : 'hidden',
                            minHeight: 0,
                            borderColor: theme.palette.divider,
                          }}>
                            <Box sx={{ 
                              px: 2, py: 1.5, 
                              bgcolor: theme.palette.background.paper, 
                              borderBottom: 1, 
                              borderColor: theme.palette.divider,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexShrink: 0,
                              fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
                            }}>
                              <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
                                JSON Schema Input
                              </Typography>
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                  try {
                                    JSON.parse(schemaInput);
                                    setValidationResult({ valid: true, errors: [] });
                                    setTimeout(() => setValidationResult(null), 2000);
                                  } catch (e) {
                                    setValidationResult({ 
                                      valid: false, 
                                      errors: [`JSON Parse Error: ${(e as Error).message}`] 
                                    });
                                  }
                                }}
                                disabled={!schemaInput.trim()}
                                sx={{ fontFamily: 'Thiccboi' }}
                              >
                                Validate
                              </Button>
                            </Box>
                            <Box sx={{ 
                              flexGrow: 1, 
                              minHeight: 0,
                              position: 'relative',
                              '& > div': { height: '100% !important' }
                            }}>
                              <CodeEditor
                                value={schemaInput}
                                language="json"
                                onChange={handleSchemaChange}
                                height="100%"
                              />
                            </Box>
                          </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Paper variant="outlined" sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            overflow: isFullscreen ? 'auto' : 'hidden',
                            minHeight: 0,
                            borderColor: theme.palette.divider,
                          }}>
                            <Box sx={{ 
                              px: 2, py: 1.5, 
                              bgcolor: theme.palette.background.paper, 
                              borderBottom: 1, 
                              borderColor: theme.palette.divider,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexShrink: 0,
                              fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
                            }}>
                              <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
                                Generated TypeScript
                              </Typography>
                              {dynamicLoading && (
                                <CircularProgress size={16} />
                              )}
                            </Box>
                            <Box sx={{ 
                              flexGrow: 1, 
                              minHeight: 0,
                              position: 'relative',
                              '& > div': { height: '100% !important' }
                            }}>
                              <CodeEditor
                                value={dynamicTypes || '// Enter a valid JSON Schema to see generated types here...'}
                                language="typescript"
                                readonly
                                height="100%"
                                loading={dynamicLoading}
                              />
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </TabPanel>
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ 
              height: isFullscreen ? '100%' : '700px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
            }}>
              <Box textAlign="center" sx={{ maxWidth: 400, px: 4 }}>
                <SchemaIcon sx={{ fontSize: 96, color: 'primary.main', mb: 3, opacity: 0.7 }} />
                <Typography variant="h5" color="text.primary" gutterBottom fontWeight="medium" fontFamily="Thiccboi">
                  Select a Schema to Get Started
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph fontFamily="Thiccboi">
                  Choose a schema from the library to explore its structure, generate TypeScript types, 
                  and test with sample data.
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily="Thiccboi">
                  💡 Use the search bar or category filters to find the schema you need
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  )

  return mainContent
}

export default SchemaExplorer