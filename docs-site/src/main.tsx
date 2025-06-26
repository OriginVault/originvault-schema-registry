import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
) 