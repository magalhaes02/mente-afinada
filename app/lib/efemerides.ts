export type Efemeride = {
  monthDay: string;
  title: string;
  description: string;
  relatedType?: "autor" | "marco" | "discurso";
  relatedId?: string;
};

export const EFEMERIDES: Efemeride[] = [
  {
    monthDay: "04-25",
    title: "Revolução do 25 de Abril (1974)",
    description:
      "Há anos, em Lisboa, o Movimento das Forças Armadas iniciava a revolução pacífica que pôs fim a 48 anos de ditadura em Portugal.",
    relatedType: "marco",
    relatedId: "25-abril",
  },
  {
    monthDay: "11-30",
    title: "Morte de Fernando Pessoa (1935)",
    description:
      "Em 1935, Pessoa morreu em Lisboa de cirrose hepática, aos 47 anos. Deixou um baú com mais de 25.000 manuscritos por publicar — entre eles o 'Livro do Desassossego'.",
    relatedType: "autor",
    relatedId: "pessoa",
  },
  {
    monthDay: "06-13",
    title: "Aniversário de Fernando Pessoa (1888)",
    description:
      "Nasceu em Lisboa, Largo de São Carlos. Criou pelo menos 75 heterónimos identificados — três deles (Caeiro, Reis, Campos) com obras literárias completas e biografias próprias.",
    relatedType: "autor",
    relatedId: "pessoa",
  },
  {
    monthDay: "11-16",
    title: "Aniversário de José Saramago (1922)",
    description:
      "Nasceu em Azinhaga, Ribatejo. Em 1998 tornou-se o primeiro autor de língua portuguesa a receber o Nobel da Literatura. Morreu em Lanzarote em 2010.",
    relatedType: "autor",
    relatedId: "saramago",
  },
  {
    monthDay: "07-14",
    title: "Tomada da Bastilha (1789)",
    description:
      "Início simbólico da Revolução Francesa. Multidão tomou a Bastilha, prisão símbolo do absolutismo. Inaugurou a era das revoluções liberais.",
    relatedType: "marco",
    relatedId: "revolucao-francesa",
  },
  {
    monthDay: "11-09",
    title: "Queda do Muro de Berlim (1989)",
    description:
      "Em 1989, o regime da Alemanha Oriental abriu as fronteiras. Cidadãos derrubaram o muro nas semanas seguintes, simbolizando o fim da Guerra Fria.",
    relatedType: "marco",
    relatedId: "queda-muro",
  },
  {
    monthDay: "10-15",
    title: "Aniversário de Nietzsche (1844)",
    description:
      "Nasceu em Röcken, Prússia. Filólogo de formação, tornou-se um dos pensadores mais influentes do séc. XIX. Morreu em 1900 após uma década de loucura.",
    relatedType: "autor",
    relatedId: "nietzsche",
  },
  {
    monthDay: "01-09",
    title: "Aniversário de Simone de Beauvoir (1908)",
    description:
      "Nasceu em Paris. Em 1949 publicou 'O Segundo Sexo' — obra que fundou o feminismo da segunda vaga e cunhou a frase 'não se nasce mulher, torna-se'.",
    relatedType: "autor",
    relatedId: "beauvoir",
  },
  {
    monthDay: "12-10",
    title: "Dia Internacional dos Direitos Humanos",
    description:
      "Aniversário da Declaração Universal dos Direitos Humanos, adotada em 1948 pela ONU em resposta aos horrores da 2ª Guerra Mundial.",
  },
  {
    monthDay: "04-22",
    title: "Aniversário de Kant (1724)",
    description:
      "Nasceu em Königsberg (atual Kaliningrado). Nunca saiu da sua cidade natal. As suas três 'Críticas' redefiniram a filosofia ocidental.",
    relatedType: "autor",
    relatedId: "kant",
  },
  {
    monthDay: "11-22",
    title: "Aniversário de Eça de Queirós (1845)",
    description:
      "Nasceu na Póvoa de Varzim. Foi diplomata em Cuba, Inglaterra e França. 'Os Maias' (1888) é considerado o maior romance português do séc. XIX.",
    relatedType: "autor",
    relatedId: "eca",
  },
  {
    monthDay: "10-31",
    title: "95 teses de Lutero (1517)",
    description:
      "Em 1517, Martinho Lutero afixou as 95 teses na porta da igreja de Wittenberg. Início da Reforma Protestante — uma das maiores ruturas da história europeia.",
  },
];

export function getEfemerideToday(): Efemeride | null {
  const now = new Date();
  const lisbon = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return EFEMERIDES.find((e) => e.monthDay === lisbon) ?? null;
}
