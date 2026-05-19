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

export default function StreakCalendar() {
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    const refresh = () => setDone(new Set(readStreakHistory()));
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
          return (
            <div
              key={key}
              title={`${key}${isDone ? " — completo" : ""}`}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "3px",
                background: isDone
                  ? "linear-gradient(135deg, #f59e0b, #f472b6)"
                  : "rgba(148, 163, 184, 0.12)",
                border: isToday ? "1px solid #fbbf24" : "1px solid transparent",
              }}
            />
          );
        })}
      </div>
      <p
        className="ma-sans"
        style={{
          margin: "12px 0 0 0",
          fontSize: "11px",
          color: "var(--fg-muted)",
        }}
      >
        Cada quadrado é um dia. Quadrados acesos = quiz completado.
      </p>
    </section>
  );
}
