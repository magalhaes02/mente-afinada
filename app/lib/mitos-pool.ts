export type Mito = {
  id: string;
  name: string;
  origin: "Grego" | "Romano" | "Bíblico" | "Nórdico" | "Egípcio";
  story: string;
  modernMeaning: string;
  whenWeSay: string;
};

export const MITOS_POOL: Mito[] = [
  {
    id: "sisifo",
    name: "Sísifo",
    origin: "Grego",
    story:
      "Rei de Corinto, condenado pelos deuses a empurrar eternamente uma pedra montanha acima — sempre que chegava ao topo, a pedra rolava de volta ao fundo.",
    modernMeaning:
      "Tarefa que não acaba e que aparenta ser absurda. Albert Camus usou-o para descrever a condição humana — e defendeu que 'é necessário imaginar Sísifo feliz'.",
    whenWeSay:
      "'É um trabalho de Sísifo' — algo que parece nunca terminar e tem de ser recomeçado constantemente.",
  },
  {
    id: "prometeu",
    name: "Prometeu",
    origin: "Grego",
    story:
      "Titã que roubou o fogo dos deuses para o entregar à humanidade. Foi castigado por Zeus, acorrentado a uma rocha onde uma águia lhe comia o fígado todos os dias (e o fígado regenerava-se à noite).",
    modernMeaning:
      "Símbolo do conhecimento que liberta a humanidade, e do preço pago por quem desafia o poder estabelecido para beneficiar os outros.",
    whenWeSay:
      "'Gesto prometeico' — sacrifício pessoal em nome do progresso da humanidade. 'Fogo de Prometeu' — o saber proibido que muda tudo.",
  },
  {
    id: "pandora",
    name: "Caixa de Pandora",
    origin: "Grego",
    story:
      "Pandora foi a primeira mulher, criada por Zeus. Recebeu uma caixa (ou jarro) com instruções de nunca a abrir. A curiosidade venceu — abriu-a e libertou no mundo todos os males. Quando a fechou, só restou no fundo uma coisa: a esperança.",
    modernMeaning:
      "Ato aparentemente inocente que desencadeia consequências imensas e irreversíveis. A esperança como último resíduo após o desastre.",
    whenWeSay:
      "'Abrir a caixa de Pandora' — começar algo cujas consequências negativas não conseguimos controlar nem prever.",
  },
  {
    id: "narciso",
    name: "Narciso",
    origin: "Grego",
    story:
      "Jovem de extraordinária beleza que rejeitava todos os pretendentes. Castigado pelos deuses, viu o próprio reflexo na água e apaixonou-se por si mesmo. Incapaz de se afastar, definhou e morreu à beira do lago — transformando-se na flor que leva o seu nome.",
    modernMeaning:
      "Vaidade autoabsorvida que se torna prisão. O conceito moderno de narcisismo (Freud, Lacan) deriva diretamente daqui.",
    whenWeSay:
      "'É um Narciso' — alguém apaixonado pela própria imagem ao ponto de não ver mais nada.",
  },
  {
    id: "cavalo-troia",
    name: "Cavalo de Troia",
    origin: "Grego",
    story:
      "Os gregos, após 10 anos de cerco infrutífero a Troia, fingiram retirada e deixaram um enorme cavalo de madeira como oferenda. Os troianos levaram-no para dentro das muralhas. À noite, soldados gregos escondidos no cavalo saíram e abriram as portas — Troia caiu.",
    modernMeaning:
      "Engano que entra sob o disfarce de presente. Aplicado em informática (vírus 'cavalo de Troia') e em estratégia geral.",
    whenWeSay:
      "'Cavalo de Troia' — algo aparentemente benéfico que esconde uma ameaça interna.",
  },
  {
    id: "icaro",
    name: "Ícaro",
    origin: "Grego",
    story:
      "Filho de Dédalo. Para fugir de Creta, o pai construiu asas de penas e cera. Avisou-o: não voe demasiado baixo (a humidade do mar danifica as asas) nem demasiado alto (o sol derrete a cera). Ícaro, embriagado pela altura, voou demasiado alto. As asas derreteram. Caiu no mar e morreu.",
    modernMeaning:
      "Hubris (excesso de ambição) que ignora limites e acaba em queda. Aviso clássico contra a desmedida.",
    whenWeSay:
      "'Voou demasiado perto do sol' — quem foi longe de mais e caiu.",
  },
  {
    id: "fenix",
    name: "Fénix",
    origin: "Egípcio",
    story:
      "Ave mítica de plumagem dourada e vermelha que vivia 500 anos. No fim do ciclo, construía um ninho de especiarias e plantas aromáticas, ateava fogo a si mesma e renascia das próprias cinzas, jovem e renovada.",
    modernMeaning:
      "Renascimento após destruição total. Símbolo da renovação possível mesmo do pior fim.",
    whenWeSay:
      "'Renascer das cinzas' — recuperar-se de uma derrota ou colapso e voltar mais forte.",
  },
  {
    id: "midas",
    name: "Rei Midas",
    origin: "Grego",
    story:
      "Rei da Frígia que pediu a Dionísio o dom de transformar em ouro tudo o que tocasse. Concedido o desejo, descobriu o horror: a comida tornava-se ouro, a água tornava-se ouro, a sua filha tornou-se estátua dourada quando a abraçou.",
    modernMeaning:
      "O perigo de obter exatamente o que desejamos sem pensar nas consequências. A riqueza como maldição.",
    whenWeSay:
      "'Toque de Midas' — capacidade de tornar tudo o que toca em sucesso (uso positivo) OU maldição do excesso (uso original).",
  },
  {
    id: "édipo",
    name: "Édipo",
    origin: "Grego",
    story:
      "Profecia: ia matar o pai e casar com a mãe. Abandonado em criança para evitar o destino. Adulto, sem saber, matou um desconhecido (o pai) e casou com a viúva (a mãe). Quando descobriu, cegou-se com os próprios olhos.",
    modernMeaning:
      "Inevitabilidade do destino apesar dos esforços para o evitar. Freud usou-o para o 'complexo de Édipo'.",
    whenWeSay:
      "'Tragédia edipiana' — situação em que tentar evitar um destino o causa.",
  },
  {
    id: "calcanhar-aquiles",
    name: "Calcanhar de Aquiles",
    origin: "Grego",
    story:
      "Aquiles, o maior guerreiro grego, foi mergulhado em criança nas águas do rio Estige pela mãe — tornando-o invulnerável. Mas ela segurou-o pelo calcanhar, que não tocou na água. Morreu na guerra de Troia com uma flecha precisamente nesse ponto.",
    modernMeaning:
      "Único ponto fraco numa pessoa, sistema ou estratégia, apesar de ser forte em tudo o resto.",
    whenWeSay:
      "'O seu calcanhar de Aquiles é X' — a única fragilidade que pode comprometer alguém forte.",
  },
  {
    id: "espada-damocles",
    name: "Espada de Dâmocles",
    origin: "Grego",
    story:
      "Dionísio, tirano de Siracusa, convidou o cortesão Dâmocles a sentar-se no trono. Acima da cabeça, pendurou uma espada afiada presa por um único fio de crina de cavalo. Mostrou-lhe assim como era ter poder — confortável em aparência, com ameaça constante por cima.",
    modernMeaning:
      "Perigo iminente e invisível que paira sobre quem ocupa posições de poder ou conforto aparente.",
    whenWeSay:
      "'Vive com uma espada de Dâmocles sobre a cabeça' — pessoa em situação de ameaça constante.",
  },
  {
    id: "fio-ariadne",
    name: "Fio de Ariadne",
    origin: "Grego",
    story:
      "Teseu entrou no labirinto de Creta para matar o Minotauro. Ariadne, filha do rei, deu-lhe um novelo de fio para desenrolar à entrada — após matar o monstro, seguiu o fio de volta e saiu.",
    modernMeaning:
      "Solução elegante e simples para um problema complexo. Ferramenta que permite navegar a complexidade.",
    whenWeSay:
      "'Preciso do fio de Ariadne' — preciso de um método que me oriente em algo demasiado complexo.",
  },
];
