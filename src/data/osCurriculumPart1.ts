import { Chapter } from '../types/notebook';

export const OS_CHAPTERS_PART1: Chapter[] = [
  {
    id: 'os-ch1',
    number: 1,
    title: 'OS Evolution & Types of Operating Systems',
    description: 'Historical progression: Batch systems, Multiprogramming, Time-sharing, Distributed, and Real-Time OS',
    topics: [
      {
        id: 'os-evolution-types',
        subjectId: 'os',
        chapterId: 'os-ch1',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'Evolution: Batch, Multiprogramming & Real-Time OS',
        difficulty: 'beginner',
        definition: 'Operating Systems evolved from manual punch-card Batch Systems to Multiprogrammed systems, interactive Time-Sharing systems, and deterministic Real-Time Operating Systems (RTOS).',
        whyItMatters: 'Understanding OS history explains why modern kernels use time-slicing, preemptive schedulers, and memory isolation rather than simple serial execution.',
        syntax: '-- Evolution Milestones:\nBatch -> Spooling -> Multiprogramming -> Time-Sharing -> Distributed & RTOS',
        explanation: [
          'Simple Batch Systems: Jobs with similar needs were batched together and processed sequentially without human intervention. CPU remained idle during slow punch-card I/O.',
          'Spooling (Simultaneous Peripheral Operations On-Line): Overlapped I/O of one job with execution of another using disk buffers, eliminating idle CPU waits.',
          'Multiprogramming: Keeps multiple jobs in physical memory simultaneously. When current job waits for I/O, the OS switches CPU to another job, keeping CPU busy.',
          'Time-Sharing (Multitasking): Logical extension of multiprogramming with rapid CPU time-slicing, providing interactive multi-user computing.',
          'Real-Time Operating Systems (RTOS): Strictly time-bound systems where correctness depends on both logical result and exact delivery deadline (Hard RTOS: pacemaker/missiles; Soft RTOS: video streaming).'
        ],
        example: {
          language: 'c',
          code: `// Simulating CPU Burst vs I/O Idle Wait in Multiprogramming\n#include <stdio.h>\n#include <unistd.h>\n\nvoid execute_job(int job_id, int has_io) {\n    printf("Job %d: Running CPU burst...\\n", job_id);\n    if (has_io) {\n        printf("Job %d: Yielding CPU for I/O -> Context switch!\\n", job_id);\n    } else {\n        printf("Job %d: Completed without I/O wait.\\n", job_id);\n    }\n}\n\nint main(void) {\n    execute_job(1, 1); // Job 1 yields CPU\n    execute_job(2, 0); // Job 2 runs immediately during Job 1's I/O\n    return 0;\n}`,
          output: `Job 1: Running CPU burst...\nJob 1: Yielding CPU for I/O -> Context switch!\nJob 2: Running CPU burst...\nJob 2: Completed without I/O wait.`,
          annotations: [
            { line: 6, label: 'Active CPU cycle execution', type: 'green' },
            { line: 8, label: 'CPU switches to next resident job during slow I/O wait', type: 'yellow' },
            { line: 15, label: 'High CPU utilization maintained across concurrent jobs', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Evolution of System CPU Utilization',
          subtitle: 'From Idle Batch Gaps to Continuous Multiprogramming',
          elements: [
            { id: '1', label: 'Batch Processing', sublabel: 'Punch Cards', value: 'CPU Idles during I/O', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Multiprogramming', sublabel: 'Memory Resident Jobs', value: 'Switches on I/O Wait', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Time-Sharing (Preemptive)', sublabel: 'Time Quantum Slices', value: 'Interactive User Response', status: 'active' },
            { id: '4', label: 'Hard Real-Time (RTOS)', sublabel: 'Deterministic Latency', value: 'Zero Deadline Miss', status: 'referenced' }
          ]
        },
        important: 'In a Hard RTOS, missing a single deadline results in total system failure (e.g. automotive airbag deployment). In a Soft RTOS, missing a deadline degrades quality but does not crash the system (e.g. dropped video frame).',
        commonMistakes: [
          'Confusing Multiprogramming with Multiprocessing. Multiprogramming runs multiple programs on a single CPU core; Multiprocessing utilizes multiple physical CPU cores.',
          'Assuming Linux or Windows are Hard Real-Time OSs; they are general-purpose time-sharing systems.'
        ],
        tip: 'Mnemonic: "Multiprogramming keeps CPU busy; Time-Sharing keeps the user happy."',
        interviewNote: 'Standard GATE / Tech Question: "What is the difference between Hard RTOS and Soft RTOS?" (Focus on deadline enforcement: total catastrophic failure vs performance degradation).',
        practiceQuestions: [
          {
            id: 'q-os-ch1-1',
            type: 'mcq',
            question: 'Which OS architecture guarantees that critical processing tasks complete within strictly enforced time bounds with zero deadline misses?',
            options: ['Time-Sharing OS', 'Hard Real-Time OS', 'Distributed Batch OS', 'Clustered Network OS'],
            correctIndex: 1,
            explanation: 'Hard RTOS strictly guarantees task completion within rigid deadlines; failure to meet a deadline causes catastrophic system failure.'
          }
        ],
        relatedTopics: ['os-hardware-interface', 'os-kernel-design']
      }
    ]
  },
  {
    id: 'os-ch2',
    number: 2,
    title: 'Hardware-OS Interface & Dual-Mode Execution',
    description: 'Hardware protection rings, Mode bits, privileged instructions, and timer interrupts',
    topics: [
      {
        id: 'os-hardware-interface',
        subjectId: 'os',
        chapterId: 'os-ch2',
        chapterNumber: 2,
        pageNumber: 2,
        title: 'CPU Privilege Rings & Dual-Mode Protection',
        difficulty: 'beginner',
        definition: 'Dual-Mode Execution partitions CPU operations into User Mode (Ring 3, Mode Bit = 1) and Kernel Mode (Ring 0, Mode Bit = 0), ensuring user applications cannot execute instructions that compromise hardware or memory.',
        whyItMatters: 'Dual-mode execution is the bedrock of computer security, preventing rogue applications from overwriting OS memory or halting the CPU.',
        syntax: '// x86 Privilege Rings: Ring 0 (Kernel) -> Ring 1 -> Ring 2 -> Ring 3 (User)',
        explanation: [
          'Mode Bit: A hardware bit in the CPU status register indicating the current privilege level.',
          'Privileged Instructions: Instructions only executable in Kernel Mode (e.g. HLT, modifying page table base registers, disabling interrupts, direct I/O port writes).',
          'Trapping into Kernel: When an application needs privileged services (like reading a file), it executes a software trap/syscall instruction, switching the mode bit from 1 to 0.',
          'Hardware Timer Interrupt: Periodically asserts a hardware interrupt, forcing CPU control back to the kernel scheduler to prevent infinite user loops.'
        ],
        example: {
          language: 'c',
          code: `// Demonstration: User application requesting privileged service\n#include <unistd.h>\n\nint main(void) {\n    // write() triggers a hardware trap (syscall instruction)\n    // Mode bit transitions: 1 (User) -> 0 (Kernel) -> 1 (User)\n    const char msg[] = "Privileged Service Handled by Kernel\\n";\n    write(1, msg, sizeof(msg) - 1);\n    return 0;\n}`,
          output: 'Privileged Service Handled by Kernel',
          annotations: [
            { line: 7, label: 'Mode bit 1 switches to 0 via syscall trap', type: 'yellow' },
            { line: 8, label: 'Kernel sys_write() writes bytes to terminal output', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Dual-Mode State Transition Cycle',
          subtitle: 'Hardware Enforced Mode Bit Switching',
          elements: [
            { id: '1', label: 'User Application', sublabel: 'Ring 3', value: 'Mode Bit = 1', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Software Trap (Syscall)', sublabel: 'Hardware Transition', value: 'Bit Flips: 1 -> 0', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Kernel Mode Service', sublabel: 'Ring 0', value: 'Mode Bit = 0', status: 'referenced', arrowTo: '4' },
            { id: '4', label: 'Sysret / IRET Instruction', sublabel: 'Return to User Space', value: 'Bit Flips: 0 -> 1', status: 'normal' }
          ]
        },
        important: 'Attempting to execute a privileged instruction while in User Mode triggers a hardware exception (General Protection Fault), terminating the offending program immediately.',
        commonMistakes: [
          'Thinking system calls run in user space. System calls execute strictly inside Kernel Mode (Ring 0).',
          'Believing that user programs can manipulate physical hardware registers directly.'
        ],
        tip: 'Remember: Mode Bit 0 = Kernel Mode (Privileged); Mode Bit 1 = User Mode (Unprivileged).',
        interviewNote: 'Standard Core Question: "What prevents a user application with an infinite loop while(1); from freezing the operating system?" (Answer: The Hardware Timer Interrupt periodically preempts the CPU and returns control to the OS scheduler).',
        practiceQuestions: [
          {
            id: 'q-os-ch2-1',
            type: 'mcq',
            question: 'Which of the following operations is classified as a Privileged Instruction?',
            options: ['Reading local variable from stack', 'Executing a conditional jump instruction', 'Disabling all CPU hardware interrupts', 'Calling a user-defined function'],
            correctIndex: 2,
            explanation: 'Disabling CPU hardware interrupts (CLI in x86) is strictly a privileged instruction permitted only in Kernel Mode (Ring 0).'
          }
        ],
        relatedTopics: ['os-evolution-types', 'os-kernel-design']
      }
    ]
  },
  {
    id: 'os-ch3',
    number: 3,
    title: 'Kernel Architectures & Design Principles',
    description: 'Monolithic kernels, Microkernels, Hybrid kernels, and Loadable Kernel Modules (LKMs)',
    topics: [
      {
        id: 'os-kernel-design',
        subjectId: 'os',
        chapterId: 'os-ch3',
        chapterNumber: 3,
        pageNumber: 3,
        title: 'Monolithic vs Microkernel vs Hybrid Systems',
        difficulty: 'intermediate',
        definition: 'Kernel architecture defines how operating system subsystems (memory management, file systems, IPC, device drivers) are partitioned across memory protection boundaries.',
        whyItMatters: 'Kernel design dictates system stability, security vulnerability surface, and performance overhead in modern enterprise operating systems.',
        syntax: 'lsmod # List currently loaded Linux Kernel Modules (LKMs)',
        explanation: [
          'Monolithic Kernel: Entire OS runs in a single large address space in Kernel Mode (Linux, BSD). Highest performance due to direct function calls, but a single driver crash can panic the entire system.',
          'Microkernel: Only minimal mechanisms (IPC, low-level scheduling, basic virtual memory) stay in Kernel Mode. File systems and drivers run as user-space server processes (Minix, QNX). Highly fault-tolerant, but IPC message-passing overhead reduces raw throughput.',
          'Hybrid Kernel: Combines monolithic performance with microkernel modularity (Windows NT, macOS XNU).',
          'Loadable Kernel Modules (LKMs): Allows modern monolithic kernels (Linux) to dynamically load and unload device drivers into kernel memory at runtime without rebooting.'
        ],
        example: {
          language: 'c',
          code: `// Linux Loadable Kernel Module (LKM) Skeleton\n#include <linux/init.h>\n#include <linux/module.h>\n#include <linux/kernel.h>\n\nMODULE_LICENSE("GPL");\nMODULE_AUTHOR("Code-Ink OS Systems");\n\nstatic int __init my_module_init(void) {\n    printk(KERN_INFO "LKM Loaded: Dynamically running in Ring 0!\\n");\n    return 0;\n}\n\nstatic void __exit my_module_exit(void) {\n    printk(KERN_INFO "LKM Unloaded: Memory reclaimed.\\n");\n}\n\nmodule_init(my_module_init);\nmodule_exit(my_module_exit);`,
          output: `[  120.401] LKM Loaded: Dynamically running in Ring 0!\n[  135.109] LKM Unloaded: Memory reclaimed.`,
          annotations: [
            { line: 9, label: 'Executed when module is loaded via insmod', type: 'green' },
            { line: 10, label: 'Kernel log message buffer (dmesg)', type: 'blue' },
            { line: 14, label: 'Cleanup function invoked upon rmmod', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Monolithic vs Microkernel Address Space Partition',
          subtitle: 'Privilege Boundaries in System Architecture',
          elements: [
            { id: '1', label: 'User Space (Ring 3)', sublabel: 'Apps, Web, Shell', value: 'Unprivileged Space', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Microkernel User Servers', sublabel: 'File System & Drivers', value: 'Isolated User Daemons', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Kernel Space (Ring 0)', sublabel: 'Monolithic: All Subsystems', value: 'Micro: IPC & Sched Only', status: 'referenced' }
          ]
        },
        important: 'Linux avoids full microkernel overhead while retaining flexibility by using Loadable Kernel Modules (LKMs) that link directly into the running kernel address space on demand.',
        commonMistakes: [
          'Thinking Windows NT is a pure microkernel. Microsoft modified it into a hybrid kernel by moving graphics and window management into Ring 0 for performance.',
          'Assuming microkernels have faster I/O. Microkernels require multiple context switches and IPC messages for a single file read, making them slower than monolithic kernels.'
        ],
        tip: 'Key trade-off: Monolithic = Maximum Performance; Microkernel = Maximum Reliability and Fault Isolation.',
        interviewNote: 'Famous Tanenbaum-Torvalds Debate: "Why did Linux choose monolithic over microkernel in 1992?" (Answer: Linus Torvalds prioritized raw execution speed and simplified memory management on x86 architectures).',
        practiceQuestions: [
          {
            id: 'q-os-ch3-1',
            type: 'mcq',
            question: 'What is the primary operational drawback of a pure Microkernel architecture compared to a Monolithic kernel?',
            options: [
              'Poor fault isolation during driver crashes',
              'Increased IPC message-passing overhead and frequent context switches',
              'Inability to support virtual memory paging',
              'Incompatibility with modern multi-core processors'
            ],
            correctIndex: 1,
            explanation: 'Microkernels execute drivers and file systems in user space, requiring frequent IPC messages and mode switches that reduce throughput.'
          }
        ],
        relatedTopics: ['os-hardware-interface', 'os-system-calls']
      }
    ]
  },
  {
    id: 'os-ch4',
    number: 4,
    title: 'System Calls & OS Application Programming Interfaces',
    description: 'System call invocation, parameter passing, Interrupt Vector Table (IVT), and POSIX APIs',
    topics: [
      {
        id: 'os-system-calls',
        subjectId: 'os',
        chapterId: 'os-ch4',
        chapterNumber: 4,
        pageNumber: 4,
        title: 'System Call Mechanics & Parameter Passing',
        difficulty: 'intermediate',
        definition: 'A System Call is the programmatic method by which a user application requests a service from the operating system kernel. Parameters are passed via hardware registers, memory blocks, or system stacks.',
        whyItMatters: 'System calls define the boundary between user code and kernel code; understanding them allows developers to write high-performance I/O applications.',
        syntax: 'strace ./my_program # Trace all system calls invoked by a binary in Linux',
        explanation: [
          'System Call Numbers: Each syscall is assigned a unique integer index in the kernel system call dispatch table (e.g. sys_read = 0, sys_write = 1, sys_open = 2 in x86_64).',
          'Parameter Passing Methods: 1. In CPU Registers (fastest, standard in x86_64 ABI: RDI, RSI, RDX, R10, R8, R9); 2. In a Memory Block/Table with pointer passed in a register; 3. Pushed onto the Stack.',
          'POSIX API: Portable Operating System Interface standard ensuring source code compatibility across UNIX, Linux, macOS, and BSD.',
          'C Standard Library Wrapper: Functions like fopen() or printf() are user-space wrappers that buffer data before issuing underlying open() and write() system calls.'
        ],
        example: {
          language: 'c',
          code: `// System Call Invocation via Direct Assembly vs C Library Wrapper\n#include <stdio.h>\n#include <unistd.h>\n#include <sys/syscall.h>\n\nint main(void) {\n    // Method 1: Using C Standard Library wrapper\n    printf("1. Standard Library Call (Buffered)\\n");\n\n    // Method 2: Direct syscall wrapper passing syscall number\n    const char msg[] = "2. Direct syscall(SYS_write, 1, msg, len)\\n";\n    syscall(SYS_write, 1, msg, sizeof(msg) - 1);\n\n    return 0;\n}`,
          output: `1. Standard Library Call (Buffered)\n2. Direct syscall(SYS_write, 1, msg, len)`,
          annotations: [
            { line: 8, label: 'User space C library buffers data in memory', type: 'blue' },
            { line: 12, label: 'Directly triggers architecture-specific trap into kernel sys_write', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'System Call Invocation and Dispatch Table Flow',
          subtitle: 'From User API Call to Kernel Execution',
          elements: [
            { id: '1', label: 'User Application', sublabel: 'Calls write() API', value: 'Places Syscall ID in RAX', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'CPU Trap (syscall)', sublabel: 'Hardware Mode Switch', value: 'Saves User PC & Registers', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Syscall Dispatch Table', sublabel: 'Indexes sys_call_table[RAX]', value: 'Routes to sys_write()', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Kernel sys_write()', sublabel: 'Executes Privileged Work', value: 'Returns Result in RAX', status: 'referenced' }
          ]
        },
        important: 'System calls carry a performance cost of several hundred CPU cycles due to context saving, TLB pollution, and CPU pipeline flushes. Minimizing syscall count (e.g. using buffered I/O) is critical for performance.',
        commonMistakes: [
          'Confusing library calls with system calls. strlen(), sqrt(), and qsort() run 100% in user mode; read(), write(), and fork() trap into kernel mode.',
          'Assuming passing parameters on the stack is standard in modern 64-bit systems. Modern x86_64 systems pass syscall parameters via CPU registers for speed.'
        ],
        tip: 'Use strace in Linux to view every system call your program issues and measure how much time it spends in kernel space.',
        interviewNote: 'High Frequency Question: "What are the three general methods used to pass parameters from a user program to the OS kernel?" (Answer: 1. CPU registers, 2. Memory block/table with pointer in register, 3. Stack push/pop).',
        practiceQuestions: [
          {
            id: 'q-os-ch4-1',
            type: 'mcq',
            question: 'What is the fastest and most common method used by modern 64-bit processors to pass parameters to system calls?',
            options: ['Writing parameters to a disk file', 'Storing parameters directly in CPU hardware registers', 'Pushing parameters onto the user heap', 'Passing parameters through network sockets'],
            correctIndex: 1,
            explanation: 'Modern 64-bit ABIs pass syscall arguments directly in CPU registers (RDI, RSI, RDX, etc.) to minimize memory access latency.'
          }
        ],
        relatedTopics: ['os-hardware-interface', 'os-processes-anatomy']
      }
    ]
  },
  {
    id: 'os-ch5',
    number: 5,
    title: 'System Bootstrapping, BIOS/UEFI & Init',
    description: 'Cold boot sequence: BIOS/UEFI firmware, MBR/GPT, GRUB bootloader, Kernel initialization, and systemd',
    topics: [
      {
        id: 'os-bootstrapping',
        subjectId: 'os',
        chapterId: 'os-ch5',
        chapterNumber: 5,
        pageNumber: 5,
        title: 'Boot Sequence: BIOS/UEFI to Kernel Init (PID 1)',
        difficulty: 'intermediate',
        definition: 'System Bootstrapping is the multi-stage initialization procedure executed when computer hardware powers on, transferring control from motherboard firmware to the bootloader, kernel, and initial user-space daemon (init / systemd).',
        whyItMatters: 'Understanding the boot sequence enables system engineers to troubleshoot unbootable servers, configure dual-boot environments, and design embedded systems.',
        syntax: 'systemctl status # Inspect systemd PID 1 service tree in Linux',
        explanation: [
          'Stage 1: Power-On & POST: CPU powers on with Program Counter pointing to fixed motherboard ROM address. Executes Power-On Self-Test (POST) to verify RAM, keyboard, and storage controllers.',
          'Stage 2: BIOS vs UEFI: Legacy BIOS reads Master Boot Record (MBR, 512 bytes on Sector 0). Modern UEFI uses GUID Partition Tables (GPT) and loads EFI bootloader binaries directly from an EFI System Partition (ESP).',
          'Stage 3: Bootloader (e.g. GRUB): Loads kernel binary image (vmlinuz) and initial RAM disk (initramfs) into memory and passes kernel parameters.',
          'Stage 4: Kernel Initialization: Uncompresses itself, initializes memory page tables, mounts temporary root filesystem, and initializes hardware device drivers.',
          'Stage 5: First User Process (init / systemd PID 1): The kernel spawns the root ancestor process (PID 1) in user space, which launches system daemons, network services, and login shells.'
        ],
        example: {
          language: 'c',
          code: `// Viewing Ancestor Process Tree in Linux (Proving init/systemd is PID 1)\n#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    printf("Current Process PID:        %d\\n", getpid());\n    printf("Parent Process PID (Shell):  %d\\n", getppid());\n    printf("Ultimate Root Ancestor:      PID 1 (init / systemd)\\n");\n    return 0;\n}`,
          output: `Current Process PID:        18240\nParent Process PID (Shell):  14012\nUltimate Root Ancestor:      PID 1 (init / systemd)`,
          annotations: [
            { line: 6, label: 'Unique PID assigned by kernel process table', type: 'blue' },
            { line: 7, label: 'Parent shell process PID', type: 'yellow' },
            { line: 8, label: 'All processes in the system trace their lineage back to PID 1', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Complete Computer Bootstrapping Sequence',
          subtitle: 'From Silicon Power-On to Operating System Shell',
          elements: [
            { id: '1', label: '1. Power On & POST', sublabel: 'Motherboard ROM', value: 'Hardware Diagnostic Check', status: 'normal', arrowTo: '2' },
            { id: '2', label: '2. BIOS / UEFI', sublabel: 'Firmware Stage', value: 'Locates Bootable Disk (ESP)', status: 'normal', arrowTo: '3' },
            { id: '3', label: '3. Bootloader (GRUB)', sublabel: 'Sector 0 / EFI Binary', value: 'Loads vmlinuz & initramfs', status: 'active', arrowTo: '4' },
            { id: '4', label: '4. Kernel Space Init', sublabel: 'vmlinuz Executed', value: 'Mounts Root FS & Drivers', status: 'active', arrowTo: '5' },
            { id: '5', label: '5. systemd / init (PID 1)', sublabel: 'Root User Space', value: 'Spawns Daemons & Shells', status: 'referenced' }
          ]
        },
        important: 'If PID 1 (init or systemd) terminates or crashes, the Linux kernel panics and immediately halts the entire computer.',
        commonMistakes: [
          'Confusing the bootloader with the kernel. The bootloader (GRUB) merely locates and loads the kernel into RAM; it exits once the kernel starts.',
          'Thinking MBR can support disks larger than 2 TB. MBR 32-bit sector addressing limits disk size to 2.2 TB; GPT (UEFI) supports disks up to 9.4 ZB.'
        ],
        tip: 'Bootstrap loader code is stored in ROM/EEPROM because RAM is volatile and completely empty when the computer powers on.',
        interviewNote: 'Standard Core Interview Question: "What process has PID 1 in Linux and what happens if it terminates?" (Answer: init or systemd is PID 1, the ancestor of all user processes. If it crashes, the kernel executes a kernel panic and halts the system).',
        practiceQuestions: [
          {
            id: 'q-os-ch5-1',
            type: 'mcq',
            question: 'What is the Process ID (PID) assigned to the initial root user-space process spawned by the Linux kernel upon boot completion?',
            options: ['PID 0', 'PID 1', 'PID 2', 'PID 100'],
            correctIndex: 1,
            explanation: 'The kernel spawns init (or systemd) as PID 1, which becomes the ancestor of all subsequent user-space processes.'
          }
        ],
        relatedTopics: ['os-system-calls', 'os-processes-anatomy']
      }
    ]
  },
  {
    id: 'os-ch6',
    number: 6,
    title: 'Operating System Services & User Interfaces',
    description: 'OS service layers, Command Line Interface (CLI), Graphical User Interface (GUI), and system utilities',
    topics: [
      {
        id: 'os-services-ui',
        subjectId: 'os',
        chapterId: 'os-ch6',
        chapterNumber: 6,
        pageNumber: 6,
        title: 'Operating System Services & Command Interpreters',
        difficulty: 'beginner',
        definition: 'OS Services provide an execution environment for programs, including User Interface (CLI/GUI), Program Execution, I/O Operations, File System Manipulation, Communications (IPC/Networking), and Error Detection.',
        whyItMatters: 'Developers interact with the OS through command interpreters (Shells) and system programs that bridge user commands to kernel system calls.',
        syntax: 'echo $SHELL # Inspect default command interpreter (e.g. /bin/bash)',
        explanation: [
          'Command Line Interface (CLI / Shell): Text-based interpreter that reads commands from the user and executes them (Bash, Zsh, PowerShell). The shell itself is a user-mode program, NOT part of the kernel.',
          'Graphical User Interface (GUI): Mouse- and touch-based desktop windowing interface (X11, Wayland, Windows Desktop).',
          'System Programs: Utilities that provide a convenient environment for program development and execution (file manipulation: cp, mv, rm; status info: top, ps; programming support: gcc, gdb).',
          'Batch Interfaces: Commands and directives entered via batch scripts without interactive user intervention.'
        ],
        example: {
          language: 'c',
          code: `// Simple Shell Execution Loop Concept in C\n#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void) {\n    char command[] = "/bin/echo";\n    char *args[] = { command, "Code-Ink Shell Prototype", NULL };\n\n    pid_t pid = fork();\n    if (pid == 0) {\n        // Child executes the user command\n        execv(args[0], args);\n    } else {\n        // Parent shell waits for command to complete\n        wait(NULL);\n        printf("Shell: Command execution finished.\\n");\n    }\n    return 0;\n}`,
          output: `Code-Ink Shell Prototype\nShell: Command execution finished.`,
          annotations: [
            { line: 11, label: 'Shell forks a child process to isolate command execution', type: 'yellow' },
            { line: 13, label: 'execv replaces child address space with binary from disk', type: 'green' },
            { line: 16, label: 'Parent shell waits and regains command prompt control', type: 'blue' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Shell Command Execution Lifecycle',
          subtitle: 'Read-Eval-Print-Loop (REPL) Process Spawning',
          elements: [
            { id: '1', label: '1. User Input', sublabel: 'Types "ls -l"', value: 'Shell Reads Command', status: 'normal', arrowTo: '2' },
            { id: '2', label: '2. fork() System Call', sublabel: 'Clones Shell', value: 'Child Process Created', status: 'active', arrowTo: '3' },
            { id: '3', label: '3. exec() System Call', sublabel: 'Replaces Child Image', value: 'Loads /bin/ls Binary', status: 'active', arrowTo: '4' },
            { id: '4', label: '4. wait() Completion', sublabel: 'Parent Shell Unblocks', value: 'Prompts for Next Command', status: 'referenced' }
          ]
        },
        important: 'The Shell is NOT part of the Operating System kernel; it is a regular user-mode program that translates text strings into corresponding fork() and exec() system calls.',
        commonMistakes: [
          'Confusing a Terminal with a Shell. The terminal (e.g. Alacritty, GNOME Terminal) is a GUI window that displays characters; the shell (Bash, Zsh) is the interpreter running inside it.',
          'Assuming GUI operations bypass system calls. Clicking "Save File" in a GUI application invokes the exact same underlying write() system call as a command-line script.'
        ],
        tip: 'Whenever building command-line tools, structure your CLI using standard UNIX pipes and return exit status 0 for success to ensure script composability.',
        interviewNote: 'Standard OS Concept Question: "Is the command interpreter (Shell) part of the operating system kernel?" (Answer: No! The shell is a user-space application that interfaces with the kernel through standard system calls).',
        practiceQuestions: [
          {
            id: 'q-os-ch6-1',
            type: 'mcq',
            question: 'Which of the following statements is strictly correct regarding a UNIX Shell (such as Bash)?',
            options: [
              'It executes directly inside Kernel Mode (Ring 0)',
              'It is a user-space application that executes commands using system calls like fork() and exec()',
              'It is hardcoded into the BIOS firmware',
              'It cannot run in headless servers without a GUI'
            ],
            correctIndex: 1,
            explanation: 'The shell is an unprivileged user-space program that translates user commands into kernel system calls.'
          }
        ],
        relatedTopics: ['os-system-calls', 'os-processes-anatomy']
      }
    ]
  },
  {
    id: 'os-ch7',
    number: 7,
    title: 'Process Concept & Virtual Address Space Anatomy',
    description: 'Process anatomy, memory segments (Text, Data, BSS, Heap, Stack), and memory virtualization',
    topics: [
      {
        id: 'os-processes-anatomy',
        subjectId: 'os',
        chapterId: 'os-ch7',
        chapterNumber: 7,
        pageNumber: 7,
        title: 'Virtual Process Address Space: Text, Data, BSS, Heap & Stack',
        difficulty: 'intermediate',
        definition: 'A Process is an active program in execution. Its virtual memory layout is partitioned into five distinct segments: Text (instructions), Data (initialized globals), BSS (uninitialized globals), Heap (dynamic memory), and Stack (local activation records).',
        whyItMatters: 'Understanding memory segmentation prevents segmentation faults, memory leaks, buffer overflows, and stack exhaustion crashes in backend systems.',
        syntax: 'size a.out # Display text, data, and bss segment byte counts in Linux',
        explanation: [
          'Text Segment (Code): Contains compiled machine instructions. Marked Read-Only and shareable among multiple instances of the same program to save RAM.',
          'Data Segment: Stores initialized global and static variables (e.g. int count = 100;).',
          'BSS Segment (Block Started by Symbol): Stores uninitialized global and static variables. The kernel zeroes this memory out at program startup without consuming space in the binary file.',
          'Heap Segment: Dynamic memory allocated at runtime via malloc(), calloc(), or new. Managed by the programmer/garbage collector; grows upward toward higher memory addresses.',
          'Stack Segment: Stores local variables, function call frames, parameters, and return addresses. Grows downward toward lower memory addresses with every function call.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nint g_data = 100;       // Initialized -> Data Segment\nint g_bss;              // Uninitialized -> BSS Segment\n\nint main(void) {\n    int stack_var = 10; // Local -> Stack Segment\n    int *heap_var = malloc(sizeof(int)); // Dynamic -> Heap Segment\n\n    printf("1. Text Segment (main):  %p\\n", (void*)main);\n    printf("2. Data Segment (g_data): %p\\n", (void*)&g_data);\n    printf("3. BSS Segment (g_bss):   %p\\n", (void*)&g_bss);\n    printf("4. Heap Segment (malloc): %p\\n", (void*)heap_var);\n    printf("5. Stack Segment (local): %p\\n", (void*)&stack_var);\n\n    free(heap_var);\n    return 0;\n}`,
          output: `1. Text Segment (main):  0x55e098401169\n2. Data Segment (g_data): 0x55e098404018\n3. BSS Segment (g_bss):   0x55e098404020\n4. Heap Segment (malloc): 0x55e0996842a0\n5. Stack Segment (local): 0x7ffd58e1c17c`,
          annotations: [
            { line: 4, label: 'Stored in executable file Data segment', type: 'blue' },
            { line: 5, label: 'Zeroed at startup in BSS segment without inflating binary size', type: 'yellow' },
            { line: 9, label: 'Dynamically allocated memory growing upward on Heap', type: 'green' },
            { line: 8, label: 'High virtual address growing downward on Stack', type: 'blue' }
          ]
        },
        diagram: {
          type: 'memory',
          title: 'Virtual Process Address Space Layout',
          subtitle: 'Segment Hierarchy from Low to High Addresses',
          elements: [
            { id: '1', label: 'Stack Segment', sublabel: 'Local vars & return frames', value: 'High Memory (Grows Down v)', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Virtual Free Space', sublabel: 'Collision = Stack Overflow', value: 'Address Space Gap', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Heap Segment', sublabel: 'malloc() / new buffer', value: 'Low Memory (Grows Up ^)', status: 'active', arrowTo: '4' },
            { id: '4', label: 'BSS & Data Segments', sublabel: 'Global & Static variables', value: 'Fixed Size Segments', status: 'normal', arrowTo: '5' },
            { id: '5', label: 'Text Segment', sublabel: 'Binary Machine Code', value: 'Read-Only Memory', status: 'referenced' }
          ]
        },
        important: 'In 64-bit architectures, the virtual address space is so vast (2^64 bytes = 16 Exabytes) that the Stack and Heap almost never physically collide; instead, the OS enforces soft ulimit stack limits (typically 8 MB) to prevent run-away recursive stack overflow.',
        commonMistakes: [
          'Confusing Heap with Stack. Stack allocation is automatic and fast (O(1) stack pointer move); Heap allocation requires free-list searching and can cause memory leaks.',
          'Assuming uninitialized global variables inflate the compiled binary size on disk. The BSS segment stores only variable metadata and size; physical zeroed RAM is allocated only when the process is loaded.'
        ],
        tip: 'Mnemonic: "BSS = Better Save Space" (uninitialized data consumes zero bytes in the on-disk executable file).',
        interviewNote: 'Standard Core Tech Question: "Where are static variables stored in C/C++ memory?" (Answer: Initialized static variables reside in the Data Segment; uninitialized static variables reside in the BSS Segment).',
        practiceQuestions: [
          {
            id: 'q-os-ch7-1',
            type: 'mcq',
            question: 'In which virtual memory segment are dynamically allocated variables (via malloc or new) stored during program execution?',
            options: ['Stack Segment', 'Text Segment', 'Heap Segment', 'BSS Segment'],
            correctIndex: 2,
            explanation: 'Dynamic memory allocated at runtime via malloc() or new resides on the Heap segment, which grows upward toward higher memory addresses.'
          }
        ],
        relatedTopics: ['os-system-calls', 'os-pcb-context-switch']
      }
    ]
  },
  {
    id: 'os-ch8',
    number: 8,
    title: 'Process Control Block (PCB) & Context Switching',
    description: 'Process Control Block internals, CPU register states, Context switch mechanics, and dispatch latency',
    topics: [
      {
        id: 'os-pcb-context-switch',
        subjectId: 'os',
        chapterId: 'os-ch8',
        chapterNumber: 8,
        pageNumber: 8,
        title: 'PCB Data Structure & Context Switch Mechanics',
        difficulty: 'intermediate',
        definition: 'A Process Control Block (PCB, also known as task_struct in Linux) is the kernel data structure that stores all information needed to manage a specific process. A Context Switch saves the state of the active process to its PCB and restores another process from its PCB.',
        whyItMatters: 'Context switching allows multiple processes to share a single CPU core, but excessive context switching creates pure overhead that degrades system throughput.',
        syntax: 'vmstat 1 # Monitor system-wide context switches per second (column "cs")',
        explanation: [
          'Information Stored in a PCB: 1. Process ID (PID); 2. Process State (Ready, Running, Blocked); 3. Program Counter (address of next instruction); 4. CPU Registers (accumulators, index registers, stack pointers); 5. CPU Scheduling Information (priority, queue pointers); 6. Memory Management Information (page tables, base/limit registers); 7. Accounting Information (CPU time consumed); 8. I/O Status Information (open file descriptors).',
          'Context Switch Mechanics: 1. Timer interrupt fires; 2. CPU transitions to kernel mode; 3. General registers, PC, and stack pointer of process P0 are saved into PCB0; 4. Scheduler selects process P1; 5. Memory management registers (e.g. CR3) are updated with P1\'s page table; 6. CPU registers and PC of P1 are restored from PCB1; 7. CPU executes IRET, switching to user mode and resuming P1.',
          'Cost of Context Switching: Pure CPU overhead. Also causes indirect cache thrashing (L1/L2 caches and TLB entries become invalid for the new process).'
        ],
        example: {
          language: 'c',
          code: `// Inspecting Linux Process Control Information via /proc filesystem\n#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    char path[64];\n    snprintf(path, sizeof(path), "/proc/%d/stat", getpid());\n    \n    FILE *f = fopen(path, "r");\n    if (f) {\n        int pid;\n        char comm[64], state;\n        fscanf(f, "%d %s %c", &pid, comm, &state);\n        printf("PCB Info -> PID: %d, Executable: %s, Current State: %c\\n", pid, comm, state);\n        fclose(f);\n    }\n    return 0;\n}`,
          output: `PCB Info -> PID: 21904, Executable: (a.out), Current State: R`,
          annotations: [
            { line: 7, label: 'Linux exposes kernel task_struct PCB fields via /proc/<pid>/stat', type: 'blue' },
            { line: 12, label: 'Current scheduling state: R = Running / Runnable in Ready queue', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Context Switch Transition Sequence',
          subtitle: 'Saving P0 State to PCB0 and Restoring P1 State from PCB1',
          elements: [
            { id: '1', label: 'Process P0 Running', sublabel: 'User Mode', value: 'Executing Instructions', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Timer Interrupt / Syscall', sublabel: 'Switch to Kernel Mode', value: 'Save P0 State to PCB0', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Scheduler Dispatcher', sublabel: 'Selects Next Process', value: 'Load P1 State from PCB1', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Process P1 Running', sublabel: 'User Mode', value: 'Resumes Execution', status: 'referenced' }
          ]
        },
        important: 'Context switch time is completely un-productive: zero user instructions are executed during a context switch. High-performance systems use threads or coroutines to minimize context switch overhead.',
        commonMistakes: [
          'Confusing a Mode Switch with a Context Switch. A Mode Switch switches privilege between User and Kernel mode for the SAME process (cheap); a Context Switch switches the CPU between TWO DIFFERENT processes (expensive, flushes caches).',
          'Assuming PCB is stored in user space. The PCB is stored in privileged kernel memory; user programs cannot directly view or modify their own PCB.'
        ],
        tip: 'On Linux, the PCB is implemented in C as struct task_struct in <linux/sched.h>.',
        interviewNote: 'Standard Core Tech Question: "What is the difference between a Mode Switch and a Context Switch?" (Answer: Mode switch changes execution privilege for the same process without changing process context; Context switch saves one process state and restores another, incurring cache invalidation).',
        practiceQuestions: [
          {
            id: 'q-os-ch8-1',
            type: 'mcq',
            question: 'During a process context switch, where are the CPU registers and Program Counter of the preempted process saved by the OS?',
            options: ['In the user process heap', 'In the Process Control Block (PCB)', 'In the BIOS EEPROM', 'In the Translation Lookaside Buffer (TLB)'],
            correctIndex: 1,
            explanation: 'The operating system saves all hardware registers, Program Counter, and execution status into the Process Control Block (PCB) of the preempted process.'
          }
        ],
        relatedTopics: ['os-processes-anatomy', 'os-process-lifecycle']
      }
    ]
  },
  {
    id: 'os-ch9',
    number: 9,
    title: 'Process Lifecycle & 5-State / 7-State Models',
    description: 'Process state transitions: New, Ready, Running, Waiting, Terminated, and Swapped Suspended states',
    topics: [
      {
        id: 'os-process-lifecycle',
        subjectId: 'os',
        chapterId: 'os-ch9',
        chapterNumber: 9,
        pageNumber: 9,
        title: '5-State and 7-State Process Transition Models',
        difficulty: 'beginner',
        definition: 'As a process executes, it transitions through distinct operational states managed by the OS scheduler: New, Ready, Running, Waiting (Blocked), Terminated, and suspended states (Ready-Suspended, Blocked-Suspended) in virtual memory swapping.',
        whyItMatters: 'Process state models govern CPU scheduling queues, memory swapping decisions, and responsiveness under heavy system workload.',
        syntax: '// 5-State Transitions: New -> Ready <-> Running -> Terminated; Running -> Waiting -> Ready',
        explanation: [
          '1. New: The process is being created and its PCB allocated.',
          '2. Ready: The process is loaded in RAM and waiting to be assigned to a CPU core by the scheduler.',
          '3. Running: Instructions are actively executing on a CPU core.',
          '4. Waiting (Blocked): The process cannot execute until an external event or I/O operation completes.',
          '5. Terminated: Execution has finished; resources are freed, but PCB remains until collected.',
          '7-State Suspended States: When physical RAM is exhausted, the OS swaps inactive processes to disk swap space: Ready-Suspended (swapped to disk, ready to run once swapped in) and Blocked-Suspended (swapped to disk, waiting for I/O event).'
        ],
        example: {
          language: 'c',
          code: `// Tracing Process State Transitions via sleep() and I/O\n#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    printf("1. State: Running on CPU\\n");\n    \n    // sleep() triggers transition: Running -> Waiting (Blocked)\n    // Kernel timer wakes process: Waiting -> Ready -> Running\n    sleep(1);\n    \n    printf("2. State: Resumed Running after timer event\\n");\n    return 0; // Transitions to: Terminated\n}`,
          output: `1. State: Running on CPU\n2. State: Resumed Running after timer event`,
          annotations: [
            { line: 5, label: 'Running state executing user instructions', type: 'green' },
            { line: 9, label: 'sleep() syscall transitions process to Waiting state', type: 'yellow' },
            { line: 12, label: 'main() return transitions process to Terminated state', type: 'blue' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Seven-State Process Lifecycle State Machine',
          subtitle: 'Transitions Including Secondary Storage Swapping',
          elements: [
            { id: '1', label: 'New', sublabel: 'Admitted', value: 'PCB Created', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Ready (RAM)', sublabel: 'Scheduler Dispatch', value: 'Waiting for CPU', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Running', sublabel: 'I/O or Interrupt', value: 'Active on Core', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Waiting (Blocked)', sublabel: 'I/O Completion', value: 'Waiting for Device', status: 'warning', arrowTo: '2' },
            { id: '5', label: 'Ready-Suspended', sublabel: 'Swapped to Disk', value: 'RAM Relieved', status: 'referenced', arrowTo: '2' }
          ]
        },
        important: 'Golden Invariant: A process can NEVER transition directly from Waiting (Blocked) to Running! When its I/O finishes, it MUST enter the Ready queue first and wait for the CPU scheduler.',
        commonMistakes: [
          'Thinking a process transitions directly from Waiting to Running upon I/O completion. It must always transition Waiting -> Ready first.',
          'Confusing Ready state with Waiting state. Ready processes have all resources and only need the CPU; Waiting processes cannot run even if a CPU core is idle.'
        ],
        tip: 'Remember: Ready = Needs only CPU; Waiting = Needs I/O or event, cannot run on CPU even if free.',
        interviewNote: 'Standard GATE / Campus Placement Question: "Can a process transition from Blocked directly to Running? Explain why or why not." (Answer: No. In all operating systems, I/O completion moves the process to the Ready queue. Only the scheduler dispatcher moves a process from Ready to Running).',
        practiceQuestions: [
          {
            id: 'q-os-ch9-1',
            type: 'mcq',
            question: 'When a process in the Waiting (Blocked) state has its requested I/O operation complete, into which state does the OS transition it?',
            options: ['Running State', 'Ready State', 'Terminated State', 'Suspended Blocked State'],
            correctIndex: 1,
            explanation: 'When I/O completes, the process transitions to the Ready state to await CPU scheduling; it cannot jump directly to Running.'
          }
        ],
        relatedTopics: ['os-pcb-context-switch', 'os-process-creation-fork']
      }
    ]
  },
  {
    id: 'os-ch10',
    number: 10,
    title: 'Process Creation & Control: fork(), exec() & Termination',
    description: 'fork() semantics, exec() family, wait() synchronization, Copy-On-Write, and Zombie/Orphan lifecycle',
    topics: [
      {
        id: 'os-process-creation-fork',
        subjectId: 'os',
        chapterId: 'os-ch10',
        chapterNumber: 10,
        pageNumber: 10,
        title: 'fork(), exec(), wait() & Zombie/Orphan Handling',
        difficulty: 'intermediate',
        definition: 'In POSIX systems, new processes are created via the fork() system call (cloning parent state with Copy-On-Write), replaced via exec() (loading a new binary), and collected via wait() to capture exit status codes.',
        whyItMatters: 'Mastering fork-exec semantics is essential for building multi-process servers, daemons, terminal shells, and high-concurrency microservices.',
        syntax: 'pid_t pid = fork(); // 0 in child, child_pid in parent, -1 on error',
        explanation: [
          'fork(): Duplicates the calling process. Returns 0 to the child and the child\'s PID to the parent. Both processes continue execution at the next line.',
          'Copy-On-Write (COW): Parent and child share the same physical RAM pages read-only upon fork(). A page is only duplicated when either process attempts a write operation, maximizing speed.',
          'exec() Family: Replaces current process image, code, stack, and heap with a new binary executable file from disk. The PID remains unchanged.',
          'wait() / waitpid(): Blocks parent until child terminates, collecting the child exit status code and removing its entry from the kernel process table.',
          'Zombie Process: A child that has finished execution (exit()), but whose parent has not yet called wait(). Remains in process table as <defunct>.',
          'Orphan Process: A process whose parent died before it. In Linux, orphan processes are automatically adopted by init or systemd (PID 1), which reaps their exit status.'
        ],
        example: {
          language: 'c',
          code: `#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void) {\n    pid_t pid = fork();\n    \n    if (pid < 0) {\n        perror("Fork failed");\n        return 1;\n    } else if (pid == 0) {\n        // Child process execution\n        printf("[Child] Running PID: %d, Parent PID: %d\\n", getpid(), getppid());\n        _exit(42); // Exits with status code 42\n    } else {\n        // Parent process collects child exit status\n        int status;\n        wait(&status);\n        if (WIFEXITED(status)) {\n            printf("[Parent] Child %d exited normally with code: %d\\n", pid, WEXITSTATUS(status));\n        }\n    }\n    return 0;\n}`,
          output: `[Child] Running PID: 24501, Parent PID: 24500\n[Parent] Child 24501 exited normally with code: 42`,
          annotations: [
            { line: 5, label: 'fork() splits program execution into parent and child', type: 'yellow' },
            { line: 12, label: 'Child exits, transitioning temporarily into Zombie state', type: 'red' },
            { line: 16, label: 'wait() reaps child status, cleanly removing it from process table', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'UNIX Process Creation & Adoption Architecture',
          subtitle: 'Parent fork(), Child Termination, and init (PID 1) Adoption',
          elements: [
            { id: '1', label: 'systemd / init (PID 1)', sublabel: 'Root Process', value: 'Adopts Orphan Processes', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Parent Process (PID 100)', sublabel: 'Calls fork()', value: 'Active Parent', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Child Process (PID 101)', sublabel: 'Terminates', value: 'Zombie until Parent wait()', status: 'warning' }
          ]
        },
        important: 'You CANNOT kill a Zombie process using kill -9 <PID> because a zombie process is ALREADY dead! To remove a zombie, you must kill its parent process so that init (PID 1) adopts the zombie and immediately calls wait() to reap it.',
        commonMistakes: [
          'Assuming fork() runs the parent first or child first. The execution order is strictly non-deterministic and determined by the CPU scheduler.',
          'Forgetting to call wait() in long-running daemon servers, resulting in process table exhaustion from thousands of accumulated zombie records.'
        ],
        tip: 'Formula Question: If a program executes N consecutive fork() calls without loops, exactly 2^N - 1 child processes are created.',
        interviewNote: '#1 Most Popular OS Interview Question: "What is a Zombie Process, what is an Orphan Process, and how do you eliminate a Zombie process?" (Answer: Zombie = dead child whose parent has not reaped it; Orphan = child whose parent died and is adopted by PID 1. Kill the parent to reap the zombie).',
        practiceQuestions: [
          {
            id: 'q-os-ch10-1',
            type: 'mcq',
            question: 'If a program executes the following code snippet: fork(); fork(); fork();, how many total child processes are created?',
            options: ['3 child processes', '6 child processes', '7 child processes', '8 child processes'],
            correctIndex: 2,
            explanation: 'Total processes = 2^3 = 8. Total child processes created = 8 - 1 (original parent) = 7 child processes.'
          }
        ],
        relatedTopics: ['os-process-lifecycle', 'os-threads-fundamentals']
      }
    ]
  }
];
