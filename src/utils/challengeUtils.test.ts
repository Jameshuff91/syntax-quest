import { runTests } from './challengeUtils';

describe('challengeUtils', () => {
  describe('runTests', () => {
    it('should execute test cases correctly', async () => {
      const tests = [{
        input: ['4'],
        expected: '4'
      }];

      const result = await runTests(
        'return context.input[0];',
        tests.map(t => ({...t, description: "Test case"}))
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
        'return new Promise(resolve => resolve(context.input[0]));',
        tests.map(t => ({...t, description: "Async test case"}))
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
        'throw new Error("Test error");',
        tests.map(t => ({...t, description: "Error test case"}))
      );
      expect(result.success).toBe(false);
      expect(result.message?.toLowerCase()).toContain('test error');
    });
  });
});
