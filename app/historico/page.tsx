import HistoricoView from "./HistoricoView";

export const metadata = { title: "Histórico · Mente Afinada" };

export default function HistoricoPage() {
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
        <header style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "clamp(30px, 8vw, 42px)",
              margin: 0,
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
            }}
          >
            📅 Histórico
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: "8px 0 0 0",
              color: "var(--fg-muted)",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Os teus últimos dias. Para reler o que te marcou.
          </p>
        </header>
        <HistoricoView />
      </section>
    </main>
  );
}
