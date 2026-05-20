import { geminiFetchWithRetry } from "../../lib/gemini-retry";

export const dynamic = "force-dynamic";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `És um construtor de exercícios sobre falácias lógicas. Crias um pequeno texto realista (3-5 frases) que contém UMA falácia escondida, em estilo natural.

O leitor terá de identificar qual falácia foi usada.

Tipos de falácia possíveis: ad-hominem, falsa-dicotomia, espantalho, apelo-autoridade, falsa-causalidade, ad-populum, generalizacao-apressada, peticao-principio, apelo-ignorancia, apelo-emocao, declive-escorregadio, tu-quoque, apelo-tradicao, falsa-equivalencia, bandwagon.

Formato JSON (sem markdown):
{
  "scenario": "Pequeno texto realista (3-5 frases) em PT-PT que contém UMA falácia. Pode ser um diálogo, um post de redes sociais, uma declaração política, um comentário, etc.",
  "fallacyId": "id da falácia da lista acima",
  "fallacyName": "Nome legível em português",
  "explanation": "Porquê é essa falácia, 2-3 frases.",
  "wrongOptions": ["nome de outra falácia plausível", "nome de outra falácia plausível", "nome de outra falácia plausível"]
}

REGRAS:
- PT-PT.
- O cenário deve soar natural (alguém poderia mesmo dizer aquilo).
- A falácia deve estar GENUINAMENTE no texto (não como pista óbvia).
- As 3 "wrongOptions" devem ser falácias DIFERENTES da correta, e algo plausíveis para enganar.`;

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY não configurada" },
      { status: 500 }
    );
  }

  const userPrompt = `Gera um cenário com uma falácia escondida. Surpreende — não uses a falácia mais óbvia, mistura entre os 15 tipos. Escolhe um tema próximo do leitor português (política, redes sociais, conversa de café, decisão pessoal).`;

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
    return Response.json({
      scenario: String(parsed.scenario ?? ""),
      fallacyId: String(parsed.fallacyId ?? ""),
      fallacyName: String(parsed.fallacyName ?? ""),
      explanation: String(parsed.explanation ?? ""),
      wrongOptions: Array.isArray(parsed.wrongOptions)
        ? (parsed.wrongOptions as unknown[]).map((o) => String(o)).slice(0, 3)
        : [],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return Response.json({ error: msg }, { status: 500 });
  }
}
