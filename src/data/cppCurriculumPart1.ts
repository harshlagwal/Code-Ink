import { Chapter } from '../types/notebook';

export const CPP_CHAPTERS_PART1: Chapter[] = [
  // CHAPTER 01 — FOUNDATIONS
  {
    id: 'cpp-ch01',
    number: 1,
    title: 'C++ Foundations & Architecture',
    description: 'Bjarne Stroustrup origins, zero-cost abstractions, compilation pipeline, and std namespace',
    topics: [
      {
        id: 'cpp-foundations',
        subjectId: 'cpp',
        chapterId: 'cpp-ch01',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'What is C++? Architecture & Zero-Cost Abstractions',
        difficulty: 'beginner',
        definition: 'C++ is a high-performance, statically-typed, multi-paradigm compiled programming language designed by Bjarne Stroustrup as an extension of C with zero-cost abstractions.',
        whyItMatters: 'C++ is the backbone of game engines (Unreal), operating systems, web browser rendering engines (Chromium/V8), financial high-frequency trading (HFT), and embedded robotics.',
        syntax: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, CODEINK C++\\n";\n    return 0;\n}',
        explanation: [
          'Created in 1979 at Bell Labs by Bjarne Stroustrup initially as "C with Classes", standardized by ISO in 1998 (C++98) through modern C++20 and C++23.',
          'Zero-Cost Abstraction Principle: What you don\'t use, you don\'t pay for. What you do use, you couldn\'t hand-code any better in raw assembly.',
          'Compilation Pipeline: Preprocessor -> Compiler (AST to Assembly) -> Assembler (Machine code .o) -> Linker (Resolves references and symbols into executable binary).',
          'Standard Namespace `std`: Standard library identifiers (cout, cin, vector, string) live within namespace `std` to prevent global identifier collisions.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>

// Standard ISO C++ entry point
int main() {
    // std::cout stream output operator <<
    std::cout << "CODEINK C++ Systems Architecture" << std::endl;
    std::cout << "Standard ISO Version: " << __cplusplus << std::endl;
    return 0; // Exit code 0 indicates success
}`,
          output: 'CODEINK C++ Systems Architecture\nStandard ISO Version: 202002',
          annotations: [
            { line: 1, label: 'Standard stream header inclusion', type: 'blue' },
            { line: 6, label: 'std::cout buffered output stream', type: 'yellow' },
            { line: 7, label: '__cplusplus compiler standard macro', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'C++ Translation Pipeline',
          subtitle: 'From Human C++ Source Code to Bare-Metal Silicon Instructions',
          elements: [
            { id: '1', label: 'Source File', sublabel: 'main.cpp', value: 'High-Level C++', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Preprocessor', sublabel: '#include, #define', value: 'main.i', status: 'active', arrowTo: '3' },
            { id: '3', label: 'C++ Compiler', sublabel: 'g++ / clang++', value: 'Assembly .s', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Linker + libstdc++', sublabel: 'ld', value: 'Native Binary ELF/PE', status: 'referenced' }
          ]
        },
        important: 'Never write `using namespace std;` in header files (.h / .hpp)! Doing so forces every file that includes your header to pollute its global namespace.',
        commonMistakes: [
          'Using `using namespace std;` in header files causing identifier collisions.',
          'Omitting `#include <iostream>` when attempting to use `std::cout` or `std::cin`.'
        ],
        tip: 'Prefer `\\n` over `std::endl` for newline output. `std::endl` forces an explicit buffer flush on every line, which degrades console I/O throughput in tight loops.',
        interviewNote: 'Question: "What is Bjarne Stroustrup\'s zero-cost abstraction principle?" Answer: "No runtime overhead is incurred for abstractions you do not use, and compiler-generated abstraction code is as efficient as hand-crafted assembly."',
        practiceQuestions: [
          {
            id: 'q-cpp1-1',
            type: 'mcq',
            question: 'Why is `std::endl` generally slower than `\'\\n\'` for printing newlines?',
            options: [
              'std::endl allocates dynamic memory on the heap',
              'std::endl forces an explicit stream buffer flush on every call',
              'std::endl converts characters to UTF-16',
              'std::endl requires a separate CPU thread'
            ],
            correctIndex: 1,
            explanation: 'std::endl inserts a newline character AND explicitly invokes `stream.flush()`, forcing expensive operating system write syscalls.'
          }
        ],
        relatedTopics: ['cpp-variables', 'cpp-io', 'cpp-classes']
      }
    ]
  },

  // CHAPTER 02 — VARIABLES & DATA TYPES
  {
    id: 'cpp-ch02',
    number: 2,
    title: 'Variables & Data Types',
    description: 'Fundamental scalar types, auto type deduction, sizeof, type modifiers, and uniform initialization',
    topics: [
      {
        id: 'cpp-variables',
        subjectId: 'cpp',
        chapterId: 'cpp-ch02',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'Fundamental Types, auto & Uniform Initialization',
        difficulty: 'beginner',
        definition: 'C++ is statically typed. Every variable has a compile-time fixed type and storage size. Modern C++ introduces `auto` for automatic type deduction and uniform brace initialization `{}`.',
        whyItMatters: 'Using uniform brace initialization prevents accidental narrowing conversions (e.g. silently truncating a float into an int), eliminating a major class of memory bugs.',
        syntax: 'int count{0};           // Uniform brace initialization\nauto speed = 299792.458; // auto deduced as double',
        explanation: [
          'Fundamental scalar types: `bool` (1 byte), `char` (1 byte), `int` (typically 4 bytes), `float` (4 bytes IEEE 754), `double` (8 bytes).',
          'Modifiers: `signed`, `unsigned`, `short`, `long`, `long long` configure bit-width and sign representation.',
          '`auto` keyword (C++11): The compiler deduces the exact type from the initialization expression at compile time with zero runtime cost.',
          'Uniform Initialization `{}`: Prevents narrowing conversions (`int x{3.14}` causes a compiler error, whereas `int x = 3.14` silently truncates).'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>

int main() {
    // Uniform brace initialization (safe from narrowing)
    int players{4};
    double latency_ms{14.25};
    bool is_active{true};

    // Modern C++ compile-time type deduction
    auto throughput = 1000000000ULL; // Deduced as unsigned long long

    std::cout << "int size: " << sizeof(players) << " bytes\\n";
    std::cout << "double size: " << sizeof(latency_ms) << " bytes\\n";
    std::cout << "auto deduced size: " << sizeof(throughput) << " bytes\\n";
    return 0;
}`,
          output: 'int size: 4 bytes\ndouble size: 8 bytes\nauto deduced size: 8 bytes',
          annotations: [
            { line: 5, label: 'Brace initialization prevents silent truncation', type: 'blue' },
            { line: 10, label: 'Compile-time deduction with ULL literal suffix', type: 'green' }
          ]
        },
        important: 'Always initialize your variables! Uninitialized local primitive variables in C++ contain arbitrary "garbage" memory leftover from previous stack frames.',
        commonMistakes: [
          'Reading from uninitialized variables: `int x; std::cout << x;` invokes undefined behavior (UB).',
          'Confusing `auto` with dynamic typing. `auto` in C++ is strictly compile-time static type deduction.'
        ],
        tip: 'Use `nullptr` instead of `NULL` or `0` for pointer nullity in modern C++. `nullptr` is strongly typed (`std::nullptr_t`) and avoids integer overload ambiguity.',
        interviewNote: 'Question: "What is the difference between `auto` in C++ vs dynamic typing in Python?" Answer: "In C++, `auto` deduces the type at compile-time; the variable has a single fixed static type forever. In Python, variables are dynamically bound references to heap objects at runtime."',
        practiceQuestions: [
          {
            id: 'q-cpp2-1',
            type: 'mcq',
            question: 'What happens when compiling `int x{3.99};` in modern C++?',
            options: [
              'x is set to 4 (rounded up)',
              'x is set to 3 (silently truncated)',
              'Compilation error due to narrowing conversion rejection in brace initialization',
              'Runtime exception'
            ],
            correctIndex: 2,
            explanation: 'Uniform brace initialization `{}` strictly forbids narrowing conversions (converting float to int) and triggers a compile-time error.'
          }
        ],
        relatedTopics: ['cpp-foundations', 'cpp-operators', 'cpp-pointers']
      }
    ]
  },

  // CHAPTER 03 — INPUT & OUTPUT
  {
    id: 'cpp-ch03',
    number: 3,
    title: 'Input & Output Streams',
    description: 'std::cin, std::cout, std::cerr, std::clog, stream buffering, and std::getline()',
    topics: [
      {
        id: 'cpp-io',
        subjectId: 'cpp',
        chapterId: 'cpp-ch03',
        chapterNumber: 3,
        pageNumber: 3,
        title: 'Streams: std::cin, std::cout, std::cerr & getline()',
        difficulty: 'beginner',
        definition: 'C++ handles console I/O through typed streams declared in `<iostream>`. `std::cin` is buffered input; `std::cout` is buffered output; `std::cerr` is unbuffered error output.',
        whyItMatters: 'Using `std::cin >> var` stops reading at whitespace. For full sentences or multi-word inputs, `std::getline(std::cin, str)` is essential to prevent truncated input.',
        syntax: 'std::getline(std::cin, str_var);',
        explanation: [
          '`std::cout << val`: Stream insertion operator `<<` chains values and formats them by type automatically.',
          '`std::cin >> val`: Stream extraction operator `>>` reads whitespace-delimited tokens.',
          '`std::cerr`: Unbuffered output stream directly for errors; flushes immediately so crash diagnostics are not lost.',
          '`std::getline(std::cin, str)`: Reads entire line including spaces up to the newline delimiter.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <string>

int main() {
    int port{8080};
    std::string server_name{"Production Node"};

    // Chained typed stream output
    std::cout << "Server: " << server_name << " | Port: " << port << "\\n";

    // Error stream (unbuffered diagnostic)
    std::cerr << "[DIAGNOSTIC] Log channel ready.\\n";
    return 0;
}`,
          output: 'Server: Production Node | Port: 8080\n[DIAGNOSTIC] Log channel ready.',
          annotations: [
            { line: 9, label: 'Chained type-safe stream output', type: 'blue' },
            { line: 12, label: 'std::cerr bypasses buffer for critical errors', type: 'yellow' }
          ]
        },
        important: 'Mixing `std::cin >> x` followed by `std::getline(std::cin, s)` causes `getline()` to read the remaining leftover newline character `\\n`! Consume the newline with `std::cin.ignore()` first.',
        commonMistakes: [
          'Not calling `std::cin.ignore()` between `std::cin >> num` and `std::getline()`.',
          'Using `std::endl` inside high-speed competitive programming loops.'
        ],
        tip: 'In competitive programming, add `std::ios_base::sync_with_stdio(false); std::cin.tie(NULL);` to make C++ streams as fast as C `scanf`/`printf`.',
        interviewNote: 'Question: "Why is std::cerr unbuffered while std::cout is buffered?" Answer: "If a program crashes or encounters a fatal segfault, buffered output in std::cout might never be flushed to screen. std::cerr flushes immediately to guarantee error visibility."',
        practiceQuestions: [
          {
            id: 'q-cpp3-1',
            type: 'mcq',
            question: 'Which stream should be used to output critical crash reports that must not be delayed by buffer caching?',
            options: ['std::cout', 'std::cin', 'std::cerr', 'std::clog'],
            correctIndex: 2,
            explanation: '`std::cerr` is unbuffered, ensuring error output is immediately transmitted to the console without waiting for a buffer flush.'
          }
        ],
        relatedTopics: ['cpp-variables', 'cpp-arrays-strings']
      }
    ]
  },

  // CHAPTER 04 — OPERATORS
  {
    id: 'cpp-ch04',
    number: 4,
    title: 'Operators & Expressions',
    description: 'Arithmetic, logical, bitwise, scope resolution (::), ternary, and operator precedence',
    topics: [
      {
        id: 'cpp-operators',
        subjectId: 'cpp',
        chapterId: 'cpp-ch04',
        chapterNumber: 4,
        pageNumber: 4,
        title: 'Operators: Scope Resolution (::), Bitwise & Precedence',
        difficulty: 'beginner',
        definition: 'Operators perform computations on operands. The Scope Resolution operator `::` qualifies namespaces, class members, and accesses shadowed global variables.',
        whyItMatters: 'Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) allow direct hardware register manipulation, flags packing, and low-level performance optimization.',
        syntax: '::global_var     // Accesses shadowed global identifier\nClass::static_member',
        explanation: [
          'Scope Resolution `::`: Resolves ambiguities between local, class, namespace, and global scopes.',
          'Integer division: In C++, dividing two integers truncates towards zero (`7 / 2 == 3`). Cast to float or double for fractional results.',
          'Prefix vs Postfix: Prefix `++i` increments in-place and returns an lvalue reference; postfix `i++` creates a temporary copy of the old value first.',
          'Short-Circuit evaluation: In `a && b`, if `a` is false, `b` is never evaluated. In `a || b`, if `a` is true, `b` is never evaluated.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>

int counter = 100; // Global variable

int main() {
    int counter = 5; // Local variable shadows global

    std::cout << "Local counter: " << counter << "\\n";
    std::cout << "Global counter (via ::): " << ::counter << "\\n";

    // Bitwise flag packing
    unsigned char flags = 0b00000001; // Flag A set
    flags |= 0b00000100;              // Set Flag C via bitwise OR
    std::cout << "Bitwise Flags: " << (int)flags << "\\n";
    return 0;
}`,
          output: 'Local counter: 5\nGlobal counter (via ::): 100\nBitwise Flags: 5',
          annotations: [
            { line: 9, label: 'Unary :: accesses shadowed global variable', type: 'blue' },
            { line: 13, label: 'Bitwise OR |= sets specific bit flags', type: 'green' }
          ]
        },
        important: 'Prefer pre-increment `++i` over post-increment `i++` for non-primitive iterators and objects, because `++i` avoids allocating an unnecessary temporary copy.',
        commonMistakes: [
          'Confusing bitwise AND `&` with logical AND `&&`.',
          'Dividing two integers and expecting a float: `double res = 5 / 2;` stores `2.0`, not `2.5`! Write `5.0 / 2`.'
        ],
        tip: 'In modern C++, use `static_cast<double>(a) / b` for clean, searchable, explicit type conversions instead of C-style `(double)a`.',
        interviewNote: 'Question: "Why is prefix ++i preferred over postfix i++ for STL iterators?" Answer: "Postfix `i++` must create a temporary copy of the iterator\'s prior state, increment the original, and return the temporary. Prefix `++i` modifies in-place and returns a reference with zero copy overhead."',
        practiceQuestions: [
          {
            id: 'q-cpp4-1',
            type: 'output',
            question: 'What is the value stored in `x` after: `double x = 7 / 2;`?',
            options: ['3.5', '3.0', '4.0', 'Compile Error'],
            correctIndex: 1,
            explanation: '7 / 2 evaluates as integer division yielding 3. The value 3 is then converted to double, resulting in 3.0.'
          }
        ],
        relatedTopics: ['cpp-variables', 'cpp-control-flow']
      }
    ]
  },

  // CHAPTER 05 — CONTROL FLOW
  {
    id: 'cpp-ch05',
    number: 5,
    title: 'Control Flow',
    description: 'if-else branching, switch-case jump tables, init-statements in if (C++17), and fallthrough',
    topics: [
      {
        id: 'cpp-control-flow',
        subjectId: 'cpp',
        chapterId: 'cpp-ch05',
        chapterNumber: 5,
        pageNumber: 5,
        title: 'if-else, Init-Statements (C++17) & switch-case',
        difficulty: 'beginner',
        definition: 'Control flow structures direct execution paths. C++17 introduced `if (init; condition)` which scopes variables tightly to the conditional block.',
        whyItMatters: 'Scoping variables inside `if (init; condition)` prevents variable leaks into enclosing scopes, improving thread safety and clarity.',
        syntax: 'if (auto it = map.find(key); it != map.end()) {\n    use(*it);\n}',
        explanation: [
          '`if (init; condition)`: Initializes a variable whose scope is strictly restricted to the `if` and `else` branches.',
          '`switch-case`: Evaluates integral or enum expressions. Compilers often optimize switch statements into O(1) jump tables.',
          '`break`: Terminates a switch-case block. Omitting `break` causes intentional or unintentional fallthrough.',
          '`[[fallthrough]]` attribute (C++17): Informs the compiler that falling through to the next case is intentional, silencing warnings.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>

int main() {
    int status_code{404};

    // Fast switch jump table evaluation
    switch (status_code) {
        case 200:
            std::cout << "Status: 200 OK\\n";
            break;
        case 404:
            std::cout << "Status: 404 Not Found\\n";
            break;
        case 500:
            std::cout << "Status: 500 Internal Error\\n";
            break;
        default:
            std::cout << "Status: Unknown Code\\n";
            break;
    }
    return 0;
}`,
          output: 'Status: 404 Not Found',
          annotations: [
            { line: 7, label: 'switch evaluates integral expression', type: 'blue' },
            { line: 12, label: 'break prevents cascading fallthrough', type: 'yellow' }
          ]
        },
        important: 'In a `switch` statement, you cannot declare and initialize variables inside a case without wrapping the case body in braces `{ }` to define a local block scope.',
        commonMistakes: [
          'Forgetting `break;` at the end of a `case`, causing execution to cascade into the next case unintentionally.',
          'Attempting to use `switch` on `std::string` or `float`. C++ `switch` only works on integral types and enumerations.'
        ],
        tip: 'Use C++17 `if (init; condition)` when acquiring locks: `if (std::lock_guard lock{mutex}; is_safe()) { ... }`.',
        interviewNote: 'Question: "Why can\'t floating-point numbers or strings be used in standard C++ switch statements?" Answer: "C++ switch statements are designed to be compiled into hardware jump tables or binary search branches indexed by integer constants at compile time."',
        practiceQuestions: [
          {
            id: 'q-cpp5-1',
            type: 'mcq',
            question: 'Which C++ standard introduced `if (init; condition)` syntax allowing variable declaration within the condition header?',
            options: ['C++98', 'C++11', 'C++14', 'C++17'],
            correctIndex: 3,
            explanation: 'C++17 added init-statements for `if` and `switch`, allowing variables to be declared and scoped directly within the statement.'
          }
        ],
        relatedTopics: ['cpp-operators', 'cpp-loops']
      }
    ]
  },

  // CHAPTER 06 — LOOPS
  {
    id: 'cpp-ch06',
    number: 6,
    title: 'Loops & Iteration',
    description: 'for loops, while loops, do-while, and modern range-based for loops with auto&',
    topics: [
      {
        id: 'cpp-loops',
        subjectId: 'cpp',
        chapterId: 'cpp-ch06',
        chapterNumber: 6,
        pageNumber: 6,
        title: 'for, while & Range-Based for Loops (auto&)',
        difficulty: 'beginner',
        definition: 'Loops repeat code execution. Modern C++ range-based `for (const auto& item : collection)` iterates directly over arrays and STL containers cleanly.',
        whyItMatters: 'Range-based for loops eliminate off-by-one index bugs (`i <= size`), bounds overrun vulnerabilities, and iterator boilerplate.',
        syntax: 'for (const auto& item : container) {\n    std::cout << item;\n}',
        explanation: [
          '`for (init; cond; step)`: Classic counting loop with explicit iteration step.',
          'Range-based `for (auto x : vec)`: Iterates by value (makes a copy of each element).',
          'Range-based `for (auto& x : vec)`: Iterates by reference (allows modifying elements in-place).',
          'Range-based `for (const auto& x : vec)`: Iterates by const reference (efficient read-only access without copying).'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers{10, 20, 30, 40, 50};

    // Range-based for modifying elements by reference
    for (auto& n : numbers) {
        n *= 2; // Doubles each value in-place
    }

    // Range-based for read-only const reference iteration
    std::cout << "Doubled Vector: ";
    for (const auto& n : numbers) {
        std::cout << n << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
          output: 'Doubled Vector: 20 40 60 80 100 ',
          annotations: [
            { line: 8, label: 'auto& modifies container elements directly', type: 'yellow' },
            { line: 14, label: 'const auto& avoids copying large elements', type: 'green' }
          ]
        },
        important: 'Always write `for (const auto& item : container)` when reading complex objects or strings to prevent unnecessary deep copies on every iteration loop step.',
        commonMistakes: [
          'Using `for (auto item : container)` with vectors of strings or large structs, which copies every element on each step.'
        ],
        tip: 'In C++20, range-based for loops also support init-statements: `for (auto vec = get_data(); const auto& item : vec)`.',
        interviewNote: 'Question: "What does a range-based for loop expand to under the hood?" Answer: "The compiler expands it into an iterator loop using `auto __begin = std::begin(c); auto __end = std::end(c); for (; __begin != __end; ++__begin)`."',
        practiceQuestions: [
          {
            id: 'q-cpp6-1',
            type: 'mcq',
            question: 'Which range-based for loop header avoids copying elements while preventing accidental mutation of container data?',
            options: [
              'for (auto x : vec)',
              'for (auto& x : vec)',
              'for (const auto& x : vec)',
              'for (const auto* x : vec)'
            ],
            correctIndex: 2,
            explanation: '`const auto&` binds each element by const reference: zero copies are performed and the compiler rejects attempts to modify the element.'
          }
        ],
        relatedTopics: ['cpp-control-flow', 'cpp-arrays-strings', 'cpp-stl']
      }
    ]
  },

  // CHAPTER 07 — FUNCTIONS
  {
    id: 'cpp-ch07',
    number: 7,
    title: 'Functions',
    description: 'Pass by value vs reference, function overloading, default arguments, inline functions, and recursion',
    topics: [
      {
        id: 'cpp-functions',
        subjectId: 'cpp',
        chapterId: 'cpp-ch07',
        chapterNumber: 7,
        pageNumber: 7,
        title: 'Pass by Value, Reference & Function Overloading',
        difficulty: 'beginner',
        definition: 'Functions encapsulate reusable logic. C++ supports pass-by-value, pass-by-reference (`&`), and function overloading (multiple functions sharing the same name with distinct signatures).',
        whyItMatters: 'Pass-by-const-reference (`const T&`) passes large objects without copying while protecting data from modification, forming the foundation of idiomatic C++ API design.',
        syntax: 'void process(const std::string& data);\nvoid swap(int& a, int& b);',
        explanation: [
          'Pass by Value (`T val`): The caller\'s argument is copied into the function parameter.',
          'Pass by Reference (`T& ref`): The parameter is an alias to the caller\'s actual variable; mutations modify the original object.',
          'Pass by Const Reference (`const T& ref`): Prevents copying large objects and guarantees read-only access.',
          'Function Overloading: Functions in the same scope can have identical names provided their parameter counts or types differ.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <string>

// Overload 1: Integer addition
int add(int a, int b) {
    return a + b;
}

// Overload 2: String concatenation via const reference
std::string add(const std::string& a, const std::string& b) {
    return a + " " + b;
}

// In-place swap using reference parameters
void swap_values(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int n1{10}, n2{20};
    swap_values(n1, n2);
    std::cout << "Swapped: n1=" << n1 << ", n2=" << n2 << "\\n";
    std::cout << "Int Add: " << add(5, 7) << "\\n";
    std::cout << "String Add: " << add(std::string("CODE"), std::string("INK")) << "\\n";
    return 0;
}`,
          output: 'Swapped: n1=20, n2=10\nInt Add: 12\nString Add: CODE INK',
          annotations: [
            { line: 15, label: 'int& references mutate caller variables in-place', type: 'blue' },
            { line: 5, label: 'Function overloading resolves types at compile-time', type: 'green' }
          ]
        },
        important: 'Function return type alone CANNOT be used to overload a function. Overloading resolution requires differences in parameter types, order, or count.',
        commonMistakes: [
          'Returning a reference to a local stack variable: `int& get_val() { int x = 5; return x; }` creates a catastrophic dangling reference when the stack frame unwinds.'
        ],
        tip: 'Mark small, frequently-called functions as `inline` (or define them inside class declarations) to suggest the compiler eliminate function call branch overhead.',
        interviewNote: 'Question: "What is Name Mangling in C++?" Answer: "The compiler encodes parameter types into the generated symbol name (e.g. `_Z3addii`) so the linker can differentiate overloaded functions sharing the same name."',
        practiceQuestions: [
          {
            id: 'q-cpp7-1',
            type: 'mcq',
            question: 'Can two functions in C++ differ ONLY by their return type and qualify as valid overloads?',
            options: [
              'Yes, the compiler chooses based on caller assignment',
              'No, return type alone is insufficient for function overload resolution',
              'Only if both are declared inline',
              'Only in C++20'
            ],
            correctIndex: 1,
            explanation: 'In C++, function overloads must differ in their parameter signatures. Differing solely by return type causes a compilation error.'
          }
        ],
        relatedTopics: ['cpp-variables', 'cpp-pointers', 'cpp-classes']
      }
    ]
  },

  // CHAPTER 08 — ARRAYS & STRINGS
  {
    id: 'cpp-ch08',
    number: 8,
    title: 'Arrays & Strings',
    description: 'Fixed-size arrays, std::array, C-style null-terminated strings vs modern std::string',
    topics: [
      {
        id: 'cpp-arrays-strings',
        subjectId: 'cpp',
        chapterId: 'cpp-ch08',
        chapterNumber: 8,
        pageNumber: 8,
        title: 'C-Style Arrays vs std::array & std::string',
        difficulty: 'beginner',
        definition: 'Raw C-arrays decay to pointers and lack size tracking. Modern C++ provides `std::array` for fixed stack arrays and `std::string` for dynamic, memory-safe strings.',
        whyItMatters: 'Using `std::string` prevents buffer overflows, the most historically exploited vulnerability in software security.',
        syntax: '#include <array>\nstd::array<int, 5> fixed_arr{1, 2, 3, 4, 5};\nstd::string text{"CODEINK"};',
        explanation: [
          'Array Decay: Passing a raw C-array `int arr[5]` to a function silently converts it to a raw pointer `int*`, losing its size information.',
          '`std::array<T, N>` (C++11): Thin wrapper around raw arrays providing `.size()`, bounds checking via `.at()`, and zero memory overhead.',
          'C-Strings: Null-terminated character arrays (`char s[] = "hi";`) requiring manual buffer calculation.',
          '`std::string`: Dynamic, heap-backed string managing its own memory, resizing automatically on concatenation.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <array>
#include <string>

int main() {
    // Type-safe modern stack array
    std::array<int, 4> scores{95, 88, 72, 91};
    std::cout << "Array size: " << scores.size() << " elements\\n";

    // Safe dynamic string
    std::string title{"C++ Systems Programming"};
    title += " Edition";
    std::cout << "Length: " << title.length() << " | Substr: " << title.substr(0, 3) << "\\n";
    return 0;
}`,
          output: 'Array size: 4 elements\nLength: 31 | Substr: C++',
          annotations: [
            { line: 7, label: 'std::array preserves size on stack with zero overhead', type: 'blue' },
            { line: 11, label: 'std::string handles memory growth automatically', type: 'green' }
          ]
        },
        important: 'Using `arr[i]` on arrays does NOT perform bounds checking! Use `scores.at(i)` if you need bounds verification, which throws `std::out_of_range`.',
        commonMistakes: [
          'Using `sizeof(arr)` on a decayed array parameter inside a function. It returns the size of the pointer (4 or 8 bytes), not the array length!'
        ],
        tip: 'In C++17, use `std::string_view` for read-only string parameters. It avoids copying strings or allocating heap memory when inspecting string slices.',
        interviewNote: 'Question: "What is Short String Optimization (SSO) in std::string?" Answer: "Most standard libraries embed a small internal buffer (~15 to 22 bytes) inside the std::string object. Small strings avoid heap allocations entirely by storing characters directly on the stack."',
        practiceQuestions: [
          {
            id: 'q-cpp8-1',
            type: 'mcq',
            question: 'What happens when passing a raw C-style array `int arr[10]` to a function `void f(int a[])`?',
            options: [
              'The array is deeply copied element by element',
              'The array decays into a pointer to its first element (`int*`)',
              'The function throws a compile error without templates',
              'The size is preserved automatically'
            ],
            correctIndex: 1,
            explanation: 'In C and C++, raw arrays decay into pointers to their first elements when passed to functions, losing length information.'
          }
        ],
        relatedTopics: ['cpp-loops', 'cpp-pointers', 'cpp-stl']
      }
    ]
  },

  // CHAPTER 09 — POINTERS & REFERENCES
  {
    id: 'cpp-ch09',
    number: 9,
    title: 'Pointers & References',
    description: 'Memory addresses, dereferencing (*), address-of (&), nullptr, and pointer vs reference semantics',
    topics: [
      {
        id: 'cpp-pointers',
        subjectId: 'cpp',
        chapterId: 'cpp-ch09',
        chapterNumber: 9,
        pageNumber: 9,
        title: 'Pointers, References & The Address-Of Operator',
        difficulty: 'intermediate',
        definition: 'A pointer is a variable that stores the memory address of another object. A reference is an immutable alias bound permanently to an existing object.',
        whyItMatters: 'Mastering pointers and references enables low-level memory control, efficient parameter passing without copies, and data structure construction.',
        syntax: 'int* ptr = &val;  // Pointer stores address of val\nint& ref = val;   // Reference is an alias to val',
        explanation: [
          '`&` Address-Of Operator: Returns the memory address of an object.',
          '`*` Dereference Operator: Accesses the value stored at the address pointed to by a pointer.',
          'Pointers vs References: Pointers can be reassigned and can be `nullptr`. References MUST be initialized on creation and can never be rebound or null.',
          'Pointer Arithmetic: Adding `1` to `ptr` advances the address by `sizeof(*ptr)` bytes in memory.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>

int main() {
    int target{42};

    // Pointer declaration and dereferencing
    int* ptr = &target;

    // Reference alias
    int& ref = target;

    std::cout << "Original Value: " << target << "\\n";
    std::cout << "Address (&target): " << ptr << "\\n";

    // Modifying via pointer dereference
    *ptr = 100;
    std::cout << "After *ptr = 100: " << target << "\\n";

    // Modifying via reference alias
    ref = 250;
    std::cout << "After ref = 250: " << target << "\\n";
    return 0;
}`,
          output: 'Original Value: 42\nAddress (&target): 0x7ffd98... \nAfter *ptr = 100: 100\nAfter ref = 250: 250',
          annotations: [
            { line: 7, label: '&target extracts memory address into pointer', type: 'blue' },
            { line: 16, label: '*ptr dereferences pointer to write directly to memory', type: 'yellow' },
            { line: 20, label: 'ref acts as a permanent syntactic alias', type: 'green' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Pointer vs Reference Memory Architecture',
          subtitle: 'Pointers hold explicit addresses; references are syntactic aliases',
          elements: [
            { id: '1', label: 'ptr (Address: 0x100)', sublabel: 'Stores 0x500', value: 'Pointer', status: 'active', arrowTo: '3' },
            { id: '2', label: 'ref', sublabel: 'Alias to target', value: 'Reference', status: 'active', arrowTo: '3' },
            { id: '3', label: 'target (Address: 0x500)', sublabel: 'int target = 42', value: 'Value: 42', status: 'referenced' }
          ]
        },
        important: 'Always initialize pointers to `nullptr` if they do not yet point to valid memory: `int* p = nullptr;`. Dereferencing uninitialized pointers causes segmentation faults.',
        commonMistakes: [
          'Dereferencing a null or dangling pointer: `int* p = nullptr; *p = 5;` crashes immediately with SIGSEGV.',
          'Confusing pointer dereference `*p` with multiplication operator `*`.'
        ],
        tip: 'Prefer references (`&`) over raw pointers for function parameters whenever the argument cannot be null and does not require rebinding.',
        interviewNote: 'Question: "Can a C++ reference be reseated (rebound) to another object after initialization?" Answer: "No! Once initialized, assigning to a reference assigns to the underlying object it references, not the binding itself."',
        practiceQuestions: [
          {
            id: 'q-cpp9-1',
            type: 'output',
            question: 'What is the output of: `int a = 10; int* p = &a; *p += 5; std::cout << a;`?',
            options: ['10', '15', 'Address of a', 'Compile Error'],
            correctIndex: 1,
            explanation: '*p dereferences the pointer to access `a` directly. Adding 5 modifies `a` to 15.'
          }
        ],
        relatedTopics: ['cpp-functions', 'cpp-memory-management', 'cpp-classes']
      }
    ]
  },

  // CHAPTER 10 — OBJECT-ORIENTED PROGRAMMING
  {
    id: 'cpp-ch10',
    number: 10,
    title: 'Object-Oriented Programming',
    description: 'Classes, objects, constructors, destructors, access specifiers, and inheritance hierarchy',
    topics: [
      {
        id: 'cpp-classes',
        subjectId: 'cpp',
        chapterId: 'cpp-ch10',
        chapterNumber: 10,
        pageNumber: 10,
        title: 'Classes, Constructors, Destructors & Access Modifiers',
        difficulty: 'intermediate',
        definition: 'Classes are user-defined types encapsulating data members and member functions. The constructor initializes resources; the destructor cleans them up deterministically upon destruction.',
        whyItMatters: 'Constructors and destructors form the foundation of RAII (Resource Acquisition Is Initialization), ensuring deterministic memory and file cleanup without garbage collection pauses.',
        syntax: 'class BankAccount {\nprivate:\n    double balance{0.0};\npublic:\n    BankAccount(double init) : balance{init} {}\n    ~BankAccount() {}\n};',
        explanation: [
          'Access Specifiers: `public` (accessible anywhere), `private` (accessible only within class), `protected` (accessible within class and subclasses).',
          'Member Initializer List: Initializes member variables before the constructor body executes: `Account() : balance{0.0} {}`.',
          'Destructor `~ClassName()`: Automatically invoked when the object goes out of scope (stack) or is deleted (heap).',
          '`this` Pointer: An implicit pointer pointing to the calling object instance within member functions.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int student_id;

public:
    // Constructor with member initializer list
    Student(std::string n, int id) : name{std::move(n)}, student_id{id} {
        std::cout << "[INIT] Student " << name << " created\\n";
    }

    // Destructor called automatically upon scope exit
    ~Student() {
        std::cout << "[CLEANUP] Student " << name << " destroyed\\n";
    }

    void display() const {
        std::cout << "ID: " << student_id << " | Name: " << name << "\\n";
    }
};

int main() {
    {
        Student s1("Alice", 101);
        s1.display();
    } // s1 goes out of scope here; destructor executes immediately!
    std::cout << "Outer scope resumes.\\n";
    return 0;
}`,
          output: '[INIT] Student Alice created\nID: 101 | Name: Alice\n[CLEANUP] Student Alice destroyed\nOuter scope resumes.',
          annotations: [
            { line: 11, label: 'Member initializer list avoids default construction', type: 'blue' },
            { line: 16, label: 'Destructor invoked automatically upon closing brace }', type: 'yellow' },
            { line: 20, label: 'const member function guarantees no member mutation', type: 'green' }
          ]
        },
        important: 'Always prefer the member initializer list `Class() : member{val}` over assigning inside the constructor body `member = val`. The initializer list avoids unnecessary default construction and assignment overhead.',
        commonMistakes: [
          'Forgetting the trailing semicolon `;` after class declarations: `class Foo { ... };`.',
          'Confusing `struct` and `class` in C++. In C++, the ONLY difference is that `struct` members default to `public`, while `class` members default to `private`.'
        ],
        tip: 'Mark member functions that do not alter class state with `const` (e.g. `void display() const;`). This enables them to be called on `const` object instances.',
        interviewNote: 'Question: "What is the difference between struct and class in C++?" Answer: "In C++, structs and classes are identical except for default access: struct members and inheritance default to public; class members and inheritance default to private."',
        practiceQuestions: [
          {
            id: 'q-cpp10-1',
            type: 'mcq',
            question: 'When is a class destructor executed for a stack-allocated C++ object?',
            options: [
              'When the program calls delete explicitly',
              'Automatically when the object falls out of scope',
              'When the operating system garbage collector runs',
              'Only when main() returns'
            ],
            correctIndex: 1,
            explanation: 'Stack-allocated C++ objects have deterministic lifespans. As soon as the enclosing scope ends (`}`), the destructor runs automatically.'
          }
        ],
        relatedTopics: ['cpp-advanced-oop', 'cpp-memory-management', 'cpp-templates']
      }
    ]
  }
];
