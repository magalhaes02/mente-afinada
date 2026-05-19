import CitacaoCegaView from "./CitacaoCegaView";

export const metadata = { title: "Citação cega · Mente Afinada" };

export default function CitacaoCegaPage() {
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
        <CitacaoCegaView />
      </section>
    </main>
  );
}
