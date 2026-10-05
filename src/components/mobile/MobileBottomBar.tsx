import React from 'react';
import { ChevronLeft, ChevronRight, Bookmark, SlidersHorizontal, BookOpen } from 'lucide-react';
import { notebookAudio } from '../../utils/audioEffects';

interface MobileBottomBarProps {
  currentPageNumber: number;
  totalTopics: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenSettings: () => void;
  onOpenQuickJump?: () => void;
}

/**
 * Mobile Bottom Bar Navigation
 * Reference: PRD Section 7.4 & 9.7
 * Fixed to the bottom of the viewport with safe-area inset support.
 * Features thumb-reachable Prev, Next, Bookmark, Page indicator, and Settings.
 */
export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPageNumber,
  totalTopics,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  isBookmarked,
  onToggleBookmark,
  onOpenSettings,
  onOpenQuickJump,
}) => {
  const handlePrevClick = () => {
    if (!hasPrev) return;
    try {
      notebookAudio.playPageTurn();
    } catch {}
    onPrev();
  };

  const handleNextClick = () => {
    try {
      notebookAudio.playPageTurn();
    } catch {}
    onNext();
  };

  const handleBookmarkClick = () => {
    try {
      notebookAudio.playPencil();
    } catch {}
    onToggleBookmark();
  };

  return (
    <nav
      aria-label="Mobile Diary Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1E232A]/95 text-stone-100 border-t border-stone-800 shadow-2xl backdrop-blur-md pb-[env(safe-area-inset-bottom,0.5rem)]"
    >
      <div className="max-w-md mx-auto h-14 px-3 flex items-center justify-between">
        {/* Previous Topic Button */}
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={!hasPrev}
          className={`flex items-center justify-center min-w-[44px] h-11 px-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
            hasPrev
              ? 'text-stone-200 hover:text-white hover:bg-stone-800 active:scale-95'
              : 'text-stone-600 opacity-40 cursor-not-allowed'
          }`}
          aria-label="Previous Topic"
        >
          <ChevronLeft className="w-5 h-5 mr-0.5" />
          <span className="text-[11px] font-sans">Prev</span>
        </button>

        {/* Center Cluster: Bookmark & Page Indicator */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`min-w-[44px] min-h-[44px] p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isBookmarked
                ? 'bg-[#2457D6] text-white shadow-xs'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark topic'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Page Counter Indicator (tappable for quick jump if provided) */}
          <button
            type="button"
            onClick={onOpenQuickJump}
            className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 font-mono text-xs flex items-center gap-1 hover:border-stone-700 transition-colors cursor-pointer"
            title="Topic Progress"
          >
            <span className="text-white font-bold">{String(currentPageNumber).padStart(2, '0')}</span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-400">{String(totalTopics).padStart(2, '0')}</span>
          </button>

          {/* Reading Settings Trigger */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Reading Settings"
            title="Adjust Paper & Font"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Next Topic Button */}
        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center justify-center min-w-[44px] h-11 px-2.5 rounded-xl font-mono text-xs text-stone-200 hover:text-white hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
          aria-label={hasNext ? 'Next Topic' : 'Finish & Close'}
        >
          <span className="text-[11px] font-sans">{hasNext ? 'Next' : 'Finish'}</span>
          <ChevronRight className="w-5 h-5 ml-0.5" />
        </button>
      </div>
    </nav>
  );
};
