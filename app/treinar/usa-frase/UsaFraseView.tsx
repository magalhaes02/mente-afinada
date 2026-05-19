"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { WORD_POOL } from "../../lib/lexico-pool";
import type { Word } from "../../lib/types";

type Feedback = {
  verdict: "correto" | "parcialmente" | "incorreto";
  explanation: string;
  betterVersion: string;
  tip: string;
};

function pickRandom(): Word {
  return WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
}

export default function UsaFraseView() {
  const [word, setWord] = useState<Word>(() => pickRandom());
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const minOk = sentence.trim().length >= 8;

  const handleSubmit = async () => {
    if (!minOk || loading) return;
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/feedback-frase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: word.word,
          definition: word.formalDefinition,
          sentence: sentence.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as Feedback;
      setFeedback(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  const nextWord = () => {
    setWord(pickRandom());
    setSentence("");
    setFeedback(null);
    setError(null);
  };

  const verdictMeta = useMemo(() => {
    if (!feedback) return null;
    const map = {
      correto: { color: "#86efac", emoji: "✓", label: "Bem usada" },
      parcialmente: {
        color: "#fcd34d",
        emoji: "~",
        label: "Parcialmente correta",
      },
      incorreto: { color: "#fca5a5", emoji: "✗", label: "Não está bem usada" },
    };
    return map[feedback.verdict] ?? map.parcialmente;
  }, [feedback]);

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

      <h1
        className="ma-sans"
        style={{
          margin: "0 0 8px 0",
          fontSize: "clamp(22px, 6vw, 28px)",
          fontWeight: 800,
          color: "var(--fg)",
        }}
      >
        ✏️ Usa numa frase
      </h1>
      <p
        className="ma-sans"
        style={{
          margin: "0 0 24px 0",
          color: "var(--fg-muted)",
          fontSize: "13px",
          fontStyle: "italic",
        }}
      >
        Escreve uma frase que use bem esta palavra. A IA dá-te feedback.
      </p>

      <article
        style={{
          padding: "20px",
          borderRadius: "20px",
          background:
            "linear-gradient(160deg, rgba(168, 85, 247, 0.10), rgba(20, 14, 30, 0.5))",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          marginBottom: "16px",
        }}
      >
        <div
          className="ma-sans"
          style={{
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#d8b4fe",
            marginBottom: "6px",
          }}
        >
          A tua palavra
        </div>
        <h2
          style={{
            margin: "0 0 8px 0",
            fontSize: "clamp(28px, 7vw, 36px)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
          }}
        >
          {word.word}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(14px, 3.8vw, 16px)",
            color: "#e9d5ff",
            lineHeight: 1.45,
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          {word.formalDefinition}
        </p>
      </article>

      <textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="Escreve aqui uma frase que use esta palavra…"
        rows={4}
        className="ma-sans"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--fg)",
          fontSize: "15px",
          fontWeight: 500,
          outline: "none",
          resize: "vertical",
          marginBottom: "12px",
          fontFamily: "inherit",
        }}
      />

      <div className="ma-sans" style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="ma-press"
          onClick={handleSubmit}
          disabled={!minOk || loading}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            background:
              minOk && !loading
                ? "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(244, 114, 182, 0.2))"
                : "rgba(148, 163, 184, 0.12)",
            border: `1px solid ${
              minOk && !loading
                ? "rgba(168, 85, 247, 0.55)"
                : "rgba(148, 163, 184, 0.2)"
            }`,
            color: minOk && !loading ? "#e9d5ff" : "var(--fg-soft)",
            fontWeight: 800,
            fontSize: "15px",
            cursor: minOk && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "A avaliar…" : "Pedir feedback à IA"}
        </button>
        <button
          type="button"
          className="ma-press"
          onClick={nextWord}
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(148, 163, 184, 0.1)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            color: "var(--fg-muted)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Outra palavra
        </button>
      </div>

      {error && (
        <div
          className="ma-sans"
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {feedback && verdictMeta && (
        <article
          className="ma-reveal"
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "18px",
            background: "var(--card-bg)",
            border: `1px solid ${verdictMeta.color}55`,
          }}
        >
          <div
            className="ma-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 12px",
              borderRadius: "999px",
              background: `${verdictMeta.color}22`,
              border: `1px solid ${verdictMeta.color}55`,
              color: verdictMeta.color,
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            <span>{verdictMeta.emoji}</span>
            <span>{verdictMeta.label}</span>
          </div>

          <Block label="Explicação">{feedback.explanation}</Block>
          {feedback.betterVersion && (
            <Block label="Versão melhorada" italic>
              &ldquo;{feedback.betterVersion}&rdquo;
            </Block>
          )}
          {feedback.tip && <Block label="Dica para o futuro">{feedback.tip}</Block>}
        </article>
      )}
    </div>
  );
}

function Block({
  label,
  children,
  italic = false,
}: {
  label: string;
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <section style={{ marginTop: "12px" }}>
      <div
        className="ma-sans"
        style={{
          fontSize: "10px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
          marginBottom: "5px",
        }}
      >
        {label}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(14px, 3.8vw, 15px)",
          color: "var(--fg)",
          lineHeight: 1.55,
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {children}
      </p>
    </section>
  );
}
