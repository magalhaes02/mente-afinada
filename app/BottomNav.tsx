"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", icon: "📅", label: "Hoje" },
  { href: "/lexico", icon: "📖", label: "Léxico" },
  { href: "/citacoes", icon: "📚", label: "Citações" },
  { href: "/perguntas", icon: "🤔", label: "Perguntas" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

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
        background: "rgba(10, 10, 20, 0.88)",
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
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
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
                color: active ? "#fbbf24" : "#a8a29e",
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
