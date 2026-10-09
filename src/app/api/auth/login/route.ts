import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import User from "@/shared/lib/models/user.model";
import { generateAccessToken } from "@/features/auth/lib/generateTokens";
import { LoginSchema } from "@/features/auth/types/auth.schema";
import { createRefreshToken } from "@/features/auth/services/tokenServices";
import { setRefreshTokenCookie } from "@/shared/lib/cookieUtils";

export async function POST(req: NextResponse) {
  try {
    await connectToDB();

    const body = await req.json();
    const { email, password } = LoginSchema.parse(body);

    const user = await User.findOne({ email });

    const validatePassword = user && user.comparePassword(password);

    if (!validatePassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = await createRefreshToken(user._id, {
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for") ?? undefined,
    });

    const response = NextResponse.json({
      expiresIn: 900,
      user: user.toJSON(),
    });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 900,
    });

    setRefreshTokenCookie(response, refreshToken);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
