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
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#D9D4C8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-[#F7F3EA] border-b border-[#D9D4C8] px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ToolLogo tool={tool} size="lg" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#171717]">{tool.name}</h2>
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    <Sparkles className="w-3 h-3 fill-amber-400" />
                    Top Pick
                  </span>
                )}
              </div>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#2457D6] hover:underline inline-flex items-center gap-1"
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
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-stone-700">
          {/* Tagline / Overview */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400 mb-1">
              About This Tool
            </h4>
            <p className="text-sm leading-relaxed text-stone-800 font-sans">
              {tool.description}
            </p>
          </div>

          {/* Free Tier Allowance Card */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center gap-2 mb-1 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>What You Get Completely Free</span>
            </div>
            <p className="text-sm text-emerald-950 font-medium leading-relaxed">
              {tool.freeTierDetails}
            </p>
          </div>

          {/* Student Perk Card (if applicable) */}
          {tool.studentPerk && (
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="flex items-center gap-2 mb-1 text-purple-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Special Student Benefit</span>
              </div>
              <p className="text-xs text-purple-950 font-medium">
                {tool.studentPerk}
              </p>
            </div>
          )}

          {/* Technology & Workflow Tags */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-stone-400 mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Tags & Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200/80"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-[#F7F3EA] border-t border-[#D9D4C8] px-5 py-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2457D6] hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>Open {tool.name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
