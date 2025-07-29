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
    currentAttempts: number; // Track number of attempts
    showSolution: boolean; // Whether to show the solution
    chainId?: string; // Optional chain ID for grouping challenges
    dependsOn?: string; // Optional dependency on another challenge
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
    },
    {
      id: "js-104",
      title: "Multiply Two Numbers",
      description: "Write a function that takes two numbers and returns their product.",
      starterCode: `function multiply(a, b) {
        // TODO: Implement
      }`,
      solutionCode: `function multiply(a, b) {
        return a * b;
      }`,
      hints: [
        {
          message: "Use the * operator to multiply numbers."
        },
        {
          message: "Make sure to return the result of the multiplication.",
          revealCode: `function multiply(a, b) {
        return a * b;
      }`
        }
      ],
      tests: [
        {
          description: "Should multiply two positive numbers",
          input: [2, 3],
          expected: 6
        },
        {
          description: "Should multiply a positive and negative number",
          input: [-2, 3],
          expected: -6
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-105",
      title: "Divide Two Numbers",
      description: "Write a function that takes two numbers and returns their quotient.",
      starterCode: `function divide(a, b) {
        // TODO: Implement
      }`,
      solutionCode: `function divide(a, b) {
        return a / b;
      }`,
      hints: [
        {
          message: "Use the / operator to divide numbers."
        },
        {
          message: "Make sure to return the result of the division.",
          revealCode: `function divide(a, b) {
        return a / b;
      }`
        }
      ],
      tests: [
        {
          description: "Should divide two positive numbers",
          input: [6, 3],
          expected: 2
        },
        {
          description: "Should divide a positive and negative number",
          input: [-6, 3],
          expected: -2
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-106",
      title: "Modulo Operation",
      description: "Write a function that takes two numbers and returns the remainder of their division.",
      starterCode: `function modulo(a, b) {
        // TODO: Implement
      }`,
      solutionCode: `function modulo(a, b) {
        return a % b;
      }`,
      hints: [
        {
          message: "Use the % operator to get the remainder."
        },
        {
          message: "Make sure to return the result of the modulo operation.",
          revealCode: `function modulo(a, b) {
        return a % b;
      }`
        }
      ],
      tests: [
        {
          description: "Should return remainder of two positive numbers",
          input: [7, 3],
          expected: 1
        },
        {
          description: "Should return remainder of negative and positive numbers",
          input: [-7, 3],
          expected: -1
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-107",
      title: "Declare a Variable",
      description: "Declare a variable called 'name' and assign it your name as a string.",
      starterCode: `// TODO: Declare variable
`,
      solutionCode: `const name = "John Doe";`,
      hints: [
        {
          message: "Use the const keyword to declare a variable."
        },
        {
          message: "Assign a string value to the variable.",
          revealCode: `const name = "John Doe";`
        }
      ],
      tests: [
        {
          description: "Should declare a variable called name",
          input: null,
          expected: "John Doe"
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-108",
      title: "Reassign a Variable",
      description: "Declare a variable using let and reassign its value.",
      starterCode: `let count = 0;
// TODO: Reassign variable
`,
      solutionCode: `let count = 0;
count = 10;`,
      hints: [
        {
          message: "Use the assignment operator (=) to change the value."
        },
        {
          message: "Reassign the variable to a new value.",
          revealCode: `count = 10;`
        }
      ],
      tests: [
        {
          description: "Should reassign the variable",
          input: null,
          expected: 10
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-109",
      title: "String Concatenation",
      description: "Combine two strings using the + operator.",
      starterCode: `function combineStrings(a, b) {
        // TODO: Implement
      }`,
      solutionCode: `function combineStrings(a, b) {
        return a + b;
      }`,
      hints: [
        {
          message: "Use the + operator to combine strings."
        },
        {
          message: "Make sure to return the combined string.",
          revealCode: `function combineStrings(a, b) {
        return a + b;
      }`
        }
      ],
      tests: [
        {
          description: "Should combine two strings",
          input: ["Hello", " World"],
          expected: "Hello World"
        },
        {
          description: "Should combine empty strings",
          input: ["", ""],
          expected: ""
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-110",
      title: "If Statement",
      description: "Write a function that returns 'positive' if a number is greater than 0, 'negative' if less than 0, and 'zero' if equal to 0.",
      starterCode: `function checkNumber(num) {
        // TODO: Implement
      }`,
      solutionCode: `function checkNumber(num) {
        if (num > 0) {
          return 'positive';
        } else if (num < 0) {
          return 'negative';
        } else {
          return 'zero';
        }
      }`,
      hints: [
        {
          message: "Use if/else if/else statements to check conditions."
        },
        {
          message: "Compare the number using >, <, and == operators.",
          revealCode: `if (num > 0) {
          return 'positive';
        }`
        }
      ],
      tests: [
        {
          description: "Should return 'positive' for positive numbers",
          input: [5],
          expected: "positive"
        },
        {
          description: "Should return 'negative' for negative numbers",
          input: [-5],
          expected: "negative"
        },
        {
          description: "Should return 'zero' for zero",
          input: [0],
          expected: "zero"
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-111",
      title: "For Loop",
      description: "Write a function that takes a number and returns the sum of all numbers from 1 to that number.",
      starterCode: `function sumToN(n) {
        // TODO: Implement
      }`,
      solutionCode: `function sumToN(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          sum += i;
        }
        return sum;
      }`,
      hints: [
        {
          message: "Use a for loop to iterate from 1 to n."
        },
        {
          message: "Initialize a sum variable and add each number to it.",
          revealCode: `let sum = 0;
        for (let i = 1; i <= n; i++) {
          sum += i;
        }`
        }
      ],
      tests: [
        {
          description: "Should sum numbers from 1 to 5",
          input: [5],
          expected: 15
        },
        {
          description: "Should return 1 for n=1",
          input: [1],
          expected: 1
        },
        {
          description: "Should handle zero",
          input: [0],
          expected: 0
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-112",
      title: "While Loop",
      description: "Write a function that takes a number and returns the factorial of that number using a while loop.",
      starterCode: `function factorial(n) {
        // TODO: Implement
      }`,
      solutionCode: `function factorial(n) {
        let result = 1;
        let i = n;
        while (i > 1) {
          result *= i;
          i--;
        }
        return result;
      }`,
      hints: [
        {
          message: "Initialize a result variable to 1."
        },
        {
          message: "Use a while loop to multiply the numbers in descending order.",
          revealCode: `while (i > 1) {
          result *= i;
          i--;
        }`
        }
      ],
      tests: [
        {
          description: "Should calculate factorial of 5",
          input: [5],
          expected: 120
        },
        {
          description: "Should return 1 for 0 and 1",
          input: [0],
          expected: 1
        },
        {
          description: "Should calculate factorial of 3",
          input: [3],
          expected: 6
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-113",
      title: "Function Expression",
      description: "Write a function expression that takes two numbers and returns their sum.",
      starterCode: `// TODO: Implement function expression
`,
      solutionCode: `const sum = function(a, b) {
        return a + b;
      };`,
      hints: [
        {
          message: "Use the function keyword without a name."
        },
        {
          message: "Assign the function to a variable.",
          revealCode: `const sum = function(a, b) {
        return a + b;
      };`
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
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-114",
      title: "Arrow Function",
      description: "Write an arrow function that takes two numbers and returns their product.",
      starterCode: `// TODO: Implement arrow function
`,
      solutionCode: `const multiply = (a, b) => a * b;`,
      hints: [
        {
          message: "Use the arrow function syntax."
        },
        {
          message: "You can write it as a one-liner without return.",
          revealCode: `const multiply = (a, b) => a * b;`
        }
      ],
      tests: [
        {
          description: "Should multiply two positive numbers",
          input: [2, 3],
          expected: 6
        },
        {
          description: "Should multiply a positive and negative number",
          input: [-2, 3],
          expected: -6
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-115",
      title: "Array Basics",
      description: "Create an array with three numbers and return the second element.",
      starterCode: `function getSecondElement() {
        // TODO: Implement
      }`,
      solutionCode: `function getSecondElement() {
        const arr = [1, 2, 3];
        return arr[1];
      }`,
      hints: [
        {
          message: "Create an array using square brackets."
        },
        {
          message: "Access array elements using their index (starting from 0).",
          revealCode: `const arr = [1, 2, 3];
        return arr[1];`
        }
      ],
      tests: [
        {
          description: "Should return the second element",
          input: null,
          expected: 2
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-116",
      title: "Array Methods",
      description: "Write a function that takes an array of numbers and returns a new array with each number doubled.",
      starterCode: `function doubleNumbers(arr) {
        // TODO: Implement
      }`,
      solutionCode: `function doubleNumbers(arr) {
        return arr.map(num => num * 2);
      }`,
      hints: [
        {
          message: "Use the map() method to transform each element."
        },
        {
          message: "Return a new array with each element multiplied by 2.",
          revealCode: `return arr.map(num => num * 2);`
        }
      ],
      tests: [
        {
          description: "Should double each number",
          input: [[1, 2, 3]],
          expected: [2, 4, 6]
        },
        {
          description: "Should handle empty array",
          input: [[]],
          expected: []
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-117",
      title: "Object Basics",
      description: "Create an object representing a person with name and age properties, and return the name.",
      starterCode: `function getPersonName() {
        // TODO: Implement
      }`,
      solutionCode: `function getPersonName() {
        const person = {
          name: "John",
          age: 30
        };
        return person.name;
      }`,
      hints: [
        {
          message: "Create an object using curly braces."
        },
        {
          message: "Access object properties using dot notation.",
          revealCode: `const person = {
          name: "John",
          age: 30
        };
        return person.name;`
        }
      ],
      tests: [
        {
          description: "Should return the person's name",
          input: null,
          expected: "John"
        }
      ],
      realm: "javascript",
      difficulty: "easy",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-118",
      title: "DOM Manipulation",
      description: "Write a function that changes the text content of an element with id 'output' to 'Hello World'.",
      starterCode: `function changeText() {
        // TODO: Implement
      }`,
      solutionCode: `function changeText() {
        document.getElementById('output').textContent = 'Hello World';
      }`,
      hints: [
        {
          message: "Use document.getElementById to select the element."
        },
        {
          message: "Set the textContent property of the element.",
          revealCode: `document.getElementById('output').textContent = 'Hello World';`
        }
      ],
      tests: [
        {
          description: "Should change the text content",
          input: null,
          expected: "Hello World"
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-119",
      title: "Event Listener",
      description: "Write a function that adds a click event listener to a button with id 'myButton' that logs 'Clicked!' to the console.",
      starterCode: `function addClickListener() {
        // TODO: Implement
      }`,
      solutionCode: `function addClickListener() {
        document.getElementById('myButton').addEventListener('click', () => {
          console.log('Clicked!');
        });
      }`,
      hints: [
        {
          message: "Use addEventListener to attach the click event."
        },
        {
          message: "Use an arrow function as the event handler.",
          revealCode: `document.getElementById('myButton').addEventListener('click', () => {
          console.log('Clicked!');
        });`
        }
      ],
      tests: [
        {
          description: "Should add click event listener",
          input: null,
          expected: "Clicked!"
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
    {
      id: "js-120",
      title: "Error Handling",
      description: "Write a function that divides two numbers and handles division by zero by returning 'Error: Division by zero'.",
      starterCode: `function safeDivide(a, b) {
        // TODO: Implement
      }`,
      solutionCode: `function safeDivide(a, b) {
        try {
          if (b === 0) {
            throw new Error('Division by zero');
          }
          return a / b;
        } catch (error) {
          return 'Error: Division by zero';
        }
      }`,
      hints: [
        {
          message: "Use a try-catch block to handle the error."
        },
        {
          message: "Throw an error when the divisor is zero.",
          revealCode: `if (b === 0) {
          throw new Error('Division by zero');
        }`
        }
      ],
      tests: [
        {
          description: "Should divide two positive numbers",
          input: [6, 3],
          expected: 2
        },
        {
          description: "Should return error message for division by zero",
          input: [6, 0],
          expected: "Error: Division by zero"
        }
      ],
      realm: "javascript",
      difficulty: "medium",
      currentAttempts: 0,
      showSolution: false
    },
  ];

// Export all challenges combined
export { helmChallenges } from './helmChallenges';
export { terraformChallenges } from './terraformChallenges';
export { cloudCliChallenges } from './cloudCliChallenges';
export { pythonChallenges } from './pythonChallenges';
export { advancedTypescriptChallenges } from './advancedTypescriptChallenges';
