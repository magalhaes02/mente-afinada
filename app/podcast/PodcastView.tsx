"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AudioPlayer from "../AudioPlayer";
import type { DailyPayload } from "../lib/types";

const CACHE_KEY = "mente-afinada-daily";

function readCache(): DailyPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as DailyPayload) : null;
  } catch {
    return null;
  }
}

export default function PodcastView() {
  const [payload, setPayload] = useState<DailyPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setPayload(cached);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/daily", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as DailyPayload;
          setPayload(data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { segments, labels } = useMemo(() => {
    if (!payload)
      return { segments: [] as { text: string; pauseAfterMs?: number }[], labels: [] as string[] };

    const segs: { text: string; pauseAfterMs?: number }[] = [];
    const lbs: string[] = [];

    const today = new Date().toLocaleDateString("pt-PT", {
      timeZone: "Europe/Lisbon",
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    segs.push({
      text: `Mente Afinada. Conteúdo de ${today}.`,
      pauseAfterMs: 1200,
    });
    lbs.push("🎙️ Abertura");

    segs.push({
      text: `Palavra do dia: ${payload.word.word}.`,
      pauseAfterMs: 700,
    });
    segs.push({
      text: payload.word.formalDefinition,
      pauseAfterMs: 1000,
    });
    if (payload.word.example) {
      segs.push({
        text: `Exemplo: ${payload.word.example}`,
        pauseAfterMs: 1200,
      });
    }
    lbs.push(`📖 Palavra: ${payload.word.word}`);

    segs.push({
      text: `Desafio: como explicarias ${payload.challenge.concept}?`,
      pauseAfterMs: 1500,
    });
    segs.push({
      text: `Versão formal: ${payload.challenge.preciseAnswer}`,
      pauseAfterMs: 1200,
    });
    lbs.push(`🧠 Desafio: ${payload.challenge.concept}`);

    segs.push({
      text: `Citação do dia. ${payload.quote.text}`,
      pauseAfterMs: 1200,
    });
    segs.push({
      text: `${payload.quote.author}, em ${payload.quote.book}${
        payload.quote.year ? `, de ${payload.quote.year}` : ""
      }.`,
      pauseAfterMs: 1500,
    });
    if (payload.quote.meaning) {
      segs.push({
        text: `Significado. ${payload.quote.meaning}`,
        pauseAfterMs: 1200,
      });
    }
    lbs.push(`📚 Citação: ${payload.quote.author}`);

    segs.push({
      text: `Pergunta para te fazer pensar: ${payload.question.question}`,
      pauseAfterMs: 2000,
    });
    if (payload.question.pushFurther) {
      segs.push({
        text: `E também: ${payload.question.pushFurther}`,
        pauseAfterMs: 1500,
      });
    }
    lbs.push(`🤔 Pergunta: ${payload.question.theme}`);

    segs.push({
      text: "Fim. Bom dia de afinação.",
      pauseAfterMs: 0,
    });
    lbs.push("🔚 Fecho");

    return { segments: segs, labels: lbs };
  }, [payload]);

  return (
    <div>
      <Link
        href="/"
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
        ← Hoje
      </Link>

      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 40px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #c084fc 50%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          🎧 Podcast de hoje
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
          Ouve o conteúdo do dia. Bom para caminho, ginásio, almoço.
        </p>
      </header>

      {loading && (
        <div
          className="ma-sans"
          style={{
            padding: "30px",
            textAlign: "center",
            color: "var(--fg-muted)",
          }}
        >
          A carregar conteúdo do dia…
        </div>
      )}

      {!loading && segments.length > 0 && (
        <AudioPlayer segments={segments} labels={labels} accent="#a855f7" />
      )}

      {!loading && segments.length === 0 && (
        <div
          className="ma-sans"
          style={{
            padding: "20px",
            borderRadius: "14px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            textAlign: "center",
          }}
        >
          Não consegui carregar o conteúdo. Vai ao{" "}
          <Link href="/" style={{ color: "#a855f7" }}>
            Hoje
          </Link>{" "}
          primeiro para o gerar.
        </div>
      )}
    </div>
  );
}
