import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../theme';
import VCGuide from '../pages/VCGuide';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('VCGuide', () => {
  it('renders the main title', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('How Verifiable Credentials Work')).toBeInTheDocument();
  });

  it('renders the stepper with all steps', () => {
    renderWithRouter(<VCGuide />);
    
    expect(screen.getByText('What are Verifiable Credentials?')).toBeInTheDocument();
    expect(screen.getByText('Core Components')).toBeInTheDocument();
    expect(screen.getByText('Credential Structure')).toBeInTheDocument();
    expect(screen.getByText('Verifiable Presentations')).toBeInTheDocument();
    expect(screen.getByText('Implementation Workflow')).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('Key Concepts')).toBeInTheDocument();
  });

  it('renders technical standards section', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('Technical Standards')).toBeInTheDocument();
  });

  it('renders use cases section', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('Common Use Cases')).toBeInTheDocument();
  });

  it('renders security and privacy section', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('Security & Privacy Features')).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    renderWithRouter(<VCGuide />);
    expect(screen.getByText('Try VC Tools')).toBeInTheDocument();
    expect(screen.getByText('Browse Schemas')).toBeInTheDocument();
    expect(screen.getByText('View Documentation')).toBeInTheDocument();
  });
}); 