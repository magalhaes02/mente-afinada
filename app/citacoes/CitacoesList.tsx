"use client";

import { useMemo, useState } from "react";
import type { Quote } from "../lib/types";

export default function CitacoesList({ quotes }: { quotes: Quote[] }) {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const themes = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const q of quotes) {
      if (q.theme && !seen.has(q.theme)) {
        seen.add(q.theme);
        ordered.push(q.theme);
      }
    }
    return ordered.sort();
  }, [quotes]);

  const filtered = activeTheme
    ? quotes.filter((q) => q.theme === activeTheme)
    : quotes;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <ThemeChip
          active={activeTheme === null}
          onClick={() => setActiveTheme(null)}
          label={`Todas · ${quotes.length}`}
        />
        {themes.map((t) => (
          <ThemeChip
            key={t}
            active={activeTheme === t}
            onClick={() => setActiveTheme(t)}
            label={t}
          />
        ))}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {filtered.map((q, idx) => {
          const id = `${q.book}-${idx}`;
          const isExpanded = expandedId === id;
          return (
            <li
              key={id}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(96, 165, 250, 0.15)",
              }}
            >
              <blockquote
                style={{
                  margin: "0 0 10px 0",
                  padding: "0 0 0 12px",
                  borderLeft: "3px solid rgba(96, 165, 250, 0.4)",
                  fontSize: "clamp(16px, 4.5vw, 19px)",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  color: "#f1f5f9",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <p
                className="ma-sans"
                style={{
                  margin: 0,
                  fontSize: "clamp(12px, 3.4vw, 13px)",
                  color: "#bfdbfe",
                  fontWeight: 600,
                }}
              >
                — <strong>{q.author}</strong>, <em>{q.book}</em>
                {q.year ? ` (${q.year})` : ""}
              </p>

              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : id)}
                className="ma-sans ma-press"
                style={{
                  marginTop: "12px",
                  padding: "7px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  background: isExpanded
                    ? "rgba(96, 165, 250, 0.15)"
                    : "rgba(96, 165, 250, 0.06)",
                  color: "#bfdbfe",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "Esconder" : "Significado e contexto"}
              </button>

              {isExpanded && (
                <div className="ma-reveal" style={{ marginTop: "14px" }}>
                  {q.meaning && (
                    <Block label="O que significa">{q.meaning}</Block>
                  )}
                  {q.context && <Block label="Contexto">{q.context}</Block>}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ThemeChip({
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
        padding: "6px 12px",
        borderRadius: "999px",
        background: active
          ? "linear-gradient(90deg, rgba(96, 165, 250, 0.3), rgba(168, 85, 247, 0.3))"
          : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${
          active ? "rgba(96, 165, 250, 0.5)" : "rgba(148, 163, 184, 0.2)"
        }`,
        color: active ? "#dbeafe" : "#cbd5e1",
        fontWeight: 700,
        fontSize: "13px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "10px" }}>
      <div
        className="ma-sans"
        style={{
          fontSize: "10px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#a8a29e",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "#e2e8f0",
          lineHeight: 1.55,
          fontWeight: 500,
        }}
      >
        {children}
      </p>
    </section>
  );
}
