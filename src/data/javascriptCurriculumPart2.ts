import { Chapter } from '../types/notebook';

export const JAVASCRIPT_CHAPTERS_PART2: Chapter[] = [
  // CHAPTER 13 — THIS & OBJECT MODEL
  {
    id: 'js-ch13',
    number: 13,
    title: 'this & The JavaScript Object Model',
    description: 'Dynamic invocation binding, call(), apply(), bind(), and lexical arrow function this',
    topics: [
      {
        id: 'js-this-binding',
        subjectId: 'js',
        chapterId: 'js-ch13',
        chapterNumber: 13,
        pageNumber: 13,
        title: 'this Binding Rules: Default, Implicit, Explicit (call/apply/bind) & Lexical',
        difficulty: 'intermediate',
        definition: 'The `this` keyword refers to the execution context object determined dynamically at function invocation time by how a function is called, not where it is declared.',
        whyItMatters: 'Losing `this` context when passing object methods as callbacks is one of the most common runtime bugs in frontend JavaScript and event handling.',
        syntax: 'fn.call(thisArg, arg1, arg2);     // Immediate execution, comma list\nfn.apply(thisArg, [args]);        // Immediate execution, array\nconst bound = fn.bind(thisArg);   // Returns new function with fixed this',
        explanation: [
          'The 4 Rules of `this` Determination: 1. Default Binding (standalone call `fn()` -> global `window` in loose mode, `undefined` in strict mode).',
          '2. Implicit Binding: Invoked as an object method `obj.fn()` -> `this` is `obj`.',
          '3. Explicit Binding: Forcibly bound via `.call()`, `.apply()`, or `.bind()`.',
          '4. New Binding: Called with `new Fn()` -> `this` is the freshly allocated object.',
          'Arrow Function Exception: Arrow functions have NO `this` of their own. They resolve `this` lexically from their enclosing scope, ignoring call/apply/bind override.'
        ],
        example: {
          language: 'javascript',
          code: `const engineer = {
  name: "Devin",
  languages: ["JS", "TypeScript"],
  logLanguages() {
    // Arrow function captures 'this' lexically from logLanguages
    this.languages.forEach((lang) => {
      console.log(this.name + " codes in " + lang);
    });
  }
};

engineer.logLanguages();

// Explicit binding with .call()
function introduce(greeting) {
  console.log(greeting + ", I am " + this.name);
}
introduce.call(engineer, "Hello"); // "Hello, I am Devin"`,
          output: 'Devin codes in JS\nDevin codes in TypeScript\nHello, I am Devin',
          annotations: [
            { line: 6, label: 'Arrow callback inherits this from logLanguages', type: 'green' },
            { line: 18, label: 'Explicitly passes engineer as thisArg', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'JavaScript this Binding Precedence Hierarchy',
          subtitle: 'From Highest Precedence to Lowest Precedence',
          elements: [
            { id: '1', label: '1. new Keyword', sublabel: 'new Constructor()', value: 'Highest Precedence', status: 'active', arrowTo: '2' },
            { id: '2', label: '2. Explicit Binding', sublabel: '.bind() / .call() / .apply()', value: 'Forced Context', status: 'active', arrowTo: '3' },
            { id: '3', label: '3. Implicit Binding', sublabel: 'object.method()', value: 'Context is Caller Object', status: 'normal', arrowTo: '4' },
            { id: '4', label: '4. Default Binding', sublabel: 'standalone()', value: 'undefined (strict) / window', status: 'warning' }
          ]
        },
        important: 'Passing an object method directly as an event listener or callback loses its implicit binding: `btn.addEventListener("click", user.login)` executes with `this` set to `btn`, not `user`. Fix with arrow function `() => user.login()` or `user.login.bind(user)`.',
        commonMistakes: [
          'Using arrow functions as object methods when expecting `this` to point to the object.',
          'Confusing `.call()` (arguments passed individually) with `.apply()` (arguments passed as an array).'
        ],
        tip: 'Memory mnemonic: Call takes Commas (`.call(this, 1, 2)`), Apply takes Array (`.apply(this, [1, 2])`), Bind produces Bound function.',
        interviewNote: 'Question: "What is the difference between call, apply, and bind?" Answer: "call and apply invoke the function immediately with a specified this context (call with comma arguments, apply with an array). bind does not invoke immediately; it returns a new function with this permanently locked to the provided object."',
        practiceQuestions: [
          {
            id: 'q-js13-1',
            type: 'output',
            question: 'What is logged when calling boundFn()?',
            codeSnippet: 'const obj = { x: 42 };\nfunction getX() { return this.x; }\nconst bound = getX.bind(obj);\nconsole.log(bound.call({ x: 99 }));',
            options: ['99', '42', 'undefined', 'TypeError'],
            correctIndex: 1,
            explanation: 'A function created with .bind() has hard-bound this. Subsequent attempts to re-bind or override this using .call() or .apply() are ignored.'
          },
          {
            id: 'q-js13-2',
            type: 'mcq',
            question: 'What is this inside a standalone function invoked in strict mode ("use strict")?',
            options: ['window / globalThis', 'undefined', 'null', 'Empty Object {}'],
            correctIndex: 1,
            explanation: 'In strict mode, default binding does not fall back to the global object; it safely evaluates to undefined.'
          }
        ],
        relatedTopics: ['Functions', 'Prototypes & OOP', 'DOM Events']
      }
    ]
  },

  // CHAPTER 14 — PROTOTYPES & OOP
  {
    id: 'js-ch14',
    number: 14,
    title: 'Prototypes & Modern OOP',
    description: 'Prototype chain, ES6 class syntax, inheritance (extends/super), private fields (#), and getters/setters',
    topics: [
      {
        id: 'js-prototypes-oop',
        subjectId: 'js',
        chapterId: 'js-ch14',
        chapterNumber: 14,
        pageNumber: 14,
        title: 'Prototype Chain & Modern ES6+ Classes',
        difficulty: 'intermediate',
        definition: 'JavaScript uses prototypal inheritance: objects possess a private link ([[Prototype]]) to another prototype object. ES6 classes provide syntactic sugar over this prototype chain.',
        whyItMatters: 'All built-in JavaScript methods (Array.prototype.map, Object.prototype.toString) leverage prototype delegation for high memory efficiency.',
        syntax: 'class Admin extends User {\n  #apiKey; // Private field (ES2022)\n  constructor(name, apiKey) {\n    super(name);\n    this.#apiKey = apiKey;\n  }\n}',
        explanation: [
          'Prototype Delegation: When accessing `obj.prop`, if the property does not exist on `obj`, the engine searches `obj.__proto__`, then `obj.__proto__.__proto__`, until reaching `Object.prototype`, and finally `null`.',
          'Memory Efficiency: Methods attached to the prototype are instantiated once in memory and shared across all instances, unlike defining methods inside constructors.',
          'ES6 Classes: Feature clean syntax for `constructor()`, `extends`, `super()`, static methods (`static check()`), getters/setters (`get/set`), and native private fields (`#secret`).'
        ],
        example: {
          language: 'javascript',
          code: `class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  getDetails() {
    return this.brand + " " + this.model;
  }
}

class ElectricCar extends Vehicle {
  #batteryKwh; // True private field
  constructor(brand, model, batteryKwh) {
    super(brand, model);
    this.#batteryKwh = batteryKwh;
  }
  getBatteryStatus() {
    return this.getDetails() + " (" + this.#batteryKwh + " kWh)";
  }
}

const tesla = new ElectricCar("Tesla", "Model S", 100);
console.log(tesla.getBatteryStatus());
console.log(tesla instanceof Vehicle); // true`,
          output: 'Tesla Model S (100 kWh)\ntrue',
          annotations: [
            { line: 11, label: 'Private field syntax prevents external read/write access', type: 'yellow' },
            { line: 13, label: 'super calls parent Vehicle constructor before initializing this', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'JavaScript Prototype Delegation Chain',
          subtitle: 'Instance Delegating Upward to Terminal null',
          elements: [
            { id: '1', label: 'tesla (ElectricCar instance)', value: 'Own properties: brand, model', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'ElectricCar.prototype', sublabel: 'Inherits getBatteryStatus()', value: 'Subclass Prototype', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Vehicle.prototype', sublabel: 'Inherits getDetails()', value: 'Superclass Prototype', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Object.prototype', sublabel: 'toString(), hasOwnProperty()', value: 'Universal Root Prototype', status: 'referenced', arrowTo: '5' },
            { id: '5', label: 'null', sublabel: 'End of Prototype Chain', value: 'Chain Terminator', status: 'normal' }
          ]
        },
        important: 'In a subclass constructor, you MUST call `super()` before accessing `this`! Failure to do so throws `ReferenceError: Must call super constructor in derived class before accessing \'this\'`.',
        commonMistakes: [
          'Modifying built-in prototypes like `Array.prototype` (prototype pollution can break third-party libraries).',
          'Attempting to access `#privateField` outside the class body (throws SyntaxError at parse time).'
        ],
        tip: 'Favor object composition over deep inheritance hierarchies (`"Favor composition over inheritance"`).',
        interviewNote: 'Question: "What is the difference between prototypal inheritance and classical inheritance?" Answer: "In classical inheritance, classes are blueprints and instances are separate copies. In JavaScript prototypal inheritance, objects link directly to other objects via references; instances delegate method calls up the live prototype chain."',
        practiceQuestions: [
          {
            id: 'q-js14-1',
            type: 'mcq',
            question: 'What is at the very top (terminus) of the JavaScript prototype chain?',
            options: ['Object.prototype', 'Function.prototype', 'null', 'undefined'],
            correctIndex: 2,
            explanation: 'Object.prototype.__proto__ evaluates strictly to null, marking the end of the prototype chain.'
          },
          {
            id: 'q-js14-2',
            type: 'output',
            question: 'What is the output of checking prototype property sharing?',
            codeSnippet: 'function User(name) { this.name = name; }\nUser.prototype.greet = () => "Hello";\nconst u1 = new User("A");\nconst u2 = new User("B");\nconsole.log(u1.greet === u2.greet);',
            options: ['true', 'false', 'undefined', 'TypeError'],
            correctIndex: 0,
            explanation: 'true! Both u1 and u2 delegate to the single shared greet function defined on User.prototype, conserving heap memory.'
          }
        ],
        relatedTopics: ['this & Object Model', 'Objects', 'Design Patterns']
      }
    ]
  },

  // CHAPTER 15 — ERROR HANDLING
  {
    id: 'js-ch15',
    number: 15,
    title: 'Error Handling & Defensive Coding',
    description: 'try-catch-finally, custom Error classes, Error.captureStackTrace, and defensive programming',
    topics: [
      {
        id: 'js-error-handling',
        subjectId: 'js',
        chapterId: 'js-ch15',
        chapterNumber: 15,
        pageNumber: 15,
        title: 'Error Handling: try-catch-finally & Custom Domain Errors',
        difficulty: 'intermediate',
        definition: 'Error handling manages runtime anomalies gracefully using try-catch blocks and explicit error throwing, ensuring system stability and actionable diagnostic logs.',
        whyItMatters: 'Unhandled errors crash the JavaScript execution stack, leaving users with broken UI states or abruptly terminating backend Node.js microservices.',
        syntax: 'try {\n  riskyOperation();\n} catch (err) {\n  handleError(err);\n} finally {\n  cleanupResources(); // Always executes\n}',
        explanation: [
          'Built-in Error Types: `Error`, `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`, `URIError`.',
          'try-catch-finally: The `finally` block ALWAYS executes, even if `return` is called inside `try` or `catch`.',
          'Custom Error Classes: Subclassing `Error` creates identifiable domain-specific errors (e.g., `ValidationError`, `HttpError`) with status codes.',
          'Modern Optional Catch Binding (ES2019): You can write `catch { ... }` without binding the error variable if it is unneeded.'
        ],
        example: {
          language: 'javascript',
          code: `class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function parseUserData(rawJson) {
  try {
    const data = JSON.parse(rawJson);
    if (!data.email) throw new ValidationError("Missing email", "email");
    return data;
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log("Validation Failed on field: " + err.field);
    } else {
      console.log("JSON Parse Error: " + err.message);
    }
  } finally {
    console.log("Parsing operation completed.");
  }
}

parseUserData('{ "name": "Alex" }');`,
          output: 'Validation Failed on field: email\nParsing operation completed.',
          annotations: [
            { line: 1, label: 'Custom Domain Error extending standard Error', type: 'yellow' },
            { line: 15, label: 'instanceof check discriminates error types', type: 'blue' },
            { line: 20, label: 'finally guarantees execution regardless of outcome', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'try-catch-finally Execution Lifecycle',
          subtitle: 'Guaranteed Deterministic Resource Cleanup',
          elements: [
            { id: '1', label: 'try Block', sublabel: 'Execute risky operations', value: 'Attempt', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Error Thrown?', sublabel: 'Branch on exception', value: 'Decision', status: 'active', arrowTo: '3' },
            { id: '3', label: 'catch Block', sublabel: 'Log, recover, or rethrow', value: 'Handled', status: 'warning', arrowTo: '4' },
            { id: '4', label: 'finally Block', sublabel: 'Release connections/locks', value: 'Always Executed', status: 'referenced' }
          ]
        },
        important: 'In a `finally` block, executing a `return` or `throw` statement will override and swallow any previous `return` or exception thrown inside the `try` block!',
        commonMistakes: [
          'Swallowing errors silently with an empty `catch (err) {}` block.',
          'Throwing raw strings (`throw "failed"`) instead of `Error` instances (loses stack trace information).'
        ],
        tip: 'Always attach `error.cause` in modern JavaScript (ES2022) to wrap and chain low-level errors: `new Error("Auth failed", { cause: err })`.',
        interviewNote: 'Question: "Does finally execute if try has a return statement?" Answer: "Yes! If the try block encounters a return, the finally block executes immediately before the function formally returns to the caller."',
        practiceQuestions: [
          {
            id: 'q-js15-1',
            type: 'output',
            question: 'What is returned by this function?',
            codeSnippet: 'function test() {\n  try {\n    return 1;\n  } finally {\n    return 2;\n  }\n}\nconsole.log(test());',
            options: ['1', '2', 'undefined', 'Throws Error'],
            correctIndex: 1,
            explanation: 'The return statement inside the finally block overrides the return statement from the try block, returning 2.'
          },
          {
            id: 'q-js15-2',
            type: 'mcq',
            question: 'Why should you always throw an instance of Error rather than a primitive string?',
            options: ['Strings are not allowed in catch', 'Error objects capture stack traces for debugging', 'Errors run faster', 'V8 rejects string throws'],
            correctIndex: 1,
            explanation: 'Instances of Error automatically capture the call stack trace (err.stack), showing the exact file and line number where the issue occurred.'
          }
        ],
        relatedTopics: ['Async / Await', 'DOM Events', 'Node.js Foundations']
      }
    ]
  },

  // CHAPTER 16 — MODULES (ESM VS COMMONJS)
  {
    id: 'js-ch16',
    number: 16,
    title: 'Modules: ES Modules vs CommonJS',
    description: 'export/import, named vs default, static analysis, tree-shaking, and CommonJS require()',
    topics: [
      {
        id: 'js-modules',
        subjectId: 'js',
        chapterId: 'js-ch16',
        chapterNumber: 16,
        pageNumber: 16,
        title: 'ES Modules (ESM) vs CommonJS (CJS) & Dynamic Imports',
        difficulty: 'intermediate',
        definition: 'Modules partition code into isolated namespaces. ES Modules (ESM) use static import/export syntax for tree-shaking, while CommonJS (CJS) uses dynamic synchronous require().',
        whyItMatters: 'ES Modules are the official ECMAScript standard supported natively in modern browsers and Node.js (via "type": "module" in package.json).',
        syntax: '// ESM\nexport const add = (a, b) => a + b;\nimport { add } from "./math.js";\n// CJS\nmodule.exports = { add };\nconst { add } = require("./math");',
        explanation: [
          'Static Structure: ESM `import` statements are evaluated at parse time before code executes, enabling dead-code elimination (tree-shaking) by bundlers (Vite, Rollup, Webpack).',
          'Named Exports vs Default Export: Named exports encourage clear naming and precise auto-imports; default exports allow consumers to name the import arbitrarily.',
          'Dynamic `import("./module.js")`: Returns a Promise resolving to the module, enabling route-based code-splitting and lazy-loading.',
          'CommonJS (CJS): Historical Node.js standard. Loads modules synchronously at runtime using `require()` and `module.exports`.'
        ],
        example: {
          language: 'javascript',
          code: `// mathUtils.js (ESM Module)
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator {
  multiply(a, b) { return a * b; }
}

// app.js (Consumer)
// import Calculator, { PI, add } from "./mathUtils.js";

// Dynamic lazy import on demand
async function loadAnalytics() {
  const { trackEvent } = await import("./analytics.js");
  trackEvent("user_login");
}
console.log("ESM Module Architecture Configured");`,
          output: 'ESM Module Architecture Configured',
          annotations: [
            { line: 2, label: 'Named export for constants and pure functions', type: 'blue' },
            { line: 4, label: 'Default export for primary module class', type: 'yellow' },
            { line: 12, label: 'Dynamic import for lazy code splitting', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'ESM vs CommonJS Execution Strategy',
          subtitle: 'Static Parse-Time Resolution vs Dynamic Runtime Execution',
          elements: [
            { id: '1', label: 'ES Modules (import)', sublabel: 'Static Analysis', value: 'Tree-Shakable (Vite/Rollup)', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Bundler / Engine', sublabel: 'Eliminate Unused Exports', value: 'Optimized Bundle', status: 'referenced' },
            { id: '3', label: 'CommonJS (require)', sublabel: 'Dynamic Runtime Evaluation', value: 'Cannot Tree-Shake', status: 'warning' }
          ]
        },
        important: 'ES Modules are strictly evaluated in `"use strict"` mode by default! In browser scripts, you must include `type="module"` on the script tag: `<script type="module" src="app.js"></script>`.',
        commonMistakes: [
          'Trying to use `require()` in an ES Module without `createRequire()`.',
          'Omitting file extensions like `.js` when using native ESM in Node.js.'
        ],
        tip: 'Prefer named exports over default exports. Named exports make refactoring trivial and prevent inconsistent naming across team codebases.',
        interviewNote: 'Question: "What is tree-shaking?" Answer: "Tree-shaking is dead code elimination enabled by the static structure of ES Module imports and exports. The bundler analyzes the dependency graph at build time and excludes unused exports from the final bundle."',
        practiceQuestions: [
          {
            id: 'q-js16-1',
            type: 'mcq',
            question: 'Why can ES Modules be tree-shaken by bundlers while CommonJS modules cannot?',
            options: ['ESM is newer', 'ESM imports are statically analyzable at compile/parse time', 'CommonJS uses TypeScript', 'ESM only works with React'],
            correctIndex: 1,
            explanation: 'Because ESM imports and exports cannot be placed inside if-blocks or dynamic expressions, bundlers can statically trace the exact dependency graph.'
          },
          {
            id: 'q-js16-2',
            type: 'output',
            question: 'What type of value does the dynamic import() syntax return?',
            options: ['The module object directly', 'A Promise that resolves to the module namespace', 'A callback function', 'undefined'],
            correctIndex: 1,
            explanation: 'Dynamic import() is asynchronous and returns a Promise that fulfills with the module namespace object containing all its exports.'
          }
        ],
        relatedTopics: ['JavaScript Development Tools', 'Node.js Foundations', 'DOM Fundamentals']
      }
    ]
  },

  // CHAPTER 17 — DOM FUNDAMENTALS
  {
    id: 'js-ch17',
    number: 17,
    title: 'DOM Fundamentals & Document Tree',
    description: 'Document Object Model, querySelector, textContent vs innerHTML, classList, createElement, and fragments',
    topics: [
      {
        id: 'js-dom-fundamentals',
        subjectId: 'js',
        chapterId: 'js-ch17',
        chapterNumber: 17,
        pageNumber: 17,
        title: 'DOM Tree Architecture, Querying & Safe Node Manipulation',
        difficulty: 'intermediate',
        definition: 'The Document Object Model (DOM) is a tree-like object representation of the HTML document created by the browser engine, exposing APIs for JavaScript manipulation.',
        whyItMatters: 'DOM manipulations directly govern user interfaces. Avoiding unsafe innerHTML prevents XSS, and utilizing DocumentFragments optimizes layout reflow performance.',
        syntax: 'const btn = document.querySelector("#submit-btn");\nelem.classList.add("active");\nelem.textContent = "Safe Text Content";',
        explanation: [
          'DOM Querying: `document.getElementById()`, `document.querySelector()` (returns first match), `document.querySelectorAll()` (returns static NodeList).',
          'Safe Text vs HTML: `elem.textContent` escapes raw text and avoids XSS. `elem.innerHTML` parses HTML markup and is vulnerable to script injection if inputs are unescaped.',
          'Element Creation & Insertion: `document.createElement("div")`, `.append()`, `.prepend()`, `.remove()`, `.replaceWith()`.',
          'DocumentFragment: An in-memory virtual container for batching DOM nodes before appending to the real DOM, minimizing costly layout reflows and repaints.'
        ],
        example: {
          language: 'javascript',
          code: `// Efficient & Safe DOM node generation
function renderUserCard(user) {
  const card = document.createElement("article");
  card.className = "p-4 border rounded-lg bg-white shadow";

  const title = document.createElement("h3");
  title.className = "text-lg font-bold text-stone-900";
  title.textContent = user.name; // Safe against XSS!

  const badge = document.createElement("span");
  badge.className = "px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded";
  badge.textContent = user.role;

  card.append(title, badge);
  return card;
}

const mockUser = { name: "Sarah Connor", role: "Security Engineer" };
const node = renderUserCard(mockUser);
console.log("Generated tag: " + node.tagName + " | Title: " + node.firstChild.textContent);`,
          output: 'Generated tag: ARTICLE | Title: Sarah Connor',
          annotations: [
            { line: 7, label: 'textContent securely inserts text without HTML parsing', type: 'green' },
            { line: 13, label: 'Modern .append() accepts multiple nodes and strings', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'HTML to DOM Tree Parser Pipeline',
          subtitle: 'From Raw HTML Tokens to Live Memory Tree Nodes',
          elements: [
            { id: '1', label: 'HTML Markup', value: '<html>...</html>', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'document (Root)', value: 'Document Node', status: 'active', arrowTo: '3' },
            { id: '3', label: '<head> & <body>', sublabel: 'Element Nodes', value: 'Branches', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Nodes & TextContent', sublabel: '<article>, <h3>, text', value: 'Leaf Nodes', status: 'referenced' }
          ]
        },
        important: 'Never assign untrusted user input directly to `element.innerHTML`! An attacker can inject malicious `<img src=x onerror="stealCookies()">` scripts leading to full session hijacking.',
        commonMistakes: [
          'Using `innerHTML += "<div>...</div>"` in a loop (forces the browser to destroy, re-parse, and re-render the entire parent container on every iteration).',
          'Confusing a static `NodeList` (from `querySelectorAll`) with a live `HTMLCollection` (from `getElementsByTagName`).'
        ],
        tip: 'Use `document.createDocumentFragment()` when inserting hundreds of list items to trigger only a single browser reflow.',
        interviewNote: 'Question: "What is the difference between textContent, innerText, and innerHTML?" Answer: "textContent retrieves or sets raw text without parsing HTML and ignores styles. innerText is aware of CSS styling (does not return hidden text) and triggers layout reflow. innerHTML parses and serializes HTML elements and is vulnerable to XSS."',
        practiceQuestions: [
          {
            id: 'q-js17-1',
            type: 'mcq',
            question: 'Which method safely sets text inside an HTML element without creating Cross-Site Scripting (XSS) risks?',
            options: ['elem.innerHTML', 'elem.textContent', 'elem.outerHTML', 'elem.insertAdjacentHTML'],
            correctIndex: 1,
            explanation: 'textContent treats all assigned data strictly as raw characters and automatically escapes HTML entities, neutralizing XSS injection.'
          },
          {
            id: 'q-js17-2',
            type: 'output',
            question: 'What does document.querySelectorAll("div") return?',
            options: ['Array of divs', 'Static NodeList of divs', 'Live HTMLCollection', 'First matching div'],
            correctIndex: 1,
            explanation: 'querySelectorAll returns a static NodeList representing a snapshot of elements matching the CSS selector at query time.'
          }
        ],
        relatedTopics: ['DOM Events', 'HTML/CSS Integration', 'Security & Best Practices']
      }
    ]
  },

  // CHAPTER 18 — DOM EVENTS
  {
    id: 'js-ch18',
    number: 18,
    title: 'DOM Events & Event Delegation',
    description: 'Event listeners, event object, preventDefault, bubbling, capturing, and high-performance event delegation',
    topics: [
      {
        id: 'js-events-delegation',
        subjectId: 'js',
        chapterId: 'js-ch18',
        chapterNumber: 18,
        pageNumber: 18,
        title: 'Event Propagation Phases (Bubbling/Capturing) & Event Delegation',
        difficulty: 'intermediate',
        definition: 'DOM events propagate through three phases: Capturing (down from window to target), Target, and Bubbling (up from target to window). Event delegation leverages bubbling to manage events on a single parent.',
        whyItMatters: 'Event delegation eliminates the need to attach hundreds of event listeners to individual list items or buttons, dramatically slashing memory usage and dynamically handling newly added elements.',
        syntax: 'parent.addEventListener("click", (e) => {\n  const item = e.target.closest(".item-btn");\n  if (item) handleItemClick(item.dataset.id);\n});',
        explanation: [
          'Propagation Phases: 1. Capture Phase (Event descends from Window to Target), 2. Target Phase (Fires on target), 3. Bubbling Phase (Event bubbles back up through ancestors).',
          'Control Methods: `e.stopPropagation()` halts propagation up/down the tree; `e.preventDefault()` suppresses default browser behaviors (form submits, link navigation).',
          'Event Delegation: Attach a single listener to a stable parent element, and use `e.target` and `e.target.closest(selector)` to identify which child originated the action.',
          '`target` vs `currentTarget`: `e.target` is the actual innermost element clicked; `e.currentTarget` is the element to which the event listener is attached.'
        ],
        example: {
          language: 'javascript',
          code: `// High-Performance Event Delegation pattern
function setupTodoList(container) {
  container.addEventListener("click", (event) => {
    // Traverse upward to match actionable button
    const deleteBtn = event.target.closest("[data-action='delete']");
    if (!deleteBtn) return;

    const todoItem = deleteBtn.closest(".todo-item");
    const todoId = todoItem.dataset.id;
    console.log("Deleting Todo ID: " + todoId);
    todoItem.remove();
  });
}

// Simulating the delegation dispatch
console.log("Delegation listener installed on parent container.");`,
          output: 'Delegation listener installed on parent container.',
          annotations: [
            { line: 3, label: 'Single listener on parent container handles all current and future items', type: 'blue' },
            { line: 5, label: 'closest() matches the targeted action button', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: '3-Phase DOM Event Propagation Architecture',
          subtitle: 'Capturing Phase (Down) → Target Phase → Bubbling Phase (Up)',
          elements: [
            { id: '1', label: 'Window / Document', sublabel: 'Capture Phase', value: 'Descends Tree', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Target Element', sublabel: 'Target Phase', value: 'Event Origin', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Parent Bubbling', sublabel: 'Bubbling Phase', value: 'Bubbles Up', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Delegation Listener', sublabel: 'Intercepts via e.target.closest()', value: 'Handled Efficiently', status: 'active' }
          ]
        },
        important: 'Not all events bubble! For example, `focus` and `blur` do not bubble. Use their bubbling equivalents `focusin` and `focusout` when implementing event delegation for form fields.',
        commonMistakes: [
          'Attaching individual `addEventListener` calls inside a loop rendering 1,000 items (leads to significant memory leaks).',
          'Confusing `e.target` (element that was clicked) with `e.currentTarget` (element running the listener).'
        ],
        tip: 'Pass `{ once: true }` to `addEventListener` for self-cleaning single-use event listeners: `btn.addEventListener("click", init, { once: true });`.',
        interviewNote: 'Question: "What is event delegation and what are its advantages?" Answer: "Event delegation is attaching a single event listener to a parent element to handle events for all existing and future children by leveraging event bubbling. Advantages: lower memory footprint, fewer listeners, and zero setup required when adding new dynamic items."',
        practiceQuestions: [
          {
            id: 'q-js18-1',
            type: 'mcq',
            question: 'In event delegation, which property represents the actual element the user clicked on?',
            options: ['event.currentTarget', 'event.target', 'event.origin', 'event.sender'],
            correctIndex: 1,
            explanation: 'event.target points directly to the innermost DOM element that triggered the event, whereas event.currentTarget is the element hosting the listener.'
          },
          {
            id: 'q-js18-2',
            type: 'mcq',
            question: 'What does event.preventDefault() do?',
            options: ['Stops event bubbling up the DOM', 'Prevents the default browser action from occurring', 'Removes the event listener', 'Throws an exception'],
            correctIndex: 1,
            explanation: 'preventDefault() cancels the default action that belongs to the event (such as following a link or submitting a form).'
          }
        ],
        relatedTopics: ['DOM Fundamentals', 'Browser APIs', 'HTML/CSS Integration']
      }
    ]
  },

  // CHAPTER 19 — BROWSER APIS
  {
    id: 'js-ch19',
    number: 19,
    title: 'Browser APIs & Web Platform',
    description: 'window, navigator, location, history, localStorage, sessionStorage, setTimeout, and setInterval',
    topics: [
      {
        id: 'js-browser-apis',
        subjectId: 'js',
        chapterId: 'js-ch19',
        chapterNumber: 19,
        pageNumber: 19,
        title: 'Browser APIs: Web Storage, Timers & Location/History',
        difficulty: 'intermediate',
        definition: 'Browser APIs are host environment interfaces exposed through the global `window` object, granting JavaScript capabilities like client storage, URL manipulation, timers, and clipboard access.',
        whyItMatters: 'Web applications use localStorage for offline persistence, history for client-side routing, and timers for animation, debouncing, and polling.',
        syntax: 'localStorage.setItem("key", JSON.stringify(data));\nconst data = JSON.parse(localStorage.getItem("key") ?? "null");\nconst timerId = setTimeout(callback, 1000);',
        explanation: [
          'localStorage vs sessionStorage: `localStorage` persists across browser sessions indefinitely until cleared (~5MB quota). `sessionStorage` survives page reloads but is destroyed when the browser tab closes.',
          'Timers: `setTimeout(fn, ms)` schedules a macrotask after a delay. `setInterval(fn, ms)` repeats periodically. Always cancel with `clearTimeout(id)` / `clearInterval(id)` to prevent memory leaks.',
          'Location & History: `location.href`, `location.search` (query parameters), `history.pushState(state, title, url)` (enables Single Page Application client-side navigation without full page reload).'
        ],
        example: {
          language: 'javascript',
          code: `// Safe Web Storage wrapper with fallback
class SafeStorage {
  static get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Storage quota exceeded", e);
      return false;
    }
  }
}

// Storing and retrieving user preferences
SafeStorage.set("codeink_theme", { mode: "dark", fontSize: 14 });
const pref = SafeStorage.get("codeink_theme");
console.log("Loaded Theme:", pref.mode);`,
          output: 'Loaded Theme: dark',
          annotations: [
            { line: 5, label: 'JSON.parse handles deserialization with try-catch safety', type: 'blue' },
            { line: 15, label: 'Catches DOMException: QuotaExceededError in private browsing', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Browser Client Storage Comparison',
          subtitle: 'Capacity, Lifetime & Scope of Client Persistence',
          elements: [
            { id: '1', label: 'Client Storage', value: 'Web Platform Options', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'localStorage (~5MB)', sublabel: 'Origin-Scoped', value: 'Permanent Lifetime', status: 'active', arrowTo: '3' },
            { id: '3', label: 'sessionStorage (~5MB)', sublabel: 'Tab-Scoped', value: 'Lifetime: Tab Session', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Cookies (~4KB)', sublabel: 'Sent to Server via HTTP', value: 'Configured Expiry Date', status: 'normal' }
          ]
        },
        important: 'Never store sensitive secrets, JWTs, or passwords in `localStorage`! Any third-party script injected via XSS can immediately execute `localStorage.getItem()` and exfiltrate user tokens.',
        commonMistakes: [
          'Storing raw objects directly in localStorage (`localStorage.setItem("user", user)`) which stores the useless string `"[object Object]"` instead of JSON string.',
          'Leaving active intervals running in components after unmounting, causing memory leaks.'
        ],
        tip: 'Use `new URLSearchParams(window.location.search)` for effortless parsing and manipulation of URL query strings.',
        interviewNote: 'Question: "What is the difference between localStorage, sessionStorage, and cookies?" Answer: "localStorage persists indefinitely per origin (~5MB). sessionStorage persists only for the lifetime of that specific browser tab (~5MB). Cookies are smaller (~4KB), have explicit expiration dates, and are automatically transmitted to the server with every HTTP request."',
        practiceQuestions: [
          {
            id: 'q-js19-1',
            type: 'mcq',
            question: 'What happens to data stored in sessionStorage when the user closes that browser tab?',
            options: ['It persists until computer reboot', 'It is cleared and lost permanently', 'It moves into localStorage', 'It sends a backup to the server'],
            correctIndex: 1,
            explanation: 'sessionStorage is strictly scoped to the page session and is permanently deleted as soon as the associated browser tab or window closes.'
          },
          {
            id: 'q-js19-2',
            type: 'debugging',
            question: 'What happens when calling localStorage.setItem("data", { id: 1 }) without stringification?',
            codeSnippet: 'localStorage.setItem("data", { id: 1 });\nconsole.log(localStorage.getItem("data"));',
            options: ['"{ id: 1 }"', '"[object Object]"', 'Throws TypeError', 'null'],
            correctIndex: 1,
            explanation: 'localStorage only stores strings. Non-string inputs are implicitly coerced via toString(), turning objects into "[object Object]".'
          }
        ],
        relatedTopics: ['Security & Best Practices', 'Web Storage & State', 'Asynchronous JavaScript']
      }
    ]
  },

  // CHAPTER 20 — ASYNCHRONOUS JAVASCRIPT & EVENT LOOP
  {
    id: 'js-ch20',
    number: 20,
    title: 'Asynchronous JavaScript & The Event Loop',
    description: 'Call stack, Web APIs, Callback Queue, Microtask Queue, Promise states, and Promise combinators',
    topics: [
      {
        id: 'js-event-loop',
        subjectId: 'js',
        chapterId: 'js-ch20',
        chapterNumber: 20,
        pageNumber: 20,
        title: 'The Event Loop: Microtasks vs Macrotasks & Promise Combinators',
        difficulty: 'advanced',
        definition: 'The Event Loop is the concurrency coordination mechanism that constantly checks if the Call Stack is empty, flushing the Microtask Queue completely before processing the next Macrotask.',
        whyItMatters: 'Predicting execution order between Promises, setTimeout, and I/O callbacks is essential for mastering asynchronous state, UI responsiveness, and technical interviews.',
        syntax: 'Promise.all([p1, p2]);        // Fails fast if any promise rejects\nPromise.allSettled([p1, p2]); // Waits for all, returns status objects\nPromise.race([p1, p2]);       // Resolves/rejects with fastest',
        explanation: [
          'Call Stack: Synchronous execution frame stack. One task at a time (single-threaded).',
          'Web APIs: Offloads long-running operations (timers, fetch, DOM events) to browser background threads.',
          'Microtask Queue (HIGH PRIORITY): Promise callbacks (`.then()`, `.catch()`, `.finally()`), `queueMicrotask()`, and `MutationObserver`. Emptied COMPLETELY after every stack frame.',
          'Macrotask (Task) Queue (LOWER PRIORITY): `setTimeout()`, `setInterval()`, `setImmediate()` (Node), and I/O events. Only ONE macrotask is processed per loop tick.'
        ],
        example: {
          language: 'javascript',
          code: `console.log("1: Synchronous Script Start");

setTimeout(() => {
  console.log("4: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("2: Microtask 1 (Promise)");
}).then(() => {
  console.log("3: Microtask 2 (Chained Promise)");
});

console.log("1b: Synchronous Script End");`,
          output: '1: Synchronous Script Start\n1b: Synchronous Script End\n2: Microtask 1 (Promise)\n3: Microtask 2 (Chained Promise)\n4: Macrotask (setTimeout)',
          annotations: [
            { line: 1, label: 'Synchronous statements run immediately on the Call Stack', type: 'blue' },
            { line: 7, label: 'Microtasks preempt macrotasks and drain before setTimeout', type: 'yellow' },
            { line: 3, label: 'setTimeout queued in macrotask queue runs last', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'JavaScript Event Loop Architecture',
          subtitle: 'Execution Priority Order: Call Stack → Microtasks → Macrotasks',
          elements: [
            { id: '1', label: 'Call Stack', sublabel: 'Single-Threaded Execution', value: 'Sync Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Microtask Queue', sublabel: 'Promises, queueMicrotask()', value: 'HIGHEST Priority: Drain to Empty', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Render / Repaint', sublabel: 'Browser UI Refresh', value: '60fps / 120fps', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Macrotask Queue', sublabel: 'setTimeout, setInterval, I/O', value: 'Pick Exactly ONE Task', status: 'warning' }
          ]
        },
        important: 'Microtasks ALWAYS run before macrotasks! Even if a `setTimeout` has a delay of 0ms, any pending resolved Promises will execute before the timer callback.',
        commonMistakes: [
          'Using `Promise.all()` when some tasks are allowed to fail (one rejection cancels the whole batch; use `Promise.allSettled()` instead).',
          'Creating infinite microtask loops (e.g. recursively scheduling `queueMicrotask`), which starves macrotasks and freezes the browser tab entirely.'
        ],
        tip: 'Use `Promise.allSettled()` when firing independent parallel requests where partial successes should still be rendered.',
        interviewNote: 'Question: "Explain the order of execution between setTimeout(0) and Promise.resolve().then()?" Answer: "Promise callbacks are placed in the Microtask Queue, while setTimeout callbacks are placed in the Macrotask Queue. After the current synchronous call stack empties, the event loop drains the entire Microtask queue before picking the next task from the Macrotask queue."',
        practiceQuestions: [
          {
            id: 'q-js20-1',
            type: 'output',
            question: 'What is printed to the console?',
            codeSnippet: 'setTimeout(() => console.log("A"), 0);\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");',
            options: ['A, B, C', 'C, A, B', 'C, B, A', 'B, C, A'],
            correctIndex: 2,
            explanation: 'Synchronous "C" runs first. Then the microtask "B" is drained. Finally the macrotask "A" is executed.'
          },
          {
            id: 'q-js20-2',
            type: 'mcq',
            question: 'Which Promise combinator waits for all promises to settle (whether resolved or rejected) without failing fast?',
            options: ['Promise.all()', 'Promise.race()', 'Promise.allSettled()', 'Promise.any()'],
            correctIndex: 2,
            explanation: 'Promise.allSettled() returns an array of outcome objects describing whether each promise was fulfilled or rejected, never short-circuiting on failure.'
          }
        ],
        relatedTopics: ['Async / Await', 'Fetch & HTTP', 'V8 Runtime & Engine']
      }
    ]
  },

  // CHAPTER 21 — ASYNC / AWAIT
  {
    id: 'js-ch21',
    number: 21,
    title: 'Async / Await & Sequential vs Parallel Flows',
    description: 'Syntactic sugar over promises, error handling with try/catch, parallel orchestration, and return values',
    topics: [
      {
        id: 'js-async-await',
        subjectId: 'js',
        chapterId: 'js-ch21',
        chapterNumber: 21,
        pageNumber: 21,
        title: 'async/await: Sequential vs Parallel Execution & Error Propagation',
        difficulty: 'advanced',
        definition: '`async` and `await` are language keywords providing synchronous-looking syntax for writing asynchronous code, built directly on top of native Promises and generators.',
        whyItMatters: 'Writing clean asynchronous code without nested callback hell or complex .then() chains makes control flow intuitive, readable, and easily testable.',
        syntax: 'async function fetchData() {\n  try {\n    const res = await fetch(url);\n    return await res.json();\n  } catch (err) {\n    handleError(err);\n  }\n}',
        explanation: [
          'An `async` function always returns a Promise! Returning a non-promise value `return 42` wraps it in `Promise.resolve(42)`.',
          'The `await` keyword pauses execution of the enclosing async function until the awaited Promise settles, then unrolls the fulfilled value or throws the rejected error.',
          'Parallel vs Sequential Trap: Awaiting independent requests one after another creates an accidental sequential bottleneck (`await getA(); await getB();`). Fire them in parallel with `Promise.all([getA(), getB()])`!',
          'Top-Level await: Allowed in ES Modules without wrapping in an async IIFE.'
        ],
        example: {
          language: 'javascript',
          code: `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Parallel execution with Promise.all
async function loadDashboardData() {
  console.log("Initiating parallel data fetch...");
  const startTime = Date.now();

  // Initiate both promises concurrently
  const [users, metrics] = await Promise.all([
    sleep(50).then(() => ["Alice", "Bob"]),
    sleep(50).then(() => ({ requests: 1200, latency: "14ms" }))
  ]);

  console.log("Users loaded:", users.length);
  console.log("Metrics loaded:", metrics.requests);
  return { users, metrics };
}

loadDashboardData();`,
          output: 'Initiating parallel data fetch...\nUsers loaded: 2\nMetrics loaded: 1200',
          annotations: [
            { line: 8, label: 'Promise.all launches requests concurrently instead of waterfalling', type: 'green' },
            { line: 16, label: 'Returned data resolves outer Promise with payload', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Sequential Waterfall vs Concurrent Parallel Execution',
          subtitle: 'Slashing Total Latency from (T1 + T2) to Max(T1, T2)',
          elements: [
            { id: '1', label: 'Sequential (Waterfall)', sublabel: 'await A (100ms) then await B (100ms)', value: 'Total: 200ms', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Parallel (Promise.all)', sublabel: 'await Promise.all([A, B])', value: 'Total: 100ms', status: 'active' }
          ]
        },
        important: 'Never use `await` inside a standard `Array.prototype.forEach` loop! `forEach` is not promise-aware and will trigger all iterations without awaiting completion. Use `for...of` for sequential awaits or `Promise.all(arr.map(...))` for parallel awaits.',
        commonMistakes: [
          'Forgetting that `async` functions ALWAYS return a Promise; calling `const data = getData()` without `await` stores a pending Promise, not the resolved data.',
          'Awaiting two completely independent requests in sequence, doubling network latency.'
        ],
        tip: 'Top-Level Await is supported in all modern browsers and Node.js with ES Modules (`type: "module"`).',
        interviewNote: 'Question: "What happens if you throw an error inside an async function?" Answer: "The returned Promise is immediately rejected with the thrown error, which can be captured via a surrounding try/catch block or a .catch() method attached to the caller."',
        practiceQuestions: [
          {
            id: 'q-js21-1',
            type: 'mcq',
            question: 'What is the return value of an async function that contains: return 100;?',
            options: ['Number 100', 'Promise resolving to 100', 'undefined', 'Observable of 100'],
            correctIndex: 1,
            explanation: 'Every async function wraps its return value in a resolved Promise, returning Promise.resolve(100).'
          },
          {
            id: 'q-js21-2',
            type: 'debugging',
            question: 'What is wrong with using await inside array.forEach()?',
            codeSnippet: 'arr.forEach(async (id) => {\n  await deleteRecord(id);\n});\nconsole.log("All deleted!");',
            options: ['Throws SyntaxError', 'forEach does not await promises, so "All deleted" logs immediately before deletions complete', 'forEach crashes the thread', 'Memory leak'],
            correctIndex: 1,
            explanation: 'Array.prototype.forEach executes callbacks synchronously and ignores promises returned by async callbacks. Use for...of or Promise.all(arr.map(...)).'
          }
        ],
        relatedTopics: ['Asynchronous JavaScript', 'Fetch & HTTP', 'Error Handling']
      }
    ]
  },

  // CHAPTER 22 — FETCH & HTTP
  {
    id: 'js-ch22',
    number: 22,
    title: 'Fetch API & HTTP Communication',
    description: 'HTTP methods (GET/POST/PUT/DELETE), headers, request bodies, status codes, and REST integration',
    topics: [
      {
        id: 'js-fetch-http',
        subjectId: 'js',
        chapterId: 'js-ch22',
        chapterNumber: 22,
        pageNumber: 22,
        title: 'Fetch API: HTTP Verbs, response.ok & AbortController',
        difficulty: 'intermediate',
        definition: 'The Fetch API provides a modern Promise-based interface for fetching resources across the network, replacing the legacy XMLHttpRequest.',
        whyItMatters: 'Unlike older AJAX libraries, `fetch()` only rejects on network failure, NOT on HTTP 404 or 500 error status codes. Proper `response.ok` checks are essential.',
        syntax: 'const res = await fetch("/api/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Alex" })\n});\nif (!res.ok) throw new Error(`HTTP Error: ${res.status}`);',
        explanation: [
          'fetch() Lifecycle: 1. Network Request dispatched, 2. Returns Response headers (`res.status`, `res.ok`), 3. Stream body parsed via `.json()`, `.text()`, or `.blob()`.',
          'The `response.ok` Property: Evaluates to `true` if HTTP status is in the 200-299 range. You must manually throw on `!res.ok`.',
          'AbortController: Standard mechanism to cancel in-flight HTTP requests or set request timeouts: `fetch(url, { signal: controller.signal })`.',
          'REST Semantics: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).'
        ],
        example: {
          language: 'javascript',
          code: `// Resilient API Client function with AbortController timeout
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error("HTTP Status Error: " + response.status);
    }
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Network request timed out");
    }
    throw err;
  }
}

console.log("Resilient fetch client ready.");`,
          output: 'Resilient fetch client ready.',
          annotations: [
            { line: 4, label: 'AbortController cleanly cancels hung connections', type: 'yellow' },
            { line: 14, label: 'response.ok verification catches 404 and 500 responses', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Full Fetch Request-Response Lifecycle',
          subtitle: 'Dispatch → Header Response → Body Stream Deserialization',
          elements: [
            { id: '1', label: 'fetch(url, opts)', sublabel: 'HTTP Request Sent', value: 'Headers + Body', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'HTTP Server Response', sublabel: 'Status Code (200, 404, 500)', value: 'Response Object', status: 'active', arrowTo: '3' },
            { id: '3', label: 'res.ok Verification', sublabel: 'Is status in 200-299?', value: 'Guard Check', status: 'active', arrowTo: '4' },
            { id: '4', label: 'res.json() Deserialization', sublabel: 'Stream body parsing', value: 'Parsed JavaScript Data', status: 'referenced' }
          ]
        },
        important: '`fetch()` does NOT reject on HTTP 404 (Not Found) or 500 (Internal Server Error)! The Promise fulfills normally. You must explicitly inspect `if (!response.ok)` to handle HTTP errors.',
        commonMistakes: [
          'Assuming `catch (err)` will trigger when an API returns 404 or 401.',
          'Attempting to read `response.json()` multiple times (the response body is a readable stream that can only be read once).'
        ],
        tip: 'Use `AbortController` in UI search auto-complete inputs to cancel preceding in-flight requests when a user types a new keystroke.',
        interviewNote: 'Question: "When does window.fetch reject its promise?" Answer: "A fetch() Promise only rejects on complete network failure, DNS lookup failure, or if request execution was explicitly aborted via AbortController. It does NOT reject on HTTP error statuses (like 404 or 500)."',
        practiceQuestions: [
          {
            id: 'q-js22-1',
            type: 'mcq',
            question: 'When an endpoint returns HTTP Status 404 Not Found, what does window.fetch() do?',
            options: ['Rejects the Promise with a 404 error', 'Resolves the Promise with response.ok set to false', 'Retries the request automatically', 'Crashes the thread'],
            correctIndex: 1,
            explanation: 'fetch resolves successfully even on 4xx and 5xx statuses; the response.ok property is set to false and response.status holds 404.'
          },
          {
            id: 'q-js22-2',
            type: 'mcq',
            question: 'Which browser utility is used to abort or cancel a running fetch() request?',
            options: ['CancelToken', 'AbortController', 'WorkerThread', 'StopSignal'],
            correctIndex: 1,
            explanation: 'The standard AbortController API creates an AbortSignal passed to fetch({ signal }) to cancel requests.'
          }
        ],
        relatedTopics: ['JSON & Data Handling', 'Async / Await', 'Security & Best Practices']
      }
    ]
  },

  // CHAPTER 23 — JSON & DATA HANDLING
  {
    id: 'js-ch23',
    number: 23,
    title: 'JSON & Data Transformation',
    description: 'JSON.stringify, JSON.parse, reviver and replacer functions, formatting, and API payloads',
    topics: [
      {
        id: 'js-json-data',
        subjectId: 'js',
        chapterId: 'js-ch23',
        chapterNumber: 23,
        pageNumber: 23,
        title: 'JSON Serialization, Replacer/Reviver Functions & Validation',
        difficulty: 'intermediate',
        definition: 'JavaScript Object Notation (JSON) is a lightweight, text-based data interchange format based on a subset of JavaScript object literal syntax.',
        whyItMatters: 'JSON is the lingua franca of web APIs. Using replacer and reviver parameters allows seamless serialization of complex objects, dates, and sensitive field masking.',
        syntax: 'JSON.stringify(data, replacer, 2); // 3rd arg adds indent spacing\nJSON.parse(jsonString, reviver);',
        explanation: [
          'JSON Types Allowed: string, number, boolean, null, object, array. Prohibited: functions, symbols, undefined, circular references.',
          'Replacer Function / Array: Filters or transforms keys during `JSON.stringify()`. Ideal for masking sensitive fields (e.g. passwords, API tokens).',
          'Reviver Function: Intercepts deserialized keys during `JSON.parse()`. Ideal for reconstructing native `Date` objects from ISO date strings.',
          '`toJSON()` Method: Any object implementing a `.toJSON()` method will have its output used automatically during serialization.'
        ],
        example: {
          language: 'javascript',
          code: `const userAccount = {
  id: 101,
  name: "Alex",
  passwordHash: "secret_hash_value",
  createdAt: new Date("2024-01-15T00:00:00Z")
};

// Replacer masks sensitive password
const jsonString = JSON.stringify(userAccount, (key, value) => {
  if (key === "passwordHash") return undefined; // Strips field!
  return value;
}, 2);
console.log(jsonString);

// Reviver reconstructs Date objects
const parsed = JSON.parse(jsonString, (key, value) => {
  if (key === "createdAt") return new Date(value);
  return value;
});
console.log("Is Date instance:", parsed.createdAt instanceof Date);`,
          output: '{\n  "id": 101,\n  "name": "Alex",\n  "createdAt": "2024-01-15T00:00:00.000Z"\n}\nIs Date instance: true',
          annotations: [
            { line: 10, label: 'Returning undefined in replacer excludes property from JSON', type: 'yellow' },
            { line: 17, label: 'Reviver transforms ISO date strings back into native Date instances', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'JSON Bidirectional Data Pipeline',
          subtitle: 'Object Serialization (Replacer) ↔ String Deserialization (Reviver)',
          elements: [
            { id: '1', label: 'Memory Object', value: 'Live JavaScript Heap', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'JSON.stringify()', sublabel: 'Replacer Filter', value: 'Serializes to Text', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Wire / HTTP String', sublabel: 'Payload Transport', value: 'UTF-8 String', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'JSON.parse()', sublabel: 'Reviver Transformation', value: 'Hydrated JS Object', status: 'active' }
          ]
        },
        important: 'Circular references (`const a = {}; a.self = a;`) will cause `JSON.stringify(a)` to throw `TypeError: Converting circular structure to JSON`.',
        commonMistakes: [
          'Assuming `JSON.parse()` will automatically recreate `Date` instances (it parses them as plain strings).',
          'Attempting to serialize `undefined` or `Function` values (they are silently omitted from objects, or converted to `null` in arrays).'
        ],
        tip: 'Pretty-print JSON for terminal logs or debugging by supplying 2 as the third argument: `JSON.stringify(data, null, 2)`.',
        interviewNote: 'Question: "What happens to undefined, functions, and symbols when passed to JSON.stringify?" Answer: "Inside object properties, they are silently omitted. Inside array elements, they are converted to null. If passed directly as a standalone primitive, it returns undefined."',
        practiceQuestions: [
          {
            id: 'q-js23-1',
            type: 'output',
            question: 'What is the output of serializing this array with undefined?',
            codeSnippet: 'console.log(JSON.stringify([1, undefined, function() {}, 4]));',
            options: ['"[1,undefined,null,4]"', '"[1,null,null,4]"', '"[1,4]"', 'Throws TypeError'],
            correctIndex: 1,
            explanation: 'When undefined or functions are array elements, JSON.stringify converts them to null to maintain fixed array index positions.'
          },
          {
            id: 'q-js23-2',
            type: 'mcq',
            question: 'How do you pretty-print a JSON string with 2-space indentation?',
            options: ['JSON.stringify(obj, 2)', 'JSON.stringify(obj, null, 2)', 'JSON.format(obj, 2)', 'JSON.print(obj)'],
            correctIndex: 1,
            explanation: 'The third parameter of JSON.stringify controls whitespace indentation: JSON.stringify(data, null, 2).'
          }
        ],
        relatedTopics: ['Fetch & HTTP', 'Objects', 'Web Storage & State']
      }
    ]
  },

  // CHAPTER 24 — REGULAR EXPRESSIONS
  {
    id: 'js-ch24',
    number: 24,
    title: 'Regular Expressions & Pattern Matching',
    description: 'RegExp syntax, flags, character classes, quantifiers, groups, test(), exec(), and match()',
    topics: [
      {
        id: 'js-regex',
        subjectId: 'js',
        chapterId: 'js-ch24',
        chapterNumber: 24,
        pageNumber: 24,
        title: 'Regular Expressions: Flags, Capturing Groups & Named Matches',
        difficulty: 'intermediate',
        definition: 'Regular Expressions (RegExp) are patterns used to match character combinations in strings, supporting validation, extraction, and string replacement.',
        whyItMatters: 'Input validation (emails, passwords, phone numbers) and data scraping depend heavily on regular expressions.',
        syntax: 'const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconst isValid = regex.test(email);\nconst match = text.match(/(?<year>\\d{4})-(?<month>\\d{2})/);',
        explanation: [
          'Literal (`/pattern/flags`) vs Constructor (`new RegExp(pattern, flags)`). Constructor allows dynamic runtime string patterns.',
          'Common Flags: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotAll), `u` (unicode), `y` (sticky).',
          'Anchors & Classes: `^` (start), `$` (end), `\\d` (digit), `\\w` (alphanumeric + underscore), `\\s` (whitespace), `.` (any char except newline).',
          'Named Capturing Groups (ES2018): `(?<name>pattern)` allows extracting matched sub-strings by name in `match.groups.name` rather than cryptic array indices.'
        ],
        example: {
          language: 'javascript',
          code: `// Named capturing groups for Date parsing
const datePattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const result = "Release Date: 2024-10-15".match(datePattern);

if (result) {
  const { year, month, day } = result.groups;
  console.log("Year: " + year + " | Month: " + month + " | Day: " + day);
}

// Global case-insensitive replacement
const log = "ERROR: Timeout. error: Retrying. Error: Failed.";
const sanitized = log.replaceAll(/error/gi, "WARN");
console.log(sanitized);`,
          output: 'Year: 2024 | Month: 10 | Day: 15\nWARN: Timeout. WARN: Retrying. WARN: Failed.',
          annotations: [
            { line: 2, label: 'Named capture groups (?<name>...)', type: 'blue' },
            { line: 6, label: 'Direct destructuring of named capture groups object', type: 'green' },
            { line: 11, label: 'Flags g (global) and i (case-insensitive)', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'RegExp Pattern Extraction Pipeline',
          subtitle: 'Scanning Input String → Match Groups Evaluation',
          elements: [
            { id: '1', label: 'Raw String', value: '"Release: 2024-10-15"', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'RegExp Engine', sublabel: '/(?<year>\\d{4})-(?<month>\\d{2})/', value: 'Finite Automaton', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Match Object', sublabel: 'groups: { year: "2024", month: "10" }', value: 'Extracted Fields', status: 'referenced' }
          ]
        },
        important: 'Beware of catastrophic backtracking (ReDoS: Regular Expression Denial of Service) with nested quantifiers like `(a+)+$`. Malicious input can freeze the JavaScript main thread indefinitely.',
        commonMistakes: [
          'Using the global flag `g` with `.test()` in loops without resetting `regex.lastIndex = 0` (causes alternating true/false results).',
          'Forgetting to double-escape backslashes when using `new RegExp("\\\\d+")` constructor.'
        ],
        tip: 'Use `regex.test(str)` when you only need a boolean check; it is significantly faster than `str.match(regex)` as it avoids allocating match arrays.',
        interviewNote: 'Question: "What bug happens when calling regex.test() multiple times with the /g flag?" Answer: "When a RegExp has the /g global flag, it maintains an internal stateful lastIndex property. Each call advances lastIndex, causing subsequent tests on the same string to alternate between true and false."',
        practiceQuestions: [
          {
            id: 'q-js24-1',
            type: 'mcq',
            question: 'Which method returns a simple boolean indicating whether a pattern exists in a string?',
            options: ['regex.exec()', 'regex.test()', 'str.match()', 'str.search()'],
            correctIndex: 1,
            explanation: 'regex.test(string) evaluates whether a match exists, returning true or false without creating array allocations.'
          },
          {
            id: 'q-js24-2',
            type: 'output',
            question: 'What is extracted by the named group in "v2.5.0".match(/v(?<major>\\d+)/)?',
            options: ['"v2"', '"2"', '"2.5"', 'undefined'],
            correctIndex: 1,
            explanation: 'The group (?<major>\\d+) matches the digits following "v", extracting "2" into match.groups.major.'
          }
        ],
        relatedTopics: ['Strings', 'Security & Best Practices', 'JSON & Data Handling']
      }
    ]
  }
];
