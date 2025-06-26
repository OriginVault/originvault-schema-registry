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
  const theme = useTheme()
  
  const [wellKnownData, setWellKnownData] = useState<WellKnownData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!wellKnownPath) {
      setError('No .well-known path provided')
      setLoading(false)
      return
    }

    loadWellKnownFile()
  }, [wellKnownPath])

  const loadWellKnownFile = async () => {
    try {
      setLoading(true)
      setError(null)

      // Decode the path (it might be URL encoded)
      const decodedPath = decodeURIComponent(wellKnownPath!)
      
      // Try to load from the external .well-known endpoint first
      let content: any
      let sourceUrl: string
      
      if (decodedPath === 'did-configuration.json') {
        // Load from the external DID configuration endpoint
        const response = await fetch('https://schemas.originvault.box/.well-known/did-configuration.json')
        if (!response.ok) {
          throw new Error(`Failed to load DID configuration: ${response.statusText}`)
        }
        content = await response.json()
        sourceUrl = 'https://schemas.originvault.box/.well-known/did-configuration.json'
      } else {
        // For other .well-known files, try to load from GitHub
        const response = await fetch(`https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/.well-known/${decodedPath}`)
        if (!response.ok) {
          throw new Error(`Failed to load .well-known file: ${response.statusText}`)
        }
        content = await response.json()
        sourceUrl = `https://raw.githubusercontent.com/OriginVault/originvault-schema-registry/main/.well-known/${decodedPath}`
      }
      
      // Determine the type of .well-known file
      let fileType: 'did-configuration' | 'did-configuration-resource' | 'other' = 'other'
      if (decodedPath === 'did-configuration.json') {
        fileType = 'did-configuration'
      } else if (decodedPath.includes('did-configuration')) {
        fileType = 'did-configuration-resource'
      }
      
      // Extract metadata
      const metadata = {
        name: content.title || content.name || decodedPath || 'Unknown .well-known file',
        file: decodedPath,
        description: content.description || getWellKnownDescription(decodedPath),
        type: fileType
      }

      // Construct GitHub URLs (for reference)
      const githubUrl = `https://github.com/OriginVault/originvault-schema-registry/blob/main/.well-known/${decodedPath}`
      const rawUrl = sourceUrl

      setWellKnownData({
        content,
        metadata,
        githubUrl,
        rawUrl
      })
    } catch (err) {
      console.error('Error loading .well-known file:', err)
      setError(`Failed to load .well-known file: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  const getWellKnownDescription = (path: string): string => {
    switch (path) {
      case 'did-configuration.json':
        return 'DID Configuration file for OriginVault schema registry domain verification'
      case 'did-configuration-resource.json':
        return 'DID Configuration resource for additional DID-related configurations'
      default:
        return 'Well-known configuration file'
    }
  }

  const handleDownload = () => {
    if (!wellKnownData) return
    
    const blob = new Blob([JSON.stringify(wellKnownData.content, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = wellKnownData.metadata.file
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = async () => {
    if (!wellKnownData) return
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(wellKnownData.content, null, 2))
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleBackToExplorer = () => {
    navigate('/schemas')
  }

  const extractDidConfigurationInfo = (content: any): { domain: string; did: string; validFrom: string } | null => {
    if (content && content.entries && Array.isArray(content.entries) && content.entries.length > 0) {
      const entry = content.entries[0]
      return {
        domain: entry.domain || 'Unknown',
        did: entry.did || 'Unknown',
        validFrom: entry.validFrom || 'Unknown'
      }
    }
    return null
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

  if (!wellKnownData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">
          No .well-known file data available
        </Alert>
      </Container>
    )
  }

  const didInfo = extractDidConfigurationInfo(wellKnownData.content)

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
          {wellKnownData.metadata.name}
        </Typography>
        
        {wellKnownData.metadata.description && (
          <Typography variant="body1" color="text.secondary" paragraph fontFamily="Thiccboi">
            {wellKnownData.metadata.description}
          </Typography>
        )}
        
        {/* DID Configuration Info */}
        {didInfo && (
          <Paper variant="outlined" sx={{ 
            mb: 3,
            p: 2,
            bgcolor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
          }}>
            <Typography variant="h6" gutterBottom color="text.primary" fontFamily="Thiccboi">
              DID Configuration Details
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Chip 
                label={`Domain: ${didInfo.domain}`} 
                size="small" 
                variant="outlined"
                sx={{ fontFamily: 'Thiccboi' }}
              />
              <Chip 
                label={`DID: ${didInfo.did}`} 
                size="small" 
                variant="outlined"
                sx={{ fontFamily: 'Thiccboi' }}
              />
              <Chip 
                label={`Valid From: ${didInfo.validFrom}`} 
                size="small" 
                variant="outlined"
                sx={{ fontFamily: 'Thiccboi' }}
              />
            </Stack>
          </Paper>
        )}
        
        {/* Metadata chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip 
            label={`File: ${wellKnownData.metadata.file}`} 
            size="small" 
            variant="outlined"
            sx={{ fontFamily: 'Thiccboi' }}
          />
          <Chip 
            label={wellKnownData.metadata.type.replace('-', ' ').toUpperCase()} 
            size="small" 
            color="primary"
            sx={{ fontFamily: 'Thiccboi' }}
          />
          <Chip 
            label="Well-Known Configuration" 
            size="small" 
            variant="outlined"
            sx={{ fontFamily: 'Thiccboi' }}
          />
        </Stack>
        
        {/* Action buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<SecurityIcon />}
            href={wellKnownData.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontFamily: 'Thiccboi' }}
          >
            View Source
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

      {/* .well-known file content */}
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
          <SecurityIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" fontWeight="medium" color="text.primary" fontFamily="Thiccboi">
            {wellKnownData.metadata.type.replace('-', ' ').toUpperCase()} Configuration
          </Typography>
        </Box>
        
        <Box sx={{ height: '600px', position: 'relative' }}>
          <CodeEditor
            value={JSON.stringify(wellKnownData.content, null, 2)}
            language="json"
            readonly
            height="100%"
            title={`${wellKnownData.metadata.name} Configuration`}
          />
        </Box>
      </Paper>
    </Container>
  )
}

export default WellKnownResolver 