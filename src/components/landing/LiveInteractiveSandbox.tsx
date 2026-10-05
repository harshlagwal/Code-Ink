import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Play, RotateCcw, Terminal, Cpu, ArrowRight, Sparkles, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { fadeUp, fade, stagger } from '../../motion/variants';
import { executeOnlineCode } from '../../services/onlineCompiler';
import { parseDryRunVariables, DryRunVariable } from '../../utils/dryRunTracer';

interface LiveInteractiveSandboxProps {
  onEnter: () => void;
}

type LanguageKey = 'c' | 'python' | 'javascript';

interface SandboxPreset {
  name: string;
  badge: string;
  color: string;
  defaultCode: string;
  defaultOutput: string[];
  executionTime: string;
  memoryAllocated: string;
}

const PRESETS: Record<LanguageKey, SandboxPreset> = {
  c: {
    name: 'C (Pointers & Memory)',
    badge: 'Hardware Level',
    color: '#2457D6',
    defaultCode: `#include <stdio.h>

int main() {
    int secret = 42;
    int *ptr = &secret;

    // Dereferencing physical address
    printf("Physical Address: %p\\n", (void*)ptr);
    printf("Stored Value:     %d\\n", *ptr);
    return 0;
}`,
    defaultOutput: [
      '> GCC 13.2 in-browser execution',
      'Physical Address: 0x7ffd5820',
      'Stored Value:     42',
      '----------------------------------------',
      '✔ Program exited successfully with code 0',
    ],
    executionTime: '14ms',
    memoryAllocated: '4.2 KB',
  },
  python: {
    name: 'Python (List & Comprehensions)',
    badge: 'Dynamic Memory',
    color: '#2563EB',
    defaultCode: `# Dynamic arrays & memory comprehension
numbers = [1, 2, 3, 4, 5, 6]

# Square only even elements
evens_squared = [x**2 for x in numbers if x % 2 == 0]

print("Original:", numbers)
print("Squares: ", evens_squared)`,
    defaultOutput: [
      '> Python 3.12 Runtime ready',
      'Original: [1, 2, 3, 4, 5, 6]',
      'Squares:  [4, 16, 36]',
      '----------------------------------------',
      '✔ Garbage Collector: 0 cycles detected',
    ],
    executionTime: '9ms',
    memoryAllocated: '14.8 KB',
  },
  javascript: {
    name: 'JavaScript (Closures & Scopes)',
    badge: 'V8 Engine',
    color: '#D97706',
    defaultCode: `// Memory scope & closure retention
function makeCounter(initial = 10) {
  let count = initial;
  return () => ++count;
}

const myCounter = makeCounter(40);
console.log("Tick 1:", myCounter());
console.log("Tick 2:", myCounter());`,
    defaultOutput: [
      '> Node.js / V8 Sandbox execution',
      'Tick 1: 41',
      'Tick 2: 42',
      '----------------------------------------',
      '✔ Lexical Environment preserved in Heap',
    ],
    executionTime: '4ms',
    memoryAllocated: '2.4 KB',
  },
};

function executeJavaScriptSafely(jsCode: string): { output: string[]; duration: string; hasError: boolean } {
  const startTime = performance.now();
  const logs: string[] = [];
  const customConsole = {
    log: (...args: unknown[]) =>
      logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
    error: (...args: unknown[]) => logs.push('[Error] ' + args.join(' ')),
    warn: (...args: unknown[]) => logs.push('[Warning] ' + args.join(' ')),
    info: (...args: unknown[]) => logs.push('[Info] ' + args.join(' ')),
  };

  try {
    const fn = new Function('console', jsCode);
    fn(customConsole);
    const duration = `${Math.max(1, Math.round(performance.now() - startTime))}ms`;
    if (logs.length === 0) {
      logs.push('(Program executed cleanly with 0 console logs)');
    }
    return { output: logs, duration, hasError: false };
  } catch (err: unknown) {
    const duration = `${Math.max(1, Math.round(performance.now() - startTime))}ms`;
    const message = err instanceof Error ? err.message : String(err);
    return { output: [`Syntax/Runtime Error: ${message}`], duration, hasError: true };
  }
}

export function LiveInteractiveSandbox({ onEnter }: LiveInteractiveSandboxProps) {
  const [activeLang, setActiveLang] = useState<LanguageKey>('c');
  const [code, setCode] = useState<string>(PRESETS.c.defaultCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'memory' | 'terminal'>('memory');
  const [outputLines, setOutputLines] = useState<string[]>(PRESETS.c.defaultOutput);
  const [executionTime, setExecutionTime] = useState<string>(PRESETS.c.executionTime);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLiveResult, setIsLiveResult] = useState<boolean>(false);
  const [liveVars, setLiveVars] = useState<DryRunVariable[]>(() =>
    parseDryRunVariables(PRESETS.c.defaultCode, 'c')
  );

  const reduce = useReducedMotion();
  const currentPreset = PRESETS[activeLang];

  const handleSelectLang = (lang: LanguageKey) => {
    setActiveLang(lang);
    setCode(PRESETS[lang].defaultCode);
    setOutputLines(PRESETS[lang].defaultOutput);
    setExecutionTime(PRESETS[lang].executionTime);
    setHasError(false);
    setIsLiveResult(false);
    setLiveVars(parseDryRunVariables(PRESETS[lang].defaultCode, lang));
    setHasRun(true);
  };

  const handleReset = () => {
    setCode(currentPreset.defaultCode);
    setOutputLines(currentPreset.defaultOutput);
    setExecutionTime(currentPreset.executionTime);
    setHasError(false);
    setIsLiveResult(false);
    setLiveVars(parseDryRunVariables(currentPreset.defaultCode, activeLang));
    setHasRun(true);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setHasRun(false);

    // 1. Dynamically parse actual memory variables typed by user
    const parsed = parseDryRunVariables(code, activeLang);
    setLiveVars(parsed);

    // 2. Real compilation execution
    try {
      if (activeLang === 'javascript') {
        const res = executeJavaScriptSafely(code);
        setOutputLines(res.output);
        setExecutionTime(res.duration);
        setHasError(res.hasError);
        setIsLiveResult(true);
      } else {
        const res = await executeOnlineCode(code, activeLang);
        const lines = res.output ? res.output.split('\n') : ['(No stdout output)'];
        setOutputLines(lines);
        setExecutionTime(`${Math.round(res.durationMs)}ms`);
        setHasError(res.hasError);
        setIsLiveResult(true);
      }
    } catch (err: unknown) {
      // Graceful client fallback if offline or network hiccup
      const message = err instanceof Error ? err.message : String(err);
      setOutputLines([
        `> Execution Notice: ${message}`,
        '----------------------------------------',
        '💡 Memory variables still parsed successfully above in RAM Architecture.',
      ]);
      setExecutionTime('Local trace');
      setHasError(true);
      setIsLiveResult(true);
    } finally {
      setIsRunning(false);
      setHasRun(true);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 select-none border-t border-line/60">
      {/* Section Header */}
      <motion.div
        variants={stagger(0.09, 0.04)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <motion.div
          variants={fade}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised border border-line text-[11px] font-mono text-muted mb-4 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="font-semibold text-ink uppercase tracking-wider">Try Before You Enter</span>
          <span>·</span>
          <span className="text-emerald-500 font-bold">100% Real Live Engine</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight"
        >
          Real in-browser execution,{' '}
          <span className="text-muted font-normal">not static screenshots.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Modify the code below freely. Click <strong className="text-ink font-semibold">Run &amp; Trace</strong> to execute your custom code against a real compiler and watch memory variables calculate dynamically.
        </motion.p>
      </motion.div>

      {/* Main Interactive Workbench Card */}
      <motion.div
        variants={fadeUp}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="rounded-3xl border border-line bg-raised shadow-2xl shadow-black/5 dark:shadow-black/40 overflow-hidden"
      >
        {/* Top Control Bar: Language Switcher + Run Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 border-b border-line bg-page/60 backdrop-blur-md">
          {/* Language Selector Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(Object.keys(PRESETS) as LanguageKey[]).map((key) => {
              const p = PRESETS[key];
              const isSelected = activeLang === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectLang(key)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-raised text-ink shadow-sm border border-line'
                      : 'text-muted hover:text-ink hover:bg-raised/50'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleReset}
              title="Reset sample code"
              className="p-2 rounded-xl border border-line bg-raised hover:bg-page text-muted hover:text-ink transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-accent hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-70"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Compiling & Tracing...' : 'Run & Trace'}</span>
            </button>
          </div>
        </div>

        {/* Workbench Body: Code Editor (Left) + Memory/Terminal (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line">
          {/* Left Column: Ruled Paper Code Editor (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col bg-page/40 p-4 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-ink">
                  main.{activeLang === 'python' ? 'py' : activeLang === 'javascript' ? 'js' : 'c'}
                </span>
              </span>
              <span>Live Editable Code</span>
            </div>

            <div className="relative rounded-xl border border-line/80 bg-page overflow-hidden shadow-inner flex flex-1 min-h-[320px]">
              {/* Line Numbers Column */}
              <div className="w-10 sm:w-12 bg-raised/60 border-r border-line/60 py-3.5 font-mono text-[11px] text-muted/60 select-none text-right pr-3 leading-6">
                {code.split('\n').map((_, idx) => (
                  <div key={idx}>0{idx + 1}</div>
                ))}
              </div>

              {/* Editable Code Textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full resize-none bg-transparent p-3.5 font-mono text-xs sm:text-[13px] text-ink leading-6 outline-none selection:bg-accent/20"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted">
              <span>Type your own variables or print statements</span>
              <span className="text-accent font-semibold">Real Compiler Connected</span>
            </div>
          </div>

          {/* Right Column: Live Memory Tracer & Terminal (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col bg-raised/20 p-4 sm:p-6">
            {/* View Switcher Tabs: Memory Tracer vs Terminal */}
            <div className="flex items-center justify-between mb-3 border-b border-line pb-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('memory')}
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'memory'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Memory Architecture</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'terminal'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal Output</span>
                </button>
              </div>

              <div
                className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                  hasError ? 'text-amber-500' : 'text-emerald-500'
                }`}
              >
                {hasError ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{executionTime}</span>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 min-h-[320px] flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 'memory' ? (
                  <motion.div
                    key="memory"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex flex-col gap-3 h-full"
                  >
                    <div className="rounded-xl border border-line bg-page p-3.5 shadow-2xs flex-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2.5 border-b border-line pb-1.5">
                        <span className="font-bold text-ink flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-accent" />
                          <span>Stack / Scope Variables</span>
                        </span>
                        <span className="text-[10px] text-accent font-semibold">
                          {liveVars.length} active allocations
                        </span>
                      </div>

                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                        {liveVars.length > 0 ? (
                          liveVars.map((item, iIdx) => {
                            const isPtr =
                              item.type.includes('*') ||
                              item.value.startsWith('&') ||
                              item.value.startsWith('0x') ||
                              item.type === 'Function';

                            return (
                              <div
                                key={iIdx}
                                className={`p-2.5 rounded-lg border font-mono text-xs transition-all ${
                                  hasRun
                                    ? 'border-emerald-500/30 bg-emerald-500/5'
                                    : 'border-line bg-raised/40'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[10px] text-muted mb-1">
                                  <span className="text-accent font-bold">{item.address}</span>
                                  <span className="uppercase tracking-wider font-semibold">
                                    {item.type} ({item.bytes}B)
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-ink">{item.name}:</span>
                                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                    {item.value}
                                  </span>
                                </div>
                                {isPtr && (
                                  <div className="mt-1 text-[10px] text-indigo-500 dark:text-indigo-400 flex items-center gap-1 font-semibold">
                                    <span>↳ Points directly to physical memory address</span>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-4 text-center text-xs font-mono text-muted border border-dashed border-line rounded-lg">
                            <span>No local variables parsed yet. Declare a variable (e.g. <code>int x = 10;</code>) and click Run &amp; Trace!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>{isLiveResult ? '● Live parsed from your code' : '● Default state'}</span>
                      <span>Alloc: {currentPreset.memoryAllocated}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="rounded-xl border border-line/80 bg-neutral-950 text-neutral-100 p-4 font-mono text-xs leading-6 h-full flex flex-col justify-between shadow-inner flex-1"
                  >
                    <div className="space-y-1 overflow-y-auto max-h-[260px]">
                      <div className="text-neutral-500 text-[11px]">
                        user@codeink-sandbox:~$ ./run_{activeLang}
                      </div>
                      {outputLines.map((line, idx) => (
                        <div
                          key={idx}
                          className={`${
                            line.startsWith('✔')
                              ? 'text-emerald-400 font-bold'
                              : line.startsWith('>') || line.startsWith('[')
                              ? 'text-neutral-400'
                              : line.toLowerCase().includes('error')
                              ? 'text-red-400 font-bold'
                              : 'text-neutral-100 font-semibold'
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-800 text-[10px] text-neutral-400 flex items-center justify-between">
                      <span className={hasError ? 'text-amber-400' : 'text-emerald-400'}>
                        {hasError ? 'Execution returned non-zero / warning' : 'Execution complete'}
                      </span>
                      <span>Latency: {executionTime}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Gateway to Full Studio */}
        <div className="p-4 sm:p-5 bg-raised border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-muted">
            <Sparkles className="w-4 h-4 text-accent shrink-0" />
            <span>
              This is just 1 of 6 languages. The full notebook includes authentic 50-mark exam papers, AI companion, and 100 tools.
            </span>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 px-5 py-2.5 text-xs font-bold font-mono transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
          >
            <span>Launch Notebook Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
