import { TestResult } from './challengeUtils';

describe('challengeUtils', () => {
  describe('TestResult interface', () => {
    it('should have success and optional message properties', () => {
      const successResult: TestResult = {
        success: true
      };
      
      const failureResult: TestResult = {
        success: false,
        message: 'Test failed'
      };
      
      expect(successResult.success).toBe(true);
      expect(successResult.message).toBeUndefined();
      
      expect(failureResult.success).toBe(false);
      expect(failureResult.message).toBe('Test failed');
    });
  });
  
  // Note: The actual test execution is now handled by the web worker
  // See src/hooks/secure-sandbox.worker.ts for the implementation
  // Integration tests for code execution are in src/__tests__/integration/
});