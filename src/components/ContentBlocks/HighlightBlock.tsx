interface HighlightBlockProps {
  content: string;
}

export function HighlightBlock({ content }: HighlightBlockProps) {
  return (
    <div className="my-5 py-2 pl-3 border-l-2 border-amber-400/80 relative">
      <div className="flex items-center gap-1.5 mb-1 text-xs">
        <span className="font-handwritten text-lg text-amber-900 font-bold">
          ★ Remember:
        </span>
      </div>
      <p className="text-stone-900 text-sm sm:text-base leading-relaxed font-normal">
        <span className="real-highlighter text-stone-950 font-medium">
          {content}
        </span>
      </p>
    </div>
  );
}
