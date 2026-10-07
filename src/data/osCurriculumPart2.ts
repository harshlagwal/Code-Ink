import { Chapter } from '../types/notebook';

export const OS_CHAPTERS_PART2: Chapter[] = [
  {
    id: 'os-ch11',
    number: 11,
    title: 'Threads & Concurrency Fundamentals',
    description: 'Process vs Thread, User-Level Threads (ULT) vs Kernel-Level Threads (KLT), and Thread Control Block (TCB)',
    topics: [
      {
        id: 'os-threads-fundamentals',
        subjectId: 'os',
        chapterId: 'os-ch11',
        chapterNumber: 11,
        pageNumber: 11,
        title: 'Threads, Address Space Sharing & User vs Kernel Threads',
        difficulty: 'intermediate',
        definition: 'A Thread is a basic unit of CPU utilization (lightweight process). Multiple threads belonging to the same process share code, data sections, and OS resources (like open files), but each has its own Thread ID, program counter, register set, and private call stack.',
        whyItMatters: 'Web servers and database engines handle tens of thousands of simultaneous requests using multithreading because thread creation and context switching require significantly less CPU time and memory than creating whole processes.',
        syntax: '// POSIX Thread Creation\nint pthread_create(pthread_t *thread, const pthread_attr_t *attr,\n                   void *(*start_routine) (void *), void *arg);',
        explanation: [
          'Shared Resources: All threads within a process share the Heap, Global/Static Variables (Data/BSS sections), Code (Text section), and Open File Descriptors.',
          'Private per-thread state: Each thread maintains its own Program Counter (PC), CPU Register State, Stack Frame (local variables and return addresses), and Thread ID (TID).',
          'User-Level Threads (ULT): Managed entirely by user-space runtime libraries (e.g., green threads). Extremely fast context switching without kernel trap, but if one thread makes a blocking system call, the entire process blocks.',
          'Kernel-Level Threads (KLT): Recognized and scheduled directly by the OS kernel (e.g., Linux NPTL, Windows threads). Supports true multi-core parallelism, but thread switching requires crossing the user-kernel boundary.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

// Shared global state across threads
int shared_counter = 0;

void* worker_thread(void* arg) {
    long id = (long)arg;
    for (int i = 0; i < 10000; i++) {
        shared_counter++; // Potential race condition without lock!
    }
    printf("Thread %ld finished execution.\\n", id);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;

    pthread_create(&t1, NULL, worker_thread, (void*)1);
    pthread_create(&t2, NULL, worker_thread, (void*)2);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Final Shared Counter: %d (Expected <= 20000)\\n", shared_counter);
    return 0;
}`,
          output: `Thread 1 finished execution.
Thread 2 finished execution.
Final Shared Counter: 19842 (Expected <= 20000)`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'custom',
          title: 'Single-Threaded Process vs Multi-Threaded Process',
          subtitle: 'Shared Address Space vs Private Registers & Stacks',
          elements: [
            { id: '1', label: 'Process Memory (Shared)', sublabel: 'Code + Data + Heap + Open Files', value: '1.5 GB Shared', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Thread 1', sublabel: 'Stack 1 + Registers + PC', value: 'TID 101', status: 'referenced' },
            { id: '3', label: 'Thread 2', sublabel: 'Stack 2 + Registers + PC', value: 'TID 102', status: 'referenced' },
            { id: '4', label: 'Thread 3', sublabel: 'Stack 3 + Registers + PC', value: 'TID 103', status: 'referenced' }
          ]
        },
        important: 'Stack memory is private to each thread, but since threads share the same address space, a dangling pointer in Thread 1 can technically corrupt Thread 2 stack if not guarded!',
        commonMistakes: [
          'Thinking threads have separate address spaces. Threads share the entire virtual address space of their parent process.',
          'Assuming User-Level Threads (ULT) achieve multi-core hardware parallelism. A 1:1 Kernel-Level Thread model is required for multi-core simultaneous execution.'
        ],
        tip: 'In Linux, threads are simply light processes created using clone() with flags CLONE_VM, CLONE_FS, CLONE_FILES, and CLONE_SIGHAND enabled.',
        interviewNote: 'Classic Interview Question: "What is the difference between a Process and a Thread?" (Answer: Process = heavyweight, independent address space, IPC needed; Thread = lightweight, shares process address space/heap, private stack/registers, fast context switch).',
        practiceQuestions: [
          {
            id: 'q-os-ch11-1',
            type: 'mcq',
            question: 'Which of the following is NOT shared among threads belonging to the same process?',
            options: ['Heap memory', 'Global variables', 'Program Counter and CPU Registers', 'Open File Descriptors'],
            correctIndex: 2,
            explanation: 'Each thread must have its own independent Program Counter and CPU register set to track its unique execution stream.'
          }
        ],
        relatedTopics: ['os-process-concept', 'os-multithreading-models']
      }
    ]
  },
  {
    id: 'os-ch12',
    number: 12,
    title: 'Multithreading Models & Hardware Concurrency',
    description: 'Many-to-One, One-to-One, Many-to-Many models, Amdahl’s Law, and Thread Pools',
    topics: [
      {
        id: 'os-multithreading-models',
        subjectId: 'os',
        chapterId: 'os-ch12',
        chapterNumber: 12,
        pageNumber: 12,
        title: 'Threading Models, Amdahl’s Law & Thread Pools',
        difficulty: 'intermediate',
        definition: 'Multithreading models map user-level threads to kernel-level threads. Amdahl’s Law provides a mathematical formula predicting the theoretical maximum speedup of a program running on N processor cores.',
        whyItMatters: 'Adding more CPU cores does not guarantee linear speedup if a program has serial bottlenecks. Amdahl’s Law guides software engineers on when to optimize vs when to add hardware.',
        syntax: 'Amdahl’s Law Speedup Formula:\nSpeedup <= 1 / (S + (1 - S) / N)\nWhere S = Serial fraction of code, N = Number of CPU cores',
        explanation: [
          'Many-to-One Model: Multiple user threads map to a single kernel thread. Thread management done in user space; blocking system call halts all threads; cannot use multi-core parallelism.',
          'One-to-One Model (Modern Default): Each user thread maps to a kernel thread (Linux NPTL, Windows). Excellent concurrency and multi-core utilization, but creating too many threads incurs kernel overhead.',
          'Many-to-Many Model: Multiplexes user threads across a smaller or equal number of kernel threads, balancing responsiveness with resource conservation.',
          'Thread Pools: Instead of creating a new thread per request and destroying it, a pre-allocated pool of worker threads waits for queued tasks, reducing creation latency and preventing thread exhaustion.'
        ],
        example: {
          language: 'c',
          code: `// Amdahl's Law Speedup Calculation
#include <stdio.h>

double calculate_speedup(double serial_fraction, int cores) {
    double parallel_fraction = 1.0 - serial_fraction;
    return 1.0 / (serial_fraction + (parallel_fraction / (double)cores));
}

int main(void) {
    double serial = 0.25; // 25% of code is inherently serial
    int cores_list[] = {1, 2, 4, 8, 16, 64, 1024};

    printf("Amdahl Speedup with 25%% serial code:\\n");
    for (int i = 0; i < 7; i++) {
        int n = cores_list[i];
        printf("Cores: %4d -> Max Theoretical Speedup: %.2fx\\n", n, calculate_speedup(serial, n));
    }
    printf("Even with infinite cores, max speedup cannot exceed 1 / 0.25 = 4.00x!\\n");
    return 0;
}`,
          output: `Amdahl Speedup with 25% serial code:
Cores:    1 -> Max Theoretical Speedup: 1.00x
Cores:    2 -> Max Theoretical Speedup: 1.60x
Cores:    4 -> Max Theoretical Speedup: 2.29x
Cores:    8 -> Max Theoretical Speedup: 2.91x
Cores:   16 -> Max Theoretical Speedup: 3.37x
Cores:   64 -> Max Theoretical Speedup: 3.82x
Cores: 1024 -> Max Theoretical Speedup: 3.99x
Even with infinite cores, max speedup cannot exceed 1 / 0.25 = 4.00x!`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Thread Pool Task Queue Architecture',
          subtitle: 'Worker Thread Reuse Pattern',
          elements: [
            { id: '1', label: 'Incoming Requests', sublabel: 'HTTP Requests', value: '10,000 req/sec', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Work Queue (FIFO)', sublabel: 'Synchronized Buffer', value: 'Task Backlog', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Worker Thread Pool', sublabel: 'Fixed 16 Worker Threads', value: 'Reused Workers', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'CPU Cores (1-16)', sublabel: 'Parallel Execution', value: '100% Core Utilization', status: 'referenced' }
          ]
        },
        important: 'Creating threads dynamically per request can crash an OS due to memory exhaustion (each thread allocates 2MB–8MB stack by default). Thread pools solve this completely.',
        commonMistakes: [
          'Thinking doubling CPU cores automatically doubles application speed. Amdahl’s Law dictates that serial code limits parallel gains.',
          'Assuming modern operating systems use Many-to-One. Nearly all modern desktop and server operating systems use the One-to-One model.'
        ],
        tip: 'For CPU-bound tasks, set thread pool size equal to `Runtime.getRuntime().availableProcessors()` (or +1). For I/O-bound tasks, use higher thread counts.',
        interviewNote: 'Common GATE & FAANG Question: "If an application spends 20% of its execution time in serial non-parallelizable code, what is the maximum speedup on an 8-core CPU?" (Answer: 1 / (0.2 + 0.8/8) = 1 / 0.3 = 3.33x).',
        practiceQuestions: [
          {
            id: 'q-os-ch12-1',
            type: 'mcq',
            question: 'What is the primary benefit of using a Thread Pool rather than spawning a new thread for each incoming connection?',
            options: ['Eliminates context switching entirely', 'Reduces thread creation/destruction latency and prevents unbounded resource exhaustion', 'Forces all threads into kernel mode permanently', 'Converts all code into 100% parallel instructions'],
            correctIndex: 1,
            explanation: 'Thread pools reuse existing threads from a fixed pool, avoiding expensive allocation and preventing OOM under heavy load.'
          }
        ],
        relatedTopics: ['os-threads-fundamentals', 'os-cpu-scheduling']
      }
    ]
  },
  {
    id: 'os-ch13',
    number: 13,
    title: 'CPU Scheduling Principles & Performance Metrics',
    description: 'CPU-I/O burst cycle, Preemptive vs Non-Preemptive, Dispatcher latency, and Evaluation Metrics',
    topics: [
      {
        id: 'os-cpu-scheduling',
        subjectId: 'os',
        chapterId: 'os-ch13',
        chapterNumber: 13,
        pageNumber: 13,
        title: 'CPU Scheduling Concepts & Evaluation Metrics',
        difficulty: 'beginner',
        definition: 'CPU Scheduling is the process by which the OS kernel selects one of the ready processes from the ready queue and allocates the CPU to it when the current process releases or yields the CPU.',
        whyItMatters: 'Efficient CPU scheduling maximizes CPU utilization, minimizes latency for interactive apps, and ensures fair throughput across thousands of competing services.',
        syntax: '// Core Metrics:\nTurnaround Time (TAT) = Completion Time - Arrival Time\nWaiting Time (WT)    = Turnaround Time - Burst Time\nResponse Time (RT)   = First CPU Allocation Time - Arrival Time',
        explanation: [
          'CPU-I/O Burst Cycle: Process execution alternates between CPU burst (computation) and I/O burst (waiting for disk, network, or keyboard).',
          'Preemptive Scheduling: The OS can forcibly interrupt a currently executing process to give the CPU to another process (e.g., timer interrupt or higher priority arrival).',
          'Non-Preemptive (Cooperative) Scheduling: Once a process gets the CPU, it keeps running until it voluntarily terminates or makes a blocking I/O system call.',
          'Dispatcher & Dispatch Latency: The dispatcher saves current process state, switches to user mode, and jumps to the proper location in the newly selected program. Dispatch latency is the overhead of this switch.'
        ],
        example: {
          language: 'c',
          code: `// Scheduling Metrics Calculation
#include <stdio.h>

typedef struct {
    int pid;
    int arrival_time;
    int burst_time;
    int completion_time;
    int turnaround_time;
    int waiting_time;
} Process;

int main(void) {
    // Single process example: Arrival=0, Burst=8, Finishes at 8
    Process p1 = { .pid = 1, .arrival_time = 0, .burst_time = 8, .completion_time = 8 };
    p1.turnaround_time = p1.completion_time - p1.arrival_time;
    p1.waiting_time = p1.turnaround_time - p1.burst_time;

    printf("Process P%d Performance:\\n", p1.pid);
    printf("Arrival Time:    %d\\n", p1.arrival_time);
    printf("Burst Time:      %d\\n", p1.burst_time);
    printf("Completion Time: %d\\n", p1.completion_time);
    printf("Turnaround Time: %d (TAT = CT - AT)\\n", p1.turnaround_time);
    printf("Waiting Time:    %d (WT  = TAT - BT)\\n", p1.waiting_time);
    return 0;
}`,
          output: `Process P1 Performance:
Arrival Time:    0
Burst Time:      8
Completion Time: 8
Turnaround Time: 8 (TAT = CT - AT)
Waiting Time:    0 (WT  = TAT - BT)`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'CPU-I/O Burst Cycle Transition',
          subtitle: 'Alternating Computation and I/O Wait',
          elements: [
            { id: '1', label: 'CPU Burst', sublabel: 'Active computation', value: '12ms Burst', status: 'active', arrowTo: '2' },
            { id: '2', label: 'I/O Request', sublabel: 'Read file / Socket', value: 'System Call', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'I/O Burst (Wait)', sublabel: 'DMA transfers data', value: '45ms Wait', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'I/O Complete Interrupt', sublabel: 'Process enters Ready Queue', value: 'Wakeup Signal', status: 'referenced' }
          ]
        },
        important: 'In interactive systems, minimizing Response Time is much more critical for user satisfaction than minimizing total Turnaround Time.',
        commonMistakes: [
          'Confusing Turnaround Time with Waiting Time. Turnaround time includes the time spent actively computing on the CPU.',
          'Assuming non-preemptive schedulers are faster overall. Non-preemptive systems allow a single rogue loop to lock up the whole computer.'
        ],
        tip: 'Memorize the formulas: TAT = CT - AT, WT = TAT - BT. If there is no preemption and arrival time is 0, Response Time equals Waiting Time.',
        interviewNote: 'Top GATE Exam Question: "Define Dispatch Latency." (Answer: The exact duration taken by the dispatcher to stop one process, save its PCB, load the PCB of the next process, and start executing it).',
        practiceQuestions: [
          {
            id: 'q-os-ch13-1',
            type: 'mcq',
            question: 'A process arrives at time 2 with burst time 6. It completes execution at time 11. What is its Waiting Time?',
            options: ['9 units', '3 units', '7 units', '5 units'],
            correctIndex: 1,
            explanation: 'TAT = Completion (11) - Arrival (2) = 9. Waiting Time = TAT (9) - Burst Time (6) = 3 units.'
          }
        ],
        relatedTopics: ['os-nonpreemptive-scheduling', 'os-preemptive-scheduling']
      }
    ]
  },
  {
    id: 'os-ch14',
    number: 14,
    title: 'Non-Preemptive Scheduling Algorithms',
    description: 'First-Come First-Served (FCFS), Convoy Effect, Non-Preemptive SJF, and HRRN',
    topics: [
      {
        id: 'os-nonpreemptive-scheduling',
        subjectId: 'os',
        chapterId: 'os-ch14',
        chapterNumber: 14,
        pageNumber: 14,
        title: 'FCFS, Convoy Effect, Shortest Job First (SJF) & HRRN',
        difficulty: 'intermediate',
        definition: 'Non-preemptive scheduling algorithms allocate the CPU to a chosen process until it completes or blocks for I/O. Common variants include First-Come First-Served (FCFS), Non-Preemptive Shortest Job First (SJF), and Highest Response Ratio Next (HRRN).',
        whyItMatters: 'Understanding FCFS and SJF illustrates why early batch systems suffered from the Convoy Effect, and proves mathematically that SJF yields minimal average waiting time.',
        syntax: '// SJF Criterion: Select min(Burst_Time)\n// HRRN Response Ratio = (Waiting_Time + Burst_Time) / Burst_Time',
        explanation: [
          'First-Come First-Served (FCFS): Scheduled strictly in order of arrival using a FIFO queue. Simple and fair, but suffers heavily from the Convoy Effect.',
          'The Convoy Effect: Occurs when a long CPU-bound process holds the CPU while multiple short I/O-bound processes sit idle in the ready queue, lowering overall device and CPU utilization.',
          'Non-Preemptive SJF: Selects the process with the shortest CPU burst time. Mathematically optimal in minimizing average waiting time for a given set of stationary processes.',
          'Highest Response Ratio Next (HRRN): Balances SJF with aging. As waiting time grows, the response ratio increases, preventing starvation of longer processes.'
        ],
        example: {
          language: 'c',
          code: `// Simulating FCFS Convoy Effect vs SJF
#include <stdio.h>

int main(void) {
    // Process P1 (Burst 24), P2 (Burst 3), P3 (Burst 3), all arrive at AT=0
    int bt[] = {24, 3, 3};

    // Under FCFS order P1 -> P2 -> P3:
    // WT: P1=0, P2=24, P3=27 -> Avg WT = (0 + 24 + 27)/3 = 17.0 ms
    double fcfs_avg_wt = (0.0 + 24.0 + 27.0) / 3.0;

    // Under SJF order P2 -> P3 -> P1:
    // WT: P2=0, P3=3, P1=6 -> Avg WT = (0 + 3 + 6)/3 = 3.0 ms
    double sjf_avg_wt = (0.0 + 3.0 + 6.0) / 3.0;

    printf("FCFS Average Waiting Time: %.2f ms (Convoy Effect)\\n", fcfs_avg_wt);
    printf("SJF  Average Waiting Time: %.2f ms (Optimal)\\n", sjf_avg_wt);
    printf("SJF reduced waiting time by %.1fx!\\n", fcfs_avg_wt / sjf_avg_wt);
    return 0;
}`,
          output: `FCFS Average Waiting Time: 17.00 ms (Convoy Effect)
SJF  Average Waiting Time: 3.00 ms (Optimal)
SJF reduced waiting time by 5.7x!`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Gantt Chart Comparison: FCFS vs SJF',
          subtitle: 'Convoy Effect vs Optimal Short Burst Ordering',
          elements: [
            { id: '1', label: 'FCFS: P1 [0 -> 24ms]', sublabel: 'P2 and P3 blocked waiting', value: 'Convoy Delay', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'FCFS: P2 [24-27] & P3 [27-30]', sublabel: 'High Waiting Time', value: 'Avg WT: 17ms', status: 'active' },
            { id: '3', label: 'SJF: P2 [0-3] & P3 [3-6]', sublabel: 'Short jobs clear immediately', value: 'Fast Response', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'SJF: P1 [6-30ms]', sublabel: 'Long job runs after', value: 'Avg WT: 3ms', status: 'referenced' }
          ]
        },
        important: 'Although SJF is theoretically optimal for average waiting time, it cannot be perfectly implemented in general-purpose OS kernels because the exact length of the next CPU burst cannot be predicted in advance (it must be estimated via exponential smoothing).',
        commonMistakes: [
          'Believing FCFS causes starvation. FCFS is starvation-free because every arrived process eventually reaches the front of the FIFO queue.',
          'Assuming SJF is always non-preemptive. The preemptive version of SJF is known as Shortest Remaining Time First (SRTF).'
        ],
        tip: 'HRRN formula is RR = (W + S) / S = 1 + W / S. If two processes have equal burst time S, the one waiting longer gets higher priority.',
        interviewNote: 'Standard Interview Question: "Why does Shortest Job First (SJF) minimize average waiting time?" (Proof: Moving any shorter burst before a longer burst decreases the waiting time of the shorter burst by the longer burst duration while increasing the longer burst waiting time by less, yielding net decrease).',
        practiceQuestions: [
          {
            id: 'q-os-ch14-1',
            type: 'mcq',
            question: 'What is the primary drawback of the Shortest Job First (SJF) scheduling algorithm in real-time general computing?',
            options: ['It causes the Convoy Effect', 'It cannot be implemented accurately because future CPU burst times are unknown in advance', 'It always yields higher average waiting time than FCFS', 'It cannot run on multi-core processors'],
            correctIndex: 1,
            explanation: 'The kernel does not know the exact future burst duration of arbitrary user programs beforehand.'
          }
        ],
        relatedTopics: ['os-cpu-scheduling', 'os-preemptive-scheduling']
      }
    ]
  },
  {
    id: 'os-ch15',
    number: 15,
    title: 'Preemptive Scheduling: SRTF, Round Robin & Priority',
    description: 'Shortest Remaining Time First (SRTF), Round Robin time quantum tuning, and Priority scheduling with aging',
    topics: [
      {
        id: 'os-preemptive-scheduling',
        subjectId: 'os',
        chapterId: 'os-ch15',
        chapterNumber: 15,
        pageNumber: 15,
        title: 'SRTF, Round Robin Time-Quantum & Priority Inversion',
        difficulty: 'intermediate',
        definition: 'Preemptive scheduling allows the kernel to interrupt an actively executing process when a shorter, more urgent, or higher-priority job arrives, or when its allocated time slice (quantum) expires.',
        whyItMatters: 'Round Robin is the backbone of all interactive consumer operating systems (Windows, macOS, Android), ensuring no single process freezes the UI or starves other applications.',
        syntax: '// Round Robin Quantum Selection Rule:\n// Quantum too large -> Degenerates into FCFS\n// Quantum too small -> Excessive Context Switching Overhead\n// Sweet spot: 10ms - 100ms (80% of CPU bursts shorter than quantum)',
        explanation: [
          'Shortest Remaining Time First (SRTF): Preemptive SJF. If a new process arrives with a remaining burst shorter than currently executing process, the CPU preempts the current process.',
          'Round Robin (RR): Every ready process gets a fixed slice of time called a Time Quantum (q). When q expires, a timer interrupt fires, context-switching the process to the back of the ready queue.',
          'Quantum Tuning: If quantum is infinite, RR behaves as FCFS. If quantum approaches 0, context-switch overhead dominates and CPU wastes time swapping registers.',
          'Priority Scheduling: Each process is assigned an integer priority. Lowest number usually means highest priority. Suffers from Starvation (indefinite blocking), solved by Aging (gradually increasing priority of waiting processes).'
        ],
        example: {
          language: 'c',
          code: `// Simulating Round Robin Time Quantum Behavior
#include <stdio.h>

void simulate_rr(int processes[], int n, int quantum) {
    int remaining[n];
    for (int i = 0; i < n; i++) remaining[i] = processes[i];

    int t = 0;
    printf("Simulating Round Robin with Quantum = %d ms:\\n", quantum);
    while (1) {
        int done = 1;
        for (int i = 0; i < n; i++) {
            if (remaining[i] > 0) {
                done = 0;
                if (remaining[i] > quantum) {
                    t += quantum;
                    remaining[i] -= quantum;
                    printf("  Time %2d ms: P%d ran for %d ms (Remaining: %d ms)\\n", t, i+1, quantum, remaining[i]);
                } else {
                    t += remaining[i];
                    printf("  Time %2d ms: P%d FINISHED execution!\\n", t, i+1);
                    remaining[i] = 0;
                }
            }
        }
        if (done == 1) break;
    }
}

int main(void) {
    int burst_times[] = {10, 4, 6};
    simulate_rr(burst_times, 3, 3);
    return 0;
}`,
          output: `Simulating Round Robin with Quantum = 3 ms:
  Time  3 ms: P1 ran for 3 ms (Remaining: 7 ms)
  Time  6 ms: P2 ran for 3 ms (Remaining: 1 ms)
  Time  9 ms: P3 ran for 3 ms (Remaining: 3 ms)
  Time 12 ms: P1 ran for 3 ms (Remaining: 4 ms)
  Time 13 ms: P2 FINISHED execution!
  Time 16 ms: P3 FINISHED execution!
  Time 19 ms: P1 ran for 3 ms (Remaining: 1 ms)
  Time 20 ms: P1 FINISHED execution!`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Round Robin Circular Queue Cycle',
          subtitle: 'Timer Interrupt and Ready Queue Rotation',
          elements: [
            { id: '1', label: 'CPU Execution', sublabel: 'Running Process', value: 'Quantum (q) countdown', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Timer Interrupt', sublabel: 'Hardware PIT/APIC tick', value: 'q = 0 expired', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Context Switch', sublabel: 'Save state to PCB', value: 'Dispatcher Latency', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'Enqueued to Tail', sublabel: 'Process waits for next turn', value: 'Ready Queue FIFO', status: 'referenced' }
          ]
        },
        important: 'As a rule of thumb, approximately 80% of CPU bursts in interactive systems should be shorter than the Round Robin time quantum to maintain high throughput.',
        commonMistakes: [
          'Setting the time quantum too small. If quantum is 1ms and context-switch time is 0.5ms, then 33% of total CPU time is wasted on dispatcher overhead!',
          'Assuming Priority Scheduling cannot starve. Without Aging, a stream of high-priority processes can prevent a low-priority process from ever running.'
        ],
        tip: 'Aging prevents starvation by incrementally boosting the priority of processes waiting in the ready queue by 1 unit every K seconds.',
        interviewNote: 'Classic System Design Interview Question: "What happens if the time quantum in Round Robin is made extremely large or extremely small?" (Answer: Very large = becomes FCFS; Very small = processor sharing illusion, but crippled by context switch overhead).',
        practiceQuestions: [
          {
            id: 'q-os-ch15-1',
            type: 'mcq',
            question: 'Which technique is employed in Priority Scheduling systems to prevent starvation of low-priority processes?',
            options: ['Spooling', 'Aging', 'Paging', 'Compaction'],
            correctIndex: 1,
            explanation: 'Aging gradually increases the priority of processes that wait in the system for a long time.'
          }
        ],
        relatedTopics: ['os-cpu-scheduling', 'os-advanced-scheduling']
      }
    ]
  },
  {
    id: 'os-ch16',
    number: 16,
    title: 'Advanced Scheduling: MLFQ, Linux CFS & Real-Time',
    description: 'Multilevel Queue, Multilevel Feedback Queue (MLFQ), Linux Completely Fair Scheduler (CFS), and Real-Time RMS/EDF',
    topics: [
      {
        id: 'os-advanced-scheduling',
        subjectId: 'os',
        chapterId: 'os-ch16',
        chapterNumber: 16,
        pageNumber: 16,
        title: 'MLFQ, Linux Completely Fair Scheduler (CFS) & Real-Time',
        difficulty: 'advanced',
        definition: 'Advanced modern schedulers adapt dynamically to workload behavior. The Multilevel Feedback Queue (MLFQ) categorizes processes without prior knowledge, while the Linux Completely Fair Scheduler (CFS) uses Red-Black Trees and virtual runtime (vruntime) to allocate CPU proportions.',
        whyItMatters: 'Every modern Linux server, Android smartphone, and Kubernetes cluster relies on CFS to deliver predictable latency across hundreds of concurrent containers and threads.',
        syntax: '// CFS Key Metric:\nvruntime += (delta_exec_time * NICE_0_LOAD) / se->load.weight;\n// Pick task with lowest vruntime (leftmost node in Red-Black Tree)',
        explanation: [
          'Multilevel Queue (MLQ): Partitions ready queue into separate queues (e.g., Foreground interactive vs Background batch) with fixed priority or time-slice allocation.',
          'Multilevel Feedback Queue (MLFQ): Allows processes to move between queues. If a process uses its whole time slice, it is demoted to a lower queue; if it yields for I/O, it remains at higher priority. Periodic priority boosts prevent starvation.',
          'Linux Completely Fair Scheduler (CFS): Models an "ideal multi-tasking CPU". Tracks virtual runtime (`vruntime`) for each task. Processes with smaller `vruntime` get the CPU first, using an O(log N) Red-Black tree.',
          'Real-Time Scheduling: Rate Monotonic Scheduling (RMS, static priority based on inverse period) and Earliest Deadline First (EDF, dynamic priority based on upcoming deadline).'
        ],
        example: {
          language: 'c',
          code: `// Illustrating CFS vruntime and Nice values
#include <stdio.h>

// Approximate weight factors for nice values in Linux CFS
// Nice 0 = weight 1024, Nice -5 = weight 3121 (higher priority), Nice 5 = weight 335 (lower priority)
unsigned long get_cfs_weight(int nice) {
    if (nice == -5) return 3121;
    if (nice == 0)  return 1024;
    if (nice == 5)  return 335;
    return 1024;
}

int main(void) {
    unsigned long nice_0_weight = 1024;
    unsigned long delta_exec = 10; // Ran for 10ms real time

    int nice_values[] = {-5, 0, 5};
    for (int i = 0; i < 3; i++) {
        int nice = nice_values[i];
        unsigned long weight = get_cfs_weight(nice);
        // vruntime grows slower for higher weight (lower nice)
        double vruntime_delta = (double)(delta_exec * nice_0_weight) / (double)weight;
        printf("Nice: %+2d (Weight: %4lu) -> Real Exec: %2lums | vruntime added: %5.2fms\\n",
               nice, weight, delta_exec, vruntime_delta);
    }
    return 0;
}`,
          output: `Nice: -5 (Weight: 3121) -> Real Exec: 10ms | vruntime added:  3.28ms
Nice: +0 (Weight: 1024) -> Real Exec: 10ms | vruntime added: 10.00ms
Nice: +5 (Weight:  335) -> Real Exec: 10ms | vruntime added: 30.57ms`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Linux CFS Red-Black Tree Architecture',
          subtitle: 'Tasks Ordered by Virtual Runtime (vruntime)',
          elements: [
            { id: '1', label: 'Root (vruntime: 42ms)', sublabel: 'Median runtime', value: 'RB Node', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Left Child (vruntime: 21ms)', sublabel: 'Starved Task', value: 'RB Node', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Leftmost (vruntime: 8ms)', sublabel: 'NEXT TO RUN ON CPU', value: 'O(1) Cached Pick', status: 'active' },
            { id: '4', label: 'Right Child (vruntime: 65ms)', sublabel: 'Has run the most', value: 'RB Node', status: 'referenced' }
          ]
        },
        important: 'In Linux CFS, picking the next task to run is O(1) because the kernel caches a direct pointer to the `rb_leftmost` node!',
        commonMistakes: [
          'Confusing Linux nice values: Lower nice value (-20) means HIGHER priority; higher nice value (+19) means LOWER priority (you are being "nice" to others).',
          'Believing MLFQ requires prior knowledge of process burst times. MLFQ observes historical CPU usage dynamically.'
        ],
        tip: 'In Linux CLI, check thread scheduling policy with `chrt -p <PID>` or alter process nice value using `nice -n -5 ./my_app`.',
        interviewNote: 'Common Senior OS Interview Question: "Explain how Linux CFS achieves fairness without a traditional fixed time quantum." (Answer: CFS tracks virtual runtime in a Red-Black tree; the task that has executed the least virtual time is always picked next).',
        practiceQuestions: [
          {
            id: 'q-os-ch16-1',
            type: 'mcq',
            question: 'What data structure does the Linux Completely Fair Scheduler (CFS) use to maintain the list of runnable tasks ordered by vruntime?',
            options: ['FIFO Queue', 'Red-Black Tree', 'Hash Map', 'Circular Linked List'],
            correctIndex: 1,
            explanation: 'Linux CFS uses a self-balancing Red-Black Tree, enabling O(log N) insertions and O(1) leftmost cached retrievals.'
          }
        ],
        relatedTopics: ['os-preemptive-scheduling', 'os-ipc-mechanisms']
      }
    ]
  },
  {
    id: 'os-ch17',
    number: 17,
    title: 'Inter-Process Communication (IPC)',
    description: 'Shared Memory vs Message Passing, Anonymous & Named Pipes (FIFOs), Message Queues, and Sockets',
    topics: [
      {
        id: 'os-ipc-mechanisms',
        subjectId: 'os',
        chapterId: 'os-ch17',
        chapterNumber: 17,
        pageNumber: 17,
        title: 'IPC: Shared Memory, Pipes, FIFOs & Message Queues',
        difficulty: 'intermediate',
        definition: 'Inter-Process Communication (IPC) is the mechanism provided by the operating system that enables independent processes to synchronize their actions and exchange data across distinct virtual address spaces.',
        whyItMatters: 'Microservice architectures, database query execution engines, and web browser sandboxes (like Chrome tabs) communicate securely via IPC channels.',
        syntax: '// POSIX IPC Primitives:\nint pipe(int pipefd[2]);          // Unidirectional byte stream\nint mkfifo(const char *pathname, mode_t mode); // Named pipe\nvoid *mmap(...);                   // Shared memory mapping',
        explanation: [
          'Shared Memory Model: OS maps the same physical memory frames into the virtual address spaces of two processes. Once set up, data exchange occurs at memory bus speeds with zero kernel intervention, but requires synchronization.',
          'Message Passing Model: OS manages a kernel buffer. Processes exchange messages using `send()` and `receive()` system calls. Safer and easier for distributed nodes, but incurs kernel mode switch overhead.',
          'Ordinary / Anonymous Pipes: Unidirectional byte stream between parent and child processes created via `pipe()`. Accessible only via file descriptors `pipefd[0]` (read) and `pipefd[1]` (write).',
          'Named Pipes (FIFOs): Exist as filesystem nodes created with `mkfifo`. Can be used by completely unrelated processes to communicate across different terminal sessions.'
        ],
        example: {
          language: 'c',
          code: `// Inter-Process Communication using POSIX Anonymous Pipe
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main(void) {
    int pipefd[2];
    char message[] = "Hello from Child Process via IPC Pipe!";
    char buffer[100];

    // pipefd[0] is read end, pipefd[1] is write end
    if (pipe(pipefd) == -1) return 1;

    pid_t pid = fork();

    if (pid == 0) {
        // Child Process: Closes read end, writes message
        close(pipefd[0]);
        write(pipefd[1], message, strlen(message) + 1);
        close(pipefd[1]);
        return 0;
    } else {
        // Parent Process: Closes write end, reads message
        close(pipefd[1]);
        read(pipefd[0], buffer, sizeof(buffer));
        close(pipefd[0]);
        wait(NULL); // Wait for child to exit

        printf("Parent received IPC message: '%s'\\n", buffer);
    }
    return 0;
}`,
          output: `Parent received IPC message: 'Hello from Child Process via IPC Pipe!'`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Shared Memory vs Message Passing IPC',
          subtitle: 'Direct RAM Access vs Kernel-Mediated Messages',
          elements: [
            { id: '1', label: 'Process A (Virtual Space)', sublabel: 'Writes data to buffer', value: 'Producer', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Shared Memory Region', sublabel: 'Same physical RAM frame', value: 'Zero Copy Speed', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Process B (Virtual Space)', sublabel: 'Reads data immediately', value: 'Consumer', status: 'normal' }
          ]
        },
        important: 'Shared memory is the fastest form of IPC because data is copied directly between memory locations without kernel involvement once the mapping is established.',
        commonMistakes: [
          'Forgetting to close the unused end of a pipe. Leaving the write end open in a reader process prevents EOF from ever triggering.',
          'Assuming anonymous pipes can be shared between unrelated processes. Anonymous pipes require a common ancestor (parent-child relationship).'
        ],
        tip: 'In bash terminal, the vertical bar `|` (e.g. `cat file.txt | grep error`) creates an anonymous pipe connecting stdout of the left command to stdin of the right command.',
        interviewNote: 'Standard OS Interview Question: "Compare Shared Memory and Message Passing IPC." (Answer: Shared Memory = faster, zero-copy, requires user-level mutex sync; Message Passing = slower due to kernel syscalls, but safe and works across networked machines).',
        practiceQuestions: [
          {
            id: 'q-os-ch17-1',
            type: 'mcq',
            question: 'Which IPC mechanism provides the highest throughput because data is exchanged without copying into kernel space during transfers?',
            options: ['Message Queues', 'Named Pipes (FIFOs)', 'Shared Memory', 'UNIX Domain Sockets'],
            correctIndex: 2,
            explanation: 'Shared memory maps identical physical RAM into both virtual address spaces, bypassing kernel buffering entirely.'
          }
        ],
        relatedTopics: ['os-process-concept', 'os-critical-section']
      }
    ]
  },
  {
    id: 'os-ch18',
    number: 18,
    title: 'Critical Section Problem & Peterson’s Algorithm',
    description: 'Race conditions, Mutual Exclusion, Progress, Bounded Waiting, and Peterson’s Algorithm proof',
    topics: [
      {
        id: 'os-critical-section',
        subjectId: 'os',
        chapterId: 'os-ch18',
        chapterNumber: 18,
        pageNumber: 18,
        title: 'Critical Section Requirements & Peterson’s Algorithm',
        difficulty: 'intermediate',
        definition: 'A Critical Section is a segment of code where a process accesses and modifies shared resources (e.g., variables, tables, files). The Critical Section Problem is to design a protocol ensuring that no two processes execute in their critical sections concurrently.',
        whyItMatters: 'Unsynchronized critical sections create non-deterministic race conditions that corrupt bank balances, database records, and kernel page tables.',
        syntax: '// Peterson\'s Algorithm for Two Processes (P0 and P1):\nflag[i] = true;\nturn = j;\nwhile (flag[j] && turn == j); // Busy wait\n// --- CRITICAL SECTION ---\nflag[i] = false; // Remainder section',
        explanation: [
          'Requirement 1: Mutual Exclusion: If process Pi is executing in its critical section, no other processes can be executing in their critical sections.',
          'Requirement 2: Progress: If no process is executing in its critical section and some wish to enter, only those not in their remainder sections can participate in the decision, and this selection cannot be postponed indefinitely.',
          'Requirement 3: Bounded Waiting: A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request, preventing starvation.',
          'Peterson’s Solution: A classic software-based solution for two processes using two variables: `boolean flag[2]` (intent to enter) and `int turn` (who has right of way). Formally satisfies all three requirements.'
        ],
        example: {
          language: 'c',
          code: `// Peterson's Algorithm Implementation in C
#include <stdio.h>
#include <stdbool.h>

bool flag[2] = {false, false};
int turn = 0;
int shared_balance = 1000;

void enter_critical_section(int self, int other) {
    flag[self] = true;        // Express intention to enter
    turn = other;             // Yield turn politely to other
    while (flag[other] && turn == other) {
        // Busy waiting loop
    }
}

void leave_critical_section(int self) {
    flag[self] = false;       // Relinquish access
}

int main(void) {
    // Process 0 execution sequence
    enter_critical_section(0, 1);
    shared_balance += 500; // Safe modification
    printf("Process 0 in Critical Section. New balance: %d\\n", shared_balance);
    leave_critical_section(0);

    return 0;
}`,
          output: `Process 0 in Critical Section. New balance: 1500`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Peterson’s Algorithm State Flow',
          subtitle: 'Mutual Exclusion Verification',
          elements: [
            { id: '1', label: 'Entry Section', sublabel: 'flag[i]=true; turn=j;', value: 'Declare Intent', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Wait Loop', sublabel: 'while (flag[j] && turn == j)', value: 'Polite Yield', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Critical Section', sublabel: 'Access Shared Resources', value: 'Exclusive Access', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Exit Section', sublabel: 'flag[i] = false;', value: 'Release Lock', status: 'referenced' }
          ]
        },
        important: 'On modern out-of-order CPU architectures, Peterson’s algorithm fails without memory barrier instructions (fences) because hardware compilers reorder independent memory reads and writes!',
        commonMistakes: [
          'Forgetting Bounded Waiting. A protocol that enforces mutual exclusion but allows Process 0 to starve Process 1 forever fails the critical section specification.',
          'Assuming software-only solutions like Peterson’s scale easily to thousands of threads. Hardware atomic instructions are used in practice.'
        ],
        tip: 'Remember the 3 criteria: M.P.B. -> Mutual Exclusion, Progress, Bounded Waiting. All three must be proven for any valid synchronization algorithm.',
        interviewNote: 'Standard GATE Question: "Why does Peterson’s algorithm guarantee Mutual Exclusion?" (Proof: For both P0 and P1 to enter simultaneously, both flag[0] and flag[1] must be true, but turn cannot be both 0 and 1 simultaneously; hence one process MUST wait).',
        practiceQuestions: [
          {
            id: 'q-os-ch18-1',
            type: 'mcq',
            question: 'Which of the following is NOT one of the three mandatory requirements for solving the Critical Section Problem?',
            options: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Equal Execution Time'],
            correctIndex: 3,
            explanation: 'The three required criteria are Mutual Exclusion, Progress, and Bounded Waiting. Execution times of processes do not need to be equal.'
          }
        ],
        relatedTopics: ['os-hardware-sync', 'os-classical-sync']
      }
    ]
  },
  {
    id: 'os-ch19',
    number: 19,
    title: 'Hardware Synchronization, Mutex & Semaphores',
    description: 'Atomic Test-and-Set (TAS), Compare-and-Swap (CAS), Spinlocks, Mutexes, and Counting Semaphores',
    topics: [
      {
        id: 'os-hardware-sync',
        subjectId: 'os',
        chapterId: 'os-ch19',
        chapterNumber: 19,
        pageNumber: 19,
        title: 'Atomic Instructions, Mutex Locks & Semaphores',
        difficulty: 'intermediate',
        definition: 'Hardware synchronization primitives use atomic CPU instructions (like Test-and-Set and Compare-and-Swap) to build Mutex Locks and Semaphores that safely coordinate thousands of concurrent threads.',
        whyItMatters: 'Modern database transactions, concurrent collections (like Java ConcurrentHashMap), and OS kernel schedulers rely directly on atomic CAS loops and semaphores for lock-free data structures.',
        syntax: '// POSIX Semaphore Operations:\nsem_wait(&sem); // Decrement (Wait / P operation)\n// ... Critical Section ...\nsem_post(&sem); // Increment (Signal / V operation)',
        explanation: [
          'Atomic Hardware Instructions: CPU instructions like `TestAndSet` and `CompareAndSwap` execute uninterruptibly within a single memory clock cycle across all CPU cores.',
          'Spinlocks: A lock where waiting threads loop continuously (busy-wait) until the lock becomes available. Ideal for low-latency locks held for very short intervals (avoids context-switch overhead).',
          'Mutex Lock: A binary lock mechanism where only the owning thread can release the lock (`acquire()` and `release()`).',
          'Counting Semaphores: An integer variable initialized to $N$ resources. `wait()` (P) decrements the counter; if value becomes negative, calling process is blocked. `signal()` (V) increments counter and unblocks waiting processes.'
        ],
        example: {
          language: 'c',
          code: `// Counting Semaphore Example using POSIX Semaphores
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

sem_t resource_pool; // Semaphore controlling pool of 2 printers

void* print_job(void* arg) {
    long id = (long)arg;
    printf("Job %ld waiting for printer...\\n", id);

    sem_wait(&resource_pool); // Decrements count, blocks if 0
    printf(">> Job %ld acquired PRINTER and is printing!\\n", id);
    sleep(1); // Simulating work
    printf("<< Job %ld finished and released printer.\\n", id);
    sem_post(&resource_pool); // Increments count, wakes up waiting job

    return NULL;
}

int main(void) {
    sem_init(&resource_pool, 0, 2); // 2 printers available
    printf("Printer pool initialized with 2 resources.\\n");
    // In production, multiple threads invoke print_job concurrently
    return 0;
}`,
          output: `Printer pool initialized with 2 resources.`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Semaphore wait() (P) and signal() (V) Lifecycle',
          subtitle: 'Blocking Queue and Wakeup Signaling',
          elements: [
            { id: '1', label: 'sem_wait(&sem)', sublabel: 'Decrement S.value', value: 'S.value--', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Value Check', sublabel: 'if (S.value < 0)', value: 'Resource Available?', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Blocked in Queue', sublabel: 'Put on Semaphore Wait List', value: 'Sleep State', status: 'active', arrowTo: '4' },
            { id: '4', label: 'sem_post(&sem)', sublabel: 'S.value++ & wakeup(P)', value: 'Signal Wakeup', status: 'referenced' }
          ]
        },
        important: 'Difference between Mutex and Binary Semaphore: A Mutex has ownership (only the thread that locked it can unlock it). A Semaphore has no ownership (Thread A can call wait() and Thread B can call signal()).',
        commonMistakes: [
          'Using spinlocks on a single-core machine. A spinlock on a single core wastes the entire time slice because the lock-holder cannot execute to release it!',
          'Calling `sem_wait` without a corresponding `sem_post` on exception paths, causing permanent deadlocks.'
        ],
        tip: 'In Dijkstra’s original Dutch terminology: P = Proberen (to test/wait), V = Verhogen (to increment/signal).',
        interviewNote: 'Standard OS Interview Question: "Explain the difference between a Spinlock and a Mutex." (Answer: Spinlock busy-waits in a CPU loop; Mutex puts waiting thread to sleep and yields the CPU via context switch).',
        practiceQuestions: [
          {
            id: 'q-os-ch19-1',
            type: 'mcq',
            question: 'A counting semaphore S is initialized to 7. Then 20 wait() operations and 15 signal() operations are executed. What is the current value of S?',
            options: ['2', '12', '7', '-5'],
            correctIndex: 0,
            explanation: 'Value = Initial (7) - 20 (wait) + 15 (signal) = 7 - 20 + 15 = 2.'
          }
        ],
        relatedTopics: ['os-critical-section', 'os-classical-sync']
      }
    ]
  },
  {
    id: 'os-ch20',
    number: 20,
    title: 'Classical Synchronization Problems & Monitors',
    description: 'Producer-Consumer (Bounded Buffer), Readers-Writers, Dining Philosophers, and Monitors',
    topics: [
      {
        id: 'os-classical-sync',
        subjectId: 'os',
        chapterId: 'os-ch20',
        chapterNumber: 20,
        pageNumber: 20,
        title: 'Classical Problems: Producer-Consumer, Readers-Writers & Monitors',
        difficulty: 'advanced',
        definition: 'Classical synchronization problems are standard canonical benchmark scenarios used to test and validate synchronization primitives. Monitors are high-level object-oriented synchronization constructs that encapsulate shared data and methods with implicit mutual exclusion.',
        whyItMatters: 'Every message broker (RabbitMQ, Kafka), database engine (read/write lock pools), and thread-safe data structure implements solutions derived directly from these classical synchronization patterns.',
        syntax: '// Bounded Buffer Semaphores:\nsem_t empty; // initialized to BUFFER_SIZE\nsem_t full;  // initialized to 0\npthread_mutex_t mutex; // binary lock',
        explanation: [
          'Bounded-Buffer (Producer-Consumer): Producers place data into a fixed-size buffer; consumers remove data. Requires two counting semaphores (`empty` and `full`) and one binary mutex to prevent buffer overflow and underflow.',
          'Readers-Writers Problem: Multiple readers can read concurrently, but a writer must have exclusive access. Solution must prevent writer starvation while maximizing parallel reader throughput.',
          'Dining Philosophers: 5 philosophers sit around a circular table with 5 chopsticks; each needs 2 adjacent chopsticks to eat. Models resource contention and deadlocks; solved via asymmetric chopstick pickup or Dijkstra’s state monitor.',
          'Monitors: High-level language construct (e.g., `synchronized` in Java) guaranteeing only one thread can execute any monitor procedure at a time, using condition variables (`wait()` and `signal()`).'
        ],
        example: {
          language: 'c',
          code: `// Producer-Consumer Logic using Semaphores
#include <stdio.h>
#define BUFFER_SIZE 5

int buffer[BUFFER_SIZE];
int in = 0, out = 0;

void produce_item(int item) {
    // Conceptual semaphore calls:
    // wait(empty);
    // wait(mutex);
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    printf("Produced item: %d at slot %d\\n", item, in);
    // signal(mutex);
    // signal(full);
}

int consume_item(void) {
    // Conceptual semaphore calls:
    // wait(full);
    // wait(mutex);
    int item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    printf("Consumed item: %d from slot %d\\n", item, out);
    // signal(mutex);
    // signal(empty);
    return item;
}

int main(void) {
    produce_item(101);
    produce_item(102);
    consume_item();
    return 0;
}`,
          output: `Produced item: 101 at slot 1
Produced item: 102 at slot 2
Consumed item: 101 from slot 1`,
          annotations: [
            { line: 1, label: 'Execution flow and OS primitives', type: 'green' },
            { line: 5, label: 'Kernel system call / synchronization boundary', type: 'blue' }
          ]
        },
        diagram: {
          type: 'custom',
          title: 'Dining Philosophers Resource Deadlock',
          subtitle: 'Circular Wait Condition Around 5 Chopsticks',
          elements: [
            { id: '1', label: 'Philosopher 1', sublabel: 'Holds Chopstick 1', value: 'Waits for Chopstick 2', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Philosopher 2', sublabel: 'Holds Chopstick 2', value: 'Waits for Chopstick 3', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Philosopher 3', sublabel: 'Holds Chopstick 3', value: 'Waits for Chopstick 4', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Circular Dependency', sublabel: 'All 5 philosophers locked', value: 'System Deadlock!', status: 'warning' }
          ]
        },
        important: 'In the Bounded-Buffer problem, swapping the order of `wait(empty)` and `wait(mutex)` in the producer results in an immediate DEADLOCK if the buffer is full!',
        commonMistakes: [
          'Allowing multiple writers to write simultaneously in Readers-Writers solutions, corrupting the shared data store.',
          'Assuming Java `synchronized` is a semaphore. `synchronized` is a Monitor implementation with implicit reentrant mutual exclusion.'
        ],
        tip: 'To avoid Dining Philosophers deadlock: Have odd-numbered philosophers pick up their LEFT chopstick first, and even-numbered pick up their RIGHT chopstick first (breaks circular wait).',
        interviewNote: 'Classic Operating Systems Interview Question: "Explain how to solve the Readers-Writers problem without starving writers." (Answer: If a writer arrives, subsequent readers are queued behind the writer instead of being admitted immediately).',
        practiceQuestions: [
          {
            id: 'q-os-ch20-1',
            type: 'mcq',
            question: 'In the classic Producer-Consumer bounded-buffer problem with buffer size N, what initial value should the empty semaphore have?',
            options: ['0', '1', 'N', 'N - 1'],
            correctIndex: 2,
            explanation: 'The empty semaphore tracks remaining free slots in the buffer, so it must be initialized to the full buffer capacity N.'
          }
        ],
        relatedTopics: ['os-hardware-sync', 'os-deadlocks-coffman']
      }
    ]
  }
];
