import Link from "next/link";
import { entriesByTheme, listAllThemes, TIPO_INFO } from "../../lib/index-global";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listAllThemes().map((t) => ({
    tema: encodeURIComponent(t.theme),
  }));
}

export default async function TemaPage({
  params,
}: {
  params: Promise<{ tema: string }>;
}) {
  const { tema } = await params;
  const decoded = decodeURIComponent(tema);
  const entries = entriesByTheme(decoded);

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
        <Link
          href="/temas"
          className="ma-sans"
          style={{
            color: "var(--fg-muted)",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "20px",
            display: "inline-block",
          }}
        >
          ← Temas
        </Link>

        <header style={{ marginBottom: "20px" }}>
          <div
            className="ma-sans"
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: "999px",
              background: "rgba(244, 114, 182, 0.15)",
              border: "1px solid rgba(244, 114, 182, 0.4)",
              color: "#f9a8d4",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "10px",
            }}
          >
            🏷️ Tema
          </div>
          <h1
            style={{
              fontSize: "clamp(30px, 9vw, 48px)",
              margin: 0,
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            {decoded}
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: "8px 0 0 0",
              color: "var(--fg-muted)",
              fontSize: "14px",
            }}
          >
            {entries.length} entrada{entries.length === 1 ? "" : "s"} ligadas a este tema.
          </p>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {entries.map((e) => {
            const info = TIPO_INFO.find((t) => t.type === e.type);
            return (
              <li key={`${e.type}::${e.id}`}>
                <Link
                  href={e.href}
                  className="ma-press"
                  style={{
                    display: "block",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    background: "var(--card-bg)",
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
                      color: info?.color ?? "var(--fg-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    {e.emoji} {info?.label ?? e.type}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(15px, 4.2vw, 17px)",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: "2px",
                    }}
                  >
                    {e.title}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(12px, 3.4vw, 13px)",
                      color: "var(--fg-muted)",
                      lineHeight: 1.45,
                      fontStyle: "italic",
                    }}
                  >
                    {e.subtitle}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
