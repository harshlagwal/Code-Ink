import { SubjectQuestionPapers } from '../../types/notebook';

export const JAVA_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'java',
  subjectName: 'Java Programming & JVM Architecture',
  courseCode: 'CS-105-JAVA',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-105-JAVA-S1',
      title: 'Java OOP, Collections & JVM Architecture Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-105-JAVA',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).',
        'Write clean Java syntax with clear JVM memory diagrams (Stack vs Heap vs Metaspace).'
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
              id: 'java-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Pass-by-Value in Java',
              question: 'Is Java "pass-by-reference" or "pass-by-value" when passing objects into methods? Explain.',
              markingBreakdown: ['Java is strictly pass-by-value; reference addresses are copied by value: 1 Mark'],
              modelSolution: 'Java is strictly Pass-by-Value. When an object is passed as an argument, a copy of the reference address is passed by value. Reassigning the parameter reference inside the method does not change the caller\'s reference.',
              notebookCheckpoints: ['Strictly pass-by-value', 'Reference address is copied by value']
            },
            {
              id: 'java-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'String Immutability & String Pool',
              question: 'Why are `String` objects immutable in Java, and where are string literals stored in JVM memory?',
              markingBreakdown: ['Security, caching, thread safety; stored in String Constant Pool inside Heap: 1 Mark'],
              modelSolution: 'String immutability ensures security (network/DB URLs cannot be mutated), thread safety, and hashcode caching. String literals are stored in the String Constant Pool located inside the JVM Heap.',
              notebookCheckpoints: ['Thread safety & security', 'String Constant Pool in Heap']
            },
            {
              id: 'java-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'equals() and hashCode() Contract',
              question: 'State the rule of the `equals()` and `hashCode()` contract in Java.',
              markingBreakdown: ['If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode(): 1 Mark'],
              modelSolution: 'If two objects are equal according to `equals(Object)`, they MUST produce the exact same integer `hashCode()`. (The reverse is not required due to hash collisions).',
              notebookCheckpoints: ['a.equals(b) -> a.hashCode() == b.hashCode()']
            },
            {
              id: 'java-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'final Keyword',
              question: 'What is the effect of the `final` keyword when applied to:\n(a) A variable, (b) A method, and (c) A class?',
              markingBreakdown: ['Variable: constant; Method: cannot be overridden; Class: cannot be extended: 1 Mark'],
              modelSolution: '(a) Variable: Cannot be reassigned (constant).\n(b) Method: Cannot be overridden by subclasses.\n(c) Class: Cannot be inherited/extended.',
              notebookCheckpoints: ['Variable = cannot reassign', 'Method = cannot override', 'Class = cannot extend']
            },
            {
              id: 'java-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Checked vs Unchecked Exceptions',
              question: 'What is the difference between Checked Exceptions (e.g. `IOException`) and Unchecked Exceptions (e.g. `NullPointerException`)?',
              markingBreakdown: ['Checked verified at compile time; Unchecked (RuntimeException) at runtime: 1 Mark'],
              modelSolution: 'Checked exceptions subclass `Exception` and must be either caught or declared in the method signature (`throws`) at compile time. Unchecked exceptions subclass `RuntimeException` and are not verified by the compiler.',
              notebookCheckpoints: ['Checked = compile-time enforced', 'Unchecked = RuntimeException']
            },
            {
              id: 'java-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Metaspace vs PermGen',
              question: 'In Java 8+, what JVM memory area replaced PermGen for class metadata, and how does it prevent OutOfMemoryError?',
              markingBreakdown: ['Metaspace allocated in native OS memory: 1 Mark'],
              modelSolution: '`Metaspace` replaced PermGen. Unlike PermGen which had a fixed contiguous heap size, Metaspace is allocated in native OS memory and expands dynamically as needed up to available system RAM.',
              notebookCheckpoints: ['Metaspace', 'Native OS memory']
            },
            {
              id: 'java-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'volatile Keyword in Java',
              question: 'What two guarantees does the `volatile` keyword provide in Java concurrency?',
              markingBreakdown: ['Visibility across CPU caches and instruction reordering prevention: 1 Mark'],
              modelSolution: '1. Visibility: Reads and writes always go directly to main memory, bypassing CPU core caches.\n2. Instruction Reordering Prevention: Establishes a "happens-before" memory barrier.',
              notebookCheckpoints: ['Thread visibility', 'Happens-before memory barrier']
            },
            {
              id: 'java-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Generics Type Erasure',
              question: 'What happens to generic type parameters like `List<String>` during compilation (Type Erasure)?',
              markingBreakdown: ['Replaced with raw type Object or upper bound in bytecode: 1 Mark'],
              modelSolution: 'The Java compiler removes (erases) all generic type information, replacing `T` with `Object` (or its upper bound) and inserting synthetic casts in bytecode to ensure backward compatibility with pre-Java 5 JVMs.',
              notebookCheckpoints: ['Type parameters erased to Object', 'Synthetic casts inserted']
            },
            {
              id: 'java-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Autoboxing Cache Range',
              question: 'What is the default integer caching range where `Integer a = 100, b = 100; a == b` evaluates to `true`?',
              markingBreakdown: ['-128 to 127: 1 Mark'],
              modelSolution: 'The `IntegerCache` caches values from `-128` to `127`. Within this range, `Integer` autoboxing returns the same object reference, so `==` evaluates to `true`.',
              notebookCheckpoints: ['-128 to 127']
            },
            {
              id: 'java-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Functional Interfaces',
              question: 'What defines a "Functional Interface" in Java, and what annotation is recommended to mark it?',
              markingBreakdown: ['Interface with exactly one abstract method, marked with @FunctionalInterface: 1 Mark'],
              modelSolution: 'A Functional Interface is an interface containing exactly one abstract method (Single Abstract Method - SAM), typically annotated with `@FunctionalInterface`.',
              notebookCheckpoints: ['Exactly one abstract method', '@FunctionalInterface']
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
              id: 'java-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'HashMap Internal Architecture & Hash Collisions',
              question: 'Explain the internal architecture of `java.util.HashMap` in Java 8+:\n(a) Describe how bucket index is calculated (`(n - 1) & hash`).\n(b) Explain what happens when a collision occurs and at what threshold (TREEIFY_THRESHOLD = 8) the bucket converts from a Singly Linked List to a Red-Black Tree.\n(c) Draw a memory layout diagram of HashMap buckets and nodes in your notebook.',
              markingBreakdown: [
                'Bitwise bucket calculation explanation: 1.5 Marks',
                'Linked list to Red-Black tree conversion (threshold 8): 2 Marks',
                'Bucket array and node diagram: 1.5 Marks'
              ],
              modelSolution: `(a) Bucket Index Calculation:
HashMap computes index via \`int index = (table.length - 1) & hash\`. Because table length is always a power of 2 ($2^k$), this bitwise AND acts as a fast modulo arithmetic operation.

(b) Collision Resolution & Treeification:
- When two different keys hash to the same bucket index, they are stored in a Singly Linked List (Node).
- In Java 8, if the number of collisions in a single bucket reaches \`TREEIFY_THRESHOLD = 8\` and total table capacity is at least 64, the linked list is transformed into a balanced Red-Black Tree (TreeNode).
- This improves worst-case lookup from $O(N)$ down to $O(\\log N)$.

(c) Diagram:
[Bucket Array (Node<K,V>[] table)]
[Index 0] -> null
[Index 1] -> [Node (K1, V1)] -> [Node (K2, V2)] (Linked List)
[Index 2] -> [TreeNode (K3, V3)] (Red-Black Balanced Tree)
                /          \\
         [TreeNode]      [TreeNode]`,
              notebookCheckpoints: [
                '(n - 1) & hash formula',
                'Treeification threshold: 8 nodes into Red-Black tree',
                'Worst-case search improves from O(N) to O(log N)'
              ]
            },
            {
              id: 'java-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Double-Checked Locking Singleton Pattern',
              question: 'Implement a thread-safe Singleton class in Java using the Double-Checked Locking pattern.\n(a) Explain why the `instance` field must be declared `volatile`.\n(b) Write the complete implementation with private constructor and synchronized block.',
              markingBreakdown: [
                'volatile explanation (prevents instruction reordering): 2.5 Marks',
                'Double-checked locking implementation: 2.5 Marks'
              ],
              modelSolution: `\`\`\`java
public class DatabaseConnection {
    // volatile is mandatory to prevent CPU instruction reordering!
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        // Prevent reflection instantiation
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method");
        }
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) { // First check (no locking overhead)
            synchronized (DatabaseConnection.class) {
                if (instance == null) { // Second check (guarded by lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
\`\`\`
Why volatile is essential:
Instantiating an object involves 3 steps: (1) allocate memory, (2) run constructor, (3) assign memory address to reference. Without volatile, the JVM optimizer can reorder steps 2 and 3, publishing a partially constructed object to other threads!`,
              notebookCheckpoints: [
                'private static volatile DatabaseConnection instance;',
                'Double if (instance == null) checks',
                'Explain instruction reordering hazard'
              ]
            },
            {
              id: 'java-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Java 8 Streams & Lambdas',
              question: 'Given `List<Employee> employees = List.of(...)` where `Employee` has `getDepartment()`, `getSalary()`, and `getName()`:\nWrite Java 8 Stream pipelines to:\n(a) Filter employees earning over $75,000 and collect their names into a sorted List.\n(b) Group employees by Department and calculate the average salary per department using `Collectors.groupingBy` and `Collectors.averagingDouble`.',
              markingBreakdown: [
                'Filtering, mapping, and collecting sorted names: 2.5 Marks',
                'Collectors.groupingBy with averagingDouble: 2.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.*;
import java.util.stream.Collectors;

class StreamTasks {
    // (a) Filter salary > 75000 and collect sorted names
    public static List<String> getHighEarnerNames(List<Employee> employees) {
        return employees.stream()
            .filter(e -> e.getSalary() > 75000)
            .map(Employee::getName)
            .sorted()
            .collect(Collectors.toList());
    }

    // (b) Group by department and compute average salary
    public static Map<String, Double> getAverageSalaryByDept(List<Employee> employees) {
        return employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                Collectors.averagingDouble(Employee::getSalary)
            ));
    }
}
\`\`\``,
              notebookCheckpoints: [
                '.filter(...).map(...).sorted().collect(...)',
                'Collectors.groupingBy with Collectors.averagingDouble'
              ]
            },
            {
              id: 'java-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Try-with-Resources & AutoCloseable',
              question: 'Explain how Java 7 "Try-with-Resources" eliminates boilerplate `finally` blocks and resource leaks.\n(a) What interface must a resource class implement?\n(b) Write a snippet copying data from `FileInputStream` to `FileOutputStream` using Try-with-Resources.',
              markingBreakdown: [
                'AutoCloseable interface explanation: 2 Marks',
                'Try-with-resources file copy snippet: 3 Marks'
              ],
              modelSolution: `(a) The resource class must implement \`java.lang.AutoCloseable\` (or \`java.io.Closeable\`).

(b) File Copy Snippet:
\`\`\`java
import java.io.*;

public class FileCopy {
    public static void copy(String src, String dest) throws IOException {
        // Both streams are automatically closed upon try block exit, even during exceptions!
        try (InputStream in = new FileInputStream(src);
             OutputStream out = new FileOutputStream(dest)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Implements AutoCloseable',
                'try (InputStream in = ...; OutputStream out = ...)'
              ]
            },
            {
              id: 'java-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'JVM Garbage Collection Generations',
              question: 'Draw an architectural diagram of the JVM Heap memory layout in your notebook:\n(a) Young Generation: Eden Space, Survivor Space S0, Survivor Space S1.\n(b) Old / Tenured Generation.\n(c) Explain object aging: how objects survive Minor GCs and are promoted to Old Generation after reaching the Tenuring Threshold.',
              markingBreakdown: [
                'JVM Heap layout diagram (Eden, S0, S1, Old Gen): 2.5 Marks',
                'Object promotion and tenuring threshold explanation: 2.5 Marks'
              ],
              modelSolution: `JVM Heap Diagram:
+---------------------------------------------------+--------------------+
|                   Young Generation                |   Old Generation   |
+--------------------------+-----------+------------+                    |
|       Eden Space         | Survivor0 | Survivor1  |      Tenured       |
| (new objects allocated)  |   (S0)    |   (S1)     |  (long-lived data) |
+--------------------------+-----------+------------+--------------------+

Object Aging Process:
1. New objects are allocated in Eden Space.
2. Minor GC triggers when Eden is full: live objects are copied to Survivor space S0 with age = 1.
3. On the next Minor GC, live objects from Eden and S0 are copied to S1, and their age increments.
4. When an object\'s age reaches the Tenuring Threshold (default \`-XX:MaxTenuringThreshold=15\`), it is promoted to the Old/Tenured Generation.`,
              notebookCheckpoints: [
                'Draw Eden, S0, S1, and Tenured spaces',
                'Explain -XX:MaxTenuringThreshold promotion'
              ]
            },
            {
              id: 'java-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Comparable vs Comparator',
              question: 'Differentiate between `java.lang.Comparable` and `java.util.Comparator`.\nImplement a class `Student(name, gpa)` with natural ordering by GPA using `Comparable`, and an external `Comparator` that sorts students alphabetically by name.',
              markingBreakdown: [
                'Comparable natural ordering vs Comparator custom ordering: 2 Marks',
                'Comparable<Student> compareTo: 1.5 Marks',
                'Comparator<Student> compare: 1.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.*;

public class Student implements Comparable<Student> {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String getName() { return name; }
    public double getGpa() { return gpa; }

    // Comparable: Natural ordering by GPA descending
    @Override
    public int compareTo(Student other) {
        return Double.compare(other.gpa, this.gpa);
    }
}

// Comparator: Custom ordering by Name alphabetically
class StudentNameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getName().compareTo(s2.getName());
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Comparable implements compareTo(T)',
                'Comparator implements compare(T, T)',
                'Double.compare usage'
              ]
            },
            {
              id: 'java-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Deadlock Detection with jstack',
              question: 'Explain how Deadlocks occur in Java when threads acquire intrinsic object monitors (`synchronized`). Write a small program reproducing a thread deadlock, and describe how to diagnose it using the JDK `jstack` tool.',
              markingBreakdown: [
                'Deadlock reproduction code with two locks: 3 Marks',
                'jstack analysis explanation: 2 Marks'
              ],
              modelSolution: `\`\`\`java
public class DeadlockDemo {
    private static final Object lockA = new Object();
    private static final Object lockB = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (lockA) {
                try { Thread.sleep(50); } catch (Exception e) {}
                synchronized (lockB) { System.out.println("T1 done"); }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (lockB) {
                try { Thread.sleep(50); } catch (Exception e) {}
                synchronized (lockA) { System.out.println("T2 done"); }
            }
        });

        t1.start();
        t2.start();
    }
}
\`\`\`
Diagnostic using jstack:
Run \`jstack <PID>\`.
The JVM thread dump explicitly identifies:
\`\`\`
Found 1 deadlock.
"Thread-1": waiting to lock monitor 0x00007f (object lockA), which is held by "Thread-0"
"Thread-0": waiting to lock monitor 0x00007e (object lockB), which is held by "Thread-1"
\`\`\``,
              notebookCheckpoints: [
                'Circular lock acquisition in synchronized blocks',
                'jstack <PID> thread dump output'
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
              id: 'java-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Concurrency: Building a Thread-Safe Bounded BlockingQueue',
              question: 'Implement a custom Bounded Blocking Queue in Java using `ReentrantLock` and `Condition` variables (simulating `ArrayBlockingQueue`):\n(a) Fixed-capacity circular array storage for items.\n(b) Synchronize access using one `ReentrantLock` and two conditions: `notFull` and `notEmpty`.\n(c) Implement `put(T item)` that blocks when the queue is full.\n(d) Implement `take()` that blocks when the queue is empty.\n(e) Explain why `while` loops (not `if`) must always guard condition waits to prevent Spurious Wakeups.',
              markingBreakdown: [
                'Array storage and lock initialization: 2.5 Marks',
                'put() with notFull.await(): 3 Marks',
                'take() with notEmpty.await(): 3 Marks',
                'Spurious wakeup prevention explanation: 1.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.concurrent.locks.*;

public class CustomBlockingQueue<T> {
    private final Object[] items;
    private int count = 0;
    private int putIndex = 0;
    private int takeIndex = 0;

    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public CustomBlockingQueue(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException();
        this.items = new Object[capacity];
    }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            // Must use while loop to guard against spurious wakeups!
            while (count == items.length) {
                notFull.await(); // Releases lock and suspends thread
            }
            items[putIndex] = item;
            if (++putIndex == items.length) putIndex = 0;
            count++;
            notEmpty.signal(); // Wake up any waiting consumers
        } finally {
            lock.unlock();
        }
    }

    @SuppressWarnings("unchecked")
    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) {
                notEmpty.await();
            }
            T item = (T) items[takeIndex];
            items[takeIndex] = null; // Prevent memory leak
            if (++takeIndex == items.length) takeIndex = 0;
            count--;
            notFull.signal(); // Wake up any waiting producers
            return item;
        } finally {
            lock.unlock();
        }
    }
}
\`\`\`
Spurious Wakeup Explanation:
Operating system scheduling anomalies can awaken a thread from \`await()\` even if no signal was sent. If an \`if\` condition were used, the thread would proceed to write to a full array or read from an empty array. The \`while\` loop re-verifies the condition upon every wakeup.`,
              notebookCheckpoints: [
                'ReentrantLock with two Condition variables',
                'while loop guarding await() calls',
                'Signal appropriate condition on state change'
              ]
            },
            {
              id: 'java-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Enterprise Architecture: Custom Annotation Processor & Reflection DI Container',
              question: 'Construct a lightweight Dependency Injection (DI) Container in Java:\n(a) Custom runtime annotation `@Inject` and `@Service`.\n(b) Class `DIContainer` with method `register(Class<?> serviceClass)`.\n(c) Method `getInstance(Class<T> type)` that instantiates the requested class, inspects fields marked `@Inject` using Java Reflection, recursively resolves their dependencies, and injects them.\n(d) Handle circular dependencies gracefully or detect cycles.',
              markingBreakdown: [
                'Custom annotations @Inject and @Service: 2 Marks',
                'Recursive dependency resolution and instantiation: 4 Marks',
                'Field injection via reflection (setAccessible): 2.5 Marks',
                'Circular dependency cycle detection: 1.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Inject {}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Service {}

public class DIContainer {
    private final Map<Class<?>, Object> singletons = new HashMap<>();
    private final Set<Class<?>> inProgress = new HashSet<>();

    @SuppressWarnings("unchecked")
    public <T> T getInstance(Class<T> clazz) {
        if (singletons.containsKey(clazz)) {
            return (T) singletons.get(clazz);
        }

        // Circular Dependency Detection
        if (!inProgress.add(clazz)) {
            throw new RuntimeException("Circular dependency detected on: " + clazz.getName());
        }

        try {
            // Instantiate target
            Constructor<T> ctor = clazz.getDeclaredConstructor();
            ctor.setAccessible(true);
            T instance = ctor.newInstance();

            // Inject fields
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(Inject.class)) {
                    field.setAccessible(true);
                    Object dependency = getInstance(field.getType()); // Recursive resolution
                    field.set(instance, dependency);
                }
            }

            singletons.put(clazz, instance);
            return instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to instantiate " + clazz.getName(), e);
        } finally {
            inProgress.remove(clazz);
        }
    }
}
\`\`\``,
              notebookCheckpoints: [
                '@Retention(RetentionPolicy.RUNTIME)',
                'field.setAccessible(true)',
                'Circular dependency detection with inProgress set'
              ]
            },
            {
              id: 'java-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'High-Throughput Concurrency: Virtual Threads (Project Loom)',
              question: 'Analyze Java 21 Virtual Threads (Project Loom) architecture:\n(a) Contrast Platform (OS) Threads vs Virtual Threads regarding memory footprint, context switching, and scaling limits.\n(b) Explain how the JVM scheduler mounts and unmounts Virtual Threads onto Carrier (OS) Threads using Continuations.\n(c) What is "Thread Pinning" and why does `synchronized` blocks or native code prevent virtual threads from unmounting?\n(d) Write code executing 100,000 concurrent network tasks using `Executors.newVirtualThreadPerTaskExecutor()`.',
              markingBreakdown: [
                'Platform threads vs Virtual threads comparison: 3 Marks',
                'Carrier thread mounting/unmounting architecture: 2.5 Marks',
                'Thread Pinning explanation and ReentrantLock remedy: 2.5 Marks',
                'Executors.newVirtualThreadPerTaskExecutor code snippet: 2 Marks'
              ],
              modelSolution: `(a) Platform Threads vs Virtual Threads:
- Platform (OS) Threads: 1:1 mapping with OS kernel threads. Heavy stack allocation (~1MB per thread). Max scaling limit ~5,000 threads before exhausting OS memory. Context switches require expensive kernel ring transitions.
- Virtual Threads: M:N user-mode threads managed purely by the JVM on the heap. Extremely lightweight (~1KB stack). 1,000,000+ virtual threads can run simultaneously.

(b) Carrier Threads & Continuations:
When a virtual thread executes non-blocking code, it is mounted onto a Carrier OS Thread (from a ForkJoinPool). When the virtual thread performs blocking I/O (e.g. socket read, HTTP call), the JVM captures its call stack Continuation, unmounts it from the carrier thread, and parks it. The carrier thread immediately executes another virtual thread!

(c) Thread Pinning:
Pinning occurs when a virtual thread cannot be unmounted during blocking I/O because its call stack is pinned to the carrier thread. This happens when:
1. Executing inside a \`synchronized\` block or method.
2. Executing JNI native code.
Remedy: Replace \`synchronized\` with \`java.util.concurrent.locks.ReentrantLock\`.

\`\`\`java
// (d) 100,000 Concurrent Virtual Threads
import java.util.concurrent.*;

public class VirtualThreadDemo {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 100_000; i++) {
                final int id = i;
                executor.submit(() -> {
                    Thread.sleep(1000); // Non-blocking virtual thread sleep
                    return id;
                });
            }
        } // Auto-closes and waits for all 100,000 tasks to finish!
        System.out.println("Completed 100,000 tasks effortlessly.");
    }
}
\`\`\``,
              notebookCheckpoints: [
                'OS thread ~1MB vs Virtual thread ~1KB',
                'Carrier thread mounting via Continuations',
                'Thread pinning in synchronized blocks',
                'Executors.newVirtualThreadPerTaskExecutor'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-105-JAVA-S2',
      title: 'Java Concurrency, JVM Internals & Memory Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-105-JAVA',
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
              id: 'java-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'CopyOnWriteArrayList',
              question: 'When is `java.util.concurrent.CopyOnWriteArrayList` ideal to use over synchronized lists?',
              markingBreakdown: ['Read-heavy workloads with very rare writes: 1 Mark'],
              modelSolution: 'It is ideal for high-concurrency read-heavy scenarios where reads vastly outnumber writes, because reads are entirely lock-free and never block.',
              notebookCheckpoints: ['Read-heavy, rare write scenarios']
            },
            {
              id: 'java-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Java Memory Model (JMM)',
              question: 'What is the "Happens-Before" relationship in the Java Memory Model?',
              markingBreakdown: ['Formal guarantee that memory writes by one action are visible to another: 1 Mark'],
              modelSolution: 'A formal specification guaranteeing that memory writes performed by one thread are visibly guaranteed to be read by another thread without caching or reordering anomalies.',
              notebookCheckpoints: ['Memory write visibility guarantee']
            },
            {
              id: 'java-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'AtomicInteger CAS',
              question: 'What low-level hardware CPU instruction powers `AtomicInteger.compareAndSet()`?',
              markingBreakdown: ['Compare-And-Swap (CAS) / CMPXCHG: 1 Mark'],
              modelSolution: 'The atomic Compare-And-Swap (CAS) instruction (e.g. `CMPXCHG` on x86 architectures).',
              notebookCheckpoints: ['Compare-And-Swap (CAS)']
            },
            {
              id: 'java-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'PhantomReference',
              question: 'What is a `PhantomReference` used for in advanced JVM systems?',
              markingBreakdown: ['Scheduling post-mortem cleanup after object finalization before memory release: 1 Mark'],
              modelSolution: 'It is used with a `ReferenceQueue` to perform reliable, post-mortem resource cleanup and off-heap memory freeing after an object is finalized but before its memory is deallocated.',
              notebookCheckpoints: ['Post-mortem cleanup with ReferenceQueue']
            },
            {
              id: 'java-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'ThreadLocal Memory Leaks',
              question: 'Why must `ThreadLocal.remove()` always be called when using thread pools in application servers?',
              markingBreakdown: ['Thread pool workers are reused, retaining thread-local objects forever: 1 Mark'],
              modelSolution: 'Worker threads in thread pools are reused and never terminate. If `remove()` is not called, values stored in the thread\'s internal `ThreadLocalMap` remain anchored forever, causing serious memory leaks.',
              notebookCheckpoints: ['Pool threads never terminate', 'ThreadLocalMap leak']
            },
            {
              id: 'java-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Record Classes (Java 16+)',
              question: 'What are Java `record` classes, and are their fields mutable or immutable?',
              markingBreakdown: ['Immutable data carriers with auto-generated constructor, getters, equals, hashCode: 1 Mark'],
              modelSolution: 'Records are transparent immutable data carrier classes where all fields are `private final` by default, with compiler-generated constructor, accessors, `equals()`, `hashCode()`, and `toString()`.',
              notebookCheckpoints: ['Immutable data carriers', 'private final fields']
            },
            {
              id: 'java-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Sealed Classes (Java 17+)',
              question: 'What does the `permits` clause specify in a `sealed class`?',
              markingBreakdown: ['Restricts which exact subclasses are authorized to extend the class: 1 Mark'],
              modelSolution: 'The `permits` clause explicitly defines which specific subclasses are allowed to extend or implement the sealed class, forbidding arbitrary external inheritance.',
              notebookCheckpoints: ['Restricts authorized subclasses']
            },
            {
              id: 'java-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'G1 Garbage Collector',
              question: 'How does the G1 (Garbage-First) collector divide the JVM Heap differently from traditional collectors?',
              markingBreakdown: ['Divides heap into equal-sized virtual memory regions: 1 Mark'],
              modelSolution: 'G1 partitions the heap into hundreds of equal-sized non-contiguous virtual memory Regions (1MB to 32MB) assigned dynamically as Eden, Survivor, or Old spaces.',
              notebookCheckpoints: ['Equal-sized virtual regions']
            },
            {
              id: 'java-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Unsafe Class',
              question: 'What capability does `sun.misc.Unsafe` provide that standard Java restricts?',
              markingBreakdown: ['Direct off-heap memory allocation and arbitrary pointer arithmetic: 1 Mark'],
              modelSolution: 'It allows low-level direct off-heap memory allocation (`allocateMemory`), direct byte manipulation, and arbitrary pointer access, bypassing JVM safety checks.',
              notebookCheckpoints: ['Direct off-heap memory allocation']
            },
            {
              id: 'java-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Pattern Matching for switch',
              question: 'In modern Java (Java 21), how does pattern matching in `switch` handle `null` cases?',
              markingBreakdown: ['Allows explicit case null: branch without throwing NullPointerException: 1 Mark'],
              modelSolution: 'Modern `switch` allows an explicit `case null -> ...` branch, gracefully handling null values without throwing `NullPointerException`.',
              notebookCheckpoints: ['Explicit case null: branch']
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
              id: 'java-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'CompletableFuture Pipeline Composition',
              question: 'Write a Java snippet using `CompletableFuture` that:\n1. Asynchronously fetches user data from an API via `supplyAsync`.\n2. Transforms the user into an order list using `thenCompose`.\n3. Combines with a payment confirmation service using `thenCombine`.\n4. Handles any exceptions gracefully with `.exceptionally()`.',
              markingBreakdown: [
                'supplyAsync and thenCompose: 2.5 Marks',
                'thenCombine and exceptionally: 2.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.concurrent.CompletableFuture;

public class AsyncPipeline {
    public static void run() {
        CompletableFuture<String> pipeline = CompletableFuture.supplyAsync(() -> fetchUser(101))
            .thenCompose(user -> fetchOrders(user))
            .thenCombine(fetchPaymentStatus(), (orders, payment) -> {
                return "Order Summary: " + orders + " | Payment: " + payment;
            })
            .exceptionally(ex -> "Fallback error handling: " + ex.getMessage());

        System.out.println(pipeline.join());
    }

    static String fetchUser(int id) { return "User Alice"; }
    static CompletableFuture<String> fetchOrders(String user) {
        return CompletableFuture.supplyAsync(() -> "Orders[Item1, Item2]");
    }
    static CompletableFuture<String> fetchPaymentStatus() {
        return CompletableFuture.supplyAsync(() -> "PAID_VERIFIED");
    }
}
\`\`\``,
              notebookCheckpoints: [
                'supplyAsync for initial async task',
                'thenCompose for flatMapping futures',
                'thenCombine and exceptionally'
              ]
            },
            {
              id: 'java-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Fork/Join Framework & Work-Stealing',
              question: 'Explain the Work-Stealing algorithm in the Fork/Join framework (`ForkJoinPool`). Implement a `RecursiveTask<Long>` class `SumTask` that computes the sum of a 1,000,000-element array in parallel by subdividing work below a threshold of 10,000.',
              markingBreakdown: [
                'Work-stealing dual-ended queue explanation: 2 Marks',
                'RecursiveTask implementation with compute(): 3 Marks'
              ],
              modelSolution: `Work-Stealing:
Each worker thread maintains its own double-ended queue (deque). When a worker runs out of local tasks, it "steals" tasks from the tail of another busy worker\'s deque, ensuring balanced CPU saturation across all cores.

\`\`\`java
import java.util.concurrent.*;

public class SumTask extends RecursiveTask<Long> {
    private static final int THRESHOLD = 10_000;
    private final long[] array;
    private final int start, end;

    public SumTask(long[] array, int start, int end) {
        this.array = array; this.start = start; this.end = end;
    }

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            long sum = 0;
            for (int i = start; i < end; i++) sum += array[i];
            return sum;
        } else {
            int mid = (start + end) / 2;
            SumTask left = new SumTask(array, start, mid);
            SumTask right = new SumTask(array, mid, end);
            left.fork(); // Asynchronous queue
            long rightResult = right.compute();
            long leftResult = left.join();
            return leftResult + rightResult;
        }
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Work-stealing deque explanation',
                'left.fork() and left.join()'
              ]
            },
            {
              id: 'java-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Custom ClassLoader Implementation',
              question: 'Explain the ClassLoader Delegation Hierarchy (Bootstrap -> Platform/Extension -> Application ClassLoader). Implement a custom `ByteArrayClassLoader` extending `ClassLoader` that overrides `findClass(String name)` using `defineClass()` to load bytecode directly from a byte array.',
              markingBreakdown: [
                'Delegation hierarchy explanation: 2 Marks',
                'Custom findClass overriding defineClass: 3 Marks'
              ],
              modelSolution: `Delegation Hierarchy:
When asked to load a class, a ClassLoader first delegates to its parent. Only if the parent fails (throws ClassNotFoundException) does the child attempt to load it itself.

\`\`\`java
public class ByteArrayClassLoader extends ClassLoader {
    private final byte[] classBytes;

    public ByteArrayClassLoader(byte[] classBytes, ClassLoader parent) {
        super(parent);
        this.classBytes = classBytes;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if (classBytes != null) {
            return defineClass(name, classBytes, 0, classBytes.length);
        }
        return super.findClass(name);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Parent-first delegation model',
                'Override findClass',
                'Call defineClass(name, bytes, 0, len)'
              ]
            },
            {
              id: 'java-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Phaser and CountDownLatch Concurrency',
              question: 'Contrast `CountDownLatch` with `Phaser` in Java. Write code using `CountDownLatch` where 3 initialization worker threads signal the main thread that services are ready before accepting network traffic.',
              markingBreakdown: [
                'CountDownLatch (one-shot) vs Phaser (multi-phase/dynamic) comparison: 2 Marks',
                'CountDownLatch implementation (countDown, await): 3 Marks'
              ],
              modelSolution: `Difference:
- \`CountDownLatch\`: Fixed one-time countdown latch. Once the count reaches 0, it cannot be reset.
- \`Phaser\`: Reusable multi-phase barrier that supports dynamic registration and deregistration of parties at runtime.

\`\`\`java
import java.util.concurrent.*;

public class LatchDemo {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(3);

        for (int i = 1; i <= 3; i++) {
            final int id = i;
            new Thread(() -> {
                System.out.println("Service " + id + " initialized.");
                latch.countDown();
            }).start();
        }

        // Main thread waits until all 3 services call countDown()
        latch.await();
        System.out.println("All services online. Starting server gateway!");
    }
}
\`\`\``,
              notebookCheckpoints: [
                'CountDownLatch(3)',
                'latch.countDown() in workers',
                'latch.await() in main thread'
              ]
            },
            {
              id: 'java-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Off-Heap Memory & DirectByteBuffer',
              question: 'Explain what Off-Heap memory is in Java. Write a snippet allocating a 10MB off-heap buffer using `ByteBuffer.allocateDirect()`. Explain why off-heap memory avoids GC pauses and how it is reclaimed.',
              markingBreakdown: [
                'Off-heap memory explanation and GC pause prevention: 2.5 Marks',
                'ByteBuffer.allocateDirect implementation and Cleaner deallocation: 2.5 Marks'
              ],
              modelSolution: `Off-Heap memory is allocated outside the managed JVM heap using native OS \`malloc()\`.
Benefits: Because the JVM garbage collector does not scan off-heap memory, multi-gigabyte caches can be maintained with zero GC pauses.

\`\`\`java
import java.nio.ByteBuffer;

public class OffHeapDemo {
    public static void main(String[] args) {
        // Allocates 10MB outside JVM heap
        ByteBuffer directBuf = ByteBuffer.allocateDirect(10 * 1024 * 1024);
        directBuf.putInt(42);
        directBuf.flip();
        System.out.println("Read from off-heap: " + directBuf.getInt());
    }
}
\`\`\`
Deallocation:
DirectByteBuffer instances are linked to a \`jdk.internal.ref.Cleaner\` object. When the tiny on-heap wrapper object is garbage collected, the Cleaner invokes native \`free()\` to reclaim off-heap RAM.`,
              notebookCheckpoints: [
                'ByteBuffer.allocateDirect()',
                'Zero GC pause overhead',
                'Cleaner deallocation'
              ]
            },
            {
              id: 'java-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Thread-Safe Producer-Consumer with SynchronousQueue',
              question: 'Explain how `SynchronousQueue` operates with a capacity of zero (direct handoff). Write a producer and consumer thread transferring messages via `SynchronousQueue`.',
              markingBreakdown: [
                'Direct handoff zero-capacity explanation: 2 Marks',
                'Producer/consumer implementation: 3 Marks'
              ],
              modelSolution: `In a \`SynchronousQueue\`, capacity is 0. An insert operation (put) blocks until another thread executes a corresponding take operation, creating a direct handoff point between threads.

\`\`\`java
import java.util.concurrent.*;

public class HandoffDemo {
    public static void main(String[] args) {
        SynchronousQueue<String> queue = new SynchronousQueue<>();

        // Producer
        new Thread(() -> {
            try {
                System.out.println("Producing message...");
                queue.put("PAYMENT_ORDER_99"); // Blocks until consumed
                System.out.println("Message handed off successfully!");
            } catch (InterruptedException e) {}
        }).start();

        // Consumer
        new Thread(() -> {
            try {
                Thread.sleep(100);
                String msg = queue.take(); // Meets producer
                System.out.println("Consumed: " + msg);
            } catch (InterruptedException e) {}
        }).start();
    }
}
\`\`\``,
              notebookCheckpoints: [
                'SynchronousQueue has zero capacity',
                'put() blocks until take() meets it'
              ]
            },
            {
              id: 'java-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Java Security Manager Deprecation & Modern Sandboxing',
              question: 'Why was the Java Security Manager deprecated in Java 17? Explain modern container-based sandboxing (Docker, Linux cgroups, seccomp) and OS-level security boundaries compared to in-process JVM security.',
              markingBreakdown: [
                'Security Manager flaws and deprecation rationale: 2.5 Marks',
                'Modern container/OS sandboxing comparison: 2.5 Marks'
              ],
              modelSolution: `Security Manager Deprecation:
1. Massive performance overhead on every system call.
2. Fragile brittle codebase: decades of bypasses and zero-days demonstrated in-process bytecode sandboxing is fundamentally insecure against memory corruption and reflection hacks.

Modern Alternative:
Engineers sandbox untrusted code at the OS and container level using Linux namespaces, cgroups (CPU/RAM limits), and seccomp filters (whitelisting allowable kernel syscalls) via Docker/Kubernetes, isolating the entire process boundary rather than trying to police code within a single JVM.`,
              notebookCheckpoints: [
                'In-process sandboxing is brittle',
                'Containerization (Docker, cgroups, seccomp)'
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
              id: 'java-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Enterprise Systems: High-Throughput Disruptor Ring Buffer',
              question: 'Construct a Lock-Free Ring Buffer in Java following the LMAX Disruptor architectural pattern:\n(a) Pre-allocated array of Event objects to eliminate GC allocation pressure.\n(b) Power-of-two capacity allowing fast bitwise modulo sequence masking (`sequence & (capacity - 1)`).\n(c) Atomic sequence cursors using `AtomicLong`.\n(d) Explain how CPU Cache Line Padding (`@Contended` or 64-byte dummy variables) eliminates False Sharing between cores.',
              markingBreakdown: [
                'Pre-allocated ring buffer array: 2.5 Marks',
                'Atomic sequence indexing and claim logic: 3 Marks',
                'Cache line padding / False Sharing analysis: 3 Marks',
                'Disruptor zero-garbage throughput proof: 1.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.concurrent.atomic.AtomicLong;

public class MiniDisruptor<T> {
    private final Object[] ringBuffer;
    private final int bufferSize;
    private final int mask;

    // Cache line padding: 56 bytes before and after to isolate cursor on its own 64-byte line!
    public long p1, p2, p3, p4, p5, p6, p7;
    private final AtomicLong cursor = new AtomicLong(-1);
    public long p8, p9, p10, p11, p12, p13, p14;

    public MiniDisruptor(int size) {
        if (Integer.bitCount(size) != 1) throw new IllegalArgumentException("Size must be power of 2");
        this.bufferSize = size;
        this.mask = size - 1;
        this.ringBuffer = new Object[size];
    }

    public long next() {
        return cursor.incrementAndGet();
    }

    @SuppressWarnings("unchecked")
    public T get(long sequence) {
        return (T) ringBuffer[(int)(sequence & mask)];
    }

    public void publish(long sequence, T event) {
        ringBuffer[(int)(sequence & mask)] = event;
    }
}
\`\`\`
False Sharing Explanation:
CPUs load memory in 64-byte Cache Lines. If Producer sequence and Consumer sequence reside on the same cache line, Core 1 writing to Producer sequence invalidates Core 2\'s L1 cache line containing Consumer sequence (MESI cache protocol), destroying performance.
Padding with 7 dummy \`long\` variables (56 bytes + 8-byte cursor = 64 bytes) guarantees the cursor owns its own private cache line.`,
              notebookCheckpoints: [
                'Pre-allocated ring buffer array',
                'Bitwise mask: sequence & (capacity - 1)',
                'Cache line padding (56 bytes) to eliminate False Sharing'
              ]
            },
            {
              id: 'java-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Distributed Caching: Thread-Safe LRU Cache with O(1) Operations',
              question: 'Implement an industrial-grade Thread-Safe LRU (Least Recently Used) Cache in Java without relying on `LinkedHashMap`:\n(a) Doubly Linked List of Node elements (`key`, `val`, `prev`, `next`).\n(b) Concurrent hash map index for $O(1)$ node lookup.\n(c) Synchronize access using fine-grained locks or `ReentrantReadWriteLock`.\n(d) `get(K key)` moves accessed node to head.\n(e) `put(K key, V val)` evicts tail node when capacity is exceeded.',
              markingBreakdown: [
                'Doubly linked list internal structure: 2.5 Marks',
                'O(1) get() and moveToHead(): 2.5 Marks',
                'O(1) put() and tail eviction: 3 Marks',
                'Concurrency lock synchronization: 2 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.*;
import java.util.concurrent.locks.*;

public class ConcurrentLRUCache<K, V> {
    private static class Node<K, V> {
        K key; V val;
        Node<K, V> prev, next;
        Node(K k, V v) { key = k; val = v; }
    }

    private final int capacity;
    private final Map<K, Node<K, V>> map = new HashMap<>();
    private final Node<K, V> head = new Node<>(null, null); // Dummy head
    private final Node<K, V> tail = new Node<>(null, null); // Dummy tail
    private final ReentrantLock lock = new ReentrantLock();

    public ConcurrentLRUCache(int cap) {
        this.capacity = cap;
        head.next = tail;
        tail.prev = head;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addFirst(Node<K, V> node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    public V get(K key) {
        lock.lock();
        try {
            Node<K, V> node = map.get(key);
            if (node == null) return null;
            removeNode(node);
            addFirst(node); // Move to most recently used head
            return node.val;
        } finally {
            lock.unlock();
        }
    }

    public void put(K key, V val) {
        lock.lock();
        try {
            Node<K, V> node = map.get(key);
            if (node != null) {
                node.val = val;
                removeNode(node);
                addFirst(node);
            } else {
                if (map.size() >= capacity) {
                    // Evict LRU tail
                    Node<K, V> lru = tail.prev;
                    removeNode(lru);
                    map.remove(lru.key);
                }
                Node<K, V> newNode = new Node<>(key, val);
                addFirst(newNode);
                map.put(key, newNode);
            }
        } finally {
            lock.unlock();
        }
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Dummy head and tail nodes',
                'O(1) removeNode and addFirst',
                'ReentrantLock guarding operations'
              ]
            },
            {
              id: 'java-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Database Systems: Connection Pool Engine (Mini-HikariCP)',
              question: 'Construct a high-performance Database Connection Pool in Java mimicking HikariCP:\n(a) Pre-allocate a pool of `Connection` objects.\n(b) Smart wrapper `ConnectionProxy` implementing `java.sql.Connection` via dynamic proxies or wrapper that redirects `.close()` to return the connection to the idle pool instead of terminating TCP socket.\n(c) Use `ArrayBlockingQueue` or `AtomicInteger` array to provide connections in microseconds.\n(d) Handle connection leaks by tracking checkout timestamps and issuing warnings.',
              markingBreakdown: [
                'Pool structure and pre-allocation: 2.5 Marks',
                'ConnectionProxy overriding close(): 3.5 Marks',
                'Borrowing and returning logic with timeouts: 2 Marks',
                'Leak detection and metrics: 2 Marks'
              ],
              modelSolution: `\`\`\`java
import java.sql.Connection;
import java.lang.reflect.*;
import java.util.concurrent.*;

public class MiniConnectionPool {
    private final BlockingQueue<Connection> pool;
    private final int maxSize;

    public MiniConnectionPool(int size, String url) {
        this.maxSize = size;
        this.pool = new ArrayBlockingQueue<>(size);
        for (int i = 0; i < size; i++) {
            pool.offer(createRawConnection(url));
        }
    }

    private Connection createRawConnection(String url) {
        // Creates real JDBC connection (mocked here)
        return (Connection) Proxy.newProxyInstance(
            Connection.class.getClassLoader(),
            new Class<?>[]{Connection.class},
            (proxy, method, args) -> null
        );
    }

    public Connection getConnection(long timeoutMs) throws Exception {
        Connection raw = pool.poll(timeoutMs, TimeUnit.MILLISECONDS);
        if (raw == null) throw new TimeoutException("Connection pool exhausted");

        // Wrap in dynamic proxy to intercept close()
        return (Connection) Proxy.newProxyInstance(
            Connection.class.getClassLoader(),
            new Class<?>[]{Connection.class},
            (proxy, method, args) -> {
                if (method.getName().equals("close")) {
                    pool.offer(raw); // Return back to pool!
                    return null;
                }
                return method.invoke(raw, args);
            }
        );
    }
}
\`\`\``,
              notebookCheckpoints: [
                'Proxy intercepting close() to return connection to pool',
                'ArrayBlockingQueue with poll(timeout)',
                'Prevent actual socket closure'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-105-JAVA-S3',
      title: 'Advanced Java Performance, JIT & Distributed Systems Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-105-JAVA',
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
              id: 'java-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'JIT Tiered Compilation',
              question: 'Name the two JIT compilers used in HotSpot Tiered Compilation (Tier 1/2/3 and Tier 4).',
              markingBreakdown: ['C1 (Client) compiler and C2 (Server) compiler: 1 Mark'],
              modelSolution: 'C1 (Client Compiler, fast compilation) and C2 (Server Compiler, high optimization with speculative profiling).',
              notebookCheckpoints: ['C1 (Client) and C2 (Server)']
            },
            {
              id: 'java-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Escape Analysis',
              question: 'What optimization does HotSpot perform when Escape Analysis proves an object never escapes a local method scope?',
              markingBreakdown: ['Scalar Replacement (allocates fields directly in CPU registers/stack, skipping heap): 1 Mark'],
              modelSolution: 'Scalar Replacement: It breaks the object into individual scalar primitive fields allocated directly on the Stack or CPU registers, completely eliminating heap allocation and GC cost.',
              notebookCheckpoints: ['Scalar Replacement', 'Eliminates heap allocation']
            },
            {
              id: 'java-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Biased Locking',
              question: 'Why was Biased Locking deprecated and disabled by default in Java 15+?',
              markingBreakdown: ['Cost of revoking bias under high concurrency exceeds performance benefits: 1 Mark'],
              modelSolution: 'Modern cloud multi-threaded applications trigger frequent bias revocations (safepoints pausing all threads), which cost more CPU overhead than the original locking optimization saved.',
              notebookCheckpoints: ['Expensive safepoint bias revocations']
            },
            {
              id: 'java-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'ZGC (Z Garbage Collector)',
              question: 'What is the maximum pause time guarantee of the modern ZGC (Z Garbage Collector) in Java 21?',
              markingBreakdown: ['Sub-millisecond pause times (< 1ms): 1 Mark'],
              modelSolution: 'Sub-millisecond (< 1 ms), regardless of heap size (even on multi-terabyte heaps).',
              notebookCheckpoints: ['Sub-millisecond (< 1ms)']
            },
            {
              id: 'java-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'VarHandle API',
              question: 'What modern Java 9 API safely replaced `sun.misc.Unsafe` for atomic field access and memory fences?',
              markingBreakdown: ['java.lang.invoke.VarHandle: 1 Mark'],
              modelSolution: '`java.lang.invoke.VarHandle`.',
              notebookCheckpoints: ['VarHandle']
            },
            {
              id: 'java-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'StampedLock',
              question: 'What special locking mode does `StampedLock` support that `ReentrantReadWriteLock` does not?',
              markingBreakdown: ['Optimistic Reading (tryOptimisticRead): 1 Mark'],
              modelSolution: 'Optimistic Reading (`tryOptimisticRead()`), which validates whether a write occurred using stamps without acquiring any shared lock.',
              notebookCheckpoints: ['Optimistic Reading']
            },
            {
              id: 'java-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Foreign Function & Memory API (Project Panama)',
              question: 'In Java 22, what API officially replaces JNI for calling native C libraries directly from Java?',
              markingBreakdown: ['Foreign Function & Memory (FFM) API: 1 Mark'],
              modelSolution: 'The Foreign Function & Memory (FFM) API (`java.lang.foreign`).',
              notebookCheckpoints: ['Foreign Function & Memory (FFM) API']
            },
            {
              id: 'java-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Class Data Sharing (CDS)',
              question: 'What performance metric does Application Class-Data Sharing (AppCDS) dramatically reduce?',
              markingBreakdown: ['JVM startup time and memory footprint across processes: 1 Mark'],
              modelSolution: 'JVM cold startup time (by up to 50%) and memory footprint by memory-mapping pre-parsed class metadata directly from an archive file.',
              notebookCheckpoints: ['JVM startup time']
            },
            {
              id: 'java-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'String Dedup (G1)',
              question: 'What does the JVM flag `-XX:+UseStringDeduplication` do during G1 garbage collection?',
              markingBreakdown: ['Replaces duplicate char/byte arrays in Strings with shared backing array: 1 Mark'],
              modelSolution: 'It identifies identical String objects in the heap and points their internal backing byte arrays to a single shared array, saving 10-20% RAM.',
              notebookCheckpoints: ['Shares duplicate backing byte arrays']
            },
            {
              id: 'java-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Scoped Values (JEP 446)',
              question: 'Why are modern Java Scoped Values (`ScopedValue<T>`) preferred over `ThreadLocal` when using millions of Virtual Threads?',
              markingBreakdown: ['Immutable, strictly bounded lifecycle, zero memory leak risk: 1 Mark'],
              modelSolution: 'Scoped Values are immutable and strictly bound to the execution scope of a method, allowing efficient inheritance and sharing across millions of virtual threads without the memory leak hazards of `ThreadLocal`.',
              notebookCheckpoints: ['Immutable, bounded scope, no memory leaks']
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
              id: 'java-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'StampedLock Optimistic Read Pattern',
              question: 'Implement a 2D `Point(x, y)` class in Java with `move(dx, dy)` and `distanceFromOrigin()` using `StampedLock`. Show the standard Optimistic Read idiom (`tryOptimisticRead()`, `validate(stamp)`, and fallback to full read lock).',
              markingBreakdown: [
                'StampedLock write lock on move(): 1.5 Marks',
                'Optimistic read with validate(stamp): 2.5 Marks',
                'Fallback to full read lock: 1 Mark'
              ],
              modelSolution: `\`\`\`java
import java.util.concurrent.locks.StampedLock;

public class Point {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    public void move(double dx, double dy) {
        long stamp = sl.writeLock();
        try {
            x += dx;
            y += dy;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    public double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead(); // Zero-cost read stamp
        double curX = x, curY = y;
        if (!sl.validate(stamp)) { // Check if a writer intervened
            stamp = sl.readLock(); // Fallback to pessimistic read lock
            try {
                curX = x;
                curY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(curX * curX + curY * curY);
    }
}
\`\`\``,
              notebookCheckpoints: [
                'sl.tryOptimisticRead()',
                '!sl.validate(stamp) check',
                'Fallback to sl.readLock()'
              ]
            },
            {
              id: 'java-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Structured Concurrency (Java 21)',
              question: 'Explain the principles of Structured Concurrency (`StructuredTaskScope`). Write a Java snippet fetching price and inventory from two services concurrently, where if either subtask fails, the other is automatically cancelled.',
              markingBreakdown: [
                'Structured concurrency principles: 2 Marks',
                'StructuredTaskScope.ShutdownOnFailure code: 3 Marks'
              ],
              modelSolution: `Structured Concurrency treats multiple concurrent tasks running in different threads as a single unit of work, guaranteeing that all subtasks complete or cancel before the enclosing scope block exits.

\`\`\`java
import java.util.concurrent.StructuredTaskScope;

public class OrderService {
    record OrderResult(double price, int inventory) {}

    public OrderResult fetchOrderDetails() throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            var priceTask = scope.fork(() -> fetchPrice());
            var invTask = scope.fork(() -> fetchInventory());

            scope.join();           // Join both forks
            scope.throwIfFailed();  // Cancel others if one fails!

            return new OrderResult(priceTask.get(), invTask.get());
        } // Scope block guarantees all threads finished before return
    }

    static double fetchPrice() { return 99.95; }
    static int fetchInventory() { return 500; }
}
\`\`\``,
              notebookCheckpoints: [
                'StructuredTaskScope.ShutdownOnFailure',
                'scope.fork, scope.join, scope.throwIfFailed'
              ]
            },
            {
              id: 'java-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Java Agent & Bytecode Instrumentation',
              question: 'Explain how Java Agents instrument bytecode at class-loading time:\n(a) Define the `premain` method signature.\n(b) Write a `ClassFileTransformer` that intercepts class definitions and logs whenever any class in package `com.bank` is loaded into the JVM.',
              markingBreakdown: [
                'premain method signature: 2 Marks',
                'ClassFileTransformer implementation: 3 Marks'
              ],
              modelSolution: `\`\`\`java
import java.lang.instrument.*;
import java.security.ProtectionDomain;

public class SimpleAgent {
    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("Java Agent started. Registering transformer...");
        inst.addTransformer(new ClassFileTransformer() {
            @Override
            public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined,
                                   ProtectionDomain protectionDomain, byte[] classfileBuffer) {
                if (className != null && className.startsWith("com/bank/")) {
                    System.out.println("[AUDIT] Loading sensitive banking class: " + className);
                }
                return null; // Return null if bytecode is unmodified
            }
        });
    }
}
\`\`\``,
              notebookCheckpoints: [
                'public static void premain(String args, Instrumentation inst)',
                'inst.addTransformer with ClassFileTransformer'
              ]
            },
            {
              id: 'java-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'ZGC Colored Pointers & Load Barriers',
              question: 'Explain the internal technology behind ZGC\'s sub-millisecond pauses:\n(a) "Colored Pointers" (Marked0, Marked1, Remapped bits in 64-bit pointers).\n(b) "Load Barriers" (JIT-injected code during reference reads).',
              markingBreakdown: [
                'Colored pointers bit allocation: 2.5 Marks',
                'Load barrier self-healing reference explanation: 2.5 Marks'
              ],
              modelSolution: `(a) Colored Pointers:
ZGC uses the upper bits of standard 64-bit virtual memory pointers as metadata tags:
- Bits 0-43: Actual object heap address (up to 16TB).
- Bit 44: Finalizable
- Bit 45: Remapped
- Bit 46: Marked0
- Bit 47: Marked1
This allows ZGC to inspect an object\'s GC state directly from the pointer without dereferencing memory.

(b) Load Barriers:
Whenever application code reads a reference (\`o.field\`), the JIT compiler inserts a 2-instruction "Load Barrier". If the pointer\'s color indicates the object was relocated to a new memory address, the load barrier intercepts the read, updates the pointer to the new location (self-healing), and returns the new address with zero stop-the-world pause.`,
              notebookCheckpoints: [
                'Metadata bits stored directly inside 64-bit pointer',
                'Load barrier intercepts read and self-heals pointer'
              ]
            },
            {
              id: 'java-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Non-Blocking Algorithms: Treiber Stack',
              question: 'Implement a lock-free LIFO Stack in Java using `AtomicReference` (Treiber Stack algorithm). Explain why it is immune to deadlocks.',
              markingBreakdown: [
                'Treiber stack push with CAS loop: 2.5 Marks',
                'pop with CAS loop and deadlock immunity: 2.5 Marks'
              ],
              modelSolution: `\`\`\`java
import java.util.concurrent.atomic.AtomicReference;

public class TreiberStack<T> {
    private static class Node<T> {
        final T item;
        Node<T> next;
        Node(T item) { this.item = item; }
    }

    private final AtomicReference<Node<T>> head = new AtomicReference<>(null);

    public void push(T item) {
        Node<T> newHead = new Node<>(item);
        Node<T> oldHead;
        do {
            oldHead = head.get();
            newHead.next = oldHead;
        } while (!head.compareAndSet(oldHead, newHead)); // Atomic CAS
    }

    public T pop() {
        Node<T> oldHead;
        Node<T> newHead;
        do {
            oldHead = head.get();
            if (oldHead == null) return null;
            newHead = oldHead.next;
        } while (!head.compareAndSet(oldHead, newHead));
        return oldHead.item;
    }
}
\`\`\`
Deadlock Immunity:
Because threads never acquire mutual exclusion locks (no synchronized or mutexes), no thread can ever hold a lock that another thread waits for. If contention occurs, at least one thread succeeds in its CAS on every cycle, guaranteeing system-wide progress.`,
              notebookCheckpoints: [
                'AtomicReference<Node<T>> head',
                'CAS loop: do { ... } while (!head.compareAndSet(...))'
              ]
            },
            {
              id: 'java-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Foreign Memory Access with MemorySegment',
              question: 'Using Java 22 Foreign Function & Memory API, demonstrate:\n(a) Allocating a native off-heap memory segment with `Arena.ofConfined()`.\n(b) Writing and reading integers using `ValueLayout.JAVA_INT`.\n(c) Automatic deallocation on scope exit.',
              markingBreakdown: [
                'Arena.ofConfined() usage: 2 Marks',
                'ValueLayout read/write operations: 3 Marks'
              ],
              modelSolution: `\`\`\`java
import java.lang.foreign.*;

public class PanamaDemo {
    public static void main(String[] args) {
        // Arena enforces strict deterministic scope deallocation
        try (Arena arena = Arena.ofConfined()) {
            // Allocate 100 native integers (400 bytes) in off-heap C memory
            MemorySegment segment = arena.allocate(ValueLayout.JAVA_INT, 100);

            // Write values
            for (int i = 0; i < 100; i++) {
                segment.setAtIndex(ValueLayout.JAVA_INT, i, i * 10);
            }

            // Read value at index 5
            int val = segment.getAtIndex(ValueLayout.JAVA_INT, 5);
            System.out.println("Native memory value at index 5: " + val); // 50
        } // Exiting try block instantly frees off-heap memory deterministically!
    }
}
\`\`\``,
              notebookCheckpoints: [
                'try (Arena arena = Arena.ofConfined())',
                'segment.setAtIndex / getAtIndex'
              ]
            },
            {
              id: 'java-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'JMH (Java Microbenchmark Harness) Pitfalls',
              question: 'Why are microbenchmarks written with simple `System.currentTimeMillis()` or loops invalid in Java? Explain two optimization pitfalls (Dead Code Elimination and Constant Folding) and how JMH\'s `Blackhole` solves them.',
              markingBreakdown: [
                'JIT dead code elimination and loop unrolling explanation: 2.5 Marks',
                'JMH Blackhole and proper benchmarking: 2.5 Marks'
              ],
              modelSolution: `Why Naive Loops Fail:
The C2 JIT compiler optimizes code dynamically.
1. Dead Code Elimination: If a loop computes a value that is never subsequently used, the JIT deletes the entire loop from the machine code, reporting 0ms execution time.
2. Constant Folding: The JIT replaces static loop arithmetic with a pre-computed constant.
3. Lack of Warmup: Measures bytecode interpretation rather than compiled assembly.

JMH Solution:
\`\`\`java
@Benchmark
public void testMethod(Blackhole bh) {
    int result = computeHeavyMath();
    bh.consume(result); // Blackhole forces JIT to compute without optimization elision
}
\`\`\``,
              notebookCheckpoints: [
                'Dead Code Elimination deletes unused code',
                'Blackhole.consume(result) forces computation'
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
              id: 'java-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'High-Concurrency Systems: Custom Lock-Free SkipList Map',
              question: 'Design a concurrent ordered map using SkipList data structures in Java:\n(a) Explain why SkipLists are preferred over balanced trees in high-concurrency multi-threaded systems.\n(b) Node structure supporting multiple forward level pointers using `AtomicReference`.\n(c) Probabilistic coin-flip coin tossing for determining level height.\n(d) Implement search in $O(\\log N)$ time.\n(e) Compare lock-free SkipLists with `java.util.concurrent.ConcurrentSkipListMap`.',
              markingBreakdown: [
                'SkipList vs Tree lock contention comparison: 2.5 Marks',
                'Multi-level node structure and probabilistic height: 2.5 Marks',
                'Search algorithm: 3 Marks',
                'ConcurrentSkipListMap comparison: 2 Marks'
              ],
              modelSolution: `Why SkipList over Red-Black Tree in Concurrency:
Balancing a Red-Black tree (rotations) requires locking large portions of the tree up to the root, creating a massive concurrency bottleneck.
A SkipList isolates modifications to local pointer updates on independent levels, allowing multiple threads to insert and delete simultaneously with lock-free CAS.

\`\`\`java
import java.util.concurrent.atomic.AtomicReference;
import java.util.Random;

public class ConcurrentSkipList<K extends Comparable<K>, V> {
    private static final int MAX_LEVEL = 16;

    static class Node<K, V> {
        final K key;
        final V val;
        final AtomicReference<Node<K, V>>[] forward;

        @SuppressWarnings("unchecked")
        Node(K key, V val, int level) {
            this.key = key; this.val = val;
            this.forward = new AtomicReference[level + 1];
            for (int i = 0; i <= level; i++) this.forward[i] = new AtomicReference<>(null);
        }
    }

    private final Node<K, V> head = new Node<>(null, null, MAX_LEVEL);
    private final Random random = new Random();

    private int randomLevel() {
        int lvl = 0;
        while (lvl < MAX_LEVEL && random.nextBoolean()) lvl++;
        return lvl;
    }

    public V get(K key) {
        Node<K, V> curr = head;
        for (int i = MAX_LEVEL; i >= 0; i--) {
            while (curr.forward[i].get() != null && curr.forward[i].get().key.compareTo(key) < 0) {
                curr = curr.forward[i].get();
            }
        }
        curr = curr.forward[0].get();
        if (curr != null && curr.key.compareTo(key) == 0) return curr.val;
        return null;
    }
}
\`\`\``,
              notebookCheckpoints: [
                'SkipList avoids global lock contention of tree rotations',
                'Array of AtomicReference forward pointers',
                'Search runs in O(log N)'
              ]
            },
            {
              id: 'java-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: Zero-Copy Network File Server with Java NIO',
              question: 'Implement a high-performance HTTP/TCP static file server using Java NIO channels and selectors:\n(a) Multiplexing non-blocking socket channel events using `Selector`.\n(b) Transfer file contents directly from disk to network socket using zero-copy `FileChannel.transferTo()`.\n(c) Explain how `transferTo` invokes the Linux `sendfile()` system call to bypass user-space memory copying.\n(d) Draw the DMA (Direct Memory Access) data path comparison diagram in your notebook.',
              markingBreakdown: [
                'Selector non-blocking server socket setup: 3 Marks',
                'FileChannel.transferTo zero-copy execution: 3 Marks',
                'sendfile() system call and context switch reduction: 2 Marks',
                'DMA data path comparison diagram: 2 Marks'
              ],
              modelSolution: `\`\`\`java
import java.io.*;
import java.net.*;
import java.nio.channels.*;

public class ZeroCopyFileServer {
    public static void main(String[] args) throws IOException {
        ServerSocketChannel server = ServerSocketChannel.open();
        server.bind(new InetSocketAddress(8080));
        System.out.println("Zero-Copy Server listening on port 8080...");

        while (true) {
            SocketChannel client = server.accept();
            File file = new File("large_payload.bin");

            try (FileChannel fileChannel = new FileInputStream(file).getChannel()) {
                long position = 0;
                long count = fileChannel.size();
                while (position < count) {
                    // Direct Kernel-to-Kernel Zero-Copy Transfer
                    position += fileChannel.transferTo(position, count - position, client);
                }
            }
            client.close();
        }
    }
}
\`\`\`
Zero-Copy DMA Architecture:
Traditional Copy (4 context switches, 3 CPU copies):
[Disk] ──(DMA)──> [Kernel Buffer] ──(CPU)──> [User Buffer] ──(CPU)──> [Socket Buffer] ──(DMA)──> [NIC]

Zero-Copy sendfile() (2 context switches, 0 CPU copies!):
[Disk] ──(DMA)──> [Kernel Read Buffer] ──(Descriptor Pipe)──> [NIC Network Card]
CPU never touches the bytes; hardware DMA copies directly between disk and network!`,
              notebookCheckpoints: [
                'FileChannel.transferTo(position, count, client)',
                'sendfile() system call eliminates user-space copy',
                'Draw 4-switch traditional vs 2-switch zero-copy diagram'
              ]
            },
            {
              id: 'java-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Enterprise Security: Secure Cryptographic Vault & Key Derivation',
              question: 'Construct an enterprise-grade cryptographic password vault in Java using `javax.crypto`:\n(a) Key Derivation using PBKDF2 with HMAC-SHA512 (`SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")`) and 210,000 iterations.\n(b) Cryptographically secure random salt generation using `SecureRandom`.\n(c) AES-256 GCM authenticated encryption (`AES/GCM/NoPadding`) with a 12-byte Initialization Vector (IV) and 128-bit authentication tag.\n(d) Explain how GCM protects against ciphertext tampering and Bit-Flipping attacks.',
              markingBreakdown: [
                'PBKDF2 password key derivation: 3 Marks',
                'AES-GCM encryption with IV and authentication tag: 3.5 Marks',
                'GCM ciphertext authentication against tampering: 2 Marks',
                'Secure memory zeroing of byte/char arrays: 1.5 Marks'
              ],
              modelSolution: `\`\`\`java
import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.SecureRandom;
import java.nio.ByteBuffer;

public class CryptoVault {
    private static final int ITERATIONS = 210_000;
    private static final int KEY_LENGTH = 256;
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    public static byte[] encrypt(char[] password, byte[] plaintext) throws Exception {
        // 1. Generate 16-byte random salt
        byte[] salt = new byte[16];
        SecureRandom.getInstanceStrong().nextBytes(salt);

        // 2. Derive AES Key from password
        KeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, KEY_LENGTH);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        byte[] keyBytes = factory.generateSecret(spec).getEncoded();
        SecretKey secretKey = new SecretKeySpec(keyBytes, "AES");

        // 3. Generate 12-byte IV
        byte[] iv = new byte[IV_LENGTH];
        SecureRandom.getInstanceStrong().nextBytes(iv);

        // 4. Encrypt with AES-GCM
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, gcmSpec);
        byte[] ciphertext = cipher.doFinal(plaintext);

        // Package: [16-byte salt] + [12-byte IV] + [ciphertext + tag]
        return ByteBuffer.allocate(salt.length + iv.length + ciphertext.length)
            .put(salt).put(iv).put(ciphertext).array();
    }
}
\`\`\`
GCM Authentication Tag Defense:
Traditional CBC mode encrypts data but does not authenticate it, allowing attackers to flip bits in transit. GCM produces a GMAC cryptographic authentication tag calculated over the ciphertext. If any byte is altered in transit, \`cipher.doFinal()\` throws an \`AEADBadTagException\` and rejects the packet before decryption.`,
              notebookCheckpoints: [
                'PBKDF2WithHmacSHA512 with 210,000 iterations',
                'AES/GCM/NoPadding with 12-byte IV',
                'Explain GMAC tag defense against bit-flipping'
              ]
            }
          ]
        }
      }
    }
  }
};
