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
import { listAllConteudo } from "../lib/conteudo-personalizado";

export default function DashboardView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [nivel, setNivel] = useState<{
    nivel: Nivel;
    next: Nivel | null;
    progress: number;
  } | null>(null);
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const s = computeStats();
      setStats(s);
      setBadges(computeBadges(s));
      setNivel(computeNivel(s));
      setCreatedCount(listAllConteudo().length);
    };
    refresh();
    window.addEventListener("mente-afinada-favs-changed", refresh);
    window.addEventListener("mente-afinada-streak-changed", refresh);
    window.addEventListener("mente-afinada-personalizado-changed", refresh);
    return () => {
      window.removeEventListener("mente-afinada-favs-changed", refresh);
      window.removeEventListener("mente-afinada-streak-changed", refresh);
      window.removeEventListener(
        "mente-afinada-personalizado-changed",
        refresh
      );
    };
  }, []);

  if (!stats || !nivel) return null;

  const earnedBadges = badges.filter((b) => b.earned);

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
        📊 Dashboard
      </h1>

      <article
        style={{
          padding: "20px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(244, 114, 182, 0.08))",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "14px",
          }}
        >
          <span style={{ fontSize: "44px", lineHeight: 1 }}>
            {nivel.nivel.emoji}
          </span>
          <div>
            <div
              className="ma-sans"
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#fcd34d",
                letterSpacing: "0.08em",
              }}
            >
              Nível
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(22px, 6vw, 28px)",
                fontWeight: 800,
              }}
            >
              {nivel.nivel.name}
            </h2>
          </div>
        </div>
        {nivel.next && (
          <div
            style={{
              height: "6px",
              borderRadius: "3px",
              background: "rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${nivel.progress * 100}%`,
                background:
                  "linear-gradient(90deg, #f59e0b, #f472b6, #a855f7)",
              }}
            />
          </div>
        )}
      </article>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr",
          marginBottom: "24px",
        }}
      >
        <Stat emoji="⭐" label="Guardados" value={stats.favoritesCount} />
        <Stat
          emoji="🔥"
          label="Maior streak"
          value={`${stats.longestStreak}d`}
        />
        <Stat emoji="📅" label="Dias totais" value={stats.streakDaysTotal} />
        <Stat emoji="🧪" label="Quizzes" value={stats.perfectQuizzes} />
        <Stat
          emoji="🏅"
          label="Badges"
          value={`${earnedBadges.length}/${badges.length}`}
        />
        <Stat emoji="✨" label="Criadas por ti" value={createdCount} />
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <NavLink
          href="/estatisticas"
          emoji="🏅"
          title="Conquistas"
          subtitle="Badges e níveis em detalhe"
          color="#fbbf24"
        />
        <NavLink
          href="/progresso"
          emoji="📈"
          title="Tu vs catálogo"
          subtitle="% guardado por secção"
          color="#34d399"
        />
        <NavLink
          href="/nuvem"
          emoji="☁️"
          title="Nuvem"
          subtitle="Visualizar coleção"
          color="#67e8f9"
        />
        <NavLink
          href="/historico"
          emoji="📅"
          title="Histórico"
          subtitle="Dias passados"
          color="#bfdbfe"
        />
      </div>
    </div>
  );
}

function Stat({
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
        padding: "14px",
        borderRadius: "12px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div style={{ fontSize: "20px", lineHeight: 1, marginBottom: "4px" }}>
        {emoji}
      </div>
      <div
        style={{
          fontSize: "clamp(18px, 5vw, 22px)",
          fontWeight: 800,
          color: "var(--fg)",
        }}
      >
        {value}
      </div>
      <div
        className="ma-sans"
        style={{
          marginTop: "2px",
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

function NavLink({
  href,
  emoji,
  title,
  subtitle,
  color,
}: {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="ma-press"
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: "var(--card-bg)",
        border: `1px solid ${color}33`,
        textDecoration: "none",
        color: "var(--fg)",
      }}
    >
      <div style={{ fontSize: "22px", lineHeight: 1, marginBottom: "4px" }}>
        {emoji}
      </div>
      <div
        className="ma-sans"
        style={{ fontSize: "13px", fontWeight: 800, marginBottom: "2px" }}
      >
        {title}
      </div>
      <div
        className="ma-sans"
        style={{ fontSize: "11px", color: "var(--fg-muted)" }}
      >
        {subtitle}
      </div>
    </Link>
  );
}
