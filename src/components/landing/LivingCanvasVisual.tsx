import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function LivingCanvasVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict 100% silent autoplay guarantees
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay handled safely by browser policy
      });
    }

    // Battery & CPU optimization: only play when in view
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
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 -mt-4 sm:-mt-8 mb-16 sm:mb-24 select-none">
      {/* Subtle indicator pill — Apple / Linear style */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised/80 backdrop-blur-md border border-line text-[11px] font-mono text-muted shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wider uppercase font-semibold text-ink/80">The Living Notebook</span>
          <span className="text-muted/60">·</span>
          <span>Live Canvas Motion</span>
        </div>
      </div>

      {/* Dynamic ambient backlight matching Light and Dark modes */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 sm:-inset-12 bg-gradient-to-tr from-blue-600/10 via-indigo-500/15 to-purple-600/10 dark:from-blue-500/25 dark:via-indigo-500/20 dark:to-cyan-500/20 blur-3xl rounded-full -z-10 pointer-events-none opacity-80"
      />

      {/* Floating container — No card, no rectangular border, no player controls */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative mx-auto w-full flex items-center justify-center transform-gpu"
      >
        <div
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{
            // Radial edge feathering: dissolves video edges seamlessly into the page background
            maskImage: 'radial-gradient(ellipse 94% 90% at center, black 62%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 94% 90% at center, black 62%, transparent 100%)',
          }}
        >
          <video
            ref={videoRef}
            src="/video/codeink-living-canvas.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            aria-label="CodeInk interactive notebook animated showcase"
            className="w-full h-auto max-h-[540px] object-contain pointer-events-none drop-shadow-xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
