"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  listFavorites,
  toggleFavorite,
  updateNote,
  setListsForItem,
  type FavItem,
  type FavType,
} from "../lib/favoritos";
import {
  createLista,
  deleteLista,
  listAllListas,
  type Lista,
} from "../lib/listas";

const TYPE_META: Record<
  FavType,
  { label: string; emoji: string; color: string }
> = {
  palavra: { label: "Palavra", emoji: "📖", color: "#d8b4fe" },
  citacao: { label: "Citação", emoji: "📚", color: "#bfdbfe" },
  pergunta: { label: "Pergunta", emoji: "🤔", color: "#5eead4" },
  falacia: { label: "Falácia", emoji: "🪤", color: "#fca5a5" },
  vies: { label: "Viés", emoji: "🧠", color: "#c084fc" },
  escola: { label: "Escola", emoji: "🎭", color: "#fbbf24" },
  autor: { label: "Autor", emoji: "✍️", color: "#fda4af" },
  etimologia: { label: "Etimologia", emoji: "🔡", color: "#93c5fd" },
  frase: { label: "Frase culta", emoji: "🌍", color: "#a7f3d0" },
  conceito: { label: "Conceito", emoji: "🔬", color: "#67e8f9" },
  retorica: { label: "Retórica", emoji: "🎤", color: "#fcd34d" },
  proverbio: { label: "Provérbio", emoji: "💭", color: "#fdba74" },
  marco: { label: "Marco", emoji: "🏛️", color: "#d8b4fe" },
  desafio: { label: "Desafio", emoji: "🎯", color: "#fde68a" },
};

export default function ColecaoView() {
  const [favs, setFavs] = useState<FavItem[]>([]);
  const [listas, setListas] = useState<Lista[]>([]);
  const [filterType, setFilterType] = useState<FavType | null>(null);
  const [filterListId, setFilterListId] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const refreshFavs = () => setFavs(listFavorites());
    const refreshListas = () => setListas(listAllListas());
    refreshFavs();
    refreshListas();
    window.addEventListener("mente-afinada-favs-changed", refreshFavs);
    window.addEventListener("mente-afinada-listas-changed", refreshListas);
    return () => {
      window.removeEventListener("mente-afinada-favs-changed", refreshFavs);
      window.removeEventListener(
        "mente-afinada-listas-changed",
        refreshListas
      );
    };
  }, []);

  let filtered = favs;
  if (filterType) filtered = filtered.filter((f) => f.type === filterType);
  if (filterListId)
    filtered = filtered.filter((f) =>
      (f.lists ?? []).includes(filterListId)
    );

  const counts: Record<string, number> = {};
  for (const f of favs) counts[f.type] = (counts[f.type] ?? 0) + 1;
  const types = Object.keys(counts) as FavType[];

  const handleRemove = (item: FavItem) => {
    toggleFavorite({
      type: item.type,
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
    });
  };

  const handleCreateList = () => {
    const created = createLista(newListName);
    if (created) setNewListName("");
  };

  return (
    <div>
      <Link
        href="/dashboard"
        className="ma-press"
        style={{
          display: "block",
          padding: "18px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(244, 114, 182, 0.10))",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          marginBottom: "10px",
          color: "var(--fg)",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "28px", lineHeight: 1 }}>📊</span>
          <div>
            <div
              className="ma-sans"
              style={{ fontSize: "15px", fontWeight: 800, marginBottom: "2px" }}
            >
              Dashboard
            </div>
            <div
              className="ma-sans"
              style={{ fontSize: "11px", color: "var(--fg-muted)" }}
            >
              Visão geral: nível, badges, estatísticas, atalhos
            </div>
          </div>
        </div>
      </Link>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr",
          marginBottom: "10px",
        }}
      >
        <Link
          href="/progresso"
          className="ma-press"
          style={{
            padding: "14px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(103, 232, 249, 0.08))",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            color: "var(--fg)",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>📈</span>
          <span
            className="ma-sans"
            style={{ fontSize: "13px", fontWeight: 800 }}
          >
            Tu vs catálogo
          </span>
          <span
            className="ma-sans"
            style={{ fontSize: "11px", color: "var(--fg-muted)" }}
          >
            % por secção
          </span>
        </Link>
        <Link
          href="/nuvem"
          className="ma-press"
          style={{
            padding: "14px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(103, 232, 249, 0.15), rgba(168, 85, 247, 0.08))",
            border: "1px solid rgba(103, 232, 249, 0.3)",
            color: "var(--fg)",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>☁️</span>
          <span
            className="ma-sans"
            style={{ fontSize: "13px", fontWeight: 800 }}
          >
            Nuvem
          </span>
          <span
            className="ma-sans"
            style={{ fontSize: "11px", color: "var(--fg-muted)" }}
          >
            Visualização
          </span>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: "20px",
        }}
      >
        <Link
          href="/estatisticas"
          className="ma-press"
          style={{
            padding: "14px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(244, 114, 182, 0.10))",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            color: "var(--fg)",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>📊</span>
          <span
            className="ma-sans"
            style={{ fontSize: "13px", fontWeight: 800 }}
          >
            Progresso
          </span>
          <span
            className="ma-sans"
            style={{ fontSize: "11px", color: "var(--fg-muted)" }}
          >
            Badges e nível
          </span>
        </Link>
        <Link
          href="/historico"
          className="ma-press"
          style={{
            padding: "14px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(168, 85, 247, 0.08))",
            border: "1px solid rgba(96, 165, 250, 0.25)",
            color: "var(--fg)",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>📅</span>
          <span
            className="ma-sans"
            style={{ fontSize: "14px", fontWeight: 800 }}
          >
            Histórico
          </span>
          <span
            className="ma-sans"
            style={{ fontSize: "11px", color: "var(--fg-muted)" }}
          >
            Dias passados
          </span>
        </Link>
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(244, 114, 182, 0.08))",
            border: "1px solid rgba(245, 158, 11, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "20px", lineHeight: 1 }}>📂</span>
            <span
              className="ma-sans"
              style={{ fontSize: "14px", fontWeight: 800 }}
            >
              Listas
            </span>
          </div>
          <span
            className="ma-sans"
            style={{
              fontSize: "11px",
              color: "var(--fg-muted)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {listas.length} criadas
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateList();
              }}
              placeholder="Nova lista…"
              className="ma-sans"
              style={{
                flex: 1,
                minWidth: 0,
                padding: "6px 10px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid var(--card-border)",
                color: "var(--fg)",
                fontSize: "12px",
                outline: "none",
              }}
            />
            <button
              type="button"
              className="ma-sans ma-press"
              onClick={handleCreateList}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                background: "rgba(245, 158, 11, 0.2)",
                border: "1px solid rgba(245, 158, 11, 0.45)",
                color: "#fcd34d",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {favs.length === 0 && (
        <div
          className="ma-sans"
          style={{
            padding: "40px 24px",
            borderRadius: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            textAlign: "center",
            color: "var(--fg-muted)",
            lineHeight: 1.6,
          }}
        >
          Ainda não guardaste nada.
          <br />
          Clica em <strong>☆ Guardar</strong> em qualquer palavra, citação,
          falácia ou outro conteúdo.
        </div>
      )}

      {favs.length > 0 && (
        <>
          {listas.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              <Chip
                active={filterListId === null}
                onClick={() => setFilterListId(null)}
                label="Todas as listas"
                color="#fbbf24"
              />
              {listas.map((l) => (
                <Chip
                  key={l.id}
                  active={filterListId === l.id}
                  onClick={() =>
                    setFilterListId(filterListId === l.id ? null : l.id)
                  }
                  label={`📂 ${l.name}`}
                  color={l.color}
                  onDelete={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.confirm(`Apagar a lista "${l.name}"?`)
                    )
                      deleteLista(l.id);
                  }}
                />
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "16px",
            }}
          >
            <Chip
              active={filterType === null}
              onClick={() => setFilterType(null)}
              label={`Tudo · ${favs.length}`}
              color="#fbbf24"
            />
            {types.map((t) => {
              const meta = TYPE_META[t];
              return (
                <Chip
                  key={t}
                  active={filterType === t}
                  onClick={() =>
                    setFilterType(filterType === t ? null : t)
                  }
                  label={`${meta.emoji} ${meta.label} · ${counts[t]}`}
                  color={meta.color}
                />
              );
            })}
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filtered.map((f) => {
              const meta = TYPE_META[f.type];
              const key = `${f.type}::${f.id}`;
              const isExpanded = expandedKey === key;
              return (
                <li
                  key={key}
                  style={{
                    borderRadius: "14px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "22px",
                        lineHeight: 1,
                        marginTop: "2px",
                      }}
                    >
                      {meta.emoji}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="ma-sans"
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: meta.color,
                          marginBottom: "4px",
                        }}
                      >
                        {meta.label}
                      </div>
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "clamp(15px, 4vw, 17px)",
                          fontWeight: 800,
                          color: "var(--fg)",
                          lineHeight: 1.3,
                        }}
                      >
                        {f.title}
                      </h3>
                      {f.subtitle && (
                        <p
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: "clamp(12px, 3.4vw, 14px)",
                            color: "var(--fg-muted)",
                            lineHeight: 1.45,
                            fontStyle: "italic",
                          }}
                        >
                          {f.subtitle}
                        </p>
                      )}
                      {f.note && (
                        <p
                          className="ma-sans"
                          style={{
                            margin: "6px 0 0 0",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            background: "rgba(245, 158, 11, 0.10)",
                            border: "1px solid rgba(245, 158, 11, 0.25)",
                            fontSize: "12px",
                            color: "#fcd34d",
                            lineHeight: 1.5,
                            fontStyle: "italic",
                          }}
                        >
                          📝 {f.note}
                        </p>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                    >
                      <button
                        type="button"
                        className="ma-sans ma-press"
                        onClick={() =>
                          setExpandedKey(isExpanded ? null : key)
                        }
                        style={{
                          padding: "5px 8px",
                          borderRadius: "8px",
                          border: "1px solid rgba(245, 158, 11, 0.3)",
                          background: "rgba(245, 158, 11, 0.08)",
                          color: "#fcd34d",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isExpanded ? "Fechar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        className="ma-sans ma-press"
                        onClick={() => handleRemove(f)}
                        style={{
                          padding: "5px 8px",
                          borderRadius: "8px",
                          border: "1px solid rgba(148, 163, 184, 0.25)",
                          background: "rgba(148, 163, 184, 0.08)",
                          color: "var(--fg-muted)",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <ItemEditor
                      item={f}
                      listas={listas}
                      onClose={() => setExpandedKey(null)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function ItemEditor({
  item,
  listas,
  onClose,
}: {
  item: FavItem;
  listas: Lista[];
  onClose: () => void;
}) {
  const [note, setNote] = useState(item.note ?? "");
  const [selectedLists, setSelectedLists] = useState<string[]>(
    item.lists ?? []
  );

  const handleSave = () => {
    updateNote(item.type, item.id, note);
    setListsForItem(item.type, item.id, selectedLists);
    onClose();
  };

  const toggleList = (listId: string) => {
    setSelectedLists((s) =>
      s.includes(listId) ? s.filter((x) => x !== listId) : [...s, listId]
    );
  };

  return (
    <div
      className="ma-reveal"
      style={{
        padding: "0 16px 16px 16px",
        borderTop: "1px solid var(--card-border)",
      }}
    >
      <div style={{ marginTop: "12px" }}>
        <label
          className="ma-sans"
          style={{
            display: "block",
            fontSize: "10px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--fg-muted)",
            marginBottom: "6px",
          }}
        >
          📝 Nota pessoal
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Porquê guardaste isto? Onde usaste?"
          rows={3}
          className="ma-sans"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--card-border)",
            color: "var(--fg)",
            fontSize: "13px",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>

      {listas.length > 0 && (
        <div style={{ marginTop: "14px" }}>
          <label
            className="ma-sans"
            style={{
              display: "block",
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--fg-muted)",
              marginBottom: "6px",
            }}
          >
            📂 Listas
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {listas.map((l) => {
              const active = selectedLists.includes(l.id);
              return (
                <button
                  key={l.id}
                  type="button"
                  className="ma-sans ma-press"
                  onClick={() => toggleList(l.id)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "999px",
                    background: active ? `${l.color}25` : "rgba(148, 163, 184, 0.08)",
                    border: `1px solid ${
                      active ? l.color : "rgba(148, 163, 184, 0.2)"
                    }`,
                    color: active ? l.color : "var(--fg-muted)",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {active ? "✓ " : ""}
                  {l.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={handleSave}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(244, 114, 182, 0.15))",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            color: "#fde68a",
            fontWeight: 800,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Guardar
        </button>
        <button
          type="button"
          className="ma-sans ma-press"
          onClick={onClose}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            background: "rgba(148, 163, 184, 0.08)",
            border: "1px solid var(--card-border)",
            color: "var(--fg-muted)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  color,
  onDelete,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
  onDelete?: () => void;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "999px",
        background: active ? `${color}22` : "rgba(148, 163, 184, 0.08)",
        border: `1px solid ${active ? color : "rgba(148, 163, 184, 0.2)"}`,
        color: active ? color : "var(--fg-muted)",
      }}
    >
      <button
        type="button"
        className="ma-sans ma-press"
        onClick={onClick}
        style={{
          padding: "6px 12px",
          background: "transparent",
          border: "none",
          color: "inherit",
          fontWeight: 700,
          fontSize: "12px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ma-sans"
          aria-label="Apagar lista"
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: "0 8px 0 0",
            fontSize: "11px",
            opacity: 0.6,
          }}
        >
          ✕
        </button>
      )}
    </span>
  );
}
