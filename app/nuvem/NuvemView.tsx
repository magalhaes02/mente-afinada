"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listFavorites, type FavItem } from "../lib/favoritos";

const COLORS = [
  "#fbbf24",
  "#a855f7",
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#67e8f9",
  "#fb923c",
  "#a78bfa",
  "#fda4af",
  "#fcd34d",
];

function pseudoRandom(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function NuvemView() {
  const [favs, setFavs] = useState<FavItem[]>([]);

  useEffect(() => {
    setFavs(listFavorites());
  }, []);

  if (favs.length === 0) {
    return (
      <div>
        <Link
          href="/colecao"
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
          ← Coleção
        </Link>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 40px)",
            margin: "0 0 20px 0",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          ☁️ Nuvem
        </h1>
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            textAlign: "center",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            color: "var(--fg-muted)",
            fontSize: "14px",
          }}
        >
          A tua coleção está vazia. Guarda alguns itens para os veres aqui.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/colecao"
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
        ← Coleção
      </Link>

      <h1
        style={{
          fontSize: "clamp(28px, 8vw, 40px)",
          margin: "0 0 8px 0",
          fontWeight: 800,
          background:
            "linear-gradient(135deg, var(--serif-color) 0%, #67e8f9 50%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.03em",
        }}
      >
        ☁️ Nuvem de palavras
      </h1>
      <p
        className="ma-sans"
        style={{
          margin: "0 0 24px 0",
          color: "var(--fg-muted)",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        Os {favs.length} itens da tua coleção, lado a lado. Mais velho = maior.
      </p>

      <div
        style={{
          padding: "20px",
          borderRadius: "20px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          minHeight: "300px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 14px",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1.3,
        }}
      >
        {favs.map((f, i) => {
          const seed = pseudoRandom(f.id + f.type);
          const ageBoost = Math.max(0, favs.length - i) / favs.length;
          const sizePx = Math.round(13 + ageBoost * 22 + (seed % 5));
          const color = COLORS[seed % COLORS.length];
          return (
            <span
              key={`${f.type}::${f.id}`}
              title={f.subtitle}
              style={{
                fontSize: `${sizePx}px`,
                fontWeight: sizePx > 22 ? 800 : 600,
                color,
                letterSpacing: "-0.01em",
                cursor: "default",
                display: "inline-block",
                transform: `rotate(${((seed % 7) - 3) * 1.2}deg)`,
              }}
            >
              {f.title.length > 50 ? f.title.slice(0, 50) + "…" : f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
}
