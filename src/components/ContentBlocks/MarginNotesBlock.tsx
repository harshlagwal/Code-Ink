import { useState } from 'react';
import { PenLine, Save, Trash2, Check } from 'lucide-react';

interface MarginNotesBlockProps {
  topicId: string;
  savedNote: string;
  onSaveNote: (topicId: string, note: string) => void;
}

export function MarginNotesBlock({ topicId, savedNote, onSaveNote }: MarginNotesBlockProps) {
  const [isOpen, setIsOpen] = useState(Boolean(savedNote));
  const [noteText, setNoteText] = useState(savedNote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveNote(topicId, noteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClear = () => {
    setNoteText('');
    onSaveNote(topicId, '');
  };

  return (
    <div className="my-6 pt-4 border-t border-line">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-ink hover:text-accent transition-colors cursor-pointer"
        >
          <PenLine className="w-3.5 h-3.5 text-accent" />
          <span className="uppercase tracking-wider text-[11px]">
            {isOpen ? 'Fold Student Margin Notes' : 'Open Student Margin Notes'}
          </span>
          {savedNote && !isOpen && (
            <span className="font-handwritten text-sm text-accent normal-case">
              (1 note saved)
            </span>
          )}
        </button>

        <span className="font-handwritten text-xs text-muted select-none">
          personal annotations
        </span>
      </div>

      {isOpen && (
        <div className="mt-3 p-4 bg-[#FFF9DF] dark:bg-[#2C271E] rounded-lg border border-[#EADB9F] dark:border-[#4A402D] shadow-xs relative">
          <div className="flex items-center justify-between mb-2">
            <span className="font-handwritten text-base text-stone-700 dark:text-ink font-bold">
              My Handwritten Margin Scribbles:
            </span>
            <div className="flex items-center gap-2">
              {noteText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-muted hover:text-rose-600 transition-colors cursor-pointer"
                  title="Clear note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 px-2.5 py-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded text-xs transition-colors cursor-pointer font-medium"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3 h-3" />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Jot down memory tricks, exam reminders, or question notes..."
            rows={3}
            className="w-full p-2 bg-transparent border-0 font-handwritten text-lg text-stone-800 dark:text-ink placeholder:text-muted focus:outline-hidden resize-y leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}
