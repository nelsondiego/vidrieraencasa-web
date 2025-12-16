import { api } from "@/lib/api";
import { getSessionToken } from "./get-session-token";

export type CurrentUser = {
  id: number;
  email: string;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Get current authenticated user from session
 * Validates session token and checks expiration
 * @returns User object if authenticated, null otherwise
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return null;
    }

    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    if (response.data.success && response.data.user) {
        const user = response.data.user;
        // Parse dates
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
        };
    }

    return null;
  } catch (error) {
    console.error("Failed to get current user", { error });
    return null;
  }
}
