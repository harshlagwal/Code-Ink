import { FinalAssessment } from '../types/notebook';

export const JAVA_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'java',
  title: 'Java Programming Comprehensive Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Foundations, JVM Architecture & Core Syntax',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'java-a1',
          section: 'A',
          marks: 1,
          topic: 'JVM Architecture',
          question: 'What is the role of the Java Virtual Machine (JVM) in achieving the "Write Once, Run Anywhere" (WORA) philosophy?',
          options: [
            'It translates Java source code (.java) directly into assembly at save time',
            'It executes platform-neutral bytecode (.class) and translates it to native machine instructions for the host OS',
            'It enforces garbage collection in the operating system kernel',
            'It compiles Java code to WebAssembly'
          ],
          correctIndex: 1,
          explanation: 'The JVM provides an abstraction layer over native hardware, executing portable Java bytecode (.class files) and converting them into host-specific machine instructions.'
        },
        {
          id: 'java-a2',
          section: 'A',
          marks: 1,
          topic: 'Primitive Sizes',
          question: 'What is the strictly specified bit-width of a primitive `int` across all Java platforms and architectures?',
          options: ['16 bits', '32 bits', '64 bits', 'Varies by operating system'],
          correctIndex: 1,
          explanation: 'In Java, primitive data types have fixed bit-widths guaranteed across all platforms. An `int` is strictly 32-bit signed two\'s complement.'
        },
        {
          id: 'java-a3',
          section: 'A',
          marks: 1,
          topic: 'String Pool Equality',
          question: 'What is the result of evaluating `s1 == s2` when `String s1 = "Java"; String s2 = "Java";`?',
          options: [
            'false, because they are two distinct objects',
            'true, because string literals are interned in the String Constant Pool and share the same memory reference',
            'Compile-time syntax error',
            'Throws NullPointerException'
          ],
          correctIndex: 1,
          explanation: 'Identical string literals are interned in the JVM String Constant Pool in heap memory, so both variables point to the exact same memory address.'
        },
        {
          id: 'java-a4',
          section: 'A',
          marks: 1,
          topic: 'Array Length',
          question: 'How do you retrieve the number of elements in a Java array `int[] arr`?',
          options: ['arr.length()', 'arr.length', 'arr.size()', 'arr.count'],
          correctIndex: 1,
          explanation: 'In Java, arrays have a public final member field `.length` without parentheses. `.length()` is for String, and `.size()` is for Collections.'
        },
        {
          id: 'java-a5',
          section: 'A',
          marks: 1,
          topic: 'Access Modifiers',
          question: 'Which access modifier in Java restricts member visibility strictly to the declaring class itself?',
          options: ['default (package-private)', 'protected', 'private', 'final'],
          correctIndex: 2,
          explanation: '`private` is the most restrictive access modifier in Java, hiding fields and methods from all external classes, packages, and subclasses.'
        },
        {
          id: 'java-a6',
          section: 'A',
          marks: 1,
          topic: 'Pass-by-Value Semantics',
          question: 'What is the parameter passing mechanism in Java when passing an object reference to a method?',
          options: [
            'Pass-by-reference',
            'Pass-by-value, where a copy of the reference pointer address is passed by value',
            'Pass-by-name',
            'Pass-by-copy-restore'
          ],
          correctIndex: 1,
          explanation: 'Java is strictly 100% pass-by-value. When passing objects, Java passes a copy of the reference address by value.'
        },
        {
          id: 'java-a7',
          section: 'A',
          marks: 1,
          topic: 'Super Keyword',
          question: 'In a child class constructor, where must the explicit call to `super()` be placed?',
          options: [
            'Anywhere in the constructor body',
            'Strictly as the very first executable statement in the constructor',
            'Inside the finally block',
            'Directly before the return statement'
          ],
          correctIndex: 1,
          explanation: 'The Java language specification mandates that any explicit call to `super()` or `this()` must be the very first statement of a constructor.'
        },
        {
          id: 'java-a8',
          section: 'A',
          marks: 1,
          topic: 'Interface Fields',
          question: 'What are the implicit modifiers applied automatically to all variable fields declared inside an interface in Java?',
          options: [
            'private final',
            'public static final',
            'protected volatile',
            'package-private'
          ],
          correctIndex: 1,
          explanation: 'Every variable field declared inside an interface is automatically and implicitly `public static final` (a compile-time constant).'
        },
        {
          id: 'java-a9',
          section: 'A',
          marks: 1,
          topic: 'Short-Circuit Evaluation',
          question: 'Why does `if (str != null && str.length() > 0)` avoid throwing NullPointerException when `str` is null?',
          options: [
            'NullPointerException is a checked exception',
            'The logical && operator short-circuits, halting evaluation immediately when the left operand evaluates to false',
            'Java automatically initializes null strings to empty strings',
            'The JVM converts null to 0'
          ],
          correctIndex: 1,
          explanation: 'Short-circuit evaluation in `&&` immediately terminates the expression once the left side evaluates to false, never evaluating `str.length()`.'
        },
        {
          id: 'java-a10',
          section: 'A',
          marks: 1,
          topic: 'Checked Exceptions',
          question: 'Which of the following is an Unchecked Exception (subclass of RuntimeException) in Java?',
          options: ['IOException', 'SQLException', 'NullPointerException', 'ClassNotFoundException'],
          correctIndex: 2,
          explanation: '`NullPointerException` is a subclass of `RuntimeException`, making it an unchecked exception that does not require mandatory try-catch or throws clauses.'
        }
      ]
    },

    sectionB: {
      title: 'Section B: OOP, Collections, Generics, Lambdas & Streams',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'java-b1',
          section: 'B',
          marks: 1,
          topic: 'Dynamic Method Dispatch',
          question: 'Predict the output of the following polymorphic Java program:\n\nclass Animal {\n    void speak() { System.out.print("Animal "); }\n}\nclass Dog extends Animal {\n    void speak() { System.out.print("Bark "); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.speak();\n    }\n}',
          options: [
            '"Animal "',
            '"Bark "',
            '"Animal Bark "',
            'Compilation error'
          ],
          correctIndex: 1,
          explanation: 'Java uses Dynamic Method Dispatch for instance methods: even though the reference `a` is of type `Animal`, the actual object on the heap is `Dog`, so `Dog.speak()` is executed at runtime.'
        },
        {
          id: 'java-b2',
          section: 'B',
          marks: 1,
          topic: 'HashMap Treeification',
          question: 'In Java 8+, what optimization occurs when a single bucket in a `HashMap` experiences more than 8 hash collisions (`TREEIFY_THRESHOLD`)?',
          options: [
            'The bucket is flushed and all keys are deleted',
            'The bucket\'s linked list is converted into a balanced Red-Black Tree, improving lookup from O(n) to O(log n)',
            'An OutOfMemoryError is thrown',
            'The HashMap doubles its capacity and rehashes without trees'
          ],
          correctIndex: 1,
          explanation: 'When a bucket exceeds 8 nodes and the map capacity is at least 64, Java 8+ converts the bucket from a linked list into a balanced Red-Black Tree (TreeNode) to maintain O(log n) worst-case performance.'
        },
        {
          id: 'java-b3',
          section: 'B',
          marks: 1,
          topic: 'PECS Wildcards',
          question: 'According to the PECS (Producer Extends, Consumer Super) rule in Java Generics, which wildcard should you use if your method only reads items from a collection?',
          options: [
            'Collection<? super T>',
            'Collection<? extends T>',
            'Collection<Object>',
            'Collection<T*>'
          ],
          correctIndex: 1,
          explanation: 'Producer Extends: If the collection acts as a data producer (you only read items out of it), use the upper-bounded wildcard `? extends T`.'
        },
        {
          id: 'java-b4',
          section: 'B',
          marks: 1,
          topic: 'Stream Lazy Evaluation',
          question: 'Analyze the following Stream pipeline and identify what is printed to the console:\n\nList<String> list = List.of("apple", "banana", "avocado");\nlist.stream().filter(s -> {\n    System.out.print(s + " ");\n    return s.startsWith("a");\n});',
          options: [
            'apple banana avocado',
            'apple avocado',
            'Nothing is printed because intermediate stream operations are lazy and no terminal operation was invoked',
            'NullPointerException'
          ],
          correctIndex: 2,
          explanation: 'Intermediate stream operations (like filter and map) are strictly lazy. Because no terminal operation (such as collect, forEach, or count) was called, the pipeline never executes!'
        },
        {
          id: 'java-b5',
          section: 'B',
          marks: 1,
          topic: 'try-with-resources Lifecycle',
          question: 'What interface must a custom resource implement so that it can be declared in a Java `try-with-resources` statement?',
          options: [
            'java.io.Serializable',
            'java.lang.AutoCloseable',
            'java.lang.Cloneable',
            'java.util.Iterator'
          ],
          correctIndex: 1,
          explanation: '`try-with-resources` requires objects to implement `java.lang.AutoCloseable` (or its subinterface `java.io.Closeable`), which defines the `void close()` method.'
        },
        {
          id: 'java-b6',
          section: 'B',
          marks: 1,
          topic: 'String vs StringBuilder',
          question: 'Why should `StringBuilder` be preferred over `String` concatenation (`+=`) when appending strings in a loop of 10,000 iterations?',
          options: [
            'StringBuilder runs in native C code only',
            'String is immutable, so += creates a new String object and copies characters on every iteration (O(n^2)), while StringBuilder appends in-place in amortized O(1)',
            'String concatenation causes thread deadlocks',
            'StringBuilder bypasses heap allocation'
          ],
          correctIndex: 1,
          explanation: 'Because `String` is immutable, repeated `+=` forces the allocation of thousands of temporary String objects in heap memory, producing O(n^2) quadratic time complexity and thrashing the Garbage Collector.'
        },
        {
          id: 'java-b7',
          section: 'B',
          marks: 1,
          topic: 'Static Method Hiding',
          question: 'What occurs when a subclass defines a static method with the exact same signature as a static method in its superclass?',
          options: [
            'Dynamic method dispatch overrides the method polymorphically at runtime',
            'Method Hiding occurs; the method is resolved at compile time based on the reference type',
            'A compile-time error occurs',
            'The JVM converts the method into an abstract method'
          ],
          correctIndex: 1,
          explanation: 'In Java, static methods cannot be overridden polymorphically. The subclass method hides (shadows) the superclass method, and the call is bound statically at compile time.'
        },
        {
          id: 'java-b8',
          section: 'B',
          marks: 1,
          topic: 'Modern Java Records',
          question: 'What is a key architectural feature of Java Records (`public record User(int id, String name) {}`) introduced in Java 16?',
          options: [
            'Records are mutable heap structures with public setters',
            'Records are shallowly immutable data carriers with auto-generated constructor, accessors (id(), name()), equals(), hashCode(), and toString()',
            'Records can extend any abstract class',
            'Records bypass the JVM ClassLoader'
          ],
          correctIndex: 1,
          explanation: 'Java records are specialized immutable classes. The compiler automatically emits private final fields, canonical constructors, component accessors (without get prefix), and value-based equals/hashCode.'
        },
        {
          id: 'java-b9',
          section: 'B',
          marks: 1,
          topic: 'Thread start() vs run()',
          question: 'What is the critical difference between invoking `myThread.start()` versus `myThread.run()` in Java multithreading?',
          options: [
            'myThread.start() spawns a new OS thread and call stack; myThread.run() merely executes sequentially on the current caller thread',
            'myThread.run() is asynchronous; myThread.start() is synchronous',
            'myThread.start() is deprecated in modern Java',
            'There is no difference'
          ],
          correctIndex: 0,
          explanation: '`start()` asks the OS scheduler to spawn a new thread and allocate a new call stack. Calling `run()` directly simply executes the method like any standard method call on the calling thread.'
        },
        {
          id: 'java-b10',
          section: 'B',
          marks: 1,
          topic: 'Integer Cache Trap',
          question: 'What is the output of the following Java snippet?\n\nInteger a = 127; Integer b = 127;\nInteger c = 128; Integer d = 128;\nSystem.out.println((a == b) + " " + (c == d));',
          options: [
            'true true',
            'true false',
            'false false',
            'false true'
          ],
          correctIndex: 1,
          explanation: 'The JVM caches `Integer` objects between -128 and 127 in the IntegerCache. For 127, both variables share the cached instance (`true`). For 128, distinct heap objects are allocated, so `==` reference comparison returns `false`.'
        }
      ]
    },

    sectionC: {
      title: 'Section C: Systems Design, JVM Internals, Concurrency & Architecture',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'java-c1',
          section: 'C',
          marks: 1,
          topic: 'JVM Memory Architecture',
          question: 'Explain the difference between Java Stack memory and Java Heap memory in the JVM runtime model:',
          options: [
            'Stack memory stores all object instances and arrays; Heap memory stores thread call frames and primitives.',
            'Stack memory is private per-thread, storing local primitives and method frames with automatic LIFO deallocation; Heap memory is shared across all threads, storing all object instances managed by the Garbage Collector.',
            'Stack memory is stored on the hard drive; Heap memory resides in CPU L1 cache.',
            'Stack and Heap are identical and managed by the operating system directly.'
          ],
          correctIndex: 1,
          explanation: 'Stack memory is private to each thread and stores primitive variables and references inside active method frames. Heap memory is the shared pool where all Java object instances and arrays are allocated and managed by Garbage Collection.'
        },
        {
          id: 'java-c2',
          section: 'C',
          marks: 1,
          topic: 'ConcurrentHashMap Architecture',
          question: 'How does `ConcurrentHashMap` achieve high concurrent throughput compared to `Collections.synchronizedMap`?',
          options: [
            'By storing all data in native off-heap memory without synchronization',
            'By locking the entire map on every read and write operation',
            'By using lock-striping and Compare-And-Swap (CAS) instructions on individual bucket bins, allowing concurrent readers and writers without global locking',
            'By converting all keys into atomic integers'
          ],
          correctIndex: 2,
          explanation: '`Collections.synchronizedMap` synchronizes the entire collection on a single mutex. `ConcurrentHashMap` uses lock-free CAS reads and synchronizes only the specific bucket node (lock striping), permitting high concurrent throughput.'
        },
        {
          id: 'java-c3',
          section: 'C',
          marks: 1,
          topic: 'Generational Garbage Collection',
          question: 'What is the "Weak Generational Hypothesis" upon which the JVM Generational Garbage Collectors (G1, Parallel) are architected?',
          options: [
            'Most objects live for the entire duration of the application lifetime',
            'The vast majority of allocated objects die very shortly after creation (in the Young Generation / Eden Space)',
            'Garbage collection can only run during thread sleep periods',
            'Small objects consume more memory than large arrays'
          ],
          correctIndex: 1,
          explanation: 'Empirical studies prove that over 95% of objects are short-lived (dying immediately after method return). Generational collectors isolate newly allocated objects in the Young Gen (Eden), collecting them rapidly without scanning the entire heap.'
        },
        {
          id: 'java-c4',
          section: 'C',
          marks: 1,
          topic: 'SQL Injection Prevention',
          question: 'Why does JDBC `PreparedStatement` prevent SQL Injection attacks compared to raw `Statement` concatenation?',
          options: [
            'It forces the SQL query to run on a separate background thread',
            'It pre-compiles the SQL query template on the database engine, treating input parameters strictly as literal values rather than executable SQL code',
            'It converts all string parameters to Base64',
            'It encrypts the database connection socket with TLS 1.3'
          ],
          correctIndex: 1,
          explanation: 'A `PreparedStatement` pre-compiles the SQL command structure in the database engine first. Parameter values bound via placeholders (`?`) are handled strictly as sanitized literal data, neutralizing malicious SQL commands.'
        },
        {
          id: 'java-c5',
          section: 'C',
          marks: 1,
          topic: 'Thread Deadlocks',
          question: 'What four conditions are necessary for a Thread Deadlock to occur, and how can it be prevented in Java?',
          options: [
            'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Prevent by acquiring multiple locks in a globally uniform order.',
            'High CPU usage, low RAM, disk thrashing, network latency. Prevent by adding more RAM.',
            'Daemon threads, thread sleep, join, interrupt. Prevent by removing daemon threads.',
            'Garbage collection pause, class loading, JIT compilation, reflection. Prevent by using -Xmx.'
          ],
          correctIndex: 0,
          explanation: 'Deadlock requires Coffman\'s 4 conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait). The most effective software prevention is breaking the Circular Wait condition by acquiring locks in a consistent, uniform order.'
        },
        {
          id: 'java-c6',
          section: 'C',
          marks: 1,
          topic: 'Volatile vs Atomic',
          question: 'What guarantee does the `volatile` keyword provide in Java, and why is `volatile int counter; counter++` NOT thread-safe?',
          options: [
            'volatile guarantees mutual exclusion locking',
            'volatile guarantees CPU cache visibility (reads and writes flush directly to main RAM), but counter++ is a compound 3-step operation (read-modify-write) that is not atomic',
            'volatile converts primitive types to atomic wrappers',
            'volatile prevents threads from sleeping'
          ],
          correctIndex: 1,
          explanation: '`volatile` ensures that reads and writes bypass CPU registers and are visible across all thread caches immediately. However, `counter++` involves three separate CPU instructions (read, increment, write); without `AtomicInteger` or synchronization, concurrent increments interleave and lose updates.'
        },
        {
          id: 'java-c7',
          section: 'C',
          marks: 1,
          topic: 'Type Erasure & Monomorphization',
          question: 'What is Type Erasure in Java Generics and what is its primary technical consequence?',
          options: [
            'The JVM generates specialized C code for every type at compile time',
            'Generic type information is verified at compile time and then erased from bytecode, replacing type parameters with Object or their upper bound; consequently, generic type checks (new T(), instanceof List<String>) are impossible at runtime',
            'Generics are stored in the JVM Metaspace as separate runtime classes',
            'Type Erasure was removed in Java 8'
          ],
          correctIndex: 1,
          explanation: 'To maintain binary backward compatibility with older JVM versions, Java strips generic type arguments at compile time. At runtime, `List<String>` and `List<Integer>` have the exact same raw class `List`, preventing operations like `new T()`.'
        },
        {
          id: 'java-c8',
          section: 'C',
          marks: 1,
          topic: 'Memory Leaks in Java',
          question: 'How can a severe Memory Leak occur in a Garbage-Collected language like Java?',
          options: [
            'Memory leaks are physically impossible in Java due to automated Garbage Collection',
            'When unused objects remain strongly reachable through active GC Roots (such as unbounded static Collections or unclosed Listeners), preventing the Garbage Collector from reclaiming them',
            'When primitive variables exceed 64 bits',
            'When calling System.gc() too frequently'
          ],
          correctIndex: 1,
          explanation: 'The Garbage Collector only reclaims objects that are UNREACHABLE. If an application holds references to obsolete objects in long-lived or static collections, thread-local variables, or un-deregistered listeners, the objects cannot be collected, causing heap exhaustion.'
        },
        {
          id: 'java-c9',
          section: 'C',
          marks: 1,
          topic: 'Virtual Threads (Project Loom)',
          question: 'What is the architectural innovation of Virtual Threads introduced in Java 21?',
          options: [
            'Virtual threads run directly on GPU cores',
            'Virtual threads are lightweight, user-mode threads managed by the JVM runtime rather than 1:1 OS kernel threads, allowing applications to spawn millions of concurrent threads with minimal memory overhead',
            'Virtual threads do not support blocking network I/O',
            'Virtual threads replace the Java bytecode interpreter'
          ],
          correctIndex: 1,
          explanation: 'Standard Java platform threads map 1:1 to heavy OS kernel threads (~1MB stack). Virtual Threads (Java 21) are managed by the JVM and mounted onto carrier threads; when a virtual thread blocks on I/O, the JVM unmounts it, enabling millions of concurrent threads.'
        },
        {
          id: 'java-c10',
          section: 'C',
          marks: 1,
          topic: 'Metaspace vs PermGen',
          question: 'Why did Java 8 replace Permanent Generation (PermGen) with Metaspace in the JVM memory model?',
          options: [
            'To limit class loading to 64 megabytes',
            'PermGen had a contiguous fixed maximum size inside JVM heap that frequently triggered `OutOfMemoryError: PermGen space`; Metaspace allocates class metadata from native off-heap OS memory, expanding dynamically',
            'To merge Stack and Heap memory',
            'To encrypt compiled bytecode symbols'
          ],
          correctIndex: 1,
          explanation: 'PermGen resided within the contiguous JVM heap and had a rigid size limit, frequently causing OOM crashes during dynamic class generation or hot redeployment. Metaspace uses native off-heap memory, scaling automatically with available OS RAM.'
        }
      ]
    }
  }
};
