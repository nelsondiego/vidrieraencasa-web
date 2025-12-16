"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type AnalysisHistoryItem = {
  id: number;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  imageUrl: string;
  pdfUrl?: string;
};

type GetAnalysisHistoryResult =
  | {
      success: true;
      history: AnalysisHistoryItem[];
      pagination: {
        page: number;
        limit: number;
        hasMore: boolean;
      };
    }
  | { success: false; error: string };

/**
 * Get analysis history for current user
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns List of analyses or error
 */
export async function getAnalysisHistory(
  page: number = 1,
  limit: number = 10
): Promise<GetAnalysisHistoryResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.get("/analysis/history", {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (response.data.success) {
      const history = response.data.history.map((item: any) => ({
        id: item.id,
        status: item.status,
        createdAt: new Date(item.createdAt),
        imageUrl: item.imageUrl,
        pdfUrl: item.pdfUrl,
      }));

      // Determine if there are more items
      // The API returns exactly limit items if available.
      // A robust API would return total count.
      // For now, if we got 'limit' items, assume there might be more.
      const hasMore = history.length === limit;

      return {
        success: true,
        history,
        pagination: {
          page,
          limit,
          hasMore,
        },
      };
    }

    return { success: false, error: "Error al obtener el historial" };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Failed to get analysis history", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        url: error.config?.url,
        params: error.config?.params,
      });

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
      error: "No se pudo cargar el historial de análisis",
    };
  }
}
