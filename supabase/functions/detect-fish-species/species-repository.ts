import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

import type {
  AiSpeciesReferenceRow,
  FishSpeciesRow,
  WaterType,
} from "./types.ts";

export async function getSpeciesData(
  supabase: SupabaseClient,
  waterType: WaterType | null,
) {
  return await Promise.all([
    getSpeciesList(supabase, waterType),
    getReferenceList(supabase, waterType),
  ]);
}

async function getSpeciesList(
  supabase: SupabaseClient,
  waterType: WaterType | null,
) {
  let query = supabase
    .from("fish_species")
    .select("id, location_type, name")
    .order("location_type")
    .order("id");

  if (waterType) {
    query = query.eq("location_type", waterType === "freshwater" ? 1 : 2);
  }

  const { data, error } = await query.returns<FishSpeciesRow[]>();

  if (error || !data?.length) {
    throw error ?? new Error("Fish species list is empty.");
  }

  return data;
}

async function getReferenceList(
  supabase: SupabaseClient,
  waterType: WaterType | null,
) {
  let query = supabase
    .from("ai_species_references")
    .select("location_type, name, identification_notes")
    .eq("is_active", true)
    .order("location_type")
    .order("id");

  if (waterType) {
    query = query.eq("location_type", waterType === "freshwater" ? 1 : 2);
  }

  const { data, error } = await query.returns<AiSpeciesReferenceRow[]>();

  if (error) {
    throw error;
  }

  return data ?? [];
}
