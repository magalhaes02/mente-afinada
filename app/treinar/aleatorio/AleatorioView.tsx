"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WORD_POOL } from "../../lib/lexico-pool";
import { QUOTE_POOL } from "../../lib/citacoes-pool";
import { CONCEITOS_POOL } from "../../lib/conceitos-pool";
import { FALACIAS_POOL } from "../../lib/falacias-pool";
import { ETIMOLOGIA_POOL } from "../../lib/etimologia-pool";

type Card =
  | {
      kind: "palavra";
      front: string;
      back: string;
      label: string;
      accent: string;
    }
  | {
      kind: "citacao";
      front: string;
      back: string;
      label: string;
      accent: string;
    }
  | {
      kind: "conceito";
      front: string;
      back: string;
      label: string;
      accent: string;
    }
  | {
      kind: "falacia";
      front: string;
      back: string;
      label: string;
      accent: string;
    }
  | {
      kind: "etimologia";
      front: string;
      back: string;
      label: string;
      accent: string;
    };

function buildPool(): Card[] {
  const cards: Card[] = [];
  for (const w of WORD_POOL) {
    cards.push({
      kind: "palavra",
      label: "📖 Palavra",
      front: `Qual é a definição precisa de "${w.word}"?`,
      back: w.formalDefinition,
      accent: "#d8b4fe",
    });
  }
  for (const q of QUOTE_POOL) {
    cards.push({
      kind: "citacao",
      label: "📚 Citação",
      front: `"${q.text}"\n\nDe quem é, e de que livro?`,
      back: `${q.author}, em "${q.book}"${q.year ? ` (${q.year})` : ""}.`,
      accent: "#bfdbfe",
    });
  }
  for (const c of CONCEITOS_POOL) {
    cards.push({
      kind: "conceito",
      label: "🔬 Conceito",
      front: `Como definirias "${c.name}" em 1-2 frases?`,
      back: c.definition,
      accent: "#67e8f9",
    });
  }
  for (const f of FALACIAS_POOL) {
    cards.push({
      kind: "falacia",
      label: "🪤 Falácia",
      front: `Qual é a falácia: "${f.name}"?`,
      back: f.definition,
      accent: "#fca5a5",
    });
  }
  for (const e of ETIMOLOGIA_POOL) {
    cards.push({
      kind: "etimologia",
      label: "🔡 Etimologia",
      front: `De onde vem a palavra "${e.word}"?`,
      back: e.origin + " — " + e.story,
      accent: "#93c5fd",
    });
  }
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function AleatorioView() {
  const [pool, setPool] = useState<Card[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setPool(shuffle(buildPool()));
  }, []);

  const current = pool[idx];

  const next = () => {
    setRevealed(false);
    setIdx((i) => (i + 1) % pool.length);
  };

  if (!current) {
    return (
      <div className="ma-sans" style={{ textAlign: "center", padding: "40px" }}>
        A baralhar conteúdo…
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/treinar"
        className="ma-sans"
        style={{
          color: "var(--fg-muted)",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        ← Treinar
      </Link>

      <header
        className="ma-sans"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(24px, 6vw, 30px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          🎲 Treino aleatório
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {idx + 1} / {pool.length}
        </span>
      </header>

      <article
        key={idx}
        className="ma-card"
        style={{
          padding: "clamp(24px, 6vw, 36px)",
          borderRadius: "24px",
          background:
            "linear-gradient(160deg, rgba(96, 165, 250, 0.10), rgba(20, 14, 30, 0.5))",
          border: `1px solid ${current.accent}33`,
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            className="ma-sans"
            style={{
              padding: "4px 10px",
              borderRadius: "999px",
              background: `${current.accent}22`,
              border: `1px solid ${current.accent}55`,
              color: current.accent,
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            {current.label}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(18px, 4.8vw, 22px)",
              lineHeight: 1.4,
              fontWeight: 600,
              color: "var(--fg)",
              whiteSpace: "pre-wrap",
            }}
          >
            {current.front}
          </p>

          {revealed && (
            <div
              className="ma-reveal"
              style={{
                marginTop: "20px",
                padding: "16px",
                borderRadius: "14px",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid var(--card-border)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(15px, 4.2vw, 17px)",
                  color: "#e2e8f0",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                {current.back}
              </p>
            </div>
          )}
        </div>

        <div
          className="ma-sans"
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "10px",
          }}
        >
          {!revealed ? (
            <button
              type="button"
              className="ma-press"
              onClick={() => setRevealed(true)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                background: `${current.accent}25`,
                border: `1px solid ${current.accent}66`,
                color: current.accent,
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Revelar
            </button>
          ) : null}
          <button
            type="button"
            className="ma-press"
            onClick={next}
            style={{
              flex: revealed ? 1 : 0.4,
              padding: "14px",
              borderRadius: "12px",
              background: revealed
                ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(20, 184, 166, 0.18))"
                : "rgba(148, 163, 184, 0.1)",
              border: revealed
                ? "1px solid rgba(34, 197, 94, 0.5)"
                : "1px solid rgba(148, 163, 184, 0.25)",
              color: revealed ? "#86efac" : "var(--fg-muted)",
              fontWeight: 800,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            {revealed ? "Próxima →" : "Saltar"}
          </button>
        </div>
      </article>
    </div>
  );
}
