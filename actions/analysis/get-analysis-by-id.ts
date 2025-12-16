"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type Analysis = {
  id: number;
  userId: number;
  imageId: number;
  status: "pending" | "processing" | "completed" | "failed";
  diagnosis: any; // Using any for JSON structure
  pdfR2Key: string | null;
  createdAt: Date;
  completedAt: Date | null;
  imageUrl?: string;
  pdfUrl?: string;
  image: {
    id: number;
    filename: string;
    r2Key: string;
    uploadedAt: Date;
  };
};

type GetAnalysisByIdResult =
  | { success: true; analysis: Analysis }
  | { success: false; error: string };

/**
 * Get analysis details by ID
 * @param analysisId - Analysis ID
 * @returns Analysis details or error
 */
export async function getAnalysisById(
  analysisId: number
): Promise<GetAnalysisByIdResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.get(`/analysis/${analysisId}`, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    });

    if (response.data.success && response.data.analysis) {
        const analysis = response.data.analysis;
        // Parse dates
        analysis.createdAt = new Date(analysis.createdAt);
        if (analysis.completedAt) analysis.completedAt = new Date(analysis.completedAt);
        if (analysis.image) analysis.image.uploadedAt = new Date(analysis.image.uploadedAt);
        // Parse diagnosis if it's a string
        if (typeof analysis.diagnosis === 'string') {
            try {
                analysis.diagnosis = JSON.parse(analysis.diagnosis);
            } catch (e) {
                // Ignore parse error
            }
        }
        return { success: true, analysis };
    }

    return { success: false, error: "Análisis no encontrado" };

  } catch (error) {
    console.error("Failed to get analysis", { analysisId, error });
    if (isAxiosError(error)) {
        if (error.response?.status === 401) {
             return {
                success: false,
                error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
              };
        }
        if (error.response?.status === 404) {
            return { success: false, error: "Análisis no encontrado" };
        }
        if (error.response?.data?.error) {
            return { success: false, error: error.response.data.error };
        }
    }
    return {
      success: false,
      error: "No se pudo obtener la información del análisis",
    };
  }
}
