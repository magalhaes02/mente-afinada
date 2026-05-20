import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { PROVERBIOS_POOL } from "../lib/proverbios-pool";

export const metadata = { title: "Provérbios · Mente Afinada" };

export default function ProverbiosPage() {
  const items: ContentItem[] = PROVERBIOS_POOL.map((p) => ({
    id: p.id,
    title: p.text,
    subtitle: p.meaning,
    searchableText: `${p.whenItApplies} ${p.modernExample ?? ""} ${
      p.warning ?? ""
    }`,
    sections: [
      { label: "Quando aplica", content: p.whenItApplies },
      ...(p.modernExample
        ? [{ label: "Exemplo moderno", content: p.modernExample }]
        : []),
      ...(p.warning
        ? [{ label: "Atenção", content: `⚠️ ${p.warning}` }]
        : []),
    ],
  }));

  return (
    <ContentPage
      badge={`💭 ${PROVERBIOS_POOL.length} provérbios`}
      title="Provérbios"
      subtitle="Sabedoria popular condensada. O que cada um quer mesmo dizer — e quando aplica (e quando não)."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #fdba74 60%, #fb923c 100%)"
      tipo="proverbio"
      existingTitles={PROVERBIOS_POOL.map((p) => p.text.slice(0, 50))}
    >
      <ContentList items={items} favType="proverbio" accent="rgba(253, 186, 116, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
