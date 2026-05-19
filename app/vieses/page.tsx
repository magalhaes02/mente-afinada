import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { VIESES_POOL } from "../lib/vieses-pool";

export const metadata = { title: "Vieses · Mente Afinada" };

export default function ViesesPage() {
  const items: ContentItem[] = VIESES_POOL.map((v) => ({
    id: v.id,
    title: v.name,
    subtitle: v.definition,
    category: v.category,
    searchableText: `${v.example} ${v.howItCatchesYou} ${v.howToFight}`,
    sections: [
      { label: "Exemplo", content: v.example },
      { label: "Como te apanha", content: v.howItCatchesYou },
      { label: "Como contrariar", content: v.howToFight, mono: true },
    ],
  }));

  return (
    <ContentPage
      badge={`🧠 ${VIESES_POOL.length} vieses`}
      title="Vieses cognitivos"
      subtitle="Erros sistemáticos do cérebro humano. Conhecê-los é o primeiro passo para os contornar."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #c084fc 60%, #a855f7 100%)"
    >
      <ContentList items={items} favType="vies" accent="rgba(192, 132, 252, 0.4)" />
    </ContentPage>
  );
}
