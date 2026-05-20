"use client";

import { useState } from "react";
import Link from "next/link";

type Match = {
  word: string;
  definition: string;
  whyFits: string;
};

const EXAMPLES = [
  "aquela palavra que significa quando alguém é arrogante e cai depois",
  "uma ideia generalizada que a sociedade aplica a um grupo",
  "quando duas coisas opostas se contradizem mas ambas são válidas",
  "afastamento sistemático de alguém de um grupo, sem expulsão formal",
];

export default function EncontrarPalavraView() {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const minOk = desc.trim().length >= 8;

  const handleSubmit = async () => {
    if (!minOk || loading) return;
    setLoading(true);
    setError(null);
    setMatches(null);
    try {
      const res = await fetch("/api/encontrar-palavra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { matches: Match[] };
      setMatches(data.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        href="/aprender"
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
        ← Aprender
      </Link>

      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 8vw, 40px)",
            margin: 0,
            fontWeight: 800,
            background:
              "linear-gradient(135deg, var(--serif-color) 0%, #67e8f9 60%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          🔎 Encontrar palavra
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
          Anti-dicionário: descreve um conceito, a IA propõe a palavra do léxico.
        </p>
      </header>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Descreve por palavras tuas o conceito ou sentimento…"
        rows={3}
        className="ma-sans"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--fg)",
          fontSize: "15px",
          fontWeight: 500,
          outline: "none",
          resize: "vertical",
          marginBottom: "10px",
          fontFamily: "inherit",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            type="button"
            className="ma-sans ma-press"
            onClick={() => setDesc(ex)}
            style={{
              padding: "5px 10px",
              borderRadius: "999px",
              background: "rgba(103, 232, 249, 0.08)",
              border: "1px solid rgba(103, 232, 249, 0.25)",
              color: "#67e8f9",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            💡 {ex.slice(0, 40)}…
          </button>
        ))}
      </div>

      <button
        type="button"
        className="ma-sans ma-press"
        onClick={handleSubmit}
        disabled={!minOk || loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          background:
            minOk && !loading
              ? "linear-gradient(135deg, rgba(103, 232, 249, 0.3), rgba(34, 197, 94, 0.18))"
              : "rgba(148, 163, 184, 0.12)",
          border: `1px solid ${
            minOk && !loading
              ? "rgba(103, 232, 249, 0.55)"
              : "rgba(148, 163, 184, 0.2)"
          }`,
          color: minOk && !loading ? "#67e8f9" : "var(--fg-soft)",
          fontWeight: 800,
          fontSize: "15px",
          cursor: minOk && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "A IA está a procurar…" : "Sugerir palavras"}
      </button>

      {error && (
        <div
          className="ma-sans"
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {matches !== null && matches.length === 0 && (
        <div
          className="ma-sans"
          style={{
            marginTop: "16px",
            padding: "20px",
            borderRadius: "14px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Nenhuma palavra do léxico encaixa nesta descrição. Tenta reformular.
        </div>
      )}

      {matches !== null && matches.length > 0 && (
        <ul
          className="ma-reveal"
          style={{
            marginTop: "16px",
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {matches.map((m, i) => (
            <li
              key={i}
              style={{
                padding: "16px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(103, 232, 249, 0.10), rgba(20, 14, 30, 0.5))",
                border: "1px solid rgba(103, 232, 249, 0.3)",
              }}
            >
              <div
                className="ma-sans"
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#67e8f9",
                  marginBottom: "4px",
                }}
              >
                #{i + 1} sugestão
              </div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "clamp(22px, 6vw, 28px)",
                  fontWeight: 800,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                }}
              >
                {m.word}
              </h3>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "clamp(14px, 3.8vw, 16px)",
                  color: "var(--fg)",
                  lineHeight: 1.45,
                  fontStyle: "italic",
                }}
              >
                {m.definition}
              </p>
              {m.whyFits && (
                <p
                  className="ma-sans"
                  style={{
                    margin: 0,
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(103, 232, 249, 0.08)",
                    border: "1px solid rgba(103, 232, 249, 0.25)",
                    color: "#a5f3fc",
                    fontSize: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  💡 {m.whyFits}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
