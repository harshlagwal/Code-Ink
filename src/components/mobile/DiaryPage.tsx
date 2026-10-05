import React, { useRef, useEffect } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Terminal,
  Play,
  Layers,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Code2,
  Target,
  AlertTriangle,
  PenLine,
  HelpCircle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import {
  Subject,
  TopicContent,
  PaperStyle,
  HighlightTool,
  UserHighlight,
  StickyNote,
} from '../../types/notebook';
import { HighlightedText } from '../HighlightedText';
import { CodeBlock } from '../ContentBlocks/CodeBlock';
import { DiagramBlock } from '../ContentBlocks/DiagramBlock';
import { HighlightBlock } from '../ContentBlocks/HighlightBlock';
import { WarningBlock } from '../ContentBlocks/WarningBlock';
import { TipBlock } from '../ContentBlocks/TipBlock';
import { MarginNotesBlock } from '../ContentBlocks/MarginNotesBlock';
import { StickyNotesLayer } from '../StickyNotesLayer';
import { PracticeSession } from '../PracticeSession';
import { DiarySection } from './DiarySection';
import { DiaryFontSize } from './ReadingSettingsSheet';
import { notebookAudio } from '../../utils/audioEffects';

interface DiaryPageProps {
  topic: TopicContent;
  subject: Subject;
  chapterTitle: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  paperStyle: PaperStyle;
  fontSize: DiaryFontSize;
  savedNote?: string;
  selectedTool: HighlightTool;
  userHighlights: UserHighlight[];
  stickyNotes: StickyNote[];
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  onSaveNote: (topicId: string, note: string) => void;
  onAddSticky?: (note: Omit<StickyNote, 'id' | 'createdAt'>) => void;
  onUpdateSticky?: (id: string, updates: Partial<StickyNote>) => void;
  onDeleteSticky?: (id: string) => void;
  onRemoveHighlight?: (id: string) => void;
  onOpenCompiler: () => void;
  onSelectTopicById?: (topicId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  prevTopicTitle?: string;
  nextTopicTitle?: string;
}

/**
 * Mobile Diary Page Component
 * Reference: PRD Section 7.2, 7.3 & 9.7
 * Renders 100% of TopicContent fields in a single vertical column
 * with exact theme fidelity, responsive font scaling, and physical paper styling.
 */
export const DiaryPage: React.FC<DiaryPageProps> = ({
  topic,
  subject,
  chapterTitle,
  isBookmarked,
  isCompleted,
  paperStyle,
  fontSize,
  savedNote = '',
  selectedTool,
  userHighlights,
  stickyNotes,
  onToggleBookmark,
  onToggleCompleted,
  onSaveNote,
  onAddSticky,
  onUpdateSticky,
  onDeleteSticky,
  onRemoveHighlight,
  onOpenCompiler,
  onSelectTopicById,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  prevTopicTitle,
  nextTopicTitle,
}) => {
  const formattedPage = String(topic.pageNumber).padStart(2, '0');
  const formattedChapter = String(topic.chapterNumber).padStart(2, '0');

  // Inner scroll container ref for fixed diary geometry
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Reset inner scroll when topic changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [topic.id]);

  // Filter user highlights specific to current topic
  const topicHighlights = userHighlights.filter(h => h.topicId === topic.id);

  // Paper styling class
  const paperClass =
    paperStyle === 'ruled'
      ? 'notebook-ruled notebook-margin-line'
      : paperStyle === 'grid'
      ? 'notebook-grid notebook-margin-line'
      : 'notebook-plain notebook-margin-line';

  // Body font scaling based on user settings
  const bodySizeClass =
    fontSize === 's'
      ? 'text-xs sm:text-sm'
      : fontSize === 'l'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  // Prepare questions for PracticeSession
  const practiceItems =
    topic.practiceQuestions && topic.practiceQuestions.length > 0
      ? topic.practiceQuestions
      : topic.practice
      ? [
          {
            id: `p-${topic.id}`,
            type: 'mcq' as const,
            question: topic.practice.question,
            options: topic.practice.options,
            correctIndex: topic.practice.correctIndex,
            explanation: topic.practice.explanation,
          },
        ]
      : [];

  return (
    <article
      aria-label={`Topic: ${topic.title}`}
      className={`paper-mode relative w-full h-full rounded-xl border border-[#D9D4C8]/80 shadow-xs transition-all duration-200 flex flex-col min-h-0 overflow-hidden ${paperClass}`}
    >
      {/* Authentic Physical Spiral Wire Binding Rings (Top of Paper Leaf) */}
      <div
        aria-hidden="true"
        className="shrink-0 flex justify-evenly px-4 sm:px-8 py-1 z-20 pointer-events-none select-none border-b border-dashed border-stone-300/80 bg-[#F5EFE3]/80"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Metallic loop ring */}
            <div className="w-2.5 h-3.5 rounded-full bg-linear-to-b from-stone-400 via-stone-100 to-stone-600 shadow-xs border border-stone-500/40" />
            {/* Punch hole shadow */}
            <div className="w-2.5 h-1 bg-stone-900/30 rounded-full blur-[0.5px] -mt-0.5" />
          </div>
        ))}
      </div>

      {/* ---------------- PINNED TOP TITLE & META HEADER ---------------- */}
      <header className="shrink-0 p-3 sm:p-4 pb-2 border-b border-[#D9D4C8]/80 pl-8 sm:pl-16 pr-3 sm:pr-4 bg-[#FFFDF7]/90 backdrop-blur-xs">
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#2457D6] mb-1">
          <div className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <span>{subject.name}</span>
            <span>·</span>
            <span>Ch {formattedChapter}</span>
            <span>·</span>
            <span>Pg {formattedPage}</span>
          </div>

          {/* Difficulty Pill */}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border ${
              topic.difficulty === 'beginner'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : topic.difficulty === 'intermediate'
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            {topic.difficulty}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 mt-1">
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#171717] font-sans leading-tight">
              {topic.title}
            </h1>
            <p className="text-xs text-stone-500 font-sans mt-0.5">{chapterTitle}</p>
          </div>

          {/* Mark Understood / Completed Toggle */}
          <button
            type="button"
            onClick={onToggleCompleted}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-600 border-[#D9D4C8] hover:text-emerald-700'
            }`}
            title={isCompleted ? 'Topic understood' : 'Mark topic understood'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-emerald-600 text-white' : ''}`} />
            <span className="hidden xs:inline">{isCompleted ? 'Done' : 'Mark Done'}</span>
          </button>
        </div>
      </header>

      {/* ---------------- INNER SCROLLABLE DIARY CONTENT ---------------- */}
      <div
        ref={contentRef}
        className="flex-1 min-h-0 overflow-y-auto pl-8 sm:pl-16 pr-3 sm:pr-4 pt-2 pb-24 index-scrollbar overscroll-contain"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {/* ================= SECTION 1: CONCEPT ================= */}
        <DiarySection
          id="section-concept"
          title="1. Concept & Theory"
          badge="Foundations"
          icon={<BookOpen className="w-4 h-4" />}
        >
          {/* Definition */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2457D6] mb-1.5 flex items-center gap-2">
              <span>Definition</span>
              <span className="h-px flex-1 bg-[#2457D6]/20" />
            </h3>
            <p className="text-sm sm:text-base text-stone-900 leading-relaxed font-serif italic pl-3 border-l-2 border-[#2457D6]">
              <HighlightedText
                text={topic.definition}
                highlights={topicHighlights}
                selectedTool={selectedTool}
                onRemoveHighlight={onRemoveHighlight}
              />
            </p>
          </div>

          {/* Why It Matters Callout */}
          {topic.whyItMatters && (
            <div className="mb-4 p-3 rounded-xl bg-blue-50/50 border border-blue-200/80 text-xs sm:text-sm text-stone-800 leading-relaxed">
              <div className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#2457D6] mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                <span>Why It Matters</span>
              </div>
              <p>
                <HighlightedText
                  text={topic.whyItMatters}
                  highlights={topicHighlights}
                  selectedTool={selectedTool}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </p>
            </div>
          )}

          {/* Syntax / Formula */}
          {topic.syntax && (
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Syntax / Formula
              </div>
              <div className="p-2.5 rounded-lg bg-stone-100/90 border border-[#D9D4C8] font-mono text-xs text-stone-900 overflow-x-auto">
                <code>{topic.syntax}</code>
              </div>
            </div>
          )}

          {/* Core Explanation Paragraphs */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-2">
              <span>Engineering Breakdown</span>
              <span className="h-px flex-1 bg-stone-200" />
            </h3>
            <div className={`space-y-2 text-stone-800 leading-relaxed ${bodySizeClass}`}>
              {topic.explanation.map((para, idx) => (
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

          {/* Visual Architecture Diagram */}
          {topic.diagram && (
            <div className="my-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span>Architecture & Data Flow</span>
              </div>
              <DiagramBlock diagram={topic.diagram} />
            </div>
          )}

          {/* Important Highlight */}
          {topic.important && (
            <div className="my-4">
              <HighlightBlock content={topic.important} />
            </div>
          )}
        </DiarySection>

        {/* ================= SECTION 2: CODE ================= */}
        {topic.example && (
          <DiarySection
            id="section-code"
            title="2. Code & Live Sandbox"
            badge={topic.example.language.toUpperCase()}
            icon={<Code2 className="w-4 h-4" />}
            action={
              <button
                type="button"
                onClick={onOpenCompiler}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run</span>
              </button>
            }
          >
            <CodeBlock snippet={topic.example} />

            {/* Prominent Run in Sandbox CTA Bar */}
            <div className="mt-3 p-3 rounded-xl bg-[#1E232A] text-stone-100 flex items-center justify-between gap-3 border border-stone-800 shadow-md">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate font-sans">
                    Execute on Cloud Sandbox
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    Live GCC/JVM Compiler + Memory Tracer
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenCompiler}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-md cursor-pointer shrink-0 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </button>
            </div>
          </DiarySection>
        )}

        {/* ================= SECTION 3: PRACTICE ================= */}
        {practiceItems.length > 0 && (
          <DiarySection
            id="section-practice"
            title="3. Concept Practice & Check"
            badge={`${practiceItems.length} Qs`}
            icon={<Target className="w-4 h-4" />}
          >
            <PracticeSession
              questions={practiceItems}
              topicTitle={topic.title}
              chapterTitle={chapterTitle}
              subjectName={subject.name}
              subjectId={subject.id}
              topicId={topic.id}
            />
          </DiarySection>
        )}

        {/* ================= SECTION 4: VIVA & TRAPS ================= */}
        {(topic.commonMistakes?.length || topic.tip || topic.interviewNote) && (
          <DiarySection
            id="section-viva"
            title="4. Viva & Pitfalls"
            badge="Exam Traps"
            icon={<AlertTriangle className="w-4 h-4" />}
          >
            {/* Common Mistakes */}
            {topic.commonMistakes && topic.commonMistakes.length > 0 && (
              <div className="mb-4">
                <WarningBlock mistakes={topic.commonMistakes} />
              </div>
            )}

            {/* Practical Tip */}
            {topic.tip && (
              <div className="mb-4">
                <TipBlock tip={topic.tip} />
              </div>
            )}

            {/* Systems Interview Note */}
            {topic.interviewNote && (
              <div className="p-3 rounded-xl bg-[#FAF8F2] border-l-4 border-purple-500 border-y border-r border-[#E8E0D2] text-xs sm:text-sm text-stone-800">
                <div className="font-mono text-[10px] uppercase font-bold text-purple-700 tracking-wider mb-1">
                  ★ Systems Interview Note
                </div>
                <p className="leading-relaxed">
                  <HighlightedText
                    text={topic.interviewNote}
                    highlights={topicHighlights}
                    selectedTool={selectedTool}
                    onRemoveHighlight={onRemoveHighlight}
                  />
                </p>
              </div>
            )}
          </DiarySection>
        )}

        {/* ================= SECTION 5: MY NOTES ================= */}
        <DiarySection
          id="section-notes"
          title="5. My Diary Notes & Scribbles"
          badge="Personal"
          icon={<PenLine className="w-4 h-4" />}
        >
          {/* Margin Notes Block */}
          <div className="mb-4">
            <MarginNotesBlock
              topicId={topic.id}
              savedNote={savedNote}
              onSaveNote={onSaveNote}
            />
          </div>

          {/* Sticky Notes */}
          {onAddSticky && onUpdateSticky && onDeleteSticky && (
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Sticky Notes for this Topic
              </div>
              <StickyNotesLayer
                topicId={topic.id}
                pageSide="left"
                stickyNotes={stickyNotes}
                onAddSticky={onAddSticky}
                onUpdateSticky={onUpdateSticky}
                onDeleteSticky={onDeleteSticky}
              />
            </div>
          )}

          {/* Active Highlights */}
          {topicHighlights.length > 0 && (
            <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#D9D4C8] shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-handwritten text-sm text-stone-800 font-bold">
                  Topic Highlights ({topicHighlights.length}):
                </span>
                {selectedTool === 'eraser' && (
                  <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-semibold">
                    Eraser active
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topicHighlights.map(hl => (
                  <span
                    key={hl.id}
                    className={`user-highlight-${hl.color} text-stone-900 text-xs font-medium inline-flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                      selectedTool === 'eraser'
                        ? 'cursor-pointer hover:opacity-60 ring-1 ring-rose-400'
                        : 'cursor-default'
                    }`}
                    onClick={() => {
                      if (selectedTool === 'eraser' && onRemoveHighlight) {
                        onRemoveHighlight(hl.id);
                      }
                    }}
                  >
                    <span>"{hl.text}"</span>
                    {selectedTool === 'eraser' && (
                      <span className="text-[10px] text-rose-700 font-bold">✕</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </DiarySection>

        {/* ================= FOOTER: RELATED TOPICS & PREV/NEXT ================= */}
        <footer className="pt-6 border-t border-[#D9D4C8]/80 space-y-4">
          {/* Related topics chips */}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-2">
                Related Topics:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topic.relatedTopics.map(relId => (
                  <button
                    key={relId}
                    type="button"
                    onClick={() => onSelectTopicById && onSelectTopicById(relId)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#D9D4C8] text-xs font-mono text-stone-700 hover:text-[#2457D6] hover:border-[#2457D6] transition-colors cursor-pointer"
                  >
                    #{relId}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Prev / Next Cards */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                hasPrev
                  ? 'bg-white border-[#D9D4C8] hover:border-[#2457D6] hover:shadow-xs'
                  : 'bg-stone-50 border-stone-200 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-1 text-[10px] font-mono text-stone-500 uppercase">
                <ChevronLeft className="w-3 h-3" />
                <span>Previous</span>
              </div>
              <div className="text-xs font-bold text-stone-800 truncate mt-0.5">
                {prevTopicTitle || 'Previous Topic'}
              </div>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="p-3 rounded-xl border bg-white border-[#D9D4C8] hover:border-[#2457D6] hover:shadow-xs text-right transition-all cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-stone-500 uppercase">
                <span>{hasNext ? 'Next' : 'Finish'}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              <div className="text-xs font-bold text-stone-800 truncate mt-0.5">
                {nextTopicTitle || (hasNext ? 'Next Topic' : 'Close Book')}
              </div>
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};
