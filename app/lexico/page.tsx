import LexicoList from "./LexicoList";
import { WORD_POOL } from "../lib/lexico-pool";

export const metadata = {
  title: "Léxico · Mente Afinada",
};

export default function LexicoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #1c1917, #0a0a14 50%, #020617)",
        color: "#f5f5f4",
        padding: "clamp(16px, 4vw, 40px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 110px)",
      }}
    >
      <section style={{ maxWidth: "720px", margin: "0 auto" }}>
        <header style={{ marginBottom: "24px" }}>
          <div
            className="ma-sans"
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(168, 85, 247, 0.18), rgba(244, 114, 182, 0.18))",
              color: "#e9d5ff",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.8vw, 12px)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "12px",
              border: "1px solid rgba(168, 85, 247, 0.3)",
            }}
          >
            📖 {WORD_POOL.length} palavras
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #f5f5f4 0%, #d8b4fe 60%, #f9a8d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Léxico
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: "10px 0 0 0",
              color: "#a8a29e",
              fontSize: "clamp(13px, 3.6vw, 15px)",
              fontWeight: 500,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            Palavras que ouves muitas vezes, mas raramente sabes definir com
            precisão.
          </p>
        </header>

        <LexicoList words={WORD_POOL} />
      </section>
    </main>
  );
}
