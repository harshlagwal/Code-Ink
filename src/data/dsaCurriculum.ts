import { Chapter } from '../types/notebook';

export const DSA_CHAPTERS: Chapter[] = [
  // CHAPTER 01 — TIME & SPACE COMPLEXITY
  {
    id: 'dsa-ch01',
    number: 1,
    title: 'Asymptotic Analysis & Big-O Notation',
    description: 'Time & space bounds, Big-O, Big-Omega, Big-Theta, recursion trees, and Master Theorem',
    topics: [
      {
        id: 'dsa-complexity',
        subjectId: 'dsa',
        chapterId: 'dsa-ch01',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'Asymptotic Analysis: Big-O, Space Complexity & Trade-offs',
        difficulty: 'beginner',
        definition: 'Asymptotic analysis evaluates algorithmic efficiency as input size N grows toward infinity, bounding worst-case runtime (Big-O) and auxiliary memory consumption.',
        whyItMatters: 'Writing functionally correct code is insufficient in production systems; an O(N^2) algorithm processing 1,000,000 requests per minute will collapse production infrastructure compared to an O(N log N) design.',
        syntax: 'T(N) = O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!)',
        explanation: [
          'Big-O (O): Upper bound on worst-case growth rate.',
          'Big-Omega (Ω): Lower bound (best case). Big-Theta (Θ): Tight asymptotic bound (best and worst cases match).',
          'Space Complexity: Total auxiliary memory allocated on the Heap and Stack (including recursive call frames) as a function of N.',
          'Space-Time Trade-off: Caching results in hash maps (O(N) memory) frequently drops runtime from O(N^2) down to O(N).'
        ],
        example: {
          language: 'cpp',
          code: `// O(N) Time, O(1) Auxiliary Space
long long computeSum(const std::vector<int>& arr) {
    long long total = 0; // O(1) auxiliary memory
    for (int num : arr) { // O(N) loop iterations
        total += num;
    }
    return total;
}`,
          output: 'Input size N = 10^6: ~1.2ms (Single Linear Scan)',
          annotations: [
            { line: 2, label: 'Single integer accumulator takes O(1) constant auxiliary space', type: 'green' },
            { line: 4, label: 'Single loop over array size N scales in O(N) linear time', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Asymptotic Complexity Hierarchy',
          subtitle: 'From High-Performance Constant Time to Intractable Factorial Time',
          elements: [
            { id: '1', label: 'O(1) Constant', value: 'Hash Lookup / Array Index', status: 'active', arrowTo: '2' },
            { id: '2', label: 'O(log N) Logarithmic', value: 'Binary Search', status: 'active', arrowTo: '3' },
            { id: '3', label: 'O(N) Linear', value: 'Single Pass Scan', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'O(N log N)', value: 'MergeSort / QuickSort', status: 'normal', arrowTo: '5' },
            { id: '5', label: 'O(N^2) Quadratic', value: 'Nested Loops', status: 'warning' }
          ]
        },
        important: 'Do not forget the Call Stack depth when analyzing space complexity! A recursive function without auxiliary arrays that recurses N levels deep consumes O(N) stack memory.',
        commonMistakes: [
          'Treating string concatenation inside a loop as O(1); strings are immutable in Python/Java/JS, so repeated concatenation inside a loop is O(N^2).',
          'Confusing best case with average or worst case.'
        ],
        tip: 'In competitive programming and technical interviews, an algorithm must execute under ~10^8 operations per second to pass standard 1.0s timeout limits.',
        interviewNote: 'Question: "What is the difference between Big-O and Big-Theta?" Answer: "Big-O provides an asymptotic upper bound (worst-case scenario), while Big-Theta (Θ) provides a tight bound where the upper and lower limits are identical."',
        practiceQuestions: [
          {
            id: 'q-dsa1-1',
            type: 'mcq',
            question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) of N nodes?',
            options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
            correctIndex: 1,
            explanation: 'Each comparison eliminates half of the remaining sub-tree, producing logarithmic O(log N) search time in balanced trees.'
          },
          {
            id: 'q-dsa1-2',
            type: 'output',
            question: 'What is the total number of operations for a double nested loop: for (i=0; i<N; i++) for (j=i; j<N; j++)?',
            options: ['N * N', 'N * (N + 1) / 2', '2 * N', 'log N'],
            correctIndex: 1,
            explanation: 'The inner loop runs N, then N-1, ... down to 1 times. The arithmetic progression sum is N * (N + 1) / 2, which is O(N^2).'
          }
        ],
        relatedTopics: ['Dynamic Arrays & Two Pointers', 'Recursion & Backtracking', 'Sorting']
      }
    ]
  },

  // CHAPTER 02 — DYNAMIC ARRAYS & TWO POINTERS
  {
    id: 'dsa-ch02',
    number: 2,
    title: 'Dynamic Arrays & The Two-Pointer Paradigm',
    description: 'Amortized doubling O(1), left-right convergent pointers, sliding window, and prefix sums',
    topics: [
      {
        id: 'dsa-arrays-two-pointers',
        subjectId: 'dsa',
        chapterId: 'dsa-ch02',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'Dynamic Arrays & Two-Pointer / Sliding Window Techniques',
        difficulty: 'beginner',
        definition: 'Dynamic Arrays provide contiguous memory with O(1) random access and amortized O(1) append. The Two-Pointer technique processes linear collections using convergent or parallel indices in O(N) time.',
        whyItMatters: 'Two-pointer patterns and sliding windows reduce brute-force O(N^2) subarray and pair-search problems down to blazing O(N) linear time.',
        syntax: 'int left = 0, right = arr.size() - 1;\nwhile (left < right) {\n  int sum = arr[left] + arr[right];\n  if (sum == target) return {left, right};\n  else if (sum < target) left++;\n  else right--;\n}',
        explanation: [
          'Amortized O(1) Capacity Doubling: When capacity fills, a new buffer of 2X size is allocated, and elements copied. Sum of geometric series yields amortized O(1) push.',
          'Convergent Two-Pointers: Left starts at index 0, right at index N-1, advancing toward each other on sorted arrays (e.g. Two-Sum II, Container With Most Water).',
          'Sliding Window: Expands right pointer until condition breaks, then shrinks left pointer (e.g. Longest Substring Without Repeating Characters).',
          'Prefix Sum Array: Computes cumulative sums `prefix[i] = prefix[i-1] + arr[i]` to answer range sum queries `arr[L...R]` in O(1) constant time.'
        ],
        example: {
          language: 'cpp',
          code: `// Container With Most Water: O(N) Two-Pointer approach
int maxArea(const std::vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;

    while (left < right) {
        int width = right - left;
        int h = std::min(height[left], height[right]);
        maxWater = std::max(maxWater, width * h);

        // Advance the bottleneck pointer
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
          output: 'Heights [1,8,6,2,5,4,8,3,7] -> Max Area: 49 (O(N) single pass)',
          annotations: [
            { line: 3, label: 'Convergent pointers at extreme ends of array', type: 'blue' },
            { line: 11, label: 'Greedily move the shorter vertical line inward', type: 'green' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Two-Pointer Convergent Traversal',
          subtitle: 'Slashing O(N^2) Pair Checking to Single O(N) Pass',
          elements: [
            { id: '1', label: 'Index 0 [Left Pointer]', value: 'arr[0]', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Contiguous Memory Buffer', value: '[1, 2, 4, 7, 11, 15]', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Index N-1 [Right Pointer]', value: 'arr[N-1]', status: 'active' }
          ]
        },
        important: 'In a dynamic array, insertion or deletion at the beginning or middle is O(N) because elements must be shifted in memory. Only push_back and pop_back at the end are O(1).',
        commonMistakes: [
          'Using two-pointer search on an unsorted array without sorting first.',
          'Off-by-one errors when updating sliding window bounds (`right - left + 1`).'
        ],
        tip: 'Whenever an interview problem asks for "contiguous subarray with sum K or condition", immediately think Sliding Window or Prefix Sum + Hash Map.',
        interviewNote: 'Question: "Why is vector push_back amortized O(1) when resizing is O(N)?" Answer: "When resizing by a constant factor of 2X, the expensive O(N) copy happens exponentially less frequently (at N = 1, 2, 4, 8, 16...). Over N insertions, the total copies sum to 2N - 1, yielding an average of O(1) per insert."',
        practiceQuestions: [
          {
            id: 'q-dsa2-1',
            type: 'mcq',
            question: 'What is the time complexity of answering a range sum query arr[L...R] using a precomputed prefix sum array?',
            options: ['O(N)', 'O(log N)', 'O(1)', 'O(R - L)'],
            correctIndex: 2,
            explanation: 'With prefix sums, range sum is simply computed as prefix[R] - prefix[L - 1], which takes O(1) constant time.'
          },
          {
            id: 'q-dsa2-2',
            type: 'output',
            question: 'What is the maximum area between heights [1, 1]?',
            codeSnippet: 'int width = 1 - 0; int h = min(1, 1); cout << width * h;',
            options: ['0', '1', '2', 'undefined'],
            correctIndex: 1,
            explanation: 'Width is 1 and minimum height is 1, so 1 * 1 = 1.'
          }
        ],
        relatedTopics: ['Linked Lists', 'Hash Tables', 'Stacks & Queues']
      }
    ]
  },

  // CHAPTER 03 — LINKED LISTS
  {
    id: 'dsa-ch03',
    number: 3,
    title: 'Singly & Doubly Linked Lists',
    description: 'Pointer manipulation, sentinel dummy nodes, fast & slow pointers (Floyd cycle detection), and list reversal',
    topics: [
      {
        id: 'dsa-linked-lists',
        subjectId: 'dsa',
        chapterId: 'dsa-ch03',
        chapterNumber: 3,
        pageNumber: 3,
        title: 'Linked Lists: Pointer Manipulation, Floyd Cycle & Reversal',
        difficulty: 'intermediate',
        definition: 'A Linked List is a linear data structure where elements (nodes) are stored non-contiguously in heap memory, each holding a data payload and a pointer reference to the next node.',
        whyItMatters: 'Linked lists allow O(1) insertions and deletions without memory reallocations, powering memory allocators, OS kernel task schedulers, and LRU caches.',
        syntax: 'struct ListNode {\n  int val;\n  ListNode* next;\n  ListNode(int x) : val(x), next(nullptr) {}\n};',
        explanation: [
          'Sentinel Dummy Head: Creating a dummy node before the true head simplifies edge cases (deleting the real head node, merging lists) and eliminates null checks.',
          'In-Place Reversal: Requires three pointers (`prev = nullptr`, `curr = head`, `next = nullptr`). Iteratively reverse `curr->next = prev` in O(N) time and O(1) auxiliary space.',
          'Floyd\'s Cycle Finding Algorithm (Tortoise & Hare): Slow pointer advances 1 step; fast pointer advances 2 steps. If a cycle exists, they must collide inside the loop in O(N) time.',
          'Finding Cycle Start: After collision, reset slow to head; advance both 1 step simultaneously until they meet at the cycle origin.'
        ],
        example: {
          language: 'cpp',
          code: `// In-Place Reversal of a Singly Linked List
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* nextTemp = curr->next; // Save next pointer
        curr->next = prev;               // Reverse direction
        prev = curr;                     // Step prev forward
        curr = nextTemp;                 // Step curr forward
    }
    return prev; // New head of reversed list
}`,
          output: 'Original: 1 -> 2 -> 3 -> 4 -> nullptr\nReversed: 4 -> 3 -> 2 -> 1 -> nullptr',
          annotations: [
            { line: 7, label: 'Save next node before overwriting curr->next pointer', type: 'yellow' },
            { line: 8, label: 'Reverse pointer direction backwards', type: 'green' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Floyd\'s Tortoise and Hare Cycle Detection',
          subtitle: 'Two Pointers Moving at Speeds 1X and 2X Colliding in Loop',
          elements: [
            { id: '1', label: 'Head: Node 1', value: 'Start', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Node 2 [Slow 1X]', value: 'Val: 2', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Node 3 [Fast 2X]', value: 'Val: 3', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Node 4 (Cycle)', value: 'Points to Node 2', status: 'warning', arrowTo: '2' }
          ]
        },
        important: 'Always disconnect dangling pointers! When reversing or unlinking nodes in C/C++, forgetting to set `tail->next = nullptr` creates infinite traversal cycles.',
        commonMistakes: [
          'Losing the reference to `curr->next` before reassigning it, severing the rest of the list.',
          'Attempting `fast->next->next` without first validating that `fast != nullptr` and `fast->next != nullptr`.'
        ],
        tip: 'Use a dummy sentinel node `ListNode dummy(0); dummy.next = head;` whenever you might delete or insert at the head of a list.',
        interviewNote: 'Question: "Why is Floyd\'s cycle detection guaranteed to find a loop if one exists?" Answer: "With slow moving at speed 1 and fast at speed 2, the relative distance between them decreases by exactly 1 node per iteration inside the cycle, making a collision inevitable without skipping over each other."',
        practiceQuestions: [
          {
            id: 'q-dsa3-1',
            type: 'mcq',
            question: 'What is the auxiliary space complexity of iteratively reversing a singly linked list in-place?',
            options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
            correctIndex: 1,
            explanation: 'Iterative reversal only requires three pointer variables (prev, curr, nextTemp), consuming strictly O(1) constant auxiliary space.'
          },
          {
            id: 'q-dsa3-2',
            type: 'output',
            question: 'What does reverseList return when passed nullptr (empty list)?',
            options: ['nullptr', 'Throws NullPointerException', 'Dummy node', 'Infinite loop'],
            correctIndex: 0,
            explanation: 'When head is nullptr, the while loop never executes and prev (initialized to nullptr) is safely returned.'
          }
        ],
        relatedTopics: ['Stacks, Queues & Deques', 'Trees & BST', 'Dynamic Arrays']
      }
    ]
  },

  // CHAPTER 04 — STACKS & QUEUES
  {
    id: 'dsa-ch04',
    number: 4,
    title: 'Stacks, Queues & Monotonic Structures',
    description: 'LIFO vs FIFO, circular buffers, monotonic stacks (Next Greater Element), and sliding window maximum',
    topics: [
      {
        id: 'dsa-stacks-queues',
        subjectId: 'dsa',
        chapterId: 'dsa-ch04',
        chapterNumber: 4,
        pageNumber: 4,
        title: 'Stacks, Queues & Monotonic Structures',
        difficulty: 'intermediate',
        definition: 'A Stack is a Last-In-First-Out (LIFO) structure; a Queue is a First-In-First-Out (FIFO) structure. Monotonic stacks maintain elements in strictly ascending or descending order.',
        whyItMatters: 'Monotonic stacks solve "Next Greater Element" and "Largest Rectangle in Histogram" problems in O(N) linear time instead of naive O(N^2) comparisons.',
        syntax: 'std::stack<int> s; s.push(x); s.pop(); s.top();\nstd::queue<int> q; q.push(x); q.pop(); q.front();',
        explanation: [
          'Stack (LIFO): Function call stacks, expression evaluation, syntax parsing (matching parentheses `{ [ ( ) ] }`), backtracking history.',
          'Queue (FIFO): Breadth-First Search (BFS), task scheduling queues, network packet buffers.',
          'Monotonic Stack Pattern: When pushing element X, pop all elements smaller (or larger) than X to maintain sorted order, resolving nearest greater/smaller element queries in amortized O(1) per node.',
          'Deque (Double-Ended Queue): Allows O(1) push and pop at both ends, essential for the sliding window maximum algorithm.'
        ],
        example: {
          language: 'cpp',
          code: `// Next Greater Element using Monotonic Decreasing Stack: O(N)
std::vector<int> nextGreaterElements(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> result(n, -1);
    std::stack<int> st; // Stores indices

    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i]; // Found next greater!
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
          output: 'Input: [2, 1, 2, 4, 3] -> Next Greater: [4, 2, 4, -1, -1]',
          annotations: [
            { line: 8, label: 'Pop elements strictly smaller than incoming number', type: 'yellow' },
            { line: 9, label: 'Record the next greater element for the popped index', type: 'green' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Monotonic Stack Invariant Maintenance',
          subtitle: 'Each Element Pushed Once and Popped At Most Once (Amortized O(N))',
          elements: [
            { id: '1', label: 'Incoming: 4', value: 'Pushes 4', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Stack Top: 2', sublabel: '2 < 4 -> Pop 2!', value: 'Popped', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Stack Next: 1', sublabel: '1 < 4 -> Pop 1!', value: 'Popped', status: 'warning', arrowTo: '4' },
            { id: '4', label: 'Result: Stack [4]', sublabel: 'Monotonic Invariant Preserved', value: 'Top = 4', status: 'referenced' }
          ]
        },
        important: 'Although the monotonic stack uses nested `while` loops, each element is pushed onto the stack exactly once and popped at most once. The total amortized time is strictly O(N), NOT O(N^2)!',
        commonMistakes: [
          'Calling `s.top()` or `s.pop()` on an empty stack (undefined behavior / crashes). Always check `!s.empty()` first.',
          'Storing values in the stack instead of indices when distances or positions between elements are needed.'
        ],
        tip: 'Whenever a problem asks for "first element greater/smaller to the left or right", immediately reach for a Monotonic Stack.',
        interviewNote: 'Question: "How do you implement a Queue using two Stacks?" Answer: "Use stackIn for pushes and stackOut for pops. When stackOut is empty, transfer all elements from stackIn to stackOut (which reverses their order to FIFO), achieving amortized O(1) push and pop operations."',
        practiceQuestions: [
          {
            id: 'q-dsa4-1',
            type: 'mcq',
            question: 'What is the overall time complexity of the Monotonic Stack algorithm for Next Greater Element on an array of N numbers?',
            options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
            correctIndex: 2,
            explanation: 'Each element enters and exits the stack at most once, making the aggregated number of operations bounded by 2N, which is O(N) linear time.'
          },
          {
            id: 'q-dsa4-2',
            type: 'output',
            question: 'What is the Next Greater Element for the last element in any array?',
            options: ['0', 'The first element', '-1 (no greater element to the right)', 'Infinity'],
            correctIndex: 2,
            explanation: 'Because there are no elements to the right of the last element, its next greater element is -1.'
          }
        ],
        relatedTopics: ['Linked Lists', 'Trees & BST', 'Graph Traversal']
      }
    ]
  },

  // CHAPTER 05 — HASH TABLES
  {
    id: 'dsa-ch05',
    number: 5,
    title: 'Hash Tables & Collision Resolution',
    description: 'Hash functions, separate chaining, open addressing, load factor, and Two-Sum pattern',
    topics: [
      {
        id: 'dsa-hash-tables',
        subjectId: 'dsa',
        chapterId: 'dsa-ch05',
        chapterNumber: 5,
        pageNumber: 5,
        title: 'Hash Tables: Collisions, Load Factor & The Two-Sum Pattern',
        difficulty: 'intermediate',
        definition: 'A Hash Table maps keys to values using a hash function computing an index into an array of buckets. Provides average O(1) insertions, deletions, and lookups.',
        whyItMatters: 'Hash tables are the most ubiquitous data structure in modern computing, driving database indexes, caches (Redis), routers, and compilers.',
        syntax: 'std::unordered_map<string, int> map; // Hash Map: Average O(1)\nstd::map<string, int> treeMap;         // Red-Black Tree: Strict O(log N)',
        explanation: [
          'Hash Function: Converts arbitrary keys (strings, objects) into uniform integer buckets: `index = hash(key) % capacity`.',
          'Collision Resolution: 1. Separate Chaining (each bucket contains a linked list or red-black tree), 2. Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).',
          'Load Factor (α = N / buckets): When load factor exceeds threshold (~0.75), the table rehashes by doubling bucket capacity to maintain O(1) performance.',
          'Worst Case O(N): If all keys hash to the same bucket (hash collision attack), performance degrades to O(N). Modern runtimes mitigate this with randomized seed salts.'
        ],
        example: {
          language: 'cpp',
          code: `// Canonical Two-Sum Problem: O(N) Time, O(N) Space
std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen; // Value -> Index

    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i}; // Found pair!
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
          output: 'Input: [2, 7, 11, 15], Target: 9 -> Output: Indices [0, 1]',
          annotations: [
            { line: 6, label: 'Compute required complement for current number', type: 'yellow' },
            { line: 7, label: 'O(1) hash table lookup checks if complement was seen earlier', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Hash Table Bucket Mapping & Separate Chaining',
          subtitle: 'Key Hashing to Array Indices with Collision Resolution',
          elements: [
            { id: '1', label: 'Key: "user_101"', value: 'Input Key', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Hash Function', sublabel: 'Murmur / SipHash', value: 'Hash Code: 0x9AF2', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Modulo Bucket', sublabel: '0x9AF2 % 16', value: 'Bucket Index [2]', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Chaining Node', sublabel: 'Linked List in Bucket', value: '{ "user_101", data }', status: 'referenced' }
          ]
        },
        important: 'In C++, `std::unordered_map` has average O(1) but worst-case O(N) lookups. In contrast, `std::map` is backed by a self-balancing Red-Black Tree, guaranteeing strictly O(log N) worst-case lookups.',
        commonMistakes: [
          'Using non-hashable custom struct types as keys in `unordered_map` without defining a custom `std::hash` specialization and `operator==`.',
          'Relying on insertion order in hash maps (hash maps do not preserve key insertion order).'
        ],
        tip: 'Pre-reserve hash map capacity `map.reserve(100000)` when the approximate element count is known to prevent costly rehashing cycles.',
        interviewNote: 'Question: "What is the difference between Separate Chaining and Open Addressing?" Answer: "In Separate Chaining, buckets contain linked lists storing all colliding elements outside the primary table. In Open Addressing, all elements reside directly within the array; when a collision occurs, the algorithm probes forward for the next empty array slot."',
        practiceQuestions: [
          {
            id: 'q-dsa5-1',
            type: 'mcq',
            question: 'What is the average time complexity of finding a key in a well-balanced hash table?',
            options: ['O(N)', 'O(1)', 'O(log N)', 'O(N log N)'],
            correctIndex: 1,
            explanation: 'With a uniform hash function and appropriate load factor (< 0.75), hash table lookups take average O(1) constant time.'
          },
          {
            id: 'q-dsa5-2',
            type: 'output',
            question: 'What happens to the load factor α when the number of elements N doubles while bucket count remains constant?',
            options: ['α halves', 'α stays the same', 'α doubles', 'α becomes 0'],
            correctIndex: 2,
            explanation: 'Load factor is defined as α = N / buckets. Doubling N directly doubles the load factor, increasing collision probability.'
          }
        ],
        relatedTopics: ['Dynamic Arrays & Two Pointers', 'Trees & BST', 'Graph Traversal']
      }
    ]
  },

  // CHAPTER 06 — RECURSION & BACKTRACKING
  {
    id: 'dsa-ch06',
    number: 6,
    title: 'Recursion & Backtracking',
    description: 'Recursion stacks, state-space tree traversal, subsets, permutations, and N-Queens',
    topics: [
      {
        id: 'dsa-backtracking',
        subjectId: 'dsa',
        chapterId: 'dsa-ch06',
        chapterNumber: 6,
        pageNumber: 6,
        title: 'Backtracking: State-Space Trees, Pruning & Subsets/Permutations',
        difficulty: 'advanced',
        definition: 'Backtracking is an algorithmic paradigm that searches for solutions by incrementally building candidates, abandoning ("backtracking" from) a candidate as soon as it determines it cannot possibly lead to a valid solution.',
        whyItMatters: 'Backtracking solves NP-complete constraint satisfaction problems (Sudoku, N-Queens, traveling salesperson, combinatorial permutations).',
        syntax: 'void backtrack(State& state) {\n  if (isSolution(state)) { record(state); return; }\n  for (Choice c : choices) {\n    if (isValid(c)) { makeChoice(c); backtrack(state); undoChoice(c); }\n  }\n}',
        explanation: [
          'State-Space Tree: Visualizes all possible decision branches from the empty state down to leaf configurations.',
          'Pruning: Checking validity before recursing discards entire sub-trees of invalid solutions, turning exponential runtime into manageable execution.',
          'The 3 Steps: 1. Choose (pick next candidate), 2. Explore (recurse down decision tree), 3. Un-choose / Backtrack (revert state back before next loop iteration).',
          'Subsets (2^N) vs Permutations (N!): Subsets decide whether to include/exclude each element; Permutations order all elements without reuse.'
        ],
        example: {
          language: 'cpp',
          code: `// Generate All Subsets (Power Set): 2^N Combinations
void findSubsets(int index, const std::vector<int>& nums,
                 std::vector<int>& current,
                 std::vector<std::vector<int>>& result) {
    result.push_back(current); // Record current subset

    for (int i = index; i < (int)nums.size(); i++) {
        current.push_back(nums[i]);        // 1. Choose
        findSubsets(i + 1, nums, current, result); // 2. Explore
        current.pop_back();                 // 3. Un-choose (Backtrack!)
    }
}`,
          output: 'Nums: [1, 2] -> Subsets: [], [1], [1, 2], [2] (Total 2^N = 4)',
          annotations: [
            { line: 7, label: 'Choose: include element into current branch', type: 'blue' },
            { line: 9, label: 'Un-choose: pop element to restore state for sibling branches', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Backtracking State-Space Tree for Subsets',
          subtitle: 'Decision Tree Branching on Inclusion vs Exclusion',
          elements: [
            { id: '1', label: 'Root: []', value: 'Empty State', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Include 1: [1]', sublabel: 'Branch 1', value: 'State [1]', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Include 2: [1, 2]', sublabel: 'Leaf', value: 'Valid Subset', status: 'referenced' },
            { id: '4', label: 'Exclude 1, Include 2: [2]', sublabel: 'Branch 2', value: 'State [2]', status: 'active' }
          ]
        },
        important: 'Always restore state during the backtracking step! Forgetting `current.pop_back()` or unmarking `visited[node] = false` corrupts sibling search branches.',
        commonMistakes: [
          'Omitting base case return statements, causing stack overflow (segmentation fault).',
          'Passing arrays by value rather than by reference (`&`), creating O(N * 2^N) excessive copy allocations.'
        ],
        tip: 'When generating permutations containing duplicates (e.g. `[1, 1, 2]`), sort the input first and skip adjacent duplicates: `if (i > start && nums[i] == nums[i-1]) continue;`.',
        interviewNote: 'Question: "What is the time complexity of generating all permutations of an array of size N?" Answer: "There are N! total permutations, and each requires O(N) operations to copy into the result, yielding an exact time complexity of O(N * N!)."',
        practiceQuestions: [
          {
            id: 'q-dsa6-1',
            type: 'mcq',
            question: 'How many total subsets exist for a set containing N distinct elements?',
            options: ['N!', '2^N', 'N^2', 'N * (N - 1) / 2'],
            correctIndex: 1,
            explanation: 'Each element has two binary choices: either included or excluded, yielding 2 * 2 * ... = 2^N total subsets.'
          },
          {
            id: 'q-dsa6-2',
            type: 'output',
            question: 'What is the role of the pop_back() call in backtracking?',
            options: ['Deletes the final answer', 'Restores the shared state before exploring the next candidate branch', 'Terminates the program', 'Saves memory on stack'],
            correctIndex: 1,
            explanation: 'pop_back() removes the choice made in the current step so the algorithm can evaluate the next alternative choice with clean state.'
          }
        ],
        relatedTopics: ['Trees & BST', 'Graph Traversal', 'Dynamic Programming']
      }
    ]
  },

  // CHAPTER 07 — TREES & BINARY SEARCH TREES
  {
    id: 'dsa-ch07',
    number: 7,
    title: 'Binary Trees & Binary Search Trees (BST)',
    description: 'Tree traversals (DFS/BFS), height, Lowest Common Ancestor (LCA), BST invariants, and validation',
    topics: [
      {
        id: 'dsa-trees-bst',
        subjectId: 'dsa',
        chapterId: 'dsa-ch07',
        chapterNumber: 7,
        pageNumber: 7,
        title: 'Binary Trees, BST Validation & Lowest Common Ancestor (LCA)',
        difficulty: 'intermediate',
        definition: 'A Binary Tree is a hierarchical structure where each node has at most two children. A Binary Search Tree (BST) enforces the ordering invariant: left child < parent < right child.',
        whyItMatters: 'BSTs and balanced trees (AVL, Red-Black Trees, B-Trees) power file systems, database indices, and associative STL containers.',
        syntax: 'struct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};',
        explanation: [
          'Depth-First Search (DFS) Traversals: Inorder (Left, Root, Right — yields strictly sorted order for BST!), Preorder (Root, Left, Right — ideal for serialization), Postorder (Left, Right, Root — ideal for tree deletion & bottom-up DP).',
          'Breadth-First Search (BFS / Level Order): Uses a FIFO queue to process nodes level by level.',
          'Validating a BST: You cannot simply check if `node->left < node`. You must propagate valid numerical bounds `[minAllowed, maxAllowed]` downward.',
          'Lowest Common Ancestor (LCA): The lowest node that has both node P and node Q as descendants.'
        ],
        example: {
          language: 'cpp',
          code: `// Validating a BST using Range Propagation: O(N) Time, O(H) Space
bool isValidBST(TreeNode* root, long long minVal = LLONG_MIN, long long maxVal = LLONG_MAX) {
    if (!root) return true; // Base case

    // Check strict BST invariant
    if (root->val <= minVal || root->val >= maxVal) return false;

    // Recurse left (narrow max bound) and right (narrow min bound)
    return isValidBST(root->left, minVal, root->val) &&
           isValidBST(root->right, root->val, maxVal);
}`,
          output: 'Valid BST Tree: Left Subtree < Root < Right Subtree (Verified in O(N))',
          annotations: [
            { line: 6, label: 'Validate current node against inherited ancestral bounds', type: 'yellow' },
            { line: 9, label: 'Left child must be strictly less than current node value', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Binary Search Tree Ordering Invariant',
          subtitle: 'All Left Descendants < Root < All Right Descendants',
          elements: [
            { id: '1', label: 'Root: 10', value: 'Key: 10', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Left: 5 (< 10)', sublabel: 'Valid Left Subtree', value: 'Key: 5', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Left-Right: 8 (5 < 8 < 10)', sublabel: 'Bounded [5, 10]', value: 'Key: 8', status: 'active' },
            { id: '4', label: 'Right: 15 (> 10)', sublabel: 'Valid Right Subtree', value: 'Key: 15', status: 'referenced' }
          ]
        },
        important: 'In a BST, Inorder traversal visiting Left -> Root -> Right ALWAYS visits nodes in strictly increasing sorted order!',
        commonMistakes: [
          'Checking only immediate children (`root->left->val < root->val`) which misses deep violations (e.g. a right child in the left subtree exceeding the root).',
          'Confusing a complete binary tree with a full or balanced binary tree.'
        ],
        tip: 'In balanced trees of height H = log N, operations are O(log N). In worst-case degenerate trees (linked list shaped), operations degrade to O(N).',
        interviewNote: 'Question: "How do you find the Lowest Common Ancestor (LCA) in a BST in O(H) time?" Answer: "Start at the root. If both nodes P and Q are smaller than root, go left. If both are greater, go right. As soon as P and Q split on opposite sides of root, the current root IS their Lowest Common Ancestor!"',
        practiceQuestions: [
          {
            id: 'q-dsa7-1',
            type: 'mcq',
            question: 'Which tree traversal visits the nodes of a Binary Search Tree in strictly ascending sorted order?',
            options: ['Preorder', 'Inorder', 'Postorder', 'Level-order (BFS)'],
            correctIndex: 1,
            explanation: 'Inorder traversal processes Left Subtree, then Root, then Right Subtree, which maps directly to sorted order in a BST.'
          },
          {
            id: 'q-dsa7-2',
            type: 'output',
            question: 'What is the maximum number of nodes at level L (where root is level 0) in a binary tree?',
            options: ['2 * L', '2^L', 'L^2', '2^(L+1) - 1'],
            correctIndex: 1,
            explanation: 'Level 0 has 2^0 = 1 node; level 1 has 2^1 = 2 nodes; level L has at most 2^L nodes.'
          }
        ],
        relatedTopics: ['Heaps & Priority Queues', 'Graph Traversal', 'Recursion & Backtracking']
      }
    ]
  },

  // CHAPTER 08 — HEAPS & PRIORITY QUEUES
  {
    id: 'dsa-ch08',
    number: 8,
    title: 'Heaps & Priority Queues',
    description: 'Min-heap vs Max-heap, binary heap array representation, heapify O(N), and Top-K elements',
    topics: [
      {
        id: 'dsa-heaps',
        subjectId: 'dsa',
        chapterId: 'dsa-ch08',
        chapterNumber: 8,
        pageNumber: 8,
        title: 'Heaps: Priority Queues, Heapify & Top-K Frequent Elements',
        difficulty: 'intermediate',
        definition: 'A Binary Heap is a complete binary tree satisfying the heap property: in a Min-Heap, parent <= children; in a Max-Heap, parent >= children. Implemented compactly inside a 1D array.',
        whyItMatters: 'Heaps provide O(1) minimum/maximum inspection and O(log N) extraction, powering Dijkstra\'s shortest path, priority task schedulers, and Top-K streaming algorithms.',
        syntax: 'std::priority_queue<int> maxHeap; // Max-heap\nstd::priority_queue<int, vector<int>, std::greater<int>> minHeap; // Min-heap',
        explanation: [
          'Array Index Mapping: For a node at 0-based index `i`: Left child = `2*i + 1`, Right child = `2*i + 2`, Parent = `(i - 1) / 2`. Zero pointer overhead!',
          'Build Heap (`heapify`): Building a heap from an unordered array of N elements takes O(N) linear time, NOT O(N log N).',
          'Top-K Elements Pattern: To find the K largest elements in a stream of N items, maintain a MIN-HEAP of size K. Discard incoming items smaller than `minHeap.top()`. Runtime: O(N log K) with O(K) space.'
        ],
        example: {
          language: 'cpp',
          code: `// Kth Largest Element using Min-Heap: O(N log K) Time, O(K) Space
int findKthLargest(const std::vector<int>& nums, int k) {
    // Min-heap stores only the top K largest elements seen so far
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if ((int)minHeap.size() > k) {
            minHeap.pop(); // Evict the smallest among the top K+1
        }
    }
    return minHeap.top(); // Root is the Kth largest element!
}`,
          output: 'Nums: [3, 2, 1, 5, 6, 4], K = 2 -> 2nd Largest: 5',
          annotations: [
            { line: 4, label: 'Min-heap ordered so smallest item sits at root', type: 'blue' },
            { line: 8, label: 'Keeping heap size bounded to K guarantees O(K) memory and O(log K) push', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Complete Binary Min-Heap Array Mapping',
          subtitle: 'Array: [2, 5, 8, 12, 16] — Parent at (i-1)/2, Children at 2i+1, 2i+2',
          elements: [
            { id: '1', label: 'Index 0: Min Val 2', value: 'Root [2]', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Index 1: Val 5', sublabel: '2*0 + 1', value: 'Left Child [5]', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Index 3: Val 12', sublabel: '2*1 + 1', value: 'Left-Left [12]', status: 'referenced' },
            { id: '4', label: 'Index 2: Val 8', sublabel: '2*0 + 2', value: 'Right Child [8]', status: 'active' }
          ]
        },
        important: 'To find the K LARGEST elements, use a MIN-HEAP of size K. To find the K SMALLEST elements, use a MAX-HEAP of size K.',
        commonMistakes: [
          'Sorting the entire array in O(N log N) when only Top-K elements were needed (wasteful on large streams).',
          'Forgetting that `std::priority_queue` in C++ defaults to a MAX-HEAP, not a min-heap.'
        ],
        tip: 'In Python, `heapq` is a min-heap by default. To create a max-heap in Python, multiply stored values by -1.',
        interviewNote: 'Question: "Why is building a heap O(N) when inserting N elements one by one is O(N log N)?" Answer: "In bottom-up heapify, the majority of nodes reside near the leaves and only sift down 0 or 1 levels. Summing (N / 2^(h+1)) * h over all heights converges mathematically to O(N)."',
        practiceQuestions: [
          {
            id: 'q-dsa8-1',
            type: 'mcq',
            question: 'What is the time complexity of finding the Kth largest element in an array of size N using a min-heap of size K?',
            options: ['O(N log N)', 'O(N log K)', 'O(K log N)', 'O(N^2)'],
            correctIndex: 1,
            explanation: 'Each of the N elements is pushed into a heap of size at most K, requiring O(log K) operations per element, giving O(N log K).'
          },
          {
            id: 'q-dsa8-2',
            type: 'output',
            question: 'What is the index of the parent of a node located at index 6 in a 0-indexed binary heap array?',
            options: ['3', '2', '1', '5'],
            correctIndex: 1,
            explanation: 'Parent index = (i - 1) / 2 = (6 - 1) / 2 = 5 / 2 = 2 (using integer floor division).'
          }
        ],
        relatedTopics: ['Trees & BST', 'Graph Traversal', 'Dynamic Programming']
      }
    ]
  },

  // CHAPTER 09 — GRAPH ALGORITHMS
  {
    id: 'dsa-ch09',
    number: 9,
    title: 'Graphs & Graph Traversal Algorithms',
    description: 'Adjacency lists, BFS (shortest unweighted path), DFS, Kahn topological sort, and Dijkstra algorithm',
    topics: [
      {
        id: 'dsa-graphs',
        subjectId: 'dsa',
        chapterId: 'dsa-ch09',
        chapterNumber: 9,
        pageNumber: 9,
        title: 'Graphs: BFS vs DFS, Topological Sort & Dijkstra Shortest Path',
        difficulty: 'advanced',
        definition: 'A Graph G = (V, E) consists of a set of vertices V connected by edges E. Traversed via Breadth-First Search (Queue) and Depth-First Search (Stack/Recursion).',
        whyItMatters: 'Graphs model real-world networks: social connections, GPS routing (Google Maps), package dependency resolution (npm/pip), and circuit boards.',
        syntax: 'vector<vector<int>> adj(V); // Adjacency list\nqueue<int> q; q.push(start); visited[start] = true;',
        explanation: [
          'Adjacency List: Space O(V + E). Ideal for sparse graphs. Adjacency Matrix: Space O(V^2), allows O(1) edge existence checks.',
          'Breadth-First Search (BFS): Visits neighbors level-by-level using a FIFO queue. Guarantees finding the SHORTEST PATH in unweighted graphs in O(V + E) time.',
          'Depth-First Search (DFS): Explores as deep as possible along each branch before backtracking. Ideal for connected components, cycle detection, and maze solving.',
          'Topological Sort (Kahn\'s Algorithm): Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v. Uses in-degree tracking.',
          'Dijkstra\'s Algorithm: Finds shortest paths from a source to all vertices in a weighted graph with non-negative edge weights using a Min-Heap Priority Queue in O((V + E) log V) time.'
        ],
        example: {
          language: 'cpp',
          code: `// BFS Shortest Path in Unweighted Graph: O(V + E)
int shortestPath(int start, int target, int n, const std::vector<std::vector<int>>& adj) {
    std::vector<bool> visited(n, false);
    std::queue<std::pair<int, int>> q; // {node, distance}

    q.push({start, 0});
    visited[start] = true;

    while (!q.empty()) {
        auto [node, dist] = q.front();
        q.pop();

        if (node == target) return dist; // Shortest path reached!

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push({neighbor, dist + 1});
            }
        }
    }
    return -1; // Unreachable
}`,
          output: 'Shortest path found using Level-by-Level BFS in O(V + E) time.',
          annotations: [
            { line: 6, label: 'FIFO queue guarantees exploring paths in increasing order of distance', type: 'blue' },
            { line: 15, label: 'Mark visited immediately when pushing to prevent duplicate queue items', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'BFS Wavefront Expansion Algorithm',
          subtitle: 'Concentric Layers Expanding Distance from Source (0 -> 1 -> 2 -> ...)',
          elements: [
            { id: '1', label: 'Source Node', sublabel: 'Dist = 0', value: 'Root', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Layer 1 Neighbors', sublabel: 'Dist = 1', value: 'Immediate Connections', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Layer 2 Neighbors', sublabel: 'Dist = 2', value: 'Two Hops Away', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Target Node', sublabel: 'Dist = Min Hops', value: 'Shortest Distance', status: 'referenced' }
          ]
        },
        important: 'In BFS, ALWAYS mark a node as `visited = true` IMMEDIATELY upon pushing it into the queue! Marking upon pop allows duplicate entries of the same node, blowing up memory and runtime.',
        commonMistakes: [
          'Using Dijkstra\'s algorithm on graphs with NEGATIVE edge weights (Dijkstra fails on negative cycles; use Bellman-Ford instead).',
          'Attempting topological sort on a graph containing directed cycles (Topological sort is only valid for DAGs).'
        ],
        tip: 'If all edge weights in a graph are either 0 or 1, use 0-1 BFS with a `std::deque` in O(V + E) time instead of Dijkstra.',
        interviewNote: 'Question: "What is the time complexity of Dijkstra\'s algorithm using a binary heap?" Answer: "O((V + E) log V). Every vertex is extracted from the priority queue once (V log V), and every edge can potentially decrease a key (E log V)."',
        practiceQuestions: [
          {
            id: 'q-dsa9-1',
            type: 'mcq',
            question: 'Which algorithm is guaranteed to find the shortest path between two nodes in an unweighted graph in O(V + E) time?',
            options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Kruskal Algorithm', 'Floyd-Warshall'],
            correctIndex: 1,
            explanation: 'BFS explores in concentric distance waves, ensuring the first time a target vertex is reached, the path taken is the minimal hop count.'
          },
          {
            id: 'q-dsa9-2',
            type: 'output',
            question: 'What graph property is required for a valid Topological Sort ordering to exist?',
            options: ['Must be fully connected', 'Must be a Directed Acyclic Graph (DAG)', 'Must have negative weights', 'Must be a tree'],
            correctIndex: 1,
            explanation: 'Topological sorting is strictly defined only on Directed Acyclic Graphs (DAGs) because any directed cycle creates an unresolvable circular dependency.'
          }
        ],
        relatedTopics: ['Trees & BST', 'Dynamic Programming', 'Heaps & Priority Queues']
      }
    ]
  },

  // CHAPTER 10 — DYNAMIC PROGRAMMING
  {
    id: 'dsa-ch10',
    number: 10,
    title: 'Dynamic Programming (DP)',
    description: 'Overlapping subproblems, optimal substructure, memoization (top-down), tabulation (bottom-up), and Knapsack',
    topics: [
      {
        id: 'dsa-dynamic-programming',
        subjectId: 'dsa',
        chapterId: 'dsa-ch10',
        chapterNumber: 10,
        pageNumber: 10,
        title: 'Dynamic Programming: Memoization vs Tabulation & 0/1 Knapsack',
        difficulty: 'advanced',
        definition: 'Dynamic Programming (DP) optimizes problems with Overlapping Subproblems and Optimal Substructure by storing subproblem solutions in a table, transforming exponential O(2^N) runtimes into polynomial O(N) or O(N*W) time.',
        whyItMatters: 'DP solves complex optimization problems in compiler optimization, DNA sequence alignment (Needleman-Wunsch), machine learning, and quantitative finance.',
        syntax: '// 1D DP State Transition\ndp[i] = dp[i - 1] + dp[i - 2];\n// 2D Knapsack Transition\ndp[i][w] = max(dp[i - 1][w], val[i] + dp[i - 1][w - wt[i]]);',
        explanation: [
          'The Two Core Properties: 1. Overlapping Subproblems (same subproblems computed repeatedly), 2. Optimal Substructure (optimal solution to the global problem constructed from optimal solutions to subproblems).',
          'Top-Down (Memoization): Recursive approach augmented with a cache (hash map or array) to avoid re-evaluating solved branches.',
          'Bottom-Up (Tabulation): Iterative approach starting from base cases, filling an array/table sequentially without recursion stack overhead.',
          '0/1 Knapsack Problem: Given items with weights and values, find maximum value fit inside a knapsack of capacity W. Time: O(N * W), Space: O(W) using space-optimized 1D array.'
        ],
        example: {
          language: 'cpp',
          code: `// 0/1 Knapsack with Space Optimization: O(N * W) Time, O(W) Space
int knapsack(int W, const std::vector<int>& weights, const std::vector<int>& values) {
    int n = weights.size();
    std::vector<int> dp(W + 1, 0); // 1D table

    for (int i = 0; i < n; i++) {
        // Iterate backwards to prevent using the same item multiple times!
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = std::max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    return dp[W]; // Max value for capacity W
}`,
          output: 'Knapsack Capacity W = 50: Max Value = 220 (Solved in O(N*W))',
          annotations: [
            { line: 7, label: 'Iterating right-to-left ensures values reflect previous items only', type: 'yellow' },
            { line: 8, label: 'Optimal substructure: Max of excluding item vs including item', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Dynamic Programming State Transition Pipeline',
          subtitle: 'Exponential Recursion O(2^N) Pruned to Polynomial Tabulation O(N*W)',
          elements: [
            { id: '1', label: 'Overlapping Subproblem', value: 'Fib(4) / Knapsack(i, w)', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Cache Lookup', sublabel: 'Is dp[i][w] solved?', value: 'Check Memo Table', status: 'active', arrowTo: '3' },
            { id: '3', label: 'O(1) Table Hit', sublabel: 'Bypasses Re-computation', value: 'Return Stored Value', status: 'referenced' }
          ]
        },
        important: 'In 0/1 Knapsack space optimization, you MUST iterate the capacity loop backwards (`for (int w = W; w >= weight[i]; w--)`)! Iterating forwards turns the problem into Unbounded Knapsack (allowing the same item to be picked repeatedly).',
        commonMistakes: [
          'Forgetting base case initializations in the DP array (e.g. `dp[0] = 0` or `dp[0] = 1`).',
          'Attempting DP when problems do not exhibit optimal substructure (e.g. Longest Simple Path in a general graph).'
        ],
        tip: 'Always identify the DP state first: "What minimal set of parameters completely defines the subproblem at this step?"',
        interviewNote: 'Question: "What is the difference between Memoization and Tabulation?" Answer: "Memoization is top-down and recursive, solving only subproblems required along the execution path. Tabulation is bottom-up and iterative, solving all subproblems systematically in topological dependency order without recursion call stack overhead."',
        practiceQuestions: [
          {
            id: 'q-dsa10-1',
            type: 'mcq',
            question: 'Why does 0/1 Knapsack 1D space optimization require iterating the capacity loop backwards from W down to weight[i]?',
            options: [
              'To sort the items in descending order',
              'To ensure each item is used at most once by referencing values from the previous row',
              'Because negative weights require reverse traversal',
              'To prevent integer overflow'
            ],
            correctIndex: 1,
            explanation: 'Iterating backwards guarantees that dp[w - weight[i]] has not yet been updated for the current item, preserving the single-use 0/1 invariant.'
          },
          {
            id: 'q-dsa10-2',
            type: 'output',
            question: 'What is the time complexity of solving the 0/1 Knapsack problem with N items and knapsack capacity W using dynamic programming?',
            options: ['O(2^N)', 'O(N * W)', 'O(N + W)', 'O(N^2)'],
            correctIndex: 1,
            explanation: 'The DP table has dimensions N by W, where each cell is computed in O(1) time, resulting in pseudo-polynomial O(N * W) runtime.'
          }
        ],
        relatedTopics: ['Recursion & Backtracking', 'Graph Traversal', 'Hash Tables']
      }
    ]
  }
];
