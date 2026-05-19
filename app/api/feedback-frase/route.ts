import { geminiFetchWithRetry } from "../../lib/gemini-retry";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `És um professor de português europeu, exigente e direto, que avalia se uma palavra foi usada corretamente numa frase.

Recebes:
- a palavra
- a definição formal
- a frase do leitor

Avalias:
1. A palavra foi usada com sentido correto? (Sim / Não / Parcialmente)
2. A construção sintática está correta?
3. O registo (formal/informal) faz sentido para o tipo de frase?

Devolves em JSON (sem markdown):
{
  "verdict": "correto" | "parcialmente" | "incorreto",
  "explanation": "Frase curta a explicar porquê (2-3 frases).",
  "betterVersion": "Uma versão da frase que usa a palavra com mais precisão. NUNCA mais que 30 palavras.",
  "tip": "1 dica de como melhorar este tipo de uso futuramente."
}

REGRAS:
- Sê direto. Não elogies só para agradar.
- PT-PT (não brasileiro).
- Se a palavra foi mal usada, diz claramente.
- A "betterVersion" deve ser realista e próxima da frase original, não totalmente diferente.`;

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

  let body: { word?: string; definition?: string; sentence?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const { word, definition, sentence } = body;
  if (!word || !sentence || sentence.length > 500) {
    return Response.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const userPrompt = `Palavra: ${word}
Definição formal: ${definition ?? "(não fornecida)"}
Frase do leitor: ${sentence}

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
            temperature: 0.7,
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
      verdict: String(parsed.verdict ?? "parcialmente"),
      explanation: String(parsed.explanation ?? ""),
      betterVersion: String(parsed.betterVersion ?? ""),
      tip: String(parsed.tip ?? ""),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
