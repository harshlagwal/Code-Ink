import { useCallback, useEffect, useRef, useState } from 'react';

export type SpeechStatus = 'idle' | 'playing' | 'paused';

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voiceURI?: string;
  onBoundary?: (charIndex: number, charLength: number) => void;
  onEnd?: () => void;
}

/**
 * Split text into sentence-sized chunks (<= 200 chars)
 * Critical: Chrome Web Speech API truncates utterances longer than ~15 seconds.
 */
export function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const parts = clean.match(/[^.!?]+[.!?]*/g) ?? [clean];
  const out: string[] = [];
  let buf = '';
  for (const part of parts) {
    if (buf && (buf + part).length > 200) {
      out.push(buf.trim());
      buf = '';
    }
    buf += part;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

export function useSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<SpeechStatus>('idle');

  const queueRef = useRef<string[]>([]);
  const optsRef = useRef<SpeakOptions>({});
  const offsetRef = useRef(0); // running char offset across chunks

  // Voices load asynchronously in most browsers (Chrome, Edge, Safari)
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoices(v);
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [supported]);

  const speakChunk = useCallback(() => {
    if (!supported) return;

    const chunk = queueRef.current.shift();
    if (chunk == null) {
      setStatus('idle');
      optsRef.current.onEnd?.();
      return;
    }

    const base = offsetRef.current;
    offsetRef.current += chunk.length + 1;

    const u = new SpeechSynthesisUtterance(chunk);
    const o = optsRef.current;
    u.lang = o.lang ?? 'en-IN';
    u.rate = o.rate ?? 1;
    u.pitch = o.pitch ?? 1;

    if (o.voiceURI) {
      const v = window.speechSynthesis.getVoices().find((x) => x.voiceURI === o.voiceURI);
      if (v) u.voice = v;
    }

    u.onboundary = (e) => {
      if (e.name === 'word' || e.name === 'sentence') {
        o.onBoundary?.(base + e.charIndex, e.charLength ?? 0);
      }
    };

    u.onend = () => speakChunk(); // sequentially chain next chunk
    u.onerror = () => speakChunk();

    window.speechSynthesis.speak(u);
  }, [supported]);

  const speak = useCallback(
    (text: string, options: SpeakOptions = {}) => {
      if (!supported) return;
      window.speechSynthesis.cancel(); // clear anything currently pending
      optsRef.current = options;
      offsetRef.current = 0;
      queueRef.current = chunkText(text);
      if (!queueRef.current.length) return;
      setStatus('playing');
      speakChunk();
    },
    [supported, speakChunk]
  );

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
    setStatus('playing');
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    queueRef.current = [];
    window.speechSynthesis.cancel();
    setStatus('idle');
  }, [supported]);

  // Kill audio on unmount so no zombie audio runs in background
  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  return { supported, voices, status, speak, pause, resume, stop };
}
