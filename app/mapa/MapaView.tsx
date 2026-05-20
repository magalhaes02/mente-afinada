"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { listAllThemes, entriesByTheme, TIPO_INFO } from "../lib/index-global";

export default function MapaView() {
  const themes = useMemo(() => listAllThemes(), []);
  const [activeTheme, setActiveTheme] = useState<string | null>(themes[0]?.theme ?? null);

  const entries = activeTheme ? entriesByTheme(activeTheme) : [];

  return (
    <div>
      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 42px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #67e8f9 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          🕸️ Mapa de conceitos
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
          Escolhe um tema central, vê o que orbita à sua volta.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {themes.map((t) => (
          <button
            key={t.theme}
            type="button"
            onClick={() => setActiveTheme(t.theme)}
            className="ma-sans ma-press"
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              background: activeTheme === t.theme
                ? "linear-gradient(135deg, rgba(103, 232, 249, 0.25), rgba(192, 132, 252, 0.18))"
                : "rgba(148, 163, 184, 0.08)",
              border: `1px solid ${
                activeTheme === t.theme
                  ? "rgba(103, 232, 249, 0.55)"
                  : "rgba(148, 163, 184, 0.2)"
              }`,
              color: activeTheme === t.theme ? "#a5f3fc" : "var(--fg-muted)",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t.theme} · {t.count}
          </button>
        ))}
      </div>

      {activeTheme && entries.length > 0 && (
        <div
          style={{
            position: "relative",
            padding: "30px 0",
            minHeight: "400px",
          }}
        >
          {/* Centro */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "240px",
              margin: "0 auto",
              padding: "20px 24px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(103, 232, 249, 0.25), rgba(192, 132, 252, 0.20))",
              border: "2px solid rgba(103, 232, 249, 0.55)",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <div
              className="ma-sans"
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#67e8f9",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "6px",
              }}
            >
              Tema central
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(22px, 6vw, 28px)",
                fontWeight: 800,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {activeTheme}
            </h2>
          </div>

          {/* Conexões */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "10px",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            }}
          >
            {entries.map((e) => {
              const info = TIPO_INFO.find((t) => t.type === e.type);
              return (
                <li key={`${e.type}::${e.id}`}>
                  <Link
                    href={e.href}
                    className="ma-press"
                    style={{
                      display: "block",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      background: `${info?.color ?? "#fbbf24"}10`,
                      border: `1px solid ${info?.color ?? "#fbbf24"}40`,
                      textDecoration: "none",
                      color: "var(--fg)",
                    }}
                  >
                    <div
                      className="ma-sans"
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: info?.color ?? "var(--fg-muted)",
                        marginBottom: "3px",
                      }}
                    >
                      {e.emoji} {info?.label ?? e.type}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(13px, 3.6vw, 15px)",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: "2px",
                      }}
                    >
                      {e.title.length > 70 ? e.title.slice(0, 70) + "…" : e.title}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--fg-muted)",
                        lineHeight: 1.4,
                        fontStyle: "italic",
                      }}
                    >
                      {e.subtitle.length > 80 ? e.subtitle.slice(0, 80) + "…" : e.subtitle}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
