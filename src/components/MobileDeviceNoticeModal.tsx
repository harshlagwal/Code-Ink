import { useState, useEffect } from 'react';
import { Laptop, Monitor, Tablet, X, Copy, Check, ArrowRight } from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

export function MobileDeviceNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user already dismissed in this session
    try {
      const alreadyDismissed = sessionStorage.getItem('codeink_mobile_dismissed');
      if (alreadyDismissed) return;

      // Detect mobile screens (< 768px width or mobile user agent)
      const isMobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        // Small delay so page loads smoothly before showing notice
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDismiss = () => {
    notebookAudio.playPageTurn();
    try {
      sessionStorage.setItem('codeink_mobile_dismissed', 'true');
    } catch {}
    setIsOpen(false);
  };

  const handleCopyLink = () => {
    notebookAudio.playPencil();
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#FFFDF7] border-2 border-[#D9D4C8] shadow-2xl p-6 overflow-hidden notebook-ruled">
        {/* Decorative corner paper clip */}
        <div className="absolute top-0 right-10 w-4 h-8 bg-linear-to-b from-stone-400 to-stone-500 rounded-b-md shadow-xs opacity-70" />

        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          aria-label="Close Notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Device Icons Display */}
        <div className="flex items-center justify-center gap-3 pt-2 pb-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2457D6] shadow-xs">
            <Laptop className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-300 shadow-md scale-105">
            <Monitor className="w-6 h-6" />
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <Tablet className="w-6 h-6" />
          </div>
        </div>

        {/* Badge */}
        <div className="text-center mb-2">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Laptop / PC Recommended
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-lg font-bold text-center text-stone-900 font-sans leading-snug">
          Kindly Please Open Website in Laptop, Tab, or PC
        </h3>

        {/* Descriptive Body */}
        <p className="mt-2.5 text-xs text-center text-stone-600 leading-relaxed font-sans px-1">
          <strong className="text-stone-800">CODEINK</strong> is an engineering notebook designed with a two-page physical spread, live GCC/JVM compiler, and interactive memory tracer best viewed on a larger screen.
        </p>

        {/* Actions */}
        <div className="mt-5 space-y-2.5">
          {/* Quick Copy Link for Laptop */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#D9D4C8] hover:border-[#2457D6] text-stone-700 text-xs font-medium flex items-center justify-center gap-2 shadow-xs transition-all hover:bg-stone-50 active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied! Open on PC</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                <span>Copy Link to Open on Laptop</span>
              </>
            )}
          </button>

          {/* Continue on Mobile Anyway */}
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full py-2.5 px-3 rounded-xl bg-[#171717] hover:bg-stone-800 text-white text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <span>Continue on Mobile Anyway</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>

        {/* Friendly footnote */}
        <div className="mt-3 text-center">
          <span className="font-handwritten text-xs text-stone-400">
            happy learning · codeink
          </span>
        </div>
      </div>
    </div>
  );
}
