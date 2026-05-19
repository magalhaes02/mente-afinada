import ContentList, { type ContentItem } from "../ContentList";
import ContentPage from "../ContentPage";
import { FRASES_CULTAS_POOL } from "../lib/frases-cultas-pool";

export const metadata = { title: "Frases cultas · Mente Afinada" };

export default function FrasesCultasPage() {
  const items: ContentItem[] = FRASES_CULTAS_POOL.map((f) => ({
    id: f.id,
    title: f.phrase,
    subtitle: f.literalMeaning,
    category: f.language,
    searchableText: `${f.realMeaning} ${f.whenToUse} ${f.example}`,
    sections: [
      { label: "O que quer dizer", content: f.realMeaning },
      { label: "Quando usar", content: f.whenToUse },
      { label: "Exemplo", content: `"${f.example}"`, mono: true },
    ],
  }));

  return (
    <ContentPage
      badge={`🌍 ${FRASES_CULTAS_POOL.length} frases`}
      title="Frases cultas"
      subtitle="Latim e francês que aparecem em livros e textos cultos. Saber significar — e quando usar."
      gradient="linear-gradient(135deg, #f5f5f4 0%, #a7f3d0 60%, #67e8f9 100%)"
    >
      <ContentList
        items={items}
        favType="frase"
        accent="rgba(167, 243, 208, 0.4)"
      />
    </ContentPage>
  );
}
