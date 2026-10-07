import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { subjectCards } from '../../data/landingStats';
import { fadeUp, fade, stagger } from '../../motion/variants';

interface SubjectsShowcaseProps {
  onEnter: (subjectId?: string) => void;
}

const LANGUAGE_META: Record<
  string,
  { code: string; label: string; color: string; badge: string }
> = {
  c: {
    code: 'int *ptr = &memory; // Direct Hardware Access',
    label: 'Systems & Kernels',
    color: '#2457D6',
    badge: 'C11 / C17',
  },
  cpp: {
    code: 'template <typename T> class Vector { ... };',
    label: 'Zero-Cost STL & RAII',
    color: '#0284C7',
    badge: 'C++20 STL',
  },
  python: {
    code: '[x**2 for x in data if x % 2 == 0]',
    label: 'List Comprehension & OOP',
    color: '#2563EB',
    badge: 'Python 3.12',
  },
  javascript: {
    code: 'const res = await fetch("/api/notebook");',
    label: 'Event Loop & Promises',
    color: '#D97706',
    badge: 'ESNext Runtimes',
  },
  java: {
    code: 'public record Node<T>(T val, Node<T> next) {}',
    label: 'JVM & Modern OOP',
    color: '#DC2626',
    badge: 'Java 21 LTS',
  },
  dsa: {
    code: 'T: O(log N) · S: O(1) // AVL & Graph Traversal',
    label: 'Algorithms & Complexity',
    color: '#059669',
    badge: 'Big-O Analysis',
  },
  dbms: {
    code: 'SELECT e.name FROM emps e JOIN depts d ON e.dept_id = d.id;',
    label: 'Relational Engines & ACID',
    color: '#0284C7',
    badge: 'SQL:2023 / Relational',
  },
  os: {
    code: 'pid_t pid = fork(); if (pid == 0) execvp(...);',
    label: 'Kernel Primitives & Concurrency',
    color: '#059669',
    badge: '30 Deep Chapters',
  },
};

export function SubjectsShowcase({ onEnter }: SubjectsShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="subjects"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 select-none border-t border-line/60"
    >
      {/* Section header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
      >
        <div className="max-w-xl">
          <motion.span
            variants={fade}
            className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3"
          >
            Curriculum Architecture
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight"
          >
            Eight comprehensive volumes,{' '}
            <span className="text-muted font-normal">documented from first principles.</span>
          </motion.h2>
        </div>

        <motion.button
          variants={fade}
          type="button"
          onClick={() => onEnter()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-raised border border-line hover:border-accent text-xs font-mono font-bold text-ink hover:text-accent self-start sm:self-auto transition-all shadow-2xs cursor-pointer group shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Open Full Curriculum Index</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Interactive Liquid Glider Container */}
      <motion.div
        variants={stagger(0.08, 0.03)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        onMouseLeave={() => setHoveredId(null)}
        className="relative flex flex-col gap-2"
      >
        {subjectCards.map((sub, idx) => {
          const isHovered = hoveredId === sub.id;
          const meta = LANGUAGE_META[sub.id] || {
            code: '// Computational Notebook',
            label: 'Core Architecture',
            color: '#2457D6',
            badge: 'Standard',
          };

          return (
            <motion.div
              key={sub.id}
              variants={fadeUp}
              onMouseEnter={() => setHoveredId(sub.id)}
              onClick={() => onEnter(sub.id)}
              className="relative group p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200"
            >
              {/* Shared Liquid Glider Backdrop (Apple / macOS dock style) */}
              {isHovered && !reduce && (
                <motion.div
                  layoutId="subjectGlider"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="absolute inset-0 rounded-2xl bg-raised border border-line shadow-lg shadow-black/5 dark:shadow-black/40 pointer-events-none -z-10"
                />
              )}

              {/* Dynamic Brand Color Aurora Glow on Hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 -z-10"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(700px circle at left center, ${meta.color}14, transparent 75%)`,
                }}
              />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Number, Embossed Stamp & Title */}
                <div className="flex items-center gap-3.5 sm:gap-5 min-w-0 lg:w-4/12">
                  <span className="font-mono text-xs font-bold text-muted w-6 shrink-0">
                    0{idx + 1}
                  </span>

                  {/* Stamp Badge with Dynamic Brand Hue */}
                  <div
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border transition-all duration-300 shrink-0"
                    style={{
                      borderColor: isHovered ? meta.color : 'var(--border-hairline)',
                      backgroundColor: isHovered ? `${meta.color}15` : 'var(--surface-page)',
                      color: isHovered ? meta.color : 'var(--text-primary)',
                    }}
                  >
                    {sub.shortCode}
                  </div>

                  <div className="truncate">
                    <h3 className="text-base sm:text-lg font-bold text-ink transition-colors truncate">
                      {sub.name}
                    </h3>
                    <span className="text-[11px] font-mono text-muted block sm:hidden">
                      {sub.topics} Pages · {sub.chapters} Ch
                    </span>
                  </div>
                </div>

                {/* Middle: Signature Live Code Peek (Instant Developer Hook) */}
                <div className="hidden lg:flex items-center gap-3 lg:w-5/12">
                  <div
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-line/60 bg-code font-mono text-[11px] text-ink/80 transition-all duration-300"
                    style={{
                      borderColor: isHovered ? `${meta.color}50` : undefined,
                    }}
                  >
                    <Terminal
                      className="w-3.5 h-3.5 shrink-0 transition-colors"
                      style={{ color: isHovered ? meta.color : 'var(--text-secondary)' }}
                    />
                    <span className="truncate">{meta.code}</span>
                    <span
                      className="ml-auto text-[10px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: isHovered ? `${meta.color}20` : 'transparent',
                        color: isHovered ? meta.color : 'var(--text-secondary)',
                      }}
                    >
                      {meta.badge}
                    </span>
                  </div>
                </div>

                {/* Right: Stats & Magnetic Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-6 text-xs font-mono text-muted shrink-0 lg:w-3/12">
                  <span className="hidden sm:inline">
                    {sub.topics} Pages · {sub.chapters} Chapters
                  </span>
                  <div
                    className="flex items-center gap-1.5 font-bold transition-all duration-200"
                    style={{ color: isHovered ? meta.color : undefined }}
                  >
                    <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                      Explore
                    </span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1.5"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
