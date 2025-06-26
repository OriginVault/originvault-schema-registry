import React from 'react'
import { Box, Grid, Container, Paper, Stack, BoxProps, GridProps, ContainerProps, PaperProps, StackProps, SxProps, Theme } from '@mui/material'

// Simplified layout components with visual debugging
interface DebugProps {
  debug?: boolean
  label?: string
}

// Enhanced Container with debug visualization
interface SimpleContainerProps extends ContainerProps, DebugProps {}
export const SimpleContainer: React.FC<SimpleContainerProps> = ({ 
  children, 
  debug = false, 
  label,
  sx,
  ...props 
}) => {
  const debugStyles = debug ? {
    border: '3px solid #2196f3',
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    position: 'relative',
    '&::before': {
      content: `"Container${label ? ': ' + label : ''}"`,
      position: 'absolute',
      top: '-20px',
      left: '0',
      backgroundColor: '#2196f3',
      color: 'white',
      padding: '2px 8px',
      fontSize: '12px',
      borderRadius: '3px',
      zIndex: 1000
    }
  } : {}

  return (
    <Container 
      sx={[
        debugStyles,
        ...(Array.isArray(sx) ? sx : [sx])
      ] as SxProps<Theme>} 
      {...props}
    >
      {children}
    </Container>
  )
}

// Enhanced Grid with debug visualization
interface SimpleGridProps extends GridProps, DebugProps {}
export const SimpleGrid: React.FC<SimpleGridProps> = ({ 
  children, 
  debug = false, 
  label,
  sx,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props 
}) => {
  const debugStyles = debug ? {
    border: container ? '2px solid #ff9800' : '1px solid #4caf50',
    backgroundColor: container ? 'rgba(255, 152, 0, 0.05)' : 'rgba(76, 175, 80, 0.05)',
    position: 'relative',
    '&::before': {
      content: `"Grid ${container ? 'Container' : 'Item'}${label ? ': ' + label : ''}${
        item ? ` (${[xs && `xs:${xs}`, sm && `sm:${sm}`, md && `md:${md}`, lg && `lg:${lg}`, xl && `xl:${xl}`].filter(Boolean).join(', ')})` : ''
      }"`,
      position: 'absolute',
      top: container ? '-20px' : '2px',
      left: container ? '0' : '2px',
      backgroundColor: container ? '#ff9800' : '#4caf50',
      color: 'white',
      padding: '1px 6px',
      fontSize: '10px',
      borderRadius: '2px',
      zIndex: 1000,
      maxWidth: '90%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  } : {}

  return (
    <Grid 
      container={container}
      item={item}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={[
        debugStyles,
        ...(Array.isArray(sx) ? sx : [sx])
      ] as SxProps<Theme>} 
      {...props}
    >
      {children}
    </Grid>
  )
}

// Enhanced Paper with debug visualization
interface SimplePaperProps extends PaperProps, DebugProps {}
export const SimplePaper: React.FC<SimplePaperProps> = ({ 
  children, 
  debug = false, 
  label,
  sx,
  ...props 
}) => {
  const debugStyles = debug ? {
    border: '2px solid #9c27b0',
    position: 'relative',
    '&::before': {
      content: `"Paper${label ? ': ' + label : ''}"`,
      position: 'absolute',
      top: '-18px',
      left: '0',
      backgroundColor: '#9c27b0',
      color: 'white',
      padding: '1px 6px',
      fontSize: '10px',
      borderRadius: '2px',
      zIndex: 1000
    }
  } : {}

  return (
    <Paper 
      // @ts-ignore: Complex MUI sx type issue
      sx={{
        ...debugStyles,
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Paper>
  )
}

// Enhanced Box with debug visualization
interface SimpleBoxProps extends BoxProps, DebugProps {}
export const SimpleBox: React.FC<SimpleBoxProps> = ({ 
  children, 
  debug = false, 
  label,
  sx,
  ...props 
}) => {
  const debugStyles = debug ? {
    border: '1px dotted #607d8b',
    backgroundColor: 'rgba(96, 125, 139, 0.02)',
    position: 'relative',
    '&::before': {
      content: `"Box${label ? ': ' + label : ''}"`,
      position: 'absolute',
      top: '-16px',
      left: '0',
      backgroundColor: '#607d8b',
      color: 'white',
      padding: '1px 4px',
      fontSize: '9px',
      borderRadius: '2px',
      zIndex: 1000
    }
  } : {}

  return (
    <Box 
      // @ts-ignore: Complex MUI sx type issue
      sx={{
        ...debugStyles,
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Box>
  )
}

// Enhanced Stack with debug visualization
interface SimpleStackProps extends StackProps, DebugProps {}
export const SimpleStack: React.FC<SimpleStackProps> = ({ 
  children, 
  debug = false, 
  label,
  sx,
  direction = 'column',
  spacing,
  ...props 
}) => {
  const debugStyles = debug ? {
    border: '1px solid #795548',
    backgroundColor: 'rgba(121, 85, 72, 0.02)',
    position: 'relative',
    '&::before': {
      content: `"Stack${label ? ': ' + label : ''} (${direction}${spacing ? `, gap:${spacing}` : ''})"`,
      position: 'absolute',
      top: '-16px',
      left: '0',
      backgroundColor: '#795548',
      color: 'white',
      padding: '1px 4px',
      fontSize: '9px',
      borderRadius: '2px',
      zIndex: 1000,
      maxWidth: '90%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  } : {}

  return (
    <Stack 
      direction={direction}
      spacing={spacing}
      // @ts-ignore: Complex MUI sx type issue
      sx={{
        ...debugStyles,
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Stack>
  )
}

// Layout Builder - A declarative way to build layouts
interface LayoutBuilderProps {
  debug?: boolean
  config: LayoutConfig
}

interface LayoutConfig {
  type: 'container' | 'grid' | 'paper' | 'box' | 'stack'
  label?: string
  props?: any
  children?: (LayoutConfig | React.ReactNode)[]
}

export const LayoutBuilder: React.FC<LayoutBuilderProps> = ({ debug = false, config }) => {
  const renderComponent = (config: LayoutConfig | React.ReactNode, index: number): React.ReactNode => {
    if (React.isValidElement(config) || typeof config === 'string' || typeof config === 'number') {
      return config
    }

    const layoutConfig = config as LayoutConfig
    const { type, label, props = {}, children = [] } = layoutConfig

    const commonProps = { debug, label, key: index, ...props }

    switch (type) {
      case 'container':
        return (
          <SimpleContainer {...commonProps}>
            {children.map(renderComponent)}
          </SimpleContainer>
        )
      case 'grid':
        return (
          <SimpleGrid {...commonProps}>
            {children.map(renderComponent)}
          </SimpleGrid>
        )
      case 'paper':
        return (
          <SimplePaper {...commonProps}>
            {children.map(renderComponent)}
          </SimplePaper>
        )
      case 'box':
        return (
          <SimpleBox {...commonProps}>
            {children.map(renderComponent)}
          </SimpleBox>
        )
      case 'stack':
        return (
          <SimpleStack {...commonProps}>
            {children.map(renderComponent)}
          </SimpleStack>
        )
      default:
        return null
    }
  }

  return <>{renderComponent(config, 0)}</>
}

// Example usage:
export const ExampleLayout = () => {
  const layoutConfig: LayoutConfig = {
    type: 'container',
    label: 'Main App',
    props: { maxWidth: 'xl', sx: { mt: 4, mb: 4 } },
    children: [
      {
        type: 'grid',
        label: 'Main Grid',
        props: { container: true, spacing: 3 },
        children: [
          {
            type: 'grid',
            label: 'Sidebar',
            props: { item: true, xs: 12, md: 3 },
            children: [
              {
                type: 'paper',
                label: 'Sidebar Content',
                props: { sx: { p: 2 } },
                children: ['Sidebar Content Here']
              }
            ]
          },
          {
            type: 'grid',
            label: 'Main Content',
            props: { item: true, xs: 12, md: 9 },
            children: [
              {
                type: 'stack',
                label: 'Content Stack',
                props: { spacing: 2 },
                children: [
                  {
                    type: 'paper',
                    label: 'Header',
                    props: { sx: { p: 2 } },
                    children: ['Header Content']
                  },
                  {
                    type: 'paper',
                    label: 'Body',
                    props: { sx: { p: 2 } },
                    children: ['Body Content']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  return <LayoutBuilder debug={true} config={layoutConfig} />
} 