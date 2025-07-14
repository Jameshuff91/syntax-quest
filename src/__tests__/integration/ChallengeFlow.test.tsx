// src/__tests__/integration/ChallengeFlow.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { GameProvider, GameContext } from '../../contexts/GameContext';
import ChallengeCard from '../../components/ChallengeCard';
import { Challenge } from '../../data/challenges';

/**
 * INTEGRATION TESTING TUTORIAL
 * 
 * Integration tests verify that multiple components work together correctly.
 * Unlike unit tests that test components in isolation, integration tests
 * test the interactions between components.
 * 
 * This test file demonstrates testing a complete user flow:
 * 1. User sees a challenge
 * 2. User writes code
 * 3. User gets hints
 * 4. User submits solution
 * 5. Progress is tracked
 */

// Helper function to render with all necessary providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <GameProvider>
        {component}
      </GameProvider>
    </BrowserRouter>
  );
};

// Mock challenge for testing
const mockChallenge: Challenge = {
  id: 'test-integration-1',
  title: 'Add Two Numbers',
  description: 'Write a function that adds two numbers',
  starterCode: 'function add(a, b) {\n  // TODO: Implement\n}',
  solutionCode: 'function add(a, b) {\n  return a + b;\n}',
  hints: [
    {
      message: 'Use the + operator',
      revealCode: 'return a + b;'
    }
  ],
  tests: [
    {
      description: 'Should add 2 + 3',
      input: [2, 3],
      expected: 5
    }
  ],
  realm: 'javascript',
  difficulty: 'easy',
  currentAttempts: 0,
  showSolution: false
};

describe('Challenge Flow Integration Tests', () => {
  beforeEach(() => {
    // Reset any mocks or state before each test
    jest.clearAllMocks();
  });

  /**
   * TEST 1: Complete Challenge Flow
   * This tests the entire flow from start to completion
   */
  it('completes a full challenge flow from start to success', async () => {
    const user = userEvent.setup();
    const onSuccess = jest.fn();
    
    renderWithProviders(
      <ChallengeCard
        challenge={mockChallenge}
        onSuccess={onSuccess}
        onSelect={() => {}}
      />
    );
    
    // Step 1: Verify initial state
    expect(screen.getByText('Add Two Numbers')).toBeInTheDocument();
    expect(screen.getByText('Write a function that adds two numbers')).toBeInTheDocument();
    
    // Step 2: Find the code editor (Monaco editor in real app)
    // In tests, we'll interact with the textarea that Monaco renders
    const codeEditor = screen.getByRole('textbox');
    expect(codeEditor).toHaveValue('function add(a, b) {\n  // TODO: Implement\n}');
    
    // Step 3: User writes incorrect code first
    await user.clear(codeEditor);
    await user.type(codeEditor, 'function add(a, b) {\n  return a - b; // Wrong!\n}');
    
    // Step 4: Submit incorrect solution
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    // Step 5: Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Incorrect/)).toBeInTheDocument();
    });
    
    // Step 6: Hint should appear after failed attempt
    // (This depends on your implementation)
    
    // Step 7: User fixes the code
    await user.clear(codeEditor);
    await user.type(codeEditor, 'function add(a, b) {\n  return a + b;\n}');
    
    // Step 8: Submit correct solution
    await user.click(submitButton);
    
    // Step 9: Verify success
    await waitFor(() => {
      expect(screen.getByText(/Success/)).toBeInTheDocument();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  /**
   * TEST 2: Hint System Integration
   * Tests that hints work correctly with attempts
   */
  it('shows hints progressively after failed attempts', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ChallengeCard
        challenge={mockChallenge}
        onSuccess={() => {}}
        onSelect={() => {}}
      />
    );
    
    const codeEditor = screen.getByRole('textbox');
    const submitButton = screen.getByText('Submit');
    
    // First attempt - wrong answer
    await user.clear(codeEditor);
    await user.type(codeEditor, 'function add(a, b) { return 0; }');
    await user.click(submitButton);
    
    // Wait for hint modal to appear
    await waitFor(() => {
      expect(screen.getByText('Use the + operator')).toBeInTheDocument();
    });
    
    // Close hint modal
    const closeButton = screen.getByText('×');
    await user.click(closeButton);
    
    // Verify hint modal is closed
    expect(screen.queryByText('Use the + operator')).not.toBeInTheDocument();
  });

  /**
   * TEST 3: Progress Tracking Integration
   * Tests that GameContext properly tracks progress
   */
  it('tracks attempts and completion in GameContext', async () => {
    const user = userEvent.setup();
    
    const CompletionTracker = () => {
      const { completedChallenges, attempts } = React.useContext(GameContext);
      return (
        <div>
          <p>Completed: {completedChallenges.length}</p>
          <p>Attempts: {attempts[mockChallenge.id] || 0}</p>
        </div>
      );
    };
    
    renderWithProviders(
      <>
        <ChallengeCard
          challenge={mockChallenge}
          onSuccess={() => {}}
          onSelect={() => {}}
        />
        <CompletionTracker />
      </>
    );
    
    // Initial state
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
    expect(screen.getByText('Attempts: 0')).toBeInTheDocument();
    
    // Make a failed attempt
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    // Attempts should increase
    await waitFor(() => {
      expect(screen.getByText('Attempts: 1')).toBeInTheDocument();
    });
    
    // Complete the challenge
    const codeEditor = screen.getByRole('textbox');
    await user.clear(codeEditor);
    await user.type(codeEditor, mockChallenge.solutionCode);
    await user.click(submitButton);
    
    // Completion should be tracked
    await waitFor(() => {
      expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    });
  });

  /**
   * TEST 4: Error Handling Integration
   * Tests that errors are properly caught and displayed
   */
  it('handles code execution errors gracefully', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ChallengeCard
        challenge={mockChallenge}
        onSuccess={() => {}}
        onSelect={() => {}}
      />
    );
    
    const codeEditor = screen.getByRole('textbox');
    
    // Write code with syntax error
    await user.clear(codeEditor);
    await user.type(codeEditor, 'function add(a, b) { syntax error! }');
    
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    // Should show error message, not crash
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
    
    // App should still be functional
    expect(submitButton).toBeEnabled();
  });

  /**
   * TEST 5: Partial Code Acceptance
   * Tests the flow of accepting hint code
   */
  it('accepts partial code from hints', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ChallengeCard
        challenge={mockChallenge}
        onSuccess={() => {}}
        onSelect={() => {}}
      />
    );
    
    // Fail first to get hint
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    // Wait for hint modal
    await waitFor(() => {
      expect(screen.getByText('Show Partial Code')).toBeInTheDocument();
    });
    
    // Accept partial code
    const partialCodeButton = screen.getByText('Show Partial Code');
    await user.click(partialCodeButton);
    
    // Verify code was updated
    const codeEditor = screen.getByRole('textbox');
    await waitFor(() => {
      expect(codeEditor).toHaveValue(expect.stringContaining('return a + b;'));
    });
  });
});

/**
 * INTEGRATION TESTING BEST PRACTICES:
 * 
 * 1. **Test User Journeys**: Focus on complete workflows, not individual functions
 * 2. **Use Real Components**: Don't mock components unless absolutely necessary
 * 3. **Test State Changes**: Verify that state updates propagate correctly
 * 4. **Test Error Scenarios**: Ensure errors in one component don't break others
 * 5. **Keep Tests Focused**: Each test should verify one integration scenario
 * 6. **Use Helpers**: Create utility functions for common setup
 * 7. **Wait for Async**: Use waitFor() for async state updates
 * 8. **Test Edge Cases**: What happens when components interact unexpectedly?
 * 
 * COMMON INTEGRATION TEST SCENARIOS:
 * 
 * - Form submission flows
 * - Navigation between pages
 * - Data fetching and display
 * - Error boundaries catching errors
 * - Context updates affecting multiple components
 * - Modal/dialog interactions
 * - Authentication flows
 * - Real-time updates
 */