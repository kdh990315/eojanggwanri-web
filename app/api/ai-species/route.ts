import { NextResponse } from "next/server";

import {
  AI_SPECIES_MAX_IMAGE_BYTES,
  isAiSpeciesWaterType,
  isSupportedAiSpeciesImageType,
  type AiSpeciesDetectionResponse,
  type AiSpeciesRegulation,
} from "@/lib/ai-species";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type AiSpeciesEdgeResponse = Omit<AiSpeciesDetectionResponse, "regulations">;

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const requestedWaterType = formData.get("waterType");

    if (!(image instanceof File)) {
      return errorResponse("물고기 사진을 선택해 주세요.", 400);
    }

    if (!isSupportedAiSpeciesImageType(image.type)) {
      return errorResponse("JPG, PNG, WebP 형식의 사진만 사용할 수 있습니다.", 415);
    }

    if (image.size === 0 || image.size > AI_SPECIES_MAX_IMAGE_BYTES) {
      return errorResponse("사진은 8MB 이하로 올려 주세요.", 413);
    }

    const waterType = isAiSpeciesWaterType(requestedWaterType)
      ? requestedWaterType
      : null;
    const imageBase64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.functions.invoke<AiSpeciesEdgeResponse>(
      "detect-fish-species-web",
      {
        body: {
          imageBase64,
          mimeType: image.type,
          waterType,
        },
      },
    );

    if (error) {
      console.error("detect-fish-species-web invocation failed", {
        message: error.message,
      });

      return errorResponse(
        "AI 어종 판별을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.",
        502,
      );
    }

    if (!data?.candidates?.length) {
      return errorResponse(
        "사진에서 어종 후보를 찾지 못했습니다. 다른 사진으로 다시 시도해 주세요.",
        422,
      );
    }

    const regulations = await getSpeciesRegulations(
      supabase,
      data.candidates[0].speciesId,
    );

    return NextResponse.json({ ...data, regulations });
  } catch (error) {
    console.error("AI species API failed", error);

    return errorResponse(
      "AI 어종 판별 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      500,
    );
  }
};

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ message }, { status });
};

const getSpeciesRegulations = async (
  supabase: ReturnType<typeof createSupabaseServerClient>,
  speciesId: number | null,
): Promise<AiSpeciesRegulation[]> => {
  if (!speciesId) {
    return [];
  }

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("species_regulations")
    .select(
      "effective_from, exception_note, measurement_basis, min_length_cm, min_weight_g, period_end_day, period_end_month, period_start_day, period_start_month, prohibited_length_max_cm, prohibited_length_min_cm, region_note, regulation_kind, source_title, source_url",
    )
    .eq("species_id", speciesId)
    .lte("effective_from", today)
    .or(`effective_to.is.null,effective_to.gte.${today}`)
    .order("regulation_kind")
    .order("id");

  if (error) {
    console.error("species regulations query failed", {
      message: error.message,
      speciesId,
    });
    return [];
  }

  return (data ?? []).map((regulation) => ({
    effectiveFrom: regulation.effective_from,
    exceptionNote: regulation.exception_note,
    measurementBasis: regulation.measurement_basis,
    minLengthCm: regulation.min_length_cm,
    minWeightG: regulation.min_weight_g,
    periodEndDay: regulation.period_end_day,
    periodEndMonth: regulation.period_end_month,
    periodStartDay: regulation.period_start_day,
    periodStartMonth: regulation.period_start_month,
    prohibitedLengthMaxCm: regulation.prohibited_length_max_cm,
    prohibitedLengthMinCm: regulation.prohibited_length_min_cm,
    regionNote: regulation.region_note,
    regulationKind: regulation.regulation_kind,
    sourceTitle: regulation.source_title,
    sourceUrl: regulation.source_url,
  }));
};
