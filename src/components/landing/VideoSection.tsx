import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { fadeUp, stagger } from '../../motion/variants';

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked cinematic scale — the Antigravity signature motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 50%'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.25, 0.8, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [56, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], reduce ? ['24px', '24px'] : ['36px', '20px']);

  return (
    <motion.section
      ref={containerRef}
      id="video"
      variants={stagger(0.1)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 select-none overflow-hidden"
    >
      {/* Editorial header — staggered independently */}
      <motion.div variants={fadeUp} className="max-w-xl mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase font-bold text-muted tracking-widest block mb-3">
          Product Demonstration
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
          A physical engineering notebook,{' '}
          <span className="text-muted font-normal">powered by live computation.</span>
        </h2>
      </motion.div>

      {/* Cinematic scale-up video — scroll-linked, not whileInView */}
      <motion.div
        style={{ scale, opacity, y, borderRadius }}
        className="relative mx-auto w-full aspect-video overflow-hidden border border-line bg-raised shadow-2xl shadow-black/10 dark:shadow-black/60"
      >
        <video
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
          title="CODEINK Launch Film"
        >
          <source src="/video/codeink-launch.mp4" type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </motion.div>

      {/* Caption row */}
      <motion.div
        variants={fadeUp}
        className="mt-5 flex items-center justify-between text-[11px] font-mono text-muted"
      >
        <span>Recorded directly in the browser environment</span>
        <span>1080p · 60fps</span>
      </motion.div>
    </motion.section>
  );
}
