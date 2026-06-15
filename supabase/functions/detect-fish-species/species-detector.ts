import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

import { callGemini, GEMINI_MODEL, parseCandidates } from "./gemini.ts";
import { buildPrompt } from "./prompt.ts";
import { getSpeciesData } from "./species-repository.ts";
import type { InlineImage, WaterType } from "./types.ts";

export { GEMINI_MODEL };

export async function detectSpecies({
  image,
  supabase,
  waterType,
}: {
  image: InlineImage;
  supabase: SupabaseClient;
  waterType: WaterType | null;
}) {
  const [speciesList, references] = await getSpeciesData(supabase, waterType);
  const response = await callGemini(
    image,
    buildPrompt(speciesList, references, waterType),
  );

  return parseCandidates(response, speciesList, references);
}
