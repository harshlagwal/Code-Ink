// CODEINK V2 — Global Search Modal
// Searches across Subjects, Chapters, Topics, Concepts, Code, Practice Questions,
// Bookmarks, Personal Notes, Mistake Notebook, and Flashcards.
// Keyboard shortcut: Ctrl + K (or Cmd + K). 100% offline and instant.

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Code2, Bookmark, PenLine, AlertCircle, HelpCircle, Layers } from 'lucide-react';
import { findTopicById } from '../data/notebookData';
import { Subject, TopicContent, UnifiedSearchResult, SearchResultType } from '../types/notebook';
import { searchEngine } from '../services/SearchEngine';
import { notebookAudio } from '../utils/audioEffects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: TopicContent, subject: Subject) => void;
  bookmarkedTopicIds?: string[];
  userNotes?: Record<string, string>;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectTopic,
  bookmarkedTopicIds,
  userNotes
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: UnifiedSearchResult[] = searchEngine.search(query, {
    bookmarkedTopicIds,
    userNotes
  });

  const handlePickResult = (res: UnifiedSearchResult) => {
    notebookAudio.playPageTurn();
    const match = findTopicById(res.topicId);
    if (match) {
      onSelectTopic(match.topic, match.subject);
      onClose();
    }
  };

  const getResultTypeBadge = (type: SearchResultType) => {
    switch (type) {
      case 'subject':
        return <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#2457D6] font-mono text-[10px] font-bold uppercase">Subject</span>;
      case 'chapter':
        return <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px] font-bold uppercase">Chapter</span>;
      case 'topic':
        return <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">Topic</span>;
      case 'concept':
        return <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold uppercase">Concept</span>;
      case 'code':
        return <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[10px] font-bold uppercase">Code</span>;
      case 'practice':
        return <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[10px] font-bold uppercase">Practice</span>;
      case 'bookmark':
        return <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold uppercase">Bookmark</span>;
      case 'note':
        return <span className="px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-900 font-mono text-[10px] font-bold uppercase">Personal Note</span>;
      case 'mistake':
        return <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[10px] font-bold uppercase">Mistake</span>;
      case 'flashcard':
        return <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold uppercase">Flashcard</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-stone-950/45 backdrop-blur-xs select-none">
      <div
        className="w-full max-w-2xl bg-[#FFFDF7] rounded-xl border border-[#D9D4C8] shadow-2xl overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#D9D4C8] bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, pointer arithmetic, V8, recursion, mistakes, notes (Ctrl+K)..."
            className="flex-1 bg-transparent border-0 text-stone-900 placeholder:text-stone-400 focus:outline-hidden text-sm sm:text-base font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded border border-stone-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-[#D9D4C8]/50">
          {!query.trim() ? (
            <div className="py-12 text-center text-stone-500 text-xs sm:text-sm">
              <BookOpen className="w-8 h-8 mx-auto text-stone-400 mb-2 opacity-60" />
              <p className="font-semibold text-stone-800">Global Engineering Knowledge Base</p>
              <p className="mt-1 text-stone-400 max-w-md mx-auto">
                Search simultaneously across 6 Subjects, 150+ Topics, Memory Models, Code Snippets, Practice Questions, Bookmarks, and Mistake Notebooks.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                {['pointer', 'v8 engine', 'linked list', 'recursion', 'stack', 'typeof null', 'deadlock'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 hover:text-[#2457D6] hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs sm:text-sm">
              <p className="font-medium text-stone-700">No matching concepts found for "{query}"</p>
              <p className="mt-1 text-stone-400">
                Try searching for broader terms like "pointer", "array", "memory", "struct", or "loops"
              </p>
            </div>
          ) : (
            results.map((res) => (
              <button
                key={res.id}
                type="button"
                onClick={() => handlePickResult(res)}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-stone-100/80 transition-colors group flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  {/* Breadcrumb: Subject -> Chapter -> Topic -> Result type */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 flex-wrap">
                    <span className="font-bold text-[#2457D6]">{res.subjectName}</span>
                    <span>→</span>
                    <span className="text-stone-600">{res.chapterTitle}</span>
                    <span>→</span>
                    <span className="font-medium text-stone-800">{res.topicTitle}</span>
                    {getResultTypeBadge(res.resultType)}
                  </div>

                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#2457D6] transition-colors truncate">
                    {res.title}
                  </h4>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed font-sans">
                    {res.snippet}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0 mt-1">
                  {res.pageNumber && (
                    <span className="font-mono text-[10px] text-stone-400">
                      Pg {String(res.pageNumber).padStart(2, '0')}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#2457D6] group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-[#D9D4C8] text-[11px] font-mono text-stone-500 flex items-center justify-between">
          <span>{results.length} results matched across all sources</span>
          <span className="hidden sm:inline font-handwritten text-stone-600 text-sm">
            Press Enter or click to jump directly to page
          </span>
        </div>
      </div>
    </div>
  );
}
