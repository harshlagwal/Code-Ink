import { Chapter } from '../types/notebook';

export const CPP_CHAPTERS_PART2: Chapter[] = [
  // CHAPTER 11 — ADVANCED OOP
  {
    id: 'cpp-ch11',
    number: 11,
    title: 'Advanced OOP & Polymorphism',
    description: 'Virtual functions, dynamic dispatch, vtables, virtual destructors, and operator overloading',
    topics: [
      {
        id: 'cpp-advanced-oop',
        subjectId: 'cpp',
        chapterId: 'cpp-ch11',
        chapterNumber: 11,
        pageNumber: 11,
        title: 'Virtual Functions, vtables & Virtual Destructors',
        difficulty: 'intermediate',
        definition: 'Runtime polymorphism allows derived classes to override base class methods using the `virtual` keyword, resolved at runtime via compiler-generated virtual method tables (vtables).',
        whyItMatters: 'Virtual destructors are critical: deleting a derived object through a base pointer without a `virtual ~Base()` destructor causes undefined behavior and resource leaks.',
        syntax: 'class Base {\npublic:\n    virtual void draw() = 0; // Pure virtual function\n    virtual ~Base() = default;\n};',
        explanation: [
          '`virtual` functions: Enables dynamic dispatch so `base_ptr->speak()` calls the actual derived class implementation at runtime.',
          'vtable & vptr: The compiler generates an array of function pointers (vtable) per polymorphic class, and embeds a hidden pointer (`vptr`) inside each instance.',
          'Pure Virtual Function (`= 0`): Makes the class abstract (cannot be instantiated directly) and enforces an interface on derived classes.',
          'Virtual Destructor: Whenever a class has any virtual functions, its destructor MUST be virtual to guarantee complete cleanup when deleting via base pointers.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <memory>
#include <vector>

// Abstract Base Class (Interface)
class Shape {
public:
    virtual void render() const = 0; // Pure virtual function
    virtual ~Shape() = default;      // CRITICAL: Virtual destructor
};

class Circle : public Shape {
public:
    void render() const override {
        std::cout << "Rendering Circle (O)\\n";
    }
};

class Rectangle : public Shape {
public:
    void render() const override {
        std::cout << "Rendering Rectangle [X]\\n";
    }
};

int main() {
    // Polymorphic collection of Shapes
    std::vector<std::unique_ptr<Shape>> canvas;
    canvas.push_back(std::make_unique<Circle>());
    canvas.push_back(std::make_unique<Rectangle>());

    for (const auto& shape : canvas) {
        shape->render(); // Dynamically dispatches via vtable
    }
    return 0;
}`,
          output: 'Rendering Circle (O)\nRendering Rectangle [X]',
          annotations: [
            { line: 8, label: 'Virtual destructor guarantees derived destruction', type: 'red' },
            { line: 7, label: '= 0 pure virtual declaration defines abstract interface', type: 'blue' },
            { line: 31, label: 'Dynamic dispatch resolves derived method via vtable', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'VTable Dynamic Dispatch Mechanism',
          subtitle: 'Base pointer accesses derived method via hidden vptr index',
          elements: [
            { id: '1', label: 'Shape* ptr', sublabel: 'Base Pointer', value: 'Holds address', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Circle Instance', sublabel: 'Contains __vptr', value: 'Heap Object', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Circle vtable', sublabel: 'Table of Function Pointers', value: '&Circle::render', status: 'referenced' }
          ]
        },
        important: 'Always mark overridden methods in derived classes with the `override` specifier (e.g. `void render() const override`). This forces the compiler to verify that the base method signature matches exactly.',
        commonMistakes: [
          'Omitting `virtual` on the base class destructor. When `delete base_ptr` is called, the derived class destructor will NOT run, leaking derived resources!'
        ],
        tip: 'In C++11+, use `= default` to let the compiler generate optimal default constructors or destructors: `virtual ~Base() = default;`.',
        interviewNote: 'Question: "What is the memory overhead of a virtual function in C++?" Answer: "Each class with virtual functions has one vtable in static memory. Each object instance incurs a hidden pointer (`vptr`, typically 8 bytes on 64-bit systems) pointing to its class\'s vtable."',
        practiceQuestions: [
          {
            id: 'q-cpp11-1',
            type: 'mcq',
            question: 'Why MUST a base class have a virtual destructor if objects of derived classes will be deleted through base pointers?',
            options: [
              'To allocate memory for the derived class',
              'To ensure the derived class destructor is called and avoid undefined behavior / resource leaks',
              'To make the class abstract',
              'Virtual destructors are deprecated in modern C++'
            ],
            correctIndex: 1,
            explanation: 'Without a virtual destructor, deleting a derived object via a base pointer executes only the base destructor, leaking any heap memory or handles acquired by the derived class.'
          }
        ],
        relatedTopics: ['cpp-classes', 'cpp-templates', 'cpp-memory-management']
      }
    ]
  },

  // CHAPTER 12 — STL
  {
    id: 'cpp-ch12',
    number: 12,
    title: 'Standard Template Library (STL)',
    description: 'Containers (vector, map, set), iterators, and high-performance algorithms (sort, binary_search)',
    topics: [
      {
        id: 'cpp-stl',
        subjectId: 'cpp',
        chapterId: 'cpp-ch12',
        chapterNumber: 12,
        pageNumber: 12,
        title: 'STL: Containers, Iterators & std::sort',
        difficulty: 'intermediate',
        definition: 'The Standard Template Library (STL) provides reusable, generic algorithms and data structures categorized into Containers, Iterators, and Algorithms.',
        whyItMatters: 'Using standard containers (`std::vector`, `std::unordered_map`) ensures battle-tested memory management and optimal asymptotic complexity.',
        syntax: '#include <vector>\n#include <algorithm>\nstd::sort(vec.begin(), vec.end());',
        explanation: [
          'Sequence Containers: `std::vector` (dynamic array), `std::deque` (double-ended queue), `std::list` (doubly linked list).',
          'Associative Containers: `std::set` and `std::map` (O(log n) Red-Black trees); `std::unordered_map` (O(1) hash table).',
          'Iterators: Generalized pointers that bridge containers with generic algorithms (`begin()`, `end()`).',
          'Algorithms: `std::sort` (Introsort, O(n log n)), `std::find`, `std::binary_search`, `std::lower_bound`.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

int main() {
    // Dynamic vector with push_back and emplace_back
    std::vector<int> scores{85, 92, 78, 99, 64};
    std::sort(scores.begin(), scores.end()); // Introsort O(n log n)

    std::cout << "Sorted scores: ";
    for (int s : scores) std::cout << s << " ";
    std::cout << "\\n";

    // Hash map (O(1) average lookup)
    std::unordered_map<std::string, int> registry;
    registry["alice"] = 100;
    registry["bob"] = 92;

    if (auto it = registry.find("alice"); it != registry.end()) {
        std::cout << "Found " << it->first << " with score " << it->second << "\\n";
    }
    return 0;
}`,
          output: 'Sorted scores: 64 78 85 92 99 \nFound alice with score 100',
          annotations: [
            { line: 9, label: 'std::sort uses introsort (quick/heap/insertion hybrid)', type: 'blue' },
            { line: 16, label: 'std::unordered_map provides O(1) hash lookups', type: 'green' }
          ]
        },
        important: 'Prefer `std::vector` as your default container. Due to CPU cache locality and contiguous memory storage, `std::vector` frequently outperforms linked lists even when inserting in the middle.',
        commonMistakes: [
          'Iterator Invalidation: Modifying or inserting into a vector while looping over its iterators can reallocate memory and invalidate existing iterators, causing crashes.'
        ],
        tip: 'Use `vec.reserve(N)` before appending elements in a loop to preallocate memory and prevent costly dynamic array reallocations.',
        interviewNote: 'Question: "What is the difference between std::map and std::unordered_map?" Answer: "`std::map` is implemented as a self-balancing Red-Black binary search tree (O(log n) operations, keys always sorted). `std::unordered_map` is a hash table (O(1) average operations, keys unordered)."',
        practiceQuestions: [
          {
            id: 'q-cpp12-1',
            type: 'mcq',
            question: 'What underlying data structure powers `std::map` in standard C++?',
            options: [
              'Hash table with separate chaining',
              'Self-balancing Red-Black binary search tree',
              'Contiguous dynamic array',
              'Doubly-linked list'
            ],
            correctIndex: 1,
            explanation: '`std::map` is ordered and strictly guarantees O(log n) search, insertion, and deletion using an underlying self-balancing Red-Black tree.'
          }
        ],
        relatedTopics: ['cpp-templates', 'cpp-arrays-strings', 'cpp-modern']
      }
    ]
  },

  // CHAPTER 13 — TEMPLATES
  {
    id: 'cpp-ch13',
    number: 13,
    title: 'Templates & Generic Programming',
    description: 'Function templates, class templates, template specialization, and compile-time code generation',
    topics: [
      {
        id: 'cpp-templates',
        subjectId: 'cpp',
        chapterId: 'cpp-ch13',
        chapterNumber: 13,
        pageNumber: 13,
        title: 'Templates: Function Templates & Class Templates',
        difficulty: 'intermediate',
        definition: 'Templates are blueprints that allow functions and classes to operate with generic types. The compiler generates specialized, optimized machine code for each concrete type used.',
        whyItMatters: 'Templates enable type-safe, generic code without runtime performance penalties, powering the entirety of the C++ Standard Template Library.',
        syntax: 'template <typename T>\nT clamp(T val, T low, T high) {\n    return (val < low) ? low : (val > high) ? high : val;\n}',
        explanation: [
          '`template <typename T>`: Declares a type parameter `T` placeholder.',
          'Compile-Time Monomorphization: The compiler instantiates a separate, dedicated function for each distinct type (e.g. `clamp<int>`, `clamp<double>`).',
          'Class Templates: Blueprints for generic containers like `Stack<T>` or `Pair<T1, T2>`.',
          'Template Specialization: Allows customizing the implementation for specific types (e.g. optimizing `std::vector<bool>` to store 1 bit per boolean).'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <string>

// Generic function template
template <typename T>
T get_max(T a, T b) {
    return (a > b) ? a : b;
}

// Generic Class Template
template <typename T1, typename T2>
struct KeyValuePair {
    T1 key;
    T2 value;

    void display() const {
        std::cout << "[" << key << "] => " << value << "\\n";
    }
};

int main() {
    std::cout << "Max int: " << get_max(10, 25) << "\\n";
    std::cout << "Max double: " << get_max(3.1415, 2.718) << "\\n";

    KeyValuePair<std::string, int> user_score{"bob_dev", 950};
    user_score.display();
    return 0;
}`,
          output: 'Max int: 25\nMax double: 3.1415\n[bob_dev] => 950',
          annotations: [
            { line: 5, label: 'template <typename T> generic function blueprint', type: 'blue' },
            { line: 12, label: 'Class template with two generic type parameters', type: 'green' }
          ]
        },
        important: 'Template definitions must typically be placed in header files (.h / .hpp), not separate .cpp files! The compiler must see the full template implementation at the call site to instantiate code for the type.',
        commonMistakes: [
          'Separating template declarations into .h and definitions into .cpp without explicit instantiation, leading to unresolved external symbol linker errors.'
        ],
        tip: 'In C++20, you can use Concepts (`template <std::integral T>`) to constrain template parameters and produce readable compiler error messages.',
        interviewNote: 'Question: "What is the difference between C++ templates and Java Generics?" Answer: "C++ templates use compile-time monomorphization, generating distinct, specialized machine code for each type with zero runtime overhead. Java generics use Type Erasure, casting objects to `Object` at runtime with boxing overhead."',
        practiceQuestions: [
          {
            id: 'q-cpp13-1',
            type: 'mcq',
            question: 'Where must template function implementations typically reside in a C++ project?',
            options: [
              'Compiled inside a separate .so dynamic library',
              'In header files (.h/.hpp) so the compiler can instantiate code during translation',
              'In a dedicated main.cpp file only',
              'Templates cannot be placed in header files'
            ],
            correctIndex: 1,
            explanation: 'Because the compiler generates specialized code at compile time for each type, the full template definition must be visible in the header at the point of instantiation.'
          }
        ],
        relatedTopics: ['cpp-stl', 'cpp-modern', 'cpp-classes']
      }
    ]
  },

  // CHAPTER 14 — EXCEPTION HANDLING
  {
    id: 'cpp-ch14',
    number: 14,
    title: 'Exception Handling',
    description: 'try, catch, throw, std::exception hierarchy, stack unwinding, and noexcept',
    topics: [
      {
        id: 'cpp-exceptions',
        subjectId: 'cpp',
        chapterId: 'cpp-ch14',
        chapterNumber: 14,
        pageNumber: 14,
        title: 'try, catch, throw & Stack Unwinding',
        difficulty: 'intermediate',
        definition: 'Exceptions report runtime anomalies by throwing objects. When an exception is thrown, the runtime unwinds the call stack, automatically calling destructors for all local objects.',
        whyItMatters: 'Stack unwinding paired with RAII guarantees that open files, mutex locks, and memory buffers are cleanly liberated even during catastrophic error propagation.',
        syntax: 'try {\n    throw std::runtime_error("Disk Full");\n} catch (const std::exception& e) {\n    std::cerr << e.what();\n}',
        explanation: [
          '`throw`: Interrupts normal execution flow and transmits an exception object up the call stack.',
          '`catch (const std::exception& e)`: Intercepts standard exceptions polymorphically by const reference to avoid object slicing.',
          'Stack Unwinding: The runtime walks back up the stack frame by frame, destroying all active stack variables in reverse order of creation.',
          '`noexcept` specifier: Declares that a function will never throw. Enables move constructor optimizations in STL containers.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <stdexcept>

double compute_ratio(double numerator, double denominator) {
    if (denominator == 0.0) {
        throw std::invalid_argument("Division by zero in ratio computation!");
    }
    return numerator / denominator;
}

int main() {
    try {
        double result = compute_ratio(10.0, 0.0);
        std::cout << "Ratio: " << result << "\\n";
    } catch (const std::invalid_argument& err) {
        std::cerr << "[CAUGHT EXCEPTION] " << err.what() << "\\n";
    } catch (const std::exception& err) {
        std::cerr << "[GENERIC EXCEPTION] " << err.what() << "\\n";
    }
    std::cout << "Program recovered gracefully.\\n";
    return 0;
}`,
          output: '[CAUGHT EXCEPTION] Division by zero in ratio computation!\nProgram recovered gracefully.',
          annotations: [
            { line: 6, label: 'throw instantiates and raises standard exception object', type: 'red' },
            { line: 15, label: 'catch by const reference avoids object slicing', type: 'green' }
          ]
        },
        important: 'Never throw an exception from inside a destructor! If a destructor throws while stack unwinding is already in progress, `std::terminate` is immediately called, crashing the process.',
        commonMistakes: [
          'Catching exceptions by value `catch (std::exception e)`. This causes "object slicing", stripping away the derived exception\'s overridden `what()` message. Always catch by const reference `catch (const std::exception& e)`.',
          'Throwing raw integers or strings instead of subclasses of `std::exception`.'
        ],
        tip: 'Mark move constructors as `noexcept`. `std::vector` will only use move semantics when reallocating if the element type\'s move constructor is guaranteed `noexcept`.',
        interviewNote: 'Question: "What is Object Slicing when catching exceptions by value?" Answer: "Catching a derived exception (e.g. `std::runtime_error`) by base value (`std::exception`) slices off derived member variables and virtual table pointers, degrading diagnostics to the base class default."',
        practiceQuestions: [
          {
            id: 'q-cpp14-1',
            type: 'mcq',
            question: 'Why should exceptions always be caught by const reference (`catch (const std::exception& e)`)?',
            options: [
              'To speed up CPU clock cycles',
              'To prevent object slicing and preserve polymorphic derived exception types',
              'Because C++ does not allow catching by value',
              'To convert exceptions to integers'
            ],
            correctIndex: 1,
            explanation: 'Catching by const reference avoids copying the exception object and preserves runtime polymorphism, preventing object slicing.'
          }
        ],
        relatedTopics: ['cpp-classes', 'cpp-memory-management']
      }
    ]
  },

  // CHAPTER 15 — FILE HANDLING
  {
    id: 'cpp-ch15',
    number: 15,
    title: 'File Streams & I/O',
    description: 'std::ifstream, std::ofstream, std::fstream, stream state flags, and binary file I/O',
    topics: [
      {
        id: 'cpp-files',
        subjectId: 'cpp',
        chapterId: 'cpp-ch15',
        chapterNumber: 15,
        pageNumber: 15,
        title: 'File I/O: std::ifstream, std::ofstream & RAII',
        difficulty: 'intermediate',
        definition: 'C++ handles file I/O using stream classes from `<fstream>`: `std::ifstream` for reading, `std::ofstream` for writing, and `std::fstream` for bidirectional access.',
        whyItMatters: 'File stream classes follow RAII: their destructors automatically close the underlying operating system file descriptor when the stream object goes out of scope.',
        syntax: '#include <fstream>\nstd::ofstream file("data.txt");\nfile << "Data line\\n";',
        explanation: [
          '`std::ofstream`: Output file stream for writing text or binary data.',
          '`std::ifstream`: Input file stream for reading data from disk.',
          'RAII Auto-Close: Streams close automatically on destruction; explicit `.close()` is only required to flush early or check errors.',
          'Verification: Always check `if (!file.is_open())` or `if (!file)` to detect file access permission or path failures.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::string filename{"log.txt"};

    // RAII writing: file opens on construction
    {
        std::ofstream out_file(filename);
        if (out_file.is_open()) {
            out_file << "CODEINK Engine: Session initialized\\n";
            out_file << "Status: 200 OK\\n";
        }
    } // out_file destructor automatically flushes and closes file here!

    // Reading file line by line
    std::ifstream in_file(filename);
    std::string line;
    std::cout << "Reading from " << filename << ":\\n";
    while (std::getline(in_file, line)) {
        std::cout << "  > " << line << "\\n";
    }
    return 0;
}`,
          output: 'Reading from log.txt:\n  > CODEINK Engine: Session initialized\n  > Status: 200 OK',
          annotations: [
            { line: 9, label: 'std::ofstream opens file in text write mode', type: 'blue' },
            { line: 14, label: 'RAII destructor closes file descriptor upon scope exit', type: 'green' }
          ]
        },
        important: 'Always verify file stream state using `if (!in_file.is_open())` before attempting read operations.',
        commonMistakes: [
          'Using `while (!file.eof())` to read files. The EOF flag is only set AFTER attempting a read past the end of the file, causing the last line to be processed twice! Use `while (std::getline(file, line))` instead.'
        ],
        tip: 'For binary file reading and writing, pass the flag `std::ios::binary` and use `.read()` and `.write()` with `reinterpret_cast<char*>` to avoid newline translations.',
        interviewNote: 'Question: "Why is `while (!file.eof())` considered an antipattern in C++?" Answer: "`file.eof()` returns true only AFTER a read operation has failed due to reaching EOF. Testing it before reading results in processing stale or duplicated data on the final iteration."',
        practiceQuestions: [
          {
            id: 'q-cpp15-1',
            type: 'mcq',
            question: 'What is the idiomatic way to loop through all lines of a text file in C++?',
            options: [
              'while (!file.eof()) { ... }',
              'while (std::getline(file, line)) { ... }',
              'for (int i = 0; i < file.size(); i++) { ... }',
              'loop (file.read()) { ... }'
            ],
            correctIndex: 1,
            explanation: '`while (std::getline(file, line))` evaluates the stream state directly after the read attempt, terminating cleanly the moment EOF is encountered.'
          }
        ],
        relatedTopics: ['cpp-io', 'cpp-memory-management']
      }
    ]
  },

  // CHAPTER 16 — MEMORY MANAGEMENT & RAII
  {
    id: 'cpp-ch16',
    number: 16,
    title: 'Memory Management & Smart Pointers',
    description: 'Stack vs Heap, new/delete, RAII, std::unique_ptr, std::shared_ptr, and std::weak_ptr',
    topics: [
      {
        id: 'cpp-memory-management',
        subjectId: 'cpp',
        chapterId: 'cpp-ch16',
        chapterNumber: 16,
        pageNumber: 16,
        title: 'RAII, std::unique_ptr & std::shared_ptr',
        difficulty: 'advanced',
        definition: 'RAII binds resource management to object lifetimes. Smart pointers (`std::unique_ptr`, `std::shared_ptr`) wrap raw heap pointers to guarantee automatic deallocation with zero memory leaks.',
        whyItMatters: 'Smart pointers eliminate manual `new` and `delete`, preventing memory leaks, double-free crashes, and dangling pointers in modern C++.',
        syntax: 'auto ptr = std::make_unique<Widget>(arg);\nauto shared = std::make_shared<Data>();',
        explanation: [
          'Stack vs Heap: Stack allocations are fast and destroyed on scope exit. Heap allocations (`new`) persist until explicitly freed (`delete`).',
          'RAII: Resource Acquisition Is Initialization. Allocating in constructors and releasing in destructors guarantees deterministic cleanup.',
          '`std::unique_ptr`: Sole, exclusive ownership of a heap resource. Cannot be copied, only moved (`std::move`). Zero runtime overhead compared to raw pointers.',
          '`std::shared_ptr`: Shared ownership using atomic reference counting. Destroys the managed resource when the last owner is destroyed.',
          '`std::weak_ptr`: Non-owning observer that breaks circular references between `shared_ptr` objects.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "[ALLOC] Resource created\\n"; }
    ~Resource() { std::cout << "[FREE] Resource destroyed automatically!\\n"; }
    void execute() const { std::cout << "Resource processing workload...\\n"; }
};

int main() {
    {
        // Safe exclusive heap ownership with std::unique_ptr
        std::unique_ptr<Resource> res = std::make_unique<Resource>();
        res->execute();
        // Zero manual "delete" required!
    } // Exiting scope automatically calls Resource destructor!

    std::cout << "Scope closed without memory leaks.\\n";
    return 0;
}`,
          output: '[ALLOC] Resource created\nResource processing workload...\n[FREE] Resource destroyed automatically!\nScope closed without memory leaks.',
          annotations: [
            { line: 14, label: 'std::make_unique allocates safely on heap', type: 'blue' },
            { line: 17, label: 'Destructor invoked automatically on scope exit', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'std::unique_ptr vs std::shared_ptr Reference Counting',
          subtitle: 'Automatic deterministic deallocation without a garbage collector',
          elements: [
            { id: '1', label: 'unique_ptr (Stack)', sublabel: 'Exclusive Owner', value: 'Ptr to 0x4A', status: 'active', arrowTo: '3' },
            { id: '2', label: 'shared_ptr (Stack)', sublabel: 'Ref Count = 1', value: 'Ptr to 0x9B', status: 'normal', arrowTo: '4' },
            { id: '3', label: 'Heap Object A', sublabel: 'Address: 0x4A', value: 'Freed on unique_ptr exit', status: 'referenced' },
            { id: '4', label: 'Heap Object B', sublabel: 'Address: 0x9B', value: 'Freed when ref_count == 0', status: 'referenced' }
          ]
        },
        important: 'In modern C++, almost NEVER write raw `new` and `delete`. Use `std::make_unique` or `std::make_shared` instead. They are exception-safe and leak-proof.',
        commonMistakes: [
          'Using raw `delete ptr;` on a pointer owned by a smart pointer, causing double-free crashes.',
          'Creating circular reference loops with `std::shared_ptr`, preventing reference counts from ever reaching zero. Use `std::weak_ptr` to break cycles.'
        ],
        tip: 'Prefer `std::unique_ptr` by default. Only upgrade to `std::shared_ptr` when multiple unrelated components genuinely require shared ownership.',
        interviewNote: 'Question: "Why is std::make_shared faster than std::shared_ptr<T>(new T)?" Answer: "`std::make_shared` performs a single memory allocation for both the control block (reference count) and the managed object, improving cache locality and reducing heap overhead from two allocations to one."',
        practiceQuestions: [
          {
            id: 'q-cpp16-1',
            type: 'mcq',
            question: 'Can a `std::unique_ptr` be copied to another variable via assignment (`ptr2 = ptr1`)?',
            options: [
              'Yes, it increments an internal reference counter',
              'No, copy construction is deleted; it can only be moved using std::move',
              'Only if the managed object is primitive',
              'Yes, but it causes a compiler warning'
            ],
            correctIndex: 1,
            explanation: '`std::unique_ptr` enforces unique exclusive ownership: its copy constructor and copy assignment operator are deleted. Ownership can only be transferred via `std::move`.'
          }
        ],
        relatedTopics: ['cpp-advanced-oop', 'cpp-modern', 'cpp-concurrency']
      }
    ]
  },

  // CHAPTER 17 — MODERN C++
  {
    id: 'cpp-ch17',
    number: 17,
    title: 'Modern C++ (C++11 to C++20)',
    description: 'Move semantics, rvalue references (&&), std::move, constexpr, and structured bindings',
    topics: [
      {
        id: 'cpp-modern',
        subjectId: 'cpp',
        chapterId: 'cpp-ch17',
        chapterNumber: 17,
        pageNumber: 17,
        title: 'Move Semantics, Rvalues (&&) & Structured Bindings',
        difficulty: 'advanced',
        definition: 'Move semantics (C++11) transfers expensive heap resources from temporary rvalues to new objects without copying. Structured bindings (C++17) unpack tuples and structs cleanly.',
        whyItMatters: 'Move semantics transformed C++ performance: returning large vectors or strings from functions transfers memory pointers in O(1) time rather than allocating deep copies.',
        syntax: 'Widget(Widget&& other) noexcept; // Move constructor\nauto [id, name, score] = user_tuple; // C++17 Structured Binding',
        explanation: [
          'Lvalues vs Rvalues: Lvalues have persistent memory addresses (e.g. named variables). Rvalues are temporary values on the right-hand side of expressions (e.g. `x + y`).',
          'Rvalue Reference `T&&`: Binds specifically to temporary objects that are about to be destroyed.',
          '`std::move(val)`: Unconditionally casts an lvalue to an rvalue reference, signaling that its resources may be pilfered.',
          'Structured Bindings (C++17): Decomposes tuples, pairs, and structs into named variables in a single statement.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <string>
#include <vector>
#include <tuple>

// Function returning a tuple
std::tuple<int, std::string, double> get_telemetry() {
    return {1042, "Orbital Node", 99.85};
}

int main() {
    // C++17 Structured Bindings
    auto [node_id, label, health] = get_telemetry();
    std::cout << "Node ID: " << node_id << " | Label: " << label << " | Health: " << health << "%\\n";

    // Move Semantics with std::string
    std::string heavy_str = "Massive payload buffer string";
    std::string moved_str = std::move(heavy_str); // O(1) pointer swap, zero copies!

    std::cout << "Moved string: " << moved_str << "\\n";
    std::cout << "Original string is now empty: " << heavy_str.empty() << "\\n";
    return 0;
}`,
          output: 'Node ID: 1042 | Label: Orbital Node | Health: 99.85%\nMoved string: Massive payload buffer string\nOriginal string is now empty: 1',
          annotations: [
            { line: 12, label: 'C++17 structured bindings unpack tuple directly', type: 'blue' },
            { line: 17, label: 'std::move converts lvalue to rvalue for O(1) resource transfer', type: 'green' }
          ]
        },
        important: '`std::move` does NOT actually move anything! It is merely a static cast to an rvalue reference (`static_cast<T&&>(x)`). The move constructor or move assignment operator performs the actual pointer transfer.',
        commonMistakes: [
          'Using an object after calling `std::move(obj)`. An object in a "moved-from" state is valid but has unspecified values (typically empty).'
        ],
        tip: 'Use `constexpr` for values and functions that can be computed entirely at compile time to achieve zero runtime CPU cost.',
        interviewNote: 'Question: "What is an rvalue reference and why was it introduced?" Answer: "An rvalue reference (`T&&`) binds to temporary objects that are about to be destroyed. It was introduced in C++11 to implement move semantics (stealing heap resources instead of copying) and perfect forwarding."',
        practiceQuestions: [
          {
            id: 'q-cpp17-1',
            type: 'mcq',
            question: 'What is the time complexity of transferring ownership of a `std::vector<int>` with 1,000,000 elements using move semantics?',
            options: ['O(n) linear time', 'O(1) constant time', 'O(n log n)', 'O(n^2)'],
            correctIndex: 1,
            explanation: 'Move semantics merely copies three internal pointers (begin, end, capacity) and clears the source vector, executing in O(1) constant time regardless of vector size.'
          }
        ],
        relatedTopics: ['cpp-memory-management', 'cpp-lambdas', 'cpp-concurrency']
      }
    ]
  },

  // CHAPTER 18 — LAMBDA & FUNCTIONAL C++
  {
    id: 'cpp-ch18',
    number: 18,
    title: 'Lambda & Functional C++',
    description: 'Lambda syntax, capture lists ([=], [&]), generic lambdas, and std::function',
    topics: [
      {
        id: 'cpp-lambdas',
        subjectId: 'cpp',
        chapterId: 'cpp-ch18',
        chapterNumber: 18,
        pageNumber: 18,
        title: 'Lambdas: Capture Lists, Generic Lambdas & std::function',
        difficulty: 'advanced',
        definition: 'Lambdas are anonymous function objects (closures) defined inline. They can capture variables from their enclosing lexical scope by value (`[=]`) or by reference (`[&]`).',
        whyItMatters: 'Lambdas integrate with STL algorithms (`std::sort`, `std::for_each`, `std::count_if`), replacing verbose standalone helper functions with inline predicates.',
        syntax: '[captures](parameters) -> return_type { body; }',
        explanation: [
          'Capture List `[]`: `[x]` captures `x` by value (copy); `[&x]` captures `x` by reference; `[&]` captures all outer variables by reference; `[=]` captures all by value.',
          'Generic Lambdas (C++14): Using `auto` in parameter lists creates generic template-like lambdas: `[](auto a, auto b) { return a + b; }`.',
          '`std::function<R(Args...)>`: Type-erased polymorphic wrapper that can store any callable (function pointer, lambda, functor).',
          '`mutable` lambdas: Allows modifying variables captured by value inside the lambda body.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers{14, 3, 27, 8, 92, 45};
    int threshold = 20;

    // Lambda capturing threshold by value
    int count = std::count_if(numbers.begin(), numbers.end(), [threshold](int val) {
        return val > threshold;
    });

    std::cout << "Elements > " << threshold << ": " << count << "\\n";

    // Generic sorting lambda (descending order)
    std::sort(numbers.begin(), numbers.end(), [](auto a, auto b) {
        return a > b;
    });

    std::cout << "Sorted descending: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << "\\n";
    return 0;
}`,
          output: 'Elements > 20: 3\nSorted descending: 92 45 27 14 8 3 ',
          annotations: [
            { line: 9, label: '[threshold] captures variable from outer scope', type: 'blue' },
            { line: 16, label: 'Generic lambda with auto parameters (C++14)', type: 'green' }
          ]
        },
        important: 'Be extremely cautious capturing by reference `[&]` in asynchronous tasks or callbacks! If the outer function returns before the lambda executes, references become dangling references pointing to destroyed stack frames.',
        commonMistakes: [
          'Capturing references in detached threads or event loops where outer stack frames will be dismantled before invocation.'
        ],
        tip: 'Prefer lambda expressions directly over `std::bind`. Lambdas generate inlined code with zero overhead, whereas `std::bind` can add runtime indirection.',
        interviewNote: 'Question: "What does the compiler generate for a lambda expression?" Answer: "The compiler generates a unique, anonymous `struct` or `class` with an overloaded `operator()`. Variables in the capture list become member variables of that generated functor class."',
        practiceQuestions: [
          {
            id: 'q-cpp18-1',
            type: 'mcq',
            question: 'What does `[&x]` specify in a C++ lambda capture clause?',
            options: [
              'Captures variable x by address dereference',
              'Captures variable x by reference',
              'Captures variable x by read-only value copy',
              'Forbids lambda from accessing x'
            ],
            correctIndex: 1,
            explanation: 'The `&` preceding the identifier specifies that `x` is captured by reference, allowing mutations to affect the outer variable directly.'
          }
        ],
        relatedTopics: ['cpp-functions', 'cpp-stl', 'cpp-concurrency']
      }
    ]
  },

  // CHAPTER 19 — CONCURRENCY
  {
    id: 'cpp-ch19',
    number: 19,
    title: 'Concurrency & Multithreading',
    description: 'std::thread, std::mutex, std::lock_guard, race conditions, deadlocks, and atomic operations',
    topics: [
      {
        id: 'cpp-concurrency',
        subjectId: 'cpp',
        chapterId: 'cpp-ch19',
        chapterNumber: 19,
        pageNumber: 19,
        title: 'std::thread, std::mutex & std::lock_guard',
        difficulty: 'advanced',
        definition: 'C++11 introduced native standard multithreading. `std::thread` launches execution on native CPU threads; `std::mutex` and `std::lock_guard` prevent concurrent data races.',
        whyItMatters: 'Multithreading enables full multi-core CPU utilization for game loops, audio processing, physics engines, and high-throughput server backends.',
        syntax: 'std::thread t(worker_func, arg);\nt.join(); // or t.detach();',
        explanation: [
          '`std::thread`: Spawns an operating system thread. Must be `.join()`ed (waited for) or `.detach()`ed before destruction, otherwise `std::terminate` is called.',
          'Data Race: Occurs when multiple threads access the same memory location concurrently without synchronization, and at least one access is a write. Invokes undefined behavior!',
          '`std::mutex`: Mutual exclusion lock. Protects critical sections.',
          '`std::lock_guard<std::mutex>`: RAII wrapper that automatically acquires a mutex on construction and releases it on destruction (even during exceptions).',
          '`std::atomic<T>`: Hardware-level lock-free thread-safe primitives for counters and flags without mutex overhead.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex g_cout_mutex;
int shared_counter = 0;
std::mutex g_counter_mutex;

void worker(int id) {
    // Thread-safe update of shared resource
    {
        std::lock_guard<std::mutex> lock(g_counter_mutex);
        shared_counter += 10;
    }

    // Thread-safe console logging
    {
        std::lock_guard<std::mutex> lock(g_cout_mutex);
        std::cout << "Thread #" << id << " completed work\\n";
    }
}

int main() {
    std::vector<std::thread> thread_pool;

    // Launch 3 worker threads
    for (int i = 1; i <= 3; ++i) {
        thread_pool.emplace_back(worker, i);
    }

    // Join all threads to ensure completion before main exits
    for (auto& t : thread_pool) {
        t.join();
    }

    std::cout << "Final shared counter: " << shared_counter << "\\n";
    return 0;
}`,
          output: 'Thread #1 completed work\nThread #2 completed work\nThread #3 completed work\nFinal shared counter: 30',
          annotations: [
            { line: 13, label: 'std::lock_guard enforces RAII lock acquisition and release', type: 'blue' },
            { line: 33, label: 'join() blocks main until worker thread completes', type: 'green' }
          ]
        },
        important: 'Every `std::thread` that represents an active thread of execution MUST be joined (`t.join()`) or detached (`t.detach()`) before its destructor executes. Otherwise, the program terminates immediately!',
        commonMistakes: [
          'Calling `.join()` twice on the same thread (throws `std::system_error: Invalid argument`).',
          'Locking two mutexes in different order across threads, causing catastrophic deadlocks. In C++17, use `std::scoped_lock` to acquire multiple mutexes deadlock-free.'
        ],
        tip: 'In C++20, prefer `std::jthread` over `std::thread`. `std::jthread` automatically joins upon destruction and supports cooperative cooperative cancellation tokens.',
        interviewNote: 'Question: "What is a Deadlock and how do you prevent it?" Answer: "A deadlock occurs when Thread 1 holds Mutex A and waits for B, while Thread 2 holds Mutex B and waits for A. Prevent it by always acquiring multiple mutexes in a globally uniform order, or using `std::scoped_lock(m1, m2)`."',
        practiceQuestions: [
          {
            id: 'q-cpp19-1',
            type: 'mcq',
            question: 'What happens if a `std::thread` object is destroyed while still joinable without calling `.join()` or `.detach()`?',
            options: [
              'The thread quietly continues running in background',
              'The program calls `std::terminate()` immediately',
              'The thread pauses until main wakes it',
              'The thread converts to an atomic variable'
            ],
            correctIndex: 1,
            explanation: 'The C++ standard mandates that destroying a joinable `std::thread` invokes `std::terminate`, crashing the program to prevent dangling execution.'
          }
        ],
        relatedTopics: ['cpp-memory-management', 'cpp-lambdas']
      }
    ]
  },

  // CHAPTER 20 — C++ PROBLEM SOLVING
  {
    id: 'cpp-ch20',
    number: 20,
    title: 'C++ Problem Solving & Patterns',
    description: 'Algorithmic paradigms, two pointers, sliding window, and interview problem solving',
    topics: [
      {
        id: 'cpp-problem-solving',
        subjectId: 'cpp',
        chapterId: 'cpp-ch20',
        chapterNumber: 20,
        pageNumber: 20,
        title: 'Algorithmic Patterns: Two Pointers & Sliding Window',
        difficulty: 'advanced',
        definition: 'Problem solving in C++ leverages standard containers and algorithmic patterns to achieve optimal O(n) linear time complexity and minimal auxiliary space.',
        whyItMatters: 'Mastering algorithmic paradigms like Two Pointers and Sliding Window allows engineers to write lightning-fast data processing pipelines and ace technical coding interviews.',
        syntax: 'while (left < right) {\n    if (arr[left] + arr[right] == target) return {left, right};\n}',
        explanation: [
          'Two Pointer Technique: Solves sorted array search, palindrome checks, and container partitioning in O(n) time and O(1) space.',
          'Sliding Window Technique: Replaces nested O(n^2) subarray scanning with a dynamic window that tracks running metrics in O(n) time.',
          'Fast I/O: Speeding up competitive programming console streams.',
          'Custom Comparators: Using lambda expressions with `std::sort` or priority queues.'
        ],
        example: {
          language: 'cpp',
          code: `#include <iostream>
#include <vector>

// Two-Pointer: Maximum water container / Two-Sum on sorted array
bool has_pair_with_sum(const std::vector<int>& sorted_arr, int target) {
    int left = 0;
    int right = static_cast<int>(sorted_arr.size()) - 1;

    while (left < right) {
        int current_sum = sorted_arr[left] + sorted_arr[right];
        if (current_sum == target) {
            std::cout << "Pair found: " << sorted_arr[left] << " + " << sorted_arr[right] << " = " << target << "\\n";
            return true;
        } else if (current_sum < target) {
            left++; // Need larger sum, advance left pointer
        } else {
            right--; // Need smaller sum, decrement right pointer
        }
    }
    return false;
}

int main() {
    std::vector<int> sorted_data{2, 7, 11, 15, 19, 28};
    int target_sum = 26;

    std::cout << "Searching for target sum " << target_sum << "...\\n";
    has_pair_with_sum(sorted_data, target_sum);
    return 0;
}`,
          output: 'Searching for target sum 26...\nPair found: 7 + 19 = 26',
          annotations: [
            { line: 6, label: 'Two pointers initialized at opposite boundaries', type: 'blue' },
            { line: 9, label: 'Single O(n) pass replaces nested O(n^2) iteration', type: 'green' }
          ]
        },
        important: 'Always use `static_cast<int>(vec.size())` when doing arithmetic with array lengths, because `.size()` returns unsigned `size_t`. Subtracting from an empty container `0 - 1` wraps around to `18446744073709551615` (unsigned underflow)!',
        commonMistakes: [
          'Unsigned integer underflow with `vec.size() - 1` when the vector is empty.'
        ],
        tip: 'Congratulations! You have completed the comprehensive C++ curriculum from basic syntax to modern concurrency and systems design. Proceed to the 160-Mark C++ Final Examination Paper.',
        interviewNote: 'Question: "What is the difference between std::vector::push_back and std::vector::emplace_back?" Answer: "`push_back` constructs an object and then copies or moves it into the vector. `emplace_back` forwards constructor arguments directly and constructs the object in-place inside the vector\'s allocated memory buffer, avoiding temporary copies."',
        practiceQuestions: [
          {
            id: 'q-cpp20-1',
            type: 'mcq',
            question: 'What is the time complexity of the Two-Pointer search on a sorted array of size n?',
            options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
            correctIndex: 2,
            explanation: 'The Two-Pointer approach inspects at most n elements by advancing left and decrementing right monotonically, resulting in optimal O(n) linear time complexity.'
          }
        ],
        relatedTopics: ['cpp-stl', 'cpp-modern']
      }
    ]
  }
];
