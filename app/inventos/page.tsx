import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { INVENTOS_POOL } from "../lib/inventos-pool";

export const metadata = { title: "Inventos · Mente Afinada" };

export default function InventosPage() {
  const items: ContentItem[] = INVENTOS_POOL.map((i) => ({
    id: i.id,
    title: i.name,
    subtitle: `${i.year} · ${i.inventor}`,
    searchableText: `${i.what} ${i.impact} ${i.today}`,
    sections: [
      { label: "O que é", content: i.what },
      { label: "Impacto na época", content: i.impact },
      { label: "Porquê ainda importa", content: i.today },
    ],
  }));

  return (
    <ContentPage
      badge={`🔧 ${INVENTOS_POOL.length} inventos`}
      title="Inventos que mudaram tudo"
      subtitle="As descobertas que reorganizaram a civilização. O que cada uma foi, e como ainda hoje vives das suas consequências."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #fcd34d 60%, #67e8f9 100%)"
      tipo="invento"
      existingTitles={INVENTOS_POOL.map((i) => i.name)}
    >
      <ContentList
        items={items}
        favType="marco"
        accent="rgba(252, 211, 77, 0.4)"
        enableFilter={false}
      />
    </ContentPage>
  );
}
