"use client";

const LIST_KEY = "mente-afinada-listas";

export type Lista = {
  id: string;
  name: string;
  color: string;
  createdAt: string;
};

const PALETTE = [
  "#fbbf24",
  "#a855f7",
  "#60a5fa",
  "#22c55e",
  "#f472b6",
  "#06b6d4",
  "#fb923c",
  "#a78bfa",
];

function readStore(): Record<string, Lista> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LIST_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Lista>) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, Lista>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIST_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("mente-afinada-listas-changed"));
}

export function listAllListas(): Lista[] {
  return Object.values(readStore()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function createLista(name: string): Lista | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  const store = readStore();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const colorIdx = Object.keys(store).length % PALETTE.length;
  const lista: Lista = {
    id,
    name: trimmed,
    color: PALETTE[colorIdx],
    createdAt: new Date().toISOString(),
  };
  store[id] = lista;
  writeStore(store);
  return lista;
}

export function renameLista(id: string, name: string) {
  const store = readStore();
  if (!store[id] || !name.trim()) return;
  store[id] = { ...store[id], name: name.trim() };
  writeStore(store);
}

export function deleteLista(id: string) {
  const store = readStore();
  if (!store[id]) return;
  delete store[id];
  writeStore(store);
}
