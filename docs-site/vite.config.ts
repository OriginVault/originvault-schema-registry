import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-schemas',
      configureServer(server) {
        server.middlewares.use('/schemas', (req, res, next) => {
          const filePath = resolve(__dirname, '..', req.url.replace('/schemas/', 'schemas/'))
          if (fs.existsSync(filePath) && filePath.endsWith('.json')) {
            res.setHeader('Content-Type', 'application/json')
            res.end(fs.readFileSync(filePath))
          } else {
            next()
          }
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@schemas': resolve(__dirname, '../schemas'),
      '@docs': resolve(__dirname, '../docs')
    },
    dedupe: ['react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['..']
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.json'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['@monaco-editor/react'],
    exclude: ['../src', '../index.ts']
  },
  worker: {
    format: 'es'
  }
}) 