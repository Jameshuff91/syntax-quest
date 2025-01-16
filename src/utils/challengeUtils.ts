// src/utils/challengeUtils.ts

export interface TestResult {
    success: boolean;
    message?: string;
  }
  
  export function runTests(testCases: any[], userCode: string): TestResult {
    try {
      // Create a sandboxed function using Function constructor
      const userFunction = new Function(`${userCode}; return hello;`)();
      
      for (let test of testCases) {
        const result = userFunction(test.input);
        if (result !== test.expected) {
          return { success: false, message: `Test failed: ${test.description}. Expected "${test.expected}", but got "${result}".` };
        }
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  