export type Vies = {
  id: string;
  name: string;
  definition: string;
  example: string;
  howItCatchesYou: string;
  howToFight: string;
  category: "Memória" | "Decisão" | "Social" | "Causalidade";
};

export const VIESES_POOL: Vies[] = [
  {
    id: "confirmacao",
    name: "Viés de confirmação",
    definition:
      "Tendência para procurar, interpretar e lembrar informação que confirma as nossas crenças prévias, ignorando o que as contraria.",
    example:
      "Acreditas que uma marca é má — só reparas nas más experiências (tuas e dos outros), ignorando as boas.",
    howItCatchesYou:
      "Sem dares conta, filtras a realidade. Lês os títulos que concordam contigo, evitas os que contradizem.",
    howToFight:
      "Antes de decidir algo importante, procura ativamente a melhor versão do argumento contrário. Se não a encontras, não estás a procurar.",
    category: "Decisão",
  },
  {
    id: "ancoragem",
    name: "Ancoragem",
    definition:
      "O primeiro número ou referência que vês influencia todos os julgamentos seguintes, mesmo quando é arbitrário.",
    example:
      "Numa negociação, quem propõe primeiro o preço (a 'âncora') condiciona o intervalo de negociação — mesmo que seja ridículo.",
    howItCatchesYou:
      "Vês 'antes 200€, agora 80€' — o 80€ parece bom mesmo que o produto valha 40€. A âncora era falsa.",
    howToFight:
      "Antes de ver qualquer número de referência, faz a tua estimativa independente. Depois compara.",
    category: "Decisão",
  },
  {
    id: "custos-afundados",
    name: "Custos afundados",
    definition:
      "Tendência para continuar a investir em algo só porque já se investiu antes, ignorando que o passado não se recupera.",
    example:
      "'Já estou neste curso há 2 anos, não vou desistir agora.' Mas se o curso não é o certo, mais 2 anos não corrigem os 2 anteriores.",
    howItCatchesYou:
      "Fazes-te continuar em relações, empregos, projetos só por causa do que já investiste. A decisão certa olha para o futuro, não para o passado.",
    howToFight:
      "Pergunta: 'Se eu começasse agora do zero, escolheria continuar nisto?' Se a resposta é não, o investimento passado não importa.",
    category: "Decisão",
  },
  {
    id: "disponibilidade",
    name: "Disponibilidade",
    definition:
      "Achar que algo é mais frequente ou provável só porque te ocorre facilmente — geralmente porque é dramático ou recente.",
    example:
      "Depois de um ataque de tubarão nas notícias, achas que é arriscado ir à praia. As probabilidades reais são minúsculas — mas a imagem é vívida.",
    howItCatchesYou:
      "Os media reportam o extraordinário. O ordinário não dá notícia. A tua perceção de risco fica distorcida.",
    howToFight:
      "Pergunta-te: 'Estou a julgar pela frequência real ou pela memorabilidade?' Procura estatísticas, não imagens.",
    category: "Causalidade",
  },
  {
    id: "sobrevivencia",
    name: "Viés de sobrevivência",
    definition:
      "Tirar conclusões apenas dos casos que 'sobreviveram', ignorando os que falharam (e que são invisíveis).",
    example:
      "Lês biografias de empresários bilionários e copias os hábitos. Mas milhares com os mesmos hábitos falharam — só não escreveram livros.",
    howItCatchesYou:
      "Os 'casos de sucesso' são o que se vê. Os falhanços desaparecem. Conclui-se que X funciona quando X coexiste com sucesso e fracasso.",
    howToFight:
      "Antes de copiar uma fórmula, pergunta: 'Quantos fizeram o mesmo e falharam? Onde estão eles?'",
    category: "Causalidade",
  },
  {
    id: "dunning-kruger",
    name: "Efeito Dunning-Kruger",
    definition:
      "Quem sabe pouco sobre um tema tende a sobreestimar o seu conhecimento; quem sabe muito tende a subestimar.",
    example:
      "O iniciante numa área defende opiniões com convicção total; o especialista, depois de anos a estudar, hesita mais.",
    howItCatchesYou:
      "Sentir confiança absoluta sobre algo que mal estudaste é sinal de Dunning-Kruger — não de bom entendimento.",
    howToFight:
      "Se te sentes muito seguro num tema, pergunta-te: o que NÃO sei sobre isto? Se a lista é curta, é mau sinal.",
    category: "Decisão",
  },
  {
    id: "halo",
    name: "Efeito halo",
    definition:
      "Avaliar positivamente todos os atributos de alguém com base numa primeira impressão positiva (ou o contrário, com efeito horns).",
    example:
      "Acreditas que uma pessoa bonita é também mais inteligente, competente e confiável — sem evidência.",
    howItCatchesYou:
      "Decides sobre pessoas (em entrevistas, conhecidos novos) com base em traços superficiais que contaminam o resto da avaliação.",
    howToFight:
      "Avalia cada dimensão separadamente. Aparência, competência, simpatia, ética — são coisas distintas, sem correlação obrigatória.",
    category: "Social",
  },
  {
    id: "negatividade",
    name: "Viés de negatividade",
    definition:
      "O cérebro presta mais atenção e lembra-se melhor de eventos negativos do que positivos.",
    example:
      "Tiveste 9 boas experiências num restaurante e 1 má. Quando perguntam, lembras-te primeiro da má.",
    howItCatchesYou:
      "Avalias relações, dias, lugares e pessoas com excesso de peso para o lado negativo. Resulta numa perceção mais sombria do que a realidade.",
    howToFight:
      "Quando avaliares algo, conta deliberadamente o positivo. 'Hoje foi mau' pode esconder 5 momentos bons que apagaste.",
    category: "Memória",
  },
  {
    id: "status-quo",
    name: "Viés do status quo",
    definition:
      "Preferência por manter as coisas como estão, mesmo quando uma mudança seria objetivamente melhor.",
    example:
      "Continuas com o banco do qual tens queixas há anos. Mudar daria trabalho — manter custa pouco no dia mas muito ao longo de anos.",
    howItCatchesYou:
      "A inércia parece neutra mas é uma escolha. Não mudar é escolher continuar — com todos os custos disso.",
    howToFight:
      "Faz a comparação invertida: se já estivesses no novo, voltarias para o antigo? Se não, é sinal claro de que a mudança vale.",
    category: "Decisão",
  },
  {
    id: "atribuicao-fundamental",
    name: "Erro de atribuição fundamental",
    definition:
      "Explicar o comportamento dos outros pela personalidade deles, e o nosso próprio comportamento pelas circunstâncias.",
    example:
      "Se alguém te corta no trânsito, é 'imbecil'. Se tu cortas alguém, é porque 'estavas com pressa, tinhas razão'.",
    howItCatchesYou:
      "Julgas duramente os outros por momentos pontuais, mas explicas os teus erros com contexto. Cria desigualdade no julgamento.",
    howToFight:
      "Quando julgares alguém negativamente, pergunta: 'Que circunstância pode explicar isto, sem ser carácter?'",
    category: "Social",
  },
  {
    id: "endogrupo",
    name: "Viés do endogrupo",
    definition:
      "Tendência para favorecer pessoas que percebes como 'do teu grupo' (clube, partido, nacionalidade, religião) em detrimento de outros.",
    example:
      "Acreditas mais facilmente em alguém da tua área política, mesmo quando diz coisas tão duvidosas quanto alguém do lado oposto.",
    howItCatchesYou:
      "Sem dares conta, aplicas régua diferente a quem é 'dos teus' versus 'dos outros'. Resulta em pensamento distorcido.",
    howToFight:
      "Pergunta-te: 'Se um membro do grupo oposto tivesse dito o mesmo, eu reagia igual?' Se não, há viés.",
    category: "Social",
  },
  {
    id: "recencidade",
    name: "Viés da recencidade",
    definition:
      "Dar mais peso a eventos recentes do que a tendências de longo prazo, na hora de decidir.",
    example:
      "A bolsa subiu nos últimos 3 meses — assumes que vai continuar. Os 10 anos anteriores são esquecidos.",
    howItCatchesYou:
      "Decisões sobre investimentos, relacionamentos, carreira ficam contaminadas pelo período recente — que pode não ser representativo.",
    howToFight:
      "Olha sempre para o histórico longo. 3 meses não fazem tendência; 10 anos sim.",
    category: "Memória",
  },
  {
    id: "aversao-perda",
    name: "Aversão à perda",
    definition:
      "A dor de perder algo é cerca de duas vezes mais intensa que o prazer de ganhar o equivalente.",
    example:
      "Perder 100€ dói mais do que ganhar 100€ alegra. Por isso preferes não jogar uma moeda 50/50 com prémio igual.",
    howItCatchesYou:
      "Tomas decisões para evitar perdas mais do que para maximizar ganhos — resultando em conservadorismo excessivo.",
    howToFight:
      "Antes de decidir, pondera ganho esperado vs perda esperada em valor absoluto. Não pelo medo de perder.",
    category: "Decisão",
  },
  {
    id: "excesso-confianca",
    name: "Excesso de confiança",
    definition:
      "Subestimar sistematicamente a incerteza nas próprias previsões e capacidades.",
    example:
      "90% dos condutores acham que conduzem melhor que a média. Estatisticamente impossível.",
    howItCatchesYou:
      "Achas que vais terminar o projeto em 1 semana — demora 3. Achas que sabes o resultado — surpreende-te.",
    howToFight:
      "Pede estimativas como intervalos ('entre 5 e 15 dias') em vez de pontos. E alarga sempre o intervalo.",
    category: "Decisão",
  },
  {
    id: "hindsight",
    name: "Viés retrospetivo (hindsight)",
    definition:
      "Depois de algo acontecer, acreditar que era previsível desde o início ('eu sabia que ia acontecer').",
    example:
      "Depois da crise económica, todos dizem 'era óbvio'. Antes, pouquíssimos previam.",
    howItCatchesYou:
      "Achas que devias ter visto sinais que só ficam visíveis depois. Resulta em auto-flagelação injusta.",
    howToFight:
      "Antes de saber o resultado de uma decisão, escreve a tua previsão. Compara depois — vais descobrir quanto não previas.",
    category: "Memória",
  },
];
