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
      },
      {
        description: "Should add zero",
        input: [5, 0],
        expected: 5
      }
    ],
    realm: "typescript",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-103",
    title: "TypeScript Interface as Function Parameter",
    description: "Define an interface Person with properties name (string) and age (number). Then write a function that takes an argument of type Person and returns a greeting string using the person's name.",
    starterCode: `// TODO: Define the Person interface

function greetPerson(person) {
  // TODO: Implement - should accept Person interface as parameter
}`,
    solutionCode: `interface Person {
  name: string;
  age: number;
}

function greetPerson(person: Person): string {
  return \`Hello, \${person.name}!\`;
}`,
    hints: [
      {
        message: "Use the interface keyword to define an interface named Person."
      },
      {
        message: "The Person interface should have properties name (string) and age (number).",
        revealCode: `interface Person {
  name: string;
  age: number;
}`
      },
      {
        message: "Define the function greetPerson that accepts a parameter of type Person and returns a string.",
        revealCode: `function greetPerson(person: Person): string`
      },
      {
        message: "Return a greeting string that includes the person's name.",
        revealCode: `return \`Hello, \${person.name}!\`;`
      }
    ],
    tests: [
      {
        description: "Should greet a person with their name",
        input: { name: "Alice", age: 30 },
        expected: "Hello, Alice!"
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-104",
    title: "TypeScript Type Alias for Function",
    description: "Create a type alias for a function that takes a number and returns a boolean, called NumberValidator. Then use it to type a function parameter.",
    starterCode: `// TODO: Define NumberValidator type alias

function checkNumber(validator, num) {
  // TODO: Implement - should accept NumberValidator as parameter
}`,
    solutionCode: `type NumberValidator = (num: number) => boolean;

function checkNumber(validator: NumberValidator, num: number): boolean {
  return validator(num);
}`,
    hints: [
      {
        message: "Use the type keyword to define a type alias named NumberValidator."
      },
      {
        message: "NumberValidator should be a type alias for a function that takes a number and returns a boolean.",
        revealCode: `type NumberValidator = (num: number) => boolean;`
      },
      {
        message: "Define the function checkNumber that accepts a parameter of type NumberValidator and a number, and returns a boolean.",
        revealCode: `function checkNumber(validator: NumberValidator, num: number): boolean`
      },
      {
        message: "Call the validator function with the number and return the result.",
        revealCode: `return validator(num);`
      }
    ],
    tests: [
      {
        description: "Should return true if the number is valid based on the validator",
        input: [(num: number) => num > 10, 15],
        expected: true
      },
      {
        description: "Should return false if the number is invalid based on the validator",
        input: [(num: number) => num > 10, 5],
        expected: false
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
  },
  // --- Chained Challenges (Greeter App) ---
  {
    id: "ts-201",
    title: "Greeter Interface",
    description: "Define an interface `Greeter` with a `greet` method. This method should take a `name` of type string and return a greeting message of type string.",
    starterCode: `// TODO: Define the Greeter interface

// interface Greeter {
//   greet(name: string): string;
// }`,
    solutionCode: `interface Greeter {
  greet(name: string): string;
}`,
    hints: [
      {
        message: "Use the `interface` keyword to define an interface named `Greeter`."
      },
      {
        message: "The `Greeter` interface should have a method `greet`.",
        revealCode: `interface Greeter {
  greet(name: string): string;
}`
      },
      {
        message: "The `greet` method should take a `name` parameter of type `string` and return a `string`."
      }
    ],
    tests: [
      {
        description: "Should define a Greeter interface with a greet method",
        input: null, // Interface definition is checked implicitly by TypeScript
        expected: null
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false,
    chainId: "greeter-app" // Chain ID for grouping challenges
  },
  {
    id: "ts-202",
    title: "Basic Greeter Class",
    description: "Implement a class `BasicGreeter` that implements the `Greeter` interface. The `greet` method should return a simple greeting message like 'Hello, [name]!'.",
    starterCode: `// TODO: Implement BasicGreeter class that implements Greeter interface

// class BasicGreeter /* implements Greeter */ {
//   greet(name: string): string {
//     // TODO: Implement
//   }
// }`,
    solutionCode: `interface Greeter {
  greet(name: string): string;
}

class BasicGreeter implements Greeter {
  greet(name: string): string {
    return \`Hello, \${name}!\`;
  }
}`,
    hints: [
      {
        message: "Create a class `BasicGreeter` that `implements` the `Greeter` interface."
      },
      {
        message: "Implement the `greet` method in the `BasicGreeter` class.",
        revealCode: `greet(name: string): string {
  return \`Hello, \${name}!\`;
}`
      },
      {
        message: "The `greet` method should return a string like 'Hello, [name]!'."
      }
    ],
    tests: [
      {
        description: "BasicGreeter should implement Greeter interface",
        input: null, // Class implementation is checked implicitly by TypeScript
        expected: null
      },
      {
        description: "BasicGreeter's greet method should return a greeting",
        input: "Test User",
        expected: "Hello, Test User!"
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false,
    chainId: "greeter-app",
    dependsOn: "ts-201" // Depends on the Greeter Interface challenge
  },
  {
    id: "ts-203",
    title: "Personalized Greeter Class",
    description: "Implement a class `PersonalizedGreeter` that extends `BasicGreeter`. This class should allow setting a custom greeting prefix in the constructor (e.g., 'Good morning, '). The `greet` method should use this prefix.",
    starterCode: `// TODO: Implement PersonalizedGreeter class that extends BasicGreeter

// class PersonalizedGreeter /* extends BasicGreeter */ {
//   constructor(prefix: string) {
//     // TODO: Initialize prefix
//   }

//   greet(name: string): string {
//     // TODO: Implement - use the prefix
//   }
// }`,
    solutionCode: `interface Greeter {
  greet(name: string): string;
}

class BasicGreeter implements Greeter {
  greet(name: string): string {
    return \`Hello, \${name}!\`;
  }
}

class PersonalizedGreeter extends BasicGreeter {
  private prefix: string;

  constructor(prefix: string) {
    super(); // Call constructor of BasicGreeter
    this.prefix = prefix;
  }

  greet(name: string): string {
    return \`\${this.prefix} \${name}!\`;
  }
}`,
    hints: [
      {
        message: "Create a class `PersonalizedGreeter` that `extends` the `BasicGreeter` class."
      },
      {
        message: "Add a constructor to `PersonalizedGreeter` that takes a `prefix` string and stores it in a private field.",
        revealCode: `constructor(prefix: string) {
  super();
  this.prefix = prefix;
}`
      },
      {
        message: "Override the `greet` method in `PersonalizedGreeter` to use the stored `prefix` in the greeting message.",
        revealCode: `greet(name: string): string {
  return \`\${this.prefix} \${name}!\`;
}`
      },
      {
        message: "Remember to call `super()` in the constructor to call the constructor of the parent class (BasicGreeter)."
      }
    ],
    tests: [
      {
        description: "PersonalizedGreeter should extend BasicGreeter",
        input: null, // Class implementation is checked implicitly by TypeScript
        expected: null
      },
      {
        description: "PersonalizedGreeter's greet method should use the custom prefix",
        input: ["Good morning", "Test User"], // [prefix, name]
        expected: "Good morning Test User!"
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false,
    chainId: "greeter-app",
    dependsOn: "ts-202"
  },
  {
    id: "ts-204",
    title: "Use the Greeter",
    description: "Write a function `useGreeter` that takes a `Greeter` instance and a `name` as arguments. This function should use the `greeter` to generate a greeting message for the given name and return it.",
    starterCode: `// TODO: Write a function useGreeter that uses a Greeter instance

// function useGreeter(greeter, name) {
//   // TODO: Implement
// }`,
    solutionCode: `interface Greeter {
  greet(name: string): string;
}

function useGreeter(greeter: Greeter, name: string): string {
  return greeter.greet(name);
}`,
    hints: [
      {
        message: "Define a function `useGreeter` that takes a `Greeter` instance and a `name` (string) as parameters."
      },
      {
        message: "The `useGreeter` function should return a string.",
        revealCode: `function useGreeter(greeter: Greeter, name: string): string`
      },
      {
        message: "Inside `useGreeter`, call the `greet` method of the `greeter` instance with the provided `name` and return the result.",
        revealCode: `return greeter.greet(name);`
      }
    ],
    tests: [
      {
        description: "useGreeter function should use the Greeter instance to greet",
        input: [
          { greet: (name: string) => `Custom Greeting, ${name}!` }, // Mock Greeter instance
          "Test User"
        ],
        expected: "Custom Greeting, Test User!"
      },
      {
        description: "useGreeter function should work with BasicGreeter",
        input: [
          { greet: (name: string) => `Hello, ${name}!` }, // Mock BasicGreeter instance
          "Another User"
        ],
        expected: "Hello, Another User!"
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false,
    chainId: "greeter-app",
    dependsOn: "ts-203"
  }
];