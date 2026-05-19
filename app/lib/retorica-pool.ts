export type TecnicaRetorica = {
  id: string;
  name: string;
  origin?: string;
  definition: string;
  example: string;
  whenToUse: string;
};

export const RETORICA_POOL: TecnicaRetorica[] = [
  {
    id: "ethos",
    name: "Ethos",
    origin: "Aristóteles, 'Retórica' (séc. IV a.C.)",
    definition:
      "Apelo à credibilidade do orador. Convencer porque o público confia em ti — pela tua experiência, carácter ou autoridade demonstrada.",
    example:
      "'Trabalhei 20 anos em saúde pública. Posso dizer-vos com certeza que…' — antes de apresentar argumentos, estabelece-se autoridade.",
    whenToUse:
      "No início de discursos, candidaturas, apresentações. Estabelece credibilidade antes de argumentar.",
  },
  {
    id: "pathos",
    name: "Pathos",
    origin: "Aristóteles, 'Retórica'",
    definition:
      "Apelo às emoções da audiência. Convencer mobilizando sentimentos — esperança, indignação, medo, orgulho.",
    example:
      "Martin Luther King, 'I have a dream' — não apresenta dados, evoca a possibilidade emocional de um futuro melhor.",
    whenToUse:
      "Em momentos de mobilização e quando os factos sozinhos não bastam. Cuidado: pathos sem ethos e logos é manipulação.",
  },
  {
    id: "logos",
    name: "Logos",
    origin: "Aristóteles, 'Retórica'",
    definition:
      "Apelo à razão e à lógica. Convencer por argumentos, dados, raciocínio coerente.",
    example:
      "'Os dados mostram que a poluição duplicou em 10 anos. Sem ação, dobrará novamente — o que tornará tais doenças endémicas.'",
    whenToUse:
      "Em apresentações técnicas, debates de fundo, defesas argumentativas. Os 3 (ethos, pathos, logos) raramente funcionam bem isolados.",
  },
  {
    id: "anafora",
    name: "Anáfora",
    definition:
      "Repetição da mesma palavra ou expressão no início de frases ou versos sucessivos. Cria ritmo e dá ênfase.",
    example:
      "'Lutaremos nas praias. Lutaremos nos campos. Lutaremos nas ruas. Nunca nos renderemos.' — Churchill, 1940.",
    whenToUse:
      "Em discurso público para criar martelar emocional. Em escrita formal, com moderação.",
  },
  {
    id: "tricolon",
    name: "Tricolon",
    definition:
      "Sequência de três elementos paralelos. O cérebro humano gosta especialmente de grupos de três — sentem-se completos.",
    example:
      "'Veni, vidi, vici' (vim, vi, venci) — César. 'Liberdade, Igualdade, Fraternidade' — França revolucionária.",
    whenToUse:
      "Em frases-chave de apresentações, slogans, conclusões. Mais memorável que dois ou quatro elementos.",
  },
  {
    id: "antitese",
    name: "Antítese",
    definition:
      "Justaposição de ideias opostas na mesma frase, para criar contraste e dar relevo a ambos os lados.",
    example:
      "'Não perguntes o que o teu país pode fazer por ti — pergunta o que tu podes fazer pelo teu país.' — Kennedy.",
    whenToUse:
      "Para apresentar escolhas, definições, contrastes. Memorável e provocadora.",
  },
  {
    id: "pergunta-retorica",
    name: "Pergunta retórica",
    definition:
      "Pergunta feita não para obter resposta, mas para provocar reflexão ou afirmar implicitamente algo.",
    example:
      "'Será que vamos continuar a aceitar esta situação?' — não espera resposta; afirma 'não devemos'.",
    whenToUse:
      "Para envolver a audiência ativamente. Para fazer afirmações fortes sem as afirmar literalmente.",
  },
  {
    id: "concessao",
    name: "Concessão estratégica",
    definition:
      "Admitir um ponto do adversário antes de contestar o resto. Aumenta credibilidade ao mostrar honestidade intelectual.",
    example:
      "'É verdade que o programa custa mais a curto prazo. Mas a longo prazo, poupa três vezes esse valor.' — admite e segue.",
    whenToUse:
      "Em debates e textos argumentativos. Quem não concede nada parece dogmático; quem concede mostra-se sério.",
  },
  {
    id: "storytelling",
    name: "Storytelling",
    definition:
      "Apresentar argumentos ou informação na forma de história, com personagens, conflito e desenlace.",
    example:
      "Em vez de dizer '23% das pessoas sofrem disto', conta a história de uma pessoa concreta com aquele problema. Memorável e empática.",
    whenToUse:
      "Para tornar memorável o que seria abstrato. Dados ficam esquecidos; histórias ficam.",
  },
  {
    id: "refutacao-preventiva",
    name: "Refutação preventiva",
    definition:
      "Antecipar a objeção mais forte do adversário e contestá-la antes que seja feita.",
    example:
      "'Há quem diga que isto é impossível. Mas considere-se que…' — retira força da objeção antes que apareça.",
    whenToUse:
      "Em apresentações onde sabes que vão surgir objeções específicas. Mostra preparação e maturidade.",
  },
  {
    id: "regra-tres",
    name: "Regra da repetição tripla",
    definition:
      "Apresentar uma ideia uma vez para informar; segunda vez para fixar; terceira vez para convencer. Variar a forma a cada repetição.",
    example:
      "Apresentas tese, mostras evidência, recapitulas no fim. Três vezes a mesma ideia, em formas diferentes — fica.",
    whenToUse:
      "Em qualquer apresentação importante. 'Diz-lhes o que vais dizer, di-lo, e diz-lhes o que disseste.'",
  },
  {
    id: "hiperbole-retorica",
    name: "Hipérbole retórica",
    definition:
      "Exagero deliberado para efeito enfático. Não para enganar — para sublinhar.",
    example:
      "'Já te disse mil vezes.' Ninguém pensa que foram literalmente mil. O exagero comunica intensidade.",
    whenToUse:
      "Para sublinhar pontos emocionalmente. Funciona em discurso oral; em escrita formal, com cautela.",
  },
];
