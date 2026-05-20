import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { CURIOSIDADES_POOL } from "../lib/curiosidades-pool";

export const metadata = { title: "Curiosidades · Mente Afinada" };

export default function CuriosidadesPage() {
  const items: ContentItem[] = CURIOSIDADES_POOL.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.fact.slice(0, 110) + (c.fact.length > 110 ? "…" : ""),
    category: c.category,
    searchableText: `${c.fact} ${c.whyMatters}`,
    sections: [
      { label: "Facto", content: c.fact },
      { label: "Porquê importa", content: c.whyMatters },
    ],
  }));

  return (
    <ContentPage
      badge={`🌟 ${CURIOSIDADES_POOL.length} curiosidades`}
      title="Curiosidades surpreendentes"
      subtitle="Factos que viram a perspetiva. Distorcem o sentido de tempo, escala, e nuance — mas são verdadeiros."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #fcd34d 60%, #f472b6 100%)"
      tipo="curiosidade"
      existingTitles={CURIOSIDADES_POOL.map((c) => c.title)}
    >
      <ContentList items={items} favType="palavra" accent="rgba(252, 211, 77, 0.4)" />
    </ContentPage>
  );
}
