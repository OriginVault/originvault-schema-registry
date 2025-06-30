import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeAll(() => {
  globalThis.fetch = vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })) as any;
});

describe('App routing', () => {
  it('renders Documentation page on /documentation', () => {
    render(
      <MemoryRouter initialEntries={['/documentation']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/documentation/i)).toBeInTheDocument();
  });

  it('renders QuickType page on /quicktype', () => {
    render(
      <MemoryRouter initialEntries={['/quicktype']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/quicktype/i)).toBeInTheDocument();
  });

  it('renders Schema Explorer on /schemas', () => {
    render(
      <MemoryRouter initialEntries={['/schemas']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/schema explorer/i)).toBeInTheDocument();
  });

  it('renders NotFound on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/thispagedoesnotexist']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
}); 