import { useState, useEffect } from 'react';

export type ViewportMode = 'diary' | 'spread';

export interface ViewportState {
  mode: ViewportMode;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  prefersReducedMotion: boolean;
}

/**
 * Hook to determine whether the viewport should render in Mobile Diary Mode (< 1024px)
 * or Two-Page Desktop Spread (>= 1024px) per PRD section 9.3.
 */
export function useViewportMode(): ViewportState {
  const [state, setState] = useState<ViewportState>(() => {
    if (typeof window === 'undefined') {
      return {
        mode: 'spread',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        prefersReducedMotion: false,
      };
    }

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const orientation = window.innerHeight > width ? 'portrait' : 'landscape';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      mode: isDesktop ? 'spread' : 'diary',
      isMobile,
      isTablet,
      isDesktop,
      orientation,
      prefersReducedMotion,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateState = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const orientation = window.innerHeight > width ? 'portrait' : 'landscape';
      const prefersReducedMotion = mediaQueryReducedMotion.matches;

      setState({
        mode: isDesktop ? 'spread' : 'diary',
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        prefersReducedMotion,
      });
    };

    updateState();

    window.addEventListener('resize', updateState);
    mediaQueryDesktop.addEventListener('change', updateState);
    mediaQueryReducedMotion.addEventListener('change', updateState);

    return () => {
      window.removeEventListener('resize', updateState);
      mediaQueryDesktop.removeEventListener('change', updateState);
      mediaQueryReducedMotion.removeEventListener('change', updateState);
    };
  }, []);

  return state;
}
