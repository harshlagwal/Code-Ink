import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { fadeUp, stagger } from '../../motion/variants';

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
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

  // Scroll-triggered silent autoplay: plays when scrolled in, pauses when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce silent default
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

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
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      video.volume = 1;
      setIsMuted(false);
    } else {
      video.muted = true;
      video.volume = 0;
      setIsMuted(true);
    }
  };

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
        className="relative mx-auto w-full aspect-video overflow-hidden border border-line bg-raised shadow-2xl shadow-black/10 dark:shadow-black/60 group"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          loop
          muted
          autoPlay
          preload="metadata"
          title="CODEINK Launch Film"
        >
          <source src="/video/codeink-launch.mp4" type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>

        {/* Minimal sound toggle pill — floating elegantly in corner */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Sound On</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Caption row */}
      <motion.div
        variants={fadeUp}
        className="mt-5 flex items-center justify-between text-[11px] font-mono text-muted"
      >
        <span>Recorded directly in the browser environment · Auto-plays on scroll</span>
        <span>1080p · 60fps</span>
      </motion.div>
    </motion.section>
  );
}
