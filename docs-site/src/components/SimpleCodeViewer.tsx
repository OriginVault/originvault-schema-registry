import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CodeContainer = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  fontSize: '14px',
  lineHeight: 1.5,
  border: `1px solid ${theme.palette.divider}`,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
}));

const LineNumber = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2),
  userSelect: 'none',
  minWidth: '30px',
  display: 'inline-block',
  textAlign: 'right'
}));

interface SimpleCodeViewerProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

const SimpleCodeViewer: React.FC<SimpleCodeViewerProps> = ({ 
  code, 
  language = 'typescript',
  showLineNumbers = true,
  title
}) => {
  const lines = code.split('\n');
  // Use language for potential syntax highlighting in the future
  const languageClass = `language-${language}`;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <CodeContainer className={languageClass}>
        {showLineNumbers ? (
          lines.map((line, index) => (
            <div key={index}>
              <LineNumber>{index + 1}</LineNumber>
              {line}
            </div>
          ))
        ) : (
          code
        )}
      </CodeContainer>
    </Box>
  );
};

export default SimpleCodeViewer; 