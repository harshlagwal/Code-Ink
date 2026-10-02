import { FinalAssessment } from '../types/notebook';

export const CPP_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'cpp',
  title: 'C++ Programming Comprehensive Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Foundations, Syntax Precision & Core Primitives',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'cpp-a1',
          section: 'A',
          marks: 1,
          topic: 'Standard Namespace',
          question: 'What is the primary architectural purpose of the `std` namespace in standard C++?',
          options: [
            'To accelerate runtime execution on x86 processors',
            'To prevent naming collisions between standard library identifiers and user code',
            'To enable garbage collection in heap memory',
            'To encrypt compiled binary symbols'
          ],
          correctIndex: 1,
          explanation: 'Namespaces in C++ encapsulate declarations into distinct scope boundaries, preventing collisions between user variable/function names and standard library identifiers.'
        },
        {
          id: 'cpp-a2',
          section: 'A',
          marks: 1,
          topic: 'Uniform Initialization',
          question: 'What is the key advantage of uniform brace initialization (`int x{5.5};`) introduced in C++11?',
          options: [
            'It allocates the variable on the dynamic heap',
            'It forbids narrowing conversions and triggers a compile-time error on loss of precision',
            'It converts the number to hexadecimal automatically',
            'It makes the variable volatile'
          ],
          correctIndex: 1,
          explanation: 'Brace initialization `{}` prevents narrowing conversions (such as converting float to int), rejecting implicit truncation at compile time.'
        },
        {
          id: 'cpp-a3',
          section: 'A',
          marks: 1,
          topic: 'I/O Streams',
          question: 'Why is `std::cerr` unbuffered while `std::cout` is buffered by default?',
          options: [
            'std::cerr runs on a separate CPU thread',
            'To ensure critical error and diagnostic output is flushed immediately to screen even if the program crashes',
            'std::cerr only accepts ASCII characters',
            'To save memory on the stack'
          ],
          correctIndex: 1,
          explanation: '`std::cerr` is unbuffered so that diagnostic error messages appear immediately without waiting for a buffer flush, vital when catching crash causes.'
        },
        {
          id: 'cpp-a4',
          section: 'A',
          marks: 1,
          topic: 'Pointers vs References',
          question: 'Which of the following statements about C++ references (`int& ref`) is TRUE?',
          options: [
            'References can be reassigned to point to different variables after initialization',
            'References can be null (`nullptr`)',
            'References must be initialized upon declaration and cannot be reseated',
            'References have their own distinct memory address like pointers'
          ],
          correctIndex: 2,
          explanation: 'In C++, a reference is an alias. It must be bound to an object upon declaration and can never be reseated to refer to another object or set to null.'
        },
        {
          id: 'cpp-a5',
          section: 'A',
          marks: 1,
          topic: 'Scope Resolution',
          question: 'What does the unary scope resolution operator `::variable_name` access when used inside a local block?',
          options: [
            'The member variable of the current class',
            'The shadowed global variable at file scope',
            'A private heap variable',
            'The CPU register cache'
          ],
          correctIndex: 1,
          explanation: 'The unary scope resolution operator `::var` refers explicitly to the global namespace, bypassing any local variables that shadow the global name.'
        },
        {
          id: 'cpp-a6',
          section: 'A',
          marks: 1,
          topic: 'Null Pointers',
          question: 'Why does modern C++ prefer `nullptr` over legacy `NULL` or `0`?',
          options: [
            'nullptr occupies 16 bytes of memory',
            'nullptr is strongly typed as `std::nullptr_t` and eliminates integer overload ambiguity',
            'NULL was completely removed from the C++ standard',
            'nullptr encrypts the memory pointer'
          ],
          correctIndex: 1,
          explanation: '`nullptr` has the type `std::nullptr_t`, preventing bugs where overloaded functions like `f(int)` and `f(char*)` incorrectly resolve `f(NULL)` as the integer overload.'
        },
        {
          id: 'cpp-a7',
          section: 'A',
          marks: 1,
          topic: 'Array Decay',
          question: 'What occurs when a raw C-style array `int arr[10]` is passed by value to a function `void func(int a[])`?',
          options: [
            'All 10 elements are copied onto the stack',
            'The array decays into a raw pointer `int*` to its first element',
            'The function creates a std::vector internally',
            'Compilation fails without templates'
          ],
          correctIndex: 1,
          explanation: 'In C and C++, raw arrays decay into pointers to their first element (`int*`) when passed to functions, losing their compile-time length.'
        },
        {
          id: 'cpp-a8',
          section: 'A',
          marks: 1,
          topic: 'Prefix vs Postfix',
          question: 'Why is pre-increment `++it` preferred over post-increment `it++` for STL iterators?',
          options: [
            'Post-increment is forbidden by the compiler for iterators',
            'Post-increment must construct an unnecessary temporary copy of the prior iterator state before incrementing',
            'Pre-increment runs in hardware CPU registers only',
            'There is no performance difference'
          ],
          correctIndex: 1,
          explanation: '`it++` must create and return a temporary copy of the iterator\'s previous state, whereas `++it` modifies the iterator in-place and returns a reference with zero copy cost.'
        },
        {
          id: 'cpp-a9',
          section: 'A',
          marks: 1,
          topic: 'Struct vs Class',
          question: 'What is the ONLY difference between a `struct` and a `class` in C++?',
          options: [
            'structs cannot have member functions or constructors',
            'structs default to public access and inheritance; classes default to private access and inheritance',
            'classes are allocated on heap; structs are allocated on stack',
            'structs do not support templates'
          ],
          correctIndex: 1,
          explanation: 'In C++, `struct` and `class` are identical in power and capability; the only distinction is default access level (public for struct, private for class).'
        },
        {
          id: 'cpp-a10',
          section: 'A',
          marks: 1,
          topic: 'Const Member Functions',
          question: 'What does appending `const` to a member function signature (`void print() const;`) enforce?',
          options: [
            'The function cannot be called more than once',
            'The function cannot modify any non-mutable member variables of the calling instance',
            'The function must return a const value',
            'The function is inlined by the compiler'
          ],
          correctIndex: 1,
          explanation: 'A const member function treats `this` as `const Class*`, preventing modification of any non-mutable member data and allowing it to be invoked on const instances.'
        }
      ]
    },

    sectionB: {
      title: 'Section B: OOP, STL, Memory Management & Modern Semantics',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'cpp-b1',
          section: 'B',
          marks: 1,
          topic: 'Virtual Destructors',
          question: 'What consequence occurs if a derived class object is deleted through a base pointer `Base* ptr = new Derived(); delete ptr;` when `Base` lacks a virtual destructor?',
          options: [
            'The program automatically calls the derived destructor using RTTI',
            'Undefined behavior occurs and the derived class destructor is NOT executed, causing resource leaks',
            'The compiler issues a fatal compile error',
            'The derived class is deleted first, then base'
          ],
          correctIndex: 1,
          explanation: 'Without a virtual destructor in the base class, the compiler statically binds the destructor call to `~Base()`, skipping `~Derived()` and leaking any resources allocated by Derived.'
        },
        {
          id: 'cpp-b2',
          section: 'B',
          marks: 1,
          topic: 'Pure Virtual Functions',
          question: 'What makes a C++ class an "Abstract Base Class" (interface)?',
          options: [
            'Declaring all member variables as private',
            'Declaring at least one pure virtual function using the syntax `= 0;`',
            'Using the `interface` keyword',
            'Inheriting from std::exception'
          ],
          correctIndex: 1,
          explanation: 'A class with at least one pure virtual function (`virtual void f() = 0;`) is abstract and cannot be instantiated directly, serving as an interface for derived classes.'
        },
        {
          id: 'cpp-b3',
          section: 'B',
          marks: 1,
          topic: 'std::unique_ptr Ownership',
          question: 'Which of the following operations is ILLEGAL on a `std::unique_ptr<int>`?',
          options: [
            'std::unique_ptr<int> p2 = std::move(p1);',
            'std::unique_ptr<int> p2 = p1; // Copy assignment',
            'if (p1 != nullptr)',
            '*p1 = 50;'
          ],
          correctIndex: 1,
          explanation: '`std::unique_ptr` enforces strict exclusive ownership: its copy constructor and copy assignment operator are explicitly deleted (`= delete`). It can only be moved.'
        },
        {
          id: 'cpp-b4',
          section: 'B',
          marks: 1,
          topic: 'Move Semantics',
          question: 'What does `std::move(variable)` actually perform under the hood?',
          options: [
            'It physically copies memory bytes to a new location in RAM',
            'It casts the lvalue expression to an rvalue reference (`static_cast<T&&>`) without moving bytes itself',
            'It deallocates the original object immediately',
            'It creates a background worker thread'
          ],
          correctIndex: 1,
          explanation: '`std::move` performs no runtime data movement; it is an unconditional static cast to an rvalue reference (`T&&`), informing constructors that resources may be stolen.'
        },
        {
          id: 'cpp-b5',
          section: 'B',
          marks: 1,
          topic: 'STL Complexity',
          question: 'What is the average time complexity of element lookup in `std::unordered_map` versus `std::map`?',
          options: [
            'std::unordered_map is O(log n); std::map is O(1)',
            'std::unordered_map is O(1); std::map is O(log n)',
            'Both are O(n)',
            'Both are O(1)'
          ],
          correctIndex: 1,
          explanation: '`std::unordered_map` is a hash table offering average O(1) lookup. `std::map` is a Red-Black binary search tree guaranteeing O(log n) lookup.'
        },
        {
          id: 'cpp-b6',
          section: 'B',
          marks: 1,
          topic: 'Exception Slicing',
          question: 'Why should exceptions always be caught by const reference (`catch (const std::exception& e)`) instead of by value?',
          options: [
            'To prevent Object Slicing and preserve polymorphic behavior of derived exception classes',
            'Because C++ compilers forbid catching exceptions by value',
            'To enable memory caching',
            'To convert the exception into an integer exit code'
          ],
          correctIndex: 0,
          explanation: 'Catching by value slices off derived class members and virtual tables, causing `e.what()` to lose the derived exception diagnostic details. Catching by const reference preserves polymorphism.'
        },
        {
          id: 'cpp-b7',
          section: 'B',
          marks: 1,
          topic: 'RAII Pattern',
          question: 'How does Resource Acquisition Is Initialization (RAII) guarantee resource cleanup in C++?',
          options: [
            'By running a periodic garbage collection thread',
            'By acquiring resources in constructors and releasing them deterministically in destructors upon scope exit',
            'By saving heap pointers to disk',
            'By forcing all pointers to be global'
          ],
          correctIndex: 1,
          explanation: 'RAII binds resource lifetime to object scope: allocation occurs in `Constructor()`, and deallocation is executed deterministically in `~Destructor()` during normal exit or stack unwinding.'
        },
        {
          id: 'cpp-b8',
          section: 'B',
          marks: 1,
          topic: 'Lambda Capture Modes',
          question: 'What is the difference between `[=]` and `[&]` in a C++ lambda capture specification?',
          options: [
            '[=] captures all enclosing variables by copy (value); [&] captures all by reference',
            '[=] captures only pointers; [&] captures only references',
            '[=] is for public access; [&] is for private access',
            'There is no difference'
          ],
          correctIndex: 0,
          explanation: '`[=]` creates local copies of outer variables inside the closure; `[&]` binds to outer variables by reference, allowing in-place mutation.'
        },
        {
          id: 'cpp-b9',
          section: 'B',
          marks: 1,
          topic: 'Templates and Monomorphization',
          question: 'How do C++ templates achieve zero runtime performance overhead compared to Java generics?',
          options: [
            'Through Type Erasure casting everything to void*',
            'Through compile-time monomorphization, generating specialized native machine code for each concrete type used',
            'By running in an internal interpreter',
            'By using dynamic bytecode dispatch'
          ],
          correctIndex: 1,
          explanation: 'C++ monomorphizes templates at compile time: separate, fully optimized assembly functions are emitted for each type (e.g. `vector<int>`, `vector<double>`), incurring zero runtime abstraction penalty.'
        },
        {
          id: 'cpp-b10',
          section: 'B',
          marks: 1,
          topic: 'Thread Synchronization',
          question: 'What is the purpose of `std::lock_guard<std::mutex>` compared to calling `mutex.lock()` manually?',
          options: [
            'It accelerates thread execution speed by 10x',
            'It provides RAII locking, automatically releasing the mutex when exiting the block scope even if an exception is thrown',
            'It allows multiple threads to write to the same variable simultaneously',
            'It prevents the thread from being preempted'
          ],
          correctIndex: 1,
          explanation: 'Manual `.lock()` and `.unlock()` calls risk deadlocks if an exception is thrown before `.unlock()`. `std::lock_guard` guarantees the mutex is unlocked when the guard is destroyed.'
        }
      ]
    },

    sectionC: {
      title: 'Section C: Systems Architecture, Internals & Concurrency',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'cpp-c1',
          section: 'C',
          marks: 1,
          topic: 'VTable Internals',
          question: 'Explain how virtual method resolution (dynamic dispatch) is implemented under the hood in C++ compilers:',
          options: [
            'The compiler performs dynamic string comparisons on function names at runtime.',
            'Each polymorphic class has a virtual table (vtable) of function pointers; each instance contains a hidden virtual pointer (vptr) that indexes into this table at runtime.',
            'The operating system kernel resolves function addresses via dynamic linking on every method call.',
            'Virtual functions are converted into C switch-case statements.'
          ],
          correctIndex: 1,
          explanation: 'The compiler generates a vtable array of function pointers per class and embeds an 8-byte `__vptr` into each instance pointing to that vtable, turning virtual calls into a fast pointer dereference `vptr[offset]()`.'
        },
        {
          id: 'cpp-c2',
          section: 'C',
          marks: 1,
          topic: 'Short String Optimization (SSO)',
          question: 'What is Short String Optimization (SSO) in modern implementations of `std::string`?',
          options: [
            'Strings shorter than 10 characters are automatically deleted',
            'Small strings (typically <= 15-22 bytes) are stored directly inside the stack object buffer, avoiding dynamic heap allocation entirely',
            'Strings are compressed using gzip in memory',
            'Strings are converted to char arrays during compilation'
          ],
          correctIndex: 1,
          explanation: 'SSO uses a union inside `std::string` to store small strings directly within the object footprint on the stack, bypassing costly heap allocation (`malloc`/`new`) for short strings.'
        },
        {
          id: 'cpp-c3',
          section: 'C',
          marks: 1,
          topic: 'std::make_shared Allocation',
          question: 'Why is `std::make_shared<T>()` strongly preferred over `std::shared_ptr<T>(new T())`?',
          options: [
            'It allocates the reference control block and the object in a single contiguous memory block, reducing heap allocations from 2 to 1 and improving cache locality',
            'It eliminates the need for reference counting',
            'It prevents multi-threaded access',
            'It converts the pointer to unique_ptr automatically'
          ],
          correctIndex: 0,
          explanation: '`new T` allocates the object, and then `shared_ptr` allocates a separate control block (2 heap allocations). `std::make_shared` allocates both in a single contiguous memory block.'
        },
        {
          id: 'cpp-c4',
          section: 'C',
          marks: 1,
          topic: 'Deadlock Prevention',
          question: 'How does modern C++17 provide deadlock-free acquisition of multiple mutexes simultaneously?',
          options: [
            'Using `std::thread::yield()`',
            'Using `std::scoped_lock lock(mutex1, mutex2);` which employs a deadlock-avoidance algorithm (like std::lock)',
            'By disabling thread interrupts in hardware',
            'Mutexes cannot cause deadlocks in C++'
          ],
          correctIndex: 1,
          explanation: '`std::scoped_lock` can accept multiple mutexes simultaneously and applies a deadlock-avoidance algorithm to acquire all locks without risking circular lock dependency deadlocks.'
        },
        {
          id: 'cpp-c5',
          section: 'C',
          marks: 1,
          topic: 'Rule of Five',
          question: 'Under the C++ "Rule of Five", if a class manages a raw resource and explicitly declares a custom destructor, which other four special member functions must typically be addressed?',
          options: [
            'Copy Constructor, Copy Assignment, Move Constructor, Move Assignment',
            'Default Constructor, Print, ToString, Clear',
            'Malloc, Free, Sizeof, Typeid',
            'Begin, End, Rbegin, Rend'
          ],
          correctIndex: 0,
          explanation: 'The Rule of Five states that managing a resource requires explicitly defining or deleting: Destructor, Copy Constructor, Copy Assignment Operator, Move Constructor, and Move Assignment Operator.'
        },
        {
          id: 'cpp-c6',
          section: 'C',
          marks: 1,
          topic: 'constexpr vs const',
          question: 'What is the fundamental difference between `const` and `constexpr` in C++?',
          options: [
            'const is compile-time only; constexpr is runtime only',
            'const guarantees read-only immutability (can be set at runtime); constexpr guarantees compile-time evaluation and constant expression validity',
            'constexpr only works on floating point numbers',
            'const variables cannot be passed to functions'
          ],
          correctIndex: 1,
          explanation: '`const` means "read-only" (its value may be initialized at runtime from user input). `constexpr` means "known at compile time", allowing the value to be used in template arguments and array bounds.'
        },
        {
          id: 'cpp-c7',
          section: 'C',
          marks: 1,
          topic: 'Data Races & Undefined Behavior',
          question: 'What constitutes a Data Race in C++ concurrency, and what are its standard consequences?',
          options: [
            'Two threads reading the same memory location simultaneously; causes a compiler warning',
            'Two or more concurrent threads accessing the same memory location without synchronization where at least one access is a write; causes Undefined Behavior',
            'A thread running out of stack space',
            'A mutex timeout'
          ],
          correctIndex: 1,
          explanation: 'A Data Race occurs when multiple threads concurrently access shared memory without synchronization and at least one is writing. According to the ISO C++ memory model, data races invoke complete Undefined Behavior.'
        },
        {
          id: 'cpp-c8',
          section: 'C',
          marks: 1,
          topic: 'Perfect Forwarding & std::forward',
          question: 'What is the role of `std::forward<T>` in template programming (Universal / Forwarding References `T&&`)?',
          options: [
            'It forces the argument to be deleted after use',
            'It preserves the original value category (lvalueness or rvalueness) of an argument when passing it to another function',
            'It converts all arguments to raw pointers',
            'It sorts container elements forwardly'
          ],
          correctIndex: 1,
          explanation: 'Universal references (`T&&`) bind to both lvalues and rvalues. `std::forward<T>` preserves the exact value category (forwarding lvalues as lvalues, and rvalues as rvalues) to avoid unnecessary copies.'
        },
        {
          id: 'cpp-c9',
          section: 'C',
          marks: 1,
          topic: 'Iterator Invalidation',
          question: 'When appending an element to a `std::vector` using `push_back()`, under what condition are existing iterators and pointers invalidated?',
          options: [
            'Iterators are never invalidated in std::vector',
            'When the new size exceeds current `capacity()`, forcing reallocation of the underlying dynamic array to a new heap address',
            'Only when inserting negative numbers',
            'Only on 32-bit operating systems'
          ],
          correctIndex: 1,
          explanation: 'When `size() == capacity()`, `push_back()` allocates a larger contiguous buffer, copies/moves existing elements over, and frees the old buffer, invalidating all iterators and pointers to old elements.'
        },
        {
          id: 'cpp-c10',
          section: 'C',
          marks: 1,
          topic: 'Thread Lifetime & std::terminate',
          question: 'What occurs if a `std::thread` instance goes out of scope and its destructor is called while still joinable (`joinable() == true`)?',
          options: [
            'The thread automatically continues executing in detached mode',
            'The runtime invokes `std::terminate()`, immediately aborting the entire process',
            'The thread pauses until the OS terminates',
            'The destructor waits silently until the thread finishes'
          ],
          correctIndex: 1,
          explanation: 'The standard specifies that destroying a joinable `std::thread` invokes `std::terminate()`, crashing the program to prevent subtle concurrency bugs where threads outlive their stack resources.'
        }
      ]
    }
  }
};
