import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { MARCOS_POOL } from "../lib/marcos-pool";

export const metadata = { title: "Marcos históricos · Mente Afinada" };

export default function MarcosPage() {
  const items: ContentItem[] = MARCOS_POOL.map((m) => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.year} · ${m.place}`,
    searchableText: `${m.whatHappened} ${m.whyMatters} ${m.legacy}`,
    sections: [
      { label: "O que aconteceu", content: m.whatHappened },
      { label: "Porquê importa", content: m.whyMatters },
      { label: "Legado", content: m.legacy },
    ],
  }));

  return (
    <ContentPage
      badge={`🏛️ ${MARCOS_POOL.length} marcos`}
      title="Marcos históricos"
      subtitle="Os acontecimentos que mudaram o mundo. O que se passou e por que ainda nos afeta hoje."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #d8b4fe 60%, #a78bfa 100%)"
    >
      <ContentList items={items} favType="marco" accent="rgba(216, 180, 254, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
