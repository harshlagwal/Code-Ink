import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BookOpen, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';
import { fadeUp, stagger, fade } from '../../motion/variants';

interface StoryFrame {
  id: number;
  startTime: number;
  endTime: number;
  era: string;
  headline: string;
  accent: string;
  tagline: string;
  description: string;
  badgeClass: string;
  glowClass: string;
  icon: typeof BookOpen;
}

const STORY_FRAMES: StoryFrame[] = [
  {
    id: 0,
    startTime: 0,
    endTime: 3.0,
    era: 'Phase 01 · The Old Era',
    headline: '800-Page Textbook Fatigue',
    accent: 'from-rose-500 to-amber-500',
    tagline: 'Passive memorization & syntax walls',
    description:
      'Struggling through dense, static paper. Zero execution feedback, zero visual intuition—spending hours guessing pointer addresses on dry chalkboards.',
    badgeClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    glowClass: 'from-rose-500/15 via-amber-500/10 to-transparent dark:from-rose-500/20 dark:via-amber-500/15',
    icon: BookOpen,
  },
  {
    id: 1,
    startTime: 3.0,
    endTime: 5.5,
    era: 'Phase 02 · The Breakthrough',
    headline: 'The CODEINK Awakening',
    accent: 'from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300',
    tagline: 'Discarding static paper for live computation',
    description:
      'The lightbulb moment. Ditching heavy textbook stacks for a physical engineering ruled notebook connected directly to an in-browser live compiler.',
    badgeClass: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
    glowClass: 'from-blue-600/20 via-indigo-500/15 to-transparent dark:from-blue-500/25 dark:via-indigo-500/20',
    icon: Lightbulb,
  },
  {
    id: 2,
    startTime: 5.5,
    endTime: 8.65,
    era: 'Phase 03 · The Living Canvas',
    headline: 'Verified Success & Mastery',
    accent: 'from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300',
    tagline: 'Real-time telemetry, test pass guaranteed',
    description:
      'Live memory layout graphs, immediate error diagnostics, and zero guesswork. From frustrating syntax bugs to a verified green checkmark in seconds.',
    badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    glowClass: 'from-emerald-500/20 via-cyan-500/15 to-blue-500/15 dark:from-emerald-400/25 dark:via-cyan-400/20',
    icon: CheckCircle2,
  },
];

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const reduce = useReducedMotion();

  // Strict silent continuous playback with high-fidelity time tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

    let animId: number;
    const syncTime = () => {
      if (video && !video.paused) {
        const t = video.currentTime;
        let index = 0;
        if (t >= 5.5) {
          index = 2;
        } else if (t >= 3.0) {
          index = 1;
        } else {
          index = 0;
        }
        setActiveFrameIndex((prev) => (prev !== index ? index : prev));
      }
      animId = requestAnimationFrame(syncTime);
    };
    animId = requestAnimationFrame(syncTime);

    // Intersection observer: only plays when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const currentFrame = STORY_FRAMES[activeFrameIndex];
  const Icon = currentFrame.icon;

  return (
    <section
      ref={containerRef}
      id="video"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32 select-none overflow-visible border-t border-line/60"
    >
      {/* Dynamic ambient canvas aura — smoothly shifting with the current active frame */}
      <div
        aria-hidden="true"
        className={`absolute right-1/4 top-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr ${currentFrame.glowClass} blur-3xl rounded-full pointer-events-none -z-10 transition-colors duration-1000`}
      />

      {/* Narrative Section Header */}
      <motion.div
        variants={stagger(0.08, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-3xl mb-12 sm:mb-16"
      >
        <motion.div
          variants={fade}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-widest font-bold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Evolution · Old vs New Era</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight"
        >
          From Heavy Textbook Frustration to{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400">
            Living Canvas Mastery.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-base sm:text-lg text-muted max-w-2xl leading-relaxed"
        >
          Watch how traditional passive memorization dissolves into verified software engineering intuition.
        </motion.p>
      </motion.div>

      {/* 2-Column Kinetic Storytelling: Left Smooth Sliding Typography + Right Pure Living Canvas Video */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[460px]">
        {/* LEFT COLUMN: Apple/Google-Style Sliding Narrative (Single animated block, no cards, no lines) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Minimal 3-Stage Narrative Pill Indicators */}
          <div className="flex items-center gap-2 mb-6">
            {STORY_FRAMES.map((frame, idx) => {
              const isCurrent = idx === activeFrameIndex;
              return (
                <div
                  key={frame.id}
                  className="flex items-center gap-2 transition-all duration-300"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      isCurrent
                        ? 'w-10 bg-accent'
                        : 'w-3 bg-line/60 hover:bg-line'
                    }`}
                  />
                  {idx < STORY_FRAMES.length - 1 && (
                    <span className="text-muted/20 text-[10px]">·</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* AnimatePresence for buttery smooth Apple-style slide and crossfade transitions */}
          <div className="relative min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrame.id}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 22, filter: 'blur(6px)' }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -22, filter: 'blur(6px)' }
                }
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-3.5"
              >
                {/* Raw clean icon and era label — No cards, no boxed container */}
                <div className="flex items-center gap-3 mb-1">
                  <Icon className="w-7 h-7 text-ink stroke-[1.75]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-muted">
                    {currentFrame.era}
                  </span>
                </div>

                {/* Big Sharp Headline in Crisp Blue */}
                <h3 className="text-3xl sm:text-[42px] font-extrabold text-blue-600 dark:text-blue-400 tracking-tight leading-[1.15]">
                  {currentFrame.headline}
                </h3>

                {/* Tagline / Subtitle - high contrast & crisp */}
                <p className="font-semibold text-ink text-base sm:text-lg tracking-tight">
                  {currentFrame.tagline}
                </p>

                {/* Body paragraph - clean, readable and sharp like Apple/Google docs */}
                <p className="text-base sm:text-[17px] text-ink/80 dark:text-ink/80 leading-relaxed max-w-lg font-normal">
                  {currentFrame.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Pure Living Canvas Video (Zero Buttons, Zero Sound, Feathered Radial Edges) */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div
            className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
            style={{
              // Organic radial edge feathering so video dissolves seamlessly into the canvas
              maskImage:
                'radial-gradient(ellipse 95% 90% at center, black 70%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 95% 90% at center, black 70%, transparent 100%)',
            }}
          >
            <video
              ref={videoRef}
              playsInline
              loop
              muted
              autoPlay
              disablePictureInPicture
              disableRemotePlayback
              preload="auto"
              title="CODEINK Developer Story: Old Era vs Living Canvas"
              className="w-full h-auto max-h-[540px] object-cover pointer-events-none drop-shadow-2xl"
            >
              <source src="/video/developer-story.mp4" type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
