export type Word = {
  word: string;
  formalDefinition: string;
  etymology?: string;
  example: string;
  synonyms: { word: string; nuance: string }[];
  usage: string;
};

export type ExplainChallenge = {
  concept: string;
  typicalAnswer: string;
  preciseAnswer: string;
  whyPrecisionMatters: string;
  mnemonic: string;
  relatedConcept?: { concept: string; how: string };
};

export type Quote = {
  text: string;
  author: string;
  book: string;
  year?: string;
  meaning: string;
  context: string;
  theme: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type DailyPayload = {
  generatedAt: string;
  dateKey: string;
  source: "ai" | "fallback";
  word: Word;
  challenge: ExplainChallenge;
  quote: Quote;
  quiz: QuizQuestion[];
  fallbackReason?: string;
};
