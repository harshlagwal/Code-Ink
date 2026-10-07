import { FinalAssessment } from '../types/notebook';

export const OS_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'os',
  title: 'Operating Systems & Kernel Architecture Final Examination',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: OS Foundations, Dual Mode & Process Management',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'os-a1',
          section: 'A',
          marks: 1,
          topic: 'Kernel Architectures',
          question: 'Which of the following is a primary characteristic of a Microkernel architecture?',
          options: [
            'All device drivers and file systems run inside privileged kernel space',
            'Only essential IPC, basic scheduling, and virtual memory mechanisms run in kernel mode',
            'Zero system call overhead compared to monolithic kernels',
            'Eliminates the need for user mode'
          ],
          correctIndex: 1,
          explanation: 'Microkernels run minimal services in kernel mode, executing file systems and drivers as isolated user-space processes to maximize fault isolation.'
        },
        {
          id: 'os-a2',
          section: 'A',
          marks: 1,
          topic: 'Dual-Mode Operation',
          question: 'What is the value of the hardware Mode Bit when the CPU executes instructions in User Mode and Kernel Mode respectively?',
          options: ['User Mode = 0, Kernel Mode = 1', 'User Mode = 1, Kernel Mode = 0', 'User Mode = 2, Kernel Mode = 1', 'Both modes use Mode Bit 0'],
          correctIndex: 1,
          explanation: 'By architectural convention, Mode Bit 1 represents User Mode (unprivileged), and Mode Bit 0 represents Kernel Mode (privileged).'
        },
        {
          id: 'os-a3',
          section: 'A',
          marks: 1,
          topic: 'System Calls vs Library Functions',
          question: 'What mechanism causes the CPU to transition from User Mode to Kernel Mode during a system call?',
          options: ['DMA bus cycle', 'Software Trap / Interrupt', 'Cache Miss Exception', 'Memory Page Refresh'],
          correctIndex: 1,
          explanation: 'A software trap or software interrupt flips the hardware mode bit to 0 and vectors execution to a kernel system call handler.'
        },
        {
          id: 'os-a4',
          section: 'A',
          marks: 1,
          topic: 'Process States',
          question: 'Which process state transition is impossible in the standard 5-state process model?',
          options: ['Running to Ready', 'Ready to Running', 'Waiting to Running', 'Waiting to Ready'],
          correctIndex: 2,
          explanation: 'A process can never transition directly from Waiting (Blocked) to Running; it must first enter the Ready state to wait for scheduler dispatch.'
        },
        {
          id: 'os-a5',
          section: 'A',
          marks: 1,
          topic: 'Process Control Block',
          question: 'Which of the following is NOT stored inside a Process Control Block (PCB)?',
          options: ['Program Counter', 'CPU Register state', 'The executable binary code itself', 'List of open file descriptors'],
          correctIndex: 2,
          explanation: 'The executable binary code resides in the text segment of memory; the PCB stores metadata, pointers, and CPU register contexts.'
        },
        {
          id: 'os-a6',
          section: 'A',
          marks: 1,
          topic: 'fork() Return Values',
          question: 'What does the `fork()` system call return to the newly created child process upon success?',
          options: ['The Parent PID', 'The integer 0', 'The Child PID', 'A pointer to the parent PCB'],
          correctIndex: 1,
          explanation: 'In the child process, fork() returns 0. In the parent process, it returns the PID of the newly created child process.'
        },
        {
          id: 'os-a7',
          section: 'A',
          marks: 1,
          topic: 'Zombie Process',
          question: 'What defines a Zombie Process in UNIX-like operating systems?',
          options: [
            'A process that has been suspended by the user via SIGSTOP',
            'A process that has terminated execution but whose parent has not yet collected its exit status via wait()',
            'A process whose parent has terminated while the child is still running',
            'A process executing an infinite CPU loop'
          ],
          correctIndex: 1,
          explanation: 'A zombie process has finished execution but remains in the process table until its parent reads its exit code with wait().'
        },
        {
          id: 'os-a8',
          section: 'A',
          marks: 1,
          topic: 'Thread Isolation',
          question: 'What memory resource is strictly private to an individual thread and NOT shared with peer threads in the same process?',
          options: ['The Heap segment', 'The Data segment', 'The Call Stack and CPU Registers', 'The Text (code) segment'],
          correctIndex: 2,
          explanation: 'Each thread has its own private Call Stack for local variables and its own hardware register state including the Program Counter.'
        },
        {
          id: 'os-a9',
          section: 'A',
          marks: 1,
          topic: 'Context Switching',
          question: 'Context switching between processes is classified computationally as:',
          options: ['Productive user-space computation', 'Pure operating system overhead', 'A hardware memory leak', 'An asynchronous I/O operation'],
          correctIndex: 1,
          explanation: 'A context switch is pure overhead because the CPU performs no user work while saving and restoring hardware register contexts.'
        },
        {
          id: 'os-a10',
          section: 'A',
          marks: 1,
          topic: 'Copy-On-Write (COW)',
          question: 'How does Copy-On-Write (COW) optimize process creation via fork()?',
          options: [
            'It prevents the child from executing exec()',
            'It shares physical memory pages read-only until either process attempts to write to a page',
            'It stores memory pages exclusively in CPU caches',
            'It runs the child process in kernel mode'
          ],
          correctIndex: 1,
          explanation: 'COW shares pages between parent and child until a modification occurs, duplicating only the modified page and saving memory.'
        }
      ]
    },
    sectionB: {
      title: 'Section B: CPU Scheduling & Process Synchronization',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'os-b1',
          section: 'B',
          marks: 1,
          topic: 'Convoy Effect',
          question: 'The "Convoy Effect" in CPU scheduling is a well-known vulnerability of which algorithm?',
          options: ['Round Robin (RR)', 'Shortest Job First (SJF)', 'First-Come, First-Served (FCFS)', 'Multilevel Feedback Queue'],
          correctIndex: 2,
          explanation: 'In FCFS, when a long CPU-bound process holds the CPU, all short I/O-bound processes queue behind it, causing the Convoy Effect.'
        },
        {
          id: 'os-b2',
          section: 'B',
          marks: 1,
          topic: 'Optimal CPU Scheduling',
          question: 'Which CPU scheduling algorithm gives the minimum average waiting time for a set of stationary processes?',
          options: ['First-Come, First-Served (FCFS)', 'Shortest Job First (SJF)', 'Round Robin (RR)', 'Highest Response Ratio Next'],
          correctIndex: 1,
          explanation: 'SJF is provably optimal because scheduling short bursts earlier reduces the wait times of all subsequent processes.'
        },
        {
          id: 'os-b3',
          section: 'B',
          marks: 1,
          topic: 'Round Robin Quantum',
          question: 'What happens if the Time Quantum in a Round Robin scheduling algorithm is configured to an excessively large value?',
          options: [
            'The algorithm degenerates into First-Come, First-Served (FCFS)',
            'Context switch overhead increases exponentially',
            'Processes starve completely',
            'Turnaround time reaches zero'
          ],
          correctIndex: 0,
          explanation: 'If the time quantum is larger than any process CPU burst, every process runs to completion on its first turn, behaving like FCFS.'
        },
        {
          id: 'os-b4',
          section: 'B',
          marks: 1,
          topic: 'Critical Section Criteria',
          question: 'Which of the following is NOT one of the three mandatory criteria for a valid solution to the Critical Section problem?',
          options: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Strict Alternation'],
          correctIndex: 3,
          explanation: 'The three mandatory criteria are Mutual Exclusion, Progress, and Bounded Waiting. Strict Alternation violates the Progress requirement.'
        },
        {
          id: 'os-b5',
          section: 'B',
          marks: 1,
          topic: 'Counting Semaphores',
          question: 'A counting semaphore initialized to 10 has 15 wait() and 7 signal() operations executed. What is its resulting value?',
          options: ['2', '0', '-2', '5'],
          correctIndex: 0,
          explanation: 'Initial value = 10. Operations: 10 - 15 + 7 = 2.'
        },
        {
          id: 'os-b6',
          section: 'B',
          marks: 1,
          topic: 'Mutex vs Semaphore',
          question: 'What key technical property distinguishes a Mutex from a Binary Semaphore?',
          options: [
            'A Mutex has ownership: only the thread that locked it can unlock it',
            'A Mutex allows multiple threads in the critical section',
            'A Mutex uses busy waiting exclusively',
            'A Binary Semaphore cannot be used for mutual exclusion'
          ],
          correctIndex: 0,
          explanation: 'A Mutex possesses ownership (only the acquiring thread can release it). A semaphore has no ownership and can be signaled by any thread.'
        },
        {
          id: 'os-b7',
          section: 'B',
          marks: 1,
          topic: 'Spinlocks',
          question: 'A spinlock is a mutual exclusion mechanism that uses:',
          options: ['Sleeping queues', 'Busy waiting (CPU polling loop)', 'Disk paging interrupts', 'Hardware timer traps'],
          correctIndex: 1,
          explanation: 'Spinlocks repeat a test loop in CPU (busy waiting) until the lock becomes free; ideal only for very short lock hold durations on multi-core CPUs.'
        },
        {
          id: 'os-b8',
          section: 'B',
          marks: 1,
          topic: 'Turnaround Time Formula',
          question: 'If a process arrives at time 2 and completes execution at time 11, its Turnaround Time (TAT) is:',
          options: ['9 time units', '13 time units', '11 time units', '2 time units'],
          correctIndex: 0,
          explanation: 'Turnaround Time (TAT) = Completion Time - Arrival Time = 11 - 2 = 9 time units.'
        },
        {
          id: 'os-b9',
          section: 'B',
          marks: 1,
          topic: 'Starvation Prevention',
          question: 'Which scheduling technique gradually increases the priority of processes that wait in the system for long periods to prevent starvation?',
          options: ['Preemption', 'Aging', 'Paging', 'Spooling'],
          correctIndex: 1,
          explanation: 'Aging is a technique where the priority of waiting processes is incrementally increased over time, ensuring they eventually run.'
        },
        {
          id: 'os-b10',
          section: 'B',
          marks: 1,
          topic: 'Classical Sync: Producer-Consumer',
          question: 'In the bounded-buffer Producer-Consumer problem, which semaphores are typically employed to prevent buffer underflow and overflow?',
          options: [
            'Only a single binary mutex',
            'Two counting semaphores (empty and full) plus one binary mutex',
            'Two spinlocks without mutex',
            'A single counting semaphore initialized to zero'
          ],
          correctIndex: 1,
          explanation: 'Counting semaphore `empty` tracks available slots, `full` tracks produced items, and `mutex` provides mutually exclusive buffer manipulation.'
        }
      ]
    },
    sectionC: {
      title: 'Section C: Deadlocks, Paging, Virtual Memory & File Systems',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'os-c1',
          section: 'C',
          marks: 1,
          topic: 'Deadlock Conditions',
          question: 'How many of the four Coffman conditions must hold simultaneously for a deadlock to exist?',
          options: ['At least one', 'At least two', 'At least three', 'All four must hold simultaneously'],
          correctIndex: 3,
          explanation: 'A deadlock can occur if and only if all four Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) hold simultaneously.'
        },
        {
          id: 'os-c2',
          section: 'C',
          marks: 1,
          topic: 'Banker\'s Algorithm',
          question: 'The Banker\'s Algorithm is an algorithm used for:',
          options: ['Deadlock Prevention', 'Deadlock Avoidance', 'Deadlock Detection', 'Deadlock Recovery'],
          correctIndex: 1,
          explanation: 'Banker\'s Algorithm is a Deadlock Avoidance algorithm that ensures the system never enters an unsafe state upon granting a resource request.'
        },
        {
          id: 'os-c3',
          section: 'C',
          marks: 1,
          topic: 'Internal vs External Fragmentation',
          question: 'Paging completely eliminates which type of memory fragmentation?',
          options: ['Internal Fragmentation', 'External Fragmentation', 'Cache Fragmentation', 'Disk Platter Fragmentation'],
          correctIndex: 1,
          explanation: 'Paging eliminates external fragmentation because any free physical frame anywhere in RAM can be allocated to any process page.'
        },
        {
          id: 'os-c4',
          section: 'C',
          marks: 1,
          topic: 'TLB Role',
          question: 'What is the primary architectural purpose of the Translation Lookaside Buffer (TLB)?',
          options: [
            'To store dirty disk blocks',
            'To cache virtual-to-physical address translations and avoid accessing RAM twice per instruction',
            'To replace the CPU arithmetic logic unit',
            'To handle interrupt vector routing'
          ],
          correctIndex: 1,
          explanation: 'The TLB is a high-speed associative hardware cache that stores recent Page-to-Frame translations to avoid an extra memory read for page tables.'
        },
        {
          id: 'os-c5',
          section: 'C',
          marks: 1,
          topic: 'Page Fault Definition',
          question: 'A Page Fault occurs when a program tries to access a page that:',
          options: [
            'Has an illegal write permission',
            'Is not currently loaded into physical RAM (valid/invalid bit is 0)',
            'Is cached inside the TLB',
            'Belongs to another running process'
          ],
          correctIndex: 1,
          explanation: 'A page fault is a hardware interrupt triggered when the valid/invalid bit in the page table indicates the demanded page is not currently in physical RAM.'
        },
        {
          id: 'os-c6',
          section: 'C',
          marks: 1,
          topic: 'Belady\'s Anomaly',
          question: 'Which page replacement algorithm is known to be vulnerable to Belady\'s Anomaly?',
          options: ['Least Recently Used (LRU)', 'Optimal Page Replacement (OPT)', 'First-In, First-Out (FIFO)', 'Least Frequently Used (LFU)'],
          correctIndex: 2,
          explanation: 'FIFO is susceptible to Belady\'s Anomaly, where increasing the number of memory frames can increase the number of page faults.'
        },
        {
          id: 'os-c7',
          section: 'C',
          marks: 1,
          topic: 'Thrashing',
          question: 'What is Thrashing in virtual memory systems?',
          options: [
            'When the CPU frequency overheats',
            'When a process spends more time swapping pages in and out of disk than executing instructions',
            'When page replacement algorithm runs in O(N^2) time',
            'When all processes enter the ready state'
          ],
          correctIndex: 1,
          explanation: 'Thrashing occurs when memory is overcommitted, causing continuous page faults and page swapping between RAM and disk, crashing CPU throughput.'
        },
        {
          id: 'os-c8',
          section: 'C',
          marks: 1,
          topic: 'UNIX Inode Filenames',
          question: 'Where is the filename of a file stored in a standard UNIX file system?',
          options: [
            'Inside the file\'s Inode structure',
            'In the superblock',
            'In the directory file entry mapping filename to inode number',
            'In the partition boot record'
          ],
          correctIndex: 2,
          explanation: 'In UNIX, filenames are stored in directory tables alongside the Inode number. The Inode itself does not contain the filename.'
        },
        {
          id: 'os-c9',
          section: 'C',
          marks: 1,
          topic: 'Hard Links vs Soft Links',
          question: 'What happens to a file if you delete one of its Hard Links when other hard links still exist?',
          options: [
            'The file data is deleted immediately from disk',
            'The link count is decremented by 1, and the file data remains fully intact on disk',
            'All other hard links become dangling pointers',
            'The file transitions into a zombie file'
          ],
          correctIndex: 1,
          explanation: 'Deleting a hard link decrements the inode link count. Data blocks are only freed when the link count reaches 0 and no process has it open.'
        },
        {
          id: 'os-c10',
          section: 'C',
          marks: 1,
          topic: 'Disk Scheduling Algorithms',
          question: 'Which disk scheduling algorithm services requests while sweeping in one direction and immediately returns to the start without servicing requests on the return pass?',
          options: ['SCAN', 'C-SCAN', 'SSTF', 'LOOK'],
          correctIndex: 1,
          explanation: 'Circular SCAN (C-SCAN) sweeps in one direction servicing requests, and returns directly to the beginning without servicing requests on the return path.'
        }
      ]
    }
  }
};
