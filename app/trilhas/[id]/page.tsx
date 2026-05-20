import Link from "next/link";
import { notFound } from "next/navigation";
import { TRILHAS_POOL } from "../../lib/trilhas-pool";
import TrilhaSteps from "./TrilhaSteps";

export const dynamic = "force-static";

export function generateStaticParams() {
  return TRILHAS_POOL.map((t) => ({ id: t.id }));
}

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trilha = TRILHAS_POOL.find((t) => t.id === id);
  if (!trilha) notFound();

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
          href="/trilhas"
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
          ← Trilhas
        </Link>

        <header style={{ marginBottom: "24px" }}>
          <div
            className="ma-sans"
            style={{
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--fg-muted)",
              marginBottom: "8px",
            }}
          >
            {trilha.category}
          </div>
          <h1
            style={{
              fontSize: "clamp(30px, 8vw, 42px)",
              margin: "0 0 10px 0",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            {trilha.emoji} {trilha.name}
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: 0,
              color: "var(--fg-muted)",
              fontSize: "clamp(13px, 3.6vw, 15px)",
              fontWeight: 500,
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            {trilha.description}
          </p>
        </header>

        <TrilhaSteps trilha={trilha} />
      </section>
    </main>
  );
}
