// src/components/ErrorBoundary.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

/**
 * UNIT TESTING TUTORIAL - ErrorBoundary Component
 * 
 * This test file demonstrates how to test React error boundaries.
 * Error boundaries are special components that catch JavaScript errors
 * in their child component tree.
 * 
 * Key Testing Concepts:
 * 1. Testing error scenarios
 * 2. Testing component recovery
 * 3. Mocking console methods
 * 4. Testing user interactions
 */

// First, we create a component that will throw an error on demand
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary component', () => {
  // Save the original console.error method
  const originalError = console.error;
  
  beforeEach(() => {
    // Mock console.error to prevent error logs in test output
    // This is a common pattern when testing error boundaries
    console.error = jest.fn();
  });
  
  afterEach(() => {
    // Restore the original console.error after each test
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    // ARRANGE: Set up the component with no error
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    
    // ACT: No action needed - just rendering
    
    // ASSERT: Check that children are rendered normally
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders error UI when a child component throws', () => {
    // ARRANGE: Set up a component that will throw an error
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // ASSERT: Check that error UI is displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
    
    // Also verify that console.error was called
    expect(console.error).toHaveBeenCalled();
  });

  it('renders custom fallback when provided', () => {
    // ARRANGE: Provide a custom fallback UI
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // ASSERT: Custom fallback should be rendered instead of default
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('resets error state when "Try again" is clicked', async () => {
    // This test demonstrates async user interactions
    const user = userEvent.setup();
    
    // ARRANGE: Create a component that we can control
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // ASSERT: Error UI is shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    // ACT: Click the "Try again" button
    await user.click(screen.getByText('Try again'));
    
    // Re-render with no error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    // ASSERT: Normal content is shown again
    expect(screen.getByText('No error')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('displays error details in development mode', () => {
    // ARRANGE: Create a specific error to test
    const testError = new Error('Specific test error');
    
    // Create a component that throws our specific error
    const ThrowSpecificError = () => {
      throw testError;
    };
    
    render(
      <ErrorBoundary>
        <ThrowSpecificError />
      </ErrorBoundary>
    );
    
    // ASSERT: Error details should be visible
    const details = screen.getByText('Error details');
    expect(details).toBeInTheDocument();
    
    // The error message should be displayed
    expect(screen.getByText(/Specific test error/)).toBeInTheDocument();
  });

  it('catches errors from deeply nested components', () => {
    // This tests that error boundaries work for any descendant, not just direct children
    const DeepChild = () => {
      throw new Error('Deep error');
    };
    
    const MiddleComponent = () => <DeepChild />;
    
    render(
      <ErrorBoundary>
        <div>
          <MiddleComponent />
        </div>
      </ErrorBoundary>
    );
    
    // ASSERT: Error should still be caught
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

/**
 * TESTING BEST PRACTICES DEMONSTRATED:
 * 
 * 1. **Test Organization**: Use describe blocks to group related tests
 * 2. **Setup/Teardown**: Use beforeEach/afterEach for common setup
 * 3. **Mocking**: Mock console methods to keep test output clean
 * 4. **Arrange-Act-Assert**: Structure tests clearly
 * 5. **User Interactions**: Use userEvent for realistic interactions
 * 6. **Edge Cases**: Test both happy path and error scenarios
 * 7. **Descriptive Names**: Test names clearly describe what's being tested
 * 8. **Isolation**: Each test is independent and doesn't affect others
 */