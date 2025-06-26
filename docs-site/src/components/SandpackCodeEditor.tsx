import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Sandpack } from '@codesandbox/sandpack-react'

interface SandpackCodeEditorProps {
  value: string
  language: string
  height?: string
  readOnly?: boolean
  title?: string
  template?: 'typescript' | 'javascript' | 'python' | 'go' | 'java' | 'rust'
  showPreview?: boolean
}

const SandpackCodeEditor: React.FC<SandpackCodeEditorProps> = ({
  value,
  language,
  height = '400px',
  readOnly = false,
  title,
  showPreview = false
}) => {
  // Map language to appropriate file extension and template
  const getFileConfig = () => {
    switch (language) {
      case 'typescript':
        return { filename: '/App.ts', template: 'vanilla-ts' as const }
      case 'javascript':
        return { filename: '/App.js', template: 'vanilla' as const }
      case 'python':
        return { filename: '/main.py', template: 'node' as const }
      case 'go':
        return { filename: '/main.go', template: 'node' as const }
      case 'java':
        return { filename: '/Main.java', template: 'node' as const }
      case 'rust':
        return { filename: '/main.rs', template: 'node' as const }
      default:
        return { filename: '/App.ts', template: 'vanilla-ts' as const }
    }
  }

  const { filename, template: sandpackTemplate } = getFileConfig()

  return (
    <Paper sx={{ height, overflow: 'hidden' }}>
      {title && (
        <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ height: title ? 'calc(100% - 40px)' : '100%' }}>
        <Sandpack
          template={sandpackTemplate}
          files={{
            [filename]: value
          }}
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: true,
            editorHeight: parseInt(height.replace('px', '')),
            readOnly,
            showConsole: false,
            showInlineErrors: true,
            wrapContent: true,
            editorWidthPercentage: showPreview ? 50 : 100,
            layout: showPreview ? 'preview' : undefined
          }}
          theme="light"
          customSetup={{
            dependencies: language === 'typescript' ? {
              '@types/node': 'latest'
            } : {}
          }}
        />
      </Box>
    </Paper>
  )
}

export default SandpackCodeEditor 