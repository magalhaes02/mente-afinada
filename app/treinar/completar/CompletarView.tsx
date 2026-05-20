"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUOTE_POOL } from "../../lib/citacoes-pool";
import type { Quote } from "../../lib/types";

type Round = {
  quote: Quote;
  firstHalf: string;
  secondHalf: string;
  options: string[];
  correctIdx: number;
};

function splitInHalf(text: string): { first: string; second: string } {
  const mid = Math.floor(text.length / 2);
  const beforeSpace = text.lastIndexOf(" ", mid);
  const afterSpace = text.indexOf(" ", mid);
  const splitAt =
    beforeSpace > 0 && Math.abs(mid - beforeSpace) < Math.abs(mid - afterSpace)
      ? beforeSpace
      : afterSpace;
  if (splitAt < 5 || splitAt > text.length - 5) {
    return { first: text.slice(0, mid), second: text.slice(mid) };
  }
  return { first: text.slice(0, splitAt), second: text.slice(splitAt + 1) };
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildRound(): Round {
  const eligible = QUOTE_POOL.filter((q) => q.text.length > 30);
  const quote = eligible[Math.floor(Math.random() * eligible.length)];
  const { first, second } = splitInHalf(quote.text);

  // Get 3 distractors — second halves of OTHER quotes of similar length
  const otherSeconds = shuffle(
    eligible
      .filter((q) => q.author !== quote.author)
      .map((q) => splitInHalf(q.text).second)
      .filter((s) => Math.abs(s.length - second.length) < second.length * 0.7)
  ).slice(0, 3);

  const options = shuffle([second, ...otherSeconds]);
  return {
    quote,
    firstHalf: first,
    secondHalf: second,
    options,
    correctIdx: options.indexOf(second),
  };
}

export default function CompletarView() {
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
      correct: s.correct + (idx === round.correctIdx ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => {
    setPicked(null);
    setRound(buildRound());
  };

  if (!round) return null;

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
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          📜 Completar citação
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {score.correct}/{score.total}
        </span>
      </header>

      <article
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
            margin: "0 0 22px 0",
            padding: "0 0 0 14px",
            borderLeft: "3px solid rgba(96, 165, 250, 0.5)",
            fontSize: "clamp(17px, 4.8vw, 21px)",
            lineHeight: 1.4,
            fontWeight: 500,
            color: "var(--fg)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{round.firstHalf}{" "}
          {picked === null ? (
            <span style={{ color: "var(--fg-soft)" }}>____________</span>
          ) : (
            <span style={{ color: "#86efac" }}>{round.secondHalf}</span>
          )}
          &rdquo;
        </blockquote>

        <p
          className="ma-sans"
          style={{
            margin: "0 0 14px 0",
            fontSize: "12px",
            color: "var(--fg-muted)",
            fontWeight: 600,
          }}
        >
          Como termina?
        </p>

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
                className="ma-press"
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
                  fontSize: "clamp(13px, 3.6vw, 15px)",
                  lineHeight: 1.5,
                  cursor: picked === null ? "pointer" : "default",
                  fontStyle: "italic",
                  fontFamily: "inherit",
                }}
              >
                {picked !== null && (isCorrect || isPicked) && (
                  <span style={{ marginRight: "8px", fontStyle: "normal" }}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
                &ldquo;…{opt}&rdquo;
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div
            className="ma-reveal ma-sans"
            style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(96, 165, 250, 0.1)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              color: "#bfdbfe",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            <strong>{round.quote.author}</strong>, em{" "}
            <em>{round.quote.book}</em>
            {round.quote.year ? ` (${round.quote.year})` : ""}.
          </div>
        )}

        {picked !== null && (
          <button
            type="button"
            className="ma-sans ma-press"
            onClick={next}
            style={{
              marginTop: "14px",
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(96, 165, 250, 0.25), rgba(168, 85, 247, 0.18))",
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
