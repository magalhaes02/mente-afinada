import Link from "next/link";
import { TRILHAS_POOL } from "../lib/trilhas-pool";

export const metadata = { title: "Trilhas · Mente Afinada" };

export default function TrilhasPage() {
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
              fontSize: "clamp(30px, 8vw, 44px)",
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, var(--serif-color) 0%, #34d399 50%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            🛤️ Trilhas
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
            Sequências curadas. Aprendizagem com ordem, não aleatoriedade.
          </p>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {TRILHAS_POOL.map((t) => (
            <li key={t.id}>
              <Link
                href={`/trilhas/${t.id}`}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "18px 20px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.12), rgba(103, 232, 249, 0.06))",
                  border: "1px solid rgba(52, 211, 153, 0.25)",
                  textDecoration: "none",
                  color: "var(--fg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "32px", lineHeight: 1 }}>{t.emoji}</span>
                  <span
                    className="ma-sans"
                    style={{
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: "rgba(0,0,0,0.18)",
                      color: "var(--fg-muted)",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    {t.category}
                  </span>
                </div>
                <h2
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "clamp(18px, 5vw, 22px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.name}
                </h2>
                <p
                  className="ma-sans"
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "clamp(13px, 3.6vw, 14px)",
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                    lineHeight: 1.45,
                  }}
                >
                  {t.description}
                </p>
                <div
                  className="ma-sans"
                  style={{
                    fontSize: "11px",
                    color: "#34d399",
                    fontWeight: 700,
                  }}
                >
                  {t.steps.length} passos
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
