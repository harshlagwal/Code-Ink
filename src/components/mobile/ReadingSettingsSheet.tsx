import React from 'react';
import { X, Sliders, Type, FileText, Zap, Sun, Moon, Monitor } from 'lucide-react';
import { PaperStyle } from '../../types/notebook';
import { notebookAudio } from '../../utils/audioEffects';
import { useTheme, type ThemeChoice } from '../../theme/ThemeProvider';

export type DiaryFontSize = 's' | 'm' | 'l';

interface ReadingSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  paperStyle: PaperStyle;
  onSelectPaperStyle: (style: PaperStyle) => void;
  fontSize: DiaryFontSize;
  onSelectFontSize: (size: DiaryFontSize) => void;
  reduceMotion: boolean;
  onToggleReduceMotion: (enabled: boolean) => void;
}

export const ReadingSettingsSheet: React.FC<ReadingSettingsSheetProps> = ({
  isOpen,
  onClose,
  paperStyle,
  onSelectPaperStyle,
  fontSize,
  onSelectFontSize,
  reduceMotion,
  onToggleReduceMotion,
}) => {
  const { choice, setChoice } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Reading Settings"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full sm:max-w-md bg-page rounded-t-2xl sm:rounded-2xl border border-line shadow-2xl p-5 pb-8 sm:pb-5 space-y-5 animate-in slide-in-from-bottom-5 duration-300 notebook-plain text-ink"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent-soft text-accent flex items-center justify-center border border-accent/20">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-ink font-sans">
              Diary Reading Preferences
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-ink hover:bg-raised transition-colors cursor-pointer"
            aria-label="Close reading settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-accent" />
            <span>Reading Theme</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' },
            ].map(item => {
              const Icon = item.icon;
              const isSelected = choice === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setChoice(item.id as ThemeChoice);
                    notebookAudio.playPencil();
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white border-accent shadow-xs font-semibold'
                      : 'bg-page text-ink border-line hover:bg-raised'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Paper Style Selection */}
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>Paper Pattern</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['ruled', 'grid', 'plain'] as PaperStyle[]).map(style => {
              const isSelected = paperStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    onSelectPaperStyle(style);
                    notebookAudio.playPageTurn();
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium capitalize transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white border-accent shadow-xs font-semibold'
                      : 'bg-page text-ink border-line hover:bg-raised'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Font Size Selection */}
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-accent" />
            <span>Reading Text Size</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 's', label: 'Small' },
              { id: 'm', label: 'Medium' },
              { id: 'l', label: 'Large' },
            ].map(item => {
              const isSelected = fontSize === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectFontSize(item.id as DiaryFontSize);
                    notebookAudio.playPencil();
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white border-accent shadow-xs font-semibold'
                      : 'bg-page text-ink border-line hover:bg-raised'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Reduce Motion Toggle */}
        <div className="pt-2 border-t border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-muted" />
            <div>
              <div className="text-xs font-bold text-ink font-sans">Reduce Motion</div>
              <div className="text-[11px] text-muted font-sans">
                Replace 3D page flip with fast 180ms crossfade
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onToggleReduceMotion(!reduceMotion);
              notebookAudio.playPencil();
            }}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              reduceMotion ? 'bg-accent' : 'bg-line'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                reduceMotion ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
