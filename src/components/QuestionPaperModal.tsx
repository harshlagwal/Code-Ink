import { useState, useEffect } from 'react';
import { Subject } from '../types/notebook';
import { getSubjectQuestionPapers } from '../data/questionPapers';
import {
  Printer,
  Clock,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X,
  Play,
  Pause,
  RotateCcw,
  Award
} from 'lucide-react';

interface QuestionPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubject: Subject;
  allSubjects: Subject[];
  onSelectSubject?: (subject: Subject) => void;
}

export function QuestionPaperModal({
  isOpen,
  onClose,
  activeSubject,
  allSubjects,
  onSelectSubject
}: QuestionPaperModalProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubject.id);
  const [activeSetId, setActiveSetId] = useState<'set-1' | 'set-2' | 'set-3'>('set-1');
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // 2-Hour (120 min) Stopwatch / Timer for student solving in physical notebook
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120 * 60);

  // Sync when activeSubject changes
  useEffect(() => {
    setSelectedSubjectId(activeSubject.id);
  }, [activeSubject.id]);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  if (!isOpen) return null;

  const subjectPapers =
    allSubjects.find(s => s.id === selectedSubjectId)?.questionPapers ||
    getSubjectQuestionPapers(selectedSubjectId);
  const currentSet = subjectPapers.sets[activeSetId];

  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="question-paper-modal-overlay"
      className="fixed inset-0 z-50 bg-[#161514] flex flex-col overflow-hidden text-stone-900 print:bg-white print:static print:overflow-visible print:block print:z-0"
    >
      {/* ================= STRICT PRINT STYLES ================= */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 14mm 16mm 14mm 16mm;
          }

          /* Force pure white background and pure black typography */
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            font-family: "Times New Roman", Times, Georgia, serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          /* Hide everything in the page by default */
          body > * {
            visibility: hidden !important;
          }

          #root, #root > * {
            visibility: hidden !important;
          }

          /* Make ONLY this question paper overlay and its contents visible */
          #question-paper-modal-overlay,
          #question-paper-modal-overlay * {
            visibility: visible !important;
          }

          #question-paper-modal-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            z-index: 999999 !important;
            display: block !important;
          }

          #question-paper-scrollable-body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            display: block !important;
          }

          #question-paper-printable {
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            overflow: visible !important;
          }

          /* Strictly hide all buttons, toolbars, timers, solutions, and interactive widgets in print */
          .print-exclude,
          .print\\:hidden,
          button,
          .solution-box,
          .no-print {
            display: none !important;
            visibility: hidden !important;
          }

          /* Real Examination Paper formatting */
          .exam-question-item {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 12pt !important;
          }

          .exam-section-header {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          .exam-code-box {
            background: #fbfbfb !important;
            color: #000000 !important;
            border: 1px solid #777777 !important;
            font-family: "Courier New", Courier, monospace !important;
            font-size: 9.5pt !important;
            padding: 6pt 8pt !important;
            margin-top: 4pt !important;
            margin-bottom: 4pt !important;
            white-space: pre-wrap !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* ================= MODAL TOP NAVIGATION TOOLBAR (HIDDEN IN PRINT) ================= */}
      <div className="p-3 sm:p-4 bg-[#1F1E1B] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden text-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2457D6] flex items-center justify-center text-white shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white font-serif tracking-wide">
                {subjectPapers.subjectName} · Examination Paper
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                50 Marks · 2 Hours
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono">
              {currentSet.paperCode} · Physical Pen-and-Paper Exam · Standard Layout
            </p>
          </div>
        </div>

        {/* Quick Actions (Timer, Solutions, Print, Close) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* 2-Hour Timer Widget */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-stone-700 bg-stone-900 font-mono text-xs text-stone-200">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className={`font-bold ${secondsRemaining < 600 ? 'text-rose-400 animate-pulse' : 'text-stone-100'}`}>
              {formatTimer(secondsRemaining)}
            </span>
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className="ml-1 p-0.5 hover:text-[#5B8DF6] transition-colors cursor-pointer"
              title={timerRunning ? "Pause Timer" : "Start Timer"}
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setSecondsRemaining(120 * 60);
              }}
              className="p-0.5 hover:text-white transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3 text-stone-500" />
            </button>
          </div>

          {/* Toggle Solutions */}
          <button
            type="button"
            onClick={() => setShowAllSolutions(!showAllSolutions)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              showAllSolutions
                ? 'bg-purple-900/60 text-purple-200 border-purple-600'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-purple-500 hover:text-white'
            }`}
            title="Reveal or hide marking scheme & model solutions for notebook evaluation"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{showAllSolutions ? 'Hide Marking Schemes' : 'Marking Schemes'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2457D6] hover:bg-[#1d47b3] text-white transition-colors text-xs font-semibold shadow-xs cursor-pointer"
            title="Print Question Paper to Physical Paper or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="Exit Exam / Return to Book"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= SUBJECT & SET SELECTOR BAR (HIDDEN IN PRINT) ================= */}
      <div className="px-4 py-2 bg-[#252421] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 print:hidden">
        {/* Subject Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <span className="font-mono text-stone-400 font-semibold uppercase text-[10px] mr-1">Subject:</span>
          {allSubjects.map(sub => {
            const isSelected = sub.id === selectedSubjectId || (selectedSubjectId === 'js' && sub.id === 'javascript');
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  if (onSelectSubject) onSelectSubject(sub);
                }}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2457D6] text-white shadow-2xs'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                {sub.shortCode || sub.name}
              </button>
            );
          })}
        </div>

        {/* 3 Sets Switcher: Set 1, Set 2, Set 3 */}
        <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-700">
          <span className="font-mono text-stone-400 text-[10px] uppercase font-bold px-2">Set:</span>
          {(['set-1', 'set-2', 'set-3'] as const).map(sId => {
            const isSet = activeSetId === sId;
            const setLabels: Record<string, string> = {
              'set-1': 'Set 1 (Set A)',
              'set-2': 'Set 2 (Set B)',
              'set-3': 'Set 3 (Set C)'
            };
            return (
              <button
                key={sId}
                type="button"
                onClick={() => setActiveSetId(sId)}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isSet
                    ? 'bg-[#2457D6] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {setLabels[sId]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= SCROLLABLE DESK & PRINTABLE QUESTION PAPER ================= */}
      <div
        id="question-paper-scrollable-body"
        className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-[#23211E] print:bg-white print:p-0 print:overflow-visible print:block"
      >
        {/* Authentic Physical Examination Paper Sheet (Clean Normal Block Flow with mx-auto) */}
        <div
          id="question-paper-printable"
          className="w-full max-w-4xl mx-auto bg-white text-black p-6 sm:p-12 shadow-2xl font-serif border border-stone-300 mb-12 print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full"
        >
          {/* ================= TOP CANDIDATE ROLL NO & CODE ================= */}
          <div className="flex items-center justify-between border-b border-black pb-2 mb-4 font-serif text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-black">Roll No.:</span>
              <div className="flex items-center">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="inline-block w-5 h-6 sm:w-6 sm:h-7 border border-black text-center text-xs leading-6 sm:leading-7 font-mono font-bold"
                  />
                ))}
              </div>
            </div>
            <div className="text-right font-mono text-xs text-black">
              <div>
                <span className="font-bold">Paper Code: </span>
                <span className="font-bold">{currentSet.paperCode}</span>
              </div>
              <div className="text-[10px] text-stone-600 print:text-black">
                Total Questions: 20 · Time: 2 Hours
              </div>
            </div>
          </div>

          {/* ================= OFFICIAL EXAMINATION BOARD HEADER ================= */}
          <div className="text-center pb-2 mb-3">
            <h1 className="text-lg sm:text-2xl font-extrabold uppercase tracking-wider text-black font-serif mb-0.5">
              CODE INK ENGINEERING & TECHNICAL ASSESSMENT
            </h1>
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-800 print:text-black mb-0.5">
              ANNUAL SEMESTER EXAMINATION · SESSION 2025–2026
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-600 print:text-black mb-1">
              DEPARTMENT OF COMPUTER SCIENCE & SYSTEMS ARCHITECTURE
            </div>
            <div className="text-base sm:text-lg font-bold text-black uppercase mt-1">
              SUBJECT: {subjectPapers.subjectName.toUpperCase()}
            </div>
            <div className="font-mono text-xs font-bold text-black uppercase mt-0.5">
              Course Code: {subjectPapers.courseCode} · {currentSet.setName.toUpperCase()}
            </div>
          </div>

          {/* Time & Maximum Marks Double Rule */}
          <div className="border-t-2 border-b-2 border-black py-1.5 my-3 flex items-center justify-between font-serif text-xs sm:text-sm font-bold text-black">
            <span>Time Allowed: 2.0 Hours (120 Minutes)</span>
            <span>Maximum Marks: 50 Marks</span>
          </div>

          {/* ================= GENERAL INSTRUCTIONS BOX ================= */}
          <div className="border border-black p-3 sm:p-4 mb-6 text-xs leading-relaxed bg-white text-black">
            <div className="font-bold uppercase tracking-wider mb-2 font-serif text-black">
              General Instructions for Candidates:
            </div>
            <ol className="list-decimal pl-5 space-y-1 font-serif text-[11px] sm:text-xs">
              <li>Write your Roll Number in the grid box provided above immediately upon receipt of this question paper.</li>
              <li>This question paper comprises <strong>THREE Sections</strong>: Section A, Section B, and Section C.</li>
              <li><strong>Section A (Q1 to Q10)</strong>: Compulsory. Each question carries <strong>1 Mark</strong> (10 × 1 = 10 Marks).</li>
              <li><strong>Section B (Q11 to Q17)</strong>: Contains 7 questions. Attempt <strong>any FOUR</strong> questions. Each question carries <strong>5 Marks</strong> (4 × 5 = 20 Marks).</li>
              <li><strong>Section C (Q18 to Q20)</strong>: Contains 3 questions. Attempt <strong>any TWO</strong> questions. Each question carries <strong>10 Marks</strong> (2 × 10 = 20 Marks).</li>
              <li>Write all answers legibly in your physical Examination Answer Booklet. Program codes must include proper syntax, header files, and comments.</li>
              <li>Mobile phones, smartwatches, and programmable calculators are strictly prohibited inside the examination hall.</li>
            </ol>
          </div>

          {/* ================= SECTION A: 10 x 1M = 10 Marks ================= */}
          <div className="mb-8">
            <div className="exam-section-header border-b-2 border-black pb-1 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-black font-serif">
                  SECTION — A (Objective & Conceptual Foundations)
                </h2>
                <div className="text-[11px] text-stone-700 italic font-serif">
                  Note: Attempt ALL TEN questions. Answer in 1–2 sentences or give exact evaluation values.
                </div>
              </div>
              <div className="font-serif font-bold text-xs sm:text-sm text-black shrink-0 ml-2">
                [10 × 1 = 10 Marks]
              </div>
            </div>

            <div className="space-y-4">
              {currentSet.sections.sectionA.questions.map((q) => {
                const isExpanded = showAllSolutions || !!expandedSolutions[q.id];
                return (
                  <div key={q.id} className="exam-question-item pb-3 border-b border-stone-200 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-sm text-black font-serif shrink-0">
                            Q{q.qNum}.
                          </span>
                          <div className="text-xs sm:text-sm text-black font-serif leading-relaxed">
                            {q.question}
                          </div>
                        </div>

                        {q.codeSnippet && (
                          <pre className="exam-code-box mt-2 p-2.5 bg-[#f8f9fa] text-black border border-stone-400 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}
                      </div>
                      <div className="shrink-0 font-serif font-bold text-xs sm:text-sm text-black ml-2 pt-0.5">
                        [{q.marks}]
                      </div>
                    </div>

                    {/* Model Solution & Marking Scheme Accordion (Screen Only · Never Printed) */}
                    <div className="mt-2 print:hidden solution-box">
                      <button
                        type="button"
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#2457D6] hover:underline cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>{isExpanded ? 'Hide Marking Scheme & Model Answer' : 'View Marking Scheme & Model Answer'}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-1.5 p-3 rounded bg-emerald-50 border border-emerald-300 text-xs text-stone-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-900 font-bold uppercase">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              Model Answer for Physical Notebook Check:
                            </span>
                            <span>Marking: {q.marks} Mark</span>
                          </div>
                          <p className="leading-relaxed text-stone-900 whitespace-pre-line font-mono text-[11px] bg-white p-2 rounded border border-emerald-200">
                            {q.modelSolution}
                          </p>
                          {q.markingBreakdown && (
                            <div className="text-[10px] text-stone-700 font-mono">
                              <span className="font-semibold text-stone-900">Criteria: </span>
                              {q.markingBreakdown.join(' · ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= SECTION B: Attempt 4 out of 7 x 5M = 20 Marks ================= */}
          <div className="mb-8">
            <div className="exam-section-header border-b-2 border-black pb-1 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-black font-serif">
                  SECTION — B (Analytical & Conceptual Short Answers)
                </h2>
                <div className="text-[11px] text-stone-700 italic font-serif">
                  Note: Answer any FOUR questions from this section. Show step-by-step logic, diagrams, or trace tables.
                </div>
              </div>
              <div className="font-serif font-bold text-xs sm:text-sm text-black shrink-0 ml-2">
                [Attempt Any 4: 4 × 5 = 20 Marks]
              </div>
            </div>

            <div className="space-y-5">
              {currentSet.sections.sectionB.questions.map((q) => {
                const isExpanded = showAllSolutions || !!expandedSolutions[q.id];
                return (
                  <div key={q.id} className="exam-question-item pb-4 border-b border-stone-200 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-sm text-black font-serif shrink-0">
                            Q{q.qNum}.
                          </span>
                          <div className="text-xs sm:text-sm text-black font-serif leading-relaxed">
                            {q.question}
                          </div>
                        </div>

                        {q.codeSnippet && (
                          <pre className="exam-code-box mt-2 p-2.5 bg-[#f8f9fa] text-black border border-stone-400 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}
                      </div>
                      <div className="shrink-0 font-serif font-bold text-xs sm:text-sm text-black ml-2 pt-0.5">
                        [{q.marks}]
                      </div>
                    </div>

                    {/* Model Solution & Marking Scheme Accordion (Screen Only · Never Printed) */}
                    <div className="mt-2 print:hidden solution-box">
                      <button
                        type="button"
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#2457D6] hover:underline cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>{isExpanded ? 'Hide Marking Scheme & Model Answer' : 'View Marking Scheme & Model Solution'}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3.5 rounded bg-purple-50 border border-purple-300 text-xs text-stone-800 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-purple-900 font-bold uppercase">
                            <span className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-purple-700" />
                              Model Solution & Step-by-Step Marking Breakdown:
                            </span>
                            <span>Total: {q.marks} Marks</span>
                          </div>

                          {q.markingBreakdown && (
                            <div className="bg-white p-2 rounded border border-purple-200 space-y-0.5">
                              <div className="font-mono text-[10px] uppercase font-bold text-purple-800">
                                Mark Distribution Criteria:
                              </div>
                              <ul className="list-disc pl-4 text-[10px] font-mono text-stone-700 space-y-0.5">
                                {q.markingBreakdown.map((mb, idx) => (
                                  <li key={idx}>{mb}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <div className="font-mono text-[10px] uppercase font-bold text-stone-700 mb-0.5">
                              Complete Model Answer:
                            </div>
                            <pre className="p-2.5 bg-white text-stone-900 rounded border border-purple-200 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                              {q.modelSolution}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= SECTION C: Attempt 2 out of 3 x 10M = 20 Marks ================= */}
          <div className="mb-6">
            <div className="exam-section-header border-b-2 border-black pb-1 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-black font-serif">
                  SECTION — C (Comprehensive Programming & Systems Architecture)
                </h2>
                <div className="text-[11px] text-stone-700 italic font-serif">
                  Note: Answer any TWO questions from this section. Write complete, robust, compilable code with error handling.
                </div>
              </div>
              <div className="font-serif font-bold text-xs sm:text-sm text-black shrink-0 ml-2">
                [Attempt Any 2: 2 × 10 = 20 Marks]
              </div>
            </div>

            <div className="space-y-6">
              {currentSet.sections.sectionC.questions.map((q) => {
                const isExpanded = showAllSolutions || !!expandedSolutions[q.id];
                return (
                  <div key={q.id} className="exam-question-item pb-4 border-b border-stone-200 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-sm text-black font-serif shrink-0">
                            Q{q.qNum}.
                          </span>
                          <div className="text-xs sm:text-sm text-black font-serif leading-relaxed">
                            {q.question}
                          </div>
                        </div>

                        {q.codeSnippet && (
                          <pre className="exam-code-box mt-2 p-2.5 bg-[#f8f9fa] text-black border border-stone-400 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}
                      </div>
                      <div className="shrink-0 font-serif font-bold text-xs sm:text-sm text-black ml-2 pt-0.5">
                        [{q.marks}]
                      </div>
                    </div>

                    {/* Model Solution & Marking Scheme Accordion (Screen Only · Never Printed) */}
                    <div className="mt-2 print:hidden solution-box">
                      <button
                        type="button"
                        onClick={() => toggleSolution(q.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#2457D6] hover:underline cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>{isExpanded ? 'Hide Marking Scheme & Model Answer' : 'View Marking Scheme & Architectural Solution'}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3.5 rounded bg-blue-50 border border-blue-300 text-xs text-stone-800 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-blue-900 font-bold uppercase">
                            <span className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-blue-700" />
                              Comprehensive Model Solution & Marking Scheme:
                            </span>
                            <span>Total: {q.marks} Marks</span>
                          </div>

                          {q.markingBreakdown && (
                            <div className="bg-white p-2 rounded border border-blue-200 space-y-0.5">
                              <div className="font-mono text-[10px] uppercase font-bold text-blue-800">
                                Marking Rubric (10 Marks):
                              </div>
                              <ul className="list-disc pl-4 text-[10px] font-mono text-stone-700 space-y-0.5">
                                {q.markingBreakdown.map((mb, idx) => (
                                  <li key={idx}>{mb}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <div className="font-mono text-[10px] uppercase font-bold text-stone-700 mb-0.5">
                              Complete Architectural Solution:
                            </div>
                            <pre className="p-3 bg-white text-stone-900 rounded border border-blue-200 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                              {q.modelSolution}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= END OF QUESTION PAPER MARKER ================= */}
          <div className="text-center border-t-2 border-black pt-3 mt-8">
            <span className="font-serif text-xs font-bold uppercase tracking-widest text-black">
              — · — · — END OF QUESTION PAPER · ALL THE BEST — · — · —
            </span>
          </div>

        </div>
      </div>

      {/* ================= MODAL FOOTER BAR (HIDDEN IN PRINT) ================= */}
      <div className="p-3 sm:p-4 bg-[#1F1E1B] border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-stone-400 shrink-0 print:hidden">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#5B8DF6]" />
          <span>
            Solve step-by-step in your physical <strong>Engineering Notebook</strong>. Use the 2-hour timer to simulate real exam conditions!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-stone-300" />
            <span>Print Question Paper (PDF)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2457D6] hover:bg-[#1d47b3] text-white font-semibold transition-colors cursor-pointer"
          >
            Exit Exam / Return to Book
          </button>
        </div>
      </div>

    </div>
  );
}
