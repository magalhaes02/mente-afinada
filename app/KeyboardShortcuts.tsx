"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SHORTCUTS = [
  { key: "h", description: "Ir para Hoje", target: "/" },
  { key: "a", description: "Ir para Aprender", target: "/aprender" },
  { key: "t", description: "Ir para Treinar", target: "/treinar" },
  { key: "c", description: "Ir para Coleção", target: "/colecao" },
  { key: "p", description: "Procurar global", target: "/procurar" },
  { key: "?", description: "Mostrar/esconder atalhos", target: null },
];

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignora se estás dentro de um input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?") {
        e.preventDefault();
        setShowHelp((s) => !s);
        return;
      }
      if (e.key === "Escape") {
        setShowHelp(false);
        return;
      }
      const shortcut = SHORTCUTS.find((s) => s.key === e.key.toLowerCase());
      if (shortcut?.target) {
        e.preventDefault();
        router.push(shortcut.target);
        setShowHelp(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  if (!showHelp) return null;

  return (
    <div
      onClick={() => setShowHelp(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ma-card ma-sans"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "24px",
          borderRadius: "20px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          backdropFilter: "blur(20px)",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px 0",
            fontSize: "20px",
            fontWeight: 800,
            color: "var(--fg)",
          }}
        >
          ⌨️ Atalhos de teclado
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {SHORTCUTS.map((s) => (
            <li
              key={s.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "13px",
                }}
              >
                {s.description}
              </span>
              <kbd
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--card-border)",
                  color: "var(--fg)",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {s.key.toUpperCase()}
              </kbd>
            </li>
          ))}
        </ul>
        <p
          style={{
            margin: "16px 0 0 0",
            fontSize: "11px",
            color: "var(--fg-soft)",
            textAlign: "center",
          }}
        >
          Esc ou clica fora para fechar
        </p>
      </div>
    </div>
  );
}
