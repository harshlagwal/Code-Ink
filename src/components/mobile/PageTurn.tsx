import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { turn } from '../../animations/pageTurn';

interface PageTurnProps {
  pageKey: string | number;
  direction: 'next' | 'prev';
  isReducedMotion?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared top-origin page-turn animation container for CODEINK Diary Mode
 * Reference: PRD Section 7.5 & 9.5
 * Uses transform-origin: 50% 0 (top-centre) and container perspective: 1200px.
 */
export const PageTurn: React.FC<PageTurnProps> = ({
  pageKey,
  direction,
  isReducedMotion = false,
  children,
  className = '',
}) => {
  const selectedVariant = isReducedMotion ? turn.reduced : turn[direction];

  return (
    <div
      className={`relative w-full h-full [perspective:1200px] overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pageKey}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          style={{
            transformOrigin: '50% 0%', // Top centre origin (notepad leaf flip)
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}
          className="w-full h-full flex flex-col min-h-0 flex-1"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
