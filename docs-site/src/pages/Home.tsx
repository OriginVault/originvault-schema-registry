import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Interactive Schema Explorer',
      description: 'Browse and explore JSON schemas with real-time validation and QuickType code generation.',
      icon: '🔍',
      path: '/explorer'
    },
    {
      title: 'Multi-Language Code Generation',
      description: 'Generate type-safe code in TypeScript, Python, Java, C#, Go, and more using QuickType.',
      icon: '⚡',
      path: '/quicktype'
    },
    {
      title: 'Verifiable Credentials',
      description: 'Built-in support for W3C Verifiable Credentials and JSON-LD schemas.',
      icon: '🔐',
      path: '/explorer'
    },
    {
      title: 'C2PA Integration',
      description: 'Content authenticity and provenance tracking with C2PA manifest support.',
      icon: '📷',
      path: '/explorer'
    }
  ];

  const languages = [
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'C#', icon: '🔷' },
    { name: 'Go', icon: '🐹' },
    { name: 'Rust', icon: '🦀' },
    { name: 'Swift', icon: '🍎' },
    { name: 'Kotlin', icon: '📱' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Ruby', icon: '💎' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          OriginVault Schema Registry
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Interactive JSON schema documentation with QuickType integration for verifiable credentials and decentralized identity
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/explorer')}
          >
            Explore Schemas
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/quicktype')}
          >
            QuickType Guide
          </Button>
        </Stack>
      </Box>

      {/* Features */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate(feature.path)}
                  variant="outlined"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Supported Languages */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Supported Languages
      </Typography>
      <Paper sx={{ p: 3, mb: 6 }}>
        <Grid container spacing={2}>
          {languages.map((lang, index) => (
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
      </Paper>

      {/* Call to Action */}
      <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
        <CardContent sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph>
            Explore our schemas, generate code, and integrate verifiable credentials into your applications.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/explorer')}
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            >
              Explore Schemas
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/quicktype')}
              sx={{ borderColor: 'white', color: 'white' }}
            >
              QuickType Guide
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home; 