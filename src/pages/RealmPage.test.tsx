import React from 'react';
import { render, screen } from '@testing-library/react';
import RealmPage from './RealmPage';
import { useGameContext } from '../contexts/GameContext';

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
      error: null
    }));
  });

  it('displays completed challenges count when they exist', () => {
    (useGameContext as jest.Mock).mockImplementation(() => ({
      completedChallenges: ['challenge1', 'challenge2'],
      currentChallenge: null
    }));

    render(<RealmPage />);
    expect(screen.getByText('Completed Challenges: 2')).toBeInTheDocument();
  });

  it('does not display completed section when none exist', () => {
    render(<RealmPage />);
    expect(screen.queryByText(/Completed Challenges:/i)).toBeNull();
  });
});
