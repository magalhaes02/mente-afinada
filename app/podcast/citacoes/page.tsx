import CitacoesNarradasView from "./CitacoesNarradasView";

export const metadata = { title: "Citações narradas · Mente Afinada" };

export default function CitacoesNarradasPage() {
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
        <CitacoesNarradasView />
      </section>
    </main>
  );
}
