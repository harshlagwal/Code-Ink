import { Chapter } from '../types/notebook';

export const PYTHON_CHAPTERS_PART2: Chapter[] = [
  // CHAPTER 11 — DICTIONARIES
  {
    id: 'py-ch11',
    number: 11,
    title: 'Dictionaries',
    description: 'Hash map architecture, key-value mappings, dictionary methods, and comprehensions',
    topics: [
      {
        id: 'py-dictionaries-ch11',
        subjectId: 'python',
        chapterId: 'py-ch11',
        chapterNumber: 11,
        pageNumber: 16,
        title: 'Dictionaries: Hash Table Internals & Dict Comprehensions',
        difficulty: 'intermediate',
        definition: 'A dictionary is a mutable, key-value mapping backed by a compact hash table. Since Python 3.7, dictionaries are guaranteed to maintain insertion order.',
        whyItMatters: 'Dictionaries are the most optimized, ubiquitous data structure in Python, forming the basis of module namespaces, object `__dict__`, and JSON APIs.',
        syntax: 'd = {key: value}\nvalue = d.get(key, default)',
        explanation: [
          'Keys must be hashable and immutable (strings, numbers, tuples with immutable items).',
          '`d.get(key, default)`: Safely retrieves value without raising `KeyError` if the key is missing.',
          'Iteration: `for k, v in d.items():` yields key-value pairs; `d.keys()` and `d.values()` provide dynamic views.',
          'Dict comprehension: `{k: v for item in iterable if condition}` creates mappings concisely.'
        ],
        example: {
          language: 'python',
          code: `# Creating and querying dictionary
server = {
    "host": "10.0.0.1",
    "port": 8080,
    "status": "online"
}

# Safe lookup with default
ssl_enabled = server.get("ssl", False)
print(f"Server {server['host']}:{server['port']} | SSL: {ssl_enabled}")

# Dictionary comprehension: Inverting mapping
code_to_name = {200: "OK", 404: "Not Found", 500: "Internal Error"}
name_to_code = {v: k for k, v in code_to_name.items()}
print("Inverted:", name_to_code)`,
          output: 'Server 10.0.0.1:8080 | SSL: False\nInverted: {\'OK\': 200, \'Not Found\': 404, \'Internal Error\': 500}',
          annotations: [
            { line: 9, label: 'Safe get() with fallback default', type: 'blue' },
            { line: 14, label: 'Dictionary comprehension key-value flip', type: 'yellow' }
          ]
        },
        important: 'Direct indexing `d[missing_key]` raises `KeyError`. Use `d.get(key, default)` or `collections.defaultdict` for safe lookups.',
        commonMistakes: [
          'Modifying dictionary keys while iterating directly over the dictionary (raises `RuntimeError: dictionary changed size during iteration`).'
        ],
        tip: 'Use dictionary unpacking `merged = {**dict1, **dict2}` or the pipe operator `merged = dict1 | dict2` (Python 3.9+) to merge dictionaries.',
        interviewNote: 'Question: "Are dictionaries ordered in Python?" Answer: "Yes, since Python 3.6 (CPython) and specified in Python 3.7+, dictionaries preserve key insertion order using a compact hash table design."',
        practiceQuestions: [
          {
            id: 'q-py11-1',
            type: 'output',
            question: 'What is the output of `d = {"a": 1}; print(d.get("b", 0))`?',
            options: ['None', 'KeyError', '0', '1'],
            correctIndex: 2,
            explanation: 'd.get("b", 0) returns the provided default value 0 because key "b" does not exist in d.'
          }
        ],
        relatedTopics: ['py-sets-ch10', 'py-comprehensions-ch18']
      }
    ]
  },

  // CHAPTER 12 — FUNCTIONS
  {
    id: 'py-ch12',
    number: 12,
    title: 'Functions',
    description: 'First-class citizens, parameters, *args, **kwargs, scope (LEGB rule), lambdas, and type hints',
    topics: [
      {
        id: 'py-functions-ch12',
        subjectId: 'python',
        chapterId: 'py-ch12',
        chapterNumber: 12,
        pageNumber: 17,
        title: 'Functions: Parameters, *args, **kwargs & LEGB Scope',
        difficulty: 'intermediate',
        definition: 'Functions are first-class objects defined with `def`. They accept positional, keyword, and arbitrary variable-length arguments (*args, **kwargs).',
        whyItMatters: 'Functions allow modular decomposition, abstraction, and reusability. Understanding variable scope resolution (LEGB) prevents unintentional global state bugs.',
        syntax: 'def func(pos, *args, kw_only=val, **kwargs):\n    return result',
        explanation: [
          'First-Class: Functions can be assigned to variables, passed as arguments to other functions, and returned from functions.',
          '`*args`: Collects extra positional arguments into a tuple.',
          '`**kwargs`: Collects extra keyword arguments into a dictionary.',
          'LEGB Scope Resolution Rule: Local -> Enclosing -> Global -> Built-in.',
          'Lambda functions: Anonymous inline functions: `lambda x: x * 2`.'
        ],
        example: {
          language: 'python',
          code: `# Function with *args and **kwargs
def build_query(table: str, *columns, **filters) -> str:
    cols = ", ".join(columns) if columns else "*"
    conditions = [f"{k} = '{v}'" for k, v in filters.items()]
    where_clause = f" WHERE {' AND '.join(conditions)}" if conditions else ""
    return f"SELECT {cols} FROM {table}{where_clause};"

query = build_query("users", "id", "email", status="active", role="admin")
print(query)

# Lambda sorting key
pairs = [(1, "apple"), (3, "banana"), (2, "cherry")]
pairs.sort(key=lambda item: item[1])
print("Sorted by name:", pairs)`,
          output: 'SELECT id, email FROM users WHERE status = \'active\' AND role = \'admin\';\nSorted by name: [(1, \'apple\'), (3, \'banana\'), (2, \'cherry\')]',
          annotations: [
            { line: 2, label: '*columns tuple and **filters dict', type: 'blue' },
            { line: 8, label: 'Dynamic SQL query builder', type: 'yellow' },
            { line: 13, label: 'Inline lambda sort key', type: 'green' }
          ]
        },
        important: 'NEVER use mutable objects (like `def add_item(item, target=[])`) as default arguments! Default argument expressions are evaluated once when the function is defined.',
        commonMistakes: [
          'Modifying a global variable inside a function without the `global` keyword (triggers `UnboundLocalError`).',
          'Using mutable default arguments.'
        ],
        tip: 'Idiomatic fix for default arguments: `def process(items=None): if items is None: items = []`.',
        interviewNote: 'Question: "What is the LEGB rule in Python?" Answer: "The order Python searches namespaces for names: Local scope first, then Enclosing (outer functions), Global (module level), and finally Built-in namespace."',
        practiceQuestions: [
          {
            id: 'q-py12-1',
            type: 'output',
            question: 'What is the output of: `def f(a, *args): return len(args); print(f(1, 2, 3, 4))`?',
            options: ['4', '3', '1', 'TypeError'],
            correctIndex: 1,
            explanation: 'Argument `a` consumes 1. The remaining positional arguments (2, 3, 4) are packed into tuple `args`, whose length is 3.'
          }
        ],
        relatedTopics: ['py-decorators-ch19', 'py-modules-ch13']
      }
    ]
  },

  // CHAPTER 13 — MODULES & PACKAGES
  {
    id: 'py-ch13',
    number: 13,
    title: 'Modules & Packages',
    description: 'Namespaces, import machinery, standard library modules, and __name__ == "__main__"',
    topics: [
      {
        id: 'py-modules-packages',
        subjectId: 'python',
        chapterId: 'py-ch13',
        chapterNumber: 13,
        pageNumber: 18,
        title: 'Modules, Packages & __name__ == "__main__"',
        difficulty: 'intermediate',
        definition: 'A module is a single Python file (.py). A package is a directory containing modules. `__name__ == "__main__"` guards execution when run directly.',
        whyItMatters: 'Writing modular code with proper entry points allows files to serve as both importable utility libraries and executable standalone command-line scripts.',
        syntax: 'if __name__ == "__main__":\n    main()',
        explanation: [
          'Import system: When importing a module, Python searches `sys.path` (current directory, PYTHONPATH, standard library, site-packages).',
          'Bytecode cache: Imported modules are compiled to `__pycache__/*.pyc` to accelerate subsequent imports.',
          '`__name__`: Special built-in variable set to `"__main__"` if the file is the direct script entry point, or set to the module name if imported.',
          'Standard library power: Built-in `math`, `random`, `datetime`, `os`, `sys`, `pathlib` provide rich tooling without external dependencies.'
        ],
        example: {
          language: 'python',
          code: `# Standard library imports
import math
import sys

def calculate_circle_area(radius: float) -> float:
    """Compute Euclidean circle area."""
    return math.pi * (radius ** 2)

# Guard: runs only when executed directly, NOT when imported
if __name__ == "__main__":
    r = 5.0
    area = calculate_circle_area(r)
    print(f"Radius: {r} => Area: {area:.4f}")
    print(f"Module Name: {__name__}")`,
          output: 'Radius: 5.0 => Area: 78.5398\nModule Name: __main__',
          annotations: [
            { line: 2, label: 'Standard library module', type: 'blue' },
            { line: 9, label: 'Direct execution guard block', type: 'yellow' }
          ]
        },
        important: 'Avoid wildcard imports like `from math import *`. They pollute the local namespace, hide variable origins, and risk silent variable overwrites.',
        commonMistakes: [
          'Naming your local file `math.py` or `random.py`. When you do `import math`, Python imports your own file instead of the standard library!'
        ],
        tip: 'Always use virtual environments (`python -m venv .venv`) to isolate third-party pip dependencies per project.',
        interviewNote: 'Question: "What is the purpose of `__init__.py` in Python?" Answer: "Historically it declared a directory as a regular Python package. In Python 3.3+ namespace packages can omit it, but it is still standard for package initialization and public API export."',
        practiceQuestions: [
          {
            id: 'q-py13-1',
            type: 'mcq',
            question: 'What is the value of `__name__` when a Python file is imported into another file?',
            options: ['"__main__"', 'The filename / module name', 'None', '"__init__"'],
            correctIndex: 1,
            explanation: 'When imported, `__name__` is set to the module\'s name (e.g., "utils"); it is only "__main__" when executed directly as the script entry point.'
          }
        ],
        relatedTopics: ['py-functions-ch12', 'py-file-handling-ch14']
      }
    ]
  },

  // CHAPTER 14 — FILE HANDLING
  {
    id: 'py-ch14',
    number: 14,
    title: 'File Handling',
    description: 'File streams, the with statement context manager, CSV, JSON, and pathlib',
    topics: [
      {
        id: 'py-file-handling-ch14',
        subjectId: 'python',
        chapterId: 'py-ch14',
        chapterNumber: 14,
        pageNumber: 19,
        title: 'File I/O, the with Statement & JSON Processing',
        difficulty: 'intermediate',
        definition: 'File handling provides stream-based reading and writing of text and binary files. The `with` statement ensures deterministic file descriptor closing.',
        whyItMatters: 'Using context managers (`with open(...)`) guarantees files are closed even if uncaught exceptions occur, preventing operating system file descriptor leaks.',
        syntax: 'with open(path, mode="r", encoding="utf-8") as f:\n    content = f.read()',
        explanation: [
          'File modes: `"r"` (read), `"w"` (overwrite), `"a"` (append), `"b"` (binary: `"rb"`, `"wb"`).',
          'Context Manager `with`: Calls `__enter__` and guarantees `__exit__` executes to close file descriptors.',
          'Iteration: `for line in f:` streams lines lazily without loading massive multi-gigabyte files into RAM.',
          '`json` module: Serializes Python dicts/lists to JSON strings (`json.dumps`) and deserializes JSON (`json.loads`).'
        ],
        example: {
          language: 'python',
          code: `import json

# Serializing structured data to JSON
config = {
    "app": "CODEINK",
    "version": 3.12,
    "features": ["notebook", "practice", "compiler"]
}

json_payload = json.dumps(config, indent=2)
print("Serialized JSON:\\n", json_payload)

# Parsing back to Python dictionary
parsed = json.loads(json_payload)
print("Decoded app name:", parsed["app"])`,
          output: 'Serialized JSON:\n {\n  "app": "CODEINK",\n  "version": 3.12,\n  "features": [\n    "notebook",\n    "practice",\n    "compiler"\n  ]\n}\nDecoded app name: CODEINK',
          annotations: [
            { line: 10, label: 'json.dumps converts PyObject to JSON string', type: 'blue' },
            { line: 14, label: 'json.loads parses JSON string into Python dict', type: 'green' }
          ]
        },
        important: 'Always specify `encoding="utf-8"` when opening text files to ensure cross-platform compatibility across Windows, Linux, and macOS.',
        commonMistakes: [
          'Opening files with `f = open(...)` without a `try...finally` or `with` statement, risking file descriptor exhaustion under load.',
          'Using `.read()` on gigantic multi-GB log files instead of iterating line-by-line with `for line in f:`.'
        ],
        tip: 'Use the modern `pathlib.Path` standard library object: `from pathlib import Path; p = Path("data.json"); text = p.read_text(encoding="utf-8")`.',
        interviewNote: 'Question: "What is the difference between json.dump() and json.dumps()?" Answer: "`json.dump(obj, file)` writes JSON directly to a file stream; `json.dumps(obj)` returns a JSON-formatted string."',
        practiceQuestions: [
          {
            id: 'q-py14-1',
            type: 'mcq',
            question: 'Why is the `with` statement preferred when opening files?',
            options: [
              'It automatically caches file contents in RAM',
              'It guarantees the file is closed even if an exception occurs',
              'It accelerates hard drive read speeds',
              'It automatically encrypts the file'
            ],
            correctIndex: 1,
            explanation: 'The with statement implements the context manager protocol, ensuring `__exit__` and `file.close()` are called unconditionally.'
          }
        ],
        relatedTopics: ['py-exceptions-ch15', 'py-decorators-ch19']
      }
    ]
  },

  // CHAPTER 15 — EXCEPTION HANDLING
  {
    id: 'py-ch15',
    number: 15,
    title: 'Exception Handling',
    description: 'try-except blocks, multiple exceptions, else/finally clauses, and custom exceptions',
    topics: [
      {
        id: 'py-exceptions-ch15',
        subjectId: 'python',
        chapterId: 'py-ch15',
        chapterNumber: 15,
        pageNumber: 20,
        title: 'Exceptions: try, except, else, finally & Custom Errors',
        difficulty: 'intermediate',
        definition: 'Exceptions are runtime error objects. The `try-except-else-finally` suite allows programs to intercept, handle, and recover gracefully from failures.',
        whyItMatters: 'Python follows the EAFP philosophy: "Easier to Ask for Forgiveness than Permission". Exception handling is standard idiom, not an antipattern.',
        syntax: 'try:\n    risky_operation()\nexcept SpecificError as e:\n    handle(e)\nelse:\n    # Runs if NO error\nfinally:\n    # ALWAYS runs',
        explanation: [
          '`try`: Wraps block that might raise an exception.',
          '`except SpecificError as err`: Catches specified exception class and subclasses.',
          '`else`: Executes ONLY if the try block succeeded without raising any exception.',
          '`finally`: Guaranteed to execute regardless of whether an exception occurred, was caught, or was re-raised.',
          'Custom Exceptions: Inherit from built-in `Exception` class: `class DomainError(Exception): pass`.'
        ],
        example: {
          language: 'python',
          code: `class InsufficientFundsError(Exception):
    """Raised when account balance is too low."""
    pass

def withdraw(balance: float, amount: float) -> float:
    if amount <= 0:
        raise ValueError("Withdrawal amount must be positive.")
    if amount > balance:
        raise InsufficientFundsError(f"Cannot withdraw USD {amount}; balance is USD {balance}")
    return balance - amount

try:
    current_balance = 100.0
    new_balance = withdraw(current_balance, 150.0)
except InsufficientFundsError as err:
    print(f"Handled Custom Exception: {err}")
finally:
    print("Audit log recorded (finally block executed).")`,
          output: 'Handled Custom Exception: Cannot withdraw $150.0; balance is $100.0\nAudit log recorded (finally block executed).',
          annotations: [
            { line: 1, label: 'Custom domain exception subclass', type: 'blue' },
            { line: 8, label: 'raise statement interrupts flow', type: 'red' },
            { line: 17, label: 'finally always executes for cleanup', type: 'green' }
          ]
        },
        important: 'NEVER write bare `except:`. It intercepts `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, making programs impossible to terminate normally. Always catch `except Exception:` or specific errors.',
        commonMistakes: [
          'Using broad `except Exception:` and passing silently with `pass`, hiding syntax and name errors.',
          'Catching `BaseException` directly.'
        ],
        tip: 'Use the `else` clause in try blocks: keep the `try` block minimal with only the code that can raise the error, putting post-success logic in `else`.',
        interviewNote: 'Question: "What is EAFP vs LBYL in Python?" Answer: "LBYL is \'Look Before You Leap\' (checking conditions first). EAFP is \'Easier to Ask for Forgiveness than Permission\' (attempting operation in try/except), which is faster and prevents race conditions."',
        practiceQuestions: [
          {
            id: 'q-py15-1',
            type: 'mcq',
            question: 'When does the `else` clause of a `try...except...else...finally` block execute?',
            options: [
              'When an uncaught exception is raised',
              'Only when the try block completes WITHOUT raising an exception',
              'Before the try block starts',
              'Only if finally fails'
            ],
            correctIndex: 1,
            explanation: 'The `else` clause runs if and only if the `try` block executed successfully without any exceptions.'
          }
        ],
        relatedTopics: ['py-file-handling-ch14', 'py-oop-ch16']
      }
    ]
  },

  // CHAPTER 16 — OBJECT-ORIENTED PROGRAMMING
  {
    id: 'py-ch16',
    number: 16,
    title: 'Object-Oriented Programming',
    description: 'Classes, instances, __init__, self, inheritance, super(), encapsulation, and dunder methods',
    topics: [
      {
        id: 'py-oop-ch16',
        subjectId: 'python',
        chapterId: 'py-ch16',
        chapterNumber: 16,
        pageNumber: 21,
        title: 'Classes, __init__, Inheritance & Dunder Methods',
        difficulty: 'intermediate',
        definition: 'OOP in Python models systems using classes as blueprints. Special "dunder" methods (`__str__`, `__repr__`, `__len__`) customize object behavior with standard operators.',
        whyItMatters: 'Mastering OOP allows developers to design reusable architectures, implement domain models, and integrate cleanly with Python\'s data model protocols.',
        syntax: 'class Dog(Animal):\n    def __init__(self, name):\n        super().__init__()\n        self.name = name',
        explanation: [
          '`__init__(self, ...)`: Instance initializer called immediately after a new object is allocated by `__new__`.',
          '`self`: Explicit reference to the current instance passed automatically as the first parameter to instance methods.',
          'Class Attributes vs Instance Attributes: Class attributes are shared across all instances; instance attributes belong to `self`.',
          'Inheritance & `super()`: Subclasses inherit parent methods. `super()` invokes parent class implementations according to the MRO (Method Resolution Order).',
          'Magic Methods: `__str__` (user readable), `__repr__` (unambiguous developer representation), `__eq__` (`==`), `__len__` (`len()`).'
        ],
        example: {
          language: 'python',
          code: `class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    # Operator Overloading for + operator
    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    # Developer inspection string
    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"

    # User friendly string representation
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

v1 = Vector(2, 4)
v2 = Vector(3, 1)
v3 = v1 + v2  # Calls v1.__add__(v2)
print("Vector Addition:", v3)`,
          output: 'Vector Addition: (5, 5)',
          annotations: [
            { line: 2, label: '__init__ instance initializer', type: 'blue' },
            { line: 7, label: '__add__ enables native + operator', type: 'yellow' },
            { line: 19, label: 'v1 + v2 translates cleanly to __add__', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Python Class Inheritance & Method Resolution Order',
          subtitle: 'C3 Linearization Algorithm resolves method lookup',
          elements: [
            { id: '1', label: 'object', sublabel: 'Root of all Python classes', value: 'Base', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Animal', sublabel: 'Parent class', value: 'def speak()', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Dog', sublabel: 'Subclass', value: 'super().speak()', status: 'active' }
          ]
        },
        important: 'In Python, all classes implicitly inherit from `object`. Private attributes are conventionally prefixed with a single underscore `_var` (protected) or double `__var` (name mangling).',
        commonMistakes: [
          'Forgetting `self` as the first parameter of instance methods: `def speak():` will fail with `TypeError: speak() takes 0 positional arguments but 1 was given`.',
          'Accidentally mutating a mutable class attribute shared across all instances.'
        ],
        tip: 'Use `@classmethod` for alternative constructors (like `from_json()`) and `@staticmethod` for utility functions that don\'t access instance or class state.',
        interviewNote: 'Question: "What is the difference between __str__ and __repr__?" Answer: "`__repr__` is intended for developers (should look like valid Python code to recreate the object if possible); `__str__` is intended for end-user readability."',
        practiceQuestions: [
          {
            id: 'q-py16-1',
            type: 'output',
            question: 'What dunder method is called when `len(my_object)` is executed?',
            options: ['__size__', '__count__', '__len__', '__length__'],
            correctIndex: 2,
            explanation: 'The built-in len() function delegates directly to the object\'s `__len__()` magic method.'
          }
        ],
        relatedTopics: ['py-iterators-generators', 'py-exceptions-ch15']
      }
    ]
  },

  // CHAPTER 17 — ITERATORS & GENERATORS
  {
    id: 'py-ch17',
    number: 17,
    title: 'Iterators & Generators',
    description: 'Iteration protocol, __iter__/__next__, yield keyword, generator expressions, and lazy evaluation',
    topics: [
      {
        id: 'py-iterators-generators',
        subjectId: 'python',
        chapterId: 'py-ch17',
        chapterNumber: 17,
        pageNumber: 22,
        title: 'Generators, yield & The Iteration Protocol',
        difficulty: 'advanced',
        definition: 'Generators are functions that produce items lazily on demand using the `yield` keyword. They maintain internal state between iterations with minimal RAM.',
        whyItMatters: 'Generators enable processing massive gigabyte datasets, infinite data streams, and event logs with constant O(1) memory overhead.',
        syntax: 'def my_generator():\n    yield value',
        explanation: [
          'Iterator Protocol: An iterable implements `__iter__()`. An iterator implements both `__iter__()` and `__next__()` (raising `StopIteration` when exhausted).',
          '`yield` vs `return`: `return` terminates the function; `yield` freezes execution and yields a value, resuming from that exact instruction on the next call.',
          'Lazy Evaluation: Items are calculated only when requested, saving both CPU cycles and memory.',
          'Generator Expressions: `(x ** 2 for x in huge_range)` creates a generator object with parentheses.'
        ],
        example: {
          language: 'python',
          code: `# Generator producing Fibonacci numbers on demand
def fibonacci(limit: int):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a  # Pauses execution and yields current number
        a, b = b, a + b
        count += 1

# Consuming generator via for-loop (calls next() under the hood)
fib_gen = fibonacci(8)
print("Fibonacci Sequence:", list(fib_gen))

# Generator expression (O(1) memory)
gen_squares = (n ** 2 for n in range(1_000_000))
print("First square:", next(gen_squares))
print("Second square:", next(gen_squares))`,
          output: 'Fibonacci Sequence: [0, 1, 1, 2, 3, 5, 8, 13]\nFirst square: 0\nSecond square: 1',
          annotations: [
            { line: 6, label: 'yield preserves stack frame state', type: 'yellow' },
            { line: 16, label: 'Generator expression consumes O(1) memory', type: 'green' }
          ]
        },
        important: 'Generators are one-time-use iterators. Once exhausted, calling `next()` raises `StopIteration` and iterating again yields zero items.',
        commonMistakes: [
          'Converting a generator immediately with `list(gen)` when memory was the primary constraint, negating the memory advantage.'
        ],
        tip: 'Pass generator expressions directly inside functions without double parentheses: `total = sum(x ** 2 for x in items)`.',
        interviewNote: 'Question: "What is the memory difference between `[x for x in range(10**7)]` and `(x for x in range(10**7))`?" Answer: "The list comprehension allocates ~80MB of RAM immediately. The generator expression allocates ~100 bytes and computes values lazily on demand."',
        practiceQuestions: [
          {
            id: 'q-py17-1',
            type: 'mcq',
            question: 'What exception is raised to signal the end of iteration in the Python iterator protocol?',
            options: ['IndexError', 'StopIteration', 'EndOfLoopError', 'GeneratorExit'],
            correctIndex: 1,
            explanation: 'The iterator protocol specifies that `__next__()` must raise `StopIteration` once there are no further elements to produce.'
          }
        ],
        relatedTopics: ['py-comprehensions-ch18', 'py-decorators-ch19']
      }
    ]
  },

  // CHAPTER 18 — COMPREHENSIONS & FUNCTIONAL PYTHON
  {
    id: 'py-ch18',
    number: 18,
    title: 'Comprehensions & Functional Python',
    description: 'Nested comprehensions, map(), filter(), functools.reduce(), zip(), and enumerate()',
    topics: [
      {
        id: 'py-comprehensions-ch18',
        subjectId: 'python',
        chapterId: 'py-ch18',
        chapterNumber: 18,
        pageNumber: 23,
        title: 'Advanced Comprehensions, map(), filter() & zip()',
        difficulty: 'intermediate',
        definition: 'Functional tools like `map`, `filter`, and `zip` alongside nested comprehensions transform collections declaratively.',
        whyItMatters: 'Comprehensions and functional built-ins replace verbose boilerplate loops with concise, declarative, C-optimized data transformation pipelines.',
        syntax: 'mapped = list(map(func, iterable))\npairs = list(zip(list1, list2))',
        explanation: [
          '`zip(*iterables)`: Pairs elements from multiple iterables up to the shortest length. Use `itertools.zip_longest` to pad.',
          '`enumerate(iterable, start=0)`: Yields `(index, item)` tuples cleanly.',
          '`map(func, iter)` & `filter(pred, iter)`: Return lazy iterators. Comprehensions are generally preferred for readability.',
          '`functools.reduce(func, iter)`: Successively applies a two-argument function to accumulate elements into a single value.'
        ],
        example: {
          language: 'python',
          code: `import functools

# Combining multiple parallel lists with zip
names = ["Alice", "Bob", "Charlie"]
scores = [92, 88, 95]
roster = {name: score for name, score in zip(names, scores)}
print("Zipped Roster:", roster)

# Filtering with list comprehension
high_achievers = [name for name, score in roster.items() if score >= 90]
print("High Achievers (>=90):", high_achievers)

# Cumulative product using functools.reduce
nums = [1, 2, 3, 4, 5]
product = functools.reduce(lambda acc, x: acc * x, nums)
print("Product of nums:", product)`,
          output: 'Zipped Roster: {\'Alice\': 92, \'Bob\': 88, \'Charlie\': 95}\nHigh Achievers (>=90): [\'Alice\', \'Charlie\']\nProduct of nums: 120',
          annotations: [
            { line: 6, label: 'zip pairs parallel sequences into dict', type: 'blue' },
            { line: 15, label: 'reduce aggregates elements sequentially', type: 'yellow' }
          ]
        },
        important: 'In Python 3, `map()` and `filter()` return lazy iterators, not lists. You must iterate over them or wrap them in `list()` to inspect values.',
        commonMistakes: [
          'Writing overly complex nested comprehensions with 3+ loops and conditions. If a comprehension spans more than 2 lines, write a standard for-loop for readability.'
        ],
        tip: 'Use `any(predicate(x) for x in items)` and `all(predicate(x) for x in items)` for elegant, short-circuiting boolean checks across sequences.',
        interviewNote: 'Question: "What does zip() do if the input iterables have unequal lengths?" Answer: "Standard `zip()` truncates to the length of the shortest iterable. To preserve all elements, use `itertools.zip_longest()` with a fillvalue."',
        practiceQuestions: [
          {
            id: 'q-py18-1',
            type: 'output',
            question: 'What is the output of `list(zip([1, 2], ["a", "b", "c"]))`?',
            options: ['[(1, "a"), (2, "b"), (None, "c")]', '[(1, "a"), (2, "b")]', '[(1, "a"), (2, "b"), (2, "c")]', 'ValueError'],
            correctIndex: 1,
            explanation: 'zip() stops when the shortest iterable ([1, 2]) is exhausted, yielding only two pairs.'
          }
        ],
        relatedTopics: ['py-lists-ch8', 'py-iterators-generators']
      }
    ]
  },

  // CHAPTER 19 — DECORATORS & CONTEXT MANAGERS
  {
    id: 'py-ch19',
    number: 19,
    title: 'Decorators & Context Managers',
    description: 'First-class closures, @decorator syntax, functools.wraps, and contextlib',
    topics: [
      {
        id: 'py-decorators-ch19',
        subjectId: 'python',
        chapterId: 'py-ch19',
        chapterNumber: 19,
        pageNumber: 24,
        title: 'Decorators: Closures, @wraps & Timing Execution',
        difficulty: 'advanced',
        definition: 'A decorator is a callable that takes a function as an argument and returns an augmented wrapper function, syntactically applied via `@decorator`.',
        whyItMatters: 'Decorators allow cross-cutting concerns (logging, timing, authentication, caching, rate limiting) to be cleanly decoupled from core business logic.',
        syntax: '@decorator\ndef my_func():\n    pass',
        explanation: [
          'Closures: Inner functions retain access to variables from their enclosing lexical scope even after the outer function has returned.',
          'Syntactic Sugar: `@timer` placed above `def work():` is identical to `work = timer(work)`.',
          '`functools.wraps(func)`: Preserves original function metadata (`__name__`, `__doc__`, annotations) on the wrapper.',
          'Decorator with Arguments: Requires an additional outer factory function layer returning the actual decorator.'
        ],
        example: {
          language: 'python',
          code: `import functools
import time

def timing_decorator(func):
    """Decorator measuring function execution latency."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start_time
        print(f"[{func.__name__}] Execution took {elapsed * 1000:.3f} ms")
        return result
    return wrapper

@timing_decorator
def compute_sum(n: int) -> int:
    """Calculates sum of first n integers."""
    return sum(range(n))

val = compute_sum(500_000)
print("Function metadata preserved:", compute_sum.__name__)`,
          output: '[compute_sum] Execution took 12.450 ms\nFunction metadata preserved: compute_sum',
          annotations: [
            { line: 6, label: '@functools.wraps preserves function name and docstrings', type: 'blue' },
            { line: 15, label: '@timing_decorator syntactically wraps compute_sum', type: 'yellow' }
          ]
        },
        important: 'Always decorate the inner wrapper with `@functools.wraps(func)`. Without it, your decorated function\'s name becomes `"wrapper"` and its docstring is erased.',
        commonMistakes: [
          'Forgetting to return the result of `func(*args, **kwargs)` from inside the wrapper, causing the decorated function to silently return `None`.'
        ],
        tip: 'Use standard library `@functools.lru_cache(maxsize=128)` to automatically memoize expensive pure function results.',
        interviewNote: 'Question: "In what order are stacked decorators executed?" Answer: "Decorators are applied from bottom to top (inside out) at definition time: `@dec1 @dec2 def f():` evaluates as `f = dec1(dec2(f))`."',
        practiceQuestions: [
          {
            id: 'q-py19-1',
            type: 'mcq',
            question: 'Why should `@functools.wraps(func)` be used inside custom decorator wrappers?',
            options: [
              'To speed up CPU execution',
              'To preserve original function metadata like __name__ and __doc__',
              'To convert functions into generator coroutines',
              'To prevent infinite recursion'
            ],
            correctIndex: 1,
            explanation: 'functools.wraps copies the original function\'s name, docstring, module, and annotations to the wrapper function.'
          }
        ],
        relatedTopics: ['py-functions-ch12', 'py-oop-ch16']
      }
    ]
  },

  // CHAPTER 20 — REGULAR EXPRESSIONS
  {
    id: 'py-ch20',
    number: 20,
    title: 'Regular Expressions',
    description: 'The re module, pattern matching, search vs match, findall, sub, and capturing groups',
    topics: [
      {
        id: 'py-regex-ch20',
        subjectId: 'python',
        chapterId: 'py-ch20',
        chapterNumber: 20,
        pageNumber: 25,
        title: 'Regular Expressions: Pattern Extraction & Sanitization',
        difficulty: 'intermediate',
        definition: 'The standard library `re` module provides regular expression pattern matching for text validation, search, extraction, and substitution.',
        whyItMatters: 'Regex enables robust validation of emails, URLs, dates, phone numbers, and automated parsing of unstructured server log files.',
        syntax: 'import re\nmatch = re.search(r"pattern", text)',
        explanation: [
          'Raw Strings `r"..."`: Always use raw strings for regex patterns to prevent Python from interpreting backslashes like `\\n` or `\\t`.',
          '`re.search()`: Searches anywhere in the string; `re.match()` matches strictly from the beginning.',
          '`re.findall()`: Returns all non-overlapping matches as a list of strings or tuples.',
          '`re.sub(pattern, repl, string)`: Replaces occurrences matching pattern with replacement text.'
        ],
        example: {
          language: 'python',
          code: `import re

log_line = "2026-10-01 14:32:10 [ERROR] Connection timed out for user_id=4821"

# Pattern extracting timestamp, level, and message using named groups
pattern = r"(?P<date>\\d{4}-\\d{2}-\\d{2})\\s+(?P<time>[\\d:]+)\\s+\\[(?P<level>\\w+)\\]\\s+(?P<msg>.*)"

match = re.search(pattern, log_line)
if match:
    data = match.groupdict()
    print("Extracted Log Details:")
    for k, v in data.items():
        print(f"  {k}: {v}")

# Sanitizing text with re.sub
sanitized = re.sub(r"\\d+", "[REDACTED_NUM]", "User 4821 transferred $500")
print("Sanitized:", sanitized)`,
          output: 'Extracted Log Details:\n  date: 2026-10-01\n  time: 14:32:10\n  level: ERROR\n  msg: Connection timed out for user_id=4821\nSanitized: User [REDACTED_NUM] transferred $[REDACTED_NUM]',
          annotations: [
            { line: 6, label: 'Named capturing groups (?P<name>...)', type: 'blue' },
            { line: 9, label: 'groupdict() returns parsed dictionary', type: 'yellow' },
            { line: 16, label: 're.sub replaces matched patterns', type: 'green' }
          ]
        },
        important: 'Always compile repeated regex patterns with `pattern = re.compile(r"...")` to avoid recompiling the regex DFA state machine on every loop iteration.',
        commonMistakes: [
          'Using `re.match()` when expecting to find patterns anywhere in the string. `re.match()` is anchored strictly to the beginning of the text.'
        ],
        tip: 'Use verbose regex `re.compile(r"""...""", re.VERBOSE)` to write multi-line regular expressions with internal comments explaining complex patterns.',
        interviewNote: 'Question: "What is the difference between greedy and non-greedy quantifiers in Python regex?" Answer: "Greedy (`.*`) matches as much text as possible. Non-greedy (`.*?`) matches as little as necessary to satisfy the pattern."',
        practiceQuestions: [
          {
            id: 'q-py20-1',
            type: 'output',
            question: 'What does `re.findall(r"\\d+", "Order 42 has 3 items")` return?',
            options: ['["42", "3"]', '["42"]', '[42, 3]', 'None'],
            correctIndex: 0,
            explanation: 're.findall searches the entire string and returns all matched numeric string substrings as a list of strings: ["42", "3"].'
          }
        ],
        relatedTopics: ['py-strings-ch7', 'py-data-processing-ch21']
      }
    ]
  }
];
