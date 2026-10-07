import { SubjectQuestionPapers } from '../../types/notebook';

export const OS_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'os',
  subjectName: 'Operating Systems & Systems Architecture Engineering',
  courseCode: 'CS-202-OS',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-202-OS-S1',
      title: 'Operating Systems Principles, Concurrency & Memory Management Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-202-OS',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).',
        'Draw clear Gantt charts, process state transition diagrams, and paging address translation layouts where applicable.'
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
              id: 'os-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Dual-Mode Operation',
              question: 'Why does the CPU support a privileged Kernel Mode and an unprivileged User Mode?',
              markingBreakdown: ['Protection and isolation explanation: 1 Mark'],
              modelSolution: 'Dual-mode operation protects the system and other users by preventing user programs from executing dangerous privileged instructions or directly altering hardware and memory.',
              notebookCheckpoints: ['Hardware protection', 'Mode Bit 0 vs 1']
            },
            {
              id: 'os-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Process vs Thread',
              question: 'State two computational resources that threads of the same process share, and two they do NOT share.',
              markingBreakdown: ['Shared vs private resources: 1 Mark'],
              modelSolution: 'Shared: Heap memory and open file descriptors. Not shared (private): Call stack and CPU registers (including Program Counter).',
              notebookCheckpoints: ['Shared: Heap, Files', 'Private: Stack, Registers']
            },
            {
              id: 'os-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Convoy Effect',
              question: 'What is the Convoy Effect in First-Come, First-Served (FCFS) CPU scheduling?',
              markingBreakdown: ['Short jobs queued behind long job: 1 Mark'],
              modelSolution: 'The Convoy Effect occurs when short I/O-bound processes wait for an extended duration behind a long CPU-bound process, degrading overall CPU and device utilization.',
              notebookCheckpoints: ['Short processes wait behind long CPU job']
            },
            {
              id: 'os-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Critical Section Criteria',
              question: 'List the three mandatory conditions required for any valid solution to the Critical Section problem.',
              markingBreakdown: ['Three criteria named: 1 Mark'],
              modelSolution: '1. Mutual Exclusion, 2. Progress, 3. Bounded Waiting.',
              notebookCheckpoints: ['Mutual Exclusion', 'Progress', 'Bounded Waiting']
            },
            {
              id: 'os-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Coffman Deadlock Conditions',
              question: 'Name the four Coffman conditions necessary for a system deadlock.',
              markingBreakdown: ['All 4 conditions named: 1 Mark'],
              modelSolution: 'Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
              notebookCheckpoints: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Circular wait']
            },
            {
              id: 'os-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Internal vs External Fragmentation',
              question: 'Differentiate between Internal Fragmentation and External Fragmentation in memory allocation.',
              markingBreakdown: ['Definitions: 1 Mark'],
              modelSolution: 'External fragmentation occurs when total free memory exists to satisfy a request but is broken into non-contiguous blocks. Internal fragmentation occurs when assigned memory is slightly larger than requested (e.g. inside the last page).',
              notebookCheckpoints: ['External: non-contiguous free memory', 'Internal: wasted space inside allocated block']
            },
            {
              id: 'os-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Translation Lookaside Buffer (TLB)',
              question: 'What role does the TLB play in paging address translation?',
              markingBreakdown: ['Caching page-to-frame translations: 1 Mark'],
              modelSolution: 'The TLB is a high-speed hardware associative cache that stores recently accessed virtual page to physical frame translations to avoid accessing main memory page tables.',
              notebookCheckpoints: ['Caches page-to-frame mappings']
            },
            {
              id: 'os-s1-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Belady\'s Anomaly',
              question: 'Define Belady\'s Anomaly in virtual memory page replacement.',
              markingBreakdown: ['More frames causing more page faults: 1 Mark'],
              modelSolution: 'Belady\'s Anomaly is the phenomenon where allocating more physical page frames to a process paradoxically increases the total number of page faults (observed in FIFO).',
              notebookCheckpoints: ['More frames = more page faults in FIFO']
            },
            {
              id: 'os-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'UNIX Inode Role',
              question: 'Why is a file\'s name omitted from its Inode structure in UNIX file systems?',
              markingBreakdown: ['Hard links explanation: 1 Mark'],
              modelSolution: 'Omission of the filename from the Inode allows multiple directory entries (hard links) across different folders to reference the exact same underlying file Inode.',
              notebookCheckpoints: ['Enables hard links across directories']
            },
            {
              id: 'os-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Disk Seek Time',
              question: 'What is Seek Time in mechanical hard disk drives?',
              markingBreakdown: ['Arm head positioning time: 1 Mark'],
              modelSolution: 'Seek Time is the time required for the mechanical actuator arm to position the disk read/write heads over the target cylinder track.',
              notebookCheckpoints: ['Head arm travel to target track']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Kernel Mechanisms',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks. Write clear derivations.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'CPU Scheduling Gantt Chart & Metrics',
              question: 'Consider 4 processes arriving at time 0 with CPU burst times: P1 = 8, P2 = 4, P3 = 9, P4 = 5. (a) Draw the Gantt chart for Shortest Job First (SJF). (b) Calculate the Average Turnaround Time and Average Waiting Time.',
              markingBreakdown: [
                'Gantt chart drawing in SJF order: 2 Marks',
                'Turnaround times for each process: 1.5 Marks',
                'Waiting times and final averages: 1.5 Marks'
              ],
              modelSolution: '(a) SJF Scheduling Order (shortest burst first):\nP2(4) runs: 0 -> 4\nP4(5) runs: 4 -> 9\nP1(8) runs: 9 -> 17\nP3(9) runs: 17 -> 26\n\n(b) Metrics Calculation (Arrival Time = 0 for all):\n- P2: Completion = 4, TAT = 4, WT = 4 - 4 = 0\n- P4: Completion = 9, TAT = 9, WT = 9 - 5 = 4\n- P1: Completion = 17, TAT = 17, WT = 17 - 8 = 9\n- P3: Completion = 26, TAT = 26, WT = 26 - 9 = 17\n\nAverage Turnaround Time = (4 + 9 + 17 + 26) / 4 = 56 / 4 = 14.0 time units.\nAverage Waiting Time = (0 + 4 + 9 + 17) / 4 = 30 / 4 = 7.5 time units.',
              notebookCheckpoints: ['Order: P2, P4, P1, P3', 'Avg TAT = 14.0', 'Avg WT = 7.5']
            },
            {
              id: 'os-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Producer-Consumer Synchronization',
              question: 'Provide the semaphore-based synchronization code for the Bounded-Buffer Producer-Consumer problem using `mutex`, `empty`, and `full` semaphores. Explain how deadlocks are prevented by lock ordering.',
              markingBreakdown: [
                'Producer pseudocode with semaphores: 2 Marks',
                'Consumer pseudocode with semaphores: 2 Marks',
                'Lock ordering explanation: 1 Mark'
              ],
              modelSolution: 'Semaphores:\n- `mutex = 1` (binary)\n- `empty = N` (counting, buffer capacity)\n- `full = 0` (counting, items produced)\n\nProducer:\n```c\nwait(empty);  // Wait for space\nwait(mutex);  // Lock buffer\n// Add item to buffer\nsignal(mutex);\nsignal(full); // Signal new item available\n```\nConsumer:\n```c\nwait(full);   // Wait for item\nwait(mutex);  // Lock buffer\n// Remove item from buffer\nsignal(mutex);\nsignal(empty);// Signal space free\n```\nDeadlock Prevention: Notice `wait(empty)` is called BEFORE `wait(mutex)`. If `wait(mutex)` were called first and buffer was full, producer would hold the mutex while blocked on `empty`, locking consumer out and creating a deadlock!',
              notebookCheckpoints: ['wait(empty) before wait(mutex)', 'wait(full) before wait(mutex)']
            },
            {
              id: 'os-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Banker\'s Algorithm Safe State',
              question: 'A system has 3 processes (P0, P1, P2) and 12 units of a single resource. Current Allocation: P0 = 3, P1 = 2, P2 = 2. Maximum Needs: P0 = 8, P1 = 5, P2 = 9. Determine if the system is in a Safe State and provide the Safe Sequence.',
              markingBreakdown: [
                'Available resources and Need matrix calculation: 2 Marks',
                'Safety sequence trace: 2 Marks',
                'Conclusion: 1 Mark'
              ],
              modelSolution: 'Step 1: Compute Need:\n- Need[P0] = 8 - 3 = 5\n- Need[P1] = 5 - 2 = 3\n- Need[P2] = 9 - 2 = 7\n- Total Allocated = 3 + 2 + 2 = 7 units.\n- Available = 12 - 7 = 5 units.\n\nStep 2: Safety Trace:\n1. Check P1 (Need=3 <= Available=5): P1 runs, releases 2. New Available = 5 + 2 = 7.\n2. Check P0 (Need=5 <= Available=7): P0 runs, releases 3. New Available = 7 + 3 = 10.\n3. Check P2 (Need=7 <= Available=10): P2 runs, releases 2. New Available = 10 + 2 = 12.\nConclusion: The system is in a SAFE STATE with safe execution sequence: < P1, P0, P2 >.',
              notebookCheckpoints: ['Need: P0=5, P1=3, P2=7', 'Safe Sequence: < P1, P0, P2 >']
            },
            {
              id: 'os-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Effective Memory Access Time (EMAT)',
              question: 'In a paging system, the TLB access time is 15 ns, and main memory access time is 120 ns. If the TLB Hit Ratio is 85%, calculate the Effective Memory Access Time (EMAT).',
              markingBreakdown: [
                'Formula statement: 1.5 Marks',
                'Hit and Miss path calculation: 2 Marks',
                'Final EMAT result: 1.5 Marks'
              ],
              modelSolution: 'Formula:\nEMAT = Hit_Ratio × (TLB + Mem) + (1 - Hit_Ratio) × (TLB + 2 × Mem)\n\nValues:\n- Hit time = 15 + 120 = 135 ns\n- Miss time = 15 + 120 + 120 = 255 ns\n\nEMAT = 0.85 × (135) + 0.15 × (255)\nEMAT = 114.75 + 38.25 = 153.0 ns.',
              notebookCheckpoints: ['Hit = 135 ns, Miss = 255 ns', 'EMAT = 153.0 ns']
            },
            {
              id: 'os-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Page Replacement Trace: FIFO vs LRU',
              question: 'Given the page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3 with 3 physical frames. Compute the total number of page faults using: (a) FIFO, and (b) LRU.',
              markingBreakdown: [
                'FIFO trace and fault count: 2.5 Marks',
                'LRU trace and fault count: 2.5 Marks'
              ],
              modelSolution: 'String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3 (3 Frames)\n\n(a) FIFO Trace:\n- 7: [7] (F1)\n- 0: [7, 0] (F2)\n- 1: [7, 0, 1] (F3)\n- 2: [2, 0, 1] (F4, replaces 7)\n- 0: [2, 0, 1] (Hit)\n- 3: [2, 3, 1] (F5, replaces 0)\n- 0: [2, 3, 0] (F6, replaces 1)\n- 4: [4, 3, 0] (F7, replaces 2)\n- 2: [4, 2, 0] (F8, replaces 3)\n- 3: [4, 2, 3] (F9, replaces 0)\nFIFO Total Faults = 9.\n\n(b) LRU Trace:\n- 7: [7] (F1)\n- 0: [7, 0] (F2)\n- 1: [7, 0, 1] (F3)\n- 2: [2, 0, 1] (F4, 7 is LRU)\n- 0: [2, 0, 1] (Hit, 0 refreshed)\n- 3: [2, 0, 3] (F5, 1 is LRU)\n- 0: [2, 0, 3] (Hit, 0 refreshed)\n- 4: [4, 0, 3] (F6, 2 is LRU)\n- 2: [4, 0, 2] (F7, 3 is LRU)\n- 3: [3, 0, 2] (F8, 4 is LRU)\nLRU Total Faults = 8.',
              notebookCheckpoints: ['FIFO = 9 faults', 'LRU = 8 faults']
            },
            {
              id: 'os-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Disk Scheduling LOOK Algorithm',
              question: 'A disk queue has requests for cylinders: 98, 183, 37, 122, 14, 124, 65, 67. The head is currently at cylinder 53 moving toward larger cylinder numbers. Calculate total head movements using the LOOK scheduling algorithm.',
              markingBreakdown: [
                'Ascending servicing sequence: 2 Marks',
                'Reversal servicing sequence: 2 Marks',
                'Total head movements calculation: 1 Mark'
              ],
              modelSolution: 'Current Head = 53, Direction = High (increasing).\nRequests: 14, 37, 53(start), 65, 67, 98, 122, 124, 183.\n\nLOOK visits requests in forward direction up to maximum request (183):\nPath 1: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183\nDistance 1 = 183 - 53 = 130 cylinders.\n\nReverse direction down to lowest request (14):\nPath 2: 183 -> 37 -> 14\nDistance 2 = 183 - 14 = 169 cylinders.\n\nTotal Head Movements = 130 + 169 = 299 cylinders.',
              notebookCheckpoints: ['Forward: 53 to 183 = 130', 'Reverse: 183 to 14 = 169', 'Total = 299 cylinders']
            },
            {
              id: 'os-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Peterson\'s Solution Proof',
              question: 'Explain Peterson\'s algorithm for mutual exclusion between two processes (P0 and P1). Show how the variables `flag[2]` and `turn` satisfy Mutual Exclusion.',
              markingBreakdown: [
                'Algorithm structure and code: 2 Marks',
                'Mutual exclusion proof by contradiction: 3 Marks'
              ],
              modelSolution: 'Peterson\'s Variables:\n`boolean flag[2]; int turn;`\n\nProcess Pi (i = 0, j = 1):\n```c\nflag[i] = true;\nturn = j;\nwhile (flag[j] && turn == j); // Busy wait\n// Critical Section\nflag[i] = false;\n```\nProof of Mutual Exclusion:\nAssume both P0 and P1 are in critical section simultaneously. For P0 to enter, either `flag[1] == false` or `turn == 0`. For P1 to enter, either `flag[0] == false` or `turn == 1`.\nSince both set their flags to true before entry, both flags are true. Thus, `turn` must be simultaneously 0 and 1, which is a mathematical impossibility on shared memory. Hence, Mutual Exclusion is strictly preserved.',
              notebookCheckpoints: ['flag[i] = true; turn = j', 'Turn cannot be 0 and 1 simultaneously']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Kernel Systems',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks. Detailed diagrams and architecture required.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Paging Hardware & Multi-Level Page Tables',
              question: 'Describe the complete address translation pipeline in Paging. Explain why 32-bit and 64-bit systems require Multi-Level Page Tables (Hierarchical Paging) or Inverted Page Tables rather than a single flat page table.',
              markingBreakdown: [
                'Paging address translation diagram with Page p and Offset d: 4 Marks',
                'Memory size problem of single flat page table: 3 Marks',
                'Two-level / Multi-level page table structure and solution: 3 Marks'
              ],
              modelSolution: '1. Paging Address Translation:\n- CPU generates logical address divided into Page Number (p) and Offset (d).\n- Page Number p indexes the Page Table to fetch Frame Number f.\n- Physical Address = (f × Frame Size) + d.\n\n2. The Flat Page Table Memory Problem:\n- In a 32-bit system with 4 KB page size ($2^{12}$ bytes), there are $2^{20} \\approx 1,048,576$ pages.\n- If each Page Table Entry (PTE) is 4 bytes, a flat page table requires $4 \\text{ MB}$ of contiguous physical RAM per process.\n- For 100 running processes, this wastes 400 MB of RAM just for page tables, even if a process uses only a few kilobytes of actual code!\n\n3. Hierarchical (Multi-Level) Paging:\n- The page table itself is paged. In a two-level scheme, the 32-bit address is split into: Outer Page Table (10 bits) + Inner Page Table (10 bits) + Offset (12 bits).\n- Unallocated regions of virtual memory do not need inner page tables to be instantiated in physical RAM.\n- Only the top-level page directory (4 KB) and active leaf page tables are kept in memory, saving up to 99% of page table RAM.',
              notebookCheckpoints: ['Flat page table wastes 4MB per process', 'Multi-level paging allocates tables on demand']
            },
            {
              id: 'os-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Virtual Memory Page Fault Handling & Thrashing',
              question: 'Detail the complete step-by-step sequence of events executed by the hardware and operating system kernel when a Page Fault occurs. Define Thrashing and explain the Working-Set Model for preventing it.',
              markingBreakdown: [
                'Step-by-step page fault handling sequence: 4 Marks',
                'Thrashing definition and root cause: 3 Marks',
                'Working-Set model principle and formula: 3 Marks'
              ],
              modelSolution: '1. Step-by-Step Page Fault Handling:\n1. Process tries to access virtual memory address.\n2. MMU checks page table entry: Valid/Invalid bit is 0 (Invalid), triggering a hardware trap (Page Fault).\n3. CPU saves user registers and context; switches to Kernel Mode.\n4. Kernel verifies whether the address is a valid reference (if invalid, send SIGSEGV).\n5. Kernel locates the missing page in disk swap space.\n6. Kernel finds a free physical frame (or executes a page replacement algorithm like LRU to evict a victim page).\n7. Issues disk I/O to read page into chosen frame; process is placed in Waiting state.\n8. When disk I/O finishes, an I/O interrupt wakes the kernel.\n9. Kernel updates page table entry: frame number inserted, valid bit set to 1.\n10. Context restored; the CPU restarts the trapped instruction from scratch.\n\n2. Thrashing:\n- Occurs when total memory demand across processes exceeds available physical frames. The OS spends 95%+ of CPU time handling page faults and disk I/O rather than executing instructions.\n\n3. Working-Set Model:\n- Based on the principle of Locality of Reference.\n- Working Set $W(t, \\Delta)$ is the set of pages referenced in the most recent $\\Delta$ time units.\n- If total demand $D = \\sum |W_i| > \\text{Total Available Frames}$, thrashing occurs. The OS suspends a process until sufficient frames are freed.',
              notebookCheckpoints: ['10-step page fault lifecycle', 'Thrashing = excessive swapping', 'Working-Set model tracks active pages']
            },
            {
              id: 'os-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'UNIX Inode Architecture & File Allocation',
              question: 'Explain the UNIX Inode architecture with direct, single, double, and triple indirect pointers. If a disk block is 4 KB and a block pointer is 4 bytes, calculate the theoretical maximum file size supported by this Inode.',
              markingBreakdown: [
                'Inode structure and pointer hierarchy explanation: 4 Marks',
                'Calculation of direct, single, double, and triple indirect capacities: 4 Marks',
                'Final maximum file size sum: 2 Marks'
              ],
              modelSolution: '1. Inode Architecture:\n- 12 Direct Pointers: Point directly to data blocks.\n- 1 Single Indirect Pointer: Points to a block filled with data block pointers.\n- 1 Double Indirect Pointer: Points to a block filled with single indirect pointers.\n- 1 Triple Indirect Pointer: Points to a block filled with double indirect pointers.\n\n2. Capacity Calculation:\n- Block Size = 4 KB = 4096 bytes. Pointer Size = 4 bytes.\n- Pointers per block = $4096 / 4 = 1024 = 2^{10}$ pointers.\n\n- Direct Pointers: $12 \\times 4 \\text{ KB} = 48 \\text{ KB}$.\n- Single Indirect: $1024 \\times 4 \\text{ KB} = 4 \\text{ MB}$.\n- Double Indirect: $1024 \\times 1024 \\times 4 \\text{ KB} = 1,048,576 \\times 4 \\text{ KB} = 4 \\text{ GB}$.\n- Triple Indirect: $1024 \\times 1024 \\times 1024 \\times 4 \\text{ KB} = 2^{30} \\times 4 \\text{ KB} = 4 \\text{ TB}$.\n\nTotal Maximum File Size = $48 \\text{ KB} + 4 \\text{ MB} + 4 \\text{ GB} + 4 \\text{ TB} \\approx 4.004 \\text{ TB}$.',
              notebookCheckpoints: ['1024 pointers per 4KB block', 'Direct=48KB, Single=4MB, Double=4GB, Triple=4TB', 'Total ≈ 4 TB']
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-202-OS-S2',
      title: 'Kernel Synchronization, Multithreading & Memory Protection Examination',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-202-OS',
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
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'os-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Privileged Instructions',
              question: 'Give two examples of CPU instructions that are strictly privileged.',
              markingBreakdown: ['Two valid examples: 1 Mark'],
              modelSolution: '1. Halting the CPU (e.g. HLT instruction). 2. Modifying the Page Table Base Register (CR3 register).',
              notebookCheckpoints: ['HLT instruction', 'Modifying page table registers']
            },
            {
              id: 'os-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Multithreading Models',
              question: 'Why does the Many-to-One multithreading model fail to leverage multi-core CPUs?',
              markingBreakdown: ['Kernel sees single thread: 1 Mark'],
              modelSolution: 'Because user threads are mapped to a single kernel thread; if one thread blocks or runs, the kernel can only schedule one thread on one core at a time.',
              notebookCheckpoints: ['Kernel schedules single thread']
            },
            {
              id: 'os-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Starvation vs Deadlock',
              question: 'What is the key difference between Starvation and Deadlock?',
              markingBreakdown: ['Permanent freeze vs waiting: 1 Mark'],
              modelSolution: 'Deadlock is a permanent freeze where processes wait for events that can never happen; Starvation is indefinite waiting where resources are continually granted to higher-priority processes.',
              notebookCheckpoints: ['Deadlock is circular freeze', 'Starvation is indefinite wait']
            },
            {
              id: 'os-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Spinlocks vs Semaphores',
              question: 'When is a Spinlock preferred over a standard sleeping Semaphore?',
              markingBreakdown: ['Short wait time on multi-core: 1 Mark'],
              modelSolution: 'When the expected lock hold duration is shorter than the time required to perform two context switches on a multi-core processor.',
              notebookCheckpoints: ['Short lock duration on multi-core']
            },
            {
              id: 'os-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Resource Allocation Graph',
              question: 'Does a cycle in a Resource Allocation Graph always imply a deadlock?',
              markingBreakdown: ['Cycle condition for single vs multi instance: 1 Mark'],
              modelSolution: 'No. A cycle guarantees deadlock only if all resources have a single instance. With multi-instance resources, a cycle does not necessarily mean a deadlock exists.',
              notebookCheckpoints: ['Only guaranteed for single-instance resources']
            },
            {
              id: 'os-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Page Size Constraints',
              question: 'Why is the page size in virtual memory systems always a power of 2?',
              markingBreakdown: ['Hardware binary split: 1 Mark'],
              modelSolution: 'Because binary bit shifting can split a virtual address into a Page Number and Offset without needing expensive division or modulo arithmetic.',
              notebookCheckpoints: ['Bit-shift address splitting']
            },
            {
              id: 'os-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Dirty (Modify) Bit',
              question: 'What is the purpose of the "Dirty Bit" (Modify Bit) in a page table entry?',
              markingBreakdown: ['Avoids writing unmodified pages to disk: 1 Mark'],
              modelSolution: 'The dirty bit indicates whether the page has been modified in RAM; if 0 (clean), the page can be evicted without an expensive write-back to disk.',
              notebookCheckpoints: ['Prevents disk write if unmodified']
            },
            {
              id: 'os-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Working Set Locality',
              question: 'State the Principle of Locality of Reference.',
              markingBreakdown: ['Temporal and Spatial locality: 1 Mark'],
              modelSolution: 'Programs access a relatively small portion of their address space at any given time, exhibiting Temporal Locality (recently accessed items accessed soon) and Spatial Locality (nearby items accessed).',
              notebookCheckpoints: ['Temporal and Spatial locality']
            },
            {
              id: 'os-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Hard Links vs Directories',
              question: 'Why do most UNIX file systems prohibit hard links to directories?',
              markingBreakdown: ['Prevents directory graph cycles: 1 Mark'],
              modelSolution: 'To prevent circular directory loops that would break tree traversal algorithms and create un-deletable directory subtrees.',
              notebookCheckpoints: ['Prevents infinite directory loops']
            },
            {
              id: 'os-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'C-SCAN Advantage',
              question: 'What advantage does C-SCAN offer over bidirectional SCAN disk scheduling?',
              markingBreakdown: ['Uniform wait time: 1 Mark'],
              modelSolution: 'C-SCAN provides uniform waiting times for all cylinder requests by always servicing requests in a single direction and resetting.',
              notebookCheckpoints: ['Uniform waiting times']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Kernel Mechanisms',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Preemptive Priority Scheduling',
              question: 'Consider 3 processes: P1(Arrival 0, Burst 6, Priority 2), P2(Arrival 1, Burst 4, Priority 1 [Highest]), P3(Arrival 2, Burst 2, Priority 3). Draw the Gantt chart for Preemptive Priority Scheduling and find the average turnaround time.',
              markingBreakdown: ['Preemption trace: 3 Marks', 'Average turnaround time: 2 Marks'],
              modelSolution: 'Time 0: P1 arrives and runs (0 -> 1). Remaining: P1(5).\nTime 1: P2 arrives with higher priority (1 < 2). P1 is preempted! P2 runs (1 -> 5) and finishes!\nTime 2: P3 arrives (priority 3), placed in ready queue.\nTime 5: Highest priority available is P1 (priority 2). P1 runs (5 -> 10) and finishes!\nTime 10: P3 runs (10 -> 12) and finishes!\n\nMetrics:\n- P2: Completion = 5, TAT = 5 - 1 = 4\n- P1: Completion = 10, TAT = 10 - 0 = 10\n- P3: Completion = 12, TAT = 12 - 2 = 10\nAverage Turnaround Time = (4 + 10 + 10) / 3 = 24 / 3 = 8.0 time units.',
              notebookCheckpoints: ['P2 preempts P1 at t=1', 'Avg TAT = 8.0']
            },
            {
              id: 'os-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Dining Philosophers Problem',
              question: 'Explain the Dining Philosophers synchronization problem. Describe two distinct strategies to prevent deadlock among the philosophers.',
              markingBreakdown: ['Problem explanation: 2 Marks', 'Two deadlock prevention solutions: 3 Marks'],
              modelSolution: 'Problem: 5 philosophers sit around a circular table with 5 chopsticks. Each philosopher needs 2 chopsticks (left and right) to eat. If all 5 pick up their left chopstick simultaneously, a Circular Wait occurs and all deadlock.\n\nSolutions:\n1. Asymmetric Solution: Odd philosophers pick up left chopstick first, then right; even philosophers pick up right chopstick first, then left. This breaks the Circular Wait condition.\n2. Room Capacity Limit: Allow at most 4 philosophers to sit at the table simultaneously using a counting semaphore initialized to 4. By Pigeonhole Principle, at least one philosopher gets 2 chopsticks.',
              notebookCheckpoints: ['Asymmetric odd/even chopstick pick', 'Max 4 philosophers semaphore']
            },
            {
              id: 'os-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Deadlock Detection Algorithm',
              question: 'How does an operating system detect deadlocks when multiple instances of resource types exist? Explain the multi-instance deadlock detection algorithm.',
              markingBreakdown: ['Work and Finish vector algorithm: 3 Marks', 'Deadlock determination: 2 Marks'],
              modelSolution: 'Algorithm:\n1. Initialize `Work = Available` vector.\n2. Set `Finish[i] = false` for processes where Allocation[i] != 0; true if Allocation[i] == 0.\n3. Find an index i such that `Finish[i] == false` and `Request[i] <= Work`.\n   If found: `Work = Work + Allocation[i]`, `Finish[i] = true`, repeat step 3.\n4. If no such i exists: If any `Finish[i] == false`, then the system is in a deadlock, and process Pi is deadlocked.',
              notebookCheckpoints: ['Work = Available vector', 'Finish[i] == false means deadlocked']
            },
            {
              id: 'os-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Inverted Page Tables',
              question: 'What is an Inverted Page Table? Explain how it solves the massive memory overhead of 64-bit address spaces.',
              markingBreakdown: ['Inverted page table architecture: 3 Marks', 'Memory reduction mechanism: 2 Marks'],
              modelSolution: 'Architecture:\nInstead of having a page table per process with an entry for every virtual page, an Inverted Page Table has exactly one entry for each physical frame in RAM.\nEach entry stores `<Process_ID, Page_Number>` currently occupying that physical frame.\n\n64-bit Memory Solution:\nVirtual address spaces in 64-bit systems are astronomical ($2^{64}$ bytes). A standard page table would be billions of gigabytes. An inverted page table size depends strictly on PHYSICAL RAM size, not virtual address space size, keeping page table memory small and fixed.',
              notebookCheckpoints: ['One entry per physical frame', 'Independent of virtual address space size']
            },
            {
              id: 'os-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Optimal Page Replacement (OPT)',
              question: 'Using the reference string: 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 with 3 physical frames, trace the Optimal Page Replacement algorithm and state the total page faults.',
              markingBreakdown: ['Trace steps: 3 Marks', 'Total page faults: 2 Marks'],
              modelSolution: 'Optimal algorithm replaces the page that will not be used for the longest period in the future:\n- 2: [2] (Fault 1)\n- 3: [2, 3] (Fault 2)\n- 2: [2, 3] (Hit)\n- 1: [2, 3, 1] (Fault 3)\n- 5: [2, 3, 5] (Fault 4, 1 is never used again in future!)\n- 2: [2, 3, 5] (Hit)\n- 4: [2, 4, 5] (Fault 5, 3 used at step 9, 5 at step 8, 2 at step 6; evicts 3)\n- 5: [2, 4, 5] (Hit)\n- 3: [2, 3, 5] (Fault 6, 4 is never used again!)\n- 2: [2, 3, 5] (Hit)\n- 5: [2, 3, 5] (Hit)\n- 2: [2, 3, 5] (Hit)\nTotal Optimal Page Faults = 6.',
              notebookCheckpoints: ['Evicts page unused longest in future', 'Total OPT faults = 6']
            },
            {
              id: 'os-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'File Allocation Methods Comparison',
              question: 'Compare Contiguous, Linked, and Indexed file allocation methods with respect to: (a) External fragmentation, and (b) Direct/Random access performance.',
              markingBreakdown: ['Contiguous analysis: 1.5 Marks', 'Linked analysis: 1.5 Marks', 'Indexed analysis: 2 Marks'],
              modelSolution: '| Method | External Fragmentation | Direct (Random) Access |\n|---|---|---|\n| Contiguous | High (severe problem) | Very Fast ($O(1)$ offset calculation) |\n| Linked | Zero (blocks anywhere) | Very Poor ($O(N)$ sequential pointer traversal) |\n| Indexed | Zero (blocks anywhere) | Fast ($O(1)$ index block lookup) |',
              notebookCheckpoints: ['Table correctly compares fragmentation and access time']
            },
            {
              id: 'os-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'C-LOOK Disk Scheduling',
              question: 'Given disk requests: 95, 180, 34, 119, 11, 123, 62, 64 with head at 50 moving toward higher tracks. Calculate total head seek movements using C-LOOK.',
              markingBreakdown: ['Forward track trace: 2 Marks', 'Return jump trace: 2 Marks', 'Total seek movements: 1 Mark'],
              modelSolution: 'Head = 50, Direction = High.\nSorted Requests: 11, 34, 50(head), 62, 64, 95, 119, 123, 180.\n\n1. Sweep from 50 to maximum request (180):\n   Movement = 180 - 50 = 130 cylinders.\n2. C-LOOK jumps directly from highest request (180) to lowest request (11):\n   Movement = 180 - 11 = 169 cylinders.\n3. Sweep from 11 up to last request before initial head (34):\n   Movement = 34 - 11 = 23 cylinders.\n\nTotal Head Movements = 130 + 169 + 23 = 322 cylinders.\n(Note: If the return jump is considered unserviced seek, 130 + 23 = 153 cylinders active seek).',
              notebookCheckpoints: ['50 to 180 = 130', '180 to 11 = 169', '11 to 34 = 23']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Kernel Systems',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Complete CPU Scheduling Evaluation',
              question: 'Consider 4 processes:\nP1: Arrival 0, Burst 8\nP2: Arrival 1, Burst 4\nP3: Arrival 2, Burst 9\nP4: Arrival 3, Burst 5\n(a) Draw Gantt charts for: (i) FCFS, (ii) Shortest Remaining Time First (SRTF), (iii) Round Robin with Quantum = 4.\n(b) Compute Average Waiting Time for each algorithm and determine the most optimal algorithm for this workload.',
              markingBreakdown: [
                'FCFS Gantt chart and waiting times: 3 Marks',
                'SRTF Gantt chart and waiting times: 3 Marks',
                'Round Robin Gantt chart and waiting times: 3 Marks',
                'Comparative evaluation: 1 Mark'
              ],
              modelSolution: '(a) FCFS:\nOrder: P1(0-8), P2(8-12), P3(12-21), P4(21-26).\nWT: P1=0, P2=7, P3=10, P4=18. Avg WT = 35 / 4 = 8.75.\n\n(b) SRTF (Preemptive):\n- t=0: P1 runs (0-1). Remaining: P1(7)\n- t=1: P2 arrives (burst 4 < 7). P1 preempted! P2 runs (1-5) and finishes! WT(P2) = 0.\n- t=5: Remaining: P4(5), P1(7), P3(9). P4 runs (5-10) and finishes! WT(P4) = 5 - 3 = 2.\n- t=10: P1 runs (10-17) and finishes! WT(P1) = (10 - 1) = 9.\n- t=17: P3 runs (17-26) and finishes! WT(P3) = 17 - 2 = 15.\nAvg WT (SRTF) = (9 + 0 + 15 + 2) / 4 = 26 / 4 = 6.5.\n\n(c) Round Robin (Q = 4):\nOrder: P1(0-4), P2(4-8 finishes), P4(8-12), P1(12-16 finishes), P3(16-20), P4(20-21 finishes), P3(21-26 finishes).\nAvg WT (RR) = 7.25.\n\nConclusion: SRTF is the most optimal algorithm with the minimum average waiting time of 6.5 time units.',
              notebookCheckpoints: ['FCFS Avg WT = 8.75', 'SRTF Avg WT = 6.5 (Optimal)', 'RR Avg WT = 7.25']
            },
            {
              id: 'os-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Classical Readers-Writers Problem & Starvation',
              question: 'Formulate the Readers-Writers synchronization problem. Provide complete pseudocode for the First Readers-Writers problem (Reader Preference). Explain why it leads to Writer Starvation and how Writer Preference resolves it.',
              markingBreakdown: [
                'Problem definition and invariants: 3 Marks',
                'Reader preference pseudocode with mutex and rw_mutex: 4 Marks',
                'Writer starvation cause and solution: 3 Marks'
              ],
              modelSolution: '1. Problem Invariants:\n- Any number of readers can read the database concurrently.\n- Only one writer can write at a time (exclusive access).\n- No reader may read while a writer is writing.\n\n2. Reader Preference Pseudocode:\n```c\nint read_count = 0;\nsem_t mutex = 1;    // Protects read_count\nsem_t rw_mutex = 1; // Exclusive writer lock\n\nvoid* reader(void* arg) {\n    wait(mutex);\n    read_count++;\n    if (read_count == 1)\n        wait(rw_mutex); // First reader locks out writers\n    signal(mutex);\n    \n    // Reading data\n    \n    wait(mutex);\n    read_count--;\n    if (read_count == 0)\n        signal(rw_mutex); // Last reader unblocks writers\n    signal(mutex);\n}\n\nvoid* writer(void* arg) {\n    wait(rw_mutex);\n    // Writing data\n    signal(rw_mutex);\n}\n```\n3. Writer Starvation:\nIf a continuous stream of readers arrives, `read_count` never drops to 0. The `rw_mutex` remains locked indefinitely, starving the writer.\nSolution (Writer Preference): When a writer declares its intent to write, newly arriving readers are blocked from entering, allowing active readers to drain and the writer to execute.',
              notebookCheckpoints: ['First reader locks rw_mutex', 'Last reader releases rw_mutex', 'Writer starvation solved by writer preference']
            },
            {
              id: 'os-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Segmented Paging vs Pure Paging',
              question: 'Contrast Segmentation with Paging. Explain how modern hardware (like x86_64) combines both into Segmented Paging, detailing the logical address transformation to linear address, and then to physical address.',
              markingBreakdown: [
                'Segmentation (programmer view) vs Paging (hardware view): 4 Marks',
                'Segmented Paging address translation architecture: 4 Marks',
                'Protection and sharing advantages: 2 Marks'
              ],
              modelSolution: '1. Segmentation vs Paging:\n- Paging: Non-contiguous fixed-size blocks (4KB). Machine-centric; invisible to programmer; eliminates external fragmentation.\n- Segmentation: Variable-sized logical units (Code, Stack, Function, Arrays). User-centric; supports protection and sharing naturally, but suffers from external fragmentation.\n\n2. Segmented Paging (e.g. x86_64 Architecture):\n- Combines the user-logical perspective of segmentation with the physical efficiency of paging.\n- Step 1: Logical Address = `<Segment Selector, Segment Offset>`.\n- Step 2: Segment descriptor table verifies limit and permissions, adding base address to offset to generate a 64-bit Linear (Virtual) Address.\n- Step 3: The Linear Address is partitioned into page directory and page table indices (`p1, p2, p3, p4, offset`).\n- Step 4: MMU translates Linear Address into Physical RAM Address using multi-level page tables.\n\n3. Advantages: Modules are protected with segment-level access rights (read, write, execute), while underlying physical RAM remains cleanly paged with zero external fragmentation.',
              notebookCheckpoints: ['Segmentation = user view', 'Paging = physical frames', 'Linear address bridge']
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-202-OS-S3',
      title: 'Operating System Internals, Storage Engines & Concurrency Control',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-202-OS',
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
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'os-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Interrupt Vector Table',
              question: 'What is an Interrupt Vector Table (IVT)?',
              markingBreakdown: ['Table of interrupt handler memory addresses: 1 Mark'],
              modelSolution: 'An array of memory addresses indexed by interrupt number, pointing to the corresponding operating system interrupt service routines (ISRs).',
              notebookCheckpoints: ['Array of ISR memory pointers']
            },
            {
              id: 'os-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Orphan Process Adoption',
              question: 'Which system process adopts an Orphan Process when its parent terminates in Linux?',
              markingBreakdown: ['init or systemd PID 1: 1 Mark'],
              modelSolution: 'The root process `init` (PID 1) or `systemd` adopts orphaned child processes and reaps their exit status.',
              notebookCheckpoints: ['init / systemd (PID 1)']
            },
            {
              id: 'os-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Atomic Test-and-Set',
              question: 'Why must hardware synchronization instructions like Test-and-Set or Compare-and-Swap be atomic?',
              markingBreakdown: ['Prevents race condition during read-modify-write: 1 Mark'],
              modelSolution: 'To guarantee that the read-modify-write memory cycle executes uninterruptibly, preventing race conditions between concurrent CPU cores.',
              notebookCheckpoints: ['Uninterruptible read-modify-write']
            },
            {
              id: 'os-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Multi-Level Feedback Queue',
              question: 'What is the primary objective of a Multilevel Feedback Queue (MLFQ) scheduler?',
              markingBreakdown: ['Adaptive priority based on CPU vs I/O behavior: 1 Mark'],
              modelSolution: 'MLFQ dynamically adjusts process priority based on past behavior, favoring interactive I/O-bound jobs while demoting CPU-bound jobs to lower-priority queues.',
              notebookCheckpoints: ['Dynamic priority adjustment']
            },
            {
              id: 'os-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Circular Wait Invalidation',
              question: 'How can the Circular Wait Coffman condition be practically prevented in an OS?',
              markingBreakdown: ['Linear resource ordering: 1 Mark'],
              modelSolution: 'By imposing a strict total linear ordering on all resources, requiring processes to request resources in strictly ascending numerical order.',
              notebookCheckpoints: ['Ascending linear resource ordering']
            },
            {
              id: 'os-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Memory Compaction',
              question: 'Why is memory compaction only possible if relocation is dynamic at runtime?',
              markingBreakdown: ['Relocatable base register: 1 Mark'],
              modelSolution: 'Because moving a process in physical RAM changes its physical base address, which requires dynamic hardware base-register recalculation during execution.',
              notebookCheckpoints: ['Dynamic base register translation']
            },
            {
              id: 'os-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Valid/Invalid Bit',
              question: 'What does a "0" (Invalid) value in a page table entry signify during demand paging?',
              markingBreakdown: ['Page not in physical memory: 1 Mark'],
              modelSolution: 'It indicates that the page either does not belong to the process virtual address space or is currently residing on disk swap space rather than physical RAM.',
              notebookCheckpoints: ['Page on disk swap or illegal']
            },
            {
              id: 'os-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Working Set Window',
              question: 'What does the parameter Δ (Delta) represent in the Working-Set Model?',
              markingBreakdown: ['Working set time window size: 1 Mark'],
              modelSolution: 'Delta represents the fixed window of time (or number of page references) used to monitor recently active pages for a process.',
              notebookCheckpoints: ['Page reference history window']
            },
            {
              id: 'os-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'File Control Block (FCB)',
              question: 'What is the generic term for an Inode in non-UNIX file systems?',
              markingBreakdown: ['File Control Block (FCB): 1 Mark'],
              modelSolution: 'File Control Block (FCB).',
              notebookCheckpoints: ['File Control Block (FCB)']
            },
            {
              id: 'os-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Rotational Latency',
              question: 'What is Rotational Latency in hard disk drives?',
              markingBreakdown: ['Platter spin time to sector: 1 Mark'],
              modelSolution: 'The time taken for the rotating disk platter to position the desired sector under the read/write head.',
              notebookCheckpoints: ['Platter spin time to target sector']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Kernel Mechanisms',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Context Switch Hardware Mechanics',
              question: 'Detail the hardware and software actions that occur when the OS executes a Context Switch between process P1 and process P2.',
              markingBreakdown: [
                'State save actions for P1: 2.5 Marks',
                'State restore actions for P2: 2.5 Marks'
              ],
              modelSolution: '1. In response to an interrupt/trap, CPU saves current PC and status registers onto the kernel stack.\n2. OS kernel updates P1 state from Running to Ready/Waiting in PCB1.\n3. All remaining general-purpose CPU registers, floating-point units, and stack pointers are copied into PCB1.\n4. CPU scheduler selects process P2 from the Ready Queue.\n5. OS updates P2 state to Running in PCB2.\n6. Memory management unit registers (e.g. CR3 page table base register) are reloaded with P2\'s page table, flushing the TLB.\n7. Hardware registers and Program Counter are restored from PCB2.\n8. CPU executes return-from-trap instruction, switching to user mode and resuming P2.',
              notebookCheckpoints: ['Save P1 registers to PCB1', 'Switch page tables (CR3)', 'Restore P2 registers from PCB2']
            },
            {
              id: 'os-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Multi-threading Models Comparison',
              question: 'Compare Many-to-One, One-to-One, and Many-to-Many multithreading models with their advantages and disadvantages.',
              markingBreakdown: [
                'Many-to-one model: 1.5 Marks',
                'One-to-one model (Linux pthreads): 2 Marks',
                'Many-to-many model: 1.5 Marks'
              ],
              modelSolution: '1. Many-to-One: Many user threads mapped to 1 kernel thread. Fast user-space creation, but if one thread makes a blocking system call, ALL threads block. No multi-core parallelism.\n2. One-to-One (Linux / Windows standard): Each user thread maps to a kernel thread. Provides true multi-core hardware parallelism; one blocking thread does not block others. Slightly higher thread creation overhead.\n3. Many-to-Many: Multiplexes many user threads onto a smaller or equal number of kernel threads. Combines speed with concurrency, but complex to implement.',
              notebookCheckpoints: ['Many-to-one blocks all on I/O', 'One-to-one provides true multi-core parallelism']
            },
            {
              id: 'os-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Counting vs Binary Semaphores Implementation',
              question: 'Demonstrate how a Counting Semaphore can be implemented using only Binary Semaphores and integer counters.',
              markingBreakdown: ['Data structure definitions: 2 Marks', 'wait() and signal() logic: 3 Marks'],
              modelSolution: '```c\nstruct CountingSemaphore {\n    int value;\n    BinarySemaphore mutex; // Initialized to 1\n    BinarySemaphore block; // Initialized to 0\n};\n\nvoid wait(CountingSemaphore *cs) {\n    wait(cs->mutex);\n    cs->value--;\n    if (cs->value < 0) {\n        signal(cs->mutex);\n        wait(cs->block); // Sleep until signaled\n    } else {\n        signal(cs->mutex);\n    }\n}\n\nvoid signal(CountingSemaphore *cs) {\n    wait(cs->mutex);\n    cs->value++;\n    if (cs->value <= 0) {\n        signal(cs->block); // Wake a sleeping thread\n    }\n    signal(cs->mutex);\n}\n```',
              notebookCheckpoints: ['Uses mutex binary semaphore', 'Uses block binary semaphore for sleeping']
            },
            {
              id: 'os-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Second-Chance (Clock) Page Replacement',
              question: 'Explain the Second-Chance (Clock) page replacement algorithm. How does it approximate LRU using a Reference Bit?',
              markingBreakdown: ['Circular list and pointer mechanism: 3 Marks', 'Reference bit inspection and clearing: 2 Marks'],
              modelSolution: 'Architecture:\nFrames are organized in a circular buffer with a clock hand pointer.\nEach page has a Reference Bit (set to 1 by hardware whenever accessed).\n\nOperation:\n1. When a victim page is needed, the clock hand inspects the current frame.\n2. If Reference Bit == 0: Select this page as the victim for replacement.\n3. If Reference Bit == 1: Clear the bit to 0 (gives it a "second chance"), advance the clock hand to the next frame, and repeat.\nApproximates LRU with low $O(1)$ hardware cost without maintaining expensive linked-list timestamp stacks.',
              notebookCheckpoints: ['Circular frame queue with clock hand', 'Ref bit 1 cleared to 0 (second chance)']
            },
            {
              id: 'os-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Free Space Management: Bitmaps vs Linked Lists',
              question: 'Compare the Bit Vector (Bitmap) approach and the Linked List approach for managing free disk blocks in a file system.',
              markingBreakdown: ['Bitmap approach: 2.5 Marks', 'Linked list approach: 2.5 Marks'],
              modelSolution: '1. Bit Vector (Bitmap):\n- Each disk block is represented by 1 bit (0 = allocated, 1 = free).\n- Advantages: Extremely fast to find contiguous free blocks using hardware word-scanning instructions (find-first-one).\n- Disadvantage: Consumes substantial memory unless kept entirely cached in RAM.\n\n2. Linked Free List:\n- Pointers linking free blocks together; first free block points to the next.\n- Advantages: Zero extra memory overhead (pointers stored directly inside the unused free disk blocks themselves).\n- Disadvantage: Finding contiguous free blocks requires traversing the entire disk, causing slow disk I/O.',
              notebookCheckpoints: ['Bitmap: fast contiguous search, memory overhead', 'Linked list: zero memory overhead, slow traversal']
            },
            {
              id: 'os-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'SCAN vs SSTF Starvation',
              question: 'Why does Shortest Seek Time First (SSTF) cause starvation for distant disk cylinder requests, and how does the Elevator algorithm (SCAN) resolve it?',
              markingBreakdown: ['SSTF starvation cause: 2.5 Marks', 'SCAN elevator fairness: 2.5 Marks'],
              modelSolution: '1. SSTF Starvation:\nSSTF always picks the request closest to the current head position. If new requests continuously arrive near the current head track, the arm stays trapped locally, and requests located on far tracks starve indefinitely.\n\n2. SCAN Solution:\nSCAN forces the head arm to sweep continuously in one fixed direction (e.g. from track 0 to track 199), servicing every request along its path before reversing. This ensures a strict upper bound on how long any request must wait, eliminating starvation.',
              notebookCheckpoints: ['SSTF traps head locally with close arrivals', 'SCAN sweeps across entire disk predictably']
            },
            {
              id: 'os-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Essential Linux CLI & Shell Redirection',
              question: 'Explain the UNIX standard I/O streams (stdin, stdout, stderr) and show how shell redirection (`>`, `>>`, `2>&1`, and `|`) operates at the file descriptor level.',
              markingBreakdown: ['FD 0, 1, 2 explanation: 2 Marks', 'Redirection operators and pipe mechanics: 3 Marks'],
              modelSolution: 'UNIX Standard Streams:\n- FD 0: standard input (stdin)\n- FD 1: standard output (stdout)\n- FD 2: standard error (stderr)\n\nRedirection Operators:\n- `>`: Closes FD 1 and reopens it bound to target file (truncates file).\n- `>>`: Closes FD 1 and reopens in append mode (`O_APPEND`).\n- `2>&1`: Duplicates FD 1 to FD 2 using `dup2()`, routing error logs to standard output.\n- `|` (Pipe): Creates an inter-process FIFO pipe via `pipe()`; connects stdout (FD 1) of left command directly to stdin (FD 0) of right command.',
              notebookCheckpoints: ['FD 0=in, 1=out, 2=err', 'dup2() duplicates descriptors', 'pipe() connects stdout to stdin']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Kernel Systems',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'os-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Banker\'s Algorithm Full Simulation',
              question: 'Consider 5 processes (P0, P1, P2, P3, P4) and 3 resource types (A, B, C) with instances (10, 5, 7).\nAllocation Matrix:\nP0: [0, 1, 0]\nP1: [2, 0, 0]\nP2: [3, 0, 2]\nP3: [2, 1, 1]\nP4: [0, 0, 2]\n\nMax Matrix:\nP0: [7, 5, 3]\nP1: [3, 2, 2]\nP2: [9, 0, 2]\nP3: [2, 2, 2]\nP4: [4, 3, 3]\n\n(a) Compute the Need Matrix and Available Vector.\n(b) Prove whether the system is in a Safe State and find the Safe Sequence.\n(c) If Process P1 requests [1, 0, 2], can the request be granted immediately?',
              markingBreakdown: [
                'Need matrix and Available vector: 3 Marks',
                'Safety sequence derivation: 4 Marks',
                'Resource request algorithm evaluation for P1: 3 Marks'
              ],
              modelSolution: '(a) Allocation Sum = [7, 2, 5].\nAvailable = Total - Allocated = [10-7, 5-2, 7-5] = [3, 3, 2].\nNeed Matrix (Max - Allocation):\nP0: [7, 4, 3]\nP1: [1, 2, 2]\nP2: [6, 0, 0]\nP3: [0, 1, 1]\nP4: [4, 3, 1]\n\n(b) Safety Trace (Available = [3, 3, 2]):\n1. P1 (Need [1, 2, 2] <= [3, 3, 2]): Runs, releases [2, 0, 0]. New Avail = [5, 3, 2].\n2. P3 (Need [0, 1, 1] <= [5, 3, 2]): Runs, releases [2, 1, 1]. New Avail = [7, 4, 3].\n3. P4 (Need [4, 3, 1] <= [7, 4, 3]): Runs, releases [0, 0, 2]. New Avail = [7, 4, 5].\n4. P0 (Need [7, 4, 3] <= [7, 4, 5]): Runs, releases [0, 1, 0]. New Avail = [7, 5, 5].\n5. P2 (Need [6, 0, 0] <= [7, 5, 5]): Runs, releases [3, 0, 2]. New Avail = [10, 5, 7].\nSystem is in SAFE STATE with sequence: < P1, P3, P4, P0, P2 >.\n\n(c) Request from P1: [1, 0, 2]:\n- Request [1, 0, 2] <= Need [1, 2, 2] (Valid)\n- Request [1, 0, 2] <= Available [3, 3, 2] (Valid)\nSimulate allocation: New Available = [3-1, 3-0, 2-2] = [2, 3, 0].\nP1 Alloc = [3, 0, 2], P1 Need = [0, 2, 0].\nCheck safety: P1 can run (Need [0, 2, 0] <= [2, 3, 0]), releasing to [5, 3, 2]... safe sequence <P1, P3, P4, P0, P2> still holds!\nConclusion: Request CAN be granted immediately.',
              notebookCheckpoints: ['Need matrix correctly calculated', 'Safe sequence: <P1, P3, P4, P0, P2>', 'Request for P1 granted safely']
            },
            {
              id: 'os-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Virtual Memory Thrashing & Page Fault Frequency',
              question: 'Explain the phenomenon of Thrashing in depth. How does the Operating System detect Thrashing? Compare the Working-Set Strategy with the Page-Fault Frequency (PFF) Strategy for preventing thrashing.',
              markingBreakdown: [
                'Thrashing cause, CPU utilization collapse, and page fault spike: 4 Marks',
                'Working-Set strategy mechanics and formula: 3 Marks',
                'Page-Fault Frequency upper and lower threshold policy: 3 Marks'
              ],
              modelSolution: '1. Thrashing Dynamics:\n- When degree of multiprogramming is increased, processes share a smaller slice of physical frames.\n- Eventually, processes don\'t have enough frames to hold their active working sets.\n- Page fault rate spikes exponentially. Processes enter the wait queue for disk paging.\n- The CPU scheduler notices CPU utilization dropping and naively tries to launch MORE processes, worsening the paging queue until CPU utilization collapses near 0%.\n\n2. Working-Set Strategy:\n- Tracks the Working Set Window $\\Delta$ (e.g. last 10,000 memory references).\n- $WSS_i$ = total pages referenced in window $\\Delta$ by process $P_i$.\n- Total demand $D = \\sum WSS_i$.\n- If $D > \\text{Total Frames Available}$, the OS preemptively suspends a process and swaps its pages out, preventing thrashing.\n\n3. Page-Fault Frequency (PFF) Strategy:\n- More direct than Working-Set tracking.\n- Establishes an Upper Threshold and Lower Threshold for acceptable page fault rate.\n- If a process exceeds Upper Threshold -> it needs more memory; allocate an additional frame.\n- If a process drops below Lower Threshold -> it has excess frames; reclaim a frame.\n- If page fault rate exceeds upper bound and no free frames exist, suspend the process.',
              notebookCheckpoints: ['CPU drops while disk queue spikes', 'Working-Set monitors reference window', 'PFF uses upper/lower fault rate thresholds']
            },
            {
              id: 'os-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'UNIX Process Fork-Exec & IPC Architecture',
              question: 'Explain how the UNIX operating system implements process creation, program loading, and Inter-Process Communication (IPC). Compare Pipes, Shared Memory, and Message Queues in terms of speed, synchronization requirements, and kernel involvement.',
              markingBreakdown: [
                'fork(), exec(), wait() interaction lifecycle: 4 Marks',
                'Pipes, Shared Memory, Message Queues comparison: 4 Marks',
                'Synchronization implications of Shared Memory: 2 Marks'
              ],
              modelSolution: '1. Process Spawning Lifecycle:\n- `fork()` clones the calling process, assigning a new PID, duplicating file descriptors, and establishing Copy-On-Write memory.\n- `exec()` loads an ELF binary from disk, wiping the child\'s address space and resetting the program counter to the executable entry point.\n- `wait()` suspends the parent until the child exits, capturing the exit code and preventing zombie accumulation.\n\n2. IPC Comparison:\n- Pipes: Half-duplex byte stream. Requires data copying from user space to kernel buffer, then from kernel to receiving user space. Built-in synchronization.\n- Message Queues: Structured message packets stored in kernel queues. Medium speed; handles boundaries and priorities.\n- Shared Memory: Fastest IPC mechanism. OS maps the same physical RAM frame into the virtual address spaces of both processes. Data transfers occur at raw memory speeds with ZERO kernel copy overhead!\n\n3. Synchronization Requirement:\nBecause Shared Memory bypasses the kernel during read/write cycles, the OS provides NO built-in locking. Application developers must explicitly synchronize access using Semaphores or Mutexes to avoid catastrophic data races.',
              notebookCheckpoints: ['fork + exec + wait flow', 'Shared memory is fastest (zero copy)', 'Shared memory requires semaphores']
            }
          ]
        }
      }
    }
  }
};
