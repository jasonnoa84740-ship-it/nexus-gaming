"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "classic" | "neon" | "cyberpunk" | "elite";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "nx_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("neon");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used within ThemeProvider");
  return v;
}