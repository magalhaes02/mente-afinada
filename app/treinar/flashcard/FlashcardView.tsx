"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WORD_POOL } from "../../lib/lexico-pool";
import PronounceButton from "../../PronounceButton";

const SCORES_KEY = "mente-afinada-flashcard-scores";

type Difficulty = "facil" | "medio" | "dificil";
type Scores = Record<string, { difficulty: Difficulty; weight: number }>;

function readScores(): Scores {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SCORES_KEY);
    return raw ? (JSON.parse(raw) as Scores) : {};
  } catch {
    return {};
  }
}

function writeScores(s: Scores) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SCORES_KEY, JSON.stringify(s));
}

function pickNext(scores: Scores, exclude?: string): string {
  // Maior weight = mais provável aparecer (palavras erradas voltam mais cedo)
  const candidates = WORD_POOL.filter((w) => w.word !== exclude);
  const weighted = candidates.map((w) => {
    const s = scores[w.word];
    return { word: w.word, weight: s?.weight ?? 1.5 };
  });
  const total = weighted.reduce((a, w) => a + w.weight, 0);
  let r = Math.random() * total;
  for (const item of weighted) {
    r -= item.weight;
    if (r <= 0) return item.word;
  }
  return weighted[0].word;
}

export default function FlashcardView() {
  const [scores, setScores] = useState<Scores>({});
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [seenCount, setSeenCount] = useState(0);

  useEffect(() => {
    const s = readScores();
    setScores(s);
    setCurrentWord(pickNext(s));
  }, []);

  const word = useMemo(
    () => WORD_POOL.find((w) => w.word === currentWord),
    [currentWord]
  );

  const handleAnswer = (difficulty: Difficulty) => {
    if (!currentWord) return;
    const weights: Record<Difficulty, number> = {
      facil: 0.5,
      medio: 1.5,
      dificil: 3,
    };
    const nextScores: Scores = {
      ...scores,
      [currentWord]: { difficulty, weight: weights[difficulty] },
    };
    setScores(nextScores);
    writeScores(nextScores);
    setRevealed(false);
    setSeenCount((c) => c + 1);
    setCurrentWord(pickNext(nextScores, currentWord));
  };

  if (!word) {
    return (
      <div className="ma-sans" style={{ textAlign: "center", padding: "40px" }}>
        A carregar…
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
          🃏 Flashcards
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {seenCount} vistas
        </span>
      </header>

      <article
        className="ma-card"
        style={{
          padding: "clamp(24px, 6vw, 40px)",
          borderRadius: "24px",
          background:
            "linear-gradient(160deg, rgba(168, 85, 247, 0.10), rgba(20, 14, 30, 0.5))",
          border: "1px solid rgba(168, 85, 247, 0.25)",
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
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#d8b4fe",
              marginBottom: "8px",
            }}
          >
            Como definirias?
          </div>
          <h2
            style={{
              fontSize: "clamp(34px, 9vw, 48px)",
              lineHeight: 1.0,
              margin: "0 0 14px 0",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
            }}
          >
            {word.word}
          </h2>
          <PronounceButton text={word.word} />

          {revealed && (
            <div className="ma-reveal" style={{ marginTop: "24px" }}>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "clamp(16px, 4.5vw, 19px)",
                  color: "#e9d5ff",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                {word.formalDefinition}
              </p>
              {word.synonyms[0] && (
                <p
                  className="ma-sans"
                  style={{
                    margin: 0,
                    fontSize: "clamp(12px, 3.4vw, 13px)",
                    color: "var(--fg-muted)",
                  }}
                >
                  Sinónimo: <strong>{word.synonyms[0].word}</strong>{" "}
                  — {word.synonyms[0].nuance}
                </p>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: "24px" }}>
          {!revealed ? (
            <button
              type="button"
              className="ma-sans ma-press"
              onClick={() => setRevealed(true)}
              style={{
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
              Revelar definição
            </button>
          ) : (
            <div className="ma-sans">
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Conseguiste explicar bem?
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "8px",
                }}
              >
                <AnswerButton
                  onClick={() => handleAnswer("dificil")}
                  emoji="😣"
                  label="Difícil"
                  color="#fca5a5"
                />
                <AnswerButton
                  onClick={() => handleAnswer("medio")}
                  emoji="🤔"
                  label="Mais ou menos"
                  color="#fcd34d"
                />
                <AnswerButton
                  onClick={() => handleAnswer("facil")}
                  emoji="✓"
                  label="Fácil"
                  color="#86efac"
                />
              </div>
            </div>
          )}
        </div>
      </article>

      <p
        className="ma-sans"
        style={{
          margin: "16px 0 0 0",
          fontSize: "11px",
          color: "var(--fg-muted)",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Palavras marcadas como difíceis voltam mais cedo. Continua até dominares.
      </p>
    </div>
  );
}

function AnswerButton({
  onClick,
  emoji,
  label,
  color,
}: {
  onClick: () => void;
  emoji: string;
  label: string;
  color: string;
}) {
  return (
    <button
      type="button"
      className="ma-press"
      onClick={onClick}
      style={{
        padding: "12px 8px",
        borderRadius: "12px",
        background: `${color}15`,
        border: `1px solid ${color}55`,
        color,
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span style={{ fontSize: "18px", lineHeight: 1 }}>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
