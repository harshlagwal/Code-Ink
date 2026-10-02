import { SubjectQuestionPapers } from '../../types/notebook';

export const C_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'c',
  subjectName: 'C Programming & Systems Engineering',
  courseCode: 'CS-101-C',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-101-C-S1',
      title: 'C Programming & Systems Architecture Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-101-C',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook / Examination Booklet.',
        'Section A (Q1 to Q10) is COMPULSORY. Each question carries 1 Mark (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions. Each question carries 5 Marks (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions. Each question carries 10 Marks (2 × 10 = 20 Marks).',
        'Draw clear memory diagrams (Stack, Heap, Data Segment) and step-by-step variable trace tables wherever applicable.',
        'Write clean, readable C code with standard ANSI/ISO headers, boundary condition checks, and explicit return types.'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark. Write precise, single-sentence answers or exact evaluation outputs in your notebook.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'c-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Compilation Pipeline',
              question: 'Explain what happens during the preprocessing phase of C compilation when the compiler encounters an `#include <stdio.h>` directive.',
              markingBreakdown: ['Accurate explanation of textual replacement and header file inclusion: 1 Mark'],
              modelSolution: 'The preprocessor opens the system library header file `stdio.h` and textually copies its entire contents (function declarations, macros, types) directly into the translation unit at the location of the directive before lexical analysis begins.',
              notebookCheckpoints: ['Mention "textual substitution/replacement"', 'Identify that it occurs before compilation/lexical analysis']
            },
            {
              id: 'c-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'sizeof Operator',
              question: 'Determine the exact output of this statement on a 64-bit architecture and justify why: `printf("%zu", sizeof(char*));`',
              markingBreakdown: ['Correct value (8) with justification: 1 Mark'],
              modelSolution: 'Output: `8`. On a 64-bit architecture, every pointer address requires 8 bytes (64 bits) regardless of the data type it points to (whether `char*`, `int*`, or `void*`).',
              notebookCheckpoints: ['Output is 8', 'Pointers on 64-bit platforms occupy 8 bytes']
            },
            {
              id: 'c-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Operator Precedence',
              question: 'Given `int x = 5, y; y = ++x * 2;`, state the final values of both `x` and `y`.',
              markingBreakdown: ['Correct values for x and y: 1 Mark'],
              modelSolution: '`x = 6`, `y = 12`. The pre-increment `++x` increases `x` from 5 to 6 first, and then the multiplication `6 * 2` yields 12 for `y`.',
              notebookCheckpoints: ['x = 6', 'y = 12', 'Pre-increment executes before multiplication']
            },
            {
              id: 'c-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Storage Classes',
              question: 'What is the scope, lifetime, and initial default value of an uninitialized `static int count;` declared inside a function body?',
              markingBreakdown: ['All three attributes correctly stated: 1 Mark'],
              modelSolution: 'Scope: Local block scope (accessible only inside the enclosing function). Lifetime: Entire program execution (stored in the BSS/Data segment). Default initial value: 0 (zero-initialized automatically).',
              notebookCheckpoints: ['Scope: Local/block', 'Lifetime: Program runtime', 'Default: 0']
            },
            {
              id: 'c-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Pointer Dereferencing',
              question: 'What is the output of the following C code snippet?\n`int a = 100; int *p = &a; *p += 50; printf("%d", a);`',
              markingBreakdown: ['Correct value (150): 1 Mark'],
              modelSolution: 'Output: `150`. Dereferencing `*p` directly modifies the memory address of `a`, increasing its stored value from 100 to 150.',
              notebookCheckpoints: ['Output is 150', 'Explain *p modifies memory of variable a']
            },
            {
              id: 'c-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'String Null-Termination',
              question: 'Why does the character array `char str[5] = "HELLO";` cause undefined behavior when passed into `strlen(str)` or `printf("%s", str)`?',
              markingBreakdown: ['Identification of missing null terminator: 1 Mark'],
              modelSolution: '`"HELLO"` contains 5 characters plus 1 null-terminator `\\0` (total 6 bytes). Defining `str[5]` leaves no room for `\\0`. Functions like `strlen` and `printf("%s")` will read past array bounds into adjacent memory looking for `\\0`.',
              notebookCheckpoints: ['Absence of \\0', 'Buffer overrun / reading past bounds']
            },
            {
              id: 'c-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Bitwise Operators',
              question: 'Evaluate the expression `(1 << 3) | (1 << 1)` in decimal.',
              markingBreakdown: ['Correct decimal value (10): 1 Mark'],
              modelSolution: '`1 << 3` evaluates to binary `1000` (8 decimal). `1 << 1` evaluates to binary `0010` (2 decimal). Performing bitwise OR `1000 | 0010` gives `1010` in binary, which is decimal `10`.',
              notebookCheckpoints: ['Binary conversion shown', 'Final decimal answer: 10']
            },
            {
              id: 'c-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Memory Allocation',
              question: 'Distinguish between `malloc()` and `calloc()` regarding their parameter signatures and memory initialization.',
              markingBreakdown: ['Differences in parameters and zero initialization: 1 Mark'],
              modelSolution: '`malloc(size_t size)` takes one argument (total bytes) and leaves memory uninitialized (garbage values). `calloc(size_t num, size_t size)` takes two arguments (element count, element size) and zero-initializes all allocated bytes.',
              notebookCheckpoints: ['Parameter difference', 'malloc = garbage, calloc = zeroed']
            },
            {
              id: 'c-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Structure Padding',
              question: 'Given `struct Data { char c; int i; };`, explain why `sizeof(struct Data)` is typically 8 bytes instead of 5 bytes on modern 32/64-bit systems.',
              markingBreakdown: ['Explanation of data alignment and padding bytes: 1 Mark'],
              modelSolution: 'Due to hardware memory alignment requirements, a 4-byte `int` must begin at an address divisible by 4. Therefore, the compiler inserts 3 padding bytes after the 1-byte `char`, making total structure size 1 + 3 + 4 = 8 bytes.',
              notebookCheckpoints: ['Natural boundary alignment', '3 padding bytes inserted']
            },
            {
              id: 'c-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'File Operations',
              question: 'Why should the return value of `fgetc(FILE *fp)` be assigned to an `int` variable instead of a `char`?',
              markingBreakdown: ['Identification of EOF (-1) representation: 1 Mark'],
              modelSolution: '`fgetc()` returns either an unsigned char (0 to 255) cast to int or the sentinel `EOF` (usually -1). If stored in `char` on platforms where `char` is unsigned, `EOF` becomes 255 and can never equal -1, causing an infinite loop.',
              notebookCheckpoints: ['EOF is -1', 'Unsigned char cannot represent -1']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Short Analytical & Implementation Problems',
          instruction: 'Attempt ANY 4 questions out of 7. Each question carries 5 Marks (4 × 5 = 20 Marks). Show complete working, trace tables, memory diagrams, or code in your notebook.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'c-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Pointer Arithmetic & Arrays',
              question: 'Consider the following code:\n```c\nint arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\nint a = *p++;\nint b = *++p;\nint c = ++*p;\nprintf("%d, %d, %d\\n", a, b, c);\n```\nConstruct a step-by-step memory pointer trace table in your notebook showing the values of `p`, `*p`, and the array elements at each line, and provide the exact printed output.',
              codeSnippet: 'int arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\nint a = *p++;\nint b = *++p;\nint c = ++*p;\nprintf("%d, %d, %d\\n", a, b, c);',
              markingBreakdown: [
                'Line 1 (`*p++`): Dereference then increment pointer -> a=10, p points to arr[1] (1.5 Marks)',
                'Line 2 (`*++p`): Increment pointer then dereference -> b=30, p points to arr[2] (1.5 Marks)',
                'Line 3 (`++*p`): Increment value at pointer -> arr[2] becomes 31, c=31 (1 Mark)',
                'Final printed output `10, 30, 31` (1 Mark)'
              ],
              modelSolution: `Trace Table:
1. Initially p = &arr[0] (value 10).
2. a = *p++: Post-increment has lower evaluation for value assignment: a receives *p (10), then p advances to &arr[1].
3. b = *++p: Pre-increment advances p to &arr[2] (pointing to 30), then dereferences: b = 30.
4. c = ++*p: Value at &arr[2] is pre-incremented from 30 to 31: arr[2] = 31, c = 31.
Printed Output: 10, 30, 31. Array is now {10, 20, 31, 40, 50}.`,
              notebookCheckpoints: [
                'Draw pointer address trace',
                'Differentiate between *p++ and *++p and ++*p',
                'Final answer: 10, 30, 31'
              ]
            },
            {
              id: 'c-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Dynamic Memory & Dangling Pointers',
              question: 'Explain what a "Dangling Pointer" and a "Memory Leak" are in C systems. Write a complete, compilable C code demonstrating how a dangling pointer is accidentally created and show the standard engineering pattern used to remediate it.',
              markingBreakdown: [
                'Definition of Dangling Pointer & Memory Leak: 2 Marks',
                'Demonstration code creating dangling pointer: 1.5 Marks',
                'Remediation pattern (`free(p); p = NULL;`): 1.5 Marks'
              ],
              modelSolution: `1. Definitions:
- Memory Leak: Heap memory allocated via malloc/calloc that is never freed, but no pointers remain to access it, depleting RAM.
- Dangling Pointer: A pointer that continues to point to a memory address after that memory has been deallocated (via free() or stack frame exit).

2. Demonstration & Fix:
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void safe_cleanup_demo(void) {
    int *ptr = (int *)malloc(sizeof(int));
    if (!ptr) return;
    *ptr = 42;
    
    // Deallocation
    free(ptr);
    // At this moment, ptr is a DANGLING POINTER!
    // Accessing *ptr is Undefined Behavior.
    
    // Remediation Pattern:
    ptr = NULL; // Zero out pointer immediately after free
    
    if (ptr != NULL) {
        *ptr = 100;
    } // Safely guarded against crash/corrupt write
}
\`\`\``,
              notebookCheckpoints: [
                'Explain undefined behavior of dereferencing freed memory',
                'Show setting pointer to NULL after free()'
              ]
            },
            {
              id: 'c-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Pass-by-Reference Simulation',
              question: 'Implement a C function `void split_time(long total_seconds, int *hr, int *min, int *sec)` that converts total elapsed seconds into hours, minutes, and seconds using pointer parameters. Also write a `main()` function demonstrating safe invocation and output display.',
              markingBreakdown: [
                'Function signature and parameter declarations: 1 Mark',
                'Math calculation for hours, minutes, seconds: 2 Marks',
                'Null pointer validation check: 1 Mark',
                'Main function demonstration: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>

void split_time(long total_seconds, int *hr, int *min, int *sec) {
    if (!hr || !min || !sec) return; // Defensive null check
    
    *hr = (int)(total_seconds / 3600);
    long remainder = total_seconds % 3600;
    *min = (int)(remainder / 60);
    *sec = (int)(remainder % 60);
}

int main(void) {
    long elapsed = 7384; // 2 hours, 3 minutes, 4 seconds
    int h = 0, m = 0, s = 0;
    
    split_time(elapsed, &h, &m, &s);
    printf("%ld seconds = %02d:%02d:%02d\\n", elapsed, h, m, s);
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'Check hr, min, sec for NULL',
                'Divide total_seconds by 3600 for hours',
                'Modulo arithmetic for remainder minutes and seconds'
              ]
            },
            {
              id: 'c-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Recursion & Stack Trace',
              question: 'Given the recursive function below, write the complete call stack trace for `mystery(3)` in your notebook, showing active stack frames, argument values, and return values at each unwinding stage:\n```c\nint mystery(int n) {\n    if (n <= 1) return 1;\n    return n * mystery(n - 1) + mystery(n - 2);\n}\n```',
              codeSnippet: 'int mystery(int n) {\n    if (n <= 1) return 1;\n    return n * mystery(n - 1) + mystery(n - 2);\n}',
              markingBreakdown: [
                'Tree/Stack trace diagram drawn: 2 Marks',
                'Base cases evaluated correctly: 1.5 Marks',
                'Final computed result (7): 1.5 Marks'
              ],
              modelSolution: `Recursion Breakdown for mystery(3):
mystery(3) = 3 * mystery(2) + mystery(1)

Evaluating mystery(1):
- Base case n <= 1: returns 1.

Evaluating mystery(2):
- mystery(2) = 2 * mystery(1) + mystery(0)
- mystery(1) returns 1
- mystery(0) returns 1 (since 0 <= 1)
- mystery(2) = 2 * 1 + 1 = 3.

Unwinding mystery(3):
- mystery(3) = 3 * (3) + (1) = 9 + 1 = 10.
Wait: let us check carefully:
mystery(2) = 2 * mystery(1) + mystery(0) = 2(1) + 1 = 3.
mystery(3) = 3 * mystery(2) + mystery(1) = 3(3) + 1 = 10.
Final Return Value = 10.`,
              notebookCheckpoints: [
                'Show branch for mystery(2) and mystery(1)',
                'Identify base condition n <= 1',
                'Final answer: 10'
              ]
            },
            {
              id: 'c-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Bitwise Engineering',
              question: 'Write two utility functions in C without using standard library headers:\n(a) `int is_power_of_two(unsigned int x)` returning 1 if x is a power of 2, 0 otherwise.\n(b) `unsigned int count_set_bits(unsigned int x)` implementing Brian Kernighan\'s algorithm.\nExplain the time complexity of both.',
              markingBreakdown: [
                'is_power_of_two implementation and zero-case handling: 2 Marks',
                'count_set_bits using x & (x - 1): 2 Marks',
                'Complexity explanation: 1 Mark'
              ],
              modelSolution: `\`\`\`c
// (a) Power of Two check in O(1)
int is_power_of_two(unsigned int x) {
    if (x == 0) return 0;
    return (x & (x - 1)) == 0;
}

// (b) Brian Kernighan's Algorithm in O(number of set bits)
unsigned int count_set_bits(unsigned int x) {
    unsigned int count = 0;
    while (x > 0) {
        x &= (x - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}
\`\`\`
Complexity:
(a) is_power_of_two runs in O(1) time and O(1) space.
(b) count_set_bits runs in O(k) time where k is the number of 1-bits (at most 32 iterations for 32-bit uint).`,
              notebookCheckpoints: [
                'Handle x == 0 in power of two check',
                'Kernighan bitwise idiom: x &= (x - 1)',
                'State complexities clearly'
              ]
            },
            {
              id: 'c-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'String Manipulation Without stdlib',
              question: 'Write a manual C function `int string_compare(const char *s1, const char *s2)` that behaves identically to standard `strcmp()`. It must return 0 if strings are identical, a negative integer if `s1 < s2`, and a positive integer if `s1 > s2`. State how null terminators are handled.',
              markingBreakdown: [
                'Loop iteration and boundary conditions: 2 Marks',
                'Correct cast to unsigned char for comparison: 2 Marks',
                'Return value specification: 1 Mark'
              ],
              modelSolution: `\`\`\`c
int string_compare(const char *s1, const char *s2) {
    // Cast to unsigned char pointer per C standard to prevent sign-extension issues
    const unsigned char *p1 = (const unsigned char *)s1;
    const unsigned char *p2 = (const unsigned char *)s2;

    while (*p1 && (*p1 == *p2)) {
        p1++;
        p2++;
    }

    return *p1 - *p2;
}
\`\`\`
Explanation:
The loop advances as long as characters match and s1 has not reached '\\0'. When a mismatch or end-of-string occurs, returning *p1 - *p2 gives 0 if both reached '\\0' simultaneously, positive if *p1 > *p2, or negative if *p1 < *p2.`,
              notebookCheckpoints: [
                'Cast to unsigned char *',
                'Check both *p1 and *p1 == *p2 in loop',
                'Return difference of mismatch characters'
              ]
            },
            {
              id: 'c-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'File I/O & Error Handling',
              question: 'Write a complete C function `long count_file_lines(const char *filepath)` that opens a text file in read mode, counts the number of newline characters (`\\n`), safely closes the file descriptor, and handles file not found errors appropriately.',
              markingBreakdown: [
                'File opening with fopen and NULL check: 1.5 Marks',
                'Character reading loop using fgetc() with int ch: 1.5 Marks',
                'Line counting and handling non-empty file without trailing newline: 1 Mark',
                'fclose() and error return code: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>

long count_file_lines(const char *filepath) {
    if (!filepath) return -1;

    FILE *fp = fopen(filepath, "r");
    if (!fp) {
        perror("Error opening file");
        return -1; // File not found or permission denied
    }

    long line_count = 0;
    int ch;
    int prev = '\\n';

    while ((ch = fgetc(fp)) != EOF) {
        if (ch == '\\n') {
            line_count++;
        }
        prev = ch;
    }

    // If file does not end in a newline but has characters, count the last line
    if (prev != '\\n' && prev != EOF) {
        line_count++;
    }

    fclose(fp);
    return line_count;
}
\`\`\``,
              notebookCheckpoints: [
                'Declare ch as int (not char)',
                'Check fopen return value against NULL',
                'Call fclose(fp) before returning'
              ]
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Systems Design',
          instruction: 'Attempt ANY 2 questions out of 3. Each question carries 10 Marks (2 × 10 = 20 Marks). Write full, production-grade implementations with error handling, memory cleanup, and time/space complexity analysis.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'c-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Data Structure: Dynamic Singly Linked List',
              question: 'Design and implement a complete dynamic Singly Linked List in C supporting integer nodes.\nYour solution must implement:\n(a) Node structure definition with `typedef`.\n(b) `void insert_sorted(Node **head, int value)` which inserts in ascending numerical order.\n(c) `int delete_value(Node **head, int value)` returning 1 if deleted, 0 if not found.\n(d) `void free_list(Node **head)` which frees all allocated nodes and sets the head pointer to NULL.\n(e) Draw the heap memory diagram showing insertion of `20` into list `{10, 30}`.',
              markingBreakdown: [
                'Node structure definition: 1 Mark',
                'insert_sorted with edge cases (empty list, head insert, middle/end): 3 Marks',
                'delete_value with proper memory free: 2.5 Marks',
                'free_list setting head to NULL: 1.5 Marks',
                'Memory layout diagram and complexity analysis: 2 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// (b) Insert in ascending sorted order
void insert_sorted(Node **head, int value) {
    if (!head) return;
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (!newNode) return;
    newNode->data = value;
    newNode->next = NULL;

    // Case 1: Empty list or insert at head
    if (*head == NULL || (*head)->data >= value) {
        newNode->next = *head;
        *head = newNode;
        return;
    }

    // Case 2: Traverse to find insertion spot
    Node *curr = *head;
    while (curr->next != NULL && curr->next->data < value) {
        curr = curr->next;
    }
    newNode->next = curr->next;
    curr->next = newNode;
}

// (c) Delete specific value
int delete_value(Node **head, int value) {
    if (!head || !*head) return 0;
    Node *curr = *head;
    Node *prev = NULL;

    if (curr->data == value) {
        *head = curr->next;
        free(curr);
        return 1;
    }

    while (curr != NULL && curr->data != value) {
        prev = curr;
        curr = curr->next;
    }

    if (!curr) return 0; // Not found

    prev->next = curr->next;
    free(curr);
    return 1;
}

// (d) Free entire list
void free_list(Node **head) {
    if (!head || !*head) return;
    Node *curr = *head;
    while (curr != NULL) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    *head = NULL;
}
\`\`\`
Memory Diagram:
[HeadPtr] -> [Node 10 | next: 0x200] -> [Node 20 | next: 0x300] -> [Node 30 | next: NULL]
Complexity:
- Insertion: O(N) time, O(1) auxiliary space.
- Deletion: O(N) time, O(1) auxiliary space.
- Freeing: O(N) time, O(1) auxiliary space.`,
              notebookCheckpoints: [
                'Handle double pointer (Node **head) correctly',
                'Guard against memory leaks in delete_value and free_list',
                'Draw pointer redirection diagram in notebook'
              ]
            },
            {
              id: 'c-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: Generic Dynamic Array (Vector)',
              question: 'In C, implement a resizable generic dynamic array (`Vector`) resembling C++ `std::vector` for integers.\n(a) Define `struct Vector` with fields `int *data`, `size_t size`, and `size_t capacity`.\n(b) `Vector* vector_create(size_t initial_capacity)`\n(c) `int vector_push(Vector *v, int value)` that doubles capacity when full using `realloc()`.\n(d) `int vector_get(const Vector *v, size_t index, int *out_val)` with bounds checking.\n(e) `void vector_destroy(Vector *v)` with zero-leak deallocation.\n(f) Explain why amortized time complexity of `vector_push` is O(1) despite geometric doubling.',
              markingBreakdown: [
                'Struct definition and vector_create: 2 Marks',
                'vector_push with safe realloc temporary pointer: 3 Marks',
                'vector_get bounds checking: 1.5 Marks',
                'vector_destroy clean deallocation: 1.5 Marks',
                'Amortized O(1) mathematical proof / explanation: 2 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} Vector;

Vector* vector_create(size_t initial_capacity) {
    if (initial_capacity == 0) initial_capacity = 4;
    Vector *v = (Vector *)malloc(sizeof(Vector));
    if (!v) return NULL;

    v->data = (int *)malloc(initial_capacity * sizeof(int));
    if (!v->data) {
        free(v);
        return NULL;
    }
    v->size = 0;
    v->capacity = initial_capacity;
    return v;
}

int vector_push(Vector *v, int value) {
    if (!v) return 0;
    if (v->size >= v->capacity) {
        size_t new_cap = v->capacity * 2;
        // Never assign realloc directly to v->data to prevent memory leak on allocation failure
        int *temp = (int *)realloc(v->data, new_cap * sizeof(int));
        if (!temp) return 0;
        v->data = temp;
        v->capacity = new_cap;
    }
    v->data[v->size++] = value;
    return 1;
}

int vector_get(const Vector *v, size_t index, int *out_val) {
    if (!v || !out_val || index >= v->size) return 0;
    *out_val = v->data[index];
    return 1;
}

void vector_destroy(Vector *v) {
    if (!v) return;
    free(v->data);
    free(v);
}
\`\`\`
Amortized O(1) Analysis:
When doubling capacity (1 -> 2 -> 4 -> 8 -> ... -> N), total elements copied over N pushes equals 1 + 2 + 4 + ... + N/2 = N - 1. Thus, N insertions cost O(N) operations total, making the average (amortized) cost per single push operation equal to O(N)/N = O(1).`,
              notebookCheckpoints: [
                'Safe realloc pattern using temporary pointer temp',
                'Check bounds index < v->size',
                'Free both v->data and v in destroy',
                'Write amortized O(1) proof'
              ]
            },
            {
              id: 'c-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Process Architecture & Memory Layout',
              question: 'Explain in comprehensive detail the virtual memory layout of a compiled C program running on a 64-bit Linux OS.\n(a) Draw an architectural ASCII memory segment diagram in your notebook showing: Text (Code), Initialized Data (.data), Uninitialized Data (.bss), Heap, Memory Mapping segment, and Stack.\n(b) Indicate which segment grows upward (toward higher addresses) and which segment grows downward (toward lower addresses).\n(c) For each of the following variable declarations, explicitly name the exact memory segment in which it resides and its initial value:\n  1. `int global_var = 10;`\n  2. `static int uninit_global;`\n  3. `void foo(void) { int local = 5; }`\n  4. `char *buf = (char *)malloc(128);`\n  5. `const char *msg = "Kernel";` (analyze both `msg` and `"Kernel"`)',
              markingBreakdown: [
                'Diagram showing all 6 memory segments accurately: 3 Marks',
                'Growth directions (Heap UP, Stack DOWN): 2 Marks',
                'Segment classification for all 5 examples (1M each): 5 Marks'
              ],
              modelSolution: `(a) Virtual Address Space Diagram:
+------------------------------------+ High Address (0x7FFFFFFFFFFF)
| Stack Segment (grows DOWN ↓)       | Local variables, return addresses
+------------------------------------+
|               ↓                    |
|        Unallocated Space           |
|               ↑                    |
+------------------------------------+
| Memory Mapping Segment (mmap)      | Shared libraries (.so)
+------------------------------------+
| Heap Segment (grows UP ↑)          | Dynamic memory (malloc/calloc)
+------------------------------------+
| BSS Segment (Uninitialized data)   | Zero-initialized static & globals
+------------------------------------+
| Initialized Data Segment (.data)   | Global/static variables with initial values
+------------------------------------+
| Text / Code Segment (Read-Only)    | Machine code instructions, string literals
+------------------------------------+ Low Address (0x000000000000)

(b) Growth Direction:
- Heap grows upward toward higher memory addresses (using brk/sbrk).
- Stack grows downward toward lower memory addresses (with each function stack frame push).

(c) Segment Identifications:
1. int global_var = 10; -> Initialized Data Segment (.data). Value: 10.
2. static int uninit_global; -> BSS Segment (.bss). Value: 0 (kernel zero-filled).
3. int local = 5; inside foo() -> Stack Segment (foo\'s activation frame). Lifetime ends on function return.
4. char *buf = malloc(128); -> The pointer variable 'buf' lives on the Stack; the 128 bytes it points to live on the Heap.
5. const char *msg = "Kernel"; -> The pointer 'msg' is on the Stack (if local) or .data; the literal string 'Kernel' is placed in the Read-Only Text/ROData Segment.`,
              notebookCheckpoints: [
                'Draw full memory hierarchy stack to text',
                'Indicate Heap grows UP, Stack grows DOWN',
                'Correctly place string literal in read-only segment'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-101-C-S2',
      title: 'C Systems & Low-Level Memory Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-101-C',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY. Each question carries 1 Mark (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions. Each question carries 5 Marks (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions. Each question carries 10 Marks (2 × 10 = 20 Marks).'
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
              id: 'c-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Variable-Length Arrays (VLAs)',
              question: 'In C99, on which memory segment are Variable-Length Arrays (e.g. `int arr[n];`) typically allocated, and what happens if `n` is excessively large?',
              markingBreakdown: ['Stack allocation and stack overflow identification: 1 Mark'],
              modelSolution: 'VLAs are allocated on the Stack at runtime. If `n` is too large, the stack limit is exceeded, triggering a Stack Overflow and immediate segmentation fault.',
              notebookCheckpoints: ['Allocated on Stack', 'Risk of Stack Overflow']
            },
            {
              id: 'c-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Endianness',
              question: 'Explain what happens when integer `0x12345678` is stored in memory on a Little-Endian processor starting at address `0x1000`.',
              markingBreakdown: ['Byte order representation: 1 Mark'],
              modelSolution: 'Little-endian stores the least significant byte first: `0x1000: 0x78`, `0x1001: 0x56`, `0x1002: 0x34`, `0x1003: 0x12`.',
              notebookCheckpoints: ['Least significant byte at lowest address']
            },
            {
              id: 'c-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Type Qualifiers: volatile',
              question: 'What is the purpose of the `volatile` type qualifier, and why is it essential when programming embedded hardware registers or shared memory?',
              markingBreakdown: ['Prevents compiler caching/optimization: 1 Mark'],
              modelSolution: '`volatile` tells the C compiler that the variable can change unexpectedly (by hardware, an interrupt handler, or another thread), forbidding the optimizer from caching its value in a CPU register.',
              notebookCheckpoints: ['Forces re-read from RAM on every access', 'Prevents compiler register caching']
            },
            {
              id: 'c-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Pointer to Constant vs Constant Pointer',
              question: 'Differentiate between `const int *p;` and `int * const p;` in terms of what can and cannot be modified.',
              markingBreakdown: ['Clear differentiation: 1 Mark'],
              modelSolution: '`const int *p`: Pointer to constant int — the pointed-to integer cannot be modified via `*p`, but the pointer address `p` itself can change. `int * const p`: Constant pointer to int — pointer address `p` cannot be reassigned, but the value `*p` can be modified.',
              notebookCheckpoints: ['const int *p = data is read-only', 'int * const p = address is read-only']
            },
            {
              id: 'c-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Macro Expansion Pitfall',
              question: 'Given `#define SQUARE(x) x * x`, evaluate the expression `SQUARE(2 + 3)` and explain why the result is not 25.',
              markingBreakdown: ['Evaluates to 11 with operator precedence explanation: 1 Mark'],
              modelSolution: 'The preprocessor performs literal textual substitution: `2 + 3 * 2 + 3`. Due to operator precedence, `3 * 2` evaluates first (6), giving `2 + 6 + 3 = 11`. To fix it, use `#define SQUARE(x) ((x) * (x))`.',
              notebookCheckpoints: ['Result is 11', 'Multiplication binds before addition']
            },
            {
              id: 'c-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Short-Circuit Evaluation',
              question: 'What is printed by: `int a = 0, b = 5; if (a && ++b) {} printf("%d, %d", a, b);`?',
              markingBreakdown: ['Correct output (0, 5): 1 Mark'],
              modelSolution: 'Output: `0, 5`. In logical AND (`&&`), if the left operand is false (0), the right operand is never evaluated (short-circuiting), so `++b` is skipped.',
              notebookCheckpoints: ['b remains 5', 'Explain short-circuiting in &&']
            },
            {
              id: 'c-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Function Pointers',
              question: 'Write the syntax declaration for a function pointer named `operation` that points to a function taking two `int` parameters and returning an `int`.',
              markingBreakdown: ['Exact syntax declaration: 1 Mark'],
              modelSolution: '`int (*operation)(int, int);` (parentheses around `*operation` are mandatory to distinguish from a function returning an `int*`).',
              notebookCheckpoints: ['int (*operation)(int, int);']
            },
            {
              id: 'c-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Union Mechanics',
              question: 'How much memory is occupied by `union Variant { char c; int i; double d; };` on a 64-bit architecture?',
              markingBreakdown: ['Size equals largest member (8 bytes): 1 Mark'],
              modelSolution: '`8 bytes`. In a union, all members share the exact same memory space. The size of the union is determined by the size of its largest member (`double d`, which is 8 bytes).',
              notebookCheckpoints: ['8 bytes', 'All members share base memory']
            },
            {
              id: 'c-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Enum Default Values',
              question: 'Given `enum Status { READY = 5, RUNNING, PAUSED = 10, STOPPED };`, what are the numerical values of `RUNNING` and `STOPPED`?',
              markingBreakdown: ['RUNNING = 6, STOPPED = 11: 1 Mark'],
              modelSolution: '`RUNNING = 6` (increments previous enum member 5 + 1), and `STOPPED = 11` (increments previous enum member 10 + 1).',
              notebookCheckpoints: ['RUNNING is 6', 'STOPPED is 11']
            },
            {
              id: 'c-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Header Guard Idiom',
              question: 'Write the 3-line preprocessor guard idiom used in header files to prevent multiple inclusion compile errors.',
              markingBreakdown: ['#ifndef, #define, #endif directives: 1 Mark'],
              modelSolution: '`#ifndef HEADER_NAME_H`\n`#define HEADER_NAME_H`\n`/* declarations */`\n`#endif /* HEADER_NAME_H */`',
              notebookCheckpoints: ['#ifndef, #define, #endif']
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
              id: 'c-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Bit Manipulation: Endianness Detection & Conversion',
              question: 'Write two C functions:\n(a) `int is_little_endian(void)` that checks the byte ordering of the CPU at runtime using a pointer or union.\n(b) `unsigned int byte_swap_32(unsigned int val)` that swaps endianness of a 32-bit unsigned integer using bitwise operations.',
              markingBreakdown: [
                'is_little_endian implementation: 2.5 Marks',
                'byte_swap_32 bitmask and shift implementation: 2.5 Marks'
              ],
              modelSolution: `\`\`\`c
// (a) Runtime Endianness check
int is_little_endian(void) {
    unsigned int x = 1;
    char *c = (char *)&x;
    return (int)(*c); // Returns 1 on Little-Endian, 0 on Big-Endian
}

// (b) 32-bit byte swap
unsigned int byte_swap_32(unsigned int val) {
    return ((val & 0x000000FF) << 24) |
           ((val & 0x0000FF00) << 8)  |
           ((val & 0x00FF0000) >> 8)  |
           ((val & 0xFF000000) >> 24);
}
\`\`\``,
              notebookCheckpoints: [
                'Cast unsigned int address to char pointer',
                'Bitmasking with shifts (24, 8, 8, 24)'
              ]
            },
            {
              id: 'c-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Double Pointers (Pointers to Pointers)',
              question: 'Explain why passing a single pointer `Node *head` into `void append(Node *head, int val)` fails to update the caller\'s head pointer when the list is initially empty. Write the corrected function signature and code using `Node **head_ref`.',
              markingBreakdown: [
                'Explanation of pass-by-value of pointer: 2 Marks',
                'Corrected implementation with Node **head_ref: 3 Marks'
              ],
              modelSolution: `In C, all arguments are passed strictly by value. When passing \`Node *head\`, a local copy of the pointer address is created inside the function. If \`head\` was NULL, assigning \`head = newNode\` only updates the local stack copy; the caller\'s pointer in main() remains NULL.

Correct implementation:
\`\`\`c
void append(Node **head_ref, int val) {
    if (!head_ref) return;
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = NULL;

    if (*head_ref == NULL) {
        *head_ref = newNode; // Modifies the caller's actual pointer
        return;
    }

    Node *last = *head_ref;
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = newNode;
}
\`\`\``,
              notebookCheckpoints: [
                'Explain pass by value of pointers',
                'Use *head_ref = newNode for empty list'
              ]
            },
            {
              id: 'c-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Matrix Flattening & Dynamic Allocation',
              question: 'Write a C function `int** allocate_2d_matrix(int rows, int cols)` that allocates memory for a 2D integer matrix in a single contiguous block (to prevent memory fragmentation) while still allowing 2D array indexing notation `matrix[r][c]`. Also write the corresponding `free_2d_matrix(int **matrix)` function.',
              markingBreakdown: [
                'Row pointer array allocation: 1.5 Marks',
                'Contiguous data block allocation: 2 Marks',
                'Deallocation function: 1.5 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdlib.h>

int** allocate_2d_matrix(int rows, int cols) {
    if (rows <= 0 || cols <= 0) return NULL;
    
    // Allocate array of row pointers
    int **matrix = (int **)malloc(rows * sizeof(int *));
    if (!matrix) return NULL;

    // Allocate contiguous block for all elements
    int *data = (int *)malloc(rows * cols * sizeof(int));
    if (!data) {
        free(matrix);
        return NULL;
    }

    // Point each row pointer to its respective offset
    for (int r = 0; r < rows; r++) {
        matrix[r] = data + (r * cols);
    }
    return matrix;
}

void free_2d_matrix(int **matrix) {
    if (!matrix) return;
    free(matrix[0]); // Frees the single contiguous data block
    free(matrix);    // Frees row pointers
}
\`\`\``,
              notebookCheckpoints: [
                'Contiguous block: rows * cols * sizeof(int)',
                'matrix[r] = data + (r * cols)',
                'Clean free with matrix[0] and matrix'
              ]
            },
            {
              id: 'c-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'String In-Place Reversal',
              question: 'Implement a C function `void reverse_words(char *str)` that reverses the words in a sentence in-place without allocating temporary buffers.\nFor example: `"The quick brown fox"` becomes `"fox brown quick The"`.\nDetail your two-pass algorithm in your notebook.',
              markingBreakdown: [
                'Two-pass algorithm explanation: 1 Mark',
                'In-place character reversal helper: 1.5 Marks',
                'Full sentence word-by-word reversal: 2.5 Marks'
              ],
              modelSolution: `\`\`\`c
static void reverse_range(char *start, char *end) {
    while (start < end) {
        char temp = *start;
        *start++ = *end;
        *end-- = temp;
    }
}

void reverse_words(char *str) {
    if (!str || !*str) return;

    // Step 1: Reverse individual words
    char *word_start = str;
    char *p = str;
    while (*p) {
        if (*p == ' ') {
            reverse_range(word_start, p - 1);
            word_start = p + 1;
        }
        p++;
    }
    // Reverse the last word
    reverse_range(word_start, p - 1);

    // Step 2: Reverse the entire string
    reverse_range(str, p - 1);
}
\`\`\``,
              notebookCheckpoints: [
                'Two-pass algorithm: reverse words then reverse entire string',
                'Zero dynamic memory allocations'
              ]
            },
            {
              id: 'c-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Circular Buffer (Queue) Mechanics',
              question: 'Construct a fixed-size Circular Queue structure for characters in C with capacity 8.\n(a) Define `struct CircularQueue` with `char buffer[8]`, `int head`, `int tail`, and `int count`.\n(b) Write `int enqueue(CircularQueue *q, char c)` returning 0 if full, 1 if successful.\n(c) Write `int dequeue(CircularQueue *q, char *c)` returning 0 if empty, 1 if successful.\nShow how modulo arithmetic wraps indices.',
              markingBreakdown: [
                'Struct definition: 1 Mark',
                'enqueue with modulo wrap: 2 Marks',
                'dequeue with modulo wrap: 2 Marks'
              ],
              modelSolution: `\`\`\`c
#define QUEUE_CAP 8

typedef struct {
    char buffer[QUEUE_CAP];
    int head;
    int tail;
    int count;
} CircularQueue;

void queue_init(CircularQueue *q) {
    q->head = 0;
    q->tail = 0;
    q->count = 0;
}

int enqueue(CircularQueue *q, char c) {
    if (q->count >= QUEUE_CAP) return 0; // Full
    q->buffer[q->tail] = c;
    q->tail = (q->tail + 1) % QUEUE_CAP; // Modulo wrap
    q->count++;
    return 1;
}

int dequeue(CircularQueue *q, char *c) {
    if (q->count <= 0) return 0; // Empty
    *c = q->buffer[q->head];
    q->head = (q->head + 1) % QUEUE_CAP; // Modulo wrap
    q->count--;
    return 1;
}
\`\`\``,
              notebookCheckpoints: [
                'Modulo index wrap: (tail + 1) % CAP',
                'Count tracking to distinguish empty vs full'
              ]
            },
            {
              id: 'c-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Custom `printf` Formatter Implementation',
              question: 'Write a simplified C function `void mini_printf(const char *fmt, ...)` using `<stdarg.h>` that supports `%d` (integers), `%s` (strings), and `%c` (characters).',
              markingBreakdown: [
                'va_list, va_start, and va_end initialization: 1.5 Marks',
                'Loop parsing format specifiers: 2 Marks',
                'putchar output: 1.5 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdarg.h>

void mini_printf(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);

    for (const char *p = fmt; *p != '\\0'; p++) {
        if (*p != '%') {
            putchar(*p);
            continue;
        }
        p++; // Advance past '%'
        switch (*p) {
            case 'c': {
                int c = va_arg(args, int); // char promoted to int
                putchar(c);
                break;
            }
            case 's': {
                char *s = va_arg(args, char *);
                if (!s) s = "(null)";
                while (*s) putchar(*s++);
                break;
            }
            case 'd': {
                int val = va_arg(args, int);
                char buf[32];
                snprintf(buf, sizeof(buf), "%d", val);
                for (int i = 0; buf[i]; i++) putchar(buf[i]);
                break;
            }
            default:
                putchar('%');
                putchar(*p);
                break;
        }
    }
    va_end(args);
}
\`\`\``,
              notebookCheckpoints: [
                'Include stdarg.h',
                'va_start and va_end pairs',
                'va_arg(args, int) for %c and %d'
              ]
            },
            {
              id: 'c-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Binary File Serialization',
              question: 'Given `typedef struct { int id; char name[32]; float gpa; } Student;`, write a C program that:\n(a) Writes an array of 3 `Student` records into a binary file `"students.bin"` using `fwrite()`.\n(b) Re-opens the file and reads the records directly into another array using `fread()`, verifying data integrity.',
              markingBreakdown: [
                'fwrite with proper size and count: 2 Marks',
                'fread with proper size and count: 2 Marks',
                'File closure and error checks: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float gpa;
} Student;

int main(void) {
    Student out[2] = {
        {101, "Alice", 3.92f},
        {102, "Bob", 3.85f}
    };

    // (a) Write binary
    FILE *fp = fopen("students.bin", "wb");
    if (!fp) return 1;
    fwrite(out, sizeof(Student), 2, fp);
    fclose(fp);

    // (b) Read binary
    Student in[2];
    fp = fopen("students.bin", "rb");
    if (!fp) return 1;
    fread(in, sizeof(Student), 2, fp);
    fclose(fp);

    printf("Read Student: %d, %s, %.2f\\n", in[0].id, in[0].name, in[0].gpa);
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'Use "wb" and "rb" binary flags',
                'Pass sizeof(Student) to fwrite/fread'
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
              id: 'c-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: Custom Memory Pool Allocator',
              question: 'To eliminate heap fragmentation in low-latency systems, software engineers use fixed-block Memory Pools.\nDesign and implement a fixed-size block Memory Pool in C:\n(a) Allocate a single contiguous pool buffer of `N` blocks, each of size `B` bytes.\n(b) Maintain a singly linked Free List embedded directly inside the idle blocks without extra memory overhead.\n(c) Implement `void pool_init(Pool *p, size_t block_size, size_t block_count)`.\n(d) Implement `void* pool_alloc(Pool *p)` in O(1) time.\n(e) Implement `void pool_free(Pool *p, void *ptr)` in O(1) time.\n(f) Draw a diagram in your notebook illustrating how the embedded free list links idle memory blocks.',
              markingBreakdown: [
                'Pool structure and initialization: 2.5 Marks',
                'O(1) allocation popping from free list: 2.5 Marks',
                'O(1) deallocation pushing back to free list: 2.5 Marks',
                'Diagram and memory layout explanation: 2.5 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct FreeNode {
    struct FreeNode *next;
} FreeNode;

typedef struct {
    char *buffer;
    size_t block_size;
    size_t block_count;
    FreeNode *free_list;
} MemoryPool;

int pool_init(MemoryPool *p, size_t block_size, size_t block_count) {
    if (block_size < sizeof(FreeNode)) {
        block_size = sizeof(FreeNode); // Must fit free pointer
    }
    p->block_size = block_size;
    p->block_count = block_count;
    p->buffer = (char *)malloc(block_size * block_count);
    if (!p->buffer) return 0;

    // Link all blocks into the initial free list
    p->free_list = (FreeNode *)p->buffer;
    FreeNode *curr = p->free_list;
    for (size_t i = 0; i < block_count - 1; i++) {
        curr->next = (FreeNode *)(p->buffer + (i + 1) * block_size);
        curr = curr->next;
    }
    curr->next = NULL;
    return 1;
}

void* pool_alloc(MemoryPool *p) {
    if (!p || !p->free_list) return NULL; // Out of memory
    FreeNode *node = p->free_list;
    p->free_list = node->next; // O(1) pop
    return (void *)node;
}

void pool_free(MemoryPool *p, void *ptr) {
    if (!p || !ptr) return;
    FreeNode *node = (FreeNode *)ptr;
    node->next = p->free_list; // O(1) push to head
    p->free_list = node;
}

void pool_destroy(MemoryPool *p) {
    if (!p) return;
    free(p->buffer);
    p->free_list = NULL;
}
\`\`\`
Diagram:
[Pool Buffer]
[ Block 0 (FreeNode->next: Block 1) ] -> [ Block 1 (FreeNode->next: Block 2) ] -> ... -> NULL
When allocated, user data overwrites the FreeNode space. When freed, the address is cast back to FreeNode.`,
              notebookCheckpoints: [
                'Ensure block_size >= sizeof(FreeNode)',
                'Embed FreeNode pointer inside idle memory',
                'Demonstrate both alloc and free are O(1)'
              ]
            },
            {
              id: 'c-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Hash Table with Chaining Implementation',
              question: 'Implement a String-Key, Integer-Value Hash Map with separate chaining collision resolution in C.\n(a) Define `struct HashNode` and `struct HashTable` with a bucket array of size 16.\n(b) Implement `unsigned int hash(const char *key)` using the `djb2` algorithm.\n(c) Implement `void ht_insert(HashTable *ht, const char *key, int value)` with key string duplication (`strdup`).\n(d) Implement `int ht_get(const HashTable *ht, const char *key, int *out_val)` returning 1 if found.\n(e) Implement `void ht_destroy(HashTable *ht)` with complete memory cleanup.\n(f) Explain how separate chaining guarantees correctness during high collision loads.',
              markingBreakdown: [
                'Structure definition and djb2 hash function: 2 Marks',
                'ht_insert with collision chaining and key duplication: 3 Marks',
                'ht_get lookup logic: 2 Marks',
                'ht_destroy freeing all nodes, keys, and table: 2 Marks',
                'Collision resolution theoretical explanation: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 16

typedef struct HashNode {
    char *key;
    int value;
    struct HashNode *next;
} HashNode;

typedef struct {
    HashNode *buckets[TABLE_SIZE];
} HashTable;

// djb2 Hash algorithm
unsigned int hash(const char *key) {
    unsigned long h = 5381;
    int c;
    while ((c = *key++)) {
        h = ((h << 5) + h) + c; // h * 33 + c
    }
    return (unsigned int)(h % TABLE_SIZE);
}

void ht_init(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) ht->buckets[i] = NULL;
}

void ht_insert(HashTable *ht, const char *key, int value) {
    unsigned int idx = hash(key);
    HashNode *node = ht->buckets[idx];
    
    // Check if key already exists, update value
    while (node) {
        if (strcmp(node->key, key) == 0) {
            node->value = value;
            return;
        }
        node = node->next;
    }

    // Insert new node at head of chain
    HashNode *newNode = (HashNode *)malloc(sizeof(HashNode));
    newNode->key = (char *)malloc(strlen(key) + 1);
    strcpy(newNode->key, key);
    newNode->value = value;
    newNode->next = ht->buckets[idx];
    ht->buckets[idx] = newNode;
}

int ht_get(const HashTable *ht, const char *key, int *out_val) {
    unsigned int idx = hash(key);
    HashNode *node = ht->buckets[idx];
    while (node) {
        if (strcmp(node->key, key) == 0) {
            *out_val = node->value;
            return 1;
        }
        node = node->next;
    }
    return 0;
}

void ht_destroy(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        HashNode *curr = ht->buckets[i];
        while (curr) {
            HashNode *next = curr->next;
            free(curr->key);
            free(curr);
            curr = next;
        }
        ht->buckets[i] = NULL;
    }
}
\`\`\``,
              notebookCheckpoints: [
                'djb2 formula: ((h << 5) + h) + c',
                'Deep copy key string using malloc/strcpy',
                'Free key before freeing HashNode'
              ]
            },
            {
              id: 'c-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Assembly, Stack Frames & Calling Conventions',
              question: 'Investigate how the x86-64 System V AMD64 Calling Convention executes C functions at the machine level.\n(a) Detail the 6 CPU registers used in order to pass the first 6 integer/pointer arguments.\n(b) For the function `long add_six(long a, long b, long c, long d, long e, long f)`, list which register holds which parameter.\n(c) Draw a stack frame layout diagram showing the Base Pointer (`%rbp`), Stack Pointer (`%rsp`), return address, local variables, and saved register values during a function call.\n(d) Explain what a "Buffer Overflow" vulnerability is and how writing past an array bound can hijack program control flow by overwriting the saved Return Address.',
              markingBreakdown: [
                'Listing 6 calling registers in order (%rdi, %rsi, %rdx, %rcx, %r8, %r9): 2.5 Marks',
                'Stack frame activation diagram with %rbp and %rsp: 3.5 Marks',
                'Buffer overflow exploit mechanism explanation: 4 Marks'
              ],
              modelSolution: `(a) System V AMD64 Calling Convention Registers:
1st argument: %rdi
2nd argument: %rsi
3rd argument: %rdx
4th argument: %rcx
5th argument: %r8
6th argument: %r9
Additional arguments (7th onward) are pushed onto the Stack in reverse order. Return value is stored in %rax.

(b) For add_six(a, b, c, d, e, f):
a -> %rdi, b -> %rsi, c -> %rdx, d -> %rcx, e -> %r8, f -> %r9.

(c) Stack Frame Layout Diagram:
+------------------------------------+ High Address
| 7th+ Arguments (if any)            |
+------------------------------------+
| Return Address (pushed by CALL)    | <- Overwrite target in exploits
+------------------------------------+
| Saved Old %rbp (pushed by callee)  | <- %rbp points here
+------------------------------------+
| Callee-saved registers             |
+------------------------------------+
| Local Variables (buffer[64], etc.) |
+------------------------------------+
| Current Top of Stack               | <- %rsp points here
+------------------------------------+ Low Address

(d) Buffer Overflow Mechanism:
If a function reads user input into a stack-allocated buffer (e.g. using unsafe gets() or strcpy()) without length validation, excessive bytes write past the buffer boundary.
Because the stack grows downward but buffers fill upward toward higher addresses, overflowing writes overwrite the Saved %rbp and then the Saved Return Address.
When the function executes the \`ret\` instruction, CPU pops the overwritten address into the Instruction Pointer (%rip), jumping execution to attacker-controlled shellcode or unauthorized code.`,
              notebookCheckpoints: [
                'List registers: %rdi, %rsi, %rdx, %rcx, %r8, %r9',
                'Draw stack frame diagram with Return Address and %rbp',
                'Explain how RET jumps to overwritten return address'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-101-C-S3',
      title: 'Advanced C Systems, Concurrency & Security Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-101-C',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY. Each question carries 1 Mark (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions. Each question carries 5 Marks (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions. Each question carries 10 Marks (2 × 10 = 20 Marks).'
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
              id: 'c-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Bit-Fields',
              question: 'What is the advantage of using bit-fields in a C structure, and what is a known portability issue with them?',
              markingBreakdown: ['Memory compaction benefit & compiler layout portability issue: 1 Mark'],
              modelSolution: 'Bit-fields allow packing multiple boolean or small integer flags into specific numbers of bits (e.g. `unsigned int flag: 1;`), minimizing memory. Portability issue: the exact bit ordering (MSB vs LSB) and byte alignment within the word is implementation-defined by the compiler.',
              notebookCheckpoints: ['Compact bit-level storage', 'Bit ordering is implementation-dependent']
            },
            {
              id: 'c-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Undefined Behavior: Signed Overflow',
              question: 'Why does signed integer overflow (e.g. `INT_MAX + 1`) invoke Undefined Behavior in C, whereas unsigned integer overflow does not?',
              markingBreakdown: ['Signed is UB, unsigned is defined modulo 2^N: 1 Mark'],
              modelSolution: 'ANSI/ISO C defines unsigned arithmetic as strictly adhering to modulo arithmetic ($2^N$), meaning it wraps around safely. Signed integer overflow is left undefined so compilers can optimize loops and assume integers never wrap.',
              notebookCheckpoints: ['Signed overflow is undefined', 'Unsigned wraps modulo 2^N']
            },
            {
              id: 'c-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Inline Functions',
              question: 'What is the purpose of the `inline` keyword in C99, and does the compiler guarantee that the function code will be inlined?',
              markingBreakdown: ['Suggestion for call substitution without overhead, not a strict guarantee: 1 Mark'],
              modelSolution: '`inline` suggests to the compiler to substitute the function body at compile-time to eliminate call overhead (stack frame push/pop). It is only a compiler hint, not a binding guarantee.',
              notebookCheckpoints: ['Eliminates call overhead', 'Only a hint to compiler']
            },
            {
              id: 'c-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Generic Pointer Dereference',
              question: 'Can a `void *` pointer be directly dereferenced with `*ptr` in standard C? Why or why not?',
              markingBreakdown: ['No, because target type and size are unknown: 1 Mark'],
              modelSolution: 'No. A `void *` has no associated data type or size. The compiler cannot determine how many bytes to read or how to interpret the binary bits without casting to a concrete pointer type (e.g. `*(int*)ptr`).',
              notebookCheckpoints: ['Cannot dereference directly', 'Must cast to typed pointer']
            },
            {
              id: 'c-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Memory Set Security',
              question: 'Why is `memset(password, 0, len);` sometimes removed by optimizing compilers before a function returns, creating a security flaw?',
              markingBreakdown: ['Dead store elimination optimization: 1 Mark'],
              modelSolution: 'The compiler performs "Dead Store Elimination": if the buffer is never read again before deallocation, the compiler views the zeroing write as redundant dead code and optimizes it away, leaving passwords exposed in RAM.',
              notebookCheckpoints: ['Dead store elimination', 'Use explicit_bzero or volatile pointer']
            },
            {
              id: 'c-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Flexible Array Members',
              question: 'What is a Flexible Array Member in C99, and where must it be declared within a structure definition?',
              markingBreakdown: ['Last member with empty brackets: 1 Mark'],
              modelSolution: 'A flexible array member (e.g. `int data[];`) allows dynamic sizing of a structure trailing payload. C99 requires it to be the very last member in a structure containing at least one named member before it.',
              notebookCheckpoints: ['Must be last member', 'Syntax: type name[]']
            },
            {
              id: 'c-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'String Literal Modification',
              question: 'What happens when executing `char *s = "Hello"; s[0] = \'h\';` at runtime?',
              markingBreakdown: ['Segmentation fault / undefined behavior modifying read-only text: 1 Mark'],
              modelSolution: 'It causes a Segmentation Fault (Crash) or undefined behavior. String literals like `"Hello"` are placed in the read-only `.rodata` text segment. Writing to read-only pages triggers a hardware MMU memory fault.',
              notebookCheckpoints: ['Segmentation fault', 'String literal stored in read-only memory']
            },
            {
              id: 'c-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Realloc NULL Behavior',
              question: 'What is the return value and behavior of `realloc(NULL, 100)`?',
              markingBreakdown: ['Acts identically to malloc(100): 1 Mark'],
              modelSolution: 'When passed a NULL pointer, `realloc(NULL, size)` behaves identically to `malloc(size)`, allocating 100 bytes on the heap and returning a valid pointer.',
              notebookCheckpoints: ['Equivalent to malloc(100)']
            },
            {
              id: 'c-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Array Decay Rule',
              question: 'In what two standard contexts does an array name NOT decay into a pointer to its first element?',
              markingBreakdown: ['When used with sizeof and address-of & operator: 1 Mark'],
              modelSolution: '1. As the operand of `sizeof` (evaluates to total array size in bytes).\n2. As the operand of the address-of operator `&` (evaluates to a pointer to the entire array `type (*)[N]`).',
              notebookCheckpoints: ['sizeof(array)', '&array']
            },
            {
              id: 'c-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Standard Exit Status',
              question: 'What are the two portable values defined in `<stdlib.h>` for terminating a C process via `exit()` or returning from `main()`?',
              markingBreakdown: ['EXIT_SUCCESS and EXIT_FAILURE: 1 Mark'],
              modelSolution: '`EXIT_SUCCESS` (evaluates to 0) and `EXIT_FAILURE` (evaluates to non-zero, usually 1).',
              notebookCheckpoints: ['EXIT_SUCCESS', 'EXIT_FAILURE']
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
              id: 'c-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Generic `qsort` & Comparator Writing',
              question: 'Given the structure `typedef struct { char name[24]; int age; double salary; } Employee;`, write two custom comparator functions conforming to standard `qsort` signature `int (*)(const void *, const void *)`:\n(a) `compare_by_salary_desc` (highest salary first)\n(b) `compare_by_name_asc` (alphabetical name order using `strcmp`).\nDemonstrate how `qsort()` is called on an array of 50 employees.',
              markingBreakdown: [
                'Salary comparator descending: 2 Marks',
                'Name comparator ascending with strcmp: 2 Marks',
                'qsort function call syntax: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[24];
    int age;
    double salary;
} Employee;

// (a) Salary descending
int compare_by_salary_desc(const void *a, const void *b) {
    const Employee *e1 = (const Employee *)a;
    const Employee *e2 = (const Employee *)b;
    if (e2->salary > e1->salary) return 1;
    if (e2->salary < e1->salary) return -1;
    return 0;
}

// (b) Name ascending
int compare_by_name_asc(const void *a, const void *b) {
    const Employee *e1 = (const Employee *)a;
    const Employee *e2 = (const Employee *)b;
    return strcmp(e1->name, e2->name);
}

// Invocation
void sort_demo(Employee staff[], size_t n) {
    qsort(staff, n, sizeof(Employee), compare_by_salary_desc);
}
\`\`\``,
              notebookCheckpoints: [
                'Cast void pointers to const Employee *',
                'Never subtract doubles directly to return int (prevents precision loss)',
                'Pass sizeof(Employee) to qsort'
              ]
            },
            {
              id: 'c-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Memory Copy: `memcpy` vs `memmove`',
              question: 'Explain the fundamental difference between `memcpy()` and `memmove()` regarding overlapping memory regions. Implement your own safe `void* my_memmove(void *dest, const void *src, size_t n)` function that handles overlapping source and destination buffers correctly.',
              markingBreakdown: [
                'Explanation of overlapping buffer corruption: 1.5 Marks',
                'Forward copy when dest < src: 1.5 Marks',
                'Backward copy when dest > src: 2 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stddef.h>

// memcpy assumes memory does NOT overlap.
// memmove checks overlap: if dest > src, copy backwards to preserve unread bytes.
void* my_memmove(void *dest, const void *src, size_t n) {
    if (!dest || !src || n == 0) return dest;

    unsigned char *d = (unsigned char *)dest;
    const unsigned char *s = (const unsigned char *)src;

    if (d < s) {
        // Non-overlapping or dest is before src: copy forward
        for (size_t i = 0; i < n; i++) {
            d[i] = s[i];
        }
    } else if (d > s) {
        // Overlapping with dest after src: copy backward from end
        for (size_t i = n; i > 0; i--) {
            d[i - 1] = s[i - 1];
        }
    }
    return dest;
}
\`\`\``,
              notebookCheckpoints: [
                'Differentiate overlap behavior',
                'Handle dest > src by copying backward from index n-1 to 0'
              ]
            },
            {
              id: 'c-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Pointer Aliasing & `restrict` Keyword',
              question: 'Explain the purpose of the `restrict` type qualifier introduced in C99. Show two version of vector addition `void add_vectors(int *a, int *b, int *res, int n)`—one without `restrict` and one with `restrict`—and explain how `restrict` enables SIMD vectorization optimizations in modern compilers.',
              markingBreakdown: [
                'Definition of pointer aliasing: 1.5 Marks',
                'Code comparison with restrict: 1.5 Marks',
                'Explanation of compiler SIMD optimization: 2 Marks'
              ],
              modelSolution: `Pointer Aliasing occurs when two different pointers point to overlapping memory. Without 'restrict', the compiler must assume writing to *res might alter the values in *a or *b, forcing it to reload *a and *b from RAM on every iteration.

Code with restrict:
\`\`\`c
void add_vectors_optimized(const int * restrict a,
                           const int * restrict b,
                           int * restrict res,
                           int n) {
    for (int i = 0; i < n; i++) {
        res[i] = a[i] + b[i];
    }
}
\`\`\`
Optimization:
The 'restrict' contract guarantees that 'res' does not overlap with 'a' or 'b'. The compiler can now load multiple elements into AVX/SSE 256-bit vector registers and execute SIMD additions in parallel without reload barriers.`,
              notebookCheckpoints: [
                'Define aliasing hazard',
                'Use const int * restrict syntax',
                'Explain SIMD / vector register optimization'
              ]
            },
            {
              id: 'c-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Variable Argument Lists (`<stdarg.h>`)',
              question: 'Write a C function `double compute_average(int count, ...)` that calculates the average of an arbitrary number of `double` arguments. Include proper guards against division by zero.',
              markingBreakdown: [
                'va_list, va_start, va_arg, va_end implementation: 3 Marks',
                'Division by zero guard: 1 Mark',
                'Correct double return: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdarg.h>

double compute_average(int count, ...) {
    if (count <= 0) return 0.0;

    va_list args;
    va_start(args, count);

    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, double);
    }

    va_end(args);
    return total / (double)count;
}
\`\`\``,
              notebookCheckpoints: [
                'Handle count <= 0',
                'Call va_end before return'
              ]
            },
            {
              id: 'c-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Signals & Safe Handlers',
              question: 'In Unix/C systems, write a signal handling program that catches `SIGINT` (Ctrl+C). Explain why functions like `printf()` or `malloc()` are unsafe inside signal handlers, and show how to use `sig_atomic_t` or `write()` safely.',
              markingBreakdown: [
                'Explanation of async-signal-unsafe functions: 2 Marks',
                'sig_atomic_t volatile flag usage: 2 Marks',
                'signal or sigaction registration: 1 Mark'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <signal.h>
#include <unistd.h>

// sig_atomic_t guarantees atomic read/writes even if interrupted mid-instruction
volatile sig_atomic_t keep_running = 1;

void handle_sigint(int sig) {
    (void)sig;
    keep_running = 0; // Safe async-signal operation
}

int main(void) {
    signal(SIGINT, handle_sigint);
    printf("Server running. Press Ctrl+C to stop gracefully...\\n");
    while (keep_running) {
        sleep(1);
    }
    printf("\\nGracefully cleaned up resources and exiting.\\n");
    return 0;
}
\`\`\`
Why printf() is unsafe:
printf() is non-reentrant because it locks standard I/O mutexes and uses static internal buffers. If the program is interrupted during a printf() call and the handler calls printf() again, a permanent Deadlock occurs.`,
              notebookCheckpoints: [
                'volatile sig_atomic_t flag',
                'Explain non-reentrancy and deadlock risks'
              ]
            },
            {
              id: 'c-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Macro Token Pasting (`##`) and Stringification (`#`)',
              question: 'Explain what the `#` and `##` preprocessor operators do in C macros. Write a practical logging macro `#define LOG_VAR(x)` using `#` that prints `Variable x = <value>`, and demonstrate `##` creating unique variable names.',
              markingBreakdown: [
                'Stringification (#) explanation and macro: 2.5 Marks',
                'Token pasting (##) explanation and example: 2.5 Marks'
              ],
              modelSolution: `1. Stringification Operator (#):
Converts a macro argument into a quoted string literal.
\`\`\`c
#define LOG_INT(x) printf(#x " = %d\\n", x)
int score = 95;
LOG_INT(score); // Expands to: printf("score" " = %d\\n", score);
\`\`\`

2. Token-Pasting Operator (##):
Concatenates two separate tokens into a single identifier.
\`\`\`c
#define DECLARE_VAR(type, name, id) type name##_##id = 0
DECLARE_VAR(int, counter, 42); // Expands to: int counter_42 = 0;
\`\`\``,
              notebookCheckpoints: [
                '# converts argument to quoted string',
                '## glues tokens together into one identifier'
              ]
            },
            {
              id: 'c-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Atomic Operations & Concurrency Race Conditions',
              question: 'Explain what a Data Race is in multithreaded C programs. Write code demonstrating a race condition where multiple threads increment a shared counter, and show how to fix it using C11 `<stdatomic.h>` (`atomic_fetch_add`).',
              markingBreakdown: [
                'Data race explanation: 1.5 Marks',
                'Demonstration with shared counter: 1.5 Marks',
                'C11 atomic fix with stdatomic.h: 2 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdatomic.h>

// A data race occurs when two threads access the same memory location concurrently,
// at least one access is a write, and no synchronization is used.
// counter++ is NOT atomic; it compiles to 3 CPU instructions (load, increment, store).

// Thread-safe fix using C11 atomic
atomic_int safe_counter = 0;

void worker_thread(void) {
    for (int i = 0; i < 10000; i++) {
        atomic_fetch_add(&safe_counter, 1); // Atomic hardware instruction (e.g. LOCK XADD)
    }
}
\`\`\``,
              notebookCheckpoints: [
                'counter++ is 3 steps (read, modify, write)',
                'Use atomic_int and atomic_fetch_add'
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
              id: 'c-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Binary Search Tree (BST) Systems Implementation',
              question: 'Implement a complete Binary Search Tree (BST) for integers in C:\n(a) Define `struct TreeNode` with `int data`, `struct TreeNode *left`, and `struct TreeNode *right`.\n(b) `TreeNode* bst_insert(TreeNode *root, int val)`\n(c) `int bst_search(const TreeNode *root, int val)`\n(d) `TreeNode* bst_delete(TreeNode *root, int val)` handling all 3 cases (leaf, one child, two children with inorder successor).\n(e) `void bst_inorder(const TreeNode *root)` printing keys in ascending order.\n(f) `void bst_destroy(TreeNode *root)` recursively freeing all nodes.\n(g) State time and space complexities for balanced versus degenerate tree states.',
              markingBreakdown: [
                'TreeNode struct and bst_insert: 2 Marks',
                'bst_search: 1 Mark',
                'bst_delete handling all 3 deletion cases: 3 Marks',
                'Inorder traversal and bst_destroy cleanup: 2 Marks',
                'Complexity analysis (O(log N) vs O(N)): 2 Marks'
              ],
              modelSolution: `\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* bst_insert(TreeNode *root, int val) {
    if (!root) {
        TreeNode *node = (TreeNode *)malloc(sizeof(TreeNode));
        node->data = val;
        node->left = node->right = NULL;
        return node;
    }
    if (val < root->data) root->left = bst_insert(root->left, val);
    else if (val > root->data) root->right = bst_insert(root->right, val);
    return root;
}

int bst_search(const TreeNode *root, int val) {
    if (!root) return 0;
    if (root->data == val) return 1;
    if (val < root->data) return bst_search(root->left, val);
    return bst_search(root->right, val);
}

static TreeNode* find_min(TreeNode *node) {
    while (node && node->left) node = node->left;
    return node;
}

TreeNode* bst_delete(TreeNode *root, int val) {
    if (!root) return NULL;
    if (val < root->data) root->left = bst_delete(root->left, val);
    else if (val > root->data) root->right = bst_delete(root->right, val);
    else {
        // Node found:
        // Case 1 & 2: 0 or 1 child
        if (!root->left) {
            TreeNode *temp = root->right;
            free(root);
            return temp;
        } else if (!root->right) {
            TreeNode *temp = root->left;
            free(root);
            return temp;
        }
        // Case 3: 2 children - get inorder successor
        TreeNode *succ = find_min(root->right);
        root->data = succ->data;
        root->right = bst_delete(root->right, succ->data);
    }
    return root;
}

void bst_inorder(const TreeNode *root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->data);
    bst_inorder(root->right);
}

void bst_destroy(TreeNode *root) {
    if (!root) return;
    bst_destroy(root->left);
    bst_destroy(root->right);
    free(root);
}
\`\`\`
Complexity Analysis:
- Balanced BST (e.g. AVL): Insert, search, delete run in O(log N) time and O(log N) recursion stack space.
- Degenerate BST (skewed sorted list): Insert, search, delete degrade to O(N) time and O(N) stack depth.`,
              notebookCheckpoints: [
                'Inorder successor in 2-children deletion case',
                'Post-order recursive destruction in bst_destroy',
                'State O(log N) balanced vs O(N) degenerate'
              ]
            },
            {
              id: 'c-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'IPC: Shared Memory & Posix Mutexes',
              question: 'In systems programming, explain how Inter-Process Communication (IPC) operates via Shared Memory.\n(a) Differentiate between thread memory sharing (shared process address space) vs process memory sharing (POSIX `shm_open`, `mmap`).\n(b) Write a C producer process that creates a POSIX shared memory object `"my_shm"` with `shm_open`, sets its size with `ftruncate`, and maps it with `mmap`.\n(c) Show how the consumer process attaches to the same memory segment and reads data.\n(d) Explain why a process-shared mutex (`PTHREAD_PROCESS_SHARED`) is required to synchronize access between separate processes.',
              markingBreakdown: [
                'Process vs Thread memory comparison: 2.5 Marks',
                'Producer shm_open, ftruncate, mmap code: 3.5 Marks',
                'Consumer mapping and reading code: 2 Marks',
                'Process-shared mutex synchronization explanation: 2 Marks'
              ],
              modelSolution: `(a) Thread vs Process Memory Sharing:
- Threads share the same virtual address space created by the parent process. Global variables and the heap are directly accessible to all threads.
- Processes operate in isolated virtual address spaces guarded by hardware MMU page tables. To share data, the OS kernel must map the exact same physical memory frames into the page tables of both processes via shm_open/mmap.

(b) Producer Code:
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <string.h>

int main(void) {
    const char *name = "/my_shm";
    const int SIZE = 4096;

    int shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);
    ftruncate(shm_fd, SIZE);

    char *ptr = (char *)mmap(0, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);
    sprintf(ptr, "IPC System Message: Kernel Ready");
    
    munmap(ptr, SIZE);
    close(shm_fd);
    return 0;
}
\`\`\`

(c) Consumer Code:
\`\`\`c
int main(void) {
    const char *name = "/my_shm";
    const int SIZE = 4096;

    int shm_fd = shm_open(name, O_RDONLY, 0666);
    char *ptr = (char *)mmap(0, SIZE, PROT_READ, MAP_SHARED, shm_fd, 0);
    printf("Consumer received: %s\\n", ptr);

    munmap(ptr, SIZE);
    close(shm_fd);
    shm_unlink(name); // Clean up shared memory object
    return 0;
}
\`\`\`
(d) Process-shared Mutex:
Regular mutexes only coordinate threads within the same address space. When memory is shared between distinct processes, the mutex must be initialized in the shared memory block with pthread_mutexattr_setpshared(&attr, PTHREAD_PROCESS_SHARED) so kernel locks function across PID boundaries.`,
              notebookCheckpoints: [
                'shm_open, ftruncate, mmap sequence',
                'shm_unlink for cleanup',
                'PTHREAD_PROCESS_SHARED requirement'
              ]
            },
            {
              id: 'c-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Secure C Programming & Threat Mitigation',
              question: 'Analyze top security vulnerabilities in C systems programming:\n(a) Identify the security flaws in this snippet and rewrite it using safe C interfaces:\n```c\nvoid process_input(FILE *fp) {\n    char buffer[64];\n    gets(buffer);\n    char query[128];\n    sprintf(query, "SELECT * FROM users WHERE name = \'%s\'", buffer);\n}\n```\n(b) Explain Integer Overflow to Buffer Overflow exploit chains (e.g. `size_t total = count * sizeof(Item)`).\n(c) Describe how modern compilers and operating systems mitigate exploits using:\n  1. Stack Canaries (`-fstack-protector`)\n  2. Address Space Layout Randomization (ASLR)\n  3. Non-Executable Stack (NX/DEP)',
              markingBreakdown: [
                'Vulnerability identification and safe rewrite (fgets, snprintf): 3 Marks',
                'Integer multiplication overflow exploit chain explanation: 3 Marks',
                'Analysis of Stack Canaries, ASLR, and DEP/NX: 4 Marks'
              ],
              modelSolution: `(a) Vulnerabilities & Fix:
- Flaw 1: \`gets()\` has no buffer boundary check; reading > 63 bytes overwrites the stack frame.
- Flaw 2: \`sprintf()\` does not enforce maximum destination size.
- Flaw 3: SQL injection vulnerability.

Safe Rewrite:
\`\`\`c
void process_input_safe(FILE *fp) {
    char buffer[64];
    if (fgets(buffer, sizeof(buffer), fp) == NULL) return;
    
    // Remove newline
    buffer[strcspn(buffer, "\\n")] = 0;

    char query[128];
    // Safe bound-checked formatting
    snprintf(query, sizeof(query), "SELECT * FROM users WHERE name = '%s'", buffer);
}
\`\`\`

(b) Integer Overflow to Heap Overflow Chain:
Suppose \`count\` is 0x40000001 and \`sizeof(Item)\` is 4.
The multiplication \`count * 4\` overflows 32-bit uint and wraps to 4 bytes!
The code runs \`malloc(4)\`, allocating only 4 bytes. Next, a loop writes \`count\` items into the buffer, overwriting megabytes of heap metadata.

(c) OS & Compiler Mitigations:
1. Stack Canaries: Compiler places a random secret integer between local variables and the return address. Before RET, it verifies the canary. If altered by an overflow, the program aborts instantly with \`*** stack smashing detected ***\`.
2. ASLR (Address Space Layout Randomization): The kernel randomizes base addresses of the Stack, Heap, and shared libraries on every program execution, preventing attackers from predicting hardcoded exploit addresses.
3. NX / DEP (No-Execute / Data Execution Prevention): Marks Stack and Heap pages as non-executable (W^X: Write XOR Execute). If an attacker injects shellcode on the stack, the CPU halts with a hardware fault upon attempting to execute it.`,
              notebookCheckpoints: [
                'Replace gets with fgets',
                'Replace sprintf with snprintf',
                'Explain integer multiplication wrap with malloc',
                'Explain Canaries, ASLR, and NX/DEP'
              ]
            }
          ]
        }
      }
    }
  }
};
