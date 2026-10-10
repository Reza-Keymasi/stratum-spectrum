import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
} as const;

export async function setAccessTokenCookie(
  response: NextResponse,
  token: string,
): Promise<void> {
  response.cookies.set(ACCESS_TOKEN_COOKIE, token, {
    ...COOKIE_OPTIONS,
  });
}

export async function setRefreshTokenCookie(
  response: NextResponse,
  token: string,
): Promise<void> {
  response.cookies.set(REFRESH_TOKEN_COOKIE, token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
}

export async function clearRefreshTokenCookie(
  response: NextResponse,
): Promise<void> {
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}
