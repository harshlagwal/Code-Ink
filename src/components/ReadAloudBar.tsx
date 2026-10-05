import React, { useMemo, useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

interface ReadAloudBarProps {
  text: string;
  topicTitle: string;
  lang?: string; // 'en-IN' (default) or 'hi-IN'
  onClose: () => void;
  autoPlay?: boolean;
}

export const ReadAloudBar: React.FC<ReadAloudBarProps> = ({
  text,
  topicTitle,
  lang = 'en-IN',
  onClose,
  autoPlay = true,
}) => {
  const { supported, voices, status, speak, pause, resume, stop } = useSpeech();
  const [rate, setRate] = useState<number>(1);
  const [voiceURI, setVoiceURI] = useState<string | undefined>();
  const [range, setRange] = useState<[number, number] | null>(null);
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState<boolean>(true);

  // Filter voices by active language prefix (e.g. 'en' or 'hi')
  const langVoices = useMemo(() => {
    const prefix = lang.slice(0, 2).toLowerCase();
    const matches = voices.filter((v) => v.lang?.toLowerCase().startsWith(prefix));
    return matches.length > 0 ? matches : voices;
  }, [voices, lang]);

  // Autoplay when opened
  useEffect(() => {
    if (supported && autoPlay && text) {
      speak(text, {
        lang,
        rate,
        voiceURI,
        onBoundary: (i, len) => setRange([i, i + (len || 1)]),
        onEnd: () => setRange(null),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, supported]);

  if (!supported) return null;

  const handleTogglePlay = () => {
    if (status === 'idle') {
      setRange(null);
      speak(text, {
        lang,
        rate,
        voiceURI,
        onBoundary: (i, len) => setRange([i, i + (len || 1)]),
        onEnd: () => setRange(null),
      });
    } else if (status === 'playing') {
      pause();
    } else {
      resume();
    }
  };

  const handleStop = () => {
    stop();
    setRange(null);
  };

  const handleClose = () => {
    stop();
    setRange(null);
    onClose();
  };

  const [start, end] = range ?? [0, 0];

  return (
    <div
      aria-label="Read Aloud Player"
      className="fixed bottom-4 sm:bottom-6 right-2 sm:right-6 left-2 sm:left-auto sm:w-[480px] z-50 bg-[#FFFDF7]/98 backdrop-blur-md rounded-2xl border-2 border-[#D9D4C8] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.28)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans text-[#171717]"
    >
      {/* Top Header / Status Strip */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-stone-100/80 border-b border-[#D9D4C8] select-none">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0 border border-blue-200">
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#2457D6] font-semibold leading-none">
              Read Aloud (TTS)
            </div>
            <div className="text-xs font-bold text-stone-900 truncate leading-tight mt-0.5 max-w-[200px] sm:max-w-[260px]">
              {topicTitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle Transcript View */}
          <button
            type="button"
            onClick={() => setIsTranscriptExpanded((prev) => !prev)}
            className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
            title={isTranscriptExpanded ? 'Collapse transcript' : 'Expand transcript'}
          >
            {isTranscriptExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {/* Close Player */}
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Close Read Aloud"
            aria-label="Close Read Aloud"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Transport Controls */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white border-b border-[#D9D4C8]/60 flex-wrap">
        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
            status === 'playing'
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-[#2457D6] hover:bg-blue-700 text-white'
          }`}
          aria-label={status === 'playing' ? 'Pause narration' : 'Play narration'}
        >
          {status === 'playing' ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{status === 'paused' ? 'Resume' : 'Play'}</span>
            </>
          )}
        </button>

        {/* Stop Button */}
        <button
          type="button"
          onClick={handleStop}
          disabled={status === 'idle'}
          className="p-1.5 rounded-lg border border-[#D9D4C8] hover:border-stone-400 text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Stop reading"
          aria-label="Stop reading"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 text-xs font-mono">
          <span className="text-[11px] text-stone-500 hidden xs:inline">Speed:</span>
          <select
            aria-label="Reading speed"
            value={rate}
            onChange={(e) => {
              const newRate = Number(e.target.value);
              setRate(newRate);
              // Restart with new rate if currently playing
              if (status === 'playing') {
                speak(text, {
                  lang,
                  rate: newRate,
                  voiceURI,
                  onBoundary: (i, len) => setRange([i, i + (len || 1)]),
                  onEnd: () => setRange(null),
                });
              }
            }}
            className="text-xs font-mono font-semibold border border-[#D9D4C8] rounded-md px-1.5 py-1 bg-stone-50 text-stone-800 focus:outline-none focus:border-[#2457D6] cursor-pointer"
          >
            {[0.75, 1, 1.25, 1.5].map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>
        </div>

        {/* Voice Selector */}
        {langVoices.length > 0 && (
          <select
            aria-label="Voice selection"
            value={voiceURI ?? ''}
            onChange={(e) => {
              const newVoice = e.target.value || undefined;
              setVoiceURI(newVoice);
              if (status === 'playing') {
                speak(text, {
                  lang,
                  rate,
                  voiceURI: newVoice,
                  onBoundary: (i, len) => setRange([i, i + (len || 1)]),
                  onEnd: () => setRange(null),
                });
              }
            }}
            className="text-xs border border-[#D9D4C8] rounded-md px-1.5 py-1 bg-stone-50 text-stone-700 max-w-[120px] truncate focus:outline-none focus:border-[#2457D6] cursor-pointer"
          >
            <option value="">Default Voice</option>
            {langVoices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name.replace(/Google|Microsoft|Apple/gi, '').trim() || v.name}
              </option>
            ))}
          </select>
        )}

        {/* Live Status indicator */}
        <span
          aria-live="polite"
          className="ml-auto text-[11px] font-mono font-medium text-stone-500 uppercase tracking-wider flex items-center gap-1"
        >
          {status === 'playing' && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
          {status === 'playing' ? 'Reading…' : status === 'paused' ? 'Paused' : 'Ready'}
        </span>
      </div>

      {/* Follow-Along Realtime Highlight Transcript */}
      {isTranscriptExpanded && (
        <div className="p-3 max-h-40 overflow-y-auto index-scrollbar bg-[#FFFDF7] text-xs sm:text-sm leading-relaxed text-stone-800 border-t border-[#D9D4C8]/40 select-text">
          {range ? (
            <>
              <span className="text-stone-500">{text.slice(0, start)}</span>
              <mark className="speech-highlight font-medium">{text.slice(start, end)}</mark>
              <span>{text.slice(end)}</span>
            </>
          ) : (
            <span className="text-stone-600">{text}</span>
          )}
        </div>
      )}
    </div>
  );
};
