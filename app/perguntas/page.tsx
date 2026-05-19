import PerguntasList from "./PerguntasList";
import { QUESTION_POOL } from "../lib/perguntas-pool";

export const metadata = {
  title: "Perguntas · Mente Afinada",
};

export default function PerguntasPage() {
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
                "linear-gradient(90deg, rgba(20, 184, 166, 0.18), rgba(8, 145, 178, 0.18))",
              color: "#99f6e4",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.8vw, 12px)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "12px",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            🤔 {QUESTION_POOL.length} perguntas
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #f5f5f4 0%, #5eead4 60%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Perguntas que te fazem pensar
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
            Perguntas sem resposta certa. Cada uma com perspetivas filosóficas
            diferentes — para abrires a cabeça, não para a fechar.
          </p>
        </header>

        <PerguntasList questions={QUESTION_POOL} />
      </section>
    </main>
  );
}
