import { z } from "zod";
import { imageMimeTypeSchema } from "./validate-image-format";
import { imageSizeSchema } from "./validate-image-size";

/**
 * Zod schema for complete image upload validation
 */
export const imageUploadSchema = z.object({
  filename: z.string().min(1, "El nombre del archivo es requerido"),
  mimeType: imageMimeTypeSchema,
  sizeBytes: imageSizeSchema,
});

export type ImageUploadInput = z.infer<typeof imageUploadSchema>;

/**
 * Validate complete image upload data
 */
export function validateImageUpload(data: {
  filename: string;
  mimeType: string;
  sizeBytes: number;
}): {
  success: boolean;
  error?: string;
  errors?: Record<string, string>;
} {
  const result = imageUploadSchema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      const path = err.path.join(".");
      errors[path] = err.message;
    });

    return {
      success: false,
      error: Object.values(errors)[0], // Return first error
      errors,
    };
  }

  return { success: true };
}
