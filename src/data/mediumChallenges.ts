import { Challenge } from './challenges';

export const mediumChallenges: Challenge[] = [
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
  }
];
