// src/components/HintModal.detailed.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HintModal from './HintModal';
import { Hint } from '../data/challenges';

/**
 * COMPREHENSIVE UNIT TESTING TUTORIAL - HintModal Component
 * 
 * This file teaches you how to write thorough unit tests for a React component.
 * We'll cover:
 * - Different ways to query elements
 * - Testing props and callbacks
 * - Testing conditional rendering
 * - Accessibility testing
 * - Testing CSS classes and styles
 * - Performance considerations
 */

describe('HintModal Component - Complete Testing Guide', () => {
  // Default props that we'll reuse across tests
  const defaultHint: Hint = {
    message: 'This is a helpful hint',
    revealCode: 'console.log("solution");'
  };
  
  const mockOnClose = jest.fn();
  const mockOnAcceptPartialCode = jest.fn();
  
  // Reset mocks before each test to ensure isolation
  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnAcceptPartialCode.mockClear();
  });

  /**
   * LESSON 1: Basic Rendering Tests
   * Always start by testing that your component renders without crashing
   */
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      // This is the most basic test - does it render?
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // If we get here without errors, the test passes
    });

    it('displays the hint message', () => {
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Different ways to query for elements:
      // getByText - throws error if not found (use when element MUST exist)
      const hintMessage = screen.getByText('This is a helpful hint');
      expect(hintMessage).toBeInTheDocument();
      
      // Alternative queries you could use:
      // queryByText - returns null if not found (use for elements that might not exist)
      // findByText - returns a promise (use for async elements)
    });

    it('displays the modal title', () => {
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // You can also use regex for partial matches
      expect(screen.getByText(/hint/i)).toBeInTheDocument();
    });
  });

  /**
   * LESSON 2: Testing Conditional Rendering
   * Test what appears and what doesn't based on props
   */
  describe('Conditional Rendering', () => {
    it('shows partial code button when revealCode is provided', () => {
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      const partialCodeButton = screen.getByText('Show Partial Code');
      expect(partialCodeButton).toBeInTheDocument();
    });

    it('does not show partial code button when revealCode is not provided', () => {
      const hintWithoutCode: Hint = {
        message: 'Just a message, no code'
      };
      
      render(
        <HintModal 
          hint={hintWithoutCode}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // queryByText returns null instead of throwing
      const partialCodeButton = screen.queryByText('Show Partial Code');
      expect(partialCodeButton).not.toBeInTheDocument();
    });
  });

  /**
   * LESSON 3: Testing User Interactions
   * Test that user actions trigger the right callbacks
   */
  describe('User Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      // Setup userEvent for more realistic interactions
      const user = userEvent.setup();
      
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Find and click the close button
      const closeButton = screen.getByText('×');
      await user.click(closeButton);
      
      // Assert the callback was called
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledWith();
    });

    it('calls onAcceptPartialCode when partial code button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      const partialCodeButton = screen.getByText('Show Partial Code');
      await user.click(partialCodeButton);
      
      expect(mockOnAcceptPartialCode).toHaveBeenCalledTimes(1);
    });

    it('does not call callbacks on render', () => {
      // This tests that callbacks aren't accidentally triggered
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockOnAcceptPartialCode).not.toHaveBeenCalled();
    });
  });

  /**
   * LESSON 4: Testing Accessibility
   * Ensure your component is accessible to all users
   */
  describe('Accessibility', () => {
    it('has accessible button labels', () => {
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Check buttons can be found by their accessible roles
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('can be navigated with keyboard', async () => {
      const user = userEvent.setup();
      
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Tab through elements
      await user.tab();
      
      // Check focus (this is a simplified example)
      const partialCodeButton = screen.getByText('Show Partial Code');
      expect(partialCodeButton).toHaveFocus();
      
      // Press Enter on focused element
      await user.keyboard('{Enter}');
      expect(mockOnAcceptPartialCode).toHaveBeenCalled();
    });
  });

  /**
   * LESSON 5: Testing CSS and Styles
   * Verify visual properties when they're important to functionality
   */
  describe('Styling and CSS', () => {
    it('applies correct styling classes', () => {
      const { container } = render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Check for specific classes or inline styles
      const modal = container.firstChild;
      expect(modal).toHaveStyle({
        position: 'fixed',
        top: '0',
        left: '0'
      });
    });

    it('has proper z-index for overlay', () => {
      const { container } = render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      const overlay = container.firstChild;
      const computedStyle = window.getComputedStyle(overlay as Element);
      expect(parseInt(computedStyle.zIndex)).toBeGreaterThan(1000);
    });
  });

  /**
   * LESSON 6: Integration Tests
   * Test how the component works with different prop combinations
   */
  describe('Integration Scenarios', () => {
    it('handles rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      
      render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      const closeButton = screen.getByText('×');
      
      // Simulate rapid clicking
      await user.click(closeButton);
      await user.click(closeButton);
      await user.click(closeButton);
      
      // Should still only call once (component might unmount after first click)
      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });

    it('works with very long hint messages', () => {
      const longHint: Hint = {
        message: 'A'.repeat(1000) // Very long message
      };
      
      render(
        <HintModal 
          hint={longHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Should still render without breaking
      expect(screen.getByText(/A{50}/)).toBeInTheDocument();
    });
  });

  /**
   * LESSON 7: Snapshot Testing
   * Capture the component's rendered output
   */
  describe('Snapshot Tests', () => {
    it('matches snapshot with all props', () => {
      const { container } = render(
        <HintModal 
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot without reveal code', () => {
      const { container } = render(
        <HintModal 
          hint={{ message: 'No code hint' }}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  /**
   * LESSON 8: Performance Tests
   * Ensure the component performs well
   */
  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      
      // Wrap component to track renders
      const TestWrapper = (props: any) => {
        renderSpy();
        return <HintModal {...props} />;
      };
      
      const { rerender } = render(
        <TestWrapper
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Re-render with same props
      rerender(
        <TestWrapper
          hint={defaultHint}
          onClose={mockOnClose}
          onAcceptPartialCode={mockOnAcceptPartialCode}
        />
      );
      
      // Should only render twice (initial + rerender)
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});

/**
 * TESTING TIPS AND BEST PRACTICES:
 * 
 * 1. **Test Behavior, Not Implementation**: Focus on what the user sees/does
 * 2. **Use Descriptive Test Names**: Should read like documentation
 * 3. **Follow AAA Pattern**: Arrange, Act, Assert
 * 4. **One Assertion Per Test**: Keep tests focused (some flexibility allowed)
 * 5. **Mock External Dependencies**: Keep tests isolated
 * 6. **Test Edge Cases**: Empty states, errors, extreme values
 * 7. **Maintainable Tests**: Refactor tests like production code
 * 8. **Fast Tests**: Unit tests should run in milliseconds
 * 
 * COMMON TESTING MISTAKES TO AVOID:
 * 
 * 1. Testing implementation details (like state variables)
 * 2. Not cleaning up after tests (memory leaks)
 * 3. Overly specific queries (brittle tests)
 * 4. Not testing error scenarios
 * 5. Skipping accessibility tests
 * 6. Writing tests that always pass
 * 7. Not testing async behavior properly
 */