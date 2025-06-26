import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Home, 
  Code, 
  BookOpen, 
  Zap,
  Github,
  ExternalLink,
  ChevronDown
} from 'lucide-react'

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Schema Explorer', href: '/explorer', icon: Code },
    { name: 'Documentation', href: '/docs', icon: BookOpen },
    { name: 'QuickType Guide', href: '/quicktype', icon: Zap },
  ]

  const docsSubmenu = [
    { name: 'Implementation Guides', href: '/docs#guides' },
    { name: 'Architecture', href: '/docs#architecture' },
    { name: 'Governance', href: '/docs#governance' },
    { name: 'Migration', href: '/docs#migration' },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <div className="min-h-screen bg-white">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
      >
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OV</span>
                </div>
                <span className="text-xl font-bold text-gray-900">OriginVault</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Documentation Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDocsOpen(!isDocsOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  aria-expanded={isDocsOpen}
                  aria-haspopup="true"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Docs</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDocsOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {docsSubmenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsDocsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* External Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/originvault/originvault-schema-registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://schemas.originvault.box"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  aria-label="Schema Registry"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">OriginVault Schema Registry</h3>
              <p className="text-gray-400 mb-4">
                Type-safe, verifiable credential schemas for the decentralized creator economy.
                Built with accessibility and developer experience in mind.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/originvault/originvault-schema-registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Documentation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/docs" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/explorer" className="text-gray-400 hover:text-white">
                    Schema Explorer
                  </Link>
                </li>
                <li>
                  <Link to="/quicktype" className="text-gray-400 hover:text-white">
                    QuickType Guide
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://schemas.originvault.box"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    Schema Registry
                  </a>
                </li>
                <li>
                  <a
                    href="https://quicktype.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    QuickType
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.w3.org/TR/vc-data-model-2.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    W3C VC 2.0
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © 2024 OriginVault. Built with accessibility and open standards in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 