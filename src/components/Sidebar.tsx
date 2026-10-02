import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Bookmark, BookOpen } from 'lucide-react';
import { Subject, TopicContent } from '../types/notebook';

interface SidebarProps {
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

export function Sidebar({
  subjects,
  activeSubject,
  activeTopic,
  onSelectTopic,
  onSelectSubject,
  completedTopicIds,
  bookmarkedTopicIds,
  isMobileDrawer = false,
  onCloseMobileDrawer
}: SidebarProps) {
  // Store expanded chapter IDs
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [activeTopic.chapterId]: true
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const programmingSubjects = subjects.filter(s => s.category === 'programming');
  const csSubjects = subjects.filter(s => s.category === 'cs');

  return (
    <aside
      className={`w-full ${
        isMobileDrawer ? 'max-w-xs bg-[#F7F3EA] h-full overflow-y-auto' : 'w-72 sm:w-80 shrink-0'
      } flex flex-col border-r border-[#D9D4C8] pr-2 sm:pr-4`}
    >
      {/* Subject Switcher Segment */}
      <div className="mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-2 px-2">
          Programming Languages
        </div>
        <div className="space-y-1">
          {programmingSubjects.map(sub => {
            const isSelected = sub.id === activeSubject.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  onSelectSubject(sub);
                  if (isMobileDrawer && onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#2457D6]/10 text-[#2457D6] font-semibold border-l-2 border-[#2457D6]'
                    : 'text-stone-700 hover:bg-stone-200/50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="font-mono text-[11px] text-stone-500">{sub.shortCode}</span>
                  <span className="truncate">{sub.name}</span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  {sub.chapters.reduce((acc, c) => acc + c.topics.length, 0)} pgs
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mt-5 mb-2 px-2">
          Computer Science Core
        </div>
        <div className="space-y-1">
          {csSubjects.map(sub => {
            const isSelected = sub.id === activeSubject.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  onSelectSubject(sub);
                  if (isMobileDrawer && onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#2457D6]/10 text-[#2457D6] font-semibold border-l-2 border-[#2457D6]'
                    : 'text-stone-700 hover:bg-stone-200/50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="font-mono text-[11px] text-stone-500">{sub.shortCode}</span>
                  <span className="truncate">{sub.name}</span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  {sub.chapters.reduce((acc, c) => acc + c.topics.length, 0)} pgs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapters & Topics Tree for Active Subject */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 mb-3 pb-2 border-b border-[#D9D4C8]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800">
            {activeSubject.name} Index
          </span>
          <span className="font-mono text-[10px] text-stone-500">
            {activeSubject.chapters.length} Chapters
          </span>
        </div>

        <div className="space-y-3">
          {activeSubject.chapters.map(chapter => {
            const isExpanded = expandedChapters[chapter.id] !== false; // default expanded

            return (
              <div key={chapter.id} className="border-b border-[#D9D4C8]/40 pb-2">
                {/* Chapter Toggle Header */}
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between py-1.5 px-2 text-left hover:bg-stone-200/40 rounded transition-colors text-xs text-stone-800 font-medium"
                >
                  <div className="flex items-center gap-2 truncate">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    )}
                    <span className="font-mono text-stone-500 text-[11px]">
                      Ch {String(chapter.number).padStart(2, '0')}:
                    </span>
                    <span className="truncate text-stone-900">{chapter.title}</span>
                  </div>
                </button>

                {/* Topics in Chapter */}
                {isExpanded && (
                  <div className="ml-4 pl-2 border-l border-[#D9D4C8]/80 mt-1 space-y-0.5">
                    {chapter.topics.map(topic => {
                      const isActive = topic.id === activeTopic.id;
                      const isCompleted = completedTopicIds.includes(topic.id);
                      const isBookmarked = bookmarkedTopicIds.includes(topic.id);

                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => {
                            onSelectTopic(topic, activeSubject);
                            if (isMobileDrawer && onCloseMobileDrawer) onCloseMobileDrawer();
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors ${
                            isActive
                              ? 'bg-white text-[#2457D6] font-semibold shadow-xs border border-[#D9D4C8]'
                              : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-mono text-[10px] text-stone-400 shrink-0">
                              {String(topic.pageNumber).padStart(2, '0')}
                            </span>
                            <span className="truncate">{topic.title}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 ml-1">
                            {isBookmarked && (
                              <Bookmark className="w-3 h-3 text-[#2457D6] fill-current" />
                            )}
                            {isCompleted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
      </div>

      {/* Notebook Spine footer signature */}
      <div className="mt-auto pt-4 px-2 text-[11px] font-mono text-stone-400 border-t border-[#D9D4C8]/60 flex items-center justify-between">
        <span>CODEINK · v1.0</span>
        <span className="font-handwritten text-sm text-stone-500">pen & paper</span>
      </div>
    </aside>
  );
}
