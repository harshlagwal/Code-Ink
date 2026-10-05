import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Subject, TopicContent } from '../types/notebook';

interface NotebookLibraryProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onSelectTopic: (topic: TopicContent, subject: Subject) => void;
  completedTopicIds: string[];
}

export function NotebookLibrary({
  subjects,
  onSelectSubject,
  onSelectTopic,
  completedTopicIds
}: NotebookLibraryProps) {
  const programmingSubs = subjects.filter(s => s.category === 'programming');
  const csSubs = subjects.filter(s => s.category === 'cs');

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-line">
        <div className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
          Notebook Library
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink mt-1">
          Curriculum & Core Subjects
        </h1>
        <p className="text-sm text-muted mt-1 font-serif italic">
          Select a notebook volume to open its ruled pages and start studying
        </p>
      </div>

      {/* Programming Section */}
      <div className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
          <span>Programming Languages</span>
          <span className="h-px flex-1 bg-line" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programmingSubs.map(sub => {
            const allTopics = sub.chapters.flatMap(c => c.topics);
            const completedCount = allTopics.filter(t => completedTopicIds.includes(t.id)).length;
            const firstTopic = allTopics[0];

            return (
              <div
                key={sub.id}
                className="p-5 bg-raised rounded-xl border border-line shadow-xs hover:border-accent hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-accent text-sm">
                      {sub.shortCode}
                    </span>
                    <span className="font-mono text-muted text-[11px]">
                      {completedCount}/{allTopics.length} completed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ink">{sub.name}</h3>
                  <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                    {sub.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-line flex flex-wrap gap-1.5 text-[11px] text-muted font-mono">
                    <span>{sub.chapters.length} Chapters</span>
                    <span>·</span>
                    <span>{allTopics.length} Study Pages</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSubject(sub);
                      if (firstTopic) onSelectTopic(firstTopic, sub);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    <span>Open Notebook Volume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-handwritten text-xs text-muted">
                    Ch 01 ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CS Foundations Section (Rendered when active) */}
      {csSubs.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 flex items-center gap-2">
            <span>Computer Science Foundations</span>
            <span className="h-px flex-1 bg-line" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {csSubs.map(sub => {
              const allTopics = sub.chapters.flatMap(c => c.topics);
              const completedCount = allTopics.filter(t => completedTopicIds.includes(t.id)).length;
              const firstTopic = allTopics[0];

              return (
                <div
                  key={sub.id}
                  className="p-5 bg-raised rounded-xl border border-line shadow-xs hover:border-accent hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                        {sub.shortCode}
                      </span>
                      <span className="font-mono text-muted text-[11px]">
                        {completedCount}/{allTopics.length}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ink">{sub.name}</h3>
                    <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                      {sub.tagline}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSubject(sub);
                        if (firstTopic) onSelectTopic(firstTopic, sub);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline cursor-pointer"
                    >
                      <span>Read Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[10px] text-muted">
                      {allTopics.length} pgs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
