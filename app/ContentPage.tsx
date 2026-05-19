import type { ReactNode } from "react";

export default function ContentPage({
  badge,
  title,
  subtitle,
  gradient,
  children,
}: {
  badge: string;
  title: string;
  subtitle: string;
  gradient: string;
  children: ReactNode;
}) {
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
          <div
            className="ma-sans"
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(148, 163, 184, 0.16), rgba(148, 163, 184, 0.08))",
              color: "var(--fg-muted)",
              fontWeight: 800,
              fontSize: "clamp(10px, 2.8vw, 12px)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "12px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
            }}
          >
            {badge}
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              lineHeight: 0.95,
              margin: 0,
              fontWeight: 800,
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h1>
          <p
            className="ma-sans"
            style={{
              margin: "10px 0 0 0",
              color: "var(--fg-muted)",
              fontSize: "clamp(13px, 3.6vw, 15px)",
              fontWeight: 500,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </p>
        </header>

        {children}
      </section>
    </main>
  );
}
