import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Stack,
  useTheme
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  GetApp as DownloadIcon,
  Code as CodeIcon,
  Schema as SchemaIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material'
import CodeEditor from '../components/CodeEditor'
import { schemaService } from '../services/schemaService'

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
  const { schemaPath, schemaId } = useParams<{ schemaPath: string; schemaId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  
  const [schemaData, setSchemaData] = useState<SchemaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if we're on the /TrustedIssuer route
    if (location.pathname === '/TrustedIssuer') {
      loadTrustedIssuerSchema()
    } else if (schemaId && !schemaPath) {
      // Handle generic schema ID route
      loadSchemaById(schemaId)
    } else if (!schemaPath) {
      setError('No schema path provided')
      setLoading(false)
    } else {
      loadSchema()
    }
  }, [schemaPath, schemaId, location.pathname])

  const loadTrustedIssuerSchema = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load the TrustedIssuerCredential schema
      const content = await schemaService.loadSchemaFile('trust/TrustedIssuerCredential.schema.json')
      
      // Construct GitHub URLs
      const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/schemas/v1/trust/TrustedIssuerCredential.schema.json`
      const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/schemas/v1/trust/TrustedIssuerCredential.schema.json`
      
      // Extract metadata from the schema
      const metadata = {
        name: content.title || content.$id || 'TrustedIssuer',
        file: 'trust/TrustedIssuerCredential.schema.json',
        description: content.description,
        $id: content.$id,
        $schema: content.$schema,
        title: content.title,
        version: content.version
      }

      setSchemaData({
        content,
        metadata,
        githubUrl,
        rawUrl
      })
    } catch (err) {
      console.error('Error loading TrustedIssuer schema:', err)
      setError(`Failed to load TrustedIssuer schema: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadSchemaById = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      // Map schema IDs to their file paths
      const schemaIdMap: { [key: string]: string } = {
        'TrustedIssuer': 'trust/TrustedIssuerCredential.schema.json',
        // Add more mappings as needed
      }

      const filePath = schemaIdMap[id]
      if (!filePath) {
        throw new Error(`Schema ID '${id}' not found`)
      }

      // Load the schema content from GitHub
      const content = await schemaService.loadSchemaFile(filePath)
      
      // Construct GitHub URLs
      const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/schemas/v1/${filePath}`
      const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/schemas/v1/${filePath}`
      
      // Extract metadata from the schema
      const metadata = {
        name: content.title || content.$id || id,
        file: filePath,
        description: content.description,
        $id: content.$id,
        $schema: content.$schema,
        title: content.title,
        version: content.version
      }

      setSchemaData({
        content,
        metadata,
        githubUrl,
        rawUrl
      })
    } catch (err) {
      console.error(`Error loading schema with ID ${id}:`, err)
      setError(`Failed to load schema with ID '${id}': ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadSchema = async () => {
    try {
      setLoading(true)
      setError(null)

      // Decode the schema path (it might be URL encoded)
      const decodedPath = decodeURIComponent(schemaPath!)
      
      // Load the schema content from GitHub
      const content = await schemaService.loadSchemaFile(decodedPath)
      
      // Construct GitHub URLs
      const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/schemas/v1/${decodedPath}`
      const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/schemas/v1/${decodedPath}`
      
      // Extract metadata from the schema
      const metadata = {
        name: content.title || content.$id || decodedPath.split('/').pop() || 'Unknown Schema',
        file: decodedPath,
        description: content.description,
        $id: content.$id,
        $schema: content.$schema,
        title: content.title,
        version: content.version
      }

      setSchemaData({
        content,
        metadata,
        githubUrl,
        rawUrl
      })
    } catch (err) {
      console.error('Error loading schema:', err)
      setError(`Failed to load schema: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!schemaData) return
    
    const blob = new Blob([JSON.stringify(schemaData.content, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schemaData.metadata.name}.schema.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = async () => {
    if (!schemaData) return
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(schemaData.content, null, 2))
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleBackToExplorer = () => {
    navigate('/schemas')
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
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToExplorer}
        >
          Back to Schema Explorer
        </Button>
      </Container>
    )
  }

  if (!schemaData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">
          No schema data available
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToExplorer}
          sx={{ mb: 2, fontFamily: 'Thiccboi' }}
        >
          Back to Schema Explorer
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" fontFamily="Thiccboi">
          {schemaData.metadata.title || schemaData.metadata.name}
        </Typography>
        
        {schemaData.metadata.description && (
          <Typography variant="body1" color="text.secondary" paragraph fontFamily="Thiccboi">
            {schemaData.metadata.description}
          </Typography>
        )}
        
        {/* Metadata chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {schemaData.metadata.$id && (
            <Chip 
              label={`ID: ${schemaData.metadata.$id}`} 
              size="small" 
              variant="outlined"
              sx={{ fontFamily: 'Thiccboi' }}
            />
          )}
          {schemaData.metadata.$schema && (
            <Chip 
              label={`Schema: ${schemaData.metadata.$schema}`} 
              size="small" 
              variant="outlined"
              sx={{ fontFamily: 'Thiccboi' }}
            />
          )}
          {schemaData.metadata.version && (
            <Chip 
              label={`v${schemaData.metadata.version}`} 
              size="small" 
              color="primary"
              sx={{ fontFamily: 'Thiccboi' }}
            />
          )}
          <Chip 
            label={`File: ${schemaData.metadata.file}`} 
            size="small" 
            variant="outlined"
            sx={{ fontFamily: 'Thiccboi' }}
          />
        </Stack>
        
        {/* Action buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={schemaData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontFamily: 'Thiccboi' }}
          >
            View on GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<CodeIcon />}
            onClick={handleCopyToClipboard}
            sx={{ fontFamily: 'Thiccboi' }}
          >
            Copy JSON
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ fontFamily: 'Thiccboi' }}
          >
            Download
          </Button>
        </Stack>
      </Box>

      {/* Schema content */}
      <Paper 
        variant="outlined" 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          borderColor: theme.palette.divider,
        }}
      >
        <Box sx={{ 
          px: 2, py: 1.5, 
          bgcolor: theme.palette.background.paper, 
          borderBottom: 1, 
          borderColor: theme.palette.divider,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
        }}>
          <SchemaIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
            JSON Schema Definition
          </Typography>
        </Box>
        
        <Box sx={{ height: '600px', position: 'relative' }}>
          <CodeEditor
            value={JSON.stringify(schemaData.content, null, 2)}
            language="json"
            readonly
            height="100%"
            title={`${schemaData.metadata.name} Schema`}
          />
        </Box>
      </Paper>
    </Container>
  )
}

export default SchemaResolver 