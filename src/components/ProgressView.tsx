// CODEINK V2 — Learning Dashboard
// Authentic engineering notebook telemetry ledger.
// Displays transparent subject progress, mastery counts, mistakes, and intelligent "Needs Revision" diagnostics.

import { useState } from 'react';
import { Subject, TopicContent } from '../types/notebook';
import { dashboardEngine, SubjectLearningStats, NeedsRevisionItem } from '../services/DashboardEngine';
import {
  CheckCircle2,
  Bookmark,
  Clock,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Brain,
  AlertTriangle,
  AlertCircle,
  Award,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface ProgressViewProps {
  subjects: Subject[];
  completedTopicIds: string[];
  bookmarkedTopicIds: string[];
  userNotes: Record<string, string>;
  recentTopicIds: string[];
  onSelectTopicById: (topicId: string) => void;
  onResetProgress: () => void;
  onGoToNotebook: () => void;
  onOpenRevisionMode?: () => void;
  onOpenMistakeNotebook?: () => void;
}

export function ProgressView({
  subjects,
  completedTopicIds,
  bookmarkedTopicIds,
  userNotes,
  recentTopicIds,
  onSelectTopicById,
  onResetProgress,
  onGoToNotebook,
  onOpenRevisionMode,
  onOpenMistakeNotebook
}: ProgressViewProps) {
  const metrics = dashboardEngine.computeMetrics(completedTopicIds, bookmarkedTopicIds, userNotes);
  const [activeTab, setActiveTab] = useState<'overview' | 'needs_revision' | 'subjects'>('overview');

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 select-none">
      {/* Engineering Ledger Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#D9D4C8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-[#2457D6] uppercase font-bold">
              Engineering Log & Academic Telemetry
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-200 text-stone-700 font-bold">
              V2 SYSTEM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1 font-serif">
            Student Learning Ledger
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-serif italic">
            Deterministic mastery audit across C, C++, Python, JavaScript, Java, and DSA
          </p>
        </div>

        {/* Quick Launch Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenRevisionMode && (
            <button
              type="button"
              onClick={onOpenRevisionMode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-700 text-white text-xs font-mono font-bold hover:bg-purple-800 shadow-2xs transition-colors cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Launch Revision</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Key Metrics (Physical Metric Stamp Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl border border-[#D9D4C8] shadow-2xs relative overflow-hidden">
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
            Topics Mastered
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#171717] mt-1 tabular-nums">
            {metrics.topicsMastered}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
            <span>of {metrics.totalTopics} curriculum topics</span>
            <span className="font-mono font-bold text-[#2457D6]">{metrics.overallPercentage}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2457D6]" style={{ width: `${metrics.overallPercentage}%` }} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#D9D4C8] shadow-2xs">
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
            Practice Completed
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-700 mt-1 tabular-nums">
            {metrics.practiceCompleted}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Verified problem sets solved</div>
          <div className="text-[10px] font-mono text-purple-600 mt-2 font-bold">
            Active retention audit
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#D9D4C8] shadow-2xs">
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
            Flashcards Reviewed
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-700 mt-1 tabular-nums">
            {metrics.flashcardsReviewed}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {metrics.flashcardsMastered} mastered in Leitner boxes
          </div>
          <div className="text-[10px] font-mono text-amber-600 mt-2 font-bold">
            Spaced repetition cycle
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#D9D4C8] shadow-2xs">
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
            Mistakes Resolved
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
            {metrics.mistakesResolved}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {metrics.activeMistakesCount} active needs recovery
          </div>
          <div className="text-[10px] font-mono text-emerald-600 mt-2 font-bold">
            Error recovery ledger
          </div>
        </div>
      </div>

      {/* Tab Switcher for Deep Dive */}
      <div className="flex items-center gap-2 border-b border-[#D9D4C8] mb-6 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-2.5 px-3 font-semibold transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-b-2 border-[#2457D6] text-[#2457D6]'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Subject Progress Breakdown
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('needs_revision')}
          className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'needs_revision'
              ? 'border-b-2 border-rose-600 text-rose-700'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span>Needs Revision</span>
          {metrics.needsRevisionTopics.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-700 font-bold">
              {metrics.needsRevisionTopics.length}
            </span>
          )}
        </button>
      </div>

      {/* --- TAB 1: SUBJECT PROGRESS BREAKDOWN --- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#D9D4C8] p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9D4C8]/70">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
                Curriculum Subject Matrix
              </h2>
              <span className="text-[11px] font-mono text-stone-400">
                C · C++ · Python · JavaScript · Java · DSA
              </span>
            </div>

            <div className="space-y-6">
              {metrics.subjectStats.map((stat) => (
                <div key={stat.subjectId} className="p-4 rounded-lg bg-[#FAF8F2] border border-[#D9D4C8]/80">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#2457D6] px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                          {stat.shortCode}
                        </span>
                        <h3 className="font-bold text-sm text-stone-900">{stat.subjectName}</h3>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono mt-1">
                        {stat.topicsCompleted} of {stat.totalTopics} topics read ({stat.completionPercentage}%)
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-stone-600 flex-wrap">
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block uppercase">Mastered</span>
                        <span className="font-bold text-stone-800">{stat.topicsMastered}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block uppercase">Practice</span>
                        <span className="font-bold text-purple-700">{stat.practiceCompleted}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block uppercase">Flashcards</span>
                        <span className="font-bold text-amber-700">{stat.flashcardsMastered}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block uppercase">Mistakes</span>
                        <span className="font-bold text-rose-700">{stat.activeMistakes}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 text-[10px] block uppercase">Revision Req</span>
                        <span className="font-bold text-blue-700">{stat.revisionRequiredCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-stone-200/70 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-[#2457D6] transition-all duration-500"
                      style={{ width: `${stat.completionPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: NEEDS REVISION SYSTEM (Phase 4 requirement) --- */}
      {activeTab === 'needs_revision' && (
        <div className="bg-white rounded-xl border border-[#D9D4C8] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C8]/70">
            <div>
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Deterministic "Needs Revision" Topics</span>
              </h2>
              <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                Automatically identified from repeated practice errors, unmastered Leitner cards, and low mastery
              </p>
            </div>

            {onOpenRevisionMode && (
              <button
                type="button"
                onClick={onOpenRevisionMode}
                className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-mono text-xs font-bold hover:bg-stone-800 cursor-pointer"
              >
                Revise All Flagged →
              </button>
            )}
          </div>

          {metrics.needsRevisionTopics.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2 opacity-80" />
              <p className="font-bold text-stone-800 text-sm">All Topics Operating at High Retention!</p>
              <p className="text-stone-500 mt-1">
                Zero active practice mistakes or unreviewed flashcards detected across your syllabus.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#D9D4C8]/60">
              {metrics.needsRevisionTopics.map((item) => (
                <div key={item.topicId} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                        item.severity === 'high'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {item.severity}
                    </span>

                    <div className="truncate">
                      <div className="font-semibold text-stone-900 truncate">
                        <span className="text-[#2457D6] font-mono mr-1.5">{item.subjectName}:</span>
                        {item.topicTitle}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                        Reason: {item.reason} · Page {String(item.pageNumber).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTopicById(item.topicId)}
                    className="inline-flex items-center gap-1 text-[#2457D6] hover:underline font-mono text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    <span>Read Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent Reading Ledger */}
      {recentTopicIds.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-[#D9D4C8] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9D4C8]/70">
            <h3 className="text-xs font-mono font-bold uppercase text-stone-700 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Recent Reading Trail</span>
            </h3>
            <span className="text-[11px] font-mono text-stone-400">Chronological history</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentTopicIds.slice(0, 8).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onSelectTopicById(id)}
                className="px-3 py-1 rounded-md bg-[#FAF8F2] border border-[#D9D4C8] text-xs font-mono text-stone-700 hover:text-[#2457D6] hover:border-stone-400 transition-colors cursor-pointer"
              >
                #{id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ledger Reset & Bottom Controls */}
      <div className="mt-8 pt-4 border-t border-[#D9D4C8] flex items-center justify-between text-xs text-stone-500 font-mono">
        <button
          type="button"
          onClick={onResetProgress}
          className="hover:text-rose-700 transition-colors cursor-pointer"
        >
          Reset Reading Ledger
        </button>

        <button
          type="button"
          onClick={onGoToNotebook}
          className="text-[#2457D6] hover:underline cursor-pointer font-bold"
        >
          Return to Notebook →
        </button>
      </div>
    </div>
  );
}
