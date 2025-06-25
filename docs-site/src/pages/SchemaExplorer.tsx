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
  Card,
  CardContent
} from '@mui/material'
import CodeEditor from '../components/CodeEditor'
import { schemaService, Schema } from '../services/schemaService'

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
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  // Load schemas and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [schemasData, categoriesData, languagesData] = await Promise.all([
          schemaService.loadSchemas(),
          Promise.resolve(schemaService.getCategories()),
          Promise.resolve(schemaService.getLanguages())
        ])
        
        setSchemas(schemasData)
        setFilteredSchemas(schemasData)
        setCategories(categoriesData)
        setLanguages(languagesData)
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
        schema.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schema.metadata.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSchemaSelect = (schema: Schema) => {
    setSelectedSchema(schema)
    setTabValue(0)
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
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
      python: 'py',
      go: 'go',
      csharp: 'cs',
      java: 'java',
      rust: 'rs'
    }
    return extensions[language] || 'txt'
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Schema Explorer
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Browse {schemas.length} production-ready schemas, view JSON content, and generate type-safe code with QuickType integration
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Schema List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '70vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Search and Categories */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                placeholder="Search schemas..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.secondary' }}>🔍</Box>
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={`All (${schemas.length})`}
                  size="small"
                  variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                  onClick={() => handleCategoryChange('all')}
                  clickable
                />
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={`${category.name} (${category.count})`}
                    size="small"
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                    onClick={() => handleCategoryChange(category.id)}
                    clickable
                  />
                ))}
              </Stack>
            </Box>

            {/* Schema List */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <List>
                {filteredSchemas.map((schema) => (
                  <ListItem key={schema.id} disablePadding>
                    <ListItemButton
                      selected={selectedSchema?.id === schema.id}
                      onClick={() => handleSchemaSelect(schema)}
                      sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}
                    >
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <ListItemText
                          primary={schema.title}
                          secondary={schema.description}
                          primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
                          secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                        />
                        <Chip
                          label={schema.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ ml: 1, flexShrink: 0 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label="JSON Schema"
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                        <Chip
                          label="QuickType"
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                        {schema.examples.length > 0 && (
                          <Chip
                            label={`${schema.examples.length} examples`}
                            size="small"
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              
              {filteredSchemas.length === 0 && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box component="span" sx={{ fontSize: 48, color: 'grey.400', mb: 2, display: 'block' }}>🔍</Box>
                  <Typography color="text.secondary">
                    No schemas found matching your criteria
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Schema Content */}
        <Grid item xs={12} md={8}>
          {selectedSchema ? (
            <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Schema JSON" />
                  <Tab label="Generated Code" />
                  <Tab label="Examples" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <CodeEditor
                  value={JSON.stringify(selectedSchema.content, null, 2)}
                  language="json"
                  height="60vh"
                  readOnly={true}
                  title={`${selectedSchema.title} - JSON Schema`}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
                  {/* Language Selector */}
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {languages.map((language) => (
                        <Chip
                          key={language.id}
                          label={language.name}
                          size="small"
                          variant={selectedLanguage === language.id ? 'filled' : 'outlined'}
                          onClick={() => handleLanguageChange(language.id)}
                          clickable
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Code Actions */}
                  <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      onClick={handleCopyCode}
                      variant="outlined"
                    >
                      Copy Code
                    </Button>
                    <Button
                      size="small"
                      onClick={handleDownloadCode}
                      variant="outlined"
                    >
                      Download
                    </Button>
                  </Box>

                  {/* Code Display */}
                  <Box sx={{ flexGrow: 1 }}>
                    <CodeEditor
                      value={generatedCode}
                      language={selectedLanguage}
                      height="100%"
                      readOnly={true}
                      loading={codeLoading}
                      title={`${selectedSchema.title} - ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Types`}
                    />
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ height: '60vh', overflow: 'auto' }}>
                  {selectedSchema.examples.length > 0 ? (
                    <Stack spacing={2}>
                      {selectedSchema.examples.map((example: any, index: number) => (
                        <Card key={index} variant="outlined">
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Example {index + 1}
                            </Typography>
                            <CodeEditor
                              value={JSON.stringify(example, null, 2)}
                              language="json"
                              height="300px"
                              readOnly={true}
                              title="Example Data"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Box component="span" sx={{ fontSize: 48, color: 'grey.400', mb: 2, display: 'block' }}>📄</Box>
                      <Typography color="text.secondary">
                        No examples available for this schema
                      </Typography>
                    </Box>
                  )}
                </Box>
              </TabPanel>
            </Paper>
          ) : (
            <Paper sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box component="span" sx={{ fontSize: 64, color: 'grey.400', mb: 2, display: 'block' }}>💻</Box>
                <Typography variant="h6" color="text.secondary">
                  Select a schema to explore
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose a schema from the list to view its JSON content, test the form, or generate code
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SchemaExplorer 