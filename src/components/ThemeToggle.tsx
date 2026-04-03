import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface ThemeToggleProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export function ThemeToggle({ isDark: propIsDark, toggleTheme: propToggleTheme }: ThemeToggleProps) {
  // If props are provided, use them (controlled)
  // Otherwise, use local state but synchronized with localStorage (uncontrolled fallback)
  const [localIsDark, setLocalIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const isDark = propIsDark !== undefined ? propIsDark : localIsDark;

  const handleToggle = () => {
    if (propToggleTheme) {
      propToggleTheme();
    } else {
      const next = !isDark;
      setLocalIsDark(next);
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
