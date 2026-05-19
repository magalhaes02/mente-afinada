"use client";

import { useEffect, useState } from "react";
import type { DailyPayload } from "./lib/types";
import ChallengeCard from "./ChallengeCard";
import WordCard from "./WordCard";
import QuoteCard from "./QuoteCard";
import PhilosophicalQuestionCard from "./PhilosophicalQuestionCard";
import QuizSection from "./QuizSection";
import { saveToHistory } from "./lib/historico";
import { readPreferences } from "./lib/preferencias";

const CACHE_KEY = "mente-afinada-daily";

function todayKeyLisbon(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function readCache(): DailyPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyPayload;
  } catch {
    return null;
  }
}

function writeCache(payload: DailyPayload) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export default function DailyContent() {
  const [data, setData] = useState<DailyPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = todayKeyLisbon();
    const cached = readCache();
    if (
      cached &&
      cached.dateKey === today &&
      cached.word &&
      cached.challenge &&
      cached.quote &&
      cached.question &&
      Array.isArray(cached.quiz)
    ) {
      setData(cached);
      saveToHistory(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const dif = readPreferences().dificuldade;
        const res = await fetch(`/api/daily?dif=${dif}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = (await res.json()) as DailyPayload;
        if (cancelled) return;
        writeCache(payload);
        saveToHistory(payload);
        setData(payload);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="ma-sans"
        style={{
          padding: "32px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
          color: "#a8a29e",
        }}
      >
        A preparar o conteúdo de hoje…
      </div>
    );
  }

  if (error && !data) {
    return (
      <div
        className="ma-sans"
        style={{
          padding: "24px",
          borderRadius: "20px",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#fca5a5",
        }}
      >
        Não consegui carregar o conteúdo. {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <ChallengeCard challenge={data.challenge} />
      <WordCard word={data.word} />
      <QuoteCard quote={data.quote} />
      <PhilosophicalQuestionCard question={data.question} />
      <QuizSection quiz={data.quiz} />
      <p
        className="ma-sans"
        style={{
          margin: "20px 0 0 0",
          textAlign: "center",
          color: "#57534e",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        {data.source === "ai"
          ? "Conteúdo gerado por IA"
          : `Conteúdo do catálogo${
              data.fallbackReason ? ` · ${data.fallbackReason}` : ""
            }`}
      </p>
    </>
  );
}
