import CitacoesList from "./CitacoesList";
import { QUOTE_POOL } from "../lib/citacoes-pool";
import SectionTopBar from "../SectionTopBar";

export const metadata = {
  title: "Citações · Mente Afinada",
};

export default function CitacoesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, var(--bg-gradient-1), var(--bg-gradient-2) 50%, var(--bg-gradient-3))",
        color: "var(--fg)",
        padding: "clamp(16px, 4vw, 40px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 110px)",
      }}
    >
      <section style={{ maxWidth: "720px", margin: "0 auto" }}>
        <SectionTopBar
          tipo="citacao"
          existingTitles={QUOTE_POOL.map((q) => `${q.author} - ${q.book}`)}
        />
        <header style={{ marginBottom: "24px" }}>
          <div
            className="ma-sans"
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(96, 165, 250, 0.18), rgba(168, 85, 247, 0.18))",
              color: "#bfdbfe",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.8vw, 12px)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "12px",
              border: "1px solid rgba(96, 165, 250, 0.3)",
            }}
          >
            📚 {QUOTE_POOL.length} citações
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #f5f5f4 0%, #93c5fd 60%, #d8b4fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Citações
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
            Frases de livros reais, com o que significam e onde nasceram.
          </p>
        </header>

        <CitacoesList quotes={QUOTE_POOL} />
      </section>
    </main>
  );
}
