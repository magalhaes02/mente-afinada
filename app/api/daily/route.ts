import { buildPoolPayload } from "../../lib/daily-pool";
import {
  generatePayloadWithGemini,
  type DificuldadeServer,
} from "../../lib/gemini";
import type { DailyPayload } from "../../lib/types";

export const dynamic = "force-dynamic";

function todayKeyLisbon(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function parseDificuldade(value: string | null): DificuldadeServer {
  if (value === "basico" || value === "avancado") return value;
  return "intermedio";
}

export async function GET(request: Request) {
  const dateKey = todayKeyLisbon();
  const apiKey = process.env.GEMINI_API_KEY;
  const url = new URL(request.url);
  const dificuldade = parseDificuldade(url.searchParams.get("dif"));

  if (apiKey) {
    try {
      const { word, challenge, quote, question, quiz } =
        await generatePayloadWithGemini(dateKey, apiKey, dificuldade);
      const payload: DailyPayload = {
        generatedAt: new Date().toISOString(),
        dateKey,
        source: "ai",
        word,
        challenge,
        quote,
        question,
        quiz,
      };
      return Response.json(payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown";
      console.error("Gemini failed, using pool:", message);
      return Response.json(buildPoolPayload(dateKey, message));
    }
  }

  return Response.json(
    buildPoolPayload(dateKey, "GEMINI_API_KEY não configurada")
  );
}
