import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import LearningPath from "@/shared/lib/models/learning-path.model";
import { CreateLearningPathSchema } from "@/features/learning-path/types/path.schema";
import { requireAuth } from "@/features/auth/lib/session";

export async function GET() {
  await connectToDB();
  try {
    const { userId } = await requireAuth();
    const learningPaths = await LearningPath.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(learningPaths);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();

    const parsedBody = CreateLearningPathSchema.parse(body);
    const learningPath = await LearningPath.create(parsedBody);

    return NextResponse.json(learningPath, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid learning path payload", error },
      { status: 400 },
    );
  }
}
