"use client";

const KEY = "mente-afinada-personalizado";

export type ConteudoTipo =
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
  | "mito"
  | "discurso"
  | "habito"
  | "curiosidade"
  | "geografia"
  | "invento";

export type ConteudoGerado = {
  id: string;
  tipo: ConteudoTipo;
  generatedAt: string;
  data: Record<string, unknown>;
};

type Store = Record<string, ConteudoGerado[]>;

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
  window.dispatchEvent(new CustomEvent("mente-afinada-personalizado-changed"));
}

export function addConteudo(tipo: ConteudoTipo, items: Record<string, unknown>[]) {
  const store = readStore();
  if (!store[tipo]) store[tipo] = [];
  const ts = Date.now();
  for (const data of items) {
    const id = `gen-${ts}-${Math.random().toString(36).slice(2, 8)}`;
    store[tipo].push({ id, tipo, generatedAt: new Date().toISOString(), data });
  }
  writeStore(store);
}

export function listConteudo(tipo: ConteudoTipo): ConteudoGerado[] {
  return readStore()[tipo] ?? [];
}

export function listAllConteudo(): ConteudoGerado[] {
  const store = readStore();
  return Object.values(store).flat().sort(
    (a, b) =>
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
  );
}

export function deleteConteudo(tipo: ConteudoTipo, id: string) {
  const store = readStore();
  if (!store[tipo]) return;
  store[tipo] = store[tipo].filter((c) => c.id !== id);
  writeStore(store);
}

export function countByType(): Record<string, number> {
  const store = readStore();
  const out: Record<string, number> = {};
  for (const [tipo, arr] of Object.entries(store)) {
    out[tipo] = arr.length;
  }
  return out;
}
