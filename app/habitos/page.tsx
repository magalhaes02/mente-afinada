import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { HABITOS_POOL } from "../lib/habitos-pool";

export const metadata = { title: "Hábitos mentais · Mente Afinada" };

export default function HabitosPage() {
  const items: ContentItem[] = HABITOS_POOL.map((h) => ({
    id: h.id,
    title: h.name,
    subtitle: h.origin,
    searchableText: `${h.principle} ${h.howToApply} ${h.example} ${h.warning ?? ""}`,
    sections: [
      { label: "Princípio", content: h.principle },
      { label: "Como aplicar", content: h.howToApply },
      { label: "Exemplo", content: h.example, mono: true },
      ...(h.warning ? [{ label: "Atenção", content: `⚠️ ${h.warning}` }] : []),
    ],
  }));

  return (
    <ContentPage
      badge={`🧩 ${HABITOS_POOL.length} hábitos`}
      title="Hábitos mentais"
      subtitle="Modelos proativos de pensamento. Navalha de Occam, First Principles, Inversion, Premortem — ferramentas para decidir melhor."
      gradient="linear-gradient(135deg, var(--serif-color) 0%, #67e8f9 60%, #a855f7 100%)"
      tipo="habito"
      existingTitles={HABITOS_POOL.map((h) => h.name)}
    >
      <ContentList items={items} favType="palavra" accent="rgba(103, 232, 249, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
