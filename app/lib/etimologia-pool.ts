export type Etimologia = {
  id: string;
  word: string;
  origin: string;
  story: string;
  modernMeaning: string;
  curiosity?: string;
};

export const ETIMOLOGIA_POOL: Etimologia[] = [
  {
    id: "salario",
    word: "Salário",
    origin: "Do latim salarium, derivado de sal.",
    story:
      "Os soldados romanos recebiam parte da remuneração em sal — bem precioso na altura, usado para conservar alimentos. Daí 'salário' vir de 'sal'.",
    modernMeaning:
      "Pagamento regular pelo trabalho prestado, normalmente mensal.",
    curiosity:
      "A expressão 'vale o seu salário' (worth his salt em inglês) tem aqui a origem.",
  },
  {
    id: "trabalho",
    word: "Trabalho",
    origin: "Do latim tripalium — instrumento de tortura com três paus.",
    story:
      "O tripalium era usado para imobilizar animais a ferrar ou pessoas a punir. O termo passou a designar qualquer esforço penoso — depois, qualquer atividade laboral.",
    modernMeaning:
      "Atividade humana de transformação ou produção, normalmente remunerada.",
    curiosity:
      "Em francês, 'travail' tem a mesma origem. Em inglês, 'work' tem origem diferente (germânica) e por isso não carrega esta conotação de sofrimento.",
  },
  {
    id: "companheiro",
    word: "Companheiro",
    origin: "Do latim cum (com) + panis (pão).",
    story:
      "Originalmente, companheiro era 'aquele com quem partilhas o pão' — em latim, cumpanis. Os romanos consideravam que partilhar comida era o ato fundador de uma relação.",
    modernMeaning:
      "Pessoa com quem se partilha algo importante — vida, trabalho, jornada.",
    curiosity:
      "'Camarada' tem origem semelhante: vem de cámara (quarto), 'aquele que partilha o quarto'.",
  },
  {
    id: "candidato",
    word: "Candidato",
    origin: "Do latim candidus — branco, brilhante, puro.",
    story:
      "Nas eleições romanas, quem se apresentava a cargo público usava toga branqueada com gesso (candida toga) como sinal de pureza moral. 'Candidato' era literalmente 'o vestido de branco'.",
    modernMeaning:
      "Pessoa que se apresenta a uma seleção ou eleição.",
    curiosity:
      "A mesma raiz dá 'candura' (pureza), 'cândido' (ingénuo) e 'candelabro' (que dá luz branca).",
  },
  {
    id: "panico",
    word: "Pânico",
    origin: "Do nome do deus grego Pã.",
    story:
      "Pã era o deus dos pastores e da natureza selvagem. Acreditava-se que assustava viajantes solitários em florestas, provocando medo súbito e inexplicável. Esse medo passou a chamar-se 'pânico'.",
    modernMeaning:
      "Medo intenso e súbito, frequentemente desproporcional ao perigo real.",
    curiosity:
      "'Pandemónio' (caos total) tem origem diferente — vem de Milton em 'Paraíso Perdido': pan (todos) + demónios.",
  },
  {
    id: "sarcasmo",
    word: "Sarcasmo",
    origin: "Do grego sarkázein — literalmente 'arrancar a carne com os dentes'.",
    story:
      "Os gregos descreviam o riso cruel como morder a carne do outro. A imagem física da mordida ficou na palavra — sarcasmo magoa porque corta.",
    modernMeaning:
      "Ironia agressiva, dita com intenção de ferir o alvo.",
    curiosity:
      "A raiz sarx (carne) também aparece em 'sarcófago' — literalmente 'comedor de carne', porque os antigos sarcófagos eram feitos de pedra que decompunha cadáveres rapidamente.",
  },
  {
    id: "idiota",
    word: "Idiota",
    origin: "Do grego idiótes — pessoa privada, não envolvida em assuntos públicos.",
    story:
      "Na Atenas antiga, o cidadão que não participava em política e ficava só nos seus assuntos privados era chamado idiótes — sem juízo cívico, sem entendimento das coisas comuns. Não era insulto de inteligência; era de civismo.",
    modernMeaning:
      "Pessoa de fraca capacidade intelectual; insulto comum.",
    curiosity:
      "A palavra mudou de sentido completamente. Para um grego antigo, viver só na vida privada (mesmo sendo brilhante) era ser idiota.",
  },
  {
    id: "musica",
    word: "Música",
    origin: "Do grego mousike téchne — a arte das Musas.",
    story:
      "As Musas, na mitologia grega, eram nove deusas que inspiravam as artes. 'Música' originalmente referia-se a TODAS as artes inspiradas pelas Musas — não só som.",
    modernMeaning:
      "Arte de combinar sons no tempo de forma organizada e expressiva.",
    curiosity:
      "'Museu' vem da mesma raiz — era originalmente um templo das Musas.",
  },
  {
    id: "histeria",
    word: "Histeria",
    origin: "Do grego hystéra — útero.",
    story:
      "Os médicos gregos antigos (incluindo Hipócrates) acreditavam que sintomas como ansiedade e crises emocionais eram causados pelo útero a 'vaguear' pelo corpo. Daí, histeria — doença supostamente feminina.",
    modernMeaning:
      "Reação emocional excessiva; em psicologia moderna, termo obsoleto.",
    curiosity:
      "A palavra teve história misógina. Hoje é evitada em medicina precisamente por essa raiz problemática.",
  },
  {
    id: "domingo",
    word: "Domingo",
    origin: "Do latim dies dominicus — dia do Senhor.",
    story:
      "No latim cristianizado, o sétimo dia da semana (dia do descanso e do culto) foi dedicado a Deus, daí dies dominicus. Os outros dias mantiveram nomes de deuses pagãos (Marte, Mercúrio, Júpiter, Vénus, Saturno) — só o sábado (sabbatum, hebraico) e o domingo são religiosamente marcados.",
    modernMeaning: "Sétimo dia da semana, tradicionalmente de descanso.",
  },
  {
    id: "filosofia",
    word: "Filosofia",
    origin: "Do grego philo (amor) + sophia (sabedoria).",
    story:
      "Pitágoras terá sido o primeiro a usar o termo. Quando lhe chamaram sábio (sophos), recusou: 'sábio é só Deus; eu sou apenas filósofo — amante da sabedoria'.",
    modernMeaning:
      "Disciplina que investiga sistematicamente os fundamentos do conhecimento, da realidade e da existência.",
    curiosity:
      "A humildade da palavra está esquecida. Hoje 'filósofo' soa pretensioso, mas etimologicamente é o contrário.",
  },
  {
    id: "lunatic",
    word: "Lunático",
    origin: "Do latim luna — Lua.",
    story:
      "Acreditava-se que a Lua influenciava o estado mental. Pessoas com crises mentais episódicas eram 'lunáticas' — afetadas pela Lua.",
    modernMeaning:
      "Pessoa de comportamento errático ou imprevisível.",
    curiosity:
      "Sobreviveu como termo coloquial, embora a ideia original tenha sido refutada pela ciência há séculos.",
  },
  {
    id: "universidade",
    word: "Universidade",
    origin: "Do latim universitas — totalidade, comunidade.",
    story:
      "Universitas magistrorum et scholarium — comunidade de mestres e estudantes. A primeira universidade da Europa (Bolonha, 1088) começou como guilda de estudantes e professores.",
    modernMeaning:
      "Instituição de ensino superior abrangendo várias áreas de conhecimento.",
    curiosity:
      "A palavra capta o ideal: comunidade que estuda o todo. As universidades modernas, especializadas, contradizem em parte esta origem.",
  },
  {
    id: "ostracismo",
    word: "Ostracismo",
    origin: "Do grego óstrakon — caco de cerâmica.",
    story:
      "Na Atenas do séc. V a.C., os cidadãos votavam anualmente a expulsão de alguém que considerassem perigoso para a democracia. Cada voto era escrito num caco de cerâmica (óstrakon). Mais de 6000 votos contra a mesma pessoa = exílio de 10 anos.",
    modernMeaning:
      "Exclusão sistemática de alguém de um grupo, por decisão coletiva.",
    curiosity:
      "Era prevenção contra tiranos. Hoje, o conceito sobrevive em formas informais — 'cancelamento' tem ecos antigos.",
  },
  {
    id: "etcetera",
    word: "Etcétera",
    origin: "Do latim et cetera — 'e o resto'.",
    story:
      "Usado pelos romanos para encurtar enumerações, exatamente como hoje. Sobreviveu intacto mais de 2000 anos.",
    modernMeaning:
      "E o resto; e outras coisas do mesmo género.",
    curiosity:
      "Abrevia-se 'etc.' — o ponto final marca a abreviação, não a frase. Por isso 'etc.' aparece no meio de frases.",
  },
];
