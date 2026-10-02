import { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { NotebookEdgePen } from './NotebookEdgePen';

interface NotebookCoverProps {
  onOpen: () => void;
  isOpening?: boolean;
}

export function NotebookCover({ onOpen, isOpening = false }: NotebookCoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* Editorial Minimal Hero Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2457D6]/10 text-[#2457D6] text-xs font-mono mb-3 tracking-wider uppercase">
          <span>Digital Engineering Edition</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src="/codeink-logo.webp"
            alt="Code Ink"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain shadow-xs border border-[#D9D4C8] bg-white p-1"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171717] font-sans">
            CODE<span className="text-[#2457D6]">INK</span>
          </h1>
        </div>
        <p className="mt-2 text-xl sm:text-2xl font-serif italic text-stone-700">
          Your Programming Notebook
        </p>

        <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Learn Computer Science one page at a time. Crafted like a physical engineering notebook with digital superpowers.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpen}
            disabled={isOpening}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#171717] text-[#FFFDF7] font-medium text-sm sm:text-base shadow-sm hover:bg-stone-800 transition-all hover:shadow-md active:scale-98"
          >
            <BookOpen className="w-4 h-4 text-[#FFF09A] transition-transform group-hover:rotate-6" />
            <span>{isOpening ? 'Opening Book...' : 'Open Notebook'}</span>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Center Visual: The Physical Hardcover Notebook with 3D Opening Animation */}
      <div
        className="relative perspective-book cursor-pointer group select-none mt-2"
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {/* Soft shadow below notebook */}
        <div
          className={`absolute -inset-4 bg-stone-900/15 rounded-2xl blur-xl transition-all duration-700 ${
            isOpening
              ? 'scale-125 opacity-70'
              : isHovered
              ? 'scale-105 opacity-80'
              : 'opacity-50'
          }`}
        />

        {/* Outer Assembly: Transitions from closed book to open spread (fluid on mobile, full spread on desktop) */}
        <div
          className={`relative h-[480px] sm:h-[540px] rounded-xl transition-all duration-1000 transform-style-3d ${
            isOpening
              ? 'w-[calc(100vw-2rem)] max-w-[340px] sm:w-[540px] sm:max-w-none md:w-[860px]'
              : isHovered
              ? 'w-[290px] sm:w-[380px] md:w-[420px] -translate-y-2'
              : 'w-[290px] sm:w-[380px] md:w-[420px]'
          }`}
        >
          {/* UNDERNEATH OPEN SPREAD (Revealed as front cover opens) */}
          <div
            className={`absolute inset-0 bg-[#FFFDF7] rounded-xl flex overflow-hidden border border-[#D9D4C8] shadow-2xl transition-opacity duration-500 ${
              isOpening ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Left Page (Endpaper / Index) */}
            <div className="w-1/2 p-3 sm:p-6 md:p-8 notebook-ruled flex flex-col justify-between border-r border-[#D9D4C8]">
              <div>
                <div className="font-mono text-xs text-[#2457D6] uppercase tracking-wider mb-2">
                  CODEINK · VOLUME 01
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-sans">
                  Table of Contents
                </h3>
                <div className="h-0.5 w-12 bg-[#2457D6] mt-1 mb-4" />
                <div className="space-y-2 text-xs font-mono text-stone-600">
                  <div className="flex justify-between"><span>01 Foundations & Compilation</span><span>Pg 02</span></div>
                  <div className="flex justify-between"><span>02 Variables & Memory</span><span>Pg 04</span></div>
                  <div className="flex justify-between"><span>03 Control Flow & Loops</span><span>Pg 06</span></div>
                  <div className="flex justify-between"><span>04 Functions & Stack</span><span>Pg 08</span></div>
                  <div className="flex justify-between"><span>05 Pointers & Addresses</span><span>Pg 10</span></div>
                </div>
              </div>
              <div className="font-handwritten text-stone-400 text-xs text-right">
                left spread
              </div>
            </div>

            {/* Center Spine Crease */}
            <div className="w-3 spine-center-groove shrink-0" />

            {/* Right Page (Chapter 1) */}
            <div className="w-1/2 p-3 sm:p-6 md:p-8 notebook-ruled flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#2457D6] uppercase tracking-wider mb-2">
                  CHAPTER 01 · FOUNDATIONS
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-sans">
                  The Compilation Pipeline
                </h3>
                <div className="h-0.5 w-12 bg-[#2457D6] mt-1 mb-4" />
                <p className="text-xs text-stone-700 font-serif italic mb-3">
                  "Source code (.c) translates through preprocessor, compiler, assembler and linker..."
                </p>
                <div className="p-2.5 bg-stone-900 rounded font-mono text-[11px] text-stone-200">
                  gcc -Wall -Wextra main.c -o a.out
                </div>
              </div>
              <div className="font-handwritten text-stone-400 text-xs text-right">
                Page 03
              </div>
            </div>
          </div>

          {/* FRONT COVER (Flips open leftwards on click) */}
          <div
            className={`absolute inset-0 rounded-r-2xl rounded-l-md border-2 border-stone-800/80 bg-linear-to-tr from-[#16191E] via-[#1F252E] to-[#29303B] overflow-hidden transform-style-3d shadow-notebook-cover ${
              isOpening
                ? 'transition-transform duration-1000 origin-left -rotate-y-180 opacity-0'
                : isHovered
                ? 'rotate-y-6'
                : 'rotate-y-0'
            }`}
          >
            {/* Cloth micro-texture pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#FFF 0.75px, transparent 0.75px)`,
                backgroundSize: '12px 12px'
              }}
            />

            {/* Notebook Spine (left edge binding) */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-linear-to-r from-stone-950 via-[#12151A] to-stone-900/80 border-r border-stone-800/80 flex flex-col justify-between py-8 items-center">
              <div className="w-1.5 h-12 bg-stone-700/60 rounded-full" />
              <div className="w-1.5 h-12 bg-stone-700/60 rounded-full" />
              <div className="w-1.5 h-12 bg-stone-700/60 rounded-full" />
            </div>

            {/* Code Ink Stylus Pen (slotted on right edge) */}
            <NotebookEdgePen side="right" />

            {/* Ribbon Bookmark sticking out at bottom */}
            <div className="absolute -bottom-6 left-28 sm:left-36 w-5 h-10 bg-[#2457D6] shadow-md transform -skew-x-6 z-20 flex flex-col justify-end">
              <div
                className="w-full h-3 bg-transparent"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backgroundColor: '#F7F3EA'
                }}
              />
            </div>

            {/* Embossed Cover Content */}
            <div className="relative h-full flex flex-col justify-between p-8 sm:p-12 pl-14 sm:pl-18">
              {/* Top Header Badge */}
              <div className="flex items-center justify-between text-stone-400">
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  VOL. 01 · SYSTEM ED.
                </span>
                <span className="font-handwritten text-xs text-[#FFF09A]">
                  est. 2026
                </span>
              </div>

              {/* Center Embossed Title Lockup with Foil Logo */}
              <div className="my-auto text-center border-y border-stone-700/50 py-6">
                <img
                  src="/codeink-logo.webp"
                  alt="Code Ink Seal"
                  className="w-14 h-14 mx-auto mb-3 object-contain drop-shadow-md rounded-xl p-1 bg-white/10 border border-white/15"
                />
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans drop-shadow-sm">
                  CODE<span className="text-blue-400">INK</span>
                </h2>

                <p className="font-serif italic text-stone-300 text-sm sm:text-base mt-1">
                  Your Programming Notebook
                </p>

                <div className="mt-4 pt-4 border-t border-stone-700/40 flex items-center justify-center gap-3 text-stone-400 font-mono text-[11px] tracking-widest uppercase">
                  <span>CS</span>
                  <span>•</span>
                  <span>CODE</span>
                  <span>•</span>
                  <span>NOTES</span>
                </div>
              </div>

              {/* Author Signature Block (Professional Author Edition) */}
              <div className="flex flex-col items-center justify-center -mt-2 mb-1 select-none">
                <span className="font-mono text-[8px] uppercase tracking-widest text-stone-500">
                  Author Edition · Curated By
                </span>
                <span
                  className="text-xl sm:text-2xl text-amber-200/90 font-normal tracking-wide transform -rotate-2 select-none drop-shadow-xs"
                  style={{ fontFamily: "'Alex Brush', cursive" }}
                >
                  Harsh Lagwal
                </span>
              </div>

              {/* Bottom Cover Metadata */}
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                  C · PY · DSA · OS
                </span>
                <span className="font-handwritten text-sm text-stone-300 group-hover:text-[#FFF09A] transition-colors">
                  {isOpening ? 'Opening pages...' : 'Click to open ↗'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Click Hint */}
        <p className="text-center font-handwritten text-stone-500 text-sm mt-5">
          {isOpening ? 'Physically opening your notebook...' : 'Tap the cover or button above to unfold pages'}
        </p>
      </div>
    </div>
  );
}
