import Link from "next/link";
import { listAllThemes } from "../lib/index-global";

export const metadata = { title: "Temas · Mente Afinada" };

export default function TemasPage() {
  const themes = listAllThemes();

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
              fontSize: "clamp(30px, 8vw, 42px)",
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, var(--serif-color) 0%, #f472b6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            🏷️ Temas
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
            Vê tudo o que existe sobre cada tema — citações, perguntas, conceitos.
          </p>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
          }}
        >
          {themes.map((t) => (
            <li key={t.theme}>
              <Link
                href={`/temas/${encodeURIComponent(t.theme)}`}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, rgba(244, 114, 182, 0.12), rgba(168, 85, 247, 0.06))",
                  border: "1px solid var(--card-border)",
                  textDecoration: "none",
                  color: "var(--fg)",
                }}
              >
                <div
                  className="ma-sans"
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-muted)",
                    marginBottom: "4px",
                  }}
                >
                  {t.count} entrada{t.count === 1 ? "" : "s"}
                </div>
                <div
                  style={{
                    fontSize: "clamp(15px, 4.2vw, 18px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.2,
                  }}
                >
                  {t.theme}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
