import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import Documentation from './pages/Documentation'
import QuickTypeGuide from './pages/QuickTypeGuide'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explorer" element={<SchemaExplorer />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="quicktype" element={<QuickTypeGuide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default App 