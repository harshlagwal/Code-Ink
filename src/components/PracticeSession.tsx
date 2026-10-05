// CODEINK V2 — Practice Session with Mistake Notebook integration & AI Study Desk
// Prompts student with [Add to Mistake Notebook] on incorrect response.

import { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Eye, EyeOff, RotateCcw, AlertCircle, Bot, Check } from 'lucide-react';
import { PracticeQuestionItem } from '../types/notebook';
import { mistakeEngine } from '../services/MistakeEngine';
import { notebookAudio } from '../utils/audioEffects';

interface PracticeSessionProps {
  questions: PracticeQuestionItem[];
  topicTitle?: string;
  chapterTitle?: string;
  subjectName?: string;
  subjectId?: string;
  topicId?: string;
  onOpenAIStudyDesk?: (questionText: string) => void;
  onOpenMistakeNotebook?: () => void;
}

export function PracticeSession({
  questions,
  topicTitle = 'Current Topic',
  chapterTitle = 'Current Chapter',
  subjectName = 'Engineering',
  subjectId = 'eng',
  topicId = 'unknown-topic',
  onOpenAIStudyDesk,
  onOpenMistakeNotebook
}: PracticeSessionProps) {
  // Store user answer selections: { [questionId]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  // Store revealed answers: { [questionId]: boolean }
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  // Track which mistakes have been logged
  const [addedMistakeIds, setAddedMistakeIds] = useState<Record<string, boolean>>({});

  if (!questions || questions.length === 0) return null;

  const handleSelectOption = (q: PracticeQuestionItem, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [q.id]: optionIndex
    }));
    // Auto-reveal explanation on selection
    setRevealedAnswers((prev) => ({
      ...prev,
      [q.id]: true
    }));

    if (optionIndex === q.correctIndex) {
      notebookAudio.playSuccess();
    } else {
      notebookAudio.playMarker();
    }
  };

  const handleToggleReveal = (questionId: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleReset = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setRevealedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleAddToMistakes = (q: PracticeQuestionItem, selectedIndex: number) => {
    notebookAudio.playPencil();
    mistakeEngine.addMistake({
      subject: subjectName,
      subjectId: subjectId,
      chapter: chapterTitle,
      topic: topicTitle,
      topicId: topicId,
      question: q.question,
      questionId: q.id,
      userAnswer: q.options[selectedIndex] || 'Selected Option',
      correctAnswer: q.options[q.correctIndex] || 'Correct Option',
      options: q.options,
      explanation: q.explanation,
      codeSnippet: q.codeSnippet
    });

    setAddedMistakeIds((prev) => ({
      ...prev,
      [q.id]: true
    }));
  };

  return (
    <div className="my-6 p-4 sm:p-6 rounded-lg bg-raised border border-line shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span className="font-bold uppercase tracking-wider text-ink text-[11px]">
            PRACTICE SESSION · CONCEPT MASTERY
          </span>
        </div>
        <span className="font-handwritten text-xs text-muted">
          test your understanding
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isRevealed = revealedAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = hasAnswered && selected === q.correctIndex;
          const isMistakeAdded = addedMistakeIds[q.id];

          return (
            <div key={q.id} className="pb-4 border-b border-line last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-xs sm:text-sm font-semibold text-ink leading-relaxed">
                  <span className="text-accent font-mono mr-1.5">Q{qIndex + 1}.</span>
                  {q.question}
                </h4>

                {hasAnswered && (
                  <button
                    type="button"
                    onClick={() => handleReset(q.id)}
                    className="p-1 text-muted hover:text-ink transition-colors shrink-0 cursor-pointer"
                    title="Retry question"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Code Snippet if present in question */}
              {q.codeSnippet && (
                <div className="my-2.5 p-3 rounded bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto shadow-inner">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-1.5 my-3">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = 'border border-line bg-page text-ink hover:border-accent hover:bg-raised';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500/80 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-medium';
                    } else if (optIdx === selected) {
                      btnStyle = 'border-rose-500/80 bg-rose-500/15 text-rose-800 dark:text-rose-200';
                    } else {
                      btnStyle = 'border-line bg-page/50 text-muted';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q, optIdx)}
                      className={`w-full text-left p-2.5 rounded border text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-line flex items-center justify-center font-mono text-[10px] shrink-0 text-muted bg-raised">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && optIdx === selected && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status & Add to Mistake Notebook Bar */}
              <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleReveal(q.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-accent hover:underline cursor-pointer"
                  >
                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{isRevealed ? 'Hide Explanation' : 'Show Answer'}</span>
                  </button>

                  {onOpenAIStudyDesk && (
                    <button
                      type="button"
                      onClick={() => onOpenAIStudyDesk(q.question)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline cursor-pointer"
                      title="Ask AI Study Desk about this question"
                    >
                      <Bot className="w-3 h-3" />
                      <span>Ask AI Study Desk</span>
                    </button>
                  )}
                </div>

                {hasAnswered && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-handwritten text-sm font-bold ${
                        isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? '✓ Correct Answer' : '✕ Review Concept'}
                    </span>
                  </div>
                )}
              </div>

              {/* Explanation Accordion */}
              {isRevealed && (
                <div
                  className={`mt-2.5 p-3 rounded text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
                  }`}
                >
                  <div className="font-semibold mb-0.5 font-mono text-[10px] uppercase">
                    Answer: Option {String.fromCharCode(65 + q.correctIndex)}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
