import { Challenge } from './challenges';

export const advancedTypescriptChallenges: Challenge[] = [
  {
    id: "ts-adv-101",
    title: "Utility Types",
    description: "Use TypeScript utility types to create a read-only version of an interface with optional properties",
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// TODO: Create a type that makes all properties optional and readonly
type ReadOnlyPartialUser = any;`,
    solutionCode: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Create a type that makes all properties optional and readonly
type ReadOnlyPartialUser = Readonly<Partial<User>>;`,
    hints: [
      {
        message: "Combine Readonly<T> and Partial<T> utility types"
      },
      {
        message: "You can nest utility types like Readonly<Partial<T>>",
        revealCode: `type ReadOnlyPartialUser = Readonly<Partial<User>>;`
      }
    ],
    tests: [
      {
        description: "Should create read-only partial type",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-102",
    title: "Conditional Types",
    description: "Create a conditional type that extracts array element types",
    starterCode: `// TODO: Create a type that extracts the element type from an array
// If not an array, return the type itself
type ElementType<T> = any;

// Test cases:
// ElementType<string[]> should be string
// ElementType<number> should be number`,
    solutionCode: `// Create a type that extracts the element type from an array
// If not an array, return the type itself
type ElementType<T> = T extends (infer E)[] ? E : T;

// Test cases:
// ElementType<string[]> should be string
// ElementType<number> should be number`,
    hints: [
      {
        message: "Use conditional types with 'extends' and 'infer'"
      },
      {
        message: "Pattern: T extends SomeType<infer U> ? U : T",
        revealCode: `type ElementType<T> = T extends (infer E)[] ? E : T;`
      }
    ],
    tests: [
      {
        description: "Should extract array element types",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-103",
    title: "Mapped Types",
    description: "Create a mapped type that converts all properties to getter functions",
    starterCode: `interface Person {
  name: string;
  age: number;
  email: string;
}

// TODO: Create a type that converts properties to getter functions
// Example: { name: string } becomes { getName: () => string }
type Getters<T> = any;`,
    solutionCode: `interface Person {
  name: string;
  age: number;
  email: string;
}

// Create a type that converts properties to getter functions
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};`,
    hints: [
      {
        message: "Use template literal types with mapped types"
      },
      {
        message: "Use 'as' clause to rename keys in mapped types",
        revealCode: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};`
      }
    ],
    tests: [
      {
        description: "Should create getter type mapping",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-104",
    title: "Generic Constraints",
    description: "Create a generic function that merges two objects, ensuring no property overlap",
    starterCode: `// TODO: Create a merge function with proper type constraints
// Should only allow merging objects with no common keys
function merge<T, U>(obj1: T, obj2: U): any {
  return { ...obj1, ...obj2 };
}`,
    solutionCode: `// Create a merge function with proper type constraints
// Should only allow merging objects with no common keys
function merge<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  const hasOverlap = keys1.some(key => keys2.includes(key));
  if (hasOverlap) {
    throw new Error('Objects have overlapping keys');
  }
  
  return { ...obj1, ...obj2 };
}`,
    hints: [
      {
        message: "Use 'extends object' to constrain to object types"
      },
      {
        message: "Return type should be T & U (intersection)",
        revealCode: `function merge<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {`
      }
    ],
    tests: [
      {
        description: "Should merge objects with type safety",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-105",
    title: "Type Guards",
    description: "Create custom type guards for a union type",
    starterCode: `interface Car {
  type: 'car';
  wheels: number;
  brand: string;
}

interface Bike {
  type: 'bike';
  wheels: number;
  hasGears: boolean;
}

type Vehicle = Car | Bike;

// TODO: Create type guard functions
function isCar(vehicle: Vehicle): any {
  // Implement
}

function isBike(vehicle: Vehicle): any {
  // Implement
}`,
    solutionCode: `interface Car {
  type: 'car';
  wheels: number;
  brand: string;
}

interface Bike {
  type: 'bike';
  wheels: number;
  hasGears: boolean;
}

type Vehicle = Car | Bike;

// Create type guard functions
function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === 'car';
}

function isBike(vehicle: Vehicle): vehicle is Bike {
  return vehicle.type === 'bike';
}`,
    hints: [
      {
        message: "Use 'variable is Type' as the return type"
      },
      {
        message: "Type guards help TypeScript narrow union types",
        revealCode: `function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === 'car';
}`
      }
    ],
    tests: [
      {
        description: "Should create working type guards",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-106",
    title: "Template Literal Types",
    description: "Create a type-safe event emitter using template literal types",
    starterCode: `// TODO: Create a type-safe event system
type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  submit: { formData: Record<string, any> };
};

class EventEmitter<T extends EventMap> {
  // TODO: Implement on() and emit() with proper types
  on(event: any, handler: any): void {
    // Implement
  }
  
  emit(event: any, data: any): void {
    // Implement
  }
}`,
    solutionCode: `type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  submit: { formData: Record<string, any> };
};

class EventEmitter<T extends EventMap> {
  private handlers: Partial<{ [K in keyof T]: Array<(data: T[K]) => void> }> = {};
  
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventHandlers = this.handlers[event];
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(data));
    }
  }
}`,
    hints: [
      {
        message: "Use keyof T to constrain event names"
      },
      {
        message: "Use T[K] to get the data type for each event",
        revealCode: `on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {`
      }
    ],
    tests: [
      {
        description: "Should create type-safe event emitter",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-107",
    title: "Recursive Types",
    description: "Create a recursive type for nested JSON data",
    starterCode: `// TODO: Create a type that represents valid JSON values
// Should handle: string, number, boolean, null, arrays, and objects
type JSONValue = any;

// TODO: Create a type for nested objects with dot notation paths
type DeepKeys<T> = any;`,
    solutionCode: `// Create a type that represents valid JSON values
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Create a type for nested objects with dot notation paths
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | \`\${K}.\${DeepKeys<T[K]>}\`
          : K
        : never
    }[keyof T]
  : never;`,
    hints: [
      {
        message: "Recursive types reference themselves in their definition"
      },
      {
        message: "Use template literals for nested paths like 'a.b.c'",
        revealCode: `type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };`
      }
    ],
    tests: [
      {
        description: "Should handle recursive JSON types",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-108",
    title: "Function Overloads",
    description: "Create properly typed function overloads for a flexible API",
    starterCode: `// TODO: Create overloaded function signatures
// If called with one string, return string
// If called with two numbers, return number
// If called with boolean and string, return object
function process(input: any): any {
  // Implement
}`,
    solutionCode: `// Create overloaded function signatures
function process(input: string): string;
function process(a: number, b: number): number;
function process(flag: boolean, message: string): { flag: boolean; message: string };
function process(...args: any[]): any {
  if (args.length === 1 && typeof args[0] === 'string') {
    return args[0].toUpperCase();
  } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
    return args[0] + args[1];
  } else if (args.length === 2 && typeof args[0] === 'boolean' && typeof args[1] === 'string') {
    return { flag: args[0], message: args[1] };
  }
  throw new Error('Invalid arguments');
}`,
    hints: [
      {
        message: "Declare multiple function signatures before the implementation"
      },
      {
        message: "The implementation signature should be general enough to handle all overloads",
        revealCode: `function process(input: string): string;
function process(a: number, b: number): number;`
      }
    ],
    tests: [
      {
        description: "Should handle multiple function signatures",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-109",
    title: "Builder Pattern with Types",
    description: "Implement a type-safe builder pattern using TypeScript",
    starterCode: `// TODO: Create a type-safe builder for configuration
class ConfigBuilder {
  private config: any = {};
  
  setHost(host: string): any {
    // TODO: Return properly typed builder
  }
  
  setPort(port: number): any {
    // TODO: Return properly typed builder
  }
  
  build(): any {
    // TODO: Return complete config only if all required fields are set
  }
}`,
    solutionCode: `interface Config {
  host: string;
  port: number;
}

class ConfigBuilder<T extends Partial<Config> = {}> {
  private config: T;
  
  constructor(config: T = {} as T) {
    this.config = config;
  }
  
  setHost(host: string): ConfigBuilder<T & { host: string }> {
    return new ConfigBuilder({ ...this.config, host });
  }
  
  setPort(port: number): ConfigBuilder<T & { port: number }> {
    return new ConfigBuilder({ ...this.config, port });
  }
  
  build(): T extends Config ? Config : never {
    if ('host' in this.config && 'port' in this.config) {
      return this.config as any;
    }
    throw new Error('Configuration incomplete');
  }
}`,
    hints: [
      {
        message: "Use generic types to track which properties have been set"
      },
      {
        message: "Each setter returns a new builder type with updated properties",
        revealCode: `setHost(host: string): ConfigBuilder<T & { host: string }> {
    return new ConfigBuilder({ ...this.config, host });
  }`
      }
    ],
    tests: [
      {
        description: "Should create type-safe builder",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "ts-adv-110",
    title: "Branded Types",
    description: "Create branded types to prevent mixing different kinds of IDs",
    starterCode: `// TODO: Create branded types for different ID types
// UserId and PostId should both be strings but not interchangeable
type UserId = any;
type PostId = any;

function getUserById(id: UserId): void {
  console.log('Getting user:', id);
}

function getPostById(id: PostId): void {
  console.log('Getting post:', id);
}`,
    solutionCode: `// Create branded types for different ID types
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getUserById(id: UserId): void {
  console.log('Getting user:', id);
}

function getPostById(id: PostId): void {
  console.log('Getting post:', id);
}`,
    hints: [
      {
        message: "Use intersection types with a unique brand property"
      },
      {
        message: "Create helper functions to safely create branded values",
        revealCode: `type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, 'UserId'>;`
      }
    ],
    tests: [
      {
        description: "Should prevent mixing different ID types",
        input: null,
        expected: true
      }
    ],
    realm: "typescript",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];