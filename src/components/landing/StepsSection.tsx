import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, fade, stagger, lineReveal } from '../../motion/variants';

const STEPS = [
  {
    number: '01',
    title: 'Select a volume and open ruled paper',
    description:
      'Choose from C, C++, Python, JavaScript, Java, or DSA. Read clearly written theoretical definitions with authentic handwritten annotations in the margins.',
  },
  {
    number: '02',
    title: 'Compile and inspect hardware state',
    description:
      'Run snippets in the margin compiler with custom stdin. Step through execution tables to observe stack frames, heap addresses, and variable state in real time.',
  },
  {
    number: '03',
    title: 'Evaluate retention with real exams',
    description:
      'Solve practice exercises, test your timing against authentic 50-mark question papers, and monitor weak areas using the deterministic needs-revision telemetry ledger.',
  },
];

export function StepsSection({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 select-none border-t border-line/60"
    >
      {/* Section header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-xl mb-14 sm:mb-16"
      >
        <motion.span variants={fade} className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3">
          Methodology
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
          How mastery is built in CODEINK.
        </motion.h2>
        <motion.div variants={lineReveal} className="mt-4 h-px bg-line w-full" />
      </motion.div>

      {/* 3-Column Steps with independent stagger */}
      <motion.div
        variants={stagger(0.14, 0.06)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16"
      >
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.number}
            variants={fadeUp}
            className="flex flex-col items-start text-left"
          >
            {/* Phase header with sweep underline */}
            <div className="font-mono text-xs font-bold text-muted mb-5 w-full relative">
              <div className="flex items-center justify-between pb-2.5 border-b border-line">
                <span>PHASE {step.number}</span>
                <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Active</span>
              </div>
              {/* Accent underline on the phase bar */}
              <motion.div
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, delay: idx * 0.14 + 0.2, ease: [0.22, 1, 0.36, 1] } } }}
                className="absolute bottom-0 left-0 h-px w-full bg-accent origin-left"
              />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-ink leading-snug tracking-tight mb-3">
              {step.title}
            </h3>

            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
