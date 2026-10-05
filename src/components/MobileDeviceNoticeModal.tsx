import { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

/**
 * MobileDeviceNoticeModal (replaces blocking modal per PRD 7.8)
 * Single, dismissible, non-blocking toast that appears once per session on mobile screens.
 * Informs the user that compiler/tracer are optimized for desktop, while 100% of reading
 * and content is fully accessible here.
 */
export function MobileDeviceNoticeModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const alreadyDismissed = sessionStorage.getItem('codeink_mobile_hint_dismissed');
      if (alreadyDismissed) return;

      const isMobile =
        window.innerWidth < 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        // Subtle delayed appearance so the initial diary page loads smoothly first
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors in restricted iframes
    }
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('codeink_mobile_hint_dismissed', 'true');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Desktop experience recommendation"
      className="fixed bottom-16 sm:bottom-20 left-4 right-4 max-w-md mx-auto z-40 pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1E232A]/95 text-stone-100 border border-stone-700/80 shadow-2xl backdrop-blur-md">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#60A5FA] flex items-center justify-center shrink-0 border border-blue-400/30">
          <Monitor className="w-4 h-4" />
        </div>
        <p className="text-xs text-stone-200 leading-snug flex-1 font-sans">
          Compiler and memory tracer are best on desktop —{' '}
          <span className="text-amber-300 font-medium">but you can read everything here.</span>
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss desktop hint"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
