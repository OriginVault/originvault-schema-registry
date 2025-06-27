import React, { useState, useCallback } from 'react';
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
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  FileCopy as FileIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
  name: string;
  content: string;
  type: 'json-schema' | 'typescript' | 'json' | 'unknown';
  size: number;
  id: string;
}

interface GenerationResult {
  language: string;
  code: string;
  filename: string;
}

const QuickType: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [targetLanguage, setTargetLanguage] = useState('typescript');
  const [generateOptions, setGenerateOptions] = useState({
    justTypes: false,
    acronymStyle: 'camel',
    packageName: '',
    namespace: ''
  });
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  // File upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const fileType = detectFileType(file.name, content);
        
        const uploadedFile: UploadedFile = {
          name: file.name,
          content,
          type: fileType,
          size: file.size,
          id: Math.random().toString(36).substr(2, 9)
        };
        
        setUploadedFiles(prev => [...prev, uploadedFile]);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/schema+json': ['.schema.json'],
      'text/typescript': ['.ts'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024 // 5MB limit
  });

  // Detect file type based on name and content
  const detectFileType = (filename: string, content: string): UploadedFile['type'] => {
    if (filename.endsWith('.schema.json') || filename.includes('schema')) {
      return 'json-schema';
    }
    if (filename.endsWith('.ts') || filename.endsWith('.d.ts')) {
      return 'typescript';
    }
    
    try {
      const parsed = JSON.parse(content);
      if (parsed.$schema || parsed.type || parsed.properties) {
        return 'json-schema';
      }
      return 'json';
    } catch {
      return 'unknown';
    }
  };

  // Remove uploaded file
  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
  };

  // Generate code using QuickType
  const generateCode = async () => {
    if (selectedFiles.length === 0) {
      return;
    }

    setGenerating(true);
    try {
      const filesToProcess = uploadedFiles.filter(file => selectedFiles.includes(file.id));
      
      const response = await fetch('/api/quicktype/generate-from-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: filesToProcess,
          targetLanguage,
          options: generateOptions
        })
      });

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`);
      }

      const responseData = await response.json();
      // Handle the new API response format that returns an object with a results property
      const resultsArray = responseData.results || responseData;
      setResults(Array.isArray(resultsArray) ? resultsArray : []);
      setActiveTab(1); // Switch to results tab
    } catch (error) {
      console.error('Code generation failed:', error);
      setResults([]); // Reset results on error
    } finally {
      setGenerating(false);
    }
  };

  // Download generated code
  const downloadCode = (result: GenerationResult) => {
    const blob = new Blob([result.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download all results as ZIP
  const downloadAllAsZip = async () => {
    try {
      const response = await fetch('/api/quicktype/download-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results })
      });

      if (!response.ok) {
        throw new Error('ZIP download failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quicktype-generated-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('ZIP download failed:', error);
    }
  };

  const supportedLanguages = [
    { value: 'typescript', label: 'TypeScript', icon: '🔷' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'go', label: 'Go', icon: '🔵' },
    { value: 'csharp', label: 'C#', icon: '💜' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'swift', label: 'Swift', icon: '🍎' },
    { value: 'kotlin', label: 'Kotlin', icon: '🔶' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'ruby', label: 'Ruby', icon: '💎' }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        QuickType Code Generator
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload your JSON Schema, TypeScript definitions, or sample JSON files and generate 
        type-safe code in multiple programming languages using QuickType.
      </Typography>

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 4 }}>
        <Tab label="Upload & Configure" />
        <Tab label="Generated Code" disabled={results.length === 0} />
      </Tabs>

      {/* Upload and Configuration Tab */}
      {activeTab === 0 && (
        <Grid container spacing={4}>
          {/* File Upload Area */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Upload Files
                </Typography>
                
                <Paper
                  {...getRootProps()}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    bgcolor: isDragActive ? 'primary.50' : 'background.default',
                    cursor: 'pointer',
                    mb: 3
                  }}
                >
                  <input {...getInputProps()} />
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  
                  {isDragActive ? (
                    <Typography variant="h6">Drop the files here...</Typography>
                  ) : (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Drag & drop files here, or click to select
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Supports JSON Schema, TypeScript, JSON files (max 5MB each)
                      </Typography>
                    </>
                  )}
                </Paper>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <List>
                    <Typography variant="h6" gutterBottom>
                      Uploaded Files ({uploadedFiles.length})
                    </Typography>
                    {uploadedFiles.map((file) => (
                      <ListItem key={file.id} divider>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FileIcon />
                              {file.name}
                              <Chip 
                                label={file.type} 
                                size="small" 
                                color={file.type === 'json-schema' ? 'primary' : 'default'}
                              />
                            </Box>
                          }
                          secondary={`${(file.size / 1024).toFixed(1)} KB`}
                        />
                        <ListItemSecondaryAction>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={selectedFiles.includes(file.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedFiles(prev => [...prev, file.id]);
                                  } else {
                                    setSelectedFiles(prev => prev.filter(id => id !== file.id));
                                  }
                                }}
                              />
                            }
                            label="Include"
                          />
                          <IconButton
                            edge="end"
                            onClick={() => removeFile(file.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Generation Configuration */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Generation Settings
                </Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Target Language</InputLabel>
                  <Select
                    value={targetLanguage}
                    label="Target Language"
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    {supportedLanguages.map((lang) => (
                      <MenuItem key={lang.value} value={lang.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{lang.icon}</span>
                          {lang.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={generateOptions.justTypes}
                      onChange={(e) => setGenerateOptions(prev => ({ 
                        ...prev, 
                        justTypes: e.target.checked 
                      }))}
                    />
                  }
                  label="Generate only types (no serialization code)"
                  sx={{ mb: 2 }}
                />

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={generating ? <CircularProgress size={20} /> : <CodeIcon />}
                  onClick={generateCode}
                  disabled={selectedFiles.length === 0 || generating}
                >
                  {generating ? 'Generating...' : `Generate ${targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)} Code`}
                </Button>

                {selectedFiles.length === 0 && uploadedFiles.length > 0 && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Select at least one file to generate code.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Results Tab */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Generated Code Results ({results.length})
            </Typography>
            
            {results.length > 1 && (
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadAllAsZip}
              >
                Download All as ZIP
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            {results.map((result, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        {result.filename}
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={() => downloadCode(result)}
                      >
                        Download
                      </Button>
                    </Box>
                    
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <pre style={{ 
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        overflow: 'auto',
                        maxHeight: '400px'
                      }}>
                        {result.code}
                      </pre>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {results.length === 0 && (
            <Alert severity="info">
              No generated code yet. Go to the Upload & Configure tab to get started.
            </Alert>
          )}
        </Box>
      )}

      {/* Help Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Supported File Types
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Chip label="JSON Schema" icon={<CheckIcon />} color="primary" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                .schema.json, .json files with $schema property
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip label="TypeScript" icon={<CheckIcon />} color="secondary" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                .ts, .d.ts type definition files
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip label="JSON" icon={<CheckIcon />} color="default" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sample JSON data for type inference
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip label="GraphQL" icon={<CheckIcon />} color="default" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                .graphql schema files (coming soon)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickType; 