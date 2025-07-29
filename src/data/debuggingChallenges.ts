// src/data/debuggingChallenges.ts

import { Challenge } from './challenges';

export const debuggingChallenges: Challenge[] = [
  {
    id: "debug-101",
    title: "Trace the Execution",
    description: "Learn to trace through code execution step by step. What does this function return when called with findMax([3, 7, 2, 9, 1])?",
    starterCode: `function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Trace through the execution:
// Initial: max = 3
// i = 1: numbers[1] = 7, 7 > 3? Yes, max = 7
// i = 2: numbers[2] = 2, 2 > 7? No, max = 7
// i = 3: numbers[3] = 9, 9 > 7? Yes, max = 9
// i = 4: numbers[4] = 1, 1 > 9? No, max = 9
// Return: 9

function traceExecution() {
  // TODO: Return what findMax([3, 7, 2, 9, 1]) returns
}`,
    solutionCode: `function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

function traceExecution() {
  return 9; // The maximum value in [3, 7, 2, 9, 1]
}`,
    hints: [
      {
        message: "Follow the code step by step. Start with max = 3, then check each number."
      },
      {
        message: "The function finds the largest number in the array. Which number is largest?",
        revealCode: "return 9;"
      }
    ],
    tests: [
      {
        description: "Should return the correct traced value",
        input: null,
        expected: 9
      }
    ],
    realm: "debugging",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-102",
    title: "Fix the Off-by-One Error",
    description: "This function should return the last element of an array, but it has a bug. Fix it!",
    starterCode: `function getLastElement(arr) {
  // BUG: This causes an error! Why?
  return arr[arr.length];
}

// Debug this:
// If arr = [1, 2, 3], arr.length = 3
// But array indices are 0, 1, 2
// So arr[3] is undefined!

function getLastElement(arr) {
  // TODO: Fix the bug
  return arr[arr.length];
}`,
    solutionCode: `function getLastElement(arr) {
  // Fixed: Arrays are zero-indexed, so last element is at length - 1
  return arr[arr.length - 1];
}`,
    hints: [
      {
        message: "Arrays are zero-indexed. If an array has 3 elements, what are the valid indices?"
      },
      {
        message: "The last element is at index (length - 1), not at index length.",
        revealCode: "return arr[arr.length - 1];"
      }
    ],
    tests: [
      {
        description: "Should return last element of array",
        input: [[1, 2, 3, 4, 5]],
        expected: 5
      }
    ],
    realm: "debugging",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-103",
    title: "Debug the Infinite Loop",
    description: "This code has an infinite loop! Find and fix the bug.",
    starterCode: `function countDown(n) {
  // WARNING: This has an infinite loop!
  let result = [];
  let i = n;
  while (i > 0) {
    result.push(i);
    // BUG: What's missing here?
  }
  return result;
}

// The loop never ends because 'i' never changes!
// We need to decrement 'i' in each iteration

function countDown(n) {
  let result = [];
  let i = n;
  while (i > 0) {
    result.push(i);
    // TODO: Add the missing line here
  }
  return result;
}`,
    solutionCode: `function countDown(n) {
  let result = [];
  let i = n;
  while (i > 0) {
    result.push(i);
    i--; // Decrement i to avoid infinite loop
  }
  return result;
}`,
    hints: [
      {
        message: "The while loop continues as long as i > 0, but i never changes. What should happen to i?"
      },
      {
        message: "You need to decrease i in each iteration so it eventually becomes 0.",
        revealCode: "i--; // or i = i - 1;"
      }
    ],
    tests: [
      {
        description: "Should count down from 5 to 1",
        input: [5],
        expected: [5, 4, 3, 2, 1]
      }
    ],
    realm: "debugging",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-104",
    title: "Trace Variable Scoping",
    description: "Understanding variable scope is crucial for debugging. What does this function return?",
    starterCode: `let x = 10;

function scopeTest() {
  let x = 20;
  if (true) {
    let x = 30;
    // Which x is this? The one in the if block (30)
  }
  // Which x is this? The one in the function (20)
  return x;
}

// Trace the scopes:
// Global scope: x = 10
// Function scope: x = 20
// Block scope: x = 30 (only inside the if block)
// Function returns: 20

function traceScope() {
  // TODO: What does scopeTest() return?
}`,
    solutionCode: `let x = 10;

function scopeTest() {
  let x = 20;
  if (true) {
    let x = 30;
  }
  return x;
}

function traceScope() {
  return 20; // The function-scoped x
}`,
    hints: [
      {
        message: "Each 'let' creates a new variable in its scope. The if-block x doesn't affect the function x."
      },
      {
        message: "The function returns the x declared in the function scope, which is 20.",
        revealCode: "return 20;"
      }
    ],
    tests: [
      {
        description: "Should return the correct scoped value",
        input: null,
        expected: 20
      }
    ],
    realm: "debugging",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-105",
    title: "Fix the Callback Bug",
    description: "This function should call the callback with doubled values, but something's wrong. Debug and fix it!",
    starterCode: `function processArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // BUG: The callback isn't being used correctly
    result.push(arr[i] * 2);
  }
  return result;
}

// The bug: We're not using the callback at all!
// We're just doubling values directly.

function processArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // TODO: Use the callback function properly
    result.push(/* your code here */);
  }
  return result;
}`,
    solutionCode: `function processArray(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // Fixed: Call the callback with each element
    result.push(callback(arr[i]));
  }
  return result;
}`,
    hints: [
      {
        message: "A callback is a function passed as an argument. You need to call it with each array element."
      },
      {
        message: "Instead of arr[i] * 2, you should call callback(arr[i]).",
        revealCode: "result.push(callback(arr[i]));"
      }
    ],
    tests: [
      {
        description: "Should use callback to process array",
        input: [[1, 2, 3], function(x: number) { return x * 2; }],
        expected: [2, 4, 6]
      }
    ],
    realm: "debugging",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-106",
    title: "Debug the Closure",
    description: "This code creates functions in a loop, but they all return the same value. Fix the closure bug!",
    starterCode: `function createFunctions() {
  let functions = [];
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  return functions;
}

// BUG: All functions return 3!
// Why? 'var' is function-scoped, so all functions share the same i
// After the loop, i = 3, so all functions return 3

function createFunctions() {
  let functions = [];
  // TODO: Fix this loop so each function returns its index
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  return functions;
}`,
    solutionCode: `function createFunctions() {
  let functions = [];
  // Fixed: Use 'let' instead of 'var' for block scope
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      return i;
    });
  }
  return functions;
}`,
    hints: [
      {
        message: "The problem is with 'var' - it's function-scoped. What keyword creates block scope?"
      },
      {
        message: "Change 'var' to 'let' to create a new binding for each iteration.",
        revealCode: "for (let i = 0; i < 3; i++) {"
      }
    ],
    tests: [
      {
        description: "Functions should return their creation index",
        input: null,
        expected: null // Special test for closure
      }
    ],
    realm: "debugging",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-107",
    title: "Debug Async Execution Order",
    description: "Trace through this async code. What gets logged to the console and in what order?",
    starterCode: `function traceAsync() {
  console.log('1');
  
  setTimeout(() => {
    console.log('2');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('3');
  });
  
  console.log('4');
}

// Trace the execution:
// 1. console.log('1') - runs immediately
// 2. setTimeout scheduled (even with 0 delay, goes to task queue)
// 3. Promise.then scheduled (goes to microtask queue)
// 4. console.log('4') - runs immediately
// 5. Microtasks run before tasks, so '3' prints
// 6. Finally, setTimeout callback runs, printing '2'

function getExecutionOrder() {
  // TODO: Return an array with the numbers in the order they're logged
  // Example: return ['1', '4', '3', '2'];
}`,
    solutionCode: `function traceAsync() {
  console.log('1');
  
  setTimeout(() => {
    console.log('2');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('3');
  });
  
  console.log('4');
}

function getExecutionOrder() {
  return ['1', '4', '3', '2']; // Sync first, then microtasks, then tasks
}`,
    hints: [
      {
        message: "Synchronous code runs first. Then microtasks (Promises), then macrotasks (setTimeout)."
      },
      {
        message: "Order: sync code (1, 4), then Promise callback (3), then setTimeout (2).",
        revealCode: "return ['1', '4', '3', '2'];"
      }
    ],
    tests: [
      {
        description: "Should return correct execution order",
        input: null,
        expected: ['1', '4', '3', '2']
      }
    ],
    realm: "debugging",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "debug-108",
    title: "Debug the Memory Leak",
    description: "This code has a memory leak. Identify the problem and fix it!",
    starterCode: `let cache = {};

function addToCache(key, value) {
  // This function keeps adding to cache but never removes anything
  cache[key] = {
    value: value,
    timestamp: Date.now(),
    // BUG: This creates a circular reference!
    ref: cache
  };
}

// The problem: Each cache entry references the entire cache
// This prevents garbage collection and causes memory leaks

function addToCache(key, value) {
  cache[key] = {
    value: value,
    timestamp: Date.now(),
    // TODO: Remove the circular reference
  };
}`,
    solutionCode: `let cache = {};

function addToCache(key, value) {
  // Fixed: Removed circular reference
  cache[key] = {
    value: value,
    timestamp: Date.now()
    // No ref to cache - prevents memory leak
  };
}`,
    hints: [
      {
        message: "The 'ref: cache' creates a circular reference. The cache references itself through each entry."
      },
      {
        message: "Simply remove the 'ref: cache' line to fix the memory leak.",
        revealCode: `cache[key] = {
    value: value,
    timestamp: Date.now()
  };`
      }
    ],
    tests: [
      {
        description: "Should add to cache without circular reference",
        input: ['test', 'value'],
        expected: null
      }
    ],
    realm: "debugging",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];