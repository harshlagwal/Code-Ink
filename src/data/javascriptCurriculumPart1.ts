import { Chapter } from '../types/notebook';

export const JAVASCRIPT_CHAPTERS_PART1: Chapter[] = [
  // CHAPTER 01 — JAVASCRIPT FOUNDATIONS
  {
    id: 'js-ch01',
    number: 1,
    title: 'JavaScript Foundations & V8 Architecture',
    description: 'ECMAScript standard, V8 execution pipeline, browser runtime vs Node.js, and strict mode',
    topics: [
      {
        id: 'js-foundations',
        subjectId: 'js',
        chapterId: 'js-ch01',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'What is JavaScript? Engines, Runtimes & ECMAScript',
        difficulty: 'beginner',
        definition: 'JavaScript is a lightweight, interpreted, just-in-time (JIT) compiled, single-threaded, multi-paradigm language with first-class functions and prototype-based object orientation.',
        whyItMatters: 'JavaScript is the universal programming language of the open web, executing natively inside every web browser and powering massive full-stack applications with Node.js.',
        syntax: '// ECMAScript standard syntax\nconsole.log("Hello, CODEINK JavaScript Notebook!");',
        explanation: [
          'Created in 1995 by Brendan Eich in 10 days at Netscape under the name Mocha, then LiveScript, and finally renamed JavaScript.',
          'ECMAScript (TC39 committee) defines the official language specification (ES6/ES2015 being the landmark overhaul), while browser vendors implement conforming engines.',
          'Engines (e.g. Google V8 in Chrome/Node, SpiderMonkey in Firefox, JavaScriptCore in Safari) parse source code into an Abstract Syntax Tree (AST), run baseline bytecode compilation (Ignition), and optimize hot code via JIT compilation (TurboFan).',
          'JavaScript is single-threaded (one call stack), but non-blocking I/O is achieved using the host environment Event Loop and Web APIs.'
        ],
        example: {
          language: 'javascript',
          code: `// Canonical first JavaScript program
console.log("Welcome to JavaScript!");
const engine = "Google V8 Engine";
const standard = "ECMAScript 2024 (ES15)";

console.log(\`Runtime: \${engine} | Spec: \${standard}\`);`,
          output: 'Welcome to JavaScript!\nRuntime: Google V8 Engine | Spec: ECMAScript 2024 (ES15)',
          annotations: [
            { line: 2, label: 'Standard output logging method', type: 'blue' },
            { line: 3, label: 'const creates immutable variable bindings', type: 'yellow' },
            { line: 6, label: 'Template literal with interpolation', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'V8 JavaScript Execution Pipeline',
          subtitle: 'From High-Level Source Code to Native Machine Code',
          elements: [
            { id: '1', label: 'JS Source', sublabel: 'script.js', value: 'High-Level Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Scanner & Parser', sublabel: 'Lexical Analysis', value: 'AST (Syntax Tree)', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Ignition', sublabel: 'Bytecode Interpreter', value: 'Portable Bytecode', status: 'active', arrowTo: '4' },
            { id: '4', label: 'TurboFan JIT', sublabel: 'HotSpot Optimizer', value: 'Optimized Machine Code', status: 'referenced' }
          ]
        },
        important: 'JavaScript is completely unrelated to Java. Java is a statically-typed, compiled-to-bytecode language running on the JVM; JavaScript is dynamically-typed with prototype inheritance running on JS engines.',
        commonMistakes: [
          'Confusing Java with JavaScript.',
          'Assuming JavaScript is purely interpreted; modern engines use high-speed JIT (Just-In-Time) native compilation.'
        ],
        tip: 'Always enable "use strict"; or write ES6 modules (which are strict by default) to catch silent errors like undeclared variable assignments.',
        interviewNote: 'Interview Question: "What is ECMAScript vs JavaScript?" Answer: "ECMAScript is the ECMA-262 specification standard; JavaScript is the practical dialect/implementation of that specification implemented by browsers and Node.js."',
        practiceQuestions: [
          {
            id: 'q-js1-1',
            type: 'mcq',
            question: 'Which component parses JavaScript source code and produces an Abstract Syntax Tree (AST)?',
            options: ['Event Loop', 'Parser (Lexical Analyzer)', 'Garbage Collector', 'Call Stack'],
            correctIndex: 1,
            explanation: 'The Parser analyzes source tokens according to ECMAScript grammar to produce the AST before byte-code generation.'
          },
          {
            id: 'q-js1-2',
            type: 'output',
            question: 'What is printed by typeof console.log?',
            codeSnippet: 'console.log(typeof console.log);',
            options: ['"object"', '"function"', '"undefined"', '"string"'],
            correctIndex: 1,
            explanation: 'console.log is a built-in method (function) attached to the global console object.'
          }
        ],
        relatedTopics: ['Variables & Data Types', 'V8 Engine Internals', 'Node.js Foundations']
      }
    ]
  },

  // CHAPTER 02 — VARIABLES & DATA TYPES
  {
    id: 'js-ch02',
    number: 2,
    title: 'Variables & Data Types',
    description: 'var vs let vs const, 7 primitive types, object references, typeof, and coercion',
    topics: [
      {
        id: 'js-types-variables',
        subjectId: 'js',
        chapterId: 'js-ch02',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'Variables (var, let, const) & The 8 Core Types',
        difficulty: 'beginner',
        definition: 'JavaScript has 8 data types: 7 primitives (number, string, boolean, undefined, null, symbol, bigint) stored by value, and 1 complex reference type (object) stored on the heap.',
        whyItMatters: 'Variable declarations govern scoping and mutability, while accurate type awareness prevents insidious dynamic coercion bugs common in production code.',
        syntax: 'const PI = 3.14159;      // Block-scoped, immutable identifier\nlet count = 0;           // Block-scoped, reassignable\nvar legacy = "avoid";    // Function-scoped, hoisted',
        explanation: [
          'let and const are block-scoped ({ ... }), live in the Temporal Dead Zone (TDZ) before declaration, and cannot be re-declared in the same scope.',
          'var is function-scoped (or global), hoisted to top of function with value undefined, and can cause unexpected variable leakage.',
          'Primitives (immutable, copied by value): number (double-precision IEEE 754), string (UTF-16), boolean (true/false), undefined (declared without value), null (intentional absence), symbol (unique token), bigint (arbitrary precision integer).',
          'Objects (mutable, copied by reference): Objects, Arrays, Functions, Dates, Maps, Sets are stored in memory heap, and variables hold address pointers.'
        ],
        example: {
          language: 'javascript',
          code: `const age = 25;                  // number
const username = "Sarah";        // string
const isActive = true;           // boolean
let score;                       // undefined
const balance = null;            // null (historical bug: typeof null === "object")
const id = Symbol("userId");     // symbol
const bigVal = 9007199254740991n;// bigint

console.log(typeof age);         // "number"
console.log(typeof score);       // "undefined"
console.log(typeof balance);     // "object" (JavaScript legacy quirk!)`,
          output: 'number\nundefined\nobject',
          annotations: [
            { line: 5, label: 'Unassigned let defaults to undefined', type: 'yellow' },
            { line: 6, label: 'typeof null === "object" is an unfixable 1995 JS bug', type: 'red' },
            { line: 8, label: 'BigInt literal with "n" suffix', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'JavaScript Data Type Classification',
          subtitle: 'Value Primitives (Stack) vs Reference Objects (Heap)',
          elements: [
            { id: '1', label: 'JavaScript Types', value: '8 Types', status: 'normal', arrowTo: '2' },
            { id: '2', label: '7 Primitives', sublabel: 'number, string, bool, undefined, null, symbol, bigint', value: 'Stored by Value (Stack)', status: 'active', arrowTo: '3' },
            { id: '3', label: '1 Reference Type', sublabel: 'Object (Array, Function, Date, Map, Custom)', value: 'Heap Pointer Reference', status: 'referenced' }
          ]
        },
        important: '`const` prevents reassigning the variable binding (`x = 5`), but if the value is an Object or Array, its inner properties can still be modified! Use `Object.freeze()` for shallow immutability.',
        commonMistakes: [
          'Using `var` instead of `let` or `const` in modern code, leading to variable bleeding outside loops.',
          'Assuming `typeof null` returns "null" (it returns "object" due to historical 3-bit tag representation).'
        ],
        tip: 'Default to `const` for every variable. Only use `let` when you explicitly know the value must be reassigned.',
        interviewNote: 'Question: "What is the difference between null and undefined?" Answer: "undefined means a variable has been declared but not yet assigned a value; null is an intentional assignment representing empty or absent object value."',
        practiceQuestions: [
          {
            id: 'q-js2-1',
            type: 'mcq',
            question: 'Which of the following variables will trigger a ReferenceError if accessed before its line of declaration?',
            options: ['var x = 10;', 'let y = 20;', 'function foo() {}', 'window.z'],
            correctIndex: 1,
            explanation: 'Variables declared with let and const exist in the Temporal Dead Zone (TDZ) from the start of the block until execution reaches their declaration.'
          },
          {
            id: 'q-js2-2',
            type: 'output',
            question: 'What is the output of the following coercion snippet?',
            codeSnippet: 'console.log(typeof (null + 5));',
            options: ['"null5"', '"number"', '"object"', '"NaN"'],
            correctIndex: 1,
            explanation: 'null coerces to numeric 0 in arithmetic operations, so null + 5 evaluates to numeric 5, and typeof 5 is "number".'
          }
        ],
        relatedTopics: ['Operators & Expressions', 'Scope & Execution Context', 'Destructuring & Spread']
      }
    ]
  },

  // CHAPTER 03 — OPERATORS & EXPRESSIONS
  {
    id: 'js-ch03',
    number: 3,
    title: 'Operators & Expressions',
    description: 'Arithmetic, comparison, strict === vs loose ==, nullish coalescing ??, optional chaining ?.',
    topics: [
      {
        id: 'js-operators',
        subjectId: 'js',
        chapterId: 'js-ch03',
        chapterNumber: 3,
        pageNumber: 3,
        title: 'Operators, Strict Equality (===) & Modern Operators (??, ?.)',
        difficulty: 'beginner',
        definition: 'Operators compute values from operands. Modern JavaScript introduces safe navigation (?.) and fallback (??) operators alongside strict identity comparison (===).',
        whyItMatters: 'Strict equality (===) prevents silent implicit type coercions, while ?? and ?. eliminate nested runtime TypeError exceptions on nullish properties.',
        syntax: 'const value = user?.profile?.address?.zipCode ?? "00000";\nconst isEqual = (a === b); // Strict equality without coercion',
        explanation: [
          'Strict Equality (===): Checks both value and type without coercion. Loose equality (==) coerces types using abstract equality comparison rules (e.g. 0 == "" is true).',
          'Nullish Coalescing (??): Returns right-hand operand only when left operand is null or undefined (unlike || which also falsifies 0, "", false, and NaN).',
          'Optional Chaining (?.): Short-circuits with undefined instead of throwing a TypeError if an object reference or method is nullish.',
          'Logical Assignment Operators: ||=, &&=, and ??= allow concise state updates.'
        ],
        example: {
          language: 'javascript',
          code: `// Loose vs Strict equality
console.log(0 == false);        // true (coerced)
console.log(0 === false);       // false (different types)
console.log("" == false);       // true (coerced)

// Modern operators
const config = { timeout: 0, user: null };
console.log(config.timeout || 5000);  // 5000 (0 is falsy, bug!)
console.log(config.timeout ?? 5000);  // 0 (0 is defined!)
console.log(config.user?.name);       // undefined (no crash!)`,
          output: 'true\nfalse\ntrue\n5000\n0\nundefined',
          annotations: [
            { line: 2, label: 'Loose equality coerces both sides', type: 'yellow' },
            { line: 8, label: '|| erroneously replaces valid 0', type: 'red' },
            { line: 9, label: '?? preserves 0 and false', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Logical OR (||) vs Nullish Coalescing (??)',
          subtitle: 'Falsy Boundary vs Nullish (null | undefined) Boundary',
          elements: [
            { id: '1', label: 'Operand Value', value: 'false, 0, "", null, undefined', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Logical OR (||)', sublabel: 'Fails on all falsy: 0, "", false', value: 'Falls back', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Nullish Coalescing (??)', sublabel: 'Only triggers on null or undefined', value: 'Preserves 0, false, ""', status: 'active' }
          ]
        },
        important: 'Always use strict equality `===` and strict inequality `!==`. The only commonly accepted use of loose equality is `if (val == null)` to check for both null AND undefined simultaneously.',
        commonMistakes: [
          'Using `||` instead of `??` when an empty string `""` or numeric `0` is a valid input.',
          'Attempting optional chaining on the left-hand side of an assignment (`user?.name = "Alex"` throws SyntaxError).'
        ],
        tip: 'Combine optional chaining with nullish coalescing for bulletproof API response parsing: `const city = res?.data?.location?.city ?? "Unknown";`.',
        interviewNote: 'Question: "What does NaN === NaN evaluate to?" Answer: "false! NaN is the only value in JavaScript that is not equal to itself. Use Number.isNaN(val) or Object.is(val, NaN) to check for NaN."',
        practiceQuestions: [
          {
            id: 'q-js3-1',
            type: 'mcq',
            question: 'What is the evaluated output of (null ?? "default") vs ("" || "fallback")?',
            options: ['"default" and ""', '"default" and "fallback"', 'null and "fallback"', 'Throws TypeError'],
            correctIndex: 1,
            explanation: 'null ?? "default" produces "default". For "" || "fallback", empty string is falsy so || evaluates to "fallback".'
          },
          {
            id: 'q-js3-2',
            type: 'output',
            question: 'What is the printed output of this comparison?',
            codeSnippet: 'console.log([] == ![]);',
            options: ['true', 'false', 'TypeError', 'undefined'],
            correctIndex: 0,
            explanation: '![] coerces to boolean false. Then [] == false triggers coercion: [] becomes "" (primitive) then 0, and false becomes 0. 0 == 0 evaluates to true!'
          }
        ],
        relatedTopics: ['Variables & Data Types', 'Control Flow', 'Objects']
      }
    ]
  },

  // CHAPTER 04 — CONTROL FLOW
  {
    id: 'js-ch04',
    number: 4,
    title: 'Control Flow',
    description: 'if-else branching, switch statements, guard clauses, and truthy/falsy evaluation',
    topics: [
      {
        id: 'js-control-flow',
        subjectId: 'js',
        chapterId: 'js-ch04',
        chapterNumber: 4,
        pageNumber: 4,
        title: 'Decision Making: if-else, Switch & Guard Clauses',
        difficulty: 'beginner',
        definition: 'Control flow structures direct code execution based on conditional boolean expressions, utilizing if-else trees, switch jump tables, and early return guard clauses.',
        whyItMatters: 'Writing flat code with guard clauses eliminates deeply nested "pyramids of doom" and improves cognitive clarity in critical business logic.',
        syntax: 'if (!user) return null; // Guard clause\nswitch (status) {\n  case "active": return handleActive();\n  default: return handleDefault();\n}',
        explanation: [
          'Truthy and Falsy: Exactly 8 values are falsy in JS: false, 0, -0, 0n, "", null, undefined, NaN. Everything else (including empty arrays [] and empty objects {}) is TRUTHY!',
          'Guard Clauses: Invert condition checks at top of functions to return or throw early, keeping the primary logic unindented and readable.',
          'switch statements use strict equality (===) comparison internally. Always end cases with `break` to prevent fallthrough, unless fallthrough is intentional.'
        ],
        example: {
          language: 'javascript',
          code: `// Guard Clause pattern vs Nested if
function processOrder(order) {
  if (!order) return { error: "Order missing" };
  if (!order.items || order.items.length === 0) return { error: "Empty cart" };
  if (!order.paymentAuthorized) return { error: "Payment required" };

  // Flat, clean main pathway
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  return { status: "Success", total };
}

console.log(processOrder({ items: [{ price: 49 }], paymentAuthorized: true }));`,
          output: '{ status: "Success", total: 49 }',
          annotations: [
            { line: 3, label: 'Guard clause 1: Null validation', type: 'yellow' },
            { line: 4, label: 'Guard clause 2: Empty items check', type: 'yellow' },
            { line: 8, label: 'Happy path executes cleanly without nesting', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Guard Clause Early Return Pattern',
          subtitle: 'Validating Preconditions Before Main Computation',
          elements: [
            { id: '1', label: 'Function Call', value: 'Enter function', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Precondition Check', sublabel: 'Invalid or missing data?', value: 'Guard Clause', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Happy Path', sublabel: 'Proceed with processing', value: 'Clean Execution', status: 'referenced' }
          ]
        },
        important: 'In JavaScript, empty array `[]` and empty object `{}` evaluate to `true` in conditional statements! Always test `arr.length === 0` or `Object.keys(obj).length === 0`.',
        commonMistakes: [
          'Checking if an array is empty with `if (arr)` instead of `if (arr.length)`.',
          'Omitting the `break` statement in a switch case, causing unintended fallthrough into the next case.'
        ],
        tip: 'Replace sprawling switch statements with dictionary lookups (object literals or Maps) when mapping states to handlers.',
        interviewNote: 'Question: "What values are considered falsy in JavaScript?" Answer: "Exactly eight: false, 0, -0, 0n, empty string \'\', null, undefined, and NaN."',
        practiceQuestions: [
          {
            id: 'q-js4-1',
            type: 'mcq',
            question: 'What is the boolean evaluation of Boolean([]) and Boolean({})?',
            options: ['false and false', 'true and false', 'true and true', 'Throws TypeError'],
            correctIndex: 2,
            explanation: 'All objects (including arrays and plain objects, even when empty) are truthy in JavaScript.'
          },
          {
            id: 'q-js4-2',
            type: 'debugging',
            question: 'What bug occurs in this function when discount is 0?',
            codeSnippet: 'function applyDiscount(discount) {\n  const rate = discount || 0.1;\n  return rate;\n}',
            options: ['It crashes with NaN', 'It returns 0.1 because 0 is falsy', 'It throws ReferenceError', 'It returns undefined'],
            correctIndex: 1,
            explanation: 'Because 0 is falsy, 0 || 0.1 evaluates to 0.1 instead of keeping the valid 0 discount. It should use `discount ?? 0.1`.'
          }
        ],
        relatedTopics: ['Operators & Expressions', 'Loops & Iteration', 'Functions']
      }
    ]
  },

  // CHAPTER 05 — LOOPS & ITERATION
  {
    id: 'js-ch05',
    number: 5,
    title: 'Loops & Iteration',
    description: 'for, while, do-while, modern for...of for iterables vs for...in for object keys',
    topics: [
      {
        id: 'js-loops',
        subjectId: 'js',
        chapterId: 'js-ch05',
        chapterNumber: 5,
        pageNumber: 5,
        title: 'Loops: for, while, for...of vs for...in',
        difficulty: 'beginner',
        definition: 'JavaScript provides classic counter-driven loops (for, while) alongside modern iteration constructs (for...of for iterable values and for...in for object property keys).',
        whyItMatters: 'Using the wrong loop construct (such as for...in on an Array) iterates over inherited prototype properties and array indices as strings rather than values.',
        syntax: 'for (const item of iterable) { ... }  // Iterates values of Arrays, Sets, Maps\nfor (const key in object) { ... }       // Iterates enumerable keys of Objects',
        explanation: [
          'for...of (ES6): Iterates over iterable objects (Arrays, Strings, Sets, Maps, NodeLists). Yields the actual elements directly. Does not work on plain objects unless Symbol.iterator is defined.',
          'for...in: Iterates over all enumerable string properties of an object, INCLUDING properties up the prototype chain. Never use for...in to iterate over arrays.',
          'Array methods like .forEach(), .map(), and .filter() are preferred in modern functional styles, but classic loops allow break, continue, and early return.'
        ],
        example: {
          language: 'javascript',
          code: `const languages = ["C", "C++", "Python", "Java", "JS"];

// for...of iterates array values
for (const lang of languages) {
  if (lang === "Python") continue;
  console.log("Language: " + lang);
}

// Object inspection with for...in
const car = { make: "Toyota", model: "Supra" };
for (const key in car) {
  if (Object.hasOwn(car, key)) {
    console.log(\`\${key}: \${car[key]}\`);
  }
}`,
          output: 'Language: C\nLanguage: C++\nLanguage: Java\nLanguage: JS\nmake: Toyota\nmodel: Supra',
          annotations: [
            { line: 4, label: 'for...of extracts array elements directly', type: 'blue' },
            { line: 5, label: 'continue skips current loop turn', type: 'yellow' },
            { line: 12, label: 'Object.hasOwn guards against inherited prototype keys', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'for...of vs for...in Loop Decision Rule',
          subtitle: 'Values of Iterables vs Enumerable Property Keys',
          elements: [
            { id: '1', label: 'Data Structure', value: 'Array, Set, Map or Object?', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Iterable (Array, Set, Map)', sublabel: 'Need values directly?', value: 'Use for...of', status: 'active' },
            { id: '3', label: 'Plain Object Keys', sublabel: 'Need property keys?', value: 'Use for...in or Object.keys()', status: 'referenced' }
          ]
        },
        important: 'Never use `for...in` on Arrays! It iterates indices as strings ("0", "1", "2") and will traverse any custom properties or polyfills attached to Array.prototype.',
        commonMistakes: [
          'Trying to loop over a plain object with `for...of` without calling `Object.entries(obj)` first.',
          'Modifying an array in-place while iterating forwards over it with index counter.'
        ],
        tip: 'Prefer `for (const [key, value] of Object.entries(obj))` for iterating through both keys and values of plain objects.',
        interviewNote: 'Question: "What is the difference between for...of and for...in?" Answer: "for...in iterates over the enumerable keys of an object (including prototype keys); for...of iterates over the values produced by an iterable object using its @@iterator protocol."',
        practiceQuestions: [
          {
            id: 'q-js5-1',
            type: 'mcq',
            question: 'Which loop construct will iterate directly over values of an Array or Set in ES6?',
            options: ['for...in', 'for...of', 'forEach...in', 'while...in'],
            correctIndex: 1,
            explanation: 'The for...of statement creates a loop iterating over iterable objects, invoking their Symbol.iterator method to yield values directly.'
          },
          {
            id: 'q-js5-2',
            type: 'output',
            question: 'What is logged by this loop?',
            codeSnippet: 'let sum = 0;\nfor (const n of [1, 2, 3, 4]) {\n  if (n % 2 === 0) sum += n;\n}\nconsole.log(sum);',
            options: ['10', '6', '4', '2'],
            correctIndex: 1,
            explanation: 'The loop sums only even numbers: 2 + 4 = 6.'
          }
        ],
        relatedTopics: ['Arrays', 'Objects', 'Iterators & Generators']
      }
    ]
  },

  // CHAPTER 06 — FUNCTIONS
  {
    id: 'js-ch06',
    number: 6,
    title: 'Functions & First-Class Citizens',
    description: 'Declarations, expressions, arrow functions, default/rest parameters, and higher-order functions',
    topics: [
      {
        id: 'js-functions',
        subjectId: 'js',
        chapterId: 'js-ch06',
        chapterNumber: 6,
        pageNumber: 6,
        title: 'Functions: First-Class Citizens, Arrow Functions & Rest Parameters',
        difficulty: 'beginner',
        definition: 'Functions in JavaScript are first-class objects, meaning they can be assigned to variables, passed as arguments, returned from other functions, and carry properties.',
        whyItMatters: 'Mastering arrow functions, lexical this scoping, and higher-order composition forms the bedrock of modern JavaScript and React development.',
        syntax: '// Declaration (hoisted)\nfunction add(a, b) { return a + b; }\n// Arrow function (lexical this, unhoisted)\nconst multiply = (a, b) => a * b;',
        explanation: [
          'Function Declarations are fully hoisted (both identifier and body) to the top of their scope.',
          'Function Expressions and Arrow Functions are assigned to variables and respect let/const hoisting rules (TDZ).',
          'Arrow Functions: Concise syntax, implicit return for single expressions, do NOT have their own `this`, `arguments`, `super`, or `new.target` (they inherit `this` lexically from enclosing scope).',
          'Rest Parameters (...args): Collects indeterminate arguments into a real JavaScript Array (replacing the legacy pseudo-array `arguments` object).'
        ],
        example: {
          language: 'javascript',
          code: `// Rest parameters & default arguments
const calculateTotal = (taxRate = 0.08, ...prices) => {
  const subtotal = prices.reduce((acc, p) => acc + p, 0);
  return subtotal + (subtotal * taxRate);
};

console.log(calculateTotal(0.1, 10, 20, 30)); // 60 + 6 = 66
console.log(calculateTotal(undefined, 100));  // 100 + 8 = 108

// Higher-order function: accepts function as argument
const applyOperation = (a, b, op) => op(a, b);
console.log(applyOperation(5, 3, (x, y) => x ** y)); // 5^3 = 125`,
          output: '66\n108\n125',
          annotations: [
            { line: 2, label: 'Default parameter taxRate = 0.08', type: 'yellow' },
            { line: 2, label: 'Rest parameter ...prices collects inputs into an array', type: 'blue' },
            { line: 12, label: 'Higher-order function receiving callback lambda', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Higher-Order Function Pipeline',
          subtitle: 'Functions Passed as Values and Returned as Values',
          elements: [
            { id: '1', label: 'Inputs (Data)', value: 'Values / State', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Higher-Order Function', sublabel: 'Takes callback function', value: 'op(a, b)', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Transform / Result', sublabel: 'Output computed deterministically', value: 'Return Value', status: 'referenced' }
          ]
        },
        important: 'Arrow functions CANNOT be used as constructors with the `new` keyword! Doing so throws `TypeError: ... is not a constructor`.',
        commonMistakes: [
          'Using arrow functions as object methods when expecting `this` to refer to the object (arrow functions inherit `this` from outer lexical scope).',
          'Forgetting that default parameters only trigger on `undefined`, NOT on `null`.'
        ],
        tip: 'Use arrow functions for non-method callbacks (e.g. array methods, timers), and standard function declarations for top-level utility functions and prototype methods.',
        interviewNote: 'Question: "What are the key differences between regular functions and arrow functions?" Answer: "1. Arrow functions have no `this` binding (lexical). 2. No `arguments` object. 3. Cannot be used as constructors (`new`). 4. No prototype property."',
        practiceQuestions: [
          {
            id: 'q-js6-1',
            type: 'mcq',
            question: 'What happens when calling an arrow function with the "new" operator?',
            options: ['It creates a new object', 'It throws a TypeError', 'It returns undefined', 'It binds this to window'],
            correctIndex: 1,
            explanation: 'Arrow functions lack an internal [[Construct]] method and prototype property, so invoking new throws a TypeError.'
          },
          {
            id: 'q-js6-2',
            type: 'output',
            question: 'What is logged by this function call with default parameters?',
            codeSnippet: 'const greet = (name = "Guest", count = 1) => `${name}:${count}`;\nconsole.log(greet(null, undefined));',
            options: ['"Guest:1"', '"null:1"', '"null:undefined"', '"Guest:undefined"'],
            correctIndex: 1,
            explanation: 'Default parameters only replace undefined. null is a valid value, so name is null. count was passed undefined, so it defaults to 1.'
          }
        ],
        relatedTopics: ['Scope & Execution', 'Closures', 'this & Object Model']
      }
    ]
  },

  // CHAPTER 07 — STRINGS
  {
    id: 'js-ch07',
    number: 7,
    title: 'Strings & Text Processing',
    description: 'Immutability, template literals, UTF-16, slice, substring, replaceAll, and split/join',
    topics: [
      {
        id: 'js-strings',
        subjectId: 'js',
        chapterId: 'js-ch07',
        chapterNumber: 7,
        pageNumber: 7,
        title: 'Strings: Immutability, Template Literals & Processing Methods',
        difficulty: 'beginner',
        definition: 'JavaScript strings are immutable sequences of UTF-16 code units. All string modification methods return new strings rather than modifying the original instance in memory.',
        whyItMatters: 'Text processing is omnipresent in web applications. Understanding regex replacements and immutability prevents performance bottlenecks and security vulnerabilities.',
        syntax: 'const str = `Total: USD ${price.toFixed(2)}`;\nconst parts = text.trim().toLowerCase().split(",");',
        explanation: [
          'Strings are primitive and immutable: `str[0] = "X"` silently fails in non-strict mode and throws in strict mode.',
          'Template Literals (``) allow multi-line strings, expression interpolation (`${expr}`), and tagged templates for custom parsing (used by styled-components and SQL sanitizers).',
          'Key Modern Methods: `.includes()`, `.startsWith()`, `.endsWith()`, `.slice(start, end)`, `.replaceAll(target, replacement)`, `.trim()`, `.padStart(targetLength, padString)`.'
        ],
        example: {
          language: 'javascript',
          code: `const title = "  Clean Architecture in JavaScript  ";
const cleaned = title.trim();
console.log(cleaned.toLowerCase());
console.log(cleaned.includes("Architecture")); // true

// replaceAll vs replace
const invoice = "ID-100-200-300";
console.log(invoice.replace("-", ":"));       // "ID:100-200-300" (first only)
console.log(invoice.replaceAll("-", ":"));    // "ID:100:200:300" (all matches)

// String padding
const invoiceNumber = "42";
console.log(invoiceNumber.padStart(6, "0"));   // "000042"`,
          output: 'clean architecture in javascript\ntrue\nID:100-200-300\nID:100:200:300\n000042',
          annotations: [
            { line: 4, label: 'includes returns boolean check', type: 'blue' },
            { line: 8, label: 'replace only changes the first occurrence', type: 'yellow' },
            { line: 9, label: 'replaceAll replaces all occurrences without regex', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'String Transformation Pipeline',
          subtitle: 'Pure Non-Mutating String Method Chaining',
          elements: [
            { id: '1', label: 'Raw Input', value: '"  admin@corp.io  "', status: 'normal', arrowTo: '2' },
            { id: '2', label: '.trim()', sublabel: 'Strip surrounding whitespace', value: '"admin@corp.io"', status: 'active', arrowTo: '3' },
            { id: '3', label: '.toLowerCase()', sublabel: 'Normalize character casing', value: '"admin@corp.io"', status: 'active', arrowTo: '4' },
            { id: '4', label: '.split("@")', sublabel: 'Partition by delimiter', value: '["admin", "corp.io"]', status: 'referenced' }
          ]
        },
        important: 'In JavaScript, `.slice(start, end)` is preferred over `.substr()` (deprecated) and `.substring()`. Negative indices in `.slice(-3)` count backwards from the end of the string.',
        commonMistakes: [
          'Attempting to mutate string characters by index (`str[0] = "H"` does nothing).',
          'Using `.replace("a", "b")` thinking it will replace every occurrence (it only replaces the first; use `.replaceAll()` or `/a/g`).'
        ],
        tip: 'Tagged template literals `tag\`Hello \${name}\`` allow you to intercept template parsing to sanitize HTML and protect against Cross-Site Scripting (XSS).',
        interviewNote: 'Question: "What is the time complexity of string concatenation in a loop vs array join?" Answer: "Because strings are immutable, repeated string concatenation copies buffers repeatedly creating O(N^2) memory allocations. Pushing to an array and using .join(\'\') is O(N)."',
        practiceQuestions: [
          {
            id: 'q-js7-1',
            type: 'output',
            question: 'What is the output of the following string slice operation?',
            codeSnippet: 'const text = "JavaScript";\nconsole.log(text.slice(-6, -2));',
            options: ['"Script"', '"Scri"', '"vaSc"', '"aScr"'],
            correctIndex: 1,
            explanation: '"JavaScript" has length 10. -6 index is "S" (pos 4), -2 index is "p" (pos 8, excluded). Slice takes characters from index 4 to 7: "Scri".'
          },
          {
            id: 'q-js7-2',
            type: 'true_false',
            question: 'True or False: JavaScript strings can be mutated in-place by assigning to their index positions.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation: 'False. Strings in JavaScript are immutable primitives. Index assignments are silently ignored in loose mode and throw TypeError in strict mode.'
          }
        ],
        relatedTopics: ['Regular Expressions', 'Arrays', 'JSON & Data Handling']
      }
    ]
  },

  // CHAPTER 08 — ARRAYS
  {
    id: 'js-ch08',
    number: 8,
    title: 'Arrays & Functional Iteration',
    description: 'Mutation methods, slice/splice, map, filter, reduce, find, some, every, flat, and destructuring',
    topics: [
      {
        id: 'js-arrays',
        subjectId: 'js',
        chapterId: 'js-ch08',
        chapterNumber: 8,
        pageNumber: 8,
        title: 'Arrays: Mutating vs Non-Mutating Methods & The Power of reduce()',
        difficulty: 'intermediate',
        definition: 'JavaScript arrays are list-like objects with integer-keyed properties and prototype methods for traversal, mutation, and functional transformation.',
        whyItMatters: 'Writing predictable, bug-free applications relies on knowing which array methods mutate in-place (push, splice, sort) vs which return fresh arrays (map, filter, slice, concat, toSorted).',
        syntax: 'const evens = nums.filter(n => n % 2 === 0);\nconst doubled = nums.map(n => n * 2);\nconst sum = nums.reduce((acc, curr) => acc + curr, 0);',
        explanation: [
          'Mutating Methods: `.push()`, `.pop()`, `.shift()`, `.unshift()`, `.splice()`, `.sort()`, `.reverse()`, `.fill()`. (Modern ES2023 adds non-mutating counterparts: `.toSorted()`, `.toReversed()`, `.toSpliced()`).',
          'Non-Mutating Transform Methods: `.map()`, `.filter()`, `.slice()`, `.concat()`, `.flat()`, `.flatMap()`.',
          'Search & Predicate: `.find()`, `.findIndex()`, `.findLast()`, `.some()`, `.every()`, `.includes()`.',
          '.reduce(fn, initialValue): The universal aggregator. Can implement map, filter, group-by, frequency maps, and promise waterfalls.'
        ],
        example: {
          language: 'javascript',
          code: `const products = [
  { id: 1, name: "Keyboard", category: "Electronics", price: 120 },
  { id: 2, name: "Notebook", category: "Stationery", price: 15 },
  { id: 3, name: "Mouse", category: "Electronics", price: 60 }
];

// Chain filter and map
const expensiveElectronics = products
  .filter(p => p.category === "Electronics")
  .map(p => p.name);
console.log(expensiveElectronics); // ["Keyboard", "Mouse"]

// Group by category using reduce
const grouped = products.reduce((acc, p) => {
  (acc[p.category] ??= []).push(p.name);
  return acc;
}, {});
console.log(grouped);`,
          output: '["Keyboard", "Mouse"]\n{ Electronics: ["Keyboard", "Mouse"], Stationery: ["Notebook"] }',
          annotations: [
            { line: 8, label: 'filter keeps items where predicate is true', type: 'blue' },
            { line: 9, label: 'map transforms each item to string name', type: 'yellow' },
            { line: 14, label: 'reduce with nullish assignment (?=) grouping', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Functional Array Pipeline: Filter → Map → Reduce',
          subtitle: 'Immutably Transforming Data Pipelines',
          elements: [
            { id: '1', label: 'Original Array', value: '[1, 2, 3, 4, 5, 6]', status: 'normal', arrowTo: '2' },
            { id: '2', label: '.filter(n % 2 === 0)', sublabel: 'Discard odd values', value: '[2, 4, 6]', status: 'active', arrowTo: '3' },
            { id: '3', label: '.map(n * 10)', sublabel: 'Multiply by 10', value: '[20, 40, 60]', status: 'active', arrowTo: '4' },
            { id: '4', label: '.reduce(sum + n, 0)', sublabel: 'Aggregate total', value: '120', status: 'referenced' }
          ]
        },
        important: 'Always supply an initial value to `.reduce()`! Calling `.reduce()` without an initial value on an empty array throws `TypeError: Reduce of empty array with no initial value`.',
        commonMistakes: [
          'Using `.sort()` without a comparator function on numbers: `[10, 5, 20].sort()` sorts alphabetically as `[10, 20, 5]`. Always write `.sort((a, b) => a - b)`.',
          'Accidentally mutating state in React or Redux by calling `.push()` or `.sort()` directly.'
        ],
        tip: 'In modern JavaScript (ES2023+), use `arr.toSorted()`, `arr.toReversed()`, and `arr.toSpliced()` to sort and mutate without altering the original array.',
        interviewNote: 'Question: "What is the difference between Array.prototype.map and Array.prototype.forEach?" Answer: "forEach executes a callback for each element and always returns undefined; map transforms each element and returns a brand-new array of equal length."',
        practiceQuestions: [
          {
            id: 'q-js8-1',
            type: 'output',
            question: 'What is the output of [3, 20, 100].sort() in JavaScript?',
            codeSnippet: 'console.log([3, 20, 100].sort());',
            options: ['[3, 20, 100]', '[100, 20, 3]', '[100, 3, 20]', '[20, 100, 3]'],
            correctIndex: 2,
            explanation: 'Default .sort() converts elements to strings and compares UTF-16 code units: "100" < "20" < "3" alphabetically, giving [100, 20, 3]!'
          },
          {
            id: 'q-js8-2',
            type: 'mcq',
            question: 'Which array method does NOT mutate the original array in-place?',
            options: ['arr.splice(0, 1)', 'arr.reverse()', 'arr.slice(0, 1)', 'arr.push(42)'],
            correctIndex: 2,
            explanation: 'arr.slice() extracts a shallow copy of a portion of an array without modifying the original array.'
          }
        ],
        relatedTopics: ['Objects', 'Destructuring & Spread', 'Functional JavaScript']
      }
    ]
  },

  // CHAPTER 09 — OBJECTS
  {
    id: 'js-ch09',
    number: 9,
    title: 'Objects & Data Models',
    description: 'Literals, property access, computed keys, Object methods, references, and deep cloning',
    topics: [
      {
        id: 'js-objects',
        subjectId: 'js',
        chapterId: 'js-ch09',
        chapterNumber: 9,
        pageNumber: 9,
        title: 'Objects: References, Property Access & Deep vs Shallow Cloning',
        difficulty: 'intermediate',
        definition: 'Objects are collections of keyed properties mapping string/symbol keys to values. Object variables hold references (pointers) to heap memory locations.',
        whyItMatters: 'Because objects are copied by reference, mutating a copied object silently mutates the original object across all referencing components unless properly cloned.',
        syntax: 'const key = "role";\nconst user = { name: "Alex", [key]: "Architect" }; // Computed property\nconst copy = { ...user }; // Shallow copy\nconst deep = structuredClone(user); // Native deep copy',
        explanation: [
          'Property Access: Dot notation (`obj.prop`) requires valid identifiers. Bracket notation (`obj["computed-key"]`) allows dynamic expressions, spaces, and symbols.',
          'Static Object Helpers: `Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)`, `Object.assign()`, `Object.freeze()`, `Object.hasOwn(obj, key)`.',
          'Shallow Copy vs Deep Copy: Spread `{ ...obj }` and `Object.assign()` only copy top-level values; nested objects still share memory references! Use native `structuredClone()` for circular-safe deep copies.'
        ],
        example: {
          language: 'javascript',
          code: `const original = {
  title: "Systems Engineer",
  skills: ["C", "Linux"],
  details: { level: "Senior" }
};

// Shallow copy via spread
const shallow = { ...original };
shallow.skills.push("JavaScript"); // MUTATES original.skills!

console.log(original.skills); // ["C", "Linux", "JavaScript"]

// Native deep copy (Modern ES2022+)
const deep = structuredClone(original);
deep.details.level = "Lead";
console.log(original.details.level); // "Senior" (Untouched!)`,
          output: '["C", "Linux", "JavaScript"]\n"Senior"',
          annotations: [
            { line: 9, label: 'Shallow copy shares nested skills array reference', type: 'red' },
            { line: 14, label: 'structuredClone creates an isolated deep duplicate', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Object Reference & Memory Layout',
          subtitle: 'Stack Variable Pointers vs Heap Object Allocation',
          elements: [
            { id: '1', label: 'Stack: user1', sublabel: 'Reference Pointer', value: '0x7FF01', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Heap: Object Memory', sublabel: '0x7FF01', value: '{ name: "Alex", age: 30 }', status: 'normal' },
            { id: '3', label: 'Stack: user2 = user1', sublabel: 'Copies Address 0x7FF01', value: '0x7FF01', status: 'warning', arrowTo: '2' }
          ]
        },
        important: 'Never use `JSON.parse(JSON.stringify(obj))` for deep copies in modern applications. It destroys Dates, RegExps, Maps, Sets, undefined, and throws errors on circular references. Always use native `structuredClone()`.',
        commonMistakes: [
          'Assuming `{ ...obj }` creates a deep copy.',
          'Comparing objects with `obj1 === obj2`. In JavaScript, objects are compared by memory reference, NOT by property equivalence. Two identical objects `{ a: 1 } === { a: 1 }` evaluate to false.'
        ],
        tip: 'Use `Object.freeze(obj)` to prevent adding, deleting, or reassigning top-level properties of configuration objects.',
        interviewNote: 'Question: "Why does { a: 1 } === { a: 1 } evaluate to false?" Answer: "In JavaScript, objects are reference types. The === operator compares memory addresses. Each object literal allocates a separate heap location."',
        practiceQuestions: [
          {
            id: 'q-js9-1',
            type: 'output',
            question: 'What is logged by this reference mutation?',
            codeSnippet: 'const a = { x: 1 };\nconst b = a;\nb.x = 99;\nconsole.log(a.x);',
            options: ['1', '99', 'undefined', 'ReferenceError'],
            correctIndex: 1,
            explanation: 'Both a and b hold the identical memory address pointer to the object in heap memory. Mutating through b modifies the object seen by a.'
          },
          {
            id: 'q-js9-2',
            type: 'mcq',
            question: 'Which method creates a true deep copy supporting nested arrays, Sets, Maps, and Dates without external libraries?',
            options: ['Object.assign({}, obj)', '{ ...obj }', 'structuredClone(obj)', 'obj.slice()'],
            correctIndex: 2,
            explanation: 'structuredClone() is the built-in browser and Node.js standard algorithm for producing deep copies of structured data.'
          }
        ],
        relatedTopics: ['Arrays', 'Destructuring & Spread', 'Prototypes & OOP']
      }
    ]
  },

  // CHAPTER 10 — DESTRUCTURING & SPREAD
  {
    id: 'js-ch10',
    number: 10,
    title: 'Destructuring, Rest & Spread',
    description: 'Array/Object destructuring, default fallback values, nested unpacking, and rest collections',
    topics: [
      {
        id: 'js-destructuring',
        subjectId: 'js',
        chapterId: 'js-ch10',
        chapterNumber: 10,
        pageNumber: 10,
        title: 'Pattern Matching: Destructuring & Spread Syntax',
        difficulty: 'intermediate',
        definition: 'Destructuring is a syntax enabling direct extraction of multiple values from arrays or object properties into distinct variables using structural matching patterns.',
        whyItMatters: 'Destructuring streamlines component property unpacking, API response extraction, and immutable state updates in modern JavaScript.',
        syntax: 'const { name, age = 18, address: { city } } = user;\nconst [first, second, ...rest] = array;',
        explanation: [
          'Object Destructuring: Matches by property key name. Allows renaming (`{ key: alias }`) and default values (`{ key = fallback }`).',
          'Array Destructuring: Matches by index position. Allows skipping elements (`const [, , third] = arr;`).',
          'Rest Operator (...): Must appear at the end of the pattern. Collects remaining elements into a new array or object.',
          'Spread Operator (...): Unpacks array items or object properties into a new literal, function arguments, or composite collection.'
        ],
        example: {
          language: 'javascript',
          code: `// Object destructuring with renaming & defaults
const serverResponse = {
  status: 200,
  data: {
    user_name: "jdoe",
    preferences: { theme: "dark" }
  }
};

const {
  status,
  data: { user_name: username, preferences: { theme = "light" } }
} = serverResponse;

console.log(status);    // 200
console.log(username);  // "jdoe" (renamed!)
console.log(theme);     // "dark"

// Array destructuring with swap trick
let a = 1, b = 2;
[a, b] = [b, a]; // Variable swap without temporary variable!
console.log(a, b); // 2, 1`,
          output: '200\n"jdoe"\n"dark"\n2 1',
          annotations: [
            { line: 11, label: 'Deep destructuring with alias user_name: username', type: 'blue' },
            { line: 11, label: 'Default value fallback if theme is undefined', type: 'yellow' },
            { line: 18, label: 'Idiomatic zero-temp variable swap', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Structural Destructuring Unpacking',
          subtitle: 'Extracting Granular Properties from Composite Payloads',
          elements: [
            { id: '1', label: 'Composite Object', value: '{ id: 101, name: "Max", role: "Dev" }', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Pattern: { name, role }', sublabel: 'Matches key names', value: 'Unpacking', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Variables in Scope', sublabel: 'name = "Max", role = "Dev"', value: 'Discrete Identifiers', status: 'referenced' }
          ]
        },
        important: 'Destructuring null or undefined (`const { x } = null;`) immediately throws an uncatchable `TypeError: Cannot destructure property \'x\' of null as it is null`. Always guard with default fallback objects: `const { x } = obj ?? {};`.',
        commonMistakes: [
          'Confusing renaming with default assignment: `{ prop: alias = default }` (colon renames, equals assigns default).',
          'Placing the rest parameter anywhere other than the last position.'
        ],
        tip: 'Destructure function parameters directly in the signature: `function renderUser({ name, email = "N/A" }) { ... }`.',
        interviewNote: 'Question: "How do you swap two variables in JavaScript without a third temporary variable?" Answer: "Using array destructuring assignment: `[a, b] = [b, a];`."',
        practiceQuestions: [
          {
            id: 'q-js10-1',
            type: 'output',
            question: 'What is logged by this destructuring statement with rest syntax?',
            codeSnippet: 'const [first, ...rest] = [10, 20, 30, 40];\nconsole.log(rest.length);',
            options: ['4', '3', '1', 'undefined'],
            correctIndex: 1,
            explanation: 'first takes 10, and rest collects the remaining 3 elements [20, 30, 40], so rest.length is 3.'
          },
          {
            id: 'q-js10-2',
            type: 'debugging',
            question: 'What error occurs in this destructuring syntax?',
            codeSnippet: 'const { ...rest, last } = { a: 1, b: 2, last: 3 };',
            options: ['SyntaxError: Rest element must be last element', 'TypeError: Cannot unpack', 'Evaluates fine', 'ReferenceError'],
            correctIndex: 0,
            explanation: 'The rest element ...rest must always be the final element in a destructuring or parameter pattern.'
          }
        ],
        relatedTopics: ['Objects', 'Arrays', 'Functions']
      }
    ]
  },

  // CHAPTER 11 — SCOPE & EXECUTION CONTEXT
  {
    id: 'js-ch11',
    number: 11,
    title: 'Scope, Execution Context & Hoisting',
    description: 'Global, function and block scopes, Call Stack, Variable Environment, and Temporal Dead Zone',
    topics: [
      {
        id: 'js-scope-hoisting',
        subjectId: 'js',
        chapterId: 'js-ch11',
        chapterNumber: 11,
        pageNumber: 11,
        title: 'Scope Chain, Execution Contexts & The Temporal Dead Zone',
        difficulty: 'intermediate',
        definition: 'Scope is the current context of code which determines accessibility of identifiers. An Execution Context is an internal data structure managing code evaluation and the Call Stack.',
        whyItMatters: 'Understanding execution context creation phases and lexical scoping demystifies hoisting bugs, closure memory retention, and variable shadowing.',
        syntax: '// Lexical Scope Hierarchy\nconst globalVar = "global";\nfunction outer() {\n  const outerVar = "outer";\n  function inner() { console.log(globalVar, outerVar); }\n}',
        explanation: [
          'Execution Context Lifecycle: 1. Creation Phase (Allocates memory for variables and functions, sets up scope chain and `this`), 2. Execution Phase (Runs code line by line).',
          'Hoisting: Function declarations are hoisted completely (name and body). `var` is hoisted with initial value `undefined`. `let` and `const` are hoisted into the Temporal Dead Zone (TDZ).',
          'Temporal Dead Zone (TDZ): The span between entering block scope and the variable declaration line. Accessing the variable in TDZ throws a ReferenceError.',
          'Scope Types: Global Scope, Function Scope (created by function bodies), Block Scope (created by `{ ... }` for let/const).'
        ],
        example: {
          language: 'javascript',
          code: `// Hoisting demo
console.log(hoistedFunc()); // Works: "I am hoisted!"
// console.log(tdzVar);    // ReferenceError: Cannot access 'tdzVar' before initialization
// console.log(varVar);     // undefined (hoisted without value)

function hoistedFunc() {
  return "I am hoisted!";
}

let tdzVar = "Now initialized";
var varVar = "Var initialized";

// Scope Chain lookup
const layer = "Global";
function first() {
  const layer = "First Level";
  function second() {
    console.log(layer); // Lexical lookup finds "First Level"
  }
  second();
}
first();`,
          output: '"I am hoisted!"\n"First Level"',
          annotations: [
            { line: 2, label: 'Function declaration is callable before line of definition', type: 'green' },
            { line: 3, label: 'let in TDZ throws ReferenceError if uncommented', type: 'red' },
            { line: 17, label: 'Lexical resolution checks nearest parent scope first', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Lexical Scope Chain Resolution Hierarchy',
          subtitle: 'Engine Traversing Upward from Inner Block to Global Context',
          elements: [
            { id: '1', label: 'Global Execution Context', value: 'window / globalThis', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Outer Function Scope', sublabel: 'Parent Lexical Scope', value: 'outerVar, params', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Inner Function Scope', sublabel: 'Current Execution Context', value: 'Local Block Variables', status: 'referenced' }
          ]
        },
        important: 'Lexical scoping means variable scope is determined at AUTHOR TIME by where functions and blocks are physically placed in source code, NOT where they are called at runtime.',
        commonMistakes: [
          'Believing that `let` and `const` are not hoisted; they ARE hoisted, but placed in the TDZ rather than initialized to undefined.',
          'Accidental variable leaks caused by assigning to an undeclared variable without `strict mode` (creates an accidental global).'
        ],
        tip: 'Write clean nested blocks and keep scope lifetimes as brief as possible to allow the V8 garbage collector to reclaim unreachable memory rapidly.',
        interviewNote: 'Question: "What is the Temporal Dead Zone (TDZ)?" Answer: "The TDZ is the period of time between when a block scope is entered and when a let or const variable is formally declared. Any read/write access to the variable inside the TDZ throws a ReferenceError."',
        practiceQuestions: [
          {
            id: 'q-js11-1',
            type: 'output',
            question: 'What is logged by the console statement?',
            codeSnippet: 'var x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();',
            options: ['1', '2', 'undefined', 'ReferenceError'],
            correctIndex: 2,
            explanation: 'Inside test(), local var x is hoisted to top of function with value undefined. The local x shadows the global x, so undefined is logged!'
          },
          {
            id: 'q-js11-2',
            type: 'mcq',
            question: 'What determines the scope chain of a JavaScript function?',
            options: ['Where the function is called at runtime', 'Where the function is defined in the source code (lexical)', 'The call stack depth', 'The number of arguments passed'],
            correctIndex: 1,
            explanation: 'JavaScript uses lexical (static) scoping, meaning variable resolution is governed by the physical location where the function was declared.'
          }
        ],
        relatedTopics: ['Closures', 'this & Object Model', 'V8 Runtime & Engine']
      }
    ]
  },

  // CHAPTER 12 — CLOSURES
  {
    id: 'js-ch12',
    number: 12,
    title: 'Closures & Lexical Environments',
    description: 'Inner function memory retention, private state encapsulation, factory patterns, and interview traps',
    topics: [
      {
        id: 'js-closures',
        subjectId: 'js',
        chapterId: 'js-ch12',
        chapterNumber: 12,
        pageNumber: 12,
        title: 'Closures: Memory Retention, Private State & Factory Functions',
        difficulty: 'intermediate',
        definition: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment, allowing an inner function to access an outer scope even after the outer function has finished executing.',
        whyItMatters: 'Closures power private state, functional currying, memoization caches, React hooks (useState/useEffect), and event handler callbacks.',
        syntax: 'function createCounter() {\n  let count = 0; // Private encapsulated state\n  return () => ++count;\n}\nconst counter = createCounter();',
        explanation: [
          'When a function is declared, it retains an internal reference (`[[Environment]]`) to its outer lexical scope.',
          'Even when the outer function completes and its frame pops off the Call Stack, variables referenced by inner closures are kept alive in Heap memory and not garbage collected.',
          'Use Cases: Data hiding/encapsulation (private variables), function factories, memoization/caching, debounce/throttle utilities.',
          'Classic Loop Trap: Using `var i` inside a `setTimeout` creates one shared variable; using `let i` creates a fresh binding per iteration closure.'
        ],
        example: {
          language: 'javascript',
          code: `// Encapsulated Bank Account with private balance
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Truly private state!

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Invalid deposit");
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
// account.balance is undefined! Cannot be tampered with directly.`,
          output: '150',
          annotations: [
            { line: 3, label: 'balance lives in closure heap memory, inaccessible from outside', type: 'green' },
            { line: 6, label: 'Returned methods maintain closure over balance', type: 'blue' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Closure Lexical Scope Retention in Memory',
          subtitle: 'Inner Function Retaining Heap Reference to Outer Frame Variables',
          elements: [
            { id: '1', label: 'Call Stack: Popped', value: 'createBankAccount() Finished', status: 'normal' },
            { id: '2', label: 'Closure Scope (Heap)', sublabel: 'Retained Environment', value: 'let balance = 150', status: 'active', arrowTo: '3' },
            { id: '3', label: 'account.getBalance()', sublabel: 'Holds [[Environment]] pointer', value: 'Returns 150', status: 'referenced' }
          ]
        },
        important: 'Beware of unintended memory leaks! If a closure retains references to large DOM trees or arrays that are never cleaned up, they cannot be collected by the Garbage Collector.',
        commonMistakes: [
          'Looping with `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }`. Because `var` is function-scoped, all 3 callbacks reference the same `i` (logs 3, 3, 3). Replace with `let i`.',
          'Creating unnecessary closures inside performance-critical tight loops.'
        ],
        tip: 'Use closures to build clean factory functions instead of class constructors when you want true private state without `#privateField` syntax.',
        interviewNote: 'Question: "What is a closure and why is it useful?" Answer: "A closure is a function that remembers its outer variables and can access them. It is useful for data encapsulation (private variables), maintaining state between asynchronous calls, and creating specialized function factories."',
        practiceQuestions: [
          {
            id: 'q-js12-1',
            type: 'output',
            question: 'What is printed by this classic closure question?',
            codeSnippet: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
            options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
            correctIndex: 1,
            explanation: 'var i is function/global scoped. By the time the micro/macrotasks run, the synchronous loop has finished and i equals 3. All 3 callbacks log 3.'
          },
          {
            id: 'q-js12-2',
            type: 'mcq',
            question: 'How do you fix the loop trap so it prints 0, 1, 2 sequentially?',
            options: ['Change var i to let i', 'Change setTimeout delay to 1000', 'Use while loop instead', 'Add return statement'],
            correctIndex: 0,
            explanation: 'let is block-scoped. Each loop iteration creates a new lexical environment binding for i, preserved by each closure.'
          }
        ],
        relatedTopics: ['Scope & Execution Context', 'Functions', 'Functional JavaScript']
      }
    ]
  }
];
