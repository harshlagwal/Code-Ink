import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import {
  Subject,
  TopicContent,
  PaperStyle,
  HighlightTool,
  UserHighlight,
  StickyNote,
} from '../../types/notebook';
import { SectionNav, DiarySectionId } from './SectionNav';
import { PageTurn } from './PageTurn';
import { DiaryPage } from './DiaryPage';
import { MobileBottomBar } from './MobileBottomBar';
import { ReadingSettingsSheet, DiaryFontSize } from './ReadingSettingsSheet';
import { notebookAudio } from '../../utils/audioEffects';
import { ChevronDown, BookOpen, Bookmark, Sparkles, SlidersHorizontal, List, ArrowLeft, Volume2 } from 'lucide-react';
import { ReadAloudBar } from '../ReadAloudBar';
import { topicToSpeech } from '../../utils/speechText';

// Lazy-load FullScreenCompilerSheet per PRD 7.7
const FullScreenCompilerSheet = lazy(() => import('./FullScreenCompilerSheet'));

interface MobileDiaryReaderProps {
  currentTopic: TopicContent;
  nextTopic?: TopicContent;
  prevTopic?: TopicContent;
  subject: Subject;
  chapterTitle: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  paperStyle: PaperStyle;
  savedNote?: string;
  selectedTool: HighlightTool;
  userHighlights: UserHighlight[];
  stickyNotes: StickyNote[];
  onAddSticky?: (note: Omit<StickyNote, 'id' | 'createdAt'>) => void;
  onUpdateSticky?: (id: string, updates: Partial<StickyNote>) => void;
  onDeleteSticky?: (id: string) => void;
  onAddHighlight?: (highlight: UserHighlight) => void;
  onRemoveHighlight?: (id: string) => void;
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  onSaveNote: (topicId: string, note: string) => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onCloseBook?: () => void;
  onSelectTopicById?: (topicId: string) => void;
  onOpenFinalPaper?: () => void;
  onOpenFlashcards?: () => void;
  onOpenAIStudyDesk?: (snippet?: string) => void;
  onOpenMistakeNotebook?: () => void;
  onSelectTopic?: (topic: TopicContent) => void;
}

/**
 * MobileDiaryReader
 * Purpose-built, mobile-only reading experience for CODEINK.
 * Renders the notebook as a single portrait diary page with a top-origin page turn.
 * Reference: PRD Section 7 & 9
 */
export const MobileDiaryReader: React.FC<MobileDiaryReaderProps> = ({
  currentTopic,
  nextTopic,
  prevTopic,
  subject,
  chapterTitle,
  isBookmarked,
  isCompleted,
  paperStyle: initialPaperStyle,
  savedNote = '',
  selectedTool,
  userHighlights,
  stickyNotes,
  onAddSticky,
  onUpdateSticky,
  onDeleteSticky,
  onAddHighlight,
  onRemoveHighlight,
  onToggleBookmark,
  onToggleCompleted,
  onSaveNote,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onCloseBook,
  onSelectTopicById,
  onOpenFinalPaper,
  onOpenFlashcards,
  onOpenAIStudyDesk,
  onOpenMistakeNotebook,
  onSelectTopic,
}) => {
  // Navigation direction for top-origin page-turn animation
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const prevTopicIdRef = useRef<string>(currentTopic.id);

  // Compiler sheet state
  const [isCompilerOpen, setIsCompilerOpen] = useState(false);
  const scrollPositionBeforeCompiler = useRef<number>(0);

  // Reading settings state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [paperStyle, setPaperStyle] = useState<PaperStyle>(() => {
    try {
      const saved = localStorage.getItem('codeink_paper_style');
      return (saved as PaperStyle) || initialPaperStyle || 'ruled';
    } catch {
      return initialPaperStyle || 'ruled';
    }
  });

  const [fontSize, setFontSize] = useState<DiaryFontSize>(() => {
    try {
      const saved = localStorage.getItem('codeink_font_size');
      return (saved as DiaryFontSize) || 'm';
    } catch {
      return 'm';
    }
  });

  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('codeink_reduce_motion');
      if (saved !== null) return JSON.parse(saved);
      return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });

  // Chapter quick jump sheet
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);

  // Text-to-Speech (Read Aloud) state
  const [isReadAloudOpen, setIsReadAloudOpen] = useState(false);

  // Sync turn direction and reset scroll position to top when topic changes per PRD 7.4
  useEffect(() => {
    if (prevTopicIdRef.current !== currentTopic.id) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      prevTopicIdRef.current = currentTopic.id;
    }
  }, [currentTopic.id]);

  const handleNextWithDirection = useCallback(() => {
    setTurnDirection('next');
    onNext();
  }, [onNext]);

  const handlePrevWithDirection = useCallback(() => {
    setTurnDirection('prev');
    onPrev();
  }, [onPrev]);

  // Touch Swipe Gesture Support (PRD 7.4: swipe up = next, swipe down = prev, or horizontal swipe)
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: performance.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const diffX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const diffY = e.changedTouches[0].clientY - touchStartPos.current.y;
    const elapsed = performance.now() - touchStartPos.current.time;

    // Only deliberate, intentional HORIZONTAL swipe to flip topics (threshold: 75px, predominantly horizontal, quick flick)
    // NEVER intercept vertical motion, because vertical gestures are strictly for reading & scrolling the diary page!
    if (Math.abs(diffX) > 75 && Math.abs(diffX) > Math.abs(diffY) * 2.5 && elapsed < 500) {
      if (diffX < 0 && hasNext) {
        handleNextWithDirection();
      } else if (diffX > 0 && hasPrev) {
        handlePrevWithDirection();
      }
    }

    touchStartPos.current = null;
  };

  // Compiler open / close preserving exact scroll position per PRD 7.7
  const handleOpenCompiler = () => {
    scrollPositionBeforeCompiler.current = window.scrollY;
    setIsCompilerOpen(true);
  };

  const handleCloseCompiler = () => {
    setIsCompilerOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPositionBeforeCompiler.current,
        behavior: 'instant',
      });
    });
  };

  // Preference updates with localStorage persistence
  const handleSelectPaperStyle = (style: PaperStyle) => {
    setPaperStyle(style);
    try {
      localStorage.setItem('codeink_paper_style', style);
    } catch {}
  };

  const handleSelectFontSize = (size: DiaryFontSize) => {
    setFontSize(size);
    try {
      localStorage.setItem('codeink_font_size', size);
    } catch {}
  };

  const handleToggleReduceMotion = (enabled: boolean) => {
    setReduceMotion(enabled);
    try {
      localStorage.setItem('codeink_reduce_motion', JSON.stringify(enabled));
    } catch {}
  };

  // Calculate total topics in active subject
  const totalTopics = subject.chapters.reduce((acc, ch) => acc + (ch.topics?.length || 0), 0);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`h-[100dvh] w-full bg-app text-ink pb-14 flex flex-col items-center tool-selection-${selectedTool} overflow-hidden`}
    >
      {/* ---------------- STICKY TOP APP HEADER ---------------- */}
      <header className="sticky top-0 z-30 w-full bg-page/95 backdrop-blur-md border-b border-line shadow-xs px-3 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {onCloseBook && (
            <button
              type="button"
              onClick={onCloseBook}
              className="p-1.5 -ml-1 text-muted hover:text-ink rounded-lg hover:bg-raised cursor-pointer"
              aria-label="Back to Library"
              title="Close Diary"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* Subject & Chapter quick jump button */}
          <button
            type="button"
            onClick={() => setIsQuickJumpOpen(true)}
            className="flex items-center gap-1.5 text-left min-w-0 cursor-pointer p-1 rounded-lg hover:bg-raised transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-accent-soft text-accent flex items-center justify-center font-bold text-xs shrink-0 border border-accent/30">
              {subject.name.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold leading-none flex items-center gap-1">
                <span>{subject.name}</span>
                <ChevronDown className="w-3 h-3 text-muted" />
              </div>
              <div className="text-xs font-bold text-ink truncate leading-tight mt-0.5">
                {currentTopic.title}
              </div>
            </div>
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* AI Desk shortcut if provided */}
          {onOpenAIStudyDesk && (
            <button
              type="button"
              onClick={() => onOpenAIStudyDesk(currentTopic.example?.code)}
              className="p-2 rounded-lg text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
              title="Ask AI Study Desk"
              aria-label="Ask AI Desk"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Read Aloud (TTS) Button */}
          <button
            type="button"
            onClick={() => setIsReadAloudOpen((prev) => !prev)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isReadAloudOpen
                ? 'text-white bg-accent border-accent shadow-xs'
                : 'text-muted hover:text-ink hover:bg-raised border-transparent'
            }`}
            title="Listen to this topic (Read Aloud)"
            aria-label="Listen to this topic"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isReadAloudOpen ? 'animate-pulse' : ''}`} />
          </button>

          {/* Quick Jump List Button */}
          <button
            type="button"
            onClick={() => setIsQuickJumpOpen(true)}
            className="p-2 rounded-lg text-muted hover:text-ink hover:bg-raised transition-colors cursor-pointer"
            title="All Topics"
            aria-label="Topic list"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ---------------- SECTION SHORTCUT CHIPS (SCROLL-SPY) ---------------- */}
      <SectionNav
        hasCode={!!currentTopic.example}
        hasPractice={!!(currentTopic.practiceQuestions?.length || currentTopic.practice)}
        hasViva={!!(currentTopic.commonMistakes?.length || currentTopic.tip || currentTopic.interviewNote)}
      />

      {/* ---------------- MAIN READING WORKSPACE WITH PHYSICAL DIARY HARDCOVER ---------------- */}
      <main className="w-full max-w-xl px-2 sm:px-3 pt-1 pb-1 flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Physical Diary Hardcover Base Frame */}
        <div className="relative w-full h-full bg-[#1E232A] rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 pt-2.5 book-hardcover-base border-2 border-stone-800 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden">
          {/* Subtle Leather Texture Overlay */}
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-12 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#FFF 0.75px, transparent 0.75px)`,
              backgroundSize: '10px 10px',
            }}
          />

          {/* Hardcover Top Spine Header & Ribbon Bookmark */}
          <div className="relative shrink-0 flex items-center justify-between px-3 py-1 mb-1 border-b border-stone-700/60 text-[10px] font-mono select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
              <span className="tracking-widest uppercase font-semibold text-stone-300">CODEINK DIARY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-stone-400 font-mono">
                Ch {String(currentTopic.chapterNumber).padStart(2, '0')} · Pg {String(currentTopic.pageNumber).padStart(2, '0')}
              </span>
              {/* Crimson Bookmark Ribbon Accent Hanging */}
              <div
                className="w-3.5 h-4 bg-linear-to-b from-rose-700 via-rose-800 to-amber-700 rounded-b-xs shadow-xs border-t border-rose-500/30"
                title="Bookmark Ribbon"
              />
            </div>
          </div>

          {/* Inner Diary Paper Core Leaf */}
          <div className="relative flex-1 min-h-0 w-full rounded-xl overflow-hidden shadow-inner flex flex-col bg-[#FFFDF7]">
            <PageTurn
              pageKey={currentTopic.id}
              direction={turnDirection}
              isReducedMotion={reduceMotion}
              className="w-full h-full flex flex-col min-h-0 flex-1"
            >
              <DiaryPage
                topic={currentTopic}
                subject={subject}
                chapterTitle={chapterTitle}
                isBookmarked={isBookmarked}
                isCompleted={isCompleted}
                paperStyle={paperStyle}
                fontSize={fontSize}
                savedNote={savedNote}
                selectedTool={selectedTool}
                userHighlights={userHighlights}
                stickyNotes={stickyNotes}
                onToggleBookmark={onToggleBookmark}
                onToggleCompleted={onToggleCompleted}
                onSaveNote={onSaveNote}
                onAddSticky={onAddSticky}
                onUpdateSticky={onUpdateSticky}
                onDeleteSticky={onDeleteSticky}
                onRemoveHighlight={onRemoveHighlight}
                onOpenCompiler={handleOpenCompiler}
                onSelectTopicById={onSelectTopicById}
                onPrev={handlePrevWithDirection}
                onNext={handleNextWithDirection}
                hasPrev={hasPrev}
                hasNext={hasNext}
                prevTopicTitle={prevTopic?.title}
                nextTopicTitle={nextTopic?.title}
              />
            </PageTurn>
          </div>
        </div>
      </main>

      {/* ---------------- MOBILE BOTTOM BAR NAVIGATION ---------------- */}
      <MobileBottomBar
        currentPageNumber={currentTopic.pageNumber}
        totalTopics={totalTopics}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={handlePrevWithDirection}
        onNext={handleNextWithDirection}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenQuickJump={() => setIsQuickJumpOpen(true)}
      />

      {/* ---------------- READING SETTINGS SHEET ---------------- */}
      <ReadingSettingsSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        paperStyle={paperStyle}
        onSelectPaperStyle={handleSelectPaperStyle}
        fontSize={fontSize}
        onSelectFontSize={handleSelectFontSize}
        reduceMotion={reduceMotion}
        onToggleReduceMotion={handleToggleReduceMotion}
      />

      {/* ---------------- LAZY FULL-SCREEN COMPILER SHEET ---------------- */}
      {isCompilerOpen && currentTopic.example && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 bg-[#141619] flex items-center justify-center text-stone-300 font-mono text-xs">
              Loading compiler sandbox...
            </div>
          }
        >
          <FullScreenCompilerSheet
            isOpen={isCompilerOpen}
            onClose={handleCloseCompiler}
            initialCode={currentTopic.example.code}
            language={currentTopic.example.language}
            expectedOutput={currentTopic.example.output}
            topicTitle={currentTopic.title}
          />
        </Suspense>
      )}

      {/* ---------------- QUICK JUMP CHAPTERS & TOPICS DRAWER ---------------- */}
      {isQuickJumpOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick Jump Topic Menu"
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        >
          <div className="w-80 max-w-[85vw] bg-[#FFFDF7] h-full p-4 shadow-2xl flex flex-col border-l border-[#D9D4C8] notebook-plain animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C8]">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#2457D6] tracking-wider">
                  {subject.name} Topics
                </span>
                <h3 className="font-bold text-sm text-[#171717] font-sans">Topic Index</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickJumpOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
                aria-label="Close Quick Jump Menu"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-3 space-y-4 pr-1 index-scrollbar">
              {subject.chapters.map(chapter => (
                <div key={chapter.id} className="space-y-1">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-500 px-2 py-0.5">
                    Ch {String(chapter.number).padStart(2, '0')} · {chapter.title}
                  </div>
                  <div className="space-y-0.5">
                    {chapter.topics.map(t => {
                      const isActive = t.id === currentTopic.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            if (onSelectTopic) onSelectTopic(t);
                            else if (onSelectTopicById) onSelectTopicById(t.id);
                            setIsQuickJumpOpen(false);
                            notebookAudio.playPageTurn();
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#2457D6] text-white font-semibold shadow-xs'
                              : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                          }`}
                        >
                          <span className="truncate pr-2">{t.title}</span>
                          <span
                            className={`font-mono text-[10px] shrink-0 ${
                              isActive ? 'text-blue-100' : 'text-stone-400'
                            }`}
                          >
                            Pg {String(t.pageNumber).padStart(2, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsQuickJumpOpen(false)} />
        </div>
      )}

      {/* ---------------- READ ALOUD (TTS) PLAYER ---------------- */}
      {isReadAloudOpen && (
        <ReadAloudBar
          text={topicToSpeech(currentTopic)}
          topicTitle={currentTopic.title}
          onClose={() => setIsReadAloudOpen(false)}
        />
      )}
    </div>
  );
};
