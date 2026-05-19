export type FraseCulta = {
  id: string;
  phrase: string;
  language: "Latim" | "Francês" | "Italiano" | "Alemão";
  literalMeaning: string;
  realMeaning: string;
  whenToUse: string;
  example: string;
};

export const FRASES_CULTAS_POOL: FraseCulta[] = [
  {
    id: "carpe-diem",
    phrase: "Carpe diem",
    language: "Latim",
    literalMeaning: "Colhe o dia.",
    realMeaning:
      "Aproveita o presente — não porque seja o último, mas porque o futuro é incerto. A frase completa é 'carpe diem, quam minimum credula postero' (colhe o dia, confiando o mínimo no amanhã).",
    whenToUse:
      "Para decisões em que o adiamento é a postura padrão. Não para imprudência.",
    example:
      "'Já tenho convite para o jantar há 3 semanas e ainda não respondi. Carpe diem — vou já.'",
  },
  {
    id: "memento-mori",
    phrase: "Memento mori",
    language: "Latim",
    literalMeaning: "Lembra-te que morrerás.",
    realMeaning:
      "Pratica ter consciência da própria finitude. Não para deprimir — para priorizar bem.",
    whenToUse:
      "Quando perdes perspetiva sobre o que importa.",
    example:
      "'Discuti com o meu irmão por uma parvoíce. Memento mori — uma vida é demasiado curta para isto.'",
  },
  {
    id: "sine-qua-non",
    phrase: "Sine qua non",
    language: "Latim",
    literalMeaning: "Sem o qual não (é possível).",
    realMeaning:
      "Condição indispensável; algo sem o qual o resto não funciona.",
    whenToUse:
      "Para nomear requisitos absolutos numa negociação, decisão ou análise.",
    example:
      "'Para o projeto avançar, financiamento aprovado é condição sine qua non — sem isso, nada se faz.'",
  },
  {
    id: "status-quo",
    phrase: "Status quo",
    language: "Latim",
    literalMeaning: "O estado em que (estão as coisas).",
    realMeaning:
      "Situação atual, estado das coisas como existe.",
    whenToUse:
      "Para discutir mudança ou continuidade de uma situação.",
    example:
      "'A reforma ameaça o status quo do sector — daí a resistência.'",
  },
  {
    id: "modus-operandi",
    phrase: "Modus operandi",
    language: "Latim",
    literalMeaning: "Modo de operar.",
    realMeaning:
      "A forma característica como alguém ou algo opera — padrão de comportamento ou método.",
    whenToUse:
      "Para descrever padrões repetitivos. Comum em criminologia e análise de comportamento.",
    example:
      "'O modus operandi dele é prometer e adiar — já o vi cinco vezes.'",
  },
  {
    id: "ad-nauseam",
    phrase: "Ad nauseam",
    language: "Latim",
    literalMeaning: "Até à náusea.",
    realMeaning:
      "Até ao ponto em que se torna repugnante de tanto repetido.",
    whenToUse:
      "Para criticar repetição excessiva em discurso ou comportamento.",
    example:
      "'Repetiu o mesmo argumento ad nauseam — começou a perder o efeito a meio.'",
  },
  {
    id: "ipso-facto",
    phrase: "Ipso facto",
    language: "Latim",
    literalMeaning: "Pelo próprio facto.",
    realMeaning:
      "Como consequência direta de algo, sem necessitar de prova adicional.",
    whenToUse:
      "Em raciocínio formal, quando uma consequência decorre logicamente de uma situação.",
    example:
      "'Se ele renuncia ao cargo, ipso facto perde a imunidade.'",
  },
  {
    id: "a-priori",
    phrase: "A priori",
    language: "Latim",
    literalMeaning: "Do anterior.",
    realMeaning:
      "Conhecimento ou juízo que não depende de experiência — feito antes de observar os factos.",
    whenToUse:
      "Para distinguir convicções sem base empírica de conclusões baseadas em evidência.",
    example:
      "'Não rejeites a ideia a priori — testa-a antes de decidir.'",
  },
  {
    id: "a-posteriori",
    phrase: "A posteriori",
    language: "Latim",
    literalMeaning: "Do posterior.",
    realMeaning:
      "Conhecimento ou juízo que depende da experiência — feito depois de observar.",
    whenToUse:
      "Oposto de a priori. Para identificar argumentos baseados em factos observados.",
    example:
      "'A teoria parecia boa, mas a posteriori percebeu-se que não funcionava na prática.'",
  },
  {
    id: "raison-detre",
    phrase: "Raison d'être",
    language: "Francês",
    literalMeaning: "Razão de ser.",
    realMeaning:
      "O propósito fundamental que justifica a existência de algo.",
    whenToUse:
      "Para questionar ou afirmar o propósito essencial de uma instituição, projeto ou ação.",
    example:
      "'A raison d'être desta organização é apoiar quem ninguém apoia. Sem isso, é só mais uma.'",
  },
  {
    id: "deja-vu",
    phrase: "Déjà vu",
    language: "Francês",
    literalMeaning: "Já visto.",
    realMeaning:
      "Sensação de já ter vivido a situação atual, mesmo sabendo que é a primeira vez.",
    whenToUse:
      "Para descrever a sensação concreta, ou metaforicamente para situações que se repetem.",
    example:
      "'Sinto déjà vu nesta reunião — já discutimos isto duas vezes, sem decidir.'",
  },
  {
    id: "tour-de-force",
    phrase: "Tour de force",
    language: "Francês",
    literalMeaning: "Volta de força.",
    realMeaning:
      "Feito impressionante que demonstra grande habilidade ou esforço.",
    whenToUse:
      "Para elogiar uma realização notável — discurso, performance, trabalho criativo.",
    example:
      "'O discurso dele foi um tour de force — não saiu uma palavra em falso em 40 minutos.'",
  },
  {
    id: "coup-de-grace",
    phrase: "Coup de grâce",
    language: "Francês",
    literalMeaning: "Golpe de graça (misericórdia).",
    realMeaning:
      "Ação final que termina algo já em declínio — origem em golpe que termina a agonia de um ferido.",
    whenToUse:
      "Para um ato decisivo que encerra uma situação prolongada.",
    example:
      "'Já estava com problemas. A demissão do diretor foi o coup de grâce.'",
  },
  {
    id: "cest-la-vie",
    phrase: "C'est la vie",
    language: "Francês",
    literalMeaning: "É a vida.",
    realMeaning:
      "Resignação serena perante o inevitável; aceitação do que se passou.",
    whenToUse:
      "Para situações em que protestar não muda nada — encolher os ombros com elegância.",
    example:
      "'Perdi o comboio por 30 segundos. C'est la vie — vou no próximo.'",
  },
  {
    id: "in-media-res",
    phrase: "In medias res",
    language: "Latim",
    literalMeaning: "No meio das coisas.",
    realMeaning:
      "Começar uma narrativa ou exposição no meio da ação, sem introdução prévia. Técnica clássica.",
    whenToUse:
      "Para descrever um estilo narrativo direto, sem preâmbulos. Comum em literatura, cinema.",
    example:
      "'O romance começa in medias res — somos lançados no meio da crise, sem saber porquê.'",
  },
];
