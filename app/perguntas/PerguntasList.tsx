"use client";

import { useMemo, useState } from "react";
import type { PhilosophicalQuestion } from "../lib/types";

export default function PerguntasList({
  questions,
}: {
  questions: PhilosophicalQuestion[];
}) {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const themes = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const q of questions) {
      if (q.theme && !seen.has(q.theme)) {
        seen.add(q.theme);
        ordered.push(q.theme);
      }
    }
    return ordered.sort();
  }, [questions]);

  const filtered = activeTheme
    ? questions.filter((q) => q.theme === activeTheme)
    : questions;

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
          label={`Todas · ${questions.length}`}
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
          const isExpanded = expandedId === idx;
          return (
            <li
              key={idx}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(20, 184, 166, 0.15)",
              }}
            >
              <div
                className="ma-sans"
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#5eead4",
                  marginBottom: "6px",
                }}
              >
                {q.theme}
              </div>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "clamp(16px, 4.4vw, 19px)",
                  lineHeight: 1.35,
                  fontWeight: 700,
                  color: "#f0fdfa",
                  letterSpacing: "-0.01em",
                }}
              >
                {q.question}
              </p>

              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : idx)}
                className="ma-sans ma-press"
                style={{
                  padding: "7px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(20, 184, 166, 0.3)",
                  background: isExpanded
                    ? "rgba(20, 184, 166, 0.15)"
                    : "rgba(20, 184, 166, 0.06)",
                  color: "#5eead4",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "Esconder" : "Ver perspetivas"}
              </button>

              {isExpanded && (
                <div className="ma-reveal" style={{ marginTop: "14px" }}>
                  {q.whyItMatters && (
                    <Block label="Porquê importa">{q.whyItMatters}</Block>
                  )}
                  {q.trapAnswer && (
                    <div style={{ marginTop: "12px" }}>
                      <Label>Armadilha (resposta fácil)</Label>
                      <p
                        style={{
                          margin: 0,
                          padding: "10px 12px",
                          borderRadius: "10px",
                          background: "rgba(239, 68, 68, 0.06)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          color: "#fca5a5",
                          fontSize: "clamp(13px, 3.6vw, 14px)",
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        &ldquo;{q.trapAnswer}&rdquo;
                      </p>
                    </div>
                  )}
                  <div style={{ marginTop: "12px" }}>
                    <Label>Perspetivas</Label>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {q.perspectives.map((p, i) => (
                        <li
                          key={i}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: "rgba(20, 184, 166, 0.05)",
                            border: "1px solid rgba(20, 184, 166, 0.15)",
                          }}
                        >
                          <strong
                            className="ma-sans"
                            style={{
                              color: "#5eead4",
                              fontWeight: 800,
                              fontSize: "clamp(12px, 3.4vw, 13px)",
                              display: "block",
                              marginBottom: "3px",
                            }}
                          >
                            {p.name}
                          </strong>
                          <span
                            style={{
                              color: "#e2e8f0",
                              fontSize: "clamp(13px, 3.6vw, 14px)",
                              lineHeight: 1.5,
                            }}
                          >
                            {p.view}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {q.pushFurther && (
                    <div style={{ marginTop: "12px" }}>
                      <Label>E se também pensares nisto</Label>
                      <p
                        style={{
                          margin: 0,
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "rgba(20, 184, 166, 0.08)",
                          border: "1px solid rgba(20, 184, 166, 0.25)",
                          color: "#99f6e4",
                          fontSize: "clamp(13px, 3.7vw, 15px)",
                          fontStyle: "italic",
                          fontWeight: 600,
                          lineHeight: 1.45,
                        }}
                      >
                        {q.pushFurther}
                      </p>
                    </div>
                  )}
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
          ? "linear-gradient(90deg, rgba(20, 184, 166, 0.3), rgba(8, 145, 178, 0.3))"
          : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${
          active ? "rgba(20, 184, 166, 0.5)" : "rgba(148, 163, 184, 0.2)"
        }`,
        color: active ? "#a7f3d0" : "#cbd5e1",
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="ma-sans"
      style={{
        fontSize: "10px",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#a8a29e",
        marginBottom: "6px",
      }}
    >
      {children}
    </div>
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
      <Label>{label}</Label>
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
