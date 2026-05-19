export type Falacia = {
  id: string;
  name: string;
  latin?: string;
  definition: string;
  example: string;
  howToSpot: string;
  howToCounter: string;
  category: "Relevância" | "Estrutura" | "Emoção" | "Ambiguidade";
};

export const FALACIAS_POOL: Falacia[] = [
  {
    id: "ad-hominem",
    name: "Ad hominem",
    latin: "ad hominem",
    definition:
      "Atacar a pessoa que apresenta o argumento, em vez do argumento em si.",
    example:
      "'Não podes falar de ambiente — andas sempre de carro.' O carro do interlocutor não invalida o que ele diz sobre ambiente.",
    howToSpot:
      "Repara se o contra-argumento é sobre o argumento ou sobre quem o disse. Se é sobre quem, é ad hominem.",
    howToCounter:
      "Devolve calmamente o foco: 'Posso ter contradições pessoais, mas a questão é se o que disse é verdadeiro ou não.'",
    category: "Relevância",
  },
  {
    id: "falsa-dicotomia",
    name: "Falsa dicotomia",
    definition:
      "Apresentar apenas duas opções (geralmente extremas) quando existem outras possibilidades.",
    example:
      "'Ou apoias a guerra, ou és traidor ao país.' Há centenas de posições intermédias possíveis.",
    howToSpot:
      "Procura por 'ou … ou …'. Pergunta-te: serão mesmo só duas as opções, ou há mais?",
    howToCounter:
      "Apresenta uma terceira opção concreta: 'Há pelo menos uma outra hipótese — X.'",
    category: "Estrutura",
  },
  {
    id: "espantalho",
    name: "Espantalho (straw man)",
    definition:
      "Deformar o argumento do adversário para o tornar mais fácil de derrubar.",
    example:
      "A diz: 'Devíamos investir mais em saúde mental.' B responde: 'Então achas que devemos ignorar o cancro?' B não respondeu ao argumento real.",
    howToSpot:
      "Quando alguém te responde a uma versão exagerada ou simplificada do que disseste, é espantalho.",
    howToCounter:
      "'Não foi isso que eu disse. O meu argumento real é X.' Repete a versão tua, exata.",
    category: "Estrutura",
  },
  {
    id: "apelo-autoridade",
    name: "Apelo à autoridade",
    latin: "argumentum ad verecundiam",
    definition:
      "Citar uma autoridade fora da sua área de especialidade como prova, em vez do mérito do argumento.",
    example:
      "'Este ator famoso diz que esta dieta funciona, logo funciona.' Fama em representação não é credencial em nutrição.",
    howToSpot:
      "A autoridade citada é especialista na área concreta? Se não, há apelo indevido.",
    howToCounter:
      "'Pode ser autoridade noutra área, mas aqui o que conta são os estudos / dados / evidência.'",
    category: "Relevância",
  },
  {
    id: "falsa-causalidade",
    name: "Falsa causalidade",
    latin: "post hoc ergo propter hoc",
    definition:
      "Concluir que A causou B só porque B aconteceu depois de A. Confundir correlação com causalidade.",
    example:
      "'Comprei o livro e no dia seguinte recebi a promoção — o livro deu-me sorte.' Coincidência temporal não prova relação causal.",
    howToSpot:
      "Pergunta: há mecanismo concreto que ligue A a B, ou só vieram um a seguir ao outro?",
    howToCounter:
      "'Aconteceu depois, mas isso não prova que tenha sido por causa.'",
    category: "Estrutura",
  },
  {
    id: "ad-populum",
    name: "Apelo ao povo",
    latin: "argumentum ad populum",
    definition:
      "Defender que algo é verdadeiro ou bom porque muitas pessoas acreditam ou fazem.",
    example:
      "'Toda a gente acredita nisto, logo deve ser verdade.' Muita gente já acreditou que o sol girava à volta da Terra.",
    howToSpot:
      "Procura 'toda a gente', 'a maioria pensa', 'desde sempre se faz assim' como prova.",
    howToCounter:
      "'Quantos acreditam não é argumento. O argumento é se há razões para acreditar.'",
    category: "Relevância",
  },
  {
    id: "generalizacao-apressada",
    name: "Generalização apressada",
    definition:
      "Tirar conclusão geral a partir de um ou poucos casos particulares, sem base suficiente.",
    example:
      "'Conheci dois portugueses preguiçosos, logo os portugueses são preguiçosos.' Dois casos não representam 10 milhões.",
    howToSpot:
      "Repara em conclusões sobre grupos inteiros baseadas em poucos exemplos.",
    howToCounter:
      "'Quantos casos conheces? E são representativos? Sem amostra, não há conclusão.'",
    category: "Estrutura",
  },
  {
    id: "peticao-principio",
    name: "Petição de princípio",
    latin: "petitio principii",
    definition:
      "Usar a conclusão que se quer provar como premissa do argumento — circularidade disfarçada.",
    example:
      "'A Bíblia é verdadeira porque é a palavra de Deus, e sabemos que é a palavra de Deus porque a Bíblia o diz.'",
    howToSpot:
      "O argumento volta a si próprio? A premissa só funciona se já aceitarmos a conclusão?",
    howToCounter:
      "'Estás a assumir o que querias provar. Precisas de uma premissa independente.'",
    category: "Estrutura",
  },
  {
    id: "apelo-ignorancia",
    name: "Apelo à ignorância",
    latin: "argumentum ad ignorantiam",
    definition:
      "Defender que algo é verdadeiro porque não se provou que é falso (ou vice-versa).",
    example:
      "'Ninguém provou que não há vida extraterrestre, logo há.' Ausência de prova não é prova de ausência — nem o contrário.",
    howToSpot:
      "Procura 'ninguém provou o contrário' como justificação positiva.",
    howToCounter:
      "'A falta de prova não é prova. O ónus é de quem afirma, não de quem questiona.'",
    category: "Estrutura",
  },
  {
    id: "apelo-emocao",
    name: "Apelo à emoção",
    latin: "argumentum ad passiones",
    definition:
      "Tentar convencer manipulando emoções (medo, pena, raiva) em vez de apresentar razões.",
    example:
      "'Se não votares neste projeto, as crianças vão sofrer.' A conclusão pode ser justa, mas o medo não é argumento — os factos é que são.",
    howToSpot:
      "Repara se o discurso é cheio de imagens emocionais sem dados ou lógica.",
    howToCounter:
      "'Concordo que é emocionalmente importante. Mas que dados temos? Qual é o argumento racional?'",
    category: "Emoção",
  },
  {
    id: "declive-escorregadio",
    name: "Declive escorregadio",
    definition:
      "Assumir que aceitar uma pequena ação levará inevitavelmente a uma cadeia de consequências catastróficas, sem o justificar.",
    example:
      "'Se permitirmos casamento entre pessoas do mesmo sexo, a seguir vão querer casar com animais.' Não há mecanismo que ligue A a Z.",
    howToSpot:
      "A cadeia 'A → B → C → desastre' é demonstrada ou só especulação alarmista?",
    howToCounter:
      "'Cada passo dessa cadeia é uma afirmação independente. Mostra-me por que A leva a B.'",
    category: "Estrutura",
  },
  {
    id: "tu-quoque",
    name: "Tu quoque",
    latin: "tu quoque (tu também)",
    definition:
      "Defender-se de uma crítica apontando que o crítico também faz o mesmo, sem responder à crítica em si.",
    example:
      "'Estás a acusar-me de mentir, mas tu também mentiste há um mês!' Pode ser verdade — não responde à acusação atual.",
    howToSpot:
      "A resposta foca-se em devolver a acusação em vez de a contestar?",
    howToCounter:
      "'Posso ter feito o mesmo. A questão agora é se tu fizeste — discutimos a tua atitude depois.'",
    category: "Relevância",
  },
  {
    id: "apelo-tradicao",
    name: "Apelo à tradição",
    latin: "argumentum ad antiquitatem",
    definition:
      "Defender que algo é bom ou verdadeiro porque sempre se fez assim.",
    example:
      "'Sempre se trabalhou 6 dias por semana — não vamos mudar agora.' O tempo de uma prática não prova que seja correta.",
    howToSpot:
      "Procura 'sempre foi assim', 'isto vem desde os nossos avós', 'é tradição'.",
    howToCounter:
      "'A duração da prática não prova que esteja certa. Esclavidão também durou séculos.'",
    category: "Relevância",
  },
  {
    id: "falsa-equivalencia",
    name: "Falsa equivalência",
    definition:
      "Tratar duas coisas como sendo equivalentes ou comparáveis quando há diferenças importantes.",
    example:
      "'Ambos os lados têm extremistas, logo são equivalentes.' Pode haver assimetria importante (escala, poder, dano causado).",
    howToSpot:
      "Pergunta: são realmente comparáveis em escala, contexto, consequências?",
    howToCounter:
      "'Há semelhança superficial, mas vê a escala / contexto / consequências — não são equivalentes.'",
    category: "Estrutura",
  },
  {
    id: "bandwagon",
    name: "Bandwagon (efeito-onda)",
    definition:
      "Aderir a uma posição porque está em alta, sem avaliar o mérito.",
    example:
      "'Agora toda a gente investe em criptomoedas — eu também devia.' A popularidade não substitui análise.",
    howToSpot:
      "A razão para apoiar é 'todos os outros estão a fazer'? É bandwagon.",
    howToCounter:
      "'Estar na moda não é razão suficiente. Quais são os argumentos próprios?'",
    category: "Emoção",
  },
];
