import { Search, Grid3X3, AlignJustify, Square, Menu, X, BookOpen, Award, Volume2, VolumeX, Bot, Brain, AlertCircle, PenTool, Compass } from 'lucide-react';
import { PaperStyle } from '../types/notebook';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentView: 'landing' | 'home' | 'notebook' | 'library' | 'bookmarks' | 'progress' | 'ai-desk' | 'whiteboard' | 'tools';
  onNavigate: (view: 'landing' | 'home' | 'notebook' | 'library' | 'bookmarks' | 'progress' | 'ai-desk' | 'whiteboard' | 'tools') => void;
  onOpenSearch: () => void;
  paperStyle: PaperStyle;
  onChangePaperStyle: (style: PaperStyle) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  bookmarksCount: number;
  onOpenFinalPaper?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onOpenAIStudyDesk?: () => void;
  onOpenRevisionMode?: () => void;
  onOpenMistakeNotebook?: () => void;
}

export function Navbar({
  currentView,
  onNavigate,
  onOpenSearch,
  paperStyle,
  onChangePaperStyle,
  mobileMenuOpen,
  onToggleMobileMenu,
  bookmarksCount,
  onOpenFinalPaper,
  isMuted = false,
  onToggleMute,
  onOpenAIStudyDesk,
  onOpenRevisionMode,
  onOpenMistakeNotebook
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-app/95 backdrop-blur-xs border-b border-line px-3 sm:px-5 lg:px-8 py-2.5">
      <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-2 lg:gap-4">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-2.5 shrink-0 mr-1 lg:mr-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 text-stone-700 hover:text-stone-900 rounded"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="group flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer text-left shrink-0"
            title="Return to CODEINK Landing Page"
          >
            <img
              src="/codeink-logo.webp"
              alt="Code Ink"
              className="w-8 h-8 rounded-lg object-contain shadow-2xs border border-line group-hover:scale-105 transition-transform bg-white/60 p-0.5"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-ink leading-none font-sans">
                CODE<span className="text-accent">INK</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted font-semibold leading-tight">
                Engineering Notebook
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-2.5 lg:gap-3.5 xl:gap-5 text-xs sm:text-[13px] font-medium text-muted shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('notebook')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'notebook'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
          >
            Notebook
          </button>

          <button
            type="button"
            onClick={() => onNavigate('library')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'library'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
          >
            Subjects
          </button>

          <button
            type="button"
            onClick={() => onNavigate('whiteboard')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'whiteboard'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
            title="Open Engineering Whiteboard & Drafting Desk"
          >
            <PenTool className="w-3.5 h-3.5 text-accent" />
            <span>Drafting Desk</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('tools')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'tools'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
            title="100 Verified Free Tools for Students & Developers"
          >
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>Tools (100)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('bookmarks')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'bookmarks'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
          >
            <span>Bookmarks</span>
            {bookmarksCount > 0 && (
              <span className="font-mono text-[10px] text-muted">
                ({bookmarksCount})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'progress'
                ? 'text-accent font-semibold border-b-2 border-accent pb-0.5'
                : 'hover:text-ink'
            }`}
          >
            Progress
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
          {/* Paper Style Selector */}
          <div className="hidden sm:flex items-center bg-raised p-0.5 rounded-lg border border-line text-xs shrink-0">
            <button
              type="button"
              onClick={() => onChangePaperStyle('ruled')}
              title="Ruled paper lines"
              className={`p-1.5 rounded transition-all cursor-pointer ${
                paperStyle === 'ruled'
                  ? 'bg-page text-accent shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChangePaperStyle('grid')}
              title="Grid blueprint paper"
              className={`p-1.5 rounded transition-all cursor-pointer ${
                paperStyle === 'grid'
                  ? 'bg-page text-accent shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChangePaperStyle('plain')}
              title="Plain clean paper"
              className={`p-1.5 rounded transition-all cursor-pointer ${
                paperStyle === 'plain'
                  ? 'bg-page text-accent shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Toggle (Light / Dark / System) */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Stationery Sound FX Toggle */}
          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? "Unmute Stationery Sound Effects" : "Mute Stationery Sound Effects"}
              className={`p-1.5 rounded-lg border transition-all text-xs cursor-pointer shrink-0 flex items-center justify-center ${
                isMuted
                  ? 'border-line bg-raised text-muted hover:text-ink'
                  : 'border-accent/40 bg-accent-soft text-accent hover:opacity-90'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* AI Study Desk Trigger */}
          {onOpenAIStudyDesk && (
            <button
              type="button"
              onClick={onOpenAIStudyDesk}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer shadow-2xs ${
                currentView === 'ai-desk'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                  : 'border-indigo-200/90 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white'
              }`}
              title="Open AI Engineering Study Desk"
            >
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap inline-block leading-none">AI Desk</span>
            </button>
          )}

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg border border-line bg-raised text-muted hover:border-stone-400 hover:text-ink transition-colors text-xs whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            title="Search across all curriculum, code, notes, and mistakes (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-muted shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Search...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-page text-muted px-1 py-0.5 rounded border border-line">
              Ctrl K
            </kbd>
          </button>

          {/* Question Paper Trigger */}
          {onOpenFinalPaper && (
            <button
              type="button"
              onClick={onOpenFinalPaper}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#2457D6]/40 bg-blue-50/50 text-[#2457D6] hover:bg-[#2457D6] hover:text-white transition-all text-xs font-semibold whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
              title="Official Question Paper Examination (50 Marks · 3 Sets)"
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Question Paper (50M)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
