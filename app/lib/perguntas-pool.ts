import type { PhilosophicalQuestion } from "./types";

export const QUESTION_POOL: PhilosophicalQuestion[] = [
  {
    question:
      "Se substituíssem gradualmente todas as células do teu corpo por outras idênticas, ainda serias tu?",
    theme: "Identidade",
    whyItMatters:
      "Esta é a versão moderna do paradoxo do Navio de Teseu. A resposta diz muito sobre o que pensas que és — um objeto físico, um padrão de informação, uma narrativa, uma alma?",
    trapAnswer:
      "Sim, claro — eu sinto-me a mesma pessoa.",
    perspectives: [
      {
        name: "Locke",
        view: "Identidade pessoal = continuidade da memória. Enquanto te lembrares de ti, és tu — o corpo é incidental.",
      },
      {
        name: "Hume",
        view: "O 'eu' é uma ilusão. Somos um feixe de perceções em mudança constante — não há substância duradoura a que chamar 'eu'.",
      },
      {
        name: "Parfit",
        view: "A identidade pessoal não importa tanto quanto pensamos. O que importa é a continuidade psicológica — gradual e imperfeita.",
      },
    ],
    pushFurther:
      "E se em vez de células fossem substituídas as tuas memórias, uma por dia?",
  },
  {
    question:
      "Se ninguém soubesse, e ninguém pudesse descobrir, ainda agirias bem?",
    theme: "Ética",
    whyItMatters:
      "Distingue moral instrumental (não fazer mal para evitar punição) de moral intrínseca (não fazer mal por ser mal). A diferença define o caráter.",
    trapAnswer:
      "Claro, porque eu sou boa pessoa.",
    perspectives: [
      {
        name: "Platão (Anel de Giges)",
        view: "Conta a história de um pastor que encontra um anel da invisibilidade. Argumenta que a maioria das pessoas faria mal se pudesse, sem consequências — a virtude verdadeira é rara.",
      },
      {
        name: "Kant",
        view: "Agir bem só por dever, sem qualquer interesse. Se ages bem porque vais ser visto, o ato não tem valor moral.",
      },
      {
        name: "Aristóteles",
        view: "A virtude é hábito formado pela prática. Se praticaste virtude, ages bem mesmo sozinho — não por escolha, mas por carácter.",
      },
    ],
    pushFurther:
      "Como saberias que não estavas a ser observado, mesmo nos teus pensamentos?",
  },
  {
    question:
      "É melhor uma vida feliz na ignorância ou uma vida difícil com consciência?",
    theme: "Felicidade",
    whyItMatters:
      "É a pergunta de Mill: 'Melhor ser Sócrates infeliz que um porco satisfeito?'. A resposta revela se valorizas qualidade ou quantidade de bem-estar.",
    trapAnswer:
      "Depende — o conforto também vale algo.",
    perspectives: [
      {
        name: "John Stuart Mill",
        view: "Há prazeres superiores (intelectuais, morais) e inferiores (sensoriais). Melhor Sócrates infeliz do que um porco satisfeito.",
      },
      {
        name: "Jeremy Bentham",
        view: "Felicidade é felicidade. Se a ignorância é mais feliz na soma total, escolhe-a. Não há hierarquia.",
      },
      {
        name: "Nietzsche",
        view: "A consciência da dor é parte do crescimento. Uma vida sem dor é morte em vida. O sofrimento informado vale mais que conforto vazio.",
      },
    ],
    pushFurther:
      "E se a ignorância significasse nunca conheceres verdadeiramente ninguém — incluindo tu mesmo?",
  },
  {
    question:
      "Tens livre-arbítrio ou és apenas a soma das tuas circunstâncias?",
    theme: "Liberdade",
    whyItMatters:
      "Esta resposta determina como vês responsabilidade, mérito, culpa, justiça e, no fundo, a tua própria autoria.",
    trapAnswer:
      "Tenho — sinto que escolho.",
    perspectives: [
      {
        name: "Determinismo",
        view: "Cada decisão é causada por estados anteriores (cérebro, ambiente, genes). A sensação de liberdade é construção a posteriori — útil, mas ilusão.",
      },
      {
        name: "Libertarismo metafísico",
        view: "Há genuína indeterminação na escolha humana. Somos agentes causais — começamos novas cadeias de causalidade.",
      },
      {
        name: "Compatibilismo",
        view: "Liberdade não é ausência de causas. É agir de acordo com aquilo que queres — mesmo que esse querer seja causado por estados anteriores.",
      },
    ],
    pushFurther:
      "Se tudo o que fazes foi determinado, faz ainda sentido punir ou recompensar?",
  },
  {
    question:
      "Se pudesses saber a data exata da tua morte, quererias saber?",
    theme: "Finitude",
    whyItMatters:
      "Confrontar a morte como horizonte muda como vives. Heidegger chama-lhe 'ser-para-a-morte' — é a finitude consciente que torna a vida autêntica.",
    trapAnswer:
      "Não, ia destruir-me.",
    perspectives: [
      {
        name: "Estoicos (Memento Mori)",
        view: "Lembrar a morte afina prioridades. Saber o dia exato seria uma ferramenta — concentraria a atenção no que importa.",
      },
      {
        name: "Heidegger",
        view: "É a consciência da finitude que torna a vida autêntica. Sem ela, fugimos para o 'on' anónimo das tarefas vazias.",
      },
      {
        name: "Epicuro",
        view: "'Enquanto eu sou, a morte não é; quando a morte é, eu já não sou.' Saber a data não muda nada — viver bem hoje é o suficiente.",
      },
    ],
    pushFurther:
      "O que mudarias no dia de hoje se soubesses que faltam exatamente 1000 dias?",
  },
  {
    question:
      "É possível conhecer verdadeiramente outra pessoa?",
    theme: "Conhecimento",
    whyItMatters:
      "Toda a relação humana depende desta resposta. Se é possível, vale o esforço. Se não é, há que aceitar uma certa solidão inevitável.",
    trapAnswer:
      "Sim, se passarmos muito tempo juntos.",
    perspectives: [
      {
        name: "Wittgenstein",
        view: "Não há linguagem privada. Só conhecemos o que se externaliza em palavras e ações — o resto é inacessível.",
      },
      {
        name: "Sartre",
        view: "O outro é radicalmente inacessível. Só vemos a sua aparência — a sua consciência permanece sempre fora do nosso alcance.",
      },
      {
        name: "Lévinas",
        view: "O outro é precisamente o que não pode ser totalizado nem reduzido a categorias. Esta é a sua dignidade — não o conhecemos, respeitamos.",
      },
    ],
    pushFurther:
      "Conheces-te a ti mesmo? Se não, por que pensarias que conheces outro?",
  },
  {
    question:
      "Salvarias 5 desconhecidos atirando 1 pessoa para a linha do comboio?",
    theme: "Ética",
    whyItMatters:
      "É o famoso 'trolley problem' de Philippa Foot. Coloca em confronto utilitarismo (maximizar bem) e deontologia (não usar pessoas como meio). Ambas as respostas têm peso.",
    trapAnswer:
      "Claro, 5 vidas valem mais que 1.",
    perspectives: [
      {
        name: "Utilitarismo (Mill, Bentham)",
        view: "Maximiza o bem-estar total. 5 vidas > 1 vida. Atira — não atirar é deixar 4 pessoas morrerem desnecessariamente.",
      },
      {
        name: "Kant",
        view: "Nunca uses uma pessoa apenas como meio. Atirar é instrumentalizar — transformas o 1 em ferramenta para salvar os 5. Não podes.",
      },
      {
        name: "Philippa Foot",
        view: "Há diferença moral entre matar (intervenção ativa) e deixar morrer (omissão). Não-intervenção tem peso próprio na moralidade.",
      },
    ],
    pushFurther:
      "E se o 1 fosse um filho teu? E se os 5 fossem criminosos condenados?",
  },
  {
    question:
      "Se descobrisses que vives numa simulação, mudaria algo?",
    theme: "Realidade",
    whyItMatters:
      "A versão moderna de uma pergunta antiga — Platão (Caverna), Descartes (génio maligno), Zhuangzi (sonho da borboleta). Só a embalagem mudou.",
    trapAnswer:
      "Sim, faria menos esforço — nada importaria.",
    perspectives: [
      {
        name: "Platão (Caverna)",
        view: "Já estamos numa simulação — a perceção sensorial é sempre mediada. Saber disso liberta-nos para procurar a realidade mais profunda.",
      },
      {
        name: "Nick Bostrom",
        view: "Estatisticamente, é provável que estejamos numa simulação. Pouco muda — as regras continuam reais para nós, dentro da simulação.",
      },
      {
        name: "Existencialismo",
        view: "Significado constrói-se mesmo num mundo absurdo. Simulação ou não, a tua resposta ao mundo permanece como é — o que conta é o que fazes com o que vês.",
      },
    ],
    pushFurther:
      "Como provarias a ti próprio que NÃO estás numa simulação?",
  },
  {
    question:
      "O sofrimento tem valor ou é apenas dor a evitar?",
    theme: "Sofrimento",
    whyItMatters:
      "Define se construímos vidas que evitam dor a qualquer custo, ou que integram o sofrimento como matéria de crescimento.",
    trapAnswer:
      "Tem valor se nos faz crescer.",
    perspectives: [
      {
        name: "Budismo",
        view: "Sofrimento (dukkha) é a primeira nobre verdade — é inevitável. O caminho é libertarmo-nos da causa (apego), não negar a dor.",
      },
      {
        name: "Nietzsche",
        view: "Aquilo que não me mata torna-me mais forte. Sofrer com sentido é diferente de sofrer absurdo — o primeiro forma, o segundo aniquila.",
      },
      {
        name: "Utilitarismo",
        view: "Evitar sofrimento é o objetivo moral. Procurar sofrimento intencionalmente, mesmo para 'crescer', é equivocado — há outras vias.",
      },
    ],
    pushFurther:
      "E sofrimento sem sentido — guerra, doença na infância? Tem valor?",
  },
  {
    question:
      "A liberdade é poder fazer o que queres, ou querer fazer o que deves?",
    theme: "Liberdade",
    whyItMatters:
      "Isaiah Berlin distinguiu liberdade negativa (de constrangimentos externos) de liberdade positiva (autodomínio). Confundi-las leva a confusão política e existencial.",
    trapAnswer:
      "É fazer o que se quer.",
    perspectives: [
      {
        name: "Isaiah Berlin",
        view: "Liberdade negativa: ausência de constrangimentos. Liberdade positiva: autonomia consciente. Confundi-las é perigoso — leva a impor 'liberdade verdadeira' aos outros.",
      },
      {
        name: "Estoicos",
        view: "A verdadeira liberdade é interior — alinhar o querer com a natureza das coisas. Quem é escravo dos seus desejos não é livre.",
      },
      {
        name: "Foucault",
        view: "Mesmo o 'querer' é construído por estruturas de poder, normas, instituições. A liberdade absoluta é ilusória — somos sempre situados.",
      },
    ],
    pushFurther:
      "Quem deformou os teus 'quereres' — família, redes sociais, publicidade, cultura?",
  },
  {
    question:
      "É melhor não ter nascido?",
    theme: "Existência",
    whyItMatters:
      "Schopenhauer e os anti-natalistas modernos colocam a questão a sério. A resposta diz muito sobre como vês a balança fundamental da vida — peso da dor vs peso do prazer.",
    trapAnswer:
      "Claro que não — eu gosto de viver.",
    perspectives: [
      {
        name: "Schopenhauer",
        view: "A vida é maioritariamente sofrimento entremeado com momentos de alívio. Considera-se infeliz quem não se considera satisfeito.",
      },
      {
        name: "Camus",
        view: "Sim, a vida é absurda — mas a resposta certa é viver mesmo assim, com revolta consciente. É necessário imaginar Sísifo feliz.",
      },
      {
        name: "Existencialismo",
        view: "Não nasceste por escolha, mas constróis sentido a partir daí. A pergunta 'é melhor não ter nascido?' é menos importante do que 'o que fazes da vida que tens?'.",
      },
    ],
    pushFurther:
      "Recomendarias a alguém querido nascer hoje, sabendo o que sabes do mundo?",
  },
  {
    question:
      "O dinheiro pode comprar felicidade?",
    theme: "Felicidade",
    whyItMatters:
      "A resposta moderna é mais subtil do que 'não' ou 'sim'. Estudos recentes (Kahneman, Killingsworth) sugerem que depende — e a nuance importa.",
    trapAnswer:
      "Não, claro que não.",
    perspectives: [
      {
        name: "Estoicos",
        view: "Não. A felicidade é interior, independente das circunstâncias materiais. Riqueza pode até prejudicar — distrai do essencial.",
      },
      {
        name: "Epicuro",
        view: "Sim, se cobre as necessidades básicas e te liberta de medo crónico. Acima disso, o retorno diminui rapidamente.",
      },
      {
        name: "Kahneman / Killingsworth",
        view: "Acima de certo nível (cerca de 75.000$/ano), dinheiro não traz felicidade adicional para a maioria. Mas TIRA infelicidade quando há pobreza — não é o mesmo.",
      },
    ],
    pushFurther:
      "Trocarias 50% do teu rendimento por 50% mais tempo livre?",
  },
  {
    question:
      "Conheces-te a ti mesmo?",
    theme: "Autoconhecimento",
    whyItMatters:
      "A pergunta inscrita no oráculo de Delfos, repetida por Sócrates. Toda a filosofia ocidental começa aqui. A psicologia moderna sugere que respondemos mal a esta pergunta sistematicamente.",
    trapAnswer:
      "Sim, mais ou menos.",
    perspectives: [
      {
        name: "Sócrates",
        view: "A maioria sobreestima o que sabe sobre si. Sócrates foi declarado mais sábio precisamente por reconhecer a ignorância do seu eu.",
      },
      {
        name: "Jung",
        view: "Conheces apenas a parte consciente — o inconsciente é maior. A sombra (o que rejeitas em ti) é parte central de quem és, mas raramente é vista.",
      },
      {
        name: "Psicologia cognitiva moderna",
        view: "Não te conheces tão bem como pensas. Explicamo-nos a nós próprios após o facto, com narrativas que frequentemente são erradas — confabulação.",
      },
    ],
    pushFurther:
      "Que parte de ti achas que mais te custaria reconhecer publicamente?",
  },
  {
    question:
      "O que merece ser preservado em ti, depois de morreres?",
    theme: "Legado",
    whyItMatters:
      "Esclarece prioridades. Tudo o que respondes a esta pergunta é o que verdadeiramente valorizas — o que perseguir, o que negligenciar, o que descartar.",
    trapAnswer:
      "As memórias dos que ficam.",
    perspectives: [
      {
        name: "Aristóteles",
        view: "O caráter que cultivaste vive nos hábitos que mudaste em outros. A virtude propaga-se por mimetismo silencioso.",
      },
      {
        name: "Pessoa",
        view: "Talvez nada — talvez tudo. A obra fica, o homem some. O nome continua a falar quando a boca já não pode.",
      },
      {
        name: "Budismo",
        view: "O 'tu' é ilusão. O que fica é apenas o efeito das tuas ações no mundo — kármico, ondulatório, sem 'agente' a quem atribuir.",
      },
    ],
    pushFurther:
      "Se tivesses de escrever uma única frase para gravar na tua lápide, qual seria?",
  },
  {
    question:
      "A natureza é gentil, hostil ou indiferente?",
    theme: "Natureza",
    whyItMatters:
      "A resposta molda toda a tua relação com o mundo não-humano — proteges, dominas, ou simplesmente coexistes? Tem consequências políticas e existenciais.",
    trapAnswer:
      "Indiferente, claro.",
    perspectives: [
      {
        name: "Românticos (Rousseau, Wordsworth)",
        view: "A natureza é mãe — fonte de beleza, verdade e regeneração. O problema é a civilização, que nos afasta dela.",
      },
      {
        name: "Hobbes",
        view: "A natureza é cruel. Na ausência de sociedade civil, a vida humana é 'solitária, pobre, brutal e curta'.",
      },
      {
        name: "Camus",
        view: "A natureza é indiferente — não te quer mal nem bem. A consciência humana é a anomalia que pergunta pelo sentido onde não há nenhum.",
      },
    ],
    pushFurther:
      "Em que momento te sentiste mais 'em casa' na natureza? E mais 'estranho' nela?",
  },
  {
    question:
      "O amor é uma escolha ou algo que nos acontece?",
    theme: "Amor",
    whyItMatters:
      "Determina se vês o amor como virtude (cultivável) ou como acaso (imprevisível). A resposta muda como o procuras e o mantens.",
    trapAnswer:
      "É algo que acontece.",
    perspectives: [
      {
        name: "Romantismo",
        view: "O amor é destino, não escolha. Vens encontrar a 'alma gémea' — quando a encontras, sabes. Não há trabalho, há reconhecimento.",
      },
      {
        name: "Erich Fromm",
        view: "Amor é uma arte que se pratica, como tocar piano. Exige atenção, disciplina, conhecimento e paciência. Não é estado emocional — é prática.",
      },
      {
        name: "Sartre",
        view: "O amor é um projeto comum — ambos escolhem co-construir significado partilhado. Não é dado, é feito juntos.",
      },
    ],
    pushFurther:
      "Se o amor é escolha, podes deixar de amar alguém? E se é imposição, podes ser obrigado a amar?",
  },
  {
    question:
      "A maioria tem sempre razão?",
    theme: "Política",
    whyItMatters:
      "Núcleo do conflito entre democracia (governo pela maioria) e liberalismo (direitos individuais inalienáveis). Confundir os dois é fonte de erro político.",
    trapAnswer:
      "Não, só porque muita gente acha não é verdade.",
    perspectives: [
      {
        name: "Tocqueville",
        view: "A 'tirania da maioria' pode ser pior do que a do tirano — porque é difusa, social, sem rosto. Uniformiza pelo desejo de pertencer.",
      },
      {
        name: "Sócrates",
        view: "Foi condenado à morte pela maioria de Atenas. A verdade não se vota — e a história mostra que a maioria errou frequentemente sobre o essencial.",
      },
      {
        name: "John Stuart Mill",
        view: "A maioria pode ditar gosto e moral sobre minorias. Por isso são necessários direitos blindados — coisas que nem a maioria pode tirar.",
      },
    ],
    pushFurther:
      "Em que decisões a maioria DEVE decidir, e em quais nunca devia?",
  },
  {
    question:
      "Vale a pena fazer arte se ninguém a vir?",
    theme: "Arte",
    whyItMatters:
      "Pergunta sobre a função da arte e do trabalho criativo. A resposta diz muito sobre se fazes pelo prazer do fazer ou pela receção do feito.",
    trapAnswer:
      "Sim, claro — é para nós próprios.",
    perspectives: [
      {
        name: "Tolstoi",
        view: "Arte é comunicação de emoção verdadeira de pessoa a pessoa. Sem destinatário, falta-lhe a sua função — é privada, não é arte.",
      },
      {
        name: "Wilde",
        view: "A arte não tem utilidade exterior. É inútil — e por isso é valiosa. Faz-se pelo gesto, não pelo público.",
      },
      {
        name: "Aristóteles",
        view: "Arte produz catarse no espectador — purifica emoções. Sem espectador, falha o seu efeito último. Mas o gesto criativo tem valor próprio.",
      },
    ],
    pushFurther:
      "Se tudo o que escreveste fosse apagado depois de morreres, e ninguém pudesse copiar nem lembrar, ainda escreverias?",
  },
  {
    question:
      "Há limites para o que devemos perdoar?",
    theme: "Perdão",
    whyItMatters:
      "Define como pensamos sobre justiça, reparação, e relações humanas duradouras. A resposta tem implicações para crime, política, e relações pessoais.",
    trapAnswer:
      "Sim, há coisas imperdoáveis.",
    perspectives: [
      {
        name: "Cristianismo (Mt 18:22)",
        view: "Perdoar setenta vezes sete — ou seja, sempre. O perdão é mais sobre quem perdoa do que sobre quem é perdoado.",
      },
      {
        name: "Hannah Arendt",
        view: "O perdão liberta-nos do ciclo de vingança, mas há crimes radicais (Holocausto) que talvez estejam para além do perdão humano.",
      },
      {
        name: "Justiça restaurativa",
        view: "O perdão exige reconhecimento do dano por quem o causou, e reparação concreta — não é declaração unilateral.",
      },
    ],
    pushFurther:
      "Se perdoares o que outros não perdoam, és virtuoso ou cúmplice?",
  },
  {
    question:
      "Estás onde estás por mérito ou por sorte?",
    theme: "Justiça",
    whyItMatters:
      "Reconhecer o peso da sorte (gene, família, época, país) muda como vês os teus sucessos — e como julgas os que não tiveram a tua sorte.",
    trapAnswer:
      "Mistura dos dois.",
    perspectives: [
      {
        name: "Meritocracia",
        view: "O esforço e o talento produzem resultados — a posição reflete o mérito. Acreditar nisto motiva a esforçar-se.",
      },
      {
        name: "Michael Sandel",
        view: "A 'meritocracia' moderna ignora o papel enorme da sorte (de nascimento, talento, contexto). Quem chegou ao topo deve isso em larga medida a fatores que não controlou.",
      },
      {
        name: "Rawls",
        view: "Mesmo o talento e o esforço são em parte 'sorte' — vens com cérebro, temperamento, energia que não escolheste. Justiça exige redistribuir essa sorte.",
      },
    ],
    pushFurther:
      "Se trocasses a tua vida desde nascimento com alguém aleatório no mundo, mudaria onde estás?",
  },
];

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function buildPoolQuestion(dateKey: string): PhilosophicalQuestion {
  return QUESTION_POOL[hashString(dateKey + "-pq") % QUESTION_POOL.length];
}
