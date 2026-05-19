export type Proverbio = {
  id: string;
  text: string;
  meaning: string;
  whenItApplies: string;
  modernExample?: string;
  warning?: string;
};

export const PROVERBIOS_POOL: Proverbio[] = [
  {
    id: "quem-tudo-quer",
    text: "Quem tudo quer, tudo perde.",
    meaning:
      "A ambição sem limites — querer mais do que é razoável — costuma resultar em perda do que já se tinha.",
    whenItApplies:
      "Em negociações ou decisões em que se hesita entre o suficiente e o ambicioso.",
    modernExample:
      "Recusou subida de salário por achar pouco; meses depois, o cargo desapareceu por reestruturação.",
  },
  {
    id: "devagar-longe",
    text: "Devagar se vai ao longe.",
    meaning:
      "Progresso sustentado e moderado supera, no longo prazo, surtos intensos seguidos de paragens.",
    whenItApplies:
      "Em projetos, aprendizagem, treino físico. Sempre que há tentação de fazer tudo de uma vez.",
    modernExample:
      "30 minutos de leitura por dia, durante 1 ano, dá mais retorno do que 'maratonas' ocasionais de 8 horas.",
  },
  {
    id: "cao-ladra",
    text: "Cão que ladra não morde.",
    meaning:
      "Quem mais ameaça e ostenta força raramente passa à ação. A ameaça espalhafatosa costuma ser sinal de fraqueza.",
    whenItApplies:
      "Em conflitos, debates ou negociações em que alguém eleva o tom dramaticamente.",
    warning:
      "Nem sempre é verdade — alguns cães ladram E mordem. Não te baseies apenas no provérbio para ignorar uma ameaça séria.",
  },
  {
    id: "pressa-perfeicao",
    text: "A pressa é inimiga da perfeição.",
    meaning:
      "Fazer apressadamente compromete a qualidade. O tempo dedicado tem retorno em precisão.",
    whenItApplies:
      "Em escrita, decisões importantes, trabalhos manuais.",
    warning:
      "A perfeição também pode ser inimiga do feito — saber quando parar é arte distinta.",
  },
  {
    id: "quem-nao-chora",
    text: "Quem não chora, não mama.",
    meaning:
      "Quem não reclama nem pede, não recebe. O silêncio do legítimo é interpretado como ausência de necessidade.",
    whenItApplies:
      "Em relações profissionais, com instituições, em direitos pessoais.",
    modernExample:
      "Quem nunca pediu aumento, raramente recebe. Quem pediu corretamente, frequentemente recebe.",
  },
  {
    id: "terra-cegos",
    text: "Em terra de cegos, quem tem olho é rei.",
    meaning:
      "Numa situação em que ninguém tem competência, mesmo o pouco competente parece excecional.",
    whenItApplies:
      "Para diagnosticar a tua posição relativa antes de te julgar excecional.",
    warning:
      "Cuidado: confundir 'rei em terra de cegos' com 'excecional em geral' é Dunning-Kruger.",
  },
  {
    id: "diz-me-com-quem",
    text: "Diz-me com quem andas, dir-te-ei quem és.",
    meaning:
      "As pessoas com quem te rodeias revelam (e moldam) quem és — valores, hábitos, ambições.",
    whenItApplies:
      "Em decisões sobre amizades, ambientes profissionais, comunidades a integrar.",
    modernExample:
      "Estudos modernos confirmam: o teu peso, hábitos de exercício e até estado emocional convergem com os do teu círculo próximo.",
  },
  {
    id: "roma-nao-num-dia",
    text: "Roma não se fez num dia.",
    meaning:
      "Realizações importantes exigem tempo. A grandeza constrói-se lentamente.",
    whenItApplies:
      "Quando há impaciência com progresso lento — em aprendizagem, projetos, mudanças pessoais.",
  },
  {
    id: "ferros-mata",
    text: "Quem com ferros mata, com ferros morre.",
    meaning:
      "Os métodos que se usam contra outros costumam acabar por se voltar contra nós mesmos.",
    whenItApplies:
      "Em ética profissional, política, relações de poder. Aviso contra justificar meios.",
    modernExample:
      "Quem normaliza vigilância sobre adversários costuma viver para a sofrer.",
  },
  {
    id: "ventos-tempestades",
    text: "Quem semeia ventos, colhe tempestades.",
    meaning:
      "Ações negativas, mesmo pequenas, propagam-se e voltam ampliadas. Causa e efeito moral.",
    whenItApplies:
      "Em comportamentos repetidos — fofoca, intriga, deslealdade.",
  },
  {
    id: "galinha-vizinho",
    text: "A galinha do vizinho é sempre mais gorda.",
    meaning:
      "Tendemos a achar que os outros têm sempre melhor — vida, casa, emprego, relacionamento. Distorção sistemática.",
    whenItApplies:
      "Em redes sociais, comparações sociais, inveja velada.",
    modernExample:
      "Instagram é a versão moderna deste provérbio. Ninguém mostra a galinha verdadeira — só a vista de fora.",
  },
  {
    id: "obras-oficial",
    text: "Pelas obras se conhece o oficial.",
    meaning:
      "Avalia uma pessoa pelo que faz, não pelo que diz que faz. Os atos são o teste.",
    whenItApplies:
      "Em decisões sobre contratar, confiar, parceriar.",
    modernExample:
      "Promessas valem nada sem histórico. 'Mostra-me o que fizeste, não o que dizes que vais fazer.'",
  },
  {
    id: "macaco-galho",
    text: "Cada macaco no seu galho.",
    meaning:
      "Cada um se ocupe do que lhe é próprio. Pode ser sabedoria (especialização) ou conservadorismo disfarçado.",
    whenItApplies:
      "Quando há tentação de comentar tudo. Antídoto à dispersão.",
    warning:
      "Usado em excesso, justifica passividade e silenciamento — 'isto não é da tua conta'. Saber usar com critério.",
  },
  {
    id: "prevenir-remediar",
    text: "Mais vale prevenir que remediar.",
    meaning:
      "Prevenir um problema custa menos do que resolvê-lo depois de instalado.",
    whenItApplies:
      "Em saúde, finanças, manutenção, relações. Onde quer que haja escolha entre prevenção e reação.",
    modernExample:
      "1€ em saúde preventiva poupa 5€ em tratamento. Aplicável a praticamente tudo.",
  },
  {
    id: "fome-fartura",
    text: "Não há fome que não dê em fartura.",
    meaning:
      "Períodos difíceis tendem a terminar; situações de carência costumam ser temporárias.",
    whenItApplies:
      "Em momentos de desânimo — esperança lúcida, não cega.",
    warning:
      "Não é garantia — é tendência estatística. Confiar passivamente neste provérbio sem agir é perigoso.",
  },
];
