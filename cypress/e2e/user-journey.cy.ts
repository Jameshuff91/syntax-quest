/**
 * END-TO-END TESTING TUTORIAL WITH CYPRESS
 * 
 * End-to-End (E2E) tests simulate real user interactions with your application.
 * Unlike unit tests (single components) or integration tests (component groups),
 * E2E tests verify complete user workflows from start to finish.
 * 
 * Cypress is a modern E2E testing framework that:
 * - Runs in the browser alongside your app
 * - Provides visual feedback and time travel debugging
 * - Automatically waits for elements and async operations
 * - Takes screenshots and videos of test runs
 */

describe('Syntax Quest User Journey', () => {
  /**
   * LESSON 1: Basic Navigation
   * Test that users can navigate between pages
   */
  describe('Navigation', () => {
    beforeEach(() => {
      // Visit the home page before each test
      cy.visit('/');
    });

    it('should display the home page with all realm buttons', () => {
      // Check page title
      cy.contains('h1', 'Welcome to Syntax Quest!').should('be.visible');
      
      // Verify all realm buttons exist
      cy.contains('button', 'Start Javascript Adventure').should('be.visible');
      cy.contains('button', 'Start Typescript Adventure').should('be.visible');
      cy.contains('button', 'Start React Adventure').should('be.visible');
      cy.contains('button', 'Start Testing Adventure').should('be.visible');
      cy.contains('button', 'Start Debugging Adventure').should('be.visible');
    });

    it('should navigate to JavaScript realm when button is clicked', () => {
      // Click the JavaScript button
      cy.contains('Start Javascript Adventure').click();
      
      // Verify URL changed
      cy.url().should('include', '/realm/javascript');
      
      // Verify we're on the right page (would need actual content)
      // cy.contains('JavaScript Challenges').should('be.visible');
    });

    it('should navigate to progress dashboard', () => {
      // Click progress link in header
      cy.contains('Progress').click();
      
      // Verify we're on progress page
      cy.url().should('include', '/progress');
      cy.contains('Your Progress Dashboard').should('be.visible');
    });
  });

  /**
   * LESSON 2: Complete User Workflow
   * Test a complete challenge completion flow
   */
  describe('Challenge Completion Flow', () => {
    it('should complete a challenge from start to finish', () => {
      // 1. Start from home
      cy.visit('/');
      
      // 2. Navigate to JavaScript realm
      cy.contains('Start Javascript Adventure').click();
      
      // 3. Wait for challenge to load
      cy.get('.challenge-card', { timeout: 10000 }).should('be.visible');
      
      // 4. Check challenge elements
      cy.get('h2').should('exist'); // Challenge title
      cy.get('p').should('exist'); // Challenge description
      
      // 5. Interact with code editor
      cy.get('textarea, [role="textbox"]').should('exist');
      
      // 6. Submit button should be visible
      cy.contains('button', 'Submit').should('be.visible');
      
      // Note: Actually completing a challenge would require:
      // - Typing in the Monaco editor (complex in Cypress)
      // - Submitting the solution
      // - Verifying success message
    });
  });

  /**
   * LESSON 3: Testing Difficulty Filters
   * Verify filtering functionality works correctly
   */
  describe('Difficulty Filtering', () => {
    beforeEach(() => {
      cy.visit('/realm/javascript');
    });

    it('should filter challenges by difficulty', () => {
      // Wait for page to load
      cy.get('.challenge-card').should('be.visible');
      
      // Test Easy filter
      cy.contains('button', 'Easy').click();
      // Verify only easy challenges shown (would need to check badge)
      cy.contains('span', 'easy').should('be.visible');
      
      // Test Medium filter
      cy.contains('button', 'Medium').click();
      // If there are medium challenges, they should show
      // If not, "No challenges found" message should appear
      
      // Test All filter returns to showing everything
      cy.contains('button', 'All').click();
    });
  });

  /**
   * LESSON 4: Testing Error Scenarios
   * Ensure the app handles errors gracefully
   */
  describe('Error Handling', () => {
    it('should handle navigation to non-existent realm', () => {
      // Visit invalid URL
      cy.visit('/realm/nonexistent', { failOnStatusCode: false });
      
      // App should handle this gracefully
      // Either redirect to home or show error message
    });

    it('should show error when submitting invalid code', () => {
      cy.visit('/realm/javascript');
      
      // Wait for challenge
      cy.get('.challenge-card').should('be.visible');
      
      // Submit without changing code (assuming starter code is incomplete)
      cy.contains('button', 'Submit').click();
      
      // Should show error message
      cy.contains('Incorrect').should('be.visible');
    });
  });

  /**
   * LESSON 5: Testing Responsive Design
   * Ensure app works on different screen sizes
   */
  describe('Responsive Design', () => {
    it('should work on mobile devices', () => {
      // Set mobile viewport
      cy.viewport('iphone-x');
      
      cy.visit('/');
      
      // All buttons should still be visible and clickable
      cy.contains('Start Javascript Adventure').should('be.visible');
      
      // Navigation should work
      cy.contains('Progress').click();
      cy.url().should('include', '/progress');
    });

    it('should work on tablet devices', () => {
      cy.viewport('ipad-2');
      
      cy.visit('/');
      
      // Layout should adapt to tablet size
      cy.get('[style*="grid"]').should('be.visible');
    });
  });

  /**
   * LESSON 6: Testing Progress Tracking
   * Verify that progress is tracked correctly
   */
  describe('Progress Tracking', () => {
    it('should show initial state with no progress', () => {
      cy.visit('/progress');
      
      // Should show 0% progress initially
      cy.contains('0 of').should('be.visible');
      cy.contains('0%').should('be.visible');
    });

    it('should update progress after completing a challenge', () => {
      // This would require actually completing a challenge
      // In a real test, you'd:
      // 1. Complete a challenge
      // 2. Navigate to progress
      // 3. Verify the progress increased
    });
  });

  /**
   * LESSON 7: Testing Authentication (if implemented)
   * Test sign in/out functionality
   */
  describe('Authentication', () => {
    it('should toggle sign in/out button', () => {
      cy.visit('/');
      
      // Find sign in button
      cy.contains('button', 'Sign In').should('be.visible');
      
      // Click it
      cy.contains('button', 'Sign In').click();
      
      // Should change to Sign Out (in mock implementation)
      cy.contains('button', 'Sign Out').should('be.visible');
    });
  });

  /**
   * LESSON 8: Performance Testing
   * Ensure the app loads quickly
   */
  describe('Performance', () => {
    it('should load home page quickly', () => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.performance.mark('start');
        },
        onLoad: (win) => {
          win.performance.mark('end');
          win.performance.measure('pageLoad', 'start', 'end');
          const measure = win.performance.getEntriesByName('pageLoad')[0];
          
          // Page should load in under 3 seconds
          expect(measure.duration).to.be.lessThan(3000);
        },
      });
    });
  });
});

/**
 * CYPRESS BEST PRACTICES:
 * 
 * 1. **Use data-cy attributes**: Add data-cy="submit-button" for reliable selection
 * 2. **Avoid brittle selectors**: Don't use classes that might change
 * 3. **Wait intelligently**: Cypress auto-waits, but sometimes you need explicit waits
 * 4. **Test user flows**: Think like a user, not a developer
 * 5. **Keep tests independent**: Each test should run standalone
 * 6. **Use beforeEach**: Set up consistent starting state
 * 7. **Test happy and sad paths**: Both success and failure scenarios
 * 8. **Make tests readable**: Tests are documentation
 * 
 * COMMON CYPRESS COMMANDS:
 * 
 * - cy.visit(url): Navigate to a page
 * - cy.contains(text): Find element containing text
 * - cy.get(selector): Find element by selector
 * - cy.click(): Click an element
 * - cy.type(text): Type into an input
 * - cy.should(assertion): Make an assertion
 * - cy.wait(ms): Explicit wait (use sparingly)
 * - cy.intercept(): Mock API calls
 * 
 * RUNNING TESTS:
 * 
 * 1. Start your app: npm start
 * 2. Run Cypress: npx cypress open (interactive) or npx cypress run (headless)
 * 3. Select E2E testing
 * 4. Choose a browser
 * 5. Run your tests!
 */