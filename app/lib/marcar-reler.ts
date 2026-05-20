"use client";

const KEY = "mente-afinada-reler";

export type RelerItem = {
  type: string;
  id: string;
  title: string;
  href: string;
  addedAt: string;
};

type Store = Record<string, RelerItem>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("mente-afinada-reler-changed"));
}

function key(type: string, id: string) {
  return `${type}::${id}`;
}

export function isMarkedReler(type: string, id: string): boolean {
  return Boolean(readStore()[key(type, id)]);
}

export function toggleReler(item: Omit<RelerItem, "addedAt">): boolean {
  const store = readStore();
  const k = key(item.type, item.id);
  if (store[k]) {
    delete store[k];
    writeStore(store);
    return false;
  }
  store[k] = { ...item, addedAt: new Date().toISOString() };
  writeStore(store);
  return true;
}

export function listReler(): RelerItem[] {
  return Object.values(readStore()).sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}
