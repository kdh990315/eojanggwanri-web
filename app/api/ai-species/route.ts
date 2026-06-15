import { NextResponse } from "next/server";

import {
  AI_SPECIES_MAX_IMAGE_BYTES,
  isAiSpeciesWaterType,
  isSupportedAiSpeciesImageType,
  type AiSpeciesDetectionResponse,
} from "@/lib/ai-species";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
    const { data, error } = await supabase.functions.invoke<AiSpeciesDetectionResponse>(
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("AI species API failed", error);

    return errorResponse(
      "AI 어종 판별 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      500,
    );
  }
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}
