"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AUTORES_POOL } from "../lib/autores-pool";
import { MARCOS_POOL } from "../lib/marcos-pool";
import { ESCOLAS_POOL } from "../lib/escolas-pool";
import { INVENTOS_POOL } from "../lib/inventos-pool";

type Event = {
  year: number;
  yearLabel: string;
  type: "autor" | "marco" | "escola" | "invento";
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  href: string;
};

function parseYear(s: string): number {
  // Tries to extract first 4-digit (or year BC) number.
  const m = s.match(/(\d{1,4})\s*(a\.?C\.?|aC)/i);
  if (m) return -parseInt(m[1], 10);
  const m2 = s.match(/(\d{4})/);
  if (m2) return parseInt(m2[1], 10);
  const m3 = s.match(/(\d{1,3})/);
  if (m3) return parseInt(m3[1], 10);
  return 0;
}

function buildEvents(): Event[] {
  const events: Event[] = [];

  for (const a of AUTORES_POOL) {
    const year = parseYear(a.years.split("—")[0].trim());
    if (year === 0) continue;
    events.push({
      year,
      yearLabel: a.years,
      type: "autor",
      title: a.name,
      subtitle: a.centralIdea.slice(0, 80) + (a.centralIdea.length > 80 ? "…" : ""),
      emoji: "✍️",
      color: "#fda4af",
      href: "/autores",
    });
  }
  for (const m of MARCOS_POOL) {
    const year = parseYear(m.year);
    if (year === 0) continue;
    events.push({
      year,
      yearLabel: m.year,
      type: "marco",
      title: m.name,
      subtitle: m.whatHappened.slice(0, 80) + (m.whatHappened.length > 80 ? "…" : ""),
      emoji: "🏛️",
      color: "#d8b4fe",
      href: "/marcos",
    });
  }
  for (const e of ESCOLAS_POOL) {
    const year = parseYear(e.period);
    if (year === 0) continue;
    events.push({
      year,
      yearLabel: e.period,
      type: "escola",
      title: e.name,
      subtitle: e.thinkers.slice(0, 3).join(", "),
      emoji: "🎭",
      color: "#fbbf24",
      href: "/escolas",
    });
  }
  for (const i of INVENTOS_POOL) {
    const year = parseYear(i.year);
    if (year === 0) continue;
    events.push({
      year,
      yearLabel: i.year,
      type: "invento",
      title: i.name,
      subtitle: i.inventor.slice(0, 80),
      emoji: "🔧",
      color: "#fcd34d",
      href: "/inventos",
    });
  }

  return events.sort((a, b) => a.year - b.year);
}

const TYPE_LABELS: Record<string, string> = {
  autor: "Autores",
  marco: "Marcos",
  escola: "Escolas",
  invento: "Inventos",
};

export default function CronologiaView() {
  const allEvents = useMemo(() => buildEvents(), []);
  const [filter, setFilter] = useState<string | null>(null);

  const events = filter ? allEvents.filter((e) => e.type === filter) : allEvents;
  const types = Array.from(new Set(allEvents.map((e) => e.type)));

  return (
    <div>
      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 42px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #fbbf24 50%, #fda4af 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          📅 Cronologia
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
          Autores, marcos, escolas e inventos lado a lado no tempo.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <Chip
          active={filter === null}
          onClick={() => setFilter(null)}
          label={`Tudo · ${allEvents.length}`}
          color="#fbbf24"
        />
        {types.map((t) => {
          const count = allEvents.filter((e) => e.type === t).length;
          return (
            <Chip
              key={t}
              active={filter === t}
              onClick={() => setFilter(filter === t ? null : t)}
              label={`${TYPE_LABELS[t]} · ${count}`}
              color={
                t === "autor"
                  ? "#fda4af"
                  : t === "marco"
                  ? "#d8b4fe"
                  : t === "escola"
                  ? "#fbbf24"
                  : "#fcd34d"
              }
            />
          );
        })}
      </div>

      <div style={{ position: "relative", paddingLeft: "32px" }}>
        <div
          style={{
            position: "absolute",
            left: "12px",
            top: 0,
            bottom: 0,
            width: "2px",
            background:
              "linear-gradient(180deg, #fbbf24, #f472b6, #a855f7, #67e8f9)",
            borderRadius: "1px",
          }}
        />
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {events.map((e, i) => (
            <li
              key={i}
              style={{
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "-26px",
                  top: "10px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "999px",
                  background: e.color,
                  border: "3px solid var(--bg)",
                }}
              />
              <Link
                href={e.href}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: "var(--card-bg)",
                  border: `1px solid ${e.color}33`,
                  textDecoration: "none",
                  color: "var(--fg)",
                }}
              >
                <div
                  className="ma-sans"
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: e.color,
                    letterSpacing: "0.05em",
                    marginBottom: "3px",
                  }}
                >
                  {e.emoji} {e.yearLabel}
                </div>
                <h3
                  style={{
                    margin: "0 0 3px 0",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.25,
                  }}
                >
                  {e.title}
                </h3>
                <p
                  className="ma-sans"
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--fg-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {e.subtitle}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        background: active ? `${color}22` : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${active ? color : "rgba(148, 163, 184, 0.2)"}`,
        color: active ? color : "var(--fg-muted)",
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
