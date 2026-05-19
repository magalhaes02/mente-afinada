"use client";

import { useState } from "react";

export default function PronounceButton({
  text,
  lang = "pt-PT",
}: {
  text: string;
  lang?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      alert("O teu browser não suporta síntese de voz.");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = 0.95;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error("TTS failed:", err);
      setSpeaking(false);
    }
  };

  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={handleClick}
      aria-label={`Ouvir pronúncia de ${text}`}
      title={`Ouvir "${text}"`}
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        background: speaking
          ? "rgba(168, 85, 247, 0.2)"
          : "rgba(148, 163, 184, 0.08)",
        color: speaking ? "#d8b4fe" : "var(--fg-muted)",
        fontWeight: 700,
        fontSize: "12px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        whiteSpace: "nowrap",
      }}
    >
      <span>{speaking ? "🔊" : "🔈"}</span>
      <span>{speaking ? "A ouvir…" : "Ouvir"}</span>
    </button>
  );
}
