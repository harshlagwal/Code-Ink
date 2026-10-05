import { motion, useReducedMotion } from 'motion/react';
import { Github, ArrowUp } from 'lucide-react';
import { fadeUp, fade, stagger } from '../../motion/variants';

interface LandingFooterProps {
  onEnter: () => void;
}

export function LandingFooter({ onEnter }: LandingFooterProps) {
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      variants={stagger(0.1, 0.06)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="border-t border-line bg-raised/50 py-12 sm:py-16 px-4 sm:px-6 select-none"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-line"
        >
          {/* Brand Info */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/codeink-logo.webp"
                alt="Code Ink"
                className="w-7 h-7 rounded-lg object-contain shadow-2xs border border-line bg-raised p-0.5"
              />
              <span className="font-extrabold text-base tracking-tight text-ink">
                CODE<span className="text-accent">INK</span>
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              An authentic engineering notebook platform for computer science students. Tactile ruled pages, live multi-language compiler, memory tracer, and 100 free tools.
            </p>
          </div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8 text-xs font-semibold text-muted">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-accent tracking-wider">
                Platform
              </div>
              <div><a href="#features" className="hover:text-ink transition-colors">Features</a></div>
              <div><a href="#video" className="hover:text-ink transition-colors">Launch Film</a></div>
              <div><a href="#how-it-works" className="hover:text-ink transition-colors">How It Works</a></div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-accent tracking-wider">
                Curriculum
              </div>
              <div><a href="#subjects" className="hover:text-ink transition-colors">6 Core Volumes</a></div>
              <div><a href="#stats" className="hover:text-ink transition-colors">Academic Telemetry</a></div>
              <div><a href="#faq" className="hover:text-ink transition-colors">FAQ</a></div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-accent tracking-wider">
                Community
              </div>
              <div>
                <a
                  href="https://github.com/harshlagwal/Code-Ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onEnter}
                  className="text-accent font-bold hover:underline cursor-pointer"
                >
                  Open Notebook →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom copyright & attribution */}
        <motion.div
          variants={fade}
          className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted font-mono"
        >
          <div className="flex items-center gap-1 flex-wrap">
            <span>Built by Harsh Lagwal</span>
            <span>·</span>
            <span>Free Forever</span>
            <span>·</span>
            <span className="font-handwritten text-sm text-ink">crafted for learners</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
