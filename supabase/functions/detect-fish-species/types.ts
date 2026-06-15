export type WaterType = "saltwater" | "freshwater";

export interface InlineImage {
  base64: string;
  mimeType: string;
}

export interface FishSpeciesRow {
  id: number;
  location_type: 1 | 2;
  name: string;
}

export interface AiSpeciesReferenceRow {
  identification_notes: string[] | null;
  location_type: 1 | 2;
  name: string;
}

export interface AiSpeciesCandidate {
  confidence: number;
  reason: string;
  speciesId: number | null;
  speciesName: string;
}

export interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}

export const normalizeWaterType = (value: unknown): WaterType | null => {
  return value === "saltwater" || value === "freshwater" ? value : null;
};
