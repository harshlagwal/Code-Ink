import { FinalAssessment } from '../types/notebook';

export const PYTHON_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'python',
  title: 'Python Programming Comprehensive Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Foundations, Types & Core Syntax',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'py-a1',
          section: 'A',
          marks: 1,
          topic: 'Execution Model',
          question: 'What intermediate format does the CPython compiler generate from source code (.py) before execution on the PVM?',
          options: ['Native x86 Assembly (.s)', 'CPython Bytecode (.pyc)', 'C header file (.h)', 'LLVM Bitcode'],
          correctIndex: 1,
          explanation: 'CPython compiles Python source code into platform-independent bytecode (.pyc), which is then evaluated by the Python Virtual Machine (PVM).'
        },
        {
          id: 'py-a2',
          section: 'A',
          marks: 1,
          topic: 'Identity vs Equality',
          question: 'Which operator evaluates to True if and only if two variables reference the exact same memory address on the heap?',
          options: ['==', '===', 'is', 'in'],
          correctIndex: 2,
          explanation: 'The `is` operator tests object identity (`id(a) == id(b)`), whereas `==` evaluates equality of object values via `__eq__`.'
        },
        {
          id: 'py-a3',
          section: 'A',
          marks: 1,
          topic: 'Mutability',
          question: 'Which of the following built-in collection types is mutable in Python?',
          options: ['tuple', 'frozenset', 'str', 'bytearray'],
          correctIndex: 3,
          explanation: '`bytearray` is a mutable sequence of bytes; `bytes`, `str`, `tuple`, and `frozenset` are strictly immutable.'
        },
        {
          id: 'py-a4',
          section: 'A',
          marks: 1,
          topic: 'Division Operator',
          question: 'In Python 3, what is the evaluated result of `-7 // 2`?',
          options: ['-3', '-4', '-3.5', '3'],
          correctIndex: 1,
          explanation: 'Floor division `//` in Python rounds down towards negative infinity: -3.5 rounded down is -4.'
        },
        {
          id: 'py-a5',
          section: 'A',
          marks: 1,
          topic: 'Tuple Syntax',
          question: 'What is the runtime type of `x = (42)` versus `y = (42,)`?',
          options: ['Both are tuple', 'x is int, y is tuple', 'Both are int', 'SyntaxError'],
          correctIndex: 1,
          explanation: 'Parentheses alone without a trailing comma denote arithmetic grouping; `(42,)` with a comma defines a 1-element tuple.'
        },
        {
          id: 'py-a6',
          section: 'A',
          marks: 1,
          topic: 'Dictionary Lookups',
          question: 'What happens when accessing a non-existent key using `d["missing"]` versus `d.get("missing", 0)`?',
          options: [
            'Both return None',
            'Both raise KeyError',
            '`d["missing"]` raises KeyError; `d.get(...)` returns 0',
            '`d.get(...)` raises IndexError'
          ],
          correctIndex: 2,
          explanation: 'Direct indexing raises a `KeyError` if the key is absent, while `.get(key, default)` returns the provided default value safely.'
        },
        {
          id: 'py-a7',
          section: 'A',
          marks: 1,
          topic: 'String Slicing',
          question: 'What is the evaluated output of `"CODEINK"[::-1]`?',
          options: ['"CODEINK"', '"KNIEDOC"', '"KNIEDO"', '"KNICODE"'],
          correctIndex: 1,
          explanation: 'A slice with step `-1` reverses the sequence, producing "KNIEDOC".'
        },
        {
          id: 'py-a8',
          section: 'A',
          marks: 1,
          topic: 'Set Creation',
          question: 'What is the type of the variable created by `data = {}` in Python?',
          options: ['set', 'dict', 'tuple', 'list'],
          correctIndex: 1,
          explanation: 'Empty braces `{}` create an empty dictionary. An empty set must be instantiated using `set()`.'
        },
        {
          id: 'py-a9',
          section: 'A',
          marks: 1,
          topic: 'Scope Resolution',
          question: 'What rule dictates the sequential lookup order of variable names in Python functions?',
          options: ['FIFO rule', 'LBYL rule', 'LEGB rule (Local, Enclosing, Global, Built-in)', 'ACID rule'],
          correctIndex: 2,
          explanation: 'Python resolves identifiers using the LEGB rule: Local first, then Enclosing closures, then Global module scope, and finally Built-in namespace.'
        },
        {
          id: 'py-a10',
          section: 'A',
          marks: 1,
          topic: 'Function Arguments',
          question: 'What data structure collects extra positional arguments into `*args`?',
          options: ['list', 'dict', 'tuple', 'set'],
          correctIndex: 2,
          explanation: '`*args` packs variable positional arguments into an immutable `tuple`; `**kwargs` packs keyword arguments into a `dict`.'
        }
      ]
    },

    sectionB: {
      title: 'Section B: Intermediate Logic, OOP, Comprehensions & Decorators',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'py-b1',
          section: 'B',
          marks: 1,
          topic: 'Mutable Default Arguments',
          question: 'Analyze the following function and predict its printed output:\n\ndef append_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(append_item(1))\nprint(append_item(2))',
          options: [
            '[1] then [2]',
            '[1] then [1, 2]',
            '[1] then []',
            'TypeError: items is not defined'
          ],
          correctIndex: 1,
          explanation: 'Default arguments are evaluated once at function definition time. The list `items` is shared across all invocations, so appending 2 preserves the previous 1, outputting `[1, 2]`.'
        },
        {
          id: 'py-b2',
          section: 'B',
          marks: 1,
          topic: 'List Comprehensions & Filtering',
          question: 'What is the evaluated output of:\n`[x ** 2 for x in range(6) if x % 2 != 0]`?',
          options: [
            '[0, 4, 16]',
            '[1, 9, 25]',
            '[1, 4, 9, 16, 25]',
            '[2, 6, 10]'
          ],
          correctIndex: 1,
          explanation: 'Range(6) contains 0, 1, 2, 3, 4, 5. Odd numbers are 1, 3, 5. Their squares are 1, 9, 25.'
        },
        {
          id: 'py-b3',
          section: 'B',
          marks: 1,
          topic: 'Shallow vs Deep Copy',
          question: 'What is printed by the following code snippet?\n\nimport copy\na = [[10, 20]]\nb = a.copy()\nb[0].append(30)\nprint(len(a[0]))',
          options: ['2', '3', '1', 'IndexError'],
          correctIndex: 1,
          explanation: '`a.copy()` performs a shallow copy. The outer lists are distinct, but both point to the same inner list `[10, 20]`. Mutating `b[0]` mutates `a[0]`, resulting in length 3.'
        },
        {
          id: 'py-b4',
          section: 'B',
          marks: 1,
          topic: 'Generators and yield',
          question: 'What does the `yield` statement do when encountered in a function?',
          options: [
            'Terminates the function and deletes local variables',
            'Freezes function execution and returns a value to the caller, resuming on next()',
            'Spawns a new operating system thread',
            'Restarts the function from the beginning'
          ],
          correctIndex: 1,
          explanation: '`yield` turns a function into a generator. It yields a value and suspends execution, preserving the stack frame and local state until the caller invokes `next()`.'
        },
        {
          id: 'py-b5',
          section: 'B',
          marks: 1,
          topic: 'OOP and super()',
          question: 'What is the purpose of `super().__init__()` inside a subclass constructor?',
          options: [
            'Deletes parent class attributes',
            'Invokes the parent class constructor according to the Method Resolution Order (MRO)',
            'Prevents other classes from inheriting from the subclass',
            'Allocates heap memory for C extensions'
          ],
          correctIndex: 1,
          explanation: '`super()` delegates method calls to parent or sibling classes in the hierarchy following Python\'s C3 Linearization MRO algorithm.'
        },
        {
          id: 'py-b6',
          section: 'B',
          marks: 1,
          topic: 'Decorators and @wraps',
          question: 'Why should `@functools.wraps(func)` decorate the inner wrapper of a custom decorator?',
          options: [
            'To accelerate runtime bytecode interpretation',
            'To preserve the original function metadata (__name__, __doc__, annotations)',
            'To convert the function into a class method',
            'To enable multiprocessing execution'
          ],
          correctIndex: 1,
          explanation: 'Without `@functools.wraps`, decorated functions lose their identity, reporting their `__name__` as `"wrapper"` and wiping their docstrings.'
        },
        {
          id: 'py-b7',
          section: 'B',
          marks: 1,
          topic: 'Loop else Execution',
          question: 'What is the output of the following loop?\n\nfor x in range(3):\n    if x == 9:\n        break\nelse:\n    print("Success")',
          options: [
            'Prints nothing',
            'Prints "Success"',
            'Prints 0 1 2 Success',
            'SyntaxError: else cannot follow for'
          ],
          correctIndex: 1,
          explanation: 'The loop finishes normally without hitting `break` (since x is never 9). The loop `else` block executes, printing "Success".'
        },
        {
          id: 'py-b8',
          section: 'B',
          marks: 1,
          topic: 'Context Manager Protocol',
          question: 'Which two dunder methods must an object implement to support the `with` statement protocol?',
          options: [
            '__open__ and __close__',
            '__start__ and __stop__',
            '__enter__ and __exit__',
            '__init__ and __del__'
          ],
          correctIndex: 2,
          explanation: 'The context manager protocol requires `__enter__()` (setup) and `__exit__()` (teardown/cleanup).'
        },
        {
          id: 'py-b9',
          section: 'B',
          marks: 1,
          topic: 'Exceptions try-except-else',
          question: 'In Python exception handling, when is the `else` block executed?',
          options: [
            'Whenever an exception is caught',
            'Only when the try block executes without raising any exception',
            'Only if the finally block fails',
            'Before the try block starts'
          ],
          correctIndex: 1,
          explanation: 'In `try...except...else`, the `else` clause executes only if the code in the `try` block completed without raising any exception.'
        },
        {
          id: 'py-b10',
          section: 'B',
          marks: 1,
          topic: 'Late Binding in Closures',
          question: 'Predict the output of the following list of lambda closures:\n\nfuncs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])',
          options: [
            '[0, 1, 2]',
            '[2, 2, 2]',
            '[3, 3, 3]',
            'TypeError'
          ],
          correctIndex: 1,
          explanation: 'Python closures bind variables by reference late (at call time). When the lambdas are called, the loop has completed and `i` is 2, so all return 2.'
        }
      ]
    },

    sectionC: {
      title: 'Section C: Systems Architecture, Concurrency, Internals & Design',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'py-c1',
          section: 'C',
          marks: 1,
          topic: 'Global Interpreter Lock (GIL)',
          question: 'Which statement accurately describes the Global Interpreter Lock (GIL) in CPython and its architectural consequence?',
          options: [
            'It prevents multiple processes from accessing the hard drive concurrently.',
            'It is a mutex ensuring only one native thread executes Python bytecode at a time, making multithreading ineffective for CPU-bound parallelism.',
            'It is a security sandbox preventing network calls.',
            'It forces all Python variables to be allocated on the call stack.'
          ],
          correctIndex: 1,
          explanation: 'The GIL prevents thread race conditions in CPython\'s non-thread-safe reference counting memory management. For CPU-bound parallel speedups, `multiprocessing` must be used to bypass the GIL.'
        },
        {
          id: 'py-c2',
          section: 'C',
          marks: 1,
          topic: 'Asyncio Event Loop',
          question: 'What happens if a developer calls a blocking synchronous function like `time.sleep(5)` inside an `async def` coroutine?',
          options: [
            'Asyncio automatically converts it to a background thread',
            'It blocks the entire single-threaded event loop, freezing all other concurrent coroutines for 5 seconds',
            'It raises an AsyncBlockingError exception',
            'It terminates the Python process'
          ],
          correctIndex: 1,
          explanation: 'Asyncio uses cooperative multitasking on a single thread. Calling blocking synchronous code starves the event loop, preventing any other tasks or socket handlers from running.'
        },
        {
          id: 'py-c3',
          section: 'C',
          marks: 1,
          topic: 'Memory Management & Garbage Collection',
          question: 'How does CPython handle memory reclamation for objects with circular references (e.g., A references B, and B references A)?',
          options: [
            'Immediate deallocation via reference counting when out of scope',
            'Through a generational cyclic garbage collector (gc module) that periodically detects isolated unreachable reference cycles',
            'By writing them to virtual disk swap space',
            'Circular references are illegal and cause compile-time errors'
          ],
          correctIndex: 1,
          explanation: 'While standard objects are deallocated immediately when their reference count hits 0, cyclic references maintain non-zero counts. CPython\'s cyclic generational garbage collector detects and reclaims these unreachable subgraphs.'
        },
        {
          id: 'py-c4',
          section: 'C',
          marks: 1,
          topic: 'Database Parameterization',
          question: 'Why must SQL queries in sqlite3 or PostgreSQL use parameterized placeholders (`?` or `%s`) rather than f-strings?',
          options: [
            'f-strings do not support string interpolation inside functions',
            'Parameterized queries separate SQL structure from data literals, preventing SQL Injection vulnerabilities',
            'Databases only accept uppercase strings',
            'f-strings consume 10x more RAM'
          ],
          correctIndex: 1,
          explanation: 'Parameterized queries compile the query template in advance and bind user inputs strictly as literal values, completely neutralizing SQL injection attacks.'
        },
        {
          id: 'py-c5',
          section: 'C',
          marks: 1,
          topic: 'Generator Memory Efficiency',
          question: 'Compare the memory footprint of `sum([x for x in range(10**7)])` versus `sum(x for x in range(10**7))`:',
          options: [
            'Both allocate identical memory (~80 MB)',
            'The list comprehension allocates ~80 MB of RAM upfront; the generator expression allocates ~100 bytes using O(1) lazy evaluation',
            'The generator expression consumes more memory due to stack frames',
            'The generator expression causes MemoryError'
          ],
          correctIndex: 1,
          explanation: 'The list comprehension materializes all 10 million integers in heap memory simultaneously. The generator expression calculates each item on demand in O(1) constant auxiliary space.'
        },
        {
          id: 'py-c6',
          section: 'C',
          marks: 1,
          topic: 'Dunder Methods & Operator Overloading',
          question: 'To allow an instance of a custom `Matrix` class to support the matrix multiplication operator `@` (`m1 @ m2`), which magic method must be implemented?',
          options: ['__mul__', '__matmul__', '__matrix__', '__dot__'],
          correctIndex: 1,
          explanation: 'PEP 465 introduced the `@` binary operator for matrix multiplication, which invokes the `__matmul__()` magic method.'
        },
        {
          id: 'py-c7',
          section: 'C',
          marks: 1,
          topic: 'Method Resolution Order (MRO)',
          question: 'In complex multiple inheritance scenarios, which algorithm does Python 3 use to compute the linear Method Resolution Order?',
          options: [
            'Depth-First Search (DFS)',
            'C3 Linearization algorithm',
            'Dijkstra\'s shortest path algorithm',
            'Breadth-First Search (BFS)'
          ],
          correctIndex: 1,
          explanation: 'Python uses the C3 Linearization algorithm to produce a monotonic, consistent MRO that respects local precedence ordering and avoids inheritance anomalies.'
        },
        {
          id: 'py-c8',
          section: 'C',
          marks: 1,
          topic: '@dataclass Immutability',
          question: 'How do you configure a Python `@dataclass` to be strictly immutable and hashable (usable as a dict key or set member)?',
          options: [
            '@dataclass(immutable=True)',
            '@dataclass(frozen=True)',
            '@dataclass(const=True)',
            '@dataclass(hash=True)'
          ],
          correctIndex: 1,
          explanation: 'Passing `frozen=True` generates `__setattr__` and `__delattr__` that raise `FrozenInstanceError` on modification, and automatically implements `__hash__()`.'
        },
        {
          id: 'py-c9',
          section: 'C',
          marks: 1,
          topic: 'Packaging & __name__',
          question: 'In a production Python CLI project, what is the role of `if __name__ == "__main__":`?',
          options: [
            'Ensures the code compiles to a native C binary',
            'Allows the file to be imported as a library module without executing top-level script commands',
            'Forces the script to run with administrator root privileges',
            'Encrypts the bytecode before distribution'
          ],
          correctIndex: 1,
          explanation: 'It inspects `__name__`. If run directly, `__name__` is `"__main__"`; if imported by another file or test suite, the code block is safely skipped.'
        },
        {
          id: 'py-c10',
          section: 'C',
          marks: 1,
          topic: '12-Factor App & Configuration',
          question: 'According to modern 12-factor cloud standards, where should production database credentials and API secrets be stored?',
          options: [
            'Hardcoded as constant variables at the top of settings.py',
            'Injected as Operating System Environment Variables and read via os.environ',
            'Committed to public Git repositories inside config.json',
            'Written inside HTML template tags'
          ],
          correctIndex: 1,
          explanation: '12-factor application architecture mandates strict separation of config from code: credentials and environment-specific settings must be injected via OS environment variables.'
        }
      ]
    }
  }
};
