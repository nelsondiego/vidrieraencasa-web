"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type UploadImageResult =
  | { success: true; imageId: number; r2Key: string }
  | { success: false; error: string };

/**
 * Upload image action
 * Validates image, uploads to R2 via API
 */
export async function uploadImage(
  formData: FormData
): Promise<UploadImageResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Debes iniciar sesión para subir imágenes",
      };
    }

    const file = formData.get("image") as File | null;
    if (!file) {
      return {
        success: false,
        error: "No se encontró ninguna imagen en la solicitud",
      };
    }

    const apiFormData = new FormData();
    apiFormData.append('file', file);

    // Note: When using axios in Node.js with FormData, we need to handle headers correctly.
    // But since we are passing a File object (from web API compatible FormData),
    // axios might handle it if we are in an environment that supports it.
    // In Next.js Server Actions (Node.js), standard FormData is available in recent Node versions.

    const response = await api.post('/storage/upload', apiFormData, {
        headers: {
            Authorization: `Bearer ${sessionToken}`,
            'Content-Type': 'multipart/form-data', // Axios usually sets boundary automatically but explicit is okay
        }
    });

    if (response.data.success) {
        return {
            success: true,
            imageId: response.data.image.id,
            r2Key: response.data.image.r2Key
        };
    }

    return { success: false, error: "Error al subir la imagen" };

  } catch (error) {
    console.error("Unexpected error in uploadImage", { error });
    if (isAxiosError(error)) {
        if (error.response?.status === 401) {
             return {
                success: false,
                error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
              };
        }
        if (error.response?.data?.error) {
            return { success: false, error: error.response.data.error };
        }
    }
    return {
      success: false,
      error: "Ocurrió un error inesperado. Por favor, intenta nuevamente",
    };
  }
}
