import { useState, useMemo } from 'react';
import { DevTool } from '../../types/tool';

interface ToolLogoProps {
  tool: DevTool;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ToolLogo({ tool, size = 'md', className = '' }: ToolLogoProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs rounded-md',
    md: 'w-10 h-10 text-sm rounded-lg',
    lg: 'w-14 h-14 text-lg rounded-xl',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  // Candidates ordered from highest visual fidelity (official colored SVG) to fallback
  const candidates = useMemo(() => {
    const list: string[] = [];

    // 1. Direct custom logo if specified
    if (tool.logoUrl) {
      list.push(tool.logoUrl);
    }

    // 2. High-speed local official vector SVG from public/logos/
    list.push(`/logos/${tool.id}.svg`);

    // 3. SVGL: Authentic colored vector SVGs for developer tools
    if (tool.simpleIconSlug) {
      list.push(`https://svgl.app/library/${tool.simpleIconSlug}.svg`);
    }

    // 4. Google Favicon v2: 128px high-resolution website icon
    list.push(`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`);

    // 5. SimpleIcons vector CDN with brand color
    if (tool.simpleIconSlug) {
      const hexColor = (tool.brandColor || '#2457D6').replace('#', '');
      list.push(`https://cdn.simpleicons.org/${tool.simpleIconSlug}/${hexColor}`);
    }

    return list;
  }, [tool]);

  const currentSrc = candidateIndex < candidates.length ? candidates[candidateIndex] : null;

  const handleImageError = () => {
    setCandidateIndex((prev) => prev + 1);
  };

  // Initials for fallback monogram
  const initials = tool.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-white border border-[#D9D4C8] shadow-2xs overflow-hidden transition-all duration-200 ${sizeClasses} ${className}`}
    >
      {currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${tool.name} official logo`}
          className={`${iconSizes} object-contain transition-opacity duration-200 select-none`}
          loading="lazy"
          onError={handleImageError}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-mono font-bold text-white tracking-wider text-xs select-none"
          style={{ backgroundColor: tool.brandColor || '#2457D6' }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
