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
  Language as LanguageIcon
} from '@mui/icons-material'
import CodeEditor from '../components/CodeEditor'

interface ContextData {
  content: any
  metadata: {
    name: string
    file: string
    description?: string
    '@context'?: any
  }
  githubUrl: string
  rawUrl: string
}

const ContextResolver: React.FC = () => {
  const { contextPath } = useParams<{ contextPath: string }>()
  const navigate = useNavigate()
  // const theme = useTheme()
  
  const [context, setContext] = useState<ContextData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContext = async () => {
      if (!contextPath) {
        setError('No context path provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        // Decode the context path
        const decodedPath = decodeURIComponent(contextPath)
        
        // Generate GitHub URLs
        const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/contexts/${decodedPath}`
        const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/contexts/${decodedPath}`
        
        // Fetch the context content
        const response = await fetch(rawUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch context: ${response.status} ${response.statusText}`)
        }
        
        const content = await response.json()
        
        // Extract metadata from the context
        const metadata = {
          name: decodedPath.split('/').pop()?.replace('.jsonld', '') || 'Unknown',
          file: decodedPath,
          description: content.description,
          '@context': content['@context']
        }
        
        setContext({
          content,
          metadata,
          githubUrl,
          rawUrl
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load context')
      } finally {
        setLoading(false)
      }
    }

    loadContext()
  }, [contextPath])

  const handleDownload = () => {
    if (!context) return
    
    const blob = new Blob([JSON.stringify(context.content, null, 2)], {
      type: 'application/ld+json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = context.metadata.file
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

  if (!context) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Context not found
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
          <LanguageIcon color="primary" />
          <Typography variant="h4" component="h1">
            {context.metadata.name}
          </Typography>
        </Box>
        
        {context.metadata.description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {context.metadata.description}
          </Typography>
        )}
        
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="JSON-LD Context" size="small" />
          <Chip label={context.metadata.file} size="small" variant="outlined" />
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
            Download Context
          </Button>
          <Button
            startIcon={<CodeIcon />}
            href={context.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            View on GitHub
          </Button>
        </Stack>
      </Box>

      {/* Context Content */}
      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Context Definition</Typography>
        </Box>
        <CodeEditor
          value={JSON.stringify(context.content, null, 2)}
          language="json"
          readonly
          height="600px"
        />
      </Paper>

      {/* Metadata */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Context Metadata
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>File Path:</strong> {context.metadata.file}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Raw URL:</strong>{' '}
            <a href={context.rawUrl} target="_blank" rel="noopener noreferrer">
              {context.rawUrl}
            </a>
          </Typography>
          {context.metadata['@context'] && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Context Type:</strong> {typeof context.metadata['@context']}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default ContextResolver 