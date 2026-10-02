import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Star,
  Sparkles,
  GraduationCap,
  SlidersHorizontal,
  Compass,
  Bot,
  Cloud,
  Database,
  Code,
  Palette,
  Send,
  BookOpen,
  Wrench,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { DevTool, ToolCategory, PricingType } from '../../types/tool';
import { DEV_TOOLS, TOOL_CATEGORIES } from '../../data/toolsData';
import { ToolCard } from './ToolCard';
import { ToolDetailsModal } from './ToolDetailsModal';

interface ToolsVaultViewProps {
  onGoToNotebook?: () => void;
}

const CATEGORY_ICONS: Record<ToolCategory, React.ComponentType<{ className?: string }>> = {
  all: Compass,
  ai: Bot,
  cloud: Cloud,
  database: Database,
  ide: Code,
  design: Palette,
  api: Send,
  learning: BookOpen,
  utilities: Wrench,
};

export function ToolsVaultView({ onGoToNotebook }: ToolsVaultViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [selectedPricing, setSelectedPricing] = useState<PricingType>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'category'>('featured');
  const [selectedToolForModal, setSelectedToolForModal] = useState<DevTool | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Bookmarks state (persisted in localStorage)
  const [bookmarkedToolIds, setBookmarkedToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_saved_tools');
      return saved ? JSON.parse(saved) : ['tool-google-ai-studio', 'tool-supabase', 'tool-github-student-pack'];
    } catch {
      return ['tool-google-ai-studio', 'tool-supabase', 'tool-github-student-pack'];
    }
  });

  const handleToggleBookmark = (toolId: string) => {
    setBookmarkedToolIds((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('codeink_saved_tools', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save bookmarks', err);
      }
      return next;
    });
  };

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search logic
  const filteredTools = useMemo(() => {
    return DEV_TOOLS.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Pricing filter
      if (selectedPricing !== 'all' && tool.pricingType !== selectedPricing) {
        return false;
      }

      // Bookmarked filter
      if (onlyBookmarked && !bookmarkedToolIds.includes(tool.id)) {
        return false;
      }

      // Search query (fuzzy name, description, tags, domain)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesDomain = tool.domain.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        const matchesFreeTier = tool.freeTierDetails.toLowerCase().includes(q);

        if (!matchesName && !matchesDesc && !matchesDomain && !matchesTags && !matchesFreeTier) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedPricing, onlyBookmarked, sortBy, bookmarkedToolIds]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setOnlyBookmarked(false);
    setSortBy('featured');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DEV_TOOLS.length };
    for (const tool of DEV_TOOLS) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="w-full space-y-6 pb-16">
      {/* 1. HERO BANNER: Engineering Workshop Style */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-[#D9D4C8] shadow-xs p-6 sm:p-8 md:p-10">
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#2457d6_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2457D6] text-xs font-semibold font-mono tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-[#2457D6]" />
              CODE INK ARSENAL · 100 VERIFIED FREE TOOLS
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Student Tested
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight font-sans leading-tight mb-3">
            Every tool you need to build, deploy, & ship. <span className="text-[#2457D6] underline decoration-blue-200 decoration-wavy underline-offset-6">Completely Free.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans max-w-3xl mb-6">
            A hand-curated directory of 100 premier developer tools offering generous free tiers, student developer pack partnerships, and open-source models—complete with live logos, direct documentation, and allowance specs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-xs font-mono text-stone-600 pt-2 border-t border-[#D9D4C8]/80">
            <div>
              <span className="font-bold text-stone-900 text-sm">100</span> Curated Tools
            </div>
            <div className="w-1 h-1 rounded-full bg-stone-300" />
            <div>
              <span className="font-bold text-stone-900 text-sm">8</span> Domains
            </div>
            <div className="w-1 h-1 rounded-full bg-stone-300" />
            <div>
              <span className="font-bold text-stone-900 text-sm">₹0 / $0</span> Cost Required
            </div>
            <div className="w-1 h-1 rounded-full bg-stone-300" />
            <div>
              <span className="font-bold text-amber-600 text-sm">{bookmarkedToolIds.length}</span> Saved in Notebook
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CONTROLS TOOLBAR */}
      <section className="bg-white rounded-xl border border-[#D9D4C8] shadow-2xs p-4 space-y-4">
        {/* Top Search Line */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name, tag (#postgres, #ai), or domain (Ctrl + K)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#D9D4C8] bg-[#FFFDF7] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2457D6]/30 focus:border-[#2457D6] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Bookmarks Toggle */}
            <button
              type="button"
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                onlyBookmarked
                  ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-2xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Saved ({bookmarkedToolIds.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-8 pr-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2457D6]/30"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="name">Sort: Name (A-Z)</option>
                <option value="category">Sort: By Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {TOOL_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Compass;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2457D6] text-white border-[#2457D6] shadow-xs'
                    : 'bg-white text-stone-600 border-[#D9D4C8] hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pricing Secondary Filter Badges */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#D9D4C8]/60 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-400 font-mono text-[11px] mr-1">Tiers:</span>
            {[
              { id: 'all', label: 'All Tiers' },
              { id: 'free-forever', label: '100% Free Forever' },
              { id: 'generous-tier', label: 'Generous Free Tier' },
              { id: 'student-pack', label: 'Student Pack Partner' },
              { id: 'open-source', label: 'Open Source' },
            ].map((p) => {
              const active = selectedPricing === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPricing(p.id as PricingType)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Active Results Counter */}
          <div className="text-xs font-mono text-stone-500">
            Showing <span className="font-bold text-[#171717]">{filteredTools.length}</span> of {DEV_TOOLS.length} tools
          </div>
        </div>
      </section>

      {/* 3. TOOL CARDS GRID WITH ANIMATION */}
      {filteredTools.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <ToolCard
                  tool={tool}
                  isBookmarked={bookmarkedToolIds.includes(tool.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectTool={setSelectedToolForModal}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-dashed border-[#D9D4C8] p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800 mb-1">No developer tools found</h3>
          <p className="text-xs text-stone-500 mb-4">
            No tools matched your current search query or filter combination.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2457D6] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* 4. MODAL FOR TOOL DETAILS & SPECIFICATIONS */}
      <ToolDetailsModal
        tool={selectedToolForModal}
        isOpen={Boolean(selectedToolForModal)}
        onClose={() => setSelectedToolForModal(null)}
        isBookmarked={Boolean(selectedToolForModal && bookmarkedToolIds.includes(selectedToolForModal.id))}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
