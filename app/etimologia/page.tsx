import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { ETIMOLOGIA_POOL } from "../lib/etimologia-pool";

export const metadata = { title: "Etimologia · Mente Afinada" };

export default function EtimologiaPage() {
  const items: ContentItem[] = ETIMOLOGIA_POOL.map((e) => ({
    id: e.id,
    title: e.word,
    subtitle: e.origin,
    searchableText: `${e.story} ${e.modernMeaning} ${e.curiosity ?? ""}`,
    sections: [
      { label: "História", content: e.story },
      { label: "Significado moderno", content: e.modernMeaning },
      ...(e.curiosity
        ? [{ label: "Curiosidade", content: e.curiosity }]
        : []),
    ],
  }));

  return (
    <ContentPage
      badge={`🔡 ${ETIMOLOGIA_POOL.length} palavras`}
      title="Etimologia"
      subtitle="A origem secreta das palavras que usas todos os dias. Saber donde vêm cola muito melhor do que decorar a definição."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #93c5fd 60%, #38bdf8 100%)"
      tipo="etimologia"
      existingTitles={ETIMOLOGIA_POOL.map((e) => e.word)}
    >
      <ContentList items={items} favType="etimologia" accent="rgba(147, 197, 253, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
