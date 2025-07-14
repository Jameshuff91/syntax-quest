import React from 'react';
import { render, screen } from '@testing-library/react';
import ChallengeCard from './ChallengeCard';
import { Challenge } from '../data/challenges';
import { GameProvider } from '../contexts/GameContext';

// Mock the useCompiler hook
jest.mock('../hooks/useCompiler');

describe('ChallengeCard component', () => {
  const mockChallenge: Challenge = {
    id: 'test-challenge',
    title: 'Test Challenge',
    description: 'This is a test challenge',
    difficulty: 'easy',
    realm: 'javascript',
    starterCode: '// Starter code',
    solutionCode: '// Solution code',
    hints: [],
    tests: [],
    currentAttempts: 0,
    showSolution: false
  };

  const mockOnSelect = jest.fn();

  it('renders challenge title and description', () => {
    render(
      <GameProvider>
        <ChallengeCard 
          challenge={mockChallenge}
          onSelect={mockOnSelect}
          onSuccess={() => {}}
        />
      </GameProvider>
    );
    
    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText('This is a test challenge')).toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    render(
      <GameProvider>
        <ChallengeCard 
          challenge={mockChallenge}
          onSelect={mockOnSelect}
          onSuccess={() => {}}
        />
      </GameProvider>
    );
    
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    render(
      <GameProvider>
        <ChallengeCard 
          challenge={mockChallenge}
          onSelect={mockOnSelect}
          onSuccess={() => {}}
        />
      </GameProvider>
    );
    
    screen.getByText('Test Challenge').click();
    expect(mockOnSelect).toHaveBeenCalledWith('test-challenge');
  });
});
