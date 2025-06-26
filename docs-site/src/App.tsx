import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import Footer from './components/Footer'
import './index.css'
import QuickTypeGuide from './pages/QuickTypeGuide'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark')
  }

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Router>
        <AppBar position="static" sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Thiccboi' }}>
              OriginVault Schema Registry
            </Typography>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ fontFamily: 'Thiccboi', color: '#add4ef' }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/schemas"
              sx={{ fontFamily: 'Thiccboi', color: '#add4ef' }}
            >
              Schema Explorer
            </Button>
            <Button 
              color="inherit" 
              onClick={toggleDarkMode}
              sx={{ fontFamily: 'Thiccboi', color: '#fe9334' }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schemas" element={<SchemaExplorer />} />
            <Route path="/quickType" element={<QuickTypeGuide />} />
            <Route path="/explorer" element={<SchemaExplorer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>

        <Footer isDarkMode={isDarkMode} />
      </Router>
    </div>
  )
}

export default App 