import type { DailyPayload, QuizQuestion } from "./types";
import {
  buildPoolChallenge,
  buildPoolWord,
  WORD_POOL,
  CHALLENGE_POOL,
} from "./lexico-pool";
import { buildPoolQuote, QUOTE_POOL } from "./citacoes-pool";

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildFallbackQuiz(dateKey: string): QuizQuestion[] {
  const seed = hashString(dateKey + "-quiz");
  const word = buildPoolWord(dateKey);
  const challenge = buildPoolChallenge(dateKey);
  const quote = buildPoolQuote(dateKey);

  const otherWords = WORD_POOL.filter((w) => w.word !== word.word);
  const otherChallenges = CHALLENGE_POOL.filter(
    (c) => c.concept !== challenge.concept
  );
  const otherQuotes = QUOTE_POOL.filter((q) => q.book !== quote.book);

  const pickN = <T,>(arr: T[], n: number, s: number): T[] =>
    shuffle(arr, s).slice(0, n);

  const q1Wrong = pickN(otherWords, 3, seed + 1).map((w) => w.formalDefinition);
  const q1Options = shuffle([word.formalDefinition, ...q1Wrong], seed + 2);

  const q2Wrong = pickN(otherChallenges, 3, seed + 3).map((c) => c.preciseAnswer);
  const q2Options = shuffle([challenge.preciseAnswer, ...q2Wrong], seed + 4);

  const q3Wrong = pickN(otherQuotes, 3, seed + 5).map((q) => q.book);
  const q3Options = shuffle([quote.book, ...q3Wrong], seed + 6);

  const synonymRight = word.synonyms[0];
  const q4Wrong = pickN(otherWords, 3, seed + 7).map(
    (w) => w.synonyms[0]?.word ?? w.word
  );
  const q4Options = shuffle(
    [synonymRight.word, ...q4Wrong.filter((s) => s !== synonymRight.word)].slice(
      0,
      4
    ),
    seed + 8
  );

  const q5Wrong = pickN(otherQuotes, 3, seed + 9).map((q) => q.author);
  const q5Options = shuffle([quote.author, ...q5Wrong], seed + 10);

  return [
    {
      question: `Qual é a definição mais precisa de "${word.word}"?`,
      options: q1Options,
      correctIndex: q1Options.indexOf(word.formalDefinition),
      explanation: word.usage,
    },
    {
      question: `Como definirias "${challenge.concept}" em 1 frase formal?`,
      options: q2Options,
      correctIndex: q2Options.indexOf(challenge.preciseAnswer),
      explanation: challenge.whyPrecisionMatters,
    },
    {
      question: `De que livro é a citação: "${quote.text}"?`,
      options: q3Options,
      correctIndex: q3Options.indexOf(quote.book),
      explanation: `${quote.book}, de ${quote.author}${
        quote.year ? ` (${quote.year})` : ""
      }.`,
    },
    {
      question: `Qual destes é o sinónimo mais próximo de "${word.word}"?`,
      options: q4Options,
      correctIndex: q4Options.indexOf(synonymRight.word),
      explanation: `${synonymRight.word}: ${synonymRight.nuance}`,
    },
    {
      question: `Quem escreveu "${quote.text}"?`,
      options: q5Options,
      correctIndex: q5Options.indexOf(quote.author),
      explanation: `${quote.author}, em "${quote.book}"${
        quote.year ? ` (${quote.year})` : ""
      }.`,
    },
  ];
}

export function buildPoolPayload(
  dateKey: string,
  reason: string
): DailyPayload {
  return {
    generatedAt: new Date().toISOString(),
    dateKey,
    source: "fallback",
    word: buildPoolWord(dateKey),
    challenge: buildPoolChallenge(dateKey),
    quote: buildPoolQuote(dateKey),
    quiz: buildFallbackQuiz(dateKey),
    fallbackReason: reason,
  };
}
