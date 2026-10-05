import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Terminal, Cpu, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface ArchitecturalInkTreeProps {
  onEnter: () => void;
}

interface BranchItem {
  id: string;
  num: string;
  name: string;
  subtext: string;
  color: string;
  icon: typeof Terminal;
}

const BRANCHES: BranchItem[] = [
  {
    id: 'c',
    num: '01',
    name: 'C Programming',
    subtext: 'Hardware Pointers & Kernels',
    color: '#2457D6',
    icon: Cpu,
  },
  {
    id: 'cpp',
    num: '02',
    name: 'C++',
    subtext: 'Zero-Cost STL & Performance',
    color: '#0284C7',
    icon: Terminal,
  },
  {
    id: 'python',
    num: '03',
    name: 'Python',
    subtext: 'Dynamic Memory & Data Science',
    color: '#2563EB',
    icon: Layers,
  },
  {
    id: 'javascript',
    num: '04',
    name: 'JavaScript',
    subtext: 'V8 Engine & Event Loop',
    color: '#D97706',
    icon: Sparkles,
  },
];

export function ArchitecturalInkTree({ onEnter }: ArchitecturalInkTreeProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 my-10 sm:my-14 select-none">
      {/* 1. Root Node: CODEINK COMPUTATIONAL KERNEL */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={reduce ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-raised border border-line shadow-lg shadow-black/5 dark:shadow-black/30 font-mono text-xs font-bold text-ink"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="tracking-widest uppercase">CODEINK KERNEL</span>
          <span className="text-muted">·</span>
          <span className="text-[10px] text-muted font-normal">ROOT ARCHITECTURE</span>
        </motion.div>
      </div>

      {/* 2. SVG Architectural Ink Schematic (Trunk & 4 Branching Lines) */}
      <div className="relative w-full h-16 sm:h-20 -my-1 pointer-events-none hidden md:block">
        <svg viewBox="0 0 800 80" className="w-full h-full overflow-visible" fill="none">
          <defs>
            {/* Liquid ink flowing gradient pulse */}
            <linearGradient id="inkPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Central Vertical Stem */}
          <line
            x1="400"
            y1="0"
            x2="400"
            y2="30"
            stroke="var(--border-hairline)"
            strokeWidth="2"
          />

          {/* Central Trunk Glowing Pulse */}
          {!reduce && (
            <motion.line
              x1="400"
              y1="0"
              x2="400"
              y2="30"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
          )}

          {/* Branch 1: to [01] C (x: 100) */}
          <path
            d="M 400 30 Q 400 55, 300 55 L 100 55 L 100 80"
            stroke={hoveredId === 'c' ? '#2457D6' : 'var(--border-hairline)'}
            strokeWidth={hoveredId === 'c' ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />

          {/* Branch 2: to [02] C++ (x: 300) */}
          <path
            d="M 400 30 Q 400 55, 350 55 L 300 55 L 300 80"
            stroke={hoveredId === 'cpp' ? '#0284C7' : 'var(--border-hairline)'}
            strokeWidth={hoveredId === 'cpp' ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />

          {/* Branch 3: to [03] Python (x: 500) */}
          <path
            d="M 400 30 Q 400 55, 450 55 L 500 55 L 500 80"
            stroke={hoveredId === 'python' ? '#2563EB' : 'var(--border-hairline)'}
            strokeWidth={hoveredId === 'python' ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />

          {/* Branch 4: to [04] JavaScript (x: 700) */}
          <path
            d="M 400 30 Q 400 55, 500 55 L 700 55 L 700 80"
            stroke={hoveredId === 'javascript' ? '#D97706' : 'var(--border-hairline)'}
            strokeWidth={hoveredId === 'javascript' ? '2.5' : '1.5'}
            className="transition-colors duration-300"
          />

          {/* Continuous Flowing Ink Energy Particles along branches */}
          {!reduce && (
            <>
              <motion.circle
                r="3"
                fill="var(--accent)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                style={{
                  offsetPath: 'path("M 400 30 Q 400 55, 300 55 L 100 55 L 100 80")',
                }}
              />
              <motion.circle
                r="3"
                fill="var(--accent)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                style={{
                  offsetPath: 'path("M 400 30 Q 400 55, 350 55 L 300 55 L 300 80")',
                }}
              />
              <motion.circle
                r="3"
                fill="var(--accent)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                style={{
                  offsetPath: 'path("M 400 30 Q 400 55, 450 55 L 500 55 L 500 80")',
                }}
              />
              <motion.circle
                r="3"
                fill="var(--accent)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                  delay: 1.0,
                }}
                style={{
                  offsetPath: 'path("M 400 30 Q 400 55, 500 55 L 700 55 L 700 80")',
                }}
              />
            </>
          )}
        </svg>
      </div>

      {/* 3. The 4 Language Branches: [01], [02], [03], [04] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10 mt-3 md:mt-0">
        {BRANCHES.map((b) => {
          const Icon = b.icon;
          const isHovered = hoveredId === b.id;

          return (
            <motion.div
              key={b.id}
              onMouseEnter={() => setHoveredId(b.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={onEnter}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group bg-raised/85 backdrop-blur-md ${
                isHovered
                  ? 'border-accent shadow-xl shadow-black/5 dark:shadow-black/40 -translate-y-1'
                  : 'border-line hover:border-line/90 shadow-sm'
              }`}
            >
              {/* Dynamic Brand Color Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(220px circle at center, ${b.color}15, transparent 80%)`,
                }}
              />

              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono text-xs font-extrabold px-2 py-0.5 rounded border transition-colors"
                  style={{
                    borderColor: isHovered ? b.color : 'var(--border-hairline)',
                    color: isHovered ? b.color : 'var(--text-secondary)',
                    backgroundColor: isHovered ? `${b.color}15` : 'transparent',
                  }}
                >
                  {b.num}
                </span>

                <div className="flex items-center gap-1 text-[10px] font-mono text-muted group-hover:text-accent transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: isHovered ? b.color : 'var(--text-primary)' }}
                />
                <h3 className="font-bold text-sm text-ink group-hover:text-accent transition-colors">
                  {b.name}
                </h3>
              </div>

              <p className="text-[11px] font-mono text-muted leading-tight truncate">
                {b.subtext}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
