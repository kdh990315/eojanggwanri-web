import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "npm:@supabase/supabase-js@2";

import { normalizeInlineImage } from "../detect-fish-species/image.ts";
import {
  detectSpecies,
  GEMINI_MODEL,
} from "../detect-fish-species/species-detector.ts";
import { normalizeWaterType } from "../detect-fish-species/types.ts";

const corsHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Origin": "*",
};

interface DetectFishSpeciesWebRequest {
  imageBase64?: unknown;
  mimeType?: unknown;
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
    const body = (await request.json()) as DetectFishSpeciesWebRequest;
    const image = normalizeInlineImage(body.imageBase64, body.mimeType);

    if (!image) {
      return jsonResponse(
        { message: "JPG, PNG, WebP 형식의 8MB 이하 사진이 필요합니다." },
        400,
      );
    }

    const supabase = createAdminClient();
    const quotaAllowed = await consumePublicQuota(supabase, request);

    if (!quotaAllowed) {
      return jsonResponse(
        {
          code: "AI_SPECIES_RATE_LIMITED",
          message: "AI 판별 요청이 많습니다. 잠시 후 다시 시도해 주세요.",
        },
        429,
      );
    }

    const candidates = await detectSpecies({
      image,
      supabase,
      waterType: normalizeWaterType(body.waterType),
    });

    return jsonResponse({ candidates, model: GEMINI_MODEL });
  } catch (error) {
    console.error("detect-fish-species-web failed", normalizeErrorForLog(error));

    return jsonResponse(
      {
        code: "AI_SPECIES_DETECTION_FAILED",
        message: "AI 어종 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      500,
    );
  }
});

const createAdminClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );
};

const consumePublicQuota = async (
  supabase: ReturnType<typeof createClient>,
  request: Request,
) => {
  const clientHash = await createClientHash(request);
  const { data, error } = await supabase.rpc("consume_web_ai_species_quota", {
    request_client_hash: clientHash,
  });

  if (error) {
    throw error;
  }

  return data === true;
};

const createClientHash = async (request: Request) => {
  const salt = Deno.env.get("AI_SPECIES_RATE_LIMIT_SALT");

  if (!salt) {
    throw new Error("AI_SPECIES_RATE_LIMIT_SALT is not configured.");
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const address =
    forwardedFor?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const bytes = new TextEncoder().encode(`${salt}:${address}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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
