import { Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';
import { Subject, TopicContent } from '../types/notebook';
import { findTopicById } from '../data/notebookData';

interface BookmarksViewProps {
  bookmarkedTopicIds: string[];
  onSelectTopic: (topic: TopicContent, subject: Subject) => void;
  onRemoveBookmark: (topicId: string) => void;
  onGoToNotebook: () => void;
}

export function BookmarksView({
  bookmarkedTopicIds,
  onSelectTopic,
  onRemoveBookmark,
  onGoToNotebook
}: BookmarksViewProps) {
  const bookmarkedTopics = bookmarkedTopicIds
    .map(id => findTopicById(id))
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D9D4C8]">
        <div>
          <div className="text-xs font-mono tracking-widest text-[#2457D6] uppercase">
            Study Shelf
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
            Bookmarked Concepts
          </h1>
          <p className="text-sm text-stone-600 mt-1 font-serif italic">
            Saved pages for quick revision and exam reference
          </p>
        </div>

        <div className="font-mono text-xs text-stone-500 bg-white px-3 py-1.5 rounded border border-[#D9D4C8]">
          {bookmarkedTopics.length} {bookmarkedTopics.length === 1 ? 'Page' : 'Pages'} Saved
        </div>
      </div>

      {bookmarkedTopics.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#D9D4C8] shadow-sm">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-stone-800">No bookmarked pages yet</h3>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
            While studying any notebook page, tap the bookmark ribbon or press <kbd className="font-mono bg-stone-100 px-1 border rounded">K</kbd> to save it here.
          </p>
          <button
            type="button"
            onClick={onGoToNotebook}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-100 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open First Page</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedTopics.map(({ topic, subject, chapter }) => (
            <div
              key={topic.id}
              className="p-4 sm:p-5 bg-[#FFFDF7] rounded-xl border border-[#D9D4C8] shadow-xs hover:border-stone-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-[#2457D6]">{subject.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>Chapter {String(topic.chapterNumber).padStart(2, '0')}: {chapter.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">Page {String(topic.pageNumber).padStart(2, '0')}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-[#2457D6] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                  {topic.definition}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onRemoveBookmark(topic.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTopic(topic, subject)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-stone-100 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                >
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
