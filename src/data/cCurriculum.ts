import { Chapter } from '../types/notebook';

export const C_CHAPTERS: Chapter[] = [
  {
    id: 'c-ch1',
    number: 1,
    title: 'Foundations & Compilation',
    description: 'How C code translates from human text into machine CPU silicon execution',
    topics: [
      {
        id: 'c-compilation',
        subjectId: 'c',
        chapterId: 'c-ch1',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'Compilation Pipeline & Execution Flow',
        difficulty: 'beginner',
        definition: 'C is a compiled systems language. Source code (.c) undergoes four distinct translation stages before producing an executable: Preprocessing, Compilation, Assembly, and Linking.',
        whyItMatters: 'Understanding the build pipeline enables programmers to debug linker errors, optimize compilation flags, and understand zero-cost hardware abstractions.',
        syntax: 'gcc -Wall -Wextra main.c -o main',
        explanation: [
          'Phase 1: Preprocessor (#include, #define macros are textually expanded; comments are stripped).',
          'Phase 2: Compiler converts preprocessed C into architecture-specific Assembly instructions (.s).',
          'Phase 3: Assembler encodes assembly instructions into binary machine object code (.o / .obj).',
          'Phase 4: Linker resolves references and binds object files with the C standard library (libc) into a final ELF/PE binary.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, CODEINK\\n");\n    return 0;\n}`,
          output: 'Hello, CODEINK',
          annotations: [
            { line: 1, label: 'Preprocessor header inclusion', type: 'blue' },
            { line: 3, label: 'Entry point of execution', type: 'yellow' },
            { line: 4, label: 'Standard output library call', type: 'green' },
            { line: 5, label: 'Exit status code 0 = success', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'C Translation Architecture',
          subtitle: 'From Source to Binary Silicon Instructions',
          elements: [
            { id: '1', label: 'Source File', sublabel: 'main.c', value: 'High Level', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Preprocessor', sublabel: 'gcc -E', value: 'main.i', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Compiler', sublabel: 'gcc -S', value: 'main.s (Assembly)', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Assembler', sublabel: 'gcc -c', value: 'main.o (Obj)', status: 'active', arrowTo: '5' },
            { id: '5', label: 'Linker + libc', sublabel: 'ld', value: 'a.out (Binary)', status: 'referenced' }
          ]
        },
        important: 'C does not execute inside a virtual machine or interpreter. Compiled instructions execute directly on hardware CPU registers with zero runtime overhead.',
        commonMistakes: [
          'Confusing compiler syntax errors with linker unresolved external symbol errors.',
          'Omitting #include <stdio.h> when calling printf or puts.'
        ],
        tip: 'Always compile with warnings enabled: `gcc -Wall -Wextra -pedantic main.c` to catch 95% of memory and type pitfalls early.',
        interviewNote: 'Top systems interview question: "What is the difference between a declaration and a definition, and which phase detects unresolved symbols?" (Answer: The Linker).',
        practiceQuestions: [
          {
            id: 'q-c1-1',
            type: 'mcq',
            question: 'Which stage of the C build process handles macro replacements like `#define MAX 100`?',
            options: ['The Assembler', 'The Preprocessor', 'The Linker', 'The CPU Loader'],
            correctIndex: 1,
            explanation: 'The Preprocessor performs macro text substitution and file inclusion before compiler parsing.'
          },
          {
            id: 'q-c1-2',
            type: 'output',
            question: 'What is the return value convention for `main(void)` indicating successful program termination to the host OS?',
            options: ['Return 1', 'Return -1', 'Return 0', 'Return NULL'],
            correctIndex: 2,
            explanation: 'Return code 0 standardizes EXIT_SUCCESS across UNIX and Windows systems.'
          }
        ],
        relatedTopics: ['c-variables', 'c-functions']
      }
    ]
  },
  {
    id: 'c-ch2',
    number: 2,
    title: 'Variables & Data Types',
    description: 'Memory allocation, data representation, scalar types, and typing rules',
    topics: [
      {
        id: 'c-variables',
        subjectId: 'c',
        chapterId: 'c-ch2',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'Variables & Memory Allocation',
        difficulty: 'beginner',
        definition: 'A variable is a named memory location reserved on the hardware stack or data segment to store values of a specified primitive data type.',
        whyItMatters: 'Variables bind human-readable identifiers to physical RAM addresses. Choosing the correct type prevents integer overflows and excessive memory usage.',
        syntax: 'data_type identifier = initial_value;',
        explanation: [
          'Declaring `int age = 20;` tells the compiler to allocate 4 bytes on the hardware call stack.',
          'The compiler binds `age` to an offset relative to the stack base pointer (%rbp - 4).',
          'C is statically and strongly typed: every variable must have a fixed type declared before usage.'
        ],
        example: {
          language: 'c',
          code: `int age = 20;\nfloat gpa = 3.85f;\nchar grade = 'A';\n\nprintf("Age: %d at address %p\\n", age, (void*)&age);`,
          output: 'Age: 20 at address 0x7ffd98b2c4ac',
          annotations: [
            { line: 1, label: '4 bytes stack allocation', type: 'blue' },
            { line: 2, label: 'Single-precision float', type: 'green' },
            { line: 3, label: '1 byte ASCII character', type: 'yellow' },
            { line: 5, label: '&age extracts physical RAM address', type: 'red' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Stack Memory Allocation Layout',
          subtitle: 'Byte Layout in RAM',
          elements: [
            { id: '1', label: 'age (int)', address: '0x7ffd..00', value: '20 (4 Bytes)', status: 'active' },
            { id: '2', label: 'gpa (float)', address: '0x7ffd..04', value: '3.85 (4 Bytes)', status: 'normal' },
            { id: '3', label: 'grade (char)', address: '0x7ffd..08', value: "'A' (1 Byte)", status: 'normal' },
            { id: '4', label: 'Alignment Pad', address: '0x7ffd..09', value: '3 Bytes Pad', status: 'warning' }
          ]
        },
        important: 'Variables declared inside functions without an explicit initializer contain undefined "garbage values" from previous stack activity.',
        commonMistakes: [
          'Reading uninitialized variables: `int score; printf("%d", score);` produces unpredictable values.',
          'Mixing single quotes for characters (\'A\') and double quotes for string literals ("A").'
        ],
        tip: 'Always initialize local variables upon declaration: `int count = 0;` eliminates phantom bugs.',
        interviewNote: 'Frequently asked: "What is the difference between local automatic variables and static variables?" (Automatic lives on stack; static lives in data segment for process duration).',
        practiceQuestions: [
          {
            id: 'q-c2-1',
            type: 'mcq',
            question: 'What is stored in a local variable `int score;` declared without an explicit value in C?',
            options: ['0', 'NULL', 'Garbage bit data left in that RAM slot', '1'],
            correctIndex: 2,
            explanation: 'C does not zero-initialize local stack memory by default.'
          }
        ],
        relatedTopics: ['c-types-sizes', 'c-pointers']
      },
      {
        id: 'c-types-sizes',
        subjectId: 'c',
        chapterId: 'c-ch2',
        chapterNumber: 2,
        pageNumber: 3,
        title: 'Primitive Types & sizeof Operator',
        difficulty: 'beginner',
        definition: 'C provides primitive scalar types whose exact bit widths depend on the host CPU architecture. The sizeof operator computes exact byte footprints at compile-time.',
        whyItMatters: 'Using the right integer widths prevents signed integer overflows and guarantees cross-platform firmware compatibility.',
        syntax: 'sizeof(type_or_variable)',
        explanation: [
          'char: guaranteed exactly 1 byte (8 bits).',
          'short: at least 16 bits (typically 2 bytes).',
          'int: at least 16 bits (typically 32 bits on modern architectures).',
          'long / long long: 64 bits on LP64 platforms.',
          '<stdint.h> provides fixed-width types: int8_t, int16_t, int32_t, int64_t.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <stdint.h>\n\nint main(void) {\n    printf("char: %zu byte\\n", sizeof(char));\n    printf("int:  %zu bytes\\n", sizeof(int));\n    printf("int64_t: %zu bytes\\n", sizeof(int64_t));\n    return 0;\n}`,
          output: 'char: 1 byte\nint:  4 bytes\nint64_t: 8 bytes',
          annotations: [
            { line: 5, label: '%zu format specifier for size_t', type: 'blue' },
            { line: 6, label: 'Compile-time evaluation, zero CPU cost', type: 'green' }
          ]
        },
        important: 'sizeof is a compile-time operator, NOT a function. Expressions inside sizeof() are not evaluated at runtime.',
        commonMistakes: [
          'Assuming int is always 4 bytes on embedded 16-bit microcontrollers.',
          'Using %d instead of %zu to print sizeof results.'
        ],
        tip: 'In systems programming, prefer fixed-width types from <stdint.h> like uint32_t over primitive int.',
        interviewNote: 'Does `int i = 5; sizeof(i++);` increment i? (No! sizeof operands are not evaluated at runtime; i remains 5).',
        practiceQuestions: [
          {
            id: 'q-c2-2',
            type: 'mcq',
            question: 'What is the value of `i` after running `int i = 5; sizeof(i++);` in C?',
            options: ['6', '5', 'Undefined', '0'],
            correctIndex: 1,
            explanation: 'sizeof is evaluated at compile time. The increment expression inside is never executed.'
          }
        ],
        relatedTopics: ['c-variables', 'c-pointers']
      }
    ]
  },
  {
    id: 'c-ch3',
    number: 3,
    title: 'Operators & Expressions',
    description: 'Arithmetic, logical, relational, bitwise operators and precedence rules',
    topics: [
      {
        id: 'c-operators',
        subjectId: 'c',
        chapterId: 'c-ch3',
        chapterNumber: 3,
        pageNumber: 4,
        title: 'Operators, Bitwise & Precedence',
        difficulty: 'beginner',
        definition: 'Operators are symbolic tokens instructing the CPU to perform mathematical, relational, or bitwise register manipulations on operands.',
        whyItMatters: 'Bitwise manipulation enables direct hardware register control, bitmasking, cryptography, and ultra-high-performance flags.',
        syntax: 'result = operand1 operator operand2;',
        explanation: [
          'Arithmetic: +, -, *, /, % (modulo only works on integer operands).',
          'Relational: ==, !=, <, >, <=, >= (returns 1 for true, 0 for false).',
          'Logical: &&, ||, ! with short-circuit evaluation guarantees.',
          'Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).'
        ],
        example: {
          language: 'c',
          code: `int flags = 0b00000101; // 5\nflags |= (1 << 3);      // Set bit 3 -> 13\nprintf("Masked: %d\\n", flags);\n\n// Logical short-circuit:\nint x = 0;\nif (x && ++x) { /* skipped */ }\nprintf("x is still: %d\\n", x);`,
          output: 'Masked: 13\nx is still: 0',
          annotations: [
            { line: 2, label: 'Bitwise OR with bitmask sets bit 3', type: 'yellow' },
            { line: 7, label: 'Short circuit skips ++x since x is 0', type: 'red' }
          ]
        },
        important: 'In logical operations `(A && B)`, if A is false (0), B is guaranteed NEVER to execute. In `(A || B)`, if A is true, B is skipped.',
        commonMistakes: [
          'Writing `if (x = 5)` instead of `if (x == 5)`, which accidentally overwrites x and always evaluates to true.',
          'Using modulo `%` on floating point numbers (use `fmod()` from `<math.h>` instead).'
        ],
        tip: 'Use `(val & (1 << n))` to test whether the n-th bit is set, and `(val |= (1 << n))` to set it.',
        interviewNote: 'Classic puzzle: How do you swap two variables without a third temp variable? (Answer: `a ^= b; b ^= a; a ^= b;`).',
        practiceQuestions: [
          {
            id: 'q-c3-1',
            type: 'mcq',
            question: 'What is the result of `8 >> 2` in C?',
            options: ['16', '32', '2', '4'],
            correctIndex: 2,
            explanation: 'Right-shifting by 2 bits divides by 2^2 (8 / 4 = 2).'
          }
        ],
        relatedTopics: ['c-conditionals', 'c-variables']
      }
    ]
  },
  {
    id: 'c-ch4',
    number: 4,
    title: 'Input & Output',
    description: 'Formatted I/O streams, format specifiers, buffers, and string readers',
    topics: [
      {
        id: 'c-io',
        subjectId: 'c',
        chapterId: 'c-ch4',
        chapterNumber: 4,
        pageNumber: 5,
        title: 'Formatted I/O: printf, scanf & Buffer Pitfalls',
        difficulty: 'beginner',
        definition: 'C handles input and output via standard streams (stdin, stdout, stderr) using format strings to marshal between text and binary memory values.',
        whyItMatters: 'Improper input validation in `scanf` or `gets` is the historical cause of 70% of memory corruption and security vulnerabilities.',
        syntax: 'printf("format", args...); scanf("format", &pointers...);',
        explanation: [
          'printf writes formatted byte streams to stdout.',
          'scanf reads characters from stdin and writes parsed binary values to variable addresses.',
          'Never use `gets()`—it was removed from the C11 standard due to unavoidable buffer overflows. Always use `fgets()` instead.',
          'Format specifiers: %d (int), %f (float), %lf (double in scanf), %c (char), %s (string), %p (pointer).'
        ],
        example: {
          language: 'c',
          code: `char buffer[32];\nprintf("Enter name: ");\nif (fgets(buffer, sizeof(buffer), stdin)) {\n    printf("Welcome, %s", buffer);\n}`,
          output: 'Enter name: Alex\nWelcome, Alex',
          annotations: [
            { line: 3, label: 'fgets enforces bounds check using sizeof', type: 'green' }
          ]
        },
        important: 'In `scanf("%d", &val)`, you MUST pass the memory address `&val`. Omitting `&` writes user input to arbitrary memory locations.',
        commonMistakes: [
          'Leaving leftover newline characters `\\n` in the input buffer after `scanf("%d")` before reading a string.',
          'Using `%f` instead of `%lf` when reading a `double` with `scanf`.'
        ],
        tip: 'Always check the return value of `scanf` (it returns the number of successfully assigned items): `if (scanf("%d", &x) == 1)` to prevent garbage reads.',
        interviewNote: 'Why is `gets()` dangerous? (Because it does not know the destination buffer size, allowing attackers to smash the stack).',
        practiceQuestions: [
          {
            id: 'q-c4-1',
            type: 'mcq',
            question: 'Which function safely reads a line of input while preventing buffer overflows?',
            options: ['gets()', 'fgets()', 'scanf("%s")', 'getchar()'],
            correctIndex: 1,
            explanation: '`fgets(buf, size, stream)` bounds input strictly to buffer capacity.'
          }
        ],
        relatedTopics: ['c-strings', 'c-variables']
      }
    ]
  },
  {
    id: 'c-ch5',
    number: 5,
    title: 'Control Flow & Logic',
    description: 'Conditional branching, switch statements, and fall-through mechanics',
    topics: [
      {
        id: 'c-conditionals',
        subjectId: 'c',
        chapterId: 'c-ch5',
        chapterNumber: 5,
        pageNumber: 6,
        title: 'Branching: if-else & switch-case',
        difficulty: 'beginner',
        definition: 'Control flow structures direct execution down alternative paths based on conditional Boolean expressions or jump tables.',
        whyItMatters: 'Switch statements on dense integral values are compiled into O(1) CPU jump tables, outperforming long if-else chains.',
        syntax: 'if (cond) { ... } else if (cond2) { ... } else { ... }',
        explanation: [
          'if-else evaluates expression truthiness (0 = false, non-zero = true).',
          'Ternary operator: `condition ? val_if_true : val_if_false`.',
          'switch-case operates on integer and character expressions only.',
          'break is required in switch cases; otherwise execution falls through into subsequent case blocks.'
        ],
        example: {
          language: 'c',
          code: `int code = 2;\nswitch (code) {\n    case 1: printf("One\\n"); break;\n    case 2: printf("Two\\n"); break;\n    default: printf("Other\\n"); break;\n}`,
          output: 'Two',
          annotations: [
            { line: 4, label: 'break prevents falling into default', type: 'yellow' }
          ]
        },
        important: 'Switch expressions cannot evaluate floating-point numbers or strings; only integer constants and enums are permitted.',
        commonMistakes: [
          'Accidental fallthrough caused by forgetting `break;` at the end of a switch case.',
          'Writing `if (x = 0)` which sets x to 0, evaluates to false, and never executes.'
        ],
        tip: 'Intentional fallthrough in switch statements should always be commented with `/* fallthrough */` for clarity.',
        interviewNote: 'How does a compiler implement a switch statement? (Using binary search chains for sparse values, or jump tables for dense values).',
        practiceQuestions: [
          {
            id: 'q-c5-1',
            type: 'mcq',
            question: 'What happens if you omit the `break;` statement in a switch case?',
            options: ['Compile error', 'Execution falls through into the next case', 'Program halts', 'Default executes immediately'],
            correctIndex: 1,
            explanation: 'In C switch statements, execution continues into subsequent case blocks until a break or end of block is reached.'
          }
        ],
        relatedTopics: ['c-loops', 'c-operators']
      }
    ]
  },
  {
    id: 'c-ch6',
    number: 6,
    title: 'Loops & Iteration',
    description: 'for, while, do-while loops, loop control and nested pattern problems',
    topics: [
      {
        id: 'c-loops',
        subjectId: 'c',
        chapterId: 'c-ch6',
        chapterNumber: 6,
        pageNumber: 7,
        title: 'Iteration: for, while & do-while',
        difficulty: 'beginner',
        definition: 'Loops execute a code block repeatedly while a condition holds true. C provides counter-driven (for), condition-driven (while), and post-test (do-while) loops.',
        whyItMatters: 'Loops are the heart of algorithmic processing, matrix operations, and hardware event listeners.',
        syntax: 'for (init; cond; step) { ... } | while (cond) { ... }',
        explanation: [
          'for loop: `for (int i = 0; i < N; ++i)` encapsulates setup, check, and increment.',
          'while loop: evaluates condition before each iteration (can execute 0 times).',
          'do-while loop: guarantees execution of the block at least once before testing condition.',
          'break terminates loop immediately; continue skips to next iteration.'
        ],
        example: {
          language: 'c',
          code: `for (int i = 0; i < 5; i++) {\n    if (i == 2) continue; // Skip 2\n    printf("%d ", i);\n}\nprintf("\\n");`,
          output: '0 1 3 4',
          annotations: [
            { line: 2, label: 'continue skips the printf for index 2', type: 'yellow' }
          ]
        },
        important: 'do-while is ideal for input validation loops where user prompt must be shown at least once before testing validity.',
        commonMistakes: [
          'Accidental semicolon immediately after loop header: `for(int i=0; i<10; i++); { body; }` runs an empty loop!',
          'Off-by-one errors with `<` vs `<=` array bounds.'
        ],
        tip: 'Prefer prefix increment `++i` over `i++` for stylistic consistency in loop headers.',
        interviewNote: 'How many times does `do { ... } while (0);` run? (Exactly once; this idiom is widely used in multi-line C preprocessor macros).',
        practiceQuestions: [
          {
            id: 'q-c6-1',
            type: 'mcq',
            question: 'Which loop is guaranteed to execute its body at least once?',
            options: ['for loop', 'while loop', 'do-while loop', 'None'],
            correctIndex: 2,
            explanation: 'do-while tests its condition at the bottom after executing the body.'
          }
        ],
        relatedTopics: ['c-arrays', 'c-conditionals']
      }
    ]
  },
  {
    id: 'c-ch7',
    number: 7,
    title: 'Functions & Scope',
    description: 'Call stack, pass-by-value, stack frames, and recursive execution',
    topics: [
      {
        id: 'c-functions',
        subjectId: 'c',
        chapterId: 'c-ch7',
        chapterNumber: 7,
        pageNumber: 8,
        title: 'Functions, Pass-by-Value & Stack Frames',
        difficulty: 'beginner',
        definition: 'A function is a modular, reusable code block with defined input parameters and return type. C is strictly pass-by-value: functions receive copies of arguments.',
        whyItMatters: 'Stack frames store local variables and return addresses. Understanding call stacks is fundamental to preventing stack overflow crashes.',
        syntax: 'return_type function_name(param_type param_name);',
        explanation: [
          'Function prototype declares interface before definition is encountered.',
          'Stack Frame (Activation Record): Each function call pushes a frame onto the stack containing locals and the return address.',
          'When the function returns, its frame is popped from stack memory.',
          'Recursion occurs when a function calls itself, requiring a guaranteed base case to terminate.'
        ],
        example: {
          language: 'c',
          code: `int factorial(int n) {\n    if (n <= 1) return 1; // Base case\n    return n * factorial(n - 1); // Recursive step\n}\n\nint main(void) {\n    printf("5! = %d\\n", factorial(5));\n    return 0;\n}`,
          output: '5! = 120',
          annotations: [
            { line: 2, label: 'Base case stops recursion', type: 'green' },
            { line: 3, label: 'Each call creates fresh stack frame', type: 'blue' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Stack Frame Call Activation',
          subtitle: 'Recursion Frame Hierarchy',
          elements: [
            { id: '1', label: 'factorial(1)', address: '0x7ffd..00', value: 'n=1 | Return to fact(2)', status: 'active' },
            { id: '2', label: 'factorial(2)', address: '0x7ffd..20', value: 'n=2 | Return to fact(3)', status: 'normal' },
            { id: '3', label: 'factorial(3)', address: '0x7ffd..40', value: 'n=3 | Return to main()', status: 'normal' },
            { id: '4', label: 'main()', address: '0x7ffd..60', value: 'Base application frame', status: 'referenced' }
          ]
        },
        important: 'NEVER return a pointer to a local stack variable! Once the function returns, that stack frame is discarded and the pointer becomes invalid dangling memory.',
        commonMistakes: [
          'Missing a base case in recursive functions, causing an infinite loop and Stack Overflow (SIGSEGV).',
          'Expecting `void swap(int a, int b)` to modify caller variables without using pointers.'
        ],
        tip: 'Mark input parameters that should not be modified with `const` (e.g. `size_t strlen(const char *s)`).',
        interviewNote: 'What overhead does recursion introduce over iteration? (Stack frame memory allocation and function call register saving overhead).',
        practiceQuestions: [
          {
            id: 'q-c7-1',
            type: 'mcq',
            question: 'Why does C evaluate function arguments by value?',
            options: [
              'To protect caller variables from unintended mutations',
              'Because C lacks memory pointers',
              'To save RAM',
              'Compiler requirement'
            ],
            correctIndex: 0,
            explanation: 'Pass-by-value isolates function scopes by providing copies of arguments.'
          }
        ],
        relatedTopics: ['c-pointers', 'c-variables']
      }
    ]
  },
  {
    id: 'c-ch8',
    number: 8,
    title: 'Arrays & Strings',
    description: 'Contiguous memory buffers, pointer decay, and null-terminated strings',
    topics: [
      {
        id: 'c-arrays-strings',
        subjectId: 'c',
        chapterId: 'c-ch8',
        chapterNumber: 8,
        pageNumber: 9,
        title: 'Contiguous Memory Buffers & String Manipulation',
        difficulty: 'intermediate',
        definition: 'An array is a contiguous memory buffer of identical types. A string in C is simply a character array terminated by a null sentinel byte (\'\\0\').',
        whyItMatters: 'Contiguous memory leverages CPU cache lines (L1/L2), making array traversal significantly faster than pointer-chased structures.',
        syntax: 'type name[size]; | char str[] = "text";',
        explanation: [
          'Address formula: `&arr[i] = base_address + (i * sizeof(element))`.',
          'Array name decays into a pointer to its first element in expressions: `arr == &arr[0]`.',
          'C provides NO BOUNDS CHECKING: reading beyond size is a buffer overflow.',
          'String functions (<string.h>): strlen (length), strcpy (copy), strcat (concatenate), strcmp (compare).'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s1[20] = "CODE";\n    char s2[] = "INK";\n    strcat(s1, s2);\n    printf("Joined: %s (len: %zu)\\n", s1, strlen(s1));\n    return 0;\n}`,
          output: 'Joined: CODEINK (len: 7)',
          annotations: [
            { line: 5, label: 's1 must have capacity for s2 + null byte', type: 'yellow' },
            { line: 6, label: 'strlen counts characters excluding \\0', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Null-Terminated String in RAM',
          subtitle: 'Contiguous Character Array Slots',
          elements: [
            { id: '1', label: "s1[0]", address: '0x1000', value: "'C' (0x43)", status: 'active' },
            { id: '2', label: "s1[1]", address: '0x1001', value: "'O' (0x4F)", status: 'active' },
            { id: '3', label: "s1[2]", address: '0x1002', value: "'D' (0x44)", status: 'active' },
            { id: '4', label: "s1[3]", address: '0x1003', value: "'E' (0x45)", status: 'active' },
            { id: '5', label: "s1[4]", address: '0x1004', value: "'\\0' (Null Byte 0x00)", status: 'referenced' }
          ]
        },
        important: 'String comparison in C cannot be done with `s1 == s2` (this only compares pointers/addresses!). Always use `strcmp(s1, s2) == 0`.',
        commonMistakes: [
          'Forgetting that `"Hello"` requires 6 bytes in memory (5 characters + 1 null terminator).',
          'Using `strcpy` without ensuring the target buffer is large enough (use `strncpy` or bounds check).'
        ],
        tip: 'Inside functions, `sizeof(array_param)` yields the pointer size (8 bytes), NOT the array capacity. Always pass array length as a companion parameter.',
        interviewNote: 'What does `strcmp` return? (<0 if s1 < s2, 0 if equal, >0 if s1 > s2 in lexicographical order).',
        practiceQuestions: [
          {
            id: 'q-c8-1',
            type: 'mcq',
            question: 'How many bytes are required in memory to store the string literal `"CODE"`?',
            options: ['4 bytes', '5 bytes', '8 bytes', '3 bytes'],
            correctIndex: 1,
            explanation: 'The string literal `"CODE"` consists of 4 ASCII letters plus 1 trailing null byte `\\0`.'
          }
        ],
        relatedTopics: ['c-pointers', 'c-variables']
      }
    ]
  },
  {
    id: 'c-ch9',
    number: 9,
    title: 'Pointers & Memory Addresses',
    description: 'Direct memory addresses, dereferencing, pointer math, and double pointers',
    topics: [
      {
        id: 'c-pointers',
        subjectId: 'c',
        chapterId: 'c-ch9',
        chapterNumber: 9,
        pageNumber: 10,
        title: 'Pointers & Direct Hardware Addressing',
        difficulty: 'intermediate',
        definition: 'A pointer is a variable that stores the memory address of another variable. The address-of operator (&) extracts an address, and the dereference operator (*) accesses the value stored at that address.',
        whyItMatters: 'Pointers give C its unmatched performance: they permit pass-by-reference simulation, dynamic memory management, hardware I/O mapping, and efficient data structures.',
        syntax: 'type *pointer_name = &variable;',
        explanation: [
          'Declaration: `int *ptr = &val;` records the physical address where val resides.',
          'Dereference: `*ptr = 100;` directly mutates the value stored at that address.',
          'Pointer arithmetic: `ptr + 1` advances the address by `sizeof(type)` bytes automatically.',
          'NULL pointer: points to address 0, signifying no valid target.'
        ],
        example: {
          language: 'c',
          code: `int val = 42;\nint *ptr = &val;\n\n*ptr += 8; // Mutate via pointer\n\nprintf("val: %d at %p\\n", val, (void*)ptr);`,
          output: 'val: 50 at 0x7ffee4b2a8',
          annotations: [
            { line: 2, label: '& gets address of val', type: 'blue' },
            { line: 4, label: '* dereferences memory cell', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Pointer Indirection Visualization',
          subtitle: 'Pointer variable storing address of target variable',
          elements: [
            { id: '1', label: 'ptr (int*)', address: '0x7ffd..00', value: '0x7ffd..24', sublabel: 'holds address of val', status: 'active', arrowTo: '2' },
            { id: '2', label: 'val (int)', address: '0x7ffd..24', value: '50', sublabel: 'target data cell', status: 'referenced' }
          ]
        },
        important: 'Dereferencing a NULL or uninitialized wildcard pointer causes an immediate hardware exception: Segmentation Fault (SIGSEGV).',
        commonMistakes: [
          'Writing `int* a, b;` thinking both are pointers (only `a` is a pointer; `b` is an int). Write `int *a, *b;`.',
          'Confusing `*ptr` (value) with `ptr` (address).'
        ],
        tip: 'Always initialize pointers upon declaration: `int *p = NULL;`. In C, `free(NULL)` is safely a no-op.',
        interviewNote: 'What is a Dangling Pointer? (A pointer pointing to memory that has already been freed or popped from the stack).',
        practiceQuestions: [
          {
            id: 'q-c9-1',
            type: 'mcq',
            question: 'If `int x = 20; int *p = &x;`, what is the expression `*p` evaluating to?',
            options: ['The address of x', 'The integer value 20', 'The address of p', 'NULL'],
            correctIndex: 1,
            explanation: 'The dereference operator `*` accesses the value stored at the address pointed to by `p`.'
          }
        ],
        relatedTopics: ['c-dynamic-memory', 'c-functions']
      }
    ]
  },
  {
    id: 'c-ch10',
    number: 10,
    title: 'Dynamic Memory Allocation',
    description: 'Heap allocation mechanics, malloc, calloc, realloc, free, and leaks',
    topics: [
      {
        id: 'c-dynamic-memory',
        subjectId: 'c',
        chapterId: 'c-ch10',
        chapterNumber: 10,
        pageNumber: 11,
        title: 'Heap Allocation: malloc, calloc, realloc & free',
        difficulty: 'intermediate',
        definition: 'Dynamic memory allows programs to request heap memory from the operating system kernel at runtime when data sizes cannot be predicted at compile time.',
        whyItMatters: 'Stack memory is fixed and small (~8MB). The Heap manages large datasets, dynamic arrays, linked structures, and persistent memory.',
        syntax: 'void* malloc(size_t bytes); free(void* ptr);',
        explanation: [
          'malloc(size): reserves contiguous bytes on heap; returns uninitialized memory.',
          'calloc(n, size): reserves and automatically zeroes out all allocated memory.',
          'realloc(ptr, new_size): expands or shrinks an existing heap block.',
          'free(ptr): returns allocated heap block back to the operating system memory manager.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = malloc(3 * sizeof(int));\n    if (!arr) return 1; // Always verify allocation!\n\n    arr[0] = 10; arr[1] = 20; arr[2] = 30;\n    printf("Element: %d\\n", arr[1]);\n\n    free(arr);\n    arr = NULL; // Prevent dangling pointer\n    return 0;\n}`,
          output: 'Element: 20',
          annotations: [
            { line: 5, label: 'malloc takes total byte size', type: 'blue' },
            { line: 6, label: 'Always check for NULL if OS is OOM', type: 'red' },
            { line: 11, label: 'free releases heap block to OS', type: 'yellow' },
            { line: 12, label: 'Setting to NULL prevents dangling access', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Virtual Address Space: Stack vs Heap',
          subtitle: 'Process Memory Regions',
          elements: [
            { id: '1', label: 'Stack (grows DOWN)', address: 'High RAM', value: 'Local frames, auto free', status: 'normal' },
            { id: '2', label: 'Unallocated Gap', address: '...', value: 'Dynamic expansion area', status: 'normal' },
            { id: '3', label: 'Heap (grows UP)', address: 'Low RAM', value: 'malloc / calloc (manual free)', status: 'active' },
            { id: '4', label: 'Data & BSS', address: 'Static', value: 'Globals & static vars', status: 'normal' },
            { id: '5', label: 'Text Segment', address: 'Lowest', value: 'Compiled machine code', status: 'referenced' }
          ]
        },
        important: 'Every malloc() or calloc() must have exactly ONE corresponding free(). Omitting free causes a Memory Leak; calling free twice causes a Double Free crash.',
        commonMistakes: [
          'Overwriting `ptr = realloc(ptr, size);`: if realloc fails, ptr is overwritten with NULL, permanently leaking original memory.',
          'Using a pointer after calling `free(ptr)` (use-after-free vulnerability).'
        ],
        tip: 'Immediately set pointers to NULL after freeing them: `free(ptr); ptr = NULL;`.',
        interviewNote: 'What is the difference between malloc and calloc? (malloc leaves memory uninitialized; calloc clears all bits to zero).',
        practiceQuestions: [
          {
            id: 'q-c10-1',
            type: 'mcq',
            question: 'What does `malloc()` return if the operating system is completely out of available RAM?',
            options: ['0', 'NULL pointer', 'Throws OutOfMemory exception', 'Reboots CPU'],
            correctIndex: 1,
            explanation: 'malloc returns NULL when memory allocation fails. Callers must always verify the returned pointer before dereferencing.'
          }
        ],
        relatedTopics: ['c-pointers', 'c-structures']
      }
    ]
  },
  {
    id: 'c-ch11',
    number: 11,
    title: 'Structures & Unions',
    description: 'Custom heterogeneous records, struct alignment padding, and unions',
    topics: [
      {
        id: 'c-structures',
        subjectId: 'c',
        chapterId: 'c-ch11',
        chapterNumber: 11,
        pageNumber: 12,
        title: 'struct, Memory Padding & Unions',
        difficulty: 'intermediate',
        definition: 'A structure is a user-defined compound type grouping multiple variables of diverse types under a single memory block. Hardware alignment rules cause compilers to insert padding bytes.',
        whyItMatters: 'Structures are the backbone of systems programming, forming packet headers, OS process control blocks, database records, and custom models.',
        syntax: 'struct Name { type member1; ... };',
        explanation: [
          'Dot operator (`.`): accesses members on an instance: `student.gpa = 3.9;`.',
          'Arrow operator (`->`): accesses members through a pointer: `ptr->gpa` is shorthand for `(*ptr).gpa`.',
          'Alignment Padding: CPUs read 32-bit or 64-bit word boundaries for speed. Compilers insert silent pad bytes between mismatched members.',
          'Unions: allocate memory only for their largest single member; all fields share the same memory starting address.'
        ],
        example: {
          language: 'c',
          code: `typedef struct {\n    char id;      // 1 byte (+ 3 pad)\n    int score;    // 4 bytes\n    double ratio; // 8 bytes\n} Metric;\n\nMetric m = {'A', 95, 0.85};\nMetric *p = &m;\nprintf("ID: %c, Score: %d, Size: %zu\\n", p->id, p->score, sizeof(Metric));`,
          output: 'ID: A, Score: 95, Size: 16',
          annotations: [
            { line: 1, label: 'typedef creates clean alias', type: 'blue' },
            { line: 8, label: 'Arrow operator dereferences pointer', type: 'green' },
            { line: 9, label: 'Size is 16 bytes due to padding, not 13!', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Structure Memory Padding Alignment',
          subtitle: 'Why 1 + 4 + 8 = 16 bytes in RAM',
          elements: [
            { id: '1', label: 'char id', address: 'Offset 0x00', value: '1 Byte', status: 'active' },
            { id: '2', label: 'Padding', address: 'Offset 0x01-0x03', value: '3 Pad Bytes', status: 'warning' },
            { id: '3', label: 'int score', address: 'Offset 0x04-0x07', value: '4 Bytes', status: 'normal' },
            { id: '4', label: 'double ratio', address: 'Offset 0x08-0x0F', value: '8 Bytes', status: 'normal' }
          ]
        },
        important: 'Order struct members from largest to smallest type (double -> int -> char) to minimize compiler padding overhead.',
        commonMistakes: [
          'Writing `*p.member` instead of `(*p).member` or `p->member` (`.` has higher precedence than `*`).',
          'Comparing two struct instances with `memcmp()` (uninitialized padding bytes can differ even if members are identical).'
        ],
        tip: 'Use `typedef struct Name { ... } Name;` to avoid writing `struct Name` repeatedly throughout your code.',
        interviewNote: 'What is the primary difference between a struct and a union? (In a struct, all members have unique memory offsets; in a union, all members share the same starting address).',
        practiceQuestions: [
          {
            id: 'q-c11-1',
            type: 'mcq',
            question: 'If `p` is a pointer to a struct, which operator is shorthand for `(*p).field`?',
            options: ['p.field', 'p->field', 'p::field', '&p.field'],
            correctIndex: 1,
            explanation: 'The arrow operator `->` dereferences the pointer and accesses the member.'
          }
        ],
        relatedTopics: ['c-pointers', 'c-dynamic-memory']
      }
    ]
  },
  {
    id: 'c-ch12',
    number: 12,
    title: 'Enums & Typedefs',
    description: 'Enumerated constants, state machines, and descriptive type aliases',
    topics: [
      {
        id: 'c-enums-typedefs',
        subjectId: 'c',
        chapterId: 'c-ch12',
        chapterNumber: 12,
        pageNumber: 13,
        title: 'Enums & Type Aliasing with typedef',
        difficulty: 'beginner',
        definition: 'An enumeration (enum) is a user-defined type consisting of named integral constants. typedef assigns an alternative semantic identifier to existing types.',
        whyItMatters: 'Enums replace error-prone "magic numbers" with self-documenting state machine codes, improving code safety and readability.',
        syntax: 'enum State { IDLE, RUNNING, FINISHED }; typedef old_type new_name;',
        explanation: [
          'By default, enum values start at 0 and increment by 1 for each successive item.',
          'Explicit initializers can override default numbering: `enum Mode { READ = 1, WRITE = 2, EXEC = 4 };`.',
          'typedef simplifies complex declarations, notably function pointers and struct types.'
        ],
        example: {
          language: 'c',
          code: `typedef enum {\n    STATUS_OK = 200,\n    STATUS_NOT_FOUND = 404,\n    STATUS_ERROR = 500\n} HttpStatus;\n\nHttpStatus s = STATUS_OK;\nprintf("Status Code: %d\\n", s);`,
          output: 'Status Code: 200',
          annotations: [
            { line: 1, label: 'Enums evaluate to integral constants', type: 'blue' }
          ]
        },
        important: 'Enums in C are treated as standard integers by the compiler and are not type-checked as strictly as in C++ or Rust.',
        commonMistakes: [
          'Confusing `#define` with `typedef` (typedef is parsed by the compiler; #define is a textual preprocessor token).',
          'Duplicate enumeration names within the same global scope.'
        ],
        tip: 'Prefix enum identifiers with their category name (e.g. `ERR_TIMEOUT`, `ERR_NOT_FOUND`) to prevent global namespace collisions.',
        interviewNote: 'Does an enum variable consume memory? (Yes, typically `sizeof(int)` = 4 bytes to store its current value).',
        practiceQuestions: [
          {
            id: 'q-c12-1',
            type: 'mcq',
            question: 'What is the default integer value of the first item in an uninitialized C enum?',
            options: ['1', '0', '-1', 'Undefined'],
            correctIndex: 1,
            explanation: 'In C, enum members start at 0 by default and increment sequentially by 1.'
          }
        ],
        relatedTopics: ['c-structures', 'c-conditionals']
      }
    ]
  },
  {
    id: 'c-ch13',
    number: 13,
    title: 'File Handling & Disk I/O',
    description: 'Streams, FILE pointers, buffered I/O, binary reads/writes, and EOF',
    topics: [
      {
        id: 'c-file-handling',
        subjectId: 'c',
        chapterId: 'c-ch13',
        chapterNumber: 13,
        pageNumber: 14,
        title: 'FILE Pointers, fopen, fclose & Stream I/O',
        difficulty: 'intermediate',
        definition: 'File handling allows C programs to persist data to non-volatile disk storage via the FILE stream handle defined in `<stdio.h>`.',
        whyItMatters: 'All Unix systems treat files, devices, pipes, and sockets through a unified file descriptor stream model.',
        syntax: 'FILE *fp = fopen("filename", "mode"); fclose(fp);',
        explanation: [
          'Modes: "r" (read), "w" (overwrite), "a" (append), "rb"/"wb" (binary modes).',
          'fopen returns a pointer to an allocated FILE structure or NULL on failure.',
          'fprintf / fscanf format text streams; fread / fwrite transfer raw byte buffers.',
          'fclose flushes any buffered write cache to disk and releases file descriptors.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("log.txt", "w");\n    if (!fp) { perror("fopen"); return 1; }\n\n    fprintf(fp, "CODEINK System Log: %d\\n", 101);\n    fclose(fp);\n    printf("File written successfully.\\n");\n    return 0;\n}`,
          output: 'File written successfully.',
          annotations: [
            { line: 4, label: 'Open in write mode (truncates file)', type: 'blue' },
            { line: 5, label: 'Always check for NULL if file cannot be opened', type: 'red' },
            { line: 8, label: 'Flushes cache and closes OS file handle', type: 'green' }
          ]
        },
        important: 'Failing to call `fclose(fp)` causes file descriptor leaks. In long-running services, this exhausts the OS file descriptor limit.',
        commonMistakes: [
          'Using "w" mode expecting to append (w truncates existing files; use "a" to append).',
          'Storing the return value of `fgetc()` in a `char` instead of an `int` (can never equal EOF on unsigned systems).'
        ],
        tip: 'Always use binary mode ("rb" / "wb") when reading or writing non-text files like images or binary structs.',
        interviewNote: 'Why is EOF defined as -1? (Because valid byte characters range 0–255; EOF must be outside this byte range, requiring an int to hold both).',
        practiceQuestions: [
          {
            id: 'q-c13-1',
            type: 'mcq',
            question: 'What does `fopen` return if the requested file cannot be opened?',
            options: ['0', 'NULL pointer', '-1', 'Throws FileNotFound exception'],
            correctIndex: 1,
            explanation: 'fopen returns NULL on failure and sets the `errno` global code.'
          }
        ],
        relatedTopics: ['c-io', 'c-pointers']
      }
    ]
  },
  {
    id: 'c-ch14',
    number: 14,
    title: 'Preprocessor & Macros',
    description: 'Header inclusion, macro substitution, and conditional compilation guards',
    topics: [
      {
        id: 'c-preprocessor',
        subjectId: 'c',
        chapterId: 'c-ch14',
        chapterNumber: 14,
        pageNumber: 15,
        title: 'Preprocessor Macros & Include Guards',
        difficulty: 'intermediate',
        definition: 'The C Preprocessor executes before the compiler parses syntax. It performs text substitution, expands macros, and controls conditional compilation directives.',
        whyItMatters: 'Header guards (#ifndef / #define) prevent duplicate symbol declarations when header files are included multiple times across large codebases.',
        syntax: '#define NAME value | #ifdef DEBUG ... #endif',
        explanation: [
          '#include <file>: searches system standard library directories.',
          '#include "file": searches local project directories first.',
          'Macro functions: `#define MIN(a, b) ((a) < (b) ? (a) : (b))`.',
          'Include Guards: `#ifndef HEADER_H #define HEADER_H ... #endif`.'
        ],
        example: {
          language: 'c',
          code: `#define SQUARE(x) ((x) * (x))\n\nint a = 5;\nprintf("Square: %d\\n", SQUARE(a + 1)); // ((5 + 1) * (5 + 1)) = 36`,
          output: 'Square: 36',
          annotations: [
            { line: 1, label: 'Double parentheses prevent operator precedence bugs', type: 'green' }
          ]
        },
        important: 'Always wrap macro arguments and the overall expression in parentheses. Without parentheses, `x * x` with `2 + 3` evaluates to `2 + 3 * 2 + 3 = 11` instead of 25!',
        commonMistakes: [
          'Passing expressions with side effects into macros: `SQUARE(i++)` increments i twice!',
          'Placing a semicolon at the end of `#define MAX 100;` causing syntax errors.'
        ],
        tip: 'Prefer `static inline` functions over complex macro functions in modern C: they provide type safety and avoid double evaluation.',
        interviewNote: 'What does the `#` and `##` preprocessor operator do? (`#` converts argument to string literal; `##` concatenates two tokens).',
        practiceQuestions: [
          {
            id: 'q-c14-1',
            type: 'mcq',
            question: 'What is the purpose of `#ifndef HEADER_H ... #endif` in a C header file?',
            options: [
              'To speed up CPU clock rate',
              'To prevent multiple inclusion duplicate type definitions',
              'To allocate heap memory',
              'To encrypt code'
            ],
            correctIndex: 1,
            explanation: 'Header guards ensure the contents of a header file are only compiled once per translation unit.'
          }
        ],
        relatedTopics: ['c-compilation', 'c-constants']
      }
    ]
  },
  {
    id: 'c-ch15',
    number: 15,
    title: 'Storage Classes',
    description: 'Variable lifetime, visibility scope, auto, static, extern, and register',
    topics: [
      {
        id: 'c-storage-classes',
        subjectId: 'c',
        chapterId: 'c-ch15',
        chapterNumber: 15,
        pageNumber: 16,
        title: 'Storage Classes: auto, static, extern & register',
        difficulty: 'intermediate',
        definition: 'Storage classes in C determine the scope (visibility), lifetime (duration in memory), and linkage of variables and functions.',
        whyItMatters: 'Using `static` restricts symbols to their own file, preventing accidental name collisions in multi-developer codebases.',
        syntax: 'static int counter = 0; extern int global_state;',
        explanation: [
          'auto: default for local stack variables. Created on call, destroyed on return.',
          'static (local): persists its value between function invocations across the program lifetime.',
          'static (global): restricts visibility of variable or function to its defining .c file (internal linkage).',
          'extern: informs compiler that variable is defined in another translation unit.',
          'register: hints compiler to store variable directly in CPU register for fast loop access.'
        ],
        example: {
          language: 'c',
          code: `void hitCounter(void) {\n    static int count = 0; // Initialized once\n    count++;\n    printf("Call #%d\\n", count);\n}\n\nint main(void) {\n    hitCounter();\n    hitCounter();\n    return 0;\n}`,
          output: 'Call #1\nCall #2',
          annotations: [
            { line: 2, label: 'static local preserves value between calls', type: 'yellow' }
          ]
        },
        important: 'Static local variables are initialized only ONCE at program startup in the data segment, not on every function invocation.',
        commonMistakes: [
          'Using `extern` with an initializer inside a header file (causes multiple definition linker errors).',
          'Taking the address `&var` of a `register` variable (compilers disallow addresses of CPU registers).'
        ],
        tip: 'Make all private helper functions in your .c files `static` to hide them from the global symbol table.',
        interviewNote: 'Where do static variables live in memory? (In the initialized .data segment if initialized with non-zero, or in .bss if zero-initialized).',
        practiceQuestions: [
          {
            id: 'q-c15-1',
            type: 'mcq',
            question: 'What happens to the value of a `static int count = 0;` variable inside a function when the function returns?',
            options: [
              'It is destroyed from the stack',
              'Its value is preserved in memory for the next invocation',
              'It resets to zero',
              'It causes a memory leak'
            ],
            correctIndex: 1,
            explanation: 'Static local variables reside in static data memory and maintain their state across all function calls.'
          }
        ],
        relatedTopics: ['c-functions', 'c-variables']
      }
    ]
  },
  {
    id: 'c-ch16',
    number: 16,
    title: 'Advanced C Concepts',
    description: 'Command line arguments, function pointers, memory maps, and debugging',
    topics: [
      {
        id: 'c-advanced',
        subjectId: 'c',
        chapterId: 'c-ch16',
        chapterNumber: 16,
        pageNumber: 17,
        title: 'Function Pointers, Callbacks & Command Line argc/argv',
        difficulty: 'advanced',
        definition: 'Function pointers store the starting address of executable binary code in memory, allowing functions to be passed dynamically as parameters (callbacks) or stored in tables.',
        whyItMatters: 'Function pointers implement polymorphism, event handlers, and sorting comparison functions like standard `qsort()`.',
        syntax: 'return_type (*func_ptr_name)(param_types);',
        explanation: [
          'argc: argument count passed via command line (always at least 1; argv[0] is program name).',
          'argv: array of null-terminated string pointers representing CLI flags.',
          'Function pointers store entry addresses in the Text/Code segment.',
          'Example: `qsort(arr, n, sizeof(int), compareFunc);`.'
        ],
        example: {
          language: 'c',
          code: `int add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint compute(int x, int y, int (*operation)(int, int)) {\n    return operation(x, y);\n}\n\nint main(void) {\n    printf("Add: %d\\n", compute(3, 4, add));\n    printf("Mul: %d\\n", compute(3, 4, multiply));\n    return 0;\n}`,
          output: 'Add: 7\nMul: 12',
          annotations: [
            { line: 4, label: 'operation parameter is a function pointer callback', type: 'blue' }
          ]
        },
        important: 'In `int (*fp)(int)`, the parentheses around `*fp` are mandatory. Without them, `int *fp(int)` declares a function returning a pointer to an int!',
        commonMistakes: [
          'Assuming `argv[argc]` contains valid text (argv[argc] is guaranteed to be NULL).',
          'Calling an uninitialized function pointer causing an instruction fetch Segmentation Fault.'
        ],
        tip: 'Use `typedef` to define clean function pointer signatures: `typedef int (*BinaryOp)(int, int);`.',
        interviewNote: 'How does C implement object-oriented virtual method tables (vtables)? (Using arrays of function pointers inside structures).',
        practiceQuestions: [
          {
            id: 'q-c16-1',
            type: 'mcq',
            question: 'What is the type of `argv` in `int main(int argc, char *argv[])`?',
            options: ['Array of characters', 'Array of pointers to char strings', 'Integer address', 'File pointer'],
            correctIndex: 1,
            explanation: '`argv` is an array of null-terminated character string pointers representing command-line tokens.'
          }
        ],
        relatedTopics: ['c-pointers', 'c-functions']
      }
    ]
  },
  {
    id: 'c-ch17',
    number: 17,
    title: 'Data Structures in C',
    description: 'Singly linked lists, stack, queue, binary search tree, and node chaining',
    topics: [
      {
        id: 'c-data-structures',
        subjectId: 'c',
        chapterId: 'c-ch17',
        chapterNumber: 17,
        pageNumber: 18,
        title: 'Linked Lists, Stacks & Queues in C',
        difficulty: 'advanced',
        definition: 'Data structures organize memory for optimal algorithmic traversal. In C, dynamic data structures chain heap nodes together via explicit pointers.',
        whyItMatters: 'Writing linked lists, stacks, and trees in raw C teaches pointers, heap allocation, memory lifetime, and cache locality like nothing else.',
        syntax: 'struct Node { int data; struct Node *next; };',
        explanation: [
          'Linked List: nodes allocated on heap connected by next pointers (O(1) insert at head).',
          'Stack: Last-In First-Out (LIFO) structure with push() and pop() operations.',
          'Queue: First-In First-Out (FIFO) structure with enqueue() and dequeue() operations.',
          'Trees: hierarchical node structures connected by left and right child pointers.'
        ],
        example: {
          language: 'c',
          code: `typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nvoid push(Node **head, int val) {\n    Node *newNode = malloc(sizeof(Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}`,
          output: 'Node pushed to stack head in O(1)',
          annotations: [
            { line: 6, label: 'Double pointer Node** modifies caller head', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Linked List Heap Node Chaining',
          subtitle: 'Scattered Heap Blocks Connected by Pointers',
          elements: [
            { id: '1', label: 'Head Node', address: '0x3000', value: 'data: 10', arrowTo: '2', status: 'active' },
            { id: '2', label: 'Second Node', address: '0x8400', value: 'data: 20', arrowTo: '3', status: 'normal' },
            { id: '3', label: 'Tail Node', address: '0x1200', value: 'data: 30', arrowTo: '4', status: 'normal' },
            { id: '4', label: 'NULL', address: '0x0', value: 'End of List', status: 'referenced' }
          ]
        },
        important: 'Always use a temporary pointer `Node *curr = head;` when traversing a linked list. Modifying `head = head->next;` directly will permanently lose the start of the list in memory.',
        commonMistakes: [
          'Memory leak: freeing a linked list node before saving `node->next` (`free(node); node = node->next;` loses access to next!).',
          'Not setting `newNode->next = NULL` on the tail node.'
        ],
        tip: 'To free an entire linked list safely: `Node *tmp; while (head) { tmp = head->next; free(head); head = tmp; }`.',
        interviewNote: 'How do you detect a cycle in a linked list? (Floyd’s Cycle-Finding Algorithm: slow and fast two-pointer technique).',
        practiceQuestions: [
          {
            id: 'q-c17-1',
            type: 'mcq',
            question: 'What is the time complexity of inserting a new node at the head of a singly linked list with a known head pointer?',
            options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
            correctIndex: 1,
            explanation: 'Inserting at head requires only pointer reassignment without shifting any elements, which takes constant time O(1).'
          }
        ],
        relatedTopics: ['c-pointers', 'c-dynamic-memory']
      }
    ]
  }
];
