"use client";

import { useMemo, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import type { FavType } from "./lib/favoritos";

export type ContentItem = {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  searchableText?: string;
  sections: { label: string; content: string; mono?: boolean }[];
};

export default function ContentList({
  items,
  favType,
  accent = "rgba(168, 85, 247, 0.4)",
  enableSearch = true,
  enableFilter = true,
}: {
  items: ContentItem[];
  favType: FavType;
  accent?: string;
  enableSearch?: boolean;
  enableFilter?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const it of items) {
      if (it.category && !seen.has(it.category)) {
        seen.add(it.category);
        ordered.push(it.category);
      }
    }
    return ordered;
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (activeCategory) list = list.filter((i) => i.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((i) => {
        const haystack = [
          i.title,
          i.subtitle ?? "",
          i.searchableText ?? "",
          i.category ?? "",
          ...i.sections.map((s) => s.content),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    return list;
  }, [items, search, activeCategory]);

  return (
    <div>
      {enableSearch && (
        <input
          type="search"
          placeholder="Procurar…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ma-sans"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "12px",
            background: "var(--card-bg)",
            border: `1px solid ${accent.replace("0.4", "0.25")}`,
            color: "var(--fg)",
            fontSize: "15px",
            fontWeight: 500,
            outline: "none",
            marginBottom: "16px",
          }}
        />
      )}

      {enableFilter && categories.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <CategoryChip
            active={activeCategory === null}
            accent={accent}
            onClick={() => setActiveCategory(null)}
            label={`Todas · ${items.length}`}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c}
              active={activeCategory === c}
              accent={accent}
              onClick={() => setActiveCategory(c)}
              label={c}
            />
          ))}
        </div>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <li
              key={item.id}
              style={{
                borderRadius: "16px",
                background: "var(--card-bg)",
                border: `1px solid ${accent.replace("0.4", "0.15")}`,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 18px",
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  {item.category && (
                    <span
                      className="ma-sans"
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--fg-muted)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "clamp(17px, 4.6vw, 20px)",
                      fontWeight: 800,
                      color: "var(--fg)",
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "clamp(13px, 3.6vw, 15px)",
                        color: "var(--fg-muted)",
                        lineHeight: 1.4,
                        fontStyle: "italic",
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <span
                  className="ma-sans"
                  style={{
                    flex: "0 0 auto",
                    fontSize: "12px",
                    color: "var(--fg-soft)",
                    marginTop: "6px",
                  }}
                >
                  {isExpanded ? "▲" : "▼"}
                </span>
              </button>

              {isExpanded && (
                <div className="ma-reveal" style={{ padding: "0 18px 18px" }}>
                  {item.sections.map((s, i) => (
                    <section key={i} style={{ marginTop: "12px" }}>
                      <div
                        className="ma-sans"
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--fg-muted)",
                          marginBottom: "5px",
                        }}
                      >
                        {s.label}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          padding: s.mono ? "10px 12px" : 0,
                          borderRadius: s.mono ? "10px" : 0,
                          background: s.mono
                            ? "rgba(15, 23, 42, 0.5)"
                            : "transparent",
                          border: s.mono
                            ? "1px solid rgba(99, 102, 241, 0.2)"
                            : "none",
                          fontSize: "clamp(13px, 3.7vw, 15px)",
                          color: "var(--fg)",
                          lineHeight: 1.55,
                          fontWeight: 500,
                          fontFamily: s.mono
                            ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
                            : "inherit",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {s.content}
                      </p>
                    </section>
                  ))}
                  <div style={{ marginTop: "14px" }}>
                    <FavoriteButton
                      type={favType}
                      id={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p
          className="ma-sans"
          style={{
            margin: "30px 0",
            textAlign: "center",
            color: "var(--fg-soft)",
            fontSize: "14px",
          }}
        >
          Nada encontrado.
        </p>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        background: active ? accent.replace("0.4", "0.3") : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${
          active ? accent.replace("0.4", "0.5") : "rgba(148, 163, 184, 0.2)"
        }`,
        color: active ? "var(--fg)" : "var(--fg-muted)",
        fontWeight: 700,
        fontSize: "13px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
