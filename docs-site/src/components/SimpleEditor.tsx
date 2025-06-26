import React from 'react'

interface SimpleEditorProps {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  height?: string
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  height = '100%'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange && !readOnly) {
      onChange(e.target.value)
    }
  }

  return (
    <textarea
      value={value}
      onChange={handleChange}
      readOnly={readOnly}
      style={{
        width: '100%',
        height,
        border: 'none',
        outline: 'none',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        color: '#333',
        resize: 'none'
      }}
      placeholder={readOnly ? 'No content to display' : 'Enter content here...'}
    />
  )
}

export default SimpleEditor 