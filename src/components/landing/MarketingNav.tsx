import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowRight, Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { subjectCards } from '../../data/landingStats';

interface MarketingNavProps {
  onEnter: () => void;
}

export function MarketingNav({ onEnter }: MarketingNavProps) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact(y > 24);
  });

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCurriculumOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsCurriculumOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      ref={navRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-200 ${
        compact
          ? 'bg-app/90 backdrop-blur-md border-b border-line shadow-xs py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-3 sm:px-6 flex items-center justify-between relative">
        {/* Brand Logo & Name */}
        <a href="#top" className="flex items-center gap-2 group shrink-0">
          <img
            src="/codeink-logo.webp"
            alt="Code Ink"
            className="w-7 h-7 rounded-lg object-contain shadow-2xs border border-line bg-raised p-0.5 group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-base tracking-tight text-ink">
            CODE<span className="text-accent">INK</span>
          </span>

        </a>

        {/* Desktop Links (Antigravity Mega-Menu Pattern) */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-muted">
          {/* Interactive Curriculum Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsCurriculumOpen(!isCurriculumOpen)}
            className={`inline-flex items-center gap-1 py-1 transition-colors cursor-pointer ${
              isCurriculumOpen ? 'text-ink font-bold' : 'hover:text-ink'
            }`}
          >
            <span>Curriculum</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isCurriculumOpen ? 'rotate-180 text-ink' : 'text-muted'
              }`}
            />
          </button>

          <a
            href="#features"
            onClick={() => setIsCurriculumOpen(false)}
            className="hover:text-ink transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsCurriculumOpen(false)}
            className="hover:text-ink transition-colors"
          >
            Methodology
          </a>
          <a
            href="#stats"
            onClick={() => setIsCurriculumOpen(false)}
            className="hover:text-ink transition-colors"
          >
            Telemetry
          </a>
          <a
            href="#faq"
            onClick={() => setIsCurriculumOpen(false)}
            className="hover:text-ink transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center">
            <ThemeToggle compact />
          </div>

          {/* High-Contrast Bold CTA (Single-line, professional spacing on mobile) */}
          <button
            type="button"
            onClick={onEnter}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#2457D6] hover:bg-blue-700 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold shadow-xs hover:shadow active:scale-[0.97] transition-all cursor-pointer"
          >
            <span>Go to Notebook</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted hover:text-ink hover:bg-raised border border-transparent hover:border-line transition-colors cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ================= ANTIGRAVITY MEGA-DROPDOWN MENU (IMAGE 2 REPLICA) ================= */}
      <AnimatePresence>
        {isCurriculumOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 mx-auto max-w-5xl px-4 pt-2 z-50 pointer-events-auto"
          >
            <div className="rounded-3xl border border-line bg-page/98 dark:bg-raised/98 backdrop-blur-xl shadow-2xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 justify-between">
              {/* Left Side: Overview & Enter Action */}
              <div className="md:w-5/12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-snug">
                    Explore our core curriculum volumes
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed font-sans">
                    Complete first-principles theoretical breakdowns, handwritten margin insights, and live executable code.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCurriculumOpen(false);
                      onEnter();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-raised hover:bg-page border border-line text-xs font-bold text-ink hover:text-accent transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Open Notebook Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Subjects List with Clean Monospace Codes */}
              <div className="md:w-6/12 border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
                <div className="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">
                  Curriculum Volumes
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {subjectCards.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setIsCurriculumOpen(false);
                        onEnter();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-raised dark:hover:bg-page transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg border border-line flex items-center justify-center font-mono text-[10px] font-bold text-ink bg-page dark:bg-raised shrink-0">
                        {sub.shortCode}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-ink group-hover:text-accent transition-colors truncate">
                          {sub.name}
                        </div>
                        <div className="text-[10px] text-muted font-mono truncate">
                          {sub.topics} Pages · {sub.chapters} Ch
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-line bg-page/98 dark:bg-raised/98 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3"
        >
          <div className="flex flex-col space-y-1.5 text-sm font-medium text-muted">
            <a
              href="#subjects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-raised hover:text-accent transition-colors font-semibold text-ink"
            >
              Curriculum Volumes
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-raised hover:text-accent transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-raised hover:text-accent transition-colors"
            >
              Methodology
            </a>
            <a
              href="#stats"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-raised hover:text-accent transition-colors"
            >
              Telemetry
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-raised hover:text-accent transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Dedicated Theme / Appearance row in mobile menu */}
          <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-app/80 border border-line">
            <span className="text-xs font-semibold text-muted">Appearance / Theme</span>
            <ThemeToggle compact />
          </div>

          <div className="pt-1 border-t border-line">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnter();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2457D6] dark:bg-white text-white dark:text-neutral-950 py-2.5 text-xs font-bold shadow-xs cursor-pointer active:scale-[0.98] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Notebook Studio</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
