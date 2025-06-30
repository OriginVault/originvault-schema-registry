import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button, Box, ThemeProvider, CssBaseline } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import SchemaResolver from './pages/SchemaResolver'
import ContextResolver from './pages/ContextResolver'
import WellKnownResolver from './pages/WellKnownResolver'
import Documentation from './pages/Documentation'
import QuickType from './pages/QuickType'
import QuickTypeGuide from './pages/QuickTypeGuide'
import VerifiableCredentials from './pages/VerifiableCredentials'
import VCGuide from './pages/VCGuide'
import NotFound from './pages/NotFound'
// import BreadcrumbNav from './components/BreadcrumbNav'
import Footer from './components/Footer'
import OpenGraphImage from './components/OpenGraphImage'
import { lightTheme, darkTheme } from './theme'
// import { Helmet, HelmetProvider } from 'react-helmet-async'

// Fullscreen context
interface FullscreenContextType {
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined)

export const useFullscreen = () => {
  const context = useContext(FullscreenContext)
  if (!context) {
    throw new Error('useFullscreen must be used within a FullscreenProvider')
  }
  return context
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
        <Router>
          <Routes>
            {/* Schema ID route - outside of app styles */}
            <Route path="/resolver/:schemaId" element={<SchemaResolver />} />
            <Route path="/.well-known/:wellKnownPath" element={<WellKnownResolver />} />

            {/* All other routes - with app styles */}
            <Route path="/*" element={
              <div
                className={`App${isDarkMode ? ' dark' : ''}`}
                style={{
                  minHeight: '100vh',
                  background: isDarkMode
                    ? 'linear-gradient(230deg, #1c2a35, black, #212831, #9c27b0, black)'
                    : 'linear-gradient(230deg, #c9b36d, #f5be6b, #ecadef, #add4ef, #5794b4, #5794b4)',
                  backgroundSize: '500% 500%',
                  color: currentTheme.palette.text.primary,
                }}
              >
                <OpenGraphImage />
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
                  {/* Conditionally render header */}
                  {!isFullscreen && (
                    <AppBar
                      position="static"
                      color="default"
                      sx={{
                        background: currentTheme.palette.mode === 'dark'
                          ? 'linear-gradient(230deg, #1c2a35, #212831, #3a6278, #9c27b0, #1c2a35)'
                          : 'linear-gradient(230deg, #c9b36d, #f5be6b, #ecadef, #add4ef, #5794b4, #5794b4)',
                        color: currentTheme.palette.text.primary,
                        boxShadow: '0 2px 8px 0 rgba(173, 212, 239, 0.08)',
                        borderBottom: currentTheme.palette.mode === 'dark'
                          ? '1.5px solid #3a6278'
                          : '1.5px solid #c9b36d',
                        backgroundSize: '200% 200%',
                        backgroundPosition: '0% 50%',
                        transition: 'background-position 0.5s ease-in-out',
                      }}
                    >
                      <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}> 
                          <Box sx={{ padding: '8px', backgroundColor: '#1c2a35', borderRadius: '10px' }}>
                            <img
                              title="OriginVault"
                              alt="OriginVaultLogo"
                              src="https://gray-objective-tiglon-784.mypinata.cloud/ipfs/Qma7EjPPPfomzEKkYcJa2ctEFPUhHaMwiojTR1wTQPg2x8"
                              style={{ width: "32px" }}
                            />
                          </Box>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              background: 'linear-gradient(45deg, #add4ef, #fe9334)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            OriginVault Schema Registry
                          </Typography>
                        </Box>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/"
                          sx={{
                            color: currentTheme.palette.mode === 'dark' ? '#add4ef' : '#1c2a35',
                            mx: 1,
                          }}
                        >
                          Home
                        </Button>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/documentation"
                          sx={{
                            color: currentTheme.palette.mode === 'dark' ? '#add4ef' : '#1c2a35',
                            mx: 1,
                          }}
                        >
                          Documentation
                        </Button>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/schemas"
                          sx={{
                            color: currentTheme.palette.mode === 'dark' ? '#add4ef' : '#1c2a35',
                            mx: 1,
                          }}
                        >
                          Schema Explorer
                        </Button>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/quicktype"
                          sx={{
                            color: currentTheme.palette.mode === 'dark' ? '#add4ef' : '#1976d2',
                            mx: 1,
                          }}
                        >
                          QuickType
                        </Button>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/verifiable-credentials"
                          sx={{
                            color: currentTheme.palette.mode === 'dark' ? '#add4ef' : '#1c2a35',
                            mx: 1,
                          }}
                        >
                          Verifiable Credentials
                        </Button>
                        <Button
                          color="inherit"
                          onClick={toggleDarkMode}
                          sx={{
                            color: '#fe9334',
                            ml: 2,
                            minWidth: 'auto',
                            p: 1,
                          }}
                          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </Button>
                      </Toolbar>
                    </AppBar>
                  )}

                  {/* Conditionally render container wrapper */}
                  {!isFullscreen ? (
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/documentation" element={<Documentation />} />
                        <Route path="/schemas" element={<SchemaExplorer />} />
                        <Route path="/schemas/:schemaId" element={<SchemaExplorer />} />
                        <Route path="/schemas/:schemaId/:tab" element={<SchemaExplorer />} />
                        <Route path="/schema/:schemaPath" element={<SchemaResolver />} />
                        <Route path="/context/:contextPath" element={<ContextResolver />} />
                        <Route path="/quicktype" element={<QuickType />} />
                        <Route path="/quicktype-guide" element={<QuickTypeGuide />} />
                        <Route path="/verifiable-credentials" element={<VCGuide />} />
                        <Route path="/verifiable-credentials/guide" element={<VCGuide />} />
                        <Route path="/verifiable-credentials/:tab" element={<VerifiableCredentials />} />
                        <Route path="/explorer" element={<SchemaExplorer />} />
                        <Route path="/explorer/:schemaId" element={<SchemaExplorer />} />
                        <Route path="/explorer/:schemaId/:tab" element={<SchemaExplorer />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Container>
                  ) : (
                    <Box sx={{ flex: 1 }}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/documentation" element={<Documentation />} />
                        <Route path="/schemas" element={<SchemaExplorer />} />
                        <Route path="/schemas/:schemaId" element={<SchemaExplorer />} />
                        <Route path="/schemas/:schemaId/:tab" element={<SchemaExplorer />} />
                        <Route path="/schema/:schemaPath" element={<SchemaResolver />} />
                        <Route path="/context/:contextPath" element={<ContextResolver />} />
                        <Route path="/quicktype" element={<QuickType />} />
                        <Route path="/quicktype-guide" element={<QuickTypeGuide />} />
                        <Route path="/verifiable-credentials" element={<VCGuide />} />
                        <Route path="/verifiable-credentials/guide" element={<VCGuide />} />
                        <Route path="/verifiable-credentials/:tab" element={<VerifiableCredentials />} />
                        <Route path="/explorer" element={<SchemaExplorer />} />
                        <Route path="/explorer/:schemaId" element={<SchemaExplorer />} />
                        <Route path="/explorer/:schemaId/:tab" element={<SchemaExplorer />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Box>
                  )}

                  {/* Conditionally render footer */}
                  {!isFullscreen && <Footer isDarkMode={isDarkMode} />}
                </Box>
              </div>
            } />
          </Routes>
          
          {/* Vercel Analytics - Only in production */}
          {process.env.NODE_ENV === 'production' && (
            <Analytics />
          )}
        </Router>
      </FullscreenContext.Provider>
    </ThemeProvider>
  )
}

export default App 