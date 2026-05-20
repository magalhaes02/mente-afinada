import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { RETORICA_POOL } from "../lib/retorica-pool";

export const metadata = { title: "Retórica · Mente Afinada" };

export default function RetoricaPage() {
  const items: ContentItem[] = RETORICA_POOL.map((r) => ({
    id: r.id,
    title: r.name,
    subtitle: r.origin,
    searchableText: `${r.definition} ${r.example} ${r.whenToUse}`,
    sections: [
      { label: "Definição", content: r.definition },
      { label: "Exemplo", content: r.example, mono: true },
      { label: "Quando usar", content: r.whenToUse },
    ],
  }));

  return (
    <ContentPage
      badge={`🎤 ${RETORICA_POOL.length} técnicas`}
      title="Argumentação retórica"
      subtitle="As ferramentas usadas em discursos, debates e textos formais — herdadas de Aristóteles, atualizadas para hoje."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #fcd34d 60%, #fb923c 100%)"
      tipo="retorica"
      existingTitles={RETORICA_POOL.map((r) => r.name)}
    >
      <ContentList
        items={items}
        favType="retorica"
        accent="rgba(252, 211, 77, 0.4)"
        enableFilter={false}
      />
    </ContentPage>
  );
}
