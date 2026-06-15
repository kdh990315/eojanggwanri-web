import type { InlineImage } from "./types.ts";

const MAX_INLINE_IMAGE_BYTES = 8 * 1024 * 1024;
const SUPPORTED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const normalizeInlineImage = (
  base64Value: unknown,
  mimeValue: unknown,
): InlineImage | null => {
  if (typeof base64Value !== "string" || typeof mimeValue !== "string") {
    return null;
  }

  if (!SUPPORTED_MIME_TYPES.has(mimeValue)) {
    return null;
  }

  const base64 = base64Value.trim();
  const estimatedBytes = Math.floor((base64.length * 3) / 4);

  if (!base64 || estimatedBytes > MAX_INLINE_IMAGE_BYTES) {
    return null;
  }

  return { base64, mimeType: mimeValue };
};
