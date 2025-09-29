import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Theme, getDefaultTheme, getThemeById } from '@/lib/themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme 
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to load theme from localStorage
    const savedThemeId = localStorage.getItem('portfolio-theme');
    if (savedThemeId) {
      const savedTheme = getThemeById(savedThemeId);
      if (savedTheme) return savedTheme;
    }
    return defaultTheme || getDefaultTheme();
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('portfolio-theme', newTheme.id);
  };

  const setThemeById = (id: string) => {
    const newTheme = getThemeById(id);
    if (newTheme) {
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    // Remove all theme classes
    const root = document.documentElement;
    root.className = root.className.replace(/theme-\w+/g, '').replace(/\bdark\b/g, '').trim();
    
    // Add the new theme class
    if (theme.className) {
      root.classList.add(theme.className);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
};
