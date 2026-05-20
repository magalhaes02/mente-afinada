import { geminiFetchWithRetry } from "../../lib/gemini-retry";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const PROMPTS: Record<string, { systemPrompt: string; itemSchema: string }> = {
  palavra: {
    systemPrompt:
      "És lexicógrafo português europeu. Geras palavras de uso médio-alto que muita gente reconhece mas raramente sabe definir com precisão. NÃO sejas óbvio — palavras como 'estereótipo' ou 'paradigma' já existem; gera outras como 'inexorável', 'idiossincrasia', 'tergiversar'.",
    itemSchema:
      '{"word":"Palavra","formalDefinition":"Definição em 1 frase precisa.","etymology":"Origem (opcional)","example":"Frase com a palavra.","synonyms":[{"word":"Sinónimo 1","nuance":"Em que difere."},{"word":"Sinónimo 2","nuance":"..."}],"usage":"Quando usar em vez de termos comuns."}',
  },
  citacao: {
    systemPrompt:
      "Geras citações REAIS de livros REAIS de autores REAIS. Nunca inventes. Se não confias na atribuição, usa um clássico que conheças bem. Foco em literatura mundial, filosofia, ensaio.",
    itemSchema:
      '{"text":"A citação exata.","author":"Autor real","book":"Livro real","year":"Ano (se souberes)","meaning":"O que significa, 2-3 frases.","context":"Contexto autor/livro/frase, 2-3 frases.","theme":"Tema único curto"}',
  },
  pergunta: {
    systemPrompt:
      "Geras perguntas filosóficas genuínas, com várias respostas defensáveis. Não escolares — abertas. Pensadores fiáveis: Sócrates, Platão, Aristóteles, Estoicos, Kant, Mill, Nietzsche, Sartre, Camus, Heidegger, Wittgenstein, Foucault, Arendt.",
    itemSchema:
      '{"question":"Pergunta direta","theme":"Tema único","whyItMatters":"Porque importa, 2-3 frases.","trapAnswer":"Resposta fácil/típica.","perspectives":[{"name":"Pensador/escola","view":"O que diz, 2-3 frases."},{"name":"Outro","view":"..."}],"pushFurther":"Pergunta de seguimento."}',
  },
  falacia: {
    systemPrompt:
      "Geras falácias lógicas com explicação. Tipos comuns: ad hominem, falsa dicotomia, espantalho, apelo à autoridade, falsa causalidade, ad populum, etc.",
    itemSchema:
      '{"name":"Nome da falácia em PT","latin":"Nome em latim (opcional)","definition":"Definição em 1 frase.","example":"Exemplo realista, 2-3 frases.","howToSpot":"Como detetar.","howToCounter":"Como contestar.","category":"Relevância|Estrutura|Emoção|Ambiguidade"}',
  },
  vies: {
    systemPrompt:
      "Geras vieses cognitivos com explicação prática. Exemplos: ancoragem, confirmação, disponibilidade, Dunning-Kruger, atribuição fundamental, etc.",
    itemSchema:
      '{"name":"Nome em PT","definition":"Definição clara.","example":"Exemplo concreto.","howItCatchesYou":"Como te apanha.","howToFight":"Como contrariar.","category":"Memória|Decisão|Social|Causalidade"}',
  },
  etimologia: {
    systemPrompt:
      "Geras etimologias de palavras portuguesas comuns mas com origem surpreendente. Exemplos do estilo: salário ← sal, idiota ← idiótes grego (privado), pânico ← deus Pã.",
    itemSchema:
      '{"word":"Palavra","origin":"Resumo da origem.","story":"História completa, 2-3 frases.","modernMeaning":"Significado atual.","curiosity":"Detalhe extra interessante (opcional)."}',
  },
  frase: {
    systemPrompt:
      "Geras frases cultas em latim ou francês usadas em livros e textos cultos. Exemplos: carpe diem, sine qua non, modus operandi.",
    itemSchema:
      '{"phrase":"A frase","language":"Latim|Francês","literalMeaning":"Tradução literal.","realMeaning":"O que quer mesmo dizer.","whenToUse":"Quando usar.","example":"Exemplo de uso."}',
  },
  conceito: {
    systemPrompt:
      "Geras conceitos científicos essenciais com explicação acessível. Exemplos: entropia, seleção natural, princípio da incerteza.",
    itemSchema:
      '{"name":"Nome","field":"Física|Biologia|Química|Cosmologia|Ciência geral","definition":"Definição precisa.","whyMatters":"Porque importa.","layExplanation":"Explicação em linguagem simples.","curiosity":"Curiosidade extra (opcional)."}',
  },
  retorica: {
    systemPrompt:
      "Geras técnicas retóricas com origem clássica ou moderna. Exemplos: ethos, anáfora, antítese, tricolon.",
    itemSchema:
      '{"name":"Nome","origin":"Origem (opcional)","definition":"Definição.","example":"Exemplo concreto.","whenToUse":"Quando usar."}',
  },
  proverbio: {
    systemPrompt: "Geras provérbios portugueses com significado profundo.",
    itemSchema:
      '{"text":"O provérbio","meaning":"Significado real.","whenItApplies":"Quando aplica.","modernExample":"Exemplo moderno (opcional)","warning":"Aviso de uso (opcional)"}',
  },
  marco: {
    systemPrompt:
      "Geras marcos históricos importantes do séc. XIX-XX. Eventos que mudaram instituições, geografia política, ou consciência coletiva.",
    itemSchema:
      '{"name":"Nome do marco","year":"Ano ou período","place":"Local","whatHappened":"O que aconteceu, 2-3 frases.","whyMatters":"Porquê importa.","legacy":"Legado hoje."}',
  },
  mito: {
    systemPrompt:
      "Geras mitos e arquétipos da mitologia grega/romana/nórdica/egípcia. Exemplos: Sísifo, Prometeu, Ícaro.",
    itemSchema:
      '{"name":"Nome","origin":"Grego|Romano|Bíblico|Nórdico|Egípcio","story":"História, 2-3 frases.","modernMeaning":"Significado atual.","whenWeSay":"Como usamos hoje, com exemplo."}',
  },
  curiosidade: {
    systemPrompt:
      "Geras curiosidades surpreendentes — factos verdadeiros que viram a perspetiva sobre tempo, escala, ou mundo. Exemplos: Cleópatra está mais perto do iPhone do que das pirâmides.",
    itemSchema:
      '{"title":"Título curto","fact":"Facto explicado, 2-3 frases.","whyMatters":"Porquê é interessante.","category":"Tempo|Geografia|Ciência|História|Linguagem|Corpo"}',
  },
  geografia: {
    systemPrompt:
      "Geras factos de geografia cultural — capitais inesperadas, países que sumiram, fronteiras estranhas.",
    itemSchema:
      '{"title":"Título","factCorrected":"Facto correto.","whyConfusion":"Porquê confundimos.","curiosity":"Curiosidade adicional (opcional)","category":"Capitais|Países que mudaram|Fronteiras|Territórios|Geografia"}',
  },
  invento: {
    systemPrompt:
      "Geras inventos que mudaram a civilização. Foco em descobertas estruturais (não gadgets recentes).",
    itemSchema:
      '{"name":"Nome do invento","year":"Ano ou período","inventor":"Inventor e país","what":"O que é.","impact":"Impacto na época.","today":"Porquê ainda importa hoje."}',
  },
  habito: {
    systemPrompt:
      "Geras hábitos mentais / modelos de pensamento proativos. Exemplos: Navalha de Occam, First Principles, Inversion.",
    itemSchema:
      '{"name":"Nome","origin":"Origem","principle":"Princípio em 1-2 frases.","howToApply":"Como aplicar.","example":"Exemplo concreto.","warning":"Aviso (opcional)"}',
  },
  escola: {
    systemPrompt:
      "Geras escolas filosóficas com contexto. Exemplos: Estoicismo, Niilismo, Existencialismo. Foco em escolas reais e bem documentadas.",
    itemSchema:
      '{"name":"Nome","period":"Quando existiu","origin":"Origem geográfica/cultural","thinkers":["Pensador 1","Pensador 2","Pensador 3"],"centralIdeas":["Ideia 1","Ideia 2","Ideia 3"],"todayValue":"Porquê ainda interessa hoje.","motto":"Lema da escola (opcional)"}',
  },
  autor: {
    systemPrompt:
      "Geras mini-biografias de autores essenciais. Pessoa, Saramago, Nietzsche, Kant. Foco em autores reais e relevantes.",
    itemSchema:
      '{"name":"Nome do autor","years":"Anos vivido (ex: 1844 — 1900)","origin":"País/contexto","essentialWorks":[{"title":"Obra 1","year":"Ano"},{"title":"Obra 2"}],"centralIdea":"Ideia central, 2-3 frases.","whyMatters":"Porquê ainda importa.","signatureQuote":"Frase emblemática (opcional)"}',
  },
  discurso: {
    systemPrompt:
      "Geras descrições de discursos famosos da história — JFK, Mandela, MLK, Churchill, e outros. Apenas discursos REAIS verificáveis.",
    itemSchema:
      '{"title":"Título do discurso","speaker":"Orador","date":"Data","place":"Local","excerpt":"Excerto exato","context":"Contexto histórico, 2-3 frases.","whyMarked":"Porquê marcou, 2-3 frases."}',
  },
};

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY não configurada" },
      { status: 500 }
    );
  }

  let body: {
    tipo?: string;
    count?: number;
    existingTitles?: string[];
    instructions?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const tipo = body.tipo;
  if (!tipo || !PROMPTS[tipo]) {
    return Response.json({ error: "Tipo inválido" }, { status: 400 });
  }
  const count = Math.max(1, Math.min(5, Number(body.count ?? 3)));
  const config = PROMPTS[tipo];
  const existing = Array.isArray(body.existingTitles)
    ? body.existingTitles.slice(0, 100).join(", ")
    : "";
  const extraInstructions = (body.instructions ?? "").slice(0, 300);

  const systemPrompt = `${config.systemPrompt}

REGRAS GERAIS:
- Tudo em português europeu (PT-PT).
- Surpreende — não repitas o que já existe.
- Conteúdo factual e verificável. Se não tens certeza, escolhe outra entrada.
${existing ? `\nJÁ EXISTEM: ${existing}\nNÃO REPITAS estes nomes ou tópicos.` : ""}
${extraInstructions ? `\nPEDIDO ADICIONAL: ${extraInstructions}` : ""}

FORMATO OBRIGATÓRIO — array JSON com ${count} objetos, cada um neste shape:
${config.itemSchema}

Responde APENAS com o array JSON. Sem markdown, sem texto adicional.

Exemplo de resposta:
[
  ${config.itemSchema},
  ${config.itemSchema}
]`;

  try {
    const response = await geminiFetchWithRetry(
      `${GEMINI_ENDPOINT}?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Gera ${count} novas entradas do tipo "${tipo}". Diversifica.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 1.0,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return Response.json(
        { error: `Gemini ${response.status}: ${errText.slice(0, 200)}` },
        { status: 500 }
      );
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return Response.json({ error: "Resposta vazia" }, { status: 500 });
    }

    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
    }
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1) {
      cleaned = cleaned.slice(firstBracket, lastBracket + 1);
    }

    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) {
      return Response.json(
        { error: "Resposta não é array" },
        { status: 500 }
      );
    }
    return Response.json({ items: parsed });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
