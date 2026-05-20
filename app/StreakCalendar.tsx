"use client";

import { useEffect, useState } from "react";
import { readStreakHistory } from "./StreakBadge";

const WEEKS = 12;

function todayLisbonDate(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return new Date(parts + "T00:00:00");
}

function formatKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function readQuizScores(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem("mente-afinada-quiz-answers");
    return raw ? (JSON.parse(raw) as Record<string, number[]>) : {};
  } catch {
    return {};
  }
}

function tintForDay(
  isDone: boolean,
  streakLen: number,
  hasPerfectQuiz: boolean
): string {
  if (!isDone) return "rgba(148, 163, 184, 0.12)";
  if (hasPerfectQuiz)
    return "linear-gradient(135deg, #fbbf24, #f59e0b, #f472b6)";
  if (streakLen >= 7)
    return "linear-gradient(135deg, #f59e0b, #f472b6)";
  if (streakLen >= 3)
    return "linear-gradient(135deg, #f97316, #f59e0b)";
  return "linear-gradient(135deg, #d97706, #b45309)";
}

export default function StreakCalendar() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [completedQuizDays, setCompletedQuizDays] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const refresh = () => {
      setDone(new Set(readStreakHistory()));
      const scores = readQuizScores();
      const perfect = new Set<string>();
      for (const [dateKey, arr] of Object.entries(scores)) {
        if (Array.isArray(arr) && arr.length === 5 && arr.every((a) => a !== undefined)) {
          perfect.add(dateKey);
        }
      }
      setCompletedQuizDays(perfect);
    };
    refresh();
    window.addEventListener("mente-afinada-streak-changed", refresh);
    return () =>
      window.removeEventListener("mente-afinada-streak-changed", refresh);
  }, []);

  const today = todayLisbonDate();
  const days: Date[] = [];
  for (let i = WEEKS * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  // Calcular o tamanho do streak local para cada dia
  const streakLengths = new Map<string, number>();
  for (let i = 0; i < days.length; i++) {
    const key = formatKey(days[i]);
    if (!done.has(key)) {
      streakLengths.set(key, 0);
      continue;
    }
    // contar para trás
    let len = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (done.has(formatKey(days[j]))) len++;
      else break;
    }
    // contar para a frente
    for (let j = i + 1; j < days.length; j++) {
      if (done.has(formatKey(days[j]))) len++;
      else break;
    }
    streakLengths.set(key, len);
  }

  return (
    <section
      style={{
        marginTop: "28px",
        padding: "18px",
        borderRadius: "18px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <h3
        className="ma-sans"
        style={{
          margin: "0 0 10px 0",
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        🔥 Últimas {WEEKS} semanas
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
          gridAutoRows: "1fr",
          gap: "3px",
          maxWidth: "100%",
        }}
      >
        {days.map((d) => {
          const key = formatKey(d);
          const isDone = done.has(key);
          const isToday = formatKey(today) === key;
          const streakLen = streakLengths.get(key) ?? 0;
          const isPerfect = completedQuizDays.has(key);
          const tint = tintForDay(isDone, streakLen, isPerfect);
          return (
            <div
              key={key}
              title={`${key}${isDone ? ` — ${streakLen} dia${
                streakLen > 1 ? "s" : ""
              } seguidos${isPerfect ? " · quiz completo" : ""}` : ""}`}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "3px",
                background: tint,
                border: isToday ? "1px solid #fbbf24" : "1px solid transparent",
              }}
            />
          );
        })}
      </div>
      <div
        className="ma-sans"
        style={{
          marginTop: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          fontSize: "11px",
          color: "var(--fg-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: "rgba(148, 163, 184, 0.12)",
            }}
          />
          <span>Por fazer</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #d97706, #b45309)",
            }}
          />
          <span>Iniciado</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #f59e0b, #f472b6)",
            }}
          />
          <span>Streak forte</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background:
                "linear-gradient(135deg, #fbbf24, #f59e0b, #f472b6)",
            }}
          />
          <span>Quiz completo</span>
        </div>
      </div>
    </section>
  );
}
