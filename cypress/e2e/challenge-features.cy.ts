/**
 * E2E TESTS FOR SPECIFIC CHALLENGE FEATURES
 * 
 * This file demonstrates how to test specific features in detail.
 * While user-journey.cy.ts tests complete flows, this file tests
 * individual features more thoroughly.
 */

describe('Challenge Features', () => {
  /**
   * Testing the Hint System
   */
  describe('Hint System', () => {
    beforeEach(() => {
      // Navigate to a challenge
      cy.visit('/realm/javascript');
    });

    it('should show hints after failed attempts', () => {
      // Get the submit button
      cy.contains('button', 'Submit').as('submitButton');
      
      // Submit wrong answer to trigger hint
      cy.get('@submitButton').click();
      
      // Error message should appear
      cy.contains('Incorrect').should('be.visible');
      
      // Hint modal might appear (depending on implementation)
      // cy.get('[data-cy="hint-modal"]').should('be.visible');
    });

    it('should allow closing hint modal', () => {
      // Trigger hint by failing
      cy.contains('button', 'Submit').click();
      
      // If hint modal appears, test closing it
      cy.get('body').then($body => {
        if ($body.text().includes('Hint')) {
          cy.contains('button', '×').click();
          // Modal should disappear
        }
      });
    });
  });

  /**
   * Testing Code Editor Features
   */
  describe('Code Editor', () => {
    beforeEach(() => {
      cy.visit('/realm/javascript');
    });

    it('should display starter code', () => {
      // Monaco editor should contain some starter code
      cy.get('[role="textbox"], textarea').should('exist');
      
      // Should have some content (starter code)
      cy.get('[role="textbox"], textarea')
        .invoke('text')
        .should('not.be.empty');
    });

    it('should allow editing code', () => {
      // This is tricky with Monaco editor
      // In real tests, you might need custom commands
      
      // Check that editor is not read-only
      cy.get('[role="textbox"], textarea')
        .should('not.have.attr', 'readonly');
    });
  });

  /**
   * Testing Challenge Navigation
   */
  describe('Challenge Navigation', () => {
    beforeEach(() => {
      cy.visit('/realm/javascript');
    });

    it('should navigate between challenges', () => {
      // Look for navigation buttons
      cy.get('body').then($body => {
        // If "Next Challenge" exists, test it
        if ($body.text().includes('Next Challenge')) {
          cy.contains('Next Challenge').click();
          
          // Should show different challenge
          // (would need to track challenge title/content)
        }
      });
    });

    it('should show previous button after navigating forward', () => {
      // First go to next challenge
      cy.get('body').then($body => {
        if ($body.text().includes('Next Challenge')) {
          cy.contains('Next Challenge').click();
          
          // Now "Previous Challenge" should appear
          cy.contains('Previous Challenge').should('be.visible');
        }
      });
    });
  });

  /**
   * Testing Progress Persistence
   */
  describe('Progress Persistence', () => {
    it('should remember completed challenges', () => {
      // Complete a challenge (mock)
      cy.visit('/realm/javascript');
      
      // Navigate away
      cy.visit('/');
      
      // Go to progress page
      cy.visit('/progress');
      
      // Progress should be saved (in real app with persistence)
      // This would require either localStorage or backend API
    });

    it('should track attempts', () => {
      cy.visit('/realm/javascript');
      
      // Make multiple attempts
      cy.contains('Submit').click();
      cy.wait(500);
      cy.contains('Submit').click();
      
      // Attempts should be tracked somewhere
      // Could check progress page or challenge display
    });
  });

  /**
   * Testing Error Boundaries
   */
  describe('Error Recovery', () => {
    it('should recover from errors gracefully', () => {
      // Visit a challenge
      cy.visit('/realm/javascript');
      
      // If an error occurs, error boundary should catch it
      // App should still be functional
      
      // Try navigating after potential error
      cy.contains('Progress').click();
      cy.url().should('include', '/progress');
    });
  });

  /**
   * Testing Accessibility
   */
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/realm/javascript');
    });

    it('should be keyboard navigable', () => {
      // Tab through interactive elements
      cy.get('body').tab();
      
      // Submit button should be focusable
      cy.contains('Submit').focus().should('have.focus');
    });

    it('should have proper ARIA labels', () => {
      // Buttons should have accessible text
      cy.contains('button', 'Submit')
        .should('have.attr', 'type');
      
      // Editor should have proper role
      cy.get('[role="textbox"], textarea').should('exist');
    });
  });

  /**
   * Testing Real-time Features
   */
  describe('Real-time Updates', () => {
    it('should update UI immediately after actions', () => {
      cy.visit('/realm/javascript');
      
      // Submit challenge
      cy.contains('Submit').click();
      
      // Result should appear immediately
      cy.contains(/Incorrect|Success/, { timeout: 5000 })
        .should('be.visible');
    });
  });
});

/**
 * ADVANCED CYPRESS TECHNIQUES:
 * 
 * 1. Custom Commands:
 * ```javascript
 * Cypress.Commands.add('completeChallenge', (solution) => {
 *   cy.get('[data-cy="editor"]').clear().type(solution);
 *   cy.contains('Submit').click();
 *   cy.contains('Success').should('be.visible');
 * });
 * ```
 * 
 * 2. Intercepting API Calls:
 * ```javascript
 * cy.intercept('POST', '/api/submit', { 
 *   statusCode: 200, 
 *   body: { success: true } 
 * }).as('submitChallenge');
 * 
 * cy.wait('@submitChallenge');
 * ```
 * 
 * 3. Testing with Different Data:
 * ```javascript
 * const testCases = [
 *   { input: 'code1', expected: 'Success' },
 *   { input: 'code2', expected: 'Error' }
 * ];
 * 
 * testCases.forEach(test => {
 *   it(`should handle ${test.input}`, () => {
 *     // Test logic
 *   });
 * });
 * ```
 * 
 * 4. Visual Testing:
 * ```javascript
 * cy.screenshot('challenge-page');
 * cy.percySnapshot('Challenge View'); // With Percy integration
 * ```
 * 
 * 5. Performance Monitoring:
 * ```javascript
 * cy.window().then((win) => {
 *   const performance = win.performance;
 *   const navigation = performance.getEntriesByType('navigation')[0];
 *   expect(navigation.loadEventEnd).to.be.lessThan(2000);
 * });
 * ```
 */

/**
 * DEBUGGING CYPRESS TESTS:
 * 
 * 1. Use cy.debug():
 *    cy.get('button').debug().click();
 * 
 * 2. Pause execution:
 *    cy.pause(); // Pauses test for manual inspection
 * 
 * 3. Check element state:
 *    cy.get('button').should('be.visible').and('be.enabled');
 * 
 * 4. Log information:
 *    cy.log('Current URL:', cy.url());
 * 
 * 5. Take screenshots:
 *    cy.screenshot('debug-state');
 */