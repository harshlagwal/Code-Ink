// CODEINK V2 — Revision Mode Modal
// Focused adaptive revision session generator.
// Mixes concept questions, MCQs, output prediction, and debugging with live summary.

import { useState } from 'react';
import { RevisionItem, Subject } from '../types/notebook';
import { revisionEngine } from '../services/RevisionEngine';
import { mistakeEngine } from '../services/MistakeEngine';
import {
  X,
  RotateCw,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle
} from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface RevisionSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubject?: Subject;
  bookmarkedTopicIds?: string[];
  onNavigateToTopic?: (topicId: string) => void;
  onOpenMistakeNotebook?: () => void;
}

export function RevisionSessionModal({
  isOpen,
  onClose,
  activeSubject,
  bookmarkedTopicIds,
  onNavigateToTopic,
  onOpenMistakeNotebook
}: RevisionSessionModalProps) {
  const [sessionQuestions, setSessionQuestions] = useState<RevisionItem[]>(() =>
    revisionEngine.generateSession({
      subjectId: activeSubject?.id,
      bookmarkedTopicIds
    })
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [mistakesAddedThisSession, setMistakesAddedThisSession] = useState<number>(0);
  const [failedTopics, setFailedTopics] = useState<Array<{ topicId: string; title: string; subject: string }>>([]);

  if (!isOpen) return null;

  const currentItem = sessionQuestions[currentIndex];
  const total = sessionQuestions.length;
  const currentSelection = selectedAnswers[currentIndex];
  const hasAnswered = currentSelection !== undefined;
  const isCorrect = hasAnswered && currentSelection === currentItem?.correctIndex;

  const handleStartNewSession = () => {
    notebookAudio.playPageTurn();
    const fresh = revisionEngine.generateSession({
      subjectId: activeSubject?.id,
      bookmarkedTopicIds
    });
    setSessionQuestions(fresh);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setRevealed(false);
    setIsCompleted(false);
    setMistakesAddedThisSession(0);
    setFailedTopics([]);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
    setRevealed(true);

    const correct = idx === currentItem.correctIndex;
    if (correct) {
      notebookAudio.playSuccess();
    } else {
      notebookAudio.playMarker();
      // Add to Mistake Notebook automatically
      mistakeEngine.addMistake({
        subject: currentItem.subjectName,
        subjectId: currentItem.subjectId,
        chapter: currentItem.chapterTitle,
        topic: currentItem.topicTitle,
        topicId: currentItem.topicId,
        question: currentItem.question,
        questionId: currentItem.id,
        userAnswer: currentItem.options ? currentItem.options[idx] : 'Selected Option',
        correctAnswer: currentItem.options ? currentItem.options[currentItem.correctIndex || 0] : 'Correct Option',
        options: currentItem.options,
        explanation: currentItem.explanation,
        difficulty: currentItem.difficulty,
        codeSnippet: currentItem.codeSnippet
      });

      setMistakesAddedThisSession((prev) => prev + 1);
      setFailedTopics((prev) => {
        if (!prev.some((p) => p.topicId === currentItem.topicId)) {
          return [...prev, { topicId: currentItem.topicId, title: currentItem.topicTitle, subject: currentItem.subjectName }];
        }
        return prev;
      });
    }
  };

  const handleNext = () => {
    notebookAudio.playPageTurn();
    setRevealed(false);
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Summary Metrics
  const correctCount = Object.entries(selectedAnswers).filter(
    ([idxStr, ans]) => ans === sessionQuestions[Number(idxStr)]?.correctIndex
  ).length;
  const incorrectCount = total - correctCount;
  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/65 backdrop-blur-xs select-none">
      <div className="w-full max-w-3xl bg-[#F7F3EA] rounded-xl border border-[#D9D4C8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-white border-b border-[#D9D4C8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                  Adaptive Retrieval Mode
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-100 text-stone-600">
                  Revision Session
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">
                CODEINK Revision Mode
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        {!isCompleted && total > 0 && (
          <div className="w-full h-1.5 bg-stone-200">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        )}

        {/* QUESTION RUNNER VIEW */}
        {!isCompleted && currentItem && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Question Breadcrumb & Metadata */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9D4C8]/80 text-xs">
                <div className="flex items-center gap-2 font-mono text-stone-600">
                  <span className="font-bold text-[#2457D6]">{currentItem.subjectName}</span>
                  <span>→</span>
                  <span>{currentItem.chapterTitle}</span>
                  <span>→</span>
                  <span className="font-semibold text-stone-900">{currentItem.topicTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-stone-200 text-stone-700 font-bold">
                    {currentItem.difficulty}
                  </span>
                  <span className="font-mono text-xs font-bold text-purple-700">
                    Question: {currentIndex + 1} / {total}
                  </span>
                </div>
              </div>

              {/* Source Tag */}
              <div className="mb-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-100 text-purple-800 font-semibold">
                  Source: {currentItem.source.replace('_', ' ')}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug my-2">
                {currentItem.question}
              </h4>

              {/* Code Snippet if present */}
              {currentItem.codeSnippet && (
                <div className="my-3 p-3 bg-stone-900 text-stone-200 font-mono text-xs rounded-lg overflow-x-auto shadow-inner">
                  <pre><code>{currentItem.codeSnippet}</code></pre>
                </div>
              )}

              {/* Multiple Choice Options */}
              {currentItem.options && (
                <div className="space-y-2 mt-4">
                  {currentItem.options.map((opt, optIdx) => {
                    let btnStyle = 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50';
                    if (hasAnswered) {
                      if (optIdx === currentItem.correctIndex) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                      } else if (optIdx === currentSelection) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-2 ring-rose-200';
                      } else {
                        btnStyle = 'border-stone-200 bg-white/60 text-stone-400';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={hasAnswered}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-mono flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center font-mono text-[10px] shrink-0 text-stone-600 bg-stone-50">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>

                        {hasAnswered && optIdx === currentItem.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {hasAnswered && optIdx === currentSelection && optIdx !== currentItem.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Explanation card upon answering */}
              {revealed && (
                <div
                  className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold uppercase mb-1">
                    {isCorrect ? '✓ Correct Concept Execution' : '✕ Logged to Mistake Notebook'}
                  </div>
                  <p>{currentItem.explanation}</p>
                </div>
              )}
            </div>

            {/* Bottom Step Control */}
            <div className="pt-4 mt-6 border-t border-[#D9D4C8] flex items-center justify-between">
              <span className="text-xs font-mono text-stone-500">
                {hasAnswered ? 'Question evaluated' : 'Select option to verify'}
              </span>

              {hasAnswered && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-mono font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <span>{currentIndex < total - 1 ? 'Next Question' : 'Finish Session'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* REVISION SUMMARY SCREEN */}
        {isCompleted && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-center">
                <Award className="w-12 h-12 text-[#2457D6] mx-auto mb-2" />
                <h3 className="text-xl font-bold text-stone-900">Revision Summary</h3>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Targeted retrieval session complete
                </p>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-white rounded-lg border border-stone-200">
                  <div className="text-[10px] font-mono uppercase text-stone-500">Score</div>
                  <div className="text-2xl font-bold font-mono text-stone-900 mt-1">{scorePercent}%</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{correctCount} of {total}</div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-emerald-200 bg-emerald-50/20">
                  <div className="text-[10px] font-mono uppercase text-emerald-600">Correct</div>
                  <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">{correctCount}</div>
                  <div className="text-[11px] text-emerald-600 mt-0.5">Mastered</div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-rose-200 bg-rose-50/20">
                  <div className="text-[10px] font-mono uppercase text-rose-600">Incorrect</div>
                  <div className="text-2xl font-bold font-mono text-rose-700 mt-1">{incorrectCount}</div>
                  <div className="text-[11px] text-rose-600 mt-0.5">Logged</div>
                </div>
              </div>

              {/* Topics Needing Revision List */}
              {failedTopics.length > 0 && (
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 pb-2 mb-2 border-b border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Topics Flagged For Revision ({failedTopics.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {failedTopics.map((t) => (
                      <div key={t.topicId} className="flex items-center justify-between text-xs py-1">
                        <span className="font-semibold text-stone-800">
                          {t.subject}: {t.title}
                        </span>
                        {onNavigateToTopic && (
                          <button
                            type="button"
                            onClick={() => {
                              onNavigateToTopic(t.topicId);
                              onClose();
                            }}
                            className="text-[#2457D6] hover:underline font-mono text-[11px] cursor-pointer"
                          >
                            Open Topic →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-[#D9D4C8] flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={handleStartNewSession}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Another Revision</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-mono font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Return to Notebook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
