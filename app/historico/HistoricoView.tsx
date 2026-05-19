"use client";

import { useEffect, useState } from "react";
import { listHistory } from "../lib/historico";
import type { DailyPayload } from "../lib/types";

function formatDate(dateKey: string): string {
  try {
    const d = new Date(dateKey + "T00:00:00");
    return d.toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateKey;
  }
}

export default function HistoricoView() {
  const [days, setDays] = useState<DailyPayload[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setDays(listHistory());
  }, []);

  if (days.length === 0) {
    return (
      <div
        className="ma-sans"
        style={{
          padding: "40px 24px",
          borderRadius: "20px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          textAlign: "center",
          color: "var(--fg-muted)",
          lineHeight: 1.5,
        }}
      >
        Ainda não tens histórico.
        <br />
        Os dias anteriores aparecem aqui à medida que abres a app.
      </div>
    );
  }

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {days.map((d) => {
        const isExpanded = expanded === d.dateKey;
        return (
          <li
            key={d.dateKey}
            style={{
              borderRadius: "16px",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(isExpanded ? null : d.dateKey)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <div
                className="ma-sans"
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--fg-muted)",
                  marginBottom: "4px",
                }}
              >
                {formatDate(d.dateKey)}
              </div>
              <div
                style={{
                  fontSize: "clamp(14px, 4vw, 16px)",
                  color: "var(--fg)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                <strong>{d.word?.word}</strong> ·{" "}
                <em>{d.challenge?.concept}</em>
              </div>
            </button>
            {isExpanded && (
              <div
                className="ma-reveal"
                style={{
                  padding: "0 16px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {d.word && (
                  <Mini label="📖 Palavra" title={d.word.word}>
                    {d.word.formalDefinition}
                  </Mini>
                )}
                {d.challenge && (
                  <Mini label="🧠 Desafio" title={d.challenge.concept}>
                    {d.challenge.preciseAnswer}
                  </Mini>
                )}
                {d.quote && (
                  <Mini
                    label="📚 Citação"
                    title={`${d.quote.author} · ${d.quote.book}`}
                  >
                    &ldquo;{d.quote.text}&rdquo;
                  </Mini>
                )}
                {d.question && (
                  <Mini label="🤔 Pergunta" title={d.question.theme}>
                    {d.question.question}
                  </Mini>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Mini({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: "10px",
        background: "rgba(148, 163, 184, 0.06)",
        border: "1px solid rgba(148, 163, 184, 0.15)",
      }}
    >
      <div
        className="ma-sans"
        style={{
          fontSize: "10px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
          marginBottom: "4px",
        }}
      >
        {label} · {title}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(12px, 3.4vw, 13px)",
          color: "var(--fg)",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        {children}
      </p>
    </div>
  );
}
