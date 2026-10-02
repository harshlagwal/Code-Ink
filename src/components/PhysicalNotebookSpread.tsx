import { useState, useRef, useEffect, useCallback } from 'react';
import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, FileText, Highlighter, Award, Brain, Printer, Bot, AlertCircle, BookOpen, Layers, PenLine, Code2, AlertTriangle, Target, Lightbulb } from 'lucide-react';
import { Subject, TopicContent, PaperStyle, HighlightColor, HighlightTool, UserHighlight, StickyNote } from '../types/notebook';
import { CodeBlock } from './ContentBlocks/CodeBlock';
import { DiagramBlock } from './ContentBlocks/DiagramBlock';
import { HighlightBlock } from './ContentBlocks/HighlightBlock';
import { WarningBlock } from './ContentBlocks/WarningBlock';
import { TipBlock } from './ContentBlocks/TipBlock';
import { PracticeSession } from './PracticeSession';
import { MarginNotesBlock } from './ContentBlocks/MarginNotesBlock';
import { HighlightedText } from './HighlightedText';
import { MarginCodePlayground } from './MarginCodePlayground';
import { StickyNotesLayer } from './StickyNotesLayer';
import { notebookAudio } from '../utils/audioEffects';

interface PhysicalNotebookSpreadProps {
  currentTopic: TopicContent;
  nextTopic: TopicContent | null;
  prevTopic: TopicContent | null;
  subject: Subject;
  chapterTitle: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  paperStyle: PaperStyle;
  savedNote?: string;
  selectedTool?: HighlightTool;
  userHighlights?: UserHighlight[];
  stickyNotes?: StickyNote[];
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
  onOpenPrintExport?: () => void;
  onOpenAIStudyDesk?: (queryOrSnippet?: string) => void;
  onOpenMistakeNotebook?: () => void;
}

export function PhysicalNotebookSpread({
  currentTopic,
  nextTopic,
  prevTopic,
  subject,
  chapterTitle,
  isBookmarked,
  isCompleted,
  paperStyle,
  savedNote = '',
  selectedTool = 'yellow',
  userHighlights = [],
  stickyNotes = [],
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
  onOpenPrintExport,
  onOpenAIStudyDesk,
  onOpenMistakeNotebook
}: PhysicalNotebookSpreadProps) {
  // Page turning animation state
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [turnProgress, setTurnProgress] = useState(0); // 0 to 1
  const [isTurning, setIsTurning] = useState(false);

  // Mobile active page view: 'left' (Theory) or 'right' (Practice/Code)
  const [mobilePageTab, setMobilePageTab] = useState<'left' | 'right'>('left');

  // Idea 1: Internal Book Tabs (Thumb-Index Navigation)
  const [leftPageTab, setLeftPageTab] = useState<'theory' | 'diagram' | 'notes'>('theory');
  const [rightPageTab, setRightPageTab] = useState<'code' | 'traps' | 'practice'>('code');

  // Reset tabs to primary views when switching topics
  useEffect(() => {
    setLeftPageTab('theory');
    setRightPageTab('code');
  }, [currentTopic.id]);

  // Floating selection highlight button position
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionCoords, setSelectionCoords] = useState<{ x: number; y: number } | null>(null);

  // Physical page numbers: Left is Even, Right is Odd
  const leftPageNum = String(currentTopic.pageNumber * 2).padStart(2, '0');
  const rightPageNum = String(currentTopic.pageNumber * 2 + 1).padStart(2, '0');
  const totalPages = subject.chapters.reduce((acc, ch) => acc + (ch.topics?.length || 0), 0) * 2;

  // Listen to text selection across notebook pages
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectedText('');
        setSelectionCoords(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length >= 2) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectedText(text);
          setSelectionCoords({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          });

          // Auto-apply if a pen is actively selected (not eraser)
          if (selectedTool && selectedTool !== 'eraser' && onAddHighlight) {
            onAddHighlight({
              id: 'hl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
              topicId: currentTopic.id,
              text,
              color: selectedTool, // EXACT selected pen color!
              createdAt: new Date().toISOString()
            });
            selection.removeAllRanges();
            setSelectedText('');
            setSelectionCoords(null);
          }
        } catch {
          // ignore selection errors
        }
      } else {
        setSelectedText('');
        setSelectionCoords(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [selectedTool, currentTopic.id, onAddHighlight]);

  const handleApplySelectionHighlight = (color: HighlightColor) => {
    if (!selectedText || !onAddHighlight) return;
    onAddHighlight({
      id: 'hl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      topicId: currentTopic.id,
      text: selectedText,
      color,
      createdAt: new Date().toISOString()
    });
    window.getSelection()?.removeAllRanges();
    setSelectedText('');
    setSelectionCoords(null);
  };

  // Trigger Next Page Turn (or Close Book if on final topic)
  const handleTriggerNext = useCallback(() => {
    if (isTurning) return;
    if (!hasNext) {
      if (onCloseBook) {
        onCloseBook();
      }
      return;
    }
    if (!nextTopic) return;
    notebookAudio.playPageTurn();
    setIsTurning(true);
    setTurnDirection('next');

    const startTime = performance.now();
    const duration = 750;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawP = Math.min(1, elapsed / duration);
      const p = rawP < 0.5 ? 4 * rawP * rawP * rawP : 1 - Math.pow(-2 * rawP + 2, 3) / 2;
      setTurnProgress(p);

      if (rawP < 1) {
        requestAnimationFrame(animate);
      } else {
        onNext();
        setIsTurning(false);
        setTurnDirection(null);
        setTurnProgress(0);
      }
    };

    requestAnimationFrame(animate);
  }, [isTurning, hasNext, nextTopic, onNext, onCloseBook]);

  // Trigger Previous Page Turn
  const handleTriggerPrev = useCallback(() => {
    if (isTurning || !hasPrev || !prevTopic) return;
    notebookAudio.playPageTurn();
    setIsTurning(true);
    setTurnDirection('prev');

    const startTime = performance.now();
    const duration = 750;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawP = Math.min(1, elapsed / duration);
      const p = rawP < 0.5 ? 4 * rawP * rawP * rawP : 1 - Math.pow(-2 * rawP + 2, 3) / 2;
      setTurnProgress(p);

      if (rawP < 1) {
        requestAnimationFrame(animate);
      } else {
        onPrev();
        setIsTurning(false);
        setTurnDirection(null);
        setTurnProgress(0);
      }
    };

    requestAnimationFrame(animate);
  }, [isTurning, hasPrev, prevTopic, onPrev]);

  // Keyboard Arrow navigation with full 3D page flip animation & sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        (target.closest && target.closest('[contenteditable="true"]'))
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleTriggerNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handleTriggerPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerNext, handleTriggerPrev]);

  // Touch Swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX < -50 && hasNext) {
      handleTriggerNext();
    } else if (diffX > 50 && hasPrev) {
      handleTriggerPrev();
    }
    touchStartX.current = null;
  };

  const paperClass =
    paperStyle === 'ruled'
      ? 'notebook-ruled'
      : paperStyle === 'grid'
      ? 'notebook-grid'
      : 'notebook-plain';

  // Filter user highlights specific to current topic
  const topicHighlights = userHighlights.filter(h => h.topicId === currentTopic.id);

  return (
    <div
      className={`relative w-full flex flex-col items-center tool-selection-${selectedTool}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating Selection Highlighter Badge (Appears when text is selected while in eraser mode) */}
      {selectionCoords && selectedText && selectedTool === 'eraser' && (
        <div
          className="fixed z-50 -translate-x-1/2 -translate-y-full mb-2 bg-[#FFFDF7] border border-[#D9D4C8] shadow-xl rounded-full px-3 py-1 flex items-center gap-1.5 animate-in fade-in zoom-in-95 select-none"
          style={{
            left: `${selectionCoords.x}px`,
            top: `${selectionCoords.y}px`
          }}
        >
          <span className="font-handwritten text-xs text-stone-600 mr-1">Highlight:</span>
          {(['green', 'blue', 'yellow', 'red'] as HighlightColor[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleApplySelectionHighlight(c)}
              className="w-4 h-4 rounded-full border border-stone-400 hover:scale-125 transition-transform"
              style={{
                backgroundColor:
                  c === 'green' ? '#22C55E' : c === 'blue' ? '#3B82F6' : c === 'yellow' ? '#EAB308' : '#EF4444'
              }}
              title={`Highlight with ${c} pen`}
            />
          ))}
        </div>
      )}

      {/* Top Page Bar: Quick Actions, Final Exam Trigger & Navigation Hints */}
      <div className="w-full flex items-center justify-between pb-3 px-2 text-xs text-stone-600 select-none">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleBookmark}
            disabled={isTurning}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              isBookmarked
                ? 'bg-[#2457D6]/10 text-[#2457D6] border-[#2457D6]/30'
                : 'bg-white text-stone-600 border-[#D9D4C8] hover:text-[#2457D6]'
            }`}
            title="Bookmark (K)"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark (K)'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleCompleted}
            disabled={isTurning}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-600 border-[#D9D4C8] hover:text-emerald-700'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-emerald-600 text-white' : ''}`} />
            <span>{isCompleted ? 'Mastered' : 'Mark Mastered'}</span>
          </button>


        </div>

        {/* Mobile Page Switcher */}
        <div className="flex md:hidden items-center bg-[#EFEBE0] p-0.5 rounded border border-[#D9D4C8] text-xs">
          <button
            type="button"
            onClick={() => setMobilePageTab('left')}
            className={`px-2 py-0.5 rounded font-mono text-[11px] ${
              mobilePageTab === 'left' ? 'bg-white text-[#2457D6] font-bold shadow-xs' : 'text-stone-500'
            }`}
          >
            Pg {leftPageNum} (Theory)
          </button>
          <button
            type="button"
            onClick={() => setMobilePageTab('right')}
            className={`px-2 py-0.5 rounded font-mono text-[11px] ${
              mobilePageTab === 'right' ? 'bg-white text-[#2457D6] font-bold shadow-xs' : 'text-stone-500'
            }`}
          >
            Pg {rightPageNum} (Code & Practice)
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-stone-400">
          <span>Spread {String(currentTopic.pageNumber).padStart(2, '0')}</span>
          <span>•</span>
          <span>[←] Prev Spread</span>
          <span>•</span>
          <span>[→] Next Spread</span>
        </div>
      </div>

      {/* THE PHYSICAL NOTEBOOK TWO-PAGE SPREAD */}
      <div className="relative w-full perspective-book">
        {/* Floating Left Arrow Navigation Button */}
        <button
          type="button"
          onClick={handleTriggerPrev}
          disabled={!hasPrev || isTurning}
          className={`hidden xl:flex absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 border border-[#D9D4C8] shadow-lg text-stone-700 transition-all items-center justify-center cursor-pointer ${
            hasPrev && !isTurning
              ? 'hover:text-[#2457D6] hover:scale-110 active:scale-95 hover:border-[#2457D6]/40 hover:shadow-xl'
              : 'opacity-0 pointer-events-none'
          }`}
          title="Previous Page (← Arrow Key)"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
        </button>

        {/* Floating Right Arrow Navigation Button */}
        <button
          type="button"
          onClick={handleTriggerNext}
          disabled={isTurning}
          className={`hidden xl:flex absolute -right-5 lg:-right-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border shadow-lg transition-all items-center justify-center cursor-pointer ${
            !isTurning
              ? hasNext
                ? 'bg-white/95 border-[#D9D4C8] text-stone-700 hover:text-[#2457D6] hover:scale-110 active:scale-95 hover:border-[#2457D6]/40 hover:shadow-xl'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:scale-110 active:scale-95 hover:border-amber-500 hover:shadow-xl'
              : 'opacity-0 pointer-events-none'
          }`}
          title={hasNext ? "Next Page (→ Arrow Key)" : "Finish & Close Book 📕"}
          aria-label={hasNext ? "Next Page" : "Close Book"}
        >
          <ChevronRight className="w-6 h-6 translate-x-0.5" />
        </button>

        {/* Hardcover Base */}
        <div className="relative w-full p-2 sm:p-3 md:p-4 bg-[#1E232A] rounded-xl sm:rounded-2xl book-hardcover-base border border-stone-800">
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#FFF 0.75px, transparent 0.75px)`,
              backgroundSize: '10px 10px'
            }}
          />

          {/* Book Paper Core */}
          <div className="relative flex w-full h-[620px] md:h-[660px] xl:h-[700px] rounded-lg sm:rounded-xl overflow-hidden transform-style-3d bg-[#FFFDF7]">
            {/* ---------------- LEFT PAGE (Theory, Syntax, Architecture, Notes) ---------------- */}
            <div
              className={`w-full md:w-1/2 h-full p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative book-page-edges-left ${paperClass} notebook-margin-line ${
                mobilePageTab === 'right' ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Center spine gutter gradient */}
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-16 spine-gutter-left z-10 pointer-events-none" />

              {/* Fixed Left Page Header */}
              <div className="shrink-0">
                {/* Chapter Banner */}
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-[#D9D4C8]/70 pl-8 sm:pl-10">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#2457D6] uppercase tracking-wider">
                    <span>{subject.name}</span>
                    <span>·</span>
                    <span>Chapter {String(currentTopic.chapterNumber).padStart(2, '0')}</span>
                  </div>
                  <span className="font-handwritten text-xs text-stone-400">
                    theory & structure
                  </span>
                </div>

                {/* Thumb-Index Tabs (Left Page) */}
                <div className="flex items-center gap-1 pt-2 pb-2 pl-8 sm:pl-10 border-b border-[#D9D4C8]/50 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setLeftPageTab('theory');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      leftPageTab === 'theory'
                        ? 'bg-[#2457D6] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>1. Theory</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLeftPageTab('diagram');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      leftPageTab === 'diagram'
                        ? 'bg-[#2457D6] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>2. Visuals</span>
                    {currentTopic.diagram && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLeftPageTab('notes');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      leftPageTab === 'notes'
                        ? 'bg-[#2457D6] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>3. Notes</span>
                    {(savedNote || stickyNotes.filter(n => n.topicId === currentTopic.id).length > 0) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Scrollable Content Container (Left Page) */}
              <div className="flex-1 min-h-0 overflow-y-auto pl-8 sm:pl-10 pr-2 pt-3 pb-2 index-scrollbar">
                {leftPageTab === 'theory' && (
                  <div>
                    {/* Concept Title & Accent Line */}
                    <div className="mb-4">
                      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#171717] font-sans">
                        {currentTopic.title}
                      </h1>
                      <div className="h-0.5 w-16 bg-[#2457D6] mt-1.5 mb-3" />
                    </div>

                    {/* 1. Simple Definition */}
                    <div className="mb-4">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2457D6] mb-1 flex items-center gap-2">
                        <span>Simple Definition</span>
                        <span className="h-px flex-1 bg-[#2457D6]/20" />
                      </h3>
                      <p className="text-sm text-stone-900 leading-relaxed font-serif italic pl-2.5 border-l-2 border-[#2457D6]">
                        <HighlightedText
                          text={currentTopic.definition}
                          highlights={topicHighlights}
                          selectedTool={selectedTool}
                          onRemoveHighlight={onRemoveHighlight}
                        />
                      </p>
                    </div>

                    {/* 2. Why It Matters */}
                    {currentTopic.whyItMatters && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-50/40 border border-blue-100 text-xs sm:text-sm text-stone-800 leading-relaxed">
                        <div className="font-semibold text-[#2457D6] mb-0.5 text-[11px] uppercase tracking-wider font-mono">
                          Why It Matters
                        </div>
                        <p>
                          <HighlightedText
                            text={currentTopic.whyItMatters}
                            highlights={topicHighlights}
                            selectedTool={selectedTool}
                            onRemoveHighlight={onRemoveHighlight}
                          />
                        </p>
                      </div>
                    )}

                    {/* 3. Syntax / Formula */}
                    {currentTopic.syntax && (
                      <div className="mb-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Syntax / Formula
                        </div>
                        <div className="p-2.5 rounded bg-stone-100/80 border border-[#D9D4C8] font-mono text-xs text-stone-900 overflow-x-auto">
                          <code>{currentTopic.syntax}</code>
                        </div>
                      </div>
                    )}

                    {/* 4. Core Explanation & Engineering Breakdown */}
                    <div className="mb-4">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-2">
                        <span>Engineering Breakdown</span>
                        <span className="h-px flex-1 bg-stone-200" />
                      </h3>
                      <div className="space-y-2 text-stone-800 text-xs sm:text-sm leading-relaxed">
                        {currentTopic.explanation.map((para, idx) => (
                          <p key={idx} className="flex items-start gap-2">
                            <span className="text-[#2457D6] font-bold text-xs mt-0.5 select-none font-handwritten text-base shrink-0">
                              →
                            </span>
                            <span>
                              <HighlightedText
                                text={para}
                                highlights={topicHighlights}
                                selectedTool={selectedTool}
                                onRemoveHighlight={onRemoveHighlight}
                              />
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {leftPageTab === 'diagram' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-[#D9D4C8]/50">
                      <div>
                        <h2 className="text-sm font-bold text-stone-900 font-sans">
                          {currentTopic.title}
                        </h2>
                        <span className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider">
                          Architecture & Visual Diagram
                        </span>
                      </div>
                    </div>

                    {/* 5. Visual Diagram */}
                    {currentTopic.diagram ? (
                      <div className="my-2">
                        <DiagramBlock diagram={currentTopic.diagram} />
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl border border-dashed border-[#D9D4C8] bg-stone-50/60 text-center">
                        <Layers className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-stone-700 mb-1">Conceptual Blueprint</p>
                        <p className="text-xs text-stone-500 max-w-xs mx-auto">
                          This concept is demonstrated through the syntax formula on the Theory tab and execution in the live sandbox.
                        </p>
                      </div>
                    )}

                    {/* 6. User Highlighter Quotes on this Page */}
                    {topicHighlights.length > 0 && (
                      <div className="my-3 p-3 rounded-lg bg-[#FAF8F2] border border-[#D9D4C8] shadow-2xs">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-handwritten text-sm text-stone-800 font-bold">
                              My Highlights ({topicHighlights.length}):
                            </span>
                            {selectedTool === 'eraser' && (
                              <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-semibold">
                                Eraser active
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-stone-400">
                            {selectedTool === 'eraser' ? 'click to erase' : 'switch to eraser to remove'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {topicHighlights.map((hl) => (
                            <span
                              key={hl.id}
                              className={`user-highlight-${hl.color} text-stone-900 text-xs font-medium inline-flex items-center gap-1.5 transition-all ${
                                selectedTool === 'eraser'
                                  ? 'cursor-pointer hover:opacity-60 ring-1 ring-rose-400'
                                  : 'cursor-default'
                              }`}
                              style={{
                                backgroundColor:
                                  hl.color === 'green'
                                    ? 'rgba(76, 175, 80, 0.30)'
                                    : hl.color === 'blue'
                                    ? 'rgba(66, 133, 244, 0.25)'
                                    : hl.color === 'yellow'
                                    ? 'rgba(255, 235, 59, 0.40)'
                                    : 'rgba(244, 67, 54, 0.25)'
                              }}
                              onClick={() => {
                                if (selectedTool === 'eraser' && onRemoveHighlight) {
                                  onRemoveHighlight(hl.id);
                                }
                              }}
                              title={
                                selectedTool === 'eraser'
                                  ? 'Click to erase highlight'
                                  : `${hl.color.toUpperCase()} Highlight: "${hl.text}"`
                              }
                            >
                              <span>"{hl.text}"</span>
                              {selectedTool === 'eraser' && (
                                <span className="text-[10px] text-rose-700 font-bold ml-0.5">✕</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {leftPageTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-[#D9D4C8]/50">
                      <div>
                        <h2 className="text-sm font-bold text-stone-900 font-sans">
                          {currentTopic.title}
                        </h2>
                        <span className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider">
                          Student Margin Scribbles & Notes
                        </span>
                      </div>
                    </div>

                    {/* 7. Student Margin Scribbles */}
                    <MarginNotesBlock
                      topicId={currentTopic.id}
                      savedNote={savedNote}
                      onSaveNote={onSaveNote}
                    />

                    {/* 8. Physical Sticky Notes (Left Page) */}
                    {onAddSticky && onUpdateSticky && onDeleteSticky && (
                      <StickyNotesLayer
                        topicId={currentTopic.id}
                        pageSide="left"
                        stickyNotes={stickyNotes}
                        onAddSticky={onAddSticky}
                        onUpdateSticky={onUpdateSticky}
                        onDeleteSticky={onDeleteSticky}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Left Page Bottom Footer with Printed/Handwritten Page Number */}
              <div className="shrink-0 pt-3 border-t border-[#D9D4C8]/80 flex items-center justify-between text-xs pl-8 sm:pl-10 select-none">
                <span className="font-handwritten text-base text-stone-400 font-bold">
                  Page {leftPageNum}
                </span>

                <button
                  type="button"
                  onClick={handleTriggerPrev}
                  disabled={!hasPrev || isTurning}
                  className={`flex items-center gap-1 font-mono text-[11px] transition-opacity ${
                    hasPrev && !isTurning ? 'text-stone-700 hover:text-[#2457D6]' : 'opacity-25 cursor-not-allowed text-stone-400'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Page</span>
                </button>
              </div>
            </div>

            {/* ---------------- CENTER SPINE GROOVE ---------------- */}
            <div className="hidden md:block w-3 sm:w-4 shrink-0 relative spine-center-groove z-20">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-stone-400/80 rounded-full" />
                ))}
              </div>
            </div>

            {/* ---------------- RIGHT PAGE (Code, System Highlights, Mistakes, Tips, Practice) ---------------- */}
            <div
              className={`w-full md:w-1/2 h-full p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative book-page-edges-right ${paperClass} ${
                mobilePageTab === 'left' ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Center spine gutter gradient */}
              <div className="hidden md:block absolute top-0 bottom-0 left-0 w-16 spine-gutter-right z-10 pointer-events-none" />

              {/* Fixed Right Page Header */}
              <div className="shrink-0 pr-4 sm:pr-6">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-[#D9D4C8]/70">
                  <span className="font-mono text-[11px] text-[#2457D6] uppercase tracking-wider">
                    {chapterTitle}
                  </span>
                  <span className="font-handwritten text-xs text-stone-400">
                    application & execution
                  </span>
                </div>

                {/* Thumb-Index Tabs (Right Page) */}
                <div className="flex items-center gap-1 pt-2 pb-2 border-b border-[#D9D4C8]/50 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setRightPageTab('code');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      rightPageTab === 'code'
                        ? 'bg-[#1E232A] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>1. Code & Sandbox</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRightPageTab('traps');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      rightPageTab === 'traps'
                        ? 'bg-[#7E22CE] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>2. Traps & Tips</span>
                    {(currentTopic.commonMistakes?.length || currentTopic.tip || currentTopic.interviewNote) ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    ) : null}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRightPageTab('practice');
                      notebookAudio.playPencil();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      rightPageTab === 'practice'
                        ? 'bg-[#059669] text-white shadow-xs font-semibold'
                        : 'bg-[#F4EFE6]/80 text-stone-600 hover:bg-[#EAE2D2] hover:text-stone-900 border border-[#D9D4C8]/70'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    <span>3. Practice</span>
                    {(currentTopic.practiceQuestions?.length || currentTopic.practice) ? (
                      <span className="text-[10px] opacity-80 font-mono">
                        ({currentTopic.practiceQuestions?.length || 1})
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>

              {/* Scrollable Content Container (Right Page) */}
              <div className="flex-1 min-h-0 overflow-y-auto pr-4 sm:pr-6 pl-2 pt-3 pb-2 index-scrollbar">
                {rightPageTab === 'code' && (
                  <div className="space-y-4">
                    {/* Code Implementation Block */}
                    {currentTopic.example ? (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <span>Code Implementation</span>
                            <span className="h-px flex-1 bg-stone-200" />
                          </div>
                          {onOpenAIStudyDesk && (
                            <button
                              type="button"
                              onClick={() => onOpenAIStudyDesk(currentTopic.example?.code)}
                              className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-700 hover:text-indigo-900 ml-2 cursor-pointer"
                              title="Analyze this code example with AI Study Desk"
                            >
                              <Bot className="w-3 h-3" />
                              <span>Ask AI Desk</span>
                            </button>
                          )}
                        </div>
                        <CodeBlock snippet={currentTopic.example} />
                        
                        {/* Margin REPL & Live Sandbox Playground */}
                        <div className="mt-3">
                          <MarginCodePlayground
                            initialCode={currentTopic.example.code}
                            language={currentTopic.example.language}
                            expectedOutput={currentTopic.example.output}
                            topicTitle={currentTopic.title}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl border border-dashed border-[#D9D4C8] bg-stone-50/60 text-center">
                        <Code2 className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-stone-700 mb-1">Foundational Topic</p>
                        <p className="text-xs text-stone-500 max-w-xs mx-auto">
                          Check out the Traps & Tips and Practice Session tabs for this topic.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {rightPageTab === 'traps' && (
                  <div className="space-y-4">
                    {/* System Yellow Highlight */}
                    {currentTopic.important && (
                      <HighlightBlock content={currentTopic.important} />
                    )}

                    {/* Common Mistakes Warning */}
                    {currentTopic.commonMistakes && currentTopic.commonMistakes.length > 0 && (
                      <WarningBlock mistakes={currentTopic.commonMistakes} />
                    )}

                    {/* Practical Tip */}
                    {currentTopic.tip && (
                      <TipBlock tip={currentTopic.tip} />
                    )}

                    {/* Interview Note */}
                    {currentTopic.interviewNote && (
                      <div className="p-3 rounded-lg bg-[#FAF8F2] border-l-4 border-purple-500 border-y border-r border-[#E8E0D2] text-xs sm:text-sm text-stone-800">
                        <div className="font-mono text-[10px] uppercase font-bold text-purple-700 tracking-wider mb-1">
                          ★ Systems Interview Note
                        </div>
                        <p className="leading-relaxed">
                          <HighlightedText
                            text={currentTopic.interviewNote}
                            highlights={topicHighlights}
                            selectedTool={selectedTool}
                            onRemoveHighlight={onRemoveHighlight}
                          />
                        </p>
                      </div>
                    )}

                    {/* Physical Sticky Notes (Right Page) */}
                    {onAddSticky && onUpdateSticky && onDeleteSticky && (
                      <StickyNotesLayer
                        topicId={currentTopic.id}
                        pageSide="right"
                        stickyNotes={stickyNotes}
                        onAddSticky={onAddSticky}
                        onUpdateSticky={onUpdateSticky}
                        onDeleteSticky={onDeleteSticky}
                      />
                    )}
                  </div>
                )}

                {rightPageTab === 'practice' && (
                  <div>
                    {currentTopic.practiceQuestions && currentTopic.practiceQuestions.length > 0 ? (
                      <PracticeSession
                        questions={currentTopic.practiceQuestions}
                        topicTitle={currentTopic.title}
                        chapterTitle={chapterTitle}
                        subjectName={subject.name}
                        subjectId={subject.id}
                        topicId={currentTopic.id}
                        onOpenAIStudyDesk={onOpenAIStudyDesk ? (q) => onOpenAIStudyDesk(q) : undefined}
                        onOpenMistakeNotebook={onOpenMistakeNotebook}
                      />
                    ) : currentTopic.practice ? (
                      <PracticeSession
                        questions={[
                          {
                            id: `p-${currentTopic.id}`,
                            type: 'mcq',
                            question: currentTopic.practice.question,
                            options: currentTopic.practice.options,
                            correctIndex: currentTopic.practice.correctIndex,
                            explanation: currentTopic.practice.explanation
                          }
                        ]}
                        topicTitle={currentTopic.title}
                        chapterTitle={chapterTitle}
                        subjectName={subject.name}
                        subjectId={subject.id}
                        topicId={currentTopic.id}
                        onOpenAIStudyDesk={onOpenAIStudyDesk ? (q) => onOpenAIStudyDesk(q) : undefined}
                        onOpenMistakeNotebook={onOpenMistakeNotebook}
                      />
                    ) : (
                      <div className="p-6 rounded-xl border border-dashed border-[#D9D4C8] bg-stone-50/60 text-center">
                        <Target className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-stone-700 mb-1">Practice Complete</p>
                        <p className="text-xs text-stone-500">
                          Review previous practice sets or test with the final university question paper.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Page Bottom Footer */}
              <div className="shrink-0 pt-3 border-t border-[#D9D4C8]/80 flex items-center justify-between text-xs pr-4 sm:pr-6 select-none">
                <button
                  type="button"
                  onClick={handleTriggerNext}
                  disabled={isTurning}
                  className={`flex items-center gap-1 font-mono text-[11px] transition-all cursor-pointer ${
                    hasNext
                      ? !isTurning ? 'text-stone-700 hover:text-[#2457D6]' : 'opacity-25'
                      : !isTurning ? 'text-amber-800 hover:text-amber-950 font-bold bg-amber-100/80 px-2 py-0.5 rounded shadow-xs' : 'opacity-25'
                  }`}
                >
                  <span>{hasNext ? 'Next Page' : 'Finish & Close Book 📕'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span className="font-handwritten text-base text-stone-400 font-bold">
                  Page {rightPageNum}
                </span>
              </div>
            </div>

            {/* ---------------- REAL 3D TURNING SHEET ---------------- */}
            {isTurning && turnDirection === 'next' && (
              <div
                className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 transform-style-3d z-30 pointer-events-none"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotateY(${-180 * turnProgress}deg) skewY(${Math.sin(turnProgress * Math.PI) * -1.5}deg)`,
                  transition: 'none'
                }}
              >
                <div
                  className={`absolute inset-0 backface-hidden p-8 ${paperClass} border-l border-stone-300 shadow-2xl flex flex-col justify-between`}
                >
                  <div className="opacity-80">
                    <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider mb-2">
                      {currentTopic.title}
                    </div>
                    {currentTopic.example && (
                      <div className="p-3 bg-stone-900 rounded text-stone-200 text-xs font-mono">
                        <pre><code>{currentTopic.example.code.split('\n').slice(0, 5).join('\n')}...</code></pre>
                      </div>
                    )}
                  </div>
                  <div className="text-right font-handwritten text-sm text-stone-400">
                    Page {rightPageNum}
                  </div>
                </div>

                <div
                  className={`absolute inset-0 backface-hidden p-8 ${paperClass} border-r border-stone-300 shadow-2xl flex flex-col justify-between`}
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="opacity-90 pl-8">
                    <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider mb-1">
                      {subject.name} · Next Spread
                    </div>
                    <div className="text-xl font-bold text-stone-900 mb-2">
                      {nextTopic?.title}
                    </div>
                    <p className="font-serif italic text-xs text-stone-700 border-l-2 border-[#2457D6] pl-2 line-clamp-3">
                      {nextTopic?.definition}
                    </p>
                  </div>
                  <div className="pl-8 font-handwritten text-sm text-stone-400">
                    Page {String((nextTopic?.pageNumber || 0) * 2).padStart(2, '0')}
                  </div>
                </div>
              </div>
            )}

            {isTurning && turnDirection === 'prev' && (
              <div
                className="hidden md:block absolute top-0 bottom-0 left-0 w-1/2 transform-style-3d z-30 pointer-events-none"
                style={{
                  transformOrigin: 'right center',
                  transform: `rotateY(${180 * turnProgress}deg) skewY(${Math.sin(turnProgress * Math.PI) * 1.5}deg)`,
                  transition: 'none'
                }}
              >
                <div
                  className={`absolute inset-0 backface-hidden p-8 ${paperClass} border-r border-stone-300 shadow-2xl flex flex-col justify-between`}
                >
                  <div className="opacity-80 pl-8">
                    <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider mb-2">
                      {currentTopic.title}
                    </div>
                    <p className="text-xs text-stone-700 line-clamp-3">
                      {currentTopic.definition}
                    </p>
                  </div>
                  <div className="pl-8 font-handwritten text-sm text-stone-400">
                    Page {leftPageNum}
                  </div>
                </div>

                <div
                  className={`absolute inset-0 backface-hidden p-8 ${paperClass} border-l border-stone-300 shadow-2xl flex flex-col justify-between`}
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="opacity-90">
                    <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider mb-2">
                      Previous Spread · {prevTopic?.title}
                    </div>
                  </div>
                  <div className="text-right font-handwritten text-sm text-stone-400">
                    Page {String((prevTopic?.pageNumber || 1) * 2 + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ambient bottom spread turn controls (Desktop) */}
        <div className="hidden md:flex items-center justify-between mt-4 px-2 text-xs select-none">
          <button
            type="button"
            onClick={handleTriggerPrev}
            disabled={!hasPrev || isTurning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9D4C8] bg-white text-stone-700 transition-all ${
              hasPrev && !isTurning ? 'hover:bg-stone-50 hover:border-stone-400' : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>← Previous Spread</span>
          </button>

          <span className="font-handwritten text-xs text-stone-400">
            {isTurning ? 'turning page...' : 'press [← / →] or click page edges to turn'}
          </span>

          <button
            type="button"
            onClick={handleTriggerNext}
            disabled={isTurning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              hasNext
                ? !isTurning ? 'border-[#D9D4C8] bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400' : 'opacity-40'
                : !isTurning ? 'border-amber-400 bg-amber-50 text-amber-900 font-bold hover:bg-amber-100 shadow-xs' : 'opacity-40'
            }`}
          >
            <span>{hasNext ? 'Next Spread →' : 'Finish & Close Book 📕'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sticky Mobile Floating Navigation Bar (Thumb Friendly on Phones) */}
        <div className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1E232A]/95 text-stone-100 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl items-center gap-2 border border-stone-700/60 select-none text-xs">
          <button
            type="button"
            onClick={handleTriggerPrev}
            disabled={!hasPrev || isTurning}
            className={`p-1.5 rounded-full transition-colors ${
              hasPrev && !isTurning ? 'hover:bg-white/10 active:scale-95 text-white' : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 font-mono text-[11px] px-1 text-stone-300">
            <span className="font-bold text-white">Pg {mobilePageTab === 'left' ? leftPageNum : rightPageNum}</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-400">{totalPages}</span>
          </div>

          <div className="h-3.5 w-px bg-stone-700 mx-0.5" />

          {/* Quick toggle between Theory & Code on the same spread */}
          <button
            type="button"
            onClick={() => setMobilePageTab(mobilePageTab === 'left' ? 'right' : 'left')}
            className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-[#2457D6] text-white hover:bg-[#1d47b3] transition-colors flex items-center gap-1"
          >
            <span>{mobilePageTab === 'left' ? 'Code 💻' : 'Notes 📖'}</span>
          </button>

          <div className="h-3.5 w-px bg-stone-700 mx-0.5" />

          <button
            type="button"
            onClick={handleTriggerNext}
            disabled={isTurning}
            className={`p-1.5 rounded-full transition-colors ${
              !isTurning ? 'hover:bg-white/10 active:scale-95 text-white' : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
