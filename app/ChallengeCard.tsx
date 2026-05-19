"use client";

import { useState } from "react";
import type { ExplainChallenge } from "./lib/types";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ExplainChallenge;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article
      className="ma-card"
      style={{
        padding: "clamp(22px, 5.5vw, 36px)",
        borderRadius: "24px",
        background:
          "linear-gradient(160deg, rgba(245, 158, 11, 0.10), rgba(20, 14, 4, 0.6))",
        border: "1px solid rgba(245, 158, 11, 0.25)",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.45)",
      }}
    >
      <div
        className="ma-sans"
        style={{
          padding: "5px 12px",
          borderRadius: "999px",
          background: "rgba(245, 158, 11, 0.18)",
          border: "1px solid rgba(245, 158, 11, 0.5)",
          color: "#fcd34d",
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          display: "inline-block",
          marginBottom: "14px",
        }}
      >
        🧠 Desafio de explicação
      </div>

      <p
        className="ma-sans"
        style={{
          margin: "0 0 12px 0",
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "#fde68a",
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        Como explicarias a alguém o que é:
      </p>

      <h2
        style={{
          fontSize: "clamp(34px, 9vw, 52px)",
          lineHeight: 1.0,
          margin: "0 0 18px 0",
          fontWeight: 800,
          color: "#fef3c7",
          letterSpacing: "-0.03em",
        }}
      >
        {challenge.concept}
      </h2>

      <p
        className="ma-sans"
        style={{
          margin: "0 0 24px 0",
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "#a8a29e",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        Pensa por um momento. Imagina que alguém te pergunta isto numa
        conversa.
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
            border: "1px solid rgba(245, 158, 11, 0.4)",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(217, 119, 6, 0.18))",
            color: "#fcd34d",
            fontWeight: 800,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Revelar resposta
        </button>
      ) : (
        <div className="ma-reveal">
          <Block emoji="✏️" label="Versão típica (com exemplos)">
            <p
              style={{
                margin: 0,
                fontSize: "clamp(14px, 3.8vw, 16px)",
                color: "#e7e5e4",
                lineHeight: 1.55,
                fontStyle: "italic",
              }}
            >
              &ldquo;{challenge.typicalAnswer}&rdquo;
            </p>
          </Block>

          <Block
            emoji="🎯"
            label="Versão formal (1 frase precisa)"
            highlight
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(16px, 4.4vw, 19px)",
                color: "#fef3c7",
                lineHeight: 1.45,
                fontWeight: 600,
              }}
            >
              {challenge.preciseAnswer}
            </p>
          </Block>

          {challenge.whyPrecisionMatters && (
            <Block emoji="💡" label="Porquê a precisão importa">
              <p
                className="ma-sans"
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 3.8vw, 15px)",
                  color: "#d6d3d1",
                  lineHeight: 1.55,
                }}
              >
                {challenge.whyPrecisionMatters}
              </p>
            </Block>
          )}

          {challenge.mnemonic && (
            <Block emoji="🔑" label="Truque para te lembrares">
              <p
                className="ma-sans"
                style={{
                  margin: 0,
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fde68a",
                  fontSize: "clamp(14px, 4vw, 16px)",
                  fontWeight: 700,
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                {challenge.mnemonic}
              </p>
            </Block>
          )}

          {challenge.relatedConcept && (
            <Block
              emoji="🔗"
              label={`Não confundir com: ${challenge.relatedConcept.concept}`}
            >
              <p
                className="ma-sans"
                style={{
                  margin: 0,
                  fontSize: "clamp(13px, 3.6vw, 14px)",
                  color: "#d6d3d1",
                  lineHeight: 1.55,
                }}
              >
                {challenge.relatedConcept.how}
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
  highlight = false,
}: {
  emoji: string;
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <section
      style={{
        marginTop: "18px",
        padding: highlight ? "14px 16px" : "0",
        borderRadius: highlight ? "14px" : 0,
        background: highlight ? "rgba(245, 158, 11, 0.08)" : "transparent",
        border: highlight ? "1px solid rgba(245, 158, 11, 0.3)" : "none",
      }}
    >
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
