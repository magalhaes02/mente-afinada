"use client";

import { useEffect, useState } from "react";
import {
  readPreferences,
  writePreferences,
  type Dificuldade,
  type FontFamily,
  type FontSize,
  type Theme,
} from "../lib/preferencias";

const THEME_OPTIONS: {
  value: Theme;
  label: string;
  emoji: string;
  description: string;
}[] = [
  { value: "auto", label: "Auto", emoji: "🌗", description: "Segue a preferência do sistema." },
  { value: "escuro", label: "Escuro", emoji: "🌙", description: "Fundo preto, fontes claras." },
  { value: "claro", label: "Claro", emoji: "☀️", description: "Fundo claro, fontes escuras." },
  { value: "papel", label: "Papel", emoji: "📜", description: "Pergaminho. Para leitura demorada." },
  { value: "alto-contraste", label: "Alto contraste", emoji: "⚫", description: "Preto puro + branco." },
];

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: "pequena", label: "Pequena" },
  { value: "normal", label: "Normal" },
  { value: "grande", label: "Grande" },
  { value: "muito-grande", label: "Muito grande" },
];

const FONT_FAMILY_OPTIONS: {
  value: FontFamily;
  label: string;
  description: string;
}[] = [
  { value: "default", label: "Padrão", description: "Tipografia editorial." },
  {
    value: "dyslexic",
    label: "Para dislexia",
    description: "Espaçamento amplo.",
  },
];

const DIFICULDADE_OPTIONS: {
  value: Dificuldade;
  label: string;
  description: string;
}[] = [
  {
    value: "basico",
    label: "Básico",
    description: "Palavras comuns, conceitos acessíveis.",
  },
  {
    value: "intermedio",
    label: "Intermédio",
    description: "Padrão. Equilibrado.",
  },
  {
    value: "avancado",
    label: "Avançado",
    description: "Vocabulário raro, conceitos densos.",
  },
];

export default function DefinicoesView() {
  const [theme, setTheme] = useState<Theme>("escuro");
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [fontFamily, setFontFamily] = useState<FontFamily>("default");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("intermedio");

  useEffect(() => {
    const p = readPreferences();
    setTheme(p.theme);
    setFontSize(p.fontSize);
    setFontFamily(p.fontFamily);
    setReduceMotion(p.reduceMotion);
    setDificuldade(p.dificuldade);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <Section title="🎨 Tema">
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
          }}
        >
          {THEME_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={theme === opt.value}
              onClick={() => {
                setTheme(opt.value);
                writePreferences({ theme: opt.value });
              }}
              emoji={opt.emoji}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
      </Section>

      <Section title="🔤 Tamanho da letra">
        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
          }}
        >
          {FONT_SIZE_OPTIONS.map((opt) => (
            <SmallOption
              key={opt.value}
              active={fontSize === opt.value}
              label={opt.label}
              onClick={() => {
                setFontSize(opt.value);
                writePreferences({ fontSize: opt.value });
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="📖 Tipo de letra">
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
          }}
        >
          {FONT_FAMILY_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={fontFamily === opt.value}
              onClick={() => {
                setFontFamily(opt.value);
                writePreferences({ fontFamily: opt.value });
              }}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
      </Section>

      <Section title="♿ Acessibilidade">
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={() => {
            const next = !reduceMotion;
            setReduceMotion(next);
            writePreferences({ reduceMotion: next });
          }}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            background: reduceMotion
              ? "rgba(245, 158, 11, 0.15)"
              : "var(--card-bg)",
            border: `1px solid ${
              reduceMotion
                ? "rgba(245, 158, 11, 0.55)"
                : "var(--card-border)"
            }`,
            color: "var(--fg)",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "3px" }}>
              🎬 Reduzir animações
            </div>
            <div style={{ fontSize: "12px", color: "var(--fg-muted)" }}>
              Para quem é sensível ao movimento.
            </div>
          </div>
          <span style={{ fontSize: "20px" }}>{reduceMotion ? "✓" : "○"}</span>
        </button>
      </Section>

      <Section title="🎚️ Dificuldade do conteúdo">
        <p
          className="ma-sans"
          style={{
            margin: "0 0 12px 0",
            fontSize: "12px",
            color: "var(--fg-muted)",
            fontStyle: "italic",
          }}
        >
          Afeta o conteúdo gerado por IA todos os dias.
        </p>
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
          }}
        >
          {DIFICULDADE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={dificuldade === opt.value}
              onClick={() => {
                setDificuldade(opt.value);
                writePreferences({ dificuldade: opt.value });
              }}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
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
          Conteúdo curado à mão e gerado por IA. Os teus favoritos, notas,
          streak e preferências ficam apenas no teu dispositivo.
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

function OptionCard({
  active,
  onClick,
  emoji,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  emoji?: string;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "16px",
        borderRadius: "14px",
        background: active ? "rgba(245, 158, 11, 0.15)" : "var(--card-bg)",
        border: `1px solid ${
          active ? "rgba(245, 158, 11, 0.55)" : "var(--card-border)"
        }`,
        color: "var(--fg)",
        cursor: "pointer",
      }}
    >
      {emoji && (
        <div style={{ fontSize: "24px", marginBottom: "6px", lineHeight: 1 }}>
          {emoji}
        </div>
      )}
      <div style={{ fontSize: "15px", fontWeight: 800, marginBottom: "4px" }}>
        {label} {active && "✓"}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "var(--fg-muted)",
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>
    </button>
  );
}

function SmallOption({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={onClick}
      style={{
        padding: "12px 14px",
        borderRadius: "12px",
        background: active ? "rgba(245, 158, 11, 0.15)" : "var(--card-bg)",
        border: `1px solid ${
          active ? "rgba(245, 158, 11, 0.55)" : "var(--card-border)"
        }`,
        color: "var(--fg)",
        fontWeight: 800,
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {label} {active && "✓"}
    </button>
  );
}
