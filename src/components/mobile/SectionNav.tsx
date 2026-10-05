import React, { useEffect, useState } from 'react';
import { BookOpen, Code2, Target, AlertTriangle, PenLine } from 'lucide-react';
import { notebookAudio } from '../../utils/audioEffects';

export type DiarySectionId = 'concept' | 'code' | 'practice' | 'viva' | 'notes';

interface SectionItem {
  id: DiarySectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: SectionItem[] = [
  { id: 'concept', label: 'Concept', icon: BookOpen },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'practice', label: 'Practice', icon: Target },
  { id: 'viva', label: 'Viva & Traps', icon: AlertTriangle },
  { id: 'notes', label: 'My Notes', icon: PenLine },
];

interface SectionNavProps {
  activeSection?: DiarySectionId;
  onSectionClick?: (sectionId: DiarySectionId) => void;
  hasCode?: boolean;
  hasPractice?: boolean;
  hasViva?: boolean;
}

/**
 * Sticky scroll-spy chips for Mobile Diary Mode
 * Reference: PRD Section 7.2 & 7.4
 * Sits directly beneath the sticky header, highlights active section on scroll,
 * and allows smooth tap-to-jump.
 */
export const SectionNav: React.FC<SectionNavProps> = ({
  activeSection: controlledActiveSection,
  onSectionClick,
  hasCode = true,
  hasPractice = true,
  hasViva = true,
}) => {
  const [currentSection, setCurrentSection] = useState<DiarySectionId>('concept');

  const activeId = controlledActiveSection || currentSection;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const topVisible = visible[0];
          const secId = topVisible.target.id.replace('section-', '') as DiarySectionId;
          setCurrentSection(secId);
        }
      },
      {
        threshold: [0.1, 0.3],
        rootMargin: '-40px 0px -50% 0px',
      }
    );

    SECTIONS.forEach(s => {
      const el = document.getElementById(`section-${s.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChipClick = (id: DiarySectionId) => {
    try {
      notebookAudio.playPencil();
    } catch {}

    if (onSectionClick) {
      onSectionClick(id);
    }

    const targetEl = document.getElementById(`section-${id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const visibleSections = SECTIONS.filter(sec => {
    if (sec.id === 'code' && !hasCode) return false;
    if (sec.id === 'practice' && !hasPractice) return false;
    if (sec.id === 'viva' && !hasViva) return false;
    return true;
  });

  return (
    <nav
      aria-label="Topic section shortcuts"
      className="sticky top-14 z-30 w-full bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#D9D4C8] shadow-xs px-2.5 py-1.5 overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center gap-1.5 min-w-max mx-auto max-w-2xl">
        {visibleSections.map(sec => {
          const Icon = sec.icon;
          const isActive = activeId === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleChipClick(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-all cursor-pointer select-none min-h-[38px] ${
                isActive
                  ? 'bg-[#2457D6] text-white shadow-xs font-semibold'
                  : 'bg-[#F4EFE6]/80 text-stone-600 hover:text-stone-900 hover:bg-[#EAE2D2] border border-[#D9D4C8]/70'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
