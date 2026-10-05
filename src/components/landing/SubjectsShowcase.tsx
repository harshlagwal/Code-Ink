import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { subjectCards } from '../../data/landingStats';
import { fadeUp, fade, slideInLeft, stagger, lineReveal } from '../../motion/variants';

interface SubjectsShowcaseProps {
  onEnter: () => void;
}

export function SubjectsShowcase({ onEnter }: SubjectsShowcaseProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="subjects"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 select-none border-t border-line/60"
    >
      {/* Section header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16"
      >
        <div className="max-w-xl">
          <motion.span variants={fade} className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3">
            Curriculum Architecture
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Six foundational volumes,{' '}
            <span className="text-muted font-normal">documented from first principles.</span>
          </motion.h2>
        </div>

        <motion.button
          variants={fade}
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent hover:underline self-start sm:self-auto cursor-pointer shrink-0"
        >
          <span>Open Full Curriculum Index</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>

      {/* Row list with slide-in-left stagger */}
      <motion.div
        variants={stagger(0.1, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="divide-y divide-line/70"
      >
        {subjectCards.map((sub, idx) => (
          <motion.div
            key={sub.id}
            variants={slideInLeft}
            onClick={onEnter}
            className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-raised/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl cursor-pointer"
          >
            {/* Left: Code & Title */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0 md:w-2/5">
              <span className="font-mono text-xs font-bold text-muted w-8 shrink-0">
                0{idx + 1}
              </span>
              <div className="font-mono text-xs font-bold text-ink px-2 py-0.5 rounded border border-line bg-page shrink-0">
                {sub.shortCode}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors truncate">
                {sub.name}
              </h3>
            </div>

            {/* Middle: Tagline */}
            <p className="text-xs sm:text-sm text-muted leading-relaxed md:w-2/5 font-sans">
              {sub.tagline}
            </p>

            {/* Right: Stats & Arrow */}
            <div className="flex items-center justify-between md:justify-end gap-6 text-xs font-mono text-muted shrink-0 md:w-1/5">
              <span>{sub.topics} Pages · {sub.chapters} Ch</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
