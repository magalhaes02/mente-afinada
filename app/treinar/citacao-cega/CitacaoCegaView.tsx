"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUOTE_POOL } from "../../lib/citacoes-pool";
import type { Quote } from "../../lib/types";

type Round = {
  quote: Quote;
  authorOptions: string[];
  correctAuthorIdx: number;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildRound(): Round {
  const quote = QUOTE_POOL[Math.floor(Math.random() * QUOTE_POOL.length)];
  const otherAuthors = QUOTE_POOL.map((q) => q.author).filter(
    (a) => a !== quote.author
  );
  const distractors = shuffle([...new Set(otherAuthors)]).slice(0, 3);
  const options = shuffle([quote.author, ...distractors]);
  return {
    quote,
    authorOptions: options,
    correctAuthorIdx: options.indexOf(quote.author),
  };
}

export default function CitacaoCegaView() {
  const [round, setRound] = useState<Round | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    setRound(buildRound());
  }, []);

  const handlePick = (idx: number) => {
    if (picked !== null || !round) return;
    setPicked(idx);
    setScore((s) => ({
      correct: s.correct + (idx === round.correctAuthorIdx ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => {
    setPicked(null);
    setRound(buildRound());
  };

  if (!round) {
    return (
      <div className="ma-sans" style={{ textAlign: "center", padding: "40px" }}>
        A carregar…
      </div>
    );
  }

  const correctIdx = round.correctAuthorIdx;
  const answered = picked !== null;

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
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          🎭 Citação cega
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {score.correct}/{score.total}
        </span>
      </header>

      <article
        className="ma-card"
        style={{
          padding: "clamp(22px, 5.5vw, 32px)",
          borderRadius: "24px",
          background:
            "linear-gradient(160deg, rgba(96, 165, 250, 0.08), rgba(15, 23, 42, 0.6))",
          border: "1px solid rgba(96, 165, 250, 0.22)",
        }}
      >
        <blockquote
          style={{
            margin: "0 0 24px 0",
            padding: "0 0 0 14px",
            borderLeft: "3px solid rgba(96, 165, 250, 0.5)",
            fontSize: "clamp(20px, 5.5vw, 26px)",
            lineHeight: 1.35,
            fontWeight: 500,
            color: "var(--fg)",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          &ldquo;{round.quote.text}&rdquo;
        </blockquote>

        <p
          className="ma-sans"
          style={{
            margin: "0 0 16px 0",
            fontSize: "13px",
            color: "var(--fg-muted)",
            fontWeight: 600,
          }}
        >
          De quem é?
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {round.authorOptions.map((author, i) => {
            const isPicked = picked === i;
            const isCorrect = i === correctIdx;
            let bg = "rgba(148, 163, 184, 0.06)";
            let border = "rgba(148, 163, 184, 0.2)";
            let color = "var(--fg)";

            if (answered) {
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
                disabled={answered}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: bg,
                  border: `1px solid ${border}`,
                  color,
                  fontWeight: 600,
                  fontSize: "clamp(14px, 3.8vw, 15px)",
                  cursor: answered ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
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
                  }}
                >
                  {answered && isCorrect
                    ? "✓"
                    : answered && isPicked
                    ? "✗"
                    : String.fromCharCode(65 + i)}
                </span>
                <span>{author}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className="ma-reveal ma-sans"
            style={{
              marginTop: "18px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(96, 165, 250, 0.10)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              color: "#bfdbfe",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            <strong>{round.quote.author}</strong>, em{" "}
            <em>{round.quote.book}</em>
            {round.quote.year ? ` (${round.quote.year})` : ""}.
            <br />
            {round.quote.meaning}
          </div>
        )}

        {answered && (
          <button
            type="button"
            className="ma-sans ma-press"
            onClick={next}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.18))",
              border: "1px solid rgba(96, 165, 250, 0.5)",
              color: "#bfdbfe",
              fontWeight: 800,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Próxima →
          </button>
        )}
      </article>
    </div>
  );
}
