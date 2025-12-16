import { z } from "zod";

// Allowed MIME types for images
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

// Allowed file extensions
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * Zod schema for image MIME type validation
 */
export const imageMimeTypeSchema = z
  .enum(ALLOWED_MIME_TYPES)
  .refine((val) => ALLOWED_MIME_TYPES.includes(val), {
    message: "El archivo debe ser una imagen en formato JPEG, PNG o WebP",
  });

/**
 * Validate image format by MIME type
 */
export function validateImageFormat(mimeType: string): {
  success: boolean;
  error?: string;
} {
  const result = imageMimeTypeSchema.safeParse(mimeType);

  if (!result.success) {
    return {
      success: false,
      error: "El archivo debe ser una imagen en formato JPEG, PNG o WebP",
    };
  }

  return { success: true };
}

/**
 * Validate image format by file extension
 */
export function validateImageExtension(filename: string): {
  success: boolean;
  error?: string;
} {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (
    !extension ||
    !ALLOWED_EXTENSIONS.includes(
      extension as (typeof ALLOWED_EXTENSIONS)[number]
    )
  ) {
    return {
      success: false,
      error: "El archivo debe ser una imagen en formato JPEG, PNG o WebP",
    };
  }

  return { success: true };
}

/**
 * Check if MIME type is a valid image format
 */
export function isValidImageMimeType(
  mimeType: string
): mimeType is (typeof ALLOWED_MIME_TYPES)[number] {
  return ALLOWED_MIME_TYPES.includes(
    mimeType as (typeof ALLOWED_MIME_TYPES)[number]
  );
}

/**
 * Check if file extension is a valid image format
 */
export function isValidImageExtension(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension
    ? ALLOWED_EXTENSIONS.includes(
        extension as (typeof ALLOWED_EXTENSIONS)[number]
      )
    : false;
}
