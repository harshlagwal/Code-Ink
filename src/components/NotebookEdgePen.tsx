interface NotebookEdgePenProps {
  side?: 'right' | 'left';
  className?: string;
}

export function NotebookEdgePen({ side = 'right', className = '' }: NotebookEdgePenProps) {
  const isRight = side === 'right';

  return (
    <div
      className={`absolute top-3.5 bottom-3.5 ${
        isRight ? 'right-0' : 'left-0'
      } w-3.5 sm:w-4 md:w-4.5 z-20 flex flex-col items-center justify-between rounded-sm shadow-md pointer-events-none select-none ${className}`}
      title="Code Ink Executive Stylus Pen"
    >
      {/* 1. Pointed Conical Pen Tip / Nib (Age se pen ki shape) */}
      <div className="relative w-full h-7 shrink-0 flex flex-col items-center justify-start">
        {/* Ballpoint / Tungsten Carbide Nib Tip */}
        <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-amber-300 shadow-xs z-20 -mb-0.5 shrink-0" />

        {/* Conical Metallic Pen Nib Hood */}
        <div
          className="w-full h-5 bg-gradient-to-r from-stone-400 via-amber-200 to-stone-500 shadow-xs shrink-0"
          style={{
            clipPath: 'polygon(50% 0%, 90% 38%, 100% 100%, 0% 100%, 10% 38%)'
          }}
        />

        {/* Brass / Gold Ring Collar */}
        <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 border-y border-amber-600/60 shrink-0" />
      </div>

      {/* 2. Pen Barrel Body (Ivory Cylindrical Finish with Center CODEINK Engraving) */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-between py-1 bg-gradient-to-r from-[#D8D2C4] via-[#FFFFFF] to-[#C3BCAE] border-x border-stone-400/50 shadow-inner">
        {/* Metallic Pocket Clip at top of barrel */}
        <div className="w-1 sm:w-1.5 h-11 bg-gradient-to-r from-amber-300 via-yellow-50 to-amber-400 rounded-b-sm shadow-xs border-x border-amber-500/50 z-10 shrink-0" />

        {/* Center Vertical Laser-Engraved "CODEINK" Branding */}
        <div className="my-auto py-2 flex flex-col items-center justify-center gap-[1px] font-mono text-[7px] sm:text-[8px] font-black tracking-widest text-stone-700/90 select-none drop-shadow-2xs">
          <span className="leading-none">C</span>
          <span className="leading-none">O</span>
          <span className="leading-none">D</span>
          <span className="leading-none">E</span>
          <span className="leading-none text-[#2457D6] font-extrabold">I</span>
          <span className="leading-none text-[#2457D6] font-extrabold">N</span>
          <span className="leading-none text-[#2457D6] font-extrabold">K</span>
        </div>

        {/* Elastic Leather Pen Loop (Holding the pen against the cover) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${
            isRight ? '-left-1.5 rounded-l-sm border-r-0' : '-right-1.5 rounded-r-sm border-l-0'
          } w-2.5 h-10 bg-[#16191E] border border-stone-700/80 shadow-xs pointer-events-none z-0`}
        />

        {/* Subtle Grip Grooves near base */}
        <div className="w-full flex flex-col gap-1 pb-1 px-0.5 opacity-60">
          <div className="h-[1px] bg-stone-400/70" />
          <div className="h-[1px] bg-stone-400/70" />
        </div>
      </div>

      {/* 3. Base / End-Cap */}
      <div className="relative w-full h-4 shrink-0 flex flex-col items-center justify-end">
        {/* Lower Brass Ring */}
        <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 border-y border-amber-600/60 shrink-0" />
        {/* Rounded Metal End-Cap */}
        <div className="w-full h-3 bg-gradient-to-r from-stone-400 via-amber-200 to-stone-500 rounded-b-sm shadow-xs shrink-0" />
      </div>
    </div>
  );
}
