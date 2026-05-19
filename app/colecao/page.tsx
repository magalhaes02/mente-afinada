import ColecaoView from "./ColecaoView";

export const metadata = { title: "Coleção · Mente Afinada" };

export default function ColecaoPage() {
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
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, var(--serif-color) 0%, #fbbf24 50%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            A tua coleção
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
            Tudo o que marcaste como guardado. Volta aqui para rever.
          </p>
        </header>

        <ColecaoView />
      </section>
    </main>
  );
}
