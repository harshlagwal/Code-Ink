import { motion } from 'motion/react';

export function StudentMascot() {
  return (
    <div
      className="absolute -top-[108px] sm:-top-[122px] left-6 sm:left-12 z-40 select-none pointer-events-auto cursor-pointer group"
      role="img"
      aria-label="Code Ink Student Founder Mascot"
    >
      {/* ============================================================== */}
      {/* THE SITTING FOUNDER MASCOT (Bridge Ledge Pose)                 */}
      {/* Smooth, Gentle Floating Breathing Motion ("Smooth Flow")       */}
      {/* ============================================================== */}
      <motion.div
        className="relative w-24 sm:w-28 h-40 sm:h-48 origin-bottom"
        animate={{
          y: [0, -4, 0],
          rotate: [-0.6, 0.6, -0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.2,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.04,
          y: -5,
          transition: { type: 'spring', stiffness: 350, damping: 22 },
        }}
      >
        {/* Soft Contact Shadow right where hips sit on the book's top edge */}
        <div className="absolute top-[88px] sm:top-[102px] left-3 w-16 sm:w-20 h-3.5 bg-blue-950/45 dark:bg-black/70 rounded-full blur-[3px] pointer-events-none" />

        {/* Founder 3D Avatar Image with Dangling Legs & Waving Hand */}
        <img
          src="/founder-mascot.png?v=3"
          alt="Code Ink Founder Mascot"
          className="w-full h-full object-contain pointer-events-none select-none relative z-10"
          style={{
            filter: 'drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28)) drop-shadow(0 3px 6px rgba(19, 68, 155, 0.18))',
            transition: 'filter 0.3s ease',
          }}
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
