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
  Stack,
  useTheme
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  GetApp as DownloadIcon,
  Code as CodeIcon,
  Language as LanguageIcon,
  GitHub as GitHubIcon
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
  const theme = useTheme()
  
  const [contextData, setContextData] = useState<ContextData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!contextPath) {
      setError('No context path provided')
      setLoading(false)
      return
    }

    loadContext()
  }, [contextPath])

  const loadContext = async () => {
    try {
      setLoading(true)
      setError(null)

      // Decode the context path (it might be URL encoded)
      const decodedPath = decodeURIComponent(contextPath!)
      
      // Load the context content from GitHub
      const response = await fetch(`https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/contexts/${decodedPath}`)
      
      if (!response.ok) {
        throw new Error(`Failed to load context file: ${response.statusText}`)
      }
      
      const content = await response.json()
      
      // Construct GitHub URLs
      const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/contexts/${decodedPath}`
      const rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/contexts/${decodedPath}`
      
      // Extract metadata from the context
      const metadata = {
        name: content.title || content.name || decodedPath.split('/').pop() || 'Unknown Context',
        file: decodedPath,
        description: content.description,
        '@context': content['@context']
      }

      setContextData({
        content,
        metadata,
        githubUrl,
        rawUrl
      })
    } catch (err) {
      console.error('Error loading context:', err)
      setError(`Failed to load context: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!contextData) return
    
    const blob = new Blob([JSON.stringify(contextData.content, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contextData.metadata.name}.jsonld`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = async () => {
    if (!contextData) return
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(contextData.content, null, 2))
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleBackToExplorer = () => {
    navigate('/schemas')
  }

  const extractContextTerms = (context: any): string[] => {
    if (!context || typeof context !== 'object') return []
    
    const terms: string[] = []
    
    // Handle different context formats
    if (Array.isArray(context)) {
      // Array format: ["term1", "term2"]
      context.forEach(term => {
        if (typeof term === 'string') {
          terms.push(term)
        }
      })
    } else {
      // Object format: { "term1": "uri1", "term2": "uri2" }
      Object.keys(context).forEach(term => {
        if (term !== '@context' && term !== '@vocab') {
          terms.push(term)
        }
      })
    }
    
    return terms
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

  if (!contextData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">
          No context data available
        </Alert>
      </Container>
    )
  }

  const contextTerms = extractContextTerms(contextData.metadata['@context'])

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
          {contextData.metadata.name}
        </Typography>
        
        {contextData.metadata.description && (
          <Typography variant="body1" color="text.secondary" paragraph fontFamily="Thiccboi">
            {contextData.metadata.description}
          </Typography>
        )}
        
        {/* Metadata chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip 
            label={`File: ${contextData.metadata.file}`} 
            size="small" 
            variant="outlined"
            sx={{ fontFamily: 'Thiccboi' }}
          />
          {contextTerms.length > 0 && (
            <Chip 
              label={`${contextTerms.length} Terms`} 
              size="small" 
              color="primary"
              sx={{ fontFamily: 'Thiccboi' }}
            />
          )}
          <Chip 
            label="JSON-LD Context" 
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
            href={contextData.githubUrl}
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

      {/* Context terms preview */}
      {contextTerms.length > 0 && (
        <Paper 
          variant="outlined" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
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
            <LanguageIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
              Context Terms ({contextTerms.length})
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {contextTerms.slice(0, 20).map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'Thiccboi' }}
                />
              ))}
              {contextTerms.length > 20 && (
                <Chip
                  label={`+${contextTerms.length - 20} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'Thiccboi' }}
                />
              )}
            </Stack>
          </Box>
        </Paper>
      )}

      {/* Context content */}
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
          <LanguageIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
            JSON-LD Context Definition
          </Typography>
        </Box>
        
        <Box sx={{ height: '600px', position: 'relative' }}>
          <CodeEditor
            value={JSON.stringify(contextData.content, null, 2)}
            language="json"
            readonly
            height="100%"
            title={`${contextData.metadata.name} Context`}
          />
        </Box>
      </Paper>
    </Container>
  )
}

export default ContextResolver 