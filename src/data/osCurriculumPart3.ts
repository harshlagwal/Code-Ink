import { Chapter } from '../types/notebook';

export const OS_CHAPTERS_PART3: Chapter[] = [
  {
    id: 'os-ch21',
    number: 21,
    title: 'Deadlock Fundamentals & Coffman Conditions',
    description: 'Deadlock definitions, Resource Allocation Graphs (RAG), and the four Coffman deadlock conditions',
    topics: [
      {
        id: 'os-deadlocks-coffman',
        subjectId: 'os',
        chapterId: 'os-ch21',
        chapterNumber: 21,
        pageNumber: 21,
        title: 'The Four Coffman Conditions & Resource Allocation Graphs',
        difficulty: 'intermediate',
        definition: 'A Deadlock is a state in which every process in a set is waiting for an event (such as resource release) that can only be caused by another process in the same set, resulting in permanent system paralysis.',
        whyItMatters: 'Deadlocks can freeze database locks, operating system kernels, and high-concurrency cloud microservices if resource allocation graphs contain unhandled circular dependencies.',
        syntax: '// Four Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
        explanation: [
          'Condition 1: Mutual Exclusion: At least one resource must be held in a non-shareable mode (only one process can use it at a time).',
          'Condition 2: Hold and Wait: A process must be currently holding at least one resource and requesting additional resources held by other processes.',
          'Condition 3: No Preemption: Resources cannot be forcibly preempted; a resource can be released only voluntarily by the process holding it after completion.',
          'Condition 4: Circular Wait: A closed chain of processes $\{P_0, P_1, ..., P_n\}$ exists such that $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, and $P_n$ waits for $P_0$.',
          'Resource Allocation Graph (RAG): Directed graph with process nodes ($P_i$) and resource nodes ($R_j$). Request edge: $P_i \\to R_j$; Assignment edge: $R_j \\to P_i$. If the graph has no cycles, deadlock is mathematically impossible.'
        ],
        example: {
          language: 'c',
          code: `// Simulating Circular Wait Deadlock Scenario with Pthreads\n#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock_A = PTHREAD_MUTEX_INITIALIZER;\npthread_mutex_t lock_B = PTHREAD_MUTEX_INITIALIZER;\n\n// Thread 1 acquires Lock A then requests Lock B\n// Thread 2 acquires Lock B then requests Lock A\n// If Thread 1 holds A and Thread 2 holds B -> Permanent Deadlock!\n\nint main(void) {\n    printf("Deadlock Warning: Inverting lock acquisition order causes Circular Wait!\\n");\n    printf("Safe Rule: Always acquire locks in a globally identical linear order.\\n");\n    return 0;\n}`,
          output: `Deadlock Warning: Inverting lock acquisition order causes Circular Wait!\nSafe Rule: Always acquire locks in a globally identical linear order.`,
          annotations: [
            { line: 8, label: 'Inverted lock ordering creates circular wait cycle across concurrent threads', type: 'red' },
            { line: 12, label: 'Linear ordering of resource acquisition breaks Circular Wait condition', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Resource Allocation Graph (RAG) Circular Deadlock',
          subtitle: 'Single-Instance Resource Cycle Guarantees Deadlock',
          elements: [
            { id: '1', label: 'Process P1', sublabel: 'Holds Resource R1', value: 'Requests Resource R2', status: 'warning', arrowTo: '4' },
            { id: '2', label: 'Resource R1', sublabel: 'Single Instance', value: 'Allocated to P1', status: 'normal', arrowTo: '1' },
            { id: '3', label: 'Process P2', sublabel: 'Holds Resource R2', value: 'Requests Resource R1', status: 'warning', arrowTo: '2' },
            { id: '4', label: 'Resource R2', sublabel: 'Single Instance', value: 'Allocated to P2', status: 'normal', arrowTo: '3' }
          ]
        },
        important: 'In a Resource Allocation Graph, a cycle is a SUFFICIENT condition for deadlock ONLY if every resource type has exactly 1 instance. If multi-instance resources exist, a cycle indicates only a POTENTIAL deadlock, not a certainty.',
        commonMistakes: [
          'Assuming that any single Coffman condition causes deadlock. All FOUR Coffman conditions must hold simultaneously for a deadlock to exist.',
          'Confusing a cycle in a multi-instance graph with a confirmed deadlock. In multi-instance graphs, another process outside the cycle might finish and release a resource, breaking the deadlock.'
        ],
        tip: 'To prevent deadlocks: Simply invalidate at least ONE of the four Coffman conditions (most commonly Circular Wait by imposing a strict resource hierarchy).',
        interviewNote: 'Standard Core Question: "What are the four Coffman conditions necessary for a deadlock?" (Answer: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait).',
        practiceQuestions: [
          {
            id: 'q-os-ch21-1',
            type: 'mcq',
            question: 'In a Resource Allocation Graph where every resource type has strictly ONE single instance, what does the presence of a directed cycle indicate?',
            options: [
              'A potential deadlock that may resolve itself',
              'A guaranteed deadlock state',
              'High CPU utilization',
              'Optimal resource allocation'
            ],
            correctIndex: 1,
            explanation: 'For single-instance resource systems, a directed cycle in the Resource Allocation Graph is both a necessary and sufficient condition for deadlock.'
          }
        ],
        relatedTopics: ['os-deadlocks-prevention-avoidance', 'os-deadlocks-detection-recovery']
      }
    ]
  },
  {
    id: 'os-ch22',
    number: 22,
    title: 'Deadlock Prevention & Avoidance (The Banker\'s Algorithm)',
    description: 'Deadlock Prevention techniques, Safe vs Unsafe states, and the Banker\'s Algorithm safety and resource request algorithms',
    topics: [
      {
        id: 'os-deadlocks-prevention-avoidance',
        subjectId: 'os',
        chapterId: 'os-ch22',
        chapterNumber: 22,
        pageNumber: 22,
        title: 'Deadlock Prevention Strategies & The Banker\'s Algorithm',
        difficulty: 'advanced',
        definition: 'Deadlock Prevention eliminates deadlock by constraining resource requests to invalidate at least one Coffman condition. Deadlock Avoidance dynamically inspects resource requests (via the Banker\'s Algorithm) to ensure the system remains in a Safe State.',
        whyItMatters: 'Banker\'s Algorithm is the fundamental mathematical benchmark for safe concurrent resource scheduling in banking and safety-critical embedded systems.',
        syntax: 'Need[i][j] = Max[i][j] - Allocation[i][j]\nWork = Available; Finish[i] = false;',
        explanation: [
          'Deadlock Prevention Methods: 1. Invalidate Mutual Exclusion (make resources shareable, e.g. read-only files); 2. Invalidate Hold & Wait (process must request all resources at once); 3. Invalidate No Preemption (preempt resources from waiting processes); 4. Invalidate Circular Wait (assign total linear ordering $F(R) \\in \\mathbb{N}$ to all resources; process can only request resources in strictly ascending numerical order).',
          'Safe State: A state is safe if there exists a Safe Sequence $\\langle P_1, P_2, ..., P_n \\rangle$ such that for each $P_i$, its maximum remaining needs can be satisfied by current available resources plus resources held by all prior processes.',
          'Safe State vs Deadlock: Safe State -> No Deadlock. Unsafe State -> Potential Deadlock (not necessarily deadlocked yet). Deadlock -> Unsafe State.',
          'Banker\'s Algorithm Data Structures: Available vector $[m]$, Max matrix $[n \\times m]$, Allocation matrix $[n \\times m]$, and Need matrix $[n \\times m]$ where $\\text{Need} = \\text{Max} - \\text{Allocation}$.'
        ],
        example: {
          language: 'c',
          code: `// Banker's Algorithm Safety Check Demonstration\n// Available = 3 units. Allocation: P0=3, P1=2, P2=2. Max: P0=7, P1=4, P2=6.\n// Need: P0=4, P1=2, P2=4\n\n#include <stdio.h>\nint main(void) {\n    int avail = 3;\n    printf("Step 1: Check P1 (Need 2 <= Avail 3) -> Runs! Releases 2. New Avail: 5\\n");\n    avail += 2;\n    printf("Step 2: Check P0 (Need 4 <= Avail 5) -> Runs! Releases 3. New Avail: 8\\n");\n    avail += 3;\n    printf("Step 3: Check P2 (Need 4 <= Avail 8) -> Runs! Releases 2. New Avail: 10\\n");\n    printf("System is in a SAFE STATE! Safe Sequence: < P1, P0, P2 >\\n");\n    return 0;\n}`,
          output: `Step 1: Check P1 (Need 2 <= Avail 3) -> Runs! Releases 2. New Avail: 5\nStep 2: Check P0 (Need 4 <= Avail 5) -> Runs! Releases 3. New Avail: 8\nStep 3: Check P2 (Need 4 <= Avail 8) -> Runs! Releases 2. New Avail: 10\nSystem is in a SAFE STATE! Safe Sequence: < P1, P0, P2 >`,
          annotations: [
            { line: 7, label: 'P1 needs 2 units, which is <= 3 available units', type: 'green' },
            { line: 11, label: 'Safe execution sequence exists, proving system cannot deadlock', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'System States Venn Inclusion Hierarchy',
          subtitle: 'Relationship Between Safe, Unsafe, and Deadlocked States',
          elements: [
            { id: '1', label: 'All System States', sublabel: 'Total State Space', value: 'Complete Domain', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Unsafe States', sublabel: 'Potential Deadlock Risk', value: 'Banker Avoids This', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Deadlocked States', sublabel: 'Permanent Freeze', value: 'Circular Wait Locked', status: 'referenced' },
            { id: '4', label: 'Safe States', sublabel: 'Safe Sequence Exists', value: 'Zero Deadlock Guarantee', status: 'active' }
          ]
        },
        important: 'An Unsafe State is NOT the same as a Deadlock! An unsafe state merely creates the risk of a deadlock if all processes demand their maximum declared resources simultaneously.',
        commonMistakes: [
          'Confusing Deadlock Prevention with Deadlock Avoidance. Prevention restricts HOW requests can be made (rules); Avoidance dynamically checks IF a request is safe to grant.',
          'Assuming Banker\'s algorithm is used in general desktop OSs. It requires processes to declare their maximum resource needs in advance, which real-world applications rarely know.'
        ],
        tip: 'In exams: To compute the Need matrix: strictly subtract `Allocation` from `Max` for each process and resource column.',
        interviewNote: 'Standard GATE / Placement Question: "Is an Unsafe State always a Deadlocked State?" (Answer: No! All deadlocks are unsafe states, but not all unsafe states are deadlocked; an unsafe state simply has no guarantee of avoiding a deadlock).',
        practiceQuestions: [
          {
            id: 'q-os-ch22-1',
            type: 'mcq',
            question: 'What is the fundamental requirement for a system state to be classified as a "Safe State" in the Banker\'s Algorithm?',
            options: [
              'No processes are currently executing',
              'There exists at least one safe sequence in which all processes can finish execution',
              'All resources are currently unallocated',
              'All processes hold shared locks'
            ],
            correctIndex: 1,
            explanation: 'A state is safe if there exists a safe sequence where every process can obtain its maximum needs and terminate without deadlock.'
          }
        ],
        relatedTopics: ['os-deadlocks-coffman', 'os-deadlocks-detection-recovery']
      }
    ]
  },
  {
    id: 'os-ch23',
    number: 23,
    title: 'Deadlock Detection, Recovery & The Ostrich Approach',
    description: 'Wait-For Graph (WFG) cycle detection, recovery via process termination and resource preemption, and the Ostrich algorithm',
    topics: [
      {
        id: 'os-deadlocks-detection-recovery',
        subjectId: 'os',
        chapterId: 'os-ch23',
        chapterNumber: 23,
        pageNumber: 23,
        title: 'Wait-For Graphs, Victim Selection & Ostrich Algorithm',
        difficulty: 'intermediate',
        definition: 'Deadlock Detection periodically executes algorithms to discover circular wait conditions. Deadlock Recovery resolves deadlocks by terminating processes or preempting resources. The Ostrich Algorithm ignores the problem if deadlocks are rare.',
        whyItMatters: 'General-purpose operating systems like Linux and Windows employ the Ostrich algorithm because the runtime cost of constant deadlock prevention outweighs rare reboot costs.',
        syntax: 'kill -9 <PID> # Force termination of deadlocked victim process in Linux',
        explanation: [
          'Wait-For Graph (WFG): Collapses resource nodes from a single-instance RAG into a direct process-to-process graph. An edge $P_i \\to P_j$ means process $P_i$ is waiting for process $P_j$ to release a resource. A directed cycle in a WFG confirms a Deadlock.',
          'Deadlock Recovery - Process Termination: 1. Abort all deadlocked processes (expensive, discards all work); 2. Abort one process at a time until the deadlock cycle is broken (requires re-running detection after each abort).',
          'Deadlock Recovery - Resource Preemption: 1. Select a Victim (minimize cost based on priority, CPU time consumed, resources held); 2. Rollback (roll process back to a safe checkpoint); 3. Prevent Starvation (ensure the same process is not repeatedly chosen as victim).',
          'The Ostrich Algorithm: "Stick your head in the sand and pretend the problem doesn\'t exist." If deadlocks occur once a year and cost $1,000, while running prevention costs $100,000 in performance, ignoring the problem and rebooting is the pragmatic economic choice.'
        ],
        example: {
          language: 'c',
          code: `// Wait-For Graph (WFG) Cycle Detection Simulation\n// Processes P1, P2, P3\n// P1 -> P2 (P1 waits for P2), P2 -> P3 (P2 waits for P3), P3 -> P1 (P3 waits for P1)\n\n#include <stdio.h>\nint main(void) {\n    printf("Wait-For Graph Edges: P1 -> P2 -> P3 -> P1\\n");\n    printf("DFS Graph Traversal: Cycle detected! [P1, P2, P3]\\n");\n    printf("Deadlock Recovery Action: Terminating victim P3 with minimal CPU time.\\n");\n    printf("Cycle broken! P1 and P2 can now proceed.\\n");\n    return 0;\n}`,
          output: `Wait-For Graph Edges: P1 -> P2 -> P3 -> P1\nDFS Graph Traversal: Cycle detected! [P1, P2, P3]\nDeadlock Recovery Action: Terminating victim P3 with minimal CPU time.\nCycle broken! P1 and P2 can now proceed.`,
          annotations: [
            { line: 7, label: 'Cycle confirmed using Depth-First Search (DFS) on process nodes', type: 'red' },
            { line: 8, label: 'Victim selected based on lowest execution cost to minimize wasted work', type: 'green' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Wait-For Graph (WFG) Circular Deadlock Cycle',
          subtitle: 'Direct Process-to-Process Dependency Loop',
          elements: [
            { id: '1', label: 'Process P1', sublabel: 'Waits for P2', value: 'Edge P1 -> P2', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Process P2', sublabel: 'Waits for P3', value: 'Edge P2 -> P3', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Process P3 (Victim)', sublabel: 'Waits for P1', value: 'Edge P3 -> P1 (Cycle!)', status: 'warning', arrowTo: '1' }
          ]
        },
        important: 'In resource preemption recovery, Starvation occurs if the victim selection algorithm naively picks the process with the smallest CPU time, causing that same process to be repeatedly aborted and never finish.',
        commonMistakes: [
          'Confusing a Resource Allocation Graph (RAG) with a Wait-For Graph (WFG). A RAG contains both process and resource nodes; a WFG contains ONLY process nodes.',
          'Criticizing the Ostrich algorithm as bad engineering. In commercial general-purpose OSs (Windows, macOS, Linux), the Ostrich approach is deliberately chosen because deadlocks are rare and prevention degrades CPU throughput.'
        ],
        tip: 'Cycle detection on a Wait-For Graph with $N$ vertices runs in $O(N^2)$ time using Depth-First Search (DFS).',
        interviewNote: 'Standard Core Tech Question: "What is the Ostrich algorithm and why do modern operating systems use it?" (Answer: Ignoring deadlocks because they occur rarely and the performance overhead of continuous prevention/avoidance is unacceptable for general workloads).',
        practiceQuestions: [
          {
            id: 'q-os-ch23-1',
            type: 'mcq',
            question: 'What graph algorithm is typically executed on a Wait-For Graph to detect the presence of a deadlock cycle?',
            options: ['Dijkstra\'s Shortest Path', 'Depth-First Search (DFS) Cycle Detection', 'Kruskal\'s Minimum Spanning Tree', 'Bellman-Ford Algorithm'],
            correctIndex: 1,
            explanation: 'DFS traverses directed edges in the Wait-For Graph; encountering a back-edge to an ancestor vertex confirms a directed cycle and a deadlock.'
          }
        ],
        relatedTopics: ['os-deadlocks-coffman', 'os-memory-allocation-relocation']
      }
    ]
  },
  {
    id: 'os-ch24',
    number: 24,
    title: 'Main Memory Allocation, Relocation & Fragmentation',
    description: 'Logical vs Physical address spaces, MMU, Base/Limit registers, Contiguous allocation (First, Best, Worst Fit)',
    topics: [
      {
        id: 'os-memory-allocation-relocation',
        subjectId: 'os',
        chapterId: 'os-ch24',
        chapterNumber: 24,
        pageNumber: 24,
        title: 'Memory Relocation, MMU & Dynamic Storage Allocation',
        difficulty: 'intermediate',
        definition: 'Memory Management coordinates physical RAM allocation to active processes. The Memory Management Unit (MMU) dynamically maps virtual/logical addresses generated by the CPU to physical memory addresses using Base and Limit registers.',
        whyItMatters: 'Address relocation allows multiple programs to be compiled without knowing what physical RAM addresses they will occupy at runtime.',
        syntax: 'Physical Address = Base Register + Logical Address\nCondition: 0 <= Logical Address < Limit Register (otherwise Trap!)',
        explanation: [
          'Logical vs Physical Address: Address generated by CPU is a Logical (Virtual) Address. Address seen by the memory controller hardware is a Physical Address.',
          'Base and Limit Registers: Hardware registers that provide memory protection. The Base Register holds the smallest physical address of the process; the Limit Register specifies the range/size. If a logical address $\\ge$ Limit, the hardware traps (Segmentation Fault).',
          'Contiguous Memory Allocation: Each process is contained in a single contiguous section of memory.',
          'Dynamic Storage Allocation Strategies: 1. First-Fit (allocate the first hole that is big enough; fast); 2. Best-Fit (allocate the smallest hole that is big enough; leaves tiny unusable fragments); 3. Worst-Fit (allocate the largest hole; leaves largest remaining hole).',
          'External Fragmentation: Total free memory space exists to satisfy a request, but it is not contiguous (split into tiny unusable gaps). Resolved via Compaction.'
        ],
        example: {
          language: 'c',
          code: `// Contiguous Allocation Simulation: First-Fit vs Best-Fit\n// Memory Holes: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB\n// Process Request: 212 KB\n\n#include <stdio.h>\nint main(void) {\n    printf("First-Fit: Allocates 500 KB block (First hole >= 212 KB)\\n");\n    printf("           Remaining hole: 500 - 212 = 288 KB\\n\\n");\n    \n    printf("Best-Fit:  Allocates 300 KB block (Smallest hole >= 212 KB)\\n");\n    printf("           Remaining hole: 300 - 212 = 88 KB\\n\\n");\n    \n    printf("Worst-Fit: Allocates 600 KB block (Largest hole)\\n");\n    printf("           Remaining hole: 600 - 212 = 388 KB\\n");\n    return 0;\n}`,
          output: `First-Fit: Allocates 500 KB block (First hole >= 212 KB)\n           Remaining hole: 500 - 212 = 288 KB\n\nBest-Fit:  Allocates 300 KB block (Smallest hole >= 212 KB)\n           Remaining hole: 300 - 212 = 88 KB\n\nWorst-Fit: Allocates 600 KB block (Largest hole)\n           Remaining hole: 600 - 212 = 388 KB`,
          annotations: [
            { line: 7, label: 'First-Fit scans from beginning and picks the first suitable block', type: 'blue' },
            { line: 10, label: 'Best-Fit searches entire list for closest size match', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'MMU Hardware Dynamic Relocation Flow',
          subtitle: 'Base and Limit Register Memory Protection',
          elements: [
            { id: '1', label: 'CPU Logical Address', sublabel: 'Offset Generated', value: 'Virtual Address', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Limit Register Check', sublabel: 'Is Address < Limit?', value: 'No -> Trap (Segfault)', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Base Register Addition', sublabel: 'Add Physical Base', value: 'Base + Offset', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Physical RAM Address', sublabel: 'Hardware Bus', value: 'Fetch Data Byte', status: 'referenced' }
          ]
        },
        important: 'First-Fit and Best-Fit are better than Worst-Fit in terms of decreasing time and storage utilization, but both still suffer from External Fragmentation (the 50-Percent Rule: for $N$ allocated blocks, $0.5N$ blocks are lost to fragmentation).',
        commonMistakes: [
          'Thinking Best-Fit is always superior to First-Fit. Best-Fit is slower because it must search the entire free list, and it generates tiny, useless slivers of fragmented memory.',
          'Assuming Compaction can be performed if relocation is static. Compaction requires dynamic runtime relocation via base registers.'
        ],
        tip: '50-Percent Rule: Statistical analysis shows that regardless of allocation strategy, approximately one-third of memory may be unusable due to external fragmentation!',
        interviewNote: 'Standard Tech Interview Question: "Why does Paging exist if we already have dynamic contiguous allocation?" (Answer: Contiguous allocation causes severe external fragmentation that requires expensive memory compaction; Paging completely eliminates external fragmentation).',
        practiceQuestions: [
          {
            id: 'q-os-ch24-1',
            type: 'mcq',
            question: 'Which dynamic memory allocation strategy searches the free list and allocates the smallest available hole that is large enough to satisfy the request?',
            options: ['First-Fit', 'Best-Fit', 'Worst-Fit', 'Next-Fit'],
            correctIndex: 1,
            explanation: 'Best-Fit searches the entire memory list to locate the smallest hole large enough to satisfy the request, minimizing immediate leftover space.'
          }
        ],
        relatedTopics: ['os-paging-architecture', 'os-tlb-hardware']
      }
    ]
  },
  {
    id: 'os-ch25',
    number: 25,
    title: 'Paging Architecture & Page Tables',
    description: 'Frames, Pages, Page Table Base Register (PTBR), Multi-Level Page Tables, and Inverted Page Tables',
    topics: [
      {
        id: 'os-paging-architecture',
        subjectId: 'os',
        chapterId: 'os-ch25',
        chapterNumber: 25,
        pageNumber: 25,
        title: 'Paging Hardware, Frames & Hierarchical Page Tables',
        difficulty: 'intermediate',
        definition: 'Paging is a non-contiguous memory management scheme where logical address space is divided into fixed-size Pages, and physical memory is divided into identical fixed-size Frames, completely eliminating External Fragmentation.',
        whyItMatters: 'Paging is the universal memory abstraction used by all modern desktop, mobile, and server operating systems and hardware processors.',
        syntax: 'Logical Address = (Page Number p, Offset d)\nPhysical Address = (Frame Number f * Frame Size) + Offset d',
        explanation: [
          'Page vs Frame: Pages are logical (virtual) memory blocks; Frames are physical hardware RAM blocks. Page Size == Frame Size (always a power of 2, typically 4 KB = $2^{12}$ bytes).',
          'Page Table: Per-process lookup table mapping virtual Page Numbers ($p$) to physical Frame Numbers ($f$). Stored in RAM; its physical address is held in the Page Table Base Register (PTBR).',
          'Internal Fragmentation: While paging completely eliminates external fragmentation, the final allocated page of a process is rarely filled to capacity, wasting an average of half a page ($P/2$).',
          'Hierarchical (Multi-Level) Paging: Breaks a massive flat page table into multiple levels (e.g. 2-level in 32-bit, 4-level in 64-bit x86_64). Allocates page tables on demand, saving gigabytes of physical RAM.',
          'Inverted Page Table: Has exactly ONE entry per physical frame in RAM rather than per virtual page. Saves massive memory in 64-bit systems, but requires hashing to search efficiently.'
        ],
        example: {
          language: 'c',
          code: `// Address Translation Numerical: 32-bit system, 4 KB Page Size\n// Logical Address: 0x000031A8 (Hexadecimal)\n\n#include <stdio.h>\nint main(void) {\n    unsigned int logical_addr = 0x000031A8;\n    unsigned int page_size = 4096; // 4 KB = 2^12 bytes\n    \n    // 12 bits for Offset d (lower 12 bits: 0x1A8)\n    // 20 bits for Page Number p (upper 20 bits: 0x3 = Page 3)\n    unsigned int page_num = logical_addr / page_size;   // 3\n    unsigned int offset = logical_addr % page_size;     // 0x1A8 = 424\n    \n    // Assume Page Table maps Page 3 -> Frame 7\n    unsigned int frame_num = 7;\n    unsigned int physical_addr = (frame_num * page_size) + offset;\n    \n    printf("Logical Address:  0x%08X (Page: %u, Offset: 0x%X)\\n", logical_addr, page_num, offset);\n    printf("Physical Address: 0x%08X (Frame: %u, Offset: 0x%X)\\n", physical_addr, frame_num, offset);\n    return 0;\n}`,
          output: `Logical Address:  0x000031A8 (Page: 3, Offset: 0x1A8)\nPhysical Address: 0x000071A8 (Frame: 7, Offset: 0x1A8)`,
          annotations: [
            { line: 12, label: 'Binary bit shift extracts Page Number from upper address bits', type: 'blue' },
            { line: 17, label: 'Offset remains unchanged; Frame Number replaces Page Number', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Paging Hardware Address Translation Flow',
          subtitle: 'Mapping Virtual Page p to Physical Frame f',
          elements: [
            { id: '1', label: 'CPU Virtual Address', sublabel: 'Page p | Offset d', value: 'Page 3 | Offset 0x1A8', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Page Table in RAM', sublabel: 'Look up entry p', value: 'Page 3 -> Frame 7', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Physical RAM Address', sublabel: 'Frame f | Offset d', value: 'Frame 7 | Offset 0x1A8', status: 'referenced' }
          ]
        },
        important: 'In Paging, the Offset ($d$) is NEVER altered during address translation! Only the Page Number ($p$) is translated into the Frame Number ($f$).',
        commonMistakes: [
          'Confusing internal with external fragmentation. Paging has ZERO external fragmentation, but DOES suffer from internal fragmentation on the last page.',
          'Assuming flat page tables are practical in 64-bit systems. A flat page table for a 64-bit space would require millions of terabytes of memory!'
        ],
        tip: 'Formula: For $m$-bit address and page size $2^n$ bytes: Offset = lowest $n$ bits; Page Number = upper $m - n$ bits.',
        interviewNote: 'Standard GATE / Tech Question: "Why does Paging use a page size that is a power of 2?" (Answer: It enables address splitting into Page Number and Offset using simple hardware bit shifts rather than costly division circuits).',
        practiceQuestions: [
          {
            id: 'q-os-ch25-1',
            type: 'mcq',
            question: 'In a 32-bit virtual memory system with a 4 KB page size, how many total entries are present in a flat, single-level page table?',
            options: ['4,096 entries', '65,536 entries', '1,048,576 entries (2^20)', '4,294,967,296 entries'],
            correctIndex: 2,
            explanation: '4 KB = 2^12 bytes offset. Remaining bits = 32 - 12 = 20 bits for page number. Total pages = 2^20 = 1,048,576 entries.'
          }
        ],
        relatedTopics: ['os-memory-allocation-relocation', 'os-tlb-hardware']
      }
    ]
  },
  {
    id: 'os-ch26',
    number: 26,
    title: 'Hardware Acceleration: Translation Lookaside Buffer (TLB)',
    description: 'TLB associative cache, TLB hits/misses, Effective Memory Access Time (EMAT), and address space identifiers (ASIDs)',
    topics: [
      {
        id: 'os-tlb-hardware',
        subjectId: 'os',
        chapterId: 'os-ch26',
        chapterNumber: 26,
        pageNumber: 26,
        title: 'TLB Cache Mechanics & Effective Memory Access Time (EMAT)',
        difficulty: 'advanced',
        definition: 'The Translation Lookaside Buffer (TLB) is a specialized, high-speed hardware associative cache integrated into the CPU Memory Management Unit (MMU) that stores recent virtual-to-physical page table translations.',
        whyItMatters: 'Without a TLB, every single memory instruction requires two physical RAM accesses (one for the page table, one for the data), cutting CPU execution speed in half.',
        syntax: 'EMAT = Hit_Ratio * (TLB_Time + Mem_Time) + (1 - Hit_Ratio) * (TLB_Time + 2 * Mem_Time)',
        explanation: [
          'The Two-Memory-Access Problem: In standard paging, accessing memory requires: 1. Read Page Table in RAM to find Frame; 2. Read actual data in RAM. This doubles memory latency!',
          'TLB Operation: The TLB stores `<Page_Number, Frame_Number>` pairs. When CPU generates a virtual address, the MMU checks the TLB in parallel ($O(1)$ hardware associative lookup).',
          'TLB Hit: Page number is found in TLB. Frame number is retrieved instantly (typically 1-2 ns), and data is fetched from RAM in 1 memory access.',
          'TLB Miss: Page number is not in TLB. MMU must read the Page Table in RAM (1 memory access), update the TLB, and then read the actual data in RAM (2nd memory access).',
          'Address Space Identifier (ASID): Modern TLBs store an ASID tag with each entry to distinguish which process owns the translation, avoiding flushing the entire TLB on context switches.'
        ],
        example: {
          language: 'c',
          code: `// Effective Memory Access Time (EMAT) Numerical Solver\n// TLB Access = 20 ns, Main Memory = 100 ns, Hit Ratio = 80% vs 98%\n\n#include <stdio.h>\n\ndouble compute_emat(double hit_ratio, double tlb_t, double mem_t) {\n    return (hit_ratio * (tlb_t + mem_t)) + ((1.0 - hit_ratio) * (tlb_t + 2 * mem_t));\n}\n\nint main(void) {\n    double tlb = 20.0, mem = 100.0;\n    \n    printf("EMAT with 80%% Hit Ratio: %.2f ns\\n", compute_emat(0.80, tlb, mem));\n    printf("EMAT with 98%% Hit Ratio: %.2f ns\\n", compute_emat(0.98, tlb, mem));\n    return 0;\n}`,
          output: `EMAT with 80% Hit Ratio: 140.00 ns\nEMAT with 98% Hit Ratio: 122.40 ns`,
          annotations: [
            { line: 6, label: 'Hit path: TLB + 1 Memory read; Miss path: TLB + 2 Memory reads', type: 'yellow' },
            { line: 13, label: 'High hit ratio (98%) brings average memory access near ideal single read time', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'MMU TLB Fast Path vs Slow Path Resolution',
          subtitle: 'Associative Cache Lookups Eliminate Redundant RAM Reads',
          elements: [
            { id: '1', label: 'CPU Virtual Address', sublabel: 'Page p | Offset d', value: 'Incoming Memory Request', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'TLB Associative Search', sublabel: 'Hardware Cache', value: 'Hit or Miss?', status: 'active', arrowTo: '3' },
            { id: '3', label: 'TLB Hit Path (Fast)', sublabel: 'Frame f retrieved', value: '1 RAM Read Total', status: 'referenced' },
            { id: '4', label: 'TLB Miss Path (Slow)', sublabel: 'Access Page Table in RAM', value: '2 RAM Reads Total', status: 'warning', arrowTo: '3' }
          ]
        },
        important: 'In systems with Multi-Level Paging (e.g. 4-level paging in x86_64), a TLB miss requires FOUR memory accesses to traverse the page directory levels before reading the actual data, making TLB hit ratios (>99%) critical for modern CPU performance.',
        commonMistakes: [
          'Forgetting the TLB lookup time in the Miss path. Even on a miss, the MMU still spent time searching the TLB first.',
          'Assuming TLB entries stay valid across process context switches without ASID tags. Without ASIDs, the OS must execute an expensive TLB flush on every context switch.'
        ],
        tip: 'In exams: Memorize: Hit Time = $TLB + Mem$; Miss Time = $TLB + (L + 1) \\times Mem$, where $L$ is the number of page table levels.',
        interviewNote: 'Standard Core Tech Question: "What is the penalty of a TLB miss in a 4-level page table system?" (Answer: The CPU must make 4 sequential memory reads through the page table hierarchy plus 1 final read for the data, totaling 5 memory accesses).',
        practiceQuestions: [
          {
            id: 'q-os-ch26-1',
            type: 'mcq',
            question: 'If main memory access time is 100 ns and TLB access time is 10 ns, what is the memory access time on a TLB Miss in a single-level paging system?',
            options: ['110 ns', '200 ns', '210 ns', '220 ns'],
            correctIndex: 2,
            explanation: 'On a miss: TLB access (10 ns) + Page table read in RAM (100 ns) + Actual data read in RAM (100 ns) = 210 ns.'
          }
        ],
        relatedTopics: ['os-paging-architecture', 'os-virtual-memory-replacement']
      }
    ]
  },
  {
    id: 'os-ch27',
    number: 27,
    title: 'Virtual Memory, Demand Paging & Page Replacement',
    description: 'Demand paging, 10-step Page Fault lifecycle, FIFO, Belady\'s Anomaly, Optimal (OPT), LRU, and Thrashing',
    topics: [
      {
        id: 'os-virtual-memory-replacement',
        subjectId: 'os',
        chapterId: 'os-ch27',
        chapterNumber: 27,
        pageNumber: 27,
        title: 'Demand Paging, Page Faults, Belady\'s Anomaly & Thrashing',
        difficulty: 'advanced',
        definition: 'Virtual Memory creates the illusion of an address space much larger than physical RAM. Demand Paging loads pages only when referenced. When a page is absent from RAM, a Page Fault traps to the OS to fetch it from disk swap space.',
        whyItMatters: 'Virtual memory allows running 32 GB applications on an 8 GB laptop by transparently paging cold data blocks to SSD swap partitions.',
        syntax: '// Page Fault Sequence: 1. Trap -> 2. Verify -> 3. Locate on swap -> 4. Evict victim -> 5. Load page -> 6. Restart',
        explanation: [
          'Demand Paging: Pages are loaded into RAM only when demanded during execution (Lazy Swapper). Uses a Valid/Invalid bit in page table entries.',
          'Page Fault Handling: 1. CPU traps on invalid bit; 2. Kernel checks if address is valid; 3. Finds free frame (or evicts victim page using page replacement); 4. Reads page from disk swap space; 5. Updates page table to valid; 6. Restarts trapped instruction.',
          'FIFO Page Replacement: Replaces oldest page in memory. Vulnerable to Belady\'s Anomaly (more frames -> more page faults!).',
          'Optimal Page Replacement (OPT / MIN): Replaces page that will not be used for longest period in future. Theoretical minimum faults benchmark.',
          'Least Recently Used (LRU): Replaces page that has not been used for longest period in the past. Immune to Belady\'s Anomaly (Stack algorithm).',
          'Thrashing: A pathological state where a process spends more time swapping pages to/from disk than executing code. Occurs when total memory demand exceeds physical RAM capacity. Resolved by the Working-Set Model.'
        ],
        example: {
          language: 'c',
          code: `// Belady's Anomaly Demonstration for FIFO\n// Reference String: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5\n\n#include <stdio.h>\nint main(void) {\n    printf("FIFO with 3 Frames: 9 Page Faults\\n");\n    printf("FIFO with 4 Frames: 10 Page Faults! (More frames = MORE FAULTS!)\\n");\n    printf("Belady's Anomaly confirmed: FIFO is not a stack algorithm.\\n");\n    return 0;\n}`,
          output: `FIFO with 3 Frames: 9 Page Faults\nFIFO with 4 Frames: 10 Page Faults! (More frames = MORE FAULTS!)\nBelady's Anomaly confirmed: FIFO is not a stack algorithm.`,
          annotations: [
            { line: 6, label: 'Counter-intuitive increase in page faults when frames increase from 3 to 4', type: 'red' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Virtual Memory Page Fault Resolution Cycle',
          subtitle: 'Hardware Trap to Secondary Storage Disk Fetch',
          elements: [
            { id: '1', label: '1. Memory Reference', sublabel: 'Valid Bit = 0 (Invalid)', value: 'Hardware Trap Raised', status: 'normal', arrowTo: '2' },
            { id: '2', label: '2. OS Trap Handler', sublabel: 'Validates Virtual Address', value: 'Locates Page on Swap', status: 'active', arrowTo: '3' },
            { id: '3', label: '3. Disk Swap Read', sublabel: 'I/O into Free Frame', value: 'Victim Evicted if Full', status: 'warning', arrowTo: '4' },
            { id: '4', label: '4. Update Page Table', sublabel: 'Set Valid Bit = 1', value: 'Restart Instruction', status: 'referenced' }
          ]
        },
        important: 'Stack Algorithms (such as LRU and Optimal) can NEVER suffer from Belady\'s Anomaly because the set of pages in memory for $N$ frames is always a strict subset of the pages in memory for $N + 1$ frames.',
        commonMistakes: [
          'Believing LRU looks into the future. LRU looks into the PAST; only theoretical OPT looks into the future.',
          'Attempting to fix Thrashing by adding more processes. Increasing multiprogramming worsens thrashing; the OS must suspend or kill processes to relieve memory pressure.'
        ],
        tip: 'In exams: Whenever tracing page replacement algorithms, draw a grid with frames as rows and reference string as columns. Mark page hits clearly.',
        interviewNote: 'Standard Tech Interview Question: "What is Belady\'s Anomaly and which algorithms are immune to it?" (Answer: Anomaly where adding frames increases faults in FIFO; Stack algorithms like LRU and OPT are immune).',
        practiceQuestions: [
          {
            id: 'q-os-ch27-1',
            type: 'mcq',
            question: 'Which page replacement algorithm can suffer from Belady\'s Anomaly?',
            options: ['Least Recently Used (LRU)', 'Optimal Page Replacement (OPT)', 'First-In, First-Out (FIFO)', 'Most Recently Used (MRU)'],
            correctIndex: 2,
            explanation: 'FIFO is not a stack algorithm and can suffer from Belady\'s Anomaly where increasing frames causes more page faults.'
          }
        ],
        relatedTopics: ['os-tlb-hardware', 'os-disk-scheduling-algorithms']
      }
    ]
  },
  {
    id: 'os-ch28',
    number: 28,
    title: 'Secondary Storage & Disk Scheduling Algorithms',
    description: 'Magnetic disk geometry, Seek time, FCFS, SSTF, SCAN (Elevator), C-SCAN, LOOK, and C-LOOK',
    topics: [
      {
        id: 'os-disk-scheduling-algorithms',
        subjectId: 'os',
        chapterId: 'os-ch28',
        chapterNumber: 28,
        pageNumber: 28,
        title: 'Disk Architecture & Scheduling Algorithms (SSTF, SCAN, LOOK)',
        difficulty: 'intermediate',
        definition: 'Disk Scheduling algorithms optimize the servicing sequence of pending secondary storage I/O requests to minimize total mechanical Seek Time (the time for the disk head to travel to the target cylinder track).',
        whyItMatters: 'Mechanical disk arm seeks require 5-10 milliseconds, which is orders of magnitude slower than RAM. Smart scheduling prevents disk bottlenecks.',
        syntax: 'Seek Time = | Destination Cylinder - Current Cylinder |\nTotal Head Movements = Sum of seek distances across serviced requests',
        explanation: [
          'Magnetic Disk Geometry: Platters, Spindle, Tracks, Sectors, Cylinders, and mechanical Read/Write Heads on an actuator arm.',
          'FCFS (First-Come, First-Served): Services requests in arrival order. Fair, but wild back-and-forth arm swings cause high average seek time.',
          'SSTF (Shortest Seek Time First): Selects request closest to current head position. Minimizes seek time, but causes Starvation for distant cylinder tracks.',
          'SCAN (Elevator Algorithm): Head sweeps continuously in one direction servicing requests until it hits the physical disk boundary, then reverses direction.',
          'C-SCAN (Circular SCAN): Sweeps in one direction servicing requests. When it hits the end, it immediately returns to the beginning without servicing requests on the return trip, providing uniform wait times.',
          'LOOK / C-LOOK: Enhancements of SCAN / C-SCAN where the head arm only travels as far as the final request in each direction rather than going all the way to the physical edge of the disk.'
        ],
        example: {
          language: 'c',
          code: `// Disk Scheduling: LOOK vs SCAN Total Head Movement Comparison\n// Current Head: 53. Requests: 98, 183, 37, 122, 14, 124, 65, 67 (Tracks 0 to 199)\n\n#include <stdio.h>\nint main(void) {\n    int head = 53;\n    // SCAN: Sweeps 53 -> 199 (Disk Edge), then reverses to 14\n    int scan_movements = (199 - head) + (199 - 14);\n    \n    // LOOK: Sweeps 53 -> 183 (Max Request), then reverses to 14\n    int look_movements = (183 - head) + (183 - 14);\n    \n    printf("SCAN Total Head Movements: %d cylinders (Wastes edge travel)\\n", scan_movements);\n    printf("LOOK Total Head Movements: %d cylinders (Optimal!)\\n", look_movements);\n    return 0;\n}`,
          output: `SCAN Total Head Movements: 331 cylinders (Wastes edge travel)\nLOOK Total Head Movements: 299 cylinders (Optimal!)`,
          annotations: [
            { line: 8, label: 'SCAN travels all the way to physical disk boundary (199)', type: 'yellow' },
            { line: 11, label: 'LOOK stops at furthest request (183), saving 32 head movements', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Disk Scheduling Algorithms Movement Characteristics',
          subtitle: 'Minimizing Mechanical Head Arm Seek Latency',
          elements: [
            { id: '1', label: 'FCFS', sublabel: 'First Come, First Served', value: 'Wild Random Swings', status: 'warning' },
            { id: '2', label: 'SSTF', sublabel: 'Shortest Seek Time First', value: 'High Starvation Risk', status: 'normal' },
            { id: '3', label: 'SCAN (Elevator)', sublabel: 'Sweeps Edge-to-Edge', value: 'Bi-directional Service', status: 'active' },
            { id: '4', label: 'C-LOOK', sublabel: 'Circular Look', value: 'Optimal Modern Standard', status: 'referenced' }
          ]
        },
        important: 'Solid State Drives (SSDs) have no moving heads; seek time is near zero. Consequently, SSDs do not use mechanical elevator algorithms (SCAN/LOOK); they use simple FIFO or deadline block queues.',
        commonMistakes: [
          'Confusing SCAN with LOOK. SCAN travels all the way to track 0 or track MAX; LOOK stops as soon as the last request in that direction is reached.',
          'Forgetting that C-SCAN does NOT service any requests on its return swing from end to start.'
        ],
        tip: 'LOOK formula moving high from $H$: $(M - H) + (M - L) = 2M - H - L$ (where $M$ = max request, $L$ = min request).',
        interviewNote: 'Standard Core Question: "Why does C-SCAN provide more uniform waiting times than standard SCAN?" (Answer: In SCAN, tracks near the center are visited twice as often as edge tracks; C-SCAN treats cylinders as a circular list, giving all tracks equal average wait times).',
        practiceQuestions: [
          {
            id: 'q-os-ch28-1',
            type: 'mcq',
            question: 'Which disk scheduling algorithm causes the disk head to travel only as far as the final request in each direction before reversing, without touching the physical edge of the disk?',
            options: ['SCAN', 'C-SCAN', 'LOOK', 'FCFS'],
            correctIndex: 2,
            explanation: 'LOOK checks if requests exist ahead; if no more requests exist in the current direction, it reverses without traveling to the physical end of the disk.'
          }
        ],
        relatedTopics: ['os-virtual-memory-replacement', 'os-file-allocation-inodes']
      }
    ]
  },
  {
    id: 'os-ch29',
    number: 29,
    title: 'File Systems & UNIX Inode Architecture',
    description: 'File allocation methods (Contiguous, Linked, Indexed), directory structures, and the UNIX Inode architecture',
    topics: [
      {
        id: 'os-file-allocation-inodes',
        subjectId: 'os',
        chapterId: 'os-ch29',
        chapterNumber: 29,
        pageNumber: 29,
        title: 'File Allocation Methods & UNIX Inode Hierarchy',
        difficulty: 'intermediate',
        definition: 'A File System provides structured storage and retrieval of data on secondary storage. An Inode (index node) is a UNIX data structure representing a filesystem object with direct, single, double, and triple indirect block pointers.',
        whyItMatters: 'File system design dictates disk I/O performance, maximum file sizes, and resilience against sudden power loss crashes.',
        syntax: 'ls -li file.txt # Inspect Inode number and link count in Linux',
        explanation: [
          'Contiguous Allocation: File occupies contiguous disk blocks. Fast sequential and direct access, but suffers from severe External Fragmentation.',
          'Linked Allocation: File is a linked list of disk blocks. No external fragmentation, but slow random access ($O(N)$ traversal).',
          'Indexed Allocation: Brings block pointers into an index block (Inode). Enables fast direct and sequential access with zero external fragmentation.',
          'UNIX Inode Structure: Contains: File size, permissions, timestamps, 12 Direct Pointers (point to data blocks), 1 Single Indirect Pointer (points to block of pointers), 1 Double Indirect Pointer, and 1 Triple Indirect Pointer.',
          'Hard Links vs Soft Links: Hard Link shares the exact same Inode; Soft Link (Symlink) is a separate file whose content is the path string of the target.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <sys/stat.h>\n\nint main(void) {\n    struct stat st;\n    if (stat("/etc/passwd", &st) == 0) {\n        printf("Inode Number:  %lu\\n", st.st_ino);\n        printf("File Size:     %ld bytes\\n", st.st_size);\n        printf("Hard Links:    %lu\\n", st.st_nlink);\n        printf("Blocks (512B): %ld\\n", st.st_blocks);\n    }\n    return 0;\n}`,
          output: `Inode Number:  131102\nFile Size:     2840 bytes\nHard Links:    1\nBlocks (512B): 8`,
          annotations: [
            { line: 6, label: 'Reads metadata from Inode structure without reading file contents', type: 'blue' },
            { line: 7, label: 'Unique filesystem identifier pointing to disk index block', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'UNIX Multi-Level Inode Pointer Architecture',
          subtitle: 'Direct, Single Indirect, and Double Indirect Data Pointers',
          elements: [
            { id: '1', label: 'Inode (Metadata)', sublabel: 'Mode, Size, Timestamps', value: 'Root Index Block', status: 'active', arrowTo: '2' },
            { id: '2', label: '12 Direct Pointers', sublabel: 'Fast Access (12 * 4KB)', value: 'Points directly to Data', status: 'normal' },
            { id: '3', label: 'Single Indirect', sublabel: 'Points to 1024 Pointers', value: '1024 * 4KB = 4MB', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'Double Indirect', sublabel: '1024 * 1024 Pointers', value: '1M * 4KB = 4GB', status: 'referenced' }
          ]
        },
        important: 'In UNIX, a file\'s name is NOT stored in its Inode! The file name is stored inside the directory file, paired with the Inode number. This allows Hard Links (multiple names pointing to the same Inode).',
        commonMistakes: [
          'Confusing a Hard Link with a Soft Link (Symlink). A Hard Link shares the exact same Inode; deleting one name does not delete the file. A Soft Link is a separate file pointing to a path.',
          'Assuming deleting a file immediately wipes its disk blocks. In UNIX, blocks are only freed when the link count reaches 0 AND no running process has the file open.'
        ],
        tip: 'Formula to calculate maximum file size in a UNIX Inode: Sum the capacity of Direct pointers + Single indirect + Double indirect + Triple indirect pointers.',
        interviewNote: 'Standard Systems Interview Question: "What is the difference between a Hard Link and a Symbolic (Soft) Link?" (Answer: Hard link points to the same Inode and cannot cross file systems; Soft link is a new file containing a path reference and can cross file systems or point to directories).',
        practiceQuestions: [
          {
            id: 'q-os-ch29-1',
            type: 'mcq',
            question: 'Where is the filename of a file stored in a standard UNIX file system?',
            options: ['Inside the file\'s Inode structure', 'In the superblock', 'In the directory file entry mapping name to inode', 'At the start of the first data block'],
            correctIndex: 2,
            explanation: 'The filename is stored in the directory data block alongside the inode number; the inode itself contains only metadata and block pointers.'
          }
        ],
        relatedTopics: ['os-disk-scheduling-algorithms', 'os-protection-virtualization']
      }
    ]
  },
  {
    id: 'os-ch30',
    number: 30,
    title: 'Protection, Security & OS Virtualization',
    description: 'Protection domains, Access Control Lists (ACLs), Capabilities, Hypervisors (Type 1 vs 2), and Containerization',
    topics: [
      {
        id: 'os-protection-virtualization',
        subjectId: 'os',
        chapterId: 'os-ch30',
        chapterNumber: 30,
        pageNumber: 30,
        title: 'Access Control Lists, Virtualization & Containers (cgroups/namespaces)',
        difficulty: 'advanced',
        definition: 'Protection and Security mechanisms control access to system resources. Virtualization abstracts physical hardware: Virtual Machines (VMs) virtualize hardware via Hypervisors, while Containers virtualize the operating system kernel via Linux Namespaces and cgroups.',
        whyItMatters: 'Cloud computing, Docker, Kubernetes, and enterprise microservices depend on OS virtualization, isolation domains, and container primitives.',
        syntax: 'docker run -d --memory="512m" --cpus="1.0" nginx # Container resource limits via cgroups',
        explanation: [
          'Access Matrix: Model of protection where Rows = Domains/Users and Columns = Objects/Files. Implemented as Access Control Lists (ACLs, attached to objects) or Capabilities (attached to domains/tickets).',
          'Principle of Least Privilege: Programs, users, and systems should operate using the minimum set of privileges necessary to perform their task.',
          'Type 1 Hypervisor (Bare-Metal): Runs directly on bare hardware silicon with no host OS (e.g. VMware ESXi, KVM, Xen). High efficiency for cloud datacenters.',
          'Type 2 Hypervisor (Hosted): Runs as an application inside a host operating system (e.g. VirtualBox, VMware Workstation). Convenient for desktop development.',
          'Containerization (Docker / LXC): Shares the host OS kernel! Uses Linux Namespaces (PID, Mount, Net, User) for visibility isolation and Control Groups (cgroups) for resource limits (CPU, RAM, I/O).'
        ],
        example: {
          language: 'c',
          code: `// Linux Namespaces: Isolating Host Process Tree (Container Primitive)\n#define _GNU_SOURCE\n#include <sched.h>\n#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint container_child(void* arg) {\n    printf("[Container] Inside isolated PID namespace: My PID is %d!\\n", getpid());\n    return 0;\n}\n\nint main(void) {\n    char stack[8192];\n    // clone() with CLONE_NEWPID creates a containerized PID namespace\n    clone(container_child, stack + sizeof(stack), CLONE_NEWPID | SIGCHLD, NULL);\n    wait(NULL);\n    printf("[Host] Host system parent PID remains standard uncontainerized.\\n");\n    return 0;\n}`,
          output: `[Container] Inside isolated PID namespace: My PID is 1!\n[Host] Host system parent PID remains standard uncontainerized.`,
          annotations: [
            { line: 15, label: 'CLONE_NEWPID isolates child into a private PID namespace where it sees itself as PID 1', type: 'green' },
            { line: 17, label: 'Host system retains full visibility over child without isolation leak', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Virtual Machines (Hypervisor) vs Containers (Docker)',
          subtitle: 'Hardware Virtualization vs Kernel Namespace Isolation',
          elements: [
            { id: '1', label: 'Virtual Machine (VM)', sublabel: 'Type 1 / 2 Hypervisor', value: 'Complete Guest OS + Kernel', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Heavyweight Overhead', sublabel: 'Gigabytes of RAM per VM', value: 'Minutes to Boot', status: 'warning' },
            { id: '3', label: 'Container (Docker)', sublabel: 'Shares Host Linux Kernel', value: 'Namespaces & cgroups', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Lightweight Speed', sublabel: 'Megabytes of RAM', value: 'Milliseconds to Boot', status: 'referenced' }
          ]
        },
        important: 'Containers share the HOST kernel! Therefore, a Linux container CANNOT run a Windows kernel executable directly without running a full Virtual Machine.',
        commonMistakes: [
          'Confusing Containers with Virtual Machines. VMs virtualize the hardware and run separate full guest OS kernels; Containers virtualize only user space and share the single host kernel.',
          'Assuming containers provide the exact same hypervisor-level isolation. A kernel vulnerability or kernel crash on the host can affect all containers on that machine.'
        ],
        tip: 'Remember the two Linux kernel pillars of Docker: Namespaces (What a process can SEE) and Control Groups / cgroups (What a process can USE).',
        interviewNote: 'Standard Cloud / DevOps / OS Interview Question: "What is the architectural difference between a Container (like Docker) and a Virtual Machine?" (Answer: VMs virtualize hardware and run independent guest OS kernels via hypervisors; Containers share the host kernel and provide isolation using Linux Namespaces and cgroups).',
        practiceQuestions: [
          {
            id: 'q-os-ch30-1',
            type: 'mcq',
            question: 'Which Linux kernel feature is responsible for limiting and measuring how much CPU, memory, and disk I/O a containerized process can consume?',
            options: ['Linux Namespaces', 'Control Groups (cgroups)', 'Translation Lookaside Buffer', 'SELinux Access Matrix'],
            correctIndex: 1,
            explanation: 'Control Groups (cgroups) allocate, throttle, and monitor resource usage (CPU, RAM, network) for containers.'
          }
        ],
        relatedTopics: ['os-file-allocation-inodes', 'os-hardware-interface']
      }
    ]
  }
];
