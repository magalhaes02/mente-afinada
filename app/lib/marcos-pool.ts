export type MarcoHistorico = {
  id: string;
  name: string;
  year: string;
  place: string;
  whatHappened: string;
  whyMatters: string;
  legacy: string;
};

export const MARCOS_POOL: MarcoHistorico[] = [
  {
    id: "revolucao-francesa",
    name: "Revolução Francesa",
    year: "1789 — 1799",
    place: "França",
    whatHappened:
      "Queda da monarquia absoluta francesa, abolição dos privilégios da aristocracia, proclamação dos direitos do homem e do cidadão. Termina com o golpe de Napoleão.",
    whyMatters:
      "Inaugurou o Estado moderno. As ideias de igualdade perante a lei, soberania popular e laicidade são herança direta.",
    legacy:
      "'Liberdade, Igualdade, Fraternidade' e a Declaração dos Direitos do Homem moldaram o mundo. O calendário gregoriano (1582) — diferente — é mais antigo, mas a 'modernidade política' nasce aqui.",
  },
  {
    id: "iluminismo",
    name: "Iluminismo",
    year: "Séc. XVIII",
    place: "Europa (sobretudo França, Escócia, Alemanha)",
    whatHappened:
      "Movimento intelectual que defendeu a razão como guia da ação humana, contra dogmas religiosos e absolutismo político.",
    whyMatters:
      "Bases da democracia liberal moderna: separação de poderes, direitos humanos, liberdade de expressão, ciência laica.",
    legacy:
      "Quase tudo o que damos como adquirido na sociedade moderna ocidental — direitos, educação universal, separação Estado-Igreja — é Iluminismo aplicado.",
  },
  {
    id: "renascimento",
    name: "Renascimento",
    year: "Séc. XIV — XVII",
    place: "Itália primeiro, depois Europa",
    whatHappened:
      "Renovação cultural após a Idade Média. Redescoberta dos clássicos greco-romanos, florescimento das artes, ciência, exploração geográfica.",
    whyMatters:
      "Transição do Mundo Medieval para o Mundo Moderno. Centra a imagem do mundo no Homem (humanismo) em vez de Deus exclusivamente.",
    legacy:
      "Da Vinci, Michelangelo, Galileu, Copérnico, Camões. Os descobrimentos portugueses (séc. XV-XVI) são o capítulo ibérico do Renascimento.",
  },
  {
    id: "revolucao-industrial",
    name: "Revolução Industrial",
    year: "Séc. XVIII — XIX",
    place: "Reino Unido primeiro, depois mundo",
    whatHappened:
      "Mecanização da produção, máquina a vapor, fábricas, urbanização massiva, transformação radical das condições de trabalho.",
    whyMatters:
      "Mudou a base material da civilização. Multiplicou produtividade. Criou a classe operária e o capitalismo industrial.",
    legacy:
      "Toda a vida moderna — produção em massa, divisão extrema do trabalho, cidades grandes — é filha desta revolução. Também a crise ambiental atual.",
  },
  {
    id: "descobrimentos",
    name: "Descobrimentos Portugueses",
    year: "Séc. XV — XVI",
    place: "Portugal, com expansão global",
    whatHappened:
      "Navegação além-mar liderada por Portugal. Descoberta do caminho marítimo para a Índia (Vasco da Gama, 1498), do Brasil (1500), do Japão (1543).",
    whyMatters:
      "Inauguraram a globalização. Ligaram pela primeira vez todos os continentes. Tornaram Portugal, por décadas, a potência mais influente do mundo.",
    legacy:
      "A língua portuguesa em 4 continentes. Mas também o tráfico transatlântico de escravizados, do qual Portugal foi pioneiro — herança difícil a confrontar.",
  },
  {
    id: "25-abril",
    name: "Revolução do 25 de Abril",
    year: "1974",
    place: "Portugal",
    whatHappened:
      "Golpe militar pacífico (Movimento das Forças Armadas) derrubou o regime do Estado Novo, em vigor desde 1933. Sem mortes em confronto direto.",
    whyMatters:
      "Reintroduziu a democracia em Portugal após 48 anos de ditadura. Pôs fim à guerra colonial e à censura.",
    legacy:
      "O 'Cravo na espingarda' é um dos símbolos políticos mais bonitos do séc. XX. Portugal passou de regime atrasado a democracia europeia em menos de uma década.",
  },
  {
    id: "queda-muro",
    name: "Queda do Muro de Berlim",
    year: "1989",
    place: "Berlim, Alemanha",
    whatHappened:
      "Em 9 de novembro de 1989, o regime da RDA (Alemanha Oriental) abriu as fronteiras. Cidadãos derrubaram o muro fisicamente nas semanas seguintes.",
    whyMatters:
      "Símbolo do fim da Guerra Fria. Em dois anos, todo o bloco soviético colapsou (URSS dissolveu-se em 1991).",
    legacy:
      "Reconfigurou o mapa político mundial. Para muitos, o início de uma nova era de globalização e otimismo democrático — entretanto colocado em causa.",
  },
  {
    id: "primeira-guerra",
    name: "Primeira Guerra Mundial",
    year: "1914 — 1918",
    place: "Europa, com extensão global",
    whatHappened:
      "Guerra entre potências europeias originada em rivalidades imperiais e alianças mútuas. ~17 milhões de mortos. Termina com derrota das Potências Centrais.",
    whyMatters:
      "Pôs fim ao 'longo séc. XIX' europeu. Colapso de quatro impérios (austro-húngaro, otomano, russo, alemão). Redesenho do mapa mundial.",
    legacy:
      "O Tratado de Versalhes humilhou a Alemanha, criando condições para a 2ª Guerra. A guerra inaugurou o conceito moderno de 'guerra total'.",
  },
  {
    id: "segunda-guerra",
    name: "Segunda Guerra Mundial",
    year: "1939 — 1945",
    place: "Global",
    whatHappened:
      "Conflito mundial entre Aliados e Eixo (Alemanha, Itália, Japão). ~70-85 milhões de mortos. Inclui o Holocausto, uso de armas nucleares (Hiroshima, Nagasaki).",
    whyMatters:
      "Maior catástrofe da história humana. Acabou definitivamente com a hegemonia europeia. Inaugurou a era da bomba atómica e da ordem bipolar (EUA vs URSS).",
    legacy:
      "ONU, Declaração Universal dos Direitos Humanos, União Europeia (origem) — todos respostas ao trauma. 'Banalidade do mal' (Arendt) é diagnóstico desta era.",
  },
  {
    id: "revolucao-russa",
    name: "Revolução Russa",
    year: "1917",
    place: "Rússia",
    whatHappened:
      "Queda do czar (fevereiro) e tomada do poder pelos bolcheviques de Lenin (outubro). Nascimento do primeiro Estado comunista do mundo.",
    whyMatters:
      "Pôs em prática (com resultados controversos) a teoria marxista. Inaugurou a Guerra Fria global a longo prazo.",
    legacy:
      "URSS (1922-1991) moldou metade do mundo durante 70 anos. Stalinismo, gulag, planificação económica — experiências cujas lições ainda se debatem.",
  },
  {
    id: "independencia-eua",
    name: "Independência dos Estados Unidos",
    year: "1776",
    place: "Treze colónias britânicas, América do Norte",
    whatHappened:
      "Declaração de Independência (4 de julho) das colónias britânicas. Guerra de Independência (1775-1783). Constituição em 1787.",
    whyMatters:
      "Primeira república moderna baseada em princípios iluministas. Inspirou a Revolução Francesa e movimentos independentistas em todo o mundo.",
    legacy:
      "Os EUA tornaram-se a maior potência do séc. XX. A Constituição americana e a Declaração de Direitos influenciaram constituições de dezenas de países.",
  },
  {
    id: "revolucao-cientifica",
    name: "Revolução Científica",
    year: "Séc. XVI — XVII",
    place: "Europa",
    whatHappened:
      "Copérnico (1543, heliocentrismo), Galileu (telescópio), Kepler (órbitas elípticas), Newton (gravitação, 1687). Substituição do modelo aristotélico-ptolomaico.",
    whyMatters:
      "Inaugurou o método científico moderno: observação, experimentação, matematização da natureza. Base de toda a tecnologia subsequente.",
    legacy:
      "Sem a Revolução Científica, não há Revolução Industrial, não há electricidade, não há computação. É o fundamento intelectual da modernidade material.",
  },
];
