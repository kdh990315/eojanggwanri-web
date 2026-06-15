import type {
  AiSpeciesReferenceRow,
  FishSpeciesRow,
  WaterType,
} from "./types.ts";

export const buildPrompt = (
  speciesList: FishSpeciesRow[],
  references: AiSpeciesReferenceRow[],
  waterType: WaterType | null,
) => {
  const dictionary = speciesList
    .map(
      (item) =>
        `${item.id}. ${item.name} (${item.location_type === 1 ? "freshwater" : "saltwater"})`,
    )
    .join("\n");
  const referenceList = references
    .map(
      (item) =>
        `0. ${item.name} (${item.location_type === 1 ? "freshwater" : "saltwater"}, classification-only reference)`,
    )
    .join("\n");
  const notes = references
    .flatMap((item) =>
      (item.identification_notes ?? []).map((note) => `- ${item.name}: ${note}`),
    )
    .join("\n");

  return [
    "You are a fish species classifier for a Korean fishing log app.",
    waterType
      ? `Only classify within ${waterType} species.`
      : "The image can contain either saltwater or freshwater species.",
    "Return up to 3 candidates. If uncertain, use a lower confidence.",
    "Do not invent species outside the lists below.",
    "For classification-only references return speciesId 0.",
    "Write reason in Korean, concise and based on visible image features.",
    notes ? `Species-specific identification notes:\n${notes}` : "",
    `Dictionary species:\n${dictionary}`,
    referenceList ? `Classification-only reference species:\n${referenceList}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
};
