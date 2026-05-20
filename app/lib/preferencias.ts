"use client";

const PREFS_KEY = "mente-afinada-preferencias";

export type Theme = "auto" | "escuro" | "claro" | "papel" | "alto-contraste";
export type FontSize = "pequena" | "normal" | "grande" | "muito-grande";
export type FontFamily = "default" | "dyslexic";
export type Dificuldade = "basico" | "intermedio" | "avancado";

export type Preferencias = {
  theme: Theme;
  fontSize: FontSize;
  fontFamily: FontFamily;
  reduceMotion: boolean;
  dificuldade: Dificuldade;
};

const DEFAULTS: Preferencias = {
  theme: "escuro",
  fontSize: "normal",
  fontFamily: "default",
  reduceMotion: false,
  dificuldade: "intermedio",
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
      fontFamily: (parsed.fontFamily as FontFamily) || DEFAULTS.fontFamily,
      reduceMotion:
        typeof parsed.reduceMotion === "boolean"
          ? parsed.reduceMotion
          : DEFAULTS.reduceMotion,
      dificuldade:
        (parsed.dificuldade as Dificuldade) || DEFAULTS.dificuldade,
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

function resolveTheme(theme: Theme): string {
  if (theme !== "auto") return theme;
  if (typeof window === "undefined") return "escuro";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "claro"
    : "escuro";
}

export function applyToDocument(prefs: Preferencias) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolveTheme(prefs.theme));
  document.documentElement.setAttribute("data-font", prefs.fontSize);
  document.documentElement.setAttribute("data-font-family", prefs.fontFamily);
  document.documentElement.setAttribute(
    "data-reduce-motion",
    prefs.reduceMotion ? "true" : "false"
  );
}
