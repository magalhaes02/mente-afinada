"use client";

import type { FavType } from "./favoritos";

const KEY = "mente-afinada-progresso";

type ProgressoStore = Partial<Record<FavType, string[]>>;

function readStore(): ProgressoStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressoStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: ProgressoStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("mente-afinada-progresso-changed"));
}

export function markSeen(type: FavType, id: string) {
  const store = readStore();
  const set = new Set(store[type] ?? []);
  if (set.has(id)) return;
  set.add(id);
  store[type] = Array.from(set);
  writeStore(store);
}

export function getSeenIds(type: FavType): Set<string> {
  return new Set(readStore()[type] ?? []);
}

export function getProgressByType(): Record<string, number> {
  const store = readStore();
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(store)) {
    out[k] = Array.isArray(v) ? v.length : 0;
  }
  return out;
}
