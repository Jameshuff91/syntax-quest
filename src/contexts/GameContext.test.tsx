import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { GameProvider, GameContext } from './GameContext';

describe('GameContext', () => {
  const TestComponent = () => {
    return (
      <GameContext.Consumer>
        {({ completedChallenges, addCompletedChallenge, attempts, incrementAttempt }) => (
          <div>
            <div data-testid="completed">{completedChallenges.join(',')}</div>
            <button onClick={() => addCompletedChallenge('test-1', 1, 'easy')}>Complete</button>
            <div data-testid="attempts">{attempts['test-1'] || 0}</div>
            <button onClick={() => incrementAttempt('test-1')}>Attempt</button>
          </div>
        )}
      </GameContext.Consumer>
    );
  };

  it('should track completed challenges', async () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    const completeButton = screen.getByText('Complete');
    await act(async () => {
      completeButton.click();
    });
    
    const completed = screen.getByTestId('completed');
    expect(completed.textContent).toBe('test-1');
  });

  it('should track challenge attempts', async () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    const attemptButton = screen.getByText('Attempt');
    await act(async () => {
      attemptButton.click();
      attemptButton.click();
    });
    
    const attempts = screen.getByTestId('attempts');
    expect(attempts.textContent).toBe('2');
  });
});
