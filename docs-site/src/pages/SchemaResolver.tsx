import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Stack
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  GetApp as DownloadIcon,
  Code as CodeIcon,
  Schema as SchemaIcon
} from '@mui/icons-material'
import CodeEditor from '../components/CodeEditor'
// import { schemaService } from '../services/schemaService'

interface SchemaData {
  content: any
  metadata: {
    name: string
    file: string
    description?: string
    $id?: string
    $schema?: string
    title?: string
    version?: string
  }
  githubUrl: string
  rawUrl: string
}

const SchemaResolver: React.FC = () => {
  const { schemaPath } = useParams<{ schemaPath: string }>()
  const navigate = useNavigate()
  // const theme = useTheme()
  
  const [schema, setSchema] = useState<SchemaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSchema = async () => {
      if (!schemaPath) {
        setError('No schema path provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        // Decode the schema path
        const decodedPath = decodeURIComponent(schemaPath)
        
        // Generate GitHub URLs - fetch directly from raw.githubusercontent.com
        const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/schemas/v1/${decodedPath}`
        const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/schemas/v1/${decodedPath}`
        
        // Fetch the schema content
        const response = await fetch(rawUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`)
        }
        
        const responseText = await response.text()
        
        // Check if we got HTML instead of JSON (common when server misconfiguration)
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          throw new Error('Received HTML instead of JSON. Schema file may not exist at the specified path.')
        }
        
        let content
        try {
          content = JSON.parse(responseText)
        } catch (parseError) {
          throw new Error(`Invalid JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`)
        }
        
        // Extract metadata from the schema
        const metadata = {
          name: content.title || decodedPath.split('/').pop()?.replace('.schema.json', '') || 'Unknown',
          file: decodedPath,
          description: content.description,
          $id: content.$id,
          $schema: content.$schema,
          title: content.title,
          version: content.version
        }
        
        setSchema({
          content,
          metadata,
          githubUrl,
          rawUrl
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load schema')
      } finally {
        setLoading(false)
      }
    }

    loadSchema()
  }, [schemaPath])

  const handleDownload = () => {
    if (!schema) return
    
    const blob = new Blob([JSON.stringify(schema.content, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = schema.metadata.file
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/schemas')}
          variant="outlined"
        >
          Back to Schema Explorer
        </Button>
      </Container>
    )
  }

  if (!schema) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Schema not found
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/schemas')}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to Schema Explorer
        </Button>
        
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <SchemaIcon color="primary" />
          <Typography variant="h4" component="h1">
            {schema.metadata.name}
          </Typography>
        </Box>
        
        {schema.metadata.description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {schema.metadata.description}
          </Typography>
        )}
        
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {schema.metadata.$schema && (
            <Chip label={`Schema: ${schema.metadata.$schema}`} size="small" />
          )}
          {schema.metadata.version && (
            <Chip label={`Version: ${schema.metadata.version}`} size="small" />
          )}
          <Chip label={schema.metadata.file} size="small" variant="outlined" />
        </Stack>
      </Box>

      {/* Actions */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            variant="contained"
          >
            Download Schema
          </Button>
          <Button
            startIcon={<CodeIcon />}
            href={schema.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            View on GitHub
          </Button>
        </Stack>
      </Box>

      {/* Schema Content */}
      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Schema Definition</Typography>
        </Box>
        <CodeEditor
          value={JSON.stringify(schema.content, null, 2)}
          language="json"
          readonly
          height="600px"
        />
      </Paper>

      {/* Metadata */}
      {schema.metadata.$id && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Schema Metadata
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Schema ID:</strong> {schema.metadata.$id}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>File Path:</strong> {schema.metadata.file}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Raw URL:</strong>{' '}
              <a href={schema.rawUrl} target="_blank" rel="noopener noreferrer">
                {schema.rawUrl}
              </a>
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default SchemaResolver 