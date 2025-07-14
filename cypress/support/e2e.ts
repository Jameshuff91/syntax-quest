// cypress/support/e2e.ts

/**
 * CYPRESS SUPPORT FILE
 * 
 * This file is loaded before every test file.
 * Use it to set up custom commands, global configuration,
 * and test helpers that you want available in all tests.
 */

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * GLOBAL HOOKS
 * These run before/after all tests
 */

// Run before all tests
before(() => {
  // Clear localStorage, cookies, etc.
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Run before each test
beforeEach(() => {
  // Set up consistent test state
  // For example, always start logged out
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

/**
 * CUSTOM COMMANDS
 * Add reusable commands for common actions
 */

// Navigate to a specific realm
Cypress.Commands.add('visitRealm', (realm: string) => {
  cy.visit(`/realm/${realm}`);
  cy.get('.challenge-card', { timeout: 10000 }).should('be.visible');
});

// Complete a challenge (mock implementation)
Cypress.Commands.add('completeChallenge', (code: string) => {
  // Type in editor (simplified - Monaco is complex)
  cy.get('[role="textbox"], textarea').clear().type(code);
  
  // Submit
  cy.contains('button', 'Submit').click();
  
  // Wait for success
  cy.contains('Success', { timeout: 5000 }).should('be.visible');
});

// Check progress
Cypress.Commands.add('checkProgress', () => {
  cy.visit('/progress');
  return cy.get('[data-cy="progress-percentage"]').invoke('text');
});

/**
 * CUSTOM ASSERTIONS
 * Add custom Chai assertions
 */

// Check if element is in viewport
chai.Assertion.addMethod('inViewport', function () {
  const subject = this._obj;
  const $el = Cypress.$(subject);
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = $el[0].getBoundingClientRect();

  this.assert(
    rect.top < bottom && rect.bottom > 0,
    'expected #{this} to be in viewport',
    'expected #{this} to not be in viewport',
    subject
  );
});

/**
 * ERROR HANDLING
 * Handle uncaught exceptions
 */

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing tests due to uncaught exceptions
  // Only do this if you expect certain errors
  if (err.message.includes('ResizeObserver')) {
    return false; // Ignore ResizeObserver errors
  }
  
  // Let other errors fail the test
  return true;
});

/**
 * UTILITY FUNCTIONS
 * Helper functions for tests
 */

// Wait for Monaco editor to load
export const waitForMonaco = () => {
  cy.window().its('monaco').should('exist');
  cy.get('.monaco-editor').should('be.visible');
};

// Get current challenge title
export const getChallengeTitle = () => {
  return cy.get('h2').first().invoke('text');
};

// Mock successful API response
export const mockSuccessResponse = () => {
  cy.intercept('POST', '**/api/submit', {
    statusCode: 200,
    body: { success: true, message: 'Correct!' }
  }).as('submitChallenge');
};

/**
 * TYPE DECLARATIONS
 * Add TypeScript support for custom commands
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Navigate to a specific realm
       * @example cy.visitRealm('javascript')
       */
      visitRealm(realm: string): Chainable<void>;
      
      /**
       * Complete a challenge with given code
       * @example cy.completeChallenge('function hello() { return "world"; }')
       */
      completeChallenge(code: string): Chainable<void>;
      
      /**
       * Check current progress
       * @example cy.checkProgress().should('equal', '25%')
       */
      checkProgress(): Chainable<string>;
    }
  }
}

// Prevent TypeScript from treating this as a module
export {};

/**
 * BEST PRACTICES FOR SUPPORT FILE:
 * 
 * 1. Keep it organized - group related functionality
 * 2. Document custom commands clearly
 * 3. Make commands reusable and parameterized
 * 4. Handle common error cases
 * 5. Set up consistent test state
 * 6. Add TypeScript types for better IDE support
 * 7. Use meaningful command names
 * 8. Keep complex logic in separate files
 * 
 * WHEN TO ADD CUSTOM COMMANDS:
 * 
 * - Repeated actions across multiple tests
 * - Complex interactions that need abstraction
 * - Common assertions with custom logic
 * - Setup/teardown operations
 * - API mocking patterns
 */