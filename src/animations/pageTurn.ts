/**
 * Page-turn animation specification for CODEINK Mobile Diary Mode
 * Reference: PRD Section 7.5 and Appendix A
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const turn = {
  next: {
    initial: { rotateX: 14, y: 18, opacity: 0 },
    animate: {
      rotateX: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.42, ease: EASE }
    },
    exit: {
      rotateX: -92,
      y: -8,
      opacity: 0.35,
      transition: { duration: 0.42, ease: EASE }
    },
  },
  prev: {
    initial: { rotateX: -14, y: -18, opacity: 0 },
    animate: {
      rotateX: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.42, ease: EASE }
    },
    exit: {
      rotateX: 92,
      y: 8,
      opacity: 0.35,
      transition: { duration: 0.42, ease: EASE }
    },
  },
  reduced: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.18 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.18 }
    },
  },
};

export const SWIPE_SPRING = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
} as const;
