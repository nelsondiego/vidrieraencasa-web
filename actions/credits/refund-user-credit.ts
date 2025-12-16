"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type RefundUserCreditResult =
  | { success: true; refundedTo: "plan" | "addon"; sourceId: number }
  | { success: false; error: string };

/**
 * Refund one credit to user's account
 * Restores credit to original source (plan or add-on)
 * Creates audit log in credit_transactions
 * @param analysisId - Analysis ID to find original consumption transaction
 * @returns Success with refund details or error
 */
export async function refundUserCredit(
  analysisId: number
): Promise<RefundUserCreditResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.post('/credits/refund', { analysisId }, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to refund user credit", { error, analysisId });
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
      error: "No se pudo reembolsar el crédito",
    };
  }
}
