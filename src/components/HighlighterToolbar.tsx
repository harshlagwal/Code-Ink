import { HighlightColor, HighlightTool } from '../types/notebook';

interface HighlighterToolbarProps {
  selectedTool: HighlightTool;
  onSelectTool: (tool: HighlightTool) => void;
}

export function HighlighterToolbar({
  selectedTool,
  onSelectTool
}: HighlighterToolbarProps) {
  const pens: Array<{
    color: HighlightColor;
    name: string;
    inkHex: string;
    barrelClass: string;
    borderHex: string;
  }> = [
    {
      color: 'green',
      name: 'Green Pen',
      inkHex: '#22c55e',
      barrelClass: 'from-emerald-400 to-emerald-600',
      borderHex: '#15803d'
    },
    {
      color: 'blue',
      name: 'Blue Pen',
      inkHex: '#3b82f6',
      barrelClass: 'from-blue-400 to-blue-600',
      borderHex: '#1d4ed8'
    },
    {
      color: 'yellow',
      name: 'Yellow Pen',
      inkHex: '#eab308',
      barrelClass: 'from-amber-300 to-amber-500',
      borderHex: '#b45309'
    },
    {
      color: 'red',
      name: 'Red Pen',
      inkHex: '#ef4444',
      barrelClass: 'from-rose-400 to-rose-600',
      borderHex: '#b91c1c'
    }
  ];

  const activeColorHex =
    selectedTool === 'green'
      ? '#22c55e'
      : selectedTool === 'blue'
      ? '#3b82f6'
      : selectedTool === 'yellow'
      ? '#eab308'
      : selectedTool === 'red'
      ? '#ef4444'
      : '#64748b';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto">
      {/* 
        Rock-solid fixed container:
        - Exact fixed width (w-[236px]) and height (h-[78px])
        - No transition-all on container so border and shadow NEVER jitter or shake
      */}
      <div className="w-[236px] h-[78px] flex flex-col items-center justify-between bg-[#FFFDF7]/95 backdrop-blur-md px-3 pt-2 pb-1.5 rounded-2xl border border-[#D9D4C8] shadow-xl shadow-stone-900/10">
        {/* Stable Header (Fixed height, no layout shifts) */}
        <div className="w-full flex items-center justify-between px-1 h-3.5 text-[9px] font-mono tracking-widest text-stone-500 font-bold">
          <span>CODEINK HIGHLIGHTER</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
              style={{ backgroundColor: activeColorHex }}
            />
            <span className="text-[8px] uppercase tracking-wider text-stone-500 font-mono">
              {selectedTool}
            </span>
          </div>
        </div>

        {/* Physical Tool Tray: [🟢 Pen] [🔵 Pen] [🟡 Pen] [🔴 Pen] | [Eraser] */}
        <div className="w-full flex items-end justify-center gap-1 h-[48px]">
          {pens.map((pen) => {
            const isSelected = selectedTool === pen.color;

            return (
              <button
                key={pen.color}
                type="button"
                onClick={() => onSelectTool(pen.color)}
                className="w-8 h-[48px] flex flex-col items-center justify-end relative outline-none cursor-pointer group"
                title={`${pen.name} ${isSelected ? '(Active)' : ''}`}
                aria-label={pen.name}
                aria-pressed={isSelected}
              >
                {/* 
                  Smooth hardware-accelerated translateY on the pen graphic ONLY.
                  Outer button bounding box remains 100% static, guaranteeing zero container shaking.
                */}
                <div
                  className={`w-4 h-10 flex flex-col items-center rounded-t-sm rounded-b-md transition-transform duration-200 ease-out will-change-transform ${
                    isSelected
                      ? '-translate-y-2'
                      : 'group-hover:-translate-y-1'
                  }`}
                >
                  {/* Chisel Tip (Angled Felt Nib) */}
                  <div
                    className="w-2.5 h-2.5 shrink-0 shadow-2xs"
                    style={{
                      backgroundColor: pen.inkHex,
                      clipPath: 'polygon(0% 100%, 0% 35%, 100% 0%, 100% 100%)'
                    }}
                  />

                  {/* Dark Collar holding the nib */}
                  <div className="w-3.5 h-1 shrink-0 bg-[#292524] rounded-t-xs" />

                  {/* Marker Barrel with vibrant gradient and 3D sheen */}
                  <div
                    className={`w-full flex-1 bg-linear-to-b ${pen.barrelClass} relative overflow-hidden rounded-b-md flex justify-center shadow-xs ${
                      isSelected ? 'ring-2 ring-stone-900 ring-offset-1 ring-offset-[#FFFDF7]' : ''
                    }`}
                  >
                    {/* Left edge 3D light reflection highlight */}
                    <div className="absolute left-0.5 top-0.5 bottom-0.5 w-0.5 bg-white/45 rounded-full" />
                    {/* Center grip ring groove */}
                    <div className="absolute top-1.5 w-full h-px bg-black/15" />
                    <div className="absolute top-2 w-full h-px bg-white/20" />
                  </div>
                </div>

                {/* Fixed-height Indicator Slot (fades in/out smoothly without shifting layout) */}
                <div className="h-1.5 w-full flex items-center justify-center mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-opacity duration-200 ${
                      isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{ backgroundColor: pen.inkHex }}
                  />
                </div>
              </button>
            );
          })}

          {/* Minimal Static Divider between Pens and Eraser */}
          <div className="h-6 w-px bg-stone-300 mx-0.5 mb-2 self-center shrink-0" />

          {/* DEDICATED PHYSICAL ERASER TOOL */}
          <button
            type="button"
            onClick={() => onSelectTool('eraser')}
            className="w-8 h-[48px] flex flex-col items-center justify-end relative outline-none cursor-pointer group"
            title="Eraser (Click any user highlight to remove)"
            aria-label="Eraser"
            aria-pressed={selectedTool === 'eraser'}
          >
            {/* Smooth hardware-accelerated translateY on Eraser */}
            <div
              className={`w-4.5 h-10 flex flex-col items-center rounded-sm transition-transform duration-200 ease-out will-change-transform ${
                selectedTool === 'eraser'
                  ? '-translate-y-2'
                  : 'group-hover:-translate-y-1'
              }`}
            >
              {/* Slanted Vinyl Rubber Top */}
              <div
                className="w-full h-3 shrink-0 bg-[#FAF9F5] border-t border-l border-r border-[#E2DDD3]"
                style={{
                  clipPath: 'polygon(0% 100%, 0% 30%, 100% 0%, 100% 100%)'
                }}
              />

              {/* Rubber mid section */}
              <div className="w-full h-1 shrink-0 bg-[#F5F2EB] border-l border-r border-[#E2DDD3]" />

              {/* Cardboard Protective Sleeve */}
              <div
                className={`w-full flex-1 bg-[#1E293B] relative overflow-hidden rounded-b-xs border border-stone-800 flex flex-col justify-between py-0.5 shadow-xs ${
                  selectedTool === 'eraser' ? 'ring-2 ring-stone-900 ring-offset-1 ring-offset-[#FFFDF7]' : ''
                }`}
              >
                {/* Thin CODEINK blue accent stripe */}
                <div className="w-full h-1 bg-[#2457D6]" />
                {/* Subtle sheen */}
                <div className="absolute left-0.5 top-0 bottom-0 w-0.5 bg-white/20" />
                <span className="text-[5px] font-mono text-stone-300 text-center font-bold tracking-tighter scale-90">
                  INK
                </span>
              </div>
            </div>

            {/* Fixed-height Indicator Slot */}
            <div className="h-1.5 w-full flex items-center justify-center mt-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-stone-900 transition-opacity duration-200 ${
                  selectedTool === 'eraser' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
