"use client";

import { useState } from "react";
import type { PhilosophicalQuestion } from "./lib/types";

export default function PhilosophicalQuestionCard({
  question,
}: {
  question: PhilosophicalQuestion;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article
      className="ma-card"
      style={{
        padding: "clamp(22px, 5.5vw, 36px)",
        borderRadius: "24px",
        background:
          "linear-gradient(160deg, rgba(20, 184, 166, 0.10), rgba(15, 23, 42, 0.6))",
        border: "1px solid rgba(20, 184, 166, 0.22)",
        marginTop: "20px",
      }}
    >
      <div
        className="ma-sans"
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            padding: "5px 12px",
            borderRadius: "999px",
            background: "rgba(20, 184, 166, 0.15)",
            border: "1px solid rgba(20, 184, 166, 0.4)",
            color: "#5eead4",
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          🤔 Pergunta filosófica
        </span>
        {question.theme && (
          <span
            style={{
              padding: "5px 12px",
              borderRadius: "999px",
              background: "rgba(148, 163, 184, 0.10)",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              color: "#cbd5e1",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {question.theme}
          </span>
        )}
      </div>

      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: "clamp(22px, 6vw, 30px)",
          lineHeight: 1.25,
          fontWeight: 700,
          color: "#f0fdfa",
          letterSpacing: "-0.02em",
        }}
      >
        {question.question}
      </h2>

      <p
        className="ma-sans"
        style={{
          margin: "0 0 22px 0",
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "#a8a29e",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        Pensa por um momento. Sem pressa, sem resposta certa. O que dirias?
      </p>

      {!revealed ? (
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={() => setRevealed(true)}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: "14px",
            border: "1px solid rgba(20, 184, 166, 0.4)",
            background:
              "linear-gradient(135deg, rgba(20, 184, 166, 0.18), rgba(8, 145, 178, 0.18))",
            color: "#5eead4",
            fontWeight: 800,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Ver perspetivas
        </button>
      ) : (
        <div className="ma-reveal">
          {question.whyItMatters && (
            <Block emoji="🎯" label="Porquê esta pergunta importa">
              <p
                className="ma-sans"
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 3.8vw, 15px)",
                  color: "#d6d3d1",
                  lineHeight: 1.55,
                }}
              >
                {question.whyItMatters}
              </p>
            </Block>
          )}

          {question.trapAnswer && (
            <Block emoji="⚠️" label="A resposta fácil (armadilha)">
              <p
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(239, 68, 68, 0.06)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#fca5a5",
                  fontSize: "clamp(14px, 3.8vw, 15px)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{question.trapAnswer}&rdquo;
              </p>
            </Block>
          )}

          <Block emoji="🧭" label="Perspetivas filosóficas">
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
              {question.perspectives.map((p, i) => (
                <li
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(20, 184, 166, 0.06)",
                    border: "1px solid rgba(20, 184, 166, 0.18)",
                  }}
                >
                  <strong
                    className="ma-sans"
                    style={{
                      display: "block",
                      color: "#5eead4",
                      fontWeight: 800,
                      fontSize: "clamp(13px, 3.6vw, 14px)",
                      marginBottom: "4px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {p.name}
                  </strong>
                  <span
                    style={{
                      color: "#e2e8f0",
                      fontSize: "clamp(14px, 3.8vw, 15px)",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.view}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          {question.pushFurther && (
            <Block emoji="🌀" label="E se também pensares nisto">
              <p
                style={{
                  margin: 0,
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(20, 184, 166, 0.10)",
                  border: "1px solid rgba(20, 184, 166, 0.3)",
                  color: "#99f6e4",
                  fontSize: "clamp(15px, 4vw, 17px)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {question.pushFurther}
              </p>
            </Block>
          )}
        </div>
      )}
    </article>
  );
}

function Block({
  emoji,
  label,
  children,
}: {
  emoji: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "18px" }}>
      <h3
        className="ma-sans"
        style={{
          margin: "0 0 8px 0",
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#a8a29e",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "14px" }}>{emoji}</span>
        {label}
      </h3>
      {children}
    </section>
  );
}
