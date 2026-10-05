import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { fadeUp, fade, stagger, slideInRight } from '../../motion/variants';

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id="top"
      variants={stagger(0.1, 0.06)}
      initial={reduce ? false : 'hidden'}
      animate="show"
      className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-28 pb-20 sm:pb-28 text-center select-none"
    >
      {/* Subtle radial glow — not animated so it doesn't distract */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[600px] h-[380px] sm:h-[500px] bg-accent/6 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Top eyebrow pill — first to appear */}
      <motion.div
        variants={fade}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-raised border border-line text-ink text-xs font-mono mb-8 shadow-2xs"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span className="font-semibold">Engineering Notebook &amp; Developer Workbench</span>
        <span className="text-muted">·</span>
        <span className="text-accent font-bold">100% Free</span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={fadeUp}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.08]"
      >
        Master Computer Science,{' '}
        <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
          one page at a time.
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        variants={fadeUp}
        className="mt-6 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
      >
        A tactile ruled engineering notebook equipped with a live multi-language compiler,
        step-by-step memory architecture tracer, AI study companion, and 100 student
        developer tools.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2457D6] hover:bg-blue-700 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Notebook Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="#video"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised hover:bg-page hover:border-accent hover:text-accent px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold text-ink transition-all shadow-2xs cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Watch Launch Film</span>
        </a>
      </motion.div>

      {/* Trust badges strip */}
      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-muted">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-handwritten text-lg sm:text-xl text-ink">
            free forever · zero sign-up · runs entirely in browser
          </span>
        </div>
      </motion.div>

      {/* Decorative scroll hint */}
      <motion.div
        variants={slideInRight}
        className="mt-12 hidden sm:flex items-center justify-center gap-2 text-[11px] font-mono text-muted"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block w-px h-6 bg-gradient-to-b from-muted/60 to-transparent mx-auto"
        />
        <span className="tracking-wider uppercase">scroll to explore</span>
      </motion.div>
    </motion.section>
  );
}
