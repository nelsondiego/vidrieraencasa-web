import { z } from "zod";

// Maximum file size: 10MB in bytes
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Zod schema for image size validation
 */
export const imageSizeSchema = z.number().max(MAX_FILE_SIZE, {
  message: "La imagen no puede superar los 10MB. Por favor, reduce el tamaño",
});

/**
 * Validate image size
 */
export function validateImageSize(sizeBytes: number): {
  success: boolean;
  error?: string;
} {
  const result = imageSizeSchema.safeParse(sizeBytes);

  if (!result.success) {
    return {
      success: false,
      error: "La imagen no puede superar los 10MB. Por favor, reduce el tamaño",
    };
  }

  return { success: true };
}

/**
 * Check if file size is within limits
 */
export function isValidImageSize(sizeBytes: number): boolean {
  return sizeBytes <= MAX_FILE_SIZE;
}

/**
 * Format file size for display
 */
export function formatFileSize(sizeBytes: number): string {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  } else if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

/**
 * Get maximum file size in bytes
 */
export function getMaxFileSize(): number {
  return MAX_FILE_SIZE;
}
