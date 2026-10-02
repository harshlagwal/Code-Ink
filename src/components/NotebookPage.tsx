import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { Subject, TopicContent, PaperStyle } from '../types/notebook';
import { CodeBlock } from './ContentBlocks/CodeBlock';
import { DiagramBlock } from './ContentBlocks/DiagramBlock';
import { HighlightBlock } from './ContentBlocks/HighlightBlock';
import { WarningBlock } from './ContentBlocks/WarningBlock';
import { TipBlock } from './ContentBlocks/TipBlock';
import { PracticeBlock } from './ContentBlocks/PracticeBlock';
import { MarginNotesBlock } from './ContentBlocks/MarginNotesBlock';

interface NotebookPageProps {
  topic: TopicContent;
  subject: Subject;
  chapterTitle: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  paperStyle: PaperStyle;
  savedNote?: string;
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  onSaveNote: (topicId: string, note: string) => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onSelectTopicById?: (topicId: string) => void;
}

export function NotebookPage({
  topic,
  subject,
  chapterTitle,
  isBookmarked,
  isCompleted,
  paperStyle,
  savedNote = '',
  onToggleBookmark,
  onToggleCompleted,
  onSaveNote,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onSelectTopicById
}: NotebookPageProps) {
  // Format page number with leading zero e.g. "Page 04"
  const formattedPage = String(topic.pageNumber).padStart(2, '0');
  const formattedChapter = String(topic.chapterNumber).padStart(2, '0');

  const paperClass =
    paperStyle === 'ruled'
      ? 'notebook-ruled notebook-margin-line'
      : paperStyle === 'grid'
      ? 'notebook-grid notebook-margin-line'
      : 'notebook-plain notebook-margin-line';

  return (
    <article
      className={`relative min-h-[820px] rounded-lg border border-[#D9D4C8] shadow-notebook p-6 sm:p-10 md:p-14 transition-all ${paperClass}`}
    >
      {/* Top Page Header (Chapter indicator & page meta) */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#D9D4C8]/80 pl-8 sm:pl-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2457D6] uppercase">
            <span>{subject.name}</span>
            <span>·</span>
            <span>Chapter {formattedChapter}</span>
          </div>
          <h2 className="text-xs sm:text-sm font-medium text-stone-500 mt-0.5">
            {chapterTitle}
          </h2>
        </div>

        {/* Page Actions: Bookmark, Mark understood, Share */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
          <button
            type="button"
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove bookmark (K)' : 'Bookmark topic (K)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
              isBookmarked
                ? 'bg-[#2457D6]/10 text-[#2457D6] border-[#2457D6]/30'
                : 'bg-white text-stone-600 border-[#D9D4C8] hover:text-[#2457D6] hover:border-stone-400'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleCompleted}
            title={isCompleted ? 'Marked as mastered' : 'Mark as mastered'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-600 border-[#D9D4C8] hover:text-emerald-700 hover:border-stone-400'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-emerald-600 text-white' : ''}`} />
            <span className="hidden sm:inline">{isCompleted ? 'Understood' : 'Mark Understood'}</span>
          </button>
        </div>
      </header>

      {/* Main Concept Title & Body */}
      <main className="pl-8 sm:pl-12 pt-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] font-sans">
            {topic.title}
          </h1>
          <div className="h-0.5 w-16 bg-[#2457D6] mt-2 mb-4" />
        </div>

        {/* Definition Block */}
        <section className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2457D6] mb-2 flex items-center gap-2">
            <span>Definition</span>
            <span className="h-px flex-1 bg-[#2457D6]/20" />
          </h3>
          <p className="text-base sm:text-lg text-stone-900 leading-relaxed font-serif italic pl-2 border-l-2 border-[#2457D6]">
            {topic.definition}
          </p>
        </section>

        {/* Explanation Section */}
        <section className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
            <span>Engineering Notes & Breakdown</span>
            <span className="h-px flex-1 bg-stone-300/60" />
          </h3>
          <div className="space-y-3 text-stone-800 text-sm sm:text-base leading-relaxed">
            {topic.explanation.map((para, idx) => (
              <p key={idx} className="flex items-start gap-2.5">
                <span className="text-[#2457D6] font-bold text-xs mt-1 select-none font-handwritten text-base">
                  →
                </span>
                <span>{para}</span>
              </p>
            ))}
          </div>
        </section>

        {/* Example Code Block */}
        {topic.example && (
          <section className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-2">
              <span>Code Example</span>
              <span className="h-px flex-1 bg-stone-300/60" />
            </h3>
            <CodeBlock snippet={topic.example} />
          </section>
        )}

        {/* Visual Architecture Diagram */}
        {topic.diagram && (
          <section className="mb-8">
            <DiagramBlock diagram={topic.diagram} />
          </section>
        )}

        {/* Important Highlight Block */}
        {topic.important && (
          <HighlightBlock content={topic.important} />
        )}

        {/* Common Mistakes Warning Block */}
        {topic.commonMistakes && topic.commonMistakes.length > 0 && (
          <WarningBlock mistakes={topic.commonMistakes} />
        )}

        {/* Tip Block */}
        {topic.tip && (
          <TipBlock tip={topic.tip} />
        )}

        {/* Interactive Practice Question */}
        {topic.practice && (
          <section className="mb-8">
            <PracticeBlock practice={topic.practice} />
          </section>
        )}

        {/* Related Topics navigation chips */}
        {topic.relatedTopics && topic.relatedTopics.length > 0 && (
          <div className="my-6 pt-4 border-t border-[#D9D4C8]/50 text-xs flex flex-wrap items-center gap-2">
            <span className="text-stone-500 font-mono">Related Notes:</span>
            {topic.relatedTopics.map((relId) => (
              <button
                key={relId}
                type="button"
                onClick={() => onSelectTopicById && onSelectTopicById(relId)}
                className="text-[#2457D6] hover:underline font-mono text-xs"
              >
                #{relId}
              </button>
            ))}
          </div>
        )}

        {/* Interactive Student Margin Notes */}
        <MarginNotesBlock
          topicId={topic.id}
          savedNote={savedNote}
          onSaveNote={onSaveNote}
        />
      </main>

      {/* Page Footer: Previous / Next & Physical Page Number */}
      <footer className="mt-12 pt-6 border-t border-[#D9D4C8] flex flex-col sm:flex-row items-center justify-between gap-4 pl-8 sm:pl-12 text-xs">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D9D4C8] transition-colors ${
              hasPrev
                ? 'bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400'
                : 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>← Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D9D4C8] transition-colors ${
              hasNext
                ? 'bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400'
                : 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
            }`}
          >
            <span>Next →</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Page Numbering */}
        <div className="order-1 sm:order-2 font-mono text-xs text-stone-500 tracking-wider">
          Page {formattedPage}
        </div>

        {/* Right Keyboard Quick Hints */}
        <div className="hidden lg:flex items-center gap-3 order-3 text-[11px] text-stone-400 font-mono">
          <span>[← / →] Flip</span>
          <span>[K] Bookmark</span>
          <span>[S] Search</span>
        </div>
      </footer>
    </article>
  );
}
