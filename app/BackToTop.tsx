"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      style={{
        position: "fixed",
        bottom: "calc(env(safe-area-inset-bottom) + 80px)",
        right: "16px",
        zIndex: 60,
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(245, 158, 11, 0.4)",
        color: "#fbbf24",
        fontSize: "18px",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ↑
    </button>
  );
}
