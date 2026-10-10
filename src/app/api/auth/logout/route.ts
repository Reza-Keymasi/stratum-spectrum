import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { revokeRefreshToken } from "@/features/auth/services/tokenServices";
import {
  clearAccessTokenCookie,
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
} from "@/shared/lib/cookieUtils";

export async function POST() {
  const token = await getRefreshTokenFromCookie();

  if (token) {
    try {
      await connectToDB();
      await revokeRefreshToken(token);
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }

  const response = NextResponse.json({ success: true });

  clearRefreshTokenCookie(response);
  clearAccessTokenCookie(response);

  return response;
}
