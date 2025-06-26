import React from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  useTheme
} from '@mui/material';

const QuickTypeGuide: React.FC = () => {
  const theme = useTheme();
  
  const languages = [
    { name: 'TypeScript', icon: '🔷', extension: '.ts' },
    { name: 'Python', icon: '🐍', extension: '.py' },
    { name: 'Java', icon: '☕', extension: '.java' },
    { name: 'C#', icon: '🔷', extension: '.cs' },
    { name: 'Go', icon: '🐹', extension: '.go' },
    { name: 'Rust', icon: '🦀', extension: '.rs' },
    { name: 'Swift', icon: '🍎', extension: '.swift' },
    { name: 'Kotlin', icon: '📱', extension: '.kt' },
    { name: 'PHP', icon: '🐘', extension: '.php' },
    { name: 'Ruby', icon: '💎', extension: '.rb' }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Install QuickType CLI',
      description: 'Install the QuickType CLI globally using npm.',
      code: 'npm install -g quicktype'
    },
    {
      step: 2,
      title: 'Generate Types',
      description: 'Generate TypeScript types from a JSON schema.',
      code: 'quicktype schema.json -o types.ts'
    },
    {
      step: 3,
      title: 'Use Generated Types',
      description: 'Import and use the generated types in your code.',
      code: 'import { Person } from "./types";'
    }
  ];

  const examples = [
    {
      language: 'TypeScript',
      description: 'Generate TypeScript interfaces from JSON schema',
      code: `quicktype schema.json -o types.ts --just-types`
    },
    {
      language: 'Python',
      description: 'Generate Python dataclasses from JSON schema',
      code: `quicktype schema.json -o models.py --lang python`
    },
    {
      language: 'Java',
      description: 'Generate Java classes from JSON schema',
      code: `quicktype schema.json -o Models.java --lang java`
    }
  ];

  const bestPractices = [
    {
      title: 'Schema Validation',
      description: 'Always validate your JSON schemas before generating code.',
      tip: 'Use JSON Schema validators to ensure schema correctness.'
    },
    {
      title: 'Type Safety',
      description: 'Generated types provide compile-time type safety.',
      tip: 'Enable strict TypeScript settings for maximum type safety.'
    },
    {
      title: 'Version Control',
      description: 'Keep generated code in version control.',
      tip: 'Regenerate types when schemas change to maintain consistency.'
    },
    {
      title: 'Documentation',
      description: 'Document any customizations made to generated code.',
      tip: 'Use JSDoc comments to document complex type relationships.'
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontFamily="Thiccboi">
        QuickType Integration Guide
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph fontFamily="Thiccboi">
        Learn how to use QuickType to generate type-safe code from JSON schemas in multiple programming languages.
      </Typography>

      {/* Installation Guide */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontFamily="Thiccboi">
          Installation & Setup
        </Typography>
        <Grid container spacing={3}>
          {installationSteps.map((step, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ 
                p: 3,
                bgcolor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0,
                      fontFamily: 'Thiccboi',
                    }}
                  >
                    {step.step}
                  </Box>
                  <Typography variant="h6" fontFamily="Thiccboi">{step.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph fontFamily="Thiccboi">
                  {step.description}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                    border: 1,
                    borderColor: theme.palette.divider,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    color: theme.palette.text.primary,
                  }}
                >
                  <code>{step.code}</code>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Supported Languages */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontFamily="Thiccboi">
          Supported Languages
        </Typography>
        <Grid container spacing={2}>
          {languages.map((lang, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {lang.icon}
                </Typography>
                <Typography variant="body2" gutterBottom fontFamily="Thiccboi">
                  {lang.name}
                </Typography>
                <Chip 
                  label={lang.extension} 
                  size="small" 
                  variant="outlined" 
                  sx={{ fontFamily: 'Thiccboi' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Examples */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontFamily="Thiccboi">
          Usage Examples
        </Typography>
        <Grid container spacing={3}>
          {examples.map((example, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ 
                p: 3,
                bgcolor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
              }}>
                <Typography variant="h6" gutterBottom fontFamily="Thiccboi">
                  {example.language}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph fontFamily="Thiccboi">
                  {example.description}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                    border: 1,
                    borderColor: theme.palette.divider,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    color: theme.palette.text.primary,
                  }}
                >
                  <code>{example.code}</code>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Best Practices */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontFamily="Thiccboi">
          Best Practices
        </Typography>
        <List>
          {bestPractices.map((practice, index) => (
            <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={<Typography fontFamily="Thiccboi">{practice.title}</Typography>}
                secondary={
                  <Box>
                    <Typography variant="body2" paragraph fontFamily="Thiccboi">
                      {practice.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontFamily="Thiccboi">
                      💡 {practice.tip}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Call to Action */}
      <Box sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText, 
        p: 4, 
        borderRadius: 2, 
        textAlign: 'center',
        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
      }}>
        <Typography variant="h5" gutterBottom fontFamily="Thiccboi">
          Ready to Generate Types?
        </Typography>
        <Typography variant="body1" paragraph fontFamily="Thiccboi">
          Explore our schemas and generate type-safe code for your preferred language.
        </Typography>
        <a 
          href="/explorer" 
          style={{ 
            color: 'inherit', 
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid currentColor',
            borderRadius: '4px',
            fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
            display: 'inline-block',
            marginTop: '8px',
          }}
        >
          Explore Schemas
        </a>
      </Box>
    </Box>
  );
};

export default QuickTypeGuide; 