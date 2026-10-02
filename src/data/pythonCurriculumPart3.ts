import { Chapter } from '../types/notebook';

export const PYTHON_CHAPTERS_PART3: Chapter[] = [
  // CHAPTER 21 — DATE, TIME & DATA PROCESSING
  {
    id: 'py-ch21',
    number: 21,
    title: 'Date, Time & Data Processing',
    description: 'datetime, timedelta, strftime/strptime parsing, timezone awareness, and CSV handling',
    topics: [
      {
        id: 'py-data-processing-ch21',
        subjectId: 'python',
        chapterId: 'py-ch21',
        chapterNumber: 21,
        pageNumber: 26,
        title: 'datetime, Timezones & CSV Processing',
        difficulty: 'intermediate',
        definition: 'The `datetime` module provides classes for manipulating dates and times. `timedelta` represents duration differences between timestamps.',
        whyItMatters: 'Handling timezones, expiration logic, cron scheduling, and log parsing without off-by-one errors is vital for distributed cloud systems.',
        syntax: 'from datetime import datetime, timezone, timedelta\nnow = datetime.now(timezone.utc)',
        explanation: [
          'Naive vs Aware: Naive datetimes contain no timezone info; Aware datetimes explicitly define UTC or offset info via `timezone.utc`.',
          '`strftime()`: Converts datetime object to a formatted string.',
          '`strptime()`: Parses a string into a datetime object according to a format string.',
          '`csv` module: `csv.DictReader` and `csv.DictWriter` read/write tabular data safely handling quoted commas and newlines.'
        ],
        example: {
          language: 'python',
          code: `from datetime import datetime, timezone, timedelta

# Create timezone-aware UTC timestamp
now_utc = datetime.now(timezone.utc)
print("UTC Current:", now_utc.strftime("%Y-%m-%d %H:%M:%S %Z"))

# Date arithmetic with timedelta
expires_at = now_utc + timedelta(days=7, hours=2)
print("Token Expires:", expires_at.strftime("%b %d, %Y at %I:%M %p"))

# Parsing date string
raw_date = "2026-10-01 08:30:00"
parsed = datetime.strptime(raw_date, "%Y-%m-%d %H:%M:%S")
print("Parsed year & month:", parsed.year, parsed.month)`,
          output: 'UTC Current: 2026-10-01 16:30:00 UTC\nToken Expires: Oct 08, 2026 at 06:30 PM\nParsed year & month: 2026 10',
          annotations: [
            { line: 4, label: 'Timezone-aware UTC standard', type: 'blue' },
            { line: 8, label: 'timedelta adds 7 days and 2 hours', type: 'yellow' },
            { line: 13, label: 'strptime parses string according to specifiers', type: 'green' }
          ]
        },
        important: 'Always store datetimes in UTC in your databases and servers. Convert to the user\'s local timezone only at the final presentation UI layer.',
        commonMistakes: [
          'Comparing a naive datetime with a timezone-aware datetime (raises `TypeError: can\'t compare offset-naive and offset-aware datetimes`).',
          'Confusing `%m` (month as number 01-12) with `%M` (minute 00-59).'
        ],
        tip: 'In Python 3.11+, use `datetime.fromisoformat()` to instantly parse standard ISO 8601 timestamps without writing format specifiers.',
        interviewNote: 'Question: "What is the difference between strftime and strptime?" Answer: "strftime formats string FROM time (`f` = format). strptime parses string TO time (`p` = parse)."',
        practiceQuestions: [
          {
            id: 'q-py21-1',
            type: 'output',
            question: 'What method converts a datetime object into a formatted string?',
            options: ['strptime()', 'strftime()', 'todate()', 'format_date()'],
            correctIndex: 1,
            explanation: 'strftime (string format time) converts a datetime object into a formatted string representation.'
          }
        ],
        relatedTopics: ['py-regex-ch20', 'py-database-ch22']
      }
    ]
  },

  // CHAPTER 22 — DATABASE & PYTHON
  {
    id: 'py-ch22',
    number: 22,
    title: 'Database & Python',
    description: 'Relational data with sqlite3, parameterized queries, and ACID transaction control',
    topics: [
      {
        id: 'py-database-ch22',
        subjectId: 'python',
        chapterId: 'py-ch22',
        chapterNumber: 22,
        pageNumber: 27,
        title: 'SQLite, Parameterized Queries & Transactions',
        difficulty: 'intermediate',
        definition: 'Python includes `sqlite3` in its standard library, providing an ACID-compliant embedded relational SQL database engine without requiring separate server setup.',
        whyItMatters: 'Using parameterized queries (`?`) prevents SQL injection attacks, the #1 historic database security vulnerability.',
        syntax: 'cursor.execute("SELECT * FROM users WHERE email = ?", (email,))',
        explanation: [
          'Connection & Cursor: `conn = sqlite3.connect(":memory:")` establishes connection; cursor executes SQL statements.',
          'Parameterization: Always pass user inputs as parameter tuples to `execute()`. Never format SQL strings with f-strings or concatenation.',
          'Transactions: SQLite transactions start automatically; call `conn.commit()` to persist changes or `conn.rollback()` on failure.',
          'Row Factory: Setting `conn.row_factory = sqlite3.Row` allows accessing columns by name like dictionaries.'
        ],
        example: {
          language: 'python',
          code: `import sqlite3

# Create in-memory database for fast testing
conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# DDL: Create table
cursor.execute("""
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        points INTEGER DEFAULT 0
    )
""")

# Safe parameterized INSERT
users_data = [("alice", 150), ("bob", 220), ("charlie", 95)]
cursor.executemany("INSERT INTO users (username, points) VALUES (?, ?)", users_data)
conn.commit()

# Querying and inspecting rows
cursor.execute("SELECT * FROM users WHERE points >= ? ORDER BY points DESC", (100,))
for row in cursor.fetchall():
    print(f"User: {row['username']:<10} | Score: {row['points']}")

conn.close()`,
          output: 'User: bob        | Score: 220\nUser: alice      | Score: 150',
          annotations: [
            { line: 5, label: 'sqlite3.Row enables dict-like column access', type: 'blue' },
            { line: 18, label: 'executemany batch inserts parameterized rows', type: 'yellow' },
            { line: 22, label: 'Safe parameterized query prevents SQL injection', type: 'green' }
          ]
        },
        important: 'NEVER use f-strings or string concatenation to build SQL queries: `f"SELECT * FROM users WHERE name = \'{user}\'"` creates critical SQL injection exploits.',
        commonMistakes: [
          'Forgetting to call `conn.commit()`, causing database updates to disappear when the script terminates.',
          'Passing a single parameter without a tuple comma: `(email)` is a string, `(email,)` is the required tuple.'
        ],
        tip: 'Use context managers with connections: `with conn: cursor.execute(...)` automatically commits on success and rolls back on exception.',
        interviewNote: 'Question: "Why should you use parameterized queries instead of string formatting?" Answer: "Parameterized queries separate SQL code from data. The database compiles the SQL statement first, treating parameters strictly as literals, eliminating SQL injection."',
        practiceQuestions: [
          {
            id: 'q-py22-1',
            type: 'mcq',
            question: 'How should parameters be safely bound in sqlite3 queries?',
            options: [
              'Using f-strings: f"SELECT * FROM t WHERE id = {user_id}"',
              'Using question marks and a parameter tuple: cursor.execute("SELECT * FROM t WHERE id = ?", (user_id,))',
              'Using string concatenation: "SELECT * FROM t WHERE id = " + str(user_id)',
              'Using eval()'
            ],
            correctIndex: 1,
            explanation: 'The question mark placeholder `?` with a tuple of arguments ensures the database treats input as sanitized data, preventing SQL injection.'
          }
        ],
        relatedTopics: ['py-file-handling-ch14', 'py-app-dev-ch28']
      }
    ]
  },

  // CHAPTER 23 — TESTING & DEBUGGING
  {
    id: 'py-ch23',
    number: 23,
    title: 'Testing & Debugging',
    description: 'Assertions, unittest, test fixtures, test-driven development (TDD), and pytest patterns',
    topics: [
      {
        id: 'py-testing-ch23',
        subjectId: 'python',
        chapterId: 'py-ch23',
        chapterNumber: 23,
        pageNumber: 28,
        title: 'unittest, Assertions & Test-Driven Development',
        difficulty: 'intermediate',
        definition: 'Automated testing verifies code correctness. The standard library `unittest` module provides test runners, assertions, and test fixture lifecycle methods.',
        whyItMatters: 'Automated tests enable safe refactoring, catch regressions before production deployment, and serve as executable documentation of code specifications.',
        syntax: 'class TestFeature(unittest.TestCase):\n    def test_behavior(self):\n        self.assertEqual(a, b)',
        explanation: [
          'Test Discovery: Test methods must begin with the prefix `test_` to be discovered automatically.',
          'Assertions: `assertEqual(a, b)`, `assertTrue(x)`, `assertRaises(Exception)`, `assertIn(item, list)`.',
          'Fixtures: `setUp()` executes before every test method; `tearDown()` executes after every test method to clean up resources.',
          'Pytest approach: Modern Python widely adopts `pytest`, using simple `assert expr` statements and powerful dependency-injected fixtures.'
        ],
        example: {
          language: 'python',
          code: `import unittest

def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculates discounted price with boundary validations."""
    if not (0 <= discount_percent <= 100):
        raise ValueError("Discount must be between 0 and 100")
    if price < 0:
        raise ValueError("Price cannot be negative")
    return round(price * (1 - discount_percent / 100), 2)

class TestDiscountCalculator(unittest.TestCase):
    def test_standard_discount(self):
        self.assertEqual(calculate_discount(100.0, 20.0), 80.0)

    def test_zero_discount(self):
        self.assertEqual(calculate_discount(50.0, 0.0), 50.0)

    def test_invalid_discount_raises_error(self):
        with self.assertRaises(ValueError):
            calculate_discount(100.0, 150.0)

# Running test suite in-memory
suite = unittest.TestLoader().loadTestsFromTestCase(TestDiscountCalculator)
runner = unittest.TextTestRunner(verbosity=1)
result = runner.run(suite)`,
          output: '...\n----------------------------------------------------------------------\nRan 3 tests in 0.001s\n\nOK',
          annotations: [
            { line: 11, label: 'Subclassing unittest.TestCase', type: 'blue' },
            { line: 19, label: 'Testing that invalid input raises expected ValueError', type: 'yellow' }
          ]
        },
        important: 'Do NOT rely on Python `assert` statements for production security or data validation checks! Python eliminates all `assert` statements when run with optimization flags (`python -O`).',
        commonMistakes: [
          'Naming test methods without the `test_` prefix (e.g., `check_addition`), causing the test runner to silently skip them.',
          'Sharing mutable global state between tests without resetting in `tearDown()`.'
        ],
        tip: 'Run tests from terminal with `python -m unittest discover -v` to automatically find and run all test files matching `test_*.py`.',
        interviewNote: 'Question: "Why should you never use `assert` for user input validation?" Answer: "When Python runs with the `-O` (optimize) flag, all `assert` bytecode statements are stripped out, bypassing your validation entirely."',
        practiceQuestions: [
          {
            id: 'q-py23-1',
            type: 'mcq',
            question: 'What prefix must test method names have in unittest.TestCase to be executed by the test runner?',
            options: ['verify_', 'test_', 'spec_', 'assert_'],
            correctIndex: 1,
            explanation: 'The test runner automatically discovers and runs methods whose names begin with `test_`.'
          }
        ],
        relatedTopics: ['py-exceptions-ch15', 'py-type-hints-ch24']
      }
    ]
  },

  // CHAPTER 24 — TYPE HINTS & MODERN PYTHON
  {
    id: 'py-ch24',
    number: 24,
    title: 'Type Hints & Modern Python',
    description: 'Type annotations, typing module, dataclasses, and structural pattern matching',
    topics: [
      {
        id: 'py-type-hints-ch24',
        subjectId: 'python',
        chapterId: 'py-ch24',
        chapterNumber: 24,
        pageNumber: 29,
        title: 'Type Hints, @dataclass & Pattern Matching',
        difficulty: 'advanced',
        definition: 'Type hints (PEP 484) add optional static type annotations checked by tools like Mypy. `@dataclass` automatically generates boilerplate methods (`__init__`, `__repr__`).',
        whyItMatters: 'Type hints enable IDE autocompletion, eliminate whole classes of runtime type bugs in large teams, and power modern frameworks like FastAPI and Pydantic.',
        syntax: '@dataclass\nclass User:\n    id: int\n    name: str\n    email: str | None = None',
        explanation: [
          'Type Annotations: `name: str = "Alice"` and `def add(x: int, y: int) -> int:`.',
          'Modern Union Syntax (Python 3.10+): Use `int | str` instead of legacy `Union[int, str]`. Use `str | None` instead of `Optional[str]`.',
          '`@dataclass`: Generates `__init__`, `__repr__`, `__eq__`, and `__hash__` automatically from class type annotations.',
          'Structural Pattern Matching (`match...case`, Python 3.10+): Powerful switch/case that matches against object structures and extracts variables.'
        ],
        example: {
          language: 'python',
          code: `from dataclasses import dataclass

@dataclass
class APIResponse:
    status_code: int
    data: dict[str, str] | None = None
    error: str | None = None

# Pattern matching on structured response
def handle_response(res: APIResponse) -> str:
    match res:
        case APIResponse(status_code=200, data=d) if d:
            return f"Success: {d}"
        case APIResponse(status_code=404):
            return "Resource Not Found"
        case APIResponse(status_code=500, error=err):
            return f"Server Crash: {err}"
        case _:
            return "Unhandled response state"

print(handle_response(APIResponse(status_code=200, data={"user": "alice"})))
print(handle_response(APIResponse(status_code=404)))`,
          output: 'Success: {\'user\': \'alice\'}\nResource Not Found',
          annotations: [
            { line: 3, label: '@dataclass generates init, repr, eq automatically', type: 'blue' },
            { line: 10, label: 'Structural pattern matching (match/case)', type: 'yellow' },
            { line: 11, label: 'Guard condition "if d" inside pattern case', type: 'green' }
          ]
        },
        important: 'Python does NOT enforce type hints at runtime by default. `x: int = "hello"` will execute without error unless validated by an external tool (Mypy) or Pydantic.',
        commonMistakes: [
          'Confusing runtime type checking with static annotations. Type hints are for static analyzers and IDE tooling unless explicitly enforced by libraries.'
        ],
        tip: 'Run `mypy script.py` in your CI/CD pipeline to catch type mismatches before pushing code to production.',
        interviewNote: 'Question: "What methods does @dataclass generate automatically?" Answer: "By default, it generates `__init__()`, `__repr__()`, and `__eq__()`. If `order=True` is passed, it generates comparison dunder methods (`__lt__`, `__le__`, etc.). If `frozen=True`, it generates an immutable hashable dataclass."',
        practiceQuestions: [
          {
            id: 'q-py24-1',
            type: 'mcq',
            question: 'What is the modern Python 3.10+ syntax for a type that can be either an int or None?',
            options: ['int or None', 'int | None', 'Nullable[int]', 'Optional<int>'],
            correctIndex: 1,
            explanation: 'PEP 604 introduced the pipe operator `|` for union types, allowing `int | None` in place of `typing.Optional[int]`.'
          }
        ],
        relatedTopics: ['py-oop-ch16', 'py-testing-ch23']
      }
    ]
  },

  // CHAPTER 25 — CONCURRENCY & ASYNCHRONOUS PYTHON
  {
    id: 'py-ch25',
    number: 25,
    title: 'Concurrency & Asynchronous Python',
    description: 'Threading, Multiprocessing, the GIL, asyncio event loop, coroutines, and tasks',
    topics: [
      {
        id: 'py-concurrency-ch25',
        subjectId: 'python',
        chapterId: 'py-ch25',
        chapterNumber: 25,
        pageNumber: 30,
        title: 'Threading vs Multiprocessing vs Asyncio',
        difficulty: 'advanced',
        definition: 'Python offers three concurrency models: `threading` for I/O bound tasks, `multiprocessing` for CPU-bound parallelism, and `asyncio` for high-concurrency event-driven network I/O.',
        whyItMatters: 'Choosing the wrong model leads to CPU bottlenecks or thread starvation. Understanding the GIL ensures multi-core hardware is utilized efficiently.',
        syntax: 'import asyncio\nasync def fetch():\n    await asyncio.sleep(1)',
        explanation: [
          'Global Interpreter Lock (GIL): A mutex in CPython preventing multiple native threads from executing Python bytecode simultaneously in a single process.',
          'Threading: Lightweight OS threads. Effective for I/O-bound tasks (network calls, disk reads) where threads spend most time waiting.',
          'Multiprocessing: Spawns independent operating system processes, each with its own memory space and Python interpreter, bypassing the GIL for CPU-bound computations.',
          'Asyncio: Single-threaded cooperative multitasking using an event loop and coroutines (`async`/`await`). Capable of managing tens of thousands of concurrent network sockets.'
        ],
        example: {
          language: 'python',
          code: `import asyncio

async def fetch_api(service_name: str, delay_seconds: float) -> str:
    print(f"[{service_name}] Request dispatched...")
    # Non-blocking pause; frees event loop to run other coroutines
    await asyncio.sleep(delay_seconds)
    print(f"[{service_name}] Response received!")
    return f"{service_name}: 200 OK"

async def main():
    # Run concurrent API requests simultaneously
    results = await asyncio.gather(
        fetch_api("User Service", 0.05),
        fetch_api("Payment Gateway", 0.08),
        fetch_api("Email Dispatcher", 0.02)
    )
    print("All Services Completed:", results)

asyncio.run(main())`,
          output: '[User Service] Request dispatched...\n[Payment Gateway] Request dispatched...\n[Email Dispatcher] Request dispatched...\n[Email Dispatcher] Response received!\n[User Service] Response received!\n[Payment Gateway] Response received!\nAll Services Completed: [\'User Service: 200 OK\', \'Payment Gateway: 200 OK\', \'Email Dispatcher: 200 OK\']',
          annotations: [
            { line: 3, label: 'async def defines a coroutine function', type: 'blue' },
            { line: 6, label: 'await yields control back to event loop', type: 'yellow' },
            { line: 12, label: 'asyncio.gather executes coroutines concurrently', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Concurrency Decision Tree',
          subtitle: 'Matching problem characteristics to Python concurrency primitives',
          elements: [
            { id: '1', label: 'Workload Type', sublabel: 'Assess Task', value: 'I/O or CPU?', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'CPU-Bound (Math/Crypto)', sublabel: 'Need Multi-Core', value: 'multiprocessing', status: 'active' },
            { id: '3', label: 'High-Concurrency Network I/O', sublabel: 'WebSockets/APIs', value: 'asyncio', status: 'active' }
          ]
        },
        important: 'Do NOT call blocking synchronous calls (like `time.sleep()` or standard `requests.get()`) inside `async def` coroutines! They block the entire single-threaded event loop.',
        commonMistakes: [
          'Using `threading` to speed up intensive mathematical calculations or image processing. Because of the GIL, multithreaded CPU-bound Python runs slower than single-threaded!',
          'Calling a coroutine without `await`: `fetch_api()` returns a coroutine object without executing it.'
        ],
        tip: 'Use `aiohttp` or `httpx` instead of `requests` when writing asynchronous network scrapers or API clients.',
        interviewNote: 'Question: "What is the Global Interpreter Lock (GIL) and how do you bypass it?" Answer: "The GIL is a mutex preventing simultaneous Python bytecode execution by multiple threads in CPython. It is bypassed by using `multiprocessing`, writing C extensions, or running Python 3.13+ free-threaded build."',
        practiceQuestions: [
          {
            id: 'q-py25-1',
            type: 'mcq',
            question: 'Which concurrency model bypasses the CPython GIL for parallel CPU-intensive computations?',
            options: ['threading', 'asyncio', 'multiprocessing', 'generators'],
            correctIndex: 2,
            explanation: 'multiprocessing spawns separate OS processes, each with its own interpreter and memory space, allowing true parallel execution across multiple CPU cores.'
          }
        ],
        relatedTopics: ['py-memory-internals-ch26', 'py-app-dev-ch28']
      }
    ]
  },

  // CHAPTER 26 — MEMORY & PYTHON INTERNALS
  {
    id: 'py-ch26',
    number: 26,
    title: 'Memory & Python Internals',
    description: 'PyObject anatomy, reference counting, cyclic garbage collection, interning, and copy semantics',
    topics: [
      {
        id: 'py-memory-internals-ch26',
        subjectId: 'python',
        chapterId: 'py-ch26',
        chapterNumber: 26,
        pageNumber: 31,
        title: 'PyObject Architecture, Garbage Collection & Deep Copy',
        difficulty: 'advanced',
        definition: 'Every item in Python is a `PyObject` structure containing an object reference counter (`ob_refcnt`) and type descriptor (`ob_type`). CPython uses reference counting and a generational cyclic GC.',
        whyItMatters: 'Understanding memory management prevents circular reference memory leaks and shared mutability bugs with nested collections.',
        syntax: 'import copy\nshallow = copy.copy(obj)\ndeep = copy.deepcopy(obj)',
        explanation: [
          'Reference Counting: When `ob_refcnt` drops to zero, the object is immediately deallocated from memory.',
          'Cyclic Garbage Collector (`gc` module): Detects reference cycles (e.g. Object A points to B, and B points to A) across 3 generations (Gen 0, 1, 2).',
          'Shallow Copy vs Deep Copy: Shallow copy copies the outer container but retains references to inner objects. Deep copy recursively duplicates all nested objects.',
          'Small Integer Interning: CPython preallocates integers from -5 to 256 for rapid reuse.'
        ],
        example: {
          language: 'python',
          code: `import copy
import sys

# Reference counting inspection
data = [1, 2, 3]
# Note: getrefcount includes the temporary reference passed to the function
print("Initial refcount:", sys.getrefcount(data) - 1)
alias = data
print("After alias refcount:", sys.getrefcount(data) - 1)

# Shallow vs Deep Copy Demonstration
nested = [[1, 2], [3, 4]]
shallow = copy.copy(nested)
deep = copy.deepcopy(nested)

# Mutating an inner list
nested[0].append(99)
print("Original:", nested)
print("Shallow (Affected!):", shallow)
print("Deep (Preserved!):", deep)`,
          output: 'Initial refcount: 1\nAfter alias refcount: 2\nOriginal: [[1, 2, 99], [3, 4]]\nShallow (Affected!): [[1, 2, 99], [3, 4]]\nDeep (Preserved!): [[1, 2], [3, 4]]',
          annotations: [
            { line: 7, label: 'sys.getrefcount inspects ob_refcnt', type: 'blue' },
            { line: 16, label: 'Inner list mutation leaks into shallow copy', type: 'red' },
            { line: 19, label: 'Deep copy isolates all recursive child objects', type: 'green' }
          ]
        },
        important: '`list.copy()` and `[:]` create SHALLOW copies. If your list contains nested dictionaries, lists, or custom objects, modifying them will affect the copied list! Use `copy.deepcopy()` to clone deep structures.',
        commonMistakes: [
          'Creating 2D matrices using multiplication: `matrix = [[0] * 3] * 3`. This creates 3 references to the EXACT SAME list! Use `[[0 for _ in range(3)] for _ in range(3)]` instead.'
        ],
        tip: 'Use `sys.getsizeof(obj)` to inspect the byte footprint of standard objects in memory.',
        interviewNote: 'Question: "How does Python handle memory management?" Answer: "Primarily through reference counting for deterministic deallocation. A secondary generational cyclic garbage collector identifies and reclaims unreachable reference cycles."',
        practiceQuestions: [
          {
            id: 'q-py26-1',
            type: 'output',
            question: 'If `a = [[1]]; b = a.copy(); b[0].append(2)`, what is the value of `a`?',
            options: ['[[1]]', '[[1, 2]]', '[[2]]', 'Error'],
            correctIndex: 1,
            explanation: 'a.copy() performs a shallow copy. The outer lists are separate, but they both point to the exact same inner list [1], which is mutated to [1, 2].'
          }
        ],
        relatedTopics: ['py-mutability', 'py-concurrency-ch25']
      }
    ]
  },

  // CHAPTER 27 — PROFESSIONAL PYTHON
  {
    id: 'py-ch27',
    number: 27,
    title: 'Professional Python',
    description: 'Clean project layout, pyproject.toml, logging, PEP 8, and 12-factor secrets management',
    topics: [
      {
        id: 'py-professional-ch27',
        subjectId: 'python',
        chapterId: 'py-ch27',
        chapterNumber: 27,
        pageNumber: 32,
        title: 'Project Layout, logging & 12-Factor Configuration',
        difficulty: 'advanced',
        definition: 'Production-grade Python follows standardized project layouts (`src/` layout), declarative packaging (`pyproject.toml`), structured logging, and environment-based configuration.',
        whyItMatters: 'Professional practices prevent import path collisions, decouple configuration from source code, and enable observable monitoring in production cloud environments.',
        syntax: 'import logging\nlogging.basicConfig(level=logging.INFO)',
        explanation: [
          '`src/` Layout: Placing code in `src/my_package/` prevents accidental imports of uninstalled local files during testing.',
          'Structured Logging: Replace `print()` with `logging` (DEBUG, INFO, WARNING, ERROR, CRITICAL) with timestamps and loggers.',
          '12-Factor App Secrets: Read configuration from environment variables via `os.environ.get()` or `pydantic-settings`. Never commit API keys to Git.',
          '`pyproject.toml`: Modern PEP 621 unified specification for build systems, dependencies, and linter settings.'
        ],
        example: {
          language: 'python',
          code: `import logging
import os

# Configure structured enterprise logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("auth_service")

# 12-Factor: Safe environment variable retrieval
database_url = os.environ.get("DATABASE_URL", "sqlite:///dev.db")
api_port = int(os.environ.get("PORT", 8080))

logger.info(f"Service initialized on port {api_port}")
logger.warning("Using default dev database (DATABASE_URL not set in env)")`,
          output: '2026-10-01 16:35:00 [INFO] auth_service: Service initialized on port 8080\n2026-10-01 16:35:00 [WARNING] auth_service: Using default dev database (DATABASE_URL not set in env)',
          annotations: [
            { line: 4, label: 'Production logging configuration with timestamps', type: 'blue' },
            { line: 13, label: 'Reading environment variables with fallback defaults', type: 'yellow' }
          ]
        },
        important: 'NEVER commit hardcoded credentials or API keys into your source code repository. Always read secrets from environment variables or a `.env` file excluded by `.gitignore`.',
        commonMistakes: [
          'Using `print()` statements for production logging. `print()` lacks log levels, timestamps, formatting controls, and routing to files/log aggregators.'
        ],
        tip: 'Adopt `ruff` as an ultra-fast all-in-one linter and formatter. It replaces Flake8, isort, and Black with 10x-100x faster Rust execution.',
        interviewNote: 'Question: "What is the src layout and why is it recommended?" Answer: "The `src` layout places package code inside a `src/` directory. This prevents tests from accidentally running against local source files instead of the installed build artifact, catching packaging errors early."',
        practiceQuestions: [
          {
            id: 'q-py27-1',
            type: 'mcq',
            question: 'What is the standard log level hierarchy in Python logging from lowest to highest severity?',
            options: [
              'DEBUG < INFO < WARNING < ERROR < CRITICAL',
              'INFO < DEBUG < WARNING < ERROR < CRITICAL',
              'TRACE < DEBUG < INFO < SEVERE',
              'ERROR < WARNING < INFO < DEBUG'
            ],
            correctIndex: 0,
            explanation: 'Python logging levels escalate from DEBUG (10) -> INFO (20) -> WARNING (30) -> ERROR (40) -> CRITICAL (50).'
          }
        ],
        relatedTopics: ['py-testing-ch23', 'py-app-dev-ch28']
      }
    ]
  },

  // CHAPTER 28 — PYTHON APPLICATION DEVELOPMENT
  {
    id: 'py-ch28',
    number: 28,
    title: 'Python Application Development',
    description: 'CLI tools with argparse, HTTP clients with requests, REST APIs, and modern web frameworks',
    topics: [
      {
        id: 'py-app-dev-ch28',
        subjectId: 'python',
        chapterId: 'py-ch28',
        chapterNumber: 28,
        pageNumber: 33,
        title: 'Building CLI Tools & Consuming REST APIs',
        difficulty: 'advanced',
        definition: 'Application development in Python bridges core language constructs into production utilities using CLI arguments (`argparse`), HTTP APIs (`requests`/`httpx`), and web servers.',
        whyItMatters: 'Writing CLI utilities and consuming REST services allows software engineers to automate deployment pipelines, query cloud services, and build microservices.',
        syntax: 'import argparse\nparser = argparse.ArgumentParser()\nparser.add_argument("--user", required=True)',
        explanation: [
          '`argparse`: Standard library module for creating user-friendly command-line interfaces with automatic `--help` flags and type validation.',
          'HTTP Requests: Using `requests` or `urllib.request` to send GET/POST requests with headers, status code checks, and JSON payloads.',
          'Status Code Discipline: Always verify `res.status_code == 200` or call `res.raise_for_status()`.',
          'Modern Web Frameworks: FastAPI and Flask provide lightweight routing, dependency injection, and automatic OpenAPI schema documentation.'
        ],
        example: {
          language: 'python',
          code: `import json
import urllib.request

def fetch_ip_info() -> dict:
    """Fetch client network details using standard library urllib."""
    url = "https://httpbin.org/get"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "CODEINK-App/1.0"}
    )
    # Context manager ensures HTTP socket is closed cleanly
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            payload = json.loads(response.read().decode("utf-8"))
            return {"origin": payload.get("origin"), "status": response.status}
    return {"status": response.status}

# Mock representation of safe API response handling
mock_res = {"origin": "192.0.2.1", "status": 200}
print(f"API Connected successfully -> Client IP: {mock_res['origin']}")`,
          output: 'API Connected successfully -> Client IP: 192.0.2.1',
          annotations: [
            { line: 5, label: 'Custom HTTP Request object with User-Agent header', type: 'blue' },
            { line: 10, label: 'Safe socket context manager with response status verification', type: 'green' }
          ]
        },
        important: 'Always set explicit timeouts on HTTP requests (`timeout=5.0`). Without timeouts, your application can hang indefinitely if a remote server drops packets.',
        commonMistakes: [
          'Failing to specify HTTP timeouts on client requests, causing thread exhaustion in production during downstream network outages.'
        ],
        tip: 'For modern production web APIs, prefer FastAPI over Flask. FastAPI provides native async support, automatic OpenAPI/Swagger docs, and automatic Pydantic validation.',
        interviewNote: 'Question: "What is the difference between synchronous and asynchronous HTTP requests?" Answer: "Synchronous requests block the entire execution thread until the server responds. Asynchronous requests yield control to the event loop, allowing thousands of other requests to proceed concurrently while waiting for I/O."',
        practiceQuestions: [
          {
            id: 'q-py28-1',
            type: 'mcq',
            question: 'What standard library module is used to parse command-line flags and options in Python scripts?',
            options: ['argparse', 'cli_parser', 'sysargs', 'cmdline'],
            correctIndex: 0,
            explanation: 'The `argparse` module is the standard library recommendation for command-line parsing, generating automated help and handling typed parameters.'
          }
        ],
        relatedTopics: ['py-concurrency-ch25', 'py-projects-ch30']
      }
    ]
  },

  // CHAPTER 29 — PYTHON INTERVIEW & PROBLEM SOLVING
  {
    id: 'py-ch29',
    number: 29,
    title: 'Python Interview & Problem Solving',
    description: 'High-yield technical interview questions, algorithmic patterns, and common language traps',
    topics: [
      {
        id: 'py-interview-ch29',
        subjectId: 'python',
        chapterId: 'py-ch29',
        chapterNumber: 29,
        pageNumber: 34,
        title: 'Interview Masterclass: Traps, Interning & Gotchas',
        difficulty: 'advanced',
        definition: 'Python technical interviews test language depth, algorithmic optimization, memory gotchas (mutable defaults, scope resolution), and edge-case reasoning.',
        whyItMatters: 'Mastering classic Python gotchas distinguishes engineers who truly understand CPython internals from developers who only know basic surface syntax.',
        syntax: 'def gotcha(x, acc=None):\n    if acc is None:\n        acc = []',
        explanation: [
          'Trap 1: Mutable Default Argument. `def append_to(val, lst=[])` mutates the same list across all function invocations.',
          'Trap 2: Late Binding in Closures. Functions defined in loops look up loop variables at call time, not definition time. Fix: `[lambda x, i=i: x + i for i in range(5)]`.',
          'Trap 3: Modifying a collection while iterating over it. Always iterate over a copy or use a list comprehension.',
          'Trap 4: `is` vs `==`. Small integers are cached (-5 to 256), but larger numbers allocate distinct heap objects.'
        ],
        example: {
          language: 'python',
          code: `# Gotcha: Late binding in closures
funcs = [lambda: i for i in range(3)]
print("Late binding results (All point to final i=2):", [f() for f in funcs])

# Fix: Default argument binds variable at definition time
fixed_funcs = [lambda i=i: i for i in range(3)]
print("Fixed early binding results:", [f() for f in fixed_funcs])

# Algorithmic: Two-Sum in O(n) using dict hash map
def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:
    seen = {}
    for idx, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return (seen[complement], idx)
        seen[num] = idx
    return None

print("Two-Sum indices for [2, 7, 11, 15] target 9:", two_sum([2, 7, 11, 15], 9))`,
          output: 'Late binding results (All point to final i=2): [2, 2, 2]\nFixed early binding results: [0, 1, 2]\nTwo-Sum indices for [2, 7, 11, 15] target 9: (0, 1)',
          annotations: [
            { line: 2, label: 'Classic trap: lambda closures bind variables late', type: 'red' },
            { line: 6, label: 'Fix: default arg evaluates and freezes i at loop step', type: 'green' },
            { line: 10, label: 'O(n) hash map algorithm eliminates nested O(n^2) loops', type: 'yellow' }
          ]
        },
        important: 'Remember the closure late-binding gotcha: closures look up variables when CALLED, not when defined. Default arguments evaluate at DEFINITION time.',
        commonMistakes: [
          'Answering that `is` and `==` are interchangeable for primitive types.'
        ],
        tip: 'In coding interviews, always state the Time Complexity and Space Complexity using Big-O notation before you write a single line of code.',
        interviewNote: 'Question: "What is the difference between __new__ and __init__?" Answer: "`__new__` is the static method that actually allocates and returns the new object instance in memory. `__init__` is the instance method that initializes the already-allocated instance."',
        practiceQuestions: [
          {
            id: 'q-py29-1',
            type: 'output',
            question: 'What is printed by: `funcs = [lambda: i for i in range(3)]; print([f() for f in funcs])`?',
            options: ['[0, 1, 2]', '[2, 2, 2]', '[3, 3, 3]', 'SyntaxError'],
            correctIndex: 1,
            explanation: 'Python closures are late binding: they look up `i` when called. After the loop completes, `i` is 2, so all lambdas return 2.'
          }
        ],
        relatedTopics: ['py-memory-internals-ch26', 'py-projects-ch30']
      }
    ]
  },

  // CHAPTER 30 — PYTHON PROJECTS
  {
    id: 'py-ch30',
    number: 30,
    title: 'Python Projects',
    description: 'Complete end-to-end practical project walkthroughs from beginner CLI tools to intermediate systems',
    topics: [
      {
        id: 'py-projects-ch30',
        subjectId: 'python',
        chapterId: 'py-ch30',
        chapterNumber: 30,
        pageNumber: 35,
        title: 'Capstone Projects: CLI Task Ledger & JSON Persistence',
        difficulty: 'advanced',
        definition: 'Capstone projects integrate data structures, file persistence, OOP, error handling, and modular architecture into complete working software systems.',
        whyItMatters: 'Synthesizing separate concepts (OOP, JSON, CLI, Exception handling) into a cohesive project solidifies practical software engineering capability.',
        syntax: 'class TaskLedger:\n    def save(self):\n        pass',
        explanation: [
          'Architecture: Separation of data model (`Task` dataclass), storage repository (`TaskStorage` with JSON), and user interaction layer.',
          'Clean Error Handling: Gracefully handling corrupted JSON, missing files, and invalid user commands.',
          'Data Integrity: Using atomic writes or safe serialization to prevent data loss during interruptions.',
          'Extensibility: Clean separation allows swapping file storage with SQLite without modifying the CLI interface.'
        ],
        example: {
          language: 'python',
          code: `from dataclasses import dataclass, asdict
import json

@dataclass
class Task:
    id: int
    title: str
    completed: bool = False

class TaskManager:
    """Manages tasks with in-memory state and JSON serialization."""
    def __init__(self):
        self.tasks: list[Task] = []
        self._next_id = 1

    def add_task(self, title: str) -> Task:
        task = Task(id=self._next_id, title=title)
        self.tasks.append(task)
        self._next_id += 1
        return task

    def complete_task(self, task_id: int) -> bool:
        for t in self.tasks:
            if t.id == task_id:
                t.completed = True
                return True
        return False

    def to_json(self) -> str:
        return json.dumps([asdict(t) for t in self.tasks], indent=2)

# Execution simulation
app = TaskManager()
t1 = app.add_task("Master Python Foundations")
t2 = app.add_task("Complete CODEINK Practice Sessions")
app.complete_task(t1.id)

print("Exported JSON State:")
print(app.to_json())`,
          output: 'Exported JSON State:\n[\n  {\n    "id": 1,\n    "title": "Master Python Foundations",\n    "completed": true\n  },\n  {\n    "id": 2,\n    "title": "Complete CODEINK Practice Sessions",\n    "completed": false\n  }\n]',
          annotations: [
            { line: 4, label: 'Data model defined with @dataclass', type: 'blue' },
            { line: 10, label: 'Domain service encapsulating business rules', type: 'yellow' },
            { line: 27, label: 'asdict converts dataclasses into serializable dicts', type: 'green' }
          ]
        },
        important: 'Always decouple your business logic from your display/input logic. The `TaskManager` class above has zero `input()` or `print()` calls, making it 100% unit-testable.',
        commonMistakes: [
          'Mixing terminal `input()` and `print()` calls directly inside data models or database classes.'
        ],
        tip: 'Congratulations! You have covered the full breadth of Python from foundations to architecture. Continue by taking the 160-Mark Final Examination Paper.',
        interviewNote: 'Question: "What is separation of concerns and how do you achieve it in Python?" Answer: "By separating data definitions (dataclasses), business logic (service classes), persistence (repository modules), and user interfaces (CLI/web handlers) into distinct layers."',
        practiceQuestions: [
          {
            id: 'q-py30-1',
            type: 'mcq',
            question: 'What helper function converts a dataclass instance into a standard Python dictionary for JSON serialization?',
            options: ['dict(obj)', 'asdict(obj)', 'obj.to_dict()', 'serialize(obj)'],
            correctIndex: 1,
            explanation: 'The `dataclasses.asdict(instance)` function recursively converts a dataclass instance into a standard Python dictionary.'
          }
        ],
        relatedTopics: ['py-type-hints-ch24', 'py-file-handling-ch14']
      }
    ]
  }
];
