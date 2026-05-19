"use client";

import { useEffect, useState } from "react";
import {
  listFavorites,
  toggleFavorite,
  type FavItem,
  type FavType,
} from "../lib/favoritos";

const TYPE_META: Record<
  FavType,
  { label: string; emoji: string; color: string }
> = {
  palavra: { label: "Palavra", emoji: "📖", color: "#d8b4fe" },
  citacao: { label: "Citação", emoji: "📚", color: "#bfdbfe" },
  pergunta: { label: "Pergunta", emoji: "🤔", color: "#5eead4" },
  falacia: { label: "Falácia", emoji: "🪤", color: "#fca5a5" },
  vies: { label: "Viés", emoji: "🧠", color: "#c084fc" },
  escola: { label: "Escola", emoji: "🎭", color: "#fbbf24" },
  autor: { label: "Autor", emoji: "✍️", color: "#fda4af" },
  etimologia: { label: "Etimologia", emoji: "🔡", color: "#93c5fd" },
  frase: { label: "Frase culta", emoji: "🌍", color: "#a7f3d0" },
  conceito: { label: "Conceito", emoji: "🔬", color: "#67e8f9" },
  retorica: { label: "Retórica", emoji: "🎤", color: "#fcd34d" },
  proverbio: { label: "Provérbio", emoji: "💭", color: "#fdba74" },
  marco: { label: "Marco", emoji: "🏛️", color: "#d8b4fe" },
  desafio: { label: "Desafio", emoji: "🎯", color: "#fde68a" },
};

export default function ColecaoView() {
  const [favs, setFavs] = useState<FavItem[]>([]);
  const [filter, setFilter] = useState<FavType | null>(null);

  useEffect(() => {
    setFavs(listFavorites());
    const handler = () => setFavs(listFavorites());
    window.addEventListener("mente-afinada-favs-changed", handler);
    return () =>
      window.removeEventListener("mente-afinada-favs-changed", handler);
  }, []);

  const filtered = filter ? favs.filter((f) => f.type === filter) : favs;
  const counts: Record<string, number> = {};
  for (const f of favs) counts[f.type] = (counts[f.type] ?? 0) + 1;
  const types = Object.keys(counts) as FavType[];

  const handleRemove = (item: FavItem) => {
    toggleFavorite({
      type: item.type,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
    });
  };

  if (favs.length === 0) {
    return (
      <div
        className="ma-sans"
        style={{
          padding: "40px 24px",
          borderRadius: "20px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          textAlign: "center",
          color: "var(--fg-muted)",
          lineHeight: 1.5,
        }}
      >
        Ainda não guardaste nada.
        <br />
        Clica em <strong>☆ Guardar</strong> em qualquer palavra, citação, falácia ou
        outro conteúdo para começar a tua coleção.
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <Chip
          active={filter === null}
          onClick={() => setFilter(null)}
          label={`Tudo · ${favs.length}`}
          color="#fbbf24"
        />
        {types.map((t) => {
          const meta = TYPE_META[t];
          return (
            <Chip
              key={t}
              active={filter === t}
              onClick={() => setFilter(t)}
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
        {filtered.map((f) => {
          const meta = TYPE_META[f.type];
          return (
            <li
              key={`${f.type}::${f.id}`}
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1, marginTop: "2px" }}>
                {meta.emoji}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
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
                  {meta.label}
                </div>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
                {f.subtitle && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(12px, 3.4vw, 14px)",
                      color: "var(--fg-muted)",
                      lineHeight: 1.45,
                      fontStyle: "italic",
                    }}
                  >
                    {f.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="ma-sans ma-press"
                onClick={() => handleRemove(f)}
                style={{
                  flex: "0 0 auto",
                  padding: "5px 8px",
                  borderRadius: "8px",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  background: "rgba(148, 163, 184, 0.08)",
                  color: "var(--fg-muted)",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                aria-label="Remover da coleção"
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>
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
