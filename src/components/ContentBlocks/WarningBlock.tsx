import { AlertCircle } from 'lucide-react';

interface WarningBlockProps {
  mistakes: string[];
}

export function WarningBlock({ mistakes }: WarningBlockProps) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="my-5 p-4 rounded-lg bg-[#FDF2F2] border-l-4 border-[#D94A4A] border-y border-r border-[#F4D2D2] shadow-xs">
      <div className="flex items-center gap-1.5 mb-2">
        <AlertCircle className="w-3.5 h-3.5 text-[#D94A4A]" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D94A4A]">
          COMMON MISTAKES TO AVOID
        </span>
      </div>
      <ul className="space-y-1.5">
        {mistakes.map((mistake, idx) => (
          <li key={idx} className="flex items-start gap-2 text-stone-800 text-sm leading-relaxed">
            <span className="text-[#D94A4A] font-bold select-none text-xs mt-0.5">✕</span>
            <span>{mistake}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
