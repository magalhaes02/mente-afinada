"use client";

import { useEffect, useState } from "react";

const KEY = "mente-afinada-onboarded";

const SLIDES = [
  {
    emoji: "🧠",
    title: "Pensar melhor, dizer melhor",
    body:
      "Conteúdo diário para afinares vocabulário, conhecer conceitos, e exprimir-te com precisão.",
  },
  {
    emoji: "📅",
    title: "Todos os dias, 5 cartões",
    body:
      "Um desafio de explicação, uma palavra, uma citação, uma pergunta filosófica, e um quiz.",
  },
  {
    emoji: "📚",
    title: "13 secções para explorares",
    body:
      "Palavras, citações, perguntas, falácias, vieses, escolas, autores, mitos, hábitos e mais. Tudo navegável a teu ritmo.",
  },
  {
    emoji: "🎯",
    title: "10 modos de prática",
    body:
      "Flashcards, treino aleatório, citação cega, e modos com IA para escreveres e receberes feedback.",
  },
  {
    emoji: "⭐",
    title: "A tua coleção",
    body:
      "Guarda o que te marca, adiciona notas pessoais, cria listas próprias. Volta a tudo quando quiseres.",
  },
];

export default function Onboarding() {
  const [shown, setShown] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = window.localStorage.getItem(KEY);
    if (!done) setShown(true);
  }, []);

  const finish = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, "1");
    }
    setShown(false);
  };

  if (!shown) return null;

  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="ma-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "32px 24px",
          borderRadius: "24px",
          background:
            "linear-gradient(160deg, rgba(245, 158, 11, 0.15), rgba(20, 14, 4, 0.9))",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px", lineHeight: 1 }}>
          {slide.emoji}
        </div>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: "clamp(22px, 6vw, 28px)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {slide.title}
        </h2>
        <p
          className="ma-sans"
          style={{
            margin: "0 0 28px 0",
            color: "var(--fg-muted)",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {slide.body}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginBottom: "24px",
          }}
        >
          {SLIDES.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === step ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === step ? "#fbbf24" : "rgba(148, 163, 184, 0.3)",
                transition: "width 0.2s ease",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {step > 0 && (
            <button
              type="button"
              className="ma-sans ma-press"
              onClick={() => setStep((s) => s - 1)}
              style={{
                padding: "12px 18px",
                borderRadius: "12px",
                background: "rgba(148, 163, 184, 0.1)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                color: "var(--fg-muted)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Anterior
            </button>
          )}
          <button
            type="button"
            className="ma-sans ma-press"
            onClick={() => {
              if (isLast) finish();
              else setStep((s) => s + 1);
            }}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f59e0b, #f472b6)",
              border: "none",
              color: "#fff",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {isLast ? "Começar" : "Próximo"}
          </button>
        </div>

        {!isLast && (
          <button
            type="button"
            onClick={finish}
            className="ma-sans"
            style={{
              marginTop: "14px",
              background: "transparent",
              border: "none",
              color: "var(--fg-soft)",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}
