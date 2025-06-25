import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SchemaExplorer from './pages/SchemaExplorer'
import Documentation from './pages/Documentation'
import QuickTypeGuide from './pages/QuickTypeGuide'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explorer" element={<SchemaExplorer />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="quicktype" element={<QuickTypeGuide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App 