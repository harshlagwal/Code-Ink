import { useEffect, useState } from 'react';
import { X, ExternalLink, Star, Copy, Check, Sparkles, GraduationCap, ShieldCheck, Tag } from 'lucide-react';
import { DevTool } from '../../types/tool';
import { ToolLogo } from './ToolLogo';

interface ToolDetailsModalProps {
  tool: DevTool | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
}

export function ToolDetailsModal({
  tool,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: ToolDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !tool) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tool.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-raised rounded-2xl border border-line shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-page border-b border-line px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ToolLogo tool={tool} size="lg" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-ink">{tool.name}</h2>
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    <Sparkles className="w-3 h-3 fill-amber-400" />
                    Top Pick
                  </span>
                )}
              </div>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
              >
                <span>{tool.domain}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : 'bg-page border-line text-muted hover:text-ink hover:bg-raised'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-page text-muted hover:text-ink transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-ink">
          {/* Tagline / Overview */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-1">
              About This Tool
            </h4>
            <p className="text-sm leading-relaxed text-ink font-sans">
              {tool.description}
            </p>
          </div>

          {/* Free Tier Allowance Card */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <div className="flex items-center gap-2 mb-1 text-emerald-700 dark:text-emerald-400 font-semibold text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What You Get Completely Free</span>
            </div>
            <p className="text-sm text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
              {tool.freeTierDetails}
            </p>
          </div>

          {/* Student Perk Card (if applicable) */}
          {tool.studentPerk && (
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25">
              <div className="flex items-center gap-2 mb-1 text-purple-700 dark:text-purple-300 font-semibold text-xs font-mono uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Special Student Benefit</span>
              </div>
              <p className="text-xs text-purple-950 dark:text-purple-200 font-medium">
                {tool.studentPerk}
              </p>
            </div>
          )}

          {/* Technology & Workflow Tags */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Tags & Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-page text-muted border border-line"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-page border-t border-line px-5 py-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line bg-raised text-ink hover:bg-page text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent hover:opacity-90 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>Open {tool.name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
