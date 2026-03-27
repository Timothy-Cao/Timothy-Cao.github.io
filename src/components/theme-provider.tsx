"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Theme {
  name: string;
  label: string;
  accent: string;
  accentGlow: string;
  accentDim: string;
}

export const themes: Theme[] = [
  { name: "cyber-cyan", label: "Cyber Cyan", accent: "#00e5ff", accentGlow: "rgba(0, 229, 255, 0.15)", accentDim: "rgba(0, 229, 255, 0.6)" },
  { name: "matrix-green", label: "Matrix Green", accent: "#00ff41", accentGlow: "rgba(0, 255, 65, 0.15)", accentDim: "rgba(0, 255, 65, 0.6)" },
  { name: "deep-red", label: "Deep Red", accent: "#ff1744", accentGlow: "rgba(255, 23, 68, 0.15)", accentDim: "rgba(255, 23, 68, 0.6)" },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-accent-glow", theme.accentGlow);
  root.style.setProperty("--color-accent-dim", theme.accentDim);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(themes[0]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const found = themes.find((t) => t.name === saved);
    if (found) {
      setThemeState(found);
      applyTheme(found);
    }
  }, []);

  const setTheme = (name: string) => {
    const found = themes.find((t) => t.name === name);
    if (found) {
      setThemeState(found);
      applyTheme(found);
      localStorage.setItem("theme", name);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
