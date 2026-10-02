import { Chapter } from '../types/notebook';

export const JAVA_CHAPTERS_PART1: Chapter[] = [
  // CHAPTER 01 — JAVA FOUNDATIONS
  {
    id: 'java-ch01',
    number: 1,
    title: 'Java Foundations & JVM Architecture',
    description: 'Origins, WORA philosophy, javac bytecode compilation, JVM execution engine, and main() anatomy',
    topics: [
      {
        id: 'java-foundations',
        subjectId: 'java',
        chapterId: 'java-ch01',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'What is Java? WORA & JVM Architecture',
        difficulty: 'beginner',
        definition: 'Java is a class-based, object-oriented, concurrent programming language designed around the Write Once, Run Anywhere (WORA) philosophy via intermediate bytecode execution on the Java Virtual Machine (JVM).',
        whyItMatters: 'Java powers over 3 billion devices, driving enterprise banking backends, Android mobile applications, Apache Kafka/Hadoop big data clusters, and scalable cloud microservices.',
        syntax: 'javac Main.java    // Compiles source to bytecode (.class)\njava Main          // Launches JVM to execute bytecode',
        explanation: [
          'Created in 1995 by James Gosling at Sun Microsystems (now Oracle), designed with C-like syntax but with automated memory management and platform independence.',
          'WORA Philosophy: Java source code (.java) is not compiled to native CPU machine code; it compiles to platform-neutral Java Bytecode (.class files).',
          'JVM (Java Virtual Machine): The software execution engine containing the ClassLoader, JVM Memory Areas, and Execution Engine (Interpreter + JIT HotSpot Compiler).',
          'JDK vs JRE vs JVM: JDK (Development Kit: javac, jar, debugger) -> JRE (Runtime Environment: JVM + standard core libraries) -> JVM (Bare execution engine).'
        ],
        example: {
          language: 'java',
          code: `// First canonical Java program
public class Main {
    // Exact standard JVM entry point signature
    public static void main(String[] args) {
        System.out.println("Hello, CODEINK Java Notebook!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
    }
}`,
          output: 'Hello, CODEINK Java Notebook!\nJava Version: 21.0.2',
          annotations: [
            { line: 2, label: 'Public class name must match filename (Main.java)', type: 'blue' },
            { line: 4, label: 'public static void main is the rigid JVM entry point', type: 'yellow' },
            { line: 5, label: 'System.out standard output print stream', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Java Two-Stage Compilation & Execution Pipeline',
          subtitle: 'From High-Level Source to Cross-Platform Machine Execution',
          elements: [
            { id: '1', label: 'Source Code', sublabel: 'Main.java', value: 'High-Level Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Java Compiler', sublabel: 'javac Main.java', value: 'Bytecode Compiler', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Bytecode', sublabel: 'Main.class', value: 'Platform-Neutral IR', status: 'active', arrowTo: '4' },
            { id: '4', label: 'JVM & JIT Engine', sublabel: 'HotSpot Compiler', value: 'Native Machine Code', status: 'referenced' }
          ]
        },
        important: 'In Java, the name of a public class MUST exactly match the filename (including capitalization). `public class Main` must reside in `Main.java`.',
        commonMistakes: [
          'Confusing Java with JavaScript. They have completely different runtimes, type systems, and historical origins.',
          'Missing `String[] args` in the `main` method signature, causing JVM `NoSuchMethodError`.'
        ],
        tip: 'Modern Java (Java 11+) allows running single-file scripts directly without manual compilation: `java Main.java`.',
        interviewNote: 'Question: "Why is Java platform independent, but the JVM is platform dependent?" Answer: "Java bytecode is identical on all operating systems. However, the JVM binary is built specifically for each OS/CPU to translate that bytecode into native machine instructions."',
        practiceQuestions: [
          {
            id: 'q-java1-1',
            type: 'mcq',
            question: 'Which component is responsible for translating Java bytecode (.class) into native machine code at runtime?',
            options: ['javac compiler', 'Java Virtual Machine (JVM)', 'Java Development Kit (JDK)', 'Javadoc'],
            correctIndex: 1,
            explanation: 'The JVM contains an Execution Engine (combining an interpreter and JIT compiler) that converts bytecode into native machine instructions.'
          },
          {
            id: 'q-java1-2',
            type: 'true_false',
            question: 'True or False: A Java source file named Calculator.java can contain a public class named MathOps.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation: 'In Java, a public class must match its containing source filename exactly (`Calculator.java` must contain `public class Calculator`).'
          }
        ],
        relatedTopics: ['java-variables', 'java-classes', 'java-jvm-memory']
      }
    ]
  },

  // CHAPTER 02 — VARIABLES & DATA TYPES
  {
    id: 'java-ch02',
    number: 2,
    title: 'Variables & Data Types',
    description: 'Eight primitive types, reference types, type promotion, explicit casting, and local variable type inference (var)',
    topics: [
      {
        id: 'java-variables',
        subjectId: 'java',
        chapterId: 'java-ch02',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'Primitive Types, Widening vs Narrowing & var',
        difficulty: 'beginner',
        definition: 'Java defines 8 primitive scalar types stored directly on the stack with fixed bit-widths, plus object reference types stored on the heap.',
        whyItMatters: 'Unlike C/C++ where type sizes vary by compiler architecture, Java strictly fixes primitive sizes (e.g. `int` is ALWAYS 32-bit signed two\'s complement) ensuring 100% binary portability.',
        syntax: 'int score = 100;\nvar count = 50; // Java 10+ local variable type inference',
        explanation: [
          'Integer primitives: `byte` (8-bit, -128 to 127), `short` (16-bit), `int` (32-bit, default), `long` (64-bit with `L` suffix).',
          'Floating-point primitives: `float` (32-bit IEEE 754 with `F` suffix), `double` (64-bit IEEE 754, default).',
          'Other primitives: `char` (16-bit unsigned Unicode character), `boolean` (`true` or `false`, NOT integers).',
          'Widening Casting (Implicit): Automatic conversion to larger data type: `int -> long -> double`.',
          'Narrowing Casting (Explicit): Requires manual cast and risks overflow/precision loss: `int x = (int) 3.99;`.',
          '`var` keyword (Java 10+): Local variable type inference where compiler deduces type from initializer.'
        ],
        example: {
          language: 'java',
          code: `public class DataDemo {
    public static void main(String[] args) {
        // Primitives with exact sizes
        byte b = 120;
        int population = 1_400_000_000; // Underscores for readability
        long microchips = 9_000_000_000_000L; // L suffix required
        double price = 99.99;

        // Widening conversion (safe & automatic)
        double extended = population;

        // Narrowing conversion (explicit cast required)
        int truncatedPrice = (int) price; // Truncates decimal part to 99

        // Java 10+ Local Variable Type Inference
        var message = "CODEINK Java"; // Deduced as String at compile-time

        System.out.println("Truncated int: " + truncatedPrice);
        System.out.println("Deduced var type: " + message.getClass().getSimpleName());
    }
}`,
          output: 'Truncated int: 99\nDeduced var type: String',
          annotations: [
            { line: 6, label: 'L suffix marks literal as 64-bit long integer', type: 'yellow' },
            { line: 13, label: 'Explicit (int) cast discards fractional part', type: 'red' },
            { line: 16, label: 'var infers String statically at compile time', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Java Primitive Hierarchy & Memory Bit-Widths',
          subtitle: 'Automatic widening flows towards larger storage capacity',
          elements: [
            { id: '1', label: 'byte (8-bit)', sublabel: '-128 to 127', value: '1 Byte', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'short / char (16-bit)', sublabel: 'Integers / Unicode', value: '2 Bytes', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'int (32-bit)', sublabel: 'Default integer', value: '4 Bytes', status: 'active', arrowTo: '4' },
            { id: '4', label: 'long (64-bit)', sublabel: 'Large numbers (L)', value: '8 Bytes', status: 'active', arrowTo: '5' },
            { id: '5', label: 'double (64-bit)', sublabel: 'Default floating point', value: '8 Bytes', status: 'referenced' }
          ]
        },
        important: 'In Java, `boolean` values are strictly `true` or `false`. Unlike C or Python, you CANNOT write `if (1)` or treat numbers as booleans in Java.',
        commonMistakes: [
          'Forgetting the `L` suffix on large numbers: `long val = 5000000000;` causes a compiler error because integer literals default to 32-bit `int`. Write `5000000000L`.',
          'Using `var` for class fields. In Java, `var` is ONLY allowed for local variables inside method bodies.'
        ],
        tip: 'Use underscores `_` in numeric literals to make numbers readable: `int million = 1_000_000;`. The compiler ignores them completely.',
        interviewNote: 'Question: "Why is char 2 bytes in Java instead of 1 byte like in C?" Answer: "Java was designed from the beginning to support international Unicode (UTF-16 encoding), requiring 16 bits (2 bytes) per character."',
        practiceQuestions: [
          {
            id: 'q-java2-1',
            type: 'output',
            question: 'What is the output of the following Java code?\n\nint a = 130;\nbyte b = (byte) a;\nSystem.out.println(b);',
            options: ['130', '-126', '127', 'Compile Error'],
            correctIndex: 1,
            explanation: 'A byte ranges from -128 to 127. 130 exceeds 127, wrapping around in 8-bit two\'s complement arithmetic to -126.'
          }
        ],
        relatedTopics: ['java-operators', 'java-strings', 'java-classes']
      }
    ]
  },

  // CHAPTER 03 — OPERATORS & EXPRESSIONS
  {
    id: 'java-ch03',
    number: 3,
    title: 'Operators & Expressions',
    description: 'Arithmetic, relational, short-circuit logical operators, instanceof, and bitwise shift operators',
    topics: [
      {
        id: 'java-operators',
        subjectId: 'java',
        chapterId: 'java-ch03',
        chapterNumber: 3,
        pageNumber: 3,
        title: 'Operators: Short-Circuit Logic, instanceof & Precedence',
        difficulty: 'beginner',
        definition: 'Operators compute on operands. Java supports standard arithmetic, relational, bitwise shifts (`<<`, `>>`, `>>>`), and short-circuit logical operators (`&&`, `||`).',
        whyItMatters: 'Short-circuit evaluation (`&&`, `||`) prevents `NullPointerException`: `if (obj != null && obj.isValid())` safely stops if `obj` is null.',
        syntax: 'if (user != null && user.isActive()) { ... }',
        explanation: [
          'Short-Circuit `&&` vs `&`: `&&` evaluates the right operand only if the left is true. `&` always evaluates both operands regardless.',
          'Short-Circuit `||` vs `|`: `||` skips the right operand if the left is true.',
          '`>>>` Unsigned Right Shift: Shifts bits right, filling high-order vacant positions with zeros (unique to Java).',
          '`instanceof` Operator: Tests whether an object is an instance of a specific class or implements an interface.'
        ],
        example: {
          language: 'java',
          code: `public class OperatorDemo {
    public static void main(String[] args) {
        String data = null;

        // Safe short-circuit null check
        // data.length() is NEVER evaluated because data != null is false!
        if (data != null && data.length() > 0) {
            System.out.println("Has content");
        } else {
            System.out.println("Safely guarded against NullPointerException!");
        }

        // Ternary operator: condition ? trueExpr : falseExpr
        int score = 85;
        String status = (score >= 60) ? "PASS" : "FAIL";
        System.out.println("Student Status: " + status);
    }
}`,
          output: 'Safely guarded against NullPointerException!\nStudent Status: PASS',
          annotations: [
            { line: 7, label: 'Short-circuit && halts evaluation immediately when left is false', type: 'green' },
            { line: 15, label: 'Ternary conditional expression evaluates concisely', type: 'blue' }
          ]
        },
        important: 'Never compare objects or Strings using `==`! In Java, `==` tests memory address identity. Always use `obj1.equals(obj2)` for value equality.',
        commonMistakes: [
          'Using single `&` or `|` instead of `&&` or `||` in conditional statements, disabling short-circuit evaluation and causing unexpected NullPointerExceptions.'
        ],
        tip: 'In modern Java (Java 16+), use Pattern Matching for `instanceof`: `if (obj instanceof String s) { System.out.println(s.toUpperCase()); }`. It eliminates manual downcasting!',
        interviewNote: 'Question: "What is the difference between >> and >>> operators in Java?" Answer: "`>>` is the signed (arithmetic) right shift that preserves the sign bit (filling with 1s for negative numbers). `>>>` is the unsigned logical right shift that always fills vacant high bits with zeros."',
        practiceQuestions: [
          {
            id: 'q-java3-1',
            type: 'output',
            question: 'What is printed by: `int x = 5; System.out.println(x++ + ++x);`?',
            options: ['12', '11', '10', '13'],
            correctIndex: 0,
            explanation: 'x++ evaluates to 5 (then x becomes 6). Then ++x increments x to 7 and evaluates to 7. 5 + 7 = 12.'
          }
        ],
        relatedTopics: ['java-variables', 'java-conditions']
      }
    ]
  },

  // CHAPTER 04 — INPUT & OUTPUT
  {
    id: 'java-ch04',
    number: 4,
    title: 'Input & Output Streams',
    description: 'System.out (print, println, printf), Scanner tokenization, and BufferedReader console I/O',
    topics: [
      {
        id: 'java-io',
        subjectId: 'java',
        chapterId: 'java-ch04',
        chapterNumber: 4,
        pageNumber: 4,
        title: 'Console I/O: Scanner, printf & BufferedReader',
        difficulty: 'beginner',
        definition: 'Java provides standard streams `System.in`, `System.out`, and `System.err`. `java.util.Scanner` parses formatted primitives and strings from input streams.',
        whyItMatters: 'Understanding console stream buffers prevents input starvation bugs where leftover newline characters unintentionally skip subsequent string reads.',
        syntax: 'Scanner scanner = new Scanner(System.in);\nint val = scanner.nextInt();',
        explanation: [
          '`System.out.println()`: Appends a platform-dependent newline character.',
          '`System.out.printf()`: Formats text using format specifiers like `%d` (integer), `%.2f` (float with 2 decimals), and `%s` (string).',
          '`Scanner`: Parses tokens using regex whitespace delimiters (`nextInt()`, `nextDouble()`, `nextLine()`).',
          '`BufferedReader`: Higher throughput I/O stream reading raw character buffers directly without regex tokenization overhead.'
        ],
        example: {
          language: 'java',
          code: `import java.util.Scanner;

public class IODemo {
    public static void main(String[] args) {
        String item = "Server Blade";
        int quantity = 4;
        double unitPrice = 249.954;

        // Formatted printing with printf
        System.out.printf("Invoice: %-15s | Qty: %03d | Total: $%,.2f%n",
                item, quantity, quantity * unitPrice);

        // Simulated Scanner reading from string stream
        Scanner sc = new Scanner("100 Enterprise\\n");
        int code = sc.nextInt();
        String tier = sc.next();
        System.out.println("Parsed Code: " + code + " | Tier: " + tier);
        sc.close();
    }
}`,
          output: 'Invoice: Server Blade   | Qty: 004 | Total: $999.82\nParsed Code: 100 | Tier: Enterprise',
          annotations: [
            { line: 11, label: '%-15s left-aligns, %03d zero-pads, and %,.2f adds comma and 2 decimals', type: 'blue' },
            { line: 18, label: 'Always close Scanners to release underlying stream handles', type: 'green' }
          ]
        },
        important: 'When reading an integer or double with `scanner.nextInt()` followed by `scanner.nextLine()`, call an extra `scanner.nextLine()` to consume the leftover newline character `\\n`!',
        commonMistakes: [
          'Forgetting to consume the newline after `nextInt()`, causing the subsequent `nextLine()` to read an empty string.',
          'Not closing I/O resources, leading to stream descriptor leaks.'
        ],
        tip: 'In competitive programming, use `BufferedReader` and `StringTokenizer` instead of `Scanner`. `BufferedReader` is up to 10x faster because it avoids regex scanning.',
        interviewNote: 'Question: "Why is BufferedReader faster than Scanner?" Answer: "Scanner uses regular expressions to parse tokens on every read and has a small 1KB buffer. BufferedReader has an 8KB buffer and simply reads raw character arrays without parsing overhead."',
        practiceQuestions: [
          {
            id: 'q-java4-1',
            type: 'mcq',
            question: 'What format specifier outputs a newline character portably across Windows, Linux, and macOS in `System.out.printf()`?',
            options: ['\\n', '%n', '%eol', '\\r\\n'],
            correctIndex: 1,
            explanation: '`%n` in `printf` outputs the platform-specific line separator (`\\r\\n` on Windows, `\\n` on Unix/macOS).'
          }
        ],
        relatedTopics: ['java-variables', 'java-strings']
      }
    ]
  },

  // CHAPTER 05 — CONDITIONAL STATEMENTS
  {
    id: 'java-ch05',
    number: 5,
    title: 'Conditional Statements',
    description: 'if-else branching, switch statements, and modern Java 14+ switch expressions with yield',
    topics: [
      {
        id: 'java-conditions',
        subjectId: 'java',
        chapterId: 'java-ch05',
        chapterNumber: 5,
        pageNumber: 5,
        title: 'if-else & Modern Switch Expressions (Java 14+)',
        difficulty: 'beginner',
        definition: 'Conditional statements branch execution flow. Modern Java 14+ introduces Switch Expressions using arrow syntax (`->`), eliminating fallthrough bugs and returning values directly.',
        whyItMatters: 'Modern switch expressions prevent accidental fallthrough bugs caused by missing `break` statements and allow assigning results cleanly into variables.',
        syntax: 'int days = switch (month) {\n    case "FEB" -> 28;\n    default -> 31;\n};',
        explanation: [
          '`if-else if-else`: Standard boolean branching. Condition MUST evaluate to a `boolean` (cannot be an integer).',
          'Classic `switch`: Operates on `byte`, `short`, `char`, `int`, `String`, and `enum`. Requires manual `break;` to prevent fallthrough.',
          'Modern Switch Expressions (Java 14+): Uses arrow `->` syntax. Zero fallthrough risk, supports multiple comma-separated case values, and can return values directly.',
          '`yield` keyword: Used in multi-line block cases inside switch expressions to return a value.'
        ],
        example: {
          language: 'java',
          code: `public class SwitchDemo {
    public static void main(String[] args) {
        String day = "WEDNESDAY";

        // Modern Java 14+ Switch Expression (no break statements needed!)
        int workingHours = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> 8;
            case "SATURDAY" -> 4;
            case "SUNDAY" -> 0;
            default -> throw new IllegalArgumentException("Invalid day: " + day);
        };

        System.out.println("Day: " + day + " | Required Work Hours: " + workingHours);
    }
}`,
          output: 'Day: WEDNESDAY | Required Work Hours: 8',
          annotations: [
            { line: 6, label: 'Switch expression returns value directly into variable', type: 'blue' },
            { line: 7, label: 'Multiple comma-separated cases with arrow -> syntax (no fallthrough)', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Conditional Branching Execution Flow',
          subtitle: 'Evaluating boolean condition branches',
          elements: [
            { id: '1', label: 'Evaluation Start', sublabel: 'Input state', value: 'Evaluate Expression', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Condition True?', sublabel: 'Boolean evaluation', value: 'Branch Decision', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Execute Branch', sublabel: 'Action body', value: 'Resume Flow', status: 'referenced' }
          ]
        },
        important: 'In Java, `if (x = 5)` causes a compiler error! Java requires a boolean expression (`if (x == 5)`), completely preventing the accidental assignment bug common in C/C++.',
        commonMistakes: [
          'Forgetting `break` in legacy colon `:` switch statements, causing unintended fallthrough.',
          'Attempting to use `switch` on `float`, `double`, or `long`. They are not supported in Java switch statements.'
        ],
        tip: 'Prefer modern switch expressions (`case X -> expr;`) over legacy switch statements (`case X: ... break;`). They are exhaustive, concise, and eliminate fallthrough bugs.',
        interviewNote: 'Question: "Can Strings be used in switch statements in Java?" Answer: "Yes, since Java 7, Strings can be used in switch statements. Internally, the JVM compares the String\'s hashCode() and verifies with equals() to handle hash collisions."',
        practiceQuestions: [
          {
            id: 'q-java5-1',
            type: 'mcq',
            question: 'What keyword returns a value from a multi-line block inside a modern Java switch expression?',
            options: ['return', 'yield', 'break', 'export'],
            correctIndex: 1,
            explanation: 'Java 14+ standardized the `yield` keyword to return values from complex multi-line blocks inside switch expressions.'
          }
        ],
        relatedTopics: ['java-operators', 'java-loops']
      }
    ]
  },

  // CHAPTER 06 — LOOPS
  {
    id: 'java-ch06',
    number: 6,
    title: 'Loops & Iteration',
    description: 'for loops, while loops, do-while, enhanced for-each loop, and labeled break/continue',
    topics: [
      {
        id: 'java-loops',
        subjectId: 'java',
        chapterId: 'java-ch06',
        chapterNumber: 6,
        pageNumber: 6,
        title: 'for, while, Enhanced for-each & Labeled Breaks',
        difficulty: 'beginner',
        definition: 'Loops repeat statements until a boolean condition terminates. Java provides classic `for`, `while`, `do-while`, enhanced `for-each`, and labeled `break`/`continue` for nested loops.',
        whyItMatters: 'Enhanced for-each loops (`for (Type item : collection)`) eliminate off-by-one index errors (`i <= array.length`) and protect against `ArrayIndexOutOfBoundsException`.',
        syntax: 'for (int num : numbers) {\n    System.out.println(num);\n}',
        explanation: [
          '`for (init; cond; step)`: Classic counting loop with explicit counter.',
          '`while (cond)`: Pre-test loop; runs 0 or more times.',
          '`do { ... } while (cond);`: Post-test loop; strictly guaranteed to execute at least once.',
          'Enhanced `for-each` (`for (T item : iterable)`): Clean iteration over arrays and collections without index variables.',
          'Labeled `break label;`: Breaks out of outer nested loops directly without complex boolean flags.'
        ],
        example: {
          language: 'java',
          code: `public class LoopDemo {
    public static void main(String[] args) {
        int[] scores = {92, 85, 78, 96, 88};

        // Enhanced for-each loop
        int total = 0;
        for (int s : scores) {
            total += s;
        }
        System.out.println("Average Score: " + (total / (double) scores.length));

        // Labeled break exiting nested loops directly
        outerLoop:
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                if (row == 2 && col == 2) {
                    System.out.println("Breaking outerLoop at row 2, col 2");
                    break outerLoop; // Exits BOTH loops immediately!
                }
            }
        }
    }
}`,
          output: 'Average Score: 87.8\nBreaking outerLoop at row 2, col 2',
          annotations: [
            { line: 7, label: 'Enhanced for-each loop guarantees zero index bounds errors', type: 'green' },
            { line: 17, label: 'Labeled break terminates target outer loop directly', type: 'yellow' }
          ]
        },
        important: 'In an enhanced for-each loop, you CANNOT modify the array elements or modify the collection (adding/removing items causes `ConcurrentModificationException`).',
        commonMistakes: [
          'Using `<=` instead of `<` in array index bounds: `for (int i = 0; i <= arr.length; i++)` triggers `ArrayIndexOutOfBoundsException` on the last step.',
          'Forgetting the semicolon after `do-while` loops: `do { ... } while (cond);`.'
        ],
        tip: 'Use labeled `break` when searching in 2D matrices to terminate all nested loops cleanly the moment a target is found.',
        interviewNote: 'Question: "How does the enhanced for-each loop work internally for collections?" Answer: "For arrays, the compiler translates it into a standard index loop. For Collections, the compiler translates it into an Iterator (`Iterator<T> it = list.iterator(); while(it.hasNext())`)."',
        practiceQuestions: [
          {
            id: 'q-java6-1',
            type: 'output',
            question: 'What is the output of:\n\nint count = 0;\ndo {\n    count++;\n} while (count < 0);\nSystem.out.println(count);',
            options: ['0', '1', 'Infinite Loop', 'Compile Error'],
            correctIndex: 1,
            explanation: 'A do-while loop is a post-test loop: it always executes the body at least once before checking the condition. `count` becomes 1.'
          }
        ],
        relatedTopics: ['java-conditions', 'java-arrays']
      }
    ]
  },

  // CHAPTER 07 — ARRAYS
  {
    id: 'java-ch07',
    number: 7,
    title: 'Arrays',
    description: 'Array objects on heap, indexing, multidimensional arrays, jagged arrays, and java.util.Arrays',
    topics: [
      {
        id: 'java-arrays',
        subjectId: 'java',
        chapterId: 'java-ch07',
        chapterNumber: 7,
        pageNumber: 7,
        title: 'Arrays: Heap Allocation, Jagged Arrays & Arrays Class',
        difficulty: 'beginner',
        definition: 'In Java, arrays are first-class objects allocated on the heap. They have a fixed `.length` property and store elements of identical type contiguously.',
        whyItMatters: 'Understanding that arrays are heap objects explains why passing an array to a method passes the object reference, allowing in-place element mutation.',
        syntax: 'int[] arr = new int[5];\nint[] initialized = {10, 20, 30};',
        explanation: [
          'Heap Objects: Even arrays of primitive types (`int[]`) are full heap-allocated objects containing an intrinsic `.length` field.',
          'Default Initialization: Numeric array elements default to `0`, booleans to `false`, and object arrays to `null`.',
          'Jagged Arrays: Multi-dimensional arrays in Java are "arrays of arrays", allowing rows of unequal lengths.',
          '`java.util.Arrays` Utility: Provides `Arrays.sort()`, `Arrays.binarySearch()`, `Arrays.toString()`, and `Arrays.equals()`.'
        ],
        example: {
          language: 'java',
          code: `import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 89, 33, 7};

        // Utility sorting and printing
        Arrays.sort(numbers); // Dual-Pivot Quicksort O(n log n)
        System.out.println("Sorted Array: " + Arrays.toString(numbers));

        // Binary search on sorted array
        int index = Arrays.binarySearch(numbers, 33);
        System.out.println("Index of 33: " + index);

        // Jagged Array (rows with unequal column lengths)
        int[][] jagged = new int[2][];
        jagged[0] = new int[]{1, 2};       // Row 0 has 2 columns
        jagged[1] = new int[]{3, 4, 5, 6}; // Row 1 has 4 columns
        System.out.println("Jagged row 1 length: " + jagged[1].length);
    }
}`,
          output: 'Sorted Array: [7, 12, 33, 45, 89]\nIndex of 33: 2\nJagged row 1 length: 4',
          annotations: [
            { line: 8, label: 'Arrays.sort uses optimized Dual-Pivot Quicksort', type: 'blue' },
            { line: 9, label: 'Arrays.toString formats array contents nicely', type: 'green' },
            { line: 16, label: 'Java allows non-rectangular jagged arrays of arrays', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Java Array Heap Memory Representation',
          subtitle: 'Array reference on stack points to contiguous heap object with length header',
          elements: [
            { id: '1', label: 'Stack Ref: numbers', sublabel: 'Address: 0x200', value: 'Ptr to Heap', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Heap Array Object', sublabel: 'length = 5', value: 'Object Header', status: 'active', arrowTo: '3' },
            { id: '3', label: '[0]=7, [1]=12, [2]=33', sublabel: 'Contiguous Elements', value: '[3]=45, [4]=89', status: 'referenced' }
          ]
        },
        important: 'Printing an array directly (`System.out.println(numbers);`) prints its type descriptor and hashcode (like `[I@1b6d3586`). Always use `Arrays.toString(numbers)` to print contents!',
        commonMistakes: [
          'Writing `arr.length()` with parentheses. `.length` on arrays is a final field, not a method! (`String` has `.length()`, arrays have `.length`).'
        ],
        tip: 'Use `System.arraycopy(src, srcPos, dest, destPos, len)` for high-performance memory-level array copying implemented in native C.',
        interviewNote: 'Question: "What happens if you initialize an array `int[] arr = new int[5];`? What are the default values?" Answer: "Java initializes all elements automatically: integers to `0`, floating points to `0.0`, booleans to `false`, and reference types to `null`."',
        practiceQuestions: [
          {
            id: 'q-java7-1',
            type: 'mcq',
            question: 'How do you correctly retrieve the number of elements in a Java array `int[] arr`?',
            options: ['arr.length()', 'arr.length', 'arr.size()', 'arr.count'],
            correctIndex: 1,
            explanation: 'In Java, arrays have a public final field `.length` (no parentheses). Methods like `.length()` belong to String, and `.size()` belongs to Collections.'
          }
        ],
        relatedTopics: ['java-loops', 'java-strings', 'java-collections']
      }
    ]
  },

  // CHAPTER 08 — STRINGS
  {
    id: 'java-ch08',
    number: 8,
    title: 'Strings & String Pool',
    description: 'String immutability, String Constant Pool, equals() vs ==, StringBuilder, and StringBuffer',
    topics: [
      {
        id: 'java-strings',
        subjectId: 'java',
        chapterId: 'java-ch08',
        chapterNumber: 8,
        pageNumber: 8,
        title: 'String Immutability, String Pool & StringBuilder',
        difficulty: 'beginner',
        definition: 'Strings in Java are immutable objects. String literals are cached in the String Constant Pool inside heap memory to optimize memory usage.',
        whyItMatters: 'Because Strings are immutable, concatenating strings with `+=` inside a loop creates thousands of intermediate garbage objects in RAM. Use `StringBuilder` instead!',
        syntax: 'String s = "literal";               // Cached in String Pool\nStringBuilder sb = new StringBuilder(); // Mutable buffer',
        explanation: [
          'Immutability: Once created, the character sequence of a `String` cannot be altered. Methods like `.toUpperCase()` return a brand new String object.',
          'String Constant Pool: A special cache area in Java Heap. If a literal already exists, Java reuses the existing reference instead of allocating a duplicate.',
          '`==` vs `.equals()`: `==` compares object references (memory addresses). `.equals()` compares the actual character values.',
          '`StringBuilder`: Mutable, high-speed character sequence for string concatenation in single-threaded code.',
          '`StringBuffer`: Thread-safe, synchronized equivalent of StringBuilder (slower due to lock acquisition overhead).'
        ],
        example: {
          language: 'java',
          code: `public class StringDemo {
    public static void main(String[] args) {
        // String Constant Pool demonstration
        String s1 = "CODEINK";
        String s2 = "CODEINK";
        String s3 = new String("CODEINK"); // Explicitly forces new heap allocation

        System.out.println("s1 == s2 (Same pool reference?): " + (s1 == s2));
        System.out.println("s1 == s3 (Same memory address?): " + (s1 == s3));
        System.out.println("s1.equals(s3) (Same characters?): " + s1.equals(s3));

        // High-performance concatenation with StringBuilder
        StringBuilder sb = new StringBuilder("Java");
        for (int i = 1; i <= 3; i++) {
            sb.append(" #").append(i);
        }
        System.out.println("Built String: " + sb.toString());
    }
}`,
          output: 's1 == s2 (Same pool reference?): true\ns1 == s3 (Same memory address?): false\ns1.equals(s3) (Same characters?): true\nBuilt String: Java #1 #2 #3',
          annotations: [
            { line: 8, label: 'true: both point to the exact same String Pool instance', type: 'green' },
            { line: 9, label: 'false: new String() forces distinct heap object', type: 'yellow' },
            { line: 10, label: 'Always use .equals() for content equality check', type: 'blue' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Java String Constant Pool Memory Layout',
          subtitle: 'Literals share pooled instance; new String() allocates distinct heap object',
          elements: [
            { id: '1', label: 's1 (Stack Ref)', sublabel: 'Points to Pool', value: 'Reference', status: 'active', arrowTo: '3' },
            { id: '2', label: 's2 (Stack Ref)', sublabel: 'Reuses Pool', value: 'Reference', status: 'active', arrowTo: '3' },
            { id: '3', label: 'String Pool: "CODEINK"', sublabel: 'Heap Metaspace Pool', value: 'Shared Instance', status: 'referenced' },
            { id: '4', label: 's3 (Stack Ref)', sublabel: 'Explicit new', value: 'Reference', status: 'normal', arrowTo: '5' },
            { id: '5', label: 'Heap Object: "CODEINK"', sublabel: 'Distinct Memory', value: 'Non-Pooled Copy', status: 'normal' }
          ]
        },
        important: 'NEVER use `==` to compare Strings in business logic! `==` only checks if both pointers point to the exact same memory address. Always use `s1.equals(s2)` or `s1.equalsIgnoreCase(s2)`.',
        commonMistakes: [
          'Using `str += val` inside loops of 1,000+ iterations, degrading performance from O(n) to O(n^2) and thrashing the Garbage Collector.',
          'Assuming `s.trim()` modifies string `s` in-place. Because strings are immutable, you must reassign: `s = s.trim();`.'
        ],
        tip: 'In Java 15+, use Text Blocks (`"""..."""`) for multi-line JSON or SQL strings without messy `\\n` and `\\"` escapes.',
        interviewNote: 'Question: "Why are Strings immutable in Java?" Answer: "1. Security: prevents sensitive connection parameters/passwords from being altered. 2. Thread-safety: immutable objects are inherently safe across threads without locks. 3. String Pooling: allows caching identical literals to save massive heap RAM. 4. Safe Hashing: hashCode() is computed once and cached permanently for fast HashMap lookups."',
        practiceQuestions: [
          {
            id: 'q-java8-1',
            type: 'output',
            question: 'What is printed by: `String a = "hi"; String b = new String("hi"); System.out.println(a == b);`?',
            options: ['true', 'false', 'Compile Error', 'NullPointerException'],
            correctIndex: 1,
            explanation: '`new String("hi")` allocates a distinct object on the heap, so `a == b` compares two different memory addresses and returns false. `a.equals(b)` would return true.'
          }
        ],
        relatedTopics: ['java-arrays', 'java-classes', 'java-collections']
      }
    ]
  },

  // CHAPTER 09 — METHODS
  {
    id: 'java-ch09',
    number: 9,
    title: 'Methods',
    description: 'Method declarations, parameter passing (pass-by-value strictly), overloading, and varargs',
    topics: [
      {
        id: 'java-methods',
        subjectId: 'java',
        chapterId: 'java-ch09',
        chapterNumber: 9,
        pageNumber: 9,
        title: 'Methods: Strict Pass-by-Value, Overloading & Varargs',
        difficulty: 'beginner',
        definition: 'Methods are blocks of code encapsulating actions. Java is STRICTLY pass-by-value: for primitives, the value is copied; for objects, the reference handle is copied by value.',
        whyItMatters: 'Understanding that Java is strictly pass-by-value prevents the common misconception that reassigning an object reference parameter inside a method changes the caller\'s reference.',
        syntax: 'public static returnType methodName(Type param1, Type... varargs) {\n    return val;\n}',
        explanation: [
          'Strict Pass-by-Value: When passing primitives, the bits are copied. When passing objects, the reference pointer is copied by value.',
          'Mutating Object Internals: You can mutate the contents of an object passed to a method (`list.add(x)`), but reassigning the parameter (`list = new ArrayList()`) does NOT affect the caller.',
          'Method Overloading: Multiple methods in the same class sharing the same name with different parameter signatures (types, count, order).',
          'Varargs (`Type... args`): Allows passing 0 or more arguments, treated internally by the compiler as an array.'
        ],
        example: {
          language: 'java',
          code: `public class MethodDemo {
    // Overloaded method 1: 2 integers
    public static int sum(int a, int b) {
        return a + b;
    }

    // Overloaded method 2: Variable-length arguments (varargs)
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Demonstrating pass-by-value of object references
    public static void modifyArray(int[] arr) {
        arr[0] = 999; // Modifies the object on the heap!
        arr = new int[]{1, 2, 3}; // Reassignment only affects local parameter!
    }

    public static void main(String[] args) {
        System.out.println("Sum of 2: " + sum(10, 20));
        System.out.println("Varargs sum: " + sum(1, 2, 3, 4, 5));

        int[] data = {10, 20};
        modifyArray(data);
        System.out.println("data[0] after method call: " + data[0]); // 999!
    }
}`,
          output: 'Sum of 2: 30\nVarargs sum: 15\ndata[0] after method call: 999',
          annotations: [
            { line: 8, label: 'int... varargs accepts variable number of arguments', type: 'blue' },
            { line: 16, label: 'Modifies heap memory referenced by caller', type: 'green' },
            { line: 17, label: 'Reassignment does NOT affect caller reference', type: 'red' }
          ]
        },
        important: 'Java is ALWAYS pass-by-value. There is NO pass-by-reference in Java! When you pass an object, you pass a copy of the reference pointer by value.',
        commonMistakes: [
          'Attempting to overload methods based solely on different return types. Return type alone is NOT part of the method signature and triggers a compile error.',
          'Placing varargs before other parameters: `void f(int... nums, String name)` is illegal! Varargs must ALWAYS be the last parameter.'
        ],
        tip: 'Keep methods small and focused on a single responsibility (Clean Code Single Responsibility Principle). If a method exceeds 30 lines, consider extracting helper methods.',
        interviewNote: 'Question: "Is Java pass-by-value or pass-by-reference?" Answer: "Java is strictly 100% pass-by-value. For primitive types, the actual value is copied. For object references, a copy of the reference address is passed by value."',
        practiceQuestions: [
          {
            id: 'q-java9-1',
            type: 'output',
            question: 'What is the output of the following code?\n\npublic static void test(int x) { x = 20; }\npublic static void main(String[] args) {\n    int a = 10;\n    test(a);\n    System.out.println(a);\n}',
            options: ['10', '20', '0', 'Compile Error'],
            correctIndex: 0,
            explanation: 'Java passes primitive arguments by value (copying the value 10). The parameter `x` is modified locally inside `test`, leaving caller variable `a` completely unchanged at 10.'
          }
        ],
        relatedTopics: ['java-classes', 'java-oop-foundations']
      }
    ]
  },

  // CHAPTER 10 — OBJECT-ORIENTED PROGRAMMING
  {
    id: 'java-ch10',
    number: 10,
    title: 'Object-Oriented Programming (OOP)',
    description: 'Classes, objects, constructors, this keyword, encapsulation, and the 4 access modifiers',
    topics: [
      {
        id: 'java-oop-foundations',
        subjectId: 'java',
        chapterId: 'java-ch10',
        chapterNumber: 10,
        pageNumber: 10,
        title: 'Classes, Constructors, Encapsulation & Access Modifiers',
        difficulty: 'intermediate',
        definition: 'OOP organizes programs into classes (blueprints) and objects (instances). Encapsulation bundles data and methods, restricting direct access via private fields and public getters/setters.',
        whyItMatters: 'Encapsulation protects object integrity by validating inputs in setters, preventing external code from corrupting internal class invariants.',
        syntax: 'public class Account {\n    private double balance;\n    public Account(double init) { this.balance = init; }\n}',
        explanation: [
          'Class vs Object: A class is the template in the Method Area; an object is a stateful instance instantiated on the Java Heap.',
          'Constructors: Special initialization methods bearing the class name with no return type. If no constructor is written, the compiler generates a default no-arg constructor.',
          '`this` keyword: A reference to the current object instance, used to resolve shadowing (`this.id = id;`) or chain constructors (`this();`).',
          'Four Access Modifiers: `public` (anywhere), `protected` (package + subclasses), default/package-private (package only), `private` (same class only).'
        ],
        example: {
          language: 'java',
          code: `public class BankAccount {
    // Encapsulated private state
    private String accountNumber;
    private double balance;

    // Parameterized constructor
    public BankAccount(String accountNumber, double initialDeposit) {
        this.accountNumber = accountNumber;
        this.balance = (initialDeposit > 0) ? initialDeposit : 0.0;
    }

    // Encapsulated business behavior
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("AC-4821", 500.0);
        acc.deposit(250.0);
        System.out.println("Verified Balance: $" + acc.getBalance());
    }
}`,
          output: 'Verified Balance: $750.0',
          annotations: [
            { line: 3, label: 'private fields protect state against direct tampering', type: 'red' },
            { line: 7, label: 'this.accountNumber resolves parameter shadowing', type: 'blue' },
            { line: 13, label: 'Public method validates business constraints before mutating state', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Java 4-Tier Access Modifier Visibility Matrix',
          subtitle: 'From most restrictive (private) to least restrictive (public)',
          elements: [
            { id: '1', label: 'private', sublabel: 'Class Only', value: 'Highest Protection', status: 'active', arrowTo: '2' },
            { id: '2', label: 'default (no modifier)', sublabel: 'Same Package Only', value: 'Package-Private', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'protected', sublabel: 'Package + Subclasses', value: 'Inheritance Access', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'public', sublabel: 'Universal Access', value: 'World Visible', status: 'referenced' }
          ]
        },
        important: 'If you declare ANY custom constructor (like `BankAccount(String, double)`), Java will NOT automatically provide the default no-argument constructor! If needed, you must explicitly declare `public BankAccount() {}`.',
        commonMistakes: [
          'Making member fields `public`. This violates encapsulation, allowing any code to mutate state arbitrarily without validation.',
          'Confusing default access with `protected`. Default (package-private) does NOT allow access by subclasses outside the package.'
        ],
        tip: 'In Java 14+, use `record` for immutable data carrier classes: `public record User(int id, String name) {}`. It automatically generates constructor, getters, equals(), hashCode(), and toString()!',
        interviewNote: 'Question: "What is the difference between this and super in Java?" Answer: "`this` refers to the current class instance (accessing its members or constructors via `this()`). `super` refers to the immediate parent class instance (invoking overridden parent methods or calling parent constructors via `super()`)."',
        practiceQuestions: [
          {
            id: 'q-java10-1',
            type: 'mcq',
            question: 'Which access modifier restricts member visibility strictly to the declaring class itself?',
            options: ['protected', 'default (package-private)', 'private', 'final'],
            correctIndex: 2,
            explanation: 'The `private` access modifier enforces the highest degree of encapsulation, making members inaccessible outside the declaring class.'
          }
        ],
        relatedTopics: ['java-inheritance', 'java-polymorphism', 'java-abstraction']
      }
    ]
  }
];
