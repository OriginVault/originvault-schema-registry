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
import { useNavigate } from 'react-router-dom';

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
      path: '/schemas'
    },
    {
      title: 'C2PA Integration',
      description: 'Content authenticity and provenance tracking with C2PA manifest support for digital media.',
      icon: '📷',
      path: '/schemas'
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
        <Typography variant="h2" component="h1" gutterBottom fontFamily="Thiccboi">
          OriginVault Schema Registry
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph fontFamily="Thiccboi">
          Interactive JSON schema documentation with QuickType integration for verifiable credentials and decentralized identity
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/schemas')}
            sx={{ fontFamily: 'Thiccboi' }}
          >
            Explore Schemas & Generate Types
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/quicktype')}
            sx={{ fontFamily: 'Thiccboi' }}
          >
            QuickType Guide
          </Button>
        </Stack>
      </Box>

      {/* Features */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }} fontFamily="Thiccboi">
        Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ 
              height: '100%',
              bgcolor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" fontFamily="Thiccboi">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph fontFamily="Thiccboi">
                  {feature.description}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate(feature.path)}
                  variant="outlined"
                  sx={{ fontFamily: 'Thiccboi' }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Supported Languages */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }} fontFamily="Thiccboi">
        Supported Languages
      </Typography>
      <Paper sx={{ 
        p: 3, 
        mb: 6,
        bgcolor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
      }}>
        <Grid container spacing={2}>
          {languages.map((lang, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {lang.icon}
                </Typography>
                <Typography variant="body2" fontFamily="Thiccboi">
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
              onClick={() => navigate('/schemas')}
              sx={{ 
                bgcolor: theme.palette.background.paper, 
                color: theme.palette.primary.main,
                fontFamily: 'Thiccboi',
                '&:hover': {
                  bgcolor: theme.palette.background.default,
                }
              }}
            >
              Explore Schemas
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/quicktype')}
              sx={{ 
                borderColor: theme.palette.background.paper, 
                color: theme.palette.background.paper,
                fontFamily: 'Thiccboi',
                '&:hover': {
                  borderColor: theme.palette.background.default,
                  bgcolor: theme.palette.background.default + '20',
                }
              }}
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