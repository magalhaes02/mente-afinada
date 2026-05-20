"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgressByType } from "../lib/progresso";
import { WORD_POOL, CHALLENGE_POOL } from "../lib/lexico-pool";
import { QUOTE_POOL } from "../lib/citacoes-pool";
import { QUESTION_POOL } from "../lib/perguntas-pool";
import { FALACIAS_POOL } from "../lib/falacias-pool";
import { VIESES_POOL } from "../lib/vieses-pool";
import { ESCOLAS_POOL } from "../lib/escolas-pool";
import { AUTORES_POOL } from "../lib/autores-pool";
import { ETIMOLOGIA_POOL } from "../lib/etimologia-pool";
import { FRASES_CULTAS_POOL } from "../lib/frases-cultas-pool";
import { CONCEITOS_POOL } from "../lib/conceitos-pool";
import { RETORICA_POOL } from "../lib/retorica-pool";
import { PROVERBIOS_POOL } from "../lib/proverbios-pool";
import { MARCOS_POOL } from "../lib/marcos-pool";
import { listFavorites } from "../lib/favoritos";

type Row = {
  type: string;
  label: string;
  emoji: string;
  color: string;
  total: number;
  href: string;
};

const ROWS: Row[] = [
  { type: "palavra", label: "Léxico", emoji: "📖", color: "#d8b4fe", total: WORD_POOL.length, href: "/lexico" },
  { type: "citacao", label: "Citações", emoji: "📚", color: "#bfdbfe", total: QUOTE_POOL.length, href: "/citacoes" },
  { type: "pergunta", label: "Perguntas", emoji: "🤔", color: "#5eead4", total: QUESTION_POOL.length, href: "/perguntas" },
  { type: "falacia", label: "Falácias", emoji: "🪤", color: "#fca5a5", total: FALACIAS_POOL.length, href: "/falacias" },
  { type: "vies", label: "Vieses", emoji: "🧠", color: "#c084fc", total: VIESES_POOL.length, href: "/vieses" },
  { type: "escola", label: "Escolas", emoji: "🎭", color: "#fbbf24", total: ESCOLAS_POOL.length, href: "/escolas" },
  { type: "autor", label: "Autores", emoji: "✍️", color: "#fda4af", total: AUTORES_POOL.length, href: "/autores" },
  { type: "etimologia", label: "Etimologia", emoji: "🔡", color: "#93c5fd", total: ETIMOLOGIA_POOL.length, href: "/etimologia" },
  { type: "frase", label: "Frases cultas", emoji: "🌍", color: "#a7f3d0", total: FRASES_CULTAS_POOL.length, href: "/frases-cultas" },
  { type: "conceito", label: "Conceitos", emoji: "🔬", color: "#67e8f9", total: CONCEITOS_POOL.length, href: "/conceitos" },
  { type: "retorica", label: "Retórica", emoji: "🎤", color: "#fcd34d", total: RETORICA_POOL.length, href: "/retorica" },
  { type: "proverbio", label: "Provérbios", emoji: "💭", color: "#fdba74", total: PROVERBIOS_POOL.length, href: "/proverbios" },
  { type: "marco", label: "Marcos", emoji: "🏛️", color: "#d8b4fe", total: MARCOS_POOL.length, href: "/marcos" },
  { type: "desafio", label: "Desafios", emoji: "🎯", color: "#fde68a", total: CHALLENGE_POOL.length, href: "/" },
];

export default function ProgressoView() {
  const [favCounts, setFavCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const refresh = () => {
      const counts: Record<string, number> = {};
      for (const f of listFavorites()) counts[f.type] = (counts[f.type] ?? 0) + 1;
      setFavCounts(counts);
    };
    refresh();
    window.addEventListener("mente-afinada-favs-changed", refresh);
    return () =>
      window.removeEventListener("mente-afinada-favs-changed", refresh);
  }, []);

  // Approximation: "viste" = items guardados (favoritos é o sinal mais forte de exposição deliberada)
  const totalEntries = ROWS.reduce((a, r) => a + r.total, 0);
  const totalSeen = Object.values(favCounts).reduce((a, n) => a + (n ?? 0), 0);
  const overall = totalEntries > 0 ? totalSeen / totalEntries : 0;

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
          color: "var(--fg)",
          letterSpacing: "-0.03em",
        }}
      >
        📊 Tu vs catálogo
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
        Quanto do catálogo já guardaste. Mais alto = mais valor pessoal recolhido.
      </p>

      <div
        style={{
          padding: "18px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(244, 114, 182, 0.08))",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          marginBottom: "24px",
        }}
      >
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
          Total
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(28px, 8vw, 40px)",
              fontWeight: 800,
              color: "var(--fg)",
              lineHeight: 1,
            }}
          >
            {totalSeen}
          </span>
          <span className="ma-sans" style={{ color: "var(--fg-muted)" }}>
            / {totalEntries} entradas guardadas
          </span>
        </div>
        <div
          style={{
            height: "8px",
            borderRadius: "4px",
            background: "rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${overall * 100}%`,
              background: "linear-gradient(90deg, #f59e0b, #f472b6, #a855f7)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
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
        {ROWS.map((r) => {
          const count = favCounts[r.type] ?? 0;
          const pct = r.total > 0 ? count / r.total : 0;
          return (
            <li key={r.type}>
              <Link
                href={r.href}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "14px 16px",
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: "14px" }}>
                    {r.emoji} {r.label}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: r.color,
                      fontWeight: 700,
                    }}
                  >
                    {count} / {r.total}
                  </span>
                </div>
                <div
                  style={{
                    height: "5px",
                    borderRadius: "3px",
                    background: "rgba(0,0,0,0.25)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct * 100}%`,
                      background: r.color,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
