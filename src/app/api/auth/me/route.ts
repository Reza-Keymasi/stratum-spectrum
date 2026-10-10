import { NextRequest, NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import User from "@/shared/lib/models/user.model";
import { requireAuth, UnauthorizedError } from "@/features/auth/lib/session";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await requireAuth();
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user.toJSON() });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { messgage: "Unauthorized user" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { messgage: "Internal server error", error },
      { status: 500 },
    );
  }
}
