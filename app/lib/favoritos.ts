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
  note?: string;
  lists?: string[];
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

export function getFavorite(type: FavType, id: string): FavItem | undefined {
  const store = readStore();
  return store[keyOf(type, id)];
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

export function updateNote(type: FavType, id: string, note: string) {
  const store = readStore();
  const key = keyOf(type, id);
  if (!store[key]) return;
  store[key] = { ...store[key], note: note.trim() || undefined };
  writeStore(store);
}

export function setListsForItem(
  type: FavType,
  id: string,
  lists: string[]
) {
  const store = readStore();
  const key = keyOf(type, id);
  if (!store[key]) return;
  store[key] = { ...store[key], lists };
  writeStore(store);
}

export function listFavorites(filters?: {
  type?: FavType;
  listId?: string;
}): FavItem[] {
  const store = readStore();
  let all = Object.values(store);
  if (filters?.type) all = all.filter((f) => f.type === filters.type);
  if (filters?.listId) {
    const id = filters.listId;
    all = all.filter((f) => (f.lists ?? []).includes(id));
  }
  return all.sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}
