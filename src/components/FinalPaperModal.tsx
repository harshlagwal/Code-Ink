import { useState, useEffect } from 'react';
import { FinalAssessment, AssessmentQuestion } from '../types/notebook';
import { Clock, CheckCircle2, AlertCircle, Bookmark, ArrowRight, ArrowLeft, RotateCcw, X, Award, FileText } from 'lucide-react';

interface FinalPaperModalProps {
  assessment: FinalAssessment;
  isOpen: boolean;
  onClose: () => void;
}

export function FinalPaperModal({ assessment, isOpen, onClose }: FinalPaperModalProps) {
  const [examStarted, setExamStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.durationMinutes * 60);

  // Flattened array of all 30 questions
  const allQuestions: AssessmentQuestion[] = [
    ...assessment.sections.sectionA.questions,
    ...assessment.sections.sectionB.questions,
    ...assessment.sections.sectionC.questions
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  // Timer countdown
  useEffect(() => {
    if (!examStarted || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, isSubmitted]);

  if (!isOpen) return null;

  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleSelectAnswer = (optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optIndex
    }));
  };

  const handleClearAnswer = () => {
    if (isSubmitted) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleResetExam = () => {
    setExamStarted(false);
    setIsSubmitted(false);
    setTimeLeftSeconds(assessment.durationMinutes * 60);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentQuestionIndex(0);
  };

  // Calculations
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Score Calculation
  let totalScore = 0;
  let sectionAScore = 0;
  let sectionBScore = 0;
  let sectionCScore = 0;

  if (isSubmitted) {
    allQuestions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans === q.correctIndex) {
        totalScore += q.marks;
        if (q.section === 'A') sectionAScore += q.marks;
        if (q.section === 'B') sectionBScore += q.marks;
        if (q.section === 'C') sectionCScore += q.marks;
      }
    });
  }

  const percentage = Math.round((totalScore / assessment.totalMarks) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/50 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#FFFDF7] rounded-xl border border-[#D9D4C8] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#D9D4C8] bg-white">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#2457D6]">
              {assessment.subjectId.toUpperCase()} ACADEMIC ASSESSMENT
            </div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 truncate">
              {assessment.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {examStarted && !isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-stone-100 border border-stone-200 font-mono text-xs text-stone-800">
                <Clock className="w-3.5 h-3.5 text-[#2457D6]" />
                <span className="font-bold tabular-nums">{formatTime(timeLeftSeconds)}</span>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. START EXAM INTRO SCREEN */}
        {!examStarted ? (
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
            <div className="max-w-2xl mx-auto my-auto text-center space-y-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#2457D6]/10 text-[#2457D6] flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans">
                  {assessment.title}
                </h1>
                <p className="font-serif italic text-stone-600 mt-1 text-sm sm:text-base">
                  Official 160-Mark Computer Science Academic Examination
                </p>
              </div>

              {/* Exam Blueprint Structure */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-4 rounded-lg bg-white border border-[#D9D4C8]">
                  <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider font-semibold">
                    SECTION A
                  </div>
                  <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">
                    10 Marks
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    10 Questions × 1 Mark<br />Foundations & Syntax
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#D9D4C8]">
                  <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider font-semibold">
                    SECTION B
                  </div>
                  <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">
                    50 Marks
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    10 Questions × 5 Marks<br />Code Tracing & Memory
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#D9D4C8]">
                  <div className="text-[10px] font-mono text-[#2457D6] uppercase tracking-wider font-semibold">
                    SECTION C
                  </div>
                  <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">
                    100 Marks
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    10 Questions × 10 Marks<br />Deep System Architecture
                  </div>
                </div>
              </div>

              <div className="p-4 rounded bg-[#FAF8F2] border border-[#D9D4C8]/80 text-xs text-stone-600 space-y-1 text-left">
                <div className="font-semibold text-stone-800">Examination Instructions:</div>
                <p>• Total Time: <strong>{assessment.durationMinutes} Minutes</strong>. Timer starts upon clicking button.</p>
                <p>• Navigate questions using the Question Palette on the right or navigation arrows.</p>
                <p>• You may mark questions for review and change answers anytime before submission.</p>
                <p>• Comprehensive performance analytics and code solutions will be generated instantly upon submission.</p>
              </div>

              <button
                type="button"
                onClick={() => setExamStarted(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#171717] text-white font-medium rounded-lg text-sm sm:text-base hover:bg-stone-800 shadow-md transition-all active:scale-98"
              >
                <span>Begin Examination</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : isSubmitted ? (
          /* 2. RESULTS & PERFORMANCE REVIEW SCREEN */
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Scorecard Hero */}
              <div className="p-6 bg-white rounded-xl border border-[#D9D4C8] shadow-xs text-center">
                <Award className="w-12 h-12 mx-auto text-[#2457D6] mb-2" />
                <div className="text-xs font-mono uppercase text-stone-500 tracking-wider">
                  Examination Result
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-stone-900 mt-1 tabular-nums">
                  {totalScore} <span className="text-xl text-stone-400 font-normal">/ {assessment.totalMarks}</span>
                </div>
                <div className="text-base font-semibold text-[#2457D6] mt-1 font-serif italic">
                  {percentage >= 80 ? 'Distinction Mastery' : percentage >= 60 ? 'First Division Passed' : 'Qualified'} ({percentage}%)
                </div>

                {/* Section Breakdowns */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#D9D4C8]/60 text-xs">
                  <div>
                    <span className="font-mono text-stone-500 uppercase">Section A (1M)</span>
                    <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">{sectionAScore} / 10</div>
                  </div>
                  <div>
                    <span className="font-mono text-stone-500 uppercase">Section B (5M)</span>
                    <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">{sectionBScore} / 50</div>
                  </div>
                  <div>
                    <span className="font-mono text-stone-500 uppercase">Section C (10M)</span>
                    <div className="text-lg font-bold font-mono text-stone-900 mt-0.5">{sectionCScore} / 100</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetExam}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D9D4C8] bg-stone-50 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Paper</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800"
                  >
                    <span>Close Assessment</span>
                  </button>
                </div>
              </div>

              {/* Solution Key with Explanations */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-stone-800 pb-2 border-b border-[#D9D4C8]">
                  Detailed Solution Key & Answer Explanations
                </h3>

                {allQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900">Q{idx + 1}.</span>
                          <span className="font-mono text-[10px] text-stone-500 uppercase">
                            Section {q.section} · {q.marks} Marks · {q.topic}
                          </span>
                        </div>
                        <span className={`font-mono font-bold text-[11px] ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? `+${q.marks} Marks` : '0 Marks'}
                        </span>
                      </div>

                      <p className="font-semibold text-stone-900 mb-2">{q.question}</p>

                      {q.codeSnippet && (
                        <div className="my-2 p-2.5 bg-stone-900 text-stone-100 rounded font-mono text-[11px]">
                          <pre><code>{q.codeSnippet}</code></pre>
                        </div>
                      )}

                      <div className="space-y-1 mb-2">
                        <div className="text-emerald-900">
                          <strong>Correct Answer:</strong> Option {String.fromCharCode(65 + q.correctIndex)} — {q.options[q.correctIndex]}
                        </div>
                        {userAns !== undefined && userAns !== q.correctIndex && (
                          <div className="text-rose-900">
                            <strong>Your Answer:</strong> Option {String.fromCharCode(65 + userAns)} — {q.options[userAns]}
                          </div>
                        )}
                      </div>

                      <div className="p-2 rounded bg-white/80 border border-stone-200/60 text-stone-700 font-serif italic">
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* 3. ACTIVE EXAMINATION UI */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Question Body */}
            <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto border-r border-[#D9D4C8]">
              <div>
                {/* Question Metadata */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C8]/70 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2457D6] font-bold text-[11px] border border-blue-200">
                      Section {currentQuestion.section}
                    </span>
                    <span className="text-stone-500">
                      Question {currentQuestionIndex + 1} of {allQuestions.length}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-stone-600 font-bold">
                    [{currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}]
                  </span>
                </div>

                {/* Question Text */}
                <div className="pt-4">
                  <div className="font-mono text-[11px] text-stone-400 uppercase tracking-wider mb-1">
                    Topic: {currentQuestion.topic}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed font-sans mb-3">
                    {currentQuestion.question}
                  </h3>

                  {/* Code Snippet if applicable */}
                  {currentQuestion.codeSnippet && (
                    <div className="my-3 p-3.5 rounded bg-[#17191C] text-stone-100 font-mono text-xs overflow-x-auto border border-stone-800">
                      <pre><code>{currentQuestion.codeSnippet}</code></pre>
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2 mt-4">
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected = userAnswers[currentQuestion.id] === oIdx;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-[#2457D6] text-[#2457D6] font-semibold shadow-xs'
                              : 'bg-white border-[#D9D4C8] text-stone-800 hover:border-stone-400 hover:bg-stone-50'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 border ${
                              isSelected
                                ? 'bg-[#2457D6] text-white border-[#2457D6]'
                                : 'border-stone-300 text-stone-600 bg-stone-50'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Nav Actions */}
              <div className="pt-6 border-t border-[#D9D4C8]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleReview}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors ${
                      markedForReview[currentQuestion.id]
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                        : 'bg-white border-[#D9D4C8] text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark Review'}</span>
                  </button>

                  {userAnswers[currentQuestion.id] !== undefined && (
                    <button
                      type="button"
                      onClick={handleClearAnswer}
                      className="px-2.5 py-1.5 text-stone-500 hover:text-rose-600 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded border border-[#D9D4C8] bg-white text-stone-700 disabled:opacity-30"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {currentQuestionIndex < allQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(allQuestions.length - 1, prev + 1))}
                      className="flex items-center gap-1 px-4 py-1.5 rounded bg-stone-900 text-white font-medium hover:bg-stone-800"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-1.5 rounded bg-emerald-700 text-white font-medium hover:bg-emerald-800 shadow-sm"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Question Palette (Desktop 30-Question Grid) */}
            <div className="w-full md:w-64 p-4 bg-stone-50 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold mb-3 pb-2 border-b border-[#D9D4C8]">
                  Question Palette ({Object.keys(userAnswers).length}/{allQuestions.length})
                </div>

                {/* Sections Tabs */}
                <div className="grid grid-cols-5 gap-1.5">
                  {allQuestions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isMarked = markedForReview[q.id];
                    const isCurrent = idx === currentQuestionIndex;

                    let bg = 'bg-white text-stone-700 border-[#D9D4C8]';
                    if (isMarked) bg = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                    else if (isAnswered) bg = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-8 rounded border font-mono text-xs flex items-center justify-center transition-all ${bg} ${
                          isCurrent ? 'ring-2 ring-stone-900 font-black' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-3 border-t border-[#D9D4C8] space-y-1.5 text-[10px] font-mono text-stone-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400" />
                    <span>Marked for Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-white border border-[#D9D4C8]" />
                    <span>Unanswered</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
              >
                Submit Paper ({Object.keys(userAnswers).length}/30 Done)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
