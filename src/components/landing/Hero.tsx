import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Sparkles, BookOpen } from 'lucide-react';
import { fadeUp, fade, stagger } from '../../motion/variants';
import { MagneticButton } from './MagneticButton';
import { LivingInkHeadline } from './LivingInkHeadline';
import { ArchitecturalInkTree } from './ArchitecturalInkTree';

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id="top"
      variants={stagger(0.08, 0.04)}
      initial={reduce ? false : 'hidden'}
      animate="show"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-12 text-center select-none"
    >
      {/* Background Engineering Blueprint Grid & Coordinate Markers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, var(--accent) 0.8px, transparent 0.8px),
            linear-gradient(to right, var(--border-hairline) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-hairline) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 120px 120px, 120px 120px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[480px] bg-accent/8 dark:bg-accent/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Content Column */}
      <div className="max-w-4xl mx-auto">
        {/* Top Eyebrow Pill */}
        <motion.div
          variants={fade}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-raised border border-line text-ink text-xs font-mono mb-6 sm:mb-8 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="font-semibold">Engineering Notebook &amp; Developer Workbench</span>
          <span className="text-muted">·</span>
          <span className="text-accent font-bold">100% Free</span>
        </motion.div>

        {/* 1. Living Ink Fountain Pen Handwriting Reveal on Refresh */}
        <LivingInkHeadline />

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          A tactile ruled engineering notebook equipped with a live multi-language compiler,
          step-by-step memory architecture tracer, AI study companion, and 100 student
          developer tools.
        </motion.p>

        {/* CTAs with Magnetic Spring Pull */}
        <motion.div
          variants={fadeUp}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2457D6] hover:bg-blue-700 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Notebook Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.18}>
            <a
              href="#video"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised hover:bg-page hover:border-accent hover:text-accent px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold text-ink transition-all shadow-2xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Launch Film</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* 2. Architectural Ink Schematic Tree: CODEINK -> Branches 01, 02, 03, 04 */}
        <ArchitecturalInkTree onEnter={onEnter} />

        {/* 3. Unified Engineering Specs Ribbon */}
        <motion.div
          variants={fadeUp}
          className="mt-6 sm:mt-8 max-w-4xl mx-auto rounded-2xl border border-line/80 bg-raised/75 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line/70 text-left">
            {/* Col 1: Curriculum Core */}
            <div className="p-3.5 sm:p-4 hover:bg-raised/80 transition-colors">
              <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider block mb-1">
                01 / Curriculum
              </span>
              <div className="text-xs sm:text-sm font-bold text-ink truncate mb-1">
                8 Core Volumes
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                <span className="inline-flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="truncate">180+ Ch · C to OS</span>
              </div>
            </div>

            {/* Col 2: Runtime Engine */}
            <div className="p-3.5 sm:p-4 hover:bg-raised/80 transition-colors">
              <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider block mb-1">
                02 / Compilation
              </span>
              <div className="text-xs sm:text-sm font-bold text-ink truncate mb-1">
                GCC 13 &amp; Python 3.12
              </div>
              <div className="text-[11px] font-mono text-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>0ms Client Sandbox</span>
              </div>
            </div>

            {/* Col 3: Exam Vault */}
            <div className="p-3.5 sm:p-4 hover:bg-raised/80 transition-colors">
              <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider block mb-1">
                03 / Exam Vault
              </span>
              <div className="text-xs sm:text-sm font-bold text-ink truncate mb-1">
                18 University Papers
              </div>
              <div className="text-[11px] font-mono text-muted truncate">
                Official Rubrics Included
              </div>
            </div>

            {/* Col 4: Student Workbench */}
            <div className="p-3.5 sm:p-4 hover:bg-raised/80 transition-colors">
              <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider block mb-1">
                04 / Workbench
              </span>
              <div className="text-xs sm:text-sm font-bold text-accent truncate mb-1">
                100 Developer Tools
              </div>
              <div className="text-[11px] font-mono text-muted truncate">
                100% Free · Zero Sign-Up
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
