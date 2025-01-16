// src/data/challenges.ts

export interface Hint {
    message: string;
    revealCode?: string; // Optional partial solution to reveal
  }
  
  export interface TestCase {
    description: string;
    input: any; // Input for your test
    expected: any; // Expected result
  }
  
export interface Challenge {
    id: string;
    title: string;
    description: string;
    starterCode: string; // The code the user starts with
    solutionCode: string; // The correct solution code
    hints: Hint[]; // Progressive hints
    tests: TestCase[]; // For validation
    realm: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }
  
  export const challenges: Challenge[] = [
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
          message: "Use console.log to print something in JavaScript."
        },
        {
          message: "You need to call console.log('Hello World') inside the function.",
          revealCode: `function hello() {
        console.log("Hello World");
      }`
        }
      ],
      tests: [
        {
          description: "Should log 'Hello World'",
          input: null,
          expected: "Hello World"
        }
      ],
      realm: "javascript",
      difficulty: "easy"
    },
    // Add more challenges here
  ];
