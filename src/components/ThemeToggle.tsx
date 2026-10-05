import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type ThemeChoice } from '../theme/ThemeProvider';
import { notebookAudio } from '../utils/audioEffects';

interface ThemeToggleProps {
  compact?: boolean;
}

const OPTIONS: { id: ThemeChoice; icon: typeof Sun; label: string; tooltip: string }[] = [
  { id: 'light', icon: Sun, label: 'Light', tooltip: 'Light Paper Mode' },
  { id: 'dark', icon: Moon, label: 'Dark', tooltip: 'Warm Night Reading Mode' },
  { id: 'system', icon: Monitor, label: 'System', tooltip: 'Follow System / OS Theme' },
];

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { choice, setChoice } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme selector"
      className="flex items-center bg-raised p-0.5 rounded-lg border border-line text-xs shrink-0"
    >
      {OPTIONS.map(({ id, icon: Icon, label, tooltip }) => {
        const isSelected = choice === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            title={tooltip}
            onClick={() => {
              setChoice(id);
              notebookAudio.playPencil();
            }}
            className={`p-1.5 rounded transition-all cursor-pointer flex items-center justify-center ${
              isSelected
                ? 'bg-page text-accent shadow-xs font-semibold'
                : 'text-muted hover:text-ink'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {!compact && <span className="sr-only">{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
