import { geminiFetchWithRetry } from "../../lib/gemini-retry";
import { WORD_POOL } from "../../lib/lexico-pool";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

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

  let body: { description?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const description = body.description?.trim();
  if (!description || description.length < 8 || description.length > 400) {
    return Response.json(
      { error: "Descrição muito curta ou longa" },
      { status: 400 }
    );
  }

  const lexicon = WORD_POOL.map((w) => `${w.word}: ${w.formalDefinition}`).join(
    "\n"
  );

  const systemPrompt = `És um anti-dicionário em português europeu. Recebes uma DESCRIÇÃO de um conceito ou sentimento, e sugeres a PALAVRA do léxico abaixo que melhor encaixa.

LÉXICO DISPONÍVEL (apenas estas palavras podem ser respostas):
${lexicon}

Devolves JSON (sem markdown):
{
  "matches": [
    {
      "word": "Palavra exata do léxico",
      "definition": "A sua definição",
      "whyFits": "Em 1 frase, porquê encaixa nesta descrição."
    },
    ... até 3 sugestões ordenadas por relevância ...
  ]
}

REGRAS:
- A "word" tem de ser EXATAMENTE uma das palavras do léxico (com maiúsculas como aparece).
- Se nenhuma encaixa bem, devolve "matches": [].
- Não inventes palavras fora do léxico.
- PT-PT.`;

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
                  text: `Descrição: ${description}\n\nQual ou quais palavras do léxico encaixam?`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
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
    const validWords = new Set(WORD_POOL.map((w) => w.word));
    const matches = Array.isArray(parsed.matches)
      ? (parsed.matches as unknown[])
          .map((m) => {
            const mm = (m ?? {}) as Record<string, unknown>;
            return {
              word: String(mm.word ?? "").trim(),
              definition: String(mm.definition ?? "").trim(),
              whyFits: String(mm.whyFits ?? "").trim(),
            };
          })
          .filter((m) => validWords.has(m.word))
          .slice(0, 3)
      : [];

    return Response.json({ matches });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
