import { Chapter } from '../types/notebook';

export const JAVA_CHAPTERS_PART2: Chapter[] = [
  // CHAPTER 11 — INHERITANCE
  {
    id: 'java-ch11',
    number: 11,
    title: 'Inheritance & Method Overriding',
    description: 'extends keyword, IS-A relationship, super keyword, constructor chaining, and composition',
    topics: [
      {
        id: 'java-inheritance',
        subjectId: 'java',
        chapterId: 'java-ch11',
        chapterNumber: 11,
        pageNumber: 11,
        title: 'Inheritance, super() & Constructor Chaining',
        difficulty: 'intermediate',
        definition: 'Inheritance allows a subclass (`extends`) to acquire fields and methods from a superclass. Java supports Single Class Inheritance; all classes implicitly inherit from `java.lang.Object`.',
        whyItMatters: 'Inheritance enables code reuse and polymorphism. Constructor chaining ensures that parent class state is initialized before subclass constructor logic executes.',
        syntax: 'public class Dog extends Animal {\n    public Dog() { super("Canine"); }\n}',
        explanation: [
          '`extends` keyword: Establishes an "IS-A" relationship between child and parent.',
          'Single Inheritance: A class in Java can extend only ONE superclass (preventing the C++ Diamond Problem of multiple class inheritance).',
          '`super`: Refers to the superclass instance. `super()` invokes the parent constructor; `super.method()` invokes an overridden parent method.',
          'Constructor Chaining: The first line of any constructor must be an explicit or implicit call to `super()` or `this()`. If omitted, Java automatically inserts `super();`.',
          '`@Override` Annotation: Informs compiler that a method is intended to override a parent method, catching typos in method signatures at compile time.'
        ],
        example: {
          language: 'java',
          code: `class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculateCompensation() {
        return this.baseSalary;
    }
}

class SoftwareEngineer extends Employee {
    private double stockGrant;

    public SoftwareEngineer(String name, double baseSalary, double stockGrant) {
        super(name, baseSalary); // Constructor chaining to Employee
        this.stockGrant = stockGrant;
    }

    @Override
    public double calculateCompensation() {
        // super.calculateCompensation() invokes parent method
        return super.calculateCompensation() + this.stockGrant;
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Employee eng = new SoftwareEngineer("Alice", 120_000, 45_000);
        System.out.println(eng.name + " Total: $" + eng.calculateCompensation());
    }
}`,
          output: 'Alice Total: $165000.0',
          annotations: [
            { line: 20, label: 'super(...) calls parent constructor as first statement', type: 'blue' },
            { line: 24, label: '@Override forces compile-time verification of signature', type: 'yellow' },
            { line: 32, label: 'Polymorphic parent reference points to child instance', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Java Class Hierarchy & Single Inheritance Model',
          subtitle: 'java.lang.Object is the universal root superclass of all Java types',
          elements: [
            { id: '1', label: 'java.lang.Object', sublabel: 'Root of all Java classes', value: 'Base Object', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Employee', sublabel: 'extends Object', value: 'Superclass', status: 'active', arrowTo: '3' },
            { id: '3', label: 'SoftwareEngineer', sublabel: 'extends Employee', value: 'Subclass', status: 'referenced' }
          ]
        },
        important: 'In a subclass constructor, the call to `super()` or `this()` MUST be the very first line of code! Putting anything before `super()` causes a compilation error.',
        commonMistakes: [
          'Attempting multiple class inheritance (`class C extends A, B`). Java forbids multiple class inheritance; use Interfaces instead.',
          'Overriding a method but changing its parameter types. This creates a method OVERLOAD instead of an OVERRIDE!'
        ],
        tip: 'Favor Composition over Inheritance: "HAS-A" (e.g., `Car has an Engine`) is almost always more flexible and decoupled than "IS-A" (`Car is an Engine`).',
        interviewNote: 'Question: "Why doesn\'t Java support multiple inheritance of classes?" Answer: "To eliminate the Diamond Problem where two parent classes implement the same method with different logic, causing ambiguity over which implementation the child inherits."',
        practiceQuestions: [
          {
            id: 'q-java11-1',
            type: 'mcq',
            question: 'What is the required location of `super()` inside a child class constructor?',
            options: [
              'Anywhere in the constructor',
              'Must strictly be the very first line of the constructor',
              'Inside the finally block',
              'Directly before the return statement'
            ],
            correctIndex: 1,
            explanation: 'The Java Language Specification strictly mandates that a call to `super()` or `this()` must be the first statement in a constructor.'
          }
        ],
        relatedTopics: ['java-polymorphism', 'java-abstraction', 'java-oop-foundations']
      }
    ]
  },

  // CHAPTER 12 — POLYMORPHISM
  {
    id: 'java-ch12',
    number: 12,
    title: 'Polymorphism & Dynamic Dispatch',
    description: 'Compile-time vs runtime polymorphism, dynamic method dispatch, upcasting, downcasting, and pattern matching',
    topics: [
      {
        id: 'java-polymorphism',
        subjectId: 'java',
        chapterId: 'java-ch12',
        chapterNumber: 12,
        pageNumber: 12,
        title: 'Dynamic Method Dispatch, Upcasting & instanceof',
        difficulty: 'intermediate',
        definition: 'Polymorphism ("many forms") allows objects of different types to respond to the same method call. Runtime polymorphism is resolved dynamically at runtime via Dynamic Method Dispatch.',
        whyItMatters: 'Polymorphism enables loose coupling. A single controller can process a list of different `PaymentMethod` subclasses (CreditCard, PayPal, Crypto) without knowing their exact types.',
        syntax: 'Parent ref = new Child(); // Upcasting\nref.execute();           // Dispatches to Child\'s implementation',
        explanation: [
          'Compile-Time Polymorphism (Static Binding): Achieved via Method Overloading. Resolved by compiler at compile time based on parameter types.',
          'Runtime Polymorphism (Dynamic Binding): Achieved via Method Overriding. The JVM determines which method to execute at runtime based on the actual object on the heap.',
          'Upcasting: Assigning a child instance to a parent reference variable (`Shape s = new Circle();`). Always safe and automatic.',
          'Downcasting: Casting a parent reference back to a child type (`Circle c = (Circle) s;`). Can throw `ClassCastException` if types do not match.',
          'Pattern Matching for `instanceof` (Java 16+): Combines type test and cast into a single safe expression.'
        ],
        example: {
          language: 'java',
          code: `abstract class Notification {
    abstract void send(String message);
}

class EmailNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("[EMAIL] Dispatching: " + message);
    }
}

class SMSNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("[SMS] Sending text: " + message);
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // Polymorphic array of notifications
        Notification[] channels = { new EmailNotification(), new SMSNotification() };

        for (Notification channel : channels) {
            // JVM dynamically dispatches to the correct overriding method
            channel.send("System Maintenance at 02:00 UTC");
        }
    }
}`,
          output: '[EMAIL] Dispatching: System Maintenance at 02:00 UTC\n[SMS] Sending text: System Maintenance at 02:00 UTC',
          annotations: [
            { line: 23, label: 'Upcasting: Subclass instances stored in parent Notification array', type: 'blue' },
            { line: 27, label: 'Dynamic Method Dispatch resolves concrete method at runtime', type: 'green' }
          ]
        },
        important: 'In Java, only INSTANCE METHODS are polymorphic! Variables, static methods, and private methods are resolved statically at compile time based on the reference type.',
        commonMistakes: [
          'Attempting downcasting without checking `instanceof` first, risking `ClassCastException` at runtime.',
          'Believing that instance variables can be overridden polymorphically. Variables are shadowed, never overridden!'
        ],
        tip: 'In modern Java (Java 16+), write: `if (obj instanceof Notification n) { n.send("Alert"); }`. This cleanly binds the variable `n` without separate casting.',
        interviewNote: 'Question: "Can static methods be overridden in Java?" Answer: "No! Static methods cannot be overridden. If a subclass declares a static method with the same signature, it shadows (hides) the parent method, resolved at compile-time by the reference type."',
        practiceQuestions: [
          {
            id: 'q-java12-1',
            type: 'mcq',
            question: 'What mechanism does the JVM use to execute the correct overridden method at runtime?',
            options: [
              'Static Linking',
              'Dynamic Method Dispatch (Virtual Method Table / vtable lookup)',
              'Type Erasure',
              'Reflection API'
            ],
            correctIndex: 1,
            explanation: 'The JVM uses Dynamic Method Dispatch, looking up the actual object instance on the heap and inspecting its vtable to resolve the overriding method.'
          }
        ],
        relatedTopics: ['java-inheritance', 'java-abstraction', 'java-oop-foundations']
      }
    ]
  },

  // CHAPTER 13 — ABSTRACTION & INTERFACES
  {
    id: 'java-ch13',
    number: 13,
    title: 'Abstraction & Interfaces',
    description: 'abstract classes, interfaces, default methods, static interface methods, and functional interfaces',
    topics: [
      {
        id: 'java-abstraction',
        subjectId: 'java',
        chapterId: 'java-ch13',
        chapterNumber: 13,
        pageNumber: 13,
        title: 'Abstract Classes vs Interfaces & Default Methods',
        difficulty: 'intermediate',
        definition: 'Abstraction hides implementation complexity, showing only essential behavior. Interfaces define contracts (`implements`); abstract classes define partial blueprints with shared state.',
        whyItMatters: 'Interfaces allow a class to implement multiple contracts simultaneously, solving multiple inheritance safely and enabling dependency injection design patterns.',
        syntax: 'public interface PaymentGateway {\n    void processPayment(double amount);\n    default void logTransaction() { ... } // Java 8+\n}',
        explanation: [
          'Abstract Class: Declared with `abstract`. Can have instance variables, constructors, and concrete methods alongside `abstract` methods. Cannot be instantiated directly.',
          'Interface: A pure contract. All fields are implicitly `public static final`. A class can implement multiple interfaces (`implements A, B, C`).',
          'Default Methods (Java 8+): Interfaces can declare concrete methods using the `default` keyword to evolve APIs without breaking implementing classes.',
          'Functional Interface: An interface with exactly ONE abstract method (annotated with `@FunctionalInterface`), usable as the target for Lambda expressions.'
        ],
        example: {
          language: 'java',
          code: `interface Flyable {
    void fly(); // Implicitly public abstract

    // Java 8+ Default method with concrete implementation
    default void logFlight() {
        System.out.println("[TELEMETRY] Flight metrics recording active.");
    }
}

interface Navigable {
    void navigateTo(String waypoint);
}

// A class can implement multiple interfaces!
class Drone implements Flyable, Navigable {
    @Override
    public void fly() {
        System.out.println("Drone rotors engaged at 1200 RPM");
    }

    @Override
    public void navigateTo(String waypoint) {
        System.out.println("Course set to: " + waypoint);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Drone drone = new Drone();
        drone.fly();
        drone.navigateTo("Waypoint Alpha");
        drone.logFlight(); // Inherited from Flyable default method
    }
}`,
          output: 'Drone rotors engaged at 1200 RPM\nCourse set to: Waypoint Alpha\n[TELEMETRY] Flight metrics recording active.',
          annotations: [
            { line: 5, label: 'default method provides optional shared implementation', type: 'blue' },
            { line: 15, label: 'implements Flyable, Navigable enables multiple contracts', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Abstract Class vs Interface Structural Matrix',
          subtitle: 'Interfaces support multiple inheritance; abstract classes share state',
          elements: [
            { id: '1', label: 'Feature', sublabel: 'State, Constructors, Multiple', value: 'Comparison Matrix', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Abstract Class', sublabel: 'Can have instance fields & constructors', value: 'Single Inheritance (extends)', status: 'active' },
            { id: '3', label: 'Interface', sublabel: 'Stateless constants & default methods', value: 'Multiple Inheritance (implements)', status: 'referenced' }
          ]
        },
        important: 'All fields in an interface are implicitly `public static final` (constants). All methods without a body are implicitly `public abstract`.',
        commonMistakes: [
          'Attempting to instantiate an interface or abstract class directly: `new Flyable()` causes a compilation error. You must instantiate a concrete implementing class.'
        ],
        tip: 'Use an Abstract Class when classes share code and internal mutable state. Use an Interface when defining a role or capability that unrelated classes can implement.',
        interviewNote: 'Question: "What is the difference between an Abstract Class and an Interface in Java 8+?" Answer: "1. A class can extend only one abstract class, but implement multiple interfaces. 2. Abstract classes can have instance variables and constructors; interfaces only have public static final constants. 3. Abstract classes represent identity (is-a); interfaces represent capability (can-do)."',
        practiceQuestions: [
          {
            id: 'q-java13-1',
            type: 'mcq',
            question: 'What are the implicit modifiers for all variable fields declared inside a Java interface?',
            options: [
              'private final',
              'public static final',
              'protected volatile',
              'package-private'
            ],
            correctIndex: 1,
            explanation: 'Every variable field declared inside an interface is automatically and implicitly `public static final` (a compile-time constant).'
          }
        ],
        relatedTopics: ['java-inheritance', 'java-polymorphism', 'java-lambdas']
      }
    ]
  },

  // CHAPTER 14 — STATIC, FINAL & NESTED CLASSES
  {
    id: 'java-ch14',
    number: 14,
    title: 'static, final & Nested Classes',
    description: 'Class-level static members, static initializers, immutable final modifiers, and inner vs static nested classes',
    topics: [
      {
        id: 'java-static-final',
        subjectId: 'java',
        chapterId: 'java-ch14',
        chapterNumber: 14,
        pageNumber: 14,
        title: 'static Members, final Modifiers & Inner Classes',
        difficulty: 'intermediate',
        definition: '`static` binds members to the class itself rather than instances. `final` creates constants, prevents method overriding, and prohibits class inheritance.',
        whyItMatters: 'Using `static` fields for counters or constants saves memory (allocated once in the Metaspace/Method Area). Marking classes `final` ensures immutability and security.',
        syntax: 'public static final double PI = 3.14159;\nstatic { /* static initialization block */ }',
        explanation: [
          '`static` Fields: Shared across ALL instances of a class. Stored in the Method Area / Metaspace.',
          '`static` Methods: Invoked directly on the class (`Math.sqrt()`) without creating an instance. Cannot access `this` or non-static instance members.',
          '`static` Block: Executes ONCE when the class is first loaded into memory by the ClassLoader.',
          '`final` Variable: Value cannot be reassigned once initialized.',
          '`final` Method: Cannot be overridden by subclasses.',
          '`final` Class: Cannot be subclassed or extended (e.g., `java.lang.String` and `java.lang.System` are final).'
        ],
        example: {
          language: 'java',
          code: `public class ConfigManager {
    // Static constant
    public static final String APP_NAME = "CODEINK";
    private static int instanceCount = 0;

    // Static Initialization Block (runs once when class is loaded)
    static {
        System.out.println("[BOOTSTRAP] ConfigManager class loaded into JVM Metaspace");
    }

    public ConfigManager() {
        instanceCount++;
    }

    public static int getInstanceCount() {
        return instanceCount;
    }

    public static void main(String[] args) {
        new ConfigManager();
        new ConfigManager();
        System.out.println(ConfigManager.APP_NAME + " Instances: " + ConfigManager.getInstanceCount());
    }
}`,
          output: '[BOOTSTRAP] ConfigManager class loaded into JVM Metaspace\nCODEINK Instances: 2',
          annotations: [
            { line: 8, label: 'static block runs once upon initial class loading', type: 'blue' },
            { line: 3, label: 'public static final defines immutable global constant', type: 'green' },
            { line: 15, label: 'static method operates without needing instance state', type: 'yellow' }
          ]
        },
        important: 'Static methods CANNOT access instance variables or call instance methods directly, because static methods execute without a `this` reference.',
        commonMistakes: [
          'Confusing a `final` object reference with immutability. If an array or list is `final`, the reference pointer cannot change, but the contents inside the list CAN still be mutated!'
        ],
        tip: 'Prefer `static nested classes` over non-static inner classes. Non-static inner classes maintain an implicit hidden reference to the outer class instance, which can cause memory leaks.',
        interviewNote: 'Question: "Why is String declared final in Java?" Answer: "To guarantee security and immutability. If String could be subclassed, malicious code could override equals() or length() and compromise security checks, database connection URLs, or hashcodes in HashMaps."',
        practiceQuestions: [
          {
            id: 'q-java14-1',
            type: 'mcq',
            question: 'When does a static initialization block (`static { ... }`) execute in a Java application?',
            options: [
              'Every time `new ClassName()` is called',
              'Only when `main()` exits',
              'Exactly once when the class is first loaded into memory by the ClassLoader',
              'During garbage collection'
            ],
            correctIndex: 2,
            explanation: 'A static initialization block executes exactly once when the JVM ClassLoader loads the bytecode of that class into the Metaspace/Method Area.'
          }
        ],
        relatedTopics: ['java-oop-foundations', 'java-jvm-memory']
      }
    ]
  },

  // CHAPTER 15 — EXCEPTION HANDLING
  {
    id: 'java-ch15',
    number: 15,
    title: 'Exception Handling',
    description: 'Throwable hierarchy, Checked vs Unchecked exceptions, try-catch-finally, try-with-resources, and custom exceptions',
    topics: [
      {
        id: 'java-exceptions',
        subjectId: 'java',
        chapterId: 'java-ch15',
        chapterNumber: 15,
        pageNumber: 15,
        title: 'Exceptions: Checked vs Unchecked & try-with-resources',
        difficulty: 'intermediate',
        definition: 'Exceptions disrupt normal program flow. Java enforces Checked Exceptions (verified at compile-time) and Unchecked RuntimeExceptions. `try-with-resources` ensures automatic deterministic closing of streams.',
        whyItMatters: 'Using `try-with-resources` guarantees that file handles, database connections, and sockets are automatically closed, preventing OS resource leaks without messy finally blocks.',
        syntax: 'try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {\n    return br.readLine();\n}',
        explanation: [
          'Throwable Hierarchy: `Throwable` divides into `Error` (serious JVM problems: `OutOfMemoryError`) and `Exception`.',
          'Checked Exceptions: Subclasses of `Exception` (except RuntimeException). Must be caught with `try-catch` or declared with `throws` (e.g. `IOException`, `SQLException`).',
          'Unchecked Exceptions: Subclasses of `RuntimeException`. Caused by programming bugs (e.g. `NullPointerException`, `IndexOutOfBoundsException`).',
          '`finally` Block: Always executes whether an exception was thrown, caught, or not.',
          '`try-with-resources` (Java 7+): Any object implementing `AutoCloseable` is automatically closed at the end of the block.'
        ],
        example: {
          language: 'java',
          code: `import java.io.*;

// Custom domain business exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class ExceptionDemo {
    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Withdrawal of $" + amount + " exceeds balance $" + balance);
        }
    }

    public static void main(String[] args) {
        try {
            withdraw(100.0, 150.0);
        } catch (InsufficientFundsException e) {
            System.err.println("[HANDLED] " + e.getMessage());
        } finally {
            System.out.println("Audit transaction completed (finally block executed).");
        }
    }
}`,
          output: '[HANDLED] Withdrawal of $150.0 exceeds balance $100.0\nAudit transaction completed (finally block executed).',
          annotations: [
            { line: 4, label: 'Custom checked exception subclassing Exception', type: 'blue' },
            { line: 11, label: 'throws clause declares checked exception in signature', type: 'yellow' },
            { line: 22, label: 'finally block executes unconditionally for cleanup', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Java Exception Handling Flowchart',
          subtitle: 'Deterministic cleanup guaranteed through try-catch-finally lifecycle',
          elements: [
            { id: '1', label: 'try Block Execution', sublabel: 'Normal Flow', value: 'Risky Operation', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Exception Thrown?', sublabel: 'JVM Runtime Intercept', value: 'Branch Decision', status: 'active', arrowTo: '3' },
            { id: '3', label: 'catch Block Match', sublabel: 'Error Recovery', value: 'Handles Specific Type', status: 'active', arrowTo: '4' },
            { id: '4', label: 'finally Block', sublabel: 'AutoCloseable / Cleanup', value: 'Guaranteed Execution', status: 'referenced' }
          ]
        },
        important: 'Never catch generic `Throwable`! Doing so intercepts JVM fatal `Error` objects like `OutOfMemoryError` and `StackOverflowError` which the application cannot recover from.',
        commonMistakes: [
          'Swallowing exceptions with an empty catch block: `catch (Exception e) {}`. This hides severe runtime bugs completely!',
          'Catching parent `Exception` before derived exceptions: child catch blocks will be unreachable and cause a compile error.'
        ],
        tip: 'Always prefer `try-with-resources` over traditional `try-finally` for stream cleanup. It is cleaner and prevents exceptions thrown during `close()` from masking the original error.',
        interviewNote: 'Question: "What is the difference between Checked and Unchecked exceptions?" Answer: "Checked exceptions (subclasses of Exception except RuntimeException) are checked at compile time; the compiler forces you to catch them or declare them with throws. Unchecked exceptions (subclasses of RuntimeException) indicate programming bugs and are evaluated at runtime."',
        practiceQuestions: [
          {
            id: 'q-java15-1',
            type: 'mcq',
            question: 'What interface must an object implement to be eligible for automatic cleanup inside a `try-with-resources` statement?',
            options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Cloneable', 'java.util.Iterator'],
            correctIndex: 1,
            explanation: 'The `try-with-resources` statement requires objects to implement `java.lang.AutoCloseable` (or its subinterface `java.io.Closeable`).'
          }
        ],
        relatedTopics: ['java-file-io', 'java-multithreading']
      }
    ]
  },

  // CHAPTER 16 — PACKAGES & MODULES
  {
    id: 'java-ch16',
    number: 16,
    title: 'Packages & Java Modules',
    description: 'Namespaces, package structure, import statements, static imports, and Java 9 Project Jigsaw modules',
    topics: [
      {
        id: 'java-packages-modules',
        subjectId: 'java',
        chapterId: 'java-ch16',
        chapterNumber: 16,
        pageNumber: 16,
        title: 'Packages, Static Imports & module-info (Java 9+)',
        difficulty: 'intermediate',
        definition: 'Packages group related classes into hierarchical namespaces matching directory trees. Java 9 Modules (`module-info.java`) encapsulate packages at the JVM boundary.',
        whyItMatters: 'Packages prevent naming conflicts and enforce encapsulation. Java 9 modules allow creating lightweight custom JVM runtime images using `jlink`.',
        syntax: 'package com.codeink.core;\nimport static java.lang.Math.PI;',
        explanation: [
          'Package Declaration: `package com.company.app;` must be the first non-comment line in a file.',
          'Directory Mapping: A class in package `com.codeink.core` must physically reside in `com/codeink/core/MyClass.java`.',
          'Static Import: `import static java.lang.Math.*;` imports static members directly so you can write `sqrt()` instead of `Math.sqrt()`.',
          'Java Platform Module System (JPMS, Java 9+): Declared in `module-info.java` using `requires` (dependencies) and `exports` (public packages).'
        ],
        example: {
          language: 'java',
          code: `package com.codeink.math;

// Static import brings static methods into current namespace
import static java.lang.Math.pow;
import static java.lang.Math.PI;

public class GeometryUtils {
    public static double circleArea(double radius) {
        // pow and PI used directly without Math. prefix!
        return PI * pow(radius, 2);
    }

    public static void main(String[] args) {
        System.out.printf("Area of radius 5: %.4f%n", circleArea(5.0));
    }
}`,
          output: 'Area of radius 5: 78.5398',
          annotations: [
            { line: 1, label: 'package statement declares namespace and filesystem folder hierarchy', type: 'blue' },
            { line: 4, label: 'import static imports static functions directly into scope', type: 'green' }
          ]
        },
        important: 'Avoid wildcard imports like `import java.util.*;`. While they do not increase compiled bytecode size, they can cause identifier collisions if multiple packages contain classes with the same name (e.g. `java.util.Date` vs `java.sql.Date`).',
        commonMistakes: [
          'Mismatch between the `package` declaration and the actual physical directory path on disk, causing `NoClassDefFoundError`.'
        ],
        tip: 'In `module-info.java`, only `export` the packages intended as public APIs. Internal implementation packages stay strongly encapsulated even from reflection!',
        interviewNote: 'Question: "What problem did Project Jigsaw (Java 9 Modules) solve?" Answer: "It eliminated \'JAR Hell\' (classpath hell), enforced strong encapsulation even against reflection, and modularized the massive monolithic JDK so developers can create lean custom runtime images with `jlink`."',
        practiceQuestions: [
          {
            id: 'q-java16-1',
            type: 'mcq',
            question: 'What file is required in the root directory to define a Java 9 Module and its exported packages?',
            options: ['pom.xml', 'module-info.java', 'package.json', 'manifest.mf'],
            correctIndex: 1,
            explanation: 'Java 9+ module descriptors are always defined in a file named `module-info.java` located at the root of the source directory.'
          }
        ],
        relatedTopics: ['java-collections', 'java-build-tools']
      }
    ]
  },

  // CHAPTER 17 — COLLECTION FRAMEWORK
  {
    id: 'java-ch17',
    number: 17,
    title: 'Collection Framework',
    description: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue, and Iterators',
    topics: [
      {
        id: 'java-collections',
        subjectId: 'java',
        chapterId: 'java-ch17',
        chapterNumber: 17,
        pageNumber: 17,
        title: 'Collections: List, Set, HashMap Internals & Iterators',
        difficulty: 'intermediate',
        definition: 'The Java Collection Framework (`java.util`) provides standardized data structures: `List` (ordered), `Set` (unique), `Queue` (FIFO), and `Map` (key-value hash table).',
        whyItMatters: '`HashMap` is the most asked data structure in Java interviews. Knowing how buckets, hash collisions, and red-black tree bins work distinguishes senior Java engineers.',
        syntax: 'List<String> list = new ArrayList<>();\nMap<String, Integer> map = new HashMap<>();',
        explanation: [
          '`ArrayList`: Resizable array. Fast O(1) random access by index; slower O(n) element insertion in the middle.',
          '`LinkedList`: Doubly-linked list. Fast O(1) head/tail insertions; slower O(n) index traversal and high pointer memory overhead.',
          '`HashSet`: Unordered collection of unique elements backed by an internal `HashMap` (O(1) average lookup).',
          '`TreeSet` & `TreeMap`: Sorted by natural order or `Comparator` backed by a Red-Black Tree (guaranteed O(log n)).',
          '`HashMap` Internals: Array of buckets. Elements are hashed via `hashCode()`. Collisions use linked lists, treeified into Red-Black Trees when bucket length exceeds 8 (Java 8+).'
        ],
        example: {
          language: 'java',
          code: `import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        // Fast dynamic List
        List<String> servers = new ArrayList<>(List.of("alpha", "beta", "gamma"));
        servers.add("delta");
        System.out.println("Servers List: " + servers);

        // HashMap with O(1) lookups
        Map<String, Integer> userPoints = new HashMap<>();
        userPoints.put("alice", 950);
        userPoints.put("bob", 820);

        // Safe retrieval with default
        int charliePoints = userPoints.getOrDefault("charlie", 0);
        System.out.println("Alice Points: " + userPoints.get("alice"));
        System.out.println("Charlie Points (Default): " + charliePoints);

        // Iterating Map entries using for-each
        for (Map.Entry<String, Integer> entry : userPoints.entrySet()) {
            System.out.println("  " + entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
          output: 'Servers List: [alpha, beta, gamma, delta]\nAlice Points: 950\nCharlie Points (Default): 0\n  alice -> 950\n  bob -> 820',
          annotations: [
            { line: 6, label: 'List.of creates an unmodifiable immutable list', type: 'blue' },
            { line: 15, label: 'getOrDefault avoids null check boilerplate', type: 'green' },
            { line: 19, label: 'entrySet() provides efficient key-value pair iteration', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Java Collection Framework Hierarchy',
          subtitle: 'Core interfaces and their standard high-performance implementations',
          elements: [
            { id: '1', label: 'Iterable<T>', sublabel: 'Root interface', value: 'iterator()', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Collection<T>', sublabel: 'size(), add(), remove()', value: 'Base Contract', status: 'active', arrowTo: '3' },
            { id: '3', label: 'List<T>', sublabel: 'ArrayList / LinkedList', value: 'Ordered with Index', status: 'active' },
            { id: '4', label: 'Set<T>', sublabel: 'HashSet / TreeSet', value: 'Unique Elements', status: 'active' },
            { id: '5', label: 'Map<K, V>', sublabel: 'HashMap / TreeMap', value: 'Key-Value Pairs', status: 'referenced' }
          ]
        },
        important: 'If you store custom objects as `HashMap` keys or `HashSet` elements, you MUST override BOTH `equals()` and `hashCode()`! Violating this contract breaks key lookup and causes memory leaks.',
        commonMistakes: [
          'Modifying a collection (`list.remove()`) directly inside an enhanced for-each loop, triggering `ConcurrentModificationException`. Use `Iterator.remove()` instead.'
        ],
        tip: 'In Java 9+, use `List.of()`, `Set.of()`, and `Map.of()` to construct immutable, thread-safe collections in a single readable line.',
        interviewNote: 'Question: "What happens when two distinct keys produce the same hashCode() in a HashMap?" Answer: "A hash collision occurs. In Java 8+, the entry is placed in that bucket\'s linked list. If the bucket exceeds 8 entries (TREEIFY_THRESHOLD), the list is converted into a Red-Black Tree, improving lookup from O(n) to O(log n)."',
        practiceQuestions: [
          {
            id: 'q-java17-1',
            type: 'mcq',
            question: 'What is the equals() and hashCode() contract requirement in Java?',
            options: [
              'If two objects are equal according to equals(), their hashCode() MUST be identical',
              'If two objects have the same hashCode(), they must be equal according to equals()',
              'hashCode() must return a unique negative integer',
              'Only primitive fields need to be hashed'
            ],
            correctIndex: 0,
            explanation: 'The contract states: if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must also strictly be true. (The reverse is not necessarily true due to hash collisions).'
          }
        ],
        relatedTopics: ['java-generics', 'java-streams', 'java-concurrency']
      }
    ]
  },

  // CHAPTER 18 — GENERICS
  {
    id: 'java-ch18',
    number: 18,
    title: 'Generics & Type Erasure',
    description: 'Type safety, generic classes, bounded type parameters, wildcards (? extends / super), and Type Erasure',
    topics: [
      {
        id: 'java-generics',
        subjectId: 'java',
        chapterId: 'java-ch18',
        chapterNumber: 18,
        pageNumber: 18,
        title: 'Generics: Type Erasure & Wildcards (PECS Rule)',
        difficulty: 'advanced',
        definition: 'Generics enable compile-time type safety for classes and methods without runtime casting. The compiler enforces type checks and then applies Type Erasure, removing generic types in bytecode.',
        whyItMatters: 'Generics prevent `ClassCastException` bugs by catching type mismatches at compile time rather than crashing in production at runtime.',
        syntax: 'public class Box<T> { private T val; }\npublic void inspect(List<? extends Number> list) { ... }',
        explanation: [
          'Type Parameter `<T>`: Placeholder for any non-primitive reference type (`T` for Type, `E` for Element, `K` for Key).',
          'Type Erasure: Java bytecode does NOT store generic types at runtime for backward compatibility; `<T>` is erased and replaced by `Object` or its upper bound.',
          'Upper Bounded Wildcard (`? extends T`): Covariance. Accepts `T` or any subclass of `T`. Read-only access.',
          'Lower Bounded Wildcard (`? super T`): Contravariance. Accepts `T` or any superclass of `T`. Safe for writing.',
          'PECS Rule: Producer extends, Consumer super. If your method reads from a collection, use `? extends`. If it writes to a collection, use `? super`.'
        ],
        example: {
          language: 'java',
          code: `import java.util.List;

public class GenericsDemo {
    // Generic method with bounded type parameter <T extends Number>
    public static <T extends Number> double sumNumbers(List<T> numbers) {
        double total = 0.0;
        for (T num : numbers) {
            total += num.doubleValue(); // doubleValue() is guaranteed on Number
        }
        return total;
    }

    public static void main(String[] args) {
        List<Integer> intList = List.of(10, 20, 30);
        List<Double> doubleList = List.of(1.5, 2.5, 3.5);

        System.out.println("Sum of Integers: " + sumNumbers(intList));
        System.out.println("Sum of Doubles: " + sumNumbers(doubleList));
    }
}`,
          output: 'Sum of Integers: 60.0\nSum of Doubles: 7.5',
          annotations: [
            { line: 5, label: '<T extends Number> restricts type parameter to Number subclasses', type: 'blue' },
            { line: 8, label: 'Compiler allows doubleValue() because bound guarantees Number', type: 'green' }
          ]
        },
        important: 'You CANNOT use primitive types (like `int`, `double`) directly as generic type arguments! `List<int>` is illegal. Use their Wrapper Classes (`List<Integer>`, `List<Double>`) which support autoboxing.',
        commonMistakes: [
          'Attempting `new T()` or `new T[10]` inside a generic class. Due to Type Erasure, the runtime does not know what `T` is, causing a compile error.',
          'Using raw types like `List list = new ArrayList();` which disables all compiler type checks.'
        ],
        tip: 'Remember the mnemonic PECS: "Producer Extends, Consumer Super". Use `? extends T` when reading data from a source; use `? super T` when writing data into a destination.',
        interviewNote: 'Question: "What is Type Erasure in Java?" Answer: "To maintain binary backward compatibility with pre-Java 5 bytecode, the javac compiler checks generic types at compile time and then strips (erases) them in the .class bytecode, replacing type parameters with Object or their upper bound and adding implicit casts."',
        practiceQuestions: [
          {
            id: 'q-java18-1',
            type: 'mcq',
            question: 'Under the PECS rule, which wildcard should you use if your method only reads items out of a collection?',
            options: ['List<? super T>', 'List<? extends T>', 'List<Object>', 'List<T*>'],
            correctIndex: 1,
            explanation: 'Producer Extends: If the collection acts as a producer (you only read data from it), use `? extends T`.'
          }
        ],
        relatedTopics: ['java-collections', 'java-lambdas', 'java-streams']
      }
    ]
  },

  // CHAPTER 19 — LAMBDA & FUNCTIONAL PROGRAMMING
  {
    id: 'java-ch19',
    number: 19,
    title: 'Lambda & Functional Programming',
    description: 'Lambda syntax, functional interfaces (Predicate, Function, Consumer, Supplier), and method references (::)',
    topics: [
      {
        id: 'java-lambdas',
        subjectId: 'java',
        chapterId: 'java-ch19',
        chapterNumber: 19,
        pageNumber: 19,
        title: 'Lambdas, Functional Interfaces & Method References (::)',
        difficulty: 'advanced',
        definition: 'Lambdas (Java 8+) are concise anonymous functions treating behavior as code parameters. A Functional Interface contains exactly one abstract method (SAM: Single Abstract Method).',
        whyItMatters: 'Lambdas eliminate verbose anonymous inner classes, enabling declarative functional pipelines, parallel operations, and clean Stream API transformations.',
        syntax: '(param1, param2) -> { return expression; }\nString::toUpperCase // Method reference syntax',
        explanation: [
          'Lambda Syntax: `(args) -> body`. If there is a single parameter, parentheses can be omitted: `x -> x * 2`.',
          '`Predicate<T>`: Evaluates condition, returns `boolean`: `boolean test(T t)`.',
          '`Function<T, R>`: Transforms input `T` into output `R`: `R apply(T t)`.',
          '`Consumer<T>`: Accepts input `T` and performs an action, returns `void`: `void accept(T t)`.',
          '`Supplier<T>`: Produces a value `T` with no input: `T get()`.',
          'Method References (`Class::method`): Shorthand syntax for lambdas that simply call an existing method.'
        ],
        example: {
          language: 'java',
          code: `import java.util.List;
import java.util.function.*;

public class LambdaDemo {
    public static void main(String[] args) {
        // Predicate: boolean filter condition
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 42 even? " + isEven.test(42));

        // Function: transformation
        Function<String, Integer> stringLength = String::length; // Method reference!
        System.out.println("Length of 'CODEINK': " + stringLength.apply("CODEINK"));

        // Consumer with forEach iteration
        List<String> frameworks = List.of("Spring Boot", "Kafka", "Hibernate");
        // System.out::println is a method reference to System.out.println()
        frameworks.forEach(System.out::println);
    }
}`,
          output: 'Is 42 even? true\nLength of \'CODEINK\': 7\nSpring Boot\nKafka\nHibernate',
          annotations: [
            { line: 7, label: 'Predicate evaluates boolean test(T)', type: 'blue' },
            { line: 11, label: 'String::length is a method reference to s.length()', type: 'green' },
            { line: 17, label: 'Consumer System.out::println consumes each element', type: 'yellow' }
          ]
        },
        important: 'Variables referenced inside a Lambda expression must be "effectively final" (their value must never change after initialization).',
        commonMistakes: [
          'Attempting to mutate an external local variable inside a lambda: `int sum = 0; list.forEach(x -> sum += x);` causes a compilation error!'
        ],
        tip: 'Always annotate custom single-method interfaces with `@FunctionalInterface`. This causes the compiler to flag an error if anyone adds a second abstract method.',
        interviewNote: 'Question: "What bytecode instruction does Java 8 use to invoke lambdas?" Answer: "Instead of compiling to anonymous inner classes, Java compiles lambdas using `invokedynamic` (INDY), which defers linkage to runtime and avoids generating .class files for each lambda."',
        practiceQuestions: [
          {
            id: 'q-java19-1',
            type: 'mcq',
            question: 'Which built-in java.util.function interface accepts a single argument and returns a boolean?',
            options: ['Consumer<T>', 'Supplier<T>', 'Predicate<T>', 'Function<T, R>'],
            correctIndex: 2,
            explanation: '`Predicate<T>` represents a boolean-valued function of one argument via its `boolean test(T t)` method.'
          }
        ],
        relatedTopics: ['java-streams', 'java-abstraction', 'java-collections']
      }
    ]
  },

  // CHAPTER 20 — STREAM API
  {
    id: 'java-ch20',
    number: 20,
    title: 'Stream API & Data Pipelines',
    description: 'Declarative pipelines, intermediate operations (filter, map), terminal operations (collect, reduce), and Optional',
    topics: [
      {
        id: 'java-streams',
        subjectId: 'java',
        chapterId: 'java-ch20',
        chapterNumber: 20,
        pageNumber: 20,
        title: 'Stream API: filter, map, collect & Optional',
        difficulty: 'advanced',
        definition: 'The Stream API (`java.util.stream`) processes sequences of elements declaratively. Streams do not store data; they pipeline transformations lazily until triggered by a Terminal Operation.',
        whyItMatters: 'Streams replace nested, stateful for-loops with clear functional pipelines, and can be converted into multi-core parallel pipelines effortlessly with `.parallelStream()`.',
        syntax: 'list.stream()\n    .filter(predicate)\n    .map(function)\n    .collect(Collectors.toList());',
        explanation: [
          'Intermediate Operations (Lazy): `filter()`, `map()`, `flatMap()`, `sorted()`, `distinct()`. Return a new Stream and execute ONLY when a terminal operation is called.',
          'Terminal Operations (Eager): `collect()`, `forEach()`, `reduce()`, `count()`, `anyMatch()`. Consume the stream and produce a result.',
          'Streams are Single-Use: A Stream cannot be reused once a terminal operation has been executed (throws `IllegalStateException`).',
          '`Optional<T>`: A container object used to represent the presence or absence of a value, eliminating `NullPointerException`.'
        ],
        example: {
          language: 'java',
          code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "alexander", "charlie", "anna");

        // Stream Pipeline: Filter names starting with 'a', capitalize, and sort
        List<String> filteredNames = names.stream()
                .filter(name -> name.startsWith("a"))
                .map(String::toUpperCase)
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Processed Stream: " + filteredNames);

        // Reduction with Optional
        List<Integer> numbers = List.of(10, 25, 40, 15);
        Optional<Integer> max = numbers.stream().max(Integer::compareTo);
        max.ifPresent(val -> System.out.println("Maximum Value: " + val));
    }
}`,
          output: 'Processed Stream: [ALEXANDER, ALICE, ANNA]\nMaximum Value: 40',
          annotations: [
            { line: 9, label: 'filter() discards elements not matching predicate', type: 'blue' },
            { line: 10, label: 'map() transforms each element to uppercase', type: 'yellow' },
            { line: 12, label: 'collect() terminal operation materializes the stream into a List', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Java Stream Functional Pipeline Lifecycle',
          subtitle: 'Lazy intermediate operations pipeline into eager terminal collection',
          elements: [
            { id: '1', label: 'Source Collection', sublabel: 'names.stream()', value: 'Data Source', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'filter(starts with a)', sublabel: 'Intermediate (Lazy)', value: 'Stream Pipeline', status: 'active', arrowTo: '3' },
            { id: '3', label: 'map(toUpperCase)', sublabel: 'Intermediate (Lazy)', value: 'Transformation', status: 'active', arrowTo: '4' },
            { id: '4', label: 'collect(toList())', sublabel: 'Terminal Operation', value: 'Materialized Result', status: 'referenced' }
          ]
        },
        important: 'Streams are lazy! If you build a stream with `.filter()` and `.map()` but do not invoke a terminal operation (like `.collect()` or `.forEach()`), ZERO elements are processed.',
        commonMistakes: [
          'Attempting to reuse a stream: `Stream s = list.stream(); s.count(); s.collect(...);` crashes with `IllegalStateException: stream has already been operated upon or closed`.'
        ],
        tip: 'Use `Optional.orElseGet(() -> computeDefault())` instead of `Optional.orElse(computeDefault())` to avoid executing expensive computations when the value is present.',
        interviewNote: 'Question: "What is the difference between map() and flatMap() in Java Streams?" Answer: "`map()` performs a 1-to-1 transformation, returning a stream of values. `flatMap()` performs a 1-to-many transformation, flattening nested streams (e.g. `Stream<List<T>>` into `Stream<T>`)."',
        practiceQuestions: [
          {
            id: 'q-java20-1',
            type: 'mcq',
            question: 'What happens if you execute intermediate stream operations (filter, map) without a terminal operation?',
            options: [
              'The stream executes immediately in background threads',
              'Nothing is executed because intermediate stream operations are strictly lazy',
              'A NullPointerException is thrown',
              'The collection is cleared'
            ],
            correctIndex: 1,
            explanation: 'Intermediate stream operations are lazy; they are not evaluated until a terminal operation (such as collect, forEach, or reduce) is invoked.'
          }
        ],
        relatedTopics: ['java-lambdas', 'java-collections', 'java-concurrency']
      }
    ]
  }
];
