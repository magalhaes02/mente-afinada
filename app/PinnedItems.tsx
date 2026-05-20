"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "mente-afinada-pinned";

export type PinnedItem = {
  type: string;
  id: string;
  title: string;
  href: string;
  pinnedAt: string;
};

function readPinned(): PinnedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PinnedItem[]) : [];
  } catch {
    return [];
  }
}

function writePinned(items: PinnedItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("mente-afinada-pinned-changed"));
}

const MAX_PINNED = 3;

export function isPinned(type: string, id: string): boolean {
  return readPinned().some((p) => p.type === type && p.id === id);
}

export function togglePin(item: Omit<PinnedItem, "pinnedAt">): {
  pinned: boolean;
  reachedLimit?: boolean;
} {
  const items = readPinned();
  const idx = items.findIndex(
    (p) => p.type === item.type && p.id === item.id
  );
  if (idx >= 0) {
    items.splice(idx, 1);
    writePinned(items);
    return { pinned: false };
  }
  if (items.length >= MAX_PINNED) {
    return { pinned: false, reachedLimit: true };
  }
  items.unshift({ ...item, pinnedAt: new Date().toISOString() });
  writePinned(items);
  return { pinned: true };
}

export default function PinnedItems() {
  const [items, setItems] = useState<PinnedItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(readPinned());
    refresh();
    window.addEventListener("mente-afinada-pinned-changed", refresh);
    return () =>
      window.removeEventListener("mente-afinada-pinned-changed", refresh);
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      style={{
        marginBottom: "20px",
        padding: "14px 16px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(244, 114, 182, 0.06))",
        border: "1px solid rgba(245, 158, 11, 0.3)",
      }}
    >
      <div
        className="ma-sans"
        style={{
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#fbbf24",
          marginBottom: "10px",
        }}
      >
        📌 Fixados
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {items.map((p) => (
          <li key={`${p.type}::${p.id}`}>
            <Link
              href={p.href}
              className="ma-press"
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                textDecoration: "none",
                color: "var(--fg)",
              }}
            >
              <span
                className="ma-sans"
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fcd34d",
                  display: "block",
                  marginBottom: "2px",
                }}
              >
                {p.type}
              </span>
              <span
                style={{
                  fontSize: "clamp(13px, 3.6vw, 15px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {p.title.length > 80 ? p.title.slice(0, 80) + "…" : p.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
