import React from 'react';
import { HighlightTool, UserHighlight } from '../types/notebook';

interface HighlightedTextProps {
  text: string;
  highlights: UserHighlight[];
  selectedTool: HighlightTool;
  onRemoveHighlight?: (id: string) => void;
  className?: string;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const HighlightedText: React.FC<HighlightedTextProps> = React.memo(function HighlightedText({
  text,
  highlights,
  selectedTool,
  onRemoveHighlight,
  className = ''
}) {
  if (!text) return null;
  if (!highlights || highlights.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Filter out empty or whitespace-only highlights
  const validHighlights = highlights.filter(h => h.text && h.text.trim().length > 0);
  if (validHighlights.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Sort highlights by length descending to match longest phrases first
  const sortedHighlights = [...validHighlights].sort((a, b) => b.text.trim().length - a.text.trim().length);

  // Find all match occurrences
  interface MatchInterval {
    start: number;
    end: number;
    highlight: UserHighlight;
  }

  const allMatches: MatchInterval[] = [];

  for (const hl of sortedHighlights) {
    const trimmed = hl.text.trim();
    if (trimmed.length < 2) continue;

    try {
      const regex = new RegExp(escapeRegExp(trimmed), 'gi');
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          highlight: hl
        });
        if (!regex.global) break;
      }
    } catch {
      // fallback if regex fails
      let idx = 0;
      const lowerText = text.toLowerCase();
      const lowerPattern = trimmed.toLowerCase();
      while ((idx = lowerText.indexOf(lowerPattern, idx)) !== -1) {
        allMatches.push({
          start: idx,
          end: idx + trimmed.length,
          highlight: hl
        });
        idx += trimmed.length;
      }
    }
  }

  if (allMatches.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Sort matches by start position, then by length descending
  allMatches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  // Filter out overlapping matches
  const nonOverlapping: MatchInterval[] = [];
  let lastEnd = -1;

  for (const m of allMatches) {
    if (m.start >= lastEnd) {
      nonOverlapping.push(m);
      lastEnd = m.end;
    }
  }

  // Build the rendered elements
  const elements: React.ReactNode[] = [];
  let cursor = 0;

  for (let i = 0; i < nonOverlapping.length; i++) {
    const { start, end, highlight } = nonOverlapping[i];

    // Leading plain text
    if (start > cursor) {
      elements.push(
        <React.Fragment key={`txt-${cursor}-${start}`}>
          {text.substring(cursor, start)}
        </React.Fragment>
      );
    }

    // Highlighted text segment using stored highlight color
    const segment = text.substring(start, end);
    const color = highlight.color;
    const isEraser = selectedTool === 'eraser';

    const bgMap: Record<string, string> = {
      green: 'rgba(76, 175, 80, 0.30)',
      blue: 'rgba(66, 133, 244, 0.25)',
      yellow: 'rgba(255, 235, 59, 0.40)',
      red: 'rgba(244, 67, 54, 0.25)'
    };

    elements.push(
      <mark
        key={`hl-${highlight.id}-${start}`}
        onClick={(e) => {
          if (isEraser && onRemoveHighlight) {
            e.stopPropagation();
            e.preventDefault();
            onRemoveHighlight(highlight.id);
          }
        }}
        className={`user-highlight-${color} text-inherit font-inherit select-text inline transition-all ${
          isEraser
            ? 'cursor-pointer hover:opacity-60 ring-1 ring-rose-400 ring-offset-1'
            : ''
        }`}
        style={{
          backgroundColor: bgMap[color] || bgMap.yellow
        }}
        title={
          isEraser
            ? 'Click with Eraser to remove this highlight'
            : `${color.toUpperCase()} Highlight`
        }
      >
        {segment}
      </mark>
    );

    cursor = end;
  }

  // Trailing plain text
  if (cursor < text.length) {
    elements.push(
      <React.Fragment key={`txt-end-${cursor}`}>
        {text.substring(cursor)}
      </React.Fragment>
    );
  }

  return <span className={className}>{elements}</span>;
});
