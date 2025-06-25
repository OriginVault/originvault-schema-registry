import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Layout from './components/Layout'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import Documentation from './pages/Documentation'
import QuickTypeGuide from './pages/QuickTypeGuide'
import NotFound from './pages/NotFound'
import AccessibilityEnhancer from './components/AccessibilityEnhancer'
import SEOHead from './components/SEOHead'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccessibilityEnhancer>
        <Router>
          <SEOHead />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explorer" element={<SchemaExplorer />} />
              <Route path="/quicktype" element={<QuickTypeGuide />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AccessibilityEnhancer>
    </ThemeProvider>
  )
}

export default App 