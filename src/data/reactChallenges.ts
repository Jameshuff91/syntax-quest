import { Challenge } from './challenges';

export const reactChallenges: Challenge[] = [
  {
    id: "react-101",
    title: "React Hello World",
    description: "Create a React component that renders 'Hello, React!' in a div.",
    starterCode: `function HelloWorld() {
  // TODO: Implement
  return (
    <div>

    </div>
  );
}`,
    solutionCode: `function HelloWorld() {
  return (
    <div>Hello, React!</div>
  );
}`,
    hints: [
      {
        message: "Use JSX to render 'Hello, React!' inside a div."
      },
      {
        message: "Return a div element with the text 'Hello, React!'.",
        revealCode: `<div>Hello, React!</div>`
      }
    ],
    tests: [
      {
        description: "Should render 'Hello, React!'",
        input: null,
        expected: "<div>Hello, React!</div>"
      }
    ],
    realm: "react",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "react-102",
    title: "React Functional Component with Props",
    description: "Create a React functional component Welcome that accepts a prop name and renders 'Hello, [name]!'.",
    starterCode: `function Welcome(props) {
  // TODO: Implement
  return (
    <div>

    </div>
  );
}`,
    solutionCode: `function Welcome(props) {
  return (
    <div>Hello, {props.name}!</div>
  );
}`,
    hints: [
      {
        message: "Access props using the props object."
      },
      {
        message: "Use JSX to render 'Hello, ' followed by the name prop.",
        revealCode: `<div>Hello, {props.name}!</div>`
      }
    ],
    tests: [
      {
        description: "Should render 'Hello, Alice!' when name prop is 'Alice'",
        input: { name: "Alice" },
        expected: "<div>Hello, Alice!</div>"
      }
    ],
    realm: "react",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "react-103",
    title: "React State Hook",
    description: "Create a React component Counter that uses useState to increment a counter on button click.",
    starterCode: `import React, { useState } from 'react';

function Counter() {
  // TODO: Implement useState and increment logic
  return (
    <div>
      <p>Count: 0</p>
      <button>Increment</button>
    </div>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    hints: [
      {
        message: "Import useState from React."
      },
      {
        message: "Use useState to initialize a count state variable to 0.",
        revealCode: `const [count, setCount] = useState(0);`
      },
      {
        message: "Attach an onClick handler to the button to update the count.",
        revealCode: `<button onClick={() => setCount(count + 1)}>Increment</button>`
      }
    ],
    tests: [
      {
        description: "Should increment the counter on button click",
        input: null,
        expected: 1
      }
    ],
    realm: "react",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "react-104",
    title: "React Event Handling",
    description: "Create a React component that displays an alert when a button is clicked.",
    starterCode: `function AlertButton() {
  // TODO: Implement click handler and button
  return (
    <div>
      <button>Click Me</button>
    </div>
  );
}`,
    solutionCode: `function AlertButton() {
  const handleClick = () => {
    alert('Button Clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}`,
    hints: [
      {
        message: "Define a function handleClick that calls alert('Button Clicked!')."
      },
      {
        message: "Attach the handleClick function to the button's onClick event.",
        revealCode: `<button onClick={handleClick}>Click Me</button>`
      }
    ],
    tests: [
      {
        description: "Should display an alert on button click",
        input: null,
        expected: "Button Clicked!"
      }
    ],
    realm: "react",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "react-105",
    title: "React List Rendering",
    description: "Create a React component that renders a list of items from an array.",
    starterCode: `function ItemList() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  // TODO: Render list items
  return (
    <ul>

    </ul>
  );
}`,
    solutionCode: `function ItemList() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      {
        message: "Use the map() method to iterate over the items array."
      },
      {
        message: "Render each item in a <li> element within the <ul>.",
        revealCode: `{items.map(item => (
        <li key={item}>{item}</li>
      ))}`
      },
      {
        message: "Ensure each <li> element has a unique key prop.",
        revealCode: `<li key={item}>{item}</li>`
      }
    ],
    tests: [
      {
        description: "Should render a list of items",
        input: null,
        expected: "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>"
      }
    ],
    realm: "react",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  }
];