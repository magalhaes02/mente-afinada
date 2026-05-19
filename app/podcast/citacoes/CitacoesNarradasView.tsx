"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AudioPlayer from "../../AudioPlayer";
import { QUOTE_POOL } from "../../lib/citacoes-pool";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function CitacoesNarradasView() {
  const [count, setCount] = useState(5);
  const [withMeaning, setWithMeaning] = useState(true);
  const [seed, setSeed] = useState(0);

  const { segments, labels } = useMemo(() => {
    const selection = shuffle(QUOTE_POOL).slice(0, count);
    const segs: { text: string; pauseAfterMs?: number; rate?: number }[] = [];
    const lbs: string[] = [];

    segs.push({
      text: `Citações narradas. ${count} citações de livros.`,
      pauseAfterMs: 1000,
    });
    lbs.push("🎙️ Abertura");

    for (const q of selection) {
      segs.push({
        text: q.text,
        rate: 0.88,
        pauseAfterMs: 1300,
      });
      segs.push({
        text: `${q.author}, em ${q.book}${q.year ? `, de ${q.year}` : ""}.`,
        rate: 0.95,
        pauseAfterMs: 1500,
      });
      if (withMeaning && q.meaning) {
        segs.push({
          text: q.meaning,
          rate: 0.95,
          pauseAfterMs: 2000,
        });
      } else {
        segs.push({ text: "", pauseAfterMs: 1500 });
      }
      lbs.push(`📚 ${q.author} — ${q.book}`);
    }

    return { segments: segs, labels: lbs };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, withMeaning, seed]);

  return (
    <div>
      <Link
        href="/podcast"
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
        ← Podcast
      </Link>

      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(26px, 7vw, 36px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #60a5fa 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          📻 Citações narradas
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
          {count} citações lidas com pausas. Ouve sem olhar para o ecrã.
        </p>
      </header>

      <div
        className="ma-sans"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {[3, 5, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setCount(n);
              setSeed((s) => s + 1);
            }}
            className="ma-press"
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              background:
                count === n ? "rgba(96, 165, 250, 0.22)" : "rgba(148, 163, 184, 0.08)",
              border: `1px solid ${
                count === n ? "rgba(96, 165, 250, 0.55)" : "rgba(148, 163, 184, 0.2)"
              }`,
              color: count === n ? "#bfdbfe" : "var(--fg-muted)",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {n} citações
          </button>
        ))}
        <button
          type="button"
          onClick={() => setWithMeaning((w) => !w)}
          className="ma-press"
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            background: withMeaning
              ? "rgba(168, 85, 247, 0.22)"
              : "rgba(148, 163, 184, 0.08)",
            border: `1px solid ${
              withMeaning ? "rgba(168, 85, 247, 0.55)" : "rgba(148, 163, 184, 0.2)"
            }`,
            color: withMeaning ? "#d8b4fe" : "var(--fg-muted)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {withMeaning ? "✓ Com significado" : "Só citação"}
        </button>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="ma-press"
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(148, 163, 184, 0.08)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            color: "var(--fg-muted)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          🔀 Baralhar
        </button>
      </div>

      <AudioPlayer segments={segments} labels={labels} accent="#60a5fa" />
    </div>
  );
}
