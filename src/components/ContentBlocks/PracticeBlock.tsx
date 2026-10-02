import { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { PracticeQuestion } from '../../types/notebook';

interface PracticeBlockProps {
  practice: PracticeQuestion;
}

export function PracticeBlock({ practice }: PracticeBlockProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
    setHasSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  const isCorrect = selectedOption === practice.correctIndex;

  return (
    <div className="my-6 p-5 sm:p-6 rounded-lg bg-[#FAF8F2] border border-[#D9D4C8] shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9D4C8]/80 text-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#2457D6]" />
          <span className="font-semibold uppercase tracking-wider text-[#171717] text-[11px]">
            Quick Check: Concept Mastery
          </span>
        </div>
        {hasSubmitted && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Try Again</span>
          </button>
        )}
      </div>

      <p className="text-stone-900 font-medium text-sm sm:text-base mb-4 leading-relaxed">
        {practice.question}
      </p>

      {/* Option Buttons */}
      <div className="space-y-2 mb-4">
        {practice.options.map((option, idx) => {
          let stateStyle = 'border-[#D9D4C8] bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50';

          if (hasSubmitted) {
            if (idx === practice.correctIndex) {
              stateStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
            } else if (idx === selectedOption) {
              stateStyle = 'border-rose-400 bg-rose-50 text-rose-950';
            } else {
              stateStyle = 'border-[#D9D4C8]/60 bg-white/60 text-stone-400';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={hasSubmitted}
              className={`w-full text-left p-3 rounded border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${stateStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center font-mono text-[11px] shrink-0 text-stone-600 bg-stone-50">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {hasSubmitted && idx === practice.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {hasSubmitted && idx === selectedOption && idx !== practice.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback */}
      {hasSubmitted && (
        <div
          className={`p-3.5 rounded text-xs sm:text-sm leading-relaxed border ${
            isCorrect
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}
        >
          <div className="font-semibold mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide">
            {isCorrect ? '✓ Correct Understanding' : 'Notice:'}
          </div>
          <p>{practice.explanation}</p>
        </div>
      )}
    </div>
  );
}
