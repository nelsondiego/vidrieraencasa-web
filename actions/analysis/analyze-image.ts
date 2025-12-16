"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type AnalyzeImageResult =
  | {
      success: true;
      analysisId: number;
      diagnosis: {
        strengths: string[];
        issues: string[];
        recommendations: string[];
        suggestedSignageText: string;
      };
    }
  | { success: false; error: string };

/**
 * Analyze image action
 * @param imageId - ID of the uploaded image to analyze
 * @returns Analysis result with diagnosis or error
 */
export async function analyzeImage(
  imageId: number
): Promise<AnalyzeImageResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.post('/analysis/analyze', { imageId }, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to analyze image", { imageId, error });
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
      error: "No pudimos completar el análisis. Por favor, intenta nuevamente",
    };
  }
}
