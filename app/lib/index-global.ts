import { WORD_POOL, CHALLENGE_POOL } from "./lexico-pool";
import { QUOTE_POOL } from "./citacoes-pool";
import { QUESTION_POOL } from "./perguntas-pool";
import { FALACIAS_POOL } from "./falacias-pool";
import { VIESES_POOL } from "./vieses-pool";
import { ESCOLAS_POOL } from "./escolas-pool";
import { AUTORES_POOL } from "./autores-pool";
import { ETIMOLOGIA_POOL } from "./etimologia-pool";
import { FRASES_CULTAS_POOL } from "./frases-cultas-pool";
import { CONCEITOS_POOL } from "./conceitos-pool";
import { RETORICA_POOL } from "./retorica-pool";
import { PROVERBIOS_POOL } from "./proverbios-pool";
import { MARCOS_POOL } from "./marcos-pool";
import { MITOS_POOL } from "./mitos-pool";
import { DISCURSOS_POOL } from "./discursos-pool";
import { HABITOS_POOL } from "./habitos-pool";
import { CURIOSIDADES_POOL } from "./curiosidades-pool";
import { GEOGRAFIA_POOL } from "./geografia-pool";
import type { FavType } from "./favoritos";

export type IndexEntry = {
  type: FavType;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  haystack: string;
  themes: string[];
  emoji: string;
};

export type TipoInfo = {
  type: FavType;
  label: string;
  emoji: string;
  href: string;
  color: string;
};

export const TIPO_INFO: TipoInfo[] = [
  { type: "palavra", label: "Palavras", emoji: "📖", href: "/lexico", color: "#d8b4fe" },
  { type: "citacao", label: "Citações", emoji: "📚", href: "/citacoes", color: "#bfdbfe" },
  { type: "pergunta", label: "Perguntas", emoji: "🤔", href: "/perguntas", color: "#5eead4" },
  { type: "falacia", label: "Falácias", emoji: "🪤", href: "/falacias", color: "#fca5a5" },
  { type: "vies", label: "Vieses", emoji: "🧠", href: "/vieses", color: "#c084fc" },
  { type: "escola", label: "Escolas", emoji: "🎭", href: "/escolas", color: "#fbbf24" },
  { type: "autor", label: "Autores", emoji: "✍️", href: "/autores", color: "#fda4af" },
  { type: "etimologia", label: "Etimologia", emoji: "🔡", href: "/etimologia", color: "#93c5fd" },
  { type: "frase", label: "Frases cultas", emoji: "🌍", href: "/frases-cultas", color: "#a7f3d0" },
  { type: "conceito", label: "Conceitos", emoji: "🔬", href: "/conceitos", color: "#67e8f9" },
  { type: "retorica", label: "Retórica", emoji: "🎤", href: "/retorica", color: "#fcd34d" },
  { type: "proverbio", label: "Provérbios", emoji: "💭", href: "/proverbios", color: "#fdba74" },
  { type: "marco", label: "Marcos", emoji: "🏛️", href: "/marcos", color: "#d8b4fe" },
];

export const GLOBAL_INDEX: IndexEntry[] = [
  ...WORD_POOL.map((w) => ({
    type: "palavra" as FavType,
    id: w.word.toLowerCase(),
    title: w.word,
    subtitle: w.formalDefinition,
    href: "/lexico",
    haystack: `${w.word} ${w.formalDefinition} ${w.etymology ?? ""} ${w.example} ${w.synonyms.map((s) => s.word + " " + s.nuance).join(" ")} ${w.usage}`.toLowerCase(),
    themes: [],
    emoji: "📖",
  })),
  ...CHALLENGE_POOL.map((c) => ({
    type: "desafio" as FavType,
    id: c.concept.toLowerCase(),
    title: c.concept,
    subtitle: c.preciseAnswer,
    href: "/",
    haystack: `${c.concept} ${c.preciseAnswer} ${c.typicalAnswer} ${c.mnemonic} ${c.whyPrecisionMatters}`.toLowerCase(),
    themes: [],
    emoji: "🎯",
  })),
  ...QUOTE_POOL.map((q, i) => ({
    type: "citacao" as FavType,
    id: `${q.author}::${q.book}::${i}`,
    title: q.text,
    subtitle: `${q.author}, ${q.book}${q.year ? ` (${q.year})` : ""}`,
    href: "/citacoes",
    haystack: `${q.text} ${q.author} ${q.book} ${q.meaning} ${q.context} ${q.theme}`.toLowerCase(),
    themes: q.theme ? [q.theme] : [],
    emoji: "📚",
  })),
  ...QUESTION_POOL.map((q, i) => ({
    type: "pergunta" as FavType,
    id: `q-${i}`,
    title: q.question,
    subtitle: q.theme,
    href: "/perguntas",
    haystack: `${q.question} ${q.theme} ${q.whyItMatters} ${q.trapAnswer} ${q.perspectives.map((p) => p.name + " " + p.view).join(" ")} ${q.pushFurther}`.toLowerCase(),
    themes: q.theme ? [q.theme] : [],
    emoji: "🤔",
  })),
  ...FALACIAS_POOL.map((f) => ({
    type: "falacia" as FavType,
    id: f.id,
    title: f.name,
    subtitle: f.definition,
    href: "/falacias",
    haystack: `${f.name} ${f.latin ?? ""} ${f.definition} ${f.example} ${f.howToSpot} ${f.howToCounter}`.toLowerCase(),
    themes: [f.category],
    emoji: "🪤",
  })),
  ...VIESES_POOL.map((v) => ({
    type: "vies" as FavType,
    id: v.id,
    title: v.name,
    subtitle: v.definition,
    href: "/vieses",
    haystack: `${v.name} ${v.definition} ${v.example} ${v.howItCatchesYou} ${v.howToFight}`.toLowerCase(),
    themes: [v.category],
    emoji: "🧠",
  })),
  ...ESCOLAS_POOL.map((e) => ({
    type: "escola" as FavType,
    id: e.id,
    title: e.name,
    subtitle: e.period,
    href: "/escolas",
    haystack: `${e.name} ${e.origin} ${e.thinkers.join(" ")} ${e.centralIdeas.join(" ")} ${e.todayValue} ${e.motto ?? ""}`.toLowerCase(),
    themes: [],
    emoji: "🎭",
  })),
  ...AUTORES_POOL.map((a) => ({
    type: "autor" as FavType,
    id: a.id,
    title: a.name,
    subtitle: `${a.years} · ${a.origin}`,
    href: "/autores",
    haystack: `${a.name} ${a.years} ${a.origin} ${a.essentialWorks.map((w) => w.title).join(" ")} ${a.centralIdea} ${a.whyMatters} ${a.signatureQuote ?? ""}`.toLowerCase(),
    themes: [],
    emoji: "✍️",
  })),
  ...ETIMOLOGIA_POOL.map((e) => ({
    type: "etimologia" as FavType,
    id: e.id,
    title: e.word,
    subtitle: e.origin,
    href: "/etimologia",
    haystack: `${e.word} ${e.origin} ${e.story} ${e.modernMeaning} ${e.curiosity ?? ""}`.toLowerCase(),
    themes: [],
    emoji: "🔡",
  })),
  ...FRASES_CULTAS_POOL.map((f) => ({
    type: "frase" as FavType,
    id: f.id,
    title: f.phrase,
    subtitle: f.realMeaning,
    href: "/frases-cultas",
    haystack: `${f.phrase} ${f.literalMeaning} ${f.realMeaning} ${f.whenToUse} ${f.example}`.toLowerCase(),
    themes: [f.language],
    emoji: "🌍",
  })),
  ...CONCEITOS_POOL.map((c) => ({
    type: "conceito" as FavType,
    id: c.id,
    title: c.name,
    subtitle: c.definition,
    href: "/conceitos",
    haystack: `${c.name} ${c.definition} ${c.layExplanation} ${c.whyMatters} ${c.curiosity ?? ""}`.toLowerCase(),
    themes: [c.field],
    emoji: "🔬",
  })),
  ...RETORICA_POOL.map((r) => ({
    type: "retorica" as FavType,
    id: r.id,
    title: r.name,
    subtitle: r.definition,
    href: "/retorica",
    haystack: `${r.name} ${r.origin ?? ""} ${r.definition} ${r.example} ${r.whenToUse}`.toLowerCase(),
    themes: [],
    emoji: "🎤",
  })),
  ...PROVERBIOS_POOL.map((p) => ({
    type: "proverbio" as FavType,
    id: p.id,
    title: p.text,
    subtitle: p.meaning,
    href: "/proverbios",
    haystack: `${p.text} ${p.meaning} ${p.whenItApplies} ${p.modernExample ?? ""}`.toLowerCase(),
    themes: [],
    emoji: "💭",
  })),
  ...MARCOS_POOL.map((m) => ({
    type: "marco" as FavType,
    id: m.id,
    title: m.name,
    subtitle: `${m.year} · ${m.place}`,
    href: "/marcos",
    haystack: `${m.name} ${m.year} ${m.place} ${m.whatHappened} ${m.whyMatters} ${m.legacy}`.toLowerCase(),
    themes: [],
    emoji: "🏛️",
  })),
  ...MITOS_POOL.map((m) => ({
    type: "palavra" as FavType,
    id: `mito-${m.id}`,
    title: m.name,
    subtitle: m.modernMeaning.slice(0, 100),
    href: "/mitos",
    haystack: `${m.name} ${m.story} ${m.modernMeaning} ${m.whenWeSay}`.toLowerCase(),
    themes: [m.origin],
    emoji: "🏛️",
  })),
  ...DISCURSOS_POOL.map((d) => ({
    type: "citacao" as FavType,
    id: `discurso-${d.id}`,
    title: d.title,
    subtitle: `${d.speaker} · ${d.date}`,
    href: "/discursos",
    haystack: `${d.title} ${d.speaker} ${d.excerpt} ${d.context} ${d.whyMarked}`.toLowerCase(),
    themes: [],
    emoji: "🎤",
  })),
  ...HABITOS_POOL.map((h) => ({
    type: "conceito" as FavType,
    id: `habito-${h.id}`,
    title: h.name,
    subtitle: h.principle.slice(0, 100),
    href: "/habitos",
    haystack: `${h.name} ${h.origin} ${h.principle} ${h.howToApply} ${h.example}`.toLowerCase(),
    themes: [],
    emoji: "🧩",
  })),
  ...CURIOSIDADES_POOL.map((c) => ({
    type: "conceito" as FavType,
    id: `curiosidade-${c.id}`,
    title: c.title,
    subtitle: c.fact.slice(0, 100),
    href: "/curiosidades",
    haystack: `${c.title} ${c.fact} ${c.whyMatters}`.toLowerCase(),
    themes: [c.category],
    emoji: "🌟",
  })),
  ...GEOGRAFIA_POOL.map((g) => ({
    type: "marco" as FavType,
    id: `geografia-${g.id}`,
    title: g.title,
    subtitle: g.factCorrected.slice(0, 100),
    href: "/geografia",
    haystack: `${g.title} ${g.factCorrected} ${g.whyConfusion}`.toLowerCase(),
    themes: [g.category],
    emoji: "🌍",
  })),
];

export function searchGlobal(query: string, limit = 60): IndexEntry[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return GLOBAL_INDEX.filter((e) =>
    tokens.every((t) => e.haystack.includes(t))
  ).slice(0, limit);
}

export function listAllThemes(): { theme: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of GLOBAL_INDEX) {
    for (const t of e.themes) {
      if (!t) continue;
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count);
}

export function entriesByTheme(theme: string): IndexEntry[] {
  return GLOBAL_INDEX.filter((e) => e.themes.includes(theme));
}

export function findConnections(
  fromType: FavType,
  fromTitle: string,
  limit = 4
): IndexEntry[] {
  const needle = fromTitle.toLowerCase().trim();
  if (needle.length < 3) return [];
  const out: IndexEntry[] = [];
  for (const e of GLOBAL_INDEX) {
    if (e.type === fromType && e.title.toLowerCase() === needle) continue;
    if (e.haystack.includes(needle)) out.push(e);
    if (out.length >= limit * 3) break;
  }
  return out.slice(0, limit);
}
