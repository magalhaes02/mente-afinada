import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { AUTORES_POOL } from "../lib/autores-pool";

export const metadata = { title: "Autores · Mente Afinada" };

export default function AutoresPage() {
  const items: ContentItem[] = AUTORES_POOL.map((a) => ({
    id: a.id,
    title: a.name,
    subtitle: `${a.years} · ${a.origin}`,
    searchableText: `${a.centralIdea} ${a.whyMatters} ${a.essentialWorks
      .map((w) => w.title)
      .join(" ")}`,
    sections: [
      {
        label: "Obras essenciais",
        content: a.essentialWorks
          .map((w) => `• ${w.title}${w.year ? ` (${w.year})` : ""}`)
          .join("\n"),
      },
      { label: "Ideia central", content: a.centralIdea },
      { label: "Porquê ainda importa", content: a.whyMatters },
      ...(a.signatureQuote
        ? [{ label: "Frase emblemática", content: `"${a.signatureQuote}"`, mono: true }]
        : []),
    ],
  }));

  return (
    <ContentPage
      badge={`✍️ ${AUTORES_POOL.length} autores`}
      title="Autores essenciais"
      subtitle="Quem pensou o que. Mini-biografias de pensadores e escritores que ainda nos formam hoje."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #fda4af 60%, #e879f9 100%)"
    >
      <ContentList items={items} favType="autor" accent="rgba(253, 164, 175, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
