"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { isAxiosError } from "axios";

type PlanType = "single" | "monthly_3" | "monthly_10";
type PlanStatus = "active" | "expired";

type ActivePlanInfo = {
  id: number;
  type: PlanType;
  status: PlanStatus;
  credits: number;
  creditsRemaining: number;
  startDate: Date;
  endDate: Date;
  resetDate: Date | null;
};

type GetActivePlanResult =
  | { success: true; plan: ActivePlanInfo | null }
  | { success: false; error: string };

/**
 * Get active plan for current user
 * Returns the most recent active plan if one exists
 * @returns Active plan info or null if no active plan
 */
export async function getActivePlan(): Promise<GetActivePlanResult> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return {
        success: false,
        error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
      };
    }

    const response = await api.get('/credits/active-plan', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    if (response.data.success && response.data.plan) {
        // Parse dates from strings
        const plan = response.data.plan;
        plan.startDate = new Date(plan.startDate);
        plan.endDate = new Date(plan.endDate);
        if (plan.resetDate) plan.resetDate = new Date(plan.resetDate);
        return { success: true, plan };
    }

    return { success: true, plan: null };

  } catch (error) {
    console.error("Failed to get active plan", { error });
    if (isAxiosError(error)) {
        if (error.response?.status === 401) {
             return {
                success: false,
                error: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente",
              };
        }
    }
    return {
      success: false,
      error: "No se pudo obtener la información del plan",
    };
  }
}
