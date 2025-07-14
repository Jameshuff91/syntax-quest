// src/hooks/secure-sandbox.worker.ts

import { WorkerMessage, WorkerResponse, TestCase } from './compiler.types';

// Create a secure sandbox environment
function createSecureSandbox(code: string, tests: TestCase[], timeout: number = 5000): Promise<WorkerResponse> {
  return new Promise((resolve) => {
    let timeoutId: any;
    
    try {
      // Extract function name from the code
      const functionMatch = code.match(/function\s+(\w+)\s*\(/);
      if (!functionMatch) {
        resolve({
          success: false,
          output: 'No function definition found. Please define a function.',
          testResults: {
            passed: 0,
            failed: tests.length,
            total: tests.length,
            failureMessage: 'No function definition found.'
          }
        });
        return;
      }
      
      const functionName = functionMatch[1];
      
      // Create a limited scope with only safe globals
      const limitedScope = `
        // Limited Math object
        const Math = {
          abs: Math.abs,
          ceil: Math.ceil,
          floor: Math.floor,
          max: Math.max,
          min: Math.min,
          pow: Math.pow,
          random: Math.random,
          round: Math.round,
          sqrt: Math.sqrt,
          PI: Math.PI,
          E: Math.E
        };
        
        // Limited console
        const console = {
          log: function() {
            // For now, just ignore console.log calls
            // In future, we could capture and return these
          }
        };
        
        // Safe constructors
        const Array = window.Array;
        const Object = window.Object;
        const String = window.String;
        const Number = window.Number;
        const Boolean = window.Boolean;
        const Date = window.Date;
        const RegExp = window.RegExp;
        const JSON = window.JSON;
        const parseInt = window.parseInt;
        const parseFloat = window.parseFloat;
        const isNaN = window.isNaN;
        const isFinite = window.isFinite;
        
        // User code
        ${code}
        
        // Return the function
        if (typeof ${functionName} !== 'undefined') {
          ${functionName};
        } else {
          throw new Error('Function ${functionName} is not defined');
        }
      `;
      
      // Set timeout
      timeoutId = setTimeout(() => {
        resolve({
          success: false,
          output: `Execution timed out after ${timeout}ms`,
          testResults: {
            passed: 0,
            failed: tests.length,
            total: tests.length,
            failureMessage: 'Execution timed out'
          }
        });
      }, timeout);
      
      // Create function in isolated scope
      // eslint-disable-next-line no-new-func
      const isolatedFunction = new Function(limitedScope);
      const userFunction = isolatedFunction();
      
      // Run tests
      let passed = 0;
      let failed = 0;
      let failureMessage = '';
      
      for (const test of tests) {
        try {
          let result;
          if (Array.isArray(test.input)) {
            result = userFunction(...test.input);
          } else if (test.input === null || test.input === undefined) {
            result = userFunction();
          } else {
            result = userFunction(test.input);
          }
          
          if (test.expected === null && result === undefined) {
            passed++;
          } else if (result === test.expected) {
            passed++;
          } else {
            failed++;
            if (!failureMessage) {
              failureMessage = `Test failed: ${test.description}. Expected "${test.expected}", but got "${result}".`;
            }
          }
        } catch (err) {
          failed++;
          if (!failureMessage) {
            failureMessage = `Test failed: ${test.description}. Error: ${err instanceof Error ? err.message : String(err)}`;
          }
        }
      }
      
      clearTimeout(timeoutId);
      
      resolve({
        success: failed === 0,
        output: failed === 0 ? 'All tests passed!' : failureMessage,
        testResults: {
          passed,
          failed,
          total: tests.length,
          failureMessage: failed > 0 ? failureMessage : undefined
        }
      });
      
    } catch (error) {
      clearTimeout(timeoutId);
      resolve({
        success: false,
        output: error instanceof Error ? error.message : String(error),
        testResults: {
          passed: 0,
          failed: tests.length,
          total: tests.length,
          failureMessage: error instanceof Error ? error.message : String(error)
        }
      });
    }
  });
}

// Worker message handler
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { code, tests = [], timeout = 5000 } = event.data;
  
  try {
    const result = await createSecureSandbox(code, tests, timeout);
    ctx.postMessage(result);
  } catch (error) {
    const errorResponse: WorkerResponse = {
      success: false,
      output: error instanceof Error ? error.message : String(error),
      testResults: {
        passed: 0,
        failed: tests.length,
        total: tests.length,
        failureMessage: error instanceof Error ? error.message : String(error)
      }
    };
    ctx.postMessage(errorResponse);
  }
};

export {};