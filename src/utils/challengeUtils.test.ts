import { runTests } from './challengeUtils';

describe('challengeUtils', () => {
  describe('runTests', () => {
    it('should execute test cases correctly', async () => {
      const tests = [{
        input: ['4'],
        expected: '4'
      }];

      const result = await runTests(
        tests.map(t => ({...t, description: "Test case"})),
        'return context.input[0];'
      );
      expect(result.success).toBe(true);
    });

    it('should handle async operations', async () => {
      const tests = [{
        input: ['42'],
        expected: '42',
        description: "Async test case"
      }];

      const result = await runTests(
        tests.map(t => ({...t, description: "Async test case"})),
        'const capturedContext = context; return new Promise(resolve => resolve(capturedContext.input[0]));'
      );
      expect(result.success).toBe(true);
    });

    it('should catch errors', async () => {
      const tests = [{
        input: [],
        expected: null,
        description: "Error test case"
      }];

      const result = await runTests(
        tests.map(t => ({...t, description: "Error test case"})),
        'throw new Error("Test error");'
      );
      expect(result.success).toBe(false);
      expect(result.message?.toLowerCase()).toContain('test error');
    });
  });
});
