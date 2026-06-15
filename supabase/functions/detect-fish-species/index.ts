import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "npm:@supabase/supabase-js@2";

import { detectSpecies, GEMINI_MODEL } from "./species-detector.ts";
import { normalizeWaterType } from "./types.ts";

const CATCH_IMAGES_BUCKET = "catch-images";
const corsHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Origin": "*",
};

interface DetectFishSpeciesRequest {
  imagePath?: unknown;
  waterType?: unknown;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ message: "Method not allowed." }, 405);
  }

  try {
    const authorization = request.headers.get("Authorization") ?? "";
    const supabase = createUserClient(authorization);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return jsonResponse({ message: "Login is required." }, 401);
    }

    const body = (await request.json()) as DetectFishSpeciesRequest;
    const imagePath = normalizeText(body.imagePath);

    if (!imagePath) {
      return jsonResponse({ message: "imagePath is required." }, 400);
    }

    if (!imagePath.startsWith(`users/${user.id}/`)) {
      return jsonResponse({ message: "Invalid imagePath." }, 403);
    }

    const waterType = normalizeWaterType(body.waterType);
    const image = await downloadImage(supabase, imagePath);
    const candidates = await detectSpecies({ image, supabase, waterType });
    const { data: prediction, error: predictionError } = await supabase
      .from("ai_species_predictions")
      .insert({
        candidates,
        image_storage_path: imagePath,
        model: GEMINI_MODEL,
        user_id: user.id,
        water_type: waterType,
      })
      .select("id")
      .single();

    if (predictionError) {
      throw predictionError;
    }

    return jsonResponse({
      candidates,
      imagePath,
      model: GEMINI_MODEL,
      predictionId: prediction.id,
    });
  } catch (error) {
    console.error("detect-fish-species failed", normalizeErrorForLog(error));

    return jsonResponse(
      {
        code: "AI_SPECIES_DETECTION_FAILED",
        message: "AI 어종 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      500,
    );
  }
});

const createUserClient = (authorization: string) => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      auth: { persistSession: false },
      global: { headers: { Authorization: authorization } },
    },
  );
};

const downloadImage = async (
  supabase: ReturnType<typeof createClient>,
  imagePath: string,
) => {
  const { data, error } = await supabase.storage
    .from(CATCH_IMAGES_BUCKET)
    .download(imagePath);

  if (error || !data) {
    throw error ?? new Error("Image download failed.");
  }

  const mimeType = data.type || "image/jpeg";
  const bytes = new Uint8Array(await data.arrayBuffer());

  return { base64: bytesToBase64(bytes), mimeType };
};

const bytesToBase64 = (bytes: Uint8Array) => {
  const chunkSize = 32_768;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
};

const normalizeText = (value: unknown) => {
  return typeof value === "string" && value.trim() ? value.trim() : null;
};

const normalizeErrorForLog = (error: unknown) => {
  if (error instanceof Error) {
    return { message: error.message, name: error.name, stack: error.stack };
  }

  return error;
};

const jsonResponse = (body: unknown, status = 200) => {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
};
