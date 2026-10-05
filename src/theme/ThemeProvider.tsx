import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';
type Resolved = 'light' | 'dark';

const KEY = 'codeink_theme';

interface ThemeCtx {
  choice: ThemeChoice;
  resolved: Resolved;
  setChoice: (c: ThemeChoice) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

function resolve(choice: ThemeChoice): Resolved {
  if (choice !== 'system') return choice;
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => {
    try {
      return (localStorage.getItem(KEY) as ThemeChoice) || 'system';
    } catch {
      return 'system';
    }
  });
  const [resolved, setResolved] = useState<Resolved>(() => resolve(choice));

  const apply = useCallback((c: ThemeChoice) => {
    const r = resolve(c);
    setResolved(r);
    document.documentElement.setAttribute('data-theme', r);
  }, []);

  const setChoice = useCallback(
    (c: ThemeChoice) => {
      setChoiceState(c);
      try {
        localStorage.setItem(KEY, c);
      } catch {
        /* ignore */
      }
      apply(c);
    },
    [apply]
  );

  useEffect(() => {
    apply(choice);
    if (choice !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [choice, apply]);

  return <Ctx.Provider value={{ choice, resolved, setChoice }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useTheme must be used inside <ThemeProvider>');
  return c;
}
