"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEfemerideToday, type Efemeride } from "./lib/efemerides";

export default function EfemerideBanner() {
  const [ef, setEf] = useState<Efemeride | null>(null);

  useEffect(() => {
    setEf(getEfemerideToday());
  }, []);

  if (!ef) return null;

  return (
    <aside
      className="ma-card"
      style={{
        marginBottom: "20px",
        padding: "16px 18px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(244, 114, 182, 0.18), rgba(245, 158, 11, 0.10))",
        border: "1px solid rgba(244, 114, 182, 0.4)",
      }}
    >
      <div
        className="ma-sans"
        style={{
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#f9a8d4",
          marginBottom: "6px",
        }}
      >
        📅 Hoje em destaque
      </div>
      <h3
        style={{
          margin: "0 0 6px 0",
          fontSize: "clamp(17px, 4.6vw, 20px)",
          fontWeight: 800,
          color: "var(--fg)",
          lineHeight: 1.3,
        }}
      >
        {ef.title}
      </h3>
      <p
        className="ma-sans"
        style={{
          margin: "0 0 8px 0",
          fontSize: "clamp(13px, 3.6vw, 14px)",
          color: "var(--fg-muted)",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        {ef.description}
      </p>
      {ef.relatedType && ef.relatedId && (
        <Link
          href={
            ef.relatedType === "autor"
              ? "/autores"
              : ef.relatedType === "marco"
              ? "/marcos"
              : "/discursos"
          }
          className="ma-sans ma-press"
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: "999px",
            background: "rgba(244, 114, 182, 0.2)",
            border: "1px solid rgba(244, 114, 182, 0.45)",
            color: "#f9a8d4",
            fontSize: "12px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Ver →
        </Link>
      )}
    </aside>
  );
}
