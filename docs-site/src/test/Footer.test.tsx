import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it('should render footer content', () => {
    renderFooter();
    expect(screen.getByText(/OriginVault, LLC/i)).toBeInTheDocument();
  });

  it('should render documentation links', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /Terms of Use/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
  });

  it('should render external links', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });
}); 