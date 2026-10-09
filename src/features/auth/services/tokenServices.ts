import RefreshToken from "@/shared/lib/models/refresh-token.model";
import { generateRefreshToken } from "../lib/generateTokens";

const REFRESH_TTL_DAYS = 7;

export async function createRefreshToken(
  userId: string,
  meta?: { userAgent?: string; ip?: string },
) {
  const token = generateRefreshToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TTL_DAYS);

  await RefreshToken.create({
    token,
    userId,
    expiresAt,
    ...meta,
  });

  return token;
}
