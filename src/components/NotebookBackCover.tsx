import { useState, useEffect } from 'react';
import { Subject } from '../types/notebook';
import { RotateCcw, FileText, Library, Award, Sparkles, CheckCircle2, ChevronLeft, BookOpen } from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';
import { NotebookEdgePen } from './NotebookEdgePen';

interface NotebookBackCoverProps {
  subject: Subject;
  paperStyle?: string;
  totalTopics: number;
  completedTopicsCount: number;
  onBackToLastTopic: () => void;
  onReopenFirstPage: () => void;
  onTakeFinalPaper: () => void;
  onOpenFlashcards?: () => void;
  onExploreLibrary: () => void;
}

export function NotebookBackCover({
  subject,
  totalTopics,
  completedTopicsCount,
  onBackToLastTopic,
  onReopenFirstPage,
  onTakeFinalPaper,
  onExploreLibrary
}: NotebookBackCoverProps) {
  const [stampRevealed, setStampRevealed] = useState(false);

  useEffect(() => {
    // Play satisfying physical book close sound on mount
    notebookAudio.playBookClose();
    const timer = setTimeout(() => {
      setStampRevealed(true);
      notebookAudio.playSuccess();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const completionPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 100;
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  const lastChapter = subject.chapters[subject.chapters.length - 1];

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 py-6 select-none">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-mono mb-2 tracking-wider uppercase shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Volume Completed · Book Closed</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-sans">
          {subject.name} <span className="text-accent">Notebook</span>
        </h1>
        <p className="mt-1 text-base sm:text-lg font-serif italic text-muted">
          "You read and understood every page of this book."
        </p>
      </div>

      {/* Center 3D Closed Hardcover Back Assembly (Matches NotebookCover.tsx Exactly) */}
      <div className="relative perspective-book select-none">
        {/* Soft shadow below closed notebook with ambient lighting in dark mode */}
        <div className="absolute -inset-4 bg-stone-900/20 dark:bg-blue-600/20 rounded-2xl blur-xl dark:blur-2xl" />

        {/* Physical Hardcover Back Plate (Spine on left, Pen on right — identical to front cover) */}
        <div className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[510px] sm:h-[550px] rounded-r-2xl rounded-l-md border-2 border-stone-800/90 dark:border-stone-600/80 dark:ring-1 dark:ring-white/20 bg-linear-to-tr from-[#16191E] via-[#1F252E] to-[#29303B] dark:from-[#151921] dark:via-[#1E2532] dark:to-[#2B3547] overflow-hidden shadow-2xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(59,130,246,0.18)]">
          {/* Cloth micro-texture pattern — identical to front cover */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#FFF 0.75px, transparent 0.75px)`,
              backgroundSize: '12px 12px'
            }}
          />

          {/* Notebook Spine (left edge binding) */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-linear-to-r from-stone-950 via-[#12151A] to-stone-900/80 border-r border-stone-800/80 dark:border-stone-700/80 flex flex-col justify-between py-8 items-center">
            <div className="w-1.5 h-12 bg-stone-700/60 dark:bg-amber-400/40 rounded-full" />
            <div className="w-1.5 h-12 bg-stone-700/60 dark:bg-amber-400/40 rounded-full" />
            <div className="w-1.5 h-12 bg-stone-700/60 dark:bg-amber-400/40 rounded-full" />
          </div>

          {/* Code Ink Stylus Pen (slotted on right edge) */}
          <NotebookEdgePen side="right" />

          {/* Ribbon Bookmark sticking out at bottom */}
          <div className="absolute -bottom-6 left-28 sm:left-36 w-5 h-10 bg-[#2457D6] shadow-md transform -skew-x-6 z-20 flex flex-col justify-end">
            <div
              className="w-full h-3 bg-transparent"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backgroundColor: 'var(--surface-app)'
              }}
            />
          </div>

          {/* Back Cover Surface Content */}
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 pl-12 sm:pl-16 pr-8 sm:pr-10 text-stone-200">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between border-b border-stone-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: subject.color || '#2457D6' }}
                />
                <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400">
                  CODE INK · VOL. {subject.shortCode}
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-400/90 font-bold">
                BACK COVER
              </span>
            </div>

            {/* Gold Wax Mastered Stamp */}
            <div className="flex flex-col items-center text-center my-1">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-0.5 flex items-center justify-center shadow-lg transition-all duration-700 transform ${
                  stampRevealed ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-12 opacity-0'
                }`}
              >
                <div className="w-full h-full rounded-full border border-dashed border-amber-200/80 flex flex-col items-center justify-center p-1 text-center bg-stone-900/90">
                  <Award className="w-5 h-5 text-amber-300 mb-0.5" />
                  <span className="font-mono text-[7px] uppercase tracking-wider text-amber-200 font-extrabold leading-none">
                    COURSE MASTERED
                  </span>
                  <span className="font-mono text-[6px] text-stone-400 mt-0.5">
                    {todayFormatted}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1 justify-center">
                <Sparkles className="w-3 h-3" />
                <span>All {subject.chapters.length} Chapters Mastered ({completionPercent}%)</span>
              </div>
            </div>

            {/* Vintage Handwritten Note Pinned to Back Cover */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F0] text-stone-900 shadow-md border border-[#D9D4C8] relative">
              <div className="absolute -top-1.5 left-5 w-3 h-3 rounded-full bg-red-600 shadow-xs border border-red-800" />
              <div className="font-mono text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                A Personal Note From Code Ink
              </div>
              <p className="text-xs sm:text-[13px] font-serif italic text-stone-900 leading-relaxed">
                "Thank you for reading and understanding this book! You turned through every chapter of{' '}
                <strong className="font-sans font-bold text-[#2457D6] not-italic">{subject.name}</strong> with true handwritten dedication. Keep learning, keep building!"
              </p>
              <div className="mt-2.5 pt-1.5 border-t border-stone-200/90 flex items-end justify-between select-none">
                <div className="font-mono text-[8px] text-stone-400 uppercase tracking-wider">
                  Verified & Signed
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className="text-xl sm:text-2xl text-[#1a365d] font-normal tracking-wide transform -rotate-3 select-none"
                    style={{ fontFamily: "'Alex Brush', cursive" }}
                  >
                    Harsh Lagwal
                  </span>
                  <span className="font-mono text-[7px] text-stone-500 uppercase tracking-widest -mt-1">
                    Author & Creator
                  </span>
                </div>
              </div>
            </div>

            {/* Barcode & ISBN Section at Bottom */}
            <div className="pt-2 border-t border-stone-800/80 flex items-end justify-between">
              {/* Realistic SVG Barcode */}
              <div className="bg-white p-1 rounded shadow-xs flex flex-col items-center">
                <div className="flex gap-[2px] h-6 items-end">
                  <div className="w-[2px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                  <div className="w-[3px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                  <div className="w-[2px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                  <div className="w-[3px] h-full bg-black" />
                  <div className="w-[2px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                  <div className="w-[2px] h-full bg-black" />
                  <div className="w-[3px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                  <div className="w-[2px] h-full bg-black" />
                  <div className="w-[1px] h-full bg-black" />
                </div>
                <span className="font-mono text-[7px] text-stone-800 tracking-wider">
                  9 782457 002026
                </span>
              </div>

              <div className="text-right font-mono text-[8px] text-stone-500 uppercase leading-tight">
                <div>ISBN CODEINK-{subject.shortCode}-2026</div>
                <div className="text-stone-400">Engineering Notebook</div>
                <div className="text-emerald-400 font-bold mt-0.5">Verified Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Below Closed Book */}
      <div className="w-full max-w-md mx-auto mt-6 flex flex-col gap-2.5">
        {/* Primary Action: Official Question Paper */}
        <button
          type="button"
          onClick={() => {
            notebookAudio.playMarker();
            onTakeFinalPaper();
          }}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm font-sans flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
        >
          <FileText className="w-4 h-4" />
          <span>Attempt 50-Mark Examination Paper</span>
        </button>

        {/* Secondary Row: Reopen, Previous Page, Library */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onBackToLastTopic}
            className="py-2.5 px-2 rounded-lg border border-line bg-raised hover:bg-page text-ink text-xs font-mono flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title="Read Chapter 17 / last topic again"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-muted" />
            <span>Ch {lastChapter ? String(lastChapter.number).padStart(2, '0') : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              notebookAudio.playPageTurn();
              onReopenFirstPage();
            }}
            className="py-2.5 px-2 rounded-lg border border-line bg-raised hover:bg-page text-ink text-xs font-mono flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title="Open from Chapter 01"
          >
            <RotateCcw className="w-3.5 h-3.5 text-muted" />
            <span>Page 1</span>
          </button>

          <button
            type="button"
            onClick={() => {
              notebookAudio.playPencil();
              onExploreLibrary();
            }}
            className="py-2.5 px-2 rounded-lg border border-line bg-raised hover:bg-page text-accent text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title="Switch to another subject"
          >
            <Library className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>
        </div>
      </div>
    </div>
  );
}
