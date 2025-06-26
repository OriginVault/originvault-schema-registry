import { useState, useEffect, useRef } from 'react'

interface ElementSize {
  width: number
  height: number
}

export const useElementSize = <T extends HTMLElement>(): [React.RefObject<T>, ElementSize] => {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current
        setSize({ width: offsetWidth, height: offsetHeight })
      }
    }

    // Initial size
    handleResize()

    // Add resize observer for dynamic changes
    const resizeObserver = new ResizeObserver(handleResize)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return [ref, size]
}

// Component size debug overlay
export const SizeDebugger: React.FC<{ 
  elementRef: React.RefObject<HTMLElement>
  size: ElementSize 
  show: boolean 
}> = ({ elementRef, size, show }) => {
  if (!show || !elementRef.current) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      {size.width}×{size.height}px
    </div>
  )
} 