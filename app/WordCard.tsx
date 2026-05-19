"use client";

import type { Word } from "./lib/types";
import PronounceButton from "./PronounceButton";
import FavoriteButton from "./FavoriteButton";
import ConnectionsBlock from "./ConnectionsBlock";

export default function WordCard({ word }: { word: Word }) {
  return (
    <article
      className="ma-card"
      style={{
        padding: "clamp(20px, 5vw, 32px)",
        borderRadius: "24px",
        background:
          "linear-gradient(160deg, rgba(168, 85, 247, 0.08), rgba(20, 14, 30, 0.6))",
        border: "1px solid rgba(168, 85, 247, 0.2)",
        marginTop: "20px",
      }}
    >
      <div
        className="ma-sans"
        style={{
          padding: "5px 12px",
          borderRadius: "999px",
          background: "rgba(168, 85, 247, 0.15)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          color: "#d8b4fe",
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          display: "inline-block",
          marginBottom: "14px",
        }}
      >
        📖 Palavra do dia
      </div>

      <h2
        style={{
          fontSize: "clamp(32px, 8.5vw, 46px)",
          lineHeight: 1.0,
          margin: "0 0 10px 0",
          fontWeight: 800,
          color: "var(--fg)",
          letterSpacing: "-0.03em",
        }}
      >
        {word.word}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "14px",
        }}
      >
        <PronounceButton text={word.word} />
        <FavoriteButton
          type="palavra"
          id={word.word.toLowerCase()}
          title={word.word}
          subtitle={word.formalDefinition}
          size="sm"
        />
      </div>

      <p
        style={{
          margin: "0 0 18px 0",
          fontSize: "clamp(15px, 4.2vw, 18px)",
          color: "#e9d5ff",
          lineHeight: 1.4,
          fontWeight: 500,
          fontStyle: "italic",
        }}
      >
        {word.formalDefinition}
      </p>

      {word.etymology && (
        <Row label="Etimologia">
          <span style={{ fontStyle: "italic" }}>{word.etymology}</span>
        </Row>
      )}

      {word.example && (
        <Row label="Exemplo">
          <span style={{ color: "#e7e5e4" }}>
            &ldquo;{word.example}&rdquo;
          </span>
        </Row>
      )}

      {word.synonyms.length > 0 && (
        <div style={{ marginTop: "18px" }}>
          <h3
            className="ma-sans"
            style={{
              margin: "0 0 10px 0",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#a8a29e",
            }}
          >
            Sinónimos (com nuance)
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {word.synonyms.map((s, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(168, 85, 247, 0.06)",
                  border: "1px solid rgba(168, 85, 247, 0.18)",
                }}
              >
                <strong
                  style={{
                    color: "#e9d5ff",
                    fontWeight: 700,
                    fontSize: "clamp(14px, 4vw, 16px)",
                  }}
                >
                  {s.word}
                </strong>
                <span
                  className="ma-sans"
                  style={{
                    color: "#d6d3d1",
                    fontSize: "clamp(13px, 3.6vw, 14px)",
                    marginLeft: "8px",
                  }}
                >
                  — {s.nuance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {word.usage && (
        <div
          className="ma-sans"
          style={{
            marginTop: "18px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            color: "#e9d5ff",
            fontSize: "clamp(13px, 3.6vw, 14px)",
            fontWeight: 500,
            lineHeight: 1.55,
          }}
        >
          💬 {word.usage}
        </div>
      )}

      <ConnectionsBlock type="palavra" title={word.word} />
    </article>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: "12px" }}>
      <span
        className="ma-sans"
        style={{
          display: "block",
          fontSize: "10px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#a8a29e",
          marginBottom: "4px",
        }}
      >
        {label}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(13px, 3.6vw, 15px)",
          color: "#d6d3d1",
          lineHeight: 1.5,
        }}
      >
        {children}
      </p>
    </div>
  );
}
