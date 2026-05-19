import DailyContent from "./DailyContent";
import StreakBadge from "./StreakBadge";
import StreakCalendar from "./StreakCalendar";

export default function Home() {
  const todayLabel = new Date().toLocaleDateString("pt-PT", {
    timeZone: "Europe/Lisbon",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

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
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div style={{ flex: "1 1 auto", minWidth: 0 }}>
            <div
              className="ma-sans"
              style={{
                display: "inline-block",
                padding: "5px 12px",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, rgba(245, 158, 11, 0.18), rgba(168, 85, 247, 0.18))",
                color: "#fde68a",
                fontWeight: 800,
                fontSize: "clamp(10px, 2.8vw, 12px)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "12px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              {todayLabel}
            </div>
            <h1
              style={{
                fontSize: "clamp(34px, 10vw, 56px)",
                lineHeight: 0.95,
                margin: 0,
                fontWeight: 800,
                background:
                  "linear-gradient(135deg, var(--serif-color) 0%, #fbbf24 50%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
              }}
            >
              Mente Afinada
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
              Pensar melhor, dizer melhor.
            </p>
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <StreakBadge />
          </div>
        </header>

        <DailyContent />

        <StreakCalendar />

        <footer
          className="ma-sans"
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "var(--fg-soft)",
            fontSize: "clamp(11px, 3vw, 13px)",
            fontWeight: 600,
          }}
        >
          1 conceito · 1 palavra · 1 citação · 1 pergunta · quiz
        </footer>
      </section>
    </main>
  );
}
