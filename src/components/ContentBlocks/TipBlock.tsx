import { Lightbulb } from 'lucide-react';

interface TipBlockProps {
  tip: string;
}

export function TipBlock({ tip }: TipBlockProps) {
  return (
    <div className="my-5 p-4 rounded-lg bg-[#F0F7F3] dark:bg-[#1E2B23] border-l-4 border-success border-y border-r border-[#D3E8DC] dark:border-[#2C4A37] shadow-xs">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Lightbulb className="w-3.5 h-3.5 text-success" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-success">
          ENGINEERING TIP & BEST PRACTICE
        </span>
      </div>
      <p className="text-ink text-sm leading-relaxed">
        {tip}
      </p>
    </div>
  );
}
