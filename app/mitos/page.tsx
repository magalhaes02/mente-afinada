import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { MITOS_POOL } from "../lib/mitos-pool";

export const metadata = { title: "Mitos · Mente Afinada" };

export default function MitosPage() {
  const items: ContentItem[] = MITOS_POOL.map((m) => ({
    id: m.id,
    title: m.name,
    subtitle: m.story.slice(0, 100) + (m.story.length > 100 ? "…" : ""),
    category: m.origin,
    searchableText: `${m.story} ${m.modernMeaning} ${m.whenWeSay}`,
    sections: [
      { label: "História", content: m.story },
      { label: "Significado moderno", content: m.modernMeaning },
      { label: "Quando dizemos", content: m.whenWeSay, mono: true },
    ],
  }));

  return (
    <ContentPage
      badge={`🏛️ ${MITOS_POOL.length} mitos`}
      title="Mitos e arquétipos"
      subtitle="As histórias antigas que continuam a habitar a nossa linguagem e pensamento. Sísifo, Pandora, Ícaro — quem são, e o que dizemos hoje quando os citamos."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #fda4af 60%, #c084fc 100%)"
      tipo="mito"
      existingTitles={MITOS_POOL.map((m) => m.name)}
    >
      <ContentList items={items} favType="palavra" accent="rgba(253, 164, 175, 0.4)" />
    </ContentPage>
  );
}
