import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import LearningPath from "@/shared/lib/models/learning-path.model";
import { CreateLearningPathSchema } from "@/features/learning-path/types/path.schema";

export async function GET() {
  await connectToDB();
  const learningPaths = await LearningPath.find()
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(learningPaths);
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
