import { useState, useEffect } from 'react';
import { Subject } from '../types/notebook';
import { X, RotateCw, CheckCircle, Brain, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface RevisionFlashcardsModalProps {
  subject: Subject;
  isOpen: boolean;
  onClose: () => void;
}

interface FlashcardData {
  id: string;
  topicTitle: string;
  chapterNumber: number;
  question: string;
  codeSnippet?: string;
  answer: string;
  keyPoints: string[];
  complexity?: { time: string; space: string };
}

export function RevisionFlashcardsModal({
  subject,
  isOpen,
  onClose
}: RevisionFlashcardsModalProps) {
  // Generate flashcards from current subject topics
  const flashcards: FlashcardData[] = subject.chapters.flatMap(ch =>
    ch.topics.map(t => ({
      id: `fc-${t.id}`,
      topicTitle: t.title,
      chapterNumber: ch.number,
      question: t.definition,
      codeSnippet: t.example?.code.split('\n').slice(0, 4).join('\n'),
      answer: t.whyItMatters || t.explanation[0] || 'Core engineering principle.',
      keyPoints: [
        t.important || 'Critical engineering takeaway',
        ...(t.commonMistakes?.slice(0, 1) || [])
      ],
      complexity: t.interviewNote ? { time: 'Discussed in Interview Note', space: 'Memory Heap / Stack' } : undefined
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  // Store mastery: { [cardId]: 'learning' | 'review' | 'mastered' }
  const [masteryState, setMasteryState] = useState<Record<string, 'learning' | 'review' | 'mastered'>>(() => {
    try {
      const saved = localStorage.getItem(`codeink_flashcards_${subject.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync mastery state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`codeink_flashcards_${subject.id}`, JSON.stringify(masteryState));
    } catch {
      // Ignore
    }
  }, [masteryState, subject.id]);

  if (!isOpen || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];
  const currentMastery = masteryState[currentCard.id] || 'learning';
  const masteredCount = Object.values(masteryState).filter(v => v === 'mastered').length;
  const progressPercent = Math.round((masteredCount / flashcards.length) * 100);

  const handleFlip = () => {
    notebookAudio.playPageTurn();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    notebookAudio.playPageTurn();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < flashcards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    notebookAudio.playPageTurn();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : flashcards.length - 1));
  };

  const setMastery = (level: 'learning' | 'review' | 'mastered') => {
    if (level === 'mastered') notebookAudio.playSuccess();
    else notebookAudio.playPencil();

    setMasteryState(prev => ({
      ...prev,
      [currentCard.id]: level
    }));
    // Auto advance
    setTimeout(() => {
      handleNext();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl bg-[#F7F3EA] rounded-xl border border-[#D9D4C8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-white border-b border-[#D9D4C8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#2457D6]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                {subject.name} · Spaced Revision Flashcards
              </h3>
              <p className="text-[11px] font-mono text-stone-500">
                Leitner Spaced Repetition · {masteredCount} of {flashcards.length} mastered ({progressPercent}%)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-stone-200">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Physical 3D Index Card Container */}
        <div className="p-3.5 sm:p-8 flex-1 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[340px] perspective-1000">
          <div
            onClick={handleFlip}
            className={`w-full max-w-lg min-h-[220px] sm:min-h-[280px] p-4 sm:p-7 rounded-2xl border-2 transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer ${
              isFlipped
                ? 'bg-[#FFFDF7] border-blue-300 ring-2 ring-blue-100'
                : 'bg-white border-[#D9D4C8] hover:border-stone-400'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
              <span className="font-mono text-[11px] text-[#2457D6] font-semibold uppercase tracking-wider">
                Ch {String(currentCard.chapterNumber).padStart(2, '0')} · {currentCard.topicTitle}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  currentMastery === 'mastered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentMastery === 'review'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-stone-100 text-stone-600'
                }`}
              >
                {currentMastery}
              </span>
            </div>

            {/* Card Body */}
            <div className="my-auto py-4 text-center">
              {!isFlipped ? (
                // Front: Concept Question
                <div className="space-y-3">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-stone-100 text-stone-500">
                    Question / Definition
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug">
                    "{currentCard.question}"
                  </h4>
                  {currentCard.codeSnippet && (
                    <div className="text-left p-2.5 bg-stone-900 text-stone-200 font-mono text-[11px] rounded overflow-x-auto shadow-inner">
                      <pre><code>{currentCard.codeSnippet}</code></pre>
                    </div>
                  )}
                  <p className="text-xs text-stone-400 font-handwritten pt-2">
                    (Click anywhere on card to flip and inspect answer)
                  </p>
                </div>
              ) : (
                // Back: Engineering Answer & Key Takeaways
                <div className="space-y-3 text-left">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-blue-100 text-blue-800 font-semibold">
                    Engineering Takeaway & Logic
                  </span>
                  <p className="text-sm font-serif text-stone-800 leading-relaxed font-medium">
                    {currentCard.answer}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-200/60 text-xs">
                    {currentCard.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-stone-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Card {currentIndex + 1} of {flashcards.length}</span>
              <div className="flex items-center gap-1 text-[#2457D6]">
                <RotateCw className="w-3.5 h-3.5" />
                <span className="text-[11px] font-sans">Flip Card</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation & Mastery Rating */}
        <div className="px-5 py-3.5 bg-white border-t border-[#D9D4C8] flex items-center justify-between flex-wrap gap-2">
          {/* Card Prev/Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 text-xs font-mono cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 text-xs font-mono cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Leitner Box Rating Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMastery('learning')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                currentMastery === 'learning'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              Still Learning
            </button>
            <button
              type="button"
              onClick={() => setMastery('review')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                currentMastery === 'review'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              Review Soon
            </button>
            <button
              type="button"
              onClick={() => setMastery('mastered')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                currentMastery === 'mastered'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-emerald-100 hover:text-emerald-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mastered!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
