import { DiagramData } from '../../types/notebook';
import { ArrowRight, Layers } from 'lucide-react';

interface DiagramBlockProps {
  diagram: DiagramData;
}

export function DiagramBlock({ diagram }: DiagramBlockProps) {
  return (
    <div className="my-6 p-5 sm:p-6 bg-raised rounded-lg border border-line shadow-sm relative overflow-hidden">
      {/* Engineering Blueprint Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <span className="font-semibold tracking-wide text-ink uppercase text-[11px]">
            {diagram.title}
          </span>
        </div>
        {diagram.subtitle && (
          <span className="text-muted font-handwritten text-base">
            ({diagram.subtitle})
          </span>
        )}
      </div>

      {/* Visual Canvas */}
      {diagram.type === 'pipeline' ? (
        <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 py-2">
          {diagram.elements.map((el, idx) => (
            <div key={el.id} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`p-3 rounded border text-center transition-all ${
                  el.status === 'active'
                    ? 'border-accent bg-accent/15 shadow-sm'
                    : el.status === 'referenced'
                    ? 'border-emerald-500/80 bg-emerald-500/15'
                    : 'border-line bg-page'
                }`}
              >
                <div className="text-xs font-semibold text-ink">{el.label}</div>
                {el.sublabel && (
                  <div className="font-mono text-[10px] text-muted mt-0.5">{el.sublabel}</div>
                )}
                {el.value && (
                  <div className="text-[11px] font-mono text-accent mt-1 font-medium">{el.value}</div>
                )}
              </div>

              {idx < diagram.elements.length - 1 && (
                <div className="flex items-center text-accent">
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Memory Table / Address Slot Layout */
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-mono text-muted uppercase tracking-wider pb-1 border-b border-line">
            <span className="col-span-3 sm:col-span-3">Address</span>
            <span className="col-span-4 sm:col-span-4">Variable / Node</span>
            <span className="col-span-5 sm:col-span-5">Value / State</span>
          </div>

          <div className="divide-y divide-line">
            {diagram.elements.map((el) => {
              const isActive = el.status === 'active';
              const isWarning = el.status === 'warning';
              const isReferenced = el.status === 'referenced';

              return (
                <div
                  key={el.id}
                  className={`grid grid-cols-12 gap-2 py-2 px-1 text-xs items-center transition-colors rounded ${
                    isActive
                      ? 'bg-accent/15 text-accent'
                      : isWarning
                      ? 'bg-rose-500/15 text-danger'
                      : isReferenced
                      ? 'bg-emerald-500/15 text-success'
                      : 'hover:bg-page'
                  }`}
                >
                  <span className="col-span-3 sm:col-span-3 font-mono text-[11px] text-muted truncate">
                    {el.address || '—'}
                  </span>
                  <div className="col-span-4 sm:col-span-4">
                    <span className="font-semibold text-ink">{el.label}</span>
                    {el.sublabel && (
                      <span className="block font-handwritten text-muted text-xs sm:text-sm">
                        {el.sublabel}
                      </span>
                    )}
                  </div>
                  <div className="col-span-5 sm:col-span-5 flex items-center justify-between gap-1 font-mono text-[11px] sm:text-xs">
                    <span className="truncate">{el.value || '—'}</span>
                    {el.arrowTo && (
                      <span className="font-handwritten text-muted text-xs shrink-0 flex items-center gap-0.5">
                        <ArrowRight className="w-3 h-3 text-accent" />
                        <span>target</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Engineering Stamp in bottom corner */}
      <div className="mt-3 pt-2 text-right">
        <span className="font-handwritten text-xs text-muted select-none">
          fig. memory architecture blueprint
        </span>
      </div>
    </div>
  );
}
