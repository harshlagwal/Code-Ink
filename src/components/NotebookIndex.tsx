import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Bookmark } from 'lucide-react';
import { Subject, TopicContent } from '../types/notebook';

interface NotebookIndexProps {
  subjects: Subject[];
  activeSubject: Subject;
  activeTopic: TopicContent;
  onSelectTopic: (topic: TopicContent, subject: Subject) => void;
  onSelectSubject: (subject: Subject) => void;
  completedTopicIds: string[];
  bookmarkedTopicIds: string[];
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export function NotebookIndex({
  subjects,
  activeSubject,
  activeTopic,
  onSelectTopic,
  onSelectSubject,
  completedTopicIds,
  bookmarkedTopicIds,
  isMobileDrawer = false,
  onCloseMobileDrawer
}: NotebookIndexProps) {
  // Track expanded chapters
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [activeTopic.chapterId]: true
  });

  // Refs for independent smooth scrolling
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTopicRef = useRef<HTMLButtonElement | null>(null);

  // Auto-expand chapter when active topic changes
  useEffect(() => {
    if (activeTopic.chapterId) {
      setExpandedChapters(prev => ({
        ...prev,
        [activeTopic.chapterId]: true
      }));
    }
  }, [activeTopic.chapterId]);

  // Smoothly scroll active topic into view
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeTopic.id]);

  // Reset scroll position to top on subject switch
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeSubject.id]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <aside
      className={`w-full h-full max-h-full ${
        isMobileDrawer
          ? 'max-w-xs bg-app p-4'
          : 'w-64 lg:w-72 shrink-0 py-2 pr-2'
      } flex flex-col font-sans select-none overflow-hidden`}
    >
      {/* 1. Fixed Index Header with Brand Seal */}
      <div className="shrink-0 pb-2.5 mb-2 border-b border-line">
        <div className="flex items-center gap-2 mb-1.5">
          <img
            src="/codeink-logo.webp"
            alt="Code Ink"
            className="w-5 h-5 rounded object-contain opacity-90"
          />
          <span className="font-mono text-[10px] tracking-widest text-accent uppercase font-bold">
            CODE INK · INDEX
          </span>
          <span className="font-handwritten text-xs text-muted ml-auto">
            table of contents
          </span>
        </div>
        <div className="text-xs text-ink font-bold uppercase tracking-wider flex items-center justify-between">
          <span className="truncate">{activeSubject.name}</span>
          <span className="text-[10px] font-mono text-muted">vol. {activeSubject.shortCode}</span>
        </div>
      </div>

      {/* 2. Fixed Subject Selector: [ C ] [ C++ ] [ PY ] [ JS ] [ JAVA ] */}
      <div className="shrink-0 mb-3 pb-3 border-b border-line">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5 flex items-center justify-between">
          <span>Select Subject Volume</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {subjects.map(sub => {
            const isSelected = sub.id === activeSubject.id;
            const isComingSoon = sub.status === 'coming_soon';

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  onSelectSubject(sub);
                  if (sub.chapters[0]?.topics[0]) {
                    onSelectTopic(sub.chapters[0].topics[0], sub);
                  }
                  if (isMobileDrawer && onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={`relative px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : isComingSoon
                    ? 'bg-raised text-muted hover:bg-page border border-line'
                    : 'bg-page text-ink hover:bg-raised border border-line'
                }`}
                title={isComingSoon ? `${sub.name} (Volume in preparation)` : sub.name}
              >
                <span>{sub.shortCode}</span>
                {isComingSoon && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Independently Scrollable Chapter & Topic List */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-1.5 index-scrollbar"
      >
        {activeSubject.chapters.map(chapter => {
          const isExpanded = expandedChapters[chapter.id] !== false;
          const hasActiveTopic = chapter.topics.some(t => t.id === activeTopic.id);

          return (
            <div key={chapter.id} className="text-xs">
              {/* Chapter Accordion Header */}
              <button
                type="button"
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center justify-between py-1.5 px-2 rounded text-left transition-colors cursor-pointer ${
                  hasActiveTopic
                    ? 'text-accent font-semibold bg-accent/10'
                    : 'text-ink hover:bg-raised'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-muted shrink-0" />
                  )}
                  <span className="font-mono text-[11px] text-muted shrink-0">
                    {String(chapter.number).padStart(2, '0')}
                  </span>
                  <span className="truncate">{chapter.title}</span>
                </div>
              </button>

              {/* Topics in Chapter */}
              {isExpanded && (
                <div className="ml-4 pl-2 border-l border-line mt-1 space-y-0.5">
                  {chapter.topics.map(topic => {
                    const isActive = topic.id === activeTopic.id;
                    const isCompleted = completedTopicIds.includes(topic.id);
                    const isBookmarked = bookmarkedTopicIds.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        ref={isActive ? activeTopicRef : null}
                        type="button"
                        onClick={() => {
                          onSelectTopic(topic, activeSubject);
                          if (isMobileDrawer && onCloseMobileDrawer) onCloseMobileDrawer();
                        }}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded text-left transition-all text-xs cursor-pointer ${
                          isActive
                            ? 'bg-raised text-accent font-bold shadow-xs border-l-2 border-accent'
                            : 'text-muted hover:text-ink hover:bg-raised'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] text-muted shrink-0">
                            Pg {String(topic.pageNumber * 2).padStart(2, '0')}
                          </span>
                          <span className="truncate">{topic.title}</span>
                        </div>

                        {/* Progress Status: ✓ Completed | ● Current | ○ Not Started */}
                        <div className="flex items-center gap-1.5 shrink-0 ml-1">
                          {isCompleted ? (
                            <span className="text-emerald-500 font-bold text-xs" title="Completed">✓</span>
                          ) : isActive ? (
                            <span className="text-accent text-[10px] leading-none" title="Current">●</span>
                          ) : (
                            <span className="text-muted/50 text-[10px] leading-none" title="Not Started">○</span>
                          )}
                          {isBookmarked && (
                            <Bookmark className="w-3 h-3 text-accent fill-current" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Fixed Index Footer */}
      <div className="shrink-0 mt-auto pt-2.5 border-t border-line text-[10px] font-mono text-muted flex items-center justify-between">
        <span>{completedTopicIds.filter(id => id.startsWith(activeSubject.id)).length} / {activeSubject.chapters.reduce((acc, c) => acc + c.topics.length, 0)} mastered</span>
        <span className="font-handwritten text-xs text-muted">CODEINK library</span>
      </div>
    </aside>
  );
}
