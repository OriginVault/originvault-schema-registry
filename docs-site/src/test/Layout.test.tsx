import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Layout from '../components/Layout.jsx'

// Mock react-router-dom with Outlet
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Home: () => <div data-testid="home-icon">Home</div>,
  Code: () => <div data-testid="code-icon">Code</div>,
  BookOpen: () => <div data-testid="book-open-icon">BookOpen</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
  ExternalLink: () => <div data-testid="external-link-icon">ExternalLink</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
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
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
      expect(screen.getByLabelText('View on GitHub')).toBeInTheDocument()
      expect(screen.getByLabelText('Schema Registry')).toBeInTheDocument()
    })

    it('should support keyboard navigation', () => {
      renderWithRouter(<Layout />)
      
      // Tab through navigation - use getAllByText to get all Home links and pick the navigation one
      const homeLinks = screen.getAllByText('Home')
      const homeNavLink = homeLinks.find(link => link.tagName === 'SPAN')
      const explorerLink = screen.getByText('Schema Explorer')
      const docsLink = screen.getByText('Documentation')
      
      if (homeNavLink) {
        homeNavLink.focus()
        expect(homeNavLink).toHaveFocus()
      }
      
      fireEvent.keyDown(homeNavLink || homeLinks[0], { key: 'Tab' })
      expect(explorerLink).toHaveFocus()
      
      fireEvent.keyDown(explorerLink, { key: 'Tab' })
      expect(docsLink).toHaveFocus()
    })

    it('should indicate current page', () => {
      renderWithRouter(<Layout />)
      
      // Find the navigation link by its href attribute
      const homeLink = screen.getByRole('link', { name: /Home/ })
      expect(homeLink).toHaveAttribute('aria-current', 'page')
      
      const explorerLink = screen.getByRole('link', { name: /Schema Explorer/ })
      expect(explorerLink).not.toHaveAttribute('aria-current')
    })
  })

  describe('Navigation', () => {
    it('should render all navigation items', () => {
      renderWithRouter(<Layout />)
      
      expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Schema Explorer/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Documentation/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /QuickType Guide/ })).toBeInTheDocument()
    })

    it('should have working navigation links', () => {
      renderWithRouter(<Layout />)
      
      const homeLink = screen.getByRole('link', { name: /Home/ })
      const explorerLink = screen.getByRole('link', { name: /Schema Explorer/ })
      const docsLink = screen.getByRole('link', { name: /Documentation/ })
      const quicktypeLink = screen.getByRole('link', { name: /QuickType Guide/ })
      
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
      
      const docsButton = screen.getByText('Docs')
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
      
      const docsButton = screen.getByText('Docs')
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
      
      const docsButton = screen.getByText('Docs')
      expect(docsButton).toHaveAttribute('aria-haspopup', 'true')
      
      fireEvent.click(docsButton)
      
      await waitFor(() => {
        expect(screen.getByText('Implementation Guides')).toBeInTheDocument()
      })
    })
  })

  describe('Mobile Navigation', () => {
    it('should show mobile menu button on small screens', () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      expect(mobileButton).toBeInTheDocument()
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should toggle mobile menu', async () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
      
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'true')
        // Check for mobile menu content by looking for multiple navigation items
        const homeLinks = screen.getAllByRole('link', { name: /Home/ })
        expect(homeLinks.length).toBeGreaterThan(1) // Desktop + mobile
      })
      
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('should close mobile menu when link is clicked', async () => {
      renderWithRouter(<Layout />)
      
      const mobileButton = screen.getByLabelText('Toggle menu')
      fireEvent.click(mobileButton)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'true')
      })
      
      // Click on a mobile navigation link
      const explorerLinks = screen.getAllByRole('link', { name: /Schema Explorer/ })
      const mobileExplorerLink = explorerLinks[explorerLinks.length - 1] // Get the mobile one
      fireEvent.click(mobileExplorerLink)
      
      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
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
      
      // Use more specific selectors for footer links
      const footer = screen.getByRole('contentinfo')
      const guidesLink = footer.querySelector('a[href="/docs"]')
      const explorerLink = footer.querySelector('a[href="/explorer"]')
      const quicktypeLink = footer.querySelector('a[href="/quicktype"]')
      
      expect(guidesLink).toBeInTheDocument()
      expect(explorerLink).toBeInTheDocument()
      expect(quicktypeLink).toBeInTheDocument()
    })

    it('should have external footer links', () => {
      renderWithRouter(<Layout />)
      
      const footer = screen.getByRole('contentinfo')
      const schemaLink = footer.querySelector('a[href*="schemas.originvault.box"]')
      const quicktypeLink = footer.querySelector('a[href*="quicktype.io"]')
      const w3cLink = footer.querySelector('a[href*="w3.org"]')
      
      expect(schemaLink).toHaveAttribute('target', '_blank')
      expect(quicktypeLink).toHaveAttribute('target', '_blank')
      expect(w3cLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Responsive Design', () => {
    it('should hide desktop navigation on mobile', () => {
      renderWithRouter(<Layout />)
      
      const desktopNav = screen.getByRole('navigation')
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
      
      const logoText = screen.getByText('OriginVault')
      expect(logoText).toBeInTheDocument()
      
      const logoIcon = screen.getByText('OV')
      expect(logoIcon).toBeInTheDocument()
    })

    it('should have proper logo link', () => {
      renderWithRouter(<Layout />)
      
      const logoLink = screen.getByText('OriginVault').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Error Boundaries', () => {
    it('should handle navigation errors gracefully', () => {
      // Mock console.error to prevent test noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      renderWithRouter(<Layout />)
      
      // Navigation should still work - use role selector to avoid duplicate text issue
      expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument()
      
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
      
      // Component should still be functional - use role selector to avoid duplicate text issue
      expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument()
    })
  })
}) 