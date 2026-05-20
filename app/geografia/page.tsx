import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { GEOGRAFIA_POOL } from "../lib/geografia-pool";

export const metadata = { title: "Geografia · Mente Afinada" };

export default function GeografiaPage() {
  const items: ContentItem[] = GEOGRAFIA_POOL.map((g) => ({
    id: g.id,
    title: g.title,
    subtitle: g.factCorrected.slice(0, 120) + (g.factCorrected.length > 120 ? "…" : ""),
    category: g.category,
    searchableText: `${g.factCorrected} ${g.whyConfusion} ${g.curiosity ?? ""}`,
    sections: [
      { label: "Facto", content: g.factCorrected },
      { label: "Porquê confundimos", content: g.whyConfusion },
      ...(g.curiosity
        ? [{ label: "Curiosidade adicional", content: g.curiosity }]
        : []),
    ],
  }));

  return (
    <ContentPage
      badge={`🌍 ${GEOGRAFIA_POOL.length} entradas`}
      title="Geografia cultural"
      subtitle="Capitais inesperadas, países que sumiram, fronteiras estranhas. Para conversa e para deixar de errar em pequenas coisas."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #93c5fd 60%, #34d399 100%)"
    >
      <ContentList items={items} favType="palavra" accent="rgba(147, 197, 253, 0.4)" />
    </ContentPage>
  );
}
