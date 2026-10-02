import { useState } from 'react';
import { StickyNote, StickyColor } from '../types/notebook';
import { Plus, Trash2, X, Pin } from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface StickyNotesLayerProps {
  topicId: string;
  pageSide: 'left' | 'right';
  stickyNotes: StickyNote[];
  onAddSticky: (note: Omit<StickyNote, 'id' | 'createdAt'>) => void;
  onUpdateSticky: (id: string, updates: Partial<StickyNote>) => void;
  onDeleteSticky: (id: string) => void;
}

const COLOR_STYLES: Record<StickyColor, { bg: string; border: string; tape: string }> = {
  yellow: {
    bg: 'bg-[#FEF9C3] text-amber-950',
    border: 'border-[#FDE047]',
    tape: 'bg-amber-300/60'
  },
  pink: {
    bg: 'bg-[#FCE7F3] text-pink-950',
    border: 'border-[#F472B6]/60',
    tape: 'bg-pink-300/60'
  },
  mint: {
    bg: 'bg-[#DCFCE7] text-emerald-950',
    border: 'border-[#86EFAC]',
    tape: 'bg-emerald-300/60'
  },
  sky: {
    bg: 'bg-[#E0F2FE] text-sky-950',
    border: 'border-[#7DD3FC]',
    tape: 'bg-sky-300/60'
  }
};

export function StickyNotesLayer({
  topicId,
  pageSide,
  stickyNotes,
  onAddSticky,
  onUpdateSticky,
  onDeleteSticky
}: StickyNotesLayerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedColor, setSelectedColor] = useState<StickyColor>('yellow');

  // Filter notes belonging to this topic and page spread side
  const pageNotes = stickyNotes.filter(
    n => n.topicId === topicId && n.pageSide === pageSide
  );

  const handleCreate = () => {
    if (!newContent.trim()) return;
    notebookAudio.playPencil();

    onAddSticky({
      topicId,
      pageSide,
      color: selectedColor,
      title: newTitle.trim() || 'Quick Note',
      content: newContent.trim()
    });

    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="my-4">
      {/* Top action trigger */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-[#D9D4C8]/50">
        <div className="flex items-center gap-1.5 text-xs font-handwritten text-stone-600">
          <Pin className="w-3.5 h-3.5 text-amber-600" />
          <span>Margin Post-It Notes ({pageNotes.length})</span>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => {
              notebookAudio.playPencil();
              setIsAdding(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Pin Post-It</span>
          </button>
        )}
      </div>

      {/* New Sticky Note Creation Form */}
      {isAdding && (
        <div className="p-3 mb-4 rounded-lg bg-[#FEF9C3] border border-[#FDE047] shadow-md animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-300/60">
            <span className="font-handwritten text-sm font-bold text-amber-900">Pin a Sticky Note:</span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-stone-500 hover:text-stone-800 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title (e.g. Viva Formula, Gotcha)"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-2 py-1 text-xs font-semibold rounded bg-white/70 border border-amber-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              maxLength={40}
            />

            <textarea
              placeholder="Write your note or mnemonic here..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              rows={3}
              className="w-full p-2 text-xs sm:text-sm font-handwritten rounded bg-white/70 border border-amber-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              maxLength={400}
            />

            <div className="flex items-center justify-between pt-1">
              {/* Color selector */}
              <div className="flex items-center gap-1.5">
                {(['yellow', 'pink', 'mint', 'sky'] as StickyColor[]).map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                      color === 'yellow'
                        ? 'bg-amber-300 border-amber-500'
                        : color === 'pink'
                        ? 'bg-pink-300 border-pink-500'
                        : color === 'mint'
                        ? 'bg-emerald-300 border-emerald-500'
                        : 'bg-sky-300 border-sky-500'
                    } ${selectedColor === color ? 'scale-125 ring-2 ring-stone-700' : 'hover:scale-110'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-2 py-1 text-xs font-mono text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={!newContent.trim()}
                  className="px-3 py-1 text-xs font-bold rounded bg-amber-600 text-white hover:bg-amber-700 font-mono shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  Stick It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rendered Sticky Notes on this page */}
      {pageNotes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
          {pageNotes.map((note, index) => {
            const style = COLOR_STYLES[note.color] || COLOR_STYLES.yellow;
            // Subtle rotation alternate for realistic stationery feel
            const rotationClass = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : 'rotate-0';

            return (
              <div
                key={note.id}
                className={`relative p-3.5 rounded-sm border shadow-md transition-all hover:shadow-lg ${style.bg} ${style.border} ${rotationClass} group`}
              >
                {/* Physical Top Adhesive Tape Stripe */}
                <div
                  className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 ${style.tape} rounded-xs opacity-75 pointer-events-none shadow-2xs`}
                />

                <div className="flex items-start justify-between gap-1 mb-1">
                  <h4 className="font-bold text-xs tracking-tight line-clamp-1">
                    {note.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      notebookAudio.playPencil();
                      onDeleteSticky(note.id);
                    }}
                    title="Remove Note"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-500 hover:text-red-700 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <p className="font-handwritten text-sm leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                <div className="mt-2 pt-1 border-t border-black/10 flex items-center justify-between text-[10px] font-mono opacity-60">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    {(['yellow', 'pink', 'mint', 'sky'] as StickyColor[]).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => onUpdateSticky(note.id, { color: c })}
                        className={`w-2.5 h-2.5 rounded-full ${
                          c === 'yellow' ? 'bg-amber-400' : c === 'pink' ? 'bg-pink-400' : c === 'mint' ? 'bg-emerald-400' : 'bg-sky-400'
                        } cursor-pointer opacity-70 hover:opacity-100`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
