"use server";

import { z } from "zod";
import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

const inputSchema = z.object({
  planType: z.enum(["single", "monthly_3", "monthly_10", "addon"]),
});

type CreatePaymentPreferenceResult =
  | { success: true; preferenceId: string; initPoint: string }
  | { success: false; error: string };

/**
 * Create a MercadoPago payment preference for a plan purchase
 * Validates user authentication, plan type, and prevents duplicate monthly plans
 * @param planType - Type of plan to purchase
 * @returns Preference ID and init point URL for redirect to checkout
 */
export async function createPaymentPreference(
  planType: string
): Promise<CreatePaymentPreferenceResult> {
  try {
    // Validate input
    const validation = inputSchema.safeParse({ planType });
    if (!validation.success) {
      return {
        success: false,
        error: "Tipo de plan inválido",
      };
    }

    const sessionToken = await getSessionToken();
    if (!sessionToken) {
        return {
          success: false,
          error: "Debes iniciar sesión para realizar una compra",
        };
    }

    const response = await api.post('/payments/preference', { planType }, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    });

    const { id: preferenceId } = response.data;
    const initPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;

    return {
      success: true,
      preferenceId,
      initPoint,
    };
  } catch (error) {
    console.error("Failed to create payment preference", {
      planType,
      error,
    });

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
      error:
        "No se pudo crear la preferencia de pago. Por favor, intenta nuevamente",
    };
  }
}
