import type { ExplainChallenge, Word } from "./types";

export const WORD_POOL: Word[] = [
  {
    word: "Estereótipo",
    formalDefinition:
      "Ideia generalizada e simplificada que a sociedade aplica a um grupo.",
    etymology:
      "Do grego stereós (sólido) + týpos (modelo) — originalmente termo da tipografia.",
    example:
      "O estereótipo de que os portugueses são preguiçosos sobrevive apesar de contrariado pelos dados.",
    synonyms: [
      {
        word: "Cliché",
        nuance: "Mais cultural ou expressivo; gasto pelo uso.",
      },
      {
        word: "Lugar-comum",
        nuance: "Ideia banal e repetida; menos pejorativo.",
      },
      {
        word: "Preconceito",
        nuance: "Implica juízo negativo; estereótipo pode ser neutro.",
      },
    ],
    usage: "Em debate sério, evita 'tipo aquela coisa de'. Usa 'estereótipo'.",
  },
  {
    word: "Premissa",
    formalDefinition:
      "Afirmação de partida usada como base para um raciocínio ou conclusão.",
    example:
      "A premissa do argumento é que toda a gente quer ser feliz — se essa premissa falhar, a conclusão cai.",
    synonyms: [
      {
        word: "Pressuposto",
        nuance: "Mais implícito; muitas vezes não declarado.",
      },
      { word: "Hipótese", nuance: "Provisória, ainda por verificar." },
      { word: "Postulado", nuance: "Premissa formalmente aceite, em matemática ou lógica." },
    ],
    usage:
      "Em discussões, 'a tua premissa é falsa' é mais preciso que 'partes mal'.",
  },
  {
    word: "Paradigma",
    formalDefinition:
      "Modelo dominante de pensamento que estrutura como uma área compreende o mundo.",
    etymology: "Do grego parádeigma — exemplo, modelo.",
    example:
      "Newton estabeleceu um paradigma físico que durou 300 anos, até Einstein.",
    synonyms: [
      { word: "Modelo", nuance: "Mais neutro, menos hegemónico." },
      {
        word: "Quadro de referência",
        nuance: "Estrutura mental usada para interpretar.",
      },
    ],
    usage:
      "'Mudança de paradigma' é poderoso, mas usado em excesso — só quando há mesmo viragem profunda.",
  },
  {
    word: "Dicotomia",
    formalDefinition: "Divisão de algo em duas partes opostas e mutuamente exclusivas.",
    example:
      "A dicotomia entre razão e emoção é falsa — operam juntas em qualquer decisão.",
    synonyms: [
      { word: "Oposição", nuance: "Mais geral, sem implicar exclusão total." },
      { word: "Antinomia", nuance: "Oposição lógica entre dois princípios igualmente válidos." },
    ],
    usage:
      "Útil para criticar pensamento binário: 'isto não é uma dicotomia, há espectro entre os dois'.",
  },
  {
    word: "Empatia",
    formalDefinition:
      "Capacidade de sentir o que outro sente, colocando-se na sua posição.",
    example:
      "Empatia não é concordar — é compreender porque o outro pensa como pensa.",
    synonyms: [
      {
        word: "Simpatia",
        nuance: "Afinidade ou agrado, sem necessariamente partilhar o sentimento.",
      },
      { word: "Compaixão", nuance: "Empatia + desejo de aliviar o sofrimento." },
    ],
    usage:
      "Em conflito, 'tenta ter empatia' soa moralizador. 'Tenta perceber a posição dele' soa adulto.",
  },
  {
    word: "Pragmatismo",
    formalDefinition:
      "Postura filosófica que avalia ideias pelos seus efeitos práticos, não pela sua pureza teórica.",
    example:
      "Por pragmatismo, ele apoiou o partido menos mau — sabia que o ideal não era opção.",
    synonyms: [
      {
        word: "Realismo",
        nuance: "Centrado em como as coisas são, não em ideologia.",
      },
      { word: "Utilitarismo", nuance: "Foco em maximizar utilidade ou felicidade total." },
    ],
    usage:
      "'Sou pragmático' diz mais sobre a tua postura do que 'gosto de coisas práticas'.",
  },
  {
    word: "Ceticismo",
    formalDefinition:
      "Postura de dúvida sistemática perante afirmações, exigindo evidência antes de aceitar.",
    example: "Ceticismo saudável protege-te de gurus e teorias de conspiração.",
    synonyms: [
      { word: "Dúvida", nuance: "Momentânea; ceticismo é uma postura contínua." },
      {
        word: "Cinismo",
        nuance: "Desconfiança das intenções alheias, mais sombria.",
      },
    ],
    usage:
      "Ceticismo é virtude intelectual. Não confundir com cinismo, que é postura emocional.",
  },
  {
    word: "Niilismo",
    formalDefinition:
      "Rejeição de valores morais, crenças e significados estabelecidos como sendo objetivos ou universais.",
    example:
      "O niilismo de Nietzsche não era resignação — era diagnóstico de uma época sem deuses.",
    synonyms: [
      { word: "Pessimismo", nuance: "Visão sombria, mas não nega valores." },
      { word: "Relativismo", nuance: "Aceita valores, mas vê-os como dependentes do contexto." },
    ],
    usage:
      "Usado mal: 'sou niilista' quando se quer dizer 'estou triste'. Niilismo é filosófico, não emocional.",
  },
  {
    word: "Estoicismo",
    formalDefinition:
      "Filosofia que defende a virtude, a disciplina e a aceitação do que não se controla como caminho para a serenidade.",
    example:
      "O estoicismo de Marco Aurélio sobrevive porque oferece prática, não só ideia.",
    synonyms: [
      { word: "Resiliência", nuance: "Capacidade de recuperar; estoicismo é filosofia de vida." },
      { word: "Disciplina", nuance: "Componente do estoicismo, não o todo." },
    ],
    usage:
      "Não é insensibilidade. É distinguir o que controlas (resposta) do que não controlas (acontecimentos).",
  },
  {
    word: "Demagogia",
    formalDefinition:
      "Discurso político que apela às emoções e preconceitos da multidão em vez de à razão.",
    example:
      "A demagogia funciona em curto prazo; é o resto que paga a conta depois.",
    synonyms: [
      { word: "Populismo", nuance: "Movimento político; demagogia é a técnica." },
      { word: "Retórica oca", nuance: "Foco no estilo sem substância." },
    ],
    usage:
      "Acusar alguém de 'fazer demagogia' é mais preciso do que 'estás a manipular'.",
  },
  {
    word: "Catarse",
    formalDefinition:
      "Libertação ou purificação emocional, frequentemente provocada pela arte ou pela reflexão.",
    etymology: "Do grego kátharsis — purificação.",
    example: "Para Aristóteles, a tragédia provocava catarse no espectador.",
    synonyms: [
      { word: "Desabafo", nuance: "Mais coloquial, menos transformador." },
      { word: "Libertação emocional", nuance: "Descritivo; catarse implica purificação." },
    ],
    usage:
      "'Foi uma catarse' transmite mais do que 'desabafei muito'.",
  },
  {
    word: "Epifania",
    formalDefinition:
      "Compreensão súbita e profunda, frequentemente reveladora de algo antes encoberto.",
    example:
      "Teve uma epifania a meio da reunião — percebeu que estava no emprego errado.",
    synonyms: [
      { word: "Revelação", nuance: "Frequentemente religiosa ou de origem externa." },
      { word: "Iluminação", nuance: "Compreensão prolongada, não momentânea." },
    ],
    usage:
      "Cuidado com inflação: 'epifania' é raro, não 'percebi uma coisa'.",
  },
  {
    word: "Ironia",
    formalDefinition:
      "Figura em que o sentido literal contraria o significado pretendido.",
    example:
      "Era ironia quando ele disse 'que tempo lindo' a olhar pela janela em plena tempestade.",
    synonyms: [
      { word: "Sarcasmo", nuance: "Ironia mordaz, com intenção de ferir." },
      { word: "Cinismo", nuance: "Postura, não figura — desprezo das motivações." },
    ],
    usage:
      "Em texto, ironia é arriscada — sem tom de voz, pode ser lida literalmente.",
  },
  {
    word: "Alegoria",
    formalDefinition:
      "Representação de uma ideia abstrata por meio de imagens, personagens ou narrativa concreta.",
    example:
      "A 'caverna de Platão' é uma alegoria sobre o conhecimento e a ignorância.",
    synonyms: [
      { word: "Metáfora", nuance: "Comparação implícita pontual; alegoria é narrativa." },
      { word: "Símbolo", nuance: "Elemento isolado que representa algo; alegoria é estrutural." },
    ],
    usage:
      "Quando dizes 'isto é uma alegoria', implicas que toda a história representa outra coisa.",
  },
  {
    word: "Hipérbole",
    formalDefinition: "Exagero deliberado usado como recurso retórico ou expressivo.",
    example: "'Disse-te um milhão de vezes' é uma hipérbole, não um número.",
    synonyms: [
      { word: "Exagero", nuance: "Termo comum; hipérbole é o termo técnico." },
      { word: "Amplificação", nuance: "Mais formal e raro." },
    ],
    usage:
      "Saber que 'estás a usar uma hipérbole' permite identificar o recurso sem o desvalorizar.",
  },
  {
    word: "Eufemismo",
    formalDefinition:
      "Substituição de um termo cru ou desagradável por outro mais suave ou neutro.",
    example: "'Faleceu' é um eufemismo para 'morreu'.",
    synonyms: [
      { word: "Atenuação", nuance: "Mais geral; eufemismo é o caso linguístico." },
      { word: "Circunlóquio", nuance: "Rodeio para evitar dizer algo diretamente." },
    ],
    usage:
      "Em discurso oficial, eufemismos abundam — 'colaborador deixou de fazer parte' = 'foi despedido'.",
  },
  {
    word: "Axioma",
    formalDefinition:
      "Verdade aceite sem demonstração, usada como ponto de partida de um raciocínio.",
    example:
      "Em geometria euclidiana, o axioma das paralelas era considerado óbvio até deixar de ser.",
    synonyms: [
      { word: "Postulado", nuance: "Quase sinónimo, usado em matemática." },
      { word: "Princípio fundador", nuance: "Mais geral, menos técnico." },
    ],
    usage:
      "'Isso é um axioma para mim' significa 'parto disso sem o questionar'.",
  },
  {
    word: "Antinomia",
    formalDefinition: "Contradição entre dois princípios ou normas igualmente válidos.",
    example:
      "Há uma antinomia entre liberdade total e ordem social — afinarmos os dois é o desafio.",
    synonyms: [
      { word: "Contradição", nuance: "Mais geral; antinomia implica princípios estabelecidos." },
      { word: "Paradoxo", nuance: "Aparente contradição que pode ter resolução." },
    ],
    usage:
      "Útil em direito e filosofia para nomear conflitos de princípios.",
  },
  {
    word: "Meritocracia",
    formalDefinition:
      "Sistema social em que posição e recompensa dependem do mérito demonstrado pelo indivíduo.",
    example:
      "Meritocracia pressupõe igualdade de partida — sem ela, é mais herança que mérito.",
    synonyms: [
      { word: "Tecnocracia", nuance: "Governo por especialistas técnicos, não pelo mérito geral." },
    ],
    usage:
      "Em debate, 'pura meritocracia não existe' é mais sólido que 'isso é injusto'.",
  },
  {
    word: "Nepotismo",
    formalDefinition:
      "Favorecimento de familiares ou pessoas próximas em decisões profissionais ou institucionais.",
    etymology: "Do latim nepos (sobrinho) — papas medievais favoreciam sobrinhos.",
    example: "Quando o diretor contratou o cunhado, foi nepotismo, não escolha técnica.",
    synonyms: [
      { word: "Favoritismo", nuance: "Mais amplo; nepotismo é especificamente familiar." },
      { word: "Compadrio", nuance: "Mais coloquial; rede de favores entre amigos." },
    ],
    usage:
      "Saber a palavra exata transforma uma queixa vaga numa acusação precisa.",
  },
  {
    word: "Anomia",
    formalDefinition:
      "Estado social em que as normas perdem força e os indivíduos ficam desorientados.",
    example:
      "Durkheim usou 'anomia' para explicar suicídios em sociedades modernas em rápida mudança.",
    synonyms: [
      { word: "Desordem normativa", nuance: "Descritivo; anomia é o termo sociológico." },
    ],
    usage:
      "Útil para diagnosticar momentos sociais em que 'já ninguém sabe o que vale'.",
  },
  {
    word: "Maiêutica",
    formalDefinition:
      "Método socrático em que se ajuda alguém a chegar a uma conclusão através de perguntas, em vez de transmissão direta.",
    etymology: "Do grego maieutiké — arte da parteira; Sócrates dizia ser parteiro de ideias.",
    example:
      "O bom professor pratica maiêutica — faz perguntas em vez de despejar respostas.",
    synonyms: [
      { word: "Método socrático", nuance: "Sinónimo técnico." },
    ],
    usage:
      "Em coaching ou ensino, 'fiz maiêutica com ele' é mais elegante que 'fui-lhe fazendo perguntas'.",
  },
  {
    word: "Falácia",
    formalDefinition:
      "Erro de raciocínio que torna inválido um argumento, mesmo quando parece convincente.",
    example:
      "Atacar a pessoa em vez do argumento é a falácia ad hominem.",
    synonyms: [
      { word: "Sofisma", nuance: "Mais retórico; argumento intencionalmente falacioso." },
      { word: "Erro lógico", nuance: "Descritivo, menos técnico." },
    ],
    usage:
      "Nomear a falácia ('isso é uma falsa dicotomia') é mais eficaz do que 'estás errado'.",
  },
  {
    word: "Dialética",
    formalDefinition:
      "Processo de pensamento em que ideias opostas se confrontam para gerar uma compreensão superior.",
    example:
      "A dialética de Hegel — tese, antítese, síntese — descreve como o pensamento progride.",
    synonyms: [
      { word: "Confrontação de ideias", nuance: "Descritivo, sem o peso filosófico." },
    ],
    usage:
      "'Tivemos uma conversa dialética' implica que aprendemos um com o outro — não foi só troca de opiniões.",
  },
  {
    word: "Hubris",
    formalDefinition:
      "Excesso de orgulho ou ambição que leva à queda; conceito grego clássico.",
    etymology: "Do grego hýbris — desmedida.",
    example:
      "A hubris dos imperadores antigos quase sempre acabou em desastre.",
    synonyms: [
      { word: "Arrogância", nuance: "Mais comum; hubris é trágica, com queda implícita." },
      { word: "Orgulho desmedido", nuance: "Descritivo." },
    ],
    usage:
      "Cuidado com a inflação. Hubris é só quando há queda à vista.",
  },
];

export const CHALLENGE_POOL: ExplainChallenge[] = [
  {
    concept: "Estereótipo",
    typicalAnswer:
      "É tipo quando dizem que os portugueses são preguiçosos ou os alemães organizados — pensam que toda a gente daquele grupo é igual.",
    preciseAnswer:
      "Uma ideia generalizada e simplificada que a sociedade aplica a um grupo.",
    whyPrecisionMatters:
      "Em entrevistas, debates e textos formais, definir com exemplos parece dispersivo. A versão precisa em 1 frase mostra clareza de pensamento e economiza palavras.",
    mnemonic: "Ideia + generalizada + grupo.",
    relatedConcept: {
      concept: "Preconceito",
      how: "Estereótipo é a ideia; preconceito é o juízo (geralmente negativo) que daí decorre.",
    },
  },
  {
    concept: "Paradigma",
    typicalAnswer:
      "É tipo a forma como toda a gente costumava pensar sobre uma coisa, e depois muda.",
    preciseAnswer:
      "Modelo dominante de pensamento que estrutura como uma área compreende o mundo.",
    whyPrecisionMatters:
      "Dizer 'mudança de paradigma' é poderoso, mas só funciona se souberes o que é um paradigma. Sem isso, soa a buzzword vazia.",
    mnemonic: "Modelo + estrutura + época.",
    relatedConcept: {
      concept: "Mudança de paradigma",
      how: "É a viragem em que o modelo dominante deixa de funcionar e é substituído (Kuhn, 1962).",
    },
  },
  {
    concept: "Ironia",
    typicalAnswer:
      "É quando dizes uma coisa mas queres dizer o contrário — tipo a brincar.",
    preciseAnswer:
      "Figura em que o sentido literal contraria o significado pretendido.",
    whyPrecisionMatters:
      "Distinguir ironia de sarcasmo e cinismo evita mal-entendidos. Sarcasmo é mordaz; cinismo é postura; ironia é figura.",
    mnemonic: "Diz X, quer Y, ambos sabem.",
    relatedConcept: {
      concept: "Sarcasmo",
      how: "Sarcasmo é ironia com intenção de ferir. Toda a ironia mordaz é sarcástica; nem toda ironia é sarcasmo.",
    },
  },
  {
    concept: "Empatia",
    typicalAnswer:
      "É quando consegues pôr-te no lugar do outro e perceber o que ele sente.",
    preciseAnswer:
      "Capacidade de sentir o que outro sente, colocando-se na sua posição.",
    whyPrecisionMatters:
      "Empatia ≠ concordância. Distinguir empatia de simpatia e compaixão evita conversas em círculos.",
    mnemonic: "Sentir com, não por.",
    relatedConcept: {
      concept: "Simpatia",
      how: "Empatia: sentir o que sente. Simpatia: ter afinidade ou agrado. Podes ter empatia por alguém de quem não gostas.",
    },
  },
  {
    concept: "Inflação",
    typicalAnswer:
      "É quando as coisas ficam mais caras com o tempo e o dinheiro vale menos.",
    preciseAnswer:
      "Aumento generalizado e sustentado do nível de preços, com perda de poder de compra do dinheiro.",
    whyPrecisionMatters:
      "Em discussão sobre economia, dizer 'aumento de preços' não chega — inflação implica generalidade e duração.",
    mnemonic: "Preços sobem + dinheiro vale menos.",
    relatedConcept: {
      concept: "Deflação",
      how: "O oposto: descida generalizada e sustentada de preços. Soa bom, mas paralisa a economia.",
    },
  },
  {
    concept: "Democracia",
    typicalAnswer:
      "É quando o povo escolhe quem manda, através de votos.",
    preciseAnswer:
      "Sistema político em que o poder emana do povo, exercido por sufrágio universal, com separação de poderes e direitos garantidos.",
    whyPrecisionMatters:
      "Reduzir democracia a 'votar' deixa de fora o essencial: direitos das minorias, separação de poderes, Estado de direito. Sem isso, é só maioria a impor-se.",
    mnemonic: "Voto + direitos + separação de poderes.",
    relatedConcept: {
      concept: "Tirania da maioria",
      how: "Sistema em que a maioria vota mas pisa direitos das minorias. Democracia precisa de mais que voto.",
    },
  },
  {
    concept: "Capitalismo",
    typicalAnswer:
      "É o sistema em que as empresas pertencem a privados e funcionam para dar lucro.",
    preciseAnswer:
      "Sistema económico assente em propriedade privada dos meios de produção, livre iniciativa e mercado como mecanismo central de coordenação.",
    whyPrecisionMatters:
      "Capitalismo não é 'haver dinheiro'. É um sistema com componentes específicos — sem nomeá-los, debater fica confuso.",
    mnemonic: "Propriedade privada + mercado + lucro.",
    relatedConcept: {
      concept: "Capitalismo de Estado",
      how: "Sistema com mercado mas em que o Estado controla os meios estratégicos. Híbrido — caso da China.",
    },
  },
  {
    concept: "Método científico",
    typicalAnswer:
      "É como os cientistas fazem para descobrir coisas — fazem experiências e tiram conclusões.",
    preciseAnswer:
      "Processo de geração de conhecimento por hipótese, observação controlada, replicação e revisão por pares.",
    whyPrecisionMatters:
      "Saber os passos permite distinguir ciência de pseudociência. 'Têm um estudo' não chega — perguntar 'foi revisto por pares?' muda tudo.",
    mnemonic: "Hipótese → teste → replicação → revisão.",
    relatedConcept: {
      concept: "Falsificabilidade",
      how: "Para uma afirmação ser científica, tem de ser possível imaginar uma observação que a refute (Popper).",
    },
  },
  {
    concept: "Ética vs Moral",
    typicalAnswer:
      "São quase a mesma coisa — saber o que é certo e errado.",
    preciseAnswer:
      "Moral é o conjunto de normas vigentes numa sociedade ou grupo. Ética é a reflexão filosófica sobre essas normas e o que as fundamenta.",
    whyPrecisionMatters:
      "Confundir colapsa discussões. 'É imoral' invoca norma social; 'é antiético' invoca princípio fundamentado. Não são intercambiáveis.",
    mnemonic: "Moral = norma. Ética = reflexão.",
    relatedConcept: {
      concept: "Relativismo moral",
      how: "Postura que defende que normas morais variam por cultura/época — não há moral universal.",
    },
  },
  {
    concept: "Falácia",
    typicalAnswer:
      "É quando o argumento parece bom mas é furado.",
    preciseAnswer:
      "Erro de raciocínio que torna um argumento inválido, mesmo quando convincente à primeira vista.",
    whyPrecisionMatters:
      "Nomear a falácia ('isto é ad hominem', 'isto é falsa dicotomia') torna a contestação cirúrgica em vez de geral.",
    mnemonic: "Parece lógico, mas não é.",
    relatedConcept: {
      concept: "Ad hominem",
      how: "Falácia em que se ataca a pessoa em vez do argumento. Comum, identificável, contornável.",
    },
  },
  {
    concept: "Efeito borboleta",
    typicalAnswer:
      "É aquela ideia de que coisas pequenas podem ter consequências enormes.",
    preciseAnswer:
      "Em sistemas dinâmicos, pequenas variações nas condições iniciais podem levar a resultados completamente diferentes a longo prazo.",
    whyPrecisionMatters:
      "Origem em meteorologia (Lorenz, 1963), não filosofia popular. Mencionar contexto científico evita soar a frase de calendário.",
    mnemonic: "Pequena causa, grande consequência, sistema sensível.",
    relatedConcept: {
      concept: "Caos determinístico",
      how: "Sistemas que seguem leis precisas mas cujos resultados são imprevisíveis na prática.",
    },
  },
  {
    concept: "Maiêutica",
    typicalAnswer:
      "É quando alguém te faz perguntas para tu chegares à resposta sozinho.",
    preciseAnswer:
      "Método socrático de ajudar alguém a alcançar uma conclusão através de perguntas, em vez de transmissão direta.",
    whyPrecisionMatters:
      "Nomear o método dá-lhe profundidade — implica intenção pedagógica, herança socrática, e técnica deliberada.",
    mnemonic: "Parteira de ideias.",
    relatedConcept: {
      concept: "Aprendizagem ativa",
      how: "Princípio pedagógico moderno que reflete a intuição da maiêutica: aprende-se mais a procurar respostas que a recebê-las.",
    },
  },
  {
    concept: "Janela de Overton",
    typicalAnswer:
      "É o espaço de ideias que se podem dizer publicamente sem se ser cancelado.",
    preciseAnswer:
      "Espectro de ideias considerado politicamente aceitável pelo público num dado momento histórico.",
    whyPrecisionMatters:
      "Saber este conceito dá-te ferramenta para falar sobre mudança cultural sem cair em queixas vagas.",
    mnemonic: "O dizível, hoje.",
    relatedConcept: {
      concept: "Choque cultural",
      how: "Ideias que estavam fora da janela podem entrar; o que estava dentro pode sair — a janela move-se.",
    },
  },
  {
    concept: "Dialética",
    typicalAnswer:
      "É quando duas ideias opostas se confrontam e nasce uma terceira.",
    preciseAnswer:
      "Processo de pensamento em que ideias opostas se confrontam para gerar uma compreensão superior — tese, antítese, síntese.",
    whyPrecisionMatters:
      "Hegel deu-lhe estrutura. Sem essa estrutura, parece só 'discutir' — com ela, é método.",
    mnemonic: "Tese → antítese → síntese.",
    relatedConcept: {
      concept: "Pensamento crítico",
      how: "Dialética é uma das suas técnicas — confrontar a tua posição com a oposta antes de a fixar.",
    },
  },
  {
    concept: "Hubris",
    typicalAnswer:
      "É quando alguém é demasiado arrogante e isso acaba mal.",
    preciseAnswer:
      "Excesso de orgulho ou ambição que leva à queda — conceito grego clássico de tragédia.",
    whyPrecisionMatters:
      "Hubris implica queda. Arrogância não. Em narrativa ou análise, hubris é diagnóstico, arrogância é descrição.",
    mnemonic: "Orgulho + queda.",
    relatedConcept: {
      concept: "Nemesis",
      how: "Na tragédia grega, é a punição que segue a hubris. Hubris sem nemesis é apenas arrogância.",
    },
  },
];

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function buildPoolWord(dateKey: string): Word {
  return WORD_POOL[hashString(dateKey + "-w") % WORD_POOL.length];
}

export function buildPoolChallenge(dateKey: string): ExplainChallenge {
  return CHALLENGE_POOL[hashString(dateKey + "-c") % CHALLENGE_POOL.length];
}
