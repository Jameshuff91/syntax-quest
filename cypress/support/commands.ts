// cypress/support/commands.ts

/**
 * CUSTOM CYPRESS COMMANDS
 * 
 * This file contains reusable commands that extend Cypress functionality.
 * Commands defined here can be used in any test file.
 */

/**
 * NAVIGATION COMMANDS
 */

// Visit and wait for page load
Cypress.Commands.add('visitAndWait', (url: string) => {
  cy.visit(url);
  cy.get('body').should('be.visible');
  // Wait for any initial animations
  cy.wait(500);
});

/**
 * EDITOR COMMANDS
 * Commands for interacting with Monaco editor
 */

// Type in Monaco editor (complex due to Monaco's architecture)
Cypress.Commands.add('typeInMonaco', (text: string) => {
  cy.get('.monaco-editor').click();
  cy.focused().type('{ctrl}a').type(text);
});

// Get Monaco editor content
Cypress.Commands.add('getMonacoContent', () => {
  return cy.window().then((win: any) => {
    const editor = win.monaco.editor.getModels()[0];
    return editor.getValue();
  });
});

/**
 * TESTING COMMANDS
 * Commands specific to Syntax Quest features
 */

// Submit current code
Cypress.Commands.add('submitCode', () => {
  cy.contains('button', 'Submit').click();
});

// Wait for test results
Cypress.Commands.add('waitForResult', () => {
  cy.contains(/Success|Incorrect|Error/, { timeout: 10000 })
    .should('be.visible');
});

// Complete a specific challenge by ID
Cypress.Commands.add('completeChallenge', (challengeId: string, solution: string) => {
  // This would need to navigate to specific challenge
  // and submit the solution
  cy.typeInMonaco(solution);
  cy.submitCode();
  cy.waitForResult();
});

/**
 * ASSERTION COMMANDS
 * Custom assertions for common checks
 */

// Assert challenge is displayed correctly
Cypress.Commands.add('shouldShowChallenge', () => {
  cy.get('.challenge-card').should('be.visible');
  cy.get('h2').should('exist'); // Title
  cy.get('p').should('exist');   // Description
  cy.get('.monaco-editor, textarea').should('exist'); // Editor
  cy.contains('button', 'Submit').should('be.visible');
});

// Assert progress has been saved
Cypress.Commands.add('shouldHaveProgress', (expectedCount: number) => {
  cy.visit('/progress');
  cy.contains(`${expectedCount}`).should('be.visible');
});

/**
 * UTILITY COMMANDS
 */

// Clear all application state
Cypress.Commands.add('clearAppState', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
  cy.clearCookies();
});

// Login (if authentication is implemented)
Cypress.Commands.add('login', (email?: string, password?: string) => {
  // Mock login flow
  cy.contains('Sign In').click();
  // In real app, would fill form and submit
});

// Set up test data
Cypress.Commands.add('seedTestData', () => {
  // Could set up localStorage with test data
  cy.window().then((win) => {
    win.localStorage.setItem('completedChallenges', JSON.stringify(['js-101', 'js-102']));
  });
});

/**
 * ACCESSIBILITY COMMANDS
 */

// Tab through page
Cypress.Commands.add('tabThrough', (count: number = 1) => {
  for (let i = 0; i < count; i++) {
    cy.focused().tab();
  }
});

// Check basic accessibility
Cypress.Commands.add('checkA11y', () => {
  // Check for basic accessibility issues
  // In real app, might use cypress-axe plugin
  
  // Check all images have alt text
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  // Check all buttons have accessible text
  cy.get('button').each(($button) => {
    cy.wrap($button).invoke('text').should('not.be.empty');
  });
});

/**
 * API MOCKING COMMANDS
 */

// Mock successful challenge submission
Cypress.Commands.add('mockSuccessfulSubmission', () => {
  cy.intercept('POST', '**/submit', {
    statusCode: 200,
    body: { success: true }
  }).as('submission');
});

// Mock failed challenge submission
Cypress.Commands.add('mockFailedSubmission', () => {
  cy.intercept('POST', '**/submit', {
    statusCode: 200,
    body: { success: false, message: 'Incorrect solution' }
  }).as('submission');
});

/**
 * TYPE DEFINITIONS
 * Extend Cypress namespace with our custom commands
 */

declare global {
  namespace Cypress {
    interface Chainable {
      visitAndWait(url: string): Chainable<void>;
      typeInMonaco(text: string): Chainable<void>;
      getMonacoContent(): Chainable<string>;
      submitCode(): Chainable<void>;
      waitForResult(): Chainable<void>;
      completeChallenge(challengeId: string, solution: string): Chainable<void>;
      shouldShowChallenge(): Chainable<void>;
      shouldHaveProgress(expectedCount: number): Chainable<void>;
      clearAppState(): Chainable<void>;
      login(email?: string, password?: string): Chainable<void>;
      seedTestData(): Chainable<void>;
      tabThrough(count?: number): Chainable<void>;
      checkA11y(): Chainable<void>;
      mockSuccessfulSubmission(): Chainable<void>;
      mockFailedSubmission(): Chainable<void>;
    }
  }
}

export {};

/**
 * TIPS FOR WRITING CUSTOM COMMANDS:
 * 
 * 1. Make commands do one thing well
 * 2. Use descriptive names
 * 3. Add TypeScript types for better IDE support
 * 4. Handle edge cases (element not found, etc.)
 * 5. Make commands chainable when appropriate
 * 6. Document complex commands
 * 7. Consider parameters for flexibility
 * 8. Return useful values for assertions
 * 
 * EXAMPLE USAGE IN TESTS:
 * 
 * ```typescript
 * it('should complete a challenge', () => {
 *   cy.visitRealm('javascript');
 *   cy.shouldShowChallenge();
 *   cy.typeInMonaco('function hello() { return "world"; }');
 *   cy.submitCode();
 *   cy.waitForResult();
 *   cy.contains('Success').should('be.visible');
 * });
 * ```
 */