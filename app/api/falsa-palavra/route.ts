import { geminiFetchWithRetry } from "../../lib/gemini-retry";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `És um especialista em linguagem portuguesa que cria definições falsas mas plausíveis para um jogo educativo.

Recebes uma palavra portuguesa e a sua definição verdadeira.

Devolves 3 definições FALSAS mas plausíveis:
- Cada uma deve ser sintaticamente correta, parecer dicionário a sério.
- Cada uma deve estar relacionada com a forma/som/raiz da palavra, mas significar algo diferente.
- Não devem ser absurdas — devem fazer hesitar mesmo quem conhece a palavra.

Formato JSON (sem markdown):
{
  "fakes": ["definição falsa 1", "definição falsa 2", "definição falsa 3"]
}

REGRAS:
- PT-PT.
- Frases curtas, estilo dicionário (1 frase cada).
- Plausíveis. Nunca óbvias.`;

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

  let body: { word?: string; definition?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const { word, definition } = body;
  if (!word || !definition) {
    return Response.json({ error: "Parâmetros em falta" }, { status: 400 });
  }

  const userPrompt = `Palavra: ${word}
Definição verdadeira: ${definition}

Gera 3 definições falsas plausíveis.`;

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
    const fb = cleaned.indexOf("{");
    const lb = cleaned.lastIndexOf("}");
    if (fb !== -1 && lb !== -1) cleaned = cleaned.slice(fb, lb + 1);

    const parsed = JSON.parse(cleaned);
    const fakes = Array.isArray(parsed.fakes)
      ? (parsed.fakes as unknown[]).map((f) => String(f)).slice(0, 3)
      : [];
    if (fakes.length < 3) {
      return Response.json(
        { error: "IA devolveu menos de 3 alternativas" },
        { status: 500 }
      );
    }
    return Response.json({ fakes });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
