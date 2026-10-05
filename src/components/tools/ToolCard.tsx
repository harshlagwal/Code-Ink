import { useState } from 'react';
import { ExternalLink, Star, Info, Copy, Check, GraduationCap, Sparkles } from 'lucide-react';
import { DevTool } from '../../types/tool';
import { ToolLogo } from './ToolLogo';

interface ToolCardProps {
  tool: DevTool;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
  onSelectTool: (tool: DevTool) => void;
}

export function ToolCard({
  tool,
  isBookmarked,
  onToggleBookmark,
  onSelectTool,
}: ToolCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPricingBadge = () => {
    switch (tool.pricingType) {
      case 'free-forever':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Free Forever
          </span>
        );
      case 'student-pack':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
            <GraduationCap className="w-3 h-3" />
            Student Pack
          </span>
        );
      case 'open-source':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            Open Source
          </span>
        );
      case 'generous-tier':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
            Free Tier
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelectTool(tool)}
      className="group relative flex flex-col justify-between bg-raised rounded-xl border border-line hover:border-accent p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer select-none"
    >
      {/* Top Header: Logo, Name, Domain, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <ToolLogo tool={tool} size="md" className="group-hover:scale-105" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-bold text-ink group-hover:text-accent transition-colors truncate">
                  {tool.name}
                </h3>
                {tool.featured && (
                  <span
                    title="Featured Student Pick"
                    className="inline-flex items-center text-amber-500"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-muted block truncate">
                {tool.domain}
              </span>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(tool.id);
            }}
            title={isBookmarked ? 'Remove from saved tools' : 'Save tool to notebook favorites'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
              isBookmarked
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                : 'bg-page border-line text-muted hover:text-ink hover:bg-raised'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {getPricingBadge()}
          {tool.studentPerk && (
            <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded bg-page text-muted border border-line">
              🎓 Student Perk
            </span>
          )}
        </div>

        {/* One-Line Value Proposition */}
        <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-3">
          {tool.description}
        </p>

        {/* Free Tier Highlight Box */}
        <div className="p-2 rounded-lg bg-code border border-line text-[11px] text-ink mb-3">
          <span className="font-semibold text-accent block font-mono text-[10px] uppercase tracking-wider mb-0.5">
            Free Allowance
          </span>
          <p className="line-clamp-2">{tool.freeTierDetails}</p>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono bg-page hover:bg-code text-muted px-2 py-0.5 rounded border border-line transition-colors"
            >
              #{tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-[10px] font-mono text-muted">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2.5 border-t border-line flex items-center justify-between gap-2 mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectTool(tool);
          }}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent font-medium transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy Website Link"
            className="p-1.5 rounded-md hover:bg-page text-muted hover:text-ink transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
