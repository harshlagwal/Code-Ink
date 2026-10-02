import { SubjectQuestionPapers } from '../../types/notebook';

export const DSA_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'dsa',
  subjectName: 'Data Structures & Algorithms Engineering',
  courseCode: 'CS-106-DSA',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-106-DSA-S1',
      title: 'Data Structures, Complexity & Graph Algorithms Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-106-DSA',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).',
        'Draw clear algorithm step-by-step trace tables, recursion trees, and graph adjacency structures.'
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
              id: 'dsa-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Asymptotic Notations',
              question: 'Differentiate between Big-O ($O$), Big-Omega ($\\Omega$), and Big-Theta ($\\Theta$) notations.',
              markingBreakdown: ['Upper bound (O), lower bound (Omega), tight bound (Theta): 1 Mark'],
              modelSolution: '$O(g(n))$ gives the asymptotic upper bound (worst-case growth rate); $\\Omega(g(n))$ gives the asymptotic lower bound (best-case); $\\Theta(g(n))$ gives the asymptotically tight bound (both upper and lower bounds).',
              notebookCheckpoints: ['O = Upper bound', 'Omega = Lower bound', 'Theta = Tight bound']
            },
            {
              id: 'dsa-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Master Theorem',
              question: 'State the time complexity solved by the Master Theorem for the recurrence: $T(n) = 2T(n/2) + O(n)$.',
              markingBreakdown: ['O(n log n): 1 Mark'],
              modelSolution: '$T(n) = O(n \\log n)$. Here $a = 2, b = 2, f(n) = n$. $\\log_b a = \\log_2 2 = 1$. Since $f(n) = \\Theta(n^{\\log_b a})$, Master Theorem Case 2 applies: $T(n) = \\Theta(n \\log n)$.',
              notebookCheckpoints: ['O(n log n)', 'Master Theorem Case 2']
            },
            {
              id: 'dsa-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Tree Height vs Nodes',
              question: 'What is the maximum number of nodes in a binary tree of height $h$ (where root is at height 0)?',
              markingBreakdown: ['2^(h + 1) - 1: 1 Mark'],
              modelSolution: '$2^{h+1} - 1$ (e.g. for height 2: $2^3 - 1 = 7$ nodes).',
              notebookCheckpoints: ['2^(h+1) - 1']
            },
            {
              id: 'dsa-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Stable Sorting Algorithms',
              question: 'Define what makes a sorting algorithm "Stable", and identify whether Quick Sort is stable.',
              markingBreakdown: ['Preserves relative order of duplicate keys; QuickSort is unstable: 1 Mark'],
              modelSolution: 'A sorting algorithm is Stable if it preserves the relative original input order of duplicate/equal keys. Standard Quick Sort is NOT stable because partitioning swaps elements across distant indices.',
              notebookCheckpoints: ['Preserves relative order of duplicate keys', 'QuickSort is unstable']
            },
            {
              id: 'dsa-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Hash Table Load Factor',
              question: 'Define Load Factor ($\\alpha$) in a hash table with $n$ elements and $m$ buckets.',
              markingBreakdown: ['alpha = n / m: 1 Mark'],
              modelSolution: '$\\alpha = n / m$, where $n$ is the total number of inserted elements and $m$ is the total number of buckets.',
              notebookCheckpoints: ['alpha = n / m']
            },
            {
              id: 'dsa-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Binary Search Precondition',
              question: 'What strict precondition must a collection satisfy for Binary Search to operate in $O(\\log N)$ time?',
              markingBreakdown: ['Must be sorted and support O(1) random access: 1 Mark'],
              modelSolution: 'The elements must be sorted in monotonic order and stored in a data structure that provides $O(1)$ random access indexing (such as an array).',
              notebookCheckpoints: ['Must be sorted', 'O(1) random access']
            },
            {
              id: 'dsa-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Graph Degrees (Handshaking Lemma)',
              question: 'State the Handshaking Lemma relating the sum of vertex degrees to the number of edges $|E|$ in an undirected graph.',
              markingBreakdown: ['Sum of degrees = 2 * |E|: 1 Mark'],
              modelSolution: '$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$. (The sum of degrees of all vertices equals twice the total number of edges).',
              notebookCheckpoints: ['Sum of degrees = 2 * |E|']
            },
            {
              id: 'dsa-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Min-Heap Property',
              question: 'State the structural and ordering properties that define a Min-Heap.',
              markingBreakdown: ['Complete binary tree and parent <= both children: 1 Mark'],
              modelSolution: '1. Shape Property: Must be a Complete Binary Tree (all levels filled except possibly the last, which is filled from left to right).\n2. Heap Order Property: The key of each node is less than or equal to the keys of its children (`root` holds minimum).',
              notebookCheckpoints: ['Complete binary tree', 'Parent <= children']
            },
            {
              id: 'dsa-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Dynamic Programming Requirements',
              question: 'Name the two key properties a problem must possess for Dynamic Programming to apply.',
              markingBreakdown: ['Optimal Substructure and Overlapping Subproblems: 1 Mark'],
              modelSolution: '1. Optimal Substructure (an optimal solution to the problem contains within it optimal solutions to subproblems).\n2. Overlapping Subproblems (a recursive algorithm visits the same subproblems repeatedly).',
              notebookCheckpoints: ['Optimal Substructure', 'Overlapping Subproblems']
            },
            {
              id: 'dsa-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Trie Complexity',
              question: 'What is the time complexity to search for a word of length $L$ in a Trie containing $N$ total words?',
              markingBreakdown: ['O(L), independent of N: 1 Mark'],
              modelSolution: '$O(L)$, where $L$ is the length of the query word. Search time depends only on word length and is completely independent of the total number of words $N$ stored in the Trie.',
              notebookCheckpoints: ['O(L)', 'Independent of N']
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
              id: 'dsa-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Linked List Cycle Detection (Floyd\'s Algorithm)',
              question: 'Explain Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare):\n(a) Write the algorithm to detect if a cycle exists in a singly linked list in $O(N)$ time and $O(1)$ space.\n(b) Prove mathematically how advancing a slow pointer by 1 step and a fast pointer by 2 steps guarantees detection if a cycle exists.\n(c) Show how to find the exact starting node of the loop.',
              markingBreakdown: [
                'Algorithm implementation (slow and fast pointers): 2 Marks',
                'Mathematical proof of meeting point: 1.5 Marks',
                'Finding cycle entrance node: 1.5 Marks'
              ],
              modelSolution: `\`\`\`c
// (a) Cycle Detection & Entrance Node
Node* findCycleStart(Node *head) {
    if (!head || !head->next) return NULL;
    Node *slow = head, *fast = head;

    // Step 1: Detect collision
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break; // Collision point
    }
    if (!fast || !fast->next) return NULL; // No cycle

    // Step 2: Reset slow to head, advance both 1 step to meet at entrance
    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow; // Cycle entrance!
}
\`\`\`
Mathematical Proof:
Let $L$ be the distance from head to cycle entrance, $C$ be cycle length, and $k$ be distance from entrance to collision.
- Slow travels: $d_{\\text{slow}} = L + k$.
- Fast travels: $d_{\\text{fast}} = L + k + nC$.
Since fast moves twice as fast: $2(L + k) = L + k + nC \\implies L + k = nC \\implies L = nC - k$.
Therefore, walking $L$ steps from head and $L$ steps from the collision point brings both pointers to the exact cycle entrance node.`,
              notebookCheckpoints: [
                'slow moves 1 step, fast moves 2 steps',
                'Reset slow to head to find entrance',
                'Mathematical formula: L = nC - k'
              ]
            },
            {
              id: 'dsa-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Heapify & Binary Heap Build in O(N) Time',
              question: 'Demonstrate why building a binary heap from an unsorted array takes $O(N)$ time rather than $O(N \\log N)$:\n(a) Write the `max_heapify(arr, n, i)` algorithm.\n(b) Write the `build_max_heap(arr, n)` loop running from `n/2 - 1` down to 0.\n(c) Write down the mathematical Taylor series summation proof: $\\sum_{h=0}^{\\log n} \\frac{h}{2^h} = 2$.',
              markingBreakdown: [
                'max_heapify implementation: 2 Marks',
                'build_max_heap bottom-up loop: 1 Mark',
                'Summation proof establishing O(N): 2 Marks'
              ],
              modelSolution: `\`\`\`c
void max_heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        max_heapify(arr, n, largest);
    }
}

void build_max_heap(int arr[], int n) {
    // Bottom-up heapify from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        max_heapify(arr, n, i);
    }
}
\`\`\`
Mathematical Proof:
A node at height $h$ takes $O(h)$ work. There are at most $\\lceil n / 2^{h+1} \\rceil$ nodes at height $h$.
Total work: $T(n) = \\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{h+1}} O(h) = \\frac{n}{2} \\sum_{h=0}^{\\infty} \\frac{h}{2^h}$.
Since $\\sum_{h=0}^{\\infty} \\frac{h}{2^h} = \\frac{1/2}{(1 - 1/2)^2} = 2$.
$T(n) = \\frac{n}{2} \\cdot 2 = O(n)$.`,
              notebookCheckpoints: [
                'Loop from n/2 - 1 down to 0',
                'Sum of h / 2^h converges to 2',
                'Total complexity is O(N)'
              ]
            },
            {
              id: 'dsa-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Tree Traversals: Inorder Traversal Without Recursion',
              question: 'Implement an iterative Inorder Traversal of a Binary Tree using an explicit LIFO Stack in $O(N)$ time and $O(H)$ space without recursion. Trace your algorithm on the tree `{root: 1, left: 2, right: 3, left.left: 4, left.right: 5}`.',
              markingBreakdown: [
                'Iterative stack algorithm code: 3 Marks',
                'Trace table on given tree yielding [4, 2, 5, 1, 3]: 2 Marks'
              ],
              modelSolution: `\`\`\`python
def inorder_iterative(root):
    stack = []
    result = []
    curr = root

    while curr or stack:
        # Push all left children onto stack
        while curr:
            stack.append(curr)
            curr = curr.left

        curr = stack.pop()
        result.append(curr.val) # Visit node
        curr = curr.right       # Traverse to right subtree

    return result
\`\`\`
Trace on Given Tree:
1. Push 1, push 2, push 4. Stack: [1, 2, 4].
2. Pop 4 -> Output: [4]. (4 has no right child).
3. Pop 2 -> Output: [4, 2]. Move to right child 5. Push 5.
4. Pop 5 -> Output: [4, 2, 5].
5. Pop 1 -> Output: [4, 2, 5, 1]. Move to right child 3. Push 3.
6. Pop 3 -> Output: [4, 2, 5, 1, 3].
Final Result: 4, 2, 5, 1, 3.`,
              notebookCheckpoints: [
                'While loop pushing left children',
                'Pop and visit, then move to right child',
                'Final order: 4, 2, 5, 1, 3'
              ]
            },
            {
              id: 'dsa-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Dynamic Programming: 0/1 Knapsack Problem',
              question: 'Given items with weights $W = [1, 3, 4, 5]$ and values $V = [1, 4, 5, 7]$, find the maximum value that fits in a knapsack of capacity $C = 7$.\n(a) Write the dynamic programming recurrence relation.\n(b) Draw the complete 2D DP matrix in your notebook.\n(c) Backtrack and identify the exact items selected.',
              markingBreakdown: [
                'DP recurrence relation: 1.5 Marks',
                'Completed 2D DP table: 2 Marks',
                'Backtracking item identification: 1.5 Marks'
              ],
              modelSolution: `(a) Recurrence:
\`\`\`
dp[i][w] = dp[i-1][w] if weights[i-1] > w
dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])
\`\`\`

(b) DP Table:
Cap w:   0  1  2  3  4  5  6  7
i=0:     0  0  0  0  0  0  0  0
i=1 (1,1):0 1  1  1  1  1  1  1
i=2 (3,4):0 1  1  4  5  5  5  5
i=3 (4,5):0 1  1  4  5  6  6  9
i=4 (5,7):0 1  1  4  5  7  8  9

Maximum Value = 9.

(c) Backtracking:
- dp[4][7] = 9 == dp[3][7] -> Item 4 not taken.
- dp[3][7] = 9 != dp[2][7] (5) -> Item 3 (w=4, v=5) TAKEN! Remaining capacity = 7 - 4 = 3.
- dp[2][3] = 4 != dp[1][3] (1) -> Item 2 (w=3, v=4) TAKEN! Remaining capacity = 3 - 3 = 0.
Items selected: Item 2 and Item 3. Total weight = 3 + 4 = 7, Total value = 4 + 5 = 9.`,
              notebookCheckpoints: [
                'State recurrence formula',
                'Draw full 5x8 table',
                'Selected items: Item 2 (w=3, v=4) and Item 3 (w=4, v=5)'
              ]
            },
            {
              id: 'dsa-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Graph Traversal: Topological Sort & Cycle Detection (Kahn\'s Algorithm)',
              question: 'Explain Kahn\'s Algorithm for Topological Sorting of a Directed Acyclic Graph (DAG) using in-degrees:\n(a) Write the algorithm using a queue.\n(b) Explain how Kahn\'s algorithm detects directed cycles.\n(c) State time and space complexities.',
              markingBreakdown: [
                'Kahn\'s algorithm implementation: 2.5 Marks',
                'Cycle detection mechanism: 1.5 Marks',
                'Complexity: 1 Mark'
              ],
              modelSolution: `\`\`\`python
from collections import deque

def kahn_topological_sort(num_nodes, adj_list):
    in_degree = [0] * num_nodes
    for u in range(num_nodes):
        for v in adj_list[u]:
            in_degree[v] += 1

    queue = deque([i for i in range(num_nodes) if in_degree[i] == 0])
    topo_order = []

    while queue:
        u = queue.popleft()
        topo_order.append(u)
        for v in adj_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # (b) Cycle Detection:
    if len(topo_order) != num_nodes:
        raise ValueError("Graph contains a cycle! No topological ordering exists.")

    return topo_order
\`\`\`
Complexity:
Time: $O(V + E)$ to compute in-degrees and process edges.
Space: $O(V)$ for queue and in-degree array.`,
              notebookCheckpoints: [
                'in-degree calculation',
                'Queue initialized with in-degree 0 nodes',
                'If len(topo_order) != V, graph has cycle'
              ]
            },
            {
              id: 'dsa-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Disjoint Set Union (DSU) / Union-Find',
              question: 'Implement a Disjoint Set Union (DSU) data structure with:\n(a) Path Compression optimization in `find(x)`.\n(b) Union by Rank optimization in `union(x, y)`.\n(c) Explain why these two optimizations together reduce operational complexity to $O(\\alpha(N))$ (Inverse Ackermann function).',
              markingBreakdown: [
                'find with path compression: 2 Marks',
                'union by rank: 2 Marks',
                'Inverse Ackermann complexity explanation: 1 Mark'
              ],
              modelSolution: `\`\`\`python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    # (a) Path Compression
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # Flatten tree
        return self.parent[x]

    # (b) Union by Rank
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False # Already in same set
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True
\`\`\`
Complexity:
Path compression flattens the tree so subsequent lookups are direct, while union by rank prevents lopsided tall trees. Together they yield nearly constant amortized time $O(\\alpha(N))$, where $\\alpha(N) \\le 4$ for all practical universe inputs.`,
              notebookCheckpoints: [
                'parent[x] = find(parent[x]) path compression',
                'rank comparison in union',
                'Inverse Ackermann O(alpha(N))'
              ]
            },
            {
              id: 'dsa-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Sliding Window: Longest Substring Without Repeating Characters',
              question: 'Write an algorithm in $O(N)$ time and $O(\\min(N, \\Sigma))$ space to find the length of the longest substring without repeating characters using a Sliding Window and Hash Map.\nExample: `"abcabcbb"` -> 3 (`"abc"`). Trace with window boundaries `left` and `right`.',
              markingBreakdown: [
                'Sliding window algorithm code: 3 Marks',
                'Dry-run trace on "abcabcbb": 2 Marks'
              ],
              modelSolution: `\`\`\`python
def length_of_longest_substring(s):
    char_index = {}
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1 # Fast-forward left boundary

        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len
\`\`\`
Trace on "abcabcbb":
- right=0 \'a\': char_index={\'a\':0}, max_len=1
- right=1 \'b\': char_index={\'a\':0, \'b\':1}, max_len=2
- right=2 \'c\': char_index={\'a\':0, \'b\':1, \'c\':2}, max_len=3
- right=3 \'a\': duplicate \'a\' at 0 -> left=1, char_index[\'a\']=3, len=3-1+1=3
- right=4 \'b\': duplicate \'b\' at 1 -> left=2, char_index[\'b\']=4, len=4-2+1=3
- right=5 \'c\': duplicate \'c\' at 2 -> left=3, char_index[\'c\']=5, len=5-3+1=3
- right=6 \'b\': duplicate \'b\' at 4 -> left=5, char_index[\'b\']=6, len=6-5+1=2
- right=7 \'b\': duplicate \'b\' at 6 -> left=7, char_index[\'b\']=7, len=7-7+1=1
Max Length = 3.`,
              notebookCheckpoints: [
                'Update left = char_index[char] + 1',
                'Track max_len = max(max_len, right - left + 1)'
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
              id: 'dsa-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Graph Algorithms: Shortest Path Engine (Dijkstra\'s Algorithm)',
              question: 'Design and implement Dijkstra\'s Shortest Path Algorithm for weighted non-negative directed graphs:\n(a) Priority Queue / Min-Heap implementation storing `(distance, vertex)` pairs.\n(b) Distance array initialized to $\\infty$ and predecessor array for path reconstruction.\n(c) Full algorithm code returning shortest distances and full paths.\n(d) Prove why Dijkstra\'s algorithm fails on graphs with negative weight edges.\n(e) Compute time complexity using a Binary Min-Heap: $O((V + E) \\log V)$.',
              markingBreakdown: [
                'Algorithm implementation with Priority Queue: 3.5 Marks',
                'Path reconstruction logic: 2 Marks',
                'Negative edge failure proof and counter-example: 2.5 Marks',
                'Time complexity derivation: 2 Marks'
              ],
              modelSolution: `\`\`\`python
import heapq

def dijkstra(num_vertices, adj_list, source):
    dist = [float('inf')] * num_vertices
    pred = [-1] * num_vertices
    dist[source] = 0

    # Min-heap stores (distance, vertex)
    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        # Skip stale entries
        if d > dist[u]:
            continue

        for v, weight in adj_list[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                pred[v] = u
                heapq.heappush(pq, (dist[v], v))

    return dist, pred

def reconstruct_path(pred, target):
    path = []
    curr = target
    while curr != -1:
        path.append(curr)
        curr = pred[curr]
    return path[::-1]
\`\`\`
Negative Edge Failure Proof:
Dijkstra is a Greedy algorithm. Once a vertex $u$ is popped from the priority queue, Dijkstra assumes its shortest path is permanently finalized and never updates it.
Counter-Example:
Edges: $A \\to B$ (weight 2), $A \\to C$ (weight 5), $C \\to B$ (weight -10).
Dijkstra pops $B$ first with distance 2. Later it explores $C$ (dist 5) and finds $C \\to B$ gives total distance $5 + (-10) = -5$. But because $B$ was already marked visited, Dijkstra cannot correct $B$\'s distance, yielding the wrong answer. Use Bellman-Ford for negative weights.

Complexity Derivation:
- Every vertex is inserted into the heap at most once: $O(V \\log V)$.
- Every edge is relaxed at most once, triggering a heap decrease-key / push: $O(E \\log V)$.
Total Time = $O((V + E) \\log V)$.`,
              notebookCheckpoints: [
                'Priority queue with (dist, u)',
                'Skip stale entries: if d > dist[u]: continue',
                'Counter-example showing greedy finalization failure with negative edges',
                'Complexity: O((V + E) log V)'
              ]
            },
            {
              id: 'dsa-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Self-Balancing Trees: AVL Tree Rotations & Balance Factor',
              question: 'Construct an AVL Tree (Adelson-Velsky and Landis) implementation in C or Python:\n(a) Node structure storing `height`.\n(b) Balance factor calculation: $\\text{Balance}(N) = \\text{height}(left) - \\text{height}(right)$.\n(c) Implement Left Rotation (`rotate_left`) and Right Rotation (`rotate_right`).\n(d) Implement `insert(root, val)` handling all 4 imbalance cases: Left-Left (LL), Right-Right (RR), Left-Right (LR), and Right-Left (RL).\n(e) Draw tree diagrams illustrating the Left-Right double rotation in your notebook.',
              markingBreakdown: [
                'AVL node height and balance factor: 2 Marks',
                'Single rotations (rotate_left, rotate_right): 3 Marks',
                'insert with all 4 rebalancing cases: 3 Marks',
                'Diagram of LR double rotation: 2 Marks'
              ],
              modelSolution: `\`\`\`python
class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def rotate_right(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    return x

def rotate_left(x):
    y = x.right
    T2 = y.left
    y.left = x
    x.right = T2
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    return y

def insert(node, val):
    if not node:
        return AVLNode(val)
    if val < node.val:
        node.left = insert(node.left, val)
    elif val > node.val:
        node.right = insert(node.right, val)
    else:
        return node # Duplicate keys disallowed

    node.height = 1 + max(get_height(node.left), get_height(node.right))
    balance = get_balance(node)

    # Rebalancing Cases:
    # 1. Left-Left (LL)
    if balance > 1 and val < node.left.val:
        return rotate_right(node)
    # 2. Right-Right (RR)
    if balance < -1 and val > node.right.val:
        return rotate_left(node)
    # 3. Left-Right (LR) -> rotate left child left, then node right
    if balance > 1 and val > node.left.val:
        node.left = rotate_left(node.left)
        return rotate_right(node)
    # 4. Right-Left (RL) -> rotate right child right, then node left
    if balance < -1 and val < node.right.val:
        node.right = rotate_right(node.right)
        return rotate_left(node)

    return node
\`\`\`
LR Double Rotation Diagram:
    z (bal +2)             z              x
   /                      /              / \\
  y (bal -1)  ──(Rot L)─> x    ──(Rot R)─> y   z
   \\                     /
    x                   y`,
              notebookCheckpoints: [
                'Update height: 1 + max(h(left), h(right))',
                'rotate_left and rotate_right pointer swapping',
                'All 4 cases: LL, RR, LR, RL',
                'Draw LR double rotation diagram'
              ]
            },
            {
              id: 'dsa-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'String Algorithms: Prefix Automaton (Knuth-Morris-Pratt KMP)',
              question: 'Construct the Knuth-Morris-Pratt (KMP) string search algorithm in $O(N + M)$ time:\n(a) Explain what the Longest Prefix Suffix (LPS) array represents.\n(b) Implement `build_lps_array(pattern)` in $O(M)$ time.\n(c) Implement `kmp_search(text, pattern)` that finds all pattern occurrences without backtracking the text index.\n(d) Trace building the LPS array for pattern `"ABABCABAB"` in your notebook.',
              markingBreakdown: [
                'LPS definition and construction logic: 3.5 Marks',
                'kmp_search without text backtracking: 3.5 Marks',
                'Trace table for "ABABCABAB": 3 Marks'
              ],
              modelSolution: `\`\`\`python
def build_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0 # Length of previous longest prefix suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1] # Fallback without incrementing i
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0: return []
    lps = build_lps(pattern)
    matches = []
    i = 0 # Index for text
    j = 0 # Index for pattern

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == m:
                matches.append(i - j) # Match found!
                j = lps[j - 1]
        else:
            if j != 0:
                j = lps[j - 1] # Shift pattern using LPS
            else:
                i += 1
    return matches
\`\`\`
LPS Trace for "ABABCABAB":
Index:  0 1 2 3 4 5 6 7 8
Char:   A B A B C A B A B
LPS:    0 0 1 2 0 1 2 3 4

Step-by-step:
- i=0 \'A\': 0
- i=1 \'B\': no match with \'A\' -> 0
- i=2 \'A\': matches pattern[0] \'A\' -> 1
- i=3 \'B\': matches pattern[1] \'B\' -> 2
- i=4 \'C\': mismatch with \'A\', length=2 -> lps[1]=0 -> mismatch with \'A\' -> 0
- i=5 \'A\': matches \'A\' -> 1
- i=6 \'B\': matches \'B\' -> 2
- i=7 \'A\': matches \'A\' -> 3
- i=8 \'B\': matches \'B\' -> 4`,
              notebookCheckpoints: [
                'build_lps algorithm fallback: length = lps[length - 1]',
                'Text index i never decrements (no backtracking)',
                'LPS table for ABABCABAB: [0, 0, 1, 2, 0, 1, 2, 3, 4]'
              ]
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-106-DSA-S2',
      title: 'Advanced Data Structures, Trees & Dynamic Programming Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-106-DSA',
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
              id: 'dsa-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Red-Black Tree Properties',
              question: 'State the rule regarding consecutive red nodes in a Red-Black Tree.',
              markingBreakdown: ['No two red nodes can be adjacent (a red node cannot have a red parent or child): 1 Mark'],
              modelSolution: 'Red Property: If a node is red, both of its children must be black (no two consecutive red nodes on any path).',
              notebookCheckpoints: ['No two consecutive red nodes']
            },
            {
              id: 'dsa-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'B-Tree Height',
              question: 'Why are B-Trees preferred over Binary Search Trees for disk-based databases like PostgreSQL and MySQL InnoDB?',
              markingBreakdown: ['High fan-out minimizes slow disk I/O seek operations: 1 Mark'],
              modelSolution: 'B-Trees have high fan-out (thousands of keys per node), keeping tree height very shallow (3-4 levels) to minimize slow disk block I/O reads.',
              notebookCheckpoints: ['High fan-out minimizes disk I/O']
            },
            {
              id: 'dsa-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Prim vs Kruskal',
              question: 'Which Minimum Spanning Tree algorithm is preferred for dense graphs: Prim\'s or Kruskal\'s?',
              markingBreakdown: ['Prim\'s algorithm (especially with adjacency matrix O(V^2) or Fibonacci heap): 1 Mark'],
              modelSolution: 'Prim\'s algorithm is preferred for dense graphs ($E \\approx V^2$), running in $O(V^2)$ without sorting edges, whereas Kruskal requires sorting all $E$ edges ($O(E \\log E)$).',
              notebookCheckpoints: ['Prim\'s algorithm']
            },
            {
              id: 'dsa-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Bloom Filter False Positives',
              question: 'Can a Bloom filter yield False Negatives? Explain.',
              markingBreakdown: ['No; Bloom filters only yield False Positives, never False Negatives: 1 Mark'],
              modelSolution: 'No. If an element was inserted, all its hashed bits were set to 1. A query finding any bit as 0 guarantees the element was definitely not added (Zero False Negatives).',
              notebookCheckpoints: ['Zero false negatives']
            },
            {
              id: 'dsa-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Bellman-Ford Complexity',
              question: 'What is the time complexity of the Bellman-Ford algorithm on a graph with $V$ vertices and $E$ edges?',
              markingBreakdown: ['O(V * E): 1 Mark'],
              modelSolution: '$O(V \\cdot E)$. (It relaxes all $E$ edges $V - 1$ times).',
              notebookCheckpoints: ['O(V * E)']
            },
            {
              id: 'dsa-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Segment Tree Range Query Time',
              question: 'What is the time complexity of a range query on a Segment Tree of $N$ elements?',
              markingBreakdown: ['O(log N): 1 Mark'],
              modelSolution: '$O(\\log N)$.',
              notebookCheckpoints: ['O(log N)']
            },
            {
              id: 'dsa-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Coin Change Unbounded DP',
              question: 'In the Coin Change problem, what makes it an "Unbounded Knapsack" rather than a "0/1 Knapsack"?',
              markingBreakdown: ['Each coin denomination can be chosen unlimited times: 1 Mark'],
              modelSolution: 'Each coin denomination can be reused an unlimited number of times rather than at most once.',
              notebookCheckpoints: ['Unlimited reuse of coins']
            },
            {
              id: 'dsa-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Tarjan\'s Strongly Connected Components',
              question: 'What do the arrays `disc` (discovery time) and `low` represent in Tarjan\'s Strongly Connected Components algorithm?',
              markingBreakdown: ['disc is step time node visited; low is lowest disc time reachable via back-edges: 1 Mark'],
              modelSolution: '`disc[u]` is the DFS discovery step time; `low[u]` is the lowest discovery time of any ancestor reachable from $u$ via tree or back-edges.',
              notebookCheckpoints: ['disc = discovery time, low = lowest reachable ancestor']
            },
            {
              id: 'dsa-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Radix Sort Non-Comparison Complexity',
              question: 'What is the time complexity of Radix Sort on $N$ $d$-digit integers with base $b$?',
              markingBreakdown: ['O(d * (N + b)): 1 Mark'],
              modelSolution: '$O(d \\cdot (N + b))$, where $d$ is number of digits and $b$ is the numerical base.',
              notebookCheckpoints: ['O(d * (N + b))']
            },
            {
              id: 'dsa-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Kadane\'s Algorithm Invariant',
              question: 'What is the recurrence relation in Kadane\'s algorithm for Maximum Subarray Sum?',
              markingBreakdown: ['current_max = max(arr[i], current_max + arr[i]): 1 Mark'],
              modelSolution: '`current_max = max(arr[i], current_max + arr[i])` (either extend previous subarray or start new subarray at `arr[i]`).',
              notebookCheckpoints: ['current_max = max(arr[i], current_max + arr[i])']
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
              id: 'dsa-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Longest Common Subsequence (LCS)',
              question: 'Given strings $S_1 = \\text{"ABCBDAB"}$ and $S_2 = \\text{"BDCABA"}$:\n(a) Write the dynamic programming recurrence relation for LCS.\n(b) Draw the completed 2D DP matrix in your notebook.\n(c) Backtrack and write out the resulting LCS string.',
              markingBreakdown: [
                'Recurrence relation: 1.5 Marks',
                'Completed DP table: 2 Marks',
                'Backtracked LCS string: 1.5 Marks'
              ],
              modelSolution: `(a) Recurrence:
\`\`\`
dp[i][j] = 1 + dp[i-1][j-1]                  if S1[i-1] == S2[j-1]
dp[i][j] = max(dp[i-1][j], dp[i][j-1])        otherwise
\`\`\`

(b) Matrix:
S1 = "ABCBDAB", S2 = "BDCABA"
Matrix size 8x7.
Final dp[7][6] = 4.

(c) Backtracked LCS String:
"BCBA" (or "BDAB", length 4).`,
              notebookCheckpoints: [
                'dp[i][j] formula',
                'LCS length = 4',
                'Resulting string: "BCBA" or "BDAB"'
              ]
            },
            {
              id: 'dsa-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Minimum Spanning Tree: Kruskal\'s with DSU',
              question: 'Implement Kruskal\'s Algorithm for Minimum Spanning Tree in $O(E \\log E)$ using Disjoint Set Union (DSU) with path compression and union by rank.',
              markingBreakdown: [
                'Sort edges by weight: 1.5 Marks',
                'Iterate and union non-cyclic edges: 2.5 Marks',
                'Return MST weight and edge list: 1 Mark'
              ],
              modelSolution: `\`\`\`python
def kruskal_mst(num_vertices, edges):
    # edges = list of (weight, u, v)
    edges.sort()
    parent = list(range(num_vertices))

    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]

    mst = []
    total_weight = 0

    for weight, u, v in edges:
        root_u = find(u)
        root_v = find(v)
        if root_u != root_v:
            parent[root_u] = root_v # Union
            mst.append((u, v, weight))
            total_weight += weight
            if len(mst) == num_vertices - 1:
                break

    return total_weight, mst
\`\`\``,
              notebookCheckpoints: [
                'edges.sort() by weight',
                'find(u) != find(v) check',
                'Stop when edges count == V - 1'
              ]
            },
            {
              id: 'dsa-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Binary Tree Lowest Common Ancestor (LCA)',
              question: 'Implement an algorithm to find the Lowest Common Ancestor (LCA) of two nodes $p$ and $q$ in a Binary Tree (not a BST) in $O(N)$ time and $O(H)$ space using single-pass post-order traversal.',
              markingBreakdown: [
                'Base cases (root is None, root == p, root == q): 2 Marks',
                'Recursive left and right search: 1.5 Marks',
                'Combining results: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    # If both left and right return non-null, root is the LCA!
    if left and right:
        return root
    # Otherwise return the non-null branch
    return left if left else right
\`\`\``,
              notebookCheckpoints: [
                'Base case: if root in (None, p, q): return root',
                'If left and right: return root'
              ]
            },
            {
              id: 'dsa-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Bipartite Graph Check via Two-Coloring (BFS)',
              question: 'Explain what makes a graph Bipartite. Write a function in Python using BFS that tests whether an undirected graph is bipartite by 2-coloring vertices. Detect odd-length cycles.',
              markingBreakdown: [
                'Bipartite definition and odd cycle condition: 2 Marks',
                'BFS 2-coloring implementation: 3 Marks'
              ],
              modelSolution: `A graph is Bipartite if its vertices can be partitioned into two independent sets such that no two adjacent vertices share the same set. A graph is bipartite if and only if it contains NO odd-length cycles.

\`\`\`python
from collections import deque

def is_bipartite(num_nodes, adj_list):
    color = {} # node: 0 or 1

    for start_node in range(num_nodes):
        if start_node in color: continue

        queue = deque([start_node])
        color[start_node] = 0

        while queue:
            u = queue.popleft()
            for v in adj_list[u]:
                if v not in color:
                    color[v] = 1 - color[u] # Alternate color
                    queue.append(v)
                elif color[v] == color[u]:
                    return False # Odd-length cycle detected!
    return True
\`\`\``,
              notebookCheckpoints: [
                'No odd-length cycles',
                'color[v] = 1 - color[u]',
                'Return False if neighbor has same color'
              ]
            },
            {
              id: 'dsa-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Monotonic Stack: Next Greater Element',
              question: 'Write an algorithm using a Monotonic Decreasing Stack that finds the Next Greater Element for every element in an array in $O(N)$ linear time.\nExample: `[4, 5, 2, 25]` -> `[5, 25, 25, -1]`. Trace stack contents in your notebook.',
              markingBreakdown: [
                'Monotonic stack implementation: 3 Marks',
                'Trace table on [4, 5, 2, 25]: 2 Marks'
              ],
              modelSolution: `\`\`\`python
def next_greater_elements(arr):
    n = len(arr)
    result = [-1] * n
    stack = [] # Stores indices

    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)

    return result
\`\`\`
Trace:
- i=0 (4): stack=[0]
- i=1 (5): 4 < 5 -> pop 0, result[0]=5. stack=[1]
- i=2 (2): stack=[1, 2]
- i=3 (25): 2 < 25 -> pop 2, result[2]=25; 5 < 25 -> pop 1, result[1]=25. stack=[3]
End of array: result[3] remains -1.
Output: [5, 25, 25, -1].`,
              notebookCheckpoints: [
                'Stack stores indices',
                'While stack and arr[stack[-1]] < arr[i]',
                'Linear O(N) amortized time'
              ]
            },
            {
              id: 'dsa-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Binary Search on Answer Space: Painter\'s Partition Problem',
              question: 'Given $N$ boards of lengths `[10, 20, 30, 40]` and $K = 2$ painters, find the minimum time to paint all boards using Binary Search on the Answer Range $[\max(arr), \sum(arr)]$.',
              markingBreakdown: [
                'Binary search answer range boundaries: 1.5 Marks',
                'Feasibility helper function: 2 Marks',
                'Binary search loop finding minimal maximum: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
def min_paint_time(boards, k):
    def is_feasible(max_limit):
        painters = 1
        current_sum = 0
        for b in boards:
            if current_sum + b > max_limit:
                painters += 1
                current_sum = b
                if painters > k: return False
            else:
                current_sum += b
        return True

    low = max(boards) # 40
    high = sum(boards) # 100
    ans = high

    while low <= high:
        mid = (low + high) // 2
        if is_feasible(mid):
            ans = mid
            high = mid - 1 # Try to find smaller valid limit
        else:
            low = mid + 1
    return ans # 60 (Painter 1: 10+20+30=60, Painter 2: 40)
\`\`\``,
              notebookCheckpoints: [
                'low = max(boards), high = sum(boards)',
                'is_feasible helper',
                'Result: 60'
              ]
            },
            {
              id: 'dsa-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Trie Prefix Tree Implementation',
              question: 'Implement a complete `Trie` class supporting:\n(a) `insert(word)`\n(b) `search(word) -> bool`\n(c) `startsWith(prefix) -> bool`\nState the space complexity.',
              markingBreakdown: [
                'TrieNode structure with children and is_end: 1.5 Marks',
                'insert and search: 2 Marks',
                'startsWith and complexity: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end

    def startsWith(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True
\`\`\`
Space Complexity: $O(N \\times L \\times \\Sigma)$ where $N$ is word count, $L$ is average word length, and $\\Sigma$ is alphabet size (26).`,
              notebookCheckpoints: [
                'TrieNode with children dict and is_end flag',
                'startsWith checks path without requiring is_end'
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
              id: 'dsa-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Range Query Trees: Segment Tree with Lazy Propagation',
              question: 'Construct an industrial-grade Segment Tree supporting Range Sum Queries and Range Update operations with Lazy Propagation:\n(a) Tree array of size $4N$.\n(b) `build(node, start, end)` constructing the tree in $O(N)$ time.\n(c) `updateRange(node, start, end, l, r, val)` updating intervals $[l, r]$ in $O(\\log N)$ time using lazy propagation.\n(d) `queryRange(node, start, end, l, r)` computing sum in $O(\\log N)$ time.\n(e) Explain why lazy propagation prevents $O(N)$ child updates during interval modifications.',
              markingBreakdown: [
                'Tree and lazy array representation: 2 Marks',
                'build() function: 2 Marks',
                'updateRange with lazy propagation: 3 Marks',
                'queryRange with lazy push-down: 3 Marks'
              ],
              modelSolution: `\`\`\`python
class SegmentTreeLazy:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)

    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self.build(arr, 2 * node + 1, start, mid)
        self.build(arr, 2 * node + 2, mid + 1, end)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def _push_down(self, node, start, end):
        if self.lazy[node] != 0:
            val = self.lazy[node]
            self.tree[node] += (end - start + 1) * val
            if start != end: # Push to children
                self.lazy[2 * node + 1] += val
                self.lazy[2 * node + 2] += val
            self.lazy[node] = 0

    def update_range(self, node, start, end, l, r, val):
        self._push_down(node, start, end)
        if start > r or end < l: return
        if l <= start and end <= r:
            self.lazy[node] += val
            self._push_down(node, start, end)
            return

        mid = (start + end) // 2
        self.update_range(2 * node + 1, start, mid, l, r, val)
        self.update_range(2 * node + 2, mid + 1, end, l, r, val)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query_range(self, node, start, end, l, r):
        self._push_down(node, start, end)
        if start > r or end < l: return 0
        if l <= start and end <= r: return self.tree[node]

        mid = (start + end) // 2
        left_sum = self.query_range(2 * node + 1, start, mid, l, r)
        right_sum = self.query_range(2 * node + 2, mid + 1, end, l, r)
        return left_sum + right_sum
\`\`\`
Lazy Propagation Benefit:
Updating an entire range of $K$ elements without lazy propagation would require visiting every leaf, taking $O(K \\log N)$ time. Lazy propagation defers updates: it increments a node\'s lazy tag and returns immediately in $O(\\log N)$, only pushing updates down when a sub-range is actually queried.`,
              notebookCheckpoints: [
                'Tree array size: 4N',
                '_push_down lazy resolution',
                'O(log N) range updates and range queries'
              ]
            },
            {
              id: 'dsa-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Network Flow: Maximum Bipartite Matching / Ford-Fulkerson (Edmonds-Karp)',
              question: 'Construct the Edmonds-Karp algorithm for Maximum Flow and Bipartite Matching:\n(a) Transform a Bipartite Matching problem (applicants to job slots) into a Maximum Flow network graph with source $S$ and sink $T$.\n(b) Implement BFS finding shortest augmenting paths in residual graph.\n(c) Full Edmonds-Karp algorithm with residual capacity updates.\n(d) State the Max-Flow Min-Cut Theorem and prove why maximum flow equals minimum cut capacity.',
              markingBreakdown: [
                'Bipartite to Max-Flow graph transformation: 2.5 Marks',
                'BFS augmenting path finder: 3 Marks',
                'Edmonds-Karp algorithm with residual updates: 2.5 Marks',
                'Max-Flow Min-Cut theorem statement and explanation: 2 Marks'
              ],
              modelSolution: `\`\`\`python
from collections import deque

def edmonds_karp(capacity_matrix, source, sink):
    n = len(capacity_matrix)
    residual = [row[:] for row in capacity_matrix]
    max_flow = 0

    while True:
        # Step 1: BFS to find shortest augmenting path
        parent = [-1] * n
        parent[source] = source
        queue = deque([(source, float('inf'))])

        path_flow = 0
        while queue:
            u, flow = queue.popleft()
            if u == sink:
                path_flow = flow
                break
            for v in range(n):
                if parent[v] == -1 and residual[u][v] > 0:
                    parent[v] = u
                    queue.append((v, min(flow, residual[u][v])))

        if path_flow == 0:
            break # No augmenting path remains

        # Step 2: Augment flow along path
        v = sink
        while v != source:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow # Reverse residual edge
            v = u

        max_flow += path_flow

    return max_flow
\`\`\`
Max-Flow Min-Cut Theorem:
The maximum amount of flow passing from source $S$ to sink $T$ is identically equal to the minimum total capacity of edges that, if removed, would disconnect $S$ from $T$. Any cut $(S, T)$ represents a bottleneck: flow cannot exceed cut capacity.`,
              notebookCheckpoints: [
                'BFS finds shortest augmenting path',
                'Reverse residual edges: residual[v][u] += path_flow',
                'Max-Flow Min-Cut theorem statement'
              ]
            },
            {
              id: 'dsa-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Advanced Dynamic Programming: Matrix Chain Multiplication',
              question: 'Given matrices $A_1, A_2, A_3, A_4$ with dimension array $P = [10, 30, 5, 60, 8]$:\n(a) Write the dynamic programming recurrence relation for optimal matrix chain parenthesization.\n(b) Construct and fill the $M$ (cost) and $S$ (split) tables in your notebook.\n(c) Determine the minimum number of scalar multiplications.\n(d) Reconstruct and display the optimal parenthesization string (e.g. `((A1(A2A3))A4)`).',
              markingBreakdown: [
                'DP recurrence relation: 2 Marks',
                'Cost table M construction: 3.5 Marks',
                'Split table S and minimum scalar multiplications: 2.5 Marks',
                'Parenthesization reconstruction string: 2 Marks'
              ],
              modelSolution: `(a) Recurrence:
\`\`\`
m[i][j] = 0                                                            if i == j
m[i][j] = min_{i <= k < j} (m[i][k] + m[k+1][j] + P[i-1] * P[k] * P[j]) if i < j
\`\`\`

(b) Execution with P = [10, 30, 5, 60, 8]:
Matrices:
A1 (10x30), A2 (30x5), A3 (5x60), A4 (60x8)

Length 2:
- m[1][2]: A1 A2 = 10 * 30 * 5 = 1500 (k=1)
- m[2][3]: A2 A3 = 30 * 5 * 60 = 9000 (k=2)
- m[3][4]: A3 A4 = 5 * 60 * 8 = 2400 (k=3)

Length 3:
- m[1][3]: min(
    k=1: m[1][1] + m[2][3] + 10*30*60 = 0 + 9000 + 18000 = 27000
    k=2: m[1][2] + m[3][3] + 10*5*60  = 1500 + 0 + 3000   = 4500 (k=2 wins)
  ) -> m[1][3] = 4500, s[1][3] = 2.
- m[2][4]: min(
    k=2: m[2][2] + m[3][4] + 30*5*8  = 0 + 2400 + 1200   = 3600 (k=2 wins)
    k=3: m[2][3] + m[4][4] + 30*60*8 = 9000 + 0 + 14400  = 23400
  ) -> m[2][4] = 3600, s[2][4] = 2.

Length 4 (Full chain m[1][4]):
- k=1: m[1][1] + m[2][4] + 10*30*8 = 0 + 3600 + 2400 = 6000
- k=2: m[1][2] + m[3][4] + 10*5*8  = 1500 + 2400 + 400 = 4300
- k=3: m[1][3] + m[4][4] + 10*60*8 = 4500 + 0 + 4800 = 9300
Minimum cost = 4300 scalar multiplications! (split at k=3? No, k=2 is 4300).

(d) Optimal Parenthesization:
Split at k=2: \`((A1 A2) (A3 A4))\`.
Multiplications: 1500 + 2400 + (10 * 5 * 8 = 400) = 4300.`,
              notebookCheckpoints: [
                'State recurrence formula',
                'Min cost = 4300',
                'Optimal parenthesization: ((A1 A2) (A3 A4))'
              ]
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-106-DSA-S3',
      title: 'Advanced Algorithmic Design, NP-Completeness & Geometry Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-106-DSA',
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
              id: 'dsa-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'P vs NP Definition',
              question: 'Differentiate between Complexity Class P and Complexity Class NP.',
              markingBreakdown: ['P solvable in polynomial time; NP verifiable in polynomial time: 1 Mark'],
              modelSolution: 'Class P consists of decision problems solvable by a deterministic Turing machine in polynomial time ($O(n^k)$). Class NP consists of problems whose proposed solution can be verified in polynomial time.',
              notebookCheckpoints: ['P = solvable in polynomial time', 'NP = verifiable in polynomial time']
            },
            {
              id: 'dsa-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'NP-Complete Definition',
              question: 'What two conditions must a problem $X$ satisfy to be classified as NP-Complete?',
              markingBreakdown: ['X is in NP and every problem in NP is polynomial-time reducible to X (NP-Hard): 1 Mark'],
              modelSolution: '1. $X \\in \\text{NP}$.\n2. $X$ is NP-Hard (every problem in NP is polynomial-time reducible to $X$).',
              notebookCheckpoints: ['X is in NP', 'X is NP-Hard']
            },
            {
              id: 'dsa-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Amortized Analysis Methods',
              question: 'Name the three standard techniques used for Amortized Complexity Analysis.',
              markingBreakdown: ['Aggregate method, Accounting method, Potential method: 1 Mark'],
              modelSolution: '1. Aggregate Method, 2. Accounting (Banker\'s) Method, 3. Potential Method (Physicist\'s Method).',
              notebookCheckpoints: ['Aggregate, Accounting, Potential methods']
            },
            {
              id: 'dsa-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Fenwick Tree (BIT) Operations',
              question: 'What bitwise trick isolates the lowest set bit in an integer $i$ for navigating a Fenwick Tree (Binary Indexed Tree)?',
              markingBreakdown: ['i & (-i): 1 Mark'],
              modelSolution: '`i & (-i)` (using two\'s complement arithmetic).',
              notebookCheckpoints: ['i & (-i)']
            },
            {
              id: 'dsa-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Geometric Cross Product',
              question: 'In Computational Geometry, how does the 2D cross product of vectors $\\vec{AB} \\times \\vec{AC}$ determine whether point $C$ turns left or right relative to segment $AB$?',
              markingBreakdown: ['Positive = counter-clockwise (left turn), Negative = clockwise (right turn): 1 Mark'],
              modelSolution: 'If $\\vec{AB} \\times \\vec{AC} > 0$, point $C$ makes a counter-clockwise (left) turn. If $< 0$, it makes a clockwise (right) turn. If $= 0$, points are collinear.',
              notebookCheckpoints: ['> 0 is left turn', '< 0 is right turn']
            },
            {
              id: 'dsa-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'A* Search Heuristic Admissibility',
              question: 'What condition must a heuristic function $h(n)$ satisfy to be called "Admissible" in the A* Search algorithm?',
              markingBreakdown: ['Never overestimates true cost to reach the goal: 1 Mark'],
              modelSolution: 'An admissible heuristic $h(n)$ never overestimates the actual cost to reach the goal node ($h(n) \\le h^*(n)$ for all $n$).',
              notebookCheckpoints: ['Never overestimates true cost']
            },
            {
              id: 'dsa-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Huffman Coding Optimality',
              question: 'What type of code does Huffman Coding produce that guarantees no code is a prefix of another code?',
              markingBreakdown: ['Prefix-free / Prefix code: 1 Mark'],
              modelSolution: 'A Prefix-Free Code (Prefix Code). No encoded character sequence forms the prefix of another character code, enabling unambiguous instant decoding.',
              notebookCheckpoints: ['Prefix-free code']
            },
            {
              id: 'dsa-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Treap (Tree + Heap)',
              question: 'How does a Treap maintain balance without complex rotation rules like AVL or Red-Black trees?',
              markingBreakdown: ['Assigns random heap priorities to nodes to simulate random insertion order: 1 Mark'],
              modelSolution: 'A Treap assigns a randomly generated numerical priority to each key, maintaining BST order on keys and Min/Max-Heap order on priorities, guaranteeing expected $O(\\log N)$ depth.',
              notebookCheckpoints: ['Random heap priorities simulate random insertion']
            },
            {
              id: 'dsa-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Floyd-Warshall All-Pairs Shortest Path',
              question: 'What is the time complexity of the Floyd-Warshall algorithm for All-Pairs Shortest Paths?',
              markingBreakdown: ['O(V^3): 1 Mark'],
              modelSolution: '$O(V^3)$.',
              notebookCheckpoints: ['O(V^3)']
            },
            {
              id: 'dsa-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Suffix Array vs Suffix Tree',
              question: 'State one significant practical memory advantage of Suffix Arrays over Suffix Trees in genome processing.',
              markingBreakdown: ['Suffix Array is a compact integer array consuming 4-8x less RAM than pointer-heavy Suffix Trees: 1 Mark'],
              modelSolution: 'A Suffix Array is a flat integer array consuming 4 to 8 times less memory (typically 4 bytes per character) compared to Suffix Trees, which suffer massive pointer overhead per node.',
              notebookCheckpoints: ['Compact integer array, 4-8x less RAM']
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
              id: 'dsa-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Binary Indexed Tree (Fenwick Tree)',
              question: 'Implement a Fenwick Tree (Binary Indexed Tree) in Python supporting:\n(a) `update(idx, delta)` in $O(\\log N)$ using `idx += idx & (-idx)`.\n(b) `query(idx)` in $O(\\log N)$ using `idx -= idx & (-idx)`.\n(c) Demonstrate computing range sum queries in $O(\\log N)$.',
              markingBreakdown: [
                'update with idx & (-idx): 2 Marks',
                'query with idx & (-idx): 2 Marks',
                'Range sum query (query(R) - query(L-1)): 1 Mark'
              ],
              modelSolution: `\`\`\`python
class FenwickTree:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1) # 1-based indexing

    def update(self, idx, delta):
        while idx <= self.size:
            self.tree[idx] += delta
            idx += idx & (-idx) # Add least significant set bit

    def query(self, idx):
        total = 0
        while idx > 0:
            total += self.tree[idx]
            idx -= idx & (-idx) # Subtract least significant set bit
        return total

    def range_query(self, left, right):
        return self.query(right) - self.query(left - 1)
\`\`\``,
              notebookCheckpoints: [
                '1-based indexing',
                'idx += idx & (-idx) on update',
                'idx -= idx & (-idx) on query'
              ]
            },
            {
              id: 'dsa-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Convex Hull: Graham Scan Algorithm',
              question: 'Explain the Graham Scan algorithm for computing the 2D Convex Hull of $N$ points in $O(N \\log N)$ time:\n(a) Anchor selection and polar angle sorting.\n(b) Stack orientation check using cross-product to discard right turns (non-convex vertices).\n(c) Trace on a set of 5 sample points in your notebook.',
              markingBreakdown: [
                'Anchor point selection and angular sorting: 2 Marks',
                'Cross product orientation check with stack: 2 Marks',
                'Trace diagram: 1 Mark'
              ],
              modelSolution: `Algorithm Steps:
1. Select bottom-most point (lowest Y coordinate) as anchor $P_0$.
2. Sort all remaining points by polar angle with respect to $P_0$.
3. Push $P_0$ and the first two sorted points onto a stack.
4. For every subsequent point $P_i$:
   - While the turn formed by the second-to-top, top, and $P_i$ is clockwise or collinear (cross product $\\le 0$), pop the top point.
   - Push $P_i$ onto stack.
Final stack contains the vertices of the Convex Hull in counter-clockwise order.

\`\`\`python
def cross_product(p1, p2, p3):
    return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])
\`\`\``,
              notebookCheckpoints: [
                'Sort points by polar angle',
                'While cross_product <= 0: stack.pop()',
                'O(N log N) dominated by sorting'
              ]
            },
            {
              id: 'dsa-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Approximation Algorithms: Vertex Cover',
              question: 'Explain what a 2-Approximation Algorithm is. Implement the greedy maximal matching approximation algorithm for Minimum Vertex Cover in polynomial time, and prove why its output size is at most $2 \\times$ the optimal size.',
              markingBreakdown: [
                '2-Approximation definition: 1.5 Marks',
                'Greedy edge picking implementation: 2 Marks',
                'Proof of 2-factor bound: 1.5 Marks'
              ],
              modelSolution: `\`\`\`python
def approx_vertex_cover(edges):
    cover = set()
    for u, v in edges:
        # If neither u nor v is in cover, pick BOTH endpoints!
        if u not in cover and v not in cover:
            cover.add(u)
            cover.add(v)
    return cover
\`\`\`
Proof of 2-Approximation Ratio:
Let $M$ be the set of edges selected by the algorithm.
Because we only pick edges where neither endpoint is in the cover, no two edges in $M$ share an endpoint ($M$ is an independent matching).
To cover these independent edges, ANY valid vertex cover (including the optimal cover $C^*$) must contain at least one vertex for each edge in $M$:
$|C^*| \\ge |M|$.
Our algorithm picks both endpoints of each edge in $M$, so $|C| = 2|M|$.
Combining: $|C| = 2|M| \\le 2|C^*|$.
The algorithm is guaranteed to be at most twice the optimal solution size.`,
              notebookCheckpoints: [
                'Pick both endpoints of unmatched edges',
                'Proof: |C*| >= |M| and |C| = 2|M|'
              ]
            },
            {
              id: 'dsa-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'String Hashing: Rabin-Karp Algorithm',
              question: 'Explain the Rabin-Karp string matching algorithm using Rolling Hashes in $O(N + M)$ expected time:\n(a) Rolling hash formula with base $B$ and prime modulo $M$.\n(b) How to update the hash in $O(1)$ time when sliding the window by 1 character.\n(c) How hash collisions (spurious hits) are handled.',
              markingBreakdown: [
                'Rolling hash mathematical formula: 2 Marks',
                'O(1) slide update equation: 2 Marks',
                'Handling collisions via character comparison: 1 Mark'
              ],
              modelSolution: `(a) Polynomial Rolling Hash:
$H(S) = \\left( \\sum_{i=0}^{m-1} S[i] \\cdot B^{m - 1 - i} \\right) \\pmod M$.

(b) O(1) Sliding Update:
To remove outgoing character $S[i]$ and add incoming character $S[i+m]$:
$H_{\\text{new}} = \\left( (H_{\\text{old}} - S[i] \\cdot B^{m-1}) \\cdot B + S[i+m] \\right) \\pmod M$.

(c) Spurious Hits:
If $H(text) == H(pattern)$, a hash collision is possible. The algorithm performs a full string comparison of $m$ characters to confirm or discard the match.`,
              notebookCheckpoints: [
                'Polynomial rolling hash formula',
                'O(1) update subtracts outgoing and adds incoming',
                'Explicit string compare on hash match'
              ]
            },
            {
              id: 'dsa-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Tarjan\'s Bridge-Finding Algorithm',
              question: 'Implement Tarjan\'s Bridge-Finding Algorithm for undirected graphs using DFS discovery time `disc` and lowest reachable ancestor `low` in $O(V + E)$ time. State the exact condition that proves edge $(u, v)$ is a critical Bridge.',
              markingBreakdown: [
                'DFS traversal maintaining disc and low: 3 Marks',
                'Bridge condition low[v] > disc[u]: 2 Marks'
              ],
              modelSolution: `\`\`\`python
def find_bridges(num_nodes, adj_list):
    disc = [-1] * num_nodes
    low = [-1] * num_nodes
    bridges = []
    timer = 0

    def dfs(u, parent):
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1

        for v in adj_list[u]:
            if v == parent: continue
            if disc[v] != -1:
                # Back edge: update low[u]
                low[u] = min(low[u], disc[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                # Critical Bridge Condition:
                if low[v] > disc[u]:
                    bridges.append((u, v))

    for i in range(num_nodes):
        if disc[i] == -1: dfs(i, -1)
    return bridges
\`\`\`
Bridge Condition:
If \`low[v] > disc[u]\`, subtree rooted at $v$ has NO back-edges to $u$ or any ancestor of $u$. Removing $(u, v)$ completely disconnects $v$ from the graph.`,
              notebookCheckpoints: [
                'low[u] = min(low[u], low[v])',
                'Bridge condition: low[v] > disc[u]'
              ]
            },
            {
              id: 'dsa-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Branch and Bound: Traveling Salesperson Problem (TSP)',
              question: 'Explain the Branch and Bound technique for solving the NP-Hard Traveling Salesperson Problem (TSP). How are lower bounds computed using Reduced Cost Matrices or Minimum Spanning Trees (MST) to prune branches?',
              markingBreakdown: [
                'Branch and Bound state-space search explanation: 2.5 Marks',
                'Reduced cost matrix lower-bound bounding and pruning: 2.5 Marks'
              ],
              modelSolution: `Branch and Bound explores a state-space search tree of partial tours:
1. Branching: Choose a city to visit next, expanding branches for each unvisited node.
2. Bounding: At each partial tour node, calculate a mathematical Lower Bound (e.g. current tour length + MST cost of unvisited nodes + connection edges).
3. Pruning: If the lower bound of a branch $\\ge$ the best complete tour found so far, the entire branch is pruned immediately, eliminating exponential subtrees.

Reduced Cost Matrix:
Subtract row minima and column minima from the distance matrix. The sum of subtracted constants provides an initial lower bound. When assigning an edge $(i, j)$, reduce the submatrix again to dynamically track the lower bound.`,
              notebookCheckpoints: [
                'State-space search tree',
                'Lower bound computation (Reduced matrix / MST)',
                'Prune branch if lower_bound >= best_tour'
              ]
            },
            {
              id: 'dsa-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Heavy-Light Decomposition (HLD) on Trees',
              question: 'Explain the purpose of Heavy-Light Decomposition (HLD) on a tree. What is the definition of a "Heavy Edge", and how does HLD reduce any path query on a tree to $O(\\log^2 N)$ queries on a Segment Tree?',
              markingBreakdown: [
                'Heavy vs light edge definition: 2.5 Marks',
                'Path query decomposition into O(log N) continuous segments: 2.5 Marks'
              ],
              modelSolution: `HLD decomposes a tree into disjoint linear paths ("Heavy Paths") so path queries between any two nodes can be answered using a standard Segment Tree.

Definitions:
- For each node $u$, the Heavy Edge goes to the child $v$ that has the largest subtree size.
- All other edges from $u$ to children are Light Edges.

Complexity Bound:
A path from any node to the root crosses at most $O(\\log N)$ light edges (because moving up a light edge at least doubles the subtree size).
Thus, any path between node $u$ and $v$ decomposes into at most $O(\\log N)$ contiguous heavy path intervals. Since each segment tree query takes $O(\\log N)$, total path query time is $O(\\log^2 N)$.`,
              notebookCheckpoints: [
                'Heavy edge points to child with largest subtree size',
                'Path contains at most O(log N) light edges',
                'Total complexity: O(log^2 N)'
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
              id: 'dsa-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Complex Search Engines: Suffix Automaton / Generalized Suffix Tree',
              question: 'Design a high-throughput substring search and DNA sequence pattern-matching engine:\n(a) Compare Suffix Trees, Suffix Arrays with LCP (Longest Common Prefix) arrays, and Aho-Corasick Automata.\n(b) Implement the Kasai algorithm to compute the LCP array from a Suffix Array in $O(N)$ linear time.\n(c) Demonstrate how binary searching over the Suffix Array + LCP yields pattern occurrences in $O(M + \\log N)$ time.\n(d) Write a query finding the Longest Repeated Substring in a genome string.',
              markingBreakdown: [
                'Suffix data structures theoretical comparison: 2.5 Marks',
                'Kasai LCP algorithm implementation: 3.5 Marks',
                'Binary search pattern matching with LCP: 2 Marks',
                'Longest Repeated Substring query: 2 Marks'
              ],
              modelSolution: `\`\`\`python
# (b) Kasai Algorithm for O(N) LCP Array Computation
def build_lcp_kasai(text, suffix_array):
    n = len(text)
    rank = [0] * n
    for i, sa_idx in enumerate(suffix_array):
        rank[sa_idx] = i

    lcp = [0] * (n - 1)
    k = 0 # Common prefix length

    for i in range(n):
        if rank[i] == 0:
            k = 0
            continue

        j = suffix_array[rank[i] - 1] # Preceding suffix in sorted order

        while i + k < n and j + k < n and text[i + k] == text[j + k]:
            k += 1

        lcp[rank[i] - 1] = k

        if k > 0:
            k -= 1 # Key insight: k decreases by at most 1 in next iteration!

    return lcp

# (d) Longest Repeated Substring
def longest_repeated_substring(text, suffix_array, lcp):
    max_len = 0
    max_idx = -1
    for i, length in enumerate(lcp):
        if length > max_len:
            max_len = length
            max_idx = suffix_array[i]

    return text[max_idx : max_idx + max_len] if max_len > 0 else ""
\`\`\`
Kasai Linear Complexity Proof:
In each step, $k$ is decremented by at most 1 (since deleting the first character from two suffixes reduces their common prefix by at most 1). Since $k$ can increase at most $N$ times, total operations across all $N$ suffixes are bounded by $2N = O(N)$.`,
              notebookCheckpoints: [
                'Kasai algorithm: k -= 1 if k > 0',
                'Linear O(N) proof',
                'Max LCP value represents Longest Repeated Substring'
              ]
            },
            {
              id: 'dsa-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Computational Geometry: Line Segment Intersection (Bentley-Ottmann)',
              question: 'Construct the Bentley-Ottmann Sweep-Line Algorithm for finding all $K$ intersections among $N$ line segments in $O((N + K) \\log N)$ time:\n(a) Event Queue structure: Segment start events, segment end events, and dynamic intersection events.\n(b) Sweep-Line Status structure: Self-balancing BST (AVL or Red-Black) ordered by current Y coordinate.\n(c) Cross-product segment intersection test.\n(d) Explain how the algorithm dynamically inserts new intersection events into the event queue as the sweep-line advances.',
              markingBreakdown: [
                'Event queue and sweep line status structures: 3 Marks',
                'Geometric intersection test predicate: 2 Marks',
                'Dynamic event insertion on adjacent status segments: 3 Marks',
                'Bentley-Ottmann vs naive O(N^2) comparison: 2 Marks'
              ],
              modelSolution: `Bentley-Ottmann Architecture:
1. Event Queue (Priority Queue):
   - Stores events sorted by X coordinate (left to right):
     - Left Endpoint: Insert segment into status.
     - Right Endpoint: Remove segment from status.
     - Intersection Point: Swap order of two intersecting segments in status.
2. Sweep-Line Status (Balanced BST):
   - Maintains all currently active segments crossing the vertical sweep line, ordered by their Y coordinate at the current X.
3. Invariant: Two segments can only intersect if they become immediate vertical neighbors in the status BST.

\`\`\`python
def ccw(A, B, C):
    return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0])

def intersect(seg1, seg2):
    A, B = seg1[0], seg1[1]
    C, D = seg2[0], seg2[1]
    return ccw(A, C, D) != ccw(B, C, D) and ccw(A, B, C) != ccw(A, B, D)
\`\`\`
Dynamic Event Insertion:
Whenever a segment is inserted into the status BST, we test it for intersection against its immediate above neighbor and immediate below neighbor. If an intersection is detected, a new Intersection Event is inserted into the priority queue.
When two segments intersect, their vertical order in the status BST is swapped, prompting intersection tests with their newly adjacent neighbors.`,
              notebookCheckpoints: [
                'Priority queue of X-coordinate events',
                'Balanced BST of active Y-coordinate segments',
                'Test only adjacent neighbors in status'
              ]
            },
            {
              id: 'dsa-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Theoretical Computer Science: Cook-Levin Theorem & 3-SAT Reductions',
              question: 'Investigate the foundation of NP-Completeness:\n(a) State the Cook-Levin Theorem proving that Boolean Satisfiability (SAT) is NP-Complete.\n(b) Prove that 3-SAT is NP-Complete by showing a polynomial-time reduction from general SAT ($k$-SAT clauses to 3-CNF clauses using dummy auxiliary variables).\n(c) Show a polynomial-time reduction from 3-SAT to Independent Set (or Vertex Cover).\n(d) Explain the practical significance of NP-Completeness in software engineering.',
              markingBreakdown: [
                'Cook-Levin theorem statement and proof concept: 2.5 Marks',
                'Polynomial-time reduction from SAT to 3-SAT: 3 Marks',
                'Reduction from 3-SAT to Independent Set (gadgets): 3 Marks',
                'Engineering significance (approximation & heuristics): 1.5 Marks'
              ],
              modelSolution: `(a) Cook-Levin Theorem:
States that the Boolean Satisfiability problem (SAT) is NP-Complete. It showed that any polynomial-time non-deterministic Turing machine computation can be simulated by a polynomial-size Boolean formula in CNF, establishing the first NP-Complete benchmark.

(b) Reduction: SAT -> 3-SAT:
Convert a clause with $k$ literals $(l_1 \\lor l_2 \\lor \\dots \\lor l_k)$ into $k-2$ clauses with 3 literals using $k-3$ auxiliary variables $y_1, \\dots, y_{k-3}$:
$(l_1 \\lor l_2 \\lor y_1) \\land (\\neg y_1 \\lor l_3 \\lor y_2) \\land (\\neg y_2 \\lor l_4 \\lor y_3) \\dots \\land (\\neg y_{k-3} \\lor l_{k-1} \\lor l_k)$.
This formula is satisfiable if and only if the original clause is satisfiable, and the transformation takes $O(k)$ polynomial time.

(c) Reduction: 3-SAT -> Independent Set:
Given a 3-SAT formula with $m$ clauses:
1. For each clause $(l_1 \\lor l_2 \\lor l_3)$, create a triangle gadget of 3 vertices connected by edges.
2. For every pair of conflicting literals ($x$ and $\\neg x$), add an edge between their vertices across gadgets.
3. Target Independent Set size $k = m$.
Proof: To pick $m$ independent vertices, exactly 1 vertex must be picked from each of the $m$ triangles (satisfying each clause), and no two selected vertices can be connected by an edge (ensuring no variable is assigned both True and False).
Thus, the 3-SAT formula is satisfiable $\\iff$ the graph has an Independent Set of size $m$.

(d) Engineering Significance:
When a software engineering problem is proven NP-Complete, engineers avoid wasting months trying to design an exact polynomial algorithm. Instead, they immediately adopt practical approaches: Dynamic Programming heuristics, Branch and Bound, or polynomial Approximation Algorithms.`,
              notebookCheckpoints: [
                'Cook-Levin: SAT is first NP-Complete problem',
                'Auxiliary variable reduction from k-SAT to 3-SAT',
                'Triangle gadget reduction to Independent Set',
                'Engineering takeaway: use heuristics and approximation'
              ]
            }
          ]
        }
      }
    }
  }
};
