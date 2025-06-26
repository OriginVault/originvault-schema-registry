import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button, Box, ThemeProvider } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import Footer from './components/Footer'
import OpenGraphImage from './components/OpenGraphImage'
import { lightTheme, darkTheme } from './theme'
import './index.css'
import QuickTypeGuide from './pages/QuickTypeGuide'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="App">
        <OpenGraphImage />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            <AppBar 
              position="static" 
              sx={{ 
                backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: isDarkMode ? '#fff' : '#000'
              }}
            >
              <Toolbar>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    flexGrow: 1, 
                    fontFamily: 'Thiccboi',
                    background: 'linear-gradient(45deg, #add4ef, #fe9334)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  OriginVault Schema Registry
                </Typography>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/"
                  sx={{ 
                    fontFamily: 'Thiccboi', 
                    color: isDarkMode ? '#add4ef' : '#1976d2',
                    mx: 1
                  }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/schemas"
                  sx={{ 
                    fontFamily: 'Thiccboi', 
                    color: isDarkMode ? '#add4ef' : '#1976d2',
                    mx: 1
                  }}
                >
                  Schema Explorer
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/quickType"
                  sx={{ 
                    fontFamily: 'Thiccboi', 
                    color: isDarkMode ? '#add4ef' : '#1976d2',
                    mx: 1
                  }}
                >
                  QuickType Guide
                </Button>
                <Button 
                  color="inherit" 
                  onClick={toggleDarkMode}
                  sx={{ 
                    fontFamily: 'Thiccboi', 
                    color: '#fe9334',
                    ml: 2,
                    minWidth: 'auto',
                    p: 1
                  }}
                >
                  {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </Button>
              </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schemas" element={<SchemaExplorer />} />
                <Route path="/schemas/:schemaId" element={<SchemaExplorer />} />
                <Route path="/schemas/:schemaId/:tab" element={<SchemaExplorer />} />
                <Route path="/quickType" element={<QuickTypeGuide />} />
                <Route path="/explorer" element={<SchemaExplorer />} />
                <Route path="/explorer/:schemaId" element={<SchemaExplorer />} />
                <Route path="/explorer/:schemaId/:tab" element={<SchemaExplorer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>

            <Footer isDarkMode={isDarkMode} />
          </Box>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App 