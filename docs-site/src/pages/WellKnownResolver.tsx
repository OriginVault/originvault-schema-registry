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
  Security as SecurityIcon
} from '@mui/icons-material'
import CodeEditor from '../components/CodeEditor'

interface WellKnownData {
  content: any
  metadata: {
    name: string
    file: string
    description?: string
    type: 'did-configuration' | 'did-configuration-resource' | 'other'
  }
  githubUrl: string
  rawUrl: string
}

const WellKnownResolver: React.FC = () => {
  const { wellKnownPath } = useParams<{ wellKnownPath: string }>()
  const navigate = useNavigate()
  // const theme = useTheme()
  
  const [wellKnown, setWellKnown] = useState<WellKnownData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWellKnown = async () => {
      if (!wellKnownPath) {
        setError('No .well-known path provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        // Decode the path
        const decodedPath = decodeURIComponent(wellKnownPath)
        
        let rawUrl: string
        let githubUrl: string
        
        // Special handling for DID configuration
        if (decodedPath === 'did-configuration.json') {
          // Fetch directly from the live domain for domain verification
          rawUrl = 'https://schemas.originvault.box/.well-known/did-configuration.json'
          githubUrl = 'https://github.com/OriginVault/originvault-schema-registry/blob/main/.well-known/did-configuration.json'
        } else {
          // Fetch from GitHub for other .well-known files
          githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/.well-known/${decodedPath}`
          rawUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/.well-known/${decodedPath}`
        }
        
        // Fetch the content
        const response = await fetch(rawUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch .well-known file: ${response.status} ${response.statusText}`)
        }
        
        const responseText = await response.text()
        
        // Check if we got HTML instead of JSON (common when server misconfiguration redirects to app)
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
          throw new Error('Received HTML instead of JSON. This usually means the server is not configured to serve .well-known files as static assets. Please check your server configuration.')
        }
        
        let content
        try {
          content = JSON.parse(responseText)
        } catch (parseError) {
          throw new Error(`Invalid JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`)
        }
        
        // Determine the type of .well-known file
        let type: 'did-configuration' | 'did-configuration-resource' | 'other' = 'other'
        if (decodedPath === 'did-configuration.json') {
          type = 'did-configuration'
        } else if (decodedPath.includes('did-configuration')) {
          type = 'did-configuration-resource'
        }
        
        // Extract metadata
        const metadata = {
          name: decodedPath.replace('.json', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          file: decodedPath,
          description: content.description || getDescriptionForType(type),
          type
        }
        
        setWellKnown({
          content,
          metadata,
          githubUrl,
          rawUrl
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load .well-known file')
      } finally {
        setLoading(false)
      }
    }

    loadWellKnown()
  }, [wellKnownPath])

  const getDescriptionForType = (type: string): string => {
    switch (type) {
      case 'did-configuration':
        return 'DID Configuration for domain verification and trust establishment'
      case 'did-configuration-resource':
        return 'DID Configuration resource for decentralized identity verification'
      default:
        return 'Well-known resource for service discovery and configuration'
    }
  }

  const handleDownload = () => {
    if (!wellKnown) return
    
    const blob = new Blob([JSON.stringify(wellKnown.content, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = wellKnown.metadata.file
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

  if (!wellKnown) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          .well-known file not found
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
          <SecurityIcon color="primary" />
          <Typography variant="h4" component="h1">
            {wellKnown.metadata.name}
          </Typography>
        </Box>
        
        {wellKnown.metadata.description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {wellKnown.metadata.description}
          </Typography>
        )}
        
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip 
            label={wellKnown.metadata.type === 'did-configuration' ? 'DID Configuration' : 'Well-Known Resource'} 
            size="small" 
            color={wellKnown.metadata.type === 'did-configuration' ? 'primary' : 'default'}
          />
          <Chip label={wellKnown.metadata.file} size="small" variant="outlined" />
          {wellKnown.metadata.type === 'did-configuration' && (
            <Chip label="Domain Verification" size="small" color="success" />
          )}
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
            Download File
          </Button>
          <Button
            startIcon={<CodeIcon />}
            href={wellKnown.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            View on GitHub
          </Button>
        </Stack>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            {wellKnown.metadata.type === 'did-configuration' ? 'DID Configuration' : 'Well-Known Resource'}
          </Typography>
        </Box>
        <CodeEditor
          value={JSON.stringify(wellKnown.content, null, 2)}
          language="json"
          readonly
          height="600px"
        />
      </Paper>

      {/* Metadata */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resource Information
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>File Path:</strong> /.well-known/{wellKnown.metadata.file}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Resource URL:</strong>{' '}
            <a href={wellKnown.rawUrl} target="_blank" rel="noopener noreferrer">
              {wellKnown.rawUrl}
            </a>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Type:</strong> {wellKnown.metadata.type}
          </Typography>
          {wellKnown.metadata.type === 'did-configuration' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Purpose:</strong> This DID Configuration enables domain verification for 
                schemas.originvault.box, establishing trust between the domain and associated DIDs.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default WellKnownResolver 