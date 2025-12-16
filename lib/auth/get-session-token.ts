import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session";

/**
 * Get session token from cookie
 * @returns Session token string or null if not found
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  return sessionCookie?.value ?? null;
}
