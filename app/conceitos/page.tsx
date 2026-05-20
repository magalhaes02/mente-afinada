import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { CONCEITOS_POOL } from "../lib/conceitos-pool";

export const metadata = { title: "Conceitos científicos · Mente Afinada" };

export default function ConceitosPage() {
  const items: ContentItem[] = CONCEITOS_POOL.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.definition,
    category: c.field,
    searchableText: `${c.whyMatters} ${c.layExplanation} ${c.curiosity ?? ""}`,
    sections: [
      { label: "Em linguagem simples", content: c.layExplanation },
      { label: "Porquê importa", content: c.whyMatters },
      ...(c.curiosity
        ? [{ label: "Curiosidade", content: c.curiosity }]
        : []),
    ],
  }));

  return (
    <ContentPage
      badge={`🔬 ${CONCEITOS_POOL.length} conceitos`}
      title="Conceitos científicos"
      subtitle="As ideias científicas que pessoas cultas dominam — explicadas em linguagem simples, sem perder o rigor."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #67e8f9 60%, #38bdf8 100%)"
      tipo="conceito"
      existingTitles={CONCEITOS_POOL.map((c) => c.name)}
    >
      <ContentList items={items} favType="conceito" accent="rgba(103, 232, 249, 0.4)" />
    </ContentPage>
  );
}
