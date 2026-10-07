import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { landingStats } from '../../data/landingStats';
import { fadeUp, fade, stagger, lineReveal } from '../../motion/variants';

const STATS_ITEMS = [
  { value: landingStats.subjects, label: 'Curriculum Volumes', sub: '8 Subjects (C to OS)' },
  { value: landingStats.chapters, label: 'Master Chapters', sub: '180+ Basic to Advanced' },
  { value: landingStats.topics, label: 'Study Pages', sub: 'Annotated Code & Diagrams' },
  { value: landingStats.papers, label: 'Examination Sets', sub: '24 Official 50-mark sets' },
];

/** Animated count-up hook */
function useCountUp(target: number, duration = 1.4, startOnMount = false) {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!startOnMount || reduce) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startOnMount, reduce]);

  return count;
}

function StatItem({ value, label, sub }: { value: number; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 1.6, inView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-start border-l-2 border-line pl-4 sm:pl-6"
    >
      <div className="font-mono text-4xl sm:text-5xl font-black text-ink tracking-tight tabular-nums">
        {count}
      </div>
      <div className="text-sm font-bold text-ink mt-2">{label}</div>
      <div className="text-xs text-muted font-mono mt-1">{sub}</div>
    </motion.div>
  );
}

export function StatsStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      id="stats"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 select-none border-t border-line/60"
    >
      {/* Header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-xl mb-14 sm:mb-16"
      >
        <motion.span variants={fade} className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3">
          Academic Telemetry
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
          Verified syllabus scale and resource scope.
        </motion.h2>
        <motion.div variants={lineReveal} className="mt-4 h-px bg-line w-full" />
      </motion.div>

      {/* Count-up stat items */}
      <motion.div
        variants={stagger(0.12, 0.06)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        {STATS_ITEMS.map((item) => (
          <StatItem key={item.label} value={item.value} label={item.label} sub={item.sub} />
        ))}
      </motion.div>
    </section>
  );
}
