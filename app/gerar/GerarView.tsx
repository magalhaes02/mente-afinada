"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  addConteudo,
  countByType,
  type ConteudoTipo,
} from "../lib/conteudo-personalizado";
import { WORD_POOL } from "../lib/lexico-pool";
import { QUOTE_POOL } from "../lib/citacoes-pool";
import { QUESTION_POOL } from "../lib/perguntas-pool";
import { FALACIAS_POOL } from "../lib/falacias-pool";
import { VIESES_POOL } from "../lib/vieses-pool";
import { ETIMOLOGIA_POOL } from "../lib/etimologia-pool";
import { FRASES_CULTAS_POOL } from "../lib/frases-cultas-pool";
import { CONCEITOS_POOL } from "../lib/conceitos-pool";
import { RETORICA_POOL } from "../lib/retorica-pool";
import { PROVERBIOS_POOL } from "../lib/proverbios-pool";
import { MARCOS_POOL } from "../lib/marcos-pool";
import { MITOS_POOL } from "../lib/mitos-pool";
import { CURIOSIDADES_POOL } from "../lib/curiosidades-pool";
import { GEOGRAFIA_POOL } from "../lib/geografia-pool";
import { INVENTOS_POOL } from "../lib/inventos-pool";
import { HABITOS_POOL } from "../lib/habitos-pool";

type Section = {
  tipo: ConteudoTipo;
  label: string;
  emoji: string;
  total: number;
  existing: string[];
  color: string;
};

const SECTIONS: Section[] = [
  { tipo: "palavra", label: "Palavras", emoji: "📖", total: WORD_POOL.length, existing: WORD_POOL.map((w) => w.word), color: "#d8b4fe" },
  { tipo: "citacao", label: "Citações", emoji: "📚", total: QUOTE_POOL.length, existing: QUOTE_POOL.map((q) => `${q.author} - ${q.book}`), color: "#bfdbfe" },
  { tipo: "pergunta", label: "Perguntas filosóficas", emoji: "🤔", total: QUESTION_POOL.length, existing: QUESTION_POOL.map((q) => q.question.slice(0, 60)), color: "#5eead4" },
  { tipo: "falacia", label: "Falácias", emoji: "🪤", total: FALACIAS_POOL.length, existing: FALACIAS_POOL.map((f) => f.name), color: "#fca5a5" },
  { tipo: "vies", label: "Vieses", emoji: "🧠", total: VIESES_POOL.length, existing: VIESES_POOL.map((v) => v.name), color: "#c084fc" },
  { tipo: "etimologia", label: "Etimologia", emoji: "🔡", total: ETIMOLOGIA_POOL.length, existing: ETIMOLOGIA_POOL.map((e) => e.word), color: "#93c5fd" },
  { tipo: "frase", label: "Frases cultas", emoji: "🌍", total: FRASES_CULTAS_POOL.length, existing: FRASES_CULTAS_POOL.map((f) => f.phrase), color: "#a7f3d0" },
  { tipo: "conceito", label: "Conceitos científicos", emoji: "🔬", total: CONCEITOS_POOL.length, existing: CONCEITOS_POOL.map((c) => c.name), color: "#67e8f9" },
  { tipo: "retorica", label: "Retórica", emoji: "🎤", total: RETORICA_POOL.length, existing: RETORICA_POOL.map((r) => r.name), color: "#fcd34d" },
  { tipo: "proverbio", label: "Provérbios", emoji: "💭", total: PROVERBIOS_POOL.length, existing: PROVERBIOS_POOL.map((p) => p.text.slice(0, 50)), color: "#fdba74" },
  { tipo: "marco", label: "Marcos históricos", emoji: "🏛️", total: MARCOS_POOL.length, existing: MARCOS_POOL.map((m) => m.name), color: "#d8b4fe" },
  { tipo: "mito", label: "Mitos", emoji: "🏛️", total: MITOS_POOL.length, existing: MITOS_POOL.map((m) => m.name), color: "#fda4af" },
  { tipo: "curiosidade", label: "Curiosidades", emoji: "🌟", total: CURIOSIDADES_POOL.length, existing: CURIOSIDADES_POOL.map((c) => c.title), color: "#fcd34d" },
  { tipo: "geografia", label: "Geografia", emoji: "🌍", total: GEOGRAFIA_POOL.length, existing: GEOGRAFIA_POOL.map((g) => g.title), color: "#93c5fd" },
  { tipo: "invento", label: "Inventos", emoji: "🔧", total: INVENTOS_POOL.length, existing: INVENTOS_POOL.map((i) => i.name), color: "#fcd34d" },
  { tipo: "habito", label: "Hábitos mentais", emoji: "🧩", total: HABITOS_POOL.length, existing: HABITOS_POOL.map((h) => h.name), color: "#67e8f9" },
];

export default function GerarView() {
  const [selected, setSelected] = useState<ConteudoTipo | null>(null);
  const [count, setCount] = useState(3);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<number | null>(null);
  const [personalCounts, setPersonalCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setPersonalCounts(countByType());
    const refresh = () => setPersonalCounts(countByType());
    window.addEventListener("mente-afinada-personalizado-changed", refresh);
    return () =>
      window.removeEventListener(
        "mente-afinada-personalizado-changed",
        refresh
      );
  }, []);

  const handleGenerate = async () => {
    if (!selected || loading) return;
    setLoading(true);
    setError(null);
    setCreated(null);
    const section = SECTIONS.find((s) => s.tipo === selected);
    try {
      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: selected,
          count,
          existingTitles: section?.existing.slice(0, 60),
          instructions: instructions.trim() || undefined,
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
      addConteudo(selected, data.items);
      setCreated(data.items.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 42px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #c084fc 50%, #67e8f9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          ✨ Gerar mais conteúdo
        </h1>
        <p
          className="ma-sans"
          style={{
            margin: "8px 0 0 0",
            color: "var(--fg-muted)",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          Pede à IA para expandir qualquer secção. As entradas novas ficam guardadas
          em <Link href="/minhas-criacoes" style={{ color: "#a855f7" }}>Minhas criações</Link>.
        </p>
      </header>

      <h2
        className="ma-sans"
        style={{
          margin: "0 0 12px 0",
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        1. Que secção?
      </h2>

      <div
        style={{
          display: "grid",
          gap: "8px",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(170px, 100%), 1fr))",
          marginBottom: "24px",
        }}
      >
        {SECTIONS.map((s) => {
          const isSelected = selected === s.tipo;
          const personal = personalCounts[s.tipo] ?? 0;
          return (
            <button
              key={s.tipo}
              type="button"
              className="ma-sans ma-press"
              onClick={() => setSelected(s.tipo)}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: isSelected
                  ? `${s.color}22`
                  : "var(--card-bg)",
                border: `1px solid ${
                  isSelected ? s.color : "var(--card-border)"
                }`,
                color: "var(--fg)",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "20px", lineHeight: 1, marginBottom: "4px" }}>
                {s.emoji}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 800, marginBottom: "2px" }}>
                {s.label} {isSelected && "✓"}
              </div>
              <div style={{ fontSize: "10px", color: s.color, fontWeight: 700 }}>
                {s.total} no catálogo
                {personal > 0 ? ` · +${personal} tuas` : ""}
              </div>
            </button>
          );
        })}
      </div>

      <h2
        className="ma-sans"
        style={{
          margin: "0 0 12px 0",
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        2. Quantas entradas?
      </h2>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {[1, 3, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="ma-sans ma-press"
            onClick={() => setCount(n)}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              background:
                count === n
                  ? "linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(103, 232, 249, 0.18))"
                  : "rgba(148, 163, 184, 0.08)",
              border: `1px solid ${
                count === n
                  ? "rgba(168, 85, 247, 0.55)"
                  : "rgba(148, 163, 184, 0.2)"
              }`,
              color: count === n ? "#e9d5ff" : "var(--fg-muted)",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {n} {n === 1 ? "entrada" : "entradas"}
          </button>
        ))}
      </div>

      <h2
        className="ma-sans"
        style={{
          margin: "0 0 8px 0",
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        3. Algum pedido específico? (opcional)
      </h2>

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder='Ex: "Foca-te em palavras sobre emoções." ou "Inventos só do séc. XX."'
        rows={2}
        className="ma-sans"
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "12px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--fg)",
          fontSize: "14px",
          fontWeight: 500,
          outline: "none",
          resize: "vertical",
          marginBottom: "20px",
          fontFamily: "inherit",
        }}
      />

      <button
        type="button"
        className="ma-sans ma-press"
        onClick={handleGenerate}
        disabled={!selected || loading}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "14px",
          background:
            selected && !loading
              ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(103, 232, 249, 0.22))"
              : "rgba(148, 163, 184, 0.12)",
          border: `1px solid ${
            selected && !loading
              ? "rgba(168, 85, 247, 0.6)"
              : "rgba(148, 163, 184, 0.2)"
          }`,
          color: selected && !loading ? "#e9d5ff" : "var(--fg-soft)",
          fontWeight: 800,
          fontSize: "15px",
          cursor: selected && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading
          ? "A IA está a criar conteúdo novo…"
          : `✨ Gerar ${count} ${
              count === 1 ? "entrada" : "entradas"
            }`}
      </button>

      {error && (
        <div
          className="ma-sans"
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {created !== null && (
        <div
          className="ma-reveal ma-sans"
          style={{
            marginTop: "16px",
            padding: "18px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(168, 85, 247, 0.10))",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            color: "#86efac",
          }}
        >
          ✓ Criadas <strong>{created}</strong> entrada{created === 1 ? "" : "s"}.{" "}
          <Link
            href="/minhas-criacoes"
            style={{ color: "#86efac", textDecoration: "underline" }}
          >
            Ver em Minhas criações →
          </Link>
        </div>
      )}

      <p
        className="ma-sans"
        style={{
          margin: "20px 0 0 0",
          padding: "12px 14px",
          borderRadius: "10px",
          background: "rgba(168, 85, 247, 0.08)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          color: "var(--fg-muted)",
          fontSize: "12px",
          lineHeight: 1.5,
        }}
      >
        💡 As entradas geradas ficam só no teu dispositivo. Podes vê-las, guardar
        nos favoritos, e apagar quando quiseres. A IA evita repetir o que já
        existe no catálogo.
      </p>
    </div>
  );
}
