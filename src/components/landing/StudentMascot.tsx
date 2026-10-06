import { motion } from 'motion/react';

export function StudentMascot() {
  return (
    <div
      className="absolute -top-[74px] sm:-top-[88px] left-1 sm:left-2 z-40 select-none pointer-events-auto"
      role="img"
      aria-label="Code Ink Student Founder Mascot"
    >
      {/* Compact & Scaled-Down Mascot Container seated right at the top-left corner */}
      <div className="relative w-18 sm:w-22 h-30 sm:h-36">
        {/* Soft Contact Shadow right where hips sit on the book's top edge */}
        <div className="absolute top-[64px] sm:top-[76px] left-2 w-12 sm:w-16 h-2.5 bg-blue-950/40 dark:bg-black/60 rounded-full blur-[2.5px] pointer-events-none" />

        {/* 1. Statically Seated Body (No cursor jump, seated on the book corner) */}
        <img
          src="/founder-body.png?v=5"
          alt="Code Ink Founder Mascot"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10"
          style={{
            filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.26)) drop-shadow(0 2px 4px rgba(19, 68, 155, 0.16))',
          }}
          loading="eager"
        />

        {/* 2. Only the Raised Hand Gently Waves Left & Right ("Sirf Hath Flow Ho Left Right") */}
        <motion.img
          src="/founder-hand.png?v=5"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
          style={{
            transformOrigin: '23.4% 24.8%',
            filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.20))',
          }}
          animate={{
            rotate: [-5, 6, -5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
