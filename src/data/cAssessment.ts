import { FinalAssessment } from '../types/notebook';

export const C_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'c',
  title: 'C Programming Comprehensive Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Foundations & Syntax Precision',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'c-a1',
          section: 'A',
          marks: 1,
          topic: 'Compilation Pipeline',
          question: 'Which tool in the C translation suite expands `#define` macros and processes `#include` directives before parsing?',
          options: ['Assembler', 'Preprocessor', 'Linker', 'Loader'],
          correctIndex: 1,
          explanation: 'The C Preprocessor operates as a text-substitution pass expanding macros and including header files prior to actual compiler parsing.'
        },
        {
          id: 'c-a2',
          section: 'A',
          marks: 1,
          topic: 'sizeof Operator',
          question: 'What is guaranteed by ANSI/ISO C regarding the evaluate time of `sizeof(expression)` in standard compile paths?',
          options: [
            'Evaluated at runtime via CPU register checks',
            'Evaluated at compile-time with zero runtime CPU cost',
            'Evaluated by the operating system memory manager',
            'Evaluated during dynamic linking'
          ],
          correctIndex: 1,
          explanation: 'sizeof is a compile-time operator. Its operand expression is not executed at runtime (except for C99 variable-length arrays).'
        },
        {
          id: 'c-a3',
          section: 'A',
          marks: 1,
          topic: 'Truth in C',
          question: 'In C, what boolean truth value is assigned to the evaluation of `if (-100)`?',
          options: ['False, because it is negative', 'True, because it is non-zero', 'Undefined behavior', 'Syntax error'],
          correctIndex: 1,
          explanation: 'In C, integer 0 evaluates to false; any non-zero integer (positive or negative) evaluates to true.'
        },
        {
          id: 'c-a4',
          section: 'A',
          marks: 1,
          topic: 'Format Specifiers',
          question: 'Which `printf` format specifier is standard for printing values of type `size_t`?',
          options: ['%d', '%ld', '%zu', '%u'],
          correctIndex: 2,
          explanation: 'C99 standardized `%zu` specifically for platform-independent printing of unsigned `size_t` values.'
        },
        {
          id: 'c-a5',
          section: 'A',
          marks: 1,
          topic: 'Identifiers',
          question: 'Which of the following is an invalid identifier in ANSI C?',
          options: ['_totalScore', 'counter2', '2nd_value', '__internal_val'],
          correctIndex: 2,
          explanation: 'Identifiers in C must begin with an alphabetic character or underscore, never a numeric digit.'
        },
        {
          id: 'c-a6',
          section: 'A',
          marks: 1,
          topic: 'Short-Circuit Logic',
          question: 'What does the expression `(0 && ++count)` do to the variable `count`?',
          options: [
            'Increments count by 1',
            'Leaves count unincremented due to logical AND short-circuiting',
            'Throws runtime division error',
            'Sets count to 0'
          ],
          correctIndex: 1,
          explanation: 'In logical AND `(&&)`, if the left-hand operand evaluates to false (0), the right-hand operand is skipped completely.'
        },
        {
          id: 'c-a7',
          section: 'A',
          marks: 1,
          topic: 'String Termination',
          question: 'What ASCII character implicitly terminates all valid string literals in C memory?',
          options: ["'\\n' (newline)", "'\\0' (null byte, ASCII 0)", "'EOF'", "'\\t' (tab)"],
          correctIndex: 1,
          explanation: 'C strings are null-terminated byte sequences ending with the sentinel character `\\0`.'
        },
        {
          id: 'c-a8',
          section: 'A',
          marks: 1,
          topic: 'NULL Pointer',
          question: 'What happens when a CPU attempts to dereference a NULL pointer address `(0x0)`?',
          options: [
            'Returns 0 silently',
            'Allocates new memory automatically',
            'Hardware memory management unit raises a Segmentation Fault (SIGSEGV)',
            'Returns garbage bits'
          ],
          correctIndex: 2,
          explanation: 'Address 0x0 is protected by operating system paging. Dereferencing triggers an MMU fault terminating the process.'
        },
        {
          id: 'c-a9',
          section: 'A',
          marks: 1,
          topic: 'Storage Classes',
          question: 'Which keyword restricts the linkage of a global variable or function strictly to its defining translation unit (.c file)?',
          options: ['extern', 'auto', 'static', 'register'],
          correctIndex: 2,
          explanation: 'When applied to file-scope variables or functions, `static` enforces internal linkage, hiding the symbol from other files.'
        },
        {
          id: 'c-a10',
          section: 'A',
          marks: 1,
          topic: 'Structures vs Unions',
          question: 'How is total memory allocated for a `union` in C?',
          options: [
            'The sum of sizes of all its declared members',
            'The size of its largest member (plus any required alignment padding)',
            'Always 8 bytes on 64-bit systems',
            'Equal to pointer size'
          ],
          correctIndex: 1,
          explanation: 'All members of a union share the same memory location, so the total memory allocated equals the largest member.'
        }
      ]
    },
    sectionB: {
      title: 'Section B: Code Tracing, Memory & Pointer Mechanics',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'c-b1',
          section: 'B',
          marks: 1,
          topic: 'Pointer Arithmetic & Arrays',
          question: 'What is the exact output of this C code snippet?',
          codeSnippet: `int arr[4] = {10, 20, 30, 40};\nint *ptr = arr;\nptr += 2;\nprintf("%d, %d", *ptr, *(arr + 1));`,
          options: ['30, 20', '20, 10', '30, 30', '40, 20'],
          correctIndex: 0,
          explanation: '`ptr += 2` moves ptr from &arr[0] to &arr[2], so `*ptr` is 30. `*(arr + 1)` dereferences index 1, which is 20.'
        },
        {
          id: 'c-b2',
          section: 'B',
          marks: 1,
          topic: 'Pass by Value vs Pointers',
          question: 'What is printed after executing `swap_attempt` below?',
          codeSnippet: `void swap_attempt(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main(void) {\n    int x = 5, y = 9;\n    swap_attempt(x, y);\n    printf("x=%d, y=%d", x, y);\n    return 0;\n}`,
          options: ['x=9, y=5', 'x=5, y=9', 'x=0, y=0', 'Compile-time error'],
          correctIndex: 1,
          explanation: 'C evaluates arguments strictly by value. Modifications inside swap_attempt only affect local stack copies, leaving x and y in main unchanged.'
        },
        {
          id: 'c-b3',
          section: 'B',
          marks: 1,
          topic: 'Post vs Pre Increment',
          question: 'Trace the output of this increment expression loop:',
          codeSnippet: `int a = 2, b = 2;\nint res = ++a * b++;\nprintf("res=%d, a=%d, b=%d", res, a, b);`,
          options: [
            'res=6, a=3, b=3',
            'res=9, a=3, b=3',
            'res=4, a=2, b=3',
            'res=6, a=2, b=2'
          ],
          correctIndex: 0,
          explanation: '`++a` pre-increments a from 2 to 3. `b++` post-increments: its current value 2 is multiplied (3 * 2 = 6), and then b becomes 3.'
        },
        {
          id: 'c-b4',
          section: 'B',
          marks: 1,
          topic: 'Structure Padding & Alignment',
          question: 'On an x86-64 LP64 system, why does `sizeof(struct Item)` evaluate to 16 bytes rather than 13 bytes?',
          codeSnippet: `struct Item {\n    char id;      // 1 byte\n    int code;     // 4 bytes\n    double price; // 8 bytes\n};`,
          options: [
            'The compiler adds 3 bytes of padding after id so code aligns on a 4-byte boundary',
            'Doubles always force minimum struct size to 32 bytes',
            'Variables in structs are always padded to 8 bytes individually',
            'The struct name takes 3 bytes'
          ],
          correctIndex: 0,
          explanation: 'For efficient 32-bit integer access, compilers insert 3 padding bytes between char (1B) and int (4B), resulting in 1 + 3 + 4 + 8 = 16 bytes.'
        },
        {
          id: 'c-b5',
          section: 'B',
          marks: 1,
          topic: 'Recursion Call Tracing',
          question: 'What is returned by calling `mystery(3, 4)`?',
          codeSnippet: `int mystery(int a, int b) {\n    if (b == 0) return 0;\n    if (b % 2 == 0) return mystery(a + a, b / 2);\n    return mystery(a + a, b / 2) + a;\n}`,
          options: ['12', '7', '81', '64'],
          correctIndex: 0,
          explanation: 'This implements Russian Peasant multiplication: mystery(3, 4) calculates 3 * 4 = 12 in O(log b) recursive steps.'
        },
        {
          id: 'c-b6',
          section: 'B',
          marks: 1,
          topic: 'Dynamic Memory & Free',
          question: 'Identify the primary bug in this dynamic memory function:',
          codeSnippet: `int* createArray(int n) {\n    int *p = malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) p[i] = i * 2;\n    free(p);\n    return p;\n}`,
          options: [
            'malloc parameter calculation is incorrect',
            'Function returns a dangling pointer because memory was freed before return',
            'The for loop causes an off-by-one buffer overflow',
            'Missing cast on malloc'
          ],
          correctIndex: 1,
          explanation: 'Calling `free(p)` relinquishes the heap allocation back to the OS. Returning `p` hands the caller a dangling pointer whose dereference is undefined behavior.'
        },
        {
          id: 'c-b7',
          section: 'B',
          marks: 1,
          topic: 'Strings & Character Arrays',
          question: 'What is the output of the following `printf`?',
          codeSnippet: `char s[] = "CODEINK";\ns[4] = '\\0';\nprintf("%zu, %s", strlen(s), s);`,
          options: ['4, CODE', '7, CODEINK', '5, CODEI', '4, CODEINK'],
          correctIndex: 0,
          explanation: 'Setting `s[4] = \'\\0\'` places a null terminator at index 4, truncating the string to "CODE" with `strlen` = 4.'
        },
        {
          id: 'c-b8',
          section: 'B',
          marks: 1,
          topic: 'Operator Precedence & Pointers',
          question: 'What is the value of `*p` after executing `*p++` vs `(*p)++`?',
          codeSnippet: `int arr[] = {10, 20};\nint *p = arr;\n(*p)++;`,
          options: [
            'arr[0] becomes 11, and p still points to arr[0]',
            'p moves to arr[1]',
            'p points to undefined memory',
            'Throws compilation error'
          ],
          correctIndex: 0,
          explanation: 'Parentheses force dereference first: `(*p)` increments the value at arr[0] from 10 to 11. Pointer p remains pointing to arr[0].'
        },
        {
          id: 'c-b9',
          section: 'B',
          marks: 1,
          topic: 'File Handling & EOF',
          question: 'Why must the return value of `fgetc(fp)` or `getchar()` be stored in an `int` rather than a `char`?',
          options: [
            'char cannot store negative values like EOF (-1) on systems where char is unsigned by default',
            'int is faster to write to disk',
            'fgetc reads 4 bytes simultaneously',
            'ANSI C forbids char assignments from files'
          ],
          correctIndex: 0,
          explanation: 'EOF is typically defined as -1. If char is unsigned (0 to 255), EOF cast to char becomes 255 and can never equal EOF, creating an infinite loop.'
        },
        {
          id: 'c-b10',
          section: 'B',
          marks: 1,
          topic: 'Bitwise Manipulation',
          question: 'What does the bitwise idiom `x & (x - 1)` accomplish for an unsigned integer `x`?',
          options: [
            'Clears the lowest set bit in x',
            'Multiplies x by 2',
            'Inverts all bits of x',
            'Tests if x is divisible by 4'
          ],
          correctIndex: 0,
          explanation: '`x & (x - 1)` clears the least significant 1-bit in x. If result is 0 (and x > 0), x was a power of 2.'
        }
      ]
    },
    sectionC: {
      title: 'Section C: Deep Architecture, Design & Systems Analysis',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'c-c1',
          section: 'C',
          marks: 1,
          topic: 'Process Virtual Memory Layout',
          question: 'Which of the following correctly describes the virtual address space layout of a C Linux process from low memory to high memory?',
          options: [
            'Text Segment (Code) → Initialized Data (.data) → BSS (.bss) → Heap (grows UP) → Stack (grows DOWN)',
            'Stack (grows UP) → Heap (grows DOWN) → Text → Data → BSS',
            'Heap → Stack → BSS → Data → Text',
            'Text → Stack → Heap → BSS → Data'
          ],
          correctIndex: 0,
          explanation: 'In standard virtual memory maps, executable binary instructions reside in the low Text segment, followed by .data and .bss, the upward-growing Heap, and the downward-growing Stack from high addresses.'
        },
        {
          id: 'c-c2',
          section: 'C',
          marks: 1,
          topic: 'Dynamic 2D Array Allocation',
          question: 'How should a 2D matrix of dimensions `R` rows and `C` columns be dynamically allocated in C to guarantee single-block cache contiguous memory?',
          codeSnippet: `// Approach 1:\nint **m = malloc(R * sizeof(int*));\nfor(int i=0; i<R; i++) m[i] = malloc(C * sizeof(int));\n\n// Approach 2:\nint *m = malloc(R * C * sizeof(int));\n// Accessed as m[r * C + c];`,
          options: [
            'Approach 2 is contiguous and avoids pointer array overhead and cache fragmentation',
            'Approach 1 is contiguous because malloc always joins consecutive blocks',
            'Both have identical hardware memory layouts',
            'Neither works in ISO C'
          ],
          correctIndex: 0,
          explanation: 'Approach 2 allocates a single flat buffer in RAM, giving perfect contiguous cache locality. Approach 1 scatters R independent row buffers across the heap.'
        },
        {
          id: 'c-c3',
          section: 'C',
          marks: 1,
          topic: 'Function Pointers & Callbacks',
          question: 'What is the correct syntax to declare a variable `cb` that stores a pointer to a function taking two `int` parameters and returning `void`?',
          options: [
            'void (*cb)(int, int);',
            'void *cb(int, int);',
            'void cb*(int, int);',
            '(*void cb)(int, int);'
          ],
          correctIndex: 0,
          explanation: '`void (*cb)(int, int);` wraps `*cb` in parentheses so the pointer applies to the identifier rather than the return type.'
        },
        {
          id: 'c-c4',
          section: 'C',
          marks: 1,
          topic: 'realloc Memory Safety',
          question: 'Why is `ptr = realloc(ptr, new_size);` considered an anti-pattern in production systems programming?',
          options: [
            'If realloc fails, it returns NULL while leaving the original memory intact; reassigning ptr causes a permanent memory leak',
            'realloc cannot expand heap memory',
            'realloc frees ptr automatically on failure',
            'realloc is only valid for char arrays'
          ],
          correctIndex: 0,
          explanation: 'If `realloc` fails due to lack of RAM, it returns NULL without freeing the original buffer. Overwriting `ptr` immediately with NULL permanently leaks the original memory block.'
        },
        {
          id: 'c-c5',
          section: 'C',
          marks: 1,
          topic: 'Macro Safety & Pitfalls',
          question: 'Why must macro parameters always be wrapped in parentheses, e.g. `#define SQUARE(x) ((x) * (x))`?',
          codeSnippet: `#define BAD_SQUARE(x) x * x\nint val = BAD_SQUARE(2 + 3);`,
          options: [
            'Without parentheses, 2 + 3 * 2 + 3 evaluates to 2 + 6 + 3 = 11 instead of 25 due to operator precedence',
            'Compilers fail with syntax error without parentheses',
            'Parentheses allocate stack registers for macros',
            'It prevents macro recursion'
          ],
          correctIndex: 0,
          explanation: 'C preprocessor performs textual expansion. `BAD_SQUARE(2 + 3)` becomes `2 + 3 * 2 + 3 = 11`. Wrapping as `((2 + 3) * (2 + 3))` yields 25.'
        },
        {
          id: 'c-c6',
          section: 'C',
          marks: 1,
          topic: 'Pointer to Pointer (Double Pointers)',
          question: 'When implementing a linked list `insertAtHead` function in C, why is `Node **head` required instead of `Node *head`?',
          codeSnippet: `void insertAtHead(Node **head, int val) {\n    Node *newNode = malloc(sizeof(Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}`,
          options: [
            'Because C is pass-by-value: to modify the caller\'s head pointer, its address (&head) must be passed',
            'Double pointers are required by malloc',
            'Node * cannot store struct addresses',
            'To enable garbage collection'
          ],
          correctIndex: 0,
          explanation: 'To modify any variable in the caller—including a pointer variable—you must pass a pointer to that variable (`Node **head`).'
        },
        {
          id: 'c-c7',
          section: 'C',
          marks: 1,
          topic: 'Signal Safety & Undefined Behavior',
          question: 'Which of the following actions produces undefined behavior in standard C?',
          options: [
            'Modifying a string literal: `char *s = "hello"; s[0] = \'H\';`',
            'Comparing two pointers pointing within the same array',
            'Calling `free(NULL)`',
            'Passing an integer 0 to exit()'
          ],
          correctIndex: 0,
          explanation: 'String literals are typically placed in read-only text segments of memory by modern compilers. Writing to them triggers immediate memory segmentation faults.'
        },
        {
          id: 'c-c8',
          section: 'C',
          marks: 1,
          topic: 'Type Casting & Aliasing',
          question: 'What is the "Strict Aliasing Rule" in modern optimizing C compilers (C99+)?',
          options: [
            'Compilers assume pointers of different types never point to the same memory location, allowing aggressive register caching',
            'All pointers must be cast to void* before dereferencing',
            'Structures cannot contain pointers to other structures',
            'Integer variables must never be cast to floating point'
          ],
          correctIndex: 0,
          explanation: 'Strict aliasing allows the optimizer to assume two pointers of incompatible types cannot alias the same location in RAM, enabling instruction reordering.'
        },
        {
          id: 'c-c9',
          section: 'C',
          marks: 1,
          topic: 'Endianness Detection',
          question: 'How does the following C idiom test whether the host CPU is Little-Endian or Big-Endian?',
          codeSnippet: `unsigned int x = 1;\nchar *c = (char*)&x;\nif (*c) printf("Little-Endian");\nelse printf("Big-Endian");`,
          options: [
            'In Little-Endian, the least significant byte (0x01) is stored at the lowest memory address &x',
            'Big-Endian stores 1 at the lowest address',
            'c points to the processor model string',
            'ANSI C prohibits casting int* to char*'
          ],
          correctIndex: 0,
          explanation: 'In 32-bit Little-Endian, 1 is stored as `01 00 00 00`. The lowest address contains `01`, so `*c == 1` confirms Little-Endian.'
        },
        {
          id: 'c-c10',
          section: 'C',
          marks: 1,
          topic: 'Volatile Keyword',
          question: 'Why is the `volatile` type qualifier critical when writing C code for hardware memory-mapped I/O or multi-threaded interrupt handlers?',
          codeSnippet: `volatile int *statusReg = (int*)0x40001000;\nwhile (*statusReg == 0) { /* wait for hardware */ }`,
          options: [
            'It tells the compiler that the variable can change unexpectedly from outside, preventing the loop from being optimized into an infinite loop',
            'It allocates the variable on the CPU stack',
            'It locks the hardware bus exclusively',
            'It makes variable access atomic'
          ],
          correctIndex: 0,
          explanation: 'Without `volatile`, the optimizer would cache `*statusReg` in a CPU register once and turn the while loop into an infinite loop, never re-reading the physical hardware memory address.'
        }
      ]
    }
  }
};
