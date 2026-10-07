import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, Play, Sparkles, Terminal, Cpu, Layers, CheckCircle2, ChevronRight, Pause, ChevronLeft } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { StudentMascot } from './StudentMascot';
import { notebookAudio } from '../../utils/audioEffects';

interface TactileClayHeroProps {
  onEnter: () => void;
}

// 5 Complete Real-World Computer Science Spreads
export interface SpreadData {
  id: number;
  chapterTitle: string;
  subTitle: string;
  badgeText: string;
  badgeColor: string;
  leftPageHeader: string;
  leftPageSub: string;
  codeSnippet: string;
  lang: string;
  diagramType: 'c-pointer' | 'cpp-stack' | 'python-pyobject' | 'dsa-tree' | 'exam-rubrics';
}

export const SPREADS: SpreadData[] = [
  {
    id: 1,
    chapterTitle: 'Master Computer Science',
    subTitle: '01 / Dynamic Memory & Pointers',
    badgeText: 'GCC 13 · 0ms',
    badgeColor: 'bg-emerald-500/15 text-emerald-800 font-bold',
    leftPageHeader: 'Memory Architecture',
    leftPageSub: 'Physical Address Pointer Table',
    lang: 'c',
    diagramType: 'c-pointer',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

int main() {
    Node* head = (Node*)malloc(sizeof(Node));
    head->data = 42;
    head->next = NULL;

    printf("Memory: %p\\n", (void*)head);
    return 0;
}`,
  },
  {
    id: 2,
    chapterTitle: 'Zero-Cost Abstractions',
    subTitle: '02 / Stack Frames & Vectors',
    badgeText: 'Clang 17 · 0ms',
    badgeColor: 'bg-blue-500/15 text-blue-800 font-bold',
    leftPageHeader: 'Call Stack Frame',
    leftPageSub: 'RBP Base Pointer & Offsets',
    lang: 'cpp',
    diagramType: 'cpp-stack',
    codeSnippet: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> buffer;
    buffer.reserve(1024);
    buffer.push_back(0x7F);

    // Zero heap reallocation overhead
    std::cout << "Cap: " << buffer.capacity() << '\\n';
    return 0;
}`,
  },
  {
    id: 3,
    chapterTitle: 'Python Memory Runtime',
    subTitle: '03 / PyObject & Bytecode',
    badgeText: 'Python 3.12 · 0ms',
    badgeColor: 'bg-amber-500/15 text-amber-800 font-bold',
    leftPageHeader: 'PyObject Heap Layout',
    leftPageSub: 'Reference Count & Type Ptr',
    lang: 'python',
    diagramType: 'python-pyobject',
    codeSnippet: `import sys

class Node:
    __slots__ = ('val', 'next')
    def __init__(self, val):
        self.val = val
        self.next = None

head = Node(42)
# Ref count tracked in memory
print(f"Ref count: {sys.getrefcount(head)}")`,
  },
  {
    id: 4,
    chapterTitle: 'Algorithms & Recursion',
    subTitle: '04 / Balanced Search Trees',
    badgeText: 'DSA · O(log N)',
    badgeColor: 'bg-purple-500/15 text-purple-800 font-bold',
    leftPageHeader: 'Binary Search Tree',
    leftPageSub: 'Recursive Subtree Balancing',
    lang: 'c',
    diagramType: 'dsa-tree',
    codeSnippet: `TreeNode* invert_tree(TreeNode* root) {
    if (!root) return NULL;

    TreeNode* temp = root->left;
    root->left = invert_tree(root->right);
    root->right = invert_tree(temp);

    return root;
}`,
  },
  {
    id: 5,
    chapterTitle: 'Exam Vault & Rubrics',
    subTitle: '05 / Official Semester Grading',
    badgeText: '24 Papers · 100% Free',
    badgeColor: 'bg-emerald-600/15 text-emerald-800 font-bold',
    leftPageHeader: 'University Rubric Sheet',
    leftPageSub: 'Automated Test Suite Verified',
    lang: 'c',
    diagramType: 'exam-rubrics',
    codeSnippet: `/* Official Semester Exam Marking Key */
// Q3: Circular Queue with boundary checks
// [Marks: 10/10] - Zero memory leak verified
void enqueue(Queue* q, int val) {
    if ((q->rear + 1) % MAX == q->front) return;
    q->arr[q->rear] = val;
    q->rear = (q->rear + 1) % MAX;
}`,
  },
];

// Helper: Technical Diagram Renderer
function SpreadDiagram({ type }: { type: SpreadData['diagramType'] }) {
  if (type === 'c-pointer') {
    return (
      <svg
        className="w-full max-w-[340px] sm:max-w-[380px] h-[190px] sm:h-[270px] overflow-visible"
        fill="none"
        stroke="#1e293b"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 420 400"
      >
        <rect fill="rgba(255,255,255,0.4)" height="280" rx="2" strokeWidth="2" width="85" x="90" y="20" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="50" y2="50" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="75" y2="75" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="105" y2="105" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="125" y2="125" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="210" y2="210" />
        <line strokeWidth="1.8" x1="90" x2="175" y1="230" y2="230" />

        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="38">address</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="52">pointer</text>
        <line stroke="#94a3b8" strokeWidth="1" x1="82" x2="90" y1="45" y2="45" />

        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="88">address</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="102">pointer</text>
        <line stroke="#94a3b8" strokeWidth="1" x1="82" x2="90" y1="95" y2="95" />

        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="195">address</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="12" textAnchor="end" x="78" y="210">pointer</text>
        <line stroke="#94a3b8" strokeWidth="1" x1="82" x2="90" y1="205" y2="205" />

        <text fill="#1e293b" fontFamily="monospace" fontSize="13" textAnchor="middle" x="132" y="42">data</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="13" textAnchor="middle" x="132" y="67">...</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="11" textAnchor="middle" x="132" y="118">0x7ffd</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="13" textAnchor="middle" x="132" y="224">data</text>
        <text fill="#1e293b" fontFamily="monospace" fontSize="15" textAnchor="middle" x="132" y="270">⋮</text>

        <circle cx="132" cy="160" fill="#fff" r="15" strokeWidth="1.8" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="13" fontWeight="bold" textAnchor="middle" x="132" y="165">n1</text>
        <circle cx="280" cy="160" fill="#fff" r="15" strokeWidth="1.8" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="13" fontWeight="bold" textAnchor="middle" x="280" y="165">n2</text>
        <circle cx="265" cy="235" fill="#fff" r="14" strokeWidth="1.8" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="12" fontWeight="bold" textAnchor="middle" x="265" y="240">nm</text>

        <line strokeWidth="1.8" x1="147" x2="262" y1="160" y2="160" />
        <polygon fill="#1e293b" points="262,156 268,160 262,164" />
        <line strokeWidth="1.8" x1="132" x2="132" y1="175" y2="207" />
        <polygon fill="#1e293b" points="128,206 132,212 136,206" />
        <path d="M 175 42 L 340 75 L 340 160 L 298 160" strokeWidth="1.8" />
        <polygon fill="#1e293b" points="300,156 295,160 300,164" />
      </svg>
    );
  }

  if (type === 'cpp-stack') {
    return (
      <div className="w-full max-w-[320px] font-mono text-[9.5px] sm:text-[10px] space-y-2">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-950 font-bold border border-blue-400/40 flex justify-between shadow-2xs">
          <span>[RBP + 16] Return Address</span>
          <span className="text-blue-800 font-semibold">0x7fffffffe0</span>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-950 font-bold border border-amber-400/40 flex justify-between shadow-2xs">
          <span>[RBP - 08] Saved Old RBP</span>
          <span className="text-amber-800 font-semibold">0x7fffffffd8</span>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-950 font-bold border border-emerald-400/40 flex justify-between shadow-2xs">
          <span>[RBP - 32] std::vector data*</span>
          <span className="text-emerald-800 font-semibold">Heap Ptr ➔</span>
        </div>
      </div>
    );
  }

  if (type === 'python-pyobject') {
    return (
      <div className="w-full max-w-[320px] font-mono text-[9.5px] sm:text-[10px] space-y-2">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-950 font-bold border border-amber-400/40 flex justify-between shadow-2xs">
          <span>PyObject_HEAD</span>
          <span className="text-amber-800 font-semibold">ob_refcnt = 1</span>
        </div>
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-950 font-bold border border-purple-400/40 flex justify-between shadow-2xs">
          <span>*ob_type</span>
          <span className="text-purple-800 font-semibold">&lt;class 'Node'&gt;</span>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-950 font-bold border border-emerald-400/40 flex justify-between shadow-2xs">
          <span>__slots__ payload</span>
          <span className="text-emerald-800 font-semibold">val=42, next=None</span>
        </div>
      </div>
    );
  }

  if (type === 'dsa-tree') {
    return (
      <svg className="w-full max-w-[320px] h-[170px] overflow-visible" fill="none" stroke="#1e293b" strokeLinecap="round" viewBox="0 0 320 180">
        <circle cx="160" cy="30" fill="#fff" r="16" strokeWidth="2" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="12" fontWeight="bold" textAnchor="middle" x="160" y="34">42</text>
        <circle cx="90" cy="90" fill="#fff" r="14" strokeWidth="1.8" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="11" textAnchor="middle" x="90" y="94">21</text>
        <circle cx="230" cy="90" fill="#fff" r="14" strokeWidth="1.8" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="11" textAnchor="middle" x="230" y="94">84</text>
        <line strokeWidth="1.8" x1="148" x2="102" y1="42" y2="78" />
        <line strokeWidth="1.8" x1="172" x2="218" y1="42" y2="78" />
        <circle cx="55" cy="145" fill="#fff" r="12" strokeWidth="1.6" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="10" textAnchor="middle" x="55" y="149">14</text>
        <circle cx="125" cy="145" fill="#fff" r="12" strokeWidth="1.6" />
        <text fill="#1e293b" fontFamily="monospace" fontSize="10" textAnchor="middle" x="125" y="149">28</text>
        <line strokeWidth="1.6" x1="80" x2="62" y1="102" y2="135" />
        <line strokeWidth="1.6" x1="100" x2="118" y1="102" y2="135" />
      </svg>
    );
  }

  return (
    <div className="w-full max-w-[320px] font-mono text-[9.5px] sm:text-[10px] space-y-1.5 p-2.5 rounded-lg border border-stone-300/80 bg-stone-100/30">
      <div className="flex justify-between border-b border-stone-300 pb-1 font-bold text-neutral-800">
        <span>Evaluation Metric</span>
        <span>Score</span>
      </div>
      <div className="flex justify-between text-emerald-700 font-semibold">
        <span>Algorithmic Correctness</span>
        <span>4.0 / 4.0</span>
      </div>
      <div className="flex justify-between text-blue-700 font-semibold">
        <span>Space / Time Complexity</span>
        <span>3.0 / 3.0</span>
      </div>
      <div className="flex justify-between text-amber-700 font-semibold">
        <span>Boundary Case Handling</span>
        <span>3.0 / 3.0</span>
      </div>
      <div className="pt-1 border-t border-stone-300 flex justify-between font-bold text-[#13449b]">
        <span>TOTAL GRADE</span>
        <span>10 / 10 (A+)</span>
      </div>
    </div>
  );
}

// Left Notebook Page Component
function LeftNotebookPage({
  spread,
  pageNum,
  isTurningLeaf = false,
}: {
  spread: SpreadData;
  pageNum: number;
  isTurningLeaf?: boolean;
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 pr-4 sm:pr-8 select-none"
      style={{
        backgroundColor: '#fdfcf9',
        boxShadow: isTurningLeaf
          ? undefined
          : 'inset 0 0 35px rgba(0, 0, 0, 0.025), -4px 6px 12px -2px rgba(0,0,0,0.08), -2px 0 0 1px #e2dcce, -4px 0 0 2px #d8d0c0',
      }}
    >
      {/* Center spine gutter gradient on the right edge */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-14 spine-gutter-left z-10 pointer-events-none" />

      {/* Top Banner */}
      <div className="pl-3 sm:pl-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#13449b] font-bold">
          <span>{spread.leftPageSub}</span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500 font-medium">
          Pg {String(pageNum).padStart(2, '0')}
        </span>
      </div>

      {/* Center Architectural Diagram */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center pl-3 sm:pl-5 my-1 z-10">
        <h4 className="font-serif italic text-sm sm:text-base lg:text-lg font-bold tracking-wide text-slate-900 mb-2 transform -rotate-1 self-center">
          {spread.leftPageHeader}
        </h4>
        <SpreadDiagram type={spread.diagramType} />
      </div>

      {/* Bottom Footer */}
      <div className="pl-3 sm:pl-5 pt-1.5 border-t border-stone-300 flex items-center justify-between text-[10px] font-mono text-neutral-600 z-10">
        <span className="font-handwritten text-xs text-neutral-700 font-bold">
          Theory &amp; Visual Blueprint
        </span>
        <span className="font-handwritten text-xs text-neutral-500 font-medium">
          Page {String(pageNum).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

// Syntax Formatter for Natural Paper Code Rendering (Crisp Ink Typography)
function SyntaxCodeViewer({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <pre className="font-mono text-[11px] sm:text-[11.5px] leading-[22px] tracking-tight text-slate-900">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        // Comment Line
        if (
          trimmed.startsWith('//') ||
          trimmed.startsWith('/*') ||
          trimmed.startsWith('*') ||
          (trimmed.startsWith('#') && !trimmed.startsWith('#include') && !trimmed.startsWith('#define'))
        ) {
          return (
            <div key={i} className="text-slate-500 italic">
              {line}
            </div>
          );
        }

        // C / C++ Preprocessor Line (#include <...>)
        if (trimmed.startsWith('#include') || trimmed.startsWith('#define')) {
          const match = line.match(/^(\s*)(#include|#define)(\s+)(<[^>]+>|"[^"]+"|\w+)(.*)$/);
          if (match) {
            const [, indent, directive, space, target, rest] = match;
            return (
              <div key={i} className="text-slate-900">
                {indent}
                <span className="text-purple-800 font-bold">{directive}</span>
                {space}
                <span className="text-emerald-800 font-semibold">{target}</span>
                <span className="text-slate-900">{rest}</span>
              </div>
            );
          }
        }

        // Split tokens and style keywords with rich ink pigments
        const tokens = line.split(/(\s+|[(){}[\];,.<>:"'+=*/%#-])/);
        return (
          <div key={i} className="text-slate-900">
            {tokens.map((token, tIdx) => {
              if (
                /^(int|void|char|double|float|typedef|struct|class|def|import|return|if|else|sizeof|NULL|None|self|std|vector|printf|cout|__slots__|print)$/.test(
                  token
                )
              ) {
                return (
                  <span key={tIdx} className="text-[#13449b] font-bold">
                    {token}
                  </span>
                );
              }
              if (
                token.startsWith('"') ||
                token.startsWith("'") ||
                token.endsWith('"') ||
                token.endsWith("'")
              ) {
                return (
                  <span key={tIdx} className="text-emerald-800 font-semibold">
                    {token}
                  </span>
                );
              }
              if (/^(0x[0-9a-fA-F]+|\d+)$/.test(token)) {
                return (
                  <span key={tIdx} className="text-amber-800 font-semibold">
                    {token}
                  </span>
                );
              }
              if (token === '#include' || token === '#define') {
                return (
                  <span key={tIdx} className="text-purple-800 font-bold">
                    {token}
                  </span>
                );
              }
              if (token === '->' || token === '*' || token === '&' || token === '=') {
                return (
                  <span key={tIdx} className="text-[#13449b] font-bold">
                    {token}
                  </span>
                );
              }
              return <span key={tIdx} className="text-slate-900 font-normal">{token}</span>;
            })}
          </div>
        );
      })}
    </pre>
  );
}

// Right Notebook Page Component
function RightNotebookPage({
  spread,
  pageNum,
  isTurningLeaf = false,
}: {
  spread: SpreadData;
  pageNum: number;
  isTurningLeaf?: boolean;
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 pl-4 sm:pl-8 select-none"
      style={{
        backgroundColor: '#fdfcf9',
        boxShadow: isTurningLeaf
          ? undefined
          : 'inset 0 0 35px rgba(0, 0, 0, 0.025), 4px 6px 12px -2px rgba(0,0,0,0.08), 2px 0 0 1px #e2dcce, 4px 0 0 2px #d8d0c0',
      }}
    >
      {/* Center spine gutter gradient on the left edge */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-14 spine-gutter-right z-10 pointer-events-none" />

      {/* Section Header with Sleek Compiler Stamp Tag */}
      <header className="z-10 flex items-start justify-between pb-1.5 border-b border-stone-300">
        <div>
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#13449b] font-bold block mb-0.5">
            {spread.subTitle}
          </span>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight leading-[1.1] text-[#1c2434]">
            {spread.chapterTitle}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] font-mono font-bold tracking-tight ${spread.badgeColor} border border-current/25 shadow-2xs`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {spread.badgeText}
          </span>
          <span className="font-mono text-[9px] text-neutral-500 font-medium">
            Pg {String(pageNum).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Code Written Directly on Pristine Notebook Paper with Clear Syntax Styling */}
      <div className="relative w-full flex-1 my-1.5 overflow-x-auto select-text z-10 flex flex-col justify-center">
        <SyntaxCodeViewer code={spread.codeSnippet} />
      </div>

      {/* Bottom Footer */}
      <div className="pt-1.5 border-t border-stone-300 flex items-center justify-between text-[10px] font-mono text-neutral-600 z-10">
        <span className="text-[#13449b] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Standard Output: Verified ✓
        </span>
        <span className="font-handwritten text-xs text-neutral-500 font-medium">
          Page {String(pageNum).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export function TactileClayHero({ onEnter }: TactileClayHeroProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // --- Real 3D Physical Page Turn State (Matching PhysicalNotebookSpread.tsx) ---
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const currentSpreadIndexRef = useRef(0);
  const [targetSpreadIndex, setTargetSpreadIndex] = useState(1);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [turnProgress, setTurnProgress] = useState(0); // 0.0 -> 1.0
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const isTurningRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    currentSpreadIndexRef.current = currentSpreadIndex;
  }, [currentSpreadIndex]);

  // Trigger Fast & Smooth 3D Page Turn (900ms) - completely stable callback
  const triggerPageTurn = useCallback((direction: 'next' | 'prev' = 'next') => {
    if (isTurningRef.current) return;
    isTurningRef.current = true;

    const currentIdx = currentSpreadIndexRef.current;
    const nextIdx = direction === 'next'
      ? (currentIdx + 1) % SPREADS.length
      : (currentIdx - 1 + SPREADS.length) % SPREADS.length;

    setTargetSpreadIndex(nextIdx);
    setTurnDirection(direction);
    setIsTurning(true);
    setTurnProgress(0);

    // Audio page turn whisper effect safely
    try {
      notebookAudio.playPageTurn();
    } catch {
      // Audio autoplay policy fallback
    }

    // Fast, crisp, fluid duration: 900ms
    const duration = 900;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawP = Math.min(1, elapsed / duration);

      // Authentic cubic-bezier ease-in-out matching PhysicalNotebookSpread.tsx
      const p = rawP < 0.5
        ? 4 * rawP * rawP * rawP
        : 1 - Math.pow(-2 * rawP + 2, 3) / 2;

      setTurnProgress(p);

      if (rawP < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Complete flip: smoothly commit new spread index
        currentSpreadIndexRef.current = nextIdx;
        setCurrentSpreadIndex(nextIdx);
        setIsTurning(false);
        isTurningRef.current = false;
        setTurnProgress(0);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Autonomous Continuous Loop (Turns precisely every 3.0 seconds)
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      if (!isTurningRef.current) {
        triggerPageTurn('next');
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isAutoPlay, triggerPageTurn]);

  // Cleanup any lingering animation frame on unmount only
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isTurningRef.current = false;
    };
  }, []);

  // Mobile View Tab: Switch between Left (Diagram) and Right (Code) on small screens
  const [mobileTab, setMobileTab] = useState<'diagram' | 'code'>('diagram');

  // Active spread data
  const currentSpread = SPREADS[currentSpreadIndex];
  const nextSpread = SPREADS[targetSpreadIndex];

  // --- Spring Physics for Google/Clay Tactile Parallax ---
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 110, mass: 0.7 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  // Parallax transforms for the 3D Book stage
  const stageTiltX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const stageTiltY = useTransform(smoothX, [-0.5, 0.5], [-5.5, 5.5]);
  const stagePanX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const stagePanY = useTransform(smoothY, [-0.5, 0.5], [-7, 7]);

  // Floating props parallax (clay cubes & pen)
  const cube1X = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const cube1Y = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const penX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const penY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduce || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Device orientation / gyroscope support for mobile smoothness
  useEffect(() => {
    if (reduce) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 45, -0.5), 0.5);
        const y = Math.min(Math.max((e.beta - 45) / 45, -0.5), 0.5);
        rawMouseX.set(x);
        rawMouseY.set(y);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [reduce, rawMouseX, rawMouseY]);

  // Active preview tab on the overlapping card
  const [activeTab, setActiveTab] = useState<'compiler' | 'tracer' | 'vault'>('compiler');

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden select-none isolate bg-[#EEDDC9] dark:bg-[#15120E] transition-colors duration-300"
    >
      {/* Tabletop Scene Lighting (Radial Gradient Matching User Spec) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(circle at 45% 40%, #FBF5EB 0%, #ECDCC9 65%, #D8C3AD 100%)
          `,
        }}
      />

      {/* Dark Theme Desk Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at 45% 40%, #201B15 0%, #17130F 65%, #100D0A 100%)
          `,
        }}
      />

      {/* ============================================================== */}
      {/* 1. HERO HEADER: Clean Editorial Typography & CTAs               */}
      {/* ============================================================== */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8 text-center z-20">
        
        {/* Top Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13449b]/10 dark:bg-[#13449b]/25 border border-[#13449b]/25 text-[#13449b] dark:text-[#9DB8FF] text-xs font-mono font-bold tracking-tight mb-4 shadow-2xs cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#13449b] dark:text-[#9DB8FF]" />
          <span>LATEST: ZERO-OVERHEAD COMPILER &amp; TRACER</span>
          <ChevronRight className="w-3 h-3 opacity-70" />
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 dark:text-white tracking-tight leading-[1.06]"
        >
          Build systems to{' '}
          <span className="text-[#13449b] dark:text-[#9DB8FF] underline decoration-[#13449b]/30 underline-offset-8">
            master computer
          </span>{' '}
          science.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
        >
          A living tactile engineering notebook equipped with an in-browser compiler,
          step-by-step memory architecture tracer, and 100 student developer tools.
        </motion.p>

        {/* Dual CTAs (Royal Blue Tactile Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Dual CTAs (Normal Simple Clean Animations) */}
          <motion.button
            type="button"
            onClick={onEnter}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#13449b] hover:bg-[#0f3475] active:bg-[#0c2a5e] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-950/20 hover:shadow-lg hover:shadow-blue-950/30 transition-shadow cursor-pointer border border-blue-400/30"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Notebook Studio</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-850 px-6 py-3.5 text-sm font-bold text-neutral-800 dark:text-neutral-200 shadow-xs hover:shadow-md cursor-pointer backdrop-blur-md transition-shadow"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#13449b] dark:text-[#9DB8FF]" />
            <span>Explore Sandbox</span>
          </motion.a>
        </motion.div>

        {/* Micro-guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#13449b] dark:text-[#9DB8FF]" />
            <span>100% Free Forever</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#13449b] dark:text-[#9DB8FF]" />
            <span>Zero Sign-Up Required</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#13449b] dark:text-[#9DB8FF]" />
            <span>Runs Locally in Browser</span>
          </div>
          <span>·</span>
          <a
            href="https://github.com/harshlagwal/Code-Ink"
            target="_blank"
            rel="noopener noreferrer"
            title="Support CODEINK with a Star on GitHub"
            className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-[#13449b] dark:hover:text-[#9DB8FF] transition-colors group cursor-pointer font-semibold"
          >
            <span className="text-amber-500 font-bold">★</span>
            <span className="underline decoration-dotted underline-offset-4">Star on GitHub</span>
          </a>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 2. CENTER STAGE: The Autonomous 5-Spread Open Notebook Scene  */}
      {/* ============================================================== */}
      <div className="relative mx-auto max-w-5xl px-3 sm:px-6 pb-2 sm:pb-4 flex flex-col items-center justify-center z-20">
        
        {/* Static Tabletop Stage (Rock-solid, zero shaking/wobble for pure smoothness) */}
        <div className="relative w-full max-w-[940px] h-[440px] sm:h-[490px] lg:h-[520px] flex items-center justify-center">

          {/* --- Tactile Background Props (Clay Cubes & Metallic Pen) --- */}
          {/* Blue Clay Cube 1 (Top Right) */}
          <div
            style={{
              background: 'linear-gradient(145deg, #3d79f0 0%, #204db5 55%, #13337e 100%)',
              boxShadow: '-4px 6px 14px rgba(24, 52, 120, 0.45), inset 2px 2px 4px rgba(255, 255, 255, 0.35), inset -2px -3px 5px rgba(0, 0, 0, 0.35)',
              transform: 'rotate(18deg) skew(-4deg, 3deg)',
            }}
            className="hidden sm:block absolute -top-6 right-4 lg:right-6 w-12 h-12 rounded-xl pointer-events-none z-10"
          />

          {/* Blue Clay Cube 2 (Bottom Left) */}
          <div
            style={{
              background: 'linear-gradient(145deg, #4b86f8 0%, #295bcc 55%, #163d96 100%)',
              boxShadow: '4px 8px 18px rgba(24, 52, 120, 0.45), inset 2px 2px 5px rgba(255, 255, 255, 0.4), inset -2px -3px 5px rgba(0, 0, 0, 0.35)',
              transform: 'rotate(-24deg) skew(3deg, -3deg)',
            }}
            className="hidden sm:block absolute -bottom-4 left-4 lg:left-6 w-14 h-14 rounded-xl pointer-events-none z-30"
          />

          {/* Slender Metallic Stylus / Pen (Right Edge) */}
          <div
            style={{
              transform: 'rotate(12deg)',
            }}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-3.5 h-[340px] flex-col items-center pointer-events-none z-30 drop-shadow-xl"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #e2e8f0 0%, #ffffff 35%, #94a3b8 70%, #475569 100%)',
                boxShadow: 'inset 1px 0 1px rgba(255,255,255,0.8), -3px 5px 12px rgba(0,0,0,0.3)',
              }}
            >
              <div
                className="w-full h-8 mt-8"
                style={{
                  background: 'linear-gradient(to right, #ffd966 0%, #fff2cc 40%, #c49929 80%, #7f6000 100%)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
              <div className="w-1 h-12 bg-stone-300 rounded-b-full mx-auto mt-2" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE MASTER HARDCOVER OPEN NOTEBOOK (Slim Luxury Bezel)      */}
          {/* ============================================================ */}
          <div
            className="relative w-full h-full p-1 sm:p-1.5 rounded-xl sm:rounded-2xl perspective-book select-none"
            style={{
              filter: 'drop-shadow(0 30px 45px rgba(19, 68, 155, 0.20)) drop-shadow(0 12px 20px rgba(0, 0, 0, 0.16))',
            }}
          >
            {/* Friendly Undergraduate Student Mascot sitting on top-left corner */}
            <StudentMascot />
            {/* Hardcover Outer Blue Base (Slim & Elegant 5px Bezel) */}
            <div className="absolute -inset-1 sm:-inset-1.5 bg-[#13449b] rounded-xl sm:rounded-2xl shadow-xl flex justify-between overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              />

              {/* Polished Brass Corner Protectors (4 Slim Corners) */}
              <div
                className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #fae58d 0%, #c49929 45%, #ffd966 60%, #8c670a 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-7 h-7 sm:w-8 sm:h-8 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, #fae58d 0%, #c49929 45%, #ffd966 60%, #8c670a 100%)',
                  clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                }}
              />
              <div
                className="absolute top-0 right-0 w-7 h-7 sm:w-8 sm:h-8 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(225deg, #fae58d 0%, #c49929 45%, #ffd966 60%, #8c670a 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(315deg, #fae58d 0%, #c49929 45%, #ffd966 60%, #8c670a 100%)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  filter: 'drop-shadow(-1px 1px 2px rgba(0,0,0,0.3))',
                }}
              />
            </div>

            {/* Notebook Paper Body with Real 3D Turning Sheet Layer */}
            <div className="relative w-full h-full rounded-lg overflow-hidden flex bg-[#fbf9f5] z-10 transform-style-3d">
              
              {/* ======================================================== */}
              {/* DESKTOP VIEW: AUTHENTIC 2-PAGE SPREAD WITH 3D FLIP LEAF   */}
              {/* ======================================================== */}
              <div className="hidden md:flex relative w-full h-full transform-style-3d">
                
                {/* 1. LEFT BASE PAGE: Displays Current Spread Left Page */}
                <div className="w-1/2 h-full relative">
                  <LeftNotebookPage
                    spread={currentSpread}
                    pageNum={currentSpreadIndex * 2 + 1}
                  />

                  {/* Dynamic shadow cast on Left Page as the 3D sheet turns and approaches landing */}
                  {isTurning && turnDirection === 'next' && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-75 z-20"
                      style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
                        opacity: turnProgress > 0.45 ? Math.min(0.55, (turnProgress - 0.45) * 1.8) : 0,
                      }}
                    />
                  )}
                </div>

                {/* Center Spine Groove Line (Tactile center gutter crease) */}
                <div className="w-[3px] spine-center-groove shrink-0 relative z-30 pointer-events-none" />

                {/* 2. RIGHT BASE PAGE: Displays Next Spread (revealed as leaf lifts up!) */}
                <div className="w-1/2 h-full relative">
                  <RightNotebookPage
                    spread={isTurning && turnDirection === 'next' ? nextSpread : currentSpread}
                    pageNum={
                      (isTurning && turnDirection === 'next' ? targetSpreadIndex : currentSpreadIndex) * 2 + 2
                    }
                  />

                  {/* Soft lift-off shadow on the right page */}
                  {isTurning && turnDirection === 'next' && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-75 z-20"
                      style={{
                        background: 'linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
                        opacity: turnProgress < 0.6 ? (1 - turnProgress / 0.6) * 0.4 : 0,
                      }}
                    />
                  )}
                </div>

                {/* ====================================================== */}
                {/* 3. REAL 3D TURNING SHEET (Matching PhysicalNotebookSpread) */}
                {/* ====================================================== */}
                {isTurning && turnDirection === 'next' && (
                  <div
                    className="absolute top-0 bottom-0 right-0 w-1/2 transform-style-3d z-40 pointer-events-none"
                    style={{
                      transformOrigin: 'left center',
                      transform: `rotateY(${-180 * turnProgress}deg) skewY(${Math.sin(turnProgress * Math.PI) * -2}deg) scale(${1 - Math.sin(turnProgress * Math.PI) * 0.025})`,
                      transition: 'none',
                    }}
                  >
                    {/* FRONT SIDE of turning leaf: Current spread's RIGHT page */}
                    <div
                      className="absolute inset-0 backface-hidden overflow-hidden flex flex-col justify-between border-l border-stone-300"
                      style={{
                        boxShadow: `${Math.sin(turnProgress * Math.PI) * -30}px 18px 40px rgba(19, 68, 155, 0.32)`,
                      }}
                    >
                      <RightNotebookPage
                        spread={currentSpread}
                        pageNum={currentSpreadIndex * 2 + 2}
                        isTurningLeaf
                      />

                      {/* Moving light/shadow gradient across front face during flip */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
                          opacity: Math.sin(turnProgress * Math.PI) * 0.45,
                        }}
                      />
                    </div>

                    {/* BACK SIDE of turning leaf: Next spread's LEFT page */}
                    <div
                      className="absolute inset-0 backface-hidden overflow-hidden flex flex-col justify-between border-r border-stone-300"
                      style={{
                        transform: 'rotateY(180deg)',
                        boxShadow: `${Math.sin(turnProgress * Math.PI) * 30}px 18px 40px rgba(19, 68, 155, 0.32)`,
                      }}
                    >
                      <LeftNotebookPage
                        spread={nextSpread}
                        pageNum={targetSpreadIndex * 2 + 1}
                        isTurningLeaf
                      />

                      {/* Moving light/shadow gradient across back face as it lands */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
                          opacity: Math.sin(turnProgress * Math.PI) * 0.35,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* PREVIOUS SPREAD 3D TURNING SHEET (When navigating backward) */}
                {isTurning && turnDirection === 'prev' && (
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1/2 transform-style-3d z-40 pointer-events-none"
                    style={{
                      transformOrigin: 'right center',
                      transform: `rotateY(${180 * turnProgress}deg) skewY(${Math.sin(turnProgress * Math.PI) * 2}deg) scale(${1 - Math.sin(turnProgress * Math.PI) * 0.025})`,
                      transition: 'none',
                    }}
                  >
                    {/* FRONT SIDE (Current left page lifting up) */}
                    <div
                      className="absolute inset-0 backface-hidden overflow-hidden flex flex-col justify-between border-r border-stone-300"
                      style={{
                        boxShadow: `${Math.sin(turnProgress * Math.PI) * 30}px 18px 40px rgba(19, 68, 155, 0.32)`,
                      }}
                    >
                      <LeftNotebookPage
                        spread={currentSpread}
                        pageNum={currentSpreadIndex * 2 + 1}
                        isTurningLeaf
                      />
                    </div>

                    {/* BACK SIDE (Target previous right page settling down) */}
                    <div
                      className="absolute inset-0 backface-hidden overflow-hidden flex flex-col justify-between border-l border-stone-300"
                      style={{
                        transform: 'rotateY(180deg)',
                        boxShadow: `${Math.sin(turnProgress * Math.PI) * -30}px 18px 40px rgba(19, 68, 155, 0.32)`,
                      }}
                    >
                      <RightNotebookPage
                        spread={nextSpread}
                        pageNum={targetSpreadIndex * 2 + 2}
                        isTurningLeaf
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* ======================================================== */}
              {/* MOBILE VIEW: CRISP SINGLE-PAGE FOLIO WITH FLUID TABS     */}
              {/* ======================================================== */}
              <div className="flex md:hidden relative w-full h-full flex-col">
                
                {/* Mobile Tab Switcher */}
                <div className="shrink-0 flex items-center justify-between px-3 py-1.5 bg-[#f0ebd9] border-b border-stone-200 text-xs z-20">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => setMobileTab('diagram')}
                      className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                        mobileTab === 'diagram'
                          ? 'bg-[#13449b] text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Architecture
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab('code')}
                      className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                        mobileTab === 'code'
                          ? 'bg-[#13449b] text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Code &amp; Output
                    </button>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500">
                    Pg {mobileTab === 'diagram' ? currentSpreadIndex * 2 + 1 : currentSpreadIndex * 2 + 2}
                  </span>
                </div>

                {/* Mobile Active Page Content */}
                <div className="relative flex-1 w-full overflow-hidden">
                  {mobileTab === 'diagram' ? (
                    <LeftNotebookPage
                      spread={currentSpread}
                      pageNum={currentSpreadIndex * 2 + 1}
                    />
                  ) : (
                    <RightNotebookPage
                      spread={currentSpread}
                      pageNum={currentSpreadIndex * 2 + 2}
                    />
                  )}
                </div>
              </div>

            </div>

            {/* ============================================================ */}
            {/* CENTER RIBBON BOOKMARK: Draping Blue Satin Ribbon             */}
            {/* ============================================================ */}
            <div className="hidden md:flex absolute left-1/2 -top-2 -bottom-10 w-7 -translate-x-1/2 z-40 pointer-events-none flex-col items-center">
              <div className="w-6 h-5 bg-[#1b5edb] rounded-t-sm shadow-md" />
              <div className="w-5 h-full bg-gradient-to-r from-[#1752c4] via-[#3d83ff] to-[#1245a8] shadow-lg flex-1 relative">
                <div className="absolute -bottom-4 left-0 w-full overflow-hidden leading-none">
                  <svg className="w-5 h-4 drop-shadow" fill="#1b5edb" viewBox="0 0 20 16">
                    <polygon points="0,0 20,0 10,12" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. THE OVERLAPPING CURVED CANVAS ISLAND (Clay.com Signature)     */}
      {/* ============================================================== */}
      <div className="relative z-30 -mt-8 sm:-mt-14 lg:-mt-16 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="rounded-t-[32px] sm:rounded-t-[44px] bg-white dark:bg-[#1E232A] border-t border-x border-neutral-200/90 dark:border-neutral-800 shadow-2xl shadow-blue-950/10 dark:shadow-black/60 p-6 sm:p-10 transition-colors duration-300">
          
          {/* Overlapping Island Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#13449b] dark:text-[#9DB8FF] font-bold block mb-2">
              Integrated Engineering Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Engineered for curious minds and top grades.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Select any capability below to explore how Code Ink unifies compiler runtime, architectural tracers, and exam papers into a single physical notebook spread.
            </p>

            {/* Interactive Capability Switcher Tabs */}
            <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80">
              <button
                type="button"
                onClick={() => setActiveTab('compiler')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'compiler'
                    ? 'bg-white dark:bg-neutral-700 text-[#13449b] dark:text-[#9DB8FF] shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Compiler Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tracer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'tracer'
                    ? 'bg-white dark:bg-neutral-700 text-[#13449b] dark:text-[#9DB8FF] shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Memory Tracer</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('vault')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'vault'
                    ? 'bg-white dark:bg-neutral-700 text-[#13449b] dark:text-[#9DB8FF] shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Exam Vault &amp; Tools</span>
              </button>
            </div>
          </div>

          {/* Dynamic Tab Content Preview Bento Card */}
          <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
            {activeTab === 'compiler' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#13449b] dark:text-[#9DB8FF] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#13449b]" />
                    <span>In-Browser GCC 13 &amp; Python 3.12 Engine</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Execute code with zero remote server lag.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Test your algorithms alongside notes on the same notebook page. No terminal configuration, no account creation, instant standard I/O feedback.
                  </p>
                </div>
                <div className="flex justify-start md:justify-end">
                  <button
                    type="button"
                    onClick={onEnter}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13449b] text-white text-xs font-bold hover:bg-[#0f3475] transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Launch Compiler</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'tracer' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#13449b] dark:text-[#9DB8FF] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#13449b]" />
                    <span>Live Stack, Heap &amp; Register Visualization</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Watch pointers and stack frames mutate step-by-step.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Deconstruct malloc allocations, linked list pointer re-assignments, and recursive call frames in real time without cognitive guesswork.
                  </p>
                </div>
                <div className="flex justify-start md:justify-end">
                  <button
                    type="button"
                    onClick={onEnter}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13449b] text-white text-xs font-bold hover:bg-[#0f3475] transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Inspect Memory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'vault' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#13449b] dark:text-[#9DB8FF] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#13449b]" />
                    <span>18 Complete University Exam Papers</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Official past exam papers with step-by-step model solutions.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Practice with authentic university end-semester questions across DSA, C, C++, and Python with verified marking keys.
                  </p>
                </div>
                <div className="flex justify-start md:justify-end">
                  <button
                    type="button"
                    onClick={onEnter}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13449b] text-white text-xs font-bold hover:bg-[#0f3475] transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Browse Exam Vault</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
