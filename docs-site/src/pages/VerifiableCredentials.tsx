import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Verified as VerifiedIcon,
  Code as CodeIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

interface VCSchema {
  id: string;
  title: string;
  description?: string;
  category: string;
  schema: any;
  contexts: string[];
}

interface ValidationResult {
  valid: boolean;
  errors: Array<{
    message: string;
    path?: string;
    value?: any;
  }>;
  warnings: Array<{
    message: string;
  }>;
}

// Tab mapping for URL routing
const TAB_ROUTES = {
  'validate': 0,
  'create': 1,
  'verify': 2,
  'browse': 3
} as const;

const TAB_PATHS = ['validate', 'create', 'verify', 'browse'] as const;

const VerifiableCredentials: React.FC = () => {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: string }>();
  
  // Determine current tab from URL
  const currentTab = tab ? (TAB_ROUTES[tab as keyof typeof TAB_ROUTES] ?? 0) : 0;
  
  const [vcSchemas, setVcSchemas] = useState<VCSchema[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string>('');
  const [credential, setCredential] = useState<string>('');
  const [presentation, setPresentation] = useState<string>('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<any>(null);
  
  // Form fields for template creation
  const [issuer, setIssuer] = useState('did:example:issuer123');
  const [subject, setSubject] = useState('{}');
  
  // Debug logging for subject state changes
  useEffect(() => {
    console.log('Subject state changed:', subject);
  }, [subject]);
  
  // Handle tab navigation
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const tabPath = TAB_PATHS[newValue];
    navigate(`/verifiable-credentials/${tabPath}`);
  };

  // Handle redirects in useEffect to avoid infinite render loops
  useEffect(() => {
    if (!tab) {
      navigate('/verifiable-credentials/validate', { replace: true });
      return;
    }
    
    if (!(tab in TAB_ROUTES)) {
      navigate('/verifiable-credentials/validate', { replace: true });
      return;
    }
  }, [tab, navigate]);

  useEffect(() => {
    loadVCSchemas();
  }, []);
  
  const loadVCSchemas = async () => {
    try {
      const response = await fetch('/api/vc/schemas');
      const data = await response.json();
      setVcSchemas(data.schemas || []);
    } catch (error) {
      console.error('Failed to load VC schemas:', error);
    }
  };
  
  const validateCredential = async () => {
    if (!credential.trim()) return;
    
    setLoading(true);
    try {
      // First, try to parse the JSON
      let credentialObj;
      try {
        credentialObj = JSON.parse(credential);
      } catch (jsonError) {
        setValidationResult({
          valid: false,
          errors: [{ message: 'Invalid JSON format. Please check your JSON syntax.' }],
          warnings: []
        });
        setLoading(false);
        return;
      }
      
      // Then make the API call
      const response = await fetch('/api/vc/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: credentialObj,
          schemaId: selectedSchema || undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setValidationResult({
          valid: false,
          errors: [{ message: errorData.error || 'Validation request failed' }],
          warnings: []
        });
        return;
      }
      
      const result = await response.json();
      setValidationResult(result);
    } catch (error) {
      console.error('Validation error:', error);
      setValidationResult({
        valid: false,
        errors: [{ message: 'Network error occurred during validation' }],
        warnings: []
      });
    } finally {
      setLoading(false);
    }
  };
  
  const createTemplate = async () => {
    if (!selectedSchema || !issuer) return;
    
    setLoading(true);
    try {
      // Only parse and send subject if it's meaningful (not empty, not just {}, not just whitespace)
      let subjectObj = undefined;
      if (subject && subject.trim() && subject.trim() !== '{}') {
        try {
          const parsed = JSON.parse(subject);
          // Check if parsed object has meaningful content
          if (typeof parsed === 'object' && Object.keys(parsed).length > 0) {
            subjectObj = parsed;
          }
        } catch (error) {
          console.warn('Invalid JSON in subject field, using generated template instead');
        }
      }
      
      const response = await fetch('/api/vc/create-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemaId: selectedSchema,
          issuer,
          subject: subjectObj
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to create template');
      }
      
      const templateData = await response.json();
      console.log('Template API Response:', templateData);
      console.log('Template credentialSubject:', templateData?.template?.credentialSubject);
      
      setTemplate(templateData);
      setCredential(JSON.stringify(templateData, null, 2));
      
      // Also populate the subject field with the generated credential subject for easy editing
      if (templateData.template && templateData.template.credentialSubject) {
        const subjectJson = JSON.stringify(templateData.template.credentialSubject, null, 2);
        console.log('Setting subject to:', subjectJson);
        setSubject(subjectJson);
      } else {
        console.warn('No credentialSubject found in template data:', templateData);
        // Reset to default if template generation didn't work as expected
        setSubject('{}');
      }
    } catch (error) {
      console.error('Failed to create template:', error);
      // Reset to default on error
      setSubject('{}');
    } finally {
      setLoading(false);
    }
  };
  
  const verifyPresentation = async () => {
    if (!presentation.trim()) return;
    
    setLoading(true);
    try {
      // First, try to parse the JSON
      let presentationObj;
      try {
        presentationObj = JSON.parse(presentation);
      } catch (jsonError) {
        setValidationResult({
          valid: false,
          errors: [{ message: 'Invalid JSON format. Please check your JSON syntax.' }],
          warnings: []
        });
        setLoading(false);
        return;
      }
      
      // Then make the API call
      const response = await fetch('/api/vc/verify-presentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presentation: presentationObj })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setValidationResult({
          valid: false,
          errors: [{ message: errorData.error || 'Verification request failed' }],
          warnings: []
        });
        return;
      }
      
      const result = await response.json();
      setValidationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      setValidationResult({
        valid: false,
        errors: [{ message: 'Network error occurred during verification' }],
        warnings: []
      });
    } finally {
      setLoading(false);
    }
  };
  
  const downloadCredential = () => {
    if (!credential) return;
    
    const blob = new Blob([credential], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSchema || 'credential'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const renderValidationResults = (result: ValidationResult) => (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {result.valid ? (
            <CheckIcon color="success" sx={{ mr: 1 }} />
          ) : (
            <ErrorIcon color="error" sx={{ mr: 1 }} />
          )}
          <Typography variant="h6">
            Validation {result.valid ? 'Passed' : 'Failed'}
          </Typography>
        </Box>
        
        {result.errors.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="error" gutterBottom>
              Errors:
            </Typography>
            <List dense>
              {result.errors.map((error, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={error.message}
                    secondary={error.path && `Path: ${error.path}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {result.warnings.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="warning.main" gutterBottom>
              Warnings:
            </Typography>
            <List dense>
              {result.warnings.map((warning, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={warning.message} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // Don't render main content if we don't have a valid tab (during redirects)
  if (!tab || !(tab in TAB_ROUTES)) {
    return <Box sx={{ py: 4 }}><CircularProgress /></Box>;
  }
  
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Verifiable Credentials
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Work with W3C Verifiable Credentials and JSON-LD schemas. Validate credentials, 
        create templates, and verify presentations using OriginVault's comprehensive VC support.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Validate Credential" />
          <Tab label="Create Template" />
          <Tab label="Verify Presentation" />
          <Tab label="Browse Schemas" />
        </Tabs>
      </Box>
      
      {/* Validate Credential Tab */}
      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Credential Input
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Schema (Optional)</InputLabel>
                  <Select
                    value={selectedSchema}
                    onChange={(e) => setSelectedSchema(e.target.value)}
                    label="Schema (Optional)"
                  >
                    <MenuItem value="">
                      <em>Auto-detect schema</em>
                    </MenuItem>
                    {vcSchemas.map((schema) => (
                      <MenuItem key={schema.id} value={schema.id}>
                        {schema.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder="Paste your Verifiable Credential JSON here..."
                  variant="outlined"
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={validateCredential}
                    disabled={loading || !credential.trim()}
                    startIcon={loading ? <CircularProgress size={20} /> : <VerifiedIcon />}
                  >
                    Validate
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={downloadCredential}
                    disabled={!credential.trim()}
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Validation Results
                </Typography>
                
                {validationResult ? (
                  renderValidationResults(validationResult)
                ) : (
                  <Alert severity="info">
                    Enter a credential and click "Validate" to see results.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Create Template Tab */}
      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Template Configuration
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Credential Schema *</InputLabel>
                  <Select
                    value={selectedSchema}
                    onChange={(e) => setSelectedSchema(e.target.value)}
                    label="Credential Schema *"
                    required
                  >
                    {vcSchemas.map((schema) => (
                      <MenuItem key={schema.id} value={schema.id}>
                        {schema.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  label="Issuer DID *"
                  placeholder="did:example:issuer123"
                  sx={{ mb: 2 }}
                  required
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  label="Credential Subject (JSON)"
                  placeholder="{}"
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />
                
                <Button
                  variant="contained"
                  onClick={createTemplate}
                  disabled={loading || !selectedSchema || !issuer}
                  startIcon={loading ? <CircularProgress size={20} /> : <CodeIcon />}
                  fullWidth
                >
                  Generate Template
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Generated Template
                </Typography>
                
                {template ? (
                  <Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={15}
                      value={JSON.stringify(template, null, 2)}
                      variant="outlined"
                      sx={{ fontFamily: 'monospace' }}
                      InputProps={{ readOnly: true }}
                    />
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setCredential(JSON.stringify(template, null, 2))}
                        startIcon={<CodeIcon />}
                      >
                        Use in Validator
                      </Button>
                      
                      <Button
                        variant="outlined"
                        onClick={downloadCredential}
                        startIcon={<DownloadIcon />}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Alert severity="info">
                    Configure the template settings and click "Generate Template".
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Verify Presentation Tab */}
      {currentTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Verifiable Presentation
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={15}
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                  placeholder="Paste your Verifiable Presentation JSON here..."
                  variant="outlined"
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />
                
                <Button
                  variant="contained"
                  onClick={verifyPresentation}
                  disabled={loading || !presentation.trim()}
                  startIcon={loading ? <CircularProgress size={20} /> : <VerifiedIcon />}
                  fullWidth
                >
                  Verify Presentation
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Verification Results
                </Typography>
                
                {validationResult ? (
                  renderValidationResults(validationResult)
                ) : (
                  <Alert severity="info">
                    Enter a presentation and click "Verify Presentation" to see results.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Browse Schemas Tab */}
      {currentTab === 3 && (
        <Grid container spacing={3}>
          {vcSchemas.map((schema) => (
            <Grid item xs={12} md={6} key={schema.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {schema.title}
                    </Typography>
                    <Chip label={schema.category} size="small" variant="outlined" />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {schema.description || 'No description available.'}
                  </Typography>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2">Schema Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" display="block" gutterBottom>
                        Contexts:
                      </Typography>
                      {schema.contexts.map((context, index) => (
                        <Chip 
                          key={index} 
                          label={context} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedSchema(schema.id);
                          navigate('/verifiable-credentials/create');
                        }}
                      >
                        Create Template
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Info Section */}
      <Card sx={{ mt: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About W3C Verifiable Credentials
          </Typography>
          <Typography variant="body2" paragraph>
            Verifiable Credentials are a W3C standard for expressing credentials on the web 
            in a way that is cryptographically secure, privacy respecting, and machine-verifiable.
          </Typography>
          <Typography variant="body2">
            OriginVault's implementation supports the full W3C VC specification with JSON-LD 
            contexts, proof mechanisms, and presentation protocols.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifiableCredentials; 