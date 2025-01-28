// src/data/typescriptChallenges.ts

import { Challenge } from './challenges';

export const typescriptChallenges: Challenge[] = [
  {
    id: "ts-101",
    title: "TypeScript Hello World",
    description: "Write a function in TypeScript that logs 'Hello, TypeScript!' to the console.",
    starterCode: `function helloTS(): void {
  // TODO: Implement
}`,
    solutionCode: `function helloTS(): void {
  console.log("Hello, TypeScript!");
}`,
    hints: [
      {
        message: "Use console.log to print to the console."
      },
      {
        message: "Log the string 'Hello, TypeScript!'.",
        revealCode: `console.log("Hello, TypeScript!");`
      }
    ],
    tests: [
      {
        description: "Should print 'Hello, TypeScript!' to the console",
        input: null,
        expected: null
      }
    ],
    realm: "typescript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-102",
    title: "Add Two Numbers in TypeScript",
    description: "Write a function in TypeScript that takes two numbers as parameters and returns their sum. Ensure the parameters and return type are explicitly typed as numbers.",
    starterCode: `function addTS(a: number, b: number) {
  // TODO: Implement
}`,
    solutionCode: `function addTS(a: number, b: number): number {
  return a + b;
}`,
    hints: [
      {
        message: "Specify the types for the parameters and return value as numbers."
      },
      {
        message: "Use the + operator to add the two numbers.",
        revealCode: `return a + b;`
      }
    ],
    tests: [
      {
        description: "Should add two positive numbers in TypeScript",
        input: [5, 3],
        expected: 8
      },
      {
        description: "Should add negative numbers in TypeScript",
        input: [-5, -3],
        expected: -8
      }
    ],
    realm: "typescript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-103",
    title: "TypeScript Interface",
    description: "Define an interface Person with properties name (string) and age (number). Then create an object of type Person.",
    starterCode: `// TODO: Define the Person interface

function usePerson() {
  // TODO: Create a person object of type Person
}`,
    solutionCode: `interface Person {
  name: string;
  age: number;
}

function usePerson() {
  const person: Person = { name: "Alice", age: 30 };
  return person;
}`,
    hints: [
      {
        message: "Use the interface keyword to define an interface."
      },
      {
        message: "Define properties name and age with their respective types.",
        revealCode: `interface Person {
  name: string;
  age: number;
}`
      },
      {
        message: "Create an object that conforms to the Person interface.",
        revealCode: `const person: Person = { name: "Alice", age: 30 };`
      }
    ],
    tests: [
      {
        description: "Should create a person object with name and age",
        input: null,
        expected: { name: "Alice", age: 30 }
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-104",
    title: "TypeScript Type Alias",
    description: "Create a type alias for a string array called StringList. Then use it to type a function parameter.",
    starterCode: `// TODO: Define StringList type alias

function processStrings(list) {
  // TODO: Implement - should accept StringList as parameter
}`,
    solutionCode: `type StringList = string[];

function processStrings(list: StringList): number {
  return list.length;
}`,
    hints: [
      {
        message: "Use the type keyword to define a type alias."
      },
      {
        message: "Define StringList as an array of strings.",
        revealCode: `type StringList = string[];`
      },
      {
        message: "Use StringList as the type annotation for the function parameter.",
        revealCode: `function processStrings(list: StringList): number`
      }
    ],
    tests: [
      {
        description: "Should accept a string array and return its length",
        input: ["a", "b", "c"],
        expected: 3
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-105",
    title: "TypeScript Generic Function",
    description: "Write a generic function identity that takes an argument of any type and returns the same argument.",
    starterCode: `// TODO: Write a generic function identity

function identity(arg) {
  // TODO: Implement
}`,
    solutionCode: `function identity<T>(arg: T): T {
  return arg;
}`,
    hints: [
      {
        message: "Use angle brackets <> to define a type variable for generics."
      },
      {
        message: "Specify the type variable for both the parameter and return type.",
        revealCode: `function identity<T>(arg: T): T`
      },
      {
        message: "Simply return the argument.",
        revealCode: `return arg;`
      }
    ],
    tests: [
      {
        description: "Should return the same number",
        input: 123,
        expected: 123
      },
      {
        description: "Should return the same string",
        input: "hello",
        expected: "hello"
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  }
];