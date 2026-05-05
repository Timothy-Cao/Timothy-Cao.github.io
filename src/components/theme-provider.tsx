"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export interface Theme {
  name: string;
  label: string;
  accent: string;
  accentGlow: string;
  accentDim: string;
}

export const themes: Theme[] = [
  { name: "crimson", label: "Crimson", accent: "#ff1744", accentGlow: "rgba(255, 23, 68, 0.15)", accentDim: "rgba(255, 23, 68, 0.6)" },
  { name: "limitless", label: "Limitless", accent: "#00e5ff", accentGlow: "rgba(0, 229, 255, 0.15)", accentDim: "rgba(0, 229, 255, 0.6)" },
  { name: "matrix", label: "Matrix", accent: "#00ff41", accentGlow: "rgba(0, 255, 65, 0.15)", accentDim: "rgba(0, 255, 65, 0.6)" },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "themechange";
let memoryThemeName = themes[0].name;

function getThemeByName(name: string | null) {
  return themes.find((t) => t.name === name) ?? themes[0];
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-accent-glow", theme.accentGlow);
  root.style.setProperty("--color-accent-dim", theme.accentDim);
}

function getStoredTheme() {
  if (typeof window === "undefined") return themes[0];

  try {
    const storedName = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedName) memoryThemeName = storedName;
    return getThemeByName(storedName ?? memoryThemeName);
  } catch {
    return getThemeByName(memoryThemeName);
  }
}

function subscribeToThemeChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToThemeChanges, getStoredTheme, () => themes[0]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (name: string) => {
    const found = themes.find((t) => t.name === name);
    if (found) {
      memoryThemeName = name;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, name);
      } catch {
        // Keep the in-memory visual theme usable if storage is unavailable.
      }
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
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
