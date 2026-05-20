export type GeografiaItem = {
  id: string;
  title: string;
  factCorrected: string;
  whyConfusion: string;
  curiosity?: string;
  category:
    | "Capitais"
    | "Países que mudaram"
    | "Fronteiras"
    | "Territórios"
    | "Geografia";
};

export const GEOGRAFIA_POOL: GeografiaItem[] = [
  {
    id: "australia-camberra",
    title: "A capital da Austrália é Camberra, não Sidney",
    factCorrected:
      "Camberra foi escolhida em 1908 como compromisso entre Sidney e Melbourne, que disputavam a capital. A cidade foi construída de raiz nesse local.",
    whyConfusion:
      "Sidney é a maior cidade da Austrália (e a mais conhecida internacionalmente). Mas o estatuto de capital pertence a Camberra desde 1913.",
    curiosity: "Outros casos parecidos: capital do Brasil é Brasília, não Rio. Capital do Canadá é Otava, não Toronto.",
    category: "Capitais",
  },
  {
    id: "turquia-ancara",
    title: "A capital da Turquia é Ancara, não Istambul",
    factCorrected:
      "Istambul (antiga Constantinopla) foi capital do Império Bizantino e depois do Otomano. Após a fundação da República Turca por Atatürk em 1923, a capital foi mudada para Ancara — gesto político de afastar a nova Turquia secular do legado otomano.",
    whyConfusion:
      "Istambul continua a ser a maior cidade da Turquia e um dos centros culturais mundiais. A confusão é histórica e simbólica.",
    category: "Capitais",
  },
  {
    id: "africa-do-sul-tres-capitais",
    title: "A África do Sul tem três capitais",
    factCorrected:
      "Pretória (executiva), Cidade do Cabo (legislativa), Bloemfontein (judicial). Resultado da unificação em 1910 de antigas repúblicas/colónias rivais — compromisso para que nenhuma cidade dominasse.",
    whyConfusion:
      "Normalmente assumimos um país = uma capital. Vários países têm capitais múltiplas (Países Baixos com Amsterdão/Haia, Bolívia com Sucre/La Paz).",
    category: "Capitais",
  },
  {
    id: "jugoslavia",
    title: "A Jugoslávia desapareceu — agora são 7 países",
    factCorrected:
      "Após guerras nos anos 90 e independências sucessivas: Eslovénia, Croácia, Bósnia e Herzegovina, Sérvia, Montenegro, Macedónia do Norte e Kosovo (reconhecido por alguns países).",
    whyConfusion:
      "Países que existiam até há ~30 anos sumiram. Quem cresceu antes dos anos 90 ainda tem mapas mentais com 'Jugoslávia' — quem nasceu depois pode nem saber que existiu.",
    category: "Países que mudaram",
  },
  {
    id: "checoslovaquia",
    title: "A Checoslováquia separou-se pacificamente em 1993",
    factCorrected:
      "Dividiu-se em República Checa (Chéquia) e Eslováquia. Conhecida como 'divórcio de veludo' — separação negociada e pacífica, em contraste com a Jugoslávia.",
    whyConfusion:
      "Casos como este mostram que separações nacionais podem ser civilizadas. Útil contrapor em discussões sobre nacionalismo e federalismo.",
    category: "Países que mudaram",
  },
  {
    id: "urss-paises",
    title: "A URSS dissolveu-se em 15 países",
    factCorrected:
      "Após dezembro de 1991: Rússia, Ucrânia, Bielorrússia, Cazaquistão, Uzbequistão, Geórgia, Azerbaijão, Lituânia, Moldávia, Letónia, Quirguistão, Tajiquistão, Arménia, Turquemenistão, Estónia.",
    whyConfusion:
      "Hoje pensamos só na Rússia. Mas o espaço pós-soviético é enorme e diverso — muitas das tensões atuais (Ucrânia, Geórgia, conflito armeno-azeri) derivam dessa dissolução incompleta.",
    category: "Países que mudaram",
  },
  {
    id: "alasca-russia",
    title: "O Alasca foi vendido pela Rússia aos EUA",
    factCorrected:
      "Em 1867, a Rússia vendeu o Alasca aos EUA por 7,2 milhões de dólares (~150 milhões de hoje). Considerou-o impossível de defender e demasiado distante da Rússia europeia.",
    whyConfusion:
      "Pensamos em Alasca como 'sempre americano'. Foi colónia russa durante mais de 100 anos — daí restos de igrejas ortodoxas e nomes russos.",
    category: "Territórios",
  },
  {
    id: "macau",
    title: "Macau foi português durante 442 anos",
    factCorrected:
      "Desde 1557 até 1999, Macau foi administração portuguesa. Foi a última colónia europeia na Ásia a ser entregue (depois de Hong Kong, que era britânica até 1997).",
    whyConfusion:
      "Macau é hoje frequentemente associada à China e ao jogo. Esquece-se que durante 4 séculos foi ponte cultural luso-chinesa — daí ainda haver bairro português, igrejas católicas, palavras de origem portuguesa no cantonês macaense.",
    category: "Territórios",
  },
  {
    id: "alemanha-duas",
    title: "A Alemanha esteve dividida em duas durante 41 anos",
    factCorrected:
      "Após a 2ª Guerra Mundial (1945-1990), a Alemanha esteve dividida em RFA (Ocidental, capitalista, aliada dos EUA) e RDA (Oriental, comunista, satélite da URSS). Berlim, dentro da RDA, estava também dividida — Muro de Berlim caiu em 1989.",
    whyConfusion:
      "Hoje pensamos em 'Alemanha' como bloco unificado. As diferenças económicas e culturais entre os antigos lados continuam a ser visíveis 30 anos depois.",
    category: "Países que mudaram",
  },
  {
    id: "indonesia-paises",
    title: "A Indonésia é o maior país islâmico do mundo",
    factCorrected:
      "Indonésia tem ~270 milhões de habitantes, dos quais ~87% são muçulmanos. Mais do que a Arábia Saudita, o Egipto ou o Irão.",
    whyConfusion:
      "Associamos 'mundo islâmico' ao Médio Oriente árabe. Mas a maioria dos muçulmanos no mundo está fora dele — sobretudo no sudeste asiático e África.",
    category: "Países que mudaram",
  },
  {
    id: "groenlandia",
    title: "A Gronelândia pertence à Dinamarca",
    factCorrected:
      "A Gronelândia é território autónomo do Reino da Dinamarca desde 1721. Tem 2,16 milhões de km² (50 vezes o tamanho da Dinamarca europeia) e ~57.000 habitantes.",
    whyConfusion:
      "A Gronelândia parece um país americano grande no mapa, mas a sua administração é europeia. Tem moeda própria (coroa dinamarquesa) e parlamento próprio (Inatsisartut).",
    category: "Territórios",
  },
  {
    id: "vaticano-monaco",
    title: "Os países mais pequenos do mundo",
    factCorrected:
      "Vaticano: 0,49 km² (cabe quase em qualquer freguesia). Mónaco: 2,02 km². Nauru: 21 km². Tuvalu: 26 km². San Marino: 61 km².",
    whyConfusion:
      "Países minúsculos existem como entidades soberanas com ONU, moeda, força policial. O Vaticano emite passaportes próprios — embora seja só uma cidade dentro de Roma.",
    category: "Territórios",
  },
  {
    id: "fronteira-mais-longa",
    title: "A fronteira terrestre mais longa do mundo é EUA-Canadá",
    factCorrected:
      "8.891 km, completamente desmilitarizada. Em quase todo o percurso, marcada apenas por uma linha esbatida no chão e marcos espaçados.",
    whyConfusion:
      "Confunde-se 'fronteira' com 'fronteira politicamente quente'. A maior fronteira do mundo é também uma das menos tensas. Contraste com fronteiras pequenas mas perigosas (Coreia do Norte/Sul).",
    category: "Fronteiras",
  },
  {
    id: "lagos-grandes",
    title: "O Mar Cáspio é o maior lago do mundo, não um mar",
    factCorrected:
      "Apesar do nome, é tecnicamente um lago (sem ligação a oceanos). Tem 371.000 km² — maior do que a Alemanha. Faz fronteira com cinco países: Rússia, Cazaquistão, Turquemenistão, Irão e Azerbaijão.",
    whyConfusion:
      "Os romanos chamaram-lhe 'mar' por ser enorme e salgado. Mas tecnicamente é lago — sem saída para oceanos.",
    category: "Geografia",
  },
];
