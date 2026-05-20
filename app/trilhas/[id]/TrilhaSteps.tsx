"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Trilha, TrilhaStep } from "../../lib/trilhas-pool";

const KEY_PREFIX = "mente-afinada-trilha::";

type TypeHrefMap = Record<string, string>;
const HREF_MAP: TypeHrefMap = {
  palavra: "/lexico",
  citacao: "/citacoes",
  pergunta: "/perguntas",
  falacia: "/falacias",
  vies: "/vieses",
  escola: "/escolas",
  autor: "/autores",
  etimologia: "/etimologia",
  frase: "/frases-cultas",
  conceito: "/conceitos",
  retorica: "/retorica",
  proverbio: "/proverbios",
  marco: "/marcos",
  mito: "/mitos",
  discurso: "/discursos",
  habito: "/habitos",
  curiosidade: "/curiosidades",
  geografia: "/geografia",
};

const TYPE_LABELS: Record<string, string> = {
  palavra: "Palavra",
  citacao: "Citação",
  pergunta: "Pergunta",
  falacia: "Falácia",
  vies: "Viés",
  escola: "Escola",
  autor: "Autor",
  etimologia: "Etimologia",
  frase: "Frase culta",
  conceito: "Conceito",
  retorica: "Técnica retórica",
  proverbio: "Provérbio",
  marco: "Marco histórico",
  mito: "Mito",
  discurso: "Discurso",
  habito: "Hábito mental",
  curiosidade: "Curiosidade",
  geografia: "Geografia",
};

function readDone(trilhaId: string): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + trilhaId);
    return new Set(raw ? (JSON.parse(raw) as number[]) : []);
  } catch {
    return new Set();
  }
}

function writeDone(trilhaId: string, done: Set<number>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY_PREFIX + trilhaId,
    JSON.stringify(Array.from(done))
  );
}

export default function TrilhaSteps({ trilha }: { trilha: Trilha }) {
  const [done, setDone] = useState<Set<number>>(new Set());

  useEffect(() => {
    setDone(readDone(trilha.id));
  }, [trilha.id]);

  const toggle = (idx: number) => {
    const next = new Set(done);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setDone(next);
    writeDone(trilha.id, next);
  };

  const progress = trilha.steps.length > 0 ? done.size / trilha.steps.length : 0;

  return (
    <div>
      <div
        className="ma-sans"
        style={{
          padding: "14px 16px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(103, 232, 249, 0.08))",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--fg-muted)",
          }}
        >
          <span>Progresso</span>
          <span>
            {done.size} / {trilha.steps.length}
          </span>
        </div>
        <div
          style={{
            height: "6px",
            borderRadius: "3px",
            background: "rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, #34d399, #67e8f9)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

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
        {trilha.steps.map((step: TrilhaStep, i) => {
          const isDone = done.has(i);
          const href = HREF_MAP[step.type] ?? "/aprender";
          const label = TYPE_LABELS[step.type] ?? step.type;
          return (
            <li
              key={i}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: isDone
                  ? "rgba(52, 211, 153, 0.08)"
                  : "var(--card-bg)",
                border: `1px solid ${
                  isDone ? "rgba(52, 211, 153, 0.35)" : "var(--card-border)"
                }`,
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={isDone ? "Marcar por fazer" : "Marcar como feito"}
                style={{
                  flex: "0 0 auto",
                  width: "28px",
                  height: "28px",
                  borderRadius: "999px",
                  background: isDone ? "#34d399" : "rgba(148, 163, 184, 0.1)",
                  border: `2px solid ${
                    isDone ? "#34d399" : "rgba(148, 163, 184, 0.35)"
                  }`,
                  color: isDone ? "#fff" : "var(--fg-muted)",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: "14px",
                  lineHeight: 1,
                }}
              >
                {isDone ? "✓" : i + 1}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="ma-sans"
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-muted)",
                    marginBottom: "2px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "clamp(14px, 4vw, 16px)",
                    fontWeight: 700,
                    color: "var(--fg)",
                    textTransform: "capitalize",
                  }}
                >
                  {step.id.replace(/-/g, " ")}
                </div>
              </div>
              <Link
                href={href}
                className="ma-sans ma-press"
                style={{
                  flex: "0 0 auto",
                  padding: "6px 12px",
                  borderRadius: "10px",
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "1px solid rgba(52, 211, 153, 0.4)",
                  color: "#86efac",
                  fontSize: "12px",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Ver →
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
