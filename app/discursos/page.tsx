import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { DISCURSOS_POOL } from "../lib/discursos-pool";

export const metadata = { title: "Discursos · Mente Afinada" };

export default function DiscursosPage() {
  const items: ContentItem[] = DISCURSOS_POOL.map((d) => ({
    id: d.id,
    title: d.title,
    subtitle: `${d.speaker} · ${d.date}`,
    searchableText: `${d.speaker} ${d.excerpt} ${d.context} ${d.whyMarked}`,
    sections: [
      { label: "Excerto", content: `"${d.excerpt}"`, mono: true },
      { label: "Onde e quando", content: `${d.place} · ${d.date}` },
      { label: "Contexto", content: d.context },
      { label: "Porquê marcou", content: d.whyMarked },
    ],
  }));

  return (
    <ContentPage
      badge={`🎤 ${DISCURSOS_POOL.length} discursos`}
      title="Discursos famosos"
      subtitle="Momentos retóricos que mudaram países, civis e instituições. Excerto, contexto e porquê continuam a importar."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #fbbf24 60%, #f472b6 100%)"
      tipo="discurso"
      existingTitles={DISCURSOS_POOL.map((d) => `${d.speaker} - ${d.title}`)}
    >
      <ContentList items={items} favType="palavra" accent="rgba(251, 191, 36, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
