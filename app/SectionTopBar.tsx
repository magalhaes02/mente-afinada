"use client";

import { useState } from "react";
import Link from "next/link";
import {
  addConteudo,
  type ConteudoTipo,
} from "./lib/conteudo-personalizado";

export default function SectionTopBar({
  backHref = "/aprender",
  backLabel = "Aprender",
  tipo,
  existingTitles,
}: {
  backHref?: string;
  backLabel?: string;
  tipo?: ConteudoTipo;
  existingTitles?: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!tipo || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          count: 3,
          existingTitles: existingTitles?.slice(0, 60),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { items: Record<string, unknown>[] };
      if (!Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("IA não devolveu entradas");
      }
      addConteudo(tipo, data.items);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="ma-sans"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      <Link
        href={backHref}
        className="ma-press"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          borderRadius: "999px",
          background: "rgba(148, 163, 184, 0.1)",
          border: "1px solid rgba(148, 163, 184, 0.25)",
          color: "var(--fg-muted)",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: "14px" }}>←</span>
        <span>{backLabel}</span>
      </Link>

      {tipo && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {success && (
            <span
              className="ma-reveal"
              style={{
                fontSize: "11px",
                color: "#86efac",
                fontWeight: 700,
              }}
            >
              ✓ 3 entradas geradas
            </span>
          )}
          {error && (
            <span
              className="ma-reveal"
              style={{
                fontSize: "11px",
                color: "#fca5a5",
                fontWeight: 700,
              }}
            >
              {error.slice(0, 30)}
            </span>
          )}
          <button
            type="button"
            className="ma-press"
            onClick={handleGenerate}
            disabled={loading}
            title="Pedir à IA mais entradas para esta secção"
            style={{
              padding: "7px 14px",
              borderRadius: "999px",
              background: loading
                ? "rgba(148, 163, 184, 0.1)"
                : "linear-gradient(135deg, rgba(168, 85, 247, 0.22), rgba(103, 232, 249, 0.18))",
              border: `1px solid ${
                loading
                  ? "rgba(148, 163, 184, 0.25)"
                  : "rgba(168, 85, 247, 0.5)"
              }`,
              color: loading ? "var(--fg-soft)" : "#e9d5ff",
              fontSize: "13px",
              fontWeight: 800,
              cursor: loading ? "default" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: loading ? "ma-spin 1s linear infinite" : "none",
              }}
            >
              {loading ? "⟳" : "✨"}
            </span>
            <span>{loading ? "A gerar…" : "Gerar mais"}</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes ma-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
