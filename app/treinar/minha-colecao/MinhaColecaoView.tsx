"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listFavorites, type FavItem } from "../../lib/favoritos";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MinhaColecaoView() {
  const [items, setItems] = useState<FavItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setItems(shuffle(listFavorites()));
  }, []);

  const current = items[idx];

  const next = () => {
    setRevealed(false);
    setIdx((i) => (i + 1) % items.length);
  };

  if (items.length === 0) {
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
            margin: "0 0 20px 0",
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          🎯 Quiz da minha coleção
        </h1>
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            borderRadius: "16px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            textAlign: "center",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          A tua coleção está vazia.
          <br />
          Vai a qualquer secção e clica em{" "}
          <strong>☆ Guardar</strong> em palavras, citações, ou outros itens.{" "}
          <br />
          Depois volta aqui para te testar só com o que escolheste.
        </div>
      </div>
    );
  }

  if (!started) {
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
            margin: "0 0 12px 0",
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          🎯 Quiz da minha coleção
        </h1>
        <p
          className="ma-sans"
          style={{
            margin: "0 0 20px 0",
            color: "var(--fg-muted)",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          {items.length} item{items.length === 1 ? "" : "s"} na tua coleção. Vão
          aparecer ao calhas — vês o título, pensas o significado, revelas.
        </p>
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={() => setStarted(true)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(244, 114, 182, 0.2))",
            border: "1px solid rgba(245, 158, 11, 0.55)",
            color: "#fde68a",
            fontWeight: 800,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Começar
        </button>
      </div>
    );
  }

  if (!current) return null;

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

      <header
        className="ma-sans"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          🎯 Minha coleção
        </h1>
        <span style={{ color: "var(--fg-muted)", fontSize: "13px" }}>
          {idx + 1} / {items.length}
        </span>
      </header>

      <article
        style={{
          padding: "clamp(22px, 5.5vw, 32px)",
          borderRadius: "24px",
          background:
            "linear-gradient(160deg, rgba(245, 158, 11, 0.10), rgba(20, 14, 4, 0.5))",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          minHeight: "240px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
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
            {current.type}
          </div>
          <h2
            style={{
              margin: "0 0 14px 0",
              fontSize: "clamp(22px, 6vw, 30px)",
              fontWeight: 800,
              color: "var(--fg)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {current.title}
          </h2>
          {revealed && current.subtitle && (
            <p
              className="ma-reveal"
              style={{
                margin: 0,
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                fontSize: "clamp(14px, 3.8vw, 16px)",
                color: "var(--fg)",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              {current.subtitle}
            </p>
          )}
          {current.note && (
            <p
              className="ma-sans"
              style={{
                margin: "12px 0 0 0",
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(245, 158, 11, 0.06)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                color: "#fde68a",
                fontSize: "12px",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              📝 Tua nota: {current.note}
            </p>
          )}
        </div>

        <div className="ma-sans" style={{ marginTop: "20px" }}>
          {!revealed ? (
            <button
              type="button"
              className="ma-press"
              onClick={() => setRevealed(true)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.22)",
                border: "1px solid rgba(245, 158, 11, 0.5)",
                color: "#fde68a",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Revelar
            </button>
          ) : (
            <button
              type="button"
              className="ma-press"
              onClick={next}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(168, 85, 247, 0.18))",
                border: "1px solid rgba(34, 197, 94, 0.5)",
                color: "#86efac",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Próximo →
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
