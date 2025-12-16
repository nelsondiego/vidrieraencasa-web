import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session";

/**
 * Set session cookie with secure flags for Edge Runtime
 * @param token - Session token to store in cookie
 * @param expiresAt - Expiration date for the cookie
 */
export async function setSessionCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
