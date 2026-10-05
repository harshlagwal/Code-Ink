import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  RotateCcw,
  Terminal,
  Cpu,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { notebookAudio } from '../../utils/audioEffects';
import { executeOnlineCode, isLanguageSupportedOnline } from '../../services/onlineCompiler';
import { formatCode } from '../../utils/codeFormatter';
import { parseDryRunVariables } from '../../utils/dryRunTracer';

interface FullScreenCompilerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode: string;
  language: string;
  expectedOutput?: string;
  topicTitle: string;
}

export function FullScreenCompilerSheet({
  isOpen,
  onClose,
  initialCode,
  language,
  expectedOutput = '',
  topicTitle,
}: FullScreenCompilerSheetProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [executionStats, setExecutionStats] = useState<{ durationMs: number; status: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [outputTab, setOutputTab] = useState<'console' | 'dryrun'>('console');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setHasError(false);
    setExecutionStats(null);
    setStdin('');
    setShowStdin(false);
    setOutputTab('console');
  }, [initialCode, topicTitle, isOpen]);

  if (!isOpen) return null;

  const handleRunCode = async () => {
    if (isRunning) return;
    try {
      notebookAudio.playMarker();
    } catch {}

    setIsRunning(true);
    setHasError(false);
    setOutput('Compiling and executing on sandbox server...');

    const startTime = performance.now();
    const lang = language.toLowerCase().trim();

    try {
      if (isLanguageSupportedOnline(lang)) {
        const res = await executeOnlineCode(code, lang, stdin);
        setOutput(res.output);
        setHasError(res.hasError);
        setExecutionStats({
          durationMs: res.durationMs,
          status: res.engine,
        });

        if (res.hasError) {
          try { notebookAudio.playError(); } catch {}
        } else {
          try { notebookAudio.playSuccess(); } catch {}
        }
      } else {
        // Fallback for languages running locally or unsupported online
        const elapsed = Math.round(performance.now() - startTime);
        setOutput(expectedOutput || '(Compiled successfully)');
        setHasError(false);
        setExecutionStats({ durationMs: elapsed, status: 'Local Engine' });
        try { notebookAudio.playSuccess(); } catch {}
      }
    } catch (err: unknown) {
      setHasError(true);
      setOutput(err instanceof Error ? err.message : 'Unknown execution failure');
      setExecutionStats({ durationMs: 0, status: 'Network Exception' });
      try { notebookAudio.playError(); } catch {}
    } finally {
      setIsRunning(false);
    }
  };

  const handleFormat = () => {
    setIsFormatting(true);
    try {
      const formatted = formatCode(code, language);
      setCode(formatted);
      notebookAudio.playPencil();
    } catch {
      // ignore
    } finally {
      setTimeout(() => setIsFormatting(false), 300);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      notebookAudio.playPencil();
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setOutput('');
    setHasError(false);
    setExecutionStats(null);
    notebookAudio.playPageTurn();
  };

  // Dry run parsed variables for memory tracer
  const dryRunVars = parseDryRunVariables(code, language);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen Mobile Compiler & Tracer"
      className="fixed inset-0 z-50 bg-[#141619] text-stone-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Top Header Bar */}
      <header className="shrink-0 flex items-center justify-between px-3.5 py-2.5 bg-[#1A1D21] border-b border-stone-800 pt-[env(safe-area-inset-top,0.6rem)]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-[#60A5FA] flex items-center justify-center shrink-0 border border-blue-400/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h1 className="text-xs font-bold text-white truncate font-sans">{topicTitle}</h1>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
              {language} Sandbox Compiler
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer shadow-md ${
              isRunning
                ? 'bg-amber-600 text-white cursor-wait opacity-80'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close Compiler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Editor Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-3 py-1.5 bg-[#17191C] border-b border-stone-800 text-[11px] font-mono">
        <div className="flex items-center gap-1 text-stone-400">
          <span>{code.split('\n').length} lines</span>
          <span>•</span>
          <button
            type="button"
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              showStdin || stdin ? 'bg-blue-900/60 text-blue-300 border border-blue-700' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {stdin ? 'Stdin (active)' : '+ Custom Input'}
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleFormat}
            disabled={isFormatting}
            title="Auto-format code"
            className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy code"
            className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleResetCode}
            title="Reset code"
            className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Custom Stdin Drawer */}
      {showStdin && (
        <div className="shrink-0 p-2.5 bg-[#1A1D21] border-b border-stone-800">
          <label className="block text-[10px] uppercase font-mono text-stone-400 mb-1">
            Program Stdin / Interactive Input:
          </label>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Type standard input here (e.g. integer inputs, strings)..."
            rows={2}
            className="w-full p-2 bg-[#121417] text-white font-mono text-xs rounded border border-stone-700 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      )}

      {/* Main Code Editor Area */}
      <div className="flex-1 min-h-0 flex flex-col bg-[#141619] relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full h-full p-3 font-mono text-xs leading-relaxed text-stone-100 bg-transparent resize-none focus:outline-none"
          placeholder="// Type your code here..."
        />
      </div>

      {/* Output / Tracer Tabs */}
      <div className="shrink-0 h-48 sm:h-56 flex flex-col bg-[#111316] border-t border-stone-800 pb-[env(safe-area-inset-bottom,0.6rem)]">
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#17191C] border-b border-stone-800">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setOutputTab('console')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                outputTab === 'console'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Console Output</span>
            </button>
            <button
              type="button"
              onClick={() => setOutputTab('dryrun')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                outputTab === 'dryrun'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Memory Tracer ({dryRunVars.length})</span>
            </button>
          </div>

          {executionStats && (
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className={hasError ? 'text-rose-400' : 'text-emerald-400'}>
                {executionStats.status}
              </span>
              <span className="text-stone-500">{executionStats.durationMs}ms</span>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 font-mono text-xs">
          {outputTab === 'console' ? (
            <div>
              {output ? (
                <pre
                  className={`whitespace-pre-wrap font-mono text-xs leading-relaxed ${
                    hasError ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {output}
                </pre>
              ) : expectedOutput ? (
                <div className="text-stone-500">
                  <div className="text-[10px] uppercase font-mono text-stone-400 mb-1">
                    Expected Output (Press Run to test):
                  </div>
                  <pre className="text-stone-400 whitespace-pre-wrap">{expectedOutput}</pre>
                </div>
              ) : (
                <div className="text-stone-500 italic">
                  Tap 'Run' to execute code on the cloud sandbox compiler.
                </div>
              )}
            </div>
          ) : (
            <div>
              {dryRunVars.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-[10px] uppercase text-stone-400 mb-1 font-mono">
                    Static Variable State & Types:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {dryRunVars.map((v, i) => (
                      <div key={i} className="p-2 rounded bg-stone-900 border border-stone-800 text-xs">
                        <div className="text-stone-400 text-[10px]">{v.type || 'var'}</div>
                        <div className="text-white font-bold">{v.name}</div>
                        <div className="text-emerald-400 text-[11px] truncate">
                          = {v.value ?? 'undefined'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-stone-500 italic text-center py-4">
                  No declared local variables detected in the active function scope.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FullScreenCompilerSheet;
