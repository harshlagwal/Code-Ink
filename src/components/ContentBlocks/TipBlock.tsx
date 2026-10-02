import { Lightbulb } from 'lucide-react';

interface TipBlockProps {
  tip: string;
}

export function TipBlock({ tip }: TipBlockProps) {
  return (
    <div className="my-5 p-4 rounded-lg bg-[#F0F7F3] border-l-4 border-[#3D7A57] border-y border-r border-[#D3E8DC] shadow-xs">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Lightbulb className="w-3.5 h-3.5 text-[#3D7A57]" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D7A57]">
          ENGINEERING TIP & BEST PRACTICE
        </span>
      </div>
      <p className="text-stone-800 text-sm leading-relaxed">
        {tip}
      </p>
    </div>
  );
}
