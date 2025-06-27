import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Import Monaco Editor ESM plugin (already in package.json)
import monacoEditorPlugin from 'vite-plugin-monaco-editor-esm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Monaco Editor ESM plugin with correct configuration
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript', 'json'],
      globalAPI: false,
      forceBuildCDN: false
    })
  ],
  esbuild: {
    // Skip type checking during build
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks for better optimization
        manualChunks: {
          vendor: ['react', 'react-dom'],
          monaco: ['@monaco-editor/react', 'monaco-editor'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled']
        }
      },
      // Reduce file watching and concurrent operations
      external: [],
      maxParallelFileOps: 5
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
  },
  server: {
    port: 3000,
    host: true
  }
}) 