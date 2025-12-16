"use server";

import { z } from "zod";
import { api } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth/set-session-cookie";
import { isAxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginUserResult =
  | { success: true; userId: number; token: string }
  | { success: false; error: string };

/**
 * Authenticate user and create session
 * @param email - User's email address
 * @param password - User's password
 * @returns Result object with success status, userId and token or error message
 */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginUserResult> {
  // Validate input
  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    const firstError = validation.error.issues[0];
    return { success: false, error: firstError.message };
  }

  try {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data.success && response.data.session) {
       await setSessionCookie(response.data.session.token, new Date(response.data.session.expiresAt));
    }

    return { 
      success: true, 
      userId: response.data.user.id,
      token: response.data.session.token 
    };
  } catch (error) {
    console.error("Failed to login user", { email, error });
    if (isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || "No se pudo iniciar sesión" };
    }
    return {
      success: false,
      error: "No se pudo iniciar sesión. Por favor, intenta nuevamente",
    };
  }
}
