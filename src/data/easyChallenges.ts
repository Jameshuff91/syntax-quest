import { Challenge } from './challenges';

export const easyChallenges: Challenge[] = [
  {
    id: "js-101",
    title: "Print Hello World",
    description: "Write a function that logs 'Hello World' to the console.",
    starterCode: `function hello() {
      // TODO: Implement
    }`,
    solutionCode: `function hello() {
      console.log("Hello World");
    }`,
    hints: [
      {
        message: "Use the console.log function to print to the console."
      },
      {
        message: "Log the string 'Hello World'.",
        revealCode: `console.log("Hello World");`
      }
    ],
    tests: [
      {
        description: "Should print 'Hello World' to the console",
        input: null,
        expected: null
      }
    ],
    realm: "javascript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "js-102",
    title: "Add Two Numbers",
    description: "Write a function that takes two numbers as parameters and returns their sum.",
    starterCode: `function add(a, b) {
      // TODO: Implement
    }`,
    solutionCode: `function add(a, b) {
      return a + b;
    }`,
    hints: [
      {
        message: "Use the + operator to add numbers in JavaScript."
      },
      {
        message: "Make sure to return the result of the addition.",
        revealCode: `function add(a, b) {
      return a + b;
    }`
      }
    ],
    tests: [
      {
        description: "Should add two positive numbers",
        input: [2, 3],
        expected: 5
      },
      {
        description: "Should add a positive and negative number", 
        input: [-1, 5],
        expected: 4
      }
    ],
    realm: "javascript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "js-103",
    title: "Subtract Two Numbers",
    description: "Write a function that takes two numbers and returns their difference.",
    starterCode: `function subtract(a, b) {
      // TODO: Implement
    }`,
    solutionCode: `function subtract(a, b) {
      return a - b;
    }`,
    hints: [
      {
        message: "Use the - operator to subtract numbers."
      },
      {
        message: "Make sure to return the result of the subtraction.",
        revealCode: `function subtract(a, b) {
      return a - b;
    }`
      }
    ],
    tests: [
      {
        description: "Should subtract two positive numbers",
        input: [5, 3],
        expected: 2
      },
      {
        description: "Should subtract a positive and negative number",
        input: [5, -3],
        expected: 8
      }
    ],
    realm: "javascript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  }
];
