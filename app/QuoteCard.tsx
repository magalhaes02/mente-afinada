"use client";

import { useState } from "react";
import type { Quote } from "./lib/types";
import FavoriteButton from "./FavoriteButton";

export default function QuoteCard({ quote }: { quote: Quote }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article
      className="ma-card"
      style={{
        padding: "clamp(22px, 5.5vw, 36px)",
        borderRadius: "24px",
        background:
          "linear-gradient(160deg, rgba(96, 165, 250, 0.08), rgba(15, 23, 42, 0.6))",
        border: "1px solid rgba(96, 165, 250, 0.22)",
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
            background: "rgba(96, 165, 250, 0.15)",
            border: "1px solid rgba(96, 165, 250, 0.4)",
            color: "#bfdbfe",
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          📚 Citação do dia
        </span>
        {quote.theme && (
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
            {quote.theme}
          </span>
        )}
      </div>

      <blockquote
        style={{
          margin: "0 0 18px 0",
          padding: "0 0 0 14px",
          borderLeft: "3px solid rgba(96, 165, 250, 0.5)",
          fontSize: "clamp(20px, 5.5vw, 26px)",
          lineHeight: 1.35,
          fontWeight: 500,
          color: "#f1f5f9",
          fontStyle: "italic",
          letterSpacing: "-0.01em",
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      <p
        className="ma-sans"
        style={{
          margin: "0 0 22px 0",
          fontSize: "clamp(13px, 3.6vw, 15px)",
          color: "#bfdbfe",
          fontWeight: 600,
        }}
      >
        — <strong>{quote.author}</strong>, <em>{quote.book}</em>
        {quote.year ? ` (${quote.year})` : ""}
      </p>

      {!revealed ? (
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={() => setRevealed(true)}
          style={{
            width: "100%",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(96, 165, 250, 0.4)",
            background: "rgba(96, 165, 250, 0.12)",
            color: "#bfdbfe",
            fontWeight: 800,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Ver significado e contexto
        </button>
      ) : (
        <div className="ma-reveal">
          <Block label="O que significa">{quote.meaning}</Block>
          <Block label="Contexto">{quote.context}</Block>
        </div>
      )}

      <div style={{ marginTop: "16px" }}>
        <FavoriteButton
          type="citacao"
          id={`${quote.author}::${quote.book}`}
          title={quote.text}
          subtitle={`${quote.author}, ${quote.book}`}
          size="sm"
        />
      </div>
    </article>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "14px" }}>
      <h3
        className="ma-sans"
        style={{
          margin: "0 0 6px 0",
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#a8a29e",
        }}
      >
        {label}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(14px, 3.8vw, 16px)",
          color: "#e2e8f0",
          lineHeight: 1.55,
          fontWeight: 500,
        }}
      >
        {children}
      </p>
    </section>
  );
}
