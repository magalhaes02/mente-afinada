import FlashcardView from "./FlashcardView";

export const metadata = { title: "Flashcards · Mente Afinada" };

export default function FlashcardPage() {
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
      <section style={{ maxWidth: "560px", margin: "0 auto" }}>
        <FlashcardView />
      </section>
    </main>
  );
}
