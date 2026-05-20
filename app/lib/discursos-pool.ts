export type Discurso = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  place: string;
  excerpt: string;
  context: string;
  whyMarked: string;
};

export const DISCURSOS_POOL: Discurso[] = [
  {
    id: "jfk-inauguracao",
    title: "Discurso inaugural",
    speaker: "John F. Kennedy",
    date: "20 de janeiro de 1961",
    place: "Washington D.C., Estados Unidos",
    excerpt:
      "Não perguntem o que o vosso país pode fazer por vós — perguntem o que vós podem fazer pelo vosso país.",
    context:
      "Discurso de tomada de posse, em plena Guerra Fria. Kennedy tinha 43 anos, era o presidente mais novo da história americana. O mundo dividia-se entre dois blocos.",
    whyMarked:
      "Inverteu a relação tradicional cidadão-Estado. Em vez do paternalismo das décadas anteriores, apelou ao envolvimento cívico ativo. Frase ainda hoje citada para qualquer apelo a responsabilidade coletiva.",
  },
  {
    id: "churchill-praias",
    title: "Lutaremos nas praias",
    speaker: "Winston Churchill",
    date: "4 de junho de 1940",
    place: "Câmara dos Comuns, Londres",
    excerpt:
      "Lutaremos em França, lutaremos nos mares e oceanos, lutaremos com confiança crescente nos ares. Defenderemos a nossa ilha custe o que custar. Lutaremos nas praias, lutaremos nos campos, lutaremos nas ruas, lutaremos nas montanhas. Nunca nos renderemos.",
    context:
      "Após a evacuação de Dunquerque, com a Europa quase toda ocupada pela Alemanha nazi e o Reino Unido isolado e em risco real de invasão.",
    whyMarked:
      "Anáfora (repetição de 'lutaremos') usada em escala épica. Mobilizou um país inteiro num momento em que muitos defendiam negociar paz com Hitler. Ensina o poder da retórica como força política real.",
  },
  {
    id: "mandela-rivonia",
    title: "Discurso de Rivonia",
    speaker: "Nelson Mandela",
    date: "20 de abril de 1964",
    place: "Tribunal de Pretória, África do Sul",
    excerpt:
      "Lutei contra a dominação branca e lutei contra a dominação negra. Cultivei o ideal de uma sociedade democrática e livre na qual todas as pessoas vivam juntas em harmonia e com oportunidades iguais. É um ideal pelo qual espero viver e ver realizado. Mas, se for necessário, é um ideal pelo qual estou preparado para morrer.",
    context:
      "Mandela e outros líderes do ANC eram julgados por sabotagem contra o regime do apartheid. A pena máxima era a morte. Mandela proferiu este discurso de defesa antes da sentença.",
    whyMarked:
      "Não suplicou clemência. Defendeu princípios e aceitou as consequências. Foi condenado a prisão perpétua — saiu 27 anos depois para liderar a transição pacífica para a democracia. Modelo de integridade política.",
  },
  {
    id: "mlk-dream",
    title: "Eu tenho um sonho",
    speaker: "Martin Luther King Jr.",
    date: "28 de agosto de 1963",
    place: "Lincoln Memorial, Washington D.C.",
    excerpt:
      "Eu tenho um sonho de que um dia esta nação se levantará e viverá o verdadeiro significado da sua crença: 'consideramos estas verdades evidentes por si próprias, que todos os homens são criados iguais'.",
    context:
      "Marcha pelos direitos civis dos afro-americanos. ~250.000 pessoas em Washington. King falou perante a estátua de Lincoln, com o monumento de Washington no horizonte.",
    whyMarked:
      "Combinou retórica religiosa, raízes da Constituição e ritmo musical. Repetição de 'I have a dream' tornou-se anáfora mais famosa do séc. XX. Levou à aprovação do Civil Rights Act no ano seguinte.",
  },
  {
    id: "jobs-stanford",
    title: "Stay hungry, stay foolish",
    speaker: "Steve Jobs",
    date: "12 de junho de 2005",
    place: "Universidade de Stanford, EUA",
    excerpt:
      "Os vossos minutos são limitados, por isso não os desperdicem a viver a vida de outra pessoa. Não fiquem presos em dogmas — que é viver com resultados do pensamento de outras pessoas. Não deixem o ruído das opiniões dos outros silenciar a vossa voz interior. Continuem com fome. Continuem loucos.",
    context:
      "Discurso de comencement aos formandos de Stanford. Jobs tinha sido diagnosticado com cancro pancreático um ano antes. Morreu seis anos depois.",
    whyMarked:
      "Discurso construído em três histórias pessoais — não em conselhos abstratos. Inverteu o género do 'comencement speech' tradicional. Citado milhões de vezes desde então.",
  },
  {
    id: "lincoln-gettysburg",
    title: "Discurso de Gettysburg",
    speaker: "Abraham Lincoln",
    date: "19 de novembro de 1863",
    place: "Gettysburg, Pensilvânia",
    excerpt:
      "(...) que esta nação, sob Deus, terá um novo nascimento de liberdade, e que o governo do povo, pelo povo, para o povo, não há de perecer da Terra.",
    context:
      "Cerimónia de inauguração do cemitério militar onde tinham sido sepultados os mortos da Batalha de Gettysburg, ponto de viragem da Guerra Civil americana. O discurso durou apenas dois minutos — o orador antes de Lincoln falou duas horas.",
    whyMarked:
      "272 palavras que redefiniram o propósito da democracia americana. A frase 'do povo, pelo povo, para o povo' tornou-se a definição mais citada de democracia. Curto, poderoso, lapidar.",
  },
  {
    id: "obama-cairo",
    title: "Discurso do Cairo",
    speaker: "Barack Obama",
    date: "4 de junho de 2009",
    place: "Universidade do Cairo, Egipto",
    excerpt:
      "Vim ao Cairo procurar um novo começo entre os Estados Unidos e os muçulmanos do mundo — um começo baseado em interesses mútuos e respeito mútuo (...).",
    context:
      "Início do mandato de Obama. Após anos de guerra no Iraque e Afeganistão, tentativa de reaproximação com o mundo islâmico.",
    whyMarked:
      "Exemplo de retórica diplomática moderna. Misturou citações do Alcorão, da Tora e da Bíblia para construir base comum. Mostra como o discurso pode tentar abrir caminho diplomático.",
  },
  {
    id: "salgueiro-25-abril",
    title: "Comunicado do MFA",
    speaker: "Salgueiro Maia",
    date: "25 de abril de 1974",
    place: "Lisboa, Portugal",
    excerpt:
      "Cidadãos, exige-se que se mantenham nas suas casas, com a maior calma. (...) Aqui está, sob o efectivo controlo das Forças Armadas Portuguesas, o final do regime que durante 48 anos manietou a vontade do povo português.",
    context:
      "Capitão Salgueiro Maia conduziu a coluna militar que ocupou pacificamente o Terreiro do Paço e levou à rendição de Marcello Caetano no quartel do Carmo. Fim da ditadura.",
    whyMarked:
      "Em tom calmo, pediu calma aos cidadãos enquanto anunciava o fim de quase meio século de ditadura. Linguagem firme mas sem violência — refletiu o caráter pacífico da revolução.",
  },
  {
    id: "sojourner-aint-i",
    title: "Não sou eu uma mulher?",
    speaker: "Sojourner Truth",
    date: "29 de maio de 1851",
    place: "Convenção dos Direitos das Mulheres, Akron, Ohio",
    excerpt:
      "Aquele homem ali diz que as mulheres precisam de ajuda para entrar nos carros, e ser carregadas sobre poças, e ter o melhor lugar em todo o lado. Ninguém me ajuda a entrar em carros, nem a passar poças, e ninguém me dá o melhor lugar! E não sou eu uma mulher?",
    context:
      "Sojourner Truth nasceu escrava em Nova Iorque (~1797). Escapou em 1826 com a filha. Discursava analfabeta, em improviso, contra escravatura e a favor dos direitos das mulheres.",
    whyMarked:
      "Confrontou o feminismo da época — que excluía mulheres negras — sem rodeios. Pergunta retórica repetida tornou-se anáfora histórica. Ainda hoje base do feminismo interseccional.",
  },
  {
    id: "saramago-nobel",
    title: "De como a personagem foi mestre e o autor seu aprendiz",
    speaker: "José Saramago",
    date: "7 de dezembro de 1998",
    place: "Estocolmo, Suécia (cerimónia Nobel)",
    excerpt:
      "O homem mais sábio que conheci em toda a minha vida não sabia ler nem escrever. (...) Era o meu avô Jerónimo, pastor e contador de histórias.",
    context:
      "Saramago tornou-se o primeiro autor de língua portuguesa a receber o Nobel da Literatura. Tinha 76 anos.",
    whyMarked:
      "Em vez de discurso académico sobre literatura, começou com a história do avô analfabeto. Mostrou que o saber não está só nos livros. Discurso humilde e profundamente literário em simultâneo.",
  },
];
