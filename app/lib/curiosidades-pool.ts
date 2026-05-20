export type Curiosidade = {
  id: string;
  title: string;
  fact: string;
  whyMatters: string;
  category: "Tempo" | "Geografia" | "Ciência" | "História" | "Linguagem" | "Corpo";
};

export const CURIOSIDADES_POOL: Curiosidade[] = [
  {
    id: "cleopatra-piramide",
    title: "Cleópatra está mais perto do iPhone do que das Pirâmides",
    fact: "Cleópatra viveu por volta de 30 a.C. As Grandes Pirâmides de Gizé foram construídas há aproximadamente 2.560 a.C. O iPhone foi lançado em 2007. Cleópatra está cerca de 2.500 anos das pirâmides — e cerca de 2.040 anos do iPhone.",
    whyMatters:
      "Mostra como o nosso sentido de 'passado antigo' é distorcido. Quando juntamos 'pirâmides' e 'Cleópatra' na mesma frase como contemporâneos, estamos a comprimir 2.500 anos.",
    category: "Tempo",
  },
  {
    id: "vacas-cor",
    title: "As vacas têm melhores amigas",
    fact: "Estudos mostram que vacas formam laços sociais fortes e preferenciais. Quando separadas das suas 'amigas' bovinas, os níveis de cortisol (stress) aumentam significativamente. Quando reunidas, ritmo cardíaco baixa.",
    whyMatters:
      "Tem implicações éticas para a forma como tratamos animais que vemos como anónimos. A inteligência social estende-se mais do que assumimos.",
    category: "Ciência",
  },
  {
    id: "oxford-mais-velha-asteca",
    title: "Universidade de Oxford é mais antiga do que o império Asteca",
    fact: "Há registos de aulas em Oxford desde 1096. O império Asteca foi fundado em 1325, com a cidade de Tenochtitlán. Há quase 230 anos entre Oxford a ensinar e o império Asteca a existir.",
    whyMatters:
      "Compromete a narrativa de 'civilizações antigas' como sendo todas anteriores à Europa medieval. Várias civilizações que pensamos 'antiquíssimas' são mais recentes do que instituições europeias 'modernas'.",
    category: "História",
  },
  {
    id: "anne-frank-mlk",
    title: "Anne Frank, Martin Luther King e Audrey Hepburn nasceram no mesmo ano",
    fact: "Os três nasceram em 1929. Quando Anne Frank foi enviada para Auschwitz em 1944, MLK tinha 15 anos. Hepburn tornou-se ícone do cinema enquanto MLK conduzia o movimento dos direitos civis.",
    whyMatters:
      "Personalidades históricas raramente são contemporâneas na nossa cabeça. Saber que coexistiram muda como vemos cada uma.",
    category: "Tempo",
  },
  {
    id: "tubaroes-arvores",
    title: "Os tubarões são mais antigos do que as árvores",
    fact: "Os tubarões surgiram há aproximadamente 400 milhões de anos. As primeiras árvores apareceram há cerca de 360 milhões de anos. Os tubarões precedem as árvores em 40 milhões de anos.",
    whyMatters:
      "Inverte a intuição comum de que 'a vida começou na terra'. A vida complexa marinha precede em centenas de milhões de anos a vida terrestre que vemos.",
    category: "Ciência",
  },
  {
    id: "mais-celulas-bacterianas",
    title: "Tens mais células bacterianas do que humanas no teu corpo",
    fact: "Estimativas recentes apontam para cerca de 38 biliões de bactérias e 30 biliões de células humanas em cada pessoa. Na prática, somos 'comunidades caminhantes'.",
    whyMatters:
      "Põe em causa a noção de 'eu' como entidade biológica isolada. O microbioma intestinal influencia humor, sistema imunitário e até decisões cognitivas.",
    category: "Corpo",
  },
  {
    id: "ouro-estrelas",
    title: "Todo o ouro existente foi feito em colisões de estrelas de neutrões",
    fact: "Elementos mais pesados que o ferro (como o ouro, a platina, o urânio) não se formam em estrelas normais. São criados quando duas estrelas de neutrões colidem — eventos extremamente raros.",
    whyMatters:
      "A aliança de casamento contém átomos forjados em colisões cataclísmicas a milhares de milhões de anos-luz de distância, há mil milhões de anos. Literalmente.",
    category: "Ciência",
  },
  {
    id: "monarquia-fax",
    title: "A monarquia inglesa enviou faxes durante mais tempo do que houve televisão a cores",
    fact: "A TV a cores chegou ao Reino Unido em 1967. O Palácio de Buckingham reportadamente usou faxes para comunicações oficiais até 2020 ou mais tarde. A TV a cores existiu antes de o fax oficial real ter cedido lugar ao email.",
    whyMatters:
      "Mostra como a perceção de modernidade institucional pode ser enganadora. Algumas instituições mantêm tecnologias antigas longe da nossa atenção.",
    category: "História",
  },
  {
    id: "lua-afasta",
    title: "A Lua afasta-se da Terra ~3,8 cm por ano",
    fact: "Daqui a 600 milhões de anos, eclipses solares totais deixarão de existir — a Lua estará longe de mais para tapar completamente o Sol visto da Terra.",
    whyMatters:
      "Estamos a viver numa janela cósmica privilegiada: a Lua tem precisamente o tamanho aparente do Sol no nosso céu. Coincidência que não vai durar para sempre.",
    category: "Ciência",
  },
  {
    id: "letras-portuguesas",
    title: "O português tem mais palavras únicas do que o inglês corrente",
    fact: "Estimativas variam, mas o vocabulário ativo de uma pessoa portuguesa culta é de cerca de 18.000-30.000 palavras. O inglês 'simples' funciona com vocabulário menor para conversação básica (~3.000 palavras dão fluência funcional).",
    whyMatters:
      "Línguas românicas (com herança do latim) têm densidade lexical alta. Saber isto é orgulho legítimo da riqueza do português.",
    category: "Linguagem",
  },
  {
    id: "atomos-quase-vazio",
    title: "Os átomos são quase totalmente vazios",
    fact: "Se um átomo de hidrogénio fosse expandido ao tamanho de um estádio de futebol, o núcleo seria do tamanho de uma ervilha no centro. O resto é 'espaço vazio' onde os eletrões existem como nuvens de probabilidade.",
    whyMatters:
      "Tu também és quase totalmente vazio. A sensação de solidez do mundo material é uma ilusão construída por forças eletromagnéticas entre eletrões.",
    category: "Ciência",
  },
  {
    id: "musica-paris",
    title: "A Torre Eiffel foi construída para durar 20 anos",
    fact: "Construída em 1889 para a Exposição Universal de Paris, era para ser desmontada em 1909. Foi salva porque revelou utilidade militar (transmissão de rádio).",
    whyMatters:
      "Símbolos eternos de cidades podem ter sido obras temporárias. Mostra como o sentido cultural se acumula com o tempo, independentemente da intenção original.",
    category: "História",
  },
  {
    id: "espaco-mais-perto",
    title: "O espaço está mais perto do que Lisboa-Évora",
    fact: "A linha de Kármán (fronteira oficial do espaço) está a 100 km da superfície da Terra. Lisboa-Évora são cerca de 130 km em linha reta.",
    whyMatters:
      "A atmosfera é uma camada extremamente fina — mais fina do que muitas viagens domésticas. Reforça a fragilidade do sistema que sustenta a vida.",
    category: "Geografia",
  },
  {
    id: "polvo-tres-coracoes",
    title: "O polvo tem três corações e sangue azul",
    fact: "Dois corações bombeiam sangue para as guelras, o terceiro bombeia para o resto do corpo. O sangue é azul porque usa hemocianina (com cobre) em vez de hemoglobina (com ferro). Os corações param quando o polvo nada.",
    whyMatters:
      "A nossa solução evolutiva (vermelho, ferro, um coração) não é a única possível. Os polvos resolveram o transporte de oxigénio de forma radicalmente diferente.",
    category: "Ciência",
  },
  {
    id: "barba-mais-rapida",
    title: "A barba dos homens cresce mais rápido quando esperam sexo",
    fact: "Estudo dos anos 70 mostrou que os pelos faciais aceleram o crescimento em antecipação de contacto sexual, presumivelmente por estímulo hormonal (testosterona).",
    whyMatters:
      "O corpo responde a estímulos psicológicos com mudanças fisiológicas mensuráveis. Mostra como a separação corpo-mente é mais difusa do que pensamos.",
    category: "Corpo",
  },
];
