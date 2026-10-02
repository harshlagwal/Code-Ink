import { Chapter } from '../types/notebook';

export const PYTHON_CHAPTERS_PART1: Chapter[] = [
  // CHAPTER 01 — PYTHON FOUNDATIONS
  {
    id: 'py-ch01',
    number: 1,
    title: 'Python Foundations',
    description: 'Origins, execution architecture, syntax philosophy, and running your first program',
    topics: [
      {
        id: 'py-what-is-python',
        subjectId: 'python',
        chapterId: 'py-ch01',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'What is Python? Architecture & Philosophy',
        difficulty: 'beginner',
        definition: 'Python is a high-level, interpreted, general-purpose programming language emphasizing code readability with significant indentation and dynamic typing.',
        whyItMatters: 'Python powers modern data science, machine learning, web backend systems, cloud automation, and scientific computing due to its expressive syntax and vast ecosystem.',
        syntax: 'python --version',
        explanation: [
          'Created by Guido van Rossum and released in 1991, designed to prioritize developer productivity and human readability.',
          'Execution Model: Python source code (.py) is compiled into bytecode (.pyc) and executed on the Python Virtual Machine (PVM).',
          'Multi-paradigm: Supports procedural, object-oriented, and functional programming seamlessly.',
          'Batteries Included philosophy: Comes with an expansive standard library covering I/O, math, networking, cryptography, and data formats out of the box.'
        ],
        example: {
          language: 'python',
          code: `# The Zen of Python - Core design tenets
import this

# First expressive statement
greeting = "Hello, CODEINK Python Notebook!"
print(greeting)`,
          output: 'The Zen of Python, by Tim Peters...\nHello, CODEINK Python Notebook!',
          annotations: [
            { line: 2, label: 'Standard library import', type: 'blue' },
            { line: 5, label: 'Dynamic string binding', type: 'yellow' },
            { line: 6, label: 'Built-in print function', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Python Execution Architecture',
          subtitle: 'From Source Code to Machine Execution via PVM',
          elements: [
            { id: '1', label: 'Source File', sublabel: 'script.py', value: 'Human Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Bytecode Compiler', sublabel: 'CPython Internal', value: 'script.pyc', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Python Virtual Machine', sublabel: 'PVM Loop', value: 'Evaluation Loop', status: 'active', arrowTo: '4' },
            { id: '4', label: 'CPU / OS Runtime', sublabel: 'Native Execution', value: 'Process Memory', status: 'referenced' }
          ]
        },
        important: 'Python is interpreted from the programmer perspective, but internally CPython always compiles source code into intermediate bytecode instructions before execution.',
        commonMistakes: [
          'Thinking Python is purely interpreted line-by-line without any bytecode compilation stage.',
          'Assuming Python requires explicit compilation commands like gcc or javac.'
        ],
        tip: 'Type `import this` in the Python terminal anytime to read the 19 founding design aphorisms of Python (readability counts, simplicity beats complexity).',
        interviewNote: 'Question: "Is Python compiled or interpreted?" Answer: "Both. Python compiles source (.py) into platform-independent bytecode (.pyc) in memory, which is then interpreted by the Python Virtual Machine (PVM)."',
        practiceQuestions: [
          {
            id: 'q-py1-1',
            type: 'mcq',
            question: 'What is the primary role of the Python Virtual Machine (PVM)?',
            options: [
              'Translates C source code into Python',
              'Executes compiled Python bytecode instructions',
              'Minifies Python files for faster downloads',
              'Serves as a hardware CPU emulator'
            ],
            correctIndex: 1,
            explanation: 'The PVM is the runtime evaluation loop of CPython that iterates over bytecode instructions and executes the corresponding C operations.'
          },
          {
            id: 'q-py1-2',
            type: 'true_false',
            question: 'True or False: Python requires declaring variable types (like int x;) prior to assignment.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation: 'Python uses dynamic typing. Variable names are simply reference bindings to objects whose types are determined at runtime.'
          }
        ],
        relatedTopics: ['py-interpreter', 'py-syntax', 'py-variables']
      },
      {
        id: 'py-interpreter',
        subjectId: 'python',
        chapterId: 'py-ch01',
        chapterNumber: 1,
        pageNumber: 2,
        title: 'Python Interpreter & Implementations',
        difficulty: 'beginner',
        definition: 'The Python interpreter is the program that reads and executes Python code. CPython is the standard reference implementation written in C.',
        whyItMatters: 'Knowing alternative implementations (PyPy, Jython, Cython) allows engineers to optimize speed, integrate with Java/.NET, or bridge C libraries.',
        syntax: 'python -c "print(1 + 1)"',
        explanation: [
          'CPython: The official reference implementation written in C. Contains the Global Interpreter Lock (GIL).',
          'PyPy: A high-performance alternative using a Just-In-Time (JIT) compiler, often 4x-7x faster for loop-heavy code.',
          'Jython & IronPython: Implementations running on JVM and .NET CLR respectively.',
          'Interactive REPL (Read-Eval-Print Loop): Running `python` without arguments launches an immediate sandbox for testing expressions.'
        ],
        example: {
          language: 'python',
          code: `import platform
import sys

print("Implementation:", platform.python_implementation())
print("Version:", platform.python_version())
print("Bytecode Magic:", sys.version_info)`,
          output: 'Implementation: CPython\nVersion: 3.12.2\nBytecode Magic: sys.version_info(major=3, minor=12, micro=2...)',
          annotations: [
            { line: 1, label: 'Platform inspection module', type: 'blue' },
            { line: 4, label: 'Outputs CPython, PyPy, etc.', type: 'yellow' }
          ]
        },
        important: 'CPython is what 99% of developers mean when they say "Python". It provides full compatibility with the C API used by NumPy, Pandas, and PyTorch.',
        commonMistakes: [
          'Confusing the Python language specification with CPython, its primary software implementation.'
        ],
        tip: 'Use `python -m timeit "code"` from the command line to quickly benchmark short snippets across interpreters.',
        interviewNote: 'Question: "What is PyPy and why is it faster than CPython?" Answer: "PyPy uses tracing JIT compilation to compile frequently executed bytecode branches into native machine code at runtime."',
        practiceQuestions: [
          {
            id: 'q-py1-3',
            type: 'mcq',
            question: 'Which Python implementation is written in C and serves as the official reference standard?',
            options: ['PyPy', 'Cython', 'CPython', 'IronPython'],
            correctIndex: 2,
            explanation: 'CPython is the reference implementation developed by the Python Software Foundation (PSF).'
          }
        ],
        relatedTopics: ['py-what-is-python', 'py-syntax']
      },
      {
        id: 'py-syntax',
        subjectId: 'python',
        chapterId: 'py-ch01',
        chapterNumber: 1,
        pageNumber: 3,
        title: 'Syntax, Comments & Significant Indentation',
        difficulty: 'beginner',
        definition: 'Python uses whitespace indentation rather than curly braces { } or begin/end keywords to define nested code block scope.',
        whyItMatters: 'Enforcing uniform visual indentation prevents mismatched brace bugs and creates codebases where indentation strictly reflects execution hierarchy.',
        syntax: 'if condition:\n    indented_body_statement',
        explanation: [
          'PEP 8 Standard: Always use 4 spaces per indentation level. Never mix tabs and spaces.',
          'Colons `:` indicate the start of an indented block (after if, for, while, def, class, with, try).',
          'Single-line comments begin with `#`. Inline comments follow at least two spaces after code.',
          'Multi-line strings (`"""..."""` or `\'\'\'...\'\'\'`) serve as docstrings for functions, classes, and modules.'
        ],
        example: {
          language: 'python',
          code: `# Clean PEP 8 conforming indentation
score = 88

if score >= 90:
    print("Grade: A")
elif score >= 80:
    # Notice: 4 spaces inside this branch
    print("Grade: B")
    print("Keep up the momentum!")
else:
    print("Grade: Need Review")`,
          output: 'Grade: B\nKeep up the momentum!',
          annotations: [
            { line: 4, label: 'Colon introduces block', type: 'blue' },
            { line: 8, label: '4-space uniform indentation', type: 'yellow' }
          ]
        },
        important: 'Mixing tabs and spaces causes TabError in Python 3. Configure your text editor to convert Tab keypresses to 4 space characters.',
        commonMistakes: [
          'IndentationError: unexpected indent (adding accidental leading spaces).',
          'Omitting the colon `:` at the end of compound statements (if, while, def).'
        ],
        tip: 'Install the `ruff` or `black` auto-formatter to format your code to PEP 8 standards automatically on every save.',
        interviewNote: 'Question: "Why did Python choose significant whitespace?" Answer: "To eliminate the discrepancy between how code looks and how it actually executes, preventing misleading indentation bugs common in C and Java."',
        practiceQuestions: [
          {
            id: 'q-py1-4',
            type: 'output',
            question: 'What is the PEP 8 recommended standard for Python indentation?',
            options: ['2 spaces', '4 spaces', '1 tab character', '8 spaces'],
            correctIndex: 1,
            explanation: 'PEP 8 mandates 4 spaces per indentation level and forbids mixing tabs with spaces.'
          }
        ],
        relatedTopics: ['py-what-is-python', 'py-variables']
      }
    ]
  },

  // CHAPTER 02 — VARIABLES & DATA TYPES
  {
    id: 'py-ch02',
    number: 2,
    title: 'Variables & Data Types',
    description: 'Dynamic typing, object references, type inspection, mutability, and primitive scalar types',
    topics: [
      {
        id: 'py-variables-references',
        subjectId: 'python',
        chapterId: 'py-ch02',
        chapterNumber: 2,
        pageNumber: 4,
        title: 'Variables as Object References & type()',
        difficulty: 'beginner',
        definition: 'In Python, a variable is not a memory bucket holding a raw value; it is a named tag or reference bound to an object residing on the heap.',
        whyItMatters: 'Understanding that variables are pointers to objects explains shared mutability bugs, function argument passing, and garbage collection behavior.',
        syntax: 'type(variable_or_expression)',
        explanation: [
          'Assignment `a = 10` allocates an integer PyObject with value 10 and binds identifier `a` to its memory address.',
          'Reassignment `a = "hello"` creates a new string object and rebinds `a`. The variable itself has no fixed type; the object does.',
          '`type(obj)` returns the runtime class of an object.',
          '`id(obj)` returns the unique integer memory identity (in CPython, the memory address of the PyObject).'
        ],
        example: {
          language: 'python',
          code: `x = 42
print("x value:", x, "type:", type(x).__name__)

# Multiple names referencing the exact same object
y = x
print("id(x) == id(y)?", id(x) == id(y))

# Rebinding x to a string
x = "CODEINK"
print("After rebound -> x type:", type(x).__name__, "y value:", y)`,
          output: 'x value: 42 type: int\nid(x) == id(y)? True\nAfter rebound -> x type: str y value: 42',
          annotations: [
            { line: 5, label: 'Both tags point to same integer', type: 'yellow' },
            { line: 9, label: 'x re-bound; y still points to 42', type: 'green' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Python Reference Binding Model',
          subtitle: 'Names on Stack point to PyObject instances on Heap',
          elements: [
            { id: '1', label: 'Name: x', sublabel: 'Stack pointer', value: 'Tag', status: 'active', arrowTo: '3' },
            { id: '2', label: 'Name: y', sublabel: 'Stack pointer', value: 'Tag', status: 'active', arrowTo: '3' },
            { id: '3', label: 'PyObject (int: 42)', sublabel: 'Heap Memory', value: 'refcount=2', status: 'referenced' }
          ]
        },
        important: 'In Python, variables don\'t have types; values have types. Variables are merely names attached to objects.',
        commonMistakes: [
          'Thinking `y = x` copies the data. It merely copies the object reference.',
          'Comparing types using string equality rather than `isinstance(x, int)`.'
        ],
        tip: 'Prefer `isinstance(obj, (int, float))` over `type(obj) == int` because `isinstance` respects object-oriented inheritance subclasses.',
        interviewNote: 'Question: "What does id() return in CPython?" Answer: "It returns the memory address where the PyObject struct resides in C heap memory."',
        practiceQuestions: [
          {
            id: 'q-py2-1',
            type: 'output',
            question: 'What is the output of: `a = [1]; b = a; b.append(2); print(a)`?',
            options: ['[1]', '[1, 2]', '[2]', 'Error'],
            correctIndex: 1,
            explanation: 'Both a and b reference the same list object on the heap. Mutating through b affects the object referenced by a.'
          }
        ],
        relatedTopics: ['py-mutability', 'py-numbers', 'py-strings-ch7']
      },
      {
        id: 'py-numbers-scalars',
        subjectId: 'python',
        chapterId: 'py-ch02',
        chapterNumber: 2,
        pageNumber: 5,
        title: 'Numeric Scalars: int, float, bool, complex',
        difficulty: 'beginner',
        definition: 'Python provides four built-in numeric scalar types: int (arbitrary precision), float (IEEE 754 double precision), bool (subclass of int), and complex.',
        whyItMatters: 'Python integers never overflow! Python 3 automatically expands integers to arbitrary size in software, eliminating integer overflow vulnerabilities.',
        syntax: 'x = 10_000_000  # Underscores as visual digit separators',
        explanation: [
          'int: Arbitrary-precision integers. `2 ** 100` computes accurately with no overflow.',
          'float: 64-bit double-precision floating point. Subject to standard binary floating point precision limits (`0.1 + 0.2 != 0.3`).',
          'bool: Subclass of int with values `True` (evaluates to 1) and `False` (evaluates to 0).',
          'complex: Represented as real + imaginary with `j` suffix (e.g. `3 + 4j`).'
        ],
        example: {
          language: 'python',
          code: `# Arbitrary precision integer
giant_num = 2 ** 64
print("Giant int:", giant_num)

# Float precision nuance
f = 0.1 + 0.2
print("0.1 + 0.2 == 0.3?", f == 0.3)
print("Rounded comparison:", abs(f - 0.3) < 1e-9)

# Booleans are integers
print("True + True =", True + True)
print("isinstance(True, int):", isinstance(True, int))`,
          output: 'Giant int: 18446744073709551616\n0.1 + 0.2 == 0.3? False\nRounded comparison: True\nTrue + True = 2\nisinstance(True, int): True',
          annotations: [
            { line: 3, label: 'No 64-bit overflow error', type: 'green' },
            { line: 7, label: 'Floating point epsilon check', type: 'yellow' },
            { line: 11, label: 'bool inherits directly from int', type: 'blue' }
          ]
        },
        important: 'For financial calculations where decimal rounding errors cannot be tolerated, always use the standard library `decimal.Decimal` module instead of float.',
        commonMistakes: [
          'Using float equality `price == 19.99` in financial transactions.',
          'Assuming Python integers overflow at 2,147,483,647 (32-bit) or 9,223,372,036,854,775,807 (64-bit).'
        ],
        tip: 'Use underscores `_` in large numbers to improve readability: `one_million = 1_000_000`. The interpreter ignores them.',
        interviewNote: 'Question: "Why is True + True equal to 2 in Python?" Answer: "Because bool is a direct subclass of int, where True has value 1 and False has value 0."',
        practiceQuestions: [
          {
            id: 'q-py2-2',
            type: 'output',
            question: 'What is the output of `print(type(5 / 2))` in Python 3?',
            options: ['<class "int">', '<class "float">', '<class "double">', '2'],
            correctIndex: 1,
            explanation: 'The standard division operator `/` always produces a float in Python 3, even if the result divides evenly. Floor division is `//`.'
          }
        ],
        relatedTopics: ['py-operators-arithmetic', 'py-mutability']
      },
      {
        id: 'py-mutability',
        subjectId: 'python',
        chapterId: 'py-ch02',
        chapterNumber: 2,
        pageNumber: 6,
        title: 'Mutable vs Immutable Data Types',
        difficulty: 'intermediate',
        definition: 'Immutable objects cannot have their internal state modified after creation. Mutable objects can have their contents altered in-place without changing object identity.',
        whyItMatters: 'Only immutable types can be used as dictionary keys or set members because their hash value never changes.',
        syntax: 'id(obj)',
        explanation: [
          'Immutable types: int, float, complex, bool, str, tuple, frozenset, bytes.',
          'Mutable types: list, dict, set, bytearray.',
          'When you "modify" an immutable string like `s += "!"`, Python allocates a new string object and rebinds `s` to the new address.',
          'When you mutate a list via `lst.append(x)`, the list\'s memory address (`id`) remains completely unchanged.'
        ],
        example: {
          language: 'python',
          code: `# Immutable: string modification creates new object
s = "code"
id_before = id(s)
s += "ink"
print("String id changed?", id_before != id(s))

# Mutable: list mutation preserves object identity
nums = [1, 2, 3]
id_list = id(nums)
nums.append(4)
print("List id preserved?", id_list == id(nums))`,
          output: 'String id changed? True\nList id preserved? True',
          annotations: [
            { line: 5, label: 'New string allocated in memory', type: 'yellow' },
            { line: 11, label: 'Same list modified in-place', type: 'green' }
          ]
        },
        important: 'Never use mutable objects (like `def func(items=[])`) as default function arguments. The default object is created once at definition time and shared across calls!',
        commonMistakes: [
          'Assuming tuples containing mutable elements (like `([1, 2],)`) are completely immutable in their contents.'
        ],
        tip: 'Check if an object is hashable using `hash(obj)`. If it raises `TypeError: unhashable type`, the object is mutable.',
        interviewNote: 'Question: "Can a tuple be modified if it contains a list?" Answer: "The tuple\'s references cannot change, but the list object referenced inside can be mutated in place."',
        practiceQuestions: [
          {
            id: 'q-py2-3',
            type: 'mcq',
            question: 'Which of the following data types is mutable in Python?',
            options: ['tuple', 'frozenset', 'str', 'bytearray'],
            correctIndex: 3,
            explanation: 'bytearray is the mutable counterpart to immutable bytes.'
          }
        ],
        relatedTopics: ['py-variables-references', 'py-lists-ch8', 'py-tuples-ch9']
      }
    ]
  },

  // CHAPTER 03 — OPERATORS & EXPRESSIONS
  {
    id: 'py-ch03',
    number: 3,
    title: 'Operators & Expressions',
    description: 'Arithmetic, comparison, logical, bitwise, identity, membership, and short-circuit evaluation',
    topics: [
      {
        id: 'py-operators-arithmetic',
        subjectId: 'python',
        chapterId: 'py-ch03',
        chapterNumber: 3,
        pageNumber: 7,
        title: 'Arithmetic, Floor Division & Modulo',
        difficulty: 'beginner',
        definition: 'Python includes standard math operators alongside dedicated floor division (`//`) and exponentiation (`**`) operators.',
        whyItMatters: 'Floor division behaves differently in Python compared to C with negative numbers: Python floors towards negative infinity (`floor(a/b)`).',
        syntax: 'a // b   # Floor division\na ** b   # Exponentiation (a^b)\na % b    # Modulo remainder',
        explanation: [
          '`/` True division: always returns float (e.g., `4 / 2` yields `2.0`).',
          '`//` Floor division: truncates towards negative infinity (`-7 // 2` is `-4`, not `-3`).',
          '`%` Modulo: returns remainder such that `(a // b) * b + (a % b) == a`.',
          '`**` Exponentiation: handles integer powers with arbitrary precision and fractional roots (`9 ** 0.5 == 3.0`).'
        ],
        example: {
          language: 'python',
          code: `print("True division: 7 / 2 =", 7 / 2)
print("Floor division: 7 // 2 =", 7 // 2)
print("Negative floor: -7 // 2 =", -7 // 2)
print("Modulo check: -7 % 2 =", -7 % 2)
print("Power: 2 ** 10 =", 2 ** 10)`,
          output: 'True division: 7 / 2 = 3.5\nFloor division: 7 // 2 = 3\nNegative floor: -7 // 2 = -4\nModulo check: -7 % 2 = 1\nPower: 2 ** 10 = 1024',
          annotations: [
            { line: 3, label: 'Floored towards -infinity', type: 'yellow' },
            { line: 5, label: '2^10 power operator', type: 'green' }
          ]
        },
        important: 'In Python, `-7 // 2` is `-4` (rounds down towards -∞), whereas in C, Java, and JavaScript it truncates towards zero to `-3`.',
        commonMistakes: [
          'Using `^` for exponentiation. In Python, `^` is the Bitwise XOR operator! Use `**` for powers.'
        ],
        tip: 'Use `divmod(a, b)` to compute both floor division and modulo in a single optimized C-level step: `q, r = divmod(17, 5)`.',
        interviewNote: 'Question: "What is `2 ** 3 ** 2` in Python?" Answer: "512. The `**` operator has right-to-left associativity, so it evaluates as `2 ** (3 ** 2) = 2 ** 9 = 512`."',
        practiceQuestions: [
          {
            id: 'q-py3-1',
            type: 'output',
            question: 'What is the evaluated output of `2 ** 3 ** 2`?',
            options: ['64', '512', '18', '256'],
            correctIndex: 1,
            explanation: 'Exponentiation ** is right-associative: 3 ** 2 is 9, then 2 ** 9 is 512.'
          }
        ],
        relatedTopics: ['py-numbers-scalars', 'py-comparison-identity']
      },
      {
        id: 'py-comparison-identity',
        subjectId: 'python',
        chapterId: 'py-ch03',
        chapterNumber: 3,
        pageNumber: 8,
        title: 'Equality (==) vs Identity (is) & Membership',
        difficulty: 'beginner',
        definition: '`==` tests value equality (calls `__eq__`). `is` tests memory identity (`id(a) == id(b)`). `in` tests collection membership.',
        whyItMatters: 'Confusing `==` and `is` leads to subtle bugs, especially with string/integer interning and None checks.',
        syntax: 'if x is None:\n    do_something()\nif item in collection:\n    process()',
        explanation: [
          'Value Equality `==`: Returns True if the objects represent the same data, even if allocated at different memory addresses.',
          'Identity `is`: Returns True only if both variables reference the exact same memory location.',
          'Always use `is None` or `is not None` to test for singleton None values.',
          'Membership `in` / `not in`: Tests if an element exists in a string, list, tuple, set, or dictionary keys in O(1) or O(n) time.'
        ],
        example: {
          language: 'python',
          code: `a = [1, 2, 3]
b = [1, 2, 3]

print("a == b (Values match?):", a == b)
print("a is b (Same memory?):", a is b)

# None check standard idiom
val = None
print("val is None:", val is None)

# Membership testing
languages = ["c", "python", "rust"]
print("'python' in languages:", 'python' in languages)`,
          output: 'a == b (Values match?): True\na is b (Same memory?): False\nval is None: True\n\'python\' in languages: True',
          annotations: [
            { line: 4, label: 'True: identical list contents', type: 'green' },
            { line: 5, label: 'False: separate heap allocations', type: 'yellow' },
            { line: 9, label: 'Always use "is" for None', type: 'blue' }
          ]
        },
        important: 'Never check `if x == None:`. Always write `if x is None:`. The `is` operator cannot be overridden and guarantees singleton comparison.',
        commonMistakes: [
          'Using `is` to compare numbers or strings. CPython interns small integers (-5 to 256), leading to deceptive "working" code that fails on larger numbers.'
        ],
        tip: 'Testing membership `x in my_set` is average O(1) time complexity, whereas `x in my_list` is O(n). Use sets for fast lookup.',
        interviewNote: 'Question: "Why does `a = 256; b = 256; a is b` return True, but `a = 257; b = 257; a is b` return False in the REPL?" Answer: "CPython pre-allocates an integer cache for numbers between -5 and 256 for performance."',
        practiceQuestions: [
          {
            id: 'q-py3-2',
            type: 'mcq',
            question: 'Which comparison operator should be used to test if an optional parameter is None?',
            options: ['== None', '=== None', 'is None', 'in None'],
            correctIndex: 2,
            explanation: 'PEP 8 strictly dictates `is None` because None is a built-in singleton and `is` tests pointer identity.'
          }
        ],
        relatedTopics: ['py-variables-references', 'py-conditions-if']
      }
    ]
  },

  // CHAPTER 04 — INPUT & OUTPUT
  {
    id: 'py-ch04',
    number: 4,
    title: 'Input & Output',
    description: 'Reading user input, print parameters, escape sequences, and modern f-string formatting',
    topics: [
      {
        id: 'py-print-fstrings',
        subjectId: 'python',
        chapterId: 'py-ch04',
        chapterNumber: 4,
        pageNumber: 9,
        title: 'print() Parameters & Modern f-Strings',
        difficulty: 'beginner',
        definition: '`print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False)` outputs to console. f-Strings (PEP 498) evaluate embedded expressions at runtime.',
        whyItMatters: 'f-Strings are faster and far more readable than legacy `%` formatting or `.format()` calls, supporting inline math, formatting specs, and debug syntax.',
        syntax: 'print(f"Name: {user.name}, Value: {price:.2f}")',
        explanation: [
          '`sep` parameter: Controls delimiter between multiple arguments (defaults to single space).',
          '`end` parameter: Appended after last item (defaults to newline `\\n`; set to `""` or `" "` to keep output on same line).',
          'f-Strings `f"..."`: Evaluate any valid Python expression inside `{expr}` brackets.',
          'Format specifiers: `{val:.2f}` (2 decimals), `{val:>10}` (right-align 10 width), `{val:08d}` (zero-padded).'
        ],
        example: {
          language: 'python',
          code: `# Advanced print parameters
print("CODE", "INK", "NOTEBOOK", sep=" • ", end=" => DONE\\n")

# Modern f-Strings
item = "RAM Module"
price = 89.9542
quantity = 4

print(f"Item: {item:<12} | Total: USD {price * quantity:>8.2f}")

# Python 3.8+ self-documenting debug syntax
radius = 7
print(f"{radius=}, {2 * 3.14159 * radius=:.2f}")`,
          output: 'CODE • INK • NOTEBOOK => DONE\nItem: RAM Module   | Total: $  359.82\nradius=7, 2 * 3.14159 * radius=43.98',
          annotations: [
            { line: 2, label: 'sep and end overrides', type: 'blue' },
            { line: 9, label: 'Field width and precision formatting', type: 'yellow' },
            { line: 13, label: 'Self-documenting f"{var=}" debug format', type: 'green' }
          ]
        },
        important: '`input()` ALWAYS returns a string. If reading integers or floats, you must explicitly cast: `age = int(input("Age: "))`.',
        commonMistakes: [
          'Attempting math on raw `input()`: `"5" + "5"` evaluates to `"55"`, not `10`.'
        ],
        tip: 'Use `f"{x=}"` for quick debugging without writing `print("x =", x)`. Added in Python 3.8, it prints the expression and its evaluated value.',
        interviewNote: 'Question: "Why are f-strings faster than str.format()?" Answer: "f-Strings are parsed at compile-time into optimized BUILD_STRING bytecode instructions rather than dynamic dictionary lookups."',
        practiceQuestions: [
          {
            id: 'q-py4-1',
            type: 'output',
            question: 'What is printed by: `print("A", "B", sep="-", end="*"); print("C")`?',
            options: ['A-B*C', 'A-B\\n*C', 'A B C', 'A-B C'],
            correctIndex: 0,
            explanation: 'The first print joins with "-" and ends with "*". The second print begins immediately after without a newline, printing C.'
          }
        ],
        relatedTopics: ['py-strings-ch7', 'py-conditions-if']
      }
    ]
  },

  // CHAPTER 05 — CONDITIONAL STATEMENTS
  {
    id: 'py-ch05',
    number: 5,
    title: 'Conditional Statements',
    description: 'Boolean branching, if-elif-else ladders, truthy/falsy semantics, and ternary expressions',
    topics: [
      {
        id: 'py-conditions-if',
        subjectId: 'python',
        chapterId: 'py-ch05',
        chapterNumber: 5,
        pageNumber: 10,
        title: 'if-elif-else, Truthiness & Chained Comparisons',
        difficulty: 'beginner',
        definition: 'Conditional statements direct control flow based on boolean expressions. Python evaluates truthiness and supports mathematical comparison chaining.',
        whyItMatters: 'Comparison chaining (`18 <= age < 65`) produces elegant, bug-free mathematical boundaries without redundant `and` operators.',
        syntax: 'if condition:\n    pass\nelif other_condition:\n    pass\nelse:\n    pass',
        explanation: [
          'Falsy values in Python: `None`, `False`, `0`, `0.0`, empty sequences (`""`, `[]`, `()`, `{}`), and empty sets.',
          'Truthy values: Any non-zero number, non-empty collection, or active object.',
          'Comparison chaining: `0 <= score <= 100` evaluates as `(0 <= score) and (score <= 100)` with score evaluated only once.',
          'Ternary conditional expression: `x = true_val if condition else false_val`.'
        ],
        example: {
          language: 'python',
          code: `age = 22

# Chained mathematical comparison
if 18 <= age <= 65:
    status = "Working Adult"
else:
    status = "Minor / Retired"

# Truthiness testing on collections
cart = []
if not cart:
    print("Cart is empty (falsy)!")

# Pythonic Ternary expression
access = "Granted" if age >= 18 else "Denied"
print(f"Status: {status} | Access: {access}")`,
          output: 'Cart is empty (falsy)!\nStatus: Working Adult | Access: Granted',
          annotations: [
            { line: 4, label: 'Chained comparison 18 <= age <= 65', type: 'blue' },
            { line: 11, label: 'Testing emptiness via boolean truthiness', type: 'yellow' },
            { line: 14, label: 'Inline ternary expression', type: 'green' }
          ]
        },
        important: 'Python uses `elif`, not `else if`. Do not use redundant parentheses around condition expressions.',
        commonMistakes: [
          'Writing `if len(items) > 0:` instead of the idiomatic `if items:`.',
          'Writing `if items == []:` which is slow and fails for other empty collection types.'
        ],
        tip: 'Write `if my_list:` to check if a list has elements. In Python, empty collections are inherently falsy.',
        interviewNote: 'Question: "How does short-circuit evaluation work with `and` / `or`?" Answer: "`and` returns the first falsy operand or the last operand. `or` returns the first truthy operand or the last operand."',
        practiceQuestions: [
          {
            id: 'q-py5-1',
            type: 'output',
            question: 'What is the evaluated result of: `"apple" and 0 or [1, 2]`?',
            options: ['"apple"', '0', '[1, 2]', 'True'],
            correctIndex: 2,
            explanation: '"apple" and 0 evaluates to 0. Then 0 or [1, 2] evaluates to the first truthy value, which is [1, 2].'
          }
        ],
        relatedTopics: ['py-loops-for-while', 'py-comparison-identity']
      }
    ]
  },

  // CHAPTER 06 — LOOPS & ITERATION
  {
    id: 'py-ch06',
    number: 6,
    title: 'Loops & Iteration',
    description: 'for loops, while loops, range(), break, continue, and the loop else clause',
    topics: [
      {
        id: 'py-loops-for-while',
        subjectId: 'python',
        chapterId: 'py-ch06',
        chapterNumber: 6,
        pageNumber: 11,
        title: 'for Loops, range() & The Loop else Clause',
        difficulty: 'beginner',
        definition: 'Python `for` loops iterate over items of any sequence or iterable. The loop `else` block executes only if the loop completes without encountering a `break`.',
        whyItMatters: 'The loop `else` construct cleanly solves the "search and verify" pattern without needing manual boolean flag variables.',
        syntax: 'for item in iterable:\n    if found:\n        break\nelse:\n    # Runs if NO break occurred',
        explanation: [
          '`range(start, stop[, step])`: Generates immutable arithmetic progression on-demand with O(1) memory.',
          '`break`: Terminates the innermost loop immediately.',
          '`continue`: Skips remainder of current iteration and jumps to the next.',
          '`else` on loops: Executes when the loop terminates naturally (via iteration exhaustion or while condition becoming false).'
        ],
        example: {
          language: 'python',
          code: `# Search for prime number with loop-else
target = 13

for divisor in range(2, target):
    if target % divisor == 0:
        print(f"{target} is composite (divisible by {divisor})")
        break
else:
    # Executes only if no divisor triggered break!
    print(f"{target} is a PRIME number!")`,
          output: '13 is a PRIME number!',
          annotations: [
            { line: 4, label: 'range() step generator', type: 'blue' },
            { line: 7, label: 'break exits loop before else', type: 'red' },
            { line: 9, label: 'else executes when loop exhausts normally', type: 'green' }
          ]
        },
        important: 'Think of loop `else` as "no-break". It only runs if the loop was NOT terminated prematurely by a `break` statement.',
        commonMistakes: [
          'Confusing loop `else` with conditional `if...else`. It is attached to `for` or `while`, not the `if` inside.',
          'Using C-style index loops `for i in range(len(items)): print(items[i])` instead of iterating directly over `items` or using `enumerate()`.'
        ],
        tip: 'Use `enumerate(iterable, start=1)` when you need both the element and its index counter: `for i, item in enumerate(items):`.',
        interviewNote: 'Question: "What happens if a while loop condition is False initially? Does the else block run?" Answer: "Yes! Because no `break` occurred, the else block runs immediately."',
        practiceQuestions: [
          {
            id: 'q-py6-1',
            type: 'output',
            question: 'What is printed by: `for x in range(3): if x == 5: break else: print("End")`?',
            options: ['Nothing', 'End', '0 1 2 End', 'SyntaxError'],
            correctIndex: 1,
            explanation: 'The loop runs for 0, 1, 2 without ever hitting break (x is never 5). The else clause executes and prints "End".'
          }
        ],
        relatedTopics: ['py-lists-ch8', 'py-iterators-generators']
      }
    ]
  },

  // CHAPTER 07 — STRINGS
  {
    id: 'py-ch07',
    number: 7,
    title: 'Strings',
    description: 'Immutability, slicing with step, string methods, and Unicode text processing',
    topics: [
      {
        id: 'py-strings-ch7',
        subjectId: 'python',
        chapterId: 'py-ch07',
        chapterNumber: 7,
        pageNumber: 12,
        title: 'String Slicing, Immutability & Essential Methods',
        difficulty: 'beginner',
        definition: 'Strings are immutable sequences of Unicode code points. Slicing `str[start:stop:step]` allows extraction and reversal in clean notation.',
        whyItMatters: 'Text processing is at the heart of APIs, data cleaning, and NLP. Understanding string immutability prevents inefficient string concatenation loops.',
        syntax: 'text[start:stop:step]  # step=-1 reverses string',
        explanation: [
          'Negative indexing: `-1` refers to the last character, `-2` the second-to-last.',
          'Reversal idiom: `text[::-1]` reverses any sequence efficiently.',
          'Essential methods: `.strip()`, `.lower()`, `.upper()`, `.split(sep)`, `.join(iterable)`.',
          '`"".join(list_of_strings)` is O(n) linear time, whereas repeated `+=` inside a loop is O(n^2) quadratic.'
        ],
        example: {
          language: 'python',
          code: `msg = "  Python Systems Programming  "
clean = msg.strip().lower()
print("Cleaned:", clean)

# String reversal via step -1
print("Reversed:", clean[::-1])

# Split and Join idiom (O(n) construction)
words = clean.split()
joined = "-".join(words)
print("Joined hyphenated:", joined)`,
          output: 'Cleaned: python systems programming\nReversed: gnimmargorp smetsys nohtyp\nJoined hyphenated: python-systems-programming',
          annotations: [
            { line: 2, label: 'Method chaining on immutable string', type: 'blue' },
            { line: 6, label: 'Extended slice step -1 for reversal', type: 'yellow' },
            { line: 10, label: 'Fast delimiter join on iterable', type: 'green' }
          ]
        },
        important: 'Strings cannot be mutated in place: `s[0] = "J"` raises `TypeError: \'str\' object does not support item assignment`. Create a new string instead.',
        commonMistakes: [
          'Building long strings using `+=` inside large loops. Use a list and `"".join(lst)` instead.'
        ],
        tip: 'Use `str.startswith()` and `str.endswith()` with a tuple of prefixes/suffixes: `filename.endswith((".py", ".pyw"))`.',
        interviewNote: 'Question: "How does Python 3 store strings in memory internally?" Answer: "PEP 393 Flexible String Representation stores ASCII strings as 1 byte/char, BMP strings as 2 bytes/char, and full Unicode/emojis as 4 bytes/char."',
        practiceQuestions: [
          {
            id: 'q-py7-1',
            type: 'output',
            question: 'What is the value of `"CODEINK"[1:6:2]`?',
            options: ['"OEI"', '"OEN"', '"ODN"', '"OIN"'],
            correctIndex: 0,
            explanation: 'Indices 1, 3, 5 correspond to characters "O", "E", "I".'
          }
        ],
        relatedTopics: ['py-print-fstrings', 'py-lists-ch8']
      }
    ]
  },

  // CHAPTER 08 — LISTS
  {
    id: 'py-ch08',
    number: 8,
    title: 'Lists',
    description: 'Dynamic arrays, mutability, methods, slicing, and list comprehensions',
    topics: [
      {
        id: 'py-lists-ch8',
        subjectId: 'python',
        chapterId: 'py-ch08',
        chapterNumber: 8,
        pageNumber: 13,
        title: 'Lists: Operations, Complexity & Comprehensions',
        difficulty: 'beginner',
        definition: 'Python lists are mutable, dynamically-sized array sequences containing pointers to heterogeneous PyObject instances.',
        whyItMatters: 'List comprehensions `[expr for x in iterable if cond]` provide optimized bytecode execution and concise, readable data transformation.',
        syntax: '[expression for item in iterable if condition]',
        explanation: [
          'Internal Architecture: Implemented as dynamic arrays of pointers. Appending to end is amortized O(1); inserting/deleting at beginning is O(n).',
          '`append(x)` vs `extend(iterable)`: `append` adds the object as a single element; `extend` unpacks and appends each element of the iterable.',
          '`pop([index])`: Removes and returns item (defaults to end O(1); index 0 is O(n)).',
          'List Comprehension: Combines map and filter into a single clear expression executing at C-speed in bytecode.'
        ],
        example: {
          language: 'python',
          code: `# Mutable list modifications
items = [10, 20, 30]
items.append(40)
items.extend([50, 60])
popped = items.pop()  # Removes 60
print(f"List: {items}, Popped: {popped}")

# List comprehension with filtering
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print("Even squares:", even_squares)`,
          output: 'List: [10, 20, 30, 40, 50], Popped: 60\nEven squares: [4, 16, 36, 64, 100]',
          annotations: [
            { line: 3, label: 'Amortized O(1) append', type: 'blue' },
            { line: 11, label: 'Concise list comprehension [expr for x in iter if cond]', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'CPython List Memory Layout',
          subtitle: 'PyListObject contains pointer array pointing to heap PyObjects',
          elements: [
            { id: '1', label: 'PyListObject', sublabel: 'ob_size=3', value: 'Ptr Array', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Pointer [0]', sublabel: 'addr: 0x100', value: '-> int: 10', status: 'normal' },
            { id: '3', label: 'Pointer [1]', sublabel: 'addr: 0x108', value: '-> int: 20', status: 'normal' },
            { id: '4', label: 'Pointer [2]', sublabel: 'addr: 0x110', value: '-> int: 30', status: 'normal' }
          ]
        },
        important: 'Copying a list with `b = a` only copies the reference. Use `b = a.copy()` or `b = list(a)` or `b = a[:]` for a shallow copy.',
        commonMistakes: [
          'Calling `items.sort()` and assigning `res = items.sort()`. `.sort()` sorts in-place and returns `None`! Use `sorted(items)` to return a new sorted list.'
        ],
        tip: 'If you need frequent insertions or removals at the front of a sequence, use `collections.deque` instead of `list` for O(1) front operations.',
        interviewNote: 'Question: "What is the time complexity of list append vs list insert at index 0?" Answer: "`append` is amortized O(1). Inserting at index 0 is O(n) because all subsequent elements must be shifted in memory."',
        practiceQuestions: [
          {
            id: 'q-py8-1',
            type: 'output',
            question: 'What is the value of: `[x * 2 for x in [1, 2, 3] if x > 1]`?',
            options: ['[2, 4, 6]', '[4, 6]', '[2, 4]', '[6]'],
            correctIndex: 1,
            explanation: 'Only elements > 1 (2 and 3) are filtered; multiplied by 2 they yield [4, 6].'
          }
        ],
        relatedTopics: ['py-tuples-ch9', 'py-comprehensions-ch18']
      }
    ]
  },

  // CHAPTER 09 — TUPLES
  {
    id: 'py-ch09',
    number: 9,
    title: 'Tuples',
    description: 'Immutable sequences, tuple packing/unpacking, and memory comparison with lists',
    topics: [
      {
        id: 'py-tuples-ch9',
        subjectId: 'python',
        chapterId: 'py-ch09',
        chapterNumber: 9,
        pageNumber: 14,
        title: 'Tuples: Immutability, Unpacking & NamedTuples',
        difficulty: 'beginner',
        definition: 'Tuples are immutable, fixed-length sequences. They protect data against accidental modification and can serve as dictionary keys.',
        whyItMatters: 'Tuples consume less memory than lists and allow elegant multiple assignment and return values (`x, y = get_coords()`).',
        syntax: 'point = (10, 20)\nsingle_element = (42,)  # Notice required trailing comma!',
        explanation: [
          'Syntax detail: A single element tuple requires a trailing comma `(42,)`. Without the comma, `(42)` is simply parenthesized integer 42.',
          'Tuple Unpacking: `x, y, z = (1, 2, 3)`. Extended unpacking with `*rest`: `first, *middle, last = numbers`.',
          'Memory efficiency: Tuples have fixed size and are allocated in a single memory block without overallocation overhead.',
          'Hashability: If all elements inside a tuple are immutable, the tuple itself is hashable and can be used as a dict key or set item.'
        ],
        example: {
          language: 'python',
          code: `# Tuple packing and multiple assignment
coordinates = (37.7749, -122.4194)
lat, lon = coordinates
print(f"Latitude: {lat}, Longitude: {lon}")

# Extended unpacking with starred expression
scores = [98, 85, 91, 74, 88]
best, *middle, lowest = sorted(scores, reverse=True)
print(f"Top: {best}, Middle: {middle}, Lowest: {lowest}")

# Tuple as dictionary key
lookup = {(0, 0): "Origin", (1, 0): "Right"}
print("Point (0, 0) is:", lookup[(0, 0)])`,
          output: 'Latitude: 37.7749, Longitude: -122.4194\nTop: 98, Middle: [91, 88, 85], Lowest: 74\nPoint (0, 0) is: Origin',
          annotations: [
            { line: 3, label: 'Unpacking coordinates tuple', type: 'blue' },
            { line: 8, label: 'Starred *middle captures variable elements', type: 'yellow' },
            { line: 12, label: 'Tuple used as composite hashable dict key', type: 'green' }
          ]
        },
        important: 'Single-element tuples must include a trailing comma: `x = (5,)` is a tuple; `x = (5)` is an integer!',
        commonMistakes: [
          'Attempting `t[0] = 99` on a tuple. Tuples are strictly immutable.'
        ],
        tip: 'Use `typing.NamedTuple` or `collections.namedtuple` to create self-documenting tuples with named fields like `Point(x=10, y=20)`.',
        interviewNote: 'Question: "Why does Python allocate tuples faster than lists?" Answer: "Tuples have fixed size, requiring no dynamic array buffer overallocation or resizing logic. Small tuples are also cached by CPython for reuse."',
        practiceQuestions: [
          {
            id: 'q-py9-1',
            type: 'output',
            question: 'What is the type of `x = (42)` versus `y = (42,)`?',
            options: ['Both tuple', 'x is int, y is tuple', 'Both int', 'SyntaxError'],
            correctIndex: 1,
            explanation: '(42) is parenthesized integer 42; the trailing comma in (42,) creates a 1-element tuple.'
          }
        ],
        relatedTopics: ['py-lists-ch8', 'py-dictionaries-ch11']
      }
    ]
  },

  // CHAPTER 10 — SETS
  {
    id: 'py-ch10',
    number: 10,
    title: 'Sets',
    description: 'Hash tables, uniqueness guarantees, set operations (union, intersection), and complexity',
    topics: [
      {
        id: 'py-sets-ch10',
        subjectId: 'python',
        chapterId: 'py-ch10',
        chapterNumber: 10,
        pageNumber: 15,
        title: 'Sets: Hashing, Uniqueness & Mathematical Operations',
        difficulty: 'beginner',
        definition: 'A set is an unordered collection of unique, hashable elements implemented using an underlying hash table.',
        whyItMatters: 'Checking membership `x in my_set` runs in O(1) constant time, making sets the premier tool for deduplication and relational comparisons.',
        syntax: 's = {1, 2, 3}\nempty_set = set()  # {} creates an empty dict!',
        explanation: [
          'Uniqueness: Adding duplicate values is a silent no-op. Duplicates are immediately discarded.',
          'Hash table backed: Only hashable (immutable) objects can be added to sets.',
          'Mathematical operations: Union `|`, Intersection `&`, Difference `-`, Symmetric Difference `^`.',
          '`frozenset`: An immutable variant of set that can itself be hashed and placed inside other sets.'
        ],
        example: {
          language: 'python',
          code: `# Automatic deduplication
raw_ids = [101, 102, 101, 105, 102, 109]
unique_ids = set(raw_ids)
print("Unique IDs:", sorted(unique_ids))

# Mathematical set operations
devs_frontend = {"HTML", "CSS", "TypeScript", "Python"}
devs_backend = {"Python", "SQL", "Docker", "Linux"}

print("Fullstack Skills (Union |):", devs_frontend | devs_backend)
print("Common Skills (Intersection &):", devs_frontend & devs_backend)
print("Frontend-Only (Difference -):", devs_frontend - devs_backend)`,
          output: 'Unique IDs: [101, 102, 105, 109]\nFullstack Skills (Union |): {\'CSS\', \'Docker\', \'HTML\', \'Linux\', \'Python\', \'SQL\', \'TypeScript\'}\nCommon Skills (Intersection &): {\'Python\'}\nFrontend-Only (Difference -): {\'CSS\', \'HTML\', \'TypeScript\'}',
          annotations: [
            { line: 3, label: 'Instant O(n) deduplication', type: 'blue' },
            { line: 10, label: 'Set union operator |', type: 'yellow' },
            { line: 11, label: 'Set intersection operator &', type: 'green' }
          ]
        },
        important: 'Writing `empty = {}` creates an empty dictionary, NOT an empty set. Always write `empty = set()` to initialize an empty set.',
        commonMistakes: [
          'Trying to add a list to a set: `s.add([1, 2])` raises `TypeError: unhashable type: \'list\'`. Use a tuple instead.'
        ],
        tip: 'Use `set(large_list)` when you have repeated membership lookups: `val in my_set` runs in O(1) compared to O(n) for lists.',
        interviewNote: 'Question: "What is the worst-case time complexity of set lookup?" Answer: "Average is O(1). Worst case is O(n) if all elements hash to the exact same hash bucket causing collision resolution chains."',
        practiceQuestions: [
          {
            id: 'q-py10-1',
            type: 'mcq',
            question: 'How do you create an empty set in Python?',
            options: ['{}', 'set()', '[]', '()'],
            correctIndex: 1,
            explanation: '{} creates an empty dictionary. set() is required to create an empty set.'
          }
        ],
        relatedTopics: ['py-dictionaries-ch11', 'py-lists-ch8']
      }
    ]
  }
];
