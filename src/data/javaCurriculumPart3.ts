import { Chapter } from '../types/notebook';

export const JAVA_CHAPTERS_PART3: Chapter[] = [
  // CHAPTER 21 — FILE HANDLING & I/O
  {
    id: 'java-ch21',
    number: 21,
    title: 'File Handling & Serialization',
    description: 'Path, Files (NIO.2), BufferedReader/Writer, try-with-resources, and Serializable object streams',
    topics: [
      {
        id: 'java-file-io',
        subjectId: 'java',
        chapterId: 'java-ch21',
        chapterNumber: 21,
        pageNumber: 21,
        title: 'Modern File I/O (NIO.2) & Object Serialization',
        difficulty: 'intermediate',
        definition: 'Java provides modern file handling through `java.nio.file.Files` and `Path`. Serialization converts live object graphs into byte streams via `Serializable`.',
        whyItMatters: 'Using `java.nio.file.Files` with `try-with-resources` ensures non-blocking, operating-system-optimized file reading with zero file descriptor leaks.',
        syntax: 'Path path = Path.of("data.txt");\nFiles.writeString(path, "content");\nString text = Files.readString(path);',
        explanation: [
          'Modern NIO.2 (Java 7+): Replaces legacy `java.io.File` with immutable `Path` and utility `Files`.',
          '`Files.readString()` & `Files.writeString()`: High-speed UTF-8 file operations in a single line (Java 11+).',
          '`BufferedReader` / `BufferedWriter`: Buffered character streams for streaming multi-gigabyte files line by line.',
          'Serialization: Implemented by marker interface `java.io.Serializable`. `ObjectOutputStream` writes objects; `ObjectInputStream` reconstitutes them.',
          '`transient` Keyword: Marks sensitive fields (like passwords or session tokens) that should NOT be serialized to disk or network.'
        ],
        example: {
          language: 'java',
          code: `import java.io.*;
import java.nio.file.*;

public class FileIODemo {
    public static void main(String[] args) throws IOException {
        Path tempPath = Path.of("app_log.txt");

        // High-speed atomic write (Java 11+)
        Files.writeString(tempPath, "2026-10-01 [INFO] CODEINK Kernel Ready\\nStatus: Operational");

        // Streaming file line-by-line using try-with-resources
        try (BufferedReader reader = Files.newBufferedReader(tempPath)) {
            String line;
            System.out.println("Reading log file stream:");
            while ((line = reader.readLine()) != null) {
                System.out.println("  > " + line);
            }
        }

        // Clean up temporary file
        Files.deleteIfExists(tempPath);
    }
}`,
          output: 'Reading log file stream:\n  > 2026-10-01 [INFO] CODEINK Kernel Ready\n  > Status: Operational',
          annotations: [
            { line: 9, label: 'Files.writeString writes full string with automatic UTF-8 encoding', type: 'blue' },
            { line: 12, label: 'try-with-resources automatically closes BufferedReader descriptor', type: 'green' }
          ]
        },
        important: 'Always define `private static final long serialVersionUID` on `Serializable` classes. If omitted, any minor class modification triggers `InvalidClassException` upon deserialization.',
        commonMistakes: [
          'Forgetting that `transient` fields are restored to default values (`null` or `0`) after deserialization.',
          'Not using `try-with-resources`, risking unclosed file descriptors on Windows filesystems preventing file deletion.'
        ],
        tip: 'For large text files, use `Files.lines(path)` which returns a lazy `Stream<String>`, streaming lines without loading entire multi-GB files into RAM.',
        interviewNote: 'Question: "What is the purpose of serialVersionUID in Java?" Answer: "It acts as a version control hash for a Serializable class. When deserializing, the JVM verifies that the sender\'s and receiver\'s serialVersionUID match; if they differ, it raises `InvalidClassException` to prevent data corruption."',
        practiceQuestions: [
          {
            id: 'q-java21-1',
            type: 'mcq',
            question: 'What keyword prevents a specific class field from being serialized by ObjectOutputStream in Java?',
            options: ['volatile', 'transient', 'static', 'native'],
            correctIndex: 1,
            explanation: 'The `transient` keyword instructs Java\'s serialization mechanism to skip that field during object state serialization.'
          }
        ],
        relatedTopics: ['java-exceptions', 'java-streams']
      }
    ]
  },

  // CHAPTER 22 — MULTITHREADING
  {
    id: 'java-ch22',
    number: 22,
    title: 'Multithreading & Synchronization',
    description: 'Thread lifecycle, Runnable vs Thread, synchronized blocks, race conditions, and deadlocks',
    topics: [
      {
        id: 'java-multithreading',
        subjectId: 'java',
        chapterId: 'java-ch22',
        chapterNumber: 22,
        pageNumber: 22,
        title: 'Threads, Runnable & The synchronized Keyword',
        difficulty: 'advanced',
        definition: 'Multithreading executes concurrent paths within a single process. `synchronized` locks the intrinsic monitor of an object, preventing concurrent thread race conditions.',
        whyItMatters: 'Multithreading unlocks full multi-core CPU capacity for web servers handling thousands of simultaneous HTTP requests.',
        syntax: 'Thread t = new Thread(() -> { ... });\nt.start(); // Spawns new native thread',
        explanation: [
          '`Thread` vs `Runnable`: Prefer implementing `Runnable` (or `Callable`) over extending `Thread` because Java only supports single class inheritance.',
          '`start()` vs `run()`: Calling `t.start()` registers the thread with the OS and spawns a new call stack. Calling `t.run()` merely executes the method synchronously on the main thread!',
          'Thread Lifecycle: New -> Runnable -> Running -> Blocked/Waiting/Timed-Waiting -> Terminated.',
          'Race Condition: Occurs when concurrent threads interleave non-atomic operations (`count++`), corrupting shared state.',
          '`synchronized`: Enforces mutual exclusion using the object\'s internal monitor lock.'
        ],
        example: {
          language: 'java',
          code: `class BankVault {
    private int balance = 1000;

    // synchronized locks the BankVault monitor; only 1 thread can enter at a time
    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }

    public synchronized int getBalance() {
        return balance;
    }
}

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        BankVault vault = new BankVault();

        // Spawning concurrent worker threads via Runnable lambdas
        Thread t1 = new Thread(() -> vault.withdraw(300));
        Thread t2 = new Thread(() -> vault.withdraw(200));

        t1.start(); // Launches new OS thread
        t2.start();

        t1.join(); // Blocks main thread until t1 finishes
        t2.join();

        System.out.println("Safe Remaining Balance: $" + vault.getBalance());
    }
}`,
          output: 'Safe Remaining Balance: $500',
          annotations: [
            { line: 5, label: 'synchronized keyword acquires intrinsic object monitor', type: 'blue' },
            { line: 24, label: 't.start() allocates new call stack and spawns OS thread', type: 'green' },
            { line: 27, label: 'join() synchronizes thread completion with main caller', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Java Thread State Lifecycle Diagram',
          subtitle: 'Transitioning between execution, waiting, and termination states',
          elements: [
            { id: '1', label: 'NEW', sublabel: 'new Thread()', value: 'Instantiated', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'RUNNABLE', sublabel: 'thread.start()', value: 'Ready for CPU dispatch', status: 'active', arrowTo: '3' },
            { id: '3', label: 'WAITING / BLOCKED', sublabel: 'synchronized / sleep', value: 'Awaiting lock/notification', status: 'active', arrowTo: '4' },
            { id: '4', label: 'TERMINATED', sublabel: 'run() completes', value: 'Stack Deallocated', status: 'referenced' }
          ]
        },
        important: 'NEVER call `run()` directly to start a thread! Calling `t.run()` executes the code sequentially on the current caller thread without creating any new thread.',
        commonMistakes: [
          'Assuming `volatile` makes operations like `count++` atomic. `volatile` guarantees memory visibility across CPU caches, but NOT atomicity! Use `AtomicInteger` or `synchronized`.',
          'Calling `stop()` on a thread (deprecated and dangerous; it unlocks all monitors abruptly and corrupts object state).'
        ],
        tip: 'In modern Java (Java 21+), use Virtual Threads: `Thread.startVirtualThread(() -> { ... })`. Virtual threads are lightweight user-mode threads managed by the JVM, allowing millions of concurrent threads with negligible RAM!',
        interviewNote: 'Question: "What is a Deadlock and how can it be avoided?" Answer: "A deadlock occurs when Thread 1 holds Lock A and waits for Lock B, while Thread 2 holds Lock B and waits for Lock A. Avoid it by always acquiring multiple locks in a strict, globally consistent hierarchical order."',
        practiceQuestions: [
          {
            id: 'q-java22-1',
            type: 'mcq',
            question: 'What method must be called on a Thread object to spawn a new concurrent execution thread in the operating system?',
            options: ['run()', 'start()', 'execute()', 'init()'],
            correctIndex: 1,
            explanation: 'Calling `start()` allocates a new thread stack and registers the thread with the OS scheduler, which then invokes `run()` asynchronously.'
          }
        ],
        relatedTopics: ['java-concurrency-utils', 'java-jvm-memory']
      }
    ]
  },

  // CHAPTER 23 — CONCURRENCY UTILITIES
  {
    id: 'java-ch23',
    number: 23,
    title: 'Concurrency Utilities',
    description: 'ExecutorService, Thread Pools, Callable, Future, CompletableFuture, ReentrantLock, and ConcurrentHashMap',
    topics: [
      {
        id: 'java-concurrency-utils',
        subjectId: 'java',
        chapterId: 'java-ch23',
        chapterNumber: 23,
        pageNumber: 23,
        title: 'ExecutorService, Thread Pools & CompletableFuture',
        difficulty: 'advanced',
        definition: '`java.util.concurrent` provides production concurrency abstractions: `ExecutorService` reuses worker thread pools, `Callable`/`Future` return asynchronous results, and `ConcurrentHashMap` provides lock-striping.',
        whyItMatters: 'Creating raw threads is expensive (consuming ~1MB stack RAM each). Production systems use thread pools to recycle threads and throttle concurrent workloads.',
        syntax: 'ExecutorService pool = Executors.newFixedThreadPool(4);\nFuture<T> future = pool.submit(callable);',
        explanation: [
          '`ExecutorService`: Thread pool manager decoupling task submission from thread management.',
          '`Callable<T>` vs `Runnable`: `Callable` returns a value (`T call()`) and can throw checked exceptions.',
          '`Future<T>`: Handle representing an asynchronous result; calling `.get()` blocks until the task finishes.',
          '`CompletableFuture<T>` (Java 8+): Non-blocking asynchronous programming supporting reactive callbacks (`thenApply`, `thenAccept`).',
          '`ConcurrentHashMap`: High-throughput concurrent map using lock striping (CAS operations on buckets) rather than locking the entire map.'
        ],
        example: {
          language: 'java',
          code: `import java.util.concurrent.*;

public class ExecutorDemo {
    public static void main(String[] args) throws Exception {
        // Recycle fixed pool of 2 worker threads
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // Submit asynchronous Callable task returning a value
        Callable<String> workerTask = () -> {
            Thread.sleep(100);
            return "Async computation finished on " + Thread.currentThread().getName();
        };

        Future<String> future = executor.submit(workerTask);

        System.out.println("Main thread continues executing non-blocking work...");

        // Blocks until async worker completes and retrieves result
        String result = future.get(1, TimeUnit.SECONDS);
        System.out.println("Result received: " + result);

        executor.shutdown(); // Always shutdown thread pools!
    }
}`,
          output: 'Main thread continues executing non-blocking work...\nResult received: Async computation finished on pool-1-thread-1',
          annotations: [
            { line: 6, label: 'Executors.newFixedThreadPool reuses existing threads', type: 'blue' },
            { line: 14, label: 'submit returns non-blocking Future handle', type: 'green' },
            { line: 19, label: 'future.get with timeout prevents indefinite thread hangs', type: 'yellow' }
          ]
        },
        important: 'Always call `executor.shutdown()` when your application finishes with a thread pool. Because pool worker threads are non-daemon threads by default, failing to shut them down prevents the JVM process from terminating!',
        commonMistakes: [
          'Using unbounded thread pools (`Executors.newCachedThreadPool()`) in production under heavy load, spawning thousands of threads and crashing with `OutOfMemoryError: unable to create native thread`.'
        ],
        tip: 'Always provide a timeout when calling `future.get(5, TimeUnit.SECONDS)` so a stalled remote microservice cannot freeze your application thread forever.',
        interviewNote: 'Question: "What is the difference between synchronized HashMap and ConcurrentHashMap?" Answer: "`Collections.synchronizedMap()` locks the entire map on every read and write, causing massive thread contention. `ConcurrentHashMap` uses lock-free Compare-And-Swap (CAS) and locks only individual bucket nodes (lock striping), allowing multiple threads to read and write concurrently without blocking each other."',
        practiceQuestions: [
          {
            id: 'q-java23-1',
            type: 'mcq',
            question: 'What is the key difference between Callable<T> and Runnable?',
            options: [
              'Callable can return a value and throw checked exceptions; Runnable cannot',
              'Runnable can only run on daemon threads',
              'Callable can only be used with Virtual Threads',
              'There is no difference'
            ],
            correctIndex: 0,
            explanation: '`Callable<T>` has the method `T call() throws Exception` allowing return values and checked exceptions, whereas `Runnable` defines `void run()` with no return value.'
          }
        ],
        relatedTopics: ['java-multithreading', 'java-collections', 'java-jvm-memory']
      }
    ]
  },

  // CHAPTER 24 — MEMORY & JVM INTERNALS
  {
    id: 'java-ch24',
    number: 24,
    title: 'JVM Architecture & Memory Internals',
    description: 'Stack vs Heap, Metaspace, Garbage Collection algorithms (G1, ZGC), reference types, and memory leak analysis',
    topics: [
      {
        id: 'java-jvm-memory',
        subjectId: 'java',
        chapterId: 'java-ch24',
        chapterNumber: 24,
        pageNumber: 24,
        title: 'JVM Memory: Stack vs Heap, Metaspace & Garbage Collection',
        difficulty: 'advanced',
        definition: 'The JVM memory model partitions RAM into Stack (method frames & local primitives), Heap (all object instances & strings), and Metaspace (class metadata). Garbage Collection automatically reclaims unreachable objects.',
        whyItMatters: 'Diagnosing `OutOfMemoryError: Java heap space` and tuning GC pauses is essential for mission-critical enterprise banking and low-latency microservices.',
        syntax: 'java -Xms2g -Xmx4g -XX:+UseG1GC MyApplication',
        explanation: [
          'Stack Memory: Fast, per-thread memory storing active stack frames, local variables, and primitive values. Automatically deallocated when a method returns.',
          'Heap Memory: Shared across all threads. Stores ALL objects, arrays, and class instances. Managed by the Garbage Collector.',
          'Metaspace (Java 8+): Native off-heap memory storing class bytecode structures, method definitions, and constant pools (replaced legacy PermGen).',
          'Generational Heap: Young Generation (Eden + Survivor Spaces S0/S1) for newly allocated short-lived objects; Old (Tenured) Generation for long-lived objects.',
          'Garbage Collectors: G1GC (Garbage-First, default), ZGC (ultra-low latency, sub-millisecond pauses), ParallelGC (throughput oriented).'
        ],
        example: {
          language: 'java',
          code: `public class MemoryDemo {
    public static void main(String[] args) {
        // Inspecting JVM Runtime Memory
        Runtime runtime = Runtime.getRuntime();

        long maxMemoryMB = runtime.maxMemory() / (1024 * 1024);
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);
        long freeMemoryMB = runtime.freeMemory() / (1024 * 1024);

        System.out.println("JVM Heap Architecture Metrics:");
        System.out.println("  Max Heap (-Xmx): " + maxMemoryMB + " MB");
        System.out.println("  Allocated Heap (-Xms): " + totalMemoryMB + " MB");
        System.out.println("  Available Free Heap: " + freeMemoryMB + " MB");
        System.out.println("  Available CPU Cores: " + runtime.availableProcessors());
    }
}`,
          output: 'JVM Heap Architecture Metrics:\n  Max Heap (-Xmx): 4096 MB\n  Allocated Heap (-Xms): 256 MB\n  Available Free Heap: 248 MB\n  Available CPU Cores: 8',
          annotations: [
            { line: 4, label: 'Runtime.getRuntime() queries live JVM process memory state', type: 'blue' },
            { line: 6, label: 'maxMemory represents maximum heap ceiling configured by -Xmx', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'JVM Runtime Data Areas Architecture',
          subtitle: 'Per-thread Stack memory alongside shared Heap & Metaspace',
          elements: [
            { id: '1', label: 'Stack (Thread 1)', sublabel: 'Local vars & primitives', value: 'Per-Thread (Fast)', status: 'active', arrowTo: '3' },
            { id: '2', label: 'Stack (Thread 2)', sublabel: 'Local vars & primitives', value: 'Per-Thread (Fast)', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Heap Memory', sublabel: 'Young (Eden/Survivor) + Old Gen', value: 'Shared Objects & Arrays', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Metaspace (Native RAM)', sublabel: 'Class bytecode & Method Area', value: 'Off-Heap Metadata', status: 'normal' }
          ]
        },
        important: 'Garbage Collection only reclaims objects that are UNREACHABLE from GC Roots (threads, static variables, local stack variables). If an unused object is held in a static List or Map, it CANNOT be garbage collected, creating a memory leak!',
        commonMistakes: [
          'Using un-cleared static collections (like `static List<User> cache = new ArrayList()`) which retain references forever and inevitably cause `OutOfMemoryError: Java heap space`.',
          'Attempting to force garbage collection with `System.gc()`. `System.gc()` is merely a hint to the JVM; the JVM can and frequently does ignore it.'
        ],
        tip: 'Use `WeakReference<T>` or `java.util.WeakHashMap` for in-memory caches. Weak references allow the Garbage Collector to reclaim cached entries automatically when heap memory runs low.',
        interviewNote: 'Question: "What are GC Roots in Java?" Answer: "GC Roots are starting point references that are definitely reachable: 1. Local variables and parameters on active thread call stacks. 2. Active running Thread instances. 3. Static variables referenced by loaded classes in Metaspace. 4. JNI native C pointers."',
        practiceQuestions: [
          {
            id: 'q-java24-1',
            type: 'mcq',
            question: 'Where are object instances (`new MyObject()`) stored in Java memory?',
            options: ['On the thread call stack', 'In the Heap memory', 'In the CPU cache only', 'In the register file'],
            correctIndex: 1,
            explanation: 'All object instances in Java are dynamically allocated on the Heap and managed by the Garbage Collector.'
          }
        ],
        relatedTopics: ['java-variables', 'java-multithreading', 'java-modern']
      }
    ]
  },

  // CHAPTER 25 — MODERN JAVA
  {
    id: 'java-ch25',
    number: 25,
    title: 'Modern Java (Java 14 to 21+)',
    description: 'Records, Sealed Classes, Pattern Matching for switch, Text Blocks, and Virtual Threads (Project Loom)',
    topics: [
      {
        id: 'java-modern',
        subjectId: 'java',
        chapterId: 'java-ch25',
        chapterNumber: 25,
        pageNumber: 25,
        title: 'Records, Sealed Classes & Pattern Matching',
        difficulty: 'advanced',
        definition: 'Modern Java emphasizes immutability, data modeling, and expressiveness: `record` replaces boilerplate DTOs, `sealed` classes restrict inheritance hierarchies, and pattern matching enhances type safety.',
        whyItMatters: 'Records and Sealed Classes eliminate hundreds of lines of Lombok boilerplate (getters, constructors, toString) while ensuring immutable, thread-safe domain models.',
        syntax: 'public record User(int id, String name, String email) {}\npublic sealed interface Shape permits Circle, Square {}',
        explanation: [
          '`record` (Java 16+): Immutable data carrier. Automatically generates constructor, accessors (`id()`), `equals()`, `hashCode()`, and `toString()`.',
          '`sealed` Classes (Java 17+): Restricts which specific subclasses are allowed to extend a class or implement an interface via `permits`.',
          'Pattern Matching for `switch` (Java 21+): Matches objects based on type patterns and extracts variables safely.',
          'Text Blocks (`"""..."""`): Multi-line strings preserving formatting without manual `\\n` escaping.'
        ],
        example: {
          language: 'java',
          code: `// Modern record: 1 line replaces 60 lines of boilerplate!
record Transaction(String transactionId, double amount, String currency) {}

// Sealed hierarchy
sealed interface PaymentResult permits Success, Failure {}
record Success(String authCode) implements PaymentResult {}
record Failure(String reason) implements PaymentResult {}

public class ModernJavaDemo {
    // Pattern Matching for switch (Java 21+)
    public static String handlePayment(PaymentResult result) {
        return switch (result) {
            case Success s -> "Payment Approved. Auth: " + s.authCode();
            case Failure f -> "Payment Declined: " + f.reason();
        };
    }

    public static void main(String[] args) {
        Transaction tx = new Transaction("TX-9921", 149.99, "USD");
        System.out.println("Record toString(): " + tx);

        PaymentResult res = new Success("AUTH-7782");
        System.out.println(handlePayment(res));
    }
}`,
          output: 'Record toString(): Transaction[transactionId=TX-9921, amount=149.99, currency=USD]\nPayment Approved. Auth: AUTH-7782',
          annotations: [
            { line: 2, label: 'record defines immutable data model with auto-generated methods', type: 'blue' },
            { line: 5, label: 'sealed interface limits implementations strictly to Success and Failure', type: 'yellow' },
            { line: 12, label: 'Pattern matching switch inspects type and extracts variable cleanly', type: 'green' }
          ]
        },
        important: 'Record fields are shallowly immutable (`private final`). If a record contains a mutable list, the list\'s elements CAN still be mutated! Defensively copy collections in record constructors.',
        commonMistakes: [
          'Trying to write `tx.getAmount()` on a record. Record accessor methods do NOT use the "get" prefix; they match the component name directly: `tx.amount()`.',
          'Attempting to extend another class in a record. Records cannot extend other classes because all records implicitly inherit from `java.lang.Record`.'
        ],
        tip: 'Combine Sealed Classes with Record Types and Pattern Matching to implement Algebraic Data Types (ADTs) exactly like in Haskell, Scala, or Rust.',
        interviewNote: 'Question: "What is the difference between a class and a record in Java?" Answer: "A record is a specialized immutable class. The compiler automatically emits private final fields, a canonical constructor, accessors matching field names (e.g. name() not getName()), equals(), hashCode(), and toString(). Records cannot extend other classes."',
        practiceQuestions: [
          {
            id: 'q-java25-1',
            type: 'mcq',
            question: 'What is the naming convention for accessor methods generated automatically by Java records?',
            options: [
              'Standard getters with get prefix: getId(), getName()',
              'Exact component name without prefix: id(), name()',
              'Value methods: idValue(), nameValue()',
              'Direct public field access only'
            ],
            correctIndex: 1,
            explanation: 'Java records generate accessor methods matching the exact component names (e.g. `user.id()` and `user.name()`) without any `get` prefix.'
          }
        ],
        relatedTopics: ['java-oop-foundations', 'java-abstraction', 'java-concurrency-utils']
      }
    ]
  },

  // CHAPTER 26 — DATABASE CONNECTIVITY (JDBC)
  {
    id: 'java-ch26',
    number: 26,
    title: 'Database Connectivity (JDBC)',
    description: 'Relational databases, JDBC architecture, Connection, PreparedStatement, ResultSet, transactions, and SQL injection prevention',
    topics: [
      {
        id: 'java-jdbc',
        subjectId: 'java',
        chapterId: 'java-ch26',
        chapterNumber: 26,
        pageNumber: 26,
        title: 'JDBC: PreparedStatement, ResultSet & ACID Transactions',
        difficulty: 'advanced',
        definition: 'Java Database Connectivity (JDBC) is the standard Java API for executing SQL queries on relational databases (PostgreSQL, MySQL, SQLite) using drivers, connections, statements, and result sets.',
        whyItMatters: 'Using `PreparedStatement` with parameterized placeholders (`?`) compiles SQL beforehand and guarantees protection against SQL Injection attacks.',
        syntax: 'try (PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {\n    ps.setInt(1, userId);\n}',
        explanation: [
          'JDBC Core Architecture: `DriverManager` loads vendor driver -> `Connection` represents DB session -> `PreparedStatement` compiles SQL -> `ResultSet` iterates rows.',
          'PreparedStatement: Pre-compiles SQL template; arguments are bound via `setInt()`, `setString()`. Completely prevents SQL Injection.',
          'ResultSet: Cursor pointing to row data. Call `.next()` to advance to the next row, then `.getString("col_name")` to extract data.',
          'Transactions: Disable auto-commit (`conn.setAutoCommit(false)`), execute batch queries, and call `conn.commit()` on success or `conn.rollback()` in catch blocks.'
        ],
        example: {
          language: 'java',
          code: `import java.sql.*;

public class JDBCDemo {
    public static void main(String[] args) {
        String dbUrl = "jdbc:sqlite::memory:"; // Fast in-memory SQLite URL

        try (Connection conn = DriverManager.getConnection(dbUrl)) {
            // Create table
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("CREATE TABLE products (id INT PRIMARY KEY, name TEXT, price REAL)");
            }

            // Safe parameterized PreparedStatement
            String sql = "INSERT INTO products (id, name, price) VALUES (?, ?, ?)";
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, 101);
                ps.setString(2, "Quantum Processor");
                ps.setDouble(3, 4999.99);
                ps.executeUpdate();
            }

            // Querying with ResultSet
            try (PreparedStatement query = conn.prepareStatement("SELECT name, price FROM products WHERE price > ?")) {
                query.setDouble(1, 1000.0);
                try (ResultSet rs = query.executeQuery()) {
                    while (rs.next()) {
                        System.out.println("Product: " + rs.getString("name") + " | Price: $" + rs.getDouble("price"));
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("JDBC Database Error: " + e.getMessage());
        }
    }
}`,
          output: 'Product: Quantum Processor | Price: $4999.99',
          annotations: [
            { line: 15, label: 'PreparedStatement separates SQL from parameters, preventing SQL injection', type: 'blue' },
            { line: 25, label: 'Nested try-with-resources closes ResultSet and PreparedStatement safely', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'JDBC 4-Layer Execution Architecture',
          subtitle: 'From Java Application through JDBC Driver to Relational Database',
          elements: [
            { id: '1', label: 'Java Application', sublabel: 'DAO / Repository Layer', value: 'Application Code', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'JDBC API', sublabel: 'java.sql.Connection', value: 'Standard Interface', status: 'active', arrowTo: '3' },
            { id: '3', label: 'JDBC Driver', sublabel: 'Vendor Driver (Postgres/MySQL)', value: 'Network Protocol', status: 'active', arrowTo: '4' },
            { id: '4', label: 'RDBMS Server', sublabel: 'SQL Engine & Storage', value: 'Relational Database', status: 'referenced' }
          ]
        },
        important: 'NEVER use string concatenation to build SQL statements: `stmt.executeQuery("SELECT * FROM users WHERE name = \'" + input + "\'")`. This creates a catastrophic SQL injection security exploit!',
        commonMistakes: [
          'Forgetting that JDBC column index parameter indices start at 1, NOT 0! `ps.setString(1, "val")` sets the first placeholder `?`.',
          'Not using connection pooling (like HikariCP) in enterprise web servers. Opening a new raw physical database connection on every HTTP request destroys database throughput.'
        ],
        tip: 'In enterprise Spring Boot applications, Spring Data JPA and Hibernate build on top of JDBC, but understanding raw JDBC is essential for debugging slow SQL queries and connection pool deadlocks.',
        interviewNote: 'Question: "What is the difference between Statement and PreparedStatement?" Answer: "`Statement` compiles the SQL query every single time it is executed, and is susceptible to SQL injection if concatenating strings. `PreparedStatement` pre-compiles the query on the database server once, reuses the execution plan, and treats parameters strictly as literal values, preventing SQL injection."',
        practiceQuestions: [
          {
            id: 'q-java26-1',
            type: 'mcq',
            question: 'What is the starting index of parameter placeholders (`?`) in JDBC PreparedStatement?',
            options: ['0', '1', '-1', 'Any index'],
            correctIndex: 1,
            explanation: 'Unlike zero-indexed arrays in Java, JDBC parameter placeholders in `PreparedStatement` are 1-indexed (`ps.setString(1, ...)`).'
          }
        ],
        relatedTopics: ['java-exceptions', 'java-file-io', 'java-projects']
      }
    ]
  },

  // CHAPTER 27 — TESTING & DEBUGGING
  {
    id: 'java-ch27',
    number: 27,
    title: 'Testing & Debugging',
    description: 'Unit testing with JUnit 5 (@Test, @BeforeEach), Assertions, Mockito concepts, and debugging strategies',
    topics: [
      {
        id: 'java-testing',
        subjectId: 'java',
        chapterId: 'java-ch27',
        chapterNumber: 27,
        pageNumber: 27,
        title: 'JUnit 5, Assertions & Test-Driven Development',
        difficulty: 'intermediate',
        definition: 'Unit testing verifies that small isolated units of code function as expected. JUnit 5 (Jupiter) is the de-facto testing framework for Java using annotations and assertions.',
        whyItMatters: 'Automated test suites enable continuous integration (CI/CD), catch regressions before production deployment, and facilitate fear-free refactoring.',
        syntax: '@Test\nvoid shouldCalculateDiscount() {\n    assertEquals(80.0, calculate(100.0, 20.0));\n}',
        explanation: [
          '`@Test`: Marks a method as an executable test case.',
          'Assertions (`org.junit.jupiter.api.Assertions`): `assertEquals(expected, actual)`, `assertTrue(cond)`, `assertThrows(Exception.class, lambda)`.',
          'Lifecycle Annotations: `@BeforeEach` (runs before every test), `@AfterEach`, `@BeforeAll` (runs once before all tests in class).',
          'Mocking (Mockito): Simulates external dependencies (databases, payment gateways, REST APIs) so tests run in complete isolation.'
        ],
        example: {
          language: 'java',
          code: `// Canonical Unit Testing structure simulating JUnit 5 assertions
public class CalculatorTest {
    // Business logic to be tested
    public static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return a / b;
    }

    public static void main(String[] args) {
        // Test 1: Standard calculation assertion
        int result = divide(10, 2);
        assert result == 5 : "Expected 5 but got " + result;
        System.out.println("✓ Test divide(10, 2) == 5 PASSED");

        // Test 2: Exception assertion
        boolean caught = false;
        try {
            divide(10, 0);
        } catch (ArithmeticException e) {
            caught = true;
        }
        assert caught : "Expected ArithmeticException was not thrown!";
        System.out.println("✓ Test divide by zero throws ArithmeticException PASSED");
    }
}`,
          output: '✓ Test divide(10, 2) == 5 PASSED\n✓ Test divide by zero throws ArithmeticException PASSED',
          annotations: [
            { line: 4, label: 'Target production method with boundary checks', type: 'blue' },
            { line: 13, label: 'Assertion verifies expected value equals actual result', type: 'green' }
          ]
        },
        important: 'Test methods in JUnit 5 do NOT need to be `public`! Package-private (default) visibility is recommended to keep test classes lean.',
        commonMistakes: [
          'Writing tests that depend on execution order. Unit tests must be completely independent and isolated from one another.',
          'Testing multiple unrelated behaviors in a single `@Test` method.'
        ],
        tip: 'Adopt the Arrange-Act-Assert (AAA) pattern: 1. Arrange the test data. 2. Act by invoking the method. 3. Assert the expected result.',
        interviewNote: 'Question: "What is the difference between @Mock and @Spy in Mockito?" Answer: "`@Mock` creates a completely dummy object where all methods return default values (null, 0) unless stubbed. `@Spy` wraps a real object instance, executing actual code unless specifically stubbed."',
        practiceQuestions: [
          {
            id: 'q-java27-1',
            type: 'mcq',
            question: 'Which JUnit 5 annotation executes a setup method before EACH individual test method runs?',
            options: ['@BeforeAll', '@BeforeEach', '@TestSetup', '@Init'],
            correctIndex: 1,
            explanation: '`@BeforeEach` in JUnit 5 designates that the annotated method must run prior to each `@Test` method in the current class.'
          }
        ],
        relatedTopics: ['java-exceptions', 'java-build-tools']
      }
    ]
  },

  // CHAPTER 28 — BUILD TOOLS & PROJECT STRUCTURE
  {
    id: 'java-ch28',
    number: 28,
    title: 'Build Tools & Project Architecture',
    description: 'Maven lifecycle, pom.xml, dependency management, Gradle overview, and JAR distribution',
    topics: [
      {
        id: 'java-build-tools',
        subjectId: 'java',
        chapterId: 'java-ch28',
        chapterNumber: 28,
        pageNumber: 28,
        title: 'Maven, pom.xml & Dependency Management',
        difficulty: 'intermediate',
        definition: 'Build tools automate compilation, dependency downloading, testing, and packaging. Apache Maven uses declarative XML (`pom.xml`) and convention-over-configuration.',
        whyItMatters: 'Modern enterprise applications depend on hundreds of third-party libraries. Build tools manage transitive dependencies and produce production-ready JAR/WAR artifacts.',
        syntax: 'mvn clean install    // Executes Maven build lifecycle',
        explanation: [
          'Standard Directory Layout: `src/main/java` (source code), `src/main/resources` (configs), `src/test/java` (unit tests).',
          '`pom.xml`: Project Object Model file declaring GAV coordinates (GroupId, ArtifactId, Version) and dependencies.',
          'Transitive Dependencies: If your project depends on Spring, Maven automatically downloads all libraries that Spring depends on.',
          'Maven Lifecycle: `validate` -> `compile` -> `test` -> `package` (creates JAR) -> `verify` -> `install` -> `deploy`.'
        ],
        example: {
          language: 'xml',
          code: `<!-- Canonical Maven pom.xml configuration snippet -->
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.codeink</groupId>
    <artifactId>banking-core</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <!-- Unit Testing Dependency (Scope: test only) -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
          output: '[INFO] Building banking-core 1.0.0\n[INFO] Compiling 24 source files to target/classes\n[INFO] Running TestSuite\n[INFO] BUILD SUCCESS',
          annotations: [
            { line: 5, label: 'GAV coordinates uniquely identify this software artifact', type: 'blue' },
            { line: 13, label: 'scope test prevents testing library from polluting production runtime JAR', type: 'green' }
          ]
        },
        important: 'Always use `<scope>test</scope>` for test dependencies like JUnit or Mockito. This ensures test libraries are excluded when packaging the final production executable JAR.',
        commonMistakes: [
          'Manually placing `.jar` files in a `lib/` folder like in Java 1.4. Always declare dependencies in `pom.xml` or `build.gradle` for reproducible builds.'
        ],
        tip: 'Run `mvn dependency:tree` to visualize your full transitive dependency graph and diagnose version conflicts (jar hell).',
        interviewNote: 'Question: "What is the difference between Maven and Gradle?" Answer: "Maven uses declarative XML (`pom.xml`) with a rigid lifecycle and convention-over-configuration. Gradle uses Groovy or Kotlin DSL scripts, supports incremental builds with build-cache, and is typically 2x-10x faster than Maven for large multi-module projects."',
        practiceQuestions: [
          {
            id: 'q-java28-1',
            type: 'mcq',
            question: 'What is the standard Maven directory path for Java production application source code?',
            options: ['src/code/java', 'src/main/java', 'app/src', 'java/source'],
            correctIndex: 1,
            explanation: 'The standard Maven convention dictates that production Java source code must reside inside `src/main/java`.'
          }
        ],
        relatedTopics: ['java-testing', 'java-packages-modules', 'java-projects']
      }
    ]
  },

  // CHAPTER 29 — JAVA INTERVIEW & PROBLEM SOLVING
  {
    id: 'java-ch29',
    number: 29,
    title: 'Java Interview Masterclass',
    description: 'High-yield interview questions, memory traps, == vs equals(), HashMap internals, and algorithmic coding patterns',
    topics: [
      {
        id: 'java-interview',
        subjectId: 'java',
        chapterId: 'java-ch29',
        chapterNumber: 29,
        pageNumber: 29,
        title: 'Interview Masterclass: Traps, Internals & Core Patterns',
        difficulty: 'advanced',
        definition: 'Technical Java interviews focus on memory models (Stack vs Heap, String Pool), collection internals (HashMap treeification), OOP subtleties, and concurrency hazards.',
        whyItMatters: 'Mastering classic Java gotchas separates developers who merely know surface syntax from engineers who understand JVM internals and high-throughput systems design.',
        syntax: 'Integer a = 127; Integer b = 127; // a == b is true (cached -128 to 127)\nInteger c = 128; Integer d = 128; // c == d is FALSE!',
        explanation: [
          'Integer Cache Trap: Java caches `Integer` objects between -128 and 127. `Integer.valueOf(100) == Integer.valueOf(100)` is true, but for 200 it returns false! Always use `.equals()`.',
          '`==` vs `.equals()`: `==` compares reference addresses; `.equals()` compares contents.',
          '`final` vs `finally` vs `finalize()`: `final` is a keyword modifier; `finally` is an exception block; `finalize()` is a deprecated Garbage Collection method.',
          'Fail-Fast vs Fail-Safe Iterators: `ArrayList` iterators are fail-fast (throw `ConcurrentModificationException` on mutation); `CopyOnWriteArrayList` is fail-safe.'
        ],
        example: {
          language: 'java',
          code: `import java.util.*;

public class InterviewGotchas {
    public static void main(String[] args) {
        // Trap 1: Integer Object Caching (-128 to 127)
        Integer x1 = 127;
        Integer x2 = 127;
        System.out.println("127 == 127 (Cached Pool): " + (x1 == x2)); // true!

        Integer y1 = 128;
        Integer y2 = 128;
        System.out.println("128 == 128 (Distinct Objects): " + (y1 == y2)); // false!
        System.out.println("128.equals(128): " + y1.equals(y2)); // true!

        // Algorithmic: Two-Sum in O(n) using HashMap
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.println("Two-Sum Indices: [" + map.get(complement) + ", " + i + "]");
                break;
            }
            map.put(nums[i], i);
        }
    }
}`,
          output: '127 == 127 (Cached Pool): true\n128 == 128 (Distinct Objects): false\n128.equals(128): true\nTwo-Sum Indices: [0, 1]',
          annotations: [
            { line: 7, label: 'Integers between -128 and 127 are cached by IntegerCache', type: 'yellow' },
            { line: 11, label: 'Above 127, == compares distinct object references', type: 'red' },
            { line: 18, label: 'O(n) HashMap algorithm eliminates O(n^2) nested loops', type: 'green' }
          ]
        },
        important: 'Always use `.equals()` when comparing wrapper objects (`Integer`, `Long`, `Character`). Do not rely on `==`, because autoboxing caching only applies from -128 to 127.',
        commonMistakes: [
          'Using `==` to compare `Integer` or `String` objects.',
          'Forgetting that `String.substring()` in modern Java creates a new string copy (preventing the memory leaks of pre-Java 7 substring sharing).'
        ],
        tip: 'In coding interviews, explain the Time Complexity and Space Complexity using Big-O notation before you start writing code.',
        interviewNote: 'Question: "What is the difference between Comparable and Comparator?" Answer: "`Comparable` defines natural sorting inside the domain class itself via `compareTo()`. `Comparator` defines external customized sorting logic via `compare(o1, o2)`, allowing multiple different sorting strategies (by name, by price, by date) without modifying the original class."',
        practiceQuestions: [
          {
            id: 'q-java29-1',
            type: 'output',
            question: 'What is the output of:\n\nInteger a = 128;\nInteger b = 128;\nSystem.out.println(a == b);',
            options: ['true', 'false', 'Compile Error', 'NullPointerException'],
            correctIndex: 1,
            explanation: 'Java only caches Integer wrapper objects in the range -128 to 127. Values outside this range (like 128) allocate separate heap objects, so reference equality `==` returns false.'
          }
        ],
        relatedTopics: ['java-collections', 'java-jvm-memory', 'java-projects']
      }
    ]
  },

  // CHAPTER 30 — JAVA PROJECTS
  {
    id: 'java-ch30',
    number: 30,
    title: 'Java Capstone Projects',
    description: 'Complete end-to-end practical project architectures from CLI managers to banking simulations and JDBC persistence',
    topics: [
      {
        id: 'java-projects',
        subjectId: 'java',
        chapterId: 'java-ch30',
        chapterNumber: 30,
        pageNumber: 30,
        title: 'Capstone Project: Student Ledger & Account Management',
        difficulty: 'advanced',
        definition: 'Capstone projects integrate OOP encapsulation, modern Records, Collection Framework, Exception handling, and clean layered architecture into robust working software.',
        whyItMatters: 'Synthesizing separate concepts (OOP, Collections, Streams, Exceptions) into a cohesive architecture prepares engineers for real-world enterprise software development.',
        syntax: 'public class StudentLedger { ... }',
        explanation: [
          'Architecture: Domain Models (Records), In-Memory Repository (Collections), Service Layer (Business Validation), and Presentation CLI.',
          'Encapsulation: Business rules validate positive grade boundaries and unique student IDs.',
          'Streams Integration: Stream API queries compute class averages, top performers, and filtered rosters.',
          'Extensibility: Clean separation allows swapping in-memory collections with JDBC database persistence without touching presentation logic.'
        ],
        example: {
          language: 'java',
          code: `import java.util.*;
import java.util.stream.Collectors;

// Domain Record
record Student(int id, String name, double gpa) {}

// Service Layer managing business logic
class StudentLedger {
    private final Map<Integer, Student> registry = new HashMap<>();

    public void register(int id, String name, double gpa) {
        if (gpa < 0.0 || gpa > 4.0) {
            throw new IllegalArgumentException("GPA must be between 0.0 and 4.0");
        }
        registry.put(id, new Student(id, name, gpa));
    }

    public List<Student> getHonorRoll(double minGpa) {
        return registry.values().stream()
                .filter(s -> s.gpa() >= minGpa)
                .sorted(Comparator.comparingDouble(Student::gpa).reversed())
                .collect(Collectors.toList());
    }

    public double calculateAverageGpa() {
        return registry.values().stream()
                .mapToDouble(Student::gpa)
                .average()
                .orElse(0.0);
    }
}

public class ProjectDemo {
    public static void main(String[] args) {
        StudentLedger ledger = new StudentLedger();
        ledger.register(101, "Alice Smith", 3.92);
        ledger.register(102, "Bob Jones", 3.45);
        ledger.register(103, "Charlie Davis", 3.88);

        System.out.printf("Class Average GPA: %.2f%n", ledger.calculateAverageGpa());
        System.out.println("Honor Roll Students (>= 3.8):");
        ledger.getHonorRoll(3.8).forEach(s ->
            System.out.printf("  * %-15s (GPA: %.2f)%n", s.name(), s.gpa())
        );
    }
}`,
          output: 'Class Average GPA: 3.75\nHonor Roll Students (>= 3.8):\n  * Alice Smith     (GPA: 3.92)\n  * Charlie Davis   (GPA: 3.88)',
          annotations: [
            { line: 5, label: 'Immutable domain model using modern Java record', type: 'blue' },
            { line: 17, label: 'Stream pipeline filters, sorts, and collects honor roll', type: 'green' },
            { line: 24, label: 'mapToDouble with average() computes summary statistics', type: 'yellow' }
          ]
        },
        important: 'Notice that `StudentLedger` contains zero `System.out.println()` or `Scanner` calls. Decoupling business logic from console I/O makes domain services 100% unit-testable and reusable in web servers.',
        commonMistakes: [
          'Coupling presentation I/O directly inside business model classes, preventing automated unit testing.'
        ],
        tip: 'Congratulations! You have completed the entire 30-chapter Java Programming curriculum. Continue your journey by taking the 160-Mark Java Comprehensive Final Examination Paper.',
        interviewNote: 'Question: "What is Dependency Injection and why is it used in enterprise Java (Spring)?" Answer: "Dependency Injection provides objects with their dependencies from the outside rather than constructing them internally with `new`. This promotes loose coupling, easy mocking in unit tests, and modular architecture."',
        practiceQuestions: [
          {
            id: 'q-java30-1',
            type: 'mcq',
            question: 'Why should domain service classes avoid direct `System.out` or `Scanner` console calls?',
            options: [
              'Because Java prohibits I/O in service classes',
              'To separate business logic from presentation, making services 100% unit-testable and reusable across CLI, Web, and GUI environments',
              'Because console I/O disables garbage collection',
              'To force compilation into bytecode'
            ],
            correctIndex: 1,
            explanation: 'Separating concerns ensures business services can be tested with automated JUnit tests and reused across web REST APIs, mobile apps, or desktop interfaces without modification.'
          }
        ],
        relatedTopics: ['java-modern', 'java-collections', 'java-testing']
      }
    ]
  }
];
