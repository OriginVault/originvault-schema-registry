import React, { useRef, useState } from 'react'
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  language: string
  height?: string
  readOnly?: boolean
  onChange?: (value: string) => void
  loading?: boolean
  title?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  height = '400px',
  readOnly = false,
  onChange,
  loading = false,
  title
}) => {
  const editorRef = useRef<any>(null)
  const [monacoError, setMonacoError] = useState<string | null>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    try {
      // Configure Monaco Editor theme
      monaco.editor.defineTheme('originvault', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A737D' },
          { token: 'keyword', foreground: 'D73A49' },
          { token: 'string', foreground: '032F62' },
          { token: 'number', foreground: '005CC5' },
          { token: 'type', foreground: '6F42C1' }
        ],
        colors: {
          'editor.background': '#F7FAFC',
          'editor.foreground': '#2D3748',
          'editor.lineHighlightBackground': '#EDF2F7',
          'editor.selectionBackground': '#BEE3F8',
          'editor.inactiveSelectionBackground': '#E2E8F0'
        }
      })
      
      // Set theme
      monaco.editor.setTheme('originvault')
      
      // Configure editor options
      editor.updateOptions({
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: false,
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8
        }
      })
    } catch (error) {
      console.error('Monaco editor configuration error:', error)
      setMonacoError('Failed to configure editor theme')
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value)
    }
  }

  const handleEditorValidationError = (error: any) => {
    console.error('Monaco editor validation error:', error)
    setMonacoError('Editor validation failed')
  }

  const handleBeforeMount = () => {
    // Monaco is starting to load
  }

  const handleMount = (editor: any, monaco: any) => {
    handleEditorDidMount(editor, monaco)
  }

  if (loading) {
    return (
      <Paper sx={{ p: 2, height }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Generating code...
          </Typography>
        </Box>
      </Paper>
    )
  }

  // Use simple fallback if Monaco fails or is read-only
  if (monacoError || readOnly) {
    return (
      <Box>
        {monacoError && (
          <Alert severity="info" sx={{ mb: 1 }}>
            Using simplified code viewer. {monacoError}
          </Alert>
        )}
        <Paper sx={{ height, overflow: 'hidden' }}>
          {title && (
            <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
              <Typography variant="caption" color="text.secondary">
                {title}
              </Typography>
            </Box>
          )}
          <Box sx={{ height: title ? 'calc(100% - 40px)' : '100%', overflow: 'auto' }}>
            <Box
              component="pre"
              sx={{
                margin: 0,
                padding: 2,
                backgroundColor: '#f7fafc',
                fontSize: '14px',
                fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                height: '100%',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                color: '#2d3748',
                border: 'none',
                outline: 'none'
              }}
            >
              {value}
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }

  return (
    <Paper sx={{ height, overflow: 'hidden' }}>
      {title && (
        <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
        </Box>
      )}
      <Editor
        height={title ? 'calc(100% - 40px)' : '100%'}
        language={language}
        value={value}
        onChange={handleEditorChange}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        onValidate={handleEditorValidationError}
        loading={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Loading Monaco Editor...
            </Typography>
          </Box>
        }
        options={{
          readOnly,
          wordWrap: 'on',
          automaticLayout: true,
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          contextmenu: true,
          quickSuggestions: !readOnly,
          suggestOnTriggerCharacters: !readOnly,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          wordBasedSuggestions: readOnly ? 'off' : 'currentDocument',
          parameterHints: {
            enabled: !readOnly
          },
          hover: {
            enabled: true
          }
        }}
        theme="originvault"
      />
    </Paper>
  )
}

export default CodeEditor 