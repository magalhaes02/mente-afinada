import Link from "next/link";
import { WORD_POOL } from "../lib/lexico-pool";
import { QUOTE_POOL } from "../lib/citacoes-pool";
import { QUESTION_POOL } from "../lib/perguntas-pool";
import { FALACIAS_POOL } from "../lib/falacias-pool";
import { VIESES_POOL } from "../lib/vieses-pool";
import { ESCOLAS_POOL } from "../lib/escolas-pool";
import { AUTORES_POOL } from "../lib/autores-pool";
import { ETIMOLOGIA_POOL } from "../lib/etimologia-pool";
import { FRASES_CULTAS_POOL } from "../lib/frases-cultas-pool";
import { CONCEITOS_POOL } from "../lib/conceitos-pool";
import { RETORICA_POOL } from "../lib/retorica-pool";
import { PROVERBIOS_POOL } from "../lib/proverbios-pool";
import { MARCOS_POOL } from "../lib/marcos-pool";

export const metadata = { title: "Aprender · Mente Afinada" };

type Section = {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  count: number;
  gradient: string;
};

const SECTIONS: Section[] = [
  {
    href: "/lexico",
    icon: "📖",
    title: "Léxico",
    subtitle: "Palavras precisas — saber definir em 1 frase",
    count: WORD_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(244, 114, 182, 0.08))",
  },
  {
    href: "/citacoes",
    icon: "📚",
    title: "Citações",
    subtitle: "Frases de livros reais com significado e contexto",
    count: QUOTE_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(168, 85, 247, 0.08))",
  },
  {
    href: "/perguntas",
    icon: "🤔",
    title: "Perguntas filosóficas",
    subtitle: "Sem resposta certa — várias perspetivas para abrir a cabeça",
    count: QUESTION_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(8, 145, 178, 0.08))",
  },
  {
    href: "/falacias",
    icon: "🪤",
    title: "Falácias lógicas",
    subtitle: "Argumentos que parecem válidos mas não são",
    count: FALACIAS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(248, 113, 113, 0.15), rgba(244, 63, 94, 0.08))",
  },
  {
    href: "/vieses",
    icon: "🧠",
    title: "Vieses cognitivos",
    subtitle: "Erros sistemáticos do cérebro — e como contrariar",
    count: VIESES_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(168, 85, 247, 0.08))",
  },
  {
    href: "/escolas",
    icon: "🎭",
    title: "Escolas filosóficas",
    subtitle: "Estoicismo, Existencialismo, Iluminismo… o que oferecem hoje",
    count: ESCOLAS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.08))",
  },
  {
    href: "/autores",
    icon: "✍️",
    title: "Autores essenciais",
    subtitle: "Pessoa, Saramago, Nietzsche… quem pensou o quê",
    count: AUTORES_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(253, 164, 175, 0.15), rgba(232, 121, 249, 0.08))",
  },
  {
    href: "/etimologia",
    icon: "🔡",
    title: "Etimologia",
    subtitle: "A origem secreta das palavras — saber donde vêm",
    count: ETIMOLOGIA_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(147, 197, 253, 0.15), rgba(56, 189, 248, 0.08))",
  },
  {
    href: "/frases-cultas",
    icon: "🌍",
    title: "Frases cultas",
    subtitle: "Carpe diem, sine qua non, modus operandi… latim e francês",
    count: FRASES_CULTAS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(167, 243, 208, 0.15), rgba(103, 232, 249, 0.08))",
  },
  {
    href: "/conceitos",
    icon: "🔬",
    title: "Conceitos científicos",
    subtitle: "Entropia, evolução, princípio da incerteza — em linguagem simples",
    count: CONCEITOS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(103, 232, 249, 0.15), rgba(56, 189, 248, 0.08))",
  },
  {
    href: "/retorica",
    icon: "🎤",
    title: "Argumentação retórica",
    subtitle: "Ethos, pathos, logos — as ferramentas do bom discurso",
    count: RETORICA_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(252, 211, 77, 0.15), rgba(251, 146, 60, 0.08))",
  },
  {
    href: "/proverbios",
    icon: "💭",
    title: "Provérbios",
    subtitle: "Sabedoria popular — o que significam e quando aplicam",
    count: PROVERBIOS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(253, 186, 116, 0.15), rgba(251, 146, 60, 0.08))",
  },
  {
    href: "/marcos",
    icon: "🏛️",
    title: "Marcos históricos",
    subtitle: "Acontecimentos que mudaram o mundo e nos formaram",
    count: MARCOS_POOL.length,
    gradient:
      "linear-gradient(135deg, rgba(216, 180, 254, 0.15), rgba(167, 139, 250, 0.08))",
  },
];

export default function AprenderPage() {
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
        <header style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "clamp(34px, 9vw, 52px)",
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
            Aprender
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
            13 secções de conteúdo. Mais de {SECTIONS.reduce((a, s) => a + s.count, 0)}{" "}
            entradas curadas.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "1fr 1fr",
            marginBottom: "20px",
          }}
        >
          <Link
            href="/procurar"
            className="ma-press"
            style={{
              padding: "16px 18px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(168, 85, 247, 0.10))",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              textDecoration: "none",
              color: "var(--fg)",
            }}
          >
            <div style={{ fontSize: "26px", lineHeight: 1, marginBottom: "6px" }}>🔍</div>
            <div
              className="ma-sans"
              style={{ fontSize: "15px", fontWeight: 800, marginBottom: "2px" }}
            >
              Procurar tudo
            </div>
            <div
              className="ma-sans"
              style={{ fontSize: "11px", color: "var(--fg-muted)", lineHeight: 1.4 }}
            >
              Em todas as secções de uma vez
            </div>
          </Link>
          <Link
            href="/temas"
            className="ma-press"
            style={{
              padding: "16px 18px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgba(244, 114, 182, 0.18), rgba(168, 85, 247, 0.10))",
              border: "1px solid rgba(244, 114, 182, 0.35)",
              textDecoration: "none",
              color: "var(--fg)",
            }}
          >
            <div style={{ fontSize: "26px", lineHeight: 1, marginBottom: "6px" }}>🏷️</div>
            <div
              className="ma-sans"
              style={{ fontSize: "15px", fontWeight: 800, marginBottom: "2px" }}
            >
              Por temas
            </div>
            <div
              className="ma-sans"
              style={{ fontSize: "11px", color: "var(--fg-muted)", lineHeight: 1.4 }}
            >
              Cruzar conteúdo por tema
            </div>
          </Link>
        </div>

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
          {SECTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="ma-press"
                style={{
                  display: "block",
                  padding: "18px 20px",
                  borderRadius: "18px",
                  background: s.gradient,
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
                  <span style={{ fontSize: "28px", lineHeight: 1 }}>
                    {s.icon}
                  </span>
                  <span
                    className="ma-sans"
                    style={{
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: "rgba(0,0,0,0.18)",
                      color: "var(--fg-muted)",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.count}
                  </span>
                </div>
                <h2
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "clamp(17px, 4.5vw, 19px)",
                    fontWeight: 800,
                    color: "var(--fg)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.title}
                </h2>
                <p
                  className="ma-sans"
                  style={{
                    margin: 0,
                    fontSize: "clamp(12px, 3.4vw, 13px)",
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {s.subtitle}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
