import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from '../App';
import { lightTheme } from '../theme';

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
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </HelmetProvider>
);

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