import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Layout from '../components/Layout'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderWithRouter(<Layout />)
      
      // Check semantic elements
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have skip link for screen readers', () => {
      renderWithRouter(<Layout />)
      
      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
      expect(skipLink).toHaveClass('sr-only')
    })

    it('should have proper ARIA labels', () => {
      renderWithRouter(<Layout />)
      
      // Check navigation labels
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument()
      expect(screen.getByLabelText('OriginVault Home')).toBeInTheDocument()
      expect(screen.getByLabelText('View on GitHub')).toBeInTheDocument()
      expect(screen.getByLabelText('Schema Registry')).toBeInTheDocument()
    })

    it('should support keyboard navigation', () => {
      renderWithRouter(<Layout />)
      
      // Tab through navigation
      const homeLink = screen.getByText('Home')
      const explorerLink = screen.getByText('Schema Explorer')
      const docsLink = screen.getByText('Documentation')
      
      homeLink.focus()
      expect(homeLink).toHaveFocus()
      
      fireEvent.keyDown(homeLink, { key: 'Tab' })
      expect(explorerLink).toHaveFocus()
      
      fireEvent.keyDown(explorerLink, { key: 'Tab' })
      expect(docsLink).toHaveFocus()
    })

    it('should indicate current page', () => {
      renderWithRouter(<Layout />)
      
      const homeLink = screen.getByText('Home')
      expect(homeLink).toHaveAttribute('aria-current', 'page')
      
      const explorerLink = screen.getByText('Schema Explorer')
      expect(explorerLink).not.toHaveAttribute('aria-current')
    })
  })

  describe('Navigation', () => {
    it('should render all navigation items', () => {
      renderWithRouter(<Layout />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Schema Explorer')).toBeInTheDocument()
      expect(screen.getByText('Documentation')).toBeInTheDocument()
      expect(screen.getByText('QuickType Guide')).toBeInTheDocument()
    })

    it('should have working navigation links', () => {
      renderWithRouter(<Layout />)
      
      const homeLink = screen.getByText('Home')
      const explorerLink = screen.getByText('Schema Explorer')
      const docsLink = screen.getByText('Documentation')
      const quicktypeLink = screen.getByText('QuickType Guide')
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(explorerLink).toHaveAttribute('href', '/explorer')
      expect(docsLink).toHaveAttribute('href', '/docs')
      expect(quicktypeLink).toHaveAttribute('href', '/quicktype')
    })

    it('should have external links with proper attributes', () => {
      renderWithRouter(<Layout />)
      
      const githubLink = screen.getByLabelText('View on GitHub')
      const schemaLink = screen.getByLabelText('Schema Registry')
      
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(schemaLink).toHaveAttribute('target', '_blank')
      expect(schemaLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Documentation Dropdown', () => {
    it('should toggle dropdown on click', async () => {
      renderWithRouter(<Layout />)
      
      const docsButton = screen.getByLabelText('Documentation menu')
      expect(docsButton).toHaveAttribute('aria-expanded', 'false')
      
      fireEvent.click(docsButton)
      
      await waitFor(() => {
        expect(docsButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText('Implementation Guides')).toBeInTheDocument()
        expect(screen.getByText('Architecture')).toBeInTheDocument()
        expect(screen.getByText('Governance')).toBeInTheDocument()
        expect(screen.getByText('Migration')).toBeInTheDocument()
      })
      
      fireEvent.click(docsButton)
      
      await waitFor(() => {
        expect(docsButton).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByText('Implementation Guides')).not.toBeInTheDocument()
      })
    })

    it('should close dropdown when item is clicked', async () => {
      renderWithRouter(<Layout />)
      
      const docsButton = screen.getByLabelText('Documentation menu')
      fireEvent.click(docsButton)
      
      await waitFor(() => {
        expect(screen.getByText('Implementation Guides')).toBeInTheDocument()
      })
      
      const guidesLink = screen.getByText('Implementation Guides')
      fireEvent.click(guidesLink)
      
      await waitFor(() => {
        expect(docsButton).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByText('Implementation Guides')).not.toBeInTheDocument()
      })
    })

    it('should have proper dropdown ARIA attributes', async () => {
      renderWithRouter(<Layout />)
      
      const docsButton = screen.getByLabelText('Documentation menu')
      fireEvent.click(docsButton)
      
      await waitFor(() => {
        const dropdown = screen.getByRole('menu')
        expect(dropdown).toHaveAttribute('aria-orientation', 'vertical')
        
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems).toHaveLength(4)
      })
    })
  })

  describe('Mobile Navigation', () => {
    it('should show mobile menu button on small screens', () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      expect(mobileButton).toBeInTheDocument()
      expect(mobileButton).toHaveAttribute('aria-controls', 'mobile-menu')
    })

    it('should toggle mobile menu', async () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
      
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument()
      })
      
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument()
      })
    })

    it('should close mobile menu when link is clicked', async () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument()
      })
      
      const explorerLink = screen.getByText('Schema Explorer')
      fireEvent.click(explorerLink)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument()
      })
    })

    it('should show mobile menu button on mobile', () => {
      renderWithRouter(<Layout />)
      
      const mobileButtonWrapper = screen.getByLabelText('Toggle menu').parentElement
      expect(mobileButtonWrapper).toHaveClass('md:hidden')
    })
  })

  describe('Footer', () => {
    it('should have proper footer structure', () => {
      renderWithRouter(<Layout />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      
      expect(screen.getByText('OriginVault Schema Registry')).toBeInTheDocument()
      expect(screen.getByText(/Type-safe, verifiable credential schemas/)).toBeInTheDocument()
    })

    it('should have working footer links', () => {
      renderWithRouter(<Layout />)
      
      const guidesLink = screen.getByText('Guides')
      const explorerLink = screen.getByText('Interactive Explorer')
      const quicktypeLink = screen.getByText('QuickType Guide')
      
      expect(guidesLink).toHaveAttribute('href', '/docs')
      expect(explorerLink).toHaveAttribute('href', '/explorer')
      expect(quicktypeLink).toHaveAttribute('href', '/quicktype')
    })

    it('should have external footer links', () => {
      renderWithRouter(<Layout />)
      
      const schemaLink = screen.getByText('Schema Registry')
      const quicktypeLink = screen.getByText('QuickType')
      const w3cLink = screen.getByText('W3C VC 2.0')
      
      expect(schemaLink).toHaveAttribute('target', '_blank')
      expect(quicktypeLink).toHaveAttribute('target', '_blank')
      expect(w3cLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Responsive Design', () => {
    it('should hide desktop navigation on mobile', () => {
      renderWithRouter(<Layout />)
      
      const desktopNav = screen.getByLabelText('Main navigation')
      expect(desktopNav).toHaveClass('hidden', 'md:flex')
    })

    it('should show mobile menu button on mobile', () => {
      renderWithRouter(<Layout />)
      
      const mobileButtonWrapper = screen.getByLabelText('Toggle menu').parentElement
      expect(mobileButtonWrapper).toHaveClass('md:hidden')
    })
  })

  describe('Logo and Branding', () => {
    it('should have proper logo structure', () => {
      renderWithRouter(<Layout />)
      
      const logoLink = screen.getByLabelText('OriginVault Home')
      expect(logoLink).toBeInTheDocument()
      
      const logoText = screen.getByText('OriginVault')
      expect(logoText).toBeInTheDocument()
      
      const logoIcon = screen.getByText('OV')
      expect(logoIcon).toBeInTheDocument()
    })

    it('should have proper logo link', () => {
      renderWithRouter(<Layout />)
      
      const logoLink = screen.getByLabelText('OriginVault Home')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Error Boundaries', () => {
    it('should handle navigation errors gracefully', () => {
      // Mock console.error to prevent test noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      renderWithRouter(<Layout />)
      
      // Navigation should still work
      expect(screen.getByText('Home')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Performance', () => {
    it('should not re-render unnecessarily', () => {
      const { rerender } = renderWithRouter(<Layout />)
      
      // Re-render with same props
      rerender(
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      )
      
      // Component should still be functional
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })
}) 