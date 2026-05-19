"use client";

import { useMemo, useState } from "react";
import type { Word } from "../lib/types";

export default function LexicoList({ words }: { words: Word[] }) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.trim().toLowerCase();
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.formalDefinition.toLowerCase().includes(q) ||
        w.synonyms.some((s) => s.word.toLowerCase().includes(q))
    );
  }, [words, search]);

  return (
    <div>
      <input
        type="search"
        placeholder="Procurar palavra, definição ou sinónimo…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ma-sans"
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(15, 23, 42, 0.5)",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          color: "#f5f5f4",
          fontSize: "15px",
          fontWeight: 500,
          outline: "none",
          marginBottom: "20px",
        }}
      />

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
        {filtered.map((w) => {
          const isExpanded = expandedId === w.word;
          return (
            <li
              key={w.word}
              style={{
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(168, 85, 247, 0.15)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : w.word)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 18px",
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "clamp(18px, 5vw, 22px)",
                      fontWeight: 800,
                      color: "#f5f5f4",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {w.word}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(13px, 3.6vw, 15px)",
                      color: "#d8b4fe",
                      lineHeight: 1.4,
                      fontStyle: "italic",
                    }}
                  >
                    {w.formalDefinition}
                  </p>
                </div>
                <span
                  className="ma-sans"
                  style={{
                    flex: "0 0 auto",
                    fontSize: "12px",
                    color: "#78716c",
                    marginTop: "6px",
                  }}
                >
                  {isExpanded ? "▲" : "▼"}
                </span>
              </button>

              {isExpanded && (
                <div
                  className="ma-reveal"
                  style={{
                    padding: "0 18px 18px 18px",
                  }}
                >
                  {w.etymology && (
                    <Row label="Etimologia" italic>
                      {w.etymology}
                    </Row>
                  )}
                  {w.example && (
                    <Row label="Exemplo">&ldquo;{w.example}&rdquo;</Row>
                  )}
                  {w.synonyms.length > 0 && (
                    <div style={{ marginTop: "12px" }}>
                      <Label>Sinónimos</Label>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        {w.synonyms.map((s, i) => (
                          <li
                            key={i}
                            style={{
                              padding: "8px 12px",
                              borderRadius: "8px",
                              background: "rgba(168, 85, 247, 0.06)",
                              border: "1px solid rgba(168, 85, 247, 0.15)",
                              fontSize: "clamp(13px, 3.6vw, 14px)",
                            }}
                          >
                            <strong style={{ color: "#e9d5ff" }}>
                              {s.word}
                            </strong>
                            <span
                              className="ma-sans"
                              style={{ color: "#a8a29e" }}
                            >
                              {" "}
                              — {s.nuance}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {w.usage && (
                    <div
                      className="ma-sans"
                      style={{
                        marginTop: "12px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        background: "rgba(168, 85, 247, 0.08)",
                        border: "1px solid rgba(168, 85, 247, 0.25)",
                        color: "#e9d5ff",
                        fontSize: "clamp(12px, 3.4vw, 13px)",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}
                    >
                      💬 {w.usage}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p
          className="ma-sans"
          style={{
            margin: "30px 0",
            textAlign: "center",
            color: "#78716c",
            fontSize: "14px",
          }}
        >
          Nenhuma palavra corresponde a &ldquo;{search}&rdquo;.
        </p>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="ma-sans"
      style={{
        fontSize: "10px",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#a8a29e",
        marginBottom: "6px",
      }}
    >
      {children}
    </div>
  );
}

function Row({
  label,
  italic = false,
  children,
}: {
  label: string;
  italic?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: "12px" }}>
      <Label>{label}</Label>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "#d6d3d1",
          lineHeight: 1.5,
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {children}
      </p>
    </div>
  );
}
