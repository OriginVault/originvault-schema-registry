import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from '../App';
import { lightTheme } from '../theme';
import { BrowserRouter } from 'react-router-dom';

// Create FullscreenContext for testing
interface FullscreenContextType {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

const FullscreenContext = React.createContext<FullscreenContextType | undefined>(undefined);

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-router">{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-routes">{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div data-testid="mock-route">{element}</div>,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to} data-testid="mock-link">{children}</a>,
  useNavigate: () => vi.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
  }),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, language, height, onChange, onMount, options, theme }: any) => {
    // Simulate onMount callback
    if (onMount) {
      setTimeout(() => {
        onMount({ updateOptions: vi.fn(), layout: vi.fn() }, {
          editor: {
            defineTheme: vi.fn(),
            setTheme: vi.fn(),
          }
        });
      }, 0);
    }
    return (
      <div data-testid="monaco-editor" data-language={language} data-theme={theme}>
        <pre>{value}</pre>
      </div>
    );
  }
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const setIsFullscreen = vi.fn();
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <FullscreenContext.Provider value={{ isFullscreen: false, setIsFullscreen }}>
          {children}
        </FullscreenContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    expect(screen.getByTestId('mock-router')).toBeInTheDocument();
  });

  it('should render the main layout', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    // Use getAllByText since the text appears in multiple places (header and homepage)
    const titles = screen.getAllByText('OriginVault Schema Registry');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should render navigation', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    // Use getAllByTestId since there are multiple navigation links
    const links = screen.getAllByTestId('mock-link');
    expect(links.length).toBeGreaterThan(0);
  });
}); 