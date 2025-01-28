import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { default as RealmPage } from './RealmPage';
import { useGameContext, GameProvider } from '../contexts/GameContext';

jest.mock('../contexts/GameContext', () => ({
  useGameContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ realmId: 'test-realm' })
}));

describe('RealmPage Component', () => {
  beforeEach(() => {
    (useGameContext as jest.Mock).mockImplementation(() => ({
      completedChallenges: [],
      currentChallenge: null,
      isLoading: false,
      error: null,
      setCompletedChallenges: jest.fn(), // Add mock for setCompletedChallenges if needed in component
      setCurrentChallenge: jest.fn(),     // Add mock for setCurrentChallenge if needed
      setIsLoading: jest.fn(),          // Add mock for setIsLoading if needed
      setError: jest.fn()               // Add mock for setError if needed
    }));
  });

  it('displays completed challenges count when they exist', () => {
    (useGameContext as jest.Mock).mockImplementation(() => ({
      completedChallenges: ['challenge1', 'challenge2'],
      currentChallenge: null,
      setCompletedChallenges: jest.fn(),
      setCurrentChallenge: jest.fn(),
      setIsLoading: jest.fn(),
      setError: jest.fn()
    }));

    render(
      <BrowserRouter>
        <GameProvider>
          <RealmPage />
        </GameProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Completed Challenges: 2')).toBeInTheDocument();
  });

  it('does not display completed section when none exist', () => {
    render(
      <GameProvider>
        <RealmPage />
      </GameProvider>
    );
    expect(screen.queryByText(/Completed Challenges:/i)).toBeNull();
  });
});
