"use client";

import { listFavorites } from "./favoritos";
import { readStreakHistory } from "../StreakBadge";

export type Badge = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
};

export type Nivel = {
  name: string;
  emoji: string;
  min: number;
  description: string;
};

export const NIVEIS: Nivel[] = [
  { name: "Iniciante", emoji: "🌱", min: 0, description: "A começar." },
  { name: "Curioso", emoji: "🔍", min: 5, description: "A explorar." },
  { name: "Aprendiz", emoji: "📖", min: 15, description: "A construir base." },
  { name: "Estudioso", emoji: "🎓", min: 30, description: "Já com peso." },
  { name: "Versado", emoji: "📜", min: 60, description: "Conversa sobre quase tudo." },
  { name: "Erudito", emoji: "🏛️", min: 120, description: "Cultura raramente vista." },
];

function readQuizScores(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem("mente-afinada-quiz-answers");
    return raw ? (JSON.parse(raw) as Record<string, number[]>) : {};
  } catch {
    return {};
  }
}

export type Stats = {
  favoritesCount: number;
  streakDaysTotal: number;
  longestStreak: number;
  perfectQuizzes: number;
  totalQuizDays: number;
  byType: Record<string, number>;
};

export function computeStats(): Stats {
  const favs = listFavorites();
  const byType: Record<string, number> = {};
  for (const f of favs) byType[f.type] = (byType[f.type] ?? 0) + 1;

  const history = readStreakHistory();
  const dates = history.map((d) => new Date(d + "T00:00:00").getTime()).sort();
  let longest = 0;
  let current = 0;
  let prev: number | null = null;
  const DAY = 24 * 60 * 60 * 1000;
  for (const ts of dates) {
    if (prev !== null && ts - prev === DAY) current += 1;
    else current = 1;
    if (current > longest) longest = current;
    prev = ts;
  }

  const quizScores = readQuizScores();
  let perfect = 0;
  let totalDays = 0;
  for (const arr of Object.values(quizScores)) {
    if (!Array.isArray(arr) || arr.length === 0) continue;
    totalDays += 1;
    if (arr.length >= 5 && arr.every((a) => a !== undefined)) {
      const allCorrect = true;
      if (allCorrect) {
      }
    }
  }
  // Quiz scoring: we can't verify perfection without the correct answers,
  // so approximate via completion of all 5.
  for (const arr of Object.values(quizScores)) {
    if (Array.isArray(arr) && arr.length === 5 && arr.every((a) => a !== undefined)) {
      perfect += 1;
    }
  }

  return {
    favoritesCount: favs.length,
    streakDaysTotal: history.length,
    longestStreak: longest,
    perfectQuizzes: perfect,
    totalQuizDays: totalDays,
    byType,
  };
}

export function computeBadges(stats: Stats): Badge[] {
  return [
    {
      id: "first-fav",
      name: "Primeira escolha",
      description: "Guardar o teu primeiro item.",
      emoji: "⭐",
      earned: stats.favoritesCount >= 1,
    },
    {
      id: "fav-10",
      name: "Colecionador",
      description: "Guardar 10 itens.",
      emoji: "📚",
      earned: stats.favoritesCount >= 10,
    },
    {
      id: "fav-30",
      name: "Biblioteca pessoal",
      description: "Guardar 30 itens.",
      emoji: "🗃️",
      earned: stats.favoritesCount >= 30,
    },
    {
      id: "fav-100",
      name: "Acervo notável",
      description: "Guardar 100 itens.",
      emoji: "🏛️",
      earned: stats.favoritesCount >= 100,
    },
    {
      id: "streak-3",
      name: "Três dias",
      description: "3 dias consecutivos de prática.",
      emoji: "🔥",
      earned: stats.longestStreak >= 3,
    },
    {
      id: "streak-7",
      name: "Uma semana",
      description: "7 dias consecutivos.",
      emoji: "🔥🔥",
      earned: stats.longestStreak >= 7,
    },
    {
      id: "streak-30",
      name: "Um mês",
      description: "30 dias consecutivos.",
      emoji: "🌟",
      earned: stats.longestStreak >= 30,
    },
    {
      id: "streak-100",
      name: "Cem dias",
      description: "100 dias consecutivos.",
      emoji: "💎",
      earned: stats.longestStreak >= 100,
    },
    {
      id: "diversity-5",
      name: "Curioso de tudo",
      description: "Guardar itens de 5 tipos diferentes.",
      emoji: "🎨",
      earned: Object.keys(stats.byType).length >= 5,
    },
    {
      id: "diversity-10",
      name: "Conhecimento amplo",
      description: "Guardar itens de 10 tipos diferentes.",
      emoji: "🌍",
      earned: Object.keys(stats.byType).length >= 10,
    },
    {
      id: "quiz-5",
      name: "Resiliente",
      description: "Completar 5 quizzes.",
      emoji: "💪",
      earned: stats.perfectQuizzes >= 5,
    },
    {
      id: "quiz-30",
      name: "Veterano do quiz",
      description: "Completar 30 quizzes.",
      emoji: "🏆",
      earned: stats.perfectQuizzes >= 30,
    },
  ];
}

export function computeNivel(stats: Stats): {
  nivel: Nivel;
  next: Nivel | null;
  progress: number;
} {
  const score =
    stats.favoritesCount +
    Math.floor(stats.longestStreak * 0.7) +
    stats.perfectQuizzes;

  let nivel = NIVEIS[0];
  let next: Nivel | null = NIVEIS[1] ?? null;
  for (let i = 0; i < NIVEIS.length; i++) {
    if (score >= NIVEIS[i].min) {
      nivel = NIVEIS[i];
      next = NIVEIS[i + 1] ?? null;
    }
  }

  const progress = next
    ? Math.min(1, (score - nivel.min) / (next.min - nivel.min))
    : 1;

  return { nivel, next, progress };
}
