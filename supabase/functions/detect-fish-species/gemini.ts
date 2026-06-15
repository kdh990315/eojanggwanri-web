import type {
  AiSpeciesCandidate,
  AiSpeciesReferenceRow,
  FishSpeciesRow,
  GeminiResponse,
  InlineImage,
} from "./types.ts";

export const GEMINI_MODEL = "gemini-2.5-flash";

export const callGemini = async (image: InlineImage, prompt: string) => {
  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  data: image.base64,
                  mime_type: image.mimeType,
                },
              },
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          responseJsonSchema: {
            properties: {
              candidates: {
                items: {
                  properties: {
                    confidence: { maximum: 100, minimum: 0, type: "number" },
                    reason: { type: "string" },
                    speciesId: { type: "integer" },
                    speciesName: { type: "string" },
                  },
                  required: ["speciesId", "speciesName", "confidence", "reason"],
                  type: "object",
                },
                maxItems: 3,
                minItems: 1,
                type: "array",
              },
            },
            required: ["candidates"],
            type: "object",
          },
          responseMimeType: "application/json",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status}).`);
  }

  return (await response.json()) as GeminiResponse;
};

export const parseCandidates = (
  response: GeminiResponse,
  speciesList: FishSpeciesRow[],
  references: AiSpeciesReferenceRow[],
) => {
  const text = response.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const raw = JSON.parse(text) as { candidates?: unknown };

  if (!Array.isArray(raw.candidates)) {
    throw new Error("Gemini response has no candidates.");
  }

  const speciesById = new Map(speciesList.map((item) => [item.id, item]));
  const speciesByName = new Map(speciesList.map((item) => [item.name, item]));
  const referenceNames = new Set(references.map((item) => item.name));

  return raw.candidates.flatMap((candidate): AiSpeciesCandidate[] => {
    if (!candidate || typeof candidate !== "object") {
      return [];
    }

    const value = candidate as Record<string, unknown>;
    const id = typeof value.speciesId === "number" ? value.speciesId : null;
    const name = typeof value.speciesName === "string" ? value.speciesName.trim() : "";
    const species = (id ? speciesById.get(id) : undefined) ?? speciesByName.get(name);

    if (!species && !referenceNames.has(name)) {
      return [];
    }

    return [
      {
        confidence: clampConfidence(value.confidence),
        reason:
          typeof value.reason === "string" && value.reason.trim()
            ? value.reason.trim()
            : "사진에서 확인되는 특징을 기준으로 판별했습니다.",
        speciesId: species?.id ?? null,
        speciesName: species?.name ?? name,
      },
    ];
  });
};

const clampConfidence = (value: unknown) => {
  const confidence = typeof value === "number" ? value : Number(value);

  return Number.isFinite(confidence)
    ? Math.max(0, Math.min(100, Math.round(confidence)))
    : 0;
};
