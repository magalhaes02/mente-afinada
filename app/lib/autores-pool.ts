export type Autor = {
  id: string;
  name: string;
  years: string;
  origin: string;
  essentialWorks: { title: string; year?: string }[];
  centralIdea: string;
  whyMatters: string;
  signatureQuote?: string;
};

export const AUTORES_POOL: Autor[] = [
  {
    id: "pessoa",
    name: "Fernando Pessoa",
    years: "1888 — 1935",
    origin: "Portugal (Lisboa). Educado em Durban, África do Sul.",
    essentialWorks: [
      { title: "Mensagem", year: "1934" },
      { title: "Livro do Desassossego (publicação póstuma)", year: "1982" },
      { title: "Poemas (Caeiro, Reis, Campos)" },
    ],
    centralIdea:
      "Multiplicidade do eu. Os heterónimos (Caeiro, Reis, Campos) não são pseudónimos — são personalidades poéticas autónomas, com biografia e estilo próprios.",
    whyMatters:
      "Antecipa o pensamento moderno sobre identidade fragmentada. Cada pessoa é várias pessoas — o eu unitário é mais ficção do que realidade.",
    signatureQuote: "Tenho em mim todos os sonhos do mundo.",
  },
  {
    id: "saramago",
    name: "José Saramago",
    years: "1922 — 2010",
    origin: "Portugal (Azinhaga). Nobel da Literatura em 1998.",
    essentialWorks: [
      { title: "Memorial do Convento", year: "1982" },
      { title: "Ensaio sobre a Cegueira", year: "1995" },
      { title: "O Evangelho Segundo Jesus Cristo", year: "1991" },
      { title: "A Jangada de Pedra", year: "1986" },
    ],
    centralIdea:
      "Alegoria política e moral. Os romances dele usam situações fantásticas (cegueira coletiva, ilha que se separa) para revelar verdades sociais.",
    whyMatters:
      "Estilo único — frases longas, pontuação mínima, sem aspas no diálogo. Ensina que a forma faz parte da mensagem.",
    signatureQuote:
      "É preciso sair da ilha para ver a ilha. Não nos vemos se não saímos de nós.",
  },
  {
    id: "eca",
    name: "Eça de Queirós",
    years: "1845 — 1900",
    origin: "Portugal (Póvoa de Varzim). Diplomata e escritor realista.",
    essentialWorks: [
      { title: "O Crime do Padre Amaro", year: "1875" },
      { title: "O Primo Basílio", year: "1878" },
      { title: "Os Maias", year: "1888" },
      { title: "A Cidade e as Serras", year: "1901" },
    ],
    centralIdea:
      "Realismo social — radiografia crítica da burguesia portuguesa do séc. XIX. Personagens detalhadas, ironia fina, observação aguda dos hábitos.",
    whyMatters:
      "O melhor retrato literário do que era ser português culto no séc. XIX. A ironia de Eça é um manual de elegância crítica.",
    signatureQuote: "Tudo o que se ama em demasia faz mal.",
  },
  {
    id: "lobo-antunes",
    name: "António Lobo Antunes",
    years: "1942 — ",
    origin: "Portugal (Lisboa). Médico psiquiatra. Veterano da guerra colonial em Angola.",
    essentialWorks: [
      { title: "Os Cus de Judas", year: "1979" },
      { title: "Auto dos Danados", year: "1985" },
      { title: "Manual dos Inquisidores", year: "1996" },
    ],
    centralIdea:
      "Memória traumática contada em fluxo de consciência. Frases que se entrelaçam, vozes que se sobrepõem, tempo descontínuo.",
    whyMatters:
      "Confronto literário com a guerra colonial e com a sociedade portuguesa pós-1974. Difícil de ler — pelo motivo certo.",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    years: "1844 — 1900",
    origin: "Alemanha. Filólogo e filósofo.",
    essentialWorks: [
      { title: "Assim Falava Zaratustra", year: "1885" },
      { title: "Para Além do Bem e do Mal", year: "1886" },
      { title: "A Genealogia da Moral", year: "1887" },
      { title: "Crepúsculo dos Ídolos", year: "1888" },
    ],
    centralIdea:
      "Crítica radical da moralidade tradicional, do cristianismo e do racionalismo. 'Deus está morto' — diagnóstico, não celebração. Vontade de poder, eterno retorno, super-homem.",
    whyMatters:
      "Influenciou TODA a filosofia continental do séc. XX. Distorcido pelo nazismo (a irmã editou os textos depois da loucura dele), mas o pensamento real é o oposto.",
    signatureQuote:
      "Aquilo que não me mata torna-me mais forte.",
  },
  {
    id: "sartre",
    name: "Jean-Paul Sartre",
    years: "1905 — 1980",
    origin: "França (Paris). Filósofo, dramaturgo, romancista. Recusou o Nobel em 1964.",
    essentialWorks: [
      { title: "O Ser e o Nada", year: "1943" },
      { title: "Entre Quatro Paredes (peça)", year: "1944" },
      { title: "O Existencialismo é um Humanismo", year: "1946" },
    ],
    centralIdea:
      "A existência precede a essência. Estamos 'condenados a ser livres' — toda a escolha é tua, e a responsabilidade é total. A 'má-fé' é fugir desta liberdade.",
    whyMatters:
      "Define o existencialismo do séc. XX. Influenciou a literatura, a política, a psicologia. A ideia de que 'cada um se inventa' é dele.",
    signatureQuote: "O inferno são os outros.",
  },
  {
    id: "camus",
    name: "Albert Camus",
    years: "1913 — 1960",
    origin: "Argelia (Mondovi). Francês. Nobel da Literatura em 1957.",
    essentialWorks: [
      { title: "O Estrangeiro", year: "1942" },
      { title: "O Mito de Sísifo", year: "1942" },
      { title: "A Peste", year: "1947" },
      { title: "O Homem Revoltado", year: "1951" },
    ],
    centralIdea:
      "O absurdo — o mundo é silencioso, mas o ser humano procura significado. A revolta consciente é a resposta correta: viver, criar, lutar, sem ilusão e sem desistir.",
    whyMatters:
      "Filosofia acessível, escrita com clareza. 'É necessário imaginar Sísifo feliz' resume uma ética inteira.",
    signatureQuote: "É necessário imaginar Sísifo feliz.",
  },
  {
    id: "beauvoir",
    name: "Simone de Beauvoir",
    years: "1908 — 1986",
    origin: "França (Paris). Filósofa, escritora, ativista.",
    essentialWorks: [
      { title: "O Segundo Sexo", year: "1949" },
      { title: "A Idade da Maturidade", year: "1960" },
      { title: "A Cerimónia do Adeus", year: "1981" },
    ],
    centralIdea:
      "'Não se nasce mulher, torna-se.' Distingue sexo (biológico) de género (construído socialmente). Funda o feminismo da 2ª vaga.",
    whyMatters:
      "A ideia de que muitas das 'características naturais' dos géneros são construídas socialmente é um dos grandes contributos do séc. XX.",
    signatureQuote: "Não se nasce mulher, torna-se.",
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    years: "1906 — 1975",
    origin: "Alemanha (depois EUA, ao fugir do nazismo). Filósofa política.",
    essentialWorks: [
      { title: "As Origens do Totalitarismo", year: "1951" },
      { title: "A Condição Humana", year: "1958" },
      { title: "Eichmann em Jerusalém", year: "1963" },
    ],
    centralIdea:
      "A 'banalidade do mal' — o mal radical é cometido por pessoas comuns que obedecem sem pensar, não por monstros. O totalitarismo aniquila a esfera pública e a capacidade de pensar.",
    whyMatters:
      "A análise dela do totalitarismo permanece atual. A frase 'banalidade do mal' mudou como entendemos o mal organizado.",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    years: "1724 — 1804",
    origin: "Prússia (Königsberg). Nunca saiu da sua cidade natal.",
    essentialWorks: [
      { title: "Crítica da Razão Pura", year: "1781" },
      { title: "Crítica da Razão Prática", year: "1788" },
      { title: "Fundamentação da Metafísica dos Costumes", year: "1785" },
    ],
    centralIdea:
      "A razão tem limites. Conhecemos os fenómenos (como nos aparecem), não as coisas em si. Em ética: o imperativo categórico — age de tal modo que a tua máxima possa ser lei universal.",
    whyMatters:
      "Resposta canónica ao racionalismo e ao empirismo. A ética dele (deontologia) é uma das duas grandes alternativas ao utilitarismo.",
    signatureQuote: "Atreve-te a saber!",
  },
  {
    id: "dostoievski",
    name: "Fyodor Dostoiévski",
    years: "1821 — 1881",
    origin: "Rússia. Esteve preso na Sibéria.",
    essentialWorks: [
      { title: "Crime e Castigo", year: "1866" },
      { title: "Os Irmãos Karamazov", year: "1880" },
      { title: "O Idiota", year: "1869" },
      { title: "Memórias do Subterrâneo", year: "1864" },
    ],
    centralIdea:
      "Exploração radical da psicologia humana — culpa, liberdade, fé, niilismo. Os personagens dele debatem ideias filosóficas como se as vivessem (porque vivem).",
    whyMatters:
      "Antecipa Freud, o existencialismo, a psicologia moderna. Diálogos que continuam frescos 150 anos depois.",
    signatureQuote: "Habituamo-nos a tudo, especialmente ao que não podemos mudar.",
  },
  {
    id: "tolstoi",
    name: "Leo Tolstoi",
    years: "1828 — 1910",
    origin: "Rússia. Aristocrata que se tornou anarcocristão no fim da vida.",
    essentialWorks: [
      { title: "Guerra e Paz", year: "1869" },
      { title: "Anna Karenina", year: "1877" },
      { title: "A Morte de Ivan Ilitch", year: "1886" },
    ],
    centralIdea:
      "Realismo psicológico em escala épica. A história não é feita por grandes homens — é feita por milhões de pequenas decisões. Examinar uma vida na sua iminência da morte revela o que importa.",
    whyMatters:
      "Provavelmente o maior romancista de todos os tempos. Para muitos leitores, 'A Morte de Ivan Ilitch' é a obra-prima curta sobre o que é viver bem.",
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    years: "1889 — 1951",
    origin: "Áustria (Viena). Estudou e ensinou em Cambridge. Filósofo de duas fases distintas.",
    essentialWorks: [
      { title: "Tractatus Logico-Philosophicus", year: "1921" },
      { title: "Investigações Filosóficas", year: "1953" },
    ],
    centralIdea:
      "1ª fase: a linguagem espelha o mundo logicamente. 2ª fase: o significado vem do uso — palavras são ferramentas em 'jogos de linguagem'. Os limites da linguagem são os limites do mundo.",
    whyMatters:
      "Conexão direta com esta app. Saber palavras é literalmente expandir o pensamento. Influenciou filosofia analítica, linguística e ciências cognitivas.",
    signatureQuote: "Os limites do meu mundo são os limites da minha linguagem.",
  },
  {
    id: "platao",
    name: "Platão",
    years: "428 a.C. — 348 a.C.",
    origin: "Atenas. Discípulo de Sócrates, mestre de Aristóteles.",
    essentialWorks: [
      { title: "A República" },
      { title: "Apologia de Sócrates" },
      { title: "Banquete" },
      { title: "Fédon" },
    ],
    centralIdea:
      "Teoria das ideias — existe um mundo de formas perfeitas (ideias), e o mundo material é cópia imperfeita. A famosa Alegoria da Caverna ilustra a libertação para a verdade.",
    whyMatters:
      "Whitehead disse que 'toda a filosofia ocidental é uma série de notas de rodapé a Platão'. Exagero, mas só pouco.",
  },
  {
    id: "aristoteles",
    name: "Aristóteles",
    years: "384 a.C. — 322 a.C.",
    origin: "Estagira (Macedónia). Discípulo de Platão, preceptor de Alexandre Magno.",
    essentialWorks: [
      { title: "Ética a Nicómaco" },
      { title: "Política" },
      { title: "Poética" },
      { title: "Metafísica" },
    ],
    centralIdea:
      "A virtude é o meio-termo entre dois excessos (coragem é meio entre cobardia e temeridade). Ética prática, não abstrata. O ser humano é animal político.",
    whyMatters:
      "Sistematizou a lógica, a biologia, a ética, a política. A ética dele (virtudes) continua a ser uma das alternativas ao utilitarismo e à deontologia kantiana.",
  },
];
