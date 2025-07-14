// src/hooks/sandbox.worker.ts

import { WorkerMessage, WorkerResponse, TestCase } from './compiler.types';

// Create a sandboxed environment
function createSandbox() {
  // List of allowed global objects and functions
  const allowedGlobals = {
    // Math functions
    Math: Math,
    parseInt: parseInt,
    parseFloat: parseFloat,
    Number: Number,
    String: String,
    Boolean: Boolean,
    Array: Array,
    Object: Object,
    Date: Date,
    RegExp: RegExp,
    JSON: JSON,
    
    // Console for debugging (limited)
    console: {
      log: (...args: any[]) => {
        // Limit console output
        const output = args.map((arg: any) => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        if (output.length > 1000) {
          throw new Error('Console output too large');
        }
        return output;
      }
    },
    
    // Basic error types
    Error: Error,
    TypeError: TypeError,
    ReferenceError: ReferenceError,
    SyntaxError: SyntaxError,
    
    // Utility functions
    isNaN: isNaN,
    isFinite: isFinite,
    
    // Allow eval for instrumented code execution
    eval: eval,
    
    // Operation counter functions (will be added dynamically)
    __checkOperations: undefined,
    __operationCount: undefined,
    __MAX_OPERATIONS: undefined,
    __instrumentedCode: undefined,
    
    // Array methods (safe ones)
    map: Array.prototype.map,
    filter: Array.prototype.filter,
    reduce: Array.prototype.reduce,
    forEach: Array.prototype.forEach,
    some: Array.prototype.some,
    every: Array.prototype.every,
    find: Array.prototype.find,
    includes: Array.prototype.includes,
    indexOf: Array.prototype.indexOf,
    slice: Array.prototype.slice,
    concat: Array.prototype.concat,
    join: Array.prototype.join,
    
    // String methods (safe ones)
    split: String.prototype.split,
    trim: String.prototype.trim,
    toLowerCase: String.prototype.toLowerCase,
    toUpperCase: String.prototype.toUpperCase,
    replace: String.prototype.replace,
    charAt: String.prototype.charAt,
    charCodeAt: String.prototype.charCodeAt,
    substring: String.prototype.substring,
    substr: String.prototype.substr,
  };
  
  // Explicitly blocked items
  const blockedItems = [
    'fetch', 'XMLHttpRequest', 'WebSocket', 'Worker', 'SharedWorker',
    'importScripts', 'eval', 'Function', 'setTimeout', 'setInterval',
    'setImmediate', 'requestAnimationFrame', 'cancelAnimationFrame',
    'alert', 'confirm', 'prompt', 'open', 'close', 'postMessage',
    'addEventListener', 'removeEventListener', 'dispatchEvent',
    'localStorage', 'sessionStorage', 'indexedDB', 'crypto',
    'location', 'navigator', 'document', 'window', 'self', 'global',
    'process', 'require', 'module', 'exports', '__dirname', '__filename',
    'Buffer', 'clearInterval', 'clearTimeout', 'queueMicrotask',
    'performance', 'atob', 'btoa', 'Blob', 'File', 'FileReader',
    'URL', 'URLSearchParams', 'Headers', 'Request', 'Response',
    'AbortController', 'Event', 'EventTarget', 'Promise'
  ];
  
  // Create sandbox object
  const sandbox: any = {};
  
  // Add allowed globals to sandbox
  Object.keys(allowedGlobals).forEach(key => {
    sandbox[key] = (allowedGlobals as any)[key];
  });
  
  // Add undefined for blocked items to prevent access
  blockedItems.forEach(item => {
    sandbox[item] = undefined;
  });
  
  return sandbox;
}

// Execute code in sandbox with timeout and memory tracking
function executeInSandbox(code: string, tests: TestCase[], timeout: number = 5000): WorkerResponse {
  let timeoutId: any;
  let operationCount = 0;
  const MAX_OPERATIONS = 1000000; // Limit operations to prevent infinite loops
  
  try {
    // Create sandbox
    const sandbox = createSandbox();
    
    // Add operation counter to prevent infinite loops
    const operationCounter = `
      let __operationCount = 0;
      const __MAX_OPERATIONS = ${MAX_OPERATIONS};
      
      function __checkOperations() {
        if (++__operationCount > __MAX_OPERATIONS) {
          throw new Error('Code execution exceeded maximum allowed operations. Possible infinite loop detected.');
        }
      }
      
      // Instrument loops
      const __instrumentedCode = ${JSON.stringify(code)}
        .replace(/while\\s*\\(/g, 'while (__checkOperations(), ')
        .replace(/for\\s*\\(/g, 'for (__checkOperations(); ')
        .replace(/do\\s*{/g, 'do { __checkOperations();');
    `;
    
    // Wrap the code to prevent direct access to global scope
    const wrappedCode = `
      'use strict';
      ${operationCounter}
      eval(__instrumentedCode);
    `;
    
    // Create a function with limited scope
    const sandboxKeys = Object.keys(sandbox);
    const sandboxValues = sandboxKeys.map(key => sandbox[key]);
    
    // Extract function name from the code
    const functionMatch = code.match(/function\s+(\w+)\s*\(/);
    if (!functionMatch) {
      throw new Error('No function definition found. Please define a function.');
    }
    const functionName = functionMatch[1];
    
    // Add a return statement to get the function that was defined
    const codeWithReturn = wrappedCode + `\n; typeof ${functionName} !== "undefined" ? ${functionName} : null;`;
    
    // Create function with sandbox scope
    const func = new Function(...sandboxKeys, codeWithReturn);
    
    // Set up timeout
    const executionPromise = new Promise<WorkerResponse>((resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Execution timed out after ${timeout}ms`));
      }, timeout);
      
      // Execute and get the function
      const userFunction = func(...sandboxValues);
      
      if (!userFunction || typeof userFunction !== 'function') {
        reject(new Error(`No function named "${functionName}" was found. Make sure you define a function called "${functionName}".`));
        return;
      }
      
      // Run tests
      let passed = 0;
      let failed = 0;
      let failureMessage = '';
      
      for (const test of tests) {
        try {
          // Handle different input types
          let result;
          if (Array.isArray(test.input)) {
            // Multiple parameters
            result = userFunction(...test.input);
          } else if (test.input === null || test.input === undefined) {
            // No parameters
            result = userFunction();
          } else {
            // Single parameter
            result = userFunction(test.input);
          }
          
          // For functions that don't return anything (like console.log tests)
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
    });
    
    return executionPromise as any; // Type assertion needed for synchronous return
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    return {
      success: false,
      output: error instanceof Error ? error.message : String(error),
      testResults: {
        passed: 0,
        failed: tests.length,
        total: tests.length,
        failureMessage: error instanceof Error ? error.message : String(error)
      }
    };
  }
}

// Worker message handler
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { code, tests = [], timeout = 5000 } = event.data;
  
  try {
    const result = await executeInSandbox(code, tests, timeout);
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