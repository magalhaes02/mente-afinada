"use client";

import { useState } from "react";

export default function CopyCard({
  label,
  formattedText,
}: {
  label?: string;
  formattedText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={handleCopy}
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        border: `1px solid ${
          copied ? "rgba(34, 197, 94, 0.45)" : "rgba(148, 163, 184, 0.3)"
        }`,
        background: copied
          ? "rgba(34, 197, 94, 0.15)"
          : "rgba(148, 163, 184, 0.08)",
        color: copied ? "#86efac" : "var(--fg-muted)",
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ Copiado" : `📋 ${label ?? "Copiar"}`}
    </button>
  );
}
