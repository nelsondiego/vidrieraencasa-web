"use server";

import { z } from "zod";
import { api } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth/set-session-cookie";
import { isAxiosError } from "axios";

const registerSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type RegisterUserResult =
  | { success: true; userId: number; token: string }
  | { success: false; error: string };

/**
 * Register a new user with name, email and password
 * @param fullName - User's full name
 * @param email - User's email address
 * @param password - User's password (will be hashed)
 * @returns Result object with success status and userId or error message
 */
export async function registerUser(
  fullName: string,
  email: string,
  password: string
): Promise<RegisterUserResult> {
  // Validate input
  const validation = registerSchema.safeParse({ fullName, email, password });
  if (!validation.success) {
    const firstError = validation.error.issues[0];
    return { success: false, error: firstError.message };
  }

  try {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      password,
    });

    // If successful, set session cookie
    if (response.data.success && response.data.session) {
      await setSessionCookie(
        response.data.session.token,
        new Date(response.data.session.expiresAt)
      );
    }

    return {
      success: true,
      userId: response.data.user.id,
      token: response.data.session.token,
    };
  } catch (error) {
    console.error("Failed to register user", { email, error });
    if (isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data.error || "No se pudo crear la cuenta",
      };
    }
    return {
      success: false,
      error: "No se pudo crear la cuenta. Por favor, intenta nuevamente",
    };
  }
}
