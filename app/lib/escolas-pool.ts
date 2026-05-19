export type EscolaFilosofica = {
  id: string;
  name: string;
  period: string;
  origin: string;
  thinkers: string[];
  centralIdeas: string[];
  todayValue: string;
  motto?: string;
};

export const ESCOLAS_POOL: EscolaFilosofica[] = [
  {
    id: "estoicismo",
    name: "Estoicismo",
    period: "Séc. III a.C. — séc. III d.C.",
    origin: "Atenas, com Zenão de Cício. Floresce em Roma com Séneca, Epicteto e Marco Aurélio.",
    thinkers: ["Zenão de Cício", "Séneca", "Epicteto", "Marco Aurélio"],
    centralIdeas: [
      "Distinguir o que controlas (resposta) do que não controlas (acontecimentos).",
      "A virtude é o único bem verdadeiro; tudo o resto é preferível ou não-preferível.",
      "A serenidade vem da aceitação do que não depende de nós.",
      "Memento mori — lembrar a morte para viver bem.",
    ],
    todayValue:
      "Ferramentas práticas para resistir à ansiedade, raiva e procrastinação. Muito do CBT (terapia cognitivo-comportamental) é estoicismo modernizado.",
    motto: "Não são as coisas que perturbam, mas as opiniões que temos delas. — Epicteto",
  },
  {
    id: "epicurismo",
    name: "Epicurismo",
    period: "Séc. IV a.C. — séc. IV d.C.",
    origin: "Atenas, com Epicuro, no chamado 'Jardim'.",
    thinkers: ["Epicuro", "Lucrécio"],
    centralIdeas: [
      "O objetivo da vida é a ataraxia — a tranquilidade da alma.",
      "Os prazeres simples (amizade, conversa, comida modesta) são superiores aos prazeres intensos.",
      "Os deuses, se existem, não se importam connosco. O medo da morte é irracional.",
      "Limitar desejos é mais eficaz para a felicidade do que satisfazê-los.",
    ],
    todayValue:
      "Antídoto contra o consumismo. Filosofia minimalista antes do tempo — menos é mais.",
    motto: "Não estragues o que tens desejando o que não tens. — Epicuro",
  },
  {
    id: "ceticismo",
    name: "Ceticismo",
    period: "Séc. III a.C. — séc. III d.C. (e renascimentos)",
    origin: "Grego, com Pirro de Élis. Renasce no séc. XVII com Descartes (ceticismo metódico) e Hume.",
    thinkers: ["Pirro de Élis", "Sexto Empírico", "David Hume"],
    centralIdeas: [
      "Suspender o juízo perante afirmações sem evidência forte.",
      "O ceticismo é uma postura, não uma negação — é dúvida sistemática.",
      "A epoché (suspensão) leva à tranquilidade interior.",
      "A maioria das certezas é mal fundamentada.",
    ],
    todayValue:
      "Defesa contra fake news, gurus, charlatães. Postura essencial na era da informação.",
    motto: "Não afirmar nem negar — suspender.",
  },
  {
    id: "existencialismo",
    name: "Existencialismo",
    period: "Séc. XIX — XX",
    origin: "Kierkegaard (Dinamarca, séc. XIX). Floresce em França no pós-guerra.",
    thinkers: ["Kierkegaard", "Nietzsche", "Sartre", "Camus", "Simone de Beauvoir"],
    centralIdeas: [
      "Existência precede essência — nasces sem propósito predefinido; tens de o criar.",
      "Somos condenados a ser livres — toda a escolha é tua, e a responsabilidade também.",
      "O absurdo: o mundo não tem sentido inerente; o ser humano procura significado num universo silencioso.",
      "A má-fé (Sartre): fugir à liberdade negando-a, agir como peça em vez de agente.",
    ],
    todayValue:
      "Confronta a tendência moderna para procurar 'o teu propósito' como se existisse. Não existe — constróis.",
    motto: "O homem é a soma das suas ações. — Sartre",
  },
  {
    id: "niilismo",
    name: "Niilismo",
    period: "Séc. XIX — XX",
    origin: "Ivan Turguéniev cunha o termo em 'Pais e Filhos' (1862). Nietzsche diagnostica-o.",
    thinkers: ["Nietzsche (não niilista — diagnosticador)", "Cioran", "Schopenhauer"],
    centralIdeas: [
      "Rejeição de valores, propósitos ou crenças como sendo objetivos.",
      "Nietzsche: o niilismo passivo é resignação; o ativo é demolição para reconstruir valores.",
      "Não é depressão — é diagnóstico cultural de uma época.",
      "A 'morte de Deus' deixa um vazio que tem de ser preenchido.",
    ],
    todayValue:
      "Ferramenta para compreender vácuo de sentido na modernidade. Saber que o niilismo é um diagnóstico, não uma vida, evita confundir com depressão.",
    motto: "O homem prefere ter o nada como vontade do que não ter vontade alguma. — Nietzsche",
  },
  {
    id: "iluminismo",
    name: "Iluminismo",
    period: "Séc. XVIII",
    origin: "Europa, sobretudo França e Escócia. Reação ao Antigo Regime.",
    thinkers: ["Voltaire", "Rousseau", "Diderot", "Kant", "Hume", "Adam Smith"],
    centralIdeas: [
      "Razão acima de tradição e autoridade.",
      "'Sapere aude' — atreve-te a saber. (Kant)",
      "Direitos universais do homem.",
      "Separação Igreja-Estado.",
      "Educação universal como base do progresso.",
    ],
    todayValue:
      "Os direitos humanos modernos, a separação de poderes, a democracia liberal — tudo Iluminismo. Conhecer as suas premissas permite defendê-las quando atacadas.",
    motto: "Sapere aude — atreve-te a saber. — Kant",
  },
  {
    id: "romantismo",
    name: "Romantismo",
    period: "Final séc. XVIII — meados séc. XIX",
    origin: "Alemanha (Sturm und Drang), depois Inglaterra, França. Reação ao racionalismo iluminista.",
    thinkers: ["Goethe", "Schiller", "Rousseau", "Byron", "Wordsworth"],
    centralIdeas: [
      "Primado da emoção, intuição e imaginação sobre razão pura.",
      "A natureza como fonte de verdade e regeneração.",
      "O indivíduo único — o génio, o herói trágico.",
      "Nostalgia, melancolia e sublimidade como experiências de revelação.",
    ],
    todayValue:
      "Toda a noção moderna de 'sentir é mais autêntico que pensar' é herança romântica. Saber disso permite questionar quando esta intuição falha.",
  },
  {
    id: "pragmatismo",
    name: "Pragmatismo",
    period: "Final séc. XIX — XX",
    origin: "Estados Unidos. Reação ao academicismo europeu.",
    thinkers: ["Charles Peirce", "William James", "John Dewey", "Richard Rorty"],
    centralIdeas: [
      "Uma ideia vale pelo que produz na prática, não pela sua pureza teórica.",
      "A verdade é o que funciona para resolver problemas reais.",
      "Aprender pela experimentação, não pela contemplação.",
      "Democracia como método contínuo de resolução de problemas coletivos.",
    ],
    todayValue:
      "Antídoto a ideologias rígidas. Avaliar políticas, decisões e crenças pelos seus resultados práticos.",
    motto: "A verdade é o que funciona. — William James",
  },
  {
    id: "utilitarismo",
    name: "Utilitarismo",
    period: "Séc. XVIII — XIX (continua hoje)",
    origin: "Inglaterra. Jeremy Bentham e John Stuart Mill.",
    thinkers: ["Jeremy Bentham", "John Stuart Mill", "Peter Singer"],
    centralIdeas: [
      "A ação correta é aquela que maximiza o bem-estar do maior número.",
      "Felicidade é o único bem intrínseco; sofrimento é o único mal.",
      "Bentham: todas as felicidades contam igualmente. Mill: há prazeres superiores e inferiores.",
      "Aplicado: animais não-humanos contam, pessoas distantes contam (Peter Singer).",
    ],
    todayValue:
      "Base da análise custo-benefício em políticas públicas, ética médica, decisões coletivas. Saber a teoria permite ver as armadilhas (ex: tirania da maioria).",
  },
  {
    id: "marxismo",
    name: "Marxismo",
    period: "Séc. XIX — XX (e renovação contínua)",
    origin: "Karl Marx e Friedrich Engels, na Alemanha e Inglaterra.",
    thinkers: ["Karl Marx", "Friedrich Engels", "Lenin", "Gramsci", "Lukács"],
    centralIdeas: [
      "A história é movida por conflitos materiais entre classes sociais.",
      "Mais-valia: o lucro vem do trabalho não pago dos trabalhadores.",
      "Alienação: o trabalhador sob capitalismo é separado do produto, do processo, de si próprio e dos outros.",
      "Mudança estrutural só acontece através da transformação das relações materiais, não das ideias.",
    ],
    todayValue:
      "Independente do julgamento político, as ferramentas analíticas (análise material, conceito de alienação, crítica do consumismo) são úteis para compreender o mundo.",
  },
  {
    id: "fenomenologia",
    name: "Fenomenologia",
    period: "Séc. XX",
    origin: "Alemanha, com Edmund Husserl.",
    thinkers: ["Husserl", "Heidegger", "Merleau-Ponty", "Sartre"],
    centralIdeas: [
      "Estudar os fenómenos tal como aparecem à consciência, antes de teorizar.",
      "'Voltar às coisas mesmas' — descrever a experiência diretamente.",
      "Consciência é sempre consciência DE algo (intencionalidade).",
      "Corpo, espaço, tempo são vividos antes de serem pensados (Merleau-Ponty).",
    ],
    todayValue:
      "Ensina a observar a experiência sem teorizar prematuramente. Útil em psicologia, design, jornalismo, arte.",
  },
  {
    id: "cinismo",
    name: "Cinismo (grego)",
    period: "Séc. IV a.C. — séc. V d.C.",
    origin: "Grécia, com Antístenes e sobretudo Diógenes de Sínope.",
    thinkers: ["Antístenes", "Diógenes de Sínope", "Crates de Tebas"],
    centralIdeas: [
      "Virtude vive-se em harmonia com a natureza, recusando convenções sociais.",
      "Riqueza, fama e poder são prisões disfarçadas.",
      "Provocação deliberada como pedagogia — chocar para acordar.",
      "Auto-suficiência radical.",
    ],
    todayValue:
      "Antídoto cultural ao materialismo. Note-se: cinismo grego é POSITIVO (provocador da virtude); 'cinismo' moderno (desconfiança das motivações) é diferente.",
    motto: "Não tenho nada — não me falta nada. — Diógenes",
  },
];
