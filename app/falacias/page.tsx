import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { FALACIAS_POOL } from "../lib/falacias-pool";

export const metadata = { title: "Falácias · Mente Afinada" };

export default function FalaciasPage() {
  const items: ContentItem[] = FALACIAS_POOL.map((f) => ({
    id: f.id,
    title: f.name,
    subtitle: f.latin,
    category: f.category,
    searchableText: `${f.definition} ${f.example}`,
    sections: [
      { label: "Definição", content: f.definition },
      { label: "Exemplo", content: f.example },
      { label: "Como detetar", content: f.howToSpot },
      { label: "Como contestar", content: f.howToCounter, mono: true },
    ],
  }));

  return (
    <ContentPage
      badge={`🪤 ${FALACIAS_POOL.length} falácias`}
      title="Falácias lógicas"
      subtitle="Argumentos que parecem válidos mas não são. Aprende a detetar e a contestar com cirurgia."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #fca5a5 60%, #f87171 100%)"
    >
      <ContentList items={items} favType="falacia" accent="rgba(248, 113, 113, 0.4)" />
    </ContentPage>
  );
}
