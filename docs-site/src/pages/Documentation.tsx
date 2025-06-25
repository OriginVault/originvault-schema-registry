import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper
} from '@mui/material'

const Documentation: React.FC = () => {
  const features = [
    {
      title: 'Interactive Schema Explorer',
      description: 'Browse and explore JSON schemas with real-time validation and QuickType code generation.',
      category: 'Core Features',
      icon: '🔍',
      path: '/explorer'
    },
    {
      title: 'Multi-Language Code Generation',
      description: 'Generate type-safe code in TypeScript, Python, Java, C#, Go, and more using QuickType.',
      category: 'Developer Tools',
      icon: '⚡',
      path: '/quicktype'
    },
    {
      title: 'Verifiable Credentials Support',
      description: 'Built-in support for W3C Verifiable Credentials and JSON-LD schemas.',
      category: 'Standards Compliance',
      icon: '🔐',
      path: '/explorer'
    },
    {
      title: 'C2PA Integration',
      description: 'Content authenticity and provenance tracking with C2PA manifest support.',
      category: 'Content Security',
      icon: '📷',
      path: '/explorer'
    },
    {
      title: 'Trust Registry Integration',
      description: 'Decentralized trust management with cheqd DTCs and TRAIN validation.',
      category: 'Trust & Security',
      icon: '🏛️',
      path: '/explorer'
    },
    {
      title: 'API-First Design',
      description: 'RESTful APIs and GraphQL endpoints for programmatic access to schemas.',
      category: 'Integration',
      icon: '🔌',
      path: '/explorer'
    }
  ]

  const categories = [
    {
      name: 'Identity',
      description: 'Person, organization, and entity schemas for decentralized identity.',
      schemas: ['Person', 'Organization', 'DIDDocument', 'VerifiableCredential']
    },
    {
      name: 'Business',
      description: 'Business processes, contracts, and workflow schemas.',
      schemas: ['Admin', 'Contract', 'Workflow', 'Payment']
    },
    {
      name: 'Content',
      description: 'Content metadata, authenticity, and provenance schemas.',
      schemas: ['CreativeWork', 'C2PAManifest', 'ContentHash', 'Provenance']
    },
    {
      name: 'Trust',
      description: 'Trust relationships, attestations, and verification schemas.',
      schemas: ['TrustRegistry', 'Attestation', 'Verification', 'Endorsement']
    },
    {
      name: 'Payments',
      description: 'Payment processing, billing, and financial transaction schemas.',
      schemas: ['Payment', 'Invoice', 'Subscription', 'Credit']
    },
    {
      name: 'Platform',
      description: 'Platform infrastructure, configuration, and management schemas.',
      schemas: ['Configuration', 'Metrics', 'Audit', 'System']
    }
  ]

  const supportedLanguages = [
    { name: 'TypeScript/JavaScript', icon: '🔷' },
    { name: 'Python', icon: '🐍' },
    { name: 'Go', icon: '🔵' },
    { name: 'C#', icon: '💜' },
    { name: 'Java', icon: '☕' },
    { name: 'Rust', icon: '🦀' },
    { name: 'Swift', icon: '🍎' },
    { name: 'Kotlin', icon: '🔶' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Ruby', icon: '💎' }
  ]

  const quickStart = [
    {
      step: 1,
      title: 'Browse Schemas',
      description: 'Use the Schema Explorer to find schemas by category or search terms.'
    },
    {
      step: 2,
      title: 'Generate Code',
      description: 'Select a schema and generate type-safe code in your preferred language.'
    },
    {
      step: 3,
      title: 'Validate Data',
      description: 'Use the generated code to validate your data against the schemas.'
    },
    {
      step: 4,
      title: 'Integrate',
      description: 'Integrate the schemas and generated code into your applications.'
    }
  ]

  const standards = [
    {
      name: 'W3C Verifiable Credentials',
      description: 'World Wide Web Consortium standard for verifiable credentials.',
      url: 'https://www.w3.org/TR/vc-data-model/'
    },
    {
      name: 'JSON-LD',
      description: 'JSON for Linked Data, enabling semantic web capabilities.',
      url: 'https://json-ld.org/'
    },
    {
      name: 'C2PA',
      description: 'Coalition for Content Provenance and Authenticity.',
      url: 'https://c2pa.org/'
    },
    {
      name: 'DIF',
      description: 'Decentralized Identity Foundation standards.',
      url: 'https://identity.foundation/'
    },
    {
      name: 'cheqd DTCs',
      description: 'Decentralized Trust Chains for hierarchical trust management.',
      url: 'https://docs.cheqd.io/'
    }
  ]

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Documentation
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Comprehensive documentation for the OriginVault Schema Registry, including features, 
        integration guides, and best practices for working with verifiable credentials and 
        decentralized identity schemas.
      </Typography>

      {/* Features Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h4" sx={{ mr: 1 }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant="h6">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                  <Chip 
                    label={feature.category} 
                    size="small" 
                    sx={{ mt: 1 }}
                    variant="outlined"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Schema Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Schema Categories
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {category.schemas.map((schema, schemaIndex) => (
                      <Chip 
                        key={schemaIndex} 
                        label={schema} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Supported Languages */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Supported Languages
          </Typography>
          <Grid container spacing={2}>
            {supportedLanguages.map((lang, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {lang.icon}
                  </Typography>
                  <Typography variant="body2">
                    {lang.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Quick Start Guide
          </Typography>
          <Grid container spacing={3}>
            {quickStart.map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography variant="h6">{step.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Standards Compliance */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Standards Compliance
          </Typography>
          <Grid container spacing={3}>
            {standards.map((standard, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {standard.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {standard.description}
                  </Typography>
                  <a 
                    href={standard.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    Learn More →
                  </a>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph>
            Explore our schemas and start building with verifiable credentials.
          </Typography>
          <a 
            href="/explorer" 
            style={{ 
              color: 'inherit', 
              textDecoration: 'none',
              padding: '8px 16px',
              border: '1px solid currentColor',
              borderRadius: '4px'
            }}
          >
            Explore Schemas
          </a>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Documentation; 