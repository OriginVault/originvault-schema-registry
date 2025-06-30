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
  Stack,
  useTheme
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Schema Explorer & Type Generator',
      description: 'Browse schemas with side-by-side JSON and generated TypeScript types. Includes live dynamic type generation and validation.',
      icon: '🔍',
      path: '/schemas'
    },
    {
      title: 'Multi-Language Code Generation',
      description: 'Generate type-safe code in TypeScript, Python, Java, C#, Go, and more using QuickType integration.',
      icon: '⚡',
      path: '/quicktype'
    },
    {
      title: 'Verifiable Credentials',
      description: 'Built-in support for W3C Verifiable Credentials and JSON-LD schemas with blockchain integration.',
      icon: '🔐',
      path: '/verifiable-credentials'
    },
    {
      title: 'C2PA Integration',
      description: 'Content authenticity and provenance tracking with C2PA manifest support for digital media.',
      icon: '📷',
      path: '/c2pa'
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
          Interactive JSON Schema Documentation & QuickType Integration
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/schemas"
            sx={{ minWidth: 200 }}
          >
            Explore Schemas
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/quicktype"
            sx={{ minWidth: 200 }}
          >
            QuickType Guide
          </Button>
        </Stack>
      </Box>

      {/* Features */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Key Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ 
              height: '100%',
              bgcolor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
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
      <Paper sx={{ 
        p: 3, 
        mb: 6,
        bgcolor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
      }}>
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
      <Card sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText, 
        textAlign: 'center',
        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
      }}>
        <CardContent sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom fontFamily="Thiccboi">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph fontFamily="Thiccboi">
            Explore our schemas, generate code, and integrate verifiable credentials into your applications.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/schemas"
              sx={{ minWidth: 200 }}
            >
              Explore Schemas
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/quicktype"
              sx={{ minWidth: 200 }}
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