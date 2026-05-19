"use client";

import { useState } from "react";
import Link from "next/link";
import { CHALLENGE_POOL } from "../../lib/lexico-pool";
import { WORD_POOL } from "../../lib/lexico-pool";
import { CONCEITOS_POOL } from "../../lib/conceitos-pool";
import { FALACIAS_POOL } from "../../lib/falacias-pool";

type Source = {
  source: "desafio" | "palavra" | "conceito" | "falacia";
  concept: string;
  formalDefinition: string;
};

function buildSources(): Source[] {
  const out: Source[] = [];
  for (const c of CHALLENGE_POOL) {
    out.push({
      source: "desafio",
      concept: c.concept,
      formalDefinition: c.preciseAnswer,
    });
  }
  for (const w of WORD_POOL) {
    out.push({
      source: "palavra",
      concept: w.word,
      formalDefinition: w.formalDefinition,
    });
  }
  for (const c of CONCEITOS_POOL) {
    out.push({
      source: "conceito",
      concept: c.name,
      formalDefinition: c.definition,
    });
  }
  for (const f of FALACIAS_POOL.slice(0, 10)) {
    out.push({
      source: "falacia",
      concept: f.name,
      formalDefinition: f.definition,
    });
  }
  return out;
}

type Feedback = {
  captureScore: number;
  summary: string;
  missingKeywords: string[];
  preciseRewrite: string;
  tip: string;
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ExplicaView() {
  const [pool] = useState(() => buildSources());
  const [current, setCurrent] = useState<Source>(() => pickRandom(pool));
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const minOk = explanation.trim().length >= 10;

  const handleSubmit = async () => {
    if (!minOk || loading) return;
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/feedback-explicacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept: current.concept,
          formalDefinition: current.formalDefinition,
          userExplanation: explanation.trim(),
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

  const nextConcept = () => {
    setCurrent(pickRandom(pool));
    setExplanation("");
    setFeedback(null);
    setError(null);
    setShowAnswer(false);
  };

  const scoreColor =
    feedback === null
      ? "var(--fg-muted)"
      : feedback.captureScore >= 8
      ? "#86efac"
      : feedback.captureScore >= 5
      ? "#fcd34d"
      : "#fca5a5";

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
        🎤 Explica-me
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
        Como explicarias a alguém? Escreves, a IA compara com a versão precisa.
      </p>

      <article
        style={{
          padding: "22px",
          borderRadius: "20px",
          background:
            "linear-gradient(160deg, rgba(245, 158, 11, 0.10), rgba(20, 14, 4, 0.5))",
          border: "1px solid rgba(245, 158, 11, 0.25)",
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
            color: "#fcd34d",
            marginBottom: "8px",
          }}
        >
          Como explicarias
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(28px, 7vw, 38px)",
            fontWeight: 800,
            color: "var(--fg)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          {current.concept}
        </h2>
      </article>

      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Escreve aqui a tua explicação. Como o dirias a um amigo?"
        rows={5}
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
                ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(244, 114, 182, 0.2))"
                : "rgba(148, 163, 184, 0.12)",
            border: `1px solid ${
              minOk && !loading
                ? "rgba(245, 158, 11, 0.55)"
                : "rgba(148, 163, 184, 0.2)"
            }`,
            color: minOk && !loading ? "#fde68a" : "var(--fg-soft)",
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
          onClick={nextConcept}
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
          Outro
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

      {feedback && (
        <article
          className="ma-reveal"
          style={{
            marginTop: "20px",
            padding: "22px",
            borderRadius: "18px",
            background: "var(--card-bg)",
            border: `1px solid ${scoreColor}55`,
          }}
        >
          <div
            className="ma-sans"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "999px",
                background: `${scoreColor}22`,
                border: `2px solid ${scoreColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: scoreColor,
                fontSize: "22px",
                fontWeight: 900,
              }}
            >
              {feedback.captureScore}
              <span style={{ fontSize: "12px", opacity: 0.6 }}>/10</span>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--fg-muted)",
                }}
              >
                Captação do essencial
              </div>
            </div>
          </div>

          <Block label="Avaliação">{feedback.summary}</Block>
          {feedback.missingKeywords.length > 0 && (
            <Block label="Palavras-chave que faltavam">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {feedback.missingKeywords.map((k, i) => (
                  <span
                    key={i}
                    className="ma-sans"
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "rgba(245, 158, 11, 0.12)",
                      border: "1px solid rgba(245, 158, 11, 0.35)",
                      color: "#fde68a",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </Block>
          )}
          <Block label="Versão precisa" italic>
            &ldquo;{feedback.preciseRewrite}&rdquo;
          </Block>
          {feedback.tip && <Block label="Dica para a próxima">{feedback.tip}</Block>}

          {!showAnswer && (
            <button
              type="button"
              className="ma-sans ma-press"
              onClick={() => setShowAnswer(true)}
              style={{
                marginTop: "14px",
                padding: "8px 14px",
                borderRadius: "10px",
                background: "rgba(148, 163, 184, 0.08)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                color: "var(--fg-muted)",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Ver definição formal
            </button>
          )}
          {showAnswer && (
            <Block label="Definição formal correta" italic>
              {current.formalDefinition}
            </Block>
          )}
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
      <div
        style={{
          fontSize: "clamp(14px, 3.8vw, 15px)",
          color: "var(--fg)",
          lineHeight: 1.55,
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {children}
      </div>
    </section>
  );
}
