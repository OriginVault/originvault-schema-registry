import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SimpleEditor from '../components/SimpleEditor';

describe('SimpleEditor', () => {
  const defaultProps = {
    value: 'test content',
    onChange: () => {},
    language: 'typescript' as const,
  };

  it('should render without crashing', () => {
    render(<SimpleEditor {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display the provided value', () => {
    render(<SimpleEditor {...defaultProps} value="hello world" />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveValue('hello world');
  });

  it('should handle readonly mode', () => {
    render(<SimpleEditor {...defaultProps} readOnly />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute('readonly');
  });
}); 