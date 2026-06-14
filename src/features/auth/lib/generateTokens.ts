import jwt from "jsonwebtoken";
import crypto from "crypto";
import { z } from "zod";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

interface AccessTokenPayload {
  userId: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

type VerifyAccessTokenReturnTypes = AccessTokenPayload & {
  exp: number;
};

export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
    issuer: "spectrum",
    audience: "spectrum-client",
  });
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET, {
    issuer: "spectrum",
    audience: "spectrum-client",
  }) as VerifyAccessTokenReturnTypes;
}
