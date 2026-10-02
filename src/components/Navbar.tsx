import { Search, Grid3X3, AlignJustify, Square, Menu, X, BookOpen, Award, Volume2, VolumeX, Bot, Brain, AlertCircle, PenTool, Compass } from 'lucide-react';
import { PaperStyle } from '../types/notebook';

interface NavbarProps {
  currentView: 'home' | 'notebook' | 'library' | 'bookmarks' | 'progress' | 'ai-desk' | 'whiteboard' | 'tools';
  onNavigate: (view: 'home' | 'notebook' | 'library' | 'bookmarks' | 'progress' | 'ai-desk' | 'whiteboard' | 'tools') => void;
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
    <header className="sticky top-0 z-40 bg-[#F7F3EA]/95 backdrop-blur-xs border-b border-[#D9D4C8] px-4 sm:px-6 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3 shrink-0 mr-2 md:mr-6">
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
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer text-left shrink-0"
          >
            <img
              src="/codeink-logo.webp"
              alt="Code Ink"
              className="w-8 h-8 rounded-lg object-contain shadow-2xs border border-[#D9D4C8]/80 group-hover:scale-105 transition-transform bg-white/60 p-0.5"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#171717] leading-none font-sans">
                CODE<span className="text-[#2457D6]">INK</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 font-semibold leading-tight">
                Engineering Notebook
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <button
            type="button"
            onClick={() => onNavigate('notebook')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'notebook'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
          >
            Notebook
          </button>

          <button
            type="button"
            onClick={() => onNavigate('library')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'library'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
          >
            Subjects
          </button>

          <button
            type="button"
            onClick={() => onNavigate('whiteboard')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'whiteboard'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
            title="Open Engineering Whiteboard & Drafting Desk"
          >
            <PenTool className="w-3.5 h-3.5 text-[#2457D6]" />
            <span>Drafting Desk</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('tools')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'tools'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
            title="100 Verified Free Tools for Students & Developers"
          >
            <Compass className="w-3.5 h-3.5 text-[#2457D6]" />
            <span>Tools (100)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('bookmarks')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              currentView === 'bookmarks'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
          >
            <span>Bookmarks</span>
            {bookmarksCount > 0 && (
              <span className="font-mono text-[10px] text-stone-500">
                ({bookmarksCount})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className={`transition-colors whitespace-nowrap ${
              currentView === 'progress'
                ? 'text-[#2457D6] font-semibold border-b-2 border-[#2457D6] pb-0.5'
                : 'hover:text-[#171717]'
            }`}
          >
            Progress
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Paper Style Selector */}
          <div className="hidden sm:flex items-center bg-[#EFEBE0] p-0.5 rounded-lg border border-[#D9D4C8] text-xs shrink-0">
            <button
              type="button"
              onClick={() => onChangePaperStyle('ruled')}
              title="Ruled paper lines"
              className={`p-1.5 rounded transition-all ${
                paperStyle === 'ruled'
                  ? 'bg-white text-[#2457D6] shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChangePaperStyle('grid')}
              title="Grid blueprint paper"
              className={`p-1.5 rounded transition-all ${
                paperStyle === 'grid'
                  ? 'bg-white text-[#2457D6] shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChangePaperStyle('plain')}
              title="Plain clean paper"
              className={`p-1.5 rounded transition-all ${
                paperStyle === 'plain'
                  ? 'bg-white text-[#2457D6] shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stationery Sound FX Toggle */}
          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? "Unmute Stationery Sound Effects" : "Mute Stationery Sound Effects"}
              className={`p-1.5 rounded-lg border transition-all text-xs cursor-pointer shrink-0 flex items-center justify-center ${
                isMuted
                  ? 'border-stone-300 bg-stone-100 text-stone-400 hover:text-stone-700'
                  : 'border-[#2457D6]/30 bg-blue-50/50 text-[#2457D6] hover:bg-blue-100/60'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* AI Study Desk Trigger (Always on a single line) */}
          {onOpenAIStudyDesk && (
            <button
              type="button"
              onClick={onOpenAIStudyDesk}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer shadow-2xs ${
                currentView === 'ai-desk'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                  : 'border-indigo-200/90 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-600 hover:text-white'
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D9D4C8] bg-white text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-colors text-xs whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            title="Search across all curriculum, code, notes, and mistakes (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Search...</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200">
              Ctrl K
            </kbd>
          </button>

          {/* Question Paper Trigger */}
          {onOpenFinalPaper && (
            <button
              type="button"
              onClick={onOpenFinalPaper}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2457D6]/40 bg-blue-50/50 text-[#2457D6] hover:bg-[#2457D6] hover:text-white transition-all text-xs font-semibold whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
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
