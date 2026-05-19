"use client";

import { useEffect, useState } from "react";
import {
  isFavorite,
  toggleFavorite,
  type FavType,
} from "./lib/favoritos";

export default function FavoriteButton({
  type,
  id,
  title,
  subtitle,
  size = "md",
}: {
  type: FavType;
  id: string;
  title: string;
  subtitle?: string;
  size?: "sm" | "md";
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(type, id));
    const handler = () => setFav(isFavorite(type, id));
    window.addEventListener("mente-afinada-favs-changed", handler);
    return () =>
      window.removeEventListener("mente-afinada-favs-changed", handler);
  }, [type, id]);

  const handleClick = () => {
    const next = toggleFavorite({ type, id, title, subtitle });
    setFav(next);
  };

  const sizeStyle =
    size === "sm"
      ? { padding: "5px 10px", fontSize: "12px" }
      : { padding: "7px 12px", fontSize: "13px" };

  return (
    <button
      type="button"
      className="ma-sans ma-press"
      onClick={handleClick}
      aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      style={{
        ...sizeStyle,
        borderRadius: "999px",
        border: `1px solid ${
          fav ? "rgba(245, 158, 11, 0.55)" : "rgba(148, 163, 184, 0.3)"
        }`,
        background: fav
          ? "linear-gradient(90deg, rgba(245, 158, 11, 0.22), rgba(244, 114, 182, 0.18))"
          : "rgba(148, 163, 184, 0.08)",
        color: fav ? "#fcd34d" : "#cbd5e1",
        fontWeight: 700,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        whiteSpace: "nowrap",
      }}
    >
      <span>{fav ? "★" : "☆"}</span>
      <span>{fav ? "Guardado" : "Guardar"}</span>
    </button>
  );
}
