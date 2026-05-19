"use client";

import { useMemo } from "react";
import Link from "next/link";
import { findConnections, TIPO_INFO } from "./lib/index-global";
import type { FavType } from "./lib/favoritos";

export default function ConnectionsBlock({
  type,
  title,
  limit = 4,
}: {
  type: FavType;
  title: string;
  limit?: number;
}) {
  const connections = useMemo(
    () => findConnections(type, title, limit),
    [type, title, limit]
  );

  if (connections.length === 0) return null;

  return (
    <section style={{ marginTop: "18px" }}>
      <h3
        className="ma-sans"
        style={{
          margin: "0 0 10px 0",
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        🕸️ Aparece também em
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {connections.map((c) => {
          const info = TIPO_INFO.find((t) => t.type === c.type);
          return (
            <li key={`${c.type}::${c.id}`}>
              <Link
                href={c.href}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
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
                    marginBottom: "2px",
                  }}
                >
                  {c.emoji} {info?.label ?? c.type}
                </div>
                <div
                  style={{
                    fontSize: "clamp(12px, 3.4vw, 14px)",
                    color: "var(--fg)",
                    fontWeight: 600,
                    lineHeight: 1.35,
                  }}
                >
                  {c.title}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
