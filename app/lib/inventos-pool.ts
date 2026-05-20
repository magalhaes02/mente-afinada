export type Invento = {
  id: string;
  name: string;
  year: string;
  inventor: string;
  what: string;
  impact: string;
  today: string;
};

export const INVENTOS_POOL: Invento[] = [
  {
    id: "imprensa",
    name: "Imprensa de tipos móveis",
    year: "~1440",
    inventor: "Johannes Gutenberg, Alemanha",
    what:
      "Tecnologia que permitiu reproduzir mecanicamente textos em série, usando peças de metal móveis combinadas para formar páginas. Cada peça representava uma letra reutilizável.",
    impact:
      "Em 50 anos, a Europa passou de centenas de livros copiados à mão para milhões impressos. Democratizou o acesso ao saber, possibilitou a Reforma Protestante, o Renascimento e a Revolução Científica.",
    today:
      "Tudo o que envolve produção em massa de informação descende daqui. Sem Gutenberg, não há jornais, livros baratos, alfabetização generalizada nem internet.",
  },
  {
    id: "polvora",
    name: "Pólvora",
    year: "~850 d.C.",
    inventor: "Alquimistas chineses (procuravam elixir da imortalidade)",
    what:
      "Mistura de salitre, carvão e enxofre que explode em combustão rápida. Inventada por acidente.",
    impact:
      "Mudou a guerra para sempre: castelos medievais tornaram-se obsoletos, exércitos profissionais substituíram cavaleiros. Foi a base do poderio militar europeu nos descobrimentos.",
    today:
      "Aplicações pacíficas: mineração, fogo de artifício, indústria. Mas o seu uso militar continua a moldar a geopolítica — armas de fogo modernas são descendentes diretos.",
  },
  {
    id: "maquina-vapor",
    name: "Máquina a vapor",
    year: "1769 (versão eficiente)",
    inventor: "James Watt, Escócia (a partir de modelos anteriores de Newcomen)",
    what:
      "Motor que converte calor (de combustível como carvão) em movimento mecânico, usando expansão e condensação de vapor de água.",
    impact:
      "Lançou a Revolução Industrial. Pela primeira vez na história, a humanidade tinha uma fonte de energia consistente, escalável e independente de músculos, vento ou água corrente.",
    today:
      "Centrais elétricas modernas (mesmo nucleares) usam variantes do princípio: aquecer água, fazer vapor, mover turbinas. A vida moderna depende disto.",
  },
  {
    id: "eletricidade",
    name: "Geração e distribuição de eletricidade",
    year: "1882 (primeira central comercial)",
    inventor: "Thomas Edison (corrente contínua), Nikola Tesla (alternada)",
    what:
      "Capacidade de gerar eletricidade em larga escala e distribuí-la por uma rede até casas e fábricas. A 'guerra das correntes' entre Edison e Tesla decidiu o padrão técnico.",
    impact:
      "Iluminação noturna prolongou o dia produtivo. Eletrodomésticos libertaram tempo (sobretudo das mulheres). Indústria mudou para totalmente diferente. Bairros sem eletricidade vs com eletricidade são sociedades distintas.",
    today:
      "Toda a infraestrutura moderna depende — internet, hospitais, transportes, comunicações. Apagões de horas tornam-se crises civilizacionais.",
  },
  {
    id: "antibioticos",
    name: "Antibióticos (penicilina)",
    year: "1928 (descoberta) / 1942 (produção)",
    inventor: "Alexander Fleming, Reino Unido (acidente: bolor numa placa de Petri)",
    what:
      "Substâncias que matam ou impedem o crescimento de bactérias. A penicilina foi a primeira da era moderna.",
    impact:
      "Antes dos antibióticos, uma pequena infeção podia matar. Cirurgias eram extremamente perigosas. Mortes por parto eram comuns. Os antibióticos transformaram a medicina mais do que qualquer outro avanço único do séc. XX.",
    today:
      "Estima-se que salvaram >200 milhões de vidas. Mas o uso excessivo está a criar bactérias resistentes — risco real de regredirmos a um mundo pré-antibiótico.",
  },
  {
    id: "computador",
    name: "Computador eletrónico",
    year: "1945 (ENIAC) / 1971 (microprocessador comercial)",
    inventor:
      "Múltiplos: Alan Turing (teoria), John von Neumann (arquitetura), equipa da Intel (microchip)",
    what:
      "Máquina capaz de executar sequências de operações lógicas e matemáticas a alta velocidade, manipulando informação representada por sinais elétricos.",
    impact:
      "Em 80 anos, passámos de máquinas do tamanho de salas a computadores no bolso. Mudou ciência, finanças, comunicação, lazer, trabalho — quase tudo.",
    today:
      "A vida quotidiana é mediada por computadores: telemóvel, semáforos, GPS, bancos, hospitais. A próxima fronteira é a IA, que é literalmente computação aplicada de novas formas.",
  },
  {
    id: "internet",
    name: "Internet",
    year: "1969 (ARPANET) / 1991 (World Wide Web pública)",
    inventor:
      "ARPANET: Departamento de Defesa dos EUA. WWW: Tim Berners-Lee no CERN.",
    what:
      "Rede global de computadores que comunicam entre si através de protocolos comuns. A WWW (web) é apenas uma camada construída por cima — permite páginas hipertextuais.",
    impact:
      "Aboliu a distância como obstáculo informacional. Comércio, comunicação, política, conhecimento — tudo foi reestruturado. Em 30 anos, mais de metade da humanidade tem acesso.",
    today:
      "Quase todos os outros inventos modernos dependem da internet para distribuição, atualização ou utilidade. É a infraestrutura da civilização atual.",
  },
  {
    id: "vacinas",
    name: "Vacinação",
    year: "1796 (varíola, Jenner) / programa moderno: séc. XX",
    inventor: "Edward Jenner (varíola). Louis Pasteur (princípio moderno).",
    what:
      "Introdução controlada de uma forma fraca ou morta de um agente patogénico para treinar o sistema imunitário a reconhecer e combater a doença real.",
    impact:
      "Erradicou a varíola completamente (1980). Reduziu drasticamente sarampo, poliomielite, difteria, tétano. Aumentou esperança de vida global em décadas. Mais vidas salvas do que qualquer outra intervenção médica.",
    today:
      "Movimentos anti-vacinas modernos põem em risco imunidade de grupo construída ao longo de gerações. Doenças quase eliminadas estão a regressar em bolsas.",
  },
  {
    id: "agricultura",
    name: "Agricultura",
    year: "~10.000 a.C.",
    inventor: "Múltiplas populações independentes (Médio Oriente, China, América Central)",
    what:
      "Domesticação de plantas e animais para produção controlada de alimentos, em vez de caça e recoleção.",
    impact:
      "Permitiu população sedentária, excedente alimentar, especialização de trabalho, cidades, classes sociais, escrita, e tudo o que se segue. Sem agricultura, não há civilização.",
    today:
      "Toda a sociedade moderna está suspensa sobre o facto de uma minoria conseguir produzir comida para todos. 100 mil anos atrás, todos passavam o dia a procurar comida.",
  },
  {
    id: "telefone",
    name: "Telefone",
    year: "1876",
    inventor: "Alexander Graham Bell (controverso — também Antonio Meucci, Elisha Gray)",
    what:
      "Dispositivo que converte voz humana em sinal elétrico transmissível à distância, e reconverte no recetor.",
    impact:
      "Pela primeira vez, conversa em tempo real à distância. Mudou negócios (eliminou cartas para muitas decisões), relações pessoais (familiares distantes voltaram a 'estar próximos') e jornalismo.",
    today:
      "O 'telefone' tornou-se a interface universal de tudo — não só voz, mas mensagens, vídeo, foto, internet, banco. O nome ficou; o uso transformou-se.",
  },
  {
    id: "carro",
    name: "Automóvel",
    year: "1886 (Karl Benz) / 1908 (Ford Modelo T — produção em massa)",
    inventor: "Karl Benz (primeiro carro). Henry Ford (linha de montagem).",
    what:
      "Veículo motorizado para transporte individual de passageiros. Ford tornou-o acessível à classe média ao aplicar produção em massa.",
    impact:
      "Mudou geografia urbana (subúrbios), estilo de vida (independência de transportes públicos), economia (indústria pesada), guerra, e ambiente.",
    today:
      "Cerca de 1,4 mil milhões de carros no mundo. Crise climática é em grande parte derivada do uso de combustíveis fósseis em automóveis. Transição para elétricos é a próxima vaga.",
  },
  {
    id: "aviao",
    name: "Avião",
    year: "1903",
    inventor: "Irmãos Wright (Orville e Wilbur), EUA",
    what:
      "Primeira máquina mais pesada que o ar capaz de voo controlado e sustentado, em Kitty Hawk, Carolina do Norte. O voo durou 12 segundos.",
    impact:
      "Em 65 anos, foi-se da invenção do avião à chegada à Lua. Tornou viagens intercontinentais acessíveis. Mudou guerra (poder aéreo), comércio (entregas rápidas), turismo, e perceção do mundo (Terra como um todo).",
    today:
      "~100.000 voos comerciais por dia globalmente. Carbono associado a aviação é problema climático conhecido — mas continua a ser meio mais eficiente para distâncias muito longas.",
  },
];
