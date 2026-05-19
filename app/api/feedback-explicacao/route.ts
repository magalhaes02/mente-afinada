import { geminiFetchWithRetry } from "../../lib/gemini-retry";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `És um professor de português europeu e de pensamento claro. Avalias a explicação de um leitor sobre um conceito.

Recebes:
- O CONCEITO a explicar
- A DEFINIÇÃO FORMAL precisa (em 1 frase)
- A EXPLICAÇÃO DO LEITOR

Avalias:
1. Captou o essencial?
2. Foi preciso ou usou exemplos longos onde a definição seria mais clara?
3. Que palavras-chave faltavam para tornar formal e preciso?

Devolves em JSON (sem markdown):
{
  "captureScore": 0-10,
  "summary": "Avaliação geral em 2-3 frases.",
  "missingKeywords": ["palavra1", "palavra2", "..."],
  "preciseRewrite": "A versão formal e precisa (parecida com a definição correta mas adaptada ao registo da explicação do leitor).",
  "tip": "1 dica concreta para o leitor melhorar a próxima explicação."
}

REGRAS:
- PT-PT (não brasileiro).
- Não elogies por elogiar. Aponta problemas concretos.
- captureScore: 0-3 = pouco capturado; 4-6 = parcialmente; 7-9 = bom; 10 = perfeito.
- O "preciseRewrite" deve ser claramente melhor que a explicação do leitor, mas não exatamente a definição copy-paste.`;

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
    concept?: string;
    formalDefinition?: string;
    userExplanation?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const { concept, formalDefinition, userExplanation } = body;
  if (
    !concept ||
    !formalDefinition ||
    !userExplanation ||
    userExplanation.length > 1500
  ) {
    return Response.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const userPrompt = `CONCEITO: ${concept}
DEFINIÇÃO FORMAL: ${formalDefinition}
EXPLICAÇÃO DO LEITOR: ${userExplanation}

Avalia.`;

  try {
    const response = await geminiFetchWithRetry(
      `${GEMINI_ENDPOINT}?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.6,
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
    const fb = cleaned.indexOf("{");
    const lb = cleaned.lastIndexOf("}");
    if (fb !== -1 && lb !== -1) cleaned = cleaned.slice(fb, lb + 1);

    const parsed = JSON.parse(cleaned);
    return Response.json({
      captureScore: Math.max(
        0,
        Math.min(10, Number(parsed.captureScore ?? 5))
      ),
      summary: String(parsed.summary ?? ""),
      missingKeywords: Array.isArray(parsed.missingKeywords)
        ? (parsed.missingKeywords as unknown[]).map((k) => String(k)).slice(0, 8)
        : [],
      preciseRewrite: String(parsed.preciseRewrite ?? ""),
      tip: String(parsed.tip ?? ""),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
