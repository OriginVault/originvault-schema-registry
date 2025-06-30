import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  // List,
  // ListItem,
  // ListItemText,
  // ListItemSecondaryAction,
  // IconButton,
  // FormControlLabel,
  // Switch
} from '@mui/material';
import {
  Search as SearchIcon,
  Verified as VerifiedIcon,
  FileCopy as FileCopyIcon,
  // Download as DownloadIcon,
  // Delete as DeleteIcon
} from '@mui/icons-material';
import { schemaService } from '../services/schemaService';

// Helper function to get API base URL
const getApiBaseUrl = () => {

  return (import.meta as any).env.VITE_API_URL || '/api';
};

const Explorer: React.FC = () => {
  const [schemas, setSchemas] = useState<any[]>([]);
  const [filteredSchemas, setFilteredSchemas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSchema, setSelectedSchema] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [testData, setTestData] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  // Load schemas from registry
  useEffect(() => {
    const loadSchemas = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        // Load from multiple sources as per ADR 0086
        const [originVaultSchemas, openVerifiableSchemas, difSchemas] = await Promise.all([
          fetch(`${apiBaseUrl}/schemas/originvault`).then(r => r.json()),
          fetch(`${apiBaseUrl}/schemas/open-verifiable`).then(r => r.json()),
          fetch(`${apiBaseUrl}/schemas/dif`).then(r => r.json())
        ]);

        const allSchemas = [
          ...originVaultSchemas.map((s: any) => ({ ...s, source: 'OriginVault' })),
          ...openVerifiableSchemas.map((s: any) => ({ ...s, source: 'Open Verifiable' })),
          ...difSchemas.map((s: any) => ({ ...s, source: 'DIF' }))
        ];

        setSchemas(allSchemas);
        setFilteredSchemas(allSchemas);
      } catch (error) {
        console.error('Failed to load schemas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchemas();
  }, []);

  // Filter schemas based on search and category
  useEffect(() => {
    let filtered = schemas;

    if (searchTerm) {
      filtered = filtered.filter(schema => 
        schema.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schema.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schema.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(schema => schema.category === selectedCategory);
    }

    setFilteredSchemas(filtered);
  }, [searchTerm, selectedCategory, schemas]);

  // Real-time validation
  const validateTestData = async (schema: any, data: string) => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema, data: JSON.parse(data) })
      });
      
      const result = await response.json();
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [{ message: 'Invalid JSON or validation error' }]
      });
    }
  };

  // Generate code using QuickType
  const generateCode = async (schema: any, language: string) => {
    try {
      const code = await schemaService.generateQuickTypeCode(schema, language);
      // Open in new tab or download
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${schema.title}.${getFileExtension(language)}`;
      a.click();
    } catch (error) {
      console.error('Code generation failed:', error);
    }
  };

  const getFileExtension = (language: string) => {
    const extensions: Record<string, string> = {
      typescript: 'ts',
      python: 'py',
      go: 'go',
      csharp: 'cs',
      java: 'java',
      rust: 'rs'
    };
    return extensions[language] || 'txt';
  };

  const categories = ['all', 'identity', 'business', 'content', 'trust', 'payments', 'platform'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Schema Explorer
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore, validate, and generate code from our comprehensive schema registry.
      </Typography>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search schemas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Schema List */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" gutterBottom>
            Available Schemas ({filteredSchemas.length})
          </Typography>
          
          <Box sx={{ maxHeight: '600px', overflow: 'auto' }}>
            {filteredSchemas.map((schema, index) => (
              <Card 
                key={index} 
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  border: selectedSchema?.id === schema.id ? 2 : 1,
                  borderColor: selectedSchema?.id === schema.id ? 'primary.main' : 'divider'
                }}
                onClick={() => setSelectedSchema(schema)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" component="h3">
                      {schema.title}
                    </Typography>
                    <Chip 
                      label={schema.source} 
                      size="small" 
                      color={schema.source === 'OriginVault' ? 'primary' : 'secondary'}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {schema.description}
                  </Typography>
                  
                  {schema.tags && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {schema.tags.map((tag: string, tagIndex: number) => (
                        <Chip key={tagIndex} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Schema Details and Tools */}
        <Grid item xs={12} lg={6}>
          {selectedSchema ? (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedSchema.title}
              </Typography>

              <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Schema" />
                <Tab label="Validate" />
                <Tab label="Generate Code" />
              </Tabs>

              {/* Schema View */}
              {activeTab === 0 && (
                <Paper sx={{ p: 3 }}>
                  <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '16px', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    maxHeight: '400px'
                  }}>
                    {JSON.stringify(selectedSchema.schema || selectedSchema, null, 2)}
                  </pre>
                </Paper>
              )}

              {/* Validation */}
              {activeTab === 1 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Test Data Validation
                  </Typography>
                  
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    placeholder="Enter JSON data to validate..."
                    value={testData}
                    onChange={(e) => setTestData(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  
                  <Button
                    variant="contained"
                    onClick={() => validateTestData(selectedSchema, testData)}
                    disabled={!testData.trim()}
                    sx={{ mb: 2 }}
                  >
                    Validate
                  </Button>

                  {validationResult && (
                    <Alert 
                      severity={validationResult.valid ? 'success' : 'error'}
                      icon={validationResult.valid ? <VerifiedIcon /> : undefined}
                    >
                      {validationResult.valid ? (
                        'Data is valid!'
                      ) : (
                        <Box>
                          <Typography variant="subtitle2">Validation Errors:</Typography>
                          {validationResult.errors?.map((error: any, i: number) => (
                            <Typography key={i} variant="body2">
                              • {error.message}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Alert>
                  )}
                </Paper>
              )}

              {/* Code Generation */}
              {activeTab === 2 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Generate Type-Safe Code
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {['TypeScript', 'Python', 'Go', 'C#', 'Java', 'Rust'].map((language) => (
                      <Grid item xs={6} sm={4} key={language}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<FileCopyIcon />}
                          onClick={() => generateCode(selectedSchema, language.toLowerCase())}
                        >
                          {language}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    Click any language to download generated type definitions using QuickType.
                  </Alert>
                </Paper>
              )}
            </>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Select a schema to explore its details
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Explorer; 