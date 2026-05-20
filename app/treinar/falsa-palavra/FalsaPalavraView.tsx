"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WORD_POOL } from "../../lib/lexico-pool";
import type { Word } from "../../lib/types";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickRandom(): Word {
  return WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
}

type Round = {
  word: Word;
  options: string[];
  correctIdx: number;
};

export default function FalsaPalavraView() {
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const loadRound = async () => {
    setLoading(true);
    setError(null);
    setPicked(null);
    const word = pickRandom();
    try {
      const res = await fetch("/api/falsa-palavra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: word.word,
          definition: word.formalDefinition,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { fakes: string[] };
      const options = shuffle([word.formalDefinition, ...data.fakes]);
      setRound({
        word,
        options,
        correctIdx: options.indexOf(word.formalDefinition),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (idx: number) => {
    if (picked !== null || !round) return;
    setPicked(idx);
    setScore((s) => ({
      correct: s.correct + (idx === round.correctIdx ? 1 : 0),
      total: s.total + 1,
    }));
  };

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
          marginBottom: "20px",
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
          🃏 Falsa palavra
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {score.correct}/{score.total}
        </span>
      </header>

      {error && (
        <div
          className="ma-sans"
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            fontSize: "13px",
            marginBottom: "16px",
          }}
        >
          {error}{" "}
          <button
            type="button"
            onClick={loadRound}
            style={{
              marginLeft: "8px",
              padding: "4px 10px",
              borderRadius: "8px",
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {loading && (
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            textAlign: "center",
            color: "var(--fg-muted)",
          }}
        >
          A IA está a inventar 3 definições falsas plausíveis…
        </div>
      )}

      {round && !loading && (
        <article
          style={{
            padding: "clamp(22px, 5.5vw, 32px)",
            borderRadius: "24px",
            background:
              "linear-gradient(160deg, rgba(168, 85, 247, 0.08), rgba(15, 23, 42, 0.6))",
            border: "1px solid rgba(168, 85, 247, 0.22)",
          }}
        >
          <div
            className="ma-sans"
            style={{
              padding: "4px 10px",
              borderRadius: "999px",
              background: "rgba(168, 85, 247, 0.18)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              color: "#d8b4fe",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            Qual é a definição correta?
          </div>

          <h2
            style={{
              margin: "0 0 22px 0",
              fontSize: "clamp(32px, 8vw, 44px)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            {round.word.word}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {round.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === round.correctIdx;
              let bg = "rgba(148, 163, 184, 0.06)";
              let border = "rgba(148, 163, 184, 0.2)";
              let color = "var(--fg)";

              if (picked !== null) {
                if (isCorrect) {
                  bg = "rgba(34, 197, 94, 0.15)";
                  border = "rgba(34, 197, 94, 0.5)";
                  color = "#86efac";
                } else if (isPicked) {
                  bg = "rgba(239, 68, 68, 0.12)";
                  border = "rgba(239, 68, 68, 0.5)";
                  color = "#fca5a5";
                }
              }

              return (
                <button
                  key={i}
                  type="button"
                  className="ma-sans ma-press"
                  onClick={() => handlePick(i)}
                  disabled={picked !== null}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: bg,
                    border: `1px solid ${border}`,
                    color,
                    fontWeight: 500,
                    fontSize: "clamp(13px, 3.7vw, 15px)",
                    lineHeight: 1.5,
                    cursor: picked === null ? "pointer" : "default",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "999px",
                      background: "rgba(0,0,0,0.25)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 900,
                      color: "#cbd5e1",
                      flex: "0 0 auto",
                      marginTop: "1px",
                    }}
                  >
                    {picked !== null && isCorrect
                      ? "✓"
                      : picked !== null && isPicked
                      ? "✗"
                      : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <button
              type="button"
              className="ma-sans ma-press"
              onClick={loadRound}
              style={{
                marginTop: "18px",
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(244, 114, 182, 0.18))",
                border: "1px solid rgba(168, 85, 247, 0.5)",
                color: "#e9d5ff",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Próxima palavra →
            </button>
          )}
        </article>
      )}
    </div>
  );
}
