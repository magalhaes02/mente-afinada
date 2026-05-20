"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WORD_POOL } from "../../lib/lexico-pool";

const PAIRS_PER_ROUND = 5;

type Pair = {
  id: string;
  left: string;
  right: string;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildPairs(): Pair[] {
  const chosen = shuffle(WORD_POOL).slice(0, PAIRS_PER_ROUND);
  return chosen.map((w) => ({
    id: w.word,
    left: w.word,
    right: w.formalDefinition,
  }));
}

export default function MatchView() {
  const [pairs, setPairs] = useState<Pair[]>(() => buildPairs());
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<{ left: string; right: string } | null>(
    null
  );
  const [moves, setMoves] = useState(0);

  const leftItems = useMemo(() => shuffle(pairs.map((p) => p.left)), [pairs]);
  const rightItems = useMemo(
    () => shuffle(pairs.map((p) => p.right)),
    [pairs]
  );

  const allDone = matched.size === pairs.length;

  const handlePick = (right: string) => {
    if (!selectedLeft || allDone) return;
    const correctPair = pairs.find((p) => p.left === selectedLeft);
    if (!correctPair) return;
    setMoves((m) => m + 1);
    if (correctPair.right === right) {
      const next = new Set(matched);
      next.add(selectedLeft);
      setMatched(next);
      setSelectedLeft(null);
      setWrong(null);
    } else {
      setWrong({ left: selectedLeft, right });
      setTimeout(() => {
        setWrong(null);
        setSelectedLeft(null);
      }, 700);
    }
  };

  const reset = () => {
    setPairs(buildPairs());
    setSelectedLeft(null);
    setMatched(new Set());
    setMoves(0);
    setWrong(null);
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
          🧩 Match
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {matched.size}/{pairs.length} · {moves} jogadas
        </span>
      </header>

      <p
        className="ma-sans"
        style={{
          margin: "0 0 18px 0",
          color: "var(--fg-muted)",
          fontSize: "13px",
          fontStyle: "italic",
        }}
      >
        Toca numa palavra à esquerda, depois na definição certa à direita.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {leftItems.map((left) => {
            const isMatched = matched.has(left);
            const isSelected = selectedLeft === left;
            const isWrong = wrong?.left === left;
            return (
              <button
                key={left}
                type="button"
                className="ma-press"
                onClick={() => !isMatched && setSelectedLeft(left)}
                disabled={isMatched}
                style={{
                  padding: "12px 12px",
                  borderRadius: "12px",
                  background: isMatched
                    ? "rgba(34, 197, 94, 0.12)"
                    : isWrong
                    ? "rgba(239, 68, 68, 0.15)"
                    : isSelected
                    ? "rgba(168, 85, 247, 0.22)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    isMatched
                      ? "rgba(34, 197, 94, 0.4)"
                      : isWrong
                      ? "rgba(239, 68, 68, 0.5)"
                      : isSelected
                      ? "rgba(168, 85, 247, 0.55)"
                      : "var(--card-border)"
                  }`,
                  color: isMatched
                    ? "#86efac"
                    : isSelected
                    ? "#e9d5ff"
                    : "var(--fg)",
                  fontWeight: 700,
                  fontSize: "clamp(14px, 3.8vw, 16px)",
                  cursor: isMatched ? "default" : "pointer",
                  opacity: isMatched ? 0.5 : 1,
                  textAlign: "left",
                  fontFamily: "inherit",
                  letterSpacing: "-0.01em",
                }}
              >
                {isMatched ? "✓ " : ""}
                {left}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {rightItems.map((right) => {
            const matchedPair = pairs.find(
              (p) => p.right === right && matched.has(p.left)
            );
            const isMatched = Boolean(matchedPair);
            const isWrong = wrong?.right === right;
            return (
              <button
                key={right}
                type="button"
                className="ma-sans ma-press"
                onClick={() => handlePick(right)}
                disabled={isMatched || !selectedLeft}
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: isMatched
                    ? "rgba(34, 197, 94, 0.10)"
                    : isWrong
                    ? "rgba(239, 68, 68, 0.12)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    isMatched
                      ? "rgba(34, 197, 94, 0.4)"
                      : isWrong
                      ? "rgba(239, 68, 68, 0.5)"
                      : "var(--card-border)"
                  }`,
                  color: isMatched ? "#86efac" : "var(--fg)",
                  fontWeight: 500,
                  fontSize: "clamp(11px, 3vw, 13px)",
                  cursor:
                    isMatched || !selectedLeft ? "default" : "pointer",
                  opacity: isMatched ? 0.5 : 1,
                  textAlign: "left",
                  lineHeight: 1.4,
                }}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div
          className="ma-reveal"
          style={{
            marginTop: "24px",
            padding: "20px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(168, 85, 247, 0.12))",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎉</div>
          <h2
            className="ma-sans"
            style={{
              margin: "0 0 4px 0",
              fontSize: "20px",
              color: "var(--fg)",
              fontWeight: 800,
            }}
          >
            Completo
          </h2>
          <p
            className="ma-sans"
            style={{
              margin: "0 0 16px 0",
              color: "var(--fg-muted)",
              fontSize: "13px",
            }}
          >
            {moves} jogadas para {pairs.length} pares.
          </p>
          <button
            type="button"
            className="ma-press"
            onClick={reset}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f59e0b, #f472b6)",
              border: "none",
              color: "#fff",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Nova ronda
          </button>
        </div>
      )}
    </div>
  );
}
