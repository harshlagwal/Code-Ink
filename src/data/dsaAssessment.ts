import { FinalAssessment } from '../types/notebook';

export const DSA_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'dsa',
  title: 'Data Structures & Algorithms Final Paper',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Algorithmic Complexity, Primitives & Invariants',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dsa-a1',
          section: 'A',
          marks: 1,
          topic: 'Asymptotic Bounds',
          question: 'Which asymptotic notation represents a strict, tight bound where upper and lower growth limits match?',
          options: ['Big-O (O)', 'Big-Omega (Ω)', 'Big-Theta (Θ)', 'Little-o (o)'],
          correctIndex: 2,
          explanation: 'Big-Theta (Θ) defines a tight asymptotic bound where f(N) is both O(g(N)) and Ω(g(N)).'
        },
        {
          id: 'dsa-a2',
          section: 'A',
          marks: 1,
          topic: 'Dynamic Array Resizing',
          question: 'What is the amortized time complexity of inserting an element at the end of a dynamic array (like std::vector or ArrayList)?',
          options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
          correctIndex: 2,
          explanation: 'Geometric capacity doubling yields an amortized constant time O(1) per insertion over N operations.'
        },
        {
          id: 'dsa-a3',
          section: 'A',
          marks: 1,
          topic: 'Linked List Head Deletion',
          question: 'What is the time complexity of deleting the head node of a singly linked list when given the pointer to the head?',
          options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
          correctIndex: 1,
          explanation: 'Deleting the head only requires advancing the head pointer to head->next, taking O(1) constant time.'
        },
        {
          id: 'dsa-a4',
          section: 'A',
          marks: 1,
          topic: 'Stack Invariant',
          question: 'Which structural principle governs a Stack data structure?',
          options: ['First-In, First-Out (FIFO)', 'Last-In, First-Out (LIFO)', 'Priority Order', 'Random Access'],
          correctIndex: 1,
          explanation: 'Stacks operate strictly on the Last-In, First-Out (LIFO) order.'
        },
        {
          id: 'dsa-a5',
          section: 'A',
          marks: 1,
          topic: 'Hash Collisions',
          question: 'What happens to average hash table lookup time if all keys hash to the exact same bucket?',
          options: ['Remains O(1)', 'Degrades to O(N)', 'Improves to O(log N)', 'Throws compiler error'],
          correctIndex: 1,
          explanation: 'When all keys collide into a single chain, lookups degrade to linear traversal O(N).'
        },
        {
          id: 'dsa-a6',
          section: 'A',
          marks: 1,
          topic: 'BST Inorder Traversal',
          question: 'What sequence is produced by performing an Inorder (Left, Root, Right) traversal on a valid Binary Search Tree?',
          options: ['Decreasing order', 'Strictly increasing sorted order', 'Random level order', 'Reverse postorder'],
          correctIndex: 1,
          explanation: 'Inorder traversal of a BST always yields keys in ascending sorted order.'
        },
        {
          id: 'dsa-a7',
          section: 'A',
          marks: 1,
          topic: 'Complete Binary Heap',
          question: 'In a 0-indexed binary heap array, what is the index of the left child of node at index i?',
          options: ['2 * i', '2 * i + 1', '2 * i + 2', 'i / 2'],
          correctIndex: 1,
          explanation: 'In a 0-indexed array representation, Left Child = 2 * i + 1, and Right Child = 2 * i + 2.'
        },
        {
          id: 'dsa-a8',
          section: 'A',
          marks: 1,
          topic: 'Unweighted Shortest Path',
          question: 'Which traversal algorithm finds the shortest path in an unweighted graph in O(V + E) time?',
          options: ['DFS', 'BFS', 'Preorder', 'Kruskal'],
          correctIndex: 1,
          explanation: 'Breadth-First Search (BFS) expands in concentric waves, guaranteeing the shortest hop distance.'
        },
        {
          id: 'dsa-a9',
          section: 'A',
          marks: 1,
          topic: 'Dynamic Programming Requirements',
          question: 'What two properties are mandatory for a problem to be solvable via Dynamic Programming?',
          options: [
            'NP-Hardness and Linear Space',
            'Overlapping Subproblems and Optimal Substructure',
            'Sorted Input and Binary Tree Hierarchy',
            'Greedy Choice and Constant Time'
          ],
          correctIndex: 1,
          explanation: 'DP applies exclusively to problems exhibiting both Overlapping Subproblems and Optimal Substructure.'
        },
        {
          id: 'dsa-a10',
          section: 'A',
          marks: 1,
          topic: 'Topological Sort Applicability',
          question: 'Topological sorting can ONLY be performed on which type of graph?',
          options: ['Undirected graph', 'Directed Acyclic Graph (DAG)', 'Complete graph with cycles', 'Bipartite graph'],
          correctIndex: 1,
          explanation: 'Topological sorting is strictly defined for Directed Acyclic Graphs (DAGs) because cycles create circular dependencies.'
        }
      ]
    },

    sectionB: {
      title: 'Section B: Algorithmic Patterns, Data Structures & Optimization',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dsa-b1',
          section: 'B',
          marks: 1,
          topic: 'Two-Pointer Technique',
          question: 'Explain why the Two-Pointer convergent technique solves the Two-Sum problem on a sorted array in O(N) time with O(1) space instead of O(N^2).',
          options: [
            'It generates all pairs in parallel threads',
            'Because the array is sorted, comparing sum with target allows discarding an entire row/column of candidates monotonically without backtracking',
            'It uses a hash table internally',
            'It divides the array using binary recursion'
          ],
          correctIndex: 1,
          explanation: 'If sum < target, left pointer must advance to increase sum; if sum > target, right pointer must decrease. Each step eliminates a candidate, visiting each element at most once.'
        },
        {
          id: 'dsa-b2',
          section: 'B',
          marks: 1,
          topic: 'Floyd\'s Cycle Finding Mechanics',
          question: 'Why does fast pointer (2X speed) and slow pointer (1X speed) guarantee cycle detection without infinite loop skipping?',
          options: [
            'Fast pointer always stops at the cycle head',
            'Inside a cycle of length C, the relative distance between fast and slow decreases by exactly 1 node per iteration, making collision mathematically inevitable',
            'Fast pointer reverses direction upon entering a loop',
            'Slow pointer holds the memory lock'
          ],
          correctIndex: 1,
          explanation: 'The distance between fast and slow in the cycle changes by (2 - 1) = 1 node per step. A gap decreasing by 1 modulo C must reach 0.'
        },
        {
          id: 'dsa-b3',
          section: 'B',
          marks: 1,
          topic: 'Monotonic Stack Amortized Analysis',
          question: 'Although Next Greater Element has a nested while loop inside a for loop, why is its time complexity strictly O(N)?',
          options: [
            'Because the array size is small',
            'Each element is pushed onto the stack exactly once and popped at most once across the entire algorithm, bounding total operations to 2N',
            'The compiler optimizes the while loop to O(1)',
            'Stack operations run on GPU cores'
          ],
          correctIndex: 1,
          explanation: 'By aggregate analysis, at most N pushes and N pops occur across all loop iterations combined, yielding O(N) amortized linear time.'
        },
        {
          id: 'dsa-b4',
          section: 'B',
          marks: 1,
          topic: 'Bottom-Up Heapify Complexity',
          question: 'Why does building a binary heap using bottom-up heapify take O(N) time rather than O(N log N)?',
          options: [
            'Heaps do not store pointers',
            'Most nodes reside near the leaves (height 0 and 1) where sift-down operations require at most 0 or 1 comparisons; summing h / 2^h converges to O(1)',
            'Heapify uses bucket sort',
            'Building a heap is O(N log N) in reality'
          ],
          correctIndex: 1,
          explanation: 'Half the nodes are leaves requiring 0 swaps. The summation of (N / 2^(h+1)) * h converges to O(N).'
        },
        {
          id: 'dsa-b5',
          section: 'B',
          marks: 1,
          topic: 'Validating BST Bounds',
          question: 'Why does verifying only `node->left < node && node->right > node` fail to validate a Binary Search Tree?',
          options: [
            'It does not check null pointers',
            'It only validates local parent-child relationships and fails to detect ancestor violations (e.g. a right child in a left subtree exceeding root value)',
            'It runs in O(N^2) time',
            'Inorder traversal is required'
          ],
          correctIndex: 1,
          explanation: 'A BST requires that EVERY node in the left subtree is less than the root, which requires propagating ancestral min/max bounds downward.'
        },
        {
          id: 'dsa-b6',
          section: 'B',
          marks: 1,
          topic: 'Dijkstra vs Bellman-Ford',
          question: 'Under what specific condition will Dijkstra\'s algorithm fail to find the correct shortest path, requiring Bellman-Ford instead?',
          options: [
            'Graphs with more than 10,000 vertices',
            'Graphs containing negative edge weights or negative weight cycles',
            'Unweighted graphs',
            'Directed Acyclic Graphs (DAGs)'
          ],
          correctIndex: 1,
          explanation: 'Dijkstra greedily assumes once a vertex is visited with minimum distance, its distance cannot decrease. Negative edges violate this greedy invariant.'
        },
        {
          id: 'dsa-b7',
          section: 'B',
          marks: 1,
          topic: '0/1 Knapsack Space Optimization',
          question: 'Why does space-optimizing 0/1 Knapsack from a 2D array to a 1D array require iterating the capacity loop in reverse order?',
          options: [
            'To sort items by value-to-weight ratio',
            'Iterating backwards ensures dp[w - weight[i]] references values from the PREVIOUS item iteration, preventing an item from being reused multiple times',
            'To prevent negative array index out-of-bounds errors',
            'To support fractional values'
          ],
          correctIndex: 1,
          explanation: 'If iterated forwards, dp[w - weight[i]] would contain the result including item i, transforming the problem into Unbounded Knapsack.'
        },
        {
          id: 'dsa-b8',
          section: 'B',
          marks: 1,
          topic: 'Sliding Window Invariant',
          question: 'In the Sliding Window technique, what defines the window expansion and contraction phases?',
          options: [
            'Both pointers advance at identical speeds constantly',
            'The right pointer expands to absorb elements until the target condition is satisfied/violated, then the left pointer contracts to optimize or restore the invariant',
            'Pointers jump randomly using a hash function',
            'The window doubles in size every step'
          ],
          correctIndex: 1,
          explanation: 'Sliding window expands rightwards to include new data, then shrinks leftwards to maintain the required validity invariant.'
        },
        {
          id: 'dsa-b9',
          section: 'B',
          marks: 1,
          topic: 'Kahn\'s Algorithm for Topological Sort',
          question: 'How does Kahn\'s Algorithm detect the presence of a directed cycle in a graph?',
          options: [
            'It checks if edge weights are negative',
            'If the total count of vertices processed via the in-degree zero queue is LESS than V, a directed cycle exists preventing in-degrees from reaching zero',
            'It throws a stack overflow exception',
            'It tracks memory heap allocations'
          ],
          correctIndex: 1,
          explanation: 'Nodes inside a cycle always have in-degree >= 1, so they can never enter the in-degree zero queue, causing the processed count to be less than V.'
        },
        {
          id: 'dsa-b10',
          section: 'B',
          marks: 1,
          topic: 'Prefix Sums vs Segment Trees',
          question: 'When should an engineer upgrade from a Prefix Sum array to a Segment Tree or Fenwick Tree (Binary Indexed Tree)?',
          options: [
            'When the array contains negative numbers',
            'When the underlying array elements are dynamically updated between range sum queries (prefix sums require O(N) updates; Segment Trees update in O(log N))',
            'When array size is smaller than 100',
            'When memory is limited to 1MB'
          ],
          correctIndex: 1,
          explanation: 'Prefix sums answer static queries in O(1) but take O(N) to update. Segment Trees support both point updates and range queries in O(log N).'
        }
      ]
    },

    sectionC: {
      title: 'Section C: Advanced Systems Algorithms, Hard Problems & Architecture',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dsa-c1',
          section: 'C',
          marks: 1,
          topic: 'LRU Cache Design',
          question: 'Design a Least Recently Used (LRU) Cache supporting get(key) and put(key, value) in strictly O(1) time complexity. Which data structure composition achieves this?',
          options: [
            'A single sorted array with binary search',
            'A Hash Map paired with a Doubly Linked List (Hash Map provides O(1) node lookup; Doubly Linked List allows O(1) node removal and insertion at head/tail)',
            'A Min-Heap with timestamp priorities',
            'A self-balancing AVL Tree'
          ],
          correctIndex: 1,
          explanation: 'A Hash Map maps keys to Doubly Linked List node pointers. When accessed or inserted, the node is spliced and moved to the front in O(1) time.'
        },
        {
          id: 'dsa-c2',
          section: 'C',
          marks: 1,
          topic: 'Median of Two Sorted Arrays',
          question: 'How does the optimal algorithm find the median of two sorted arrays of sizes M and N in O(log(min(M, N))) time?',
          options: [
            'Merge both arrays and take the middle element in O(M + N)',
            'Perform binary search on the partition cut of the smaller array, ensuring the left halves of both arrays contain half of total elements and maxLeft <= minRight',
            'Use a min-heap of size (M + N) / 2',
            'Sort the combined arrays with QuickSort'
          ],
          correctIndex: 1,
          explanation: 'Binary searching the partition cut on the smaller array finds the balance point where all left-partition elements are <= right-partition elements in O(log(min(M, N))).'
        },
        {
          id: 'dsa-c3',
          section: 'C',
          marks: 1,
          topic: 'Disjoint Set Union (DSU / Union-Find)',
          question: 'What optimization techniques allow Disjoint Set Union (Union-Find) to achieve near-constant amortized O(α(N)) time per operation?',
          options: [
            'Hash indexing and AVL balancing',
            'Path Compression (flattening tree structure during find) combined with Union by Rank/Size (attaching smaller tree under root of larger tree)',
            'Sorting edges by weight with Kruskal algorithm',
            'Using a multithreaded queue'
          ],
          correctIndex: 1,
          explanation: 'Path compression flattens the tree on finds, and union by rank keeps trees shallow, reducing operation cost to the Inverse Ackermann function α(N) <= 4.'
        },
        {
          id: 'dsa-c4',
          section: 'C',
          marks: 1,
          topic: 'Trie (Prefix Tree) Architecture',
          question: 'Why is a Trie (Prefix Tree) superior to a Hash Table for auto-complete search engines and IP routing prefix lookups?',
          options: [
            'Tries consume less memory than arrays',
            'Tries allow finding all words sharing a common prefix P in O(length(P)) time, whereas hash tables cannot perform prefix queries without scanning all keys',
            'Tries execute on the CPU cache directly',
            'Tries support negative strings'
          ],
          correctIndex: 1,
          explanation: 'Hash tables only support exact match lookups. A Trie stores shared prefixes along common branches, allowing prefix retrieval in O(L) time.'
        },
        {
          id: 'dsa-c5',
          section: 'C',
          marks: 1,
          topic: 'A* Search vs Dijkstra',
          question: 'How does the A* Search algorithm improve upon Dijkstra\'s algorithm for GPS routing and pathfinding on spatial grids?',
          options: [
            'A* uses a queue instead of a priority queue',
            'A* incorporates an admissible heuristic function h(n) (e.g. Euclidean or Manhattan distance) into priority f(n) = g(n) + h(n), guiding search toward the target and pruning irrelevant exploration',
            'A* ignores obstacle vertices',
            'A* is an unweighted algorithm'
          ],
          correctIndex: 1,
          explanation: 'By incorporating an admissible heuristic estimating remaining distance to target, A* biases the priority queue toward the goal, dramatically cutting visited nodes.'
        },
        {
          id: 'dsa-c6',
          section: 'C',
          marks: 1,
          topic: 'Longest Increasing Subsequence (LIS)',
          question: 'How does the patience sorting / binary search algorithm solve the Longest Increasing Subsequence (LIS) in O(N log N) time instead of O(N^2) DP?',
          options: [
            'By sorting the input array in advance',
            'By maintaining an array tails[] where tails[i] stores the smallest tail of all increasing subsequences of length i+1, updating it via std::lower_bound in O(log N)',
            'By constructing a suffix automaton',
            'By using two-pointer convergence'
          ],
          correctIndex: 1,
          explanation: 'Using binary search (lower_bound) to find where each element fits in tails[] maintains the minimal possible tail for every length, resulting in O(N log N) total runtime.'
        },
        {
          id: 'dsa-c7',
          section: 'C',
          marks: 1,
          topic: 'Minimum Spanning Tree (MST)',
          question: 'Compare Kruskal\'s Algorithm vs Prim\'s Algorithm for finding the Minimum Spanning Tree (MST) of a connected, undirected weighted graph.',
          options: [
            'Kruskal is O(V^2); Prim is O(E^2)',
            'Kruskal sorts all edges and uses DSU to prevent cycles (O(E log E), optimal for sparse graphs); Prim grows a single tree outward using a priority queue (O(E log V), optimal for dense graphs)',
            'Kruskal only works on directed graphs',
            'Prim cannot handle floating point weights'
          ],
          correctIndex: 1,
          explanation: 'Kruskal sorts global edges and uses Union-Find (better for sparse graphs where E << V^2). Prim expands greedily from a vertex via priority queue.'
        },
        {
          id: 'dsa-c8',
          section: 'C',
          marks: 1,
          topic: 'KMP String Matching Algorithm',
          question: 'How does the Knuth-Morris-Pratt (KMP) algorithm achieve O(N + M) worst-case pattern matching without backtracking the main text pointer?',
          options: [
            'It computes rolling polynomial hashes',
            'It precomputes a Longest Prefix which is also Suffix (LPS) array on the pattern, allowing the pattern index to jump backward to the longest known prefix match upon a mismatch',
            'It compresses the text using Huffman coding',
            'It constructs a 2D matrix of text characters'
          ],
          correctIndex: 1,
          explanation: 'The LPS (π) array captures repeating sub-patterns. Upon mismatch, the pattern pointer jumps back according to LPS without ever rewinding the text pointer.'
        },
        {
          id: 'dsa-c9',
          section: 'C',
          marks: 1,
          topic: 'Sliding Window Maximum with Monotonic Deque',
          question: 'How does a Double-Ended Queue (Deque) maintain the maximum in a sliding window of size K in strictly O(N) time across the entire array?',
          options: [
            'It sorts the window on every slide in O(K log K)',
            'It maintains indices in strictly decreasing value order; elements entering pop smaller items from back, elements outside window pop from front; front is always current window max in O(1)',
            'It uses a balanced AVL tree',
            'It recalculates the max using a linear loop'
          ],
          correctIndex: 1,
          explanation: 'By storing indices and popping smaller elements from the back before inserting, the deque front always holds the index of the maximum element in the current window in O(1) amortized time.'
        },
        {
          id: 'dsa-c10',
          section: 'C',
          marks: 1,
          topic: 'Bit Manipulation & Bitmasks',
          question: 'How does bitmask dynamic programming solve the Traveling Salesperson Problem (TSP) in O(N^2 * 2^N) time instead of brute-force O(N!) factorial time?',
          options: [
            'It ignores city distances',
            'It uses an integer bitmask of N bits to represent visited subsets of cities (state: mask, current_city), memoizing overlapping subproblem solutions in a DP table of size 2^N by N',
            'It uses floating-point bits to approximate distances',
            'It converts the graph into an unweighted tree'
          ],
          correctIndex: 1,
          explanation: 'Bitmask DP represents visited city states compactly using binary bits (e.g. 1011_2 means cities 0, 1, and 3 are visited), caching subproblem paths in a 2^N * N table.'
        }
      ]
    }
  }
};
