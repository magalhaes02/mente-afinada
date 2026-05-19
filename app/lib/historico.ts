"use client";

import type { DailyPayload } from "./types";

const HIST_KEY = "mente-afinada-historico";
const MAX_DAYS = 90;

type HistStore = Record<string, DailyPayload>;

function readStore(): HistStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(HIST_KEY);
    return raw ? (JSON.parse(raw) as HistStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: HistStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HIST_KEY, JSON.stringify(store));
}

export function saveToHistory(payload: DailyPayload) {
  if (!payload?.dateKey) return;
  const store = readStore();
  store[payload.dateKey] = payload;
  const keys = Object.keys(store).sort().reverse();
  if (keys.length > MAX_DAYS) {
    const toDelete = keys.slice(MAX_DAYS);
    for (const k of toDelete) delete store[k];
  }
  writeStore(store);
}

export function listHistory(): DailyPayload[] {
  const store = readStore();
  return Object.values(store).sort((a, b) =>
    b.dateKey.localeCompare(a.dateKey)
  );
}

export function getDayFromHistory(dateKey: string): DailyPayload | null {
  const store = readStore();
  return store[dateKey] ?? null;
}
