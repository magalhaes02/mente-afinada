import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { ESCOLAS_POOL } from "../lib/escolas-pool";

export const metadata = { title: "Escolas · Mente Afinada" };

export default function EscolasPage() {
  const items: ContentItem[] = ESCOLAS_POOL.map((e) => ({
    id: e.id,
    title: e.name,
    subtitle: e.period,
    searchableText: `${e.origin} ${e.thinkers.join(" ")} ${e.centralIdeas.join(
      " "
    )} ${e.todayValue}`,
    sections: [
      { label: "Origem", content: e.origin },
      { label: "Pensadores principais", content: e.thinkers.join(" · ") },
      {
        label: "Ideias centrais",
        content: e.centralIdeas.map((i) => `• ${i}`).join("\n"),
      },
      { label: "O que oferece hoje", content: e.todayValue },
      ...(e.motto ? [{ label: "Lema", content: `"${e.motto}"`, mono: true }] : []),
    ],
  }));

  return (
    <ContentPage
      badge={`🎭 ${ESCOLAS_POOL.length} escolas`}
      title="Escolas filosóficas"
      subtitle="Os grandes sistemas de pensamento — quando nasceram, quem os formou, e o que ainda nos dizem hoje."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #fbbf24 60%, #f59e0b 100%)"
    >
      <ContentList items={items} favType="escola" accent="rgba(251, 191, 36, 0.4)" enableFilter={false} />
    </ContentPage>
  );
}
