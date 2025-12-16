"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

export type AvailableCredits = {
  planCredits: number;
  addonCredits: number;
  total: number;
};

type GetAvailableCreditsResult =
  | { success: true; credits: AvailableCredits }
  | { success: false; error: string };

/**
 * Get available credits for the current user
 * Returns breakdown of plan credits, add-on credits, and total
 * @returns Credits breakdown or error
 */
export async function getAvailableCredits(): Promise<GetAvailableCreditsResult> {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.get('/credits/available', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    return {
      success: true,
      credits: response.data.credits,
    };
  } catch (error) {
    console.error("Failed to get available credits", { error });
    
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
      error: "No se pudieron obtener los créditos disponibles",
    };
  }
}
