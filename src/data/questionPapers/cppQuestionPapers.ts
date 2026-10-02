import { SubjectQuestionPapers } from '../../types/notebook';

export const CPP_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'cpp',
  subjectName: 'C++ Object-Oriented & Systems Programming',
  courseCode: 'CS-102-CPP',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-102-CPP-S1',
      title: 'C++ OOP & Memory Mechanics Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-102-CPP',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY. Each question carries 1 Mark (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions. Each question carries 5 Marks (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions. Each question carries 10 Marks (2 × 10 = 20 Marks).',
        'Show object memory layouts, vtables, constructor invocation orders, and code traces clearly.'
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
              id: 'cpp-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'References vs Pointers',
              question: 'State two fundamental differences between a C++ reference (`int &ref = x;`) and a C++ pointer (`int *ptr = &x;`).',
              markingBreakdown: ['Two distinct differences (cannot be null, cannot be reseated): 1 Mark'],
              modelSolution: '1. A reference must be bound to an object upon declaration and cannot be NULL.\n2. A reference cannot be reseated to refer to a different object later, whereas a pointer can change its target address.',
              notebookCheckpoints: ['Cannot be null', 'Cannot be reseated']
            },
            {
              id: 'cpp-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'RAII Idiom',
              question: 'What does the acronym RAII stand for in C++, and when is the resource guaranteed to be released?',
              markingBreakdown: ['Resource Acquisition Is Initialization and stack destructor guarantee: 1 Mark'],
              modelSolution: 'RAII stands for "Resource Acquisition Is Initialization". Resources (memory, file handles, locks) are acquired in a class constructor and guaranteed to be released in its destructor when the object goes out of scope (even during exceptions).',
              notebookCheckpoints: ['Resource Acquisition Is Initialization', 'Destructor release on scope exit']
            },
            {
              id: 'cpp-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'vptr and vtable',
              question: 'When a class declares at least one `virtual` member function, what hidden member pointer does the compiler inject into every instance of that class?',
              markingBreakdown: ['vptr (virtual table pointer): 1 Mark'],
              modelSolution: 'The compiler injects a hidden pointer named `vptr` (virtual table pointer) into the object layout, pointing to the class\'s static `vtable` of virtual function addresses.',
              notebookCheckpoints: ['vptr', 'Points to vtable']
            },
            {
              id: 'cpp-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Virtual Destructors',
              question: 'Why should a base class destructor always be declared `virtual` if derived objects will be deleted via a base pointer (`Base *p = new Derived(); delete p;`)?',
              markingBreakdown: ['Prevents undefined behavior and incomplete destruction of derived members: 1 Mark'],
              modelSolution: 'Without a `virtual` destructor, `delete p` invokes only `~Base()`, skipping `~Derived()`. Any resources allocated in `Derived` will leak, resulting in undefined behavior.',
              notebookCheckpoints: ['Ensures derived destructor is invoked', 'Prevents memory leaks and UB']
            },
            {
              id: 'cpp-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Rule of Three / Five',
              question: 'Name the five special member functions that comprise the modern C++ "Rule of Five".',
              markingBreakdown: ['All 5 correctly named: 1 Mark'],
              modelSolution: '1. Destructor, 2. Copy Constructor, 3. Copy Assignment Operator, 4. Move Constructor, 5. Move Assignment Operator.',
              notebookCheckpoints: ['Destructor', 'Copy ctor/assign', 'Move ctor/assign']
            },
            {
              id: 'cpp-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Smart Pointers: unique_ptr',
              question: 'Why is `std::unique_ptr` a move-only type, and what happens if you attempt to assign it using `ptr2 = ptr1` without `std::move`?',
              markingBreakdown: ['Unique ownership model and compile-time copy prevention: 1 Mark'],
              modelSolution: '`std::unique_ptr` enforces exclusive single ownership of a resource. Its copy constructor is deleted (`= delete`). Attempting `ptr2 = ptr1` results in a compile-time error.',
              notebookCheckpoints: ['Exclusive single ownership', 'Deleted copy constructor']
            },
            {
              id: 'cpp-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'constexpr Keyword',
              question: 'What is guaranteed when a function or variable is declared with the `constexpr` specifier in C++11/14?',
              markingBreakdown: ['Evaluated at compile-time when operands are constant expressions: 1 Mark'],
              modelSolution: '`constexpr` guarantees that the value can be computed at compile-time by the compiler, allowing it to be used in template arguments, array bounds, and ROM embedded tables with zero runtime overhead.',
              notebookCheckpoints: ['Compile-time evaluation', 'Zero runtime cost']
            },
            {
              id: 'cpp-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Move Semantics: rvalue reference',
              question: 'What is an rvalue reference in C++11, and how is its type written syntactically (e.g. for type `T`)?',
              markingBreakdown: ['Binds to temporary/expiring objects, written as T&&: 1 Mark'],
              modelSolution: 'An rvalue reference (written as `T&&`) binds to temporary objects or expressions nearing expiration, enabling the theft of internal heap buffers instead of performing expensive deep copies.',
              notebookCheckpoints: ['Syntax: T&&', 'Binds to temporary / expiring objects']
            },
            {
              id: 'cpp-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'explicit Keyword',
              question: 'What compiler behavior does the `explicit` specifier prevent when applied to a single-parameter constructor?',
              markingBreakdown: ['Prevents implicit type conversion / implicit constructor calls: 1 Mark'],
              modelSolution: '`explicit` prevents the compiler from performing implicit type conversions and copy-initialization (e.g. `MyClass obj = 10;` is disallowed; `MyClass obj(10);` is required).',
              notebookCheckpoints: ['Prevents implicit conversions', 'Disallows copy-initialization from primitive']
            },
            {
              id: 'cpp-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'std::move Mechanics',
              question: 'Does calling `std::move(x)` actually move any bytes or execute memory transfers on its own? Explain.',
              markingBreakdown: ['No, it is an unconditional static_cast to rvalue reference: 1 Mark'],
              modelSolution: 'No. `std::move` performs zero runtime work and moves no bytes. It is purely a compile-time `static_cast<T&&>(x)` that casts an lvalue to an rvalue reference to allow move constructor overload resolution.',
              notebookCheckpoints: ['Zero runtime work', 'static_cast to rvalue reference (T&&)']
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
              id: 'cpp-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Copy Constructor & Deep vs Shallow Copy',
              question: 'Explain the disaster of "Shallow Copy" when an object manages raw heap memory. Write a complete C++ class `StringHolder` containing `char *data` that implements a proper Deep Copy Constructor and Destructor conforming to RAII.',
              markingBreakdown: [
                'Shallow copy double-free disaster explanation: 2 Marks',
                'Deep copy constructor implementation with strlen & strcpy: 2 Marks',
                'Destructor with delete[]: 1 Mark'
              ],
              modelSolution: `Shallow Copy copies raw pointer addresses. If object B is copy-constructed from A, both B.data and A.data point to the exact same heap memory block. When both destructors run, the second triggers a fatal Double Free abort.

\`\`\`cpp
#include <iostream>
#include <cstring>

class StringHolder {
private:
    char *data;
public:
    // Regular constructor
    StringHolder(const char *str = "") {
        data = new char[std::strlen(str) + 1];
        std::strcpy(data, str);
    }

    // Deep Copy Constructor
    StringHolder(const StringHolder &other) {
        data = new char[std::strlen(other.data) + 1];
        std::strcpy(data, other.data);
    }

    // Destructor
    ~StringHolder() {
        delete[] data;
    }

    const char* get() const { return data; }
};
\`\`\``,
              notebookCheckpoints: [
                'Explain double free vulnerability',
                'Allocate new buffer with strlen + 1',
                'Use delete[] in destructor'
              ]
            },
            {
              id: 'cpp-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Constructor Execution Order in Inheritance',
              question: 'Trace the exact output of this C++ program in your notebook and explain the order of Base, Derived, and Member constructors/destructors:\n```cpp\n#include <iostream>\nstruct Member { Member() { std::cout << "M "; } ~Member() { std::cout << "~M "; } };\nstruct Base { Base() { std::cout << "B "; } virtual ~Base() { std::cout << "~B "; } };\nstruct Derived : public Base { Member m; Derived() { std::cout << "D "; } ~Derived() { std::cout << "~D "; } };\nint main() { Derived *d = new Derived(); delete d; }\n```',
              codeSnippet: 'struct Member { Member() { std::cout << "M "; } ~Member() { std::cout << "~M "; } };\nstruct Base { Base() { std::cout << "B "; } virtual ~Base() { std::cout << "~B "; } };\nstruct Derived : public Base { Member m; Derived() { std::cout << "D "; } ~Derived() { std::cout << "~D "; } };\nint main() { Derived *d = new Derived(); delete d; }',
              markingBreakdown: [
                'Constructor execution order (B -> M -> D): 2.5 Marks',
                'Destructor execution order (reverse: ~D -> ~M -> ~B): 2.5 Marks'
              ],
              modelSolution: `Output: \`B M D ~D ~M ~B \`

Execution Breakdown:
1. Construction Order:
   - Base class constructor runs first: prints "B "
   - Non-static member objects are constructed next in declaration order: prints "M "
   - Derived class constructor body executes last: prints "D "
2. Destruction Order (Strict reverse of construction):
   - Derived destructor body runs first: prints "~D "
   - Member objects are destroyed in reverse declaration order: prints "~M "
   - Base class destructor runs last: prints "~B "`,
              notebookCheckpoints: [
                'Correct printed sequence: B M D ~D ~M ~B',
                'Explain base ctor runs before members',
                'Explain reverse order in destructors'
              ]
            },
            {
              id: 'cpp-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Virtual Dispatch & Dynamic Binding (vtable Trace)',
              question: 'Given the class hierarchy below, draw the vtable layout for `Base` and `Derived`, and determine the exact output of `main()`:\n```cpp\nclass Base { public: virtual void f() { std::cout << "B::f "; } void g() { std::cout << "B::g "; } };\nclass Derived : public Base { public: void f() override { std::cout << "D::f "; } void g() { std::cout << "D::g "; } };\nint main() { Base *b = new Derived(); b->f(); b->g(); delete b; }\n```',
              markingBreakdown: [
                'vtable diagram for Base and Derived: 2 Marks',
                'b->f() dynamic dispatch to D::f: 1.5 Marks',
                'b->g() static binding to B::g: 1.5 Marks'
              ],
              modelSolution: `Output: \`D::f B::g \`

Explanation:
- Function \`f()\` is declared \`virtual\`. Calls through pointer \`b\` resolve via dynamic dispatch (looking up Derived\'s vtable at runtime). It invokes \`Derived::f()\`, printing \`D::f \`.
- Function \`g()\` is NOT virtual in Base. Calls through pointer \`b\` are bound statically at compile-time based purely on the pointer\'s declared type (\`Base*\`). It invokes \`Base::g()\`, printing \`B::g \`.

vtable Diagram:
Base vtable:    [ &Base::f ]
Derived vtable: [ &Derived::f ] (overrides slot 0)`,
              notebookCheckpoints: [
                'Final output: D::f B::g',
                'Explain f() is virtual dynamic dispatch',
                'Explain g() is non-virtual static binding'
              ]
            },
            {
              id: 'cpp-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Move Constructor & Move Assignment',
              question: 'Write a C++ class `Buffer` managing dynamic array `int *data` and `size_t size` implementing both:\n(a) Move Constructor `Buffer(Buffer &&other) noexcept`\n(b) Move Assignment Operator `Buffer& operator=(Buffer &&other) noexcept`\nExplain why moving is $O(1)$ compared to $O(N)$ copying.',
              markingBreakdown: [
                'Move constructor stealing pointer and nulling other: 2 Marks',
                'Move assignment handling self-assignment and freeing old buffer: 2 Marks',
                'O(1) pointer swap explanation: 1 Mark'
              ],
              modelSolution: `\`\`\`cpp
#include <utility>

class Buffer {
private:
    int *data;
    size_t size;
public:
    Buffer(size_t s) : size(s), data(new int[s]) {}
    ~Buffer() { delete[] data; }

    // (a) Move Constructor
    Buffer(Buffer &&other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr; // Leave source in valid empty state
        other.size = 0;
    }

    // (b) Move Assignment Operator
    Buffer& operator=(Buffer &&other) noexcept {
        if (this != &other) {
            delete[] data;      // Clean up our current memory
            data = other.data;  // Steal donor pointer
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};
\`\`\`
Complexity:
Moving copies only 16 bytes of metadata (pointer address and size integer) in O(1) time regardless of whether the buffer contains 10 or 10,000,000 elements.`,
              notebookCheckpoints: [
                'Null out other.data after stealing',
                'Guard self-assignment: if (this != &other)',
                'Mark noexcept'
              ]
            },
            {
              id: 'cpp-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Operator Overloading: `operator<<` and `operator+`',
              question: 'Design a `Complex` number class representing $a + bi$.\n(a) Overload the `+` operator as a member or non-member function.\n(b) Overload `std::ostream& operator<<(std::ostream &os, const Complex &c)` as a friend function.\n(c) Explain why `operator<<` cannot be implemented as a member function of `Complex`.',
              markingBreakdown: [
                'Complex class definition and operator+: 2 Marks',
                'operator<< friend implementation: 2 Marks',
                'Explanation of left operand stream requirement: 1 Mark'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>

class Complex {
private:
    double real;
    double imag;
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    // Overload +
    Complex operator+(const Complex &other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // Friend stream insertion
    friend std::ostream& operator<<(std::ostream &os, const Complex &c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};
\`\`\`
Why operator<< must be a non-member:
The left-hand operand of \`std::cout << c\` is an instance of \`std::ostream\`, not \`Complex\`. If implemented as a member function, the left operand would have to be Complex (\`c << std::cout\`), violating standard I/O idioms.`,
              notebookCheckpoints: [
                'friend std::ostream& operator<<',
                'Return ostream reference for chaining',
                'Explain left operand is std::ostream'
              ]
            },
            {
              id: 'cpp-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Custom Template Stack Implementation',
              question: 'Write a generic C++ class template `Stack<T>` implementing a fixed-capacity LIFO stack.\n(a) Methods: `void push(const T &val)`, `T pop()`, `bool isEmpty() const`, and `bool isFull() const`.\n(b) Include exception handling (`std::underflow_error`, `std::overflow_error`).',
              markingBreakdown: [
                'Class template syntax template <typename T>: 1 Mark',
                'push and overflow check: 1.5 Marks',
                'pop and underflow check: 1.5 Marks',
                'isEmpty / isFull: 1 Mark'
              ],
              modelSolution: `\`\`\`cpp
#include <stdexcept>

template <typename T, size_t Capacity = 100>
class Stack {
private:
    T elements[Capacity];
    int topIndex;
public:
    Stack() : topIndex(-1) {}

    bool isEmpty() const { return topIndex == -1; }
    bool isFull() const { return topIndex == (int)Capacity - 1; }

    void push(const T &val) {
        if (isFull()) throw std::overflow_error("Stack Overflow");
        elements[++topIndex] = val;
    }

    T pop() {
        if (isEmpty()) throw std::underflow_error("Stack Underflow");
        return elements[topIndex--];
    }
};
\`\`\``,
              notebookCheckpoints: [
                'Template parameter syntax',
                'Throw std::overflow_error and std::underflow_error'
              ]
            },
            {
              id: 'cpp-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Smart Pointers: `std::shared_ptr` & `std::weak_ptr`',
              question: 'Explain how `std::shared_ptr` performs reference counting. Demonstrate how circular references between two `shared_ptr` objects cause an irreversible memory leak, and show how `std::weak_ptr` breaks the cycle.',
              markingBreakdown: [
                'Reference count control block explanation: 1.5 Marks',
                'Circular dependency code causing memory leak: 2 Marks',
                'Breaking cycle with std::weak_ptr: 1.5 Marks'
              ],
              modelSolution: `std::shared_ptr uses an atomic Control Block on the heap containing:
1. Strong reference count (tracks active owners)
2. Weak reference count (tracks weak observers)

Circular Dependency Problem:
\`\`\`cpp
#include <memory>
struct B;
struct A { std::shared_ptr<B> b_ptr; };
struct B { std::shared_ptr<A> a_ptr; }; // Cycle!

void leak_demo() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->b_ptr = b;
    b->a_ptr = a; // Ref count of both is 2
} // a and b go out of scope: ref count drops to 1! Memory is NEVER freed!
\`\`\`

Solution with weak_ptr:
Change \`B::a_ptr\` to \`std::weak_ptr<A> a_ptr;\`. \`weak_ptr\` does not increment the strong reference count, allowing \`A\` to be destroyed when its scope ends, breaking the leak.`,
              notebookCheckpoints: [
                'Explain control block ref count',
                'Diagram of circular A <-> B references',
                'Use std::weak_ptr to break cycle'
              ]
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Systems Design',
          instruction: 'Attempt ANY 2 questions out of 3. Each question carries 10 Marks (2 × 10 = 20 Marks). Write complete, production-grade C++ solutions.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'cpp-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Design Pattern: Thread-Safe Object Pool & RAII Leaser',
              question: 'Design and implement an industrial-grade Thread-Safe Object Pool in modern C++:\n(a) Template class `ObjectPool<T>` managing reusable instances of costly objects (e.g. database connections).\n(b) Implement `acquire()` returning a custom smart RAII handle `PooledObject<T>` that automatically returns the object to the pool when the handle goes out of scope.\n(c) Use `std::mutex` and `std::condition_variable` to synchronize concurrent thread access without busy-waiting.\n(d) Draw the lifecycle state diagram in your notebook showing object check-out and return.',
              markingBreakdown: [
                'ObjectPool structure and queue initialization: 2.5 Marks',
                'Thread synchronization with std::unique_lock & condition_variable: 3 Marks',
                'RAII PooledObject custom deleter / handle: 3 Marks',
                'Lifecycle diagram and exception safety: 1.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <vector>
#include <memory>
#include <mutex>
#include <condition_variable>

template <typename T>
class ObjectPool {
private:
    std::vector<std::unique_ptr<T>> pool;
    std::mutex mtx;
    std::condition_variable cv;
public:
    ObjectPool(size_t capacity) {
        for (size_t i = 0; i < capacity; i++) {
            pool.push_back(std::make_unique<T>());
        }
    }

    // Custom RAII Smart Handle
    using PooledHandle = std::unique_ptr<T, std::function<void(T*)>>;

    PooledHandle acquire() {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this]() { return !pool.empty(); });

        // Pop available object
        std::unique_ptr<T> obj = std::move(pool.back());
        pool.pop_back();

        T* rawPtr = obj.release();

        // Custom deleter returns object back to pool on scope exit
        return PooledHandle(rawPtr, [this](T* returnedPtr) {
            std::unique_lock<std::mutex> returnLock(this->mtx);
            this->pool.push_back(std::unique_ptr<T>(returnedPtr));
            this->cv.notify_one();
        });
    }
};
\`\`\`
Lifecycle State Diagram:
[Pool Queue] ──(acquire: wait/pop)──> [Active Thread Workspace]
      ↑                                         │
      └─────────(RAII Deleter / return)─────────┘`,
              notebookCheckpoints: [
                'Use condition_variable::wait with predicate lambda',
                'Custom deleter lambda returning object to pool',
                'Notify_one on return'
              ]
            },
            {
              id: 'cpp-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Template Metaprogramming & Type Traits',
              question: 'Modern C++ relies heavily on compile-time introspection.\n(a) Implement a custom compile-time type trait `is_pointer<T>` using template specialization that defines `static constexpr bool value = true/false`.\n(b) Explain SFINAE ("Substitution Failure Is Not An Error").\n(c) Implement a function `print_val` using `std::enable_if` that prints differently for pointer types versus primitive value types.\n(d) Show how C++20 Concepts (`template <typename T> requires ...`) simplify this idiom.',
              markingBreakdown: [
                'Custom is_pointer primary and partial specialization: 3 Marks',
                'SFINAE explanation: 2 Marks',
                'std::enable_if conditional overload: 3 Marks',
                'C++20 Concepts comparison: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <type_traits>

// (a) Custom Type Trait
template <typename T>
struct is_pointer {
    static constexpr bool value = false;
};

// Partial specialization for pointer types
template <typename T>
struct is_pointer<T*> {
    static constexpr bool value = true;
};

// (b) SFINAE: If substituting a template parameter causes an invalid type,
// the compiler does NOT fail with a hard error; it simply discards that overload.

// (c) std::enable_if implementation
template <typename T>
typename std::enable_if<!is_pointer<T>::value>::type
print_val(T val) {
    std::cout << "Value: " << val << "\\n";
}

template <typename T>
typename std::enable_if<is_pointer<T>::value>::type
print_val(T ptr) {
    std::cout << "Dereferenced Pointer: " << (ptr ? *ptr : 0) << "\\n";
}

// (d) C++20 Concepts equivalent (much cleaner syntax):
template <typename T>
concept PointerType = std::is_pointer_v<T>;

template <typename T>
void print_modern(T val) { std::cout << "Value\\n"; }

template <PointerType T>
void print_modern(T ptr) { std::cout << "Pointer\\n"; }
\`\`\``,
              notebookCheckpoints: [
                'Primary template is_pointer<T> value = false',
                'Specialization is_pointer<T*> value = true',
                'Define SFINAE acronym and principle'
              ]
            },
            {
              id: 'cpp-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'High-Performance Systems: Custom STL Vector Implementation',
              question: 'Construct a production-grade template `Vector<T>` in C++ mimicking `std::vector`:\n(a) Manage raw memory using placement new (`::new (static_cast<void*>(ptr)) T(...)`) and explicit destructor calls (`ptr->~T()`) so objects are not default-constructed needlessly.\n(b) Implement `push_back(const T&)` and `push_back(T&&)` with doubling geometric reallocation.\n(c) Implement `emplace_back(Args&&... args)` using perfect forwarding (`std::forward<Args>`).\n(d) Write a proper Destructor that cleans up only constructed elements.',
              markingBreakdown: [
                'Raw memory allocation via operator new[]: 2.5 Marks',
                'Placement new and explicit destruction: 3 Marks',
                'emplace_back with variadic templates and std::forward: 3 Marks',
                'Copy/Move mechanics during reallocation: 1.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <utility>
#include <new>

template <typename T>
class Vector {
private:
    T *buffer;
    size_t sz;
    size_t cap;

    void reallocate(size_t new_cap) {
        // 1. Allocate uninitialized memory buffer
        T *new_buffer = static_cast<T*>(::operator new(new_cap * sizeof(T)));

        // 2. Move existing elements to new buffer using placement new
        for (size_t i = 0; i < sz; i++) {
            ::new (static_cast<void*>(&new_buffer[i])) T(std::move(buffer[i]));
            buffer[i].~T(); // Destroy old element
        }

        // 3. Free old raw memory
        ::operator delete(buffer);
        buffer = new_buffer;
        cap = new_cap;
    }

public:
    Vector() : buffer(nullptr), sz(0), cap(0) {}

    ~Vector() {
        for (size_t i = 0; i < sz; i++) {
            buffer[i].~T(); // Explicit destructor
        }
        ::operator delete(buffer);
    }

    template <typename... Args>
    void emplace_back(Args&&... args) {
        if (sz >= cap) {
            reallocate(cap == 0 ? 2 : cap * 2);
        }
        // Construct directly in place with forwarded arguments
        ::new (static_cast<void*>(&buffer[sz])) T(std::forward<Args>(args)...);
        sz++;
    }

    size_t size() const { return sz; }
};
\`\`\``,
              notebookCheckpoints: [
                'Use ::operator new to avoid default construction',
                'Use placement new: ::new (...) T(...)',
                'Use explicit destructor: buffer[i].~T()',
                'Perfect forwarding with std::forward<Args>'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-102-CPP-S2',
      title: 'C++ Modern Standards, STL & Concurrency Examination Paper',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-102-CPP',
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
              id: 'cpp-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Static Cast vs Dynamic Cast',
              question: 'Under what specific condition will `dynamic_cast<Derived*>(base_ptr)` return `nullptr` at runtime?',
              markingBreakdown: ['Returns nullptr when base_ptr does not point to a Derived instance: 1 Mark'],
              modelSolution: '`dynamic_cast` returns `nullptr` when downcasting a base pointer if the actual runtime object being pointed to is not an instance of the target `Derived` class (or if the Base class lacks polymorphic virtual functions).',
              notebookCheckpoints: ['Returns nullptr on invalid downcast', 'Requires polymorphic base (virtual)']
            },
            {
              id: 'cpp-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Lambda Capture Modes',
              question: 'Explain the difference between lambda capture clauses `[=]` and `[&]`.',
              markingBreakdown: ['Capture by value vs capture by reference: 1 Mark'],
              modelSolution: '`[=]` captures all outer local variables by copy/value (read-only by default). `[&]` captures all outer local variables by reference (can modify original variables).',
              notebookCheckpoints: ['[=] by value', '[&] by reference']
            },
            {
              id: 'cpp-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'noexcept Specifier',
              question: 'Why is it critical to mark Move Constructors `noexcept` for standard containers like `std::vector` to use them during reallocation?',
              markingBreakdown: ['Strong exception guarantee requirement: 1 Mark'],
              modelSolution: 'To maintain the "Strong Exception Guarantee", `std::vector` checks `std::is_nothrow_move_constructible`. If a move constructor is not marked `noexcept`, `vector` falls back to slow copying to avoid leaving memory corrupted if an exception is thrown mid-move.',
              notebookCheckpoints: ['Strong Exception Guarantee', 'Prevents fallback to copy']
            },
            {
              id: 'cpp-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'C++17 string_view',
              question: 'What is the primary performance benefit of `std::string_view` over `const std::string&` when passing string slices?',
              markingBreakdown: ['Zero heap allocations for substring views: 1 Mark'],
              modelSolution: '`std::string_view` is a non-owning 16-byte pointer + length pair. Passing substrings or string literals into a function taking `std::string_view` requires zero dynamic heap allocations, whereas `std::string` allocates heap memory.',
              notebookCheckpoints: ['Non-owning pointer + length', 'Zero heap allocations']
            },
            {
              id: 'cpp-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Pure Virtual Functions',
              question: 'Write the syntax for declaring a pure virtual function named `serialize` in an Abstract Base Class.',
              markingBreakdown: ['virtual void serialize() = 0;: 1 Mark'],
              modelSolution: '`virtual void serialize() = 0;` (the `= 0` specifier turns a virtual member function into a pure virtual function, making the enclosing class abstract).',
              notebookCheckpoints: ['virtual void serialize() = 0;']
            },
            {
              id: 'cpp-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'std::optional',
              question: 'How does C++17 `std::optional<T>` replace sentinel values (like -1 or NULL) for functions that may fail to produce a result?',
              markingBreakdown: ['Explicit presence/absence semantics without heap allocation: 1 Mark'],
              modelSolution: '`std::optional<T>` manages an internal value of type `T` plus a boolean presence flag on the stack with zero heap allocation, returning `std::nullopt` explicitly when no value is present.',
              notebookCheckpoints: ['Returns std::nullopt on failure', 'Stack allocated']
            },
            {
              id: 'cpp-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Copy Elision & RVO',
              question: 'What does "Return Value Optimization" (RVO) accomplish in C++17 compilers?',
              markingBreakdown: ['Constructs return value directly in caller storage space: 1 Mark'],
              modelSolution: 'RVO is a compiler optimization where the return value of a function is constructed directly in the memory storage of the caller, completely eliminating both copy and move constructor invocations.',
              notebookCheckpoints: ['Zero copies/moves', 'Direct caller-space construction']
            },
            {
              id: 'cpp-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'std::lock_guard vs std::unique_lock',
              question: 'Give one capability that `std::unique_lock` possesses that lightweight `std::lock_guard` does not.',
              markingBreakdown: ['Manual unlock/relock, deferred locking, or condition variable support: 1 Mark'],
              modelSolution: '`std::unique_lock` can be explicitly unlocked and relocked manually, supports deferred locking, and can be used with `std::condition_variable`, whereas `std::lock_guard` is strictly scoped.',
              notebookCheckpoints: ['Manual unlock/relock', 'Supports condition_variable']
            },
            {
              id: 'cpp-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Defaulted and Deleted Functions',
              question: 'Write the syntax to explicitly disable the copy constructor for class `NonCopyable`.',
              markingBreakdown: ['NonCopyable(const NonCopyable&) = delete;: 1 Mark'],
              modelSolution: '`NonCopyable(const NonCopyable&) = delete;`',
              notebookCheckpoints: ['= delete syntax']
            },
            {
              id: 'cpp-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'C++ Structured Binding',
              question: 'In C++17, what does structured binding syntax `auto [id, name, score] = student_tuple;` do?',
              markingBreakdown: ['Unpacks tuple/pair/struct members into named local variables: 1 Mark'],
              modelSolution: 'It unpacks the elements of a tuple, pair, array, or struct directly into distinct named local identifiers in a single statement.',
              notebookCheckpoints: ['Unpacks elements into named variables']
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
              id: 'cpp-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Diamond Inheritance Problem & Virtual Base Classes',
              question: 'Illustrate the classic C++ "Diamond Problem" with classes `Device`, `Scanner`, `Printer`, and `Copier`.\n(a) Explain why multiple instances of `Device` members exist inside `Copier` without `virtual` inheritance.\n(b) Write the class declaration code using `virtual public Device` that resolves ambiguity and ensures a single shared instance of `Device`.',
              markingBreakdown: [
                'Diamond problem hierarchy diagram & ambiguity explanation: 2.5 Marks',
                'Virtual base class syntax resolution: 2.5 Marks'
              ],
              modelSolution: `Diamond Hierarchy:
      Device
     /      \\
Scanner    Printer
     \\      /
      Copier

Without virtual inheritance, Copier inherits two separate copies of Device—one through Scanner and one through Printer. Accessing \`copier.deviceId\` triggers a compile error: "reference to deviceId is ambiguous".

Solution:
\`\`\`cpp
class Device { public: int deviceId; };
class Scanner : virtual public Device {};
class Printer : virtual public Device {};
class Copier : public Scanner, public Printer {}; // Exactly one shared Device instance!
\`\`\``,
              notebookCheckpoints: [
                'Draw diamond diagram',
                'Explain ambiguous member access',
                'virtual public Device syntax'
              ]
            },
            {
              id: 'cpp-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Exception Safety: Copy-and-Swap Idiom',
              question: 'Explain why the "Copy-and-Swap" idiom provides the Strong Exception Guarantee for assignment operators. Write a complete C++ assignment operator `operator=` for class `Widget` using `std::swap`.',
              markingBreakdown: [
                'Strong Exception Guarantee explanation: 2 Marks',
                'Copy-and-swap implementation passing by value: 3 Marks'
              ],
              modelSolution: `The Copy-and-Swap idiom guarantees that if an exception occurs during memory allocation, the original object remains completely unmodified (Strong Exception Guarantee).

\`\`\`cpp
#include <utility>

class Widget {
private:
    int *data;
    size_t size;
public:
    Widget(size_t s = 0) : size(s), data(s ? new int[s] : nullptr) {}
    ~Widget() { delete[] data; }

    Widget(const Widget &other) : size(other.size), data(other.size ? new int[other.size] : nullptr) {
        for (size_t i = 0; i < size; i++) data[i] = other.data[i];
    }

    // Friend swap
    friend void swap(Widget &first, Widget &second) noexcept {
        using std::swap;
        swap(first.data, second.data);
        swap(first.size, second.size);
    }

    // Pass by value invokes copy constructor!
    Widget& operator=(Widget other) noexcept {
        swap(*this, other);
        return *this;
    } // other goes out of scope and frees our old memory!
};
\`\`\``,
              notebookCheckpoints: [
                'Pass other by value',
                'friend void swap function',
                'Strong Exception Guarantee guarantee'
              ]
            },
            {
              id: 'cpp-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Multi-threading: Thread Join & Exception Safety',
              question: 'Explain what happens if a `std::thread` is destroyed while still joinable. Write an RAII wrapper `class ScopedThread` that ensures the enclosed thread is joined before destruction, even if an exception is thrown.',
              markingBreakdown: [
                'std::terminate() explanation: 2 Marks',
                'ScopedThread RAII implementation: 3 Marks'
              ],
              modelSolution: `If a \`std::thread\` object is destroyed while still joinable (\`t.joinable() == true\`), its destructor calls \`std::terminate()\`, immediately crashing the entire process.

\`\`\`cpp
#include <thread>
#include <stdexcept>

class ScopedThread {
private:
    std::thread t;
public:
    explicit ScopedThread(std::thread t_) : t(std::move(t_)) {
        if (!t.joinable()) throw std::logic_error("Thread not joinable");
    }

    ~ScopedThread() {
        if (t.joinable()) {
            t.join(); // Always safe RAII join on stack unwinding
        }
    }

    ScopedThread(const ScopedThread&) = delete;
    ScopedThread& operator=(const ScopedThread&) = delete;
};
\`\`\``,
              notebookCheckpoints: [
                'Destruction of joinable thread invokes std::terminate()',
                'Join in destructor before exit'
              ]
            },
            {
              id: 'cpp-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Modern STL Algorithms: `std::transform` & Lambda',
              question: 'Given `std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};`, write modern C++ STL code using algorithms (without raw loops) to:\n(a) Filter out all odd numbers into a new vector using `std::copy_if`.\n(b) Square every element in that vector in-place using `std::transform` and a lambda expression.',
              markingBreakdown: [
                'std::copy_if with back_inserter: 2.5 Marks',
                'std::transform in-place squaring: 2.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <vector>
#include <algorithm>
#include <iterator>

void process_numbers() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};
    std::vector<int> evens;

    // (a) Filter even numbers
    std::copy_if(nums.begin(), nums.end(), std::back_inserter(evens), [](int x) {
        return x % 2 == 0;
    });

    // (b) Square in place
    std::transform(evens.begin(), evens.end(), evens.begin(), [](int x) {
        return x * x;
    });
}
\`\`\``,
              notebookCheckpoints: [
                'std::back_inserter usage',
                'Lambda expressions [](int x) { ... }'
              ]
            },
            {
              id: 'cpp-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'CRTP (Curiously Recurring Template Pattern)',
              question: 'Explain what CRTP (Curiously Recurring Template Pattern) is in C++. Write code demonstrating how CRTP achieves Static Polymorphism at compile-time without the runtime overhead of vtables.',
              markingBreakdown: [
                'CRTP definition and syntax Base<Derived>: 2 Marks',
                'Static polymorphism implementation: 3 Marks'
              ],
              modelSolution: `CRTP is an idiom where a derived class inherits from a base class template instantiated with the derived class itself: \`class Derived : public Base<Derived>\`.

\`\`\`cpp
#include <iostream>

template <typename Derived>
class Shape {
public:
    void draw() {
        // Compile-time static dispatch via static_cast!
        static_cast<Derived*>(this)->draw_impl();
    }
};

class Circle : public Shape<Circle> {
public:
    void draw_impl() { std::cout << "Drawing Circle\\n"; }
};

template <typename T>
void render(Shape<T> &s) {
    s.draw(); // Inlined by compiler with ZERO vtable overhead!
}
\`\`\``,
              notebookCheckpoints: [
                'class Derived : public Base<Derived>',
                'static_cast<Derived*>(this)->draw_impl()',
                'Zero vtable runtime overhead'
              ]
            },
            {
              id: 'cpp-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Constexpr Algorithms',
              question: 'Write a C++ `constexpr` function `constexpr unsigned long long factorial(unsigned int n)` that computes factorials at compile-time. Demonstrate in a test snippet that the value is used to declare the size of a raw C-style array.',
              markingBreakdown: [
                'constexpr factorial implementation: 3 Marks',
                'Verification as compile-time array bound: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
constexpr unsigned long long factorial(unsigned int n) {
    unsigned long long result = 1;
    for (unsigned int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    // Computed during compilation: 5! = 120
    constexpr unsigned long long size = factorial(5);
    int compile_time_array[size]; // Valid compile-time bound
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'constexpr function qualifier',
                'Usage as array size: int arr[factorial(5)]'
              ]
            },
            {
              id: 'cpp-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Future and Promise Concurrency',
              question: 'In C++ concurrency, explain how `std::promise` and `std::future` form a one-way communication channel between threads. Write a short program where a worker thread sets a computed value in a promise, and the main thread retrieves it with `.get()`.',
              markingBreakdown: [
                'Channel explanation: 2 Marks',
                'std::promise and std::future implementation: 3 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <thread>
#include <future>

void compute_task(std::promise<int> prom) {
    // Heavy computation simulation
    int result = 42 * 10;
    prom.set_value(result); // Fulfill promise
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(compute_task, std::move(prom));

    // Blocks until worker calls set_value()
    int answer = fut.get();
    std::cout << "Received: " << answer << "\\n";

    t.join();
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'prom.get_future() and fut.get()',
                'Move promise into thread'
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
              id: 'cpp-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Concurrent Data Structures: Lock-Free Single Producer Single Consumer (SPSC) Queue',
              question: 'Design and implement a Lock-Free Ring Buffer (SPSC Queue) in C++11 for low-latency audio or financial telemetry:\n(a) Ring buffer of fixed power-of-two capacity `N`.\n(b) Atomic head and tail pointers using `std::atomic<size_t>` and appropriate memory orders (`std::memory_order_acquire`, `std::memory_order_release`).\n(c) `bool push(const T &item)` that never blocks.\n(d) `bool pop(T &out_item)` that never blocks.\n(e) Explain why no mutex or kernel locks are needed in this Single-Producer Single-Consumer design.',
              markingBreakdown: [
                'Atomic head/tail and storage buffer: 2.5 Marks',
                'Lock-free push with memory_order_release: 3 Marks',
                'Lock-free pop with memory_order_acquire: 3 Marks',
                'Memory ordering correctness proof: 1.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <atomic>
#include <cstddef>
#include <utility>

template <typename T, size_t Capacity = 1024>
class LockFreeSPSCQueue {
private:
    T buffer[Capacity];
    alignas(64) std::atomic<size_t> tail{0}; // Written by Producer
    alignas(64) std::atomic<size_t> head{0}; // Written by Consumer

public:
    bool push(const T &item) {
        size_t current_tail = tail.load(std::memory_order_relaxed);
        size_t current_head = head.load(std::memory_order_acquire);

        if ((current_tail + 1) % Capacity == current_head) {
            return false; // Queue full
        }

        buffer[current_tail] = item;
        // Release store guarantees buffer write is visible before tail increments
        tail.store((current_tail + 1) % Capacity, std::memory_order_release);
        return true;
    }

    bool pop(T &out_item) {
        size_t current_head = head.load(std::memory_order_relaxed);
        size_t current_tail = tail.load(std::memory_order_acquire);

        if (current_head == current_tail) {
            return false; // Queue empty
        }

        out_item = buffer[current_head];
        // Release store guarantees item read before head increments
        head.store((current_head + 1) % Capacity, std::memory_order_release);
        return true;
    }
};
\`\`\`
Why Mutex-Free:
The Producer exclusively writes to \`tail\` and only reads \`head\`.
The Consumer exclusively writes to \`head\` and only reads \`tail\`.
Hardware cache coherency protocols (MESI) coupled with acquire/release memory barriers guarantee that writes to the buffer happen-before the counter updates become visible, eliminating data races without OS context switches.`,
              notebookCheckpoints: [
                'alignas(64) to prevent false sharing cache line contention',
                'std::memory_order_release on writes',
                'std::memory_order_acquire on reads'
              ]
            },
            {
              id: 'cpp-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Custom Allocators: Arena Allocator conforming to C++ Standard',
              question: 'Construct a linear Arena (Monotonic) Memory Allocator in C++:\n(a) Allocate a contiguous chunk of $4\\text{ MB}$ raw memory.\n(b) Implement `allocate(size_t bytes, size_t alignment = alignof(std::max_align_t))` with proper hardware address alignment calculation.\n(c) Implement `reset()` which frees all allocations simultaneously in $O(1)$ time by rewinding the allocation offset.\n(d) Write performance benchmarks comparing 100,000 small allocations using `ArenaAllocator` versus global `new`/`delete`.',
              markingBreakdown: [
                'Arena class and pre-allocated buffer: 2.5 Marks',
                'Alignment math (padding calculations): 3.5 Marks',
                'O(1) reset function: 2 Marks',
                'Performance comparison and benchmark logic: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <cstdint>
#include <cstddef>
#include <new>

class ArenaAllocator {
private:
    char *buffer;
    size_t capacity;
    size_t offset;

public:
    ArenaAllocator(size_t cap) : capacity(cap), offset(0) {
        buffer = new char[capacity];
    }

    ~ArenaAllocator() { delete[] buffer; }

    void* allocate(size_t bytes, size_t alignment = alignof(std::max_align_t)) {
        uintptr_t current_addr = reinterpret_cast<uintptr_t>(buffer + offset);
        // Calculate forward alignment padding
        size_t padding = (alignment - (current_addr % alignment)) % alignment;

        if (offset + padding + bytes > capacity) {
            throw std::bad_alloc();
        }

        offset += padding;
        void *ptr = buffer + offset;
        offset += bytes;
        return ptr;
    }

    // Instant O(1) deallocation of entire arena
    void reset() noexcept {
        offset = 0;
    }
};
\`\`\`
Performance:
Standard \`new\` involves searching heap metadata trees and mutex locking. Arena allocation is merely an integer addition \`offset += bytes\` (1 CPU instruction), executing up to 50x faster with zero memory fragmentation.`,
              notebookCheckpoints: [
                'Alignment formula: (alignment - (addr % alignment)) % alignment',
                'Instant reset: offset = 0',
                'Explain why it is 50x faster than malloc'
              ]
            },
            {
              id: 'cpp-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Asynchronous Thread Pool Engine',
              question: 'Implement a complete Work-Stealing/Worker Thread Pool in C++14/17:\n(a) `ThreadPool(size_t num_threads)` launching persistent worker threads.\n(b) `template <typename F, typename... Args> auto enqueue(F&& f, Args&&... args) -> std::future<...>`\n(c) Maintain a synchronized task queue guarded by `std::mutex` and `std::condition_variable`.\n(d) Graceful shutdown in the destructor ensuring all queued jobs complete before thread joining.',
              markingBreakdown: [
                'Worker thread initialization and loop: 3 Marks',
                'enqueue returning std::future with packaged_task: 4 Marks',
                'Destructor with stop flag and join all: 3 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <vector>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <future>
#include <functional>

class ThreadPool {
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queue_mutex;
    std::condition_variable cv;
    bool stop = false;

public:
    ThreadPool(size_t threads) {
        for (size_t i = 0; i < threads; ++i) {
            workers.emplace_back([this]() {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(this->queue_mutex);
                        this->cv.wait(lock, [this]() {
                            return this->stop || !this->tasks.empty();
                        });
                        if (this->stop && this->tasks.empty()) return;
                        task = std::move(this->tasks.front());
                        this->tasks.pop();
                    }
                    task();
                }
            });
        }
    }

    template<class F, class... Args>
    auto enqueue(F&& f, Args&&... args) 
        -> std::future<typename std::result_of<F(Args...)>::type> {
        using return_type = typename std::result_of<F(Args...)>::type;

        auto task = std::make_shared<std::packaged_task<return_type()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );

        std::future<return_type> res = task->get_future();
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            if (stop) throw std::runtime_error("enqueue on stopped ThreadPool");
            tasks.emplace([task]() { (*task)(); });
        }
        cv.notify_one();
        return res;
    }

    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        cv.notify_all();
        for (std::thread &worker : workers) {
            if (worker.joinable()) worker.join();
        }
    }
};
\`\`\``,
              notebookCheckpoints: [
                'std::packaged_task wrapper',
                'enqueue returns std::future',
                'Clean destructor loop with notify_all and join'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-102-CPP-S3',
      title: 'Advanced C++20 Systems Architecture & Metaprogramming Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-102-CPP',
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
              id: 'cpp-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Three-Way Comparison (<=>)',
              question: 'What is the C++20 "Spaceship Operator" (`<=>`), and what does `auto operator<=>(const T&) const = default;` generate automatically?',
              markingBreakdown: ['Generates all 6 relational comparison operators: 1 Mark'],
              modelSolution: 'The spaceship operator (`<=>`) performs three-way comparison. Defaulting it (`= default`) automatically synthesizes all 6 relational operators (`<`, `<=`, `>`, `>=`, `==`, `!=`).',
              notebookCheckpoints: ['Generates all 6 comparison operators']
            },
            {
              id: 'cpp-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Coroutines (co_await, co_yield)',
              question: 'In C++20, what distinguishes a Coroutine function from a regular function?',
              markingBreakdown: ['Contains co_await, co_yield, or co_return: 1 Mark'],
              modelSolution: 'A coroutine can suspend execution and resume later without blocking the thread. It is identified by containing `co_await`, `co_yield`, or `co_return`.',
              notebookCheckpoints: ['co_await, co_yield, co_return']
            },
            {
              id: 'cpp-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Modules (import vs #include)',
              question: 'State one significant compiler advantage of C++20 Modules (`import std;`) over `#include` directives.',
              markingBreakdown: ['Compiled once into binary AST, no macro leakage: 1 Mark'],
              modelSolution: 'Modules are compiled once into an optimized binary interface, speeding up compilation by up to 10x, and they do not leak preprocessor macros across file boundaries.',
              notebookCheckpoints: ['Faster compilation', 'No macro leakage']
            },
            {
              id: 'cpp-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Concepts & Requires Clause',
              question: 'Write the syntax for a C++20 Concept named `Numeric` that constrains type `T` to integral or floating-point types.',
              markingBreakdown: ['template <typename T> concept Numeric = ...: 1 Mark'],
              modelSolution: '`template <typename T> concept Numeric = std::is_integral_v<T> || std::is_floating_point_v<T>;`',
              notebookCheckpoints: ['concept Numeric = ...']
            },
            {
              id: 'cpp-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'consteval Specifier',
              question: 'How does `consteval` differ from `constexpr` in C++20?',
              markingBreakdown: ['consteval MUST evaluate at compile time (immediate function): 1 Mark'],
              modelSolution: 'A `constexpr` function can be evaluated at compile-time OR runtime depending on arguments. A `consteval` function is an "immediate function" that MUST evaluate at compile-time; runtime calls cause a compile error.',
              notebookCheckpoints: ['consteval must execute at compile time']
            },
            {
              id: 'cpp-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'std::span',
              question: 'What is `std::span` in C++20, and how does it prevent array decay when passing contiguous buffers?',
              markingBreakdown: ['Non-owning view of contiguous sequence with size info: 1 Mark'],
              modelSolution: '`std::span` is a lightweight, non-owning view over contiguous memory (arrays, vectors) that bundles both pointer and length, avoiding pointer-decay and out-of-bounds indexing bugs.',
              notebookCheckpoints: ['Non-owning view with size bounds']
            },
            {
              id: 'cpp-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'C++20 Ranges & Views',
              question: 'What is the key performance feature of range views in C++20 (e.g. `nums | std::views::filter(...)`)?',
              markingBreakdown: ['Lazy evaluation without intermediate memory copies: 1 Mark'],
              modelSolution: 'Range views use lazy evaluation: elements are transformed or filtered on-the-fly during iteration without allocating intermediate container memory.',
              notebookCheckpoints: ['Lazy on-demand evaluation']
            },
            {
              id: 'cpp-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'std::atomic_ref',
              question: 'What does C++20 `std::atomic_ref<T>` allow you to do with ordinary non-atomic variables?',
              markingBreakdown: ['Apply atomic operations to non-atomic object temporarily: 1 Mark'],
              modelSolution: '`std::atomic_ref` allows performing atomic operations (load, store, CAS) on a standard non-atomic variable without changing the variable\'s underlying type or layout.',
              notebookCheckpoints: ['Atomic operations on standard variables']
            },
            {
              id: 'cpp-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'std::jthread',
              question: 'How does C++20 `std::jthread` improve on `std::thread` regarding joining and cancellation?',
              markingBreakdown: ['Auto-joins in destructor and supports cooperative cancellation with stop_token: 1 Mark'],
              modelSolution: '`std::jthread` automatically calls `join()` in its destructor (preventing crashes) and includes built-in cooperative cancellation support via `std::stop_token`.',
              notebookCheckpoints: ['Auto-joins in destructor', 'Built-in stop_token']
            },
            {
              id: 'cpp-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Designated Initializers',
              question: 'Write the C++20 designated initializer syntax to instantiate `struct Point { int x; int y; };` with `x=10` and `y=20`.',
              markingBreakdown: ['Point p = {.x = 10, .y = 20};: 1 Mark'],
              modelSolution: '`Point p = {.x = 10, .y = 20};` (members must be specified in the exact declaration order).',
              notebookCheckpoints: ['Point p = {.x = 10, .y = 20};']
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
              id: 'cpp-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'C++20 Concepts: Constraining Generic Functions',
              question: 'Define a custom Concept `Sortable<T>` that requires a container `T` to have `.begin()`, `.end()`, and `.size()`. Write a generic function `void sort_container(T &c)` constrained by this concept.',
              markingBreakdown: [
                'Concept definition with requires expression: 3 Marks',
                'Constrained function implementation: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <concepts>
#include <algorithm>

template <typename T>
concept Sortable = requires(T a) {
    { a.begin() } -> std::random_access_iterator;
    { a.end() } -> std::random_access_iterator;
    { a.size() } -> std::convertible_to<std::size_t>;
};

template <Sortable T>
void sort_container(T &c) {
    std::sort(c.begin(), c.end());
}
\`\`\``,
              notebookCheckpoints: [
                'concept Sortable = requires(T a) { ... }',
                'template <Sortable T> void sort_container'
              ]
            },
            {
              id: 'cpp-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Custom Coroutine Generator',
              question: 'Explain how C++20 coroutines yield values to callers. Implement a custom generator `Generator<int> range(int start, int end)` that produces integers using `co_yield`.',
              markingBreakdown: [
                'Promise type and coroutine handle explanation: 2.5 Marks',
                'co_yield range function: 2.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <coroutine>
#include <iostream>

// Coroutine generator yields values lazily on demand
template <typename T>
struct Generator {
    struct promise_type {
        T current_value;
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> h;
    ~Generator() { if (h) h.destroy(); }
};

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i; // Suspends coroutine and returns value to caller
    }
}
\`\`\``,
              notebookCheckpoints: [
                'promise_type definition',
                'co_yield i statement'
              ]
            },
            {
              id: 'cpp-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Ranges Pipeline Composition',
              question: 'Using C++20 `<ranges>`, write a pipeline expression on `std::vector<int> nums` that:\n1. Filters numbers greater than 10.\n2. Multiplies them by 3.\n3. Takes the first 4 elements.\nPrint the result without allocating intermediate collections.',
              markingBreakdown: [
                'Pipeline syntax using pipe operator |: 3 Marks',
                'std::views::filter, transform, take usage: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> nums = {5, 12, 8, 15, 20, 3, 25, 30};

    auto pipeline = nums 
                  | std::views::filter([](int n) { return n > 10; })
                  | std::views::transform([](int n) { return n * 3; })
                  | std::views::take(4);

    for (int val : pipeline) {
        std::cout << val << " "; // 36, 45, 60, 75
    }
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'Pipe operator | composition',
                'std::views::filter, transform, take'
              ]
            },
            {
              id: 'cpp-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Modern Error Handling: `std::expected`',
              question: 'In C++23, `std::expected<T, E>` provides monadic error handling without exceptions. Write a function `std::expected<double, std::string> divide(double a, double b)` that returns division result or an error string on divide-by-zero, and demonstrate how the caller handles it.',
              markingBreakdown: [
                'std::expected signature and divide logic: 2.5 Marks',
                'Caller handling with .has_value() or std::unexpected: 2.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <expected>
#include <string>

std::expected<double, std::string> divide(double a, double b) {
    if (b == 0.0) {
        return std::unexpected("Division by zero error");
    }
    return a / b;
}

int main() {
    auto res = divide(10.0, 0.0);
    if (res.has_value()) {
        std::cout << "Result: " << *res << "\\n";
    } else {
        std::cout << "Error: " << res.error() << "\\n";
    }
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'return std::unexpected(...)',
                'res.has_value() check'
              ]
            },
            {
              id: 'cpp-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Non-Type Template Parameters (NTTP) in C++20',
              question: 'Explain what Non-Type Template Parameters (NTTP) are. In C++20, how can floating-point numbers or string literals be passed as template arguments? Provide a working code example.',
              markingBreakdown: [
                'NTTP explanation: 2 Marks',
                'C++20 string literal or float template example: 3 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>

// C++20 allows literal class types as template parameters
template <size_t N>
struct FixedString {
    char buf[N];
    constexpr FixedString(const char (&str)[N]) {
        for (size_t i = 0; i < N; ++i) buf[i] = str[i];
    }
};

template <FixedString Str>
void log_tag() {
    std::cout << "Tag: " << Str.buf << "\\n";
}

int main() {
    log_tag<"DATABASE_ENGINE">(); // String literal as template parameter!
    return 0;
}
\`\`\``,
              notebookCheckpoints: [
                'FixedString wrapper with constexpr constructor',
                'Passing "DATABASE_ENGINE" in angle brackets'
              ]
            },
            {
              id: 'cpp-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'C++20 std::barrier and std::latch',
              question: 'Differentiate between `std::latch` and `std::barrier` in C++20. Write a short snippet where 4 threads synchronize at a barrier before starting Phase 2 of a concurrent computation.',
              markingBreakdown: [
                'Latch (one-time) vs Barrier (reusable) comparison: 2 Marks',
                'std::barrier synchronization code: 3 Marks'
              ],
              modelSolution: `A \`std::latch\` is a single-use countdown counter: once it hits zero, it remains open.
A \`std::barrier\` is reusable: once all threads arrive, an optional phase-completion callback executes, and the barrier resets for the next cycle.

\`\`\`cpp
#include <barrier>
#include <thread>
#include <vector>

std::barrier sync_point(4); // 4 threads

void worker() {
    // Phase 1 Work
    sync_point.arrive_and_wait(); // Blocks until all 4 arrive
    // Phase 2 Work starts simultaneously
}
\`\`\``,
              notebookCheckpoints: [
                'Latch is single-use, barrier is cyclic/reusable',
                'sync_point.arrive_and_wait()'
              ]
            },
            {
              id: 'cpp-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Bit Manipulation Header (`<bit>`)',
              question: 'Using C++20 `<bit>`, demonstrate:\n(a) `std::popcount` for counting set bits.\n(b) `std::has_single_bit` for checking powers of 2.\n(c) `std::bit_cast` for safe type reinterpretation without undefined behavior.',
              markingBreakdown: [
                'popcount and has_single_bit usage: 2.5 Marks',
                'std::bit_cast vs reinterpret_cast: 2.5 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <bit>
#include <cstdint>

void demo() {
    uint32_t val = 16;
    bool is_pow2 = std::has_single_bit(val); // true
    int ones = std::popcount(val);            // 1

    float f = 1.0f;
    // std::bit_cast reinterprets bit representation without violating strict aliasing
    uint32_t bits = std::bit_cast<uint32_t>(f);
}
\`\`\``,
              notebookCheckpoints: [
                'std::popcount and std::has_single_bit',
                'std::bit_cast prevents strict aliasing violations'
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
              id: 'cpp-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Design Pattern: High-Performance Entity-Component-System (ECS) Architecture',
              question: 'In game engines and simulations, Entity-Component-System (ECS) replaces traditional OOP inheritance with data-oriented cache-friendly arrays.\n(a) Explain why deep polymorphic inheritance (e.g. `GameObject` -> `Character` -> `Player`) causes CPU cache misses.\n(b) Implement a compact C++ Component Registry using C++20 type IDs where entities are simple IDs (`uint32_t`) and components (e.g. `Position`, `Velocity`) are stored in contiguous contiguous vectors.\n(c) Write a `MovementSystem::update(float dt)` that iterates over matched components with maximum CPU L1 cache locality.\n(d) Calculate the memory bandwidth savings of ECS versus array-of-pointers OOP.',
              markingBreakdown: [
                'OOP cache-miss analysis (vptr dereferencing and heap pointer chasing): 2.5 Marks',
                'Data-oriented contiguous Component arrays: 3.5 Marks',
                'MovementSystem iteration logic: 2 Marks',
                'Memory layout & bandwidth comparison: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <vector>
#include <cstdint>

struct Position { float x, y; };
struct Velocity { float vx, vy; };

// High-speed Data-Oriented Component Storage
class ECSCoordinator {
public:
    std::vector<Position> positions;
    std::vector<Velocity> velocities;
    std::vector<uint32_t> entities;

    uint32_t create_entity(float x, float y, float vx, float vy) {
        uint32_t id = static_cast<uint32_t>(entities.size());
        entities.push_back(id);
        positions.push_back({x, y});
        velocities.push_back({vx, vy});
        return id;
    }
};

class MovementSystem {
public:
    static void update(ECSCoordinator &ecs, float dt) {
        size_t n = ecs.positions.size();
        // Contiguous memory stream: Hardware prefetcher loads entire cache lines effortlessly
        for (size_t i = 0; i < n; i++) {
            ecs.positions[i].x += ecs.velocities[i].vx * dt;
            ecs.positions[i].y += ecs.velocities[i].vy * dt;
        }
    }
};
\`\`\`
Bandwidth Advantage:
In OOP (\`vector<GameObject*>\`), each object is an isolated heap pointer. Processing 10,000 objects involves 10,000 pointer dereferences with random DRAM jumps (cache misses take ~200 CPU cycles each).
In ECS, Position structures are packed contiguously: an entire 64-byte CPU cache line holds 8 positions at once, giving 95%+ L1 cache hits.`,
              notebookCheckpoints: [
                'Contiguous array storage for components',
                'Explain CPU L1 cache line prefetching',
                'Compare against OOP pointer chasing'
              ]
            },
            {
              id: 'cpp-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Systems Programming: Memory-Mapped IPC Ring Buffer',
              question: 'Construct a cross-process Shared Memory Ring Buffer in C++20:\n(a) Map a POSIX shared memory file into the process virtual address space.\n(b) Place an atomic header directly inside the shared memory block.\n(c) Implement a zero-copy writer that writes telemetry frames.\n(d) Explain how memory fences (`std::atomic_thread_fence`) prevent processor out-of-order store reordering across separate CPU cores.',
              markingBreakdown: [
                'Memory mapping logic: 2.5 Marks',
                'Shared memory layout and atomic coordination: 3.5 Marks',
                'Zero-copy framing: 2 Marks',
                'Memory barrier and processor reordering analysis: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <atomic>
#include <cstring>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

struct SharedHeader {
    std::atomic<uint32_t> write_seq{0};
    std::atomic<uint32_t> read_seq{0};
    uint32_t capacity{1024};
};

class SharedMemoryChannel {
private:
    int fd;
    char *mapped_region;
    SharedHeader *header;
    char *data_buffer;
    size_t total_size;

public:
    SharedMemoryChannel(const char *name, size_t data_size) {
        total_size = sizeof(SharedHeader) + data_size;
        fd = shm_open(name, O_CREAT | O_RDWR, 0666);
        ftruncate(fd, total_size);
        mapped_region = static_cast<char*>(mmap(nullptr, total_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0));

        header = reinterpret_cast<SharedHeader*>(mapped_region);
        data_buffer = mapped_region + sizeof(SharedHeader);
    }

    ~SharedMemoryChannel() {
        munmap(mapped_region, total_size);
        close(fd);
    }
};
\`\`\`
Fences and Out-of-Order Execution:
Modern superscalar CPUs speculatively reorder store instructions to optimize pipeline throughput. Without an atomic release fence (\`std::atomic_thread_fence(std::memory_order_release)\`), the sequence counter increment could become visible to another core before the actual message data has flushed from the store buffer into L3 cache, causing reader cores to read garbage.`,
              notebookCheckpoints: [
                'shm_open and mmap sequence',
                'SharedHeader placed at offset 0',
                'Explain hardware store buffer reordering'
              ]
            },
            {
              id: 'cpp-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Template Metaprogramming: Compile-Time JSON / Reflection Engine',
              question: 'Design a compile-time static reflection serialization mechanism in modern C++:\n(a) Implement a variadic macro or tuple-based introspection registration pattern for arbitrary structs.\n(b) Write a generic serializer `to_json(const T &obj)` that emits valid JSON strings.\n(c) Demonstrate compile-time verification of field names using string literals.\n(d) Contrast compile-time reflection with runtime Java/C# reflection regarding binary size and runtime CPU speed.',
              markingBreakdown: [
                'Introspection tuple binding: 3 Marks',
                'Generic to_json serializer implementation: 3.5 Marks',
                'Field name verification: 1.5 Marks',
                'Comparison with Java/C# runtime reflection: 2 Marks'
              ],
              modelSolution: `\`\`\`cpp
#include <iostream>
#include <tuple>
#include <string>

// Field descriptor
template <typename Class, typename T>
struct Field {
    const char *name;
    T Class::*member;
};

#define REGISTER_FIELDS(Type, ...) \\
    static auto get_fields() { return std::make_tuple(__VA_ARGS__); }

struct User {
    std::string name;
    int age;
    REGISTER_FIELDS(User, Field<User, std::string>{"name", &User::name}, Field<User, int>{"age", &User::age})
};

template <typename T>
std::string to_json(const T &obj) {
    std::string json = "{";
    auto fields = T::get_fields();
    std::apply([&](auto&&... f) {
        size_t idx = 0;
        auto serialize_field = [&](auto field) {
            if (idx++ > 0) json += ", ";
            json += "\\"" + std::string(field.name) + "\\": ";
            // Overload streaming
            json += "\\"" + std::to_string(obj.*(field.member)) + "\\"";
        };
        (serialize_field(f), ...); // Fold expression!
    }, fields);
    json += "}";
    return json;
}
\`\`\`
Comparison:
Java/C# reflection relies on runtime metadata dictionaries and dynamic type queries, causing boxing and instruction pipeline stalls.
C++ static reflection is resolved entirely by the compiler during parsing. The emitted machine code contains zero dictionary lookups and is inlined as direct memory offsets with zero runtime overhead.`,
              notebookCheckpoints: [
                'Member pointer Field<Class, T>',
                'C++17 Fold expression (serialize_field(f), ...)',
                'Zero runtime dictionary lookups'
              ]
            }
          ]
        }
      }
    }
  }
};
