"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  computeBadges,
  computeNivel,
  computeStats,
  type Badge,
  type Nivel,
  type Stats,
} from "../lib/conquistas";

const SEEN_BADGES_KEY = "mente-afinada-badges-vistos";

function readSeenBadges(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_BADGES_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSeenBadges(set: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEEN_BADGES_KEY, JSON.stringify(Array.from(set)));
}

export default function EstatisticasView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [nivel, setNivel] = useState<{
    nivel: Nivel;
    next: Nivel | null;
    progress: number;
  } | null>(null);
  const [newlyEarned, setNewlyEarned] = useState<Set<string>>(new Set());

  useEffect(() => {
    const s = computeStats();
    setStats(s);
    const b = computeBadges(s);
    setBadges(b);
    setNivel(computeNivel(s));

    const seen = readSeenBadges();
    const justEarned = new Set<string>();
    for (const badge of b) {
      if (badge.earned && !seen.has(badge.id)) {
        justEarned.add(badge.id);
        seen.add(badge.id);
      }
    }
    if (justEarned.size > 0) {
      setNewlyEarned(justEarned);
      writeSeenBadges(seen);
    }

    const handler = () => {
      const s2 = computeStats();
      setStats(s2);
      setBadges(computeBadges(s2));
      setNivel(computeNivel(s2));
    };
    window.addEventListener("mente-afinada-favs-changed", handler);
    window.addEventListener("mente-afinada-streak-changed", handler);
    return () => {
      window.removeEventListener("mente-afinada-favs-changed", handler);
      window.removeEventListener("mente-afinada-streak-changed", handler);
    };
  }, []);

  if (!stats || !nivel) return null;

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  return (
    <div>
      <Link
        href="/colecao"
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
        ← Coleção
      </Link>

      <h1
        style={{
          fontSize: "clamp(30px, 8vw, 42px)",
          margin: "0 0 24px 0",
          fontWeight: 800,
          color: "var(--fg)",
          letterSpacing: "-0.03em",
        }}
      >
        📊 Progresso
      </h1>

      <article
        style={{
          padding: "22px 24px",
          borderRadius: "20px",
          background:
            "linear-gradient(160deg, rgba(245, 158, 11, 0.18), rgba(244, 114, 182, 0.08))",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          marginBottom: "20px",
        }}
      >
        <div
          className="ma-sans"
          style={{
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#fcd34d",
            marginBottom: "8px",
          }}
        >
          O teu nível
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "44px", lineHeight: 1 }}>
            {nivel.nivel.emoji}
          </span>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(24px, 6vw, 30px)",
                fontWeight: 800,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              {nivel.nivel.name}
            </h2>
            <p
              className="ma-sans"
              style={{
                margin: "2px 0 0 0",
                fontSize: "13px",
                color: "var(--fg-muted)",
                fontStyle: "italic",
              }}
            >
              {nivel.nivel.description}
            </p>
          </div>
        </div>
        {nivel.next && (
          <>
            <div
              style={{
                height: "8px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.25)",
                overflow: "hidden",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${nivel.progress * 100}%`,
                  background:
                    "linear-gradient(90deg, #f59e0b, #f472b6, #a855f7)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <div
              className="ma-sans"
              style={{
                fontSize: "12px",
                color: "var(--fg-muted)",
                fontWeight: 600,
              }}
            >
              Próximo nível: {nivel.next.emoji} {nivel.next.name}
            </div>
          </>
        )}
      </article>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr",
          marginBottom: "28px",
        }}
      >
        <StatCard
          emoji="⭐"
          label="Itens guardados"
          value={stats.favoritesCount}
        />
        <StatCard
          emoji="🔥"
          label="Maior streak"
          value={`${stats.longestStreak} dias`}
        />
        <StatCard
          emoji="📅"
          label="Dias totais"
          value={stats.streakDaysTotal}
        />
        <StatCard
          emoji="🧪"
          label="Quizzes feitos"
          value={stats.perfectQuizzes}
        />
      </div>

      <h2
        className="ma-sans"
        style={{
          margin: "0 0 12px 0",
          fontSize: "13px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        🏅 Conquistas ({earnedBadges.length}/{badges.length})
      </h2>

      {earnedBadges.length > 0 && (
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            marginBottom: "16px",
          }}
        >
          {earnedBadges.map((b) => (
            <BadgeCard key={b.id} badge={b} fresh={newlyEarned.has(b.id)} />
          ))}
        </div>
      )}

      {lockedBadges.length > 0 && (
        <>
          <h3
            className="ma-sans"
            style={{
              margin: "0 0 10px 0",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--fg-soft)",
            }}
          >
            Por desbloquear
          </h3>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            }}
          >
            {lockedBadges.map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "14px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "4px", lineHeight: 1 }}>
        {emoji}
      </div>
      <div
        style={{
          fontSize: "clamp(20px, 5vw, 24px)",
          fontWeight: 800,
          color: "var(--fg)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        className="ma-sans"
        style={{
          marginTop: "4px",
          fontSize: "11px",
          color: "var(--fg-muted)",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function BadgeCard({ badge, fresh = false }: { badge: Badge; fresh?: boolean }) {
  return (
    <div
      className={fresh ? "ma-celebrate" : ""}
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: badge.earned
          ? fresh
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.30), rgba(244, 114, 182, 0.20))"
            : "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(244, 114, 182, 0.08))"
          : "var(--card-bg)",
        border: badge.earned
          ? fresh
            ? "2px solid #fbbf24"
            : "1px solid rgba(245, 158, 11, 0.45)"
          : "1px solid var(--card-border)",
        opacity: badge.earned ? 1 : 0.55,
        textAlign: "center",
        position: "relative",
      }}
    >
      {fresh && (
        <span
          className="ma-sans"
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            padding: "2px 8px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #f59e0b, #f472b6)",
            color: "#fff",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Novo
        </span>
      )}
      <div
        style={{
          fontSize: "32px",
          marginBottom: "6px",
          lineHeight: 1,
          filter: badge.earned ? "none" : "grayscale(1)",
        }}
      >
        {badge.emoji}
      </div>
      <div
        style={{
          fontSize: "clamp(12px, 3.4vw, 13px)",
          fontWeight: 800,
          color: "var(--fg)",
          marginBottom: "3px",
          lineHeight: 1.2,
        }}
      >
        {badge.name}
      </div>
      <div
        className="ma-sans"
        style={{
          fontSize: "11px",
          color: "var(--fg-muted)",
          lineHeight: 1.35,
        }}
      >
        {badge.description}
      </div>
    </div>
  );
}
