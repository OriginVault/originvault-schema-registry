import React, { useState, useEffect, useRef } from 'react'
import { Fab, Dialog, DialogTitle, DialogContent, Typography, Box, Chip } from '@mui/material'
import { Speed as SpeedIcon } from '@mui/icons-material'

interface RenderMetrics {
  renderCount: number
  lastRenderTime: number
  avgRenderTime: number
  memoryUsage?: number
}

export const PerformanceMonitor: React.FC<{ enabled?: boolean }> = ({ enabled = false }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [metrics, setMetrics] = useState<RenderMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    avgRenderTime: 0
  })
  const renderTimes = useRef<number[]>([])
  const lastRender = useRef<number>(Date.now())

  useEffect(() => {
    if (!enabled) return

    try {
      const now = Date.now()
      const renderTime = now - lastRender.current
      lastRender.current = now

      renderTimes.current.push(renderTime)
      if (renderTimes.current.length > 100) {
        renderTimes.current.shift() // Keep only last 100 renders
      }

      const avgTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length

      setMetrics(prev => ({
        renderCount: prev.renderCount + 1,
        lastRenderTime: renderTime,
        avgRenderTime: avgTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize
      }))
    } catch (error) {
      // console.error('Error measuring performance:', error);
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <Fab
        size="small"
        color="secondary"
        onClick={() => setShowDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          opacity: 0.7,
          zIndex: 1000
        }}
      >
        <SpeedIcon />
      </Fab>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Performance Metrics</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2">Render Count</Typography>
              <Chip label={metrics.renderCount} color="primary" />
            </Box>
            
            <Box>
              <Typography variant="subtitle2">Last Render Time</Typography>
              <Chip 
                label={`${metrics.lastRenderTime}ms`} 
                color={metrics.lastRenderTime > 16 ? 'error' : 'success'} 
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2">Average Render Time</Typography>
              <Chip 
                label={`${metrics.avgRenderTime.toFixed(2)}ms`} 
                color={metrics.avgRenderTime > 16 ? 'warning' : 'success'} 
              />
            </Box>
            
            {metrics.memoryUsage && (
              <Box>
                <Typography variant="subtitle2">Memory Usage</Typography>
                <Chip 
                  label={`${(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB`} 
                  color="info" 
                />
              </Box>
            )}
            
            <Typography variant="caption" color="text.secondary">
              Target: &lt;16ms per render for 60fps
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hook to detect unnecessary re-renders
export const useRenderTracker = (componentName: string, props?: any) => {
  const renderCount = useRef(0)
  const prevProps = useRef(props)

  useEffect(() => {
    renderCount.current += 1
    
    if (process.env.NODE_ENV === 'development') {
      if (prevProps.current && props) {
        const changedProps = Object.keys(props).filter(
          key => prevProps.current[key] !== props[key]
        )
        if (changedProps.length > 0) {
          // Props changed, but no action needed
        }
      }
    }
    
    prevProps.current = props
  })

  return renderCount.current
} 