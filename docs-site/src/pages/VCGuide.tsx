/* global HTMLDivElement */
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  Tooltip,
  // Collapse,
  Drawer,
  Tabs,
  Tab
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Build as BuildIcon,
  Verified as VerifiedIcon,
  Lock as LockIcon,
  Description as DescriptionIcon,
  Key as KeyIcon,
  QrCode as QrCodeIcon,
  Smartphone as SmartphoneIcon,
  Link as LinkIcon,
  Menu as MenuIcon,
  // Home as HomeIcon,
  // Book as BookIcon,
  // Settings as SettingsIcon,
  // Shield as ShieldIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VCGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const keyConceptsRef = useRef<HTMLDivElement>(null);
  const technicalStandardsRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const securityPrivacyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      label: 'What are Verifiable Credentials?',
      description: 'Understanding the fundamental concepts and benefits',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Verifiable Credentials (VCs) are a W3C standard for expressing credentials on the web 
            in a way that is cryptographically secure, privacy-respecting, and machine-verifiable.
          </Typography>
          <Typography variant="body1" paragraph>
            Think of them as digital versions of physical credentials like driver's licenses, 
            university degrees, or professional certifications, but with enhanced security and privacy features.
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Key Benefits:</strong> Tamper-proof, privacy-preserving, instantly verifiable, 
              and interoperable across different systems and organizations.
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      label: 'Core Components',
      description: 'The essential parts that make up a verifiable credential',
      content: (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <VerifiedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Credential Subject
                  </Typography>
                  <Typography variant="body2">
                    The entity (person, organization, or thing) that the credential is about. 
                    Contains claims or attributes about the subject.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <KeyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Issuer
                  </Typography>
                  <Typography variant="body2">
                    The entity that issued the credential. Must be cryptographically verifiable 
                    and trusted by the verifier.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LockIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Proof
                  </Typography>
                  <Typography variant="body2">
                    Cryptographic proof that verifies the authenticity and integrity of the credential. 
                    Usually a digital signature.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Schema
                  </Typography>
                  <Typography variant="body2">
                    Defines the structure and validation rules for the credential. Ensures 
                    consistency and interoperability.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: 'Credential Structure',
      description: 'Understanding the JSON-LD structure of verifiable credentials',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Basic Verifiable Credential Structure
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "http://example.edu/credentials/3732",
  "type": ["VerifiableCredential", "UniversityDegreeCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "degree": {
      "type": "BachelorDegree",
      "name": "Bachelor of Science and Arts"
    }
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2017-06-18T21:19:10Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://example.edu/issuers/565049#key-1",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..."
  }
}`}
            </pre>
          </Paper>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Key Fields Explained
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Purpose</strong></TableCell>
                  <TableCell><strong>Example</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>@context</TableCell>
                  <TableCell>Defines the vocabulary and data model</TableCell>
                  <TableCell>["https://www.w3.org/2018/credentials/v1"]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>type</TableCell>
                  <TableCell>Specifies the credential type</TableCell>
                  <TableCell>["VerifiableCredential", "UniversityDegreeCredential"]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>issuer</TableCell>
                  <TableCell>Who issued the credential</TableCell>
                  <TableCell>"https://example.edu/issuers/565049"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>credentialSubject</TableCell>
                  <TableCell>The subject and their claims</TableCell>
                  <TableCell>{"{id: 'did:...', degree: {...}}"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>proof</TableCell>
                  <TableCell>Cryptographic proof of authenticity</TableCell>
                  <TableCell>{"{type: 'Ed25519Signature2018', ...}"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )
    },
    {
      label: 'Verifiable Presentations',
      description: 'How credentials are shared and verified',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            What is a Verifiable Presentation?
          </Typography>
          <Typography variant="body1" paragraph>
            A Verifiable Presentation is a way to share one or more verifiable credentials 
            with a verifier while maintaining privacy and security.
          </Typography>
          
          <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "type": ["VerifiablePresentation"],
  "verifiableCredential": [
    {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "id": "http://example.edu/credentials/3732",
      "type": ["VerifiableCredential", "UniversityDegreeCredential"],
      "issuer": "https://example.edu/issuers/565049",
      "issuanceDate": "2010-01-01T19:23:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "degree": {
          "type": "BachelorDegree",
          "name": "Bachelor of Science and Arts"
        }
      },
      "proof": {
        "type": "Ed25519Signature2018",
        "created": "2017-06-18T21:19:10Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.edu/issuers/565049#key-1",
        "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..."
      }
    }
  ],
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2019-12-11T03:50:55Z",
    "proofPurpose": "authentication",
    "verificationMethod": "did:example:ebfeb1f712ebc6f1c276e12ec21#key-1",
    "challenge": "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
    "domain": "https://client.example.org/cb",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..."
  }
}`}
            </pre>
          </Paper>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Privacy Features:</strong> Presentations can include selective disclosure, 
              allowing users to share only specific parts of their credentials.
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      label: 'Implementation Workflow',
      description: 'The complete lifecycle of verifiable credentials',
      content: (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <BuildIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    1. Schema Definition
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Define the structure and validation rules for your credential type.
                  </Typography>
                  <Typography variant="body2">
                    • Specify required and optional fields<br/>
                    • Define data types and constraints<br/>
                    • Create JSON-LD context
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <KeyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    2. Issuer Setup
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Establish the issuing entity with cryptographic keys.
                  </Typography>
                  <Typography variant="body2">
                    • Generate cryptographic key pairs<br/>
                    • Create issuer DID<br/>
                    • Register verification methods
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <VerifiedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    3. Credential Issuance
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Create and sign credentials for subjects.
                  </Typography>
                  <Typography variant="body2">
                    • Collect subject data<br/>
                    • Create credential structure<br/>
                    • Sign with issuer's private key
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <QrCodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    4. Credential Storage
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Store credentials securely in digital wallets.
                  </Typography>
                  <Typography variant="body2">
                    • Use secure digital wallet<br/>
                    • Enable backup and recovery<br/>
                    • Maintain privacy controls
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <SmartphoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    5. Presentation Creation
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Create presentations for specific verification requests.
                  </Typography>
                  <Typography variant="body2">
                    • Select relevant credentials<br/>
                    • Apply selective disclosure<br/>
                    • Sign presentation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    6. Verification
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Verify the authenticity and validity of credentials.
                  </Typography>
                  <Typography variant="body2">
                    • Verify cryptographic proofs<br/>
                    • Check issuer trust<br/>
                    • Validate against schema
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    }
  ];

  // Add back scroll into view functionality
  useEffect(() => {
    if (stepRefs.current[activeStep]) {
      stepRefs.current[activeStep]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeStep]);

  return (
    <>
      {/* Right Sidebar Navigation */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Navigation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => setActiveStep(0)}
            >
              Fundamentals
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => setActiveStep(1)}
            >
              Components
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => setActiveStep(2)}
            >
              Structure
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => setActiveStep(3)}
            >
              Presentations
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => setActiveStep(4)}
            >
              Workflow
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => scrollToSection(keyConceptsRef)}
            >
              Key Concepts
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => scrollToSection(technicalStandardsRef)}
            >
              Technical Standards
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => scrollToSection(useCasesRef)}
            >
              Common Use Cases
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="small"
              onClick={() => scrollToSection(securityPrivacyRef)}
            >
              Security & Privacy
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ py: 4 }}>
        {/* Navigation Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={0} 
            onChange={(_, newValue) => {
              if (newValue === 0) {
                // Stay on guide
                return;
              }
              const tabPaths = ['guide', 'validate', 'create', 'verify', 'browse'];
              navigate(`/verifiable-credentials/${tabPaths[newValue]}`);
            }}
            sx={{ mb: 3 }}
          >
            <Tab label="Guide" />
            <Tab label="Validate" />
            <Tab label="Create" />
            <Tab label="Verify" />
            <Tab label="Browse" />
          </Tabs>
        </Box>

        {/* Floating Menu Button */}
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <Tooltip title="Open Navigation">
            <IconButton 
              onClick={() => setSidebarOpen(true)}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Call to Action - Moved to top for immediate access */}
        <Card sx={{ mb: 4, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🚀 Ready to Get Started?
            </Typography>
            <Typography variant="body1" paragraph>
              Jump straight into our tools and start working with verifiable credentials right away. 
              The guide below is available as a reference when you need it.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <Button 
                variant="contained" 
                color="inherit"
                size="large"
                href="/verifiable-credentials/validate"
                sx={{ minWidth: 200 }}
              >
                🔍 Validate Credentials
              </Button>
              <Button 
                variant="contained" 
                color="inherit"
                size="large"
                href="/verifiable-credentials/create"
                sx={{ minWidth: 200 }}
              >
                ✨ Create Credentials
              </Button>
              <Button 
                variant="contained" 
                color="inherit"
                size="large"
                href="/verifiable-credentials/verify"
                sx={{ minWidth: 200 }}
              >
                ✅ Verify Credentials
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                color="inherit"
                href="https://originvault.box"
                target="_blank"
                startIcon={<CodeIcon />}
              >
                Developer Portal
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                href="https://github.com/originvault/ov-id-cli"
                target="_blank"
                startIcon={<CodeIcon />}
              >
                CLI Tools
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                href="https://github.com/originvault/ov-id-sdk"
                target="_blank"
                startIcon={<CodeIcon />}
              >
                SDK Documentation
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h3" component="h1" gutterBottom>
          How Verifiable Credentials Work
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          A comprehensive guide to understanding, implementing, and using W3C Verifiable Credentials 
          for secure, privacy-preserving digital identity and credential management. 
          <strong>This guide is available as a reference - feel free to explore the tools above first!</strong>
        </Typography>

        {/* Interactive Stepper */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} ref={(el) => (stepRefs.current[index] = el)}>
                  <StepLabel
                    optional={
                      <Typography variant="caption" color="text.secondary">
                        {step.description}
                      </Typography>
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      {step.content}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(index + 1)}
                        disabled={index === steps.length - 1}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={() => setActiveStep(index - 1)}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Detailed Sections */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card ref={keyConceptsRef}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Key Concepts
                </Typography>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Decentralized Identity (DID)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Decentralized Identifiers (DIDs) are a new type of identifier that enables 
                      verifiable, self-sovereign digital identity. DIDs are fully under the control 
                      of the DID subject, independent from any centralized registry, identity provider, 
                      or certificate authority.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Selective Disclosure</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      The ability to share only specific parts of a credential while keeping other 
                      information private. This enables privacy-preserving verification scenarios.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Zero-Knowledge Proofs</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Cryptographic methods that allow proving a statement is true without revealing 
                      any additional information beyond the validity of the statement itself.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card ref={technicalStandardsRef}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Technical Standards
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <a 
                        href="https://www.w3.org/TR/vc-data-model/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <LinkIcon />
                      </a>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <a 
                          href="https://www.w3.org/TR/vc-data-model/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          W3C Verifiable Credentials Data Model
                        </a>
                      }
                      secondary="Core specification for verifiable credentials"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <a 
                        href="https://www.w3.org/TR/did-core/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <LinkIcon />
                      </a>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <a 
                          href="https://www.w3.org/TR/did-core/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          W3C Decentralized Identifiers
                        </a>
                      }
                      secondary="Standard for self-sovereign identifiers"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <a 
                        href="https://www.w3.org/TR/json-ld/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <LinkIcon />
                      </a>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <a 
                          href="https://www.w3.org/TR/json-ld/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          JSON-LD
                        </a>
                      }
                      secondary="Linked data format for credentials"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <a 
                        href="https://identity.foundation/didcomm-messaging/spec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <LinkIcon />
                      </a>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <a 
                          href="https://identity.foundation/didcomm-messaging/spec/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          DIDComm
                        </a>
                      }
                      secondary="Messaging protocol for DIDs"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Use Cases */}
        <Card sx={{ mt: 4 }} ref={useCasesRef}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Common Use Cases
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Education
                    </Typography>
                    <Typography variant="body2">
                      • Academic degrees and certificates<br/>
                      • Professional certifications<br/>
                      • Training completion records<br/>
                      • Skills and competencies
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Healthcare
                    </Typography>
                    <Typography variant="body2">
                      • Medical licenses<br/>
                      • Vaccination records<br/>
                      • Health insurance cards<br/>
                      • Prescription credentials
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Government
                    </Typography>
                    <Typography variant="body2">
                      • Driver's licenses<br/>
                      • Passports<br/>
                      • Tax identification<br/>
                      • Voting credentials
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Employment
                    </Typography>
                    <Typography variant="body2">
                      • Employment verification<br/>
                      • Background checks<br/>
                      • Professional memberships<br/>
                      • Work permits
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Financial
                    </Typography>
                    <Typography variant="body2">
                      • KYC/AML compliance<br/>
                      • Credit scores<br/>
                      • Banking relationships<br/>
                      • Investment qualifications
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      IoT & Supply Chain
                    </Typography>
                    <Typography variant="body2">
                      • Device authentication<br/>
                      • Product provenance<br/>
                      • Quality certifications<br/>
                      • Compliance records
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card sx={{ mt: 4 }} ref={securityPrivacyRef}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Security & Privacy Features
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Security
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Cryptographic signatures ensure authenticity" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Tamper-evident through hash verification" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Revocation mechanisms for compromised credentials" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Time-stamped issuance and expiration" />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  <LockIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Privacy
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="User controls what information to share" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="No central database of personal information" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Selective disclosure capabilities" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Minimal data exposure during verification" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Real Schema Examples */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Real Schema Examples from Our Registry
            </Typography>
            <Typography variant="body1" paragraph>
              Our schema registry contains 80+ schemas covering all aspects of verifiable credentials. 
              Here are some key schemas you'll encounter:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      VaultRoleCredential
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Defines access control roles (owner, editor, viewer) for vaults.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Schema: <code>VaultRoleCredential.schema.json</code>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      PaymentCredential
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Verifies payment completion for content access and services.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Schema: <code>PaymentCredential.schema.json</code>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      TrustedIssuerCredential
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Establishes trust relationships and issuer accreditation.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Schema: <code>TrustedIssuerCredential.schema.json</code>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      ContentAuthenticityAssertionCredential
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Proves content authenticity and C2PA compliance.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Schema: <code>ContentAuthenticityAssertionCredential.schema.json</code>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
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
          </CardContent>
        </Card>

        {/* Real DID Examples */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <KeyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              DID Methods in Our System
            </Typography>
            <Typography variant="body1" paragraph>
              We support multiple DID methods for different use cases:
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Method</strong></TableCell>
                    <TableCell><strong>Purpose</strong></TableCell>
                    <TableCell><strong>Example</strong></TableCell>
                    <TableCell><strong>Network</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><code>did:cheqd</code></TableCell>
                    <TableCell>Primary verified identity</TableCell>
                    <TableCell><code>did:cheqd:mainnet:zABCDEF123456</code></TableCell>
                    <TableCell>Cheqd Mainnet</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>did:key</code></TableCell>
                    <TableCell>Immediate identity (onboarding)</TableCell>
                    <TableCell><code>did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK</code></TableCell>
                    <TableCell>Local</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>DID Resolution:</strong> All DIDs are resolved through our unified resolver at 
                <code> https://resolver.originvault.box/</code>
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* SDK Integration Examples */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              SDK Integration Examples
            </Typography>
            <Typography variant="body1" paragraph>
              Our <code>@originvault/ov-id-sdk</code> provides easy integration for DID and VC operations:
            </Typography>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Creating a DID</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`import { createOVAgent, CheqdNetwork } from '@originvault/ov-id-sdk';

// Create Cheqd provider
const cheqdProvider = createCheqdProvider(
  CheqdNetwork.Mainnet,
  process.env.COSMOS_PAYER_SEED,
  process.env.CHEQD_RPC_URL
);

// Create agent
const agent = createOVAgent({ cheqdProvider, universalResolver: {} });

// Create a new DID
const { did, mnemonic } = await agent.createDID({
  method: 'did:cheqd',
  alias: 'my-identity',
  isPrimary: true
});

`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Issuing a Verifiable Credential</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`// Create a verifiable credential
const credential = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiableCredential', 'VaultRoleCredential'],
  issuer: issuerDID,
  issuanceDate: new Date().toISOString(),
  credentialSubject: {
    id: subjectDID,
    vaultId: 'vault:123',
    role: 'editor',
    scopes: ['assets:create', 'assets:update']
  }
};

// Issue the credential
const verifiableCredential = await agent.createVerifiableCredential({
  credential,
  format: 'jwt',
  proofFormat: 'lds'
});

`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Verifying a Credential</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`// Verify a credential
const verificationResult = await agent.verifyCredential({
  credential: verifiableCredential,
  format: 'jwt'
});

if (verificationResult.verified) {

} else {

}`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 3 }}>
              <Button 
                variant="outlined" 
                href="https://github.com/originvault/ov-id-sdk"
                target="_blank"
                startIcon={<CodeIcon />}
              >
                View SDK Documentation
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* CLI and Automation Examples */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              CLI Tools & Automation
            </Typography>
            <Typography variant="body1" paragraph>
              Our <code>ov-id-cli</code> tool enables automation and integration with existing workflows:
            </Typography>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Installation & Setup</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`# Install the CLI globally
npm install -g @originvault/ov-id-cli

# Or use npx
npx @originvault/ov-id-cli --help

# Configure your environment
export COSMOS_PAYER_SEED="your-seed-here"
export CHEQD_RPC_URL="https://rpc.cheqd.network"`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">DID Management</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`# Create a new DID
ov-id create-did cheqd

# Set a primary DID
ov-id set-primary did:cheqd:mainnet:1234

# Show primary DID
ov-id show-primary

# Import existing DID
ov-id import-did --did did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK --private-key "your-key"`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Credential Operations</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`# Sign a verifiable credential
ov-id sign-vc did:example:5678

# Verify a verifiable credential
ov-id verify-vc <signed-vc>

# Show development environment metadata
ov-id show-dev-metadata`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Integration Examples</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
{`# Automated DID creation in CI/CD
ov-id create-did cheqd --alias "ci-identity" --output did.json

# Verify credentials in automated testing
ov-id verify-vc test-credential.json --exit-on-failure

# Generate development metadata for compliance
ov-id show-dev-metadata --format json > dev-metadata.json`}
                  </pre>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 3 }}>
              <Button 
                variant="outlined" 
                href="https://github.com/originvault/ov-id-cli"
                target="_blank"
                startIcon={<CodeIcon />}
              >
                View CLI Documentation
              </Button>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </>
  );
};

export default VCGuide;
