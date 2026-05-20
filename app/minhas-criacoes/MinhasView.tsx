"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteConteudo,
  listAllConteudo,
  type ConteudoGerado,
  type ConteudoTipo,
} from "../lib/conteudo-personalizado";

const TYPE_META: Record<string, { label: string; emoji: string; color: string }> = {
  palavra: { label: "Palavra", emoji: "📖", color: "#d8b4fe" },
  citacao: { label: "Citação", emoji: "📚", color: "#bfdbfe" },
  pergunta: { label: "Pergunta", emoji: "🤔", color: "#5eead4" },
  falacia: { label: "Falácia", emoji: "🪤", color: "#fca5a5" },
  vies: { label: "Viés", emoji: "🧠", color: "#c084fc" },
  etimologia: { label: "Etimologia", emoji: "🔡", color: "#93c5fd" },
  frase: { label: "Frase culta", emoji: "🌍", color: "#a7f3d0" },
  conceito: { label: "Conceito", emoji: "🔬", color: "#67e8f9" },
  retorica: { label: "Retórica", emoji: "🎤", color: "#fcd34d" },
  proverbio: { label: "Provérbio", emoji: "💭", color: "#fdba74" },
  marco: { label: "Marco", emoji: "🏛️", color: "#d8b4fe" },
  mito: { label: "Mito", emoji: "🏛️", color: "#fda4af" },
  curiosidade: { label: "Curiosidade", emoji: "🌟", color: "#fcd34d" },
  geografia: { label: "Geografia", emoji: "🌍", color: "#93c5fd" },
  invento: { label: "Invento", emoji: "🔧", color: "#fcd34d" },
  habito: { label: "Hábito mental", emoji: "🧩", color: "#67e8f9" },
};

function titleFromData(tipo: string, data: Record<string, unknown>): string {
  const candidates = ["word", "text", "question", "name", "phrase", "title"];
  for (const k of candidates) {
    if (typeof data[k] === "string" && data[k]) return String(data[k]);
  }
  return Object.values(data).find((v) => typeof v === "string" && v) as string ?? "(sem título)";
}

export default function MinhasView() {
  const [items, setItems] = useState<ConteudoGerado[]>([]);
  const [filter, setFilter] = useState<ConteudoTipo | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => setItems(listAllConteudo());
    refresh();
    window.addEventListener("mente-afinada-personalizado-changed", refresh);
    return () =>
      window.removeEventListener(
        "mente-afinada-personalizado-changed",
        refresh
      );
  }, []);

  const filtered = filter ? items.filter((i) => i.tipo === filter) : items;
  const counts: Record<string, number> = {};
  for (const i of items) counts[i.tipo] = (counts[i.tipo] ?? 0) + 1;
  const types = Object.keys(counts) as ConteudoTipo[];

  return (
    <div>
      <Link
        href="/gerar"
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
        ← Gerar
      </Link>

      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 40px)",
            margin: "0 0 8px 0",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
          }}
        >
          ✨ Minhas criações
        </h1>
        <p
          className="ma-sans"
          style={{
            margin: 0,
            color: "var(--fg-muted)",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          {items.length} entrada{items.length === 1 ? "" : "s"} geradas por IA. Só no teu dispositivo.
        </p>
      </header>

      {items.length === 0 && (
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            textAlign: "center",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            color: "var(--fg-muted)",
            lineHeight: 1.6,
          }}
        >
          Ainda não criaste nada.
          <br />
          Vai a <Link href="/gerar" style={{ color: "#a855f7" }}>Gerar</Link> e pede
          à IA novas entradas para qualquer secção.
        </div>
      )}

      {items.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "16px",
            }}
          >
            <Chip
              active={filter === null}
              onClick={() => setFilter(null)}
              label={`Tudo · ${items.length}`}
              color="#fbbf24"
            />
            {types.map((t) => {
              const meta = TYPE_META[t] ?? {
                label: t,
                emoji: "❓",
                color: "#fbbf24",
              };
              return (
                <Chip
                  key={t}
                  active={filter === t}
                  onClick={() => setFilter(filter === t ? null : t)}
                  label={`${meta.emoji} ${meta.label} · ${counts[t]}`}
                  color={meta.color}
                />
              );
            })}
          </div>

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
            {filtered.map((c) => {
              const meta = TYPE_META[c.tipo] ?? {
                label: c.tipo,
                emoji: "❓",
                color: "#fbbf24",
              };
              const title = titleFromData(c.tipo, c.data);
              const isExpanded = expanded === c.id;
              return (
                <li
                  key={c.id}
                  style={{
                    borderRadius: "14px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : c.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "14px 16px",
                      background: "transparent",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="ma-sans"
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: meta.color,
                        marginBottom: "4px",
                      }}
                    >
                      {meta.emoji} {meta.label}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(15px, 4vw, 17px)",
                        fontWeight: 700,
                        color: "var(--fg)",
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className="ma-reveal"
                      style={{
                        padding: "0 16px 14px",
                      }}
                    >
                      {Object.entries(c.data).map(([k, v]) => {
                        if (k === Object.keys(c.data)[0]) return null;
                        return (
                          <div key={k} style={{ marginTop: "10px" }}>
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
                              {k}
                            </div>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "var(--fg)",
                                lineHeight: 1.5,
                              }}
                            >
                              {typeof v === "string"
                                ? v
                                : JSON.stringify(v, null, 2)}
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="ma-sans ma-press"
                        onClick={() => deleteConteudo(c.tipo, c.id)}
                        style={{
                          marginTop: "14px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#fca5a5",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Apagar
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
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
