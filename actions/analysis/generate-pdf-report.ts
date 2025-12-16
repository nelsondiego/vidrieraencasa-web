"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type GeneratePDFReportResult =
  | { success: true; pdfKey: string }
  | { success: false; error: string };

/**
 * Generate PDF report for analysis
 * @param analysisId - Analysis ID
 * @returns Success with PDF key or error
 */
export async function generatePDFReport(
  analysisId: number
): Promise<GeneratePDFReportResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.post('/analysis/generate-pdf', { analysisId }, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to generate PDF report", { analysisId, error });
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
      error: "No se pudo generar el reporte PDF. Por favor, intenta nuevamente",
    };
  }
}
