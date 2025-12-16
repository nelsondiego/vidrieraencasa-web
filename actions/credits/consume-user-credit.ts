"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type ConsumeUserCreditResult =
  | {
      success: true;
      remainingCredits: number;
      sourceType: "plan" | "addon";
      sourceId: number;
    }
  | { success: false; error: string };

/**
 * Consume one credit from user's account
 * Priority: consume from plan first, then add-on
 * Creates audit log in credit_transactions
 * @param analysisId - Optional analysis ID for audit trail
 * @returns Success with remaining credits or error
 */
export async function consumeUserCredit(
  analysisId?: number
): Promise<ConsumeUserCreditResult> {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.post('/credits/consume', { analysisId }, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to consume user credit", { error });
    
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
      error: "No se pudo consumir el crédito",
    };
  }
}
