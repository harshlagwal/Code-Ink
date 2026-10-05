export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_INOUT = [0.4, 0, 0.2, 1] as const;
export const EASE_SPRING = { type: 'spring', stiffness: 260, damping: 24 } as const;

/** Fade + rise from below — primary entrance variant */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
};

/** Fade only — for labels and decorative elements */
export const fade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.36, ease: EASE_OUT },
  },
};

/** Slide in from left — for row-based list items */
export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
};

/** Slide in from right — for aside / stat items */
export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
};

/** Scale + fade — for the video wrapper and heavy visual blocks */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.56, ease: EASE_OUT },
  },
};

/** Narrow line-reveal — for horizontal divider lines */
export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.64, ease: EASE_OUT },
  },
};

/** Stagger container — wraps a list of children to cascade them */
export const stagger = (staggerTime = 0.07, delay = 0.05) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delay,
    },
  },
});

/** Hover lift — for interactive elements */
export const cardHover = {
  y: -4,
  transition: { duration: 0.2, ease: EASE_OUT },
};

/** Slide down from above — for navbar entrance */
export const slideDown = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: EASE_OUT },
  },
};
