import React, { createContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setThemeManual: (t: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setThemeManual: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
        document.documentElement.classList.toggle('dark', saved === 'dark');
      } else {
        // fallback: prefer system if no saved
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        setTheme(initial);
        document.documentElement.classList.toggle('dark', initial === 'dark');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const setThemeManual = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem('theme', t);
    } catch (e) {}
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeManual }}>
      {children}
    </ThemeContext.Provider>
  );
};
