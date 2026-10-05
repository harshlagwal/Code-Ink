import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

const LINE_1_TEXT = 'Master Computer Science,';
const LINE_2_TEXT = 'one page at a time.';

export function LivingInkHeadline() {
  const reduce = useReducedMotion();

  // Character counters for active handwriting
  const [line1Count, setLine1Count] = useState(reduce ? LINE_1_TEXT.length : 0);
  const [line2Count, setLine2Count] = useState(reduce ? LINE_2_TEXT.length : 0);
  const [activeLine, setActiveLine] = useState<1 | 2 | null>(reduce ? null : 1);
  const [inkSettled, setInkSettled] = useState(Boolean(reduce));
  const [runId, setRunId] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Restart function for manual replay or page reload
  const restartWriting = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLine1Count(0);
    setLine2Count(0);
    setActiveLine(1);
    setInkSettled(false);
    setRunId((prev) => prev + 1);
  };

  useEffect(() => {
    if (reduce) {
      setLine1Count(LINE_1_TEXT.length);
      setLine2Count(LINE_2_TEXT.length);
      setActiveLine(null);
      setInkSettled(true);
      return;
    }

    let isCancelled = false;

    // Human handwriting rhythm calculator
    const getHumanDelay = (char: string) => {
      // Natural human variance: slight muscular jitter +/- 8ms
      const jitter = Math.floor(Math.random() * 16) - 8;

      if (char === ' ') {
        // Hand lifting and moving across paper to begin next word
        return Math.max(80, 130 + jitter);
      }
      if (char === ',' || char === '.') {
        // Pausing at punctuation mark
        return Math.max(140, 220 + jitter);
      }
      if (char === char.toUpperCase() && char !== ' ') {
        // Capital glyph with flourish takes more pen strokes
        return Math.max(50, 75 + jitter);
      }
      // Standard cursive fluid letter stroke
      return Math.max(30, 42 + jitter);
    };

    const writeNextChar = (currentLine: 1 | 2, currentIndex: number) => {
      if (isCancelled) return;

      if (currentLine === 1) {
        if (currentIndex < LINE_1_TEXT.length) {
          const char = LINE_1_TEXT[currentIndex];
          const delay = getHumanDelay(char);
          timeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setLine1Count(currentIndex + 1);
            writeNextChar(1, currentIndex + 1);
          }, delay);
        } else {
          // Pause between Line 1 and Line 2: hand moving to next ruled line
          timeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setActiveLine(2);
            writeNextChar(2, 0);
          }, 320);
        }
      } else if (currentLine === 2) {
        if (currentIndex < LINE_2_TEXT.length) {
          const char = LINE_2_TEXT[currentIndex];
          const delay = getHumanDelay(char);
          timeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setLine2Count(currentIndex + 1);
            writeNextChar(2, currentIndex + 1);
          }, delay);
        } else {
          // Finished writing: pen rests, leaves final dot, and fades away
          timeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setActiveLine(null);
            setInkSettled(true);
          }, 350);
        }
      }
    };

    // Initial delay before putting pen to paper
    timeoutRef.current = setTimeout(() => {
      writeNextChar(1, 0);
    }, 280);

    return () => {
      isCancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [runId, reduce]);

  return (
    <div className="relative inline-block select-none my-2 sm:my-3 group">
      {/* Background radial ink bleed glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: inkSettled ? 0.35 : 0.75, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-blue-600/10 via-indigo-600/15 to-violet-600/10 dark:from-blue-500/20 dark:via-indigo-500/15 dark:to-cyan-500/15 blur-3xl rounded-full pointer-events-none -z-10"
      />

      <h1
        aria-label={`${LINE_1_TEXT} ${LINE_2_TEXT}`}
        className="font-['Caveat',cursive] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide leading-[1.08] relative text-center"
      >
        {/* ════════ LINE 1: Master Computer Science, ════════ */}
        <div className="relative inline-block whitespace-nowrap">
          {LINE_1_TEXT.split('').map((char, index) => {
            const isVisible = index < line1Count;
            const isLatest = index === line1Count - 1 && activeLine === 1;

            return (
              <span
                key={`l1-${index}`}
                className={`inline-block transition-all duration-150 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${
                  isLatest
                    ? 'text-blue-600 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                    : 'text-neutral-900 dark:text-neutral-100'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}

          {/* Active Fountain Pen Nib (glides at current writing position on Line 1) */}
          {activeLine === 1 && line1Count > 0 && line1Count < LINE_1_TEXT.length && (
            <span className="inline-block relative w-0 overflow-visible align-top pointer-events-none">
              <span className="absolute -left-1 -top-1 sm:-top-2 flex items-center justify-center">
                {/* Wet ink core */}
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-[0_0_12px_rgba(37,99,235,0.9)] animate-ping opacity-75" />
                <span className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 dark:bg-cyan-300 shadow-[0_0_6px_#38bdf8]" />
              </span>
            </span>
          )}

          {/* Ruled notebook baseline under line 1 */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 dark:via-blue-400/20 to-transparent pointer-events-none"
          />
        </div>

        <br />

        {/* ════════ LINE 2: one page at a time. ════════ */}
        <div className="relative inline-block whitespace-nowrap mt-0.5 sm:mt-1">
          {LINE_2_TEXT.split('').map((char, index) => {
            const isVisible = index < line2Count;
            const isLatest = index === line2Count - 1 && activeLine === 2;

            return (
              <span
                key={`l2-${index}`}
                className={`inline-block transition-all duration-150 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${
                  isLatest
                    ? 'text-cyan-500 dark:text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                    : 'text-blue-700 dark:text-blue-400'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}

          {/* Active Fountain Pen Nib (glides at current writing position on Line 2) */}
          {activeLine === 2 && line2Count > 0 && line2Count <= LINE_2_TEXT.length && (
            <span className="inline-block relative w-0 overflow-visible align-top pointer-events-none">
              <span className="absolute -left-1 -top-1 sm:-top-2 flex items-center justify-center">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-indigo-500 dark:bg-cyan-300 shadow-[0_0_12px_rgba(99,102,241,0.9)] animate-ping opacity-75" />
                <span className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-600 dark:bg-cyan-400 shadow-[0_0_6px_#818cf8]" />
              </span>
            </span>
          )}

          {/* Ruled notebook baseline under line 2 */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 dark:via-cyan-400/20 to-transparent pointer-events-none"
          />
        </div>
      </h1>

      {/* Tactile "Re-ink" Interactive Button (Appears subtly when settled) */}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={restartWriting}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-muted/70 hover:text-accent hover:bg-accent/5 border border-transparent hover:border-line/60 transition-all cursor-pointer ${
            inkSettled ? 'opacity-60 hover:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          title="Re-run the human handwriting ink animation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Re-write ink</span>
        </button>
      </div>
    </div>
  );
}
