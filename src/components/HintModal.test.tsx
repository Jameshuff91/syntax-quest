import React from 'react';
import { render, screen } from '@testing-library/react';
import HintModal from './HintModal';

describe('HintModal component', () => {
  const mockHint = {
    message: 'Test hint message',
    revealCode: 'partialSolutionCode'
  };
  
  const mockOnClose = jest.fn();
  const mockOnAcceptPartialCode = jest.fn();

  it('renders hint message', () => {
    render(
      <HintModal 
        hint={mockHint}
        onClose={mockOnClose}
        onAcceptPartialCode={mockOnAcceptPartialCode}
      />
    );
    
    expect(screen.getByText('Test hint message')).toBeInTheDocument();
  });

  it('shows partial code button when revealCode is true', () => {
    render(
      <HintModal 
        hint={mockHint}
        onClose={mockOnClose}
        onAcceptPartialCode={mockOnAcceptPartialCode}
      />
    );
    
    expect(screen.getByText('Accept Partial Code')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <HintModal 
        hint={mockHint}
        onClose={mockOnClose}
        onAcceptPartialCode={mockOnAcceptPartialCode}
      />
    );
    
    screen.getByText('Close').click();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onAcceptPartialCode when partial code button is clicked', () => {
    render(
      <HintModal 
        hint={mockHint}
        onClose={mockOnClose}
        onAcceptPartialCode={mockOnAcceptPartialCode}
      />
    );
    
    screen.getByText('Accept Partial Code').click();
    expect(mockOnAcceptPartialCode).toHaveBeenCalled();
  });
});
