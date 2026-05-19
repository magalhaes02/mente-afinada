import type {
  ExplainChallenge,
  Quote,
  QuizQuestion,
  Word,
} from "./types";
import { geminiFetchWithRetry } from "./gemini-retry";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `És um curador de cultura geral e linguagem culta para um leitor português europeu (PT-PT) que quer pensar com mais clareza e expressar-se com mais precisão.

OBJETIVO: gerar num único turno (A) palavra do dia, (B) desafio de explicação, (C) citação de livro, (D) quiz de 5 perguntas.

FOCO: vocabulário formal de uso real (não palavras raras que ninguém usa), conceitos que pessoas cultas conhecem, e literatura mundial e portuguesa.

================================
PARTE A — PALAVRA DO DIA
================================

Uma palavra portuguesa de uso médio-alto que muita gente reconhece mas não consegue definir com precisão em 1 frase. Não palavras raras nem técnicas obscuras — palavras que aparecem em jornais, livros, conversas educadas.

Exemplos do nível certo: estereótipo, premissa, paradigma, dicotomia, empatia, pragmatismo, ceticismo, niilismo, antinomia, axioma, epifania, alegoria, hipérbole, eufemismo, meritocracia, nepotismo, demagogia, catarse, ironia, hubris, dialética, falácia, maiêutica.

Para cada palavra, inclui:
- Definição formal precisa (1 frase, como se fosse dicionário)
- Etimologia (se for interessante — opcional)
- Exemplo numa frase real
- 3 sinónimos com nuance (em que diferem do termo)
- Uso prático: quando usar esta palavra em vez de termos mais comuns

================================
PARTE B — DESAFIO DE EXPLICAÇÃO
================================

Apresenta um CONCEITO e contrasta:
- typicalAnswer: a explicação típica que muita gente daria (usando exemplos, hesitante, longa) — uma frase realista de como alguém comum explicaria
- preciseAnswer: a versão formal em 1 frase precisa, como num manual ou enciclopédia
- whyPrecisionMatters: porque é que a versão formal é melhor em certos contextos (entrevistas, debates, textos formais)
- mnemonic: truque mental curto para memorizar a estrutura essencial
- relatedConcept (opcional): conceito relacionado + como se distingue

Conceitos a usar: estereótipo, paradigma, ironia, sarcasmo, empatia vs simpatia, ética vs moral, democracia, capitalismo, método científico, inflação, juros compostos, efeito borboleta, maiêutica, dialética, falácia (e tipos específicos), janela de Overton, hubris, anomia, alienação, contrato social, mais-valia, viés de confirmação, etc.

================================
PARTE C — CITAÇÃO DE LIVRO
================================

Uma citação REAL de um livro REAL com autor REAL. NUNCA inventes citações nem livros. Se não tens certeza, escolhe um que conheças bem.

Inclui:
- text: a citação exata, em português
- author: autor
- book: título do livro
- year: ano de publicação (se souberes — opcional, mas só se for verdadeiro)
- meaning: o que significa em profundidade (2-3 frases)
- context: enquadramento do autor/livro e da frase (2-3 frases)
- theme: tema único curto (ex: "Liberdade", "Modernidade", "Identidade")

Autores fiáveis: Pessoa (e heterónimos), Saramago, Eça de Queirós, Lobo Antunes, Camões, Sócrates/Platão, Nietzsche, Sartre, de Beauvoir, Camus, Marx, Hegel, Descartes, Dostoiévski, Tolstoi, Kafka, Borges, García Márquez, Shakespeare, Dickens, Austen, Wittgenstein, Ortega y Gasset, Wilde.

================================
PARTE D — QUIZ (5 PERGUNTAS)
================================

5 perguntas de escolha múltipla com 4 opções cada, testando:
1. A definição da palavra do dia (qual destas opções é a definição correta?)
2. O conceito do desafio (qual é a versão formal correta?)
3. Atribuição da citação (de que livro é? quem escreveu?)
4. Conhecimento geral conectado (sinónimos, distinções entre conceitos)
5. Aplicação prática (em que contexto usarias X?)

REGRAS:
- 4 opções por pergunta, correctIndex de 0 a 3.
- VARIA o correctIndex (não respondas sempre na mesma posição).
- Opções erradas PLAUSÍVEIS, não óbvias.
- Explicações curtas (1-3 frases) mas com substância.

================================
FORMATO OBRIGATÓRIO (apenas JSON, sem markdown, sem \`\`\`)
================================

{
  "word": {
    "word": "Palavra",
    "formalDefinition": "Definição em 1 frase precisa.",
    "etymology": "Opcional, só se interessante.",
    "example": "Exemplo numa frase.",
    "synonyms": [
      {"word": "Sinónimo 1", "nuance": "Em que difere"},
      {"word": "Sinónimo 2", "nuance": "Em que difere"},
      {"word": "Sinónimo 3", "nuance": "Em que difere"}
    ],
    "usage": "Quando usar esta palavra em vez de termos mais comuns."
  },
  "challenge": {
    "concept": "Conceito a explicar",
    "typicalAnswer": "Explicação típica realista, usando exemplos.",
    "preciseAnswer": "Versão formal em 1 frase.",
    "whyPrecisionMatters": "Porque é que a versão formal é melhor em certos contextos.",
    "mnemonic": "Truque mental curto.",
    "relatedConcept": {
      "concept": "Conceito relacionado",
      "how": "Como se distingue."
    }
  },
  "quote": {
    "text": "A citação exata.",
    "author": "Autor real",
    "book": "Livro real",
    "year": "Ano (opcional)",
    "meaning": "Significado profundo, 2-3 frases.",
    "context": "Contexto do autor/livro/frase, 2-3 frases.",
    "theme": "Tema único curto"
  },
  "quiz": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0-3,
      "explanation": "Porquê esta é a certa."
    },
    ... mais 4 perguntas ...
  ]
}

REGRAS FINAIS:
- TUDO em português europeu (PT-PT).
- Surpreende — não repetes sempre as mesmas palavras/conceitos/citações.
- A palavra, o conceito do desafio e a citação devem ser de TEMAS DIFERENTES para variedade.
- NUNCA inventes citações. Se não confias, usa um clássico que conheças bem.`;

type GeminiResponse = {
  candidates?: {
    content?: { parts?: { text?: string }[] };
  }[];
};

function parseWord(raw: unknown): Word {
  const w = (raw ?? {}) as Record<string, unknown>;
  const syns = Array.isArray(w.synonyms)
    ? (w.synonyms as unknown[]).map((s) => {
        const sw = (s ?? {}) as Record<string, unknown>;
        return {
          word: String(sw.word ?? "").trim(),
          nuance: String(sw.nuance ?? "").trim(),
        };
      }).filter((s) => s.word)
    : [];
  if (!w.word || !w.formalDefinition || syns.length === 0) {
    throw new Error("Palavra inválida na resposta da Gemini");
  }
  return {
    word: String(w.word).trim(),
    formalDefinition: String(w.formalDefinition).trim(),
    etymology: w.etymology ? String(w.etymology).trim() : undefined,
    example: String(w.example ?? "").trim(),
    synonyms: syns,
    usage: String(w.usage ?? "").trim(),
  };
}

function parseChallenge(raw: unknown): ExplainChallenge {
  const c = (raw ?? {}) as Record<string, unknown>;
  if (!c.concept || !c.preciseAnswer) {
    throw new Error("Desafio inválido na resposta da Gemini");
  }
  let related: ExplainChallenge["relatedConcept"] = undefined;
  if (c.relatedConcept && typeof c.relatedConcept === "object") {
    const r = c.relatedConcept as Record<string, unknown>;
    if (r.concept && r.how) {
      related = {
        concept: String(r.concept).trim(),
        how: String(r.how).trim(),
      };
    }
  }
  return {
    concept: String(c.concept).trim(),
    typicalAnswer: String(c.typicalAnswer ?? "").trim(),
    preciseAnswer: String(c.preciseAnswer).trim(),
    whyPrecisionMatters: String(c.whyPrecisionMatters ?? "").trim(),
    mnemonic: String(c.mnemonic ?? "").trim(),
    relatedConcept: related,
  };
}

function parseQuote(raw: unknown): Quote {
  const q = (raw ?? {}) as Record<string, unknown>;
  if (!q.text || !q.author || !q.book) {
    throw new Error("Citação inválida na resposta da Gemini");
  }
  return {
    text: String(q.text).trim(),
    author: String(q.author).trim(),
    book: String(q.book).trim(),
    year: q.year ? String(q.year).trim() : undefined,
    meaning: String(q.meaning ?? "").trim(),
    context: String(q.context ?? "").trim(),
    theme: String(q.theme ?? "").trim() || "Geral",
  };
}

function parseQuiz(raw: unknown): QuizQuestion[] {
  if (!Array.isArray(raw)) throw new Error("Quiz inválido");
  const out: QuizQuestion[] = [];
  for (const item of raw as unknown[]) {
    const q = (item ?? {}) as Record<string, unknown>;
    const opts = Array.isArray(q.options)
      ? (q.options as unknown[]).map((o) => String(o))
      : [];
    if (opts.length !== 4) continue;
    const idx = Number(q.correctIndex);
    if (!Number.isInteger(idx) || idx < 0 || idx > 3) continue;
    const question = String(q.question ?? "").trim();
    if (!question) continue;
    out.push({
      question,
      options: opts,
      correctIndex: idx,
      explanation: String(q.explanation ?? "").trim(),
    });
  }
  if (out.length < 3) throw new Error(`Quiz incompleto (${out.length})`);
  return out.slice(0, 5);
}

function shuffleQuizOptions(quiz: QuizQuestion[]): QuizQuestion[] {
  return quiz.map((q) => {
    const correctOption = q.options[q.correctIndex];
    const shuffled = [...q.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return {
      ...q,
      options: shuffled,
      correctIndex: shuffled.indexOf(correctOption),
    };
  });
}

function parsePayloadJSON(text: string): {
  word: Word;
  challenge: ExplainChallenge;
  quote: Quote;
  quiz: QuizQuestion[];
} {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  const parsed = JSON.parse(cleaned);

  return {
    word: parseWord(parsed.word),
    challenge: parseChallenge(parsed.challenge),
    quote: parseQuote(parsed.quote),
    quiz: shuffleQuizOptions(parseQuiz(parsed.quiz)),
  };
}

export async function generatePayloadWithGemini(
  dateKey: string,
  apiKey: string
): Promise<{
  word: Word;
  challenge: ExplainChallenge;
  quote: Quote;
  quiz: QuizQuestion[];
}> {
  const lisbonDate = new Date().toLocaleDateString("pt-PT", {
    timeZone: "Europe/Lisbon",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userPrompt = `Gera o conteúdo de hoje (${lisbonDate}, chave: ${dateKey}).

Surpreende o leitor com escolhas variadas. A palavra, o conceito do desafio e a citação devem ser de áreas DIFERENTES.`;

  const response = await geminiFetchWithRetry(
    `${GEMINI_ENDPOINT}?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 1.0,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Resposta da Gemini vazia");

  return parsePayloadJSON(text);
}
