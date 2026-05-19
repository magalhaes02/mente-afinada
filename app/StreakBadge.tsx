"use client";

import { useEffect, useState } from "react";

const STREAK_KEY = "mente-afinada-streak";

type StreakState = {
  count: number;
  lastCompletedDate: string | null;
};

function todayKeyLisbon(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function readStreak(): StreakState {
  if (typeof window === "undefined")
    return { count: 0, lastCompletedDate: null };
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastCompletedDate: null };
    const parsed = JSON.parse(raw) as StreakState;
    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      lastCompletedDate: parsed.lastCompletedDate ?? null,
    };
  } catch {
    return { count: 0, lastCompletedDate: null };
  }
}

export function markTodayCompleted(): StreakState {
  if (typeof window === "undefined") {
    return { count: 0, lastCompletedDate: null };
  }
  const today = todayKeyLisbon();
  const current = readStreak();
  if (current.lastCompletedDate === today) return current;

  let nextCount = 1;
  if (current.lastCompletedDate) {
    const last = new Date(current.lastCompletedDate + "T00:00:00");
    const todayDate = new Date(today + "T00:00:00");
    const diffDays = Math.round(
      (todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) nextCount = current.count + 1;
  }

  const next: StreakState = { count: nextCount, lastCompletedDate: today };
  window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("mente-afinada-streak-changed"));
  return next;
}

export default function StreakBadge() {
  const [state, setState] = useState<StreakState>({
    count: 0,
    lastCompletedDate: null,
  });

  useEffect(() => {
    setState(readStreak());
    const handler = () => setState(readStreak());
    window.addEventListener("mente-afinada-streak-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("mente-afinada-streak-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const today = todayKeyLisbon();
  const doneToday = state.lastCompletedDate === today;

  return (
    <div
      className="ma-sans"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        borderRadius: "999px",
        background: doneToday
          ? "linear-gradient(90deg, rgba(217, 119, 6, 0.22), rgba(245, 158, 11, 0.22))"
          : "rgba(245, 158, 11, 0.10)",
        border: `1px solid ${
          doneToday ? "rgba(245, 158, 11, 0.55)" : "rgba(245, 158, 11, 0.3)"
        }`,
        color: doneToday ? "#fcd34d" : "#fbbf24",
        fontWeight: 700,
        fontSize: "clamp(11px, 3vw, 13px)",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "16px" }}>{doneToday ? "🔥" : "📖"}</span>
      <span>
        {state.count} {state.count === 1 ? "dia" : "dias"}
      </span>
    </div>
  );
}
