import { cookies } from "next/headers";
import { verifyAccessToken } from "./generateTokens";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized user");
  }
}

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) throw new UnauthorizedError();

  try {
    const payload = verifyAccessToken(token);
    return { userId: payload.userId };
  } catch (error) {
    throw new UnauthorizedError();
  }
}
