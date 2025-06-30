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
  ListItemIcon,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Stepper,
  // Step,
  // StepLabel,
  // StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Verified as VerifiedIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  // Lock as LockIcon,
  // Key as KeyIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { vcApi, VCSchema as VCSchemaType } from '../api/vcApi';

interface VCSchema extends VCSchemaType {
  // Extend with any additional properties if needed
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
  'guide': 0,
  'validate': 1,
  'create': 2,
  'verify': 3,
  'browse': 4
} as const;

const TAB_PATHS = ['guide', 'validate', 'create', 'verify', 'browse'] as const;

// Helper function to get API base URL
const getApiBaseUrl = () => {
  return (import.meta as any).env.VITE_API_URL || '/api';
};

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
  const [trustRegistryResult, setTrustRegistryResult] = useState<any>(null);
  const [schemaDetailsOpen, setSchemaDetailsOpen] = useState(false);
  const [selectedSchemaForDetails, setSelectedSchemaForDetails] = useState<VCSchema | null>(null);
  
  // Form fields for template creation  
  const [issuer, setIssuer] = useState('did:example:issuer123');
  const [subject, setSubject] = useState('{}');
  const [issuerToVerify, setIssuerToVerify] = useState('');
  
  // Safe subject setter that validates JSON
  const setSafeSubject = (value: string) => {
    // Prevent obvious corruption patterns
    if (value.match(/^{f+}$/)) {
      // console.warn('Detected corrupted subject value, resetting to {}');
      setSubject('{}');
      return;
    }
    
    // Try to validate JSON if not empty
    if (value.trim() && value !== '{}') {
      try {
        JSON.parse(value);
        setSubject(value);
      } catch {
        // If invalid JSON, keep the current value for editing
        setSubject(value);
      }
    } else {
      setSubject(value);
    }
  };
  
  // Reset subject field when schema changes to prevent corruption
  useEffect(() => {
    if (selectedSchema && subject !== '{}') {
      setSafeSubject('{}');
    }
  }, [selectedSchema, subject]);
  
  // Handle tab navigation
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const tabPath = TAB_PATHS[newValue];
    if (newValue === 0) {
      // Redirect to the comprehensive guide
      navigate('/verifiable-credentials/guide');
    } else {
      navigate(`/verifiable-credentials/${tabPath}`);
    }
  };

  // Handle redirects in useEffect to avoid infinite render loops
  useEffect(() => {
    if (!tab) {
      // Redirect to guide by default
      navigate('/verifiable-credentials/guide', { replace: true });
      return;
    }
    
    if (!(tab in TAB_ROUTES)) {
      navigate('/verifiable-credentials/guide', { replace: true });
      return;
    }
  }, [tab, navigate]);

  useEffect(() => {
    loadVCSchemas();
  }, []);
  
  const loadVCSchemas = async () => {
    try {
      setLoading(true);
      const schemas = await vcApi.getSchemas();
      setVcSchemas(schemas);
    } catch (error) {
      console.error('Failed to load VC schemas:', error);
      setVcSchemas([]);
    } finally {
      setLoading(false);
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
      } catch {
        setValidationResult({
          valid: false,
          errors: [{ message: 'Invalid JSON format. Please check your JSON syntax.' }],
          warnings: []
        });
        setLoading(false);
        return;
      }
      
      // Then make the API call
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/vc/validate`, {
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
      // console.error('Validation error:', error);
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
      
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/vc/create-template`, {
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
        // console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to create template');
      }
      
      const templateData = await response.json();
      
      setTemplate(templateData);
      setCredential(JSON.stringify(templateData, null, 2));
      
      // Also populate the subject field with the generated credential subject for easy editing
      if (templateData.template && templateData.template.credentialSubject) {
        const subjectJson = JSON.stringify(templateData.template.credentialSubject, null, 2);
        // Only update if the value is different to prevent loops
        if (subjectJson !== subject) {
          setSafeSubject(subjectJson);
        }
      } else {
        // console.warn('No credentialSubject found in template data:', templateData);
        // Reset to default if template generation didn't work as expected
        if (subject !== '{}') {
          setSafeSubject('{}');
        }
      }
    } catch (error) {
      // console.error('Failed to create template:', error);
      // Reset to default on error only if different
      if (subject !== '{}') {
        setSafeSubject('{}');
      }
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
      } catch {
        setValidationResult({
          valid: false,
          errors: [{ message: 'Invalid JSON format. Please check your JSON syntax.' }],
          warnings: []
        });
        setLoading(false);
        return;
      }
      
      // Then make the API call
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/vc/verify-presentation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentation: presentationObj
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setValidationResult({
          valid: false,
          errors: [{ message: errorData.error || 'Verification failed' }],
          warnings: []
        });
      } else {
      const result = await response.json();
      setValidationResult(result);
      }
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [{ message: 'Network error during verification' }],
        warnings: []
      });
    } finally {
      setLoading(false);
    }
  };
  
  const verifyIssuerTrust = async () => {
    if (!issuerToVerify.trim()) return;
    
    setLoading(true);
    try {
      // Try to verify issuer in trust registry
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/trust/verify-issuer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issuerDID: issuerToVerify
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setTrustRegistryResult(result);
      } else {
        setTrustRegistryResult({
          trusted: false,
          error: 'Issuer not found in trust registry'
        });
      }
    } catch (error) {
      setTrustRegistryResult({
        trusted: false,
        error: 'Network error during trust verification'
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
    <Box sx={{ mt: 2 }}>
      <Alert 
        severity={result.valid ? 'success' : 'error'} 
        icon={result.valid ? <CheckIcon /> : <ErrorIcon />}
        sx={{ mb: 2 }}
      >
          <Typography variant="h6">
          {result.valid ? 'Credential is Valid' : 'Validation Failed'}
          </Typography>
      </Alert>
        
        {result.errors.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="error">
              Errors ({result.errors.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {result.errors.map((error, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={error.message}
                    secondary={error.path && `Path: ${error.path}`}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        )}
        
        {result.warnings.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="warning.main">
              Warnings ({result.warnings.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {result.warnings.map((warning, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={warning.message} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );

  const renderSchemaBrowser = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Schema Registry Browser
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Browse and explore the schemas in our registry. Each schema defines the structure and validation rules for different types of verifiable credentials.
      </Typography>
      
      <Grid container spacing={2}>
        {vcSchemas.map((schema) => (
          <Grid item xs={12} md={6} key={schema.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {schema.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {schema.description || 'No description available'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    label={schema.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`ID: ${schema.id}`} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => {
                      setSelectedSchema(schema.id);
                      navigate('/verifiable-credentials/create');
                    }}
                  >
                    Use Schema
                  </Button>
                  <Button 
                    size="small" 
                    variant="text"
                    onClick={() => {
                      setSelectedSchemaForDetails(schema);
                      setSchemaDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </Box>
      </CardContent>
    </Card>
          </Grid>
        ))}
      </Grid>
      
      {vcSchemas.length === 0 && (
        <Alert severity="info">
          <Typography variant="body2">
            Loading schemas from registry...
          </Typography>
        </Alert>
      )}
      
      <Box sx={{ mt: 3 }}>
        <Button 
          variant="outlined" 
          href="https://originvault.box"
          target="_blank"
          startIcon={<CodeIcon />}
        >
          Browse All Schemas
        </Button>
      </Box>
    </Box>
  );

  // Don't render main content if we don't have a valid tab (during redirects)
  if (!tab || !(tab in TAB_ROUTES)) {
    return <Box sx={{ py: 4 }}><CircularProgress /></Box>;
  }
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Quick Start Section - Prominent placement */}
      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🚀 Verifiable Credentials Tools
          </Typography>
          <Typography variant="body1" paragraph>
            Choose a tool to get started immediately, or explore the guide for detailed explanations.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="inherit"
              onClick={() => navigate('/verifiable-credentials/validate')}
              startIcon={<VerifiedIcon />}
            >
              Validate Credentials
            </Button>
            <Button 
              variant="contained" 
              color="inherit"
              onClick={() => navigate('/verifiable-credentials/create')}
              startIcon={<CodeIcon />}
            >
              Create Credentials
            </Button>
            <Button 
              variant="contained" 
              color="inherit"
              onClick={() => navigate('/verifiable-credentials/verify')}
              startIcon={<SecurityIcon />}
            >
              Verify Credentials
            </Button>
            <Button 
              variant="contained" 
              color="inherit"
              onClick={() => navigate('/verifiable-credentials/browse')}
              startIcon={<DescriptionIcon />}
            >
              Browse Schemas
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={() => navigate('/verifiable-credentials/guide')}
              startIcon={<SchoolIcon />}
            >
              View Guide
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Main Content Area */}
        <Box sx={{ flex: 1 }}>
          <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Guide" />
            <Tab label="Validate" />
            <Tab label="Create" />
            <Tab label="Verify" />
            <Tab label="Browse" />
          </Tabs>
          
          {/* Show main header for tool tabs */}
          {currentTab !== 0 && (
            <>
              <Typography variant="h3" component="h1" gutterBottom>
                Verifiable Credentials
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                Work with W3C Verifiable Credentials and JSON-LD schemas. Validate credentials, 
                create templates, and verify presentations using OriginVault's comprehensive VC support.
              </Typography>
            </>
          )}
          
          {/* Guide Tab - redirect to comprehensive guide */}
          {currentTab === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h4" gutterBottom>
                Redirecting to Comprehensive Guide...
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                The guide content has been moved to a dedicated page with enhanced navigation and detailed explanations.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/verifiable-credentials/guide')}
                startIcon={<SchoolIcon />}
              >
                Go to Guide
              </Button>
            </Box>
          )}
          
          {/* Validate Credential Tab */}
          {currentTab === 1 && (
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
          {currentTab === 2 && (
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
                      onChange={(e) => setSafeSubject(e.target.value)}
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
          {currentTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Verify Credentials & Trust
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Verify verifiable presentations and check issuer trust in our registry.
              </Typography>
              
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                    Verify Presentation
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                    rows={8}
                    label="Verifiable Presentation (JSON)"
                      value={presentation}
                      onChange={(e) => setPresentation(e.target.value)}
                    placeholder="Paste your verifiable presentation JSON here..."
                    sx={{ mb: 2 }}
                    />
                    
                    <Button
                      variant="contained"
                      onClick={verifyPresentation}
                    disabled={!presentation.trim() || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SecurityIcon />}
                    fullWidth
                    sx={{ mb: 3 }}
                  >
                    {loading ? 'Verifying...' : 'Verify Presentation'}
                  </Button>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Verify Issuer Trust
                  </Typography>
                  <TextField
                    fullWidth
                    label="Issuer DID"
                    value={issuerToVerify}
                    onChange={(e) => setIssuerToVerify(e.target.value)}
                    placeholder="did:cheqd:mainnet:zISSUER123"
                    sx={{ mb: 2 }}
                  />
                  
                  <Button
                    variant="outlined"
                    onClick={verifyIssuerTrust}
                    disabled={!issuerToVerify.trim() || loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <VerifiedIcon />}
                      fullWidth
                    >
                    {loading ? 'Checking...' : 'Check Trust Registry'}
                    </Button>
              </Grid>
              
              <Grid item xs={12} md={6}>
                  {validationResult && (
                    <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Presentation Verification Results
                    </Typography>
                      {renderValidationResults(validationResult)}
                    </Box>
                  )}
                  
                  {trustRegistryResult && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Trust Registry Results
                      </Typography>
                      <Alert 
                        severity={trustRegistryResult.trusted ? 'success' : 'error'} 
                        icon={trustRegistryResult.trusted ? <VerifiedIcon /> : <ErrorIcon />}
                        sx={{ mb: 2 }}
                      >
                        <Typography variant="h6">
                          {trustRegistryResult.trusted ? 'Issuer is Trusted' : 'Issuer Not Trusted'}
                        </Typography>
                        {trustRegistryResult.error && (
                          <Typography variant="body2">
                            {trustRegistryResult.error}
                          </Typography>
                        )}
                      </Alert>
                      
                      {trustRegistryResult.trusted && trustRegistryResult.details && (
                        <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Trust Details:
                          </Typography>
                          <Typography variant="body2">
                            <strong>Issuer:</strong> {trustRegistryResult.details.issuer}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Trust Level:</strong> {trustRegistryResult.details.trustLevel}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Accredited Since:</strong> {trustRegistryResult.details.accreditedSince}
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  )}
                  
                  {!validationResult && !trustRegistryResult && (
                      <Alert severity="info">
                      <Typography variant="body2">
                        Use the tools on the left to verify presentations and check issuer trust.
                      </Typography>
                      </Alert>
                    )}
              </Grid>
            </Grid>
            </Box>
          )}
          
          {/* Browse Schemas Tab */}
          {currentTab === 4 && renderSchemaBrowser()}
        </Box>
        
        {/* Schema Details Modal */}
        <Dialog 
          open={schemaDetailsOpen} 
          onClose={() => setSchemaDetailsOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6">
              {selectedSchemaForDetails?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Schema ID: {selectedSchemaForDetails?.id}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedSchemaForDetails && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  {selectedSchemaForDetails.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Schema Definition
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                    {JSON.stringify(selectedSchemaForDetails.schema, null, 2)}
                  </pre>
                </Paper>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  JSON-LD Contexts
                </Typography>
                <List dense>
                  {selectedSchemaForDetails.contexts.map((context, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={
                          <a 
                            href={context} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {context}
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Usage Examples
                </Typography>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="subtitle1">Basic Credential Structure</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`{
  "@context": ${JSON.stringify(selectedSchemaForDetails.contexts, null, 2)},
  "id": "urn:uuid:${selectedSchemaForDetails.id.toLowerCase()}-example",
  "type": ["VerifiableCredential", "${selectedSchemaForDetails.id}"],
  "issuer": "did:example:issuer123",
  "issuanceDate": "2024-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:subject123",
    // Add schema-specific properties here
  }
}`}
                      </pre>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="subtitle1">SDK Usage</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`// Using @originvault/ov-id-sdk
import { createOVAgent } from '@originvault/ov-id-sdk';

const agent = createOVAgent({ /* config */ });

const credential = {
  "@context": ${JSON.stringify(selectedSchemaForDetails.contexts, null, 2)},
  "type": ["VerifiableCredential", "${selectedSchemaForDetails.id}"],
  "issuer": issuerDID,
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": {
    "id": subjectDID,
    // Add your credential data here
  }
};

const verifiableCredential = await agent.createVerifiableCredential({
  credential,
  format: 'jwt'
});`}
                      </pre>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="subtitle1">CLI Usage</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`# Create credential using ov-id-cli
ov-id create-credential \\
  --type "${selectedSchemaForDetails.id}" \\
  --issuer did:example:issuer123 \\
  --subject '{"id": "did:example:subject123"}' \\
  --output credential.json

# Verify credential
ov-id verify-credential credential.json`}
                      </pre>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSchemaDetailsOpen(false)}>
              Close
            </Button>
            <Button 
              variant="contained" 
              onClick={() => {
                setSchemaDetailsOpen(false);
                navigate('/verifiable-credentials/create');
                setSelectedSchema(selectedSchemaForDetails?.id || '');
              }}
            >
              Use This Schema
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VerifiableCredentials; 