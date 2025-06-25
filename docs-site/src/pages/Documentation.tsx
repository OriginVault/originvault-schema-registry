import React from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Stack,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Documentation: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Schema Explorer',
      description: 'Interactive browser for all OriginVault schemas with real-time code generation',
      icon: '🔍',
      path: '/explorer',
      features: ['Browse 22+ production schemas', 'Real-time QuickType integration', 'JSON Schema validation', 'Form previews']
    },
    {
      title: 'QuickType Integration',
      description: 'Generate type-safe code in 10+ programming languages from JSON schemas',
      icon: '⚡',
      path: '/quicktype',
      features: ['TypeScript, Python, Go, C#, Java, Rust', 'Batch generation support', 'CI/CD integration', 'Custom options']
    },
    {
      title: 'Schema Categories',
      description: 'Organized schemas by domain with clear documentation and examples',
      icon: '📁',
      path: '/explorer',
      features: ['Identity & Access Management', 'Business Workflow Automation', 'Content & Creation Management', 'Trust & Verification Systems']
    },
    {
      title: 'Standards Compliance',
      description: 'Built on W3C Verifiable Credentials 2.0 and DIF Credential Schemas',
      icon: '🏛️',
      path: '/explorer',
      features: ['W3C VC 2.0 compliant', 'DIF Credential Schemas', 'JSON Schema Draft 2020-12', 'Interoperable design']
    }
  ]

  const categories = [
    {
      name: 'Identity & Access Management',
      count: 6,
      description: 'Core identity and permission management schemas',
      schemas: ['PersonCredential', 'OrganizationCredential', 'VaultAccessCredential', 'AdminCredential', 'APIAccessCredential', 'OriginVaultRootAuthority']
    },
    {
      name: 'Business Workflow Automation',
      count: 7,
      description: 'Complete business process automation schemas',
      schemas: ['ContractCredential', 'EquityGrantCredential', 'WorkflowExecutionCredential', 'VerificationReportCredential', 'CustomerOnboardingCredential', 'SustainabilityCredential', 'RevocationService']
    },
    {
      name: 'Content & Creation Management',
      count: 3,
      description: 'Content authenticity and creation workflows',
      schemas: ['CreativeWorkCredential', 'ContentAuthenticityCredential', 'ContentAIPermissionCredential']
    },
    {
      name: 'Trust & Verification Systems',
      count: 2,
      description: 'Trust networks and reputation systems',
      schemas: ['TrustedIssuerCredential', 'ReputationCredential']
    },
    {
      name: 'Payments & Economics',
      count: 2,
      description: 'Financial and economic interactions',
      schemas: ['PaymentCredential', 'StorageCredential']
    },
    {
      name: 'Platform & Services',
      count: 2,
      description: 'Platform services and integrations',
      schemas: ['PluginEndorsementCredential', 'GemCredential']
    }
  ]

  const languages = [
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        OriginVault Schema Registry
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Production-ready verifiable credential schemas with QuickType integration for type-safe development
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>22 schemas</strong> across <strong>6 categories</strong> with support for <strong>10+ programming languages</strong>. 
          All schemas are W3C Verifiable Credentials 2.0 compliant and ready for production use.
        </Typography>
      </Alert>

      {/* Features */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} key={feature.title}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box component="span" sx={{ fontSize: 32, mr: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <List dense>
                  {feature.features.map((item) => (
                    <ListItem key={item} sx={{ py: 0 }}>
                      <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(feature.path)}
                  variant="outlined"
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Schema Categories */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Schema Categories
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} lg={4} key={category.name}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    {category.name}
                  </Typography>
                  <Chip label={category.count} size="small" color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {category.description}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                  {category.schemas.map((schema) => (
                    <Chip 
                      key={schema} 
                      label={schema} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate('/explorer')}
                  variant="outlined"
                >
                  View Schemas
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Supported Languages */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Supported Languages
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          Generate type-safe code in your preferred programming language using QuickType integration.
        </Typography>
        <Grid container spacing={2}>
          {languages.map((lang) => (
            <Grid item key={lang.name}>
              <Chip 
                label={`${lang.icon} ${lang.name}`}
                variant="outlined"
                size="medium"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Quick Start */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Quick Start
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              1. Install QuickType
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '14px' }}>
              npm install -g quicktype
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              2. Generate TypeScript Types
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '14px' }}>
              quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang typescript --out types/PersonCredential.ts
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              3. Use in Your Code
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '14px' }}>
              {`import { PersonCredential } from './types/PersonCredential';

const credential: PersonCredential = {
  // Your type-safe data here
};`}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Standards & Compliance */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Standards & Compliance
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                W3C Verifiable Credentials 2.0
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                All schemas are built on the latest W3C Verifiable Credentials standard, ensuring interoperability and compliance.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="JSON-LD format support" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Proof mechanisms (Ed25519, JWS)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Credential status tracking" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                DIF Credential Schemas
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Extends DIF Credential Schemas for enhanced interoperability and community standards.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Basic Person schema compatibility" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="DIF schema inheritance" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Community-driven evolution" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" paragraph>
          Explore our schemas, generate type-safe code, and build with confidence.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            onClick={() => navigate('/explorer')}
          >
            Explore Schemas
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            onClick={() => navigate('/quicktype')}
          >
            QuickType Guide
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Documentation 