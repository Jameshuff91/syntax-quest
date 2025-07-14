// src/data/testingChallenges.ts

import { Challenge } from './challenges';

export const testingChallenges: Challenge[] = [
  {
    id: "test-101",
    title: "Your First Unit Test",
    description: "Learn the basics of unit testing by writing a test for a simple add function. Unit tests test individual functions in isolation.",
    starterCode: `// First, here's the function we want to test:
function add(a, b) {
  return a + b;
}

// Now write a test for it:
function testAdd() {
  // TODO: Test that add(2, 3) returns 5
  // Hint: Use an if statement to check the result
  // If the test fails, throw an Error
}`,
    solutionCode: `// First, here's the function we want to test:
function add(a, b) {
  return a + b;
}

// Now write a test for it:
function testAdd() {
  const result = add(2, 3);
  if (result !== 5) {
    throw new Error(\`Expected 5 but got \${result}\`);
  }
  console.log("✅ Test passed!");
}`,
    hints: [
      {
        message: "Call the add function with 2 and 3, and store the result in a variable."
      },
      {
        message: "Use an if statement to check if the result equals 5. If not, throw an Error.",
        revealCode: `const result = add(2, 3);
if (result !== 5) {
  throw new Error(\`Expected 5 but got \${result}\`);
}`
      }
    ],
    tests: [
      {
        description: "Should define a testAdd function that tests add(2, 3) = 5",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-102",
    title: "Testing Multiple Cases",
    description: "Good tests check multiple scenarios. Write tests that verify different cases for a multiply function.",
    starterCode: `function multiply(a, b) {
  return a * b;
}

function testMultiply() {
  // TODO: Test these cases:
  // 1. multiply(3, 4) should return 12
  // 2. multiply(0, 5) should return 0
  // 3. multiply(-2, 3) should return -6
  // Throw an Error if any test fails
}`,
    solutionCode: `function multiply(a, b) {
  return a * b;
}

function testMultiply() {
  // Test case 1: positive numbers
  const result1 = multiply(3, 4);
  if (result1 !== 12) {
    throw new Error(\`Test 1 failed: Expected 12 but got \${result1}\`);
  }
  
  // Test case 2: multiply by zero
  const result2 = multiply(0, 5);
  if (result2 !== 0) {
    throw new Error(\`Test 2 failed: Expected 0 but got \${result2}\`);
  }
  
  // Test case 3: negative number
  const result3 = multiply(-2, 3);
  if (result3 !== -6) {
    throw new Error(\`Test 3 failed: Expected -6 but got \${result3}\`);
  }
  
  console.log("✅ All tests passed!");
}`,
    hints: [
      {
        message: "Test each case one by one. Start with multiply(3, 4) and check if it equals 12."
      },
      {
        message: "For each test case, call the function, store the result, and check if it matches the expected value.",
        revealCode: `const result1 = multiply(3, 4);
if (result1 !== 12) {
  throw new Error(\`Test 1 failed: Expected 12 but got \${result1}\`);
}`
      }
    ],
    tests: [
      {
        description: "Should test all three multiplication cases",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-103",
    title: "Testing Edge Cases",
    description: "Edge cases are unusual inputs that might break your code. Learn to test them!",
    starterCode: `function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}

function testDivide() {
  // TODO: Test these edge cases:
  // 1. divide(10, 2) should return 5
  // 2. divide(10, 0) should return "Error: Cannot divide by zero"
  // 3. divide(0, 5) should return 0
}`,
    solutionCode: `function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}

function testDivide() {
  // Test normal division
  const result1 = divide(10, 2);
  if (result1 !== 5) {
    throw new Error(\`Test 1 failed: Expected 5 but got \${result1}\`);
  }
  
  // Test division by zero (edge case)
  const result2 = divide(10, 0);
  if (result2 !== "Error: Cannot divide by zero") {
    throw new Error(\`Test 2 failed: Expected error message but got \${result2}\`);
  }
  
  // Test zero divided by number
  const result3 = divide(0, 5);
  if (result3 !== 0) {
    throw new Error(\`Test 3 failed: Expected 0 but got \${result3}\`);
  }
  
  console.log("✅ All edge case tests passed!");
}`,
    hints: [
      {
        message: "Edge cases often involve zero, negative numbers, empty values, or very large/small numbers."
      },
      {
        message: "Test the division by zero case carefully - it should return a string, not throw an error.",
        revealCode: `const result2 = divide(10, 0);
if (result2 !== "Error: Cannot divide by zero") {
  throw new Error(\`Test 2 failed: Expected error message but got \${result2}\`);
}`
      }
    ],
    tests: [
      {
        description: "Should test normal division and edge cases",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-104",
    title: "Testing Arrays",
    description: "Learn how to test functions that work with arrays. Arrays need special attention when testing!",
    starterCode: `function getFirstThree(arr) {
  return arr.slice(0, 3);
}

function testGetFirstThree() {
  // TODO: Test these cases:
  // 1. getFirstThree([1, 2, 3, 4, 5]) should return [1, 2, 3]
  // 2. getFirstThree([1, 2]) should return [1, 2]
  // 3. getFirstThree([]) should return []
  // Hint: You can't use === to compare arrays!
}`,
    solutionCode: `function getFirstThree(arr) {
  return arr.slice(0, 3);
}

function testGetFirstThree() {
  // Test with array longer than 3
  const result1 = getFirstThree([1, 2, 3, 4, 5]);
  if (result1.length !== 3 || result1[0] !== 1 || result1[1] !== 2 || result1[2] !== 3) {
    throw new Error(\`Test 1 failed: Expected [1, 2, 3] but got [\${result1}]\`);
  }
  
  // Test with array shorter than 3
  const result2 = getFirstThree([1, 2]);
  if (result2.length !== 2 || result2[0] !== 1 || result2[1] !== 2) {
    throw new Error(\`Test 2 failed: Expected [1, 2] but got [\${result2}]\`);
  }
  
  // Test with empty array
  const result3 = getFirstThree([]);
  if (result3.length !== 0) {
    throw new Error(\`Test 3 failed: Expected [] but got [\${result3}]\`);
  }
  
  console.log("✅ All array tests passed!");
}`,
    hints: [
      {
        message: "Arrays can't be compared with ===. You need to check the length and each element."
      },
      {
        message: "Check the array length first, then check each element individually.",
        revealCode: `const result1 = getFirstThree([1, 2, 3, 4, 5]);
if (result1.length !== 3 || result1[0] !== 1 || result1[1] !== 2 || result1[2] !== 3) {
  throw new Error(\`Test 1 failed\`);
}`
      }
    ],
    tests: [
      {
        description: "Should test array slicing with different array sizes",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-105",
    title: "Testing Async Functions",
    description: "Learn how to test functions that use callbacks or return promises. This is crucial for real-world testing!",
    starterCode: `function delayedAdd(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 100);
}

function testDelayedAdd() {
  // TODO: Test that delayedAdd(5, 3, callback) 
  // calls the callback with 8 after a delay
  // Hint: You'll need to use a callback function
}`,
    solutionCode: `function delayedAdd(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 100);
}

function testDelayedAdd() {
  let testPassed = false;
  
  delayedAdd(5, 3, (result) => {
    if (result === 8) {
      console.log("✅ Async test passed!");
      testPassed = true;
    } else {
      throw new Error(\`Expected 8 but got \${result}\`);
    }
  });
  
  // Check after delay
  setTimeout(() => {
    if (!testPassed) {
      throw new Error("Callback was not called!");
    }
  }, 200);
}`,
    hints: [
      {
        message: "Create a callback function that checks if the result is correct."
      },
      {
        message: "Use a variable to track if the callback was called with the right value.",
        revealCode: `delayedAdd(5, 3, (result) => {
  if (result === 8) {
    console.log("✅ Test passed!");
  } else {
    throw new Error(\`Expected 8 but got \${result}\`);
  }
});`
      }
    ],
    tests: [
      {
        description: "Should test async function with callback",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-106",
    title: "Test-Driven Development (TDD)",
    description: "In TDD, you write the test FIRST, then write code to make it pass. Try it!",
    starterCode: `// Here's a test for a function that doesn't exist yet:
function testIsEven() {
  if (isEven(4) !== true) {
    throw new Error("isEven(4) should return true");
  }
  if (isEven(3) !== false) {
    throw new Error("isEven(3) should return false");
  }
  if (isEven(0) !== true) {
    throw new Error("isEven(0) should return true");
  }
  console.log("✅ All tests passed!");
}

// TODO: Write the isEven function to make the tests pass!
function isEven(num) {
  // Your code here
}`,
    solutionCode: `// Here's a test for a function that doesn't exist yet:
function testIsEven() {
  if (isEven(4) !== true) {
    throw new Error("isEven(4) should return true");
  }
  if (isEven(3) !== false) {
    throw new Error("isEven(3) should return false");
  }
  if (isEven(0) !== true) {
    throw new Error("isEven(0) should return true");
  }
  console.log("✅ All tests passed!");
}

// Write the isEven function to make the tests pass!
function isEven(num) {
  return num % 2 === 0;
}`,
    hints: [
      {
        message: "Look at the tests to understand what isEven should do. It should return true for even numbers."
      },
      {
        message: "A number is even if it's divisible by 2. Use the modulo operator (%).",
        revealCode: `function isEven(num) {
  return num % 2 === 0;
}`
      }
    ],
    tests: [
      {
        description: "Should implement isEven to pass all tests",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-107",
    title: "Mocking Dependencies",
    description: "Learn how to test functions that depend on external services by creating mock objects.",
    starterCode: `// Imagine this function calls a real API (we'll mock it)
function getUserName(userId, apiClient) {
  const user = apiClient.getUser(userId);
  return user.name.toUpperCase();
}

function testGetUserName() {
  // TODO: Create a mock apiClient object
  // that has a getUser method returning {name: "John Doe"}
  // Then test that getUserName returns "JOHN DOE"
  
  const mockApiClient = {
    // Your mock here
  };
  
  // Your test here
}`,
    solutionCode: `// Imagine this function calls a real API (we'll mock it)
function getUserName(userId, apiClient) {
  const user = apiClient.getUser(userId);
  return user.name.toUpperCase();
}

function testGetUserName() {
  // Create a mock apiClient object
  const mockApiClient = {
    getUser: function(userId) {
      // Return fake data instead of calling real API
      return { name: "John Doe" };
    }
  };
  
  // Test the function with our mock
  const result = getUserName(123, mockApiClient);
  if (result !== "JOHN DOE") {
    throw new Error(\`Expected "JOHN DOE" but got "\${result}"\`);
  }
  
  console.log("✅ Mock test passed!");
}`,
    hints: [
      {
        message: "A mock is a fake object that simulates the behavior of a real object."
      },
      {
        message: "Create an object with a getUser method that returns fake user data.",
        revealCode: `const mockApiClient = {
  getUser: function(userId) {
    return { name: "John Doe" };
  }
};`
      }
    ],
    tests: [
      {
        description: "Should create a mock and test getUserName",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "test-108",
    title: "Testing Error Handling",
    description: "Good code handles errors gracefully. Learn how to test that errors are thrown correctly.",
    starterCode: `function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
  return balance - amount;
}

function testWithdraw() {
  // TODO: Test these cases:
  // 1. withdraw(100, 50) should return 50
  // 2. withdraw(100, 150) should throw "Insufficient funds"
  // 3. withdraw(100, -10) should throw "Amount must be positive"
  // Hint: Use try-catch to test for errors
}`,
    solutionCode: `function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
  return balance - amount;
}

function testWithdraw() {
  // Test 1: Normal withdrawal
  const result1 = withdraw(100, 50);
  if (result1 !== 50) {
    throw new Error(\`Test 1 failed: Expected 50 but got \${result1}\`);
  }
  
  // Test 2: Insufficient funds
  try {
    withdraw(100, 150);
    throw new Error("Test 2 failed: Expected error but none was thrown");
  } catch (error) {
    if (error.message !== "Insufficient funds") {
      throw new Error(\`Test 2 failed: Wrong error message: \${error.message}\`);
    }
  }
  
  // Test 3: Negative amount
  try {
    withdraw(100, -10);
    throw new Error("Test 3 failed: Expected error but none was thrown");
  } catch (error) {
    if (error.message !== "Amount must be positive") {
      throw new Error(\`Test 3 failed: Wrong error message: \${error.message}\`);
    }
  }
  
  console.log("✅ All error handling tests passed!");
}`,
    hints: [
      {
        message: "Use try-catch blocks to test if errors are thrown correctly."
      },
      {
        message: "In the try block, call the function. If it doesn't throw, that's a test failure. In the catch block, verify the error message.",
        revealCode: `try {
  withdraw(100, 150);
  throw new Error("Expected error but none was thrown");
} catch (error) {
  if (error.message !== "Insufficient funds") {
    throw new Error("Wrong error message");
  }
}`
      }
    ],
    tests: [
      {
        description: "Should test normal operation and error cases",
        input: null,
        expected: null
      }
    ],
    realm: "testing",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];