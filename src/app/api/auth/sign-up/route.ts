import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import User from "@/shared/lib/models/user.model";
import { SignUpSchema } from "@/features/auth/types/auth.schema";
import { generateAccessToken } from "@/features/auth/lib/generateTokens";
import { createRefreshToken } from "@/features/auth/services/tokenServices";
import { setRefreshTokenCookie } from "@/shared/lib/cookieUtils";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { username, email, password } = SignUpSchema.parse(body);

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return NextResponse.json(
        {
          message: "An user with this email already exists",
        },
        { status: 409 },
      );
    }

    const newUser = await User.create({
      username,
      email,
      hashedPassword: password,
      role: "user",
    });

    const payload = {
      username,
      userId: newUser._id,
      email,
      role: newUser.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = await createRefreshToken(newUser._id, {
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for") ?? undefined,
    });

    const response = NextResponse.json(
      {
        accessToken,
        expiresIn: 900,
        user: newUser,
      },
      { status: 201 },
    );

    setRefreshTokenCookie(refreshToken);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
