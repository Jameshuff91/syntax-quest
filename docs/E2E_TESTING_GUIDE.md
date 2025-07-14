# End-to-End Testing Guide for Syntax Quest

## 🎯 What is E2E Testing?

End-to-End (E2E) testing simulates real user scenarios from start to finish. Unlike unit tests (testing individual functions) or integration tests (testing component interactions), E2E tests verify that your entire application works correctly from the user's perspective.

## 🛠️ Setting Up Cypress

### 1. Install Cypress
```bash
npm install --save-dev cypress
```

### 2. Add Scripts to package.json
```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:e2e": "start-server-and-test start http://localhost:3000 cypress:run"
  }
}
```

### 3. Install start-server-and-test (optional but recommended)
```bash
npm install --save-dev start-server-and-test
```

## 🚀 Running E2E Tests

### Interactive Mode (Best for Development)
1. Start your app: `npm start`
2. Open Cypress: `npm run cypress:open`
3. Select "E2E Testing"
4. Choose a browser
5. Click on a test file to run it

### Headless Mode (Best for CI/CD)
```bash
npm run test:e2e
```

## 📝 Writing Your First E2E Test

### Basic Test Structure
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Set up before each test
    cy.visit('/');
  });

  it('should do something', () => {
    // Arrange: Set up test conditions
    cy.contains('button', 'Click me');
    
    // Act: Perform actions
    cy.contains('button', 'Click me').click();
    
    // Assert: Verify results
    cy.contains('Success!').should('be.visible');
  });
});
```

## 🎓 E2E Testing Best Practices

### 1. **Test User Journeys, Not Implementation**
```typescript
// ❌ Bad: Testing implementation details
it('should set state.isLoading to true', () => {
  // Don't test internal state
});

// ✅ Good: Testing user experience
it('should show loading spinner while submitting', () => {
  cy.contains('Submit').click();
  cy.get('.spinner').should('be.visible');
});
```

### 2. **Keep Tests Independent**
```typescript
// ❌ Bad: Tests depend on each other
it('test 1', () => {
  cy.login();
  // Creates state for next test
});

it('test 2', () => {
  // Assumes test 1 ran first
});

// ✅ Good: Each test is self-contained
beforeEach(() => {
  cy.clearAppState();
  cy.login();
});

it('test 1', () => {
  // Independent test
});
```

### 3. **Use Custom Commands for Reusability**
```typescript
// Define in cypress/support/commands.ts
Cypress.Commands.add('completeChallenge', (code) => {
  cy.get('[data-cy="editor"]').type(code);
  cy.contains('Submit').click();
  cy.contains('Success').should('be.visible');
});

// Use in tests
it('should complete JavaScript challenge', () => {
  cy.visitRealm('javascript');
  cy.completeChallenge('function add(a, b) { return a + b; }');
});
```

### 4. **Add Data Attributes for Reliable Selection**
```typescript
// In your React component
<button data-cy="submit-button">Submit</button>

// In your test
cy.get('[data-cy="submit-button"]').click();
```

### 5. **Handle Async Operations Properly**
```typescript
// ❌ Bad: Not waiting for async operations
cy.get('button').click();
cy.get('.result').should('exist'); // Might fail

// ✅ Good: Cypress automatically waits
cy.get('button').click();
cy.get('.result', { timeout: 10000 }).should('exist');
```

## 🧪 Common E2E Test Scenarios for Syntax Quest

### 1. Challenge Completion Flow
```typescript
it('should complete a challenge from start to finish', () => {
  // Navigate to realm
  cy.visit('/realm/javascript');
  
  // Verify challenge loads
  cy.get('.challenge-card').should('be.visible');
  
  // Write solution
  cy.typeInMonaco('function hello() { return "Hello World"; }');
  
  // Submit
  cy.contains('Submit').click();
  
  // Verify success
  cy.contains('Success').should('be.visible');
  
  // Check progress updated
  cy.visit('/progress');
  cy.contains('1 of').should('be.visible');
});
```

### 2. Testing Error Handling
```typescript
it('should show error for incorrect solution', () => {
  cy.visitRealm('javascript');
  
  // Submit wrong solution
  cy.typeInMonaco('function hello() { return "Wrong"; }');
  cy.submitCode();
  
  // Should show error
  cy.contains('Incorrect').should('be.visible');
  
  // Should show hint after failure
  cy.get('.hint-modal').should('be.visible');
});
```

### 3. Testing Navigation
```typescript
it('should navigate between realms', () => {
  cy.visit('/');
  
  // Test each realm button
  const realms = ['javascript', 'typescript', 'react', 'testing', 'debugging'];
  
  realms.forEach(realm => {
    cy.visit('/');
    cy.contains(`Start ${realm} Adventure`, { matchCase: false }).click();
    cy.url().should('include', `/realm/${realm}`);
  });
});
```

### 4. Testing Responsive Design
```typescript
describe('Mobile Experience', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  });

  it('should work on mobile', () => {
    cy.visit('/');
    cy.contains('Welcome to Syntax Quest').should('be.visible');
    
    // Test navigation on mobile
    cy.contains('Start Javascript Adventure').click();
    cy.url().should('include', '/realm/javascript');
  });
});
```

## 🐛 Debugging E2E Tests

### 1. Use Cypress Commands
```typescript
// Pause test execution
cy.pause();

// Debug specific element
cy.get('button').debug();

// Take screenshot
cy.screenshot('debug-state');
```

### 2. Check the Cypress UI
- Time travel through test steps
- See before/after DOM snapshots
- Inspect network requests
- View console output

### 3. Common Issues and Solutions

**Monaco Editor Issues:**
```typescript
// Monaco is complex, use custom commands
cy.window().then(win => {
  const editor = win.monaco.editor.getModels()[0];
  editor.setValue('your code here');
});
```

**Timing Issues:**
```typescript
// Use proper waits
cy.get('.element', { timeout: 10000 }).should('be.visible');
```

**Flaky Tests:**
```typescript
// Add retries for flaky tests
it('flaky test', { retries: 2 }, () => {
  // Test that sometimes fails
});
```

## 📊 E2E Testing Strategy

### What to Test with E2E
- Critical user paths (sign up, complete challenge, view progress)
- Integration between features
- Cross-browser compatibility
- Performance (page load times)
- Error scenarios

### What NOT to Test with E2E
- Individual component logic (use unit tests)
- Every possible edge case (too slow)
- Third-party services (mock them)
- Complex calculations (use unit tests)

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
        
      - name: Run E2E tests
        uses: cypress-io/github-action@v2
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
```

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)
- [Real World Testing with Cypress](https://learn.cypress.io)

## 🎯 Summary

E2E tests are your safety net for ensuring the entire application works from the user's perspective. They complement unit and integration tests by:

1. Verifying complete user workflows
2. Catching integration issues
3. Ensuring UI behaves correctly
4. Testing across different browsers/devices

Remember: E2E tests are slower and more brittle than unit tests, so use them strategically for critical paths and integration points. The goal is confidence that your app works for real users!