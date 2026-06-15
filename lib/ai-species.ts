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

export type AiSpeciesRegulationKind =
  | "closed_season"
  | "minimum_length"
  | "minimum_weight"
  | "prohibited_length_range";

export interface AiSpeciesRegulation {
  effectiveFrom: string;
  exceptionNote: string | null;
  measurementBasis: string | null;
  minLengthCm: number | null;
  minWeightG: number | null;
  periodEndDay: number | null;
  periodEndMonth: number | null;
  periodStartDay: number | null;
  periodStartMonth: number | null;
  prohibitedLengthMaxCm: number | null;
  prohibitedLengthMinCm: number | null;
  regionNote: string | null;
  regulationKind: AiSpeciesRegulationKind;
  sourceTitle: string;
  sourceUrl: string;
}

export interface AiSpeciesDetectionResponse {
  candidates: AiSpeciesCandidate[];
  model: string;
  regulations: AiSpeciesRegulation[];
}

export const isSupportedAiSpeciesImageType = (
  value: string,
): value is (typeof AI_SPECIES_SUPPORTED_IMAGE_TYPES)[number] => {
  return AI_SPECIES_SUPPORTED_IMAGE_TYPES.some((type) => type === value);
};

export const isAiSpeciesWaterType = (
  value: unknown,
): value is AiSpeciesWaterType => {
  return value === "freshwater" || value === "saltwater";
};
