import { FinalAssessment } from '../types/notebook';

export const JAVASCRIPT_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'js',
  title: 'JavaScript Programming Comprehensive Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Foundations, Core Syntax & Primitive Types',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'js-a1',
          section: 'A',
          marks: 1,
          topic: 'V8 Engine Pipeline',
          question: 'In Google V8, what is the role of the Ignition component?',
          options: [
            'It optimizes hot loops into native assembly machine code',
            'It is the fast bytecode interpreter that compiles AST into bytecode with low memory overhead',
            'It handles HTTP requests inside the browser networking stack',
            'It manages CSS styling transitions'
          ],
          correctIndex: 1,
          explanation: 'Ignition is V8’s bytecode interpreter, executing code immediately after parsing without waiting for expensive JIT optimization.'
        },
        {
          id: 'js-a2',
          section: 'A',
          marks: 1,
          topic: 'Type Identification Quirk',
          question: 'What is the evaluated result of `typeof null` in standard JavaScript?',
          options: ['"null"', '"undefined"', '"object"', '"primitive"'],
          correctIndex: 2,
          explanation: 'Due to a historical bug in the original 1995 JavaScript implementation, null was encoded with a 000 type tag which matched the object type tag, returning "object".'
        },
        {
          id: 'js-a3',
          section: 'A',
          marks: 1,
          topic: 'Strict vs Loose Equality',
          question: 'What do `"" == 0` and `"" === 0` evaluate to respectively?',
          options: ['true and true', 'false and false', 'true and false', 'false and true'],
          correctIndex: 2,
          explanation: 'Loose equality (==) coerces empty string "" to numeric 0, making 0 == 0 true. Strict equality (===) compares without coercion, returning false because string !== number.'
        },
        {
          id: 'js-a4',
          section: 'A',
          marks: 1,
          topic: 'Truthy and Falsy Values',
          question: 'Which of the following values is evaluated as TRUTHY in an if-condition?',
          options: ['0', '"" (empty string)', '[] (empty array)', 'NaN'],
          correctIndex: 2,
          explanation: 'In JavaScript, all objects and arrays (even empty [] and {}) evaluate to truthy. Only 8 values are falsy: false, 0, -0, 0n, "", null, undefined, and NaN.'
        },
        {
          id: 'js-a5',
          section: 'A',
          marks: 1,
          topic: 'Arrow Function Context',
          question: 'How do arrow functions determine the value of the `this` keyword?',
          options: [
            'Based on the object that invoked them dynamically',
            'They inherit this lexically from their enclosing parent scope at declaration time',
            'They always bind this to window or globalThis',
            'They create a new empty object'
          ],
          correctIndex: 1,
          explanation: 'Arrow functions have no this binding of their own; they resolve this lexically from their surrounding enclosing lexical environment.'
        },
        {
          id: 'js-a6',
          section: 'A',
          marks: 1,
          topic: 'String Immutability',
          question: 'What happens when executing `let s = "code"; s[0] = "m";`?',
          options: [
            's becomes "mode"',
            'Throws a fatal compiler error in all environments',
            's remains "code" because strings are immutable primitives in JavaScript',
            's becomes undefined'
          ],
          correctIndex: 2,
          explanation: 'JavaScript strings are immutable primitives. Index assignments are silently ignored in non-strict mode and throw TypeError in strict mode; the string remains unchanged.'
        },
        {
          id: 'js-a7',
          section: 'A',
          marks: 1,
          topic: 'Array Mutation',
          question: 'Which of the following array methods does NOT mutate the original array?',
          options: ['push()', 'splice()', 'slice()', 'sort()'],
          correctIndex: 2,
          explanation: 'slice() returns a shallow copy of a portion of an array without modifying the source array. push, splice, and sort all mutate the array in-place.'
        },
        {
          id: 'js-a8',
          section: 'A',
          marks: 1,
          topic: 'Object Comparison',
          question: 'What is the boolean result of evaluating `{} === {}`?',
          options: ['true', 'false', 'TypeError', 'undefined'],
          correctIndex: 1,
          explanation: 'In JavaScript, objects are reference types compared by memory address. Each object literal {} creates a unique allocation in heap memory, so their addresses differ.'
        },
        {
          id: 'js-a9',
          section: 'A',
          marks: 1,
          topic: 'Temporal Dead Zone',
          question: 'What occurs if you attempt to access a `let` or `const` variable before its line of declaration?',
          options: [
            'Returns undefined',
            'Throws ReferenceError due to the Temporal Dead Zone (TDZ)',
            'Returns null',
            'Creates a global variable'
          ],
          correctIndex: 1,
          explanation: 'Variables declared with let/const are in the Temporal Dead Zone from the start of the block until the declaration is evaluated. Accessing them throws ReferenceError.'
        },
        {
          id: 'js-a10',
          section: 'A',
          marks: 1,
          topic: 'Event Control',
          question: 'What is the exact distinction between `event.preventDefault()` and `event.stopPropagation()`?',
          options: [
            'preventDefault stops event bubbling; stopPropagation cancels the default browser action',
            'preventDefault cancels the default browser behavior; stopPropagation prevents the event from continuing to bubble up or capture down the DOM tree',
            'They are identical aliases for the same function',
            'stopPropagation removes the event listener permanently'
          ],
          correctIndex: 1,
          explanation: 'preventDefault() stops the default browser action (like following links or form submits), while stopPropagation() halts traversal up or down the DOM hierarchy.'
        }
      ]
    },

    sectionB: {
      title: 'Section B: Closures, OOP, Asynchronous Event Loop & Design Patterns',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'js-b1',
          section: 'B',
          marks: 1,
          topic: 'Closures & Private State',
          question: 'Analyze the following closure factory function. What will be logged, and why does this pattern provide encapsulation?\n\n```javascript\nfunction createWallet(initialFunds) {\n  let balance = initialFunds;\n  return {\n    spend(amount) {\n      if (amount <= balance) balance -= amount;\n      return balance;\n    }\n  };\n}\nconst wallet = createWallet(50);\nconsole.log(wallet.spend(20));\nconsole.log(wallet.balance);\n```',
          options: [
            '30 and 30; balance is an accessible property on wallet',
            '30 and undefined; balance is trapped in the function lexical closure and inaccessible from outside',
            'NaN and undefined; variable scope was destroyed when createWallet finished',
            'Throws ReferenceError on wallet.balance'
          ],
          correctIndex: 1,
          explanation: 'wallet.spend retains a live closure over the outer lexical environment containing balance. Because balance is a local variable, not an object property, wallet.balance returns undefined.'
        },
        {
          id: 'js-b2',
          section: 'B',
          marks: 1,
          topic: 'Prototype Delegation Chain',
          question: 'Consider a prototype lookup scenario. If an object `cat` has prototype `Animal.prototype`, which in turn delegates to `Object.prototype`, how does the engine resolve `cat.toString()`?',
          options: [
            'It checks cat, finds no own property, checks Animal.prototype, finds no own property, then finds toString on Object.prototype and executes it',
            'It throws TypeError because toString must be defined directly on the cat object',
            'It searches the global window object before searching prototypes',
            'It duplicates toString onto cat at instantiation time'
          ],
          correctIndex: 0,
          explanation: 'The JavaScript engine traverses up the prototype chain via [[Prototype]] links until it finds the requested property or reaches the end of the chain (null).'
        },
        {
          id: 'js-b3',
          section: 'B',
          marks: 1,
          topic: 'Event Loop Execution Priority',
          question: 'Trace the exact output sequence of this script across the Call Stack, Microtask Queue, and Macrotask Queue:\n\n```javascript\nconsole.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nqueueMicrotask(() => console.log("D"));\nconsole.log("E");\n```',
          options: [
            'A, E, C, D, B',
            'A, B, C, D, E',
            'A, E, B, C, D',
            'C, D, A, E, B'
          ],
          correctIndex: 0,
          explanation: 'Synchronous "A" and "E" log first. When the call stack empties, the microtask queue is completely drained, executing Promise callback "C" and queueMicrotask "D". Finally, the macrotask setTimeout callback "B" executes.'
        },
        {
          id: 'js-b4',
          section: 'B',
          marks: 1,
          topic: 'Deep Copy vs Shallow Copy',
          question: 'Why does `{ ...original }` fail as a true deep clone when an object contains nested arrays or child objects?',
          options: [
            'Spread syntax does not copy functions',
            'Spread syntax only copies top-level properties by value; nested objects/arrays are copied by reference pointer, meaning mutations affect both',
            'Spread syntax throws an error on objects with more than 3 keys',
            'Spread syntax creates immutable objects'
          ],
          correctIndex: 1,
          explanation: 'Spread creates a shallow clone. Nested objects still share identical heap memory addresses, meaning mutating a child property mutates both instances.'
        },
        {
          id: 'js-b5',
          section: 'B',
          marks: 1,
          topic: 'Promise Combinators',
          question: 'What is the primary operational difference between `Promise.all()` and `Promise.allSettled()`?',
          options: [
            'Promise.all rejects immediately upon the first rejection (fail-fast); Promise.allSettled waits for all promises to resolve or reject and returns status objects for each',
            'Promise.allSettled executes synchronously while Promise.all is asynchronous',
            'Promise.all is faster because it runs on a separate CPU thread',
            'Promise.allSettled cancels in-flight network requests automatically'
          ],
          correctIndex: 0,
          explanation: 'Promise.all rejects as soon as any input promise rejects. Promise.allSettled never rejects early; it collects the outcome ({ status: "fulfilled" | "rejected" }) of every promise.'
        },
        {
          id: 'js-b6',
          section: 'B',
          marks: 1,
          topic: 'High-Performance Event Delegation',
          question: 'How does event delegation on a `<ul>` list improve memory usage and dynamic element handling compared to direct event listeners on `<li>` tags?',
          options: [
            'It prevents the browser from rendering the list until clicked',
            'A single listener on the parent handles all current and future children via bubbling, avoiding thousands of function allocations',
            'It forces clicks to execute on a web worker thread',
            'It disables mouse dragging'
          ],
          correctIndex: 1,
          explanation: 'Event delegation attaches one event listener to the parent element, catching events as they bubble up and extracting e.target.closest(), saving memory and handling newly inserted children automatically.'
        },
        {
          id: 'js-b7',
          section: 'B',
          marks: 1,
          topic: 'ES Modules vs CommonJS',
          question: 'Why can modern bundlers (Vite/Rollup) perform tree-shaking on ES Modules (import/export) but struggle with CommonJS (require)?',
          options: [
            'ESM uses TypeScript types',
            'ESM imports and exports have a static structure determinable at compile/parse time before runtime execution',
            'CommonJS files are compressed binaries',
            'Vite does not support Node.js'
          ],
          correctIndex: 1,
          explanation: 'ES Modules cannot be conditionally placed inside if-blocks or functions. This rigid static analysis allows bundlers to safely remove unreferenced exports from the final bundle.'
        },
        {
          id: 'js-b8',
          section: 'B',
          marks: 1,
          topic: 'Async Waterfall Elimination',
          question: 'Identify the performance defect in this code and select the optimized equivalent:\n\n```javascript\nconst user = await fetchUser(id);\nconst posts = await fetchPosts(id);\n```',
          options: [
            'fetchPosts must run before fetchUser; swap their order',
            'The requests run in an accidental sequential waterfall; use `const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)])` to run them concurrently',
            'await cannot be used on two variables in the same file',
            'Wrap each in a setTimeout to avoid thread blocking'
          ],
          correctIndex: 1,
          explanation: 'The original code waits for fetchUser to finish completely before even starting fetchPosts. Promise.all launches both network requests concurrently, halving latency.'
        },
        {
          id: 'js-b9',
          section: 'B',
          marks: 1,
          topic: 'Map vs Object & WeakMap Semantics',
          question: 'Under what condition should an engineer select a `WeakMap` instead of a standard `Map`?',
          options: [
            'When keys are numbers or strings',
            'When metadata must be associated with object keys without preventing those objects from being garbage-collected when discarded elsewhere',
            'When the collection must be serialized to JSON',
            'When you need to loop over entries with for...of'
          ],
          correctIndex: 1,
          explanation: 'WeakMap maintains weak references to its object keys. If no other live references to a key object exist, the key and its value can be safely garbage-collected.'
        },
        {
          id: 'js-b10',
          section: 'B',
          marks: 1,
          topic: 'Debounce vs Throttle Algorithm',
          question: 'What is the behavioral difference between debouncing a function and throttling a function?',
          options: [
            'Debounce postpones execution until a specified quiet period with no new calls has elapsed; Throttle rate-limits execution to at most once per specified time interval',
            'Throttle delays until the user stops; Debounce runs at constant frequency',
            'Debounce is asynchronous; Throttle is synchronous',
            'Throttle works only on server backends'
          ],
          correctIndex: 0,
          explanation: 'Debounce waits for silence (ideal for search autocomplete inputs). Throttle enforces a maximum execution frequency (ideal for window resize and scroll handlers).'
        }
      ]
    },

    sectionC: {
      title: 'Section C: Systems Architecture, Security, Internals & Advanced Engineering',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'js-c1',
          section: 'C',
          marks: 1,
          topic: 'V8 Engine Shapes & Deoptimization',
          question: 'How do V8 "Hidden Classes" (Shapes) optimize object property access, and how can careless JavaScript coding trigger expensive de-optimizations in TurboFan?',
          options: [
            'V8 compiles all objects into C++ structs. Deleting properties (`delete obj.x`) or adding properties in differing orders alters the transition tree, forcing V8 into slow dictionary mode',
            'V8 runs objects through an encryption cipher; deoptimization happens when keys are too long',
            'Hidden classes convert objects to JSON; deoptimization occurs when arrays exceed 1000 items',
            'V8 only optimizes functions written with arrow syntax'
          ],
          correctIndex: 0,
          explanation: 'V8 creates hidden classes (shapes) based on property creation order and offsets. Adding properties out of order or using `delete` invalidates cached inline shapes, causing TurboFan to bail out to slow dictionary lookups.'
        },
        {
          id: 'js-c2',
          section: 'C',
          marks: 1,
          topic: 'Cross-Site Scripting (XSS) & Sinks',
          question: 'Explain the mechanism of a DOM-based XSS attack via `element.innerHTML`, and detail how an engineer comprehensively secures the application against it.',
          options: [
            'XSS happens when CSS styles break; fix it by updating Tailwind classes',
            'Attackers inject HTML containing executable scripts (`<img src=x onerror="...">`). Mitigation: strictly use `element.textContent`, sanitize HTML via DOMPurify, and enforce a Content Security Policy (CSP)',
            'XSS only affects SQL databases; client JavaScript is inherently immune',
            'Use var instead of let to prevent script injections'
          ],
          correctIndex: 1,
          explanation: 'Setting unvalidated user input via innerHTML allows attacker-supplied scripts or inline event handlers to execute in the victim\'s browser context. Using textContent, DOMPurify, and CSP guarantees defense in depth.'
        },
        {
          id: 'js-c3',
          section: 'C',
          marks: 1,
          topic: 'Reactive State Store with Proxy',
          question: 'How does an ES6 `Proxy` object enable fine-grained reactivity in modern client-side state management systems (such as Vue 3 or custom stores)?',
          options: [
            'It proxies network requests through a CDN',
            'It wraps state objects and intercepts `get` and `set` operations via traps, automatically tracking which UI components read state and triggering re-renders upon mutation',
            'It compiles JavaScript into WebAssembly at runtime',
            'It encrypts local storage keys'
          ],
          correctIndex: 1,
          explanation: 'Proxy objects define custom trap behaviors (such as get and set traps). Reading a property records a dependency; setting a property notifies all registered subscribers to re-render without manual setState calls.'
        },
        {
          id: 'js-c4',
          section: 'C',
          marks: 1,
          topic: 'Web Workers & Multithreaded Concurrency',
          question: 'When performing a CPU-intensive computation (e.g. image processing or massive cryptographic hashing), why must an engineer offload it to a Web Worker rather than running it on the main thread?',
          options: [
            'The main thread is single-threaded and handles UI rendering, user input, and layout; blocking it causes browser tab freezing and dropped 60fps frames',
            'Web Workers have higher memory allocation limits than the main thread',
            'Browsers prohibit running loops with more than 10,000 iterations on the main thread',
            'Web Workers can manipulate the DOM directly at twice the speed'
          ],
          correctIndex: 0,
          explanation: 'JavaScript on the main browser thread shares execution time with UI rendering and event processing. Long-running synchronous loops freeze the interface. Web Workers run on background OS threads, communicating via postMessage.'
        },
        {
          id: 'js-c5',
          section: 'C',
          marks: 1,
          topic: 'Functional Composition & Currying',
          question: 'Evaluate the following functional pipe and currying implementation. What is computed for `formatUser("   alex smith   ")`?\n\n```javascript\nconst pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\nconst trim = s => s.trim();\nconst capitalize = s => s.replace(/\\b\\w/g, c => c.toUpperCase());\nconst prefix = tag => str => `[${tag}] ${str}`;\n\nconst formatUser = pipe(trim, capitalize, prefix("STUDENT"));\n```',
          options: [
            '"[STUDENT] Alex Smith"',
            '"Alex Smith [STUDENT]"',
            'TypeError: reduce is not a function',
            '"[STUDENT]   alex smith   "'
          ],
          correctIndex: 0,
          explanation: 'pipe passes the input through trim ("alex smith"), then capitalize ("Alex Smith"), and finally prefix("STUDENT") which returns "[STUDENT] Alex Smith".'
        },
        {
          id: 'js-c6',
          section: 'C',
          marks: 1,
          topic: 'Custom Iterators & Generators',
          question: 'How do Generator functions (`function*`) implement lazy evaluation, and what happens to local variables when execution reaches a `yield` statement?',
          options: [
            'The function terminates and all local variables are garbage collected',
            'The execution context is paused, local variable state is preserved in the generator heap frame, and control returns to the caller until next() is invoked',
            'The engine converts the generator into a synchronous while loop',
            'Yield spawns a new Web Worker thread'
          ],
          correctIndex: 1,
          explanation: 'Generators retain their execution context frame. When yield evaluates, state is frozen and value returned to caller. Subsequent .next() calls resume execution right from the pause point.'
        },
        {
          id: 'js-c7',
          section: 'C',
          marks: 1,
          topic: 'Resilient Fetch Client with AbortController',
          question: 'Why is combining `window.fetch()` with `AbortController` and explicit `response.ok` checks required for building production-grade API clients?',
          options: [
            'Because fetch() resolves on 4xx/5xx HTTP errors instead of rejecting, and without AbortController, hung connections or obsolete user keystrokes cannot be cancelled',
            'Because fetch() automatically retries failed requests 5 times',
            'Because browsers reject fetch calls that do not include an AbortController',
            'AbortController converts XML to JSON'
          ],
          correctIndex: 0,
          explanation: 'fetch only rejects on network failures. Inspecting response.ok guarantees non-2xx responses are trapped as errors. AbortController allows cancelling stale requests during autocomplete or enforcing request timeouts.'
        },
        {
          id: 'js-c8',
          section: 'C',
          marks: 1,
          topic: 'Node.js Libuv Architecture & Non-Blocking I/O',
          question: 'How does Node.js achieve high concurrency and throughput when its JavaScript execution thread is strictly single-threaded?',
          options: [
            'It spawns a new OS thread for every incoming HTTP request',
            'It leverages libuv\'s non-blocking event loop to delegate asynchronous I/O (sockets, timers, files) to OS kernel mechanisms (epoll/kqueue) and a C++ worker thread pool',
            'It relies on multiple CPU cores compiling JavaScript simultaneously',
            'It runs JavaScript code inside an Apache Tomcat container'
          ],
          correctIndex: 1,
          explanation: 'Node.js delegates I/O operations to the operating system kernel via libuv (using epoll on Linux, kqueue on macOS) and a worker thread pool, invoking JavaScript callbacks only when I/O events complete.'
        },
        {
          id: 'js-c9',
          section: 'C',
          marks: 1,
          topic: 'Optimistic UI Updates & Error Rollbacks',
          question: 'Describe the architecture of an Optimistic UI update in a web application and how state synchronization must handle unexpected server rejection.',
          options: [
            'The UI waits for the database to commit and return HTTP 200 before updating any visual elements',
            'The UI updates local state immediately upon user action assuming success, while dispatching the background request with a rollback snapshot to restore state if the request fails',
            'Optimistic UI disables network error handling completely',
            'It caches requests in IndexedDB and never contacts the server'
          ],
          correctIndex: 1,
          explanation: 'Optimistic UI eliminates perceived latency by rendering the anticipated success state immediately, retaining an in-memory snapshot of prior state to execute an automatic rollback if the API returns an error.'
        },
        {
          id: 'js-c10',
          section: 'C',
          marks: 1,
          topic: 'Modern Toolchains: Vite & Native ES Modules',
          question: 'Why does Vite provide virtually instantaneous server startup and Hot Module Replacement (HMR) compared to traditional bundlers (like Webpack)?',
          options: [
            'Vite does not bundle source code during development; it serves source code over native browser ES Modules (ESM) on demand, compiling only the specific file requested',
            'Vite executes all JavaScript on the GPU',
            'Vite skips code execution and only compiles HTML',
            'Webpack only supports Internet Explorer'
          ],
          correctIndex: 0,
          explanation: 'Traditional bundlers crawl and bundle the entire application before starting the dev server. Vite starts the server instantly, letting the browser request modules over native ESM, using esbuild only for dependency pre-bundling.'
        }
      ]
    }
  }
};
