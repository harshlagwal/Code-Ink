import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, fade, stagger, lineReveal } from '../../motion/variants';

const CAPABILITIES = [
  {
    iconType: 'code',
    headline: 'In-browser compiler surface for immediate margin execution',
    description:
      'Run C, C++, Java, Python, and JavaScript directly inside the notebook. Experiment with custom stdin inputs, instant compilation, and live terminal output with zero cloud delay.',
  },
  {
    iconType: 'memory',
    headline: 'Visual execution diagrams for call stacks and heap pointers',
    description:
      'Gain a complete understanding of program state at the hardware level. Watch stack frames allocate, track heap memory addresses, and trace pointer dereferencing step by step.',
  },
  {
    iconType: 'tools',
    headline: 'Curated directory of 100 free developer tools and student tiers',
    description:
      'Discover verified free services across AI inference, cloud hosting, managed databases, modern IDEs, and APIs—complete with exact free allowance limits and student perks.',
  },
  {
    iconType: 'ai',
    headline: 'Integrated AI Study Desk for conceptual mastery and code review',
    description:
      'Connect Gemini 1.5 or OpenRouter models using your own free API key stored locally. Ask deep architectural questions, unpack memory traps, and debug tricky syntax.',
  },
  {
    iconType: 'paper',
    headline: 'Authentic 50-mark semester and midterm university papers',
    description:
      'Practice against 18 comprehensive question paper sets across all 6 core subjects, accompanied by exact time allocations, question choices, and full marking rubrics.',
  },
  {
    iconType: 'notebook',
    headline: 'Tactile ruled paper notebook with highlighters and audio speech',
    description:
      'Experience a distraction-free physical engineering diary. Annotate margins, stick custom notes, save bookmarks, and listen to complete chapters hands-free with clear audio.',
  },
];

function EngineeringIcon({ type }: { type: string }) {
  if (type === 'code') {
    return (
      <div className="w-9 h-9 rounded-md border-[1.5px] border-ink flex items-center justify-center font-mono text-xs font-bold text-ink mb-6 tracking-tighter">
        <span>&lt;&nbsp;&gt;</span>
      </div>
    );
  }

  if (type === 'memory') {
    return (
      <div className="relative w-9 h-9 mb-6">
        <div className="absolute left-0 bottom-0 w-6 h-6 rounded-md border-[1.5px] border-ink" />
        <div className="absolute right-1 top-0 w-6 h-6 rounded-md border-[1.5px] border-ink bg-app" />
        <svg
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-ink fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
    );
  }

  if (type === 'tools') {
    return (
      <div className="w-9 h-9 mb-6 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-ink stroke-[1.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3v6" />
          <path d="M18 3v6" />
          <path d="M6 9a6 6 0 0 0 12 0" />
          <path d="M12 15v6" />
          <polyline points="9 18 12 21 15 18" />
        </svg>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="w-9 h-9 mb-6 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-ink stroke-[1.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
          <path d="M8 15h8" />
        </svg>
      </div>
    );
  }

  if (type === 'paper') {
    return (
      <div className="w-9 h-9 mb-6 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-ink stroke-[1.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-9 h-9 mb-6 flex items-center justify-center">
      <svg
        className="w-7 h-7 text-ink stroke-[1.5]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </div>
  );
}

export function FeatureGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 select-none border-t border-line/60"
    >
      {/* Animated section header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-2xl mb-16 sm:mb-20"
      >
        <motion.span variants={fade} className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3">
          Capabilities
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
          Engineered for depth, clarity, and true comprehension.
        </motion.h2>
        <motion.div variants={lineReveal} className="mt-5 h-px bg-line w-full" />
        <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted mt-5 leading-relaxed">
          No superficial summaries or fluff. Every tool and page is tailored to give you an
          intuitive, tactile grasp of modern computer science.
        </motion.p>
      </motion.div>

      {/* Feature columns with cascading stagger */}
      <motion.div
        variants={stagger(0.1, 0.05)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 sm:gap-y-20"
      >
        {CAPABILITIES.map((cap) => (
          <motion.div
            key={cap.headline}
            variants={fadeUp}
            className="flex flex-col items-start text-left group"
          >
            {/* Icon */}
            <EngineeringIcon type={cap.iconType} />

            {/* Headline */}
            <h3 className="text-base sm:text-lg font-bold text-ink leading-snug tracking-tight mb-3">
              {cap.headline}
            </h3>

            {/* Body */}
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans font-normal">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
