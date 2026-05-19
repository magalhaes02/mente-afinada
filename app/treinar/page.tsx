import Link from "next/link";

export const metadata = { title: "Treinar · Mente Afinada" };

type Mode = {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  gradient: string;
  needsAI?: boolean;
};

const MODES: Mode[] = [
  {
    href: "/treinar/flashcard",
    icon: "🃏",
    title: "Flashcards",
    subtitle: "Vê a palavra, pensa a definição, revela. Revisão espaçada.",
    gradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.16), rgba(244, 114, 182, 0.08))",
  },
  {
    href: "/treinar/aleatorio",
    icon: "🎲",
    title: "Treino aleatório",
    subtitle: "10 minutos de palavras, citações, conceitos misturados.",
    gradient:
      "linear-gradient(135deg, rgba(96, 165, 250, 0.16), rgba(20, 184, 166, 0.08))",
  },
  {
    href: "/treinar/citacao-cega",
    icon: "🎭",
    title: "Citação cega",
    subtitle: "Lês a citação, adivinhas o autor e o livro.",
    gradient:
      "linear-gradient(135deg, rgba(96, 165, 250, 0.16), rgba(168, 85, 247, 0.08))",
  },
  {
    href: "/treinar/usa-frase",
    icon: "✏️",
    title: "Usa numa frase",
    subtitle: "Escreves uma frase com a palavra. IA dá feedback.",
    gradient:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.16), rgba(20, 184, 166, 0.08))",
    needsAI: true,
  },
  {
    href: "/treinar/explica",
    icon: "🎤",
    title: "Explica-me",
    subtitle: "Escreves a tua explicação de um conceito. IA compara.",
    gradient:
      "linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(244, 114, 182, 0.08))",
    needsAI: true,
  },
];

export default function TreinarPage() {
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
        <header style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, var(--serif-color) 0%, #34d399 60%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Treinar
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
            De ler para fixar. De reconhecer para usar.
          </p>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          }}
        >
          {MODES.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "18px",
                  background: m.gradient,
                  border: "1px solid var(--card-border)",
                  textDecoration: "none",
                  color: "var(--fg)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "32px", lineHeight: 1 }}>
                    {m.icon}
                  </span>
                  {m.needsAI && (
                    <span
                      className="ma-sans"
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: "rgba(168, 85, 247, 0.18)",
                        border: "1px solid rgba(168, 85, 247, 0.45)",
                        color: "#d8b4fe",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.05em",
                      }}
                    >
                      IA
                    </span>
                  )}
                </div>
                <h2
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "clamp(18px, 4.8vw, 21px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.title}
                </h2>
                <p
                  className="ma-sans"
                  style={{
                    margin: 0,
                    fontSize: "clamp(12px, 3.4vw, 14px)",
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {m.subtitle}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
