"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", icon: "📅", label: "Hoje" },
  { href: "/aprender", icon: "📚", label: "Aprender" },
  { href: "/colecao", icon: "⭐", label: "Coleção" },
  { href: "/definicoes", icon: "⚙️", label: "Mais" },
] as const;

const APRENDER_PREFIXES = [
  "/aprender",
  "/lexico",
  "/citacoes",
  "/perguntas",
  "/falacias",
  "/vieses",
  "/escolas",
  "/autores",
  "/etimologia",
  "/frases-cultas",
  "/conceitos",
  "/retorica",
  "/proverbios",
  "/marcos",
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    if (href === "/aprender")
      return APRENDER_PREFIXES.some((p) => pathname.startsWith(p));
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="ma-sans"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "8px 12px calc(env(safe-area-inset-bottom) + 8px) 12px",
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(245, 158, 11, 0.15)",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${TABS.length}, 1fr)`,
          gap: "4px",
        }}
      >
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="ma-press"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "8px 4px",
                borderRadius: "12px",
                background: active
                  ? "rgba(245, 158, 11, 0.18)"
                  : "transparent",
                color: active ? "#fbbf24" : "var(--fg-muted)",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "11px",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <span style={{ fontSize: "20px", lineHeight: 1 }}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
