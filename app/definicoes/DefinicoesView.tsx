"use client";

import { useEffect, useState } from "react";
import {
  readPreferences,
  writePreferences,
  type FontSize,
  type Theme,
} from "../lib/preferencias";

const THEME_OPTIONS: { value: Theme; label: string; emoji: string; description: string }[] = [
  {
    value: "escuro",
    label: "Escuro",
    emoji: "🌙",
    description: "Fundo preto, fontes claras. Bom para leitura à noite.",
  },
  {
    value: "claro",
    label: "Claro",
    emoji: "☀️",
    description: "Fundo claro, fontes escuras. Bom para luz forte.",
  },
  {
    value: "papel",
    label: "Papel",
    emoji: "📜",
    description:
      "Tons de pergaminho, tipografia serifada. Para leitura demorada.",
  },
];

const FONT_OPTIONS: { value: FontSize; label: string }[] = [
  { value: "pequena", label: "Pequena" },
  { value: "normal", label: "Normal" },
  { value: "grande", label: "Grande" },
  { value: "muito-grande", label: "Muito grande" },
];

export default function DefinicoesView() {
  const [theme, setTheme] = useState<Theme>("escuro");
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  useEffect(() => {
    const prefs = readPreferences();
    setTheme(prefs.theme);
    setFontSize(prefs.fontSize);
  }, []);

  const handleTheme = (t: Theme) => {
    setTheme(t);
    writePreferences({ theme: t });
  };

  const handleFont = (f: FontSize) => {
    setFontSize(f);
    writePreferences({ fontSize: f });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <Section title="🎨 Tema">
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
          }}
        >
          {THEME_OPTIONS.map((opt) => {
            const active = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className="ma-sans ma-press"
                onClick={() => handleTheme(opt.value)}
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderRadius: "14px",
                  background: active
                    ? "rgba(245, 158, 11, 0.15)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    active
                      ? "rgba(245, 158, 11, 0.55)"
                      : "var(--card-border)"
                  }`,
                  color: "var(--fg)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "6px",
                    lineHeight: 1,
                  }}
                >
                  {opt.emoji}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    marginBottom: "4px",
                  }}
                >
                  {opt.label} {active && "✓"}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--fg-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {opt.description}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="🔤 Tamanho da letra">
        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
          }}
        >
          {FONT_OPTIONS.map((opt) => {
            const active = fontSize === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className="ma-sans ma-press"
                onClick={() => handleFont(opt.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: active
                    ? "rgba(245, 158, 11, 0.15)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    active
                      ? "rgba(245, 158, 11, 0.55)"
                      : "var(--card-border)"
                  }`,
                  color: "var(--fg)",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {opt.label} {active && "✓"}
              </button>
            );
          })}
        </div>
        <p
          className="ma-sans"
          style={{
            margin: "10px 0 0 0",
            fontSize: "12px",
            color: "var(--fg-muted)",
            fontStyle: "italic",
          }}
        >
          A mudança aplica-se em toda a app imediatamente.
        </p>
      </Section>

      <Section title="ℹ️ Sobre">
        <div
          className="ma-sans"
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "var(--fg)" }}>Mente Afinada</strong> — pensar
          melhor, dizer melhor.
          <br />
          <br />
          Conteúdo curado à mão e gerado por IA. Os teus favoritos, streak e
          preferências ficam apenas no teu dispositivo.
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="ma-sans"
        style={{
          margin: "0 0 12px 0",
          fontSize: "13px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
