import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  Stack,
  Paper
} from '@mui/material'
import {
  Explore as ExploreIcon,
  Book as BookIcon,
  FlashOn as FlashIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material'

const Home: React.FC = () => {
  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Type-Safe Schemas',
      description: 'Generate type-safe code in TypeScript, Python, Go, C#, Java, and Rust from JSON schemas.',
      color: 'primary'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Verifiable Credentials',
      description: 'W3C VC 2.0 compliant schemas for decentralized identity and trust.',
      color: 'secondary'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'QuickType Integration',
      description: 'Seamless integration with QuickType for instant code generation.',
      color: 'success'
    }
  ]

  const quickActions = [
    {
      title: 'Explore Schemas',
      description: 'Browse and interact with our schema collection',
      icon: <ExploreIcon />,
      href: '/explorer',
      color: 'primary'
    },
    {
      title: 'Documentation',
      description: 'Implementation guides and architecture docs',
      icon: <BookIcon />,
      href: '/docs',
      color: 'secondary'
    },
    {
      title: 'QuickType Guide',
      description: 'Learn how to generate types from schemas',
      icon: <FlashIcon />,
      href: '/quicktype',
      color: 'success'
    }
  ]

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            OriginVault Schema Registry
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Type-safe, verifiable credential schemas for the decentralized creator economy
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            <Button
              component={Link}
              to="/explorer"
              variant="contained"
              size="large"
              startIcon={<ExploreIcon />}
            >
              Explore Schemas
            </Button>
            <Button
              component={Link}
              to="/docs"
              variant="outlined"
              size="large"
              startIcon={<BookIcon />}
            >
              View Documentation
            </Button>
          </Stack>
          
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            <Chip label="W3C VC 2.0" color="primary" variant="outlined" />
            <Chip label="TypeScript" color="secondary" variant="outlined" />
            <Chip label="QuickType" color="success" variant="outlined" />
            <Chip label="Accessible" color="info" variant="outlined" />
          </Stack>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            Why Choose OriginVault?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent sx={{ py: 4 }}>
                    <Box sx={{ color: `${feature.color}.main`, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            Get Started
          </Typography>
          <Grid container spacing={4}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Box sx={{ color: `${action.color}.main`, mb: 2 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {action.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={action.href}
                    variant="contained"
                    color={action.color as any}
                    fullWidth
                  >
                    Get Started
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Production Ready
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Trusted by creators and developers worldwide
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Typography variant="h4" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                22+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Production Schemas
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Programming Languages
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                100%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accessibility Compliant
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Home 