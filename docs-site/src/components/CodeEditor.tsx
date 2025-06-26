import React, { useRef, useState } from 'react'
import { Box, Paper, Typography, CircularProgress, Alert, useTheme } from '@mui/material'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  language?: string
  height?: string
  readonly?: boolean
  onChange?: (value: string) => void
  loading?: boolean
  title?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  height = '400px',
  readonly = false,
  onChange,
  loading = false,
  title
}) => {
  const editorRef = useRef<any>(null)
  const [monacoError, setMonacoError] = useState<string | null>(null)
  const theme = useTheme()

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    try {
      // Define dark theme for Monaco Editor using custom palette
      monaco.editor.defineTheme('darkTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955' },
          { token: 'keyword', foreground: 'C586C0' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'type', foreground: '4EC9B0' },
          { token: 'class', foreground: '4EC9B0' },
          { token: 'interface', foreground: '4EC9B0' },
          { token: 'function', foreground: 'DCDCAA' },
          { token: 'variable', foreground: '9CDCFE' },
          { token: 'constant', foreground: '4FC1FF' },
          { token: 'parameter', foreground: '9CDCFE' },
          { token: 'property', foreground: '9CDCFE' },
        ],
        colors: {
          'editor.background': theme.palette.background.paper,
          'editor.foreground': theme.palette.text.primary,
          'editor.lineHighlightBackground': theme.palette.background.default,
          'editor.selectionBackground': theme.palette.primary.main + '40',
          'editor.inactiveSelectionBackground': theme.palette.primary.main + '20',
          'editorCursor.foreground': theme.palette.text.primary,
          'editorWhitespace.foreground': theme.palette.divider,
          'editorIndentGuide.background': theme.palette.divider,
          'editor.selectionHighlightBorder': theme.palette.primary.main + '60',
          'scrollbarSlider.background': theme.palette.divider,
          'scrollbarSlider.hoverBackground': theme.palette.primary.main + '40',
          'scrollbarSlider.activeBackground': theme.palette.primary.main + '60',
        }
      })

      // Define light theme for Monaco Editor using custom palette
      monaco.editor.defineTheme('lightTheme', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '008000' },
          { token: 'keyword', foreground: '0000ff' },
          { token: 'string', foreground: 'a31515' },
          { token: 'number', foreground: '098658' },
          { token: 'type', foreground: '267f99' },
          { token: 'class', foreground: '267f99' },
          { token: 'interface', foreground: '267f99' },
          { token: 'function', foreground: '795e26' },
          { token: 'variable', foreground: '001080' },
          { token: 'constant', foreground: '0070c1' },
          { token: 'parameter', foreground: '001080' },
          { token: 'property', foreground: '001080' },
        ],
        colors: {
          'editor.background': theme.palette.background.paper,
          'editor.foreground': theme.palette.text.primary,
          'editor.lineHighlightBackground': theme.palette.background.default,
          'editor.selectionBackground': theme.palette.primary.main + '20',
          'editor.inactiveSelectionBackground': theme.palette.primary.main + '10',
          'editorCursor.foreground': theme.palette.text.primary,
          'editorWhitespace.foreground': theme.palette.divider,
          'editorIndentGuide.background': theme.palette.divider,
          'editor.selectionHighlightBorder': theme.palette.primary.main + '40',
          'scrollbarSlider.background': theme.palette.divider,
          'scrollbarSlider.hoverBackground': theme.palette.primary.main + '20',
          'scrollbarSlider.activeBackground': theme.palette.primary.main + '40',
        }
      })
      
      // Set theme based on current MUI theme
      const monacoTheme = theme.palette.mode === 'dark' ? 'darkTheme' : 'lightTheme'
      monaco.editor.setTheme(monacoTheme)
      
      // Set editor options for left alignment and proper scrolling
      editor.updateOptions({
        wordWrap: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        renderWhitespace: 'selection',
        tabSize: 2,
        insertSpaces: true,
        detectIndentation: false,
        // Better scrolling behavior
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          verticalScrollbarSize: 12,
          horizontalScrollbarSize: 12
        }
      })
      
      // Force layout update
      setTimeout(() => {
        editor.layout()
      }, 100)
      
    } catch (error) {
      console.error('Error configuring Monaco editor:', error)
      setMonacoError('Failed to configure editor')
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value)
    }
  }

  if (loading) {
    return (
      <Box sx={{ 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: theme.palette.background.paper,
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: 1,
        fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
      }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  if (monacoError) {
    return (
      <Box sx={{ height, p: 2 }}>
        <Alert severity="error">
          {monacoError}
          <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Thiccboi' }}>
            Falling back to simple text display...
          </Typography>
        </Alert>
        <Box sx={{ 
          mt: 2, 
          height: 'calc(100% - 80px)', 
          overflow: 'auto',
          border: 1,
          borderColor: theme.palette.divider,
          borderRadius: 1,
          p: 2,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '14px',
          lineHeight: 1.5,
          textAlign: 'left',
          whiteSpace: 'pre-wrap'
        }}>
          {value}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      height, 
      width: '100%',
      position: 'relative',
      fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
      '& .monaco-editor': {
        textAlign: 'left !important'
      },
      '& .monaco-editor .margin': {
        textAlign: 'left !important'
      },
      '& .monaco-editor .monaco-editor-background': {
        textAlign: 'left !important'
      }
    }}>
      {title && (
        <Box sx={{ 
          px: 2, 
          py: 1, 
          bgcolor: theme.palette.background.paper, 
          borderBottom: 1, 
          borderColor: theme.palette.divider,
          fontSize: '12px',
          fontWeight: 'medium',
          color: theme.palette.text.secondary,
          fontFamily: 'Thiccboi, Roboto, Helvetica, Arial, sans-serif',
        }}>
          {title}
        </Box>
      )}
      <Editor
        height={title ? `calc(${height} - 40px)` : height}
        language={language || 'json'}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: readonly,
          wordWrap: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          renderWhitespace: 'selection',
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          // Better scrolling behavior
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12
          }
        }}
        theme={theme.palette.mode === 'dark' ? 'darkTheme' : 'lightTheme'}
      />
    </Box>
  )
}

export default CodeEditor 