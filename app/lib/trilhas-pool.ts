export type TrilhaStep = {
  type: "palavra" | "citacao" | "pergunta" | "falacia" | "vies" | "escola" | "autor" | "etimologia" | "frase" | "conceito" | "retorica" | "proverbio" | "marco" | "mito" | "discurso" | "habito" | "curiosidade" | "geografia";
  id: string;
};

export type Trilha = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  days: number;
  category: "Comunicação" | "Pensamento" | "Cultura" | "Filosofia";
  steps: TrilhaStep[];
};

export const TRILHAS_POOL: Trilha[] = [
  {
    id: "retorica-10-dias",
    name: "Retórica em 10 dias",
    description:
      "Aprende a estruturar um argumento, falar em público, e escrever com força. Das técnicas clássicas de Aristóteles aos hábitos modernos.",
    emoji: "🎤",
    days: 10,
    category: "Comunicação",
    steps: [
      { type: "retorica", id: "ethos" },
      { type: "retorica", id: "pathos" },
      { type: "retorica", id: "logos" },
      { type: "retorica", id: "anafora" },
      { type: "retorica", id: "tricolon" },
      { type: "retorica", id: "antitese" },
      { type: "retorica", id: "concessao" },
      { type: "retorica", id: "storytelling" },
      { type: "retorica", id: "refutacao-preventiva" },
      { type: "discurso", id: "churchill-praias" },
    ],
  },
  {
    id: "vocabulario-entrevistas-7",
    name: "Vocabulário para entrevistas em 7 dias",
    description:
      "Palavras que distinguem em entrevistas profissionais e académicas. De 'paradigma' a 'iníquo' — saber usar com precisão.",
    emoji: "💼",
    days: 7,
    category: "Comunicação",
    steps: [
      { type: "palavra", id: "premissa" },
      { type: "palavra", id: "paradigma" },
      { type: "palavra", id: "pragmatismo" },
      { type: "palavra", id: "equânime" },
      { type: "palavra", id: "profícuo" },
      { type: "palavra", id: "probidade" },
      { type: "palavra", id: "magnânimo" },
    ],
  },
  {
    id: "filosofia-principiantes-15",
    name: "Filosofia para principiantes em 15 dias",
    description:
      "Da Grécia antiga ao existencialismo moderno. As ideias que estruturam todo o pensamento ocidental, sem jargão.",
    emoji: "🏛️",
    days: 15,
    category: "Filosofia",
    steps: [
      { type: "autor", id: "platao" },
      { type: "autor", id: "aristoteles" },
      { type: "escola", id: "estoicismo" },
      { type: "escola", id: "epicurismo" },
      { type: "escola", id: "ceticismo" },
      { type: "autor", id: "kant" },
      { type: "escola", id: "iluminismo" },
      { type: "escola", id: "utilitarismo" },
      { type: "autor", id: "nietzsche" },
      { type: "escola", id: "niilismo" },
      { type: "autor", id: "sartre" },
      { type: "escola", id: "existencialismo" },
      { type: "autor", id: "camus" },
      { type: "autor", id: "beauvoir" },
      { type: "autor", id: "wittgenstein" },
    ],
  },
  {
    id: "armas-debate-7",
    name: "Armas de debate em 7 dias",
    description:
      "As falácias mais comuns e como as detetar e contestar. Sair de qualquer discussão com mais lucidez.",
    emoji: "⚔️",
    days: 7,
    category: "Pensamento",
    steps: [
      { type: "falacia", id: "ad-hominem" },
      { type: "falacia", id: "falsa-dicotomia" },
      { type: "falacia", id: "espantalho" },
      { type: "falacia", id: "apelo-autoridade" },
      { type: "falacia", id: "falsa-causalidade" },
      { type: "falacia", id: "ad-populum" },
      { type: "falacia", id: "declive-escorregadio" },
    ],
  },
  {
    id: "pensar-melhor-10",
    name: "Pensar melhor em 10 dias",
    description:
      "Hábitos mentais e vieses cognitivos. Como o teu cérebro te engana — e como o contrariar com método.",
    emoji: "🧠",
    days: 10,
    category: "Pensamento",
    steps: [
      { type: "vies", id: "confirmacao" },
      { type: "vies", id: "ancoragem" },
      { type: "vies", id: "custos-afundados" },
      { type: "vies", id: "dunning-kruger" },
      { type: "habito", id: "occam" },
      { type: "habito", id: "first-principles" },
      { type: "habito", id: "inversion" },
      { type: "habito", id: "segunda-ordem" },
      { type: "habito", id: "circulo-competencia" },
      { type: "habito", id: "premortem" },
    ],
  },
  {
    id: "cultura-classica-7",
    name: "Cultura clássica em 7 dias",
    description:
      "Mitos, frases em latim, escolas filosóficas antigas. A base cultural que aparece em referências constantes.",
    emoji: "🏺",
    days: 7,
    category: "Cultura",
    steps: [
      { type: "mito", id: "sisifo" },
      { type: "mito", id: "prometeu" },
      { type: "mito", id: "pandora" },
      { type: "mito", id: "icaro" },
      { type: "frase", id: "carpe-diem" },
      { type: "frase", id: "memento-mori" },
      { type: "escola", id: "estoicismo" },
    ],
  },
  {
    id: "literatura-portuguesa-5",
    name: "Literatura portuguesa essencial em 5 dias",
    description:
      "Os autores portugueses que toda a gente devia conhecer um pouco. Não é trabalho de casa — é cultura útil.",
    emoji: "📚",
    days: 5,
    category: "Cultura",
    steps: [
      { type: "autor", id: "pessoa" },
      { type: "autor", id: "saramago" },
      { type: "autor", id: "eca" },
      { type: "autor", id: "lobo-antunes" },
      { type: "discurso", id: "saramago-nobel" },
    ],
  },
];
