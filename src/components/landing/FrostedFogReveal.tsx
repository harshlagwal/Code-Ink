import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FrostedFogRevealProps {
  onComplete?: () => void;
}

export function FrostedFogReveal({ onComplete }: FrostedFogRevealProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [hasStartedWiping, setHasStartedWiping] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokeDistRef = useRef(0);
  const firstWipeTimeRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const evaporate = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsMounted(false);
      onComplete?.();
    }, 750);
  }, [isFadingOut, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect dark or light mode
    const isDark = document.documentElement.classList.contains('dark');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Realistic pure fog mist layer matching website canvas tone
    ctx.fillStyle = isDark ? 'rgba(16, 18, 22, 0.985)' : 'rgba(247, 245, 240, 0.985)';
    ctx.fillRect(0, 0, width, height);

    // Soft organic cold-vapor haze in the center
    const haze = ctx.createRadialGradient(
      width / 2,
      height / 2,
      60,
      width / 2,
      height / 2,
      Math.max(width, height)
    );
    haze.addColorStop(0, isDark ? 'rgba(30, 41, 59, 0.25)' : 'rgba(226, 232, 240, 0.35)');
    haze.addColorStop(1, 'transparent');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);

    // Feathered brush for wiping fog
    const wipe = (x: number, y: number) => {
      if (isFadingOut) return;

      const now = Date.now();
      // Start the timer ONLY when the user begins moving the cursor
      if (!firstWipeTimeRef.current) {
        firstWipeTimeRef.current = now;
        setHasStartedWiping(true);
      }

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      const brushRadius = width < 640 ? 65 : 95;
      const brushGrad = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
      brushGrad.addColorStop(0, 'rgba(0,0,0,1)');
      brushGrad.addColorStop(0.5, 'rgba(0,0,0,0.85)');
      brushGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = brushGrad;
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Accumulate stroke distance
      if (lastPosRef.current) {
        const dx = x - lastPosRef.current.x;
        const dy = y - lastPosRef.current.y;
        strokeDistRef.current += Math.hypot(dx, dy);
      }
      lastPosRef.current = { x, y };

      // User must actively move the cursor for 3.5 to 4 seconds before fog evaporates
      const activeWipingDuration = (now - firstWipeTimeRef.current) / 1000;
      if (activeWipingDuration >= 3.5) {
        evaporate();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      wipe(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        wipe(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [evaporate, isFadingOut]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          key="pure-frosted-fog-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto touch-none"
        >
          {/* Pure Frosted Fog Canvas — Stays closed until user moves cursor */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />

          {/* Center Text in Fog Tone — Zero Cards, Zero Boxes, Disappears on first cursor move */}
          <AnimatePresence>
            {!hasStartedWiping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center text-center px-4"
              >
                <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-stone-500/70 dark:text-stone-400/60 font-medium">
                  Move the cursor
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
