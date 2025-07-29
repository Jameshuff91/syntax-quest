import { Challenge } from './challenges';

export const pythonChallenges: Challenge[] = [
  {
    id: "python-101",
    title: "List Comprehensions",
    description: "Create a list comprehension that filters and transforms data in one line",
    starterCode: `# Create a list of squared even numbers from 1 to 20
# TODO: Use list comprehension
squared_evens = []`,
    solutionCode: `# Create a list of squared even numbers from 1 to 20
squared_evens = [x**2 for x in range(1, 21) if x % 2 == 0]`,
    hints: [
      {
        message: "List comprehensions follow the pattern: [expression for item in iterable if condition]"
      },
      {
        message: "Filter with 'if x % 2 == 0' and transform with 'x**2'",
        revealCode: `[x**2 for x in range(1, 21) if x % 2 == 0]`
      }
    ],
    tests: [
      {
        description: "Should create list of squared even numbers",
        input: null,
        expected: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]
      }
    ],
    realm: "python",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-102",
    title: "Decorators Basics",
    description: "Create a decorator that measures the execution time of a function",
    starterCode: `import time

# TODO: Create a timing decorator
def timer(func):
    pass

@timer
def slow_function():
    time.sleep(0.1)
    return "Done"`,
    solutionCode: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "Done"`,
    hints: [
      {
        message: "Decorators are functions that take a function and return a modified function"
      },
      {
        message: "Use a wrapper function inside to preserve the original function's behavior",
        revealCode: `def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)`
      }
    ],
    tests: [
      {
        description: "Should measure execution time",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-103",
    title: "Context Managers",
    description: "Create a context manager for handling database connections safely",
    starterCode: `# TODO: Create a context manager class
class DatabaseConnection:
    def __init__(self, host):
        self.host = host
        self.connected = False
    
    # TODO: Implement context manager protocol`,
    solutionCode: `class DatabaseConnection:
    def __init__(self, host):
        self.host = host
        self.connected = False
    
    def __enter__(self):
        print(f"Connecting to {self.host}...")
        self.connected = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing connection to {self.host}")
        self.connected = False
        if exc_type:
            print(f"Error occurred: {exc_val}")
        return False
    
    def query(self, sql):
        if not self.connected:
            raise RuntimeError("Not connected")
        return f"Results for: {sql}"`,
    hints: [
      {
        message: "Context managers need __enter__ and __exit__ methods"
      },
      {
        message: "__exit__ receives exception info if an error occurred",
        revealCode: `def __enter__(self):
        print(f"Connecting to {self.host}...")
        self.connected = True
        return self`
      }
    ],
    tests: [
      {
        description: "Should manage connection lifecycle",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-104",
    title: "Generators and Yield",
    description: "Create a generator that yields Fibonacci numbers up to a limit",
    starterCode: `# TODO: Create a Fibonacci generator
def fibonacci(limit):
    # Yield Fibonacci numbers up to limit
    pass`,
    solutionCode: `def fibonacci(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b`,
    hints: [
      {
        message: "Generators use 'yield' instead of 'return' to produce values"
      },
      {
        message: "The Fibonacci sequence: each number is the sum of the two preceding ones",
        revealCode: `a, b = 0, 1
    while a <= limit:
        yield a`
      }
    ],
    tests: [
      {
        description: "Should generate Fibonacci numbers",
        input: [50],
        expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-105",
    title: "Async/Await Basics",
    description: "Create an async function that fetches data from multiple sources concurrently",
    starterCode: `import asyncio

# TODO: Create async function to fetch from multiple URLs
async def fetch_all(urls):
    # Simulate fetching from URLs concurrently
    pass`,
    solutionCode: `import asyncio

async def fetch_url(url):
    # Simulate network delay
    await asyncio.sleep(1)
    return f"Data from {url}"

async def fetch_all(urls):
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)
    return results`,
    hints: [
      {
        message: "Use asyncio.gather() to run multiple async tasks concurrently"
      },
      {
        message: "Create a list of tasks and await them all with gather",
        revealCode: `tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)`
      }
    ],
    tests: [
      {
        description: "Should fetch from multiple sources concurrently",
        input: [["url1", "url2", "url3"]],
        expected: ["Data from url1", "Data from url2", "Data from url3"]
      }
    ],
    realm: "python",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-106",
    title: "Dataclasses",
    description: "Create a dataclass for a configuration object with validation",
    starterCode: `from dataclasses import dataclass
from typing import Optional

# TODO: Create a Config dataclass
# Should have: host (str), port (int), debug (bool, default False)
# Add validation in __post_init__`,
    solutionCode: `from dataclasses import dataclass
from typing import Optional

@dataclass
class Config:
    host: str
    port: int
    debug: bool = False
    
    def __post_init__(self):
        if not self.host:
            raise ValueError("Host cannot be empty")
        if not 1 <= self.port <= 65535:
            raise ValueError("Port must be between 1 and 65535")
    
    @property
    def url(self):
        return f"http://{self.host}:{self.port}"`,
    hints: [
      {
        message: "Use @dataclass decorator and type annotations"
      },
      {
        message: "__post_init__ runs after the dataclass __init__",
        revealCode: `@dataclass
class Config:
    host: str
    port: int
    debug: bool = False`
      }
    ],
    tests: [
      {
        description: "Should create validated config objects",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-107",
    title: "Type Hints and Generics",
    description: "Create a generic Stack class with proper type hints",
    starterCode: `from typing import TypeVar, Generic, List, Optional

# TODO: Create a generic Stack class
T = TypeVar('T')

class Stack:
    pass`,
    solutionCode: `from typing import TypeVar, Generic, List, Optional

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> Optional[T]:
        return self._items.pop() if self._items else None
    
    def peek(self) -> Optional[T]:
        return self._items[-1] if self._items else None
    
    def is_empty(self) -> bool:
        return len(self._items) == 0
    
    def size(self) -> int:
        return len(self._items)`,
    hints: [
      {
        message: "Inherit from Generic[T] to make the class generic"
      },
      {
        message: "Use Optional[T] for methods that might return None",
        revealCode: `class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []`
      }
    ],
    tests: [
      {
        description: "Should create a type-safe stack",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-108",
    title: "Custom Exceptions",
    description: "Create a custom exception hierarchy for an API client",
    starterCode: `# TODO: Create custom exceptions
# Base: APIError
# Children: AuthenticationError, RateLimitError, NotFoundError
# Each should have a status_code attribute`,
    solutionCode: `class APIError(Exception):
    def __init__(self, message: str, status_code: int):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

class AuthenticationError(APIError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, 401)

class RateLimitError(APIError):
    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(message, 429)

class NotFoundError(APIError):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, 404)`,
    hints: [
      {
        message: "Create a base exception class that other exceptions inherit from"
      },
      {
        message: "Each specific exception should set its own status code",
        revealCode: `class APIError(Exception):
    def __init__(self, message: str, status_code: int):
        super().__init__(message)
        self.status_code = status_code`
      }
    ],
    tests: [
      {
        description: "Should create proper exception hierarchy",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-109",
    title: "Property Decorators",
    description: "Create a Temperature class with Celsius/Fahrenheit conversion properties",
    starterCode: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    # TODO: Add celsius property with getter/setter
    # TODO: Add fahrenheit property with getter/setter
    # TODO: Add validation (not below absolute zero)`,
    solutionCode: `class Temperature:
    def __init__(self, celsius=0):
        self.celsius = celsius  # Use property setter
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is not possible")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9`,
    hints: [
      {
        message: "Use @property for getters and @property_name.setter for setters"
      },
      {
        message: "Absolute zero is -273.15°C or -459.67°F",
        revealCode: `@property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):`
      }
    ],
    tests: [
      {
        description: "Should handle temperature conversions",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "python-110",
    title: "Metaclasses",
    description: "Create a metaclass that automatically adds a 'created_at' timestamp to all instances",
    starterCode: `import time

# TODO: Create TimestampMeta metaclass
class TimestampMeta:
    pass

# TODO: Use the metaclass
class MyModel:
    pass`,
    solutionCode: `import time

class TimestampMeta(type):
    def __call__(cls, *args, **kwargs):
        instance = super().__call__(*args, **kwargs)
        instance.created_at = time.time()
        return instance

class MyModel(metaclass=TimestampMeta):
    def __init__(self, name):
        self.name = name`,
    hints: [
      {
        message: "Metaclasses inherit from 'type' and override __call__"
      },
      {
        message: "Use metaclass=YourMeta in the class definition",
        revealCode: `class TimestampMeta(type):
    def __call__(cls, *args, **kwargs):
        instance = super().__call__(*args, **kwargs)`
      }
    ],
    tests: [
      {
        description: "Should add timestamp to instances",
        input: null,
        expected: true
      }
    ],
    realm: "python",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];