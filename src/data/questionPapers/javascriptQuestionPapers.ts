import { SubjectQuestionPapers } from '../../types/notebook';

export const JAVASCRIPT_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'javascript',
  subjectName: 'JavaScript & V8 Engine Architecture',
  courseCode: 'CS-104-JS',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-104-JS-S1',
      title: 'JavaScript Core, Event Loop & V8 Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-104-JS',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).',
        'Draw clear Call Stack, Event Loop, Microtask Queue diagrams and prototype chain links where required.'
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
              id: 'js-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Variable Declarations: Temporal Dead Zone (TDZ)',
              question: 'Explain what the Temporal Dead Zone (TDZ) is for `let` and `const` variables in JavaScript.',
              markingBreakdown: ['Explains span between scope entry and actual variable declaration line: 1 Mark'],
              modelSolution: 'The Temporal Dead Zone (TDZ) is the period between entering a block scope and the line where a `let` or `const` variable is declared. Accessing the variable during the TDZ throws a `ReferenceError`.',
              notebookCheckpoints: ['ReferenceError thrown', 'Block scope entry until declaration line']
            },
            {
              id: 'js-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Event Loop Queues',
              question: 'Which has higher execution priority in the JavaScript Event Loop: the Microtask Queue (Promises) or the Macrotask / Callback Queue (`setTimeout`)?',
              markingBreakdown: ['Microtask Queue has absolute priority: 1 Mark'],
              modelSolution: 'The Microtask Queue has higher priority. The Event Loop drains the entire Microtask Queue completely after every call stack frame, before executing the next Macrotask.',
              notebookCheckpoints: ['Microtask Queue', 'Drained before next macrotask']
            },
            {
              id: 'js-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Type Coercion Equality',
              question: 'What do `null == undefined` and `null === undefined` evaluate to in JavaScript?',
              markingBreakdown: ['true for loose equality, false for strict equality: 1 Mark'],
              modelSolution: '`null == undefined` evaluates to `true` (special loose coercion rule in ECMAScript specification). `null === undefined` evaluates to `false` because they have distinct primitive types.',
              notebookCheckpoints: ['null == undefined is true', 'null === undefined is false']
            },
            {
              id: 'js-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Closures',
              question: 'Define a Closure in JavaScript.',
              markingBreakdown: ['Combination of a function bundled with its lexical environment: 1 Mark'],
              modelSolution: 'A Closure is the combination of a function bundled together with references to its surrounding lexical environment, allowing an inner function to retain access to an outer function\'s variables even after the outer function has returned.',
              notebookCheckpoints: ['Function + lexical environment', 'Access after outer function returns']
            },
            {
              id: 'js-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Arrow Functions vs Regular Functions',
              question: 'How do Arrow Functions handle their `this` binding differently from standard `function` declarations?',
              markingBreakdown: ['Arrow functions have no own this; they bind this lexically from enclosing scope: 1 Mark'],
              modelSolution: 'Arrow functions do not have their own `this` binding; they capture `this` lexically from the enclosing parent execution context at the time of definition, ignoring `.call()`, `.apply()`, or `.bind()`.',
              notebookCheckpoints: ['Lexical this binding', 'Cannot be rebound with call/apply/bind']
            },
            {
              id: 'js-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Object Prototype Chain Root',
              question: 'What is at the very top (end) of the JavaScript prototype chain (i.e. `Object.prototype.__proto__`)?',
              markingBreakdown: ['null: 1 Mark'],
              modelSolution: '`null`. Accessing `Object.prototype.__proto__` evaluates to `null`, signaling the termination of property lookup.',
              notebookCheckpoints: ['null']
            },
            {
              id: 'js-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Promise States',
              question: 'Name the three mutually exclusive states a JavaScript `Promise` can exist in.',
              markingBreakdown: ['pending, fulfilled, rejected: 1 Mark'],
              modelSolution: '`pending`, `fulfilled`, and `rejected`.',
              notebookCheckpoints: ['pending, fulfilled, rejected']
            },
            {
              id: 'js-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'typeof NaN',
              question: 'What is the return value of `typeof NaN` in JavaScript, and why is `NaN === NaN` false?',
              markingBreakdown: ['typeof is "number", NaN is not equal to anything per IEEE 754: 1 Mark'],
              modelSolution: '`typeof NaN` returns `"number"`. Per IEEE 754 floating-point standards, `NaN` represents an invalid numerical result and is defined as not equal to any value, including itself (`NaN === NaN` is `false`). Use `Number.isNaN()` to check.',
              notebookCheckpoints: ['"number"', 'NaN === NaN is false']
            },
            {
              id: 'js-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'JavaScript Primitives',
              question: 'List all 7 primitive data types defined in modern ECMAScript.',
              markingBreakdown: ['string, number, bigint, boolean, undefined, symbol, null: 1 Mark'],
              modelSolution: '`string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`.',
              notebookCheckpoints: ['string, number, bigint, boolean, undefined, symbol, null']
            },
            {
              id: 'js-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Object.freeze()',
              question: 'Does `Object.freeze(obj)` perform a shallow freeze or deep freeze on nested object properties?',
              markingBreakdown: ['Shallow freeze: 1 Mark'],
              modelSolution: '`Object.freeze()` is shallow. It freezes only the top-level keys; nested child objects remain mutable unless recursively frozen.',
              notebookCheckpoints: ['Shallow freeze only']
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
              id: 'js-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Event Loop Execution Order Trace',
              question: 'Trace the exact console output order of the following asynchronous JavaScript program in your notebook, and draw a trace diagram showing Call Stack, Microtask Queue, and Macrotask Queue:\n```javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nqueueMicrotask(() => console.log("4"));\nconsole.log("5");\n```',
              markingBreakdown: [
                'Correct output sequence (1, 5, 3, 4, 2): 2.5 Marks',
                'Event loop queue trace diagram: 2.5 Marks'
              ],
              modelSolution: `Output Sequence:
1
5
3
4
2

Event Loop Breakdown:
1. Synchronous phase:
   - \`console.log("1")\` prints 1.
   - \`setTimeout(..., 0)\` schedules task in Macrotask Queue [T2].
   - \`Promise.resolve().then(...)\` enqueues callback in Microtask Queue [M3].
   - \`queueMicrotask(...)\` enqueues callback in Microtask Queue [M4].
   - \`console.log("5")\` prints 5.
   - Synchronous Call Stack is now empty!
2. Microtask Check:
   - Drains Microtask Queue: executes M3 (prints 3), then executes M4 (prints 4).
   - Microtask Queue is now empty!
3. Macrotask Phase:
   - Event loop picks oldest macrotask T2: prints 2.`,
              notebookCheckpoints: [
                'Final order: 1, 5, 3, 4, 2',
                'Draw Microtask Queue draining before Macrotask Queue'
              ]
            },
            {
              id: 'js-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Custom Debounce Function Implementation',
              question: 'Write a manual implementation of a `debounce(fn, delay)` utility in JavaScript without using third-party libraries (like Lodash). Explain how it prevents excessive API requests during keystrokes and preserves `this` context.',
              markingBreakdown: [
                'Timer management and clearTimeout: 2.5 Marks',
                'Preserving this and arguments with fn.apply: 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
function debounce(fn, delay) {
    let timerId = null;
    return function(...args) {
        // Clear any pending timer scheduled previously
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        // Set new timer to execute function after delay of silence
        timerId = setTimeout(() => {
            fn.apply(this, args);
            timerId = null;
        }, delay);
    };
}
\`\`\`
Explanation:
Every time the user strikes a key, the existing timer is cancelled via \`clearTimeout\`. Only when the user pauses typing for longer than \`delay\` milliseconds does the final function invocation execute. \`fn.apply(this, args)\` ensures the original calling context and event arguments are passed through intact.`,
              notebookCheckpoints: [
                'clearTimeout(timerId)',
                'setTimeout with fn.apply(this, args)'
              ]
            },
            {
              id: 'js-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Prototype Inheritance & Constructor Functions',
              question: 'Without using ES6 `class` syntax, implement prototype-based inheritance in ES5:\n(a) Constructor `Animal(name)` with prototype method `speak()`.\n(b) Constructor `Dog(name, breed)` that calls `Animal` using `.call(this, name)`.\n(c) Set up the prototype chain properly using `Object.create(Animal.prototype)` and restore `Dog.prototype.constructor`.\n(d) Draw the prototype chain links in your notebook.',
              markingBreakdown: [
                'Animal constructor and prototype method: 1 Mark',
                'Dog calling super constructor with Animal.call: 1.5 Marks',
                'Object.create prototype link and constructor repair: 1.5 Marks',
                'Prototype chain diagram: 1 Mark'
              ],
              modelSolution: `\`\`\`javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return this.name + " makes a sound.";
};

function Dog(name, breed) {
    Animal.call(this, name); // Super constructor invocation
    this.breed = breed;
}

// Inherit prototype
Dog.prototype = Object.create(Animal.prototype);
// Repair constructor pointer
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return this.name + " barks!";
};
\`\`\`
Prototype Chain Diagram:
[dog instance] 
  ──__proto__──> [Dog.prototype] (constructor: Dog, bark)
                   ──__proto__──> [Animal.prototype] (constructor: Animal, speak)
                                    ──__proto__──> [Object.prototype]
                                                     ──__proto__──> null`,
              notebookCheckpoints: [
                'Animal.call(this, name)',
                'Dog.prototype = Object.create(Animal.prototype)',
                'Dog.prototype.constructor = Dog'
              ]
            },
            {
              id: 'js-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Custom `Promise.all` Implementation',
              question: 'Implement your own `promiseAll(iterable)` function that replicates standard `Promise.all()`:\n(a) Resolves with an array of values when all promises resolve.\n(b) Maintains original input index order (not completion order).\n(c) Rejects immediately if any promise rejects (fail-fast behavior).\n(d) Handles non-promise values using `Promise.resolve()`.',
              markingBreakdown: [
                'Promise return and empty array check: 1 Mark',
                'Tracking resolved count and maintaining array index order: 2.5 Marks',
                'Fail-fast rejection: 1.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be an array"));
        }
        if (promises.length === 0) {
            return resolve([]);
        }

        const results = new Array(promises.length);
        let resolvedCount = 0;

        promises.forEach((p, index) => {
            Promise.resolve(p).then((val) => {
                results[index] = val; // Preserve original index
                resolvedCount++;
                if (resolvedCount === promises.length) {
                    resolve(results);
                }
            }).catch(reject); // Immediate fail-fast
        });
    });
}
\`\`\``,
              notebookCheckpoints: [
                'Track resolvedCount against promises.length',
                'results[index] = val maintains original ordering',
                '.catch(reject) for fail-fast'
              ]
            },
            {
              id: 'js-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'V8 Engine Optimization: Hidden Classes & Inline Caching',
              question: 'Explain how the V8 JavaScript Engine optimizes property lookups using:\n(a) "Hidden Classes" (Shapes/Maps).\n(b) Why adding properties in different orders (e.g. `{a, b}` vs `{b, a}`) or adding properties dynamically (`obj.x = 10`) de-optimizes code.\n(c) What "Inline Caching" (IC) is and how monomorphic call sites run faster than megamorphic call sites.',
              markingBreakdown: [
                'Hidden classes transition tree explanation: 2 Marks',
                'Order mismatch causing shape polymorphism: 1.5 Marks',
                'Inline caching and monomorphic vs megamorphic explanation: 1.5 Marks'
              ],
              modelSolution: `(a) Hidden Classes (Shapes):
JavaScript objects have dynamic properties, making hash lookups slow. V8 generates synthetic C++ "Hidden Classes" behind the scenes. Each property addition transitions the object to a new Shape with fixed memory offsets.

(b) Property Order Impact:
If object 1 is initialized as \`{a: 1, b: 2}\` and object 2 is initialized as \`{b: 2, a: 1}\`, V8 creates two completely distinct transition trees and two separate hidden classes! The two objects do not share a shape.

(c) Inline Caching (IC):
V8 caches the memory offset of property lookups at function call sites.
- Monomorphic: The function always encounters the exact same hidden class shape -> V8 compiles lookup down to 1 direct memory read.
- Megamorphic: The function encounters > 4 different shapes -> V8 gives up caching and degrades to slow dictionary hash lookups.`,
              notebookCheckpoints: [
                'Explain transition tree of shapes',
                'Monomorphic (1 shape) vs Megamorphic (>4 shapes)'
              ]
            },
            {
              id: 'js-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Currying & Partial Application',
              question: 'Write a general `curry(fn)` utility function in JavaScript that transforms any function taking $N$ arguments into a series of unary functions.\nExample: `const add = (a, b, c) => a + b + c; const curriedAdd = curry(add); curriedAdd(1)(2)(3); // returns 6`.',
              markingBreakdown: [
                'Arity inspection with fn.length: 2 Marks',
                'Recursive argument accumulation: 3 Marks'
              ],
              modelSolution: `\`\`\`javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}
\`\`\``,
              notebookCheckpoints: [
                'Check args.length >= fn.length',
                'Recursively return curried function with concatenated args'
              ]
            },
            {
              id: 'js-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Memory Leaks in JavaScript SPAs',
              question: 'Identify 3 common causes of Memory Leaks in modern Single-Page Applications (SPAs) and show code examples of how to remediate each:\n1. Forgotten DOM event listeners.\n2. Uncleared interval timers (`setInterval`).\n3. Closures retaining references to detached DOM nodes.',
              markingBreakdown: [
                'Listener leak and removeEventListener: 1.5 Marks',
                'Timer leak and clearInterval in cleanup: 1.5 Marks',
                'Detached DOM node closure leak and fix: 2 Marks'
              ],
              modelSolution: `1. Forgotten Event Listeners:
\`\`\`javascript
// Leak: window listener retained after component unmounts
window.addEventListener('resize', handleResize);
// Fix: Clean up in destructor/unmount hook
window.removeEventListener('resize', handleResize);
\`\`\`

2. Uncleared Timers:
\`\`\`javascript
// Leak: timer retains callback and scope forever
const id = setInterval(() => pollServer(), 1000);
// Fix: clearInterval(id) on destroy
clearInterval(id);
\`\`\`

3. Detached DOM Nodes in Closures:
\`\`\`javascript
// Leak: closure references a heavy DOM tree removed from document
let element = document.getElementById('heavy-widget');
document.body.removeChild(element);
// But element reference is kept in a global array:
// Fix: element = null; to allow GC reclamation
\`\`\``,
              notebookCheckpoints: [
                'removeEventListener',
                'clearInterval',
                'Null out detached element references'
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
              id: 'js-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Architecture: Reactive State Management Engine (Mini-Vue/MobX)',
              question: 'Build a Reactive State Engine in modern JavaScript using ES6 `Proxy` and `Reflect`:\n(a) Track dependencies automatically using an active effect stack (`currentEffect`).\n(b) Function `reactive(target)` wrapping an object in a Proxy to intercept `get` and `set`.\n(c) Track subscribers in a global `WeakMap<Target, Map<Key, Set<Effect>>>`.\n(d) Function `effect(fn)` that executes `fn` and automatically re-runs it whenever any accessed reactive state changes.\n(e) Demonstrate by reacting to changes in `state.count`.',
              markingBreakdown: [
                'Dependency tracking data structures (WeakMap/Map/Set): 2.5 Marks',
                'reactive Proxy get interceptor with track(): 2.5 Marks',
                'reactive Proxy set interceptor with trigger(): 2.5 Marks',
                'effect() function and working counter demonstration: 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
    if (!activeEffect) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effectFn => effectFn());
    }
}

function reactive(target) {
    return new Proxy(target, {
        get(obj, key, receiver) {
            track(obj, key);
            return Reflect.get(obj, key, receiver);
        },
        set(obj, key, value, receiver) {
            const oldValue = obj[key];
            const result = Reflect.set(obj, key, value, receiver);
            if (oldValue !== value) {
                trigger(obj, key);
            }
            return result;
        }
    });
}

function effect(fn) {
    const effectFn = () => {
        try {
            activeEffect = effectFn;
            fn();
        } finally {
            activeEffect = null;
        }
    };
    effectFn(); // Initial run to collect dependencies
}

// Demonstration
const state = reactive({ count: 0 });
effect(() => {
    console.log("Reactive Render -> Count is:", state.count);
});

state.count = 1; // Automatically re-runs effect! Output: Count is: 1
state.count = 2; // Output: Count is: 2
\`\`\``,
              notebookCheckpoints: [
                'WeakMap -> Map -> Set structure',
                'activeEffect assignment before running fn()',
                'Reflect.get and Reflect.set usage'
              ]
            },
            {
              id: 'js-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'System Architecture: Custom EventEmitter & Pub/Sub Pattern',
              question: 'Construct an industrial-grade `EventEmitter` in JavaScript mimicking Node.js `events`:\n(a) Methods: `on(event, listener)`, `off(event, listener)`, `emit(event, ...args)`, and `once(event, listener)`.\n(b) Memory leak prevention: support `setMaxListeners(n)` and emit a console warning if exceeded.\n(c) Prepend listener support: `prependListener(event, listener)`.\n(d) Exception isolation: if one subscriber throws an error, other subscribers must still execute.',
              markingBreakdown: [
                'on and emit implementation: 2.5 Marks',
                'once implementation with self-deregistering wrapper: 2.5 Marks',
                'setMaxListeners memory leak warning: 2 Marks',
                'Exception isolation across subscribers: 3 Marks'
              ],
              modelSolution: `\`\`\`javascript
class EventEmitter {
    constructor() {
        this._events = Object.create(null);
        this._maxListeners = 10;
    }

    setMaxListeners(n) {
        this._maxListeners = n;
    }

    on(event, listener) {
        if (typeof listener !== 'function') throw new TypeError("Listener must be a function");
        if (!this._events[event]) this._events[event] = [];
        
        if (this._events[event].length >= this._maxListeners) {
            console.warn(\`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. \${this._events[event].length} listeners added.\`);
        }
        this._events[event].push(listener);
        return this;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener.apply(this, args);
        };
        wrapper._original = listener;
        this.on(event, wrapper);
        return this;
    }

    off(event, listener) {
        if (!this._events[event]) return this;
        this._events[event] = this._events[event].filter(l => l !== listener && l._original !== listener);
        return this;
    }

    emit(event, ...args) {
        if (!this._events[event]) return false;
        // Clone listeners array so modifications mid-emit don't alter current iteration
        const listeners = [...this._events[event]];
        listeners.forEach(fn => {
            try {
                fn.apply(this, args);
            } catch (err) {
                console.error(\`Unhandled error in listener for event '\${event}':\`, err);
            }
        });
        return true;
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Clone listeners: [...this._events[event]]',
                'once self-deregistering wrapper with _original check',
                'try-catch around individual listener calls'
              ]
            },
            {
              id: 'js-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Deep Clone & Circular Reference Serialization Engine',
              question: 'Construct an enterprise-grade `deepClone(obj)` algorithm in modern JavaScript that out-performs naive `JSON.parse(JSON.stringify(obj))`:\n(a) Handle circular references using a `WeakMap` cache.\n(b) Correctly clone built-in objects: `Date`, `RegExp`, `Map`, `Set`, and `Array`.\n(c) Preserve Symbol-keyed properties (`Object.getOwnPropertySymbols`).\n(d) Preserve prototype inheritance (`Object.getPrototypeOf`).\n(e) Compare with `structuredClone()`.',
              markingBreakdown: [
                'WeakMap circular reference handling: 2.5 Marks',
                'Cloning Date, RegExp, Map, Set: 2.5 Marks',
                'Reflect.ownKeys (symbols + prototype preservation): 3 Marks',
                'Comparison with native structuredClone: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
function deepClone(value, hash = new WeakMap()) {
    // 1. Primitives & null
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // 2. Circular reference prevention
    if (hash.has(value)) {
        return hash.get(value);
    }

    // 3. Special Built-in types
    if (value instanceof Date) return new Date(value);
    if (value instanceof RegExp) return new RegExp(value.source, value.flags);
    if (value instanceof Map) {
        const copyMap = new Map();
        hash.set(value, copyMap);
        value.forEach((v, k) => copyMap.set(deepClone(k, hash), deepClone(v, hash)));
        return copyMap;
    }
    if (value instanceof Set) {
        const copySet = new Set();
        hash.set(value, copySet);
        value.forEach(v => copySet.add(deepClone(v, hash)));
        return copySet;
    }

    // 4. Object & Array prototype preservation
    const proto = Object.getPrototypeOf(value);
    const cloneObj = Object.create(proto);
    hash.set(value, cloneObj);

    // 5. Reflect.ownKeys includes Symbols and non-enumerable properties
    Reflect.ownKeys(value).forEach(key => {
        cloneObj[key] = deepClone(value[key], hash);
    });

    return cloneObj;
}
\`\`\`
Comparison with structuredClone():
\`structuredClone()\` is a built-in browser/Node.js API implementing the HTML structured clone algorithm. It supports circular references and ArrayBuffers, but throws a \`DataCloneError\` if an object contains functions or DOM nodes.`,
              notebookCheckpoints: [
                'WeakMap for cycle detection',
                'Handle Date, RegExp, Map, Set',
                'Reflect.ownKeys for Symbols'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-104-JS-S2',
      title: 'JavaScript Asynchronous Architecture & DOM Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-104-JS',
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
              id: 'js-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Event Bubbling vs Capturing',
              question: 'In DOM event propagation, which phase executes first: Event Capturing or Event Bubbling?',
              markingBreakdown: ['Capturing phase executes first: 1 Mark'],
              modelSolution: 'The Event Capturing phase (trickling down from `window` to the target element) executes first, followed by the Target phase, and finally the Event Bubbling phase (bubbling up to `window`).',
              notebookCheckpoints: ['Capturing phase executes first']
            },
            {
              id: 'js-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'async/await Return Value',
              question: 'What does an `async` function always return, even if you explicitly write `return 42;`?',
              markingBreakdown: ['A Promise resolving to that value: 1 Mark'],
              modelSolution: 'An `async` function always returns a `Promise` (e.g. `Promise.resolve(42)`).',
              notebookCheckpoints: ['Returns a Promise']
            },
            {
              id: 'js-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'WeakSet vs Set',
              question: 'Why can only objects be stored as elements in a `WeakSet`?',
              markingBreakdown: ['Enables garbage collection when no other references exist: 1 Mark'],
              modelSolution: '`WeakSet` holds "weak" references to objects so they can be garbage collected when no other strong references remain. Primitives have no identity or memory lifecycle and cannot be weakly held.',
              notebookCheckpoints: ['Only objects have garbage-collected memory identities']
            },
            {
              id: 'js-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Function.prototype.bind()',
              question: 'Does `.bind()` immediately execute the function? What does it return?',
              markingBreakdown: ['Returns a new bound function with locked this: 1 Mark'],
              modelSolution: 'No. `.bind()` does not execute the function. It returns a new bound function with its `this` context and initial parameters permanently bound.',
              notebookCheckpoints: ['Returns a new bound function']
            },
            {
              id: 'js-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Generator Functions (`function*`)',
              question: 'What object does calling a generator function (`function*`) return?',
              markingBreakdown: ['Generator object implementing Iterator and Iterable: 1 Mark'],
              modelSolution: 'It returns a Generator object that conforms to both the iterable and iterator protocols (exposing `.next()`, `.return()`, and `.throw()`).',
              notebookCheckpoints: ['Generator object with .next()']
            },
            {
              id: 'js-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Nullish Coalescing (??) vs OR (||)',
              question: 'What is printed by `0 || 10` versus `0 ?? 10`?',
              markingBreakdown: ['10 and 0: 1 Mark'],
              modelSolution: '`0 || 10` returns `10` because 0 is falsy. `0 ?? 10` returns `0` because `??` only falls back on `null` or `undefined`.',
              notebookCheckpoints: ['0 || 10 is 10', '0 ?? 10 is 0']
            },
            {
              id: 'js-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Module Scopes: ES Modules vs CommonJS',
              question: 'Are ES Modules (`import`/`export`) parsed and evaluated statically at compile-time or dynamically at runtime like `require()`?',
              markingBreakdown: ['Statically at compile/parse time: 1 Mark'],
              modelSolution: 'ES Modules are parsed and resolved statically at compile/parse time (enabling tree-shaking), whereas CommonJS `require()` is evaluated dynamically at runtime.',
              notebookCheckpoints: ['Statically at compile-time']
            },
            {
              id: 'js-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Optional Chaining (?.)',
              question: 'What does `user?.address?.city` evaluate to if `user.address` is `undefined`?',
              markingBreakdown: ['undefined without throwing TypeError: 1 Mark'],
              modelSolution: 'It short-circuits and evaluates to `undefined` without throwing a `TypeError: Cannot read properties of undefined`.',
              notebookCheckpoints: ['undefined']
            },
            {
              id: 'js-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Symbols as Object Keys',
              question: 'Are Symbol properties included when iterating an object with `for...in` or `Object.keys()`?',
              markingBreakdown: ['No, they are skipped: 1 Mark'],
              modelSolution: 'No. Symbol-keyed properties are intentionally skipped by `for...in`, `Object.keys()`, and `JSON.stringify()`. They can only be accessed via `Object.getOwnPropertySymbols()`.',
              notebookCheckpoints: ['Skipped / ignored']
            },
            {
              id: 'js-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Shadow DOM',
              question: 'What is the primary benefit of Shadow DOM in Web Components?',
              markingBreakdown: ['Style and DOM tree encapsulation: 1 Mark'],
              modelSolution: 'Encapsulation: It isolates component HTML markup and CSS styles from leaking into or being overwritten by the global page DOM.',
              notebookCheckpoints: ['CSS and DOM encapsulation']
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
              id: 'js-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Throttling Utility Implementation',
              question: 'Implement a `throttle(fn, interval)` utility in JavaScript that guarantees `fn` is executed at most once per `interval` milliseconds. Contrast its use-case with debouncing (e.g. scroll events vs search input).',
              markingBreakdown: [
                'Throttle implementation with timestamp or flag: 3 Marks',
                'Comparison with debounce: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}
\`\`\`
Difference:
- Debounce delays execution until a burst of events stops (e.g. waiting for user to stop typing in search bar).
- Throttle enforces a regular execution rate during continuous high-frequency events (e.g. recalculating scroll positions at 60fps).`,
              notebookCheckpoints: [
                'Time delta check (now - lastTime >= interval)',
                'Throttle = rate limit; Debounce = wait for silence'
              ]
            },
            {
              id: 'js-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Event Delegation Pattern',
              question: 'Explain the Event Delegation pattern in DOM architecture. Write JavaScript code that handles clicks on dynamically generated `<li>` items inside a `<ul>` list using a single parent listener, filtering by `event.target`.',
              markingBreakdown: [
                'Event bubbling delegation theory: 2 Marks',
                'Single parent listener implementation with event.target.closest: 3 Marks'
              ],
              modelSolution: `Instead of binding hundreds of event listeners to individual list items, Event Delegation binds a single listener to the parent container, leveraging Event Bubbling to catch clicks as they bubble up.

\`\`\`javascript
const list = document.getElementById('user-list');

list.addEventListener('click', function(event) {
    const item = event.target.closest('li');
    if (!item || !list.contains(item)) return;

    console.log("Clicked item ID:", item.dataset.id, item.textContent);
});
\`\`\``,
              notebookCheckpoints: [
                'Single parent listener',
                'event.target.closest(\'li\')',
                'Memory savings for dynamic lists'
              ]
            },
            {
              id: 'js-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Custom `Promise.race` & `Promise.any` Implementation',
              question: 'Implement:\n(a) `promiseRace(promises)` resolving/rejecting with the first settled promise.\n(b) Explain how `Promise.any()` differs by ignoring rejections until all reject (`AggregateError`).',
              markingBreakdown: [
                'promiseRace implementation: 2.5 Marks',
                'Promise.any behavior explanation: 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
// (a) Promise.race
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => Promise.resolve(p).then(resolve, reject));
    });
}
\`\`\`
(b) Difference:
\`Promise.race\` settles as soon as ANY promise settles (whether fulfilled or rejected).
\`Promise.any\` waits for the first FULFILLED promise. It ignores rejections unless every promise in the array fails, in which case it rejects with an \`AggregateError\`.`,
              notebookCheckpoints: [
                'promiseRace resolves or rejects with first settled',
                'Promise.any ignores rejections until all fail'
              ]
            },
            {
              id: 'js-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Web Workers & Multithreading',
              question: 'Explain how Web Workers execute CPU-heavy code off the main UI thread. Write the code for a main thread spawning a worker and sending an array, and the worker script processing and posting results back with `postMessage`.',
              markingBreakdown: [
                'Main thread code (new Worker, postMessage, onmessage): 2.5 Marks',
                'Worker thread code (self.onmessage, self.postMessage): 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

worker.onmessage = function(e) {
    console.log("Result from background thread:", e.data.sum);
};

// worker.js (runs in isolated OS thread without DOM access)
self.onmessage = function(e) {
    const sum = e.data.numbers.reduce((acc, x) => acc + x, 0);
    self.postMessage({ sum });
};
\`\`\``,
              notebookCheckpoints: [
                'worker.postMessage',
                'self.onmessage and self.postMessage',
                'Workers have no DOM access'
              ]
            },
            {
              id: 'js-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Intersection Observer API',
              question: 'Write a JavaScript snippet using `IntersectionObserver` to implement Infinite Scrolling or Image Lazy-Loading that loads an image URL only when the `<img>` element enters within 50px of the viewport.',
              markingBreakdown: [
                'IntersectionObserver initialization with rootMargin: 2.5 Marks',
                'isIntersecting check and dataset src assignment: 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Swap data-src to real src
            obs.unobserve(img); // Cease observation once loaded
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
\`\`\``,
              notebookCheckpoints: [
                'rootMargin: \'50px\'',
                'obs.unobserve(img)'
              ]
            },
            {
              id: 'js-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Async Retry with Exponential Backoff',
              question: 'Implement an asynchronous utility `fetchWithRetry(fn, retries=3, delay=1000)` that attempts calling an async operation, catching errors and retrying with exponential backoff (`delay * 2`).',
              markingBreakdown: [
                'Recursive or loop try-catch: 3 Marks',
                'Exponential delay doubling with setTimeout: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
async function fetchWithRetry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;
        console.warn(\`Failed. Retrying in \${delay}ms... (\${retries} left)\`);
        await new Promise(res => setTimeout(res, delay));
        return fetchWithRetry(fn, retries - 1, delay * 2);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'await new Promise(res => setTimeout(res, delay))',
                'delay * 2 exponential backoff'
              ]
            },
            {
              id: 'js-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'CORS & Preflight Requests',
              question: 'Explain Cross-Origin Resource Sharing (CORS). What is an HTTP "Preflight Request" (`OPTIONS`), and what request headers trigger browsers to send a preflight request before the actual request?',
              markingBreakdown: [
                'CORS definition: 1.5 Marks',
                'OPTIONS preflight explanation: 2 Marks',
                'Trigger conditions (custom headers, PUT/DELETE/PATCH, application/json): 1.5 Marks'
              ],
              modelSolution: `CORS is a browser security mechanism that restricts web pages from making cross-origin HTTP requests to a domain different from the domain serving the web page.

Preflight Request (OPTIONS):
Before executing a "non-simple" cross-origin request, the browser automatically sends an HTTP \`OPTIONS\` request to ask the server if the cross-origin method is permitted.

Trigger Conditions:
1. HTTP methods other than GET, HEAD, or POST (e.g. PUT, DELETE, PATCH).
2. Content-Type header set to anything other than \`text/plain\`, \`multipart/form-data\`, or \`application/x-www-form-urlencoded\` (e.g. \`application/json\`).
3. Any custom headers (e.g. \`Authorization\`, \`X-API-Key\`).`,
              notebookCheckpoints: [
                'OPTIONS method',
                'Triggers: application/json, PUT/DELETE, Authorization headers'
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
              id: 'js-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Virtual DOM & Diffing Reconciliation Engine',
              question: 'Construct a lightweight Virtual DOM (VDOM) rendering engine in JavaScript:\n(a) `h(tag, props, ...children)` function that creates VNode virtual element objects.\n(b) `mount(vnode, container)` that converts a VNode into a real DOM node and mounts it.\n(c) `diff(oldVNode, newVNode)` that compares two VNodes and applies patches (tag change, props diff, children reconciliation).\n(d) Explain why VDOM batching minimizes browser layout reflows and repaints.',
              markingBreakdown: [
                'h() hyperscript VNode builder: 2.5 Marks',
                'mount() real DOM generator: 2.5 Marks',
                'diff() tree comparison and DOM patching: 3.5 Marks',
                'Browser layout reflow optimization explanation: 1.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
function h(tag, props, ...children) {
    return { tag, props: props || {}, children: children.flat() };
}

function mount(vnode, container) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        const el = document.createTextNode(vnode);
        container.appendChild(el);
        return el;
    }

    const el = document.createElement(vnode.tag);
    vnode.el = el; // Store reference to real DOM

    // Set attributes
    for (const [key, val] of Object.entries(vnode.props)) {
        if (key.startsWith('on')) {
            el.addEventListener(key.slice(2).toLowerCase(), val);
        } else {
            el.setAttribute(key, val);
        }
    }

    // Mount children recursively
    vnode.children.forEach(child => mount(child, el));
    container.appendChild(el);
    return el;
}

function diff(oldVNode, newVNode) {
    const el = (newVNode.el = oldVNode.el);

    // 1. Tag changed -> replace entire element
    if (oldVNode.tag !== newVNode.tag) {
        const newEl = mount(newVNode, el.parentNode);
        el.parentNode.replaceChild(newEl, el);
        return;
    }

    // 2. Diff props
    // ... update changed attributes ...

    // 3. Diff children
    const commonLength = Math.min(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < commonLength; i++) {
        diff(oldVNode.children[i], newVNode.children[i]);
    }
}
\`\`\`
Reflow Optimization:
Directly mutating the live DOM in loops causes repeated expensive Layout Reflows (geometry calculations) and Repaints. VDOM calculates all differences in lightweight JavaScript memory and updates only the changed DOM nodes in a single batch.`,
              notebookCheckpoints: [
                'h() returns {tag, props, children}',
                'mount() handles strings and elements',
                'Explain layout reflow batching'
              ]
            },
            {
              id: 'js-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Single Page Application (SPA) Client-Side Router',
              question: 'Implement a complete Client-Side Router for a Single Page Application using the HTML5 History API (`pushState`, `popstate`):\n(a) Register path routes with view rendering callbacks.\n(b) Method `navigate(url)` updating browser URL without reloading page.\n(c) Listen to `popstate` events to support browser Forward and Back buttons.\n(d) Support parameterized routes (e.g. `/users/:id`) by compiling paths into regular expressions.',
              markingBreakdown: [
                'HTML5 pushState and popstate handling: 3 Marks',
                'Parameterized route regex compilation: 4 Marks',
                'Route matching and view rendering: 3 Marks'
              ],
              modelSolution: `\`\`\`javascript
class Router {
    constructor() {
        this.routes = [];
        window.addEventListener('popstate', () => this.resolve());
    }

    add(path, handler) {
        // Compile /users/:id to regex and extract parameter names
        const paramNames = [];
        const regexPath = path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        this.routes.push({
            regex: new RegExp(\`^\${regexPath}$\`),
            paramNames,
            handler
        });
    }

    navigate(url) {
        window.history.pushState(null, '', url);
        this.resolve();
    }

    resolve() {
        const currentPath = window.location.pathname;
        for (const route of this.routes) {
            const match = currentPath.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, i) => {
                    params[name] = match[i + 1];
                });
                route.handler(params);
                return;
            }
        }
        console.warn("404 Route not found:", currentPath);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'window.history.pushState',
                'popstate event listener for back/forward buttons',
                'Regex compilation for :id parameters'
              ]
            },
            {
              id: 'js-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Security Engineering: XSS, CSRF & Content Security Policy',
              question: 'Analyze top web application security vulnerabilities in JavaScript:\n(a) Differentiate between Reflected XSS, Stored XSS, and DOM-based XSS with code examples.\n(b) Explain how Cross-Site Request Forgery (CSRF) exploits ambient browser cookie credentials and how `SameSite=Strict` cookies mitigate it.\n(c) Explain how Content Security Policy (CSP) headers like `script-src \'self\'` defend against unauthorized script injection.\n(d) Write a sanitization function in JavaScript that escapes untrusted user input before inserting it into innerHTML.',
              markingBreakdown: [
                'XSS varieties explanation and examples: 3.5 Marks',
                'CSRF mechanics and SameSite cookies: 2.5 Marks',
                'Content Security Policy (CSP) headers: 2 Marks',
                'HTML entity escape sanitization function: 2 Marks'
              ],
              modelSolution: `(a) XSS Categories:
1. Reflected XSS: User input from a query string is immediately echoed into the response HTML without escaping.
2. Stored XSS: Malicious script payload is stored permanently in the database (e.g. comment field) and served to all future visitors.
3. DOM-based XSS: Malicious payload is processed purely in client JavaScript without server involvement (e.g. \`document.write(location.hash)\`).

(b) CSRF:
An attacker tricks a logged-in user\'s browser into issuing a POST request to \`bank.com/transfer\` from an evil website. The browser automatically attaches authentication session cookies.
Mitigation: Set cookies with \`SameSite=Strict\` or \`SameSite=Lax\`, which prevents browsers from attaching cookies to cross-site requests, and use anti-CSRF challenge tokens.

(c) Content Security Policy (CSP):
HTTP header \`Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;\` instructs the browser to refuse execution of inline \`<script>\` tags and blocks loading scripts from unapproved domains.

\`\`\`javascript
// (d) Input Sanitization Function
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
\`\`\``,
              notebookCheckpoints: [
                'Reflected, Stored, and DOM XSS distinctions',
                'SameSite=Strict cookie attribute',
                'Content-Security-Policy header rules',
                'escapeHTML function'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-104-JS-S3',
      title: 'Advanced JavaScript Engines, Concurrency & Compilers Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-104-JS',
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
              id: 'js-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'V8 JIT Compilers',
              question: 'Name the baseline bytecode interpreter and the optimizing JIT compiler in the V8 engine.',
              markingBreakdown: ['Ignition (interpreter) and TurboFan (optimizing compiler): 1 Mark'],
              modelSolution: 'Ignition is the bytecode interpreter; TurboFan is the optimizing JIT compiler.',
              notebookCheckpoints: ['Ignition and TurboFan']
            },
            {
              id: 'js-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Atomics & SharedArrayBuffer',
              question: 'Why must `Atomics.wait()` and `Atomics.notify()` be used on `SharedArrayBuffer` when coordinating Web Workers?',
              markingBreakdown: ['Prevents race conditions and provides thread synchronization without busy-waiting: 1 Mark'],
              modelSolution: '`SharedArrayBuffer` allows true memory sharing between Web Workers. `Atomics` provides hardware atomic operations (CAS, add) and thread sleep/wake primitives (`wait`/`notify`) to prevent race conditions.',
              notebookCheckpoints: ['Prevents race conditions across shared memory workers']
            },
            {
              id: 'js-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'WeakRef & FinalizationRegistry',
              question: 'What does `FinalizationRegistry` do in modern ECMAScript?',
              markingBreakdown: ['Registers a cleanup callback when a target object is garbage collected: 1 Mark'],
              modelSolution: 'It allows registering a callback that executes after a target object has been reclaimed by the garbage collector.',
              notebookCheckpoints: ['Post-GC cleanup callback']
            },
            {
              id: 'js-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Proxy Revocation',
              question: 'What is `Proxy.revocable()` used for in security-sensitive contexts?',
              markingBreakdown: ['Creates a proxy that can be disabled permanently via revoke(): 1 Mark'],
              modelSolution: '`Proxy.revocable()` creates a proxy along with a `revoke()` function. Calling `revoke()` disables the proxy permanently, causing any further access to throw a `TypeError`.',
              notebookCheckpoints: ['revoke() disables proxy access']
            },
            {
              id: 'js-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Tail Call Optimization (TCO)',
              question: 'What is Proper Tail Call (PTC) optimization in ES6?',
              markingBreakdown: ['Reuses stack frame for recursive calls in tail position: 1 Mark'],
              modelSolution: 'If a function call is the very last operation executed before return, the engine reuses the current stack frame instead of pushing a new frame, avoiding stack overflow.',
              notebookCheckpoints: ['Reuses current stack frame']
            },
            {
              id: 'js-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Symbol.toPrimitive',
              question: 'What does the well-known symbol `Symbol.toPrimitive` customize?',
              markingBreakdown: ['Controls type conversion when object is converted to a primitive: 1 Mark'],
              modelSolution: 'It customizes how an object is coerced into a corresponding primitive value depending on the preferred type hint (`"number"`, `"string"`, or `"default"`).',
              notebookCheckpoints: ['Customizes object-to-primitive coercion']
            },
            {
              id: 'js-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Tree Shaking Mechanism',
              question: 'Why can bundlers like Rollup and Webpack tree-shake ES Modules but cannot easily tree-shake CommonJS `require()`?',
              markingBreakdown: ['ESM is static; CommonJS is dynamic runtime: 1 Mark'],
              modelSolution: 'ES Modules have a static structure determined before evaluation, allowing bundlers to analyze unused exports at build time. CommonJS allows conditional dynamic `require(\'./module_\' + name)` which cannot be statically resolved.',
              notebookCheckpoints: ['Static structure in ESM']
            },
            {
              id: 'js-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'RegExp Sticky Flag (/y)',
              question: 'What does the sticky flag (`/y`) enforce during regular expression matching?',
              markingBreakdown: ['Matches only at the exact index specified by lastIndex: 1 Mark'],
              modelSolution: 'The sticky flag `/y` requires that the pattern match starting exactly at `regex.lastIndex`, rather than searching forward through subsequent characters.',
              notebookCheckpoints: ['Matches only at exact lastIndex']
            },
            {
              id: 'js-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'TypedArray Buffers',
              question: 'Differentiate between an `ArrayBuffer` and a `Uint8Array` in JavaScript.',
              markingBreakdown: ['ArrayBuffer is raw bytes; TypedArray is a typed view interpreting those bytes: 1 Mark'],
              modelSolution: 'An `ArrayBuffer` is a generic, fixed-length raw binary data buffer. A `Uint8Array` is a typed view that interprets those raw bytes as unsigned 8-bit integers.',
              notebookCheckpoints: ['ArrayBuffer is raw bytes; Uint8Array is a view']
            },
            {
              id: 'js-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Top-Level await',
              question: 'In which environment is top-level `await` valid in JavaScript?',
              markingBreakdown: ['Only inside ES Modules (.mjs or type="module"): 1 Mark'],
              modelSolution: 'Top-level `await` is valid only at the top level of ES Modules (`type="module"`), not inside CommonJS files or standard scripts.',
              notebookCheckpoints: ['Only in ES Modules']
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
              id: 'js-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Async Generators & For-Await-Of',
              question: 'Implement an asynchronous generator `async function* paginatedFetch(apiUrl)` that fetches paginated API pages until the server returns an empty list. Demonstrate consumption using `for await (... of ...)`.',
              markingBreakdown: [
                'async function* generator structure: 3 Marks',
                'for await of iteration: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
async function* paginatedFetch(baseUrl) {
    let page = 1;
    while (true) {
        const res = await fetch(\`\${baseUrl}?page=\${page}\`);
        const data = await res.json();
        if (!data || data.length === 0) break;
        yield data; // Yields entire page array
        page++;
    }
}

// Consumption
async function displayAll() {
    for await (const pageItems of paginatedFetch("https://api.example.com/items")) {
        console.log("Received page:", pageItems);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'async function* syntax',
                'for await (const x of generator())'
              ]
            },
            {
              id: 'js-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'V8 Garbage Collection: Scavenger vs Mark-Sweep-Compact',
              question: 'Examine V8\'s generational Garbage Collector:\n(a) Explain how the "Scavenger" (Cheney\'s algorithm) reclaims short-lived objects in the Young Generation (Semi-spaces: From-Space and To-Space).\n(b) Explain the three phases of the Major GC (Mark-Sweep-Compact) in the Old Generation.',
              markingBreakdown: [
                'Scavenger Semi-space copy explanation: 2.5 Marks',
                'Mark-Sweep-Compact phases: 2.5 Marks'
              ],
              modelSolution: `(a) Scavenger (Young Generation):
Memory is split into two halves: From-Space and To-Space.
Allocation happens in From-Space. During GC, live reachable objects are copied into To-Space, while dead objects are abandoned. The spaces then swap roles. Objects that survive multiple scavenges are promoted to the Old Generation.

(b) Major GC (Old Generation):
1. Marking: Roots (stack, globals) are traversed to mark all reachable live objects.
2. Sweeping: Memory blocks of unmarked (dead) objects are added to free-lists.
3. Compaction: Fragmented live objects are slid toward the beginning of memory pages to eliminate memory fragmentation.`,
              notebookCheckpoints: [
                'Semi-spaces: From-Space and To-Space',
                'Marking, Sweeping, Compacting'
              ]
            },
            {
              id: 'js-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Async Task Pool (Concurrency Limiter)',
              question: 'Implement a concurrency-limited task runner `pLimit(concurrency)` in JavaScript that accepts an array of asynchronous factory tasks and executes them with at most $K$ concurrent tasks running simultaneously.',
              markingBreakdown: [
                'Queue management for pending tasks: 3 Marks',
                'Active worker count management: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
function pLimit(concurrency) {
    const queue = [];
    let activeCount = 0;

    const next = () => {
        if (activeCount < concurrency && queue.length > 0) {
            activeCount++;
            const { fn, resolve, reject } = queue.shift();
            fn().then(resolve)
                .catch(reject)
                .finally(() => {
                    activeCount--;
                    next();
                });
        }
    };

    return function run(fn) {
        return new Promise((resolve, reject) => {
            queue.push({ fn, resolve, reject });
            next();
        });
    };
}
\`\`\``,
              notebookCheckpoints: [
                'activeCount tracking',
                'finally(() => { activeCount--; next(); })'
              ]
            },
            {
              id: 'js-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Custom Transpiler Plugin (Babel / AST)',
              question: 'Explain how AST visitor patterns work in compilers like Babel. Write a visitor transform function that replaces all instances of `console.log(...)` with a no-op or removes them entirely during production builds.',
              markingBreakdown: [
                'AST visitor structure: 2.5 Marks',
                'CallExpression replacement/removal: 2.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
// Babel plugin visitor pattern
module.exports = function({ types: t }) {
    return {
        visitor: {
            CallExpression(path) {
                const callee = path.node.callee;
                if (
                    t.isMemberExpression(callee) &&
                    t.isIdentifier(callee.object, { name: 'console' }) &&
                    t.isIdentifier(callee.property, { name: 'log' })
                ) {
                    path.remove(); // Strip out console.log in production build
                }
            }
        }
    };
};
\`\`\``,
              notebookCheckpoints: [
                'CallExpression visitor hook',
                'path.remove() to strip instruction'
              ]
            },
            {
              id: 'js-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'SharedArrayBuffer & Atomics Mutex Lock',
              question: 'Using `SharedArrayBuffer` and `Atomics.compareExchange()`, write an atomic spin-lock in JavaScript that synchronizes critical sections between Web Workers.',
              markingBreakdown: [
                'Lock initialization with Int32Array: 2 Marks',
                'lock() using compareExchange: 1.5 Marks',
                'unlock() using store: 1.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
class AtomicMutex {
    constructor(sharedBuffer, offset = 0) {
        this.lockArray = new Int32Array(sharedBuffer, offset, 1);
    }

    lock() {
        // Spin until we successfully swap 0 (unlocked) to 1 (locked)
        while (Atomics.compareExchange(this.lockArray, 0, 0, 1) !== 0) {
            // Wait for notification if supported
            Atomics.wait(this.lockArray, 0, 1, 50);
        }
    }

    unlock() {
        Atomics.store(this.lockArray, 0, 0); // Release lock
        Atomics.notify(this.lockArray, 0, 1); // Wake waiting worker
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Atomics.compareExchange(arr, 0, 0, 1)',
                'Atomics.wait and Atomics.notify'
              ]
            },
            {
              id: 'js-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Prototype Pollution Vulnerability',
              question: 'Explain what a Prototype Pollution attack is in JavaScript. Write a code example showing how recursive object merging can pollute `Object.prototype`, and show how to defend against it using `Object.create(null)` or key validation.',
              markingBreakdown: [
                'Prototype pollution explanation: 2 Marks',
                'Vulnerable merge function: 1.5 Marks',
                'Remediation: 1.5 Marks'
              ],
              modelSolution: `Prototype pollution occurs when an attacker injects properties into \`Object.prototype\` via user input (e.g. JSON payload containing \`"__proto__"\` or \`"constructor.prototype"\`), modifying property lookups across all objects in the runtime.

\`\`\`javascript
// Defense: Validate keys during recursive merge
function safeMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue; // Reject dangerous prototype keys
        }
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) target[key] = {};
            safeMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
\`\`\``,
              notebookCheckpoints: [
                'Explain how __proto__ pollutes all objects',
                'Reject keys: __proto__, constructor, prototype'
              ]
            },
            {
              id: 'js-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Bytecode De-optimization (Bailout) Tracing',
              question: 'In V8, what causes an optimized function compiled by TurboFan to "De-optimize" (bailout back to Ignition bytecode)? Give two specific code patterns that trigger de-optimization.',
              markingBreakdown: [
                'De-optimization concept explanation: 2 Marks',
                'Two code patterns (shape changes, argument type changes): 3 Marks'
              ],
              modelSolution: `TurboFan compiles functions into fast machine code based on type feedback assumptions collected by Ignition. If an assumption is violated at runtime, V8 bails out and de-optimizes back to bytecode.

Triggers:
1. Polymorphic Arguments: If \`add(a, b)\` was optimized assuming both are integers, calling \`add("hello", 42)\` violates the type assumption and forces instant de-optimization.
2. Hidden Class Violations: Deleting an object property (\`delete obj.prop\`) changes its internal memory map to a dictionary representation, breaking TurboFan\'s fast inline field access.`,
              notebookCheckpoints: [
                'TurboFan bailout to Ignition',
                'Type change (int to string)',
                'Property deletion breaking shape'
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
              id: 'js-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Architecture: Building a Custom Webpack / Module Bundler',
              question: 'Design a miniature JavaScript Module Bundler (Mini-Pack):\n(a) Dependency Graph generator starting from an entry file.\n(b) Parsing `import` statements using Regex or AST into dependency paths.\n(c) Assign unique numeric IDs to modules and wrap each module in a common execution closure `(require, module, exports)`.\n(d) Generate the single-file bundled output string.\n(e) Draw the module dependency DAG for a 3-file application.',
              markingBreakdown: [
                'Dependency graph construction: 3 Marks',
                'Module closure wrapping (function(require, module, exports)): 3 Marks',
                'Runtime bundle bootstrap loader: 2.5 Marks',
                'DAG diagram: 1.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
const fs = require('fs');

function createAsset(filename, id) {
    const content = fs.readFileSync(filename, 'utf-8');
    // Extract imports
    const dependencies = [];
    const importRegex = /import\\s+.*\\s+from\\s+['"](.*)['"]/g;
    let match;
    while ((match = importRegex.exec(content))) {
        dependencies.push(match[1]);
    }
    return { id, filename, dependencies, code: content };
}

function bundle(graph) {
    let modules = '';
    graph.forEach(mod => {
        modules += \`\${mod.id}: [
            function(require, module, exports) {
                \${mod.code}
            },
            \${JSON.stringify(mod.mapping)}
        ],\\n\`;
    });

    return \`(function(modules) {
        function require(id) {
            const [fn, mapping] = modules[id];
            function localRequire(relativePath) {
                return require(mapping[relativePath]);
            }
            const module = { exports: {} };
            fn(localRequire, module, module.exports);
            return module.exports;
        }
        require(0); // Run entry
    })({ \${modules} });\`;
}
\`\`\`
Dependency DAG:
[entry.js (ID 0)]
   ├──> [math.js (ID 1)]
   └──> [logger.js (ID 2)] ──> [format.js (ID 3)]`,
              notebookCheckpoints: [
                'Module wrapper: function(require, module, exports)',
                'Runtime bootstrap IIFE',
                'Draw DAG graph in notebook'
              ]
            },
            {
              id: 'js-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Full Implementation of Promises/A+ Specification',
              question: 'Implement a complete, spec-compliant `MyPromise` class conforming to Promises/A+:\n(a) Internal state management (`PENDING`, `FULFILLED`, `REJECTED`).\n(b) Execution of chained `.then(onFulfilled, onRejected)` callbacks asynchronously via `queueMicrotask`.\n(c) Full Promise Resolution Procedure (`resolvePromise(promise2, x, resolve, reject)`).\n(d) Chaining and returning new promises.\n(e) Catch and finally handlers.',
              markingBreakdown: [
                'State transitions and constructor executor: 2.5 Marks',
                '.then chaining with queueMicrotask: 3 Marks',
                'resolvePromise handling thenables / chained promises: 3 Marks',
                'catch and finally implementations: 1.5 Marks'
              ],
              modelSolution: `\`\`\`javascript
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.handlers = [];

        const resolve = (val) => {
            if (this.state !== PENDING) return;
            this.state = FULFILLED;
            this.value = val;
            this.handlers.forEach(h => this._runHandler(h));
        };

        const reject = (reason) => {
            if (this.state !== PENDING) return;
            this.state = REJECTED;
            this.value = reason;
            this.handlers.forEach(h => this._runHandler(h));
        };

        try { executor(resolve, reject); }
        catch (err) { reject(err); }
    }

    _runHandler(handler) {
        queueMicrotask(() => {
            const cb = this.state === FULFILLED ? handler.onFulfilled : handler.onRejected;
            if (!cb) {
                (this.state === FULFILLED ? handler.resolve : handler.reject)(this.value);
                return;
            }
            try {
                const res = cb(this.value);
                handler.resolve(res);
            } catch (e) {
                handler.reject(e);
            }
        });
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handler = {
                onFulfilled: typeof onFulfilled === 'function' ? onFulfilled : null,
                onRejected: typeof onRejected === 'function' ? onRejected : null,
                resolve,
                reject
            };
            if (this.state === PENDING) {
                this.handlers.push(handler);
            } else {
                this._runHandler(handler);
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'queueMicrotask for asynchronous execution',
                'Return new MyPromise from .then',
                'Immutable state transitions once settled'
              ]
            },
            {
              id: 'js-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: WASM (WebAssembly) Bridge & High-Performance Interop',
              question: 'Investigate WebAssembly (WASM) and JavaScript Interoperability:\n(a) Explain why WASM executes near-native machine speed compared to V8 JIT.\n(b) Write JavaScript code that fetches and compiles a `.wasm` binary using `WebAssembly.instantiateStreaming`.\n(c) Demonstrate bi-directional data transfer between JS and WASM linear memory (`WebAssembly.Memory`) using `Uint8Array`.\n(d) Explain memory management across the JS-WASM boundary (freeing C/Rust-allocated memory from JS).',
              markingBreakdown: [
                'WASM performance architecture explanation: 2.5 Marks',
                'WebAssembly.instantiateStreaming code: 2.5 Marks',
                'Linear memory buffer reading/writing: 3 Marks',
                'Cross-boundary memory ownership & deallocation: 2 Marks'
              ],
              modelSolution: `\`\`\`javascript
async function loadWasmModule() {
    // 1. Shared linear memory
    const memory = new WebAssembly.Memory({ initial: 2, maximum: 10 }); // pages (64KB each)

    const importObject = {
        env: {
            memory,
            log_int: (val) => console.log("WASM invoked JS:", val)
        }
    };

    // 2. Compile and instantiate in a single streaming pass
    const { instance } = await WebAssembly.instantiateStreaming(
        fetch('engine.wasm'),
        importObject
    );

    // 3. Write data to WASM Linear Memory from JS
    const memView = new Uint8Array(memory.buffer);
    const inputString = "Hello WASM";
    const encoder = new TextEncoder();
    const encoded = encoder.encode(inputString);
    memView.set(encoded, 0); // Write at memory offset 0

    // 4. Call WASM native exported function
    const resultLen = instance.exports.process_data(0, encoded.length);
    console.log("Processed byte length:", resultLen);
}
\`\`\`
WASM Performance Advantages:
1. Compact Binary Format: Skips JavaScript parsing and AST tokenization phases.
2. Predictable Performance: Statically typed integer/float assembly instructions execute directly without V8 de-optimization or bailouts.
3. Linear Memory: Manual memory layout without garbage collection pauses.`,
              notebookCheckpoints: [
                'WebAssembly.instantiateStreaming',
                'new Uint8Array(memory.buffer)',
                'Explain absence of JIT de-optimizations and GC pauses'
              ]
            }
          ]
        }
      }
    }
  }
};
