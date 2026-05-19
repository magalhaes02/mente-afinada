"use client";

const PREFS_KEY = "mente-afinada-preferencias";

export type Theme = "escuro" | "claro" | "papel";
export type FontSize = "pequena" | "normal" | "grande" | "muito-grande";

export type Preferencias = {
  theme: Theme;
  fontSize: FontSize;
};

const DEFAULTS: Preferencias = {
  theme: "escuro",
  fontSize: "normal",
};

export function readPreferences(): Preferencias {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Preferencias>;
    return {
      theme: (parsed.theme as Theme) || DEFAULTS.theme,
      fontSize: (parsed.fontSize as FontSize) || DEFAULTS.fontSize,
    };
  } catch {
    return DEFAULTS;
  }
}

export function writePreferences(prefs: Partial<Preferencias>) {
  if (typeof window === "undefined") return;
  const current = readPreferences();
  const next = { ...current, ...prefs };
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  applyToDocument(next);
  window.dispatchEvent(new CustomEvent("mente-afinada-prefs-changed"));
}

export function applyToDocument(prefs: Preferencias) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", prefs.theme);
  document.documentElement.setAttribute("data-font", prefs.fontSize);
}
