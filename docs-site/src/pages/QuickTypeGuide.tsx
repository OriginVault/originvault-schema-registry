import React from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Alert,
  Button,
  Stack
} from '@mui/material'
import CodeEditor from '../components/CodeEditor'

const QuickTypeGuide: React.FC = () => {
  const installationCommands = {
    npm: 'npm install -g quicktype',
    yarn: 'yarn global add quicktype',
    homebrew: 'brew install quicktype',
    chocolatey: 'choco install quicktype'
  }

  const basicExamples = {
    typescript: `# Generate TypeScript types from JSON Schema
quicktype --src schemas/v1/identity/PersonCredential.schema.json --lang typescript --out types/PersonCredential.ts

# Generate with custom options
quicktype --src schemas/v1/identity/PersonCredential.schema.json \\
  --lang typescript \\
  --out types/PersonCredential.ts \\
  --just-types \\
  --prefer-unions \\
  --explicit-unions`,

    python: `# Generate Python types
quicktype --src schemas/v1/business/ContractCredential.schema.json --lang python --out types/contract_credential.py

# Generate with dataclasses
quicktype --src schemas/v1/business/ContractCredential.schema.json \\
  --lang python \\
  --out types/contract_credential.py \\
  --python-version 3.7`,

    go: `# Generate Go types
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json --lang go --out types/creative_work.go

# Generate with custom package name
quicktype --src schemas/v1/content/CreativeWorkCredential.schema.json \\
  --lang go \\
  --out types/creative_work.go \\
  --package-name originvault`,

    csharp: `# Generate C# types
quicktype --src schemas/v1/payments/PaymentCredential.schema.json --lang csharp --out types/PaymentCredential.cs

# Generate with namespace
quicktype --src schemas/v1/payments/PaymentCredential.schema.json \\
  --lang csharp \\
  --out types/PaymentCredential.cs \\
  --namespace OriginVault.Schemas`,

    java: `# Generate Java types
quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json --lang java --out types/TrustedIssuerCredential.java

# Generate with package
quicktype --src schemas/v1/trust/TrustedIssuerCredential.schema.json \\
  --lang java \\
  --out types/TrustedIssuerCredential.java \\
  --package com.originvault.schemas`,

    rust: `# Generate Rust types
quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json --lang rust --out types/plugin_endorsement.rs

# Generate with serde
quicktype --src schemas/v1/platform/PluginEndorsementCredential.schema.json \\
  --lang rust \\
  --out types/plugin_endorsement.rs \\
  --derive-serde`
  }

  const batchExamples = {
    all: `# Generate types for all schemas
quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts

# Generate for specific category
quicktype --src schemas/v1/identity/ --lang python --out types/identity.py

# Generate multiple languages
for lang in typescript python go csharp java rust; do
  quicktype --src schemas/v1/ --lang $lang --out types/all-schemas.$lang
done`,

    url: `# Generate from OriginVault schema registry URLs
quicktype --src https://schemas.originvault.box/v1/business/ContractCredential.schema.json --lang typescript

# Generate entire category from URL
quicktype --src https://schemas.originvault.box/v1/business/ --lang python --out business_types.py

# Generate all schemas from registry
quicktype --src https://schemas.originvault.box/v1/ --lang go --out all_types.go`
  }

  const advancedFeatures = {
    options: `# Language-specific options
--just-types          # Generate only types, no serialization
--prefer-unions       # Use union types where possible
--explicit-unions     # Make union types explicit
--no-enums            # Don't generate enums
--no-maps             # Don't generate maps
--no-objects          # Don't generate objects
--no-arrays           # Don't generate arrays

# TypeScript options
--typescript-version  # Specify TypeScript version
--no-typescript-strict # Don't use strict mode

# Python options
--python-version      # Specify Python version
--python-format       # Use black formatting

# Go options
--package-name        # Specify package name
--go-tags             # Add struct tags

# C# options
--namespace           # Specify namespace
--csharp-version      # Specify C# version

# Java options
--package             # Specify package name
--java-version        # Specify Java version

# Rust options
--derive-serde        # Add serde derives
--rust-version        # Specify Rust version`,

    integration: `# CI/CD Integration Example
# .github/workflows/generate-types.yml

name: Generate Type Definitions
on:
  push:
    paths: ['schemas/**']
  pull_request:
    paths: ['schemas/**']

jobs:
  generate-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install QuickType
        run: npm install -g quicktype
        
      - name: Generate TypeScript types
        run: |
          quicktype --src schemas/v1/ --lang typescript --out types/all-schemas.ts
          quicktype --src schemas/v1/identity/ --lang typescript --out types/identity.ts
          quicktype --src schemas/v1/business/ --lang typescript --out types/business.ts
          
      - name: Generate Python types
        run: |
          quicktype --src schemas/v1/ --lang python --out types/all_schemas.py
          
      - name: Generate Go types
        run: |
          quicktype --src schemas/v1/ --lang go --out types/all_schemas.go
          
      - name: Commit generated types
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add types/
          git commit -m "chore: regenerate type definitions" || exit 0
          git push`
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        QuickType Integration Guide
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Learn how to generate type-safe code from OriginVault schemas using QuickType
      </Typography>

      <Grid container spacing={4}>
        {/* Installation */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              Installation
            </Typography>
            <Typography variant="body1" paragraph>
              QuickType is a command-line tool that generates types and serialization code from JSON schemas.
            </Typography>
            
            <Stack spacing={2}>
              {Object.entries(installationCommands).map(([method, command]) => (
                <Box key={method}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </Typography>
                  <CodeEditor
                    value={command}
                    language="bash"
                    height="60px"
                    readOnly={true}
                    title={`Install via ${method}`}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Basic Usage */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              Basic Usage
            </Typography>
            <Typography variant="body1" paragraph>
              Generate types for individual schemas or entire categories.
            </Typography>
            
            <Stack spacing={2}>
              {Object.entries(basicExamples).slice(0, 3).map(([lang, example]) => (
                <Box key={lang}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Typography>
                  <CodeEditor
                    value={example}
                    language="bash"
                    height="120px"
                    readOnly={true}
                    title={`${lang} example`}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Batch Generation */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Batch Generation
            </Typography>
            <Typography variant="body1" paragraph>
              Generate types for multiple schemas or entire categories at once.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Local Files
                </Typography>
                <CodeEditor
                  value={batchExamples.all}
                  language="bash"
                  height="200px"
                  readOnly={true}
                  title="Batch generation from local files"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Remote URLs
                </Typography>
                <CodeEditor
                  value={batchExamples.url}
                  language="bash"
                  height="200px"
                  readOnly={true}
                  title="Batch generation from URLs"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Advanced Features */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Advanced Features
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Command Options
                </Typography>
                <CodeEditor
                  value={advancedFeatures.options}
                  language="bash"
                  height="300px"
                  readOnly={true}
                  title="QuickType options"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  CI/CD Integration
                </Typography>
                <CodeEditor
                  value={advancedFeatures.integration}
                  language="yaml"
                  height="300px"
                  readOnly={true}
                  title="GitHub Actions workflow"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Best Practices */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Best Practices
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardHeader title="Version Control" />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Commit generated types to your repository" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Use CI/CD to auto-regenerate on schema changes" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Include type generation in your build process" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardHeader title="Performance" />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Use caching for large schema sets" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Generate types incrementally when possible" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Consider parallel generation for multiple languages" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardHeader title="Maintenance" />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Keep QuickType version updated" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Test generated types with your codebase" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Document any custom generation options" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Supported Languages */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Supported Languages
            </Typography>
            <Typography variant="body1" paragraph>
              QuickType supports a wide range of programming languages and frameworks.
            </Typography>
            
            <Grid container spacing={2}>
              {[
                'TypeScript/JavaScript', 'Python', 'Go', 'C#', 'Java', 'Rust',
                'Swift', 'Kotlin', 'PHP', 'Ruby', 'Dart', 'Elm', 'Haskell',
                'Objective-C', 'C++', 'C', 'Scala', 'Clojure', 'F#'
              ].map((lang) => (
                <Grid item key={lang}>
                  <Chip label={lang} variant="outlined" />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Resources */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Resources
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="QuickType Documentation"
                  secondary="https://quicktype.io/docs"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="GitHub Repository"
                  secondary="https://github.com/quicktype/quicktype"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="OriginVault Schema Registry"
                  secondary="https://schemas.originvault.box"
                />
              </ListItem>
            </List>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  )
}

export default QuickTypeGuide 