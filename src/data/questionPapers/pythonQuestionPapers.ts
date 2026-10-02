import { SubjectQuestionPapers } from '../../types/notebook';

export const PYTHON_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'python',
  subjectName: 'Python Programming & Software Engineering',
  courseCode: 'CS-103-PY',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-103-PY-S1',
      title: 'Python Core & Architecture Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-103-PY',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY. Each question carries 1 Mark (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions. Each question carries 5 Marks (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions. Each question carries 10 Marks (2 × 10 = 20 Marks).',
        'Write clean Python code adhering to PEP 8 standards with clear variable traces and dry runs.'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark. Answer concisely in your notebook.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'py-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Mutable vs Immutable Types',
              question: 'Classify the following Python types as either Mutable or Immutable: `tuple`, `list`, `frozenset`, `dict`.',
              markingBreakdown: ['All 4 correctly classified: 1 Mark'],
              modelSolution: '`tuple`: Immutable, `list`: Mutable, `frozenset`: Immutable, `dict`: Mutable.',
              notebookCheckpoints: ['tuple: immutable', 'list: mutable', 'frozenset: immutable', 'dict: mutable']
            },
            {
              id: 'py-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Default Parameter Pitfall',
              question: 'What is printed after calling `foo()` twice given: `def foo(items=[]): items.append(1); return items`?',
              markingBreakdown: ['Explains shared default list producing [1, 1]: 1 Mark'],
              modelSolution: 'First call returns `[1]`. Second call returns `[1, 1]`. Default parameter expressions in Python are evaluated once at function definition time, so the same mutable list object is shared across all calls.',
              notebookCheckpoints: ['Second call gives [1, 1]', 'Default argument evaluated once at definition']
            },
            {
              id: 'py-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Identity vs Equality',
              question: 'Differentiate between the `is` operator and the `==` operator in Python.',
              markingBreakdown: ['is checks memory id(), == checks value equality: 1 Mark'],
              modelSolution: '`is` checks identity (whether two references point to the exact same object in memory, comparing `id(a) == id(b)`). `==` checks value equality (whether two objects have equivalent contents by calling `__eq__`).',
              notebookCheckpoints: ['is = memory identity', '== = value equality']
            },
            {
              id: 'py-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Global Interpreter Lock (GIL)',
              question: 'What is the Global Interpreter Lock (GIL) in CPython, and which type of workload (CPU-bound vs I/O-bound) is bottlenecked by it?',
              markingBreakdown: ['Mutex preventing parallel Python bytecode execution, bottlenecks CPU-bound workloads: 1 Mark'],
              modelSolution: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecode simultaneously on separate CPU cores. It bottlenecks multi-threaded CPU-bound workloads (math, image processing).',
              notebookCheckpoints: ['CPython thread mutex', 'Bottlenecks CPU-bound tasks']
            },
            {
              id: 'py-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'List Comprehension Scope',
              question: 'What is the output of `[x * 2 for x in range(4) if x % 2 == 0]`?',
              markingBreakdown: ['Correct output list [0, 4]: 1 Mark'],
              modelSolution: 'Output: `[0, 4]`. The range produces 0, 1, 2, 3. The condition filters for even numbers (0 and 2). Multiplying by 2 produces 0 and 4.',
              notebookCheckpoints: ['[0, 4]']
            },
            {
              id: 'py-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Generator Yield',
              question: 'What is the memory advantage of using a Generator function with `yield` instead of returning a complete `list`?',
              markingBreakdown: ['Lazy O(1) memory evaluation on demand: 1 Mark'],
              modelSolution: 'Generators evaluate items lazily on-demand, maintaining $O(1)$ memory consumption regardless of whether generating 10 or 10,000,000 items, whereas returning a list allocates memory for all elements upfront.',
              notebookCheckpoints: ['O(1) memory consumption', 'Lazy on-demand evaluation']
            },
            {
              id: 'py-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Dunder Methods: `__repr__` vs `__str__`',
              question: 'Explain the distinct goals of `__repr__` versus `__str__` in a Python class.',
              markingBreakdown: ['repr is unambiguous for developers, str is readable for end-users: 1 Mark'],
              modelSolution: '`__repr__` is intended to provide an unambiguous, complete representation of the object (often valid Python code to recreate the object) for developers and debugging. `__str__` is intended to provide a friendly, human-readable string for end-users.',
              notebookCheckpoints: ['repr: unambiguous / debugging', 'str: user-facing readable']
            },
            {
              id: 'py-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Dictionary Key Requirements',
              question: 'Why can a `tuple` containing integers be used as a dictionary key, but a `tuple` containing a `list` (e.g. `(1, [2, 3])`) cannot?',
              markingBreakdown: ['Dictionary keys must be hashable; mutable members invalidate hash: 1 Mark'],
              modelSolution: 'Dictionary keys must be Hashable (`__hash__`). A tuple is immutable, but if it contains a mutable object like a `list`, its contents can change, violating hash invariants. Python raises `TypeError: unhashable type: \'list\'`.',
              notebookCheckpoints: ['Must be hashable', 'Lists are mutable / unhashable']
            },
            {
              id: 'py-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Context Managers',
              question: 'Which two magic dunder methods must a class implement to support the `with` statement?',
              markingBreakdown: ['__enter__ and __exit__: 1 Mark'],
              modelSolution: '`__enter__(self)` and `__exit__(self, exc_type, exc_val, exc_tb)`.',
              notebookCheckpoints: ['__enter__', '__exit__']
            },
            {
              id: 'py-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Unpacking Operators',
              question: 'Given `a = [1, 2]` and `b = [3, 4]`, write a single expression using the `*` operator to merge them into a single list.',
              markingBreakdown: ['[*a, *b]: 1 Mark'],
              modelSolution: '`merged = [*a, *b]` (evaluates to `[1, 2, 3, 4]`).',
              notebookCheckpoints: ['[*a, *b]']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Short Analytical & Implementation Problems',
          instruction: 'Attempt ANY 4 questions out of 7. Each question carries 5 Marks (4 × 5 = 20 Marks). Show complete working in your notebook.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Decorators: Execution Timer',
              question: 'Write a custom function decorator `@timing_decorator` that measures the execution time of any decorated function using `time.perf_counter()` and prints the function name and duration. Use `functools.wraps` to preserve the original function metadata.',
              markingBreakdown: [
                'Decorator structure and wrapper function: 2 Marks',
                'time.perf_counter timing calculation: 1.5 Marks',
                '@functools.wraps preservation: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
import time
import functools

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"Function {func.__name__} took {duration:.6f} seconds")
        return result
    return wrapper

@timing_decorator
def compute_sum(n):
    return sum(i * i for i in range(n))
\`\`\``,
              notebookCheckpoints: [
                'Use functools.wraps(func)',
                'Accept *args and **kwargs in wrapper',
                'Return func(*args, **kwargs)'
              ]
            },
            {
              id: 'py-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Custom Context Manager Class',
              question: 'Implement a custom Context Manager class `DatabaseTransaction` using `__enter__` and `__exit__` that simulates committing on success and rolling back if an exception is raised.',
              markingBreakdown: [
                'Class structure with __enter__: 2 Marks',
                '__exit__ handling exceptions and returning False: 3 Marks'
              ],
              modelSolution: `\`\`\`python
class DatabaseTransaction:
    def __init__(self, connection_name):
        self.connection_name = connection_name

    def __enter__(self):
        print(f"[{self.connection_name}] Beginning database transaction...")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"[{self.connection_name}] Rolled back transaction due to {exc_type.__name__}: {exc_val}")
            return False  # Propagate exception to caller
        else:
            print(f"[{self.connection_name}] Committed transaction successfully.")
            return True
\`\`\``,
              notebookCheckpoints: [
                'Check exc_type is not None in __exit__',
                'Return False to propagate exception'
              ]
            },
            {
              id: 'py-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Object-Oriented: Properties & Validation',
              question: 'Create a Python class `BankAccount` with a private attribute `_balance`.\n(a) Implement `@property` getter `balance` returning balance formatted as currency.\n(b) Implement `@balance.setter` validating that deposit amounts cannot be negative (raise `ValueError`).\n(c) Implement a method `withdraw(amount)` with funds check.',
              markingBreakdown: [
                '@property getter: 1.5 Marks',
                '@balance.setter validation logic: 2 Marks',
                'withdraw with overdraft check: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
class BankAccount:
    def __init__(self, initial_balance=0.0):
        self._balance = 0.0
        self.balance = initial_balance  # Triggers setter validation

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = float(value)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        return self._balance
\`\`\``,
              notebookCheckpoints: [
                '@property decorator',
                '@balance.setter decorator',
                'Raise ValueError for negative values'
              ]
            },
            {
              id: 'py-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Generator Pipelines',
              question: 'Build a streaming generator pipeline in Python that processes large access logs without loading the full file into memory:\n1. Generator `read_lines(filepath)` yielding one line at a time.\n2. Generator `filter_errors(lines)` yielding only lines containing `"ERROR"`.\n3. Generator `parse_ips(error_lines)` extracting the IP address.\nDemonstrate how these 3 generators chain together.',
              markingBreakdown: [
                'read_lines generator: 1.5 Marks',
                'filter_errors generator: 1.5 Marks',
                'parse_ips and pipeline demonstration: 2 Marks'
              ],
              modelSolution: `\`\`\`python
def read_lines(filepath):
    with open(filepath, 'r') as f:
        for line in f:
            yield line.strip()

def filter_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

def parse_ips(error_lines):
    for line in error_lines:
        ip = line.split()[0] # Extract first column IP
        yield ip

# Composed pipeline (zero memory overhead)
log_stream = parse_ips(filter_errors(read_lines("server.log")))
\`\`\``,
              notebookCheckpoints: [
                'Yield inside each generator',
                'Compose generators: parse_ips(filter_errors(read_lines(...)))'
              ]
            },
            {
              id: 'py-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Method Resolution Order (MRO)',
              question: 'Explain how the C3 Linearization Algorithm determines the Method Resolution Order (MRO) in multiple inheritance. Trace the exact MRO for class `D` given:\n```python\nclass A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n```',
              markingBreakdown: [
                'C3 linearization principles explanation: 2 Marks',
                'Step-by-step resolution trace: 2 Marks',
                'Final MRO: D -> B -> C -> A -> object: 1 Mark'
              ],
              modelSolution: `C3 Linearization guarantees monotonicity and respects local precedence ordering.

MRO Computation:
L(A) = [A, object]
L(B) = [B] + merge(L(A), [A]) = [B, A, object]
L(C) = [C] + merge(L(A), [A]) = [C, A, object]
L(D) = [D] + merge(L(B), L(C), [B, C])
     = [D] + merge([B, A, object], [C, A, object], [B, C])
     = [D, B] + merge([A, object], [C, A, object], [C])  # B is good head
     = [D, B, C] + merge([A, object], [A, object])       # C is good head
     = [D, B, C, A, object]

Final MRO: D -> B -> C -> A -> object. Verified via \`D.__mro__\`.`,
              notebookCheckpoints: [
                'State final MRO: D, B, C, A, object',
                'Explain why B precedes C (order in class definition)'
              ]
            },
            {
              id: 'py-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Functional Programming: map, filter, reduce',
              question: 'Without using `for` loops, implement the following using `map`, `filter`, and `functools.reduce` on list `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`:\n(a) Filter all odd numbers.\n(b) Square the filtered numbers.\n(c) Compute the total sum of the squared numbers.',
              markingBreakdown: [
                'filter odd numbers: 1.5 Marks',
                'map squaring: 1.5 Marks',
                'reduce summation: 2 Marks'
              ],
              modelSolution: `\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# (a) Filter odds (keep evens)
evens = filter(lambda x: x % 2 == 0, numbers)

# (b) Square
squared = map(lambda x: x * x, evens)

# (c) Sum using reduce
total_sum = reduce(lambda acc, x: acc + x, squared, 0)
print("Total:", total_sum) # 2^2 + 4^2 + 6^2 + 8^2 + 10^2 = 220
\`\`\``,
              notebookCheckpoints: [
                'Use lambda expressions',
                'functools.reduce with initial value 0',
                'Final answer: 220'
              ]
            },
            {
              id: 'py-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Exception Hierarchy & Custom Exceptions',
              question: 'Design a domain-specific custom exception hierarchy for an e-commerce checkout service in Python. Implement a base `CheckoutError`, and derived subclasses `InventoryDepletedError` and `PaymentGatewayError`. Show how a caller catches them polymorphically.',
              markingBreakdown: [
                'Custom exception class hierarchy: 2.5 Marks',
                'Polymorphic try-except demonstration: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
class CheckoutError(Exception):
    """Base exception for all checkout failures."""
    def __init__(self, message, order_id):
        super().__init__(message)
        self.order_id = order_id

class InventoryDepletedError(CheckoutError):
    def __init__(self, item_sku, order_id):
        super().__init__(f"SKU {item_sku} is out of stock.", order_id)
        self.item_sku = item_sku

class PaymentGatewayError(CheckoutError):
    def __init__(self, status_code, order_id):
        super().__init__(f"Payment declined with code {status_code}.", order_id)
        self.status_code = status_code

# Polymorphic handling
def process_order(order_id):
    try:
        raise InventoryDepletedError("LAPTOP-X1", order_id)
    except InventoryDepletedError as e:
        print(f"Inventory alert for {e.item_sku}")
    except CheckoutError as e:
        print(f"General checkout failure on order {e.order_id}")
\`\`\``,
              notebookCheckpoints: [
                'Inherit from Exception',
                'Call super().__init__(message)',
                'Polymorphic except CheckoutError'
              ]
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Systems Design',
          instruction: 'Attempt ANY 2 questions out of 3. Each question carries 10 Marks (2 × 10 = 20 Marks). Write complete, production-grade Python architectures.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Asynchronous Programming: `asyncio` Web Crawler Engine',
              question: 'Construct an asynchronous, high-concurrency web scraper engine in Python using `asyncio`:\n(a) Class `AsyncCrawler` managing a queue of URLs to visit and a set of visited URLs.\n(b) Concurrency limiter using `asyncio.Semaphore(10)` to prevent flooding target servers.\n(c) Asynchronous worker coroutine `async def worker(self)` executing concurrent fetch tasks.\n(d) Graceful shutdown on cancellation.\n(e) Contrast cooperative multitasking in `asyncio` with preemptive multi-threading.',
              markingBreakdown: [
                'AsyncCrawler class and queue setup: 2.5 Marks',
                'asyncio.Semaphore concurrency limiting: 3 Marks',
                'Worker coroutine and task gathering: 2.5 Marks',
                'Cooperative vs preemptive multitasking comparison: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import asyncio
import time

class AsyncCrawler:
    def __init__(self, max_concurrency=10):
        self.queue = asyncio.Queue()
        self.visited = set()
        self.semaphore = asyncio.Semaphore(max_concurrency)

    async def fetch(self, url):
        async with self.semaphore:
            print(f"Fetching: {url}")
            # Simulate asynchronous non-blocking network I/O
            await asyncio.sleep(0.1)
            return f"<html>Content for {url}</html>"

    async def worker(self):
        while True:
            url = await self.queue.get()
            try:
                content = await self.fetch(url)
                self.visited.add(url)
            except Exception as e:
                print(f"Error fetching {url}: {e}")
            finally:
                self.queue.task_done()

    async def run(self, seed_urls, num_workers=5):
        for url in seed_urls:
            await self.queue.put(url)

        # Launch background worker tasks
        workers = [asyncio.create_task(self.worker()) for _ in range(num_workers)]
        await self.queue.join() # Wait until all items processed

        # Cancel workers
        for w in workers:
            w.cancel()
\`\`\`
Multitasking Comparison:
- Preemptive Multi-Threading: OS kernel switches threads at arbitrary CPU cycle intervals, requiring mutex locks to prevent race conditions. High memory per thread stack (~8MB).
- Cooperative Multitasking (asyncio): Single-threaded event loop. Tasks explicitly yield control at \`await\` points. Extremely lightweight (~1KB per coroutine), enabling 100,000+ concurrent connections.`,
              notebookCheckpoints: [
                'async with self.semaphore:',
                'asyncio.create_task(self.worker())',
                'await self.queue.join()',
                'Explain cooperative vs preemptive multitasking'
              ]
            },
            {
              id: 'py-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Metaclasses & API Framework Design',
              question: 'In Python, everything is an object, including classes.\n(a) Explain what a Metaclass is and when `__new__` and `__init__` in `type` are executed.\n(b) Implement a custom metaclass `ModelMeta` for an ORM that inspects class attributes, detects instances of `Field`, and automatically registers them in a dictionary `_fields`.\n(c) Implement a base `Model` class powered by `ModelMeta` that auto-generates `__init__` based on registered fields.',
              markingBreakdown: [
                'Metaclass theory and role of type: 2.5 Marks',
                'ModelMeta __new__ attribute inspection: 4 Marks',
                'Base Model auto __init__ generation: 2 Marks',
                'Demonstration class with Fields: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
class Field:
    def __init__(self, data_type, required=True):
        self.data_type = data_type
        self.required = required

class ModelMeta(type):
    def __new__(mcs, name, bases, attrs):
        fields = {}
        for key, value in list(attrs.items()):
            if isinstance(value, Field):
                fields[key] = value
                del attrs[key] # Remove class attribute so instances hold values
        attrs['_fields'] = fields
        return super().__new__(mcs, name, bases, attrs)

class Model(metaclass=ModelMeta):
    def __init__(self, **kwargs):
        for field_name, field_obj in self._fields.items():
            if field_name in kwargs:
                val = kwargs[field_name]
                if not isinstance(val, field_obj.data_type):
                    raise TypeError(f"{field_name} must be {field_obj.data_type.__name__}")
                setattr(self, field_name, val)
            elif field_obj.required:
                raise ValueError(f"Missing required field: {field_name}")

# Demonstration
class User(Model):
    name = Field(str)
    age = Field(int)

u = User(name="Alice", age=25)
print(f"Created: {u.name}, age {u.age}")
\`\`\``,
              notebookCheckpoints: [
                'class ModelMeta(type):',
                'Inspect attrs for isinstance(val, Field)',
                'Attach _fields dictionary to class'
              ]
            },
            {
              id: 'py-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Memory Profiling & CPython Internals',
              question: 'Analyze memory optimization in Python at scale:\n(a) Explain what `__slots__` does and how it eliminates the per-instance `__dict__` overhead in CPython.\n(b) Write a benchmark class `NormalPoint` vs `SlottedPoint` (with `x` and `y` coordinates) and calculate memory usage differences using `sys.getsizeof`.\n(c) Explain CPython\'s Garbage Collector: Reference Counting (`ob_refcnt`) vs Generational Cyclic GC (Gen 0, Gen 1, Gen 2).\n(d) Write code demonstrating how circular references bypass reference counting.',
              markingBreakdown: [
                '__slots__ mechanics and __dict__ removal: 3 Marks',
                'NormalPoint vs SlottedPoint code and memory comparison: 2.5 Marks',
                'Generational GC (Gen 0, 1, 2) explanation: 2.5 Marks',
                'Circular reference code example: 2 Marks'
              ],
              modelSolution: `(a) __slots__ Mechanics:
By default, every Python instance stores attributes in a dynamic dictionary (__dict__), which consumes ~150-200 bytes per object to support adding arbitrary attributes.
Defining \`__slots__ = ('x', 'y')\` tells CPython to allocate a fixed-size C array of pointer descriptors directly inside the PyObject struct, completely eliminating the __dict__ and reducing memory per instance to ~48 bytes.

\`\`\`python
import sys

class NormalPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class SlottedPoint:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y
\`\`\`

(c) CPython Garbage Collection:
1. Reference Counting: Every PyObject has an \`ob_refcnt\` field. Whenever a reference is created, refcnt increments; when a reference goes out of scope, refcnt decrements. If refcnt reaches 0, memory is freed instantly in O(1) time.
2. Cyclic Garbage Collector: Reference counting cannot detect circular references (A -> B and B -> A). Python uses a generational GC that periodically inspects tracked container objects across 3 generations:
- Generation 0 (young objects collected frequently)
- Generation 1
- Generation 2 (long-lived objects collected rarely)

\`\`\`python
# (d) Circular Reference Demonstration
class Node:
    def __init__(self):
        self.neighbor = None

def leak():
    n1 = Node()
    n2 = Node()
    n1.neighbor = n2
    n2.neighbor = n1
    # n1 and n2 go out of scope, but refcnt for both remains 1!
    # They can only be reclaimed when the cyclic GC runs.
\`\`\``,
              notebookCheckpoints: [
                '__slots__ removes __dict__',
                'ob_refcnt deallocation when 0',
                'Circular reference code with neighbor pointers'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-103-PY-S2',
      title: 'Python Data Engineering & Systems Architecture Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-103-PY',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark. Answer concisely in your notebook.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'py-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Structural Pattern Matching',
              question: 'In Python 3.10+, write the `match/case` syntax to match a point tuple `(0, y)` and bind `y`.',
              markingBreakdown: ['case (0, y):: 1 Mark'],
              modelSolution: '`case (0, y):` (matches any 2-tuple where first element is 0, binding second element to variable `y`).',
              notebookCheckpoints: ['case (0, y):']
            },
            {
              id: 'py-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Walrus Operator (:=)',
              question: 'What does the assignment expression operator (`:=`) do, and why is it useful in `while` loops?',
              markingBreakdown: ['Assigns value to variable as part of an expression: 1 Mark'],
              modelSolution: 'The walrus operator (`:=`) assigns values to variables as part of a larger expression, allowing assignments directly inside loop conditions (e.g. `while (line := file.readline()):`).',
              notebookCheckpoints: ['Assigns within expression', 'Eliminates redundant priming reads']
            },
            {
              id: 'py-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Shallow vs Deep Copy',
              question: 'What is the danger of using shallow copy (`list.copy()`) on nested lists like `[[1, 2], [3, 4]]`?',
              markingBreakdown: ['Inner child references are shared and mutate together: 1 Mark'],
              modelSolution: 'A shallow copy copies only the outer list container; the inner sublists remain shared references. Modifying `copy[0].append(99)` also mutates the original list.',
              notebookCheckpoints: ['Inner references remain shared']
            },
            {
              id: 'py-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'dataclass Keyword',
              question: 'What special methods does the `@dataclass` decorator automatically synthesize for a class?',
              markingBreakdown: ['__init__, __repr__, and __eq__: 1 Mark'],
              modelSolution: 'It automatically generates `__init__`, `__repr__`, and `__eq__` (and optionally comparison operators and hash methods).',
              notebookCheckpoints: ['__init__, __repr__, __eq__']
            },
            {
              id: 'py-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Type Hinting & Union Types',
              question: 'In Python 3.10+, write the modern syntax to type-hint a parameter that accepts either an `int` or `None`.',
              markingBreakdown: ['int | None: 1 Mark'],
              modelSolution: '`int | None` (or `typing.Optional[int]`).',
              notebookCheckpoints: ['int | None']
            },
            {
              id: 'py-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'LEGB Scope Rule',
              question: 'What do the letters in Python\'s "LEGB" variable lookup rule stand for in order?',
              markingBreakdown: ['Local, Enclosing, Global, Built-in: 1 Mark'],
              modelSolution: 'Local -> Enclosing -> Global -> Built-in.',
              notebookCheckpoints: ['Local, Enclosing, Global, Built-in']
            },
            {
              id: 'py-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'collections.defaultdict',
              question: 'How does `collections.defaultdict(list)` differ from a standard Python `dict` when accessing a missing key?',
              markingBreakdown: ['Auto-inserts default empty list instead of raising KeyError: 1 Mark'],
              modelSolution: 'When a missing key is accessed, `defaultdict(list)` automatically creates the key with an empty list `[]` as its value, whereas a standard dict raises `KeyError`.',
              notebookCheckpoints: ['Auto-creates missing key with default']
            },
            {
              id: 'py-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'String Interning',
              question: 'What is String Interning in CPython, and why does `a = "hello"; b = "hello"; a is b` evaluate to `True`?',
              markingBreakdown: ['Reuses immutable string singletons in memory: 1 Mark'],
              modelSolution: 'CPython interns compile-time constant strings resembling identifiers in a global table, reusing the exact same memory address for identical string literals.',
              notebookCheckpoints: ['Shared string singleton table in CPython']
            },
            {
              id: 'py-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Iterators: `__iter__` and `__next__`',
              question: 'What built-in exception must the `__next__()` method raise to signal that iteration has completed?',
              markingBreakdown: ['StopIteration: 1 Mark'],
              modelSolution: '`StopIteration`.',
              notebookCheckpoints: ['StopIteration']
            },
            {
              id: 'py-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Zip Function & Unequal Lengths',
              question: 'What function in `itertools` should be used instead of standard `zip()` if you want to pair elements up to the longest iterable with a fill value?',
              markingBreakdown: ['itertools.zip_longest: 1 Mark'],
              modelSolution: '`itertools.zip_longest(..., fillvalue=...)`.',
              notebookCheckpoints: ['zip_longest']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Short Analytical & Implementation Problems',
          instruction: 'Attempt ANY 4 questions out of 7. Each question carries 5 Marks (4 × 5 = 20 Marks). Show complete working in your notebook.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Multiprocessing: CPU-Bound Parallel Computation',
              question: 'Explain why `multiprocessing.Pool` bypasses the CPython GIL. Write a short Python program that computes squares of numbers from 1 to 10,000 across 4 CPU cores using `pool.map()`.',
              markingBreakdown: [
                'GIL bypass explanation (separate Python OS processes): 2 Marks',
                'multiprocessing.Pool implementation with if __name__ == "__main__": 3 Marks'
              ],
              modelSolution: `The multiprocessing module spawns separate OS processes, each with its own independent CPython interpreter and private memory space. Because each process runs its own GIL on its own CPU core, multiple CPU cores execute simultaneously without thread lock contention.

\`\`\`python
import multiprocessing

def square_task(x):
    return x * x

if __name__ == '__main__':
    with multiprocessing.Pool(processes=4) as pool:
        numbers = list(range(1, 10001))
        results = pool.map(square_task, numbers)
    print("Computed", len(results), "squares.")
\`\`\``,
              notebookCheckpoints: [
                'Explain separate OS processes and separate GILs',
                'Use if __name__ == "__main__": guard'
              ]
            },
            {
              id: 'py-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Memoization Decorator with Cache Expiry',
              question: 'Implement a custom caching decorator `@memoize_with_limit(max_size=128)` that caches return values of pure functions in a dictionary. When the cache exceeds `max_size`, pop the oldest inserted key (FIFO eviction).',
              markingBreakdown: [
                'Decorator taking arguments: 2 Marks',
                'Dictionary lookup and FIFO eviction when exceeding max_size: 3 Marks'
              ],
              modelSolution: `\`\`\`python
import functools

def memoize_with_limit(max_size=128):
    def decorator(func):
        cache = {}
        @functools.wraps(func)
        def wrapper(*args):
            if args in cache:
                return cache[args]
            result = func(*args)
            if len(cache) >= max_size:
                # Evict oldest key
                oldest_key = next(iter(cache))
                del cache[oldest_key]
            cache[args] = result
            return result
        return wrapper
    return decorator

@memoize_with_limit(max_size=3)
def fib(n):
    return n if n <= 1 else fib(n-1) + fib(n-2)
\`\`\``,
              notebookCheckpoints: [
                'Three-layer function closure for parameterized decorator',
                'Evict oldest key with next(iter(cache))'
              ]
            },
            {
              id: 'py-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Custom Iterators: Infinite Range with Step',
              question: 'Create a custom Iterator class `SteppedRange` conforming to the Python Iterator protocol (`__iter__` and `__next__`) that takes `start`, `stop`, and `step` and yields floating-point numbers. Handle negative steps appropriately.',
              markingBreakdown: [
                '__iter__ returning self: 1.5 Marks',
                '__next__ incrementing and raising StopIteration: 3.5 Marks'
              ],
              modelSolution: `\`\`\`python
class SteppedRange:
    def __init__(self, start, stop, step=1.0):
        if step == 0:
            raise ValueError("Step cannot be zero")
        self.current = start
        self.stop = stop
        self.step = step

    def __iter__(self):
        return self

    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \\
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        val = self.current
        self.current += self.step
        return val
\`\`\``,
              notebookCheckpoints: [
                'Raise StopIteration when boundary exceeded',
                'Handle step > 0 and step < 0'
              ]
            },
            {
              id: 'py-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Operator Overloading: Custom Vector2D Math Class',
              question: 'Implement a 2D math vector class `Vector2D` in Python that overloads:\n(a) `__add__` for vector addition.\n(b) `__mul__` for scalar multiplication.\n(c) `__eq__` for value equality.\n(d) `__repr__` returning `Vector2D(x, y)`.',
              markingBreakdown: [
                '__add__ and __mul__: 2.5 Marks',
                '__eq__ and __repr__: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        if not isinstance(scalar, (int, float)):
            return NotImplemented
        return Vector2D(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        if not isinstance(other, Vector2D):
            return False
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector2D({self.x}, {self.y})"
\`\`\``,
              notebookCheckpoints: [
                'Return NotImplemented for unhandled types',
                '__repr__ returns Vector2D(x, y)'
              ]
            },
            {
              id: 'py-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Socket Networking: Echo Server',
              question: 'Write a basic TCP Echo Server in Python using `<socket>` that binds to `localhost:8080`, listens for 1 client connection, reads incoming bytes, and echoes the identical data back before closing gracefully.',
              markingBreakdown: [
                'socket creation, bind, listen: 2.5 Marks',
                'accept, recv, sendall, and close: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
import socket

def run_echo_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind(('localhost', 8080))
    server_socket.listen(1)
    print("Echo server listening on port 8080...")

    client_conn, client_addr = server_socket.accept()
    with client_conn:
        print(f"Connected by {client_addr}")
        while True:
            data = client_conn.recv(1024)
            if not data:
                break
            client_conn.sendall(data) # Echo back

    server_socket.close()
\`\`\``,
              notebookCheckpoints: [
                'AF_INET and SOCK_STREAM',
                'bind, listen, accept cycle',
                'sendall(data)'
              ]
            },
            {
              id: 'py-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'JSON Serialization & Custom Datetime Encoders',
              question: 'Explain why `json.dumps()` raises `TypeError` when serializing a Python `datetime` object. Implement a custom `json.JSONEncoder` subclass `DateTimeEncoder` that formats `datetime` objects into ISO-8601 strings.',
              markingBreakdown: [
                'Explanation of default JSON primitives: 2 Marks',
                'Custom JSONEncoder implementation: 3 Marks'
              ],
              modelSolution: `Standard JSON specifies only strings, numbers, booleans, null, arrays, and objects. It has no native datetime type, so json.dumps() raises \`TypeError: Object of type datetime is not JSON serializable\`.

\`\`\`python
import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

# Usage
data = {"event": "login", "timestamp": datetime.now()}
json_str = json.dumps(data, cls=DateTimeEncoder)
\`\`\``,
              notebookCheckpoints: [
                'Subclass json.JSONEncoder',
                'Override default(self, obj)',
                'Return obj.isoformat()'
              ]
            },
            {
              id: 'py-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Regular Expressions: Security Sanitization',
              question: 'Write a Python function `validate_and_extract_emails(text)` using the `re` module that finds all valid email addresses formatted like `username@domain.tld` and filters out malicious inputs.',
              markingBreakdown: [
                'Valid regex pattern compilation: 2.5 Marks',
                'Extraction and validation: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
import re

EMAIL_REGEX = re.compile(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,7}\\b')

def validate_and_extract_emails(text):
    if not isinstance(text, str):
        return []
    matches = EMAIL_REGEX.findall(text)
    return matches
\`\`\``,
              notebookCheckpoints: [
                're.compile with boundary \\b',
                're.findall'
              ]
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Systems Design',
          instruction: 'Attempt ANY 2 questions out of 3. Each question carries 10 Marks (2 × 10 = 20 Marks). Write full implementations with memory safety guarantees.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Distributed Systems: Task Queue Worker Engine (Mini-Celery)',
              question: 'Design an asynchronous Task Queue Architecture in Python resembling Celery:\n(a) In-memory broker using `queue.Queue` with task serialization.\n(b) Decorator `@task` that registers task functions in a registry and provides `.delay(*args)` for async dispatch.\n(c) Worker thread loop pulling tasks and executing them.\n(d) Result backend recording task status (`PENDING`, `SUCCESS`, `FAILURE`) and return values.',
              markingBreakdown: [
                'Broker and task registry setup: 2.5 Marks',
                '@task decorator with delay dispatch: 3 Marks',
                'Worker execution loop with error trapping: 2.5 Marks',
                'Result backend and status tracking: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import queue
import threading
import uuid
import time

class TaskResult:
    def __init__(self, task_id):
        self.task_id = task_id
        self.status = "PENDING"
        self.result = None

class MiniCelery:
    def __init__(self):
        self.task_queue = queue.Queue()
        self.registry = {}
        self.results = {}

    def task(self, func):
        self.registry[func.__name__] = func
        
        class TaskWrapper:
            def __init__(self, engine, f):
                self.engine = engine
                self.f = f
            def delay(s_self, *args, **kwargs):
                task_id = str(uuid.uuid4())
                s_self.engine.results[task_id] = TaskResult(task_id)
                s_self.engine.task_queue.put((task_id, s_self.f.__name__, args, kwargs))
                return s_self.engine.results[task_id]
        
        return TaskWrapper(self, func)

    def worker_loop(self):
        while True:
            item = self.task_queue.get()
            if item is None: break
            task_id, func_name, args, kwargs = item
            task_res = self.results[task_id]
            try:
                fn = self.registry[func_name]
                task_res.result = fn(*args, **kwargs)
                task_res.status = "SUCCESS"
            except Exception as e:
                task_res.result = str(e)
                task_res.status = "FAILURE"
            finally:
                self.task_queue.task_done()
\`\`\``,
              notebookCheckpoints: [
                'Registry mapping function names',
                'delay(*args) queuing task and returning TaskResult handle',
                'Worker thread loop updating status'
              ]
            },
            {
              id: 'py-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Data Engineering: Fast CSV Stream Transformer with Custom Generators',
              question: 'Construct an industrial ETL stream processor in Python capable of handling multi-gigabyte data files:\n(a) Generator reading chunked rows from disk.\n(b) Data validation schema enforcing types and non-null constraints.\n(c) Deduplication stage using an in-memory Bloom filter or hashed set with sliding expiration.\n(d) Write output rows in batch increments to an output file.\n(e) Compute benchmark metrics (rows/sec throughput, peak RAM usage).',
              markingBreakdown: [
                'Chunked streaming file generator: 2.5 Marks',
                'Validation and schema conversion: 2.5 Marks',
                'Deduplication and batch flushing: 3 Marks',
                'Throughput and memory monitoring: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import csv
import time

def stream_csv_chunks(filepath, chunk_size=1000):
    with open(filepath, 'r', newline='') as f:
        reader = csv.DictReader(f)
        chunk = []
        for row in reader:
            chunk.append(row)
            if len(chunk) >= chunk_size:
                yield chunk
                chunk = []
        if chunk:
            yield chunk

def process_and_deduplicate(chunk_stream, out_path):
    seen_ids = set()
    total_processed = 0
    start = time.perf_counter()

    with open(out_path, 'w', newline='') as out_f:
        writer = None
        for chunk in chunk_stream:
            clean_batch = []
            for row in chunk:
                row_id = row.get('id')
                if not row_id or row_id in seen_ids:
                    continue
                seen_ids.add(row_id)
                clean_batch.append(row)

            if clean_batch:
                if writer is None:
                    writer = csv.DictWriter(out_f, fieldnames=clean_batch[0].keys())
                    writer.writeheader()
                writer.writerows(clean_batch)
                total_processed += len(clean_batch)

    duration = time.perf_counter() - start
    print(f"ETL completed: {total_processed} rows in {duration:.2f}s ({total_processed/duration:.0f} rows/s)")
\`\`\``,
              notebookCheckpoints: [
                'Chunked generator with chunk_size',
                'Set-based deduplication',
                'Batch writerows to minimize I/O'
              ]
            },
            {
              id: 'py-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'High-Performance Python: Cython & C-Extension Architecture',
              question: 'Explain how Python bridges to C for native performance:\n(a) Describe how the Python C-API represents objects using `PyObject*` and reference counts (`Py_INCREF`, `Py_DECREF`).\n(b) Compare three approaches to speeding up numeric code: Pure Python, NumPy vectorization, and C-Extensions/Cython.\n(c) Write a C-Extension code snippet for `add(a, b)` using `<Python.h>`.\n(d) Explain how `ctypes` allows loading `.so` or `.dll` shared libraries directly in Python.',
              markingBreakdown: [
                'PyObject struct and reference counting macros: 2.5 Marks',
                'Performance comparison across execution tiers: 2.5 Marks',
                'Python C-API C-extension function: 3 Marks',
                'ctypes dynamic loading demonstration: 2 Marks'
              ],
              modelSolution: `(a) PyObject & C-API:
Every object in CPython begins with the PyObject header:
\`\`\`c
typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
} PyObject;
\`\`\`
Py_INCREF(op) increments \`ob_refcnt\`. Py_DECREF(op) decrements it; if 0, its type\'s \`tp_dealloc\` is called.

(c) Python.h C-Extension:
\`\`\`c
#include <Python.h>

static PyObject* method_add(PyObject* self, PyObject* args) {
    long a, b;
    if (!PyArg_ParseTuple(args, "ll", &a, &b)) return NULL;
    return PyLong_FromLong(a + b);
}
\`\`\`

(d) ctypes Shared Library Loading:
\`\`\`python
import ctypes
# Load shared library directly into Python process
libc = ctypes.CDLL("libc.so.6" if hasattr(ctypes.CDLL, "so") else "msvcrt.dll")
libc.puts(b"Hello from C stdlib invoked via ctypes!")
\`\`\``,
              notebookCheckpoints: [
                'PyObject structure definition with ob_refcnt',
                'PyArg_ParseTuple parsing',
                'ctypes.CDLL loading'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-103-PY-S3',
      title: 'Advanced Python Systems, Security & Compilers Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-103-PY',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark. Answer concisely in your notebook.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'py-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Bytecode Inspection',
              question: 'Which standard Python module disassembles functions into readable bytecode instructions (`dis.dis`)?',
              markingBreakdown: ['dis module: 1 Mark'],
              modelSolution: 'The `dis` module (`import dis; dis.dis(func)`).',
              notebookCheckpoints: ['dis module']
            },
            {
              id: 'py-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Pickle Security Flaw',
              question: 'Why is unpickling untrusted data (`pickle.loads`) considered a major Remote Code Execution (RCE) vulnerability?',
              markingBreakdown: ['Arbitrary code execution via __reduce__ hook: 1 Mark'],
              modelSolution: '`pickle` objects can define a `__reduce__` method that specifies arbitrary callable functions (e.g. `os.system`) and arguments executed automatically during deserialization.',
              notebookCheckpoints: ['RCE via __reduce__ hook', 'Never unpickle untrusted bytes']
            },
            {
              id: 'py-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Descriptor Protocol',
              question: 'Which three dunder methods constitute the Python Descriptor protocol?',
              markingBreakdown: ['__get__, __set__, and __delete__: 1 Mark'],
              modelSolution: '`__get__(self, instance, owner)`, `__set__(self, instance, value)`, and `__delete__(self, instance)`.',
              notebookCheckpoints: ['__get__, __set__, __delete__']
            },
            {
              id: 'py-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Weak References',
              question: 'What is the purpose of `weakref.ref(obj)` in Python?',
              markingBreakdown: ['References object without incrementing ob_refcnt: 1 Mark'],
              modelSolution: 'A weak reference references an object without increasing its `ob_refcnt`, allowing the object to be garbage collected when no strong references remain.',
              notebookCheckpoints: ['Does not increment ref count', 'Prevents circular memory leaks']
            },
            {
              id: 'py-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'CPython Free-Threading (PEP 703)',
              question: 'What is the goal of PEP 703 ("Making the Global Interpreter Lock Optional") in Python 3.13+?',
              markingBreakdown: ['Removes GIL to run multithreaded bytecode across multiple CPU cores natively: 1 Mark'],
              modelSolution: 'PEP 703 introduces free-threaded CPython by making the GIL optional, using mimalloc thread-safe allocators and per-object biased reference counting to execute native Python threads concurrently on multi-core CPUs.',
              notebookCheckpoints: ['No-GIL build', 'True multi-core thread parallelism']
            },
            {
              id: 'py-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'ast (Abstract Syntax Tree) Module',
              question: 'What does the standard `ast` module parse Python source code into?',
              markingBreakdown: ['Tree of AST nodes representing syntactical program structure: 1 Mark'],
              modelSolution: 'It parses source code strings into a structured Abstract Syntax Tree of node objects for static analysis, linting, or code rewriting.',
              notebookCheckpoints: ['Abstract Syntax Tree']
            },
            {
              id: 'py-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Hash Randomization',
              question: 'Why does Python randomize hash seeds on each interpreter startup (PYTHONHASHSEED)?',
              markingBreakdown: ['Prevents Hash-DoS attacks on dictionaries: 1 Mark'],
              modelSolution: 'To prevent Hash-DoS algorithmic complexity attacks where malicious users send crafted inputs that hash to identical buckets, degrading dictionary operations from $O(1)$ to $O(N)$.',
              notebookCheckpoints: ['Prevents Hash-DoS attacks']
            },
            {
              id: 'py-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'functools.lru_cache',
              question: 'How do you inspect the cache hit and miss statistics of a function decorated with `@functools.lru_cache`?',
              markingBreakdown: ['func.cache_info(): 1 Mark'],
              modelSolution: 'Call `func.cache_info()`, which returns a named tuple with `hits`, `misses`, `maxsize`, and `currsize`.',
              notebookCheckpoints: ['func.cache_info()']
            },
            {
              id: 'py-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'typing.Protocol',
              question: 'What style of typing does `typing.Protocol` enable in Python (Structural Subtyping / Duck Typing)?',
              markingBreakdown: ['Static structural subtyping / compile-time duck typing: 1 Mark'],
              modelSolution: 'It enables static structural subtyping (compile-time duck typing): a class is considered an instance of a Protocol if it implements the required methods, without explicit inheritance.',
              notebookCheckpoints: ['Structural subtyping / static duck typing']
            },
            {
              id: 'py-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'sys.settrace',
              question: 'What capability does `sys.settrace()` provide in Python debugging engines?',
              markingBreakdown: ['Registers a trace callback for every function call, line, exception, and return: 1 Mark'],
              modelSolution: 'It registers a system trace hook callback invoked by the interpreter on every function call, source line execution, exception, and return event (used by debuggers like pdb and coverage tools).',
              notebookCheckpoints: ['Hook for line/call/return events']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Short Analytical & Implementation Problems',
          instruction: 'Attempt ANY 4 questions out of 7. Each question carries 5 Marks (4 × 5 = 20 Marks). Show complete working in your notebook.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Custom Descriptor: Type-Enforced Field',
              question: 'Implement a non-data or data descriptor `Typed(expected_type)` in Python that enforces that any value assigned to an instance attribute matches `expected_type`. Raise `TypeError` on invalid assignments.',
              markingBreakdown: [
                'Descriptor class with __set_name__, __get__, and __set__: 3.5 Marks',
                'TypeError validation: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
class Typed:
    def __init__(self, expected_type):
        self.expected_type = expected_type

    def __set_name__(self, owner, name):
        self.storage_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.storage_name, None)

    def __set__(self, instance, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"Expected {self.expected_type.__name__}, got {type(value).__name__}")
        setattr(instance, self.storage_name, value)

class Product:
    price = Typed(float)
    quantity = Typed(int)
\`\`\``,
              notebookCheckpoints: [
                'Use __set_name__ to capture variable name',
                '__get__ and __set__ implementations',
                'Raise TypeError'
              ]
            },
            {
              id: 'py-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'AST Static Analysis: Detecting Insecure `eval()` Calls',
              question: 'Write a Python security audit script using the `ast` module that parses a target Python script and flags any invocation of the dangerous `eval()` or `exec()` built-ins with file line numbers.',
              markingBreakdown: [
                'ast.parse and ast.NodeVisitor subclass: 3 Marks',
                'visit_Call inspection for eval/exec: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import ast

class SecurityAuditor(ast.NodeVisitor):
    def __init__(self):
        self.findings = []

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id in ('eval', 'exec'):
                self.findings.append((node.func.id, node.lineno))
        self.generic_visit(node)

def audit_code(source_code):
    tree = ast.parse(source_code)
    auditor = SecurityAuditor()
    auditor.visit(tree)
    for func_name, line in auditor.findings:
        print(f"[SECURITY ALERT] Unsafe call to {func_name}() at line {line}")
\`\`\``,
              notebookCheckpoints: [
                'Subclass ast.NodeVisitor',
                'Override visit_Call',
                'Call self.generic_visit(node)'
              ]
            },
            {
              id: 'py-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Bytecode Optimization & Python Virtual Machine',
              question: 'Examine what happens inside the CPython evaluation loop (`ceval.c`):\n(a) Explain what the constant folding optimization does for expressions like `3 * 60 * 60`.\n(b) Disassemble `def f(): return 3 * 60 * 60` using `dis.dis` and write down the bytecode instructions in your notebook.',
              markingBreakdown: [
                'Constant folding explanation: 2 Marks',
                'Bytecode disassembly representation: 3 Marks'
              ],
              modelSolution: `(a) Constant Folding:
During the AST optimization pass, the CPython compiler evaluates arithmetic expressions consisting entirely of literal constants (e.g. 3 * 60 * 60) at compile time, replacing the operation with the single pre-computed constant 10800.

(b) Disassembly Trace:
\`\`\`
  1           0 RESUME                   0
              2 LOAD_CONST               1 (10800)
              4 RETURN_VALUE
\`\`\`
Notice there are no \`BINARY_OP\` multiplication instructions in the bytecode; the compiler emits \`LOAD_CONST 10800\` directly.`,
              notebookCheckpoints: [
                'Compile-time pre-computation of literals',
                'Show LOAD_CONST 10800 instruction'
              ]
            },
            {
              id: 'py-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Asyncio Custom Event Loop Semaphore',
              question: 'Implement a Rate Limiter coroutine `async def rate_limited_request(semaphore, url)` in `asyncio` that allows no more than 5 requests every second using `asyncio.sleep`.',
              markingBreakdown: [
                'asyncio.Semaphore logic: 2.5 Marks',
                '1-second window rate limiting: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
import asyncio
import time

class TokenBucketRateLimiter:
    def __init__(self, rate=5, per=1.0):
        self.rate = rate
        self.per = per
        self.allowance = rate
        self.last_check = time.monotonic()
        self.lock = asyncio.Lock()

    async def acquire(self):
        async with self.lock:
            current = time.monotonic()
            time_passed = current - self.last_check
            self.last_check = current
            self.allowance += time_passed * (self.rate / self.per)
            if self.allowance > self.rate:
                self.allowance = self.rate

            if self.allowance < 1.0:
                sleep_time = (1.0 - self.allowance) * (self.per / self.rate)
                await asyncio.sleep(sleep_time)
                self.allowance = 0.0
            else:
                self.allowance -= 1.0
\`\`\``,
              notebookCheckpoints: [
                'Token bucket algorithm in asyncio',
                'Use asyncio.Lock for thread safety'
              ]
            },
            {
              id: 'py-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Metaclass Interface Enforcement',
              question: 'Without using the `abc` module, write a custom Metaclass `InterfaceEnforcer` that checks at class creation time whether any derived class has implemented required methods `connect()` and `disconnect()`. Raise a `TypeError` if missing.',
              markingBreakdown: [
                'Metaclass definition: 2.5 Marks',
                'Method presence verification and exception: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
class InterfaceEnforcer(type):
    REQUIRED_METHODS = ('connect', 'disconnect')

    def __new__(mcs, name, bases, attrs):
        # Skip check for the base interface itself
        if bases:
            for method in mcs.REQUIRED_METHODS:
                if method not in attrs or not callable(attrs[method]):
                    raise TypeError(f"Class '{name}' must implement required method '{method}()'")
        return super().__new__(mcs, name, bases, attrs)

class DatabaseInterface(metaclass=InterfaceEnforcer):
    pass

# Fails at import/definition time if connect() is missing!
\`\`\``,
              notebookCheckpoints: [
                'Inspect attrs for required method names',
                'Fail at class creation time'
              ]
            },
            {
              id: 'py-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Thread Synchronization: Deadlock Prevention',
              question: 'Explain what a Deadlock is in Python multithreading. Write a short snippet showing two threads acquiring locks in reverse order causing a deadlock, and show how Resource Hierarchy (Lock Ordering) guarantees deadlock prevention.',
              markingBreakdown: [
                'Deadlock explanation: 1.5 Marks',
                'Deadlock demonstration with lockA and lockB: 1.5 Marks',
                'Lock ordering remediation: 2 Marks'
              ],
              modelSolution: `Deadlock occurs when thread 1 holds Lock A and waits for Lock B, while thread 2 holds Lock B and waits for Lock A. Both wait indefinitely.

\`\`\`python
import threading

lock_A = threading.Lock()
lock_B = threading.Lock()

# Deadlock hazard:
# Thread 1: acquires A then B
# Thread 2: acquires B then A -> DEADLOCK!

# Solution: Strict Global Lock Ordering
# All threads must acquire locks in the exact same hierarchical order:
def safe_worker():
    with lock_A:
        with lock_B:
            # Critical Section
            pass
\`\`\``,
              notebookCheckpoints: [
                'Circular lock dependency explanation',
                'Consistent lock acquisition order (A then B everywhere)'
              ]
            },
            {
              id: 'py-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Memory Profiling with `tracemalloc`',
              question: 'Write a Python utility function `track_memory_usage(func)` using the standard `tracemalloc` module that measures and displays peak memory allocation and top 3 memory-allocating lines of code.',
              markingBreakdown: [
                'tracemalloc.start() and get_traced_memory(): 2.5 Marks',
                'Snapshot comparison and display: 2.5 Marks'
              ],
              modelSolution: `\`\`\`python
import tracemalloc

def track_memory(func):
    tracemalloc.start()
    
    func()
    
    current, peak = tracemalloc.get_traced_memory()
    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics('lineno')

    print(f"Current: {current / 1024:.1f} KB; Peak: {peak / 1024:.1f} KB")
    print("Top 3 Allocators:")
    for stat in top_stats[:3]:
        print(stat)

    tracemalloc.stop()
\`\`\``,
              notebookCheckpoints: [
                'tracemalloc.start() and stop()',
                'get_traced_memory() peak measurement'
              ]
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Systems Design',
          instruction: 'Attempt ANY 2 questions out of 3. Each question carries 10 Marks (2 × 10 = 20 Marks). Write full implementations with memory safety guarantees.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'py-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Compiler Architecture: Building an Expression Evaluator & Bytecode Compiler',
              question: 'Construct a complete recursive-descent Arithmetic Expression Evaluator in Python:\n(a) Lexer tokenizing mathematical expressions with `+`, `-`, `*`, `/`, and parentheses `()`.\n(b) Parser implementing grammar rules supporting standard operator precedence (BODMAS).\n(c) AST Node classes `NumberNode` and `BinOpNode`.\n(d) Interpreter evaluating the AST to a final numerical answer.\n(e) Trace the AST generated for `2 + 3 * (4 - 1)` in your notebook.',
              markingBreakdown: [
                'Lexer implementation: 2.5 Marks',
                'Recursive descent parser with precedence: 3.5 Marks',
                'AST nodes and evaluator: 2 Marks',
                'AST tree diagram for 2 + 3 * (4 - 1): 2 Marks'
              ],
              modelSolution: `\`\`\`python
import re

class NumberNode:
    def __init__(self, val): self.val = float(val)
    def eval(self): return self.val

class BinOpNode:
    def __init__(self, left, op, right):
        self.left, self.op, self.right = left, op, right
    def eval(self):
        if self.op == '+': return self.left.eval() + self.right.eval()
        if self.op == '-': return self.left.eval() - self.right.eval()
        if self.op == '*': return self.left.eval() * self.right.eval()
        if self.op == '/': return self.left.eval() / self.right.eval()

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def cur(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def eat(self, val=None):
        tok = self.cur()
        self.pos += 1
        return tok

    def parse(self): return self.expr()

    # expr = term ((+ | -) term)*
    def expr(self):
        node = self.term()
        while self.cur() in ('+', '-'):
            op = self.eat()
            node = BinOpNode(node, op, self.term())
        return node

    # term = factor ((* | /) factor)*
    def term(self):
        node = self.factor()
        while self.cur() in ('*', '/'):
            op = self.eat()
            node = BinOpNode(node, op, self.factor())
        return node

    # factor = Number | '(' expr ')'
    def factor(self):
        tok = self.cur()
        if tok == '(':
            self.eat('(')
            node = self.expr()
            self.eat(')')
            return node
        return NumberNode(self.eat())
\`\`\`
AST Diagram for \`2 + 3 * (4 - 1)\`:
        +
       / \\
      2   *
         / \\
        3   -
           / \\
          4   1
Evaluation: 4 - 1 = 3 -> 3 * 3 = 9 -> 2 + 9 = 11.`,
              notebookCheckpoints: [
                'Precedence hierarchy: expr() calls term(), term() calls factor()',
                'Draw AST tree diagram in notebook'
              ]
            },
            {
              id: 'py-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: Asynchronous Event-Driven Web Server (Pure Python)',
              question: 'Implement an asynchronous HTTP/1.1 Web Server in pure Python using `asyncio` without external libraries:\n(a) Listen on TCP port 8000 and handle concurrent HTTP connections.\n(b) Parse HTTP request line (`GET / HTTP/1.1`) and headers.\n(c) Route requests to registered route handler coroutines.\n(d) Construct valid HTTP responses with headers (`Content-Type`, `Content-Length`) and status codes (`200 OK`, `404 Not Found`).\n(e) Benchmark the server against traditional threaded socket servers.',
              markingBreakdown: [
                'asyncio.start_server socket listener: 2.5 Marks',
                'HTTP protocol request parser: 3 Marks',
                'Route registry and execution: 2.5 Marks',
                'Response formatter and architecture comparison: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import asyncio

class MicroServer:
    def __init__(self, host='127.0.0.1', port=8000):
        self.host = host
        self.port = port
        self.routes = {}

    def route(self, path):
        def decorator(handler):
            self.routes[path] = handler
            return handler
        return decorator

    async def handle_client(self, reader, writer):
        request_line = await reader.readline()
        if not request_line: return
        
        parts = request_line.decode('utf-8').strip().split()
        if len(parts) < 2: return
        method, path = parts[0], parts[1]

        # Read headers until empty line
        while True:
            line = await reader.readline()
            if line in (b'\\r\\n', b'\\n', b''): break

        handler = self.routes.get(path)
        if handler:
            body = await handler()
            status = "200 OK"
        else:
            body = "<h1>404 Not Found</h1>"
            status = "404 Not Found"

        body_bytes = body.encode('utf-8')
        response = (
            f"HTTP/1.1 {status}\\r\\n"
            f"Content-Type: text/html\\r\\n"
            f"Content-Length: {len(body_bytes)}\\r\\n"
            f"Connection: close\\r\\n\\r\\n"
        ).encode('utf-8') + body_bytes

        writer.write(response)
        await writer.drain()
        writer.close()
        await writer.wait_closed()

    async def start(self):
        server = await asyncio.start_server(self.handle_client, self.host, self.port)
        print(f"MicroServer serving on http://{self.host}:{self.port}")
        async with server:
            await server.serve_forever()
\`\`\``,
              notebookCheckpoints: [
                'asyncio.start_server',
                'Parse HTTP request line method and path',
                'Emit valid HTTP headers with Content-Length'
              ]
            },
            {
              id: 'py-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Security Architecture: Building a Cryptographic JWT Engine',
              question: 'Construct a self-contained JSON Web Token (JWT) engine in Python using `<hmac>` and `<hashlib>`:\n(a) Base64URL encoding and decoding utilities.\n(b) Function `encode_jwt(payload, secret_key)` generating signed tokens with `HS256`.\n(c) Function `decode_jwt(token, secret_key)` verifying the HMAC signature and expiration timestamp (`exp`).\n(d) Explain how timing attacks on cryptographic signature checks are prevented using `hmac.compare_digest()`.',
              markingBreakdown: [
                'Base64URL encoding without padding: 2.5 Marks',
                'HMAC-SHA256 signature generation: 3 Marks',
                'Signature verification and expiry checks: 2.5 Marks',
                'Timing attack vulnerability and hmac.compare_digest: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import hmac
import hashlib
import json
import base64
import time

def b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')

def b64url_decode(s: str) -> bytes:
    padding = '=' * (4 - (len(s) % 4) % 4)
    return base64.urlsafe_b64decode((s + padding).encode('utf-8'))

def encode_jwt(payload: dict, secret: str) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    hdr_b64 = b64url_encode(json.dumps(header).encode('utf-8'))
    pay_b64 = b64url_encode(json.dumps(payload).encode('utf-8'))

    signing_input = f"{hdr_b64}.{pay_b64}".encode('utf-8')
    sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    sig_b64 = b64url_encode(sig)

    return f"{hdr_b64}.{pay_b64}.{sig_b64}"

def decode_jwt(token: str, secret: str) -> dict:
    parts = token.split('.')
    if len(parts) != 3: raise ValueError("Invalid JWT format")
    hdr_b64, pay_b64, sig_b64 = parts

    signing_input = f"{hdr_b64}.{pay_b64}".encode('utf-8')
    expected_sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()

    # Timing Attack Defense: compare_digest runs in constant time!
    if not hmac.compare_digest(b64url_decode(sig_b64), expected_sig):
        raise PermissionError("Signature verification failed")

    payload = json.loads(b64url_decode(pay_b64).decode('utf-8'))
    if "exp" in payload and time.time() > payload["exp"]:
        raise PermissionError("Token has expired")
    return payload
\`\`\`
Timing Attack Defense:
Standard \`==\` string comparison terminates on the first mismatched byte, leaking how many initial bytes were correct through microsecond timing variations.
\`hmac.compare_digest\` evaluates every single byte regardless of mismatch, eliminating side-channel timing leaks.`,
              notebookCheckpoints: [
                'Base64URL padding fix',
                'HMAC-SHA256 signature',
                'Use hmac.compare_digest to prevent timing attacks'
              ]
            }
          ]
        }
      }
    }
  }
};
