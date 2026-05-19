"use client";

import { useEffect, useMemo, useState } from "react";
import { AudioQueue, type Segment, type AudioState } from "./lib/audio";

export default function AudioPlayer({
  segments,
  labels,
  accent = "#a855f7",
}: {
  segments: Segment[];
  labels: string[];
  accent?: string;
}) {
  const queue = useMemo(() => new AudioQueue(), []);
  const [state, setState] = useState<AudioState>("idle");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    queue.load(segments);
    const unsub = queue.subscribe((s) => {
      setState(s.state);
      setIndex(s.index);
    });
    return () => {
      unsub();
      queue.stop();
    };
  }, [queue, segments]);

  const playing = state === "playing";
  const done = state === "ended";

  const togglePlay = () => {
    if (playing) queue.pause();
    else if (done) {
      queue.load(segments);
      queue.play();
    } else queue.play();
  };

  return (
    <div
      className="ma-sans"
      style={{
        padding: "16px 18px",
        borderRadius: "18px",
        background: "var(--card-bg)",
        border: `1px solid ${accent}33`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "12px",
        }}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar" : "Tocar"}
          className="ma-press"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "999px",
            background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
            border: "none",
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          {playing ? "⏸" : done ? "↻" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => queue.skipNext()}
          aria-label="Saltar"
          className="ma-press"
          style={{
            padding: "10px 14px",
            borderRadius: "999px",
            background: "rgba(148, 163, 184, 0.1)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            color: "var(--fg-muted)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          ⏭ Próximo
        </button>
        <button
          type="button"
          onClick={() => queue.stop()}
          aria-label="Parar"
          className="ma-press"
          style={{
            padding: "10px 12px",
            borderRadius: "999px",
            background: "rgba(148, 163, 184, 0.06)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            color: "var(--fg-soft)",
            fontWeight: 700,
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ⏹
        </button>
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "var(--fg-muted)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "6px",
        }}
      >
        {done ? "Concluído" : `Parte ${Math.min(index + 1, labels.length)} de ${labels.length}`}
      </div>
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
        {labels.map((label, i) => {
          const isCurrent = i === index && !done;
          return (
            <li
              key={i}
              style={{
                padding: "8px 10px",
                borderRadius: "8px",
                background: isCurrent ? `${accent}22` : "transparent",
                border: `1px solid ${isCurrent ? accent : "transparent"}33`,
                color: isCurrent ? "var(--fg)" : "var(--fg-muted)",
                fontSize: "13px",
                fontWeight: isCurrent ? 700 : 500,
                cursor: "pointer",
              }}
              onClick={() => {
                queue.goTo(i);
                if (!playing) queue.play();
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>

      <p
        style={{
          margin: "12px 0 0 0",
          fontSize: "11px",
          color: "var(--fg-soft)",
          fontStyle: "italic",
        }}
      >
        🔊 Funciona melhor com auscultadores. Usa a voz do teu telemóvel.
      </p>
    </div>
  );
}
