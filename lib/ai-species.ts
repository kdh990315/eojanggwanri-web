export const AI_SPECIES_MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const AI_SPECIES_SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AiSpeciesWaterType = "freshwater" | "saltwater";

export interface AiSpeciesCandidate {
  confidence: number;
  reason: string;
  speciesId: number | null;
  speciesName: string;
}

export interface AiSpeciesDetectionResponse {
  candidates: AiSpeciesCandidate[];
  model: string;
}

export function isSupportedAiSpeciesImageType(
  value: string,
): value is (typeof AI_SPECIES_SUPPORTED_IMAGE_TYPES)[number] {
  return AI_SPECIES_SUPPORTED_IMAGE_TYPES.some((type) => type === value);
}

export function isAiSpeciesWaterType(
  value: unknown,
): value is AiSpeciesWaterType {
  return value === "freshwater" || value === "saltwater";
}
