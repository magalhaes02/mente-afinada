"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchGlobal, TIPO_INFO } from "../lib/index-global";
import type { FavType } from "../lib/favoritos";

export default function SearchView() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<FavType | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchGlobal(query, 120);
  }, [query]);

  const counts: Record<string, number> = {};
  for (const r of results) counts[r.type] = (counts[r.type] ?? 0) + 1;
  const filtered = activeType
    ? results.filter((r) => r.type === activeType)
    : results;

  return (
    <div>
      <h1
        style={{
          fontSize: "clamp(28px, 8vw, 40px)",
          margin: "0 0 16px 0",
          fontWeight: 800,
          color: "var(--fg)",
          letterSpacing: "-0.03em",
        }}
      >
        🔍 Procurar tudo
      </h1>

      <input
        autoFocus
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Procura uma palavra, autor, conceito, citação…"
        className="ma-sans"
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "14px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--fg)",
          fontSize: "16px",
          fontWeight: 500,
          outline: "none",
          marginBottom: "16px",
        }}
      />

      {!query.trim() && (
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            borderRadius: "14px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            textAlign: "center",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Procura em palavras, citações, perguntas, falácias, vieses,
          escolas, autores, etimologia, frases cultas, conceitos, retórica,
          provérbios e marcos históricos — tudo de uma vez.
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div
          className="ma-sans"
          style={{
            padding: "24px",
            borderRadius: "14px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Nada encontrado para &ldquo;{query}&rdquo;.
        </div>
      )}

      {results.length > 0 && (
        <>
          <div
            className="ma-sans"
            style={{
              fontSize: "12px",
              color: "var(--fg-muted)",
              marginBottom: "12px",
            }}
          >
            {results.length} resultado{results.length === 1 ? "" : "s"} encontrados.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "16px",
            }}
          >
            <Chip
              active={activeType === null}
              onClick={() => setActiveType(null)}
              label={`Tudo · ${results.length}`}
              color="#fbbf24"
            />
            {TIPO_INFO.filter((t) => counts[t.type] > 0).map((t) => (
              <Chip
                key={t.type}
                active={activeType === t.type}
                onClick={() =>
                  setActiveType(activeType === t.type ? null : t.type)
                }
                label={`${t.emoji} ${t.label} · ${counts[t.type] ?? 0}`}
                color={t.color}
              />
            ))}
          </div>
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
            {filtered.map((r) => (
              <li key={`${r.type}::${r.id}`}>
                <Link
                  href={r.href}
                  className="ma-press"
                  style={{
                    display: "block",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    textDecoration: "none",
                    color: "var(--fg)",
                  }}
                >
                  <div
                    className="ma-sans"
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--fg-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    {r.emoji}{" "}
                    {TIPO_INFO.find((t) => t.type === r.type)?.label ?? r.type}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(14px, 4vw, 16px)",
                      fontWeight: 700,
                      color: "var(--fg)",
                      marginBottom: "2px",
                      lineHeight: 1.3,
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(12px, 3.4vw, 13px)",
                      color: "var(--fg-muted)",
                      lineHeight: 1.45,
                      fontStyle: "italic",
                    }}
                  >
                    {r.subtitle}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        background: active ? `${color}22` : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${active ? color : "rgba(148, 163, 184, 0.2)"}`,
        color: active ? color : "var(--fg-muted)",
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
