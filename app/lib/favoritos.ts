"use client";

const FAV_KEY = "mente-afinada-favoritos";

export type FavType =
  | "palavra"
  | "citacao"
  | "pergunta"
  | "falacia"
  | "vies"
  | "escola"
  | "autor"
  | "etimologia"
  | "frase"
  | "conceito"
  | "retorica"
  | "proverbio"
  | "marco"
  | "desafio";

export type FavItem = {
  type: FavType;
  id: string;
  title: string;
  subtitle?: string;
  addedAt: string;
};

type FavStore = Record<string, FavItem>;

function readStore(): FavStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as FavStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: FavStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAV_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("mente-afinada-favs-changed"));
}

function keyOf(type: FavType, id: string): string {
  return `${type}::${id}`;
}

export function isFavorite(type: FavType, id: string): boolean {
  const store = readStore();
  return Boolean(store[keyOf(type, id)]);
}

export function toggleFavorite(item: Omit<FavItem, "addedAt">): boolean {
  const store = readStore();
  const key = keyOf(item.type, item.id);
  if (store[key]) {
    delete store[key];
    writeStore(store);
    return false;
  }
  store[key] = { ...item, addedAt: new Date().toISOString() };
  writeStore(store);
  return true;
}

export function listFavorites(type?: FavType): FavItem[] {
  const store = readStore();
  const all = Object.values(store);
  const filtered = type ? all.filter((f) => f.type === type) : all;
  return filtered.sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

export function countByType(): Record<FavType, number> {
  const store = readStore();
  const counts: Record<string, number> = {};
  for (const item of Object.values(store)) {
    counts[item.type] = (counts[item.type] ?? 0) + 1;
  }
  return counts as Record<FavType, number>;
}
