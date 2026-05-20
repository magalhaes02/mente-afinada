export type HabitoMental = {
  id: string;
  name: string;
  origin: string;
  principle: string;
  howToApply: string;
  example: string;
  warning?: string;
};

export const HABITOS_POOL: HabitoMental[] = [
  {
    id: "occam",
    name: "Navalha de Occam",
    origin: "Atribuída a Guilherme de Occam, filósofo do séc. XIV.",
    principle:
      "Entre duas explicações que dão conta dos mesmos factos, a mais simples (com menos suposições) tende a ser a correta.",
    howToApply:
      "Quando há várias explicações possíveis, começa pela mais simples. Só passa a explicações complexas se a simples for refutada por evidência concreta.",
    example:
      "Carteira desapareceu. Hipótese A: esqueceste-a no café. Hipótese B: alguém entrou em tua casa, roubou só a carteira e saiu sem deixar pistas. Navalha de Occam: começa pela A.",
    warning:
      "Não é regra absoluta. A explicação mais simples nem sempre é a verdadeira — só a mais provável à partida.",
  },
  {
    id: "first-principles",
    name: "First Principles",
    origin: "Aristóteles, séc. IV a.C. Popularizado modernamente por Elon Musk.",
    principle:
      "Decompor um problema até aos seus elementos mais fundamentais e irredutíveis, depois reconstruir a partir do zero.",
    howToApply:
      "Em vez de assumir convenções ('isto faz-se sempre assim'), pergunta: o que sabemos ser absolutamente verdade? A partir daí, constrói para cima.",
    example:
      "Foguetões eram caros porque 'sempre foram'. Musk perguntou: do que são feitos? Quanto custam os materiais? A diferença era o método. Reconstruiu o foguetão a partir das matérias-primas — daí o custo da SpaceX.",
    warning:
      "Reinventar tudo desde a base custa tempo. Aplica em decisões importantes, não em tudo.",
  },
  {
    id: "inversion",
    name: "Inversão",
    origin: "Carl Jacobi, matemático do séc. XIX. Popularizada por Charlie Munger.",
    principle:
      "Em vez de perguntar 'como ter sucesso?', pergunta 'como falhar?'. Depois, evita essas coisas. Muitas vezes é mais fácil identificar o que dá errado do que o que dá certo.",
    howToApply:
      "Antes de planear, faz um 'premortem': imagina que o projeto falhou catastroficamente. Lista as razões mais prováveis. Trabalha para evitar cada uma.",
    example:
      "Quero viver bem aos 70 anos. Inversão: o que destruiria isso? Falta de exercício, isolamento, dieta má, álcool. Evitar essas 4 coisas é mais concreto do que 'viver bem'.",
  },
  {
    id: "segunda-ordem",
    name: "Pensamento de 2ª ordem",
    origin: "Conceito popularizado por Howard Marks (investidor).",
    principle:
      "Não pares na consequência imediata da decisão. Pergunta: 'e depois disso, o que acontece?'. As consequências de 2ª ordem são frequentemente o oposto da intenção inicial.",
    howToApply:
      "Após cada conclusão, acrescenta 'e depois disso, o quê?'. Repete 3 vezes. As soluções de 1ª ordem viram problemas de 3ª ordem.",
    example:
      "Subsidiar gasolina para baixar preço (1ª ordem: pessoas pagam menos). 2ª ordem: consumo aumenta. 3ª ordem: trânsito piora, poluição aumenta, défice estatal cresce.",
  },
  {
    id: "cui-bono",
    name: "Cui bono?",
    origin: "Latim — 'a quem beneficia?'. Atribuído ao jurista romano Cassius (séc. II a.C.).",
    principle:
      "Quando algo acontece e queres compreendê-lo, pergunta primeiro: a quem beneficia? A resposta dá pistas sobre quem o causou ou apoia.",
    howToApply:
      "Lê notícias com esta lente. Quem ganha com esta narrativa estar a circular? Quem perde se não acreditarmos? Não é teoria de conspiração — é análise de incentivos.",
    example:
      "Estudo defende que vinho faz bem ao coração. Cui bono? Fundamentalmente investigadores, mas frequentemente os estudos foram financiados pela indústria do vinho. Não invalida — mas obriga a olhar com mais ceticismo.",
    warning:
      "Pode levar a paranoia se aplicado sem disciplina. Nem tudo tem culpado. Mas é boa primeira pergunta.",
  },
  {
    id: "circulo-competencia",
    name: "Círculo de competência",
    origin: "Conceito de Warren Buffett e Charlie Munger.",
    principle:
      "Conhece bem onde está o limite do que sabes. Atua dentro do círculo onde tens competência real. Reconhece o que está fora, sem disfarçar.",
    howToApply:
      "Para cada decisão, pergunta: estou dentro do meu círculo? Se não, ou aprendo até estar, ou deixo a decisão a quem está. Não decidir é uma decisão válida.",
    example:
      "Buffett recusa investir em empresas tecnológicas durante décadas — admitiu que não as compreendia. Manteve-se no círculo. Resultou.",
    warning:
      "Definir o teu círculo exige humildade. A maioria das pessoas sobrestima-o.",
  },
  {
    id: "premortem",
    name: "Premortem",
    origin: "Gary Klein, psicólogo cognitivo (anos 2000).",
    principle:
      "Antes de iniciar um projeto, imagina que ele falhou catastroficamente. Pergunta: porquê falhou? Lista as 5 razões mais prováveis. Trabalha para mitigar cada uma antes de avançar.",
    howToApply:
      "Num grupo: pede a todos para escreverem individualmente o premortem. Discute as causas mais nomeadas. Adapta o plano.",
    example:
      "'Vou abrir um café no Porto.' Premortem: o que fará isto falhar? Localização errada, custos fixos altos, concorrência subestimada, sócios desalinhados, falta de capital de giro. Cada um destes pode ser endereçado antes.",
  },
  {
    id: "regret-minimization",
    name: "Minimização de arrependimento",
    origin: "Jeff Bezos (1994, ao decidir fundar a Amazon).",
    principle:
      "Em decisões importantes, projeta-te para os 80 anos. Olha para trás. Que decisões irias arrepender-te de não ter tomado? Faz essas, mesmo que o curto prazo seja difícil.",
    howToApply:
      "Útil para decisões com componente emocional forte: trocar de carreira, sair de uma relação, candidatar-te a algo que parece grande. O 'eu de 80 anos' tem outra perspetiva sobre o medo de hoje.",
    example:
      "Bezos tinha emprego estável. Decidiu sair para fundar uma livraria online. Lógica: aos 80, não me ia arrepender de tentar e falhar — ia arrepender-me de não ter tentado.",
  },
  {
    id: "principio-pareto",
    name: "Princípio de Pareto (80/20)",
    origin: "Vilfredo Pareto, economista italiano (1896). Observou que 80% das terras em Itália pertenciam a 20% da população.",
    principle:
      "Em muitos sistemas, ~80% dos resultados vêm de ~20% das causas. Identifica esses 20% e foca-te neles. Ignora os 80% que produzem 20% do valor.",
    howToApply:
      "No teu trabalho: quais 20% das tarefas produzem 80% do impacto? Concentra-te aí. Nas tuas relações: quem são os 20% que te dão 80% da energia positiva?",
    example:
      "80% dos clientes vêm de 20% dos canais de marketing. 80% dos bugs vêm de 20% do código. 80% das discussões num relacionamento vêm de 20% dos temas.",
    warning:
      "Não é regra física, é heurística. Verifica em cada caso antes de assumir.",
  },
  {
    id: "antifragil",
    name: "Antifrágil",
    origin: "Nassim Nicholas Taleb (livro 'Antifragile', 2012).",
    principle:
      "Há três estados: frágil (parte com pressão), robusto (resiste à pressão sem mudar), antifrágil (cresce com a pressão). Sistemas e pessoas antifrágeis ganham com a volatilidade.",
    howToApply:
      "Constrói sistemas que melhoram com erros pequenos — para evitar os colapsos grandes. Diversifica em vez de otimizar. Tenta coisas com 'pouco a perder, muito a ganhar'.",
    example:
      "Sistema imunitário é antifrágil — exposições pequenas tornam-no mais forte. Músculo é antifrágil — esforço causa micro-lesões que regeneram com mais força. Curriculum profissional pode ser antifrágil — falhas pequenas ensinam, em vez de partirem.",
  },
  {
    id: "via-negativa",
    name: "Via negativa",
    origin: "Tradição teológica medieval. Adaptada por Taleb à filosofia prática.",
    principle:
      "Em vez de perguntar 'o que adicionar para melhorar?', pergunta 'o que tirar?'. Muitas vezes, subtrair vale mais do que somar. Remover problemas é mais robusto do que adicionar soluções.",
    howToApply:
      "Antes de comprar mais, identifica o que podes deixar. Antes de aprender mais técnicas, identifica os hábitos que te prejudicam. Antes de adicionar regras, remove as inúteis.",
    example:
      "Em saúde: deixar o açúcar refinado tem mais efeito do que adicionar suplementos. Em finanças: cortar despesas inúteis tem mais efeito do que aumentar receitas. Em produtividade: eliminar distrações tem mais efeito do que técnicas novas.",
  },
  {
    id: "lei-hanlon",
    name: "Navalha de Hanlon",
    origin: "Robert J. Hanlon (1980). Versões mais antigas atribuídas a Goethe.",
    principle:
      "Nunca atribuas à malícia o que pode ser explicado por incompetência, distração ou simples ignorância. Aplica-se em proporção elevada à interação humana.",
    howToApply:
      "Quando alguém te faz algo que parece deliberado e mau, primeira hipótese: distração, mau dia, falta de informação. Só depois considerar má-intenção.",
    example:
      "Colega não respondeu ao teu email. Hanlon: provavelmente esqueceu-se, está sobrecarregado, perdeu na caixa. Não é necessariamente desprezo deliberado.",
    warning:
      "Não significa ignorar má-intenção real. Significa não a presumir por defeito.",
  },
];
