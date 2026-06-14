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

export async function validateRefreshToken(token: string) {
  const doc = await RefreshToken.findOne({ token });

  if (!doc) throw new Error("Refresh token not found");
  if (doc.isRevoked) throw new Error("Refresh token revoked");
  if (doc.expiresAt < new Date()) throw new Error("Refresh token expired");

  return doc;
}

export async function rotateRefreshToken(
  oldToken: string,
  userId: string,
  meta?: { userAgent?: string; ip?: string },
) {
  const doc = await RefreshToken.findOne({ token: oldToken });

  if (!doc) throw new Error("Token not found");

  if (doc.isRevoked) {
    await RefreshToken.updateMany({ userId }, { isRevoked: true });
    throw new Error("Token reuse detected — all sessions revoked");
  }

  const newRefreshToken = generateRefreshToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TTL_DAYS);

  await doc.updateOne({
    isRevoked: true,
    replacedByToken: true,
  });

  await RefreshToken.create({
    token: newRefreshToken,
    userId,
    expiresAt,
    ...meta,
  });

  return newRefreshToken;
}

export async function revokeRefreshToken(token: string) {
  await RefreshToken.updateOne({ token }, { isRevoked: true });
}

export async function revokeAllUserTokens(userId: string) {
  await RefreshToken.updateMany({ userId }, { isRevoked: true });
}
