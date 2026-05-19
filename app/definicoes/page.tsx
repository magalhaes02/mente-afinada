import DefinicoesView from "./DefinicoesView";

export const metadata = { title: "Definições · Mente Afinada" };

export default function DefinicoesPage() {
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
      <section style={{ maxWidth: "640px", margin: "0 auto" }}>
        <header style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "clamp(30px, 8vw, 42px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
            }}
          >
            Definições
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: "10px 0 0 0",
              color: "var(--fg-muted)",
              fontSize: "clamp(13px, 3.6vw, 15px)",
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            Como queres que a app pareça e funcione.
          </p>
        </header>

        <DefinicoesView />
      </section>
    </main>
  );
}
