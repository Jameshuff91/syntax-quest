import React from 'react';
import { render, screen } from '@testing-library/react';
import ChallengeCard from './ChallengeCard';

describe('ChallengeCard component', () => {
  const mockChallenge = {
    id: 'test-challenge',
    title: 'Test Challenge',
    description: 'This is a test challenge',
    difficulty: 'easy',
    realm: 'javascript',
    starterCode: 'const x = 1;',
    solutionCode: 'const x = 2;',
    hints: [],
    tests: []
  };

  const mockOnSelect = jest.fn();

  it('renders challenge title and description', () => {
    render(
      <ChallengeCard 
        challenge={mockChallenge}
        onSelect={mockOnSelect}
        onSuccess={() => {}}
      />
    );
    
    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText('This is a test challenge')).toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    render(
      <ChallengeCard 
        challenge={mockChallenge}
        onSelect={mockOnSelect}
        onSuccess={() => {}}
      />
    );
    
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    render(
      <ChallengeCard 
        challenge={mockChallenge}
        onSelect={mockOnSelect}
        onSuccess={() => {}}
      />
    );
    
    screen.getByText('Test Challenge').click();
    expect(mockOnSelect).toHaveBeenCalledWith('test-challenge');
  });
});
