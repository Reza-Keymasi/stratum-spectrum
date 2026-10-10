import { NextRequest, NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { generateAccessToken } from "@/features/auth/lib/generateTokens";
import { rotateRefreshToken } from "@/features/auth/services/tokenServices";
import {
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/shared/lib/cookieUtils";
import User from "@/shared/lib/models/user.model";
import RefreshToken from "@/shared/lib/models/refresh-token.model";

export async function POST(req: NextRequest) {
  const oldToken = await getRefreshTokenFromCookie();

  if (!oldToken) {
    return NextResponse.json({ message: "No session" }, { status: 401 });
  }

  try {
    await connectToDB();

    const newRefreshToken = await rotateRefreshToken(oldToken, {
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for") ?? undefined,
    });

    const newDoc = await RefreshToken.findOne({
      token: newRefreshToken,
    }).populate("userId");

    const user = await User.findById(newDoc.userId);

    if (!user) throw new Error("User not found");

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const response = NextResponse.json(
      { accessToken, expiresIn: 900, user: user.toJSON() },
      { status: 200 },
    );

    setRefreshTokenCookie(response, newRefreshToken);
    setAccessTokenCookie(response, accessToken);

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: error || "Session expired" },
      { status: 500 },
    );

    clearRefreshTokenCookie(response);

    return response;
  }
}
