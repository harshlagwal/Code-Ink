import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { CodeSnippet } from '../../types/notebook';

interface CodeBlockProps {
  snippet: CodeSnippet;
}

export function CodeBlock({ snippet }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = snippet.code.split('\n');

  return (
    <div className="my-4 rounded-lg border border-[#D9D4C8] bg-[#1A1D21] text-stone-100 shadow-xs overflow-hidden w-full">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#141619] border-b border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono text-[11px] text-stone-400 uppercase tracking-wider ml-1">
            {snippet.language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with line numbers and smart overflow */}
      <div className="p-3 sm:p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const annotation = snippet.annotations?.find(a => a.line === lineNum);

              return (
                <tr key={idx} className="group hover:bg-white/5 transition-colors">
                  <td className="w-7 sm:w-9 pr-3 text-right select-none text-stone-600 font-mono text-[11px] align-top py-0.5">
                    {lineNum}
                  </td>
                  <td className="font-mono text-stone-100 whitespace-pre align-top py-0.5 pr-2">
                    {line || ' '}
                  </td>
                  {annotation && (
                    <td className="hidden xl:table-cell align-top py-0.5 pl-3 border-l border-stone-800/80 whitespace-nowrap">
                      <span className="font-handwritten text-sm text-[#FFF09A] select-none">
                        ← {annotation.label}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Console Output if present */}
      {snippet.output && (
        <div className="bg-[#111316] px-3.5 py-2.5 border-t border-stone-800 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-500 mb-1">
            <Terminal className="w-3 h-3 text-stone-400" />
            <span>Console Output</span>
          </div>
          <div className="text-emerald-400 whitespace-pre font-mono text-xs pl-1">
            {snippet.output}
          </div>
        </div>
      )}

      {/* Responsive Annotations List (Visible when screen is narrower so notes are never clipped) */}
      {snippet.annotations && snippet.annotations.length > 0 && (
        <div className="xl:hidden px-3.5 py-2 bg-[#141619] border-t border-stone-800 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">
            Line Annotations:
          </div>
          <div className="space-y-1">
            {snippet.annotations.map((ann, i) => (
              <div key={i} className="flex items-start gap-1.5 font-handwritten text-stone-300 text-sm">
                <span className="text-[#FFF09A] font-mono text-[11px] shrink-0 mt-0.5">
                  L{ann.line}:
                </span>
                <span>{ann.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
