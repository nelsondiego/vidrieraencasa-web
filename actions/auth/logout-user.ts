"use server";

import { api } from "@/lib/api";
import { getSessionToken } from "@/lib/auth/get-session-token";
import { clearSessionCookie } from "@/lib/auth/clear-session-cookie";
import { isAxiosError } from "axios";

type LogoutUserResult = { success: true } | { success: false; error: string };

/**
 * Logout user by invalidating session and clearing cookie
 * @returns Result object with success status
 */
export async function logoutUser(): Promise<LogoutUserResult> {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      await clearSessionCookie();
      return { success: true };
    }

    // Call API to logout
    await api.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    // Clear session cookie
    await clearSessionCookie();

    return { success: true };
  } catch (error) {
    console.error("Failed to logout user", { error });
    // Still clear cookie on error to prevent inconsistent state
    await clearSessionCookie();
    
    if (isAxiosError(error) && error.response) {
       return { success: false, error: error.response.data.error || "No se pudo cerrar sesión" };
    }

    return {
      success: false,
      error: "No se pudo cerrar sesión. Por favor, intenta nuevamente",
    };
  }
}
