"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listHistory } from "./lib/historico";
import type { DailyPayload } from "./lib/types";

function todayLisbon(): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return new Date(parts + "T00:00:00");
}

function daysBetween(dateKey: string): number {
  const past = new Date(dateKey + "T00:00:00");
  return Math.round(
    (todayLisbon().getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export default function Recapitulacao() {
  const [pick, setPick] = useState<{ day: DailyPayload; daysAgo: number } | null>(
    null
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const history = listHistory();
    if (history.length < 2) return;

    // Procura dias 1, 3, 7, 14, 30 atrás
    const targetDistances = [7, 14, 3, 30, 1];
    for (const target of targetDistances) {
      const found = history.find((d) => daysBetween(d.dateKey) === target);
      if (found) {
        setPick({ day: found, daysAgo: target });
        return;
      }
    }
  }, []);

  if (!pick || dismissed) return null;

  return (
    <aside
      className="ma-reveal"
      style={{
        marginBottom: "20px",
        padding: "16px 18px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(168, 85, 247, 0.08))",
        border: "1px solid rgba(96, 165, 250, 0.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          className="ma-sans"
          style={{
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#bfdbfe",
          }}
        >
          🔁 Há {pick.daysAgo} dia{pick.daysAgo === 1 ? "" : "s"}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="ma-sans"
          aria-label="Dispensar"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--fg-soft)",
            fontSize: "16px",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
      <p
        className="ma-sans"
        style={{
          margin: "0 0 10px 0",
          fontSize: "13px",
          color: "var(--fg-muted)",
          fontStyle: "italic",
        }}
      >
        Ainda te lembras da definição desta palavra?
      </p>
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "clamp(22px, 6vw, 26px)",
          fontWeight: 800,
          color: "var(--fg)",
          letterSpacing: "-0.02em",
        }}
      >
        {pick.day.word.word}
      </h3>
      <Link
        href="/historico"
        className="ma-sans ma-press"
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "999px",
          background: "rgba(96, 165, 250, 0.18)",
          border: "1px solid rgba(96, 165, 250, 0.4)",
          color: "#bfdbfe",
          fontSize: "12px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Ver histórico →
      </Link>
    </aside>
  );
}
