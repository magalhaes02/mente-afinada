export type ConceitoCientifico = {
  id: string;
  name: string;
  field: "Física" | "Biologia" | "Química" | "Cosmologia" | "Ciência geral";
  definition: string;
  whyMatters: string;
  layExplanation: string;
  curiosity?: string;
};

export const CONCEITOS_POOL: ConceitoCientifico[] = [
  {
    id: "entropia",
    name: "Entropia",
    field: "Física",
    definition:
      "Medida da desordem ou da indisponibilidade de energia para fazer trabalho útil num sistema.",
    whyMatters:
      "É a 'flecha do tempo' — a entropia tende sempre a aumentar num sistema fechado. Por isso o universo evolui num sentido, e por isso podemos lembrar o passado mas não o futuro.",
    layExplanation:
      "Imagina um quarto arrumado. Naturalmente, com o tempo, vai ficando desarrumado — para o voltar a arrumar, precisas de gastar energia. A natureza prefere a desordem. Essa é a entropia.",
    curiosity:
      "A segunda lei da termodinâmica é a única lei da física que distingue passado de futuro. Sem entropia, o tempo não teria direção.",
  },
  {
    id: "selecao-natural",
    name: "Seleção natural",
    field: "Biologia",
    definition:
      "Mecanismo pelo qual indivíduos com características que aumentam a sobrevivência ou reprodução tendem a deixar mais descendentes, fazendo essas características predominar ao longo de gerações.",
    whyMatters:
      "Explica como a diversidade da vida apareceu sem ser por design. Darwin destruiu a necessidade de um relojoeiro divino.",
    layExplanation:
      "Numa população de coelhos, alguns são mais rápidos. Os predadores apanham os lentos. Os rápidos têm mais descendentes — e esses descendentes são, em média, mais rápidos também. Repete por milhões de anos = nova espécie.",
    curiosity:
      "Seleção natural NÃO é 'sobrevivência do mais forte'. É reprodução do mais adaptado ao contexto. Por vezes, ser pequeno e cooperativo é a melhor estratégia.",
  },
  {
    id: "principio-incerteza",
    name: "Princípio da incerteza",
    field: "Física",
    definition:
      "Em mecânica quântica, é impossível conhecer simultaneamente, com precisão arbitrária, certos pares de propriedades de uma partícula (como posição e momento).",
    whyMatters:
      "Não é limitação de instrumentos — é propriedade fundamental da realidade. O universo, no nível mais pequeno, tem indeterminação intrínseca.",
    layExplanation:
      "Quanto mais sabes onde uma partícula está, menos sabes para onde vai. Não é por medires mal — é assim que a realidade funciona no nível quântico.",
    curiosity:
      "Heisenberg formulou-o em 1927. Einstein nunca aceitou: 'Deus não joga aos dados'. Hoje, sabe-se que joga.",
  },
  {
    id: "big-bang",
    name: "Big Bang",
    field: "Cosmologia",
    definition:
      "Modelo cosmológico que descreve o universo como tendo emergido há cerca de 13,8 mil milhões de anos a partir de um estado extremamente denso e quente, expandindo-se desde então.",
    whyMatters:
      "Significa que o universo tem idade finita e teve início. Antes do Big Bang, é discutível se faz sentido falar de 'antes'.",
    layExplanation:
      "Tudo o que existe — galáxias, estrelas, tu, o ar — esteve concentrado num ponto incrivelmente quente e denso. Há 13,8 mil milhões de anos, começou a expandir-se. Continua a expandir.",
    curiosity:
      "O nome 'Big Bang' foi inventado por Fred Hoyle, um cosmólogo que rejeitava a teoria. Usou o termo em tom de troça. Pegou.",
  },
  {
    id: "adn",
    name: "ADN",
    field: "Biologia",
    definition:
      "Ácido desoxirribonucleico — molécula em dupla hélice que contém a informação genética dos seres vivos.",
    whyMatters:
      "Toda a vida na Terra usa o mesmo código de 4 letras (A, T, G, C) para armazenar instruções. Isto sugere ancestral comum único.",
    layExplanation:
      "Em cada célula tua há um livro de instruções de ~3 mil milhões de 'letras'. Esse livro determina como o teu corpo se constrói. Metade vem da mãe, metade do pai. É praticamente igual ao do teu vizinho — 99,9%.",
    curiosity:
      "Se desenrolasses o ADN de uma só célula, daria 2 metros. Multiplica por 37 biliões de células no teu corpo. Dá várias idas e voltas à Lua.",
  },
  {
    id: "relatividade",
    name: "Relatividade",
    field: "Física",
    definition:
      "Teoria de Einstein (especial: 1905; geral: 1915) que descreve como espaço, tempo e gravidade se comportam — mostrando que não são absolutos mas relativos ao observador.",
    whyMatters:
      "O tempo passa mais devagar a velocidades altas e perto de massas grandes. Não é metáfora — é medido. O GPS no teu telemóvel só funciona porque corrige relatividade.",
    layExplanation:
      "Dois relógios sincronizados: um fica no chão, outro vai num avião. Quando o avião aterra, os relógios já não estão sincronizados. O do avião 'andou' menos. Isto é real e mensurável.",
    curiosity:
      "Massa curva o espaço. Quando vês a Lua a 'cair' à volta da Terra, o que se passa é que ela está a seguir uma linha reta num espaço deformado pela massa terrestre.",
  },
  {
    id: "falsificabilidade",
    name: "Falsificabilidade",
    field: "Ciência geral",
    definition:
      "Critério de Karl Popper para distinguir ciência de não-ciência: uma teoria é científica apenas se for possível imaginar uma observação que a refutaria.",
    whyMatters:
      "Distingue ciência de pseudo-ciência. 'Tudo o que acontece é vontade de Deus' não é falsificável — qualquer evidência confirma. Por isso não é teoria científica.",
    layExplanation:
      "Para ser ciência, tens de ser capaz de dizer: 'se observarmos X, então a minha teoria está errada'. Se nenhuma observação pudesse refutar a teoria, não é ciência — é fé ou narrativa.",
    curiosity:
      "Popper considerava o marxismo e a psicanálise não-científicos pelo mesmo motivo: explicam tudo a posteriori, mas não preveem nada testável.",
  },
  {
    id: "metodo-cientifico",
    name: "Método científico",
    field: "Ciência geral",
    definition:
      "Processo de obtenção de conhecimento que combina hipóteses, observação controlada, experimentação replicável e revisão por pares.",
    whyMatters:
      "Não é magia nem autoridade — é um conjunto de salvaguardas contra os erros que o cérebro humano comete sistematicamente.",
    layExplanation:
      "1) Formula uma hipótese específica. 2) Desenha experiência que possa falsificá-la. 3) Observa o resultado. 4) Publica para outros tentarem refutar. 5) Se sobrevive, integra no conhecimento (provisoriamente).",
    curiosity:
      "Um 'estudo' que não foi revisto por pares e replicado não é ciência consolidada — é hipótese candidata. 90% dos resultados pré-publicação acabam por se confirmar como mais frágeis.",
  },
  {
    id: "efeito-borboleta",
    name: "Efeito borboleta / Caos determinístico",
    field: "Física",
    definition:
      "Em sistemas dinâmicos não-lineares, pequenas variações nas condições iniciais podem produzir resultados completamente diferentes ao longo do tempo.",
    whyMatters:
      "Explica por que algumas coisas são imprevisíveis mesmo quando seguem leis determinísticas — o tempo meteorológico, a economia, a biologia complexa.",
    layExplanation:
      "Lança duas pedras quase idênticas num rio turbulento. Em poucos segundos, vão a sítios diferentes. Não é magia — é sensibilidade extrema às condições iniciais.",
    curiosity:
      "A expressão vem de Edward Lorenz (meteorologista, 1972): 'O bater de asas de uma borboleta no Brasil pode desencadear um tornado no Texas?'. Não literal — ilustrativo.",
  },
  {
    id: "evolucao",
    name: "Evolução",
    field: "Biologia",
    definition:
      "Mudança gradual das características hereditárias de populações biológicas ao longo de gerações sucessivas.",
    whyMatters:
      "É o princípio organizador de toda a biologia. Sem evolução, a diversidade da vida seria inexplicável.",
    layExplanation:
      "Não é 'o macaco transformou-se em homem'. É: populações mudam ao longo de milhões de gerações, e as que se adaptam melhor ao ambiente deixam mais descendentes. Pequenas mudanças acumulam-se. Resultado: a vida diversa que vemos.",
    curiosity:
      "Os humanos e os chimpanzés partilham 98% do ADN. Os humanos e os ratos partilham 85%. Os humanos e as bananas, cerca de 50%. Tudo partilha ancestral.",
  },
  {
    id: "buraco-negro",
    name: "Buraco negro",
    field: "Cosmologia",
    definition:
      "Região do espaço onde a gravidade é tão intensa que nada — nem luz — pode escapar uma vez ultrapassado o horizonte de eventos.",
    whyMatters:
      "Testam os limites da física conhecida. Onde a relatividade encontra a mecânica quântica, a física moderna fica sem respostas.",
    layExplanation:
      "Comprime massa suficiente num volume pequeno e a gravidade torna-se tão forte que nem a luz consegue sair. O Sol, comprimido a 3 km de raio, seria um buraco negro. A Terra, a 9 mm.",
    curiosity:
      "Em 2019 foi captada a primeira foto de um buraco negro (M87*). A 'foto' é da sombra do horizonte de eventos contra o disco de matéria a cair.",
  },
  {
    id: "emergencia",
    name: "Emergência",
    field: "Ciência geral",
    definition:
      "Fenómeno em que propriedades de um sistema surgem da interação dos seus componentes, mas não estão presentes nos componentes individuais.",
    whyMatters:
      "Explica como a consciência pode emergir de neurónios inconscientes, como o trânsito emerge de carros individuais, como a cultura emerge de pessoas isoladas.",
    layExplanation:
      "Uma molécula de água não é húmida. Mil milhões de moléculas de água formam algo húmido. 'Húmido' não está nas moléculas — emerge da interação.",
    curiosity:
      "Aristóteles já o notou: 'o todo é mais do que a soma das partes'. Mas o conceito moderno (séc. XX) é mais preciso e quantificável.",
  },
];
