import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { fadeUp, fade, stagger, lineReveal } from '../../motion/variants';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    q: 'Is CODEINK completely free to use?',
    a: 'Yes, CODEINK is 100% free. There are no paywalls, subscriptions, or hidden tiers. All 148 curriculum study pages, 18 exam papers, the margin compiler, memory tracer, and 100 dev tools are openly accessible to every student.',
  },
  {
    q: 'Do I need to create an account or sign in?',
    a: 'No sign-up is required. CODEINK works immediately in your browser. Your bookmarks, handwritten highlights, user margin notes, and learning streak telemetry are securely preserved in your local browser storage.',
  },
  {
    q: 'How does the margin compiler and memory tracer work?',
    a: 'Each notebook page has an interactive code margin. You can edit code, pass custom standard input (stdin), execute the program, and view memory architecture tables displaying variable addresses, values, and pointer dereferences.',
  },
  {
    q: 'How does the AI Study Desk function?',
    a: 'The AI Study Desk acts as an interactive engineering mentor. It connects 100% client-side to free Google Gemini or OpenRouter APIs using your own free API key. Your keys and conversations remain private on your device.',
  },
  {
    q: 'Are the question papers modeled after real university exams?',
    a: 'Yes. CODEINK provides 18 full 50-mark exam papers (Set A, Set B, and Set C for all 6 subjects) complete with section breakdowns, question choices, time allotments, and detailed marking criteria.',
  },
  {
    q: 'Can I study on a smartphone or tablet?',
    a: 'Yes. CODEINK includes a dedicated Mobile Diary Reader mode optimized for vertical touch scrolling, audio read-aloud listening, and rapid revision on the go.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
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
          FAQ
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
          Frequently asked questions.
        </motion.h2>
        <motion.div variants={lineReveal} className="mt-4 h-px bg-line w-full" />
      </motion.div>

      {/* FAQ rows with stagger */}
      <motion.div
        variants={stagger(0.08, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="divide-y divide-line/70"
      >
        {FAQ_LIST.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div key={item.q} variants={fadeUp} className="py-6 sm:py-7">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
              >
                <span className="font-bold text-base sm:text-lg text-ink group-hover:text-accent transition-colors">
                  {item.q}
                </span>
                <span className="p-1 rounded-md text-muted group-hover:text-ink shrink-0 mt-0.5">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 text-xs sm:text-sm text-muted leading-relaxed font-sans max-w-3xl">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
